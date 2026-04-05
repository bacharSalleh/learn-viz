import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

interface TreeNode {
  label: string;
  children?: TreeNode[];
}

interface HierNode extends d3.HierarchyPointNode<TreeNode> {
  _children?: HierNode[];
  _collapsed?: boolean;
}

const DEFAULT_PALETTE = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#6366f1',
];

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .node-rect {
    fill: var(--lv-bg-raised, #1e1e3a);
    stroke: var(--lv-border, #2a2a4a);
    stroke-width: 1.5;
    rx: 6;
    cursor: pointer;
    transition: fill 0.2s, stroke 0.2s;
  }
  .node-rect:hover {
    stroke: var(--lv-accent, #3b82f6);
    fill: var(--lv-bg-card, #252550);
  }
  .node-rect.has-children { cursor: pointer; }
  .node-rect.leaf { cursor: default; }
  .node-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 12px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }
  .link {
    fill: none;
    stroke: var(--lv-border, #2a2a4a);
    stroke-width: 1.5;
  }
  .collapse-indicator {
    fill: var(--lv-text-dim, #888);
    font-size: 10px;
    text-anchor: middle;
    pointer-events: none;
  }
`;

const NODE_W = 120;
const NODE_H = 32;
const PADDING = 40;

class LvTree extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'orientation'];
  }

  private _data: TreeNode | null = null;
  private _hasAnimated = false;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _container: HTMLDivElement | null = null;
  private _root: HierNode | null = null;

  private get _orientation(): 'vertical' | 'horizontal' {
    return (this.getAttribute('orientation') as 'horizontal' | 'vertical') === 'horizontal'
      ? 'horizontal' : 'vertical';
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    this._container = document.createElement('div');
    this.root.appendChild(this._container);

    this._data = this.jsonAttr<TreeNode>('data', { label: 'root' });
    this._initSvg();
    this._buildHierarchy();
    this._render(false);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  handleAttributeChange(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (name === 'data') {
      this._data = this.jsonAttr<TreeNode>('data', { label: 'root' });
      this._buildHierarchy();
    }
    if (this._svg) this._render(false);
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) {
      this._render(false);
    } else {
      this._render(true);
    }
  }

  private _initSvg() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._container!.appendChild(svgEl);
    this._svg = d3.select(svgEl);
    this._svg.append('g').attr('class', 'links-group');
    this._svg.append('g').attr('class', 'nodes-group');
  }

  private _buildHierarchy() {
    if (!this._data) return;
    this._root = d3.hierarchy(this._data) as HierNode;
  }

  private _getVisibleNodes(): HierNode[] {
    if (!this._root) return [];
    const nodes: HierNode[] = [];
    const walk = (n: HierNode) => {
      nodes.push(n);
      if (n._collapsed) return;
      if (n.children) {
        for (const c of n.children) walk(c as HierNode);
      }
    };
    walk(this._root);
    return nodes;
  }

  private _toggleCollapse(node: HierNode) {
    if (!node.data.children || node.data.children.length === 0) return;

    if (node._collapsed) {
      // Expand: restore children
      node._collapsed = false;
      node.children = node._children || [];
    } else {
      // Collapse: hide children
      node._collapsed = true;
      node._children = node.children as HierNode[];
      node.children = undefined as any;
    }

    // Rebuild layout
    this._render(true);
  }

  private _render(animate: boolean) {
    if (!this._svg || !this._root) return;

    const isHorizontal = this._orientation === 'horizontal';

    // Rebuild hierarchy from data (to account for collapses)
    // We need a fresh hierarchy but preserve collapse state
    const collapseMap = new Map<string, { collapsed: boolean; _children: HierNode[] | undefined }>();
    const saveState = (n: HierNode, path: string) => {
      collapseMap.set(path, { collapsed: !!n._collapsed, _children: n._children });
      if (n._collapsed && n._children) {
        for (let i = 0; i < n._children.length; i++) {
          saveState(n._children[i] as HierNode, `${path}/${i}`);
        }
      }
      if (n.children) {
        for (let i = 0; i < n.children.length; i++) {
          saveState(n.children[i] as HierNode, `${path}/${i}`);
        }
      }
    };
    saveState(this._root, '0');

    // Recreate hierarchy
    this._root = d3.hierarchy(this._data!) as HierNode;

    // Restore collapse state
    const restoreState = (n: HierNode, path: string) => {
      const saved = collapseMap.get(path);
      if (saved?.collapsed) {
        n._collapsed = true;
        n._children = n.children as HierNode[];
        n.children = undefined as any;
      }
      if (n.children) {
        for (let i = 0; i < n.children.length; i++) {
          restoreState(n.children[i] as HierNode, `${path}/${i}`);
        }
      }
    };
    restoreState(this._root, '0');

    // Count visible nodes for sizing
    const visibleNodes = this._getVisibleNodes();
    const leafCount = visibleNodes.filter(n => !n.children || n.children.length === 0).length;
    const depthMax = d3.max(visibleNodes, n => n.depth) || 0;

    // Compute tree layout size
    const nodeSpacingAcross = NODE_H + 20;
    const nodeSpacingAlong = NODE_W + 60;

    let treeW: number, treeH: number;
    if (isHorizontal) {
      treeW = (depthMax) * nodeSpacingAlong;
      treeH = Math.max((leafCount - 1) * nodeSpacingAcross, nodeSpacingAcross);
    } else {
      treeW = Math.max((leafCount - 1) * (NODE_W + 80), NODE_W + 80);
      treeH = (depthMax) * nodeSpacingAlong;
    }

    const treeLayout = d3.tree<TreeNode>()
      .size(isHorizontal ? [treeH, treeW] : [treeW, treeH])
      .separation((a, b) => a.parent === b.parent ? 1.5 : 2);

    treeLayout(this._root as any);

    // Collect laid-out nodes/links
    const nodes = this._root.descendants() as HierNode[];
    const links = this._root.links();

    const svgW = (isHorizontal ? treeW : treeW) + PADDING * 2 + NODE_W;
    const svgH = (isHorizontal ? treeH : treeH) + PADDING * 2 + NODE_H;

    this._svg.attr('viewBox', `0 0 ${svgW} ${svgH}`);

    const offsetX = PADDING + NODE_W / 2;
    const offsetY = PADDING + NODE_H / 2;

    // Helper to get node position
    const nx = (d: HierNode) => isHorizontal ? (d as any).y + offsetX : (d as any).x + offsetX;
    const ny = (d: HierNode) => isHorizontal ? (d as any).x + offsetY : (d as any).y + offsetY;

    // Links
    const linksGroup = this._svg.select<SVGGElement>('.links-group');
    linksGroup.selectAll('*').remove();

    const linkGen = isHorizontal
      ? d3.linkHorizontal<any, any>().x((d: any) => d.y + offsetX).y((d: any) => d.x + offsetY)
      : d3.linkVertical<any, any>().x((d: any) => d.x + offsetX).y((d: any) => d.y + offsetY);

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const path = linksGroup.append('path')
        .attr('class', 'link')
        .attr('d', linkGen(link as any)!);

      if (animate) {
        const totalLen = (path.node() as SVGPathElement).getTotalLength();
        path
          .attr('stroke-dasharray', totalLen)
          .attr('stroke-dashoffset', totalLen)
          .transition()
          .delay(i * 60 + 100)
          .duration(500)
          .ease(d3.easeQuadOut)
          .attr('stroke-dashoffset', 0);
      }
    }

    // Nodes
    const nodesGroup = this._svg.select<SVGGElement>('.nodes-group');
    nodesGroup.selectAll('*').remove();

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const x = nx(node);
      const y = ny(node);
      const hasChildren = node.data.children && node.data.children.length > 0;
      const isCollapsed = !!(node as HierNode)._collapsed;
      const depth = node.depth;
      const colorIdx = depth % DEFAULT_PALETTE.length;
      const borderColor = getComputedStyle(this).getPropertyValue(`--lv-chart-${colorIdx}`).trim()
        || DEFAULT_PALETTE[colorIdx];

      const g = nodesGroup.append('g')
        .attr('transform', `translate(${x},${y})`);

      if (animate) {
        g.attr('opacity', 0)
          .transition()
          .delay(i * 60)
          .duration(400)
          .ease(d3.easeQuadOut)
          .attr('opacity', 1);
      }

      const rect = g.append('rect')
        .attr('class', `node-rect ${hasChildren ? 'has-children' : 'leaf'}`)
        .attr('x', -NODE_W / 2)
        .attr('y', -NODE_H / 2)
        .attr('width', NODE_W)
        .attr('height', NODE_H)
        .attr('stroke', borderColor);

      g.append('text')
        .attr('class', 'node-label')
        .text(node.data.label);

      // Collapse indicator
      if (hasChildren) {
        g.append('text')
          .attr('class', 'collapse-indicator')
          .attr('x', NODE_W / 2 - 12)
          .attr('y', 0)
          .text(isCollapsed ? '+' : '\u2212');
      }

      // Click to toggle
      if (hasChildren) {
        rect.on('click', () => {
          this._toggleCollapse(node as HierNode);
        });
        g.select('.collapse-indicator').on('click', () => {
          this._toggleCollapse(node as HierNode);
        });
      }
    }
  }
}

customElements.define('lv-tree', LvTree);

export { LvTree };

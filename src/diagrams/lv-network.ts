import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';
import gsap from 'gsap';

type AnimateMode = 'none' | 'forward-pass' | 'backprop';

interface NodePos {
  layer: number;
  index: number;
  x: number;
  y: number;
  label: string;
}

interface Connection {
  source: NodePos;
  target: NodePos;
}

const LAYER_COLORS = {
  input: '#ff2d75',
  hidden: '#7b68ee',
  output: '#00d4ff',
};

const NODE_RADIUS = 36;
const NODE_SPACING_Y = 100;
const LAYER_SPACING_X = 200;
const PADDING_TOP = 50;
const PADDING_X = 60;

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;

class LvNetwork extends LvBaseElement {
  static get observedAttributes() {
    return ['layers', 'names', 'animate', 'speed'];
  }

  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _container: HTMLDivElement | null = null;
  private _hasAnimated = false;
  private _isAnimating = false;
  private _resizeObserver: ResizeObserver | null = null;
  private _timeline: gsap.core.Timeline | null = null;

  private get _layers(): string[][] {
    return this.jsonAttr<string[][]>('layers', [['x₁', 'x₂'], ['h₁', 'h₂', 'h₃'], ['ŷ']]);
  }

  private get _names(): string[] {
    return this.jsonAttr<string[]>('names', []);
  }

  private get _animateMode(): AnimateMode {
    return (this.getAttribute('animate') as AnimateMode) || 'none';
  }

  private get _speed(): number {
    const val = parseInt(this.getAttribute('speed') || '', 10);
    return isNaN(val) ? 600 : val;
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    this._container = document.createElement('div');
    this.root.appendChild(this._container);

    this._initSvg();
    this._render();

    this._resizeObserver = new ResizeObserver(() => {
      if (!this._isAnimating) this._render();
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._cancelAnimation();
  }

  handleAttributeChange(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (this._svg) {
      this._cancelAnimation();
      this._hasAnimated = false;
      this._render();
    }
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;

    if (instant || this._animateMode === 'none') {
      this._hasAnimated = true;
      this._render();
      return;
    }

    this._runAnimation();
  }

  // ---------------------------------------------------------------------------
  // SVG setup
  // ---------------------------------------------------------------------------

  private _initSvg() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._container!.appendChild(svgEl);
    this._svg = d3.select(svgEl);

    // Define filters for glow effects
    const defs = this._svg.append('defs');

    const colors: Record<string, string> = {
      input: LAYER_COLORS.input,
      hidden: LAYER_COLORS.hidden,
      output: LAYER_COLORS.output,
    };

    for (const [key, color] of Object.entries(colors)) {
      const filter = defs.append('filter')
        .attr('id', `glow-${key}`)
        .attr('x', '-50%').attr('y', '-50%')
        .attr('width', '200%').attr('height', '200%');
      filter.append('feDropShadow')
        .attr('dx', 0).attr('dy', 0)
        .attr('stdDeviation', 6)
        .attr('flood-color', color)
        .attr('flood-opacity', 0.7);
    }

    this._svg.append('g').attr('class', 'connections-group');
    this._svg.append('g').attr('class', 'nodes-group');
    this._svg.append('g').attr('class', 'labels-group');
  }

  // ---------------------------------------------------------------------------
  // Layout computation
  // ---------------------------------------------------------------------------

  private _computeLayout(): { nodes: NodePos[][]; connections: Connection[]; width: number; height: number } {
    const layers = this._layers;
    const rtl = this.isRtl;
    const numLayers = layers.length;

    const maxNodesInLayer = Math.max(...layers.map(l => l.length), 1);
    const width = (numLayers - 1) * LAYER_SPACING_X + PADDING_X * 2;
    const height = (maxNodesInLayer - 1) * NODE_SPACING_Y + PADDING_TOP + NODE_RADIUS + 40;

    const nodes: NodePos[][] = [];
    const connections: Connection[] = [];

    for (let li = 0; li < numLayers; li++) {
      const layer = layers[li];
      const layerX = rtl
        ? width - PADDING_X - li * LAYER_SPACING_X
        : PADDING_X + li * LAYER_SPACING_X;

      const layerHeight = (layer.length - 1) * NODE_SPACING_Y;
      const startY = PADDING_TOP + (((maxNodesInLayer - 1) * NODE_SPACING_Y) - layerHeight) / 2;

      const layerNodes: NodePos[] = [];
      for (let ni = 0; ni < layer.length; ni++) {
        layerNodes.push({
          layer: li,
          index: ni,
          x: layerX,
          y: startY + ni * NODE_SPACING_Y,
          label: layer[ni],
        });
      }
      nodes.push(layerNodes);
    }

    // Build connections between adjacent layers
    for (let li = 0; li < numLayers - 1; li++) {
      for (const source of nodes[li]) {
        for (const target of nodes[li + 1]) {
          connections.push({ source, target });
        }
      }
    }

    return { nodes, connections, width, height };
  }

  private _layerColor(layerIndex: number, totalLayers: number): string {
    const inputColor = getComputedStyle(this).getPropertyValue('--lv-net-input').trim() || LAYER_COLORS.input;
    const hiddenColor = getComputedStyle(this).getPropertyValue('--lv-net-hidden').trim() || LAYER_COLORS.hidden;
    const outputColor = getComputedStyle(this).getPropertyValue('--lv-net-output').trim() || LAYER_COLORS.output;

    if (layerIndex === 0) return inputColor;
    if (layerIndex === totalLayers - 1) return outputColor;
    return hiddenColor;
  }

  private _layerType(layerIndex: number, totalLayers: number): string {
    if (layerIndex === 0) return 'input';
    if (layerIndex === totalLayers - 1) return 'output';
    return 'hidden';
  }

  // ---------------------------------------------------------------------------
  // Render (static)
  // ---------------------------------------------------------------------------

  private _render() {
    if (!this._svg) return;

    const { nodes, connections, width, height } = this._computeLayout();
    const totalLayers = nodes.length;
    const isStatic = this._animateMode === 'none' || this._hasAnimated;
    const isDimmed = this._animateMode !== 'none' && !this._hasAnimated;

    this._svg.attr('viewBox', `0 0 ${width} ${height}`);

    // -- Connections --
    const connGroup = this._svg.select<SVGGElement>('.connections-group');
    connGroup.selectAll('*').remove();

    for (const conn of connections) {
      connGroup.append('line')
        .attr('class', 'connection')
        .attr('x1', conn.source.x)
        .attr('y1', conn.source.y)
        .attr('x2', conn.target.x)
        .attr('y2', conn.target.y)
        .attr('stroke', 'var(--lv-border, #2a2a4a)')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', isDimmed ? 0.08 : 0.5)
        .attr('data-source-layer', conn.source.layer)
        .attr('data-target-layer', conn.target.layer);
    }

    // -- Nodes --
    const nodesGroup = this._svg.select<SVGGElement>('.nodes-group');
    nodesGroup.selectAll('*').remove();

    for (const layer of nodes) {
      for (const node of layer) {
        const color = this._layerColor(node.layer, totalLayers);
        const type = this._layerType(node.layer, totalLayers);
        const g = nodesGroup.append('g')
          .attr('class', 'node')
          .attr('data-layer', node.layer)
          .attr('data-index', node.index)
          .attr('transform', `translate(${node.x},${node.y})`)
          .attr('opacity', isDimmed ? 0.15 : 1);

        g.append('circle')
          .attr('class', 'node-circle')
          .attr('data-layer', node.layer)
          .attr('r', NODE_RADIUS)
          .attr('fill', color)
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('fill-opacity', isStatic ? 0.2 : (isDimmed ? 0.05 : 0.2));

        if (isStatic) {
          g.attr('filter', `url(#glow-${type})`);
        }

        g.append('text')
          .attr('class', 'node-label')
          .text(node.label);
      }
    }

    // -- Layer name labels --
    const labelsGroup = this._svg.select<SVGGElement>('.labels-group');
    labelsGroup.selectAll('*').remove();

    const names = this._names;
    for (let li = 0; li < nodes.length; li++) {
      if (!names[li]) continue;
      const firstNode = nodes[li][0];
      labelsGroup.append('text')
        .attr('class', 'label')
        .attr('x', firstNode.x)
        .attr('y', firstNode.y - NODE_RADIUS - 16)
        .text(names[li]);
    }
  }

  // ---------------------------------------------------------------------------
  // Query helpers for GSAP targets (real DOM elements)
  // ---------------------------------------------------------------------------

  /** Returns arrays of node <g> elements grouped by layer index, in order. */
  private _getLayerNodeGroups(): SVGGElement[][] {
    const totalLayers = this._layers.length;
    const result: SVGGElement[][] = [];
    for (let li = 0; li < totalLayers; li++) {
      const els = Array.from(
        this.root.querySelectorAll<SVGGElement>(`.node[data-layer="${li}"]`)
      );
      result.push(els);
    }
    return result;
  }

  /** Returns connection <line> elements between two layers (by source/target layer index). */
  private _getConnectionElements(sourceLayer: number, targetLayer: number): SVGLineElement[] {
    return Array.from(
      this.root.querySelectorAll<SVGLineElement>(
        `.connection[data-source-layer="${sourceLayer}"][data-target-layer="${targetLayer}"]`
      )
    );
  }

  // ---------------------------------------------------------------------------
  // Animation (GSAP timeline)
  // ---------------------------------------------------------------------------

  private _cancelAnimation(): void {
    this._timeline?.kill();
    this._timeline = null;
    this._isAnimating = false;
  }

  private _runAnimation(): void {
    if (!this._svg) return;

    this._cancelAnimation();
    this._isAnimating = true;

    // Render the dimmed initial state (everything at low opacity)
    this._render();

    const { nodes } = this._computeLayout();
    const totalLayers = nodes.length;
    const mode = this._animateMode;
    const speed = this._speed;
    const isBackprop = mode === 'backprop';

    const activeColor = isBackprop ? '#ff2d75' : '#00d4ff';

    // Duration scaling based on speed attribute (600ms default = 1x)
    const timeScale = speed / 600;

    // Build layer traversal order
    const layerOrder = isBackprop
      ? Array.from({ length: totalLayers }, (_, i) => totalLayers - 1 - i)
      : Array.from({ length: totalLayers }, (_, i) => i);

    // Get DOM element groups
    const allLayerGroups = this._getLayerNodeGroups();

    const tl = gsap.timeline({
      onComplete: () => {
        this._isAnimating = false;
        this._hasAnimated = true;

        // Apply final static state: full opacity + glow filters on all nodes
        const nodeEls = this.root.querySelectorAll<SVGGElement>('.node');
        nodeEls.forEach((g) => {
          const layerIdx = parseInt(g.getAttribute('data-layer') || '0', 10);
          const type = this._layerType(layerIdx, totalLayers);
          gsap.set(g, { opacity: 1 });
          g.setAttribute('filter', `url(#glow-${type})`);
          const circle = g.querySelector('circle');
          if (circle) {
            gsap.set(circle, { attr: { 'fill-opacity': 0.2 } });
          }
        });

        // Set all connections to final visible state
        const connEls = this.root.querySelectorAll<SVGLineElement>('.connection');
        connEls.forEach((line) => {
          gsap.set(line, { attr: { 'stroke-opacity': 0.5 } });
          line.setAttribute('stroke', 'var(--lv-border, #2a2a4a)');
        });
      },
    });

    this._timeline = tl;

    // Initial delay before animation starts
    tl.addLabel('start', 0.15);

    layerOrder.forEach((currentLayerIdx, step) => {
      const type = this._layerType(currentLayerIdx, totalLayers);
      const layerNodeEls = allLayerGroups[currentLayerIdx];
      if (!layerNodeEls || layerNodeEls.length === 0) return;

      const circles = layerNodeEls.map(g => g.querySelector('.node-circle')).filter(Boolean) as SVGCircleElement[];
      const label = `layer-${step}`;
      const layerStart = 0.15 + step * (0.4 * timeScale);

      tl.addLabel(label, layerStart);

      // 1. Fade in node groups (opacity 0.15 -> 1)
      tl.to(layerNodeEls, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.out',
      }, label);

      // 2. Apply glow filter as nodes activate
      tl.call(() => {
        layerNodeEls.forEach((g) => {
          g.setAttribute('filter', `url(#glow-${type})`);
        });
      }, [], label);

      // 3. Pulse circle radius: NODE_RADIUS -> NODE_RADIUS * 1.15 -> NODE_RADIUS
      tl.to(circles, {
        attr: { r: NODE_RADIUS * 1.15 },
        duration: 0.15,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }, label);

      tl.to(circles, {
        attr: { r: NODE_RADIUS },
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.inOut',
      }, `${label}+=0.2`);

      // 4. Brighten fill momentarily
      tl.to(circles, {
        attr: { 'fill-opacity': 0.35 },
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.out',
      }, label);

      tl.to(circles, {
        attr: { 'fill-opacity': 0.2 },
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      }, `${label}+=0.3`);

      // 5. Animate connections to the next layer in traversal order
      if (step < layerOrder.length - 1) {
        const nextLayerIdx = layerOrder[step + 1];
        // Connections always go from lower-index layer to higher-index layer in the DOM
        const sourceLayer = Math.min(currentLayerIdx, nextLayerIdx);
        const targetLayer = Math.max(currentLayerIdx, nextLayerIdx);
        const connEls = this._getConnectionElements(sourceLayer, targetLayer);

        if (connEls.length > 0) {
          // Flash connections: opacity 0.08 -> 0.5 with active color
          tl.to(connEls, {
            attr: { 'stroke-opacity': 0.5 },
            stroke: activeColor,
            duration: 0.25,
            stagger: 0.02,
            ease: 'power2.out',
          }, `${label}+=0.15`);

          // Then settle: back to default stroke color, keep opacity up
          tl.to(connEls, {
            stroke: 'var(--lv-border, #2a2a4a)',
            attr: { 'stroke-opacity': 0.35 },
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.inOut',
          }, `${label}+=0.35`);
        }
      }
    });
  }
}

customElements.define('lv-network', LvNetwork);

export { LvNetwork };

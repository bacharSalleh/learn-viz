import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, sankeyLeft, SankeyNode, SankeyLink } from 'd3-sankey';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`;

const PALETTE = [
  'var(--lv-chart-0)', 'var(--lv-chart-1)', 'var(--lv-chart-2)', 'var(--lv-chart-3)',
  'var(--lv-chart-4)', 'var(--lv-chart-5)', 'var(--lv-chart-6)', 'var(--lv-chart-7)',
];

interface SNode { name: string; }
interface SLink { source: number; target: number; value: number; }

class LvSankey extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['nodes', 'links', 'node-colors'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._buildChart();
  }

  handleAttributeChange() {
    if (this.isConnected) this._buildChart();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;

    const nodes = this.root.querySelectorAll('.node');
    nodes.forEach((el, i) => {
      const e = el as HTMLElement;
      e.style.transition = 'none';
      e.style.opacity = '0';
      e.style.transform = 'translateX(-20px)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        e.style.transition = `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms`;
        e.style.opacity = '1';
        e.style.transform = 'translateX(0)';
      }));
    });

    const links = this.root.querySelectorAll('.link');
    const baseDelay = nodes.length * 80;
    links.forEach((el, i) => {
      const p = el as SVGPathElement;
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.transition = `stroke-dashoffset 600ms ease-out ${baseDelay + i * 50}ms`;
      requestAnimationFrame(() => { p.style.strokeDashoffset = '0'; });
    });
  }

  private _buildChart(): void {
    const nodeNames: string[] = this.jsonAttr('nodes', []);
    const linkData: SLink[] = this.jsonAttr('links', []);
    const nodeColors: string[] = this.jsonAttr('node-colors', []);

    if (!nodeNames.length || !linkData.length) {
      this.render('<svg></svg>');
      return;
    }

    const W = 600, H = Math.max(300, nodeNames.length * 40);
    const pad = 20;
    const isRtl = this.isRtl;

    const graph = sankey<SNode, SLink>()
      .nodeId((_, i) => i as any)
      .nodeWidth(20)
      .nodePadding(16)
      .nodeAlign(sankeyLeft)
      .extent([[pad, pad], [W - pad, H - pad]])({
        nodes: nodeNames.map(name => ({ name } as any)),
        links: linkData.map(l => ({ ...l })),
      });

    let svg = '';

    // Links
    (graph.links as any[]).forEach((link: any, i: number) => {
      const path = sankeyLinkHorizontal()(link);
      const color = nodeColors[link.source.index] || PALETTE[link.source.index % 8];
      svg += `<path class="link" d="${path}" stroke="${color}" stroke-width="${Math.max(1, link.width)}"/>`;
    });

    // Nodes
    (graph.nodes as any[]).forEach((node: any, i: number) => {
      const color = nodeColors[i] || PALETTE[i % 8];
      const x = isRtl ? W - (node.x1 as number) : (node.x0 as number);
      const w = (node.x1 as number) - (node.x0 as number);
      const y = node.y0 as number;
      const h = (node.y1 as number) - (node.y0 as number);
      const labelX = isRtl ? x - 6 : x + w + 6;
      const anchor = isRtl ? 'end' : 'start';

      svg += `<g class="node">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${color}"/>
        <text class="node-label" x="${labelX}" y="${y + h / 2}"
          text-anchor="${anchor}" dominant-baseline="central">${this._esc(node.name)}</text>
      </g>`;
    });

    this.render(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sankey Diagram">${svg}</svg>`);
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-sankey', LvSankey);
export { LvSankey };

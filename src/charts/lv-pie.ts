import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

interface PieDatum {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_PALETTE = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#6366f1',
];

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  .arc { cursor: pointer; transition: opacity 0.2s; }
  .arc:hover { opacity: 0.9; }
  .arc-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 11px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }
  .hover-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 13px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .hover-label.visible { opacity: 1; }
  .legend-text { fill: var(--lv-text-dim, #888); font-size: 12px; }
  .legend-swatch { rx: 5; }
`;

const VIEW_SIZE = 300;
const OUTER_RADIUS = 130;
const LEGEND_ROW_H = 26;
const LEGEND_TOP_PAD = 16;

class LvPie extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'donut', 'legend'];
  }

  private _data: PieDatum[] = [];
  private _hasAnimated = false;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _container: HTMLDivElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    this._container = document.createElement('div');
    this.root.appendChild(this._container);

    this._data = this.jsonAttr<PieDatum[]>('data', []);
    this._initSvg();
    this._render(false);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  handleAttributeChange(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (name === 'data') {
      this._data = this.jsonAttr<PieDatum[]>('data', []);
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

  private _getColor(i: number, d: PieDatum): string {
    if (d.color) return d.color;
    const v = getComputedStyle(this).getPropertyValue(`--lv-chart-${i % 8}`).trim();
    return v || DEFAULT_PALETTE[i % 8];
  }

  private _initSvg() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('role', 'img');
    svgEl.setAttribute('aria-label', 'Pie chart');
    this._container!.appendChild(svgEl);
    this._svg = d3.select(svgEl);
    this._svg.append('g').attr('class', 'arcs-group');
    this._svg.append('g').attr('class', 'labels-group');
    this._svg.append('g').attr('class', 'hover-group');
    this._svg.append('g').attr('class', 'legend-group');
  }

  private _render(animate: boolean) {
    if (!this._svg) return;

    const data = this._data;
    const isDonut = this.hasAttribute('donut');
    const showLegend = this.hasAttribute('legend');

    const outerR = OUTER_RADIUS;
    const innerR = isDonut ? outerR * 0.6 : 0;
    const hoverOuterR = outerR + 5;

    const legendRows = showLegend ? data.length : 0;
    const legendHeight = legendRows > 0 ? LEGEND_TOP_PAD + legendRows * LEGEND_ROW_H : 0;
    const totalH = VIEW_SIZE + legendHeight;

    this._svg.attr('viewBox', `0 0 ${VIEW_SIZE} ${totalH}`);

    const cx = VIEW_SIZE / 2;
    const cy = VIEW_SIZE / 2;

    // Pie layout
    const pie = d3.pie<PieDatum>()
      .value(d => d.value)
      .sort(null)
      .padAngle(0.015);

    const arcs = pie(data);

    const arcGen = d3.arc<d3.PieArcDatum<PieDatum>>()
      .innerRadius(innerR)
      .outerRadius(outerR);

    const hoverArcGen = d3.arc<d3.PieArcDatum<PieDatum>>()
      .innerRadius(innerR)
      .outerRadius(hoverOuterR);

    // Arcs group
    const arcsGroup = this._svg.select<SVGGElement>('.arcs-group')
      .attr('transform', `translate(${cx},${cy})`);
    arcsGroup.selectAll('*').remove();

    // Hover label (center for donut, or floating)
    const hoverGroup = this._svg.select<SVGGElement>('.hover-group')
      .attr('transform', `translate(${cx},${cy})`);
    hoverGroup.selectAll('*').remove();

    const hoverLabel = hoverGroup.append('text')
      .attr('class', 'hover-label')
      .attr('x', 0)
      .attr('y', 0);

    const hoverValue = hoverGroup.append('text')
      .attr('class', 'hover-label')
      .attr('x', 0)
      .attr('y', 18)
      .style('font-size', '11px')
      .style('font-weight', '400');

    // Draw arcs
    for (let i = 0; i < arcs.length; i++) {
      const arcData = arcs[i];
      const color = this._getColor(i, arcData.data);

      const path = arcsGroup.append('path')
        .attr('class', 'arc')
        .attr('fill', color)
        .attr('stroke', 'var(--lv-bg, #0f0f23)')
        .attr('stroke-width', 1.5);

      if (animate) {
        // Animate: interpolate from startAngle to endAngle
        const startArc = { ...arcData, endAngle: arcData.startAngle };
        path.attr('d', arcGen(startArc)!)
          .transition()
          .delay(i * 120)
          .duration(800)
          .ease(d3.easeQuadOut)
          .attrTween('d', () => {
            const interp = d3.interpolate(startArc, arcData);
            return (t: number) => arcGen(interp(t))!;
          });
      } else {
        path.attr('d', arcGen(arcData)!);
      }

      // Hover
      path.on('mouseenter', () => {
        path.transition().duration(150)
          .attr('d', hoverArcGen(arcData)!);

        if (isDonut) {
          hoverLabel.text(arcData.data.label).classed('visible', true);
          hoverValue.text(String(arcData.data.value)).classed('visible', true);
        } else {
          const [lx, ly] = arcGen.centroid(arcData);
          hoverLabel
            .attr('x', lx * 1.6).attr('y', ly * 1.6 - 8)
            .text(arcData.data.label).classed('visible', true);
          hoverValue
            .attr('x', lx * 1.6).attr('y', ly * 1.6 + 8)
            .text(String(arcData.data.value)).classed('visible', true);
        }
      })
      .on('mouseleave', () => {
        path.transition().duration(150)
          .attr('d', arcGen(arcData)!);
        hoverLabel.classed('visible', false);
        hoverValue.classed('visible', false);
      });
    }

    // Static arc labels (if space permits)
    const labelsGroup = this._svg.select<SVGGElement>('.labels-group')
      .attr('transform', `translate(${cx},${cy})`);
    labelsGroup.selectAll('*').remove();

    if (!showLegend) {
      for (let i = 0; i < arcs.length; i++) {
        const arcData = arcs[i];
        const angle = arcData.endAngle - arcData.startAngle;
        // Only show label if arc is large enough
        if (angle > 0.35) {
          const [lx, ly] = arcGen.centroid(arcData);
          const label = labelsGroup.append('text')
            .attr('class', 'arc-label')
            .attr('x', lx)
            .attr('y', ly)
            .text(arcData.data.label);

          if (animate) {
            label.attr('opacity', 0)
              .transition()
              .delay(i * 120 + 600)
              .duration(300)
              .attr('opacity', 1);
          }
        }
      }
    }

    // Screen reader table
    let srTable = this._container!.querySelector('.sr-table');
    if (!srTable) {
      srTable = document.createElement('table');
      srTable.className = 'sr-table';
      this._container!.appendChild(srTable);
    }
    const srRows = data.map(d => `<tr><td>${d.label.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</td><td>${d.value}</td></tr>`).join('');
    srTable.innerHTML = `<caption>Pie chart data</caption><thead><tr><th>Label</th><th>Value</th></tr></thead><tbody>${srRows}</tbody>`;

    // Legend
    const legendGroup = this._svg.select<SVGGElement>('.legend-group');
    legendGroup.selectAll('*').remove();

    if (showLegend && data.length > 0) {
      const legendStartY = VIEW_SIZE + LEGEND_TOP_PAD;

      for (let i = 0; i < data.length; i++) {
        const lx = 20;
        const ly = legendStartY + i * LEGEND_ROW_H;
        const color = this._getColor(i, data[i]);

        legendGroup.append('rect')
          .attr('class', 'legend-swatch')
          .attr('x', lx)
          .attr('y', ly - 5)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color);

        legendGroup.append('text')
          .attr('class', 'legend-text')
          .attr('x', lx + 18)
          .attr('y', ly)
          .attr('dominant-baseline', 'central')
          .text(`${data[i].label} (${data[i].value})`);
      }
    }
  }
}

customElements.define('lv-pie', LvPie);

export { LvPie };

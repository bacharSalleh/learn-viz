import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

interface ScatterDatum {
  x: number;
  y: number;
  label?: string;
  color?: string;
  cluster?: string | number;
}

const DEFAULT_PALETTE = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#6366f1',
];

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .point { cursor: pointer; transition: opacity 0.2s; }
  .point:hover { opacity: 0.9; }
  .grid line { stroke: var(--lv-border, #2a2a4a); stroke-opacity: 0.4; }
  .grid .domain { display: none; }
  .axis-label { fill: var(--lv-text-dim, #888); font-size: 12px; }
  .axis line, .axis path { stroke: var(--lv-border, #2a2a4a); }
  .axis text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .tooltip-box {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .tooltip-box.visible { opacity: 1; }
  .tooltip-bg {
    fill: var(--lv-bg-raised, #1e1e3a);
    stroke: var(--lv-border, #2a2a4a);
    rx: 4;
  }
  .tooltip-text {
    fill: var(--lv-text, #e4e4ec);
    font-size: 11px;
    text-anchor: middle;
    dominant-baseline: central;
  }
  .legend-text { fill: var(--lv-text-dim, #888); font-size: 11px; }
`;

const MARGIN = { top: 20, right: 20, bottom: 50, left: 55 };
const VIEW_W = 500;
const VIEW_H = 400;

class LvScatter extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'x-label', 'y-label', 'clusters', 'tooltip'];
  }

  private _data: ScatterDatum[] = [];
  private _hasAnimated = false;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _container: HTMLDivElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    this._container = document.createElement('div');
    this.root.appendChild(this._container);

    this._data = this.jsonAttr<ScatterDatum[]>('data', []);
    this._initSvg();
    this._render(false);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (name === 'data') {
      this._data = this.jsonAttr<ScatterDatum[]>('data', []);
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

  private _getColor(i: number, d: ScatterDatum): string {
    if (d.color) return d.color;
    const v = getComputedStyle(this).getPropertyValue(`--lv-chart-${i % 8}`).trim();
    return v || DEFAULT_PALETTE[i % 8];
  }

  private _clusterColor(cluster: string | number): string {
    const clusters = [...new Set(this._data.map(d => d.cluster).filter(c => c != null))];
    const idx = clusters.indexOf(cluster);
    const i = idx >= 0 ? idx : 0;
    const v = getComputedStyle(this).getPropertyValue(`--lv-chart-${i % 8}`).trim();
    return v || DEFAULT_PALETTE[i % 8];
  }

  private _initSvg() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._container!.appendChild(svgEl);
    this._svg = d3.select(svgEl);
    this._svg.append('g').attr('class', 'grid-group');
    this._svg.append('g').attr('class', 'axis-group');
    this._svg.append('g').attr('class', 'points-group');
    this._svg.append('g').attr('class', 'tooltip-group');
    this._svg.append('g').attr('class', 'legend-group');
  }

  private _render(animate: boolean) {
    if (!this._svg) return;

    const data = this._data;
    const useClusters = this.hasAttribute('clusters');
    const showTooltip = this.hasAttribute('tooltip');
    const xLabel = this.getAttribute('x-label') || '';
    const yLabel = this.getAttribute('y-label') || '';

    // Compute legend height
    const clusters = useClusters
      ? [...new Set(data.map(d => d.cluster).filter(c => c != null))]
      : [];
    const legendHeight = clusters.length > 0 ? 30 : 0;
    const totalH = VIEW_H + legendHeight;

    const innerW = VIEW_W - MARGIN.left - MARGIN.right;
    const innerH = VIEW_H - MARGIN.top - MARGIN.bottom;

    this._svg.attr('viewBox', `0 0 ${VIEW_W} ${totalH}`);

    // Scales
    const xExtent = d3.extent(data, d => d.x) as [number, number];
    const yExtent = d3.extent(data, d => d.y) as [number, number];
    const xPad = (xExtent[1] - xExtent[0]) * 0.05 || 1;
    const yPad = (yExtent[1] - yExtent[0]) * 0.05 || 1;

    const xScale = d3.scaleLinear()
      .domain([xExtent[0] - xPad, xExtent[1] + xPad])
      .range([0, innerW]);

    const yScale = d3.scaleLinear()
      .domain([yExtent[0] - yPad, yExtent[1] + yPad])
      .range([innerH, 0]);

    // Grid
    const gridGroup = this._svg.select<SVGGElement>('.grid-group')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);
    gridGroup.selectAll('*').remove();

    // X grid
    const xGrid = d3.axisBottom(xScale).tickSize(-innerH).tickFormat(() => '');
    gridGroup.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerH})`)
      .call(xGrid as any);

    // Y grid
    const yGrid = d3.axisLeft(yScale).tickSize(-innerW).tickFormat(() => '');
    gridGroup.append('g')
      .attr('class', 'grid')
      .call(yGrid as any);

    // Axes
    const axisGroup = this._svg.select<SVGGElement>('.axis-group')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);
    axisGroup.selectAll('*').remove();

    axisGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6) as any);

    axisGroup.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(yScale).ticks(6) as any);

    // Axis labels
    if (xLabel) {
      axisGroup.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerW / 2)
        .attr('y', innerH + 38)
        .attr('text-anchor', 'middle')
        .text(xLabel);
    }
    if (yLabel) {
      axisGroup.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerH / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(yLabel);
    }

    // Points
    const pointsGroup = this._svg.select<SVGGElement>('.points-group')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    const tooltipGroup = this._svg.select<SVGGElement>('.tooltip-group')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);
    tooltipGroup.selectAll('*').remove();

    // Create tooltip elements
    const tooltipBox = tooltipGroup.append('g').attr('class', 'tooltip-box');
    tooltipBox.append('rect').attr('class', 'tooltip-bg');
    tooltipBox.append('text').attr('class', 'tooltip-text');

    const points = pointsGroup.selectAll<SVGCircleElement, ScatterDatum>('.point')
      .data(data, (_d, i) => String(i));

    points.exit().remove();

    const enter = points.enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', (d, i) => useClusters && d.cluster != null
        ? this._clusterColor(d.cluster)
        : this._getColor(i, d))
      .attr('opacity', animate ? 0 : 1)
      .attr('transform', animate ? 'scale(0)' : 'scale(1)')
      .style('transform-origin', d => `${xScale(d.x)}px ${yScale(d.y)}px`);

    // Hover behavior
    if (showTooltip) {
      enter.on('mouseenter', (event: MouseEvent, d: ScatterDatum) => {
        const target = d3.select(event.currentTarget as SVGCircleElement);
        target.transition().duration(150)
          .attr('r', 6.5)
          .attr('opacity', 1);

        if (d.label) {
          const px = xScale(d.x);
          const py = yScale(d.y) - 14;
          tooltipBox.classed('visible', true);
          tooltipBox.select('.tooltip-text')
            .attr('x', px)
            .attr('y', py)
            .text(d.label);

          const textNode = tooltipBox.select('.tooltip-text').node() as SVGTextElement;
          const textLen = textNode?.getComputedTextLength?.() || 40;
          tooltipBox.select('.tooltip-bg')
            .attr('x', px - textLen / 2 - 6)
            .attr('y', py - 10)
            .attr('width', textLen + 12)
            .attr('height', 20);
        }
      })
      .on('mouseleave', (event: MouseEvent) => {
        const target = d3.select(event.currentTarget as SVGCircleElement);
        target.transition().duration(150)
          .attr('r', 5)
          .attr('opacity', 0.85);
        tooltipBox.classed('visible', false);
      });
    } else {
      // Still scale on hover even without tooltip
      enter.on('mouseenter', (event: MouseEvent) => {
        d3.select(event.currentTarget as SVGCircleElement)
          .transition().duration(150).attr('r', 6.5);
      })
      .on('mouseleave', (event: MouseEvent) => {
        d3.select(event.currentTarget as SVGCircleElement)
          .transition().duration(150).attr('r', 5);
      });
    }

    // Update existing
    const merged = enter.merge(points);

    if (animate) {
      merged.each(function (_d, i) {
        d3.select(this)
          .transition()
          .delay(i * 30)
          .duration(400)
          .ease(d3.easeBackOut)
          .attr('opacity', 0.85)
          .attr('transform', 'scale(1)');
      });
    } else {
      merged
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('opacity', 0.85)
        .attr('transform', 'scale(1)')
        .attr('fill', (d, i) => useClusters && d.cluster != null
          ? this._clusterColor(d.cluster)
          : this._getColor(i, d));
    }

    // Persistent labels next to points (always visible)
    const showLabels = this.hasAttribute('labels') || this.hasAttribute('tooltip');
    if (showLabels) {
      const ptsGroup = this._svg!.select<SVGGElement>('.points-group');
      ptsGroup.selectAll('.point-label').remove();

      data.forEach((d: ScatterDatum, i: number) => {
        if (!d.label) return;
        const lbl = ptsGroup.append('text')
          .attr('class', 'point-label')
          .attr('x', xScale(d.x) + 8)
          .attr('y', yScale(d.y) + 4)
          .attr('fill', 'var(--lv-text, #e4e4ec)')
          .attr('font-size', '11px')
          .attr('opacity', animate ? 0 : 0.9)
          .text(d.label);

        if (animate) {
          lbl.transition()
            .delay(i * 30 + 200)
            .duration(300)
            .attr('opacity', 0.9);
        }
      });
    }

    // Legend
    const legendGroup = this._svg.select<SVGGElement>('.legend-group');
    legendGroup.selectAll('*').remove();

    if (clusters.length > 0) {
      const legendY = VIEW_H + 5;
      let legendX = MARGIN.left;

      for (const cluster of clusters) {
        const color = this._clusterColor(cluster);

        legendGroup.append('circle')
          .attr('cx', legendX + 5)
          .attr('cy', legendY + 8)
          .attr('r', 4)
          .attr('fill', color);

        legendGroup.append('text')
          .attr('class', 'legend-text')
          .attr('x', legendX + 14)
          .attr('y', legendY + 8)
          .attr('dominant-baseline', 'central')
          .text(String(cluster));

        legendX += 14 + String(cluster).length * 7 + 20;
      }
    }
  }
}

customElements.define('lv-scatter', LvScatter);

export { LvScatter };

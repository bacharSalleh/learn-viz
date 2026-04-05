import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

type DataPoint = { x: number; y: number };

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .area { opacity: 0; transition: opacity 0.5s; }
  .area.visible { opacity: 1; }
  .point { opacity: 0; transition: opacity 0.3s, transform 0.3s; }
  .point.visible { opacity: 1; }
  .tooltip-group { pointer-events: none; }
  .tooltip-bg { fill: var(--lv-bg-card, #1a1a2e); stroke: var(--lv-border, #2a2a4a); rx: 6; }
  .tooltip-text { fill: var(--lv-text, #e4e4ec); font-size: 11px; }
  .crosshair { stroke: var(--lv-text-dim, #888); stroke-dasharray: 3 3; stroke-width: 1; }
  .axis text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .axis path, .axis line { stroke: var(--lv-text-dim, #888); stroke-opacity: 0.3; }
  .grid line { stroke: var(--lv-text-dim, #888); stroke-opacity: 0.08; stroke-dasharray: 3 3; }
  .grid path { display: none; }
  .axis-label { fill: var(--lv-text-dim, #888); font-size: 11px; }
`;

const margin = { top: 20, right: 30, bottom: 40, left: 60 };
const viewW = 500;
const viewH = 250;
const innerW = viewW - margin.left - margin.right;
const innerH = viewH - margin.top - margin.bottom;

class LvLineChart extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'area', 'points', 'tooltip', 'color', 'x-label', 'y-label', 'animated'];
  }

  private _resizeObs: ResizeObserver | null = null;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _built = false;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this.root.innerHTML = `<svg></svg>`;
    this._buildChart();

    this._resizeObs = new ResizeObserver(() => {
      // SVG scales via viewBox, nothing extra needed,
      // but if we ever need to recalc we can do it here.
    });
    this._resizeObs.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    this._resizeObs = null;
  }

  handleAttributeChange(_name: string, _old: string | null, _new: string | null) {
    if (this._built) {
      this._buildChart();
    }
  }

  private _parseData(): DataPoint[] {
    const raw = this.jsonAttr<unknown>('data', []);
    if (!Array.isArray(raw) || raw.length === 0) return [];

    // Support [{x, y}] or [y1, y2, ...]
    if (typeof raw[0] === 'number') {
      return (raw as number[]).map((y, i) => ({ x: i, y }));
    }
    return raw as DataPoint[];
  }

  private _getColor(): string {
    return this.getAttribute('color') || 'var(--lv-accent, #3b82f6)';
  }

  private _buildChart() {
    const data = this._parseData();
    if (data.length === 0) return;

    const svgEl = this.root.querySelector('svg') as SVGSVGElement;
    if (!svgEl) return;

    const color = this._getColor();
    const showArea = this.hasAttribute('area');
    const showPoints = this.hasAttribute('points');
    const showTooltip = this.hasAttribute('tooltip');
    const xLabel = this.getAttribute('x-label') || '';
    const yLabel = this.getAttribute('y-label') || '';
    // Clear previous
    d3.select(svgEl).selectAll('*').remove();

    const svg = d3.select(svgEl)
      .attr('viewBox', `0 0 ${viewW} ${viewH}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    this._svg = svg;

    // Gradient def for area
    const defs = svg.append('defs');
    const gradientId = `lv-area-grad-${Math.random().toString(36).slice(2, 8)}`;
    const grad = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0').attr('y1', '0')
      .attr('x2', '0').attr('y2', '1');
    grad.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.25);
    grad.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xExtent = d3.extent(data, d => d.x) as [number, number];
    const yExtent = d3.extent(data, d => d.y) as [number, number];
    // Add a little padding to y
    const yPad = (yExtent[1] - yExtent[0]) * 0.1 || 1;

    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, innerW]);

    const yScale = d3.scaleLinear()
      .domain([yExtent[0] - yPad, yExtent[1] + yPad])
      .range([innerH, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerH})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(-innerH)
          .tickFormat(() => '')
      );

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-innerW)
          .tickFormat(() => '')
      );

    // Axes
    g.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6));

    g.append('g')
      .attr('class', 'axis y-axis')
      .call(d3.axisLeft(yScale).ticks(5));

    // Axis labels
    if (xLabel) {
      g.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerW / 2)
        .attr('y', innerH + 35)
        .attr('text-anchor', 'middle')
        .text(xLabel);
    }

    if (yLabel) {
      g.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerH / 2)
        .attr('y', -38)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(yLabel);
    }

    // Area
    if (showArea) {
      const areaGen = d3.area<DataPoint>()
        .x(d => xScale(d.x))
        .y0(innerH)
        .y1(d => yScale(d.y));

      g.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', areaGen)
        .attr('fill', `url(#${gradientId})`);
    }

    // Line
    const lineGen = d3.line<DataPoint>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    const linePath = g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', lineGen)
      .attr('stroke', color)
      .attr('stroke-width', 2.5);

    // Store total length for animation
    const pathNode = linePath.node() as SVGPathElement;
    const totalLength = pathNode.getTotalLength();

    // Start hidden for animation
    linePath
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength);

    // Points
    if (showPoints) {
      g.selectAll('.point')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5);
    }

    // Tooltip
    if (showTooltip) {
      this._setupTooltip(g, data, xScale, yScale, color);
    }

    this._built = true;

    // If animated is not explicitly false, check if we should auto-animate
    // The scroll observer will call animateIn, but if already in viewport we might need instant
    if (this.getAttribute('animated') === 'false') {
      this._showInstant();
    }
  }

  private _setupTooltip(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: DataPoint[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    color: string
  ) {
    const tooltipG = g.append('g')
      .attr('class', 'tooltip-group')
      .style('display', 'none');

    // Crosshair lines
    tooltipG.append('line')
      .attr('class', 'crosshair crosshair-x')
      .attr('y1', 0).attr('y2', innerH);

    tooltipG.append('line')
      .attr('class', 'crosshair crosshair-y')
      .attr('x1', 0).attr('x2', innerW);

    // Dot
    tooltipG.append('circle')
      .attr('r', 5)
      .attr('fill', color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    // Card bg + text
    tooltipG.append('rect')
      .attr('class', 'tooltip-bg')
      .attr('width', 60).attr('height', 24)
      .attr('rx', 6);

    tooltipG.append('text')
      .attr('class', 'tooltip-text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em');

    // Overlay rect to catch mouse events
    const bisector = d3.bisector<DataPoint, number>(d => d.x).left;

    g.append('rect')
      .attr('width', innerW)
      .attr('height', innerH)
      .attr('fill', 'transparent')
      .on('mousemove', (event: MouseEvent) => {
        const [mx] = d3.pointer(event);
        const x0 = xScale.invert(mx);
        let idx = bisector(data, x0, 1);
        if (idx >= data.length) idx = data.length - 1;
        if (idx > 0) {
          const d0 = data[idx - 1];
          const d1 = data[idx];
          idx = (x0 - d0.x) > (d1.x - x0) ? idx : idx - 1;
        }
        const d = data[idx];
        const px = xScale(d.x);
        const py = yScale(d.y);

        tooltipG.style('display', null);

        // Crosshairs
        tooltipG.select('.crosshair-x')
          .attr('x1', px).attr('x2', px);
        tooltipG.select('.crosshair-y')
          .attr('y1', py).attr('y2', py);

        // Dot
        tooltipG.select('circle')
          .attr('cx', px).attr('cy', py);

        // Card position — keep inside bounds
        const cardW = 60;
        const cardH = 24;
        let cx = px - cardW / 2;
        let cy = py - cardH - 10;
        if (cx < 0) cx = 0;
        if (cx + cardW > innerW) cx = innerW - cardW;
        if (cy < 0) cy = py + 10;

        tooltipG.select('.tooltip-bg')
          .attr('x', cx).attr('y', cy);

        tooltipG.select('.tooltip-text')
          .attr('x', cx + cardW / 2)
          .attr('y', cy + cardH / 2)
          .text(`${d.y.toFixed(1)}`);
      })
      .on('mouseleave', () => {
        tooltipG.style('display', 'none');
      });
  }

  private _showInstant() {
    if (!this._svg) return;
    const g = this._svg.select('g');

    // Show line instantly
    g.select('.line')
      .attr('stroke-dashoffset', 0);

    // Show area
    g.select('.area').classed('visible', true);

    // Show points
    g.selectAll('.point').classed('visible', true);
  }

  animateIn(instant?: boolean): void {
    if (!this._svg) return;

    if (instant || this.getAttribute('animated') === 'false') {
      this._showInstant();
      return;
    }

    const g = this._svg.select('g');

    // Self-drawing line animation
    const linePath = g.select('.line');
    const totalLength = (linePath.node() as SVGPathElement)?.getTotalLength() || 0;

    linePath
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1200)
      .ease(d3.easeQuadOut)
      .attr('stroke-dashoffset', 0);

    // Area fades in after line completes (300ms delay from line end)
    g.select('.area')
      .transition()
      .delay(1200 + 300)
      .duration(0)
      .on('start', function () {
        d3.select(this).classed('visible', true);
      });

    // Points pop in with stagger
    g.selectAll('.point')
      .each(function (_d, i) {
        d3.select(this)
          .transition()
          .delay(1200 + 300 + i * 50)
          .duration(0)
          .on('start', function () {
            d3.select(this).classed('visible', true);
          });
      });
  }
}

customElements.define('lv-line-chart', LvLineChart);

export { LvLineChart };

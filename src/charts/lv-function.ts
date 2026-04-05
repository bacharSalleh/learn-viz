import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const FUNCTIONS: Record<string, (x: number) => number> = {
  sigmoid: x => 1 / (1 + Math.exp(-x)),
  relu: x => Math.max(0, x),
  tanh: x => Math.tanh(x),
  linear: x => x,
};

const css = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; background: var(--lv-bg-raised, #12122a); border-radius: var(--lv-r-md, 12px); }
  .fn-line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .grid-line { stroke: var(--lv-border, #2a2a4a); stroke-dasharray: 4; opacity: 0.3; }
  .axis-line { stroke: var(--lv-text-dim, #888); stroke-width: 1; }
  .axis-text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .drag-point { cursor: grab; filter: drop-shadow(0 0 4px var(--lv-accent)); }
  .drag-point:active { cursor: grabbing; }
  .readout-bg { fill: var(--lv-bg-card, #1a1a2e); stroke: var(--lv-border, #2a2a4a); rx: 6; }
  .readout-text { fill: var(--lv-text, #e4e4ec); font-size: 11px; font-family: var(--lv-font-mono, monospace); }
  .crosshair { stroke: var(--lv-text-dim, #888); stroke-dasharray: 3 3; stroke-width: 1; }
  .key-point { fill: var(--lv-warning, #ffd93d); }
  .key-label { fill: var(--lv-warning, #ffd93d); font-size: 10px; }
`;

const VB_WIDTH = 500;
const VB_HEIGHT = 300;

class LvFunction extends LvBaseElement {
  static get observedAttributes() {
    return ['fn', 'range', 'samples', 'color', 'interactive', 'animated'];
  }

  private _hasAnimated = false;
  private _resizeObserver: ResizeObserver | null = null;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _fn: (x: number) => number = FUNCTIONS.sigmoid;
  private _fnName: string = 'sigmoid';

  private get _range(): [number, number] {
    return this.jsonAttr<[number, number]>('range', [-6, 6]);
  }

  private get _samples(): number {
    const s = this.getAttribute('samples');
    return s ? parseInt(s, 10) || 200 : 200;
  }

  private get _color(): string {
    return this.getAttribute('color') || 'var(--lv-accent, #3b82f6)';
  }

  private get _interactive(): boolean {
    return this.hasAttribute('interactive');
  }

  private get _animated(): boolean {
    // Default true
    const attr = this.getAttribute('animated');
    if (attr === null) return true;
    return attr !== 'false';
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    const container = document.createElement('div');
    this.root.appendChild(container);

    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('viewBox', `0 0 ${VB_WIDTH} ${VB_HEIGHT}`);
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    container.appendChild(svgEl);

    this._svg = d3.select(svgEl);
    this._parseFn();
    this._render(false);

    this._resizeObserver = new ResizeObserver(() => {
      // SVG is responsive via viewBox, no re-render needed
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (name === 'fn') this._parseFn();
    if (this._svg) {
      this._render(false);
    }
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant || !this._animated) {
      this._render(false);
    } else {
      this._render(true);
    }
  }

  private _parseFn(): void {
    const raw = this.getAttribute('fn') || 'sigmoid';
    this._fnName = raw;
    if (FUNCTIONS[raw]) {
      this._fn = FUNCTIONS[raw];
    } else {
      try {
        // Strip "x =>" or "x=>" prefix if present
        const expr = raw.replace(/^\s*x\s*=>\s*/, '');
        this._fn = new Function('x', 'return ' + expr) as (x: number) => number;
        this._fnName = 'custom';
      } catch {
        this._fn = FUNCTIONS.sigmoid;
        this._fnName = 'sigmoid';
      }
    }
  }

  private _generateData(): { x: number; y: number }[] {
    const [xMin, xMax] = this._range;
    const samples = this._samples;
    const step = (xMax - xMin) / (samples - 1);
    const data: { x: number; y: number }[] = [];
    for (let i = 0; i < samples; i++) {
      const x = xMin + i * step;
      const y = this._fn(x);
      data.push({ x, y });
    }
    return data;
  }

  private _render(animate: boolean): void {
    if (!this._svg) return;

    const svg = this._svg;
    svg.selectAll('*').remove();

    const data = this._generateData();
    const [xMin, xMax] = this._range;

    const yValues = data.map(d => d.y);
    const yDataMin = d3.min(yValues) ?? -1;
    const yDataMax = d3.max(yValues) ?? 1;
    const yPad = (yDataMax - yDataMin) * 0.15 || 0.5;
    const yMin = yDataMin - yPad;
    const yMax = yDataMax + yPad;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = VB_WIDTH - margin.left - margin.right;
    const height = VB_HEIGHT - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid lines
    this._drawGrid(g, xScale, yScale, width, height);

    // Axes
    this._drawAxes(g, xScale, yScale, width, height);

    // Function line
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const path = g.append('path')
      .datum(data)
      .attr('class', 'fn-line')
      .attr('d', line)
      .attr('stroke', this._color)
      .attr('stroke-width', 3);

    // Animate line drawing
    if (animate) {
      const pathNode = path.node()!;
      const totalLength = pathNode.getTotalLength();
      path
        .attr('stroke-dasharray', totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeQuadOut)
        .attr('stroke-dashoffset', 0);
    }

    // Key points
    this._drawKeyPoints(g, xScale, yScale);

    // Interactive draggable point
    if (this._interactive) {
      this._addInteractivePoint(g, xScale, yScale, data, width, height);
    }
  }

  private _drawGrid(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number,
  ): void {
    const xTicks = xScale.ticks();
    const yTicks = yScale.ticks();

    // Vertical grid lines
    g.selectAll('.grid-line-x')
      .data(xTicks)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', height);

    // Horizontal grid lines
    g.selectAll('.grid-line-y')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d));
  }

  private _drawAxes(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number,
  ): void {
    const [xMin, xMax] = xScale.domain();
    const [yMin, yMax] = yScale.domain();

    // X-axis (at y=0 if visible, otherwise at bottom)
    const xAxisY = (yMin <= 0 && yMax >= 0) ? yScale(0) : height;
    g.append('line')
      .attr('class', 'axis-line')
      .attr('x1', 0).attr('x2', width)
      .attr('y1', xAxisY).attr('y2', xAxisY);

    // Y-axis (at x=0 if visible, otherwise at left)
    const yAxisX = (xMin <= 0 && xMax >= 0) ? xScale(0) : 0;
    g.append('line')
      .attr('class', 'axis-line')
      .attr('x1', yAxisX).attr('x2', yAxisX)
      .attr('y1', 0).attr('y2', height);

    // X-axis ticks and labels
    const xTicks = xScale.ticks();
    xTicks.forEach(tick => {
      const x = xScale(tick);
      g.append('line')
        .attr('class', 'axis-line')
        .attr('x1', x).attr('x2', x)
        .attr('y1', xAxisY - 3).attr('y2', xAxisY + 3);
      g.append('text')
        .attr('class', 'axis-text')
        .attr('x', x)
        .attr('y', xAxisY + 14)
        .attr('text-anchor', 'middle')
        .text(tick);
    });

    // Y-axis ticks and labels
    const yTicks = yScale.ticks();
    yTicks.forEach(tick => {
      const y = yScale(tick);
      g.append('line')
        .attr('class', 'axis-line')
        .attr('x1', yAxisX - 3).attr('x2', yAxisX + 3)
        .attr('y1', y).attr('y2', y);
      g.append('text')
        .attr('class', 'axis-text')
        .attr('x', yAxisX - 12)
        .attr('y', y)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .text(tick);
    });
  }

  private _drawKeyPoints(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
  ): void {
    if (this._fnName === 'sigmoid') {
      const px = xScale(0);
      const py = yScale(0.5);
      g.append('circle')
        .attr('class', 'key-point')
        .attr('cx', px).attr('cy', py)
        .attr('r', 4);
      g.append('text')
        .attr('class', 'key-label')
        .attr('x', px + 8)
        .attr('y', py - 8)
        .text('\u03C3(0) = 0.5');
    } else if (this._fnName === 'relu') {
      const px = xScale(0);
      const py = yScale(0);
      g.append('circle')
        .attr('class', 'key-point')
        .attr('cx', px).attr('cy', py)
        .attr('r', 4);
      g.append('text')
        .attr('class', 'key-label')
        .attr('x', px + 8)
        .attr('y', py - 8)
        .text('kink point');
    }
  }

  private _addInteractivePoint(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    data: { x: number; y: number }[],
    width: number,
    height: number,
  ): void {
    const [xMin, xMax] = this._range;
    const fn = this._fn;

    // Start at the midpoint
    const startX = (xMin + xMax) / 2;
    const startY = fn(startX);

    // Crosshair lines
    const crosshairV = g.append('line')
      .attr('class', 'crosshair')
      .attr('x1', xScale(startX)).attr('x2', xScale(startX))
      .attr('y1', yScale(startY)).attr('y2', height);

    const crosshairH = g.append('line')
      .attr('class', 'crosshair')
      .attr('x1', 0).attr('x2', xScale(startX))
      .attr('y1', yScale(startY)).attr('y2', yScale(startY));

    // Readout background and text
    const readoutG = g.append('g');
    const readoutBg = readoutG.append('rect')
      .attr('class', 'readout-bg')
      .attr('width', 160).attr('height', 24)
      .attr('rx', 6);
    const readoutText = readoutG.append('text')
      .attr('class', 'readout-text')
      .attr('text-anchor', 'middle');

    // Draggable point
    const point = g.append('circle')
      .attr('class', 'drag-point')
      .attr('cx', xScale(startX))
      .attr('cy', yScale(startY))
      .attr('r', 8)
      .attr('fill', this._color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    const updateReadout = (px: number, py: number, dataX: number, dataY: number) => {
      const label = `x = ${dataX.toFixed(2)}, y = ${dataY.toFixed(2)}`;
      readoutText.text(label);

      // Readout dimensions
      const boxW = 160;
      const boxH = 24;
      const pad = 12; // gap above the drag point

      // Center the box horizontally above the point
      let rx = px - boxW / 2;
      let ry = py - boxH - pad;

      // Keep within chart bounds
      if (rx < 0) rx = 0;
      if (rx + boxW > width) rx = width - boxW;
      if (ry < 0) ry = py + pad; // flip below if clipped at top

      readoutBg
        .attr('x', rx)
        .attr('y', ry)
        .attr('width', boxW)
        .attr('height', boxH);
      readoutText
        .attr('x', rx + boxW / 2)
        .attr('y', ry + boxH / 2)
        .attr('text-anchor', 'middle');
    };

    updateReadout(xScale(startX), yScale(startY), startX, startY);

    // Drag behavior
    const drag = d3.drag<SVGCircleElement, unknown>()
      .on('drag', (event) => {
        // Clamp pixel x to chart area
        const px = Math.max(0, Math.min(width, event.x));
        const dataX = xScale.invert(px);
        const clampedX = Math.max(xMin, Math.min(xMax, dataX));
        const dataY = fn(clampedX);
        const cx = xScale(clampedX);
        const cy = yScale(dataY);

        point.attr('cx', cx).attr('cy', cy);

        crosshairV
          .attr('x1', cx).attr('x2', cx)
          .attr('y1', cy).attr('y2', height);

        crosshairH
          .attr('x1', 0).attr('x2', cx)
          .attr('y1', cy).attr('y2', cy);

        updateReadout(cx, cy, clampedX, dataY);
      });

    point.call(drag);
  }
}

customElements.define('lv-function', LvFunction);

export { LvFunction };

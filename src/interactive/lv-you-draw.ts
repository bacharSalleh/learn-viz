import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = /* css */ `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .container {
    width: 100%;
    background: var(--lv-bg-card);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    padding: var(--lv-sp-3, 12px);
  }

  svg {
    display: block;
    width: 100%;
    cursor: crosshair;
    user-select: none;
    touch-action: none;
  }

  .grid-line {
    stroke: var(--lv-border);
    stroke-dasharray: 3,3;
    stroke-width: 0.5;
  }

  .axis-text {
    font-family: var(--lv-font);
    font-size: 11px;
    fill: var(--lv-text-dim);
  }

  .axis-label {
    font-family: var(--lv-font);
    font-size: 12px;
    fill: var(--lv-text-dim);
    font-weight: 500;
  }

  .actual-line {
    fill: none;
    stroke: var(--lv-accent, #3b82f6);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .user-line {
    fill: none;
    stroke: var(--lv-warning, #f59e0b);
    stroke-width: 2.5;
    stroke-dasharray: 8,4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .revealed-line {
    fill: none;
    stroke: var(--lv-positive, #22c55e);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .draw-zone {
    fill: color-mix(in srgb, var(--lv-accent, #3b82f6) 5%, transparent);
  }

  .draw-prompt {
    font-family: var(--lv-font);
    font-size: 13px;
    fill: var(--lv-text-dim);
    text-anchor: middle;
    pointer-events: none;
  }

  .cutoff-line {
    stroke: var(--lv-border);
    stroke-width: 1;
    stroke-dasharray: 4,4;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-block-start: var(--lv-sp-3, 12px);
  }

  .btn {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 24px;
    border-radius: var(--lv-r-md, 8px);
    border: 2px solid var(--lv-accent);
    background: var(--lv-accent);
    color: var(--lv-bg-card);
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .error-text {
    font-family: var(--lv-font-mono, monospace);
    font-size: 0.9rem;
    color: var(--lv-text);
  }
`;

const W = 500, H = 300;
const M = { top: 20, right: 30, bottom: 40, left: 50 };

class LvYouDraw extends LvBaseElement {
  private _userPoints: { x: number; y: number }[] = [];
  private _revealed = false;
  private _drawing = false;
  private _hasAnimated = false;

  // d3 scales
  private _xScale: d3.ScaleLinear<number, number> | null = null;
  private _yScale: d3.ScaleLinear<number, number> | null = null;

  static get observedAttributes() {
    return ['data', 'reveal-at', 'x-label', 'y-label', 'reveal-label'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  handleAttributeChange() {
    if (this.isConnected && !this._revealed) {
      this._userPoints = [];
      this._build();
    }
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;
    const line = this.root.querySelector('.actual-line') as SVGPathElement;
    if (line) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      line.style.transition = 'stroke-dashoffset 0.8s ease-out';
      requestAnimationFrame(() => { line.style.strokeDashoffset = '0'; });
    }
  }

  private _build(): void {
    const data: number[] = this.jsonAttr('data', []);
    const revealAt = parseInt(this.getAttribute('reveal-at') || '0', 10);
    const xLabel = this.getAttribute('x-label') || '';
    const yLabel = this.getAttribute('y-label') || '';
    const revealLabel = this.getAttribute('reveal-label') || 'Reveal';

    if (!data.length || revealAt <= 0) {
      this.render('<div class="container"><em>No data</em></div>');
      return;
    }

    const iw = W - M.left - M.right;
    const ih = H - M.top - M.bottom;

    // Build scales
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, iw]);
    const yMin = Math.min(...data);
    const yMax = Math.max(...data);
    const yPad = (yMax - yMin) * 0.1 || 1;
    const yScale = d3.scaleLinear().domain([yMin - yPad, yMax + yPad]).range([ih, 0]);

    this._xScale = xScale;
    this._yScale = yScale;

    // Known data line (up to revealAt)
    const knownData = data.slice(0, revealAt);
    const linePath = d3.line<number>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX)(knownData) || '';

    // Grid lines
    const xTicks = xScale.ticks(8);
    const yTicks = yScale.ticks(6);
    let gridHtml = '';
    xTicks.forEach((t) => {
      gridHtml += `<line class="grid-line" x1="${xScale(t)}" y1="0" x2="${xScale(t)}" y2="${ih}" />`;
    });
    yTicks.forEach((t) => {
      gridHtml += `<line class="grid-line" x1="0" y1="${yScale(t)}" x2="${iw}" y2="${yScale(t)}" />`;
    });

    // X-axis ticks
    let xTickHtml = '';
    xTicks.forEach((t) => {
      xTickHtml += `<text class="axis-text" x="${xScale(t)}" y="${ih + 20}" text-anchor="middle">${Math.round(t)}</text>`;
    });

    // Y-axis ticks
    let yTickHtml = '';
    yTicks.forEach((t) => {
      yTickHtml += `<text class="axis-text" x="-10" y="${yScale(t) + 4}" text-anchor="end">${t.toFixed(1)}</text>`;
    });

    // Draw zone
    const drawZoneX = xScale(revealAt - 1);
    const drawZoneW = iw - drawZoneX;

    // Cutoff line
    const cutoffX = xScale(revealAt - 1);

    // Draw prompt
    const promptX = drawZoneX + drawZoneW / 2;
    const promptY = ih / 2;

    this.render(`
      <div class="container">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Draw your prediction chart">
          <g transform="translate(${M.left},${M.top})">
            ${gridHtml}
            <rect class="draw-zone" x="${drawZoneX}" y="0" width="${drawZoneW}" height="${ih}" rx="4" />
            <line class="cutoff-line" x1="${cutoffX}" y1="0" x2="${cutoffX}" y2="${ih}" />
            <path class="actual-line" d="${linePath}" />
            <g class="user-path-group"></g>
            <g class="revealed-path-group"></g>
            <text class="draw-prompt" x="${promptX}" y="${promptY}">Draw your prediction here</text>
            ${xTickHtml}
            ${yTickHtml}
            ${xLabel ? `<text class="axis-label" x="${iw / 2}" y="${ih + 36}" text-anchor="middle">${this._esc(xLabel)}</text>` : ''}
            ${yLabel ? `<text class="axis-label" x="-36" y="${ih / 2}" text-anchor="middle" transform="rotate(-90,-36,${ih / 2})">${this._esc(yLabel)}</text>` : ''}
            <rect class="draw-area" x="${drawZoneX}" y="0" width="${drawZoneW}" height="${ih}" fill="transparent" />
          </g>
        </svg>
        <div class="controls">
          <button class="btn reveal-btn">${this._esc(revealLabel)}</button>
          <span class="error-text"></span>
        </div>
      </div>
    `);

    this._attachDrawListeners();
    this._attachRevealListener();
  }

  private _attachDrawListeners(): void {
    const drawArea = this.root.querySelector('.draw-area') as SVGRectElement;
    if (!drawArea) return;

    const svg = this.root.querySelector('svg') as SVGSVGElement;
    if (!svg) return;

    const getDataCoords = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const svgX = (e.clientX - rect.left) * scaleX - M.left;
      const svgY = (e.clientY - rect.top) * scaleY - M.top;
      return { svgX, svgY };
    };

    const onPointerDown = (e: PointerEvent) => {
      if (this._revealed) return;
      e.preventDefault();
      this._drawing = true;
      drawArea.setPointerCapture(e.pointerId);
      // Clear the draw prompt
      const prompt = this.root.querySelector('.draw-prompt');
      if (prompt) prompt.remove();

      const { svgX, svgY } = getDataCoords(e);
      this._addPoint(svgX, svgY);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!this._drawing || this._revealed) return;
      e.preventDefault();
      const { svgX, svgY } = getDataCoords(e);
      this._addPoint(svgX, svgY);
    };

    const onPointerUp = () => {
      this._drawing = false;
    };

    drawArea.addEventListener('pointerdown', onPointerDown);
    drawArea.addEventListener('pointermove', onPointerMove);
    drawArea.addEventListener('pointerup', onPointerUp);
    drawArea.addEventListener('pointerleave', onPointerUp);
  }

  private _addPoint(svgX: number, svgY: number): void {
    if (!this._xScale || !this._yScale) return;

    const data: number[] = this.jsonAttr('data', []);
    const revealAt = parseInt(this.getAttribute('reveal-at') || '0', 10);
    const iw = W - M.left - M.right;
    const ih = H - M.top - M.bottom;

    // Clamp to draw zone
    const minX = this._xScale(revealAt - 1);
    const maxX = iw;
    const clampedX = Math.max(minX, Math.min(maxX, svgX));
    const clampedY = Math.max(0, Math.min(ih, svgY));

    // Constrain x to only go forward
    if (this._userPoints.length > 0) {
      const lastX = this._userPoints[this._userPoints.length - 1].x;
      if (clampedX <= lastX) return;
    }

    this._userPoints.push({ x: clampedX, y: clampedY });
    this._renderUserLine();
  }

  private _renderUserLine(): void {
    const group = this.root.querySelector('.user-path-group');
    if (!group) return;

    if (this._userPoints.length < 2) return;

    const pathData = d3.line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveMonotoneX)(this._userPoints) || '';

    group.innerHTML = `<path class="user-line" d="${pathData}" />`;
  }

  private _attachRevealListener(): void {
    const btn = this.root.querySelector('.reveal-btn') as HTMLButtonElement;
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (this._revealed) return;
      this._revealed = true;
      btn.disabled = true;
      this._reveal();
    });
  }

  private _reveal(): void {
    const data: number[] = this.jsonAttr('data', []);
    const revealAt = parseInt(this.getAttribute('reveal-at') || '0', 10);

    if (!this._xScale || !this._yScale) return;

    // Build the full actual line from revealAt-1 onward (connects to known data)
    const revealData = data.slice(revealAt - 1);
    const xScale = this._xScale;
    const yScale = this._yScale;

    const revealPath = d3.line<number>()
      .x((_, i) => xScale(revealAt - 1 + i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX)(revealData) || '';

    const group = this.root.querySelector('.revealed-path-group');
    if (!group) return;

    group.innerHTML = `<path class="revealed-line" d="${revealPath}" />`;

    // Animate the revealed line
    const path = group.querySelector('.revealed-line') as SVGPathElement;
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.transition = 'stroke-dashoffset 1s ease-out';
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
      });
    }

    // Calculate error
    const error = this._calculateError(data, revealAt);
    const errorText = this.root.querySelector('.error-text');
    if (errorText && error !== null) {
      errorText.textContent = `Your average error: ${error.toFixed(2)}`;
    }

    // Build user line as data values for the event
    const userLineValues = this._getUserValues(data, revealAt);

    this.dispatchEvent(
      new CustomEvent('lv-draw-reveal', {
        detail: {
          error: error ?? 0,
          userLine: userLineValues,
          actual: data.slice(revealAt),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _calculateError(data: number[], revealAt: number): number | null {
    if (!this._xScale || !this._yScale || this._userPoints.length < 2) return null;

    const xScale = this._xScale;
    const yScale = this._yScale;
    const actual = data.slice(revealAt);

    let totalError = 0;
    let count = 0;

    for (let i = 0; i < actual.length; i++) {
      const dataX = xScale(revealAt + i);
      // Find closest user point by x
      const userY = this._interpolateUserY(dataX);
      if (userY !== null) {
        const userVal = yScale.invert(userY);
        totalError += Math.abs(userVal - actual[i]);
        count++;
      }
    }

    return count > 0 ? totalError / count : null;
  }

  private _interpolateUserY(targetX: number): number | null {
    if (this._userPoints.length === 0) return null;
    if (targetX <= this._userPoints[0].x) return this._userPoints[0].y;
    if (targetX >= this._userPoints[this._userPoints.length - 1].x) {
      return this._userPoints[this._userPoints.length - 1].y;
    }

    for (let i = 0; i < this._userPoints.length - 1; i++) {
      const p0 = this._userPoints[i];
      const p1 = this._userPoints[i + 1];
      if (targetX >= p0.x && targetX <= p1.x) {
        const t = (targetX - p0.x) / (p1.x - p0.x);
        return p0.y + t * (p1.y - p0.y);
      }
    }

    return null;
  }

  private _getUserValues(data: number[], revealAt: number): number[] {
    if (!this._xScale || !this._yScale) return [];
    const xScale = this._xScale;
    const yScale = this._yScale;
    const result: number[] = [];

    for (let i = revealAt; i < data.length; i++) {
      const dataX = xScale(i);
      const userY = this._interpolateUserY(dataX);
      result.push(userY !== null ? yScale.invert(userY) : 0);
    }

    return result;
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-you-draw', LvYouDraw);
export { LvYouDraw };

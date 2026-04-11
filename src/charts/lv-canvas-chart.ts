import { LvBaseElement } from '../core/base-element.js';
import { CanvasChart, type Point, type Tick } from '../core/canvas.js';
import { formatNum } from '../core/utils.js';

interface SeriesDatum { x: number; y: number }
interface Series {
  label: string;
  color: string;
  values: SeriesDatum[];
  type?: 'line' | 'area';
}

const css = `
  :host { display: block; }
  .lv-cc-wrap { position: relative; width: 100%; }
  .lv-cc-chart { position: relative; width: 100%; height: 280px; }
  .lv-cc-legend {
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
    gap: 12px; margin-top: 8px; font-size: 12px;
  }
  .lv-cc-legend-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    font-family: inherit; font-size: 12px; padding: 2px 4px; border-radius: 4px;
    transition: opacity 0.15s, filter 0.15s;
    color: var(--lv-text, #e4e4ec);
  }
  .lv-cc-legend-btn:focus-visible { outline: 2px solid var(--lv-accent, #3b82f6); outline-offset: 2px; }
  .lv-cc-legend-btn[aria-pressed="false"] { opacity: 0.35; text-decoration: line-through; }
  .lv-cc-swatch { display: inline-block; width: 16px; height: 3px; border-radius: 2px; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  .lv-cc-controls { display: flex; justify-content: center; margin-top: 8px; }
  ::slotted(*) { margin: 0; }
`;

class LvCanvasChart extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'x-label', 'y-label', 'x-format', 'y-format', 'smooth', 'legend', 'gridlines', 'tooltip'];
  }

  private _chart: CanvasChart | null = null;
  private _series: Series[] = [];
  private _visible: boolean[] = [];
  private _built = false;
  private _hasAnimated = false;
  private _animProgress = 0; // 0..1 for clip animation
  private _animRaf = 0;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this.root.innerHTML = `
      <div class="lv-cc-wrap" role="img" aria-label="Canvas chart">
        <div class="lv-cc-chart"></div>
        <div class="lv-cc-legend"></div>
        <div class="lv-cc-controls"><slot name="controls"></slot></div>
        <table class="sr-table"><caption>Chart data</caption><thead></thead><tbody></tbody></table>
      </div>
    `;
    this._parseSeries();
    this._setup();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = null;
    if (this._animRaf) cancelAnimationFrame(this._animRaf);
  }

  handleAttributeChange() {
    if (!this._built) return;
    this._parseSeries();
    this._buildLegend();
    this._drawStatic();
    this._updateSrTable();
  }

  private _parseSeries() {
    this._series = this.jsonAttr<Series[]>('data', []);
    // Preserve visibility state if length matches, otherwise reset
    if (this._visible.length !== this._series.length) {
      this._visible = this._series.map(() => true);
    }
  }

  private _setup() {
    const container = this.root.querySelector('.lv-cc-chart') as HTMLElement;
    if (!container) return;

    this._chart = new CanvasChart(this, container, {
      padding: { top: 20, right: 20, bottom: 52, left: 55 },
      onResize: () => this._drawStatic(),
    });

    if (this.hasAttribute('tooltip') || !this.hasAttribute('tooltip')) {
      // Tooltip on by default
      const showTooltip = this.getAttribute('tooltip') !== 'false';
      if (showTooltip) {
        this._chart.onHover((e) => this._handleHover(e));
        this._chart.onLeave(() => this._handleLeave());
      }
    }

    this._buildLegend();
    this._drawStatic();
    this._updateSrTable();
    this._built = true;
  }

  private _getDomains(): { xDomain: [number, number]; yDomain: [number, number] } {
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    for (let i = 0; i < this._series.length; i++) {
      if (!this._visible[i]) continue;
      for (const d of this._series[i].values) {
        if (d.x < xMin) xMin = d.x;
        if (d.x > xMax) xMax = d.x;
        if (d.y < yMin) yMin = d.y;
        if (d.y > yMax) yMax = d.y;
      }
    }
    if (!isFinite(xMin)) { xMin = 0; xMax = 1; yMin = 0; yMax = 1; }
    const yPad = (yMax - yMin) * 0.1 || 0.5;
    return {
      xDomain: [xMin, xMax],
      yDomain: [Math.min(yMin - yPad, 0), yMax + yPad],
    };
  }

  private _drawStatic() {
    const c = this._chart;
    if (!c || this._series.length === 0) return;

    c.clear('static');
    const { xDomain, yDomain } = this._getDomains();
    const xs = c.xScale(xDomain);
    const ys = c.yScale(yDomain);
    const ctx = c.staticCtx;
    const smooth = this.getAttribute('smooth') !== 'false';
    const showGrid = this.getAttribute('gridlines') !== 'false';

    // Gridlines
    if (showGrid) {
      const xTicks = CanvasChart.niceTicksForRange(xDomain[0], xDomain[1], 6);
      const yTicks = CanvasChart.niceTicksForRange(yDomain[0], yDomain[1], 5);
      c.drawGridlines(ctx, xTicks.map(xs), yTicks.map(ys));
    }

    // Axes
    c.drawAxes(ctx);

    // Axis labels
    const xTicks = CanvasChart.niceTicksForRange(xDomain[0], xDomain[1], 6);
    const yTicks = CanvasChart.niceTicksForRange(yDomain[0], yDomain[1], 5);
    const xFmt = this.getAttribute('x-format') || '';
    const yFmt = this.getAttribute('y-format') || '';
    c.drawAxisLabels(ctx,
      xTicks.map(v => ({ pos: xs(v), label: formatNum(v) + xFmt } as Tick)),
      yTicks.map(v => ({ pos: ys(v), label: formatNum(v) + yFmt } as Tick)),
    );

    // X-axis label text
    const xLabel = this.getAttribute('x-label');
    if (xLabel) {
      c.drawText(ctx, xLabel, c.plotX + c.plotWidth / 2, c.plotY + c.plotHeight + 34,
        { color: c.getThemeColor('--lv-text-dim') || '#888', size: 11, align: 'center', baseline: 'top' });
    }

    // Y-axis label text
    const yLabel = this.getAttribute('y-label');
    if (yLabel) {
      ctx.save();
      ctx.translate(14, c.plotY + c.plotHeight / 2);
      ctx.rotate(-Math.PI / 2);
      c.drawText(ctx, yLabel, 0, 0,
        { color: c.getThemeColor('--lv-text-dim') || '#888', size: 11, align: 'center', baseline: 'middle' });
      ctx.restore();
    }

    // Clip for animation
    if (this._animProgress < 1) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(c.plotX, c.plotY, c.plotWidth * this._animProgress, c.plotHeight);
      ctx.clip();
    }

    // Draw each series
    const baseline = ys(yDomain[0]);
    for (let i = 0; i < this._series.length; i++) {
      if (!this._visible[i]) continue;
      const s = this._series[i];
      const pts: Point[] = s.values.map(d => ({ x: xs(d.x), y: ys(d.y) }));

      if (s.type === 'area') {
        if (smooth) {
          c.drawSmoothArea(ctx, pts, baseline, { fill: s.color, opacity: 0.15 });
        } else {
          c.drawArea(ctx, pts, baseline, { fill: s.color, opacity: 0.15 });
        }
      }

      if (smooth) {
        c.drawSmoothLine(ctx, pts, { color: s.color, width: 2.5 });
      } else {
        c.drawLine(ctx, pts, { color: s.color, width: 2.5 });
      }
    }

    if (this._animProgress < 1) {
      ctx.restore();
    }
  }

  private _handleHover(e: { canvasX: number; canvasY: number }) {
    const c = this._chart;
    if (!c || this._series.length === 0) return;

    const { xDomain, yDomain } = this._getDomains();
    const xs = c.xScale(xDomain);
    const ys = c.yScale(yDomain);
    const xInv = c.xScaleInvert(xDomain);
    const smooth = this.getAttribute('smooth') !== 'false';

    const hoverX = xInv(e.canvasX);

    // Clear overlay
    c.clear('overlay');
    const ctx = c.overlayCtx;

    // Crosshair vertical line
    const clampedX = Math.max(xDomain[0], Math.min(xDomain[1], hoverX));
    const px = xs(clampedX);

    if (px < c.plotX || px > c.plotX + c.plotWidth) {
      c.hideTooltip();
      return;
    }

    ctx.save();
    ctx.strokeStyle = c.getThemeColor('--lv-text-dim') || '#888';
    ctx.globalAlpha = 0.4;
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px, c.plotY);
    ctx.lineTo(px, c.plotY + c.plotHeight);
    ctx.stroke();
    ctx.restore();

    // Find nearest points and draw highlight circles
    let tooltipHtml = '';
    for (let i = 0; i < this._series.length; i++) {
      if (!this._visible[i]) continue;
      const s = this._series[i];
      // Binary search for nearest x
      const vals = s.values;
      let idx = 0;
      let bestDist = Infinity;
      for (let j = 0; j < vals.length; j++) {
        const d = Math.abs(vals[j].x - clampedX);
        if (d < bestDist) { bestDist = d; idx = j; }
      }
      const pt = vals[idx];
      const ptx = xs(pt.x);
      const pty = ys(pt.y);

      c.drawCircle(ctx, ptx, pty, 5, { fill: s.color, stroke: '#fff', strokeWidth: 2 });

      const yFmt = this.getAttribute('y-format') || '';
      tooltipHtml += `<div style="color:${s.color};white-space:nowrap"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>${s.label}: <strong>${formatNum(pt.y)}${yFmt}</strong></div>`;
    }

    if (tooltipHtml) {
      c.showTooltip(tooltipHtml, e.canvasX, e.canvasY);
    }
  }

  private _handleLeave() {
    const c = this._chart;
    if (!c) return;
    c.clear('overlay');
    c.hideTooltip();
  }

  private _buildLegend() {
    if (this.getAttribute('legend') === 'false') return;
    const container = this.root.querySelector('.lv-cc-legend');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < this._series.length; i++) {
      const s = this._series[i];
      const btn = document.createElement('button');
      btn.className = 'lv-cc-legend-btn';
      btn.setAttribute('aria-pressed', String(this._visible[i]));
      btn.innerHTML = `<span class="lv-cc-swatch" style="background:${s.color}"></span>${s.label}`;
      btn.addEventListener('click', () => {
        this._visible[i] = !this._visible[i];
        btn.setAttribute('aria-pressed', String(this._visible[i]));
        this._drawStatic();
      });
      container.appendChild(btn);
    }
  }

  private _updateSrTable() {
    const table = this.root.querySelector('.sr-table');
    if (!table) return;
    const cols = ['X', ...this._series.map(s => s.label)];
    const thead = `<tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>`;

    // Collect all unique x values
    const xSet = new Set<number>();
    for (const s of this._series) for (const d of s.values) xSet.add(d.x);
    const xs = [...xSet].sort((a, b) => a - b);

    const rows = xs.map(x => {
      const cells = [formatNum(x)];
      for (const s of this._series) {
        const match = s.values.find(d => d.x === x);
        cells.push(match ? formatNum(match.y) : '-');
      }
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }).join('');

    table.innerHTML = `<caption>Chart data</caption><thead>${thead}</thead><tbody>${rows}</tbody>`;
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || prefersReduced) {
      this._animProgress = 1;
      this._drawStatic();
      return;
    }

    // Animate clip from left to right over 800ms
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      this._animProgress = Math.min(1, elapsed / duration);
      this._drawStatic();
      if (this._animProgress < 1) {
        this._animRaf = requestAnimationFrame(tick);
      }
    };
    this._animRaf = requestAnimationFrame(tick);
  }
}

customElements.define('lv-canvas-chart', LvCanvasChart);
export { LvCanvasChart };

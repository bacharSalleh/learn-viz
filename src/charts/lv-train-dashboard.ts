import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .td-container { width: 100%; }
  svg { display: block; width: 100%; }
  .legend { display: flex; gap: 16px; justify-content: center; margin-bottom: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
  .legend-item { display: flex; align-items: center; gap: 6px; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .axis-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .grid-line { stroke: var(--lv-border); stroke-dasharray: 3,3; }
  .metric-line { fill: none; stroke-width: 2; stroke-linecap: round; }
  .tooltip-card { pointer-events: none; }
`;

const W = 560, H = 280;
const M = { top: 30, right: 60, bottom: 40, left: 55 };

class LvTrainDashboard extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['loss', 'accuracy', 'lr', 'x-label', 'tooltip'];
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
    const paths = this.root.querySelectorAll('.metric-line');
    paths.forEach(path => {
      const p = path as SVGPathElement;
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.transition = `stroke-dashoffset 1.2s ${(p.dataset.idx || '0')}s ease-out`;
      requestAnimationFrame(() => { p.style.strokeDashoffset = '0'; });
    });
  }

  private _buildChart(): void {
    const loss: number[] = this.jsonAttr('loss', []);
    const accuracy: number[] = this.jsonAttr('accuracy', []);
    const lr: number[] = this.jsonAttr('lr', []);
    const xLabel = this.getAttribute('x-label') || 'Epoch';
    const hasTooltip = this.hasAttribute('tooltip');

    const maxLen = Math.max(loss.length, accuracy.length, lr.length);
    if (maxLen === 0) { this.render('<div class="td-container"></div>'); return; }

    const iw = W - M.left - M.right;
    const ih = H - M.top - M.bottom;

    const xScale = d3.scaleLinear().domain([0, maxLen - 1]).range([0, iw]);

    // Left axis: loss + accuracy (0 to max)
    const leftMax = Math.max(
      loss.length ? Math.max(...loss) : 0,
      accuracy.length ? Math.max(...accuracy) : 1
    ) * 1.1;
    const yLeft = d3.scaleLinear().domain([0, leftMax]).range([ih, 0]);

    // Right axis: learning rate
    const hasLr = lr.length > 0;
    const lrMax = hasLr ? Math.max(...lr) * 1.2 : 1;
    const yRight = d3.scaleLinear().domain([0, lrMax]).range([ih, 0]);

    const line = (data: number[], yScale: d3.ScaleLinear<number, number>) =>
      d3.line<number>()
        .x((_, i) => M.left + xScale(i))
        .y(d => M.top + yScale(d))
        .curve(d3.curveMonotoneX)(data) || '';

    const metrics: { name: string; color: string; data: number[]; axis: 'left' | 'right' }[] = [];
    if (loss.length) metrics.push({ name: 'Loss', color: 'var(--lv-negative)', data: loss, axis: 'left' });
    if (accuracy.length) metrics.push({ name: 'Accuracy', color: 'var(--lv-positive)', data: accuracy, axis: 'left' });
    if (hasLr) metrics.push({ name: 'Learning Rate', color: 'var(--lv-accent2)', data: lr, axis: 'right' });

    // Legend HTML
    const legend = metrics.map(m =>
      `<div class="legend-item"><div class="legend-dot" style="background:${m.color}"></div>${m.name}</div>`
    ).join('');

    // Grid lines
    let grid = '';
    const yTicks = yLeft.ticks(5);
    yTicks.forEach(t => {
      const y = M.top + yLeft(t);
      grid += `<line class="grid-line" x1="${M.left}" x2="${W - M.right}" y1="${y}" y2="${y}"/>`;
    });

    // Axis labels
    let axes = '';
    yTicks.forEach(t => {
      const y = M.top + yLeft(t);
      axes += `<text class="axis-text" x="${M.left - 8}" y="${y}" text-anchor="end" dominant-baseline="central">${t.toFixed(2)}</text>`;
    });
    if (hasLr) {
      yRight.ticks(4).forEach(t => {
        const y = M.top + yRight(t);
        axes += `<text class="axis-text" x="${W - M.right + 8}" y="${y}" text-anchor="start" dominant-baseline="central">${t.toFixed(4)}</text>`;
      });
    }
    const xTicks = xScale.ticks(Math.min(maxLen, 10));
    xTicks.forEach(t => {
      const x = M.left + xScale(t);
      axes += `<text class="axis-text" x="${x}" y="${H - M.bottom + 20}" text-anchor="middle">${Math.round(t)}</text>`;
    });
    axes += `<text class="axis-text" x="${W / 2}" y="${H - 4}" text-anchor="middle">${xLabel}</text>`;

    // Paths
    let paths = '';
    metrics.forEach((m, idx) => {
      const yScale = m.axis === 'left' ? yLeft : yRight;
      const d = line(m.data, yScale);
      paths += `<path class="metric-line" d="${d}" stroke="${m.color}" data-idx="${idx * 0.3}"/>`;
    });

    this.render(`
      <div class="td-container">
        <div class="legend">${legend}</div>
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Training Dashboard">
          ${grid}${axes}${paths}
        </svg>
      </div>
    `);
  }
}

customElements.define('lv-train-dashboard', LvTrainDashboard);
export { LvTrainDashboard };

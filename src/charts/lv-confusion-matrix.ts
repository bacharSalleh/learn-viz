import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;

class LvConfusionMatrix extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['labels', 'values', 'normalize', 'show-metrics'];
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
    const cells = this.root.querySelectorAll('.cell');
    cells.forEach((el, i) => {
      const e = el as HTMLElement;
      const row = Math.floor(i / Math.sqrt(cells.length));
      const col = i % Math.sqrt(cells.length);
      const delay = (row + col) * 40;
      e.style.transition = 'none';
      e.style.opacity = '0';
      e.style.transform = 'scale(0.5)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        e.style.transition = `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`;
        e.style.opacity = '1';
        e.style.transform = 'scale(1)';
      }));
    });
  }

  private _buildChart(): void {
    const labels: string[] = this.jsonAttr('labels', []);
    const rawValues: number[][] = this.jsonAttr('values', []);
    const normalize = this.hasAttribute('normalize');
    const showMetrics = this.hasAttribute('show-metrics');

    if (!labels.length || !rawValues.length) {
      this.render('<div class="cm-container"></div>');
      return;
    }

    const n = labels.length;
    const values = normalize
      ? rawValues.map(row => {
          const sum = row.reduce((a, b) => a + b, 0);
          return sum > 0 ? row.map(v => v / sum) : row;
        })
      : rawValues;

    const maxVal = Math.max(...values.flat());
    const cellSize = 56;
    const gap = 3;
    const headerH = 70;
    const headerW = 80;
    const metricsW = showMetrics ? 60 : 0;
    const metricsH = showMetrics ? 40 : 0;
    const gridW = n * cellSize + (n - 1) * gap;
    const gridH = gridW;
    const svgW = headerW + gridW + metricsW;
    const svgH = headerH + gridH + metricsH;

    const isRtl = this.isRtl;

    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, maxVal || 1]);

    const contrastColor = (val: number) => {
      const rgb = d3.color(colorScale(val));
      if (!rgb) return '#fff';
      const { r, g, b } = rgb.rgb();
      return (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? '#111' : '#fff';
    };

    let svg = '';

    // Column headers
    for (let c = 0; c < n; c++) {
      const x = headerW + c * (cellSize + gap) + cellSize / 2;
      svg += `<text class="header-text" x="${isRtl ? svgW - x : x}" y="${headerH - 8}"
        text-anchor="middle">${this._esc(labels[c])}</text>`;
    }

    // Row headers
    for (let r = 0; r < n; r++) {
      const y = headerH + r * (cellSize + gap) + cellSize / 2;
      const x = isRtl ? svgW - headerW / 2 : headerW / 2;
      svg += `<text class="header-text" x="${x}" y="${y}"
        text-anchor="middle" dominant-baseline="central">${this._esc(labels[r])}</text>`;
    }

    // Cells
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const val = values[r][c];
        const rawVal = rawValues[r][c];
        const cx = headerW + c * (cellSize + gap);
        const cy = headerH + r * (cellSize + gap);
        const x = isRtl ? svgW - cx - cellSize : cx;
        const color = colorScale(val);
        const textColor = contrastColor(val);
        const displayVal = normalize ? (val * 100).toFixed(0) + '%' : String(rawVal);
        const isDiag = r === c;

        svg += `<g class="cell">
          <rect x="${x}" y="${cy}" width="${cellSize}" height="${cellSize}"
            rx="4" fill="${color}" ${isDiag ? 'stroke="var(--lv-accent)" stroke-width="2"' : ''}/>
          <text class="cell-text" x="${x + cellSize / 2}" y="${cy + cellSize / 2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${textColor}">${displayVal}</text>
        </g>`;
      }
    }

    // Metrics (precision per column, recall per row)
    if (showMetrics) {
      for (let c = 0; c < n; c++) {
        const tp = rawValues[c][c];
        const colSum = rawValues.reduce((s, row) => s + row[c], 0);
        const precision = colSum > 0 ? (tp / colSum * 100).toFixed(0) + '%' : '-';
        const cx = headerW + c * (cellSize + gap) + cellSize / 2;
        const x = isRtl ? svgW - cx : cx;
        svg += `<text class="metric-text" x="${x}" y="${headerH + gridH + 25}"
          text-anchor="middle" fill="var(--lv-positive)">${precision}</text>`;
      }
      for (let r = 0; r < n; r++) {
        const tp = rawValues[r][r];
        const rowSum = rawValues[r].reduce((a, b) => a + b, 0);
        const recall = rowSum > 0 ? (tp / rowSum * 100).toFixed(0) + '%' : '-';
        const y = headerH + r * (cellSize + gap) + cellSize / 2;
        const x = isRtl ? headerW / 2 - 20 : headerW + gridW + 10;
        svg += `<text class="metric-text" x="${x}" y="${y}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${recall}</text>`;
      }
    }

    // Axis labels
    svg += `<text class="axis-label" x="${isRtl ? svgW - headerW / 2 : headerW / 2}" y="14"
      text-anchor="middle">Actual</text>`;
    svg += `<text class="axis-label" x="${svgW / 2}" y="${svgH - 2}"
      text-anchor="middle">Predicted</text>`;

    this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="Confusion Matrix">
        ${svg}
      </svg>
    </div>`);
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

customElements.define('lv-confusion-matrix', LvConfusionMatrix);
export { LvConfusionMatrix };

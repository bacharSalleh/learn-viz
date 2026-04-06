import { LvBaseElement } from '../core/base-element.js';

interface BarDatum {
  label: string;
  value: number;
  color?: string;
  tag?: string;
  tagColor?: string;
}

const DEFAULT_PALETTE = [
  '#00d4ff', '#7b68ee', '#00c853', '#ff9800',
  '#ff2d75', '#ffd93d', '#69f0ae', '#ff6b9d',
];

const css = /* css */ `
  :host { display: block; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

  .bar-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .bar-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .bar-label {
    font-size: 0.9em;
    color: var(--lv-text, #e4e4ec);
    font-weight: 500;
  }

  .bar-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .bar-value {
    font-family: var(--lv-font-mono, monospace);
    font-size: 0.9em;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .bar-tag {
    font-size: 0.75em;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .bar-track {
    width: 100%;
    height: 28px;
    background: var(--lv-bg-raised, #12122a);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 4px;
  }

  .bar-item:hover .bar-fill {
    filter: brightness(1.15);
  }

  .bar-item:hover .bar-track {
    box-shadow: 0 0 0 1px var(--lv-border-focus, #3a3a6a);
  }

  /* Entrance animation */
  .bar-fill.animate {
    width: 0 !important;
  }
`;

class LvBarChart extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'direction', 'sorted'];
  }

  private _data: BarDatum[] = [];
  private _hasAnimated = false;

  get data(): BarDatum[] { return this._data; }
  set data(val: BarDatum[] | string) {
    if (typeof val === 'string') {
      try { this._data = JSON.parse(val); } catch { this._data = []; }
    } else {
      this._data = val;
    }
    this._buildChart();
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._data = this.jsonAttr<BarDatum[]>('data', []);
    this._buildChart();
  }

  handleAttributeChange(name: string) {
    if (name === 'data') {
      this._data = this.jsonAttr<BarDatum[]>('data', []);
    }
    this._buildChart();
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;
    this._hasAnimated = true;

    if (instant) return;

    // Trigger bar grow animation
    const fills = this.root.querySelectorAll('.bar-fill');
    fills.forEach((el, i) => {
      const fill = el as HTMLElement;
      const targetWidth = fill.dataset.width || '0%';
      fill.classList.add('animate');
      // Stagger each bar
      setTimeout(() => {
        fill.classList.remove('animate');
        fill.style.width = targetWidth;
      }, i * 80 + 50);
    });
  }

  private _getColor(i: number, d: BarDatum): string {
    if (d.color) return d.color;
    const v = getComputedStyle(this).getPropertyValue(`--lv-chart-${i % 8}`).trim();
    return v || DEFAULT_PALETTE[i % 8];
  }

  private _buildChart(): void {
    const data = this.hasAttribute('sorted')
      ? [...this._data].sort((a, b) => b.value - a.value)
      : [...this._data];

    if (!data.length) {
      this.render('<div class="bar-list"></div>');
      return;
    }

    const maxVal = Math.max(...data.map(d => d.value), 0.001);

    const items = data.map((d, i) => {
      const pct = (d.value / maxVal) * 100;
      const color = this._getColor(i, d);
      const tagColor = d.tagColor || color;
      const valueFormatted = typeof d.value === 'number'
        ? (d.value % 1 ? d.value.toFixed(2) : d.value.toString())
        : d.value;

      return `
        <div class="bar-item">
          <div class="bar-header">
            <span class="bar-label">${this._esc(d.label)}</span>
            <span class="bar-meta">
              <span class="bar-value" style="color:${color}">${valueFormatted}</span>
              ${d.tag ? `<span class="bar-tag" style="background:${tagColor}22;color:${tagColor}">${this._esc(d.tag)}</span>` : ''}
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${this._hasAnimated ? pct : 0}%;background:${color}" data-width="${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    const srTableRows = data.map(d => `<tr><td>${this._esc(d.label)}</td><td>${typeof d.value === 'number' ? (d.value % 1 ? d.value.toFixed(2) : d.value.toString()) : d.value}</td></tr>`).join('');
    const srTable = `<table class="sr-table"><caption>Bar chart data</caption><thead><tr><th>Label</th><th>Value</th></tr></thead><tbody>${srTableRows}</tbody></table>`;

    this.render(`<div class="bar-list" role="img" aria-label="Bar chart">${items}</div>${srTable}`);

    // If already animated, show bars immediately
    if (this._hasAnimated) {
      this.root.querySelectorAll('.bar-fill').forEach(el => {
        const fill = el as HTMLElement;
        fill.style.width = fill.dataset.width || '0%';
      });
    }
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

customElements.define('lv-bar-chart', LvBarChart);

export { LvBarChart };

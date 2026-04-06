import { LvBaseElement } from '../core/base-element.js';
import { loadScript } from '../core/utils.js';

const ROUGH_CDN = 'https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`;

const PALETTE = ['#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

interface SketchBarDatum {
  label: string;
  value: number;
  color?: string;
}

class LvSketchBar extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['data', 'roughness'];
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
    // Rough.js draws instantly; fade in the canvas
    if (instant) return;
    const canvas = this.root.querySelector('canvas');
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.transition = 'opacity 0.6s ease-out';
      requestAnimationFrame(() => { canvas.style.opacity = '1'; });
    }
  }

  private async _buildChart(): Promise<void> {
    const data: SketchBarDatum[] = this.jsonAttr('data', []);
    const roughness = parseFloat(this.getAttribute('roughness') || '2');

    if (!data.length) {
      this.render('<div class="sketch-container"></div>');
      return;
    }

    // Render placeholder, then load Rough.js
    const W = 500, H = 300;
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    this.render(`<div class="sketch-container">
      <canvas width="${W * 2}" height="${H * 2}" style="width:${W}px;height:${H}px;"></canvas>
      <div class="bar-labels">${data.map(d => `<span>${this._esc(d.label)}</span>`).join('')}</div>
    </div>`);

    try {
      await loadScript(ROUGH_CDN);
    } catch {
      return;
    }

    const canvas = this.root.querySelector('canvas');
    if (!canvas) return;
    const rc = (window as any).rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale for retina
    ctx.scale(2, 2);

    const maxVal = Math.max(...data.map(d => d.value));
    const iw = W - pad.left - pad.right;
    const ih = H - pad.top - pad.bottom;
    const barW = iw / data.length * 0.7;
    const gap = iw / data.length * 0.3;

    // Draw axes
    rc.line(pad.left, H - pad.bottom, W - pad.right, H - pad.bottom, { roughness: roughness * 0.5, stroke: '#888' });
    rc.line(pad.left, pad.top, pad.left, H - pad.bottom, { roughness: roughness * 0.5, stroke: '#888' });

    // Draw bars
    const isRtl = this.isRtl;
    data.forEach((d, i) => {
      const barH = (d.value / maxVal) * ih;
      const idx = isRtl ? data.length - 1 - i : i;
      const x = pad.left + idx * (barW + gap) + gap / 2;
      const y = H - pad.bottom - barH;
      const color = d.color || `var(--lv-chart-${i % 8})`;
      // Resolve CSS variable for canvas (fallback to palette)
      const resolvedColor = color.startsWith('var(') ? PALETTE[i % 8] : color;

      rc.rectangle(x, y, barW, barH, {
        roughness,
        fill: resolvedColor,
        fillStyle: 'hachure',
        hachureGap: 6,
        stroke: resolvedColor,
        strokeWidth: 1.5,
      });
    });

    // Y-axis ticks
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#888';
    ctx.textAlign = 'right';
    for (let t = 0; t <= 4; t++) {
      const val = (maxVal * t / 4);
      const y = H - pad.bottom - (t / 4) * ih;
      ctx.fillText(val.toFixed(1), pad.left - 8, y + 4);
    }
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-sketch-bar', LvSketchBar);
export { LvSketchBar };

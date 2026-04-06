import { LvBaseElement } from '../core/base-element.js';
import { loadScript } from '../core/utils.js';

const ROUGH_CDN = 'https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`;

const PALETTE = ['#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

class LvSketchLine extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['data', 'x-label', 'y-label', 'color', 'area', 'roughness'];
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
    const canvas = this.root.querySelector('canvas');
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.transition = 'opacity 0.6s ease-out';
      requestAnimationFrame(() => { canvas.style.opacity = '1'; });
    }
  }

  private async _buildChart(): Promise<void> {
    const raw: number[] | { x: number; y: number }[] = this.jsonAttr('data', []);
    const xLabel = this.getAttribute('x-label') || '';
    const yLabel = this.getAttribute('y-label') || '';
    const colorAttr = this.getAttribute('color') || '';
    const showArea = this.hasAttribute('area');
    const roughness = parseFloat(this.getAttribute('roughness') || '2');

    if (!raw.length) {
      this.render('<canvas></canvas>');
      return;
    }

    // Normalize data
    const points: { x: number; y: number }[] = typeof raw[0] === 'number'
      ? (raw as number[]).map((y, i) => ({ x: i, y }))
      : raw as { x: number; y: number }[];

    const W = 500, H = 260;
    const pad = { top: 20, right: 20, bottom: 40, left: 55 };

    this.render(`<canvas width="${W * 2}" height="${H * 2}" style="width:${W}px;height:${H}px;"></canvas>`);

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

    ctx.scale(2, 2);

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMin = Math.min(0, Math.min(...ys)), yMax = Math.max(...ys) * 1.1;

    const iw = W - pad.left - pad.right;
    const ih = H - pad.top - pad.bottom;
    const sx = (v: number) => pad.left + (v - xMin) / (xMax - xMin || 1) * iw;
    const sy = (v: number) => pad.top + (1 - (v - yMin) / (yMax - yMin || 1)) * ih;

    // Resolve color
    const color = colorAttr.startsWith('var(') ? PALETTE[0] : (colorAttr || PALETTE[0]);

    // Axes
    rc.line(pad.left, H - pad.bottom, W - pad.right, H - pad.bottom, { roughness: roughness * 0.5, stroke: '#888' });
    rc.line(pad.left, pad.top, pad.left, H - pad.bottom, { roughness: roughness * 0.5, stroke: '#888' });

    // Area fill
    if (showArea) {
      const areaPoints: [number, number][] = [
        [sx(points[0].x), sy(yMin)],
        ...points.map(p => [sx(p.x), sy(p.y)] as [number, number]),
        [sx(points[points.length - 1].x), sy(yMin)],
      ];
      rc.polygon(areaPoints, {
        roughness: roughness * 0.3,
        fill: color,
        fillStyle: 'hachure',
        hachureGap: 8,
        hachureAngle: 60,
        stroke: 'none',
        fillWeight: 0.5,
      });
    }

    // Line
    const linePoints: [number, number][] = points.map(p => [sx(p.x), sy(p.y)]);
    rc.curve(linePoints, {
      roughness,
      stroke: color,
      strokeWidth: 2.5,
    });

    // Points
    points.forEach(p => {
      rc.circle(sx(p.x), sy(p.y), 6, {
        roughness: roughness * 0.5,
        fill: color,
        fillStyle: 'solid',
        stroke: color,
      });
    });

    // Labels
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#888';
    ctx.textAlign = 'center';
    if (xLabel) ctx.fillText(xLabel, W / 2, H - 4);
    if (yLabel) {
      ctx.save();
      ctx.translate(12, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yLabel, 0, 0);
      ctx.restore();
    }

    // Y ticks
    ctx.textAlign = 'right';
    for (let t = 0; t <= 4; t++) {
      const val = yMin + (yMax - yMin) * t / 4;
      ctx.fillText(val.toFixed(2), pad.left - 8, sy(val) + 4);
    }

    // X ticks
    ctx.textAlign = 'center';
    const step = Math.ceil(points.length / 8);
    for (let i = 0; i < points.length; i += step) {
      ctx.fillText(String(points[i].x), sx(points[i].x), H - pad.bottom + 16);
    }
  }
}

customElements.define('lv-sketch-line', LvSketchLine);
export { LvSketchLine };

import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .gd-container { width: 100%; overflow-x: auto; }
  canvas { display: block; margin: 0 auto; border-radius: var(--lv-r-md); }
  .info { font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); text-align: center; margin-top: 6px; min-height: 1.4em; }
  .axis-label { font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); text-align: center; margin-top: 2px; }
`;

type LossFn = (x: number, y: number) => number;

interface OptimizerState {
  vx: number; vy: number;
  mx: number; my: number;
  sx: number; sy: number;
  t: number;
}

const FUNCTIONS: Record<string, { fn: LossFn; range: [number, number] }> = {
  quadratic: { fn: (x, y) => x * x + y * y, range: [-3, 3] },
  rosenbrock: { fn: (x, y) => (1 - x) ** 2 + 100 * (y - x * x) ** 2, range: [-2, 2] },
  himmelblau: { fn: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2, range: [-5, 5] },
  saddle: { fn: (x, y) => x * x - y * y, range: [-3, 3] },
};

class LvGradientDescent extends LvBaseElement {
  private _hasAnimated = false;
  private _animFrame: number | null = null;
  private _timer: ReturnType<typeof setTimeout> | null = null;

  static get observedAttributes() {
    return ['fn', 'optimizer', 'lr', 'start', 'show-path', 'speed'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAnimation();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (!instant) {
      this._runOptimization();
    }
  }

  private _stopAnimation(): void {
    if (this._animFrame) { cancelAnimationFrame(this._animFrame); this._animFrame = null; }
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
  }

  private _build(): void {
    this._stopAnimation();
    this._hasAnimated = false;

    const W = 400, H = 400;
    this.render(`<div class="gd-container">
      <canvas id="gd-canvas" width="${W * 2}" height="${H * 2}" style="width:${W}px;height:${H}px;"></canvas>
      <div class="info" id="gd-info">&nbsp;</div>
      <div class="axis-label">Click or scroll into view to start optimization</div>
    </div>`);

    this._drawContour();
  }

  private _getFnConfig() {
    const fnName = this.getAttribute('fn') || 'quadratic';
    const config = FUNCTIONS[fnName] || FUNCTIONS.quadratic;
    return { fnName, ...config };
  }

  private _drawContour(): void {
    const canvas = this.root.getElementById('gd-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 400, H = 400;
    ctx.clearRect(0, 0, W * 2, H * 2);
    ctx.save();
    ctx.scale(2, 2);

    const { fn, range } = this._getFnConfig();
    const [lo, hi] = range;
    const gridRes = 200;

    // Compute loss values on grid
    const vals: number[][] = [];
    let minVal = Infinity, maxVal = -Infinity;
    for (let i = 0; i < gridRes; i++) {
      vals[i] = [];
      for (let j = 0; j < gridRes; j++) {
        const x = lo + (hi - lo) * j / (gridRes - 1);
        const y = lo + (hi - lo) * i / (gridRes - 1);
        const v = fn(x, y);
        vals[i][j] = v;
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
    }

    // Use log scale for better contrast
    const logMin = Math.log(1 + minVal - minVal);
    const logMax = Math.log(1 + maxVal - minVal);
    const logRange = logMax - logMin || 1;

    // Draw filled contour
    const cellW = W / gridRes;
    const cellH = H / gridRes;
    for (let i = 0; i < gridRes; i++) {
      for (let j = 0; j < gridRes; j++) {
        const t = Math.log(1 + vals[i][j] - minVal) / logRange;
        ctx.fillStyle = this._contourColor(t);
        ctx.fillRect(j * cellW, i * cellH, cellW + 0.5, cellH + 0.5);
      }
    }

    // Draw contour lines
    const nContours = 15;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c < nContours; c++) {
      const threshold = minVal + (maxVal - minVal) * (c / nContours);
      this._drawContourLine(ctx, vals, threshold, gridRes, W, H);
    }

    // Draw axes labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(lo), 20, H - 5);
    ctx.fillText(String(hi), W - 20, H - 5);
    ctx.fillText('x', W / 2, H - 5);
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('y', 0, 0);
    ctx.restore();

    ctx.restore();
  }

  private _drawContourLine(ctx: CanvasRenderingContext2D, vals: number[][], threshold: number, gridRes: number, W: number, H: number): void {
    // Simple marching squares approximation: draw short segments at cell edges
    const cellW = W / gridRes;
    const cellH = H / gridRes;
    ctx.beginPath();
    for (let i = 0; i < gridRes - 1; i++) {
      for (let j = 0; j < gridRes - 1; j++) {
        const v00 = vals[i][j];
        const v10 = vals[i][j + 1];
        const v01 = vals[i + 1][j];
        // Check horizontal edge
        if ((v00 - threshold) * (v10 - threshold) < 0) {
          const frac = (threshold - v00) / (v10 - v00);
          const px = (j + frac) * cellW;
          const py = i * cellH;
          ctx.moveTo(px - 0.5, py);
          ctx.lineTo(px + 0.5, py);
        }
        // Check vertical edge
        if ((v00 - threshold) * (v01 - threshold) < 0) {
          const frac = (threshold - v00) / (v01 - v00);
          const px = j * cellW;
          const py = (i + frac) * cellH;
          ctx.moveTo(px, py - 0.5);
          ctx.lineTo(px, py + 0.5);
        }
      }
    }
    ctx.stroke();
  }

  private _contourColor(t: number): string {
    // Dark blue (low) → cyan → yellow → red (high)
    const clamped = Math.max(0, Math.min(1, t));
    let r: number, g: number, b: number;
    if (clamped < 0.33) {
      const s = clamped / 0.33;
      r = Math.round(10 + s * 0);
      g = Math.round(20 + s * 180);
      b = Math.round(80 + s * 140);
    } else if (clamped < 0.66) {
      const s = (clamped - 0.33) / 0.33;
      r = Math.round(10 + s * 230);
      g = Math.round(200 - s * 10);
      b = Math.round(220 - s * 180);
    } else {
      const s = (clamped - 0.66) / 0.34;
      r = Math.round(240);
      g = Math.round(190 - s * 140);
      b = Math.round(40 - s * 30);
    }
    return `rgb(${r},${g},${b})`;
  }

  private _runOptimization(): void {
    const canvas = this.root.getElementById('gd-canvas') as HTMLCanvasElement;
    const infoEl = this.root.getElementById('gd-info');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 400, H = 400;
    const { fn, range } = this._getFnConfig();
    const [lo, hi] = range;
    const lr = parseFloat(this.getAttribute('lr') || '0.05');
    const speed = parseInt(this.getAttribute('speed') || '50', 10);
    const showPath = this.hasAttribute('show-path');
    const optimizerType = this.getAttribute('optimizer') || 'sgd';
    const startPos: [number, number] = this.jsonAttr('start', [
      lo + Math.random() * (hi - lo) * 0.6 + (hi - lo) * 0.2,
      lo + Math.random() * (hi - lo) * 0.6 + (hi - lo) * 0.2,
    ]);

    let px = startPos[0], py = startPos[1];
    const path: [number, number][] = [[px, py]];
    const state: OptimizerState = { vx: 0, vy: 0, mx: 0, my: 0, sx: 0, sy: 0, t: 0 };

    const toCanvas = (x: number, y: number): [number, number] => {
      return [
        ((x - lo) / (hi - lo)) * W,
        ((y - lo) / (hi - lo)) * H,
      ];
    };

    const eps = 1e-5;
    const gradient = (x: number, y: number): [number, number] => {
      const dx = (fn(x + eps, y) - fn(x - eps, y)) / (2 * eps);
      const dy = (fn(x, y + eps) - fn(x, y - eps)) / (2 * eps);
      return [dx, dy];
    };

    let step = 0;
    const maxSteps = 200;

    const tick = () => {
      if (step >= maxSteps) return;

      const [gx, gy] = gradient(px, py);
      const gradMag = Math.sqrt(gx * gx + gy * gy);
      if (gradMag < 1e-6) return;

      // Update position based on optimizer
      switch (optimizerType) {
        case 'momentum':
          state.vx = 0.9 * state.vx + lr * gx;
          state.vy = 0.9 * state.vy + lr * gy;
          px -= state.vx;
          py -= state.vy;
          break;
        case 'adam':
          state.t++;
          state.mx = 0.9 * state.mx + 0.1 * gx;
          state.my = 0.9 * state.my + 0.1 * gy;
          state.sx = 0.999 * state.sx + 0.001 * gx * gx;
          state.sy = 0.999 * state.sy + 0.001 * gy * gy;
          const mxHat = state.mx / (1 - Math.pow(0.9, state.t));
          const myHat = state.my / (1 - Math.pow(0.9, state.t));
          const sxHat = state.sx / (1 - Math.pow(0.999, state.t));
          const syHat = state.sy / (1 - Math.pow(0.999, state.t));
          px -= lr * mxHat / (Math.sqrt(sxHat) + 1e-8);
          py -= lr * myHat / (Math.sqrt(syHat) + 1e-8);
          break;
        default: // sgd
          px -= lr * gx;
          py -= lr * gy;
          break;
      }

      // Clamp to range
      px = Math.max(lo, Math.min(hi, px));
      py = Math.max(lo, Math.min(hi, py));
      path.push([px, py]);

      // Redraw contour (from saved state)
      this._drawContour();

      ctx.save();
      ctx.scale(2, 2);

      // Draw path
      if (showPath && path.length > 1) {
        for (let i = 1; i < path.length; i++) {
          const alpha = 0.1 + 0.9 * (i / path.length);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const [x1, y1] = toCanvas(path[i - 1][0], path[i - 1][1]);
          const [x2, y2] = toCanvas(path[i][0], path[i][1]);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw ball
      const [bx, by] = toCanvas(px, py);
      ctx.beginPath();
      ctx.arc(bx, by, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Update info
      const loss = fn(px, py);
      if (infoEl) {
        infoEl.textContent = `Step ${step + 1} | Loss: ${loss.toFixed(4)} | x: ${px.toFixed(3)}, y: ${py.toFixed(3)}`;
      }

      step++;
      this._timer = setTimeout(() => {
        this._animFrame = requestAnimationFrame(tick);
      }, speed);
    };

    this._animFrame = requestAnimationFrame(tick);
  }
}

customElements.define('lv-gradient-descent', LvGradientDescent);
export { LvGradientDescent };

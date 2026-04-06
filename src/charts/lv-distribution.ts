import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .dist-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .axis text { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-text-dim); }
  .axis line, .axis path { stroke: var(--lv-border); }
  .stats-row { display: flex; gap: 24px; justify-content: center; margin-top: 8px; font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); }
  .stats-row span { display: inline-flex; gap: 4px; }
  .stats-label { color: var(--lv-text); font-weight: 600; }
  .shade-label { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-accent); font-weight: 600; }
`;

interface DistPoint { x: number; y: number; }

class LvDistribution extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['type', 'params', 'shade-from', 'shade-to', 'show-stats'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;
    const path = this.root.querySelector('.dist-area') as SVGElement;
    const line = this.root.querySelector('.dist-line') as SVGElement;
    if (path) {
      path.style.opacity = '0';
      path.style.transition = 'opacity 0.6s ease-out';
      requestAnimationFrame(() => { path.style.opacity = '1'; });
    }
    if (line) {
      line.style.opacity = '0';
      line.style.transition = 'opacity 0.6s ease-out 0.1s';
      requestAnimationFrame(() => { line.style.opacity = '1'; });
    }
  }

  private _build(): void {
    const type = this.getAttribute('type') || 'normal';
    const shadeFrom = this.hasAttribute('shade-from') ? parseFloat(this.getAttribute('shade-from')!) : null;
    const shadeTo = this.hasAttribute('shade-to') ? parseFloat(this.getAttribute('shade-to')!) : null;
    const showStats = this.hasAttribute('show-stats');

    const W = 500, H = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const iw = W - margin.left - margin.right;
    const ih = H - margin.top - margin.bottom;

    const isDiscrete = type === 'poisson' || type === 'binomial';
    const { points, range, mean, std, mode } = this._computeDistribution(type);

    if (!points.length) {
      this.render('<div class="dist-container"></div>');
      return;
    }

    const xScale = d3.scaleLinear().domain(range).range([0, iw]);
    const yMax = Math.max(...points.map(p => p.y)) * 1.15;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([ih, 0]);

    let svg = '';

    // Gridlines
    const yTicks = yScale.ticks(5);
    for (const t of yTicks) {
      svg += `<line x1="0" y1="${yScale(t)}" x2="${iw}" y2="${yScale(t)}" stroke="var(--lv-border)" stroke-opacity="0.3" stroke-dasharray="3,3"/>`;
    }

    if (isDiscrete) {
      const barWidth = Math.max(2, Math.min(20, iw / points.length * 0.7));

      // Shade region for discrete
      if (shadeFrom !== null || shadeTo !== null) {
        let shadeProb = 0;
        for (const p of points) {
          const inShade = (shadeFrom !== null && shadeTo !== null) ? (p.x >= shadeFrom && p.x <= shadeTo) :
                          (shadeFrom !== null) ? (p.x >= shadeFrom) :
                          (shadeTo !== null) ? (p.x <= shadeTo) : false;
          if (inShade) {
            svg += `<rect x="${xScale(p.x) - barWidth / 2}" y="${yScale(p.y)}" width="${barWidth}" height="${ih - yScale(p.y)}" fill="var(--lv-accent)" opacity="0.3"/>`;
            shadeProb += p.y;
          }
        }
        svg += `<text class="shade-label" x="${iw / 2}" y="${-4}" text-anchor="middle">P = ${shadeProb.toFixed(4)}</text>`;
      }

      // Bars
      for (const p of points) {
        svg += `<rect x="${xScale(p.x) - barWidth / 2}" y="${yScale(p.y)}" width="${barWidth}" height="${ih - yScale(p.y)}" fill="var(--lv-accent)" opacity="0.6" stroke="var(--lv-accent)" stroke-width="1"/>`;
      }
    } else {
      // Area path
      const areaPath = this._areaPath(points, xScale, yScale, ih);
      const linePath = this._linePath(points, xScale, yScale);

      // Shade region for continuous
      if (shadeFrom !== null || shadeTo !== null) {
        const sf = shadeFrom ?? range[0];
        const st = shadeTo ?? range[1];
        const shadePoints = points.filter(p => p.x >= sf && p.x <= st);
        if (shadePoints.length > 1) {
          const shadePath = this._areaPath(shadePoints, xScale, yScale, ih);
          svg += `<path d="${shadePath}" fill="var(--lv-accent)" opacity="0.3"/>`;
          // Approximate probability via trapezoidal rule
          let prob = 0;
          for (let i = 1; i < shadePoints.length; i++) {
            prob += (shadePoints[i].x - shadePoints[i - 1].x) * (shadePoints[i].y + shadePoints[i - 1].y) / 2;
          }
          const cx = xScale((sf + st) / 2);
          const cy = yScale(Math.max(...shadePoints.map(p => p.y)) / 2);
          svg += `<text class="shade-label" x="${cx}" y="${Math.min(cy, ih - 10)}" text-anchor="middle">P = ${prob.toFixed(4)}</text>`;
        }
      }

      svg += `<path class="dist-area" d="${areaPath}" fill="var(--lv-accent)" opacity="0.15"/>`;
      svg += `<path class="dist-line" d="${linePath}" fill="none" stroke="var(--lv-accent)" stroke-width="2"/>`;
    }

    // X axis
    const xTicks = xScale.ticks(8);
    for (const t of xTicks) {
      svg += `<g class="axis" transform="translate(${xScale(t)},${ih})">
        <line y2="5" stroke="var(--lv-border)"/>
        <text y="18" text-anchor="middle">${this._fmtNum(t)}</text>
      </g>`;
    }
    svg += `<line x1="0" y1="${ih}" x2="${iw}" y2="${ih}" stroke="var(--lv-border)"/>`;

    // Y axis
    for (const t of yTicks) {
      svg += `<g class="axis" transform="translate(0,${yScale(t)})">
        <line x2="-5" stroke="var(--lv-border)"/>
        <text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum(t)}</text>
      </g>`;
    }
    svg += `<line x1="0" y1="0" x2="0" y2="${ih}" stroke="var(--lv-border)"/>`;

    let statsHtml = '';
    if (showStats) {
      statsHtml = `<div class="stats-row">
        <span><span class="stats-label">Mean:</span> ${this._fmtNum(mean)}</span>
        <span><span class="stats-label">Std:</span> ${this._fmtNum(std)}</span>
        <span><span class="stats-label">Mode:</span> ${this._fmtNum(mode)}</span>
      </div>`;
    }

    this.render(`<div class="dist-container">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${type} distribution">
        <g transform="translate(${margin.left},${margin.top})">${svg}</g>
      </svg>
      ${statsHtml}
    </div>`);
  }

  private _computeDistribution(type: string): { points: DistPoint[]; range: [number, number]; mean: number; std: number; mode: number } {
    switch (type) {
      case 'uniform': {
        const p = this.jsonAttr('params', { a: 0, b: 1 });
        const a = p.a ?? 0, b = p.b ?? 1;
        const density = 1 / (b - a);
        const range: [number, number] = [a - 1, b + 1];
        const pts: DistPoint[] = [];
        const n = 200;
        for (let i = 0; i <= n; i++) {
          const x = range[0] + (range[1] - range[0]) * i / n;
          pts.push({ x, y: (x >= a && x <= b) ? density : 0 });
        }
        return { points: pts, range, mean: (a + b) / 2, std: Math.sqrt((b - a) ** 2 / 12), mode: (a + b) / 2 };
      }
      case 'poisson': {
        const p = this.jsonAttr('params', { lambda: 5 });
        const lam = p.lambda ?? 5;
        const maxK = Math.ceil(lam + 4 * Math.sqrt(lam));
        const pts: DistPoint[] = [];
        let modeVal = 0, modeK = 0;
        for (let k = 0; k <= maxK; k++) {
          const y = Math.exp(-lam + k * Math.log(lam) - this._logFactorial(k));
          if (y > modeVal) { modeVal = y; modeK = k; }
          pts.push({ x: k, y });
        }
        return { points: pts, range: [0, maxK], mean: lam, std: Math.sqrt(lam), mode: modeK };
      }
      case 'binomial': {
        const p = this.jsonAttr('params', { n: 20, p: 0.5 });
        const n = p.n ?? 20, prob = p.p ?? 0.5;
        const pts: DistPoint[] = [];
        let modeVal = 0, modeK = 0;
        for (let k = 0; k <= n; k++) {
          const logP = this._logComb(n, k) + k * Math.log(prob) + (n - k) * Math.log(1 - prob);
          const y = Math.exp(logP);
          if (y > modeVal) { modeVal = y; modeK = k; }
          pts.push({ x: k, y });
        }
        return { points: pts, range: [0, n], mean: n * prob, std: Math.sqrt(n * prob * (1 - prob)), mode: modeK };
      }
      case 'exponential': {
        const p = this.jsonAttr('params', { lambda: 1 });
        const lam = p.lambda ?? 1;
        const maxX = 5 / lam;
        const pts: DistPoint[] = [];
        const steps = 200;
        for (let i = 0; i <= steps; i++) {
          const x = maxX * i / steps;
          pts.push({ x, y: lam * Math.exp(-lam * x) });
        }
        return { points: pts, range: [0, maxX], mean: 1 / lam, std: 1 / lam, mode: 0 };
      }
      default: { // normal
        const p = this.jsonAttr('params', { mean: 0, std: 1 });
        const mu = p.mean ?? 0, sigma = p.std ?? 1;
        const range: [number, number] = [mu - 4 * sigma, mu + 4 * sigma];
        const pts: DistPoint[] = [];
        const steps = 200;
        const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
        for (let i = 0; i <= steps; i++) {
          const x = range[0] + (range[1] - range[0]) * i / steps;
          const y = coeff * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
          pts.push({ x, y });
        }
        return { points: pts, range, mean: mu, std: sigma, mode: mu };
      }
    }
  }

  private _logFactorial(n: number): number {
    let s = 0;
    for (let i = 2; i <= n; i++) s += Math.log(i);
    return s;
  }

  private _logComb(n: number, k: number): number {
    return this._logFactorial(n) - this._logFactorial(k) - this._logFactorial(n - k);
  }

  private _linePath(pts: DistPoint[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>): string {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.x)},${yScale(p.y)}`).join('');
  }

  private _areaPath(pts: DistPoint[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, ih: number): string {
    if (!pts.length) return '';
    let d = `M${xScale(pts[0].x)},${ih}`;
    for (const p of pts) d += `L${xScale(p.x)},${yScale(p.y)}`;
    d += `L${xScale(pts[pts.length - 1].x)},${ih}Z`;
    return d;
  }

  private _fmtNum(n: number): string {
    if (Number.isInteger(n)) return String(n);
    return parseFloat(n.toPrecision(4)).toString();
  }
}

customElements.define('lv-distribution', LvDistribution);
export { LvDistribution };

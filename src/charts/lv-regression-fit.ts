import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .reg-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; cursor: crosshair; }
  .point { cursor: grab; }
  .point:active { cursor: grabbing; }
  .gridline { stroke: var(--lv-border); stroke-opacity: 0.2; stroke-dasharray: 3,3; }
  .axis text { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-text-dim); }
  .axis line, .axis path { stroke: var(--lv-border); }
  .info-row { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 8px; font-family: var(--lv-font-mono); font-size: 12px; }
  .r2-text { font-weight: 600; }
  .eq-text { color: var(--lv-text-dim); }
`;

interface Point { x: number; y: number; }

class LvRegressionFit extends LvBaseElement {
  private _hasAnimated = false;
  private _points: Point[] = [];
  private _dragging: number | null = null;
  private _svgEl: SVGSVGElement | null = null;
  private _xScale!: d3.ScaleLinear<number, number>;
  private _yScale!: d3.ScaleLinear<number, number>;
  private _margin = { top: 20, right: 30, bottom: 40, left: 50 };

  static get observedAttributes() {
    return ['data', 'degree', 'interactive', 'show-r2', 'show-equation'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._points = this.jsonAttr<Point[]>('data', []);
    this._build();
  }

  handleAttributeChange(name: string) {
    if (name === 'data') {
      this._points = this.jsonAttr<Point[]>('data', []);
    }
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;
    const svg = this.root.querySelector('svg') as SVGElement;
    if (svg) {
      svg.style.opacity = '0';
      svg.style.transition = 'opacity 0.6s ease-out';
      requestAnimationFrame(() => { svg.style.opacity = '1'; });
    }
  }

  private _build(): void {
    const degree = Math.max(1, Math.min(5, parseInt(this.getAttribute('degree') || '1', 10)));
    const interactive = this.hasAttribute('interactive');
    const showR2 = this.hasAttribute('show-r2');
    const showEq = this.hasAttribute('show-equation');
    const points = this._points;

    const W = 500, H = 350;
    const m = this._margin;
    const iw = W - m.left - m.right;
    const ih = H - m.top - m.bottom;

    if (!points.length) {
      this.render(`<div class="reg-container">
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Regression chart">
          <g transform="translate(${m.left},${m.top})">
            <text x="${iw / 2}" y="${ih / 2}" text-anchor="middle" fill="var(--lv-text-dim)" font-family="var(--lv-font)" font-size="13">Click to add points</text>
          </g>
        </svg>
      </div>`);
      if (interactive) this._attachInteraction();
      return;
    }

    // Compute scales with padding
    const xExtent = d3.extent(points, p => p.x) as [number, number];
    const yExtent = d3.extent(points, p => p.y) as [number, number];
    const xPad = (xExtent[1] - xExtent[0]) * 0.15 || 1;
    const yPad = (yExtent[1] - yExtent[0]) * 0.15 || 1;

    const xScale = d3.scaleLinear().domain([xExtent[0] - xPad, xExtent[1] + xPad]).range([0, iw]);
    const yScale = d3.scaleLinear().domain([yExtent[0] - yPad, yExtent[1] + yPad]).range([ih, 0]);
    this._xScale = xScale;
    this._yScale = yScale;

    let svg = '';

    // Gridlines
    for (const t of xScale.ticks(8)) {
      svg += `<line class="gridline" x1="${xScale(t)}" y1="0" x2="${xScale(t)}" y2="${ih}"/>`;
    }
    for (const t of yScale.ticks(6)) {
      svg += `<line class="gridline" x1="0" y1="${yScale(t)}" x2="${iw}" y2="${yScale(t)}"/>`;
    }

    // Fit polynomial
    const effectiveDeg = Math.min(degree, points.length - 1);
    const coeffs = this._fitPolynomial(points, effectiveDeg);

    // Draw curve
    if (coeffs.length) {
      const curvePts: string[] = [];
      const steps = 200;
      for (let i = 0; i <= steps; i++) {
        const xVal = xScale.domain()[0] + (xScale.domain()[1] - xScale.domain()[0]) * i / steps;
        const yVal = this._evalPoly(coeffs, xVal);
        curvePts.push(`${i === 0 ? 'M' : 'L'}${xScale(xVal)},${yScale(yVal)}`);
      }
      svg += `<path d="${curvePts.join('')}" fill="none" stroke="var(--lv-accent2)" stroke-width="2.5" stroke-linecap="round"/>`;
    }

    // Draw points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      svg += `<circle class="point" data-idx="${i}" cx="${xScale(p.x)}" cy="${yScale(p.y)}" r="6" fill="var(--lv-accent)" stroke="#fff" stroke-width="2"/>`;
    }

    // X axis
    for (const t of xScale.ticks(8)) {
      svg += `<g class="axis" transform="translate(${xScale(t)},${ih})">
        <line y2="5"/><text y="18" text-anchor="middle">${this._fmtNum(t)}</text>
      </g>`;
    }
    svg += `<line x1="0" y1="${ih}" x2="${iw}" y2="${ih}" stroke="var(--lv-border)"/>`;

    // Y axis
    for (const t of yScale.ticks(6)) {
      svg += `<g class="axis" transform="translate(0,${yScale(t)})">
        <line x2="-5"/><text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum(t)}</text>
      </g>`;
    }
    svg += `<line x1="0" y1="0" x2="0" y2="${ih}" stroke="var(--lv-border)"/>`;

    // Compute R² and equation
    let infoHtml = '';
    if (showR2 || showEq) {
      infoHtml = '<div class="info-row">';
      if (showR2 && coeffs.length) {
        const r2 = this._computeR2(points, coeffs);
        const r2Color = r2 > 0.8 ? 'var(--lv-positive)' : r2 > 0.5 ? 'var(--lv-warning)' : 'var(--lv-negative)';
        infoHtml += `<span class="r2-text" style="color:${r2Color}">R² = ${r2.toFixed(4)}</span>`;
      }
      if (showEq && coeffs.length) {
        infoHtml += `<span class="eq-text">${this._formatEquation(coeffs)}</span>`;
      }
      infoHtml += '</div>';
    }

    this.render(`<div class="reg-container">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Regression fit">
        <g transform="translate(${m.left},${m.top})">${svg}</g>
      </svg>
      ${infoHtml}
    </div>`);

    if (interactive) this._attachInteraction();
  }

  private _attachInteraction(): void {
    const svgEl = this.root.querySelector('svg');
    if (!svgEl) return;
    this._svgEl = svgEl as SVGSVGElement;

    // Click to add point
    svgEl.addEventListener('click', (e: Event) => {
      if (this._dragging !== null) return;
      const me = e as MouseEvent;
      const target = me.target as Element;
      if (target.classList.contains('point')) return;

      const pt = this._svgCoords(me);
      if (pt) {
        this._points.push(pt);
        this._build();
      }
    });

    // Right-click to remove
    svgEl.addEventListener('contextmenu', (e: Event) => {
      const me = e as MouseEvent;
      const target = me.target as Element;
      if (target.classList.contains('point')) {
        me.preventDefault();
        const idx = parseInt((target as HTMLElement).dataset.idx || '-1', 10);
        if (idx >= 0) {
          this._points.splice(idx, 1);
          this._build();
        }
      }
    });

    // Drag points
    const points = this.root.querySelectorAll('.point');
    points.forEach(el => {
      el.addEventListener('mousedown', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        this._dragging = parseInt((el as HTMLElement).dataset.idx || '-1', 10);

        const onMove = (me: MouseEvent) => {
          if (this._dragging === null) return;
          const pt = this._svgCoords(me);
          if (pt && this._dragging >= 0 && this._dragging < this._points.length) {
            this._points[this._dragging] = pt;
            this._build();
          }
        };
        const onUp = () => {
          this._dragging = null;
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    });
  }

  private _svgCoords(e: MouseEvent): Point | null {
    const svg = this._svgEl;
    if (!svg || !this._xScale || !this._yScale) return null;
    const rect = svg.getBoundingClientRect();
    const m = this._margin;
    const W = 500, H = 350;
    const scaleX = rect.width / W;
    const scaleY = rect.height / H;
    const px = (e.clientX - rect.left) / scaleX - m.left;
    const py = (e.clientY - rect.top) / scaleY - m.top;
    const x = this._xScale.invert(px);
    const y = this._yScale.invert(py);
    return { x, y };
  }

  private _fitPolynomial(points: Point[], degree: number): number[] {
    const n = points.length;
    if (n === 0 || degree < 0) return [];
    const deg = Math.min(degree, n - 1);

    // Build Vandermonde matrix
    const X: number[][] = [];
    const Y: number[] = [];
    for (const p of points) {
      const row: number[] = [];
      for (let j = 0; j <= deg; j++) row.push(Math.pow(p.x, j));
      X.push(row);
      Y.push(p.y);
    }

    // X^T X
    const m = deg + 1;
    const XtX: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
    const XtY: number[] = Array(m).fill(0);

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < n; k++) {
          XtX[i][j] += X[k][i] * X[k][j];
        }
      }
      for (let k = 0; k < n; k++) {
        XtY[i] += X[k][i] * Y[k];
      }
    }

    // Solve via Gaussian elimination
    return this._solveLinear(XtX, XtY);
  }

  private _solveLinear(A: number[][], b: number[]): number[] {
    const n = A.length;
    // Augmented matrix
    const aug: number[][] = A.map((row, i) => [...row, b[i]]);

    for (let col = 0; col < n; col++) {
      // Partial pivoting
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
      }
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];

      if (Math.abs(aug[col][col]) < 1e-12) continue;

      const pivot = aug[col][col];
      for (let j = col; j <= n; j++) aug[col][j] /= pivot;

      for (let row = 0; row < n; row++) {
        if (row === col) continue;
        const factor = aug[row][col];
        for (let j = col; j <= n; j++) aug[row][j] -= factor * aug[col][j];
      }
    }

    return aug.map(row => row[n]);
  }

  private _evalPoly(coeffs: number[], x: number): number {
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) y += coeffs[i] * Math.pow(x, i);
    return y;
  }

  private _computeR2(points: Point[], coeffs: number[]): number {
    const yMean = points.reduce((s, p) => s + p.y, 0) / points.length;
    let ssTot = 0, ssRes = 0;
    for (const p of points) {
      ssTot += (p.y - yMean) ** 2;
      ssRes += (p.y - this._evalPoly(coeffs, p.x)) ** 2;
    }
    return ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  }

  private _formatEquation(coeffs: number[]): string {
    if (!coeffs.length) return '';
    const parts: string[] = [];
    for (let i = coeffs.length - 1; i >= 0; i--) {
      const c = coeffs[i];
      if (Math.abs(c) < 1e-10) continue;
      const sign = c >= 0 ? (parts.length ? ' + ' : '') : (parts.length ? ' − ' : '-');
      const absC = Math.abs(c);
      const cStr = parseFloat(absC.toPrecision(3)).toString();
      if (i === 0) {
        parts.push(`${sign}${cStr}`);
      } else if (i === 1) {
        parts.push(`${sign}${cStr === '1' ? '' : cStr}x`);
      } else {
        parts.push(`${sign}${cStr === '1' ? '' : cStr}x${this._superscript(i)}`);
      }
    }
    return `y = ${parts.join('') || '0'}`;
  }

  private _superscript(n: number): string {
    const sups: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(n).split('').map(c => sups[c] || c).join('');
  }

  private _fmtNum(n: number): string {
    if (Number.isInteger(n)) return String(n);
    return parseFloat(n.toPrecision(4)).toString();
  }
}

customElements.define('lv-regression-fit', LvRegressionFit);
export { LvRegressionFit };

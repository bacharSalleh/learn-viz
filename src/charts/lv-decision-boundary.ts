import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .db-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; cursor: crosshair; }
  .legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
  .legend-item { display: flex; align-items: center; gap: 4px; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .point { stroke: #fff; stroke-width: 1.5; cursor: default; }
  .point:hover { stroke-width: 2.5; }
  .axis-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .tick text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .tick line { stroke: var(--lv-text-dim); opacity: 0.3; }
  .domain { stroke: var(--lv-text-dim); opacity: 0.3; }
`;

const CLASS_COLORS = ['#3b82f6', '#ef4444'];

interface DataPoint {
  x: number;
  y: number;
  class: number;
}

class LvDecisionBoundary extends LvBaseElement {
  private _hasAnimated = false;
  private _nextClass = 0;

  static get observedAttributes() {
    return ['data', 'model', 'resolution', 'interactive', 'c'];
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
    const svg = this.root.querySelector('svg');
    if (svg) {
      svg.style.opacity = '0';
      svg.style.transition = 'opacity 0.6s ease-out';
      requestAnimationFrame(() => { svg.style.opacity = '1'; });
    }
  }

  private _build(): void {
    const data: DataPoint[] = this.jsonAttr('data', [
      { x: 1, y: 2, class: 0 }, { x: 2, y: 3, class: 0 }, { x: 3, y: 3, class: 0 },
      { x: 1.5, y: 1, class: 0 }, { x: 2.5, y: 2, class: 0 },
      { x: 5, y: 5, class: 1 }, { x: 6, y: 5, class: 1 }, { x: 5, y: 6, class: 1 },
      { x: 6, y: 6, class: 1 }, { x: 5.5, y: 4.5, class: 1 },
    ]);
    const modelType = this.getAttribute('model') || 'linear';
    const resolution = parseInt(this.getAttribute('resolution') || '50', 10);
    const interactive = this.hasAttribute('interactive');
    const cParam = parseFloat(this.getAttribute('c') || '1.0');

    const W = 500, H = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const iw = W - margin.left - margin.right;
    const ih = H - margin.top - margin.bottom;

    if (!data.length) {
      this.render('<div class="db-container"></div>');
      return;
    }

    // Compute data extents with padding
    const xExtent = d3.extent(data, d => d.x) as [number, number];
    const yExtent = d3.extent(data, d => d.y) as [number, number];
    const xPad = (xExtent[1] - xExtent[0]) * 0.2 || 1;
    const yPad = (yExtent[1] - yExtent[0]) * 0.2 || 1;
    const xMin = xExtent[0] - xPad, xMax = xExtent[1] + xPad;
    const yMin = yExtent[0] - yPad, yMax = yExtent[1] + yPad;

    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, iw]);
    const yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, ih]); // inverted for SVG

    // Fit model
    const predict = this._fitModel(data, modelType, cParam);

    // Compute decision boundary grid
    let gridHtml = '';
    const cellW = iw / resolution;
    const cellH = ih / resolution;
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const gx = xMin + (xMax - xMin) * (j + 0.5) / resolution;
        const gy = yMax - (yMax - yMin) * (i + 0.5) / resolution;
        const cls = predict(gx, gy);
        const color = CLASS_COLORS[cls >= 0.5 ? 1 : 0];
        gridHtml += `<rect x="${margin.left + j * cellW}" y="${margin.top + i * cellH}" width="${cellW + 0.5}" height="${cellH + 0.5}" fill="${color}" opacity="0.15"/>`;
      }
    }

    // Draw points
    let pointsHtml = '';
    data.forEach(d => {
      const cx = margin.left + xScale(d.x);
      const cy = margin.top + yScale(d.y);
      const color = CLASS_COLORS[d.class];
      pointsHtml += `<circle class="point" cx="${cx}" cy="${cy}" r="5" fill="${color}"/>`;
    });

    // Axes
    const xTicks = xScale.ticks(6);
    const yTicks = yScale.ticks(6);
    let axesHtml = '';
    // X axis
    xTicks.forEach(t => {
      const tx = margin.left + xScale(t);
      axesHtml += `<g class="tick"><line x1="${tx}" y1="${margin.top + ih}" x2="${tx}" y2="${margin.top + ih + 5}"/><text x="${tx}" y="${margin.top + ih + 18}" text-anchor="middle">${t}</text></g>`;
    });
    // Y axis
    yTicks.forEach(t => {
      const ty = margin.top + yScale(t);
      axesHtml += `<g class="tick"><line x1="${margin.left - 5}" y1="${ty}" x2="${margin.left}" y2="${ty}"/><text x="${margin.left - 8}" y="${ty + 4}" text-anchor="end">${t}</text></g>`;
    });
    // Axis lines
    axesHtml += `<line class="domain" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + ih}"/>`;
    axesHtml += `<line class="domain" x1="${margin.left}" y1="${margin.top + ih}" x2="${margin.left + iw}" y2="${margin.top + ih}"/>`;

    this.render(`<div class="db-container">
      <svg id="db-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        ${gridHtml}
        ${axesHtml}
        ${pointsHtml}
      </svg>
      <div class="legend">
        <div class="legend-item"><div class="legend-dot" style="background:${CLASS_COLORS[0]}"></div>Class 0</div>
        <div class="legend-item"><div class="legend-dot" style="background:${CLASS_COLORS[1]}"></div>Class 1</div>
        ${interactive ? '<div class="legend-item" style="opacity:0.7">(Click to add points)</div>' : ''}
      </div>
    </div>`);

    // Bind click handler for interactive mode
    if (interactive) {
      const svg = this.root.getElementById('db-svg');
      if (svg) {
        svg.addEventListener('click', (e: Event) => {
          const me = e as MouseEvent;
          const rect = (svg as unknown as SVGSVGElement).getBoundingClientRect();
          const sx = (me.clientX - rect.left) * (W / rect.width) - margin.left;
          const sy = (me.clientY - rect.top) * (H / rect.height) - margin.top;
          const dx = xScale.invert(sx);
          const dy = yScale.invert(sy);

          if (sx < 0 || sx > iw || sy < 0 || sy > ih) return;

          // Add point: alternate class
          data.push({ x: dx, y: dy, class: this._nextClass });
          this._nextClass = 1 - this._nextClass;
          // Update attribute and rebuild
          this.setAttribute('data', JSON.stringify(data));
        });
      }
    }
  }

  private _fitModel(data: DataPoint[], modelType: string, cParam: number): (x: number, y: number) => number {
    if (modelType === 'rbf') {
      return this._fitRbf(data, cParam);
    }

    // Featurize
    const featurize = modelType === 'quadratic'
      ? (x: number, y: number) => [1, x, y, x * x, y * y, x * y]
      : (x: number, y: number) => [1, x, y];

    const nFeatures = featurize(0, 0).length;
    const weights = new Float64Array(nFeatures);

    // Normalize data for stable training
    const xMean = d3.mean(data, d => d.x) || 0;
    const yMean = d3.mean(data, d => d.y) || 0;
    const xStd = Math.max(d3.deviation(data, d => d.x) || 1, 0.01);
    const yStd = Math.max(d3.deviation(data, d => d.y) || 1, 0.01);

    // Gradient descent with logistic loss
    const lr = 0.1;
    const iters = 500;
    for (let iter = 0; iter < iters; iter++) {
      const grad = new Float64Array(nFeatures);
      for (const d of data) {
        const nx = (d.x - xMean) / xStd;
        const ny = (d.y - yMean) / yStd;
        const f = featurize(nx, ny);
        let z = 0;
        for (let k = 0; k < nFeatures; k++) z += weights[k] * f[k];
        const p = 1 / (1 + Math.exp(-z));
        const err = p - d.class;
        for (let k = 0; k < nFeatures; k++) grad[k] += err * f[k];
      }
      for (let k = 0; k < nFeatures; k++) {
        weights[k] -= lr * grad[k] / data.length;
      }
    }

    return (x: number, y: number) => {
      const nx = (x - xMean) / xStd;
      const ny = (y - yMean) / yStd;
      const f = featurize(nx, ny);
      let z = 0;
      for (let k = 0; k < nFeatures; k++) z += weights[k] * f[k];
      return 1 / (1 + Math.exp(-z));
    };
  }

  private _fitRbf(data: DataPoint[], c: number): (x: number, y: number) => number {
    const gamma = c;
    return (x: number, y: number) => {
      let w0 = 0, w1 = 0;
      for (const d of data) {
        const dist2 = (x - d.x) ** 2 + (y - d.y) ** 2;
        const k = Math.exp(-gamma * dist2);
        if (d.class === 0) w0 += k;
        else w1 += k;
      }
      const total = w0 + w1;
      if (total < 1e-10) return 0.5;
      return w1 / total;
    };
  }
}

customElements.define('lv-decision-boundary', LvDecisionBoundary);
export { LvDecisionBoundary };

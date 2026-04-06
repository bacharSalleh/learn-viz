import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mt-container { width: 100%; }
  svg { display: block; margin: 0 auto; }
  .matrix-label {
    font-family: var(--lv-font-mono, monospace); font-size: 12px; fill: var(--lv-text-dim, #aaa);
  }
  .eigen-label {
    font-family: var(--lv-font-mono, monospace); font-size: 10px; fill: #ffd93d;
  }
`;

class LvMatrixTransform extends LvBaseElement {
  private _hasAnimated = false;
  private _animFrame: number | null = null;

  static get observedAttributes() {
    return ['matrix', 'show-grid', 'show-eigen', 'animate'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animFrame !== null) cancelAnimationFrame(this._animFrame);
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (!instant && this.hasAttribute('animate')) {
      this._animateTransform();
    }
  }

  private _getMatrix(): number[][] {
    return this.jsonAttr<number[][]>('matrix', [[1, 0], [0, 1]]);
  }

  private _showGrid(): boolean {
    // default true
    return !this.hasAttribute('show-grid') || this.getAttribute('show-grid') !== 'false';
  }

  private _build(): void {
    const W = 400, H = 400;
    const range = 3;
    this.render(`<div class="mt-container">
      <svg viewBox="${-range} ${-range} ${range * 2} ${range * 2}" width="${W}" height="${H}">
        <defs>
          <marker id="ah-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
          </marker>
          <marker id="ah-green" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e"/>
          </marker>
          <marker id="ah-yellow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffd93d"/>
          </marker>
        </defs>
        <g class="scene" transform="scale(1,-1)"></g>
        <g class="labels"></g>
      </svg>
    </div>`);

    if (!this.hasAttribute('animate') || this._hasAnimated) {
      this._drawScene(this._getMatrix());
    } else {
      this._drawScene([[1, 0], [0, 1]]);
    }

    this._drawMatrixLabel(this._getMatrix());
  }

  private _animateTransform(): void {
    const target = this._getMatrix();
    const duration = 1500;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
      const m: number[][] = [
        [1 + (target[0][0] - 1) * ease, target[0][1] * ease],
        [target[1][0] * ease, 1 + (target[1][1] - 1) * ease],
      ];
      this._drawScene(m);
      if (t < 1) {
        this._animFrame = requestAnimationFrame(step);
      }
    };
    this._animFrame = requestAnimationFrame(step);
  }

  private _drawScene(m: number[][]): void {
    const svg = d3.select(this.root.querySelector('svg')!);
    const scene = svg.select<SVGGElement>('.scene');
    scene.selectAll('*').remove();

    const range = 3;
    const sw = 0.02; // stroke-width in viewBox coords

    // Original grid (light gray)
    for (let i = -range; i <= range; i++) {
      scene.append('line')
        .attr('x1', -range).attr('y1', i).attr('x2', range).attr('y2', i)
        .attr('stroke', '#333').attr('stroke-width', i === 0 ? sw * 2 : sw);
      scene.append('line')
        .attr('x1', i).attr('y1', -range).attr('x2', i).attr('y2', range)
        .attr('stroke', '#333').attr('stroke-width', i === 0 ? sw * 2 : sw);
    }

    // Transformed grid
    if (this._showGrid()) {
      for (let i = -range; i <= range; i++) {
        // Horizontal line: (t, i) for t in [-range, range]
        const x1 = m[0][0] * (-range) + m[0][1] * i;
        const y1 = m[1][0] * (-range) + m[1][1] * i;
        const x2 = m[0][0] * range + m[0][1] * i;
        const y2 = m[1][0] * range + m[1][1] * i;
        scene.append('line')
          .attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)
          .attr('stroke', '#00d4ff').attr('stroke-width', sw).attr('opacity', 0.35);
        // Vertical line: (i, t) for t in [-range, range]
        const x3 = m[0][0] * i + m[0][1] * (-range);
        const y3 = m[1][0] * i + m[1][1] * (-range);
        const x4 = m[0][0] * i + m[0][1] * range;
        const y4 = m[1][0] * i + m[1][1] * range;
        scene.append('line')
          .attr('x1', x3).attr('y1', y3).attr('x2', x4).attr('y2', y4)
          .attr('stroke', '#00d4ff').attr('stroke-width', sw).attr('opacity', 0.35);
      }
    }

    // Unit circle -> transformed ellipse
    const nPts = 64;
    const circlePoints: [number, number][] = [];
    for (let i = 0; i <= nPts; i++) {
      const angle = (2 * Math.PI * i) / nPts;
      const cx = Math.cos(angle), cy = Math.sin(angle);
      circlePoints.push([m[0][0] * cx + m[0][1] * cy, m[1][0] * cx + m[1][1] * cy]);
    }
    const lineGen = d3.line<[number, number]>().x(d => d[0]).y(d => d[1]);
    scene.append('path')
      .attr('d', lineGen(circlePoints))
      .attr('fill', 'none').attr('stroke', '#7b68ee').attr('stroke-width', sw * 1.5).attr('opacity', 0.6);

    // Original unit circle (faint)
    scene.append('circle')
      .attr('cx', 0).attr('cy', 0).attr('r', 1)
      .attr('fill', 'none').attr('stroke', '#555').attr('stroke-width', sw).attr('stroke-dasharray', '0.05,0.05');

    // Basis vectors: i-hat (red), j-hat (green)
    const arrowScale = 0.85; // shorten to make room for arrowhead
    // i-hat
    const ix = m[0][0], iy = m[1][0];
    scene.append('line')
      .attr('x1', 0).attr('y1', 0).attr('x2', ix * arrowScale).attr('y2', iy * arrowScale)
      .attr('stroke', '#ef4444').attr('stroke-width', sw * 3).attr('marker-end', 'url(#ah-red)');
    // j-hat
    const jx = m[0][1], jy = m[1][1];
    scene.append('line')
      .attr('x1', 0).attr('y1', 0).attr('x2', jx * arrowScale).attr('y2', jy * arrowScale)
      .attr('stroke', '#22c55e').attr('stroke-width', sw * 3).attr('marker-end', 'url(#ah-green)');

    // Eigenvectors
    if (this.hasAttribute('show-eigen')) {
      const eigens = this._computeEigen(m);
      eigens.forEach(ev => {
        if (ev.real) {
          const len = 2.5;
          const vx = ev.vec[0] * len, vy = ev.vec[1] * len;
          scene.append('line')
            .attr('x1', -vx).attr('y1', -vy).attr('x2', vx).attr('y2', vy)
            .attr('stroke', '#ffd93d').attr('stroke-width', sw * 2)
            .attr('stroke-dasharray', '0.1,0.06')
            .attr('marker-end', 'url(#ah-yellow)');
        }
      });
    }

    // Origin dot
    scene.append('circle')
      .attr('cx', 0).attr('cy', 0).attr('r', sw * 2.5)
      .attr('fill', '#fff');
  }

  private _drawMatrixLabel(m: number[][]): void {
    const labels = d3.select(this.root.querySelector('svg')!).select<SVGGElement>('.labels');
    labels.selectAll('*').remove();
    const range = 3;
    // Top-left corner in SVG coords
    const x = -range + 0.15, y = -range + 0.3;
    labels.append('text').attr('class', 'matrix-label')
      .attr('x', x).attr('y', y).attr('font-size', '0.28')
      .text(`[${m[0][0].toFixed(1)}, ${m[0][1].toFixed(1)}]`);
    labels.append('text').attr('class', 'matrix-label')
      .attr('x', x).attr('y', y + 0.32).attr('font-size', '0.28')
      .text(`[${m[1][0].toFixed(1)}, ${m[1][1].toFixed(1)}]`);

    // Eigen info
    if (this.hasAttribute('show-eigen')) {
      const eigens = this._computeEigen(m);
      eigens.forEach((ev, i) => {
        if (ev.real) {
          labels.append('text').attr('class', 'eigen-label')
            .attr('x', x).attr('y', y + 0.7 + i * 0.3).attr('font-size', '0.22')
            .text(`\u03BB${i + 1}=${ev.value.toFixed(2)}`);
        }
      });
    }
  }

  private _computeEigen(m: number[][]): { value: number; vec: [number, number]; real: boolean }[] {
    const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1];
    const trace = a + d;
    const det = a * d - b * c;
    const disc = trace * trace - 4 * det;
    if (disc < 0) return []; // complex eigenvalues

    const sqrtDisc = Math.sqrt(disc);
    const l1 = (trace + sqrtDisc) / 2;
    const l2 = (trace - sqrtDisc) / 2;

    const getVec = (lambda: number): [number, number] => {
      // (A - lambda*I)v = 0
      const r0 = a - lambda, r1 = b;
      if (Math.abs(r1) > 1e-10) {
        const v: [number, number] = [1, -r0 / r1];
        const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        return [v[0] / mag, v[1] / mag];
      } else if (Math.abs(r0) > 1e-10) {
        return [0, 1];
      }
      return [1, 0];
    };

    return [
      { value: l1, vec: getVec(l1), real: true },
      { value: l2, vec: getVec(l2), real: true },
    ];
  }
}

customElements.define('lv-matrix-transform', LvMatrixTransform);
export { LvMatrixTransform };

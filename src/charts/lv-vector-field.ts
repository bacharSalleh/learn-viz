import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .vf-container { width: 100%; }
  canvas { display: block; margin: 0 auto; }
`;

interface Particle {
  x: number;
  y: number;
  trail: [number, number][];
}

class LvVectorField extends LvBaseElement {
  private _hasAnimated = false;
  private _animFrame: number | null = null;
  private _particles: Particle[] = [];
  private _fnEval: ((x: number, y: number) => [number, number]) | null = null;

  static get observedAttributes() {
    return ['fn', 'range', 'density', 'particles', 'particle-count'];
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
    if (!instant && this.hasAttribute('particles')) {
      this._startParticles();
    }
  }

  private _getRange(): [number, number] {
    return this.jsonAttr<[number, number]>('range', [-3, 3]);
  }

  private _getDensity(): number {
    return parseInt(this.getAttribute('density') || '15', 10);
  }

  private _getParticleCount(): number {
    return parseInt(this.getAttribute('particle-count') || '50', 10);
  }

  private _parseFn(): (x: number, y: number) => [number, number] {
    const fnStr = this.getAttribute('fn') || 'rotation';

    const presets: Record<string, (x: number, y: number) => [number, number]> = {
      'rotation': (x, y) => [-y, x],
      'source': (x, y) => [x, y],
      'saddle': (x, y) => [x, -y],
      'curl': (x, y) => [-(y * y), x * x],
    };

    if (presets[fnStr]) return presets[fnStr];

    // Custom: parse "[expr1, expr2]"
    try {
      const body = fnStr.replace(/\^/g, '**');
      const fn = new Function('x', 'y', `'use strict'; return ${body};`) as (x: number, y: number) => [number, number];
      // test it
      fn(0, 0);
      return fn;
    } catch {
      return presets['rotation'];
    }
  }

  private _build(): void {
    if (this._animFrame !== null) cancelAnimationFrame(this._animFrame);
    this._animFrame = null;
    this._fnEval = this._parseFn();

    const size = 500;
    const dpr = 2;
    this.render(`<div class="vf-container">
      <canvas width="${size * dpr}" height="${size * dpr}" style="width:${size}px;height:${size}px;"></canvas>
    </div>`);

    this._drawField();

    // If already animated and particles requested, restart
    if (this._hasAnimated && this.hasAttribute('particles')) {
      this._startParticles();
    }
  }

  private _drawField(): void {
    const canvas = this.root.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = 2;
    const size = 500;
    const [rMin, rMax] = this._getRange();
    const density = this._getDensity();
    const fn = this._fnEval!;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    // Map world coords to canvas
    const toCanvas = (wx: number, wy: number): [number, number] => {
      const px = ((wx - rMin) / (rMax - rMin)) * size;
      const py = ((rMax - wy) / (rMax - rMin)) * size; // y flipped
      return [px, py];
    };

    // Axis lines
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    const [zx, zy] = toCanvas(0, 0);
    // x-axis
    ctx.beginPath(); ctx.moveTo(0, zy); ctx.lineTo(size, zy); ctx.stroke();
    // y-axis
    ctx.beginPath(); ctx.moveTo(zx, 0); ctx.lineTo(zx, size); ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#666';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('x', size - 10, zy + 14);
    ctx.fillText('y', zx + 14, 14);
    // Tick marks
    for (let v = Math.ceil(rMin); v <= Math.floor(rMax); v++) {
      if (v === 0) continue;
      const [tx, ty] = toCanvas(v, 0);
      ctx.fillText(String(v), tx, zy + 14);
      const [tx2, ty2] = toCanvas(0, v);
      ctx.textAlign = 'right';
      ctx.fillText(String(v), zx - 6, ty2 + 4);
      ctx.textAlign = 'center';
    }

    // Compute max magnitude for scaling
    const step = (rMax - rMin) / density;
    let maxMag = 0;
    for (let i = 0; i < density; i++) {
      for (let j = 0; j < density; j++) {
        const wx = rMin + (i + 0.5) * step;
        const wy = rMin + (j + 0.5) * step;
        const [dx, dy] = fn(wx, wy);
        const mag = Math.sqrt(dx * dx + dy * dy);
        if (mag > maxMag) maxMag = mag;
      }
    }
    if (maxMag === 0) maxMag = 1;

    const arrowLen = (step * 0.8 * size) / (rMax - rMin);

    // Draw arrows
    for (let i = 0; i < density; i++) {
      for (let j = 0; j < density; j++) {
        const wx = rMin + (i + 0.5) * step;
        const wy = rMin + (j + 0.5) * step;
        const [dx, dy] = fn(wx, wy);
        const mag = Math.sqrt(dx * dx + dy * dy);
        if (mag < 1e-10) continue;

        const normMag = mag / maxMag;
        const len = arrowLen * Math.min(normMag, 1) * 0.9;
        const angle = Math.atan2(-dy, dx); // negate dy because canvas y is flipped

        const [cx, cy] = toCanvas(wx, wy);

        // Color: blue (low) to red (high)
        const r = Math.floor(normMag * 255);
        const b = Math.floor((1 - normMag) * 255);
        const g = Math.floor((1 - Math.abs(normMag - 0.5) * 2) * 120);
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.lineWidth = 1.2;

        // Arrow line
        const ex = cx + len * Math.cos(angle);
        const ey = cy + len * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // Arrowhead
        const headLen = Math.max(len * 0.3, 3);
        const ha1 = angle + Math.PI * 0.8;
        const ha2 = angle - Math.PI * 0.8;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex + headLen * Math.cos(ha1), ey + headLen * Math.sin(ha1));
        ctx.lineTo(ex + headLen * Math.cos(ha2), ey + headLen * Math.sin(ha2));
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  private _startParticles(): void {
    const [rMin, rMax] = this._getRange();
    const count = this._getParticleCount();
    this._particles = [];
    for (let i = 0; i < count; i++) {
      this._particles.push({
        x: rMin + Math.random() * (rMax - rMin),
        y: rMin + Math.random() * (rMax - rMin),
        trail: [],
      });
    }
    this._animateParticles();
  }

  private _animateParticles(): void {
    const canvas = this.root.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = 2;
    const size = 500;
    const [rMin, rMax] = this._getRange();
    const fn = this._fnEval!;
    const dt = 0.015;
    const trailLen = 10;

    const toCanvas = (wx: number, wy: number): [number, number] => {
      const px = ((wx - rMin) / (rMax - rMin)) * size;
      const py = ((rMax - wy) / (rMax - rMin)) * size;
      return [px, py];
    };

    const step = () => {
      // Redraw field
      this._drawField();

      ctx.save();
      ctx.scale(dpr, dpr);

      // Update and draw particles
      for (const p of this._particles) {
        const [dx, dy] = fn(p.x, p.y);
        p.trail.push([p.x, p.y]);
        if (p.trail.length > trailLen) p.trail.shift();
        p.x += dx * dt;
        p.y += dy * dt;

        // Reset if out of bounds
        if (p.x < rMin || p.x > rMax || p.y < rMin || p.y > rMax) {
          p.x = rMin + Math.random() * (rMax - rMin);
          p.y = rMin + Math.random() * (rMax - rMin);
          p.trail = [];
        }

        // Draw trail
        for (let t = 0; t < p.trail.length; t++) {
          const alpha = (t + 1) / p.trail.length * 0.6;
          const [tx, ty] = toCanvas(p.trail[t][0], p.trail[t][1]);
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.fill();
        }

        // Draw particle
        const [px, py] = toCanvas(p.x, p.y);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00d4ff';
        ctx.fill();
      }

      ctx.restore();
      this._animFrame = requestAnimationFrame(step);
    };

    this._animFrame = requestAnimationFrame(step);
  }
}

customElements.define('lv-vector-field', LvVectorField);
export { LvVectorField };

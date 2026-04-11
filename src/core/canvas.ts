// CanvasChart — Two-canvas layering utility for high-performance chart rendering
// Static layer (bottom): axes, gridlines, data — redrawn only on data/resize change
// Overlay layer (top):   hover crosshair, highlights — redrawn on mouse move

export interface Point { x: number; y: number }

export interface LineStyle {
  color: string;
  width?: number;
  dash?: number[];
  opacity?: number;
}

export interface AreaStyle {
  fill: string;
  opacity?: number;
}

export interface CircleStyle {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface TextStyle {
  color?: string;
  size?: number;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  font?: string;
  weight?: string;
}

export interface GridStyle {
  color?: string;
  dash?: number[];
  width?: number;
}

export interface Tick { pos: number; label: string }

export interface HoverEvent {
  canvasX: number;
  canvasY: number;
  plotX: number;
  plotY: number;
}

export interface CanvasChartOptions {
  padding?: { top: number; right: number; bottom: number; left: number };
  onResize?: () => void;
}

export class CanvasChart {
  readonly staticCanvas: HTMLCanvasElement;
  readonly overlayCanvas: HTMLCanvasElement;
  readonly tooltipEl: HTMLDivElement;
  readonly staticCtx: CanvasRenderingContext2D;
  readonly overlayCtx: CanvasRenderingContext2D;

  private _host: HTMLElement;
  private _container: HTMLElement;
  private _padding: { top: number; right: number; bottom: number; left: number };
  private _onResize?: () => void;
  private _resizeObs: ResizeObserver;
  private _hoverCb?: (e: HoverEvent) => void;
  private _leaveCb?: () => void;
  private _rafId = 0;
  private _pendingHover: HoverEvent | null = null;
  private _width = 0;
  private _height = 0;

  // Plot area (CSS pixels, after padding)
  get plotX() { return this._padding.left; }
  get plotY() { return this._padding.top; }
  get plotWidth() { return Math.max(0, this._width - this._padding.left - this._padding.right); }
  get plotHeight() { return Math.max(0, this._height - this._padding.top - this._padding.bottom); }

  constructor(host: HTMLElement, container: HTMLElement, options?: CanvasChartOptions) {
    this._host = host;
    this._container = container;
    this._padding = options?.padding ?? { top: 20, right: 20, bottom: 40, left: 50 };
    this._onResize = options?.onResize;

    // Create elements
    this.staticCanvas = document.createElement('canvas');
    this.overlayCanvas = document.createElement('canvas');
    this.tooltipEl = document.createElement('div');

    this.staticCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    this.overlayCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    this.tooltipEl.style.cssText = `
      position:absolute;z-index:30;display:none;
      background:var(--lv-bg-card,#1a1a2e);
      border:1px solid var(--lv-border,#2a2a4a);
      border-radius:8px;padding:6px 10px;
      font-size:11px;line-height:16px;font-family:inherit;
      pointer-events:none;color:var(--lv-text,#e4e4ec);
      white-space:nowrap;
    `;

    container.style.position = 'relative';
    container.appendChild(this.staticCanvas);
    container.appendChild(this.overlayCanvas);
    container.appendChild(this.tooltipEl);

    this.staticCtx = this.staticCanvas.getContext('2d')!;
    this.overlayCtx = this.overlayCanvas.getContext('2d')!;

    // Bind mouse events on overlay
    this.overlayCanvas.addEventListener('mousemove', this._onMouseMove);
    this.overlayCanvas.addEventListener('mouseleave', this._onMouseLeave);
    this.overlayCanvas.addEventListener('touchmove', this._onTouchMove, { passive: true });
    this.overlayCanvas.addEventListener('touchend', this._onMouseLeave);

    // Observe resize
    this._resizeObs = new ResizeObserver(() => this.resize());
    this._resizeObs.observe(container);

    // Initial size
    this.resize();
  }

  // ── Scales ──

  xScale(domain: [number, number]): (v: number) => number {
    const [d0, d1] = domain;
    const range = d1 - d0 || 1;
    const px = this.plotX;
    const pw = this.plotWidth;
    return (v: number) => px + ((v - d0) / range) * pw;
  }

  yScale(domain: [number, number]): (v: number) => number {
    const [d0, d1] = domain;
    const range = d1 - d0 || 1;
    const py = this.plotY;
    const ph = this.plotHeight;
    return (v: number) => py + ph - ((v - d0) / range) * ph;
  }

  // Inverse scales for hit-testing
  xScaleInvert(domain: [number, number]): (px: number) => number {
    const [d0, d1] = domain;
    const range = d1 - d0 || 1;
    const pxStart = this.plotX;
    const pw = this.plotWidth;
    return (px: number) => d0 + ((px - pxStart) / pw) * range;
  }

  yScaleInvert(domain: [number, number]): (py: number) => number {
    const [d0, d1] = domain;
    const range = d1 - d0 || 1;
    const pyStart = this.plotY;
    const ph = this.plotHeight;
    return (py: number) => d0 + ((pyStart + ph - py) / ph) * range;
  }

  // ── Drawing primitives ──

  drawLine(ctx: CanvasRenderingContext2D, points: Point[], style: LineStyle): void {
    if (points.length < 2) return;
    ctx.save();
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width ?? 2;
    ctx.globalAlpha = style.opacity ?? 1;
    if (style.dash) ctx.setLineDash(style.dash);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawSmoothLine(ctx: CanvasRenderingContext2D, points: Point[], style: LineStyle): void {
    if (points.length < 2) return;
    ctx.save();
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width ?? 2;
    ctx.globalAlpha = style.opacity ?? 1;
    if (style.dash) ctx.setLineDash(style.dash);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    if (points.length === 2) {
      ctx.lineTo(points[1].x, points[1].y);
    } else {
      // Monotone cubic interpolation (Fritsch-Carlson)
      const n = points.length;
      const dx: number[] = [];
      const dy: number[] = [];
      const m: number[] = [];
      const tangents: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        dx.push(points[i + 1].x - points[i].x);
        dy.push(points[i + 1].y - points[i].y);
        m.push(dy[i] / (dx[i] || 1));
      }

      tangents.push(m[0]);
      for (let i = 1; i < n - 1; i++) {
        if (m[i - 1] * m[i] <= 0) {
          tangents.push(0);
        } else {
          tangents.push((m[i - 1] + m[i]) / 2);
        }
      }
      tangents.push(m[n - 2]);

      // Fritsch-Carlson monotonicity
      for (let i = 0; i < n - 1; i++) {
        if (Math.abs(m[i]) < 1e-12) {
          tangents[i] = 0;
          tangents[i + 1] = 0;
        } else {
          const a = tangents[i] / m[i];
          const b = tangents[i + 1] / m[i];
          const s = a * a + b * b;
          if (s > 9) {
            const t = 3 / Math.sqrt(s);
            tangents[i] = t * a * m[i];
            tangents[i + 1] = t * b * m[i];
          }
        }
      }

      for (let i = 0; i < n - 1; i++) {
        const d = dx[i] / 3;
        ctx.bezierCurveTo(
          points[i].x + d, points[i].y + d * tangents[i],
          points[i + 1].x - d, points[i + 1].y - d * tangents[i + 1],
          points[i + 1].x, points[i + 1].y
        );
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  drawArea(ctx: CanvasRenderingContext2D, points: Point[], baseline: number, style: AreaStyle): void {
    if (points.length < 2) return;
    ctx.save();
    ctx.globalAlpha = style.opacity ?? 0.2;
    ctx.fillStyle = style.fill;
    ctx.beginPath();
    ctx.moveTo(points[0].x, baseline);
    for (const p of points) ctx.lineTo(p.x, p.y);
    ctx.lineTo(points[points.length - 1].x, baseline);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawSmoothArea(ctx: CanvasRenderingContext2D, points: Point[], baseline: number, style: AreaStyle): void {
    if (points.length < 2) return;
    ctx.save();
    ctx.globalAlpha = style.opacity ?? 0.2;
    ctx.fillStyle = style.fill;
    ctx.beginPath();
    ctx.moveTo(points[0].x, baseline);
    ctx.lineTo(points[0].x, points[0].y);

    if (points.length === 2) {
      ctx.lineTo(points[1].x, points[1].y);
    } else {
      // Same monotone cubic as drawSmoothLine
      const n = points.length;
      const dx: number[] = [];
      const dy: number[] = [];
      const m: number[] = [];
      const tangents: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        dx.push(points[i + 1].x - points[i].x);
        dy.push(points[i + 1].y - points[i].y);
        m.push(dy[i] / (dx[i] || 1));
      }
      tangents.push(m[0]);
      for (let i = 1; i < n - 1; i++) {
        tangents.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
      }
      tangents.push(m[n - 2]);
      for (let i = 0; i < n - 1; i++) {
        if (Math.abs(m[i]) < 1e-12) {
          tangents[i] = 0; tangents[i + 1] = 0;
        } else {
          const a = tangents[i] / m[i];
          const b = tangents[i + 1] / m[i];
          const s = a * a + b * b;
          if (s > 9) {
            const t = 3 / Math.sqrt(s);
            tangents[i] = t * a * m[i];
            tangents[i + 1] = t * b * m[i];
          }
        }
      }
      for (let i = 0; i < n - 1; i++) {
        const d = dx[i] / 3;
        ctx.bezierCurveTo(
          points[i].x + d, points[i].y + d * tangents[i],
          points[i + 1].x - d, points[i + 1].y - d * tangents[i + 1],
          points[i + 1].x, points[i + 1].y
        );
      }
    }

    ctx.lineTo(points[points.length - 1].x, baseline);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, style: CircleStyle): void {
    ctx.save();
    ctx.globalAlpha = style.opacity ?? 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    if (style.fill) { ctx.fillStyle = style.fill; ctx.fill(); }
    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = style.strokeWidth ?? 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, style: TextStyle): void {
    ctx.save();
    ctx.fillStyle = style.color ?? this.getThemeColor('--lv-text');
    ctx.textAlign = style.align ?? 'center';
    ctx.textBaseline = style.baseline ?? 'middle';
    const weight = style.weight ?? 'normal';
    const size = style.size ?? 11;
    const font = style.font ?? '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawGridlines(ctx: CanvasRenderingContext2D, xPositions: number[], yPositions: number[], style?: GridStyle): void {
    ctx.save();
    ctx.strokeStyle = style?.color ?? (this.getThemeColor('--lv-text-dim') || '#888');
    ctx.globalAlpha = 0.12;
    ctx.lineWidth = style?.width ?? 1;
    ctx.setLineDash(style?.dash ?? [3, 3]);

    for (const x of xPositions) {
      ctx.beginPath();
      ctx.moveTo(x, this.plotY);
      ctx.lineTo(x, this.plotY + this.plotHeight);
      ctx.stroke();
    }
    for (const y of yPositions) {
      ctx.beginPath();
      ctx.moveTo(this.plotX, y);
      ctx.lineTo(this.plotX + this.plotWidth, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawAxes(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = this.getThemeColor('--lv-border') || '#2a2a4a';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    // Bottom axis
    ctx.beginPath();
    ctx.moveTo(this.plotX, this.plotY + this.plotHeight);
    ctx.lineTo(this.plotX + this.plotWidth, this.plotY + this.plotHeight);
    ctx.stroke();
    // Left axis
    ctx.beginPath();
    ctx.moveTo(this.plotX, this.plotY);
    ctx.lineTo(this.plotX, this.plotY + this.plotHeight);
    ctx.stroke();
    ctx.restore();
  }

  drawAxisLabels(ctx: CanvasRenderingContext2D, xTicks: Tick[], yTicks: Tick[], style?: TextStyle): void {
    const color = style?.color ?? (this.getThemeColor('--lv-text-dim') || '#888');
    const size = style?.size ?? 10;
    for (const t of xTicks) {
      this.drawText(ctx, t.label, t.pos, this.plotY + this.plotHeight + 14, { color, size, align: 'center', baseline: 'top' });
    }
    for (const t of yTicks) {
      this.drawText(ctx, t.label, this.plotX - 8, t.pos, { color, size, align: 'right', baseline: 'middle' });
    }
  }

  // ── Theme ──

  getThemeColor(prop: string): string {
    return getComputedStyle(this._host).getPropertyValue(prop).trim();
  }

  // ── Interaction ──

  onHover(cb: (e: HoverEvent) => void): void { this._hoverCb = cb; }
  onLeave(cb: () => void): void { this._leaveCb = cb; }

  showTooltip(html: string, x: number, y: number): void {
    this.tooltipEl.innerHTML = html;
    this.tooltipEl.style.display = 'block';

    // Position with edge-flip
    const tw = this.tooltipEl.offsetWidth;
    const th = this.tooltipEl.offsetHeight;
    let tx = x + 12;
    let ty = y - th - 8;
    if (tx + tw > this._width) tx = x - tw - 12;
    if (ty < 0) ty = y + 12;
    this.tooltipEl.style.left = tx + 'px';
    this.tooltipEl.style.top = ty + 'px';
  }

  hideTooltip(): void {
    this.tooltipEl.style.display = 'none';
  }

  // ── Lifecycle ──

  resize(): void {
    const rect = this._container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    this._width = rect.width;
    this._height = rect.height;
    const dpr = window.devicePixelRatio || 1;

    for (const c of [this.staticCanvas, this.overlayCanvas]) {
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      const ctx = c.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    this._onResize?.();
  }

  clear(layer: 'static' | 'overlay' | 'both'): void {
    const dpr = window.devicePixelRatio || 1;
    if (layer !== 'overlay') {
      this.staticCtx.clearRect(0, 0, this._width * dpr, this._height * dpr);
    }
    if (layer !== 'static') {
      this.overlayCtx.clearRect(0, 0, this._width * dpr, this._height * dpr);
    }
  }

  destroy(): void {
    this._resizeObs.disconnect();
    this.overlayCanvas.removeEventListener('mousemove', this._onMouseMove);
    this.overlayCanvas.removeEventListener('mouseleave', this._onMouseLeave);
    this.overlayCanvas.removeEventListener('touchmove', this._onTouchMove);
    this.overlayCanvas.removeEventListener('touchend', this._onMouseLeave);
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  // ── Tick generation helper ──

  static niceTicksForRange(min: number, max: number, count = 6): number[] {
    const range = max - min || 1;
    const rough = range / count;
    const pow = Math.pow(10, Math.floor(Math.log10(rough)));
    const norm = rough / pow;
    let step: number;
    if (norm < 1.5) step = 1 * pow;
    else if (norm < 3) step = 2 * pow;
    else if (norm < 7) step = 5 * pow;
    else step = 10 * pow;

    const ticks: number[] = [];
    const start = Math.ceil(min / step) * step;
    for (let v = start; v <= max + step * 0.01; v += step) {
      ticks.push(v);
    }
    return ticks;
  }

  // ── Internal mouse handlers ──

  private _onMouseMove = (e: MouseEvent) => {
    const rect = this.overlayCanvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    this._pendingHover = { canvasX: cx, canvasY: cy, plotX: cx, plotY: cy };
    if (!this._rafId) {
      this._rafId = requestAnimationFrame(this._flushHover);
    }
  };

  private _onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    const rect = this.overlayCanvas.getBoundingClientRect();
    const cx = t.clientX - rect.left;
    const cy = t.clientY - rect.top;
    this._pendingHover = { canvasX: cx, canvasY: cy, plotX: cx, plotY: cy };
    if (!this._rafId) {
      this._rafId = requestAnimationFrame(this._flushHover);
    }
  };

  private _flushHover = () => {
    this._rafId = 0;
    if (this._pendingHover && this._hoverCb) {
      this._hoverCb(this._pendingHover);
    }
    this._pendingHover = null;
  };

  private _onMouseLeave = () => {
    this._pendingHover = null;
    if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = 0; }
    this._leaveCb?.();
  };
}

import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = /* css */ `
  :host { display: block; }
  svg { width: 100%; max-width: 700px; margin: 0 auto; display: block; direction: ltr; }
  .cell { cursor: default; transition: transform 0.2s ease; transform-origin: center; }
  .cell:hover { transform: scale(1.08); }
  .cell-text { text-anchor: middle; dominant-baseline: central; font-size: 11px; font-weight: 600; pointer-events: none; }
  .header-text { text-anchor: middle; dominant-baseline: central; font-size: 12px; fill: var(--lv-text-dim, #888); }
  .tooltip {
    position: absolute;
    background: var(--lv-card, #222);
    color: var(--lv-text, #fff);
    border: 1px solid var(--lv-border, #444);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    white-space: nowrap;
    z-index: 10;
  }
`;

class LvHeatmap extends LvBaseElement {
  private _svg: SVGSVGElement | null = null;
  private _animated = true;
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['labels', 'values', 'scale', 'animated'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._animated = this.getAttribute('animated') !== 'false';
    this._buildChart();
  }

  handleAttributeChange() {
    if (this.isConnected) {
      this._buildChart();
    }
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;
    this._hasAnimated = true;

    const svg = this._svg;
    if (!svg) return;

    const cells = svg.querySelectorAll('.cell');
    if (instant || !this._animated) {
      cells.forEach(cell => {
        (cell as SVGElement).style.opacity = '1';
        (cell as SVGElement).style.transform = 'scale(1)';
      });
      return;
    }

    cells.forEach(cell => {
      const el = cell as SVGElement;
      const delay = Number(el.dataset.delay || 0);
      el.style.opacity = '0';
      el.style.transform = 'scale(0.5)';
      el.style.transition = 'none';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`;
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        });
      });
    });
  }

  private _buildChart(): void {
    const labels: string[] = this.jsonAttr('labels', []);
    const values: number[][] = this.jsonAttr('values', []);
    const scaleType = this.getAttribute('scale') || 'diverging';

    if (!labels.length || !values.length) {
      this.render('<svg></svg>');
      return;
    }

    const n = labels.length;
    const gap = 3;
    const headerH = 60; // top column headers height
    const headerW = 110; // side row headers width
    const cellSize = 56;
    const totalGrid = n * cellSize + (n - 1) * gap;
    const svgW = totalGrid + headerW;
    const svgH = totalGrid + headerH;

    // Color scale
    const colorScale = scaleType === 'sequential'
      ? d3.scaleSequential(d3.interpolateBlues).domain([0, 1])
      : d3.scaleDiverging(d3.interpolateRdYlGn).domain([-1, 0, 1]);

    // Build SVG markup
    const isRtl = this.isRtl;
    let svgContent = '';

    // Column headers (top)
    for (let c = 0; c < n; c++) {
      const x = headerW + c * (cellSize + gap) + cellSize / 2;
      const y = headerH / 2;
      svgContent += `<text class="header-text" x="${isRtl ? svgW - x : x}" y="${y}">${this._escapeHtml(labels[c])}</text>`;
    }

    // Row headers (left or right)
    for (let r = 0; r < n; r++) {
      const y = headerH + r * (cellSize + gap) + cellSize / 2;
      const x = isRtl ? svgW - headerW / 2 : headerW / 2;
      svgContent += `<text class="header-text" x="${x}" y="${y}">${this._escapeHtml(labels[r])}</text>`;
    }

    // Cells
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const val = values[r]?.[c] ?? 0;
        const color = colorScale(val) as string;
        const textColor = this._contrastColor(color);
        const delay = (r + c) * 40;

        let cx = headerW + c * (cellSize + gap);
        if (isRtl) cx = svgW - cx - cellSize;
        const cy = headerH + r * (cellSize + gap);
        const centerX = cx + cellSize / 2;
        const centerY = cy + cellSize / 2;

        svgContent += `<g class="cell" data-delay="${delay}" data-value="${val.toFixed(2)}" style="transform-origin: ${centerX}px ${centerY}px; opacity: 0; transform: scale(0.5);">`;
        svgContent += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="${cellSize}" rx="6" ry="6" fill="${color}"/>`;
        svgContent += `<text class="cell-text" x="${centerX}" y="${centerY}" fill="${textColor}">${val.toFixed(2)}</text>`;
        svgContent += `</g>`;
      }
    }

    // Tooltip element
    const html = `
      <div style="position: relative;">
        <svg viewBox="0 0 ${svgW} ${svgH}">${svgContent}</svg>
        <div class="tooltip"></div>
      </div>
    `;
    this.render(html);

    this._svg = this.root.querySelector('svg');
    const tooltip = this.root.querySelector('.tooltip') as HTMLElement;

    // Hover events
    if (this._svg && tooltip) {
      this._svg.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('mouseenter', (e: Event) => {
          const el = (e.currentTarget as SVGElement);
          const val = el.dataset.value || '';
          tooltip.textContent = val;
          tooltip.style.opacity = '1';
        });

        cell.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const rect = this.root.querySelector('div')!.getBoundingClientRect();
          tooltip.style.left = `${me.clientX - rect.left + 10}px`;
          tooltip.style.top = `${me.clientY - rect.top - 28}px`;
        });

        cell.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
        });
      });
    }
  }

  private _contrastColor(color: string): string {
    const c = d3.color(color);
    if (!c) return '#000';
    const rgb = c.rgb();
    // Relative luminance approximation
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000' : '#fff';
  }

  private _escapeHtml(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

customElements.define('lv-heatmap', LvHeatmap);

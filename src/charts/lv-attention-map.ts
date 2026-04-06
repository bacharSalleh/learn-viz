import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .attn-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .token-text { font-family: var(--lv-font-mono); font-size: 13px; fill: var(--lv-text, #e0e0e0); cursor: pointer; }
  .token-text:hover { fill: #fff; }
  .attn-line { transition: stroke-opacity 0.15s ease; }
  .head-bar { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px; }
  .head-btn {
    font-family: var(--lv-font); font-size: 11px;
    padding: 3px 10px; border-radius: var(--lv-r-sm, 4px);
    border: 1px solid var(--lv-border, #333);
    background: transparent; color: var(--lv-text-dim, #aaa);
    cursor: pointer; transition: all 0.15s;
  }
  .head-btn:hover { border-color: var(--lv-accent, #00d4ff); color: var(--lv-accent, #00d4ff); }
  .head-btn.active {
    background: var(--lv-accent, #00d4ff); color: #000;
    border-color: var(--lv-accent, #00d4ff); font-weight: 600;
  }
`;

class LvAttentionMap extends LvBaseElement {
  private _hasAnimated = false;
  private _activeHead = 0;

  static get observedAttributes() {
    return ['tokens', 'target-tokens', 'weights', 'heads', 'color'];
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
      svg.style.transition = 'opacity 0.5s ease-out';
      requestAnimationFrame(() => { svg.style.opacity = '1'; });
    }
  }

  private _getWeights(): number[][] | null {
    const heads: number[][][] | null = this.jsonAttr('heads', null as unknown as number[][][]);
    if (heads && heads.length > 0) {
      const idx = Math.min(this._activeHead, heads.length - 1);
      return heads[idx];
    }
    return this.jsonAttr('weights', null as unknown as number[][]);
  }

  private _build(): void {
    const tokens: string[] = this.jsonAttr('tokens', []);
    const targetTokens: string[] = this.jsonAttr('target-tokens', tokens);
    const weights = this._getWeights();
    const heads: number[][][] | null = this.jsonAttr('heads', null as unknown as number[][][]);
    const color = this.getAttribute('color') || '#00d4ff';

    if (!tokens.length || !weights) {
      this.render('<div class="attn-container"><em style="color:var(--lv-text-dim)">No attention data</em></div>');
      return;
    }

    const srcCount = tokens.length;
    const tgtCount = targetTokens.length;
    const tokenHeight = 24;
    const topPad = 10;
    const colWidth = 120;
    const midWidth = 200;
    const svgW = colWidth * 2 + midWidth;
    const svgH = Math.max(srcCount, tgtCount) * tokenHeight + topPad * 2;

    const srcX = colWidth;
    const tgtX = colWidth + midWidth;

    const isRtl = this.isRtl;
    const srcTextX = isRtl ? svgW - (srcX - 8) : srcX - 8;
    const tgtTextX = isRtl ? svgW - (tgtX + 8) : tgtX + 8;
    const srcAnchor = isRtl ? 'start' : 'end';
    const tgtAnchor = isRtl ? 'end' : 'start';
    const lineX1 = isRtl ? svgW - srcX : srcX;
    const lineX2 = isRtl ? svgW - tgtX : tgtX;

    // Build head selector buttons
    let headBar = '';
    if (heads && heads.length > 1) {
      const btns = heads.map((_, i) =>
        `<button class="head-btn${i === this._activeHead ? ' active' : ''}" data-head="${i}">Head ${i + 1}</button>`
      ).join('');
      headBar = `<div class="head-bar">${btns}</div>`;
    }

    // Build SVG lines
    let linesHtml = '';
    for (let s = 0; s < srcCount; s++) {
      for (let t = 0; t < tgtCount; t++) {
        const w = weights[s]?.[t] ?? 0;
        if (w < 0.01) continue;
        const y1 = topPad + s * tokenHeight + tokenHeight / 2;
        const y2 = topPad + t * tokenHeight + tokenHeight / 2;
        const cp1x = lineX1 + (lineX2 - lineX1) * 0.35;
        const cp2x = lineX1 + (lineX2 - lineX1) * 0.65;
        linesHtml += `<path class="attn-line" data-src="${s}" data-tgt="${t}" d="M${lineX1},${y1} C${cp1x},${y1} ${cp2x},${y2} ${lineX2},${y2}" fill="none" stroke="${color}" stroke-width="${Math.max(0.5, w * 4)}" stroke-opacity="${w}"/>`;
      }
    }

    // Build token labels
    let srcLabels = '';
    tokens.forEach((tok, i) => {
      const y = topPad + i * tokenHeight + tokenHeight / 2 + 4;
      srcLabels += `<text class="token-text src-token" data-idx="${i}" x="${srcTextX}" y="${y}" text-anchor="${srcAnchor}">${this._esc(tok)}</text>`;
    });

    let tgtLabels = '';
    targetTokens.forEach((tok, i) => {
      const y = topPad + i * tokenHeight + tokenHeight / 2 + 4;
      tgtLabels += `<text class="token-text tgt-token" data-idx="${i}" x="${tgtTextX}" y="${y}" text-anchor="${tgtAnchor}">${this._esc(tok)}</text>`;
    });

    this.render(`<div class="attn-container">
      ${headBar}
      <svg id="attn-svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">
        <g id="lines-group">${linesHtml}</g>
        ${srcLabels}
        ${tgtLabels}
      </svg>
    </div>`);

    this._bindEvents();
  }

  private _bindEvents(): void {
    const svg = this.root.getElementById('attn-svg');
    if (!svg) return;

    // Hover on source tokens
    svg.querySelectorAll('.src-token').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const idx = el.getAttribute('data-idx');
        svg.querySelectorAll('.attn-line').forEach(line => {
          const lineEl = line as SVGPathElement;
          if (lineEl.dataset.src === idx) {
            lineEl.style.strokeOpacity = '';
          } else {
            lineEl.style.strokeOpacity = '0.05';
          }
        });
      });
      el.addEventListener('mouseleave', () => {
        svg.querySelectorAll('.attn-line').forEach(line => {
          (line as SVGPathElement).style.strokeOpacity = '';
        });
      });
    });

    // Hover on target tokens
    svg.querySelectorAll('.tgt-token').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const idx = el.getAttribute('data-idx');
        svg.querySelectorAll('.attn-line').forEach(line => {
          const lineEl = line as SVGPathElement;
          if (lineEl.dataset.tgt === idx) {
            lineEl.style.strokeOpacity = '';
          } else {
            lineEl.style.strokeOpacity = '0.05';
          }
        });
      });
      el.addEventListener('mouseleave', () => {
        svg.querySelectorAll('.attn-line').forEach(line => {
          (line as SVGPathElement).style.strokeOpacity = '';
        });
      });
    });

    // Head selector buttons
    this.root.querySelectorAll('.head-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const headIdx = parseInt((btn as HTMLElement).dataset.head || '0', 10);
        this._activeHead = headIdx;
        this._build();
      });
    });
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

customElements.define('lv-attention-map', LvAttentionMap);
export { LvAttentionMap };

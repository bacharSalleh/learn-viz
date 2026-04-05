import { LvBaseElement } from '../core/base-element.js';

// ── Styles ──────────────────────────────────────────────────────────────────

const css = `
  :host {
    display: block;
    margin-block: 1em;
    overflow-x: auto;
  }

  svg {
    display: block;
  }

  /* Step card entrance */
  .step-group {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s ease-out, transform 0.35s ease-out;
  }
  :host(.lv-entered) .step-group {
    opacity: 1;
    transform: translateY(0);
  }

  /* Arrow draw-in */
  .arrow-path {
    transition: stroke-dashoffset 0.5s ease-out;
  }
  :host(.lv-entered) .arrow-path {
    stroke-dashoffset: 0 !important;
  }
`;

// ── Constants ───────────────────────────────────────────────────────────────

const CARD_W = 120;
const CARD_H = 90;
const GAP_H = 60;
const GAP_V = 40;
const CARD_R = 10;
const ARROW_STROKE = 2;
const MARKER_SIZE = 8;
const CYCLIC_OFFSET = 60; // how far the return arrow bows out below the cards

// ── Helpers ─────────────────────────────────────────────────────────────────

interface StepData {
  icon: string;
  label: string;
  sub: string;
  color: string;
  active: boolean;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Element ─────────────────────────────────────────────────────────────────

class LvFlow extends LvBaseElement {
  private _steps: StepData[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._readChildren();
    this._renderSvg();
  }

  /** Read <lv-flow-step> children and extract attributes */
  private _readChildren() {
    this._steps = [];
    const children = this.querySelectorAll('lv-flow-step');
    children.forEach((child) => {
      this._steps.push({
        icon: child.getAttribute('icon') || '',
        label: child.getAttribute('label') || '',
        sub: child.getAttribute('sub') || '',
        color: child.getAttribute('color') || 'var(--lv-accent, #6366f1)',
        active: child.hasAttribute('active'),
      });
    });
  }

  /** Build the full SVG and inject into shadow DOM */
  private _renderSvg() {
    const steps = this._steps;
    if (steps.length === 0) return;

    const dir = this.getAttribute('direction') || 'horizontal';
    const isH = dir === 'horizontal';
    const cyclic = this.hasAttribute('cyclic');
    const rtl = this.isRtl;

    // Padding around the diagram
    const pad = 24;
    const cyclicExtra = cyclic ? CYCLIC_OFFSET + 40 : 0;

    // Calculate SVG dimensions
    let svgW: number, svgH: number;
    if (isH) {
      svgW = pad * 2 + steps.length * CARD_W + (steps.length - 1) * GAP_H;
      svgH = pad * 2 + CARD_H + cyclicExtra;
    } else {
      svgW = pad * 2 + CARD_W + cyclicExtra;
      svgH = pad * 2 + steps.length * CARD_H + (steps.length - 1) * GAP_V;
    }

    // Position each step card
    const positions: { x: number; y: number }[] = [];
    for (let i = 0; i < steps.length; i++) {
      if (isH) {
        let x = pad + i * (CARD_W + GAP_H);
        if (rtl) x = svgW - pad - CARD_W - i * (CARD_W + GAP_H);
        positions.push({ x, y: pad });
      } else {
        positions.push({ x: pad, y: pad + i * (CARD_H + GAP_V) });
      }
    }

    // Build marker def
    const markerId = 'arrowhead';
    const mW = MARKER_SIZE;
    const mH = MARKER_SIZE;
    const markerDef = `
      <defs>
        <marker id="${markerId}" markerWidth="${mW}" markerHeight="${mH}"
                refX="${mW}" refY="${mH / 2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${mW},${mH / 2} L0,${mH} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;

    // Build step cards
    let cardsHtml = '';
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      const p = positions[i];
      const borderColor = s.active ? s.color : 'var(--lv-border, #333)';
      const glowFilter = s.active ? ' filter="url(#glow)"' : '';

      cardsHtml += `
        <g class="step-group" style="transition-delay: ${i * 150}ms">
          <rect x="${p.x}" y="${p.y}" width="${CARD_W}" height="${CARD_H}"
                rx="${CARD_R}" ry="${CARD_R}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${borderColor}" stroke-width="${s.active ? 2.5 : 1.5}"
                ${glowFilter} />
          <text x="${p.x + CARD_W / 2}" y="${p.y + 30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${escapeHtml(s.icon)}
          </text>
          <text x="${p.x + CARD_W / 2}" y="${p.y + 54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${escapeHtml(s.label)}
          </text>
          <text x="${p.x + CARD_W / 2}" y="${p.y + 70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${escapeHtml(s.sub)}
          </text>
        </g>`;
    }

    // Build arrows between consecutive steps
    let arrowsHtml = '';
    for (let i = 0; i < steps.length - 1; i++) {
      const from = positions[i];
      const to = positions[i + 1];
      const delay = steps.length * 150 + i * 120;

      let d: string;
      if (isH) {
        // In LTR: arrow from right edge of card i → left edge of card i+1
        // In RTL: arrow from left edge of card i → right edge of card i+1
        //   (card i is to the RIGHT of card i+1 in RTL)
        const startX = rtl ? from.x : from.x + CARD_W;
        const endX = rtl ? to.x + CARD_W : to.x;
        const midY = from.y + CARD_H / 2;
        const gap = Math.abs(endX - startX);
        const cpOff = gap * 0.35;
        // Control points always push inward between the two endpoints
        const dirSign = endX > startX ? 1 : -1;
        d = `M${startX},${midY} C${startX + dirSign * cpOff},${midY} ${endX - dirSign * cpOff},${midY} ${endX},${midY}`;
      } else {
        // Arrow from bottom of card i to top of card i+1
        const midX = from.x + CARD_W / 2;
        const startY = from.y + CARD_H;
        const endY = to.y;
        const cpOffset = (endY - startY) * 0.4;
        d = `M${midX},${startY} C${midX},${startY + cpOffset} ${midX},${endY - cpOffset} ${midX},${endY}`;
      }

      // Estimate path length for dash animation
      const pathLen = isH ? Math.abs(positions[i + 1].x - positions[i].x) + 20 : GAP_V + CARD_H;

      arrowsHtml += `
        <path class="arrow-path" d="${d}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${ARROW_STROKE}"
              marker-end="url(#${markerId})"
              stroke-dasharray="${pathLen}"
              stroke-dashoffset="${pathLen}"
              style="transition-delay: ${delay}ms" />`;
    }

    // Cyclic return arrow
    if (cyclic && steps.length > 1) {
      const first = positions[0];
      const last = positions[steps.length - 1];
      const delay = steps.length * 150 + (steps.length - 1) * 120;

      let d: string;
      let pathLen: number;

      if (isH) {
        // Curved arrow below the cards: from bottom-center of last → bottom-center of first
        // In LTR: last is rightmost, first is leftmost — arrow curves below going left
        // In RTL: last is leftmost, first is rightmost — arrow curves below going right
        const startX = last.x + CARD_W / 2;
        const endX = first.x + CARD_W / 2;
        const startY = last.y + CARD_H;
        const endY = first.y + CARD_H;
        const bowY = Math.max(startY, endY) + CYCLIC_OFFSET;
        // Use two control points that pull the curve downward in a smooth arc
        d = `M${startX},${startY} C${startX},${bowY} ${endX},${bowY} ${endX},${endY}`;
        pathLen = Math.abs(startX - endX) + CYCLIC_OFFSET * 2;
      } else {
        // Curved arrow on the right side from last back to first
        const x = last.x + CARD_W;
        const startY = last.y + CARD_H / 2;
        const endY = first.y + CARD_H / 2;
        const bowX = x + CYCLIC_OFFSET;
        d = `M${x},${startY} C${bowX},${startY} ${bowX},${endY} ${x},${endY}`;
        pathLen = Math.abs(startY - endY) + CYCLIC_OFFSET * 2;
      }

      arrowsHtml += `
        <path class="arrow-path" d="${d}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${ARROW_STROKE}"
              marker-end="url(#${markerId})"
              stroke-dasharray="${pathLen}"
              stroke-dashoffset="${pathLen}"
              style="transition-delay: ${delay}ms" />`;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${svgW}" height="${svgH}"
           viewBox="0 0 ${svgW} ${svgH}"
           role="img" aria-label="Flow diagram">
        ${markerDef}
        ${arrowsHtml}
        ${cardsHtml}
      </svg>`;

    this.render(svg);
  }

  animateIn(instant?: boolean) {
    if (instant) {
      // Skip transitions, show everything immediately
      this.root.querySelectorAll('.step-group').forEach((g) => {
        (g as SVGGElement).style.transition = 'none';
        (g as SVGGElement).style.opacity = '1';
        (g as SVGGElement).style.transform = 'translateY(0)';
      });
      this.root.querySelectorAll('.arrow-path').forEach((p) => {
        (p as SVGPathElement).style.transition = 'none';
        (p as SVGPathElement).style.strokeDashoffset = '0';
      });
    }
    // Trigger CSS transitions via class
    this.classList.add('lv-entered');
  }
}

// Dummy element so the parser doesn't complain about unknown tags
class LvFlowStep extends HTMLElement {}

customElements.define('lv-flow', LvFlow);
customElements.define('lv-flow-step', LvFlowStep);

export { LvFlow, LvFlowStep };

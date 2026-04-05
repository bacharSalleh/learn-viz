import { LvBaseElement } from '../core/base-element.js';

/* ── Arabic numeral converter ── */
const ARABIC_DIGITS = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];

function toArabicNumeral(n: number): string {
  return String(n).split('').map(d => ARABIC_DIGITS[parseInt(d)] ?? d).join('');
}

/* ══════════════════════════════════════
   <lv-step>
   ══════════════════════════════════════ */

const stepCss = /* css */ `
  :host {
    display: none;
  }

  :host(.active) {
    display: block;
    animation: stepIn 0.35s ease both;
  }

  :host(.active.from-start) {
    animation-name: stepInFromStart;
  }

  :host(.active.from-end) {
    animation-name: stepInFromEnd;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: 12px;
  }

  @keyframes stepInFromEnd {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes stepInFromStart {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

class LvStep extends LvBaseElement {
  static get observedAttributes() {
    return ['title'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(stepCss);
    this._render();
  }

  handleAttributeChange() {
    if (this.root.querySelector('.title')) {
      this._render();
    }
  }

  private get _title(): string {
    return this.getAttribute('title') || '';
  }

  private _render() {
    this.render(`
      ${this._title ? `<div class="title">${this._title}</div>` : ''}
      <slot></slot>
    `);
  }
}

customElements.define('lv-step', LvStep);

/* ══════════════════════════════════════
   <lv-stepper>
   ══════════════════════════════════════ */

const stepperCss = /* css */ `
  :host {
    display: block;
  }

  .container {
    background: var(--lv-bg-card);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid var(--lv-border);
  }

  .steps {
    min-block-size: 60px;
  }

  .counter {
    text-align: center;
    color: var(--lv-text-dim);
    font-size: 0.85rem;
    margin-block-end: 16px;
    font-variant-numeric: tabular-nums;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-start: 20px;
    gap: 12px;
  }

  .btn {
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 8px;
    border: 2px solid var(--lv-accent);
    background: transparent;
    color: var(--lv-accent);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover:not(:disabled) {
    background: var(--lv-accent);
    color: var(--lv-bg-card);
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

class LvStepper extends LvBaseElement {
  private _current = 0;
  private _steps: Element[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(stepperCss);
    this._render();
    // Wait for children to be parsed and upgraded
    requestAnimationFrame(() => {
      this._steps = Array.from(this.querySelectorAll('lv-step'));
      this._showStep(0, null);
      this._bind();
    });
  }

  private get _total(): number {
    return this._steps.length;
  }

  private _render() {
    this.render(`
      <div class="container">
        <div class="counter"></div>
        <div class="steps">
          <slot></slot>
        </div>
        <div class="nav">
          <button class="btn prev">\u0627\u0644\u0633\u0627\u0628\u0642</button>
          <button class="btn next">\u0627\u0644\u062A\u0627\u0644\u064A</button>
        </div>
      </div>
    `);
  }

  private _bind() {
    const prevBtn = this.root.querySelector('.prev') as HTMLButtonElement;
    const nextBtn = this.root.querySelector('.next') as HTMLButtonElement;

    prevBtn.addEventListener('click', () => this._go(-1));
    nextBtn.addEventListener('click', () => this._go(1));

    this.addEventListener('keydown', (e: KeyboardEvent) => {
      // In RTL, ArrowRight = previous, ArrowLeft = next
      // In LTR, ArrowLeft = previous, ArrowRight = next
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this._go(this.isRtl ? -1 : 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this._go(this.isRtl ? 1 : -1);
      }
    });

    // Make element focusable for keyboard events
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  private _go(delta: number) {
    const next = this._current + delta;
    if (next < 0 || next >= this._total) return;
    const prev = this._current;
    this._current = next;
    this._showStep(next, delta > 0 ? 'forward' : 'backward');
    void prev; // consumed implicitly via _showStep
  }

  private _showStep(index: number, direction: 'forward' | 'backward' | null) {
    // Hide all steps, show active
    this._steps.forEach((step, i) => {
      step.classList.remove('active', 'from-start', 'from-end');
      if (i === index) {
        step.classList.add('active');
        if (direction === 'forward') {
          // Moving forward: slide in from the end side
          step.classList.add(this.isRtl ? 'from-start' : 'from-end');
        } else if (direction === 'backward') {
          // Moving backward: slide in from the start side
          step.classList.add(this.isRtl ? 'from-end' : 'from-start');
        }
      }
    });

    // Update counter
    const counter = this.root.querySelector('.counter');
    if (counter) {
      counter.textContent = `${toArabicNumeral(index + 1)} / ${toArabicNumeral(this._total)}`;
    }

    // Update button states
    const prevBtn = this.root.querySelector('.prev') as HTMLButtonElement | null;
    const nextBtn = this.root.querySelector('.next') as HTMLButtonElement | null;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === this._total - 1;
  }
}

customElements.define('lv-stepper', LvStepper);

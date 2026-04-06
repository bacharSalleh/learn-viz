import { LvBaseElement } from '../core/base-element.js';

/* ══════════════════════════════════════
   <lv-scrolly-step>
   ══════════════════════════════════════ */

const stepCss = /* css */ `
  :host {
    display: block;
    min-height: 80vh;
    padding: var(--lv-sp-8, 64px) var(--lv-sp-4, 16px);
    opacity: 0.3;
    transition: opacity 0.45s ease;
  }

  :host(.active) {
    opacity: 1;
  }
`;

class LvScrollyStep extends LvBaseElement {
  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(stepCss);
    this.render('<slot></slot>');
  }
}

customElements.define('lv-scrolly-step', LvScrollyStep);

/* ══════════════════════════════════════
   <lv-scrolly>
   ══════════════════════════════════════ */

const css = /* css */ `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .scrolly-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--lv-sp-4, 16px);
    align-items: start;
  }

  :host([sticky-side="right"]) .scrolly-grid {
    direction: ltr;
  }

  .viz-col {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .steps-col {
    position: relative;
  }

  /* When sticky-side is right, reorder columns */
  :host([sticky-side="right"]) .viz-col {
    order: 2;
  }

  :host([sticky-side="right"]) .steps-col {
    order: 1;
  }
`;

class LvScrolly extends LvBaseElement {
  private _observer: IntersectionObserver | null = null;
  private _steps: Element[] = [];

  static get observedAttributes() {
    return ['sticky-side'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
    requestAnimationFrame(() => this._setupObserver());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(_instant?: boolean) {
    // Nothing special — content is always visible
  }

  private _build(): void {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', 'Scrollable narrative');
    this.render(`
      <div class="scrolly-grid">
        <div class="viz-col"><slot name="viz"></slot></div>
        <div class="steps-col"><slot></slot></div>
      </div>
    `);
  }

  private _setupObserver(): void {
    this._steps = Array.from(this.querySelectorAll('lv-scrolly-step'));

    if (!this._steps.length) return;

    // Activate the first step by default
    this._steps[0].classList.add('active');
    this._steps[0].setAttribute('aria-current', 'step');
    this.setAttribute('data-active-step', '0');

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = this._steps.indexOf(entry.target);
            if (index === -1) return;

            // Update active states
            this._steps.forEach((s) => {
              s.classList.remove('active');
              s.removeAttribute('aria-current');
            });
            entry.target.classList.add('active');
            entry.target.setAttribute('aria-current', 'step');

            this.setAttribute('data-active-step', String(index));

            this.dispatchEvent(
              new CustomEvent('lv-scrolly-change', {
                detail: { step: index },
                bubbles: true,
                composed: true,
              })
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    this._steps.forEach((step) => this._observer!.observe(step));
  }
}

customElements.define('lv-scrolly', LvScrolly);
export { LvScrolly, LvScrollyStep };

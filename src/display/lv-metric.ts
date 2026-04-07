import { LvBaseElement } from '../core/base-element.js';
import { formatNum } from '../core/utils.js';

const css = `
  :host {
    display: block;
    text-align: center;
    background: var(--lv-bg-card, #1a1a2e);
    border-radius: var(--lv-r-md, 12px);
    padding: var(--lv-sp-5, 20px) var(--lv-sp-4, 16px);
    border: 1px solid var(--lv-border, #2a2a4a);
    overflow: visible;
  }

  .val {
    font-size: 2.6em;
    font-weight: 800;
    color: var(--_color, var(--lv-accent, #3b82f6));
    text-shadow: 0 0 12px var(--_glow, var(--lv-accent, rgba(59, 130, 246, 0.4)));
    line-height: 1.3;
    padding-block-start: 0.05em;
  }

  .label {
    font-size: 0.85em;
    color: var(--lv-text-dim, #888);
    margin-block-start: 0.35em;
  }
`;

const html = `
  <div class="val"></div>
  <div class="label"></div>
`;

class LvMetric extends LvBaseElement {
  static get observedAttributes() {
    return ['value', 'label', 'prefix', 'suffix', 'color', 'animated'];
  }

  private _observer: IntersectionObserver | null = null;
  private _animFrame: number | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animFrame !== null) { cancelAnimationFrame(this._animFrame); this._animFrame = null; }
    this._observer?.disconnect();
    this._observer = null;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.adoptStyles(css);
    this.render(html);
    this._update();
    this._setupObserver();
  }

  handleAttributeChange(_name: string, _old: string | null, _new: string | null) {
    if (this.root.querySelector('.val')) {
      this._update();
    }
  }

  private _update() {
    const color = this.getAttribute('color');
    if (color) {
      this.style.setProperty('--_color', color);
      this.style.setProperty('--_glow', color);
    }

    const labelEl = this.root.querySelector('.label') as HTMLElement;
    if (labelEl) {
      labelEl.textContent = this.getAttribute('label') || '';
    }

    const valEl = this.root.querySelector('.val') as HTMLElement;
    if (valEl) {
      const prefix = this.getAttribute('prefix') || '';
      const suffix = this.getAttribute('suffix') || '';
      const value = this.getAttribute('value') || '';
      valEl.textContent = prefix + value + suffix;
    }
  }

  private _setupObserver() {
    if (!this.hasAttribute('animated')) return;

    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animateIn(false);
            this._observer?.unobserve(this);
          }
        }
      },
      { threshold: 0.1 }
    );
    this._observer.observe(this);
  }

  animateIn(instant: boolean): void {
    if (!this.hasAttribute('animated') || instant) return;
    const target = parseFloat(this.getAttribute('value') || '0');
    if (isNaN(target)) return; // non-numeric like "142M", skip animation
    const duration = 1200;
    const start = performance.now();
    const valEl = this.root.querySelector('.val') as HTMLElement;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = target * eased;
      valEl.textContent = (this.getAttribute('prefix') || '') + formatNum(current) + (this.getAttribute('suffix') || '');
      if (t < 1) this._animFrame = requestAnimationFrame(tick);
    };
    this._animFrame = requestAnimationFrame(tick);
  }
}

customElements.define('lv-metric', LvMetric);

export { LvMetric };

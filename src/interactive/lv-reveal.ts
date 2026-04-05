import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 2px dashed var(--lv-accent2, var(--lv-accent));
    border-radius: 10px;
    color: var(--lv-accent2, var(--lv-accent));
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    background: transparent;
    transition: opacity 0.35s ease, max-block-size 0.4s ease, padding 0.4s ease, border-width 0.4s ease, margin 0.4s ease;
    max-block-size: 200px;
    overflow: hidden;
    animation: borderDash 8s linear infinite;
    background-image: repeating-linear-gradient(
      90deg,
      var(--lv-accent2, var(--lv-accent)) 0,
      var(--lv-accent2, var(--lv-accent)) 8px,
      transparent 8px,
      transparent 16px
    );
    background-size: 200% 2px;
    background-position-y: 0, 100%;
    background-repeat: repeat-x;
    /* Override to use the dashed border, the background is just for the animation */
    background-image: none;
    position: relative;
  }

  .trigger::before {
    content: '';
    position: absolute;
    inset: -2px;
    border: 2px dashed var(--lv-accent2, var(--lv-accent));
    border-radius: 10px;
    animation: rotateDash 4s linear infinite;
    pointer-events: none;
  }

  @keyframes rotateDash {
    0%   { stroke-dashoffset: 0; border-color: var(--lv-accent2, var(--lv-accent)); }
    50%  { border-color: color-mix(in srgb, var(--lv-accent2, var(--lv-accent)) 50%, transparent); }
    100% { border-color: var(--lv-accent2, var(--lv-accent)); }
  }

  .trigger:hover {
    background: color-mix(in srgb, var(--lv-accent2, var(--lv-accent)) 8%, transparent);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .trigger.hidden {
    opacity: 0;
    max-block-size: 0;
    padding: 0;
    border-width: 0;
    margin: 0;
    pointer-events: none;
  }

  .trigger.hidden::before {
    display: none;
  }

  .content {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
    pointer-events: none;
    max-block-size: 0;
    overflow: hidden;
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    max-block-size: none;
    overflow: visible;
  }
`;

class LvReveal extends LvBaseElement {
  private _revealed = false;

  static get observedAttributes() {
    return ['label', 'revealed'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
    this._attachListeners();

    if (this.hasAttribute('revealed')) {
      this._reveal(false);
    }
  }

  attributeChangedCallback(name: string) {
    if (name === 'revealed' && this.hasAttribute('revealed') && !this._revealed) {
      this._reveal(true);
    }
    if (name === 'label') {
      const trigger = this.root.querySelector('.trigger-label');
      if (trigger) trigger.textContent = this._label;
    }
  }

  private get _label(): string {
    return this.getAttribute('label') || '\u0627\u0636\u063A\u0637 \u0644\u0644\u0625\u0638\u0647\u0627\u0631';
  }

  private _render() {
    this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `);
  }

  private _attachListeners() {
    const trigger = this.root.querySelector('.trigger')!;

    trigger.addEventListener('click', () => this._reveal(true));
    trigger.addEventListener('keydown', (e: Event) => {
      const key = (e as KeyboardEvent).key;
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        this._reveal(true);
      }
    });
  }

  private _reveal(animate: boolean) {
    if (this._revealed) return;
    this._revealed = true;

    const trigger = this.root.querySelector('.trigger') as HTMLElement;
    const content = this.root.querySelector('.content') as HTMLElement;

    trigger.setAttribute('aria-expanded', 'true');

    if (animate) {
      trigger.classList.add('hidden');
      // Wait for trigger collapse then show content
      setTimeout(() => content.classList.add('visible'), 150);
    } else {
      trigger.classList.add('hidden');
      content.classList.add('visible');
    }
  }
}

customElements.define('lv-reveal', LvReveal);

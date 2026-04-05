import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    position: relative;
    align-items: start;
  }

  :host([vs]) .comparison {
    grid-template-columns: 1fr auto 1fr;
  }

  .vs-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    inline-size: 44px;
    block-size: 44px;
    border-radius: 50%;
    background: var(--lv-accent);
    color: var(--lv-bg);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .comparison {
      grid-template-columns: 1fr;
    }

    :host([vs]) .comparison {
      grid-template-columns: 1fr;
    }

    .vs-badge {
      justify-self: center;
    }
  }
`;

class LvComparison extends LvBaseElement {
  static get observedAttributes() {
    return ['vs'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
  }

  handleAttributeChange() {
    this._render();
  }

  private _render() {
    const vs = this.getAttribute('vs');
    const showBadge = vs !== null;
    const badgeText = vs || 'VS';

    if (showBadge) {
      // With VS badge: we need to manually slot children around the badge
      // Use named slots for left and right panels
      this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${badgeText}</div>
          <slot name="right"></slot>
        </div>
      `);
    } else {
      this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `);
    }
  }
}

customElements.define('lv-comparison', LvComparison);

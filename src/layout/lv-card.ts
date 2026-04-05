import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .card {
    background: var(--lv-bg-card, #1a1a2e);
    border: 1px solid var(--lv-border, #2a2a4a);
    border-radius: var(--lv-r-lg, 12px);
    padding: var(--lv-sp-6, 24px);
    transition: border-color 0.2s ease;
  }

  .card:hover {
    border-color: var(--lv-accent);
  }

  /* glow variant */
  :host([variant="glow"]) .card {
    border-color: var(--lv-accent);
    box-shadow: 0 0 20px color-mix(in srgb, var(--lv-accent) 25%, transparent);
  }

  /* flush variant — no padding, for embedded charts */
  :host([variant="flush"]) .card {
    padding: 0;
    overflow: hidden;
  }

  /* outline variant — transparent bg */
  :host([variant="outline"]) .card {
    background: transparent;
    border-style: solid;
  }

  /* accent border on inline-start */
  :host([accent]) .card {
    border-inline-start: 3px solid var(--lv-accent2, #7b68ee);
    background: var(--lv-bg-raised, #12122a);
  }
`;

class LvCard extends LvBaseElement {
  static get observedAttributes() {
    return ['variant'];
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
    if (!this.root.querySelector('.card')) {
      this.render(`<div class="card"><slot></slot></div>`);
    }
  }
}

customElements.define('lv-card', LvCard);

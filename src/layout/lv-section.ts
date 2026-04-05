import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
    margin-block: 60px;
  }

  h2 {
    margin: 0 0 24px 0;
    font-size: 1.6rem;
    color: var(--lv-accent);
    border-inline-start: 4px solid var(--lv-accent2);
    padding-inline-start: 16px;
    font-weight: 600;
  }
`;

class LvSection extends LvBaseElement {
  static get observedAttributes() {
    return ['title'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  private _render() {
    const title = this.getAttribute('title') || '';
    this.render(`
      ${title ? `<h2>${title}</h2>` : ''}
      <slot></slot>
    `);
  }
}

customElements.define('lv-section', LvSection);

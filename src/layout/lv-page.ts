import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
    font-family: var(--lv-font);
    background: var(--lv-bg);
    color: var(--lv-text);
    line-height: var(--lv-lh);
    min-block-size: 100vh;
  }

  :host([theme="dark"]) {
    color-scheme: dark;
  }

  :host([theme="light"]) {
    color-scheme: light;
  }
`;

class LvPage extends LvBaseElement {
  static get observedAttributes() {
    return ['theme', 'dir'];
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
    const dir = this.getAttribute('dir') || 'ltr';
    this.setAttribute('dir', dir);
    this.render(`<slot></slot>`);
  }
}

customElements.define('lv-page', LvPage);

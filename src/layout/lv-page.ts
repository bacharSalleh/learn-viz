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

  :host([theme="cyberpunk"]) { color-scheme: dark; }
  :host([theme="academic"])  { color-scheme: dark; }
  :host([theme="forest"])    { color-scheme: dark; }
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

  handleAttributeChange() {
    this._render();
  }

  private _render() {
    const dir = this.getAttribute('dir') || 'ltr';
    this.setAttribute('dir', dir);
    const theme = this.getAttribute('theme') || 'dark';
    this.setAttribute('data-theme', theme);
    this.render(`<slot></slot>`);
  }
}

customElements.define('lv-page', LvPage);

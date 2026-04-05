import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 2), 1fr);
    gap: var(--gap, 24px);
  }

  /* Gap sizes */
  :host([gap="sm"]) .grid { --gap: 12px; }
  :host([gap="md"]) .grid { --gap: 24px; }
  :host([gap="lg"]) .grid { --gap: 40px; }

  /* Column counts */
  :host([cols="2"]) .grid { --cols: 2; }
  :host([cols="3"]) .grid { --cols: 3; }
  :host([cols="4"]) .grid { --cols: 4; }
  :host([cols="auto"]) .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

class LvGrid extends LvBaseElement {
  static get observedAttributes() {
    return ['cols', 'gap'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
  }

  handleAttributeChange() {
    if (!this.root.querySelector('.grid')) {
      this._render();
    }
  }

  private _render() {
    this.render(`<div class="grid"><slot></slot></div>`);
  }
}

customElements.define('lv-grid', LvGrid);

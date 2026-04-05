import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
    position: relative;
    text-align: center;
    padding-block: 80px 60px;
    overflow: hidden;
  }

  .number {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    font-weight: 900;
    opacity: 0.08;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h1 {
    margin: 0;
    font-size: 2.4rem;
    color: var(--lv-accent);
    font-weight: 700;
  }

  .subtitle {
    margin-block-start: 12px;
    font-size: 1.1rem;
    color: var(--lv-dim);
  }
`;

class LvHero extends LvBaseElement {
  static get observedAttributes() {
    return ['number', 'title', 'subtitle', 'gradient'];
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
    const number = this.getAttribute('number') || '';
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const gradient = this.getAttribute('gradient') || '';

    const gradientStyle = gradient ? `background: ${gradient};` : '';

    this.render(`
      <div class="hero" style="${gradientStyle}">
        ${number ? `<div class="number">${number}</div>` : ''}
        <div class="content">
          <h1>${title}</h1>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
        </div>
      </div>
    `);
  }
}

customElements.define('lv-hero', LvHero);

import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
    border-block-start: 1px solid var(--lv-border);
    padding-block-start: 32px;
    margin-block-start: 60px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 16px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--lv-accent);
    border: 1px solid var(--lv-accent);
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
  }

  a:hover {
    background: var(--lv-accent);
    color: var(--lv-bg);
  }

  .prev { margin-inline-end: auto; }
  .next { margin-inline-start: auto; }

  .arrow {
    font-size: 1.2em;
    line-height: 1;
  }

  /* Empty state: hide missing links */
  a[href=""] {
    display: none;
  }
`;

class LvNav extends LvBaseElement {
  static get observedAttributes() {
    return ['prev', 'prev-label', 'next', 'next-label'];
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
    const prev = this.getAttribute('prev') || '';
    const prevLabel = this.getAttribute('prev-label') || 'Previous';
    const next = this.getAttribute('next') || '';
    const nextLabel = this.getAttribute('next-label') || 'Next';
    const rtl = this.isRtl;

    const prevArrow = rtl ? '\u2192' : '\u2190';
    const nextArrow = rtl ? '\u2190' : '\u2192';

    this.render(`
      <nav class="nav">
        <a class="prev" href="${prev}">
          <span class="arrow">${prevArrow}</span>
          ${prevLabel}
        </a>
        <a class="next" href="${next}">
          ${nextLabel}
          <span class="arrow">${nextArrow}</span>
        </a>
      </nav>
    `);
  }
}

customElements.define('lv-nav', LvNav);

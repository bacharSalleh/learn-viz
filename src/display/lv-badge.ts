import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding-block: 2px;
    padding-inline: 12px;
    border-radius: 9999px;
    font-size: 0.75em;
    font-weight: 600;
    line-height: 1.6;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  :host([variant="filled"]) .badge,
  :host(:not([variant])) .badge {
    background: var(--_color, var(--lv-accent, #3b82f6));
    color: var(--lv-badge-text, #fff);
    border: 1px solid transparent;
  }

  :host([variant="outline"]) .badge {
    background: transparent;
    color: var(--_color, var(--lv-accent, #3b82f6));
    border: 1px solid var(--_color, var(--lv-accent, #3b82f6));
  }
`;

const html = `
  <span class="badge"><slot></slot></span>
`;

class LvBadge extends LvBaseElement {
  static get observedAttributes() {
    return ['color', 'variant'];
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.adoptStyles(css);
    this.render(html);
    this._updateColor();
  }

  attributeChangedCallback(_name: string, _old: string | null, _new: string | null) {
    if (_name === 'color') {
      this._updateColor();
    }
  }

  private _updateColor() {
    const color = this.getAttribute('color');
    if (color) {
      this.style.setProperty('--_color', color);
    } else {
      this.style.removeProperty('--_color');
    }
  }
}

customElements.define('lv-badge', LvBadge);

export { LvBadge };

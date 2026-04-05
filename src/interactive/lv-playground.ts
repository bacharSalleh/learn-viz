import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 24px;
  }

  .output {
    min-inline-size: 0;
    order: 0;
  }

  .controls {
    order: 1;
    background: var(--lv-bg-raised);
    padding: 20px;
    border-radius: 12px;
    border-inline-start: 2px solid var(--lv-border);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* Responsive: stack on mobile */
  @media (max-width: 640px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .controls {
      order: -1;
      border-inline-start: none;
      border-block-end: 2px solid var(--lv-border);
    }
  }
`;

class LvPlayground extends LvBaseElement {
  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
    this._bind();
  }

  private _render() {
    this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `);
  }

  private _bind() {
    this.addEventListener('lv-change', () => {
      const params = this._collectParams();
      this.dispatchEvent(new CustomEvent('lv-params-change', {
        bubbles: true,
        composed: true,
        detail: params,
      }));
    });
  }

  private _collectParams(): Record<string, number> {
    const sliders = this.querySelectorAll('lv-slider[slot="controls"]');
    const params: Record<string, number> = {};
    sliders.forEach((slider) => {
      const name = slider.getAttribute('name');
      if (name) {
        const input = (slider as any).root?.querySelector('input') as HTMLInputElement | null;
        const value = input
          ? parseFloat(input.value)
          : parseFloat(slider.getAttribute('value') || '0');
        params[name] = value;
      }
    });
    return params;
  }
}

customElements.define('lv-playground', LvPlayground);

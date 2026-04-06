import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: inline;
  }
`;

/** Inject global highlight styles once into document head */
let _styleInjected = false;
function injectGlobalStyle(): void {
  if (_styleInjected) return;
  _styleInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    .lv-link-active {
      background-color: color-mix(in srgb, var(--lv-accent, #3b82f6) 20%, transparent);
      border-bottom: 2px solid var(--lv-accent, #3b82f6);
      border-radius: 2px;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }
  `;
  document.head.appendChild(style);
}

/** Registry of all lv-linked-highlight instances by group */
const groupRegistry = new Map<string, Set<LvLinkedHighlight>>();

class LvLinkedHighlight extends LvBaseElement {
  private _group = 'default';

  static get observedAttributes() {
    return ['group'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    injectGlobalStyle();
    this.render('<slot></slot>');

    this._group = this.getAttribute('group') || 'default';
    this._register();
    this._attachSlotListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unregister();
  }

  handleAttributeChange(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'group') {
      this._unregister();
      this._group = newValue || 'default';
      this._register();
    }
  }

  animateIn(_instant?: boolean) {}

  private _register(): void {
    if (!groupRegistry.has(this._group)) {
      groupRegistry.set(this._group, new Set());
    }
    groupRegistry.get(this._group)!.add(this);
  }

  private _unregister(): void {
    const set = groupRegistry.get(this._group);
    if (set) {
      set.delete(this);
      if (set.size === 0) groupRegistry.delete(this._group);
    }
  }

  private _attachSlotListeners(): void {
    const slot = this.root.querySelector('slot');
    if (!slot) return;

    const bind = () => {
      // Use event delegation on the host element (light DOM)
      this.addEventListener('mouseover', this._onMouseOver);
      this.addEventListener('mouseout', this._onMouseOut);
    };

    // Bind immediately and also on slot change
    bind();
    slot.addEventListener('slotchange', bind);
  }

  private _onMouseOver = (e: Event): void => {
    const target = (e.target as HTMLElement).closest?.('[data-link]');
    if (!target) return;
    const linkId = target.getAttribute('data-link');
    if (!linkId) return;

    this._highlightAll(linkId, true);
  };

  private _onMouseOut = (e: Event): void => {
    const target = (e.target as HTMLElement).closest?.('[data-link]');
    if (!target) return;
    const linkId = target.getAttribute('data-link');
    if (!linkId) return;

    this._highlightAll(linkId, false);
  };

  private _highlightAll(linkId: string, active: boolean): void {
    const instances = groupRegistry.get(this._group);
    if (!instances) return;

    instances.forEach((inst) => {
      const elements = inst.querySelectorAll(`[data-link="${CSS.escape(linkId)}"]`);
      elements.forEach((el) => {
        if (active) {
          el.classList.add('lv-link-active');
        } else {
          el.classList.remove('lv-link-active');
        }
      });
    });
  }
}

customElements.define('lv-linked-highlight', LvLinkedHighlight);
export { LvLinkedHighlight };

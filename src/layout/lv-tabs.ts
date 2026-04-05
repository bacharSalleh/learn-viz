import { LvBaseElement } from '../core/base-element.js';

/* ── lv-tab ── */

const tabCss = /* css */ `
  :host {
    display: none;
  }
  :host([active]) {
    display: block;
    animation: fadeIn 0.25s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

class LvTab extends LvBaseElement {
  static get observedAttributes() {
    return ['label', 'active'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(tabCss);
    this.render(`<slot></slot>`);
    this.setAttribute('role', 'tabpanel');
  }

  attributeChangedCallback() {
    // visibility handled by :host([active]) CSS
  }
}

customElements.define('lv-tab', LvTab);

/* ── lv-tabs ── */

const tabsCss = /* css */ `
  :host {
    display: block;
  }

  .tablist {
    display: flex;
    gap: 0;
    border-block-end: 2px solid var(--lv-border);
    margin-block-end: 16px;
    overflow-x: auto;
  }

  .tab-btn {
    background: none;
    border: none;
    color: var(--lv-dim);
    font-family: inherit;
    font-size: 0.95rem;
    padding: 10px 20px;
    cursor: pointer;
    border-block-end: 2px solid transparent;
    margin-block-end: -2px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }

  .tab-btn:hover {
    color: var(--lv-text);
  }

  .tab-btn[aria-selected="true"] {
    color: var(--lv-accent);
    border-block-end-color: var(--lv-accent);
    font-weight: 600;
  }

  .tab-btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: -2px;
    border-radius: 4px;
  }

  .panels {
    display: block;
  }
`;

class LvTabs extends LvBaseElement {
  private _tabs: LvTab[] = [];
  private _buttons: HTMLButtonElement[] = [];
  private _activeIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(tabsCss);
    // Wait a tick for child lv-tab elements to be parsed
    requestAnimationFrame(() => this._setup());
  }

  private _setup() {
    this._tabs = Array.from(this.querySelectorAll('lv-tab')) as LvTab[];
    if (this._tabs.length === 0) return;

    // Determine initial active index
    const initialActive = this._tabs.findIndex(t => t.hasAttribute('active'));
    this._activeIndex = initialActive >= 0 ? initialActive : 0;

    // Build tab buttons
    const tablistHtml = this._tabs.map((tab, i) => {
      const label = tab.getAttribute('label') || `Tab ${i + 1}`;
      const selected = i === this._activeIndex;
      return `<button
        class="tab-btn"
        role="tab"
        aria-selected="${selected}"
        tabindex="${selected ? '0' : '-1'}"
        data-index="${i}"
      >${label}</button>`;
    }).join('');

    this.render(`
      <div class="tablist" role="tablist">${tablistHtml}</div>
      <div class="panels"><slot></slot></div>
    `);

    this._buttons = Array.from(this.root.querySelectorAll('.tab-btn'));

    // Set initial active states
    this._activate(this._activeIndex);

    // Event listeners
    const tablist = this.root.querySelector('.tablist')!;
    tablist.addEventListener('click', (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.tab-btn') as HTMLButtonElement | null;
      if (!btn) return;
      this._activate(Number(btn.dataset.index));
    });

    tablist.addEventListener('keydown', ((e: KeyboardEvent) => {
      const len = this._buttons.length;
      let idx = this._activeIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          idx = (idx + 1) % len;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          idx = (idx - 1 + len) % len;
          break;
        case 'Home':
          e.preventDefault();
          idx = 0;
          break;
        case 'End':
          e.preventDefault();
          idx = len - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this._activate(idx);
          return;
        default:
          return;
      }

      this._buttons[idx].focus();
      this._activate(idx);
    }) as EventListener);
  }

  private _activate(index: number) {
    this._activeIndex = index;

    this._buttons.forEach((btn, i) => {
      const selected = i === index;
      btn.setAttribute('aria-selected', String(selected));
      btn.setAttribute('tabindex', selected ? '0' : '-1');
    });

    this._tabs.forEach((tab, i) => {
      if (i === index) {
        tab.setAttribute('active', '');
      } else {
        tab.removeAttribute('active');
      }
    });
  }
}

customElements.define('lv-tabs', LvTabs);

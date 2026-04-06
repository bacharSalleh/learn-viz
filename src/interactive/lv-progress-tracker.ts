import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .pt-container { max-width: 500px; }

  .header { margin-bottom: var(--lv-sp-3); }
  .pct-text { font-size: 14px; font-weight: 600; color: var(--lv-text); margin-bottom: 6px; }
  .progress-bar { width: 100%; height: 8px; background: var(--lv-bg-raised); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--lv-accent); border-radius: 4px; transition: width 0.4s ease; }

  .checklist { list-style: none; margin: 0; padding: 0; }
  .checklist li {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 0; border-bottom: 1px solid var(--lv-border);
    font-size: 14px; color: var(--lv-text);
    cursor: pointer; transition: opacity 0.2s;
  }
  .checklist li:last-child { border-bottom: none; }
  .checklist li:hover { opacity: 0.85; }
  .checklist li.done .label { text-decoration: line-through; color: var(--lv-text-dim); }

  .check-icon {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--lv-border);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    font-size: 12px;
  }
  .checklist li.done .check-icon {
    background: var(--lv-positive, #22c55e);
    border-color: var(--lv-positive, #22c55e);
    color: #fff;
  }
  .label { flex: 1; }
`;

interface Section { id: string; label: string; }

class LvProgressTracker extends LvBaseElement {
  private _hasAnimated = false;
  private _sections: Section[] = [];
  private _completed: Set<string> = new Set();
  private _storageKey = 'lv-progress';

  static get observedAttributes() {
    return ['sections', 'persist', 'key'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();

    // Listen for external completion events
    this._boundHandler = this._handleExternalComplete.bind(this);
    document.addEventListener('lv-section-complete', this._boundHandler as EventListener);
  }

  private _boundHandler: ((e: Event) => void) | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundHandler) {
      document.removeEventListener('lv-section-complete', this._boundHandler as EventListener);
    }
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;
    const c = this.root.querySelector('.pt-container') as HTMLElement;
    if (c) {
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.4s ease-out';
      requestAnimationFrame(() => { c.style.opacity = '1'; });
    }
  }

  /** Public API: mark a section as complete */
  complete(id: string): void {
    this._markComplete(id);
  }

  private _build(): void {
    this._sections = this.jsonAttr<Section[]>('sections', []);
    this._storageKey = this.getAttribute('key') || 'lv-progress';
    this._completed = new Set();

    // Load persisted state
    if (this.hasAttribute('persist')) {
      try {
        const stored = localStorage.getItem(this._storageKey);
        if (stored) {
          const arr: string[] = JSON.parse(stored);
          arr.forEach(id => this._completed.add(id));
        }
      } catch { /* ignore */ }
    }

    this._renderView();
  }

  private _handleExternalComplete(e: Event): void {
    const ce = e as CustomEvent;
    if (ce.detail?.id) {
      this._markComplete(ce.detail.id);
    }
  }

  private _markComplete(id: string): void {
    if (this._completed.has(id)) return;
    this._completed.add(id);

    // Persist
    if (this.hasAttribute('persist')) {
      try { localStorage.setItem(this._storageKey, JSON.stringify([...this._completed])); } catch { /* ignore */ }
    }

    // Dispatch update event
    this._dispatchUpdate();
    this._renderView();
  }

  private _toggle(id: string): void {
    if (this._completed.has(id)) {
      this._completed.delete(id);
    } else {
      this._completed.add(id);
    }

    if (this.hasAttribute('persist')) {
      try { localStorage.setItem(this._storageKey, JSON.stringify([...this._completed])); } catch { /* ignore */ }
    }

    this._dispatchUpdate();
    this._renderView();
  }

  private _dispatchUpdate(): void {
    const total = this._sections.length;
    const completed = [...this._completed];
    const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
    this.dispatchEvent(new CustomEvent('lv-progress-update', {
      detail: { completed, total, percent },
      bubbles: true, composed: true,
    }));
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private _renderView(): void {
    const total = this._sections.length;
    const done = this._sections.filter(s => this._completed.has(s.id)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const items = this._sections.map(s => {
      const isDone = this._completed.has(s.id);
      return `<li class="${isDone ? 'done' : ''}" data-id="${this._esc(s.id)}">
        <span class="check-icon">${isDone ? '\u2713' : ''}</span>
        <span class="label">${this._esc(s.label)}</span>
      </li>`;
    }).join('');

    this.render(`<div class="pt-container">
      <div class="header">
        <div class="pct-text">${pct}% Complete (${done}/${total})</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <ul class="checklist">${items}</ul>
    </div>`);

    // Attach click handlers
    this.root.querySelectorAll('.checklist li').forEach(li => {
      li.addEventListener('click', () => {
        const id = (li as HTMLElement).dataset.id;
        if (id) this._toggle(id);
      });
    });
  }
}

customElements.define('lv-progress-tracker', LvProgressTracker);
export { LvProgressTracker };

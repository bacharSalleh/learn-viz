import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .label {
    font-family: var(--lv-font);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: var(--lv-sp-3, 12px);
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-block-end: var(--lv-sp-4, 16px);
    position: relative;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.95rem;
    cursor: grab;
    user-select: none;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
    outline: none;
    position: relative;
  }

  .item:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .item:hover {
    border-color: var(--lv-accent);
  }

  .item.dragging {
    opacity: 0.4;
  }

  .item.correct {
    border-color: var(--lv-positive, #22c55e);
    background: color-mix(in srgb, var(--lv-positive, #22c55e) 10%, var(--lv-bg-card));
  }

  .item.incorrect {
    border-color: var(--lv-negative, #ef4444);
    background: color-mix(in srgb, var(--lv-negative, #ef4444) 10%, var(--lv-bg-card));
  }

  .handle {
    color: var(--lv-text-dim);
    font-size: 1.2rem;
    line-height: 1;
    flex-shrink: 0;
    cursor: grab;
  }

  .status-icon {
    margin-inline-start: auto;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .item-text {
    flex: 1;
  }

  .clone {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transform: rotate(2deg);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-accent);
    border-radius: var(--lv-r-md, 8px);
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.95rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }

  .gap-indicator {
    height: 4px;
    background: var(--lv-accent);
    border-radius: 2px;
    transition: all 0.15s ease;
  }

  .btn {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 24px;
    border-radius: var(--lv-r-md, 8px);
    border: 2px solid var(--lv-accent);
    background: var(--lv-accent);
    color: var(--lv-bg-card);
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }
`;

class LvDragSort extends LvBaseElement {
  private _order: string[] = [];
  private _dragIndex = -1;
  private _clone: HTMLElement | null = null;
  private _checked = false;

  // Bound handlers for cleanup
  private _onPointerMove: ((e: PointerEvent) => void) | null = null;
  private _onPointerUp: ((e: PointerEvent) => void) | null = null;

  static get observedAttributes() {
    return ['items', 'correct', 'label', 'submit-label'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupDrag();
  }

  handleAttributeChange() {
    if (this.isConnected && !this._checked) this._build();
  }

  animateIn(_instant?: boolean) {
    // Items fade in via CSS
  }

  private _build(): void {
    const items: string[] = this.jsonAttr('items', []);
    const label = this.getAttribute('label') || 'Drag to reorder:';
    const submitLabel = this.getAttribute('submit-label') || 'Check';

    if (!this._order.length || this._order.length !== items.length) {
      this._order = [...items];
    }
    this._checked = false;

    const itemsHtml = this._order
      .map(
        (item, i) => `
      <div class="item" draggable="false" tabindex="0" data-index="${i}" role="option" aria-grabbed="false">
        <span class="handle" aria-hidden="true">\u2261</span>
        <span class="item-text">${this._esc(item)}</span>
        <span class="status-icon"></span>
      </div>
    `
      )
      .join('');

    this.render(`
      <div class="label" id="sort-label">${this._esc(label)}</div>
      <div class="item-list" role="listbox" aria-labelledby="sort-label">${itemsHtml}</div>
      <button class="btn submit-btn">${this._esc(submitLabel)}</button>
    `);

    this._attachListeners();
  }

  private _attachListeners(): void {
    const items = this.root.querySelectorAll('.item');

    items.forEach((el) => {
      // Pointer events (handles both mouse and touch)
      el.addEventListener('pointerdown', (e: Event) => {
        this._startDrag(el as HTMLElement, e as PointerEvent);
      });

      // Keyboard navigation
      el.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        const idx = parseInt((el as HTMLElement).dataset.index || '0', 10);
        if (ke.key === 'ArrowUp' && idx > 0) {
          ke.preventDefault();
          this._swap(idx, idx - 1);
          this._buildItems();
          requestAnimationFrame(() => {
            const newItem = this.root.querySelector(`[data-index="${idx - 1}"]`) as HTMLElement;
            newItem?.focus();
          });
        } else if (ke.key === 'ArrowDown' && idx < this._order.length - 1) {
          ke.preventDefault();
          this._swap(idx, idx + 1);
          this._buildItems();
          requestAnimationFrame(() => {
            const newItem = this.root.querySelector(`[data-index="${idx + 1}"]`) as HTMLElement;
            newItem?.focus();
          });
        }
      });
    });

    const submitBtn = this.root.querySelector('.submit-btn');
    submitBtn?.addEventListener('click', () => this._check());
  }

  private _startDrag(el: HTMLElement, e: PointerEvent): void {
    if (this._checked) return;
    e.preventDefault();
    const idx = parseInt(el.dataset.index || '0', 10);
    this._dragIndex = idx;
    el.classList.add('dragging');

    // Create floating clone
    const clone = document.createElement('div');
    clone.className = 'clone';
    clone.textContent = this._order[idx];
    clone.style.left = `${e.clientX - 50}px`;
    clone.style.top = `${e.clientY - 20}px`;
    this.root.appendChild(clone);
    this._clone = clone;

    this._onPointerMove = (ev: PointerEvent) => {
      if (!this._clone) return;
      this._clone.style.left = `${ev.clientX - 50}px`;
      this._clone.style.top = `${ev.clientY - 20}px`;

      // Find which item we're hovering over
      const allItems = Array.from(this.root.querySelectorAll('.item')) as HTMLElement[];
      let targetIdx = -1;
      for (let i = 0; i < allItems.length; i++) {
        const rect = allItems[i].getBoundingClientRect();
        if (ev.clientY >= rect.top && ev.clientY <= rect.bottom) {
          targetIdx = i;
          break;
        }
      }

      if (targetIdx !== -1 && targetIdx !== this._dragIndex) {
        this._swap(this._dragIndex, targetIdx);
        this._dragIndex = targetIdx;
        this._buildItems();
        // Re-mark the dragging item
        const newEl = this.root.querySelector(`[data-index="${targetIdx}"]`);
        newEl?.classList.add('dragging');
      }
    };

    this._onPointerUp = (_ev: PointerEvent) => {
      this._cleanupDrag();
      this._buildItems();
    };

    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
  }

  private _cleanupDrag(): void {
    if (this._clone) {
      this._clone.remove();
      this._clone = null;
    }
    if (this._onPointerMove) {
      document.removeEventListener('pointermove', this._onPointerMove);
      this._onPointerMove = null;
    }
    if (this._onPointerUp) {
      document.removeEventListener('pointerup', this._onPointerUp);
      this._onPointerUp = null;
    }
    this._dragIndex = -1;
    const dragging = this.root.querySelector('.dragging');
    dragging?.classList.remove('dragging');
  }

  private _swap(a: number, b: number): void {
    const temp = this._order[a];
    this._order[a] = this._order[b];
    this._order[b] = temp;
  }

  private _buildItems(): void {
    const list = this.root.querySelector('.item-list');
    if (!list) return;

    list.innerHTML = this._order
      .map(
        (item, i) => `
      <div class="item" draggable="false" tabindex="0" data-index="${i}" role="option" aria-grabbed="false">
        <span class="handle" aria-hidden="true">\u2261</span>
        <span class="item-text">${this._esc(item)}</span>
        <span class="status-icon"></span>
      </div>
    `
      )
      .join('');

    // Re-attach per-item listeners
    const items = list.querySelectorAll('.item');
    items.forEach((el) => {
      el.addEventListener('pointerdown', (e: Event) => {
        this._startDrag(el as HTMLElement, e as PointerEvent);
      });
      el.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        const idx = parseInt((el as HTMLElement).dataset.index || '0', 10);
        if (ke.key === 'ArrowUp' && idx > 0) {
          ke.preventDefault();
          this._swap(idx, idx - 1);
          this._buildItems();
          requestAnimationFrame(() => {
            const newItem = this.root.querySelector(`[data-index="${idx - 1}"]`) as HTMLElement;
            newItem?.focus();
          });
        } else if (ke.key === 'ArrowDown' && idx < this._order.length - 1) {
          ke.preventDefault();
          this._swap(idx, idx + 1);
          this._buildItems();
          requestAnimationFrame(() => {
            const newItem = this.root.querySelector(`[data-index="${idx + 1}"]`) as HTMLElement;
            newItem?.focus();
          });
        }
      });
    });
  }

  private _check(): void {
    const correct: string[] = this.jsonAttr('correct', []);
    this._checked = true;

    const items = this.root.querySelectorAll('.item');
    let allCorrect = true;

    items.forEach((el, i) => {
      const icon = el.querySelector('.status-icon') as HTMLElement;
      if (this._order[i] === correct[i]) {
        el.classList.add('correct');
        if (icon) icon.textContent = '\u2713';
      } else {
        el.classList.add('incorrect');
        if (icon) icon.textContent = '\u2717';
        allCorrect = false;
      }
    });

    this.dispatchEvent(
      new CustomEvent('lv-sort-check', {
        detail: { correct: allCorrect, order: [...this._order] },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-drag-sort', LvDragSort);
export { LvDragSort };

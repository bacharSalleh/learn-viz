import { LvBaseElement } from '../core/base-element.js';

const BUCKET_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

interface ClassifyItem {
  text: string;
  category: string;
}

const css = /* css */ `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .pool-label {
    font-family: var(--lv-font);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--lv-text-dim);
    margin-block-end: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .pool {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 48px;
    padding: 12px;
    background: var(--lv-bg-raised);
    border-radius: var(--lv-r-md, 8px);
    border: 2px dashed var(--lv-border);
    margin-block-end: var(--lv-sp-4, 16px);
    transition: border-color 0.2s ease;
  }

  .pool.empty-hint::after {
    content: 'All items placed!';
    color: var(--lv-text-dim);
    font-family: var(--lv-font);
    font-size: 0.85rem;
    font-style: italic;
  }

  .buckets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lv-sp-3, 12px);
    margin-block-end: var(--lv-sp-4, 16px);
  }

  .bucket {
    flex: 1;
    min-width: 160px;
    min-height: 120px;
    border: 2px dashed var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    padding: 12px;
    background: var(--lv-bg-card);
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .bucket.drag-over {
    border-style: solid;
    background: color-mix(in srgb, var(--lv-accent) 8%, var(--lv-bg-card));
  }

  .bucket-header {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--lv-text);
    padding-block-end: 8px;
    margin-block-end: 8px;
    border-block-end: 3px solid var(--lv-border);
  }

  .bucket-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 32px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-border);
    border-radius: 6px;
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.9rem;
    cursor: grab;
    user-select: none;
    transition: border-color 0.2s ease, background 0.2s ease, opacity 0.15s ease;
    position: relative;
  }

  .chip:hover {
    border-color: var(--lv-accent);
  }

  .chip.dragging {
    opacity: 0.35;
  }

  .chip.correct {
    border-color: var(--lv-positive, #22c55e);
    background: color-mix(in srgb, var(--lv-positive, #22c55e) 10%, var(--lv-bg-card));
  }

  .chip.incorrect {
    border-color: var(--lv-negative, #ef4444);
    background: color-mix(in srgb, var(--lv-negative, #ef4444) 10%, var(--lv-bg-card));
  }

  .chip .tooltip {
    display: none;
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--lv-text);
    color: var(--lv-bg);
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }

  .chip.incorrect .tooltip.has-text {
    display: block;
  }

  .clone {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transform: rotate(2deg);
    padding: 8px 14px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-accent);
    border-radius: 6px;
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
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

interface Placement {
  text: string;
  category: string;  // correct category
  bucket: string | null;  // placed bucket name, null = pool
}

class LvDragClassify extends LvBaseElement {
  private _placements: Placement[] = [];
  private _categories: string[] = [];
  private _dragIdx = -1;
  private _clone: HTMLElement | null = null;
  private _checked = false;

  private _onPointerMove: ((e: PointerEvent) => void) | null = null;
  private _onPointerUp: ((e: PointerEvent) => void) | null = null;

  static get observedAttributes() {
    return ['items', 'categories', 'submit-label'];
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

  animateIn(_instant?: boolean) {}

  private _build(): void {
    const items: ClassifyItem[] = this.jsonAttr('items', []);
    this._categories = this.jsonAttr('categories', []);
    const submitLabel = this.getAttribute('submit-label') || 'Check';

    if (!this._placements.length || this._placements.length !== items.length) {
      this._placements = items.map((it) => ({
        text: it.text,
        category: it.category,
        bucket: null,
      }));
    }

    this._renderInner(submitLabel);
  }

  private _renderInner(submitLabel: string): void {
    const poolItems = this._placements.filter((p) => p.bucket === null);
    const emptyClass = poolItems.length === 0 ? ' empty-hint' : '';

    const poolHtml = poolItems
      .map((p) => {
        const idx = this._placements.indexOf(p);
        return `<div class="chip" role="option" data-idx="${idx}">${this._esc(p.text)}<span class="tooltip"></span></div>`;
      })
      .join('');

    const bucketsHtml = this._categories
      .map((cat, ci) => {
        const color = BUCKET_COLORS[ci % BUCKET_COLORS.length];
        const bucketItems = this._placements.filter((p) => p.bucket === cat);
        const itemsHtml = bucketItems
          .map((p) => {
            const idx = this._placements.indexOf(p);
            return `<div class="chip" role="option" data-idx="${idx}">${this._esc(p.text)}<span class="tooltip"></span></div>`;
          })
          .join('');

        return `
        <div class="bucket" role="group" aria-label="${this._esc(cat)}" data-bucket="${this._esc(cat)}">
          <div class="bucket-header" style="border-color: ${color}">${this._esc(cat)}</div>
          <div class="bucket-items">${itemsHtml}</div>
        </div>`;
      })
      .join('');

    this.render(`
      <div class="pool-label">Items</div>
      <div class="pool${emptyClass}" role="group" aria-label="Items pool">${poolHtml}</div>
      <div class="buckets">${bucketsHtml}</div>
      <button class="btn submit-btn">${this._esc(submitLabel)}</button>
    `);

    this._attachListeners();
  }

  private _attachListeners(): void {
    const chips = this.root.querySelectorAll('.chip');
    chips.forEach((el) => {
      el.addEventListener('pointerdown', (e: Event) => {
        this._startDrag(el as HTMLElement, e as PointerEvent);
      });
    });

    const submitBtn = this.root.querySelector('.submit-btn');
    submitBtn?.addEventListener('click', () => this._check());
  }

  private _startDrag(el: HTMLElement, e: PointerEvent): void {
    if (this._checked) return;
    e.preventDefault();
    const idx = parseInt(el.dataset.idx || '0', 10);
    this._dragIdx = idx;
    el.classList.add('dragging');

    const clone = document.createElement('div');
    clone.className = 'clone';
    clone.textContent = this._placements[idx].text;
    clone.style.left = `${e.clientX - 40}px`;
    clone.style.top = `${e.clientY - 16}px`;
    this.root.appendChild(clone);
    this._clone = clone;

    this._onPointerMove = (ev: PointerEvent) => {
      if (!this._clone) return;
      this._clone.style.left = `${ev.clientX - 40}px`;
      this._clone.style.top = `${ev.clientY - 16}px`;

      // Highlight bucket under cursor
      const buckets = this.root.querySelectorAll('.bucket');
      buckets.forEach((b) => {
        const rect = b.getBoundingClientRect();
        if (
          ev.clientX >= rect.left &&
          ev.clientX <= rect.right &&
          ev.clientY >= rect.top &&
          ev.clientY <= rect.bottom
        ) {
          b.classList.add('drag-over');
        } else {
          b.classList.remove('drag-over');
        }
      });
    };

    this._onPointerUp = (ev: PointerEvent) => {
      // Determine drop target
      let droppedBucket: string | null = null;
      const buckets = this.root.querySelectorAll('.bucket');
      buckets.forEach((b) => {
        const rect = b.getBoundingClientRect();
        if (
          ev.clientX >= rect.left &&
          ev.clientX <= rect.right &&
          ev.clientY >= rect.top &&
          ev.clientY <= rect.bottom
        ) {
          droppedBucket = (b as HTMLElement).dataset.bucket || null;
        }
        b.classList.remove('drag-over');
      });

      // Check if dropped back in pool
      const pool = this.root.querySelector('.pool');
      if (pool) {
        const poolRect = pool.getBoundingClientRect();
        if (
          ev.clientX >= poolRect.left &&
          ev.clientX <= poolRect.right &&
          ev.clientY >= poolRect.top &&
          ev.clientY <= poolRect.bottom
        ) {
          droppedBucket = null;
        }
      }

      // If dropped outside both pool and buckets, return to pool
      if (droppedBucket === null && !this._isOverPool(ev)) {
        // Keep current placement if it was in a bucket, or return to pool
        // Actually: spec says "on drop outside: item returns to pool"
        this._placements[this._dragIdx].bucket = null;
      } else {
        this._placements[this._dragIdx].bucket = droppedBucket;
      }

      this._cleanupDrag();
      const submitLabel = this.getAttribute('submit-label') || 'Check';
      this._renderInner(submitLabel);
    };

    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
  }

  private _isOverPool(ev: PointerEvent): boolean {
    const pool = this.root.querySelector('.pool');
    if (!pool) return false;
    const r = pool.getBoundingClientRect();
    return ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
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
    this._dragIdx = -1;
  }

  private _check(): void {
    this._checked = true;
    let allCorrect = true;
    const results: { text: string; placed: string | null; expected: string }[] = [];

    const chips = this.root.querySelectorAll('.chip');
    chips.forEach((el) => {
      const idx = parseInt((el as HTMLElement).dataset.idx || '0', 10);
      const p = this._placements[idx];
      const isCorrect = p.bucket === p.category;
      results.push({ text: p.text, placed: p.bucket, expected: p.category });

      if (isCorrect) {
        el.classList.add('correct');
      } else {
        el.classList.add('incorrect');
        allCorrect = false;
        const tooltip = el.querySelector('.tooltip') as HTMLElement;
        if (tooltip) {
          tooltip.textContent = `\u2192 ${p.category}`;
          tooltip.classList.add('has-text');
        }
      }
    });

    this.dispatchEvent(
      new CustomEvent('lv-classify-check', {
        detail: { correct: allCorrect, results },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-drag-classify', LvDragClassify);
export { LvDragClassify };

import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .fc-container { max-width: 460px; margin: 0 auto; }

  .card-wrapper {
    perspective: 1000px;
    width: 100%; height: 250px;
    cursor: pointer; margin-bottom: var(--lv-sp-3);
  }
  .card {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
  }
  .card.flipped { transform: rotateY(180deg); }
  .card-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: var(--lv-sp-4);
    border-radius: var(--lv-r-md);
    border: 1.5px solid var(--lv-border);
    font-size: 18px; text-align: center;
    line-height: 1.5;
    overflow: auto;
  }
  .card-front {
    background: var(--lv-bg-card);
    color: var(--lv-text);
  }
  .card-back {
    background: var(--lv-bg-raised);
    color: var(--lv-text);
    transform: rotateY(180deg);
  }

  .progress { margin-bottom: var(--lv-sp-3); }
  .progress-text { font-size: 13px; color: var(--lv-text-dim); margin-bottom: 4px; text-align: center; }
  .progress-bar { width: 100%; height: 6px; background: var(--lv-bg-raised); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--lv-accent); border-radius: 3px; transition: width 0.3s ease; }

  .ratings { display: flex; gap: 8px; justify-content: center; }
  .ratings button {
    flex: 1; padding: 10px 0; border-radius: var(--lv-r-sm); border: 1.5px solid var(--lv-border);
    font-family: var(--lv-font); font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .ratings button:hover { filter: brightness(1.1); }
  .btn-hard { background: rgba(239,68,68,0.15); color: #ef4444; border-color: #ef4444; }
  .btn-ok { background: rgba(234,179,8,0.15); color: #eab308; border-color: #eab308; }
  .btn-easy { background: rgba(34,197,94,0.15); color: #22c55e; border-color: #22c55e; }

  .hint { font-size: 12px; color: var(--lv-text-dim); text-align: center; margin-top: var(--lv-sp-2); }

  .done {
    text-align: center; padding: var(--lv-sp-5);
    background: var(--lv-bg-card); border-radius: var(--lv-r-md);
    border: 1.5px solid var(--lv-border);
  }
  .done h3 { margin: 0 0 var(--lv-sp-3); color: var(--lv-text); font-size: 20px; }
  .done .stats { font-size: 14px; color: var(--lv-text-dim); line-height: 1.8; }
  .done button {
    margin-top: var(--lv-sp-3); padding: 8px 24px; border-radius: var(--lv-r-sm);
    border: 1px solid var(--lv-border); background: var(--lv-accent); color: #fff;
    font-family: var(--lv-font); font-size: 14px; cursor: pointer;
  }
`;

interface Card { front: string; back: string; }
interface Rating { index: number; rating: 'hard' | 'ok' | 'easy'; }

class LvFlashcard extends LvBaseElement {
  private _hasAnimated = false;
  private _cards: Card[] = [];
  private _deck: number[] = [];
  private _current = 0;
  private _flipped = false;
  private _ratings: Rating[] = [];
  private _done = false;
  private _storageKey = 'lv-flashcard';

  static get observedAttributes() {
    return ['cards', 'shuffle', 'persist'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) return;
    const c = this.root.querySelector('.fc-container') as HTMLElement;
    if (c) {
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.4s ease-out';
      requestAnimationFrame(() => { c.style.opacity = '1'; });
    }
  }

  private _build(): void {
    this._cards = this.jsonAttr<Card[]>('cards', []);
    this._ratings = [];
    this._done = false;
    this._flipped = false;
    this._current = 0;

    if (!this._cards.length) {
      this.render('<div class="fc-container"><p style="color:var(--lv-text-dim);text-align:center;">No cards provided.</p></div>');
      return;
    }

    // Build deck indices
    this._deck = this._cards.map((_, i) => i);
    if (this.hasAttribute('shuffle')) {
      for (let i = this._deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this._deck[i], this._deck[j]] = [this._deck[j], this._deck[i]];
      }
    }

    // Load persisted ratings
    if (this.hasAttribute('persist')) {
      try {
        const stored = localStorage.getItem(this._storageKey);
        if (stored) this._ratings = JSON.parse(stored);
      } catch { /* ignore */ }
    }

    this._renderView();
    this._attachKeyListener();
  }

  private _keyHandler = (e: KeyboardEvent) => {
    if (e.code === 'Space') { e.preventDefault(); this._flip(); }
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._keyHandler);
  }

  private _attachKeyListener(): void {
    document.removeEventListener('keydown', this._keyHandler);
    document.addEventListener('keydown', this._keyHandler);
  }

  private _flip(): void {
    if (this._done) return;
    this._flipped = !this._flipped;
    const card = this.root.querySelector('.card');
    if (card) card.classList.toggle('flipped', this._flipped);
  }

  private _rate(rating: 'hard' | 'ok' | 'easy'): void {
    const cardIdx = this._deck[this._current];
    this._ratings.push({ index: cardIdx, rating });

    this.dispatchEvent(new CustomEvent('lv-flashcard-rate', {
      detail: { index: cardIdx, rating, front: this._cards[cardIdx].front },
      bubbles: true, composed: true,
    }));

    // Re-queue hard cards
    if (rating === 'hard') {
      const insertAt = Math.min(this._current + 4, this._deck.length);
      this._deck.splice(insertAt, 0, cardIdx);
    }

    // Persist
    if (this.hasAttribute('persist')) {
      try { localStorage.setItem(this._storageKey, JSON.stringify(this._ratings)); } catch { /* ignore */ }
    }

    this._current++;
    this._flipped = false;

    if (this._current >= this._deck.length) {
      this._done = true;
    }

    this._renderView();
  }

  private _reset(): void {
    this._ratings = [];
    if (this.hasAttribute('persist')) {
      try { localStorage.removeItem(this._storageKey); } catch { /* ignore */ }
    }
    this._build();
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private _renderView(): void {
    if (this._done) {
      const easy = this._ratings.filter(r => r.rating === 'easy').length;
      const ok = this._ratings.filter(r => r.rating === 'ok').length;
      const hard = this._ratings.filter(r => r.rating === 'hard').length;

      this.render(`<div class="fc-container">
        <div class="done">
          <h3>Session Complete</h3>
          <div class="stats">
            <span style="color:#22c55e;">${easy} Easy</span> &middot;
            <span style="color:#eab308;">${ok} OK</span> &middot;
            <span style="color:#ef4444;">${hard} Hard</span>
          </div>
          <button id="btn-reset">Restart</button>
        </div>
      </div>`);
      this.root.getElementById('btn-reset')?.addEventListener('click', () => this._reset());
      return;
    }

    const cardIdx = this._deck[this._current];
    const card = this._cards[cardIdx];
    const total = this._deck.length;
    const pct = Math.round((this._current / total) * 100);

    this.render(`<div class="fc-container">
      <div class="progress">
        <div class="progress-text">Card ${this._current + 1} of ${total}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="card-wrapper" id="card-wrapper">
        <div class="card${this._flipped ? ' flipped' : ''}">
          <div class="card-face card-front">${this._esc(card.front)}</div>
          <div class="card-face card-back">${this._esc(card.back)}</div>
        </div>
      </div>
      <div class="ratings">
        <button class="btn-hard" id="btn-hard">Hard</button>
        <button class="btn-ok" id="btn-ok">OK</button>
        <button class="btn-easy" id="btn-easy">Easy</button>
      </div>
      <div class="hint">Click card or press Space to flip</div>
    </div>`);

    this.root.getElementById('card-wrapper')?.addEventListener('click', () => this._flip());
    this.root.getElementById('btn-hard')?.addEventListener('click', () => this._rate('hard'));
    this.root.getElementById('btn-ok')?.addEventListener('click', () => this._rate('ok'));
    this.root.getElementById('btn-easy')?.addEventListener('click', () => this._rate('easy'));
  }
}

customElements.define('lv-flashcard', LvFlashcard);
export { LvFlashcard };

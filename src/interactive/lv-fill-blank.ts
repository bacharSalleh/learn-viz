import { LvBaseElement } from '../core/base-element.js';

/* ── lv-blank (child element) ── */

const blankCss = `
  :host {
    display: inline;
    vertical-align: baseline;
  }
  .blank-wrapper {
    display: inline;
    position: relative;
  }
  .blank-input {
    display: inline-block;
    min-width: 60px;
    width: auto;
    border: none;
    border-bottom: 2px solid var(--lv-border);
    background: transparent;
    font-family: var(--lv-font-mono);
    font-size: 0.9em;
    color: var(--lv-text);
    text-align: center;
    padding: 2px 8px;
    outline: none;
    transition: border-color 0.2s ease;
    box-sizing: content-box;
  }
  .blank-input:focus {
    border-bottom-color: var(--lv-accent);
  }
  .blank-input.correct {
    border-bottom-color: var(--lv-positive);
  }
  .blank-input.wrong {
    border-bottom-color: var(--lv-negative);
  }
  .result-icon {
    display: none;
    margin-inline-start: 2px;
    font-size: 0.8em;
  }
  .result-icon.show { display: inline; }
  .result-icon.correct { color: var(--lv-positive); }
  .result-icon.wrong { color: var(--lv-negative); }
  .correct-answer {
    display: none;
    font-family: var(--lv-font-mono);
    font-size: 0.75em;
    color: var(--lv-positive);
  }
  .correct-answer.show { display: inline; margin-inline-start: 4px; }
`;

class LvBlank extends LvBaseElement {
  static get observedAttributes() {
    return ['answer', 'accept'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(blankCss);
    this._build();
  }

  handleAttributeChange() {
    // No rebuild on attribute change after connected
  }

  private _build(): void {
    this.render(`
      <span class="blank-wrapper">
        <input class="blank-input" type="text" autocomplete="off" spellcheck="false"/>
        <span class="result-icon"></span>
        <span class="correct-answer"></span>
      </span>
    `);

    // Auto-expand input
    const input = this.root.querySelector('.blank-input') as HTMLInputElement;
    if (input) {
      input.addEventListener('input', () => {
        const len = Math.max(input.value.length, 4);
        input.style.width = len + 1 + 'ch';
      });
    }
  }

  getValue(): string {
    const input = this.root.querySelector('.blank-input') as HTMLInputElement;
    return input ? input.value.trim() : '';
  }

  getAnswer(): string {
    return this.getAttribute('answer') || '';
  }

  getAcceptAlternatives(): string[] {
    const accept = this.getAttribute('accept') || '';
    return accept ? accept.split('|').map(s => s.trim()) : [];
  }

  check(): boolean {
    const value = this.getValue().toLowerCase();
    const answer = this.getAnswer().toLowerCase();
    const alts = this.getAcceptAlternatives().map(a => a.toLowerCase());

    const allValid = [answer, ...alts];
    const isCorrect = allValid.some(a => a === value);

    const input = this.root.querySelector('.blank-input') as HTMLInputElement;
    const icon = this.root.querySelector('.result-icon') as HTMLElement;
    const correctEl = this.root.querySelector('.correct-answer') as HTMLElement;

    if (input) {
      input.classList.add(isCorrect ? 'correct' : 'wrong');
      input.readOnly = true;
    }
    if (icon) {
      icon.classList.add('show', isCorrect ? 'correct' : 'wrong');
      icon.textContent = isCorrect ? '\u2713' : '\u2717';
    }
    if (correctEl && !isCorrect) {
      correctEl.classList.add('show');
      correctEl.textContent = this.getAnswer();
    }

    return isCorrect;
  }

  reset(): void {
    const input = this.root.querySelector('.blank-input') as HTMLInputElement;
    const icon = this.root.querySelector('.result-icon') as HTMLElement;
    const correctEl = this.root.querySelector('.correct-answer') as HTMLElement;

    if (input) {
      input.value = '';
      input.readOnly = false;
      input.classList.remove('correct', 'wrong');
      input.style.width = '';
    }
    if (icon) {
      icon.classList.remove('show', 'correct', 'wrong');
      icon.textContent = '';
    }
    if (correctEl) {
      correctEl.classList.remove('show');
      correctEl.textContent = '';
    }
  }
}

customElements.define('lv-blank', LvBlank);
export { LvBlank };

/* ── lv-fill-blank (parent element) ── */

const fillBlankCss = `
  :host {
    display: block;
    margin: var(--lv-sp-4) 0;
    font-family: var(--lv-font);
    color: var(--lv-text);
    line-height: 2;
  }
  .content {
    font-size: 1rem;
    line-height: 2.2;
  }
  .btn-row {
    margin-top: var(--lv-sp-3);
    display: flex;
    gap: 8px;
  }
  .check-btn {
    background: var(--lv-accent);
    color: #fff;
    border: none;
    border-radius: var(--lv-r-sm);
    padding: 8px 20px;
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .check-btn:hover { opacity: 0.85; }
  .check-btn:disabled { opacity: 0.5; cursor: default; }
  .score-text {
    display: none;
    align-items: center;
    font-family: var(--lv-font-mono);
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 0;
  }
  .score-text.show { display: flex; }
  .score-text.perfect { color: var(--lv-positive); }
  .score-text.partial { color: var(--lv-warning); }
  .score-text.fail { color: var(--lv-negative); }
`;

class LvFillBlank extends LvBaseElement {
  private _checked = false;

  static get observedAttributes() {
    return ['submit-label'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(fillBlankCss);
    this._build();
  }

  handleAttributeChange() {
    if (this.isConnected && !this._checked) this._build();
  }

  private _build(): void {
    const label = this.getAttribute('submit-label') || 'Check';

    this.render(`
      <div class="content"><slot></slot></div>
      <div class="btn-row">
        <button class="check-btn">${this._esc(label)}</button>
        <span class="score-text"></span>
      </div>
    `);

    const btn = this.root.querySelector('.check-btn') as HTMLButtonElement;
    if (btn) {
      btn.addEventListener('click', () => this._check());
    }
  }

  private _check(): void {
    if (this._checked) return;
    this._checked = true;

    const blanks = this.querySelectorAll('lv-blank') as NodeListOf<LvBlank>;
    const results: { value: string; answer: string; correct: boolean }[] = [];
    let correctCount = 0;

    blanks.forEach(blank => {
      const isCorrect = blank.check();
      if (isCorrect) correctCount++;
      results.push({
        value: blank.getValue(),
        answer: blank.getAnswer(),
        correct: isCorrect,
      });
    });

    const total = blanks.length;
    const score = `${correctCount}/${total}`;

    const scoreEl = this.root.querySelector('.score-text') as HTMLElement;
    if (scoreEl) {
      scoreEl.classList.add('show');
      scoreEl.textContent = score;
      if (correctCount === total) scoreEl.classList.add('perfect');
      else if (correctCount > 0) scoreEl.classList.add('partial');
      else scoreEl.classList.add('fail');
    }

    const btn = this.root.querySelector('.check-btn') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    this.dispatchEvent(new CustomEvent('lv-fill-check', {
      bubbles: true,
      composed: true,
      detail: { correct: correctCount === total, score, results },
    }));
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-fill-blank', LvFillBlank);
export { LvFillBlank };

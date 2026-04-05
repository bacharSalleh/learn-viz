import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .question {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: 16px;
    line-height: 1.5;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block-end: 16px;
  }

  .option {
    background: var(--lv-card);
    border: 2px solid var(--lv-border);
    border-radius: 10px;
    padding: 14px 18px;
    color: var(--lv-text);
    font-family: inherit;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s ease, background 0.2s ease, opacity 0.3s ease, transform 0.2s ease;
    outline: none;
    user-select: none;
  }

  .option:hover:not(.dimmed):not(.correct):not(.wrong) {
    border-color: var(--lv-accent);
  }

  .option:focus-visible:not(.dimmed) {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
    border-radius: 10px;
  }

  .option .icon {
    display: none;
    inline-size: 22px;
    block-size: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  }

  .option.correct .icon {
    display: flex;
    background: var(--lv-success, #22c55e);
    color: #fff;
  }

  .option.wrong .icon {
    display: flex;
    background: var(--lv-error, #ef4444);
    color: #fff;
  }

  .option .label {
    flex: 1;
  }

  .option.correct {
    border-color: var(--lv-success, #22c55e);
    background: color-mix(in srgb, var(--lv-success, #22c55e) 10%, var(--lv-card));
    animation: bounce 0.4s ease;
  }

  .option.wrong {
    border-color: var(--lv-error, #ef4444);
    background: color-mix(in srgb, var(--lv-error, #ef4444) 10%, var(--lv-card));
  }

  .option.dimmed {
    opacity: 0.4;
    pointer-events: none;
  }

  @keyframes bounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.03); }
    50%  { transform: scale(0.98); }
    70%  { transform: scale(1.01); }
    100% { transform: scale(1); }
  }

  .explanation {
    overflow: hidden;
    max-block-size: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: max-block-size 0.4s ease, opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
    padding-inline: 4px;
  }

  .explanation.visible {
    max-block-size: 500px;
    opacity: 1;
    transform: translateY(0);
  }

  .explanation-inner {
    padding: 16px;
    background: color-mix(in srgb, var(--lv-accent) 8%, var(--lv-card));
    border-inline-start: 3px solid var(--lv-accent);
    border-radius: 8px;
    color: var(--lv-text);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-block-start: 4px;
  }
`;

class LvQuiz extends LvBaseElement {
  private _answered = false;

  static get observedAttributes() {
    return ['question', 'options', 'correct', 'explanation'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
    this._attachListeners();
  }

  handleAttributeChange() {
    if (!this._answered) {
      this._render();
      this._attachListeners();
    }
  }

  private get _options(): string[] {
    return this.jsonAttr<string[]>('options', []);
  }

  private get _correctIndex(): number {
    return parseInt(this.getAttribute('correct') || '0', 10);
  }

  private _render() {
    const question = this.getAttribute('question') || '';
    const options = this._options;
    const explanation = this.getAttribute('explanation') || '';

    const optionsHtml = options.map((opt, i) => `
      <div class="option" role="button" tabindex="0" data-index="${i}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${opt}</span>
      </div>
    `).join('');

    this.render(`
      <div class="question">${question}</div>
      <div class="options">${optionsHtml}</div>
      ${explanation ? `<div class="explanation"><div class="explanation-inner">${explanation}</div></div>` : ''}
    `);
  }

  private _attachListeners() {
    const optionEls = this.root.querySelectorAll('.option');

    optionEls.forEach((el) => {
      el.addEventListener('click', () => this._select(el as HTMLElement));
      el.addEventListener('keydown', (e: Event) => {
        const key = (e as KeyboardEvent).key;
        if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          this._select(el as HTMLElement);
        }
      });
    });
  }

  private _select(el: HTMLElement) {
    if (this._answered) return;
    this._answered = true;

    const selected = parseInt(el.dataset.index || '0', 10);
    const correct = this._correctIndex;
    const isCorrect = selected === correct;

    const allOptions = this.root.querySelectorAll('.option');

    allOptions.forEach((opt, i) => {
      const optEl = opt as HTMLElement;
      optEl.removeAttribute('tabindex');

      if (i === correct) {
        optEl.classList.add('correct');
        optEl.querySelector('.icon')!.textContent = '\u2713';
      } else if (i === selected && !isCorrect) {
        optEl.classList.add('wrong');
        optEl.querySelector('.icon')!.textContent = '\u2717';
      } else {
        optEl.classList.add('dimmed');
      }
    });

    // Show explanation
    const explanationEl = this.root.querySelector('.explanation');
    if (explanationEl) {
      requestAnimationFrame(() => explanationEl.classList.add('visible'));
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent('lv-quiz-answer', {
      bubbles: true,
      composed: true,
      detail: { correct: isCorrect, selected, answer: correct },
    }));
  }
}

customElements.define('lv-quiz', LvQuiz);

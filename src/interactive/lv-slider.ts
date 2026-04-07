import { LvBaseElement } from '../core/base-element.js';

const css = /* css */ `
  :host {
    display: block;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-block-end: 10px;
  }

  .label {
    font-size: 0.9rem;
    color: var(--lv-text);
    font-weight: 500;
  }

  .value-display {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--lv-accent);
    font-variant-numeric: tabular-nums;
    transition: transform 0.15s ease;
    display: inline-block;
  }

  .value-display.pop {
    transform: scale(1.15);
  }

  /* === Range input === */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 100%;
    block-size: 6px;
    border-radius: 9999px;
    outline: none;
    cursor: pointer;
    background: var(--lv-border);
    margin: 0;
    direction: ltr; /* always LTR so min is left, max is right regardless of page dir */
  }

  /* Track — WebKit */
  input[type="range"]::-webkit-slider-runnable-track {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--track-bg);
  }

  /* Track — Firefox */
  input[type="range"]::-moz-range-track {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--lv-border);
  }

  input[type="range"]::-moz-range-progress {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--fill-color, var(--lv-accent));
  }

  /* Thumb — WebKit */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
    background: var(--fill-color, var(--lv-accent));
    border: none;
    margin-block-start: -7px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  }

  input[type="range"]:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--fill-color, var(--lv-accent)) 35%, transparent), 0 2px 6px rgba(0,0,0,0.25);
  }

  /* Thumb — Firefox */
  input[type="range"]::-moz-range-thumb {
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
    background: var(--fill-color, var(--lv-accent));
    border: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  }

  input[type="range"]:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--fill-color, var(--lv-accent)) 35%, transparent), 0 2px 6px rgba(0,0,0,0.25);
  }
`;

class LvSlider extends LvBaseElement {
  private _input: HTMLInputElement | null = null;
  private _valueEl: HTMLElement | null = null;
  private _popTimeout: number | null = null;

  static get observedAttributes() {
    return ['min', 'max', 'step', 'value', 'label', 'name', 'color'];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._popTimeout) { clearTimeout(this._popTimeout); this._popTimeout = null; }
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._render();
    this._bind();
    this._updateTrack();
  }

  handleAttributeChange() {
    if (this._input) {
      this._render();
      this._bind();
      this._updateTrack();
    }
  }

  private get _min(): number { return parseFloat(this.getAttribute('min') || '0'); }
  private get _max(): number { return parseFloat(this.getAttribute('max') || '100'); }
  private get _step(): string { return this.getAttribute('step') || '1'; }
  private get _value(): string { return this.getAttribute('value') || '50'; }
  private get _label(): string { return this.getAttribute('label') || ''; }
  private get _name(): string { return this.getAttribute('name') || ''; }
  private get _color(): string { return this.getAttribute('color') || ''; }

  private _render() {
    const colorStyle = this._color ? `--fill-color: ${this._color};` : '';

    this.render(`
      <div class="header">
        <span class="label">${this._label}</span>
        <span class="value-display">${this._value}</span>
      </div>
      <input
        type="range"
        min="${this._min}"
        max="${this._max}"
        step="${this._step}"
        value="${this._value}"
        ${this._name ? `name="${this._name}"` : ''}
        style="${colorStyle}"
        aria-label="${this._label}"
      />
    `);

    this._input = this.root.querySelector('input');
    this._valueEl = this.root.querySelector('.value-display');
  }

  private _bind() {
    if (!this._input) return;

    this._input.addEventListener('input', () => {
      const val = this._input!.value;

      // Update displayed value with pop animation
      if (this._valueEl) {
        this._valueEl.textContent = val;
        this._valueEl.classList.add('pop');
        if (this._popTimeout) clearTimeout(this._popTimeout);
        this._popTimeout = window.setTimeout(() => {
          this._valueEl?.classList.remove('pop');
        }, 150);
      }

      this._updateTrack();

      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('lv-change', {
        bubbles: true,
        composed: true,
        detail: { name: this._name, value: parseFloat(val) },
      }));
    });
  }

  private _updateTrack() {
    if (!this._input) return;
    const min = this._min;
    const max = this._max;
    const val = parseFloat(this._input.value);
    const pct = ((val - min) / (max - min)) * 100;
    const fillColor = this._color || 'var(--lv-accent)';

    // Input is always direction:ltr so fill always goes left-to-right
    const gradient = `linear-gradient(to right, ${fillColor} ${pct}%, var(--lv-border) ${pct}%)`;

    this._input.style.setProperty('--track-bg', gradient);
    this._input.style.background = gradient;
    this._input.style.borderRadius = '9999px';
  }
}

customElements.define('lv-slider', LvSlider);

import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .sb-container {
    border: 1.5px solid var(--lv-border); border-radius: var(--lv-r-md);
    overflow: hidden; display: flex; flex-direction: column;
  }

  .editor-wrap {
    position: relative; background: var(--lv-bg);
  }
  textarea {
    display: block; width: 100%; min-height: 150px; padding: 12px 12px 12px 44px;
    background: transparent; color: var(--lv-text); border: none; outline: none;
    font-family: var(--lv-font-mono); font-size: 13px; line-height: 1.6;
    resize: vertical; tab-size: 2; white-space: pre; overflow-wrap: normal;
    overflow-x: auto; box-sizing: border-box;
  }
  textarea:read-only { opacity: 0.7; cursor: default; }

  .line-numbers {
    position: absolute; top: 0; left: 0; width: 36px; height: 100%;
    padding: 12px 0; box-sizing: border-box; overflow: hidden;
    background: var(--lv-bg-raised); border-right: 1px solid var(--lv-border);
    font-family: var(--lv-font-mono); font-size: 13px; line-height: 1.6;
    color: var(--lv-text-dim); text-align: right; pointer-events: none;
    user-select: none;
  }
  .line-numbers span {
    display: block; padding-right: 6px;
  }

  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 10px; background: var(--lv-bg-raised);
    border-top: 1px solid var(--lv-border); border-bottom: 1px solid var(--lv-border);
  }
  .toolbar .lang { font-size: 11px; color: var(--lv-text-dim); text-transform: uppercase; letter-spacing: 0.05em; }
  .toolbar button {
    padding: 5px 16px; border-radius: var(--lv-r-sm); border: 1px solid var(--lv-border);
    background: var(--lv-accent); color: #fff; font-family: var(--lv-font);
    font-size: 13px; font-weight: 600; cursor: pointer; transition: filter 0.15s;
  }
  .toolbar button:hover { filter: brightness(1.15); }

  .output {
    background: var(--lv-bg-raised); min-height: 60px; max-height: 250px;
    overflow: auto; padding: 10px 12px;
    font-family: var(--lv-font-mono); font-size: 12px; line-height: 1.6;
    white-space: pre-wrap; word-break: break-word;
  }
  .output .log { color: var(--lv-text); }
  .output .warn { color: var(--lv-warning, #eab308); }
  .output .error { color: var(--lv-negative, #ef4444); }
  .output .placeholder { color: var(--lv-text-dim); font-style: italic; }
`;

class LvSandbox extends LvBaseElement {
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['code', 'language', 'run-label', 'editable', 'auto-run'];
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
    const c = this.root.querySelector('.sb-container') as HTMLElement;
    if (c) {
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.4s ease-out';
      requestAnimationFrame(() => { c.style.opacity = '1'; });
    }
  }

  private _build(): void {
    const code = this.getAttribute('code') || '';
    const lang = this.getAttribute('language') || 'javascript';
    const runLabel = this.getAttribute('run-label') || 'Run';
    const editable = !this.hasAttribute('editable') || this.getAttribute('editable') !== 'false';

    this.render(`<div class="sb-container">
      <div class="editor-wrap">
        <div class="line-numbers" id="line-nums"></div>
        <textarea id="editor" spellcheck="false" role="textbox" aria-label="Code editor" ${editable ? '' : 'readonly'}>${this._esc(code)}</textarea>
      </div>
      <div class="toolbar">
        <span class="lang">${this._esc(lang)}</span>
        <button id="btn-run">${this._esc(runLabel)}</button>
      </div>
      <div class="output" id="output" role="log" aria-live="polite" aria-label="Code output"><span class="placeholder">Output will appear here...</span></div>
    </div>`);

    const editor = this.root.getElementById('editor') as HTMLTextAreaElement;
    const output = this.root.getElementById('output') as HTMLElement;
    const lineNums = this.root.getElementById('line-nums') as HTMLElement;

    // Line numbers
    const updateLineNumbers = () => {
      const lines = (editor.value || '').split('\n').length;
      lineNums.innerHTML = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
    };
    updateLineNumbers();
    editor.addEventListener('input', updateLineNumbers);

    // Sync scroll
    editor.addEventListener('scroll', () => {
      lineNums.style.transform = `translateY(-${editor.scrollTop}px)`;
    });

    // Tab handling
    editor.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
        updateLineNumbers();
      }
      // Ctrl/Cmd+Enter to run
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this._run(editor, output);
      }
    });

    // Run button
    this.root.getElementById('btn-run')?.addEventListener('click', () => {
      this._run(editor, output);
    });

    // Auto-run
    if (this.hasAttribute('auto-run')) {
      requestAnimationFrame(() => this._run(editor, output));
    }
  }

  private _run(editor: HTMLTextAreaElement, output: HTMLElement): void {
    const code = editor.value;
    output.innerHTML = '';

    const lines: { text: string; type: 'log' | 'warn' | 'error' }[] = [];

    // Save original console methods
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;

    const capture = (type: 'log' | 'warn' | 'error') => (...args: any[]) => {
      const text = args.map(a => {
        if (typeof a === 'object') {
          try { return JSON.stringify(a, null, 2); } catch { return String(a); }
        }
        return String(a);
      }).join(' ');
      lines.push({ text, type });
    };

    console.log = capture('log');
    console.warn = capture('warn');
    console.error = capture('error');

    let errorMsg: string | undefined;

    try {
      const fn = new Function(code);
      fn();
    } catch (err: any) {
      errorMsg = err?.message || String(err);
      lines.push({ text: `Error: ${errorMsg}`, type: 'error' });
    }

    // Restore console
    console.log = origLog;
    console.warn = origWarn;
    console.error = origError;

    // Render output
    if (lines.length === 0) {
      output.innerHTML = '<span class="placeholder">(no output)</span>';
    } else {
      output.innerHTML = lines.map(l =>
        `<div class="${l.type}">${this._esc(l.text)}</div>`
      ).join('');
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent('lv-sandbox-run', {
      detail: {
        code,
        output: lines.map(l => l.text),
        error: errorMsg,
      },
      bubbles: true, composed: true,
    }));
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-sandbox', LvSandbox);
export { LvSandbox };

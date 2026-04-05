import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: 12px 0; }
  .code-block {
    background: var(--lv-bg-raised);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-r-md);
    padding: 16px 20px;
    overflow-x: auto;
    font-family: var(--lv-font-mono);
    font-size: var(--lv-fs-sm);
    line-height: 1.6;
    direction: ltr;
    text-align: left;
  }
  .line-num {
    color: var(--lv-text-dim);
    user-select: none;
    padding-inline-end: 16px;
    display: inline-block;
    min-width: 2em;
    text-align: end;
  }
`;

const HLJS_JS = 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js';
const HLJS_CSS = 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css';

let hljsLoading: Promise<void> | null = null;

function loadHljs(): Promise<void> {
  if ((window as any).hljs) return Promise.resolve();
  if (hljsLoading) return hljsLoading;

  hljsLoading = new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HLJS_CSS;
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = HLJS_JS;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load highlight.js'));
    document.head.appendChild(script);
  });

  return hljsLoading;
}

class LvCode extends LvBaseElement {
  private _source = '';

  static get observedAttributes() {
    return ['language', 'line-numbers'];
  }

  connectedCallback() {
    super.connectedCallback?.();
    this._source = this.textContent?.trim() || '';
    this.adoptStyles(css);
    this._render();
  }

  private async _render() {
    const language = this.getAttribute('language') || '';
    const showLineNumbers = this.hasAttribute('line-numbers');

    let highlighted: string;

    try {
      await loadHljs();
      const hljs = (window as any).hljs;
      if (language && hljs.getLanguage(language)) {
        highlighted = hljs.highlight(this._source, { language }).value;
      } else {
        highlighted = hljs.highlightAuto(this._source).value;
      }
    } catch {
      // Fallback: plain escaped text
      highlighted = this._escapeHtml(this._source);
    }

    let codeContent: string;
    if (showLineNumbers) {
      const lines = highlighted.split('\n');
      codeContent = lines
        .map((line, i) => `<span class="line-num">${i + 1}</span>${line}`)
        .join('\n');
    } else {
      codeContent = highlighted;
    }

    // Include hljs CSS in shadow DOM so highlighting styles apply
    this.root.innerHTML =
      `<link rel="stylesheet" href="${HLJS_CSS}">` +
      `<div class="code-block"><pre><code>${codeContent}</code></pre></div>`;
  }

  private _escapeHtml(text: string): string {
    const el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
  }
}

customElements.define('lv-code', LvCode);

export { LvCode };

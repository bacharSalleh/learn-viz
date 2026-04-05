import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`;

const KATEX_CSS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
const KATEX_JS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';

let katexLoading: Promise<void> | null = null;

function loadKatex(): Promise<void> {
  if ((window as any).katex) return Promise.resolve();
  if (katexLoading) return katexLoading;

  katexLoading = new Promise<void>((resolve, reject) => {
    // Load CSS into document head (for fallback / global availability)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = KATEX_CSS;
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = KATEX_JS;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load KaTeX'));
    document.head.appendChild(script);
  });

  return katexLoading;
}

class LvMath extends LvBaseElement {
  private _source = '';

  connectedCallback() {
    super.connectedCallback?.();
    this._source = this.textContent?.trim() || '';
    this.adoptStyles(css);
    this._render();
  }

  private async _render() {
    try {
      await loadKatex();
      const displayMode = this.hasAttribute('display');
      const html = (window as any).katex.renderToString(this._source, {
        displayMode,
        throwOnError: false,
      });

      // Build shadow DOM content with KaTeX CSS link + rendered output
      this.root.innerHTML = `<link rel="stylesheet" href="${KATEX_CSS}"><span class="katex-container">${html}</span>`;
    } catch {
      // Fallback: show raw LaTeX in monospace
      this.root.innerHTML = `<span class="fallback">${this._escapeHtml(this._source)}</span>`;
    }
  }

  private _escapeHtml(text: string): string {
    const el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
  }
}

customElements.define('lv-math', LvMath);

export { LvMath };

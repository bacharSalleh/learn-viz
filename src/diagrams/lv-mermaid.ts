import { LvBaseElement } from '../core/base-element.js';
import { loadScript } from '../core/utils.js';

const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;

let _mermaidReady: Promise<void> | null = null;

class LvMermaid extends LvBaseElement {
  private _rendered = false;

  static get observedAttributes(): string[] {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._renderDiagram();
  }

  private async _renderDiagram(): Promise<void> {
    const definition = this.textContent?.trim();
    if (!definition) {
      this.render('<div class="mermaid-container"></div>');
      return;
    }

    this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');

    try {
      await loadScript(MERMAID_CDN);
    } catch {
      this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');
      return;
    }

    const mermaid = (window as any).mermaid;
    if (!mermaid) return;

    // Initialize with theme-aware config
    if (!_mermaidReady) {
      _mermaidReady = new Promise<void>(resolve => {
        const style = getComputedStyle(this);
        const bg = style.getPropertyValue('--lv-bg-card').trim() || '#1a1a2e';
        const text = style.getPropertyValue('--lv-text').trim() || '#e4e4ec';
        const accent = style.getPropertyValue('--lv-accent').trim() || '#00d4ff';
        const accent2 = style.getPropertyValue('--lv-accent2').trim() || '#7b68ee';
        const border = style.getPropertyValue('--lv-border').trim() || '#2a2a4a';

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: accent,
            primaryTextColor: text,
            primaryBorderColor: border,
            secondaryColor: accent2,
            secondaryTextColor: text,
            tertiaryColor: bg,
            lineColor: accent,
            textColor: text,
            mainBkg: bg,
            nodeBorder: border,
            clusterBkg: bg,
            edgeLabelBackground: bg,
            fontFamily: 'Inter, Segoe UI, sans-serif',
          },
          flowchart: { htmlLabels: true, curve: 'basis' },
          securityLevel: 'strict',
        });
        resolve();
      });
    }
    await _mermaidReady;

    try {
      const id = 'lv-mermaid-' + Math.random().toString(36).slice(2, 8);
      const { svg } = await mermaid.render(id, definition);
      const output = this.root.getElementById('output');
      if (output) output.innerHTML = svg;
    } catch (err: any) {
      const output = this.root.getElementById('output');
      if (output) output.innerHTML = `<div class="mermaid-error">Diagram error: ${err.message || err}</div>`;
    }
  }
}

customElements.define('lv-mermaid', LvMermaid);
export { LvMermaid };

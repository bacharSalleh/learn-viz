import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; text-align: center; margin: 16px 0; direction: ltr; }
  .matrix-wrapper { display: inline-block; }
  .col-labels {
    display: grid;
    gap: 2px;
    padding: 0 8px;
    margin-bottom: 4px;
  }
  .matrix {
    display: inline-grid;
    gap: 2px;
    padding: 8px;
    position: relative;
  }
  .bracket-left, .bracket-right {
    position: absolute; top: 0; bottom: 0; width: 8px;
    border: 2px solid var(--lv-text-dim);
  }
  .bracket-left { left: 0; border-right: none; border-radius: 4px 0 0 4px; }
  .bracket-right { right: 0; border-left: none; border-radius: 0 4px 4px 0; }
  .cell {
    padding: 8px 14px;
    font-family: var(--lv-font-mono);
    font-size: var(--lv-fs-sm);
    text-align: center;
    border-radius: 4px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .cell.highlight {
    background: var(--lv-accent-dim);
    box-shadow: 0 0 12px var(--lv-accent-dim);
    font-weight: 700;
    color: var(--lv-accent);
  }
  .row-label, .col-label {
    color: var(--lv-text-dim);
    font-size: var(--lv-fs-xs);
    font-weight: 600;
  }
  .row-label {
    display: flex;
    align-items: center;
    padding-inline-end: 8px;
  }
  .col-label {
    text-align: center;
    padding-bottom: 4px;
  }
`;

interface MatrixLabels {
  rows?: string[];
  cols?: string[];
}

class LvMatrix extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'labels', 'highlight'];
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.adoptStyles(css);
    this._render();
  }

  attributeChangedCallback() {
    if (this.root) {
      this._render();
    }
  }

  private _render() {
    const data: number[][] = this.jsonAttr('data', []);
    const labels: MatrixLabels = this.jsonAttr('labels', {});
    const highlight: number[][] = this.jsonAttr('highlight', []);

    if (!data.length) {
      this.root.innerHTML = '';
      return;
    }

    const rows = data.length;
    const cols = data[0]?.length || 0;
    const hasRowLabels = !!(labels.rows && labels.rows.length);
    const hasColLabels = !!(labels.cols && labels.cols.length);

    // Build highlight set for fast lookup
    const highlightSet = new Set(highlight.map(([r, c]) => `${r},${c}`));

    // Determine grid columns
    const gridCols = hasRowLabels ? `auto repeat(${cols}, auto)` : `repeat(${cols}, auto)`;

    let html = '<div class="matrix-wrapper">';

    // Column labels row
    if (hasColLabels) {
      const colLabelGridCols = hasRowLabels ? `auto repeat(${cols}, auto)` : `repeat(${cols}, auto)`;
      html += `<div class="col-labels" style="grid-template-columns: ${colLabelGridCols}">`;
      if (hasRowLabels) html += '<span></span>'; // empty cell for row-label column
      for (let c = 0; c < cols; c++) {
        html += `<span class="col-label">${this._escapeHtml(labels.cols![c] || '')}</span>`;
      }
      html += '</div>';
    }

    html += `<div class="matrix" style="grid-template-columns: ${gridCols}">`;
    html += '<div class="bracket-left"></div>';
    html += '<div class="bracket-right"></div>';

    for (let r = 0; r < rows; r++) {
      if (hasRowLabels) {
        html += `<span class="row-label">${this._escapeHtml(labels.rows![r] || '')}</span>`;
      }
      for (let c = 0; c < cols; c++) {
        const val = data[r][c];
        const formatted = typeof val === 'number' ? this._formatNum(val) : String(val);
        const isHighlight = highlightSet.has(`${r},${c}`);
        html += `<span class="cell${isHighlight ? ' highlight' : ''}">${formatted}</span>`;
      }
    }

    html += '</div></div>';
    this.root.innerHTML = html;
  }

  private _formatNum(n: number): string {
    // Use up to 3 decimal places, but trim trailing zeros (min 2)
    const s = n.toFixed(3);
    // Remove trailing zero if 3rd decimal is 0, keeping at least 2 decimals
    return s.replace(/0$/, '');
  }

  private _escapeHtml(text: string): string {
    const el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
  }
}

customElements.define('lv-matrix', LvMatrix);

export { LvMatrix };

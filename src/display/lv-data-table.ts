import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .table-container {
    width: 100%;
    overflow-x: auto;
    border-radius: var(--lv-r-md);
    border: 1px solid var(--lv-border);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--lv-font);
    font-size: 0.9rem;
    color: var(--lv-text);
  }
  thead th {
    background: var(--lv-bg-raised);
    padding: 10px 14px;
    text-align: start;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--lv-text-dim);
    border-bottom: 2px solid var(--lv-border);
    white-space: nowrap;
    user-select: none;
  }
  thead th.sortable {
    cursor: pointer;
    transition: color 0.2s;
  }
  thead th.sortable:hover {
    color: var(--lv-accent);
  }
  .sort-arrow {
    display: inline-block;
    margin-inline-start: 4px;
    font-size: 0.75em;
    opacity: 0.4;
  }
  .sort-arrow.active { opacity: 1; color: var(--lv-accent); }
  tbody td {
    padding: 8px 14px;
    border-bottom: 1px solid var(--lv-border);
  }
  tbody tr:last-child td { border-bottom: none; }
  .num-cell {
    font-family: var(--lv-font-mono);
    font-variant-numeric: tabular-nums;
    text-align: end;
  }
  .striped tbody tr:nth-child(even) {
    background: var(--lv-bg-raised);
  }
  tfoot td {
    padding: 8px 14px;
    font-size: 0.8rem;
    color: var(--lv-text-dim);
    font-family: var(--lv-font-mono);
    border-top: 2px solid var(--lv-border);
    font-weight: 600;
  }
  .page-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 10px;
    font-family: var(--lv-font);
    font-size: 0.85rem;
    color: var(--lv-text-dim);
    border-top: 1px solid var(--lv-border);
  }
  .page-btn {
    background: var(--lv-bg-raised);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-r-sm);
    padding: 4px 12px;
    font-family: var(--lv-font);
    font-size: 0.85rem;
    color: var(--lv-text);
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .page-btn:hover:not(:disabled) { border-color: var(--lv-accent); }
  .page-btn:disabled { opacity: 0.4; cursor: default; }
`;

interface SortState {
  column: string;
  direction: 'asc' | 'desc' | 'none';
}

class LvDataTable extends LvBaseElement {
  private _sortState: SortState = { column: '', direction: 'none' };
  private _currentPage = 0;
  private _hasAnimated = false;

  static get observedAttributes() {
    return ['data', 'columns', 'sortable', 'show-stats', 'page-size', 'striped'];
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
    const container = this.root.querySelector('.table-container') as HTMLElement;
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });
    }
  }

  private _build(): void {
    const data: Record<string, unknown>[] = this.jsonAttr('data', []);
    const sortable = this.hasAttribute('sortable');
    const showStats = this.hasAttribute('show-stats');
    const pageSize = parseInt(this.getAttribute('page-size') || '0', 10);
    const striped = this.hasAttribute('striped');

    if (!data.length) {
      this.render('<div class="table-container"><table><tbody><tr><td style="padding:20px;text-align:center;color:var(--lv-text-dim)">No data</td></tr></tbody></table></div>');
      return;
    }

    // Determine columns
    let columns: string[] = this.jsonAttr('columns', []);
    if (!columns.length) {
      columns = Object.keys(data[0]);
    }

    // Determine which columns are numeric
    const numericCols = new Set<string>();
    for (const col of columns) {
      const isNum = data.every(row => {
        const v = row[col];
        return v === null || v === undefined || typeof v === 'number' || (typeof v === 'string' && v !== '' && !isNaN(Number(v)));
      });
      if (isNum) numericCols.add(col);
    }

    // Sort data
    let sortedData = [...data];
    if (sortable && this._sortState.direction !== 'none' && this._sortState.column) {
      const col = this._sortState.column;
      const dir = this._sortState.direction === 'asc' ? 1 : -1;
      const isNum = numericCols.has(col);
      sortedData.sort((a, b) => {
        const av = a[col], bv = b[col];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (isNum) return (Number(av) - Number(bv)) * dir;
        return String(av).localeCompare(String(bv)) * dir;
      });
    }

    // Pagination
    const totalRows = sortedData.length;
    const totalPages = pageSize > 0 ? Math.ceil(totalRows / pageSize) : 1;
    if (this._currentPage >= totalPages) this._currentPage = Math.max(0, totalPages - 1);
    const pageData = pageSize > 0
      ? sortedData.slice(this._currentPage * pageSize, (this._currentPage + 1) * pageSize)
      : sortedData;

    // Build header
    let headerHtml = '<tr>';
    for (const col of columns) {
      const arrow = this._getSortArrow(col);
      const cls = sortable ? ' class="sortable"' : '';
      headerHtml += `<th${cls} data-col="${this._esc(col)}">${this._esc(col)}${arrow}</th>`;
    }
    headerHtml += '</tr>';

    // Build body
    let bodyHtml = '';
    for (const row of pageData) {
      bodyHtml += '<tr>';
      for (const col of columns) {
        const val = row[col];
        const isNum = numericCols.has(col);
        const cls = isNum ? ' class="num-cell"' : '';
        const formatted = this._formatValue(val, isNum);
        bodyHtml += `<td${cls}>${formatted}</td>`;
      }
      bodyHtml += '</tr>';
    }

    // Build footer stats
    let footerHtml = '';
    if (showStats) {
      footerHtml = '<tfoot><tr>';
      for (const col of columns) {
        if (numericCols.has(col)) {
          const vals = data.map(r => Number(r[col])).filter(v => !isNaN(v));
          const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
          const min = Math.min(...vals);
          const max = Math.max(...vals);
          footerHtml += `<td class="num-cell">${this._fmtSig(mean)} (${this._fmtSig(min)}..${this._fmtSig(max)})</td>`;
        } else {
          const unique = new Set(data.map(r => r[col])).size;
          footerHtml += `<td>${unique} unique</td>`;
        }
      }
      footerHtml += '</tr></tfoot>';
    }

    // Pagination controls
    let pageHtml = '';
    if (pageSize > 0 && totalPages > 1) {
      pageHtml = `<div class="page-controls">
        <button class="page-btn" data-action="prev" ${this._currentPage === 0 ? 'disabled' : ''}>Prev</button>
        <span>Page ${this._currentPage + 1} of ${totalPages}</span>
        <button class="page-btn" data-action="next" ${this._currentPage >= totalPages - 1 ? 'disabled' : ''}>Next</button>
      </div>`;
    }

    const stripedCls = striped ? ' striped' : '';

    this.render(`<div class="table-container${stripedCls}">
      <table>
        <thead>${headerHtml}</thead>
        <tbody>${bodyHtml}</tbody>
        ${footerHtml}
      </table>
      ${pageHtml}
    </div>`);

    // Attach listeners
    if (sortable) {
      this.root.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
          const col = (th as HTMLElement).dataset.col || '';
          this._toggleSort(col);
        });
      });
    }

    if (pageSize > 0) {
      this.root.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = (btn as HTMLElement).dataset.action;
          if (action === 'prev' && this._currentPage > 0) {
            this._currentPage--;
            this._build();
          } else if (action === 'next' && this._currentPage < totalPages - 1) {
            this._currentPage++;
            this._build();
          }
        });
      });
    }
  }

  private _toggleSort(col: string): void {
    if (this._sortState.column === col) {
      if (this._sortState.direction === 'asc') {
        this._sortState.direction = 'desc';
      } else if (this._sortState.direction === 'desc') {
        this._sortState = { column: '', direction: 'none' };
      } else {
        this._sortState = { column: col, direction: 'asc' };
      }
    } else {
      this._sortState = { column: col, direction: 'asc' };
    }
    this._currentPage = 0;
    this._build();
  }

  private _getSortArrow(col: string): string {
    if (this._sortState.column !== col || this._sortState.direction === 'none') {
      return '<span class="sort-arrow">\u25B2</span>';
    }
    const arrow = this._sortState.direction === 'asc' ? '\u25B2' : '\u25BC';
    return `<span class="sort-arrow active">${arrow}</span>`;
  }

  private _formatValue(val: unknown, isNum: boolean): string {
    if (val === null || val === undefined) return '<span style="color:var(--lv-text-dim)">-</span>';
    if (isNum) return this._fmtSig(Number(val));
    return this._esc(String(val));
  }

  private _fmtSig(n: number): string {
    if (isNaN(n)) return '-';
    if (Number.isInteger(n) && Math.abs(n) < 1e6) return String(n);
    return parseFloat(n.toPrecision(4)).toString();
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

customElements.define('lv-data-table', LvDataTable);
export { LvDataTable };

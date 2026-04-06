import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .rt-container { width: 100%; overflow-x: auto; font-family: var(--lv-font); }
  svg { display: block; width: 100%; margin: 0 auto; }
  svg text { font-family: var(--lv-font-mono); }
  .controls { display: flex; gap: 8px; justify-content: center; margin-top: var(--lv-sp-3); }
  .controls button {
    padding: 6px 16px; border-radius: var(--lv-r-sm); border: 1px solid var(--lv-border);
    background: var(--lv-bg-raised); color: var(--lv-text); font-family: var(--lv-font);
    cursor: pointer; font-size: 13px; transition: background 0.15s;
  }
  .controls button:hover { background: var(--lv-accent); color: #fff; }
  .controls button:disabled { opacity: 0.4; cursor: default; background: var(--lv-bg-raised); color: var(--lv-text-dim); }
  .info { text-align: center; font-size: 13px; color: var(--lv-text-dim); margin-top: var(--lv-sp-2); font-family: var(--lv-font-mono); min-height: 1.4em; }
  .legend { display: flex; gap: 16px; justify-content: center; margin-top: var(--lv-sp-2); font-size: 11px; color: var(--lv-text-dim); }
  .legend span { display: flex; align-items: center; gap: 4px; }
  .legend .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
`;

interface TreeNode {
  call: string;
  args: number[];
  children: TreeNode[];
  result: number | null;
  // Layout
  x: number;
  y: number;
  // State
  state: 'hidden' | 'pending' | 'active' | 'computed' | 'memo';
}

interface AnimStep {
  nodeIdx: number;
  action: 'show' | 'activate' | 'compute' | 'memo';
  edgeFrom?: number;
}

class LvRecursionTree extends LvBaseElement {
  private _hasAnimated = false;
  private _allNodes: TreeNode[] = [];
  private _root: TreeNode | null = null;
  private _steps: AnimStep[] = [];
  private _stepIdx = -1;
  private _playing = false;
  private _timer: ReturnType<typeof setTimeout> | null = null;

  static get observedAttributes() {
    return ['fn', 'n', 'speed', 'show-memo'];
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
    const c = this.root.querySelector('.rt-container') as HTMLElement;
    if (c) {
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.5s ease-out';
      requestAnimationFrame(() => { c.style.opacity = '1'; });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  private _build(): void {
    const fn = this.getAttribute('fn') || 'fibonacci';
    const n = parseInt(this.getAttribute('n') || '5', 10);
    const showMemo = this.hasAttribute('show-memo');

    this._allNodes = [];
    this._root = this._buildTree(fn, n);
    this._layoutTree(this._root);
    this._steps = [];
    this._stepIdx = -1;
    this._playing = false;

    // Generate animation steps (DFS order)
    const memo = new Map<string, boolean>();
    this._generateSteps(this._root, memo, showMemo);

    // Reset all nodes to hidden
    this._allNodes.forEach(n => n.state = 'hidden');

    this._renderView();
  }

  private _buildTree(fn: string, n: number): TreeNode {
    const cache = new Map<string, number>();

    const build = (name: string, args: number[]): TreeNode => {
      const key = `${name}(${args.join(',')})`;
      const node: TreeNode = { call: key, args, children: [], result: null, x: 0, y: 0, state: 'hidden' };
      this._allNodes.push(node);

      switch (name) {
        case 'fibonacci':
        case 'fib': {
          const a = args[0];
          if (a <= 1) { node.result = a; }
          else {
            const c1 = build('fib', [a - 1]);
            const c2 = build('fib', [a - 2]);
            node.children = [c1, c2];
            node.result = c1.result! + c2.result!;
          }
          break;
        }
        case 'factorial':
        case 'fact': {
          const a = args[0];
          if (a <= 1) { node.result = 1; }
          else {
            const c = build('fact', [a - 1]);
            node.children = [c];
            node.result = a * c.result!;
          }
          break;
        }
        case 'power':
        case 'pow': {
          const [base, exp] = args.length >= 2 ? args : [2, args[0]];
          if (exp === 0) { node.result = 1; node.call = `pow(${base},0)`; }
          else if (exp === 1) { node.result = base; node.call = `pow(${base},1)`; }
          else {
            const half = Math.floor(exp / 2);
            node.call = `pow(${base},${exp})`;
            const c1 = build('pow', [base, half]);
            if (exp % 2 === 0) {
              node.children = [c1];
              node.result = c1.result! * c1.result!;
            } else {
              const c2 = build('pow', [base, exp - 1]);
              node.children = [c1, c2];
              node.result = base * c2.result!;
            }
          }
          break;
        }
        case 'mergesort':
        case 'ms': {
          const a = args[0];
          if (a <= 1) { node.result = a; node.call = `ms(${a})`; }
          else {
            node.call = `ms(${a})`;
            const half = Math.floor(a / 2);
            const c1 = build('ms', [half]);
            const c2 = build('ms', [a - half]);
            node.children = [c1, c2];
            node.result = a;
          }
          break;
        }
        default: {
          node.result = n;
        }
      }
      cache.set(key, node.result!);
      return node;
    };

    const fnName = fn === 'fibonacci' ? 'fib' : fn === 'factorial' ? 'fact' : fn === 'mergesort' ? 'ms' : fn === 'power' ? 'pow' : fn;
    const fnArgs = fn === 'power' ? [2, n] : [n];
    return build(fnName, fnArgs);
  }

  private _layoutTree(root: TreeNode): void {
    // Assign depth and leaf positions
    let leafX = 0;
    const assignX = (node: TreeNode, depth: number) => {
      node.y = depth;
      if (node.children.length === 0) {
        node.x = leafX++;
      } else {
        for (const c of node.children) assignX(c, depth + 1);
        node.x = node.children.reduce((s, c) => s + c.x, 0) / node.children.length;
      }
    };
    assignX(root, 0);
  }

  private _generateSteps(node: TreeNode, memo: Map<string, boolean>, showMemo: boolean, parentIdx?: number): void {
    const idx = this._allNodes.indexOf(node);

    if (showMemo && memo.has(node.call)) {
      this._steps.push({ nodeIdx: idx, action: 'show', edgeFrom: parentIdx });
      this._steps.push({ nodeIdx: idx, action: 'memo' });
      return;
    }

    this._steps.push({ nodeIdx: idx, action: 'show', edgeFrom: parentIdx });
    this._steps.push({ nodeIdx: idx, action: 'activate' });

    for (const child of node.children) {
      this._generateSteps(child, memo, showMemo, idx);
    }

    this._steps.push({ nodeIdx: idx, action: 'compute' });
    if (showMemo) memo.set(node.call, true);
  }

  private _doStep(): void {
    if (this._stepIdx >= this._steps.length - 1) {
      this._playing = false;
      this._renderView();
      return;
    }
    this._stepIdx++;
    const step = this._steps[this._stepIdx];
    const node = this._allNodes[step.nodeIdx];

    switch (step.action) {
      case 'show': node.state = 'pending'; break;
      case 'activate': node.state = 'active'; break;
      case 'compute': node.state = 'computed'; break;
      case 'memo': node.state = 'memo'; break;
    }
    this._renderView();
  }

  private _play(): void {
    if (this._playing) { this._playing = false; if (this._timer) clearTimeout(this._timer); this._renderView(); return; }
    this._playing = true;
    const speed = parseInt(this.getAttribute('speed') || '400', 10);
    const tick = () => {
      if (!this._playing || this._stepIdx >= this._steps.length - 1) { this._playing = false; this._renderView(); return; }
      this._doStep();
      this._timer = setTimeout(tick, speed);
    };
    tick();
  }

  private _reset(): void {
    this._playing = false;
    if (this._timer) clearTimeout(this._timer);
    this._stepIdx = -1;
    this._allNodes.forEach(n => n.state = 'hidden');
    this._renderView();
  }

  private _renderView(): void {
    if (!this._root) return;
    const nodes = this._allNodes;

    // Determine SVG dimensions
    let maxX = 0, maxY = 0;
    for (const n of nodes) { if (n.x > maxX) maxX = n.x; if (n.y > maxY) maxY = n.y; }
    const padX = 60, padY = 40;
    const spacingX = Math.max(70, Math.min(110, 600 / (maxX + 1)));
    const spacingY = 70;
    const svgW = (maxX + 1) * spacingX + padX * 2;
    const svgH = (maxY + 1) * spacingY + padY * 2;
    const nodeW = 56, nodeH = 32;

    const px = (n: TreeNode) => padX + n.x * spacingX + spacingX / 2;
    const py = (n: TreeNode) => padY + n.y * spacingY + spacingY / 2;

    // Edges
    let edgesSvg = '';
    for (const n of nodes) {
      if (n.state === 'hidden') continue;
      for (const c of n.children) {
        if (c.state === 'hidden') continue;
        const isActive = c.state === 'active';
        const stroke = isActive ? 'var(--lv-accent)' : 'var(--lv-border)';
        edgesSvg += `<line x1="${px(n)}" y1="${py(n) + nodeH / 2}" x2="${px(c)}" y2="${py(c) - nodeH / 2}" stroke="${stroke}" stroke-width="${isActive ? 2 : 1.5}"/>`;
      }
    }

    // Nodes
    let nodesSvg = '';
    const colors: Record<string, { fill: string; stroke: string }> = {
      hidden: { fill: 'transparent', stroke: 'transparent' },
      pending: { fill: 'var(--lv-bg-card)', stroke: 'var(--lv-border)' },
      active: { fill: 'rgba(59,130,246,0.15)', stroke: '#3b82f6' },
      computed: { fill: 'rgba(34,197,94,0.15)', stroke: '#22c55e' },
      memo: { fill: 'rgba(234,179,8,0.2)', stroke: '#eab308' },
    };

    for (const n of nodes) {
      if (n.state === 'hidden') continue;
      const cx = px(n), cy = py(n);
      const c = colors[n.state];
      nodesSvg += `<g>
        <rect x="${cx - nodeW / 2}" y="${cy - nodeH / 2}" width="${nodeW}" height="${nodeH}" rx="6" ry="6"
          fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>
        <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="10" fill="var(--lv-text)">${this._esc(n.call)}</text>`;
      if (n.state === 'computed' || n.state === 'memo') {
        nodesSvg += `<text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="10" font-weight="600"
          fill="${n.state === 'memo' ? '#eab308' : '#22c55e'}">${n.state === 'memo' ? 'memo: ' : '= '}${n.result}</text>`;
      }
      nodesSvg += `</g>`;
    }

    // Info text
    let info = '';
    if (this._stepIdx >= 0 && this._stepIdx < this._steps.length) {
      const step = this._steps[this._stepIdx];
      const n = nodes[step.nodeIdx];
      if (step.action === 'activate') info = `Calling ${n.call}...`;
      else if (step.action === 'compute') info = `${n.call} returns ${n.result}`;
      else if (step.action === 'memo') info = `Memo hit! ${n.call} = ${n.result}`;
    }
    if (this._stepIdx >= this._steps.length - 1 && this._stepIdx >= 0) info = 'Recursion complete.';

    const done = this._stepIdx >= this._steps.length - 1;

    const html = `<div class="rt-container">
      <svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="max-width:${Math.min(svgW, 800)}px;">
        ${edgesSvg}
        ${nodesSvg}
      </svg>
      <div class="info">${info}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-play">${this._playing ? 'Pause' : 'Play'}</button>
        <button id="btn-step" ${done ? 'disabled' : ''}>Step</button>
      </div>
      <div class="legend">
        <span><span class="dot" style="background:#888"></span> Pending</span>
        <span><span class="dot" style="background:#3b82f6"></span> Active</span>
        <span><span class="dot" style="background:#22c55e"></span> Computed</span>
        ${this.hasAttribute('show-memo') ? '<span><span class="dot" style="background:#eab308"></span> Memo</span>' : ''}
      </div>
    </div>`;

    this.render(html);
    this.root.getElementById('btn-play')?.addEventListener('click', () => this._play());
    this.root.getElementById('btn-step')?.addEventListener('click', () => this._doStep());
    this.root.getElementById('btn-reset')?.addEventListener('click', () => this._reset());
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-recursion-tree', LvRecursionTree);
export { LvRecursionTree };

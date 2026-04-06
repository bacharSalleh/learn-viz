import { LvBaseElement } from '../core/base-element.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .bp-container { width: 100%; overflow-x: auto; font-family: var(--lv-font); }
  svg { display: block; width: 100%; max-width: 700px; margin: 0 auto; }
  svg text { font-family: var(--lv-font); }
  .controls { display: flex; gap: 8px; justify-content: center; margin-top: var(--lv-sp-3); }
  .controls button {
    padding: 6px 16px; border-radius: var(--lv-r-sm); border: 1px solid var(--lv-border);
    background: var(--lv-bg-raised); color: var(--lv-text); font-family: var(--lv-font);
    cursor: pointer; font-size: 13px; transition: background 0.15s;
  }
  .controls button:hover { background: var(--lv-accent); color: #fff; }
  .controls button:disabled { opacity: 0.4; cursor: default; background: var(--lv-bg-raised); color: var(--lv-text-dim); }
  .explanation {
    text-align: center; margin-top: var(--lv-sp-3); font-size: 14px; color: var(--lv-text);
    font-family: var(--lv-font-mono); min-height: 1.6em; padding: 8px;
    background: var(--lv-bg-raised); border-radius: var(--lv-r-sm);
    max-width: 700px; margin-left: auto; margin-right: auto;
  }
  .phase-label {
    text-align: center; font-size: 12px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.05em; margin-top: var(--lv-sp-2); color: var(--lv-text-dim);
  }
  .phase-forward { color: #3b82f6; }
  .phase-backward { color: #ef4444; }
`;

interface GraphNode {
  id: string;
  op: string;
  value: number | null;
  grad: number | null;
  inputs: number[];
  compute: (vals: number[]) => number;
  localGrad: (vals: number[], outGrad: number) => number[];
}

class LvBackpropFlow extends LvBaseElement {
  private _hasAnimated = false;
  private _step = 0;
  private _nodes: GraphNode[] = [];
  private _totalForward = 0;
  private _phase: 'idle' | 'forward' | 'backward' = 'idle';

  static get observedAttributes() {
    return ['expression', 'values', 'speed'];
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
    const svg = this.root.querySelector('svg');
    if (svg) {
      svg.style.opacity = '0';
      svg.style.transition = 'opacity 0.5s ease-out';
      requestAnimationFrame(() => { svg.style.opacity = '1'; });
    }
  }

  private _build(): void {
    const expr = this.getAttribute('expression') || 'linear';
    const vals = this.jsonAttr<Record<string, number>>('values', { x: 2, w: 0.5, b: 0.1, y: 1 });

    this._nodes = this._buildGraph(expr, vals);
    this._totalForward = this._nodes.length;
    this._step = 0;
    this._phase = 'idle';

    this._renderView();
  }

  private _buildGraph(expr: string, v: Record<string, number>): GraphNode[] {
    const x = v.x ?? 2, w = v.w ?? 0.5, b = v.b ?? 0.1, y = v.y ?? 1;

    switch (expr) {
      case 'sigmoid': return [
        { id: 'x', op: 'x', value: null, grad: null, inputs: [], compute: () => x, localGrad: (_, g) => [g] },
        { id: 'w', op: 'w', value: null, grad: null, inputs: [], compute: () => w, localGrad: (_, g) => [g] },
        { id: 'mul', op: '\u00d7', value: null, grad: null, inputs: [0, 1],
          compute: (vs) => vs[0] * vs[1],
          localGrad: (vs, g) => [g * vs[1], g * vs[0]] },
        { id: 'b', op: 'b', value: null, grad: null, inputs: [], compute: () => b, localGrad: (_, g) => [g] },
        { id: 'add', op: '+', value: null, grad: null, inputs: [2, 3],
          compute: (vs) => vs[0] + vs[1],
          localGrad: (_, g) => [g, g] },
        { id: 'neg', op: 'neg', value: null, grad: null, inputs: [4],
          compute: (vs) => -vs[0],
          localGrad: (_, g) => [-g] },
        { id: 'exp', op: 'exp', value: null, grad: null, inputs: [5],
          compute: (vs) => Math.exp(vs[0]),
          localGrad: (vs, g) => [g * Math.exp(vs[0])] },
        { id: 'plus1', op: '+1', value: null, grad: null, inputs: [6],
          compute: (vs) => vs[0] + 1,
          localGrad: (_, g) => [g] },
        { id: 'inv', op: '1/x', value: null, grad: null, inputs: [7],
          compute: (vs) => 1 / vs[0],
          localGrad: (vs, g) => [-g / (vs[0] * vs[0])] },
      ];

      case 'mse': {
        const yhat = w * x + b;
        return [
          { id: 'y', op: 'y', value: null, grad: null, inputs: [], compute: () => y, localGrad: (_, g) => [g] },
          { id: 'yhat', op: '\u0177', value: null, grad: null, inputs: [], compute: () => yhat, localGrad: (_, g) => [g] },
          { id: 'sub', op: '\u2212', value: null, grad: null, inputs: [0, 1],
            compute: (vs) => vs[0] - vs[1],
            localGrad: (_, g) => [g, -g] },
          { id: 'sq', op: 'x\u00b2', value: null, grad: null, inputs: [2],
            compute: (vs) => vs[0] * vs[0],
            localGrad: (vs, g) => [2 * vs[0] * g] },
          { id: 'half', op: '/2', value: null, grad: null, inputs: [3],
            compute: (vs) => vs[0] / 2,
            localGrad: (_, g) => [g / 2] },
        ];
      }

      case 'chain': return [
        { id: 'x', op: 'x', value: null, grad: null, inputs: [], compute: () => x, localGrad: (_, g) => [g] },
        { id: 'sq', op: 'x\u00b2', value: null, grad: null, inputs: [0],
          compute: (vs) => vs[0] * vs[0],
          localGrad: (vs, g) => [2 * vs[0] * g] },
        { id: 'sin', op: 'sin', value: null, grad: null, inputs: [1],
          compute: (vs) => Math.sin(vs[0]),
          localGrad: (vs, g) => [Math.cos(vs[0]) * g] },
      ];

      default: // linear
        return [
          { id: 'x', op: 'x', value: null, grad: null, inputs: [], compute: () => x, localGrad: (_, g) => [g] },
          { id: 'w', op: 'w', value: null, grad: null, inputs: [], compute: () => w, localGrad: (_, g) => [g] },
          { id: 'mul', op: '\u00d7', value: null, grad: null, inputs: [0, 1],
            compute: (vs) => vs[0] * vs[1],
            localGrad: (vs, g) => [g * vs[1], g * vs[0]] },
          { id: 'b', op: 'b', value: null, grad: null, inputs: [], compute: () => b, localGrad: (_, g) => [g] },
          { id: 'add', op: '+', value: null, grad: null, inputs: [2, 3],
            compute: (vs) => vs[0] + vs[1],
            localGrad: (_, g) => [g, g] },
        ];
    }
  }

  private _fmt(n: number): string {
    return Math.abs(n) < 0.001 ? n.toExponential(2) : parseFloat(n.toFixed(4)).toString();
  }

  private _stepForward(): void {
    if (this._phase === 'idle') this._phase = 'forward';
    if (this._phase !== 'forward') return;
    if (this._step >= this._nodes.length) {
      this._phase = 'backward';
      this._nodes[this._nodes.length - 1].grad = 1;
      this._step = this._nodes.length - 1;
      this._renderView();
      return;
    }
    const node = this._nodes[this._step];
    const inputVals = node.inputs.map(i => this._nodes[i].value!);
    node.value = node.compute(inputVals);
    this._step++;
    this._renderView();
  }

  private _stepBackward(): void {
    if (this._phase !== 'backward') return;
    if (this._step < 0) return;

    const node = this._nodes[this._step];
    if (node.inputs.length > 0) {
      const inputVals = node.inputs.map(i => this._nodes[i].value!);
      const grads = node.localGrad(inputVals, node.grad!);
      node.inputs.forEach((inp, j) => {
        this._nodes[inp].grad = (this._nodes[inp].grad ?? 0) + grads[j];
      });
    }
    this._step--;
    this._renderView();
  }

  private _reset(): void {
    this._nodes.forEach(n => { n.value = null; n.grad = null; });
    this._step = 0;
    this._phase = 'idle';
    this._renderView();
  }

  private _renderView(): void {
    const nodes = this._nodes;
    const N = nodes.length;
    const W = 650, H = 260;
    const nodeW = 64, nodeH = 58;
    const startX = 30;
    const gapX = (W - 60 - nodeW) / Math.max(N - 1, 1);
    const cy = 100;

    // Build edges SVG
    let edgesSvg = '';
    for (let i = 0; i < N; i++) {
      const nx = startX + i * gapX + nodeW / 2;
      for (const inp of nodes[i].inputs) {
        const sx = startX + inp * gapX + nodeW / 2;
        const active = this._phase === 'forward' && this._step === i;
        const backActive = this._phase === 'backward' && this._step === i;
        const stroke = active ? '#3b82f6' : backActive ? '#ef4444' : 'var(--lv-border)';
        const sw = active || backActive ? 2.5 : 1.5;
        edgesSvg += `<line x1="${sx}" y1="${cy}" x2="${nx}" y2="${cy}" stroke="${stroke}" stroke-width="${sw}" marker-end="url(#arrow)"/>`;
      }
    }

    // Build nodes SVG
    let nodesSvg = '';
    for (let i = 0; i < N; i++) {
      const nx = startX + i * gapX;
      const isActiveForward = this._phase === 'forward' && this._step === i;
      const justComputed = this._phase === 'forward' && i < this._step;
      const isActiveBackward = this._phase === 'backward' && this._step === i;
      const hasGrad = nodes[i].grad !== null;

      let strokeColor = 'var(--lv-border)';
      let fillColor = 'var(--lv-bg-card)';
      if (isActiveForward) { strokeColor = '#3b82f6'; fillColor = 'rgba(59,130,246,0.15)'; }
      else if (isActiveBackward) { strokeColor = '#ef4444'; fillColor = 'rgba(239,68,68,0.15)'; }
      else if (justComputed) { strokeColor = 'var(--lv-accent)'; }

      nodesSvg += `<g>
        <rect x="${nx}" y="${cy - nodeH / 2}" width="${nodeW}" height="${nodeH}" rx="8" ry="8"
          fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isActiveForward || isActiveBackward ? 2.5 : 1.5}"/>
        <text x="${nx + nodeW / 2}" y="${cy - 8}" text-anchor="middle" font-size="13" font-weight="600"
          fill="var(--lv-text)">${this._esc(nodes[i].op)}</text>
        <text x="${nx + nodeW / 2}" y="${cy + 14}" text-anchor="middle" font-size="11"
          fill="var(--lv-text-dim)">${nodes[i].value !== null ? this._fmt(nodes[i].value!) : ''}</text>`;

      if (hasGrad) {
        nodesSvg += `<text x="${nx + nodeW / 2}" y="${cy + nodeH / 2 + 18}" text-anchor="middle" font-size="10"
          fill="#ef4444">\u2202=${this._fmt(nodes[i].grad!)}</text>`;
      }
      nodesSvg += `</g>`;
    }

    // Explanation text
    let explain = '';
    if (this._phase === 'forward' && this._step > 0 && this._step <= N) {
      const n = nodes[this._step - 1];
      if (n.inputs.length > 0) {
        const inputOps = n.inputs.map(i => nodes[i].op).join(', ');
        explain = `Forward: ${n.op}(${inputOps}) = ${this._fmt(n.value!)}`;
      } else {
        explain = `Forward: ${n.op} = ${this._fmt(n.value!)}`;
      }
    } else if (this._phase === 'backward') {
      if (this._step >= 0 && this._step < N) {
        const n = nodes[this._step];
        explain = `Backward: propagating gradient at ${n.op}, \u2202=${this._fmt(n.grad!)}`;
      } else {
        explain = 'Backward pass complete.';
      }
    } else if (this._phase === 'idle') {
      explain = 'Press Step Forward to begin the forward pass.';
    }

    const canStepFwd = this._phase === 'idle' || (this._phase === 'forward' && this._step <= N);
    const canStepBwd = this._phase === 'backward' && this._step >= 0;

    const phaseClass = this._phase === 'forward' ? 'phase-forward' : this._phase === 'backward' ? 'phase-backward' : '';
    const phaseText = this._phase === 'forward' ? 'Forward Pass' : this._phase === 'backward' ? 'Backward Pass' : '';

    const html = `<div class="bp-container">
      <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Computational graph">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="var(--lv-text-dim)"/>
          </marker>
        </defs>
        ${edgesSvg}
        ${nodesSvg}
      </svg>
      ${phaseText ? `<div class="phase-label ${phaseClass}">${phaseText} (step ${this._phase === 'forward' ? this._step : N - this._step} / ${N})</div>` : ''}
      <div class="explanation">${explain}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-step-fwd" ${canStepFwd ? '' : 'disabled'}>Step Forward \u25b6</button>
        <button id="btn-step-bwd" ${canStepBwd ? '' : 'disabled'}>Step Backward \u25c0</button>
      </div>
    </div>`;

    this.render(html);
    this.root.getElementById('btn-step-fwd')?.addEventListener('click', () => this._stepForward());
    this.root.getElementById('btn-step-bwd')?.addEventListener('click', () => this._stepBackward());
    this.root.getElementById('btn-reset')?.addEventListener('click', () => this._reset());
  }

  private _esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('lv-backprop-flow', LvBackpropFlow);
export { LvBackpropFlow };

import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .graph-container { width: 100%; }
  svg { display: block; margin: 0 auto; }
  .controls { display: flex; gap: 8px; align-items: center; justify-content: center; margin-top: 8px; flex-wrap: wrap; }
  .controls button {
    background: #1a1a2e; color: #e4e4ec; border: 1px solid #2a2a4a; border-radius: 4px;
    padding: 4px 12px; font-family: var(--lv-font, sans-serif); font-size: 12px; cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .controls button:hover { background: #2a2a4a; border-color: #00d4ff; }
  .controls button:disabled { opacity: 0.4; cursor: default; }
  .info { font-family: var(--lv-font-mono, monospace); font-size: 12px; color: var(--lv-text-dim, #888); text-align: center; margin-top: 4px; min-height: 18px; }
  .node-label { font-family: var(--lv-font, sans-serif); font-size: 12px; fill: #fff; pointer-events: none; text-anchor: middle; dominant-baseline: central; }
  .dist-label { font-family: var(--lv-font-mono, monospace); font-size: 10px; fill: #ffd93d; text-anchor: middle; }
`;

interface GraphNode { id: string; x?: number; y?: number; }
interface GraphEdge { source: string; target: string; weight?: number; }
interface AlgoStep {
  type: 'visit' | 'enqueue' | 'dequeue' | 'relax' | 'update';
  node: string;
  from?: string;
  distance?: number;
}

class LvGraphAlgo extends LvBaseElement {
  private _hasAnimated = false;
  private _steps: AlgoStep[] = [];
  private _currentStep = 0;
  private _playing = false;
  private _timer: number | null = null;
  private _nodeStates: Map<string, string> = new Map();
  private _edgeStates: Map<string, string> = new Map();
  private _distances: Map<string, number> = new Map();
  private _queueState: string[] = [];

  static get observedAttributes() {
    return ['nodes', 'edges', 'algorithm', 'start', 'directed', 'speed'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._build();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopTimer();
  }

  handleAttributeChange() {
    if (this.isConnected) this._build();
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
  }

  private _stopTimer(): void {
    if (this._timer !== null) { clearInterval(this._timer); this._timer = null; }
    this._playing = false;
  }

  private _getSpeed(): number { return parseInt(this.getAttribute('speed') || '500', 10); }
  private _getAlgorithm(): string { return this.getAttribute('algorithm') || 'bfs'; }
  private _isDirected(): boolean { return this.hasAttribute('directed'); }

  private _getNodes(): GraphNode[] {
    return this.jsonAttr<GraphNode[]>('nodes', []);
  }

  private _getEdges(): GraphEdge[] {
    return this.jsonAttr<GraphEdge[]>('edges', []);
  }

  private _layoutNodes(nodes: GraphNode[]): GraphNode[] {
    const cx = 250, cy = 180, r = 140;
    return nodes.map((n, i) => {
      if (n.x != null && n.y != null) return n;
      const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
      return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  }

  private _buildAdj(nodes: GraphNode[], edges: GraphEdge[]): Map<string, { id: string; weight: number }[]> {
    const adj = new Map<string, { id: string; weight: number }[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
      adj.get(e.source)?.push({ id: e.target, weight: e.weight ?? 1 });
      if (!this._isDirected()) {
        adj.get(e.target)?.push({ id: e.source, weight: e.weight ?? 1 });
      }
    });
    return adj;
  }

  private _generateSteps(nodes: GraphNode[], edges: GraphEdge[]): AlgoStep[] {
    const adj = this._buildAdj(nodes, edges);
    const startId = this.getAttribute('start') || (nodes.length > 0 ? nodes[0].id : '');
    const algo = this._getAlgorithm();
    const steps: AlgoStep[] = [];
    const visited = new Set<string>();

    if (algo === 'bfs') {
      const queue: string[] = [startId];
      steps.push({ type: 'enqueue', node: startId });
      visited.add(startId);
      while (queue.length > 0) {
        const cur = queue.shift()!;
        steps.push({ type: 'dequeue', node: cur });
        steps.push({ type: 'visit', node: cur });
        for (const nb of (adj.get(cur) || [])) {
          if (!visited.has(nb.id)) {
            visited.add(nb.id);
            steps.push({ type: 'enqueue', node: nb.id, from: cur });
            queue.push(nb.id);
          }
        }
      }
    } else if (algo === 'dfs') {
      const stack: string[] = [startId];
      steps.push({ type: 'enqueue', node: startId }); // enqueue = push to stack
      while (stack.length > 0) {
        const cur = stack.pop()!;
        if (visited.has(cur)) continue;
        visited.add(cur);
        steps.push({ type: 'dequeue', node: cur });
        steps.push({ type: 'visit', node: cur });
        const neighbors = adj.get(cur) || [];
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const nb = neighbors[i];
          if (!visited.has(nb.id)) {
            steps.push({ type: 'enqueue', node: nb.id, from: cur });
            stack.push(nb.id);
          }
        }
      }
    } else if (algo === 'dijkstra') {
      const dist = new Map<string, number>();
      nodes.forEach(n => dist.set(n.id, Infinity));
      dist.set(startId, 0);
      const pq: { id: string; dist: number }[] = [{ id: startId, dist: 0 }];
      steps.push({ type: 'update', node: startId, distance: 0 });

      while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        const cur = pq.shift()!;
        if (visited.has(cur.id)) continue;
        visited.add(cur.id);
        steps.push({ type: 'visit', node: cur.id, distance: cur.dist });
        for (const nb of (adj.get(cur.id) || [])) {
          const newDist = cur.dist + nb.weight;
          if (newDist < (dist.get(nb.id) ?? Infinity)) {
            dist.set(nb.id, newDist);
            steps.push({ type: 'relax', node: nb.id, from: cur.id, distance: newDist });
            pq.push({ id: nb.id, dist: newDist });
          }
        }
      }
    }

    return steps;
  }

  private _play(): void {
    if (this._playing) return;
    this._playing = true;
    this._updateButtons();
    this._timer = window.setInterval(() => {
      if (this._currentStep >= this._steps.length) {
        this._stopTimer(); this._updateButtons(); return;
      }
      this._stepForward();
    }, this._getSpeed());
  }

  private _pause(): void { this._stopTimer(); this._updateButtons(); }

  private _resetState(): void {
    this._stopTimer();
    this._currentStep = 0;
    this._nodeStates.clear();
    this._edgeStates.clear();
    this._distances.clear();
    this._queueState = [];
    this._renderGraph();
    this._updateInfo();
    this._updateButtons();
  }

  private _stepForward(): void {
    if (this._currentStep >= this._steps.length) return;
    const step = this._steps[this._currentStep];
    this._applyStep(step);
    this._currentStep++;
    this._renderGraph();
    this._updateInfo();
    if (this._currentStep >= this._steps.length) { this._stopTimer(); this._updateButtons(); }
  }

  private _applyStep(step: AlgoStep): void {
    const algo = this._getAlgorithm();
    if (step.type === 'visit') {
      this._nodeStates.set(step.node, 'visited');
      // remove from queue display
      const idx = this._queueState.indexOf(step.node);
      if (idx >= 0) this._queueState.splice(idx, 1);
    } else if (step.type === 'enqueue') {
      if (!this._nodeStates.has(step.node) || this._nodeStates.get(step.node) === 'unvisited') {
        this._nodeStates.set(step.node, 'queued');
      }
      this._queueState.push(step.node);
      if (step.from) {
        const ek = this._edgeKey(step.from, step.node);
        this._edgeStates.set(ek, 'active');
      }
    } else if (step.type === 'dequeue') {
      this._nodeStates.set(step.node, 'visiting');
      const idx = this._queueState.indexOf(step.node);
      if (idx >= 0) this._queueState.splice(idx, 1);
    } else if (step.type === 'relax') {
      if (step.distance != null) this._distances.set(step.node, step.distance);
      if (!this._nodeStates.has(step.node) || this._nodeStates.get(step.node) !== 'visited') {
        this._nodeStates.set(step.node, 'queued');
      }
      if (step.from) {
        const ek = this._edgeKey(step.from, step.node);
        this._edgeStates.set(ek, 'active');
      }
    } else if (step.type === 'update') {
      if (step.distance != null) this._distances.set(step.node, step.distance);
    }
  }

  private _edgeKey(a: string, b: string): string {
    if (this._isDirected()) return `${a}->${b}`;
    return a < b ? `${a}->${b}` : `${b}->${a}`;
  }

  private _nodeColor(state: string | undefined): string {
    switch (state) {
      case 'queued': return '#ffd93d';
      case 'visiting': return '#00d4ff';
      case 'visited': return '#22c55e';
      default: return '#666';
    }
  }

  private _renderGraph(): void {
    const svg = d3.select(this.root.querySelector('svg')!);
    const nodes = this._layoutNodes(this._getNodes());
    const edges = this._getEdges();
    const directed = this._isDirected();
    const isDijkstra = this._getAlgorithm() === 'dijkstra';

    const g = svg.select<SVGGElement>('.graph-group');
    if (g.empty()) return;
    g.selectAll('*').remove();

    // Arrow marker
    if (directed) {
      svg.select('defs').remove();
      svg.append('defs').append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 28).attr('refY', 5)
        .attr('markerWidth', 6).attr('markerHeight', 6)
        .attr('orient', 'auto-start-reverse')
        .append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', '#666');
    }

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Edges
    edges.forEach(e => {
      const s = nodeMap.get(e.source);
      const t = nodeMap.get(e.target);
      if (!s || !t) return;
      const ek = this._edgeKey(e.source, e.target);
      const isActive = this._edgeStates.get(ek) === 'active';
      const line = g.append('line')
        .attr('x1', s.x!).attr('y1', s.y!)
        .attr('x2', t.x!).attr('y2', t.y!)
        .attr('stroke', isActive ? '#f59e0b' : '#444')
        .attr('stroke-width', isActive ? 2.5 : 1.5);
      if (directed) line.attr('marker-end', 'url(#arrow)');

      // Weight label
      if (e.weight != null) {
        g.append('text')
          .attr('x', (s.x! + t.x!) / 2)
          .attr('y', (s.y! + t.y!) / 2 - 8)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('fill', '#888')
          .text(String(e.weight));
      }
    });

    // Nodes
    nodes.forEach(n => {
      const state = this._nodeStates.get(n.id);
      const color = this._nodeColor(state);
      g.append('circle')
        .attr('cx', n.x!).attr('cy', n.y!).attr('r', 20)
        .attr('fill', color).attr('stroke', '#222').attr('stroke-width', 2);
      g.append('text')
        .attr('class', 'node-label')
        .attr('x', n.x!).attr('y', n.y!)
        .text(n.id);

      // Dijkstra distance labels
      if (isDijkstra && this._distances.has(n.id)) {
        const d = this._distances.get(n.id)!;
        g.append('text')
          .attr('class', 'dist-label')
          .attr('x', n.x!).attr('y', n.y! - 28)
          .text(d === Infinity ? '\u221E' : String(d));
      }
    });
  }

  private _updateInfo(): void {
    const infoEl = this.root.querySelector('.info') as HTMLElement;
    if (!infoEl) return;
    const algo = this._getAlgorithm();
    const label = algo === 'dfs' ? 'Stack' : 'Queue';
    infoEl.textContent = `${algo.toUpperCase()} — Step ${this._currentStep}/${this._steps.length} | ${label}: [${this._queueState.join(', ')}]`;
  }

  private _updateButtons(): void {
    const playBtn = this.root.querySelector('.btn-play') as HTMLButtonElement;
    const stepBtn = this.root.querySelector('.btn-step') as HTMLButtonElement;
    if (playBtn) playBtn.textContent = this._playing ? 'Pause' : 'Play';
    if (stepBtn) stepBtn.disabled = this._playing || this._currentStep >= this._steps.length;
  }

  private _build(): void {
    this._stopTimer();
    const nodes = this._layoutNodes(this._getNodes());
    const edges = this._getEdges();

    if (nodes.length === 0) {
      this.render('<div class="graph-container"></div>');
      return;
    }

    this._steps = this._generateSteps(nodes, edges);
    this._currentStep = 0;
    this._nodeStates.clear();
    this._edgeStates.clear();
    this._distances.clear();
    this._queueState = [];

    const W = 500, H = 400;
    this.render(`<div class="graph-container">
      <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
        <g class="graph-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`);

    this._renderGraph();
    this._updateInfo();

    this.root.querySelector('.btn-play')!.addEventListener('click', () => {
      this._playing ? this._pause() : this._play();
    });
    this.root.querySelector('.btn-step')!.addEventListener('click', () => {
      if (!this._playing) this._stepForward();
    });
    this.root.querySelector('.btn-reset')!.addEventListener('click', () => this._resetState());
  }
}

customElements.define('lv-graph-algo', LvGraphAlgo);
export { LvGraphAlgo };

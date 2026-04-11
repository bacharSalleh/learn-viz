import { LvBaseElement } from '../core/base-element.js';
import { CanvasChart } from '../core/canvas.js';
import { formatNum } from '../core/utils.js';

const css = `
  :host { display: block; }
  .lv-nn-wrap { position: relative; width: 100%; }
  .lv-nn-chart { position: relative; width: 100%; height: 450px; }
`;

interface NodeInfo {
  x: number;
  y: number;
  layer: number;
  index: number;
  value?: number;
}

interface EdgeInfo {
  srcLayer: number;
  srcIdx: number;
  dstLayer: number;
  dstIdx: number;
  weight?: number;
  x1: number; y1: number;
  x2: number; y2: number;
}

class LvNeuralNet extends LvBaseElement {
  static get observedAttributes() {
    return ['layers', 'weights', 'values', 'input-labels', 'output-labels',
            'input-colors', 'output-colors', 'animate'];
  }

  private _chart: CanvasChart | null = null;
  private _nodes: NodeInfo[] = [];
  private _edges: EdgeInfo[] = [];
  private _layers: number[] = [];
  private _built = false;
  private _hasAnimated = false;
  private _animRaf = 0;
  private _animProgress = 0;

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    const layersAttr = this.jsonAttr<number[]>('layers', [2, 3, 2]);
    const totalNodes = layersAttr.reduce((a, b) => a + b, 0);
    const paramCount = layersAttr.reduce((sum, n, i) => i > 0 ? sum + layersAttr[i - 1] * n : sum, 0);

    this.root.innerHTML = `
      <div class="lv-nn-wrap" role="img" aria-label="Neural network with ${layersAttr.length} layers: [${layersAttr.join(', ')}] nodes. ${paramCount} total parameters.">
        <div class="lv-nn-chart"></div>
        <p style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">
          Neural network diagram with ${layersAttr.length} layers containing ${totalNodes} nodes and ${paramCount} weighted connections.
        </p>
      </div>
    `;
    this._setup();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = null;
    if (this._animRaf) cancelAnimationFrame(this._animRaf);
  }

  handleAttributeChange() {
    if (!this._built) return;
    this._computeLayout();
    this._drawStatic();
  }

  private _setup() {
    const container = this.root.querySelector('.lv-nn-chart') as HTMLElement;
    if (!container) return;

    this._chart = new CanvasChart(this, container, {
      padding: { top: 30, right: 60, bottom: 30, left: 60 },
      onResize: () => { this._computeLayout(); this._drawStatic(); },
    });

    this._chart.onHover((e) => this._handleHover(e));
    this._chart.onLeave(() => this._handleLeave());

    this._computeLayout();
    this._drawStatic();
    this._built = true;
  }

  private _computeLayout() {
    const c = this._chart;
    if (!c) return;

    this._layers = this.jsonAttr<number[]>('layers', [2, 3, 2]);
    const weights = this.jsonAttr<number[][] | null>('weights', null);
    const values = this.jsonAttr<number[][] | null>('values', null);
    const numLayers = this._layers.length;
    const maxNodes = Math.max(...this._layers);

    this._nodes = [];
    this._edges = [];

    // Compute node radius — fit all nodes with spacing inside plotHeight
    // Each column needs: maxNodes * 2R for diameters + (maxNodes-1) * 0.8R for gaps = (2.8*maxNodes - 0.8)*R
    // Solve: R = plotHeight / (2.8 * maxNodes - 0.8 + 2)  (the +2 adds 1R padding top and bottom)
    const nodeR = Math.min(22, c.plotHeight / (2.8 * maxNodes + 1.2), c.plotWidth / (4 * numLayers));
    const spacing = nodeR * 2.8;

    // Compute positions
    for (let li = 0; li < numLayers; li++) {
      const count = this._layers[li];
      const x = c.plotX + (numLayers === 1 ? c.plotWidth / 2 : (li / (numLayers - 1)) * c.plotWidth);
      const totalH = (count - 1) * spacing;
      const startY = c.plotY + c.plotHeight / 2 - totalH / 2;

      for (let ni = 0; ni < count; ni++) {
        const y = count === 1 ? c.plotY + c.plotHeight / 2 : startY + ni * spacing;
        const val = values?.[li]?.[ni];
        this._nodes.push({ x, y, layer: li, index: ni, value: val });
      }
    }

    // Compute edges
    let edgeIdx = 0;
    for (let li = 0; li < numLayers - 1; li++) {
      const srcNodes = this._nodes.filter(n => n.layer === li);
      const dstNodes = this._nodes.filter(n => n.layer === li + 1);
      for (const src of srcNodes) {
        for (const dst of dstNodes) {
          const angle = Math.atan2(dst.y - src.y, dst.x - src.x);
          const w = weights ? this._getWeight(weights, li, src.index, dst.index, edgeIdx) : undefined;
          this._edges.push({
            srcLayer: li, srcIdx: src.index,
            dstLayer: li + 1, dstIdx: dst.index,
            weight: w,
            x1: src.x + Math.cos(angle) * nodeR,
            y1: src.y + Math.sin(angle) * nodeR,
            x2: dst.x - Math.cos(angle) * nodeR,
            y2: dst.y - Math.sin(angle) * nodeR,
          });
          edgeIdx++;
        }
      }
    }
  }

  private _getWeight(weights: number[][], layerIdx: number, srcIdx: number, dstIdx: number, flatIdx: number): number {
    // Support flat array or nested by layer
    if (weights.length > 0 && Array.isArray(weights[0])) {
      const layer = weights[layerIdx];
      if (layer) {
        const idx = srcIdx * (this._layers[layerIdx + 1] || 1) + dstIdx;
        return layer[idx] ?? 0;
      }
    }
    // Flat array fallback
    return (weights as unknown as number[])[flatIdx] ?? 0;
  }

  private _drawStatic() {
    const c = this._chart;
    if (!c) return;
    c.clear('static');

    const ctx = c.staticCtx;
    const layers = this._layers;
    const numLayers = layers.length;
    const maxNodes = Math.max(...layers);
    const nodeR = Math.min(22, c.plotHeight / (2 * maxNodes + 1), c.plotWidth / (4 * numLayers));

    const inputColors = (this.getAttribute('input-colors') || '').split(',').map(s => s.trim()).filter(Boolean);
    const outputColors = (this.getAttribute('output-colors') || '').split(',').map(s => s.trim()).filter(Boolean);
    const inputLabels = (this.getAttribute('input-labels') || '').split(',').map(s => s.trim()).filter(Boolean);
    const outputLabels = (this.getAttribute('output-labels') || '').split(',').map(s => s.trim()).filter(Boolean);

    const hasWeights = this._edges.some(e => e.weight !== undefined);
    const maxW = hasWeights ? Math.max(...this._edges.map(e => Math.abs(e.weight ?? 0)), 0.001) : 1;

    // Determine animation visibility per layer
    const animLayerProgress = (layerIdx: number): number => {
      if (this._animProgress >= 1) return 1;
      const perLayer = 1 / numLayers;
      const layerStart = layerIdx * perLayer;
      return Math.max(0, Math.min(1, (this._animProgress - layerStart) / perLayer));
    };

    // Draw edges
    for (const e of this._edges) {
      const progress = Math.min(animLayerProgress(e.srcLayer), animLayerProgress(e.dstLayer));
      if (progress <= 0) continue;

      let alpha: number;
      let width: number;
      let color: string;

      if (hasWeights) {
        const normW = Math.abs(e.weight ?? 0) / maxW;
        alpha = (0.08 + 0.6 * normW) * progress;
        width = 0.5 + 2 * normW;
        const isPositive = (e.weight ?? 0) >= 0;
        color = isPositive
          ? (c.getThemeColor('--lv-accent') || '#3b82f6')
          : (c.getThemeColor('--lv-text-dim') || '#888');
      } else {
        alpha = 0.25 * progress;
        width = 1;
        color = c.getThemeColor('--lv-text-dim') || '#666';
      }

      ctx.save();
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.stroke();
      ctx.restore();
    }

    // Draw nodes
    const bgColor = c.getThemeColor('--lv-bg-card') || '#1a1a2e';
    const textColor = c.getThemeColor('--lv-text') || '#e4e4ec';
    const borderColor = c.getThemeColor('--lv-border') || '#2a2a4a';

    for (const n of this._nodes) {
      const progress = animLayerProgress(n.layer);
      if (progress <= 0) continue;

      const isInput = n.layer === 0;
      const isOutput = n.layer === numLayers - 1;
      let strokeColor = borderColor;
      let strokeWidth = 1.5;

      if (isInput && inputColors[n.index]) {
        strokeColor = inputColors[n.index];
        strokeWidth = 2.5;
      } else if (isOutput && outputColors[n.index]) {
        strokeColor = outputColors[n.index];
        strokeWidth = 2.5;
      }

      ctx.save();
      ctx.globalAlpha = progress;

      // Node circle
      c.drawCircle(ctx, n.x, n.y, nodeR, {
        fill: bgColor,
        stroke: strokeColor,
        strokeWidth,
      });

      // Value text or inner dot
      if (n.value !== undefined) {
        c.drawText(ctx, formatNum(n.value), n.x, n.y, {
          color: textColor,
          size: Math.min(11, nodeR * 0.8),
          align: 'center',
          baseline: 'middle',
        });
      } else {
        // Inner dot so nodes don't look empty
        c.drawCircle(ctx, n.x, n.y, nodeR * 0.35, {
          fill: strokeColor,
          opacity: 0.4,
        });
      }

      ctx.restore();

      // Labels outside
      if (isInput && inputLabels[n.index]) {
        c.drawText(ctx, inputLabels[n.index], n.x - nodeR - 10, n.y, {
          color: c.getThemeColor('--lv-text-dim') || '#888',
          size: 11,
          align: 'right',
          baseline: 'middle',
        });
      }
      if (isOutput && outputLabels[n.index]) {
        c.drawText(ctx, outputLabels[n.index], n.x + nodeR + 10, n.y, {
          color: c.getThemeColor('--lv-text-dim') || '#888',
          size: 11,
          align: 'left',
          baseline: 'middle',
        });
      }
    }
  }

  private _handleHover(e: { canvasX: number; canvasY: number }) {
    const c = this._chart;
    if (!c) return;
    c.clear('overlay');

    const ctx = c.overlayCtx;
    const layers = this._layers;
    const numLayers = layers.length;
    const maxNodes = Math.max(...layers);
    const nodeR = Math.min(22, c.plotHeight / (2 * maxNodes + 1), c.plotWidth / (4 * numLayers));

    // Check if hovering a node
    let hoveredNode: NodeInfo | null = null;
    for (const n of this._nodes) {
      const dx = e.canvasX - n.x;
      const dy = e.canvasY - n.y;
      if (dx * dx + dy * dy <= (nodeR + 4) * (nodeR + 4)) {
        hoveredNode = n;
        break;
      }
    }

    if (hoveredNode) {
      // Highlight connected edges
      for (const edge of this._edges) {
        const connected =
          (edge.srcLayer === hoveredNode.layer && edge.srcIdx === hoveredNode.index) ||
          (edge.dstLayer === hoveredNode.layer && edge.dstIdx === hoveredNode.index);
        if (!connected) continue;

        ctx.save();
        ctx.strokeStyle = c.getThemeColor('--lv-accent') || '#3b82f6';
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(edge.x1, edge.y1);
        ctx.lineTo(edge.x2, edge.y2);
        ctx.stroke();
        ctx.restore();
      }

      // Highlight node
      c.drawCircle(ctx, hoveredNode.x, hoveredNode.y, nodeR + 2, {
        stroke: c.getThemeColor('--lv-accent') || '#3b82f6',
        strokeWidth: 2,
        opacity: 0.8,
      });

      // Tooltip
      if (hoveredNode.value !== undefined) {
        c.showTooltip(
          `<div>Layer ${hoveredNode.layer}, Node ${hoveredNode.index}</div><div><strong>${formatNum(hoveredNode.value)}</strong></div>`,
          e.canvasX, e.canvasY
        );
      }
      return;
    }

    // Check if hovering an edge
    for (const edge of this._edges) {
      const dist = this._pointToSegmentDist(e.canvasX, e.canvasY, edge.x1, edge.y1, edge.x2, edge.y2);
      if (dist < 6) {
        ctx.save();
        ctx.strokeStyle = c.getThemeColor('--lv-accent') || '#3b82f6';
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(edge.x1, edge.y1);
        ctx.lineTo(edge.x2, edge.y2);
        ctx.stroke();
        ctx.restore();

        if (edge.weight !== undefined) {
          c.showTooltip(`<div>Weight: <strong>${formatNum(edge.weight)}</strong></div>`, e.canvasX, e.canvasY);
        }
        return;
      }
    }

    c.hideTooltip();
  }

  private _handleLeave() {
    const c = this._chart;
    if (!c) return;
    c.clear('overlay');
    c.hideTooltip();
  }

  private _pointToSegmentDist(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  animateIn(instant?: boolean) {
    if (this._hasAnimated) return;
    this._hasAnimated = true;

    const shouldAnimate = this.hasAttribute('animate');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (instant || !shouldAnimate || prefersReduced) {
      this._animProgress = 1;
      this._drawStatic();
      return;
    }

    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      this._animProgress = Math.min(1, elapsed / duration);
      this._drawStatic();
      if (this._animProgress < 1) {
        this._animRaf = requestAnimationFrame(tick);
      }
    };
    this._animRaf = requestAnimationFrame(tick);
  }
}

customElements.define('lv-neural-net', LvNeuralNet);
export { LvNeuralNet };

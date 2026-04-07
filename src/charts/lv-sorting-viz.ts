import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sort-container { width: 100%; }
  svg { display: block; margin: 0 auto; }
  .controls { display: flex; gap: 8px; align-items: center; justify-content: center; margin-top: 8px; flex-wrap: wrap; }
  .controls button {
    background: #1a1a2e; color: #e4e4ec; border: 1px solid #2a2a4a; border-radius: 4px;
    padding: 4px 12px; font-family: var(--lv-font, sans-serif); font-size: 12px; cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .controls button:hover { background: #2a2a4a; border-color: #00d4ff; }
  .controls button:disabled { opacity: 0.4; cursor: default; }
  .info { font-family: var(--lv-font-mono, monospace); font-size: 12px; color: var(--lv-text-dim, #888); text-align: center; margin-top: 4px; }
`;

interface SortStep {
  type: 'compare' | 'swap' | 'sorted';
  indices: number[];
}

class LvSortingViz extends LvBaseElement {
  private _hasAnimated = false;
  private _steps: SortStep[] = [];
  private _currentStep = 0;
  private _arr: number[] = [];
  private _playing = false;
  private _timer: number | null = null;

  static get observedAttributes() {
    return ['data', 'algorithm', 'speed', 'auto-play'];
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
    if (!instant && this.hasAttribute('auto-play')) {
      this._play();
    }
  }

  private _stopTimer(): void {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._playing = false;
  }

  private _getSpeed(): number {
    return parseInt(this.getAttribute('speed') || '100', 10);
  }

  private _getAlgorithm(): string {
    return this.getAttribute('algorithm') || 'bubble';
  }

  private _getData(): number[] {
    const d = this.jsonAttr<number[]>('data', []);
    if (d.length > 0) return d.slice();
    const arr: number[] = [];
    for (let i = 0; i < 20; i++) arr.push(Math.floor(Math.random() * 100) + 5);
    return arr;
  }

  private _generateSteps(arr: number[]): SortStep[] {
    const a = arr.slice();
    const steps: SortStep[] = [];
    const algo = this._getAlgorithm();

    if (algo === 'bubble') {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          steps.push({ type: 'compare', indices: [j, j + 1] });
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            steps.push({ type: 'swap', indices: [j, j + 1] });
          }
        }
        steps.push({ type: 'sorted', indices: [a.length - i - 1] });
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < a.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          steps.push({ type: 'compare', indices: [minIdx, j] });
          if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          [a[i], a[minIdx]] = [a[minIdx], a[i]];
          steps.push({ type: 'swap', indices: [i, minIdx] });
        }
        steps.push({ type: 'sorted', indices: [i] });
      }
      steps.push({ type: 'sorted', indices: [a.length - 1] });
    } else if (algo === 'insertion') {
      steps.push({ type: 'sorted', indices: [0] });
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0) {
          steps.push({ type: 'compare', indices: [j - 1, j] });
          if (a[j - 1] > a[j]) {
            [a[j - 1], a[j]] = [a[j], a[j - 1]];
            steps.push({ type: 'swap', indices: [j - 1, j] });
            j--;
          } else {
            break;
          }
        }
      }
      for (let i = 0; i < a.length; i++) steps.push({ type: 'sorted', indices: [i] });
    } else if (algo === 'merge') {
      this._mergeSortSteps(a, 0, a.length - 1, steps);
      for (let i = 0; i < a.length; i++) steps.push({ type: 'sorted', indices: [i] });
    } else if (algo === 'quick') {
      this._quickSortSteps(a, 0, a.length - 1, steps);
      for (let i = 0; i < a.length; i++) steps.push({ type: 'sorted', indices: [i] });
    }

    return steps;
  }

  private _mergeSortSteps(a: number[], lo: number, hi: number, steps: SortStep[]): void {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    this._mergeSortSteps(a, lo, mid, steps);
    this._mergeSortSteps(a, mid + 1, hi, steps);
    // merge in place with steps
    const tmp = a.slice(lo, hi + 1);
    let i = 0, j = mid - lo + 1, k = lo;
    while (i <= mid - lo && j <= hi - lo) {
      steps.push({ type: 'compare', indices: [lo + i, lo + j] });
      if (tmp[i] <= tmp[j]) {
        a[k++] = tmp[i++];
      } else {
        a[k++] = tmp[j++];
      }
    }
    while (i <= mid - lo) a[k++] = tmp[i++];
    while (j <= hi - lo) a[k++] = tmp[j++];
    // record the state change as swaps for visualization
    for (let x = lo; x <= hi; x++) {
      steps.push({ type: 'swap', indices: [x, x] });
    }
  }

  private _quickSortSteps(a: number[], lo: number, hi: number, steps: SortStep[]): void {
    if (lo >= hi) return;
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ type: 'compare', indices: [j, hi] });
      if (a[j] < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({ type: 'swap', indices: [i, j] });
        }
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ type: 'swap', indices: [i, hi] });
    steps.push({ type: 'sorted', indices: [i] });
    this._quickSortSteps(a, lo, i - 1, steps);
    this._quickSortSteps(a, i + 1, hi, steps);
  }

  private _play(): void {
    if (this._playing) return;
    this._playing = true;
    this._updateButtons();
    this._timer = window.setInterval(() => {
      if (this._currentStep >= this._steps.length) {
        this._stopTimer();
        this._updateButtons();
        return;
      }
      this._stepForward();
    }, this._getSpeed());
  }

  private _pause(): void {
    this._stopTimer();
    this._updateButtons();
  }

  private _reset(): void {
    this._stopTimer();
    this._currentStep = 0;
    this._arr = this._getData();
    this._steps = this._generateSteps(this._arr.slice());
    this._drawBars(this._arr, null);
    this._updateInfo();
    this._updateButtons();
  }

  private _stepForward(): void {
    if (this._currentStep >= this._steps.length) return;
    const step = this._steps[this._currentStep];
    this._applyStep(step);
    this._currentStep++;
    this._updateInfo();
    if (this._currentStep >= this._steps.length) {
      this._stopTimer();
      this._updateButtons();
    }
  }

  private _applyStep(step: SortStep): void {
    const svg = d3.select(this.root.querySelector('svg')!);
    const n = this._arr.length;
    const W = 500, H = 260;
    const barW = W / n;
    const maxVal = Math.max(...this._arr, 1);

    if (step.type === 'compare') {
      svg.selectAll<SVGRectElement, unknown>('.bar-rect').attr('fill', (_d, i) => {
        if (step.indices.includes(i)) return '#ffd93d';
        const el = svg.selectAll('.bar-rect').nodes()[i] as SVGRectElement;
        return el.dataset.sorted === 'true' ? '#22c55e' : '#00d4ff';
      });
    } else if (step.type === 'swap') {
      const [i, j] = step.indices;
      if (i !== j) {
        [this._arr[i], this._arr[j]] = [this._arr[j], this._arr[i]];
      }
      this._drawBars(this._arr, step.indices);
    } else if (step.type === 'sorted') {
      step.indices.forEach(idx => {
        const rect = svg.selectAll('.bar-rect').nodes()[idx] as SVGRectElement | undefined;
        if (rect) {
          rect.setAttribute('fill', '#22c55e');
          rect.dataset.sorted = 'true';
        }
      });
    }
  }

  private _drawBars(arr: number[], highlightIndices: number[] | null): void {
    const svg = d3.select(this.root.querySelector('svg')!);
    const g = svg.select<SVGGElement>('.bars-group');
    if (g.empty()) return;

    const W = 500, H = 260;
    const n = arr.length;
    const barW = (W - 20) / n;
    const maxVal = Math.max(...arr, 1);

    const rects = g.selectAll<SVGRectElement, number>('.bar-rect').data(arr);

    rects.join(
      enter => enter.append('rect')
        .attr('class', 'bar-rect')
        .attr('x', (_d, i) => 10 + i * barW + 1)
        .attr('width', Math.max(barW - 2, 1))
        .attr('y', d => H - (d / maxVal) * (H - 20))
        .attr('height', d => (d / maxVal) * (H - 20))
        .attr('rx', 2)
        .attr('fill', '#00d4ff'),
      update => update
        .attr('x', (_d, i) => 10 + i * barW + 1)
        .attr('width', Math.max(barW - 2, 1))
        .attr('y', d => H - (d / maxVal) * (H - 20))
        .attr('height', d => (d / maxVal) * (H - 20))
        .attr('fill', (_d, i) => {
          const el = update.nodes()[i] as SVGRectElement;
          if (el.dataset.sorted === 'true') return '#22c55e';
          if (highlightIndices && highlightIndices.includes(i)) return '#ffd93d';
          return '#00d4ff';
        })
    );
  }

  private _updateInfo(): void {
    const infoEl = this.root.querySelector('.info') as HTMLElement;
    if (infoEl) {
      infoEl.textContent = `${this._getAlgorithm().toUpperCase()} — Step ${this._currentStep} / ${this._steps.length}`;
    }
  }

  private _updateButtons(): void {
    const playBtn = this.root.querySelector('.btn-play') as HTMLButtonElement;
    const stepBtn = this.root.querySelector('.btn-step') as HTMLButtonElement;
    if (playBtn) playBtn.textContent = this._playing ? 'Pause' : 'Play';
    if (stepBtn) stepBtn.disabled = this._playing || this._currentStep >= this._steps.length;
  }

  private _build(): void {
    this._stopTimer();
    this._arr = this._getData();
    this._steps = this._generateSteps(this._arr.slice());
    this._currentStep = 0;

    const W = 500, H = 300;

    this.render(`<div class="sort-container">
      <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
        <g class="bars-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`);

    this._drawBars(this._arr, null);
    this._updateInfo();

    this.root.querySelector('.btn-play')!.addEventListener('click', () => {
      this._playing ? this._pause() : this._play();
    });
    this.root.querySelector('.btn-step')!.addEventListener('click', () => {
      if (!this._playing) this._stepForward();
    });
    this.root.querySelector('.btn-reset')!.addEventListener('click', () => this._reset());
  }
}

customElements.define('lv-sorting-viz', LvSortingViz);
export { LvSortingViz };

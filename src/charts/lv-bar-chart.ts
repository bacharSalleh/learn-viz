import { LvBaseElement } from '../core/base-element.js';
import * as d3 from 'd3';

interface BarDatum {
  label: string;
  value: number;
  color?: string;
  tag?: string;
  tagColor?: string;
}

const DEFAULT_PALETTE = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#6366f1',
];

const css = `
  :host { display: block; min-height: 60px; }
  svg { width: 100%; display: block; direction: ltr; }
  .bar { transition: opacity 0.3s; }
  .bar:hover { opacity: 0.8; }
  .label { fill: #fff; font-size: 0.85em; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
  .value-text { font-weight: 700; font-size: 0.8em; }
  .tag { font-size: 0.7em; }
  .axis line { stroke: var(--lv-border, #2a2a4a); }
`;

const BAR_HEIGHT = 28;
const BAR_GAP = 8;
const BAND_STEP = BAR_HEIGHT + BAR_GAP;

class LvBarChart extends LvBaseElement {
  static get observedAttributes() {
    return ['data', 'direction', 'sorted', 'animated'];
  }

  private _data: BarDatum[] = [];
  private _hasAnimated = false;
  private _resizeObserver: ResizeObserver | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _svg: any = null;
  private _container: HTMLDivElement | null = null;

  get data(): BarDatum[] {
    return this._data;
  }

  set data(val: BarDatum[] | string) {
    if (typeof val === 'string') {
      try { this._data = JSON.parse(val); } catch { this._data = []; }
    } else {
      this._data = val;
    }
    if (this._svg) {
      this._render(true);
    }
  }

  private get _direction(): 'horizontal' | 'vertical' {
    return (this.getAttribute('direction') as string) === 'vertical'
      ? 'vertical' : 'horizontal';
  }

  private get _sorted(): boolean {
    return this.hasAttribute('sorted');
  }

  private _getColor(i: number, datum: BarDatum): string {
    if (datum.color) return datum.color;
    const v = getComputedStyle(this).getPropertyValue(`--lv-chart-${i % 8}`).trim();
    return v || DEFAULT_PALETTE[i % 8];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);

    this._container = document.createElement('div');
    this.root.appendChild(this._container);

    this._data = this.jsonAttr<BarDatum[]>('data', []);

    this._initSvg();
    this._render(false);

    let resizeTimer: number | undefined;
    this._resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => this._render(false), 100);
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    if (oldVal === newVal) return;
    if (name === 'data') {
      this._data = this.jsonAttr<BarDatum[]>('data', []);
    }
    if (this._svg) {
      this._render(name === 'data');
    }
  }

  animateIn(instant?: boolean): void {
    if (this._hasAnimated) return;
    this._hasAnimated = true;
    if (instant) {
      this._render(false);
    } else {
      this._render(true, true);
    }
  }

  private _initSvg() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._container!.appendChild(svgEl);
    this._svg = d3.select(svgEl);
    this._svg.append('g').attr('class', 'chart-area');
    this._svg.append('g').attr('class', 'axis-group');
  }

  private _render(withTransition: boolean, isEntrance = false) {
    if (!this._svg || !this._container) return;

    const data = this._sorted
      ? [...this._data].sort((a: BarDatum, b: BarDatum) => b.value - a.value)
      : [...this._data];

    if (this._direction === 'vertical') {
      this._renderVertical(data, withTransition, isEntrance);
    } else {
      this._renderHorizontal(data, withTransition, isEntrance);
    }
  }

  private _renderHorizontal(data: BarDatum[], withTransition: boolean, isEntrance: boolean) {
    const rtl = this.isRtl;
    const width = this.clientWidth || 400;
    // Labels go inside/above bars, values+tags after bar end
    const margin = {
      top: 10,
      right: 120, // space for value + tag
      bottom: 10,
      left: 10,
    };
    const innerWidth = Math.max(width - margin.left - margin.right, 10);
    const innerHeight = data.length * BAND_STEP;
    const totalHeight = innerHeight + margin.top + margin.bottom;

    this._svg.attr('viewBox', `0 0 ${width} ${totalHeight}`)
      .attr('height', totalHeight);

    const maxVal = d3.max(data, (d: BarDatum) => d.value) || 1;

    // Bars always grow left-to-right in SVG coordinates.
    // RTL only affects label/value placement, not bar direction.
    const x = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, innerWidth]);

    const y = d3.scaleBand()
      .domain(data.map((d: BarDatum) => d.label))
      .range([0, innerHeight])
      .paddingInner(BAR_GAP / BAND_STEP)
      .paddingOuter(0);

    const chartArea = this._svg.select('.chart-area')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Axis line
    const axisGroup = this._svg.select('.axis-group')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    axisGroup.selectAll('.axis-line').data([0]).join('line')
      .attr('class', 'axis-line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'var(--lv-border, #2a2a4a)')
      .attr('stroke-width', 1);

    // Data join
    const groups = chartArea.selectAll('.bar-group')
      .data(data, (d: BarDatum) => d.label);

    const duration = withTransition ? 800 : 0;
    const shouldStartFromZero = isEntrance && !this._isInstant();

    // Enter
    const enter = groups.enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (_d: BarDatum, i: number) => `translate(0,${y(data[i].label)})`);

    // Bar rect — always grows from x=0 rightward
    enter.append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', (d: BarDatum) => shouldStartFromZero ? 0 : x(d.value))
      .attr('height', y.bandwidth())
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d));

    // Label text — inside the bar, near the right end
    enter.append('text')
      .attr('class', 'label')
      .attr('x', (d: BarDatum) => {
        const barW = x(d.value);
        // If bar is wide enough, put label inside; otherwise outside
        return barW > 100 ? barW - 8 : barW + 6;
      })
      .attr('y', y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: BarDatum) => x(d.value) > 100 ? 'end' : 'start')
      .attr('opacity', shouldStartFromZero ? 0 : 1)
      .text((d: BarDatum) => d.label);

    // Value text — at bar end, left side
    enter.append('text')
      .attr('class', 'value-text')
      .attr('x', (d: BarDatum) => {
        const barEnd = x(d.value);
        return shouldStartFromZero ? 0 : barEnd + 6;
      })
      .attr('y', y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d))
      .attr('opacity', shouldStartFromZero ? 0 : 1)
      .text((d: BarDatum) => typeof d.value === 'number' ? d.value.toFixed(2) : d.value);

    // Tag pill
    enter.each((d: BarDatum, i: number, nodes: SVGGElement[]) => {
      if (!d.tag) return;
      const g = d3.select(nodes[i]);
      const tagColor = d.tagColor || this._getColor(i, d);

      g.append('rect')
        .attr('class', 'tag-bg')
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('fill', tagColor)
        .attr('fill-opacity', 0.15)
        .attr('opacity', shouldStartFromZero ? 0 : 1);

      g.append('text')
        .attr('class', 'tag')
        .attr('fill', tagColor)
        .attr('dy', '0.35em')
        .attr('y', y.bandwidth() / 2)
        .attr('opacity', shouldStartFromZero ? 0 : 1)
        .text(d.tag);
    });

    // Merge enter + update
    const merged = enter.merge(groups);

    merged.transition().duration(duration).ease(d3.easeQuadOut)
      .attr('transform', (d: BarDatum) => `translate(0,${y(d.label)})`);

    // Animate bars
    merged.select('.bar')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('x', 0)
      .attr('width', (d: BarDatum) => x(d.value))
      .attr('height', y.bandwidth())
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d));

    // Animate labels
    merged.select('.label')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('opacity', 1)
      .attr('x', (d: BarDatum) => {
        const barW = x(d.value);
        return barW > 100 ? barW - 8 : barW + 6;
      })
      .attr('text-anchor', (d: BarDatum) => x(d.value) > 100 ? 'end' : 'start')
      .attr('y', y.bandwidth() / 2);

    // Animate values
    merged.select('.value-text')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('x', (d: BarDatum) => x(d.value) + 6)
      .attr('opacity', 1)
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d))
      .text((d: BarDatum) => typeof d.value === 'number' ? d.value.toFixed(2) : d.value);

    // Animate tags
    merged.each((_d: BarDatum, i: number, nodes: SVGGElement[]) => {
      const g = d3.select(nodes[i]);
      g.select('.tag-bg').transition().duration(duration).attr('opacity', 1);
      g.select('.tag').transition().duration(duration).attr('opacity', 1);
    });

    // Position tag pills after value text settles
    this._positionTags(merged, y, rtl, x);

    // Exit
    groups.exit()
      .transition().duration(duration / 2)
      .attr('opacity', 0)
      .remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _positionTags(groups: any, y: any, rtl: boolean, x: any) {
    // Use requestAnimationFrame to let value text render so we can measure
    requestAnimationFrame(() => {
      groups.each((d: BarDatum, i: number, nodes: SVGGElement[]) => {
        if (!d.tag) return;
        const g = d3.select(nodes[i]);
        const valueEl = g.select('.value-text').node() as SVGTextElement | null;
        if (!valueEl) return;

        const barEnd = x(d.value) as number;
        const valueWidth = valueEl.getComputedTextLength?.() || 30;
        const tagTextEl = g.select('.tag').node() as SVGTextElement | null;
        const tagWidth = tagTextEl?.getComputedTextLength?.() || 20;

        const tagX = barEnd + 6 + valueWidth + 10 + tagWidth / 2;

        g.select('.tag')
          .attr('x', tagX)
          .attr('text-anchor', 'middle');

        const padding = 6;
        g.select('.tag-bg')
          .attr('x', tagX - tagWidth / 2 - padding)
          .attr('y', y.bandwidth() / 2 - 8)
          .attr('width', tagWidth + padding * 2)
          .attr('height', 16);
      });
    });
  }

  private _renderVertical(data: BarDatum[], withTransition: boolean, isEntrance: boolean) {
    const width = this.clientWidth || 400;
    const margin = { top: 20, right: 10, bottom: 40, left: 10 };
    const innerWidth = Math.max(width - margin.left - margin.right, 10);
    const innerHeight = 200;
    const totalHeight = innerHeight + margin.top + margin.bottom;

    this._svg.attr('viewBox', `0 0 ${width} ${totalHeight}`)
      .attr('height', totalHeight);

    const maxVal = d3.max(data, (d: BarDatum) => d.value) || 1;

    const x = d3.scaleBand()
      .domain(data.map((d: BarDatum) => d.label))
      .range([0, innerWidth])
      .paddingInner(0.2)
      .paddingOuter(0.1);

    const y = d3.scaleLinear()
      .domain([0, maxVal])
      .range([innerHeight, 0]);

    const chartArea = this._svg.select('.chart-area')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Axis line
    const axisGroup = this._svg.select('.axis-group')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    axisGroup.selectAll('.axis-line').data([0]).join('line')
      .attr('class', 'axis-line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', innerHeight)
      .attr('y2', innerHeight)
      .attr('stroke', 'var(--lv-border, #2a2a4a)')
      .attr('stroke-width', 1);

    const duration = withTransition ? 800 : 0;
    const shouldStartFromZero = isEntrance && !this._isInstant();

    const groups = chartArea.selectAll('.bar-group')
      .data(data, (d: BarDatum) => d.label);

    const enter = groups.enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d: BarDatum) => `translate(${x(d.label)},0)`);

    // Bar rect
    enter.append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', shouldStartFromZero ? innerHeight : ((d: BarDatum) => y(d.value)))
      .attr('width', x.bandwidth())
      .attr('height', (d: BarDatum) => shouldStartFromZero ? 0 : innerHeight - y(d.value))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d));

    // Label
    enter.append('text')
      .attr('class', 'label')
      .attr('x', x.bandwidth() / 2)
      .attr('y', innerHeight + 16)
      .attr('text-anchor', 'middle')
      .attr('opacity', shouldStartFromZero ? 0 : 1)
      .text((d: BarDatum) => d.label);

    // Value
    enter.append('text')
      .attr('class', 'value-text')
      .attr('x', x.bandwidth() / 2)
      .attr('y', (d: BarDatum) => shouldStartFromZero ? innerHeight - 4 : y(d.value) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d))
      .attr('opacity', shouldStartFromZero ? 0 : 1)
      .text((d: BarDatum) => d.value);

    const merged = enter.merge(groups);

    merged.transition().duration(duration).ease(d3.easeQuadOut)
      .attr('transform', (d: BarDatum) => `translate(${x(d.label)},0)`);

    merged.select('.bar')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('y', (d: BarDatum) => y(d.value))
      .attr('height', (d: BarDatum) => innerHeight - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d));

    merged.select('.label')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('opacity', 1);

    merged.select('.value-text')
      .transition().duration(duration).ease(d3.easeQuadOut)
      .attr('y', (d: BarDatum) => y(d.value) - 6)
      .attr('opacity', 1)
      .attr('fill', (d: BarDatum, i: number) => this._getColor(i, d))
      .text((d: BarDatum) => d.value);

    groups.exit()
      .transition().duration(duration / 2)
      .attr('opacity', 0)
      .remove();
  }

  private _isInstant(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

customElements.define('lv-bar-chart', LvBarChart);

export { LvBarChart };

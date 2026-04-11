# Canvas Rendering Layer for LearnViz

**Date:** 2026-04-11
**Status:** Approved

## Overview

Add a Canvas 2D rendering foundation to LearnViz alongside the existing SVG/D3 pipeline. Build two showcase components on top of it: a multi-series chart and a neural network diagram. Inspired by ngrok's quantization blog post which uses raw Canvas for all charts with a two-canvas layering pattern.

## Goals

- Introduce a reusable `CanvasChart` utility that handles the boilerplate of Canvas-based visualizations
- Build `lv-canvas-chart` for high-performance line/area/distribution charts
- Build `lv-neural-net` for interactive neural network diagrams
- No new dependencies — pure Canvas 2D API
- Follow all existing LearnViz patterns (LvBaseElement, Shadow DOM, scroll animation, theming, RTL, a11y)

## Non-Goals

- Replacing existing SVG components — they remain as-is
- 3D rendering — Three.js components already cover that
- General-purpose canvas drawing tool — this is scoped to chart/diagram use cases

---

## 1. Canvas Foundation — `CanvasChart`

**File:** `src/core/canvas.ts`

A utility class that any Canvas-based component instantiates. Not a base element — a helper owned by the component.

### Two-Canvas Layering

Two `<canvas>` elements stacked via `position: absolute`:

- **Static canvas (bottom):** Axes, gridlines, data lines, areas, nodes, edges. Redrawn only when data or size changes.
- **Overlay canvas (top):** Hover crosshair, highlight effects, selection indicators. Redrawn on mouse move via `requestAnimationFrame`. Only runs the rAF loop while the pointer is over the component.

A positioned `<div>` serves as the tooltip — DOM-based for accessibility and easy styling.

### DPI Handling

On construction and resize:
```
canvas.width = rect.width * devicePixelRatio
canvas.height = rect.height * devicePixelRatio
canvas.style.width = rect.width + 'px'
canvas.style.height = rect.height + 'px'
ctx.scale(devicePixelRatio, devicePixelRatio)
```

### Resize

`ResizeObserver` on the host element. On resize: recalculate dimensions, clear both canvases, call back into the component to redraw.

### Coordinate System

Configurable padding `{ top, right, bottom, left }` defining the plot area. Two scale factory methods:

- `xScale(domain: [min, max])` — returns `(value) => pixelX` mapping domain to plot area width
- `yScale(domain: [min, max])` — returns `(value) => pixelY` mapping domain to plot area height (inverted: y=0 at bottom)

### Drawing Primitives

All take a `CanvasRenderingContext2D` as first argument so they work on either layer:

- `drawLine(ctx, points: {x,y}[], style: {color, width, dash?})` — polyline or smooth bezier
- `drawSmoothLine(ctx, points: {x,y}[], style)` — cubic bezier through points using monotone interpolation
- `drawArea(ctx, points: {x,y}[], baseline: number, style: {fill, opacity})` — filled area under a curve
- `drawCircle(ctx, cx, cy, r, style: {fill?, stroke?, strokeWidth?})`
- `drawText(ctx, text, x, y, style: {color, size, align, baseline, font?})`
- `drawGridlines(ctx, xPositions[], yPositions[], style: {color, dash?})`
- `drawAxes(ctx, plotArea, style)` — axis lines along left and bottom edges
- `drawAxisLabels(ctx, xTicks: {pos, label}[], yTicks: {pos, label}[], style)`

### Overlay / Interaction

- `onHover(callback: (event: {canvasX, canvasY, plotX, plotY}) => void)` — mousemove handler on overlay canvas, converts pixel coords to plot coords
- `onLeave(callback: () => void)` — mouseleave, clear overlay
- `showTooltip(html: string, x: number, y: number)` — position the tooltip div near the cursor, flip if near edges
- `hideTooltip()`
- Hit-testing is left to the component (it knows its data geometry)

### Theme Integration

Reads computed CSS custom properties from the host element:
- `--lv-text` for label/axis text color
- `--lv-text-dim` for gridline color
- `--lv-border` for axis line color
- `--lv-bg` for tooltip background
- `--lv-accent` as default series color

Re-reads on resize (handles theme switches).

### Lifecycle

- `clear(layer: 'static' | 'overlay' | 'both')` — clearRect
- `destroy()` — disconnect ResizeObserver, remove event listeners, cancel any pending rAF

### API

```ts
interface CanvasChartOptions {
  padding?: { top: number; right: number; bottom: number; left: number };
  onResize?: () => void;
}

class CanvasChart {
  constructor(host: HTMLElement, container: HTMLElement, options?: CanvasChartOptions)

  // Elements
  readonly staticCanvas: HTMLCanvasElement;
  readonly overlayCanvas: HTMLCanvasElement;
  readonly tooltipEl: HTMLDivElement;
  readonly staticCtx: CanvasRenderingContext2D;
  readonly overlayCtx: CanvasRenderingContext2D;

  // Dimensions (plot area, in CSS pixels)
  readonly plotX: number;
  readonly plotY: number;
  readonly plotWidth: number;
  readonly plotHeight: number;

  // Scales
  xScale(domain: [number, number]): (v: number) => number;
  yScale(domain: [number, number]): (v: number) => number;

  // Drawing primitives
  drawLine(ctx: CanvasRenderingContext2D, points: Point[], style: LineStyle): void;
  drawSmoothLine(ctx: CanvasRenderingContext2D, points: Point[], style: LineStyle): void;
  drawArea(ctx: CanvasRenderingContext2D, points: Point[], baseline: number, style: AreaStyle): void;
  drawCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, style: CircleStyle): void;
  drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, style: TextStyle): void;
  drawGridlines(ctx: CanvasRenderingContext2D, xPositions: number[], yPositions: number[], style?: GridStyle): void;
  drawAxes(ctx: CanvasRenderingContext2D, style?: AxisStyle): void;
  drawAxisLabels(ctx: CanvasRenderingContext2D, xTicks: Tick[], yTicks: Tick[], style?: TextStyle): void;

  // Interaction
  onHover(cb: (e: HoverEvent) => void): void;
  onLeave(cb: () => void): void;
  showTooltip(html: string, x: number, y: number): void;
  hideTooltip(): void;

  // Theme
  getThemeColor(prop: string): string;

  // Lifecycle
  clear(layer: 'static' | 'overlay' | 'both'): void;
  destroy(): void;
}
```

---

## 2. `lv-canvas-chart` Component

**File:** `src/charts/lv-canvas-chart.ts`

A multi-series Canvas chart supporting lines, areas, and distribution curves.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | JSON | `[]` | Array of series objects |
| `x-label` | string | `""` | X-axis label |
| `y-label` | string | `""` | Y-axis label |
| `x-format` | string | `""` | X-axis value format suffix (e.g. `"%"`) |
| `y-format` | string | `""` | Y-axis value format suffix |
| `smooth` | boolean | `true` | Bezier curve smoothing |
| `legend` | boolean | `true` | Show toggle-able legend |
| `gridlines` | boolean | `true` | Show background gridlines |
| `tooltip` | boolean | `true` | Show hover tooltip with crosshair |

### Data Format

```json
[
  {
    "label": "Series A",
    "color": "#4ade80",
    "values": [{"x": 0, "y": 0.5}, {"x": 1, "y": 0.8}],
    "type": "line"
  },
  {
    "label": "Series B",
    "color": "#f472b6",
    "values": [{"x": 0, "y": 0.3}, {"x": 1, "y": 0.6}],
    "type": "area"
  }
]
```

`type` defaults to `"line"`. `"area"` fills from the curve down to the x-axis with the series color at reduced opacity.

### Shadow DOM Structure

```html
<div class="lv-cc-container">
  <canvas class="lv-cc-static"></canvas>
  <canvas class="lv-cc-overlay"></canvas>
  <div class="lv-cc-tooltip"></div>
</div>
<div class="lv-cc-legend">
  <!-- One button per series, click to toggle visibility -->
  <button class="lv-cc-legend-item" aria-pressed="true">
    <span class="lv-cc-legend-swatch"></span>
    Series A
  </button>
</div>
<slot name="controls"></slot>
```

### Behavior

**Rendering:**
1. On data change or resize: compute x/y domain from all visible series
2. Draw on static canvas: gridlines, axes, axis labels, then each visible series (line or area)
3. Lines use `drawSmoothLine` when `smooth=true`, `drawLine` otherwise

**Hover (overlay canvas):**
1. On mousemove: find nearest x-position across all series
2. Draw vertical crosshair line at that x
3. Draw highlight circles on each series at the intersecting point
4. Show tooltip div with x-value and each series' y-value at that point

**Legend:**
- DOM buttons below the chart, one per series
- Each has a color swatch (small `<span>` with background-color)
- Click toggles `aria-pressed` and dims the button (opacity + strikethrough)
- Toggling recalculates domain from remaining visible series and redraws static canvas

**Animation:**
- `animateIn()`: progressively reveal lines from left to right using a clipping rectangle that expands over ~800ms via `requestAnimationFrame`
- Areas fade in after lines complete
- Respects `prefers-reduced-motion`: instant render, no animation

**Controls slot:**
- `<slot name="controls">` sits below the legend
- Allows composition with `lv-slider` or custom DOM for things like range selectors, format toggles

### Accessibility

- `role="img"` on the container with `aria-label` summarizing the chart
- A visually hidden `<table>` with the raw data for screen readers (same pattern as existing `lv-line-chart`)
- Legend buttons have `aria-pressed` states
- Tooltip content is mirrored to an `aria-live="polite"` region

---

## 3. `lv-neural-net` Component

**File:** `src/diagrams/lv-neural-net.ts`

An interactive neural network diagram rendered on Canvas.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `layers` | JSON | `[2,3,2]` | Array of node counts per layer |
| `weights` | JSON | `null` | Edge weights as nested arrays |
| `values` | JSON | `null` | Node values as nested arrays |
| `input-labels` | string | `""` | Comma-separated input node labels |
| `output-labels` | string | `""` | Comma-separated output node labels |
| `input-colors` | string | `""` | Comma-separated input node border colors |
| `output-colors` | string | `""` | Comma-separated output node border colors |
| `animate` | boolean | `false` | Forward-pass animation on scroll entry |

### Layout Algorithm

1. Layers spaced evenly horizontally across the plot area
2. Within each layer, nodes spaced evenly vertically, centered
3. Node radius scales with available space: `min(20, plotHeight / (2 * maxNodesInAnyLayer))`
4. Edge start/end points are at the node circle perimeters, not centers

### Rendering (static canvas)

1. **Edges first** (so nodes draw on top): For each pair of adjacent layers, draw a line from every node in layer N to every node in layer N+1
   - If `weights` provided: edge opacity = `0.1 + 0.9 * abs(weight) / maxWeight`, color tinted by sign (positive = theme accent, negative = muted)
   - If no weights: uniform light gray edges
2. **Nodes:** Filled circles with optional border color for input/output nodes
   - If `values` provided: draw the value as text centered inside the node
   - Input/output nodes get colored borders per `input-colors`/`output-colors`
3. **Labels:** Input/output labels drawn to the left/right of the first/last layer

### Interaction (overlay canvas)

- **Hover node:** Highlight the node (brighter border), highlight all edges connected to it (increase opacity, thicken), show tooltip with node value
- **Hover edge:** Highlight that edge, show tooltip with weight value
- Hit detection: check distance to each node center first (< radius), then check proximity to each edge line segment

### Forward-Pass Animation

When `animate=true` and `animateIn()` fires:
1. Start with all edges and hidden-layer nodes at very low opacity
2. Layer by layer (left to right), animate edges brightening with a pulse traveling along the edge (a bright dot moving from source to target)
3. When pulses reach a node, the node "activates" (scales up briefly, then back)
4. Takes ~1.5s total, staggered ~300ms per layer
5. After animation completes, render final static state
6. `prefers-reduced-motion`: skip animation, render final state instantly

### Shadow DOM Structure

```html
<div class="lv-nn-container">
  <canvas class="lv-nn-static"></canvas>
  <canvas class="lv-nn-overlay"></canvas>
  <div class="lv-nn-tooltip"></div>
</div>
```

### Accessibility

- `role="img"` on the container
- `aria-label` auto-generated: "Neural network with N layers: [2, 4, 4, 3] nodes. M total parameters."
- Visually hidden description listing layer sizes, input/output labels, and total parameter count

---

## 4. File Structure

```
src/core/canvas.ts              — CanvasChart utility class
src/charts/lv-canvas-chart.ts   — Multi-series chart component
src/diagrams/lv-neural-net.ts   — Neural network diagram component
```

Register in `src/index.ts` alongside existing component exports.

## 5. Dependencies

None new. Pure Canvas 2D API + existing project infrastructure.

## 6. Testing

- Manual testing via the demo gallery page
- Verify DPI scaling on retina displays
- Verify resize behavior
- Verify theme switching (dark/light/cyberpunk/academic/forest)
- Verify `prefers-reduced-motion` disables animations
- Verify RTL layout doesn't break (canvases are always LTR internally, same as existing SVG pattern)
- Verify legend toggle redraws correctly
- Verify tooltip positioning near edges doesn't overflow

# LearnViz

Web Component library for building interactive educational pages with animated D3 charts, GSAP animations, and full RTL/LTR support.

**Zero framework dependencies.** Drop two files into any HTML page and start building.

## Quick Start

```html
<link rel="stylesheet" href="dist/learn-viz.css">
<script src="dist/learn-viz.umd.js"></script>

<lv-page theme="dark" dir="rtl">
  <lv-hero number="01" title="Lesson Title" subtitle="What you'll learn"></lv-hero>
  <div class="lv-container">
    <lv-section title="Section">
      <lv-bar-chart data='[{"label":"A","value":0.8,"color":"#00c853"}]'></lv-bar-chart>
    </lv-section>
  </div>
</lv-page>
```

## Components (33 elements)

| Category | Components |
|----------|-----------|
| **Layout** (8) | `page`, `hero`, `section`, `card`, `grid`, `tabs`, `nav`, `comparison` |
| **Charts** (6) | `bar-chart`, `line-chart`, `heatmap`, `function`, `scatter`, `pie` |
| **Diagrams** (4) | `flow`, `network`, `timeline`, `tree` |
| **Interactive** (5) | `quiz`, `slider`, `reveal`, `stepper`, `playground` |
| **Display** (6) | `metric`, `callout`, `badge`, `math`, `code`, `matrix` |

## Development

```bash
npm install
npm run dev      # Vite dev server → http://localhost:5173/demo/index.html
npm run build    # Build to dist/
```

## Tech Stack

- **TypeScript** — strict mode, one component per file
- **D3.js** — all chart rendering and data-driven animations
- **GSAP** — neural network forward-pass/backprop timeline animations
- **KaTeX** (CDN, optional) — LaTeX math formula rendering
- **highlight.js** (CDN, optional) — syntax-highlighted code blocks
- **Vite** — library mode build (ES + UMD)

## Features

- Full **RTL/LTR** support — auto-detected from DOM
- **Scroll-triggered animations** — charts animate when entering viewport
- **Interactive function plotter** — drag a point along sigmoid/relu/custom curves
- **Neural network animation** — forward-pass and backprop pulse visualization
- **Live playground** — connect sliders to charts for real-time parameter tweaking
- **Dark/light themes** — CSS custom properties throughout
- **Responsive** — all components adapt to container width
- `prefers-reduced-motion` respected

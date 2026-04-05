var gl = Object.defineProperty;
var hs = (n) => {
  throw TypeError(n);
};
var _l = (n, t, e) => t in n ? gl(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var O = (n, t, e) => _l(n, typeof t != "symbol" ? t + "" : t, e), fs = (n, t, e) => t.has(n) || hs("Cannot " + e);
var Ve = (n, t, e) => (fs(n, t, "read from private field"), e ? e.call(n) : t.get(n)), Mr = (n, t, e) => t.has(n) ? hs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), ds = (n, t, e, r) => (fs(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e);
var ze, yn;
class ml {
  constructor() {
    Mr(this, ze);
    Mr(this, yn, /* @__PURE__ */ new WeakSet());
    ds(this, ze, new IntersectionObserver((t) => {
      for (const e of t)
        if (e.isIntersecting && !Ve(this, yn).has(e.target)) {
          Ve(this, yn).add(e.target);
          const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches, i = e.target;
          typeof i.animateIn == "function" && (r ? i.animateIn(!0) : i.animateIn(!1));
        }
    }, { threshold: 0.15 }));
  }
  observe(t) {
    Ve(this, ze).observe(t);
  }
  unobserve(t) {
    Ve(this, ze).unobserve(t);
  }
}
ze = new WeakMap(), yn = new WeakMap();
const ps = new ml();
class I extends HTMLElement {
  constructor() {
    super();
    // Shadow root setup
    O(this, "root");
    this.root = this.attachShadow({ mode: "open" });
  }
  // Auto-detect direction from DOM ancestors
  get dir() {
    var e;
    return ((e = this.closest("[dir]")) == null ? void 0 : e.getAttribute("dir")) || document.documentElement.dir || "ltr";
  }
  get isRtl() {
    return this.dir === "rtl";
  }
  // Adopt stylesheets helper
  adoptStyles(e) {
    const r = new CSSStyleSheet();
    r.replaceSync(e), this.root.adoptedStyleSheets = [...this.root.adoptedStyleSheets, r];
  }
  // Parse JSON attribute safely
  jsonAttr(e, r) {
    const i = this.getAttribute(e);
    if (!i) return r;
    const s = i.replace(/\u2212/g, "-");
    try {
      return JSON.parse(s);
    } catch {
      return r;
    }
  }
  // Render helper using innerHTML
  render(e) {
    this.root.innerHTML = e;
  }
  // Called by ScrollAnimator when element enters viewport
  // instant=true when prefers-reduced-motion is set
  animateIn(e) {
  }
  // Lifecycle
  connectedCallback() {
    ps.observe(this);
  }
  disconnectedCallback() {
    ps.unobserve(this);
  }
}
function Xe(n, t, e) {
  return n + (t - n) * e;
}
function vl(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function xl(n) {
  n = vl(n, 0, 1);
  const t = n < 0.5 ? Math.round(Xe(0, 255, n * 2)) : 255, e = n < 0.5 ? Math.round(Xe(200, 230, n * 2)) : Math.round(Xe(230, 50, (n - 0.5) * 2)), r = n < 0.5 ? Math.round(Xe(83, 60, n * 2)) : Math.round(Xe(60, 80, (n - 0.5) * 2));
  return `rgb(${t},${e},${r})`;
}
function Pg(n) {
  return xl((1 - n) / 2);
}
function bl(n) {
  return Number.isInteger(n) ? n.toString() : Math.abs(n) >= 100 ? n.toFixed(0) : Math.abs(n) >= 1 ? n.toFixed(1) : n.toFixed(2);
}
let yl = 0;
function zg(n = "lv") {
  return `${n}-${++yl}`;
}
function Og(n, t) {
  const e = t || document.documentElement;
  return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim();
}
function Lg(n, t) {
  n.setAttribute("data-theme", t);
}
const wl = (
  /* css */
  `
  :host {
    display: block;
    font-family: var(--lv-font);
    background: var(--lv-bg);
    color: var(--lv-text);
    line-height: var(--lv-lh);
    min-block-size: 100vh;
  }

  :host([theme="dark"]) {
    color-scheme: dark;
  }

  :host([theme="light"]) {
    color-scheme: light;
  }
`
);
class kl extends I {
  static get observedAttributes() {
    return ["theme", "dir"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(wl), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("dir") || "ltr";
    this.setAttribute("dir", t), this.render("<slot></slot>");
  }
}
customElements.define("lv-page", kl);
const Al = (
  /* css */
  `
  :host {
    display: block;
    position: relative;
    text-align: center;
    padding-block: 80px 60px;
    overflow: hidden;
  }

  .number {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    font-weight: 900;
    opacity: 0.08;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h1 {
    margin: 0;
    font-size: 2.4rem;
    color: var(--lv-accent);
    font-weight: 700;
  }

  .subtitle {
    margin-block-start: 12px;
    font-size: 1.1rem;
    color: var(--lv-dim);
  }
`
);
class Cl extends I {
  static get observedAttributes() {
    return ["number", "title", "subtitle", "gradient"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Al), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("number") || "", e = this.getAttribute("title") || "", r = this.getAttribute("subtitle") || "", i = this.getAttribute("gradient") || "", s = i ? `background: ${i};` : "";
    this.render(`
      <div class="hero" style="${s}">
        ${t ? `<div class="number">${t}</div>` : ""}
        <div class="content">
          <h1>${e}</h1>
          ${r ? `<p class="subtitle">${r}</p>` : ""}
        </div>
      </div>
    `);
  }
}
customElements.define("lv-hero", Cl);
const $l = (
  /* css */
  `
  :host {
    display: block;
    margin-block: 60px;
  }

  h2 {
    margin: 0 0 24px 0;
    font-size: 1.6rem;
    color: var(--lv-accent);
    border-inline-start: 4px solid var(--lv-accent2);
    padding-inline-start: 16px;
    font-weight: 600;
  }
`
);
class Sl extends I {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles($l), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("title") || "";
    this.render(`
      ${t ? `<h2>${t}</h2>` : ""}
      <slot></slot>
    `);
  }
}
customElements.define("lv-section", Sl);
const Tl = (
  /* css */
  `
  :host {
    display: block;
  }

  .card {
    background: var(--lv-bg-card, #1a1a2e);
    border: 1px solid var(--lv-border, #2a2a4a);
    border-radius: var(--lv-r-lg, 12px);
    padding: var(--lv-sp-6, 24px);
    transition: border-color 0.2s ease;
  }

  .card:hover {
    border-color: var(--lv-accent);
  }

  /* glow variant */
  :host([variant="glow"]) .card {
    border-color: var(--lv-accent);
    box-shadow: 0 0 20px color-mix(in srgb, var(--lv-accent) 25%, transparent);
  }

  /* flush variant — no padding, for embedded charts */
  :host([variant="flush"]) .card {
    padding: 0;
    overflow: hidden;
  }

  /* outline variant — transparent bg */
  :host([variant="outline"]) .card {
    background: transparent;
    border-style: solid;
  }

  /* accent border on inline-start */
  :host([accent]) .card {
    border-inline-start: 3px solid var(--lv-accent2, #7b68ee);
    background: var(--lv-bg-raised, #12122a);
  }
`
);
class Ml extends I {
  constructor() {
    super(...arguments);
    O(this, "_rendering", !1);
  }
  static get observedAttributes() {
    return ["variant"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Tl), this._render();
  }
  attributeChangedCallback() {
    this._rendering || this._render();
  }
  _render() {
    this._rendering || (this._rendering = !0, this.root.querySelector(".card") || this.render('<div class="card"><slot></slot></div>'), this._rendering = !1);
  }
}
customElements.define("lv-card", Ml);
const El = (
  /* css */
  `
  :host {
    display: block;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 2), 1fr);
    gap: var(--gap, 24px);
  }

  /* Gap sizes */
  :host([gap="sm"]) .grid { --gap: 12px; }
  :host([gap="md"]) .grid { --gap: 24px; }
  :host([gap="lg"]) .grid { --gap: 40px; }

  /* Column counts */
  :host([cols="2"]) .grid { --cols: 2; }
  :host([cols="3"]) .grid { --cols: 3; }
  :host([cols="4"]) .grid { --cols: 4; }
  :host([cols="auto"]) .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`
);
class Pl extends I {
  static get observedAttributes() {
    return ["cols", "gap"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(El), this._render();
  }
  attributeChangedCallback() {
    this.root.querySelector(".grid") || this._render();
  }
  _render() {
    this.render('<div class="grid"><slot></slot></div>');
  }
}
customElements.define("lv-grid", Pl);
const zl = (
  /* css */
  `
  :host {
    display: none;
  }
  :host([active]) {
    display: block;
    animation: fadeIn 0.25s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`
);
class Ol extends I {
  static get observedAttributes() {
    return ["label", "active"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(zl), this.render("<slot></slot>"), this.setAttribute("role", "tabpanel");
  }
  attributeChangedCallback() {
  }
}
customElements.define("lv-tab", Ol);
const Ll = (
  /* css */
  `
  :host {
    display: block;
  }

  .tablist {
    display: flex;
    gap: 0;
    border-block-end: 2px solid var(--lv-border);
    margin-block-end: 16px;
    overflow-x: auto;
  }

  .tab-btn {
    background: none;
    border: none;
    color: var(--lv-dim);
    font-family: inherit;
    font-size: 0.95rem;
    padding: 10px 20px;
    cursor: pointer;
    border-block-end: 2px solid transparent;
    margin-block-end: -2px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }

  .tab-btn:hover {
    color: var(--lv-text);
  }

  .tab-btn[aria-selected="true"] {
    color: var(--lv-accent);
    border-block-end-color: var(--lv-accent);
    font-weight: 600;
  }

  .tab-btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: -2px;
    border-radius: 4px;
  }

  .panels {
    display: block;
  }
`
);
class Nl extends I {
  constructor() {
    super(...arguments);
    O(this, "_tabs", []);
    O(this, "_buttons", []);
    O(this, "_activeIndex", 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ll), requestAnimationFrame(() => this._setup());
  }
  _setup() {
    if (this._tabs = Array.from(this.querySelectorAll("lv-tab")), this._tabs.length === 0) return;
    const e = this._tabs.findIndex((s) => s.hasAttribute("active"));
    this._activeIndex = e >= 0 ? e : 0;
    const r = this._tabs.map((s, a) => {
      const o = s.getAttribute("label") || `Tab ${a + 1}`, c = a === this._activeIndex;
      return `<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c ? "0" : "-1"}"
        data-index="${a}"
      >${o}</button>`;
    }).join("");
    this.render(`
      <div class="tablist" role="tablist">${r}</div>
      <div class="panels"><slot></slot></div>
    `), this._buttons = Array.from(this.root.querySelectorAll(".tab-btn")), this._activate(this._activeIndex);
    const i = this.root.querySelector(".tablist");
    i.addEventListener("click", (s) => {
      const a = s.target.closest(".tab-btn");
      a && this._activate(Number(a.dataset.index));
    }), i.addEventListener("keydown", ((s) => {
      const a = this._buttons.length;
      let o = this._activeIndex;
      switch (s.key) {
        case "ArrowRight":
        case "ArrowDown":
          s.preventDefault(), o = (o + 1) % a;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          s.preventDefault(), o = (o - 1 + a) % a;
          break;
        case "Home":
          s.preventDefault(), o = 0;
          break;
        case "End":
          s.preventDefault(), o = a - 1;
          break;
        case "Enter":
        case " ":
          s.preventDefault(), this._activate(o);
          return;
        default:
          return;
      }
      this._buttons[o].focus(), this._activate(o);
    }));
  }
  _activate(e) {
    this._activeIndex = e, this._buttons.forEach((r, i) => {
      const s = i === e;
      r.setAttribute("aria-selected", String(s)), r.setAttribute("tabindex", s ? "0" : "-1");
    }), this._tabs.forEach((r, i) => {
      i === e ? r.setAttribute("active", "") : r.removeAttribute("active");
    });
  }
}
customElements.define("lv-tabs", Nl);
const Rl = (
  /* css */
  `
  :host {
    display: block;
    border-block-start: 1px solid var(--lv-border);
    padding-block-start: 32px;
    margin-block-start: 60px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 16px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--lv-accent);
    border: 1px solid var(--lv-accent);
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
  }

  a:hover {
    background: var(--lv-accent);
    color: var(--lv-bg);
  }

  .prev { margin-inline-end: auto; }
  .next { margin-inline-start: auto; }

  .arrow {
    font-size: 1.2em;
    line-height: 1;
  }

  /* Empty state: hide missing links */
  a[href=""] {
    display: none;
  }
`
);
class Dl extends I {
  static get observedAttributes() {
    return ["prev", "prev-label", "next", "next-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Rl), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("prev") || "", e = this.getAttribute("prev-label") || "Previous", r = this.getAttribute("next") || "", i = this.getAttribute("next-label") || "Next", s = this.isRtl, a = s ? "→" : "←", o = s ? "←" : "→";
    this.render(`
      <nav class="nav">
        <a class="prev" href="${t}">
          <span class="arrow">${a}</span>
          ${e}
        </a>
        <a class="next" href="${r}">
          ${i}
          <span class="arrow">${o}</span>
        </a>
      </nav>
    `);
  }
}
customElements.define("lv-nav", Dl);
const Il = (
  /* css */
  `
  :host {
    display: block;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    position: relative;
    align-items: start;
  }

  :host([vs]) .comparison {
    grid-template-columns: 1fr auto 1fr;
  }

  .vs-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    inline-size: 44px;
    block-size: 44px;
    border-radius: 50%;
    background: var(--lv-accent);
    color: var(--lv-bg);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .comparison {
      grid-template-columns: 1fr;
    }

    :host([vs]) .comparison {
      grid-template-columns: 1fr;
    }

    .vs-badge {
      justify-self: center;
    }
  }
`
);
class Fl extends I {
  static get observedAttributes() {
    return ["vs"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Il), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("vs"), e = t !== null, r = t || "VS";
    e ? this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${r}</div>
          <slot name="right"></slot>
        </div>
      `) : this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `);
  }
}
customElements.define("lv-comparison", Fl);
const ql = `
  :host {
    display: block;
    text-align: center;
    background: var(--lv-bg-card, #1a1a2e);
    border-radius: var(--lv-r-md, 12px);
    padding: var(--lv-sp-5, 20px) var(--lv-sp-4, 16px);
    border: 1px solid var(--lv-border, #2a2a4a);
    overflow: visible;
  }

  .val {
    font-size: 2.6em;
    font-weight: 800;
    color: var(--_color, var(--lv-accent, #3b82f6));
    text-shadow: 0 0 12px var(--_glow, var(--lv-accent, rgba(59, 130, 246, 0.4)));
    line-height: 1.3;
    padding-block-start: 0.05em;
  }

  .label {
    font-size: 0.85em;
    color: var(--lv-text-dim, #888);
    margin-block-start: 0.35em;
  }
`, Hl = `
  <div class="val"></div>
  <div class="label"></div>
`;
class Bl extends I {
  constructor() {
    super(...arguments);
    O(this, "_observer", null);
  }
  static get observedAttributes() {
    return ["value", "label", "prefix", "suffix", "color", "animated"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles(ql), this.render(Hl), this._update(), this._setupObserver();
  }
  disconnectedCallback() {
    var e, r;
    (e = super.disconnectedCallback) == null || e.call(this), (r = this._observer) == null || r.disconnect(), this._observer = null;
  }
  attributeChangedCallback(e, r, i) {
    this.root.querySelector(".val") && this._update();
  }
  _update() {
    const e = this.getAttribute("color");
    e && (this.style.setProperty("--_color", e), this.style.setProperty("--_glow", e));
    const r = this.root.querySelector(".label");
    r && (r.textContent = this.getAttribute("label") || "");
    const i = this.root.querySelector(".val");
    if (i) {
      const s = this.getAttribute("prefix") || "", a = this.getAttribute("suffix") || "", o = this.getAttribute("value") || "";
      i.textContent = s + o + a;
    }
  }
  _setupObserver() {
    this.hasAttribute("animated") && (this._observer = new IntersectionObserver(
      (e) => {
        var r;
        for (const i of e)
          i.isIntersecting && (this.animateIn(!1), (r = this._observer) == null || r.unobserve(this));
      },
      { threshold: 0.1 }
    ), this._observer.observe(this));
  }
  animateIn(e) {
    if (!this.hasAttribute("animated") || e) return;
    const r = parseFloat(this.getAttribute("value") || "0");
    if (isNaN(r)) return;
    const i = 1200, s = performance.now(), a = this.root.querySelector(".val"), o = (c) => {
      const l = Math.min((c - s) / i, 1), u = 1 - Math.pow(1 - l, 3), h = r * u;
      a.textContent = (this.getAttribute("prefix") || "") + bl(h) + (this.getAttribute("suffix") || ""), l < 1 && requestAnimationFrame(o);
    };
    requestAnimationFrame(o);
  }
}
customElements.define("lv-metric", Bl);
const gs = {
  info: {
    color: "var(--lv-info, #3b82f6)",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 9v5M10 6.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  tip: {
    color: "var(--lv-positive, #22c55e)",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2a5 5 0 0 1 5 5c0 2-1.5 3.2-2 4-.4.6-.5 1-.5 1.5V13H7.5v-.5c0-.5-.1-.9-.5-1.5-.5-.8-2-2-2-4a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.5 15.5h5M8.5 18h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  warning: {
    color: "var(--lv-warning, #eab308)",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L1 18h18L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M10 8v4M10 14.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  danger: {
    color: "var(--lv-negative, #ef4444)",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  }
}, Vl = `
  :host {
    display: block;
    margin-block: 1em;
  }

  .callout {
    border-inline-start: 4px solid var(--_type-color);
    background: var(--_type-bg);
    border-radius: 6px;
    padding-block: 0.75em;
    padding-inline: 1em;
    animation: slide-in 0.4s ease-out both;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-12px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-block-end: 0.4em;
    color: var(--_type-color);
  }

  .header svg {
    flex-shrink: 0;
  }

  .title {
    font-weight: 700;
    font-size: 0.95em;
  }

  .body {
    color: var(--lv-text, #e0e0e0);
    font-size: 0.92em;
    line-height: 1.55;
    padding-inline-start: 1.75em;
  }
`;
class Xl extends I {
  static get observedAttributes() {
    return ["type", "title"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(Vl), this._render();
  }
  attributeChangedCallback(t, e, r) {
    this.root.querySelector(".callout") && this._render();
  }
  _getType() {
    const t = this.getAttribute("type");
    return gs[t] ? t : "info";
  }
  _render() {
    const t = this._getType(), e = gs[t], r = this.getAttribute("title") || "";
    this.style.setProperty("--_type-color", e.color), this.style.setProperty("--_type-bg", `color-mix(in srgb, ${e.color} 8%, transparent)`);
    const i = `
      <div class="callout" role="note">
        <div class="header">
          ${e.icon}
          ${r ? `<span class="title">${r}</span>` : ""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
    this.render(i);
  }
}
customElements.define("lv-callout", Xl);
const Yl = `
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding-block: 2px;
    padding-inline: 12px;
    border-radius: 9999px;
    font-size: 0.75em;
    font-weight: 600;
    line-height: 1.6;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  :host([variant="filled"]) .badge,
  :host(:not([variant])) .badge {
    background: var(--_color, var(--lv-accent, #3b82f6));
    color: var(--lv-badge-text, #fff);
    border: 1px solid transparent;
  }

  :host([variant="outline"]) .badge {
    background: transparent;
    color: var(--_color, var(--lv-accent, #3b82f6));
    border: 1px solid var(--_color, var(--lv-accent, #3b82f6));
  }
`, Gl = `
  <span class="badge"><slot></slot></span>
`;
class Wl extends I {
  static get observedAttributes() {
    return ["color", "variant"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(Yl), this.render(Gl), this._updateColor();
  }
  attributeChangedCallback(t, e, r) {
    t === "color" && this._updateColor();
  }
  _updateColor() {
    const t = this.getAttribute("color");
    t ? this.style.setProperty("--_color", t) : this.style.removeProperty("--_color");
  }
}
customElements.define("lv-badge", Wl);
const Ul = `
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`, Ca = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css", jl = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
let Cn = null;
function Kl() {
  return window.katex ? Promise.resolve() : Cn || (Cn = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = Ca, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = jl, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load KaTeX")), document.head.appendChild(r);
  }), Cn);
}
class Zl extends I {
  constructor() {
    super(...arguments);
    O(this, "_source", "");
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(Ul), this._render();
  }
  async _render() {
    try {
      await Kl();
      const e = this.hasAttribute("display"), r = window.katex.renderToString(this._source, {
        displayMode: e,
        throwOnError: !1
      });
      this.root.innerHTML = `<link rel="stylesheet" href="${Ca}"><span class="katex-container">${r}</span>`;
    } catch {
      this.root.innerHTML = `<span class="fallback">${this._escapeHtml(this._source)}</span>`;
    }
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-math", Zl);
const Ql = `
  :host { display: block; margin: 12px 0; }
  .code-block {
    background: var(--lv-bg-raised);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-r-md);
    padding: 16px 20px;
    overflow-x: auto;
    font-family: var(--lv-font-mono);
    font-size: var(--lv-fs-sm);
    line-height: 1.6;
    direction: ltr;
    text-align: left;
  }
  .line-num {
    color: var(--lv-text-dim);
    user-select: none;
    padding-inline-end: 16px;
    display: inline-block;
    min-width: 2em;
    text-align: end;
  }
`, Jl = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js", $a = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";
let $n = null;
function tc() {
  return window.hljs ? Promise.resolve() : $n || ($n = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = $a, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = Jl, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load highlight.js")), document.head.appendChild(r);
  }), $n);
}
class ec extends I {
  constructor() {
    super(...arguments);
    O(this, "_source", "");
  }
  static get observedAttributes() {
    return ["language", "line-numbers"];
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(Ql), this._render();
  }
  async _render() {
    const e = this.getAttribute("language") || "", r = this.hasAttribute("line-numbers");
    let i;
    try {
      await tc();
      const a = window.hljs;
      e && a.getLanguage(e) ? i = a.highlight(this._source, { language: e }).value : i = a.highlightAuto(this._source).value;
    } catch {
      i = this._escapeHtml(this._source);
    }
    let s;
    r ? s = i.split(`
`).map((o, c) => `<span class="line-num">${c + 1}</span>${o}`).join(`
`) : s = i, this.root.innerHTML = `<link rel="stylesheet" href="${$a}"><div class="code-block"><pre><code>${s}</code></pre></div>`;
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-code", ec);
const nc = `
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
class rc extends I {
  static get observedAttributes() {
    return ["data", "labels", "highlight"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(nc), this._render();
  }
  attributeChangedCallback() {
    this.root && this._render();
  }
  _render() {
    var h;
    const t = this.jsonAttr("data", []), e = this.jsonAttr("labels", {}), r = this.jsonAttr("highlight", []);
    if (!t.length) {
      this.root.innerHTML = "";
      return;
    }
    const i = t.length, s = ((h = t[0]) == null ? void 0 : h.length) || 0, a = !!(e.rows && e.rows.length), o = !!(e.cols && e.cols.length), c = new Set(r.map(([f, d]) => `${f},${d}`)), l = a ? `auto repeat(${s}, auto)` : `repeat(${s}, auto)`;
    let u = '<div class="matrix-wrapper">';
    if (o) {
      const f = a ? `auto repeat(${s}, auto)` : `repeat(${s}, auto)`;
      u += `<div class="col-labels" style="grid-template-columns: ${f}">`, a && (u += "<span></span>");
      for (let d = 0; d < s; d++)
        u += `<span class="col-label">${this._escapeHtml(e.cols[d] || "")}</span>`;
      u += "</div>";
    }
    u += `<div class="matrix" style="grid-template-columns: ${l}">`, u += '<div class="bracket-left"></div>', u += '<div class="bracket-right"></div>';
    for (let f = 0; f < i; f++) {
      a && (u += `<span class="row-label">${this._escapeHtml(e.rows[f] || "")}</span>`);
      for (let d = 0; d < s; d++) {
        const _ = t[f][d], p = typeof _ == "number" ? this._formatNum(_) : String(_), v = c.has(`${f},${d}`);
        u += `<span class="cell${v ? " highlight" : ""}">${p}</span>`;
      }
    }
    u += "</div></div>", this.root.innerHTML = u;
  }
  _formatNum(t) {
    return t.toFixed(3).replace(/0$/, "");
  }
  _escapeHtml(t) {
    const e = document.createElement("span");
    return e.textContent = t, e.innerHTML;
  }
}
customElements.define("lv-matrix", rc);
const ic = (
  /* css */
  `
  :host {
    display: block;
  }

  .question {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: 16px;
    line-height: 1.5;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block-end: 16px;
  }

  .option {
    background: var(--lv-card);
    border: 2px solid var(--lv-border);
    border-radius: 10px;
    padding: 14px 18px;
    color: var(--lv-text);
    font-family: inherit;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s ease, background 0.2s ease, opacity 0.3s ease, transform 0.2s ease;
    outline: none;
    user-select: none;
  }

  .option:hover:not(.dimmed):not(.correct):not(.wrong) {
    border-color: var(--lv-accent);
  }

  .option:focus-visible:not(.dimmed) {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
    border-radius: 10px;
  }

  .option .icon {
    display: none;
    inline-size: 22px;
    block-size: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  }

  .option.correct .icon {
    display: flex;
    background: var(--lv-success, #22c55e);
    color: #fff;
  }

  .option.wrong .icon {
    display: flex;
    background: var(--lv-error, #ef4444);
    color: #fff;
  }

  .option .label {
    flex: 1;
  }

  .option.correct {
    border-color: var(--lv-success, #22c55e);
    background: color-mix(in srgb, var(--lv-success, #22c55e) 10%, var(--lv-card));
    animation: bounce 0.4s ease;
  }

  .option.wrong {
    border-color: var(--lv-error, #ef4444);
    background: color-mix(in srgb, var(--lv-error, #ef4444) 10%, var(--lv-card));
  }

  .option.dimmed {
    opacity: 0.4;
    pointer-events: none;
  }

  @keyframes bounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.03); }
    50%  { transform: scale(0.98); }
    70%  { transform: scale(1.01); }
    100% { transform: scale(1); }
  }

  .explanation {
    overflow: hidden;
    max-block-size: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: max-block-size 0.4s ease, opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
    padding-inline: 4px;
  }

  .explanation.visible {
    max-block-size: 500px;
    opacity: 1;
    transform: translateY(0);
  }

  .explanation-inner {
    padding: 16px;
    background: color-mix(in srgb, var(--lv-accent) 8%, var(--lv-card));
    border-inline-start: 3px solid var(--lv-accent);
    border-radius: 8px;
    color: var(--lv-text);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-block-start: 4px;
  }
`
);
class sc extends I {
  constructor() {
    super(...arguments);
    O(this, "_answered", !1);
  }
  static get observedAttributes() {
    return ["question", "options", "correct", "explanation"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ic), this._render(), this._attachListeners();
  }
  attributeChangedCallback() {
    this._answered || (this._render(), this._attachListeners());
  }
  get _options() {
    return this.jsonAttr("options", []);
  }
  get _correctIndex() {
    return parseInt(this.getAttribute("correct") || "0", 10);
  }
  _render() {
    const e = this.getAttribute("question") || "", r = this._options, i = this.getAttribute("explanation") || "", s = r.map((a, o) => `
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");
    this.render(`
      <div class="question">${e}</div>
      <div class="options">${s}</div>
      ${i ? `<div class="explanation"><div class="explanation-inner">${i}</div></div>` : ""}
    `);
  }
  _attachListeners() {
    this.root.querySelectorAll(".option").forEach((r) => {
      r.addEventListener("click", () => this._select(r)), r.addEventListener("keydown", (i) => {
        const s = i.key;
        (s === "Enter" || s === " ") && (i.preventDefault(), this._select(r));
      });
    });
  }
  _select(e) {
    if (this._answered) return;
    this._answered = !0;
    const r = parseInt(e.dataset.index || "0", 10), i = this._correctIndex, s = r === i;
    this.root.querySelectorAll(".option").forEach((c, l) => {
      const u = c;
      u.removeAttribute("tabindex"), l === i ? (u.classList.add("correct"), u.querySelector(".icon").textContent = "✓") : l === r && !s ? (u.classList.add("wrong"), u.querySelector(".icon").textContent = "✗") : u.classList.add("dimmed");
    });
    const o = this.root.querySelector(".explanation");
    o && requestAnimationFrame(() => o.classList.add("visible")), this.dispatchEvent(new CustomEvent("lv-quiz-answer", {
      bubbles: !0,
      composed: !0,
      detail: { correct: s, selected: r, answer: i }
    }));
  }
}
customElements.define("lv-quiz", sc);
const ac = (
  /* css */
  `
  :host {
    display: block;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 2px dashed var(--lv-accent2, var(--lv-accent));
    border-radius: 10px;
    color: var(--lv-accent2, var(--lv-accent));
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    background: transparent;
    transition: opacity 0.35s ease, max-block-size 0.4s ease, padding 0.4s ease, border-width 0.4s ease, margin 0.4s ease;
    max-block-size: 200px;
    overflow: hidden;
    animation: borderDash 8s linear infinite;
    background-image: repeating-linear-gradient(
      90deg,
      var(--lv-accent2, var(--lv-accent)) 0,
      var(--lv-accent2, var(--lv-accent)) 8px,
      transparent 8px,
      transparent 16px
    );
    background-size: 200% 2px;
    background-position-y: 0, 100%;
    background-repeat: repeat-x;
    /* Override to use the dashed border, the background is just for the animation */
    background-image: none;
    position: relative;
  }

  .trigger::before {
    content: '';
    position: absolute;
    inset: -2px;
    border: 2px dashed var(--lv-accent2, var(--lv-accent));
    border-radius: 10px;
    animation: rotateDash 4s linear infinite;
    pointer-events: none;
  }

  @keyframes rotateDash {
    0%   { stroke-dashoffset: 0; border-color: var(--lv-accent2, var(--lv-accent)); }
    50%  { border-color: color-mix(in srgb, var(--lv-accent2, var(--lv-accent)) 50%, transparent); }
    100% { border-color: var(--lv-accent2, var(--lv-accent)); }
  }

  .trigger:hover {
    background: color-mix(in srgb, var(--lv-accent2, var(--lv-accent)) 8%, transparent);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .trigger.hidden {
    opacity: 0;
    max-block-size: 0;
    padding: 0;
    border-width: 0;
    margin: 0;
    pointer-events: none;
  }

  .trigger.hidden::before {
    display: none;
  }

  .content {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
    pointer-events: none;
    max-block-size: 0;
    overflow: hidden;
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    max-block-size: none;
    overflow: visible;
  }
`
);
class oc extends I {
  constructor() {
    super(...arguments);
    O(this, "_revealed", !1);
  }
  static get observedAttributes() {
    return ["label", "revealed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ac), this._render(), this._attachListeners(), this.hasAttribute("revealed") && this._reveal(!1);
  }
  attributeChangedCallback(e) {
    if (e === "revealed" && this.hasAttribute("revealed") && !this._revealed && this._reveal(!0), e === "label") {
      const r = this.root.querySelector(".trigger-label");
      r && (r.textContent = this._label);
    }
  }
  get _label() {
    return this.getAttribute("label") || "اضغط للإظهار";
  }
  _render() {
    this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `);
  }
  _attachListeners() {
    const e = this.root.querySelector(".trigger");
    e.addEventListener("click", () => this._reveal(!0)), e.addEventListener("keydown", (r) => {
      const i = r.key;
      (i === "Enter" || i === " ") && (r.preventDefault(), this._reveal(!0));
    });
  }
  _reveal(e) {
    if (this._revealed) return;
    this._revealed = !0;
    const r = this.root.querySelector(".trigger"), i = this.root.querySelector(".content");
    r.setAttribute("aria-expanded", "true"), e ? (r.classList.add("hidden"), setTimeout(() => i.classList.add("visible"), 150)) : (r.classList.add("hidden"), i.classList.add("visible"));
  }
}
customElements.define("lv-reveal", oc);
const lc = (
  /* css */
  `
  :host {
    display: block;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-block-end: 10px;
  }

  .label {
    font-size: 0.9rem;
    color: var(--lv-text);
    font-weight: 500;
  }

  .value-display {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--lv-accent);
    font-variant-numeric: tabular-nums;
    transition: transform 0.15s ease;
    display: inline-block;
  }

  .value-display.pop {
    transform: scale(1.15);
  }

  /* === Range input === */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 100%;
    block-size: 6px;
    border-radius: 9999px;
    outline: none;
    cursor: pointer;
    background: var(--lv-border);
    margin: 0;
    direction: ltr; /* always LTR so min is left, max is right regardless of page dir */
  }

  /* Track — WebKit */
  input[type="range"]::-webkit-slider-runnable-track {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--track-bg);
  }

  /* Track — Firefox */
  input[type="range"]::-moz-range-track {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--lv-border);
  }

  input[type="range"]::-moz-range-progress {
    block-size: 6px;
    border-radius: 9999px;
    background: var(--fill-color, var(--lv-accent));
  }

  /* Thumb — WebKit */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
    background: var(--fill-color, var(--lv-accent));
    border: none;
    margin-block-start: -7px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  }

  input[type="range"]:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--fill-color, var(--lv-accent)) 35%, transparent), 0 2px 6px rgba(0,0,0,0.25);
  }

  /* Thumb — Firefox */
  input[type="range"]::-moz-range-thumb {
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
    background: var(--fill-color, var(--lv-accent));
    border: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  }

  input[type="range"]:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--fill-color, var(--lv-accent)) 35%, transparent), 0 2px 6px rgba(0,0,0,0.25);
  }
`
);
class cc extends I {
  constructor() {
    super(...arguments);
    O(this, "_input", null);
    O(this, "_valueEl", null);
    O(this, "_popTimeout", null);
  }
  static get observedAttributes() {
    return ["min", "max", "step", "value", "label", "name", "color"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(lc), this._render(), this._bind(), this._updateTrack();
  }
  attributeChangedCallback() {
    this._input && (this._render(), this._bind(), this._updateTrack());
  }
  get _min() {
    return parseFloat(this.getAttribute("min") || "0");
  }
  get _max() {
    return parseFloat(this.getAttribute("max") || "100");
  }
  get _step() {
    return this.getAttribute("step") || "1";
  }
  get _value() {
    return this.getAttribute("value") || "50";
  }
  get _label() {
    return this.getAttribute("label") || "";
  }
  get _name() {
    return this.getAttribute("name") || "";
  }
  get _color() {
    return this.getAttribute("color") || "";
  }
  _render() {
    const e = this._color ? `--fill-color: ${this._color};` : "";
    this.render(`
      <div class="header">
        <span class="label">${this._label}</span>
        <span class="value-display">${this._value}</span>
      </div>
      <input
        type="range"
        min="${this._min}"
        max="${this._max}"
        step="${this._step}"
        value="${this._value}"
        ${this._name ? `name="${this._name}"` : ""}
        style="${e}"
        aria-label="${this._label}"
      />
    `), this._input = this.root.querySelector("input"), this._valueEl = this.root.querySelector(".value-display");
  }
  _bind() {
    this._input && this._input.addEventListener("input", () => {
      const e = this._input.value;
      this._valueEl && (this._valueEl.textContent = e, this._valueEl.classList.add("pop"), this._popTimeout && clearTimeout(this._popTimeout), this._popTimeout = window.setTimeout(() => {
        var r;
        (r = this._valueEl) == null || r.classList.remove("pop");
      }, 150)), this._updateTrack(), this.dispatchEvent(new CustomEvent("lv-change", {
        bubbles: !0,
        composed: !0,
        detail: { name: this._name, value: parseFloat(e) }
      }));
    });
  }
  _updateTrack() {
    if (!this._input) return;
    const e = this._min, r = this._max, s = (parseFloat(this._input.value) - e) / (r - e) * 100, o = `linear-gradient(to right, ${this._color || "var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;
    this._input.style.setProperty("--track-bg", o), this._input.style.background = o, this._input.style.borderRadius = "9999px";
  }
}
customElements.define("lv-slider", cc);
const uc = (
  /* css */
  `
  :host {
    display: block;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 24px;
  }

  .output {
    min-inline-size: 0;
    order: 0;
  }

  .controls {
    order: 1;
    background: var(--lv-bg-raised);
    padding: 20px;
    border-radius: 12px;
    border-inline-start: 2px solid var(--lv-border);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* Responsive: stack on mobile */
  @media (max-width: 640px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .controls {
      order: -1;
      border-inline-start: none;
      border-block-end: 2px solid var(--lv-border);
    }
  }
`
);
class hc extends I {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(uc), this._render(), this._bind();
  }
  _render() {
    this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `);
  }
  _bind() {
    this.addEventListener("lv-change", () => {
      const t = this._collectParams();
      this.dispatchEvent(new CustomEvent("lv-params-change", {
        bubbles: !0,
        composed: !0,
        detail: t
      }));
    });
  }
  _collectParams() {
    const t = this.querySelectorAll('lv-slider[slot="controls"]'), e = {};
    return t.forEach((r) => {
      var s;
      const i = r.getAttribute("name");
      if (i) {
        const a = (s = r.root) == null ? void 0 : s.querySelector("input"), o = parseFloat(a ? a.value : r.getAttribute("value") || "0");
        e[i] = o;
      }
    }), e;
  }
}
customElements.define("lv-playground", hc);
const fc = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function _s(n) {
  return String(n).split("").map((t) => fc[parseInt(t)] ?? t).join("");
}
const dc = (
  /* css */
  `
  :host {
    display: none;
  }

  :host(.active) {
    display: block;
    animation: stepIn 0.35s ease both;
  }

  :host(.active.from-start) {
    animation-name: stepInFromStart;
  }

  :host(.active.from-end) {
    animation-name: stepInFromEnd;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: 12px;
  }

  @keyframes stepInFromEnd {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes stepInFromStart {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`
);
class pc extends I {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(dc), this._render();
  }
  attributeChangedCallback() {
    this.root.querySelector(".title") && this._render();
  }
  get _title() {
    return this.getAttribute("title") || "";
  }
  _render() {
    this.render(`
      ${this._title ? `<div class="title">${this._title}</div>` : ""}
      <slot></slot>
    `);
  }
}
customElements.define("lv-step", pc);
const gc = (
  /* css */
  `
  :host {
    display: block;
  }

  .container {
    background: var(--lv-bg-card);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid var(--lv-border);
  }

  .steps {
    min-block-size: 60px;
  }

  .counter {
    text-align: center;
    color: var(--lv-text-dim);
    font-size: 0.85rem;
    margin-block-end: 16px;
    font-variant-numeric: tabular-nums;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-start: 20px;
    gap: 12px;
  }

  .btn {
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 8px;
    border: 2px solid var(--lv-accent);
    background: transparent;
    color: var(--lv-accent);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover:not(:disabled) {
    background: var(--lv-accent);
    color: var(--lv-bg-card);
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`
);
class _c extends I {
  constructor() {
    super(...arguments);
    O(this, "_current", 0);
    O(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(gc), this._render(), requestAnimationFrame(() => {
      this._steps = Array.from(this.querySelectorAll("lv-step")), this._showStep(0, null), this._bind();
    });
  }
  get _total() {
    return this._steps.length;
  }
  _render() {
    this.render(`
      <div class="container">
        <div class="counter"></div>
        <div class="steps">
          <slot></slot>
        </div>
        <div class="nav">
          <button class="btn prev">السابق</button>
          <button class="btn next">التالي</button>
        </div>
      </div>
    `);
  }
  _bind() {
    const e = this.root.querySelector(".prev"), r = this.root.querySelector(".next");
    e.addEventListener("click", () => this._go(-1)), r.addEventListener("click", () => this._go(1)), this.addEventListener("keydown", (i) => {
      i.key === "ArrowRight" ? (i.preventDefault(), this._go(this.isRtl ? -1 : 1)) : i.key === "ArrowLeft" && (i.preventDefault(), this._go(this.isRtl ? 1 : -1));
    }), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0");
  }
  _go(e) {
    const r = this._current + e;
    r < 0 || r >= this._total || (this._current, this._current = r, this._showStep(r, e > 0 ? "forward" : "backward"));
  }
  _showStep(e, r) {
    this._steps.forEach((o, c) => {
      o.classList.remove("active", "from-start", "from-end"), c === e && (o.classList.add("active"), r === "forward" ? o.classList.add(this.isRtl ? "from-start" : "from-end") : r === "backward" && o.classList.add(this.isRtl ? "from-end" : "from-start"));
    });
    const i = this.root.querySelector(".counter");
    i && (i.textContent = `${_s(e + 1)} / ${_s(this._total)}`);
    const s = this.root.querySelector(".prev"), a = this.root.querySelector(".next");
    s && (s.disabled = e === 0), a && (a.disabled = e === this._total - 1);
  }
}
customElements.define("lv-stepper", _c);
function Dn(n, t) {
  return n == null || t == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function mc(n, t) {
  return n == null || t == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Si(n) {
  let t, e, r;
  n.length !== 2 ? (t = Dn, e = (o, c) => Dn(n(o), c), r = (o, c) => n(o) - c) : (t = n === Dn || n === mc ? n : vc, e = n, r = n);
  function i(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (t(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        e(o[h], c) < 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function s(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (t(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        e(o[h], c) <= 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function a(o, c, l = 0, u = o.length) {
    const h = i(o, c, l, u - 1);
    return h > l && r(o[h - 1], c) > -r(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: a, right: s };
}
function vc() {
  return 0;
}
function xc(n) {
  return n === null ? NaN : +n;
}
const bc = Si(Dn), yc = bc.right;
Si(xc).center;
function Gn(n, t) {
  let e, r;
  if (t === void 0)
    for (const i of n)
      i != null && (e === void 0 ? i >= i && (e = r = i) : (e > i && (e = i), r < i && (r = i)));
  else {
    let i = -1;
    for (let s of n)
      (s = t(s, ++i, n)) != null && (e === void 0 ? s >= s && (e = r = s) : (e > s && (e = s), r < s && (r = s)));
  }
  return [e, r];
}
class ms extends Map {
  constructor(t, e = Ac) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), t != null) for (const [r, i] of t) this.set(r, i);
  }
  get(t) {
    return super.get(vs(this, t));
  }
  has(t) {
    return super.has(vs(this, t));
  }
  set(t, e) {
    return super.set(wc(this, t), e);
  }
  delete(t) {
    return super.delete(kc(this, t));
  }
}
function vs({ _intern: n, _key: t }, e) {
  const r = t(e);
  return n.has(r) ? n.get(r) : e;
}
function wc({ _intern: n, _key: t }, e) {
  const r = t(e);
  return n.has(r) ? n.get(r) : (n.set(r, e), e);
}
function kc({ _intern: n, _key: t }, e) {
  const r = t(e);
  return n.has(r) && (e = n.get(r), n.delete(r)), e;
}
function Ac(n) {
  return n !== null && typeof n == "object" ? n.valueOf() : n;
}
const Cc = Math.sqrt(50), $c = Math.sqrt(10), Sc = Math.sqrt(2);
function Wn(n, t, e) {
  const r = (t - n) / Math.max(0, e), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), a = s >= Cc ? 10 : s >= $c ? 5 : s >= Sc ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, o = Math.round(n * l), c = Math.round(t * l), o / l < n && ++o, c / l > t && --c, l = -l) : (l = Math.pow(10, i) * a, o = Math.round(n / l), c = Math.round(t / l), o * l < n && ++o, c * l > t && --c), c < o && 0.5 <= e && e < 2 ? Wn(n, t, e * 2) : [o, c, l];
}
function Tc(n, t, e) {
  if (t = +t, n = +n, e = +e, !(e > 0)) return [];
  if (n === t) return [n];
  const r = t < n, [i, s, a] = r ? Wn(t, n, e) : Wn(n, t, e);
  if (!(s >= i)) return [];
  const o = s - i + 1, c = new Array(o);
  if (r)
    if (a < 0) for (let l = 0; l < o; ++l) c[l] = (s - l) / -a;
    else for (let l = 0; l < o; ++l) c[l] = (s - l) * a;
  else if (a < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -a;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * a;
  return c;
}
function Jr(n, t, e) {
  return t = +t, n = +n, e = +e, Wn(n, t, e)[2];
}
function Mc(n, t, e) {
  t = +t, n = +n, e = +e;
  const r = t < n, i = r ? Jr(t, n, e) : Jr(n, t, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Un(n, t) {
  let e;
  if (t === void 0)
    for (const r of n)
      r != null && (e < r || e === void 0 && r >= r) && (e = r);
  else {
    let r = -1;
    for (let i of n)
      (i = t(i, ++r, n)) != null && (e < i || e === void 0 && i >= i) && (e = i);
  }
  return e;
}
function Ec(n, t) {
  let e;
  for (const r of n)
    r != null && (e > r || e === void 0 && r >= r) && (e = r);
  return e;
}
function Pc(n, t, e) {
  n = +n, t = +t, e = (i = arguments.length) < 2 ? (t = n, n = 0, 1) : i < 3 ? 1 : +e;
  for (var r = -1, i = Math.max(0, Math.ceil((t - n) / e)) | 0, s = new Array(i); ++r < i; )
    s[r] = n + r * e;
  return s;
}
function zc(n) {
  return n;
}
var Er = 1, Pr = 2, ti = 3, Ze = 4, xs = 1e-6;
function Oc(n) {
  return "translate(" + n + ",0)";
}
function Lc(n) {
  return "translate(0," + n + ")";
}
function Nc(n) {
  return (t) => +n(t);
}
function Rc(n, t) {
  return t = Math.max(0, n.bandwidth() - t * 2) / 2, n.round() && (t = Math.round(t)), (e) => +n(e) + t;
}
function Dc() {
  return !this.__axis;
}
function Sa(n, t) {
  var e = [], r = null, i = null, s = 6, a = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = n === Er || n === Ze ? -1 : 1, u = n === Ze || n === Pr ? "x" : "y", h = n === Er || n === ti ? Oc : Lc;
  function f(d) {
    var _ = r ?? (t.ticks ? t.ticks.apply(t, e) : t.domain()), p = i ?? (t.tickFormat ? t.tickFormat.apply(t, e) : zc), v = Math.max(s, 0) + o, b = t.range(), y = +b[0] + c, x = +b[b.length - 1] + c, g = (t.bandwidth ? Rc : Nc)(t.copy(), c), m = d.selection ? d.selection() : d, w = m.selectAll(".domain").data([null]), $ = m.selectAll(".tick").data(_, t).order(), A = $.exit(), k = $.enter().append("g").attr("class", "tick"), C = $.select("line"), T = $.select("text");
    w = w.merge(w.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), $ = $.merge(k), C = C.merge(k.append("line").attr("stroke", "currentColor").attr(u + "2", l * s)), T = T.merge(k.append("text").attr("fill", "currentColor").attr(u, l * v).attr("dy", n === Er ? "0em" : n === ti ? "0.71em" : "0.32em")), d !== m && (w = w.transition(d), $ = $.transition(d), C = C.transition(d), T = T.transition(d), A = A.transition(d).attr("opacity", xs).attr("transform", function(S) {
      return isFinite(S = g(S)) ? h(S + c) : this.getAttribute("transform");
    }), k.attr("opacity", xs).attr("transform", function(S) {
      var M = this.parentNode.__axis;
      return h((M && isFinite(M = M(S)) ? M : g(S)) + c);
    })), A.remove(), w.attr("d", n === Ze || n === Pr ? a ? "M" + l * a + "," + y + "H" + c + "V" + x + "H" + l * a : "M" + c + "," + y + "V" + x : a ? "M" + y + "," + l * a + "V" + c + "H" + x + "V" + l * a : "M" + y + "," + c + "H" + x), $.attr("opacity", 1).attr("transform", function(S) {
      return h(g(S) + c);
    }), C.attr(u + "2", l * s), T.attr(u, l * v).text(p), m.filter(Dc).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", n === Pr ? "start" : n === Ze ? "end" : "middle"), m.each(function() {
      this.__axis = g;
    });
  }
  return f.scale = function(d) {
    return arguments.length ? (t = d, f) : t;
  }, f.ticks = function() {
    return e = Array.from(arguments), f;
  }, f.tickArguments = function(d) {
    return arguments.length ? (e = d == null ? [] : Array.from(d), f) : e.slice();
  }, f.tickValues = function(d) {
    return arguments.length ? (r = d == null ? null : Array.from(d), f) : r && r.slice();
  }, f.tickFormat = function(d) {
    return arguments.length ? (i = d, f) : i;
  }, f.tickSize = function(d) {
    return arguments.length ? (s = a = +d, f) : s;
  }, f.tickSizeInner = function(d) {
    return arguments.length ? (s = +d, f) : s;
  }, f.tickSizeOuter = function(d) {
    return arguments.length ? (a = +d, f) : a;
  }, f.tickPadding = function(d) {
    return arguments.length ? (o = +d, f) : o;
  }, f.offset = function(d) {
    return arguments.length ? (c = +d, f) : c;
  }, f;
}
function jn(n) {
  return Sa(ti, n);
}
function Kn(n) {
  return Sa(Ze, n);
}
var Ic = { value: () => {
} };
function Ti() {
  for (var n = 0, t = arguments.length, e = {}, r; n < t; ++n) {
    if (!(r = arguments[n] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new In(e);
}
function In(n) {
  this._ = n;
}
function Fc(n, t) {
  return n.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !t.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
In.prototype = Ti.prototype = {
  constructor: In,
  on: function(n, t) {
    var e = this._, r = Fc(n + "", e), i, s = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (n = r[s]).type) && (i = qc(e[i], n.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (i = (n = r[s]).type) e[i] = bs(e[i], n.name, t);
      else if (t == null) for (i in e) e[i] = bs(e[i], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, t = this._;
    for (var e in t) n[e] = t[e].slice();
    return new In(n);
  },
  call: function(n, t) {
    if ((i = arguments.length - 2) > 0) for (var e = new Array(i), r = 0, i, s; r < i; ++r) e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (s = this._[n], r = 0, i = s.length; r < i; ++r) s[r].value.apply(t, e);
  },
  apply: function(n, t, e) {
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (var r = this._[n], i = 0, s = r.length; i < s; ++i) r[i].value.apply(t, e);
  }
};
function qc(n, t) {
  for (var e = 0, r = n.length, i; e < r; ++e)
    if ((i = n[e]).name === t)
      return i.value;
}
function bs(n, t, e) {
  for (var r = 0, i = n.length; r < i; ++r)
    if (n[r].name === t) {
      n[r] = Ic, n = n.slice(0, r).concat(n.slice(r + 1));
      break;
    }
  return e != null && n.push({ name: t, value: e }), n;
}
var ei = "http://www.w3.org/1999/xhtml";
const ys = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ei,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function vr(n) {
  var t = n += "", e = t.indexOf(":");
  return e >= 0 && (t = n.slice(0, e)) !== "xmlns" && (n = n.slice(e + 1)), ys.hasOwnProperty(t) ? { space: ys[t], local: n } : n;
}
function Hc(n) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === ei && t.documentElement.namespaceURI === ei ? t.createElement(n) : t.createElementNS(e, n);
  };
}
function Bc(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Ta(n) {
  var t = vr(n);
  return (t.local ? Bc : Hc)(t);
}
function Vc() {
}
function Mi(n) {
  return n == null ? Vc : function() {
    return this.querySelector(n);
  };
}
function Xc(n) {
  typeof n != "function" && (n = Mi(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = new Array(a), c, l, u = 0; u < a; ++u)
      (c = s[u]) && (l = n.call(c, c.__data__, u, s)) && ("__data__" in c && (l.__data__ = c.__data__), o[u] = l);
  return new wt(r, this._parents);
}
function Yc(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function Gc() {
  return [];
}
function Ma(n) {
  return n == null ? Gc : function() {
    return this.querySelectorAll(n);
  };
}
function Wc(n) {
  return function() {
    return Yc(n.apply(this, arguments));
  };
}
function Uc(n) {
  typeof n == "function" ? n = Wc(n) : n = Ma(n);
  for (var t = this._groups, e = t.length, r = [], i = [], s = 0; s < e; ++s)
    for (var a = t[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && (r.push(n.call(c, c.__data__, l, a)), i.push(c));
  return new wt(r, i);
}
function Ea(n) {
  return function() {
    return this.matches(n);
  };
}
function Pa(n) {
  return function(t) {
    return t.matches(n);
  };
}
var jc = Array.prototype.find;
function Kc(n) {
  return function() {
    return jc.call(this.children, n);
  };
}
function Zc() {
  return this.firstElementChild;
}
function Qc(n) {
  return this.select(n == null ? Zc : Kc(typeof n == "function" ? n : Pa(n)));
}
var Jc = Array.prototype.filter;
function tu() {
  return Array.from(this.children);
}
function eu(n) {
  return function() {
    return Jc.call(this.children, n);
  };
}
function nu(n) {
  return this.selectAll(n == null ? tu : eu(typeof n == "function" ? n : Pa(n)));
}
function ru(n) {
  typeof n != "function" && (n = Ea(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new wt(r, this._parents);
}
function za(n) {
  return new Array(n.length);
}
function iu() {
  return new wt(this._enter || this._groups.map(za), this._parents);
}
function Zn(n, t) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = t;
}
Zn.prototype = {
  constructor: Zn,
  appendChild: function(n) {
    return this._parent.insertBefore(n, this._next);
  },
  insertBefore: function(n, t) {
    return this._parent.insertBefore(n, t);
  },
  querySelector: function(n) {
    return this._parent.querySelector(n);
  },
  querySelectorAll: function(n) {
    return this._parent.querySelectorAll(n);
  }
};
function su(n) {
  return function() {
    return n;
  };
}
function au(n, t, e, r, i, s) {
  for (var a = 0, o, c = t.length, l = s.length; a < l; ++a)
    (o = t[a]) ? (o.__data__ = s[a], r[a] = o) : e[a] = new Zn(n, s[a]);
  for (; a < c; ++a)
    (o = t[a]) && (i[a] = o);
}
function ou(n, t, e, r, i, s, a) {
  var o, c, l = /* @__PURE__ */ new Map(), u = t.length, h = s.length, f = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = t[o]) && (f[o] = d = a.call(c, c.__data__, o, t) + "", l.has(d) ? i[o] = c : l.set(d, c));
  for (o = 0; o < h; ++o)
    d = a.call(n, s[o], o, s) + "", (c = l.get(d)) ? (r[o] = c, c.__data__ = s[o], l.delete(d)) : e[o] = new Zn(n, s[o]);
  for (o = 0; o < u; ++o)
    (c = t[o]) && l.get(f[o]) === c && (i[o] = c);
}
function lu(n) {
  return n.__data__;
}
function cu(n, t) {
  if (!arguments.length) return Array.from(this, lu);
  var e = t ? ou : au, r = this._parents, i = this._groups;
  typeof n != "function" && (n = su(n));
  for (var s = i.length, a = new Array(s), o = new Array(s), c = new Array(s), l = 0; l < s; ++l) {
    var u = r[l], h = i[l], f = h.length, d = uu(n.call(u, u && u.__data__, l, r)), _ = d.length, p = o[l] = new Array(_), v = a[l] = new Array(_), b = c[l] = new Array(f);
    e(u, h, p, v, b, d, t);
    for (var y = 0, x = 0, g, m; y < _; ++y)
      if (g = p[y]) {
        for (y >= x && (x = y + 1); !(m = v[x]) && ++x < _; ) ;
        g._next = m || null;
      }
  }
  return a = new wt(a, r), a._enter = o, a._exit = c, a;
}
function uu(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function hu() {
  return new wt(this._exit || this._groups.map(za), this._parents);
}
function fu(n, t, e) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof n == "function" ? (r = n(r), r && (r = r.selection())) : r = r.append(n + ""), t != null && (i = t(i), i && (i = i.selection())), e == null ? s.remove() : e(s), r && i ? r.merge(i).order() : i;
}
function du(n) {
  for (var t = n.selection ? n.selection() : n, e = this._groups, r = t._groups, i = e.length, s = r.length, a = Math.min(i, s), o = new Array(i), c = 0; c < a; ++c)
    for (var l = e[c], u = r[c], h = l.length, f = o[c] = new Array(h), d, _ = 0; _ < h; ++_)
      (d = l[_] || u[_]) && (f[_] = d);
  for (; c < i; ++c)
    o[c] = e[c];
  return new wt(o, this._parents);
}
function pu() {
  for (var n = this._groups, t = -1, e = n.length; ++t < e; )
    for (var r = n[t], i = r.length - 1, s = r[i], a; --i >= 0; )
      (a = r[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function gu(n) {
  n || (n = _u);
  function t(h, f) {
    return h && f ? n(h.__data__, f.__data__) : !h - !f;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var a = e[s], o = a.length, c = i[s] = new Array(o), l, u = 0; u < o; ++u)
      (l = a[u]) && (c[u] = l);
    c.sort(t);
  }
  return new wt(i, this._parents).order();
}
function _u(n, t) {
  return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function mu() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function vu() {
  return Array.from(this);
}
function xu() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length; i < s; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function bu() {
  let n = 0;
  for (const t of this) ++n;
  return n;
}
function yu() {
  return !this.node();
}
function wu(n) {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var i = t[e], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && n.call(o, o.__data__, s, i);
  return this;
}
function ku(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Au(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Cu(n, t) {
  return function() {
    this.setAttribute(n, t);
  };
}
function $u(n, t) {
  return function() {
    this.setAttributeNS(n.space, n.local, t);
  };
}
function Su(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(n) : this.setAttribute(n, e);
  };
}
function Tu(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
  };
}
function Mu(n, t) {
  var e = vr(n);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((t == null ? e.local ? Au : ku : typeof t == "function" ? e.local ? Tu : Su : e.local ? $u : Cu)(e, t));
}
function Oa(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function Eu(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Pu(n, t, e) {
  return function() {
    this.style.setProperty(n, t, e);
  };
}
function zu(n, t, e) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
  };
}
function Ou(n, t, e) {
  return arguments.length > 1 ? this.each((t == null ? Eu : typeof t == "function" ? zu : Pu)(n, t, e ?? "")) : Oe(this.node(), n);
}
function Oe(n, t) {
  return n.style.getPropertyValue(t) || Oa(n).getComputedStyle(n, null).getPropertyValue(t);
}
function Lu(n) {
  return function() {
    delete this[n];
  };
}
function Nu(n, t) {
  return function() {
    this[n] = t;
  };
}
function Ru(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[n] : this[n] = e;
  };
}
function Du(n, t) {
  return arguments.length > 1 ? this.each((t == null ? Lu : typeof t == "function" ? Ru : Nu)(n, t)) : this.node()[n];
}
function La(n) {
  return n.trim().split(/^|\s+/);
}
function Ei(n) {
  return n.classList || new Na(n);
}
function Na(n) {
  this._node = n, this._names = La(n.getAttribute("class") || "");
}
Na.prototype = {
  add: function(n) {
    var t = this._names.indexOf(n);
    t < 0 && (this._names.push(n), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(n) {
    var t = this._names.indexOf(n);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(n) {
    return this._names.indexOf(n) >= 0;
  }
};
function Ra(n, t) {
  for (var e = Ei(n), r = -1, i = t.length; ++r < i; ) e.add(t[r]);
}
function Da(n, t) {
  for (var e = Ei(n), r = -1, i = t.length; ++r < i; ) e.remove(t[r]);
}
function Iu(n) {
  return function() {
    Ra(this, n);
  };
}
function Fu(n) {
  return function() {
    Da(this, n);
  };
}
function qu(n, t) {
  return function() {
    (t.apply(this, arguments) ? Ra : Da)(this, n);
  };
}
function Hu(n, t) {
  var e = La(n + "");
  if (arguments.length < 2) {
    for (var r = Ei(this.node()), i = -1, s = e.length; ++i < s; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? qu : t ? Iu : Fu)(e, t));
}
function Bu() {
  this.textContent = "";
}
function Vu(n) {
  return function() {
    this.textContent = n;
  };
}
function Xu(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Yu(n) {
  return arguments.length ? this.each(n == null ? Bu : (typeof n == "function" ? Xu : Vu)(n)) : this.node().textContent;
}
function Gu() {
  this.innerHTML = "";
}
function Wu(n) {
  return function() {
    this.innerHTML = n;
  };
}
function Uu(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function ju(n) {
  return arguments.length ? this.each(n == null ? Gu : (typeof n == "function" ? Uu : Wu)(n)) : this.node().innerHTML;
}
function Ku() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Zu() {
  return this.each(Ku);
}
function Qu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ju() {
  return this.each(Qu);
}
function th(n) {
  var t = typeof n == "function" ? n : Ta(n);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function eh() {
  return null;
}
function nh(n, t) {
  var e = typeof n == "function" ? n : Ta(n), r = t == null ? eh : typeof t == "function" ? t : Mi(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function rh() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function ih() {
  return this.each(rh);
}
function sh() {
  var n = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function ah() {
  var n = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function oh(n) {
  return this.select(n ? ah : sh);
}
function lh(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function ch(n) {
  return function(t) {
    n.call(this, t, this.__data__);
  };
}
function uh(n) {
  return n.trim().split(/^|\s+/).map(function(t) {
    var e = "", r = t.indexOf(".");
    return r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: e };
  });
}
function hh(n) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e = 0, r = -1, i = t.length, s; e < i; ++e)
        s = t[e], (!n.type || s.type === n.type) && s.name === n.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++r] = s;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function fh(n, t, e) {
  return function() {
    var r = this.__on, i, s = ch(t);
    if (r) {
      for (var a = 0, o = r.length; a < o; ++a)
        if ((i = r[a]).type === n.type && i.name === n.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = e), i.value = t;
          return;
        }
    }
    this.addEventListener(n.type, s, e), i = { type: n.type, name: n.name, value: t, listener: s, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function dh(n, t, e) {
  var r = uh(n + ""), i, s = r.length, a;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, u; c < l; ++c)
        for (i = 0, u = o[c]; i < s; ++i)
          if ((a = r[i]).type === u.type && a.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = t ? fh : hh, i = 0; i < s; ++i) this.each(o(r[i], t, e));
  return this;
}
function Ia(n, t, e) {
  var r = Oa(n), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(t, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(t, !1, !1)), n.dispatchEvent(i);
}
function ph(n, t) {
  return function() {
    return Ia(this, n, t);
  };
}
function gh(n, t) {
  return function() {
    return Ia(this, n, t.apply(this, arguments));
  };
}
function _h(n, t) {
  return this.each((typeof t == "function" ? gh : ph)(n, t));
}
function* mh() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length, a; i < s; ++i)
      (a = r[i]) && (yield a);
}
var Fa = [null];
function wt(n, t) {
  this._groups = n, this._parents = t;
}
function wn() {
  return new wt([[document.documentElement]], Fa);
}
function vh() {
  return this;
}
wt.prototype = wn.prototype = {
  constructor: wt,
  select: Xc,
  selectAll: Uc,
  selectChild: Qc,
  selectChildren: nu,
  filter: ru,
  data: cu,
  enter: iu,
  exit: hu,
  join: fu,
  merge: du,
  selection: vh,
  order: pu,
  sort: gu,
  call: mu,
  nodes: vu,
  node: xu,
  size: bu,
  empty: yu,
  each: wu,
  attr: Mu,
  style: Ou,
  property: Du,
  classed: Hu,
  text: Yu,
  html: ju,
  raise: Zu,
  lower: Ju,
  append: th,
  insert: nh,
  remove: ih,
  clone: oh,
  datum: lh,
  on: dh,
  dispatch: _h,
  [Symbol.iterator]: mh
};
function G(n) {
  return typeof n == "string" ? new wt([[document.querySelector(n)]], [document.documentElement]) : new wt([[n]], Fa);
}
function xh(n) {
  let t;
  for (; t = n.sourceEvent; ) n = t;
  return n;
}
function ni(n, t) {
  if (n = xh(n), t === void 0 && (t = n.currentTarget), t) {
    var e = t.ownerSVGElement || t;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
    }
  }
  return [n.pageX, n.pageY];
}
const bh = { passive: !1 }, ln = { capture: !0, passive: !1 };
function zr(n) {
  n.stopImmediatePropagation();
}
function Se(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function yh(n) {
  var t = n.document.documentElement, e = G(n).on("dragstart.drag", Se, ln);
  "onselectstart" in t ? e.on("selectstart.drag", Se, ln) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function wh(n, t) {
  var e = n.document.documentElement, r = G(n).on("dragstart.drag", null);
  t && (r.on("click.drag", Se, ln), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
const Sn = (n) => () => n;
function ri(n, {
  sourceEvent: t,
  subject: e,
  target: r,
  identifier: i,
  active: s,
  x: a,
  y: o,
  dx: c,
  dy: l,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: a, enumerable: !0, configurable: !0 },
    y: { value: o, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
ri.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function kh(n) {
  return !n.ctrlKey && !n.button;
}
function Ah() {
  return this.parentNode;
}
function Ch(n, t) {
  return t ?? { x: n.x, y: n.y };
}
function $h() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Sh() {
  var n = kh, t = Ah, e = Ch, r = $h, i = {}, s = Ti("start", "drag", "end"), a = 0, o, c, l, u, h = 0;
  function f(g) {
    g.on("mousedown.drag", d).filter(r).on("touchstart.drag", v).on("touchmove.drag", b, bh).on("touchend.drag touchcancel.drag", y).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(g, m) {
    if (!(u || !n.call(this, g, m))) {
      var w = x(this, t.call(this, g, m), g, m, "mouse");
      w && (G(g.view).on("mousemove.drag", _, ln).on("mouseup.drag", p, ln), yh(g.view), zr(g), l = !1, o = g.clientX, c = g.clientY, w("start", g));
    }
  }
  function _(g) {
    if (Se(g), !l) {
      var m = g.clientX - o, w = g.clientY - c;
      l = m * m + w * w > h;
    }
    i.mouse("drag", g);
  }
  function p(g) {
    G(g.view).on("mousemove.drag mouseup.drag", null), wh(g.view, l), Se(g), i.mouse("end", g);
  }
  function v(g, m) {
    if (n.call(this, g, m)) {
      var w = g.changedTouches, $ = t.call(this, g, m), A = w.length, k, C;
      for (k = 0; k < A; ++k)
        (C = x(this, $, g, m, w[k].identifier, w[k])) && (zr(g), C("start", g, w[k]));
    }
  }
  function b(g) {
    var m = g.changedTouches, w = m.length, $, A;
    for ($ = 0; $ < w; ++$)
      (A = i[m[$].identifier]) && (Se(g), A("drag", g, m[$]));
  }
  function y(g) {
    var m = g.changedTouches, w = m.length, $, A;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), $ = 0; $ < w; ++$)
      (A = i[m[$].identifier]) && (zr(g), A("end", g, m[$]));
  }
  function x(g, m, w, $, A, k) {
    var C = s.copy(), T = ni(k || w, m), S, M, E;
    if ((E = e.call(g, new ri("beforestart", {
      sourceEvent: w,
      target: f,
      identifier: A,
      active: a,
      x: T[0],
      y: T[1],
      dx: 0,
      dy: 0,
      dispatch: C
    }), $)) != null)
      return S = E.x - T[0] || 0, M = E.y - T[1] || 0, function P(z, L, D) {
        var B = T, F;
        switch (z) {
          case "start":
            i[A] = P, F = a++;
            break;
          case "end":
            delete i[A], --a;
          // falls through
          case "drag":
            T = ni(D || L, m), F = a;
            break;
        }
        C.call(
          z,
          g,
          new ri(z, {
            sourceEvent: L,
            subject: E,
            target: f,
            identifier: A,
            active: F,
            x: T[0] + S,
            y: T[1] + M,
            dx: T[0] - B[0],
            dy: T[1] - B[1],
            dispatch: C
          }),
          $
        );
      };
  }
  return f.filter = function(g) {
    return arguments.length ? (n = typeof g == "function" ? g : Sn(!!g), f) : n;
  }, f.container = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : Sn(g), f) : t;
  }, f.subject = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : Sn(g), f) : e;
  }, f.touchable = function(g) {
    return arguments.length ? (r = typeof g == "function" ? g : Sn(!!g), f) : r;
  }, f.on = function() {
    var g = s.on.apply(s, arguments);
    return g === s ? f : g;
  }, f.clickDistance = function(g) {
    return arguments.length ? (h = (g = +g) * g, f) : Math.sqrt(h);
  }, f;
}
function Pi(n, t, e) {
  n.prototype = t.prototype = e, e.constructor = n;
}
function qa(n, t) {
  var e = Object.create(n.prototype);
  for (var r in t) e[r] = t[r];
  return e;
}
function kn() {
}
var cn = 0.7, Qn = 1 / cn, Te = "\\s*([+-]?\\d+)\\s*", un = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Dt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Th = /^#([0-9a-f]{3,8})$/, Mh = new RegExp(`^rgb\\(${Te},${Te},${Te}\\)$`), Eh = new RegExp(`^rgb\\(${Dt},${Dt},${Dt}\\)$`), Ph = new RegExp(`^rgba\\(${Te},${Te},${Te},${un}\\)$`), zh = new RegExp(`^rgba\\(${Dt},${Dt},${Dt},${un}\\)$`), Oh = new RegExp(`^hsl\\(${un},${Dt},${Dt}\\)$`), Lh = new RegExp(`^hsla\\(${un},${Dt},${Dt},${un}\\)$`), ws = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Pi(kn, te, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ks,
  // Deprecated! Use color.formatHex.
  formatHex: ks,
  formatHex8: Nh,
  formatHsl: Rh,
  formatRgb: As,
  toString: As
});
function ks() {
  return this.rgb().formatHex();
}
function Nh() {
  return this.rgb().formatHex8();
}
function Rh() {
  return Ha(this).formatHsl();
}
function As() {
  return this.rgb().formatRgb();
}
function te(n) {
  var t, e;
  return n = (n + "").trim().toLowerCase(), (t = Th.exec(n)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? Cs(t) : e === 3 ? new lt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : e === 8 ? Tn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : e === 4 ? Tn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Mh.exec(n)) ? new lt(t[1], t[2], t[3], 1) : (t = Eh.exec(n)) ? new lt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ph.exec(n)) ? Tn(t[1], t[2], t[3], t[4]) : (t = zh.exec(n)) ? Tn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Oh.exec(n)) ? Ts(t[1], t[2] / 100, t[3] / 100, 1) : (t = Lh.exec(n)) ? Ts(t[1], t[2] / 100, t[3] / 100, t[4]) : ws.hasOwnProperty(n) ? Cs(ws[n]) : n === "transparent" ? new lt(NaN, NaN, NaN, 0) : null;
}
function Cs(n) {
  return new lt(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function Tn(n, t, e, r) {
  return r <= 0 && (n = t = e = NaN), new lt(n, t, e, r);
}
function Dh(n) {
  return n instanceof kn || (n = te(n)), n ? (n = n.rgb(), new lt(n.r, n.g, n.b, n.opacity)) : new lt();
}
function Jn(n, t, e, r) {
  return arguments.length === 1 ? Dh(n) : new lt(n, t, e, r ?? 1);
}
function lt(n, t, e, r) {
  this.r = +n, this.g = +t, this.b = +e, this.opacity = +r;
}
Pi(lt, Jn, qa(kn, {
  brighter(n) {
    return n = n == null ? Qn : Math.pow(Qn, n), new lt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? cn : Math.pow(cn, n), new lt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new lt(de(this.r), de(this.g), de(this.b), tr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: $s,
  // Deprecated! Use color.formatHex.
  formatHex: $s,
  formatHex8: Ih,
  formatRgb: Ss,
  toString: Ss
}));
function $s() {
  return `#${he(this.r)}${he(this.g)}${he(this.b)}`;
}
function Ih() {
  return `#${he(this.r)}${he(this.g)}${he(this.b)}${he((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ss() {
  const n = tr(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${de(this.r)}, ${de(this.g)}, ${de(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function tr(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function de(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function he(n) {
  return n = de(n), (n < 16 ? "0" : "") + n.toString(16);
}
function Ts(n, t, e, r) {
  return r <= 0 ? n = t = e = NaN : e <= 0 || e >= 1 ? n = t = NaN : t <= 0 && (n = NaN), new Et(n, t, e, r);
}
function Ha(n) {
  if (n instanceof Et) return new Et(n.h, n.s, n.l, n.opacity);
  if (n instanceof kn || (n = te(n)), !n) return new Et();
  if (n instanceof Et) return n;
  n = n.rgb();
  var t = n.r / 255, e = n.g / 255, r = n.b / 255, i = Math.min(t, e, r), s = Math.max(t, e, r), a = NaN, o = s - i, c = (s + i) / 2;
  return o ? (t === s ? a = (e - r) / o + (e < r) * 6 : e === s ? a = (r - t) / o + 2 : a = (t - e) / o + 4, o /= c < 0.5 ? s + i : 2 - s - i, a *= 60) : o = c > 0 && c < 1 ? 0 : a, new Et(a, o, c, n.opacity);
}
function Fh(n, t, e, r) {
  return arguments.length === 1 ? Ha(n) : new Et(n, t, e, r ?? 1);
}
function Et(n, t, e, r) {
  this.h = +n, this.s = +t, this.l = +e, this.opacity = +r;
}
Pi(Et, Fh, qa(kn, {
  brighter(n) {
    return n = n == null ? Qn : Math.pow(Qn, n), new Et(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? cn : Math.pow(cn, n), new Et(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, t = isNaN(n) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * t, i = 2 * e - r;
    return new lt(
      Or(n >= 240 ? n - 240 : n + 120, i, r),
      Or(n, i, r),
      Or(n < 120 ? n + 240 : n - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Et(Ms(this.h), Mn(this.s), Mn(this.l), tr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = tr(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${Ms(this.h)}, ${Mn(this.s) * 100}%, ${Mn(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function Ms(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function Mn(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function Or(n, t, e) {
  return (n < 60 ? t + (e - t) * n / 60 : n < 180 ? e : n < 240 ? t + (e - t) * (240 - n) / 60 : t) * 255;
}
function qh(n, t, e, r, i) {
  var s = n * n, a = s * n;
  return ((1 - 3 * n + 3 * s - a) * t + (4 - 6 * s + 3 * a) * e + (1 + 3 * n + 3 * s - 3 * a) * r + a * i) / 6;
}
function Hh(n) {
  var t = n.length - 1;
  return function(e) {
    var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, t - 1) : Math.floor(e * t), i = n[r], s = n[r + 1], a = r > 0 ? n[r - 1] : 2 * i - s, o = r < t - 1 ? n[r + 2] : 2 * s - i;
    return qh((e - r / t) * t, a, i, s, o);
  };
}
const zi = (n) => () => n;
function Bh(n, t) {
  return function(e) {
    return n + e * t;
  };
}
function Vh(n, t, e) {
  return n = Math.pow(n, e), t = Math.pow(t, e) - n, e = 1 / e, function(r) {
    return Math.pow(n + r * t, e);
  };
}
function Xh(n) {
  return (n = +n) == 1 ? Ba : function(t, e) {
    return e - t ? Vh(t, e, n) : zi(isNaN(t) ? e : t);
  };
}
function Ba(n, t) {
  var e = t - n;
  return e ? Bh(n, e) : zi(isNaN(n) ? t : n);
}
const er = (function n(t) {
  var e = Xh(t);
  function r(i, s) {
    var a = e((i = Jn(i)).r, (s = Jn(s)).r), o = e(i.g, s.g), c = e(i.b, s.b), l = Ba(i.opacity, s.opacity);
    return function(u) {
      return i.r = a(u), i.g = o(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = n, r;
})(1);
function Yh(n) {
  return function(t) {
    var e = t.length, r = new Array(e), i = new Array(e), s = new Array(e), a, o;
    for (a = 0; a < e; ++a)
      o = Jn(t[a]), r[a] = o.r || 0, i[a] = o.g || 0, s[a] = o.b || 0;
    return r = n(r), i = n(i), s = n(s), o.opacity = 1, function(c) {
      return o.r = r(c), o.g = i(c), o.b = s(c), o + "";
    };
  };
}
var Gh = Yh(Hh);
function Wh(n, t) {
  t || (t = []);
  var e = n ? Math.min(t.length, n.length) : 0, r = t.slice(), i;
  return function(s) {
    for (i = 0; i < e; ++i) r[i] = n[i] * (1 - s) + t[i] * s;
    return r;
  };
}
function Uh(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function jh(n, t) {
  var e = t ? t.length : 0, r = n ? Math.min(e, n.length) : 0, i = new Array(r), s = new Array(e), a;
  for (a = 0; a < r; ++a) i[a] = xe(n[a], t[a]);
  for (; a < e; ++a) s[a] = t[a];
  return function(o) {
    for (a = 0; a < r; ++a) s[a] = i[a](o);
    return s;
  };
}
function Kh(n, t) {
  var e = /* @__PURE__ */ new Date();
  return n = +n, t = +t, function(r) {
    return e.setTime(n * (1 - r) + t * r), e;
  };
}
function Mt(n, t) {
  return n = +n, t = +t, function(e) {
    return n * (1 - e) + t * e;
  };
}
function Zh(n, t) {
  var e = {}, r = {}, i;
  (n === null || typeof n != "object") && (n = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in n ? e[i] = xe(n[i], t[i]) : r[i] = t[i];
  return function(s) {
    for (i in e) r[i] = e[i](s);
    return r;
  };
}
var ii = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Lr = new RegExp(ii.source, "g");
function Qh(n) {
  return function() {
    return n;
  };
}
function Jh(n) {
  return function(t) {
    return n(t) + "";
  };
}
function Va(n, t) {
  var e = ii.lastIndex = Lr.lastIndex = 0, r, i, s, a = -1, o = [], c = [];
  for (n = n + "", t = t + ""; (r = ii.exec(n)) && (i = Lr.exec(t)); )
    (s = i.index) > e && (s = t.slice(e, s), o[a] ? o[a] += s : o[++a] = s), (r = r[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, c.push({ i: a, x: Mt(r, i) })), e = Lr.lastIndex;
  return e < t.length && (s = t.slice(e), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? c[0] ? Jh(c[0].x) : Qh(t) : (t = c.length, function(l) {
    for (var u = 0, h; u < t; ++u) o[(h = c[u]).i] = h.x(l);
    return o.join("");
  });
}
function xe(n, t) {
  var e = typeof t, r;
  return t == null || e === "boolean" ? zi(t) : (e === "number" ? Mt : e === "string" ? (r = te(t)) ? (t = r, er) : Va : t instanceof te ? er : t instanceof Date ? Kh : Uh(t) ? Wh : Array.isArray(t) ? jh : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Zh : Mt)(n, t);
}
function Oi(n, t) {
  return n = +n, t = +t, function(e) {
    return Math.round(n * (1 - e) + t * e);
  };
}
var Es = 180 / Math.PI, si = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Xa(n, t, e, r, i, s) {
  var a, o, c;
  return (a = Math.sqrt(n * n + t * t)) && (n /= a, t /= a), (c = n * e + t * r) && (e -= n * c, r -= t * c), (o = Math.sqrt(e * e + r * r)) && (e /= o, r /= o, c /= o), n * r < t * e && (n = -n, t = -t, c = -c, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(t, n) * Es,
    skewX: Math.atan(c) * Es,
    scaleX: a,
    scaleY: o
  };
}
var En;
function tf(n) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return t.isIdentity ? si : Xa(t.a, t.b, t.c, t.d, t.e, t.f);
}
function ef(n) {
  return n == null || (En || (En = document.createElementNS("http://www.w3.org/2000/svg", "g")), En.setAttribute("transform", n), !(n = En.transform.baseVal.consolidate())) ? si : (n = n.matrix, Xa(n.a, n.b, n.c, n.d, n.e, n.f));
}
function Ya(n, t, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, u, h, f, d, _) {
    if (l !== h || u !== f) {
      var p = d.push("translate(", null, t, null, e);
      _.push({ i: p - 4, x: Mt(l, h) }, { i: p - 2, x: Mt(u, f) });
    } else (h || f) && d.push("translate(" + h + t + f + e);
  }
  function a(l, u, h, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: Mt(l, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function o(l, u, h, f) {
    l !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: Mt(l, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function c(l, u, h, f, d, _) {
    if (l !== h || u !== f) {
      var p = d.push(i(d) + "scale(", null, ",", null, ")");
      _.push({ i: p - 4, x: Mt(l, h) }, { i: p - 2, x: Mt(u, f) });
    } else (h !== 1 || f !== 1) && d.push(i(d) + "scale(" + h + "," + f + ")");
  }
  return function(l, u) {
    var h = [], f = [];
    return l = n(l), u = n(u), s(l.translateX, l.translateY, u.translateX, u.translateY, h, f), a(l.rotate, u.rotate, h, f), o(l.skewX, u.skewX, h, f), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f), l = u = null, function(d) {
      for (var _ = -1, p = f.length, v; ++_ < p; ) h[(v = f[_]).i] = v.x(d);
      return h.join("");
    };
  };
}
var nf = Ya(tf, "px, ", "px)", "deg)"), rf = Ya(ef, ", ", ")", ")");
function sf(n, t) {
  t === void 0 && (t = n, n = xe);
  for (var e = 0, r = t.length - 1, i = t[0], s = new Array(r < 0 ? 0 : r); e < r; ) s[e] = n(i, i = t[++e]);
  return function(a) {
    var o = Math.max(0, Math.min(r - 1, Math.floor(a *= r)));
    return s[o](a - o);
  };
}
var Le = 0, Qe = 0, Ye = 0, Ga = 1e3, nr, Je, rr = 0, ve = 0, xr = 0, hn = typeof performance == "object" && performance.now ? performance : Date, Wa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Li() {
  return ve || (Wa(af), ve = hn.now() + xr);
}
function af() {
  ve = 0;
}
function ir() {
  this._call = this._time = this._next = null;
}
ir.prototype = Ua.prototype = {
  constructor: ir,
  restart: function(n, t, e) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    e = (e == null ? Li() : +e) + (t == null ? 0 : +t), !this._next && Je !== this && (Je ? Je._next = this : nr = this, Je = this), this._call = n, this._time = e, ai();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ai());
  }
};
function Ua(n, t, e) {
  var r = new ir();
  return r.restart(n, t, e), r;
}
function of() {
  Li(), ++Le;
  for (var n = nr, t; n; )
    (t = ve - n._time) >= 0 && n._call.call(void 0, t), n = n._next;
  --Le;
}
function Ps() {
  ve = (rr = hn.now()) + xr, Le = Qe = 0;
  try {
    of();
  } finally {
    Le = 0, cf(), ve = 0;
  }
}
function lf() {
  var n = hn.now(), t = n - rr;
  t > Ga && (xr -= t, rr = n);
}
function cf() {
  for (var n, t = nr, e, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), n = t, t = t._next) : (e = t._next, t._next = null, t = n ? n._next = e : nr = e);
  Je = n, ai(r);
}
function ai(n) {
  if (!Le) {
    Qe && (Qe = clearTimeout(Qe));
    var t = n - ve;
    t > 24 ? (n < 1 / 0 && (Qe = setTimeout(Ps, n - hn.now() - xr)), Ye && (Ye = clearInterval(Ye))) : (Ye || (rr = hn.now(), Ye = setInterval(lf, Ga)), Le = 1, Wa(Ps));
  }
}
function zs(n, t, e) {
  var r = new ir();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), n(i + t);
  }, t, e), r;
}
var uf = Ti("start", "end", "cancel", "interrupt"), hf = [], ja = 0, Os = 1, oi = 2, Fn = 3, Ls = 4, li = 5, qn = 6;
function br(n, t, e, r, i, s) {
  var a = n.__transition;
  if (!a) n.__transition = {};
  else if (e in a) return;
  ff(n, e, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: uf,
    tween: hf,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: ja
  });
}
function Ni(n, t) {
  var e = Pt(n, t);
  if (e.state > ja) throw new Error("too late; already scheduled");
  return e;
}
function Ft(n, t) {
  var e = Pt(n, t);
  if (e.state > Fn) throw new Error("too late; already running");
  return e;
}
function Pt(n, t) {
  var e = n.__transition;
  if (!e || !(e = e[t])) throw new Error("transition not found");
  return e;
}
function ff(n, t, e) {
  var r = n.__transition, i;
  r[t] = e, e.timer = Ua(s, 0, e.time);
  function s(l) {
    e.state = Os, e.timer.restart(a, e.delay, e.time), e.delay <= l && a(l - e.delay);
  }
  function a(l) {
    var u, h, f, d;
    if (e.state !== Os) return c();
    for (u in r)
      if (d = r[u], d.name === e.name) {
        if (d.state === Fn) return zs(a);
        d.state === Ls ? (d.state = qn, d.timer.stop(), d.on.call("interrupt", n, n.__data__, d.index, d.group), delete r[u]) : +u < t && (d.state = qn, d.timer.stop(), d.on.call("cancel", n, n.__data__, d.index, d.group), delete r[u]);
      }
    if (zs(function() {
      e.state === Fn && (e.state = Ls, e.timer.restart(o, e.delay, e.time), o(l));
    }), e.state = oi, e.on.call("start", n, n.__data__, e.index, e.group), e.state === oi) {
      for (e.state = Fn, i = new Array(f = e.tween.length), u = 0, h = -1; u < f; ++u)
        (d = e.tween[u].value.call(n, n.__data__, e.index, e.group)) && (i[++h] = d);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var u = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(c), e.state = li, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(n, u);
    e.state === li && (e.on.call("end", n, n.__data__, e.index, e.group), c());
  }
  function c() {
    e.state = qn, e.timer.stop(), delete r[t];
    for (var l in r) return;
    delete n.__transition;
  }
}
function df(n, t) {
  var e = n.__transition, r, i, s = !0, a;
  if (e) {
    t = t == null ? null : t + "";
    for (a in e) {
      if ((r = e[a]).name !== t) {
        s = !1;
        continue;
      }
      i = r.state > oi && r.state < li, r.state = qn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", n, n.__data__, r.index, r.group), delete e[a];
    }
    s && delete n.__transition;
  }
}
function pf(n) {
  return this.each(function() {
    df(this, n);
  });
}
function gf(n, t) {
  var e, r;
  return function() {
    var i = Ft(this, n), s = i.tween;
    if (s !== e) {
      r = e = s;
      for (var a = 0, o = r.length; a < o; ++a)
        if (r[a].name === t) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function _f(n, t, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var s = Ft(this, n), a = s.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var o = { name: t, value: e }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === t) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    s.tween = i;
  };
}
function mf(n, t) {
  var e = this._id;
  if (n += "", arguments.length < 2) {
    for (var r = Pt(this.node(), e).tween, i = 0, s = r.length, a; i < s; ++i)
      if ((a = r[i]).name === n)
        return a.value;
    return null;
  }
  return this.each((t == null ? gf : _f)(e, n, t));
}
function Ri(n, t, e) {
  var r = n._id;
  return n.each(function() {
    var i = Ft(this, r);
    (i.value || (i.value = {}))[t] = e.apply(this, arguments);
  }), function(i) {
    return Pt(i, r).value[t];
  };
}
function Ka(n, t) {
  var e;
  return (typeof t == "number" ? Mt : t instanceof te ? er : (e = te(t)) ? (t = e, er) : Va)(n, t);
}
function vf(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function xf(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function bf(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttribute(n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function yf(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttributeNS(n.space, n.local);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function wf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttribute(n) : (a = this.getAttribute(n), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function kf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttributeNS(n.space, n.local) : (a = this.getAttributeNS(n.space, n.local), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function Af(n, t) {
  var e = vr(n), r = e === "transform" ? rf : Ka;
  return this.attrTween(n, typeof t == "function" ? (e.local ? kf : wf)(e, r, Ri(this, "attr." + n, t)) : t == null ? (e.local ? xf : vf)(e) : (e.local ? yf : bf)(e, r, t));
}
function Cf(n, t) {
  return function(e) {
    this.setAttribute(n, t.call(this, e));
  };
}
function $f(n, t) {
  return function(e) {
    this.setAttributeNS(n.space, n.local, t.call(this, e));
  };
}
function Sf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && $f(n, s)), e;
  }
  return i._value = t, i;
}
function Tf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && Cf(n, s)), e;
  }
  return i._value = t, i;
}
function Mf(n, t) {
  var e = "attr." + n;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  var r = vr(n);
  return this.tween(e, (r.local ? Sf : Tf)(r, t));
}
function Ef(n, t) {
  return function() {
    Ni(this, n).delay = +t.apply(this, arguments);
  };
}
function Pf(n, t) {
  return t = +t, function() {
    Ni(this, n).delay = t;
  };
}
function zf(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? Ef : Pf)(t, n)) : Pt(this.node(), t).delay;
}
function Of(n, t) {
  return function() {
    Ft(this, n).duration = +t.apply(this, arguments);
  };
}
function Lf(n, t) {
  return t = +t, function() {
    Ft(this, n).duration = t;
  };
}
function Nf(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? Of : Lf)(t, n)) : Pt(this.node(), t).duration;
}
function Rf(n, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ft(this, n).ease = t;
  };
}
function Df(n) {
  var t = this._id;
  return arguments.length ? this.each(Rf(t, n)) : Pt(this.node(), t).ease;
}
function If(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    Ft(this, n).ease = e;
  };
}
function Ff(n) {
  if (typeof n != "function") throw new Error();
  return this.each(If(this._id, n));
}
function qf(n) {
  typeof n != "function" && (n = Ea(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new Xt(r, this._parents, this._name, this._id);
}
function Hf(n) {
  if (n._id !== this._id) throw new Error();
  for (var t = this._groups, e = n._groups, r = t.length, i = e.length, s = Math.min(r, i), a = new Array(r), o = 0; o < s; ++o)
    for (var c = t[o], l = e[o], u = c.length, h = a[o] = new Array(u), f, d = 0; d < u; ++d)
      (f = c[d] || l[d]) && (h[d] = f);
  for (; o < r; ++o)
    a[o] = t[o];
  return new Xt(a, this._parents, this._name, this._id);
}
function Bf(n) {
  return (n + "").trim().split(/^|\s+/).every(function(t) {
    var e = t.indexOf(".");
    return e >= 0 && (t = t.slice(0, e)), !t || t === "start";
  });
}
function Vf(n, t, e) {
  var r, i, s = Bf(t) ? Ni : Ft;
  return function() {
    var a = s(this, n), o = a.on;
    o !== r && (i = (r = o).copy()).on(t, e), a.on = i;
  };
}
function Xf(n, t) {
  var e = this._id;
  return arguments.length < 2 ? Pt(this.node(), e).on.on(n) : this.each(Vf(e, n, t));
}
function Yf(n) {
  return function() {
    var t = this.parentNode;
    for (var e in this.__transition) if (+e !== n) return;
    t && t.removeChild(this);
  };
}
function Gf() {
  return this.on("end.remove", Yf(this._id));
}
function Wf(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Mi(n));
  for (var r = this._groups, i = r.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = r[a], c = o.length, l = s[a] = new Array(c), u, h, f = 0; f < c; ++f)
      (u = o[f]) && (h = n.call(u, u.__data__, f, o)) && ("__data__" in u && (h.__data__ = u.__data__), l[f] = h, br(l[f], t, e, f, l, Pt(u, e)));
  return new Xt(s, this._parents, t, e);
}
function Uf(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Ma(n));
  for (var r = this._groups, i = r.length, s = [], a = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, u, h = 0; h < l; ++h)
      if (u = c[h]) {
        for (var f = n.call(u, u.__data__, h, c), d, _ = Pt(u, e), p = 0, v = f.length; p < v; ++p)
          (d = f[p]) && br(d, t, e, p, f, _);
        s.push(f), a.push(u);
      }
  return new Xt(s, a, t, e);
}
var jf = wn.prototype.constructor;
function Kf() {
  return new jf(this._groups, this._parents);
}
function Zf(n, t) {
  var e, r, i;
  return function() {
    var s = Oe(this, n), a = (this.style.removeProperty(n), Oe(this, n));
    return s === a ? null : s === e && a === r ? i : i = t(e = s, r = a);
  };
}
function Za(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Qf(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = Oe(this, n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function Jf(n, t, e) {
  var r, i, s;
  return function() {
    var a = Oe(this, n), o = e(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(n), Oe(this, n))), a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o));
  };
}
function td(n, t) {
  var e, r, i, s = "style." + t, a = "end." + s, o;
  return function() {
    var c = Ft(this, n), l = c.on, u = c.value[s] == null ? o || (o = Za(t)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(a, i = u), c.on = r;
  };
}
function ed(n, t, e) {
  var r = (n += "") == "transform" ? nf : Ka;
  return t == null ? this.styleTween(n, Zf(n, r)).on("end.style." + n, Za(n)) : typeof t == "function" ? this.styleTween(n, Jf(n, r, Ri(this, "style." + n, t))).each(td(this._id, n)) : this.styleTween(n, Qf(n, r, t), e).on("end.style." + n, null);
}
function nd(n, t, e) {
  return function(r) {
    this.style.setProperty(n, t.call(this, r), e);
  };
}
function rd(n, t, e) {
  var r, i;
  function s() {
    var a = t.apply(this, arguments);
    return a !== i && (r = (i = a) && nd(n, a, e)), r;
  }
  return s._value = t, s;
}
function id(n, t, e) {
  var r = "style." + (n += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, rd(n, t, e ?? ""));
}
function sd(n) {
  return function() {
    this.textContent = n;
  };
}
function ad(n) {
  return function() {
    var t = n(this);
    this.textContent = t ?? "";
  };
}
function od(n) {
  return this.tween("text", typeof n == "function" ? ad(Ri(this, "text", n)) : sd(n == null ? "" : n + ""));
}
function ld(n) {
  return function(t) {
    this.textContent = n.call(this, t);
  };
}
function cd(n) {
  var t, e;
  function r() {
    var i = n.apply(this, arguments);
    return i !== e && (t = (e = i) && ld(i)), t;
  }
  return r._value = n, r;
}
function ud(n) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (n == null) return this.tween(t, null);
  if (typeof n != "function") throw new Error();
  return this.tween(t, cd(n));
}
function hd() {
  for (var n = this._name, t = this._id, e = Qa(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      if (c = a[l]) {
        var u = Pt(c, t);
        br(c, n, e, l, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Xt(r, this._parents, n, e);
}
function fd() {
  var n, t, e = this, r = e._id, i = e.size();
  return new Promise(function(s, a) {
    var o = { value: a }, c = { value: function() {
      --i === 0 && s();
    } };
    e.each(function() {
      var l = Ft(this, r), u = l.on;
      u !== n && (t = (n = u).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(c)), l.on = t;
    }), i === 0 && s();
  });
}
var dd = 0;
function Xt(n, t, e, r) {
  this._groups = n, this._parents = t, this._name = e, this._id = r;
}
function Qa() {
  return ++dd;
}
var qt = wn.prototype;
Xt.prototype = {
  constructor: Xt,
  select: Wf,
  selectAll: Uf,
  selectChild: qt.selectChild,
  selectChildren: qt.selectChildren,
  filter: qf,
  merge: Hf,
  selection: Kf,
  transition: hd,
  call: qt.call,
  nodes: qt.nodes,
  node: qt.node,
  size: qt.size,
  empty: qt.empty,
  each: qt.each,
  on: Xf,
  attr: Af,
  attrTween: Mf,
  style: ed,
  styleTween: id,
  text: od,
  textTween: ud,
  remove: Gf,
  tween: mf,
  delay: zf,
  duration: Nf,
  ease: Df,
  easeVarying: Ff,
  end: fd,
  [Symbol.iterator]: qt[Symbol.iterator]
};
function _t(n) {
  return n * (2 - n);
}
function pd(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var Di = 1.70158;
(function n(t) {
  t = +t;
  function e(r) {
    return (r = +r) * r * (t * (r - 1) + r);
  }
  return e.overshoot = n, e;
})(Di);
var gd = (function n(t) {
  t = +t;
  function e(r) {
    return --r * r * ((r + 1) * t + r) + 1;
  }
  return e.overshoot = n, e;
})(Di);
(function n(t) {
  t = +t;
  function e(r) {
    return ((r *= 2) < 1 ? r * r * ((t + 1) * r - t) : (r -= 2) * r * ((t + 1) * r + t) + 2) / 2;
  }
  return e.overshoot = n, e;
})(Di);
var _d = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: pd
};
function md(n, t) {
  for (var e; !(e = n.__transition) || !(e = e[t]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${t} not found`);
  return e;
}
function vd(n) {
  var t, e;
  n instanceof Xt ? (t = n._id, n = n._name) : (t = Qa(), (e = _d).time = Li(), n = n == null ? null : n + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && br(c, n, t, l, a, e || md(c, t));
  return new Xt(r, this._parents, n, t);
}
wn.prototype.interrupt = pf;
wn.prototype.transition = vd;
const ci = Math.PI, ui = 2 * ci, ce = 1e-6, xd = ui - ce;
function Ja(n) {
  this._ += n[0];
  for (let t = 1, e = n.length; t < e; ++t)
    this._ += arguments[t] + n[t];
}
function bd(n) {
  let t = Math.floor(n);
  if (!(t >= 0)) throw new Error(`invalid digits: ${n}`);
  if (t > 15) return Ja;
  const e = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class yd {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Ja : bd(t);
  }
  moveTo(t, e) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, e) {
    this._append`L${this._x1 = +t},${this._y1 = +e}`;
  }
  quadraticCurveTo(t, e, r, i) {
    this._append`Q${+t},${+e},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(t, e, r, i, s, a) {
    this._append`C${+t},${+e},${+r},${+i},${this._x1 = +s},${this._y1 = +a}`;
  }
  arcTo(t, e, r, i, s) {
    if (t = +t, e = +e, r = +r, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let a = this._x1, o = this._y1, c = r - t, l = i - e, u = a - t, h = o - e, f = u * u + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = e}`;
    else if (f > ce) if (!(Math.abs(h * c - l * u) > ce) || !s)
      this._append`L${this._x1 = t},${this._y1 = e}`;
    else {
      let d = r - a, _ = i - o, p = c * c + l * l, v = d * d + _ * _, b = Math.sqrt(p), y = Math.sqrt(f), x = s * Math.tan((ci - Math.acos((p + f - v) / (2 * b * y))) / 2), g = x / y, m = x / b;
      Math.abs(g - 1) > ce && this._append`L${t + g * u},${e + g * h}`, this._append`A${s},${s},0,0,${+(h * d > u * _)},${this._x1 = t + m * c},${this._y1 = e + m * l}`;
    }
  }
  arc(t, e, r, i, s, a) {
    if (t = +t, e = +e, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), l = t + o, u = e + c, h = 1 ^ a, f = a ? i - s : s - i;
    this._x1 === null ? this._append`M${l},${u}` : (Math.abs(this._x1 - l) > ce || Math.abs(this._y1 - u) > ce) && this._append`L${l},${u}`, r && (f < 0 && (f = f % ui + ui), f > xd ? this._append`A${r},${r},0,1,${h},${t - o},${e - c}A${r},${r},0,1,${h},${this._x1 = l},${this._y1 = u}` : f > ce && this._append`A${r},${r},0,${+(f >= ci)},${h},${this._x1 = t + r * Math.cos(s)},${this._y1 = e + r * Math.sin(s)}`);
  }
  rect(t, e, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function wd(n) {
  return Math.abs(n = Math.round(n)) >= 1e21 ? n.toLocaleString("en").replace(/,/g, "") : n.toString(10);
}
function sr(n, t) {
  if (!isFinite(n) || n === 0) return null;
  var e = (n = t ? n.toExponential(t - 1) : n.toExponential()).indexOf("e"), r = n.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +n.slice(e + 1)
  ];
}
function Ne(n) {
  return n = sr(Math.abs(n)), n ? n[1] : NaN;
}
function kd(n, t) {
  return function(e, r) {
    for (var i = e.length, s = [], a = 0, o = n[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), s.push(e.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = n[a = (a + 1) % n.length];
    return s.reverse().join(t);
  };
}
function Ad(n) {
  return function(t) {
    return t.replace(/[0-9]/g, function(e) {
      return n[+e];
    });
  };
}
var Cd = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ar(n) {
  if (!(t = Cd.exec(n))) throw new Error("invalid format: " + n);
  var t;
  return new Ii({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
ar.prototype = Ii.prototype;
function Ii(n) {
  this.fill = n.fill === void 0 ? " " : n.fill + "", this.align = n.align === void 0 ? ">" : n.align + "", this.sign = n.sign === void 0 ? "-" : n.sign + "", this.symbol = n.symbol === void 0 ? "" : n.symbol + "", this.zero = !!n.zero, this.width = n.width === void 0 ? void 0 : +n.width, this.comma = !!n.comma, this.precision = n.precision === void 0 ? void 0 : +n.precision, this.trim = !!n.trim, this.type = n.type === void 0 ? "" : n.type + "";
}
Ii.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function $d(n) {
  t: for (var t = n.length, e = 1, r = -1, i; e < t; ++e)
    switch (n[e]) {
      case ".":
        r = i = e;
        break;
      case "0":
        r === 0 && (r = e), i = e;
        break;
      default:
        if (!+n[e]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? n.slice(0, r) + n.slice(i + 1) : n;
}
var or;
function Sd(n, t) {
  var e = sr(n, t);
  if (!e) return or = void 0, n.toPrecision(t);
  var r = e[0], i = e[1], s = i - (or = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return s === a ? r : s > a ? r + new Array(s - a + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + sr(n, Math.max(0, t + s - 1))[0];
}
function Ns(n, t) {
  var e = sr(n, t);
  if (!e) return n + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Rs = {
  "%": (n, t) => (n * 100).toFixed(t),
  b: (n) => Math.round(n).toString(2),
  c: (n) => n + "",
  d: wd,
  e: (n, t) => n.toExponential(t),
  f: (n, t) => n.toFixed(t),
  g: (n, t) => n.toPrecision(t),
  o: (n) => Math.round(n).toString(8),
  p: (n, t) => Ns(n * 100, t),
  r: Ns,
  s: Sd,
  X: (n) => Math.round(n).toString(16).toUpperCase(),
  x: (n) => Math.round(n).toString(16)
};
function Ds(n) {
  return n;
}
var Is = Array.prototype.map, Fs = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Td(n) {
  var t = n.grouping === void 0 || n.thousands === void 0 ? Ds : kd(Is.call(n.grouping, Number), n.thousands + ""), e = n.currency === void 0 ? "" : n.currency[0] + "", r = n.currency === void 0 ? "" : n.currency[1] + "", i = n.decimal === void 0 ? "." : n.decimal + "", s = n.numerals === void 0 ? Ds : Ad(Is.call(n.numerals, String)), a = n.percent === void 0 ? "%" : n.percent + "", o = n.minus === void 0 ? "−" : n.minus + "", c = n.nan === void 0 ? "NaN" : n.nan + "";
  function l(h, f) {
    h = ar(h);
    var d = h.fill, _ = h.align, p = h.sign, v = h.symbol, b = h.zero, y = h.width, x = h.comma, g = h.precision, m = h.trim, w = h.type;
    w === "n" ? (x = !0, w = "g") : Rs[w] || (g === void 0 && (g = 12), m = !0, w = "g"), (b || d === "0" && _ === "=") && (b = !0, d = "0", _ = "=");
    var $ = (f && f.prefix !== void 0 ? f.prefix : "") + (v === "$" ? e : v === "#" && /[boxX]/.test(w) ? "0" + w.toLowerCase() : ""), A = (v === "$" ? r : /[%p]/.test(w) ? a : "") + (f && f.suffix !== void 0 ? f.suffix : ""), k = Rs[w], C = /[defgprs%]/.test(w);
    g = g === void 0 ? 6 : /[gprs]/.test(w) ? Math.max(1, Math.min(21, g)) : Math.max(0, Math.min(20, g));
    function T(S) {
      var M = $, E = A, P, z, L;
      if (w === "c")
        E = k(S) + E, S = "";
      else {
        S = +S;
        var D = S < 0 || 1 / S < 0;
        if (S = isNaN(S) ? c : k(Math.abs(S), g), m && (S = $d(S)), D && +S == 0 && p !== "+" && (D = !1), M = (D ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + M, E = (w === "s" && !isNaN(S) && or !== void 0 ? Fs[8 + or / 3] : "") + E + (D && p === "(" ? ")" : ""), C) {
          for (P = -1, z = S.length; ++P < z; )
            if (L = S.charCodeAt(P), 48 > L || L > 57) {
              E = (L === 46 ? i + S.slice(P + 1) : S.slice(P)) + E, S = S.slice(0, P);
              break;
            }
        }
      }
      x && !b && (S = t(S, 1 / 0));
      var B = M.length + S.length + E.length, F = B < y ? new Array(y - B + 1).join(d) : "";
      switch (x && b && (S = t(F + S, F.length ? y - E.length : 1 / 0), F = ""), _) {
        case "<":
          S = M + S + E + F;
          break;
        case "=":
          S = M + F + S + E;
          break;
        case "^":
          S = F.slice(0, B = F.length >> 1) + M + S + E + F.slice(B);
          break;
        default:
          S = F + M + S + E;
          break;
      }
      return s(S);
    }
    return T.toString = function() {
      return h + "";
    }, T;
  }
  function u(h, f) {
    var d = Math.max(-8, Math.min(8, Math.floor(Ne(f) / 3))) * 3, _ = Math.pow(10, -d), p = l((h = ar(h), h.type = "f", h), { suffix: Fs[8 + d / 3] });
    return function(v) {
      return p(_ * v);
    };
  }
  return {
    format: l,
    formatPrefix: u
  };
}
var Pn, to, eo;
Md({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Md(n) {
  return Pn = Td(n), to = Pn.format, eo = Pn.formatPrefix, Pn;
}
function Ed(n) {
  return Math.max(0, -Ne(Math.abs(n)));
}
function Pd(n, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ne(t) / 3))) * 3 - Ne(Math.abs(n)));
}
function zd(n, t) {
  return n = Math.abs(n), t = Math.abs(t) - n, Math.max(0, Ne(t) - Ne(n)) + 1;
}
function Od(n) {
  var t = 0, e = n.children, r = e && e.length;
  if (!r) t = 1;
  else for (; --r >= 0; ) t += e[r].value;
  n.value = t;
}
function Ld() {
  return this.eachAfter(Od);
}
function Nd(n, t) {
  let e = -1;
  for (const r of this)
    n.call(t, r, ++e, this);
  return this;
}
function Rd(n, t) {
  for (var e = this, r = [e], i, s, a = -1; e = r.pop(); )
    if (n.call(t, e, ++a, this), i = e.children)
      for (s = i.length - 1; s >= 0; --s)
        r.push(i[s]);
  return this;
}
function Dd(n, t) {
  for (var e = this, r = [e], i = [], s, a, o, c = -1; e = r.pop(); )
    if (i.push(e), s = e.children)
      for (a = 0, o = s.length; a < o; ++a)
        r.push(s[a]);
  for (; e = i.pop(); )
    n.call(t, e, ++c, this);
  return this;
}
function Id(n, t) {
  let e = -1;
  for (const r of this)
    if (n.call(t, r, ++e, this))
      return r;
}
function Fd(n) {
  return this.eachAfter(function(t) {
    for (var e = +n(t.data) || 0, r = t.children, i = r && r.length; --i >= 0; ) e += r[i].value;
    t.value = e;
  });
}
function qd(n) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(n);
  });
}
function Hd(n) {
  for (var t = this, e = Bd(t, n), r = [t]; t !== e; )
    t = t.parent, r.push(t);
  for (var i = r.length; n !== e; )
    r.splice(i, 0, n), n = n.parent;
  return r;
}
function Bd(n, t) {
  if (n === t) return n;
  var e = n.ancestors(), r = t.ancestors(), i = null;
  for (n = e.pop(), t = r.pop(); n === t; )
    i = n, n = e.pop(), t = r.pop();
  return i;
}
function Vd() {
  for (var n = this, t = [n]; n = n.parent; )
    t.push(n);
  return t;
}
function Xd() {
  return Array.from(this);
}
function Yd() {
  var n = [];
  return this.eachBefore(function(t) {
    t.children || n.push(t);
  }), n;
}
function Gd() {
  var n = this, t = [];
  return n.each(function(e) {
    e !== n && t.push({ source: e.parent, target: e });
  }), t;
}
function* Wd() {
  var n = this, t, e = [n], r, i, s;
  do
    for (t = e.reverse(), e = []; n = t.pop(); )
      if (yield n, r = n.children)
        for (i = 0, s = r.length; i < s; ++i)
          e.push(r[i]);
  while (e.length);
}
function lr(n, t) {
  n instanceof Map ? (n = [void 0, n], t === void 0 && (t = Kd)) : t === void 0 && (t = jd);
  for (var e = new fn(n), r, i = [e], s, a, o, c; r = i.pop(); )
    if ((a = t(r.data)) && (c = (a = Array.from(a)).length))
      for (r.children = a, o = c - 1; o >= 0; --o)
        i.push(s = a[o] = new fn(a[o])), s.parent = r, s.depth = r.depth + 1;
  return e.eachBefore(Qd);
}
function Ud() {
  return lr(this).eachBefore(Zd);
}
function jd(n) {
  return n.children;
}
function Kd(n) {
  return Array.isArray(n) ? n[1] : null;
}
function Zd(n) {
  n.data.value !== void 0 && (n.value = n.data.value), n.data = n.data.data;
}
function Qd(n) {
  var t = 0;
  do
    n.height = t;
  while ((n = n.parent) && n.height < ++t);
}
function fn(n) {
  this.data = n, this.depth = this.height = 0, this.parent = null;
}
fn.prototype = lr.prototype = {
  constructor: fn,
  count: Ld,
  each: Nd,
  eachAfter: Dd,
  eachBefore: Rd,
  find: Id,
  sum: Fd,
  sort: qd,
  path: Hd,
  ancestors: Vd,
  descendants: Xd,
  leaves: Yd,
  links: Gd,
  copy: Ud,
  [Symbol.iterator]: Wd
};
function Jd(n, t) {
  return n.parent === t.parent ? 1 : 2;
}
function Nr(n) {
  var t = n.children;
  return t ? t[0] : n.t;
}
function Rr(n) {
  var t = n.children;
  return t ? t[t.length - 1] : n.t;
}
function tp(n, t, e) {
  var r = e / (t.i - n.i);
  t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e;
}
function ep(n) {
  for (var t = 0, e = 0, r = n.children, i = r.length, s; --i >= 0; )
    s = r[i], s.z += t, s.m += t, t += s.s + (e += s.c);
}
function np(n, t, e) {
  return n.a.parent === t.parent ? n.a : e;
}
function Hn(n, t) {
  this._ = n, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
Hn.prototype = Object.create(fn.prototype);
function rp(n) {
  for (var t = new Hn(n, 0), e, r = [t], i, s, a, o; e = r.pop(); )
    if (s = e._.children)
      for (e.children = new Array(o = s.length), a = o - 1; a >= 0; --a)
        r.push(i = e.children[a] = new Hn(s[a], a)), i.parent = e;
  return (t.parent = new Hn(null, 0)).children = [t], t;
}
function ip() {
  var n = Jd, t = 1, e = 1, r = null;
  function i(l) {
    var u = rp(l);
    if (u.eachAfter(s), u.parent.m = -u.z, u.eachBefore(a), r) l.eachBefore(c);
    else {
      var h = l, f = l, d = l;
      l.eachBefore(function(y) {
        y.x < h.x && (h = y), y.x > f.x && (f = y), y.depth > d.depth && (d = y);
      });
      var _ = h === f ? 1 : n(h, f) / 2, p = _ - h.x, v = t / (f.x + _ + p), b = e / (d.depth || 1);
      l.eachBefore(function(y) {
        y.x = (y.x + p) * v, y.y = y.depth * b;
      });
    }
    return l;
  }
  function s(l) {
    var u = l.children, h = l.parent.children, f = l.i ? h[l.i - 1] : null;
    if (u) {
      ep(l);
      var d = (u[0].z + u[u.length - 1].z) / 2;
      f ? (l.z = f.z + n(l._, f._), l.m = l.z - d) : l.z = d;
    } else f && (l.z = f.z + n(l._, f._));
    l.parent.A = o(l, f, l.parent.A || h[0]);
  }
  function a(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function o(l, u, h) {
    if (u) {
      for (var f = l, d = l, _ = u, p = f.parent.children[0], v = f.m, b = d.m, y = _.m, x = p.m, g; _ = Rr(_), f = Nr(f), _ && f; )
        p = Nr(p), d = Rr(d), d.a = l, g = _.z + y - f.z - v + n(_._, f._), g > 0 && (tp(np(_, l, h), l, g), v += g, b += g), y += _.m, v += f.m, x += p.m, b += d.m;
      _ && !Rr(d) && (d.t = _, d.m += y - b), f && !Nr(p) && (p.t = f, p.m += v - x, h = l);
    }
    return h;
  }
  function c(l) {
    l.x *= t, l.y = l.depth * e;
  }
  return i.separation = function(l) {
    return arguments.length ? (n = l, i) : n;
  }, i.size = function(l) {
    return arguments.length ? (r = !1, t = +l[0], e = +l[1], i) : r ? null : [t, e];
  }, i.nodeSize = function(l) {
    return arguments.length ? (r = !0, t = +l[0], e = +l[1], i) : r ? [t, e] : null;
  }, i;
}
function Fi(n, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(n);
      break;
    default:
      this.range(t).domain(n);
      break;
  }
  return this;
}
function no(n, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof n == "function" ? this.interpolator(n) : this.range(n);
      break;
    }
    default: {
      this.domain(n), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const qs = Symbol("implicit");
function ro() {
  var n = new ms(), t = [], e = [], r = qs;
  function i(s) {
    let a = n.get(s);
    if (a === void 0) {
      if (r !== qs) return r;
      n.set(s, a = t.push(s) - 1);
    }
    return e[a % e.length];
  }
  return i.domain = function(s) {
    if (!arguments.length) return t.slice();
    t = [], n = new ms();
    for (const a of s)
      n.has(a) || n.set(a, t.push(a) - 1);
    return i;
  }, i.range = function(s) {
    return arguments.length ? (e = Array.from(s), i) : e.slice();
  }, i.unknown = function(s) {
    return arguments.length ? (r = s, i) : r;
  }, i.copy = function() {
    return ro(t, e).unknown(r);
  }, Fi.apply(i, arguments), i;
}
function hi() {
  var n = ro().unknown(void 0), t = n.domain, e = n.range, r = 0, i = 1, s, a, o = !1, c = 0, l = 0, u = 0.5;
  delete n.unknown;
  function h() {
    var f = t().length, d = i < r, _ = d ? i : r, p = d ? r : i;
    s = (p - _) / Math.max(1, f - c + l * 2), o && (s = Math.floor(s)), _ += (p - _ - s * (f - c)) * u, a = s * (1 - c), o && (_ = Math.round(_), a = Math.round(a));
    var v = Pc(f).map(function(b) {
      return _ + s * b;
    });
    return e(d ? v.reverse() : v);
  }
  return n.domain = function(f) {
    return arguments.length ? (t(f), h()) : t();
  }, n.range = function(f) {
    return arguments.length ? ([r, i] = f, r = +r, i = +i, h()) : [r, i];
  }, n.rangeRound = function(f) {
    return [r, i] = f, r = +r, i = +i, o = !0, h();
  }, n.bandwidth = function() {
    return a;
  }, n.step = function() {
    return s;
  }, n.round = function(f) {
    return arguments.length ? (o = !!f, h()) : o;
  }, n.padding = function(f) {
    return arguments.length ? (c = Math.min(1, l = +f), h()) : c;
  }, n.paddingInner = function(f) {
    return arguments.length ? (c = Math.min(1, f), h()) : c;
  }, n.paddingOuter = function(f) {
    return arguments.length ? (l = +f, h()) : l;
  }, n.align = function(f) {
    return arguments.length ? (u = Math.max(0, Math.min(1, f)), h()) : u;
  }, n.copy = function() {
    return hi(t(), [r, i]).round(o).paddingInner(c).paddingOuter(l).align(u);
  }, Fi.apply(h(), arguments);
}
function sp(n) {
  return function() {
    return n;
  };
}
function ap(n) {
  return +n;
}
var Hs = [0, 1];
function Nt(n) {
  return n;
}
function fi(n, t) {
  return (t -= n = +n) ? function(e) {
    return (e - n) / t;
  } : sp(isNaN(t) ? NaN : 0.5);
}
function op(n, t) {
  var e;
  return n > t && (e = n, n = t, t = e), function(r) {
    return Math.max(n, Math.min(t, r));
  };
}
function lp(n, t, e) {
  var r = n[0], i = n[1], s = t[0], a = t[1];
  return i < r ? (r = fi(i, r), s = e(a, s)) : (r = fi(r, i), s = e(s, a)), function(o) {
    return s(r(o));
  };
}
function cp(n, t, e) {
  var r = Math.min(n.length, t.length) - 1, i = new Array(r), s = new Array(r), a = -1;
  for (n[r] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a < r; )
    i[a] = fi(n[a], n[a + 1]), s[a] = e(t[a], t[a + 1]);
  return function(o) {
    var c = yc(n, o, 1, r) - 1;
    return s[c](i[c](o));
  };
}
function up(n, t) {
  return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown());
}
function hp() {
  var n = Hs, t = Hs, e = xe, r, i, s, a = Nt, o, c, l;
  function u() {
    var f = Math.min(n.length, t.length);
    return a !== Nt && (a = op(n[0], n[f - 1])), o = f > 2 ? cp : lp, c = l = null, h;
  }
  function h(f) {
    return f == null || isNaN(f = +f) ? s : (c || (c = o(n.map(r), t, e)))(r(a(f)));
  }
  return h.invert = function(f) {
    return a(i((l || (l = o(t, n.map(r), Mt)))(f)));
  }, h.domain = function(f) {
    return arguments.length ? (n = Array.from(f, ap), u()) : n.slice();
  }, h.range = function(f) {
    return arguments.length ? (t = Array.from(f), u()) : t.slice();
  }, h.rangeRound = function(f) {
    return t = Array.from(f), e = Oi, u();
  }, h.clamp = function(f) {
    return arguments.length ? (a = f ? !0 : Nt, u()) : a !== Nt;
  }, h.interpolate = function(f) {
    return arguments.length ? (e = f, u()) : e;
  }, h.unknown = function(f) {
    return arguments.length ? (s = f, h) : s;
  }, function(f, d) {
    return r = f, i = d, u();
  };
}
function fp() {
  return hp()(Nt, Nt);
}
function dp(n, t, e, r) {
  var i = Mc(n, t, e), s;
  switch (r = ar(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(n), Math.abs(t));
      return r.precision == null && !isNaN(s = Pd(i, a)) && (r.precision = s), eo(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = zd(i, Math.max(Math.abs(n), Math.abs(t)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Ed(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return to(r);
}
function qi(n) {
  var t = n.domain;
  return n.ticks = function(e) {
    var r = t();
    return Tc(r[0], r[r.length - 1], e ?? 10);
  }, n.tickFormat = function(e, r) {
    var i = t();
    return dp(i[0], i[i.length - 1], e ?? 10, r);
  }, n.nice = function(e) {
    e == null && (e = 10);
    var r = t(), i = 0, s = r.length - 1, a = r[i], o = r[s], c, l, u = 10;
    for (o < a && (l = a, a = o, o = l, l = i, i = s, s = l); u-- > 0; ) {
      if (l = Jr(a, o, e), l === c)
        return r[i] = a, r[s] = o, t(r);
      if (l > 0)
        a = Math.floor(a / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        a = Math.ceil(a * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return n;
  }, n;
}
function Yt() {
  var n = fp();
  return n.copy = function() {
    return up(n, Yt());
  }, Fi.apply(n, arguments), qi(n);
}
function pp() {
  var n = 0, t = 1, e, r, i, s, a = Nt, o = !1, c;
  function l(h) {
    return h == null || isNaN(h = +h) ? c : a(i === 0 ? 0.5 : (h = (s(h) - e) * i, o ? Math.max(0, Math.min(1, h)) : h));
  }
  l.domain = function(h) {
    return arguments.length ? ([n, t] = h, e = s(n = +n), r = s(t = +t), i = e === r ? 0 : 1 / (r - e), l) : [n, t];
  }, l.clamp = function(h) {
    return arguments.length ? (o = !!h, l) : o;
  }, l.interpolator = function(h) {
    return arguments.length ? (a = h, l) : a;
  };
  function u(h) {
    return function(f) {
      var d, _;
      return arguments.length ? ([d, _] = f, a = h(d, _), l) : [a(0), a(1)];
    };
  }
  return l.range = u(xe), l.rangeRound = u(Oi), l.unknown = function(h) {
    return arguments.length ? (c = h, l) : c;
  }, function(h) {
    return s = h, e = h(n), r = h(t), i = e === r ? 0 : 1 / (r - e), l;
  };
}
function io(n, t) {
  return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown());
}
function so() {
  var n = qi(pp()(Nt));
  return n.copy = function() {
    return io(n, so());
  }, no.apply(n, arguments);
}
function gp() {
  var n = 0, t = 0.5, e = 1, r = 1, i, s, a, o, c, l = Nt, u, h = !1, f;
  function d(p) {
    return isNaN(p = +p) ? f : (p = 0.5 + ((p = +u(p)) - s) * (r * p < r * s ? o : c), l(h ? Math.max(0, Math.min(1, p)) : p));
  }
  d.domain = function(p) {
    return arguments.length ? ([n, t, e] = p, i = u(n = +n), s = u(t = +t), a = u(e = +e), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), r = s < i ? -1 : 1, d) : [n, t, e];
  }, d.clamp = function(p) {
    return arguments.length ? (h = !!p, d) : h;
  }, d.interpolator = function(p) {
    return arguments.length ? (l = p, d) : l;
  };
  function _(p) {
    return function(v) {
      var b, y, x;
      return arguments.length ? ([b, y, x] = v, l = sf(p, [b, y, x]), d) : [l(0), l(0.5), l(1)];
    };
  }
  return d.range = _(xe), d.rangeRound = _(Oi), d.unknown = function(p) {
    return arguments.length ? (f = p, d) : f;
  }, function(p) {
    return u = p, i = p(n), s = p(t), a = p(e), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), r = s < i ? -1 : 1, d;
  };
}
function ao() {
  var n = qi(gp()(Nt));
  return n.copy = function() {
    return io(n, ao());
  }, no.apply(n, arguments);
}
function oo(n) {
  for (var t = n.length / 6 | 0, e = new Array(t), r = 0; r < t; ) e[r] = "#" + n.slice(r * 6, ++r * 6);
  return e;
}
const lo = (n) => Gh(n[n.length - 1]);
var _p = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(oo);
const mp = lo(_p);
var vp = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(oo);
const xp = lo(vp);
function N(n) {
  return function() {
    return n;
  };
}
const Bs = Math.abs, et = Math.atan2, se = Math.cos, bp = Math.max, Dr = Math.min, zt = Math.sin, Ae = Math.sqrt, ot = 1e-12, dn = Math.PI, cr = dn / 2, Bn = 2 * dn;
function yp(n) {
  return n > 1 ? 0 : n < -1 ? dn : Math.acos(n);
}
function Vs(n) {
  return n >= 1 ? cr : n <= -1 ? -cr : Math.asin(n);
}
function yr(n) {
  let t = 3;
  return n.digits = function(e) {
    if (!arguments.length) return t;
    if (e == null)
      t = null;
    else {
      const r = Math.floor(e);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${e}`);
      t = r;
    }
    return n;
  }, () => new yd(t);
}
function wp(n) {
  return n.innerRadius;
}
function kp(n) {
  return n.outerRadius;
}
function Ap(n) {
  return n.startAngle;
}
function Cp(n) {
  return n.endAngle;
}
function $p(n) {
  return n && n.padAngle;
}
function Sp(n, t, e, r, i, s, a, o) {
  var c = e - n, l = r - t, u = a - i, h = o - s, f = h * c - u * l;
  if (!(f * f < ot))
    return f = (u * (t - s) - h * (n - i)) / f, [n + f * c, t + f * l];
}
function zn(n, t, e, r, i, s, a) {
  var o = n - e, c = t - r, l = (a ? s : -s) / Ae(o * o + c * c), u = l * c, h = -l * o, f = n + u, d = t + h, _ = e + u, p = r + h, v = (f + _) / 2, b = (d + p) / 2, y = _ - f, x = p - d, g = y * y + x * x, m = i - s, w = f * p - _ * d, $ = (x < 0 ? -1 : 1) * Ae(bp(0, m * m * g - w * w)), A = (w * x - y * $) / g, k = (-w * y - x * $) / g, C = (w * x + y * $) / g, T = (-w * y + x * $) / g, S = A - v, M = k - b, E = C - v, P = T - b;
  return S * S + M * M > E * E + P * P && (A = C, k = T), {
    cx: A,
    cy: k,
    x01: -u,
    y01: -h,
    x11: A * (i / m - 1),
    y11: k * (i / m - 1)
  };
}
function Xs() {
  var n = wp, t = kp, e = N(0), r = null, i = Ap, s = Cp, a = $p, o = null, c = yr(l);
  function l() {
    var u, h, f = +n.apply(this, arguments), d = +t.apply(this, arguments), _ = i.apply(this, arguments) - cr, p = s.apply(this, arguments) - cr, v = Bs(p - _), b = p > _;
    if (o || (o = u = c()), d < f && (h = d, d = f, f = h), !(d > ot)) o.moveTo(0, 0);
    else if (v > Bn - ot)
      o.moveTo(d * se(_), d * zt(_)), o.arc(0, 0, d, _, p, !b), f > ot && (o.moveTo(f * se(p), f * zt(p)), o.arc(0, 0, f, p, _, b));
    else {
      var y = _, x = p, g = _, m = p, w = v, $ = v, A = a.apply(this, arguments) / 2, k = A > ot && (r ? +r.apply(this, arguments) : Ae(f * f + d * d)), C = Dr(Bs(d - f) / 2, +e.apply(this, arguments)), T = C, S = C, M, E;
      if (k > ot) {
        var P = Vs(k / f * zt(A)), z = Vs(k / d * zt(A));
        (w -= P * 2) > ot ? (P *= b ? 1 : -1, g += P, m -= P) : (w = 0, g = m = (_ + p) / 2), ($ -= z * 2) > ot ? (z *= b ? 1 : -1, y += z, x -= z) : ($ = 0, y = x = (_ + p) / 2);
      }
      var L = d * se(y), D = d * zt(y), B = f * se(m), F = f * zt(m);
      if (C > ot) {
        var tt = d * se(x), it = d * zt(x), ye = f * se(g), pt = f * zt(g), Q;
        if (v < dn)
          if (Q = Sp(L, D, ye, pt, tt, it, B, F)) {
            var Cr = L - Q[0], $r = D - Q[1], Sr = tt - Q[0], Tr = it - Q[1], cs = 1 / zt(yp((Cr * Sr + $r * Tr) / (Ae(Cr * Cr + $r * $r) * Ae(Sr * Sr + Tr * Tr))) / 2), us = Ae(Q[0] * Q[0] + Q[1] * Q[1]);
            T = Dr(C, (f - us) / (cs - 1)), S = Dr(C, (d - us) / (cs + 1));
          } else
            T = S = 0;
      }
      $ > ot ? S > ot ? (M = zn(ye, pt, L, D, d, S, b), E = zn(tt, it, B, F, d, S, b), o.moveTo(M.cx + M.x01, M.cy + M.y01), S < C ? o.arc(M.cx, M.cy, S, et(M.y01, M.x01), et(E.y01, E.x01), !b) : (o.arc(M.cx, M.cy, S, et(M.y01, M.x01), et(M.y11, M.x11), !b), o.arc(0, 0, d, et(M.cy + M.y11, M.cx + M.x11), et(E.cy + E.y11, E.cx + E.x11), !b), o.arc(E.cx, E.cy, S, et(E.y11, E.x11), et(E.y01, E.x01), !b))) : (o.moveTo(L, D), o.arc(0, 0, d, y, x, !b)) : o.moveTo(L, D), !(f > ot) || !(w > ot) ? o.lineTo(B, F) : T > ot ? (M = zn(B, F, tt, it, f, -T, b), E = zn(L, D, ye, pt, f, -T, b), o.lineTo(M.cx + M.x01, M.cy + M.y01), T < C ? o.arc(M.cx, M.cy, T, et(M.y01, M.x01), et(E.y01, E.x01), !b) : (o.arc(M.cx, M.cy, T, et(M.y01, M.x01), et(M.y11, M.x11), !b), o.arc(0, 0, f, et(M.cy + M.y11, M.cx + M.x11), et(E.cy + E.y11, E.cx + E.x11), b), o.arc(E.cx, E.cy, T, et(E.y11, E.x11), et(E.y01, E.x01), !b))) : o.arc(0, 0, f, m, g, b);
    }
    if (o.closePath(), u) return o = null, u + "" || null;
  }
  return l.centroid = function() {
    var u = (+n.apply(this, arguments) + +t.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - dn / 2;
    return [se(h) * u, zt(h) * u];
  }, l.innerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : N(+u), l) : n;
  }, l.outerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : N(+u), l) : t;
  }, l.cornerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : N(+u), l) : e;
  }, l.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : N(+u), l) : r;
  }, l.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : N(+u), l) : i;
  }, l.endAngle = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : N(+u), l) : s;
  }, l.padAngle = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : N(+u), l) : a;
  }, l.context = function(u) {
    return arguments.length ? (o = u ?? null, l) : o;
  }, l;
}
var Tp = Array.prototype.slice;
function Hi(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function co(n) {
  this._context = n;
}
co.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(n, t) {
    switch (n = +n, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(n, t) : this._context.moveTo(n, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(n, t);
        break;
    }
  }
};
function uo(n) {
  return new co(n);
}
function Bi(n) {
  return n[0];
}
function Vi(n) {
  return n[1];
}
function Xi(n, t) {
  var e = N(!0), r = null, i = uo, s = null, a = yr(o);
  n = typeof n == "function" ? n : n === void 0 ? Bi : N(n), t = typeof t == "function" ? t : t === void 0 ? Vi : N(t);
  function o(c) {
    var l, u = (c = Hi(c)).length, h, f = !1, d;
    for (r == null && (s = i(d = a())), l = 0; l <= u; ++l)
      !(l < u && e(h = c[l], l, c)) === f && ((f = !f) ? s.lineStart() : s.lineEnd()), f && s.point(+n(h, l, c), +t(h, l, c));
    if (d) return s = null, d + "" || null;
  }
  return o.x = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : N(+c), o) : n;
  }, o.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : N(+c), o) : t;
  }, o.defined = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : N(!!c), o) : e;
  }, o.curve = function(c) {
    return arguments.length ? (i = c, r != null && (s = i(r)), o) : i;
  }, o.context = function(c) {
    return arguments.length ? (c == null ? r = s = null : s = i(r = c), o) : r;
  }, o;
}
function Mp(n, t, e) {
  var r = null, i = N(!0), s = null, a = uo, o = null, c = yr(l);
  n = typeof n == "function" ? n : n === void 0 ? Bi : N(+n), t = typeof t == "function" ? t : N(t === void 0 ? 0 : +t), e = typeof e == "function" ? e : e === void 0 ? Vi : N(+e);
  function l(h) {
    var f, d, _, p = (h = Hi(h)).length, v, b = !1, y, x = new Array(p), g = new Array(p);
    for (s == null && (o = a(y = c())), f = 0; f <= p; ++f) {
      if (!(f < p && i(v = h[f], f, h)) === b)
        if (b = !b)
          d = f, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), _ = f - 1; _ >= d; --_)
            o.point(x[_], g[_]);
          o.lineEnd(), o.areaEnd();
        }
      b && (x[f] = +n(v, f, h), g[f] = +t(v, f, h), o.point(r ? +r(v, f, h) : x[f], e ? +e(v, f, h) : g[f]));
    }
    if (y) return o = null, y + "" || null;
  }
  function u() {
    return Xi().defined(i).curve(a).context(s);
  }
  return l.x = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : N(+h), r = null, l) : n;
  }, l.x0 = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : N(+h), l) : n;
  }, l.x1 = function(h) {
    return arguments.length ? (r = h == null ? null : typeof h == "function" ? h : N(+h), l) : r;
  }, l.y = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : N(+h), e = null, l) : t;
  }, l.y0 = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : N(+h), l) : t;
  }, l.y1 = function(h) {
    return arguments.length ? (e = h == null ? null : typeof h == "function" ? h : N(+h), l) : e;
  }, l.lineX0 = l.lineY0 = function() {
    return u().x(n).y(t);
  }, l.lineY1 = function() {
    return u().x(n).y(e);
  }, l.lineX1 = function() {
    return u().x(r).y(t);
  }, l.defined = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : N(!!h), l) : i;
  }, l.curve = function(h) {
    return arguments.length ? (a = h, s != null && (o = a(s)), l) : a;
  }, l.context = function(h) {
    return arguments.length ? (h == null ? s = o = null : o = a(s = h), l) : s;
  }, l;
}
function Ep(n, t) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Pp(n) {
  return n;
}
function zp() {
  var n = Pp, t = Ep, e = null, r = N(0), i = N(Bn), s = N(0);
  function a(o) {
    var c, l = (o = Hi(o)).length, u, h, f = 0, d = new Array(l), _ = new Array(l), p = +r.apply(this, arguments), v = Math.min(Bn, Math.max(-Bn, i.apply(this, arguments) - p)), b, y = Math.min(Math.abs(v) / l, s.apply(this, arguments)), x = y * (v < 0 ? -1 : 1), g;
    for (c = 0; c < l; ++c)
      (g = _[d[c] = c] = +n(o[c], c, o)) > 0 && (f += g);
    for (t != null ? d.sort(function(m, w) {
      return t(_[m], _[w]);
    }) : e != null && d.sort(function(m, w) {
      return e(o[m], o[w]);
    }), c = 0, h = f ? (v - l * x) / f : 0; c < l; ++c, p = b)
      u = d[c], g = _[u], b = p + (g > 0 ? g * h : 0) + x, _[u] = {
        data: o[u],
        index: c,
        value: g,
        startAngle: p,
        endAngle: b,
        padAngle: y
      };
    return _;
  }
  return a.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : N(+o), a) : n;
  }, a.sortValues = function(o) {
    return arguments.length ? (t = o, e = null, a) : t;
  }, a.sort = function(o) {
    return arguments.length ? (e = o, t = null, a) : e;
  }, a.startAngle = function(o) {
    return arguments.length ? (r = typeof o == "function" ? o : N(+o), a) : r;
  }, a.endAngle = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : N(+o), a) : i;
  }, a.padAngle = function(o) {
    return arguments.length ? (s = typeof o == "function" ? o : N(+o), a) : s;
  }, a;
}
class ho {
  constructor(t, e) {
    this._context = t, this._x = e;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, e, t, e) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + e) / 2, t, this._y0, t, e);
        break;
      }
    }
    this._x0 = t, this._y0 = e;
  }
}
function Op(n) {
  return new ho(n, !0);
}
function Lp(n) {
  return new ho(n, !1);
}
function Np(n) {
  return n.source;
}
function Rp(n) {
  return n.target;
}
function fo(n) {
  let t = Np, e = Rp, r = Bi, i = Vi, s = null, a = null, o = yr(c);
  function c() {
    let l;
    const u = Tp.call(arguments), h = t.apply(this, u), f = e.apply(this, u);
    if (s == null && (a = n(l = o())), a.lineStart(), u[0] = h, a.point(+r.apply(this, u), +i.apply(this, u)), u[0] = f, a.point(+r.apply(this, u), +i.apply(this, u)), a.lineEnd(), l) return a = null, l + "" || null;
  }
  return c.source = function(l) {
    return arguments.length ? (t = l, c) : t;
  }, c.target = function(l) {
    return arguments.length ? (e = l, c) : e;
  }, c.x = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : N(+l), c) : r;
  }, c.y = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : N(+l), c) : i;
  }, c.context = function(l) {
    return arguments.length ? (l == null ? s = a = null : a = n(s = l), c) : s;
  }, c;
}
function Dp() {
  return fo(Op);
}
function Ip() {
  return fo(Lp);
}
function Ys(n) {
  return n < 0 ? -1 : 1;
}
function Gs(n, t, e) {
  var r = n._x1 - n._x0, i = t - n._x1, s = (n._y1 - n._y0) / (r || i < 0 && -0), a = (e - n._y1) / (i || r < 0 && -0), o = (s * i + a * r) / (r + i);
  return (Ys(s) + Ys(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function Ws(n, t) {
  var e = n._x1 - n._x0;
  return e ? (3 * (n._y1 - n._y0) / e - t) / 2 : t;
}
function Ir(n, t, e) {
  var r = n._x0, i = n._y0, s = n._x1, a = n._y1, o = (s - r) / 3;
  n._context.bezierCurveTo(r + o, i + o * t, s - o, a - o * e, s, a);
}
function ur(n) {
  this._context = n;
}
ur.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Ir(this, this._t0, Ws(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(n, t) {
    var e = NaN;
    if (n = +n, t = +t, !(n === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(n, t) : this._context.moveTo(n, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Ir(this, Ws(this, e = Gs(this, n, t)), e);
          break;
        default:
          Ir(this, this._t0, e = Gs(this, n, t));
          break;
      }
      this._x0 = this._x1, this._x1 = n, this._y0 = this._y1, this._y1 = t, this._t0 = e;
    }
  }
};
Object.create(ur.prototype).point = function(n, t) {
  ur.prototype.point.call(this, t, n);
};
function Fp(n) {
  return new ur(n);
}
function tn(n, t, e) {
  this.k = n, this.x = t, this.y = e;
}
tn.prototype = {
  constructor: tn,
  scale: function(n) {
    return n === 1 ? this : new tn(this.k * n, this.x, this.y);
  },
  translate: function(n, t) {
    return n === 0 & t === 0 ? this : new tn(this.k, this.x + this.k * n, this.y + this.k * t);
  },
  apply: function(n) {
    return [n[0] * this.k + this.x, n[1] * this.k + this.y];
  },
  applyX: function(n) {
    return n * this.k + this.x;
  },
  applyY: function(n) {
    return n * this.k + this.y;
  },
  invert: function(n) {
    return [(n[0] - this.x) / this.k, (n[1] - this.y) / this.k];
  },
  invertX: function(n) {
    return (n - this.x) / this.k;
  },
  invertY: function(n) {
    return (n - this.y) / this.k;
  },
  rescaleX: function(n) {
    return n.copy().domain(n.range().map(this.invertX, this).map(n.invert, n));
  },
  rescaleY: function(n) {
    return n.copy().domain(n.range().map(this.invertY, this).map(n.invert, n));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
tn.prototype;
const qp = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Hp = `
  :host { display: block; min-height: 60px; }
  svg { width: 100%; display: block; direction: ltr; }
  .bar { transition: opacity 0.3s; }
  .bar:hover { opacity: 0.8; }
  .label { fill: #fff; font-size: 0.85em; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
  .value-text { font-weight: 700; font-size: 0.8em; }
  .tag { font-size: 0.7em; }
  .axis line { stroke: var(--lv-border, #2a2a4a); }
`, Bp = 28, po = 8, Us = Bp + po;
class Vp extends I {
  constructor() {
    super(...arguments);
    O(this, "_data", []);
    O(this, "_hasAnimated", !1);
    O(this, "_resizeObserver", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    O(this, "_svg", null);
    O(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "direction", "sorted", "animated"];
  }
  get data() {
    return this._data;
  }
  set data(e) {
    if (typeof e == "string")
      try {
        this._data = JSON.parse(e);
      } catch {
        this._data = [];
      }
    else
      this._data = e;
    this._svg && this._render(!0);
  }
  get _direction() {
    return this.getAttribute("direction") === "vertical" ? "vertical" : "horizontal";
  }
  get _sorted() {
    return this.hasAttribute("sorted");
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || qp[e % 8];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Hp), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
    let e;
    this._resizeObserver = new ResizeObserver(() => {
      clearTimeout(e), e = window.setTimeout(() => this._render(!1), 100);
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = null;
  }
  attributeChangedCallback(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(e === "data"));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0, !0));
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = G(e), this._svg.append("g").attr("class", "chart-area"), this._svg.append("g").attr("class", "axis-group");
  }
  _render(e, r = !1) {
    if (!this._svg || !this._container) return;
    const i = this._sorted ? [...this._data].sort((s, a) => a.value - s.value) : [...this._data];
    this._direction === "vertical" ? this._renderVertical(i, e, r) : this._renderHorizontal(i, e, r);
  }
  _renderHorizontal(e, r, i) {
    const s = this.isRtl, a = this.clientWidth || 400, o = {
      top: 10,
      right: 120,
      // space for value + tag
      bottom: 10,
      left: 10
    }, c = Math.max(a - o.left - o.right, 10), l = e.length * Us, u = l + o.top + o.bottom;
    this._svg.attr("viewBox", `0 0 ${a} ${u}`).attr("height", u);
    const h = Un(e, (m) => m.value) || 1, f = Yt().domain([0, h]).range([0, c]), d = hi().domain(e.map((m) => m.label)).range([0, l]).paddingInner(po / Us).paddingOuter(0), _ = this._svg.select(".chart-area").attr("transform", `translate(${o.left},${o.top})`);
    this._svg.select(".axis-group").attr("transform", `translate(${o.left},${o.top})`).selectAll(".axis-line").data([0]).join("line").attr("class", "axis-line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", l).attr("stroke", "var(--lv-border, #2a2a4a)").attr("stroke-width", 1);
    const v = _.selectAll(".bar-group").data(e, (m) => m.label), b = r ? 800 : 0, y = i && !this._isInstant(), x = v.enter().append("g").attr("class", "bar-group").attr("transform", (m, w) => `translate(0,${d(e[w].label)})`);
    x.append("rect").attr("class", "bar").attr("x", 0).attr("y", 0).attr("width", (m) => y ? 0 : f(m.value)).attr("height", d.bandwidth()).attr("rx", 4).attr("ry", 4).attr("fill", (m, w) => this._getColor(w, m)), x.append("text").attr("class", "label").attr("x", (m) => {
      const w = f(m.value);
      return w > 100 ? w - 8 : w + 6;
    }).attr("y", d.bandwidth() / 2).attr("dy", "0.35em").attr("text-anchor", (m) => f(m.value) > 100 ? "end" : "start").attr("opacity", y ? 0 : 1).text((m) => m.label), x.append("text").attr("class", "value-text").attr("x", (m) => {
      const w = f(m.value);
      return y ? 0 : w + 6;
    }).attr("y", d.bandwidth() / 2).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", (m, w) => this._getColor(w, m)).attr("opacity", y ? 0 : 1).text((m) => typeof m.value == "number" ? m.value.toFixed(2) : m.value), x.each((m, w, $) => {
      if (!m.tag) return;
      const A = G($[w]), k = m.tagColor || this._getColor(w, m);
      A.append("rect").attr("class", "tag-bg").attr("rx", 8).attr("ry", 8).attr("fill", k).attr("fill-opacity", 0.15).attr("opacity", y ? 0 : 1), A.append("text").attr("class", "tag").attr("fill", k).attr("dy", "0.35em").attr("y", d.bandwidth() / 2).attr("opacity", y ? 0 : 1).text(m.tag);
    });
    const g = x.merge(v);
    g.transition().duration(b).ease(_t).attr("transform", (m) => `translate(0,${d(m.label)})`), g.select(".bar").transition().duration(b).ease(_t).attr("x", 0).attr("width", (m) => f(m.value)).attr("height", d.bandwidth()).attr("fill", (m, w) => this._getColor(w, m)), g.select(".label").transition().duration(b).ease(_t).attr("opacity", 1).attr("x", (m) => {
      const w = f(m.value);
      return w > 100 ? w - 8 : w + 6;
    }).attr("text-anchor", (m) => f(m.value) > 100 ? "end" : "start").attr("y", d.bandwidth() / 2), g.select(".value-text").transition().duration(b).ease(_t).attr("x", (m) => f(m.value) + 6).attr("opacity", 1).attr("fill", (m, w) => this._getColor(w, m)).text((m) => typeof m.value == "number" ? m.value.toFixed(2) : m.value), g.each((m, w, $) => {
      const A = G($[w]);
      A.select(".tag-bg").transition().duration(b).attr("opacity", 1), A.select(".tag").transition().duration(b).attr("opacity", 1);
    }), this._positionTags(g, d, s, f), v.exit().transition().duration(b / 2).attr("opacity", 0).remove();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _positionTags(e, r, i, s) {
    requestAnimationFrame(() => {
      e.each((a, o, c) => {
        var b, y;
        if (!a.tag) return;
        const l = G(c[o]), u = l.select(".value-text").node();
        if (!u) return;
        const h = s(a.value), f = ((b = u.getComputedTextLength) == null ? void 0 : b.call(u)) || 30, d = l.select(".tag").node(), _ = ((y = d == null ? void 0 : d.getComputedTextLength) == null ? void 0 : y.call(d)) || 20, p = h + 6 + f + 10 + _ / 2;
        l.select(".tag").attr("x", p).attr("text-anchor", "middle");
        const v = 6;
        l.select(".tag-bg").attr("x", p - _ / 2 - v).attr("y", r.bandwidth() / 2 - 8).attr("width", _ + v * 2).attr("height", 16);
      });
    });
  }
  _renderVertical(e, r, i) {
    const s = this.clientWidth || 400, a = { top: 20, right: 10, bottom: 40, left: 10 }, o = Math.max(s - a.left - a.right, 10), c = 200, l = c + a.top + a.bottom;
    this._svg.attr("viewBox", `0 0 ${s} ${l}`).attr("height", l);
    const u = Un(e, (g) => g.value) || 1, h = hi().domain(e.map((g) => g.label)).range([0, o]).paddingInner(0.2).paddingOuter(0.1), f = Yt().domain([0, u]).range([c, 0]), d = this._svg.select(".chart-area").attr("transform", `translate(${a.left},${a.top})`);
    this._svg.select(".axis-group").attr("transform", `translate(${a.left},${a.top})`).selectAll(".axis-line").data([0]).join("line").attr("class", "axis-line").attr("x1", 0).attr("x2", o).attr("y1", c).attr("y2", c).attr("stroke", "var(--lv-border, #2a2a4a)").attr("stroke-width", 1);
    const p = r ? 800 : 0, v = i && !this._isInstant(), b = d.selectAll(".bar-group").data(e, (g) => g.label), y = b.enter().append("g").attr("class", "bar-group").attr("transform", (g) => `translate(${h(g.label)},0)`);
    y.append("rect").attr("class", "bar").attr("x", 0).attr("y", v ? c : ((g) => f(g.value))).attr("width", h.bandwidth()).attr("height", (g) => v ? 0 : c - f(g.value)).attr("rx", 4).attr("ry", 4).attr("fill", (g, m) => this._getColor(m, g)), y.append("text").attr("class", "label").attr("x", h.bandwidth() / 2).attr("y", c + 16).attr("text-anchor", "middle").attr("opacity", v ? 0 : 1).text((g) => g.label), y.append("text").attr("class", "value-text").attr("x", h.bandwidth() / 2).attr("y", (g) => v ? c - 4 : f(g.value) - 6).attr("text-anchor", "middle").attr("fill", (g, m) => this._getColor(m, g)).attr("opacity", v ? 0 : 1).text((g) => g.value);
    const x = y.merge(b);
    x.transition().duration(p).ease(_t).attr("transform", (g) => `translate(${h(g.label)},0)`), x.select(".bar").transition().duration(p).ease(_t).attr("y", (g) => f(g.value)).attr("height", (g) => c - f(g.value)).attr("width", h.bandwidth()).attr("fill", (g, m) => this._getColor(m, g)), x.select(".label").transition().duration(p).ease(_t).attr("opacity", 1), x.select(".value-text").transition().duration(p).ease(_t).attr("y", (g) => f(g.value) - 6).attr("opacity", 1).attr("fill", (g, m) => this._getColor(m, g)).text((g) => g.value), b.exit().transition().duration(p / 2).attr("opacity", 0).remove();
  }
  _isInstant() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}
customElements.define("lv-bar-chart", Vp);
const Xp = (
  /* css */
  `
  :host { display: block; }
  svg { width: 100%; max-width: 700px; margin: 0 auto; display: block; direction: ltr; }
  .cell { cursor: default; transition: transform 0.2s ease; transform-origin: center; }
  .cell:hover { transform: scale(1.08); }
  .cell-text { text-anchor: middle; dominant-baseline: central; font-size: 11px; font-weight: 600; pointer-events: none; }
  .header-text { text-anchor: middle; dominant-baseline: central; font-size: 12px; fill: var(--lv-text-dim, #888); }
  .tooltip {
    position: absolute;
    background: var(--lv-card, #222);
    color: var(--lv-text, #fff);
    border: 1px solid var(--lv-border, #444);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    white-space: nowrap;
    z-index: 10;
  }
`
);
class Yp extends I {
  constructor() {
    super(...arguments);
    O(this, "_svg", null);
    O(this, "_animated", !0);
    O(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["labels", "values", "scale", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Xp), this._animated = this.getAttribute("animated") !== "false", this._buildChart();
  }
  attributeChangedCallback() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated) return;
    this._hasAnimated = !0;
    const r = this._svg;
    if (!r) return;
    const i = r.querySelectorAll(".cell");
    if (e || !this._animated) {
      i.forEach((s) => {
        s.style.opacity = "1", s.style.transform = "scale(1)";
      });
      return;
    }
    i.forEach((s) => {
      const a = s, o = Number(a.dataset.delay || 0);
      a.style.opacity = "0", a.style.transform = "scale(0.5)", a.style.transition = "none", requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          a.style.transition = `opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`, a.style.opacity = "1", a.style.transform = "scale(1)";
        });
      });
    });
  }
  _buildChart() {
    var y;
    const e = this.jsonAttr("labels", []), r = this.jsonAttr("values", []), i = this.getAttribute("scale") || "diverging";
    if (!e.length || !r.length) {
      this.render("<svg></svg>");
      return;
    }
    const s = e.length, a = 3, o = 60, c = 110, l = 56, u = s * l + (s - 1) * a, h = u + c, f = u + o, d = i === "sequential" ? so(xp).domain([0, 1]) : ao(mp).domain([-1, 0, 1]), _ = this.isRtl;
    let p = "";
    for (let x = 0; x < s; x++) {
      const g = c + x * (l + a) + l / 2, m = o / 2;
      p += `<text class="header-text" x="${_ ? h - g : g}" y="${m}">${this._escapeHtml(e[x])}</text>`;
    }
    for (let x = 0; x < s; x++) {
      const g = o + x * (l + a) + l / 2, m = _ ? h - c / 2 : c / 2;
      p += `<text class="header-text" x="${m}" y="${g}">${this._escapeHtml(e[x])}</text>`;
    }
    for (let x = 0; x < s; x++)
      for (let g = 0; g < s; g++) {
        const m = ((y = r[x]) == null ? void 0 : y[g]) ?? 0, w = d(m), $ = this._contrastColor(w), A = (x + g) * 40;
        let k = c + g * (l + a);
        _ && (k = h - k - l);
        const C = o + x * (l + a), T = k + l / 2, S = C + l / 2;
        p += `<g class="cell" data-delay="${A}" data-value="${m.toFixed(2)}" style="transform-origin: ${T}px ${S}px; opacity: 0; transform: scale(0.5);">`, p += `<rect x="${k}" y="${C}" width="${l}" height="${l}" rx="6" ry="6" fill="${w}"/>`, p += `<text class="cell-text" x="${T}" y="${S}" fill="${$}">${m.toFixed(2)}</text>`, p += "</g>";
      }
    const v = `
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;
    this.render(v), this._svg = this.root.querySelector("svg");
    const b = this.root.querySelector(".tooltip");
    this._svg && b && this._svg.querySelectorAll(".cell").forEach((x) => {
      x.addEventListener("mouseenter", (g) => {
        const w = g.currentTarget.dataset.value || "";
        b.textContent = w, b.style.opacity = "1";
      }), x.addEventListener("mousemove", (g) => {
        const m = g, w = this.root.querySelector("div").getBoundingClientRect();
        b.style.left = `${m.clientX - w.left + 10}px`, b.style.top = `${m.clientY - w.top - 28}px`;
      }), x.addEventListener("mouseleave", () => {
        b.style.opacity = "0";
      });
    });
  }
  _contrastColor(e) {
    const r = te(e);
    if (!r) return "#000";
    const i = r.rgb();
    return (0.299 * i.r + 0.587 * i.g + 0.114 * i.b) / 255 > 0.5 ? "#000" : "#fff";
  }
  _escapeHtml(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-heatmap", Yp);
const Gp = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .area { opacity: 0; transition: opacity 0.5s; }
  .area.visible { opacity: 1; }
  .point { opacity: 0; transition: opacity 0.3s, transform 0.3s; }
  .point.visible { opacity: 1; }
  .tooltip-group { pointer-events: none; }
  .tooltip-bg { fill: var(--lv-bg-card, #1a1a2e); stroke: var(--lv-border, #2a2a4a); rx: 6; }
  .tooltip-text { fill: var(--lv-text, #e4e4ec); font-size: 11px; }
  .crosshair { stroke: var(--lv-text-dim, #888); stroke-dasharray: 3 3; stroke-width: 1; }
  .axis text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .axis path, .axis line { stroke: var(--lv-text-dim, #888); stroke-opacity: 0.3; }
  .grid line { stroke: var(--lv-text-dim, #888); stroke-opacity: 0.08; stroke-dasharray: 3 3; }
  .grid path { display: none; }
  .axis-label { fill: var(--lv-text-dim, #888); font-size: 11px; }
`, Re = { top: 20, right: 30, bottom: 40, left: 60 }, go = 500, _o = 250, ae = go - Re.left - Re.right, Ht = _o - Re.top - Re.bottom;
class Wp extends I {
  constructor() {
    super(...arguments);
    O(this, "_resizeObs", null);
    O(this, "_svg", null);
    O(this, "_built", !1);
  }
  static get observedAttributes() {
    return ["data", "area", "points", "tooltip", "color", "x-label", "y-label", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Gp), this.root.innerHTML = "<svg></svg>", this._buildChart(), this._resizeObs = new ResizeObserver(() => {
    }), this._resizeObs.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObs) == null || e.disconnect(), this._resizeObs = null;
  }
  attributeChangedCallback(e, r, i) {
    this._built && this._buildChart();
  }
  _parseData() {
    const e = this.jsonAttr("data", []);
    return !Array.isArray(e) || e.length === 0 ? [] : typeof e[0] == "number" ? e.map((r, i) => ({ x: i, y: r })) : e;
  }
  _getColor() {
    return this.getAttribute("color") || "var(--lv-accent, #3b82f6)";
  }
  _buildChart() {
    const e = this._parseData();
    if (e.length === 0) return;
    const r = this.root.querySelector("svg");
    if (!r) return;
    const i = this._getColor(), s = this.hasAttribute("area"), a = this.hasAttribute("points"), o = this.hasAttribute("tooltip"), c = this.getAttribute("x-label") || "", l = this.getAttribute("y-label") || "";
    G(r).selectAll("*").remove();
    const u = G(r).attr("viewBox", `0 0 ${go} ${_o}`).attr("preserveAspectRatio", "xMidYMid meet");
    this._svg = u;
    const h = u.append("defs"), f = `lv-area-grad-${Math.random().toString(36).slice(2, 8)}`, d = h.append("linearGradient").attr("id", f).attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");
    d.append("stop").attr("offset", "0%").attr("stop-color", i).attr("stop-opacity", 0.25), d.append("stop").attr("offset", "100%").attr("stop-color", i).attr("stop-opacity", 0);
    const _ = u.append("g").attr("transform", `translate(${Re.left},${Re.top})`), p = Gn(e, (A) => A.x), v = Gn(e, (A) => A.y), b = (v[1] - v[0]) * 0.1 || 1, y = Yt().domain(p).range([0, ae]), x = Yt().domain([v[0] - b, v[1] + b]).range([Ht, 0]);
    if (_.append("g").attr("class", "grid").attr("transform", `translate(0,${Ht})`).call(
      jn(y).tickSize(-Ht).tickFormat(() => "")
    ), _.append("g").attr("class", "grid").call(
      Kn(x).tickSize(-ae).tickFormat(() => "")
    ), _.append("g").attr("class", "axis x-axis").attr("transform", `translate(0,${Ht})`).call(jn(y).ticks(6)), _.append("g").attr("class", "axis y-axis").call(Kn(x).ticks(5)), c && _.append("text").attr("class", "axis-label").attr("x", ae / 2).attr("y", Ht + 35).attr("text-anchor", "middle").text(c), l && _.append("text").attr("class", "axis-label").attr("x", -Ht / 2).attr("y", -38).attr("transform", "rotate(-90)").attr("text-anchor", "middle").text(l), s) {
      const A = Mp().x((k) => y(k.x)).y0(Ht).y1((k) => x(k.y));
      _.append("path").datum(e).attr("class", "area").attr("d", A).attr("fill", `url(#${f})`);
    }
    const g = Xi().x((A) => y(A.x)).y((A) => x(A.y)), m = _.append("path").datum(e).attr("class", "line").attr("d", g).attr("stroke", i).attr("stroke-width", 2.5), $ = m.node().getTotalLength();
    m.attr("stroke-dasharray", $).attr("stroke-dashoffset", $), a && _.selectAll(".point").data(e).enter().append("circle").attr("class", "point").attr("cx", (A) => y(A.x)).attr("cy", (A) => x(A.y)).attr("r", 4).attr("fill", i).attr("stroke", "white").attr("stroke-width", 1.5), o && this._setupTooltip(_, e, y, x, i), this._built = !0, this.getAttribute("animated") === "false" && this._showInstant();
  }
  _setupTooltip(e, r, i, s, a) {
    const o = e.append("g").attr("class", "tooltip-group").style("display", "none");
    o.append("line").attr("class", "crosshair crosshair-x").attr("y1", 0).attr("y2", Ht), o.append("line").attr("class", "crosshair crosshair-y").attr("x1", 0).attr("x2", ae), o.append("circle").attr("r", 5).attr("fill", a).attr("stroke", "white").attr("stroke-width", 2), o.append("rect").attr("class", "tooltip-bg").attr("width", 60).attr("height", 24).attr("rx", 6), o.append("text").attr("class", "tooltip-text").attr("text-anchor", "middle").attr("dy", "0.35em");
    const c = Si((l) => l.x).left;
    e.append("rect").attr("width", ae).attr("height", Ht).attr("fill", "transparent").on("mousemove", (l) => {
      const [u] = ni(l), h = i.invert(u);
      let f = c(r, h, 1);
      if (f >= r.length && (f = r.length - 1), f > 0) {
        const g = r[f - 1], m = r[f];
        f = h - g.x > m.x - h ? f : f - 1;
      }
      const d = r[f], _ = i(d.x), p = s(d.y);
      o.style("display", null), o.select(".crosshair-x").attr("x1", _).attr("x2", _), o.select(".crosshair-y").attr("y1", p).attr("y2", p), o.select("circle").attr("cx", _).attr("cy", p);
      const v = 60, b = 24;
      let y = _ - v / 2, x = p - b - 10;
      y < 0 && (y = 0), y + v > ae && (y = ae - v), x < 0 && (x = p + 10), o.select(".tooltip-bg").attr("x", y).attr("y", x), o.select(".tooltip-text").attr("x", y + v / 2).attr("y", x + b / 2).text(`${d.y.toFixed(1)}`);
    }).on("mouseleave", () => {
      o.style("display", "none");
    });
  }
  _showInstant() {
    if (!this._svg) return;
    const e = this._svg.select("g");
    e.select(".line").attr("stroke-dashoffset", 0), e.select(".area").classed("visible", !0), e.selectAll(".point").classed("visible", !0);
  }
  animateIn(e) {
    var a;
    if (!this._svg) return;
    if (e || this.getAttribute("animated") === "false") {
      this._showInstant();
      return;
    }
    const r = this._svg.select("g"), i = r.select(".line"), s = ((a = i.node()) == null ? void 0 : a.getTotalLength()) || 0;
    i.attr("stroke-dasharray", s).attr("stroke-dashoffset", s).transition().duration(1200).ease(_t).attr("stroke-dashoffset", 0), r.select(".area").transition().delay(1500).duration(0).on("start", function() {
      G(this).classed("visible", !0);
    }), r.selectAll(".point").each(function(o, c) {
      G(this).transition().delay(1500 + c * 50).duration(0).on("start", function() {
        G(this).classed("visible", !0);
      });
    });
  }
}
customElements.define("lv-line-chart", Wp);
const On = {
  sigmoid: (n) => 1 / (1 + Math.exp(-n)),
  relu: (n) => Math.max(0, n),
  tanh: (n) => Math.tanh(n),
  linear: (n) => n
}, Up = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; background: var(--lv-bg-raised, #12122a); border-radius: var(--lv-r-md, 12px); }
  .fn-line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .grid-line { stroke: var(--lv-border, #2a2a4a); stroke-dasharray: 4; opacity: 0.3; }
  .axis-line { stroke: var(--lv-text-dim, #888); stroke-width: 1; }
  .axis-text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .drag-point { cursor: grab; filter: drop-shadow(0 0 4px var(--lv-accent)); }
  .drag-point:active { cursor: grabbing; }
  .readout-bg { fill: var(--lv-bg-card, #1a1a2e); stroke: var(--lv-border, #2a2a4a); rx: 6; }
  .readout-text { fill: var(--lv-text, #e4e4ec); font-size: 11px; font-family: var(--lv-font-mono, monospace); }
  .crosshair { stroke: var(--lv-text-dim, #888); stroke-dasharray: 3 3; stroke-width: 1; }
  .key-point { fill: var(--lv-warning, #ffd93d); }
  .key-label { fill: var(--lv-warning, #ffd93d); font-size: 10px; }
`, js = 500, Ks = 300;
class jp extends I {
  constructor() {
    super(...arguments);
    O(this, "_hasAnimated", !1);
    O(this, "_resizeObserver", null);
    O(this, "_svg", null);
    O(this, "_fn", On.sigmoid);
    O(this, "_fnName", "sigmoid");
  }
  static get observedAttributes() {
    return ["fn", "range", "samples", "color", "interactive", "animated"];
  }
  get _range() {
    return this.jsonAttr("range", [-6, 6]);
  }
  get _samples() {
    const e = this.getAttribute("samples");
    return e && parseInt(e, 10) || 200;
  }
  get _color() {
    return this.getAttribute("color") || "var(--lv-accent, #3b82f6)";
  }
  get _interactive() {
    return this.hasAttribute("interactive");
  }
  get _animated() {
    const e = this.getAttribute("animated");
    return e === null ? !0 : e !== "false";
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Up);
    const e = document.createElement("div");
    this.root.appendChild(e);
    const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    r.setAttribute("viewBox", `0 0 ${js} ${Ks}`), r.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.appendChild(r), this._svg = G(r), this._parseFn(), this._render(!1), this._resizeObserver = new ResizeObserver(() => {
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = null;
  }
  attributeChangedCallback(e, r, i) {
    r !== i && (e === "fn" && this._parseFn(), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e || !this._animated ? this._render(!1) : this._render(!0));
  }
  _parseFn() {
    const e = this.getAttribute("fn") || "sigmoid";
    if (this._fnName = e, On[e])
      this._fn = On[e];
    else
      try {
        const r = e.replace(/^\s*x\s*=>\s*/, "");
        this._fn = new Function("x", "return " + r), this._fnName = "custom";
      } catch {
        this._fn = On.sigmoid, this._fnName = "sigmoid";
      }
  }
  _generateData() {
    const [e, r] = this._range, i = this._samples, s = (r - e) / (i - 1), a = [];
    for (let o = 0; o < i; o++) {
      const c = e + o * s, l = this._fn(c);
      a.push({ x: c, y: l });
    }
    return a;
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._svg;
    r.selectAll("*").remove();
    const i = this._generateData(), [s, a] = this._range, o = i.map((m) => m.y), c = Ec(o) ?? -1, l = Un(o) ?? 1, u = (l - c) * 0.15 || 0.5, h = c - u, f = l + u, d = { top: 20, right: 30, bottom: 30, left: 40 }, _ = js - d.left - d.right, p = Ks - d.top - d.bottom, v = Yt().domain([s, a]).range([0, _]), b = Yt().domain([h, f]).range([p, 0]), y = r.append("g").attr("transform", `translate(${d.left},${d.top})`);
    this._drawGrid(y, v, b, _, p), this._drawAxes(y, v, b, _, p);
    const x = Xi().x((m) => v(m.x)).y((m) => b(m.y)).curve(Fp), g = y.append("path").datum(i).attr("class", "fn-line").attr("d", x).attr("stroke", this._color).attr("stroke-width", 3);
    if (e) {
      const w = g.node().getTotalLength();
      g.attr("stroke-dasharray", w).attr("stroke-dashoffset", w).transition().duration(1e3).ease(_t).attr("stroke-dashoffset", 0);
    }
    this._drawKeyPoints(y, v, b), this._interactive && this._addInteractivePoint(y, v, b, i, _, p);
  }
  _drawGrid(e, r, i, s, a) {
    const o = r.ticks(), c = i.ticks();
    e.selectAll(".grid-line-x").data(o).enter().append("line").attr("class", "grid-line").attr("x1", (l) => r(l)).attr("x2", (l) => r(l)).attr("y1", 0).attr("y2", a), e.selectAll(".grid-line-y").data(c).enter().append("line").attr("class", "grid-line").attr("x1", 0).attr("x2", s).attr("y1", (l) => i(l)).attr("y2", (l) => i(l));
  }
  _drawAxes(e, r, i, s, a) {
    const [o, c] = r.domain(), [l, u] = i.domain(), h = l <= 0 && u >= 0 ? i(0) : a;
    e.append("line").attr("class", "axis-line").attr("x1", 0).attr("x2", s).attr("y1", h).attr("y2", h);
    const f = o <= 0 && c >= 0 ? r(0) : 0;
    e.append("line").attr("class", "axis-line").attr("x1", f).attr("x2", f).attr("y1", 0).attr("y2", a), r.ticks().forEach((p) => {
      const v = r(p);
      e.append("line").attr("class", "axis-line").attr("x1", v).attr("x2", v).attr("y1", h - 3).attr("y2", h + 3), e.append("text").attr("class", "axis-text").attr("x", v).attr("y", h + 14).attr("text-anchor", "middle").text(p);
    }), i.ticks().forEach((p) => {
      const v = i(p);
      e.append("line").attr("class", "axis-line").attr("x1", f - 3).attr("x2", f + 3).attr("y1", v).attr("y2", v), e.append("text").attr("class", "axis-text").attr("x", f - 12).attr("y", v).attr("dy", "0.35em").attr("text-anchor", "end").text(p);
    });
  }
  _drawKeyPoints(e, r, i) {
    if (this._fnName === "sigmoid") {
      const s = r(0), a = i(0.5);
      e.append("circle").attr("class", "key-point").attr("cx", s).attr("cy", a).attr("r", 4), e.append("text").attr("class", "key-label").attr("x", s + 8).attr("y", a - 8).text("σ(0) = 0.5");
    } else if (this._fnName === "relu") {
      const s = r(0), a = i(0);
      e.append("circle").attr("class", "key-point").attr("cx", s).attr("cy", a).attr("r", 4), e.append("text").attr("class", "key-label").attr("x", s + 8).attr("y", a - 8).text("kink point");
    }
  }
  _addInteractivePoint(e, r, i, s, a, o) {
    const [c, l] = this._range, u = this._fn, h = (c + l) / 2, f = u(h), d = e.append("line").attr("class", "crosshair").attr("x1", r(h)).attr("x2", r(h)).attr("y1", i(f)).attr("y2", o), _ = e.append("line").attr("class", "crosshair").attr("x1", 0).attr("x2", r(h)).attr("y1", i(f)).attr("y2", i(f)), p = e.append("g"), v = p.append("rect").attr("class", "readout-bg").attr("width", 160).attr("height", 24).attr("rx", 6), b = p.append("text").attr("class", "readout-text").attr("text-anchor", "middle"), y = e.append("circle").attr("class", "drag-point").attr("cx", r(h)).attr("cy", i(f)).attr("r", 8).attr("fill", this._color).attr("stroke", "#fff").attr("stroke-width", 2), x = (m, w, $, A) => {
      const k = `x = ${$.toFixed(2)}, y = ${A.toFixed(2)}`;
      b.text(k);
      const C = 160, T = 24, S = 12;
      let M = m - C / 2, E = w - T - S;
      M < 0 && (M = 0), M + C > a && (M = a - C), E < 0 && (E = w + S), v.attr("x", M).attr("y", E).attr("width", C).attr("height", T), b.attr("x", M + C / 2).attr("y", E + T / 2).attr("text-anchor", "middle");
    };
    x(r(h), i(f), h, f);
    const g = Sh().on("drag", (m) => {
      const w = Math.max(0, Math.min(a, m.x)), $ = r.invert(w), A = Math.max(c, Math.min(l, $)), k = u(A), C = r(A), T = i(k);
      y.attr("cx", C).attr("cy", T), d.attr("x1", C).attr("x2", C).attr("y1", T).attr("y2", o), _.attr("x1", 0).attr("x2", C).attr("y1", T).attr("y2", T), x(C, T, A, k);
    });
    y.call(g);
  }
}
customElements.define("lv-function", jp);
const Zs = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Kp = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .point { cursor: pointer; transition: opacity 0.2s; }
  .point:hover { opacity: 0.9; }
  .grid line { stroke: var(--lv-border, #2a2a4a); stroke-opacity: 0.4; }
  .grid .domain { display: none; }
  .axis-label { fill: var(--lv-text-dim, #888); font-size: 12px; }
  .axis line, .axis path { stroke: var(--lv-border, #2a2a4a); }
  .axis text { fill: var(--lv-text-dim, #888); font-size: 10px; }
  .tooltip-box {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .tooltip-box.visible { opacity: 1; }
  .tooltip-bg {
    fill: var(--lv-bg-raised, #1e1e3a);
    stroke: var(--lv-border, #2a2a4a);
    rx: 4;
  }
  .tooltip-text {
    fill: var(--lv-text, #e4e4ec);
    font-size: 11px;
    text-anchor: middle;
    dominant-baseline: central;
  }
  .legend-text { fill: var(--lv-text-dim, #888); font-size: 11px; }
`, gt = { top: 20, right: 20, bottom: 50, left: 55 }, Qs = 500, Fr = 400;
class Zp extends I {
  constructor() {
    super(...arguments);
    O(this, "_data", []);
    O(this, "_hasAnimated", !1);
    O(this, "_svg", null);
    O(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "clusters", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Kp), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  attributeChangedCallback(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || Zs[e % 8];
  }
  _clusterColor(e) {
    const i = [...new Set(this._data.map((o) => o.cluster).filter((o) => o != null))].indexOf(e), s = i >= 0 ? i : 0;
    return getComputedStyle(this).getPropertyValue(`--lv-chart-${s % 8}`).trim() || Zs[s % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = G(e), this._svg.append("g").attr("class", "grid-group"), this._svg.append("g").attr("class", "axis-group"), this._svg.append("g").attr("class", "points-group"), this._svg.append("g").attr("class", "tooltip-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("clusters"), s = this.hasAttribute("tooltip"), a = this.getAttribute("x-label") || "", o = this.getAttribute("y-label") || "", c = i ? [...new Set(r.map((P) => P.cluster).filter((P) => P != null))] : [], l = c.length > 0 ? 30 : 0, u = Fr + l, h = Qs - gt.left - gt.right, f = Fr - gt.top - gt.bottom;
    this._svg.attr("viewBox", `0 0 ${Qs} ${u}`);
    const d = Gn(r, (P) => P.x), _ = Gn(r, (P) => P.y), p = (d[1] - d[0]) * 0.05 || 1, v = (_[1] - _[0]) * 0.05 || 1, b = Yt().domain([d[0] - p, d[1] + p]).range([0, h]), y = Yt().domain([_[0] - v, _[1] + v]).range([f, 0]), x = this._svg.select(".grid-group").attr("transform", `translate(${gt.left},${gt.top})`);
    x.selectAll("*").remove();
    const g = jn(b).tickSize(-f).tickFormat(() => "");
    x.append("g").attr("class", "grid").attr("transform", `translate(0,${f})`).call(g);
    const m = Kn(y).tickSize(-h).tickFormat(() => "");
    x.append("g").attr("class", "grid").call(m);
    const w = this._svg.select(".axis-group").attr("transform", `translate(${gt.left},${gt.top})`);
    w.selectAll("*").remove(), w.append("g").attr("class", "axis").attr("transform", `translate(0,${f})`).call(jn(b).ticks(6)), w.append("g").attr("class", "axis").call(Kn(y).ticks(6)), a && w.append("text").attr("class", "axis-label").attr("x", h / 2).attr("y", f + 38).attr("text-anchor", "middle").text(a), o && w.append("text").attr("class", "axis-label").attr("x", -f / 2).attr("y", -40).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text(o);
    const $ = this._svg.select(".points-group").attr("transform", `translate(${gt.left},${gt.top})`), A = this._svg.select(".tooltip-group").attr("transform", `translate(${gt.left},${gt.top})`);
    A.selectAll("*").remove();
    const k = A.append("g").attr("class", "tooltip-box");
    k.append("rect").attr("class", "tooltip-bg"), k.append("text").attr("class", "tooltip-text");
    const C = $.selectAll(".point").data(r, (P, z) => String(z));
    C.exit().remove();
    const T = C.enter().append("circle").attr("class", "point").attr("cx", (P) => b(P.x)).attr("cy", (P) => y(P.y)).attr("r", 5).attr("fill", (P, z) => i && P.cluster != null ? this._clusterColor(P.cluster) : this._getColor(z, P)).attr("opacity", e ? 0 : 1).attr("transform", e ? "scale(0)" : "scale(1)").style("transform-origin", (P) => `${b(P.x)}px ${y(P.y)}px`);
    s ? T.on("mouseenter", (P, z) => {
      var D;
      if (G(P.currentTarget).transition().duration(150).attr("r", 6.5).attr("opacity", 1), z.label) {
        const B = b(z.x), F = y(z.y) - 14;
        k.classed("visible", !0), k.select(".tooltip-text").attr("x", B).attr("y", F).text(z.label);
        const tt = k.select(".tooltip-text").node(), it = ((D = tt == null ? void 0 : tt.getComputedTextLength) == null ? void 0 : D.call(tt)) || 40;
        k.select(".tooltip-bg").attr("x", B - it / 2 - 6).attr("y", F - 10).attr("width", it + 12).attr("height", 20);
      }
    }).on("mouseleave", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 5).attr("opacity", 0.85), k.classed("visible", !1);
    }) : T.on("mouseenter", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 6.5);
    }).on("mouseleave", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 5);
    });
    const S = T.merge(C);
    if (e ? S.each(function(P, z) {
      G(this).transition().delay(z * 30).duration(400).ease(gd).attr("opacity", 0.85).attr("transform", "scale(1)");
    }) : S.attr("cx", (P) => b(P.x)).attr("cy", (P) => y(P.y)).attr("opacity", 0.85).attr("transform", "scale(1)").attr("fill", (P, z) => i && P.cluster != null ? this._clusterColor(P.cluster) : this._getColor(z, P)), this.hasAttribute("labels") || this.hasAttribute("tooltip")) {
      const P = this._svg.select(".points-group");
      P.selectAll(".point-label").remove(), r.forEach((z, L) => {
        if (!z.label) return;
        const D = P.append("text").attr("class", "point-label").attr("x", b(z.x) + 8).attr("y", y(z.y) + 4).attr("fill", "var(--lv-text, #e4e4ec)").attr("font-size", "11px").attr("opacity", e ? 0 : 0.9).text(z.label);
        e && D.transition().delay(L * 30 + 200).duration(300).attr("opacity", 0.9);
      });
    }
    const E = this._svg.select(".legend-group");
    if (E.selectAll("*").remove(), c.length > 0) {
      const P = Fr + 5;
      let z = gt.left;
      for (const L of c) {
        const D = this._clusterColor(L);
        E.append("circle").attr("cx", z + 5).attr("cy", P + 8).attr("r", 4).attr("fill", D), E.append("text").attr("class", "legend-text").attr("x", z + 14).attr("y", P + 8).attr("dominant-baseline", "central").text(String(L)), z += 14 + String(L).length * 7 + 20;
      }
    }
  }
}
customElements.define("lv-scatter", Zp);
const Qp = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Jp = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .arc { cursor: pointer; transition: opacity 0.2s; }
  .arc:hover { opacity: 0.9; }
  .arc-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 11px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }
  .hover-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 13px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .hover-label.visible { opacity: 1; }
  .legend-text { fill: var(--lv-text-dim, #888); font-size: 12px; }
  .legend-swatch { rx: 5; }
`, Ge = 300, t0 = 130, Js = 26, ta = 16;
class e0 extends I {
  constructor() {
    super(...arguments);
    O(this, "_data", []);
    O(this, "_hasAnimated", !1);
    O(this, "_svg", null);
    O(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "donut", "legend"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Jp), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  attributeChangedCallback(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || Qp[e % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = G(e), this._svg.append("g").attr("class", "arcs-group"), this._svg.append("g").attr("class", "labels-group"), this._svg.append("g").attr("class", "hover-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("donut"), s = this.hasAttribute("legend"), a = t0, o = i ? a * 0.6 : 0, c = a + 5, l = s ? r.length : 0, u = l > 0 ? ta + l * Js : 0, h = Ge + u;
    this._svg.attr("viewBox", `0 0 ${Ge} ${h}`);
    const f = Ge / 2, d = Ge / 2, p = zp().value((A) => A.value).sort(null).padAngle(0.015)(r), v = Xs().innerRadius(o).outerRadius(a), b = Xs().innerRadius(o).outerRadius(c), y = this._svg.select(".arcs-group").attr("transform", `translate(${f},${d})`);
    y.selectAll("*").remove();
    const x = this._svg.select(".hover-group").attr("transform", `translate(${f},${d})`);
    x.selectAll("*").remove();
    const g = x.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 0), m = x.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 18).style("font-size", "11px").style("font-weight", "400");
    for (let A = 0; A < p.length; A++) {
      const k = p[A], C = this._getColor(A, k.data), T = y.append("path").attr("class", "arc").attr("fill", C).attr("stroke", "var(--lv-bg, #0f0f23)").attr("stroke-width", 1.5);
      if (e) {
        const S = { ...k, endAngle: k.startAngle };
        T.attr("d", v(S)).transition().delay(A * 120).duration(800).ease(_t).attrTween("d", () => {
          const M = xe(S, k);
          return (E) => v(M(E));
        });
      } else
        T.attr("d", v(k));
      T.on("mouseenter", () => {
        if (T.transition().duration(150).attr("d", b(k)), i)
          g.text(k.data.label).classed("visible", !0), m.text(String(k.data.value)).classed("visible", !0);
        else {
          const [S, M] = v.centroid(k);
          g.attr("x", S * 1.6).attr("y", M * 1.6 - 8).text(k.data.label).classed("visible", !0), m.attr("x", S * 1.6).attr("y", M * 1.6 + 8).text(String(k.data.value)).classed("visible", !0);
        }
      }).on("mouseleave", () => {
        T.transition().duration(150).attr("d", v(k)), g.classed("visible", !1), m.classed("visible", !1);
      });
    }
    const w = this._svg.select(".labels-group").attr("transform", `translate(${f},${d})`);
    if (w.selectAll("*").remove(), !s)
      for (let A = 0; A < p.length; A++) {
        const k = p[A];
        if (k.endAngle - k.startAngle > 0.35) {
          const [T, S] = v.centroid(k), M = w.append("text").attr("class", "arc-label").attr("x", T).attr("y", S).text(k.data.label);
          e && M.attr("opacity", 0).transition().delay(A * 120 + 600).duration(300).attr("opacity", 1);
        }
      }
    const $ = this._svg.select(".legend-group");
    if ($.selectAll("*").remove(), s && r.length > 0) {
      const A = Ge + ta;
      for (let k = 0; k < r.length; k++) {
        const T = A + k * Js, S = this._getColor(k, r[k]);
        $.append("rect").attr("class", "legend-swatch").attr("x", 20).attr("y", T - 5).attr("width", 10).attr("height", 10).attr("fill", S), $.append("text").attr("class", "legend-text").attr("x", 38).attr("y", T).attr("dominant-baseline", "central").text(`${r[k].label} (${r[k].value})`);
      }
    }
  }
}
customElements.define("lv-pie", e0);
const n0 = `
  :host {
    display: block;
    margin-block: 1em;
    overflow-x: auto;
  }

  svg {
    display: block;
  }

  /* Step card entrance */
  .step-group {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s ease-out, transform 0.35s ease-out;
  }
  :host(.lv-entered) .step-group {
    opacity: 1;
    transform: translateY(0);
  }

  /* Arrow draw-in */
  .arrow-path {
    transition: stroke-dashoffset 0.5s ease-out;
  }
  :host(.lv-entered) .arrow-path {
    stroke-dashoffset: 0 !important;
  }
`, st = 120, Tt = 90, qr = 60, Hr = 40, ea = 10, na = 2, ra = 8, We = 60;
function Br(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class r0 extends I {
  constructor() {
    super(...arguments);
    O(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(n0), this._readChildren(), this._renderSvg();
  }
  /** Read <lv-flow-step> children and extract attributes */
  _readChildren() {
    this._steps = [], this.querySelectorAll("lv-flow-step").forEach((r) => {
      this._steps.push({
        icon: r.getAttribute("icon") || "",
        label: r.getAttribute("label") || "",
        sub: r.getAttribute("sub") || "",
        color: r.getAttribute("color") || "var(--lv-accent, #6366f1)",
        active: r.hasAttribute("active")
      });
    });
  }
  /** Build the full SVG and inject into shadow DOM */
  _renderSvg() {
    const e = this._steps;
    if (e.length === 0) return;
    const i = (this.getAttribute("direction") || "horizontal") === "horizontal", s = this.hasAttribute("cyclic"), a = this.isRtl, o = 24, c = s ? We + 40 : 0;
    let l, u;
    i ? (l = o * 2 + e.length * st + (e.length - 1) * qr, u = o * 2 + Tt + c) : (l = o * 2 + st + c, u = o * 2 + e.length * Tt + (e.length - 1) * Hr);
    const h = [];
    for (let x = 0; x < e.length; x++)
      if (i) {
        let g = o + x * (st + qr);
        a && (g = l - o - st - x * (st + qr)), h.push({ x: g, y: o });
      } else
        h.push({ x: o, y: o + x * (Tt + Hr) });
    const f = "arrowhead", d = ra, _ = ra, p = `
      <defs>
        <marker id="${f}" markerWidth="${d}" markerHeight="${_}"
                refX="${d}" refY="${_ / 2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${d},${_ / 2} L0,${_} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;
    let v = "";
    for (let x = 0; x < e.length; x++) {
      const g = e[x], m = h[x], w = g.active ? g.color : "var(--lv-border, #333)", $ = g.active ? ' filter="url(#glow)"' : "";
      v += `
        <g class="step-group" style="transition-delay: ${x * 150}ms">
          <rect x="${m.x}" y="${m.y}" width="${st}" height="${Tt}"
                rx="${ea}" ry="${ea}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${w}" stroke-width="${g.active ? 2.5 : 1.5}"
                ${$} />
          <text x="${m.x + st / 2}" y="${m.y + 30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${Br(g.icon)}
          </text>
          <text x="${m.x + st / 2}" y="${m.y + 54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${Br(g.label)}
          </text>
          <text x="${m.x + st / 2}" y="${m.y + 70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${Br(g.sub)}
          </text>
        </g>`;
    }
    let b = "";
    for (let x = 0; x < e.length - 1; x++) {
      const g = h[x], m = h[x + 1], w = e.length * 150 + x * 120;
      let $;
      if (i) {
        const k = a ? g.x : g.x + st, C = a ? m.x + st : m.x, T = g.y + Tt / 2, M = Math.abs(C - k) * 0.35, E = C > k ? 1 : -1;
        $ = `M${k},${T} C${k + E * M},${T} ${C - E * M},${T} ${C},${T}`;
      } else {
        const k = g.x + st / 2, C = g.y + Tt, T = m.y, S = (T - C) * 0.4;
        $ = `M${k},${C} C${k},${C + S} ${k},${T - S} ${k},${T}`;
      }
      const A = i ? Math.abs(h[x + 1].x - h[x].x) + 20 : Hr + Tt;
      b += `
        <path class="arrow-path" d="${$}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${na}"
              marker-end="url(#${f})"
              stroke-dasharray="${A}"
              stroke-dashoffset="${A}"
              style="transition-delay: ${w}ms" />`;
    }
    if (s && e.length > 1) {
      const x = h[0], g = h[e.length - 1], m = e.length * 150 + (e.length - 1) * 120;
      let w, $;
      if (i) {
        const A = g.x + st / 2, k = x.x + st / 2, C = g.y + Tt, T = x.y + Tt, S = Math.max(C, T) + We;
        w = `M${A},${C} C${A},${S} ${k},${S} ${k},${T}`, $ = Math.abs(A - k) + We * 2;
      } else {
        const A = g.x + st, k = g.y + Tt / 2, C = x.y + Tt / 2, T = A + We;
        w = `M${A},${k} C${T},${k} ${T},${C} ${A},${C}`, $ = Math.abs(k - C) + We * 2;
      }
      b += `
        <path class="arrow-path" d="${w}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${na}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${m}ms" />`;
    }
    const y = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${b}
        ${v}
      </svg>`;
    this.render(y);
  }
  animateIn(e) {
    e && (this.root.querySelectorAll(".step-group").forEach((r) => {
      r.style.transition = "none", r.style.opacity = "1", r.style.transform = "translateY(0)";
    }), this.root.querySelectorAll(".arrow-path").forEach((r) => {
      r.style.transition = "none", r.style.strokeDashoffset = "0";
    })), this.classList.add("lv-entered");
  }
}
class i0 extends HTMLElement {
}
customElements.define("lv-flow", r0);
customElements.define("lv-flow-step", i0);
const s0 = `
  :host {
    display: block;
    margin-block: 1em;
  }

  .timeline {
    position: relative;
    padding-inline-start: 36px;
  }

  /* Vertical line */
  .timeline::before {
    content: '';
    position: absolute;
    inset-inline-start: 6px;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 2px;
    background: linear-gradient(
      to bottom,
      var(--lv-accent2, #a78bfa),
      var(--lv-accent, #6366f1)
    );
  }

  .tl-item {
    position: relative;
    padding-block-end: 24px;
    opacity: 0;
    transform: translateX(-16px);
    animation: tl-slide-in 0.4s ease-out forwards;
    animation-play-state: paused;
  }

  :host(.lv-entered) .tl-item {
    animation-play-state: running;
  }

  /* RTL: slide from opposite direction */
  :host([dir='rtl']) .tl-item,
  :host-context([dir='rtl']) .tl-item {
    transform: translateX(16px);
  }

  @keyframes tl-slide-in {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Dot on the line */
  .tl-dot {
    position: absolute;
    inset-inline-start: -36px;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 3px solid var(--lv-bg-card, #1e1e2e);
    background: var(--_dot-color, var(--lv-accent, #6366f1));
    box-sizing: border-box;
    /* center on the 3px line: line starts at inset-inline-start 6px, center = 7.5px
       dot is 14px wide, so offset = 7.5 - 7 = 0.5px from line start
       from item padding-inline-start 36px: -(36 - 0.5) = -35.5 ~ -36 + 0.5 */
    margin-inline-start: 0.5px;
  }

  /* Content card */
  .tl-card {
    background: var(--lv-bg-card, #1e1e2e);
    border-radius: 12px;
    padding: 16px;
  }

  .tl-date {
    font-family: ui-monospace, 'SFMono-Regular', 'Cascadia Code', monospace;
    font-size: 0.75em;
    color: var(--lv-accent, #6366f1);
    margin-block-end: 4px;
  }

  .tl-title {
    font-weight: 700;
    font-size: 0.95em;
    color: var(--lv-text, #e0e0e0);
    margin-block-end: 4px;
  }

  .tl-body {
    font-size: 0.88em;
    line-height: 1.5;
    color: var(--lv-text-dim, #888);
  }
`;
function ia(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class a0 extends I {
  constructor() {
    super(...arguments);
    O(this, "_items", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(s0), this._readChildren(), this._renderTimeline();
  }
  _readChildren() {
    this._items = [], this.querySelectorAll("lv-timeline-item").forEach((r) => {
      this._items.push({
        date: r.getAttribute("date") || "",
        title: r.getAttribute("title") || "",
        color: r.getAttribute("color") || "var(--lv-accent, #6366f1)",
        body: r.innerHTML.trim()
      });
    });
  }
  _renderTimeline() {
    if (this._items.length === 0) return;
    let e = "";
    for (let r = 0; r < this._items.length; r++) {
      const i = this._items[r];
      e += `
        <div class="tl-item" style="animation-delay: ${r * 100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date ? `<div class="tl-date">${ia(i.date)}</div>` : ""}
            ${i.title ? `<div class="tl-title">${ia(i.title)}</div>` : ""}
            ${i.body ? `<div class="tl-body">${i.body}</div>` : ""}
          </div>
        </div>`;
    }
    this.render(`<div class="timeline">${e}</div>`);
  }
  animateIn(e) {
    e && this.root.querySelectorAll(".tl-item").forEach((r) => {
      r.style.animation = "none", r.style.opacity = "1", r.style.transform = "translateX(0)";
    }), this.classList.add("lv-entered");
  }
}
class o0 extends HTMLElement {
}
customElements.define("lv-timeline", a0);
customElements.define("lv-timeline-item", o0);
function Bt(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function mo(n, t) {
  n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.__proto__ = t;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var yt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, De = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Yi, J, V, $t = 1e8, H = 1 / $t, di = Math.PI * 2, l0 = di / 4, c0 = 0, vo = Math.sqrt, u0 = Math.cos, h0 = Math.sin, Z = function(t) {
  return typeof t == "string";
}, U = function(t) {
  return typeof t == "function";
}, Gt = function(t) {
  return typeof t == "number";
}, Gi = function(t) {
  return typeof t > "u";
}, It = function(t) {
  return typeof t == "object";
}, ct = function(t) {
  return t !== !1;
}, Wi = function() {
  return typeof window < "u";
}, Ln = function(t) {
  return U(t) || Z(t);
}, xo = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, rt = Array.isArray, f0 = /random\([^)]+\)/g, d0 = /,\s*/g, sa = /(?:-?\.?\d|\.)+/gi, bo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ce = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Vr = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, yo = /[+-]=-?[.\d]+/, p0 = /[^,'"\[\]\s]+/gi, g0 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Y, Ot, pi, Ui, kt = {}, hr = {}, wo, ko = function(t) {
  return (hr = Ie(t, kt)) && dt;
}, ji = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, pn = function(t, e) {
  return !e && console.warn(t);
}, Ao = function(t, e) {
  return t && (kt[t] = e) && hr && (hr[t] = e) || kt;
}, gn = function() {
  return 0;
}, _0 = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Vn = {
  suppressEvents: !0,
  kill: !1
}, m0 = {
  suppressEvents: !0
}, Ki = {}, Qt = [], gi = {}, Co, mt = {}, Xr = {}, aa = 30, Xn = [], Zi = "", Qi = function(t) {
  var e = t[0], r, i;
  if (It(e) || U(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (i = Xn.length; i-- && !Xn[i].targetTest(e); )
      ;
    r = Xn[i];
  }
  for (i = t.length; i--; )
    t[i] && (t[i]._gsap || (t[i]._gsap = new jo(t[i], r))) || t.splice(i, 1);
  return t;
}, pe = function(t) {
  return t._gsap || Qi(St(t))[0]._gsap;
}, $o = function(t, e, r) {
  return (r = t[e]) && U(r) ? t[e]() : Gi(r) && t.getAttribute && t.getAttribute(e) || r;
}, ut = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, j = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, X = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Me = function(t, e) {
  var r = e.charAt(0), i = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i;
}, v0 = function(t, e) {
  for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, fr = function() {
  var t = Qt.length, e = Qt.slice(0), r, i;
  for (gi = {}, Qt.length = 0, r = 0; r < t; r++)
    i = e[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Ji = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, So = function(t, e, r, i) {
  Qt.length && !J && fr(), t.render(e, r, !!(J && e < 0 && Ji(t))), Qt.length && !J && fr();
}, To = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(p0).length < 2 ? e : Z(t) ? t.trim() : t;
}, Mo = function(t) {
  return t;
}, At = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, x0 = function(t) {
  return function(e, r) {
    for (var i in r)
      i in e || i === "duration" && t || i === "ease" || (e[i] = r[i]);
  };
}, Ie = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, oa = function n(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = It(e[r]) ? n(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, dr = function(t, e) {
  var r = {}, i;
  for (i in t)
    i in e || (r[i] = t[i]);
  return r;
}, sn = function(t) {
  var e = t.parent || Y, r = t.keyframes ? x0(rt(t.keyframes)) : At;
  if (ct(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, b0 = function(t, e) {
  for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, Eo = function(t, e, r, i, s) {
  var a = t[i], o;
  if (s)
    for (o = e[s]; a && a[s] > o; )
      a = a._prev;
  return a ? (e._next = a._next, a._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = a, e.parent = e._dp = t, e;
}, wr = function(t, e, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = e._prev, a = e._next;
  s ? s._next = a : t[r] === e && (t[r] = a), a ? a._prev = s : t[i] === e && (t[i] = s), e._next = e._prev = e.parent = null;
}, ee = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, ge = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, y0 = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, _i = function(t, e, r, i) {
  return t._startAt && (J ? t._startAt.revert(Vn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i));
}, w0 = function n(t) {
  return !t || t._ts && n(t.parent);
}, la = function(t) {
  return t._repeat ? Fe(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Fe = function(t, e) {
  var r = Math.floor(t = X(t / e));
  return t && r === t ? r - 1 : r;
}, pr = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, kr = function(t) {
  return t._end = X(t._start + (t._tDur / Math.abs(t._ts || t._rts || H) || 0));
}, Ar = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = X(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), kr(t), r._dirty || ge(r, t)), t;
}, Po = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = pr(t.rawTime(), e), (!e._dur || An(0, e.totalDuration(), r) - e._tTime > H) && e.render(r, !0)), ge(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -H;
  }
}, Lt = function(t, e, r, i) {
  return e.parent && ee(e), e._start = X((Gt(r) ? r : r || t !== Y ? Ct(t, r, e) : t._time) + e._delay), e._end = X(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Eo(t, e, "_first", "_last", t._sort ? "_start" : 0), mi(e) || (t._recent = e), i || Po(t, e), t._ts < 0 && Ar(t, t._tTime), t;
}, zo = function(t, e) {
  return (kt.ScrollTrigger || ji("scrollTrigger", e)) && kt.ScrollTrigger.create(e, t);
}, Oo = function(t, e, r, i, s) {
  if (es(t, e, s), !t._initted)
    return 1;
  if (!r && t._pt && !J && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Co !== vt.frame)
    return Qt.push(t), t._lazy = [s, i], 1;
}, k0 = function n(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || n(e));
}, mi = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, A0 = function(t, e, r, i) {
  var s = t.ratio, a = e < 0 || !e && (!t._start && k0(t) && !(!t._initted && mi(t)) || (t._ts < 0 || t._dp._ts < 0) && !mi(t)) ? 0 : 1, o = t._rDelay, c = 0, l, u, h;
  if (o && t._repeat && (c = An(0, t._tDur, e), u = Fe(c, o), t._yoyo && u & 1 && (a = 1 - a), u !== Fe(t._tTime, o) && (s = 1 - a, t.vars.repeatRefresh && t._initted && t.invalidate())), a !== s || J || i || t._zTime === H || !e && t._zTime) {
    if (!t._initted && Oo(t, e, i, r, c))
      return;
    for (h = t._zTime, t._zTime = e || (r ? H : 0), r || (r = e && !h), t.ratio = a, t._from && (a = 1 - a), t._time = 0, t._tTime = c, l = t._pt; l; )
      l.r(a, l.d), l = l._next;
    e < 0 && _i(t, e, r, !0), t._onUpdate && !r && xt(t, "onUpdate"), c && t._repeat && !r && t.parent && xt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === a && (a && ee(t, 1), !r && !J && (xt(t, a ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, C0 = function(t, e, r) {
  var i;
  if (r > e)
    for (i = t._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > e)
        return i;
      i = i._next;
    }
  else
    for (i = t._last; i && i._start >= r; ) {
      if (i.data === "isPause" && i._start < e)
        return i;
      i = i._prev;
    }
}, qe = function(t, e, r, i) {
  var s = t._repeat, a = X(e) || 0, o = t._tTime / t._tDur;
  return o && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = s ? s < 0 ? 1e10 : X(a * (s + 1) + t._rDelay * s) : a, o > 0 && !i && Ar(t, t._tTime = t._tDur * o), t.parent && kr(t), r || ge(t.parent, t), t;
}, ca = function(t) {
  return t instanceof at ? ge(t) : qe(t, t._dur);
}, $0 = {
  _start: 0,
  endTime: gn,
  totalDuration: gn
}, Ct = function n(t, e, r) {
  var i = t.labels, s = t._recent || $0, a = t.duration() >= $t ? s.endTime(!1) : t._dur, o, c, l;
  return Z(e) && (isNaN(e) || e in i) ? (c = e.charAt(0), l = e.substr(-1) === "%", o = e.indexOf("="), c === "<" || c === ">" ? (o >= 0 && (e = e.replace(/=/, "")), (c === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (o < 0 ? s : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = a), i[e]) : (c = parseFloat(e.charAt(o - 1) + e.substr(o + 1)), l && r && (c = c / 100 * (rt(r) ? r[0] : r).totalDuration()), o > 1 ? n(t, e.substr(0, o - 1), r) + c : a + c)) : e == null ? a : +e;
}, an = function(t, e, r) {
  var i = Gt(e[1]), s = (i ? 2 : 1) + (t < 2 ? 0 : 1), a = e[s], o, c;
  if (i && (a.duration = e[1]), a.parent = r, t) {
    for (o = a, c = r; c && !("immediateRender" in o); )
      o = c.vars.defaults || {}, c = ct(c.vars.inherit) && c.parent;
    a.immediateRender = ct(o.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[s - 1];
  }
  return new K(e[0], a, e[s + 1]);
}, ie = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, An = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, nt = function(t, e) {
  return !Z(t) || !(e = g0.exec(t)) ? "" : e[1];
}, S0 = function(t, e, r) {
  return ie(r, function(i) {
    return An(t, e, i);
  });
}, vi = [].slice, Lo = function(t, e) {
  return t && It(t) && "length" in t && (!e && !t.length || t.length - 1 in t && It(t[0])) && !t.nodeType && t !== Ot;
}, T0 = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(i) {
    var s;
    return Z(i) && !e || Lo(i, 1) ? (s = r).push.apply(s, St(i)) : r.push(i);
  }) || r;
}, St = function(t, e, r) {
  return V && !e && V.selector ? V.selector(t) : Z(t) && !r && (pi || !He()) ? vi.call((e || Ui).querySelectorAll(t), 0) : rt(t) ? T0(t, r) : Lo(t) ? vi.call(t, 0) : t ? [t] : [];
}, xi = function(t) {
  return t = St(t)[0] || pn("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return St(e, r.querySelectorAll ? r : r === t ? pn("Invalid scope") || Ui.createElement("div") : t);
  };
}, No = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Ro = function(t) {
  if (U(t))
    return t;
  var e = It(t) ? t : {
    each: t
  }, r = _e(e.ease), i = e.from || 0, s = parseFloat(e.base) || 0, a = {}, o = i > 0 && i < 1, c = isNaN(i) || o, l = e.axis, u = i, h = i;
  return Z(i) ? u = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && c && (u = i[0], h = i[1]), function(f, d, _) {
    var p = (_ || e).length, v = a[p], b, y, x, g, m, w, $, A, k;
    if (!v) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, $t])[1], !k) {
        for ($ = -$t; $ < ($ = _[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (v = a[p] = [], b = c ? Math.min(k, p) * u - 0.5 : i % k, y = k === $t ? 0 : c ? p * h / k - 0.5 : i / k | 0, $ = 0, A = $t, w = 0; w < p; w++)
        x = w % k - b, g = y - (w / k | 0), v[w] = m = l ? Math.abs(l === "y" ? g : x) : vo(x * x + g * g), m > $ && ($ = m), m < A && (A = m);
      i === "random" && No(v), v.max = $ - A, v.min = A, v.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : l ? l === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (i === "edges" ? -1 : 1), v.b = p < 0 ? s - p : s, v.u = nt(e.amount || e.each) || 0, r = r && p < 0 ? Go(r) : r;
    }
    return p = (v[f] - v.min) / v.max || 0, X(v.b + (r ? r(p) : p) * v.v) + v.u;
  };
}, bi = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var i = X(Math.round(parseFloat(r) / t) * t * e);
    return (i - i % 1) / e + (Gt(r) ? 0 : nt(r));
  };
}, Do = function(t, e) {
  var r = rt(t), i, s;
  return !r && It(t) && (i = r = t.radius || $t, t.values ? (t = St(t.values), (s = !Gt(t[0])) && (i *= i)) : t = bi(t.increment)), ie(e, r ? U(t) ? function(a) {
    return s = t(a), Math.abs(s - a) <= i ? s : a;
  } : function(a) {
    for (var o = parseFloat(s ? a.x : a), c = parseFloat(s ? a.y : 0), l = $t, u = 0, h = t.length, f, d; h--; )
      s ? (f = t[h].x - o, d = t[h].y - c, f = f * f + d * d) : f = Math.abs(t[h] - o), f < l && (l = f, u = h);
    return u = !i || l <= i ? t[u] : a, s || u === a || Gt(a) ? u : u + nt(a);
  } : bi(t));
}, Io = function(t, e, r, i) {
  return ie(rt(t) ? !e : r === !0 ? !!(r = 0) : !i, function() {
    return rt(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i;
  });
}, M0 = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(i) {
    return e.reduce(function(s, a) {
      return a(s);
    }, i);
  };
}, E0 = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || nt(r));
  };
}, P0 = function(t, e, r) {
  return qo(t, e, 0, 1, r);
}, Fo = function(t, e, r) {
  return ie(r, function(i) {
    return t[~~e(i)];
  });
}, z0 = function n(t, e, r) {
  var i = e - t;
  return rt(t) ? Fo(t, n(0, t.length), e) : ie(r, function(s) {
    return (i + (s - t) % i) % i + t;
  });
}, O0 = function n(t, e, r) {
  var i = e - t, s = i * 2;
  return rt(t) ? Fo(t, n(0, t.length - 1), e) : ie(r, function(a) {
    return a = (s + (a - t) % s) % s || 0, t + (a > i ? s - a : a);
  });
}, _n = function(t) {
  return t.replace(f0, function(e) {
    var r = e.indexOf("[") + 1, i = e.substring(r || 7, r ? e.indexOf("]") : e.length - 1).split(d0);
    return Io(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
  });
}, qo = function(t, e, r, i, s) {
  var a = e - t, o = i - r;
  return ie(s, function(c) {
    return r + ((c - t) / a * o || 0);
  });
}, L0 = function n(t, e, r, i) {
  var s = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!s) {
    var a = Z(t), o = {}, c, l, u, h, f;
    if (r === !0 && (i = 1) && (r = null), a)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (rt(t) && !rt(e)) {
      for (u = [], h = t.length, f = h - 2, l = 1; l < h; l++)
        u.push(n(t[l - 1], t[l]));
      h--, s = function(_) {
        _ *= h;
        var p = Math.min(f, ~~_);
        return u[p](_ - p);
      }, r = e;
    } else i || (t = Ie(rt(t) ? [] : {}, t));
    if (!u) {
      for (c in e)
        ts.call(o, t, c, "get", e[c]);
      s = function(_) {
        return is(_, o) || (a ? t.p : t);
      };
    }
  }
  return ie(r, s);
}, ua = function(t, e, r) {
  var i = t.labels, s = $t, a, o, c;
  for (a in i)
    o = i[a] - e, o < 0 == !!r && o && s > (o = Math.abs(o)) && (c = a, s = o);
  return c;
}, xt = function(t, e, r) {
  var i = t.vars, s = i[e], a = V, o = t._ctx, c, l, u;
  if (s)
    return c = i[e + "Params"], l = i.callbackScope || t, r && Qt.length && fr(), o && (V = o), u = c ? s.apply(l, c) : s.call(l), V = a, u;
}, en = function(t) {
  return ee(t), t.scrollTrigger && t.scrollTrigger.kill(!!J), t.progress() < 1 && xt(t, "onInterrupt"), t;
}, $e, Ho = [], Bo = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Wi() || t.headless) {
      var e = t.name, r = U(t), i = e && !r && t.init ? function() {
        this._props = [];
      } : t, s = {
        init: gn,
        render: is,
        add: ts,
        kill: K0,
        modifier: j0,
        rawVars: 0
      }, a = {
        targetTest: 0,
        get: 0,
        getSetter: rs,
        aliases: {},
        register: 0
      };
      if (He(), t !== i) {
        if (mt[e])
          return;
        At(i, At(dr(t, s), a)), Ie(i.prototype, Ie(s, dr(t, a))), mt[i.prop = e] = i, t.targetTest && (Xn.push(i), Ki[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Ao(e, i), t.register && t.register(dt, i, ht);
    } else
      Ho.push(t);
}, q = 255, nn = {
  aqua: [0, q, q],
  lime: [0, q, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, q],
  navy: [0, 0, 128],
  white: [q, q, q],
  olive: [128, 128, 0],
  yellow: [q, q, 0],
  orange: [q, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [q, 0, 0],
  pink: [q, 192, 203],
  cyan: [0, q, q],
  transparent: [q, q, q, 0]
}, Yr = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * q + 0.5 | 0;
}, Vo = function(t, e, r) {
  var i = t ? Gt(t) ? [t >> 16, t >> 8 & q, t & q] : 0 : nn.black, s, a, o, c, l, u, h, f, d, _;
  if (!i) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), nn[t])
      i = nn[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (s = t.charAt(1), a = t.charAt(2), o = t.charAt(3), t = "#" + s + s + a + a + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & q, i & q, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & q, t & q];
    } else if (t.substr(0, 3) === "hsl") {
      if (i = _ = t.match(sa), !e)
        c = +i[0] % 360 / 360, l = +i[1] / 100, u = +i[2] / 100, a = u <= 0.5 ? u * (l + 1) : u + l - u * l, s = u * 2 - a, i.length > 3 && (i[3] *= 1), i[0] = Yr(c + 1 / 3, s, a), i[1] = Yr(c, s, a), i[2] = Yr(c - 1 / 3, s, a);
      else if (~t.indexOf("="))
        return i = t.match(bo), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = t.match(sa) || nn.transparent;
    i = i.map(Number);
  }
  return e && !_ && (s = i[0] / q, a = i[1] / q, o = i[2] / q, h = Math.max(s, a, o), f = Math.min(s, a, o), u = (h + f) / 2, h === f ? c = l = 0 : (d = h - f, l = u > 0.5 ? d / (2 - h - f) : d / (h + f), c = h === s ? (a - o) / d + (a < o ? 6 : 0) : h === a ? (o - s) / d + 2 : (s - a) / d + 4, c *= 60), i[0] = ~~(c + 0.5), i[1] = ~~(l * 100 + 0.5), i[2] = ~~(u * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, Xo = function(t) {
  var e = [], r = [], i = -1;
  return t.split(Jt).forEach(function(s) {
    var a = s.match(Ce) || [];
    e.push.apply(e, a), r.push(i += a.length + 1);
  }), e.c = r, e;
}, ha = function(t, e, r) {
  var i = "", s = (t + i).match(Jt), a = e ? "hsla(" : "rgba(", o = 0, c, l, u, h;
  if (!s)
    return t;
  if (s = s.map(function(f) {
    return (f = Vo(f, e, 1)) && a + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), r && (u = Xo(t), c = r.c, c.join(i) !== u.c.join(i)))
    for (l = t.replace(Jt, "1").split(Ce), h = l.length - 1; o < h; o++)
      i += l[o] + (~c.indexOf(o) ? s.shift() || a + "0,0,0,0)" : (u.length ? u : s.length ? s : r).shift());
  if (!l)
    for (l = t.split(Jt), h = l.length - 1; o < h; o++)
      i += l[o] + s[o];
  return i + l[h];
}, Jt = (function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in nn)
    n += "|" + t + "\\b";
  return new RegExp(n + ")", "gi");
})(), N0 = /hsl[a]?\(/, Yo = function(t) {
  var e = t.join(" "), r;
  if (Jt.lastIndex = 0, Jt.test(e))
    return r = N0.test(e), t[1] = ha(t[1], r), t[0] = ha(t[0], r, Xo(t[1])), !0;
}, mn, vt = (function() {
  var n = Date.now, t = 500, e = 33, r = n(), i = r, s = 1e3 / 240, a = s, o = [], c, l, u, h, f, d, _ = function p(v) {
    var b = n() - i, y = v === !0, x, g, m, w;
    if ((b > t || b < 0) && (r += b - e), i += b, m = i - r, x = m - a, (x > 0 || y) && (w = ++h.frame, f = m - h.time * 1e3, h.time = m = m / 1e3, a += x + (x >= s ? 4 : s - x), g = 1), y || (c = l(p)), g)
      for (d = 0; d < o.length; d++)
        o[d](m, f, w, v);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      _(!0);
    },
    deltaRatio: function(v) {
      return f / (1e3 / (v || 60));
    },
    wake: function() {
      wo && (!pi && Wi() && (Ot = pi = window, Ui = Ot.document || {}, kt.gsap = dt, (Ot.gsapVersions || (Ot.gsapVersions = [])).push(dt.version), ko(hr || Ot.GreenSockGlobals || !Ot.gsap && Ot || {}), Ho.forEach(Bo)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && h.sleep(), l = u || function(v) {
        return setTimeout(v, a - h.time * 1e3 + 1 | 0);
      }, mn = 1, _(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(c), mn = 0, l = gn;
    },
    lagSmoothing: function(v, b) {
      t = v || 1 / 0, e = Math.min(b || 33, t);
    },
    fps: function(v) {
      s = 1e3 / (v || 240), a = h.time * 1e3 + s;
    },
    add: function(v, b, y) {
      var x = b ? function(g, m, w, $) {
        v(g, m, w, $), h.remove(x);
      } : v;
      return h.remove(v), o[y ? "unshift" : "push"](x), He(), x;
    },
    remove: function(v, b) {
      ~(b = o.indexOf(v)) && o.splice(b, 1) && d >= b && d--;
    },
    _listeners: o
  }, h;
})(), He = function() {
  return !mn && vt.wake();
}, R = {}, R0 = /^[\d.\-M][\d.\-,\s]/, D0 = /["']/g, I0 = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], s = 1, a = r.length, o, c, l; s < a; s++)
    c = r[s], o = s !== a - 1 ? c.lastIndexOf(",") : c.length, l = c.substr(0, o), e[i] = isNaN(l) ? l.replace(D0, "").trim() : +l, i = c.substr(o + 1).trim();
  return e;
}, F0 = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e);
  return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
}, q0 = function(t) {
  var e = (t + "").split("("), r = R[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [I0(e[1])] : F0(t).split(",").map(To)) : R._CE && R0.test(t) ? R._CE("", t) : r;
}, Go = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Wo = function n(t, e) {
  for (var r = t._first, i; r; )
    r instanceof at ? n(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? n(r.timeline, e) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = e)), r = r._next;
}, _e = function(t, e) {
  return t && (U(t) ? t : R[t] || q0(t)) || e;
}, be = function(t, e, r, i) {
  r === void 0 && (r = function(c) {
    return 1 - e(1 - c);
  }), i === void 0 && (i = function(c) {
    return c < 0.5 ? e(c * 2) / 2 : 1 - e((1 - c) * 2) / 2;
  });
  var s = {
    easeIn: e,
    easeOut: r,
    easeInOut: i
  }, a;
  return ut(t, function(o) {
    R[o] = kt[o] = s, R[a = o.toLowerCase()] = r;
    for (var c in s)
      R[a + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = R[o + "." + c] = s[c];
  }), s;
}, Uo = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Gr = function n(t, e, r) {
  var i = e >= 1 ? e : 1, s = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), a = s / di * (Math.asin(1 / i) || 0), o = function(u) {
    return u === 1 ? 1 : i * Math.pow(2, -10 * u) * h0((u - a) * s) + 1;
  }, c = t === "out" ? o : t === "in" ? function(l) {
    return 1 - o(1 - l);
  } : Uo(o);
  return s = di / s, c.config = function(l, u) {
    return n(t, l, u);
  }, c;
}, Wr = function n(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(a) {
    return a ? --a * a * ((e + 1) * a + e) + 1 : 0;
  }, i = t === "out" ? r : t === "in" ? function(s) {
    return 1 - r(1 - s);
  } : Uo(r);
  return i.config = function(s) {
    return n(t, s);
  }, i;
};
ut("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, t) {
  var e = t < 5 ? t + 1 : t;
  be(n + ",Power" + (e - 1), t ? function(r) {
    return Math.pow(r, e);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, e);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2;
  });
});
R.Linear.easeNone = R.none = R.Linear.easeIn;
be("Elastic", Gr("in"), Gr("out"), Gr());
(function(n, t) {
  var e = 1 / t, r = 2 * e, i = 2.5 * e, s = function(o) {
    return o < e ? n * o * o : o < r ? n * Math.pow(o - 1.5 / t, 2) + 0.75 : o < i ? n * (o -= 2.25 / t) * o + 0.9375 : n * Math.pow(o - 2.625 / t, 2) + 0.984375;
  };
  be("Bounce", function(a) {
    return 1 - s(1 - a);
  }, s);
})(7.5625, 2.75);
be("Expo", function(n) {
  return Math.pow(2, 10 * (n - 1)) * n + n * n * n * n * n * n * (1 - n);
});
be("Circ", function(n) {
  return -(vo(1 - n * n) - 1);
});
be("Sine", function(n) {
  return n === 1 ? 1 : -u0(n * l0) + 1;
});
be("Back", Wr("in"), Wr("out"), Wr());
R.SteppedEase = R.steps = kt.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, i = t + (e ? 0 : 1), s = e ? 1 : 0, a = 1 - H;
    return function(o) {
      return ((i * An(0, a, o) | 0) + s) * r;
    };
  }
};
De.ease = R["quad.out"];
ut("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return Zi += n + "," + n + "Params,";
});
var jo = function(t, e) {
  this.id = c0++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : $o, this.set = e ? e.getSetter : rs;
}, vn = /* @__PURE__ */ (function() {
  function n(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, qe(this, +e.duration, 1, 1), this.data = e.data, V && (this._ctx = V, V.data.push(this)), mn || vt.wake();
  }
  var t = n.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, qe(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, i) {
    if (He(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Ar(this, r), !s._dp || s.parent || Po(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Lt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === H || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), So(this, r, i)), this;
  }, t.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + la(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, t.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + la(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? Fe(this._tTime, s) + 1 : 1;
  }, t.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -H ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? pr(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -H ? 0 : this._rts, this.totalTime(An(-Math.abs(this._delay), this.totalDuration(), s), i !== !1), kr(this), y0(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (He(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== H && (this._tTime -= H)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = X(r);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Lt(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (ct(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? pr(i.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = m0);
    var i = J;
    return J = r, Ji(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), J = i, this;
  }, t.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, ca(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, ca(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, t.seek = function(r, i) {
    return this.totalTime(Ct(this, r), ct(i));
  }, t.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, ct(i)), this._dur || (this._zTime = -H), this;
  }, t.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, t.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, t.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -H : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -H, this;
  }, t.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - H);
  }, t.eventCallback = function(r, i, s) {
    var a = this.vars;
    return arguments.length > 1 ? (i ? (a[r] = i, s && (a[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete a[r], this) : a[r];
  }, t.then = function(r) {
    var i = this, s = i._prom;
    return new Promise(function(a) {
      var o = U(r) ? r : Mo, c = function() {
        var u = i.then;
        i.then = null, s && s(), U(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), a(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? c() : i._prom = c;
    });
  }, t.kill = function() {
    en(this);
  }, n;
})();
At(vn.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -H,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var at = /* @__PURE__ */ (function(n) {
  mo(t, n);
  function t(r, i) {
    var s;
    return r === void 0 && (r = {}), s = n.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = ct(r.sortChildren), Y && Lt(r.parent || Y, Bt(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && zo(Bt(s), r.scrollTrigger), s;
  }
  var e = t.prototype;
  return e.to = function(i, s, a) {
    return an(0, arguments, this), this;
  }, e.from = function(i, s, a) {
    return an(1, arguments, this), this;
  }, e.fromTo = function(i, s, a, o) {
    return an(2, arguments, this), this;
  }, e.set = function(i, s, a) {
    return s.duration = 0, s.parent = this, sn(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new K(i, s, Ct(this, a), 1), this;
  }, e.call = function(i, s, a) {
    return Lt(this, K.delayedCall(0, i, s), a);
  }, e.staggerTo = function(i, s, a, o, c, l, u) {
    return a.duration = s, a.stagger = a.stagger || o, a.onComplete = l, a.onCompleteParams = u, a.parent = this, new K(i, a, Ct(this, c)), this;
  }, e.staggerFrom = function(i, s, a, o, c, l, u) {
    return a.runBackwards = 1, sn(a).immediateRender = ct(a.immediateRender), this.staggerTo(i, s, a, o, c, l, u);
  }, e.staggerFromTo = function(i, s, a, o, c, l, u, h) {
    return o.startAt = a, sn(o).immediateRender = ct(o.immediateRender), this.staggerTo(i, s, o, c, l, u, h);
  }, e.render = function(i, s, a) {
    var o = this._time, c = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, u = i <= 0 ? 0 : X(i), h = this._zTime < 0 != i < 0 && (this._initted || !l), f, d, _, p, v, b, y, x, g, m, w, $;
    if (this !== Y && u > c && i >= 0 && (u = c), u !== this._tTime || a || h) {
      if (o !== this._time && l && (u += this._time - o, i += this._time - o), f = u, g = this._start, x = this._ts, b = !x, h && (l || (o = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (w = this._yoyo, v = l + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(v * 100 + i, s, a);
        if (f = X(u % v), u === c ? (p = this._repeat, f = l) : (m = X(u / v), p = ~~m, p && p === m && (f = l, p--), f > l && (f = l)), m = Fe(this._tTime, v), !o && this._tTime && m !== p && this._tTime - m * v - this._dur <= 0 && (m = p), w && p & 1 && (f = l - f, $ = 1), p !== m && !this._lock) {
          var A = w && m & 1, k = A === (w && p & 1);
          if (p < m && (A = !A), o = A ? 0 : u % l ? l : u, this._lock = 1, this.render(o || ($ ? 0 : X(p * v)), s, !l)._lock = 0, this._tTime = u, !s && this.parent && xt(this, "onRepeat"), this.vars.repeatRefresh && !$ && (this.invalidate()._lock = 1, m = p), o && o !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, c = this._tDur, k && (this._lock = 2, o = A ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !$ && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          Wo(this, $);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = C0(this, X(o), X(f)), y && (u -= f - (f = y._start))), this._tTime = u, this._time = f, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && u && l && !s && !m && (xt(this, "onStart"), this._tTime !== u))
        return this;
      if (f >= o && i >= 0)
        for (d = this._first; d; ) {
          if (_ = d._next, (d._act || f >= d._start) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (f - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (f - d._start) * d._ts, s, a), f !== this._time || !this._ts && !b) {
              y = 0, _ && (u += this._zTime = -H);
              break;
            }
          }
          d = _;
        }
      else {
        d = this._last;
        for (var C = i < 0 ? i : f; d; ) {
          if (_ = d._prev, (d._act || C <= d._end) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (C - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (C - d._start) * d._ts, s, a || J && Ji(d)), f !== this._time || !this._ts && !b) {
              y = 0, _ && (u += this._zTime = C ? -H : H);
              break;
            }
          }
          d = _;
        }
      }
      if (y && !s && (this.pause(), y.render(f >= o ? 0 : -H)._zTime = f >= o ? 1 : -1, this._ts))
        return this._start = g, kr(this), this.render(i, s, a);
      this._onUpdate && !s && xt(this, "onUpdate", !0), (u === c && this._tTime >= this.totalDuration() || !u && o) && (g === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (u === c && this._ts > 0 || !u && this._ts < 0) && ee(this, 1), !s && !(i < 0 && !o) && (u || o || !c) && (xt(this, u === c && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(i, s) {
    var a = this;
    if (Gt(s) || (s = Ct(this, s, i)), !(i instanceof vn)) {
      if (rt(i))
        return i.forEach(function(o) {
          return a.add(o, s);
        }), this;
      if (Z(i))
        return this.addLabel(i, s);
      if (U(i))
        i = K.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Lt(this, i, s) : this;
  }, e.getChildren = function(i, s, a, o) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), a === void 0 && (a = !0), o === void 0 && (o = -$t);
    for (var c = [], l = this._first; l; )
      l._start >= o && (l instanceof K ? s && c.push(l) : (a && c.push(l), i && c.push.apply(c, l.getChildren(!0, s, a)))), l = l._next;
    return c;
  }, e.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), a = s.length; a--; )
      if (s[a].vars.id === i)
        return s[a];
  }, e.remove = function(i) {
    return Z(i) ? this.removeLabel(i) : U(i) ? this.killTweensOf(i) : (i.parent === this && wr(this, i), i === this._recent && (this._recent = this._last), ge(this));
  }, e.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = X(vt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(i, s) {
    return this.labels[i] = Ct(this, s), this;
  }, e.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, e.addPause = function(i, s, a) {
    var o = K.delayedCall(0, s || gn, a);
    return o.data = "isPause", this._hasPause = 1, Lt(this, o, Ct(this, i));
  }, e.removePause = function(i) {
    var s = this._first;
    for (i = Ct(this, i); s; )
      s._start === i && s.data === "isPause" && ee(s), s = s._next;
  }, e.killTweensOf = function(i, s, a) {
    for (var o = this.getTweensOf(i, a), c = o.length; c--; )
      jt !== o[c] && o[c].kill(i, s);
    return this;
  }, e.getTweensOf = function(i, s) {
    for (var a = [], o = St(i), c = this._first, l = Gt(s), u; c; )
      c instanceof K ? v0(c._targets, o) && (l ? (!jt || c._initted && c._ts) && c.globalTime(0) <= s && c.globalTime(c.totalDuration()) > s : !s || c.isActive()) && a.push(c) : (u = c.getTweensOf(o, s)).length && a.push.apply(a, u), c = c._next;
    return a;
  }, e.tweenTo = function(i, s) {
    s = s || {};
    var a = this, o = Ct(a, i), c = s, l = c.startAt, u = c.onStart, h = c.onStartParams, f = c.immediateRender, d, _ = K.to(a, At({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale()) || H,
      onStart: function() {
        if (a.pause(), !d) {
          var v = s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale());
          _._dur !== v && qe(_, v, 0, 1).render(_._time, !0, !0), d = 1;
        }
        u && u.apply(_, h || []);
      }
    }, s));
    return f ? _.render(0) : _;
  }, e.tweenFromTo = function(i, s, a) {
    return this.tweenTo(s, At({
      startAt: {
        time: Ct(this, i)
      }
    }, a));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(i) {
    return i === void 0 && (i = this._time), ua(this, Ct(this, i));
  }, e.previousLabel = function(i) {
    return i === void 0 && (i = this._time), ua(this, Ct(this, i), 1);
  }, e.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + H);
  }, e.shiftChildren = function(i, s, a) {
    a === void 0 && (a = 0);
    var o = this._first, c = this.labels, l;
    for (i = X(i); o; )
      o._start >= a && (o._start += i, o._end += i), o = o._next;
    if (s)
      for (l in c)
        c[l] >= a && (c[l] += i);
    return ge(this);
  }, e.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return n.prototype.invalidate.call(this, i);
  }, e.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, a; s; )
      a = s._next, this.remove(s), s = a;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), ge(this);
  }, e.totalDuration = function(i) {
    var s = 0, a = this, o = a._last, c = $t, l, u, h;
    if (arguments.length)
      return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -i : i));
    if (a._dirty) {
      for (h = a.parent; o; )
        l = o._prev, o._dirty && o.totalDuration(), u = o._start, u > c && a._sort && o._ts && !a._lock ? (a._lock = 1, Lt(a, o, u - o._delay, 1)._lock = 0) : c = u, u < 0 && o._ts && (s -= u, (!h && !a._dp || h && h.smoothChildTiming) && (a._start += X(u / a._ts), a._time -= u, a._tTime -= u), a.shiftChildren(-u, !1, -1 / 0), c = 0), o._end > s && o._ts && (s = o._end), o = l;
      qe(a, a === Y && a._time > s ? a._time : s, 1, 1), a._dirty = 0;
    }
    return a._tDur;
  }, t.updateRoot = function(i) {
    if (Y._ts && (So(Y, pr(i, Y)), Co = vt.frame), vt.frame >= aa) {
      aa += yt.autoSleep || 120;
      var s = Y._first;
      if ((!s || !s._ts) && yt.autoSleep && vt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || vt.sleep();
      }
    }
  }, t;
})(vn);
At(at.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var H0 = function(t, e, r, i, s, a, o) {
  var c = new ht(this._pt, t, e, 0, 1, el, null, s), l = 0, u = 0, h, f, d, _, p, v, b, y;
  for (c.b = r, c.e = i, r += "", i += "", (b = ~i.indexOf("random(")) && (i = _n(i)), a && (y = [r, i], a(y, t, e), r = y[0], i = y[1]), f = r.match(Vr) || []; h = Vr.exec(i); )
    _ = h[0], p = i.substring(l, h.index), d ? d = (d + 1) % 5 : p.substr(-5) === "rgba(" && (d = 1), _ !== f[u++] && (v = parseFloat(f[u - 1]) || 0, c._pt = {
      _next: c._pt,
      p: p || u === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: v,
      c: _.charAt(1) === "=" ? Me(v, _) - v : parseFloat(_) - v,
      m: d && d < 4 ? Math.round : 0
    }, l = Vr.lastIndex);
  return c.c = l < i.length ? i.substring(l, i.length) : "", c.fp = o, (yo.test(i) || b) && (c.e = 0), this._pt = c, c;
}, ts = function(t, e, r, i, s, a, o, c, l, u) {
  U(i) && (i = i(s || 0, t, a));
  var h = t[e], f = r !== "get" ? r : U(h) ? l ? t[e.indexOf("set") || !U(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, d = U(h) ? l ? G0 : Jo : ns, _;
  if (Z(i) && (~i.indexOf("random(") && (i = _n(i)), i.charAt(1) === "=" && (_ = Me(f, i) + (nt(f) || 0), (_ || _ === 0) && (i = _))), !u || f !== i || yi)
    return !isNaN(f * i) && i !== "" ? (_ = new ht(this._pt, t, e, +f || 0, i - (f || 0), typeof h == "boolean" ? U0 : tl, 0, d), l && (_.fp = l), o && _.modifier(o, this, t), this._pt = _) : (!h && !(e in t) && ji(e, i), H0.call(this, t, e, f, i, d, c || yt.stringFilter, l));
}, B0 = function(t, e, r, i, s) {
  if (U(t) && (t = on(t, s, e, r, i)), !It(t) || t.style && t.nodeType || rt(t) || xo(t))
    return Z(t) ? on(t, s, e, r, i) : t;
  var a = {}, o;
  for (o in t)
    a[o] = on(t[o], s, e, r, i);
  return a;
}, Ko = function(t, e, r, i, s, a) {
  var o, c, l, u;
  if (mt[t] && (o = new mt[t]()).init(s, o.rawVars ? e[t] : B0(e[t], i, s, a, r), r, i, a) !== !1 && (r._pt = c = new ht(r._pt, s, t, 0, 1, o.render, o, 0, o.priority), r !== $e))
    for (l = r._ptLookup[r._targets.indexOf(s)], u = o._props.length; u--; )
      l[o._props[u]] = c;
  return o;
}, jt, yi, es = function n(t, e, r) {
  var i = t.vars, s = i.ease, a = i.startAt, o = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, h = i.yoyoEase, f = i.keyframes, d = i.autoRevert, _ = t._dur, p = t._startAt, v = t._targets, b = t.parent, y = b && b.data === "nested" ? b.vars.targets : v, x = t._overwrite === "auto" && !Yi, g = t.timeline, m, w, $, A, k, C, T, S, M, E, P, z, L;
  if (g && (!f || !s) && (s = "none"), t._ease = _e(s, De.ease), t._yEase = h ? Go(_e(h === !0 ? s : h, De.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !g && !!i.runBackwards, !g || f && !i.stagger) {
    if (S = v[0] ? pe(v[0]).harness : 0, z = S && i[S.prop], m = dr(i, Ki), p && (p._zTime < 0 && p.progress(1), e < 0 && u && o && !d ? p.render(-1, !0) : p.revert(u && _ ? Vn : _0), p._lazy = 0), a) {
      if (ee(t._startAt = K.set(v, At({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && ct(c),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return xt(t, "onUpdate");
        },
        stagger: 0
      }, a))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (J || !o && !d) && t._startAt.revert(Vn), o && _ && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (u && _ && !p) {
      if (e && (o = !1), $ = At({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !p && ct(c),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, m), z && ($[S.prop] = z), ee(t._startAt = K.set(v, $)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (J ? t._startAt.revert(Vn) : t._startAt.render(-1, !0)), t._zTime = e, !o)
        n(t._startAt, H, H);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, c = _ && ct(c) || c && !_, w = 0; w < v.length; w++) {
      if (k = v[w], T = k._gsap || Qi(v)[w]._gsap, t._ptLookup[w] = E = {}, gi[T.id] && Qt.length && fr(), P = y === v ? w : y.indexOf(k), S && (M = new S()).init(k, z || m, t, P, y) !== !1 && (t._pt = A = new ht(t._pt, k, M.name, 0, 1, M.render, M, 0, M.priority), M._props.forEach(function(D) {
        E[D] = A;
      }), M.priority && (C = 1)), !S || z)
        for ($ in m)
          mt[$] && (M = Ko($, m, t, P, k, y)) ? M.priority && (C = 1) : E[$] = A = ts.call(t, k, $, "get", m[$], P, y, 0, i.stringFilter);
      t._op && t._op[w] && t.kill(k, t._op[w]), x && t._pt && (jt = t, Y.killTweensOf(k, E, t.globalTime(e)), L = !t.parent, jt = 0), t._pt && c && (gi[T.id] = 1);
    }
    C && nl(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !L, f && e <= 0 && g.render($t, !0, !0);
}, V0 = function(t, e, r, i, s, a, o, c) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], u, h, f, d;
  if (!l)
    for (l = t._ptCache[e] = [], f = t._ptLookup, d = t._targets.length; d--; ) {
      if (u = f[d][e], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== e && u.fp !== e; )
          u = u._next;
      if (!u)
        return yi = 1, t.vars[e] = "+=0", es(t, o), yi = 0, c ? pn(e + " not eligible for reset") : 1;
      l.push(u);
    }
  for (d = l.length; d--; )
    h = l[d], u = h._pt || h, u.s = (i || i === 0) && !s ? i : u.s + (i || 0) + a * u.c, u.c = r - u.s, h.e && (h.e = j(r) + nt(h.e)), h.b && (h.b = u.s + nt(h.b));
}, X0 = function(t, e) {
  var r = t[0] ? pe(t[0]).harness : 0, i = r && r.aliases, s, a, o, c;
  if (!i)
    return e;
  s = Ie({}, e);
  for (a in i)
    if (a in s)
      for (c = i[a].split(","), o = c.length; o--; )
        s[c[o]] = s[a];
  return s;
}, Y0 = function(t, e, r, i) {
  var s = e.ease || i || "power1.inOut", a, o;
  if (rt(e))
    o = r[t] || (r[t] = []), e.forEach(function(c, l) {
      return o.push({
        t: l / (e.length - 1) * 100,
        v: c,
        e: s
      });
    });
  else
    for (a in e)
      o = r[a] || (r[a] = []), a === "ease" || o.push({
        t: parseFloat(t),
        v: e[a],
        e: s
      });
}, on = function(t, e, r, i, s) {
  return U(t) ? t.call(e, r, i, s) : Z(t) && ~t.indexOf("random(") ? _n(t) : t;
}, Zo = Zi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Qo = {};
ut(Zo + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return Qo[n] = 1;
});
var K = /* @__PURE__ */ (function(n) {
  mo(t, n);
  function t(r, i, s, a) {
    var o;
    typeof i == "number" && (s.duration = i, i = s, s = null), o = n.call(this, a ? i : sn(i)) || this;
    var c = o.vars, l = c.duration, u = c.delay, h = c.immediateRender, f = c.stagger, d = c.overwrite, _ = c.keyframes, p = c.defaults, v = c.scrollTrigger, b = c.yoyoEase, y = i.parent || Y, x = (rt(r) || xo(r) ? Gt(r[0]) : "length" in i) ? [r] : St(r), g, m, w, $, A, k, C, T;
    if (o._targets = x.length ? Qi(x) : pn("GSAP target " + r + " not found. https://gsap.com", !yt.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = d, _ || f || Ln(l) || Ln(u)) {
      if (i = o.vars, g = o.timeline = new at({
        data: "nested",
        defaults: p || {},
        targets: y && y.data === "nested" ? y.vars.targets : x
      }), g.kill(), g.parent = g._dp = Bt(o), g._start = 0, f || Ln(l) || Ln(u)) {
        if ($ = x.length, C = f && Ro(f), It(f))
          for (A in f)
            ~Zo.indexOf(A) && (T || (T = {}), T[A] = f[A]);
        for (m = 0; m < $; m++)
          w = dr(i, Qo), w.stagger = 0, b && (w.yoyoEase = b), T && Ie(w, T), k = x[m], w.duration = +on(l, Bt(o), m, k, x), w.delay = (+on(u, Bt(o), m, k, x) || 0) - o._delay, !f && $ === 1 && w.delay && (o._delay = u = w.delay, o._start += u, w.delay = 0), g.to(k, w, C ? C(m, k, x) : 0), g._ease = R.none;
        g.duration() ? l = u = 0 : o.timeline = 0;
      } else if (_) {
        sn(At(g.vars.defaults, {
          ease: "none"
        })), g._ease = _e(_.ease || i.ease || "none");
        var S = 0, M, E, P;
        if (rt(_))
          _.forEach(function(z) {
            return g.to(x, z, ">");
          }), g.duration();
        else {
          w = {};
          for (A in _)
            A === "ease" || A === "easeEach" || Y0(A, _[A], w, _.easeEach);
          for (A in w)
            for (M = w[A].sort(function(z, L) {
              return z.t - L.t;
            }), S = 0, m = 0; m < M.length; m++)
              E = M[m], P = {
                ease: E.e,
                duration: (E.t - (m ? M[m - 1].t : 0)) / 100 * l
              }, P[A] = E.v, g.to(x, P, S), S += P.duration;
          g.duration() < l && g.to({}, {
            duration: l - g.duration()
          });
        }
      }
      l || o.duration(l = g.duration());
    } else
      o.timeline = 0;
    return d === !0 && !Yi && (jt = Bt(o), Y.killTweensOf(x), jt = 0), Lt(y, Bt(o), s), i.reversed && o.reverse(), i.paused && o.paused(!0), (h || !l && !_ && o._start === X(y._time) && ct(h) && w0(Bt(o)) && y.data !== "nested") && (o._tTime = -H, o.render(Math.max(0, -u) || 0)), v && zo(Bt(o), v), o;
  }
  var e = t.prototype;
  return e.render = function(i, s, a) {
    var o = this._time, c = this._tDur, l = this._dur, u = i < 0, h = i > c - H && !u ? c : i < H ? 0 : i, f, d, _, p, v, b, y, x, g;
    if (!l)
      A0(this, i, s, a);
    else if (h !== this._tTime || !i || a || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (f = h, x = this.timeline, this._repeat) {
        if (p = l + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(p * 100 + i, s, a);
        if (f = X(h % p), h === c ? (_ = this._repeat, f = l) : (v = X(h / p), _ = ~~v, _ && _ === v ? (f = l, _--) : f > l && (f = l)), b = this._yoyo && _ & 1, b && (g = this._yEase, f = l - f), v = Fe(this._tTime, p), f === o && !a && this._initted && _ === v)
          return this._tTime = h, this;
        _ !== v && (x && this._yEase && Wo(x, b), this.vars.repeatRefresh && !b && !this._lock && f !== p && this._initted && (this._lock = a = 1, this.render(X(p * _), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Oo(this, u ? i : f, a, s, h))
          return this._tTime = 0, this;
        if (o !== this._time && !(a && this.vars.repeatRefresh && _ !== v))
          return this;
        if (l !== this._dur)
          return this.render(i, s, a);
      }
      if (this._tTime = h, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = y = (g || this._ease)(f / l), this._from && (this.ratio = y = 1 - y), !o && h && !s && !v && (xt(this, "onStart"), this._tTime !== h))
        return this;
      for (d = this._pt; d; )
        d.r(y, d.d), d = d._next;
      x && x.render(i < 0 ? i : x._dur * x._ease(f / this._dur), s, a) || this._startAt && (this._zTime = i), this._onUpdate && !s && (u && _i(this, i, s, a), xt(this, "onUpdate")), this._repeat && _ !== v && this.vars.onRepeat && !s && this.parent && xt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (u && !this._onUpdate && _i(this, i, !0, !0), (i || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && ee(this, 1), !s && !(u && !o) && (h || o || b) && (xt(this, h === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, e.resetTo = function(i, s, a, o, c) {
    mn || vt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || es(this, l), u = this._ease(l / this._dur), V0(this, i, s, a, o, u, l, c) ? this.resetTo(i, s, a, o, 1) : (Ar(this, 0), this.parent || Eo(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? en(this) : this.scrollTrigger && this.scrollTrigger.kill(!!J), this;
    if (this.timeline) {
      var a = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, jt && jt.vars.overwrite !== !0)._first || en(this), this.parent && a !== this.timeline.totalDuration() && qe(this, this._dur * this.timeline._tDur / a, 0, 1), this;
    }
    var o = this._targets, c = i ? St(i) : o, l = this._ptLookup, u = this._pt, h, f, d, _, p, v, b;
    if ((!s || s === "all") && b0(o, c))
      return s === "all" && (this._pt = 0), en(this);
    for (h = this._op = this._op || [], s !== "all" && (Z(s) && (p = {}, ut(s, function(y) {
      return p[y] = 1;
    }), s = p), s = X0(o, s)), b = o.length; b--; )
      if (~c.indexOf(o[b])) {
        f = l[b], s === "all" ? (h[b] = s, _ = f, d = {}) : (d = h[b] = h[b] || {}, _ = s);
        for (p in _)
          v = f && f[p], v && ((!("kill" in v.d) || v.d.kill(p) === !0) && wr(this, v, "_pt"), delete f[p]), d !== "all" && (d[p] = 1);
      }
    return this._initted && !this._pt && u && en(this), this;
  }, t.to = function(i, s) {
    return new t(i, s, arguments[2]);
  }, t.from = function(i, s) {
    return an(1, arguments);
  }, t.delayedCall = function(i, s, a, o) {
    return new t(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: a,
      onReverseCompleteParams: a,
      callbackScope: o
    });
  }, t.fromTo = function(i, s, a) {
    return an(2, arguments);
  }, t.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new t(i, s);
  }, t.killTweensOf = function(i, s, a) {
    return Y.killTweensOf(i, s, a);
  }, t;
})(vn);
At(K.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ut("staggerTo,staggerFrom,staggerFromTo", function(n) {
  K[n] = function() {
    var t = new at(), e = vi.call(arguments, 0);
    return e.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), t[n].apply(t, e);
  };
});
var ns = function(t, e, r) {
  return t[e] = r;
}, Jo = function(t, e, r) {
  return t[e](r);
}, G0 = function(t, e, r, i) {
  return t[e](i.fp, r);
}, W0 = function(t, e, r) {
  return t.setAttribute(e, r);
}, rs = function(t, e) {
  return U(t[e]) ? Jo : Gi(t[e]) && t.setAttribute ? W0 : ns;
}, tl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, U0 = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, el = function(t, e) {
  var r = e._pt, i = "";
  if (!t && e.b)
    i = e.b;
  else if (t === 1 && e.e)
    i = e.e;
  else {
    for (; r; )
      i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + i, r = r._next;
    i += e.c;
  }
  e.set(e.t, e.p, i, e);
}, is = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, j0 = function(t, e, r, i) {
  for (var s = this._pt, a; s; )
    a = s._next, s.p === i && s.modifier(t, e, r), s = a;
}, K0 = function(t) {
  for (var e = this._pt, r, i; e; )
    i = e._next, e.p === t && !e.op || e.op === t ? wr(this, e, "_pt") : e.dep || (r = 1), e = i;
  return !r;
}, Z0 = function(t, e, r, i) {
  i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
}, nl = function(t) {
  for (var e = t._pt, r, i, s, a; e; ) {
    for (r = e._next, i = s; i && i.pr > e.pr; )
      i = i._next;
    (e._prev = i ? i._prev : a) ? e._prev._next = e : s = e, (e._next = i) ? i._prev = e : a = e, e = r;
  }
  t._pt = s;
}, ht = /* @__PURE__ */ (function() {
  function n(e, r, i, s, a, o, c, l, u) {
    this.t = r, this.s = s, this.c = a, this.p = i, this.r = o || tl, this.d = c || this, this.set = l || ns, this.pr = u || 0, this._next = e, e && (e._prev = this);
  }
  var t = n.prototype;
  return t.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = Z0, this.m = r, this.mt = s, this.tween = i;
  }, n;
})();
ut(Zi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return Ki[n] = 1;
});
kt.TweenMax = kt.TweenLite = K;
kt.TimelineLite = kt.TimelineMax = at;
Y = new at({
  sortChildren: !1,
  defaults: De,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
yt.stringFilter = Yo;
var me = [], Yn = {}, Q0 = [], fa = 0, J0 = 0, Ur = function(t) {
  return (Yn[t] || Q0).map(function(e) {
    return e();
  });
}, wi = function() {
  var t = Date.now(), e = [];
  t - fa > 2 && (Ur("matchMediaInit"), me.forEach(function(r) {
    var i = r.queries, s = r.conditions, a, o, c, l;
    for (o in i)
      a = Ot.matchMedia(i[o]).matches, a && (c = 1), a !== s[o] && (s[o] = a, l = 1);
    l && (r.revert(), c && e.push(r));
  }), Ur("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), fa = t, Ur("matchMedia"));
}, rl = /* @__PURE__ */ (function() {
  function n(e, r) {
    this.selector = r && xi(r), this.data = [], this._r = [], this.isReverted = !1, this.id = J0++, e && this.add(e);
  }
  var t = n.prototype;
  return t.add = function(r, i, s) {
    U(r) && (s = i, i = r, r = U);
    var a = this, o = function() {
      var l = V, u = a.selector, h;
      return l && l !== a && l.data.push(a), s && (a.selector = xi(s)), V = a, h = i.apply(a, arguments), U(h) && a._r.push(h), V = l, a.selector = u, a.isReverted = !1, h;
    };
    return a.last = o, r === U ? o(a, function(c) {
      return a.add(null, c);
    }) : r ? a[r] = o : o;
  }, t.ignore = function(r) {
    var i = V;
    V = null, r(this), V = i;
  }, t.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof K && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(r, i) {
    var s = this;
    if (r ? (function() {
      for (var o = s.getTweens(), c = s.data.length, l; c--; )
        l = s.data[c], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(u) {
          return o.splice(o.indexOf(u), 1);
        }));
      for (o.map(function(u) {
        return {
          g: u._dur || u._delay || u._sat && !u._sat.vars.immediateRender ? u.globalTime(0) : -1 / 0,
          t: u
        };
      }).sort(function(u, h) {
        return h.g - u.g || -1 / 0;
      }).forEach(function(u) {
        return u.t.revert(r);
      }), c = s.data.length; c--; )
        l = s.data[c], l instanceof at ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof K) && l.revert && l.revert(r);
      s._r.forEach(function(u) {
        return u(r, s);
      }), s.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), i)
      for (var a = me.length; a--; )
        me[a].id === this.id && me.splice(a, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, n;
})(), tg = /* @__PURE__ */ (function() {
  function n(e) {
    this.contexts = [], this.scope = e, V && V.data.push(this);
  }
  var t = n.prototype;
  return t.add = function(r, i, s) {
    It(r) || (r = {
      matches: r
    });
    var a = new rl(0, s || this.scope), o = a.conditions = {}, c, l, u;
    V && !a.selector && (a.selector = V.selector), this.contexts.push(a), i = a.add("onMatch", i), a.queries = r;
    for (l in r)
      l === "all" ? u = 1 : (c = Ot.matchMedia(r[l]), c && (me.indexOf(a) < 0 && me.push(a), (o[l] = c.matches) && (u = 1), c.addListener ? c.addListener(wi) : c.addEventListener("change", wi)));
    return u && i(a, function(h) {
      return a.add(null, h);
    }), this;
  }, t.revert = function(r) {
    this.kill(r || {});
  }, t.kill = function(r) {
    this.contexts.forEach(function(i) {
      return i.kill(r, !0);
    });
  }, n;
})(), gr = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(i) {
      return Bo(i);
    });
  },
  timeline: function(t) {
    return new at(t);
  },
  getTweensOf: function(t, e) {
    return Y.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, i) {
    Z(t) && (t = St(t)[0]);
    var s = pe(t || {}).get, a = r ? Mo : To;
    return r === "native" && (r = ""), t && (e ? a((mt[e] && mt[e].get || s)(t, e, r, i)) : function(o, c, l) {
      return a((mt[o] && mt[o].get || s)(t, o, c, l));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = St(t), t.length > 1) {
      var i = t.map(function(u) {
        return dt.quickSetter(u, e, r);
      }), s = i.length;
      return function(u) {
        for (var h = s; h--; )
          i[h](u);
      };
    }
    t = t[0] || {};
    var a = mt[e], o = pe(t), c = o.harness && (o.harness.aliases || {})[e] || e, l = a ? function(u) {
      var h = new a();
      $e._pt = 0, h.init(t, r ? u + r : u, $e, 0, [t]), h.render(1, h), $e._pt && is(1, $e);
    } : o.set(t, c);
    return a ? l : function(u) {
      return l(t, c, r ? u + r : u, o, 1);
    };
  },
  quickTo: function(t, e, r) {
    var i, s = dt.to(t, At((i = {}, i[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})), a = function(c, l, u) {
      return s.resetTo(e, c, l, u);
    };
    return a.tween = s, a;
  },
  isTweening: function(t) {
    return Y.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = _e(t.ease, De.ease)), oa(De, t || {});
  },
  config: function(t) {
    return oa(yt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, i = t.plugins, s = t.defaults, a = t.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !mt[o] && !kt[o] && pn(e + " effect requires " + o + " plugin.");
    }), Xr[e] = function(o, c, l) {
      return r(St(o), At(c || {}, s), l);
    }, a && (at.prototype[e] = function(o, c, l) {
      return this.add(Xr[e](o, It(c) ? c : (l = c) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    R[t] = _e(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? _e(t, e) : R;
  },
  getById: function(t) {
    return Y.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new at(t), i, s;
    for (r.smoothChildTiming = ct(t.smoothChildTiming), Y.remove(r), r._dp = 0, r._time = r._tTime = Y._time, i = Y._first; i; )
      s = i._next, (e || !(!i._dur && i instanceof K && i.vars.onComplete === i._targets[0])) && Lt(r, i, i._start - i._delay), i = s;
    return Lt(Y, r, 0), r;
  },
  context: function(t, e) {
    return t ? new rl(t, e) : V;
  },
  matchMedia: function(t) {
    return new tg(t);
  },
  matchMediaRefresh: function() {
    return me.forEach(function(t) {
      var e = t.conditions, r, i;
      for (i in e)
        e[i] && (e[i] = !1, r = 1);
      r && t.revert();
    }) || wi();
  },
  addEventListener: function(t, e) {
    var r = Yn[t] || (Yn[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = Yn[t], i = r && r.indexOf(e);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: z0,
    wrapYoyo: O0,
    distribute: Ro,
    random: Io,
    snap: Do,
    normalize: P0,
    getUnit: nt,
    clamp: S0,
    splitColor: Vo,
    toArray: St,
    selector: xi,
    mapRange: qo,
    pipe: M0,
    unitize: E0,
    interpolate: L0,
    shuffle: No
  },
  install: ko,
  effects: Xr,
  ticker: vt,
  updateRoot: at.updateRoot,
  plugins: mt,
  globalTimeline: Y,
  core: {
    PropTween: ht,
    globals: Ao,
    Tween: K,
    Timeline: at,
    Animation: vn,
    getCache: pe,
    _removeLinkedListItem: wr,
    reverting: function() {
      return J;
    },
    context: function(t) {
      return t && V && (V.data.push(t), t._ctx = V), V;
    },
    suppressOverwrites: function(t) {
      return Yi = t;
    }
  }
};
ut("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return gr[n] = K[n];
});
vt.add(at.updateRoot);
$e = gr.to({}, {
  duration: 0
});
var eg = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, ng = function(t, e) {
  var r = t._targets, i, s, a;
  for (i in e)
    for (s = r.length; s--; )
      a = t._ptLookup[s][i], a && (a = a.d) && (a._pt && (a = eg(a, i)), a && a.modifier && a.modifier(e[i], t, r[s], i));
}, jr = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, a) {
      a._onInit = function(o) {
        var c, l;
        if (Z(s) && (c = {}, ut(s, function(u) {
          return c[u] = 1;
        }), s = c), e) {
          c = {};
          for (l in s)
            c[l] = e(s[l]);
          s = c;
        }
        ng(o, s);
      };
    }
  };
}, dt = gr.registerPlugin({
  name: "attr",
  init: function(t, e, r, i, s) {
    var a, o, c;
    this.tween = r;
    for (a in e)
      c = t.getAttribute(a) || "", o = this.add(t, "setAttribute", (c || 0) + "", e[a], i, s, 0, 0, a), o.op = a, o.b = c, this._props.push(a);
  },
  render: function(t, e) {
    for (var r = e._pt; r; )
      J ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var r = e.length; r--; )
      this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
  }
}, jr("roundProps", bi), jr("modifiers"), jr("snap", Do)) || gr;
K.version = at.version = dt.version = "3.14.2";
wo = 1;
Wi() && He();
R.Power0;
R.Power1;
R.Power2;
R.Power3;
R.Power4;
R.Linear;
R.Quad;
R.Cubic;
R.Quart;
R.Quint;
R.Strong;
R.Elastic;
R.Back;
R.SteppedEase;
R.Bounce;
R.Sine;
R.Expo;
R.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var da, Kt, Ee, ss, fe, pa, as, rg = function() {
  return typeof window < "u";
}, Wt = {}, ue = 180 / Math.PI, Pe = Math.PI / 180, we = Math.atan2, ga = 1e8, os = /([A-Z])/g, ig = /(left|right|width|margin|padding|x)/i, sg = /[\s,\(]\S/, Rt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ki = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, ag = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, og = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, lg = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, cg = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, il = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, sl = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, ug = function(t, e, r) {
  return t.style[e] = r;
}, hg = function(t, e, r) {
  return t.style.setProperty(e, r);
}, fg = function(t, e, r) {
  return t._gsap[e] = r;
}, dg = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, pg = function(t, e, r, i, s) {
  var a = t._gsap;
  a.scaleX = a.scaleY = r, a.renderTransform(s, a);
}, gg = function(t, e, r, i, s) {
  var a = t._gsap;
  a[e] = r, a.renderTransform(s, a);
}, W = "transform", ft = W + "Origin", _g = function n(t, e) {
  var r = this, i = this.target, s = i.style, a = i._gsap;
  if (t in Wt && s) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Rt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(o) {
        return r.tfm[o] = Vt(i, o);
      }) : this.tfm[t] = a.x ? a[t] : Vt(i, t), t === ft && (this.tfm.zOrigin = a.zOrigin);
    else
      return Rt.transform.split(",").forEach(function(o) {
        return n.call(r, o, e);
      });
    if (this.props.indexOf(W) >= 0)
      return;
    a.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(ft, e, "")), t = W;
  }
  (s || e) && this.props.push(t, e, s[t]);
}, al = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, mg = function() {
  var t = this.props, e = this.target, r = e.style, i = e._gsap, s, a;
  for (s = 0; s < t.length; s += 3)
    t[s + 1] ? t[s + 1] === 2 ? e[t[s]](t[s + 2]) : e[t[s]] = t[s + 2] : t[s + 2] ? r[t[s]] = t[s + 2] : r.removeProperty(t[s].substr(0, 2) === "--" ? t[s] : t[s].replace(os, "-$1").toLowerCase());
  if (this.tfm) {
    for (a in this.tfm)
      i[a] = this.tfm[a];
    i.svg && (i.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), s = as(), (!s || !s.isStart) && !r[W] && (al(r), i.zOrigin && r[ft] && (r[ft] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, ol = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: mg,
    save: _g
  };
  return t._gsap || dt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, ll, Ai = function(t, e) {
  var r = Kt.createElementNS ? Kt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Kt.createElement(t);
  return r && r.style ? r : Kt.createElement(t);
}, bt = function n(t, e, r) {
  var i = getComputedStyle(t);
  return i[e] || i.getPropertyValue(e.replace(os, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && n(t, Be(e) || e, 1) || "";
}, _a = "O,Moz,ms,Ms,Webkit".split(","), Be = function(t, e, r) {
  var i = e || fe, s = i.style, a = 5;
  if (t in s && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); a-- && !(_a[a] + t in s); )
    ;
  return a < 0 ? null : (a === 3 ? "ms" : a >= 0 ? _a[a] : "") + t;
}, Ci = function() {
  rg() && window.document && (da = window, Kt = da.document, Ee = Kt.documentElement, fe = Ai("div") || {
    style: {}
  }, Ai("div"), W = Be(W), ft = W + "Origin", fe.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ll = !!Be("perspective"), as = dt.core.reverting, ss = 1);
}, ma = function(t) {
  var e = t.ownerSVGElement, r = Ai("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = t.cloneNode(!0), s;
  i.style.display = "block", r.appendChild(i), Ee.appendChild(r);
  try {
    s = i.getBBox();
  } catch {
  }
  return r.removeChild(i), Ee.removeChild(r), s;
}, va = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, cl = function(t) {
  var e, r;
  try {
    e = t.getBBox();
  } catch {
    e = ma(t), r = 1;
  }
  return e && (e.width || e.height) || r || (e = ma(t)), e && !e.width && !e.x && !e.y ? {
    x: +va(t, ["x", "cx", "x1"]) || 0,
    y: +va(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, ul = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && cl(t));
}, ne = function(t, e) {
  if (e) {
    var r = t.style, i;
    e in Wt && e !== ft && (e = W), r.removeProperty ? (i = e.substr(0, 2), (i === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(i === "--" ? e : e.replace(os, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, Zt = function(t, e, r, i, s, a) {
  var o = new ht(t._pt, e, r, 0, 1, a ? sl : il);
  return t._pt = o, o.b = i, o.e = s, t._props.push(r), o;
}, xa = {
  deg: 1,
  rad: 1,
  turn: 1
}, vg = {
  grid: 1,
  flex: 1
}, re = function n(t, e, r, i) {
  var s = parseFloat(r) || 0, a = (r + "").trim().substr((s + "").length) || "px", o = fe.style, c = ig.test(e), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), h = 100, f = i === "px", d = i === "%", _, p, v, b;
  if (i === a || !s || xa[i] || xa[a])
    return s;
  if (a !== "px" && !f && (s = n(t, e, r, "px")), b = t.getCTM && ul(t), (d || a === "%") && (Wt[e] || ~e.indexOf("adius")))
    return _ = b ? t.getBBox()[c ? "width" : "height"] : t[u], j(d ? s / _ * h : s / 100 * _);
  if (o[c ? "width" : "height"] = h + (f ? a : i), p = i !== "rem" && ~e.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, b && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Kt || !p.appendChild) && (p = Kt.body), v = p._gsap, v && d && v.width && c && v.time === vt.time && !v.uncache)
    return j(s / v.width * h);
  if (d && (e === "height" || e === "width")) {
    var y = t.style[e];
    t.style[e] = h + i, _ = t[u], y ? t.style[e] = y : ne(t, e);
  } else
    (d || a === "%") && !vg[bt(p, "display")] && (o.position = bt(t, "position")), p === t && (o.position = "static"), p.appendChild(fe), _ = fe[u], p.removeChild(fe), o.position = "absolute";
  return c && d && (v = pe(p), v.time = vt.time, v.width = p[u]), j(f ? _ * s / h : _ && s ? h / _ * s : 0);
}, Vt = function(t, e, r, i) {
  var s;
  return ss || Ci(), e in Rt && e !== "transform" && (e = Rt[e], ~e.indexOf(",") && (e = e.split(",")[0])), Wt[e] && e !== "transform" ? (s = bn(t, i), s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : mr(bt(t, ft)) + " " + s.zOrigin + "px") : (s = t.style[e], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = _r[e] && _r[e](t, e, r) || bt(t, e) || $o(t, e) || (e === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? re(t, e, s, r) + r : s;
}, xg = function(t, e, r, i) {
  if (!r || r === "none") {
    var s = Be(e, t, 1), a = s && bt(t, s, 1);
    a && a !== r ? (e = s, r = a) : e === "borderColor" && (r = bt(t, "borderTopColor"));
  }
  var o = new ht(this._pt, t.style, e, 0, 1, el), c = 0, l = 0, u, h, f, d, _, p, v, b, y, x, g, m;
  if (o.b = r, o.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = bt(t, i.substring(4, i.indexOf(")")))), i === "auto" && (p = t.style[e], t.style[e] = i, i = bt(t, e) || i, p ? t.style[e] = p : ne(t, e)), u = [r, i], Yo(u), r = u[0], i = u[1], f = r.match(Ce) || [], m = i.match(Ce) || [], m.length) {
    for (; h = Ce.exec(i); )
      v = h[0], y = i.substring(c, h.index), _ ? _ = (_ + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (_ = 1), v !== (p = f[l++] || "") && (d = parseFloat(p) || 0, g = p.substr((d + "").length), v.charAt(1) === "=" && (v = Me(d, v) + g), b = parseFloat(v), x = v.substr((b + "").length), c = Ce.lastIndex - x.length, x || (x = x || yt.units[e] || g, c === i.length && (i += x, o.e += x)), g !== x && (d = re(t, e, p, x) || 0), o._pt = {
        _next: o._pt,
        p: y || l === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: b - d,
        m: _ && _ < 4 || e === "zIndex" ? Math.round : 0
      });
    o.c = c < i.length ? i.substring(c, i.length) : "";
  } else
    o.r = e === "display" && i === "none" ? sl : il;
  return yo.test(i) && (o.e = 0), this._pt = o, o;
}, ba = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, bg = function(t) {
  var e = t.split(" "), r = e[0], i = e[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), e[0] = ba[r] || r, e[1] = ba[i] || i, e.join(" ");
}, yg = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, i = r.style, s = e.u, a = r._gsap, o, c, l;
    if (s === "all" || s === !0)
      i.cssText = "", c = 1;
    else
      for (s = s.split(","), l = s.length; --l > -1; )
        o = s[l], Wt[o] && (c = 1, o = o === "transformOrigin" ? ft : W), ne(r, o);
    c && (ne(r, W), a && (a.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", bn(r, 1), a.uncache = 1, al(i)));
  }
}, _r = {
  clearProps: function(t, e, r, i, s) {
    if (s.data !== "isFromStart") {
      var a = t._pt = new ht(t._pt, e, r, 0, 0, yg);
      return a.u = i, a.pr = -10, a.tween = s, t._props.push(r), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, xn = [1, 0, 0, 1, 0, 0], hl = {}, fl = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, ya = function(t) {
  var e = bt(t, W);
  return fl(e) ? xn : e.substr(7).match(bo).map(j);
}, ls = function(t, e) {
  var r = t._gsap || pe(t), i = t.style, s = ya(t), a, o, c, l;
  return r.svg && t.getAttribute("transform") ? (c = t.transform.baseVal.consolidate().matrix, s = [c.a, c.b, c.c, c.d, c.e, c.f], s.join(",") === "1,0,0,1,0,0" ? xn : s) : (s === xn && !t.offsetParent && t !== Ee && !r.svg && (c = i.display, i.display = "block", a = t.parentNode, (!a || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, o = t.nextElementSibling, Ee.appendChild(t)), s = ya(t), c ? i.display = c : ne(t, "display"), l && (o ? a.insertBefore(t, o) : a ? a.appendChild(t) : Ee.removeChild(t))), e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, $i = function(t, e, r, i, s, a) {
  var o = t._gsap, c = s || ls(t, !0), l = o.xOrigin || 0, u = o.yOrigin || 0, h = o.xOffset || 0, f = o.yOffset || 0, d = c[0], _ = c[1], p = c[2], v = c[3], b = c[4], y = c[5], x = e.split(" "), g = parseFloat(x[0]) || 0, m = parseFloat(x[1]) || 0, w, $, A, k;
  r ? c !== xn && ($ = d * v - _ * p) && (A = g * (v / $) + m * (-p / $) + (p * y - v * b) / $, k = g * (-_ / $) + m * (d / $) - (d * y - _ * b) / $, g = A, m = k) : (w = cl(t), g = w.x + (~x[0].indexOf("%") ? g / 100 * w.width : g), m = w.y + (~(x[1] || x[0]).indexOf("%") ? m / 100 * w.height : m)), i || i !== !1 && o.smooth ? (b = g - l, y = m - u, o.xOffset = h + (b * d + y * p) - b, o.yOffset = f + (b * _ + y * v) - y) : o.xOffset = o.yOffset = 0, o.xOrigin = g, o.yOrigin = m, o.smooth = !!i, o.origin = e, o.originIsAbsolute = !!r, t.style[ft] = "0px 0px", a && (Zt(a, o, "xOrigin", l, g), Zt(a, o, "yOrigin", u, m), Zt(a, o, "xOffset", h, o.xOffset), Zt(a, o, "yOffset", f, o.yOffset)), t.setAttribute("data-svg-origin", g + " " + m);
}, bn = function(t, e) {
  var r = t._gsap || new jo(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var i = t.style, s = r.scaleX < 0, a = "px", o = "deg", c = getComputedStyle(t), l = bt(t, ft) || "0", u, h, f, d, _, p, v, b, y, x, g, m, w, $, A, k, C, T, S, M, E, P, z, L, D, B, F, tt, it, ye, pt, Q;
  return u = h = f = p = v = b = y = x = g = 0, d = _ = 1, r.svg = !!(t.getCTM && ul(t)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (i[W] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[W] !== "none" ? c[W] : "")), i.scale = i.rotate = i.translate = "none"), $ = ls(t, r.svg), r.svg && (r.uncache ? (D = t.getBBox(), l = r.xOrigin - D.x + "px " + (r.yOrigin - D.y) + "px", L = "") : L = !e && t.getAttribute("data-svg-origin"), $i(t, L || l, !!L || r.originIsAbsolute, r.smooth !== !1, $)), m = r.xOrigin || 0, w = r.yOrigin || 0, $ !== xn && (T = $[0], S = $[1], M = $[2], E = $[3], u = P = $[4], h = z = $[5], $.length === 6 ? (d = Math.sqrt(T * T + S * S), _ = Math.sqrt(E * E + M * M), p = T || S ? we(S, T) * ue : 0, y = M || E ? we(M, E) * ue + p : 0, y && (_ *= Math.abs(Math.cos(y * Pe))), r.svg && (u -= m - (m * T + w * M), h -= w - (m * S + w * E))) : (Q = $[6], ye = $[7], F = $[8], tt = $[9], it = $[10], pt = $[11], u = $[12], h = $[13], f = $[14], A = we(Q, it), v = A * ue, A && (k = Math.cos(-A), C = Math.sin(-A), L = P * k + F * C, D = z * k + tt * C, B = Q * k + it * C, F = P * -C + F * k, tt = z * -C + tt * k, it = Q * -C + it * k, pt = ye * -C + pt * k, P = L, z = D, Q = B), A = we(-M, it), b = A * ue, A && (k = Math.cos(-A), C = Math.sin(-A), L = T * k - F * C, D = S * k - tt * C, B = M * k - it * C, pt = E * C + pt * k, T = L, S = D, M = B), A = we(S, T), p = A * ue, A && (k = Math.cos(A), C = Math.sin(A), L = T * k + S * C, D = P * k + z * C, S = S * k - T * C, z = z * k - P * C, T = L, P = D), v && Math.abs(v) + Math.abs(p) > 359.9 && (v = p = 0, b = 180 - b), d = j(Math.sqrt(T * T + S * S + M * M)), _ = j(Math.sqrt(z * z + Q * Q)), A = we(P, z), y = Math.abs(A) > 2e-4 ? A * ue : 0, g = pt ? 1 / (pt < 0 ? -pt : pt) : 0), r.svg && (L = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !fl(bt(t, W)), L && t.setAttribute("transform", L))), Math.abs(y) > 90 && Math.abs(y) < 270 && (s ? (d *= -1, y += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (_ *= -1, y += y <= 0 ? 180 : -180)), e = e || r.uncache, r.x = u - ((r.xPercent = u && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + a, r.y = h - ((r.yPercent = h && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + a, r.z = f + a, r.scaleX = j(d), r.scaleY = j(_), r.rotation = j(p) + o, r.rotationX = j(v) + o, r.rotationY = j(b) + o, r.skewX = y + o, r.skewY = x + o, r.transformPerspective = g + a, (r.zOrigin = parseFloat(l.split(" ")[2]) || !e && r.zOrigin || 0) && (i[ft] = mr(l)), r.xOffset = r.yOffset = 0, r.force3D = yt.force3D, r.renderTransform = r.svg ? kg : ll ? dl : wg, r.uncache = 0, r;
}, mr = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Kr = function(t, e, r) {
  var i = nt(e);
  return j(parseFloat(e) + parseFloat(re(t, "x", r + "px", i))) + i;
}, wg = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, dl(t, e);
}, oe = "0deg", Ue = "0px", le = ") ", dl = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.z, l = r.rotation, u = r.rotationY, h = r.rotationX, f = r.skewX, d = r.skewY, _ = r.scaleX, p = r.scaleY, v = r.transformPerspective, b = r.force3D, y = r.target, x = r.zOrigin, g = "", m = b === "auto" && t && t !== 1 || b === !0;
  if (x && (h !== oe || u !== oe)) {
    var w = parseFloat(u) * Pe, $ = Math.sin(w), A = Math.cos(w), k;
    w = parseFloat(h) * Pe, k = Math.cos(w), a = Kr(y, a, $ * k * -x), o = Kr(y, o, -Math.sin(w) * -x), c = Kr(y, c, A * k * -x + x);
  }
  v !== Ue && (g += "perspective(" + v + le), (i || s) && (g += "translate(" + i + "%, " + s + "%) "), (m || a !== Ue || o !== Ue || c !== Ue) && (g += c !== Ue || m ? "translate3d(" + a + ", " + o + ", " + c + ") " : "translate(" + a + ", " + o + le), l !== oe && (g += "rotate(" + l + le), u !== oe && (g += "rotateY(" + u + le), h !== oe && (g += "rotateX(" + h + le), (f !== oe || d !== oe) && (g += "skew(" + f + ", " + d + le), (_ !== 1 || p !== 1) && (g += "scale(" + _ + ", " + p + le), y.style[W] = g || "translate(0, 0)";
}, kg = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.rotation, l = r.skewX, u = r.skewY, h = r.scaleX, f = r.scaleY, d = r.target, _ = r.xOrigin, p = r.yOrigin, v = r.xOffset, b = r.yOffset, y = r.forceCSS, x = parseFloat(a), g = parseFloat(o), m, w, $, A, k;
  c = parseFloat(c), l = parseFloat(l), u = parseFloat(u), u && (u = parseFloat(u), l += u, c += u), c || l ? (c *= Pe, l *= Pe, m = Math.cos(c) * h, w = Math.sin(c) * h, $ = Math.sin(c - l) * -f, A = Math.cos(c - l) * f, l && (u *= Pe, k = Math.tan(l - u), k = Math.sqrt(1 + k * k), $ *= k, A *= k, u && (k = Math.tan(u), k = Math.sqrt(1 + k * k), m *= k, w *= k)), m = j(m), w = j(w), $ = j($), A = j(A)) : (m = h, A = f, w = $ = 0), (x && !~(a + "").indexOf("px") || g && !~(o + "").indexOf("px")) && (x = re(d, "x", a, "px"), g = re(d, "y", o, "px")), (_ || p || v || b) && (x = j(x + _ - (_ * m + p * $) + v), g = j(g + p - (_ * w + p * A) + b)), (i || s) && (k = d.getBBox(), x = j(x + i / 100 * k.width), g = j(g + s / 100 * k.height)), k = "matrix(" + m + "," + w + "," + $ + "," + A + "," + x + "," + g + ")", d.setAttribute("transform", k), y && (d.style[W] = k);
}, Ag = function(t, e, r, i, s) {
  var a = 360, o = Z(s), c = parseFloat(s) * (o && ~s.indexOf("rad") ? ue : 1), l = c - i, u = i + l + "deg", h, f;
  return o && (h = s.split("_")[1], h === "short" && (l %= a, l !== l % (a / 2) && (l += l < 0 ? a : -a)), h === "cw" && l < 0 ? l = (l + a * ga) % a - ~~(l / a) * a : h === "ccw" && l > 0 && (l = (l - a * ga) % a - ~~(l / a) * a)), t._pt = f = new ht(t._pt, e, r, i, l, ag), f.e = u, f.u = "deg", t._props.push(r), f;
}, wa = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, Cg = function(t, e, r) {
  var i = wa({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", a = r.style, o, c, l, u, h, f, d, _;
  i.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), a[W] = e, o = bn(r, 1), ne(r, W), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[W], a[W] = e, o = bn(r, 1), a[W] = l);
  for (c in Wt)
    l = i[c], u = o[c], l !== u && s.indexOf(c) < 0 && (d = nt(l), _ = nt(u), h = d !== _ ? re(r, c, l, _) : parseFloat(l), f = parseFloat(u), t._pt = new ht(t._pt, o, c, h, f - h, ki), t._pt.u = _ || 0, t._props.push(c));
  wa(o, i);
};
ut("padding,margin,Width,Radius", function(n, t) {
  var e = "Top", r = "Right", i = "Bottom", s = "Left", a = (t < 3 ? [e, r, i, s] : [e + s, e + r, i + r, i + s]).map(function(o) {
    return t < 2 ? n + o : "border" + o + n;
  });
  _r[t > 1 ? "border" + n : n] = function(o, c, l, u, h) {
    var f, d;
    if (arguments.length < 4)
      return f = a.map(function(_) {
        return Vt(o, _, l);
      }), d = f.join(" "), d.split(f[0]).length === 5 ? f[0] : d;
    f = (u + "").split(" "), d = {}, a.forEach(function(_, p) {
      return d[_] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), o.init(c, d, h);
  };
});
var pl = {
  name: "css",
  register: Ci,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, i, s) {
    var a = this._props, o = t.style, c = r.vars.startAt, l, u, h, f, d, _, p, v, b, y, x, g, m, w, $, A, k;
    ss || Ci(), this.styles = this.styles || ol(t), A = this.styles.props, this.tween = r;
    for (p in e)
      if (p !== "autoRound" && (u = e[p], !(mt[p] && Ko(p, e, r, i, t, s)))) {
        if (d = typeof u, _ = _r[p], d === "function" && (u = u.call(r, i, t, s), d = typeof u), d === "string" && ~u.indexOf("random(") && (u = _n(u)), _)
          _(this, t, p, u, r) && ($ = 1);
        else if (p.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(p) + "").trim(), u += "", Jt.lastIndex = 0, Jt.test(l) || (v = nt(l), b = nt(u), b ? v !== b && (l = re(t, p, l, b) + b) : v && (u += v)), this.add(o, "setProperty", l, u, i, s, 0, 0, p), a.push(p), A.push(p, 0, o[p]);
        else if (d !== "undefined") {
          if (c && p in c ? (l = typeof c[p] == "function" ? c[p].call(r, i, t, s) : c[p], Z(l) && ~l.indexOf("random(") && (l = _n(l)), nt(l + "") || l === "auto" || (l += yt.units[p] || nt(Vt(t, p)) || ""), (l + "").charAt(1) === "=" && (l = Vt(t, p))) : l = Vt(t, p), f = parseFloat(l), y = d === "string" && u.charAt(1) === "=" && u.substr(0, 2), y && (u = u.substr(2)), h = parseFloat(u), p in Rt && (p === "autoAlpha" && (f === 1 && Vt(t, "visibility") === "hidden" && h && (f = 0), A.push("visibility", 0, o.visibility), Zt(this, o, "visibility", f ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), p !== "scale" && p !== "transform" && (p = Rt[p], ~p.indexOf(",") && (p = p.split(",")[0]))), x = p in Wt, x) {
            if (this.styles.save(p), k = u, d === "string" && u.substring(0, 6) === "var(--") {
              if (u = bt(t, u.substring(4, u.indexOf(")"))), u.substring(0, 5) === "calc(") {
                var C = t.style.perspective;
                t.style.perspective = u, u = bt(t, "perspective"), C ? t.style.perspective = C : ne(t, "perspective");
              }
              h = parseFloat(u);
            }
            if (g || (m = t._gsap, m.renderTransform && !e.parseTransform || bn(t, e.parseTransform), w = e.smoothOrigin !== !1 && m.smooth, g = this._pt = new ht(this._pt, o, W, 0, 1, m.renderTransform, m, 0, -1), g.dep = 1), p === "scale")
              this._pt = new ht(this._pt, m, "scaleY", m.scaleY, (y ? Me(m.scaleY, y + h) : h) - m.scaleY || 0, ki), this._pt.u = 0, a.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              A.push(ft, 0, o[ft]), u = bg(u), m.svg ? $i(t, u, 0, w, 0, this) : (b = parseFloat(u.split(" ")[2]) || 0, b !== m.zOrigin && Zt(this, m, "zOrigin", m.zOrigin, b), Zt(this, o, p, mr(l), mr(u)));
              continue;
            } else if (p === "svgOrigin") {
              $i(t, u, 1, w, 0, this);
              continue;
            } else if (p in hl) {
              Ag(this, m, p, f, y ? Me(f, y + u) : u);
              continue;
            } else if (p === "smoothOrigin") {
              Zt(this, m, "smooth", m.smooth, u);
              continue;
            } else if (p === "force3D") {
              m[p] = u;
              continue;
            } else if (p === "transform") {
              Cg(this, u, t);
              continue;
            }
          } else p in o || (p = Be(p) || p);
          if (x || (h || h === 0) && (f || f === 0) && !sg.test(u) && p in o)
            v = (l + "").substr((f + "").length), h || (h = 0), b = nt(u) || (p in yt.units ? yt.units[p] : v), v !== b && (f = re(t, p, l, b)), this._pt = new ht(this._pt, x ? m : o, p, f, (y ? Me(f, y + h) : h) - f, !x && (b === "px" || p === "zIndex") && e.autoRound !== !1 ? cg : ki), this._pt.u = b || 0, x && k !== u ? (this._pt.b = l, this._pt.e = k, this._pt.r = lg) : v !== b && b !== "%" && (this._pt.b = l, this._pt.r = og);
          else if (p in o)
            xg.call(this, t, p, l, y ? y + u : u);
          else if (p in t)
            this.add(t, p, l || t[p], y ? y + u : u, i, s);
          else if (p !== "parseTransform") {
            ji(p, u);
            continue;
          }
          x || (p in o ? A.push(p, 0, o[p]) : typeof t[p] == "function" ? A.push(p, 2, t[p]()) : A.push(p, 1, l || t[p])), a.push(p);
        }
      }
    $ && nl(this);
  },
  render: function(t, e) {
    if (e.tween._time || !as())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Vt,
  aliases: Rt,
  getSetter: function(t, e, r) {
    var i = Rt[e];
    return i && i.indexOf(",") < 0 && (e = i), e in Wt && e !== ft && (t._gsap.x || Vt(t, "x")) ? r && pa === r ? e === "scale" ? dg : fg : (pa = r || {}) && (e === "scale" ? pg : gg) : t.style && !Gi(t.style[e]) ? ug : ~e.indexOf("-") ? hg : rs(t, e);
  },
  core: {
    _removeProperty: ne,
    _getMatrix: ls
  }
};
dt.utils.checkPrefix = Be;
dt.core.getStyleSaver = ol;
(function(n, t, e, r) {
  var i = ut(n + "," + t + "," + e, function(s) {
    Wt[s] = 1;
  });
  ut(t, function(s) {
    yt.units[s] = "deg", hl[s] = 1;
  }), Rt[i[13]] = n + "," + t, ut(r, function(s) {
    var a = s.split(":");
    Rt[a[1]] = i[a[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ut("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  yt.units[n] = "px";
});
dt.registerPlugin(pl);
var rn = dt.registerPlugin(pl) || dt;
rn.core.Tween;
const ke = {
  input: "#ff2d75",
  hidden: "#7b68ee",
  output: "#00d4ff"
}, je = 36, Nn = 100, Zr = 200, ka = 50, Qr = 60, $g = `
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;
class Sg extends I {
  constructor() {
    super(...arguments);
    O(this, "_svg", null);
    O(this, "_container", null);
    O(this, "_hasAnimated", !1);
    O(this, "_isAnimating", !1);
    O(this, "_resizeObserver", null);
    O(this, "_timeline", null);
  }
  static get observedAttributes() {
    return ["layers", "names", "animate", "speed"];
  }
  get _layers() {
    return this.jsonAttr("layers", [["x₁", "x₂"], ["h₁", "h₂", "h₃"], ["ŷ"]]);
  }
  get _names() {
    return this.jsonAttr("names", []);
  }
  get _animateMode() {
    return this.getAttribute("animate") || "none";
  }
  get _speed() {
    const e = parseInt(this.getAttribute("speed") || "", 10);
    return isNaN(e) ? 600 : e;
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles($g), this._container = document.createElement("div"), this.root.appendChild(this._container), this._initSvg(), this._render(), this._resizeObserver = new ResizeObserver(() => {
      this._isAnimating || this._render();
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = null, this._cancelAnimation();
  }
  attributeChangedCallback(e, r, i) {
    r !== i && this._svg && (this._cancelAnimation(), this._hasAnimated = !1, this._render());
  }
  animateIn(e) {
    if (!this._hasAnimated) {
      if (e || this._animateMode === "none") {
        this._hasAnimated = !0, this._render();
        return;
      }
      this._runAnimation();
    }
  }
  // ---------------------------------------------------------------------------
  // SVG setup
  // ---------------------------------------------------------------------------
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = G(e);
    const r = this._svg.append("defs"), i = {
      input: ke.input,
      hidden: ke.hidden,
      output: ke.output
    };
    for (const [s, a] of Object.entries(i))
      r.append("filter").attr("id", `glow-${s}`).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%").append("feDropShadow").attr("dx", 0).attr("dy", 0).attr("stdDeviation", 6).attr("flood-color", a).attr("flood-opacity", 0.7);
    this._svg.append("g").attr("class", "connections-group"), this._svg.append("g").attr("class", "nodes-group"), this._svg.append("g").attr("class", "labels-group");
  }
  // ---------------------------------------------------------------------------
  // Layout computation
  // ---------------------------------------------------------------------------
  _computeLayout() {
    const e = this._layers, r = this.isRtl, i = e.length, s = Math.max(...e.map((u) => u.length), 1), a = (i - 1) * Zr + Qr * 2, o = (s - 1) * Nn + ka + je + 40, c = [], l = [];
    for (let u = 0; u < i; u++) {
      const h = e[u], f = r ? a - Qr - u * Zr : Qr + u * Zr, d = (h.length - 1) * Nn, _ = ka + ((s - 1) * Nn - d) / 2, p = [];
      for (let v = 0; v < h.length; v++)
        p.push({
          layer: u,
          index: v,
          x: f,
          y: _ + v * Nn,
          label: h[v]
        });
      c.push(p);
    }
    for (let u = 0; u < i - 1; u++)
      for (const h of c[u])
        for (const f of c[u + 1])
          l.push({ source: h, target: f });
    return { nodes: c, connections: l, width: a, height: o };
  }
  _layerColor(e, r) {
    const i = getComputedStyle(this).getPropertyValue("--lv-net-input").trim() || ke.input, s = getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim() || ke.hidden, a = getComputedStyle(this).getPropertyValue("--lv-net-output").trim() || ke.output;
    return e === 0 ? i : e === r - 1 ? a : s;
  }
  _layerType(e, r) {
    return e === 0 ? "input" : e === r - 1 ? "output" : "hidden";
  }
  // ---------------------------------------------------------------------------
  // Render (static)
  // ---------------------------------------------------------------------------
  _render() {
    if (!this._svg) return;
    const { nodes: e, connections: r, width: i, height: s } = this._computeLayout(), a = e.length, o = this._animateMode === "none" || this._hasAnimated, c = this._animateMode !== "none" && !this._hasAnimated;
    this._svg.attr("viewBox", `0 0 ${i} ${s}`);
    const l = this._svg.select(".connections-group");
    l.selectAll("*").remove();
    for (const d of r)
      l.append("line").attr("class", "connection").attr("x1", d.source.x).attr("y1", d.source.y).attr("x2", d.target.x).attr("y2", d.target.y).attr("stroke", "var(--lv-border, #2a2a4a)").attr("stroke-width", 1.5).attr("stroke-opacity", c ? 0.08 : 0.5).attr("data-source-layer", d.source.layer).attr("data-target-layer", d.target.layer);
    const u = this._svg.select(".nodes-group");
    u.selectAll("*").remove();
    for (const d of e)
      for (const _ of d) {
        const p = this._layerColor(_.layer, a), v = this._layerType(_.layer, a), b = u.append("g").attr("class", "node").attr("data-layer", _.layer).attr("data-index", _.index).attr("transform", `translate(${_.x},${_.y})`).attr("opacity", c ? 0.15 : 1);
        b.append("circle").attr("class", "node-circle").attr("data-layer", _.layer).attr("r", je).attr("fill", p).attr("stroke", p).attr("stroke-width", 2).attr("fill-opacity", o ? 0.2 : c ? 0.05 : 0.2), o && b.attr("filter", `url(#glow-${v})`), b.append("text").attr("class", "node-label").text(_.label);
      }
    const h = this._svg.select(".labels-group");
    h.selectAll("*").remove();
    const f = this._names;
    for (let d = 0; d < e.length; d++) {
      if (!f[d]) continue;
      const _ = e[d][0];
      h.append("text").attr("class", "label").attr("x", _.x).attr("y", _.y - je - 16).text(f[d]);
    }
  }
  // ---------------------------------------------------------------------------
  // Query helpers for GSAP targets (real DOM elements)
  // ---------------------------------------------------------------------------
  /** Returns arrays of node <g> elements grouped by layer index, in order. */
  _getLayerNodeGroups() {
    const e = this._layers.length, r = [];
    for (let i = 0; i < e; i++) {
      const s = Array.from(
        this.root.querySelectorAll(`.node[data-layer="${i}"]`)
      );
      r.push(s);
    }
    return r;
  }
  /** Returns connection <line> elements between two layers (by source/target layer index). */
  _getConnectionElements(e, r) {
    return Array.from(
      this.root.querySelectorAll(
        `.connection[data-source-layer="${e}"][data-target-layer="${r}"]`
      )
    );
  }
  // ---------------------------------------------------------------------------
  // Animation (GSAP timeline)
  // ---------------------------------------------------------------------------
  _cancelAnimation() {
    var e;
    (e = this._timeline) == null || e.kill(), this._timeline = null, this._isAnimating = !1;
  }
  _runAnimation() {
    if (!this._svg) return;
    this._cancelAnimation(), this._isAnimating = !0, this._render();
    const { nodes: e } = this._computeLayout(), r = e.length, i = this._animateMode, s = this._speed, a = i === "backprop", o = a ? "#ff2d75" : "#00d4ff", c = s / 600, l = a ? Array.from({ length: r }, (f, d) => r - 1 - d) : Array.from({ length: r }, (f, d) => d), u = this._getLayerNodeGroups(), h = rn.timeline({
      onComplete: () => {
        this._isAnimating = !1, this._hasAnimated = !0, this.root.querySelectorAll(".node").forEach((_) => {
          const p = parseInt(_.getAttribute("data-layer") || "0", 10), v = this._layerType(p, r);
          rn.set(_, { opacity: 1 }), _.setAttribute("filter", `url(#glow-${v})`);
          const b = _.querySelector("circle");
          b && rn.set(b, { attr: { "fill-opacity": 0.2 } });
        }), this.root.querySelectorAll(".connection").forEach((_) => {
          rn.set(_, { attr: { "stroke-opacity": 0.5 } }), _.setAttribute("stroke", "var(--lv-border, #2a2a4a)");
        });
      }
    });
    this._timeline = h, h.addLabel("start", 0.15), l.forEach((f, d) => {
      const _ = this._layerType(f, r), p = u[f];
      if (!p || p.length === 0) return;
      const v = p.map((x) => x.querySelector(".node-circle")).filter(Boolean), b = `layer-${d}`, y = 0.15 + d * (0.4 * c);
      if (h.addLabel(b, y), h.to(p, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, b), h.call(() => {
        p.forEach((x) => {
          x.setAttribute("filter", `url(#glow-${_})`);
        });
      }, [], b), h.to(v, {
        attr: { r: je * 1.15 },
        duration: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, b), h.to(v, {
        attr: { r: je },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.inOut"
      }, `${b}+=0.2`), h.to(v, {
        attr: { "fill-opacity": 0.35 },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, b), h.to(v, {
        attr: { "fill-opacity": 0.2 },
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      }, `${b}+=0.3`), d < l.length - 1) {
        const x = l[d + 1], g = Math.min(f, x), m = Math.max(f, x), w = this._getConnectionElements(g, m);
        w.length > 0 && (h.to(w, {
          attr: { "stroke-opacity": 0.5 },
          stroke: o,
          duration: 0.25,
          stagger: 0.02,
          ease: "power2.out"
        }, `${b}+=0.15`), h.to(w, {
          stroke: "var(--lv-border, #2a2a4a)",
          attr: { "stroke-opacity": 0.35 },
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.inOut"
        }, `${b}+=0.35`));
      }
    });
  }
}
customElements.define("lv-network", Sg);
const Aa = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Tg = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .node-rect {
    fill: var(--lv-bg-raised, #1e1e3a);
    stroke: var(--lv-border, #2a2a4a);
    stroke-width: 1.5;
    rx: 6;
    cursor: pointer;
    transition: fill 0.2s, stroke 0.2s;
  }
  .node-rect:hover {
    stroke: var(--lv-accent, #3b82f6);
    fill: var(--lv-bg-card, #252550);
  }
  .node-rect.has-children { cursor: pointer; }
  .node-rect.leaf { cursor: default; }
  .node-label {
    fill: var(--lv-text, #e4e4ec);
    font-size: 12px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }
  .link {
    fill: none;
    stroke: var(--lv-border, #2a2a4a);
    stroke-width: 1.5;
  }
  .collapse-indicator {
    fill: var(--lv-text-dim, #888);
    font-size: 10px;
    text-anchor: middle;
    pointer-events: none;
  }
`, Ut = 120, Ke = 32, Rn = 40;
class Mg extends I {
  constructor() {
    super(...arguments);
    O(this, "_data", null);
    O(this, "_hasAnimated", !1);
    O(this, "_svg", null);
    O(this, "_container", null);
    O(this, "_root", null);
  }
  static get observedAttributes() {
    return ["data", "orientation"];
  }
  get _orientation() {
    return this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical";
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Tg), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", { label: "root" }), this._initSvg(), this._buildHierarchy(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  attributeChangedCallback(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", { label: "root" }), this._buildHierarchy()), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = G(e), this._svg.append("g").attr("class", "links-group"), this._svg.append("g").attr("class", "nodes-group");
  }
  _buildHierarchy() {
    this._data && (this._root = lr(this._data));
  }
  _getVisibleNodes() {
    if (!this._root) return [];
    const e = [], r = (i) => {
      if (e.push(i), !i._collapsed && i.children)
        for (const s of i.children) r(s);
    };
    return r(this._root), e;
  }
  _toggleCollapse(e) {
    !e.data.children || e.data.children.length === 0 || (e._collapsed ? (e._collapsed = !1, e.children = e._children || []) : (e._collapsed = !0, e._children = e.children, e.children = void 0), this._render(!0));
  }
  _render(e) {
    if (!this._svg || !this._root) return;
    const r = this._orientation === "horizontal", i = /* @__PURE__ */ new Map(), s = (C, T) => {
      if (i.set(T, { collapsed: !!C._collapsed, _children: C._children }), C._collapsed && C._children)
        for (let S = 0; S < C._children.length; S++)
          s(C._children[S], `${T}/${S}`);
      if (C.children)
        for (let S = 0; S < C.children.length; S++)
          s(C.children[S], `${T}/${S}`);
    };
    s(this._root, "0"), this._root = lr(this._data);
    const a = (C, T) => {
      const S = i.get(T);
      if (S != null && S.collapsed && (C._collapsed = !0, C._children = C.children, C.children = void 0), C.children)
        for (let M = 0; M < C.children.length; M++)
          a(C.children[M], `${T}/${M}`);
    };
    a(this._root, "0");
    const o = this._getVisibleNodes(), c = o.filter((C) => !C.children || C.children.length === 0).length, l = Un(o, (C) => C.depth) || 0, u = Ke + 20, h = Ut + 60;
    let f, d;
    r ? (f = l * h, d = Math.max((c - 1) * u, u)) : (f = Math.max((c - 1) * (Ut + 80), Ut + 80), d = l * h), ip().size(r ? [d, f] : [f, d]).separation((C, T) => C.parent === T.parent ? 1.5 : 2)(this._root);
    const p = this._root.descendants(), v = this._root.links(), b = f + Rn * 2 + Ut, y = d + Rn * 2 + Ke;
    this._svg.attr("viewBox", `0 0 ${b} ${y}`);
    const x = Rn + Ut / 2, g = Rn + Ke / 2, m = (C) => r ? C.y + x : C.x + x, w = (C) => r ? C.x + g : C.y + g, $ = this._svg.select(".links-group");
    $.selectAll("*").remove();
    const A = r ? Dp().x((C) => C.y + x).y((C) => C.x + g) : Ip().x((C) => C.x + x).y((C) => C.y + g);
    for (let C = 0; C < v.length; C++) {
      const T = v[C], S = $.append("path").attr("class", "link").attr("d", A(T));
      if (e) {
        const M = S.node().getTotalLength();
        S.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().delay(C * 60 + 100).duration(500).ease(_t).attr("stroke-dashoffset", 0);
      }
    }
    const k = this._svg.select(".nodes-group");
    k.selectAll("*").remove();
    for (let C = 0; C < p.length; C++) {
      const T = p[C], S = m(T), M = w(T), E = T.data.children && T.data.children.length > 0, P = !!T._collapsed, L = T.depth % Aa.length, D = getComputedStyle(this).getPropertyValue(`--lv-chart-${L}`).trim() || Aa[L], B = k.append("g").attr("transform", `translate(${S},${M})`);
      e && B.attr("opacity", 0).transition().delay(C * 60).duration(400).ease(_t).attr("opacity", 1);
      const F = B.append("rect").attr("class", `node-rect ${E ? "has-children" : "leaf"}`).attr("x", -Ut / 2).attr("y", -Ke / 2).attr("width", Ut).attr("height", Ke).attr("stroke", D);
      B.append("text").attr("class", "node-label").text(T.data.label), E && B.append("text").attr("class", "collapse-indicator").attr("x", Ut / 2 - 12).attr("y", 0).text(P ? "+" : "−"), E && (F.on("click", () => {
        this._toggleCollapse(T);
      }), B.select(".collapse-indicator").on("click", () => {
        this._toggleCollapse(T);
      }));
    }
  }
}
customElements.define("lv-tree", Mg);
export {
  I as LvBaseElement,
  vl as clamp,
  xl as colorScale,
  bl as formatNum,
  Og as getToken,
  Xe as lerp,
  ps as scrollAnimator,
  Lg as setTheme,
  Pg as simColorScale,
  zg as uid
};

var Gl = Object.defineProperty;
var zs = (r) => {
  throw TypeError(r);
};
var Wl = (r, e, t) => e in r ? Gl(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var z = (r, e, t) => Wl(r, typeof e != "symbol" ? e + "" : e, t), Is = (r, e, t) => e.has(r) || zs("Cannot " + t);
var Te = (r, e, t) => (Is(r, e, "read from private field"), t ? t.call(r) : e.get(r)), Rn = (r, e, t) => e.has(r) ? zs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Le = (r, e, t, n) => (Is(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t);
import eo from "roughjs";
import * as H from "three";
import { OrbitControls as no } from "three/examples/jsm/controls/OrbitControls.js";
var je, In;
class Ul {
  constructor() {
    Rn(this, je);
    Rn(this, In, /* @__PURE__ */ new WeakSet());
    Le(this, je, new IntersectionObserver((e) => {
      for (const t of e)
        if (t.isIntersecting && !Te(this, In).has(t.target)) {
          Te(this, In).add(t.target);
          const n = window.matchMedia("(prefers-reduced-motion: reduce)").matches, i = t.target;
          typeof i.animateIn == "function" && (n ? i.animateIn(!0) : i.animateIn(!1));
        }
    }, { threshold: 0.15 }));
  }
  observe(e) {
    Te(this, je).observe(e);
  }
  unobserve(e) {
    Te(this, je).unobserve(e);
  }
}
je = new WeakMap(), In = new WeakMap();
const Fs = new Ul();
var te;
class R extends HTMLElement {
  constructor() {
    super();
    // Shadow root setup
    z(this, "root");
    // Re-entrance guard — prevents attributeChangedCallback → _render → attributeChangedCallback loops
    Rn(this, te, !1);
    this.root = this.attachShadow({ mode: "open" });
  }
  // Auto-detect direction from DOM ancestors
  get dir() {
    var t;
    return ((t = this.closest("[dir]")) == null ? void 0 : t.getAttribute("dir")) || document.documentElement.dir || "ltr";
  }
  get isRtl() {
    return this.dir === "rtl";
  }
  // Adopt stylesheets helper
  adoptStyles(t) {
    const n = new CSSStyleSheet();
    n.replaceSync(t), this.root.adoptedStyleSheets = [...this.root.adoptedStyleSheets, n];
  }
  // Parse JSON attribute safely
  jsonAttr(t, n) {
    const i = this.getAttribute(t);
    if (!i) return n;
    const s = i.replace(/\u2212/g, "-");
    try {
      return JSON.parse(s);
    } catch {
      return n;
    }
  }
  // Render helper using innerHTML
  render(t) {
    Le(this, te, !0), this.root.innerHTML = t, Le(this, te, !1);
  }
  // Base attributeChangedCallback with re-entrance protection
  // Subclasses override handleAttributeChange() instead
  attributeChangedCallback(t, n, i) {
    Te(this, te) || (Le(this, te, !0), this.handleAttributeChange(t, n, i), Le(this, te, !1));
  }
  // Override this in subclasses instead of attributeChangedCallback
  handleAttributeChange(t, n, i) {
  }
  // Called by ScrollAnimator when element enters viewport
  animateIn(t) {
  }
  connectedCallback() {
    Fs.observe(this);
  }
  disconnectedCallback() {
    Fs.unobserve(this);
  }
}
te = new WeakMap();
function tn(r, e, t) {
  return r + (e - r) * t;
}
function Kl(r, e, t) {
  return Math.min(Math.max(r, e), t);
}
function Zl(r) {
  r = Kl(r, 0, 1);
  const e = r < 0.5 ? Math.round(tn(0, 255, r * 2)) : 255, t = r < 0.5 ? Math.round(tn(200, 230, r * 2)) : Math.round(tn(230, 50, (r - 0.5) * 2)), n = r < 0.5 ? Math.round(tn(83, 60, r * 2)) : Math.round(tn(60, 80, (r - 0.5) * 2));
  return `rgb(${e},${t},${n})`;
}
function N_(r) {
  return Zl((1 - r) / 2);
}
function Jl(r) {
  return Number.isInteger(r) ? r.toString() : Math.abs(r) >= 100 ? r.toFixed(0) : Math.abs(r) >= 1 ? r.toFixed(1) : r.toFixed(2);
}
let Ql = 0;
function R_(r = "lv") {
  return `${r}-${++Ql}`;
}
const Xr = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map();
function tc(r) {
  let e = Xr.get(r);
  return e || (e = new Promise((t, n) => {
    const i = document.createElement("script");
    i.src = r, i.onload = () => t(), i.onerror = () => {
      Xr.delete(r), n(new Error(`Failed to load ${r}`));
    }, document.head.appendChild(i);
  }), Xr.set(r, e), e);
}
function D_(r) {
  let e = Yr.get(r);
  return e || (e = new Promise((t, n) => {
    const i = document.createElement("link");
    i.rel = "stylesheet", i.href = r, i.onload = () => t(), i.onerror = () => {
      Yr.delete(r), n(new Error(`Failed to load ${r}`));
    }, document.head.appendChild(i);
  }), Yr.set(r, e), e);
}
function O_(r, e) {
  const t = e || document.documentElement;
  return getComputedStyle(t).getPropertyValue(`--lv-${r}`).trim();
}
function B_(r, e) {
  r.setAttribute("data-theme", e);
}
const ec = (
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

  :host([theme="cyberpunk"]) { color-scheme: dark; }
  :host([theme="academic"])  { color-scheme: dark; }
  :host([theme="forest"])    { color-scheme: dark; }
`
);
class nc extends R {
  static get observedAttributes() {
    return ["theme", "dir"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ec), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const e = this.getAttribute("dir") || "ltr";
    this.setAttribute("dir", e);
    const t = this.getAttribute("theme") || "dark";
    this.setAttribute("data-theme", t), this.render("<slot></slot>");
  }
}
customElements.define("lv-page", nc);
const rc = (
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
    color: var(--lv-text-dim);
  }
`
);
class ic extends R {
  static get observedAttributes() {
    return ["number", "title", "subtitle", "gradient"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(rc), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const e = this.getAttribute("number") || "", t = this.getAttribute("title") || "", n = this.getAttribute("subtitle") || "", i = this.getAttribute("gradient") || "", s = i ? `background: ${i};` : "";
    this.render(`
      <div class="hero" style="${s}">
        ${e ? `<div class="number">${e}</div>` : ""}
        <div class="content">
          <h1>${t}</h1>
          ${n ? `<p class="subtitle">${n}</p>` : ""}
        </div>
      </div>
    `);
  }
}
customElements.define("lv-hero", ic);
const sc = (
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
class ac extends R {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(sc), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const e = this.getAttribute("title") || "";
    this.render(`
      ${e ? `<h2>${e}</h2>` : ""}
      <slot></slot>
    `);
  }
}
customElements.define("lv-section", ac);
const oc = (
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
class lc extends R {
  static get observedAttributes() {
    return ["variant"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(oc), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    this.root.querySelector(".card") || this.render('<div class="card"><slot></slot></div>');
  }
}
customElements.define("lv-card", lc);
const cc = (
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
class dc extends R {
  static get observedAttributes() {
    return ["cols", "gap"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(cc), this._render();
  }
  handleAttributeChange() {
    this.root.querySelector(".grid") || this._render();
  }
  _render() {
    this.render('<div class="grid"><slot></slot></div>');
  }
}
customElements.define("lv-grid", dc);
const hc = (
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
class uc extends R {
  static get observedAttributes() {
    return ["label", "active"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(hc), this.render("<slot></slot>"), this.setAttribute("role", "tabpanel");
  }
  handleAttributeChange() {
  }
}
customElements.define("lv-tab", uc);
const fc = (
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
    color: var(--lv-text-dim);
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
class pc extends R {
  constructor() {
    super(...arguments);
    z(this, "_tabs", []);
    z(this, "_buttons", []);
    z(this, "_activeIndex", 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(fc), requestAnimationFrame(() => this._setup());
  }
  _setup() {
    if (this._tabs = Array.from(this.querySelectorAll("lv-tab")), this._tabs.length === 0) return;
    const t = this._tabs.findIndex((s) => s.hasAttribute("active"));
    this._activeIndex = t >= 0 ? t : 0;
    const n = this._tabs.map((s, a) => {
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
      <div class="tablist" role="tablist">${n}</div>
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
  _activate(t) {
    this._activeIndex = t, this._buttons.forEach((n, i) => {
      const s = i === t;
      n.setAttribute("aria-selected", String(s)), n.setAttribute("tabindex", s ? "0" : "-1");
    }), this._tabs.forEach((n, i) => {
      i === t ? n.setAttribute("active", "") : n.removeAttribute("active");
    });
  }
}
customElements.define("lv-tabs", pc);
const gc = (
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
class mc extends R {
  static get observedAttributes() {
    return ["prev", "prev-label", "next", "next-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(gc), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const e = this.getAttribute("prev") || "", t = this.getAttribute("prev-label") || "Previous", n = this.getAttribute("next") || "", i = this.getAttribute("next-label") || "Next", s = this.isRtl, a = s ? "→" : "←", o = s ? "←" : "→";
    this.render(`
      <nav class="nav">
        <a class="prev" href="${e}">
          <span class="arrow">${a}</span>
          ${t}
        </a>
        <a class="next" href="${n}">
          ${i}
          <span class="arrow">${o}</span>
        </a>
      </nav>
    `);
  }
}
customElements.define("lv-nav", mc);
const _c = (
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
class vc extends R {
  static get observedAttributes() {
    return ["vs"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(_c), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const e = this.getAttribute("vs"), t = e !== null, n = e || "VS";
    t ? this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${n}</div>
          <slot name="right"></slot>
        </div>
      `) : this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `);
  }
}
customElements.define("lv-comparison", vc);
const bc = `
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
`, xc = `
  <div class="val"></div>
  <div class="label"></div>
`;
class yc extends R {
  constructor() {
    super(...arguments);
    z(this, "_observer", null);
    z(this, "_animFrame", null);
  }
  static get observedAttributes() {
    return ["value", "label", "prefix", "suffix", "color", "animated"];
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), this._animFrame !== null && (cancelAnimationFrame(this._animFrame), this._animFrame = null), (t = this._observer) == null || t.disconnect(), this._observer = null;
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(bc), this.render(xc), this._update(), this._setupObserver();
  }
  handleAttributeChange(t, n, i) {
    this.root.querySelector(".val") && this._update();
  }
  _update() {
    const t = this.getAttribute("color");
    t && (this.style.setProperty("--_color", t), this.style.setProperty("--_glow", t));
    const n = this.root.querySelector(".label");
    n && (n.textContent = this.getAttribute("label") || "");
    const i = this.root.querySelector(".val");
    if (i) {
      const s = this.getAttribute("prefix") || "", a = this.getAttribute("suffix") || "", o = this.getAttribute("value") || "";
      i.textContent = s + o + a;
    }
  }
  _setupObserver() {
    this.hasAttribute("animated") && (this._observer = new IntersectionObserver(
      (t) => {
        var n;
        for (const i of t)
          i.isIntersecting && (this.animateIn(!1), (n = this._observer) == null || n.unobserve(this));
      },
      { threshold: 0.1 }
    ), this._observer.observe(this));
  }
  animateIn(t) {
    if (!this.hasAttribute("animated") || t) return;
    const n = parseFloat(this.getAttribute("value") || "0");
    if (isNaN(n)) return;
    const i = 1200, s = performance.now(), a = this.root.querySelector(".val"), o = (c) => {
      const l = Math.min((c - s) / i, 1), d = 1 - Math.pow(1 - l, 3), h = n * d;
      a.textContent = (this.getAttribute("prefix") || "") + Jl(h) + (this.getAttribute("suffix") || ""), l < 1 && (this._animFrame = requestAnimationFrame(o));
    };
    this._animFrame = requestAnimationFrame(o);
  }
}
customElements.define("lv-metric", yc);
const qs = {
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
}, wc = `
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
class kc extends R {
  static get observedAttributes() {
    return ["type", "title"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles(wc), this._render();
  }
  handleAttributeChange(e, t, n) {
    this.root.querySelector(".callout") && this._render();
  }
  _getType() {
    const e = this.getAttribute("type");
    return qs[e] ? e : "info";
  }
  _render() {
    const e = this._getType(), t = qs[e], n = this.getAttribute("title") || "";
    this.style.setProperty("--_type-color", t.color), this.style.setProperty("--_type-bg", `color-mix(in srgb, ${t.color} 8%, transparent)`);
    const i = `
      <div class="callout" role="note">
        <div class="header">
          ${t.icon}
          ${n ? `<span class="title">${n}</span>` : ""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
    this.render(i);
  }
}
customElements.define("lv-callout", kc);
const $c = `
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
`, Ac = `
  <span class="badge"><slot></slot></span>
`;
class Sc extends R {
  static get observedAttributes() {
    return ["color", "variant"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles($c), this.render(Ac), this._updateColor();
  }
  handleAttributeChange(e, t, n) {
    e === "color" && this._updateColor();
  }
  _updateColor() {
    const e = this.getAttribute("color");
    e ? this.style.setProperty("--_color", e) : this.style.removeProperty("--_color");
  }
}
customElements.define("lv-badge", Sc);
const Cc = `
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`, ro = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css", Mc = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
let Dn = null;
function Ec() {
  return window.katex ? Promise.resolve() : Dn || (Dn = new Promise((r, e) => {
    const t = document.createElement("link");
    t.rel = "stylesheet", t.href = ro, document.head.appendChild(t);
    const n = document.createElement("script");
    n.src = Mc, n.onload = () => r(), n.onerror = () => e(new Error("Failed to load KaTeX")), document.head.appendChild(n);
  }), Dn);
}
class Tc extends R {
  constructor() {
    super(...arguments);
    z(this, "_source", "");
  }
  connectedCallback() {
    var t, n;
    (t = super.connectedCallback) == null || t.call(this), this._source = ((n = this.textContent) == null ? void 0 : n.trim()) || "", this.adoptStyles(Cc), this._render();
  }
  async _render() {
    try {
      await Ec();
      const t = this.hasAttribute("display"), n = window.katex.renderToString(this._source, {
        displayMode: t,
        throwOnError: !1
      });
      this.root.innerHTML = `<link rel="stylesheet" href="${ro}"><span class="katex-container">${n}</span>`;
    } catch {
      this.root.innerHTML = `<span class="fallback">${this._escapeHtml(this._source)}</span>`;
    }
  }
  _escapeHtml(t) {
    const n = document.createElement("span");
    return n.textContent = t, n.innerHTML;
  }
}
customElements.define("lv-math", Tc);
const Lc = `
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
`, Pc = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js", io = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";
let On = null;
function zc() {
  return window.hljs ? Promise.resolve() : On || (On = new Promise((r, e) => {
    const t = document.createElement("link");
    t.rel = "stylesheet", t.href = io, document.head.appendChild(t);
    const n = document.createElement("script");
    n.src = Pc, n.onload = () => r(), n.onerror = () => e(new Error("Failed to load highlight.js")), document.head.appendChild(n);
  }), On);
}
class Ic extends R {
  constructor() {
    super(...arguments);
    z(this, "_source", "");
  }
  static get observedAttributes() {
    return ["language", "line-numbers"];
  }
  connectedCallback() {
    var t, n;
    (t = super.connectedCallback) == null || t.call(this), this._source = ((n = this.textContent) == null ? void 0 : n.trim()) || "", this.adoptStyles(Lc), this._render();
  }
  async _render() {
    const t = this.getAttribute("language") || "", n = this.hasAttribute("line-numbers");
    let i;
    try {
      await zc();
      const a = window.hljs;
      t && a.getLanguage(t) ? i = a.highlight(this._source, { language: t }).value : i = a.highlightAuto(this._source).value;
    } catch {
      i = this._escapeHtml(this._source);
    }
    let s;
    n ? s = i.split(`
`).map((o, c) => `<span class="line-num">${c + 1}</span>${o}`).join(`
`) : s = i, this.root.innerHTML = `<link rel="stylesheet" href="${io}"><div class="code-block"><pre><code>${s}</code></pre></div>`;
  }
  _escapeHtml(t) {
    const n = document.createElement("span");
    return n.textContent = t, n.innerHTML;
  }
}
customElements.define("lv-code", Ic);
const Fc = `
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
class qc extends R {
  static get observedAttributes() {
    return ["data", "labels", "highlight"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles(Fc), this._render();
  }
  handleAttributeChange() {
    this.root && this._render();
  }
  _render() {
    var h;
    const e = this.jsonAttr("data", []), t = this.jsonAttr("labels", {}), n = this.jsonAttr("highlight", []);
    if (!e.length) {
      this.root.innerHTML = "";
      return;
    }
    const i = e.length, s = ((h = e[0]) == null ? void 0 : h.length) || 0, a = !!(t.rows && t.rows.length), o = !!(t.cols && t.cols.length), c = new Set(n.map(([u, f]) => `${u},${f}`)), l = a ? `auto repeat(${s}, auto)` : `repeat(${s}, auto)`;
    let d = '<div class="matrix-wrapper">';
    if (o) {
      const u = a ? `auto repeat(${s}, auto)` : `repeat(${s}, auto)`;
      d += `<div class="col-labels" style="grid-template-columns: ${u}">`, a && (d += "<span></span>");
      for (let f = 0; f < s; f++)
        d += `<span class="col-label">${this._escapeHtml(t.cols[f] || "")}</span>`;
      d += "</div>";
    }
    d += `<div class="matrix" style="grid-template-columns: ${l}">`, d += '<div class="bracket-left"></div>', d += '<div class="bracket-right"></div>';
    for (let u = 0; u < i; u++) {
      a && (d += `<span class="row-label">${this._escapeHtml(t.rows[u] || "")}</span>`);
      for (let f = 0; f < s; f++) {
        const g = e[u][f], p = typeof g == "number" ? this._formatNum(g) : String(g), m = c.has(`${u},${f}`);
        d += `<span class="cell${m ? " highlight" : ""}">${p}</span>`;
      }
    }
    d += "</div></div>", this.root.innerHTML = d;
  }
  _formatNum(e) {
    return e.toFixed(3).replace(/0$/, "");
  }
  _escapeHtml(e) {
    const t = document.createElement("span");
    return t.textContent = e, t.innerHTML;
  }
}
customElements.define("lv-matrix", qc);
const Nc = `
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
class Rc extends R {
  constructor() {
    super(...arguments);
    z(this, "_sortState", { column: "", direction: "none" });
    z(this, "_currentPage", 0);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "columns", "sortable", "show-stats", "page-size", "striped"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Nc), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".table-container");
    n && (n.style.opacity = "0", n.style.transform = "translateY(10px)", n.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1", n.style.transform = "translateY(0)";
    }));
  }
  _build() {
    const t = this.jsonAttr("data", []), n = this.hasAttribute("sortable"), i = this.hasAttribute("show-stats"), s = parseInt(this.getAttribute("page-size") || "0", 10), a = this.hasAttribute("striped");
    if (!t.length) {
      this.render('<div class="table-container"><table><tbody><tr><td style="padding:20px;text-align:center;color:var(--lv-text-dim)">No data</td></tr></tbody></table></div>');
      return;
    }
    let o = this.jsonAttr("columns", []);
    o.length || (o = Object.keys(t[0]));
    const c = /* @__PURE__ */ new Set();
    for (const x of o)
      t.every((_) => {
        const w = _[x];
        return w == null || typeof w == "number" || typeof w == "string" && w !== "" && !isNaN(Number(w));
      }) && c.add(x);
    let l = [...t];
    if (n && this._sortState.direction !== "none" && this._sortState.column) {
      const x = this._sortState.column, v = this._sortState.direction === "asc" ? 1 : -1, _ = c.has(x);
      l.sort((w, k) => {
        const $ = w[x], A = k[x];
        return $ == null && A == null ? 0 : $ == null ? 1 : A == null ? -1 : _ ? (Number($) - Number(A)) * v : String($).localeCompare(String(A)) * v;
      });
    }
    const d = l.length, h = s > 0 ? Math.ceil(d / s) : 1;
    this._currentPage >= h && (this._currentPage = Math.max(0, h - 1));
    const u = s > 0 ? l.slice(this._currentPage * s, (this._currentPage + 1) * s) : l;
    let f = "<tr>";
    for (const x of o) {
      const v = this._getSortArrow(x);
      f += `<th${n ? ' class="sortable"' : ""} data-col="${this._esc(x)}">${this._esc(x)}${v}</th>`;
    }
    f += "</tr>";
    let g = "";
    for (const x of u) {
      g += "<tr>";
      for (const v of o) {
        const _ = x[v], w = c.has(v), k = w ? ' class="num-cell"' : "", $ = this._formatValue(_, w);
        g += `<td${k}>${$}</td>`;
      }
      g += "</tr>";
    }
    let p = "";
    if (i) {
      p = "<tfoot><tr>";
      for (const x of o)
        if (c.has(x)) {
          const v = t.map(($) => Number($[x])).filter(($) => !isNaN($)), _ = v.reduce(($, A) => $ + A, 0) / v.length, w = Math.min(...v), k = Math.max(...v);
          p += `<td class="num-cell">${this._fmtSig(_)} (${this._fmtSig(w)}..${this._fmtSig(k)})</td>`;
        } else {
          const v = new Set(t.map((_) => _[x])).size;
          p += `<td>${v} unique</td>`;
        }
      p += "</tr></tfoot>";
    }
    let m = "";
    s > 0 && h > 1 && (m = `<div class="page-controls">
        <button class="page-btn" data-action="prev" ${this._currentPage === 0 ? "disabled" : ""}>Prev</button>
        <span>Page ${this._currentPage + 1} of ${h}</span>
        <button class="page-btn" data-action="next" ${this._currentPage >= h - 1 ? "disabled" : ""}>Next</button>
      </div>`);
    const b = a ? " striped" : "";
    this.render(`<div class="table-container${b}">
      <table>
        <thead>${f}</thead>
        <tbody>${g}</tbody>
        ${p}
      </table>
      ${m}
    </div>`), n && this.root.querySelectorAll("th.sortable").forEach((x) => {
      x.addEventListener("click", () => {
        const v = x.dataset.col || "";
        this._toggleSort(v);
      });
    }), s > 0 && this.root.querySelectorAll(".page-btn").forEach((x) => {
      x.addEventListener("click", () => {
        const v = x.dataset.action;
        v === "prev" && this._currentPage > 0 ? (this._currentPage--, this._build()) : v === "next" && this._currentPage < h - 1 && (this._currentPage++, this._build());
      });
    });
  }
  _toggleSort(t) {
    this._sortState.column === t ? this._sortState.direction === "asc" ? this._sortState.direction = "desc" : this._sortState.direction === "desc" ? this._sortState = { column: "", direction: "none" } : this._sortState = { column: t, direction: "asc" } : this._sortState = { column: t, direction: "asc" }, this._currentPage = 0, this._build();
  }
  _getSortArrow(t) {
    return this._sortState.column !== t || this._sortState.direction === "none" ? '<span class="sort-arrow">▲</span>' : `<span class="sort-arrow active">${this._sortState.direction === "asc" ? "▲" : "▼"}</span>`;
  }
  _formatValue(t, n) {
    return t == null ? '<span style="color:var(--lv-text-dim)">-</span>' : n ? this._fmtSig(Number(t)) : this._esc(String(t));
  }
  _fmtSig(t) {
    return isNaN(t) ? "-" : Number.isInteger(t) && Math.abs(t) < 1e6 ? String(t) : parseFloat(t.toPrecision(4)).toString();
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-data-table", Rc);
const Dc = (
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
class Oc extends R {
  constructor() {
    super(...arguments);
    z(this, "_answered", !1);
  }
  static get observedAttributes() {
    return ["question", "options", "correct", "explanation"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Dc), this._render(), this._attachListeners();
  }
  handleAttributeChange() {
    this._answered || (this._render(), this._attachListeners());
  }
  get _options() {
    return this.jsonAttr("options", []);
  }
  get _correctIndex() {
    return parseInt(this.getAttribute("correct") || "0", 10);
  }
  _render() {
    const t = this.getAttribute("question") || "", n = this._options, i = this.getAttribute("explanation") || "", s = (o) => o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), a = n.map((o, c) => `
      <div class="option" role="radio" aria-checked="false" tabindex="0" data-index="${c}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${s(o)}</span>
      </div>
    `).join("");
    this.render(`
      <div class="question">${s(t)}</div>
      <div class="options" role="group" aria-label="${s(t)}">${a}</div>
      ${i ? `<div class="explanation"><div class="explanation-inner">${s(i)}</div></div>` : ""}
    `);
  }
  _attachListeners() {
    this.root.querySelectorAll(".option").forEach((n) => {
      n.addEventListener("click", () => this._select(n)), n.addEventListener("keydown", (i) => {
        const s = i.key;
        (s === "Enter" || s === " ") && (i.preventDefault(), this._select(n));
      });
    });
  }
  _select(t) {
    if (this._answered) return;
    this._answered = !0;
    const n = parseInt(t.dataset.index || "0", 10), i = this._correctIndex, s = n === i;
    this.root.querySelectorAll(".option").forEach((c, l) => {
      const d = c;
      d.removeAttribute("tabindex"), l === i ? (d.classList.add("correct"), d.querySelector(".icon").textContent = "✓") : l === n && !s ? (d.classList.add("wrong"), d.querySelector(".icon").textContent = "✗") : d.classList.add("dimmed");
    });
    const o = this.root.querySelector(".explanation");
    o && requestAnimationFrame(() => o.classList.add("visible")), this.dispatchEvent(new CustomEvent("lv-quiz-answer", {
      bubbles: !0,
      composed: !0,
      detail: { correct: s, selected: n, answer: i }
    }));
  }
}
customElements.define("lv-quiz", Oc);
const Bc = (
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
class Hc extends R {
  constructor() {
    super(...arguments);
    z(this, "_revealed", !1);
  }
  static get observedAttributes() {
    return ["label", "revealed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Bc), this._render(), this._attachListeners(), this.hasAttribute("revealed") && this._reveal(!1);
  }
  handleAttributeChange(t) {
    if (t === "revealed" && this.hasAttribute("revealed") && !this._revealed && this._reveal(!0), t === "label") {
      const n = this.root.querySelector(".trigger-label");
      n && (n.textContent = this._label);
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
    const t = this.root.querySelector(".trigger");
    t.addEventListener("click", () => this._reveal(!0)), t.addEventListener("keydown", (n) => {
      const i = n.key;
      (i === "Enter" || i === " ") && (n.preventDefault(), this._reveal(!0));
    });
  }
  _reveal(t) {
    if (this._revealed) return;
    this._revealed = !0;
    const n = this.root.querySelector(".trigger"), i = this.root.querySelector(".content");
    n.setAttribute("aria-expanded", "true"), t ? (n.classList.add("hidden"), setTimeout(() => i.classList.add("visible"), 150)) : (n.classList.add("hidden"), i.classList.add("visible"));
  }
}
customElements.define("lv-reveal", Hc);
const jc = (
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
class Vc extends R {
  constructor() {
    super(...arguments);
    z(this, "_input", null);
    z(this, "_valueEl", null);
    z(this, "_popTimeout", null);
  }
  static get observedAttributes() {
    return ["min", "max", "step", "value", "label", "name", "color"];
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popTimeout && (clearTimeout(this._popTimeout), this._popTimeout = null);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(jc), this._render(), this._bind(), this._updateTrack();
  }
  handleAttributeChange() {
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
    const t = this._color ? `--fill-color: ${this._color};` : "";
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
        style="${t}"
        aria-label="${this._label}"
      />
    `), this._input = this.root.querySelector("input"), this._valueEl = this.root.querySelector(".value-display");
  }
  _bind() {
    this._input && this._input.addEventListener("input", () => {
      const t = this._input.value;
      this._valueEl && (this._valueEl.textContent = t, this._valueEl.classList.add("pop"), this._popTimeout && clearTimeout(this._popTimeout), this._popTimeout = window.setTimeout(() => {
        var n;
        (n = this._valueEl) == null || n.classList.remove("pop");
      }, 150)), this._updateTrack(), this.dispatchEvent(new CustomEvent("lv-change", {
        bubbles: !0,
        composed: !0,
        detail: { name: this._name, value: parseFloat(t) }
      }));
    });
  }
  _updateTrack() {
    if (!this._input) return;
    const t = this._min, n = this._max, s = (parseFloat(this._input.value) - t) / (n - t) * 100, o = `linear-gradient(to right, ${this._color || "var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;
    this._input.style.setProperty("--track-bg", o), this._input.style.background = o, this._input.style.borderRadius = "9999px";
  }
}
customElements.define("lv-slider", Vc);
const Xc = (
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
class Yc extends R {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Xc), this._render(), this._bind();
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
      const e = this._collectParams();
      this.dispatchEvent(new CustomEvent("lv-params-change", {
        bubbles: !0,
        composed: !0,
        detail: e
      }));
    });
  }
  _collectParams() {
    const e = this.querySelectorAll('lv-slider[slot="controls"]'), t = {};
    return e.forEach((n) => {
      var s;
      const i = n.getAttribute("name");
      if (i) {
        const a = (s = n.root) == null ? void 0 : s.querySelector("input"), o = parseFloat(a ? a.value : n.getAttribute("value") || "0");
        t[i] = o;
      }
    }), t;
  }
}
customElements.define("lv-playground", Yc);
const Gc = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function Ns(r) {
  return String(r).split("").map((e) => Gc[parseInt(e)] ?? e).join("");
}
const Wc = (
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
class Uc extends R {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Wc), this._render();
  }
  handleAttributeChange() {
    this.root.querySelector(".title") && this._render();
  }
  get _title() {
    return this.getAttribute("title") || "";
  }
  _esc(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  _render() {
    this.render(`
      ${this._title ? `<div class="title">${this._esc(this._title)}</div>` : ""}
      <slot></slot>
    `);
  }
}
customElements.define("lv-step", Uc);
const Kc = (
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
class Zc extends R {
  constructor() {
    super(...arguments);
    z(this, "_current", 0);
    z(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Kc), this._render(), requestAnimationFrame(() => {
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
    const t = this.root.querySelector(".prev"), n = this.root.querySelector(".next");
    t.addEventListener("click", () => this._go(-1)), n.addEventListener("click", () => this._go(1)), this.addEventListener("keydown", (i) => {
      i.key === "ArrowRight" ? (i.preventDefault(), this._go(this.isRtl ? -1 : 1)) : i.key === "ArrowLeft" && (i.preventDefault(), this._go(this.isRtl ? 1 : -1));
    }), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0");
  }
  _go(t) {
    const n = this._current + t;
    n < 0 || n >= this._total || (this._current, this._current = n, this._showStep(n, t > 0 ? "forward" : "backward"));
  }
  _showStep(t, n) {
    this._steps.forEach((c, l) => {
      c.classList.remove("active", "from-start", "from-end"), l === t && (c.classList.add("active"), n === "forward" ? c.classList.add(this.isRtl ? "from-start" : "from-end") : n === "backward" && c.classList.add(this.isRtl ? "from-end" : "from-start"));
    });
    const i = this.root.querySelector(".counter");
    i && (i.textContent = `${Ns(t + 1)} / ${Ns(this._total)}`);
    const s = this.root.querySelector(".steps");
    s && s.setAttribute("aria-label", `Step ${t + 1} of ${this._total}`);
    const a = this.root.querySelector(".prev"), o = this.root.querySelector(".next");
    a && (a.disabled = t === 0), o && (o.disabled = t === this._total - 1);
  }
}
customElements.define("lv-stepper", Zc);
const Jc = (
  /* css */
  `
  :host {
    display: block;
    min-height: 80vh;
    padding: var(--lv-sp-8, 64px) var(--lv-sp-4, 16px);
    opacity: 0.3;
    transition: opacity 0.45s ease;
  }

  :host(.active) {
    opacity: 1;
  }
`
);
class Qc extends R {
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Jc), this.render("<slot></slot>");
  }
}
customElements.define("lv-scrolly-step", Qc);
const td = (
  /* css */
  `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .scrolly-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--lv-sp-4, 16px);
    align-items: start;
  }

  :host([sticky-side="right"]) .scrolly-grid {
    direction: ltr;
  }

  .viz-col {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .steps-col {
    position: relative;
  }

  /* When sticky-side is right, reorder columns */
  :host([sticky-side="right"]) .viz-col {
    order: 2;
  }

  :host([sticky-side="right"]) .steps-col {
    order: 1;
  }
`
);
class ed extends R {
  constructor() {
    super(...arguments);
    z(this, "_observer", null);
    z(this, "_steps", []);
  }
  static get observedAttributes() {
    return ["sticky-side"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(td), this._build(), requestAnimationFrame(() => this._setupObserver());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer && (this._observer.disconnect(), this._observer = null);
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
  }
  _build() {
    this.setAttribute("role", "region"), this.setAttribute("aria-label", "Scrollable narrative"), this.render(`
      <div class="scrolly-grid">
        <div class="viz-col"><slot name="viz"></slot></div>
        <div class="steps-col"><slot></slot></div>
      </div>
    `);
  }
  _setupObserver() {
    this._steps = Array.from(this.querySelectorAll("lv-scrolly-step")), this._steps.length && (this._steps[0].classList.add("active"), this._steps[0].setAttribute("aria-current", "step"), this.setAttribute("data-active-step", "0"), this._observer = new IntersectionObserver(
      (t) => {
        t.forEach((n) => {
          if (n.isIntersecting) {
            const i = this._steps.indexOf(n.target);
            if (i === -1) return;
            this._steps.forEach((s) => {
              s.classList.remove("active"), s.removeAttribute("aria-current");
            }), n.target.classList.add("active"), n.target.setAttribute("aria-current", "step"), this.setAttribute("data-active-step", String(i)), this.dispatchEvent(
              new CustomEvent("lv-scrolly-change", {
                detail: { step: i },
                bubbles: !0,
                composed: !0
              })
            );
          }
        });
      },
      { threshold: 0.5 }
    ), this._steps.forEach((t) => this._observer.observe(t)));
  }
}
customElements.define("lv-scrolly", ed);
const nd = (
  /* css */
  `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .label {
    font-family: var(--lv-font);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lv-text);
    margin-block-end: var(--lv-sp-3, 12px);
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-block-end: var(--lv-sp-4, 16px);
    position: relative;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.95rem;
    cursor: grab;
    user-select: none;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
    outline: none;
    position: relative;
  }

  .item:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .item:hover {
    border-color: var(--lv-accent);
  }

  .item.dragging {
    opacity: 0.4;
  }

  .item.correct {
    border-color: var(--lv-positive, #22c55e);
    background: color-mix(in srgb, var(--lv-positive, #22c55e) 10%, var(--lv-bg-card));
  }

  .item.incorrect {
    border-color: var(--lv-negative, #ef4444);
    background: color-mix(in srgb, var(--lv-negative, #ef4444) 10%, var(--lv-bg-card));
  }

  .handle {
    color: var(--lv-text-dim);
    font-size: 1.2rem;
    line-height: 1;
    flex-shrink: 0;
    cursor: grab;
  }

  .status-icon {
    margin-inline-start: auto;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .item-text {
    flex: 1;
  }

  .clone {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transform: rotate(2deg);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-accent);
    border-radius: var(--lv-r-md, 8px);
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.95rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }

  .gap-indicator {
    height: 4px;
    background: var(--lv-accent);
    border-radius: 2px;
    transition: all 0.15s ease;
  }

  .btn {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 24px;
    border-radius: var(--lv-r-md, 8px);
    border: 2px solid var(--lv-accent);
    background: var(--lv-accent);
    color: var(--lv-bg-card);
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }
`
);
class rd extends R {
  constructor() {
    super(...arguments);
    z(this, "_order", []);
    z(this, "_dragIndex", -1);
    z(this, "_clone", null);
    z(this, "_checked", !1);
    // Bound handlers for cleanup
    z(this, "_onPointerMove", null);
    z(this, "_onPointerUp", null);
  }
  static get observedAttributes() {
    return ["items", "correct", "label", "submit-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(nd), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanupDrag();
  }
  handleAttributeChange() {
    this.isConnected && !this._checked && this._build();
  }
  animateIn(t) {
  }
  _build() {
    const t = this.jsonAttr("items", []), n = this.getAttribute("label") || "Drag to reorder:", i = this.getAttribute("submit-label") || "Check";
    (!this._order.length || this._order.length !== t.length) && (this._order = [...t]), this._checked = !1;
    const s = this._order.map(
      (a, o) => `
      <div class="item" draggable="false" tabindex="0" data-index="${o}" role="option" aria-grabbed="false">
        <span class="handle" aria-hidden="true">≡</span>
        <span class="item-text">${this._esc(a)}</span>
        <span class="status-icon"></span>
      </div>
    `
    ).join("");
    this.render(`
      <div class="label" id="sort-label">${this._esc(n)}</div>
      <div class="item-list" role="listbox" aria-labelledby="sort-label">${s}</div>
      <button class="btn submit-btn">${this._esc(i)}</button>
    `), this._attachListeners();
  }
  _attachListeners() {
    this.root.querySelectorAll(".item").forEach((i) => {
      i.addEventListener("pointerdown", (s) => {
        this._startDrag(i, s);
      }), i.addEventListener("keydown", (s) => {
        const a = s, o = parseInt(i.dataset.index || "0", 10);
        a.key === "ArrowUp" && o > 0 ? (a.preventDefault(), this._swap(o, o - 1), this._buildItems(), requestAnimationFrame(() => {
          const c = this.root.querySelector(`[data-index="${o - 1}"]`);
          c == null || c.focus();
        })) : a.key === "ArrowDown" && o < this._order.length - 1 && (a.preventDefault(), this._swap(o, o + 1), this._buildItems(), requestAnimationFrame(() => {
          const c = this.root.querySelector(`[data-index="${o + 1}"]`);
          c == null || c.focus();
        }));
      });
    });
    const n = this.root.querySelector(".submit-btn");
    n == null || n.addEventListener("click", () => this._check());
  }
  _startDrag(t, n) {
    if (this._checked) return;
    n.preventDefault();
    const i = parseInt(t.dataset.index || "0", 10);
    this._dragIndex = i, t.classList.add("dragging");
    const s = document.createElement("div");
    s.className = "clone", s.textContent = this._order[i], s.style.left = `${n.clientX - 50}px`, s.style.top = `${n.clientY - 20}px`, this.root.appendChild(s), this._clone = s, this._onPointerMove = (a) => {
      if (!this._clone) return;
      this._clone.style.left = `${a.clientX - 50}px`, this._clone.style.top = `${a.clientY - 20}px`;
      const o = Array.from(this.root.querySelectorAll(".item"));
      let c = -1;
      for (let l = 0; l < o.length; l++) {
        const d = o[l].getBoundingClientRect();
        if (a.clientY >= d.top && a.clientY <= d.bottom) {
          c = l;
          break;
        }
      }
      if (c !== -1 && c !== this._dragIndex) {
        this._swap(this._dragIndex, c), this._dragIndex = c, this._buildItems();
        const l = this.root.querySelector(`[data-index="${c}"]`);
        l == null || l.classList.add("dragging");
      }
    }, this._onPointerUp = (a) => {
      this._cleanupDrag(), this._buildItems();
    }, document.addEventListener("pointermove", this._onPointerMove), document.addEventListener("pointerup", this._onPointerUp);
  }
  _cleanupDrag() {
    this._clone && (this._clone.remove(), this._clone = null), this._onPointerMove && (document.removeEventListener("pointermove", this._onPointerMove), this._onPointerMove = null), this._onPointerUp && (document.removeEventListener("pointerup", this._onPointerUp), this._onPointerUp = null), this._dragIndex = -1;
    const t = this.root.querySelector(".dragging");
    t == null || t.classList.remove("dragging");
  }
  _swap(t, n) {
    const i = this._order[t];
    this._order[t] = this._order[n], this._order[n] = i;
  }
  _buildItems() {
    const t = this.root.querySelector(".item-list");
    if (!t) return;
    t.innerHTML = this._order.map(
      (i, s) => `
      <div class="item" draggable="false" tabindex="0" data-index="${s}" role="option" aria-grabbed="false">
        <span class="handle" aria-hidden="true">≡</span>
        <span class="item-text">${this._esc(i)}</span>
        <span class="status-icon"></span>
      </div>
    `
    ).join(""), t.querySelectorAll(".item").forEach((i) => {
      i.addEventListener("pointerdown", (s) => {
        this._startDrag(i, s);
      }), i.addEventListener("keydown", (s) => {
        const a = s, o = parseInt(i.dataset.index || "0", 10);
        a.key === "ArrowUp" && o > 0 ? (a.preventDefault(), this._swap(o, o - 1), this._buildItems(), requestAnimationFrame(() => {
          const c = this.root.querySelector(`[data-index="${o - 1}"]`);
          c == null || c.focus();
        })) : a.key === "ArrowDown" && o < this._order.length - 1 && (a.preventDefault(), this._swap(o, o + 1), this._buildItems(), requestAnimationFrame(() => {
          const c = this.root.querySelector(`[data-index="${o + 1}"]`);
          c == null || c.focus();
        }));
      });
    });
  }
  _check() {
    const t = this.jsonAttr("correct", []);
    this._checked = !0;
    const n = this.root.querySelectorAll(".item");
    let i = !0;
    n.forEach((s, a) => {
      const o = s.querySelector(".status-icon");
      this._order[a] === t[a] ? (s.classList.add("correct"), o && (o.textContent = "✓")) : (s.classList.add("incorrect"), o && (o.textContent = "✗"), i = !1);
    }), this.dispatchEvent(
      new CustomEvent("lv-sort-check", {
        detail: { correct: i, order: [...this._order] },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-drag-sort", rd);
const Rs = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"], id = (
  /* css */
  `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .pool-label {
    font-family: var(--lv-font);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--lv-text-dim);
    margin-block-end: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .pool {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 48px;
    padding: 12px;
    background: var(--lv-bg-raised);
    border-radius: var(--lv-r-md, 8px);
    border: 2px dashed var(--lv-border);
    margin-block-end: var(--lv-sp-4, 16px);
    transition: border-color 0.2s ease;
  }

  .pool.empty-hint::after {
    content: 'All items placed!';
    color: var(--lv-text-dim);
    font-family: var(--lv-font);
    font-size: 0.85rem;
    font-style: italic;
  }

  .buckets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lv-sp-3, 12px);
    margin-block-end: var(--lv-sp-4, 16px);
  }

  .bucket {
    flex: 1;
    min-width: 160px;
    min-height: 120px;
    border: 2px dashed var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    padding: 12px;
    background: var(--lv-bg-card);
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .bucket.drag-over {
    border-style: solid;
    background: color-mix(in srgb, var(--lv-accent) 8%, var(--lv-bg-card));
  }

  .bucket-header {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--lv-text);
    padding-block-end: 8px;
    margin-block-end: 8px;
    border-block-end: 3px solid var(--lv-border);
  }

  .bucket-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 32px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-border);
    border-radius: 6px;
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.9rem;
    cursor: grab;
    user-select: none;
    transition: border-color 0.2s ease, background 0.2s ease, opacity 0.15s ease;
    position: relative;
  }

  .chip:hover {
    border-color: var(--lv-accent);
  }

  .chip.dragging {
    opacity: 0.35;
  }

  .chip.correct {
    border-color: var(--lv-positive, #22c55e);
    background: color-mix(in srgb, var(--lv-positive, #22c55e) 10%, var(--lv-bg-card));
  }

  .chip.incorrect {
    border-color: var(--lv-negative, #ef4444);
    background: color-mix(in srgb, var(--lv-negative, #ef4444) 10%, var(--lv-bg-card));
  }

  .chip .tooltip {
    display: none;
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--lv-text);
    color: var(--lv-bg);
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }

  .chip.incorrect .tooltip.has-text {
    display: block;
  }

  .clone {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transform: rotate(2deg);
    padding: 8px 14px;
    background: var(--lv-bg-card);
    border: 2px solid var(--lv-accent);
    border-radius: 6px;
    color: var(--lv-text);
    font-family: var(--lv-font);
    font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }

  .btn {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 24px;
    border-radius: var(--lv-r-md, 8px);
    border: 2px solid var(--lv-accent);
    background: var(--lv-accent);
    color: var(--lv-bg-card);
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }
`
);
class sd extends R {
  constructor() {
    super(...arguments);
    z(this, "_placements", []);
    z(this, "_categories", []);
    z(this, "_dragIdx", -1);
    z(this, "_clone", null);
    z(this, "_checked", !1);
    z(this, "_onPointerMove", null);
    z(this, "_onPointerUp", null);
  }
  static get observedAttributes() {
    return ["items", "categories", "submit-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(id), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanupDrag();
  }
  handleAttributeChange() {
    this.isConnected && !this._checked && this._build();
  }
  animateIn(t) {
  }
  _build() {
    const t = this.jsonAttr("items", []);
    this._categories = this.jsonAttr("categories", []);
    const n = this.getAttribute("submit-label") || "Check";
    (!this._placements.length || this._placements.length !== t.length) && (this._placements = t.map((i) => ({
      text: i.text,
      category: i.category,
      bucket: null
    }))), this._renderInner(n);
  }
  _renderInner(t) {
    const n = this._placements.filter((o) => o.bucket === null), i = n.length === 0 ? " empty-hint" : "", s = n.map((o) => `<div class="chip" role="option" data-idx="${this._placements.indexOf(o)}">${this._esc(o.text)}<span class="tooltip"></span></div>`).join(""), a = this._categories.map((o, c) => {
      const l = Rs[c % Rs.length], h = this._placements.filter((u) => u.bucket === o).map((u) => `<div class="chip" role="option" data-idx="${this._placements.indexOf(u)}">${this._esc(u.text)}<span class="tooltip"></span></div>`).join("");
      return `
        <div class="bucket" role="group" aria-label="${this._esc(o)}" data-bucket="${this._esc(o)}">
          <div class="bucket-header" style="border-color: ${l}">${this._esc(o)}</div>
          <div class="bucket-items">${h}</div>
        </div>`;
    }).join("");
    this.render(`
      <div class="pool-label">Items</div>
      <div class="pool${i}" role="group" aria-label="Items pool">${s}</div>
      <div class="buckets">${a}</div>
      <button class="btn submit-btn">${this._esc(t)}</button>
    `), this._attachListeners();
  }
  _attachListeners() {
    this.root.querySelectorAll(".chip").forEach((i) => {
      i.addEventListener("pointerdown", (s) => {
        this._startDrag(i, s);
      });
    });
    const n = this.root.querySelector(".submit-btn");
    n == null || n.addEventListener("click", () => this._check());
  }
  _startDrag(t, n) {
    if (this._checked) return;
    n.preventDefault();
    const i = parseInt(t.dataset.idx || "0", 10);
    this._dragIdx = i, t.classList.add("dragging");
    const s = document.createElement("div");
    s.className = "clone", s.textContent = this._placements[i].text, s.style.left = `${n.clientX - 40}px`, s.style.top = `${n.clientY - 16}px`, this.root.appendChild(s), this._clone = s, this._onPointerMove = (a) => {
      if (!this._clone) return;
      this._clone.style.left = `${a.clientX - 40}px`, this._clone.style.top = `${a.clientY - 16}px`, this.root.querySelectorAll(".bucket").forEach((c) => {
        const l = c.getBoundingClientRect();
        a.clientX >= l.left && a.clientX <= l.right && a.clientY >= l.top && a.clientY <= l.bottom ? c.classList.add("drag-over") : c.classList.remove("drag-over");
      });
    }, this._onPointerUp = (a) => {
      let o = null;
      this.root.querySelectorAll(".bucket").forEach((h) => {
        const u = h.getBoundingClientRect();
        a.clientX >= u.left && a.clientX <= u.right && a.clientY >= u.top && a.clientY <= u.bottom && (o = h.dataset.bucket || null), h.classList.remove("drag-over");
      });
      const l = this.root.querySelector(".pool");
      if (l) {
        const h = l.getBoundingClientRect();
        a.clientX >= h.left && a.clientX <= h.right && a.clientY >= h.top && a.clientY <= h.bottom && (o = null);
      }
      o === null && !this._isOverPool(a) ? this._placements[this._dragIdx].bucket = null : this._placements[this._dragIdx].bucket = o, this._cleanupDrag();
      const d = this.getAttribute("submit-label") || "Check";
      this._renderInner(d);
    }, document.addEventListener("pointermove", this._onPointerMove), document.addEventListener("pointerup", this._onPointerUp);
  }
  _isOverPool(t) {
    const n = this.root.querySelector(".pool");
    if (!n) return !1;
    const i = n.getBoundingClientRect();
    return t.clientX >= i.left && t.clientX <= i.right && t.clientY >= i.top && t.clientY <= i.bottom;
  }
  _cleanupDrag() {
    this._clone && (this._clone.remove(), this._clone = null), this._onPointerMove && (document.removeEventListener("pointermove", this._onPointerMove), this._onPointerMove = null), this._onPointerUp && (document.removeEventListener("pointerup", this._onPointerUp), this._onPointerUp = null), this._dragIdx = -1;
  }
  _check() {
    this._checked = !0;
    let t = !0;
    const n = [];
    this.root.querySelectorAll(".chip").forEach((s) => {
      const a = parseInt(s.dataset.idx || "0", 10), o = this._placements[a], c = o.bucket === o.category;
      if (n.push({ text: o.text, placed: o.bucket, expected: o.category }), c)
        s.classList.add("correct");
      else {
        s.classList.add("incorrect"), t = !1;
        const l = s.querySelector(".tooltip");
        l && (l.textContent = `→ ${o.category}`, l.classList.add("has-text"));
      }
    }), this.dispatchEvent(
      new CustomEvent("lv-classify-check", {
        detail: { correct: t, results: n },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-drag-classify", sd);
const ad = (
  /* css */
  `
  :host {
    display: inline;
  }
`
);
let Ds = !1;
function od() {
  if (Ds) return;
  Ds = !0;
  const r = document.createElement("style");
  r.textContent = `
    .lv-link-active {
      background-color: color-mix(in srgb, var(--lv-accent, #3b82f6) 20%, transparent);
      border-bottom: 2px solid var(--lv-accent, #3b82f6);
      border-radius: 2px;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }
  `, document.head.appendChild(r);
}
const Pe = /* @__PURE__ */ new Map();
class ld extends R {
  constructor() {
    super(...arguments);
    z(this, "_group", "default");
    z(this, "_bound", !1);
    z(this, "_onMouseOver", (t) => {
      var s, a;
      const n = (a = (s = t.target).closest) == null ? void 0 : a.call(s, "[data-link]");
      if (!n) return;
      const i = n.getAttribute("data-link");
      i && this._highlightAll(i, !0);
    });
    z(this, "_onMouseOut", (t) => {
      var s, a;
      const n = (a = (s = t.target).closest) == null ? void 0 : a.call(s, "[data-link]");
      if (!n) return;
      const i = n.getAttribute("data-link");
      i && this._highlightAll(i, !1);
    });
  }
  static get observedAttributes() {
    return ["group"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ad), od(), this.render("<slot></slot>"), this._group = this.getAttribute("group") || "default", this._register(), this._attachSlotListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unregister(), this.removeEventListener("mouseover", this._onMouseOver), this.removeEventListener("mouseout", this._onMouseOut), this._bound = !1;
  }
  handleAttributeChange(t, n, i) {
    t === "group" && (this._unregister(), this._group = i || "default", this._register());
  }
  animateIn(t) {
  }
  _register() {
    Pe.has(this._group) || Pe.set(this._group, /* @__PURE__ */ new Set()), Pe.get(this._group).add(this);
  }
  _unregister() {
    const t = Pe.get(this._group);
    t && (t.delete(this), t.size === 0 && Pe.delete(this._group));
  }
  _attachSlotListeners() {
    this._bound || (this._bound = !0, this.addEventListener("mouseover", this._onMouseOver), this.addEventListener("mouseout", this._onMouseOut));
  }
  _highlightAll(t, n) {
    const i = Pe.get(this._group);
    i && i.forEach((s) => {
      s.querySelectorAll(`[data-link="${CSS.escape(t)}"]`).forEach((o) => {
        n ? o.classList.add("lv-link-active") : o.classList.remove("lv-link-active");
      });
    });
  }
}
customElements.define("lv-linked-highlight", ld);
function nr(r, e) {
  return r == null || e == null ? NaN : r < e ? -1 : r > e ? 1 : r >= e ? 0 : NaN;
}
function cd(r, e) {
  return r == null || e == null ? NaN : e < r ? -1 : e > r ? 1 : e >= r ? 0 : NaN;
}
function Ki(r) {
  let e, t, n;
  r.length !== 2 ? (e = nr, t = (o, c) => nr(r(o), c), n = (o, c) => r(o) - c) : (e = r === nr || r === cd ? r : dd, t = r, n = r);
  function i(o, c, l = 0, d = o.length) {
    if (l < d) {
      if (e(c, c) !== 0) return d;
      do {
        const h = l + d >>> 1;
        t(o[h], c) < 0 ? l = h + 1 : d = h;
      } while (l < d);
    }
    return l;
  }
  function s(o, c, l = 0, d = o.length) {
    if (l < d) {
      if (e(c, c) !== 0) return d;
      do {
        const h = l + d >>> 1;
        t(o[h], c) <= 0 ? l = h + 1 : d = h;
      } while (l < d);
    }
    return l;
  }
  function a(o, c, l = 0, d = o.length) {
    const h = i(o, c, l, d - 1);
    return h > l && n(o[h - 1], c) > -n(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: a, right: s };
}
function dd() {
  return 0;
}
function hd(r) {
  return r === null ? NaN : +r;
}
const ud = Ki(nr), fd = ud.right;
Ki(hd).center;
function pd(r, e) {
  let t = 0, n, i = 0, s = 0;
  if (e === void 0)
    for (let a of r)
      a != null && (a = +a) >= a && (n = a - i, i += n / ++t, s += n * (a - i));
  else {
    let a = -1;
    for (let o of r)
      (o = e(o, ++a, r)) != null && (o = +o) >= o && (n = o - i, i += n / ++t, s += n * (o - i));
  }
  if (t > 1) return s / (t - 1);
}
function Os(r, e) {
  const t = pd(r, e);
  return t && Math.sqrt(t);
}
function oe(r, e) {
  let t, n;
  if (e === void 0)
    for (const i of r)
      i != null && (t === void 0 ? i >= i && (t = n = i) : (t > i && (t = i), n < i && (n = i)));
  else {
    let i = -1;
    for (let s of r)
      (s = e(s, ++i, r)) != null && (t === void 0 ? s >= s && (t = n = s) : (t > s && (t = s), n < s && (n = s)));
  }
  return [t, n];
}
const gd = Math.sqrt(50), md = Math.sqrt(10), _d = Math.sqrt(2);
function hr(r, e, t) {
  const n = (e - r) / Math.max(0, t), i = Math.floor(Math.log10(n)), s = n / Math.pow(10, i), a = s >= gd ? 10 : s >= md ? 5 : s >= _d ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, o = Math.round(r * l), c = Math.round(e * l), o / l < r && ++o, c / l > e && --c, l = -l) : (l = Math.pow(10, i) * a, o = Math.round(r / l), c = Math.round(e / l), o * l < r && ++o, c * l > e && --c), c < o && 0.5 <= t && t < 2 ? hr(r, e, t * 2) : [o, c, l];
}
function vd(r, e, t) {
  if (e = +e, r = +r, t = +t, !(t > 0)) return [];
  if (r === e) return [r];
  const n = e < r, [i, s, a] = n ? hr(e, r, t) : hr(r, e, t);
  if (!(s >= i)) return [];
  const o = s - i + 1, c = new Array(o);
  if (n)
    if (a < 0) for (let l = 0; l < o; ++l) c[l] = (s - l) / -a;
    else for (let l = 0; l < o; ++l) c[l] = (s - l) * a;
  else if (a < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -a;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * a;
  return c;
}
function xi(r, e, t) {
  return e = +e, r = +r, t = +t, hr(r, e, t)[2];
}
function bd(r, e, t) {
  e = +e, r = +r, t = +t;
  const n = e < r, i = n ? xi(e, r, t) : xi(r, e, t);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function so(r, e) {
  let t;
  if (e === void 0)
    for (const n of r)
      n != null && (t < n || t === void 0 && n >= n) && (t = n);
  else {
    let n = -1;
    for (let i of r)
      (i = e(i, ++n, r)) != null && (t < i || t === void 0 && i >= i) && (t = i);
  }
  return t;
}
function xd(r, e) {
  let t;
  for (const n of r)
    n != null && (t > n || t === void 0 && n >= n) && (t = n);
  return t;
}
function Bs(r, e) {
  let t = 0, n = 0;
  if (e === void 0)
    for (let i of r)
      i != null && (i = +i) >= i && (++t, n += i);
  else {
    let i = -1;
    for (let s of r)
      (s = e(s, ++i, r)) != null && (s = +s) >= s && (++t, n += s);
  }
  if (t) return n / t;
}
function yd(r) {
  return r;
}
var Gr = 1, Wr = 2, yi = 3, cn = 4, Hs = 1e-6;
function wd(r) {
  return "translate(" + r + ",0)";
}
function kd(r) {
  return "translate(0," + r + ")";
}
function $d(r) {
  return (e) => +r(e);
}
function Ad(r, e) {
  return e = Math.max(0, r.bandwidth() - e * 2) / 2, r.round() && (e = Math.round(e)), (t) => +r(t) + e;
}
function Sd() {
  return !this.__axis;
}
function ao(r, e) {
  var t = [], n = null, i = null, s = 6, a = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = r === Gr || r === cn ? -1 : 1, d = r === cn || r === Wr ? "x" : "y", h = r === Gr || r === yi ? wd : kd;
  function u(f) {
    var g = n ?? (e.ticks ? e.ticks.apply(e, t) : e.domain()), p = i ?? (e.tickFormat ? e.tickFormat.apply(e, t) : yd), m = Math.max(s, 0) + o, b = e.range(), x = +b[0] + c, v = +b[b.length - 1] + c, _ = (e.bandwidth ? Ad : $d)(e.copy(), c), w = f.selection ? f.selection() : f, k = w.selectAll(".domain").data([null]), $ = w.selectAll(".tick").data(g, e).order(), A = $.exit(), S = $.enter().append("g").attr("class", "tick"), y = $.select("line"), C = $.select("text");
    k = k.merge(k.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), $ = $.merge(S), y = y.merge(S.append("line").attr("stroke", "currentColor").attr(d + "2", l * s)), C = C.merge(S.append("text").attr("fill", "currentColor").attr(d, l * m).attr("dy", r === Gr ? "0em" : r === yi ? "0.71em" : "0.32em")), f !== w && (k = k.transition(f), $ = $.transition(f), y = y.transition(f), C = C.transition(f), A = A.transition(f).attr("opacity", Hs).attr("transform", function(M) {
      return isFinite(M = _(M)) ? h(M + c) : this.getAttribute("transform");
    }), S.attr("opacity", Hs).attr("transform", function(M) {
      var T = this.parentNode.__axis;
      return h((T && isFinite(T = T(M)) ? T : _(M)) + c);
    })), A.remove(), k.attr("d", r === cn || r === Wr ? a ? "M" + l * a + "," + x + "H" + c + "V" + v + "H" + l * a : "M" + c + "," + x + "V" + v : a ? "M" + x + "," + l * a + "V" + c + "H" + v + "V" + l * a : "M" + x + "," + c + "H" + v), $.attr("opacity", 1).attr("transform", function(M) {
      return h(_(M) + c);
    }), y.attr(d + "2", l * s), C.attr(d, l * m).text(p), w.filter(Sd).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", r === Wr ? "start" : r === cn ? "end" : "middle"), w.each(function() {
      this.__axis = _;
    });
  }
  return u.scale = function(f) {
    return arguments.length ? (e = f, u) : e;
  }, u.ticks = function() {
    return t = Array.from(arguments), u;
  }, u.tickArguments = function(f) {
    return arguments.length ? (t = f == null ? [] : Array.from(f), u) : t.slice();
  }, u.tickValues = function(f) {
    return arguments.length ? (n = f == null ? null : Array.from(f), u) : n && n.slice();
  }, u.tickFormat = function(f) {
    return arguments.length ? (i = f, u) : i;
  }, u.tickSize = function(f) {
    return arguments.length ? (s = a = +f, u) : s;
  }, u.tickSizeInner = function(f) {
    return arguments.length ? (s = +f, u) : s;
  }, u.tickSizeOuter = function(f) {
    return arguments.length ? (a = +f, u) : a;
  }, u.tickPadding = function(f) {
    return arguments.length ? (o = +f, u) : o;
  }, u.offset = function(f) {
    return arguments.length ? (c = +f, u) : c;
  }, u;
}
function ur(r) {
  return ao(yi, r);
}
function fr(r) {
  return ao(cn, r);
}
var Cd = { value: () => {
} };
function Zi() {
  for (var r = 0, e = arguments.length, t = {}, n; r < e; ++r) {
    if (!(n = arguments[r] + "") || n in t || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    t[n] = [];
  }
  return new rr(t);
}
function rr(r) {
  this._ = r;
}
function Md(r, e) {
  return r.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    if (i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), t && !e.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name: n };
  });
}
rr.prototype = Zi.prototype = {
  constructor: rr,
  on: function(r, e) {
    var t = this._, n = Md(r + "", t), i, s = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (r = n[s]).type) && (i = Ed(t[i], r.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < a; )
      if (i = (r = n[s]).type) t[i] = js(t[i], r.name, e);
      else if (e == null) for (i in t) t[i] = js(t[i], r.name, null);
    return this;
  },
  copy: function() {
    var r = {}, e = this._;
    for (var t in e) r[t] = e[t].slice();
    return new rr(r);
  },
  call: function(r, e) {
    if ((i = arguments.length - 2) > 0) for (var t = new Array(i), n = 0, i, s; n < i; ++n) t[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    for (s = this._[r], n = 0, i = s.length; n < i; ++n) s[n].value.apply(e, t);
  },
  apply: function(r, e, t) {
    if (!this._.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    for (var n = this._[r], i = 0, s = n.length; i < s; ++i) n[i].value.apply(e, t);
  }
};
function Ed(r, e) {
  for (var t = 0, n = r.length, i; t < n; ++t)
    if ((i = r[t]).name === e)
      return i.value;
}
function js(r, e, t) {
  for (var n = 0, i = r.length; n < i; ++n)
    if (r[n].name === e) {
      r[n] = Cd, r = r.slice(0, n).concat(r.slice(n + 1));
      break;
    }
  return t != null && r.push({ name: e, value: t }), r;
}
var wi = "http://www.w3.org/1999/xhtml";
const Vs = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: wi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function qr(r) {
  var e = r += "", t = e.indexOf(":");
  return t >= 0 && (e = r.slice(0, t)) !== "xmlns" && (r = r.slice(t + 1)), Vs.hasOwnProperty(e) ? { space: Vs[e], local: r } : r;
}
function Td(r) {
  return function() {
    var e = this.ownerDocument, t = this.namespaceURI;
    return t === wi && e.documentElement.namespaceURI === wi ? e.createElement(r) : e.createElementNS(t, r);
  };
}
function Ld(r) {
  return function() {
    return this.ownerDocument.createElementNS(r.space, r.local);
  };
}
function oo(r) {
  var e = qr(r);
  return (e.local ? Ld : Td)(e);
}
function Pd() {
}
function Ji(r) {
  return r == null ? Pd : function() {
    return this.querySelector(r);
  };
}
function zd(r) {
  typeof r != "function" && (r = Ji(r));
  for (var e = this._groups, t = e.length, n = new Array(t), i = 0; i < t; ++i)
    for (var s = e[i], a = s.length, o = n[i] = new Array(a), c, l, d = 0; d < a; ++d)
      (c = s[d]) && (l = r.call(c, c.__data__, d, s)) && ("__data__" in c && (l.__data__ = c.__data__), o[d] = l);
  return new At(n, this._parents);
}
function Id(r) {
  return r == null ? [] : Array.isArray(r) ? r : Array.from(r);
}
function Fd() {
  return [];
}
function lo(r) {
  return r == null ? Fd : function() {
    return this.querySelectorAll(r);
  };
}
function qd(r) {
  return function() {
    return Id(r.apply(this, arguments));
  };
}
function Nd(r) {
  typeof r == "function" ? r = qd(r) : r = lo(r);
  for (var e = this._groups, t = e.length, n = [], i = [], s = 0; s < t; ++s)
    for (var a = e[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && (n.push(r.call(c, c.__data__, l, a)), i.push(c));
  return new At(n, i);
}
function co(r) {
  return function() {
    return this.matches(r);
  };
}
function ho(r) {
  return function(e) {
    return e.matches(r);
  };
}
var Rd = Array.prototype.find;
function Dd(r) {
  return function() {
    return Rd.call(this.children, r);
  };
}
function Od() {
  return this.firstElementChild;
}
function Bd(r) {
  return this.select(r == null ? Od : Dd(typeof r == "function" ? r : ho(r)));
}
var Hd = Array.prototype.filter;
function jd() {
  return Array.from(this.children);
}
function Vd(r) {
  return function() {
    return Hd.call(this.children, r);
  };
}
function Xd(r) {
  return this.selectAll(r == null ? jd : Vd(typeof r == "function" ? r : ho(r)));
}
function Yd(r) {
  typeof r != "function" && (r = co(r));
  for (var e = this._groups, t = e.length, n = new Array(t), i = 0; i < t; ++i)
    for (var s = e[i], a = s.length, o = n[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && r.call(c, c.__data__, l, s) && o.push(c);
  return new At(n, this._parents);
}
function uo(r) {
  return new Array(r.length);
}
function Gd() {
  return new At(this._enter || this._groups.map(uo), this._parents);
}
function pr(r, e) {
  this.ownerDocument = r.ownerDocument, this.namespaceURI = r.namespaceURI, this._next = null, this._parent = r, this.__data__ = e;
}
pr.prototype = {
  constructor: pr,
  appendChild: function(r) {
    return this._parent.insertBefore(r, this._next);
  },
  insertBefore: function(r, e) {
    return this._parent.insertBefore(r, e);
  },
  querySelector: function(r) {
    return this._parent.querySelector(r);
  },
  querySelectorAll: function(r) {
    return this._parent.querySelectorAll(r);
  }
};
function Wd(r) {
  return function() {
    return r;
  };
}
function Ud(r, e, t, n, i, s) {
  for (var a = 0, o, c = e.length, l = s.length; a < l; ++a)
    (o = e[a]) ? (o.__data__ = s[a], n[a] = o) : t[a] = new pr(r, s[a]);
  for (; a < c; ++a)
    (o = e[a]) && (i[a] = o);
}
function Kd(r, e, t, n, i, s, a) {
  var o, c, l = /* @__PURE__ */ new Map(), d = e.length, h = s.length, u = new Array(d), f;
  for (o = 0; o < d; ++o)
    (c = e[o]) && (u[o] = f = a.call(c, c.__data__, o, e) + "", l.has(f) ? i[o] = c : l.set(f, c));
  for (o = 0; o < h; ++o)
    f = a.call(r, s[o], o, s) + "", (c = l.get(f)) ? (n[o] = c, c.__data__ = s[o], l.delete(f)) : t[o] = new pr(r, s[o]);
  for (o = 0; o < d; ++o)
    (c = e[o]) && l.get(u[o]) === c && (i[o] = c);
}
function Zd(r) {
  return r.__data__;
}
function Jd(r, e) {
  if (!arguments.length) return Array.from(this, Zd);
  var t = e ? Kd : Ud, n = this._parents, i = this._groups;
  typeof r != "function" && (r = Wd(r));
  for (var s = i.length, a = new Array(s), o = new Array(s), c = new Array(s), l = 0; l < s; ++l) {
    var d = n[l], h = i[l], u = h.length, f = Qd(r.call(d, d && d.__data__, l, n)), g = f.length, p = o[l] = new Array(g), m = a[l] = new Array(g), b = c[l] = new Array(u);
    t(d, h, p, m, b, f, e);
    for (var x = 0, v = 0, _, w; x < g; ++x)
      if (_ = p[x]) {
        for (x >= v && (v = x + 1); !(w = m[v]) && ++v < g; ) ;
        _._next = w || null;
      }
  }
  return a = new At(a, n), a._enter = o, a._exit = c, a;
}
function Qd(r) {
  return typeof r == "object" && "length" in r ? r : Array.from(r);
}
function th() {
  return new At(this._exit || this._groups.map(uo), this._parents);
}
function eh(r, e, t) {
  var n = this.enter(), i = this, s = this.exit();
  return typeof r == "function" ? (n = r(n), n && (n = n.selection())) : n = n.append(r + ""), e != null && (i = e(i), i && (i = i.selection())), t == null ? s.remove() : t(s), n && i ? n.merge(i).order() : i;
}
function nh(r) {
  for (var e = r.selection ? r.selection() : r, t = this._groups, n = e._groups, i = t.length, s = n.length, a = Math.min(i, s), o = new Array(i), c = 0; c < a; ++c)
    for (var l = t[c], d = n[c], h = l.length, u = o[c] = new Array(h), f, g = 0; g < h; ++g)
      (f = l[g] || d[g]) && (u[g] = f);
  for (; c < i; ++c)
    o[c] = t[c];
  return new At(o, this._parents);
}
function rh() {
  for (var r = this._groups, e = -1, t = r.length; ++e < t; )
    for (var n = r[e], i = n.length - 1, s = n[i], a; --i >= 0; )
      (a = n[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function ih(r) {
  r || (r = sh);
  function e(h, u) {
    return h && u ? r(h.__data__, u.__data__) : !h - !u;
  }
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s) {
    for (var a = t[s], o = a.length, c = i[s] = new Array(o), l, d = 0; d < o; ++d)
      (l = a[d]) && (c[d] = l);
    c.sort(e);
  }
  return new At(i, this._parents).order();
}
function sh(r, e) {
  return r < e ? -1 : r > e ? 1 : r >= e ? 0 : NaN;
}
function ah() {
  var r = arguments[0];
  return arguments[0] = this, r.apply(null, arguments), this;
}
function oh() {
  return Array.from(this);
}
function lh() {
  for (var r = this._groups, e = 0, t = r.length; e < t; ++e)
    for (var n = r[e], i = 0, s = n.length; i < s; ++i) {
      var a = n[i];
      if (a) return a;
    }
  return null;
}
function ch() {
  let r = 0;
  for (const e of this) ++r;
  return r;
}
function dh() {
  return !this.node();
}
function hh(r) {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && r.call(o, o.__data__, s, i);
  return this;
}
function uh(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function fh(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function ph(r, e) {
  return function() {
    this.setAttribute(r, e);
  };
}
function gh(r, e) {
  return function() {
    this.setAttributeNS(r.space, r.local, e);
  };
}
function mh(r, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? this.removeAttribute(r) : this.setAttribute(r, t);
  };
}
function _h(r, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? this.removeAttributeNS(r.space, r.local) : this.setAttributeNS(r.space, r.local, t);
  };
}
function vh(r, e) {
  var t = qr(r);
  if (arguments.length < 2) {
    var n = this.node();
    return t.local ? n.getAttributeNS(t.space, t.local) : n.getAttribute(t);
  }
  return this.each((e == null ? t.local ? fh : uh : typeof e == "function" ? t.local ? _h : mh : t.local ? gh : ph)(t, e));
}
function fo(r) {
  return r.ownerDocument && r.ownerDocument.defaultView || r.document && r || r.defaultView;
}
function bh(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function xh(r, e, t) {
  return function() {
    this.style.setProperty(r, e, t);
  };
}
function yh(r, e, t) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.style.removeProperty(r) : this.style.setProperty(r, n, t);
  };
}
function wh(r, e, t) {
  return arguments.length > 1 ? this.each((e == null ? bh : typeof e == "function" ? yh : xh)(r, e, t ?? "")) : Ve(this.node(), r);
}
function Ve(r, e) {
  return r.style.getPropertyValue(e) || fo(r).getComputedStyle(r, null).getPropertyValue(e);
}
function kh(r) {
  return function() {
    delete this[r];
  };
}
function $h(r, e) {
  return function() {
    this[r] = e;
  };
}
function Ah(r, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? delete this[r] : this[r] = t;
  };
}
function Sh(r, e) {
  return arguments.length > 1 ? this.each((e == null ? kh : typeof e == "function" ? Ah : $h)(r, e)) : this.node()[r];
}
function po(r) {
  return r.trim().split(/^|\s+/);
}
function Qi(r) {
  return r.classList || new go(r);
}
function go(r) {
  this._node = r, this._names = po(r.getAttribute("class") || "");
}
go.prototype = {
  add: function(r) {
    var e = this._names.indexOf(r);
    e < 0 && (this._names.push(r), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(r) {
    var e = this._names.indexOf(r);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(r) {
    return this._names.indexOf(r) >= 0;
  }
};
function mo(r, e) {
  for (var t = Qi(r), n = -1, i = e.length; ++n < i; ) t.add(e[n]);
}
function _o(r, e) {
  for (var t = Qi(r), n = -1, i = e.length; ++n < i; ) t.remove(e[n]);
}
function Ch(r) {
  return function() {
    mo(this, r);
  };
}
function Mh(r) {
  return function() {
    _o(this, r);
  };
}
function Eh(r, e) {
  return function() {
    (e.apply(this, arguments) ? mo : _o)(this, r);
  };
}
function Th(r, e) {
  var t = po(r + "");
  if (arguments.length < 2) {
    for (var n = Qi(this.node()), i = -1, s = t.length; ++i < s; ) if (!n.contains(t[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Eh : e ? Ch : Mh)(t, e));
}
function Lh() {
  this.textContent = "";
}
function Ph(r) {
  return function() {
    this.textContent = r;
  };
}
function zh(r) {
  return function() {
    var e = r.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ih(r) {
  return arguments.length ? this.each(r == null ? Lh : (typeof r == "function" ? zh : Ph)(r)) : this.node().textContent;
}
function Fh() {
  this.innerHTML = "";
}
function qh(r) {
  return function() {
    this.innerHTML = r;
  };
}
function Nh(r) {
  return function() {
    var e = r.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Rh(r) {
  return arguments.length ? this.each(r == null ? Fh : (typeof r == "function" ? Nh : qh)(r)) : this.node().innerHTML;
}
function Dh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Oh() {
  return this.each(Dh);
}
function Bh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Hh() {
  return this.each(Bh);
}
function jh(r) {
  var e = typeof r == "function" ? r : oo(r);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vh() {
  return null;
}
function Xh(r, e) {
  var t = typeof r == "function" ? r : oo(r), n = e == null ? Vh : typeof e == "function" ? e : Ji(e);
  return this.select(function() {
    return this.insertBefore(t.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Yh() {
  var r = this.parentNode;
  r && r.removeChild(this);
}
function Gh() {
  return this.each(Yh);
}
function Wh() {
  var r = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(r, this.nextSibling) : r;
}
function Uh() {
  var r = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(r, this.nextSibling) : r;
}
function Kh(r) {
  return this.select(r ? Uh : Wh);
}
function Zh(r) {
  return arguments.length ? this.property("__data__", r) : this.node().__data__;
}
function Jh(r) {
  return function(e) {
    r.call(this, e, this.__data__);
  };
}
function Qh(r) {
  return r.trim().split(/^|\s+/).map(function(e) {
    var t = "", n = e.indexOf(".");
    return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), { type: e, name: t };
  });
}
function tu(r) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var t = 0, n = -1, i = e.length, s; t < i; ++t)
        s = e[t], (!r.type || s.type === r.type) && s.name === r.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++n] = s;
      ++n ? e.length = n : delete this.__on;
    }
  };
}
function eu(r, e, t) {
  return function() {
    var n = this.__on, i, s = Jh(e);
    if (n) {
      for (var a = 0, o = n.length; a < o; ++a)
        if ((i = n[a]).type === r.type && i.name === r.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = t), i.value = e;
          return;
        }
    }
    this.addEventListener(r.type, s, t), i = { type: r.type, name: r.name, value: e, listener: s, options: t }, n ? n.push(i) : this.__on = [i];
  };
}
function nu(r, e, t) {
  var n = Qh(r + ""), i, s = n.length, a;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, d; c < l; ++c)
        for (i = 0, d = o[c]; i < s; ++i)
          if ((a = n[i]).type === d.type && a.name === d.name)
            return d.value;
    }
    return;
  }
  for (o = e ? eu : tu, i = 0; i < s; ++i) this.each(o(n[i], e, t));
  return this;
}
function vo(r, e, t) {
  var n = fo(r), i = n.CustomEvent;
  typeof i == "function" ? i = new i(e, t) : (i = n.document.createEvent("Event"), t ? (i.initEvent(e, t.bubbles, t.cancelable), i.detail = t.detail) : i.initEvent(e, !1, !1)), r.dispatchEvent(i);
}
function ru(r, e) {
  return function() {
    return vo(this, r, e);
  };
}
function iu(r, e) {
  return function() {
    return vo(this, r, e.apply(this, arguments));
  };
}
function su(r, e) {
  return this.each((typeof e == "function" ? iu : ru)(r, e));
}
function* au() {
  for (var r = this._groups, e = 0, t = r.length; e < t; ++e)
    for (var n = r[e], i = 0, s = n.length, a; i < s; ++i)
      (a = n[i]) && (yield a);
}
var bo = [null];
function At(r, e) {
  this._groups = r, this._parents = e;
}
function Fn() {
  return new At([[document.documentElement]], bo);
}
function ou() {
  return this;
}
At.prototype = Fn.prototype = {
  constructor: At,
  select: zd,
  selectAll: Nd,
  selectChild: Bd,
  selectChildren: Xd,
  filter: Yd,
  data: Jd,
  enter: Gd,
  exit: th,
  join: eh,
  merge: nh,
  selection: ou,
  order: rh,
  sort: ih,
  call: ah,
  nodes: oh,
  node: lh,
  size: ch,
  empty: dh,
  each: hh,
  attr: vh,
  style: wh,
  property: Sh,
  classed: Th,
  text: Ih,
  html: Rh,
  raise: Oh,
  lower: Hh,
  append: jh,
  insert: Xh,
  remove: Gh,
  clone: Kh,
  datum: Zh,
  on: nu,
  dispatch: su,
  [Symbol.iterator]: au
};
function G(r) {
  return typeof r == "string" ? new At([[document.querySelector(r)]], [document.documentElement]) : new At([[r]], bo);
}
function lu(r) {
  let e;
  for (; e = r.sourceEvent; ) r = e;
  return r;
}
function ki(r, e) {
  if (r = lu(r), e === void 0 && (e = r.currentTarget), e) {
    var t = e.ownerSVGElement || e;
    if (t.createSVGPoint) {
      var n = t.createSVGPoint();
      return n.x = r.clientX, n.y = r.clientY, n = n.matrixTransform(e.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [r.clientX - i.left - e.clientLeft, r.clientY - i.top - e.clientTop];
    }
  }
  return [r.pageX, r.pageY];
}
const cu = { passive: !1 }, xn = { capture: !0, passive: !1 };
function Ur(r) {
  r.stopImmediatePropagation();
}
function Re(r) {
  r.preventDefault(), r.stopImmediatePropagation();
}
function du(r) {
  var e = r.document.documentElement, t = G(r).on("dragstart.drag", Re, xn);
  "onselectstart" in e ? t.on("selectstart.drag", Re, xn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function hu(r, e) {
  var t = r.document.documentElement, n = G(r).on("dragstart.drag", null);
  e && (n.on("click.drag", Re, xn), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in t ? n.on("selectstart.drag", null) : (t.style.MozUserSelect = t.__noselect, delete t.__noselect);
}
const Bn = (r) => () => r;
function $i(r, {
  sourceEvent: e,
  subject: t,
  target: n,
  identifier: i,
  active: s,
  x: a,
  y: o,
  dx: c,
  dy: l,
  dispatch: d
}) {
  Object.defineProperties(this, {
    type: { value: r, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: a, enumerable: !0, configurable: !0 },
    y: { value: o, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
$i.prototype.on = function() {
  var r = this._.on.apply(this._, arguments);
  return r === this._ ? this : r;
};
function uu(r) {
  return !r.ctrlKey && !r.button;
}
function fu() {
  return this.parentNode;
}
function pu(r, e) {
  return e ?? { x: r.x, y: r.y };
}
function gu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function mu() {
  var r = uu, e = fu, t = pu, n = gu, i = {}, s = Zi("start", "drag", "end"), a = 0, o, c, l, d, h = 0;
  function u(_) {
    _.on("mousedown.drag", f).filter(n).on("touchstart.drag", m).on("touchmove.drag", b, cu).on("touchend.drag touchcancel.drag", x).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function f(_, w) {
    if (!(d || !r.call(this, _, w))) {
      var k = v(this, e.call(this, _, w), _, w, "mouse");
      k && (G(_.view).on("mousemove.drag", g, xn).on("mouseup.drag", p, xn), du(_.view), Ur(_), l = !1, o = _.clientX, c = _.clientY, k("start", _));
    }
  }
  function g(_) {
    if (Re(_), !l) {
      var w = _.clientX - o, k = _.clientY - c;
      l = w * w + k * k > h;
    }
    i.mouse("drag", _);
  }
  function p(_) {
    G(_.view).on("mousemove.drag mouseup.drag", null), hu(_.view, l), Re(_), i.mouse("end", _);
  }
  function m(_, w) {
    if (r.call(this, _, w)) {
      var k = _.changedTouches, $ = e.call(this, _, w), A = k.length, S, y;
      for (S = 0; S < A; ++S)
        (y = v(this, $, _, w, k[S].identifier, k[S])) && (Ur(_), y("start", _, k[S]));
    }
  }
  function b(_) {
    var w = _.changedTouches, k = w.length, $, A;
    for ($ = 0; $ < k; ++$)
      (A = i[w[$].identifier]) && (Re(_), A("drag", _, w[$]));
  }
  function x(_) {
    var w = _.changedTouches, k = w.length, $, A;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), $ = 0; $ < k; ++$)
      (A = i[w[$].identifier]) && (Ur(_), A("end", _, w[$]));
  }
  function v(_, w, k, $, A, S) {
    var y = s.copy(), C = ki(S || k, w), M, T, L;
    if ((L = t.call(_, new $i("beforestart", {
      sourceEvent: k,
      target: u,
      identifier: A,
      active: a,
      x: C[0],
      y: C[1],
      dx: 0,
      dy: 0,
      dispatch: y
    }), $)) != null)
      return M = L.x - C[0] || 0, T = L.y - C[1] || 0, function E(q, I, P) {
        var F = C, N;
        switch (q) {
          case "start":
            i[A] = E, N = a++;
            break;
          case "end":
            delete i[A], --a;
          // falls through
          case "drag":
            C = ki(P || I, w), N = a;
            break;
        }
        y.call(
          q,
          _,
          new $i(q, {
            sourceEvent: I,
            subject: L,
            target: u,
            identifier: A,
            active: N,
            x: C[0] + M,
            y: C[1] + T,
            dx: C[0] - F[0],
            dy: C[1] - F[1],
            dispatch: y
          }),
          $
        );
      };
  }
  return u.filter = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : Bn(!!_), u) : r;
  }, u.container = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Bn(_), u) : e;
  }, u.subject = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Bn(_), u) : t;
  }, u.touchable = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : Bn(!!_), u) : n;
  }, u.on = function() {
    var _ = s.on.apply(s, arguments);
    return _ === s ? u : _;
  }, u.clickDistance = function(_) {
    return arguments.length ? (h = (_ = +_) * _, u) : Math.sqrt(h);
  }, u;
}
function ts(r, e, t) {
  r.prototype = e.prototype = t, t.constructor = r;
}
function xo(r, e) {
  var t = Object.create(r.prototype);
  for (var n in e) t[n] = e[n];
  return t;
}
function qn() {
}
var yn = 0.7, gr = 1 / yn, De = "\\s*([+-]?\\d+)\\s*", wn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _u = /^#([0-9a-f]{3,8})$/, vu = new RegExp(`^rgb\\(${De},${De},${De}\\)$`), bu = new RegExp(`^rgb\\(${Bt},${Bt},${Bt}\\)$`), xu = new RegExp(`^rgba\\(${De},${De},${De},${wn}\\)$`), yu = new RegExp(`^rgba\\(${Bt},${Bt},${Bt},${wn}\\)$`), wu = new RegExp(`^hsl\\(${wn},${Bt},${Bt}\\)$`), ku = new RegExp(`^hsla\\(${wn},${Bt},${Bt},${wn}\\)$`), Xs = {
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
ts(qn, Ut, {
  copy(r) {
    return Object.assign(new this.constructor(), this, r);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ys,
  // Deprecated! Use color.formatHex.
  formatHex: Ys,
  formatHex8: $u,
  formatHsl: Au,
  formatRgb: Gs,
  toString: Gs
});
function Ys() {
  return this.rgb().formatHex();
}
function $u() {
  return this.rgb().formatHex8();
}
function Au() {
  return yo(this).formatHsl();
}
function Gs() {
  return this.rgb().formatRgb();
}
function Ut(r) {
  var e, t;
  return r = (r + "").trim().toLowerCase(), (e = _u.exec(r)) ? (t = e[1].length, e = parseInt(e[1], 16), t === 6 ? Ws(e) : t === 3 ? new ft(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : t === 8 ? Hn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : t === 4 ? Hn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = vu.exec(r)) ? new ft(e[1], e[2], e[3], 1) : (e = bu.exec(r)) ? new ft(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = xu.exec(r)) ? Hn(e[1], e[2], e[3], e[4]) : (e = yu.exec(r)) ? Hn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = wu.exec(r)) ? Zs(e[1], e[2] / 100, e[3] / 100, 1) : (e = ku.exec(r)) ? Zs(e[1], e[2] / 100, e[3] / 100, e[4]) : Xs.hasOwnProperty(r) ? Ws(Xs[r]) : r === "transparent" ? new ft(NaN, NaN, NaN, 0) : null;
}
function Ws(r) {
  return new ft(r >> 16 & 255, r >> 8 & 255, r & 255, 1);
}
function Hn(r, e, t, n) {
  return n <= 0 && (r = e = t = NaN), new ft(r, e, t, n);
}
function Su(r) {
  return r instanceof qn || (r = Ut(r)), r ? (r = r.rgb(), new ft(r.r, r.g, r.b, r.opacity)) : new ft();
}
function mr(r, e, t, n) {
  return arguments.length === 1 ? Su(r) : new ft(r, e, t, n ?? 1);
}
function ft(r, e, t, n) {
  this.r = +r, this.g = +e, this.b = +t, this.opacity = +n;
}
ts(ft, mr, xo(qn, {
  brighter(r) {
    return r = r == null ? gr : Math.pow(gr, r), new ft(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  darker(r) {
    return r = r == null ? yn : Math.pow(yn, r), new ft(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ft(we(this.r), we(this.g), we(this.b), _r(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Us,
  // Deprecated! Use color.formatHex.
  formatHex: Us,
  formatHex8: Cu,
  formatRgb: Ks,
  toString: Ks
}));
function Us() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}`;
}
function Cu() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}${xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ks() {
  const r = _r(this.opacity);
  return `${r === 1 ? "rgb(" : "rgba("}${we(this.r)}, ${we(this.g)}, ${we(this.b)}${r === 1 ? ")" : `, ${r})`}`;
}
function _r(r) {
  return isNaN(r) ? 1 : Math.max(0, Math.min(1, r));
}
function we(r) {
  return Math.max(0, Math.min(255, Math.round(r) || 0));
}
function xe(r) {
  return r = we(r), (r < 16 ? "0" : "") + r.toString(16);
}
function Zs(r, e, t, n) {
  return n <= 0 ? r = e = t = NaN : t <= 0 || t >= 1 ? r = e = NaN : e <= 0 && (r = NaN), new It(r, e, t, n);
}
function yo(r) {
  if (r instanceof It) return new It(r.h, r.s, r.l, r.opacity);
  if (r instanceof qn || (r = Ut(r)), !r) return new It();
  if (r instanceof It) return r;
  r = r.rgb();
  var e = r.r / 255, t = r.g / 255, n = r.b / 255, i = Math.min(e, t, n), s = Math.max(e, t, n), a = NaN, o = s - i, c = (s + i) / 2;
  return o ? (e === s ? a = (t - n) / o + (t < n) * 6 : t === s ? a = (n - e) / o + 2 : a = (e - t) / o + 4, o /= c < 0.5 ? s + i : 2 - s - i, a *= 60) : o = c > 0 && c < 1 ? 0 : a, new It(a, o, c, r.opacity);
}
function Mu(r, e, t, n) {
  return arguments.length === 1 ? yo(r) : new It(r, e, t, n ?? 1);
}
function It(r, e, t, n) {
  this.h = +r, this.s = +e, this.l = +t, this.opacity = +n;
}
ts(It, Mu, xo(qn, {
  brighter(r) {
    return r = r == null ? gr : Math.pow(gr, r), new It(this.h, this.s, this.l * r, this.opacity);
  },
  darker(r) {
    return r = r == null ? yn : Math.pow(yn, r), new It(this.h, this.s, this.l * r, this.opacity);
  },
  rgb() {
    var r = this.h % 360 + (this.h < 0) * 360, e = isNaN(r) || isNaN(this.s) ? 0 : this.s, t = this.l, n = t + (t < 0.5 ? t : 1 - t) * e, i = 2 * t - n;
    return new ft(
      Kr(r >= 240 ? r - 240 : r + 120, i, n),
      Kr(r, i, n),
      Kr(r < 120 ? r + 240 : r - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new It(Js(this.h), jn(this.s), jn(this.l), _r(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const r = _r(this.opacity);
    return `${r === 1 ? "hsl(" : "hsla("}${Js(this.h)}, ${jn(this.s) * 100}%, ${jn(this.l) * 100}%${r === 1 ? ")" : `, ${r})`}`;
  }
}));
function Js(r) {
  return r = (r || 0) % 360, r < 0 ? r + 360 : r;
}
function jn(r) {
  return Math.max(0, Math.min(1, r || 0));
}
function Kr(r, e, t) {
  return (r < 60 ? e + (t - e) * r / 60 : r < 180 ? t : r < 240 ? e + (t - e) * (240 - r) / 60 : e) * 255;
}
function Eu(r, e, t, n, i) {
  var s = r * r, a = s * r;
  return ((1 - 3 * r + 3 * s - a) * e + (4 - 6 * s + 3 * a) * t + (1 + 3 * r + 3 * s - 3 * a) * n + a * i) / 6;
}
function Tu(r) {
  var e = r.length - 1;
  return function(t) {
    var n = t <= 0 ? t = 0 : t >= 1 ? (t = 1, e - 1) : Math.floor(t * e), i = r[n], s = r[n + 1], a = n > 0 ? r[n - 1] : 2 * i - s, o = n < e - 1 ? r[n + 2] : 2 * s - i;
    return Eu((t - n / e) * e, a, i, s, o);
  };
}
const es = (r) => () => r;
function Lu(r, e) {
  return function(t) {
    return r + t * e;
  };
}
function Pu(r, e, t) {
  return r = Math.pow(r, t), e = Math.pow(e, t) - r, t = 1 / t, function(n) {
    return Math.pow(r + n * e, t);
  };
}
function zu(r) {
  return (r = +r) == 1 ? wo : function(e, t) {
    return t - e ? Pu(e, t, r) : es(isNaN(e) ? t : e);
  };
}
function wo(r, e) {
  var t = e - r;
  return t ? Lu(r, t) : es(isNaN(r) ? e : r);
}
const vr = (function r(e) {
  var t = zu(e);
  function n(i, s) {
    var a = t((i = mr(i)).r, (s = mr(s)).r), o = t(i.g, s.g), c = t(i.b, s.b), l = wo(i.opacity, s.opacity);
    return function(d) {
      return i.r = a(d), i.g = o(d), i.b = c(d), i.opacity = l(d), i + "";
    };
  }
  return n.gamma = r, n;
})(1);
function Iu(r) {
  return function(e) {
    var t = e.length, n = new Array(t), i = new Array(t), s = new Array(t), a, o;
    for (a = 0; a < t; ++a)
      o = mr(e[a]), n[a] = o.r || 0, i[a] = o.g || 0, s[a] = o.b || 0;
    return n = r(n), i = r(i), s = r(s), o.opacity = 1, function(c) {
      return o.r = n(c), o.g = i(c), o.b = s(c), o + "";
    };
  };
}
var Fu = Iu(Tu);
function qu(r, e) {
  e || (e = []);
  var t = r ? Math.min(e.length, r.length) : 0, n = e.slice(), i;
  return function(s) {
    for (i = 0; i < t; ++i) n[i] = r[i] * (1 - s) + e[i] * s;
    return n;
  };
}
function Nu(r) {
  return ArrayBuffer.isView(r) && !(r instanceof DataView);
}
function Ru(r, e) {
  var t = e ? e.length : 0, n = r ? Math.min(t, r.length) : 0, i = new Array(n), s = new Array(t), a;
  for (a = 0; a < n; ++a) i[a] = Me(r[a], e[a]);
  for (; a < t; ++a) s[a] = e[a];
  return function(o) {
    for (a = 0; a < n; ++a) s[a] = i[a](o);
    return s;
  };
}
function Du(r, e) {
  var t = /* @__PURE__ */ new Date();
  return r = +r, e = +e, function(n) {
    return t.setTime(r * (1 - n) + e * n), t;
  };
}
function zt(r, e) {
  return r = +r, e = +e, function(t) {
    return r * (1 - t) + e * t;
  };
}
function Ou(r, e) {
  var t = {}, n = {}, i;
  (r === null || typeof r != "object") && (r = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in r ? t[i] = Me(r[i], e[i]) : n[i] = e[i];
  return function(s) {
    for (i in t) n[i] = t[i](s);
    return n;
  };
}
var Ai = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Zr = new RegExp(Ai.source, "g");
function Bu(r) {
  return function() {
    return r;
  };
}
function Hu(r) {
  return function(e) {
    return r(e) + "";
  };
}
function ko(r, e) {
  var t = Ai.lastIndex = Zr.lastIndex = 0, n, i, s, a = -1, o = [], c = [];
  for (r = r + "", e = e + ""; (n = Ai.exec(r)) && (i = Zr.exec(e)); )
    (s = i.index) > t && (s = e.slice(t, s), o[a] ? o[a] += s : o[++a] = s), (n = n[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, c.push({ i: a, x: zt(n, i) })), t = Zr.lastIndex;
  return t < e.length && (s = e.slice(t), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? c[0] ? Hu(c[0].x) : Bu(e) : (e = c.length, function(l) {
    for (var d = 0, h; d < e; ++d) o[(h = c[d]).i] = h.x(l);
    return o.join("");
  });
}
function Me(r, e) {
  var t = typeof e, n;
  return e == null || t === "boolean" ? es(e) : (t === "number" ? zt : t === "string" ? (n = Ut(e)) ? (e = n, vr) : ko : e instanceof Ut ? vr : e instanceof Date ? Du : Nu(e) ? qu : Array.isArray(e) ? Ru : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ou : zt)(r, e);
}
function ns(r, e) {
  return r = +r, e = +e, function(t) {
    return Math.round(r * (1 - t) + e * t);
  };
}
var Qs = 180 / Math.PI, Si = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function $o(r, e, t, n, i, s) {
  var a, o, c;
  return (a = Math.sqrt(r * r + e * e)) && (r /= a, e /= a), (c = r * t + e * n) && (t -= r * c, n -= e * c), (o = Math.sqrt(t * t + n * n)) && (t /= o, n /= o, c /= o), r * n < e * t && (r = -r, e = -e, c = -c, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, r) * Qs,
    skewX: Math.atan(c) * Qs,
    scaleX: a,
    scaleY: o
  };
}
var Vn;
function ju(r) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(r + "");
  return e.isIdentity ? Si : $o(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Vu(r) {
  return r == null || (Vn || (Vn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vn.setAttribute("transform", r), !(r = Vn.transform.baseVal.consolidate())) ? Si : (r = r.matrix, $o(r.a, r.b, r.c, r.d, r.e, r.f));
}
function Ao(r, e, t, n) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, d, h, u, f, g) {
    if (l !== h || d !== u) {
      var p = f.push("translate(", null, e, null, t);
      g.push({ i: p - 4, x: zt(l, h) }, { i: p - 2, x: zt(d, u) });
    } else (h || u) && f.push("translate(" + h + e + u + t);
  }
  function a(l, d, h, u) {
    l !== d ? (l - d > 180 ? d += 360 : d - l > 180 && (l += 360), u.push({ i: h.push(i(h) + "rotate(", null, n) - 2, x: zt(l, d) })) : d && h.push(i(h) + "rotate(" + d + n);
  }
  function o(l, d, h, u) {
    l !== d ? u.push({ i: h.push(i(h) + "skewX(", null, n) - 2, x: zt(l, d) }) : d && h.push(i(h) + "skewX(" + d + n);
  }
  function c(l, d, h, u, f, g) {
    if (l !== h || d !== u) {
      var p = f.push(i(f) + "scale(", null, ",", null, ")");
      g.push({ i: p - 4, x: zt(l, h) }, { i: p - 2, x: zt(d, u) });
    } else (h !== 1 || u !== 1) && f.push(i(f) + "scale(" + h + "," + u + ")");
  }
  return function(l, d) {
    var h = [], u = [];
    return l = r(l), d = r(d), s(l.translateX, l.translateY, d.translateX, d.translateY, h, u), a(l.rotate, d.rotate, h, u), o(l.skewX, d.skewX, h, u), c(l.scaleX, l.scaleY, d.scaleX, d.scaleY, h, u), l = d = null, function(f) {
      for (var g = -1, p = u.length, m; ++g < p; ) h[(m = u[g]).i] = m.x(f);
      return h.join("");
    };
  };
}
var Xu = Ao(ju, "px, ", "px)", "deg)"), Yu = Ao(Vu, ", ", ")", ")");
function Gu(r, e) {
  e === void 0 && (e = r, r = Me);
  for (var t = 0, n = e.length - 1, i = e[0], s = new Array(n < 0 ? 0 : n); t < n; ) s[t] = r(i, i = e[++t]);
  return function(a) {
    var o = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return s[o](a - o);
  };
}
var Xe = 0, dn = 0, en = 0, So = 1e3, br, hn, xr = 0, Ce = 0, Nr = 0, kn = typeof performance == "object" && performance.now ? performance : Date, Co = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(r) {
  setTimeout(r, 17);
};
function rs() {
  return Ce || (Co(Wu), Ce = kn.now() + Nr);
}
function Wu() {
  Ce = 0;
}
function yr() {
  this._call = this._time = this._next = null;
}
yr.prototype = Mo.prototype = {
  constructor: yr,
  restart: function(r, e, t) {
    if (typeof r != "function") throw new TypeError("callback is not a function");
    t = (t == null ? rs() : +t) + (e == null ? 0 : +e), !this._next && hn !== this && (hn ? hn._next = this : br = this, hn = this), this._call = r, this._time = t, Ci();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ci());
  }
};
function Mo(r, e, t) {
  var n = new yr();
  return n.restart(r, e, t), n;
}
function Uu() {
  rs(), ++Xe;
  for (var r = br, e; r; )
    (e = Ce - r._time) >= 0 && r._call.call(void 0, e), r = r._next;
  --Xe;
}
function ta() {
  Ce = (xr = kn.now()) + Nr, Xe = dn = 0;
  try {
    Uu();
  } finally {
    Xe = 0, Zu(), Ce = 0;
  }
}
function Ku() {
  var r = kn.now(), e = r - xr;
  e > So && (Nr -= e, xr = r);
}
function Zu() {
  for (var r, e = br, t, n = 1 / 0; e; )
    e._call ? (n > e._time && (n = e._time), r = e, e = e._next) : (t = e._next, e._next = null, e = r ? r._next = t : br = t);
  hn = r, Ci(n);
}
function Ci(r) {
  if (!Xe) {
    dn && (dn = clearTimeout(dn));
    var e = r - Ce;
    e > 24 ? (r < 1 / 0 && (dn = setTimeout(ta, r - kn.now() - Nr)), en && (en = clearInterval(en))) : (en || (xr = kn.now(), en = setInterval(Ku, So)), Xe = 1, Co(ta));
  }
}
function ea(r, e, t) {
  var n = new yr();
  return e = e == null ? 0 : +e, n.restart((i) => {
    n.stop(), r(i + e);
  }, e, t), n;
}
var Ju = Zi("start", "end", "cancel", "interrupt"), Qu = [], Eo = 0, na = 1, Mi = 2, ir = 3, ra = 4, Ei = 5, sr = 6;
function Rr(r, e, t, n, i, s) {
  var a = r.__transition;
  if (!a) r.__transition = {};
  else if (t in a) return;
  tf(r, t, {
    name: e,
    index: n,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ju,
    tween: Qu,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Eo
  });
}
function is(r, e) {
  var t = Ft(r, e);
  if (t.state > Eo) throw new Error("too late; already scheduled");
  return t;
}
function jt(r, e) {
  var t = Ft(r, e);
  if (t.state > ir) throw new Error("too late; already running");
  return t;
}
function Ft(r, e) {
  var t = r.__transition;
  if (!t || !(t = t[e])) throw new Error("transition not found");
  return t;
}
function tf(r, e, t) {
  var n = r.__transition, i;
  n[e] = t, t.timer = Mo(s, 0, t.time);
  function s(l) {
    t.state = na, t.timer.restart(a, t.delay, t.time), t.delay <= l && a(l - t.delay);
  }
  function a(l) {
    var d, h, u, f;
    if (t.state !== na) return c();
    for (d in n)
      if (f = n[d], f.name === t.name) {
        if (f.state === ir) return ea(a);
        f.state === ra ? (f.state = sr, f.timer.stop(), f.on.call("interrupt", r, r.__data__, f.index, f.group), delete n[d]) : +d < e && (f.state = sr, f.timer.stop(), f.on.call("cancel", r, r.__data__, f.index, f.group), delete n[d]);
      }
    if (ea(function() {
      t.state === ir && (t.state = ra, t.timer.restart(o, t.delay, t.time), o(l));
    }), t.state = Mi, t.on.call("start", r, r.__data__, t.index, t.group), t.state === Mi) {
      for (t.state = ir, i = new Array(u = t.tween.length), d = 0, h = -1; d < u; ++d)
        (f = t.tween[d].value.call(r, r.__data__, t.index, t.group)) && (i[++h] = f);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var d = l < t.duration ? t.ease.call(null, l / t.duration) : (t.timer.restart(c), t.state = Ei, 1), h = -1, u = i.length; ++h < u; )
      i[h].call(r, d);
    t.state === Ei && (t.on.call("end", r, r.__data__, t.index, t.group), c());
  }
  function c() {
    t.state = sr, t.timer.stop(), delete n[e];
    for (var l in n) return;
    delete r.__transition;
  }
}
function ef(r, e) {
  var t = r.__transition, n, i, s = !0, a;
  if (t) {
    e = e == null ? null : e + "";
    for (a in t) {
      if ((n = t[a]).name !== e) {
        s = !1;
        continue;
      }
      i = n.state > Mi && n.state < Ei, n.state = sr, n.timer.stop(), n.on.call(i ? "interrupt" : "cancel", r, r.__data__, n.index, n.group), delete t[a];
    }
    s && delete r.__transition;
  }
}
function nf(r) {
  return this.each(function() {
    ef(this, r);
  });
}
function rf(r, e) {
  var t, n;
  return function() {
    var i = jt(this, r), s = i.tween;
    if (s !== t) {
      n = t = s;
      for (var a = 0, o = n.length; a < o; ++a)
        if (n[a].name === e) {
          n = n.slice(), n.splice(a, 1);
          break;
        }
    }
    i.tween = n;
  };
}
function sf(r, e, t) {
  var n, i;
  if (typeof t != "function") throw new Error();
  return function() {
    var s = jt(this, r), a = s.tween;
    if (a !== n) {
      i = (n = a).slice();
      for (var o = { name: e, value: t }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    s.tween = i;
  };
}
function af(r, e) {
  var t = this._id;
  if (r += "", arguments.length < 2) {
    for (var n = Ft(this.node(), t).tween, i = 0, s = n.length, a; i < s; ++i)
      if ((a = n[i]).name === r)
        return a.value;
    return null;
  }
  return this.each((e == null ? rf : sf)(t, r, e));
}
function ss(r, e, t) {
  var n = r._id;
  return r.each(function() {
    var i = jt(this, n);
    (i.value || (i.value = {}))[e] = t.apply(this, arguments);
  }), function(i) {
    return Ft(i, n).value[e];
  };
}
function To(r, e) {
  var t;
  return (typeof e == "number" ? zt : e instanceof Ut ? vr : (t = Ut(e)) ? (e = t, vr) : ko)(r, e);
}
function of(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function lf(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function cf(r, e, t) {
  var n, i = t + "", s;
  return function() {
    var a = this.getAttribute(r);
    return a === i ? null : a === n ? s : s = e(n = a, t);
  };
}
function df(r, e, t) {
  var n, i = t + "", s;
  return function() {
    var a = this.getAttributeNS(r.space, r.local);
    return a === i ? null : a === n ? s : s = e(n = a, t);
  };
}
function hf(r, e, t) {
  var n, i, s;
  return function() {
    var a, o = t(this), c;
    return o == null ? void this.removeAttribute(r) : (a = this.getAttribute(r), c = o + "", a === c ? null : a === n && c === i ? s : (i = c, s = e(n = a, o)));
  };
}
function uf(r, e, t) {
  var n, i, s;
  return function() {
    var a, o = t(this), c;
    return o == null ? void this.removeAttributeNS(r.space, r.local) : (a = this.getAttributeNS(r.space, r.local), c = o + "", a === c ? null : a === n && c === i ? s : (i = c, s = e(n = a, o)));
  };
}
function ff(r, e) {
  var t = qr(r), n = t === "transform" ? Yu : To;
  return this.attrTween(r, typeof e == "function" ? (t.local ? uf : hf)(t, n, ss(this, "attr." + r, e)) : e == null ? (t.local ? lf : of)(t) : (t.local ? df : cf)(t, n, e));
}
function pf(r, e) {
  return function(t) {
    this.setAttribute(r, e.call(this, t));
  };
}
function gf(r, e) {
  return function(t) {
    this.setAttributeNS(r.space, r.local, e.call(this, t));
  };
}
function mf(r, e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && gf(r, s)), t;
  }
  return i._value = e, i;
}
function _f(r, e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && pf(r, s)), t;
  }
  return i._value = e, i;
}
function vf(r, e) {
  var t = "attr." + r;
  if (arguments.length < 2) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  var n = qr(r);
  return this.tween(t, (n.local ? mf : _f)(n, e));
}
function bf(r, e) {
  return function() {
    is(this, r).delay = +e.apply(this, arguments);
  };
}
function xf(r, e) {
  return e = +e, function() {
    is(this, r).delay = e;
  };
}
function yf(r) {
  var e = this._id;
  return arguments.length ? this.each((typeof r == "function" ? bf : xf)(e, r)) : Ft(this.node(), e).delay;
}
function wf(r, e) {
  return function() {
    jt(this, r).duration = +e.apply(this, arguments);
  };
}
function kf(r, e) {
  return e = +e, function() {
    jt(this, r).duration = e;
  };
}
function $f(r) {
  var e = this._id;
  return arguments.length ? this.each((typeof r == "function" ? wf : kf)(e, r)) : Ft(this.node(), e).duration;
}
function Af(r, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    jt(this, r).ease = e;
  };
}
function Sf(r) {
  var e = this._id;
  return arguments.length ? this.each(Af(e, r)) : Ft(this.node(), e).ease;
}
function Cf(r, e) {
  return function() {
    var t = e.apply(this, arguments);
    if (typeof t != "function") throw new Error();
    jt(this, r).ease = t;
  };
}
function Mf(r) {
  if (typeof r != "function") throw new Error();
  return this.each(Cf(this._id, r));
}
function Ef(r) {
  typeof r != "function" && (r = co(r));
  for (var e = this._groups, t = e.length, n = new Array(t), i = 0; i < t; ++i)
    for (var s = e[i], a = s.length, o = n[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && r.call(c, c.__data__, l, s) && o.push(c);
  return new Kt(n, this._parents, this._name, this._id);
}
function Tf(r) {
  if (r._id !== this._id) throw new Error();
  for (var e = this._groups, t = r._groups, n = e.length, i = t.length, s = Math.min(n, i), a = new Array(n), o = 0; o < s; ++o)
    for (var c = e[o], l = t[o], d = c.length, h = a[o] = new Array(d), u, f = 0; f < d; ++f)
      (u = c[f] || l[f]) && (h[f] = u);
  for (; o < n; ++o)
    a[o] = e[o];
  return new Kt(a, this._parents, this._name, this._id);
}
function Lf(r) {
  return (r + "").trim().split(/^|\s+/).every(function(e) {
    var t = e.indexOf(".");
    return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
  });
}
function Pf(r, e, t) {
  var n, i, s = Lf(e) ? is : jt;
  return function() {
    var a = s(this, r), o = a.on;
    o !== n && (i = (n = o).copy()).on(e, t), a.on = i;
  };
}
function zf(r, e) {
  var t = this._id;
  return arguments.length < 2 ? Ft(this.node(), t).on.on(r) : this.each(Pf(t, r, e));
}
function If(r) {
  return function() {
    var e = this.parentNode;
    for (var t in this.__transition) if (+t !== r) return;
    e && e.removeChild(this);
  };
}
function Ff() {
  return this.on("end.remove", If(this._id));
}
function qf(r) {
  var e = this._name, t = this._id;
  typeof r != "function" && (r = Ji(r));
  for (var n = this._groups, i = n.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = n[a], c = o.length, l = s[a] = new Array(c), d, h, u = 0; u < c; ++u)
      (d = o[u]) && (h = r.call(d, d.__data__, u, o)) && ("__data__" in d && (h.__data__ = d.__data__), l[u] = h, Rr(l[u], e, t, u, l, Ft(d, t)));
  return new Kt(s, this._parents, e, t);
}
function Nf(r) {
  var e = this._name, t = this._id;
  typeof r != "function" && (r = lo(r));
  for (var n = this._groups, i = n.length, s = [], a = [], o = 0; o < i; ++o)
    for (var c = n[o], l = c.length, d, h = 0; h < l; ++h)
      if (d = c[h]) {
        for (var u = r.call(d, d.__data__, h, c), f, g = Ft(d, t), p = 0, m = u.length; p < m; ++p)
          (f = u[p]) && Rr(f, e, t, p, u, g);
        s.push(u), a.push(d);
      }
  return new Kt(s, a, e, t);
}
var Rf = Fn.prototype.constructor;
function Df() {
  return new Rf(this._groups, this._parents);
}
function Of(r, e) {
  var t, n, i;
  return function() {
    var s = Ve(this, r), a = (this.style.removeProperty(r), Ve(this, r));
    return s === a ? null : s === t && a === n ? i : i = e(t = s, n = a);
  };
}
function Lo(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function Bf(r, e, t) {
  var n, i = t + "", s;
  return function() {
    var a = Ve(this, r);
    return a === i ? null : a === n ? s : s = e(n = a, t);
  };
}
function Hf(r, e, t) {
  var n, i, s;
  return function() {
    var a = Ve(this, r), o = t(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(r), Ve(this, r))), a === c ? null : a === n && c === i ? s : (i = c, s = e(n = a, o));
  };
}
function jf(r, e) {
  var t, n, i, s = "style." + e, a = "end." + s, o;
  return function() {
    var c = jt(this, r), l = c.on, d = c.value[s] == null ? o || (o = Lo(e)) : void 0;
    (l !== t || i !== d) && (n = (t = l).copy()).on(a, i = d), c.on = n;
  };
}
function Vf(r, e, t) {
  var n = (r += "") == "transform" ? Xu : To;
  return e == null ? this.styleTween(r, Of(r, n)).on("end.style." + r, Lo(r)) : typeof e == "function" ? this.styleTween(r, Hf(r, n, ss(this, "style." + r, e))).each(jf(this._id, r)) : this.styleTween(r, Bf(r, n, e), t).on("end.style." + r, null);
}
function Xf(r, e, t) {
  return function(n) {
    this.style.setProperty(r, e.call(this, n), t);
  };
}
function Yf(r, e, t) {
  var n, i;
  function s() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && Xf(r, a, t)), n;
  }
  return s._value = e, s;
}
function Gf(r, e, t) {
  var n = "style." + (r += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  return this.tween(n, Yf(r, e, t ?? ""));
}
function Wf(r) {
  return function() {
    this.textContent = r;
  };
}
function Uf(r) {
  return function() {
    var e = r(this);
    this.textContent = e ?? "";
  };
}
function Kf(r) {
  return this.tween("text", typeof r == "function" ? Uf(ss(this, "text", r)) : Wf(r == null ? "" : r + ""));
}
function Zf(r) {
  return function(e) {
    this.textContent = r.call(this, e);
  };
}
function Jf(r) {
  var e, t;
  function n() {
    var i = r.apply(this, arguments);
    return i !== t && (e = (t = i) && Zf(i)), e;
  }
  return n._value = r, n;
}
function Qf(r) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (r == null) return this.tween(e, null);
  if (typeof r != "function") throw new Error();
  return this.tween(e, Jf(r));
}
function tp() {
  for (var r = this._name, e = this._id, t = Po(), n = this._groups, i = n.length, s = 0; s < i; ++s)
    for (var a = n[s], o = a.length, c, l = 0; l < o; ++l)
      if (c = a[l]) {
        var d = Ft(c, e);
        Rr(c, r, t, l, a, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Kt(n, this._parents, r, t);
}
function ep() {
  var r, e, t = this, n = t._id, i = t.size();
  return new Promise(function(s, a) {
    var o = { value: a }, c = { value: function() {
      --i === 0 && s();
    } };
    t.each(function() {
      var l = jt(this, n), d = l.on;
      d !== r && (e = (r = d).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), l.on = e;
    }), i === 0 && s();
  });
}
var np = 0;
function Kt(r, e, t, n) {
  this._groups = r, this._parents = e, this._name = t, this._id = n;
}
function Po() {
  return ++np;
}
var Xt = Fn.prototype;
Kt.prototype = {
  constructor: Kt,
  select: qf,
  selectAll: Nf,
  selectChild: Xt.selectChild,
  selectChildren: Xt.selectChildren,
  filter: Ef,
  merge: Tf,
  selection: Df,
  transition: tp,
  call: Xt.call,
  nodes: Xt.nodes,
  node: Xt.node,
  size: Xt.size,
  empty: Xt.empty,
  each: Xt.each,
  on: zf,
  attr: ff,
  attrTween: vf,
  style: Vf,
  styleTween: Gf,
  text: Kf,
  textTween: Qf,
  remove: Ff,
  tween: af,
  delay: yf,
  duration: $f,
  ease: Sf,
  easeVarying: Mf,
  end: ep,
  [Symbol.iterator]: Xt[Symbol.iterator]
};
function $n(r) {
  return r * (2 - r);
}
function rp(r) {
  return ((r *= 2) <= 1 ? r * r * r : (r -= 2) * r * r + 2) / 2;
}
var as = 1.70158;
(function r(e) {
  e = +e;
  function t(n) {
    return (n = +n) * n * (e * (n - 1) + n);
  }
  return t.overshoot = r, t;
})(as);
var ip = (function r(e) {
  e = +e;
  function t(n) {
    return --n * n * ((n + 1) * e + n) + 1;
  }
  return t.overshoot = r, t;
})(as);
(function r(e) {
  e = +e;
  function t(n) {
    return ((n *= 2) < 1 ? n * n * ((e + 1) * n - e) : (n -= 2) * n * ((e + 1) * n + e) + 2) / 2;
  }
  return t.overshoot = r, t;
})(as);
var sp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: rp
};
function ap(r, e) {
  for (var t; !(t = r.__transition) || !(t = t[e]); )
    if (!(r = r.parentNode))
      throw new Error(`transition ${e} not found`);
  return t;
}
function op(r) {
  var e, t;
  r instanceof Kt ? (e = r._id, r = r._name) : (e = Po(), (t = sp).time = rs(), r = r == null ? null : r + "");
  for (var n = this._groups, i = n.length, s = 0; s < i; ++s)
    for (var a = n[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && Rr(c, r, e, l, a, t || ap(c, e));
  return new Kt(n, this._parents, r, e);
}
Fn.prototype.interrupt = nf;
Fn.prototype.transition = op;
const Ti = Math.PI, Li = 2 * Ti, _e = 1e-6, lp = Li - _e;
function zo(r) {
  this._ += r[0];
  for (let e = 1, t = r.length; e < t; ++e)
    this._ += arguments[e] + r[e];
}
function cp(r) {
  let e = Math.floor(r);
  if (!(e >= 0)) throw new Error(`invalid digits: ${r}`);
  if (e > 15) return zo;
  const t = 10 ** e;
  return function(n) {
    this._ += n[0];
    for (let i = 1, s = n.length; i < s; ++i)
      this._ += Math.round(arguments[i] * t) / t + n[i];
  };
}
let dp = class {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? zo : cp(e);
  }
  moveTo(e, t) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, t) {
    this._append`L${this._x1 = +e},${this._y1 = +t}`;
  }
  quadraticCurveTo(e, t, n, i) {
    this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(e, t, n, i, s, a) {
    this._append`C${+e},${+t},${+n},${+i},${this._x1 = +s},${this._y1 = +a}`;
  }
  arcTo(e, t, n, i, s) {
    if (e = +e, t = +t, n = +n, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let a = this._x1, o = this._y1, c = n - e, l = i - t, d = a - e, h = o - t, u = d * d + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = t}`;
    else if (u > _e) if (!(Math.abs(h * c - l * d) > _e) || !s)
      this._append`L${this._x1 = e},${this._y1 = t}`;
    else {
      let f = n - a, g = i - o, p = c * c + l * l, m = f * f + g * g, b = Math.sqrt(p), x = Math.sqrt(u), v = s * Math.tan((Ti - Math.acos((p + u - m) / (2 * b * x))) / 2), _ = v / x, w = v / b;
      Math.abs(_ - 1) > _e && this._append`L${e + _ * d},${t + _ * h}`, this._append`A${s},${s},0,0,${+(h * f > d * g)},${this._x1 = e + w * c},${this._y1 = t + w * l}`;
    }
  }
  arc(e, t, n, i, s, a) {
    if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(i), c = n * Math.sin(i), l = e + o, d = t + c, h = 1 ^ a, u = a ? i - s : s - i;
    this._x1 === null ? this._append`M${l},${d}` : (Math.abs(this._x1 - l) > _e || Math.abs(this._y1 - d) > _e) && this._append`L${l},${d}`, n && (u < 0 && (u = u % Li + Li), u > lp ? this._append`A${n},${n},0,1,${h},${e - o},${t - c}A${n},${n},0,1,${h},${this._x1 = l},${this._y1 = d}` : u > _e && this._append`A${n},${n},0,${+(u >= Ti)},${h},${this._x1 = e + n * Math.cos(s)},${this._y1 = t + n * Math.sin(s)}`);
  }
  rect(e, t, n, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
};
function hp(r) {
  return Math.abs(r = Math.round(r)) >= 1e21 ? r.toLocaleString("en").replace(/,/g, "") : r.toString(10);
}
function wr(r, e) {
  if (!isFinite(r) || r === 0) return null;
  var t = (r = e ? r.toExponential(e - 1) : r.toExponential()).indexOf("e"), n = r.slice(0, t);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +r.slice(t + 1)
  ];
}
function Ye(r) {
  return r = wr(Math.abs(r)), r ? r[1] : NaN;
}
function up(r, e) {
  return function(t, n) {
    for (var i = t.length, s = [], a = 0, o = r[0], c = 0; i > 0 && o > 0 && (c + o + 1 > n && (o = Math.max(1, n - c)), s.push(t.substring(i -= o, i + o)), !((c += o + 1) > n)); )
      o = r[a = (a + 1) % r.length];
    return s.reverse().join(e);
  };
}
function fp(r) {
  return function(e) {
    return e.replace(/[0-9]/g, function(t) {
      return r[+t];
    });
  };
}
var pp = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function kr(r) {
  if (!(e = pp.exec(r))) throw new Error("invalid format: " + r);
  var e;
  return new os({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
kr.prototype = os.prototype;
function os(r) {
  this.fill = r.fill === void 0 ? " " : r.fill + "", this.align = r.align === void 0 ? ">" : r.align + "", this.sign = r.sign === void 0 ? "-" : r.sign + "", this.symbol = r.symbol === void 0 ? "" : r.symbol + "", this.zero = !!r.zero, this.width = r.width === void 0 ? void 0 : +r.width, this.comma = !!r.comma, this.precision = r.precision === void 0 ? void 0 : +r.precision, this.trim = !!r.trim, this.type = r.type === void 0 ? "" : r.type + "";
}
os.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function gp(r) {
  t: for (var e = r.length, t = 1, n = -1, i; t < e; ++t)
    switch (r[t]) {
      case ".":
        n = i = t;
        break;
      case "0":
        n === 0 && (n = t), i = t;
        break;
      default:
        if (!+r[t]) break t;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? r.slice(0, n) + r.slice(i + 1) : r;
}
var $r;
function mp(r, e) {
  var t = wr(r, e);
  if (!t) return $r = void 0, r.toPrecision(e);
  var n = t[0], i = t[1], s = i - ($r = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = n.length;
  return s === a ? n : s > a ? n + new Array(s - a + 1).join("0") : s > 0 ? n.slice(0, s) + "." + n.slice(s) : "0." + new Array(1 - s).join("0") + wr(r, Math.max(0, e + s - 1))[0];
}
function ia(r, e) {
  var t = wr(r, e);
  if (!t) return r + "";
  var n = t[0], i = t[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const sa = {
  "%": (r, e) => (r * 100).toFixed(e),
  b: (r) => Math.round(r).toString(2),
  c: (r) => r + "",
  d: hp,
  e: (r, e) => r.toExponential(e),
  f: (r, e) => r.toFixed(e),
  g: (r, e) => r.toPrecision(e),
  o: (r) => Math.round(r).toString(8),
  p: (r, e) => ia(r * 100, e),
  r: ia,
  s: mp,
  X: (r) => Math.round(r).toString(16).toUpperCase(),
  x: (r) => Math.round(r).toString(16)
};
function aa(r) {
  return r;
}
var oa = Array.prototype.map, la = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function _p(r) {
  var e = r.grouping === void 0 || r.thousands === void 0 ? aa : up(oa.call(r.grouping, Number), r.thousands + ""), t = r.currency === void 0 ? "" : r.currency[0] + "", n = r.currency === void 0 ? "" : r.currency[1] + "", i = r.decimal === void 0 ? "." : r.decimal + "", s = r.numerals === void 0 ? aa : fp(oa.call(r.numerals, String)), a = r.percent === void 0 ? "%" : r.percent + "", o = r.minus === void 0 ? "−" : r.minus + "", c = r.nan === void 0 ? "NaN" : r.nan + "";
  function l(h, u) {
    h = kr(h);
    var f = h.fill, g = h.align, p = h.sign, m = h.symbol, b = h.zero, x = h.width, v = h.comma, _ = h.precision, w = h.trim, k = h.type;
    k === "n" ? (v = !0, k = "g") : sa[k] || (_ === void 0 && (_ = 12), w = !0, k = "g"), (b || f === "0" && g === "=") && (b = !0, f = "0", g = "=");
    var $ = (u && u.prefix !== void 0 ? u.prefix : "") + (m === "$" ? t : m === "#" && /[boxX]/.test(k) ? "0" + k.toLowerCase() : ""), A = (m === "$" ? n : /[%p]/.test(k) ? a : "") + (u && u.suffix !== void 0 ? u.suffix : ""), S = sa[k], y = /[defgprs%]/.test(k);
    _ = _ === void 0 ? 6 : /[gprs]/.test(k) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
    function C(M) {
      var T = $, L = A, E, q, I;
      if (k === "c")
        L = S(M) + L, M = "";
      else {
        M = +M;
        var P = M < 0 || 1 / M < 0;
        if (M = isNaN(M) ? c : S(Math.abs(M), _), w && (M = gp(M)), P && +M == 0 && p !== "+" && (P = !1), T = (P ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + T, L = (k === "s" && !isNaN(M) && $r !== void 0 ? la[8 + $r / 3] : "") + L + (P && p === "(" ? ")" : ""), y) {
          for (E = -1, q = M.length; ++E < q; )
            if (I = M.charCodeAt(E), 48 > I || I > 57) {
              L = (I === 46 ? i + M.slice(E + 1) : M.slice(E)) + L, M = M.slice(0, E);
              break;
            }
        }
      }
      v && !b && (M = e(M, 1 / 0));
      var F = T.length + M.length + L.length, N = F < x ? new Array(x - F + 1).join(f) : "";
      switch (v && b && (M = e(N + M, N.length ? x - L.length : 1 / 0), N = ""), g) {
        case "<":
          M = T + M + L + N;
          break;
        case "=":
          M = T + N + M + L;
          break;
        case "^":
          M = N.slice(0, F = N.length >> 1) + T + M + L + N.slice(F);
          break;
        default:
          M = N + T + M + L;
          break;
      }
      return s(M);
    }
    return C.toString = function() {
      return h + "";
    }, C;
  }
  function d(h, u) {
    var f = Math.max(-8, Math.min(8, Math.floor(Ye(u) / 3))) * 3, g = Math.pow(10, -f), p = l((h = kr(h), h.type = "f", h), { suffix: la[8 + f / 3] });
    return function(m) {
      return p(g * m);
    };
  }
  return {
    format: l,
    formatPrefix: d
  };
}
var Xn, Io, Fo;
vp({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function vp(r) {
  return Xn = _p(r), Io = Xn.format, Fo = Xn.formatPrefix, Xn;
}
function bp(r) {
  return Math.max(0, -Ye(Math.abs(r)));
}
function xp(r, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ye(e) / 3))) * 3 - Ye(Math.abs(r)));
}
function yp(r, e) {
  return r = Math.abs(r), e = Math.abs(e) - r, Math.max(0, Ye(e) - Ye(r)) + 1;
}
function wp(r) {
  var e = 0, t = r.children, n = t && t.length;
  if (!n) e = 1;
  else for (; --n >= 0; ) e += t[n].value;
  r.value = e;
}
function kp() {
  return this.eachAfter(wp);
}
function $p(r, e) {
  let t = -1;
  for (const n of this)
    r.call(e, n, ++t, this);
  return this;
}
function Ap(r, e) {
  for (var t = this, n = [t], i, s, a = -1; t = n.pop(); )
    if (r.call(e, t, ++a, this), i = t.children)
      for (s = i.length - 1; s >= 0; --s)
        n.push(i[s]);
  return this;
}
function Sp(r, e) {
  for (var t = this, n = [t], i = [], s, a, o, c = -1; t = n.pop(); )
    if (i.push(t), s = t.children)
      for (a = 0, o = s.length; a < o; ++a)
        n.push(s[a]);
  for (; t = i.pop(); )
    r.call(e, t, ++c, this);
  return this;
}
function Cp(r, e) {
  let t = -1;
  for (const n of this)
    if (r.call(e, n, ++t, this))
      return n;
}
function Mp(r) {
  return this.eachAfter(function(e) {
    for (var t = +r(e.data) || 0, n = e.children, i = n && n.length; --i >= 0; ) t += n[i].value;
    e.value = t;
  });
}
function Ep(r) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(r);
  });
}
function Tp(r) {
  for (var e = this, t = Lp(e, r), n = [e]; e !== t; )
    e = e.parent, n.push(e);
  for (var i = n.length; r !== t; )
    n.splice(i, 0, r), r = r.parent;
  return n;
}
function Lp(r, e) {
  if (r === e) return r;
  var t = r.ancestors(), n = e.ancestors(), i = null;
  for (r = t.pop(), e = n.pop(); r === e; )
    i = r, r = t.pop(), e = n.pop();
  return i;
}
function Pp() {
  for (var r = this, e = [r]; r = r.parent; )
    e.push(r);
  return e;
}
function zp() {
  return Array.from(this);
}
function Ip() {
  var r = [];
  return this.eachBefore(function(e) {
    e.children || r.push(e);
  }), r;
}
function Fp() {
  var r = this, e = [];
  return r.each(function(t) {
    t !== r && e.push({ source: t.parent, target: t });
  }), e;
}
function* qp() {
  var r = this, e, t = [r], n, i, s;
  do
    for (e = t.reverse(), t = []; r = e.pop(); )
      if (yield r, n = r.children)
        for (i = 0, s = n.length; i < s; ++i)
          t.push(n[i]);
  while (t.length);
}
function Ar(r, e) {
  r instanceof Map ? (r = [void 0, r], e === void 0 && (e = Dp)) : e === void 0 && (e = Rp);
  for (var t = new An(r), n, i = [t], s, a, o, c; n = i.pop(); )
    if ((a = e(n.data)) && (c = (a = Array.from(a)).length))
      for (n.children = a, o = c - 1; o >= 0; --o)
        i.push(s = a[o] = new An(a[o])), s.parent = n, s.depth = n.depth + 1;
  return t.eachBefore(Bp);
}
function Np() {
  return Ar(this).eachBefore(Op);
}
function Rp(r) {
  return r.children;
}
function Dp(r) {
  return Array.isArray(r) ? r[1] : null;
}
function Op(r) {
  r.data.value !== void 0 && (r.value = r.data.value), r.data = r.data.data;
}
function Bp(r) {
  var e = 0;
  do
    r.height = e;
  while ((r = r.parent) && r.height < ++e);
}
function An(r) {
  this.data = r, this.depth = this.height = 0, this.parent = null;
}
An.prototype = Ar.prototype = {
  constructor: An,
  count: kp,
  each: $p,
  eachAfter: Sp,
  eachBefore: Ap,
  find: Cp,
  sum: Mp,
  sort: Ep,
  path: Tp,
  ancestors: Pp,
  descendants: zp,
  leaves: Ip,
  links: Fp,
  copy: Np,
  [Symbol.iterator]: qp
};
function Hp(r, e) {
  return r.parent === e.parent ? 1 : 2;
}
function Jr(r) {
  var e = r.children;
  return e ? e[0] : r.t;
}
function Qr(r) {
  var e = r.children;
  return e ? e[e.length - 1] : r.t;
}
function jp(r, e, t) {
  var n = t / (e.i - r.i);
  e.c -= n, e.s += t, r.c += n, e.z += t, e.m += t;
}
function Vp(r) {
  for (var e = 0, t = 0, n = r.children, i = n.length, s; --i >= 0; )
    s = n[i], s.z += e, s.m += e, e += s.s + (t += s.c);
}
function Xp(r, e, t) {
  return r.a.parent === e.parent ? r.a : t;
}
function ar(r, e) {
  this._ = r, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
ar.prototype = Object.create(An.prototype);
function Yp(r) {
  for (var e = new ar(r, 0), t, n = [e], i, s, a, o; t = n.pop(); )
    if (s = t._.children)
      for (t.children = new Array(o = s.length), a = o - 1; a >= 0; --a)
        n.push(i = t.children[a] = new ar(s[a], a)), i.parent = t;
  return (e.parent = new ar(null, 0)).children = [e], e;
}
function Gp() {
  var r = Hp, e = 1, t = 1, n = null;
  function i(l) {
    var d = Yp(l);
    if (d.eachAfter(s), d.parent.m = -d.z, d.eachBefore(a), n) l.eachBefore(c);
    else {
      var h = l, u = l, f = l;
      l.eachBefore(function(x) {
        x.x < h.x && (h = x), x.x > u.x && (u = x), x.depth > f.depth && (f = x);
      });
      var g = h === u ? 1 : r(h, u) / 2, p = g - h.x, m = e / (u.x + g + p), b = t / (f.depth || 1);
      l.eachBefore(function(x) {
        x.x = (x.x + p) * m, x.y = x.depth * b;
      });
    }
    return l;
  }
  function s(l) {
    var d = l.children, h = l.parent.children, u = l.i ? h[l.i - 1] : null;
    if (d) {
      Vp(l);
      var f = (d[0].z + d[d.length - 1].z) / 2;
      u ? (l.z = u.z + r(l._, u._), l.m = l.z - f) : l.z = f;
    } else u && (l.z = u.z + r(l._, u._));
    l.parent.A = o(l, u, l.parent.A || h[0]);
  }
  function a(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function o(l, d, h) {
    if (d) {
      for (var u = l, f = l, g = d, p = u.parent.children[0], m = u.m, b = f.m, x = g.m, v = p.m, _; g = Qr(g), u = Jr(u), g && u; )
        p = Jr(p), f = Qr(f), f.a = l, _ = g.z + x - u.z - m + r(g._, u._), _ > 0 && (jp(Xp(g, l, h), l, _), m += _, b += _), x += g.m, m += u.m, v += p.m, b += f.m;
      g && !Qr(f) && (f.t = g, f.m += x - b), u && !Jr(p) && (p.t = u, p.m += m - v, h = l);
    }
    return h;
  }
  function c(l) {
    l.x *= e, l.y = l.depth * t;
  }
  return i.separation = function(l) {
    return arguments.length ? (r = l, i) : r;
  }, i.size = function(l) {
    return arguments.length ? (n = !1, e = +l[0], t = +l[1], i) : n ? null : [e, t];
  }, i.nodeSize = function(l) {
    return arguments.length ? (n = !0, e = +l[0], t = +l[1], i) : n ? [e, t] : null;
  }, i;
}
function Wp(r, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(r);
      break;
    default:
      this.range(e).domain(r);
      break;
  }
  return this;
}
function qo(r, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof r == "function" ? this.interpolator(r) : this.range(r);
      break;
    }
    default: {
      this.domain(r), typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
  }
  return this;
}
function Up(r) {
  return function() {
    return r;
  };
}
function Kp(r) {
  return +r;
}
var ca = [0, 1];
function Dt(r) {
  return r;
}
function Pi(r, e) {
  return (e -= r = +r) ? function(t) {
    return (t - r) / e;
  } : Up(isNaN(e) ? NaN : 0.5);
}
function Zp(r, e) {
  var t;
  return r > e && (t = r, r = e, e = t), function(n) {
    return Math.max(r, Math.min(e, n));
  };
}
function Jp(r, e, t) {
  var n = r[0], i = r[1], s = e[0], a = e[1];
  return i < n ? (n = Pi(i, n), s = t(a, s)) : (n = Pi(n, i), s = t(s, a)), function(o) {
    return s(n(o));
  };
}
function Qp(r, e, t) {
  var n = Math.min(r.length, e.length) - 1, i = new Array(n), s = new Array(n), a = -1;
  for (r[n] < r[0] && (r = r.slice().reverse(), e = e.slice().reverse()); ++a < n; )
    i[a] = Pi(r[a], r[a + 1]), s[a] = t(e[a], e[a + 1]);
  return function(o) {
    var c = fd(r, o, 1, n) - 1;
    return s[c](i[c](o));
  };
}
function tg(r, e) {
  return e.domain(r.domain()).range(r.range()).interpolate(r.interpolate()).clamp(r.clamp()).unknown(r.unknown());
}
function eg() {
  var r = ca, e = ca, t = Me, n, i, s, a = Dt, o, c, l;
  function d() {
    var u = Math.min(r.length, e.length);
    return a !== Dt && (a = Zp(r[0], r[u - 1])), o = u > 2 ? Qp : Jp, c = l = null, h;
  }
  function h(u) {
    return u == null || isNaN(u = +u) ? s : (c || (c = o(r.map(n), e, t)))(n(a(u)));
  }
  return h.invert = function(u) {
    return a(i((l || (l = o(e, r.map(n), zt)))(u)));
  }, h.domain = function(u) {
    return arguments.length ? (r = Array.from(u, Kp), d()) : r.slice();
  }, h.range = function(u) {
    return arguments.length ? (e = Array.from(u), d()) : e.slice();
  }, h.rangeRound = function(u) {
    return e = Array.from(u), t = ns, d();
  }, h.clamp = function(u) {
    return arguments.length ? (a = u ? !0 : Dt, d()) : a !== Dt;
  }, h.interpolate = function(u) {
    return arguments.length ? (t = u, d()) : t;
  }, h.unknown = function(u) {
    return arguments.length ? (s = u, h) : s;
  }, function(u, f) {
    return n = u, i = f, d();
  };
}
function ng() {
  return eg()(Dt, Dt);
}
function rg(r, e, t, n) {
  var i = bd(r, e, t), s;
  switch (n = kr(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(r), Math.abs(e));
      return n.precision == null && !isNaN(s = xp(i, a)) && (n.precision = s), Fo(n, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(s = yp(i, Math.max(Math.abs(r), Math.abs(e)))) && (n.precision = s - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(s = bp(i)) && (n.precision = s - (n.type === "%") * 2);
      break;
    }
  }
  return Io(n);
}
function ls(r) {
  var e = r.domain;
  return r.ticks = function(t) {
    var n = e();
    return vd(n[0], n[n.length - 1], t ?? 10);
  }, r.tickFormat = function(t, n) {
    var i = e();
    return rg(i[0], i[i.length - 1], t ?? 10, n);
  }, r.nice = function(t) {
    t == null && (t = 10);
    var n = e(), i = 0, s = n.length - 1, a = n[i], o = n[s], c, l, d = 10;
    for (o < a && (l = a, a = o, o = l, l = i, i = s, s = l); d-- > 0; ) {
      if (l = xi(a, o, t), l === c)
        return n[i] = a, n[s] = o, e(n);
      if (l > 0)
        a = Math.floor(a / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        a = Math.ceil(a * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return r;
  }, r;
}
function nt() {
  var r = ng();
  return r.copy = function() {
    return tg(r, nt());
  }, Wp.apply(r, arguments), ls(r);
}
function ig() {
  var r = 0, e = 1, t, n, i, s, a = Dt, o = !1, c;
  function l(h) {
    return h == null || isNaN(h = +h) ? c : a(i === 0 ? 0.5 : (h = (s(h) - t) * i, o ? Math.max(0, Math.min(1, h)) : h));
  }
  l.domain = function(h) {
    return arguments.length ? ([r, e] = h, t = s(r = +r), n = s(e = +e), i = t === n ? 0 : 1 / (n - t), l) : [r, e];
  }, l.clamp = function(h) {
    return arguments.length ? (o = !!h, l) : o;
  }, l.interpolator = function(h) {
    return arguments.length ? (a = h, l) : a;
  };
  function d(h) {
    return function(u) {
      var f, g;
      return arguments.length ? ([f, g] = u, a = h(f, g), l) : [a(0), a(1)];
    };
  }
  return l.range = d(Me), l.rangeRound = d(ns), l.unknown = function(h) {
    return arguments.length ? (c = h, l) : c;
  }, function(h) {
    return s = h, t = h(r), n = h(e), i = t === n ? 0 : 1 / (n - t), l;
  };
}
function No(r, e) {
  return e.domain(r.domain()).interpolator(r.interpolator()).clamp(r.clamp()).unknown(r.unknown());
}
function cs() {
  var r = ls(ig()(Dt));
  return r.copy = function() {
    return No(r, cs());
  }, qo.apply(r, arguments);
}
function sg() {
  var r = 0, e = 0.5, t = 1, n = 1, i, s, a, o, c, l = Dt, d, h = !1, u;
  function f(p) {
    return isNaN(p = +p) ? u : (p = 0.5 + ((p = +d(p)) - s) * (n * p < n * s ? o : c), l(h ? Math.max(0, Math.min(1, p)) : p));
  }
  f.domain = function(p) {
    return arguments.length ? ([r, e, t] = p, i = d(r = +r), s = d(e = +e), a = d(t = +t), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), n = s < i ? -1 : 1, f) : [r, e, t];
  }, f.clamp = function(p) {
    return arguments.length ? (h = !!p, f) : h;
  }, f.interpolator = function(p) {
    return arguments.length ? (l = p, f) : l;
  };
  function g(p) {
    return function(m) {
      var b, x, v;
      return arguments.length ? ([b, x, v] = m, l = Gu(p, [b, x, v]), f) : [l(0), l(0.5), l(1)];
    };
  }
  return f.range = g(Me), f.rangeRound = g(ns), f.unknown = function(p) {
    return arguments.length ? (u = p, f) : u;
  }, function(p) {
    return d = p, i = p(r), s = p(e), a = p(t), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), n = s < i ? -1 : 1, f;
  };
}
function Ro() {
  var r = ls(sg()(Dt));
  return r.copy = function() {
    return No(r, Ro());
  }, qo.apply(r, arguments);
}
function Do(r) {
  for (var e = r.length / 6 | 0, t = new Array(e), n = 0; n < e; ) t[n] = "#" + r.slice(n * 6, ++n * 6);
  return t;
}
const Oo = (r) => Fu(r[r.length - 1]);
var ag = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(Do);
const og = Oo(ag);
var lg = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(Do);
const Bo = Oo(lg);
function O(r) {
  return function() {
    return r;
  };
}
const da = Math.abs, at = Math.atan2, fe = Math.cos, cg = Math.max, ti = Math.min, qt = Math.sin, Fe = Math.sqrt, ut = 1e-12, Sn = Math.PI, Sr = Sn / 2, or = 2 * Sn;
function dg(r) {
  return r > 1 ? 0 : r < -1 ? Sn : Math.acos(r);
}
function ha(r) {
  return r >= 1 ? Sr : r <= -1 ? -Sr : Math.asin(r);
}
function Dr(r) {
  let e = 3;
  return r.digits = function(t) {
    if (!arguments.length) return e;
    if (t == null)
      e = null;
    else {
      const n = Math.floor(t);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
      e = n;
    }
    return r;
  }, () => new dp(e);
}
function hg(r) {
  return r.innerRadius;
}
function ug(r) {
  return r.outerRadius;
}
function fg(r) {
  return r.startAngle;
}
function pg(r) {
  return r.endAngle;
}
function gg(r) {
  return r && r.padAngle;
}
function mg(r, e, t, n, i, s, a, o) {
  var c = t - r, l = n - e, d = a - i, h = o - s, u = h * c - d * l;
  if (!(u * u < ut))
    return u = (d * (e - s) - h * (r - i)) / u, [r + u * c, e + u * l];
}
function Yn(r, e, t, n, i, s, a) {
  var o = r - t, c = e - n, l = (a ? s : -s) / Fe(o * o + c * c), d = l * c, h = -l * o, u = r + d, f = e + h, g = t + d, p = n + h, m = (u + g) / 2, b = (f + p) / 2, x = g - u, v = p - f, _ = x * x + v * v, w = i - s, k = u * p - g * f, $ = (v < 0 ? -1 : 1) * Fe(cg(0, w * w * _ - k * k)), A = (k * v - x * $) / _, S = (-k * x - v * $) / _, y = (k * v + x * $) / _, C = (-k * x + v * $) / _, M = A - m, T = S - b, L = y - m, E = C - b;
  return M * M + T * T > L * L + E * E && (A = y, S = C), {
    cx: A,
    cy: S,
    x01: -d,
    y01: -h,
    x11: A * (i / w - 1),
    y11: S * (i / w - 1)
  };
}
function ua() {
  var r = hg, e = ug, t = O(0), n = null, i = fg, s = pg, a = gg, o = null, c = Dr(l);
  function l() {
    var d, h, u = +r.apply(this, arguments), f = +e.apply(this, arguments), g = i.apply(this, arguments) - Sr, p = s.apply(this, arguments) - Sr, m = da(p - g), b = p > g;
    if (o || (o = d = c()), f < u && (h = f, f = u, u = h), !(f > ut)) o.moveTo(0, 0);
    else if (m > or - ut)
      o.moveTo(f * fe(g), f * qt(g)), o.arc(0, 0, f, g, p, !b), u > ut && (o.moveTo(u * fe(p), u * qt(p)), o.arc(0, 0, u, p, g, b));
    else {
      var x = g, v = p, _ = g, w = p, k = m, $ = m, A = a.apply(this, arguments) / 2, S = A > ut && (n ? +n.apply(this, arguments) : Fe(u * u + f * f)), y = ti(da(f - u) / 2, +t.apply(this, arguments)), C = y, M = y, T, L;
      if (S > ut) {
        var E = ha(S / u * qt(A)), q = ha(S / f * qt(A));
        (k -= E * 2) > ut ? (E *= b ? 1 : -1, _ += E, w -= E) : (k = 0, _ = w = (g + p) / 2), ($ -= q * 2) > ut ? (q *= b ? 1 : -1, x += q, v -= q) : ($ = 0, x = v = (g + p) / 2);
      }
      var I = f * fe(x), P = f * qt(x), F = u * fe(w), N = u * qt(w);
      if (y > ut) {
        var D = f * fe(v), Q = f * qt(v), it = u * fe(_), Y = u * qt(_), X;
        if (m < Sn)
          if (X = mg(I, P, it, Y, D, Q, F, N)) {
            var ue = I - X[0], Vt = P - X[1], jr = D - X[0], Vr = Q - X[1], Ls = 1 / qt(dg((ue * jr + Vt * Vr) / (Fe(ue * ue + Vt * Vt) * Fe(jr * jr + Vr * Vr))) / 2), Ps = Fe(X[0] * X[0] + X[1] * X[1]);
            C = ti(y, (u - Ps) / (Ls - 1)), M = ti(y, (f - Ps) / (Ls + 1));
          } else
            C = M = 0;
      }
      $ > ut ? M > ut ? (T = Yn(it, Y, I, P, f, M, b), L = Yn(D, Q, F, N, f, M, b), o.moveTo(T.cx + T.x01, T.cy + T.y01), M < y ? o.arc(T.cx, T.cy, M, at(T.y01, T.x01), at(L.y01, L.x01), !b) : (o.arc(T.cx, T.cy, M, at(T.y01, T.x01), at(T.y11, T.x11), !b), o.arc(0, 0, f, at(T.cy + T.y11, T.cx + T.x11), at(L.cy + L.y11, L.cx + L.x11), !b), o.arc(L.cx, L.cy, M, at(L.y11, L.x11), at(L.y01, L.x01), !b))) : (o.moveTo(I, P), o.arc(0, 0, f, x, v, !b)) : o.moveTo(I, P), !(u > ut) || !(k > ut) ? o.lineTo(F, N) : C > ut ? (T = Yn(F, N, D, Q, u, -C, b), L = Yn(I, P, it, Y, u, -C, b), o.lineTo(T.cx + T.x01, T.cy + T.y01), C < y ? o.arc(T.cx, T.cy, C, at(T.y01, T.x01), at(L.y01, L.x01), !b) : (o.arc(T.cx, T.cy, C, at(T.y01, T.x01), at(T.y11, T.x11), !b), o.arc(0, 0, u, at(T.cy + T.y11, T.cx + T.x11), at(L.cy + L.y11, L.cx + L.x11), b), o.arc(L.cx, L.cy, C, at(L.y11, L.x11), at(L.y01, L.x01), !b))) : o.arc(0, 0, u, w, _, b);
    }
    if (o.closePath(), d) return o = null, d + "" || null;
  }
  return l.centroid = function() {
    var d = (+r.apply(this, arguments) + +e.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - Sn / 2;
    return [fe(h) * d, qt(h) * d];
  }, l.innerRadius = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : O(+d), l) : r;
  }, l.outerRadius = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : O(+d), l) : e;
  }, l.cornerRadius = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : O(+d), l) : t;
  }, l.padRadius = function(d) {
    return arguments.length ? (n = d == null ? null : typeof d == "function" ? d : O(+d), l) : n;
  }, l.startAngle = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : O(+d), l) : i;
  }, l.endAngle = function(d) {
    return arguments.length ? (s = typeof d == "function" ? d : O(+d), l) : s;
  }, l.padAngle = function(d) {
    return arguments.length ? (a = typeof d == "function" ? d : O(+d), l) : a;
  }, l.context = function(d) {
    return arguments.length ? (o = d ?? null, l) : o;
  }, l;
}
var _g = Array.prototype.slice;
function ds(r) {
  return typeof r == "object" && "length" in r ? r : Array.from(r);
}
function Ho(r) {
  this._context = r;
}
Ho.prototype = {
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
  point: function(r, e) {
    switch (r = +r, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(r, e) : this._context.moveTo(r, e);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(r, e);
        break;
    }
  }
};
function jo(r) {
  return new Ho(r);
}
function hs(r) {
  return r[0];
}
function us(r) {
  return r[1];
}
function ie(r, e) {
  var t = O(!0), n = null, i = jo, s = null, a = Dr(o);
  r = typeof r == "function" ? r : r === void 0 ? hs : O(r), e = typeof e == "function" ? e : e === void 0 ? us : O(e);
  function o(c) {
    var l, d = (c = ds(c)).length, h, u = !1, f;
    for (n == null && (s = i(f = a())), l = 0; l <= d; ++l)
      !(l < d && t(h = c[l], l, c)) === u && ((u = !u) ? s.lineStart() : s.lineEnd()), u && s.point(+r(h, l, c), +e(h, l, c));
    if (f) return s = null, f + "" || null;
  }
  return o.x = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : O(+c), o) : r;
  }, o.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : O(+c), o) : e;
  }, o.defined = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : O(!!c), o) : t;
  }, o.curve = function(c) {
    return arguments.length ? (i = c, n != null && (s = i(n)), o) : i;
  }, o.context = function(c) {
    return arguments.length ? (c == null ? n = s = null : s = i(n = c), o) : n;
  }, o;
}
function vg(r, e, t) {
  var n = null, i = O(!0), s = null, a = jo, o = null, c = Dr(l);
  r = typeof r == "function" ? r : r === void 0 ? hs : O(+r), e = typeof e == "function" ? e : O(e === void 0 ? 0 : +e), t = typeof t == "function" ? t : t === void 0 ? us : O(+t);
  function l(h) {
    var u, f, g, p = (h = ds(h)).length, m, b = !1, x, v = new Array(p), _ = new Array(p);
    for (s == null && (o = a(x = c())), u = 0; u <= p; ++u) {
      if (!(u < p && i(m = h[u], u, h)) === b)
        if (b = !b)
          f = u, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), g = u - 1; g >= f; --g)
            o.point(v[g], _[g]);
          o.lineEnd(), o.areaEnd();
        }
      b && (v[u] = +r(m, u, h), _[u] = +e(m, u, h), o.point(n ? +n(m, u, h) : v[u], t ? +t(m, u, h) : _[u]));
    }
    if (x) return o = null, x + "" || null;
  }
  function d() {
    return ie().defined(i).curve(a).context(s);
  }
  return l.x = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : O(+h), n = null, l) : r;
  }, l.x0 = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : O(+h), l) : r;
  }, l.x1 = function(h) {
    return arguments.length ? (n = h == null ? null : typeof h == "function" ? h : O(+h), l) : n;
  }, l.y = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : O(+h), t = null, l) : e;
  }, l.y0 = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : O(+h), l) : e;
  }, l.y1 = function(h) {
    return arguments.length ? (t = h == null ? null : typeof h == "function" ? h : O(+h), l) : t;
  }, l.lineX0 = l.lineY0 = function() {
    return d().x(r).y(e);
  }, l.lineY1 = function() {
    return d().x(r).y(t);
  }, l.lineX1 = function() {
    return d().x(n).y(e);
  }, l.defined = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : O(!!h), l) : i;
  }, l.curve = function(h) {
    return arguments.length ? (a = h, s != null && (o = a(s)), l) : a;
  }, l.context = function(h) {
    return arguments.length ? (h == null ? s = o = null : o = a(s = h), l) : s;
  }, l;
}
function bg(r, e) {
  return e < r ? -1 : e > r ? 1 : e >= r ? 0 : NaN;
}
function xg(r) {
  return r;
}
function yg() {
  var r = xg, e = bg, t = null, n = O(0), i = O(or), s = O(0);
  function a(o) {
    var c, l = (o = ds(o)).length, d, h, u = 0, f = new Array(l), g = new Array(l), p = +n.apply(this, arguments), m = Math.min(or, Math.max(-or, i.apply(this, arguments) - p)), b, x = Math.min(Math.abs(m) / l, s.apply(this, arguments)), v = x * (m < 0 ? -1 : 1), _;
    for (c = 0; c < l; ++c)
      (_ = g[f[c] = c] = +r(o[c], c, o)) > 0 && (u += _);
    for (e != null ? f.sort(function(w, k) {
      return e(g[w], g[k]);
    }) : t != null && f.sort(function(w, k) {
      return t(o[w], o[k]);
    }), c = 0, h = u ? (m - l * v) / u : 0; c < l; ++c, p = b)
      d = f[c], _ = g[d], b = p + (_ > 0 ? _ * h : 0) + v, g[d] = {
        data: o[d],
        index: c,
        value: _,
        startAngle: p,
        endAngle: b,
        padAngle: x
      };
    return g;
  }
  return a.value = function(o) {
    return arguments.length ? (r = typeof o == "function" ? o : O(+o), a) : r;
  }, a.sortValues = function(o) {
    return arguments.length ? (e = o, t = null, a) : e;
  }, a.sort = function(o) {
    return arguments.length ? (t = o, e = null, a) : t;
  }, a.startAngle = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : O(+o), a) : n;
  }, a.endAngle = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : O(+o), a) : i;
  }, a.padAngle = function(o) {
    return arguments.length ? (s = typeof o == "function" ? o : O(+o), a) : s;
  }, a;
}
class Vo {
  constructor(e, t) {
    this._context = e, this._x = t;
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
  point(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
        break;
      }
    }
    this._x0 = e, this._y0 = t;
  }
}
function wg(r) {
  return new Vo(r, !0);
}
function kg(r) {
  return new Vo(r, !1);
}
function $g(r) {
  return r.source;
}
function Ag(r) {
  return r.target;
}
function Xo(r) {
  let e = $g, t = Ag, n = hs, i = us, s = null, a = null, o = Dr(c);
  function c() {
    let l;
    const d = _g.call(arguments), h = e.apply(this, d), u = t.apply(this, d);
    if (s == null && (a = r(l = o())), a.lineStart(), d[0] = h, a.point(+n.apply(this, d), +i.apply(this, d)), d[0] = u, a.point(+n.apply(this, d), +i.apply(this, d)), a.lineEnd(), l) return a = null, l + "" || null;
  }
  return c.source = function(l) {
    return arguments.length ? (e = l, c) : e;
  }, c.target = function(l) {
    return arguments.length ? (t = l, c) : t;
  }, c.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : O(+l), c) : n;
  }, c.y = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : O(+l), c) : i;
  }, c.context = function(l) {
    return arguments.length ? (l == null ? s = a = null : a = r(s = l), c) : s;
  }, c;
}
function Sg() {
  return Xo(wg);
}
function Cg() {
  return Xo(kg);
}
function fa(r) {
  return r < 0 ? -1 : 1;
}
function pa(r, e, t) {
  var n = r._x1 - r._x0, i = e - r._x1, s = (r._y1 - r._y0) / (n || i < 0 && -0), a = (t - r._y1) / (i || n < 0 && -0), o = (s * i + a * n) / (n + i);
  return (fa(s) + fa(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function ga(r, e) {
  var t = r._x1 - r._x0;
  return t ? (3 * (r._y1 - r._y0) / t - e) / 2 : e;
}
function ei(r, e, t) {
  var n = r._x0, i = r._y0, s = r._x1, a = r._y1, o = (s - n) / 3;
  r._context.bezierCurveTo(n + o, i + o * e, s - o, a - o * t, s, a);
}
function Cr(r) {
  this._context = r;
}
Cr.prototype = {
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
        ei(this, this._t0, ga(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(r, e) {
    var t = NaN;
    if (r = +r, e = +e, !(r === this._x1 && e === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(r, e) : this._context.moveTo(r, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, ei(this, ga(this, t = pa(this, r, e)), t);
          break;
        default:
          ei(this, this._t0, t = pa(this, r, e));
          break;
      }
      this._x0 = this._x1, this._x1 = r, this._y0 = this._y1, this._y1 = e, this._t0 = t;
    }
  }
};
Object.create(Cr.prototype).point = function(r, e) {
  Cr.prototype.point.call(this, e, r);
};
function mn(r) {
  return new Cr(r);
}
function un(r, e, t) {
  this.k = r, this.x = e, this.y = t;
}
un.prototype = {
  constructor: un,
  scale: function(r) {
    return r === 1 ? this : new un(this.k * r, this.x, this.y);
  },
  translate: function(r, e) {
    return r === 0 & e === 0 ? this : new un(this.k, this.x + this.k * r, this.y + this.k * e);
  },
  apply: function(r) {
    return [r[0] * this.k + this.x, r[1] * this.k + this.y];
  },
  applyX: function(r) {
    return r * this.k + this.x;
  },
  applyY: function(r) {
    return r * this.k + this.y;
  },
  invert: function(r) {
    return [(r[0] - this.x) / this.k, (r[1] - this.y) / this.k];
  },
  invertX: function(r) {
    return (r - this.x) / this.k;
  },
  invertY: function(r) {
    return (r - this.y) / this.k;
  },
  rescaleX: function(r) {
    return r.copy().domain(r.range().map(this.invertX, this).map(r.invert, r));
  },
  rescaleY: function(r) {
    return r.copy().domain(r.range().map(this.invertY, this).map(r.invert, r));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
un.prototype;
const Mg = (
  /* css */
  `
  :host {
    display: block;
    margin: var(--lv-sp-4, 16px) 0;
  }

  .container {
    width: 100%;
    background: var(--lv-bg-card);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-r-md, 8px);
    padding: var(--lv-sp-3, 12px);
  }

  svg {
    display: block;
    width: 100%;
    cursor: crosshair;
    user-select: none;
    touch-action: none;
  }

  .grid-line {
    stroke: var(--lv-border);
    stroke-dasharray: 3,3;
    stroke-width: 0.5;
  }

  .axis-text {
    font-family: var(--lv-font);
    font-size: 11px;
    fill: var(--lv-text-dim);
  }

  .axis-label {
    font-family: var(--lv-font);
    font-size: 12px;
    fill: var(--lv-text-dim);
    font-weight: 500;
  }

  .actual-line {
    fill: none;
    stroke: var(--lv-accent, #3b82f6);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .user-line {
    fill: none;
    stroke: var(--lv-warning, #f59e0b);
    stroke-width: 2.5;
    stroke-dasharray: 8,4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .revealed-line {
    fill: none;
    stroke: var(--lv-positive, #22c55e);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .draw-zone {
    fill: color-mix(in srgb, var(--lv-accent, #3b82f6) 5%, transparent);
  }

  .draw-prompt {
    font-family: var(--lv-font);
    font-size: 13px;
    fill: var(--lv-text-dim);
    text-anchor: middle;
    pointer-events: none;
  }

  .cutoff-line {
    stroke: var(--lv-border);
    stroke-width: 1;
    stroke-dasharray: 4,4;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-block-start: var(--lv-sp-3, 12px);
  }

  .btn {
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 24px;
    border-radius: var(--lv-r-md, 8px);
    border: 2px solid var(--lv-accent);
    background: var(--lv-accent);
    color: var(--lv-bg-card);
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .btn:focus-visible {
    outline: 2px solid var(--lv-accent);
    outline-offset: 2px;
  }

  .error-text {
    font-family: var(--lv-font-mono, monospace);
    font-size: 0.9rem;
    color: var(--lv-text);
  }
`
), Gn = 500, Wn = 300, Mt = { top: 20, right: 30, bottom: 40, left: 50 };
class Eg extends R {
  constructor() {
    super(...arguments);
    z(this, "_userPoints", []);
    z(this, "_revealed", !1);
    z(this, "_drawing", !1);
    z(this, "_hasAnimated", !1);
    // d3 scales
    z(this, "_xScale", null);
    z(this, "_yScale", null);
  }
  static get observedAttributes() {
    return ["data", "reveal-at", "x-label", "y-label", "reveal-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Mg), this._build();
  }
  handleAttributeChange() {
    this.isConnected && !this._revealed && (this._userPoints = [], this._build());
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".actual-line");
    if (n) {
      const i = n.getTotalLength();
      n.style.strokeDasharray = String(i), n.style.strokeDashoffset = String(i), n.style.transition = "stroke-dashoffset 0.8s ease-out", requestAnimationFrame(() => {
        n.style.strokeDashoffset = "0";
      });
    }
  }
  _build() {
    const t = this.jsonAttr("data", []), n = parseInt(this.getAttribute("reveal-at") || "0", 10), i = this.getAttribute("x-label") || "", s = this.getAttribute("y-label") || "", a = this.getAttribute("reveal-label") || "Reveal";
    if (!t.length || n <= 0) {
      this.render('<div class="container"><em>No data</em></div>');
      return;
    }
    const o = Gn - Mt.left - Mt.right, c = Wn - Mt.top - Mt.bottom, l = nt().domain([0, t.length - 1]).range([0, o]), d = Math.min(...t), h = Math.max(...t), u = (h - d) * 0.1 || 1, f = nt().domain([d - u, h + u]).range([c, 0]);
    this._xScale = l, this._yScale = f;
    const g = t.slice(0, n), p = ie().x((y, C) => l(C)).y((y) => f(y)).curve(mn)(g) || "", m = l.ticks(8), b = f.ticks(6);
    let x = "";
    m.forEach((y) => {
      x += `<line class="grid-line" x1="${l(y)}" y1="0" x2="${l(y)}" y2="${c}" />`;
    }), b.forEach((y) => {
      x += `<line class="grid-line" x1="0" y1="${f(y)}" x2="${o}" y2="${f(y)}" />`;
    });
    let v = "";
    m.forEach((y) => {
      v += `<text class="axis-text" x="${l(y)}" y="${c + 20}" text-anchor="middle">${Math.round(y)}</text>`;
    });
    let _ = "";
    b.forEach((y) => {
      _ += `<text class="axis-text" x="-10" y="${f(y) + 4}" text-anchor="end">${y.toFixed(1)}</text>`;
    });
    const w = l(n - 1), k = o - w, $ = l(n - 1), A = w + k / 2, S = c / 2;
    this.render(`
      <div class="container">
        <svg viewBox="0 0 ${Gn} ${Wn}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Draw your prediction chart">
          <g transform="translate(${Mt.left},${Mt.top})">
            ${x}
            <rect class="draw-zone" x="${w}" y="0" width="${k}" height="${c}" rx="4" />
            <line class="cutoff-line" x1="${$}" y1="0" x2="${$}" y2="${c}" />
            <path class="actual-line" d="${p}" />
            <g class="user-path-group"></g>
            <g class="revealed-path-group"></g>
            <text class="draw-prompt" x="${A}" y="${S}">Draw your prediction here</text>
            ${v}
            ${_}
            ${i ? `<text class="axis-label" x="${o / 2}" y="${c + 36}" text-anchor="middle">${this._esc(i)}</text>` : ""}
            ${s ? `<text class="axis-label" x="-36" y="${c / 2}" text-anchor="middle" transform="rotate(-90,-36,${c / 2})">${this._esc(s)}</text>` : ""}
            <rect class="draw-area" x="${w}" y="0" width="${k}" height="${c}" fill="transparent" />
          </g>
        </svg>
        <div class="controls">
          <button class="btn reveal-btn">${this._esc(a)}</button>
          <span class="error-text"></span>
        </div>
      </div>
    `), this._attachDrawListeners(), this._attachRevealListener();
  }
  _attachDrawListeners() {
    const t = this.root.querySelector(".draw-area");
    if (!t) return;
    const n = this.root.querySelector("svg");
    if (!n) return;
    const i = (c) => {
      const l = n.getBoundingClientRect(), d = Gn / l.width, h = Wn / l.height, u = (c.clientX - l.left) * d - Mt.left, f = (c.clientY - l.top) * h - Mt.top;
      return { svgX: u, svgY: f };
    }, s = (c) => {
      if (this._revealed) return;
      c.preventDefault(), this._drawing = !0, t.setPointerCapture(c.pointerId);
      const l = this.root.querySelector(".draw-prompt");
      l && l.remove();
      const { svgX: d, svgY: h } = i(c);
      this._addPoint(d, h);
    }, a = (c) => {
      if (!this._drawing || this._revealed) return;
      c.preventDefault();
      const { svgX: l, svgY: d } = i(c);
      this._addPoint(l, d);
    }, o = () => {
      this._drawing = !1;
    };
    t.addEventListener("pointerdown", s), t.addEventListener("pointermove", a), t.addEventListener("pointerup", o), t.addEventListener("pointerleave", o);
  }
  _addPoint(t, n) {
    if (!this._xScale || !this._yScale) return;
    this.jsonAttr("data", []);
    const i = parseInt(this.getAttribute("reveal-at") || "0", 10), s = Gn - Mt.left - Mt.right, a = Wn - Mt.top - Mt.bottom, o = this._xScale(i - 1), l = Math.max(o, Math.min(s, t)), d = Math.max(0, Math.min(a, n));
    if (this._userPoints.length > 0) {
      const h = this._userPoints[this._userPoints.length - 1].x;
      if (l <= h) return;
    }
    this._userPoints.push({ x: l, y: d }), this._renderUserLine();
  }
  _renderUserLine() {
    const t = this.root.querySelector(".user-path-group");
    if (!t || this._userPoints.length < 2) return;
    const n = ie().x((i) => i.x).y((i) => i.y).curve(mn)(this._userPoints) || "";
    t.innerHTML = `<path class="user-line" d="${n}" />`;
  }
  _attachRevealListener() {
    const t = this.root.querySelector(".reveal-btn");
    t && t.addEventListener("click", () => {
      this._revealed || (this._revealed = !0, t.disabled = !0, this._reveal());
    });
  }
  _reveal() {
    const t = this.jsonAttr("data", []), n = parseInt(this.getAttribute("reveal-at") || "0", 10);
    if (!this._xScale || !this._yScale) return;
    const i = t.slice(n - 1), s = this._xScale, a = this._yScale, o = ie().x((f, g) => s(n - 1 + g)).y((f) => a(f)).curve(mn)(i) || "", c = this.root.querySelector(".revealed-path-group");
    if (!c) return;
    c.innerHTML = `<path class="revealed-line" d="${o}" />`;
    const l = c.querySelector(".revealed-line");
    if (l) {
      const f = l.getTotalLength();
      l.style.strokeDasharray = String(f), l.style.strokeDashoffset = String(f), l.style.transition = "stroke-dashoffset 1s ease-out", requestAnimationFrame(() => {
        l.style.strokeDashoffset = "0";
      });
    }
    const d = this._calculateError(t, n), h = this.root.querySelector(".error-text");
    h && d !== null && (h.textContent = `Your average error: ${d.toFixed(2)}`);
    const u = this._getUserValues(t, n);
    this.dispatchEvent(
      new CustomEvent("lv-draw-reveal", {
        detail: {
          error: d ?? 0,
          userLine: u,
          actual: t.slice(n)
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _calculateError(t, n) {
    if (!this._xScale || !this._yScale || this._userPoints.length < 2) return null;
    const i = this._xScale, s = this._yScale, a = t.slice(n);
    let o = 0, c = 0;
    for (let l = 0; l < a.length; l++) {
      const d = i(n + l), h = this._interpolateUserY(d);
      if (h !== null) {
        const u = s.invert(h);
        o += Math.abs(u - a[l]), c++;
      }
    }
    return c > 0 ? o / c : null;
  }
  _interpolateUserY(t) {
    if (this._userPoints.length === 0) return null;
    if (t <= this._userPoints[0].x) return this._userPoints[0].y;
    if (t >= this._userPoints[this._userPoints.length - 1].x)
      return this._userPoints[this._userPoints.length - 1].y;
    for (let n = 0; n < this._userPoints.length - 1; n++) {
      const i = this._userPoints[n], s = this._userPoints[n + 1];
      if (t >= i.x && t <= s.x) {
        const a = (t - i.x) / (s.x - i.x);
        return i.y + a * (s.y - i.y);
      }
    }
    return null;
  }
  _getUserValues(t, n) {
    if (!this._xScale || !this._yScale) return [];
    const i = this._xScale, s = this._yScale, a = [];
    for (let o = n; o < t.length; o++) {
      const c = i(o), l = this._interpolateUserY(c);
      a.push(l !== null ? s.invert(l) : 0);
    }
    return a;
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-you-draw", Eg);
const Tg = `
  :host {
    display: inline;
    vertical-align: baseline;
  }
  .blank-wrapper {
    display: inline;
    position: relative;
  }
  .blank-input {
    display: inline-block;
    min-width: 60px;
    width: auto;
    border: none;
    border-bottom: 2px solid var(--lv-border);
    background: transparent;
    font-family: var(--lv-font-mono);
    font-size: 0.9em;
    color: var(--lv-text);
    text-align: center;
    padding: 2px 8px;
    outline: none;
    transition: border-color 0.2s ease;
    box-sizing: content-box;
  }
  .blank-input:focus {
    border-bottom-color: var(--lv-accent);
  }
  .blank-input.correct {
    border-bottom-color: var(--lv-positive);
  }
  .blank-input.wrong {
    border-bottom-color: var(--lv-negative);
  }
  .result-icon {
    display: none;
    margin-inline-start: 2px;
    font-size: 0.8em;
  }
  .result-icon.show { display: inline; }
  .result-icon.correct { color: var(--lv-positive); }
  .result-icon.wrong { color: var(--lv-negative); }
  .correct-answer {
    display: none;
    font-family: var(--lv-font-mono);
    font-size: 0.75em;
    color: var(--lv-positive);
  }
  .correct-answer.show { display: inline; margin-inline-start: 4px; }
`;
class Lg extends R {
  static get observedAttributes() {
    return ["answer", "accept"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Tg), this._build();
  }
  handleAttributeChange() {
  }
  _build() {
    this.render(`
      <span class="blank-wrapper">
        <input class="blank-input" type="text" autocomplete="off" spellcheck="false" aria-label="Fill in the blank"/>
        <span class="result-icon"></span>
        <span class="correct-answer"></span>
      </span>
    `);
    const e = this.root.querySelector(".blank-input");
    e && e.addEventListener("input", () => {
      const t = Math.max(e.value.length, 4);
      e.style.width = t + 1 + "ch";
    });
  }
  getValue() {
    const e = this.root.querySelector(".blank-input");
    return e ? e.value.trim() : "";
  }
  getAnswer() {
    return this.getAttribute("answer") || "";
  }
  getAcceptAlternatives() {
    const e = this.getAttribute("accept") || "";
    return e ? e.split("|").map((t) => t.trim()) : [];
  }
  check() {
    const e = this.getValue().toLowerCase(), t = this.getAnswer().toLowerCase(), n = this.getAcceptAlternatives().map((l) => l.toLowerCase()), s = [t, ...n].some((l) => l === e), a = this.root.querySelector(".blank-input"), o = this.root.querySelector(".result-icon"), c = this.root.querySelector(".correct-answer");
    return a && (a.classList.add(s ? "correct" : "wrong"), a.readOnly = !0), o && (o.classList.add("show", s ? "correct" : "wrong"), o.textContent = s ? "✓" : "✗"), c && !s && (c.classList.add("show"), c.textContent = this.getAnswer()), s;
  }
  reset() {
    const e = this.root.querySelector(".blank-input"), t = this.root.querySelector(".result-icon"), n = this.root.querySelector(".correct-answer");
    e && (e.value = "", e.readOnly = !1, e.classList.remove("correct", "wrong"), e.style.width = ""), t && (t.classList.remove("show", "correct", "wrong"), t.textContent = ""), n && (n.classList.remove("show"), n.textContent = "");
  }
}
customElements.define("lv-blank", Lg);
const Pg = `
  :host {
    display: block;
    margin: var(--lv-sp-4) 0;
    font-family: var(--lv-font);
    color: var(--lv-text);
    line-height: 2;
  }
  .content {
    font-size: 1rem;
    line-height: 2.2;
  }
  .btn-row {
    margin-top: var(--lv-sp-3);
    display: flex;
    gap: 8px;
  }
  .check-btn {
    background: var(--lv-accent);
    color: #fff;
    border: none;
    border-radius: var(--lv-r-sm);
    padding: 8px 20px;
    font-family: var(--lv-font);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .check-btn:hover { opacity: 0.85; }
  .check-btn:disabled { opacity: 0.5; cursor: default; }
  .score-text {
    display: none;
    align-items: center;
    font-family: var(--lv-font-mono);
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 0;
  }
  .score-text.show { display: flex; }
  .score-text.perfect { color: var(--lv-positive); }
  .score-text.partial { color: var(--lv-warning); }
  .score-text.fail { color: var(--lv-negative); }
`;
class zg extends R {
  constructor() {
    super(...arguments);
    z(this, "_checked", !1);
  }
  static get observedAttributes() {
    return ["submit-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Pg), this._build();
  }
  handleAttributeChange() {
    this.isConnected && !this._checked && this._build();
  }
  _build() {
    const t = this.getAttribute("submit-label") || "Check";
    this.render(`
      <div class="content"><slot></slot></div>
      <div class="btn-row">
        <button class="check-btn">${this._esc(t)}</button>
        <span class="score-text"></span>
      </div>
    `);
    const n = this.root.querySelector(".check-btn");
    n && n.addEventListener("click", () => this._check());
  }
  _check() {
    if (this._checked) return;
    this._checked = !0;
    const t = this.querySelectorAll("lv-blank"), n = [];
    let i = 0;
    t.forEach((l) => {
      const d = l.check();
      d && i++, n.push({
        value: l.getValue(),
        answer: l.getAnswer(),
        correct: d
      });
    });
    const s = t.length, a = `${i}/${s}`, o = this.root.querySelector(".score-text");
    o && (o.classList.add("show"), o.textContent = a, i === s ? o.classList.add("perfect") : i > 0 ? o.classList.add("partial") : o.classList.add("fail"));
    const c = this.root.querySelector(".check-btn");
    c && (c.disabled = !0), this.dispatchEvent(new CustomEvent("lv-fill-check", {
      bubbles: !0,
      composed: !0,
      detail: { correct: i === s, score: a, results: n }
    }));
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-fill-blank", zg);
const Ig = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .fc-container { max-width: 460px; margin: 0 auto; }

  .card-wrapper {
    perspective: 1000px;
    width: 100%; height: 250px;
    cursor: pointer; margin-bottom: var(--lv-sp-3);
  }
  .card {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
  }
  .card.flipped { transform: rotateY(180deg); }
  .card-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: var(--lv-sp-4);
    border-radius: var(--lv-r-md);
    border: 1.5px solid var(--lv-border);
    font-size: 18px; text-align: center;
    line-height: 1.5;
    overflow: auto;
  }
  .card-front {
    background: var(--lv-bg-card);
    color: var(--lv-text);
  }
  .card-back {
    background: var(--lv-bg-raised);
    color: var(--lv-text);
    transform: rotateY(180deg);
  }

  .progress { margin-bottom: var(--lv-sp-3); }
  .progress-text { font-size: 13px; color: var(--lv-text-dim); margin-bottom: 4px; text-align: center; }
  .progress-bar { width: 100%; height: 6px; background: var(--lv-bg-raised); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--lv-accent); border-radius: 3px; transition: width 0.3s ease; }

  .ratings { display: flex; gap: 8px; justify-content: center; }
  .ratings button {
    flex: 1; padding: 10px 0; border-radius: var(--lv-r-sm); border: 1.5px solid var(--lv-border);
    font-family: var(--lv-font); font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .ratings button:hover { filter: brightness(1.1); }
  .btn-hard { background: rgba(239,68,68,0.15); color: #ef4444; border-color: #ef4444; }
  .btn-ok { background: rgba(234,179,8,0.15); color: #eab308; border-color: #eab308; }
  .btn-easy { background: rgba(34,197,94,0.15); color: #22c55e; border-color: #22c55e; }

  .hint { font-size: 12px; color: var(--lv-text-dim); text-align: center; margin-top: var(--lv-sp-2); }

  .done {
    text-align: center; padding: var(--lv-sp-5);
    background: var(--lv-bg-card); border-radius: var(--lv-r-md);
    border: 1.5px solid var(--lv-border);
  }
  .done h3 { margin: 0 0 var(--lv-sp-3); color: var(--lv-text); font-size: 20px; }
  .done .stats { font-size: 14px; color: var(--lv-text-dim); line-height: 1.8; }
  .done button {
    margin-top: var(--lv-sp-3); padding: 8px 24px; border-radius: var(--lv-r-sm);
    border: 1px solid var(--lv-border); background: var(--lv-accent); color: #fff;
    font-family: var(--lv-font); font-size: 14px; cursor: pointer;
  }
`;
class Fg extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_cards", []);
    z(this, "_deck", []);
    z(this, "_current", 0);
    z(this, "_flipped", !1);
    z(this, "_ratings", []);
    z(this, "_done", !1);
    z(this, "_storageKey", "lv-flashcard");
    z(this, "_keyHandler", (t) => {
      t.code === "Space" && (t.preventDefault(), this._flip());
    });
  }
  static get observedAttributes() {
    return ["cards", "shuffle", "persist"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ig), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".fc-container");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.4s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _build() {
    if (this._cards = this.jsonAttr("cards", []), this._ratings = [], this._done = !1, this._flipped = !1, this._current = 0, !this._cards.length) {
      this.render('<div class="fc-container"><p style="color:var(--lv-text-dim);text-align:center;">No cards provided.</p></div>');
      return;
    }
    if (this._deck = this._cards.map((t, n) => n), this.hasAttribute("shuffle"))
      for (let t = this._deck.length - 1; t > 0; t--) {
        const n = Math.floor(Math.random() * (t + 1));
        [this._deck[t], this._deck[n]] = [this._deck[n], this._deck[t]];
      }
    if (this.hasAttribute("persist"))
      try {
        const t = localStorage.getItem(this._storageKey);
        t && (this._ratings = JSON.parse(t));
      } catch {
      }
    this._renderView(), this._attachKeyListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._keyHandler);
  }
  _attachKeyListener() {
    document.removeEventListener("keydown", this._keyHandler), document.addEventListener("keydown", this._keyHandler);
  }
  _flip() {
    if (this._done) return;
    this._flipped = !this._flipped;
    const t = this.root.querySelector(".card");
    t && t.classList.toggle("flipped", this._flipped);
  }
  _rate(t) {
    const n = this._deck[this._current];
    if (this._ratings.push({ index: n, rating: t }), this.dispatchEvent(new CustomEvent("lv-flashcard-rate", {
      detail: { index: n, rating: t, front: this._cards[n].front },
      bubbles: !0,
      composed: !0
    })), t === "hard") {
      const i = Math.min(this._current + 4, this._deck.length);
      this._deck.splice(i, 0, n);
    }
    if (this.hasAttribute("persist"))
      try {
        localStorage.setItem(this._storageKey, JSON.stringify(this._ratings));
      } catch {
      }
    this._current++, this._flipped = !1, this._current >= this._deck.length && (this._done = !0), this._renderView();
  }
  _reset() {
    if (this._ratings = [], this.hasAttribute("persist"))
      try {
        localStorage.removeItem(this._storageKey);
      } catch {
      }
    this._build();
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  _renderView() {
    var a, o, c, l, d;
    if (this._done) {
      const h = this._ratings.filter((g) => g.rating === "easy").length, u = this._ratings.filter((g) => g.rating === "ok").length, f = this._ratings.filter((g) => g.rating === "hard").length;
      this.render(`<div class="fc-container" role="region" aria-label="Flashcard">
        <div class="done">
          <h3>Session Complete</h3>
          <div class="stats">
            <span style="color:#22c55e;">${h} Easy</span> &middot;
            <span style="color:#eab308;">${u} OK</span> &middot;
            <span style="color:#ef4444;">${f} Hard</span>
          </div>
          <button id="btn-reset">Restart</button>
        </div>
      </div>`), (a = this.root.getElementById("btn-reset")) == null || a.addEventListener("click", () => this._reset());
      return;
    }
    const t = this._deck[this._current], n = this._cards[t], i = this._deck.length, s = Math.round(this._current / i * 100);
    this.render(`<div class="fc-container" role="region" aria-label="Flashcard">
      <div class="progress">
        <div class="progress-text">Card ${this._current + 1} of ${i}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${s}%"></div></div>
      </div>
      <div class="card-wrapper" id="card-wrapper">
        <div class="card${this._flipped ? " flipped" : ""}">
          <div class="card-face card-front" aria-live="polite">${this._esc(n.front)}</div>
          <div class="card-face card-back" aria-live="polite">${this._esc(n.back)}</div>
        </div>
      </div>
      <div class="ratings">
        <button class="btn-hard" id="btn-hard">Hard</button>
        <button class="btn-ok" id="btn-ok">OK</button>
        <button class="btn-easy" id="btn-easy">Easy</button>
      </div>
      <div class="hint">Click card or press Space to flip</div>
    </div>`), (o = this.root.getElementById("card-wrapper")) == null || o.addEventListener("click", () => this._flip()), (c = this.root.getElementById("btn-hard")) == null || c.addEventListener("click", () => this._rate("hard")), (l = this.root.getElementById("btn-ok")) == null || l.addEventListener("click", () => this._rate("ok")), (d = this.root.getElementById("btn-easy")) == null || d.addEventListener("click", () => this._rate("easy"));
  }
}
customElements.define("lv-flashcard", Fg);
const qg = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .pt-container { max-width: 500px; }

  .header { margin-bottom: var(--lv-sp-3); }
  .pct-text { font-size: 14px; font-weight: 600; color: var(--lv-text); margin-bottom: 6px; }
  .progress-bar { width: 100%; height: 8px; background: var(--lv-bg-raised); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--lv-accent); border-radius: 4px; transition: width 0.4s ease; }

  .checklist { list-style: none; margin: 0; padding: 0; }
  .checklist li {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 0; border-bottom: 1px solid var(--lv-border);
    font-size: 14px; color: var(--lv-text);
    cursor: pointer; transition: opacity 0.2s;
  }
  .checklist li:last-child { border-bottom: none; }
  .checklist li:hover { opacity: 0.85; }
  .checklist li.done .label { text-decoration: line-through; color: var(--lv-text-dim); }

  .check-icon {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--lv-border);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    font-size: 12px;
  }
  .checklist li.done .check-icon {
    background: var(--lv-positive, #22c55e);
    border-color: var(--lv-positive, #22c55e);
    color: #fff;
  }
  .label { flex: 1; }
`;
class Ng extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_sections", []);
    z(this, "_completed", /* @__PURE__ */ new Set());
    z(this, "_storageKey", "lv-progress");
    z(this, "_boundHandler", null);
  }
  static get observedAttributes() {
    return ["sections", "persist", "key"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(qg), this._build(), this._boundHandler = this._handleExternalComplete.bind(this), document.addEventListener("lv-section-complete", this._boundHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundHandler && document.removeEventListener("lv-section-complete", this._boundHandler);
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".pt-container");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.4s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  /** Public API: mark a section as complete */
  complete(t) {
    this._markComplete(t);
  }
  _build() {
    if (this._sections = this.jsonAttr("sections", []), this._storageKey = this.getAttribute("key") || "lv-progress", this._completed = /* @__PURE__ */ new Set(), this.hasAttribute("persist"))
      try {
        const t = localStorage.getItem(this._storageKey);
        t && JSON.parse(t).forEach((i) => this._completed.add(i));
      } catch {
      }
    this._renderView();
  }
  _handleExternalComplete(t) {
    var i;
    const n = t;
    (i = n.detail) != null && i.id && this._markComplete(n.detail.id);
  }
  _markComplete(t) {
    if (!this._completed.has(t)) {
      if (this._completed.add(t), this.hasAttribute("persist"))
        try {
          localStorage.setItem(this._storageKey, JSON.stringify([...this._completed]));
        } catch {
        }
      this._dispatchUpdate(), this._renderView();
    }
  }
  _toggle(t) {
    if (this._completed.has(t) ? this._completed.delete(t) : this._completed.add(t), this.hasAttribute("persist"))
      try {
        localStorage.setItem(this._storageKey, JSON.stringify([...this._completed]));
      } catch {
      }
    this._dispatchUpdate(), this._renderView();
  }
  _dispatchUpdate() {
    const t = this._sections.length, n = [...this._completed], i = t > 0 ? Math.round(n.length / t * 100) : 0;
    this.dispatchEvent(new CustomEvent("lv-progress-update", {
      detail: { completed: n, total: t, percent: i },
      bubbles: !0,
      composed: !0
    }));
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  _renderView() {
    const t = this._sections.length, n = this._sections.filter((a) => this._completed.has(a.id)).length, i = t > 0 ? Math.round(n / t * 100) : 0, s = this._sections.map((a) => {
      const o = this._completed.has(a.id);
      return `<li class="${o ? "done" : ""}" data-id="${this._esc(a.id)}">
        <span class="check-icon">${o ? "✓" : ""}</span>
        <span class="label">${this._esc(a.label)}</span>
      </li>`;
    }).join("");
    this.render(`<div class="pt-container">
      <div class="header">
        <div class="pct-text">${i}% Complete (${n}/${t})</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${i}%"></div></div>
      </div>
      <ul class="checklist">${s}</ul>
    </div>`), this.root.querySelectorAll(".checklist li").forEach((a) => {
      a.addEventListener("click", () => {
        const o = a.dataset.id;
        o && this._toggle(o);
      });
    });
  }
}
customElements.define("lv-progress-tracker", Ng);
const Rg = `
  :host { display: block; margin: var(--lv-sp-4) 0; font-family: var(--lv-font); }
  .sb-container {
    border: 1.5px solid var(--lv-border); border-radius: var(--lv-r-md);
    overflow: hidden; display: flex; flex-direction: column;
  }

  .editor-wrap {
    position: relative; background: var(--lv-bg);
  }
  textarea {
    display: block; width: 100%; min-height: 150px; padding: 12px 12px 12px 44px;
    background: transparent; color: var(--lv-text); border: none; outline: none;
    font-family: var(--lv-font-mono); font-size: 13px; line-height: 1.6;
    resize: vertical; tab-size: 2; white-space: pre; overflow-wrap: normal;
    overflow-x: auto; box-sizing: border-box;
  }
  textarea:read-only { opacity: 0.7; cursor: default; }

  .line-numbers {
    position: absolute; top: 0; left: 0; width: 36px; height: 100%;
    padding: 12px 0; box-sizing: border-box; overflow: hidden;
    background: var(--lv-bg-raised); border-right: 1px solid var(--lv-border);
    font-family: var(--lv-font-mono); font-size: 13px; line-height: 1.6;
    color: var(--lv-text-dim); text-align: right; pointer-events: none;
    user-select: none;
  }
  .line-numbers span {
    display: block; padding-right: 6px;
  }

  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 10px; background: var(--lv-bg-raised);
    border-top: 1px solid var(--lv-border); border-bottom: 1px solid var(--lv-border);
  }
  .toolbar .lang { font-size: 11px; color: var(--lv-text-dim); text-transform: uppercase; letter-spacing: 0.05em; }
  .toolbar button {
    padding: 5px 16px; border-radius: var(--lv-r-sm); border: 1px solid var(--lv-border);
    background: var(--lv-accent); color: #fff; font-family: var(--lv-font);
    font-size: 13px; font-weight: 600; cursor: pointer; transition: filter 0.15s;
  }
  .toolbar button:hover { filter: brightness(1.15); }

  .output {
    background: var(--lv-bg-raised); min-height: 60px; max-height: 250px;
    overflow: auto; padding: 10px 12px;
    font-family: var(--lv-font-mono); font-size: 12px; line-height: 1.6;
    white-space: pre-wrap; word-break: break-word;
  }
  .output .log { color: var(--lv-text); }
  .output .warn { color: var(--lv-warning, #eab308); }
  .output .error { color: var(--lv-negative, #ef4444); }
  .output .placeholder { color: var(--lv-text-dim); font-style: italic; }
`;
class Dg extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["code", "language", "run-label", "editable", "auto-run"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Rg), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".sb-container");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.4s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _build() {
    var d;
    const t = this.getAttribute("code") || "", n = this.getAttribute("language") || "javascript", i = this.getAttribute("run-label") || "Run", s = !this.hasAttribute("editable") || this.getAttribute("editable") !== "false";
    this.render(`<div class="sb-container">
      <div class="editor-wrap">
        <div class="line-numbers" id="line-nums"></div>
        <textarea id="editor" spellcheck="false" role="textbox" aria-label="Code editor" ${s ? "" : "readonly"}>${this._esc(t)}</textarea>
      </div>
      <div class="toolbar">
        <span class="lang">${this._esc(n)}</span>
        <button id="btn-run">${this._esc(i)}</button>
      </div>
      <div class="output" id="output" role="log" aria-live="polite" aria-label="Code output"><span class="placeholder">Output will appear here...</span></div>
    </div>`);
    const a = this.root.getElementById("editor"), o = this.root.getElementById("output"), c = this.root.getElementById("line-nums"), l = () => {
      const h = (a.value || "").split(`
`).length;
      c.innerHTML = Array.from({ length: h }, (u, f) => `<span>${f + 1}</span>`).join("");
    };
    l(), a.addEventListener("input", l), a.addEventListener("scroll", () => {
      c.style.transform = `translateY(-${a.scrollTop}px)`;
    }), a.addEventListener("keydown", (h) => {
      if (h.key === "Tab") {
        h.preventDefault();
        const u = a.selectionStart, f = a.selectionEnd;
        a.value = a.value.substring(0, u) + "  " + a.value.substring(f), a.selectionStart = a.selectionEnd = u + 2, l();
      }
      h.key === "Enter" && (h.ctrlKey || h.metaKey) && (h.preventDefault(), this._run(a, o));
    }), (d = this.root.getElementById("btn-run")) == null || d.addEventListener("click", () => {
      this._run(a, o);
    }), this.hasAttribute("auto-run") && requestAnimationFrame(() => this._run(a, o));
  }
  _run(t, n) {
    const i = t.value;
    n.innerHTML = "";
    const s = [], a = console.log, o = console.warn, c = console.error, l = (h) => (...u) => {
      const f = u.map((g) => {
        if (typeof g == "object")
          try {
            return JSON.stringify(g, null, 2);
          } catch {
            return String(g);
          }
        return String(g);
      }).join(" ");
      s.push({ text: f, type: h });
    };
    console.log = l("log"), console.warn = l("warn"), console.error = l("error");
    let d;
    try {
      new Function(i)();
    } catch (h) {
      d = (h == null ? void 0 : h.message) || String(h), s.push({ text: `Error: ${d}`, type: "error" });
    }
    console.log = a, console.warn = o, console.error = c, s.length === 0 ? n.innerHTML = '<span class="placeholder">(no output)</span>' : n.innerHTML = s.map(
      (h) => `<div class="${h.type}">${this._esc(h.text)}</div>`
    ).join(""), this.dispatchEvent(new CustomEvent("lv-sandbox-run", {
      detail: {
        code: i,
        output: s.map((h) => h.text),
        error: d
      },
      bubbles: !0,
      composed: !0
    }));
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-sandbox", Dg);
const Og = [
  "#00d4ff",
  "#7b68ee",
  "#00c853",
  "#ff9800",
  "#ff2d75",
  "#ffd93d",
  "#69f0ae",
  "#ff6b9d"
], Bg = (
  /* css */
  `
  :host { display: block; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

  .bar-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .bar-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .bar-label {
    font-size: 0.9em;
    color: var(--lv-text, #e4e4ec);
    font-weight: 500;
  }

  .bar-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .bar-value {
    font-family: var(--lv-font-mono, monospace);
    font-size: 0.9em;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .bar-tag {
    font-size: 0.75em;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .bar-track {
    width: 100%;
    height: 28px;
    background: var(--lv-bg-raised, #12122a);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 4px;
  }

  .bar-item:hover .bar-fill {
    filter: brightness(1.15);
  }

  .bar-item:hover .bar-track {
    box-shadow: 0 0 0 1px var(--lv-border-focus, #3a3a6a);
  }

  /* Entrance animation */
  .bar-fill.animate {
    width: 0 !important;
  }
`
);
class Hg extends R {
  constructor() {
    super(...arguments);
    z(this, "_data", []);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "direction", "sorted"];
  }
  get data() {
    return this._data;
  }
  set data(t) {
    if (typeof t == "string")
      try {
        this._data = JSON.parse(t);
      } catch {
        this._data = [];
      }
    else
      this._data = t;
    this._buildChart();
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Bg), this._data = this.jsonAttr("data", []), this._buildChart();
  }
  handleAttributeChange(t) {
    t === "data" && (this._data = this.jsonAttr("data", [])), this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    this.root.querySelectorAll(".bar-fill").forEach((i, s) => {
      const a = i, o = a.dataset.width || "0%";
      a.classList.add("animate"), setTimeout(() => {
        a.classList.remove("animate"), a.style.width = o;
      }, s * 80 + 50);
    });
  }
  _getColor(t, n) {
    return n.color ? n.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${t % 8}`).trim() || Og[t % 8];
  }
  _buildChart() {
    const t = this.hasAttribute("sorted") ? [...this._data].sort((o, c) => c.value - o.value) : [...this._data];
    if (!t.length) {
      this.render('<div class="bar-list"></div>');
      return;
    }
    const n = Math.max(...t.map((o) => o.value), 1e-3), i = t.map((o, c) => {
      const l = o.value / n * 100, d = this._getColor(c, o), h = o.tagColor || d, u = typeof o.value == "number" ? o.value % 1 ? o.value.toFixed(2) : o.value.toString() : o.value;
      return `
        <div class="bar-item">
          <div class="bar-header">
            <span class="bar-label">${this._esc(o.label)}</span>
            <span class="bar-meta">
              <span class="bar-value" style="color:${d}">${u}</span>
              ${o.tag ? `<span class="bar-tag" style="background:${h}22;color:${h}">${this._esc(o.tag)}</span>` : ""}
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${this._hasAnimated ? l : 0}%;background:${d}" data-width="${l}%"></div>
          </div>
        </div>
      `;
    }).join(""), a = `<table class="sr-table"><caption>Bar chart data</caption><thead><tr><th>Label</th><th>Value</th></tr></thead><tbody>${t.map((o) => `<tr><td>${this._esc(o.label)}</td><td>${typeof o.value == "number" ? o.value % 1 ? o.value.toFixed(2) : o.value.toString() : o.value}</td></tr>`).join("")}</tbody></table>`;
    this.render(`<div class="bar-list" role="img" aria-label="Bar chart">${i}</div>${a}`), this._hasAnimated && this.root.querySelectorAll(".bar-fill").forEach((o) => {
      const c = o;
      c.style.width = c.dataset.width || "0%";
    });
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-bar-chart", Hg);
const jg = (
  /* css */
  `
  :host { display: block; }
  svg { width: 100%; max-width: 700px; margin: 0 auto; display: block; direction: ltr; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
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
class Vg extends R {
  constructor() {
    super(...arguments);
    z(this, "_svg", null);
    z(this, "_animated", !0);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["labels", "values", "scale", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(jg), this._animated = this.getAttribute("animated") !== "false", this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated) return;
    this._hasAnimated = !0;
    const n = this._svg;
    if (!n) return;
    const i = n.querySelectorAll(".cell");
    if (t || !this._animated) {
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
    var v;
    const t = this.jsonAttr("labels", []), n = this.jsonAttr("values", []), i = this.getAttribute("scale") || "diverging";
    if (!t.length || !n.length) {
      this.render("<svg></svg>");
      return;
    }
    const s = t.length, a = 3, o = 60, c = 110, l = 56, d = s * l + (s - 1) * a, h = d + c, u = d + o, f = i === "sequential" ? cs(Bo).domain([0, 1]) : Ro(og).domain([-1, 0, 1]), g = this.isRtl;
    let p = "";
    for (let _ = 0; _ < s; _++) {
      const w = c + _ * (l + a) + l / 2, k = o / 2;
      p += `<text class="header-text" x="${g ? h - w : w}" y="${k}">${this._escapeHtml(t[_])}</text>`;
    }
    for (let _ = 0; _ < s; _++) {
      const w = o + _ * (l + a) + l / 2, k = g ? h - c / 2 : c / 2;
      p += `<text class="header-text" x="${k}" y="${w}">${this._escapeHtml(t[_])}</text>`;
    }
    for (let _ = 0; _ < s; _++)
      for (let w = 0; w < s; w++) {
        const k = ((v = n[_]) == null ? void 0 : v[w]) ?? 0, $ = f(k), A = this._contrastColor($), S = (_ + w) * 40;
        let y = c + w * (l + a);
        g && (y = h - y - l);
        const C = o + _ * (l + a), M = y + l / 2, T = C + l / 2;
        p += `<g class="cell" data-delay="${S}" data-value="${k.toFixed(2)}" style="transform-origin: ${M}px ${T}px; opacity: 0; transform: scale(0.5);">`, p += `<rect x="${y}" y="${C}" width="${l}" height="${l}" rx="6" ry="6" fill="${$}"/>`, p += `<text class="cell-text" x="${M}" y="${T}" fill="${A}">${k.toFixed(2)}</text>`, p += "</g>";
      }
    let m = "<tr><th></th>" + t.map((_) => `<th>${this._escapeHtml(_)}</th>`).join("") + "</tr>";
    for (let _ = 0; _ < s; _++)
      m += `<tr><th>${this._escapeHtml(t[_])}</th>` + (n[_] || []).map((w) => `<td>${(w ?? 0).toFixed(2)}</td>`).join("") + "</tr>";
    const b = `
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${u}" role="img" aria-label="Heatmap">${p}</svg>
        <table class="sr-table"><caption>Heatmap data</caption>${m}</table>
        <div class="tooltip"></div>
      </div>
    `;
    this.render(b), this._svg = this.root.querySelector("svg");
    const x = this.root.querySelector(".tooltip");
    this._svg && x && this._svg.querySelectorAll(".cell").forEach((_) => {
      _.addEventListener("mouseenter", (w) => {
        const $ = w.currentTarget.dataset.value || "";
        x.textContent = $, x.style.opacity = "1";
      }), _.addEventListener("mousemove", (w) => {
        const k = w, $ = this.root.querySelector("div").getBoundingClientRect();
        x.style.left = `${k.clientX - $.left + 10}px`, x.style.top = `${k.clientY - $.top - 28}px`;
      }), _.addEventListener("mouseleave", () => {
        x.style.opacity = "0";
      });
    });
  }
  _contrastColor(t) {
    const n = Ut(t);
    if (!n) return "#000";
    const i = n.rgb();
    return (0.299 * i.r + 0.587 * i.g + 0.114 * i.b) / 255 > 0.5 ? "#000" : "#fff";
  }
  _escapeHtml(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-heatmap", Vg);
const Xg = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
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
`, Ge = { top: 20, right: 30, bottom: 40, left: 60 }, Yo = 500, Go = 250, pe = Yo - Ge.left - Ge.right, Yt = Go - Ge.top - Ge.bottom;
class Yg extends R {
  constructor() {
    super(...arguments);
    z(this, "_resizeObs", null);
    z(this, "_svg", null);
    z(this, "_built", !1);
  }
  static get observedAttributes() {
    return ["data", "area", "points", "tooltip", "color", "x-label", "y-label", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Xg), this.root.innerHTML = '<svg role="img" aria-label="Line chart"></svg>', this._buildChart(), this._resizeObs = new ResizeObserver(() => {
    }), this._resizeObs.observe(this);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._resizeObs) == null || t.disconnect(), this._resizeObs = null;
  }
  handleAttributeChange(t, n, i) {
    this._built && this._buildChart();
  }
  _parseData() {
    const t = this.jsonAttr("data", []);
    return !Array.isArray(t) || t.length === 0 ? [] : typeof t[0] == "number" ? t.map((n, i) => ({ x: i, y: n })) : t;
  }
  _getColor() {
    return this.getAttribute("color") || "var(--lv-accent, #3b82f6)";
  }
  _buildChart() {
    const t = this._parseData();
    if (t.length === 0) return;
    const n = this.root.querySelector("svg");
    if (!n) return;
    const i = this._getColor(), s = this.hasAttribute("area"), a = this.hasAttribute("points"), o = this.hasAttribute("tooltip"), c = this.getAttribute("x-label") || "", l = this.getAttribute("y-label") || "";
    G(n).selectAll("*").remove();
    const d = G(n).attr("viewBox", `0 0 ${Yo} ${Go}`).attr("preserveAspectRatio", "xMidYMid meet");
    this._svg = d;
    const h = d.append("defs"), u = `lv-area-grad-${Math.random().toString(36).slice(2, 8)}`, f = h.append("linearGradient").attr("id", u).attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");
    f.append("stop").attr("offset", "0%").attr("stop-color", i).attr("stop-opacity", 0.25), f.append("stop").attr("offset", "100%").attr("stop-color", i).attr("stop-opacity", 0);
    const g = d.append("g").attr("transform", `translate(${Ge.left},${Ge.top})`), p = oe(t, (y) => y.x), m = oe(t, (y) => y.y), b = (m[1] - m[0]) * 0.1 || 1, x = nt().domain(p).range([0, pe]), v = nt().domain([m[0] - b, m[1] + b]).range([Yt, 0]);
    if (g.append("g").attr("class", "grid").attr("transform", `translate(0,${Yt})`).call(
      ur(x).tickSize(-Yt).tickFormat(() => "")
    ), g.append("g").attr("class", "grid").call(
      fr(v).tickSize(-pe).tickFormat(() => "")
    ), g.append("g").attr("class", "axis x-axis").attr("transform", `translate(0,${Yt})`).call(ur(x).ticks(6)), g.append("g").attr("class", "axis y-axis").call(fr(v).ticks(5)), c && g.append("text").attr("class", "axis-label").attr("x", pe / 2).attr("y", Yt + 35).attr("text-anchor", "middle").text(c), l && g.append("text").attr("class", "axis-label").attr("x", -Yt / 2).attr("y", -38).attr("transform", "rotate(-90)").attr("text-anchor", "middle").text(l), s) {
      const y = vg().x((C) => x(C.x)).y0(Yt).y1((C) => v(C.y));
      g.append("path").datum(t).attr("class", "area").attr("d", y).attr("fill", `url(#${u})`);
    }
    const _ = ie().x((y) => x(y.x)).y((y) => v(y.y)), w = g.append("path").datum(t).attr("class", "line").attr("d", _).attr("stroke", i).attr("stroke-width", 2.5), $ = w.node().getTotalLength();
    w.attr("stroke-dasharray", $).attr("stroke-dashoffset", $), a && g.selectAll(".point").data(t).enter().append("circle").attr("class", "point").attr("cx", (y) => x(y.x)).attr("cy", (y) => v(y.y)).attr("r", 4).attr("fill", i).attr("stroke", "white").attr("stroke-width", 1.5), o && this._setupTooltip(g, t, x, v, i);
    let A = this.root.querySelector(".sr-table");
    A || (A = document.createElement("table"), A.className = "sr-table", this.root.appendChild(A));
    const S = t.map((y) => `<tr><td>${y.x}</td><td>${y.y}</td></tr>`).join("");
    A.innerHTML = `<caption>Line chart data</caption><thead><tr><th>X</th><th>Y</th></tr></thead><tbody>${S}</tbody>`, this._built = !0, this.getAttribute("animated") === "false" && this._showInstant();
  }
  _setupTooltip(t, n, i, s, a) {
    const o = t.append("g").attr("class", "tooltip-group").style("display", "none");
    o.append("line").attr("class", "crosshair crosshair-x").attr("y1", 0).attr("y2", Yt), o.append("line").attr("class", "crosshair crosshair-y").attr("x1", 0).attr("x2", pe), o.append("circle").attr("r", 5).attr("fill", a).attr("stroke", "white").attr("stroke-width", 2), o.append("rect").attr("class", "tooltip-bg").attr("width", 60).attr("height", 24).attr("rx", 6), o.append("text").attr("class", "tooltip-text").attr("text-anchor", "middle").attr("dy", "0.35em");
    const c = Ki((l) => l.x).left;
    t.append("rect").attr("width", pe).attr("height", Yt).attr("fill", "transparent").on("mousemove", (l) => {
      const [d] = ki(l), h = i.invert(d);
      let u = c(n, h, 1);
      if (u >= n.length && (u = n.length - 1), u > 0) {
        const _ = n[u - 1], w = n[u];
        u = h - _.x > w.x - h ? u : u - 1;
      }
      const f = n[u], g = i(f.x), p = s(f.y);
      o.style("display", null), o.select(".crosshair-x").attr("x1", g).attr("x2", g), o.select(".crosshair-y").attr("y1", p).attr("y2", p), o.select("circle").attr("cx", g).attr("cy", p);
      const m = 60, b = 24;
      let x = g - m / 2, v = p - b - 10;
      x < 0 && (x = 0), x + m > pe && (x = pe - m), v < 0 && (v = p + 10), o.select(".tooltip-bg").attr("x", x).attr("y", v), o.select(".tooltip-text").attr("x", x + m / 2).attr("y", v + b / 2).text(`${f.y.toFixed(1)}`);
    }).on("mouseleave", () => {
      o.style("display", "none");
    });
  }
  _showInstant() {
    if (!this._svg) return;
    const t = this._svg.select("g");
    t.select(".line").attr("stroke-dashoffset", 0), t.select(".area").classed("visible", !0), t.selectAll(".point").classed("visible", !0);
  }
  animateIn(t) {
    var a;
    if (!this._svg) return;
    if (t || this.getAttribute("animated") === "false") {
      this._showInstant();
      return;
    }
    const n = this._svg.select("g"), i = n.select(".line"), s = ((a = i.node()) == null ? void 0 : a.getTotalLength()) || 0;
    i.attr("stroke-dasharray", s).attr("stroke-dashoffset", s).transition().duration(1200).ease($n).attr("stroke-dashoffset", 0), n.select(".area").transition().delay(1500).duration(0).on("start", function() {
      G(this).classed("visible", !0);
    }), n.selectAll(".point").each(function(o, c) {
      G(this).transition().delay(1500 + c * 50).duration(0).on("start", function() {
        G(this).classed("visible", !0);
      });
    });
  }
}
customElements.define("lv-line-chart", Yg);
const Un = {
  sigmoid: (r) => 1 / (1 + Math.exp(-r)),
  relu: (r) => Math.max(0, r),
  tanh: (r) => Math.tanh(r),
  linear: (r) => r
}, Gg = `
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
`, ma = 500, _a = 300;
class Wg extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_resizeObserver", null);
    z(this, "_svg", null);
    z(this, "_fn", Un.sigmoid);
    z(this, "_fnName", "sigmoid");
  }
  static get observedAttributes() {
    return ["fn", "range", "samples", "color", "interactive", "animated"];
  }
  get _range() {
    return this.jsonAttr("range", [-6, 6]);
  }
  get _samples() {
    const t = this.getAttribute("samples");
    return t && parseInt(t, 10) || 200;
  }
  get _color() {
    return this.getAttribute("color") || "var(--lv-accent, #3b82f6)";
  }
  get _interactive() {
    return this.hasAttribute("interactive");
  }
  get _animated() {
    const t = this.getAttribute("animated");
    return t === null ? !0 : t !== "false";
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Gg);
    const t = document.createElement("div");
    this.root.appendChild(t);
    const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n.setAttribute("viewBox", `0 0 ${ma} ${_a}`), n.setAttribute("preserveAspectRatio", "xMidYMid meet"), t.appendChild(n), this._svg = G(n), this._parseFn(), this._render(!1), this._resizeObserver = new ResizeObserver(() => {
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), this._resizeObserver = null;
  }
  handleAttributeChange(t, n, i) {
    n !== i && (t === "fn" && this._parseFn(), this._svg && this._render(!1));
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, t || !this._animated ? this._render(!1) : this._render(!0));
  }
  _parseFn() {
    const t = this.getAttribute("fn") || "sigmoid";
    if (this._fnName = t, Un[t])
      this._fn = Un[t];
    else
      try {
        const n = t.replace(/^\s*x\s*=>\s*/, "");
        this._fn = new Function("x", "return " + n), this._fnName = "custom";
      } catch {
        this._fn = Un.sigmoid, this._fnName = "sigmoid";
      }
  }
  _generateData() {
    const [t, n] = this._range, i = this._samples, s = (n - t) / (i - 1), a = [];
    for (let o = 0; o < i; o++) {
      const c = t + o * s, l = this._fn(c);
      a.push({ x: c, y: l });
    }
    return a;
  }
  _render(t) {
    if (!this._svg) return;
    const n = this._svg;
    n.selectAll("*").remove();
    const i = this._generateData(), [s, a] = this._range, o = i.map((w) => w.y), c = xd(o) ?? -1, l = so(o) ?? 1, d = (l - c) * 0.15 || 0.5, h = c - d, u = l + d, f = { top: 20, right: 30, bottom: 30, left: 40 }, g = ma - f.left - f.right, p = _a - f.top - f.bottom, m = nt().domain([s, a]).range([0, g]), b = nt().domain([h, u]).range([p, 0]), x = n.append("g").attr("transform", `translate(${f.left},${f.top})`);
    this._drawGrid(x, m, b, g, p), this._drawAxes(x, m, b, g, p);
    const v = ie().x((w) => m(w.x)).y((w) => b(w.y)).curve(mn), _ = x.append("path").datum(i).attr("class", "fn-line").attr("d", v).attr("stroke", this._color).attr("stroke-width", 3);
    if (t) {
      const k = _.node().getTotalLength();
      _.attr("stroke-dasharray", k).attr("stroke-dashoffset", k).transition().duration(1e3).ease($n).attr("stroke-dashoffset", 0);
    }
    this._drawKeyPoints(x, m, b), this._interactive && this._addInteractivePoint(x, m, b, i, g, p);
  }
  _drawGrid(t, n, i, s, a) {
    const o = n.ticks(), c = i.ticks();
    t.selectAll(".grid-line-x").data(o).enter().append("line").attr("class", "grid-line").attr("x1", (l) => n(l)).attr("x2", (l) => n(l)).attr("y1", 0).attr("y2", a), t.selectAll(".grid-line-y").data(c).enter().append("line").attr("class", "grid-line").attr("x1", 0).attr("x2", s).attr("y1", (l) => i(l)).attr("y2", (l) => i(l));
  }
  _drawAxes(t, n, i, s, a) {
    const [o, c] = n.domain(), [l, d] = i.domain(), h = l <= 0 && d >= 0 ? i(0) : a;
    t.append("line").attr("class", "axis-line").attr("x1", 0).attr("x2", s).attr("y1", h).attr("y2", h);
    const u = o <= 0 && c >= 0 ? n(0) : 0;
    t.append("line").attr("class", "axis-line").attr("x1", u).attr("x2", u).attr("y1", 0).attr("y2", a), n.ticks().forEach((p) => {
      const m = n(p);
      t.append("line").attr("class", "axis-line").attr("x1", m).attr("x2", m).attr("y1", h - 3).attr("y2", h + 3), t.append("text").attr("class", "axis-text").attr("x", m).attr("y", h + 14).attr("text-anchor", "middle").text(p);
    }), i.ticks().forEach((p) => {
      const m = i(p);
      t.append("line").attr("class", "axis-line").attr("x1", u - 3).attr("x2", u + 3).attr("y1", m).attr("y2", m), t.append("text").attr("class", "axis-text").attr("x", u - 12).attr("y", m).attr("dy", "0.35em").attr("text-anchor", "end").text(p);
    });
  }
  _drawKeyPoints(t, n, i) {
    if (this._fnName === "sigmoid") {
      const s = n(0), a = i(0.5);
      t.append("circle").attr("class", "key-point").attr("cx", s).attr("cy", a).attr("r", 4), t.append("text").attr("class", "key-label").attr("x", s + 8).attr("y", a - 8).text("σ(0) = 0.5");
    } else if (this._fnName === "relu") {
      const s = n(0), a = i(0);
      t.append("circle").attr("class", "key-point").attr("cx", s).attr("cy", a).attr("r", 4), t.append("text").attr("class", "key-label").attr("x", s + 8).attr("y", a - 8).text("kink point");
    }
  }
  _addInteractivePoint(t, n, i, s, a, o) {
    const [c, l] = this._range, d = this._fn, h = (c + l) / 2, u = d(h), f = t.append("line").attr("class", "crosshair").attr("x1", n(h)).attr("x2", n(h)).attr("y1", i(u)).attr("y2", o), g = t.append("line").attr("class", "crosshair").attr("x1", 0).attr("x2", n(h)).attr("y1", i(u)).attr("y2", i(u)), p = t.append("g"), m = p.append("rect").attr("class", "readout-bg").attr("width", 160).attr("height", 24).attr("rx", 6), b = p.append("text").attr("class", "readout-text").attr("text-anchor", "middle"), x = t.append("circle").attr("class", "drag-point").attr("cx", n(h)).attr("cy", i(u)).attr("r", 8).attr("fill", this._color).attr("stroke", "#fff").attr("stroke-width", 2), v = (w, k, $, A) => {
      const S = `x = ${$.toFixed(2)}, y = ${A.toFixed(2)}`;
      b.text(S);
      const y = 160, C = 24, M = 12;
      let T = w - y / 2, L = k - C - M;
      T < 0 && (T = 0), T + y > a && (T = a - y), L < 0 && (L = k + M), m.attr("x", T).attr("y", L).attr("width", y).attr("height", C), b.attr("x", T + y / 2).attr("y", L + C / 2).attr("text-anchor", "middle");
    };
    v(n(h), i(u), h, u);
    const _ = mu().on("drag", (w) => {
      const k = Math.max(0, Math.min(a, w.x)), $ = n.invert(k), A = Math.max(c, Math.min(l, $)), S = d(A), y = n(A), C = i(S);
      x.attr("cx", y).attr("cy", C), f.attr("x1", y).attr("x2", y).attr("y1", C).attr("y2", o), g.attr("x1", 0).attr("x2", y).attr("y1", C).attr("y2", C), v(y, C, A, S);
    });
    x.call(_);
  }
}
customElements.define("lv-function", Wg);
const va = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Ug = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
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
`, bt = { top: 20, right: 20, bottom: 50, left: 55 }, ba = 500, ni = 400;
class Kg extends R {
  constructor() {
    super(...arguments);
    z(this, "_data", []);
    z(this, "_hasAnimated", !1);
    z(this, "_svg", null);
    z(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "clusters", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ug), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(t, n, i) {
    n !== i && (t === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, t ? this._render(!1) : this._render(!0));
  }
  _getColor(t, n) {
    return n.color ? n.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${t % 8}`).trim() || va[t % 8];
  }
  _clusterColor(t) {
    const i = [...new Set(this._data.map((o) => o.cluster).filter((o) => o != null))].indexOf(t), s = i >= 0 ? i : 0;
    return getComputedStyle(this).getPropertyValue(`--lv-chart-${s % 8}`).trim() || va[s % 8];
  }
  _initSvg() {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    t.setAttribute("role", "img"), t.setAttribute("aria-label", "Scatter plot"), this._container.appendChild(t), this._svg = G(t), this._svg.append("g").attr("class", "grid-group"), this._svg.append("g").attr("class", "axis-group"), this._svg.append("g").attr("class", "points-group"), this._svg.append("g").attr("class", "tooltip-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(t) {
    if (!this._svg) return;
    const n = this._data, i = this.hasAttribute("clusters"), s = this.hasAttribute("tooltip"), a = this.getAttribute("x-label") || "", o = this.getAttribute("y-label") || "", c = i ? [...new Set(n.map((P) => P.cluster).filter((P) => P != null))] : [], l = c.length > 0 ? 30 : 0, d = ni + l, h = ba - bt.left - bt.right, u = ni - bt.top - bt.bottom;
    this._svg.attr("viewBox", `0 0 ${ba} ${d}`);
    const f = oe(n, (P) => P.x), g = oe(n, (P) => P.y), p = (f[1] - f[0]) * 0.05 || 1, m = (g[1] - g[0]) * 0.05 || 1, b = nt().domain([f[0] - p, f[1] + p]).range([0, h]), x = nt().domain([g[0] - m, g[1] + m]).range([u, 0]), v = this._svg.select(".grid-group").attr("transform", `translate(${bt.left},${bt.top})`);
    v.selectAll("*").remove();
    const _ = ur(b).tickSize(-u).tickFormat(() => "");
    v.append("g").attr("class", "grid").attr("transform", `translate(0,${u})`).call(_);
    const w = fr(x).tickSize(-h).tickFormat(() => "");
    v.append("g").attr("class", "grid").call(w);
    const k = this._svg.select(".axis-group").attr("transform", `translate(${bt.left},${bt.top})`);
    k.selectAll("*").remove(), k.append("g").attr("class", "axis").attr("transform", `translate(0,${u})`).call(ur(b).ticks(6)), k.append("g").attr("class", "axis").call(fr(x).ticks(6)), a && k.append("text").attr("class", "axis-label").attr("x", h / 2).attr("y", u + 38).attr("text-anchor", "middle").text(a), o && k.append("text").attr("class", "axis-label").attr("x", -u / 2).attr("y", -40).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text(o);
    const $ = this._svg.select(".points-group").attr("transform", `translate(${bt.left},${bt.top})`), A = this._svg.select(".tooltip-group").attr("transform", `translate(${bt.left},${bt.top})`);
    A.selectAll("*").remove();
    const S = A.append("g").attr("class", "tooltip-box");
    S.append("rect").attr("class", "tooltip-bg"), S.append("text").attr("class", "tooltip-text");
    const y = $.selectAll(".point").data(n, (P, F) => String(F));
    y.exit().remove();
    const C = y.enter().append("circle").attr("class", "point").attr("cx", (P) => b(P.x)).attr("cy", (P) => x(P.y)).attr("r", 5).attr("fill", (P, F) => i && P.cluster != null ? this._clusterColor(P.cluster) : this._getColor(F, P)).attr("opacity", t ? 0 : 1).attr("transform", t ? "scale(0)" : "scale(1)").style("transform-origin", (P) => `${b(P.x)}px ${x(P.y)}px`);
    s ? C.on("mouseenter", (P, F) => {
      var D;
      if (G(P.currentTarget).transition().duration(150).attr("r", 6.5).attr("opacity", 1), F.label) {
        const Q = b(F.x), it = x(F.y) - 14;
        S.classed("visible", !0), S.select(".tooltip-text").attr("x", Q).attr("y", it).text(F.label);
        const Y = S.select(".tooltip-text").node(), X = ((D = Y == null ? void 0 : Y.getComputedTextLength) == null ? void 0 : D.call(Y)) || 40;
        S.select(".tooltip-bg").attr("x", Q - X / 2 - 6).attr("y", it - 10).attr("width", X + 12).attr("height", 20);
      }
    }).on("mouseleave", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 5).attr("opacity", 0.85), S.classed("visible", !1);
    }) : C.on("mouseenter", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 6.5);
    }).on("mouseleave", (P) => {
      G(P.currentTarget).transition().duration(150).attr("r", 5);
    });
    const M = C.merge(y);
    if (t ? M.each(function(P, F) {
      G(this).transition().delay(F * 30).duration(400).ease(ip).attr("opacity", 0.85).attr("transform", "scale(1)");
    }) : M.attr("cx", (P) => b(P.x)).attr("cy", (P) => x(P.y)).attr("opacity", 0.85).attr("transform", "scale(1)").attr("fill", (P, F) => i && P.cluster != null ? this._clusterColor(P.cluster) : this._getColor(F, P)), this.hasAttribute("labels") || this.hasAttribute("tooltip")) {
      const P = this._svg.select(".points-group");
      P.selectAll(".point-label").remove(), n.forEach((F, N) => {
        if (!F.label) return;
        const D = P.append("text").attr("class", "point-label").attr("x", b(F.x) + 8).attr("y", x(F.y) + 4).attr("fill", "var(--lv-text, #e4e4ec)").attr("font-size", "11px").attr("opacity", t ? 0 : 0.9).text(F.label);
        t && D.transition().delay(N * 30 + 200).duration(300).attr("opacity", 0.9);
      });
    }
    const L = this._svg.select(".legend-group");
    if (L.selectAll("*").remove(), c.length > 0) {
      const P = ni + 5;
      let F = bt.left;
      for (const N of c) {
        const D = this._clusterColor(N);
        L.append("circle").attr("cx", F + 5).attr("cy", P + 8).attr("r", 4).attr("fill", D), L.append("text").attr("class", "legend-text").attr("x", F + 14).attr("y", P + 8).attr("dominant-baseline", "central").text(String(N)), F += 14 + String(N).length * 7 + 20;
      }
    }
    let E = this._container.querySelector(".sr-table");
    E || (E = document.createElement("table"), E.className = "sr-table", this._container.appendChild(E));
    const q = (P) => P.replace(/&/g, "&amp;").replace(/</g, "&lt;"), I = n.map((P) => `<tr><td>${P.x}</td><td>${P.y}</td><td>${P.label ? q(P.label) : ""}</td></tr>`).join("");
    E.innerHTML = `<caption>Scatter plot data</caption><thead><tr><th>X</th><th>Y</th><th>Label</th></tr></thead><tbody>${I}</tbody>`;
  }
}
customElements.define("lv-scatter", Kg);
const Zg = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Jg = `
  :host { display: block; }
  svg { width: 100%; display: block; direction: ltr; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
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
`, nn = 300, Qg = 130, xa = 26, ya = 16;
class t0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_data", []);
    z(this, "_hasAnimated", !1);
    z(this, "_svg", null);
    z(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "donut", "legend"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Jg), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(t, n, i) {
    n !== i && (t === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, t ? this._render(!1) : this._render(!0));
  }
  _getColor(t, n) {
    return n.color ? n.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${t % 8}`).trim() || Zg[t % 8];
  }
  _initSvg() {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    t.setAttribute("role", "img"), t.setAttribute("aria-label", "Pie chart"), this._container.appendChild(t), this._svg = G(t), this._svg.append("g").attr("class", "arcs-group"), this._svg.append("g").attr("class", "labels-group"), this._svg.append("g").attr("class", "hover-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(t) {
    if (!this._svg) return;
    const n = this._data, i = this.hasAttribute("donut"), s = this.hasAttribute("legend"), a = Qg, o = i ? a * 0.6 : 0, c = a + 5, l = s ? n.length : 0, d = l > 0 ? ya + l * xa : 0, h = nn + d;
    this._svg.attr("viewBox", `0 0 ${nn} ${h}`);
    const u = nn / 2, f = nn / 2, p = yg().value((y) => y.value).sort(null).padAngle(0.015)(n), m = ua().innerRadius(o).outerRadius(a), b = ua().innerRadius(o).outerRadius(c), x = this._svg.select(".arcs-group").attr("transform", `translate(${u},${f})`);
    x.selectAll("*").remove();
    const v = this._svg.select(".hover-group").attr("transform", `translate(${u},${f})`);
    v.selectAll("*").remove();
    const _ = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 0), w = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 18).style("font-size", "11px").style("font-weight", "400");
    for (let y = 0; y < p.length; y++) {
      const C = p[y], M = this._getColor(y, C.data), T = x.append("path").attr("class", "arc").attr("fill", M).attr("stroke", "var(--lv-bg, #0f0f23)").attr("stroke-width", 1.5);
      if (t) {
        const L = { ...C, endAngle: C.startAngle };
        T.attr("d", m(L)).transition().delay(y * 120).duration(800).ease($n).attrTween("d", () => {
          const E = Me(L, C);
          return (q) => m(E(q));
        });
      } else
        T.attr("d", m(C));
      T.on("mouseenter", () => {
        if (T.transition().duration(150).attr("d", b(C)), i)
          _.text(C.data.label).classed("visible", !0), w.text(String(C.data.value)).classed("visible", !0);
        else {
          const [L, E] = m.centroid(C);
          _.attr("x", L * 1.6).attr("y", E * 1.6 - 8).text(C.data.label).classed("visible", !0), w.attr("x", L * 1.6).attr("y", E * 1.6 + 8).text(String(C.data.value)).classed("visible", !0);
        }
      }).on("mouseleave", () => {
        T.transition().duration(150).attr("d", m(C)), _.classed("visible", !1), w.classed("visible", !1);
      });
    }
    const k = this._svg.select(".labels-group").attr("transform", `translate(${u},${f})`);
    if (k.selectAll("*").remove(), !s)
      for (let y = 0; y < p.length; y++) {
        const C = p[y];
        if (C.endAngle - C.startAngle > 0.35) {
          const [T, L] = m.centroid(C), E = k.append("text").attr("class", "arc-label").attr("x", T).attr("y", L).text(C.data.label);
          t && E.attr("opacity", 0).transition().delay(y * 120 + 600).duration(300).attr("opacity", 1);
        }
      }
    let $ = this._container.querySelector(".sr-table");
    $ || ($ = document.createElement("table"), $.className = "sr-table", this._container.appendChild($));
    const A = n.map((y) => `<tr><td>${y.label.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</td><td>${y.value}</td></tr>`).join("");
    $.innerHTML = `<caption>Pie chart data</caption><thead><tr><th>Label</th><th>Value</th></tr></thead><tbody>${A}</tbody>`;
    const S = this._svg.select(".legend-group");
    if (S.selectAll("*").remove(), s && n.length > 0) {
      const y = nn + ya;
      for (let C = 0; C < n.length; C++) {
        const T = y + C * xa, L = this._getColor(C, n[C]);
        S.append("rect").attr("class", "legend-swatch").attr("x", 20).attr("y", T - 5).attr("width", 10).attr("height", 10).attr("fill", L), S.append("text").attr("class", "legend-text").attr("x", 38).attr("y", T).attr("dominant-baseline", "central").text(`${n[C].label} (${n[C].value})`);
      }
    }
  }
}
customElements.define("lv-pie", t0);
const e0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  .sr-table { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;
class n0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["labels", "values", "normalize", "show-metrics"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(e0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelectorAll(".cell");
    n.forEach((i, s) => {
      const a = i, o = Math.floor(s / Math.sqrt(n.length)), c = s % Math.sqrt(n.length), l = (o + c) * 40;
      a.style.transition = "none", a.style.opacity = "0", a.style.transform = "scale(0.5)", requestAnimationFrame(() => requestAnimationFrame(() => {
        a.style.transition = `opacity 400ms ease-out ${l}ms, transform 400ms ease-out ${l}ms`, a.style.opacity = "1", a.style.transform = "scale(1)";
      }));
    });
  }
  _buildChart() {
    const t = this.jsonAttr("labels", []), n = this.jsonAttr("values", []), i = this.hasAttribute("normalize"), s = this.hasAttribute("show-metrics");
    if (!t.length || !n.length) {
      this.render('<div class="cm-container"></div>');
      return;
    }
    const a = t.length, o = i ? n.map((y) => {
      const C = y.reduce((M, T) => M + T, 0);
      return C > 0 ? y.map((M) => M / C) : y;
    }) : n, c = Math.max(...o.flat()), l = 56, d = 3, h = 70, u = 80, f = s ? 60 : 0, g = s ? 40 : 0, p = a * l + (a - 1) * d, m = p, b = u + p + f, x = h + m + g, v = this.isRtl, _ = cs(Bo).domain([0, c || 1]), w = (y) => {
      const C = Ut(_(y));
      if (!C) return "#fff";
      const { r: M, g: T, b: L } = C.rgb();
      return M * 0.299 + T * 0.587 + L * 0.114 > 150 ? "#111" : "#fff";
    };
    let k = "";
    for (let y = 0; y < a; y++) {
      const C = u + y * (l + d) + l / 2;
      k += `<text class="header-text" x="${v ? b - C : C}" y="${h - 8}"
        text-anchor="middle">${this._esc(t[y])}</text>`;
    }
    for (let y = 0; y < a; y++) {
      const C = h + y * (l + d) + l / 2, M = v ? b - u / 2 : u / 2;
      k += `<text class="header-text" x="${M}" y="${C}"
        text-anchor="middle" dominant-baseline="central">${this._esc(t[y])}</text>`;
    }
    for (let y = 0; y < a; y++)
      for (let C = 0; C < a; C++) {
        const M = o[y][C], T = n[y][C], L = u + C * (l + d), E = h + y * (l + d), q = v ? b - L - l : L, I = _(M), P = w(M), F = i ? (M * 100).toFixed(0) + "%" : String(T);
        k += `<g class="cell">
          <rect x="${q}" y="${E}" width="${l}" height="${l}"
            rx="4" fill="${I}" ${y === C ? 'stroke="var(--lv-accent)" stroke-width="2"' : ""}/>
          <text class="cell-text" x="${q + l / 2}" y="${E + l / 2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${P}">${F}</text>
        </g>`;
      }
    if (s) {
      for (let y = 0; y < a; y++) {
        const C = n[y][y], M = n.reduce((q, I) => q + I[y], 0), T = M > 0 ? (C / M * 100).toFixed(0) + "%" : "-", L = u + y * (l + d) + l / 2, E = v ? b - L : L;
        k += `<text class="metric-text" x="${E}" y="${h + m + 25}"
          text-anchor="middle" fill="var(--lv-positive)">${T}</text>`;
      }
      for (let y = 0; y < a; y++) {
        const C = n[y][y], M = n[y].reduce((q, I) => q + I, 0), T = M > 0 ? (C / M * 100).toFixed(0) + "%" : "-", L = h + y * (l + d) + l / 2, E = v ? u / 2 - 20 : u + p + 10;
        k += `<text class="metric-text" x="${E}" y="${L}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${T}</text>`;
      }
    }
    const $ = v ? b - 12 : 12, A = h + m / 2;
    k += `<text class="axis-label" x="${$}" y="${A}"
      text-anchor="middle" dominant-baseline="central"
      transform="rotate(-90, ${$}, ${A})">Actual</text>`, k += `<text class="axis-label" x="${u + p / 2}" y="${x - 2}"
      text-anchor="middle">Predicted</text>`;
    let S = "<tr><th></th>" + t.map((y) => `<th>${this._esc(y)}</th>`).join("") + "</tr>";
    for (let y = 0; y < a; y++)
      S += `<tr><th>${this._esc(t[y])}</th>` + n[y].map((C) => `<td>${C}</td>`).join("") + "</tr>";
    this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${b} ${x}" role="img" aria-label="Confusion Matrix">
        ${k}
      </svg>
      <table class="sr-table"><caption>Confusion matrix data</caption>${S}</table>
    </div>`);
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-confusion-matrix", n0);
const r0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .td-container { width: 100%; }
  svg { display: block; width: 100%; }
  .legend { display: flex; gap: 16px; justify-content: center; margin-bottom: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
  .legend-item { display: flex; align-items: center; gap: 6px; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .axis-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .grid-line { stroke: var(--lv-border); stroke-dasharray: 3,3; }
  .metric-line { fill: none; stroke-width: 2; stroke-linecap: round; }
  .tooltip-card { pointer-events: none; }
`, rn = 560, Kn = 280, ct = { top: 30, right: 60, bottom: 40, left: 55 };
class i0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["loss", "accuracy", "lr", "x-label", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(r0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    this.root.querySelectorAll(".metric-line").forEach((i) => {
      const s = i, a = s.getTotalLength();
      s.style.strokeDasharray = String(a), s.style.strokeDashoffset = String(a), s.style.transition = `stroke-dashoffset 1.2s ${s.dataset.idx || "0"}s ease-out`, requestAnimationFrame(() => {
        s.style.strokeDashoffset = "0";
      });
    });
  }
  _buildChart() {
    const t = this.jsonAttr("loss", []), n = this.jsonAttr("accuracy", []), i = this.jsonAttr("lr", []), s = this.getAttribute("x-label") || "Epoch";
    this.hasAttribute("tooltip");
    const a = Math.max(t.length, n.length, i.length);
    if (a === 0) {
      this.render('<div class="td-container"></div>');
      return;
    }
    const o = rn - ct.left - ct.right, c = Kn - ct.top - ct.bottom, l = nt().domain([0, a - 1]).range([0, o]), d = Math.max(
      t.length ? Math.max(...t) : 0,
      n.length ? Math.max(...n) : 1
    ) * 1.1, h = nt().domain([0, d]).range([c, 0]), u = i.length > 0, f = u ? Math.max(...i) * 1.2 : 1, g = nt().domain([0, f]).range([c, 0]), p = ($, A) => ie().x((S, y) => ct.left + l(y)).y((S) => ct.top + A(S)).curve(mn)($) || "", m = [];
    t.length && m.push({ name: "Loss", color: "var(--lv-negative)", data: t, axis: "left" }), n.length && m.push({ name: "Accuracy", color: "var(--lv-positive)", data: n, axis: "left" }), u && m.push({ name: "Learning Rate", color: "var(--lv-accent2)", data: i, axis: "right" });
    const b = m.map(
      ($) => `<div class="legend-item"><div class="legend-dot" style="background:${$.color}"></div>${$.name}</div>`
    ).join("");
    let x = "";
    const v = h.ticks(5);
    v.forEach(($) => {
      const A = ct.top + h($);
      x += `<line class="grid-line" x1="${ct.left}" x2="${rn - ct.right}" y1="${A}" y2="${A}"/>`;
    });
    let _ = "";
    v.forEach(($) => {
      const A = ct.top + h($);
      _ += `<text class="axis-text" x="${ct.left - 8}" y="${A}" text-anchor="end" dominant-baseline="central">${$.toFixed(2)}</text>`;
    }), u && g.ticks(4).forEach(($) => {
      const A = ct.top + g($);
      _ += `<text class="axis-text" x="${rn - ct.right + 8}" y="${A}" text-anchor="start" dominant-baseline="central">${$.toFixed(4)}</text>`;
    }), l.ticks(Math.min(a, 10)).forEach(($) => {
      const A = ct.left + l($);
      _ += `<text class="axis-text" x="${A}" y="${Kn - ct.bottom + 20}" text-anchor="middle">${Math.round($)}</text>`;
    }), _ += `<text class="axis-text" x="${rn / 2}" y="${Kn - 4}" text-anchor="middle">${s}</text>`;
    let k = "";
    m.forEach(($, A) => {
      const S = $.axis === "left" ? h : g, y = p($.data, S);
      k += `<path class="metric-line" d="${y}" stroke="${$.color}" data-idx="${A * 0.3}"/>`;
    }), this.render(`
      <div class="td-container">
        <div class="legend">${b}</div>
        <svg viewBox="0 0 ${rn} ${Kn}" role="img" aria-label="Training Dashboard">
          ${x}${_}${k}
        </svg>
      </div>
    `);
  }
}
customElements.define("lv-train-dashboard", i0);
function wa(r, e) {
  let t;
  if (e === void 0)
    for (const n of r)
      n != null && (t < n || t === void 0 && n >= n) && (t = n);
  else {
    let n = -1;
    for (let i of r)
      (i = e(i, ++n, r)) != null && (t < i || t === void 0 && i >= i) && (t = i);
  }
  return t;
}
function s0(r, e) {
  let t;
  if (e === void 0)
    for (const n of r)
      n != null && (t > n || t === void 0 && n >= n) && (t = n);
  else {
    let n = -1;
    for (let i of r)
      (i = e(i, ++n, r)) != null && (t > i || t === void 0 && i >= i) && (t = i);
  }
  return t;
}
function ri(r, e) {
  let t = 0;
  if (e === void 0)
    for (let n of r)
      (n = +n) && (t += n);
  else {
    let n = -1;
    for (let i of r)
      (i = +e(i, ++n, r)) && (t += i);
  }
  return t;
}
function a0(r) {
  return r.depth;
}
function o0(r, e) {
  return r.sourceLinks.length ? r.depth : e - 1;
}
function Zn(r) {
  return function() {
    return r;
  };
}
function ka(r, e) {
  return Mr(r.source, e.source) || r.index - e.index;
}
function $a(r, e) {
  return Mr(r.target, e.target) || r.index - e.index;
}
function Mr(r, e) {
  return r.y0 - e.y0;
}
function ii(r) {
  return r.value;
}
function l0(r) {
  return r.index;
}
function c0(r) {
  return r.nodes;
}
function d0(r) {
  return r.links;
}
function Aa(r, e) {
  const t = r.get(e);
  if (!t) throw new Error("missing: " + e);
  return t;
}
function Sa({ nodes: r }) {
  for (const e of r) {
    let t = e.y0, n = t;
    for (const i of e.sourceLinks)
      i.y0 = t + i.width / 2, t += i.width;
    for (const i of e.targetLinks)
      i.y1 = n + i.width / 2, n += i.width;
  }
}
function h0() {
  let r = 0, e = 0, t = 1, n = 1, i = 24, s = 8, a, o = l0, c = o0, l, d, h = c0, u = d0, f = 6;
  function g() {
    const E = { nodes: h.apply(null, arguments), links: u.apply(null, arguments) };
    return p(E), m(E), b(E), x(E), w(E), Sa(E), E;
  }
  g.update = function(E) {
    return Sa(E), E;
  }, g.nodeId = function(E) {
    return arguments.length ? (o = typeof E == "function" ? E : Zn(E), g) : o;
  }, g.nodeAlign = function(E) {
    return arguments.length ? (c = typeof E == "function" ? E : Zn(E), g) : c;
  }, g.nodeSort = function(E) {
    return arguments.length ? (l = E, g) : l;
  }, g.nodeWidth = function(E) {
    return arguments.length ? (i = +E, g) : i;
  }, g.nodePadding = function(E) {
    return arguments.length ? (s = a = +E, g) : s;
  }, g.nodes = function(E) {
    return arguments.length ? (h = typeof E == "function" ? E : Zn(E), g) : h;
  }, g.links = function(E) {
    return arguments.length ? (u = typeof E == "function" ? E : Zn(E), g) : u;
  }, g.linkSort = function(E) {
    return arguments.length ? (d = E, g) : d;
  }, g.size = function(E) {
    return arguments.length ? (r = e = 0, t = +E[0], n = +E[1], g) : [t - r, n - e];
  }, g.extent = function(E) {
    return arguments.length ? (r = +E[0][0], t = +E[1][0], e = +E[0][1], n = +E[1][1], g) : [[r, e], [t, n]];
  }, g.iterations = function(E) {
    return arguments.length ? (f = +E, g) : f;
  };
  function p({ nodes: E, links: q }) {
    for (const [P, F] of E.entries())
      F.index = P, F.sourceLinks = [], F.targetLinks = [];
    const I = new Map(E.map((P, F) => [o(P, F, E), P]));
    for (const [P, F] of q.entries()) {
      F.index = P;
      let { source: N, target: D } = F;
      typeof N != "object" && (N = F.source = Aa(I, N)), typeof D != "object" && (D = F.target = Aa(I, D)), N.sourceLinks.push(F), D.targetLinks.push(F);
    }
    if (d != null)
      for (const { sourceLinks: P, targetLinks: F } of E)
        P.sort(d), F.sort(d);
  }
  function m({ nodes: E }) {
    for (const q of E)
      q.value = q.fixedValue === void 0 ? Math.max(ri(q.sourceLinks, ii), ri(q.targetLinks, ii)) : q.fixedValue;
  }
  function b({ nodes: E }) {
    const q = E.length;
    let I = new Set(E), P = /* @__PURE__ */ new Set(), F = 0;
    for (; I.size; ) {
      for (const N of I) {
        N.depth = F;
        for (const { target: D } of N.sourceLinks)
          P.add(D);
      }
      if (++F > q) throw new Error("circular link");
      I = P, P = /* @__PURE__ */ new Set();
    }
  }
  function x({ nodes: E }) {
    const q = E.length;
    let I = new Set(E), P = /* @__PURE__ */ new Set(), F = 0;
    for (; I.size; ) {
      for (const N of I) {
        N.height = F;
        for (const { source: D } of N.targetLinks)
          P.add(D);
      }
      if (++F > q) throw new Error("circular link");
      I = P, P = /* @__PURE__ */ new Set();
    }
  }
  function v({ nodes: E }) {
    const q = wa(E, (F) => F.depth) + 1, I = (t - r - i) / (q - 1), P = new Array(q);
    for (const F of E) {
      const N = Math.max(0, Math.min(q - 1, Math.floor(c.call(null, F, q))));
      F.layer = N, F.x0 = r + N * I, F.x1 = F.x0 + i, P[N] ? P[N].push(F) : P[N] = [F];
    }
    if (l) for (const F of P)
      F.sort(l);
    return P;
  }
  function _(E) {
    const q = s0(E, (I) => (n - e - (I.length - 1) * a) / ri(I, ii));
    for (const I of E) {
      let P = e;
      for (const F of I) {
        F.y0 = P, F.y1 = P + F.value * q, P = F.y1 + a;
        for (const N of F.sourceLinks)
          N.width = N.value * q;
      }
      P = (n - P + a) / (I.length + 1);
      for (let F = 0; F < I.length; ++F) {
        const N = I[F];
        N.y0 += P * (F + 1), N.y1 += P * (F + 1);
      }
      M(I);
    }
  }
  function w(E) {
    const q = v(E);
    a = Math.min(s, (n - e) / (wa(q, (I) => I.length) - 1)), _(q);
    for (let I = 0; I < f; ++I) {
      const P = Math.pow(0.99, I), F = Math.max(1 - P, (I + 1) / f);
      $(q, P, F), k(q, P, F);
    }
  }
  function k(E, q, I) {
    for (let P = 1, F = E.length; P < F; ++P) {
      const N = E[P];
      for (const D of N) {
        let Q = 0, it = 0;
        for (const { source: X, value: ue } of D.targetLinks) {
          let Vt = ue * (D.layer - X.layer);
          Q += T(X, D) * Vt, it += Vt;
        }
        if (!(it > 0)) continue;
        let Y = (Q / it - D.y0) * q;
        D.y0 += Y, D.y1 += Y, C(D);
      }
      l === void 0 && N.sort(Mr), A(N, I);
    }
  }
  function $(E, q, I) {
    for (let P = E.length, F = P - 2; F >= 0; --F) {
      const N = E[F];
      for (const D of N) {
        let Q = 0, it = 0;
        for (const { target: X, value: ue } of D.sourceLinks) {
          let Vt = ue * (X.layer - D.layer);
          Q += L(D, X) * Vt, it += Vt;
        }
        if (!(it > 0)) continue;
        let Y = (Q / it - D.y0) * q;
        D.y0 += Y, D.y1 += Y, C(D);
      }
      l === void 0 && N.sort(Mr), A(N, I);
    }
  }
  function A(E, q) {
    const I = E.length >> 1, P = E[I];
    y(E, P.y0 - a, I - 1, q), S(E, P.y1 + a, I + 1, q), y(E, n, E.length - 1, q), S(E, e, 0, q);
  }
  function S(E, q, I, P) {
    for (; I < E.length; ++I) {
      const F = E[I], N = (q - F.y0) * P;
      N > 1e-6 && (F.y0 += N, F.y1 += N), q = F.y1 + a;
    }
  }
  function y(E, q, I, P) {
    for (; I >= 0; --I) {
      const F = E[I], N = (F.y1 - q) * P;
      N > 1e-6 && (F.y0 -= N, F.y1 -= N), q = F.y0 - a;
    }
  }
  function C({ sourceLinks: E, targetLinks: q }) {
    if (d === void 0) {
      for (const { source: { sourceLinks: I } } of q)
        I.sort($a);
      for (const { target: { targetLinks: I } } of E)
        I.sort(ka);
    }
  }
  function M(E) {
    if (d === void 0)
      for (const { sourceLinks: q, targetLinks: I } of E)
        q.sort($a), I.sort(ka);
  }
  function T(E, q) {
    let I = E.y0 - (E.sourceLinks.length - 1) * a / 2;
    for (const { target: P, width: F } of E.sourceLinks) {
      if (P === q) break;
      I += F + a;
    }
    for (const { source: P, width: F } of q.targetLinks) {
      if (P === E) break;
      I -= F;
    }
    return I;
  }
  function L(E, q) {
    let I = q.y0 - (q.targetLinks.length - 1) * a / 2;
    for (const { source: P, width: F } of q.targetLinks) {
      if (P === E) break;
      I += F + a;
    }
    for (const { target: P, width: F } of E.sourceLinks) {
      if (P === q) break;
      I -= F;
    }
    return I;
  }
  return g;
}
var zi = Math.PI, Ii = 2 * zi, ve = 1e-6, u0 = Ii - ve;
function Fi() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Wo() {
  return new Fi();
}
Fi.prototype = Wo.prototype = {
  constructor: Fi,
  moveTo: function(r, e) {
    this._ += "M" + (this._x0 = this._x1 = +r) + "," + (this._y0 = this._y1 = +e);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(r, e) {
    this._ += "L" + (this._x1 = +r) + "," + (this._y1 = +e);
  },
  quadraticCurveTo: function(r, e, t, n) {
    this._ += "Q" + +r + "," + +e + "," + (this._x1 = +t) + "," + (this._y1 = +n);
  },
  bezierCurveTo: function(r, e, t, n, i, s) {
    this._ += "C" + +r + "," + +e + "," + +t + "," + +n + "," + (this._x1 = +i) + "," + (this._y1 = +s);
  },
  arcTo: function(r, e, t, n, i) {
    r = +r, e = +e, t = +t, n = +n, i = +i;
    var s = this._x1, a = this._y1, o = t - r, c = n - e, l = s - r, d = a - e, h = l * l + d * d;
    if (i < 0) throw new Error("negative radius: " + i);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = r) + "," + (this._y1 = e);
    else if (h > ve) if (!(Math.abs(d * o - c * l) > ve) || !i)
      this._ += "L" + (this._x1 = r) + "," + (this._y1 = e);
    else {
      var u = t - s, f = n - a, g = o * o + c * c, p = u * u + f * f, m = Math.sqrt(g), b = Math.sqrt(h), x = i * Math.tan((zi - Math.acos((g + h - p) / (2 * m * b))) / 2), v = x / b, _ = x / m;
      Math.abs(v - 1) > ve && (this._ += "L" + (r + v * l) + "," + (e + v * d)), this._ += "A" + i + "," + i + ",0,0," + +(d * u > l * f) + "," + (this._x1 = r + _ * o) + "," + (this._y1 = e + _ * c);
    }
  },
  arc: function(r, e, t, n, i, s) {
    r = +r, e = +e, t = +t, s = !!s;
    var a = t * Math.cos(n), o = t * Math.sin(n), c = r + a, l = e + o, d = 1 ^ s, h = s ? n - i : i - n;
    if (t < 0) throw new Error("negative radius: " + t);
    this._x1 === null ? this._ += "M" + c + "," + l : (Math.abs(this._x1 - c) > ve || Math.abs(this._y1 - l) > ve) && (this._ += "L" + c + "," + l), t && (h < 0 && (h = h % Ii + Ii), h > u0 ? this._ += "A" + t + "," + t + ",0,1," + d + "," + (r - a) + "," + (e - o) + "A" + t + "," + t + ",0,1," + d + "," + (this._x1 = c) + "," + (this._y1 = l) : h > ve && (this._ += "A" + t + "," + t + ",0," + +(h >= zi) + "," + d + "," + (this._x1 = r + t * Math.cos(i)) + "," + (this._y1 = e + t * Math.sin(i))));
  },
  rect: function(r, e, t, n) {
    this._ += "M" + (this._x0 = this._x1 = +r) + "," + (this._y0 = this._y1 = +e) + "h" + +t + "v" + +n + "h" + -t + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Ca(r) {
  return function() {
    return r;
  };
}
function f0(r) {
  return r[0];
}
function p0(r) {
  return r[1];
}
var g0 = Array.prototype.slice;
function m0(r) {
  return r.source;
}
function _0(r) {
  return r.target;
}
function v0(r) {
  var e = m0, t = _0, n = f0, i = p0, s = null;
  function a() {
    var o, c = g0.call(arguments), l = e.apply(this, c), d = t.apply(this, c);
    if (s || (s = o = Wo()), r(s, +n.apply(this, (c[0] = l, c)), +i.apply(this, c), +n.apply(this, (c[0] = d, c)), +i.apply(this, c)), o) return s = null, o + "" || null;
  }
  return a.source = function(o) {
    return arguments.length ? (e = o, a) : e;
  }, a.target = function(o) {
    return arguments.length ? (t = o, a) : t;
  }, a.x = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : Ca(+o), a) : n;
  }, a.y = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : Ca(+o), a) : i;
  }, a.context = function(o) {
    return arguments.length ? (s = o ?? null, a) : s;
  }, a;
}
function b0(r, e, t, n, i) {
  r.moveTo(e, t), r.bezierCurveTo(e = (e + n) / 2, t, e, i, n, i);
}
function x0() {
  return v0(b0);
}
function y0(r) {
  return [r.source.x1, r.y0];
}
function w0(r) {
  return [r.target.x0, r.y1];
}
function k0() {
  return x0().source(y0).target(w0);
}
const $0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`, Ma = [
  "var(--lv-chart-0)",
  "var(--lv-chart-1)",
  "var(--lv-chart-2)",
  "var(--lv-chart-3)",
  "var(--lv-chart-4)",
  "var(--lv-chart-5)",
  "var(--lv-chart-6)",
  "var(--lv-chart-7)"
];
class A0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["nodes", "links", "node-colors"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles($0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelectorAll(".node");
    n.forEach((a, o) => {
      const c = a;
      c.style.transition = "none", c.style.opacity = "0", c.style.transform = "translateX(-20px)", requestAnimationFrame(() => requestAnimationFrame(() => {
        c.style.transition = `opacity 400ms ease-out ${o * 80}ms, transform 400ms ease-out ${o * 80}ms`, c.style.opacity = "1", c.style.transform = "translateX(0)";
      }));
    });
    const i = this.root.querySelectorAll(".link"), s = n.length * 80;
    i.forEach((a, o) => {
      const c = a, l = c.getTotalLength();
      c.style.strokeDasharray = String(l), c.style.strokeDashoffset = String(l), c.style.transition = `stroke-dashoffset 600ms ease-out ${s + o * 50}ms`, requestAnimationFrame(() => {
        c.style.strokeDashoffset = "0";
      });
    });
  }
  _buildChart() {
    const t = this.jsonAttr("nodes", []), n = this.jsonAttr("links", []), i = this.jsonAttr("node-colors", []);
    if (!t.length || !n.length) {
      this.render("<svg></svg>");
      return;
    }
    const s = 600, a = Math.max(300, t.length * 40), o = 20, c = this.isRtl, l = h0().nodeId((h, u) => u).nodeWidth(20).nodePadding(16).nodeAlign(a0).extent([[o, o], [s - o, a - o]])({
      nodes: t.map((h) => ({ name: h })),
      links: n.map((h) => ({ ...h }))
    });
    let d = "";
    l.links.forEach((h, u) => {
      const f = k0()(h), g = i[h.source.index] || Ma[h.source.index % 8];
      d += `<path class="link" d="${f}" stroke="${g}" stroke-width="${Math.max(1, h.width)}"/>`;
    }), l.nodes.forEach((h, u) => {
      const f = i[u] || Ma[u % 8], g = c ? s - h.x1 : h.x0, p = h.x1 - h.x0, m = h.y0, b = h.y1 - h.y0, x = c ? g - 6 : g + p + 6, v = c ? "end" : "start";
      d += `<g class="node">
        <rect x="${g}" y="${m}" width="${p}" height="${b}" rx="3" fill="${f}"/>
        <text class="node-label" x="${x}" y="${m + b / 2}"
          text-anchor="${v}" dominant-baseline="central">${this._esc(h.name)}</text>
      </g>`;
    }), this.render(`<svg viewBox="0 0 ${s} ${a}" role="img" aria-label="Sankey Diagram">${d}</svg>`);
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-sankey", A0);
const S0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`, C0 = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class M0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "roughness"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(S0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("canvas");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _buildChart() {
    const t = this.jsonAttr("data", []), n = parseFloat(this.getAttribute("roughness") || "2");
    if (!t.length) {
      this.render('<div class="sketch-container"></div>');
      return;
    }
    const i = 500, s = 300, a = { top: 20, right: 20, bottom: 40, left: 50 };
    this.render(`<div class="sketch-container">
      <canvas width="${i * 2}" height="${s * 2}" style="width:${i}px;height:${s}px;"></canvas>
      <div class="bar-labels">${t.map((m) => `<span>${this._esc(m.label)}</span>`).join("")}</div>
    </div>`);
    const o = this.root.querySelector("canvas");
    if (!o) return;
    const c = eo.canvas(o), l = o.getContext("2d");
    if (!l) return;
    l.scale(2, 2);
    const d = Math.max(...t.map((m) => m.value), 1e-3), h = i - a.left - a.right, u = s - a.top - a.bottom, f = h / t.length * 0.7, g = h / t.length * 0.3;
    c.line(a.left, s - a.bottom, i - a.right, s - a.bottom, { roughness: n * 0.5, stroke: "#888" }), c.line(a.left, a.top, a.left, s - a.bottom, { roughness: n * 0.5, stroke: "#888" });
    const p = this.isRtl;
    t.forEach((m, b) => {
      const x = m.value / d * u, v = p ? t.length - 1 - b : b, _ = a.left + v * (f + g) + g / 2, w = s - a.bottom - x, k = m.color || `var(--lv-chart-${b % 8})`, $ = k.startsWith("var(") ? C0[b % 8] : k;
      c.rectangle(_, w, f, x, {
        roughness: n,
        fill: $,
        fillStyle: "hachure",
        hachureGap: 6,
        stroke: $,
        strokeWidth: 1.5
      });
    }), l.font = "11px sans-serif", l.fillStyle = "#888", l.textAlign = "right";
    for (let m = 0; m <= 4; m++) {
      const b = d * m / 4, x = s - a.bottom - m / 4 * u;
      l.fillText(b.toFixed(1), a.left - 8, x + 4);
    }
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-sketch-bar", M0);
const E0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`, Ea = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class T0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "color", "area", "roughness"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(E0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("canvas");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _buildChart() {
    const t = this.jsonAttr("data", []), n = this.getAttribute("x-label") || "", i = this.getAttribute("y-label") || "", s = this.getAttribute("color") || "", a = this.hasAttribute("area"), o = parseFloat(this.getAttribute("roughness") || "2");
    if (!t.length) {
      this.render("<canvas></canvas>");
      return;
    }
    const c = typeof t[0] == "number" ? t.map((M, T) => ({ x: T, y: M })) : t, l = 500, d = 260, h = { top: 20, right: 20, bottom: 40, left: 55 };
    this.render(`<canvas width="${l * 2}" height="${d * 2}" style="width:${l}px;height:${d}px;"></canvas>`);
    const u = this.root.querySelector("canvas");
    if (!u) return;
    const f = eo.canvas(u), g = u.getContext("2d");
    if (!g) return;
    g.scale(2, 2);
    const p = c.map((M) => M.x), m = c.map((M) => M.y), b = Math.min(...p), x = Math.max(...p), v = Math.min(0, Math.min(...m)), _ = Math.max(...m) * 1.1, w = l - h.left - h.right, k = d - h.top - h.bottom, $ = (M) => h.left + (M - b) / (x - b || 1) * w, A = (M) => h.top + (1 - (M - v) / (_ - v || 1)) * k, S = s.startsWith("var(") ? Ea[0] : s || Ea[0];
    if (f.line(h.left, d - h.bottom, l - h.right, d - h.bottom, { roughness: o * 0.5, stroke: "#888" }), f.line(h.left, h.top, h.left, d - h.bottom, { roughness: o * 0.5, stroke: "#888" }), a) {
      const M = [
        [$(c[0].x), A(v)],
        ...c.map((T) => [$(T.x), A(T.y)]),
        [$(c[c.length - 1].x), A(v)]
      ];
      f.polygon(M, {
        roughness: o * 0.3,
        fill: S,
        fillStyle: "hachure",
        hachureGap: 8,
        hachureAngle: 60,
        stroke: "none",
        fillWeight: 0.5
      });
    }
    const y = c.map((M) => [$(M.x), A(M.y)]);
    f.curve(y, {
      roughness: o,
      stroke: S,
      strokeWidth: 2.5
    }), c.forEach((M) => {
      f.circle($(M.x), A(M.y), 6, {
        roughness: o * 0.5,
        fill: S,
        fillStyle: "solid",
        stroke: S
      });
    }), g.font = "11px sans-serif", g.fillStyle = "#888", g.textAlign = "center", n && g.fillText(n, l / 2, d - 4), i && (g.save(), g.translate(12, d / 2), g.rotate(-Math.PI / 2), g.fillText(i, 0, 0), g.restore()), g.textAlign = "right";
    for (let M = 0; M <= 4; M++) {
      const T = v + (_ - v) * M / 4;
      g.fillText(T.toFixed(2), h.left - 8, A(T) + 4);
    }
    g.textAlign = "center";
    const C = Math.ceil(c.length / 8);
    for (let M = 0; M < c.length; M += C)
      g.fillText(String(c[M].x), $(c[M].x), d - h.bottom + 16);
  }
}
customElements.define("lv-sketch-line", T0);
const L0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`, si = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class P0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_raf", null);
    z(this, "_renderer", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "z-label", "clusters", "auto-rotate", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(L0), this._buildScene();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._raf && cancelAnimationFrame(this._raf), this._renderer && (this._renderer.dispose(), this._renderer = null);
  }
  handleAttributeChange() {
    this.isConnected && this._buildScene();
  }
  _buildScene() {
    this._raf && (cancelAnimationFrame(this._raf), this._raf = null), this._renderer && (this._renderer.dispose(), this._renderer = null);
    const t = this.jsonAttr("data", []);
    this.getAttribute("x-label"), this.getAttribute("y-label"), this.getAttribute("z-label");
    const n = this.hasAttribute("clusters"), i = this.hasAttribute("auto-rotate");
    if (this.render('<div class="scene-container" id="scene"></div>'), !t.length) return;
    const s = this.root.getElementById("scene");
    if (!s) return;
    const a = s.clientWidth || 500, o = s.clientHeight || 375, c = new H.Scene();
    c.background = new H.Color(
      getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim() || "#12122a"
    );
    const l = new H.PerspectiveCamera(50, a / o, 0.1, 100);
    l.position.set(2.5, 2, 2.5), l.lookAt(0, 0, 0);
    const d = new H.WebGLRenderer({ antialias: !0 });
    d.setSize(a, o), d.setPixelRatio(window.devicePixelRatio), s.appendChild(d.domElement), this._renderer = d;
    const h = new no(l, d.domElement);
    h.enableDamping = !0, h.dampingFactor = 0.05, h.autoRotate = i, h.autoRotateSpeed = 1;
    const u = t.map((T) => T.x), f = t.map((T) => T.y), g = t.map((T) => T.z), p = (T) => {
      const L = Math.min(...T), q = Math.max(...T) - L || 1;
      return T.map((I) => (I - L) / q * 2 - 1);
    }, m = p(u), b = p(f), x = p(g), v = [...new Set(t.map((T) => T.cluster || ""))], _ = (T) => {
      const L = v.indexOf(T);
      return new H.Color(si[L % si.length]);
    }, w = new H.BufferGeometry(), k = new Float32Array(t.length * 3), $ = new Float32Array(t.length * 3);
    t.forEach((T, L) => {
      k[L * 3] = m[L], k[L * 3 + 1] = b[L], k[L * 3 + 2] = x[L];
      const E = n ? _(T.cluster || "") : new H.Color(si[0]);
      $[L * 3] = E.r, $[L * 3 + 1] = E.g, $[L * 3 + 2] = E.b;
    }), w.setAttribute("position", new H.BufferAttribute(k, 3)), w.setAttribute("color", new H.BufferAttribute($, 3));
    const A = new H.PointsMaterial({ size: 0.06, vertexColors: !0, sizeAttenuation: !0 });
    c.add(new H.Points(w, A));
    const S = 1.2, y = [16729156, 4521796, 4474111];
    [[S, 0, 0], [0, S, 0], [0, 0, S]].forEach(([T, L, E], q) => {
      const I = [new H.Vector3(0, 0, 0), new H.Vector3(T, L, E)], P = new H.BufferGeometry().setFromPoints(I), F = new H.LineBasicMaterial({ color: y[q], opacity: 0.4, transparent: !0 });
      c.add(new H.Line(P, F));
    });
    const C = new H.GridHelper(2, 10, 3355477, 2236996);
    C.position.y = -1, c.add(C);
    const M = () => {
      this._raf = requestAnimationFrame(M), h.update(), d.render(c, l);
    };
    M();
  }
}
customElements.define("lv-scatter-3d", P0);
const z0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;
class I0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_raf", null);
    z(this, "_renderer", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "z-label", "color-scale", "wireframe", "auto-rotate"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(z0), this._buildScene();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._raf && cancelAnimationFrame(this._raf), this._renderer && (this._renderer.dispose(), this._renderer = null);
  }
  handleAttributeChange() {
    this.isConnected && this._buildScene();
  }
  _buildScene() {
    this._raf && (cancelAnimationFrame(this._raf), this._raf = null), this._renderer && (this._renderer.dispose(), this._renderer = null);
    const t = this.jsonAttr("data", []), n = this.hasAttribute("wireframe"), i = this.hasAttribute("auto-rotate");
    if (this.render('<div class="scene-container" id="scene"></div>'), !t.length || !t[0].length) return;
    const s = this.root.getElementById("scene");
    if (!s) return;
    const a = s.clientWidth || 500, o = s.clientHeight || 375, c = t.length, l = t[0].length, d = t.flat(), h = Math.min(...d), f = Math.max(...d) - h || 1, g = new H.Scene();
    g.background = new H.Color(
      getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim() || "#12122a"
    );
    const p = new H.PerspectiveCamera(50, a / o, 0.1, 100);
    p.position.set(2.5, 2.5, 2.5), p.lookAt(0, 0, 0);
    const m = new H.WebGLRenderer({ antialias: !0 });
    m.setSize(a, o), m.setPixelRatio(window.devicePixelRatio), s.appendChild(m.domElement), this._renderer = m;
    const b = new no(p, m.domElement);
    b.enableDamping = !0, b.autoRotate = i, b.autoRotateSpeed = 0.8;
    const x = new H.PlaneGeometry(2, 2, l - 1, c - 1), v = x.attributes.position, _ = new Float32Array(v.count * 3);
    for (let A = 0; A < c; A++)
      for (let S = 0; S < l; S++) {
        const y = A * l + S, C = (t[A][S] - h) / f;
        v.setZ(y, C - 0.5);
        const M = C;
        let T, L, E;
        M < 0.25 ? (T = 0, L = M * 4, E = 1) : M < 0.5 ? (T = 0, L = 1, E = 1 - (M - 0.25) * 4) : M < 0.75 ? (T = (M - 0.5) * 4, L = 1, E = 0) : (T = 1, L = 1 - (M - 0.75) * 4, E = 0), _[y * 3] = T, _[y * 3 + 1] = L, _[y * 3 + 2] = E;
      }
    x.setAttribute("color", new H.BufferAttribute(_, 3)), x.computeVertexNormals(), x.rotateX(-Math.PI / 2);
    const w = n ? new H.MeshBasicMaterial({ vertexColors: !0, wireframe: !0 }) : new H.MeshPhongMaterial({ vertexColors: !0, side: H.DoubleSide, flatShading: !0 });
    if (g.add(new H.Mesh(x, w)), !n) {
      g.add(new H.AmbientLight(16777215, 0.4));
      const A = new H.DirectionalLight(16777215, 0.8);
      A.position.set(3, 5, 3), g.add(A);
    }
    const k = new H.GridHelper(2, 10, 3355477, 2236996);
    k.position.y = -0.5, g.add(k);
    const $ = () => {
      this._raf = requestAnimationFrame($), b.update(), m.render(g, p);
    };
    $();
  }
}
customElements.define("lv-surface-3d", I0);
const F0 = `
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
class q0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_steps", []);
    z(this, "_currentStep", 0);
    z(this, "_arr", []);
    z(this, "_playing", !1);
    z(this, "_timer", null);
  }
  static get observedAttributes() {
    return ["data", "algorithm", "speed", "auto-play"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(F0), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopTimer();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, !t && this.hasAttribute("auto-play") && this._play());
  }
  _stopTimer() {
    this._timer !== null && (clearInterval(this._timer), this._timer = null), this._playing = !1;
  }
  _getSpeed() {
    return parseInt(this.getAttribute("speed") || "100", 10);
  }
  _getAlgorithm() {
    return this.getAttribute("algorithm") || "bubble";
  }
  _getData() {
    const t = this.jsonAttr("data", []);
    if (t.length > 0) return t.slice();
    const n = [];
    for (let i = 0; i < 20; i++) n.push(Math.floor(Math.random() * 100) + 5);
    return n;
  }
  _generateSteps(t) {
    const n = t.slice(), i = [], s = this._getAlgorithm();
    if (s === "bubble")
      for (let a = 0; a < n.length; a++) {
        for (let o = 0; o < n.length - a - 1; o++)
          i.push({ type: "compare", indices: [o, o + 1] }), n[o] > n[o + 1] && ([n[o], n[o + 1]] = [n[o + 1], n[o]], i.push({ type: "swap", indices: [o, o + 1] }));
        i.push({ type: "sorted", indices: [n.length - a - 1] });
      }
    else if (s === "selection") {
      for (let a = 0; a < n.length - 1; a++) {
        let o = a;
        for (let c = a + 1; c < n.length; c++)
          i.push({ type: "compare", indices: [o, c] }), n[c] < n[o] && (o = c);
        o !== a && ([n[a], n[o]] = [n[o], n[a]], i.push({ type: "swap", indices: [a, o] })), i.push({ type: "sorted", indices: [a] });
      }
      i.push({ type: "sorted", indices: [n.length - 1] });
    } else if (s === "insertion") {
      i.push({ type: "sorted", indices: [0] });
      for (let a = 1; a < n.length; a++) {
        let o = a;
        for (; o > 0 && (i.push({ type: "compare", indices: [o - 1, o] }), n[o - 1] > n[o]); )
          [n[o - 1], n[o]] = [n[o], n[o - 1]], i.push({ type: "swap", indices: [o - 1, o] }), o--;
      }
      for (let a = 0; a < n.length; a++) i.push({ type: "sorted", indices: [a] });
    } else if (s === "merge") {
      this._mergeSortSteps(n, 0, n.length - 1, i);
      for (let a = 0; a < n.length; a++) i.push({ type: "sorted", indices: [a] });
    } else if (s === "quick") {
      this._quickSortSteps(n, 0, n.length - 1, i);
      for (let a = 0; a < n.length; a++) i.push({ type: "sorted", indices: [a] });
    }
    return i;
  }
  _mergeSortSteps(t, n, i, s) {
    if (n >= i) return;
    const a = Math.floor((n + i) / 2);
    this._mergeSortSteps(t, n, a, s), this._mergeSortSteps(t, a + 1, i, s);
    const o = t.slice(n, i + 1);
    let c = 0, l = a - n + 1, d = n;
    for (; c <= a - n && l <= i - n; )
      s.push({ type: "compare", indices: [n + c, n + l] }), o[c] <= o[l] ? t[d++] = o[c++] : t[d++] = o[l++];
    for (; c <= a - n; ) t[d++] = o[c++];
    for (; l <= i - n; ) t[d++] = o[l++];
    for (let h = n; h <= i; h++)
      s.push({ type: "swap", indices: [h, h] });
  }
  _quickSortSteps(t, n, i, s) {
    if (n >= i) return;
    const a = t[i];
    let o = n;
    for (let c = n; c < i; c++)
      s.push({ type: "compare", indices: [c, i] }), t[c] < a && (o !== c && ([t[o], t[c]] = [t[c], t[o]], s.push({ type: "swap", indices: [o, c] })), o++);
    [t[o], t[i]] = [t[i], t[o]], s.push({ type: "swap", indices: [o, i] }), s.push({ type: "sorted", indices: [o] }), this._quickSortSteps(t, n, o - 1, s), this._quickSortSteps(t, o + 1, i, s);
  }
  _play() {
    this._playing || (this._playing = !0, this._updateButtons(), this._timer = window.setInterval(() => {
      if (this._currentStep >= this._steps.length) {
        this._stopTimer(), this._updateButtons();
        return;
      }
      this._stepForward();
    }, this._getSpeed()));
  }
  _pause() {
    this._stopTimer(), this._updateButtons();
  }
  _reset() {
    this._stopTimer(), this._currentStep = 0, this._arr = this._getData(), this._steps = this._generateSteps(this._arr.slice()), this._drawBars(this._arr, null), this._updateInfo(), this._updateButtons();
  }
  _stepForward() {
    if (this._currentStep >= this._steps.length) return;
    const t = this._steps[this._currentStep];
    this._applyStep(t), this._currentStep++, this._updateInfo(), this._currentStep >= this._steps.length && (this._stopTimer(), this._updateButtons());
  }
  _applyStep(t) {
    const n = G(this.root.querySelector("svg"));
    if (this._arr.length, Math.max(...this._arr, 1), t.type === "compare")
      n.selectAll(".bar-rect").attr("fill", (i, s) => t.indices.includes(s) ? "#ffd93d" : n.selectAll(".bar-rect").nodes()[s].dataset.sorted === "true" ? "#22c55e" : "#00d4ff");
    else if (t.type === "swap") {
      const [i, s] = t.indices;
      i !== s && ([this._arr[i], this._arr[s]] = [this._arr[s], this._arr[i]]), this._drawBars(this._arr, t.indices);
    } else t.type === "sorted" && t.indices.forEach((i) => {
      const s = n.selectAll(".bar-rect").nodes()[i];
      s && (s.setAttribute("fill", "#22c55e"), s.dataset.sorted = "true");
    });
  }
  _drawBars(t, n) {
    const s = G(this.root.querySelector("svg")).select(".bars-group");
    if (s.empty()) return;
    const a = 500, o = 260, c = t.length, l = (a - 20) / c, d = Math.max(...t, 1);
    s.selectAll(".bar-rect").data(t).join(
      (u) => u.append("rect").attr("class", "bar-rect").attr("x", (f, g) => 10 + g * l + 1).attr("width", Math.max(l - 2, 1)).attr("y", (f) => o - f / d * (o - 20)).attr("height", (f) => f / d * (o - 20)).attr("rx", 2).attr("fill", "#00d4ff"),
      (u) => u.attr("x", (f, g) => 10 + g * l + 1).attr("width", Math.max(l - 2, 1)).attr("y", (f) => o - f / d * (o - 20)).attr("height", (f) => f / d * (o - 20)).attr("fill", (f, g) => u.nodes()[g].dataset.sorted === "true" ? "#22c55e" : n && n.includes(g) ? "#ffd93d" : "#00d4ff")
    );
  }
  _updateInfo() {
    const t = this.root.querySelector(".info");
    t && (t.textContent = `${this._getAlgorithm().toUpperCase()} — Step ${this._currentStep} / ${this._steps.length}`);
  }
  _updateButtons() {
    const t = this.root.querySelector(".btn-play"), n = this.root.querySelector(".btn-step");
    t && (t.textContent = this._playing ? "Pause" : "Play"), n && (n.disabled = this._playing || this._currentStep >= this._steps.length);
  }
  _build() {
    this._stopTimer(), this._arr = this._getData(), this._steps = this._generateSteps(this._arr.slice()), this._currentStep = 0;
    const t = 500, n = 300;
    this.render(`<div class="sort-container">
      <svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}">
        <g class="bars-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`), this._drawBars(this._arr, null), this._updateInfo(), this.root.querySelector(".btn-play").addEventListener("click", () => {
      this._playing ? this._pause() : this._play();
    }), this.root.querySelector(".btn-step").addEventListener("click", () => {
      this._playing || this._stepForward();
    }), this.root.querySelector(".btn-reset").addEventListener("click", () => this._reset());
  }
}
customElements.define("lv-sorting-viz", q0);
const N0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mt-container { width: 100%; }
  svg { display: block; margin: 0 auto; }
  .matrix-label, .eigen-label {
    font-family: monospace;
  }
`;
class R0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_animFrame", null);
  }
  static get observedAttributes() {
    return ["matrix", "show-grid", "show-eigen", "animate"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(N0), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._animFrame !== null && cancelAnimationFrame(this._animFrame);
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, !t && this.hasAttribute("animate") && this._animateTransform());
  }
  _getMatrix() {
    return this.jsonAttr("matrix", [[1, 0], [0, 1]]);
  }
  _showGrid() {
    return !this.hasAttribute("show-grid") || this.getAttribute("show-grid") !== "false";
  }
  _build() {
    this.render(`<div class="mt-container">
      <svg viewBox="-3 -3 6 6" width="400" height="400">
        <defs>
          <marker id="ah-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
          </marker>
          <marker id="ah-green" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e"/>
          </marker>
          <marker id="ah-yellow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffd93d"/>
          </marker>
        </defs>
        <g class="scene" transform="scale(1,-1)"></g>
        <g class="labels"></g>
      </svg>
    </div>`), !this.hasAttribute("animate") || this._hasAnimated ? this._drawScene(this._getMatrix()) : this._drawScene([[1, 0], [0, 1]]), this._drawMatrixLabel(this._getMatrix());
  }
  _animateTransform() {
    const t = this._getMatrix(), n = 1500, i = performance.now(), s = (a) => {
      const o = Math.min((a - i) / n, 1), c = o < 0.5 ? 2 * o * o : 1 - Math.pow(-2 * o + 2, 2) / 2, l = [
        [1 + (t[0][0] - 1) * c, t[0][1] * c],
        [t[1][0] * c, 1 + (t[1][1] - 1) * c]
      ];
      this._drawScene(l), o < 1 && (this._animFrame = requestAnimationFrame(s));
    };
    this._animFrame = requestAnimationFrame(s);
  }
  _drawScene(t) {
    const i = G(this.root.querySelector("svg")).select(".scene");
    i.selectAll("*").remove();
    const s = 3, a = 0.02;
    for (let p = -s; p <= s; p++)
      i.append("line").attr("x1", -s).attr("y1", p).attr("x2", s).attr("y2", p).attr("stroke", "#333").attr("stroke-width", p === 0 ? a * 2 : a), i.append("line").attr("x1", p).attr("y1", -s).attr("x2", p).attr("y2", s).attr("stroke", "#333").attr("stroke-width", p === 0 ? a * 2 : a);
    if (this._showGrid())
      for (let p = -s; p <= s; p++) {
        const m = t[0][0] * -s + t[0][1] * p, b = t[1][0] * -s + t[1][1] * p, x = t[0][0] * s + t[0][1] * p, v = t[1][0] * s + t[1][1] * p;
        i.append("line").attr("x1", m).attr("y1", b).attr("x2", x).attr("y2", v).attr("stroke", "#00d4ff").attr("stroke-width", a).attr("opacity", 0.35);
        const _ = t[0][0] * p + t[0][1] * -s, w = t[1][0] * p + t[1][1] * -s, k = t[0][0] * p + t[0][1] * s, $ = t[1][0] * p + t[1][1] * s;
        i.append("line").attr("x1", _).attr("y1", w).attr("x2", k).attr("y2", $).attr("stroke", "#00d4ff").attr("stroke-width", a).attr("opacity", 0.35);
      }
    const o = 64, c = [];
    for (let p = 0; p <= o; p++) {
      const m = 2 * Math.PI * p / o, b = Math.cos(m), x = Math.sin(m);
      c.push([t[0][0] * b + t[0][1] * x, t[1][0] * b + t[1][1] * x]);
    }
    const l = ie().x((p) => p[0]).y((p) => p[1]);
    i.append("path").attr("d", l(c)).attr("fill", "none").attr("stroke", "#7b68ee").attr("stroke-width", a * 1.5).attr("opacity", 0.6), i.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 1).attr("fill", "none").attr("stroke", "#555").attr("stroke-width", a).attr("stroke-dasharray", "0.05,0.05");
    const d = 0.85, h = t[0][0], u = t[1][0];
    i.append("line").attr("x1", 0).attr("y1", 0).attr("x2", h * d).attr("y2", u * d).attr("stroke", "#ef4444").attr("stroke-width", a * 3).attr("marker-end", "url(#ah-red)");
    const f = t[0][1], g = t[1][1];
    i.append("line").attr("x1", 0).attr("y1", 0).attr("x2", f * d).attr("y2", g * d).attr("stroke", "#22c55e").attr("stroke-width", a * 3).attr("marker-end", "url(#ah-green)"), this.hasAttribute("show-eigen") && this._computeEigen(t).forEach((m) => {
      if (m.real) {
        const x = m.vec[0] * 2.5, v = m.vec[1] * 2.5;
        i.append("line").attr("x1", -x).attr("y1", -v).attr("x2", x).attr("y2", v).attr("stroke", "#ffd93d").attr("stroke-width", a * 2).attr("stroke-dasharray", "0.1,0.06").attr("marker-end", "url(#ah-yellow)");
      }
    }), i.append("circle").attr("cx", 0).attr("cy", 0).attr("r", a * 2.5).attr("fill", "#fff");
  }
  _drawMatrixLabel(t) {
    const n = G(this.root.querySelector("svg")).select(".labels");
    n.selectAll("*").remove();
    const i = -3 + 0.15, s = -3 + 0.35, a = 0.24;
    n.append("rect").attr("x", i - 0.08).attr("y", s - a - 0.05).attr("width", 2.2).attr("height", this.hasAttribute("show-eigen") ? 1.8 : 0.8).attr("rx", 0.06).attr("fill", "rgba(0,0,0,0.6)"), n.append("text").attr("class", "matrix-label").attr("x", i).attr("y", s).attr("font-size", a).attr("fill", "#aaa").text(`[${t[0][0].toFixed(1)}, ${t[0][1].toFixed(1)}]`), n.append("text").attr("class", "matrix-label").attr("x", i).attr("y", s + a * 1.3).attr("font-size", a).attr("fill", "#aaa").text(`[${t[1][0].toFixed(1)}, ${t[1][1].toFixed(1)}]`), this.hasAttribute("show-eigen") && this._computeEigen(t).forEach((c, l) => {
      c.real && n.append("text").attr("class", "eigen-label").attr("x", i).attr("y", s + a * 2.8 + l * a * 1.3).attr("font-size", a * 0.85).attr("fill", "#ffd93d").text(`λ${l + 1} = ${c.value.toFixed(2)}`);
    });
  }
  _computeEigen(t) {
    const n = t[0][0], i = t[0][1], s = t[1][0], a = t[1][1], o = n + a, c = n * a - i * s, l = o * o - 4 * c;
    if (l < 0) return [];
    const d = Math.sqrt(l), h = (o + d) / 2, u = (o - d) / 2, f = (g) => {
      const p = n - g, m = i;
      if (Math.abs(m) > 1e-10) {
        const b = [1, -p / m], x = Math.sqrt(b[0] * b[0] + b[1] * b[1]);
        return [b[0] / x, b[1] / x];
      } else if (Math.abs(p) > 1e-10)
        return [0, 1];
      return [1, 0];
    };
    return [
      { value: h, vec: f(h), real: !0 },
      { value: u, vec: f(u), real: !0 }
    ];
  }
}
customElements.define("lv-matrix-transform", R0);
const D0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .vf-container { width: 100%; }
  canvas { display: block; margin: 0 auto; }
`;
class O0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_animFrame", null);
    z(this, "_particles", []);
    z(this, "_fnEval", null);
  }
  static get observedAttributes() {
    return ["fn", "range", "density", "particles", "particle-count"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(D0), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._animFrame !== null && cancelAnimationFrame(this._animFrame);
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, !t && this.hasAttribute("particles") && this._startParticles());
  }
  _getRange() {
    return this.jsonAttr("range", [-3, 3]);
  }
  _getDensity() {
    return parseInt(this.getAttribute("density") || "15", 10);
  }
  _getParticleCount() {
    return parseInt(this.getAttribute("particle-count") || "50", 10);
  }
  _parseFn() {
    const t = this.getAttribute("fn") || "rotation", n = {
      rotation: (i, s) => [-s, i],
      source: (i, s) => [i, s],
      saddle: (i, s) => [i, -s],
      curl: (i, s) => [-(s * s), i * i]
    };
    if (n[t]) return n[t];
    try {
      const i = t.replace(/\^/g, "**"), s = new Function("x", "y", `'use strict'; return ${i};`);
      return s(0, 0), s;
    } catch {
      return n.rotation;
    }
  }
  _build() {
    this._animFrame !== null && cancelAnimationFrame(this._animFrame), this._animFrame = null, this._fnEval = this._parseFn();
    const t = 500, n = 2;
    this.render(`<div class="vf-container">
      <canvas width="${t * n}" height="${t * n}" style="width:${t}px;height:${t}px;"></canvas>
    </div>`), this._drawField(), this._hasAnimated && this.hasAttribute("particles") && this._startParticles();
  }
  _drawField() {
    const t = this.root.querySelector("canvas");
    if (!t) return;
    const n = t.getContext("2d");
    if (!n) return;
    const i = 2, s = 500, [a, o] = this._getRange(), c = this._getDensity(), l = this._fnEval;
    n.save(), n.scale(i, i), n.clearRect(0, 0, s, s);
    const d = (m, b) => {
      const x = (m - a) / (o - a) * s, v = (o - b) / (o - a) * s;
      return [x, v];
    };
    n.strokeStyle = "#444", n.lineWidth = 1;
    const [h, u] = d(0, 0);
    n.beginPath(), n.moveTo(0, u), n.lineTo(s, u), n.stroke(), n.beginPath(), n.moveTo(h, 0), n.lineTo(h, s), n.stroke(), n.fillStyle = "#666", n.font = "11px sans-serif", n.textAlign = "center", n.fillText("x", s - 10, u + 14), n.fillText("y", h + 14, 14);
    for (let m = Math.ceil(a); m <= Math.floor(o); m++) {
      if (m === 0) continue;
      const [b] = d(m, 0);
      n.fillText(String(m), b, u + 14);
      const [x, v] = d(0, m);
      n.textAlign = "right", n.fillText(String(m), h - 6, v + 4), n.textAlign = "center";
    }
    const f = (o - a) / c;
    let g = 0;
    for (let m = 0; m < c; m++)
      for (let b = 0; b < c; b++) {
        const x = a + (m + 0.5) * f, v = a + (b + 0.5) * f, [_, w] = l(x, v), k = Math.sqrt(_ * _ + w * w);
        k > g && (g = k);
      }
    g === 0 && (g = 1);
    const p = f * 0.8 * s / (o - a);
    for (let m = 0; m < c; m++)
      for (let b = 0; b < c; b++) {
        const x = a + (m + 0.5) * f, v = a + (b + 0.5) * f, [_, w] = l(x, v), k = Math.sqrt(_ * _ + w * w);
        if (k < 1e-10) continue;
        const $ = k / g, A = p * Math.min($, 1) * 0.9, S = Math.atan2(-w, _), [y, C] = d(x, v), M = Math.floor($ * 255), T = Math.floor((1 - $) * 255), L = Math.floor((1 - Math.abs($ - 0.5) * 2) * 120);
        n.strokeStyle = `rgb(${M},${L},${T})`, n.fillStyle = `rgb(${M},${L},${T})`, n.lineWidth = 1.2;
        const E = y + A * Math.cos(S), q = C + A * Math.sin(S);
        n.beginPath(), n.moveTo(y, C), n.lineTo(E, q), n.stroke();
        const I = Math.max(A * 0.3, 3), P = S + Math.PI * 0.8, F = S - Math.PI * 0.8;
        n.beginPath(), n.moveTo(E, q), n.lineTo(E + I * Math.cos(P), q + I * Math.sin(P)), n.lineTo(E + I * Math.cos(F), q + I * Math.sin(F)), n.closePath(), n.fill();
      }
    n.restore();
  }
  _startParticles() {
    const [t, n] = this._getRange(), i = this._getParticleCount();
    this._particles = [];
    for (let s = 0; s < i; s++)
      this._particles.push({
        x: t + Math.random() * (n - t),
        y: t + Math.random() * (n - t),
        trail: []
      });
    this._animateParticles();
  }
  _animateParticles() {
    const t = this.root.querySelector("canvas");
    if (!t) return;
    const n = t.getContext("2d");
    if (!n) return;
    const i = 2, s = 500, [a, o] = this._getRange(), c = this._fnEval, l = 0.015, d = 10, h = (f, g) => {
      const p = (f - a) / (o - a) * s, m = (o - g) / (o - a) * s;
      return [p, m];
    }, u = () => {
      this._drawField(), n.save(), n.scale(i, i);
      for (const f of this._particles) {
        const [g, p] = c(f.x, f.y);
        f.trail.push([f.x, f.y]), f.trail.length > d && f.trail.shift(), f.x += g * l, f.y += p * l, (f.x < a || f.x > o || f.y < a || f.y > o) && (f.x = a + Math.random() * (o - a), f.y = a + Math.random() * (o - a), f.trail = []);
        for (let x = 0; x < f.trail.length; x++) {
          const v = (x + 1) / f.trail.length * 0.6, [_, w] = h(f.trail[x][0], f.trail[x][1]);
          n.beginPath(), n.arc(_, w, 1.5, 0, Math.PI * 2), n.fillStyle = `rgba(0, 212, 255, ${v})`, n.fill();
        }
        const [m, b] = h(f.x, f.y);
        n.beginPath(), n.arc(m, b, 2.5, 0, Math.PI * 2), n.fillStyle = "#00d4ff", n.fill();
      }
      n.restore(), this._animFrame = requestAnimationFrame(u);
    };
    this._animFrame = requestAnimationFrame(u);
  }
}
customElements.define("lv-vector-field", O0);
const B0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .dist-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .axis text { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-text-dim); }
  .axis line, .axis path { stroke: var(--lv-border); }
  .stats-row { display: flex; gap: 24px; justify-content: center; margin-top: 8px; font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); }
  .stats-row span { display: inline-flex; gap: 4px; }
  .stats-label { color: var(--lv-text); font-weight: 600; }
  .shade-label { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-accent); font-weight: 600; }
`;
class H0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["type", "params", "shade-from", "shade-to", "show-stats"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(B0), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".dist-area"), i = this.root.querySelector(".dist-line");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    })), i && (i.style.opacity = "0", i.style.transition = "opacity 0.6s ease-out 0.1s", requestAnimationFrame(() => {
      i.style.opacity = "1";
    }));
  }
  _build() {
    const t = this.getAttribute("type") || "normal", n = this.hasAttribute("shade-from") ? parseFloat(this.getAttribute("shade-from")) : null, i = this.hasAttribute("shade-to") ? parseFloat(this.getAttribute("shade-to")) : null, s = this.hasAttribute("show-stats"), a = 500, o = 300, c = { top: 20, right: 30, bottom: 40, left: 50 }, l = a - c.left - c.right, d = o - c.top - c.bottom, h = t === "poisson" || t === "binomial", { points: u, range: f, mean: g, std: p, mode: m } = this._computeDistribution(t);
    if (!u.length) {
      this.render('<div class="dist-container"></div>');
      return;
    }
    const b = nt().domain(f).range([0, l]), x = Math.max(...u.map((A) => A.y)) * 1.15, v = nt().domain([0, x]).range([d, 0]);
    let _ = "";
    const w = v.ticks(5);
    for (const A of w)
      _ += `<line x1="0" y1="${v(A)}" x2="${l}" y2="${v(A)}" stroke="var(--lv-border)" stroke-opacity="0.3" stroke-dasharray="3,3"/>`;
    if (h) {
      const A = Math.max(2, Math.min(20, l / u.length * 0.7));
      if (n !== null || i !== null) {
        let S = 0;
        for (const y of u)
          (n !== null && i !== null ? y.x >= n && y.x <= i : n !== null ? y.x >= n : i !== null ? y.x <= i : !1) && (_ += `<rect x="${b(y.x) - A / 2}" y="${v(y.y)}" width="${A}" height="${d - v(y.y)}" fill="var(--lv-accent)" opacity="0.3"/>`, S += y.y);
        _ += `<text class="shade-label" x="${l / 2}" y="-4" text-anchor="middle">P = ${S.toFixed(4)}</text>`;
      }
      for (const S of u)
        _ += `<rect x="${b(S.x) - A / 2}" y="${v(S.y)}" width="${A}" height="${d - v(S.y)}" fill="var(--lv-accent)" opacity="0.6" stroke="var(--lv-accent)" stroke-width="1"/>`;
    } else {
      const A = this._areaPath(u, b, v, d), S = this._linePath(u, b, v);
      if (n !== null || i !== null) {
        const y = n ?? f[0], C = i ?? f[1], M = u.filter((T) => T.x >= y && T.x <= C);
        if (M.length > 1) {
          const T = this._areaPath(M, b, v, d);
          _ += `<path d="${T}" fill="var(--lv-accent)" opacity="0.3"/>`;
          let L = 0;
          for (let I = 1; I < M.length; I++)
            L += (M[I].x - M[I - 1].x) * (M[I].y + M[I - 1].y) / 2;
          const E = b((y + C) / 2), q = v(Math.max(...M.map((I) => I.y)) / 2);
          _ += `<text class="shade-label" x="${E}" y="${Math.min(q, d - 10)}" text-anchor="middle">P = ${L.toFixed(4)}</text>`;
        }
      }
      _ += `<path class="dist-area" d="${A}" fill="var(--lv-accent)" opacity="0.15"/>`, _ += `<path class="dist-line" d="${S}" fill="none" stroke="var(--lv-accent)" stroke-width="2"/>`;
    }
    const k = b.ticks(8);
    for (const A of k)
      _ += `<g class="axis" transform="translate(${b(A)},${d})">
        <line y2="5" stroke="var(--lv-border)"/>
        <text y="18" text-anchor="middle">${this._fmtNum(A)}</text>
      </g>`;
    _ += `<line x1="0" y1="${d}" x2="${l}" y2="${d}" stroke="var(--lv-border)"/>`;
    for (const A of w)
      _ += `<g class="axis" transform="translate(0,${v(A)})">
        <line x2="-5" stroke="var(--lv-border)"/>
        <text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum(A)}</text>
      </g>`;
    _ += `<line x1="0" y1="0" x2="0" y2="${d}" stroke="var(--lv-border)"/>`;
    let $ = "";
    s && ($ = `<div class="stats-row">
        <span><span class="stats-label">Mean:</span> ${this._fmtNum(g)}</span>
        <span><span class="stats-label">Std:</span> ${this._fmtNum(p)}</span>
        <span><span class="stats-label">Mode:</span> ${this._fmtNum(m)}</span>
      </div>`), this.render(`<div class="dist-container">
      <svg viewBox="0 0 ${a} ${o}" role="img" aria-label="${t} distribution">
        <g transform="translate(${c.left},${c.top})">${_}</g>
      </svg>
      ${$}
    </div>`);
  }
  _computeDistribution(t) {
    switch (t) {
      case "uniform": {
        const n = this.jsonAttr("params", { a: 0, b: 1 }), i = n.a ?? 0, s = n.b ?? 1;
        if (s <= i) return { points: [{ x: i, y: 1 }], range: [i - 1, i + 1], mean: i, std: 0, mode: i };
        const a = 1 / (s - i), o = [i - 1, s + 1], c = [], l = 200;
        for (let d = 0; d <= l; d++) {
          const h = o[0] + (o[1] - o[0]) * d / l;
          c.push({ x: h, y: h >= i && h <= s ? a : 0 });
        }
        return { points: c, range: o, mean: (i + s) / 2, std: Math.sqrt((s - i) ** 2 / 12), mode: (i + s) / 2 };
      }
      case "poisson": {
        const i = this.jsonAttr("params", { lambda: 5 }).lambda ?? 5, s = Math.ceil(i + 4 * Math.sqrt(i)), a = [];
        let o = 0, c = 0;
        for (let l = 0; l <= s; l++) {
          const d = Math.exp(-i + l * Math.log(i) - this._logFactorial(l));
          d > o && (o = d, c = l), a.push({ x: l, y: d });
        }
        return { points: a, range: [0, s], mean: i, std: Math.sqrt(i), mode: c };
      }
      case "binomial": {
        const n = this.jsonAttr("params", { n: 20, p: 0.5 }), i = n.n ?? 20, s = Math.max(1e-15, Math.min(1 - 1e-15, n.p ?? 0.5)), a = [];
        let o = 0, c = 0;
        for (let l = 0; l <= i; l++) {
          const d = this._logComb(i, l) + l * Math.log(s) + (i - l) * Math.log(1 - s), h = Math.exp(d);
          h > o && (o = h, c = l), a.push({ x: l, y: h });
        }
        return { points: a, range: [0, i], mean: i * s, std: Math.sqrt(i * s * (1 - s)), mode: c };
      }
      case "exponential": {
        const i = this.jsonAttr("params", { lambda: 1 }).lambda ?? 1, s = 5 / i, a = [], o = 200;
        for (let c = 0; c <= o; c++) {
          const l = s * c / o;
          a.push({ x: l, y: i * Math.exp(-i * l) });
        }
        return { points: a, range: [0, s], mean: 1 / i, std: 1 / i, mode: 0 };
      }
      default: {
        const n = this.jsonAttr("params", { mean: 0, std: 1 }), i = n.mean ?? 0, s = n.std ?? 1, a = [i - 4 * s, i + 4 * s], o = [], c = 200, l = 1 / (s * Math.sqrt(2 * Math.PI));
        for (let d = 0; d <= c; d++) {
          const h = a[0] + (a[1] - a[0]) * d / c, u = l * Math.exp(-0.5 * ((h - i) / s) ** 2);
          o.push({ x: h, y: u });
        }
        return { points: o, range: a, mean: i, std: s, mode: i };
      }
    }
  }
  _logFactorial(t) {
    let n = 0;
    for (let i = 2; i <= t; i++) n += Math.log(i);
    return n;
  }
  _logComb(t, n) {
    return this._logFactorial(t) - this._logFactorial(n) - this._logFactorial(t - n);
  }
  _linePath(t, n, i) {
    return t.map((s, a) => `${a === 0 ? "M" : "L"}${n(s.x)},${i(s.y)}`).join("");
  }
  _areaPath(t, n, i, s) {
    if (!t.length) return "";
    let a = `M${n(t[0].x)},${s}`;
    for (const o of t) a += `L${n(o.x)},${i(o.y)}`;
    return a += `L${n(t[t.length - 1].x)},${s}Z`, a;
  }
  _fmtNum(t) {
    return Number.isInteger(t) ? String(t) : parseFloat(t.toPrecision(4)).toString();
  }
}
customElements.define("lv-distribution", H0);
const j0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .reg-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; cursor: crosshair; }
  .point { cursor: grab; }
  .point:active { cursor: grabbing; }
  .gridline { stroke: var(--lv-border); stroke-opacity: 0.2; stroke-dasharray: 3,3; }
  .axis text { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-text-dim); }
  .axis line, .axis path { stroke: var(--lv-border); }
  .info-row { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 8px; font-family: var(--lv-font-mono); font-size: 12px; }
  .r2-text { font-weight: 600; }
  .eq-text { color: var(--lv-text-dim); }
`;
class V0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_points", []);
    z(this, "_dragging", null);
    z(this, "_svgEl", null);
    z(this, "_xScale");
    z(this, "_yScale");
    z(this, "_margin", { top: 20, right: 30, bottom: 40, left: 50 });
  }
  static get observedAttributes() {
    return ["data", "degree", "interactive", "show-r2", "show-equation"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(j0), this._points = this.jsonAttr("data", []), this._build();
  }
  handleAttributeChange(t) {
    t === "data" && (this._points = this.jsonAttr("data", [])), this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("svg");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _build() {
    const t = Math.max(1, Math.min(5, parseInt(this.getAttribute("degree") || "1", 10))), n = this.hasAttribute("interactive"), i = this.hasAttribute("show-r2"), s = this.hasAttribute("show-equation"), a = this._points, o = 500, c = 350, l = this._margin, d = o - l.left - l.right, h = c - l.top - l.bottom;
    if (!a.length) {
      this._xScale = nt().domain([0, 10]).range([0, d]), this._yScale = nt().domain([0, 10]).range([h, 0]), this.render(`<div class="reg-container">
        <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="Regression chart">
          <g transform="translate(${l.left},${l.top})">
            <text x="${d / 2}" y="${h / 2}" text-anchor="middle" fill="var(--lv-text-dim)" font-family="var(--lv-font)" font-size="13">Click to add points</text>
          </g>
        </svg>
      </div>`), n && this._attachInteraction();
      return;
    }
    const u = oe(a, (k) => k.x), f = oe(a, (k) => k.y), g = (u[1] - u[0]) * 0.15 || 1, p = (f[1] - f[0]) * 0.15 || 1, m = nt().domain([u[0] - g, u[1] + g]).range([0, d]), b = nt().domain([f[0] - p, f[1] + p]).range([h, 0]);
    this._xScale = m, this._yScale = b;
    let x = "";
    for (const k of m.ticks(8))
      x += `<line class="gridline" x1="${m(k)}" y1="0" x2="${m(k)}" y2="${h}"/>`;
    for (const k of b.ticks(6))
      x += `<line class="gridline" x1="0" y1="${b(k)}" x2="${d}" y2="${b(k)}"/>`;
    const v = Math.min(t, a.length - 1), _ = this._fitPolynomial(a, v);
    if (_.length) {
      const k = [];
      for (let A = 0; A <= 200; A++) {
        const S = m.domain()[0] + (m.domain()[1] - m.domain()[0]) * A / 200, y = this._evalPoly(_, S);
        k.push(`${A === 0 ? "M" : "L"}${m(S)},${b(y)}`);
      }
      x += `<path d="${k.join("")}" fill="none" stroke="var(--lv-accent2)" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    for (let k = 0; k < a.length; k++) {
      const $ = a[k];
      x += `<circle class="point" data-idx="${k}" cx="${m($.x)}" cy="${b($.y)}" r="6" fill="var(--lv-accent)" stroke="#fff" stroke-width="2"/>`;
    }
    for (const k of m.ticks(8))
      x += `<g class="axis" transform="translate(${m(k)},${h})">
        <line y2="5"/><text y="18" text-anchor="middle">${this._fmtNum(k)}</text>
      </g>`;
    x += `<line x1="0" y1="${h}" x2="${d}" y2="${h}" stroke="var(--lv-border)"/>`;
    for (const k of b.ticks(6))
      x += `<g class="axis" transform="translate(0,${b(k)})">
        <line x2="-5"/><text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum(k)}</text>
      </g>`;
    x += `<line x1="0" y1="0" x2="0" y2="${h}" stroke="var(--lv-border)"/>`;
    let w = "";
    if (i || s) {
      if (w = '<div class="info-row">', i && _.length) {
        const k = this._computeR2(a, _), $ = k > 0.8 ? "var(--lv-positive)" : k > 0.5 ? "var(--lv-warning)" : "var(--lv-negative)";
        w += `<span class="r2-text" style="color:${$}">R² = ${k.toFixed(4)}</span>`;
      }
      s && _.length && (w += `<span class="eq-text">${this._formatEquation(_)}</span>`), w += "</div>";
    }
    this.render(`<div class="reg-container">
      <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="Regression fit">
        <g transform="translate(${l.left},${l.top})">${x}</g>
      </svg>
      ${w}
    </div>`), n && this._attachInteraction();
  }
  _attachInteraction() {
    const t = this.root.querySelector("svg");
    if (!t) return;
    this._svgEl = t, t.addEventListener("click", (i) => {
      if (this._dragging !== null) return;
      const s = i;
      if (s.target.classList.contains("point")) return;
      const o = this._svgCoords(s);
      o && (this._points.push(o), this._build());
    }), t.addEventListener("contextmenu", (i) => {
      const s = i, a = s.target;
      if (a.classList.contains("point")) {
        s.preventDefault();
        const o = parseInt(a.dataset.idx || "-1", 10);
        o >= 0 && (this._points.splice(o, 1), this._build());
      }
    }), this.root.querySelectorAll(".point").forEach((i) => {
      i.addEventListener("mousedown", (s) => {
        s.preventDefault(), s.stopPropagation(), this._dragging = parseInt(i.dataset.idx || "-1", 10);
        const a = (c) => {
          if (this._dragging === null) return;
          const l = this._svgCoords(c);
          l && this._dragging >= 0 && this._dragging < this._points.length && (this._points[this._dragging] = l, this._build());
        }, o = () => {
          this._dragging = null, document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", o);
        };
        document.addEventListener("mousemove", a), document.addEventListener("mouseup", o);
      });
    });
  }
  _svgCoords(t) {
    const n = this._svgEl;
    if (!n || !this._xScale || !this._yScale) return null;
    const i = n.getBoundingClientRect(), s = this._margin, a = 500, o = 350, c = i.width / a, l = i.height / o, d = (t.clientX - i.left) / c - s.left, h = (t.clientY - i.top) / l - s.top, u = this._xScale.invert(d), f = this._yScale.invert(h);
    return { x: u, y: f };
  }
  _fitPolynomial(t, n) {
    const i = t.length;
    if (i === 0 || n < 0) return [];
    const s = Math.min(n, i - 1), a = [], o = [];
    for (const h of t) {
      const u = [];
      for (let f = 0; f <= s; f++) u.push(Math.pow(h.x, f));
      a.push(u), o.push(h.y);
    }
    const c = s + 1, l = Array.from({ length: c }, () => Array(c).fill(0)), d = Array(c).fill(0);
    for (let h = 0; h < c; h++) {
      for (let u = 0; u < c; u++)
        for (let f = 0; f < i; f++)
          l[h][u] += a[f][h] * a[f][u];
      for (let u = 0; u < i; u++)
        d[h] += a[u][h] * o[u];
    }
    return this._solveLinear(l, d);
  }
  _solveLinear(t, n) {
    const i = t.length, s = t.map((a, o) => [...a, n[o]]);
    for (let a = 0; a < i; a++) {
      let o = a;
      for (let l = a + 1; l < i; l++)
        Math.abs(s[l][a]) > Math.abs(s[o][a]) && (o = l);
      if ([s[a], s[o]] = [s[o], s[a]], Math.abs(s[a][a]) < 1e-12) continue;
      const c = s[a][a];
      for (let l = a; l <= i; l++) s[a][l] /= c;
      for (let l = 0; l < i; l++) {
        if (l === a) continue;
        const d = s[l][a];
        for (let h = a; h <= i; h++) s[l][h] -= d * s[a][h];
      }
    }
    return s.map((a) => a[i]);
  }
  _evalPoly(t, n) {
    let i = 0;
    for (let s = 0; s < t.length; s++) i += t[s] * Math.pow(n, s);
    return i;
  }
  _computeR2(t, n) {
    const i = t.reduce((o, c) => o + c.y, 0) / t.length;
    let s = 0, a = 0;
    for (const o of t)
      s += (o.y - i) ** 2, a += (o.y - this._evalPoly(n, o.x)) ** 2;
    return s === 0 ? 1 : 1 - a / s;
  }
  _formatEquation(t) {
    if (!t.length) return "";
    const n = [];
    for (let i = t.length - 1; i >= 0; i--) {
      const s = t[i];
      if (Math.abs(s) < 1e-10) continue;
      const a = s >= 0 ? n.length ? " + " : "" : n.length ? " − " : "-", o = Math.abs(s), c = parseFloat(o.toPrecision(3)).toString();
      i === 0 ? n.push(`${a}${c}`) : i === 1 ? n.push(`${a}${c === "1" ? "" : c}x`) : n.push(`${a}${c === "1" ? "" : c}x${this._superscript(i)}`);
    }
    return `y = ${n.join("") || "0"}`;
  }
  _superscript(t) {
    const n = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return String(t).split("").map((i) => n[i] || i).join("");
  }
  _fmtNum(t) {
    return Number.isInteger(t) ? String(t) : parseFloat(t.toPrecision(4)).toString();
  }
}
customElements.define("lv-regression-fit", V0);
const X0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .gd-container { width: 100%; overflow-x: auto; }
  canvas { display: block; margin: 0 auto; border-radius: var(--lv-r-md); }
  .info { font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); text-align: center; margin-top: 6px; min-height: 1.4em; }
  .axis-label { font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); text-align: center; margin-top: 2px; }
`, Ta = {
  quadratic: { fn: (r, e) => r * r + e * e, range: [-3, 3] },
  rosenbrock: { fn: (r, e) => (1 - r) ** 2 + 100 * (e - r * r) ** 2, range: [-2, 2] },
  himmelblau: { fn: (r, e) => (r * r + e - 11) ** 2 + (r + e * e - 7) ** 2, range: [-5, 5] },
  saddle: { fn: (r, e) => r * r - e * e, range: [-3, 3] }
};
class Y0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_animFrame", null);
    z(this, "_timer", null);
  }
  static get observedAttributes() {
    return ["fn", "optimizer", "lr", "start", "show-path", "speed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(X0), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopAnimation();
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, t || this._runOptimization());
  }
  _stopAnimation() {
    this._animFrame && (cancelAnimationFrame(this._animFrame), this._animFrame = null), this._timer && (clearTimeout(this._timer), this._timer = null);
  }
  _build() {
    this._stopAnimation(), this._hasAnimated = !1;
    const t = 400, n = 400;
    this.render(`<div class="gd-container">
      <canvas id="gd-canvas" width="${t * 2}" height="${n * 2}" style="width:${t}px;height:${n}px;"></canvas>
      <div class="info" id="gd-info">&nbsp;</div>
      <div class="axis-label">Click or scroll into view to start optimization</div>
    </div>`), this._drawContour();
  }
  _getFnConfig() {
    const t = this.getAttribute("fn") || "quadratic", n = Ta[t] || Ta.quadratic;
    return { fnName: t, ...n };
  }
  _drawContour() {
    const t = this.root.getElementById("gd-canvas");
    if (!t) return;
    const n = t.getContext("2d");
    if (!n) return;
    const i = 400, s = 400;
    n.clearRect(0, 0, i * 2, s * 2), n.save(), n.scale(2, 2);
    const { fn: a, range: o } = this._getFnConfig(), [c, l] = o, d = 200, h = [];
    let u = 1 / 0, f = -1 / 0;
    for (let _ = 0; _ < d; _++) {
      h[_] = [];
      for (let w = 0; w < d; w++) {
        const k = c + (l - c) * w / (d - 1), $ = c + (l - c) * _ / (d - 1), A = a(k, $);
        h[_][w] = A, A < u && (u = A), A > f && (f = A);
      }
    }
    const g = Math.log(1 + u - u), m = Math.log(1 + f - u) - g || 1, b = i / d, x = s / d;
    for (let _ = 0; _ < d; _++)
      for (let w = 0; w < d; w++) {
        const k = Math.log(1 + h[_][w] - u) / m;
        n.fillStyle = this._contourColor(k), n.fillRect(w * b, _ * x, b + 0.5, x + 0.5);
      }
    const v = 15;
    n.strokeStyle = "rgba(255,255,255,0.15)", n.lineWidth = 0.5;
    for (let _ = 0; _ < v; _++) {
      const w = u + (f - u) * (_ / v);
      this._drawContourLine(n, h, w, d, i, s);
    }
    n.fillStyle = "rgba(255,255,255,0.6)", n.font = "11px sans-serif", n.textAlign = "center", n.fillText(String(c), 20, s - 5), n.fillText(String(l), i - 20, s - 5), n.fillText("x", i / 2, s - 5), n.save(), n.translate(12, s / 2), n.rotate(-Math.PI / 2), n.fillText("y", 0, 0), n.restore(), n.restore();
  }
  _drawContourLine(t, n, i, s, a, o) {
    const c = a / s, l = o / s;
    t.beginPath();
    for (let d = 0; d < s - 1; d++)
      for (let h = 0; h < s - 1; h++) {
        const u = n[d][h], f = n[d][h + 1], g = n[d + 1][h];
        if ((u - i) * (f - i) < 0) {
          const p = (i - u) / (f - u), m = (h + p) * c, b = d * l;
          t.moveTo(m - 0.5, b), t.lineTo(m + 0.5, b);
        }
        if ((u - i) * (g - i) < 0) {
          const p = (i - u) / (g - u), m = h * c, b = (d + p) * l;
          t.moveTo(m, b - 0.5), t.lineTo(m, b + 0.5);
        }
      }
    t.stroke();
  }
  _contourColor(t) {
    const n = Math.max(0, Math.min(1, t));
    let i, s, a;
    if (n < 0.33) {
      const o = n / 0.33;
      i = Math.round(10 + o * 0), s = Math.round(20 + o * 180), a = Math.round(80 + o * 140);
    } else if (n < 0.66) {
      const o = (n - 0.33) / 0.33;
      i = Math.round(10 + o * 230), s = Math.round(200 - o * 10), a = Math.round(220 - o * 180);
    } else {
      const o = (n - 0.66) / 0.34;
      i = Math.round(240), s = Math.round(190 - o * 140), a = Math.round(40 - o * 30);
    }
    return `rgb(${i},${s},${a})`;
  }
  _runOptimization() {
    const t = this.root.getElementById("gd-canvas"), n = this.root.getElementById("gd-info");
    if (!t) return;
    const i = t.getContext("2d");
    if (!i) return;
    const s = 400, a = 400, { fn: o, range: c } = this._getFnConfig(), [l, d] = c, h = parseFloat(this.getAttribute("lr") || "0.05"), u = parseInt(this.getAttribute("speed") || "50", 10), f = this.hasAttribute("show-path"), g = this.getAttribute("optimizer") || "sgd", p = this.jsonAttr("start", [
      l + Math.random() * (d - l) * 0.6 + (d - l) * 0.2,
      l + Math.random() * (d - l) * 0.6 + (d - l) * 0.2
    ]);
    let m = p[0], b = p[1];
    const x = [[m, b]], v = { vx: 0, vy: 0, mx: 0, my: 0, sx: 0, sy: 0, t: 0 }, _ = (y, C) => [
      (y - l) / (d - l) * s,
      (C - l) / (d - l) * a
    ], w = 1e-5, k = (y, C) => {
      const M = (o(y + w, C) - o(y - w, C)) / (2 * w), T = (o(y, C + w) - o(y, C - w)) / (2 * w);
      return [M, T];
    };
    let $ = 0;
    const A = 200, S = () => {
      if ($ >= A) return;
      const [y, C] = k(m, b);
      if (Math.sqrt(y * y + C * C) < 1e-6) return;
      switch (g) {
        case "momentum":
          v.vx = 0.9 * v.vx + h * y, v.vy = 0.9 * v.vy + h * C, m -= v.vx, b -= v.vy;
          break;
        case "adam":
          v.t++, v.mx = 0.9 * v.mx + 0.1 * y, v.my = 0.9 * v.my + 0.1 * C, v.sx = 0.999 * v.sx + 1e-3 * y * y, v.sy = 0.999 * v.sy + 1e-3 * C * C;
          const q = v.mx / (1 - Math.pow(0.9, v.t)), I = v.my / (1 - Math.pow(0.9, v.t)), P = v.sx / (1 - Math.pow(0.999, v.t)), F = v.sy / (1 - Math.pow(0.999, v.t));
          m -= h * q / (Math.sqrt(P) + 1e-8), b -= h * I / (Math.sqrt(F) + 1e-8);
          break;
        default:
          m -= h * y, b -= h * C;
          break;
      }
      if (m = Math.max(l, Math.min(d, m)), b = Math.max(l, Math.min(d, b)), x.push([m, b]), this._drawContour(), i.save(), i.scale(2, 2), f && x.length > 1)
        for (let q = 1; q < x.length; q++) {
          const I = 0.1 + 0.9 * (q / x.length);
          i.strokeStyle = `rgba(0,212,255,${I})`, i.lineWidth = 1.5, i.beginPath();
          const [P, F] = _(x[q - 1][0], x[q - 1][1]), [N, D] = _(x[q][0], x[q][1]);
          i.moveTo(P, F), i.lineTo(N, D), i.stroke();
        }
      const [T, L] = _(m, b);
      i.beginPath(), i.arc(T, L, 6, 0, Math.PI * 2), i.fillStyle = "#00d4ff", i.shadowColor = "#00d4ff", i.shadowBlur = 12, i.fill(), i.shadowBlur = 0, i.strokeStyle = "#fff", i.lineWidth = 1.5, i.stroke(), i.restore();
      const E = o(m, b);
      n && (n.textContent = `Step ${$ + 1} | Loss: ${E.toFixed(4)} | x: ${m.toFixed(3)}, y: ${b.toFixed(3)}`), $++, this._timer = setTimeout(() => {
        this._animFrame = requestAnimationFrame(S);
      }, u);
    };
    this._animFrame = requestAnimationFrame(S);
  }
}
customElements.define("lv-gradient-descent", Y0);
const G0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .db-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; cursor: crosshair; }
  .legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
  .legend-item { display: flex; align-items: center; gap: 4px; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .point { stroke: #fff; stroke-width: 1.5; cursor: default; }
  .point:hover { stroke-width: 2.5; }
  .axis-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .tick text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .tick line { stroke: var(--lv-text-dim); opacity: 0.3; }
  .domain { stroke: var(--lv-text-dim); opacity: 0.3; }
`, Jn = ["#3b82f6", "#ef4444"];
class W0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_nextClass", 0);
  }
  static get observedAttributes() {
    return ["data", "model", "resolution", "interactive", "c"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(G0), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("svg");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _build() {
    const t = this.jsonAttr("data", [
      { x: 1, y: 2, class: 0 },
      { x: 2, y: 3, class: 0 },
      { x: 3, y: 3, class: 0 },
      { x: 1.5, y: 1, class: 0 },
      { x: 2.5, y: 2, class: 0 },
      { x: 5, y: 5, class: 1 },
      { x: 6, y: 5, class: 1 },
      { x: 5, y: 6, class: 1 },
      { x: 6, y: 6, class: 1 },
      { x: 5.5, y: 4.5, class: 1 }
    ]), n = this.getAttribute("model") || "linear", i = parseInt(this.getAttribute("resolution") || "50", 10), s = this.hasAttribute("interactive"), a = parseFloat(this.getAttribute("c") || "1.0"), o = 500, c = 400, l = { top: 20, right: 20, bottom: 40, left: 45 }, d = o - l.left - l.right, h = c - l.top - l.bottom;
    if (!t.length) {
      this.render('<div class="db-container"></div>');
      return;
    }
    const u = oe(t, (L) => L.x), f = oe(t, (L) => L.y), g = (u[1] - u[0]) * 0.2 || 1, p = (f[1] - f[0]) * 0.2 || 1, m = u[0] - g, b = u[1] + g, x = f[0] - p, v = f[1] + p, _ = nt().domain([m, b]).range([0, d]), w = nt().domain([v, x]).range([0, h]), k = this._fitModel(t, n, a);
    let $ = "";
    const A = d / i, S = h / i;
    for (let L = 0; L < i; L++)
      for (let E = 0; E < i; E++) {
        const q = m + (b - m) * (E + 0.5) / i, I = v - (v - x) * (L + 0.5) / i, P = k(q, I), F = Jn[P >= 0.5 ? 1 : 0];
        $ += `<rect x="${l.left + E * A}" y="${l.top + L * S}" width="${A + 0.5}" height="${S + 0.5}" fill="${F}" opacity="0.15"/>`;
      }
    let y = "";
    t.forEach((L) => {
      const E = l.left + _(L.x), q = l.top + w(L.y), I = Jn[L.class];
      y += `<circle class="point" cx="${E}" cy="${q}" r="5" fill="${I}"/>`;
    });
    const C = _.ticks(6), M = w.ticks(6);
    let T = "";
    if (C.forEach((L) => {
      const E = l.left + _(L);
      T += `<g class="tick"><line x1="${E}" y1="${l.top + h}" x2="${E}" y2="${l.top + h + 5}"/><text x="${E}" y="${l.top + h + 18}" text-anchor="middle">${L}</text></g>`;
    }), M.forEach((L) => {
      const E = l.top + w(L);
      T += `<g class="tick"><line x1="${l.left - 5}" y1="${E}" x2="${l.left}" y2="${E}"/><text x="${l.left - 8}" y="${E + 4}" text-anchor="end">${L}</text></g>`;
    }), T += `<line class="domain" x1="${l.left}" y1="${l.top}" x2="${l.left}" y2="${l.top + h}"/>`, T += `<line class="domain" x1="${l.left}" y1="${l.top + h}" x2="${l.left + d}" y2="${l.top + h}"/>`, this.render(`<div class="db-container">
      <svg id="db-svg" width="${o}" height="${c}" viewBox="0 0 ${o} ${c}">
        ${$}
        ${T}
        ${y}
      </svg>
      <div class="legend">
        <div class="legend-item"><div class="legend-dot" style="background:${Jn[0]}"></div>Class 0</div>
        <div class="legend-item"><div class="legend-dot" style="background:${Jn[1]}"></div>Class 1</div>
        ${s ? '<div class="legend-item" style="opacity:0.7">(Click to add points)</div>' : ""}
      </div>
    </div>`), s) {
      const L = this.root.getElementById("db-svg");
      L && L.addEventListener("click", (E) => {
        const q = E, I = L.getBoundingClientRect(), P = (q.clientX - I.left) * (o / I.width) - l.left, F = (q.clientY - I.top) * (c / I.height) - l.top, N = _.invert(P), D = w.invert(F);
        P < 0 || P > d || F < 0 || F > h || (t.push({ x: N, y: D, class: this._nextClass }), this._nextClass = 1 - this._nextClass, this.setAttribute("data", JSON.stringify(t)));
      });
    }
  }
  _fitModel(t, n, i) {
    if (n === "rbf")
      return this._fitRbf(t, i);
    const s = n === "quadratic" ? (g, p) => [1, g, p, g * g, p * p, g * p] : (g, p) => [1, g, p], a = s(0, 0).length, o = new Float64Array(a), c = Bs(t, (g) => g.x) || 0, l = Bs(t, (g) => g.y) || 0, d = Math.max(Os(t, (g) => g.x) || 1, 0.01), h = Math.max(Os(t, (g) => g.y) || 1, 0.01), u = 0.1, f = 500;
    for (let g = 0; g < f; g++) {
      const p = new Float64Array(a);
      for (const m of t) {
        const b = (m.x - c) / d, x = (m.y - l) / h, v = s(b, x);
        let _ = 0;
        for (let $ = 0; $ < a; $++) _ += o[$] * v[$];
        const k = 1 / (1 + Math.exp(-_)) - m.class;
        for (let $ = 0; $ < a; $++) p[$] += k * v[$];
      }
      for (let m = 0; m < a; m++)
        o[m] -= u * p[m] / t.length;
    }
    return (g, p) => {
      const m = (g - c) / d, b = (p - l) / h, x = s(m, b);
      let v = 0;
      for (let _ = 0; _ < a; _++) v += o[_] * x[_];
      return 1 / (1 + Math.exp(-v));
    };
  }
  _fitRbf(t, n) {
    const i = n;
    return (s, a) => {
      let o = 0, c = 0;
      for (const d of t) {
        const h = (s - d.x) ** 2 + (a - d.y) ** 2, u = Math.exp(-i * h);
        d.class === 0 ? o += u : c += u;
      }
      const l = o + c;
      return l < 1e-10 ? 0.5 : c / l;
    };
  }
}
customElements.define("lv-decision-boundary", W0);
const U0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .attn-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .token-text { font-family: var(--lv-font-mono); font-size: 13px; fill: var(--lv-text, #e0e0e0); cursor: pointer; }
  .token-text:hover { fill: #fff; }
  .attn-line { transition: stroke-opacity 0.15s ease; }
  .head-bar { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px; }
  .head-btn {
    font-family: var(--lv-font); font-size: 11px;
    padding: 3px 10px; border-radius: var(--lv-r-sm, 4px);
    border: 1px solid var(--lv-border, #333);
    background: transparent; color: var(--lv-text-dim, #aaa);
    cursor: pointer; transition: all 0.15s;
  }
  .head-btn:hover { border-color: var(--lv-accent, #00d4ff); color: var(--lv-accent, #00d4ff); }
  .head-btn.active {
    background: var(--lv-accent, #00d4ff); color: #000;
    border-color: var(--lv-accent, #00d4ff); font-weight: 600;
  }
`;
class K0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_activeHead", 0);
  }
  static get observedAttributes() {
    return ["tokens", "target-tokens", "weights", "heads", "color"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(U0), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("svg");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.5s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _getWeights() {
    const t = this.jsonAttr("heads", null);
    if (t && t.length > 0) {
      const n = Math.min(this._activeHead, t.length - 1);
      return t[n];
    }
    return this.jsonAttr("weights", null);
  }
  _build() {
    var M;
    const t = this.jsonAttr("tokens", []), n = this.jsonAttr("target-tokens", t), i = this._getWeights(), s = this.jsonAttr("heads", null), a = this.getAttribute("color") || "#00d4ff";
    if (!t.length || !i) {
      this.render('<div class="attn-container"><em style="color:var(--lv-text-dim)">No attention data</em></div>');
      return;
    }
    const o = t.length, c = n.length, l = 24, d = 10, h = 120, u = 200, f = h * 2 + u, g = Math.max(o, c) * l + d * 2, p = h, m = h + u, b = this.isRtl, x = b ? f - (p - 8) : p - 8, v = b ? f - (m + 8) : m + 8, _ = b ? "start" : "end", w = b ? "end" : "start", k = b ? f - p : p, $ = b ? f - m : m;
    let A = "";
    s && s.length > 1 && (A = `<div class="head-bar">${s.map(
      (L, E) => `<button class="head-btn${E === this._activeHead ? " active" : ""}" data-head="${E}">Head ${E + 1}</button>`
    ).join("")}</div>`);
    let S = "";
    for (let T = 0; T < o; T++)
      for (let L = 0; L < c; L++) {
        const E = ((M = i[T]) == null ? void 0 : M[L]) ?? 0;
        if (E < 0.01) continue;
        const q = d + T * l + l / 2, I = d + L * l + l / 2, P = k + ($ - k) * 0.35, F = k + ($ - k) * 0.65;
        S += `<path class="attn-line" data-src="${T}" data-tgt="${L}" d="M${k},${q} C${P},${q} ${F},${I} ${$},${I}" fill="none" stroke="${a}" stroke-width="${Math.max(0.5, E * 4)}" stroke-opacity="${E}"/>`;
      }
    let y = "";
    t.forEach((T, L) => {
      const E = d + L * l + l / 2 + 4;
      y += `<text class="token-text src-token" data-idx="${L}" x="${x}" y="${E}" text-anchor="${_}">${this._esc(T)}</text>`;
    });
    let C = "";
    n.forEach((T, L) => {
      const E = d + L * l + l / 2 + 4;
      C += `<text class="token-text tgt-token" data-idx="${L}" x="${v}" y="${E}" text-anchor="${w}">${this._esc(T)}</text>`;
    }), this.render(`<div class="attn-container">
      ${A}
      <svg id="attn-svg" width="${f}" height="${g}" viewBox="0 0 ${f} ${g}">
        <g id="lines-group">${S}</g>
        ${y}
        ${C}
      </svg>
    </div>`), this._bindEvents();
  }
  _bindEvents() {
    const t = this.root.getElementById("attn-svg");
    t && (t.querySelectorAll(".src-token").forEach((n) => {
      n.addEventListener("mouseenter", () => {
        const i = n.getAttribute("data-idx");
        t.querySelectorAll(".attn-line").forEach((s) => {
          const a = s;
          a.dataset.src === i ? a.style.strokeOpacity = "" : a.style.strokeOpacity = "0.05";
        });
      }), n.addEventListener("mouseleave", () => {
        t.querySelectorAll(".attn-line").forEach((i) => {
          i.style.strokeOpacity = "";
        });
      });
    }), t.querySelectorAll(".tgt-token").forEach((n) => {
      n.addEventListener("mouseenter", () => {
        const i = n.getAttribute("data-idx");
        t.querySelectorAll(".attn-line").forEach((s) => {
          const a = s;
          a.dataset.tgt === i ? a.style.strokeOpacity = "" : a.style.strokeOpacity = "0.05";
        });
      }), n.addEventListener("mouseleave", () => {
        t.querySelectorAll(".attn-line").forEach((i) => {
          i.style.strokeOpacity = "";
        });
      });
    }), this.root.querySelectorAll(".head-btn").forEach((n) => {
      n.addEventListener("click", () => {
        const i = parseInt(n.dataset.head || "0", 10);
        this._activeHead = i, this._build();
      });
    }));
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-attention-map", K0);
const Z0 = `
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
`, dt = 120, Pt = 90, ai = 60, oi = 40, La = 10, Pa = 2, za = 8, sn = 60;
function li(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class J0 extends R {
  constructor() {
    super(...arguments);
    z(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Z0), this._readChildren(), this._renderSvg();
  }
  /** Read <lv-flow-step> children and extract attributes */
  _readChildren() {
    this._steps = [], this.querySelectorAll("lv-flow-step").forEach((n) => {
      this._steps.push({
        icon: n.getAttribute("icon") || "",
        label: n.getAttribute("label") || "",
        sub: n.getAttribute("sub") || "",
        color: n.getAttribute("color") || "var(--lv-accent, #6366f1)",
        active: n.hasAttribute("active")
      });
    });
  }
  /** Build the full SVG and inject into shadow DOM */
  _renderSvg() {
    const t = this._steps;
    if (t.length === 0) return;
    const i = (this.getAttribute("direction") || "horizontal") === "horizontal", s = this.hasAttribute("cyclic"), a = this.isRtl, o = 24, c = s ? sn + 40 : 0;
    let l, d;
    i ? (l = o * 2 + t.length * dt + (t.length - 1) * ai, d = o * 2 + Pt + c) : (l = o * 2 + dt + c, d = o * 2 + t.length * Pt + (t.length - 1) * oi);
    const h = [];
    for (let v = 0; v < t.length; v++)
      if (i) {
        let _ = o + v * (dt + ai);
        a && (_ = l - o - dt - v * (dt + ai)), h.push({ x: _, y: o });
      } else
        h.push({ x: o, y: o + v * (Pt + oi) });
    const u = "arrowhead", f = za, g = za, p = `
      <defs>
        <marker id="${u}" markerWidth="${f}" markerHeight="${g}"
                refX="${f}" refY="${g / 2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${f},${g / 2} L0,${g} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;
    let m = "";
    for (let v = 0; v < t.length; v++) {
      const _ = t[v], w = h[v], k = _.active ? _.color : "var(--lv-border, #333)", $ = _.active ? ' filter="url(#glow)"' : "";
      m += `
        <g class="step-group" style="transition-delay: ${v * 150}ms">
          <rect x="${w.x}" y="${w.y}" width="${dt}" height="${Pt}"
                rx="${La}" ry="${La}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${k}" stroke-width="${_.active ? 2.5 : 1.5}"
                ${$} />
          <text x="${w.x + dt / 2}" y="${w.y + 30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${li(_.icon)}
          </text>
          <text x="${w.x + dt / 2}" y="${w.y + 54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${li(_.label)}
          </text>
          <text x="${w.x + dt / 2}" y="${w.y + 70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${li(_.sub)}
          </text>
        </g>`;
    }
    let b = "";
    for (let v = 0; v < t.length - 1; v++) {
      const _ = h[v], w = h[v + 1], k = t.length * 150 + v * 120;
      let $;
      if (i) {
        const S = a ? _.x : _.x + dt, y = a ? w.x + dt : w.x, C = _.y + Pt / 2, T = Math.abs(y - S) * 0.35, L = y > S ? 1 : -1;
        $ = `M${S},${C} C${S + L * T},${C} ${y - L * T},${C} ${y},${C}`;
      } else {
        const S = _.x + dt / 2, y = _.y + Pt, C = w.y, M = (C - y) * 0.4;
        $ = `M${S},${y} C${S},${y + M} ${S},${C - M} ${S},${C}`;
      }
      const A = i ? Math.abs(h[v + 1].x - h[v].x) + 20 : oi + Pt;
      b += `
        <path class="arrow-path" d="${$}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Pa}"
              marker-end="url(#${u})"
              stroke-dasharray="${A}"
              stroke-dashoffset="${A}"
              style="transition-delay: ${k}ms" />`;
    }
    if (s && t.length > 1) {
      const v = h[0], _ = h[t.length - 1], w = t.length * 150 + (t.length - 1) * 120;
      let k, $;
      if (i) {
        const A = _.x + dt / 2, S = v.x + dt / 2, y = _.y + Pt, C = v.y + Pt, M = Math.max(y, C) + sn;
        k = `M${A},${y} C${A},${M} ${S},${M} ${S},${C}`, $ = Math.abs(A - S) + sn * 2;
      } else {
        const A = _.x + dt, S = _.y + Pt / 2, y = v.y + Pt / 2, C = A + sn;
        k = `M${A},${S} C${C},${S} ${C},${y} ${A},${y}`, $ = Math.abs(S - y) + sn * 2;
      }
      b += `
        <path class="arrow-path" d="${k}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Pa}"
              marker-end="url(#${u})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${w}ms" />`;
    }
    const x = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${d}"
           viewBox="0 0 ${l} ${d}"
           role="img" aria-label="Process flow">
        ${p}
        ${b}
        ${m}
      </svg>`;
    this.render(x);
  }
  animateIn(t) {
    t && (this.root.querySelectorAll(".step-group").forEach((n) => {
      n.style.transition = "none", n.style.opacity = "1", n.style.transform = "translateY(0)";
    }), this.root.querySelectorAll(".arrow-path").forEach((n) => {
      n.style.transition = "none", n.style.strokeDashoffset = "0";
    })), this.classList.add("lv-entered");
  }
}
class Q0 extends HTMLElement {
}
customElements.define("lv-flow", J0);
customElements.define("lv-flow-step", Q0);
const tm = `
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
function Ia(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class em extends R {
  constructor() {
    super(...arguments);
    z(this, "_items", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(tm), this._readChildren(), this._renderTimeline();
  }
  _readChildren() {
    this._items = [], this.querySelectorAll("lv-timeline-item").forEach((n) => {
      this._items.push({
        date: n.getAttribute("date") || "",
        title: n.getAttribute("title") || "",
        color: n.getAttribute("color") || "var(--lv-accent, #6366f1)",
        body: n.innerHTML.trim()
      });
    });
  }
  _renderTimeline() {
    if (this._items.length === 0) return;
    let t = "";
    for (let n = 0; n < this._items.length; n++) {
      const i = this._items[n];
      t += `
        <div class="tl-item" role="listitem" style="animation-delay: ${n * 100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date ? `<div class="tl-date">${Ia(i.date)}</div>` : ""}
            ${i.title ? `<div class="tl-title">${Ia(i.title)}</div>` : ""}
            ${i.body ? `<div class="tl-body">${i.body}</div>` : ""}
          </div>
        </div>`;
    }
    this.render(`<div class="timeline" role="list">${t}</div>`);
  }
  animateIn(t) {
    t && this.root.querySelectorAll(".tl-item").forEach((n) => {
      n.style.animation = "none", n.style.opacity = "1", n.style.transform = "translateX(0)";
    }), this.classList.add("lv-entered");
  }
}
class nm extends HTMLElement {
}
customElements.define("lv-timeline", em);
customElements.define("lv-timeline-item", nm);
function Gt(r) {
  if (r === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r;
}
function Uo(r, e) {
  r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r.__proto__ = e;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var $t = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, We = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, fs, st, W, Tt = 1e8, V = 1 / Tt, qi = Math.PI * 2, rm = qi / 4, im = 0, Ko = Math.sqrt, sm = Math.cos, am = Math.sin, rt = function(e) {
  return typeof e == "string";
}, J = function(e) {
  return typeof e == "function";
}, Zt = function(e) {
  return typeof e == "number";
}, ps = function(e) {
  return typeof e > "u";
}, Ht = function(e) {
  return typeof e == "object";
}, pt = function(e) {
  return e !== !1;
}, gs = function() {
  return typeof window < "u";
}, Qn = function(e) {
  return J(e) || rt(e);
}, Zo = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, lt = Array.isArray, om = /random\([^)]+\)/g, lm = /,\s*/g, Fa = /(?:-?\.?\d|\.)+/gi, Jo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, qe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ci = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Qo = /[+-]=-?[.\d]+/, cm = /[^,'"\[\]\s]+/gi, dm = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, K, Nt, Ni, ms, St = {}, Er = {}, tl, el = function(e) {
  return (Er = Ue(e, St)) && vt;
}, _s = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Cn = function(e, t) {
  return !t && console.warn(e);
}, nl = function(e, t) {
  return e && (St[e] = t) && Er && (Er[e] = t) || St;
}, Mn = function() {
  return 0;
}, hm = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, lr = {
  suppressEvents: !0,
  kill: !1
}, um = {
  suppressEvents: !0
}, vs = {}, se = [], Ri = {}, rl, xt = {}, di = {}, qa = 30, cr = [], bs = "", xs = function(e) {
  var t = e[0], n, i;
  if (Ht(t) || J(t) || (e = [e]), !(n = (t._gsap || {}).harness)) {
    for (i = cr.length; i-- && !cr[i].targetTest(t); )
      ;
    n = cr[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new Cl(e[i], n))) || e.splice(i, 1);
  return e;
}, ke = function(e) {
  return e._gsap || xs(Lt(e))[0]._gsap;
}, il = function(e, t, n) {
  return (n = e[t]) && J(n) ? e[t]() : ps(n) && e.getAttribute && e.getAttribute(t) || n;
}, gt = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, tt = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, U = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, Oe = function(e, t) {
  var n = t.charAt(0), i = parseFloat(t.substr(2));
  return e = parseFloat(e), n === "+" ? e + i : n === "-" ? e - i : n === "*" ? e * i : e / i;
}, fm = function(e, t) {
  for (var n = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < n; )
    ;
  return i < n;
}, Tr = function() {
  var e = se.length, t = se.slice(0), n, i;
  for (Ri = {}, se.length = 0, n = 0; n < e; n++)
    i = t[n], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, ys = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, sl = function(e, t, n, i) {
  se.length && !st && Tr(), e.render(t, n, !!(st && t < 0 && ys(e))), se.length && !st && Tr();
}, al = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(cm).length < 2 ? t : rt(e) ? e.trim() : e;
}, ol = function(e) {
  return e;
}, Ct = function(e, t) {
  for (var n in t)
    n in e || (e[n] = t[n]);
  return e;
}, pm = function(e) {
  return function(t, n) {
    for (var i in n)
      i in t || i === "duration" && e || i === "ease" || (t[i] = n[i]);
  };
}, Ue = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}, Na = function r(e, t) {
  for (var n in t)
    n !== "__proto__" && n !== "constructor" && n !== "prototype" && (e[n] = Ht(t[n]) ? r(e[n] || (e[n] = {}), t[n]) : t[n]);
  return e;
}, Lr = function(e, t) {
  var n = {}, i;
  for (i in e)
    i in t || (n[i] = e[i]);
  return n;
}, _n = function(e) {
  var t = e.parent || K, n = e.keyframes ? pm(lt(e.keyframes)) : Ct;
  if (pt(e.inherit))
    for (; t; )
      n(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, gm = function(e, t) {
  for (var n = e.length, i = n === t.length; i && n-- && e[n] === t[n]; )
    ;
  return n < 0;
}, ll = function(e, t, n, i, s) {
  var a = e[i], o;
  if (s)
    for (o = t[s]; a && a[s] > o; )
      a = a._prev;
  return a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = a, t.parent = t._dp = e, t;
}, Or = function(e, t, n, i) {
  n === void 0 && (n = "_first"), i === void 0 && (i = "_last");
  var s = t._prev, a = t._next;
  s ? s._next = a : e[n] === t && (e[n] = a), a ? a._prev = s : e[i] === t && (e[i] = s), t._next = t._prev = t.parent = null;
}, le = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, $e = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var n = e; n; )
      n._dirty = 1, n = n.parent;
  return e;
}, mm = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, Di = function(e, t, n, i) {
  return e._startAt && (st ? e._startAt.revert(lr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, i));
}, _m = function r(e) {
  return !e || e._ts && r(e.parent);
}, Ra = function(e) {
  return e._repeat ? Ke(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Ke = function(e, t) {
  var n = Math.floor(e = U(e / t));
  return e && n === e ? n - 1 : n;
}, Pr = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Br = function(e) {
  return e._end = U(e._start + (e._tDur / Math.abs(e._ts || e._rts || V) || 0));
}, Hr = function(e, t) {
  var n = e._dp;
  return n && n.smoothChildTiming && e._ts && (e._start = U(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Br(e), n._dirty || $e(n, e)), e;
}, cl = function(e, t) {
  var n;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = Pr(e.rawTime(), t), (!t._dur || Nn(0, t.totalDuration(), n) - t._tTime > V) && t.render(n, !0)), $e(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (n = e; n._dp; )
        n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
    e._zTime = -V;
  }
}, Rt = function(e, t, n, i) {
  return t.parent && le(t), t._start = U((Zt(n) ? n : n || e !== K ? Et(e, n, t) : e._time) + t._delay), t._end = U(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), ll(e, t, "_first", "_last", e._sort ? "_start" : 0), Oi(t) || (e._recent = t), i || cl(e, t), e._ts < 0 && Hr(e, e._tTime), e;
}, dl = function(e, t) {
  return (St.ScrollTrigger || _s("scrollTrigger", t)) && St.ScrollTrigger.create(t, e);
}, hl = function(e, t, n, i, s) {
  if (ks(e, t, s), !e._initted)
    return 1;
  if (!n && e._pt && !st && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && rl !== yt.frame)
    return se.push(e), e._lazy = [s, i], 1;
}, vm = function r(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || r(t));
}, Oi = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, bm = function(e, t, n, i) {
  var s = e.ratio, a = t < 0 || !t && (!e._start && vm(e) && !(!e._initted && Oi(e)) || (e._ts < 0 || e._dp._ts < 0) && !Oi(e)) ? 0 : 1, o = e._rDelay, c = 0, l, d, h;
  if (o && e._repeat && (c = Nn(0, e._tDur, t), d = Ke(c, o), e._yoyo && d & 1 && (a = 1 - a), d !== Ke(e._tTime, o) && (s = 1 - a, e.vars.repeatRefresh && e._initted && e.invalidate())), a !== s || st || i || e._zTime === V || !t && e._zTime) {
    if (!e._initted && hl(e, t, i, n, c))
      return;
    for (h = e._zTime, e._zTime = t || (n ? V : 0), n || (n = t && !h), e.ratio = a, e._from && (a = 1 - a), e._time = 0, e._tTime = c, l = e._pt; l; )
      l.r(a, l.d), l = l._next;
    t < 0 && Di(e, t, n, !0), e._onUpdate && !n && wt(e, "onUpdate"), c && e._repeat && !n && e.parent && wt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === a && (a && le(e, 1), !n && !st && (wt(e, a ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, xm = function(e, t, n) {
  var i;
  if (n > t)
    for (i = e._first; i && i._start <= n; ) {
      if (i.data === "isPause" && i._start > t)
        return i;
      i = i._next;
    }
  else
    for (i = e._last; i && i._start >= n; ) {
      if (i.data === "isPause" && i._start < t)
        return i;
      i = i._prev;
    }
}, Ze = function(e, t, n, i) {
  var s = e._repeat, a = U(t) || 0, o = e._tTime / e._tDur;
  return o && !i && (e._time *= a / e._dur), e._dur = a, e._tDur = s ? s < 0 ? 1e10 : U(a * (s + 1) + e._rDelay * s) : a, o > 0 && !i && Hr(e, e._tTime = e._tDur * o), e.parent && Br(e), n || $e(e.parent, e), e;
}, Da = function(e) {
  return e instanceof ht ? $e(e) : Ze(e, e._dur);
}, ym = {
  _start: 0,
  endTime: Mn,
  totalDuration: Mn
}, Et = function r(e, t, n) {
  var i = e.labels, s = e._recent || ym, a = e.duration() >= Tt ? s.endTime(!1) : e._dur, o, c, l;
  return rt(t) && (isNaN(t) || t in i) ? (c = t.charAt(0), l = t.substr(-1) === "%", o = t.indexOf("="), c === "<" || c === ">" ? (o >= 0 && (t = t.replace(/=/, "")), (c === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (l ? (o < 0 ? s : n).totalDuration() / 100 : 1)) : o < 0 ? (t in i || (i[t] = a), i[t]) : (c = parseFloat(t.charAt(o - 1) + t.substr(o + 1)), l && n && (c = c / 100 * (lt(n) ? n[0] : n).totalDuration()), o > 1 ? r(e, t.substr(0, o - 1), n) + c : a + c)) : t == null ? a : +t;
}, vn = function(e, t, n) {
  var i = Zt(t[1]), s = (i ? 2 : 1) + (e < 2 ? 0 : 1), a = t[s], o, c;
  if (i && (a.duration = t[1]), a.parent = n, e) {
    for (o = a, c = n; c && !("immediateRender" in o); )
      o = c.vars.defaults || {}, c = pt(c.vars.inherit) && c.parent;
    a.immediateRender = pt(o.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[s - 1];
  }
  return new et(t[0], a, t[s + 1]);
}, he = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Nn = function(e, t, n) {
  return n < e ? e : n > t ? t : n;
}, ot = function(e, t) {
  return !rt(e) || !(t = dm.exec(e)) ? "" : t[1];
}, wm = function(e, t, n) {
  return he(n, function(i) {
    return Nn(e, t, i);
  });
}, Bi = [].slice, ul = function(e, t) {
  return e && Ht(e) && "length" in e && (!t && !e.length || e.length - 1 in e && Ht(e[0])) && !e.nodeType && e !== Nt;
}, km = function(e, t, n) {
  return n === void 0 && (n = []), e.forEach(function(i) {
    var s;
    return rt(i) && !t || ul(i, 1) ? (s = n).push.apply(s, Lt(i)) : n.push(i);
  }) || n;
}, Lt = function(e, t, n) {
  return W && !t && W.selector ? W.selector(e) : rt(e) && !n && (Ni || !Je()) ? Bi.call((t || ms).querySelectorAll(e), 0) : lt(e) ? km(e, n) : ul(e) ? Bi.call(e, 0) : e ? [e] : [];
}, Hi = function(e) {
  return e = Lt(e)[0] || Cn("Invalid scope") || {}, function(t) {
    var n = e.current || e.nativeElement || e;
    return Lt(t, n.querySelectorAll ? n : n === e ? Cn("Invalid scope") || ms.createElement("div") : e);
  };
}, fl = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, pl = function(e) {
  if (J(e))
    return e;
  var t = Ht(e) ? e : {
    each: e
  }, n = Ae(t.ease), i = t.from || 0, s = parseFloat(t.base) || 0, a = {}, o = i > 0 && i < 1, c = isNaN(i) || o, l = t.axis, d = i, h = i;
  return rt(i) ? d = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && c && (d = i[0], h = i[1]), function(u, f, g) {
    var p = (g || t).length, m = a[p], b, x, v, _, w, k, $, A, S;
    if (!m) {
      if (S = t.grid === "auto" ? 0 : (t.grid || [1, Tt])[1], !S) {
        for ($ = -Tt; $ < ($ = g[S++].getBoundingClientRect().left) && S < p; )
          ;
        S < p && S--;
      }
      for (m = a[p] = [], b = c ? Math.min(S, p) * d - 0.5 : i % S, x = S === Tt ? 0 : c ? p * h / S - 0.5 : i / S | 0, $ = 0, A = Tt, k = 0; k < p; k++)
        v = k % S - b, _ = x - (k / S | 0), m[k] = w = l ? Math.abs(l === "y" ? _ : v) : Ko(v * v + _ * _), w > $ && ($ = w), w < A && (A = w);
      i === "random" && fl(m), m.max = $ - A, m.min = A, m.v = p = (parseFloat(t.amount) || parseFloat(t.each) * (S > p ? p - 1 : l ? l === "y" ? p / S : S : Math.max(S, p / S)) || 0) * (i === "edges" ? -1 : 1), m.b = p < 0 ? s - p : s, m.u = ot(t.amount || t.each) || 0, n = n && p < 0 ? $l(n) : n;
    }
    return p = (m[u] - m.min) / m.max || 0, U(m.b + (n ? n(p) : p) * m.v) + m.u;
  };
}, ji = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(n) {
    var i = U(Math.round(parseFloat(n) / e) * e * t);
    return (i - i % 1) / t + (Zt(n) ? 0 : ot(n));
  };
}, gl = function(e, t) {
  var n = lt(e), i, s;
  return !n && Ht(e) && (i = n = e.radius || Tt, e.values ? (e = Lt(e.values), (s = !Zt(e[0])) && (i *= i)) : e = ji(e.increment)), he(t, n ? J(e) ? function(a) {
    return s = e(a), Math.abs(s - a) <= i ? s : a;
  } : function(a) {
    for (var o = parseFloat(s ? a.x : a), c = parseFloat(s ? a.y : 0), l = Tt, d = 0, h = e.length, u, f; h--; )
      s ? (u = e[h].x - o, f = e[h].y - c, u = u * u + f * f) : u = Math.abs(e[h] - o), u < l && (l = u, d = h);
    return d = !i || l <= i ? e[d] : a, s || d === a || Zt(a) ? d : d + ot(a);
  } : ji(e));
}, ml = function(e, t, n, i) {
  return he(lt(e) ? !t : n === !0 ? !!(n = 0) : !i, function() {
    return lt(e) ? e[~~(Math.random() * e.length)] : (n = n || 1e-5) && (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * 0.99)) / n) * n * i) / i;
  });
}, $m = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(i) {
    return t.reduce(function(s, a) {
      return a(s);
    }, i);
  };
}, Am = function(e, t) {
  return function(n) {
    return e(parseFloat(n)) + (t || ot(n));
  };
}, Sm = function(e, t, n) {
  return vl(e, t, 0, 1, n);
}, _l = function(e, t, n) {
  return he(n, function(i) {
    return e[~~t(i)];
  });
}, Cm = function r(e, t, n) {
  var i = t - e;
  return lt(e) ? _l(e, r(0, e.length), t) : he(n, function(s) {
    return (i + (s - e) % i) % i + e;
  });
}, Mm = function r(e, t, n) {
  var i = t - e, s = i * 2;
  return lt(e) ? _l(e, r(0, e.length - 1), t) : he(n, function(a) {
    return a = (s + (a - e) % s) % s || 0, e + (a > i ? s - a : a);
  });
}, En = function(e) {
  return e.replace(om, function(t) {
    var n = t.indexOf("[") + 1, i = t.substring(n || 7, n ? t.indexOf("]") : t.length - 1).split(lm);
    return ml(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5);
  });
}, vl = function(e, t, n, i, s) {
  var a = t - e, o = i - n;
  return he(s, function(c) {
    return n + ((c - e) / a * o || 0);
  });
}, Em = function r(e, t, n, i) {
  var s = isNaN(e + t) ? 0 : function(f) {
    return (1 - f) * e + f * t;
  };
  if (!s) {
    var a = rt(e), o = {}, c, l, d, h, u;
    if (n === !0 && (i = 1) && (n = null), a)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (lt(e) && !lt(t)) {
      for (d = [], h = e.length, u = h - 2, l = 1; l < h; l++)
        d.push(r(e[l - 1], e[l]));
      h--, s = function(g) {
        g *= h;
        var p = Math.min(u, ~~g);
        return d[p](g - p);
      }, n = t;
    } else i || (e = Ue(lt(e) ? [] : {}, e));
    if (!d) {
      for (c in t)
        ws.call(o, e, c, "get", t[c]);
      s = function(g) {
        return Ss(g, o) || (a ? e.p : e);
      };
    }
  }
  return he(n, s);
}, Oa = function(e, t, n) {
  var i = e.labels, s = Tt, a, o, c;
  for (a in i)
    o = i[a] - t, o < 0 == !!n && o && s > (o = Math.abs(o)) && (c = a, s = o);
  return c;
}, wt = function(e, t, n) {
  var i = e.vars, s = i[t], a = W, o = e._ctx, c, l, d;
  if (s)
    return c = i[t + "Params"], l = i.callbackScope || e, n && se.length && Tr(), o && (W = o), d = c ? s.apply(l, c) : s.call(l), W = a, d;
}, fn = function(e) {
  return le(e), e.scrollTrigger && e.scrollTrigger.kill(!!st), e.progress() < 1 && wt(e, "onInterrupt"), e;
}, Ne, bl = [], xl = function(e) {
  if (e)
    if (e = !e.name && e.default || e, gs() || e.headless) {
      var t = e.name, n = J(e), i = t && !n && e.init ? function() {
        this._props = [];
      } : e, s = {
        init: Mn,
        render: Ss,
        add: ws,
        kill: Xm,
        modifier: Vm,
        rawVars: 0
      }, a = {
        targetTest: 0,
        get: 0,
        getSetter: As,
        aliases: {},
        register: 0
      };
      if (Je(), e !== i) {
        if (xt[t])
          return;
        Ct(i, Ct(Lr(e, s), a)), Ue(i.prototype, Ue(s, Lr(e, a))), xt[i.prop = t] = i, e.targetTest && (cr.push(i), vs[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      nl(t, i), e.register && e.register(vt, i, mt);
    } else
      bl.push(e);
}, j = 255, pn = {
  aqua: [0, j, j],
  lime: [0, j, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, j],
  navy: [0, 0, 128],
  white: [j, j, j],
  olive: [128, 128, 0],
  yellow: [j, j, 0],
  orange: [j, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [j, 0, 0],
  pink: [j, 192, 203],
  cyan: [0, j, j],
  transparent: [j, j, j, 0]
}, hi = function(e, t, n) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < 0.5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * j + 0.5 | 0;
}, yl = function(e, t, n) {
  var i = e ? Zt(e) ? [e >> 16, e >> 8 & j, e & j] : 0 : pn.black, s, a, o, c, l, d, h, u, f, g;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), pn[e])
      i = pn[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), a = e.charAt(2), o = e.charAt(3), e = "#" + s + s + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & j, i & j, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & j, e & j];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = g = e.match(Fa), !t)
        c = +i[0] % 360 / 360, l = +i[1] / 100, d = +i[2] / 100, a = d <= 0.5 ? d * (l + 1) : d + l - d * l, s = d * 2 - a, i.length > 3 && (i[3] *= 1), i[0] = hi(c + 1 / 3, s, a), i[1] = hi(c, s, a), i[2] = hi(c - 1 / 3, s, a);
      else if (~e.indexOf("="))
        return i = e.match(Jo), n && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(Fa) || pn.transparent;
    i = i.map(Number);
  }
  return t && !g && (s = i[0] / j, a = i[1] / j, o = i[2] / j, h = Math.max(s, a, o), u = Math.min(s, a, o), d = (h + u) / 2, h === u ? c = l = 0 : (f = h - u, l = d > 0.5 ? f / (2 - h - u) : f / (h + u), c = h === s ? (a - o) / f + (a < o ? 6 : 0) : h === a ? (o - s) / f + 2 : (s - a) / f + 4, c *= 60), i[0] = ~~(c + 0.5), i[1] = ~~(l * 100 + 0.5), i[2] = ~~(d * 100 + 0.5)), n && i.length < 4 && (i[3] = 1), i;
}, wl = function(e) {
  var t = [], n = [], i = -1;
  return e.split(ae).forEach(function(s) {
    var a = s.match(qe) || [];
    t.push.apply(t, a), n.push(i += a.length + 1);
  }), t.c = n, t;
}, Ba = function(e, t, n) {
  var i = "", s = (e + i).match(ae), a = t ? "hsla(" : "rgba(", o = 0, c, l, d, h;
  if (!s)
    return e;
  if (s = s.map(function(u) {
    return (u = yl(u, t, 1)) && a + (t ? u[0] + "," + u[1] + "%," + u[2] + "%," + u[3] : u.join(",")) + ")";
  }), n && (d = wl(e), c = n.c, c.join(i) !== d.c.join(i)))
    for (l = e.replace(ae, "1").split(qe), h = l.length - 1; o < h; o++)
      i += l[o] + (~c.indexOf(o) ? s.shift() || a + "0,0,0,0)" : (d.length ? d : s.length ? s : n).shift());
  if (!l)
    for (l = e.split(ae), h = l.length - 1; o < h; o++)
      i += l[o] + s[o];
  return i + l[h];
}, ae = (function() {
  var r = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in pn)
    r += "|" + e + "\\b";
  return new RegExp(r + ")", "gi");
})(), Tm = /hsl[a]?\(/, kl = function(e) {
  var t = e.join(" "), n;
  if (ae.lastIndex = 0, ae.test(t))
    return n = Tm.test(t), e[1] = Ba(e[1], n), e[0] = Ba(e[0], n, wl(e[1])), !0;
}, Tn, yt = (function() {
  var r = Date.now, e = 500, t = 33, n = r(), i = n, s = 1e3 / 240, a = s, o = [], c, l, d, h, u, f, g = function p(m) {
    var b = r() - i, x = m === !0, v, _, w, k;
    if ((b > e || b < 0) && (n += b - t), i += b, w = i - n, v = w - a, (v > 0 || x) && (k = ++h.frame, u = w - h.time * 1e3, h.time = w = w / 1e3, a += v + (v >= s ? 4 : s - v), _ = 1), x || (c = l(p)), _)
      for (f = 0; f < o.length; f++)
        o[f](w, u, k, m);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(m) {
      return u / (1e3 / (m || 60));
    },
    wake: function() {
      tl && (!Ni && gs() && (Nt = Ni = window, ms = Nt.document || {}, St.gsap = vt, (Nt.gsapVersions || (Nt.gsapVersions = [])).push(vt.version), el(Er || Nt.GreenSockGlobals || !Nt.gsap && Nt || {}), bl.forEach(xl)), d = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && h.sleep(), l = d || function(m) {
        return setTimeout(m, a - h.time * 1e3 + 1 | 0);
      }, Tn = 1, g(2));
    },
    sleep: function() {
      (d ? cancelAnimationFrame : clearTimeout)(c), Tn = 0, l = Mn;
    },
    lagSmoothing: function(m, b) {
      e = m || 1 / 0, t = Math.min(b || 33, e);
    },
    fps: function(m) {
      s = 1e3 / (m || 240), a = h.time * 1e3 + s;
    },
    add: function(m, b, x) {
      var v = b ? function(_, w, k, $) {
        m(_, w, k, $), h.remove(v);
      } : m;
      return h.remove(m), o[x ? "unshift" : "push"](v), Je(), v;
    },
    remove: function(m, b) {
      ~(b = o.indexOf(m)) && o.splice(b, 1) && f >= b && f--;
    },
    _listeners: o
  }, h;
})(), Je = function() {
  return !Tn && yt.wake();
}, B = {}, Lm = /^[\d.\-M][\d.\-,\s]/, Pm = /["']/g, zm = function(e) {
  for (var t = {}, n = e.substr(1, e.length - 3).split(":"), i = n[0], s = 1, a = n.length, o, c, l; s < a; s++)
    c = n[s], o = s !== a - 1 ? c.lastIndexOf(",") : c.length, l = c.substr(0, o), t[i] = isNaN(l) ? l.replace(Pm, "").trim() : +l, i = c.substr(o + 1).trim();
  return t;
}, Im = function(e) {
  var t = e.indexOf("(") + 1, n = e.indexOf(")"), i = e.indexOf("(", t);
  return e.substring(t, ~i && i < n ? e.indexOf(")", n + 1) : n);
}, Fm = function(e) {
  var t = (e + "").split("("), n = B[t[0]];
  return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [zm(t[1])] : Im(e).split(",").map(al)) : B._CE && Lm.test(e) ? B._CE("", e) : n;
}, $l = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Al = function r(e, t) {
  for (var n = e._first, i; n; )
    n instanceof ht ? r(n, t) : n.vars.yoyoEase && (!n._yoyo || !n._repeat) && n._yoyo !== t && (n.timeline ? r(n.timeline, t) : (i = n._ease, n._ease = n._yEase, n._yEase = i, n._yoyo = t)), n = n._next;
}, Ae = function(e, t) {
  return e && (J(e) ? e : B[e] || Fm(e)) || t;
}, Ee = function(e, t, n, i) {
  n === void 0 && (n = function(c) {
    return 1 - t(1 - c);
  }), i === void 0 && (i = function(c) {
    return c < 0.5 ? t(c * 2) / 2 : 1 - t((1 - c) * 2) / 2;
  });
  var s = {
    easeIn: t,
    easeOut: n,
    easeInOut: i
  }, a;
  return gt(e, function(o) {
    B[o] = St[o] = s, B[a = o.toLowerCase()] = n;
    for (var c in s)
      B[a + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = B[o + "." + c] = s[c];
  }), s;
}, Sl = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, ui = function r(e, t, n) {
  var i = t >= 1 ? t : 1, s = (n || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), a = s / qi * (Math.asin(1 / i) || 0), o = function(d) {
    return d === 1 ? 1 : i * Math.pow(2, -10 * d) * am((d - a) * s) + 1;
  }, c = e === "out" ? o : e === "in" ? function(l) {
    return 1 - o(1 - l);
  } : Sl(o);
  return s = qi / s, c.config = function(l, d) {
    return r(e, l, d);
  }, c;
}, fi = function r(e, t) {
  t === void 0 && (t = 1.70158);
  var n = function(a) {
    return a ? --a * a * ((t + 1) * a + t) + 1 : 0;
  }, i = e === "out" ? n : e === "in" ? function(s) {
    return 1 - n(1 - s);
  } : Sl(n);
  return i.config = function(s) {
    return r(e, s);
  }, i;
};
gt("Linear,Quad,Cubic,Quart,Quint,Strong", function(r, e) {
  var t = e < 5 ? e + 1 : e;
  Ee(r + ",Power" + (t - 1), e ? function(n) {
    return Math.pow(n, t);
  } : function(n) {
    return n;
  }, function(n) {
    return 1 - Math.pow(1 - n, t);
  }, function(n) {
    return n < 0.5 ? Math.pow(n * 2, t) / 2 : 1 - Math.pow((1 - n) * 2, t) / 2;
  });
});
B.Linear.easeNone = B.none = B.Linear.easeIn;
Ee("Elastic", ui("in"), ui("out"), ui());
(function(r, e) {
  var t = 1 / e, n = 2 * t, i = 2.5 * t, s = function(o) {
    return o < t ? r * o * o : o < n ? r * Math.pow(o - 1.5 / e, 2) + 0.75 : o < i ? r * (o -= 2.25 / e) * o + 0.9375 : r * Math.pow(o - 2.625 / e, 2) + 0.984375;
  };
  Ee("Bounce", function(a) {
    return 1 - s(1 - a);
  }, s);
})(7.5625, 2.75);
Ee("Expo", function(r) {
  return Math.pow(2, 10 * (r - 1)) * r + r * r * r * r * r * r * (1 - r);
});
Ee("Circ", function(r) {
  return -(Ko(1 - r * r) - 1);
});
Ee("Sine", function(r) {
  return r === 1 ? 1 : -sm(r * rm) + 1;
});
Ee("Back", fi("in"), fi("out"), fi());
B.SteppedEase = B.steps = St.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var n = 1 / e, i = e + (t ? 0 : 1), s = t ? 1 : 0, a = 1 - V;
    return function(o) {
      return ((i * Nn(0, a, o) | 0) + s) * n;
    };
  }
};
We.ease = B["quad.out"];
gt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(r) {
  return bs += r + "," + r + "Params,";
});
var Cl = function(e, t) {
  this.id = im++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : il, this.set = t ? t.getSetter : As;
}, Ln = /* @__PURE__ */ (function() {
  function r(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ze(this, +t.duration, 1, 1), this.data = t.data, W && (this._ctx = W, W.data.push(this)), Tn || yt.wake();
  }
  var e = r.prototype;
  return e.delay = function(n) {
    return n || n === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + n - this._delay), this._delay = n, this) : this._delay;
  }, e.duration = function(n) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? n + (n + this._rDelay) * this._repeat : n) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(n) {
    return arguments.length ? (this._dirty = 0, Ze(this, this._repeat < 0 ? n : (n - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(n, i) {
    if (Je(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Hr(this, n), !s._dp || s.parent || cl(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && n < this._tDur || this._ts < 0 && n > 0 || !this._tDur && !n) && Rt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== n || !this._dur && !i || this._initted && Math.abs(this._zTime) === V || !this._initted && this._dur && n || !n && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = n), sl(this, n, i)), this;
  }, e.time = function(n, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), n + Ra(this)) % (this._dur + this._rDelay) || (n ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(n, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * n, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(n, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - n : n) + Ra(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(n, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (n - 1) * s, i) : this._repeat ? Ke(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(n, i) {
    if (!arguments.length)
      return this._rts === -V ? 0 : this._rts;
    if (this._rts === n)
      return this;
    var s = this.parent && this._ts ? Pr(this.parent._time, this) : this._tTime;
    return this._rts = +n || 0, this._ts = this._ps || n === -V ? 0 : this._rts, this.totalTime(Nn(-Math.abs(this._delay), this.totalDuration(), s), i !== !1), Br(this), mm(this);
  }, e.paused = function(n) {
    return arguments.length ? (this._ps !== n && (this._ps = n, n ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Je(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== V && (this._tTime -= V)))), this) : this._ps;
  }, e.startTime = function(n) {
    if (arguments.length) {
      this._start = U(n);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Rt(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(n) {
    return this._start + (pt(n) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(n) {
    var i = this.parent || this._dp;
    return i ? n && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Pr(i.rawTime(n), this) : this._tTime : this._tTime;
  }, e.revert = function(n) {
    n === void 0 && (n = um);
    var i = st;
    return st = n, ys(this) && (this.timeline && this.timeline.revert(n), this.totalTime(-0.01, n.suppressEvents)), this.data !== "nested" && n.kill !== !1 && this.kill(), st = i, this;
  }, e.globalTime = function(n) {
    for (var i = this, s = arguments.length ? n : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(n) : s;
  }, e.repeat = function(n) {
    return arguments.length ? (this._repeat = n === 1 / 0 ? -2 : n, Da(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(n) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = n, Da(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(n) {
    return arguments.length ? (this._yoyo = n, this) : this._yoyo;
  }, e.seek = function(n, i) {
    return this.totalTime(Et(this, n), pt(i));
  }, e.restart = function(n, i) {
    return this.play().totalTime(n ? -this._delay : 0, pt(i)), this._dur || (this._zTime = -V), this;
  }, e.play = function(n, i) {
    return n != null && this.seek(n, i), this.reversed(!1).paused(!1);
  }, e.reverse = function(n, i) {
    return n != null && this.seek(n || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, e.pause = function(n, i) {
    return n != null && this.seek(n, i), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(n) {
    return arguments.length ? (!!n !== this.reversed() && this.timeScale(-this._rts || (n ? -V : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -V, this;
  }, e.isActive = function() {
    var n = this.parent || this._dp, i = this._start, s;
    return !!(!n || this._ts && this._initted && n.isActive() && (s = n.rawTime(!0)) >= i && s < this.endTime(!0) - V);
  }, e.eventCallback = function(n, i, s) {
    var a = this.vars;
    return arguments.length > 1 ? (i ? (a[n] = i, s && (a[n + "Params"] = s), n === "onUpdate" && (this._onUpdate = i)) : delete a[n], this) : a[n];
  }, e.then = function(n) {
    var i = this, s = i._prom;
    return new Promise(function(a) {
      var o = J(n) ? n : ol, c = function() {
        var d = i.then;
        i.then = null, s && s(), J(o) && (o = o(i)) && (o.then || o === i) && (i.then = d), a(o), i.then = d;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? c() : i._prom = c;
    });
  }, e.kill = function() {
    fn(this);
  }, r;
})();
Ct(Ln.prototype, {
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
  _zTime: -V,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ht = /* @__PURE__ */ (function(r) {
  Uo(e, r);
  function e(n, i) {
    var s;
    return n === void 0 && (n = {}), s = r.call(this, n) || this, s.labels = {}, s.smoothChildTiming = !!n.smoothChildTiming, s.autoRemoveChildren = !!n.autoRemoveChildren, s._sort = pt(n.sortChildren), K && Rt(n.parent || K, Gt(s), i), n.reversed && s.reverse(), n.paused && s.paused(!0), n.scrollTrigger && dl(Gt(s), n.scrollTrigger), s;
  }
  var t = e.prototype;
  return t.to = function(i, s, a) {
    return vn(0, arguments, this), this;
  }, t.from = function(i, s, a) {
    return vn(1, arguments, this), this;
  }, t.fromTo = function(i, s, a, o) {
    return vn(2, arguments, this), this;
  }, t.set = function(i, s, a) {
    return s.duration = 0, s.parent = this, _n(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new et(i, s, Et(this, a), 1), this;
  }, t.call = function(i, s, a) {
    return Rt(this, et.delayedCall(0, i, s), a);
  }, t.staggerTo = function(i, s, a, o, c, l, d) {
    return a.duration = s, a.stagger = a.stagger || o, a.onComplete = l, a.onCompleteParams = d, a.parent = this, new et(i, a, Et(this, c)), this;
  }, t.staggerFrom = function(i, s, a, o, c, l, d) {
    return a.runBackwards = 1, _n(a).immediateRender = pt(a.immediateRender), this.staggerTo(i, s, a, o, c, l, d);
  }, t.staggerFromTo = function(i, s, a, o, c, l, d, h) {
    return o.startAt = a, _n(o).immediateRender = pt(o.immediateRender), this.staggerTo(i, s, o, c, l, d, h);
  }, t.render = function(i, s, a) {
    var o = this._time, c = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, d = i <= 0 ? 0 : U(i), h = this._zTime < 0 != i < 0 && (this._initted || !l), u, f, g, p, m, b, x, v, _, w, k, $;
    if (this !== K && d > c && i >= 0 && (d = c), d !== this._tTime || a || h) {
      if (o !== this._time && l && (d += this._time - o, i += this._time - o), u = d, _ = this._start, v = this._ts, b = !v, h && (l || (o = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (k = this._yoyo, m = l + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(m * 100 + i, s, a);
        if (u = U(d % m), d === c ? (p = this._repeat, u = l) : (w = U(d / m), p = ~~w, p && p === w && (u = l, p--), u > l && (u = l)), w = Ke(this._tTime, m), !o && this._tTime && w !== p && this._tTime - w * m - this._dur <= 0 && (w = p), k && p & 1 && (u = l - u, $ = 1), p !== w && !this._lock) {
          var A = k && w & 1, S = A === (k && p & 1);
          if (p < w && (A = !A), o = A ? 0 : d % l ? l : d, this._lock = 1, this.render(o || ($ ? 0 : U(p * m)), s, !l)._lock = 0, this._tTime = d, !s && this.parent && wt(this, "onRepeat"), this.vars.repeatRefresh && !$ && (this.invalidate()._lock = 1, w = p), o && o !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, c = this._tDur, S && (this._lock = 2, o = A ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !$ && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          Al(this, $);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (x = xm(this, U(o), U(u)), x && (d -= u - (u = x._start))), this._tTime = d, this._time = u, this._act = !v, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && d && l && !s && !w && (wt(this, "onStart"), this._tTime !== d))
        return this;
      if (u >= o && i >= 0)
        for (f = this._first; f; ) {
          if (g = f._next, (f._act || u >= f._start) && f._ts && x !== f) {
            if (f.parent !== this)
              return this.render(i, s, a);
            if (f.render(f._ts > 0 ? (u - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (u - f._start) * f._ts, s, a), u !== this._time || !this._ts && !b) {
              x = 0, g && (d += this._zTime = -V);
              break;
            }
          }
          f = g;
        }
      else {
        f = this._last;
        for (var y = i < 0 ? i : u; f; ) {
          if (g = f._prev, (f._act || y <= f._end) && f._ts && x !== f) {
            if (f.parent !== this)
              return this.render(i, s, a);
            if (f.render(f._ts > 0 ? (y - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (y - f._start) * f._ts, s, a || st && ys(f)), u !== this._time || !this._ts && !b) {
              x = 0, g && (d += this._zTime = y ? -V : V);
              break;
            }
          }
          f = g;
        }
      }
      if (x && !s && (this.pause(), x.render(u >= o ? 0 : -V)._zTime = u >= o ? 1 : -1, this._ts))
        return this._start = _, Br(this), this.render(i, s, a);
      this._onUpdate && !s && wt(this, "onUpdate", !0), (d === c && this._tTime >= this.totalDuration() || !d && o) && (_ === this._start || Math.abs(v) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (d === c && this._ts > 0 || !d && this._ts < 0) && le(this, 1), !s && !(i < 0 && !o) && (d || o || !c) && (wt(this, d === c && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(i, s) {
    var a = this;
    if (Zt(s) || (s = Et(this, s, i)), !(i instanceof Ln)) {
      if (lt(i))
        return i.forEach(function(o) {
          return a.add(o, s);
        }), this;
      if (rt(i))
        return this.addLabel(i, s);
      if (J(i))
        i = et.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Rt(this, i, s) : this;
  }, t.getChildren = function(i, s, a, o) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), a === void 0 && (a = !0), o === void 0 && (o = -Tt);
    for (var c = [], l = this._first; l; )
      l._start >= o && (l instanceof et ? s && c.push(l) : (a && c.push(l), i && c.push.apply(c, l.getChildren(!0, s, a)))), l = l._next;
    return c;
  }, t.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), a = s.length; a--; )
      if (s[a].vars.id === i)
        return s[a];
  }, t.remove = function(i) {
    return rt(i) ? this.removeLabel(i) : J(i) ? this.killTweensOf(i) : (i.parent === this && Or(this, i), i === this._recent && (this._recent = this._last), $e(this));
  }, t.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = U(yt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), r.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(i, s) {
    return this.labels[i] = Et(this, s), this;
  }, t.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, t.addPause = function(i, s, a) {
    var o = et.delayedCall(0, s || Mn, a);
    return o.data = "isPause", this._hasPause = 1, Rt(this, o, Et(this, i));
  }, t.removePause = function(i) {
    var s = this._first;
    for (i = Et(this, i); s; )
      s._start === i && s.data === "isPause" && le(s), s = s._next;
  }, t.killTweensOf = function(i, s, a) {
    for (var o = this.getTweensOf(i, a), c = o.length; c--; )
      ee !== o[c] && o[c].kill(i, s);
    return this;
  }, t.getTweensOf = function(i, s) {
    for (var a = [], o = Lt(i), c = this._first, l = Zt(s), d; c; )
      c instanceof et ? fm(c._targets, o) && (l ? (!ee || c._initted && c._ts) && c.globalTime(0) <= s && c.globalTime(c.totalDuration()) > s : !s || c.isActive()) && a.push(c) : (d = c.getTweensOf(o, s)).length && a.push.apply(a, d), c = c._next;
    return a;
  }, t.tweenTo = function(i, s) {
    s = s || {};
    var a = this, o = Et(a, i), c = s, l = c.startAt, d = c.onStart, h = c.onStartParams, u = c.immediateRender, f, g = et.to(a, Ct({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale()) || V,
      onStart: function() {
        if (a.pause(), !f) {
          var m = s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale());
          g._dur !== m && Ze(g, m, 0, 1).render(g._time, !0, !0), f = 1;
        }
        d && d.apply(g, h || []);
      }
    }, s));
    return u ? g.render(0) : g;
  }, t.tweenFromTo = function(i, s, a) {
    return this.tweenTo(s, Ct({
      startAt: {
        time: Et(this, i)
      }
    }, a));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(i) {
    return i === void 0 && (i = this._time), Oa(this, Et(this, i));
  }, t.previousLabel = function(i) {
    return i === void 0 && (i = this._time), Oa(this, Et(this, i), 1);
  }, t.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + V);
  }, t.shiftChildren = function(i, s, a) {
    a === void 0 && (a = 0);
    var o = this._first, c = this.labels, l;
    for (i = U(i); o; )
      o._start >= a && (o._start += i, o._end += i), o = o._next;
    if (s)
      for (l in c)
        c[l] >= a && (c[l] += i);
    return $e(this);
  }, t.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return r.prototype.invalidate.call(this, i);
  }, t.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, a; s; )
      a = s._next, this.remove(s), s = a;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), $e(this);
  }, t.totalDuration = function(i) {
    var s = 0, a = this, o = a._last, c = Tt, l, d, h;
    if (arguments.length)
      return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -i : i));
    if (a._dirty) {
      for (h = a.parent; o; )
        l = o._prev, o._dirty && o.totalDuration(), d = o._start, d > c && a._sort && o._ts && !a._lock ? (a._lock = 1, Rt(a, o, d - o._delay, 1)._lock = 0) : c = d, d < 0 && o._ts && (s -= d, (!h && !a._dp || h && h.smoothChildTiming) && (a._start += U(d / a._ts), a._time -= d, a._tTime -= d), a.shiftChildren(-d, !1, -1 / 0), c = 0), o._end > s && o._ts && (s = o._end), o = l;
      Ze(a, a === K && a._time > s ? a._time : s, 1, 1), a._dirty = 0;
    }
    return a._tDur;
  }, e.updateRoot = function(i) {
    if (K._ts && (sl(K, Pr(i, K)), rl = yt.frame), yt.frame >= qa) {
      qa += $t.autoSleep || 120;
      var s = K._first;
      if ((!s || !s._ts) && $t.autoSleep && yt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || yt.sleep();
      }
    }
  }, e;
})(Ln);
Ct(ht.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var qm = function(e, t, n, i, s, a, o) {
  var c = new mt(this._pt, e, t, 0, 1, zl, null, s), l = 0, d = 0, h, u, f, g, p, m, b, x;
  for (c.b = n, c.e = i, n += "", i += "", (b = ~i.indexOf("random(")) && (i = En(i)), a && (x = [n, i], a(x, e, t), n = x[0], i = x[1]), u = n.match(ci) || []; h = ci.exec(i); )
    g = h[0], p = i.substring(l, h.index), f ? f = (f + 1) % 5 : p.substr(-5) === "rgba(" && (f = 1), g !== u[d++] && (m = parseFloat(u[d - 1]) || 0, c._pt = {
      _next: c._pt,
      p: p || d === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: g.charAt(1) === "=" ? Oe(m, g) - m : parseFloat(g) - m,
      m: f && f < 4 ? Math.round : 0
    }, l = ci.lastIndex);
  return c.c = l < i.length ? i.substring(l, i.length) : "", c.fp = o, (Qo.test(i) || b) && (c.e = 0), this._pt = c, c;
}, ws = function(e, t, n, i, s, a, o, c, l, d) {
  J(i) && (i = i(s || 0, e, a));
  var h = e[t], u = n !== "get" ? n : J(h) ? l ? e[t.indexOf("set") || !J(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : h, f = J(h) ? l ? Bm : Ll : $s, g;
  if (rt(i) && (~i.indexOf("random(") && (i = En(i)), i.charAt(1) === "=" && (g = Oe(u, i) + (ot(u) || 0), (g || g === 0) && (i = g))), !d || u !== i || Vi)
    return !isNaN(u * i) && i !== "" ? (g = new mt(this._pt, e, t, +u || 0, i - (u || 0), typeof h == "boolean" ? jm : Pl, 0, f), l && (g.fp = l), o && g.modifier(o, this, e), this._pt = g) : (!h && !(t in e) && _s(t, i), qm.call(this, e, t, u, i, f, c || $t.stringFilter, l));
}, Nm = function(e, t, n, i, s) {
  if (J(e) && (e = bn(e, s, t, n, i)), !Ht(e) || e.style && e.nodeType || lt(e) || Zo(e))
    return rt(e) ? bn(e, s, t, n, i) : e;
  var a = {}, o;
  for (o in e)
    a[o] = bn(e[o], s, t, n, i);
  return a;
}, Ml = function(e, t, n, i, s, a) {
  var o, c, l, d;
  if (xt[e] && (o = new xt[e]()).init(s, o.rawVars ? t[e] : Nm(t[e], i, s, a, n), n, i, a) !== !1 && (n._pt = c = new mt(n._pt, s, e, 0, 1, o.render, o, 0, o.priority), n !== Ne))
    for (l = n._ptLookup[n._targets.indexOf(s)], d = o._props.length; d--; )
      l[o._props[d]] = c;
  return o;
}, ee, Vi, ks = function r(e, t, n) {
  var i = e.vars, s = i.ease, a = i.startAt, o = i.immediateRender, c = i.lazy, l = i.onUpdate, d = i.runBackwards, h = i.yoyoEase, u = i.keyframes, f = i.autoRevert, g = e._dur, p = e._startAt, m = e._targets, b = e.parent, x = b && b.data === "nested" ? b.vars.targets : m, v = e._overwrite === "auto" && !fs, _ = e.timeline, w, k, $, A, S, y, C, M, T, L, E, q, I;
  if (_ && (!u || !s) && (s = "none"), e._ease = Ae(s, We.ease), e._yEase = h ? $l(Ae(h === !0 ? s : h, We.ease)) : 0, h && e._yoyo && !e._repeat && (h = e._yEase, e._yEase = e._ease, e._ease = h), e._from = !_ && !!i.runBackwards, !_ || u && !i.stagger) {
    if (M = m[0] ? ke(m[0]).harness : 0, q = M && i[M.prop], w = Lr(i, vs), p && (p._zTime < 0 && p.progress(1), t < 0 && d && o && !f ? p.render(-1, !0) : p.revert(d && g ? lr : hm), p._lazy = 0), a) {
      if (le(e._startAt = et.set(m, Ct({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && pt(c),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return wt(e, "onUpdate");
        },
        stagger: 0
      }, a))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (st || !o && !f) && e._startAt.revert(lr), o && g && t <= 0 && n <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (d && g && !p) {
      if (t && (o = !1), $ = Ct({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !p && pt(c),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, w), q && ($[M.prop] = q), le(e._startAt = et.set(m, $)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (st ? e._startAt.revert(lr) : e._startAt.render(-1, !0)), e._zTime = t, !o)
        r(e._startAt, V, V);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, c = g && pt(c) || c && !g, k = 0; k < m.length; k++) {
      if (S = m[k], C = S._gsap || xs(m)[k]._gsap, e._ptLookup[k] = L = {}, Ri[C.id] && se.length && Tr(), E = x === m ? k : x.indexOf(S), M && (T = new M()).init(S, q || w, e, E, x) !== !1 && (e._pt = A = new mt(e._pt, S, T.name, 0, 1, T.render, T, 0, T.priority), T._props.forEach(function(P) {
        L[P] = A;
      }), T.priority && (y = 1)), !M || q)
        for ($ in w)
          xt[$] && (T = Ml($, w, e, E, S, x)) ? T.priority && (y = 1) : L[$] = A = ws.call(e, S, $, "get", w[$], E, x, 0, i.stringFilter);
      e._op && e._op[k] && e.kill(S, e._op[k]), v && e._pt && (ee = e, K.killTweensOf(S, L, e.globalTime(t)), I = !e.parent, ee = 0), e._pt && c && (Ri[C.id] = 1);
    }
    y && Il(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = l, e._initted = (!e._op || e._pt) && !I, u && t <= 0 && _.render(Tt, !0, !0);
}, Rm = function(e, t, n, i, s, a, o, c) {
  var l = (e._pt && e._ptCache || (e._ptCache = {}))[t], d, h, u, f;
  if (!l)
    for (l = e._ptCache[t] = [], u = e._ptLookup, f = e._targets.length; f--; ) {
      if (d = u[f][t], d && d.d && d.d._pt)
        for (d = d.d._pt; d && d.p !== t && d.fp !== t; )
          d = d._next;
      if (!d)
        return Vi = 1, e.vars[t] = "+=0", ks(e, o), Vi = 0, c ? Cn(t + " not eligible for reset") : 1;
      l.push(d);
    }
  for (f = l.length; f--; )
    h = l[f], d = h._pt || h, d.s = (i || i === 0) && !s ? i : d.s + (i || 0) + a * d.c, d.c = n - d.s, h.e && (h.e = tt(n) + ot(h.e)), h.b && (h.b = d.s + ot(h.b));
}, Dm = function(e, t) {
  var n = e[0] ? ke(e[0]).harness : 0, i = n && n.aliases, s, a, o, c;
  if (!i)
    return t;
  s = Ue({}, t);
  for (a in i)
    if (a in s)
      for (c = i[a].split(","), o = c.length; o--; )
        s[c[o]] = s[a];
  return s;
}, Om = function(e, t, n, i) {
  var s = t.ease || i || "power1.inOut", a, o;
  if (lt(t))
    o = n[e] || (n[e] = []), t.forEach(function(c, l) {
      return o.push({
        t: l / (t.length - 1) * 100,
        v: c,
        e: s
      });
    });
  else
    for (a in t)
      o = n[a] || (n[a] = []), a === "ease" || o.push({
        t: parseFloat(e),
        v: t[a],
        e: s
      });
}, bn = function(e, t, n, i, s) {
  return J(e) ? e.call(t, n, i, s) : rt(e) && ~e.indexOf("random(") ? En(e) : e;
}, El = bs + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Tl = {};
gt(El + ",id,stagger,delay,duration,paused,scrollTrigger", function(r) {
  return Tl[r] = 1;
});
var et = /* @__PURE__ */ (function(r) {
  Uo(e, r);
  function e(n, i, s, a) {
    var o;
    typeof i == "number" && (s.duration = i, i = s, s = null), o = r.call(this, a ? i : _n(i)) || this;
    var c = o.vars, l = c.duration, d = c.delay, h = c.immediateRender, u = c.stagger, f = c.overwrite, g = c.keyframes, p = c.defaults, m = c.scrollTrigger, b = c.yoyoEase, x = i.parent || K, v = (lt(n) || Zo(n) ? Zt(n[0]) : "length" in i) ? [n] : Lt(n), _, w, k, $, A, S, y, C;
    if (o._targets = v.length ? xs(v) : Cn("GSAP target " + n + " not found. https://gsap.com", !$t.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = f, g || u || Qn(l) || Qn(d)) {
      if (i = o.vars, _ = o.timeline = new ht({
        data: "nested",
        defaults: p || {},
        targets: x && x.data === "nested" ? x.vars.targets : v
      }), _.kill(), _.parent = _._dp = Gt(o), _._start = 0, u || Qn(l) || Qn(d)) {
        if ($ = v.length, y = u && pl(u), Ht(u))
          for (A in u)
            ~El.indexOf(A) && (C || (C = {}), C[A] = u[A]);
        for (w = 0; w < $; w++)
          k = Lr(i, Tl), k.stagger = 0, b && (k.yoyoEase = b), C && Ue(k, C), S = v[w], k.duration = +bn(l, Gt(o), w, S, v), k.delay = (+bn(d, Gt(o), w, S, v) || 0) - o._delay, !u && $ === 1 && k.delay && (o._delay = d = k.delay, o._start += d, k.delay = 0), _.to(S, k, y ? y(w, S, v) : 0), _._ease = B.none;
        _.duration() ? l = d = 0 : o.timeline = 0;
      } else if (g) {
        _n(Ct(_.vars.defaults, {
          ease: "none"
        })), _._ease = Ae(g.ease || i.ease || "none");
        var M = 0, T, L, E;
        if (lt(g))
          g.forEach(function(q) {
            return _.to(v, q, ">");
          }), _.duration();
        else {
          k = {};
          for (A in g)
            A === "ease" || A === "easeEach" || Om(A, g[A], k, g.easeEach);
          for (A in k)
            for (T = k[A].sort(function(q, I) {
              return q.t - I.t;
            }), M = 0, w = 0; w < T.length; w++)
              L = T[w], E = {
                ease: L.e,
                duration: (L.t - (w ? T[w - 1].t : 0)) / 100 * l
              }, E[A] = L.v, _.to(v, E, M), M += E.duration;
          _.duration() < l && _.to({}, {
            duration: l - _.duration()
          });
        }
      }
      l || o.duration(l = _.duration());
    } else
      o.timeline = 0;
    return f === !0 && !fs && (ee = Gt(o), K.killTweensOf(v), ee = 0), Rt(x, Gt(o), s), i.reversed && o.reverse(), i.paused && o.paused(!0), (h || !l && !g && o._start === U(x._time) && pt(h) && _m(Gt(o)) && x.data !== "nested") && (o._tTime = -V, o.render(Math.max(0, -d) || 0)), m && dl(Gt(o), m), o;
  }
  var t = e.prototype;
  return t.render = function(i, s, a) {
    var o = this._time, c = this._tDur, l = this._dur, d = i < 0, h = i > c - V && !d ? c : i < V ? 0 : i, u, f, g, p, m, b, x, v, _;
    if (!l)
      bm(this, i, s, a);
    else if (h !== this._tTime || !i || a || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== d || this._lazy) {
      if (u = h, v = this.timeline, this._repeat) {
        if (p = l + this._rDelay, this._repeat < -1 && d)
          return this.totalTime(p * 100 + i, s, a);
        if (u = U(h % p), h === c ? (g = this._repeat, u = l) : (m = U(h / p), g = ~~m, g && g === m ? (u = l, g--) : u > l && (u = l)), b = this._yoyo && g & 1, b && (_ = this._yEase, u = l - u), m = Ke(this._tTime, p), u === o && !a && this._initted && g === m)
          return this._tTime = h, this;
        g !== m && (v && this._yEase && Al(v, b), this.vars.repeatRefresh && !b && !this._lock && u !== p && this._initted && (this._lock = a = 1, this.render(U(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (hl(this, d ? i : u, a, s, h))
          return this._tTime = 0, this;
        if (o !== this._time && !(a && this.vars.repeatRefresh && g !== m))
          return this;
        if (l !== this._dur)
          return this.render(i, s, a);
      }
      if (this._tTime = h, this._time = u, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = x = (_ || this._ease)(u / l), this._from && (this.ratio = x = 1 - x), !o && h && !s && !m && (wt(this, "onStart"), this._tTime !== h))
        return this;
      for (f = this._pt; f; )
        f.r(x, f.d), f = f._next;
      v && v.render(i < 0 ? i : v._dur * v._ease(u / this._dur), s, a) || this._startAt && (this._zTime = i), this._onUpdate && !s && (d && Di(this, i, s, a), wt(this, "onUpdate")), this._repeat && g !== m && this.vars.onRepeat && !s && this.parent && wt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (d && !this._onUpdate && Di(this, i, !0, !0), (i || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && le(this, 1), !s && !(d && !o) && (h || o || b) && (wt(this, h === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), r.prototype.invalidate.call(this, i);
  }, t.resetTo = function(i, s, a, o, c) {
    Tn || yt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), d;
    return this._initted || ks(this, l), d = this._ease(l / this._dur), Rm(this, i, s, a, o, d, l, c) ? this.resetTo(i, s, a, o, 1) : (Hr(this, 0), this.parent || ll(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? fn(this) : this.scrollTrigger && this.scrollTrigger.kill(!!st), this;
    if (this.timeline) {
      var a = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, ee && ee.vars.overwrite !== !0)._first || fn(this), this.parent && a !== this.timeline.totalDuration() && Ze(this, this._dur * this.timeline._tDur / a, 0, 1), this;
    }
    var o = this._targets, c = i ? Lt(i) : o, l = this._ptLookup, d = this._pt, h, u, f, g, p, m, b;
    if ((!s || s === "all") && gm(o, c))
      return s === "all" && (this._pt = 0), fn(this);
    for (h = this._op = this._op || [], s !== "all" && (rt(s) && (p = {}, gt(s, function(x) {
      return p[x] = 1;
    }), s = p), s = Dm(o, s)), b = o.length; b--; )
      if (~c.indexOf(o[b])) {
        u = l[b], s === "all" ? (h[b] = s, g = u, f = {}) : (f = h[b] = h[b] || {}, g = s);
        for (p in g)
          m = u && u[p], m && ((!("kill" in m.d) || m.d.kill(p) === !0) && Or(this, m, "_pt"), delete u[p]), f !== "all" && (f[p] = 1);
      }
    return this._initted && !this._pt && d && fn(this), this;
  }, e.to = function(i, s) {
    return new e(i, s, arguments[2]);
  }, e.from = function(i, s) {
    return vn(1, arguments);
  }, e.delayedCall = function(i, s, a, o) {
    return new e(s, 0, {
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
  }, e.fromTo = function(i, s, a) {
    return vn(2, arguments);
  }, e.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(i, s);
  }, e.killTweensOf = function(i, s, a) {
    return K.killTweensOf(i, s, a);
  }, e;
})(Ln);
Ct(et.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
gt("staggerTo,staggerFrom,staggerFromTo", function(r) {
  et[r] = function() {
    var e = new ht(), t = Bi.call(arguments, 0);
    return t.splice(r === "staggerFromTo" ? 5 : 4, 0, 0), e[r].apply(e, t);
  };
});
var $s = function(e, t, n) {
  return e[t] = n;
}, Ll = function(e, t, n) {
  return e[t](n);
}, Bm = function(e, t, n, i) {
  return e[t](i.fp, n);
}, Hm = function(e, t, n) {
  return e.setAttribute(t, n);
}, As = function(e, t) {
  return J(e[t]) ? Ll : ps(e[t]) && e.setAttribute ? Hm : $s;
}, Pl = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, jm = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, zl = function(e, t) {
  var n = t._pt, i = "";
  if (!e && t.b)
    i = t.b;
  else if (e === 1 && t.e)
    i = t.e;
  else {
    for (; n; )
      i = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + i, n = n._next;
    i += t.c;
  }
  t.set(t.t, t.p, i, t);
}, Ss = function(e, t) {
  for (var n = t._pt; n; )
    n.r(e, n.d), n = n._next;
}, Vm = function(e, t, n, i) {
  for (var s = this._pt, a; s; )
    a = s._next, s.p === i && s.modifier(e, t, n), s = a;
}, Xm = function(e) {
  for (var t = this._pt, n, i; t; )
    i = t._next, t.p === e && !t.op || t.op === e ? Or(this, t, "_pt") : t.dep || (n = 1), t = i;
  return !n;
}, Ym = function(e, t, n, i) {
  i.mSet(e, t, i.m.call(i.tween, n, i.mt), i);
}, Il = function(e) {
  for (var t = e._pt, n, i, s, a; t; ) {
    for (n = t._next, i = s; i && i.pr > t.pr; )
      i = i._next;
    (t._prev = i ? i._prev : a) ? t._prev._next = t : s = t, (t._next = i) ? i._prev = t : a = t, t = n;
  }
  e._pt = s;
}, mt = /* @__PURE__ */ (function() {
  function r(t, n, i, s, a, o, c, l, d) {
    this.t = n, this.s = s, this.c = a, this.p = i, this.r = o || Pl, this.d = c || this, this.set = l || $s, this.pr = d || 0, this._next = t, t && (t._prev = this);
  }
  var e = r.prototype;
  return e.modifier = function(n, i, s) {
    this.mSet = this.mSet || this.set, this.set = Ym, this.m = n, this.mt = s, this.tween = i;
  }, r;
})();
gt(bs + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(r) {
  return vs[r] = 1;
});
St.TweenMax = St.TweenLite = et;
St.TimelineLite = St.TimelineMax = ht;
K = new ht({
  sortChildren: !1,
  defaults: We,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
$t.stringFilter = kl;
var Se = [], dr = {}, Gm = [], Ha = 0, Wm = 0, pi = function(e) {
  return (dr[e] || Gm).map(function(t) {
    return t();
  });
}, Xi = function() {
  var e = Date.now(), t = [];
  e - Ha > 2 && (pi("matchMediaInit"), Se.forEach(function(n) {
    var i = n.queries, s = n.conditions, a, o, c, l;
    for (o in i)
      a = Nt.matchMedia(i[o]).matches, a && (c = 1), a !== s[o] && (s[o] = a, l = 1);
    l && (n.revert(), c && t.push(n));
  }), pi("matchMediaRevert"), t.forEach(function(n) {
    return n.onMatch(n, function(i) {
      return n.add(null, i);
    });
  }), Ha = e, pi("matchMedia"));
}, Fl = /* @__PURE__ */ (function() {
  function r(t, n) {
    this.selector = n && Hi(n), this.data = [], this._r = [], this.isReverted = !1, this.id = Wm++, t && this.add(t);
  }
  var e = r.prototype;
  return e.add = function(n, i, s) {
    J(n) && (s = i, i = n, n = J);
    var a = this, o = function() {
      var l = W, d = a.selector, h;
      return l && l !== a && l.data.push(a), s && (a.selector = Hi(s)), W = a, h = i.apply(a, arguments), J(h) && a._r.push(h), W = l, a.selector = d, a.isReverted = !1, h;
    };
    return a.last = o, n === J ? o(a, function(c) {
      return a.add(null, c);
    }) : n ? a[n] = o : o;
  }, e.ignore = function(n) {
    var i = W;
    W = null, n(this), W = i;
  }, e.getTweens = function() {
    var n = [];
    return this.data.forEach(function(i) {
      return i instanceof r ? n.push.apply(n, i.getTweens()) : i instanceof et && !(i.parent && i.parent.data === "nested") && n.push(i);
    }), n;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(n, i) {
    var s = this;
    if (n ? (function() {
      for (var o = s.getTweens(), c = s.data.length, l; c--; )
        l = s.data[c], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(d) {
          return o.splice(o.indexOf(d), 1);
        }));
      for (o.map(function(d) {
        return {
          g: d._dur || d._delay || d._sat && !d._sat.vars.immediateRender ? d.globalTime(0) : -1 / 0,
          t: d
        };
      }).sort(function(d, h) {
        return h.g - d.g || -1 / 0;
      }).forEach(function(d) {
        return d.t.revert(n);
      }), c = s.data.length; c--; )
        l = s.data[c], l instanceof ht ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof et) && l.revert && l.revert(n);
      s._r.forEach(function(d) {
        return d(n, s);
      }), s.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), i)
      for (var a = Se.length; a--; )
        Se[a].id === this.id && Se.splice(a, 1);
  }, e.revert = function(n) {
    this.kill(n || {});
  }, r;
})(), Um = /* @__PURE__ */ (function() {
  function r(t) {
    this.contexts = [], this.scope = t, W && W.data.push(this);
  }
  var e = r.prototype;
  return e.add = function(n, i, s) {
    Ht(n) || (n = {
      matches: n
    });
    var a = new Fl(0, s || this.scope), o = a.conditions = {}, c, l, d;
    W && !a.selector && (a.selector = W.selector), this.contexts.push(a), i = a.add("onMatch", i), a.queries = n;
    for (l in n)
      l === "all" ? d = 1 : (c = Nt.matchMedia(n[l]), c && (Se.indexOf(a) < 0 && Se.push(a), (o[l] = c.matches) && (d = 1), c.addListener ? c.addListener(Xi) : c.addEventListener("change", Xi)));
    return d && i(a, function(h) {
      return a.add(null, h);
    }), this;
  }, e.revert = function(n) {
    this.kill(n || {});
  }, e.kill = function(n) {
    this.contexts.forEach(function(i) {
      return i.kill(n, !0);
    });
  }, r;
})(), zr = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    t.forEach(function(i) {
      return xl(i);
    });
  },
  timeline: function(e) {
    return new ht(e);
  },
  getTweensOf: function(e, t) {
    return K.getTweensOf(e, t);
  },
  getProperty: function(e, t, n, i) {
    rt(e) && (e = Lt(e)[0]);
    var s = ke(e || {}).get, a = n ? ol : al;
    return n === "native" && (n = ""), e && (t ? a((xt[t] && xt[t].get || s)(e, t, n, i)) : function(o, c, l) {
      return a((xt[o] && xt[o].get || s)(e, o, c, l));
    });
  },
  quickSetter: function(e, t, n) {
    if (e = Lt(e), e.length > 1) {
      var i = e.map(function(d) {
        return vt.quickSetter(d, t, n);
      }), s = i.length;
      return function(d) {
        for (var h = s; h--; )
          i[h](d);
      };
    }
    e = e[0] || {};
    var a = xt[t], o = ke(e), c = o.harness && (o.harness.aliases || {})[t] || t, l = a ? function(d) {
      var h = new a();
      Ne._pt = 0, h.init(e, n ? d + n : d, Ne, 0, [e]), h.render(1, h), Ne._pt && Ss(1, Ne);
    } : o.set(e, c);
    return a ? l : function(d) {
      return l(e, c, n ? d + n : d, o, 1);
    };
  },
  quickTo: function(e, t, n) {
    var i, s = vt.to(e, Ct((i = {}, i[t] = "+=0.1", i.paused = !0, i.stagger = 0, i), n || {})), a = function(c, l, d) {
      return s.resetTo(t, c, l, d);
    };
    return a.tween = s, a;
  },
  isTweening: function(e) {
    return K.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Ae(e.ease, We.ease)), Na(We, e || {});
  },
  config: function(e) {
    return Na($t, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, n = e.effect, i = e.plugins, s = e.defaults, a = e.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !xt[o] && !St[o] && Cn(t + " effect requires " + o + " plugin.");
    }), di[t] = function(o, c, l) {
      return n(Lt(o), Ct(c || {}, s), l);
    }, a && (ht.prototype[t] = function(o, c, l) {
      return this.add(di[t](o, Ht(c) ? c : (l = c) && {}, this), l);
    });
  },
  registerEase: function(e, t) {
    B[e] = Ae(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? Ae(e, t) : B;
  },
  getById: function(e) {
    return K.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var n = new ht(e), i, s;
    for (n.smoothChildTiming = pt(e.smoothChildTiming), K.remove(n), n._dp = 0, n._time = n._tTime = K._time, i = K._first; i; )
      s = i._next, (t || !(!i._dur && i instanceof et && i.vars.onComplete === i._targets[0])) && Rt(n, i, i._start - i._delay), i = s;
    return Rt(K, n, 0), n;
  },
  context: function(e, t) {
    return e ? new Fl(e, t) : W;
  },
  matchMedia: function(e) {
    return new Um(e);
  },
  matchMediaRefresh: function() {
    return Se.forEach(function(e) {
      var t = e.conditions, n, i;
      for (i in t)
        t[i] && (t[i] = !1, n = 1);
      n && e.revert();
    }) || Xi();
  },
  addEventListener: function(e, t) {
    var n = dr[e] || (dr[e] = []);
    ~n.indexOf(t) || n.push(t);
  },
  removeEventListener: function(e, t) {
    var n = dr[e], i = n && n.indexOf(t);
    i >= 0 && n.splice(i, 1);
  },
  utils: {
    wrap: Cm,
    wrapYoyo: Mm,
    distribute: pl,
    random: ml,
    snap: gl,
    normalize: Sm,
    getUnit: ot,
    clamp: wm,
    splitColor: yl,
    toArray: Lt,
    selector: Hi,
    mapRange: vl,
    pipe: $m,
    unitize: Am,
    interpolate: Em,
    shuffle: fl
  },
  install: el,
  effects: di,
  ticker: yt,
  updateRoot: ht.updateRoot,
  plugins: xt,
  globalTimeline: K,
  core: {
    PropTween: mt,
    globals: nl,
    Tween: et,
    Timeline: ht,
    Animation: Ln,
    getCache: ke,
    _removeLinkedListItem: Or,
    reverting: function() {
      return st;
    },
    context: function(e) {
      return e && W && (W.data.push(e), e._ctx = W), W;
    },
    suppressOverwrites: function(e) {
      return fs = e;
    }
  }
};
gt("to,from,fromTo,delayedCall,set,killTweensOf", function(r) {
  return zr[r] = et[r];
});
yt.add(ht.updateRoot);
Ne = zr.to({}, {
  duration: 0
});
var Km = function(e, t) {
  for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
    n = n._next;
  return n;
}, Zm = function(e, t) {
  var n = e._targets, i, s, a;
  for (i in t)
    for (s = n.length; s--; )
      a = e._ptLookup[s][i], a && (a = a.d) && (a._pt && (a = Km(a, i)), a && a.modifier && a.modifier(t[i], e, n[s], i));
}, gi = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, a) {
      a._onInit = function(o) {
        var c, l;
        if (rt(s) && (c = {}, gt(s, function(d) {
          return c[d] = 1;
        }), s = c), t) {
          c = {};
          for (l in s)
            c[l] = t(s[l]);
          s = c;
        }
        Zm(o, s);
      };
    }
  };
}, vt = zr.registerPlugin({
  name: "attr",
  init: function(e, t, n, i, s) {
    var a, o, c;
    this.tween = n;
    for (a in t)
      c = e.getAttribute(a) || "", o = this.add(e, "setAttribute", (c || 0) + "", t[a], i, s, 0, 0, a), o.op = a, o.b = c, this._props.push(a);
  },
  render: function(e, t) {
    for (var n = t._pt; n; )
      st ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var n = t.length; n--; )
      this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
  }
}, gi("roundProps", ji), gi("modifiers"), gi("snap", gl)) || zr;
et.version = ht.version = vt.version = "3.14.2";
tl = 1;
gs() && Je();
B.Power0;
B.Power1;
B.Power2;
B.Power3;
B.Power4;
B.Linear;
B.Quad;
B.Cubic;
B.Quart;
B.Quint;
B.Strong;
B.Elastic;
B.Back;
B.SteppedEase;
B.Bounce;
B.Sine;
B.Expo;
B.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ja, ne, Be, Cs, ye, Va, Ms, Jm = function() {
  return typeof window < "u";
}, Jt = {}, be = 180 / Math.PI, He = Math.PI / 180, ze = Math.atan2, Xa = 1e8, Es = /([A-Z])/g, Qm = /(left|right|width|margin|padding|x)/i, t_ = /[\s,\(]\S/, Ot = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Yi = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, e_ = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, n_ = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, r_ = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, i_ = function(e, t) {
  var n = t.s + t.c * e;
  t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t);
}, ql = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Nl = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, s_ = function(e, t, n) {
  return e.style[t] = n;
}, a_ = function(e, t, n) {
  return e.style.setProperty(t, n);
}, o_ = function(e, t, n) {
  return e._gsap[t] = n;
}, l_ = function(e, t, n) {
  return e._gsap.scaleX = e._gsap.scaleY = n;
}, c_ = function(e, t, n, i, s) {
  var a = e._gsap;
  a.scaleX = a.scaleY = n, a.renderTransform(s, a);
}, d_ = function(e, t, n, i, s) {
  var a = e._gsap;
  a[t] = n, a.renderTransform(s, a);
}, Z = "transform", _t = Z + "Origin", h_ = function r(e, t) {
  var n = this, i = this.target, s = i.style, a = i._gsap;
  if (e in Jt && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Ot[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(o) {
        return n.tfm[o] = Wt(i, o);
      }) : this.tfm[e] = a.x ? a[e] : Wt(i, e), e === _t && (this.tfm.zOrigin = a.zOrigin);
    else
      return Ot.transform.split(",").forEach(function(o) {
        return r.call(n, o, t);
      });
    if (this.props.indexOf(Z) >= 0)
      return;
    a.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(_t, t, "")), e = Z;
  }
  (s || t) && this.props.push(e, t, s[e]);
}, Rl = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, u_ = function() {
  var e = this.props, t = this.target, n = t.style, i = t._gsap, s, a;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? e[s + 1] === 2 ? t[e[s]](e[s + 2]) : t[e[s]] = e[s + 2] : e[s + 2] ? n[e[s]] = e[s + 2] : n.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(Es, "-$1").toLowerCase());
  if (this.tfm) {
    for (a in this.tfm)
      i[a] = this.tfm[a];
    i.svg && (i.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), s = Ms(), (!s || !s.isStart) && !n[Z] && (Rl(n), i.zOrigin && n[_t] && (n[_t] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, Dl = function(e, t) {
  var n = {
    target: e,
    props: [],
    revert: u_,
    save: h_
  };
  return e._gsap || vt.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(i) {
    return n.save(i);
  }), n;
}, Ol, Gi = function(e, t) {
  var n = ne.createElementNS ? ne.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : ne.createElement(e);
  return n && n.style ? n : ne.createElement(e);
}, kt = function r(e, t, n) {
  var i = getComputedStyle(e);
  return i[t] || i.getPropertyValue(t.replace(Es, "-$1").toLowerCase()) || i.getPropertyValue(t) || !n && r(e, Qe(t) || t, 1) || "";
}, Ya = "O,Moz,ms,Ms,Webkit".split(","), Qe = function(e, t, n) {
  var i = t || ye, s = i.style, a = 5;
  if (e in s && !n)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); a-- && !(Ya[a] + e in s); )
    ;
  return a < 0 ? null : (a === 3 ? "ms" : a >= 0 ? Ya[a] : "") + e;
}, Wi = function() {
  Jm() && window.document && (ja = window, ne = ja.document, Be = ne.documentElement, ye = Gi("div") || {
    style: {}
  }, Gi("div"), Z = Qe(Z), _t = Z + "Origin", ye.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ol = !!Qe("perspective"), Ms = vt.core.reverting, Cs = 1);
}, Ga = function(e) {
  var t = e.ownerSVGElement, n = Gi("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = e.cloneNode(!0), s;
  i.style.display = "block", n.appendChild(i), Be.appendChild(n);
  try {
    s = i.getBBox();
  } catch {
  }
  return n.removeChild(i), Be.removeChild(n), s;
}, Wa = function(e, t) {
  for (var n = t.length; n--; )
    if (e.hasAttribute(t[n]))
      return e.getAttribute(t[n]);
}, Bl = function(e) {
  var t, n;
  try {
    t = e.getBBox();
  } catch {
    t = Ga(e), n = 1;
  }
  return t && (t.width || t.height) || n || (t = Ga(e)), t && !t.width && !t.x && !t.y ? {
    x: +Wa(e, ["x", "cx", "x1"]) || 0,
    y: +Wa(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Hl = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Bl(e));
}, ce = function(e, t) {
  if (t) {
    var n = e.style, i;
    t in Jt && t !== _t && (t = Z), n.removeProperty ? (i = t.substr(0, 2), (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), n.removeProperty(i === "--" ? t : t.replace(Es, "-$1").toLowerCase())) : n.removeAttribute(t);
  }
}, re = function(e, t, n, i, s, a) {
  var o = new mt(e._pt, t, n, 0, 1, a ? Nl : ql);
  return e._pt = o, o.b = i, o.e = s, e._props.push(n), o;
}, Ua = {
  deg: 1,
  rad: 1,
  turn: 1
}, f_ = {
  grid: 1,
  flex: 1
}, de = function r(e, t, n, i) {
  var s = parseFloat(n) || 0, a = (n + "").trim().substr((s + "").length) || "px", o = ye.style, c = Qm.test(t), l = e.tagName.toLowerCase() === "svg", d = (l ? "client" : "offset") + (c ? "Width" : "Height"), h = 100, u = i === "px", f = i === "%", g, p, m, b;
  if (i === a || !s || Ua[i] || Ua[a])
    return s;
  if (a !== "px" && !u && (s = r(e, t, n, "px")), b = e.getCTM && Hl(e), (f || a === "%") && (Jt[t] || ~t.indexOf("adius")))
    return g = b ? e.getBBox()[c ? "width" : "height"] : e[d], tt(f ? s / g * h : s / 100 * g);
  if (o[c ? "width" : "height"] = h + (u ? a : i), p = i !== "rem" && ~t.indexOf("adius") || i === "em" && e.appendChild && !l ? e : e.parentNode, b && (p = (e.ownerSVGElement || {}).parentNode), (!p || p === ne || !p.appendChild) && (p = ne.body), m = p._gsap, m && f && m.width && c && m.time === yt.time && !m.uncache)
    return tt(s / m.width * h);
  if (f && (t === "height" || t === "width")) {
    var x = e.style[t];
    e.style[t] = h + i, g = e[d], x ? e.style[t] = x : ce(e, t);
  } else
    (f || a === "%") && !f_[kt(p, "display")] && (o.position = kt(e, "position")), p === e && (o.position = "static"), p.appendChild(ye), g = ye[d], p.removeChild(ye), o.position = "absolute";
  return c && f && (m = ke(p), m.time = yt.time, m.width = p[d]), tt(u ? g * s / h : g && s ? h / g * s : 0);
}, Wt = function(e, t, n, i) {
  var s;
  return Cs || Wi(), t in Ot && t !== "transform" && (t = Ot[t], ~t.indexOf(",") && (t = t.split(",")[0])), Jt[t] && t !== "transform" ? (s = zn(e, i), s = t !== "transformOrigin" ? s[t] : s.svg ? s.origin : Fr(kt(e, _t)) + " " + s.zOrigin + "px") : (s = e.style[t], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = Ir[t] && Ir[t](e, t, n) || kt(e, t) || il(e, t) || (t === "opacity" ? 1 : 0))), n && !~(s + "").trim().indexOf(" ") ? de(e, t, s, n) + n : s;
}, p_ = function(e, t, n, i) {
  if (!n || n === "none") {
    var s = Qe(t, e, 1), a = s && kt(e, s, 1);
    a && a !== n ? (t = s, n = a) : t === "borderColor" && (n = kt(e, "borderTopColor"));
  }
  var o = new mt(this._pt, e.style, t, 0, 1, zl), c = 0, l = 0, d, h, u, f, g, p, m, b, x, v, _, w;
  if (o.b = n, o.e = i, n += "", i += "", i.substring(0, 6) === "var(--" && (i = kt(e, i.substring(4, i.indexOf(")")))), i === "auto" && (p = e.style[t], e.style[t] = i, i = kt(e, t) || i, p ? e.style[t] = p : ce(e, t)), d = [n, i], kl(d), n = d[0], i = d[1], u = n.match(qe) || [], w = i.match(qe) || [], w.length) {
    for (; h = qe.exec(i); )
      m = h[0], x = i.substring(c, h.index), g ? g = (g + 1) % 5 : (x.substr(-5) === "rgba(" || x.substr(-5) === "hsla(") && (g = 1), m !== (p = u[l++] || "") && (f = parseFloat(p) || 0, _ = p.substr((f + "").length), m.charAt(1) === "=" && (m = Oe(f, m) + _), b = parseFloat(m), v = m.substr((b + "").length), c = qe.lastIndex - v.length, v || (v = v || $t.units[t] || _, c === i.length && (i += v, o.e += v)), _ !== v && (f = de(e, t, p, v) || 0), o._pt = {
        _next: o._pt,
        p: x || l === 1 ? x : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: f,
        c: b - f,
        m: g && g < 4 || t === "zIndex" ? Math.round : 0
      });
    o.c = c < i.length ? i.substring(c, i.length) : "";
  } else
    o.r = t === "display" && i === "none" ? Nl : ql;
  return Qo.test(i) && (o.e = 0), this._pt = o, o;
}, Ka = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, g_ = function(e) {
  var t = e.split(" "), n = t[0], i = t[1] || "50%";
  return (n === "top" || n === "bottom" || i === "left" || i === "right") && (e = n, n = i, i = e), t[0] = Ka[n] || n, t[1] = Ka[i] || i, t.join(" ");
}, m_ = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var n = t.t, i = n.style, s = t.u, a = n._gsap, o, c, l;
    if (s === "all" || s === !0)
      i.cssText = "", c = 1;
    else
      for (s = s.split(","), l = s.length; --l > -1; )
        o = s[l], Jt[o] && (c = 1, o = o === "transformOrigin" ? _t : Z), ce(n, o);
    c && (ce(n, Z), a && (a.svg && n.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", zn(n, 1), a.uncache = 1, Rl(i)));
  }
}, Ir = {
  clearProps: function(e, t, n, i, s) {
    if (s.data !== "isFromStart") {
      var a = e._pt = new mt(e._pt, t, n, 0, 0, m_);
      return a.u = i, a.pr = -10, a.tween = s, e._props.push(n), 1;
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
}, Pn = [1, 0, 0, 1, 0, 0], jl = {}, Vl = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Za = function(e) {
  var t = kt(e, Z);
  return Vl(t) ? Pn : t.substr(7).match(Jo).map(tt);
}, Ts = function(e, t) {
  var n = e._gsap || ke(e), i = e.style, s = Za(e), a, o, c, l;
  return n.svg && e.getAttribute("transform") ? (c = e.transform.baseVal.consolidate().matrix, s = [c.a, c.b, c.c, c.d, c.e, c.f], s.join(",") === "1,0,0,1,0,0" ? Pn : s) : (s === Pn && !e.offsetParent && e !== Be && !n.svg && (c = i.display, i.display = "block", a = e.parentNode, (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (l = 1, o = e.nextElementSibling, Be.appendChild(e)), s = Za(e), c ? i.display = c : ce(e, "display"), l && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : Be.removeChild(e))), t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Ui = function(e, t, n, i, s, a) {
  var o = e._gsap, c = s || Ts(e, !0), l = o.xOrigin || 0, d = o.yOrigin || 0, h = o.xOffset || 0, u = o.yOffset || 0, f = c[0], g = c[1], p = c[2], m = c[3], b = c[4], x = c[5], v = t.split(" "), _ = parseFloat(v[0]) || 0, w = parseFloat(v[1]) || 0, k, $, A, S;
  n ? c !== Pn && ($ = f * m - g * p) && (A = _ * (m / $) + w * (-p / $) + (p * x - m * b) / $, S = _ * (-g / $) + w * (f / $) - (f * x - g * b) / $, _ = A, w = S) : (k = Bl(e), _ = k.x + (~v[0].indexOf("%") ? _ / 100 * k.width : _), w = k.y + (~(v[1] || v[0]).indexOf("%") ? w / 100 * k.height : w)), i || i !== !1 && o.smooth ? (b = _ - l, x = w - d, o.xOffset = h + (b * f + x * p) - b, o.yOffset = u + (b * g + x * m) - x) : o.xOffset = o.yOffset = 0, o.xOrigin = _, o.yOrigin = w, o.smooth = !!i, o.origin = t, o.originIsAbsolute = !!n, e.style[_t] = "0px 0px", a && (re(a, o, "xOrigin", l, _), re(a, o, "yOrigin", d, w), re(a, o, "xOffset", h, o.xOffset), re(a, o, "yOffset", u, o.yOffset)), e.setAttribute("data-svg-origin", _ + " " + w);
}, zn = function(e, t) {
  var n = e._gsap || new Cl(e);
  if ("x" in n && !t && !n.uncache)
    return n;
  var i = e.style, s = n.scaleX < 0, a = "px", o = "deg", c = getComputedStyle(e), l = kt(e, _t) || "0", d, h, u, f, g, p, m, b, x, v, _, w, k, $, A, S, y, C, M, T, L, E, q, I, P, F, N, D, Q, it, Y, X;
  return d = h = u = p = m = b = x = v = _ = 0, f = g = 1, n.svg = !!(e.getCTM && Hl(e)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (i[Z] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[Z] !== "none" ? c[Z] : "")), i.scale = i.rotate = i.translate = "none"), $ = Ts(e, n.svg), n.svg && (n.uncache ? (P = e.getBBox(), l = n.xOrigin - P.x + "px " + (n.yOrigin - P.y) + "px", I = "") : I = !t && e.getAttribute("data-svg-origin"), Ui(e, I || l, !!I || n.originIsAbsolute, n.smooth !== !1, $)), w = n.xOrigin || 0, k = n.yOrigin || 0, $ !== Pn && (C = $[0], M = $[1], T = $[2], L = $[3], d = E = $[4], h = q = $[5], $.length === 6 ? (f = Math.sqrt(C * C + M * M), g = Math.sqrt(L * L + T * T), p = C || M ? ze(M, C) * be : 0, x = T || L ? ze(T, L) * be + p : 0, x && (g *= Math.abs(Math.cos(x * He))), n.svg && (d -= w - (w * C + k * T), h -= k - (w * M + k * L))) : (X = $[6], it = $[7], N = $[8], D = $[9], Q = $[10], Y = $[11], d = $[12], h = $[13], u = $[14], A = ze(X, Q), m = A * be, A && (S = Math.cos(-A), y = Math.sin(-A), I = E * S + N * y, P = q * S + D * y, F = X * S + Q * y, N = E * -y + N * S, D = q * -y + D * S, Q = X * -y + Q * S, Y = it * -y + Y * S, E = I, q = P, X = F), A = ze(-T, Q), b = A * be, A && (S = Math.cos(-A), y = Math.sin(-A), I = C * S - N * y, P = M * S - D * y, F = T * S - Q * y, Y = L * y + Y * S, C = I, M = P, T = F), A = ze(M, C), p = A * be, A && (S = Math.cos(A), y = Math.sin(A), I = C * S + M * y, P = E * S + q * y, M = M * S - C * y, q = q * S - E * y, C = I, E = P), m && Math.abs(m) + Math.abs(p) > 359.9 && (m = p = 0, b = 180 - b), f = tt(Math.sqrt(C * C + M * M + T * T)), g = tt(Math.sqrt(q * q + X * X)), A = ze(E, q), x = Math.abs(A) > 2e-4 ? A * be : 0, _ = Y ? 1 / (Y < 0 ? -Y : Y) : 0), n.svg && (I = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !Vl(kt(e, Z)), I && e.setAttribute("transform", I))), Math.abs(x) > 90 && Math.abs(x) < 270 && (s ? (f *= -1, x += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, x += x <= 0 ? 180 : -180)), t = t || n.uncache, n.x = d - ((n.xPercent = d && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + a, n.y = h - ((n.yPercent = h && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + a, n.z = u + a, n.scaleX = tt(f), n.scaleY = tt(g), n.rotation = tt(p) + o, n.rotationX = tt(m) + o, n.rotationY = tt(b) + o, n.skewX = x + o, n.skewY = v + o, n.transformPerspective = _ + a, (n.zOrigin = parseFloat(l.split(" ")[2]) || !t && n.zOrigin || 0) && (i[_t] = Fr(l)), n.xOffset = n.yOffset = 0, n.force3D = $t.force3D, n.renderTransform = n.svg ? v_ : Ol ? Xl : __, n.uncache = 0, n;
}, Fr = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, mi = function(e, t, n) {
  var i = ot(t);
  return tt(parseFloat(t) + parseFloat(de(e, "x", n + "px", i))) + i;
}, __ = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Xl(e, t);
}, ge = "0deg", an = "0px", me = ") ", Xl = function(e, t) {
  var n = t || this, i = n.xPercent, s = n.yPercent, a = n.x, o = n.y, c = n.z, l = n.rotation, d = n.rotationY, h = n.rotationX, u = n.skewX, f = n.skewY, g = n.scaleX, p = n.scaleY, m = n.transformPerspective, b = n.force3D, x = n.target, v = n.zOrigin, _ = "", w = b === "auto" && e && e !== 1 || b === !0;
  if (v && (h !== ge || d !== ge)) {
    var k = parseFloat(d) * He, $ = Math.sin(k), A = Math.cos(k), S;
    k = parseFloat(h) * He, S = Math.cos(k), a = mi(x, a, $ * S * -v), o = mi(x, o, -Math.sin(k) * -v), c = mi(x, c, A * S * -v + v);
  }
  m !== an && (_ += "perspective(" + m + me), (i || s) && (_ += "translate(" + i + "%, " + s + "%) "), (w || a !== an || o !== an || c !== an) && (_ += c !== an || w ? "translate3d(" + a + ", " + o + ", " + c + ") " : "translate(" + a + ", " + o + me), l !== ge && (_ += "rotate(" + l + me), d !== ge && (_ += "rotateY(" + d + me), h !== ge && (_ += "rotateX(" + h + me), (u !== ge || f !== ge) && (_ += "skew(" + u + ", " + f + me), (g !== 1 || p !== 1) && (_ += "scale(" + g + ", " + p + me), x.style[Z] = _ || "translate(0, 0)";
}, v_ = function(e, t) {
  var n = t || this, i = n.xPercent, s = n.yPercent, a = n.x, o = n.y, c = n.rotation, l = n.skewX, d = n.skewY, h = n.scaleX, u = n.scaleY, f = n.target, g = n.xOrigin, p = n.yOrigin, m = n.xOffset, b = n.yOffset, x = n.forceCSS, v = parseFloat(a), _ = parseFloat(o), w, k, $, A, S;
  c = parseFloat(c), l = parseFloat(l), d = parseFloat(d), d && (d = parseFloat(d), l += d, c += d), c || l ? (c *= He, l *= He, w = Math.cos(c) * h, k = Math.sin(c) * h, $ = Math.sin(c - l) * -u, A = Math.cos(c - l) * u, l && (d *= He, S = Math.tan(l - d), S = Math.sqrt(1 + S * S), $ *= S, A *= S, d && (S = Math.tan(d), S = Math.sqrt(1 + S * S), w *= S, k *= S)), w = tt(w), k = tt(k), $ = tt($), A = tt(A)) : (w = h, A = u, k = $ = 0), (v && !~(a + "").indexOf("px") || _ && !~(o + "").indexOf("px")) && (v = de(f, "x", a, "px"), _ = de(f, "y", o, "px")), (g || p || m || b) && (v = tt(v + g - (g * w + p * $) + m), _ = tt(_ + p - (g * k + p * A) + b)), (i || s) && (S = f.getBBox(), v = tt(v + i / 100 * S.width), _ = tt(_ + s / 100 * S.height)), S = "matrix(" + w + "," + k + "," + $ + "," + A + "," + v + "," + _ + ")", f.setAttribute("transform", S), x && (f.style[Z] = S);
}, b_ = function(e, t, n, i, s) {
  var a = 360, o = rt(s), c = parseFloat(s) * (o && ~s.indexOf("rad") ? be : 1), l = c - i, d = i + l + "deg", h, u;
  return o && (h = s.split("_")[1], h === "short" && (l %= a, l !== l % (a / 2) && (l += l < 0 ? a : -a)), h === "cw" && l < 0 ? l = (l + a * Xa) % a - ~~(l / a) * a : h === "ccw" && l > 0 && (l = (l - a * Xa) % a - ~~(l / a) * a)), e._pt = u = new mt(e._pt, t, n, i, l, e_), u.e = d, u.u = "deg", e._props.push(n), u;
}, Ja = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}, x_ = function(e, t, n) {
  var i = Ja({}, n._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", a = n.style, o, c, l, d, h, u, f, g;
  i.svg ? (l = n.getAttribute("transform"), n.setAttribute("transform", ""), a[Z] = t, o = zn(n, 1), ce(n, Z), n.setAttribute("transform", l)) : (l = getComputedStyle(n)[Z], a[Z] = t, o = zn(n, 1), a[Z] = l);
  for (c in Jt)
    l = i[c], d = o[c], l !== d && s.indexOf(c) < 0 && (f = ot(l), g = ot(d), h = f !== g ? de(n, c, l, g) : parseFloat(l), u = parseFloat(d), e._pt = new mt(e._pt, o, c, h, u - h, Yi), e._pt.u = g || 0, e._props.push(c));
  Ja(o, i);
};
gt("padding,margin,Width,Radius", function(r, e) {
  var t = "Top", n = "Right", i = "Bottom", s = "Left", a = (e < 3 ? [t, n, i, s] : [t + s, t + n, i + n, i + s]).map(function(o) {
    return e < 2 ? r + o : "border" + o + r;
  });
  Ir[e > 1 ? "border" + r : r] = function(o, c, l, d, h) {
    var u, f;
    if (arguments.length < 4)
      return u = a.map(function(g) {
        return Wt(o, g, l);
      }), f = u.join(" "), f.split(u[0]).length === 5 ? u[0] : f;
    u = (d + "").split(" "), f = {}, a.forEach(function(g, p) {
      return f[g] = u[p] = u[p] || u[(p - 1) / 2 | 0];
    }), o.init(c, f, h);
  };
});
var Yl = {
  name: "css",
  register: Wi,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, n, i, s) {
    var a = this._props, o = e.style, c = n.vars.startAt, l, d, h, u, f, g, p, m, b, x, v, _, w, k, $, A, S;
    Cs || Wi(), this.styles = this.styles || Dl(e), A = this.styles.props, this.tween = n;
    for (p in t)
      if (p !== "autoRound" && (d = t[p], !(xt[p] && Ml(p, t, n, i, e, s)))) {
        if (f = typeof d, g = Ir[p], f === "function" && (d = d.call(n, i, e, s), f = typeof d), f === "string" && ~d.indexOf("random(") && (d = En(d)), g)
          g(this, e, p, d, n) && ($ = 1);
        else if (p.substr(0, 2) === "--")
          l = (getComputedStyle(e).getPropertyValue(p) + "").trim(), d += "", ae.lastIndex = 0, ae.test(l) || (m = ot(l), b = ot(d), b ? m !== b && (l = de(e, p, l, b) + b) : m && (d += m)), this.add(o, "setProperty", l, d, i, s, 0, 0, p), a.push(p), A.push(p, 0, o[p]);
        else if (f !== "undefined") {
          if (c && p in c ? (l = typeof c[p] == "function" ? c[p].call(n, i, e, s) : c[p], rt(l) && ~l.indexOf("random(") && (l = En(l)), ot(l + "") || l === "auto" || (l += $t.units[p] || ot(Wt(e, p)) || ""), (l + "").charAt(1) === "=" && (l = Wt(e, p))) : l = Wt(e, p), u = parseFloat(l), x = f === "string" && d.charAt(1) === "=" && d.substr(0, 2), x && (d = d.substr(2)), h = parseFloat(d), p in Ot && (p === "autoAlpha" && (u === 1 && Wt(e, "visibility") === "hidden" && h && (u = 0), A.push("visibility", 0, o.visibility), re(this, o, "visibility", u ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), p !== "scale" && p !== "transform" && (p = Ot[p], ~p.indexOf(",") && (p = p.split(",")[0]))), v = p in Jt, v) {
            if (this.styles.save(p), S = d, f === "string" && d.substring(0, 6) === "var(--") {
              if (d = kt(e, d.substring(4, d.indexOf(")"))), d.substring(0, 5) === "calc(") {
                var y = e.style.perspective;
                e.style.perspective = d, d = kt(e, "perspective"), y ? e.style.perspective = y : ce(e, "perspective");
              }
              h = parseFloat(d);
            }
            if (_ || (w = e._gsap, w.renderTransform && !t.parseTransform || zn(e, t.parseTransform), k = t.smoothOrigin !== !1 && w.smooth, _ = this._pt = new mt(this._pt, o, Z, 0, 1, w.renderTransform, w, 0, -1), _.dep = 1), p === "scale")
              this._pt = new mt(this._pt, w, "scaleY", w.scaleY, (x ? Oe(w.scaleY, x + h) : h) - w.scaleY || 0, Yi), this._pt.u = 0, a.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              A.push(_t, 0, o[_t]), d = g_(d), w.svg ? Ui(e, d, 0, k, 0, this) : (b = parseFloat(d.split(" ")[2]) || 0, b !== w.zOrigin && re(this, w, "zOrigin", w.zOrigin, b), re(this, o, p, Fr(l), Fr(d)));
              continue;
            } else if (p === "svgOrigin") {
              Ui(e, d, 1, k, 0, this);
              continue;
            } else if (p in jl) {
              b_(this, w, p, u, x ? Oe(u, x + d) : d);
              continue;
            } else if (p === "smoothOrigin") {
              re(this, w, "smooth", w.smooth, d);
              continue;
            } else if (p === "force3D") {
              w[p] = d;
              continue;
            } else if (p === "transform") {
              x_(this, d, e);
              continue;
            }
          } else p in o || (p = Qe(p) || p);
          if (v || (h || h === 0) && (u || u === 0) && !t_.test(d) && p in o)
            m = (l + "").substr((u + "").length), h || (h = 0), b = ot(d) || (p in $t.units ? $t.units[p] : m), m !== b && (u = de(e, p, l, b)), this._pt = new mt(this._pt, v ? w : o, p, u, (x ? Oe(u, x + h) : h) - u, !v && (b === "px" || p === "zIndex") && t.autoRound !== !1 ? i_ : Yi), this._pt.u = b || 0, v && S !== d ? (this._pt.b = l, this._pt.e = S, this._pt.r = r_) : m !== b && b !== "%" && (this._pt.b = l, this._pt.r = n_);
          else if (p in o)
            p_.call(this, e, p, l, x ? x + d : d);
          else if (p in e)
            this.add(e, p, l || e[p], x ? x + d : d, i, s);
          else if (p !== "parseTransform") {
            _s(p, d);
            continue;
          }
          v || (p in o ? A.push(p, 0, o[p]) : typeof e[p] == "function" ? A.push(p, 2, e[p]()) : A.push(p, 1, l || e[p])), a.push(p);
        }
      }
    $ && Il(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Ms())
      for (var n = t._pt; n; )
        n.r(e, n.d), n = n._next;
    else
      t.styles.revert();
  },
  get: Wt,
  aliases: Ot,
  getSetter: function(e, t, n) {
    var i = Ot[t];
    return i && i.indexOf(",") < 0 && (t = i), t in Jt && t !== _t && (e._gsap.x || Wt(e, "x")) ? n && Va === n ? t === "scale" ? l_ : o_ : (Va = n || {}) && (t === "scale" ? c_ : d_) : e.style && !ps(e.style[t]) ? s_ : ~t.indexOf("-") ? a_ : As(e, t);
  },
  core: {
    _removeProperty: ce,
    _getMatrix: Ts
  }
};
vt.utils.checkPrefix = Qe;
vt.core.getStyleSaver = Dl;
(function(r, e, t, n) {
  var i = gt(r + "," + e + "," + t, function(s) {
    Jt[s] = 1;
  });
  gt(e, function(s) {
    $t.units[s] = "deg", jl[s] = 1;
  }), Ot[i[13]] = r + "," + e, gt(n, function(s) {
    var a = s.split(":");
    Ot[a[1]] = i[a[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
gt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(r) {
  $t.units[r] = "px";
});
vt.registerPlugin(Yl);
var gn = vt.registerPlugin(Yl) || vt;
gn.core.Tween;
const Ie = {
  input: "#ff2d75",
  hidden: "#7b68ee",
  output: "#00d4ff"
}, on = 36, tr = 100, _i = 200, Qa = 50, vi = 60, y_ = `
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
class w_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_svg", null);
    z(this, "_container", null);
    z(this, "_hasAnimated", !1);
    z(this, "_isAnimating", !1);
    z(this, "_resizeObserver", null);
    z(this, "_timeline", null);
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
    const t = parseInt(this.getAttribute("speed") || "", 10);
    return isNaN(t) ? 600 : t;
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(y_), this._container = document.createElement("div"), this.root.appendChild(this._container), this._initSvg(), this._render(), this._resizeObserver = new ResizeObserver(() => {
      this._isAnimating || this._render();
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), this._resizeObserver = null, this._cancelAnimation();
  }
  handleAttributeChange(t, n, i) {
    n !== i && this._svg && (this._cancelAnimation(), this._hasAnimated = !1, this._render());
  }
  animateIn(t) {
    if (!this._hasAnimated) {
      if (t || this._animateMode === "none") {
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
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    t.setAttribute("role", "img"), t.setAttribute("aria-label", "Neural network"), this._container.appendChild(t), this._svg = G(t);
    const n = this._svg.append("defs"), i = {
      input: Ie.input,
      hidden: Ie.hidden,
      output: Ie.output
    };
    for (const [s, a] of Object.entries(i))
      n.append("filter").attr("id", `glow-${s}`).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%").append("feDropShadow").attr("dx", 0).attr("dy", 0).attr("stdDeviation", 6).attr("flood-color", a).attr("flood-opacity", 0.7);
    this._svg.append("g").attr("class", "connections-group"), this._svg.append("g").attr("class", "nodes-group"), this._svg.append("g").attr("class", "labels-group");
  }
  // ---------------------------------------------------------------------------
  // Layout computation
  // ---------------------------------------------------------------------------
  _computeLayout() {
    const t = this._layers, n = this.isRtl, i = t.length, s = Math.max(...t.map((d) => d.length), 1), a = (i - 1) * _i + vi * 2, o = (s - 1) * tr + Qa + on + 40, c = [], l = [];
    for (let d = 0; d < i; d++) {
      const h = t[d], u = n ? a - vi - d * _i : vi + d * _i, f = (h.length - 1) * tr, g = Qa + ((s - 1) * tr - f) / 2, p = [];
      for (let m = 0; m < h.length; m++)
        p.push({
          layer: d,
          index: m,
          x: u,
          y: g + m * tr,
          label: h[m]
        });
      c.push(p);
    }
    for (let d = 0; d < i - 1; d++)
      for (const h of c[d])
        for (const u of c[d + 1])
          l.push({ source: h, target: u });
    return { nodes: c, connections: l, width: a, height: o };
  }
  _layerColor(t, n) {
    const i = getComputedStyle(this).getPropertyValue("--lv-net-input").trim() || Ie.input, s = getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim() || Ie.hidden, a = getComputedStyle(this).getPropertyValue("--lv-net-output").trim() || Ie.output;
    return t === 0 ? i : t === n - 1 ? a : s;
  }
  _layerType(t, n) {
    return t === 0 ? "input" : t === n - 1 ? "output" : "hidden";
  }
  // ---------------------------------------------------------------------------
  // Render (static)
  // ---------------------------------------------------------------------------
  _render() {
    if (!this._svg) return;
    const { nodes: t, connections: n, width: i, height: s } = this._computeLayout(), a = t.length, o = this._animateMode === "none" || this._hasAnimated, c = this._animateMode !== "none" && !this._hasAnimated;
    this._svg.attr("viewBox", `0 0 ${i} ${s}`);
    const l = this._svg.select(".connections-group");
    l.selectAll("*").remove();
    for (const f of n)
      l.append("line").attr("class", "connection").attr("x1", f.source.x).attr("y1", f.source.y).attr("x2", f.target.x).attr("y2", f.target.y).attr("stroke", "var(--lv-border, #2a2a4a)").attr("stroke-width", 1.5).attr("stroke-opacity", c ? 0.08 : 0.5).attr("data-source-layer", f.source.layer).attr("data-target-layer", f.target.layer);
    const d = this._svg.select(".nodes-group");
    d.selectAll("*").remove();
    for (const f of t)
      for (const g of f) {
        const p = this._layerColor(g.layer, a), m = this._layerType(g.layer, a), b = d.append("g").attr("class", "node").attr("data-layer", g.layer).attr("data-index", g.index).attr("transform", `translate(${g.x},${g.y})`).attr("opacity", c ? 0.15 : 1);
        b.append("circle").attr("class", "node-circle").attr("data-layer", g.layer).attr("r", on).attr("fill", p).attr("stroke", p).attr("stroke-width", 2).attr("fill-opacity", o ? 0.2 : c ? 0.05 : 0.2), o && b.attr("filter", `url(#glow-${m})`), b.append("text").attr("class", "node-label").text(g.label);
      }
    const h = this._svg.select(".labels-group");
    h.selectAll("*").remove();
    const u = this._names;
    for (let f = 0; f < t.length; f++) {
      if (!u[f]) continue;
      const g = t[f][0];
      h.append("text").attr("class", "label").attr("x", g.x).attr("y", g.y - on - 16).text(u[f]);
    }
  }
  // ---------------------------------------------------------------------------
  // Query helpers for GSAP targets (real DOM elements)
  // ---------------------------------------------------------------------------
  /** Returns arrays of node <g> elements grouped by layer index, in order. */
  _getLayerNodeGroups() {
    const t = this._layers.length, n = [];
    for (let i = 0; i < t; i++) {
      const s = Array.from(
        this.root.querySelectorAll(`.node[data-layer="${i}"]`)
      );
      n.push(s);
    }
    return n;
  }
  /** Returns connection <line> elements between two layers (by source/target layer index). */
  _getConnectionElements(t, n) {
    return Array.from(
      this.root.querySelectorAll(
        `.connection[data-source-layer="${t}"][data-target-layer="${n}"]`
      )
    );
  }
  // ---------------------------------------------------------------------------
  // Animation (GSAP timeline)
  // ---------------------------------------------------------------------------
  _cancelAnimation() {
    var t;
    (t = this._timeline) == null || t.kill(), this._timeline = null, this._isAnimating = !1;
  }
  _runAnimation() {
    if (!this._svg) return;
    this._cancelAnimation(), this._isAnimating = !0, this._render();
    const { nodes: t } = this._computeLayout(), n = t.length, i = this._animateMode, s = this._speed, a = i === "backprop", o = a ? "#ff2d75" : "#00d4ff", c = s / 600, l = a ? Array.from({ length: n }, (u, f) => n - 1 - f) : Array.from({ length: n }, (u, f) => f), d = this._getLayerNodeGroups(), h = gn.timeline({
      onComplete: () => {
        this._isAnimating = !1, this._hasAnimated = !0, this.root.querySelectorAll(".node").forEach((g) => {
          const p = parseInt(g.getAttribute("data-layer") || "0", 10), m = this._layerType(p, n);
          gn.set(g, { opacity: 1 }), g.setAttribute("filter", `url(#glow-${m})`);
          const b = g.querySelector("circle");
          b && gn.set(b, { attr: { "fill-opacity": 0.2 } });
        }), this.root.querySelectorAll(".connection").forEach((g) => {
          gn.set(g, { attr: { "stroke-opacity": 0.5 } }), g.setAttribute("stroke", "var(--lv-border, #2a2a4a)");
        });
      }
    });
    this._timeline = h, h.addLabel("start", 0.15), l.forEach((u, f) => {
      const g = this._layerType(u, n), p = d[u];
      if (!p || p.length === 0) return;
      const m = p.map((v) => v.querySelector(".node-circle")).filter(Boolean), b = `layer-${f}`, x = 0.15 + f * (0.4 * c);
      if (h.addLabel(b, x), h.to(p, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, b), h.call(() => {
        p.forEach((v) => {
          v.setAttribute("filter", `url(#glow-${g})`);
        });
      }, [], b), h.to(m, {
        attr: { r: on * 1.15 },
        duration: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, b), h.to(m, {
        attr: { r: on },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.inOut"
      }, `${b}+=0.2`), h.to(m, {
        attr: { "fill-opacity": 0.35 },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, b), h.to(m, {
        attr: { "fill-opacity": 0.2 },
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      }, `${b}+=0.3`), f < l.length - 1) {
        const v = l[f + 1], _ = Math.min(u, v), w = Math.max(u, v), k = this._getConnectionElements(_, w);
        k.length > 0 && (h.to(k, {
          attr: { "stroke-opacity": 0.5 },
          stroke: o,
          duration: 0.25,
          stagger: 0.02,
          ease: "power2.out"
        }, `${b}+=0.15`), h.to(k, {
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
customElements.define("lv-network", w_);
const to = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], k_ = `
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
`, Qt = 120, ln = 32, er = 40;
class $_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_data", null);
    z(this, "_hasAnimated", !1);
    z(this, "_svg", null);
    z(this, "_container", null);
    z(this, "_root", null);
  }
  static get observedAttributes() {
    return ["data", "orientation"];
  }
  get _orientation() {
    return this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical";
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(k_), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", { label: "root" }), this._initSvg(), this._buildHierarchy(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(t, n, i) {
    n !== i && (t === "data" && (this._data = this.jsonAttr("data", { label: "root" }), this._buildHierarchy()), this._svg && this._render(!1));
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0, t ? this._render(!1) : this._render(!0));
  }
  _initSvg() {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    t.setAttribute("role", "img"), t.setAttribute("aria-label", "Decision tree"), this._container.appendChild(t), this._svg = G(t), this._svg.append("g").attr("class", "links-group"), this._svg.append("g").attr("class", "nodes-group");
  }
  _buildHierarchy() {
    this._data && (this._root = Ar(this._data));
  }
  _getVisibleNodes() {
    if (!this._root) return [];
    const t = [], n = (i) => {
      if (t.push(i), !i._collapsed && i.children)
        for (const s of i.children) n(s);
    };
    return n(this._root), t;
  }
  _toggleCollapse(t) {
    !t.data.children || t.data.children.length === 0 || (t._collapsed ? (t._collapsed = !1, t.children = t._children || []) : (t._collapsed = !0, t._children = t.children, t.children = void 0), this._render(!0));
  }
  _render(t) {
    if (!this._svg || !this._root) return;
    const n = this._orientation === "horizontal", i = /* @__PURE__ */ new Map(), s = (y, C) => {
      if (i.set(C, { collapsed: !!y._collapsed, _children: y._children }), y._collapsed && y._children)
        for (let M = 0; M < y._children.length; M++)
          s(y._children[M], `${C}/${M}`);
      if (y.children)
        for (let M = 0; M < y.children.length; M++)
          s(y.children[M], `${C}/${M}`);
    };
    s(this._root, "0"), this._root = Ar(this._data);
    const a = (y, C) => {
      const M = i.get(C);
      if (M != null && M.collapsed && (y._collapsed = !0, y._children = y.children, y.children = void 0), y.children)
        for (let T = 0; T < y.children.length; T++)
          a(y.children[T], `${C}/${T}`);
    };
    a(this._root, "0");
    const o = this._getVisibleNodes(), c = o.filter((y) => !y.children || y.children.length === 0).length, l = so(o, (y) => y.depth) || 0, d = ln + 20, h = Qt + 60;
    let u, f;
    n ? (u = l * h, f = Math.max((c - 1) * d, d)) : (u = Math.max((c - 1) * (Qt + 80), Qt + 80), f = l * h), Gp().size(n ? [f, u] : [u, f]).separation((y, C) => y.parent === C.parent ? 1.5 : 2)(this._root);
    const p = this._root.descendants(), m = this._root.links(), b = u + er * 2 + Qt, x = f + er * 2 + ln;
    this._svg.attr("viewBox", `0 0 ${b} ${x}`);
    const v = er + Qt / 2, _ = er + ln / 2, w = (y) => n ? y.y + v : y.x + v, k = (y) => n ? y.x + _ : y.y + _, $ = this._svg.select(".links-group");
    $.selectAll("*").remove();
    const A = n ? Sg().x((y) => y.y + v).y((y) => y.x + _) : Cg().x((y) => y.x + v).y((y) => y.y + _);
    for (let y = 0; y < m.length; y++) {
      const C = m[y], M = $.append("path").attr("class", "link").attr("d", A(C));
      if (t) {
        const T = M.node().getTotalLength();
        M.attr("stroke-dasharray", T).attr("stroke-dashoffset", T).transition().delay(y * 60 + 100).duration(500).ease($n).attr("stroke-dashoffset", 0);
      }
    }
    const S = this._svg.select(".nodes-group");
    S.selectAll("*").remove();
    for (let y = 0; y < p.length; y++) {
      const C = p[y], M = w(C), T = k(C), L = C.data.children && C.data.children.length > 0, E = !!C._collapsed, I = C.depth % to.length, P = getComputedStyle(this).getPropertyValue(`--lv-chart-${I}`).trim() || to[I], F = S.append("g").attr("transform", `translate(${M},${T})`);
      t && F.attr("opacity", 0).transition().delay(y * 60).duration(400).ease($n).attr("opacity", 1);
      const N = F.append("rect").attr("class", `node-rect ${L ? "has-children" : "leaf"}`).attr("x", -Qt / 2).attr("y", -ln / 2).attr("width", Qt).attr("height", ln).attr("stroke", P);
      F.append("text").attr("class", "node-label").text(C.data.label), L && F.append("text").attr("class", "collapse-indicator").attr("x", Qt / 2 - 12).attr("y", 0).text(E ? "+" : "−"), L && (N.on("click", () => {
        this._toggleCollapse(C);
      }), F.select(".collapse-indicator").on("click", () => {
        this._toggleCollapse(C);
      }));
    }
  }
}
customElements.define("lv-tree", $_);
const A_ = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js", S_ = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;
let bi = null;
class C_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_rendered", !1);
  }
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(S_), this._renderDiagram();
  }
  async _renderDiagram() {
    var i;
    const t = (i = this.textContent) == null ? void 0 : i.trim();
    if (!t) {
      this.render('<div class="mermaid-container"></div>');
      return;
    }
    this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');
    try {
      await tc(A_);
    } catch {
      this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');
      return;
    }
    const n = window.mermaid;
    if (n) {
      bi || (bi = new Promise((s) => {
        const a = getComputedStyle(this), o = a.getPropertyValue("--lv-bg-card").trim() || "#1a1a2e", c = a.getPropertyValue("--lv-text").trim() || "#e4e4ec", l = a.getPropertyValue("--lv-accent").trim() || "#00d4ff", d = a.getPropertyValue("--lv-accent2").trim() || "#7b68ee", h = a.getPropertyValue("--lv-border").trim() || "#2a2a4a";
        n.initialize({
          startOnLoad: !1,
          theme: "base",
          themeVariables: {
            primaryColor: l,
            primaryTextColor: c,
            primaryBorderColor: h,
            secondaryColor: d,
            secondaryTextColor: c,
            tertiaryColor: o,
            lineColor: l,
            textColor: c,
            mainBkg: o,
            nodeBorder: h,
            clusterBkg: o,
            edgeLabelBackground: o,
            fontFamily: "Inter, Segoe UI, sans-serif"
          },
          flowchart: { htmlLabels: !0, curve: "basis" },
          securityLevel: "strict"
        }), s();
      })), await bi;
      try {
        const s = "lv-mermaid-" + Math.random().toString(36).slice(2, 8), { svg: a } = await n.render(s, t), o = this.root.getElementById("output");
        o && (o.innerHTML = a);
      } catch (s) {
        const a = this.root.getElementById("output");
        if (a) {
          const o = String(s.message || s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          a.innerHTML = `<div class="mermaid-error">Diagram error: ${o}</div>`;
        }
      }
    }
  }
}
customElements.define("lv-mermaid", C_);
const M_ = `
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
class E_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_steps", []);
    z(this, "_currentStep", 0);
    z(this, "_playing", !1);
    z(this, "_timer", null);
    z(this, "_nodeStates", /* @__PURE__ */ new Map());
    z(this, "_edgeStates", /* @__PURE__ */ new Map());
    z(this, "_distances", /* @__PURE__ */ new Map());
    z(this, "_queueState", []);
  }
  static get observedAttributes() {
    return ["nodes", "edges", "algorithm", "start", "directed", "speed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(M_), this._build();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopTimer();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    this._hasAnimated || (this._hasAnimated = !0);
  }
  _stopTimer() {
    this._timer !== null && (clearInterval(this._timer), this._timer = null), this._playing = !1;
  }
  _getSpeed() {
    return parseInt(this.getAttribute("speed") || "500", 10);
  }
  _getAlgorithm() {
    return this.getAttribute("algorithm") || "bfs";
  }
  _isDirected() {
    return this.hasAttribute("directed");
  }
  _getNodes() {
    return this.jsonAttr("nodes", []);
  }
  _getEdges() {
    return this.jsonAttr("edges", []);
  }
  _layoutNodes(t) {
    return t.map((a, o) => {
      if (a.x != null && a.y != null) return a;
      const c = 2 * Math.PI * o / t.length - Math.PI / 2;
      return { ...a, x: 250 + 140 * Math.cos(c), y: 180 + 140 * Math.sin(c) };
    });
  }
  _buildAdj(t, n) {
    const i = /* @__PURE__ */ new Map();
    return t.forEach((s) => i.set(s.id, [])), n.forEach((s) => {
      var a, o;
      (a = i.get(s.source)) == null || a.push({ id: s.target, weight: s.weight ?? 1 }), this._isDirected() || (o = i.get(s.target)) == null || o.push({ id: s.source, weight: s.weight ?? 1 });
    }), i;
  }
  _generateSteps(t, n) {
    const i = this._buildAdj(t, n), s = this.getAttribute("start") || (t.length > 0 ? t[0].id : ""), a = this._getAlgorithm(), o = [], c = /* @__PURE__ */ new Set();
    if (a === "bfs") {
      const l = [s];
      for (o.push({ type: "enqueue", node: s }), c.add(s); l.length > 0; ) {
        const d = l.shift();
        o.push({ type: "dequeue", node: d }), o.push({ type: "visit", node: d });
        for (const h of i.get(d) || [])
          c.has(h.id) || (c.add(h.id), o.push({ type: "enqueue", node: h.id, from: d }), l.push(h.id));
      }
    } else if (a === "dfs") {
      const l = [s];
      for (o.push({ type: "enqueue", node: s }); l.length > 0; ) {
        const d = l.pop();
        if (c.has(d)) continue;
        c.add(d), o.push({ type: "dequeue", node: d }), o.push({ type: "visit", node: d });
        const h = i.get(d) || [];
        for (let u = h.length - 1; u >= 0; u--) {
          const f = h[u];
          c.has(f.id) || (o.push({ type: "enqueue", node: f.id, from: d }), l.push(f.id));
        }
      }
    } else if (a === "dijkstra") {
      const l = /* @__PURE__ */ new Map();
      t.forEach((h) => l.set(h.id, 1 / 0)), l.set(s, 0);
      const d = [{ id: s, dist: 0 }];
      for (o.push({ type: "update", node: s, distance: 0 }); d.length > 0; ) {
        d.sort((u, f) => u.dist - f.dist);
        const h = d.shift();
        if (!c.has(h.id)) {
          c.add(h.id), o.push({ type: "visit", node: h.id, distance: h.dist });
          for (const u of i.get(h.id) || []) {
            const f = h.dist + u.weight;
            f < (l.get(u.id) ?? 1 / 0) && (l.set(u.id, f), o.push({ type: "relax", node: u.id, from: h.id, distance: f }), d.push({ id: u.id, dist: f }));
          }
        }
      }
    }
    return o;
  }
  _play() {
    this._playing || (this._playing = !0, this._updateButtons(), this._timer = window.setInterval(() => {
      if (this._currentStep >= this._steps.length) {
        this._stopTimer(), this._updateButtons();
        return;
      }
      this._stepForward();
    }, this._getSpeed()));
  }
  _pause() {
    this._stopTimer(), this._updateButtons();
  }
  _resetState() {
    this._stopTimer(), this._currentStep = 0, this._nodeStates.clear(), this._edgeStates.clear(), this._distances.clear(), this._queueState = [], this._renderGraph(), this._updateInfo(), this._updateButtons();
  }
  _stepForward() {
    if (this._currentStep >= this._steps.length) return;
    const t = this._steps[this._currentStep];
    this._applyStep(t), this._currentStep++, this._renderGraph(), this._updateInfo(), this._currentStep >= this._steps.length && (this._stopTimer(), this._updateButtons());
  }
  _applyStep(t) {
    if (this._getAlgorithm(), t.type === "visit") {
      this._nodeStates.set(t.node, "visited");
      const n = this._queueState.indexOf(t.node);
      n >= 0 && this._queueState.splice(n, 1);
    } else if (t.type === "enqueue") {
      if ((!this._nodeStates.has(t.node) || this._nodeStates.get(t.node) === "unvisited") && this._nodeStates.set(t.node, "queued"), this._queueState.push(t.node), t.from) {
        const n = this._edgeKey(t.from, t.node);
        this._edgeStates.set(n, "active");
      }
    } else if (t.type === "dequeue") {
      this._nodeStates.set(t.node, "visiting");
      const n = this._queueState.indexOf(t.node);
      n >= 0 && this._queueState.splice(n, 1);
    } else if (t.type === "relax") {
      if (t.distance != null && this._distances.set(t.node, t.distance), (!this._nodeStates.has(t.node) || this._nodeStates.get(t.node) !== "visited") && this._nodeStates.set(t.node, "queued"), t.from) {
        const n = this._edgeKey(t.from, t.node);
        this._edgeStates.set(n, "active");
      }
    } else t.type === "update" && t.distance != null && this._distances.set(t.node, t.distance);
  }
  _edgeKey(t, n) {
    return this._isDirected() ? `${t}->${n}` : t < n ? `${t}->${n}` : `${n}->${t}`;
  }
  _nodeColor(t) {
    switch (t) {
      case "queued":
        return "#ffd93d";
      case "visiting":
        return "#00d4ff";
      case "visited":
        return "#22c55e";
      default:
        return "#666";
    }
  }
  _renderGraph() {
    const t = G(this.root.querySelector("svg")), n = this._layoutNodes(this._getNodes()), i = this._getEdges(), s = this._isDirected(), a = this._getAlgorithm() === "dijkstra", o = t.select(".graph-group");
    if (o.empty()) return;
    o.selectAll("*").remove(), s && (t.select("defs").remove(), t.append("defs").append("marker").attr("id", "arrow").attr("viewBox", "0 0 10 10").attr("refX", 28).attr("refY", 5).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto-start-reverse").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", "#666"));
    const c = new Map(n.map((l) => [l.id, l]));
    i.forEach((l) => {
      const d = c.get(l.source), h = c.get(l.target);
      if (!d || !h) return;
      const u = this._edgeKey(l.source, l.target), f = this._edgeStates.get(u) === "active", g = o.append("line").attr("x1", d.x).attr("y1", d.y).attr("x2", h.x).attr("y2", h.y).attr("stroke", f ? "#f59e0b" : "#444").attr("stroke-width", f ? 2.5 : 1.5);
      s && g.attr("marker-end", "url(#arrow)"), l.weight != null && o.append("text").attr("x", (d.x + h.x) / 2).attr("y", (d.y + h.y) / 2 - 8).attr("text-anchor", "middle").attr("font-size", "10px").attr("fill", "#888").text(String(l.weight));
    }), n.forEach((l) => {
      const d = this._nodeStates.get(l.id), h = this._nodeColor(d);
      if (o.append("circle").attr("cx", l.x).attr("cy", l.y).attr("r", 20).attr("fill", h).attr("stroke", "#222").attr("stroke-width", 2), o.append("text").attr("class", "node-label").attr("x", l.x).attr("y", l.y).text(l.id), a && this._distances.has(l.id)) {
        const u = this._distances.get(l.id);
        o.append("text").attr("class", "dist-label").attr("x", l.x).attr("y", l.y - 28).text(u === 1 / 0 ? "∞" : String(u));
      }
    });
  }
  _updateInfo() {
    const t = this.root.querySelector(".info");
    if (!t) return;
    const n = this._getAlgorithm(), i = n === "dfs" ? "Stack" : "Queue";
    t.textContent = `${n.toUpperCase()} — Step ${this._currentStep}/${this._steps.length} | ${i}: [${this._queueState.join(", ")}]`;
  }
  _updateButtons() {
    const t = this.root.querySelector(".btn-play"), n = this.root.querySelector(".btn-step");
    t && (t.textContent = this._playing ? "Pause" : "Play"), n && (n.disabled = this._playing || this._currentStep >= this._steps.length);
  }
  _build() {
    this._stopTimer();
    const t = this._layoutNodes(this._getNodes()), n = this._getEdges();
    if (t.length === 0) {
      this.render('<div class="graph-container"></div>');
      return;
    }
    this._steps = this._generateSteps(t, n), this._currentStep = 0, this._nodeStates.clear(), this._edgeStates.clear(), this._distances.clear(), this._queueState = [];
    const i = 500, s = 400, a = this._getAlgorithm();
    this.render(`<div class="graph-container">
      <svg viewBox="0 0 ${i} ${s}" width="${i}" height="${s}" role="img" aria-label="${a.toUpperCase()} graph algorithm visualization">
        <g class="graph-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`), this._renderGraph(), this._updateInfo(), this.root.querySelector(".btn-play").addEventListener("click", () => {
      this._playing ? this._pause() : this._play();
    }), this.root.querySelector(".btn-step").addEventListener("click", () => {
      this._playing || this._stepForward();
    }), this.root.querySelector(".btn-reset").addEventListener("click", () => this._resetState());
  }
}
customElements.define("lv-graph-algo", E_);
const T_ = `
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
class L_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_step", 0);
    z(this, "_nodes", []);
    z(this, "_totalForward", 0);
    z(this, "_phase", "idle");
  }
  static get observedAttributes() {
    return ["expression", "values", "speed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(T_), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector("svg");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.5s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  _build() {
    const t = this.getAttribute("expression") || "linear", n = this.jsonAttr("values", { x: 2, w: 0.5, b: 0.1, y: 1 });
    this._nodes = this._buildGraph(t, n), this._totalForward = this._nodes.length, this._step = 0, this._phase = "idle", this._renderView();
  }
  _buildGraph(t, n) {
    const i = n.x ?? 2, s = n.w ?? 0.5, a = n.b ?? 0.1, o = n.y ?? 1;
    switch (t) {
      case "sigmoid":
        return [
          { id: "x", op: "x", value: null, grad: null, inputs: [], compute: () => i, localGrad: (c, l) => [l] },
          { id: "w", op: "w", value: null, grad: null, inputs: [], compute: () => s, localGrad: (c, l) => [l] },
          {
            id: "mul",
            op: "×",
            value: null,
            grad: null,
            inputs: [0, 1],
            compute: (c) => c[0] * c[1],
            localGrad: (c, l) => [l * c[1], l * c[0]]
          },
          { id: "b", op: "b", value: null, grad: null, inputs: [], compute: () => a, localGrad: (c, l) => [l] },
          {
            id: "add",
            op: "+",
            value: null,
            grad: null,
            inputs: [2, 3],
            compute: (c) => c[0] + c[1],
            localGrad: (c, l) => [l, l]
          },
          {
            id: "neg",
            op: "neg",
            value: null,
            grad: null,
            inputs: [4],
            compute: (c) => -c[0],
            localGrad: (c, l) => [-l]
          },
          {
            id: "exp",
            op: "exp",
            value: null,
            grad: null,
            inputs: [5],
            compute: (c) => Math.exp(c[0]),
            localGrad: (c, l) => [l * Math.exp(c[0])]
          },
          {
            id: "plus1",
            op: "+1",
            value: null,
            grad: null,
            inputs: [6],
            compute: (c) => c[0] + 1,
            localGrad: (c, l) => [l]
          },
          {
            id: "inv",
            op: "1/x",
            value: null,
            grad: null,
            inputs: [7],
            compute: (c) => 1 / c[0],
            localGrad: (c, l) => [-l / (c[0] * c[0])]
          }
        ];
      case "mse": {
        const c = s * i + a;
        return [
          { id: "y", op: "y", value: null, grad: null, inputs: [], compute: () => o, localGrad: (l, d) => [d] },
          { id: "yhat", op: "ŷ", value: null, grad: null, inputs: [], compute: () => c, localGrad: (l, d) => [d] },
          {
            id: "sub",
            op: "−",
            value: null,
            grad: null,
            inputs: [0, 1],
            compute: (l) => l[0] - l[1],
            localGrad: (l, d) => [d, -d]
          },
          {
            id: "sq",
            op: "x²",
            value: null,
            grad: null,
            inputs: [2],
            compute: (l) => l[0] * l[0],
            localGrad: (l, d) => [2 * l[0] * d]
          },
          {
            id: "half",
            op: "/2",
            value: null,
            grad: null,
            inputs: [3],
            compute: (l) => l[0] / 2,
            localGrad: (l, d) => [d / 2]
          }
        ];
      }
      case "chain":
        return [
          { id: "x", op: "x", value: null, grad: null, inputs: [], compute: () => i, localGrad: (c, l) => [l] },
          {
            id: "sq",
            op: "x²",
            value: null,
            grad: null,
            inputs: [0],
            compute: (c) => c[0] * c[0],
            localGrad: (c, l) => [2 * c[0] * l]
          },
          {
            id: "sin",
            op: "sin",
            value: null,
            grad: null,
            inputs: [1],
            compute: (c) => Math.sin(c[0]),
            localGrad: (c, l) => [Math.cos(c[0]) * l]
          }
        ];
      default:
        return [
          { id: "x", op: "x", value: null, grad: null, inputs: [], compute: () => i, localGrad: (c, l) => [l] },
          { id: "w", op: "w", value: null, grad: null, inputs: [], compute: () => s, localGrad: (c, l) => [l] },
          {
            id: "mul",
            op: "×",
            value: null,
            grad: null,
            inputs: [0, 1],
            compute: (c) => c[0] * c[1],
            localGrad: (c, l) => [l * c[1], l * c[0]]
          },
          { id: "b", op: "b", value: null, grad: null, inputs: [], compute: () => a, localGrad: (c, l) => [l] },
          {
            id: "add",
            op: "+",
            value: null,
            grad: null,
            inputs: [2, 3],
            compute: (c) => c[0] + c[1],
            localGrad: (c, l) => [l, l]
          }
        ];
    }
  }
  _fmt(t) {
    return Math.abs(t) < 1e-3 ? t.toExponential(2) : parseFloat(t.toFixed(4)).toString();
  }
  _stepForward() {
    if (this._phase === "idle" && (this._phase = "forward"), this._phase !== "forward") return;
    if (this._step >= this._nodes.length) {
      this._phase = "backward", this._nodes[this._nodes.length - 1].grad = 1, this._step = this._nodes.length - 1, this._renderView();
      return;
    }
    const t = this._nodes[this._step], n = t.inputs.map((i) => this._nodes[i].value);
    t.value = t.compute(n), this._step++, this._renderView();
  }
  _stepBackward() {
    if (this._phase !== "backward" || this._step < 0) return;
    const t = this._nodes[this._step];
    if (t.inputs.length > 0) {
      const n = t.inputs.map((s) => this._nodes[s].value), i = t.localGrad(n, t.grad);
      t.inputs.forEach((s, a) => {
        this._nodes[s].grad = (this._nodes[s].grad ?? 0) + i[a];
      });
    }
    this._step--, this._renderView();
  }
  _reset() {
    this._nodes.forEach((t) => {
      t.value = null, t.grad = null;
    }), this._step = 0, this._phase = "idle", this._renderView();
  }
  _renderView() {
    var v, _, w;
    const t = this._nodes, n = t.length, i = 650, s = 260, a = 64, o = 58, c = 30, l = (i - 60 - a) / Math.max(n - 1, 1), d = 100;
    let h = "";
    for (let k = 0; k < n; k++) {
      const $ = c + k * l + a / 2;
      for (const A of t[k].inputs) {
        const S = c + A * l + a / 2, y = this._phase === "forward" && this._step === k, C = this._phase === "backward" && this._step === k;
        h += `<line x1="${S}" y1="${d}" x2="${$}" y2="${d}" stroke="${y ? "#3b82f6" : C ? "#ef4444" : "var(--lv-border)"}" stroke-width="${y || C ? 2.5 : 1.5}" marker-end="url(#arrow)"/>`;
      }
    }
    let u = "";
    for (let k = 0; k < n; k++) {
      const $ = c + k * l, A = this._phase === "forward" && this._step === k, S = this._phase === "forward" && k < this._step, y = this._phase === "backward" && this._step === k, C = t[k].grad !== null;
      let M = "var(--lv-border)", T = "var(--lv-bg-card)";
      A ? (M = "#3b82f6", T = "rgba(59,130,246,0.15)") : y ? (M = "#ef4444", T = "rgba(239,68,68,0.15)") : S && (M = "var(--lv-accent)"), u += `<g>
        <rect x="${$}" y="${d - o / 2}" width="${a}" height="${o}" rx="8" ry="8"
          fill="${T}" stroke="${M}" stroke-width="${A || y ? 2.5 : 1.5}"/>
        <text x="${$ + a / 2}" y="${d - 8}" text-anchor="middle" font-size="13" font-weight="600"
          fill="var(--lv-text)">${this._esc(t[k].op)}</text>
        <text x="${$ + a / 2}" y="${d + 14}" text-anchor="middle" font-size="11"
          fill="var(--lv-text-dim)">${t[k].value !== null ? this._fmt(t[k].value) : ""}</text>`, C && (u += `<text x="${$ + a / 2}" y="${d + o / 2 + 18}" text-anchor="middle" font-size="10"
          fill="#ef4444">∂=${this._fmt(t[k].grad)}</text>`), u += "</g>";
    }
    let f = "";
    if (this._phase === "forward" && this._step > 0 && this._step <= n) {
      const k = t[this._step - 1];
      if (k.inputs.length > 0) {
        const $ = k.inputs.map((A) => t[A].op).join(", ");
        f = `Forward: ${k.op}(${$}) = ${this._fmt(k.value)}`;
      } else
        f = `Forward: ${k.op} = ${this._fmt(k.value)}`;
    } else if (this._phase === "backward")
      if (this._step >= 0 && this._step < n) {
        const k = t[this._step];
        f = `Backward: propagating gradient at ${k.op}, ∂=${this._fmt(k.grad)}`;
      } else
        f = "Backward pass complete.";
    else this._phase === "idle" && (f = "Press Step Forward to begin the forward pass.");
    const g = this._phase === "idle" || this._phase === "forward" && this._step <= n, p = this._phase === "backward" && this._step >= 0, m = this._phase === "forward" ? "phase-forward" : this._phase === "backward" ? "phase-backward" : "", b = this._phase === "forward" ? "Forward Pass" : this._phase === "backward" ? "Backward Pass" : "", x = `<div class="bp-container">
      <svg viewBox="0 0 ${i} ${s}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Computational graph">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="var(--lv-text-dim)"/>
          </marker>
        </defs>
        ${h}
        ${u}
      </svg>
      ${b ? `<div class="phase-label ${m}">${b} (step ${this._phase === "forward" ? this._step : n - this._step} / ${n})</div>` : ""}
      <div class="explanation">${f}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-step-fwd" ${g ? "" : "disabled"}>Step Forward ▶</button>
        <button id="btn-step-bwd" ${p ? "" : "disabled"}>Step Backward ◀</button>
      </div>
    </div>`;
    this.render(x), (v = this.root.getElementById("btn-step-fwd")) == null || v.addEventListener("click", () => this._stepForward()), (_ = this.root.getElementById("btn-step-bwd")) == null || _.addEventListener("click", () => this._stepBackward()), (w = this.root.getElementById("btn-reset")) == null || w.addEventListener("click", () => this._reset());
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-backprop-flow", L_);
const P_ = `
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
class z_ extends R {
  constructor() {
    super(...arguments);
    z(this, "_hasAnimated", !1);
    z(this, "_allNodes", []);
    z(this, "_root", null);
    z(this, "_steps", []);
    z(this, "_stepIdx", -1);
    z(this, "_playing", !1);
    z(this, "_timer", null);
  }
  static get observedAttributes() {
    return ["fn", "n", "speed", "show-memo"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(P_), this._build();
  }
  handleAttributeChange() {
    this.isConnected && this._build();
  }
  animateIn(t) {
    if (this._hasAnimated || (this._hasAnimated = !0, t)) return;
    const n = this.root.querySelector(".rt-container");
    n && (n.style.opacity = "0", n.style.transition = "opacity 0.5s ease-out", requestAnimationFrame(() => {
      n.style.opacity = "1";
    }));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timer && clearTimeout(this._timer);
  }
  _build() {
    const t = this.getAttribute("fn") || "fibonacci", n = parseInt(this.getAttribute("n") || "5", 10), i = this.hasAttribute("show-memo");
    this._allNodes = [], this._root = this._buildTree(t, n), this._layoutTree(this._root), this._steps = [], this._stepIdx = -1, this._playing = !1;
    const s = /* @__PURE__ */ new Map();
    this._generateSteps(this._root, s, i), this._allNodes.forEach((a) => a.state = "hidden"), this._renderView();
  }
  _buildTree(t, n) {
    const i = /* @__PURE__ */ new Map(), s = (c, l) => {
      const d = `${c}(${l.join(",")})`, h = { call: d, args: l, children: [], result: null, x: 0, y: 0, state: "hidden" };
      switch (this._allNodes.push(h), c) {
        case "fibonacci":
        case "fib": {
          const u = l[0];
          if (u <= 1)
            h.result = u;
          else {
            const f = s("fib", [u - 1]), g = s("fib", [u - 2]);
            h.children = [f, g], h.result = f.result + g.result;
          }
          break;
        }
        case "factorial":
        case "fact": {
          const u = l[0];
          if (u <= 1)
            h.result = 1;
          else {
            const f = s("fact", [u - 1]);
            h.children = [f], h.result = u * f.result;
          }
          break;
        }
        case "power":
        case "pow": {
          const [u, f] = l.length >= 2 ? l : [2, l[0]];
          if (f === 0)
            h.result = 1, h.call = `pow(${u},0)`;
          else if (f === 1)
            h.result = u, h.call = `pow(${u},1)`;
          else {
            const g = Math.floor(f / 2);
            h.call = `pow(${u},${f})`;
            const p = s("pow", [u, g]);
            if (f % 2 === 0)
              h.children = [p], h.result = p.result * p.result;
            else {
              const m = s("pow", [u, f - 1]);
              h.children = [m], h.result = u * m.result;
            }
          }
          break;
        }
        case "mergesort":
        case "ms": {
          const u = l[0];
          if (u <= 1)
            h.result = u, h.call = `ms(${u})`;
          else {
            h.call = `ms(${u})`;
            const f = Math.floor(u / 2), g = s("ms", [f]), p = s("ms", [u - f]);
            h.children = [g, p], h.result = u;
          }
          break;
        }
        default:
          h.result = n;
      }
      return i.set(d, h.result), h;
    };
    return s(t === "fibonacci" ? "fib" : t === "factorial" ? "fact" : t === "mergesort" ? "ms" : t === "power" ? "pow" : t, t === "power" ? [2, n] : [n]);
  }
  _layoutTree(t) {
    let n = 0;
    const i = (s, a) => {
      if (s.y = a, s.children.length === 0)
        s.x = n++;
      else {
        for (const o of s.children) i(o, a + 1);
        s.x = s.children.reduce((o, c) => o + c.x, 0) / s.children.length;
      }
    };
    i(t, 0);
  }
  _generateSteps(t, n, i, s) {
    const a = this._allNodes.indexOf(t);
    if (i && n.has(t.call)) {
      this._steps.push({ nodeIdx: a, action: "show", edgeFrom: s }), this._steps.push({ nodeIdx: a, action: "memo" });
      return;
    }
    this._steps.push({ nodeIdx: a, action: "show", edgeFrom: s }), this._steps.push({ nodeIdx: a, action: "activate" });
    for (const o of t.children)
      this._generateSteps(o, n, i, a);
    this._steps.push({ nodeIdx: a, action: "compute" }), i && n.set(t.call, !0);
  }
  _doStep() {
    if (this._stepIdx >= this._steps.length - 1) {
      this._playing = !1, this._renderView();
      return;
    }
    this._stepIdx++;
    const t = this._steps[this._stepIdx], n = this._allNodes[t.nodeIdx];
    switch (t.action) {
      case "show":
        n.state = "pending";
        break;
      case "activate":
        n.state = "active";
        break;
      case "compute":
        n.state = "computed";
        break;
      case "memo":
        n.state = "memo";
        break;
    }
    this._renderView();
  }
  _play() {
    if (this._playing) {
      this._playing = !1, this._timer && clearTimeout(this._timer), this._renderView();
      return;
    }
    this._playing = !0;
    const t = parseInt(this.getAttribute("speed") || "400", 10), n = () => {
      if (!this._playing || this._stepIdx >= this._steps.length - 1) {
        this._playing = !1, this._renderView();
        return;
      }
      this._doStep(), this._timer = setTimeout(n, t);
    };
    n();
  }
  _reset() {
    this._playing = !1, this._timer && clearTimeout(this._timer), this._stepIdx = -1, this._allNodes.forEach((t) => t.state = "hidden"), this._renderView();
  }
  _renderView() {
    var w, k, $;
    if (!this._root) return;
    const t = this._allNodes;
    let n = 0, i = 0;
    for (const A of t)
      A.x > n && (n = A.x), A.y > i && (i = A.y);
    const s = 60, a = 40, o = Math.max(70, Math.min(110, 600 / (n + 1))), c = 70, l = (n + 1) * o + s * 2, d = (i + 1) * c + a * 2, h = 56, u = 32, f = (A) => s + A.x * o + o / 2, g = (A) => a + A.y * c + c / 2;
    let p = "";
    for (const A of t)
      if (A.state !== "hidden")
        for (const S of A.children) {
          if (S.state === "hidden") continue;
          const y = S.state === "active", C = y ? "var(--lv-accent)" : "var(--lv-border)";
          p += `<line x1="${f(A)}" y1="${g(A) + u / 2}" x2="${f(S)}" y2="${g(S) - u / 2}" stroke="${C}" stroke-width="${y ? 2 : 1.5}"/>`;
        }
    let m = "";
    const b = {
      hidden: { fill: "transparent", stroke: "transparent" },
      pending: { fill: "var(--lv-bg-card)", stroke: "var(--lv-border)" },
      active: { fill: "rgba(59,130,246,0.15)", stroke: "#3b82f6" },
      computed: { fill: "rgba(34,197,94,0.15)", stroke: "#22c55e" },
      memo: { fill: "rgba(234,179,8,0.2)", stroke: "#eab308" }
    };
    for (const A of t) {
      if (A.state === "hidden") continue;
      const S = f(A), y = g(A), C = b[A.state];
      m += `<g>
        <rect x="${S - h / 2}" y="${y - u / 2}" width="${h}" height="${u}" rx="6" ry="6"
          fill="${C.fill}" stroke="${C.stroke}" stroke-width="1.5"/>
        <text x="${S}" y="${y - 2}" text-anchor="middle" font-size="10" fill="var(--lv-text)">${this._esc(A.call)}</text>`, (A.state === "computed" || A.state === "memo") && (m += `<text x="${S}" y="${y + 12}" text-anchor="middle" font-size="10" font-weight="600"
          fill="${A.state === "memo" ? "#eab308" : "#22c55e"}">${A.state === "memo" ? "memo: " : "= "}${A.result}</text>`), m += "</g>";
    }
    let x = "";
    if (this._stepIdx >= 0 && this._stepIdx < this._steps.length) {
      const A = this._steps[this._stepIdx], S = t[A.nodeIdx];
      A.action === "activate" ? x = `Calling ${S.call}...` : A.action === "compute" ? x = `${S.call} returns ${S.result}` : A.action === "memo" && (x = `Memo hit! ${S.call} = ${S.result}`);
    }
    this._stepIdx >= this._steps.length - 1 && this._stepIdx >= 0 && (x = "Recursion complete.");
    const v = this._stepIdx >= this._steps.length - 1, _ = `<div class="rt-container">
      <svg viewBox="0 0 ${l} ${d}" xmlns="http://www.w3.org/2000/svg" style="max-width:${Math.min(l, 800)}px;" role="img" aria-label="Recursion tree">
        ${p}
        ${m}
      </svg>
      <div class="info">${x}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-play">${this._playing ? "Pause" : "Play"}</button>
        <button id="btn-step" ${v ? "disabled" : ""}>Step</button>
      </div>
      <div class="legend">
        <span><span class="dot" style="background:#888"></span> Pending</span>
        <span><span class="dot" style="background:#3b82f6"></span> Active</span>
        <span><span class="dot" style="background:#22c55e"></span> Computed</span>
        ${this.hasAttribute("show-memo") ? '<span><span class="dot" style="background:#eab308"></span> Memo</span>' : ""}
      </div>
    </div>`;
    this.render(_), (w = this.root.getElementById("btn-play")) == null || w.addEventListener("click", () => this._play()), (k = this.root.getElementById("btn-step")) == null || k.addEventListener("click", () => this._doStep()), ($ = this.root.getElementById("btn-reset")) == null || $.addEventListener("click", () => this._reset());
  }
  _esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-recursion-tree", z_);
export {
  R as LvBaseElement,
  Kl as clamp,
  Zl as colorScale,
  Jl as formatNum,
  O_ as getToken,
  tn as lerp,
  tc as loadScript,
  D_ as loadStylesheet,
  Fs as scrollAnimator,
  B_ as setTheme,
  N_ as simColorScale,
  R_ as uid
};

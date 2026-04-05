var ll = Object.defineProperty;
var us = (n) => {
  throw TypeError(n);
};
var cl = (n, t, e) => t in n ? ll(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var O = (n, t, e) => cl(n, typeof t != "symbol" ? t + "" : t, e), hs = (n, t, e) => t.has(n) || us("Cannot " + e);
var we = (n, t, e) => (hs(n, t, "read from private field"), e ? e.call(n) : t.get(n)), Sn = (n, t, e) => t.has(n) ? us("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), ke = (n, t, e, r) => (hs(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e);
var Le, kn;
class ul {
  constructor() {
    Sn(this, Le);
    Sn(this, kn, /* @__PURE__ */ new WeakSet());
    ke(this, Le, new IntersectionObserver((t) => {
      for (const e of t)
        if (e.isIntersecting && !we(this, kn).has(e.target)) {
          we(this, kn).add(e.target);
          const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches, i = e.target;
          typeof i.animateIn == "function" && (r ? i.animateIn(!0) : i.animateIn(!1));
        }
    }, { threshold: 0.15 }));
  }
  observe(t) {
    we(this, Le).observe(t);
  }
  unobserve(t) {
    we(this, Le).unobserve(t);
  }
}
Le = new WeakMap(), kn = new WeakMap();
const fs = new ul();
var Ut;
class F extends HTMLElement {
  constructor() {
    super();
    // Shadow root setup
    O(this, "root");
    // Re-entrance guard — prevents attributeChangedCallback → _render → attributeChangedCallback loops
    Sn(this, Ut, !1);
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
    ke(this, Ut, !0), this.root.innerHTML = e, ke(this, Ut, !1);
  }
  // Base attributeChangedCallback with re-entrance protection
  // Subclasses override handleAttributeChange() instead
  attributeChangedCallback(e, r, i) {
    we(this, Ut) || (ke(this, Ut, !0), this.handleAttributeChange(e, r, i), ke(this, Ut, !1));
  }
  // Override this in subclasses instead of attributeChangedCallback
  handleAttributeChange(e, r, i) {
  }
  // Called by ScrollAnimator when element enters viewport
  animateIn(e) {
  }
  connectedCallback() {
    fs.observe(this);
  }
  disconnectedCallback() {
    fs.unobserve(this);
  }
}
Ut = new WeakMap();
function Ye(n, t, e) {
  return n + (t - n) * e;
}
function hl(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function fl(n) {
  n = hl(n, 0, 1);
  const t = n < 0.5 ? Math.round(Ye(0, 255, n * 2)) : 255, e = n < 0.5 ? Math.round(Ye(200, 230, n * 2)) : Math.round(Ye(230, 50, (n - 0.5) * 2)), r = n < 0.5 ? Math.round(Ye(83, 60, n * 2)) : Math.round(Ye(60, 80, (n - 0.5) * 2));
  return `rgb(${t},${e},${r})`;
}
function bg(n) {
  return fl((1 - n) / 2);
}
function dl(n) {
  return Number.isInteger(n) ? n.toString() : Math.abs(n) >= 100 ? n.toFixed(0) : Math.abs(n) >= 1 ? n.toFixed(1) : n.toFixed(2);
}
let pl = 0;
function yg(n = "lv") {
  return `${n}-${++pl}`;
}
function wg(n, t) {
  const e = t || document.documentElement;
  return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim();
}
function kg(n, t) {
  n.setAttribute("data-theme", t);
}
const gl = (
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
class _l extends F {
  static get observedAttributes() {
    return ["theme", "dir"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(gl), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("dir") || "ltr";
    this.setAttribute("dir", t), this.render("<slot></slot>");
  }
}
customElements.define("lv-page", _l);
const ml = (
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
class vl extends F {
  static get observedAttributes() {
    return ["number", "title", "subtitle", "gradient"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ml), this._render();
  }
  handleAttributeChange() {
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
customElements.define("lv-hero", vl);
const xl = (
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
class bl extends F {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(xl), this._render();
  }
  handleAttributeChange() {
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
customElements.define("lv-section", bl);
const yl = (
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
class wl extends F {
  static get observedAttributes() {
    return ["variant"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(yl), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    this.root.querySelector(".card") || this.render('<div class="card"><slot></slot></div>');
  }
}
customElements.define("lv-card", wl);
const kl = (
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
class Al extends F {
  static get observedAttributes() {
    return ["cols", "gap"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(kl), this._render();
  }
  handleAttributeChange() {
    this.root.querySelector(".grid") || this._render();
  }
  _render() {
    this.render('<div class="grid"><slot></slot></div>');
  }
}
customElements.define("lv-grid", Al);
const Cl = (
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
class $l extends F {
  static get observedAttributes() {
    return ["label", "active"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Cl), this.render("<slot></slot>"), this.setAttribute("role", "tabpanel");
  }
  handleAttributeChange() {
  }
}
customElements.define("lv-tab", $l);
const Sl = (
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
class Tl extends F {
  constructor() {
    super(...arguments);
    O(this, "_tabs", []);
    O(this, "_buttons", []);
    O(this, "_activeIndex", 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Sl), requestAnimationFrame(() => this._setup());
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
customElements.define("lv-tabs", Tl);
const Ml = (
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
class El extends F {
  static get observedAttributes() {
    return ["prev", "prev-label", "next", "next-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ml), this._render();
  }
  handleAttributeChange() {
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
customElements.define("lv-nav", El);
const Pl = (
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
class zl extends F {
  static get observedAttributes() {
    return ["vs"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Pl), this._render();
  }
  handleAttributeChange() {
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
customElements.define("lv-comparison", zl);
const Ol = `
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
`, Ll = `
  <div class="val"></div>
  <div class="label"></div>
`;
class Nl extends F {
  constructor() {
    super(...arguments);
    O(this, "_observer", null);
  }
  static get observedAttributes() {
    return ["value", "label", "prefix", "suffix", "color", "animated"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles(Ol), this.render(Ll), this._update(), this._setupObserver();
  }
  disconnectedCallback() {
    var e, r;
    (e = super.disconnectedCallback) == null || e.call(this), (r = this._observer) == null || r.disconnect(), this._observer = null;
  }
  handleAttributeChange(e, r, i) {
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
      a.textContent = (this.getAttribute("prefix") || "") + dl(h) + (this.getAttribute("suffix") || ""), l < 1 && requestAnimationFrame(o);
    };
    requestAnimationFrame(o);
  }
}
customElements.define("lv-metric", Nl);
const ds = {
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
}, Rl = `
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
class Dl extends F {
  static get observedAttributes() {
    return ["type", "title"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(Rl), this._render();
  }
  handleAttributeChange(t, e, r) {
    this.root.querySelector(".callout") && this._render();
  }
  _getType() {
    const t = this.getAttribute("type");
    return ds[t] ? t : "info";
  }
  _render() {
    const t = this._getType(), e = ds[t], r = this.getAttribute("title") || "";
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
customElements.define("lv-callout", Dl);
const Fl = `
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
`, Il = `
  <span class="badge"><slot></slot></span>
`;
class ql extends F {
  static get observedAttributes() {
    return ["color", "variant"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(Fl), this.render(Il), this._updateColor();
  }
  handleAttributeChange(t, e, r) {
    t === "color" && this._updateColor();
  }
  _updateColor() {
    const t = this.getAttribute("color");
    t ? this.style.setProperty("--_color", t) : this.style.removeProperty("--_color");
  }
}
customElements.define("lv-badge", ql);
const Hl = `
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`, xa = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css", Bl = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
let Tn = null;
function Vl() {
  return window.katex ? Promise.resolve() : Tn || (Tn = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = xa, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = Bl, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load KaTeX")), document.head.appendChild(r);
  }), Tn);
}
class Xl extends F {
  constructor() {
    super(...arguments);
    O(this, "_source", "");
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(Hl), this._render();
  }
  async _render() {
    try {
      await Vl();
      const e = this.hasAttribute("display"), r = window.katex.renderToString(this._source, {
        displayMode: e,
        throwOnError: !1
      });
      this.root.innerHTML = `<link rel="stylesheet" href="${xa}"><span class="katex-container">${r}</span>`;
    } catch {
      this.root.innerHTML = `<span class="fallback">${this._escapeHtml(this._source)}</span>`;
    }
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-math", Xl);
const Yl = `
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
`, Gl = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js", ba = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";
let Mn = null;
function Ul() {
  return window.hljs ? Promise.resolve() : Mn || (Mn = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = ba, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = Gl, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load highlight.js")), document.head.appendChild(r);
  }), Mn);
}
class Wl extends F {
  constructor() {
    super(...arguments);
    O(this, "_source", "");
  }
  static get observedAttributes() {
    return ["language", "line-numbers"];
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(Yl), this._render();
  }
  async _render() {
    const e = this.getAttribute("language") || "", r = this.hasAttribute("line-numbers");
    let i;
    try {
      await Ul();
      const a = window.hljs;
      e && a.getLanguage(e) ? i = a.highlight(this._source, { language: e }).value : i = a.highlightAuto(this._source).value;
    } catch {
      i = this._escapeHtml(this._source);
    }
    let s;
    r ? s = i.split(`
`).map((o, c) => `<span class="line-num">${c + 1}</span>${o}`).join(`
`) : s = i, this.root.innerHTML = `<link rel="stylesheet" href="${ba}"><div class="code-block"><pre><code>${s}</code></pre></div>`;
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-code", Wl);
const jl = `
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
class Kl extends F {
  static get observedAttributes() {
    return ["data", "labels", "highlight"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(jl), this._render();
  }
  handleAttributeChange() {
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
        const g = t[f][d], p = typeof g == "number" ? this._formatNum(g) : String(g), m = c.has(`${f},${d}`);
        u += `<span class="cell${m ? " highlight" : ""}">${p}</span>`;
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
customElements.define("lv-matrix", Kl);
const Zl = (
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
class Ql extends F {
  constructor() {
    super(...arguments);
    O(this, "_answered", !1);
  }
  static get observedAttributes() {
    return ["question", "options", "correct", "explanation"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Zl), this._render(), this._attachListeners();
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
customElements.define("lv-quiz", Ql);
const Jl = (
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
class tc extends F {
  constructor() {
    super(...arguments);
    O(this, "_revealed", !1);
  }
  static get observedAttributes() {
    return ["label", "revealed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Jl), this._render(), this._attachListeners(), this.hasAttribute("revealed") && this._reveal(!1);
  }
  handleAttributeChange(e) {
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
customElements.define("lv-reveal", tc);
const ec = (
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
class nc extends F {
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
    super.connectedCallback(), this.adoptStyles(ec), this._render(), this._bind(), this._updateTrack();
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
customElements.define("lv-slider", nc);
const rc = (
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
class ic extends F {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(rc), this._render(), this._bind();
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
customElements.define("lv-playground", ic);
const sc = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function ps(n) {
  return String(n).split("").map((t) => sc[parseInt(t)] ?? t).join("");
}
const ac = (
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
class oc extends F {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ac), this._render();
  }
  handleAttributeChange() {
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
customElements.define("lv-step", oc);
const lc = (
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
class cc extends F {
  constructor() {
    super(...arguments);
    O(this, "_current", 0);
    O(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(lc), this._render(), requestAnimationFrame(() => {
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
    i && (i.textContent = `${ps(e + 1)} / ${ps(this._total)}`);
    const s = this.root.querySelector(".prev"), a = this.root.querySelector(".next");
    s && (s.disabled = e === 0), a && (a.disabled = e === this._total - 1);
  }
}
customElements.define("lv-stepper", cc);
const uc = [
  "#00d4ff",
  "#7b68ee",
  "#00c853",
  "#ff9800",
  "#ff2d75",
  "#ffd93d",
  "#69f0ae",
  "#ff6b9d"
], hc = (
  /* css */
  `
  :host { display: block; }

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
class fc extends F {
  constructor() {
    super(...arguments);
    O(this, "_data", []);
    O(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "direction", "sorted"];
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
    this._buildChart();
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(hc), this._data = this.jsonAttr("data", []), this._buildChart();
  }
  handleAttributeChange(e) {
    e === "data" && (this._data = this.jsonAttr("data", [])), this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    this.root.querySelectorAll(".bar-fill").forEach((i, s) => {
      const a = i, o = a.dataset.width || "0%";
      a.classList.add("animate"), setTimeout(() => {
        a.classList.remove("animate"), a.style.width = o;
      }, s * 80 + 50);
    });
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || uc[e % 8];
  }
  _buildChart() {
    const e = this.hasAttribute("sorted") ? [...this._data].sort((s, a) => a.value - s.value) : [...this._data];
    if (!e.length) {
      this.render('<div class="bar-list"></div>');
      return;
    }
    const r = Math.max(...e.map((s) => s.value), 1e-3), i = e.map((s, a) => {
      const o = s.value / r * 100, c = this._getColor(a, s), l = s.tagColor || c, u = typeof s.value == "number" ? s.value % 1 ? s.value.toFixed(2) : s.value.toString() : s.value;
      return `
        <div class="bar-item">
          <div class="bar-header">
            <span class="bar-label">${this._esc(s.label)}</span>
            <span class="bar-meta">
              <span class="bar-value" style="color:${c}">${u}</span>
              ${s.tag ? `<span class="bar-tag" style="background:${l}22;color:${l}">${this._esc(s.tag)}</span>` : ""}
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${this._hasAnimated ? o : 0}%;background:${c}" data-width="${o}%"></div>
          </div>
        </div>
      `;
    }).join("");
    this.render(`<div class="bar-list">${i}</div>`), this._hasAnimated && this.root.querySelectorAll(".bar-fill").forEach((s) => {
      const a = s;
      a.style.width = a.dataset.width || "0%";
    });
  }
  _esc(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-bar-chart", fc);
function qn(n, t) {
  return n == null || t == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function dc(n, t) {
  return n == null || t == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Si(n) {
  let t, e, r;
  n.length !== 2 ? (t = qn, e = (o, c) => qn(n(o), c), r = (o, c) => n(o) - c) : (t = n === qn || n === dc ? n : pc, e = n, r = n);
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
function pc() {
  return 0;
}
function gc(n) {
  return n === null ? NaN : +n;
}
const _c = Si(qn), mc = _c.right;
Si(gc).center;
function jn(n, t) {
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
const vc = Math.sqrt(50), xc = Math.sqrt(10), bc = Math.sqrt(2);
function Kn(n, t, e) {
  const r = (t - n) / Math.max(0, e), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), a = s >= vc ? 10 : s >= xc ? 5 : s >= bc ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, o = Math.round(n * l), c = Math.round(t * l), o / l < n && ++o, c / l > t && --c, l = -l) : (l = Math.pow(10, i) * a, o = Math.round(n / l), c = Math.round(t / l), o * l < n && ++o, c * l > t && --c), c < o && 0.5 <= e && e < 2 ? Kn(n, t, e * 2) : [o, c, l];
}
function yc(n, t, e) {
  if (t = +t, n = +n, e = +e, !(e > 0)) return [];
  if (n === t) return [n];
  const r = t < n, [i, s, a] = r ? Kn(t, n, e) : Kn(n, t, e);
  if (!(s >= i)) return [];
  const o = s - i + 1, c = new Array(o);
  if (r)
    if (a < 0) for (let l = 0; l < o; ++l) c[l] = (s - l) / -a;
    else for (let l = 0; l < o; ++l) c[l] = (s - l) * a;
  else if (a < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -a;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * a;
  return c;
}
function ti(n, t, e) {
  return t = +t, n = +n, e = +e, Kn(n, t, e)[2];
}
function wc(n, t, e) {
  t = +t, n = +n, e = +e;
  const r = t < n, i = r ? ti(t, n, e) : ti(n, t, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function ya(n, t) {
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
function kc(n, t) {
  let e;
  for (const r of n)
    r != null && (e > r || e === void 0 && r >= r) && (e = r);
  return e;
}
function Ac(n) {
  return n;
}
var Pr = 1, zr = 2, ei = 3, Qe = 4, gs = 1e-6;
function Cc(n) {
  return "translate(" + n + ",0)";
}
function $c(n) {
  return "translate(0," + n + ")";
}
function Sc(n) {
  return (t) => +n(t);
}
function Tc(n, t) {
  return t = Math.max(0, n.bandwidth() - t * 2) / 2, n.round() && (t = Math.round(t)), (e) => +n(e) + t;
}
function Mc() {
  return !this.__axis;
}
function wa(n, t) {
  var e = [], r = null, i = null, s = 6, a = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = n === Pr || n === Qe ? -1 : 1, u = n === Qe || n === zr ? "x" : "y", h = n === Pr || n === ei ? Cc : $c;
  function f(d) {
    var g = r ?? (t.ticks ? t.ticks.apply(t, e) : t.domain()), p = i ?? (t.tickFormat ? t.tickFormat.apply(t, e) : Ac), m = Math.max(s, 0) + o, b = t.range(), y = +b[0] + c, v = +b[b.length - 1] + c, _ = (t.bandwidth ? Tc : Sc)(t.copy(), c), x = d.selection ? d.selection() : d, k = x.selectAll(".domain").data([null]), $ = x.selectAll(".tick").data(g, t).order(), A = $.exit(), w = $.enter().append("g").attr("class", "tick"), C = $.select("line"), T = $.select("text");
    k = k.merge(k.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), $ = $.merge(w), C = C.merge(w.append("line").attr("stroke", "currentColor").attr(u + "2", l * s)), T = T.merge(w.append("text").attr("fill", "currentColor").attr(u, l * m).attr("dy", n === Pr ? "0em" : n === ei ? "0.71em" : "0.32em")), d !== x && (k = k.transition(d), $ = $.transition(d), C = C.transition(d), T = T.transition(d), A = A.transition(d).attr("opacity", gs).attr("transform", function(S) {
      return isFinite(S = _(S)) ? h(S + c) : this.getAttribute("transform");
    }), w.attr("opacity", gs).attr("transform", function(S) {
      var M = this.parentNode.__axis;
      return h((M && isFinite(M = M(S)) ? M : _(S)) + c);
    })), A.remove(), k.attr("d", n === Qe || n === zr ? a ? "M" + l * a + "," + y + "H" + c + "V" + v + "H" + l * a : "M" + c + "," + y + "V" + v : a ? "M" + y + "," + l * a + "V" + c + "H" + v + "V" + l * a : "M" + y + "," + c + "H" + v), $.attr("opacity", 1).attr("transform", function(S) {
      return h(_(S) + c);
    }), C.attr(u + "2", l * s), T.attr(u, l * m).text(p), x.filter(Mc).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", n === zr ? "start" : n === Qe ? "end" : "middle"), x.each(function() {
      this.__axis = _;
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
function Zn(n) {
  return wa(ei, n);
}
function Qn(n) {
  return wa(Qe, n);
}
var Ec = { value: () => {
} };
function Ti() {
  for (var n = 0, t = arguments.length, e = {}, r; n < t; ++n) {
    if (!(r = arguments[n] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Hn(e);
}
function Hn(n) {
  this._ = n;
}
function Pc(n, t) {
  return n.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !t.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
Hn.prototype = Ti.prototype = {
  constructor: Hn,
  on: function(n, t) {
    var e = this._, r = Pc(n + "", e), i, s = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (n = r[s]).type) && (i = zc(e[i], n.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (i = (n = r[s]).type) e[i] = _s(e[i], n.name, t);
      else if (t == null) for (i in e) e[i] = _s(e[i], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, t = this._;
    for (var e in t) n[e] = t[e].slice();
    return new Hn(n);
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
function zc(n, t) {
  for (var e = 0, r = n.length, i; e < r; ++e)
    if ((i = n[e]).name === t)
      return i.value;
}
function _s(n, t, e) {
  for (var r = 0, i = n.length; r < i; ++r)
    if (n[r].name === t) {
      n[r] = Ec, n = n.slice(0, r).concat(n.slice(r + 1));
      break;
    }
  return e != null && n.push({ name: t, value: e }), n;
}
var ni = "http://www.w3.org/1999/xhtml";
const ms = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ni,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function br(n) {
  var t = n += "", e = t.indexOf(":");
  return e >= 0 && (t = n.slice(0, e)) !== "xmlns" && (n = n.slice(e + 1)), ms.hasOwnProperty(t) ? { space: ms[t], local: n } : n;
}
function Oc(n) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === ni && t.documentElement.namespaceURI === ni ? t.createElement(n) : t.createElementNS(e, n);
  };
}
function Lc(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function ka(n) {
  var t = br(n);
  return (t.local ? Lc : Oc)(t);
}
function Nc() {
}
function Mi(n) {
  return n == null ? Nc : function() {
    return this.querySelector(n);
  };
}
function Rc(n) {
  typeof n != "function" && (n = Mi(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = new Array(a), c, l, u = 0; u < a; ++u)
      (c = s[u]) && (l = n.call(c, c.__data__, u, s)) && ("__data__" in c && (l.__data__ = c.__data__), o[u] = l);
  return new yt(r, this._parents);
}
function Dc(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function Fc() {
  return [];
}
function Aa(n) {
  return n == null ? Fc : function() {
    return this.querySelectorAll(n);
  };
}
function Ic(n) {
  return function() {
    return Dc(n.apply(this, arguments));
  };
}
function qc(n) {
  typeof n == "function" ? n = Ic(n) : n = Aa(n);
  for (var t = this._groups, e = t.length, r = [], i = [], s = 0; s < e; ++s)
    for (var a = t[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && (r.push(n.call(c, c.__data__, l, a)), i.push(c));
  return new yt(r, i);
}
function Ca(n) {
  return function() {
    return this.matches(n);
  };
}
function $a(n) {
  return function(t) {
    return t.matches(n);
  };
}
var Hc = Array.prototype.find;
function Bc(n) {
  return function() {
    return Hc.call(this.children, n);
  };
}
function Vc() {
  return this.firstElementChild;
}
function Xc(n) {
  return this.select(n == null ? Vc : Bc(typeof n == "function" ? n : $a(n)));
}
var Yc = Array.prototype.filter;
function Gc() {
  return Array.from(this.children);
}
function Uc(n) {
  return function() {
    return Yc.call(this.children, n);
  };
}
function Wc(n) {
  return this.selectAll(n == null ? Gc : Uc(typeof n == "function" ? n : $a(n)));
}
function jc(n) {
  typeof n != "function" && (n = Ca(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new yt(r, this._parents);
}
function Sa(n) {
  return new Array(n.length);
}
function Kc() {
  return new yt(this._enter || this._groups.map(Sa), this._parents);
}
function Jn(n, t) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = t;
}
Jn.prototype = {
  constructor: Jn,
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
function Zc(n) {
  return function() {
    return n;
  };
}
function Qc(n, t, e, r, i, s) {
  for (var a = 0, o, c = t.length, l = s.length; a < l; ++a)
    (o = t[a]) ? (o.__data__ = s[a], r[a] = o) : e[a] = new Jn(n, s[a]);
  for (; a < c; ++a)
    (o = t[a]) && (i[a] = o);
}
function Jc(n, t, e, r, i, s, a) {
  var o, c, l = /* @__PURE__ */ new Map(), u = t.length, h = s.length, f = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = t[o]) && (f[o] = d = a.call(c, c.__data__, o, t) + "", l.has(d) ? i[o] = c : l.set(d, c));
  for (o = 0; o < h; ++o)
    d = a.call(n, s[o], o, s) + "", (c = l.get(d)) ? (r[o] = c, c.__data__ = s[o], l.delete(d)) : e[o] = new Jn(n, s[o]);
  for (o = 0; o < u; ++o)
    (c = t[o]) && l.get(f[o]) === c && (i[o] = c);
}
function tu(n) {
  return n.__data__;
}
function eu(n, t) {
  if (!arguments.length) return Array.from(this, tu);
  var e = t ? Jc : Qc, r = this._parents, i = this._groups;
  typeof n != "function" && (n = Zc(n));
  for (var s = i.length, a = new Array(s), o = new Array(s), c = new Array(s), l = 0; l < s; ++l) {
    var u = r[l], h = i[l], f = h.length, d = nu(n.call(u, u && u.__data__, l, r)), g = d.length, p = o[l] = new Array(g), m = a[l] = new Array(g), b = c[l] = new Array(f);
    e(u, h, p, m, b, d, t);
    for (var y = 0, v = 0, _, x; y < g; ++y)
      if (_ = p[y]) {
        for (y >= v && (v = y + 1); !(x = m[v]) && ++v < g; ) ;
        _._next = x || null;
      }
  }
  return a = new yt(a, r), a._enter = o, a._exit = c, a;
}
function nu(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function ru() {
  return new yt(this._exit || this._groups.map(Sa), this._parents);
}
function iu(n, t, e) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof n == "function" ? (r = n(r), r && (r = r.selection())) : r = r.append(n + ""), t != null && (i = t(i), i && (i = i.selection())), e == null ? s.remove() : e(s), r && i ? r.merge(i).order() : i;
}
function su(n) {
  for (var t = n.selection ? n.selection() : n, e = this._groups, r = t._groups, i = e.length, s = r.length, a = Math.min(i, s), o = new Array(i), c = 0; c < a; ++c)
    for (var l = e[c], u = r[c], h = l.length, f = o[c] = new Array(h), d, g = 0; g < h; ++g)
      (d = l[g] || u[g]) && (f[g] = d);
  for (; c < i; ++c)
    o[c] = e[c];
  return new yt(o, this._parents);
}
function au() {
  for (var n = this._groups, t = -1, e = n.length; ++t < e; )
    for (var r = n[t], i = r.length - 1, s = r[i], a; --i >= 0; )
      (a = r[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function ou(n) {
  n || (n = lu);
  function t(h, f) {
    return h && f ? n(h.__data__, f.__data__) : !h - !f;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var a = e[s], o = a.length, c = i[s] = new Array(o), l, u = 0; u < o; ++u)
      (l = a[u]) && (c[u] = l);
    c.sort(t);
  }
  return new yt(i, this._parents).order();
}
function lu(n, t) {
  return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function cu() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function uu() {
  return Array.from(this);
}
function hu() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length; i < s; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function fu() {
  let n = 0;
  for (const t of this) ++n;
  return n;
}
function du() {
  return !this.node();
}
function pu(n) {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var i = t[e], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && n.call(o, o.__data__, s, i);
  return this;
}
function gu(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function _u(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function mu(n, t) {
  return function() {
    this.setAttribute(n, t);
  };
}
function vu(n, t) {
  return function() {
    this.setAttributeNS(n.space, n.local, t);
  };
}
function xu(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(n) : this.setAttribute(n, e);
  };
}
function bu(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
  };
}
function yu(n, t) {
  var e = br(n);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((t == null ? e.local ? _u : gu : typeof t == "function" ? e.local ? bu : xu : e.local ? vu : mu)(e, t));
}
function Ta(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function wu(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function ku(n, t, e) {
  return function() {
    this.style.setProperty(n, t, e);
  };
}
function Au(n, t, e) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
  };
}
function Cu(n, t, e) {
  return arguments.length > 1 ? this.each((t == null ? wu : typeof t == "function" ? Au : ku)(n, t, e ?? "")) : Ne(this.node(), n);
}
function Ne(n, t) {
  return n.style.getPropertyValue(t) || Ta(n).getComputedStyle(n, null).getPropertyValue(t);
}
function $u(n) {
  return function() {
    delete this[n];
  };
}
function Su(n, t) {
  return function() {
    this[n] = t;
  };
}
function Tu(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[n] : this[n] = e;
  };
}
function Mu(n, t) {
  return arguments.length > 1 ? this.each((t == null ? $u : typeof t == "function" ? Tu : Su)(n, t)) : this.node()[n];
}
function Ma(n) {
  return n.trim().split(/^|\s+/);
}
function Ei(n) {
  return n.classList || new Ea(n);
}
function Ea(n) {
  this._node = n, this._names = Ma(n.getAttribute("class") || "");
}
Ea.prototype = {
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
function Pa(n, t) {
  for (var e = Ei(n), r = -1, i = t.length; ++r < i; ) e.add(t[r]);
}
function za(n, t) {
  for (var e = Ei(n), r = -1, i = t.length; ++r < i; ) e.remove(t[r]);
}
function Eu(n) {
  return function() {
    Pa(this, n);
  };
}
function Pu(n) {
  return function() {
    za(this, n);
  };
}
function zu(n, t) {
  return function() {
    (t.apply(this, arguments) ? Pa : za)(this, n);
  };
}
function Ou(n, t) {
  var e = Ma(n + "");
  if (arguments.length < 2) {
    for (var r = Ei(this.node()), i = -1, s = e.length; ++i < s; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? zu : t ? Eu : Pu)(e, t));
}
function Lu() {
  this.textContent = "";
}
function Nu(n) {
  return function() {
    this.textContent = n;
  };
}
function Ru(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Du(n) {
  return arguments.length ? this.each(n == null ? Lu : (typeof n == "function" ? Ru : Nu)(n)) : this.node().textContent;
}
function Fu() {
  this.innerHTML = "";
}
function Iu(n) {
  return function() {
    this.innerHTML = n;
  };
}
function qu(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Hu(n) {
  return arguments.length ? this.each(n == null ? Fu : (typeof n == "function" ? qu : Iu)(n)) : this.node().innerHTML;
}
function Bu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vu() {
  return this.each(Bu);
}
function Xu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Yu() {
  return this.each(Xu);
}
function Gu(n) {
  var t = typeof n == "function" ? n : ka(n);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Uu() {
  return null;
}
function Wu(n, t) {
  var e = typeof n == "function" ? n : ka(n), r = t == null ? Uu : typeof t == "function" ? t : Mi(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ju() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function Ku() {
  return this.each(ju);
}
function Zu() {
  var n = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function Qu() {
  var n = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function Ju(n) {
  return this.select(n ? Qu : Zu);
}
function th(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function eh(n) {
  return function(t) {
    n.call(this, t, this.__data__);
  };
}
function nh(n) {
  return n.trim().split(/^|\s+/).map(function(t) {
    var e = "", r = t.indexOf(".");
    return r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: e };
  });
}
function rh(n) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e = 0, r = -1, i = t.length, s; e < i; ++e)
        s = t[e], (!n.type || s.type === n.type) && s.name === n.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++r] = s;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function ih(n, t, e) {
  return function() {
    var r = this.__on, i, s = eh(t);
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
function sh(n, t, e) {
  var r = nh(n + ""), i, s = r.length, a;
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
  for (o = t ? ih : rh, i = 0; i < s; ++i) this.each(o(r[i], t, e));
  return this;
}
function Oa(n, t, e) {
  var r = Ta(n), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(t, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(t, !1, !1)), n.dispatchEvent(i);
}
function ah(n, t) {
  return function() {
    return Oa(this, n, t);
  };
}
function oh(n, t) {
  return function() {
    return Oa(this, n, t.apply(this, arguments));
  };
}
function lh(n, t) {
  return this.each((typeof t == "function" ? oh : ah)(n, t));
}
function* ch() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length, a; i < s; ++i)
      (a = r[i]) && (yield a);
}
var La = [null];
function yt(n, t) {
  this._groups = n, this._parents = t;
}
function An() {
  return new yt([[document.documentElement]], La);
}
function uh() {
  return this;
}
yt.prototype = An.prototype = {
  constructor: yt,
  select: Rc,
  selectAll: qc,
  selectChild: Xc,
  selectChildren: Wc,
  filter: jc,
  data: eu,
  enter: Kc,
  exit: ru,
  join: iu,
  merge: su,
  selection: uh,
  order: au,
  sort: ou,
  call: cu,
  nodes: uu,
  node: hu,
  size: fu,
  empty: du,
  each: pu,
  attr: yu,
  style: Cu,
  property: Mu,
  classed: Ou,
  text: Du,
  html: Hu,
  raise: Vu,
  lower: Yu,
  append: Gu,
  insert: Wu,
  remove: Ku,
  clone: Ju,
  datum: th,
  on: sh,
  dispatch: lh,
  [Symbol.iterator]: ch
};
function K(n) {
  return typeof n == "string" ? new yt([[document.querySelector(n)]], [document.documentElement]) : new yt([[n]], La);
}
function hh(n) {
  let t;
  for (; t = n.sourceEvent; ) n = t;
  return n;
}
function ri(n, t) {
  if (n = hh(n), t === void 0 && (t = n.currentTarget), t) {
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
const fh = { passive: !1 }, cn = { capture: !0, passive: !1 };
function Or(n) {
  n.stopImmediatePropagation();
}
function Me(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function dh(n) {
  var t = n.document.documentElement, e = K(n).on("dragstart.drag", Me, cn);
  "onselectstart" in t ? e.on("selectstart.drag", Me, cn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ph(n, t) {
  var e = n.document.documentElement, r = K(n).on("dragstart.drag", null);
  t && (r.on("click.drag", Me, cn), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
const En = (n) => () => n;
function ii(n, {
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
ii.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function gh(n) {
  return !n.ctrlKey && !n.button;
}
function _h() {
  return this.parentNode;
}
function mh(n, t) {
  return t ?? { x: n.x, y: n.y };
}
function vh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function xh() {
  var n = gh, t = _h, e = mh, r = vh, i = {}, s = Ti("start", "drag", "end"), a = 0, o, c, l, u, h = 0;
  function f(_) {
    _.on("mousedown.drag", d).filter(r).on("touchstart.drag", m).on("touchmove.drag", b, fh).on("touchend.drag touchcancel.drag", y).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(_, x) {
    if (!(u || !n.call(this, _, x))) {
      var k = v(this, t.call(this, _, x), _, x, "mouse");
      k && (K(_.view).on("mousemove.drag", g, cn).on("mouseup.drag", p, cn), dh(_.view), Or(_), l = !1, o = _.clientX, c = _.clientY, k("start", _));
    }
  }
  function g(_) {
    if (Me(_), !l) {
      var x = _.clientX - o, k = _.clientY - c;
      l = x * x + k * k > h;
    }
    i.mouse("drag", _);
  }
  function p(_) {
    K(_.view).on("mousemove.drag mouseup.drag", null), ph(_.view, l), Me(_), i.mouse("end", _);
  }
  function m(_, x) {
    if (n.call(this, _, x)) {
      var k = _.changedTouches, $ = t.call(this, _, x), A = k.length, w, C;
      for (w = 0; w < A; ++w)
        (C = v(this, $, _, x, k[w].identifier, k[w])) && (Or(_), C("start", _, k[w]));
    }
  }
  function b(_) {
    var x = _.changedTouches, k = x.length, $, A;
    for ($ = 0; $ < k; ++$)
      (A = i[x[$].identifier]) && (Me(_), A("drag", _, x[$]));
  }
  function y(_) {
    var x = _.changedTouches, k = x.length, $, A;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), $ = 0; $ < k; ++$)
      (A = i[x[$].identifier]) && (Or(_), A("end", _, x[$]));
  }
  function v(_, x, k, $, A, w) {
    var C = s.copy(), T = ri(w || k, x), S, M, E;
    if ((E = e.call(_, new ii("beforestart", {
      sourceEvent: k,
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
        var B = T, I;
        switch (z) {
          case "start":
            i[A] = P, I = a++;
            break;
          case "end":
            delete i[A], --a;
          // falls through
          case "drag":
            T = ri(D || L, x), I = a;
            break;
        }
        C.call(
          z,
          _,
          new ii(z, {
            sourceEvent: L,
            subject: E,
            target: f,
            identifier: A,
            active: I,
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
  return f.filter = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : En(!!_), f) : n;
  }, f.container = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : En(_), f) : t;
  }, f.subject = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : En(_), f) : e;
  }, f.touchable = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : En(!!_), f) : r;
  }, f.on = function() {
    var _ = s.on.apply(s, arguments);
    return _ === s ? f : _;
  }, f.clickDistance = function(_) {
    return arguments.length ? (h = (_ = +_) * _, f) : Math.sqrt(h);
  }, f;
}
function Pi(n, t, e) {
  n.prototype = t.prototype = e, e.constructor = n;
}
function Na(n, t) {
  var e = Object.create(n.prototype);
  for (var r in t) e[r] = t[r];
  return e;
}
function Cn() {
}
var un = 0.7, tr = 1 / un, Ee = "\\s*([+-]?\\d+)\\s*", hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", bh = /^#([0-9a-f]{3,8})$/, yh = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), wh = new RegExp(`^rgb\\(${Rt},${Rt},${Rt}\\)$`), kh = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${hn}\\)$`), Ah = new RegExp(`^rgba\\(${Rt},${Rt},${Rt},${hn}\\)$`), Ch = new RegExp(`^hsl\\(${hn},${Rt},${Rt}\\)$`), $h = new RegExp(`^hsla\\(${hn},${Rt},${Rt},${hn}\\)$`), vs = {
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
Pi(Cn, Jt, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xs,
  // Deprecated! Use color.formatHex.
  formatHex: xs,
  formatHex8: Sh,
  formatHsl: Th,
  formatRgb: bs,
  toString: bs
});
function xs() {
  return this.rgb().formatHex();
}
function Sh() {
  return this.rgb().formatHex8();
}
function Th() {
  return Ra(this).formatHsl();
}
function bs() {
  return this.rgb().formatRgb();
}
function Jt(n) {
  var t, e;
  return n = (n + "").trim().toLowerCase(), (t = bh.exec(n)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? ys(t) : e === 3 ? new lt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : e === 8 ? Pn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : e === 4 ? Pn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = yh.exec(n)) ? new lt(t[1], t[2], t[3], 1) : (t = wh.exec(n)) ? new lt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = kh.exec(n)) ? Pn(t[1], t[2], t[3], t[4]) : (t = Ah.exec(n)) ? Pn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Ch.exec(n)) ? As(t[1], t[2] / 100, t[3] / 100, 1) : (t = $h.exec(n)) ? As(t[1], t[2] / 100, t[3] / 100, t[4]) : vs.hasOwnProperty(n) ? ys(vs[n]) : n === "transparent" ? new lt(NaN, NaN, NaN, 0) : null;
}
function ys(n) {
  return new lt(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function Pn(n, t, e, r) {
  return r <= 0 && (n = t = e = NaN), new lt(n, t, e, r);
}
function Mh(n) {
  return n instanceof Cn || (n = Jt(n)), n ? (n = n.rgb(), new lt(n.r, n.g, n.b, n.opacity)) : new lt();
}
function er(n, t, e, r) {
  return arguments.length === 1 ? Mh(n) : new lt(n, t, e, r ?? 1);
}
function lt(n, t, e, r) {
  this.r = +n, this.g = +t, this.b = +e, this.opacity = +r;
}
Pi(lt, er, Na(Cn, {
  brighter(n) {
    return n = n == null ? tr : Math.pow(tr, n), new lt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? un : Math.pow(un, n), new lt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new lt(fe(this.r), fe(this.g), fe(this.b), nr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ws,
  // Deprecated! Use color.formatHex.
  formatHex: ws,
  formatHex8: Eh,
  formatRgb: ks,
  toString: ks
}));
function ws() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}`;
}
function Eh() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}${ue((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ks() {
  const n = nr(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${fe(this.r)}, ${fe(this.g)}, ${fe(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function nr(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function fe(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function ue(n) {
  return n = fe(n), (n < 16 ? "0" : "") + n.toString(16);
}
function As(n, t, e, r) {
  return r <= 0 ? n = t = e = NaN : e <= 0 || e >= 1 ? n = t = NaN : t <= 0 && (n = NaN), new Mt(n, t, e, r);
}
function Ra(n) {
  if (n instanceof Mt) return new Mt(n.h, n.s, n.l, n.opacity);
  if (n instanceof Cn || (n = Jt(n)), !n) return new Mt();
  if (n instanceof Mt) return n;
  n = n.rgb();
  var t = n.r / 255, e = n.g / 255, r = n.b / 255, i = Math.min(t, e, r), s = Math.max(t, e, r), a = NaN, o = s - i, c = (s + i) / 2;
  return o ? (t === s ? a = (e - r) / o + (e < r) * 6 : e === s ? a = (r - t) / o + 2 : a = (t - e) / o + 4, o /= c < 0.5 ? s + i : 2 - s - i, a *= 60) : o = c > 0 && c < 1 ? 0 : a, new Mt(a, o, c, n.opacity);
}
function Ph(n, t, e, r) {
  return arguments.length === 1 ? Ra(n) : new Mt(n, t, e, r ?? 1);
}
function Mt(n, t, e, r) {
  this.h = +n, this.s = +t, this.l = +e, this.opacity = +r;
}
Pi(Mt, Ph, Na(Cn, {
  brighter(n) {
    return n = n == null ? tr : Math.pow(tr, n), new Mt(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? un : Math.pow(un, n), new Mt(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, t = isNaN(n) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * t, i = 2 * e - r;
    return new lt(
      Lr(n >= 240 ? n - 240 : n + 120, i, r),
      Lr(n, i, r),
      Lr(n < 120 ? n + 240 : n - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Mt(Cs(this.h), zn(this.s), zn(this.l), nr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = nr(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${Cs(this.h)}, ${zn(this.s) * 100}%, ${zn(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function Cs(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function zn(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function Lr(n, t, e) {
  return (n < 60 ? t + (e - t) * n / 60 : n < 180 ? e : n < 240 ? t + (e - t) * (240 - n) / 60 : t) * 255;
}
function zh(n, t, e, r, i) {
  var s = n * n, a = s * n;
  return ((1 - 3 * n + 3 * s - a) * t + (4 - 6 * s + 3 * a) * e + (1 + 3 * n + 3 * s - 3 * a) * r + a * i) / 6;
}
function Oh(n) {
  var t = n.length - 1;
  return function(e) {
    var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, t - 1) : Math.floor(e * t), i = n[r], s = n[r + 1], a = r > 0 ? n[r - 1] : 2 * i - s, o = r < t - 1 ? n[r + 2] : 2 * s - i;
    return zh((e - r / t) * t, a, i, s, o);
  };
}
const zi = (n) => () => n;
function Lh(n, t) {
  return function(e) {
    return n + e * t;
  };
}
function Nh(n, t, e) {
  return n = Math.pow(n, e), t = Math.pow(t, e) - n, e = 1 / e, function(r) {
    return Math.pow(n + r * t, e);
  };
}
function Rh(n) {
  return (n = +n) == 1 ? Da : function(t, e) {
    return e - t ? Nh(t, e, n) : zi(isNaN(t) ? e : t);
  };
}
function Da(n, t) {
  var e = t - n;
  return e ? Lh(n, e) : zi(isNaN(n) ? t : n);
}
const rr = (function n(t) {
  var e = Rh(t);
  function r(i, s) {
    var a = e((i = er(i)).r, (s = er(s)).r), o = e(i.g, s.g), c = e(i.b, s.b), l = Da(i.opacity, s.opacity);
    return function(u) {
      return i.r = a(u), i.g = o(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = n, r;
})(1);
function Dh(n) {
  return function(t) {
    var e = t.length, r = new Array(e), i = new Array(e), s = new Array(e), a, o;
    for (a = 0; a < e; ++a)
      o = er(t[a]), r[a] = o.r || 0, i[a] = o.g || 0, s[a] = o.b || 0;
    return r = n(r), i = n(i), s = n(s), o.opacity = 1, function(c) {
      return o.r = r(c), o.g = i(c), o.b = s(c), o + "";
    };
  };
}
var Fh = Dh(Oh);
function Ih(n, t) {
  t || (t = []);
  var e = n ? Math.min(t.length, n.length) : 0, r = t.slice(), i;
  return function(s) {
    for (i = 0; i < e; ++i) r[i] = n[i] * (1 - s) + t[i] * s;
    return r;
  };
}
function qh(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function Hh(n, t) {
  var e = t ? t.length : 0, r = n ? Math.min(e, n.length) : 0, i = new Array(r), s = new Array(e), a;
  for (a = 0; a < r; ++a) i[a] = xe(n[a], t[a]);
  for (; a < e; ++a) s[a] = t[a];
  return function(o) {
    for (a = 0; a < r; ++a) s[a] = i[a](o);
    return s;
  };
}
function Bh(n, t) {
  var e = /* @__PURE__ */ new Date();
  return n = +n, t = +t, function(r) {
    return e.setTime(n * (1 - r) + t * r), e;
  };
}
function Tt(n, t) {
  return n = +n, t = +t, function(e) {
    return n * (1 - e) + t * e;
  };
}
function Vh(n, t) {
  var e = {}, r = {}, i;
  (n === null || typeof n != "object") && (n = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in n ? e[i] = xe(n[i], t[i]) : r[i] = t[i];
  return function(s) {
    for (i in e) r[i] = e[i](s);
    return r;
  };
}
var si = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Nr = new RegExp(si.source, "g");
function Xh(n) {
  return function() {
    return n;
  };
}
function Yh(n) {
  return function(t) {
    return n(t) + "";
  };
}
function Fa(n, t) {
  var e = si.lastIndex = Nr.lastIndex = 0, r, i, s, a = -1, o = [], c = [];
  for (n = n + "", t = t + ""; (r = si.exec(n)) && (i = Nr.exec(t)); )
    (s = i.index) > e && (s = t.slice(e, s), o[a] ? o[a] += s : o[++a] = s), (r = r[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, c.push({ i: a, x: Tt(r, i) })), e = Nr.lastIndex;
  return e < t.length && (s = t.slice(e), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? c[0] ? Yh(c[0].x) : Xh(t) : (t = c.length, function(l) {
    for (var u = 0, h; u < t; ++u) o[(h = c[u]).i] = h.x(l);
    return o.join("");
  });
}
function xe(n, t) {
  var e = typeof t, r;
  return t == null || e === "boolean" ? zi(t) : (e === "number" ? Tt : e === "string" ? (r = Jt(t)) ? (t = r, rr) : Fa : t instanceof Jt ? rr : t instanceof Date ? Bh : qh(t) ? Ih : Array.isArray(t) ? Hh : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Vh : Tt)(n, t);
}
function Oi(n, t) {
  return n = +n, t = +t, function(e) {
    return Math.round(n * (1 - e) + t * e);
  };
}
var $s = 180 / Math.PI, ai = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ia(n, t, e, r, i, s) {
  var a, o, c;
  return (a = Math.sqrt(n * n + t * t)) && (n /= a, t /= a), (c = n * e + t * r) && (e -= n * c, r -= t * c), (o = Math.sqrt(e * e + r * r)) && (e /= o, r /= o, c /= o), n * r < t * e && (n = -n, t = -t, c = -c, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(t, n) * $s,
    skewX: Math.atan(c) * $s,
    scaleX: a,
    scaleY: o
  };
}
var On;
function Gh(n) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return t.isIdentity ? ai : Ia(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Uh(n) {
  return n == null || (On || (On = document.createElementNS("http://www.w3.org/2000/svg", "g")), On.setAttribute("transform", n), !(n = On.transform.baseVal.consolidate())) ? ai : (n = n.matrix, Ia(n.a, n.b, n.c, n.d, n.e, n.f));
}
function qa(n, t, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, u, h, f, d, g) {
    if (l !== h || u !== f) {
      var p = d.push("translate(", null, t, null, e);
      g.push({ i: p - 4, x: Tt(l, h) }, { i: p - 2, x: Tt(u, f) });
    } else (h || f) && d.push("translate(" + h + t + f + e);
  }
  function a(l, u, h, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: Tt(l, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function o(l, u, h, f) {
    l !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: Tt(l, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function c(l, u, h, f, d, g) {
    if (l !== h || u !== f) {
      var p = d.push(i(d) + "scale(", null, ",", null, ")");
      g.push({ i: p - 4, x: Tt(l, h) }, { i: p - 2, x: Tt(u, f) });
    } else (h !== 1 || f !== 1) && d.push(i(d) + "scale(" + h + "," + f + ")");
  }
  return function(l, u) {
    var h = [], f = [];
    return l = n(l), u = n(u), s(l.translateX, l.translateY, u.translateX, u.translateY, h, f), a(l.rotate, u.rotate, h, f), o(l.skewX, u.skewX, h, f), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f), l = u = null, function(d) {
      for (var g = -1, p = f.length, m; ++g < p; ) h[(m = f[g]).i] = m.x(d);
      return h.join("");
    };
  };
}
var Wh = qa(Gh, "px, ", "px)", "deg)"), jh = qa(Uh, ", ", ")", ")");
function Kh(n, t) {
  t === void 0 && (t = n, n = xe);
  for (var e = 0, r = t.length - 1, i = t[0], s = new Array(r < 0 ? 0 : r); e < r; ) s[e] = n(i, i = t[++e]);
  return function(a) {
    var o = Math.max(0, Math.min(r - 1, Math.floor(a *= r)));
    return s[o](a - o);
  };
}
var Re = 0, Je = 0, Ge = 0, Ha = 1e3, ir, tn, sr = 0, me = 0, yr = 0, fn = typeof performance == "object" && performance.now ? performance : Date, Ba = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Li() {
  return me || (Ba(Zh), me = fn.now() + yr);
}
function Zh() {
  me = 0;
}
function ar() {
  this._call = this._time = this._next = null;
}
ar.prototype = Va.prototype = {
  constructor: ar,
  restart: function(n, t, e) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    e = (e == null ? Li() : +e) + (t == null ? 0 : +t), !this._next && tn !== this && (tn ? tn._next = this : ir = this, tn = this), this._call = n, this._time = e, oi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, oi());
  }
};
function Va(n, t, e) {
  var r = new ar();
  return r.restart(n, t, e), r;
}
function Qh() {
  Li(), ++Re;
  for (var n = ir, t; n; )
    (t = me - n._time) >= 0 && n._call.call(void 0, t), n = n._next;
  --Re;
}
function Ss() {
  me = (sr = fn.now()) + yr, Re = Je = 0;
  try {
    Qh();
  } finally {
    Re = 0, tf(), me = 0;
  }
}
function Jh() {
  var n = fn.now(), t = n - sr;
  t > Ha && (yr -= t, sr = n);
}
function tf() {
  for (var n, t = ir, e, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), n = t, t = t._next) : (e = t._next, t._next = null, t = n ? n._next = e : ir = e);
  tn = n, oi(r);
}
function oi(n) {
  if (!Re) {
    Je && (Je = clearTimeout(Je));
    var t = n - me;
    t > 24 ? (n < 1 / 0 && (Je = setTimeout(Ss, n - fn.now() - yr)), Ge && (Ge = clearInterval(Ge))) : (Ge || (sr = fn.now(), Ge = setInterval(Jh, Ha)), Re = 1, Ba(Ss));
  }
}
function Ts(n, t, e) {
  var r = new ar();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), n(i + t);
  }, t, e), r;
}
var ef = Ti("start", "end", "cancel", "interrupt"), nf = [], Xa = 0, Ms = 1, li = 2, Bn = 3, Es = 4, ci = 5, Vn = 6;
function wr(n, t, e, r, i, s) {
  var a = n.__transition;
  if (!a) n.__transition = {};
  else if (e in a) return;
  rf(n, e, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ef,
    tween: nf,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Xa
  });
}
function Ni(n, t) {
  var e = Et(n, t);
  if (e.state > Xa) throw new Error("too late; already scheduled");
  return e;
}
function Ft(n, t) {
  var e = Et(n, t);
  if (e.state > Bn) throw new Error("too late; already running");
  return e;
}
function Et(n, t) {
  var e = n.__transition;
  if (!e || !(e = e[t])) throw new Error("transition not found");
  return e;
}
function rf(n, t, e) {
  var r = n.__transition, i;
  r[t] = e, e.timer = Va(s, 0, e.time);
  function s(l) {
    e.state = Ms, e.timer.restart(a, e.delay, e.time), e.delay <= l && a(l - e.delay);
  }
  function a(l) {
    var u, h, f, d;
    if (e.state !== Ms) return c();
    for (u in r)
      if (d = r[u], d.name === e.name) {
        if (d.state === Bn) return Ts(a);
        d.state === Es ? (d.state = Vn, d.timer.stop(), d.on.call("interrupt", n, n.__data__, d.index, d.group), delete r[u]) : +u < t && (d.state = Vn, d.timer.stop(), d.on.call("cancel", n, n.__data__, d.index, d.group), delete r[u]);
      }
    if (Ts(function() {
      e.state === Bn && (e.state = Es, e.timer.restart(o, e.delay, e.time), o(l));
    }), e.state = li, e.on.call("start", n, n.__data__, e.index, e.group), e.state === li) {
      for (e.state = Bn, i = new Array(f = e.tween.length), u = 0, h = -1; u < f; ++u)
        (d = e.tween[u].value.call(n, n.__data__, e.index, e.group)) && (i[++h] = d);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var u = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(c), e.state = ci, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(n, u);
    e.state === ci && (e.on.call("end", n, n.__data__, e.index, e.group), c());
  }
  function c() {
    e.state = Vn, e.timer.stop(), delete r[t];
    for (var l in r) return;
    delete n.__transition;
  }
}
function sf(n, t) {
  var e = n.__transition, r, i, s = !0, a;
  if (e) {
    t = t == null ? null : t + "";
    for (a in e) {
      if ((r = e[a]).name !== t) {
        s = !1;
        continue;
      }
      i = r.state > li && r.state < ci, r.state = Vn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", n, n.__data__, r.index, r.group), delete e[a];
    }
    s && delete n.__transition;
  }
}
function af(n) {
  return this.each(function() {
    sf(this, n);
  });
}
function of(n, t) {
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
function lf(n, t, e) {
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
function cf(n, t) {
  var e = this._id;
  if (n += "", arguments.length < 2) {
    for (var r = Et(this.node(), e).tween, i = 0, s = r.length, a; i < s; ++i)
      if ((a = r[i]).name === n)
        return a.value;
    return null;
  }
  return this.each((t == null ? of : lf)(e, n, t));
}
function Ri(n, t, e) {
  var r = n._id;
  return n.each(function() {
    var i = Ft(this, r);
    (i.value || (i.value = {}))[t] = e.apply(this, arguments);
  }), function(i) {
    return Et(i, r).value[t];
  };
}
function Ya(n, t) {
  var e;
  return (typeof t == "number" ? Tt : t instanceof Jt ? rr : (e = Jt(t)) ? (t = e, rr) : Fa)(n, t);
}
function uf(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function hf(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function ff(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttribute(n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function df(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttributeNS(n.space, n.local);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function pf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttribute(n) : (a = this.getAttribute(n), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function gf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttributeNS(n.space, n.local) : (a = this.getAttributeNS(n.space, n.local), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function _f(n, t) {
  var e = br(n), r = e === "transform" ? jh : Ya;
  return this.attrTween(n, typeof t == "function" ? (e.local ? gf : pf)(e, r, Ri(this, "attr." + n, t)) : t == null ? (e.local ? hf : uf)(e) : (e.local ? df : ff)(e, r, t));
}
function mf(n, t) {
  return function(e) {
    this.setAttribute(n, t.call(this, e));
  };
}
function vf(n, t) {
  return function(e) {
    this.setAttributeNS(n.space, n.local, t.call(this, e));
  };
}
function xf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && vf(n, s)), e;
  }
  return i._value = t, i;
}
function bf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && mf(n, s)), e;
  }
  return i._value = t, i;
}
function yf(n, t) {
  var e = "attr." + n;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  var r = br(n);
  return this.tween(e, (r.local ? xf : bf)(r, t));
}
function wf(n, t) {
  return function() {
    Ni(this, n).delay = +t.apply(this, arguments);
  };
}
function kf(n, t) {
  return t = +t, function() {
    Ni(this, n).delay = t;
  };
}
function Af(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? wf : kf)(t, n)) : Et(this.node(), t).delay;
}
function Cf(n, t) {
  return function() {
    Ft(this, n).duration = +t.apply(this, arguments);
  };
}
function $f(n, t) {
  return t = +t, function() {
    Ft(this, n).duration = t;
  };
}
function Sf(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? Cf : $f)(t, n)) : Et(this.node(), t).duration;
}
function Tf(n, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ft(this, n).ease = t;
  };
}
function Mf(n) {
  var t = this._id;
  return arguments.length ? this.each(Tf(t, n)) : Et(this.node(), t).ease;
}
function Ef(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    Ft(this, n).ease = e;
  };
}
function Pf(n) {
  if (typeof n != "function") throw new Error();
  return this.each(Ef(this._id, n));
}
function zf(n) {
  typeof n != "function" && (n = Ca(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new Vt(r, this._parents, this._name, this._id);
}
function Of(n) {
  if (n._id !== this._id) throw new Error();
  for (var t = this._groups, e = n._groups, r = t.length, i = e.length, s = Math.min(r, i), a = new Array(r), o = 0; o < s; ++o)
    for (var c = t[o], l = e[o], u = c.length, h = a[o] = new Array(u), f, d = 0; d < u; ++d)
      (f = c[d] || l[d]) && (h[d] = f);
  for (; o < r; ++o)
    a[o] = t[o];
  return new Vt(a, this._parents, this._name, this._id);
}
function Lf(n) {
  return (n + "").trim().split(/^|\s+/).every(function(t) {
    var e = t.indexOf(".");
    return e >= 0 && (t = t.slice(0, e)), !t || t === "start";
  });
}
function Nf(n, t, e) {
  var r, i, s = Lf(t) ? Ni : Ft;
  return function() {
    var a = s(this, n), o = a.on;
    o !== r && (i = (r = o).copy()).on(t, e), a.on = i;
  };
}
function Rf(n, t) {
  var e = this._id;
  return arguments.length < 2 ? Et(this.node(), e).on.on(n) : this.each(Nf(e, n, t));
}
function Df(n) {
  return function() {
    var t = this.parentNode;
    for (var e in this.__transition) if (+e !== n) return;
    t && t.removeChild(this);
  };
}
function Ff() {
  return this.on("end.remove", Df(this._id));
}
function If(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Mi(n));
  for (var r = this._groups, i = r.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = r[a], c = o.length, l = s[a] = new Array(c), u, h, f = 0; f < c; ++f)
      (u = o[f]) && (h = n.call(u, u.__data__, f, o)) && ("__data__" in u && (h.__data__ = u.__data__), l[f] = h, wr(l[f], t, e, f, l, Et(u, e)));
  return new Vt(s, this._parents, t, e);
}
function qf(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Aa(n));
  for (var r = this._groups, i = r.length, s = [], a = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, u, h = 0; h < l; ++h)
      if (u = c[h]) {
        for (var f = n.call(u, u.__data__, h, c), d, g = Et(u, e), p = 0, m = f.length; p < m; ++p)
          (d = f[p]) && wr(d, t, e, p, f, g);
        s.push(f), a.push(u);
      }
  return new Vt(s, a, t, e);
}
var Hf = An.prototype.constructor;
function Bf() {
  return new Hf(this._groups, this._parents);
}
function Vf(n, t) {
  var e, r, i;
  return function() {
    var s = Ne(this, n), a = (this.style.removeProperty(n), Ne(this, n));
    return s === a ? null : s === e && a === r ? i : i = t(e = s, r = a);
  };
}
function Ga(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Xf(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = Ne(this, n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function Yf(n, t, e) {
  var r, i, s;
  return function() {
    var a = Ne(this, n), o = e(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(n), Ne(this, n))), a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o));
  };
}
function Gf(n, t) {
  var e, r, i, s = "style." + t, a = "end." + s, o;
  return function() {
    var c = Ft(this, n), l = c.on, u = c.value[s] == null ? o || (o = Ga(t)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(a, i = u), c.on = r;
  };
}
function Uf(n, t, e) {
  var r = (n += "") == "transform" ? Wh : Ya;
  return t == null ? this.styleTween(n, Vf(n, r)).on("end.style." + n, Ga(n)) : typeof t == "function" ? this.styleTween(n, Yf(n, r, Ri(this, "style." + n, t))).each(Gf(this._id, n)) : this.styleTween(n, Xf(n, r, t), e).on("end.style." + n, null);
}
function Wf(n, t, e) {
  return function(r) {
    this.style.setProperty(n, t.call(this, r), e);
  };
}
function jf(n, t, e) {
  var r, i;
  function s() {
    var a = t.apply(this, arguments);
    return a !== i && (r = (i = a) && Wf(n, a, e)), r;
  }
  return s._value = t, s;
}
function Kf(n, t, e) {
  var r = "style." + (n += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, jf(n, t, e ?? ""));
}
function Zf(n) {
  return function() {
    this.textContent = n;
  };
}
function Qf(n) {
  return function() {
    var t = n(this);
    this.textContent = t ?? "";
  };
}
function Jf(n) {
  return this.tween("text", typeof n == "function" ? Qf(Ri(this, "text", n)) : Zf(n == null ? "" : n + ""));
}
function td(n) {
  return function(t) {
    this.textContent = n.call(this, t);
  };
}
function ed(n) {
  var t, e;
  function r() {
    var i = n.apply(this, arguments);
    return i !== e && (t = (e = i) && td(i)), t;
  }
  return r._value = n, r;
}
function nd(n) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (n == null) return this.tween(t, null);
  if (typeof n != "function") throw new Error();
  return this.tween(t, ed(n));
}
function rd() {
  for (var n = this._name, t = this._id, e = Ua(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      if (c = a[l]) {
        var u = Et(c, t);
        wr(c, n, e, l, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Vt(r, this._parents, n, e);
}
function id() {
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
var sd = 0;
function Vt(n, t, e, r) {
  this._groups = n, this._parents = t, this._name = e, this._id = r;
}
function Ua() {
  return ++sd;
}
var It = An.prototype;
Vt.prototype = {
  constructor: Vt,
  select: If,
  selectAll: qf,
  selectChild: It.selectChild,
  selectChildren: It.selectChildren,
  filter: zf,
  merge: Of,
  selection: Bf,
  transition: rd,
  call: It.call,
  nodes: It.nodes,
  node: It.node,
  size: It.size,
  empty: It.empty,
  each: It.each,
  on: Rf,
  attr: _f,
  attrTween: yf,
  style: Uf,
  styleTween: Kf,
  text: Jf,
  textTween: nd,
  remove: Ff,
  tween: cf,
  delay: Af,
  duration: Sf,
  ease: Mf,
  easeVarying: Pf,
  end: id,
  [Symbol.iterator]: It[Symbol.iterator]
};
function dn(n) {
  return n * (2 - n);
}
function ad(n) {
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
var od = (function n(t) {
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
var ld = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ad
};
function cd(n, t) {
  for (var e; !(e = n.__transition) || !(e = e[t]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${t} not found`);
  return e;
}
function ud(n) {
  var t, e;
  n instanceof Vt ? (t = n._id, n = n._name) : (t = Ua(), (e = ld).time = Li(), n = n == null ? null : n + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && wr(c, n, t, l, a, e || cd(c, t));
  return new Vt(r, this._parents, n, t);
}
An.prototype.interrupt = af;
An.prototype.transition = ud;
const ui = Math.PI, hi = 2 * ui, le = 1e-6, hd = hi - le;
function Wa(n) {
  this._ += n[0];
  for (let t = 1, e = n.length; t < e; ++t)
    this._ += arguments[t] + n[t];
}
function fd(n) {
  let t = Math.floor(n);
  if (!(t >= 0)) throw new Error(`invalid digits: ${n}`);
  if (t > 15) return Wa;
  const e = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class dd {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Wa : fd(t);
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
    else if (f > le) if (!(Math.abs(h * c - l * u) > le) || !s)
      this._append`L${this._x1 = t},${this._y1 = e}`;
    else {
      let d = r - a, g = i - o, p = c * c + l * l, m = d * d + g * g, b = Math.sqrt(p), y = Math.sqrt(f), v = s * Math.tan((ui - Math.acos((p + f - m) / (2 * b * y))) / 2), _ = v / y, x = v / b;
      Math.abs(_ - 1) > le && this._append`L${t + _ * u},${e + _ * h}`, this._append`A${s},${s},0,0,${+(h * d > u * g)},${this._x1 = t + x * c},${this._y1 = e + x * l}`;
    }
  }
  arc(t, e, r, i, s, a) {
    if (t = +t, e = +e, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), l = t + o, u = e + c, h = 1 ^ a, f = a ? i - s : s - i;
    this._x1 === null ? this._append`M${l},${u}` : (Math.abs(this._x1 - l) > le || Math.abs(this._y1 - u) > le) && this._append`L${l},${u}`, r && (f < 0 && (f = f % hi + hi), f > hd ? this._append`A${r},${r},0,1,${h},${t - o},${e - c}A${r},${r},0,1,${h},${this._x1 = l},${this._y1 = u}` : f > le && this._append`A${r},${r},0,${+(f >= ui)},${h},${this._x1 = t + r * Math.cos(s)},${this._y1 = e + r * Math.sin(s)}`);
  }
  rect(t, e, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function pd(n) {
  return Math.abs(n = Math.round(n)) >= 1e21 ? n.toLocaleString("en").replace(/,/g, "") : n.toString(10);
}
function or(n, t) {
  if (!isFinite(n) || n === 0) return null;
  var e = (n = t ? n.toExponential(t - 1) : n.toExponential()).indexOf("e"), r = n.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +n.slice(e + 1)
  ];
}
function De(n) {
  return n = or(Math.abs(n)), n ? n[1] : NaN;
}
function gd(n, t) {
  return function(e, r) {
    for (var i = e.length, s = [], a = 0, o = n[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), s.push(e.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = n[a = (a + 1) % n.length];
    return s.reverse().join(t);
  };
}
function _d(n) {
  return function(t) {
    return t.replace(/[0-9]/g, function(e) {
      return n[+e];
    });
  };
}
var md = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function lr(n) {
  if (!(t = md.exec(n))) throw new Error("invalid format: " + n);
  var t;
  return new Fi({
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
lr.prototype = Fi.prototype;
function Fi(n) {
  this.fill = n.fill === void 0 ? " " : n.fill + "", this.align = n.align === void 0 ? ">" : n.align + "", this.sign = n.sign === void 0 ? "-" : n.sign + "", this.symbol = n.symbol === void 0 ? "" : n.symbol + "", this.zero = !!n.zero, this.width = n.width === void 0 ? void 0 : +n.width, this.comma = !!n.comma, this.precision = n.precision === void 0 ? void 0 : +n.precision, this.trim = !!n.trim, this.type = n.type === void 0 ? "" : n.type + "";
}
Fi.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function vd(n) {
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
var cr;
function xd(n, t) {
  var e = or(n, t);
  if (!e) return cr = void 0, n.toPrecision(t);
  var r = e[0], i = e[1], s = i - (cr = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return s === a ? r : s > a ? r + new Array(s - a + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + or(n, Math.max(0, t + s - 1))[0];
}
function Ps(n, t) {
  var e = or(n, t);
  if (!e) return n + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const zs = {
  "%": (n, t) => (n * 100).toFixed(t),
  b: (n) => Math.round(n).toString(2),
  c: (n) => n + "",
  d: pd,
  e: (n, t) => n.toExponential(t),
  f: (n, t) => n.toFixed(t),
  g: (n, t) => n.toPrecision(t),
  o: (n) => Math.round(n).toString(8),
  p: (n, t) => Ps(n * 100, t),
  r: Ps,
  s: xd,
  X: (n) => Math.round(n).toString(16).toUpperCase(),
  x: (n) => Math.round(n).toString(16)
};
function Os(n) {
  return n;
}
var Ls = Array.prototype.map, Ns = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function bd(n) {
  var t = n.grouping === void 0 || n.thousands === void 0 ? Os : gd(Ls.call(n.grouping, Number), n.thousands + ""), e = n.currency === void 0 ? "" : n.currency[0] + "", r = n.currency === void 0 ? "" : n.currency[1] + "", i = n.decimal === void 0 ? "." : n.decimal + "", s = n.numerals === void 0 ? Os : _d(Ls.call(n.numerals, String)), a = n.percent === void 0 ? "%" : n.percent + "", o = n.minus === void 0 ? "−" : n.minus + "", c = n.nan === void 0 ? "NaN" : n.nan + "";
  function l(h, f) {
    h = lr(h);
    var d = h.fill, g = h.align, p = h.sign, m = h.symbol, b = h.zero, y = h.width, v = h.comma, _ = h.precision, x = h.trim, k = h.type;
    k === "n" ? (v = !0, k = "g") : zs[k] || (_ === void 0 && (_ = 12), x = !0, k = "g"), (b || d === "0" && g === "=") && (b = !0, d = "0", g = "=");
    var $ = (f && f.prefix !== void 0 ? f.prefix : "") + (m === "$" ? e : m === "#" && /[boxX]/.test(k) ? "0" + k.toLowerCase() : ""), A = (m === "$" ? r : /[%p]/.test(k) ? a : "") + (f && f.suffix !== void 0 ? f.suffix : ""), w = zs[k], C = /[defgprs%]/.test(k);
    _ = _ === void 0 ? 6 : /[gprs]/.test(k) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
    function T(S) {
      var M = $, E = A, P, z, L;
      if (k === "c")
        E = w(S) + E, S = "";
      else {
        S = +S;
        var D = S < 0 || 1 / S < 0;
        if (S = isNaN(S) ? c : w(Math.abs(S), _), x && (S = vd(S)), D && +S == 0 && p !== "+" && (D = !1), M = (D ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + M, E = (k === "s" && !isNaN(S) && cr !== void 0 ? Ns[8 + cr / 3] : "") + E + (D && p === "(" ? ")" : ""), C) {
          for (P = -1, z = S.length; ++P < z; )
            if (L = S.charCodeAt(P), 48 > L || L > 57) {
              E = (L === 46 ? i + S.slice(P + 1) : S.slice(P)) + E, S = S.slice(0, P);
              break;
            }
        }
      }
      v && !b && (S = t(S, 1 / 0));
      var B = M.length + S.length + E.length, I = B < y ? new Array(y - B + 1).join(d) : "";
      switch (v && b && (S = t(I + S, I.length ? y - E.length : 1 / 0), I = ""), g) {
        case "<":
          S = M + S + E + I;
          break;
        case "=":
          S = M + I + S + E;
          break;
        case "^":
          S = I.slice(0, B = I.length >> 1) + M + S + E + I.slice(B);
          break;
        default:
          S = I + M + S + E;
          break;
      }
      return s(S);
    }
    return T.toString = function() {
      return h + "";
    }, T;
  }
  function u(h, f) {
    var d = Math.max(-8, Math.min(8, Math.floor(De(f) / 3))) * 3, g = Math.pow(10, -d), p = l((h = lr(h), h.type = "f", h), { suffix: Ns[8 + d / 3] });
    return function(m) {
      return p(g * m);
    };
  }
  return {
    format: l,
    formatPrefix: u
  };
}
var Ln, ja, Ka;
yd({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function yd(n) {
  return Ln = bd(n), ja = Ln.format, Ka = Ln.formatPrefix, Ln;
}
function wd(n) {
  return Math.max(0, -De(Math.abs(n)));
}
function kd(n, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(De(t) / 3))) * 3 - De(Math.abs(n)));
}
function Ad(n, t) {
  return n = Math.abs(n), t = Math.abs(t) - n, Math.max(0, De(t) - De(n)) + 1;
}
function Cd(n) {
  var t = 0, e = n.children, r = e && e.length;
  if (!r) t = 1;
  else for (; --r >= 0; ) t += e[r].value;
  n.value = t;
}
function $d() {
  return this.eachAfter(Cd);
}
function Sd(n, t) {
  let e = -1;
  for (const r of this)
    n.call(t, r, ++e, this);
  return this;
}
function Td(n, t) {
  for (var e = this, r = [e], i, s, a = -1; e = r.pop(); )
    if (n.call(t, e, ++a, this), i = e.children)
      for (s = i.length - 1; s >= 0; --s)
        r.push(i[s]);
  return this;
}
function Md(n, t) {
  for (var e = this, r = [e], i = [], s, a, o, c = -1; e = r.pop(); )
    if (i.push(e), s = e.children)
      for (a = 0, o = s.length; a < o; ++a)
        r.push(s[a]);
  for (; e = i.pop(); )
    n.call(t, e, ++c, this);
  return this;
}
function Ed(n, t) {
  let e = -1;
  for (const r of this)
    if (n.call(t, r, ++e, this))
      return r;
}
function Pd(n) {
  return this.eachAfter(function(t) {
    for (var e = +n(t.data) || 0, r = t.children, i = r && r.length; --i >= 0; ) e += r[i].value;
    t.value = e;
  });
}
function zd(n) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(n);
  });
}
function Od(n) {
  for (var t = this, e = Ld(t, n), r = [t]; t !== e; )
    t = t.parent, r.push(t);
  for (var i = r.length; n !== e; )
    r.splice(i, 0, n), n = n.parent;
  return r;
}
function Ld(n, t) {
  if (n === t) return n;
  var e = n.ancestors(), r = t.ancestors(), i = null;
  for (n = e.pop(), t = r.pop(); n === t; )
    i = n, n = e.pop(), t = r.pop();
  return i;
}
function Nd() {
  for (var n = this, t = [n]; n = n.parent; )
    t.push(n);
  return t;
}
function Rd() {
  return Array.from(this);
}
function Dd() {
  var n = [];
  return this.eachBefore(function(t) {
    t.children || n.push(t);
  }), n;
}
function Fd() {
  var n = this, t = [];
  return n.each(function(e) {
    e !== n && t.push({ source: e.parent, target: e });
  }), t;
}
function* Id() {
  var n = this, t, e = [n], r, i, s;
  do
    for (t = e.reverse(), e = []; n = t.pop(); )
      if (yield n, r = n.children)
        for (i = 0, s = r.length; i < s; ++i)
          e.push(r[i]);
  while (e.length);
}
function ur(n, t) {
  n instanceof Map ? (n = [void 0, n], t === void 0 && (t = Bd)) : t === void 0 && (t = Hd);
  for (var e = new pn(n), r, i = [e], s, a, o, c; r = i.pop(); )
    if ((a = t(r.data)) && (c = (a = Array.from(a)).length))
      for (r.children = a, o = c - 1; o >= 0; --o)
        i.push(s = a[o] = new pn(a[o])), s.parent = r, s.depth = r.depth + 1;
  return e.eachBefore(Xd);
}
function qd() {
  return ur(this).eachBefore(Vd);
}
function Hd(n) {
  return n.children;
}
function Bd(n) {
  return Array.isArray(n) ? n[1] : null;
}
function Vd(n) {
  n.data.value !== void 0 && (n.value = n.data.value), n.data = n.data.data;
}
function Xd(n) {
  var t = 0;
  do
    n.height = t;
  while ((n = n.parent) && n.height < ++t);
}
function pn(n) {
  this.data = n, this.depth = this.height = 0, this.parent = null;
}
pn.prototype = ur.prototype = {
  constructor: pn,
  count: $d,
  each: Sd,
  eachAfter: Md,
  eachBefore: Td,
  find: Ed,
  sum: Pd,
  sort: zd,
  path: Od,
  ancestors: Nd,
  descendants: Rd,
  leaves: Dd,
  links: Fd,
  copy: qd,
  [Symbol.iterator]: Id
};
function Yd(n, t) {
  return n.parent === t.parent ? 1 : 2;
}
function Rr(n) {
  var t = n.children;
  return t ? t[0] : n.t;
}
function Dr(n) {
  var t = n.children;
  return t ? t[t.length - 1] : n.t;
}
function Gd(n, t, e) {
  var r = e / (t.i - n.i);
  t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e;
}
function Ud(n) {
  for (var t = 0, e = 0, r = n.children, i = r.length, s; --i >= 0; )
    s = r[i], s.z += t, s.m += t, t += s.s + (e += s.c);
}
function Wd(n, t, e) {
  return n.a.parent === t.parent ? n.a : e;
}
function Xn(n, t) {
  this._ = n, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
Xn.prototype = Object.create(pn.prototype);
function jd(n) {
  for (var t = new Xn(n, 0), e, r = [t], i, s, a, o; e = r.pop(); )
    if (s = e._.children)
      for (e.children = new Array(o = s.length), a = o - 1; a >= 0; --a)
        r.push(i = e.children[a] = new Xn(s[a], a)), i.parent = e;
  return (t.parent = new Xn(null, 0)).children = [t], t;
}
function Kd() {
  var n = Yd, t = 1, e = 1, r = null;
  function i(l) {
    var u = jd(l);
    if (u.eachAfter(s), u.parent.m = -u.z, u.eachBefore(a), r) l.eachBefore(c);
    else {
      var h = l, f = l, d = l;
      l.eachBefore(function(y) {
        y.x < h.x && (h = y), y.x > f.x && (f = y), y.depth > d.depth && (d = y);
      });
      var g = h === f ? 1 : n(h, f) / 2, p = g - h.x, m = t / (f.x + g + p), b = e / (d.depth || 1);
      l.eachBefore(function(y) {
        y.x = (y.x + p) * m, y.y = y.depth * b;
      });
    }
    return l;
  }
  function s(l) {
    var u = l.children, h = l.parent.children, f = l.i ? h[l.i - 1] : null;
    if (u) {
      Ud(l);
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
      for (var f = l, d = l, g = u, p = f.parent.children[0], m = f.m, b = d.m, y = g.m, v = p.m, _; g = Dr(g), f = Rr(f), g && f; )
        p = Rr(p), d = Dr(d), d.a = l, _ = g.z + y - f.z - m + n(g._, f._), _ > 0 && (Gd(Wd(g, l, h), l, _), m += _, b += _), y += g.m, m += f.m, v += p.m, b += d.m;
      g && !Dr(d) && (d.t = g, d.m += y - b), f && !Rr(p) && (p.t = f, p.m += m - v, h = l);
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
function Zd(n, t) {
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
function Za(n, t) {
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
function Qd(n) {
  return function() {
    return n;
  };
}
function Jd(n) {
  return +n;
}
var Rs = [0, 1];
function Lt(n) {
  return n;
}
function fi(n, t) {
  return (t -= n = +n) ? function(e) {
    return (e - n) / t;
  } : Qd(isNaN(t) ? NaN : 0.5);
}
function tp(n, t) {
  var e;
  return n > t && (e = n, n = t, t = e), function(r) {
    return Math.max(n, Math.min(t, r));
  };
}
function ep(n, t, e) {
  var r = n[0], i = n[1], s = t[0], a = t[1];
  return i < r ? (r = fi(i, r), s = e(a, s)) : (r = fi(r, i), s = e(s, a)), function(o) {
    return s(r(o));
  };
}
function np(n, t, e) {
  var r = Math.min(n.length, t.length) - 1, i = new Array(r), s = new Array(r), a = -1;
  for (n[r] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a < r; )
    i[a] = fi(n[a], n[a + 1]), s[a] = e(t[a], t[a + 1]);
  return function(o) {
    var c = mc(n, o, 1, r) - 1;
    return s[c](i[c](o));
  };
}
function rp(n, t) {
  return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown());
}
function ip() {
  var n = Rs, t = Rs, e = xe, r, i, s, a = Lt, o, c, l;
  function u() {
    var f = Math.min(n.length, t.length);
    return a !== Lt && (a = tp(n[0], n[f - 1])), o = f > 2 ? np : ep, c = l = null, h;
  }
  function h(f) {
    return f == null || isNaN(f = +f) ? s : (c || (c = o(n.map(r), t, e)))(r(a(f)));
  }
  return h.invert = function(f) {
    return a(i((l || (l = o(t, n.map(r), Tt)))(f)));
  }, h.domain = function(f) {
    return arguments.length ? (n = Array.from(f, Jd), u()) : n.slice();
  }, h.range = function(f) {
    return arguments.length ? (t = Array.from(f), u()) : t.slice();
  }, h.rangeRound = function(f) {
    return t = Array.from(f), e = Oi, u();
  }, h.clamp = function(f) {
    return arguments.length ? (a = f ? !0 : Lt, u()) : a !== Lt;
  }, h.interpolate = function(f) {
    return arguments.length ? (e = f, u()) : e;
  }, h.unknown = function(f) {
    return arguments.length ? (s = f, h) : s;
  }, function(f, d) {
    return r = f, i = d, u();
  };
}
function sp() {
  return ip()(Lt, Lt);
}
function ap(n, t, e, r) {
  var i = wc(n, t, e), s;
  switch (r = lr(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(n), Math.abs(t));
      return r.precision == null && !isNaN(s = kd(i, a)) && (r.precision = s), Ka(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Ad(i, Math.max(Math.abs(n), Math.abs(t)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = wd(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return ja(r);
}
function Ii(n) {
  var t = n.domain;
  return n.ticks = function(e) {
    var r = t();
    return yc(r[0], r[r.length - 1], e ?? 10);
  }, n.tickFormat = function(e, r) {
    var i = t();
    return ap(i[0], i[i.length - 1], e ?? 10, r);
  }, n.nice = function(e) {
    e == null && (e = 10);
    var r = t(), i = 0, s = r.length - 1, a = r[i], o = r[s], c, l, u = 10;
    for (o < a && (l = a, a = o, o = l, l = i, i = s, s = l); u-- > 0; ) {
      if (l = ti(a, o, e), l === c)
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
function ve() {
  var n = sp();
  return n.copy = function() {
    return rp(n, ve());
  }, Zd.apply(n, arguments), Ii(n);
}
function op() {
  var n = 0, t = 1, e, r, i, s, a = Lt, o = !1, c;
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
      var d, g;
      return arguments.length ? ([d, g] = f, a = h(d, g), l) : [a(0), a(1)];
    };
  }
  return l.range = u(xe), l.rangeRound = u(Oi), l.unknown = function(h) {
    return arguments.length ? (c = h, l) : c;
  }, function(h) {
    return s = h, e = h(n), r = h(t), i = e === r ? 0 : 1 / (r - e), l;
  };
}
function Qa(n, t) {
  return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown());
}
function Ja() {
  var n = Ii(op()(Lt));
  return n.copy = function() {
    return Qa(n, Ja());
  }, Za.apply(n, arguments);
}
function lp() {
  var n = 0, t = 0.5, e = 1, r = 1, i, s, a, o, c, l = Lt, u, h = !1, f;
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
  function g(p) {
    return function(m) {
      var b, y, v;
      return arguments.length ? ([b, y, v] = m, l = Kh(p, [b, y, v]), d) : [l(0), l(0.5), l(1)];
    };
  }
  return d.range = g(xe), d.rangeRound = g(Oi), d.unknown = function(p) {
    return arguments.length ? (f = p, d) : f;
  }, function(p) {
    return u = p, i = p(n), s = p(t), a = p(e), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), r = s < i ? -1 : 1, d;
  };
}
function to() {
  var n = Ii(lp()(Lt));
  return n.copy = function() {
    return Qa(n, to());
  }, Za.apply(n, arguments);
}
function eo(n) {
  for (var t = n.length / 6 | 0, e = new Array(t), r = 0; r < t; ) e[r] = "#" + n.slice(r * 6, ++r * 6);
  return e;
}
const no = (n) => Fh(n[n.length - 1]);
var cp = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(eo);
const up = no(cp);
var hp = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(eo);
const fp = no(hp);
function N(n) {
  return function() {
    return n;
  };
}
const Ds = Math.abs, et = Math.atan2, ie = Math.cos, dp = Math.max, Fr = Math.min, Pt = Math.sin, $e = Math.sqrt, ot = 1e-12, gn = Math.PI, hr = gn / 2, Yn = 2 * gn;
function pp(n) {
  return n > 1 ? 0 : n < -1 ? gn : Math.acos(n);
}
function Fs(n) {
  return n >= 1 ? hr : n <= -1 ? -hr : Math.asin(n);
}
function kr(n) {
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
  }, () => new dd(t);
}
function gp(n) {
  return n.innerRadius;
}
function _p(n) {
  return n.outerRadius;
}
function mp(n) {
  return n.startAngle;
}
function vp(n) {
  return n.endAngle;
}
function xp(n) {
  return n && n.padAngle;
}
function bp(n, t, e, r, i, s, a, o) {
  var c = e - n, l = r - t, u = a - i, h = o - s, f = h * c - u * l;
  if (!(f * f < ot))
    return f = (u * (t - s) - h * (n - i)) / f, [n + f * c, t + f * l];
}
function Nn(n, t, e, r, i, s, a) {
  var o = n - e, c = t - r, l = (a ? s : -s) / $e(o * o + c * c), u = l * c, h = -l * o, f = n + u, d = t + h, g = e + u, p = r + h, m = (f + g) / 2, b = (d + p) / 2, y = g - f, v = p - d, _ = y * y + v * v, x = i - s, k = f * p - g * d, $ = (v < 0 ? -1 : 1) * $e(dp(0, x * x * _ - k * k)), A = (k * v - y * $) / _, w = (-k * y - v * $) / _, C = (k * v + y * $) / _, T = (-k * y + v * $) / _, S = A - m, M = w - b, E = C - m, P = T - b;
  return S * S + M * M > E * E + P * P && (A = C, w = T), {
    cx: A,
    cy: w,
    x01: -u,
    y01: -h,
    x11: A * (i / x - 1),
    y11: w * (i / x - 1)
  };
}
function Is() {
  var n = gp, t = _p, e = N(0), r = null, i = mp, s = vp, a = xp, o = null, c = kr(l);
  function l() {
    var u, h, f = +n.apply(this, arguments), d = +t.apply(this, arguments), g = i.apply(this, arguments) - hr, p = s.apply(this, arguments) - hr, m = Ds(p - g), b = p > g;
    if (o || (o = u = c()), d < f && (h = d, d = f, f = h), !(d > ot)) o.moveTo(0, 0);
    else if (m > Yn - ot)
      o.moveTo(d * ie(g), d * Pt(g)), o.arc(0, 0, d, g, p, !b), f > ot && (o.moveTo(f * ie(p), f * Pt(p)), o.arc(0, 0, f, p, g, b));
    else {
      var y = g, v = p, _ = g, x = p, k = m, $ = m, A = a.apply(this, arguments) / 2, w = A > ot && (r ? +r.apply(this, arguments) : $e(f * f + d * d)), C = Fr(Ds(d - f) / 2, +e.apply(this, arguments)), T = C, S = C, M, E;
      if (w > ot) {
        var P = Fs(w / f * Pt(A)), z = Fs(w / d * Pt(A));
        (k -= P * 2) > ot ? (P *= b ? 1 : -1, _ += P, x -= P) : (k = 0, _ = x = (g + p) / 2), ($ -= z * 2) > ot ? (z *= b ? 1 : -1, y += z, v -= z) : ($ = 0, y = v = (g + p) / 2);
      }
      var L = d * ie(y), D = d * Pt(y), B = f * ie(x), I = f * Pt(x);
      if (C > ot) {
        var tt = d * ie(v), it = d * Pt(v), ye = f * ie(_), pt = f * Pt(_), Q;
        if (m < gn)
          if (Q = bp(L, D, ye, pt, tt, it, B, I)) {
            var Sr = L - Q[0], Tr = D - Q[1], Mr = tt - Q[0], Er = it - Q[1], ls = 1 / Pt(pp((Sr * Mr + Tr * Er) / ($e(Sr * Sr + Tr * Tr) * $e(Mr * Mr + Er * Er))) / 2), cs = $e(Q[0] * Q[0] + Q[1] * Q[1]);
            T = Fr(C, (f - cs) / (ls - 1)), S = Fr(C, (d - cs) / (ls + 1));
          } else
            T = S = 0;
      }
      $ > ot ? S > ot ? (M = Nn(ye, pt, L, D, d, S, b), E = Nn(tt, it, B, I, d, S, b), o.moveTo(M.cx + M.x01, M.cy + M.y01), S < C ? o.arc(M.cx, M.cy, S, et(M.y01, M.x01), et(E.y01, E.x01), !b) : (o.arc(M.cx, M.cy, S, et(M.y01, M.x01), et(M.y11, M.x11), !b), o.arc(0, 0, d, et(M.cy + M.y11, M.cx + M.x11), et(E.cy + E.y11, E.cx + E.x11), !b), o.arc(E.cx, E.cy, S, et(E.y11, E.x11), et(E.y01, E.x01), !b))) : (o.moveTo(L, D), o.arc(0, 0, d, y, v, !b)) : o.moveTo(L, D), !(f > ot) || !(k > ot) ? o.lineTo(B, I) : T > ot ? (M = Nn(B, I, tt, it, f, -T, b), E = Nn(L, D, ye, pt, f, -T, b), o.lineTo(M.cx + M.x01, M.cy + M.y01), T < C ? o.arc(M.cx, M.cy, T, et(M.y01, M.x01), et(E.y01, E.x01), !b) : (o.arc(M.cx, M.cy, T, et(M.y01, M.x01), et(M.y11, M.x11), !b), o.arc(0, 0, f, et(M.cy + M.y11, M.cx + M.x11), et(E.cy + E.y11, E.cx + E.x11), b), o.arc(E.cx, E.cy, T, et(E.y11, E.x11), et(E.y01, E.x01), !b))) : o.arc(0, 0, f, x, _, b);
    }
    if (o.closePath(), u) return o = null, u + "" || null;
  }
  return l.centroid = function() {
    var u = (+n.apply(this, arguments) + +t.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - gn / 2;
    return [ie(h) * u, Pt(h) * u];
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
var yp = Array.prototype.slice;
function qi(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function ro(n) {
  this._context = n;
}
ro.prototype = {
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
function io(n) {
  return new ro(n);
}
function Hi(n) {
  return n[0];
}
function Bi(n) {
  return n[1];
}
function Vi(n, t) {
  var e = N(!0), r = null, i = io, s = null, a = kr(o);
  n = typeof n == "function" ? n : n === void 0 ? Hi : N(n), t = typeof t == "function" ? t : t === void 0 ? Bi : N(t);
  function o(c) {
    var l, u = (c = qi(c)).length, h, f = !1, d;
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
function wp(n, t, e) {
  var r = null, i = N(!0), s = null, a = io, o = null, c = kr(l);
  n = typeof n == "function" ? n : n === void 0 ? Hi : N(+n), t = typeof t == "function" ? t : N(t === void 0 ? 0 : +t), e = typeof e == "function" ? e : e === void 0 ? Bi : N(+e);
  function l(h) {
    var f, d, g, p = (h = qi(h)).length, m, b = !1, y, v = new Array(p), _ = new Array(p);
    for (s == null && (o = a(y = c())), f = 0; f <= p; ++f) {
      if (!(f < p && i(m = h[f], f, h)) === b)
        if (b = !b)
          d = f, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), g = f - 1; g >= d; --g)
            o.point(v[g], _[g]);
          o.lineEnd(), o.areaEnd();
        }
      b && (v[f] = +n(m, f, h), _[f] = +t(m, f, h), o.point(r ? +r(m, f, h) : v[f], e ? +e(m, f, h) : _[f]));
    }
    if (y) return o = null, y + "" || null;
  }
  function u() {
    return Vi().defined(i).curve(a).context(s);
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
function kp(n, t) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Ap(n) {
  return n;
}
function Cp() {
  var n = Ap, t = kp, e = null, r = N(0), i = N(Yn), s = N(0);
  function a(o) {
    var c, l = (o = qi(o)).length, u, h, f = 0, d = new Array(l), g = new Array(l), p = +r.apply(this, arguments), m = Math.min(Yn, Math.max(-Yn, i.apply(this, arguments) - p)), b, y = Math.min(Math.abs(m) / l, s.apply(this, arguments)), v = y * (m < 0 ? -1 : 1), _;
    for (c = 0; c < l; ++c)
      (_ = g[d[c] = c] = +n(o[c], c, o)) > 0 && (f += _);
    for (t != null ? d.sort(function(x, k) {
      return t(g[x], g[k]);
    }) : e != null && d.sort(function(x, k) {
      return e(o[x], o[k]);
    }), c = 0, h = f ? (m - l * v) / f : 0; c < l; ++c, p = b)
      u = d[c], _ = g[u], b = p + (_ > 0 ? _ * h : 0) + v, g[u] = {
        data: o[u],
        index: c,
        value: _,
        startAngle: p,
        endAngle: b,
        padAngle: y
      };
    return g;
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
class so {
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
function $p(n) {
  return new so(n, !0);
}
function Sp(n) {
  return new so(n, !1);
}
function Tp(n) {
  return n.source;
}
function Mp(n) {
  return n.target;
}
function ao(n) {
  let t = Tp, e = Mp, r = Hi, i = Bi, s = null, a = null, o = kr(c);
  function c() {
    let l;
    const u = yp.call(arguments), h = t.apply(this, u), f = e.apply(this, u);
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
function Ep() {
  return ao($p);
}
function Pp() {
  return ao(Sp);
}
function qs(n) {
  return n < 0 ? -1 : 1;
}
function Hs(n, t, e) {
  var r = n._x1 - n._x0, i = t - n._x1, s = (n._y1 - n._y0) / (r || i < 0 && -0), a = (e - n._y1) / (i || r < 0 && -0), o = (s * i + a * r) / (r + i);
  return (qs(s) + qs(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function Bs(n, t) {
  var e = n._x1 - n._x0;
  return e ? (3 * (n._y1 - n._y0) / e - t) / 2 : t;
}
function Ir(n, t, e) {
  var r = n._x0, i = n._y0, s = n._x1, a = n._y1, o = (s - r) / 3;
  n._context.bezierCurveTo(r + o, i + o * t, s - o, a - o * e, s, a);
}
function fr(n) {
  this._context = n;
}
fr.prototype = {
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
        Ir(this, this._t0, Bs(this, this._t0));
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
          this._point = 3, Ir(this, Bs(this, e = Hs(this, n, t)), e);
          break;
        default:
          Ir(this, this._t0, e = Hs(this, n, t));
          break;
      }
      this._x0 = this._x1, this._x1 = n, this._y0 = this._y1, this._y1 = t, this._t0 = e;
    }
  }
};
Object.create(fr.prototype).point = function(n, t) {
  fr.prototype.point.call(this, t, n);
};
function zp(n) {
  return new fr(n);
}
function en(n, t, e) {
  this.k = n, this.x = t, this.y = e;
}
en.prototype = {
  constructor: en,
  scale: function(n) {
    return n === 1 ? this : new en(this.k * n, this.x, this.y);
  },
  translate: function(n, t) {
    return n === 0 & t === 0 ? this : new en(this.k, this.x + this.k * n, this.y + this.k * t);
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
en.prototype;
const Op = (
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
class Lp extends F {
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
    super.connectedCallback(), this.adoptStyles(Op), this._animated = this.getAttribute("animated") !== "false", this._buildChart();
  }
  handleAttributeChange() {
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
    const s = e.length, a = 3, o = 60, c = 110, l = 56, u = s * l + (s - 1) * a, h = u + c, f = u + o, d = i === "sequential" ? Ja(fp).domain([0, 1]) : to(up).domain([-1, 0, 1]), g = this.isRtl;
    let p = "";
    for (let v = 0; v < s; v++) {
      const _ = c + v * (l + a) + l / 2, x = o / 2;
      p += `<text class="header-text" x="${g ? h - _ : _}" y="${x}">${this._escapeHtml(e[v])}</text>`;
    }
    for (let v = 0; v < s; v++) {
      const _ = o + v * (l + a) + l / 2, x = g ? h - c / 2 : c / 2;
      p += `<text class="header-text" x="${x}" y="${_}">${this._escapeHtml(e[v])}</text>`;
    }
    for (let v = 0; v < s; v++)
      for (let _ = 0; _ < s; _++) {
        const x = ((y = r[v]) == null ? void 0 : y[_]) ?? 0, k = d(x), $ = this._contrastColor(k), A = (v + _) * 40;
        let w = c + _ * (l + a);
        g && (w = h - w - l);
        const C = o + v * (l + a), T = w + l / 2, S = C + l / 2;
        p += `<g class="cell" data-delay="${A}" data-value="${x.toFixed(2)}" style="transform-origin: ${T}px ${S}px; opacity: 0; transform: scale(0.5);">`, p += `<rect x="${w}" y="${C}" width="${l}" height="${l}" rx="6" ry="6" fill="${k}"/>`, p += `<text class="cell-text" x="${T}" y="${S}" fill="${$}">${x.toFixed(2)}</text>`, p += "</g>";
      }
    const m = `
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;
    this.render(m), this._svg = this.root.querySelector("svg");
    const b = this.root.querySelector(".tooltip");
    this._svg && b && this._svg.querySelectorAll(".cell").forEach((v) => {
      v.addEventListener("mouseenter", (_) => {
        const k = _.currentTarget.dataset.value || "";
        b.textContent = k, b.style.opacity = "1";
      }), v.addEventListener("mousemove", (_) => {
        const x = _, k = this.root.querySelector("div").getBoundingClientRect();
        b.style.left = `${x.clientX - k.left + 10}px`, b.style.top = `${x.clientY - k.top - 28}px`;
      }), v.addEventListener("mouseleave", () => {
        b.style.opacity = "0";
      });
    });
  }
  _contrastColor(e) {
    const r = Jt(e);
    if (!r) return "#000";
    const i = r.rgb();
    return (0.299 * i.r + 0.587 * i.g + 0.114 * i.b) / 255 > 0.5 ? "#000" : "#fff";
  }
  _escapeHtml(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-heatmap", Lp);
const Np = `
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
`, Fe = { top: 20, right: 30, bottom: 40, left: 60 }, oo = 500, lo = 250, se = oo - Fe.left - Fe.right, qt = lo - Fe.top - Fe.bottom;
class Rp extends F {
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
    super.connectedCallback(), this.adoptStyles(Np), this.root.innerHTML = "<svg></svg>", this._buildChart(), this._resizeObs = new ResizeObserver(() => {
    }), this._resizeObs.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObs) == null || e.disconnect(), this._resizeObs = null;
  }
  handleAttributeChange(e, r, i) {
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
    K(r).selectAll("*").remove();
    const u = K(r).attr("viewBox", `0 0 ${oo} ${lo}`).attr("preserveAspectRatio", "xMidYMid meet");
    this._svg = u;
    const h = u.append("defs"), f = `lv-area-grad-${Math.random().toString(36).slice(2, 8)}`, d = h.append("linearGradient").attr("id", f).attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");
    d.append("stop").attr("offset", "0%").attr("stop-color", i).attr("stop-opacity", 0.25), d.append("stop").attr("offset", "100%").attr("stop-color", i).attr("stop-opacity", 0);
    const g = u.append("g").attr("transform", `translate(${Fe.left},${Fe.top})`), p = jn(e, (A) => A.x), m = jn(e, (A) => A.y), b = (m[1] - m[0]) * 0.1 || 1, y = ve().domain(p).range([0, se]), v = ve().domain([m[0] - b, m[1] + b]).range([qt, 0]);
    if (g.append("g").attr("class", "grid").attr("transform", `translate(0,${qt})`).call(
      Zn(y).tickSize(-qt).tickFormat(() => "")
    ), g.append("g").attr("class", "grid").call(
      Qn(v).tickSize(-se).tickFormat(() => "")
    ), g.append("g").attr("class", "axis x-axis").attr("transform", `translate(0,${qt})`).call(Zn(y).ticks(6)), g.append("g").attr("class", "axis y-axis").call(Qn(v).ticks(5)), c && g.append("text").attr("class", "axis-label").attr("x", se / 2).attr("y", qt + 35).attr("text-anchor", "middle").text(c), l && g.append("text").attr("class", "axis-label").attr("x", -qt / 2).attr("y", -38).attr("transform", "rotate(-90)").attr("text-anchor", "middle").text(l), s) {
      const A = wp().x((w) => y(w.x)).y0(qt).y1((w) => v(w.y));
      g.append("path").datum(e).attr("class", "area").attr("d", A).attr("fill", `url(#${f})`);
    }
    const _ = Vi().x((A) => y(A.x)).y((A) => v(A.y)), x = g.append("path").datum(e).attr("class", "line").attr("d", _).attr("stroke", i).attr("stroke-width", 2.5), $ = x.node().getTotalLength();
    x.attr("stroke-dasharray", $).attr("stroke-dashoffset", $), a && g.selectAll(".point").data(e).enter().append("circle").attr("class", "point").attr("cx", (A) => y(A.x)).attr("cy", (A) => v(A.y)).attr("r", 4).attr("fill", i).attr("stroke", "white").attr("stroke-width", 1.5), o && this._setupTooltip(g, e, y, v, i), this._built = !0, this.getAttribute("animated") === "false" && this._showInstant();
  }
  _setupTooltip(e, r, i, s, a) {
    const o = e.append("g").attr("class", "tooltip-group").style("display", "none");
    o.append("line").attr("class", "crosshair crosshair-x").attr("y1", 0).attr("y2", qt), o.append("line").attr("class", "crosshair crosshair-y").attr("x1", 0).attr("x2", se), o.append("circle").attr("r", 5).attr("fill", a).attr("stroke", "white").attr("stroke-width", 2), o.append("rect").attr("class", "tooltip-bg").attr("width", 60).attr("height", 24).attr("rx", 6), o.append("text").attr("class", "tooltip-text").attr("text-anchor", "middle").attr("dy", "0.35em");
    const c = Si((l) => l.x).left;
    e.append("rect").attr("width", se).attr("height", qt).attr("fill", "transparent").on("mousemove", (l) => {
      const [u] = ri(l), h = i.invert(u);
      let f = c(r, h, 1);
      if (f >= r.length && (f = r.length - 1), f > 0) {
        const _ = r[f - 1], x = r[f];
        f = h - _.x > x.x - h ? f : f - 1;
      }
      const d = r[f], g = i(d.x), p = s(d.y);
      o.style("display", null), o.select(".crosshair-x").attr("x1", g).attr("x2", g), o.select(".crosshair-y").attr("y1", p).attr("y2", p), o.select("circle").attr("cx", g).attr("cy", p);
      const m = 60, b = 24;
      let y = g - m / 2, v = p - b - 10;
      y < 0 && (y = 0), y + m > se && (y = se - m), v < 0 && (v = p + 10), o.select(".tooltip-bg").attr("x", y).attr("y", v), o.select(".tooltip-text").attr("x", y + m / 2).attr("y", v + b / 2).text(`${d.y.toFixed(1)}`);
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
    i.attr("stroke-dasharray", s).attr("stroke-dashoffset", s).transition().duration(1200).ease(dn).attr("stroke-dashoffset", 0), r.select(".area").transition().delay(1500).duration(0).on("start", function() {
      K(this).classed("visible", !0);
    }), r.selectAll(".point").each(function(o, c) {
      K(this).transition().delay(1500 + c * 50).duration(0).on("start", function() {
        K(this).classed("visible", !0);
      });
    });
  }
}
customElements.define("lv-line-chart", Rp);
const Rn = {
  sigmoid: (n) => 1 / (1 + Math.exp(-n)),
  relu: (n) => Math.max(0, n),
  tanh: (n) => Math.tanh(n),
  linear: (n) => n
}, Dp = `
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
`, Vs = 500, Xs = 300;
class Fp extends F {
  constructor() {
    super(...arguments);
    O(this, "_hasAnimated", !1);
    O(this, "_resizeObserver", null);
    O(this, "_svg", null);
    O(this, "_fn", Rn.sigmoid);
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
    super.connectedCallback(), this.adoptStyles(Dp);
    const e = document.createElement("div");
    this.root.appendChild(e);
    const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    r.setAttribute("viewBox", `0 0 ${Vs} ${Xs}`), r.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.appendChild(r), this._svg = K(r), this._parseFn(), this._render(!1), this._resizeObserver = new ResizeObserver(() => {
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = null;
  }
  handleAttributeChange(e, r, i) {
    r !== i && (e === "fn" && this._parseFn(), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e || !this._animated ? this._render(!1) : this._render(!0));
  }
  _parseFn() {
    const e = this.getAttribute("fn") || "sigmoid";
    if (this._fnName = e, Rn[e])
      this._fn = Rn[e];
    else
      try {
        const r = e.replace(/^\s*x\s*=>\s*/, "");
        this._fn = new Function("x", "return " + r), this._fnName = "custom";
      } catch {
        this._fn = Rn.sigmoid, this._fnName = "sigmoid";
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
    const i = this._generateData(), [s, a] = this._range, o = i.map((x) => x.y), c = kc(o) ?? -1, l = ya(o) ?? 1, u = (l - c) * 0.15 || 0.5, h = c - u, f = l + u, d = { top: 20, right: 30, bottom: 30, left: 40 }, g = Vs - d.left - d.right, p = Xs - d.top - d.bottom, m = ve().domain([s, a]).range([0, g]), b = ve().domain([h, f]).range([p, 0]), y = r.append("g").attr("transform", `translate(${d.left},${d.top})`);
    this._drawGrid(y, m, b, g, p), this._drawAxes(y, m, b, g, p);
    const v = Vi().x((x) => m(x.x)).y((x) => b(x.y)).curve(zp), _ = y.append("path").datum(i).attr("class", "fn-line").attr("d", v).attr("stroke", this._color).attr("stroke-width", 3);
    if (e) {
      const k = _.node().getTotalLength();
      _.attr("stroke-dasharray", k).attr("stroke-dashoffset", k).transition().duration(1e3).ease(dn).attr("stroke-dashoffset", 0);
    }
    this._drawKeyPoints(y, m, b), this._interactive && this._addInteractivePoint(y, m, b, i, g, p);
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
      const m = r(p);
      e.append("line").attr("class", "axis-line").attr("x1", m).attr("x2", m).attr("y1", h - 3).attr("y2", h + 3), e.append("text").attr("class", "axis-text").attr("x", m).attr("y", h + 14).attr("text-anchor", "middle").text(p);
    }), i.ticks().forEach((p) => {
      const m = i(p);
      e.append("line").attr("class", "axis-line").attr("x1", f - 3).attr("x2", f + 3).attr("y1", m).attr("y2", m), e.append("text").attr("class", "axis-text").attr("x", f - 12).attr("y", m).attr("dy", "0.35em").attr("text-anchor", "end").text(p);
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
    const [c, l] = this._range, u = this._fn, h = (c + l) / 2, f = u(h), d = e.append("line").attr("class", "crosshair").attr("x1", r(h)).attr("x2", r(h)).attr("y1", i(f)).attr("y2", o), g = e.append("line").attr("class", "crosshair").attr("x1", 0).attr("x2", r(h)).attr("y1", i(f)).attr("y2", i(f)), p = e.append("g"), m = p.append("rect").attr("class", "readout-bg").attr("width", 160).attr("height", 24).attr("rx", 6), b = p.append("text").attr("class", "readout-text").attr("text-anchor", "middle"), y = e.append("circle").attr("class", "drag-point").attr("cx", r(h)).attr("cy", i(f)).attr("r", 8).attr("fill", this._color).attr("stroke", "#fff").attr("stroke-width", 2), v = (x, k, $, A) => {
      const w = `x = ${$.toFixed(2)}, y = ${A.toFixed(2)}`;
      b.text(w);
      const C = 160, T = 24, S = 12;
      let M = x - C / 2, E = k - T - S;
      M < 0 && (M = 0), M + C > a && (M = a - C), E < 0 && (E = k + S), m.attr("x", M).attr("y", E).attr("width", C).attr("height", T), b.attr("x", M + C / 2).attr("y", E + T / 2).attr("text-anchor", "middle");
    };
    v(r(h), i(f), h, f);
    const _ = xh().on("drag", (x) => {
      const k = Math.max(0, Math.min(a, x.x)), $ = r.invert(k), A = Math.max(c, Math.min(l, $)), w = u(A), C = r(A), T = i(w);
      y.attr("cx", C).attr("cy", T), d.attr("x1", C).attr("x2", C).attr("y1", T).attr("y2", o), g.attr("x1", 0).attr("x2", C).attr("y1", T).attr("y2", T), v(C, T, A, w);
    });
    y.call(_);
  }
}
customElements.define("lv-function", Fp);
const Ys = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Ip = `
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
`, gt = { top: 20, right: 20, bottom: 50, left: 55 }, Gs = 500, qr = 400;
class qp extends F {
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
    super.connectedCallback(), this.adoptStyles(Ip), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || Ys[e % 8];
  }
  _clusterColor(e) {
    const i = [...new Set(this._data.map((o) => o.cluster).filter((o) => o != null))].indexOf(e), s = i >= 0 ? i : 0;
    return getComputedStyle(this).getPropertyValue(`--lv-chart-${s % 8}`).trim() || Ys[s % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = K(e), this._svg.append("g").attr("class", "grid-group"), this._svg.append("g").attr("class", "axis-group"), this._svg.append("g").attr("class", "points-group"), this._svg.append("g").attr("class", "tooltip-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("clusters"), s = this.hasAttribute("tooltip"), a = this.getAttribute("x-label") || "", o = this.getAttribute("y-label") || "", c = i ? [...new Set(r.map((P) => P.cluster).filter((P) => P != null))] : [], l = c.length > 0 ? 30 : 0, u = qr + l, h = Gs - gt.left - gt.right, f = qr - gt.top - gt.bottom;
    this._svg.attr("viewBox", `0 0 ${Gs} ${u}`);
    const d = jn(r, (P) => P.x), g = jn(r, (P) => P.y), p = (d[1] - d[0]) * 0.05 || 1, m = (g[1] - g[0]) * 0.05 || 1, b = ve().domain([d[0] - p, d[1] + p]).range([0, h]), y = ve().domain([g[0] - m, g[1] + m]).range([f, 0]), v = this._svg.select(".grid-group").attr("transform", `translate(${gt.left},${gt.top})`);
    v.selectAll("*").remove();
    const _ = Zn(b).tickSize(-f).tickFormat(() => "");
    v.append("g").attr("class", "grid").attr("transform", `translate(0,${f})`).call(_);
    const x = Qn(y).tickSize(-h).tickFormat(() => "");
    v.append("g").attr("class", "grid").call(x);
    const k = this._svg.select(".axis-group").attr("transform", `translate(${gt.left},${gt.top})`);
    k.selectAll("*").remove(), k.append("g").attr("class", "axis").attr("transform", `translate(0,${f})`).call(Zn(b).ticks(6)), k.append("g").attr("class", "axis").call(Qn(y).ticks(6)), a && k.append("text").attr("class", "axis-label").attr("x", h / 2).attr("y", f + 38).attr("text-anchor", "middle").text(a), o && k.append("text").attr("class", "axis-label").attr("x", -f / 2).attr("y", -40).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text(o);
    const $ = this._svg.select(".points-group").attr("transform", `translate(${gt.left},${gt.top})`), A = this._svg.select(".tooltip-group").attr("transform", `translate(${gt.left},${gt.top})`);
    A.selectAll("*").remove();
    const w = A.append("g").attr("class", "tooltip-box");
    w.append("rect").attr("class", "tooltip-bg"), w.append("text").attr("class", "tooltip-text");
    const C = $.selectAll(".point").data(r, (P, z) => String(z));
    C.exit().remove();
    const T = C.enter().append("circle").attr("class", "point").attr("cx", (P) => b(P.x)).attr("cy", (P) => y(P.y)).attr("r", 5).attr("fill", (P, z) => i && P.cluster != null ? this._clusterColor(P.cluster) : this._getColor(z, P)).attr("opacity", e ? 0 : 1).attr("transform", e ? "scale(0)" : "scale(1)").style("transform-origin", (P) => `${b(P.x)}px ${y(P.y)}px`);
    s ? T.on("mouseenter", (P, z) => {
      var D;
      if (K(P.currentTarget).transition().duration(150).attr("r", 6.5).attr("opacity", 1), z.label) {
        const B = b(z.x), I = y(z.y) - 14;
        w.classed("visible", !0), w.select(".tooltip-text").attr("x", B).attr("y", I).text(z.label);
        const tt = w.select(".tooltip-text").node(), it = ((D = tt == null ? void 0 : tt.getComputedTextLength) == null ? void 0 : D.call(tt)) || 40;
        w.select(".tooltip-bg").attr("x", B - it / 2 - 6).attr("y", I - 10).attr("width", it + 12).attr("height", 20);
      }
    }).on("mouseleave", (P) => {
      K(P.currentTarget).transition().duration(150).attr("r", 5).attr("opacity", 0.85), w.classed("visible", !1);
    }) : T.on("mouseenter", (P) => {
      K(P.currentTarget).transition().duration(150).attr("r", 6.5);
    }).on("mouseleave", (P) => {
      K(P.currentTarget).transition().duration(150).attr("r", 5);
    });
    const S = T.merge(C);
    if (e ? S.each(function(P, z) {
      K(this).transition().delay(z * 30).duration(400).ease(od).attr("opacity", 0.85).attr("transform", "scale(1)");
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
      const P = qr + 5;
      let z = gt.left;
      for (const L of c) {
        const D = this._clusterColor(L);
        E.append("circle").attr("cx", z + 5).attr("cy", P + 8).attr("r", 4).attr("fill", D), E.append("text").attr("class", "legend-text").attr("x", z + 14).attr("y", P + 8).attr("dominant-baseline", "central").text(String(L)), z += 14 + String(L).length * 7 + 20;
      }
    }
  }
}
customElements.define("lv-scatter", qp);
const Hp = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Bp = `
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
`, Ue = 300, Vp = 130, Us = 26, Ws = 16;
class Xp extends F {
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
    super.connectedCallback(), this.adoptStyles(Bp), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", [])), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _getColor(e, r) {
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || Hp[e % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = K(e), this._svg.append("g").attr("class", "arcs-group"), this._svg.append("g").attr("class", "labels-group"), this._svg.append("g").attr("class", "hover-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("donut"), s = this.hasAttribute("legend"), a = Vp, o = i ? a * 0.6 : 0, c = a + 5, l = s ? r.length : 0, u = l > 0 ? Ws + l * Us : 0, h = Ue + u;
    this._svg.attr("viewBox", `0 0 ${Ue} ${h}`);
    const f = Ue / 2, d = Ue / 2, p = Cp().value((A) => A.value).sort(null).padAngle(0.015)(r), m = Is().innerRadius(o).outerRadius(a), b = Is().innerRadius(o).outerRadius(c), y = this._svg.select(".arcs-group").attr("transform", `translate(${f},${d})`);
    y.selectAll("*").remove();
    const v = this._svg.select(".hover-group").attr("transform", `translate(${f},${d})`);
    v.selectAll("*").remove();
    const _ = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 0), x = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 18).style("font-size", "11px").style("font-weight", "400");
    for (let A = 0; A < p.length; A++) {
      const w = p[A], C = this._getColor(A, w.data), T = y.append("path").attr("class", "arc").attr("fill", C).attr("stroke", "var(--lv-bg, #0f0f23)").attr("stroke-width", 1.5);
      if (e) {
        const S = { ...w, endAngle: w.startAngle };
        T.attr("d", m(S)).transition().delay(A * 120).duration(800).ease(dn).attrTween("d", () => {
          const M = xe(S, w);
          return (E) => m(M(E));
        });
      } else
        T.attr("d", m(w));
      T.on("mouseenter", () => {
        if (T.transition().duration(150).attr("d", b(w)), i)
          _.text(w.data.label).classed("visible", !0), x.text(String(w.data.value)).classed("visible", !0);
        else {
          const [S, M] = m.centroid(w);
          _.attr("x", S * 1.6).attr("y", M * 1.6 - 8).text(w.data.label).classed("visible", !0), x.attr("x", S * 1.6).attr("y", M * 1.6 + 8).text(String(w.data.value)).classed("visible", !0);
        }
      }).on("mouseleave", () => {
        T.transition().duration(150).attr("d", m(w)), _.classed("visible", !1), x.classed("visible", !1);
      });
    }
    const k = this._svg.select(".labels-group").attr("transform", `translate(${f},${d})`);
    if (k.selectAll("*").remove(), !s)
      for (let A = 0; A < p.length; A++) {
        const w = p[A];
        if (w.endAngle - w.startAngle > 0.35) {
          const [T, S] = m.centroid(w), M = k.append("text").attr("class", "arc-label").attr("x", T).attr("y", S).text(w.data.label);
          e && M.attr("opacity", 0).transition().delay(A * 120 + 600).duration(300).attr("opacity", 1);
        }
      }
    const $ = this._svg.select(".legend-group");
    if ($.selectAll("*").remove(), s && r.length > 0) {
      const A = Ue + Ws;
      for (let w = 0; w < r.length; w++) {
        const T = A + w * Us, S = this._getColor(w, r[w]);
        $.append("rect").attr("class", "legend-swatch").attr("x", 20).attr("y", T - 5).attr("width", 10).attr("height", 10).attr("fill", S), $.append("text").attr("class", "legend-text").attr("x", 38).attr("y", T).attr("dominant-baseline", "central").text(`${r[w].label} (${r[w].value})`);
      }
    }
  }
}
customElements.define("lv-pie", Xp);
const Yp = `
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
`, st = 120, St = 90, Hr = 60, Br = 40, js = 10, Ks = 2, Zs = 8, We = 60;
function Vr(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class Gp extends F {
  constructor() {
    super(...arguments);
    O(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Yp), this._readChildren(), this._renderSvg();
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
    i ? (l = o * 2 + e.length * st + (e.length - 1) * Hr, u = o * 2 + St + c) : (l = o * 2 + st + c, u = o * 2 + e.length * St + (e.length - 1) * Br);
    const h = [];
    for (let v = 0; v < e.length; v++)
      if (i) {
        let _ = o + v * (st + Hr);
        a && (_ = l - o - st - v * (st + Hr)), h.push({ x: _, y: o });
      } else
        h.push({ x: o, y: o + v * (St + Br) });
    const f = "arrowhead", d = Zs, g = Zs, p = `
      <defs>
        <marker id="${f}" markerWidth="${d}" markerHeight="${g}"
                refX="${d}" refY="${g / 2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${d},${g / 2} L0,${g} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;
    let m = "";
    for (let v = 0; v < e.length; v++) {
      const _ = e[v], x = h[v], k = _.active ? _.color : "var(--lv-border, #333)", $ = _.active ? ' filter="url(#glow)"' : "";
      m += `
        <g class="step-group" style="transition-delay: ${v * 150}ms">
          <rect x="${x.x}" y="${x.y}" width="${st}" height="${St}"
                rx="${js}" ry="${js}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${k}" stroke-width="${_.active ? 2.5 : 1.5}"
                ${$} />
          <text x="${x.x + st / 2}" y="${x.y + 30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${Vr(_.icon)}
          </text>
          <text x="${x.x + st / 2}" y="${x.y + 54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${Vr(_.label)}
          </text>
          <text x="${x.x + st / 2}" y="${x.y + 70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${Vr(_.sub)}
          </text>
        </g>`;
    }
    let b = "";
    for (let v = 0; v < e.length - 1; v++) {
      const _ = h[v], x = h[v + 1], k = e.length * 150 + v * 120;
      let $;
      if (i) {
        const w = a ? _.x : _.x + st, C = a ? x.x + st : x.x, T = _.y + St / 2, M = Math.abs(C - w) * 0.35, E = C > w ? 1 : -1;
        $ = `M${w},${T} C${w + E * M},${T} ${C - E * M},${T} ${C},${T}`;
      } else {
        const w = _.x + st / 2, C = _.y + St, T = x.y, S = (T - C) * 0.4;
        $ = `M${w},${C} C${w},${C + S} ${w},${T - S} ${w},${T}`;
      }
      const A = i ? Math.abs(h[v + 1].x - h[v].x) + 20 : Br + St;
      b += `
        <path class="arrow-path" d="${$}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Ks}"
              marker-end="url(#${f})"
              stroke-dasharray="${A}"
              stroke-dashoffset="${A}"
              style="transition-delay: ${k}ms" />`;
    }
    if (s && e.length > 1) {
      const v = h[0], _ = h[e.length - 1], x = e.length * 150 + (e.length - 1) * 120;
      let k, $;
      if (i) {
        const A = _.x + st / 2, w = v.x + st / 2, C = _.y + St, T = v.y + St, S = Math.max(C, T) + We;
        k = `M${A},${C} C${A},${S} ${w},${S} ${w},${T}`, $ = Math.abs(A - w) + We * 2;
      } else {
        const A = _.x + st, w = _.y + St / 2, C = v.y + St / 2, T = A + We;
        k = `M${A},${w} C${T},${w} ${T},${C} ${A},${C}`, $ = Math.abs(w - C) + We * 2;
      }
      b += `
        <path class="arrow-path" d="${k}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Ks}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${x}ms" />`;
    }
    const y = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${b}
        ${m}
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
class Up extends HTMLElement {
}
customElements.define("lv-flow", Gp);
customElements.define("lv-flow-step", Up);
const Wp = `
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
function Qs(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class jp extends F {
  constructor() {
    super(...arguments);
    O(this, "_items", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Wp), this._readChildren(), this._renderTimeline();
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
            ${i.date ? `<div class="tl-date">${Qs(i.date)}</div>` : ""}
            ${i.title ? `<div class="tl-title">${Qs(i.title)}</div>` : ""}
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
class Kp extends HTMLElement {
}
customElements.define("lv-timeline", jp);
customElements.define("lv-timeline-item", Kp);
function Ht(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function co(n, t) {
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
var bt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Ie = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Xi, J, V, Ct = 1e8, H = 1 / Ct, di = Math.PI * 2, Zp = di / 4, Qp = 0, uo = Math.sqrt, Jp = Math.cos, t0 = Math.sin, Z = function(t) {
  return typeof t == "string";
}, U = function(t) {
  return typeof t == "function";
}, Xt = function(t) {
  return typeof t == "number";
}, Yi = function(t) {
  return typeof t > "u";
}, Dt = function(t) {
  return typeof t == "object";
}, ct = function(t) {
  return t !== !1;
}, Gi = function() {
  return typeof window < "u";
}, Dn = function(t) {
  return U(t) || Z(t);
}, ho = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, rt = Array.isArray, e0 = /random\([^)]+\)/g, n0 = /,\s*/g, Js = /(?:-?\.?\d|\.)+/gi, fo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Se = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Xr = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, po = /[+-]=-?[.\d]+/, r0 = /[^,'"\[\]\s]+/gi, i0 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Y, zt, pi, Ui, wt = {}, dr = {}, go, _o = function(t) {
  return (dr = qe(t, wt)) && dt;
}, Wi = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, _n = function(t, e) {
  return !e && console.warn(t);
}, mo = function(t, e) {
  return t && (wt[t] = e) && dr && (dr[t] = e) || wt;
}, mn = function() {
  return 0;
}, s0 = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Gn = {
  suppressEvents: !0,
  kill: !1
}, a0 = {
  suppressEvents: !0
}, ji = {}, Zt = [], gi = {}, vo, _t = {}, Yr = {}, ta = 30, Un = [], Ki = "", Zi = function(t) {
  var e = t[0], r, i;
  if (Dt(e) || U(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (i = Un.length; i-- && !Un[i].targetTest(e); )
      ;
    r = Un[i];
  }
  for (i = t.length; i--; )
    t[i] && (t[i]._gsap || (t[i]._gsap = new Bo(t[i], r))) || t.splice(i, 1);
  return t;
}, de = function(t) {
  return t._gsap || Zi($t(t))[0]._gsap;
}, xo = function(t, e, r) {
  return (r = t[e]) && U(r) ? t[e]() : Yi(r) && t.getAttribute && t.getAttribute(e) || r;
}, ut = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, W = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, X = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Pe = function(t, e) {
  var r = e.charAt(0), i = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i;
}, o0 = function(t, e) {
  for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, pr = function() {
  var t = Zt.length, e = Zt.slice(0), r, i;
  for (gi = {}, Zt.length = 0, r = 0; r < t; r++)
    i = e[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Qi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, bo = function(t, e, r, i) {
  Zt.length && !J && pr(), t.render(e, r, !!(J && e < 0 && Qi(t))), Zt.length && !J && pr();
}, yo = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(r0).length < 2 ? e : Z(t) ? t.trim() : t;
}, wo = function(t) {
  return t;
}, kt = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, l0 = function(t) {
  return function(e, r) {
    for (var i in r)
      i in e || i === "duration" && t || i === "ease" || (e[i] = r[i]);
  };
}, qe = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, ea = function n(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = Dt(e[r]) ? n(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, gr = function(t, e) {
  var r = {}, i;
  for (i in t)
    i in e || (r[i] = t[i]);
  return r;
}, an = function(t) {
  var e = t.parent || Y, r = t.keyframes ? l0(rt(t.keyframes)) : kt;
  if (ct(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, c0 = function(t, e) {
  for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, ko = function(t, e, r, i, s) {
  var a = t[i], o;
  if (s)
    for (o = e[s]; a && a[s] > o; )
      a = a._prev;
  return a ? (e._next = a._next, a._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = a, e.parent = e._dp = t, e;
}, Ar = function(t, e, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = e._prev, a = e._next;
  s ? s._next = a : t[r] === e && (t[r] = a), a ? a._prev = s : t[i] === e && (t[i] = s), e._next = e._prev = e.parent = null;
}, te = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, pe = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, u0 = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, _i = function(t, e, r, i) {
  return t._startAt && (J ? t._startAt.revert(Gn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i));
}, h0 = function n(t) {
  return !t || t._ts && n(t.parent);
}, na = function(t) {
  return t._repeat ? He(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, He = function(t, e) {
  var r = Math.floor(t = X(t / e));
  return t && r === t ? r - 1 : r;
}, _r = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Cr = function(t) {
  return t._end = X(t._start + (t._tDur / Math.abs(t._ts || t._rts || H) || 0));
}, $r = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = X(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Cr(t), r._dirty || pe(r, t)), t;
}, Ao = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = _r(t.rawTime(), e), (!e._dur || $n(0, e.totalDuration(), r) - e._tTime > H) && e.render(r, !0)), pe(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -H;
  }
}, Ot = function(t, e, r, i) {
  return e.parent && te(e), e._start = X((Xt(r) ? r : r || t !== Y ? At(t, r, e) : t._time) + e._delay), e._end = X(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ko(t, e, "_first", "_last", t._sort ? "_start" : 0), mi(e) || (t._recent = e), i || Ao(t, e), t._ts < 0 && $r(t, t._tTime), t;
}, Co = function(t, e) {
  return (wt.ScrollTrigger || Wi("scrollTrigger", e)) && wt.ScrollTrigger.create(e, t);
}, $o = function(t, e, r, i, s) {
  if (ts(t, e, s), !t._initted)
    return 1;
  if (!r && t._pt && !J && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && vo !== mt.frame)
    return Zt.push(t), t._lazy = [s, i], 1;
}, f0 = function n(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || n(e));
}, mi = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, d0 = function(t, e, r, i) {
  var s = t.ratio, a = e < 0 || !e && (!t._start && f0(t) && !(!t._initted && mi(t)) || (t._ts < 0 || t._dp._ts < 0) && !mi(t)) ? 0 : 1, o = t._rDelay, c = 0, l, u, h;
  if (o && t._repeat && (c = $n(0, t._tDur, e), u = He(c, o), t._yoyo && u & 1 && (a = 1 - a), u !== He(t._tTime, o) && (s = 1 - a, t.vars.repeatRefresh && t._initted && t.invalidate())), a !== s || J || i || t._zTime === H || !e && t._zTime) {
    if (!t._initted && $o(t, e, i, r, c))
      return;
    for (h = t._zTime, t._zTime = e || (r ? H : 0), r || (r = e && !h), t.ratio = a, t._from && (a = 1 - a), t._time = 0, t._tTime = c, l = t._pt; l; )
      l.r(a, l.d), l = l._next;
    e < 0 && _i(t, e, r, !0), t._onUpdate && !r && vt(t, "onUpdate"), c && t._repeat && !r && t.parent && vt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === a && (a && te(t, 1), !r && !J && (vt(t, a ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, p0 = function(t, e, r) {
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
}, Be = function(t, e, r, i) {
  var s = t._repeat, a = X(e) || 0, o = t._tTime / t._tDur;
  return o && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = s ? s < 0 ? 1e10 : X(a * (s + 1) + t._rDelay * s) : a, o > 0 && !i && $r(t, t._tTime = t._tDur * o), t.parent && Cr(t), r || pe(t.parent, t), t;
}, ra = function(t) {
  return t instanceof at ? pe(t) : Be(t, t._dur);
}, g0 = {
  _start: 0,
  endTime: mn,
  totalDuration: mn
}, At = function n(t, e, r) {
  var i = t.labels, s = t._recent || g0, a = t.duration() >= Ct ? s.endTime(!1) : t._dur, o, c, l;
  return Z(e) && (isNaN(e) || e in i) ? (c = e.charAt(0), l = e.substr(-1) === "%", o = e.indexOf("="), c === "<" || c === ">" ? (o >= 0 && (e = e.replace(/=/, "")), (c === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (o < 0 ? s : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = a), i[e]) : (c = parseFloat(e.charAt(o - 1) + e.substr(o + 1)), l && r && (c = c / 100 * (rt(r) ? r[0] : r).totalDuration()), o > 1 ? n(t, e.substr(0, o - 1), r) + c : a + c)) : e == null ? a : +e;
}, on = function(t, e, r) {
  var i = Xt(e[1]), s = (i ? 2 : 1) + (t < 2 ? 0 : 1), a = e[s], o, c;
  if (i && (a.duration = e[1]), a.parent = r, t) {
    for (o = a, c = r; c && !("immediateRender" in o); )
      o = c.vars.defaults || {}, c = ct(c.vars.inherit) && c.parent;
    a.immediateRender = ct(o.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[s - 1];
  }
  return new j(e[0], a, e[s + 1]);
}, re = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, $n = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, nt = function(t, e) {
  return !Z(t) || !(e = i0.exec(t)) ? "" : e[1];
}, _0 = function(t, e, r) {
  return re(r, function(i) {
    return $n(t, e, i);
  });
}, vi = [].slice, So = function(t, e) {
  return t && Dt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && Dt(t[0])) && !t.nodeType && t !== zt;
}, m0 = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(i) {
    var s;
    return Z(i) && !e || So(i, 1) ? (s = r).push.apply(s, $t(i)) : r.push(i);
  }) || r;
}, $t = function(t, e, r) {
  return V && !e && V.selector ? V.selector(t) : Z(t) && !r && (pi || !Ve()) ? vi.call((e || Ui).querySelectorAll(t), 0) : rt(t) ? m0(t, r) : So(t) ? vi.call(t, 0) : t ? [t] : [];
}, xi = function(t) {
  return t = $t(t)[0] || _n("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return $t(e, r.querySelectorAll ? r : r === t ? _n("Invalid scope") || Ui.createElement("div") : t);
  };
}, To = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Mo = function(t) {
  if (U(t))
    return t;
  var e = Dt(t) ? t : {
    each: t
  }, r = ge(e.ease), i = e.from || 0, s = parseFloat(e.base) || 0, a = {}, o = i > 0 && i < 1, c = isNaN(i) || o, l = e.axis, u = i, h = i;
  return Z(i) ? u = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && c && (u = i[0], h = i[1]), function(f, d, g) {
    var p = (g || e).length, m = a[p], b, y, v, _, x, k, $, A, w;
    if (!m) {
      if (w = e.grid === "auto" ? 0 : (e.grid || [1, Ct])[1], !w) {
        for ($ = -Ct; $ < ($ = g[w++].getBoundingClientRect().left) && w < p; )
          ;
        w < p && w--;
      }
      for (m = a[p] = [], b = c ? Math.min(w, p) * u - 0.5 : i % w, y = w === Ct ? 0 : c ? p * h / w - 0.5 : i / w | 0, $ = 0, A = Ct, k = 0; k < p; k++)
        v = k % w - b, _ = y - (k / w | 0), m[k] = x = l ? Math.abs(l === "y" ? _ : v) : uo(v * v + _ * _), x > $ && ($ = x), x < A && (A = x);
      i === "random" && To(m), m.max = $ - A, m.min = A, m.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (w > p ? p - 1 : l ? l === "y" ? p / w : w : Math.max(w, p / w)) || 0) * (i === "edges" ? -1 : 1), m.b = p < 0 ? s - p : s, m.u = nt(e.amount || e.each) || 0, r = r && p < 0 ? Io(r) : r;
    }
    return p = (m[f] - m.min) / m.max || 0, X(m.b + (r ? r(p) : p) * m.v) + m.u;
  };
}, bi = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var i = X(Math.round(parseFloat(r) / t) * t * e);
    return (i - i % 1) / e + (Xt(r) ? 0 : nt(r));
  };
}, Eo = function(t, e) {
  var r = rt(t), i, s;
  return !r && Dt(t) && (i = r = t.radius || Ct, t.values ? (t = $t(t.values), (s = !Xt(t[0])) && (i *= i)) : t = bi(t.increment)), re(e, r ? U(t) ? function(a) {
    return s = t(a), Math.abs(s - a) <= i ? s : a;
  } : function(a) {
    for (var o = parseFloat(s ? a.x : a), c = parseFloat(s ? a.y : 0), l = Ct, u = 0, h = t.length, f, d; h--; )
      s ? (f = t[h].x - o, d = t[h].y - c, f = f * f + d * d) : f = Math.abs(t[h] - o), f < l && (l = f, u = h);
    return u = !i || l <= i ? t[u] : a, s || u === a || Xt(a) ? u : u + nt(a);
  } : bi(t));
}, Po = function(t, e, r, i) {
  return re(rt(t) ? !e : r === !0 ? !!(r = 0) : !i, function() {
    return rt(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i;
  });
}, v0 = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(i) {
    return e.reduce(function(s, a) {
      return a(s);
    }, i);
  };
}, x0 = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || nt(r));
  };
}, b0 = function(t, e, r) {
  return Oo(t, e, 0, 1, r);
}, zo = function(t, e, r) {
  return re(r, function(i) {
    return t[~~e(i)];
  });
}, y0 = function n(t, e, r) {
  var i = e - t;
  return rt(t) ? zo(t, n(0, t.length), e) : re(r, function(s) {
    return (i + (s - t) % i) % i + t;
  });
}, w0 = function n(t, e, r) {
  var i = e - t, s = i * 2;
  return rt(t) ? zo(t, n(0, t.length - 1), e) : re(r, function(a) {
    return a = (s + (a - t) % s) % s || 0, t + (a > i ? s - a : a);
  });
}, vn = function(t) {
  return t.replace(e0, function(e) {
    var r = e.indexOf("[") + 1, i = e.substring(r || 7, r ? e.indexOf("]") : e.length - 1).split(n0);
    return Po(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
  });
}, Oo = function(t, e, r, i, s) {
  var a = e - t, o = i - r;
  return re(s, function(c) {
    return r + ((c - t) / a * o || 0);
  });
}, k0 = function n(t, e, r, i) {
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
      h--, s = function(g) {
        g *= h;
        var p = Math.min(f, ~~g);
        return u[p](g - p);
      }, r = e;
    } else i || (t = qe(rt(t) ? [] : {}, t));
    if (!u) {
      for (c in e)
        Ji.call(o, t, c, "get", e[c]);
      s = function(g) {
        return rs(g, o) || (a ? t.p : t);
      };
    }
  }
  return re(r, s);
}, ia = function(t, e, r) {
  var i = t.labels, s = Ct, a, o, c;
  for (a in i)
    o = i[a] - e, o < 0 == !!r && o && s > (o = Math.abs(o)) && (c = a, s = o);
  return c;
}, vt = function(t, e, r) {
  var i = t.vars, s = i[e], a = V, o = t._ctx, c, l, u;
  if (s)
    return c = i[e + "Params"], l = i.callbackScope || t, r && Zt.length && pr(), o && (V = o), u = c ? s.apply(l, c) : s.call(l), V = a, u;
}, nn = function(t) {
  return te(t), t.scrollTrigger && t.scrollTrigger.kill(!!J), t.progress() < 1 && vt(t, "onInterrupt"), t;
}, Te, Lo = [], No = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Gi() || t.headless) {
      var e = t.name, r = U(t), i = e && !r && t.init ? function() {
        this._props = [];
      } : t, s = {
        init: mn,
        render: rs,
        add: Ji,
        kill: I0,
        modifier: F0,
        rawVars: 0
      }, a = {
        targetTest: 0,
        get: 0,
        getSetter: ns,
        aliases: {},
        register: 0
      };
      if (Ve(), t !== i) {
        if (_t[e])
          return;
        kt(i, kt(gr(t, s), a)), qe(i.prototype, qe(s, gr(t, a))), _t[i.prop = e] = i, t.targetTest && (Un.push(i), ji[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      mo(e, i), t.register && t.register(dt, i, ht);
    } else
      Lo.push(t);
}, q = 255, rn = {
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
}, Gr = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * q + 0.5 | 0;
}, Ro = function(t, e, r) {
  var i = t ? Xt(t) ? [t >> 16, t >> 8 & q, t & q] : 0 : rn.black, s, a, o, c, l, u, h, f, d, g;
  if (!i) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), rn[t])
      i = rn[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (s = t.charAt(1), a = t.charAt(2), o = t.charAt(3), t = "#" + s + s + a + a + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & q, i & q, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & q, t & q];
    } else if (t.substr(0, 3) === "hsl") {
      if (i = g = t.match(Js), !e)
        c = +i[0] % 360 / 360, l = +i[1] / 100, u = +i[2] / 100, a = u <= 0.5 ? u * (l + 1) : u + l - u * l, s = u * 2 - a, i.length > 3 && (i[3] *= 1), i[0] = Gr(c + 1 / 3, s, a), i[1] = Gr(c, s, a), i[2] = Gr(c - 1 / 3, s, a);
      else if (~t.indexOf("="))
        return i = t.match(fo), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = t.match(Js) || rn.transparent;
    i = i.map(Number);
  }
  return e && !g && (s = i[0] / q, a = i[1] / q, o = i[2] / q, h = Math.max(s, a, o), f = Math.min(s, a, o), u = (h + f) / 2, h === f ? c = l = 0 : (d = h - f, l = u > 0.5 ? d / (2 - h - f) : d / (h + f), c = h === s ? (a - o) / d + (a < o ? 6 : 0) : h === a ? (o - s) / d + 2 : (s - a) / d + 4, c *= 60), i[0] = ~~(c + 0.5), i[1] = ~~(l * 100 + 0.5), i[2] = ~~(u * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, Do = function(t) {
  var e = [], r = [], i = -1;
  return t.split(Qt).forEach(function(s) {
    var a = s.match(Se) || [];
    e.push.apply(e, a), r.push(i += a.length + 1);
  }), e.c = r, e;
}, sa = function(t, e, r) {
  var i = "", s = (t + i).match(Qt), a = e ? "hsla(" : "rgba(", o = 0, c, l, u, h;
  if (!s)
    return t;
  if (s = s.map(function(f) {
    return (f = Ro(f, e, 1)) && a + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), r && (u = Do(t), c = r.c, c.join(i) !== u.c.join(i)))
    for (l = t.replace(Qt, "1").split(Se), h = l.length - 1; o < h; o++)
      i += l[o] + (~c.indexOf(o) ? s.shift() || a + "0,0,0,0)" : (u.length ? u : s.length ? s : r).shift());
  if (!l)
    for (l = t.split(Qt), h = l.length - 1; o < h; o++)
      i += l[o] + s[o];
  return i + l[h];
}, Qt = (function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in rn)
    n += "|" + t + "\\b";
  return new RegExp(n + ")", "gi");
})(), A0 = /hsl[a]?\(/, Fo = function(t) {
  var e = t.join(" "), r;
  if (Qt.lastIndex = 0, Qt.test(e))
    return r = A0.test(e), t[1] = sa(t[1], r), t[0] = sa(t[0], r, Do(t[1])), !0;
}, xn, mt = (function() {
  var n = Date.now, t = 500, e = 33, r = n(), i = r, s = 1e3 / 240, a = s, o = [], c, l, u, h, f, d, g = function p(m) {
    var b = n() - i, y = m === !0, v, _, x, k;
    if ((b > t || b < 0) && (r += b - e), i += b, x = i - r, v = x - a, (v > 0 || y) && (k = ++h.frame, f = x - h.time * 1e3, h.time = x = x / 1e3, a += v + (v >= s ? 4 : s - v), _ = 1), y || (c = l(p)), _)
      for (d = 0; d < o.length; d++)
        o[d](x, f, k, m);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(m) {
      return f / (1e3 / (m || 60));
    },
    wake: function() {
      go && (!pi && Gi() && (zt = pi = window, Ui = zt.document || {}, wt.gsap = dt, (zt.gsapVersions || (zt.gsapVersions = [])).push(dt.version), _o(dr || zt.GreenSockGlobals || !zt.gsap && zt || {}), Lo.forEach(No)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && h.sleep(), l = u || function(m) {
        return setTimeout(m, a - h.time * 1e3 + 1 | 0);
      }, xn = 1, g(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(c), xn = 0, l = mn;
    },
    lagSmoothing: function(m, b) {
      t = m || 1 / 0, e = Math.min(b || 33, t);
    },
    fps: function(m) {
      s = 1e3 / (m || 240), a = h.time * 1e3 + s;
    },
    add: function(m, b, y) {
      var v = b ? function(_, x, k, $) {
        m(_, x, k, $), h.remove(v);
      } : m;
      return h.remove(m), o[y ? "unshift" : "push"](v), Ve(), v;
    },
    remove: function(m, b) {
      ~(b = o.indexOf(m)) && o.splice(b, 1) && d >= b && d--;
    },
    _listeners: o
  }, h;
})(), Ve = function() {
  return !xn && mt.wake();
}, R = {}, C0 = /^[\d.\-M][\d.\-,\s]/, $0 = /["']/g, S0 = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], s = 1, a = r.length, o, c, l; s < a; s++)
    c = r[s], o = s !== a - 1 ? c.lastIndexOf(",") : c.length, l = c.substr(0, o), e[i] = isNaN(l) ? l.replace($0, "").trim() : +l, i = c.substr(o + 1).trim();
  return e;
}, T0 = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e);
  return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
}, M0 = function(t) {
  var e = (t + "").split("("), r = R[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [S0(e[1])] : T0(t).split(",").map(yo)) : R._CE && C0.test(t) ? R._CE("", t) : r;
}, Io = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, qo = function n(t, e) {
  for (var r = t._first, i; r; )
    r instanceof at ? n(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? n(r.timeline, e) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = e)), r = r._next;
}, ge = function(t, e) {
  return t && (U(t) ? t : R[t] || M0(t)) || e;
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
    R[o] = wt[o] = s, R[a = o.toLowerCase()] = r;
    for (var c in s)
      R[a + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = R[o + "." + c] = s[c];
  }), s;
}, Ho = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Ur = function n(t, e, r) {
  var i = e >= 1 ? e : 1, s = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), a = s / di * (Math.asin(1 / i) || 0), o = function(u) {
    return u === 1 ? 1 : i * Math.pow(2, -10 * u) * t0((u - a) * s) + 1;
  }, c = t === "out" ? o : t === "in" ? function(l) {
    return 1 - o(1 - l);
  } : Ho(o);
  return s = di / s, c.config = function(l, u) {
    return n(t, l, u);
  }, c;
}, Wr = function n(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(a) {
    return a ? --a * a * ((e + 1) * a + e) + 1 : 0;
  }, i = t === "out" ? r : t === "in" ? function(s) {
    return 1 - r(1 - s);
  } : Ho(r);
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
be("Elastic", Ur("in"), Ur("out"), Ur());
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
  return -(uo(1 - n * n) - 1);
});
be("Sine", function(n) {
  return n === 1 ? 1 : -Jp(n * Zp) + 1;
});
be("Back", Wr("in"), Wr("out"), Wr());
R.SteppedEase = R.steps = wt.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, i = t + (e ? 0 : 1), s = e ? 1 : 0, a = 1 - H;
    return function(o) {
      return ((i * $n(0, a, o) | 0) + s) * r;
    };
  }
};
Ie.ease = R["quad.out"];
ut("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return Ki += n + "," + n + "Params,";
});
var Bo = function(t, e) {
  this.id = Qp++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : xo, this.set = e ? e.getSetter : ns;
}, bn = /* @__PURE__ */ (function() {
  function n(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Be(this, +e.duration, 1, 1), this.data = e.data, V && (this._ctx = V, V.data.push(this)), xn || mt.wake();
  }
  var t = n.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Be(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, i) {
    if (Ve(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for ($r(this, r), !s._dp || s.parent || Ao(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ot(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === H || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), bo(this, r, i)), this;
  }, t.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + na(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, t.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + na(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? He(this._tTime, s) + 1 : 1;
  }, t.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -H ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? _r(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -H ? 0 : this._rts, this.totalTime($n(-Math.abs(this._delay), this.totalDuration(), s), i !== !1), Cr(this), u0(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ve(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== H && (this._tTime -= H)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = X(r);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Ot(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (ct(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? _r(i.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = a0);
    var i = J;
    return J = r, Qi(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), J = i, this;
  }, t.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, ra(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, ra(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, t.seek = function(r, i) {
    return this.totalTime(At(this, r), ct(i));
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
      var o = U(r) ? r : wo, c = function() {
        var u = i.then;
        i.then = null, s && s(), U(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), a(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? c() : i._prom = c;
    });
  }, t.kill = function() {
    nn(this);
  }, n;
})();
kt(bn.prototype, {
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
  co(t, n);
  function t(r, i) {
    var s;
    return r === void 0 && (r = {}), s = n.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = ct(r.sortChildren), Y && Ot(r.parent || Y, Ht(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Co(Ht(s), r.scrollTrigger), s;
  }
  var e = t.prototype;
  return e.to = function(i, s, a) {
    return on(0, arguments, this), this;
  }, e.from = function(i, s, a) {
    return on(1, arguments, this), this;
  }, e.fromTo = function(i, s, a, o) {
    return on(2, arguments, this), this;
  }, e.set = function(i, s, a) {
    return s.duration = 0, s.parent = this, an(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new j(i, s, At(this, a), 1), this;
  }, e.call = function(i, s, a) {
    return Ot(this, j.delayedCall(0, i, s), a);
  }, e.staggerTo = function(i, s, a, o, c, l, u) {
    return a.duration = s, a.stagger = a.stagger || o, a.onComplete = l, a.onCompleteParams = u, a.parent = this, new j(i, a, At(this, c)), this;
  }, e.staggerFrom = function(i, s, a, o, c, l, u) {
    return a.runBackwards = 1, an(a).immediateRender = ct(a.immediateRender), this.staggerTo(i, s, a, o, c, l, u);
  }, e.staggerFromTo = function(i, s, a, o, c, l, u, h) {
    return o.startAt = a, an(o).immediateRender = ct(o.immediateRender), this.staggerTo(i, s, o, c, l, u, h);
  }, e.render = function(i, s, a) {
    var o = this._time, c = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, u = i <= 0 ? 0 : X(i), h = this._zTime < 0 != i < 0 && (this._initted || !l), f, d, g, p, m, b, y, v, _, x, k, $;
    if (this !== Y && u > c && i >= 0 && (u = c), u !== this._tTime || a || h) {
      if (o !== this._time && l && (u += this._time - o, i += this._time - o), f = u, _ = this._start, v = this._ts, b = !v, h && (l || (o = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (k = this._yoyo, m = l + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(m * 100 + i, s, a);
        if (f = X(u % m), u === c ? (p = this._repeat, f = l) : (x = X(u / m), p = ~~x, p && p === x && (f = l, p--), f > l && (f = l)), x = He(this._tTime, m), !o && this._tTime && x !== p && this._tTime - x * m - this._dur <= 0 && (x = p), k && p & 1 && (f = l - f, $ = 1), p !== x && !this._lock) {
          var A = k && x & 1, w = A === (k && p & 1);
          if (p < x && (A = !A), o = A ? 0 : u % l ? l : u, this._lock = 1, this.render(o || ($ ? 0 : X(p * m)), s, !l)._lock = 0, this._tTime = u, !s && this.parent && vt(this, "onRepeat"), this.vars.repeatRefresh && !$ && (this.invalidate()._lock = 1, x = p), o && o !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, c = this._tDur, w && (this._lock = 2, o = A ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !$ && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          qo(this, $);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = p0(this, X(o), X(f)), y && (u -= f - (f = y._start))), this._tTime = u, this._time = f, this._act = !v, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && u && l && !s && !x && (vt(this, "onStart"), this._tTime !== u))
        return this;
      if (f >= o && i >= 0)
        for (d = this._first; d; ) {
          if (g = d._next, (d._act || f >= d._start) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (f - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (f - d._start) * d._ts, s, a), f !== this._time || !this._ts && !b) {
              y = 0, g && (u += this._zTime = -H);
              break;
            }
          }
          d = g;
        }
      else {
        d = this._last;
        for (var C = i < 0 ? i : f; d; ) {
          if (g = d._prev, (d._act || C <= d._end) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (C - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (C - d._start) * d._ts, s, a || J && Qi(d)), f !== this._time || !this._ts && !b) {
              y = 0, g && (u += this._zTime = C ? -H : H);
              break;
            }
          }
          d = g;
        }
      }
      if (y && !s && (this.pause(), y.render(f >= o ? 0 : -H)._zTime = f >= o ? 1 : -1, this._ts))
        return this._start = _, Cr(this), this.render(i, s, a);
      this._onUpdate && !s && vt(this, "onUpdate", !0), (u === c && this._tTime >= this.totalDuration() || !u && o) && (_ === this._start || Math.abs(v) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (u === c && this._ts > 0 || !u && this._ts < 0) && te(this, 1), !s && !(i < 0 && !o) && (u || o || !c) && (vt(this, u === c && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(i, s) {
    var a = this;
    if (Xt(s) || (s = At(this, s, i)), !(i instanceof bn)) {
      if (rt(i))
        return i.forEach(function(o) {
          return a.add(o, s);
        }), this;
      if (Z(i))
        return this.addLabel(i, s);
      if (U(i))
        i = j.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Ot(this, i, s) : this;
  }, e.getChildren = function(i, s, a, o) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), a === void 0 && (a = !0), o === void 0 && (o = -Ct);
    for (var c = [], l = this._first; l; )
      l._start >= o && (l instanceof j ? s && c.push(l) : (a && c.push(l), i && c.push.apply(c, l.getChildren(!0, s, a)))), l = l._next;
    return c;
  }, e.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), a = s.length; a--; )
      if (s[a].vars.id === i)
        return s[a];
  }, e.remove = function(i) {
    return Z(i) ? this.removeLabel(i) : U(i) ? this.killTweensOf(i) : (i.parent === this && Ar(this, i), i === this._recent && (this._recent = this._last), pe(this));
  }, e.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = X(mt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(i, s) {
    return this.labels[i] = At(this, s), this;
  }, e.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, e.addPause = function(i, s, a) {
    var o = j.delayedCall(0, s || mn, a);
    return o.data = "isPause", this._hasPause = 1, Ot(this, o, At(this, i));
  }, e.removePause = function(i) {
    var s = this._first;
    for (i = At(this, i); s; )
      s._start === i && s.data === "isPause" && te(s), s = s._next;
  }, e.killTweensOf = function(i, s, a) {
    for (var o = this.getTweensOf(i, a), c = o.length; c--; )
      Wt !== o[c] && o[c].kill(i, s);
    return this;
  }, e.getTweensOf = function(i, s) {
    for (var a = [], o = $t(i), c = this._first, l = Xt(s), u; c; )
      c instanceof j ? o0(c._targets, o) && (l ? (!Wt || c._initted && c._ts) && c.globalTime(0) <= s && c.globalTime(c.totalDuration()) > s : !s || c.isActive()) && a.push(c) : (u = c.getTweensOf(o, s)).length && a.push.apply(a, u), c = c._next;
    return a;
  }, e.tweenTo = function(i, s) {
    s = s || {};
    var a = this, o = At(a, i), c = s, l = c.startAt, u = c.onStart, h = c.onStartParams, f = c.immediateRender, d, g = j.to(a, kt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale()) || H,
      onStart: function() {
        if (a.pause(), !d) {
          var m = s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale());
          g._dur !== m && Be(g, m, 0, 1).render(g._time, !0, !0), d = 1;
        }
        u && u.apply(g, h || []);
      }
    }, s));
    return f ? g.render(0) : g;
  }, e.tweenFromTo = function(i, s, a) {
    return this.tweenTo(s, kt({
      startAt: {
        time: At(this, i)
      }
    }, a));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(i) {
    return i === void 0 && (i = this._time), ia(this, At(this, i));
  }, e.previousLabel = function(i) {
    return i === void 0 && (i = this._time), ia(this, At(this, i), 1);
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
    return pe(this);
  }, e.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return n.prototype.invalidate.call(this, i);
  }, e.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, a; s; )
      a = s._next, this.remove(s), s = a;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), pe(this);
  }, e.totalDuration = function(i) {
    var s = 0, a = this, o = a._last, c = Ct, l, u, h;
    if (arguments.length)
      return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -i : i));
    if (a._dirty) {
      for (h = a.parent; o; )
        l = o._prev, o._dirty && o.totalDuration(), u = o._start, u > c && a._sort && o._ts && !a._lock ? (a._lock = 1, Ot(a, o, u - o._delay, 1)._lock = 0) : c = u, u < 0 && o._ts && (s -= u, (!h && !a._dp || h && h.smoothChildTiming) && (a._start += X(u / a._ts), a._time -= u, a._tTime -= u), a.shiftChildren(-u, !1, -1 / 0), c = 0), o._end > s && o._ts && (s = o._end), o = l;
      Be(a, a === Y && a._time > s ? a._time : s, 1, 1), a._dirty = 0;
    }
    return a._tDur;
  }, t.updateRoot = function(i) {
    if (Y._ts && (bo(Y, _r(i, Y)), vo = mt.frame), mt.frame >= ta) {
      ta += bt.autoSleep || 120;
      var s = Y._first;
      if ((!s || !s._ts) && bt.autoSleep && mt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || mt.sleep();
      }
    }
  }, t;
})(bn);
kt(at.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var E0 = function(t, e, r, i, s, a, o) {
  var c = new ht(this._pt, t, e, 0, 1, Wo, null, s), l = 0, u = 0, h, f, d, g, p, m, b, y;
  for (c.b = r, c.e = i, r += "", i += "", (b = ~i.indexOf("random(")) && (i = vn(i)), a && (y = [r, i], a(y, t, e), r = y[0], i = y[1]), f = r.match(Xr) || []; h = Xr.exec(i); )
    g = h[0], p = i.substring(l, h.index), d ? d = (d + 1) % 5 : p.substr(-5) === "rgba(" && (d = 1), g !== f[u++] && (m = parseFloat(f[u - 1]) || 0, c._pt = {
      _next: c._pt,
      p: p || u === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: g.charAt(1) === "=" ? Pe(m, g) - m : parseFloat(g) - m,
      m: d && d < 4 ? Math.round : 0
    }, l = Xr.lastIndex);
  return c.c = l < i.length ? i.substring(l, i.length) : "", c.fp = o, (po.test(i) || b) && (c.e = 0), this._pt = c, c;
}, Ji = function(t, e, r, i, s, a, o, c, l, u) {
  U(i) && (i = i(s || 0, t, a));
  var h = t[e], f = r !== "get" ? r : U(h) ? l ? t[e.indexOf("set") || !U(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, d = U(h) ? l ? N0 : Go : es, g;
  if (Z(i) && (~i.indexOf("random(") && (i = vn(i)), i.charAt(1) === "=" && (g = Pe(f, i) + (nt(f) || 0), (g || g === 0) && (i = g))), !u || f !== i || yi)
    return !isNaN(f * i) && i !== "" ? (g = new ht(this._pt, t, e, +f || 0, i - (f || 0), typeof h == "boolean" ? D0 : Uo, 0, d), l && (g.fp = l), o && g.modifier(o, this, t), this._pt = g) : (!h && !(e in t) && Wi(e, i), E0.call(this, t, e, f, i, d, c || bt.stringFilter, l));
}, P0 = function(t, e, r, i, s) {
  if (U(t) && (t = ln(t, s, e, r, i)), !Dt(t) || t.style && t.nodeType || rt(t) || ho(t))
    return Z(t) ? ln(t, s, e, r, i) : t;
  var a = {}, o;
  for (o in t)
    a[o] = ln(t[o], s, e, r, i);
  return a;
}, Vo = function(t, e, r, i, s, a) {
  var o, c, l, u;
  if (_t[t] && (o = new _t[t]()).init(s, o.rawVars ? e[t] : P0(e[t], i, s, a, r), r, i, a) !== !1 && (r._pt = c = new ht(r._pt, s, t, 0, 1, o.render, o, 0, o.priority), r !== Te))
    for (l = r._ptLookup[r._targets.indexOf(s)], u = o._props.length; u--; )
      l[o._props[u]] = c;
  return o;
}, Wt, yi, ts = function n(t, e, r) {
  var i = t.vars, s = i.ease, a = i.startAt, o = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, h = i.yoyoEase, f = i.keyframes, d = i.autoRevert, g = t._dur, p = t._startAt, m = t._targets, b = t.parent, y = b && b.data === "nested" ? b.vars.targets : m, v = t._overwrite === "auto" && !Xi, _ = t.timeline, x, k, $, A, w, C, T, S, M, E, P, z, L;
  if (_ && (!f || !s) && (s = "none"), t._ease = ge(s, Ie.ease), t._yEase = h ? Io(ge(h === !0 ? s : h, Ie.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !_ && !!i.runBackwards, !_ || f && !i.stagger) {
    if (S = m[0] ? de(m[0]).harness : 0, z = S && i[S.prop], x = gr(i, ji), p && (p._zTime < 0 && p.progress(1), e < 0 && u && o && !d ? p.render(-1, !0) : p.revert(u && g ? Gn : s0), p._lazy = 0), a) {
      if (te(t._startAt = j.set(m, kt({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && ct(c),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return vt(t, "onUpdate");
        },
        stagger: 0
      }, a))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (J || !o && !d) && t._startAt.revert(Gn), o && g && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (u && g && !p) {
      if (e && (o = !1), $ = kt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !p && ct(c),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, x), z && ($[S.prop] = z), te(t._startAt = j.set(m, $)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (J ? t._startAt.revert(Gn) : t._startAt.render(-1, !0)), t._zTime = e, !o)
        n(t._startAt, H, H);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, c = g && ct(c) || c && !g, k = 0; k < m.length; k++) {
      if (w = m[k], T = w._gsap || Zi(m)[k]._gsap, t._ptLookup[k] = E = {}, gi[T.id] && Zt.length && pr(), P = y === m ? k : y.indexOf(w), S && (M = new S()).init(w, z || x, t, P, y) !== !1 && (t._pt = A = new ht(t._pt, w, M.name, 0, 1, M.render, M, 0, M.priority), M._props.forEach(function(D) {
        E[D] = A;
      }), M.priority && (C = 1)), !S || z)
        for ($ in x)
          _t[$] && (M = Vo($, x, t, P, w, y)) ? M.priority && (C = 1) : E[$] = A = Ji.call(t, w, $, "get", x[$], P, y, 0, i.stringFilter);
      t._op && t._op[k] && t.kill(w, t._op[k]), v && t._pt && (Wt = t, Y.killTweensOf(w, E, t.globalTime(e)), L = !t.parent, Wt = 0), t._pt && c && (gi[T.id] = 1);
    }
    C && jo(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !L, f && e <= 0 && _.render(Ct, !0, !0);
}, z0 = function(t, e, r, i, s, a, o, c) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], u, h, f, d;
  if (!l)
    for (l = t._ptCache[e] = [], f = t._ptLookup, d = t._targets.length; d--; ) {
      if (u = f[d][e], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== e && u.fp !== e; )
          u = u._next;
      if (!u)
        return yi = 1, t.vars[e] = "+=0", ts(t, o), yi = 0, c ? _n(e + " not eligible for reset") : 1;
      l.push(u);
    }
  for (d = l.length; d--; )
    h = l[d], u = h._pt || h, u.s = (i || i === 0) && !s ? i : u.s + (i || 0) + a * u.c, u.c = r - u.s, h.e && (h.e = W(r) + nt(h.e)), h.b && (h.b = u.s + nt(h.b));
}, O0 = function(t, e) {
  var r = t[0] ? de(t[0]).harness : 0, i = r && r.aliases, s, a, o, c;
  if (!i)
    return e;
  s = qe({}, e);
  for (a in i)
    if (a in s)
      for (c = i[a].split(","), o = c.length; o--; )
        s[c[o]] = s[a];
  return s;
}, L0 = function(t, e, r, i) {
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
}, ln = function(t, e, r, i, s) {
  return U(t) ? t.call(e, r, i, s) : Z(t) && ~t.indexOf("random(") ? vn(t) : t;
}, Xo = Ki + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Yo = {};
ut(Xo + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return Yo[n] = 1;
});
var j = /* @__PURE__ */ (function(n) {
  co(t, n);
  function t(r, i, s, a) {
    var o;
    typeof i == "number" && (s.duration = i, i = s, s = null), o = n.call(this, a ? i : an(i)) || this;
    var c = o.vars, l = c.duration, u = c.delay, h = c.immediateRender, f = c.stagger, d = c.overwrite, g = c.keyframes, p = c.defaults, m = c.scrollTrigger, b = c.yoyoEase, y = i.parent || Y, v = (rt(r) || ho(r) ? Xt(r[0]) : "length" in i) ? [r] : $t(r), _, x, k, $, A, w, C, T;
    if (o._targets = v.length ? Zi(v) : _n("GSAP target " + r + " not found. https://gsap.com", !bt.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = d, g || f || Dn(l) || Dn(u)) {
      if (i = o.vars, _ = o.timeline = new at({
        data: "nested",
        defaults: p || {},
        targets: y && y.data === "nested" ? y.vars.targets : v
      }), _.kill(), _.parent = _._dp = Ht(o), _._start = 0, f || Dn(l) || Dn(u)) {
        if ($ = v.length, C = f && Mo(f), Dt(f))
          for (A in f)
            ~Xo.indexOf(A) && (T || (T = {}), T[A] = f[A]);
        for (x = 0; x < $; x++)
          k = gr(i, Yo), k.stagger = 0, b && (k.yoyoEase = b), T && qe(k, T), w = v[x], k.duration = +ln(l, Ht(o), x, w, v), k.delay = (+ln(u, Ht(o), x, w, v) || 0) - o._delay, !f && $ === 1 && k.delay && (o._delay = u = k.delay, o._start += u, k.delay = 0), _.to(w, k, C ? C(x, w, v) : 0), _._ease = R.none;
        _.duration() ? l = u = 0 : o.timeline = 0;
      } else if (g) {
        an(kt(_.vars.defaults, {
          ease: "none"
        })), _._ease = ge(g.ease || i.ease || "none");
        var S = 0, M, E, P;
        if (rt(g))
          g.forEach(function(z) {
            return _.to(v, z, ">");
          }), _.duration();
        else {
          k = {};
          for (A in g)
            A === "ease" || A === "easeEach" || L0(A, g[A], k, g.easeEach);
          for (A in k)
            for (M = k[A].sort(function(z, L) {
              return z.t - L.t;
            }), S = 0, x = 0; x < M.length; x++)
              E = M[x], P = {
                ease: E.e,
                duration: (E.t - (x ? M[x - 1].t : 0)) / 100 * l
              }, P[A] = E.v, _.to(v, P, S), S += P.duration;
          _.duration() < l && _.to({}, {
            duration: l - _.duration()
          });
        }
      }
      l || o.duration(l = _.duration());
    } else
      o.timeline = 0;
    return d === !0 && !Xi && (Wt = Ht(o), Y.killTweensOf(v), Wt = 0), Ot(y, Ht(o), s), i.reversed && o.reverse(), i.paused && o.paused(!0), (h || !l && !g && o._start === X(y._time) && ct(h) && h0(Ht(o)) && y.data !== "nested") && (o._tTime = -H, o.render(Math.max(0, -u) || 0)), m && Co(Ht(o), m), o;
  }
  var e = t.prototype;
  return e.render = function(i, s, a) {
    var o = this._time, c = this._tDur, l = this._dur, u = i < 0, h = i > c - H && !u ? c : i < H ? 0 : i, f, d, g, p, m, b, y, v, _;
    if (!l)
      d0(this, i, s, a);
    else if (h !== this._tTime || !i || a || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (f = h, v = this.timeline, this._repeat) {
        if (p = l + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(p * 100 + i, s, a);
        if (f = X(h % p), h === c ? (g = this._repeat, f = l) : (m = X(h / p), g = ~~m, g && g === m ? (f = l, g--) : f > l && (f = l)), b = this._yoyo && g & 1, b && (_ = this._yEase, f = l - f), m = He(this._tTime, p), f === o && !a && this._initted && g === m)
          return this._tTime = h, this;
        g !== m && (v && this._yEase && qo(v, b), this.vars.repeatRefresh && !b && !this._lock && f !== p && this._initted && (this._lock = a = 1, this.render(X(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if ($o(this, u ? i : f, a, s, h))
          return this._tTime = 0, this;
        if (o !== this._time && !(a && this.vars.repeatRefresh && g !== m))
          return this;
        if (l !== this._dur)
          return this.render(i, s, a);
      }
      if (this._tTime = h, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = y = (_ || this._ease)(f / l), this._from && (this.ratio = y = 1 - y), !o && h && !s && !m && (vt(this, "onStart"), this._tTime !== h))
        return this;
      for (d = this._pt; d; )
        d.r(y, d.d), d = d._next;
      v && v.render(i < 0 ? i : v._dur * v._ease(f / this._dur), s, a) || this._startAt && (this._zTime = i), this._onUpdate && !s && (u && _i(this, i, s, a), vt(this, "onUpdate")), this._repeat && g !== m && this.vars.onRepeat && !s && this.parent && vt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (u && !this._onUpdate && _i(this, i, !0, !0), (i || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && te(this, 1), !s && !(u && !o) && (h || o || b) && (vt(this, h === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, e.resetTo = function(i, s, a, o, c) {
    xn || mt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || ts(this, l), u = this._ease(l / this._dur), z0(this, i, s, a, o, u, l, c) ? this.resetTo(i, s, a, o, 1) : ($r(this, 0), this.parent || ko(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? nn(this) : this.scrollTrigger && this.scrollTrigger.kill(!!J), this;
    if (this.timeline) {
      var a = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, Wt && Wt.vars.overwrite !== !0)._first || nn(this), this.parent && a !== this.timeline.totalDuration() && Be(this, this._dur * this.timeline._tDur / a, 0, 1), this;
    }
    var o = this._targets, c = i ? $t(i) : o, l = this._ptLookup, u = this._pt, h, f, d, g, p, m, b;
    if ((!s || s === "all") && c0(o, c))
      return s === "all" && (this._pt = 0), nn(this);
    for (h = this._op = this._op || [], s !== "all" && (Z(s) && (p = {}, ut(s, function(y) {
      return p[y] = 1;
    }), s = p), s = O0(o, s)), b = o.length; b--; )
      if (~c.indexOf(o[b])) {
        f = l[b], s === "all" ? (h[b] = s, g = f, d = {}) : (d = h[b] = h[b] || {}, g = s);
        for (p in g)
          m = f && f[p], m && ((!("kill" in m.d) || m.d.kill(p) === !0) && Ar(this, m, "_pt"), delete f[p]), d !== "all" && (d[p] = 1);
      }
    return this._initted && !this._pt && u && nn(this), this;
  }, t.to = function(i, s) {
    return new t(i, s, arguments[2]);
  }, t.from = function(i, s) {
    return on(1, arguments);
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
    return on(2, arguments);
  }, t.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new t(i, s);
  }, t.killTweensOf = function(i, s, a) {
    return Y.killTweensOf(i, s, a);
  }, t;
})(bn);
kt(j.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ut("staggerTo,staggerFrom,staggerFromTo", function(n) {
  j[n] = function() {
    var t = new at(), e = vi.call(arguments, 0);
    return e.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), t[n].apply(t, e);
  };
});
var es = function(t, e, r) {
  return t[e] = r;
}, Go = function(t, e, r) {
  return t[e](r);
}, N0 = function(t, e, r, i) {
  return t[e](i.fp, r);
}, R0 = function(t, e, r) {
  return t.setAttribute(e, r);
}, ns = function(t, e) {
  return U(t[e]) ? Go : Yi(t[e]) && t.setAttribute ? R0 : es;
}, Uo = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, D0 = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Wo = function(t, e) {
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
}, rs = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, F0 = function(t, e, r, i) {
  for (var s = this._pt, a; s; )
    a = s._next, s.p === i && s.modifier(t, e, r), s = a;
}, I0 = function(t) {
  for (var e = this._pt, r, i; e; )
    i = e._next, e.p === t && !e.op || e.op === t ? Ar(this, e, "_pt") : e.dep || (r = 1), e = i;
  return !r;
}, q0 = function(t, e, r, i) {
  i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
}, jo = function(t) {
  for (var e = t._pt, r, i, s, a; e; ) {
    for (r = e._next, i = s; i && i.pr > e.pr; )
      i = i._next;
    (e._prev = i ? i._prev : a) ? e._prev._next = e : s = e, (e._next = i) ? i._prev = e : a = e, e = r;
  }
  t._pt = s;
}, ht = /* @__PURE__ */ (function() {
  function n(e, r, i, s, a, o, c, l, u) {
    this.t = r, this.s = s, this.c = a, this.p = i, this.r = o || Uo, this.d = c || this, this.set = l || es, this.pr = u || 0, this._next = e, e && (e._prev = this);
  }
  var t = n.prototype;
  return t.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = q0, this.m = r, this.mt = s, this.tween = i;
  }, n;
})();
ut(Ki + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return ji[n] = 1;
});
wt.TweenMax = wt.TweenLite = j;
wt.TimelineLite = wt.TimelineMax = at;
Y = new at({
  sortChildren: !1,
  defaults: Ie,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
bt.stringFilter = Fo;
var _e = [], Wn = {}, H0 = [], aa = 0, B0 = 0, jr = function(t) {
  return (Wn[t] || H0).map(function(e) {
    return e();
  });
}, wi = function() {
  var t = Date.now(), e = [];
  t - aa > 2 && (jr("matchMediaInit"), _e.forEach(function(r) {
    var i = r.queries, s = r.conditions, a, o, c, l;
    for (o in i)
      a = zt.matchMedia(i[o]).matches, a && (c = 1), a !== s[o] && (s[o] = a, l = 1);
    l && (r.revert(), c && e.push(r));
  }), jr("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), aa = t, jr("matchMedia"));
}, Ko = /* @__PURE__ */ (function() {
  function n(e, r) {
    this.selector = r && xi(r), this.data = [], this._r = [], this.isReverted = !1, this.id = B0++, e && this.add(e);
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
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof j && !(i.parent && i.parent.data === "nested") && r.push(i);
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
        l = s.data[c], l instanceof at ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof j) && l.revert && l.revert(r);
      s._r.forEach(function(u) {
        return u(r, s);
      }), s.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), i)
      for (var a = _e.length; a--; )
        _e[a].id === this.id && _e.splice(a, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, n;
})(), V0 = /* @__PURE__ */ (function() {
  function n(e) {
    this.contexts = [], this.scope = e, V && V.data.push(this);
  }
  var t = n.prototype;
  return t.add = function(r, i, s) {
    Dt(r) || (r = {
      matches: r
    });
    var a = new Ko(0, s || this.scope), o = a.conditions = {}, c, l, u;
    V && !a.selector && (a.selector = V.selector), this.contexts.push(a), i = a.add("onMatch", i), a.queries = r;
    for (l in r)
      l === "all" ? u = 1 : (c = zt.matchMedia(r[l]), c && (_e.indexOf(a) < 0 && _e.push(a), (o[l] = c.matches) && (u = 1), c.addListener ? c.addListener(wi) : c.addEventListener("change", wi)));
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
})(), mr = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(i) {
      return No(i);
    });
  },
  timeline: function(t) {
    return new at(t);
  },
  getTweensOf: function(t, e) {
    return Y.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, i) {
    Z(t) && (t = $t(t)[0]);
    var s = de(t || {}).get, a = r ? wo : yo;
    return r === "native" && (r = ""), t && (e ? a((_t[e] && _t[e].get || s)(t, e, r, i)) : function(o, c, l) {
      return a((_t[o] && _t[o].get || s)(t, o, c, l));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = $t(t), t.length > 1) {
      var i = t.map(function(u) {
        return dt.quickSetter(u, e, r);
      }), s = i.length;
      return function(u) {
        for (var h = s; h--; )
          i[h](u);
      };
    }
    t = t[0] || {};
    var a = _t[e], o = de(t), c = o.harness && (o.harness.aliases || {})[e] || e, l = a ? function(u) {
      var h = new a();
      Te._pt = 0, h.init(t, r ? u + r : u, Te, 0, [t]), h.render(1, h), Te._pt && rs(1, Te);
    } : o.set(t, c);
    return a ? l : function(u) {
      return l(t, c, r ? u + r : u, o, 1);
    };
  },
  quickTo: function(t, e, r) {
    var i, s = dt.to(t, kt((i = {}, i[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})), a = function(c, l, u) {
      return s.resetTo(e, c, l, u);
    };
    return a.tween = s, a;
  },
  isTweening: function(t) {
    return Y.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = ge(t.ease, Ie.ease)), ea(Ie, t || {});
  },
  config: function(t) {
    return ea(bt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, i = t.plugins, s = t.defaults, a = t.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !_t[o] && !wt[o] && _n(e + " effect requires " + o + " plugin.");
    }), Yr[e] = function(o, c, l) {
      return r($t(o), kt(c || {}, s), l);
    }, a && (at.prototype[e] = function(o, c, l) {
      return this.add(Yr[e](o, Dt(c) ? c : (l = c) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    R[t] = ge(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? ge(t, e) : R;
  },
  getById: function(t) {
    return Y.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new at(t), i, s;
    for (r.smoothChildTiming = ct(t.smoothChildTiming), Y.remove(r), r._dp = 0, r._time = r._tTime = Y._time, i = Y._first; i; )
      s = i._next, (e || !(!i._dur && i instanceof j && i.vars.onComplete === i._targets[0])) && Ot(r, i, i._start - i._delay), i = s;
    return Ot(Y, r, 0), r;
  },
  context: function(t, e) {
    return t ? new Ko(t, e) : V;
  },
  matchMedia: function(t) {
    return new V0(t);
  },
  matchMediaRefresh: function() {
    return _e.forEach(function(t) {
      var e = t.conditions, r, i;
      for (i in e)
        e[i] && (e[i] = !1, r = 1);
      r && t.revert();
    }) || wi();
  },
  addEventListener: function(t, e) {
    var r = Wn[t] || (Wn[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = Wn[t], i = r && r.indexOf(e);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: y0,
    wrapYoyo: w0,
    distribute: Mo,
    random: Po,
    snap: Eo,
    normalize: b0,
    getUnit: nt,
    clamp: _0,
    splitColor: Ro,
    toArray: $t,
    selector: xi,
    mapRange: Oo,
    pipe: v0,
    unitize: x0,
    interpolate: k0,
    shuffle: To
  },
  install: _o,
  effects: Yr,
  ticker: mt,
  updateRoot: at.updateRoot,
  plugins: _t,
  globalTimeline: Y,
  core: {
    PropTween: ht,
    globals: mo,
    Tween: j,
    Timeline: at,
    Animation: bn,
    getCache: de,
    _removeLinkedListItem: Ar,
    reverting: function() {
      return J;
    },
    context: function(t) {
      return t && V && (V.data.push(t), t._ctx = V), V;
    },
    suppressOverwrites: function(t) {
      return Xi = t;
    }
  }
};
ut("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return mr[n] = j[n];
});
mt.add(at.updateRoot);
Te = mr.to({}, {
  duration: 0
});
var X0 = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, Y0 = function(t, e) {
  var r = t._targets, i, s, a;
  for (i in e)
    for (s = r.length; s--; )
      a = t._ptLookup[s][i], a && (a = a.d) && (a._pt && (a = X0(a, i)), a && a.modifier && a.modifier(e[i], t, r[s], i));
}, Kr = function(t, e) {
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
        Y0(o, s);
      };
    }
  };
}, dt = mr.registerPlugin({
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
}, Kr("roundProps", bi), Kr("modifiers"), Kr("snap", Eo)) || mr;
j.version = at.version = dt.version = "3.14.2";
go = 1;
Gi() && Ve();
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
var oa, jt, ze, is, he, la, ss, G0 = function() {
  return typeof window < "u";
}, Yt = {}, ce = 180 / Math.PI, Oe = Math.PI / 180, Ae = Math.atan2, ca = 1e8, as = /([A-Z])/g, U0 = /(left|right|width|margin|padding|x)/i, W0 = /[\s,\(]\S/, Nt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ki = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, j0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, K0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Z0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Q0 = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, Zo = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, Qo = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, J0 = function(t, e, r) {
  return t.style[e] = r;
}, tg = function(t, e, r) {
  return t.style.setProperty(e, r);
}, eg = function(t, e, r) {
  return t._gsap[e] = r;
}, ng = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, rg = function(t, e, r, i, s) {
  var a = t._gsap;
  a.scaleX = a.scaleY = r, a.renderTransform(s, a);
}, ig = function(t, e, r, i, s) {
  var a = t._gsap;
  a[e] = r, a.renderTransform(s, a);
}, G = "transform", ft = G + "Origin", sg = function n(t, e) {
  var r = this, i = this.target, s = i.style, a = i._gsap;
  if (t in Yt && s) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Nt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(o) {
        return r.tfm[o] = Bt(i, o);
      }) : this.tfm[t] = a.x ? a[t] : Bt(i, t), t === ft && (this.tfm.zOrigin = a.zOrigin);
    else
      return Nt.transform.split(",").forEach(function(o) {
        return n.call(r, o, e);
      });
    if (this.props.indexOf(G) >= 0)
      return;
    a.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(ft, e, "")), t = G;
  }
  (s || e) && this.props.push(t, e, s[t]);
}, Jo = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, ag = function() {
  var t = this.props, e = this.target, r = e.style, i = e._gsap, s, a;
  for (s = 0; s < t.length; s += 3)
    t[s + 1] ? t[s + 1] === 2 ? e[t[s]](t[s + 2]) : e[t[s]] = t[s + 2] : t[s + 2] ? r[t[s]] = t[s + 2] : r.removeProperty(t[s].substr(0, 2) === "--" ? t[s] : t[s].replace(as, "-$1").toLowerCase());
  if (this.tfm) {
    for (a in this.tfm)
      i[a] = this.tfm[a];
    i.svg && (i.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), s = ss(), (!s || !s.isStart) && !r[G] && (Jo(r), i.zOrigin && r[ft] && (r[ft] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, tl = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: ag,
    save: sg
  };
  return t._gsap || dt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, el, Ai = function(t, e) {
  var r = jt.createElementNS ? jt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : jt.createElement(t);
  return r && r.style ? r : jt.createElement(t);
}, xt = function n(t, e, r) {
  var i = getComputedStyle(t);
  return i[e] || i.getPropertyValue(e.replace(as, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && n(t, Xe(e) || e, 1) || "";
}, ua = "O,Moz,ms,Ms,Webkit".split(","), Xe = function(t, e, r) {
  var i = e || he, s = i.style, a = 5;
  if (t in s && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); a-- && !(ua[a] + t in s); )
    ;
  return a < 0 ? null : (a === 3 ? "ms" : a >= 0 ? ua[a] : "") + t;
}, Ci = function() {
  G0() && window.document && (oa = window, jt = oa.document, ze = jt.documentElement, he = Ai("div") || {
    style: {}
  }, Ai("div"), G = Xe(G), ft = G + "Origin", he.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", el = !!Xe("perspective"), ss = dt.core.reverting, is = 1);
}, ha = function(t) {
  var e = t.ownerSVGElement, r = Ai("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = t.cloneNode(!0), s;
  i.style.display = "block", r.appendChild(i), ze.appendChild(r);
  try {
    s = i.getBBox();
  } catch {
  }
  return r.removeChild(i), ze.removeChild(r), s;
}, fa = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, nl = function(t) {
  var e, r;
  try {
    e = t.getBBox();
  } catch {
    e = ha(t), r = 1;
  }
  return e && (e.width || e.height) || r || (e = ha(t)), e && !e.width && !e.x && !e.y ? {
    x: +fa(t, ["x", "cx", "x1"]) || 0,
    y: +fa(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, rl = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && nl(t));
}, ee = function(t, e) {
  if (e) {
    var r = t.style, i;
    e in Yt && e !== ft && (e = G), r.removeProperty ? (i = e.substr(0, 2), (i === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(i === "--" ? e : e.replace(as, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, Kt = function(t, e, r, i, s, a) {
  var o = new ht(t._pt, e, r, 0, 1, a ? Qo : Zo);
  return t._pt = o, o.b = i, o.e = s, t._props.push(r), o;
}, da = {
  deg: 1,
  rad: 1,
  turn: 1
}, og = {
  grid: 1,
  flex: 1
}, ne = function n(t, e, r, i) {
  var s = parseFloat(r) || 0, a = (r + "").trim().substr((s + "").length) || "px", o = he.style, c = U0.test(e), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), h = 100, f = i === "px", d = i === "%", g, p, m, b;
  if (i === a || !s || da[i] || da[a])
    return s;
  if (a !== "px" && !f && (s = n(t, e, r, "px")), b = t.getCTM && rl(t), (d || a === "%") && (Yt[e] || ~e.indexOf("adius")))
    return g = b ? t.getBBox()[c ? "width" : "height"] : t[u], W(d ? s / g * h : s / 100 * g);
  if (o[c ? "width" : "height"] = h + (f ? a : i), p = i !== "rem" && ~e.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, b && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === jt || !p.appendChild) && (p = jt.body), m = p._gsap, m && d && m.width && c && m.time === mt.time && !m.uncache)
    return W(s / m.width * h);
  if (d && (e === "height" || e === "width")) {
    var y = t.style[e];
    t.style[e] = h + i, g = t[u], y ? t.style[e] = y : ee(t, e);
  } else
    (d || a === "%") && !og[xt(p, "display")] && (o.position = xt(t, "position")), p === t && (o.position = "static"), p.appendChild(he), g = he[u], p.removeChild(he), o.position = "absolute";
  return c && d && (m = de(p), m.time = mt.time, m.width = p[u]), W(f ? g * s / h : g && s ? h / g * s : 0);
}, Bt = function(t, e, r, i) {
  var s;
  return is || Ci(), e in Nt && e !== "transform" && (e = Nt[e], ~e.indexOf(",") && (e = e.split(",")[0])), Yt[e] && e !== "transform" ? (s = wn(t, i), s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : xr(xt(t, ft)) + " " + s.zOrigin + "px") : (s = t.style[e], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = vr[e] && vr[e](t, e, r) || xt(t, e) || xo(t, e) || (e === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? ne(t, e, s, r) + r : s;
}, lg = function(t, e, r, i) {
  if (!r || r === "none") {
    var s = Xe(e, t, 1), a = s && xt(t, s, 1);
    a && a !== r ? (e = s, r = a) : e === "borderColor" && (r = xt(t, "borderTopColor"));
  }
  var o = new ht(this._pt, t.style, e, 0, 1, Wo), c = 0, l = 0, u, h, f, d, g, p, m, b, y, v, _, x;
  if (o.b = r, o.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = xt(t, i.substring(4, i.indexOf(")")))), i === "auto" && (p = t.style[e], t.style[e] = i, i = xt(t, e) || i, p ? t.style[e] = p : ee(t, e)), u = [r, i], Fo(u), r = u[0], i = u[1], f = r.match(Se) || [], x = i.match(Se) || [], x.length) {
    for (; h = Se.exec(i); )
      m = h[0], y = i.substring(c, h.index), g ? g = (g + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (g = 1), m !== (p = f[l++] || "") && (d = parseFloat(p) || 0, _ = p.substr((d + "").length), m.charAt(1) === "=" && (m = Pe(d, m) + _), b = parseFloat(m), v = m.substr((b + "").length), c = Se.lastIndex - v.length, v || (v = v || bt.units[e] || _, c === i.length && (i += v, o.e += v)), _ !== v && (d = ne(t, e, p, v) || 0), o._pt = {
        _next: o._pt,
        p: y || l === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: b - d,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    o.c = c < i.length ? i.substring(c, i.length) : "";
  } else
    o.r = e === "display" && i === "none" ? Qo : Zo;
  return po.test(i) && (o.e = 0), this._pt = o, o;
}, pa = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, cg = function(t) {
  var e = t.split(" "), r = e[0], i = e[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), e[0] = pa[r] || r, e[1] = pa[i] || i, e.join(" ");
}, ug = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, i = r.style, s = e.u, a = r._gsap, o, c, l;
    if (s === "all" || s === !0)
      i.cssText = "", c = 1;
    else
      for (s = s.split(","), l = s.length; --l > -1; )
        o = s[l], Yt[o] && (c = 1, o = o === "transformOrigin" ? ft : G), ee(r, o);
    c && (ee(r, G), a && (a.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", wn(r, 1), a.uncache = 1, Jo(i)));
  }
}, vr = {
  clearProps: function(t, e, r, i, s) {
    if (s.data !== "isFromStart") {
      var a = t._pt = new ht(t._pt, e, r, 0, 0, ug);
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
}, yn = [1, 0, 0, 1, 0, 0], il = {}, sl = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, ga = function(t) {
  var e = xt(t, G);
  return sl(e) ? yn : e.substr(7).match(fo).map(W);
}, os = function(t, e) {
  var r = t._gsap || de(t), i = t.style, s = ga(t), a, o, c, l;
  return r.svg && t.getAttribute("transform") ? (c = t.transform.baseVal.consolidate().matrix, s = [c.a, c.b, c.c, c.d, c.e, c.f], s.join(",") === "1,0,0,1,0,0" ? yn : s) : (s === yn && !t.offsetParent && t !== ze && !r.svg && (c = i.display, i.display = "block", a = t.parentNode, (!a || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, o = t.nextElementSibling, ze.appendChild(t)), s = ga(t), c ? i.display = c : ee(t, "display"), l && (o ? a.insertBefore(t, o) : a ? a.appendChild(t) : ze.removeChild(t))), e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, $i = function(t, e, r, i, s, a) {
  var o = t._gsap, c = s || os(t, !0), l = o.xOrigin || 0, u = o.yOrigin || 0, h = o.xOffset || 0, f = o.yOffset || 0, d = c[0], g = c[1], p = c[2], m = c[3], b = c[4], y = c[5], v = e.split(" "), _ = parseFloat(v[0]) || 0, x = parseFloat(v[1]) || 0, k, $, A, w;
  r ? c !== yn && ($ = d * m - g * p) && (A = _ * (m / $) + x * (-p / $) + (p * y - m * b) / $, w = _ * (-g / $) + x * (d / $) - (d * y - g * b) / $, _ = A, x = w) : (k = nl(t), _ = k.x + (~v[0].indexOf("%") ? _ / 100 * k.width : _), x = k.y + (~(v[1] || v[0]).indexOf("%") ? x / 100 * k.height : x)), i || i !== !1 && o.smooth ? (b = _ - l, y = x - u, o.xOffset = h + (b * d + y * p) - b, o.yOffset = f + (b * g + y * m) - y) : o.xOffset = o.yOffset = 0, o.xOrigin = _, o.yOrigin = x, o.smooth = !!i, o.origin = e, o.originIsAbsolute = !!r, t.style[ft] = "0px 0px", a && (Kt(a, o, "xOrigin", l, _), Kt(a, o, "yOrigin", u, x), Kt(a, o, "xOffset", h, o.xOffset), Kt(a, o, "yOffset", f, o.yOffset)), t.setAttribute("data-svg-origin", _ + " " + x);
}, wn = function(t, e) {
  var r = t._gsap || new Bo(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var i = t.style, s = r.scaleX < 0, a = "px", o = "deg", c = getComputedStyle(t), l = xt(t, ft) || "0", u, h, f, d, g, p, m, b, y, v, _, x, k, $, A, w, C, T, S, M, E, P, z, L, D, B, I, tt, it, ye, pt, Q;
  return u = h = f = p = m = b = y = v = _ = 0, d = g = 1, r.svg = !!(t.getCTM && rl(t)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (i[G] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[G] !== "none" ? c[G] : "")), i.scale = i.rotate = i.translate = "none"), $ = os(t, r.svg), r.svg && (r.uncache ? (D = t.getBBox(), l = r.xOrigin - D.x + "px " + (r.yOrigin - D.y) + "px", L = "") : L = !e && t.getAttribute("data-svg-origin"), $i(t, L || l, !!L || r.originIsAbsolute, r.smooth !== !1, $)), x = r.xOrigin || 0, k = r.yOrigin || 0, $ !== yn && (T = $[0], S = $[1], M = $[2], E = $[3], u = P = $[4], h = z = $[5], $.length === 6 ? (d = Math.sqrt(T * T + S * S), g = Math.sqrt(E * E + M * M), p = T || S ? Ae(S, T) * ce : 0, y = M || E ? Ae(M, E) * ce + p : 0, y && (g *= Math.abs(Math.cos(y * Oe))), r.svg && (u -= x - (x * T + k * M), h -= k - (x * S + k * E))) : (Q = $[6], ye = $[7], I = $[8], tt = $[9], it = $[10], pt = $[11], u = $[12], h = $[13], f = $[14], A = Ae(Q, it), m = A * ce, A && (w = Math.cos(-A), C = Math.sin(-A), L = P * w + I * C, D = z * w + tt * C, B = Q * w + it * C, I = P * -C + I * w, tt = z * -C + tt * w, it = Q * -C + it * w, pt = ye * -C + pt * w, P = L, z = D, Q = B), A = Ae(-M, it), b = A * ce, A && (w = Math.cos(-A), C = Math.sin(-A), L = T * w - I * C, D = S * w - tt * C, B = M * w - it * C, pt = E * C + pt * w, T = L, S = D, M = B), A = Ae(S, T), p = A * ce, A && (w = Math.cos(A), C = Math.sin(A), L = T * w + S * C, D = P * w + z * C, S = S * w - T * C, z = z * w - P * C, T = L, P = D), m && Math.abs(m) + Math.abs(p) > 359.9 && (m = p = 0, b = 180 - b), d = W(Math.sqrt(T * T + S * S + M * M)), g = W(Math.sqrt(z * z + Q * Q)), A = Ae(P, z), y = Math.abs(A) > 2e-4 ? A * ce : 0, _ = pt ? 1 / (pt < 0 ? -pt : pt) : 0), r.svg && (L = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !sl(xt(t, G)), L && t.setAttribute("transform", L))), Math.abs(y) > 90 && Math.abs(y) < 270 && (s ? (d *= -1, y += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, y += y <= 0 ? 180 : -180)), e = e || r.uncache, r.x = u - ((r.xPercent = u && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + a, r.y = h - ((r.yPercent = h && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + a, r.z = f + a, r.scaleX = W(d), r.scaleY = W(g), r.rotation = W(p) + o, r.rotationX = W(m) + o, r.rotationY = W(b) + o, r.skewX = y + o, r.skewY = v + o, r.transformPerspective = _ + a, (r.zOrigin = parseFloat(l.split(" ")[2]) || !e && r.zOrigin || 0) && (i[ft] = xr(l)), r.xOffset = r.yOffset = 0, r.force3D = bt.force3D, r.renderTransform = r.svg ? fg : el ? al : hg, r.uncache = 0, r;
}, xr = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Zr = function(t, e, r) {
  var i = nt(e);
  return W(parseFloat(e) + parseFloat(ne(t, "x", r + "px", i))) + i;
}, hg = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, al(t, e);
}, ae = "0deg", je = "0px", oe = ") ", al = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.z, l = r.rotation, u = r.rotationY, h = r.rotationX, f = r.skewX, d = r.skewY, g = r.scaleX, p = r.scaleY, m = r.transformPerspective, b = r.force3D, y = r.target, v = r.zOrigin, _ = "", x = b === "auto" && t && t !== 1 || b === !0;
  if (v && (h !== ae || u !== ae)) {
    var k = parseFloat(u) * Oe, $ = Math.sin(k), A = Math.cos(k), w;
    k = parseFloat(h) * Oe, w = Math.cos(k), a = Zr(y, a, $ * w * -v), o = Zr(y, o, -Math.sin(k) * -v), c = Zr(y, c, A * w * -v + v);
  }
  m !== je && (_ += "perspective(" + m + oe), (i || s) && (_ += "translate(" + i + "%, " + s + "%) "), (x || a !== je || o !== je || c !== je) && (_ += c !== je || x ? "translate3d(" + a + ", " + o + ", " + c + ") " : "translate(" + a + ", " + o + oe), l !== ae && (_ += "rotate(" + l + oe), u !== ae && (_ += "rotateY(" + u + oe), h !== ae && (_ += "rotateX(" + h + oe), (f !== ae || d !== ae) && (_ += "skew(" + f + ", " + d + oe), (g !== 1 || p !== 1) && (_ += "scale(" + g + ", " + p + oe), y.style[G] = _ || "translate(0, 0)";
}, fg = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.rotation, l = r.skewX, u = r.skewY, h = r.scaleX, f = r.scaleY, d = r.target, g = r.xOrigin, p = r.yOrigin, m = r.xOffset, b = r.yOffset, y = r.forceCSS, v = parseFloat(a), _ = parseFloat(o), x, k, $, A, w;
  c = parseFloat(c), l = parseFloat(l), u = parseFloat(u), u && (u = parseFloat(u), l += u, c += u), c || l ? (c *= Oe, l *= Oe, x = Math.cos(c) * h, k = Math.sin(c) * h, $ = Math.sin(c - l) * -f, A = Math.cos(c - l) * f, l && (u *= Oe, w = Math.tan(l - u), w = Math.sqrt(1 + w * w), $ *= w, A *= w, u && (w = Math.tan(u), w = Math.sqrt(1 + w * w), x *= w, k *= w)), x = W(x), k = W(k), $ = W($), A = W(A)) : (x = h, A = f, k = $ = 0), (v && !~(a + "").indexOf("px") || _ && !~(o + "").indexOf("px")) && (v = ne(d, "x", a, "px"), _ = ne(d, "y", o, "px")), (g || p || m || b) && (v = W(v + g - (g * x + p * $) + m), _ = W(_ + p - (g * k + p * A) + b)), (i || s) && (w = d.getBBox(), v = W(v + i / 100 * w.width), _ = W(_ + s / 100 * w.height)), w = "matrix(" + x + "," + k + "," + $ + "," + A + "," + v + "," + _ + ")", d.setAttribute("transform", w), y && (d.style[G] = w);
}, dg = function(t, e, r, i, s) {
  var a = 360, o = Z(s), c = parseFloat(s) * (o && ~s.indexOf("rad") ? ce : 1), l = c - i, u = i + l + "deg", h, f;
  return o && (h = s.split("_")[1], h === "short" && (l %= a, l !== l % (a / 2) && (l += l < 0 ? a : -a)), h === "cw" && l < 0 ? l = (l + a * ca) % a - ~~(l / a) * a : h === "ccw" && l > 0 && (l = (l - a * ca) % a - ~~(l / a) * a)), t._pt = f = new ht(t._pt, e, r, i, l, j0), f.e = u, f.u = "deg", t._props.push(r), f;
}, _a = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, pg = function(t, e, r) {
  var i = _a({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", a = r.style, o, c, l, u, h, f, d, g;
  i.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), a[G] = e, o = wn(r, 1), ee(r, G), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[G], a[G] = e, o = wn(r, 1), a[G] = l);
  for (c in Yt)
    l = i[c], u = o[c], l !== u && s.indexOf(c) < 0 && (d = nt(l), g = nt(u), h = d !== g ? ne(r, c, l, g) : parseFloat(l), f = parseFloat(u), t._pt = new ht(t._pt, o, c, h, f - h, ki), t._pt.u = g || 0, t._props.push(c));
  _a(o, i);
};
ut("padding,margin,Width,Radius", function(n, t) {
  var e = "Top", r = "Right", i = "Bottom", s = "Left", a = (t < 3 ? [e, r, i, s] : [e + s, e + r, i + r, i + s]).map(function(o) {
    return t < 2 ? n + o : "border" + o + n;
  });
  vr[t > 1 ? "border" + n : n] = function(o, c, l, u, h) {
    var f, d;
    if (arguments.length < 4)
      return f = a.map(function(g) {
        return Bt(o, g, l);
      }), d = f.join(" "), d.split(f[0]).length === 5 ? f[0] : d;
    f = (u + "").split(" "), d = {}, a.forEach(function(g, p) {
      return d[g] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), o.init(c, d, h);
  };
});
var ol = {
  name: "css",
  register: Ci,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, i, s) {
    var a = this._props, o = t.style, c = r.vars.startAt, l, u, h, f, d, g, p, m, b, y, v, _, x, k, $, A, w;
    is || Ci(), this.styles = this.styles || tl(t), A = this.styles.props, this.tween = r;
    for (p in e)
      if (p !== "autoRound" && (u = e[p], !(_t[p] && Vo(p, e, r, i, t, s)))) {
        if (d = typeof u, g = vr[p], d === "function" && (u = u.call(r, i, t, s), d = typeof u), d === "string" && ~u.indexOf("random(") && (u = vn(u)), g)
          g(this, t, p, u, r) && ($ = 1);
        else if (p.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(p) + "").trim(), u += "", Qt.lastIndex = 0, Qt.test(l) || (m = nt(l), b = nt(u), b ? m !== b && (l = ne(t, p, l, b) + b) : m && (u += m)), this.add(o, "setProperty", l, u, i, s, 0, 0, p), a.push(p), A.push(p, 0, o[p]);
        else if (d !== "undefined") {
          if (c && p in c ? (l = typeof c[p] == "function" ? c[p].call(r, i, t, s) : c[p], Z(l) && ~l.indexOf("random(") && (l = vn(l)), nt(l + "") || l === "auto" || (l += bt.units[p] || nt(Bt(t, p)) || ""), (l + "").charAt(1) === "=" && (l = Bt(t, p))) : l = Bt(t, p), f = parseFloat(l), y = d === "string" && u.charAt(1) === "=" && u.substr(0, 2), y && (u = u.substr(2)), h = parseFloat(u), p in Nt && (p === "autoAlpha" && (f === 1 && Bt(t, "visibility") === "hidden" && h && (f = 0), A.push("visibility", 0, o.visibility), Kt(this, o, "visibility", f ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), p !== "scale" && p !== "transform" && (p = Nt[p], ~p.indexOf(",") && (p = p.split(",")[0]))), v = p in Yt, v) {
            if (this.styles.save(p), w = u, d === "string" && u.substring(0, 6) === "var(--") {
              if (u = xt(t, u.substring(4, u.indexOf(")"))), u.substring(0, 5) === "calc(") {
                var C = t.style.perspective;
                t.style.perspective = u, u = xt(t, "perspective"), C ? t.style.perspective = C : ee(t, "perspective");
              }
              h = parseFloat(u);
            }
            if (_ || (x = t._gsap, x.renderTransform && !e.parseTransform || wn(t, e.parseTransform), k = e.smoothOrigin !== !1 && x.smooth, _ = this._pt = new ht(this._pt, o, G, 0, 1, x.renderTransform, x, 0, -1), _.dep = 1), p === "scale")
              this._pt = new ht(this._pt, x, "scaleY", x.scaleY, (y ? Pe(x.scaleY, y + h) : h) - x.scaleY || 0, ki), this._pt.u = 0, a.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              A.push(ft, 0, o[ft]), u = cg(u), x.svg ? $i(t, u, 0, k, 0, this) : (b = parseFloat(u.split(" ")[2]) || 0, b !== x.zOrigin && Kt(this, x, "zOrigin", x.zOrigin, b), Kt(this, o, p, xr(l), xr(u)));
              continue;
            } else if (p === "svgOrigin") {
              $i(t, u, 1, k, 0, this);
              continue;
            } else if (p in il) {
              dg(this, x, p, f, y ? Pe(f, y + u) : u);
              continue;
            } else if (p === "smoothOrigin") {
              Kt(this, x, "smooth", x.smooth, u);
              continue;
            } else if (p === "force3D") {
              x[p] = u;
              continue;
            } else if (p === "transform") {
              pg(this, u, t);
              continue;
            }
          } else p in o || (p = Xe(p) || p);
          if (v || (h || h === 0) && (f || f === 0) && !W0.test(u) && p in o)
            m = (l + "").substr((f + "").length), h || (h = 0), b = nt(u) || (p in bt.units ? bt.units[p] : m), m !== b && (f = ne(t, p, l, b)), this._pt = new ht(this._pt, v ? x : o, p, f, (y ? Pe(f, y + h) : h) - f, !v && (b === "px" || p === "zIndex") && e.autoRound !== !1 ? Q0 : ki), this._pt.u = b || 0, v && w !== u ? (this._pt.b = l, this._pt.e = w, this._pt.r = Z0) : m !== b && b !== "%" && (this._pt.b = l, this._pt.r = K0);
          else if (p in o)
            lg.call(this, t, p, l, y ? y + u : u);
          else if (p in t)
            this.add(t, p, l || t[p], y ? y + u : u, i, s);
          else if (p !== "parseTransform") {
            Wi(p, u);
            continue;
          }
          v || (p in o ? A.push(p, 0, o[p]) : typeof t[p] == "function" ? A.push(p, 2, t[p]()) : A.push(p, 1, l || t[p])), a.push(p);
        }
      }
    $ && jo(this);
  },
  render: function(t, e) {
    if (e.tween._time || !ss())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Bt,
  aliases: Nt,
  getSetter: function(t, e, r) {
    var i = Nt[e];
    return i && i.indexOf(",") < 0 && (e = i), e in Yt && e !== ft && (t._gsap.x || Bt(t, "x")) ? r && la === r ? e === "scale" ? ng : eg : (la = r || {}) && (e === "scale" ? rg : ig) : t.style && !Yi(t.style[e]) ? J0 : ~e.indexOf("-") ? tg : ns(t, e);
  },
  core: {
    _removeProperty: ee,
    _getMatrix: os
  }
};
dt.utils.checkPrefix = Xe;
dt.core.getStyleSaver = tl;
(function(n, t, e, r) {
  var i = ut(n + "," + t + "," + e, function(s) {
    Yt[s] = 1;
  });
  ut(t, function(s) {
    bt.units[s] = "deg", il[s] = 1;
  }), Nt[i[13]] = n + "," + t, ut(r, function(s) {
    var a = s.split(":");
    Nt[a[1]] = i[a[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ut("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  bt.units[n] = "px";
});
dt.registerPlugin(ol);
var sn = dt.registerPlugin(ol) || dt;
sn.core.Tween;
const Ce = {
  input: "#ff2d75",
  hidden: "#7b68ee",
  output: "#00d4ff"
}, Ke = 36, Fn = 100, Qr = 200, ma = 50, Jr = 60, gg = `
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
class _g extends F {
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
    super.connectedCallback(), this.adoptStyles(gg), this._container = document.createElement("div"), this.root.appendChild(this._container), this._initSvg(), this._render(), this._resizeObserver = new ResizeObserver(() => {
      this._isAnimating || this._render();
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = null, this._cancelAnimation();
  }
  handleAttributeChange(e, r, i) {
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
    this._container.appendChild(e), this._svg = K(e);
    const r = this._svg.append("defs"), i = {
      input: Ce.input,
      hidden: Ce.hidden,
      output: Ce.output
    };
    for (const [s, a] of Object.entries(i))
      r.append("filter").attr("id", `glow-${s}`).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%").append("feDropShadow").attr("dx", 0).attr("dy", 0).attr("stdDeviation", 6).attr("flood-color", a).attr("flood-opacity", 0.7);
    this._svg.append("g").attr("class", "connections-group"), this._svg.append("g").attr("class", "nodes-group"), this._svg.append("g").attr("class", "labels-group");
  }
  // ---------------------------------------------------------------------------
  // Layout computation
  // ---------------------------------------------------------------------------
  _computeLayout() {
    const e = this._layers, r = this.isRtl, i = e.length, s = Math.max(...e.map((u) => u.length), 1), a = (i - 1) * Qr + Jr * 2, o = (s - 1) * Fn + ma + Ke + 40, c = [], l = [];
    for (let u = 0; u < i; u++) {
      const h = e[u], f = r ? a - Jr - u * Qr : Jr + u * Qr, d = (h.length - 1) * Fn, g = ma + ((s - 1) * Fn - d) / 2, p = [];
      for (let m = 0; m < h.length; m++)
        p.push({
          layer: u,
          index: m,
          x: f,
          y: g + m * Fn,
          label: h[m]
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
    const i = getComputedStyle(this).getPropertyValue("--lv-net-input").trim() || Ce.input, s = getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim() || Ce.hidden, a = getComputedStyle(this).getPropertyValue("--lv-net-output").trim() || Ce.output;
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
      for (const g of d) {
        const p = this._layerColor(g.layer, a), m = this._layerType(g.layer, a), b = u.append("g").attr("class", "node").attr("data-layer", g.layer).attr("data-index", g.index).attr("transform", `translate(${g.x},${g.y})`).attr("opacity", c ? 0.15 : 1);
        b.append("circle").attr("class", "node-circle").attr("data-layer", g.layer).attr("r", Ke).attr("fill", p).attr("stroke", p).attr("stroke-width", 2).attr("fill-opacity", o ? 0.2 : c ? 0.05 : 0.2), o && b.attr("filter", `url(#glow-${m})`), b.append("text").attr("class", "node-label").text(g.label);
      }
    const h = this._svg.select(".labels-group");
    h.selectAll("*").remove();
    const f = this._names;
    for (let d = 0; d < e.length; d++) {
      if (!f[d]) continue;
      const g = e[d][0];
      h.append("text").attr("class", "label").attr("x", g.x).attr("y", g.y - Ke - 16).text(f[d]);
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
    const { nodes: e } = this._computeLayout(), r = e.length, i = this._animateMode, s = this._speed, a = i === "backprop", o = a ? "#ff2d75" : "#00d4ff", c = s / 600, l = a ? Array.from({ length: r }, (f, d) => r - 1 - d) : Array.from({ length: r }, (f, d) => d), u = this._getLayerNodeGroups(), h = sn.timeline({
      onComplete: () => {
        this._isAnimating = !1, this._hasAnimated = !0, this.root.querySelectorAll(".node").forEach((g) => {
          const p = parseInt(g.getAttribute("data-layer") || "0", 10), m = this._layerType(p, r);
          sn.set(g, { opacity: 1 }), g.setAttribute("filter", `url(#glow-${m})`);
          const b = g.querySelector("circle");
          b && sn.set(b, { attr: { "fill-opacity": 0.2 } });
        }), this.root.querySelectorAll(".connection").forEach((g) => {
          sn.set(g, { attr: { "stroke-opacity": 0.5 } }), g.setAttribute("stroke", "var(--lv-border, #2a2a4a)");
        });
      }
    });
    this._timeline = h, h.addLabel("start", 0.15), l.forEach((f, d) => {
      const g = this._layerType(f, r), p = u[f];
      if (!p || p.length === 0) return;
      const m = p.map((v) => v.querySelector(".node-circle")).filter(Boolean), b = `layer-${d}`, y = 0.15 + d * (0.4 * c);
      if (h.addLabel(b, y), h.to(p, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, b), h.call(() => {
        p.forEach((v) => {
          v.setAttribute("filter", `url(#glow-${g})`);
        });
      }, [], b), h.to(m, {
        attr: { r: Ke * 1.15 },
        duration: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, b), h.to(m, {
        attr: { r: Ke },
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
      }, `${b}+=0.3`), d < l.length - 1) {
        const v = l[d + 1], _ = Math.min(f, v), x = Math.max(f, v), k = this._getConnectionElements(_, x);
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
customElements.define("lv-network", _g);
const va = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], mg = `
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
`, Gt = 120, Ze = 32, In = 40;
class vg extends F {
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
    super.connectedCallback(), this.adoptStyles(mg), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", { label: "root" }), this._initSvg(), this._buildHierarchy(), this._render(!1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  handleAttributeChange(e, r, i) {
    r !== i && (e === "data" && (this._data = this.jsonAttr("data", { label: "root" }), this._buildHierarchy()), this._svg && this._render(!1));
  }
  animateIn(e) {
    this._hasAnimated || (this._hasAnimated = !0, e ? this._render(!1) : this._render(!0));
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = K(e), this._svg.append("g").attr("class", "links-group"), this._svg.append("g").attr("class", "nodes-group");
  }
  _buildHierarchy() {
    this._data && (this._root = ur(this._data));
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
    s(this._root, "0"), this._root = ur(this._data);
    const a = (C, T) => {
      const S = i.get(T);
      if (S != null && S.collapsed && (C._collapsed = !0, C._children = C.children, C.children = void 0), C.children)
        for (let M = 0; M < C.children.length; M++)
          a(C.children[M], `${T}/${M}`);
    };
    a(this._root, "0");
    const o = this._getVisibleNodes(), c = o.filter((C) => !C.children || C.children.length === 0).length, l = ya(o, (C) => C.depth) || 0, u = Ze + 20, h = Gt + 60;
    let f, d;
    r ? (f = l * h, d = Math.max((c - 1) * u, u)) : (f = Math.max((c - 1) * (Gt + 80), Gt + 80), d = l * h), Kd().size(r ? [d, f] : [f, d]).separation((C, T) => C.parent === T.parent ? 1.5 : 2)(this._root);
    const p = this._root.descendants(), m = this._root.links(), b = f + In * 2 + Gt, y = d + In * 2 + Ze;
    this._svg.attr("viewBox", `0 0 ${b} ${y}`);
    const v = In + Gt / 2, _ = In + Ze / 2, x = (C) => r ? C.y + v : C.x + v, k = (C) => r ? C.x + _ : C.y + _, $ = this._svg.select(".links-group");
    $.selectAll("*").remove();
    const A = r ? Ep().x((C) => C.y + v).y((C) => C.x + _) : Pp().x((C) => C.x + v).y((C) => C.y + _);
    for (let C = 0; C < m.length; C++) {
      const T = m[C], S = $.append("path").attr("class", "link").attr("d", A(T));
      if (e) {
        const M = S.node().getTotalLength();
        S.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().delay(C * 60 + 100).duration(500).ease(dn).attr("stroke-dashoffset", 0);
      }
    }
    const w = this._svg.select(".nodes-group");
    w.selectAll("*").remove();
    for (let C = 0; C < p.length; C++) {
      const T = p[C], S = x(T), M = k(T), E = T.data.children && T.data.children.length > 0, P = !!T._collapsed, L = T.depth % va.length, D = getComputedStyle(this).getPropertyValue(`--lv-chart-${L}`).trim() || va[L], B = w.append("g").attr("transform", `translate(${S},${M})`);
      e && B.attr("opacity", 0).transition().delay(C * 60).duration(400).ease(dn).attr("opacity", 1);
      const I = B.append("rect").attr("class", `node-rect ${E ? "has-children" : "leaf"}`).attr("x", -Gt / 2).attr("y", -Ze / 2).attr("width", Gt).attr("height", Ze).attr("stroke", D);
      B.append("text").attr("class", "node-label").text(T.data.label), E && B.append("text").attr("class", "collapse-indicator").attr("x", Gt / 2 - 12).attr("y", 0).text(P ? "+" : "−"), E && (I.on("click", () => {
        this._toggleCollapse(T);
      }), B.select(".collapse-indicator").on("click", () => {
        this._toggleCollapse(T);
      }));
    }
  }
}
customElements.define("lv-tree", vg);
export {
  F as LvBaseElement,
  hl as clamp,
  fl as colorScale,
  dl as formatNum,
  wg as getToken,
  Ye as lerp,
  fs as scrollAnimator,
  kg as setTheme,
  bg as simColorScale,
  yg as uid
};

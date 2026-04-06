var Ol = Object.defineProperty;
var Ss = (n) => {
  throw TypeError(n);
};
var Nl = (n, t, e) => t in n ? Ol(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var D = (n, t, e) => Nl(n, typeof t != "symbol" ? t + "" : t, e), Ts = (n, t, e) => t.has(n) || Ss("Cannot " + e);
var Se = (n, t, e) => (Ts(n, t, "read from private field"), e ? e.call(n) : t.get(n)), zn = (n, t, e) => t.has(n) ? Ss("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), Te = (n, t, e, r) => (Ts(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e);
var Ie, Mn;
class Dl {
  constructor() {
    zn(this, Ie);
    zn(this, Mn, /* @__PURE__ */ new WeakSet());
    Te(this, Ie, new IntersectionObserver((t) => {
      for (const e of t)
        if (e.isIntersecting && !Se(this, Mn).has(e.target)) {
          Se(this, Mn).add(e.target);
          const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches, i = e.target;
          typeof i.animateIn == "function" && (r ? i.animateIn(!0) : i.animateIn(!1));
        }
    }, { threshold: 0.15 }));
  }
  observe(t) {
    Se(this, Ie).observe(t);
  }
  unobserve(t) {
    Se(this, Ie).unobserve(t);
  }
}
Ie = new WeakMap(), Mn = new WeakMap();
const Ms = new Dl();
var Qt;
class I extends HTMLElement {
  constructor() {
    super();
    // Shadow root setup
    D(this, "root");
    // Re-entrance guard — prevents attributeChangedCallback → _render → attributeChangedCallback loops
    zn(this, Qt, !1);
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
    Te(this, Qt, !0), this.root.innerHTML = e, Te(this, Qt, !1);
  }
  // Base attributeChangedCallback with re-entrance protection
  // Subclasses override handleAttributeChange() instead
  attributeChangedCallback(e, r, i) {
    Se(this, Qt) || (Te(this, Qt, !0), this.handleAttributeChange(e, r, i), Te(this, Qt, !1));
  }
  // Override this in subclasses instead of attributeChangedCallback
  handleAttributeChange(e, r, i) {
  }
  // Called by ScrollAnimator when element enters viewport
  animateIn(e) {
  }
  connectedCallback() {
    Ms.observe(this);
  }
  disconnectedCallback() {
    Ms.unobserve(this);
  }
}
Qt = new WeakMap();
function Ke(n, t, e) {
  return n + (t - n) * e;
}
function Fl(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Il(n) {
  n = Fl(n, 0, 1);
  const t = n < 0.5 ? Math.round(Ke(0, 255, n * 2)) : 255, e = n < 0.5 ? Math.round(Ke(200, 230, n * 2)) : Math.round(Ke(230, 50, (n - 0.5) * 2)), r = n < 0.5 ? Math.round(Ke(83, 60, n * 2)) : Math.round(Ke(60, 80, (n - 0.5) * 2));
  return `rgb(${t},${e},${r})`;
}
function Rm(n) {
  return Il((1 - n) / 2);
}
function ql(n) {
  return Number.isInteger(n) ? n.toString() : Math.abs(n) >= 100 ? n.toFixed(0) : Math.abs(n) >= 1 ? n.toFixed(1) : n.toFixed(2);
}
let Hl = 0;
function Om(n = "lv") {
  return `${n}-${++Hl}`;
}
const Ir = /* @__PURE__ */ new Map(), qr = /* @__PURE__ */ new Map();
function ke(n) {
  let t = Ir.get(n);
  return t || (t = new Promise((e, r) => {
    const i = document.createElement("script");
    i.src = n, i.onload = () => e(), i.onerror = () => {
      Ir.delete(n), r(new Error(`Failed to load ${n}`));
    }, document.head.appendChild(i);
  }), Ir.set(n, t), t);
}
function Nm(n) {
  let t = qr.get(n);
  return t || (t = new Promise((e, r) => {
    const i = document.createElement("link");
    i.rel = "stylesheet", i.href = n, i.onload = () => e(), i.onerror = () => {
      qr.delete(n), r(new Error(`Failed to load ${n}`));
    }, document.head.appendChild(i);
  }), qr.set(n, t), t);
}
function Dm(n, t) {
  const e = t || document.documentElement;
  return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim();
}
function Fm(n, t) {
  n.setAttribute("data-theme", t);
}
const Bl = (
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
class Vl extends I {
  static get observedAttributes() {
    return ["theme", "dir"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Bl), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    const t = this.getAttribute("dir") || "ltr";
    this.setAttribute("dir", t);
    const e = this.getAttribute("theme") || "dark";
    this.setAttribute("data-theme", e), this.render("<slot></slot>");
  }
}
customElements.define("lv-page", Vl);
const Xl = (
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
class Yl extends I {
  static get observedAttributes() {
    return ["number", "title", "subtitle", "gradient"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Xl), this._render();
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
customElements.define("lv-hero", Yl);
const Gl = (
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
class jl extends I {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Gl), this._render();
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
customElements.define("lv-section", jl);
const Wl = (
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
class Ul extends I {
  static get observedAttributes() {
    return ["variant"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Wl), this._render();
  }
  handleAttributeChange() {
    this._render();
  }
  _render() {
    this.root.querySelector(".card") || this.render('<div class="card"><slot></slot></div>');
  }
}
customElements.define("lv-card", Ul);
const Kl = (
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
class Zl extends I {
  static get observedAttributes() {
    return ["cols", "gap"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Kl), this._render();
  }
  handleAttributeChange() {
    this.root.querySelector(".grid") || this._render();
  }
  _render() {
    this.render('<div class="grid"><slot></slot></div>');
  }
}
customElements.define("lv-grid", Zl);
const Ql = (
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
class Jl extends I {
  static get observedAttributes() {
    return ["label", "active"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ql), this.render("<slot></slot>"), this.setAttribute("role", "tabpanel");
  }
  handleAttributeChange() {
  }
}
customElements.define("lv-tab", Jl);
const tc = (
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
class ec extends I {
  constructor() {
    super(...arguments);
    D(this, "_tabs", []);
    D(this, "_buttons", []);
    D(this, "_activeIndex", 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(tc), requestAnimationFrame(() => this._setup());
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
customElements.define("lv-tabs", ec);
const nc = (
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
class rc extends I {
  static get observedAttributes() {
    return ["prev", "prev-label", "next", "next-label"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(nc), this._render();
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
customElements.define("lv-nav", rc);
const ic = (
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
class sc extends I {
  static get observedAttributes() {
    return ["vs"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ic), this._render();
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
customElements.define("lv-comparison", sc);
const ac = `
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
`, oc = `
  <div class="val"></div>
  <div class="label"></div>
`;
class lc extends I {
  constructor() {
    super(...arguments);
    D(this, "_observer", null);
  }
  static get observedAttributes() {
    return ["value", "label", "prefix", "suffix", "color", "animated"];
  }
  connectedCallback() {
    var e;
    (e = super.connectedCallback) == null || e.call(this), this.adoptStyles(ac), this.render(oc), this._update(), this._setupObserver();
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
      a.textContent = (this.getAttribute("prefix") || "") + ql(h) + (this.getAttribute("suffix") || ""), l < 1 && requestAnimationFrame(o);
    };
    requestAnimationFrame(o);
  }
}
customElements.define("lv-metric", lc);
const Es = {
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
}, cc = `
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
class uc extends I {
  static get observedAttributes() {
    return ["type", "title"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(cc), this._render();
  }
  handleAttributeChange(t, e, r) {
    this.root.querySelector(".callout") && this._render();
  }
  _getType() {
    const t = this.getAttribute("type");
    return Es[t] ? t : "info";
  }
  _render() {
    const t = this._getType(), e = Es[t], r = this.getAttribute("title") || "";
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
customElements.define("lv-callout", uc);
const hc = `
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
`, fc = `
  <span class="badge"><slot></slot></span>
`;
class dc extends I {
  static get observedAttributes() {
    return ["color", "variant"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(hc), this.render(fc), this._updateColor();
  }
  handleAttributeChange(t, e, r) {
    t === "color" && this._updateColor();
  }
  _updateColor() {
    const t = this.getAttribute("color");
    t ? this.style.setProperty("--_color", t) : this.style.removeProperty("--_color");
  }
}
customElements.define("lv-badge", dc);
const pc = `
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`, Xa = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css", gc = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
let Rn = null;
function mc() {
  return window.katex ? Promise.resolve() : Rn || (Rn = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = Xa, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = gc, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load KaTeX")), document.head.appendChild(r);
  }), Rn);
}
class _c extends I {
  constructor() {
    super(...arguments);
    D(this, "_source", "");
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(pc), this._render();
  }
  async _render() {
    try {
      await mc();
      const e = this.hasAttribute("display"), r = window.katex.renderToString(this._source, {
        displayMode: e,
        throwOnError: !1
      });
      this.root.innerHTML = `<link rel="stylesheet" href="${Xa}"><span class="katex-container">${r}</span>`;
    } catch {
      this.root.innerHTML = `<span class="fallback">${this._escapeHtml(this._source)}</span>`;
    }
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-math", _c);
const vc = `
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
`, xc = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js", Ya = "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";
let On = null;
function yc() {
  return window.hljs ? Promise.resolve() : On || (On = new Promise((n, t) => {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = Ya, document.head.appendChild(e);
    const r = document.createElement("script");
    r.src = xc, r.onload = () => n(), r.onerror = () => t(new Error("Failed to load highlight.js")), document.head.appendChild(r);
  }), On);
}
class bc extends I {
  constructor() {
    super(...arguments);
    D(this, "_source", "");
  }
  static get observedAttributes() {
    return ["language", "line-numbers"];
  }
  connectedCallback() {
    var e, r;
    (e = super.connectedCallback) == null || e.call(this), this._source = ((r = this.textContent) == null ? void 0 : r.trim()) || "", this.adoptStyles(vc), this._render();
  }
  async _render() {
    const e = this.getAttribute("language") || "", r = this.hasAttribute("line-numbers");
    let i;
    try {
      await yc();
      const a = window.hljs;
      e && a.getLanguage(e) ? i = a.highlight(this._source, { language: e }).value : i = a.highlightAuto(this._source).value;
    } catch {
      i = this._escapeHtml(this._source);
    }
    let s;
    r ? s = i.split(`
`).map((o, c) => `<span class="line-num">${c + 1}</span>${o}`).join(`
`) : s = i, this.root.innerHTML = `<link rel="stylesheet" href="${Ya}"><div class="code-block"><pre><code>${s}</code></pre></div>`;
  }
  _escapeHtml(e) {
    const r = document.createElement("span");
    return r.textContent = e, r.innerHTML;
  }
}
customElements.define("lv-code", bc);
const wc = `
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
class kc extends I {
  static get observedAttributes() {
    return ["data", "labels", "highlight"];
  }
  connectedCallback() {
    var t;
    (t = super.connectedCallback) == null || t.call(this), this.adoptStyles(wc), this._render();
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
        const g = t[f][d], p = typeof g == "number" ? this._formatNum(g) : String(g), _ = c.has(`${f},${d}`);
        u += `<span class="cell${_ ? " highlight" : ""}">${p}</span>`;
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
customElements.define("lv-matrix", kc);
const Ac = (
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
class $c extends I {
  constructor() {
    super(...arguments);
    D(this, "_answered", !1);
  }
  static get observedAttributes() {
    return ["question", "options", "correct", "explanation"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ac), this._render(), this._attachListeners();
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
customElements.define("lv-quiz", $c);
const Cc = (
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
class Sc extends I {
  constructor() {
    super(...arguments);
    D(this, "_revealed", !1);
  }
  static get observedAttributes() {
    return ["label", "revealed"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Cc), this._render(), this._attachListeners(), this.hasAttribute("revealed") && this._reveal(!1);
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
customElements.define("lv-reveal", Sc);
const Tc = (
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
class Mc extends I {
  constructor() {
    super(...arguments);
    D(this, "_input", null);
    D(this, "_valueEl", null);
    D(this, "_popTimeout", null);
  }
  static get observedAttributes() {
    return ["min", "max", "step", "value", "label", "name", "color"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Tc), this._render(), this._bind(), this._updateTrack();
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
customElements.define("lv-slider", Mc);
const Ec = (
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
class Lc extends I {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Ec), this._render(), this._bind();
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
customElements.define("lv-playground", Lc);
const Pc = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function Ls(n) {
  return String(n).split("").map((t) => Pc[parseInt(t)] ?? t).join("");
}
const zc = (
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
class Rc extends I {
  static get observedAttributes() {
    return ["title"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(zc), this._render();
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
customElements.define("lv-step", Rc);
const Oc = (
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
class Nc extends I {
  constructor() {
    super(...arguments);
    D(this, "_current", 0);
    D(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Oc), this._render(), requestAnimationFrame(() => {
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
    i && (i.textContent = `${Ls(e + 1)} / ${Ls(this._total)}`);
    const s = this.root.querySelector(".prev"), a = this.root.querySelector(".next");
    s && (s.disabled = e === 0), a && (a.disabled = e === this._total - 1);
  }
}
customElements.define("lv-stepper", Nc);
const Dc = [
  "#00d4ff",
  "#7b68ee",
  "#00c853",
  "#ff9800",
  "#ff2d75",
  "#ffd93d",
  "#69f0ae",
  "#ff6b9d"
], Fc = (
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
class Ic extends I {
  constructor() {
    super(...arguments);
    D(this, "_data", []);
    D(this, "_hasAnimated", !1);
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
    super.connectedCallback(), this.adoptStyles(Fc), this._data = this.jsonAttr("data", []), this._buildChart();
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
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || Dc[e % 8];
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
customElements.define("lv-bar-chart", Ic);
function Wn(n, t) {
  return n == null || t == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function qc(n, t) {
  return n == null || t == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Xi(n) {
  let t, e, r;
  n.length !== 2 ? (t = Wn, e = (o, c) => Wn(n(o), c), r = (o, c) => n(o) - c) : (t = n === Wn || n === qc ? n : Hc, e = n, r = n);
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
function Hc() {
  return 0;
}
function Bc(n) {
  return n === null ? NaN : +n;
}
const Vc = Xi(Wn), Xc = Vc.right;
Xi(Bc).center;
function rr(n, t) {
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
const Yc = Math.sqrt(50), Gc = Math.sqrt(10), jc = Math.sqrt(2);
function ir(n, t, e) {
  const r = (t - n) / Math.max(0, e), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), a = s >= Yc ? 10 : s >= Gc ? 5 : s >= jc ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, o = Math.round(n * l), c = Math.round(t * l), o / l < n && ++o, c / l > t && --c, l = -l) : (l = Math.pow(10, i) * a, o = Math.round(n / l), c = Math.round(t / l), o * l < n && ++o, c * l > t && --c), c < o && 0.5 <= e && e < 2 ? ir(n, t, e * 2) : [o, c, l];
}
function Wc(n, t, e) {
  if (t = +t, n = +n, e = +e, !(e > 0)) return [];
  if (n === t) return [n];
  const r = t < n, [i, s, a] = r ? ir(t, n, e) : ir(n, t, e);
  if (!(s >= i)) return [];
  const o = s - i + 1, c = new Array(o);
  if (r)
    if (a < 0) for (let l = 0; l < o; ++l) c[l] = (s - l) / -a;
    else for (let l = 0; l < o; ++l) c[l] = (s - l) * a;
  else if (a < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -a;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * a;
  return c;
}
function pi(n, t, e) {
  return t = +t, n = +n, e = +e, ir(n, t, e)[2];
}
function Uc(n, t, e) {
  t = +t, n = +n, e = +e;
  const r = t < n, i = r ? pi(t, n, e) : pi(n, t, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ga(n, t) {
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
function Kc(n, t) {
  let e;
  for (const r of n)
    r != null && (e > r || e === void 0 && r >= r) && (e = r);
  return e;
}
function Zc(n) {
  return n;
}
var Hr = 1, Br = 2, gi = 3, sn = 4, Ps = 1e-6;
function Qc(n) {
  return "translate(" + n + ",0)";
}
function Jc(n) {
  return "translate(0," + n + ")";
}
function tu(n) {
  return (t) => +n(t);
}
function eu(n, t) {
  return t = Math.max(0, n.bandwidth() - t * 2) / 2, n.round() && (t = Math.round(t)), (e) => +n(e) + t;
}
function nu() {
  return !this.__axis;
}
function ja(n, t) {
  var e = [], r = null, i = null, s = 6, a = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = n === Hr || n === sn ? -1 : 1, u = n === sn || n === Br ? "x" : "y", h = n === Hr || n === gi ? Qc : Jc;
  function f(d) {
    var g = r ?? (t.ticks ? t.ticks.apply(t, e) : t.domain()), p = i ?? (t.tickFormat ? t.tickFormat.apply(t, e) : Zc), _ = Math.max(s, 0) + o, x = t.range(), b = +x[0] + c, v = +x[x.length - 1] + c, m = (t.bandwidth ? eu : tu)(t.copy(), c), w = d.selection ? d.selection() : d, C = w.selectAll(".domain").data([null]), k = w.selectAll(".tick").data(g, t).order(), $ = k.exit(), y = k.enter().append("g").attr("class", "tick"), S = k.select("line"), M = k.select("text");
    C = C.merge(C.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), k = k.merge(y), S = S.merge(y.append("line").attr("stroke", "currentColor").attr(u + "2", l * s)), M = M.merge(y.append("text").attr("fill", "currentColor").attr(u, l * _).attr("dy", n === Hr ? "0em" : n === gi ? "0.71em" : "0.32em")), d !== w && (C = C.transition(d), k = k.transition(d), S = S.transition(d), M = M.transition(d), $ = $.transition(d).attr("opacity", Ps).attr("transform", function(T) {
      return isFinite(T = m(T)) ? h(T + c) : this.getAttribute("transform");
    }), y.attr("opacity", Ps).attr("transform", function(T) {
      var E = this.parentNode.__axis;
      return h((E && isFinite(E = E(T)) ? E : m(T)) + c);
    })), $.remove(), C.attr("d", n === sn || n === Br ? a ? "M" + l * a + "," + b + "H" + c + "V" + v + "H" + l * a : "M" + c + "," + b + "V" + v : a ? "M" + b + "," + l * a + "V" + c + "H" + v + "V" + l * a : "M" + b + "," + c + "H" + v), k.attr("opacity", 1).attr("transform", function(T) {
      return h(m(T) + c);
    }), S.attr(u + "2", l * s), M.attr(u, l * _).text(p), w.filter(nu).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", n === Br ? "start" : n === sn ? "end" : "middle"), w.each(function() {
      this.__axis = m;
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
function sr(n) {
  return ja(gi, n);
}
function ar(n) {
  return ja(sn, n);
}
var ru = { value: () => {
} };
function Yi() {
  for (var n = 0, t = arguments.length, e = {}, r; n < t; ++n) {
    if (!(r = arguments[n] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Un(e);
}
function Un(n) {
  this._ = n;
}
function iu(n, t) {
  return n.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !t.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
Un.prototype = Yi.prototype = {
  constructor: Un,
  on: function(n, t) {
    var e = this._, r = iu(n + "", e), i, s = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (n = r[s]).type) && (i = su(e[i], n.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (i = (n = r[s]).type) e[i] = zs(e[i], n.name, t);
      else if (t == null) for (i in e) e[i] = zs(e[i], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, t = this._;
    for (var e in t) n[e] = t[e].slice();
    return new Un(n);
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
function su(n, t) {
  for (var e = 0, r = n.length, i; e < r; ++e)
    if ((i = n[e]).name === t)
      return i.value;
}
function zs(n, t, e) {
  for (var r = 0, i = n.length; r < i; ++r)
    if (n[r].name === t) {
      n[r] = ru, n = n.slice(0, r).concat(n.slice(r + 1));
      break;
    }
  return e != null && n.push({ name: t, value: e }), n;
}
var mi = "http://www.w3.org/1999/xhtml";
const Rs = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Mr(n) {
  var t = n += "", e = t.indexOf(":");
  return e >= 0 && (t = n.slice(0, e)) !== "xmlns" && (n = n.slice(e + 1)), Rs.hasOwnProperty(t) ? { space: Rs[t], local: n } : n;
}
function au(n) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === mi && t.documentElement.namespaceURI === mi ? t.createElement(n) : t.createElementNS(e, n);
  };
}
function ou(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Wa(n) {
  var t = Mr(n);
  return (t.local ? ou : au)(t);
}
function lu() {
}
function Gi(n) {
  return n == null ? lu : function() {
    return this.querySelector(n);
  };
}
function cu(n) {
  typeof n != "function" && (n = Gi(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = new Array(a), c, l, u = 0; u < a; ++u)
      (c = s[u]) && (l = n.call(c, c.__data__, u, s)) && ("__data__" in c && (l.__data__ = c.__data__), o[u] = l);
  return new kt(r, this._parents);
}
function uu(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function hu() {
  return [];
}
function Ua(n) {
  return n == null ? hu : function() {
    return this.querySelectorAll(n);
  };
}
function fu(n) {
  return function() {
    return uu(n.apply(this, arguments));
  };
}
function du(n) {
  typeof n == "function" ? n = fu(n) : n = Ua(n);
  for (var t = this._groups, e = t.length, r = [], i = [], s = 0; s < e; ++s)
    for (var a = t[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && (r.push(n.call(c, c.__data__, l, a)), i.push(c));
  return new kt(r, i);
}
function Ka(n) {
  return function() {
    return this.matches(n);
  };
}
function Za(n) {
  return function(t) {
    return t.matches(n);
  };
}
var pu = Array.prototype.find;
function gu(n) {
  return function() {
    return pu.call(this.children, n);
  };
}
function mu() {
  return this.firstElementChild;
}
function _u(n) {
  return this.select(n == null ? mu : gu(typeof n == "function" ? n : Za(n)));
}
var vu = Array.prototype.filter;
function xu() {
  return Array.from(this.children);
}
function yu(n) {
  return function() {
    return vu.call(this.children, n);
  };
}
function bu(n) {
  return this.selectAll(n == null ? xu : yu(typeof n == "function" ? n : Za(n)));
}
function wu(n) {
  typeof n != "function" && (n = Ka(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new kt(r, this._parents);
}
function Qa(n) {
  return new Array(n.length);
}
function ku() {
  return new kt(this._enter || this._groups.map(Qa), this._parents);
}
function or(n, t) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = t;
}
or.prototype = {
  constructor: or,
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
function Au(n) {
  return function() {
    return n;
  };
}
function $u(n, t, e, r, i, s) {
  for (var a = 0, o, c = t.length, l = s.length; a < l; ++a)
    (o = t[a]) ? (o.__data__ = s[a], r[a] = o) : e[a] = new or(n, s[a]);
  for (; a < c; ++a)
    (o = t[a]) && (i[a] = o);
}
function Cu(n, t, e, r, i, s, a) {
  var o, c, l = /* @__PURE__ */ new Map(), u = t.length, h = s.length, f = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = t[o]) && (f[o] = d = a.call(c, c.__data__, o, t) + "", l.has(d) ? i[o] = c : l.set(d, c));
  for (o = 0; o < h; ++o)
    d = a.call(n, s[o], o, s) + "", (c = l.get(d)) ? (r[o] = c, c.__data__ = s[o], l.delete(d)) : e[o] = new or(n, s[o]);
  for (o = 0; o < u; ++o)
    (c = t[o]) && l.get(f[o]) === c && (i[o] = c);
}
function Su(n) {
  return n.__data__;
}
function Tu(n, t) {
  if (!arguments.length) return Array.from(this, Su);
  var e = t ? Cu : $u, r = this._parents, i = this._groups;
  typeof n != "function" && (n = Au(n));
  for (var s = i.length, a = new Array(s), o = new Array(s), c = new Array(s), l = 0; l < s; ++l) {
    var u = r[l], h = i[l], f = h.length, d = Mu(n.call(u, u && u.__data__, l, r)), g = d.length, p = o[l] = new Array(g), _ = a[l] = new Array(g), x = c[l] = new Array(f);
    e(u, h, p, _, x, d, t);
    for (var b = 0, v = 0, m, w; b < g; ++b)
      if (m = p[b]) {
        for (b >= v && (v = b + 1); !(w = _[v]) && ++v < g; ) ;
        m._next = w || null;
      }
  }
  return a = new kt(a, r), a._enter = o, a._exit = c, a;
}
function Mu(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function Eu() {
  return new kt(this._exit || this._groups.map(Qa), this._parents);
}
function Lu(n, t, e) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof n == "function" ? (r = n(r), r && (r = r.selection())) : r = r.append(n + ""), t != null && (i = t(i), i && (i = i.selection())), e == null ? s.remove() : e(s), r && i ? r.merge(i).order() : i;
}
function Pu(n) {
  for (var t = n.selection ? n.selection() : n, e = this._groups, r = t._groups, i = e.length, s = r.length, a = Math.min(i, s), o = new Array(i), c = 0; c < a; ++c)
    for (var l = e[c], u = r[c], h = l.length, f = o[c] = new Array(h), d, g = 0; g < h; ++g)
      (d = l[g] || u[g]) && (f[g] = d);
  for (; c < i; ++c)
    o[c] = e[c];
  return new kt(o, this._parents);
}
function zu() {
  for (var n = this._groups, t = -1, e = n.length; ++t < e; )
    for (var r = n[t], i = r.length - 1, s = r[i], a; --i >= 0; )
      (a = r[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Ru(n) {
  n || (n = Ou);
  function t(h, f) {
    return h && f ? n(h.__data__, f.__data__) : !h - !f;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var a = e[s], o = a.length, c = i[s] = new Array(o), l, u = 0; u < o; ++u)
      (l = a[u]) && (c[u] = l);
    c.sort(t);
  }
  return new kt(i, this._parents).order();
}
function Ou(n, t) {
  return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function Nu() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function Du() {
  return Array.from(this);
}
function Fu() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length; i < s; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function Iu() {
  let n = 0;
  for (const t of this) ++n;
  return n;
}
function qu() {
  return !this.node();
}
function Hu(n) {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var i = t[e], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && n.call(o, o.__data__, s, i);
  return this;
}
function Bu(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Vu(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Xu(n, t) {
  return function() {
    this.setAttribute(n, t);
  };
}
function Yu(n, t) {
  return function() {
    this.setAttributeNS(n.space, n.local, t);
  };
}
function Gu(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(n) : this.setAttribute(n, e);
  };
}
function ju(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
  };
}
function Wu(n, t) {
  var e = Mr(n);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((t == null ? e.local ? Vu : Bu : typeof t == "function" ? e.local ? ju : Gu : e.local ? Yu : Xu)(e, t));
}
function Ja(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function Uu(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Ku(n, t, e) {
  return function() {
    this.style.setProperty(n, t, e);
  };
}
function Zu(n, t, e) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
  };
}
function Qu(n, t, e) {
  return arguments.length > 1 ? this.each((t == null ? Uu : typeof t == "function" ? Zu : Ku)(n, t, e ?? "")) : qe(this.node(), n);
}
function qe(n, t) {
  return n.style.getPropertyValue(t) || Ja(n).getComputedStyle(n, null).getPropertyValue(t);
}
function Ju(n) {
  return function() {
    delete this[n];
  };
}
function th(n, t) {
  return function() {
    this[n] = t;
  };
}
function eh(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[n] : this[n] = e;
  };
}
function nh(n, t) {
  return arguments.length > 1 ? this.each((t == null ? Ju : typeof t == "function" ? eh : th)(n, t)) : this.node()[n];
}
function to(n) {
  return n.trim().split(/^|\s+/);
}
function ji(n) {
  return n.classList || new eo(n);
}
function eo(n) {
  this._node = n, this._names = to(n.getAttribute("class") || "");
}
eo.prototype = {
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
function no(n, t) {
  for (var e = ji(n), r = -1, i = t.length; ++r < i; ) e.add(t[r]);
}
function ro(n, t) {
  for (var e = ji(n), r = -1, i = t.length; ++r < i; ) e.remove(t[r]);
}
function rh(n) {
  return function() {
    no(this, n);
  };
}
function ih(n) {
  return function() {
    ro(this, n);
  };
}
function sh(n, t) {
  return function() {
    (t.apply(this, arguments) ? no : ro)(this, n);
  };
}
function ah(n, t) {
  var e = to(n + "");
  if (arguments.length < 2) {
    for (var r = ji(this.node()), i = -1, s = e.length; ++i < s; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? sh : t ? rh : ih)(e, t));
}
function oh() {
  this.textContent = "";
}
function lh(n) {
  return function() {
    this.textContent = n;
  };
}
function ch(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function uh(n) {
  return arguments.length ? this.each(n == null ? oh : (typeof n == "function" ? ch : lh)(n)) : this.node().textContent;
}
function hh() {
  this.innerHTML = "";
}
function fh(n) {
  return function() {
    this.innerHTML = n;
  };
}
function dh(n) {
  return function() {
    var t = n.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function ph(n) {
  return arguments.length ? this.each(n == null ? hh : (typeof n == "function" ? dh : fh)(n)) : this.node().innerHTML;
}
function gh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function mh() {
  return this.each(gh);
}
function _h() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vh() {
  return this.each(_h);
}
function xh(n) {
  var t = typeof n == "function" ? n : Wa(n);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function yh() {
  return null;
}
function bh(n, t) {
  var e = typeof n == "function" ? n : Wa(n), r = t == null ? yh : typeof t == "function" ? t : Gi(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function wh() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function kh() {
  return this.each(wh);
}
function Ah() {
  var n = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function $h() {
  var n = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(n, this.nextSibling) : n;
}
function Ch(n) {
  return this.select(n ? $h : Ah);
}
function Sh(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function Th(n) {
  return function(t) {
    n.call(this, t, this.__data__);
  };
}
function Mh(n) {
  return n.trim().split(/^|\s+/).map(function(t) {
    var e = "", r = t.indexOf(".");
    return r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: e };
  });
}
function Eh(n) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e = 0, r = -1, i = t.length, s; e < i; ++e)
        s = t[e], (!n.type || s.type === n.type) && s.name === n.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++r] = s;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function Lh(n, t, e) {
  return function() {
    var r = this.__on, i, s = Th(t);
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
function Ph(n, t, e) {
  var r = Mh(n + ""), i, s = r.length, a;
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
  for (o = t ? Lh : Eh, i = 0; i < s; ++i) this.each(o(r[i], t, e));
  return this;
}
function io(n, t, e) {
  var r = Ja(n), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(t, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(t, !1, !1)), n.dispatchEvent(i);
}
function zh(n, t) {
  return function() {
    return io(this, n, t);
  };
}
function Rh(n, t) {
  return function() {
    return io(this, n, t.apply(this, arguments));
  };
}
function Oh(n, t) {
  return this.each((typeof t == "function" ? Rh : zh)(n, t));
}
function* Nh() {
  for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
    for (var r = n[t], i = 0, s = r.length, a; i < s; ++i)
      (a = r[i]) && (yield a);
}
var so = [null];
function kt(n, t) {
  this._groups = n, this._parents = t;
}
function En() {
  return new kt([[document.documentElement]], so);
}
function Dh() {
  return this;
}
kt.prototype = En.prototype = {
  constructor: kt,
  select: cu,
  selectAll: du,
  selectChild: _u,
  selectChildren: bu,
  filter: wu,
  data: Tu,
  enter: ku,
  exit: Eu,
  join: Lu,
  merge: Pu,
  selection: Dh,
  order: zu,
  sort: Ru,
  call: Nu,
  nodes: Du,
  node: Fu,
  size: Iu,
  empty: qu,
  each: Hu,
  attr: Wu,
  style: Qu,
  property: nh,
  classed: ah,
  text: uh,
  html: ph,
  raise: mh,
  lower: vh,
  append: xh,
  insert: bh,
  remove: kh,
  clone: Ch,
  datum: Sh,
  on: Ph,
  dispatch: Oh,
  [Symbol.iterator]: Nh
};
function tt(n) {
  return typeof n == "string" ? new kt([[document.querySelector(n)]], [document.documentElement]) : new kt([[n]], so);
}
function Fh(n) {
  let t;
  for (; t = n.sourceEvent; ) n = t;
  return n;
}
function _i(n, t) {
  if (n = Fh(n), t === void 0 && (t = n.currentTarget), t) {
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
const Ih = { passive: !1 }, gn = { capture: !0, passive: !1 };
function Vr(n) {
  n.stopImmediatePropagation();
}
function Re(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function qh(n) {
  var t = n.document.documentElement, e = tt(n).on("dragstart.drag", Re, gn);
  "onselectstart" in t ? e.on("selectstart.drag", Re, gn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Hh(n, t) {
  var e = n.document.documentElement, r = tt(n).on("dragstart.drag", null);
  t && (r.on("click.drag", Re, gn), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
const Nn = (n) => () => n;
function vi(n, {
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
vi.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function Bh(n) {
  return !n.ctrlKey && !n.button;
}
function Vh() {
  return this.parentNode;
}
function Xh(n, t) {
  return t ?? { x: n.x, y: n.y };
}
function Yh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Gh() {
  var n = Bh, t = Vh, e = Xh, r = Yh, i = {}, s = Yi("start", "drag", "end"), a = 0, o, c, l, u, h = 0;
  function f(m) {
    m.on("mousedown.drag", d).filter(r).on("touchstart.drag", _).on("touchmove.drag", x, Ih).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(m, w) {
    if (!(u || !n.call(this, m, w))) {
      var C = v(this, t.call(this, m, w), m, w, "mouse");
      C && (tt(m.view).on("mousemove.drag", g, gn).on("mouseup.drag", p, gn), qh(m.view), Vr(m), l = !1, o = m.clientX, c = m.clientY, C("start", m));
    }
  }
  function g(m) {
    if (Re(m), !l) {
      var w = m.clientX - o, C = m.clientY - c;
      l = w * w + C * C > h;
    }
    i.mouse("drag", m);
  }
  function p(m) {
    tt(m.view).on("mousemove.drag mouseup.drag", null), Hh(m.view, l), Re(m), i.mouse("end", m);
  }
  function _(m, w) {
    if (n.call(this, m, w)) {
      var C = m.changedTouches, k = t.call(this, m, w), $ = C.length, y, S;
      for (y = 0; y < $; ++y)
        (S = v(this, k, m, w, C[y].identifier, C[y])) && (Vr(m), S("start", m, C[y]));
    }
  }
  function x(m) {
    var w = m.changedTouches, C = w.length, k, $;
    for (k = 0; k < C; ++k)
      ($ = i[w[k].identifier]) && (Re(m), $("drag", m, w[k]));
  }
  function b(m) {
    var w = m.changedTouches, C = w.length, k, $;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), k = 0; k < C; ++k)
      ($ = i[w[k].identifier]) && (Vr(m), $("end", m, w[k]));
  }
  function v(m, w, C, k, $, y) {
    var S = s.copy(), M = _i(y || C, w), T, E, z;
    if ((z = e.call(m, new vi("beforestart", {
      sourceEvent: C,
      target: f,
      identifier: $,
      active: a,
      x: M[0],
      y: M[1],
      dx: 0,
      dy: 0,
      dispatch: S
    }), k)) != null)
      return T = z.x - M[0] || 0, E = z.y - M[1] || 0, function A(L, P, O) {
        var R = M, N;
        switch (L) {
          case "start":
            i[$] = A, N = a++;
            break;
          case "end":
            delete i[$], --a;
          // falls through
          case "drag":
            M = _i(O || P, w), N = a;
            break;
        }
        S.call(
          L,
          m,
          new vi(L, {
            sourceEvent: P,
            subject: z,
            target: f,
            identifier: $,
            active: N,
            x: M[0] + T,
            y: M[1] + E,
            dx: M[0] - R[0],
            dy: M[1] - R[1],
            dispatch: S
          }),
          k
        );
      };
  }
  return f.filter = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : Nn(!!m), f) : n;
  }, f.container = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : Nn(m), f) : t;
  }, f.subject = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : Nn(m), f) : e;
  }, f.touchable = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : Nn(!!m), f) : r;
  }, f.on = function() {
    var m = s.on.apply(s, arguments);
    return m === s ? f : m;
  }, f.clickDistance = function(m) {
    return arguments.length ? (h = (m = +m) * m, f) : Math.sqrt(h);
  }, f;
}
function Wi(n, t, e) {
  n.prototype = t.prototype = e, e.constructor = n;
}
function ao(n, t) {
  var e = Object.create(n.prototype);
  for (var r in t) e[r] = t[r];
  return e;
}
function Ln() {
}
var mn = 0.7, lr = 1 / mn, Oe = "\\s*([+-]?\\d+)\\s*", _n = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", jh = /^#([0-9a-f]{3,8})$/, Wh = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), Uh = new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`), Kh = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${_n}\\)$`), Zh = new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${_n}\\)$`), Qh = new RegExp(`^hsl\\(${_n},${Ft},${Ft}\\)$`), Jh = new RegExp(`^hsla\\(${_n},${Ft},${Ft},${_n}\\)$`), Os = {
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
Wi(Ln, jt, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ns,
  // Deprecated! Use color.formatHex.
  formatHex: Ns,
  formatHex8: tf,
  formatHsl: ef,
  formatRgb: Ds,
  toString: Ds
});
function Ns() {
  return this.rgb().formatHex();
}
function tf() {
  return this.rgb().formatHex8();
}
function ef() {
  return oo(this).formatHsl();
}
function Ds() {
  return this.rgb().formatRgb();
}
function jt(n) {
  var t, e;
  return n = (n + "").trim().toLowerCase(), (t = jh.exec(n)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? Fs(t) : e === 3 ? new ht(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : e === 8 ? Dn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : e === 4 ? Dn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Wh.exec(n)) ? new ht(t[1], t[2], t[3], 1) : (t = Uh.exec(n)) ? new ht(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Kh.exec(n)) ? Dn(t[1], t[2], t[3], t[4]) : (t = Zh.exec(n)) ? Dn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Qh.exec(n)) ? Hs(t[1], t[2] / 100, t[3] / 100, 1) : (t = Jh.exec(n)) ? Hs(t[1], t[2] / 100, t[3] / 100, t[4]) : Os.hasOwnProperty(n) ? Fs(Os[n]) : n === "transparent" ? new ht(NaN, NaN, NaN, 0) : null;
}
function Fs(n) {
  return new ht(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function Dn(n, t, e, r) {
  return r <= 0 && (n = t = e = NaN), new ht(n, t, e, r);
}
function nf(n) {
  return n instanceof Ln || (n = jt(n)), n ? (n = n.rgb(), new ht(n.r, n.g, n.b, n.opacity)) : new ht();
}
function cr(n, t, e, r) {
  return arguments.length === 1 ? nf(n) : new ht(n, t, e, r ?? 1);
}
function ht(n, t, e, r) {
  this.r = +n, this.g = +t, this.b = +e, this.opacity = +r;
}
Wi(ht, cr, ao(Ln, {
  brighter(n) {
    return n = n == null ? lr : Math.pow(lr, n), new ht(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? mn : Math.pow(mn, n), new ht(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ht(ve(this.r), ve(this.g), ve(this.b), ur(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Is,
  // Deprecated! Use color.formatHex.
  formatHex: Is,
  formatHex8: rf,
  formatRgb: qs,
  toString: qs
}));
function Is() {
  return `#${me(this.r)}${me(this.g)}${me(this.b)}`;
}
function rf() {
  return `#${me(this.r)}${me(this.g)}${me(this.b)}${me((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function qs() {
  const n = ur(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${ve(this.r)}, ${ve(this.g)}, ${ve(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function ur(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function ve(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function me(n) {
  return n = ve(n), (n < 16 ? "0" : "") + n.toString(16);
}
function Hs(n, t, e, r) {
  return r <= 0 ? n = t = e = NaN : e <= 0 || e >= 1 ? n = t = NaN : t <= 0 && (n = NaN), new Lt(n, t, e, r);
}
function oo(n) {
  if (n instanceof Lt) return new Lt(n.h, n.s, n.l, n.opacity);
  if (n instanceof Ln || (n = jt(n)), !n) return new Lt();
  if (n instanceof Lt) return n;
  n = n.rgb();
  var t = n.r / 255, e = n.g / 255, r = n.b / 255, i = Math.min(t, e, r), s = Math.max(t, e, r), a = NaN, o = s - i, c = (s + i) / 2;
  return o ? (t === s ? a = (e - r) / o + (e < r) * 6 : e === s ? a = (r - t) / o + 2 : a = (t - e) / o + 4, o /= c < 0.5 ? s + i : 2 - s - i, a *= 60) : o = c > 0 && c < 1 ? 0 : a, new Lt(a, o, c, n.opacity);
}
function sf(n, t, e, r) {
  return arguments.length === 1 ? oo(n) : new Lt(n, t, e, r ?? 1);
}
function Lt(n, t, e, r) {
  this.h = +n, this.s = +t, this.l = +e, this.opacity = +r;
}
Wi(Lt, sf, ao(Ln, {
  brighter(n) {
    return n = n == null ? lr : Math.pow(lr, n), new Lt(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? mn : Math.pow(mn, n), new Lt(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, t = isNaN(n) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * t, i = 2 * e - r;
    return new ht(
      Xr(n >= 240 ? n - 240 : n + 120, i, r),
      Xr(n, i, r),
      Xr(n < 120 ? n + 240 : n - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Lt(Bs(this.h), Fn(this.s), Fn(this.l), ur(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = ur(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${Bs(this.h)}, ${Fn(this.s) * 100}%, ${Fn(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function Bs(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function Fn(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function Xr(n, t, e) {
  return (n < 60 ? t + (e - t) * n / 60 : n < 180 ? e : n < 240 ? t + (e - t) * (240 - n) / 60 : t) * 255;
}
function af(n, t, e, r, i) {
  var s = n * n, a = s * n;
  return ((1 - 3 * n + 3 * s - a) * t + (4 - 6 * s + 3 * a) * e + (1 + 3 * n + 3 * s - 3 * a) * r + a * i) / 6;
}
function of(n) {
  var t = n.length - 1;
  return function(e) {
    var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, t - 1) : Math.floor(e * t), i = n[r], s = n[r + 1], a = r > 0 ? n[r - 1] : 2 * i - s, o = r < t - 1 ? n[r + 2] : 2 * s - i;
    return af((e - r / t) * t, a, i, s, o);
  };
}
const Ui = (n) => () => n;
function lf(n, t) {
  return function(e) {
    return n + e * t;
  };
}
function cf(n, t, e) {
  return n = Math.pow(n, e), t = Math.pow(t, e) - n, e = 1 / e, function(r) {
    return Math.pow(n + r * t, e);
  };
}
function uf(n) {
  return (n = +n) == 1 ? lo : function(t, e) {
    return e - t ? cf(t, e, n) : Ui(isNaN(t) ? e : t);
  };
}
function lo(n, t) {
  var e = t - n;
  return e ? lf(n, e) : Ui(isNaN(n) ? t : n);
}
const hr = (function n(t) {
  var e = uf(t);
  function r(i, s) {
    var a = e((i = cr(i)).r, (s = cr(s)).r), o = e(i.g, s.g), c = e(i.b, s.b), l = lo(i.opacity, s.opacity);
    return function(u) {
      return i.r = a(u), i.g = o(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = n, r;
})(1);
function hf(n) {
  return function(t) {
    var e = t.length, r = new Array(e), i = new Array(e), s = new Array(e), a, o;
    for (a = 0; a < e; ++a)
      o = cr(t[a]), r[a] = o.r || 0, i[a] = o.g || 0, s[a] = o.b || 0;
    return r = n(r), i = n(i), s = n(s), o.opacity = 1, function(c) {
      return o.r = r(c), o.g = i(c), o.b = s(c), o + "";
    };
  };
}
var ff = hf(of);
function df(n, t) {
  t || (t = []);
  var e = n ? Math.min(t.length, n.length) : 0, r = t.slice(), i;
  return function(s) {
    for (i = 0; i < e; ++i) r[i] = n[i] * (1 - s) + t[i] * s;
    return r;
  };
}
function pf(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function gf(n, t) {
  var e = t ? t.length : 0, r = n ? Math.min(e, n.length) : 0, i = new Array(r), s = new Array(e), a;
  for (a = 0; a < r; ++a) i[a] = $e(n[a], t[a]);
  for (; a < e; ++a) s[a] = t[a];
  return function(o) {
    for (a = 0; a < r; ++a) s[a] = i[a](o);
    return s;
  };
}
function mf(n, t) {
  var e = /* @__PURE__ */ new Date();
  return n = +n, t = +t, function(r) {
    return e.setTime(n * (1 - r) + t * r), e;
  };
}
function Et(n, t) {
  return n = +n, t = +t, function(e) {
    return n * (1 - e) + t * e;
  };
}
function _f(n, t) {
  var e = {}, r = {}, i;
  (n === null || typeof n != "object") && (n = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in n ? e[i] = $e(n[i], t[i]) : r[i] = t[i];
  return function(s) {
    for (i in e) r[i] = e[i](s);
    return r;
  };
}
var xi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Yr = new RegExp(xi.source, "g");
function vf(n) {
  return function() {
    return n;
  };
}
function xf(n) {
  return function(t) {
    return n(t) + "";
  };
}
function co(n, t) {
  var e = xi.lastIndex = Yr.lastIndex = 0, r, i, s, a = -1, o = [], c = [];
  for (n = n + "", t = t + ""; (r = xi.exec(n)) && (i = Yr.exec(t)); )
    (s = i.index) > e && (s = t.slice(e, s), o[a] ? o[a] += s : o[++a] = s), (r = r[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, c.push({ i: a, x: Et(r, i) })), e = Yr.lastIndex;
  return e < t.length && (s = t.slice(e), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? c[0] ? xf(c[0].x) : vf(t) : (t = c.length, function(l) {
    for (var u = 0, h; u < t; ++u) o[(h = c[u]).i] = h.x(l);
    return o.join("");
  });
}
function $e(n, t) {
  var e = typeof t, r;
  return t == null || e === "boolean" ? Ui(t) : (e === "number" ? Et : e === "string" ? (r = jt(t)) ? (t = r, hr) : co : t instanceof jt ? hr : t instanceof Date ? mf : pf(t) ? df : Array.isArray(t) ? gf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? _f : Et)(n, t);
}
function Ki(n, t) {
  return n = +n, t = +t, function(e) {
    return Math.round(n * (1 - e) + t * e);
  };
}
var Vs = 180 / Math.PI, yi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function uo(n, t, e, r, i, s) {
  var a, o, c;
  return (a = Math.sqrt(n * n + t * t)) && (n /= a, t /= a), (c = n * e + t * r) && (e -= n * c, r -= t * c), (o = Math.sqrt(e * e + r * r)) && (e /= o, r /= o, c /= o), n * r < t * e && (n = -n, t = -t, c = -c, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(t, n) * Vs,
    skewX: Math.atan(c) * Vs,
    scaleX: a,
    scaleY: o
  };
}
var In;
function yf(n) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return t.isIdentity ? yi : uo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function bf(n) {
  return n == null || (In || (In = document.createElementNS("http://www.w3.org/2000/svg", "g")), In.setAttribute("transform", n), !(n = In.transform.baseVal.consolidate())) ? yi : (n = n.matrix, uo(n.a, n.b, n.c, n.d, n.e, n.f));
}
function ho(n, t, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, u, h, f, d, g) {
    if (l !== h || u !== f) {
      var p = d.push("translate(", null, t, null, e);
      g.push({ i: p - 4, x: Et(l, h) }, { i: p - 2, x: Et(u, f) });
    } else (h || f) && d.push("translate(" + h + t + f + e);
  }
  function a(l, u, h, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: Et(l, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function o(l, u, h, f) {
    l !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: Et(l, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function c(l, u, h, f, d, g) {
    if (l !== h || u !== f) {
      var p = d.push(i(d) + "scale(", null, ",", null, ")");
      g.push({ i: p - 4, x: Et(l, h) }, { i: p - 2, x: Et(u, f) });
    } else (h !== 1 || f !== 1) && d.push(i(d) + "scale(" + h + "," + f + ")");
  }
  return function(l, u) {
    var h = [], f = [];
    return l = n(l), u = n(u), s(l.translateX, l.translateY, u.translateX, u.translateY, h, f), a(l.rotate, u.rotate, h, f), o(l.skewX, u.skewX, h, f), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f), l = u = null, function(d) {
      for (var g = -1, p = f.length, _; ++g < p; ) h[(_ = f[g]).i] = _.x(d);
      return h.join("");
    };
  };
}
var wf = ho(yf, "px, ", "px)", "deg)"), kf = ho(bf, ", ", ")", ")");
function Af(n, t) {
  t === void 0 && (t = n, n = $e);
  for (var e = 0, r = t.length - 1, i = t[0], s = new Array(r < 0 ? 0 : r); e < r; ) s[e] = n(i, i = t[++e]);
  return function(a) {
    var o = Math.max(0, Math.min(r - 1, Math.floor(a *= r)));
    return s[o](a - o);
  };
}
var He = 0, an = 0, Ze = 0, fo = 1e3, fr, on, dr = 0, Ae = 0, Er = 0, vn = typeof performance == "object" && performance.now ? performance : Date, po = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Zi() {
  return Ae || (po($f), Ae = vn.now() + Er);
}
function $f() {
  Ae = 0;
}
function pr() {
  this._call = this._time = this._next = null;
}
pr.prototype = go.prototype = {
  constructor: pr,
  restart: function(n, t, e) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    e = (e == null ? Zi() : +e) + (t == null ? 0 : +t), !this._next && on !== this && (on ? on._next = this : fr = this, on = this), this._call = n, this._time = e, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function go(n, t, e) {
  var r = new pr();
  return r.restart(n, t, e), r;
}
function Cf() {
  Zi(), ++He;
  for (var n = fr, t; n; )
    (t = Ae - n._time) >= 0 && n._call.call(void 0, t), n = n._next;
  --He;
}
function Xs() {
  Ae = (dr = vn.now()) + Er, He = an = 0;
  try {
    Cf();
  } finally {
    He = 0, Tf(), Ae = 0;
  }
}
function Sf() {
  var n = vn.now(), t = n - dr;
  t > fo && (Er -= t, dr = n);
}
function Tf() {
  for (var n, t = fr, e, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), n = t, t = t._next) : (e = t._next, t._next = null, t = n ? n._next = e : fr = e);
  on = n, bi(r);
}
function bi(n) {
  if (!He) {
    an && (an = clearTimeout(an));
    var t = n - Ae;
    t > 24 ? (n < 1 / 0 && (an = setTimeout(Xs, n - vn.now() - Er)), Ze && (Ze = clearInterval(Ze))) : (Ze || (dr = vn.now(), Ze = setInterval(Sf, fo)), He = 1, po(Xs));
  }
}
function Ys(n, t, e) {
  var r = new pr();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), n(i + t);
  }, t, e), r;
}
var Mf = Yi("start", "end", "cancel", "interrupt"), Ef = [], mo = 0, Gs = 1, wi = 2, Kn = 3, js = 4, ki = 5, Zn = 6;
function Lr(n, t, e, r, i, s) {
  var a = n.__transition;
  if (!a) n.__transition = {};
  else if (e in a) return;
  Lf(n, e, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Mf,
    tween: Ef,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: mo
  });
}
function Qi(n, t) {
  var e = Pt(n, t);
  if (e.state > mo) throw new Error("too late; already scheduled");
  return e;
}
function Ht(n, t) {
  var e = Pt(n, t);
  if (e.state > Kn) throw new Error("too late; already running");
  return e;
}
function Pt(n, t) {
  var e = n.__transition;
  if (!e || !(e = e[t])) throw new Error("transition not found");
  return e;
}
function Lf(n, t, e) {
  var r = n.__transition, i;
  r[t] = e, e.timer = go(s, 0, e.time);
  function s(l) {
    e.state = Gs, e.timer.restart(a, e.delay, e.time), e.delay <= l && a(l - e.delay);
  }
  function a(l) {
    var u, h, f, d;
    if (e.state !== Gs) return c();
    for (u in r)
      if (d = r[u], d.name === e.name) {
        if (d.state === Kn) return Ys(a);
        d.state === js ? (d.state = Zn, d.timer.stop(), d.on.call("interrupt", n, n.__data__, d.index, d.group), delete r[u]) : +u < t && (d.state = Zn, d.timer.stop(), d.on.call("cancel", n, n.__data__, d.index, d.group), delete r[u]);
      }
    if (Ys(function() {
      e.state === Kn && (e.state = js, e.timer.restart(o, e.delay, e.time), o(l));
    }), e.state = wi, e.on.call("start", n, n.__data__, e.index, e.group), e.state === wi) {
      for (e.state = Kn, i = new Array(f = e.tween.length), u = 0, h = -1; u < f; ++u)
        (d = e.tween[u].value.call(n, n.__data__, e.index, e.group)) && (i[++h] = d);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var u = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(c), e.state = ki, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(n, u);
    e.state === ki && (e.on.call("end", n, n.__data__, e.index, e.group), c());
  }
  function c() {
    e.state = Zn, e.timer.stop(), delete r[t];
    for (var l in r) return;
    delete n.__transition;
  }
}
function Pf(n, t) {
  var e = n.__transition, r, i, s = !0, a;
  if (e) {
    t = t == null ? null : t + "";
    for (a in e) {
      if ((r = e[a]).name !== t) {
        s = !1;
        continue;
      }
      i = r.state > wi && r.state < ki, r.state = Zn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", n, n.__data__, r.index, r.group), delete e[a];
    }
    s && delete n.__transition;
  }
}
function zf(n) {
  return this.each(function() {
    Pf(this, n);
  });
}
function Rf(n, t) {
  var e, r;
  return function() {
    var i = Ht(this, n), s = i.tween;
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
function Of(n, t, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var s = Ht(this, n), a = s.tween;
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
function Nf(n, t) {
  var e = this._id;
  if (n += "", arguments.length < 2) {
    for (var r = Pt(this.node(), e).tween, i = 0, s = r.length, a; i < s; ++i)
      if ((a = r[i]).name === n)
        return a.value;
    return null;
  }
  return this.each((t == null ? Rf : Of)(e, n, t));
}
function Ji(n, t, e) {
  var r = n._id;
  return n.each(function() {
    var i = Ht(this, r);
    (i.value || (i.value = {}))[t] = e.apply(this, arguments);
  }), function(i) {
    return Pt(i, r).value[t];
  };
}
function _o(n, t) {
  var e;
  return (typeof t == "number" ? Et : t instanceof jt ? hr : (e = jt(t)) ? (t = e, hr) : co)(n, t);
}
function Df(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Ff(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function If(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttribute(n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function qf(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = this.getAttributeNS(n.space, n.local);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function Hf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttribute(n) : (a = this.getAttribute(n), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function Bf(n, t, e) {
  var r, i, s;
  return function() {
    var a, o = e(this), c;
    return o == null ? void this.removeAttributeNS(n.space, n.local) : (a = this.getAttributeNS(n.space, n.local), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o)));
  };
}
function Vf(n, t) {
  var e = Mr(n), r = e === "transform" ? kf : _o;
  return this.attrTween(n, typeof t == "function" ? (e.local ? Bf : Hf)(e, r, Ji(this, "attr." + n, t)) : t == null ? (e.local ? Ff : Df)(e) : (e.local ? qf : If)(e, r, t));
}
function Xf(n, t) {
  return function(e) {
    this.setAttribute(n, t.call(this, e));
  };
}
function Yf(n, t) {
  return function(e) {
    this.setAttributeNS(n.space, n.local, t.call(this, e));
  };
}
function Gf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && Yf(n, s)), e;
  }
  return i._value = t, i;
}
function jf(n, t) {
  var e, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (e = (r = s) && Xf(n, s)), e;
  }
  return i._value = t, i;
}
function Wf(n, t) {
  var e = "attr." + n;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  var r = Mr(n);
  return this.tween(e, (r.local ? Gf : jf)(r, t));
}
function Uf(n, t) {
  return function() {
    Qi(this, n).delay = +t.apply(this, arguments);
  };
}
function Kf(n, t) {
  return t = +t, function() {
    Qi(this, n).delay = t;
  };
}
function Zf(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? Uf : Kf)(t, n)) : Pt(this.node(), t).delay;
}
function Qf(n, t) {
  return function() {
    Ht(this, n).duration = +t.apply(this, arguments);
  };
}
function Jf(n, t) {
  return t = +t, function() {
    Ht(this, n).duration = t;
  };
}
function td(n) {
  var t = this._id;
  return arguments.length ? this.each((typeof n == "function" ? Qf : Jf)(t, n)) : Pt(this.node(), t).duration;
}
function ed(n, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ht(this, n).ease = t;
  };
}
function nd(n) {
  var t = this._id;
  return arguments.length ? this.each(ed(t, n)) : Pt(this.node(), t).ease;
}
function rd(n, t) {
  return function() {
    var e = t.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    Ht(this, n).ease = e;
  };
}
function id(n) {
  if (typeof n != "function") throw new Error();
  return this.each(rd(this._id, n));
}
function sd(n) {
  typeof n != "function" && (n = Ka(n));
  for (var t = this._groups, e = t.length, r = new Array(e), i = 0; i < e; ++i)
    for (var s = t[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && n.call(c, c.__data__, l, s) && o.push(c);
  return new Wt(r, this._parents, this._name, this._id);
}
function ad(n) {
  if (n._id !== this._id) throw new Error();
  for (var t = this._groups, e = n._groups, r = t.length, i = e.length, s = Math.min(r, i), a = new Array(r), o = 0; o < s; ++o)
    for (var c = t[o], l = e[o], u = c.length, h = a[o] = new Array(u), f, d = 0; d < u; ++d)
      (f = c[d] || l[d]) && (h[d] = f);
  for (; o < r; ++o)
    a[o] = t[o];
  return new Wt(a, this._parents, this._name, this._id);
}
function od(n) {
  return (n + "").trim().split(/^|\s+/).every(function(t) {
    var e = t.indexOf(".");
    return e >= 0 && (t = t.slice(0, e)), !t || t === "start";
  });
}
function ld(n, t, e) {
  var r, i, s = od(t) ? Qi : Ht;
  return function() {
    var a = s(this, n), o = a.on;
    o !== r && (i = (r = o).copy()).on(t, e), a.on = i;
  };
}
function cd(n, t) {
  var e = this._id;
  return arguments.length < 2 ? Pt(this.node(), e).on.on(n) : this.each(ld(e, n, t));
}
function ud(n) {
  return function() {
    var t = this.parentNode;
    for (var e in this.__transition) if (+e !== n) return;
    t && t.removeChild(this);
  };
}
function hd() {
  return this.on("end.remove", ud(this._id));
}
function fd(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Gi(n));
  for (var r = this._groups, i = r.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = r[a], c = o.length, l = s[a] = new Array(c), u, h, f = 0; f < c; ++f)
      (u = o[f]) && (h = n.call(u, u.__data__, f, o)) && ("__data__" in u && (h.__data__ = u.__data__), l[f] = h, Lr(l[f], t, e, f, l, Pt(u, e)));
  return new Wt(s, this._parents, t, e);
}
function dd(n) {
  var t = this._name, e = this._id;
  typeof n != "function" && (n = Ua(n));
  for (var r = this._groups, i = r.length, s = [], a = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, u, h = 0; h < l; ++h)
      if (u = c[h]) {
        for (var f = n.call(u, u.__data__, h, c), d, g = Pt(u, e), p = 0, _ = f.length; p < _; ++p)
          (d = f[p]) && Lr(d, t, e, p, f, g);
        s.push(f), a.push(u);
      }
  return new Wt(s, a, t, e);
}
var pd = En.prototype.constructor;
function gd() {
  return new pd(this._groups, this._parents);
}
function md(n, t) {
  var e, r, i;
  return function() {
    var s = qe(this, n), a = (this.style.removeProperty(n), qe(this, n));
    return s === a ? null : s === e && a === r ? i : i = t(e = s, r = a);
  };
}
function vo(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function _d(n, t, e) {
  var r, i = e + "", s;
  return function() {
    var a = qe(this, n);
    return a === i ? null : a === r ? s : s = t(r = a, e);
  };
}
function vd(n, t, e) {
  var r, i, s;
  return function() {
    var a = qe(this, n), o = e(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(n), qe(this, n))), a === c ? null : a === r && c === i ? s : (i = c, s = t(r = a, o));
  };
}
function xd(n, t) {
  var e, r, i, s = "style." + t, a = "end." + s, o;
  return function() {
    var c = Ht(this, n), l = c.on, u = c.value[s] == null ? o || (o = vo(t)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(a, i = u), c.on = r;
  };
}
function yd(n, t, e) {
  var r = (n += "") == "transform" ? wf : _o;
  return t == null ? this.styleTween(n, md(n, r)).on("end.style." + n, vo(n)) : typeof t == "function" ? this.styleTween(n, vd(n, r, Ji(this, "style." + n, t))).each(xd(this._id, n)) : this.styleTween(n, _d(n, r, t), e).on("end.style." + n, null);
}
function bd(n, t, e) {
  return function(r) {
    this.style.setProperty(n, t.call(this, r), e);
  };
}
function wd(n, t, e) {
  var r, i;
  function s() {
    var a = t.apply(this, arguments);
    return a !== i && (r = (i = a) && bd(n, a, e)), r;
  }
  return s._value = t, s;
}
function kd(n, t, e) {
  var r = "style." + (n += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, wd(n, t, e ?? ""));
}
function Ad(n) {
  return function() {
    this.textContent = n;
  };
}
function $d(n) {
  return function() {
    var t = n(this);
    this.textContent = t ?? "";
  };
}
function Cd(n) {
  return this.tween("text", typeof n == "function" ? $d(Ji(this, "text", n)) : Ad(n == null ? "" : n + ""));
}
function Sd(n) {
  return function(t) {
    this.textContent = n.call(this, t);
  };
}
function Td(n) {
  var t, e;
  function r() {
    var i = n.apply(this, arguments);
    return i !== e && (t = (e = i) && Sd(i)), t;
  }
  return r._value = n, r;
}
function Md(n) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (n == null) return this.tween(t, null);
  if (typeof n != "function") throw new Error();
  return this.tween(t, Td(n));
}
function Ed() {
  for (var n = this._name, t = this._id, e = xo(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      if (c = a[l]) {
        var u = Pt(c, t);
        Lr(c, n, e, l, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Wt(r, this._parents, n, e);
}
function Ld() {
  var n, t, e = this, r = e._id, i = e.size();
  return new Promise(function(s, a) {
    var o = { value: a }, c = { value: function() {
      --i === 0 && s();
    } };
    e.each(function() {
      var l = Ht(this, r), u = l.on;
      u !== n && (t = (n = u).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(c)), l.on = t;
    }), i === 0 && s();
  });
}
var Pd = 0;
function Wt(n, t, e, r) {
  this._groups = n, this._parents = t, this._name = e, this._id = r;
}
function xo() {
  return ++Pd;
}
var Vt = En.prototype;
Wt.prototype = {
  constructor: Wt,
  select: fd,
  selectAll: dd,
  selectChild: Vt.selectChild,
  selectChildren: Vt.selectChildren,
  filter: sd,
  merge: ad,
  selection: gd,
  transition: Ed,
  call: Vt.call,
  nodes: Vt.nodes,
  node: Vt.node,
  size: Vt.size,
  empty: Vt.empty,
  each: Vt.each,
  on: cd,
  attr: Vf,
  attrTween: Wf,
  style: yd,
  styleTween: kd,
  text: Cd,
  textTween: Md,
  remove: hd,
  tween: Nf,
  delay: Zf,
  duration: td,
  ease: nd,
  easeVarying: id,
  end: Ld,
  [Symbol.iterator]: Vt[Symbol.iterator]
};
function xn(n) {
  return n * (2 - n);
}
function zd(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var ts = 1.70158;
(function n(t) {
  t = +t;
  function e(r) {
    return (r = +r) * r * (t * (r - 1) + r);
  }
  return e.overshoot = n, e;
})(ts);
var Rd = (function n(t) {
  t = +t;
  function e(r) {
    return --r * r * ((r + 1) * t + r) + 1;
  }
  return e.overshoot = n, e;
})(ts);
(function n(t) {
  t = +t;
  function e(r) {
    return ((r *= 2) < 1 ? r * r * ((t + 1) * r - t) : (r -= 2) * r * ((t + 1) * r + t) + 2) / 2;
  }
  return e.overshoot = n, e;
})(ts);
var Od = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: zd
};
function Nd(n, t) {
  for (var e; !(e = n.__transition) || !(e = e[t]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${t} not found`);
  return e;
}
function Dd(n) {
  var t, e;
  n instanceof Wt ? (t = n._id, n = n._name) : (t = xo(), (e = Od).time = Zi(), n = n == null ? null : n + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && Lr(c, n, t, l, a, e || Nd(c, t));
  return new Wt(r, this._parents, n, t);
}
En.prototype.interrupt = zf;
En.prototype.transition = Dd;
const Ai = Math.PI, $i = 2 * Ai, de = 1e-6, Fd = $i - de;
function yo(n) {
  this._ += n[0];
  for (let t = 1, e = n.length; t < e; ++t)
    this._ += arguments[t] + n[t];
}
function Id(n) {
  let t = Math.floor(n);
  if (!(t >= 0)) throw new Error(`invalid digits: ${n}`);
  if (t > 15) return yo;
  const e = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
let qd = class {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? yo : Id(t);
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
    else if (f > de) if (!(Math.abs(h * c - l * u) > de) || !s)
      this._append`L${this._x1 = t},${this._y1 = e}`;
    else {
      let d = r - a, g = i - o, p = c * c + l * l, _ = d * d + g * g, x = Math.sqrt(p), b = Math.sqrt(f), v = s * Math.tan((Ai - Math.acos((p + f - _) / (2 * x * b))) / 2), m = v / b, w = v / x;
      Math.abs(m - 1) > de && this._append`L${t + m * u},${e + m * h}`, this._append`A${s},${s},0,0,${+(h * d > u * g)},${this._x1 = t + w * c},${this._y1 = e + w * l}`;
    }
  }
  arc(t, e, r, i, s, a) {
    if (t = +t, e = +e, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), l = t + o, u = e + c, h = 1 ^ a, f = a ? i - s : s - i;
    this._x1 === null ? this._append`M${l},${u}` : (Math.abs(this._x1 - l) > de || Math.abs(this._y1 - u) > de) && this._append`L${l},${u}`, r && (f < 0 && (f = f % $i + $i), f > Fd ? this._append`A${r},${r},0,1,${h},${t - o},${e - c}A${r},${r},0,1,${h},${this._x1 = l},${this._y1 = u}` : f > de && this._append`A${r},${r},0,${+(f >= Ai)},${h},${this._x1 = t + r * Math.cos(s)},${this._y1 = e + r * Math.sin(s)}`);
  }
  rect(t, e, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
};
function Hd(n) {
  return Math.abs(n = Math.round(n)) >= 1e21 ? n.toLocaleString("en").replace(/,/g, "") : n.toString(10);
}
function gr(n, t) {
  if (!isFinite(n) || n === 0) return null;
  var e = (n = t ? n.toExponential(t - 1) : n.toExponential()).indexOf("e"), r = n.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +n.slice(e + 1)
  ];
}
function Be(n) {
  return n = gr(Math.abs(n)), n ? n[1] : NaN;
}
function Bd(n, t) {
  return function(e, r) {
    for (var i = e.length, s = [], a = 0, o = n[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), s.push(e.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = n[a = (a + 1) % n.length];
    return s.reverse().join(t);
  };
}
function Vd(n) {
  return function(t) {
    return t.replace(/[0-9]/g, function(e) {
      return n[+e];
    });
  };
}
var Xd = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function mr(n) {
  if (!(t = Xd.exec(n))) throw new Error("invalid format: " + n);
  var t;
  return new es({
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
mr.prototype = es.prototype;
function es(n) {
  this.fill = n.fill === void 0 ? " " : n.fill + "", this.align = n.align === void 0 ? ">" : n.align + "", this.sign = n.sign === void 0 ? "-" : n.sign + "", this.symbol = n.symbol === void 0 ? "" : n.symbol + "", this.zero = !!n.zero, this.width = n.width === void 0 ? void 0 : +n.width, this.comma = !!n.comma, this.precision = n.precision === void 0 ? void 0 : +n.precision, this.trim = !!n.trim, this.type = n.type === void 0 ? "" : n.type + "";
}
es.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Yd(n) {
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
var _r;
function Gd(n, t) {
  var e = gr(n, t);
  if (!e) return _r = void 0, n.toPrecision(t);
  var r = e[0], i = e[1], s = i - (_r = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return s === a ? r : s > a ? r + new Array(s - a + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + gr(n, Math.max(0, t + s - 1))[0];
}
function Ws(n, t) {
  var e = gr(n, t);
  if (!e) return n + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Us = {
  "%": (n, t) => (n * 100).toFixed(t),
  b: (n) => Math.round(n).toString(2),
  c: (n) => n + "",
  d: Hd,
  e: (n, t) => n.toExponential(t),
  f: (n, t) => n.toFixed(t),
  g: (n, t) => n.toPrecision(t),
  o: (n) => Math.round(n).toString(8),
  p: (n, t) => Ws(n * 100, t),
  r: Ws,
  s: Gd,
  X: (n) => Math.round(n).toString(16).toUpperCase(),
  x: (n) => Math.round(n).toString(16)
};
function Ks(n) {
  return n;
}
var Zs = Array.prototype.map, Qs = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function jd(n) {
  var t = n.grouping === void 0 || n.thousands === void 0 ? Ks : Bd(Zs.call(n.grouping, Number), n.thousands + ""), e = n.currency === void 0 ? "" : n.currency[0] + "", r = n.currency === void 0 ? "" : n.currency[1] + "", i = n.decimal === void 0 ? "." : n.decimal + "", s = n.numerals === void 0 ? Ks : Vd(Zs.call(n.numerals, String)), a = n.percent === void 0 ? "%" : n.percent + "", o = n.minus === void 0 ? "−" : n.minus + "", c = n.nan === void 0 ? "NaN" : n.nan + "";
  function l(h, f) {
    h = mr(h);
    var d = h.fill, g = h.align, p = h.sign, _ = h.symbol, x = h.zero, b = h.width, v = h.comma, m = h.precision, w = h.trim, C = h.type;
    C === "n" ? (v = !0, C = "g") : Us[C] || (m === void 0 && (m = 12), w = !0, C = "g"), (x || d === "0" && g === "=") && (x = !0, d = "0", g = "=");
    var k = (f && f.prefix !== void 0 ? f.prefix : "") + (_ === "$" ? e : _ === "#" && /[boxX]/.test(C) ? "0" + C.toLowerCase() : ""), $ = (_ === "$" ? r : /[%p]/.test(C) ? a : "") + (f && f.suffix !== void 0 ? f.suffix : ""), y = Us[C], S = /[defgprs%]/.test(C);
    m = m === void 0 ? 6 : /[gprs]/.test(C) ? Math.max(1, Math.min(21, m)) : Math.max(0, Math.min(20, m));
    function M(T) {
      var E = k, z = $, A, L, P;
      if (C === "c")
        z = y(T) + z, T = "";
      else {
        T = +T;
        var O = T < 0 || 1 / T < 0;
        if (T = isNaN(T) ? c : y(Math.abs(T), m), w && (T = Yd(T)), O && +T == 0 && p !== "+" && (O = !1), E = (O ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + E, z = (C === "s" && !isNaN(T) && _r !== void 0 ? Qs[8 + _r / 3] : "") + z + (O && p === "(" ? ")" : ""), S) {
          for (A = -1, L = T.length; ++A < L; )
            if (P = T.charCodeAt(A), 48 > P || P > 57) {
              z = (P === 46 ? i + T.slice(A + 1) : T.slice(A)) + z, T = T.slice(0, A);
              break;
            }
        }
      }
      v && !x && (T = t(T, 1 / 0));
      var R = E.length + T.length + z.length, N = R < b ? new Array(b - R + 1).join(d) : "";
      switch (v && x && (T = t(N + T, N.length ? b - z.length : 1 / 0), N = ""), g) {
        case "<":
          T = E + T + z + N;
          break;
        case "=":
          T = E + N + T + z;
          break;
        case "^":
          T = N.slice(0, R = N.length >> 1) + E + T + z + N.slice(R);
          break;
        default:
          T = N + E + T + z;
          break;
      }
      return s(T);
    }
    return M.toString = function() {
      return h + "";
    }, M;
  }
  function u(h, f) {
    var d = Math.max(-8, Math.min(8, Math.floor(Be(f) / 3))) * 3, g = Math.pow(10, -d), p = l((h = mr(h), h.type = "f", h), { suffix: Qs[8 + d / 3] });
    return function(_) {
      return p(g * _);
    };
  }
  return {
    format: l,
    formatPrefix: u
  };
}
var qn, bo, wo;
Wd({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Wd(n) {
  return qn = jd(n), bo = qn.format, wo = qn.formatPrefix, qn;
}
function Ud(n) {
  return Math.max(0, -Be(Math.abs(n)));
}
function Kd(n, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Be(t) / 3))) * 3 - Be(Math.abs(n)));
}
function Zd(n, t) {
  return n = Math.abs(n), t = Math.abs(t) - n, Math.max(0, Be(t) - Be(n)) + 1;
}
function Qd(n) {
  var t = 0, e = n.children, r = e && e.length;
  if (!r) t = 1;
  else for (; --r >= 0; ) t += e[r].value;
  n.value = t;
}
function Jd() {
  return this.eachAfter(Qd);
}
function tp(n, t) {
  let e = -1;
  for (const r of this)
    n.call(t, r, ++e, this);
  return this;
}
function ep(n, t) {
  for (var e = this, r = [e], i, s, a = -1; e = r.pop(); )
    if (n.call(t, e, ++a, this), i = e.children)
      for (s = i.length - 1; s >= 0; --s)
        r.push(i[s]);
  return this;
}
function np(n, t) {
  for (var e = this, r = [e], i = [], s, a, o, c = -1; e = r.pop(); )
    if (i.push(e), s = e.children)
      for (a = 0, o = s.length; a < o; ++a)
        r.push(s[a]);
  for (; e = i.pop(); )
    n.call(t, e, ++c, this);
  return this;
}
function rp(n, t) {
  let e = -1;
  for (const r of this)
    if (n.call(t, r, ++e, this))
      return r;
}
function ip(n) {
  return this.eachAfter(function(t) {
    for (var e = +n(t.data) || 0, r = t.children, i = r && r.length; --i >= 0; ) e += r[i].value;
    t.value = e;
  });
}
function sp(n) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(n);
  });
}
function ap(n) {
  for (var t = this, e = op(t, n), r = [t]; t !== e; )
    t = t.parent, r.push(t);
  for (var i = r.length; n !== e; )
    r.splice(i, 0, n), n = n.parent;
  return r;
}
function op(n, t) {
  if (n === t) return n;
  var e = n.ancestors(), r = t.ancestors(), i = null;
  for (n = e.pop(), t = r.pop(); n === t; )
    i = n, n = e.pop(), t = r.pop();
  return i;
}
function lp() {
  for (var n = this, t = [n]; n = n.parent; )
    t.push(n);
  return t;
}
function cp() {
  return Array.from(this);
}
function up() {
  var n = [];
  return this.eachBefore(function(t) {
    t.children || n.push(t);
  }), n;
}
function hp() {
  var n = this, t = [];
  return n.each(function(e) {
    e !== n && t.push({ source: e.parent, target: e });
  }), t;
}
function* fp() {
  var n = this, t, e = [n], r, i, s;
  do
    for (t = e.reverse(), e = []; n = t.pop(); )
      if (yield n, r = n.children)
        for (i = 0, s = r.length; i < s; ++i)
          e.push(r[i]);
  while (e.length);
}
function vr(n, t) {
  n instanceof Map ? (n = [void 0, n], t === void 0 && (t = gp)) : t === void 0 && (t = pp);
  for (var e = new yn(n), r, i = [e], s, a, o, c; r = i.pop(); )
    if ((a = t(r.data)) && (c = (a = Array.from(a)).length))
      for (r.children = a, o = c - 1; o >= 0; --o)
        i.push(s = a[o] = new yn(a[o])), s.parent = r, s.depth = r.depth + 1;
  return e.eachBefore(_p);
}
function dp() {
  return vr(this).eachBefore(mp);
}
function pp(n) {
  return n.children;
}
function gp(n) {
  return Array.isArray(n) ? n[1] : null;
}
function mp(n) {
  n.data.value !== void 0 && (n.value = n.data.value), n.data = n.data.data;
}
function _p(n) {
  var t = 0;
  do
    n.height = t;
  while ((n = n.parent) && n.height < ++t);
}
function yn(n) {
  this.data = n, this.depth = this.height = 0, this.parent = null;
}
yn.prototype = vr.prototype = {
  constructor: yn,
  count: Jd,
  each: tp,
  eachAfter: np,
  eachBefore: ep,
  find: rp,
  sum: ip,
  sort: sp,
  path: ap,
  ancestors: lp,
  descendants: cp,
  leaves: up,
  links: hp,
  copy: dp,
  [Symbol.iterator]: fp
};
function vp(n, t) {
  return n.parent === t.parent ? 1 : 2;
}
function Gr(n) {
  var t = n.children;
  return t ? t[0] : n.t;
}
function jr(n) {
  var t = n.children;
  return t ? t[t.length - 1] : n.t;
}
function xp(n, t, e) {
  var r = e / (t.i - n.i);
  t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e;
}
function yp(n) {
  for (var t = 0, e = 0, r = n.children, i = r.length, s; --i >= 0; )
    s = r[i], s.z += t, s.m += t, t += s.s + (e += s.c);
}
function bp(n, t, e) {
  return n.a.parent === t.parent ? n.a : e;
}
function Qn(n, t) {
  this._ = n, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
Qn.prototype = Object.create(yn.prototype);
function wp(n) {
  for (var t = new Qn(n, 0), e, r = [t], i, s, a, o; e = r.pop(); )
    if (s = e._.children)
      for (e.children = new Array(o = s.length), a = o - 1; a >= 0; --a)
        r.push(i = e.children[a] = new Qn(s[a], a)), i.parent = e;
  return (t.parent = new Qn(null, 0)).children = [t], t;
}
function kp() {
  var n = vp, t = 1, e = 1, r = null;
  function i(l) {
    var u = wp(l);
    if (u.eachAfter(s), u.parent.m = -u.z, u.eachBefore(a), r) l.eachBefore(c);
    else {
      var h = l, f = l, d = l;
      l.eachBefore(function(b) {
        b.x < h.x && (h = b), b.x > f.x && (f = b), b.depth > d.depth && (d = b);
      });
      var g = h === f ? 1 : n(h, f) / 2, p = g - h.x, _ = t / (f.x + g + p), x = e / (d.depth || 1);
      l.eachBefore(function(b) {
        b.x = (b.x + p) * _, b.y = b.depth * x;
      });
    }
    return l;
  }
  function s(l) {
    var u = l.children, h = l.parent.children, f = l.i ? h[l.i - 1] : null;
    if (u) {
      yp(l);
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
      for (var f = l, d = l, g = u, p = f.parent.children[0], _ = f.m, x = d.m, b = g.m, v = p.m, m; g = jr(g), f = Gr(f), g && f; )
        p = Gr(p), d = jr(d), d.a = l, m = g.z + b - f.z - _ + n(g._, f._), m > 0 && (xp(bp(g, l, h), l, m), _ += m, x += m), b += g.m, _ += f.m, v += p.m, x += d.m;
      g && !jr(d) && (d.t = g, d.m += b - x), f && !Gr(p) && (p.t = f, p.m += _ - v, h = l);
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
function Ap(n, t) {
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
function ko(n, t) {
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
function $p(n) {
  return function() {
    return n;
  };
}
function Cp(n) {
  return +n;
}
var Js = [0, 1];
function Nt(n) {
  return n;
}
function Ci(n, t) {
  return (t -= n = +n) ? function(e) {
    return (e - n) / t;
  } : $p(isNaN(t) ? NaN : 0.5);
}
function Sp(n, t) {
  var e;
  return n > t && (e = n, n = t, t = e), function(r) {
    return Math.max(n, Math.min(t, r));
  };
}
function Tp(n, t, e) {
  var r = n[0], i = n[1], s = t[0], a = t[1];
  return i < r ? (r = Ci(i, r), s = e(a, s)) : (r = Ci(r, i), s = e(s, a)), function(o) {
    return s(r(o));
  };
}
function Mp(n, t, e) {
  var r = Math.min(n.length, t.length) - 1, i = new Array(r), s = new Array(r), a = -1;
  for (n[r] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a < r; )
    i[a] = Ci(n[a], n[a + 1]), s[a] = e(t[a], t[a + 1]);
  return function(o) {
    var c = Xc(n, o, 1, r) - 1;
    return s[c](i[c](o));
  };
}
function Ep(n, t) {
  return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown());
}
function Lp() {
  var n = Js, t = Js, e = $e, r, i, s, a = Nt, o, c, l;
  function u() {
    var f = Math.min(n.length, t.length);
    return a !== Nt && (a = Sp(n[0], n[f - 1])), o = f > 2 ? Mp : Tp, c = l = null, h;
  }
  function h(f) {
    return f == null || isNaN(f = +f) ? s : (c || (c = o(n.map(r), t, e)))(r(a(f)));
  }
  return h.invert = function(f) {
    return a(i((l || (l = o(t, n.map(r), Et)))(f)));
  }, h.domain = function(f) {
    return arguments.length ? (n = Array.from(f, Cp), u()) : n.slice();
  }, h.range = function(f) {
    return arguments.length ? (t = Array.from(f), u()) : t.slice();
  }, h.rangeRound = function(f) {
    return t = Array.from(f), e = Ki, u();
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
function Pp() {
  return Lp()(Nt, Nt);
}
function zp(n, t, e, r) {
  var i = Uc(n, t, e), s;
  switch (r = mr(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(n), Math.abs(t));
      return r.precision == null && !isNaN(s = Kd(i, a)) && (r.precision = s), wo(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Zd(i, Math.max(Math.abs(n), Math.abs(t)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Ud(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return bo(r);
}
function ns(n) {
  var t = n.domain;
  return n.ticks = function(e) {
    var r = t();
    return Wc(r[0], r[r.length - 1], e ?? 10);
  }, n.tickFormat = function(e, r) {
    var i = t();
    return zp(i[0], i[i.length - 1], e ?? 10, r);
  }, n.nice = function(e) {
    e == null && (e = 10);
    var r = t(), i = 0, s = r.length - 1, a = r[i], o = r[s], c, l, u = 10;
    for (o < a && (l = a, a = o, o = l, l = i, i = s, s = l); u-- > 0; ) {
      if (l = pi(a, o, e), l === c)
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
function It() {
  var n = Pp();
  return n.copy = function() {
    return Ep(n, It());
  }, Ap.apply(n, arguments), ns(n);
}
function Rp() {
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
      var d, g;
      return arguments.length ? ([d, g] = f, a = h(d, g), l) : [a(0), a(1)];
    };
  }
  return l.range = u($e), l.rangeRound = u(Ki), l.unknown = function(h) {
    return arguments.length ? (c = h, l) : c;
  }, function(h) {
    return s = h, e = h(n), r = h(t), i = e === r ? 0 : 1 / (r - e), l;
  };
}
function Ao(n, t) {
  return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown());
}
function rs() {
  var n = ns(Rp()(Nt));
  return n.copy = function() {
    return Ao(n, rs());
  }, ko.apply(n, arguments);
}
function Op() {
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
  function g(p) {
    return function(_) {
      var x, b, v;
      return arguments.length ? ([x, b, v] = _, l = Af(p, [x, b, v]), d) : [l(0), l(0.5), l(1)];
    };
  }
  return d.range = g($e), d.rangeRound = g(Ki), d.unknown = function(p) {
    return arguments.length ? (f = p, d) : f;
  }, function(p) {
    return u = p, i = p(n), s = p(t), a = p(e), o = i === s ? 0 : 0.5 / (s - i), c = s === a ? 0 : 0.5 / (a - s), r = s < i ? -1 : 1, d;
  };
}
function $o() {
  var n = ns(Op()(Nt));
  return n.copy = function() {
    return Ao(n, $o());
  }, ko.apply(n, arguments);
}
function Co(n) {
  for (var t = n.length / 6 | 0, e = new Array(t), r = 0; r < t; ) e[r] = "#" + n.slice(r * 6, ++r * 6);
  return e;
}
const So = (n) => ff(n[n.length - 1]);
var Np = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(Co);
const Dp = So(Np);
var Fp = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(Co);
const To = So(Fp);
function q(n) {
  return function() {
    return n;
  };
}
const ta = Math.abs, rt = Math.atan2, ce = Math.cos, Ip = Math.max, Wr = Math.min, zt = Math.sin, Le = Math.sqrt, ut = 1e-12, bn = Math.PI, xr = bn / 2, Jn = 2 * bn;
function qp(n) {
  return n > 1 ? 0 : n < -1 ? bn : Math.acos(n);
}
function ea(n) {
  return n >= 1 ? xr : n <= -1 ? -xr : Math.asin(n);
}
function Pr(n) {
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
  }, () => new qd(t);
}
function Hp(n) {
  return n.innerRadius;
}
function Bp(n) {
  return n.outerRadius;
}
function Vp(n) {
  return n.startAngle;
}
function Xp(n) {
  return n.endAngle;
}
function Yp(n) {
  return n && n.padAngle;
}
function Gp(n, t, e, r, i, s, a, o) {
  var c = e - n, l = r - t, u = a - i, h = o - s, f = h * c - u * l;
  if (!(f * f < ut))
    return f = (u * (t - s) - h * (n - i)) / f, [n + f * c, t + f * l];
}
function Hn(n, t, e, r, i, s, a) {
  var o = n - e, c = t - r, l = (a ? s : -s) / Le(o * o + c * c), u = l * c, h = -l * o, f = n + u, d = t + h, g = e + u, p = r + h, _ = (f + g) / 2, x = (d + p) / 2, b = g - f, v = p - d, m = b * b + v * v, w = i - s, C = f * p - g * d, k = (v < 0 ? -1 : 1) * Le(Ip(0, w * w * m - C * C)), $ = (C * v - b * k) / m, y = (-C * b - v * k) / m, S = (C * v + b * k) / m, M = (-C * b + v * k) / m, T = $ - _, E = y - x, z = S - _, A = M - x;
  return T * T + E * E > z * z + A * A && ($ = S, y = M), {
    cx: $,
    cy: y,
    x01: -u,
    y01: -h,
    x11: $ * (i / w - 1),
    y11: y * (i / w - 1)
  };
}
function na() {
  var n = Hp, t = Bp, e = q(0), r = null, i = Vp, s = Xp, a = Yp, o = null, c = Pr(l);
  function l() {
    var u, h, f = +n.apply(this, arguments), d = +t.apply(this, arguments), g = i.apply(this, arguments) - xr, p = s.apply(this, arguments) - xr, _ = ta(p - g), x = p > g;
    if (o || (o = u = c()), d < f && (h = d, d = f, f = h), !(d > ut)) o.moveTo(0, 0);
    else if (_ > Jn - ut)
      o.moveTo(d * ce(g), d * zt(g)), o.arc(0, 0, d, g, p, !x), f > ut && (o.moveTo(f * ce(p), f * zt(p)), o.arc(0, 0, f, p, g, x));
    else {
      var b = g, v = p, m = g, w = p, C = _, k = _, $ = a.apply(this, arguments) / 2, y = $ > ut && (r ? +r.apply(this, arguments) : Le(f * f + d * d)), S = Wr(ta(d - f) / 2, +e.apply(this, arguments)), M = S, T = S, E, z;
      if (y > ut) {
        var A = ea(y / f * zt($)), L = ea(y / d * zt($));
        (C -= A * 2) > ut ? (A *= x ? 1 : -1, m += A, w -= A) : (C = 0, m = w = (g + p) / 2), (k -= L * 2) > ut ? (L *= x ? 1 : -1, b += L, v -= L) : (k = 0, b = v = (g + p) / 2);
      }
      var P = d * ce(b), O = d * zt(b), R = f * ce(w), N = f * zt(w);
      if (S > ut) {
        var F = d * ce(v), K = d * zt(v), ct = f * ce(m), J = f * zt(m), Y;
        if (_ < bn)
          if (Y = Gp(P, O, ct, J, F, K, R, N)) {
            var le = P - Y[0], Bt = O - Y[1], Dr = F - Y[0], Fr = K - Y[1], $s = 1 / zt(qp((le * Dr + Bt * Fr) / (Le(le * le + Bt * Bt) * Le(Dr * Dr + Fr * Fr))) / 2), Cs = Le(Y[0] * Y[0] + Y[1] * Y[1]);
            M = Wr(S, (f - Cs) / ($s - 1)), T = Wr(S, (d - Cs) / ($s + 1));
          } else
            M = T = 0;
      }
      k > ut ? T > ut ? (E = Hn(ct, J, P, O, d, T, x), z = Hn(F, K, R, N, d, T, x), o.moveTo(E.cx + E.x01, E.cy + E.y01), T < S ? o.arc(E.cx, E.cy, T, rt(E.y01, E.x01), rt(z.y01, z.x01), !x) : (o.arc(E.cx, E.cy, T, rt(E.y01, E.x01), rt(E.y11, E.x11), !x), o.arc(0, 0, d, rt(E.cy + E.y11, E.cx + E.x11), rt(z.cy + z.y11, z.cx + z.x11), !x), o.arc(z.cx, z.cy, T, rt(z.y11, z.x11), rt(z.y01, z.x01), !x))) : (o.moveTo(P, O), o.arc(0, 0, d, b, v, !x)) : o.moveTo(P, O), !(f > ut) || !(C > ut) ? o.lineTo(R, N) : M > ut ? (E = Hn(R, N, F, K, f, -M, x), z = Hn(P, O, ct, J, f, -M, x), o.lineTo(E.cx + E.x01, E.cy + E.y01), M < S ? o.arc(E.cx, E.cy, M, rt(E.y01, E.x01), rt(z.y01, z.x01), !x) : (o.arc(E.cx, E.cy, M, rt(E.y01, E.x01), rt(E.y11, E.x11), !x), o.arc(0, 0, f, rt(E.cy + E.y11, E.cx + E.x11), rt(z.cy + z.y11, z.cx + z.x11), x), o.arc(z.cx, z.cy, M, rt(z.y11, z.x11), rt(z.y01, z.x01), !x))) : o.arc(0, 0, f, w, m, x);
    }
    if (o.closePath(), u) return o = null, u + "" || null;
  }
  return l.centroid = function() {
    var u = (+n.apply(this, arguments) + +t.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - bn / 2;
    return [ce(h) * u, zt(h) * u];
  }, l.innerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : q(+u), l) : n;
  }, l.outerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : q(+u), l) : t;
  }, l.cornerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : q(+u), l) : e;
  }, l.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : q(+u), l) : r;
  }, l.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : q(+u), l) : i;
  }, l.endAngle = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : q(+u), l) : s;
  }, l.padAngle = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : q(+u), l) : a;
  }, l.context = function(u) {
    return arguments.length ? (o = u ?? null, l) : o;
  }, l;
}
var jp = Array.prototype.slice;
function is(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function Mo(n) {
  this._context = n;
}
Mo.prototype = {
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
function Eo(n) {
  return new Mo(n);
}
function ss(n) {
  return n[0];
}
function as(n) {
  return n[1];
}
function zr(n, t) {
  var e = q(!0), r = null, i = Eo, s = null, a = Pr(o);
  n = typeof n == "function" ? n : n === void 0 ? ss : q(n), t = typeof t == "function" ? t : t === void 0 ? as : q(t);
  function o(c) {
    var l, u = (c = is(c)).length, h, f = !1, d;
    for (r == null && (s = i(d = a())), l = 0; l <= u; ++l)
      !(l < u && e(h = c[l], l, c)) === f && ((f = !f) ? s.lineStart() : s.lineEnd()), f && s.point(+n(h, l, c), +t(h, l, c));
    if (d) return s = null, d + "" || null;
  }
  return o.x = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : q(+c), o) : n;
  }, o.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : q(+c), o) : t;
  }, o.defined = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : q(!!c), o) : e;
  }, o.curve = function(c) {
    return arguments.length ? (i = c, r != null && (s = i(r)), o) : i;
  }, o.context = function(c) {
    return arguments.length ? (c == null ? r = s = null : s = i(r = c), o) : r;
  }, o;
}
function Wp(n, t, e) {
  var r = null, i = q(!0), s = null, a = Eo, o = null, c = Pr(l);
  n = typeof n == "function" ? n : n === void 0 ? ss : q(+n), t = typeof t == "function" ? t : q(t === void 0 ? 0 : +t), e = typeof e == "function" ? e : e === void 0 ? as : q(+e);
  function l(h) {
    var f, d, g, p = (h = is(h)).length, _, x = !1, b, v = new Array(p), m = new Array(p);
    for (s == null && (o = a(b = c())), f = 0; f <= p; ++f) {
      if (!(f < p && i(_ = h[f], f, h)) === x)
        if (x = !x)
          d = f, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), g = f - 1; g >= d; --g)
            o.point(v[g], m[g]);
          o.lineEnd(), o.areaEnd();
        }
      x && (v[f] = +n(_, f, h), m[f] = +t(_, f, h), o.point(r ? +r(_, f, h) : v[f], e ? +e(_, f, h) : m[f]));
    }
    if (b) return o = null, b + "" || null;
  }
  function u() {
    return zr().defined(i).curve(a).context(s);
  }
  return l.x = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : q(+h), r = null, l) : n;
  }, l.x0 = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : q(+h), l) : n;
  }, l.x1 = function(h) {
    return arguments.length ? (r = h == null ? null : typeof h == "function" ? h : q(+h), l) : r;
  }, l.y = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : q(+h), e = null, l) : t;
  }, l.y0 = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : q(+h), l) : t;
  }, l.y1 = function(h) {
    return arguments.length ? (e = h == null ? null : typeof h == "function" ? h : q(+h), l) : e;
  }, l.lineX0 = l.lineY0 = function() {
    return u().x(n).y(t);
  }, l.lineY1 = function() {
    return u().x(n).y(e);
  }, l.lineX1 = function() {
    return u().x(r).y(t);
  }, l.defined = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : q(!!h), l) : i;
  }, l.curve = function(h) {
    return arguments.length ? (a = h, s != null && (o = a(s)), l) : a;
  }, l.context = function(h) {
    return arguments.length ? (h == null ? s = o = null : o = a(s = h), l) : s;
  }, l;
}
function Up(n, t) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Kp(n) {
  return n;
}
function Zp() {
  var n = Kp, t = Up, e = null, r = q(0), i = q(Jn), s = q(0);
  function a(o) {
    var c, l = (o = is(o)).length, u, h, f = 0, d = new Array(l), g = new Array(l), p = +r.apply(this, arguments), _ = Math.min(Jn, Math.max(-Jn, i.apply(this, arguments) - p)), x, b = Math.min(Math.abs(_) / l, s.apply(this, arguments)), v = b * (_ < 0 ? -1 : 1), m;
    for (c = 0; c < l; ++c)
      (m = g[d[c] = c] = +n(o[c], c, o)) > 0 && (f += m);
    for (t != null ? d.sort(function(w, C) {
      return t(g[w], g[C]);
    }) : e != null && d.sort(function(w, C) {
      return e(o[w], o[C]);
    }), c = 0, h = f ? (_ - l * v) / f : 0; c < l; ++c, p = x)
      u = d[c], m = g[u], x = p + (m > 0 ? m * h : 0) + v, g[u] = {
        data: o[u],
        index: c,
        value: m,
        startAngle: p,
        endAngle: x,
        padAngle: b
      };
    return g;
  }
  return a.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : q(+o), a) : n;
  }, a.sortValues = function(o) {
    return arguments.length ? (t = o, e = null, a) : t;
  }, a.sort = function(o) {
    return arguments.length ? (e = o, t = null, a) : e;
  }, a.startAngle = function(o) {
    return arguments.length ? (r = typeof o == "function" ? o : q(+o), a) : r;
  }, a.endAngle = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : q(+o), a) : i;
  }, a.padAngle = function(o) {
    return arguments.length ? (s = typeof o == "function" ? o : q(+o), a) : s;
  }, a;
}
class Lo {
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
function Qp(n) {
  return new Lo(n, !0);
}
function Jp(n) {
  return new Lo(n, !1);
}
function t0(n) {
  return n.source;
}
function e0(n) {
  return n.target;
}
function Po(n) {
  let t = t0, e = e0, r = ss, i = as, s = null, a = null, o = Pr(c);
  function c() {
    let l;
    const u = jp.call(arguments), h = t.apply(this, u), f = e.apply(this, u);
    if (s == null && (a = n(l = o())), a.lineStart(), u[0] = h, a.point(+r.apply(this, u), +i.apply(this, u)), u[0] = f, a.point(+r.apply(this, u), +i.apply(this, u)), a.lineEnd(), l) return a = null, l + "" || null;
  }
  return c.source = function(l) {
    return arguments.length ? (t = l, c) : t;
  }, c.target = function(l) {
    return arguments.length ? (e = l, c) : e;
  }, c.x = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : q(+l), c) : r;
  }, c.y = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : q(+l), c) : i;
  }, c.context = function(l) {
    return arguments.length ? (l == null ? s = a = null : a = n(s = l), c) : s;
  }, c;
}
function n0() {
  return Po(Qp);
}
function r0() {
  return Po(Jp);
}
function ra(n) {
  return n < 0 ? -1 : 1;
}
function ia(n, t, e) {
  var r = n._x1 - n._x0, i = t - n._x1, s = (n._y1 - n._y0) / (r || i < 0 && -0), a = (e - n._y1) / (i || r < 0 && -0), o = (s * i + a * r) / (r + i);
  return (ra(s) + ra(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function sa(n, t) {
  var e = n._x1 - n._x0;
  return e ? (3 * (n._y1 - n._y0) / e - t) / 2 : t;
}
function Ur(n, t, e) {
  var r = n._x0, i = n._y0, s = n._x1, a = n._y1, o = (s - r) / 3;
  n._context.bezierCurveTo(r + o, i + o * t, s - o, a - o * e, s, a);
}
function yr(n) {
  this._context = n;
}
yr.prototype = {
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
        Ur(this, this._t0, sa(this, this._t0));
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
          this._point = 3, Ur(this, sa(this, e = ia(this, n, t)), e);
          break;
        default:
          Ur(this, this._t0, e = ia(this, n, t));
          break;
      }
      this._x0 = this._x1, this._x1 = n, this._y0 = this._y1, this._y1 = t, this._t0 = e;
    }
  }
};
Object.create(yr.prototype).point = function(n, t) {
  yr.prototype.point.call(this, t, n);
};
function zo(n) {
  return new yr(n);
}
function ln(n, t, e) {
  this.k = n, this.x = t, this.y = e;
}
ln.prototype = {
  constructor: ln,
  scale: function(n) {
    return n === 1 ? this : new ln(this.k * n, this.x, this.y);
  },
  translate: function(n, t) {
    return n === 0 & t === 0 ? this : new ln(this.k, this.x + this.k * n, this.y + this.k * t);
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
ln.prototype;
const i0 = (
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
class s0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_svg", null);
    D(this, "_animated", !0);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["labels", "values", "scale", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(i0), this._animated = this.getAttribute("animated") !== "false", this._buildChart();
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
    var b;
    const e = this.jsonAttr("labels", []), r = this.jsonAttr("values", []), i = this.getAttribute("scale") || "diverging";
    if (!e.length || !r.length) {
      this.render("<svg></svg>");
      return;
    }
    const s = e.length, a = 3, o = 60, c = 110, l = 56, u = s * l + (s - 1) * a, h = u + c, f = u + o, d = i === "sequential" ? rs(To).domain([0, 1]) : $o(Dp).domain([-1, 0, 1]), g = this.isRtl;
    let p = "";
    for (let v = 0; v < s; v++) {
      const m = c + v * (l + a) + l / 2, w = o / 2;
      p += `<text class="header-text" x="${g ? h - m : m}" y="${w}">${this._escapeHtml(e[v])}</text>`;
    }
    for (let v = 0; v < s; v++) {
      const m = o + v * (l + a) + l / 2, w = g ? h - c / 2 : c / 2;
      p += `<text class="header-text" x="${w}" y="${m}">${this._escapeHtml(e[v])}</text>`;
    }
    for (let v = 0; v < s; v++)
      for (let m = 0; m < s; m++) {
        const w = ((b = r[v]) == null ? void 0 : b[m]) ?? 0, C = d(w), k = this._contrastColor(C), $ = (v + m) * 40;
        let y = c + m * (l + a);
        g && (y = h - y - l);
        const S = o + v * (l + a), M = y + l / 2, T = S + l / 2;
        p += `<g class="cell" data-delay="${$}" data-value="${w.toFixed(2)}" style="transform-origin: ${M}px ${T}px; opacity: 0; transform: scale(0.5);">`, p += `<rect x="${y}" y="${S}" width="${l}" height="${l}" rx="6" ry="6" fill="${C}"/>`, p += `<text class="cell-text" x="${M}" y="${T}" fill="${k}">${w.toFixed(2)}</text>`, p += "</g>";
      }
    const _ = `
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;
    this.render(_), this._svg = this.root.querySelector("svg");
    const x = this.root.querySelector(".tooltip");
    this._svg && x && this._svg.querySelectorAll(".cell").forEach((v) => {
      v.addEventListener("mouseenter", (m) => {
        const C = m.currentTarget.dataset.value || "";
        x.textContent = C, x.style.opacity = "1";
      }), v.addEventListener("mousemove", (m) => {
        const w = m, C = this.root.querySelector("div").getBoundingClientRect();
        x.style.left = `${w.clientX - C.left + 10}px`, x.style.top = `${w.clientY - C.top - 28}px`;
      }), v.addEventListener("mouseleave", () => {
        x.style.opacity = "0";
      });
    });
  }
  _contrastColor(e) {
    const r = jt(e);
    if (!r) return "#000";
    const i = r.rgb();
    return (0.299 * i.r + 0.587 * i.g + 0.114 * i.b) / 255 > 0.5 ? "#000" : "#fff";
  }
  _escapeHtml(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-heatmap", s0);
const a0 = `
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
`, Ve = { top: 20, right: 30, bottom: 40, left: 60 }, Ro = 500, Oo = 250, ue = Ro - Ve.left - Ve.right, Xt = Oo - Ve.top - Ve.bottom;
class o0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_resizeObs", null);
    D(this, "_svg", null);
    D(this, "_built", !1);
  }
  static get observedAttributes() {
    return ["data", "area", "points", "tooltip", "color", "x-label", "y-label", "animated"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(a0), this.root.innerHTML = "<svg></svg>", this._buildChart(), this._resizeObs = new ResizeObserver(() => {
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
    tt(r).selectAll("*").remove();
    const u = tt(r).attr("viewBox", `0 0 ${Ro} ${Oo}`).attr("preserveAspectRatio", "xMidYMid meet");
    this._svg = u;
    const h = u.append("defs"), f = `lv-area-grad-${Math.random().toString(36).slice(2, 8)}`, d = h.append("linearGradient").attr("id", f).attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");
    d.append("stop").attr("offset", "0%").attr("stop-color", i).attr("stop-opacity", 0.25), d.append("stop").attr("offset", "100%").attr("stop-color", i).attr("stop-opacity", 0);
    const g = u.append("g").attr("transform", `translate(${Ve.left},${Ve.top})`), p = rr(e, ($) => $.x), _ = rr(e, ($) => $.y), x = (_[1] - _[0]) * 0.1 || 1, b = It().domain(p).range([0, ue]), v = It().domain([_[0] - x, _[1] + x]).range([Xt, 0]);
    if (g.append("g").attr("class", "grid").attr("transform", `translate(0,${Xt})`).call(
      sr(b).tickSize(-Xt).tickFormat(() => "")
    ), g.append("g").attr("class", "grid").call(
      ar(v).tickSize(-ue).tickFormat(() => "")
    ), g.append("g").attr("class", "axis x-axis").attr("transform", `translate(0,${Xt})`).call(sr(b).ticks(6)), g.append("g").attr("class", "axis y-axis").call(ar(v).ticks(5)), c && g.append("text").attr("class", "axis-label").attr("x", ue / 2).attr("y", Xt + 35).attr("text-anchor", "middle").text(c), l && g.append("text").attr("class", "axis-label").attr("x", -Xt / 2).attr("y", -38).attr("transform", "rotate(-90)").attr("text-anchor", "middle").text(l), s) {
      const $ = Wp().x((y) => b(y.x)).y0(Xt).y1((y) => v(y.y));
      g.append("path").datum(e).attr("class", "area").attr("d", $).attr("fill", `url(#${f})`);
    }
    const m = zr().x(($) => b($.x)).y(($) => v($.y)), w = g.append("path").datum(e).attr("class", "line").attr("d", m).attr("stroke", i).attr("stroke-width", 2.5), k = w.node().getTotalLength();
    w.attr("stroke-dasharray", k).attr("stroke-dashoffset", k), a && g.selectAll(".point").data(e).enter().append("circle").attr("class", "point").attr("cx", ($) => b($.x)).attr("cy", ($) => v($.y)).attr("r", 4).attr("fill", i).attr("stroke", "white").attr("stroke-width", 1.5), o && this._setupTooltip(g, e, b, v, i), this._built = !0, this.getAttribute("animated") === "false" && this._showInstant();
  }
  _setupTooltip(e, r, i, s, a) {
    const o = e.append("g").attr("class", "tooltip-group").style("display", "none");
    o.append("line").attr("class", "crosshair crosshair-x").attr("y1", 0).attr("y2", Xt), o.append("line").attr("class", "crosshair crosshair-y").attr("x1", 0).attr("x2", ue), o.append("circle").attr("r", 5).attr("fill", a).attr("stroke", "white").attr("stroke-width", 2), o.append("rect").attr("class", "tooltip-bg").attr("width", 60).attr("height", 24).attr("rx", 6), o.append("text").attr("class", "tooltip-text").attr("text-anchor", "middle").attr("dy", "0.35em");
    const c = Xi((l) => l.x).left;
    e.append("rect").attr("width", ue).attr("height", Xt).attr("fill", "transparent").on("mousemove", (l) => {
      const [u] = _i(l), h = i.invert(u);
      let f = c(r, h, 1);
      if (f >= r.length && (f = r.length - 1), f > 0) {
        const m = r[f - 1], w = r[f];
        f = h - m.x > w.x - h ? f : f - 1;
      }
      const d = r[f], g = i(d.x), p = s(d.y);
      o.style("display", null), o.select(".crosshair-x").attr("x1", g).attr("x2", g), o.select(".crosshair-y").attr("y1", p).attr("y2", p), o.select("circle").attr("cx", g).attr("cy", p);
      const _ = 60, x = 24;
      let b = g - _ / 2, v = p - x - 10;
      b < 0 && (b = 0), b + _ > ue && (b = ue - _), v < 0 && (v = p + 10), o.select(".tooltip-bg").attr("x", b).attr("y", v), o.select(".tooltip-text").attr("x", b + _ / 2).attr("y", v + x / 2).text(`${d.y.toFixed(1)}`);
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
    i.attr("stroke-dasharray", s).attr("stroke-dashoffset", s).transition().duration(1200).ease(xn).attr("stroke-dashoffset", 0), r.select(".area").transition().delay(1500).duration(0).on("start", function() {
      tt(this).classed("visible", !0);
    }), r.selectAll(".point").each(function(o, c) {
      tt(this).transition().delay(1500 + c * 50).duration(0).on("start", function() {
        tt(this).classed("visible", !0);
      });
    });
  }
}
customElements.define("lv-line-chart", o0);
const Bn = {
  sigmoid: (n) => 1 / (1 + Math.exp(-n)),
  relu: (n) => Math.max(0, n),
  tanh: (n) => Math.tanh(n),
  linear: (n) => n
}, l0 = `
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
`, aa = 500, oa = 300;
class c0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
    D(this, "_resizeObserver", null);
    D(this, "_svg", null);
    D(this, "_fn", Bn.sigmoid);
    D(this, "_fnName", "sigmoid");
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
    super.connectedCallback(), this.adoptStyles(l0);
    const e = document.createElement("div");
    this.root.appendChild(e);
    const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    r.setAttribute("viewBox", `0 0 ${aa} ${oa}`), r.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.appendChild(r), this._svg = tt(r), this._parseFn(), this._render(!1), this._resizeObserver = new ResizeObserver(() => {
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
    if (this._fnName = e, Bn[e])
      this._fn = Bn[e];
    else
      try {
        const r = e.replace(/^\s*x\s*=>\s*/, "");
        this._fn = new Function("x", "return " + r), this._fnName = "custom";
      } catch {
        this._fn = Bn.sigmoid, this._fnName = "sigmoid";
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
    const i = this._generateData(), [s, a] = this._range, o = i.map((w) => w.y), c = Kc(o) ?? -1, l = Ga(o) ?? 1, u = (l - c) * 0.15 || 0.5, h = c - u, f = l + u, d = { top: 20, right: 30, bottom: 30, left: 40 }, g = aa - d.left - d.right, p = oa - d.top - d.bottom, _ = It().domain([s, a]).range([0, g]), x = It().domain([h, f]).range([p, 0]), b = r.append("g").attr("transform", `translate(${d.left},${d.top})`);
    this._drawGrid(b, _, x, g, p), this._drawAxes(b, _, x, g, p);
    const v = zr().x((w) => _(w.x)).y((w) => x(w.y)).curve(zo), m = b.append("path").datum(i).attr("class", "fn-line").attr("d", v).attr("stroke", this._color).attr("stroke-width", 3);
    if (e) {
      const C = m.node().getTotalLength();
      m.attr("stroke-dasharray", C).attr("stroke-dashoffset", C).transition().duration(1e3).ease(xn).attr("stroke-dashoffset", 0);
    }
    this._drawKeyPoints(b, _, x), this._interactive && this._addInteractivePoint(b, _, x, i, g, p);
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
      const _ = r(p);
      e.append("line").attr("class", "axis-line").attr("x1", _).attr("x2", _).attr("y1", h - 3).attr("y2", h + 3), e.append("text").attr("class", "axis-text").attr("x", _).attr("y", h + 14).attr("text-anchor", "middle").text(p);
    }), i.ticks().forEach((p) => {
      const _ = i(p);
      e.append("line").attr("class", "axis-line").attr("x1", f - 3).attr("x2", f + 3).attr("y1", _).attr("y2", _), e.append("text").attr("class", "axis-text").attr("x", f - 12).attr("y", _).attr("dy", "0.35em").attr("text-anchor", "end").text(p);
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
    const [c, l] = this._range, u = this._fn, h = (c + l) / 2, f = u(h), d = e.append("line").attr("class", "crosshair").attr("x1", r(h)).attr("x2", r(h)).attr("y1", i(f)).attr("y2", o), g = e.append("line").attr("class", "crosshair").attr("x1", 0).attr("x2", r(h)).attr("y1", i(f)).attr("y2", i(f)), p = e.append("g"), _ = p.append("rect").attr("class", "readout-bg").attr("width", 160).attr("height", 24).attr("rx", 6), x = p.append("text").attr("class", "readout-text").attr("text-anchor", "middle"), b = e.append("circle").attr("class", "drag-point").attr("cx", r(h)).attr("cy", i(f)).attr("r", 8).attr("fill", this._color).attr("stroke", "#fff").attr("stroke-width", 2), v = (w, C, k, $) => {
      const y = `x = ${k.toFixed(2)}, y = ${$.toFixed(2)}`;
      x.text(y);
      const S = 160, M = 24, T = 12;
      let E = w - S / 2, z = C - M - T;
      E < 0 && (E = 0), E + S > a && (E = a - S), z < 0 && (z = C + T), _.attr("x", E).attr("y", z).attr("width", S).attr("height", M), x.attr("x", E + S / 2).attr("y", z + M / 2).attr("text-anchor", "middle");
    };
    v(r(h), i(f), h, f);
    const m = Gh().on("drag", (w) => {
      const C = Math.max(0, Math.min(a, w.x)), k = r.invert(C), $ = Math.max(c, Math.min(l, k)), y = u($), S = r($), M = i(y);
      b.attr("cx", S).attr("cy", M), d.attr("x1", S).attr("x2", S).attr("y1", M).attr("y2", o), g.attr("x1", 0).attr("x2", S).attr("y1", M).attr("y2", M), v(S, M, $, y);
    });
    b.call(m);
  }
}
customElements.define("lv-function", c0);
const la = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], u0 = `
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
`, _t = { top: 20, right: 20, bottom: 50, left: 55 }, ca = 500, Kr = 400;
class h0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_data", []);
    D(this, "_hasAnimated", !1);
    D(this, "_svg", null);
    D(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "clusters", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(u0), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
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
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || la[e % 8];
  }
  _clusterColor(e) {
    const i = [...new Set(this._data.map((o) => o.cluster).filter((o) => o != null))].indexOf(e), s = i >= 0 ? i : 0;
    return getComputedStyle(this).getPropertyValue(`--lv-chart-${s % 8}`).trim() || la[s % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = tt(e), this._svg.append("g").attr("class", "grid-group"), this._svg.append("g").attr("class", "axis-group"), this._svg.append("g").attr("class", "points-group"), this._svg.append("g").attr("class", "tooltip-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("clusters"), s = this.hasAttribute("tooltip"), a = this.getAttribute("x-label") || "", o = this.getAttribute("y-label") || "", c = i ? [...new Set(r.map((A) => A.cluster).filter((A) => A != null))] : [], l = c.length > 0 ? 30 : 0, u = Kr + l, h = ca - _t.left - _t.right, f = Kr - _t.top - _t.bottom;
    this._svg.attr("viewBox", `0 0 ${ca} ${u}`);
    const d = rr(r, (A) => A.x), g = rr(r, (A) => A.y), p = (d[1] - d[0]) * 0.05 || 1, _ = (g[1] - g[0]) * 0.05 || 1, x = It().domain([d[0] - p, d[1] + p]).range([0, h]), b = It().domain([g[0] - _, g[1] + _]).range([f, 0]), v = this._svg.select(".grid-group").attr("transform", `translate(${_t.left},${_t.top})`);
    v.selectAll("*").remove();
    const m = sr(x).tickSize(-f).tickFormat(() => "");
    v.append("g").attr("class", "grid").attr("transform", `translate(0,${f})`).call(m);
    const w = ar(b).tickSize(-h).tickFormat(() => "");
    v.append("g").attr("class", "grid").call(w);
    const C = this._svg.select(".axis-group").attr("transform", `translate(${_t.left},${_t.top})`);
    C.selectAll("*").remove(), C.append("g").attr("class", "axis").attr("transform", `translate(0,${f})`).call(sr(x).ticks(6)), C.append("g").attr("class", "axis").call(ar(b).ticks(6)), a && C.append("text").attr("class", "axis-label").attr("x", h / 2).attr("y", f + 38).attr("text-anchor", "middle").text(a), o && C.append("text").attr("class", "axis-label").attr("x", -f / 2).attr("y", -40).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text(o);
    const k = this._svg.select(".points-group").attr("transform", `translate(${_t.left},${_t.top})`), $ = this._svg.select(".tooltip-group").attr("transform", `translate(${_t.left},${_t.top})`);
    $.selectAll("*").remove();
    const y = $.append("g").attr("class", "tooltip-box");
    y.append("rect").attr("class", "tooltip-bg"), y.append("text").attr("class", "tooltip-text");
    const S = k.selectAll(".point").data(r, (A, L) => String(L));
    S.exit().remove();
    const M = S.enter().append("circle").attr("class", "point").attr("cx", (A) => x(A.x)).attr("cy", (A) => b(A.y)).attr("r", 5).attr("fill", (A, L) => i && A.cluster != null ? this._clusterColor(A.cluster) : this._getColor(L, A)).attr("opacity", e ? 0 : 1).attr("transform", e ? "scale(0)" : "scale(1)").style("transform-origin", (A) => `${x(A.x)}px ${b(A.y)}px`);
    s ? M.on("mouseenter", (A, L) => {
      var O;
      if (tt(A.currentTarget).transition().duration(150).attr("r", 6.5).attr("opacity", 1), L.label) {
        const R = x(L.x), N = b(L.y) - 14;
        y.classed("visible", !0), y.select(".tooltip-text").attr("x", R).attr("y", N).text(L.label);
        const F = y.select(".tooltip-text").node(), K = ((O = F == null ? void 0 : F.getComputedTextLength) == null ? void 0 : O.call(F)) || 40;
        y.select(".tooltip-bg").attr("x", R - K / 2 - 6).attr("y", N - 10).attr("width", K + 12).attr("height", 20);
      }
    }).on("mouseleave", (A) => {
      tt(A.currentTarget).transition().duration(150).attr("r", 5).attr("opacity", 0.85), y.classed("visible", !1);
    }) : M.on("mouseenter", (A) => {
      tt(A.currentTarget).transition().duration(150).attr("r", 6.5);
    }).on("mouseleave", (A) => {
      tt(A.currentTarget).transition().duration(150).attr("r", 5);
    });
    const T = M.merge(S);
    if (e ? T.each(function(A, L) {
      tt(this).transition().delay(L * 30).duration(400).ease(Rd).attr("opacity", 0.85).attr("transform", "scale(1)");
    }) : T.attr("cx", (A) => x(A.x)).attr("cy", (A) => b(A.y)).attr("opacity", 0.85).attr("transform", "scale(1)").attr("fill", (A, L) => i && A.cluster != null ? this._clusterColor(A.cluster) : this._getColor(L, A)), this.hasAttribute("labels") || this.hasAttribute("tooltip")) {
      const A = this._svg.select(".points-group");
      A.selectAll(".point-label").remove(), r.forEach((L, P) => {
        if (!L.label) return;
        const O = A.append("text").attr("class", "point-label").attr("x", x(L.x) + 8).attr("y", b(L.y) + 4).attr("fill", "var(--lv-text, #e4e4ec)").attr("font-size", "11px").attr("opacity", e ? 0 : 0.9).text(L.label);
        e && O.transition().delay(P * 30 + 200).duration(300).attr("opacity", 0.9);
      });
    }
    const z = this._svg.select(".legend-group");
    if (z.selectAll("*").remove(), c.length > 0) {
      const A = Kr + 5;
      let L = _t.left;
      for (const P of c) {
        const O = this._clusterColor(P);
        z.append("circle").attr("cx", L + 5).attr("cy", A + 8).attr("r", 4).attr("fill", O), z.append("text").attr("class", "legend-text").attr("x", L + 14).attr("y", A + 8).attr("dominant-baseline", "central").text(String(P)), L += 14 + String(P).length * 7 + 20;
      }
    }
  }
}
customElements.define("lv-scatter", h0);
const f0 = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], d0 = `
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
`, Qe = 300, p0 = 130, ua = 26, ha = 16;
class g0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_data", []);
    D(this, "_hasAnimated", !1);
    D(this, "_svg", null);
    D(this, "_container", null);
  }
  static get observedAttributes() {
    return ["data", "donut", "legend"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(d0), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", []), this._initSvg(), this._render(!1);
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
    return r.color ? r.color : getComputedStyle(this).getPropertyValue(`--lv-chart-${e % 8}`).trim() || f0[e % 8];
  }
  _initSvg() {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._container.appendChild(e), this._svg = tt(e), this._svg.append("g").attr("class", "arcs-group"), this._svg.append("g").attr("class", "labels-group"), this._svg.append("g").attr("class", "hover-group"), this._svg.append("g").attr("class", "legend-group");
  }
  _render(e) {
    if (!this._svg) return;
    const r = this._data, i = this.hasAttribute("donut"), s = this.hasAttribute("legend"), a = p0, o = i ? a * 0.6 : 0, c = a + 5, l = s ? r.length : 0, u = l > 0 ? ha + l * ua : 0, h = Qe + u;
    this._svg.attr("viewBox", `0 0 ${Qe} ${h}`);
    const f = Qe / 2, d = Qe / 2, p = Zp().value(($) => $.value).sort(null).padAngle(0.015)(r), _ = na().innerRadius(o).outerRadius(a), x = na().innerRadius(o).outerRadius(c), b = this._svg.select(".arcs-group").attr("transform", `translate(${f},${d})`);
    b.selectAll("*").remove();
    const v = this._svg.select(".hover-group").attr("transform", `translate(${f},${d})`);
    v.selectAll("*").remove();
    const m = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 0), w = v.append("text").attr("class", "hover-label").attr("x", 0).attr("y", 18).style("font-size", "11px").style("font-weight", "400");
    for (let $ = 0; $ < p.length; $++) {
      const y = p[$], S = this._getColor($, y.data), M = b.append("path").attr("class", "arc").attr("fill", S).attr("stroke", "var(--lv-bg, #0f0f23)").attr("stroke-width", 1.5);
      if (e) {
        const T = { ...y, endAngle: y.startAngle };
        M.attr("d", _(T)).transition().delay($ * 120).duration(800).ease(xn).attrTween("d", () => {
          const E = $e(T, y);
          return (z) => _(E(z));
        });
      } else
        M.attr("d", _(y));
      M.on("mouseenter", () => {
        if (M.transition().duration(150).attr("d", x(y)), i)
          m.text(y.data.label).classed("visible", !0), w.text(String(y.data.value)).classed("visible", !0);
        else {
          const [T, E] = _.centroid(y);
          m.attr("x", T * 1.6).attr("y", E * 1.6 - 8).text(y.data.label).classed("visible", !0), w.attr("x", T * 1.6).attr("y", E * 1.6 + 8).text(String(y.data.value)).classed("visible", !0);
        }
      }).on("mouseleave", () => {
        M.transition().duration(150).attr("d", _(y)), m.classed("visible", !1), w.classed("visible", !1);
      });
    }
    const C = this._svg.select(".labels-group").attr("transform", `translate(${f},${d})`);
    if (C.selectAll("*").remove(), !s)
      for (let $ = 0; $ < p.length; $++) {
        const y = p[$];
        if (y.endAngle - y.startAngle > 0.35) {
          const [M, T] = _.centroid(y), E = C.append("text").attr("class", "arc-label").attr("x", M).attr("y", T).text(y.data.label);
          e && E.attr("opacity", 0).transition().delay($ * 120 + 600).duration(300).attr("opacity", 1);
        }
      }
    const k = this._svg.select(".legend-group");
    if (k.selectAll("*").remove(), s && r.length > 0) {
      const $ = Qe + ha;
      for (let y = 0; y < r.length; y++) {
        const M = $ + y * ua, T = this._getColor(y, r[y]);
        k.append("rect").attr("class", "legend-swatch").attr("x", 20).attr("y", M - 5).attr("width", 10).attr("height", 10).attr("fill", T), k.append("text").attr("class", "legend-text").attr("x", 38).attr("y", M).attr("dominant-baseline", "central").text(`${r[y].label} (${r[y].value})`);
      }
    }
  }
}
customElements.define("lv-pie", g0);
const m0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;
class _0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["labels", "values", "normalize", "show-metrics"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(m0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    const r = this.root.querySelectorAll(".cell");
    r.forEach((i, s) => {
      const a = i, o = Math.floor(s / Math.sqrt(r.length)), c = s % Math.sqrt(r.length), l = (o + c) * 40;
      a.style.transition = "none", a.style.opacity = "0", a.style.transform = "scale(0.5)", requestAnimationFrame(() => requestAnimationFrame(() => {
        a.style.transition = `opacity 400ms ease-out ${l}ms, transform 400ms ease-out ${l}ms`, a.style.opacity = "1", a.style.transform = "scale(1)";
      }));
    });
  }
  _buildChart() {
    const e = this.jsonAttr("labels", []), r = this.jsonAttr("values", []), i = this.hasAttribute("normalize"), s = this.hasAttribute("show-metrics");
    if (!e.length || !r.length) {
      this.render('<div class="cm-container"></div>');
      return;
    }
    const a = e.length, o = i ? r.map((k) => {
      const $ = k.reduce((y, S) => y + S, 0);
      return $ > 0 ? k.map((y) => y / $) : k;
    }) : r, c = Math.max(...o.flat()), l = 56, u = 3, h = 70, f = 80, d = s ? 60 : 0, g = s ? 40 : 0, p = a * l + (a - 1) * u, _ = p, x = f + p + d, b = h + _ + g, v = this.isRtl, m = rs(To).domain([0, c || 1]), w = (k) => {
      const $ = jt(m(k));
      if (!$) return "#fff";
      const { r: y, g: S, b: M } = $.rgb();
      return y * 0.299 + S * 0.587 + M * 0.114 > 150 ? "#111" : "#fff";
    };
    let C = "";
    for (let k = 0; k < a; k++) {
      const $ = f + k * (l + u) + l / 2;
      C += `<text class="header-text" x="${v ? x - $ : $}" y="${h - 8}"
        text-anchor="middle">${this._esc(e[k])}</text>`;
    }
    for (let k = 0; k < a; k++) {
      const $ = h + k * (l + u) + l / 2, y = v ? x - f / 2 : f / 2;
      C += `<text class="header-text" x="${y}" y="${$}"
        text-anchor="middle" dominant-baseline="central">${this._esc(e[k])}</text>`;
    }
    for (let k = 0; k < a; k++)
      for (let $ = 0; $ < a; $++) {
        const y = o[k][$], S = r[k][$], M = f + $ * (l + u), T = h + k * (l + u), E = v ? x - M - l : M, z = m(y), A = w(y), L = i ? (y * 100).toFixed(0) + "%" : String(S);
        C += `<g class="cell">
          <rect x="${E}" y="${T}" width="${l}" height="${l}"
            rx="4" fill="${z}" ${k === $ ? 'stroke="var(--lv-accent)" stroke-width="2"' : ""}/>
          <text class="cell-text" x="${E + l / 2}" y="${T + l / 2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${A}">${L}</text>
        </g>`;
      }
    if (s) {
      for (let k = 0; k < a; k++) {
        const $ = r[k][k], y = r.reduce((E, z) => E + z[k], 0), S = y > 0 ? ($ / y * 100).toFixed(0) + "%" : "-", M = f + k * (l + u) + l / 2, T = v ? x - M : M;
        C += `<text class="metric-text" x="${T}" y="${h + _ + 25}"
          text-anchor="middle" fill="var(--lv-positive)">${S}</text>`;
      }
      for (let k = 0; k < a; k++) {
        const $ = r[k][k], y = r[k].reduce((E, z) => E + z, 0), S = y > 0 ? ($ / y * 100).toFixed(0) + "%" : "-", M = h + k * (l + u) + l / 2, T = v ? f / 2 - 20 : f + p + 10;
        C += `<text class="metric-text" x="${T}" y="${M}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${S}</text>`;
      }
    }
    C += `<text class="axis-label" x="${v ? x - f / 2 : f / 2}" y="14"
      text-anchor="middle">Actual</text>`, C += `<text class="axis-label" x="${x / 2}" y="${b - 2}"
      text-anchor="middle">Predicted</text>`, this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${x} ${b}" role="img" aria-label="Confusion Matrix">
        ${C}
      </svg>
    </div>`);
  }
  _esc(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}
customElements.define("lv-confusion-matrix", _0);
const v0 = `
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
`, Je = 560, Vn = 280, at = { top: 30, right: 60, bottom: 40, left: 55 };
class x0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["loss", "accuracy", "lr", "x-label", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(v0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    this.root.querySelectorAll(".metric-line").forEach((i) => {
      const s = i, a = s.getTotalLength();
      s.style.strokeDasharray = String(a), s.style.strokeDashoffset = String(a), s.style.transition = `stroke-dashoffset 1.2s ${s.dataset.idx || "0"}s ease-out`, requestAnimationFrame(() => {
        s.style.strokeDashoffset = "0";
      });
    });
  }
  _buildChart() {
    const e = this.jsonAttr("loss", []), r = this.jsonAttr("accuracy", []), i = this.jsonAttr("lr", []), s = this.getAttribute("x-label") || "Epoch";
    this.hasAttribute("tooltip");
    const a = Math.max(e.length, r.length, i.length);
    if (a === 0) {
      this.render('<div class="td-container"></div>');
      return;
    }
    const o = Je - at.left - at.right, c = Vn - at.top - at.bottom, l = It().domain([0, a - 1]).range([0, o]), u = Math.max(
      e.length ? Math.max(...e) : 0,
      r.length ? Math.max(...r) : 1
    ) * 1.1, h = It().domain([0, u]).range([c, 0]), f = i.length > 0, d = f ? Math.max(...i) * 1.2 : 1, g = It().domain([0, d]).range([c, 0]), p = (k, $) => zr().x((y, S) => at.left + l(S)).y((y) => at.top + $(y)).curve(zo)(k) || "", _ = [];
    e.length && _.push({ name: "Loss", color: "var(--lv-negative)", data: e, axis: "left" }), r.length && _.push({ name: "Accuracy", color: "var(--lv-positive)", data: r, axis: "left" }), f && _.push({ name: "Learning Rate", color: "var(--lv-accent2)", data: i, axis: "right" });
    const x = _.map(
      (k) => `<div class="legend-item"><div class="legend-dot" style="background:${k.color}"></div>${k.name}</div>`
    ).join("");
    let b = "";
    const v = h.ticks(5);
    v.forEach((k) => {
      const $ = at.top + h(k);
      b += `<line class="grid-line" x1="${at.left}" x2="${Je - at.right}" y1="${$}" y2="${$}"/>`;
    });
    let m = "";
    v.forEach((k) => {
      const $ = at.top + h(k);
      m += `<text class="axis-text" x="${at.left - 8}" y="${$}" text-anchor="end" dominant-baseline="central">${k.toFixed(2)}</text>`;
    }), f && g.ticks(4).forEach((k) => {
      const $ = at.top + g(k);
      m += `<text class="axis-text" x="${Je - at.right + 8}" y="${$}" text-anchor="start" dominant-baseline="central">${k.toFixed(4)}</text>`;
    }), l.ticks(Math.min(a, 10)).forEach((k) => {
      const $ = at.left + l(k);
      m += `<text class="axis-text" x="${$}" y="${Vn - at.bottom + 20}" text-anchor="middle">${Math.round(k)}</text>`;
    }), m += `<text class="axis-text" x="${Je / 2}" y="${Vn - 4}" text-anchor="middle">${s}</text>`;
    let C = "";
    _.forEach((k, $) => {
      const y = k.axis === "left" ? h : g, S = p(k.data, y);
      C += `<path class="metric-line" d="${S}" stroke="${k.color}" data-idx="${$ * 0.3}"/>`;
    }), this.render(`
      <div class="td-container">
        <div class="legend">${x}</div>
        <svg viewBox="0 0 ${Je} ${Vn}" role="img" aria-label="Training Dashboard">
          ${b}${m}${C}
        </svg>
      </div>
    `);
  }
}
customElements.define("lv-train-dashboard", x0);
function fa(n, t) {
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
function y0(n, t) {
  let e;
  if (t === void 0)
    for (const r of n)
      r != null && (e > r || e === void 0 && r >= r) && (e = r);
  else {
    let r = -1;
    for (let i of n)
      (i = t(i, ++r, n)) != null && (e > i || e === void 0 && i >= i) && (e = i);
  }
  return e;
}
function Zr(n, t) {
  let e = 0;
  if (t === void 0)
    for (let r of n)
      (r = +r) && (e += r);
  else {
    let r = -1;
    for (let i of n)
      (i = +t(i, ++r, n)) && (e += i);
  }
  return e;
}
function b0(n) {
  return n.depth;
}
function w0(n, t) {
  return n.sourceLinks.length ? n.depth : t - 1;
}
function Xn(n) {
  return function() {
    return n;
  };
}
function da(n, t) {
  return br(n.source, t.source) || n.index - t.index;
}
function pa(n, t) {
  return br(n.target, t.target) || n.index - t.index;
}
function br(n, t) {
  return n.y0 - t.y0;
}
function Qr(n) {
  return n.value;
}
function k0(n) {
  return n.index;
}
function A0(n) {
  return n.nodes;
}
function $0(n) {
  return n.links;
}
function ga(n, t) {
  const e = n.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function ma({ nodes: n }) {
  for (const t of n) {
    let e = t.y0, r = e;
    for (const i of t.sourceLinks)
      i.y0 = e + i.width / 2, e += i.width;
    for (const i of t.targetLinks)
      i.y1 = r + i.width / 2, r += i.width;
  }
}
function C0() {
  let n = 0, t = 0, e = 1, r = 1, i = 24, s = 8, a, o = k0, c = w0, l, u, h = A0, f = $0, d = 6;
  function g() {
    const A = { nodes: h.apply(null, arguments), links: f.apply(null, arguments) };
    return p(A), _(A), x(A), b(A), w(A), ma(A), A;
  }
  g.update = function(A) {
    return ma(A), A;
  }, g.nodeId = function(A) {
    return arguments.length ? (o = typeof A == "function" ? A : Xn(A), g) : o;
  }, g.nodeAlign = function(A) {
    return arguments.length ? (c = typeof A == "function" ? A : Xn(A), g) : c;
  }, g.nodeSort = function(A) {
    return arguments.length ? (l = A, g) : l;
  }, g.nodeWidth = function(A) {
    return arguments.length ? (i = +A, g) : i;
  }, g.nodePadding = function(A) {
    return arguments.length ? (s = a = +A, g) : s;
  }, g.nodes = function(A) {
    return arguments.length ? (h = typeof A == "function" ? A : Xn(A), g) : h;
  }, g.links = function(A) {
    return arguments.length ? (f = typeof A == "function" ? A : Xn(A), g) : f;
  }, g.linkSort = function(A) {
    return arguments.length ? (u = A, g) : u;
  }, g.size = function(A) {
    return arguments.length ? (n = t = 0, e = +A[0], r = +A[1], g) : [e - n, r - t];
  }, g.extent = function(A) {
    return arguments.length ? (n = +A[0][0], e = +A[1][0], t = +A[0][1], r = +A[1][1], g) : [[n, t], [e, r]];
  }, g.iterations = function(A) {
    return arguments.length ? (d = +A, g) : d;
  };
  function p({ nodes: A, links: L }) {
    for (const [O, R] of A.entries())
      R.index = O, R.sourceLinks = [], R.targetLinks = [];
    const P = new Map(A.map((O, R) => [o(O, R, A), O]));
    for (const [O, R] of L.entries()) {
      R.index = O;
      let { source: N, target: F } = R;
      typeof N != "object" && (N = R.source = ga(P, N)), typeof F != "object" && (F = R.target = ga(P, F)), N.sourceLinks.push(R), F.targetLinks.push(R);
    }
    if (u != null)
      for (const { sourceLinks: O, targetLinks: R } of A)
        O.sort(u), R.sort(u);
  }
  function _({ nodes: A }) {
    for (const L of A)
      L.value = L.fixedValue === void 0 ? Math.max(Zr(L.sourceLinks, Qr), Zr(L.targetLinks, Qr)) : L.fixedValue;
  }
  function x({ nodes: A }) {
    const L = A.length;
    let P = new Set(A), O = /* @__PURE__ */ new Set(), R = 0;
    for (; P.size; ) {
      for (const N of P) {
        N.depth = R;
        for (const { target: F } of N.sourceLinks)
          O.add(F);
      }
      if (++R > L) throw new Error("circular link");
      P = O, O = /* @__PURE__ */ new Set();
    }
  }
  function b({ nodes: A }) {
    const L = A.length;
    let P = new Set(A), O = /* @__PURE__ */ new Set(), R = 0;
    for (; P.size; ) {
      for (const N of P) {
        N.height = R;
        for (const { source: F } of N.targetLinks)
          O.add(F);
      }
      if (++R > L) throw new Error("circular link");
      P = O, O = /* @__PURE__ */ new Set();
    }
  }
  function v({ nodes: A }) {
    const L = fa(A, (R) => R.depth) + 1, P = (e - n - i) / (L - 1), O = new Array(L);
    for (const R of A) {
      const N = Math.max(0, Math.min(L - 1, Math.floor(c.call(null, R, L))));
      R.layer = N, R.x0 = n + N * P, R.x1 = R.x0 + i, O[N] ? O[N].push(R) : O[N] = [R];
    }
    if (l) for (const R of O)
      R.sort(l);
    return O;
  }
  function m(A) {
    const L = y0(A, (P) => (r - t - (P.length - 1) * a) / Zr(P, Qr));
    for (const P of A) {
      let O = t;
      for (const R of P) {
        R.y0 = O, R.y1 = O + R.value * L, O = R.y1 + a;
        for (const N of R.sourceLinks)
          N.width = N.value * L;
      }
      O = (r - O + a) / (P.length + 1);
      for (let R = 0; R < P.length; ++R) {
        const N = P[R];
        N.y0 += O * (R + 1), N.y1 += O * (R + 1);
      }
      T(P);
    }
  }
  function w(A) {
    const L = v(A);
    a = Math.min(s, (r - t) / (fa(L, (P) => P.length) - 1)), m(L);
    for (let P = 0; P < d; ++P) {
      const O = Math.pow(0.99, P), R = Math.max(1 - O, (P + 1) / d);
      k(L, O, R), C(L, O, R);
    }
  }
  function C(A, L, P) {
    for (let O = 1, R = A.length; O < R; ++O) {
      const N = A[O];
      for (const F of N) {
        let K = 0, ct = 0;
        for (const { source: Y, value: le } of F.targetLinks) {
          let Bt = le * (F.layer - Y.layer);
          K += E(Y, F) * Bt, ct += Bt;
        }
        if (!(ct > 0)) continue;
        let J = (K / ct - F.y0) * L;
        F.y0 += J, F.y1 += J, M(F);
      }
      l === void 0 && N.sort(br), $(N, P);
    }
  }
  function k(A, L, P) {
    for (let O = A.length, R = O - 2; R >= 0; --R) {
      const N = A[R];
      for (const F of N) {
        let K = 0, ct = 0;
        for (const { target: Y, value: le } of F.sourceLinks) {
          let Bt = le * (Y.layer - F.layer);
          K += z(F, Y) * Bt, ct += Bt;
        }
        if (!(ct > 0)) continue;
        let J = (K / ct - F.y0) * L;
        F.y0 += J, F.y1 += J, M(F);
      }
      l === void 0 && N.sort(br), $(N, P);
    }
  }
  function $(A, L) {
    const P = A.length >> 1, O = A[P];
    S(A, O.y0 - a, P - 1, L), y(A, O.y1 + a, P + 1, L), S(A, r, A.length - 1, L), y(A, t, 0, L);
  }
  function y(A, L, P, O) {
    for (; P < A.length; ++P) {
      const R = A[P], N = (L - R.y0) * O;
      N > 1e-6 && (R.y0 += N, R.y1 += N), L = R.y1 + a;
    }
  }
  function S(A, L, P, O) {
    for (; P >= 0; --P) {
      const R = A[P], N = (R.y1 - L) * O;
      N > 1e-6 && (R.y0 -= N, R.y1 -= N), L = R.y0 - a;
    }
  }
  function M({ sourceLinks: A, targetLinks: L }) {
    if (u === void 0) {
      for (const { source: { sourceLinks: P } } of L)
        P.sort(pa);
      for (const { target: { targetLinks: P } } of A)
        P.sort(da);
    }
  }
  function T(A) {
    if (u === void 0)
      for (const { sourceLinks: L, targetLinks: P } of A)
        L.sort(pa), P.sort(da);
  }
  function E(A, L) {
    let P = A.y0 - (A.sourceLinks.length - 1) * a / 2;
    for (const { target: O, width: R } of A.sourceLinks) {
      if (O === L) break;
      P += R + a;
    }
    for (const { source: O, width: R } of L.targetLinks) {
      if (O === A) break;
      P -= R;
    }
    return P;
  }
  function z(A, L) {
    let P = L.y0 - (L.targetLinks.length - 1) * a / 2;
    for (const { source: O, width: R } of L.targetLinks) {
      if (O === A) break;
      P += R + a;
    }
    for (const { target: O, width: R } of A.sourceLinks) {
      if (O === L) break;
      P -= R;
    }
    return P;
  }
  return g;
}
var Si = Math.PI, Ti = 2 * Si, pe = 1e-6, S0 = Ti - pe;
function Mi() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function No() {
  return new Mi();
}
Mi.prototype = No.prototype = {
  constructor: Mi,
  moveTo: function(n, t) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(n, t) {
    this._ += "L" + (this._x1 = +n) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(n, t, e, r) {
    this._ += "Q" + +n + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +r);
  },
  bezierCurveTo: function(n, t, e, r, i, s) {
    this._ += "C" + +n + "," + +t + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +s);
  },
  arcTo: function(n, t, e, r, i) {
    n = +n, t = +t, e = +e, r = +r, i = +i;
    var s = this._x1, a = this._y1, o = e - n, c = r - t, l = s - n, u = a - t, h = l * l + u * u;
    if (i < 0) throw new Error("negative radius: " + i);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = n) + "," + (this._y1 = t);
    else if (h > pe) if (!(Math.abs(u * o - c * l) > pe) || !i)
      this._ += "L" + (this._x1 = n) + "," + (this._y1 = t);
    else {
      var f = e - s, d = r - a, g = o * o + c * c, p = f * f + d * d, _ = Math.sqrt(g), x = Math.sqrt(h), b = i * Math.tan((Si - Math.acos((g + h - p) / (2 * _ * x))) / 2), v = b / x, m = b / _;
      Math.abs(v - 1) > pe && (this._ += "L" + (n + v * l) + "," + (t + v * u)), this._ += "A" + i + "," + i + ",0,0," + +(u * f > l * d) + "," + (this._x1 = n + m * o) + "," + (this._y1 = t + m * c);
    }
  },
  arc: function(n, t, e, r, i, s) {
    n = +n, t = +t, e = +e, s = !!s;
    var a = e * Math.cos(r), o = e * Math.sin(r), c = n + a, l = t + o, u = 1 ^ s, h = s ? r - i : i - r;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + c + "," + l : (Math.abs(this._x1 - c) > pe || Math.abs(this._y1 - l) > pe) && (this._ += "L" + c + "," + l), e && (h < 0 && (h = h % Ti + Ti), h > S0 ? this._ += "A" + e + "," + e + ",0,1," + u + "," + (n - a) + "," + (t - o) + "A" + e + "," + e + ",0,1," + u + "," + (this._x1 = c) + "," + (this._y1 = l) : h > pe && (this._ += "A" + e + "," + e + ",0," + +(h >= Si) + "," + u + "," + (this._x1 = n + e * Math.cos(i)) + "," + (this._y1 = t + e * Math.sin(i))));
  },
  rect: function(n, t, e, r) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +r + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function _a(n) {
  return function() {
    return n;
  };
}
function T0(n) {
  return n[0];
}
function M0(n) {
  return n[1];
}
var E0 = Array.prototype.slice;
function L0(n) {
  return n.source;
}
function P0(n) {
  return n.target;
}
function z0(n) {
  var t = L0, e = P0, r = T0, i = M0, s = null;
  function a() {
    var o, c = E0.call(arguments), l = t.apply(this, c), u = e.apply(this, c);
    if (s || (s = o = No()), n(s, +r.apply(this, (c[0] = l, c)), +i.apply(this, c), +r.apply(this, (c[0] = u, c)), +i.apply(this, c)), o) return s = null, o + "" || null;
  }
  return a.source = function(o) {
    return arguments.length ? (t = o, a) : t;
  }, a.target = function(o) {
    return arguments.length ? (e = o, a) : e;
  }, a.x = function(o) {
    return arguments.length ? (r = typeof o == "function" ? o : _a(+o), a) : r;
  }, a.y = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : _a(+o), a) : i;
  }, a.context = function(o) {
    return arguments.length ? (s = o ?? null, a) : s;
  }, a;
}
function R0(n, t, e, r, i) {
  n.moveTo(t, e), n.bezierCurveTo(t = (t + r) / 2, e, t, i, r, i);
}
function O0() {
  return z0(R0);
}
function N0(n) {
  return [n.source.x1, n.y0];
}
function D0(n) {
  return [n.target.x0, n.y1];
}
function F0() {
  return O0().source(N0).target(D0);
}
const I0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`, va = [
  "var(--lv-chart-0)",
  "var(--lv-chart-1)",
  "var(--lv-chart-2)",
  "var(--lv-chart-3)",
  "var(--lv-chart-4)",
  "var(--lv-chart-5)",
  "var(--lv-chart-6)",
  "var(--lv-chart-7)"
];
class q0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["nodes", "links", "node-colors"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(I0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    const r = this.root.querySelectorAll(".node");
    r.forEach((a, o) => {
      const c = a;
      c.style.transition = "none", c.style.opacity = "0", c.style.transform = "translateX(-20px)", requestAnimationFrame(() => requestAnimationFrame(() => {
        c.style.transition = `opacity 400ms ease-out ${o * 80}ms, transform 400ms ease-out ${o * 80}ms`, c.style.opacity = "1", c.style.transform = "translateX(0)";
      }));
    });
    const i = this.root.querySelectorAll(".link"), s = r.length * 80;
    i.forEach((a, o) => {
      const c = a, l = c.getTotalLength();
      c.style.strokeDasharray = String(l), c.style.strokeDashoffset = String(l), c.style.transition = `stroke-dashoffset 600ms ease-out ${s + o * 50}ms`, requestAnimationFrame(() => {
        c.style.strokeDashoffset = "0";
      });
    });
  }
  _buildChart() {
    const e = this.jsonAttr("nodes", []), r = this.jsonAttr("links", []), i = this.jsonAttr("node-colors", []);
    if (!e.length || !r.length) {
      this.render("<svg></svg>");
      return;
    }
    const s = 600, a = Math.max(300, e.length * 40), o = 20, c = this.isRtl, l = C0().nodeId((h, f) => f).nodeWidth(20).nodePadding(16).nodeAlign(b0).extent([[o, o], [s - o, a - o]])({
      nodes: e.map((h) => ({ name: h })),
      links: r.map((h) => ({ ...h }))
    });
    let u = "";
    l.links.forEach((h, f) => {
      const d = F0()(h), g = i[h.source.index] || va[h.source.index % 8];
      u += `<path class="link" d="${d}" stroke="${g}" stroke-width="${Math.max(1, h.width)}"/>`;
    }), l.nodes.forEach((h, f) => {
      const d = i[f] || va[f % 8], g = c ? s - h.x1 : h.x0, p = h.x1 - h.x0, _ = h.y0, x = h.y1 - h.y0, b = c ? g - 6 : g + p + 6, v = c ? "end" : "start";
      u += `<g class="node">
        <rect x="${g}" y="${_}" width="${p}" height="${x}" rx="3" fill="${d}"/>
        <text class="node-label" x="${b}" y="${_ + x / 2}"
          text-anchor="${v}" dominant-baseline="central">${this._esc(h.name)}</text>
      </g>`;
    }), this.render(`<svg viewBox="0 0 ${s} ${a}" role="img" aria-label="Sankey Diagram">${u}</svg>`);
  }
  _esc(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-sankey", q0);
const H0 = "https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js", B0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`, V0 = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class X0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "roughness"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(B0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    const r = this.root.querySelector("canvas");
    r && (r.style.opacity = "0", r.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      r.style.opacity = "1";
    }));
  }
  async _buildChart() {
    const e = this.jsonAttr("data", []), r = parseFloat(this.getAttribute("roughness") || "2");
    if (!e.length) {
      this.render('<div class="sketch-container"></div>');
      return;
    }
    const i = 500, s = 300, a = { top: 20, right: 20, bottom: 40, left: 50 };
    this.render(`<div class="sketch-container">
      <canvas width="${i * 2}" height="${s * 2}" style="width:${i}px;height:${s}px;"></canvas>
      <div class="bar-labels">${e.map((_) => `<span>${this._esc(_.label)}</span>`).join("")}</div>
    </div>`);
    try {
      await ke(H0);
    } catch {
      return;
    }
    const o = this.root.querySelector("canvas");
    if (!o) return;
    const c = window.rough.canvas(o), l = o.getContext("2d");
    if (!l) return;
    l.scale(2, 2);
    const u = Math.max(...e.map((_) => _.value)), h = i - a.left - a.right, f = s - a.top - a.bottom, d = h / e.length * 0.7, g = h / e.length * 0.3;
    c.line(a.left, s - a.bottom, i - a.right, s - a.bottom, { roughness: r * 0.5, stroke: "#888" }), c.line(a.left, a.top, a.left, s - a.bottom, { roughness: r * 0.5, stroke: "#888" });
    const p = this.isRtl;
    e.forEach((_, x) => {
      const b = _.value / u * f, v = p ? e.length - 1 - x : x, m = a.left + v * (d + g) + g / 2, w = s - a.bottom - b, C = _.color || `var(--lv-chart-${x % 8})`, k = C.startsWith("var(") ? V0[x % 8] : C;
      c.rectangle(m, w, d, b, {
        roughness: r,
        fill: k,
        fillStyle: "hachure",
        hachureGap: 6,
        stroke: k,
        strokeWidth: 1.5
      });
    }), l.font = "11px sans-serif", l.fillStyle = "#888", l.textAlign = "right";
    for (let _ = 0; _ <= 4; _++) {
      const x = u * _ / 4, b = s - a.bottom - _ / 4 * f;
      l.fillText(x.toFixed(1), a.left - 8, b + 4);
    }
  }
  _esc(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
customElements.define("lv-sketch-bar", X0);
const Y0 = "https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js", G0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`, xa = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class j0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_hasAnimated", !1);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "color", "area", "roughness"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(G0), this._buildChart();
  }
  handleAttributeChange() {
    this.isConnected && this._buildChart();
  }
  animateIn(e) {
    if (this._hasAnimated || (this._hasAnimated = !0, e)) return;
    const r = this.root.querySelector("canvas");
    r && (r.style.opacity = "0", r.style.transition = "opacity 0.6s ease-out", requestAnimationFrame(() => {
      r.style.opacity = "1";
    }));
  }
  async _buildChart() {
    const e = this.jsonAttr("data", []), r = this.getAttribute("x-label") || "", i = this.getAttribute("y-label") || "", s = this.getAttribute("color") || "", a = this.hasAttribute("area"), o = parseFloat(this.getAttribute("roughness") || "2");
    if (!e.length) {
      this.render("<canvas></canvas>");
      return;
    }
    const c = typeof e[0] == "number" ? e.map((T, E) => ({ x: E, y: T })) : e, l = 500, u = 260, h = { top: 20, right: 20, bottom: 40, left: 55 };
    this.render(`<canvas width="${l * 2}" height="${u * 2}" style="width:${l}px;height:${u}px;"></canvas>`);
    try {
      await ke(Y0);
    } catch {
      return;
    }
    const f = this.root.querySelector("canvas");
    if (!f) return;
    const d = window.rough.canvas(f), g = f.getContext("2d");
    if (!g) return;
    g.scale(2, 2);
    const p = c.map((T) => T.x), _ = c.map((T) => T.y), x = Math.min(...p), b = Math.max(...p), v = Math.min(0, Math.min(..._)), m = Math.max(..._) * 1.1, w = l - h.left - h.right, C = u - h.top - h.bottom, k = (T) => h.left + (T - x) / (b - x || 1) * w, $ = (T) => h.top + (1 - (T - v) / (m - v || 1)) * C, y = s.startsWith("var(") ? xa[0] : s || xa[0];
    if (d.line(h.left, u - h.bottom, l - h.right, u - h.bottom, { roughness: o * 0.5, stroke: "#888" }), d.line(h.left, h.top, h.left, u - h.bottom, { roughness: o * 0.5, stroke: "#888" }), a) {
      const T = [
        [k(c[0].x), $(v)],
        ...c.map((E) => [k(E.x), $(E.y)]),
        [k(c[c.length - 1].x), $(v)]
      ];
      d.polygon(T, {
        roughness: o * 0.3,
        fill: y,
        fillStyle: "hachure",
        hachureGap: 8,
        hachureAngle: 60,
        stroke: "none",
        fillWeight: 0.5
      });
    }
    const S = c.map((T) => [k(T.x), $(T.y)]);
    d.curve(S, {
      roughness: o,
      stroke: y,
      strokeWidth: 2.5
    }), c.forEach((T) => {
      d.circle(k(T.x), $(T.y), 6, {
        roughness: o * 0.5,
        fill: y,
        fillStyle: "solid",
        stroke: y
      });
    }), g.font = "11px sans-serif", g.fillStyle = "#888", g.textAlign = "center", r && g.fillText(r, l / 2, u - 4), i && (g.save(), g.translate(12, u / 2), g.rotate(-Math.PI / 2), g.fillText(i, 0, 0), g.restore()), g.textAlign = "right";
    for (let T = 0; T <= 4; T++) {
      const E = v + (m - v) * T / 4;
      g.fillText(E.toFixed(2), h.left - 8, $(E) + 4);
    }
    g.textAlign = "center";
    const M = Math.ceil(c.length / 8);
    for (let T = 0; T < c.length; T += M)
      g.fillText(String(c[T].x), k(c[T].x), u - h.bottom + 16);
  }
}
customElements.define("lv-sketch-line", j0);
const W0 = "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js", U0 = "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/js/controls/OrbitControls.js", K0 = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`, Jr = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];
class Z0 extends I {
  constructor() {
    super(...arguments);
    D(this, "_raf", null);
    D(this, "_renderer", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "z-label", "clusters", "auto-rotate", "tooltip"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(K0), this._buildScene();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._raf && cancelAnimationFrame(this._raf), this._renderer && (this._renderer.dispose(), this._renderer = null);
  }
  handleAttributeChange() {
    this.isConnected && this._buildScene();
  }
  async _buildScene() {
    const e = this.jsonAttr("data", []);
    this.getAttribute("x-label"), this.getAttribute("y-label"), this.getAttribute("z-label");
    const r = this.hasAttribute("clusters"), i = this.hasAttribute("auto-rotate");
    if (this.render('<div class="scene-container" id="scene"></div>'), !e.length) return;
    try {
      await ke(W0), await ke(U0);
    } catch {
      return;
    }
    const s = window.THREE;
    if (!s) return;
    const a = this.root.getElementById("scene");
    if (!a) return;
    const o = a.clientWidth || 500, c = a.clientHeight || 375, l = new s.Scene();
    l.background = new s.Color(
      getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim() || "#12122a"
    );
    const u = new s.PerspectiveCamera(50, o / c, 0.1, 100);
    u.position.set(2.5, 2, 2.5), u.lookAt(0, 0, 0);
    const h = new s.WebGLRenderer({ antialias: !0 });
    h.setSize(o, c), h.setPixelRatio(window.devicePixelRatio), a.appendChild(h.domElement), this._renderer = h;
    const f = s.OrbitControls || window.THREE.OrbitControls, d = new f(u, h.domElement);
    d.enableDamping = !0, d.dampingFactor = 0.05, d.autoRotate = i, d.autoRotateSpeed = 1;
    const g = e.map((A) => A.x), p = e.map((A) => A.y), _ = e.map((A) => A.z), x = (A) => {
      const L = Math.min(...A), O = Math.max(...A) - L || 1;
      return A.map((R) => (R - L) / O * 2 - 1);
    }, b = x(g), v = x(p), m = x(_), w = [...new Set(e.map((A) => A.cluster || ""))], C = (A) => {
      const L = w.indexOf(A);
      return new s.Color(Jr[L % Jr.length]);
    }, k = new s.BufferGeometry(), $ = new Float32Array(e.length * 3), y = new Float32Array(e.length * 3);
    e.forEach((A, L) => {
      $[L * 3] = b[L], $[L * 3 + 1] = v[L], $[L * 3 + 2] = m[L];
      const P = r ? C(A.cluster || "") : new s.Color(Jr[0]);
      y[L * 3] = P.r, y[L * 3 + 1] = P.g, y[L * 3 + 2] = P.b;
    }), k.setAttribute("position", new s.BufferAttribute($, 3)), k.setAttribute("color", new s.BufferAttribute(y, 3));
    const S = new s.PointsMaterial({ size: 0.06, vertexColors: !0, sizeAttenuation: !0 });
    l.add(new s.Points(k, S));
    const M = 1.2, T = [16729156, 4521796, 4474111];
    [[M, 0, 0], [0, M, 0], [0, 0, M]].forEach(([A, L, P], O) => {
      const R = [new s.Vector3(0, 0, 0), new s.Vector3(A, L, P)], N = new s.BufferGeometry().setFromPoints(R), F = new s.LineBasicMaterial({ color: T[O], opacity: 0.4, transparent: !0 });
      l.add(new s.Line(N, F));
    });
    const E = new s.GridHelper(2, 10, 3355477, 2236996);
    E.position.y = -1, l.add(E);
    const z = () => {
      this._raf = requestAnimationFrame(z), d.update(), h.render(l, u);
    };
    z();
  }
}
customElements.define("lv-scatter-3d", Z0);
const Q0 = "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js", J0 = "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/js/controls/OrbitControls.js", tg = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;
class eg extends I {
  constructor() {
    super(...arguments);
    D(this, "_raf", null);
    D(this, "_renderer", null);
  }
  static get observedAttributes() {
    return ["data", "x-label", "y-label", "z-label", "color-scale", "wireframe", "auto-rotate"];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(tg), this._buildScene();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._raf && cancelAnimationFrame(this._raf), this._renderer && (this._renderer.dispose(), this._renderer = null);
  }
  handleAttributeChange() {
    this.isConnected && this._buildScene();
  }
  async _buildScene() {
    const e = this.jsonAttr("data", []), r = this.hasAttribute("wireframe"), i = this.hasAttribute("auto-rotate");
    if (this.render('<div class="scene-container" id="scene"></div>'), !e.length || !e[0].length) return;
    try {
      await ke(Q0), await ke(J0);
    } catch {
      return;
    }
    const s = window.THREE;
    if (!s) return;
    const a = this.root.getElementById("scene");
    if (!a) return;
    const o = a.clientWidth || 500, c = a.clientHeight || 375, l = e.length, u = e[0].length, h = e.flat(), f = Math.min(...h), g = Math.max(...h) - f || 1, p = new s.Scene();
    p.background = new s.Color(
      getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim() || "#12122a"
    );
    const _ = new s.PerspectiveCamera(50, o / c, 0.1, 100);
    _.position.set(2.5, 2.5, 2.5), _.lookAt(0, 0, 0);
    const x = new s.WebGLRenderer({ antialias: !0 });
    x.setSize(o, c), x.setPixelRatio(window.devicePixelRatio), a.appendChild(x.domElement), this._renderer = x;
    const b = s.OrbitControls || window.THREE.OrbitControls, v = new b(_, x.domElement);
    v.enableDamping = !0, v.autoRotate = i, v.autoRotateSpeed = 0.8;
    const m = new s.PlaneGeometry(2, 2, u - 1, l - 1), w = m.attributes.position, C = new Float32Array(w.count * 3);
    for (let S = 0; S < l; S++)
      for (let M = 0; M < u; M++) {
        const T = S * u + M, E = (e[S][M] - f) / g;
        w.setZ(T, E - 0.5);
        const z = E;
        let A, L, P;
        z < 0.25 ? (A = 0, L = z * 4, P = 1) : z < 0.5 ? (A = 0, L = 1, P = 1 - (z - 0.25) * 4) : z < 0.75 ? (A = (z - 0.5) * 4, L = 1, P = 0) : (A = 1, L = 1 - (z - 0.75) * 4, P = 0), C[T * 3] = A, C[T * 3 + 1] = L, C[T * 3 + 2] = P;
      }
    m.setAttribute("color", new s.BufferAttribute(C, 3)), m.computeVertexNormals(), m.rotateX(-Math.PI / 2);
    const k = r ? new s.MeshBasicMaterial({ vertexColors: !0, wireframe: !0 }) : new s.MeshPhongMaterial({ vertexColors: !0, side: s.DoubleSide, flatShading: !0 });
    if (p.add(new s.Mesh(m, k)), !r) {
      p.add(new s.AmbientLight(16777215, 0.4));
      const S = new s.DirectionalLight(16777215, 0.8);
      S.position.set(3, 5, 3), p.add(S);
    }
    const $ = new s.GridHelper(2, 10, 3355477, 2236996);
    $.position.y = -0.5, p.add($);
    const y = () => {
      this._raf = requestAnimationFrame(y), v.update(), x.render(p, _);
    };
    y();
  }
}
customElements.define("lv-surface-3d", eg);
const ng = `
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
`, ot = 120, Mt = 90, ti = 60, ei = 40, ya = 10, ba = 2, wa = 8, tn = 60;
function ni(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class rg extends I {
  constructor() {
    super(...arguments);
    D(this, "_steps", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(ng), this._readChildren(), this._renderSvg();
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
    const i = (this.getAttribute("direction") || "horizontal") === "horizontal", s = this.hasAttribute("cyclic"), a = this.isRtl, o = 24, c = s ? tn + 40 : 0;
    let l, u;
    i ? (l = o * 2 + e.length * ot + (e.length - 1) * ti, u = o * 2 + Mt + c) : (l = o * 2 + ot + c, u = o * 2 + e.length * Mt + (e.length - 1) * ei);
    const h = [];
    for (let v = 0; v < e.length; v++)
      if (i) {
        let m = o + v * (ot + ti);
        a && (m = l - o - ot - v * (ot + ti)), h.push({ x: m, y: o });
      } else
        h.push({ x: o, y: o + v * (Mt + ei) });
    const f = "arrowhead", d = wa, g = wa, p = `
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
    let _ = "";
    for (let v = 0; v < e.length; v++) {
      const m = e[v], w = h[v], C = m.active ? m.color : "var(--lv-border, #333)", k = m.active ? ' filter="url(#glow)"' : "";
      _ += `
        <g class="step-group" style="transition-delay: ${v * 150}ms">
          <rect x="${w.x}" y="${w.y}" width="${ot}" height="${Mt}"
                rx="${ya}" ry="${ya}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${C}" stroke-width="${m.active ? 2.5 : 1.5}"
                ${k} />
          <text x="${w.x + ot / 2}" y="${w.y + 30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${ni(m.icon)}
          </text>
          <text x="${w.x + ot / 2}" y="${w.y + 54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${ni(m.label)}
          </text>
          <text x="${w.x + ot / 2}" y="${w.y + 70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${ni(m.sub)}
          </text>
        </g>`;
    }
    let x = "";
    for (let v = 0; v < e.length - 1; v++) {
      const m = h[v], w = h[v + 1], C = e.length * 150 + v * 120;
      let k;
      if (i) {
        const y = a ? m.x : m.x + ot, S = a ? w.x + ot : w.x, M = m.y + Mt / 2, E = Math.abs(S - y) * 0.35, z = S > y ? 1 : -1;
        k = `M${y},${M} C${y + z * E},${M} ${S - z * E},${M} ${S},${M}`;
      } else {
        const y = m.x + ot / 2, S = m.y + Mt, M = w.y, T = (M - S) * 0.4;
        k = `M${y},${S} C${y},${S + T} ${y},${M - T} ${y},${M}`;
      }
      const $ = i ? Math.abs(h[v + 1].x - h[v].x) + 20 : ei + Mt;
      x += `
        <path class="arrow-path" d="${k}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${ba}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${C}ms" />`;
    }
    if (s && e.length > 1) {
      const v = h[0], m = h[e.length - 1], w = e.length * 150 + (e.length - 1) * 120;
      let C, k;
      if (i) {
        const $ = m.x + ot / 2, y = v.x + ot / 2, S = m.y + Mt, M = v.y + Mt, T = Math.max(S, M) + tn;
        C = `M${$},${S} C${$},${T} ${y},${T} ${y},${M}`, k = Math.abs($ - y) + tn * 2;
      } else {
        const $ = m.x + ot, y = m.y + Mt / 2, S = v.y + Mt / 2, M = $ + tn;
        C = `M${$},${y} C${M},${y} ${M},${S} ${$},${S}`, k = Math.abs(y - S) + tn * 2;
      }
      x += `
        <path class="arrow-path" d="${C}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${ba}"
              marker-end="url(#${f})"
              stroke-dasharray="${k}"
              stroke-dashoffset="${k}"
              style="transition-delay: ${w}ms" />`;
    }
    const b = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${x}
        ${_}
      </svg>`;
    this.render(b);
  }
  animateIn(e) {
    e && (this.root.querySelectorAll(".step-group").forEach((r) => {
      r.style.transition = "none", r.style.opacity = "1", r.style.transform = "translateY(0)";
    }), this.root.querySelectorAll(".arrow-path").forEach((r) => {
      r.style.transition = "none", r.style.strokeDashoffset = "0";
    })), this.classList.add("lv-entered");
  }
}
class ig extends HTMLElement {
}
customElements.define("lv-flow", rg);
customElements.define("lv-flow-step", ig);
const sg = `
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
function ka(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
class ag extends I {
  constructor() {
    super(...arguments);
    D(this, "_items", []);
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(sg), this._readChildren(), this._renderTimeline();
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
            ${i.date ? `<div class="tl-date">${ka(i.date)}</div>` : ""}
            ${i.title ? `<div class="tl-title">${ka(i.title)}</div>` : ""}
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
class og extends HTMLElement {
}
customElements.define("lv-timeline", ag);
customElements.define("lv-timeline-item", og);
function Yt(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function Do(n, t) {
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
var wt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Xe = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, os, nt, X, St = 1e8, V = 1 / St, Ei = Math.PI * 2, lg = Ei / 4, cg = 0, Fo = Math.sqrt, ug = Math.cos, hg = Math.sin, et = function(t) {
  return typeof t == "string";
}, U = function(t) {
  return typeof t == "function";
}, Ut = function(t) {
  return typeof t == "number";
}, ls = function(t) {
  return typeof t > "u";
}, qt = function(t) {
  return typeof t == "object";
}, ft = function(t) {
  return t !== !1;
}, cs = function() {
  return typeof window < "u";
}, Yn = function(t) {
  return U(t) || et(t);
}, Io = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, st = Array.isArray, fg = /random\([^)]+\)/g, dg = /,\s*/g, Aa = /(?:-?\.?\d|\.)+/gi, qo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Pe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ri = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ho = /[+-]=-?[.\d]+/, pg = /[^,'"\[\]\s]+/gi, gg = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, j, Rt, Li, us, At = {}, wr = {}, Bo, Vo = function(t) {
  return (wr = Ye(t, At)) && mt;
}, hs = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, wn = function(t, e) {
  return !e && console.warn(t);
}, Xo = function(t, e) {
  return t && (At[t] = e) && wr && (wr[t] = e) || At;
}, kn = function() {
  return 0;
}, mg = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, tr = {
  suppressEvents: !0,
  kill: !1
}, _g = {
  suppressEvents: !0
}, fs = {}, ne = [], Pi = {}, Yo, vt = {}, ii = {}, $a = 30, er = [], ds = "", ps = function(t) {
  var e = t[0], r, i;
  if (qt(e) || U(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (i = er.length; i-- && !er[i].targetTest(e); )
      ;
    r = er[i];
  }
  for (i = t.length; i--; )
    t[i] && (t[i]._gsap || (t[i]._gsap = new gl(t[i], r))) || t.splice(i, 1);
  return t;
}, xe = function(t) {
  return t._gsap || ps(Tt(t))[0]._gsap;
}, Go = function(t, e, r) {
  return (r = t[e]) && U(r) ? t[e]() : ls(r) && t.getAttribute && t.getAttribute(e) || r;
}, dt = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, Z = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, G = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Ne = function(t, e) {
  var r = e.charAt(0), i = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i;
}, vg = function(t, e) {
  for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, kr = function() {
  var t = ne.length, e = ne.slice(0), r, i;
  for (Pi = {}, ne.length = 0, r = 0; r < t; r++)
    i = e[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, gs = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, jo = function(t, e, r, i) {
  ne.length && !nt && kr(), t.render(e, r, !!(nt && e < 0 && gs(t))), ne.length && !nt && kr();
}, Wo = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(pg).length < 2 ? e : et(t) ? t.trim() : t;
}, Uo = function(t) {
  return t;
}, $t = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, xg = function(t) {
  return function(e, r) {
    for (var i in r)
      i in e || i === "duration" && t || i === "ease" || (e[i] = r[i]);
  };
}, Ye = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, Ca = function n(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = qt(e[r]) ? n(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, Ar = function(t, e) {
  var r = {}, i;
  for (i in t)
    i in e || (r[i] = t[i]);
  return r;
}, fn = function(t) {
  var e = t.parent || j, r = t.keyframes ? xg(st(t.keyframes)) : $t;
  if (ft(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, yg = function(t, e) {
  for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, Ko = function(t, e, r, i, s) {
  var a = t[i], o;
  if (s)
    for (o = e[s]; a && a[s] > o; )
      a = a._prev;
  return a ? (e._next = a._next, a._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = a, e.parent = e._dp = t, e;
}, Rr = function(t, e, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = e._prev, a = e._next;
  s ? s._next = a : t[r] === e && (t[r] = a), a ? a._prev = s : t[i] === e && (t[i] = s), e._next = e._prev = e.parent = null;
}, ie = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, ye = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, bg = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, zi = function(t, e, r, i) {
  return t._startAt && (nt ? t._startAt.revert(tr) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i));
}, wg = function n(t) {
  return !t || t._ts && n(t.parent);
}, Sa = function(t) {
  return t._repeat ? Ge(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Ge = function(t, e) {
  var r = Math.floor(t = G(t / e));
  return t && r === t ? r - 1 : r;
}, $r = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Or = function(t) {
  return t._end = G(t._start + (t._tDur / Math.abs(t._ts || t._rts || V) || 0));
}, Nr = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = G(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Or(t), r._dirty || ye(r, t)), t;
}, Zo = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = $r(t.rawTime(), e), (!e._dur || Pn(0, e.totalDuration(), r) - e._tTime > V) && e.render(r, !0)), ye(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -V;
  }
}, Ot = function(t, e, r, i) {
  return e.parent && ie(e), e._start = G((Ut(r) ? r : r || t !== j ? Ct(t, r, e) : t._time) + e._delay), e._end = G(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Ko(t, e, "_first", "_last", t._sort ? "_start" : 0), Ri(e) || (t._recent = e), i || Zo(t, e), t._ts < 0 && Nr(t, t._tTime), t;
}, Qo = function(t, e) {
  return (At.ScrollTrigger || hs("scrollTrigger", e)) && At.ScrollTrigger.create(e, t);
}, Jo = function(t, e, r, i, s) {
  if (_s(t, e, s), !t._initted)
    return 1;
  if (!r && t._pt && !nt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Yo !== xt.frame)
    return ne.push(t), t._lazy = [s, i], 1;
}, kg = function n(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || n(e));
}, Ri = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Ag = function(t, e, r, i) {
  var s = t.ratio, a = e < 0 || !e && (!t._start && kg(t) && !(!t._initted && Ri(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ri(t)) ? 0 : 1, o = t._rDelay, c = 0, l, u, h;
  if (o && t._repeat && (c = Pn(0, t._tDur, e), u = Ge(c, o), t._yoyo && u & 1 && (a = 1 - a), u !== Ge(t._tTime, o) && (s = 1 - a, t.vars.repeatRefresh && t._initted && t.invalidate())), a !== s || nt || i || t._zTime === V || !e && t._zTime) {
    if (!t._initted && Jo(t, e, i, r, c))
      return;
    for (h = t._zTime, t._zTime = e || (r ? V : 0), r || (r = e && !h), t.ratio = a, t._from && (a = 1 - a), t._time = 0, t._tTime = c, l = t._pt; l; )
      l.r(a, l.d), l = l._next;
    e < 0 && zi(t, e, r, !0), t._onUpdate && !r && yt(t, "onUpdate"), c && t._repeat && !r && t.parent && yt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === a && (a && ie(t, 1), !r && !nt && (yt(t, a ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, $g = function(t, e, r) {
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
}, je = function(t, e, r, i) {
  var s = t._repeat, a = G(e) || 0, o = t._tTime / t._tDur;
  return o && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = s ? s < 0 ? 1e10 : G(a * (s + 1) + t._rDelay * s) : a, o > 0 && !i && Nr(t, t._tTime = t._tDur * o), t.parent && Or(t), r || ye(t.parent, t), t;
}, Ta = function(t) {
  return t instanceof lt ? ye(t) : je(t, t._dur);
}, Cg = {
  _start: 0,
  endTime: kn,
  totalDuration: kn
}, Ct = function n(t, e, r) {
  var i = t.labels, s = t._recent || Cg, a = t.duration() >= St ? s.endTime(!1) : t._dur, o, c, l;
  return et(e) && (isNaN(e) || e in i) ? (c = e.charAt(0), l = e.substr(-1) === "%", o = e.indexOf("="), c === "<" || c === ">" ? (o >= 0 && (e = e.replace(/=/, "")), (c === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (o < 0 ? s : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = a), i[e]) : (c = parseFloat(e.charAt(o - 1) + e.substr(o + 1)), l && r && (c = c / 100 * (st(r) ? r[0] : r).totalDuration()), o > 1 ? n(t, e.substr(0, o - 1), r) + c : a + c)) : e == null ? a : +e;
}, dn = function(t, e, r) {
  var i = Ut(e[1]), s = (i ? 2 : 1) + (t < 2 ? 0 : 1), a = e[s], o, c;
  if (i && (a.duration = e[1]), a.parent = r, t) {
    for (o = a, c = r; c && !("immediateRender" in o); )
      o = c.vars.defaults || {}, c = ft(c.vars.inherit) && c.parent;
    a.immediateRender = ft(o.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[s - 1];
  }
  return new Q(e[0], a, e[s + 1]);
}, oe = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Pn = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, it = function(t, e) {
  return !et(t) || !(e = gg.exec(t)) ? "" : e[1];
}, Sg = function(t, e, r) {
  return oe(r, function(i) {
    return Pn(t, e, i);
  });
}, Oi = [].slice, tl = function(t, e) {
  return t && qt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && qt(t[0])) && !t.nodeType && t !== Rt;
}, Tg = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(i) {
    var s;
    return et(i) && !e || tl(i, 1) ? (s = r).push.apply(s, Tt(i)) : r.push(i);
  }) || r;
}, Tt = function(t, e, r) {
  return X && !e && X.selector ? X.selector(t) : et(t) && !r && (Li || !We()) ? Oi.call((e || us).querySelectorAll(t), 0) : st(t) ? Tg(t, r) : tl(t) ? Oi.call(t, 0) : t ? [t] : [];
}, Ni = function(t) {
  return t = Tt(t)[0] || wn("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return Tt(e, r.querySelectorAll ? r : r === t ? wn("Invalid scope") || us.createElement("div") : t);
  };
}, el = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, nl = function(t) {
  if (U(t))
    return t;
  var e = qt(t) ? t : {
    each: t
  }, r = be(e.ease), i = e.from || 0, s = parseFloat(e.base) || 0, a = {}, o = i > 0 && i < 1, c = isNaN(i) || o, l = e.axis, u = i, h = i;
  return et(i) ? u = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && c && (u = i[0], h = i[1]), function(f, d, g) {
    var p = (g || e).length, _ = a[p], x, b, v, m, w, C, k, $, y;
    if (!_) {
      if (y = e.grid === "auto" ? 0 : (e.grid || [1, St])[1], !y) {
        for (k = -St; k < (k = g[y++].getBoundingClientRect().left) && y < p; )
          ;
        y < p && y--;
      }
      for (_ = a[p] = [], x = c ? Math.min(y, p) * u - 0.5 : i % y, b = y === St ? 0 : c ? p * h / y - 0.5 : i / y | 0, k = 0, $ = St, C = 0; C < p; C++)
        v = C % y - x, m = b - (C / y | 0), _[C] = w = l ? Math.abs(l === "y" ? m : v) : Fo(v * v + m * m), w > k && (k = w), w < $ && ($ = w);
      i === "random" && el(_), _.max = k - $, _.min = $, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (y > p ? p - 1 : l ? l === "y" ? p / y : y : Math.max(y, p / y)) || 0) * (i === "edges" ? -1 : 1), _.b = p < 0 ? s - p : s, _.u = it(e.amount || e.each) || 0, r = r && p < 0 ? fl(r) : r;
    }
    return p = (_[f] - _.min) / _.max || 0, G(_.b + (r ? r(p) : p) * _.v) + _.u;
  };
}, Di = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var i = G(Math.round(parseFloat(r) / t) * t * e);
    return (i - i % 1) / e + (Ut(r) ? 0 : it(r));
  };
}, rl = function(t, e) {
  var r = st(t), i, s;
  return !r && qt(t) && (i = r = t.radius || St, t.values ? (t = Tt(t.values), (s = !Ut(t[0])) && (i *= i)) : t = Di(t.increment)), oe(e, r ? U(t) ? function(a) {
    return s = t(a), Math.abs(s - a) <= i ? s : a;
  } : function(a) {
    for (var o = parseFloat(s ? a.x : a), c = parseFloat(s ? a.y : 0), l = St, u = 0, h = t.length, f, d; h--; )
      s ? (f = t[h].x - o, d = t[h].y - c, f = f * f + d * d) : f = Math.abs(t[h] - o), f < l && (l = f, u = h);
    return u = !i || l <= i ? t[u] : a, s || u === a || Ut(a) ? u : u + it(a);
  } : Di(t));
}, il = function(t, e, r, i) {
  return oe(st(t) ? !e : r === !0 ? !!(r = 0) : !i, function() {
    return st(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i;
  });
}, Mg = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(i) {
    return e.reduce(function(s, a) {
      return a(s);
    }, i);
  };
}, Eg = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || it(r));
  };
}, Lg = function(t, e, r) {
  return al(t, e, 0, 1, r);
}, sl = function(t, e, r) {
  return oe(r, function(i) {
    return t[~~e(i)];
  });
}, Pg = function n(t, e, r) {
  var i = e - t;
  return st(t) ? sl(t, n(0, t.length), e) : oe(r, function(s) {
    return (i + (s - t) % i) % i + t;
  });
}, zg = function n(t, e, r) {
  var i = e - t, s = i * 2;
  return st(t) ? sl(t, n(0, t.length - 1), e) : oe(r, function(a) {
    return a = (s + (a - t) % s) % s || 0, t + (a > i ? s - a : a);
  });
}, An = function(t) {
  return t.replace(fg, function(e) {
    var r = e.indexOf("[") + 1, i = e.substring(r || 7, r ? e.indexOf("]") : e.length - 1).split(dg);
    return il(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
  });
}, al = function(t, e, r, i, s) {
  var a = e - t, o = i - r;
  return oe(s, function(c) {
    return r + ((c - t) / a * o || 0);
  });
}, Rg = function n(t, e, r, i) {
  var s = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!s) {
    var a = et(t), o = {}, c, l, u, h, f;
    if (r === !0 && (i = 1) && (r = null), a)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (st(t) && !st(e)) {
      for (u = [], h = t.length, f = h - 2, l = 1; l < h; l++)
        u.push(n(t[l - 1], t[l]));
      h--, s = function(g) {
        g *= h;
        var p = Math.min(f, ~~g);
        return u[p](g - p);
      }, r = e;
    } else i || (t = Ye(st(t) ? [] : {}, t));
    if (!u) {
      for (c in e)
        ms.call(o, t, c, "get", e[c]);
      s = function(g) {
        return ys(g, o) || (a ? t.p : t);
      };
    }
  }
  return oe(r, s);
}, Ma = function(t, e, r) {
  var i = t.labels, s = St, a, o, c;
  for (a in i)
    o = i[a] - e, o < 0 == !!r && o && s > (o = Math.abs(o)) && (c = a, s = o);
  return c;
}, yt = function(t, e, r) {
  var i = t.vars, s = i[e], a = X, o = t._ctx, c, l, u;
  if (s)
    return c = i[e + "Params"], l = i.callbackScope || t, r && ne.length && kr(), o && (X = o), u = c ? s.apply(l, c) : s.call(l), X = a, u;
}, cn = function(t) {
  return ie(t), t.scrollTrigger && t.scrollTrigger.kill(!!nt), t.progress() < 1 && yt(t, "onInterrupt"), t;
}, ze, ol = [], ll = function(t) {
  if (t)
    if (t = !t.name && t.default || t, cs() || t.headless) {
      var e = t.name, r = U(t), i = e && !r && t.init ? function() {
        this._props = [];
      } : t, s = {
        init: kn,
        render: ys,
        add: ms,
        kill: Kg,
        modifier: Ug,
        rawVars: 0
      }, a = {
        targetTest: 0,
        get: 0,
        getSetter: xs,
        aliases: {},
        register: 0
      };
      if (We(), t !== i) {
        if (vt[e])
          return;
        $t(i, $t(Ar(t, s), a)), Ye(i.prototype, Ye(s, Ar(t, a))), vt[i.prop = e] = i, t.targetTest && (er.push(i), fs[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Xo(e, i), t.register && t.register(mt, i, pt);
    } else
      ol.push(t);
}, B = 255, un = {
  aqua: [0, B, B],
  lime: [0, B, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, B],
  navy: [0, 0, 128],
  white: [B, B, B],
  olive: [128, 128, 0],
  yellow: [B, B, 0],
  orange: [B, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [B, 0, 0],
  pink: [B, 192, 203],
  cyan: [0, B, B],
  transparent: [B, B, B, 0]
}, si = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * B + 0.5 | 0;
}, cl = function(t, e, r) {
  var i = t ? Ut(t) ? [t >> 16, t >> 8 & B, t & B] : 0 : un.black, s, a, o, c, l, u, h, f, d, g;
  if (!i) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), un[t])
      i = un[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (s = t.charAt(1), a = t.charAt(2), o = t.charAt(3), t = "#" + s + s + a + a + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & B, i & B, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & B, t & B];
    } else if (t.substr(0, 3) === "hsl") {
      if (i = g = t.match(Aa), !e)
        c = +i[0] % 360 / 360, l = +i[1] / 100, u = +i[2] / 100, a = u <= 0.5 ? u * (l + 1) : u + l - u * l, s = u * 2 - a, i.length > 3 && (i[3] *= 1), i[0] = si(c + 1 / 3, s, a), i[1] = si(c, s, a), i[2] = si(c - 1 / 3, s, a);
      else if (~t.indexOf("="))
        return i = t.match(qo), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = t.match(Aa) || un.transparent;
    i = i.map(Number);
  }
  return e && !g && (s = i[0] / B, a = i[1] / B, o = i[2] / B, h = Math.max(s, a, o), f = Math.min(s, a, o), u = (h + f) / 2, h === f ? c = l = 0 : (d = h - f, l = u > 0.5 ? d / (2 - h - f) : d / (h + f), c = h === s ? (a - o) / d + (a < o ? 6 : 0) : h === a ? (o - s) / d + 2 : (s - a) / d + 4, c *= 60), i[0] = ~~(c + 0.5), i[1] = ~~(l * 100 + 0.5), i[2] = ~~(u * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, ul = function(t) {
  var e = [], r = [], i = -1;
  return t.split(re).forEach(function(s) {
    var a = s.match(Pe) || [];
    e.push.apply(e, a), r.push(i += a.length + 1);
  }), e.c = r, e;
}, Ea = function(t, e, r) {
  var i = "", s = (t + i).match(re), a = e ? "hsla(" : "rgba(", o = 0, c, l, u, h;
  if (!s)
    return t;
  if (s = s.map(function(f) {
    return (f = cl(f, e, 1)) && a + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), r && (u = ul(t), c = r.c, c.join(i) !== u.c.join(i)))
    for (l = t.replace(re, "1").split(Pe), h = l.length - 1; o < h; o++)
      i += l[o] + (~c.indexOf(o) ? s.shift() || a + "0,0,0,0)" : (u.length ? u : s.length ? s : r).shift());
  if (!l)
    for (l = t.split(re), h = l.length - 1; o < h; o++)
      i += l[o] + s[o];
  return i + l[h];
}, re = (function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in un)
    n += "|" + t + "\\b";
  return new RegExp(n + ")", "gi");
})(), Og = /hsl[a]?\(/, hl = function(t) {
  var e = t.join(" "), r;
  if (re.lastIndex = 0, re.test(e))
    return r = Og.test(e), t[1] = Ea(t[1], r), t[0] = Ea(t[0], r, ul(t[1])), !0;
}, $n, xt = (function() {
  var n = Date.now, t = 500, e = 33, r = n(), i = r, s = 1e3 / 240, a = s, o = [], c, l, u, h, f, d, g = function p(_) {
    var x = n() - i, b = _ === !0, v, m, w, C;
    if ((x > t || x < 0) && (r += x - e), i += x, w = i - r, v = w - a, (v > 0 || b) && (C = ++h.frame, f = w - h.time * 1e3, h.time = w = w / 1e3, a += v + (v >= s ? 4 : s - v), m = 1), b || (c = l(p)), m)
      for (d = 0; d < o.length; d++)
        o[d](w, f, C, _);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(_) {
      return f / (1e3 / (_ || 60));
    },
    wake: function() {
      Bo && (!Li && cs() && (Rt = Li = window, us = Rt.document || {}, At.gsap = mt, (Rt.gsapVersions || (Rt.gsapVersions = [])).push(mt.version), Vo(wr || Rt.GreenSockGlobals || !Rt.gsap && Rt || {}), ol.forEach(ll)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && h.sleep(), l = u || function(_) {
        return setTimeout(_, a - h.time * 1e3 + 1 | 0);
      }, $n = 1, g(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(c), $n = 0, l = kn;
    },
    lagSmoothing: function(_, x) {
      t = _ || 1 / 0, e = Math.min(x || 33, t);
    },
    fps: function(_) {
      s = 1e3 / (_ || 240), a = h.time * 1e3 + s;
    },
    add: function(_, x, b) {
      var v = x ? function(m, w, C, k) {
        _(m, w, C, k), h.remove(v);
      } : _;
      return h.remove(_), o[b ? "unshift" : "push"](v), We(), v;
    },
    remove: function(_, x) {
      ~(x = o.indexOf(_)) && o.splice(x, 1) && d >= x && d--;
    },
    _listeners: o
  }, h;
})(), We = function() {
  return !$n && xt.wake();
}, H = {}, Ng = /^[\d.\-M][\d.\-,\s]/, Dg = /["']/g, Fg = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], s = 1, a = r.length, o, c, l; s < a; s++)
    c = r[s], o = s !== a - 1 ? c.lastIndexOf(",") : c.length, l = c.substr(0, o), e[i] = isNaN(l) ? l.replace(Dg, "").trim() : +l, i = c.substr(o + 1).trim();
  return e;
}, Ig = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e);
  return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
}, qg = function(t) {
  var e = (t + "").split("("), r = H[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [Fg(e[1])] : Ig(t).split(",").map(Wo)) : H._CE && Ng.test(t) ? H._CE("", t) : r;
}, fl = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, dl = function n(t, e) {
  for (var r = t._first, i; r; )
    r instanceof lt ? n(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? n(r.timeline, e) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = e)), r = r._next;
}, be = function(t, e) {
  return t && (U(t) ? t : H[t] || qg(t)) || e;
}, Ce = function(t, e, r, i) {
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
  return dt(t, function(o) {
    H[o] = At[o] = s, H[a = o.toLowerCase()] = r;
    for (var c in s)
      H[a + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = H[o + "." + c] = s[c];
  }), s;
}, pl = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ai = function n(t, e, r) {
  var i = e >= 1 ? e : 1, s = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), a = s / Ei * (Math.asin(1 / i) || 0), o = function(u) {
    return u === 1 ? 1 : i * Math.pow(2, -10 * u) * hg((u - a) * s) + 1;
  }, c = t === "out" ? o : t === "in" ? function(l) {
    return 1 - o(1 - l);
  } : pl(o);
  return s = Ei / s, c.config = function(l, u) {
    return n(t, l, u);
  }, c;
}, oi = function n(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(a) {
    return a ? --a * a * ((e + 1) * a + e) + 1 : 0;
  }, i = t === "out" ? r : t === "in" ? function(s) {
    return 1 - r(1 - s);
  } : pl(r);
  return i.config = function(s) {
    return n(t, s);
  }, i;
};
dt("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, t) {
  var e = t < 5 ? t + 1 : t;
  Ce(n + ",Power" + (e - 1), t ? function(r) {
    return Math.pow(r, e);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, e);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2;
  });
});
H.Linear.easeNone = H.none = H.Linear.easeIn;
Ce("Elastic", ai("in"), ai("out"), ai());
(function(n, t) {
  var e = 1 / t, r = 2 * e, i = 2.5 * e, s = function(o) {
    return o < e ? n * o * o : o < r ? n * Math.pow(o - 1.5 / t, 2) + 0.75 : o < i ? n * (o -= 2.25 / t) * o + 0.9375 : n * Math.pow(o - 2.625 / t, 2) + 0.984375;
  };
  Ce("Bounce", function(a) {
    return 1 - s(1 - a);
  }, s);
})(7.5625, 2.75);
Ce("Expo", function(n) {
  return Math.pow(2, 10 * (n - 1)) * n + n * n * n * n * n * n * (1 - n);
});
Ce("Circ", function(n) {
  return -(Fo(1 - n * n) - 1);
});
Ce("Sine", function(n) {
  return n === 1 ? 1 : -ug(n * lg) + 1;
});
Ce("Back", oi("in"), oi("out"), oi());
H.SteppedEase = H.steps = At.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, i = t + (e ? 0 : 1), s = e ? 1 : 0, a = 1 - V;
    return function(o) {
      return ((i * Pn(0, a, o) | 0) + s) * r;
    };
  }
};
Xe.ease = H["quad.out"];
dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return ds += n + "," + n + "Params,";
});
var gl = function(t, e) {
  this.id = cg++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Go, this.set = e ? e.getSetter : xs;
}, Cn = /* @__PURE__ */ (function() {
  function n(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, je(this, +e.duration, 1, 1), this.data = e.data, X && (this._ctx = X, X.data.push(this)), $n || xt.wake();
  }
  var t = n.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, je(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, i) {
    if (We(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Nr(this, r), !s._dp || s.parent || Zo(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ot(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === V || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), jo(this, r, i)), this;
  }, t.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + Sa(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, t.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + Sa(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? Ge(this._tTime, s) + 1 : 1;
  }, t.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -V ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? $r(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -V ? 0 : this._rts, this.totalTime(Pn(-Math.abs(this._delay), this.totalDuration(), s), i !== !1), Or(this), bg(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (We(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== V && (this._tTime -= V)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = G(r);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Ot(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (ft(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? $r(i.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = _g);
    var i = nt;
    return nt = r, gs(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), nt = i, this;
  }, t.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, Ta(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, Ta(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, t.seek = function(r, i) {
    return this.totalTime(Ct(this, r), ft(i));
  }, t.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, ft(i)), this._dur || (this._zTime = -V), this;
  }, t.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, t.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, t.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -V : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -V, this;
  }, t.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - V);
  }, t.eventCallback = function(r, i, s) {
    var a = this.vars;
    return arguments.length > 1 ? (i ? (a[r] = i, s && (a[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete a[r], this) : a[r];
  }, t.then = function(r) {
    var i = this, s = i._prom;
    return new Promise(function(a) {
      var o = U(r) ? r : Uo, c = function() {
        var u = i.then;
        i.then = null, s && s(), U(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), a(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? c() : i._prom = c;
    });
  }, t.kill = function() {
    cn(this);
  }, n;
})();
$t(Cn.prototype, {
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
var lt = /* @__PURE__ */ (function(n) {
  Do(t, n);
  function t(r, i) {
    var s;
    return r === void 0 && (r = {}), s = n.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = ft(r.sortChildren), j && Ot(r.parent || j, Yt(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Qo(Yt(s), r.scrollTrigger), s;
  }
  var e = t.prototype;
  return e.to = function(i, s, a) {
    return dn(0, arguments, this), this;
  }, e.from = function(i, s, a) {
    return dn(1, arguments, this), this;
  }, e.fromTo = function(i, s, a, o) {
    return dn(2, arguments, this), this;
  }, e.set = function(i, s, a) {
    return s.duration = 0, s.parent = this, fn(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new Q(i, s, Ct(this, a), 1), this;
  }, e.call = function(i, s, a) {
    return Ot(this, Q.delayedCall(0, i, s), a);
  }, e.staggerTo = function(i, s, a, o, c, l, u) {
    return a.duration = s, a.stagger = a.stagger || o, a.onComplete = l, a.onCompleteParams = u, a.parent = this, new Q(i, a, Ct(this, c)), this;
  }, e.staggerFrom = function(i, s, a, o, c, l, u) {
    return a.runBackwards = 1, fn(a).immediateRender = ft(a.immediateRender), this.staggerTo(i, s, a, o, c, l, u);
  }, e.staggerFromTo = function(i, s, a, o, c, l, u, h) {
    return o.startAt = a, fn(o).immediateRender = ft(o.immediateRender), this.staggerTo(i, s, o, c, l, u, h);
  }, e.render = function(i, s, a) {
    var o = this._time, c = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, u = i <= 0 ? 0 : G(i), h = this._zTime < 0 != i < 0 && (this._initted || !l), f, d, g, p, _, x, b, v, m, w, C, k;
    if (this !== j && u > c && i >= 0 && (u = c), u !== this._tTime || a || h) {
      if (o !== this._time && l && (u += this._time - o, i += this._time - o), f = u, m = this._start, v = this._ts, x = !v, h && (l || (o = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (C = this._yoyo, _ = l + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(_ * 100 + i, s, a);
        if (f = G(u % _), u === c ? (p = this._repeat, f = l) : (w = G(u / _), p = ~~w, p && p === w && (f = l, p--), f > l && (f = l)), w = Ge(this._tTime, _), !o && this._tTime && w !== p && this._tTime - w * _ - this._dur <= 0 && (w = p), C && p & 1 && (f = l - f, k = 1), p !== w && !this._lock) {
          var $ = C && w & 1, y = $ === (C && p & 1);
          if (p < w && ($ = !$), o = $ ? 0 : u % l ? l : u, this._lock = 1, this.render(o || (k ? 0 : G(p * _)), s, !l)._lock = 0, this._tTime = u, !s && this.parent && yt(this, "onRepeat"), this.vars.repeatRefresh && !k && (this.invalidate()._lock = 1, w = p), o && o !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, c = this._tDur, y && (this._lock = 2, o = $ ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !k && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          dl(this, k);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (b = $g(this, G(o), G(f)), b && (u -= f - (f = b._start))), this._tTime = u, this._time = f, this._act = !v, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && u && l && !s && !w && (yt(this, "onStart"), this._tTime !== u))
        return this;
      if (f >= o && i >= 0)
        for (d = this._first; d; ) {
          if (g = d._next, (d._act || f >= d._start) && d._ts && b !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (f - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (f - d._start) * d._ts, s, a), f !== this._time || !this._ts && !x) {
              b = 0, g && (u += this._zTime = -V);
              break;
            }
          }
          d = g;
        }
      else {
        d = this._last;
        for (var S = i < 0 ? i : f; d; ) {
          if (g = d._prev, (d._act || S <= d._end) && d._ts && b !== d) {
            if (d.parent !== this)
              return this.render(i, s, a);
            if (d.render(d._ts > 0 ? (S - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (S - d._start) * d._ts, s, a || nt && gs(d)), f !== this._time || !this._ts && !x) {
              b = 0, g && (u += this._zTime = S ? -V : V);
              break;
            }
          }
          d = g;
        }
      }
      if (b && !s && (this.pause(), b.render(f >= o ? 0 : -V)._zTime = f >= o ? 1 : -1, this._ts))
        return this._start = m, Or(this), this.render(i, s, a);
      this._onUpdate && !s && yt(this, "onUpdate", !0), (u === c && this._tTime >= this.totalDuration() || !u && o) && (m === this._start || Math.abs(v) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (u === c && this._ts > 0 || !u && this._ts < 0) && ie(this, 1), !s && !(i < 0 && !o) && (u || o || !c) && (yt(this, u === c && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(i, s) {
    var a = this;
    if (Ut(s) || (s = Ct(this, s, i)), !(i instanceof Cn)) {
      if (st(i))
        return i.forEach(function(o) {
          return a.add(o, s);
        }), this;
      if (et(i))
        return this.addLabel(i, s);
      if (U(i))
        i = Q.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Ot(this, i, s) : this;
  }, e.getChildren = function(i, s, a, o) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), a === void 0 && (a = !0), o === void 0 && (o = -St);
    for (var c = [], l = this._first; l; )
      l._start >= o && (l instanceof Q ? s && c.push(l) : (a && c.push(l), i && c.push.apply(c, l.getChildren(!0, s, a)))), l = l._next;
    return c;
  }, e.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), a = s.length; a--; )
      if (s[a].vars.id === i)
        return s[a];
  }, e.remove = function(i) {
    return et(i) ? this.removeLabel(i) : U(i) ? this.killTweensOf(i) : (i.parent === this && Rr(this, i), i === this._recent && (this._recent = this._last), ye(this));
  }, e.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = G(xt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(i, s) {
    return this.labels[i] = Ct(this, s), this;
  }, e.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, e.addPause = function(i, s, a) {
    var o = Q.delayedCall(0, s || kn, a);
    return o.data = "isPause", this._hasPause = 1, Ot(this, o, Ct(this, i));
  }, e.removePause = function(i) {
    var s = this._first;
    for (i = Ct(this, i); s; )
      s._start === i && s.data === "isPause" && ie(s), s = s._next;
  }, e.killTweensOf = function(i, s, a) {
    for (var o = this.getTweensOf(i, a), c = o.length; c--; )
      Jt !== o[c] && o[c].kill(i, s);
    return this;
  }, e.getTweensOf = function(i, s) {
    for (var a = [], o = Tt(i), c = this._first, l = Ut(s), u; c; )
      c instanceof Q ? vg(c._targets, o) && (l ? (!Jt || c._initted && c._ts) && c.globalTime(0) <= s && c.globalTime(c.totalDuration()) > s : !s || c.isActive()) && a.push(c) : (u = c.getTweensOf(o, s)).length && a.push.apply(a, u), c = c._next;
    return a;
  }, e.tweenTo = function(i, s) {
    s = s || {};
    var a = this, o = Ct(a, i), c = s, l = c.startAt, u = c.onStart, h = c.onStartParams, f = c.immediateRender, d, g = Q.to(a, $t({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale()) || V,
      onStart: function() {
        if (a.pause(), !d) {
          var _ = s.duration || Math.abs((o - (l && "time" in l ? l.time : a._time)) / a.timeScale());
          g._dur !== _ && je(g, _, 0, 1).render(g._time, !0, !0), d = 1;
        }
        u && u.apply(g, h || []);
      }
    }, s));
    return f ? g.render(0) : g;
  }, e.tweenFromTo = function(i, s, a) {
    return this.tweenTo(s, $t({
      startAt: {
        time: Ct(this, i)
      }
    }, a));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(i) {
    return i === void 0 && (i = this._time), Ma(this, Ct(this, i));
  }, e.previousLabel = function(i) {
    return i === void 0 && (i = this._time), Ma(this, Ct(this, i), 1);
  }, e.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + V);
  }, e.shiftChildren = function(i, s, a) {
    a === void 0 && (a = 0);
    var o = this._first, c = this.labels, l;
    for (i = G(i); o; )
      o._start >= a && (o._start += i, o._end += i), o = o._next;
    if (s)
      for (l in c)
        c[l] >= a && (c[l] += i);
    return ye(this);
  }, e.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return n.prototype.invalidate.call(this, i);
  }, e.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, a; s; )
      a = s._next, this.remove(s), s = a;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), ye(this);
  }, e.totalDuration = function(i) {
    var s = 0, a = this, o = a._last, c = St, l, u, h;
    if (arguments.length)
      return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -i : i));
    if (a._dirty) {
      for (h = a.parent; o; )
        l = o._prev, o._dirty && o.totalDuration(), u = o._start, u > c && a._sort && o._ts && !a._lock ? (a._lock = 1, Ot(a, o, u - o._delay, 1)._lock = 0) : c = u, u < 0 && o._ts && (s -= u, (!h && !a._dp || h && h.smoothChildTiming) && (a._start += G(u / a._ts), a._time -= u, a._tTime -= u), a.shiftChildren(-u, !1, -1 / 0), c = 0), o._end > s && o._ts && (s = o._end), o = l;
      je(a, a === j && a._time > s ? a._time : s, 1, 1), a._dirty = 0;
    }
    return a._tDur;
  }, t.updateRoot = function(i) {
    if (j._ts && (jo(j, $r(i, j)), Yo = xt.frame), xt.frame >= $a) {
      $a += wt.autoSleep || 120;
      var s = j._first;
      if ((!s || !s._ts) && wt.autoSleep && xt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || xt.sleep();
      }
    }
  }, t;
})(Cn);
$t(lt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Hg = function(t, e, r, i, s, a, o) {
  var c = new pt(this._pt, t, e, 0, 1, bl, null, s), l = 0, u = 0, h, f, d, g, p, _, x, b;
  for (c.b = r, c.e = i, r += "", i += "", (x = ~i.indexOf("random(")) && (i = An(i)), a && (b = [r, i], a(b, t, e), r = b[0], i = b[1]), f = r.match(ri) || []; h = ri.exec(i); )
    g = h[0], p = i.substring(l, h.index), d ? d = (d + 1) % 5 : p.substr(-5) === "rgba(" && (d = 1), g !== f[u++] && (_ = parseFloat(f[u - 1]) || 0, c._pt = {
      _next: c._pt,
      p: p || u === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: g.charAt(1) === "=" ? Ne(_, g) - _ : parseFloat(g) - _,
      m: d && d < 4 ? Math.round : 0
    }, l = ri.lastIndex);
  return c.c = l < i.length ? i.substring(l, i.length) : "", c.fp = o, (Ho.test(i) || x) && (c.e = 0), this._pt = c, c;
}, ms = function(t, e, r, i, s, a, o, c, l, u) {
  U(i) && (i = i(s || 0, t, a));
  var h = t[e], f = r !== "get" ? r : U(h) ? l ? t[e.indexOf("set") || !U(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, d = U(h) ? l ? Gg : xl : vs, g;
  if (et(i) && (~i.indexOf("random(") && (i = An(i)), i.charAt(1) === "=" && (g = Ne(f, i) + (it(f) || 0), (g || g === 0) && (i = g))), !u || f !== i || Fi)
    return !isNaN(f * i) && i !== "" ? (g = new pt(this._pt, t, e, +f || 0, i - (f || 0), typeof h == "boolean" ? Wg : yl, 0, d), l && (g.fp = l), o && g.modifier(o, this, t), this._pt = g) : (!h && !(e in t) && hs(e, i), Hg.call(this, t, e, f, i, d, c || wt.stringFilter, l));
}, Bg = function(t, e, r, i, s) {
  if (U(t) && (t = pn(t, s, e, r, i)), !qt(t) || t.style && t.nodeType || st(t) || Io(t))
    return et(t) ? pn(t, s, e, r, i) : t;
  var a = {}, o;
  for (o in t)
    a[o] = pn(t[o], s, e, r, i);
  return a;
}, ml = function(t, e, r, i, s, a) {
  var o, c, l, u;
  if (vt[t] && (o = new vt[t]()).init(s, o.rawVars ? e[t] : Bg(e[t], i, s, a, r), r, i, a) !== !1 && (r._pt = c = new pt(r._pt, s, t, 0, 1, o.render, o, 0, o.priority), r !== ze))
    for (l = r._ptLookup[r._targets.indexOf(s)], u = o._props.length; u--; )
      l[o._props[u]] = c;
  return o;
}, Jt, Fi, _s = function n(t, e, r) {
  var i = t.vars, s = i.ease, a = i.startAt, o = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, h = i.yoyoEase, f = i.keyframes, d = i.autoRevert, g = t._dur, p = t._startAt, _ = t._targets, x = t.parent, b = x && x.data === "nested" ? x.vars.targets : _, v = t._overwrite === "auto" && !os, m = t.timeline, w, C, k, $, y, S, M, T, E, z, A, L, P;
  if (m && (!f || !s) && (s = "none"), t._ease = be(s, Xe.ease), t._yEase = h ? fl(be(h === !0 ? s : h, Xe.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !m && !!i.runBackwards, !m || f && !i.stagger) {
    if (T = _[0] ? xe(_[0]).harness : 0, L = T && i[T.prop], w = Ar(i, fs), p && (p._zTime < 0 && p.progress(1), e < 0 && u && o && !d ? p.render(-1, !0) : p.revert(u && g ? tr : mg), p._lazy = 0), a) {
      if (ie(t._startAt = Q.set(_, $t({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !p && ft(c),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return yt(t, "onUpdate");
        },
        stagger: 0
      }, a))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (nt || !o && !d) && t._startAt.revert(tr), o && g && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (u && g && !p) {
      if (e && (o = !1), k = $t({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !p && ft(c),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, w), L && (k[T.prop] = L), ie(t._startAt = Q.set(_, k)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (nt ? t._startAt.revert(tr) : t._startAt.render(-1, !0)), t._zTime = e, !o)
        n(t._startAt, V, V);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, c = g && ft(c) || c && !g, C = 0; C < _.length; C++) {
      if (y = _[C], M = y._gsap || ps(_)[C]._gsap, t._ptLookup[C] = z = {}, Pi[M.id] && ne.length && kr(), A = b === _ ? C : b.indexOf(y), T && (E = new T()).init(y, L || w, t, A, b) !== !1 && (t._pt = $ = new pt(t._pt, y, E.name, 0, 1, E.render, E, 0, E.priority), E._props.forEach(function(O) {
        z[O] = $;
      }), E.priority && (S = 1)), !T || L)
        for (k in w)
          vt[k] && (E = ml(k, w, t, A, y, b)) ? E.priority && (S = 1) : z[k] = $ = ms.call(t, y, k, "get", w[k], A, b, 0, i.stringFilter);
      t._op && t._op[C] && t.kill(y, t._op[C]), v && t._pt && (Jt = t, j.killTweensOf(y, z, t.globalTime(e)), P = !t.parent, Jt = 0), t._pt && c && (Pi[M.id] = 1);
    }
    S && wl(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !P, f && e <= 0 && m.render(St, !0, !0);
}, Vg = function(t, e, r, i, s, a, o, c) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], u, h, f, d;
  if (!l)
    for (l = t._ptCache[e] = [], f = t._ptLookup, d = t._targets.length; d--; ) {
      if (u = f[d][e], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== e && u.fp !== e; )
          u = u._next;
      if (!u)
        return Fi = 1, t.vars[e] = "+=0", _s(t, o), Fi = 0, c ? wn(e + " not eligible for reset") : 1;
      l.push(u);
    }
  for (d = l.length; d--; )
    h = l[d], u = h._pt || h, u.s = (i || i === 0) && !s ? i : u.s + (i || 0) + a * u.c, u.c = r - u.s, h.e && (h.e = Z(r) + it(h.e)), h.b && (h.b = u.s + it(h.b));
}, Xg = function(t, e) {
  var r = t[0] ? xe(t[0]).harness : 0, i = r && r.aliases, s, a, o, c;
  if (!i)
    return e;
  s = Ye({}, e);
  for (a in i)
    if (a in s)
      for (c = i[a].split(","), o = c.length; o--; )
        s[c[o]] = s[a];
  return s;
}, Yg = function(t, e, r, i) {
  var s = e.ease || i || "power1.inOut", a, o;
  if (st(e))
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
}, pn = function(t, e, r, i, s) {
  return U(t) ? t.call(e, r, i, s) : et(t) && ~t.indexOf("random(") ? An(t) : t;
}, _l = ds + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", vl = {};
dt(_l + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return vl[n] = 1;
});
var Q = /* @__PURE__ */ (function(n) {
  Do(t, n);
  function t(r, i, s, a) {
    var o;
    typeof i == "number" && (s.duration = i, i = s, s = null), o = n.call(this, a ? i : fn(i)) || this;
    var c = o.vars, l = c.duration, u = c.delay, h = c.immediateRender, f = c.stagger, d = c.overwrite, g = c.keyframes, p = c.defaults, _ = c.scrollTrigger, x = c.yoyoEase, b = i.parent || j, v = (st(r) || Io(r) ? Ut(r[0]) : "length" in i) ? [r] : Tt(r), m, w, C, k, $, y, S, M;
    if (o._targets = v.length ? ps(v) : wn("GSAP target " + r + " not found. https://gsap.com", !wt.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = d, g || f || Yn(l) || Yn(u)) {
      if (i = o.vars, m = o.timeline = new lt({
        data: "nested",
        defaults: p || {},
        targets: b && b.data === "nested" ? b.vars.targets : v
      }), m.kill(), m.parent = m._dp = Yt(o), m._start = 0, f || Yn(l) || Yn(u)) {
        if (k = v.length, S = f && nl(f), qt(f))
          for ($ in f)
            ~_l.indexOf($) && (M || (M = {}), M[$] = f[$]);
        for (w = 0; w < k; w++)
          C = Ar(i, vl), C.stagger = 0, x && (C.yoyoEase = x), M && Ye(C, M), y = v[w], C.duration = +pn(l, Yt(o), w, y, v), C.delay = (+pn(u, Yt(o), w, y, v) || 0) - o._delay, !f && k === 1 && C.delay && (o._delay = u = C.delay, o._start += u, C.delay = 0), m.to(y, C, S ? S(w, y, v) : 0), m._ease = H.none;
        m.duration() ? l = u = 0 : o.timeline = 0;
      } else if (g) {
        fn($t(m.vars.defaults, {
          ease: "none"
        })), m._ease = be(g.ease || i.ease || "none");
        var T = 0, E, z, A;
        if (st(g))
          g.forEach(function(L) {
            return m.to(v, L, ">");
          }), m.duration();
        else {
          C = {};
          for ($ in g)
            $ === "ease" || $ === "easeEach" || Yg($, g[$], C, g.easeEach);
          for ($ in C)
            for (E = C[$].sort(function(L, P) {
              return L.t - P.t;
            }), T = 0, w = 0; w < E.length; w++)
              z = E[w], A = {
                ease: z.e,
                duration: (z.t - (w ? E[w - 1].t : 0)) / 100 * l
              }, A[$] = z.v, m.to(v, A, T), T += A.duration;
          m.duration() < l && m.to({}, {
            duration: l - m.duration()
          });
        }
      }
      l || o.duration(l = m.duration());
    } else
      o.timeline = 0;
    return d === !0 && !os && (Jt = Yt(o), j.killTweensOf(v), Jt = 0), Ot(b, Yt(o), s), i.reversed && o.reverse(), i.paused && o.paused(!0), (h || !l && !g && o._start === G(b._time) && ft(h) && wg(Yt(o)) && b.data !== "nested") && (o._tTime = -V, o.render(Math.max(0, -u) || 0)), _ && Qo(Yt(o), _), o;
  }
  var e = t.prototype;
  return e.render = function(i, s, a) {
    var o = this._time, c = this._tDur, l = this._dur, u = i < 0, h = i > c - V && !u ? c : i < V ? 0 : i, f, d, g, p, _, x, b, v, m;
    if (!l)
      Ag(this, i, s, a);
    else if (h !== this._tTime || !i || a || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (f = h, v = this.timeline, this._repeat) {
        if (p = l + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(p * 100 + i, s, a);
        if (f = G(h % p), h === c ? (g = this._repeat, f = l) : (_ = G(h / p), g = ~~_, g && g === _ ? (f = l, g--) : f > l && (f = l)), x = this._yoyo && g & 1, x && (m = this._yEase, f = l - f), _ = Ge(this._tTime, p), f === o && !a && this._initted && g === _)
          return this._tTime = h, this;
        g !== _ && (v && this._yEase && dl(v, x), this.vars.repeatRefresh && !x && !this._lock && f !== p && this._initted && (this._lock = a = 1, this.render(G(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Jo(this, u ? i : f, a, s, h))
          return this._tTime = 0, this;
        if (o !== this._time && !(a && this.vars.repeatRefresh && g !== _))
          return this;
        if (l !== this._dur)
          return this.render(i, s, a);
      }
      if (this._tTime = h, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = b = (m || this._ease)(f / l), this._from && (this.ratio = b = 1 - b), !o && h && !s && !_ && (yt(this, "onStart"), this._tTime !== h))
        return this;
      for (d = this._pt; d; )
        d.r(b, d.d), d = d._next;
      v && v.render(i < 0 ? i : v._dur * v._ease(f / this._dur), s, a) || this._startAt && (this._zTime = i), this._onUpdate && !s && (u && zi(this, i, s, a), yt(this, "onUpdate")), this._repeat && g !== _ && this.vars.onRepeat && !s && this.parent && yt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (u && !this._onUpdate && zi(this, i, !0, !0), (i || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && ie(this, 1), !s && !(u && !o) && (h || o || x) && (yt(this, h === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, e.resetTo = function(i, s, a, o, c) {
    $n || xt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || _s(this, l), u = this._ease(l / this._dur), Vg(this, i, s, a, o, u, l, c) ? this.resetTo(i, s, a, o, 1) : (Nr(this, 0), this.parent || Ko(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? cn(this) : this.scrollTrigger && this.scrollTrigger.kill(!!nt), this;
    if (this.timeline) {
      var a = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, Jt && Jt.vars.overwrite !== !0)._first || cn(this), this.parent && a !== this.timeline.totalDuration() && je(this, this._dur * this.timeline._tDur / a, 0, 1), this;
    }
    var o = this._targets, c = i ? Tt(i) : o, l = this._ptLookup, u = this._pt, h, f, d, g, p, _, x;
    if ((!s || s === "all") && yg(o, c))
      return s === "all" && (this._pt = 0), cn(this);
    for (h = this._op = this._op || [], s !== "all" && (et(s) && (p = {}, dt(s, function(b) {
      return p[b] = 1;
    }), s = p), s = Xg(o, s)), x = o.length; x--; )
      if (~c.indexOf(o[x])) {
        f = l[x], s === "all" ? (h[x] = s, g = f, d = {}) : (d = h[x] = h[x] || {}, g = s);
        for (p in g)
          _ = f && f[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Rr(this, _, "_pt"), delete f[p]), d !== "all" && (d[p] = 1);
      }
    return this._initted && !this._pt && u && cn(this), this;
  }, t.to = function(i, s) {
    return new t(i, s, arguments[2]);
  }, t.from = function(i, s) {
    return dn(1, arguments);
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
    return dn(2, arguments);
  }, t.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new t(i, s);
  }, t.killTweensOf = function(i, s, a) {
    return j.killTweensOf(i, s, a);
  }, t;
})(Cn);
$t(Q.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
dt("staggerTo,staggerFrom,staggerFromTo", function(n) {
  Q[n] = function() {
    var t = new lt(), e = Oi.call(arguments, 0);
    return e.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), t[n].apply(t, e);
  };
});
var vs = function(t, e, r) {
  return t[e] = r;
}, xl = function(t, e, r) {
  return t[e](r);
}, Gg = function(t, e, r, i) {
  return t[e](i.fp, r);
}, jg = function(t, e, r) {
  return t.setAttribute(e, r);
}, xs = function(t, e) {
  return U(t[e]) ? xl : ls(t[e]) && t.setAttribute ? jg : vs;
}, yl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Wg = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, bl = function(t, e) {
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
}, ys = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, Ug = function(t, e, r, i) {
  for (var s = this._pt, a; s; )
    a = s._next, s.p === i && s.modifier(t, e, r), s = a;
}, Kg = function(t) {
  for (var e = this._pt, r, i; e; )
    i = e._next, e.p === t && !e.op || e.op === t ? Rr(this, e, "_pt") : e.dep || (r = 1), e = i;
  return !r;
}, Zg = function(t, e, r, i) {
  i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
}, wl = function(t) {
  for (var e = t._pt, r, i, s, a; e; ) {
    for (r = e._next, i = s; i && i.pr > e.pr; )
      i = i._next;
    (e._prev = i ? i._prev : a) ? e._prev._next = e : s = e, (e._next = i) ? i._prev = e : a = e, e = r;
  }
  t._pt = s;
}, pt = /* @__PURE__ */ (function() {
  function n(e, r, i, s, a, o, c, l, u) {
    this.t = r, this.s = s, this.c = a, this.p = i, this.r = o || yl, this.d = c || this, this.set = l || vs, this.pr = u || 0, this._next = e, e && (e._prev = this);
  }
  var t = n.prototype;
  return t.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = Zg, this.m = r, this.mt = s, this.tween = i;
  }, n;
})();
dt(ds + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return fs[n] = 1;
});
At.TweenMax = At.TweenLite = Q;
At.TimelineLite = At.TimelineMax = lt;
j = new lt({
  sortChildren: !1,
  defaults: Xe,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
wt.stringFilter = hl;
var we = [], nr = {}, Qg = [], La = 0, Jg = 0, li = function(t) {
  return (nr[t] || Qg).map(function(e) {
    return e();
  });
}, Ii = function() {
  var t = Date.now(), e = [];
  t - La > 2 && (li("matchMediaInit"), we.forEach(function(r) {
    var i = r.queries, s = r.conditions, a, o, c, l;
    for (o in i)
      a = Rt.matchMedia(i[o]).matches, a && (c = 1), a !== s[o] && (s[o] = a, l = 1);
    l && (r.revert(), c && e.push(r));
  }), li("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), La = t, li("matchMedia"));
}, kl = /* @__PURE__ */ (function() {
  function n(e, r) {
    this.selector = r && Ni(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Jg++, e && this.add(e);
  }
  var t = n.prototype;
  return t.add = function(r, i, s) {
    U(r) && (s = i, i = r, r = U);
    var a = this, o = function() {
      var l = X, u = a.selector, h;
      return l && l !== a && l.data.push(a), s && (a.selector = Ni(s)), X = a, h = i.apply(a, arguments), U(h) && a._r.push(h), X = l, a.selector = u, a.isReverted = !1, h;
    };
    return a.last = o, r === U ? o(a, function(c) {
      return a.add(null, c);
    }) : r ? a[r] = o : o;
  }, t.ignore = function(r) {
    var i = X;
    X = null, r(this), X = i;
  }, t.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof Q && !(i.parent && i.parent.data === "nested") && r.push(i);
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
        l = s.data[c], l instanceof lt ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof Q) && l.revert && l.revert(r);
      s._r.forEach(function(u) {
        return u(r, s);
      }), s.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), i)
      for (var a = we.length; a--; )
        we[a].id === this.id && we.splice(a, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, n;
})(), tm = /* @__PURE__ */ (function() {
  function n(e) {
    this.contexts = [], this.scope = e, X && X.data.push(this);
  }
  var t = n.prototype;
  return t.add = function(r, i, s) {
    qt(r) || (r = {
      matches: r
    });
    var a = new kl(0, s || this.scope), o = a.conditions = {}, c, l, u;
    X && !a.selector && (a.selector = X.selector), this.contexts.push(a), i = a.add("onMatch", i), a.queries = r;
    for (l in r)
      l === "all" ? u = 1 : (c = Rt.matchMedia(r[l]), c && (we.indexOf(a) < 0 && we.push(a), (o[l] = c.matches) && (u = 1), c.addListener ? c.addListener(Ii) : c.addEventListener("change", Ii)));
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
})(), Cr = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(i) {
      return ll(i);
    });
  },
  timeline: function(t) {
    return new lt(t);
  },
  getTweensOf: function(t, e) {
    return j.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, i) {
    et(t) && (t = Tt(t)[0]);
    var s = xe(t || {}).get, a = r ? Uo : Wo;
    return r === "native" && (r = ""), t && (e ? a((vt[e] && vt[e].get || s)(t, e, r, i)) : function(o, c, l) {
      return a((vt[o] && vt[o].get || s)(t, o, c, l));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = Tt(t), t.length > 1) {
      var i = t.map(function(u) {
        return mt.quickSetter(u, e, r);
      }), s = i.length;
      return function(u) {
        for (var h = s; h--; )
          i[h](u);
      };
    }
    t = t[0] || {};
    var a = vt[e], o = xe(t), c = o.harness && (o.harness.aliases || {})[e] || e, l = a ? function(u) {
      var h = new a();
      ze._pt = 0, h.init(t, r ? u + r : u, ze, 0, [t]), h.render(1, h), ze._pt && ys(1, ze);
    } : o.set(t, c);
    return a ? l : function(u) {
      return l(t, c, r ? u + r : u, o, 1);
    };
  },
  quickTo: function(t, e, r) {
    var i, s = mt.to(t, $t((i = {}, i[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})), a = function(c, l, u) {
      return s.resetTo(e, c, l, u);
    };
    return a.tween = s, a;
  },
  isTweening: function(t) {
    return j.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = be(t.ease, Xe.ease)), Ca(Xe, t || {});
  },
  config: function(t) {
    return Ca(wt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, i = t.plugins, s = t.defaults, a = t.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !vt[o] && !At[o] && wn(e + " effect requires " + o + " plugin.");
    }), ii[e] = function(o, c, l) {
      return r(Tt(o), $t(c || {}, s), l);
    }, a && (lt.prototype[e] = function(o, c, l) {
      return this.add(ii[e](o, qt(c) ? c : (l = c) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    H[t] = be(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? be(t, e) : H;
  },
  getById: function(t) {
    return j.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new lt(t), i, s;
    for (r.smoothChildTiming = ft(t.smoothChildTiming), j.remove(r), r._dp = 0, r._time = r._tTime = j._time, i = j._first; i; )
      s = i._next, (e || !(!i._dur && i instanceof Q && i.vars.onComplete === i._targets[0])) && Ot(r, i, i._start - i._delay), i = s;
    return Ot(j, r, 0), r;
  },
  context: function(t, e) {
    return t ? new kl(t, e) : X;
  },
  matchMedia: function(t) {
    return new tm(t);
  },
  matchMediaRefresh: function() {
    return we.forEach(function(t) {
      var e = t.conditions, r, i;
      for (i in e)
        e[i] && (e[i] = !1, r = 1);
      r && t.revert();
    }) || Ii();
  },
  addEventListener: function(t, e) {
    var r = nr[t] || (nr[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = nr[t], i = r && r.indexOf(e);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: Pg,
    wrapYoyo: zg,
    distribute: nl,
    random: il,
    snap: rl,
    normalize: Lg,
    getUnit: it,
    clamp: Sg,
    splitColor: cl,
    toArray: Tt,
    selector: Ni,
    mapRange: al,
    pipe: Mg,
    unitize: Eg,
    interpolate: Rg,
    shuffle: el
  },
  install: Vo,
  effects: ii,
  ticker: xt,
  updateRoot: lt.updateRoot,
  plugins: vt,
  globalTimeline: j,
  core: {
    PropTween: pt,
    globals: Xo,
    Tween: Q,
    Timeline: lt,
    Animation: Cn,
    getCache: xe,
    _removeLinkedListItem: Rr,
    reverting: function() {
      return nt;
    },
    context: function(t) {
      return t && X && (X.data.push(t), t._ctx = X), X;
    },
    suppressOverwrites: function(t) {
      return os = t;
    }
  }
};
dt("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return Cr[n] = Q[n];
});
xt.add(lt.updateRoot);
ze = Cr.to({}, {
  duration: 0
});
var em = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, nm = function(t, e) {
  var r = t._targets, i, s, a;
  for (i in e)
    for (s = r.length; s--; )
      a = t._ptLookup[s][i], a && (a = a.d) && (a._pt && (a = em(a, i)), a && a.modifier && a.modifier(e[i], t, r[s], i));
}, ci = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, a) {
      a._onInit = function(o) {
        var c, l;
        if (et(s) && (c = {}, dt(s, function(u) {
          return c[u] = 1;
        }), s = c), e) {
          c = {};
          for (l in s)
            c[l] = e(s[l]);
          s = c;
        }
        nm(o, s);
      };
    }
  };
}, mt = Cr.registerPlugin({
  name: "attr",
  init: function(t, e, r, i, s) {
    var a, o, c;
    this.tween = r;
    for (a in e)
      c = t.getAttribute(a) || "", o = this.add(t, "setAttribute", (c || 0) + "", e[a], i, s, 0, 0, a), o.op = a, o.b = c, this._props.push(a);
  },
  render: function(t, e) {
    for (var r = e._pt; r; )
      nt ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var r = e.length; r--; )
      this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
  }
}, ci("roundProps", Di), ci("modifiers"), ci("snap", rl)) || Cr;
Q.version = lt.version = mt.version = "3.14.2";
Bo = 1;
cs() && We();
H.Power0;
H.Power1;
H.Power2;
H.Power3;
H.Power4;
H.Linear;
H.Quad;
H.Cubic;
H.Quart;
H.Quint;
H.Strong;
H.Elastic;
H.Back;
H.SteppedEase;
H.Bounce;
H.Sine;
H.Expo;
H.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Pa, te, De, bs, _e, za, ws, rm = function() {
  return typeof window < "u";
}, Kt = {}, ge = 180 / Math.PI, Fe = Math.PI / 180, Me = Math.atan2, Ra = 1e8, ks = /([A-Z])/g, im = /(left|right|width|margin|padding|x)/i, sm = /[\s,\(]\S/, Dt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, qi = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, am = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, om = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, lm = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, cm = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, Al = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, $l = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, um = function(t, e, r) {
  return t.style[e] = r;
}, hm = function(t, e, r) {
  return t.style.setProperty(e, r);
}, fm = function(t, e, r) {
  return t._gsap[e] = r;
}, dm = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, pm = function(t, e, r, i, s) {
  var a = t._gsap;
  a.scaleX = a.scaleY = r, a.renderTransform(s, a);
}, gm = function(t, e, r, i, s) {
  var a = t._gsap;
  a[e] = r, a.renderTransform(s, a);
}, W = "transform", gt = W + "Origin", mm = function n(t, e) {
  var r = this, i = this.target, s = i.style, a = i._gsap;
  if (t in Kt && s) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Dt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(o) {
        return r.tfm[o] = Gt(i, o);
      }) : this.tfm[t] = a.x ? a[t] : Gt(i, t), t === gt && (this.tfm.zOrigin = a.zOrigin);
    else
      return Dt.transform.split(",").forEach(function(o) {
        return n.call(r, o, e);
      });
    if (this.props.indexOf(W) >= 0)
      return;
    a.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(gt, e, "")), t = W;
  }
  (s || e) && this.props.push(t, e, s[t]);
}, Cl = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, _m = function() {
  var t = this.props, e = this.target, r = e.style, i = e._gsap, s, a;
  for (s = 0; s < t.length; s += 3)
    t[s + 1] ? t[s + 1] === 2 ? e[t[s]](t[s + 2]) : e[t[s]] = t[s + 2] : t[s + 2] ? r[t[s]] = t[s + 2] : r.removeProperty(t[s].substr(0, 2) === "--" ? t[s] : t[s].replace(ks, "-$1").toLowerCase());
  if (this.tfm) {
    for (a in this.tfm)
      i[a] = this.tfm[a];
    i.svg && (i.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), s = ws(), (!s || !s.isStart) && !r[W] && (Cl(r), i.zOrigin && r[gt] && (r[gt] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, Sl = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: _m,
    save: mm
  };
  return t._gsap || mt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, Tl, Hi = function(t, e) {
  var r = te.createElementNS ? te.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : te.createElement(t);
  return r && r.style ? r : te.createElement(t);
}, bt = function n(t, e, r) {
  var i = getComputedStyle(t);
  return i[e] || i.getPropertyValue(e.replace(ks, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && n(t, Ue(e) || e, 1) || "";
}, Oa = "O,Moz,ms,Ms,Webkit".split(","), Ue = function(t, e, r) {
  var i = e || _e, s = i.style, a = 5;
  if (t in s && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); a-- && !(Oa[a] + t in s); )
    ;
  return a < 0 ? null : (a === 3 ? "ms" : a >= 0 ? Oa[a] : "") + t;
}, Bi = function() {
  rm() && window.document && (Pa = window, te = Pa.document, De = te.documentElement, _e = Hi("div") || {
    style: {}
  }, Hi("div"), W = Ue(W), gt = W + "Origin", _e.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Tl = !!Ue("perspective"), ws = mt.core.reverting, bs = 1);
}, Na = function(t) {
  var e = t.ownerSVGElement, r = Hi("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = t.cloneNode(!0), s;
  i.style.display = "block", r.appendChild(i), De.appendChild(r);
  try {
    s = i.getBBox();
  } catch {
  }
  return r.removeChild(i), De.removeChild(r), s;
}, Da = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, Ml = function(t) {
  var e, r;
  try {
    e = t.getBBox();
  } catch {
    e = Na(t), r = 1;
  }
  return e && (e.width || e.height) || r || (e = Na(t)), e && !e.width && !e.x && !e.y ? {
    x: +Da(t, ["x", "cx", "x1"]) || 0,
    y: +Da(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, El = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ml(t));
}, se = function(t, e) {
  if (e) {
    var r = t.style, i;
    e in Kt && e !== gt && (e = W), r.removeProperty ? (i = e.substr(0, 2), (i === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(i === "--" ? e : e.replace(ks, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, ee = function(t, e, r, i, s, a) {
  var o = new pt(t._pt, e, r, 0, 1, a ? $l : Al);
  return t._pt = o, o.b = i, o.e = s, t._props.push(r), o;
}, Fa = {
  deg: 1,
  rad: 1,
  turn: 1
}, vm = {
  grid: 1,
  flex: 1
}, ae = function n(t, e, r, i) {
  var s = parseFloat(r) || 0, a = (r + "").trim().substr((s + "").length) || "px", o = _e.style, c = im.test(e), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), h = 100, f = i === "px", d = i === "%", g, p, _, x;
  if (i === a || !s || Fa[i] || Fa[a])
    return s;
  if (a !== "px" && !f && (s = n(t, e, r, "px")), x = t.getCTM && El(t), (d || a === "%") && (Kt[e] || ~e.indexOf("adius")))
    return g = x ? t.getBBox()[c ? "width" : "height"] : t[u], Z(d ? s / g * h : s / 100 * g);
  if (o[c ? "width" : "height"] = h + (f ? a : i), p = i !== "rem" && ~e.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, x && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === te || !p.appendChild) && (p = te.body), _ = p._gsap, _ && d && _.width && c && _.time === xt.time && !_.uncache)
    return Z(s / _.width * h);
  if (d && (e === "height" || e === "width")) {
    var b = t.style[e];
    t.style[e] = h + i, g = t[u], b ? t.style[e] = b : se(t, e);
  } else
    (d || a === "%") && !vm[bt(p, "display")] && (o.position = bt(t, "position")), p === t && (o.position = "static"), p.appendChild(_e), g = _e[u], p.removeChild(_e), o.position = "absolute";
  return c && d && (_ = xe(p), _.time = xt.time, _.width = p[u]), Z(f ? g * s / h : g && s ? h / g * s : 0);
}, Gt = function(t, e, r, i) {
  var s;
  return bs || Bi(), e in Dt && e !== "transform" && (e = Dt[e], ~e.indexOf(",") && (e = e.split(",")[0])), Kt[e] && e !== "transform" ? (s = Tn(t, i), s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : Tr(bt(t, gt)) + " " + s.zOrigin + "px") : (s = t.style[e], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = Sr[e] && Sr[e](t, e, r) || bt(t, e) || Go(t, e) || (e === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? ae(t, e, s, r) + r : s;
}, xm = function(t, e, r, i) {
  if (!r || r === "none") {
    var s = Ue(e, t, 1), a = s && bt(t, s, 1);
    a && a !== r ? (e = s, r = a) : e === "borderColor" && (r = bt(t, "borderTopColor"));
  }
  var o = new pt(this._pt, t.style, e, 0, 1, bl), c = 0, l = 0, u, h, f, d, g, p, _, x, b, v, m, w;
  if (o.b = r, o.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = bt(t, i.substring(4, i.indexOf(")")))), i === "auto" && (p = t.style[e], t.style[e] = i, i = bt(t, e) || i, p ? t.style[e] = p : se(t, e)), u = [r, i], hl(u), r = u[0], i = u[1], f = r.match(Pe) || [], w = i.match(Pe) || [], w.length) {
    for (; h = Pe.exec(i); )
      _ = h[0], b = i.substring(c, h.index), g ? g = (g + 1) % 5 : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (g = 1), _ !== (p = f[l++] || "") && (d = parseFloat(p) || 0, m = p.substr((d + "").length), _.charAt(1) === "=" && (_ = Ne(d, _) + m), x = parseFloat(_), v = _.substr((x + "").length), c = Pe.lastIndex - v.length, v || (v = v || wt.units[e] || m, c === i.length && (i += v, o.e += v)), m !== v && (d = ae(t, e, p, v) || 0), o._pt = {
        _next: o._pt,
        p: b || l === 1 ? b : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: x - d,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    o.c = c < i.length ? i.substring(c, i.length) : "";
  } else
    o.r = e === "display" && i === "none" ? $l : Al;
  return Ho.test(i) && (o.e = 0), this._pt = o, o;
}, Ia = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, ym = function(t) {
  var e = t.split(" "), r = e[0], i = e[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), e[0] = Ia[r] || r, e[1] = Ia[i] || i, e.join(" ");
}, bm = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, i = r.style, s = e.u, a = r._gsap, o, c, l;
    if (s === "all" || s === !0)
      i.cssText = "", c = 1;
    else
      for (s = s.split(","), l = s.length; --l > -1; )
        o = s[l], Kt[o] && (c = 1, o = o === "transformOrigin" ? gt : W), se(r, o);
    c && (se(r, W), a && (a.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", Tn(r, 1), a.uncache = 1, Cl(i)));
  }
}, Sr = {
  clearProps: function(t, e, r, i, s) {
    if (s.data !== "isFromStart") {
      var a = t._pt = new pt(t._pt, e, r, 0, 0, bm);
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
}, Sn = [1, 0, 0, 1, 0, 0], Ll = {}, Pl = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, qa = function(t) {
  var e = bt(t, W);
  return Pl(e) ? Sn : e.substr(7).match(qo).map(Z);
}, As = function(t, e) {
  var r = t._gsap || xe(t), i = t.style, s = qa(t), a, o, c, l;
  return r.svg && t.getAttribute("transform") ? (c = t.transform.baseVal.consolidate().matrix, s = [c.a, c.b, c.c, c.d, c.e, c.f], s.join(",") === "1,0,0,1,0,0" ? Sn : s) : (s === Sn && !t.offsetParent && t !== De && !r.svg && (c = i.display, i.display = "block", a = t.parentNode, (!a || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, o = t.nextElementSibling, De.appendChild(t)), s = qa(t), c ? i.display = c : se(t, "display"), l && (o ? a.insertBefore(t, o) : a ? a.appendChild(t) : De.removeChild(t))), e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Vi = function(t, e, r, i, s, a) {
  var o = t._gsap, c = s || As(t, !0), l = o.xOrigin || 0, u = o.yOrigin || 0, h = o.xOffset || 0, f = o.yOffset || 0, d = c[0], g = c[1], p = c[2], _ = c[3], x = c[4], b = c[5], v = e.split(" "), m = parseFloat(v[0]) || 0, w = parseFloat(v[1]) || 0, C, k, $, y;
  r ? c !== Sn && (k = d * _ - g * p) && ($ = m * (_ / k) + w * (-p / k) + (p * b - _ * x) / k, y = m * (-g / k) + w * (d / k) - (d * b - g * x) / k, m = $, w = y) : (C = Ml(t), m = C.x + (~v[0].indexOf("%") ? m / 100 * C.width : m), w = C.y + (~(v[1] || v[0]).indexOf("%") ? w / 100 * C.height : w)), i || i !== !1 && o.smooth ? (x = m - l, b = w - u, o.xOffset = h + (x * d + b * p) - x, o.yOffset = f + (x * g + b * _) - b) : o.xOffset = o.yOffset = 0, o.xOrigin = m, o.yOrigin = w, o.smooth = !!i, o.origin = e, o.originIsAbsolute = !!r, t.style[gt] = "0px 0px", a && (ee(a, o, "xOrigin", l, m), ee(a, o, "yOrigin", u, w), ee(a, o, "xOffset", h, o.xOffset), ee(a, o, "yOffset", f, o.yOffset)), t.setAttribute("data-svg-origin", m + " " + w);
}, Tn = function(t, e) {
  var r = t._gsap || new gl(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var i = t.style, s = r.scaleX < 0, a = "px", o = "deg", c = getComputedStyle(t), l = bt(t, gt) || "0", u, h, f, d, g, p, _, x, b, v, m, w, C, k, $, y, S, M, T, E, z, A, L, P, O, R, N, F, K, ct, J, Y;
  return u = h = f = p = _ = x = b = v = m = 0, d = g = 1, r.svg = !!(t.getCTM && El(t)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (i[W] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[W] !== "none" ? c[W] : "")), i.scale = i.rotate = i.translate = "none"), k = As(t, r.svg), r.svg && (r.uncache ? (O = t.getBBox(), l = r.xOrigin - O.x + "px " + (r.yOrigin - O.y) + "px", P = "") : P = !e && t.getAttribute("data-svg-origin"), Vi(t, P || l, !!P || r.originIsAbsolute, r.smooth !== !1, k)), w = r.xOrigin || 0, C = r.yOrigin || 0, k !== Sn && (M = k[0], T = k[1], E = k[2], z = k[3], u = A = k[4], h = L = k[5], k.length === 6 ? (d = Math.sqrt(M * M + T * T), g = Math.sqrt(z * z + E * E), p = M || T ? Me(T, M) * ge : 0, b = E || z ? Me(E, z) * ge + p : 0, b && (g *= Math.abs(Math.cos(b * Fe))), r.svg && (u -= w - (w * M + C * E), h -= C - (w * T + C * z))) : (Y = k[6], ct = k[7], N = k[8], F = k[9], K = k[10], J = k[11], u = k[12], h = k[13], f = k[14], $ = Me(Y, K), _ = $ * ge, $ && (y = Math.cos(-$), S = Math.sin(-$), P = A * y + N * S, O = L * y + F * S, R = Y * y + K * S, N = A * -S + N * y, F = L * -S + F * y, K = Y * -S + K * y, J = ct * -S + J * y, A = P, L = O, Y = R), $ = Me(-E, K), x = $ * ge, $ && (y = Math.cos(-$), S = Math.sin(-$), P = M * y - N * S, O = T * y - F * S, R = E * y - K * S, J = z * S + J * y, M = P, T = O, E = R), $ = Me(T, M), p = $ * ge, $ && (y = Math.cos($), S = Math.sin($), P = M * y + T * S, O = A * y + L * S, T = T * y - M * S, L = L * y - A * S, M = P, A = O), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, x = 180 - x), d = Z(Math.sqrt(M * M + T * T + E * E)), g = Z(Math.sqrt(L * L + Y * Y)), $ = Me(A, L), b = Math.abs($) > 2e-4 ? $ * ge : 0, m = J ? 1 / (J < 0 ? -J : J) : 0), r.svg && (P = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Pl(bt(t, W)), P && t.setAttribute("transform", P))), Math.abs(b) > 90 && Math.abs(b) < 270 && (s ? (d *= -1, b += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, b += b <= 0 ? 180 : -180)), e = e || r.uncache, r.x = u - ((r.xPercent = u && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + a, r.y = h - ((r.yPercent = h && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + a, r.z = f + a, r.scaleX = Z(d), r.scaleY = Z(g), r.rotation = Z(p) + o, r.rotationX = Z(_) + o, r.rotationY = Z(x) + o, r.skewX = b + o, r.skewY = v + o, r.transformPerspective = m + a, (r.zOrigin = parseFloat(l.split(" ")[2]) || !e && r.zOrigin || 0) && (i[gt] = Tr(l)), r.xOffset = r.yOffset = 0, r.force3D = wt.force3D, r.renderTransform = r.svg ? km : Tl ? zl : wm, r.uncache = 0, r;
}, Tr = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, ui = function(t, e, r) {
  var i = it(e);
  return Z(parseFloat(e) + parseFloat(ae(t, "x", r + "px", i))) + i;
}, wm = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, zl(t, e);
}, he = "0deg", en = "0px", fe = ") ", zl = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.z, l = r.rotation, u = r.rotationY, h = r.rotationX, f = r.skewX, d = r.skewY, g = r.scaleX, p = r.scaleY, _ = r.transformPerspective, x = r.force3D, b = r.target, v = r.zOrigin, m = "", w = x === "auto" && t && t !== 1 || x === !0;
  if (v && (h !== he || u !== he)) {
    var C = parseFloat(u) * Fe, k = Math.sin(C), $ = Math.cos(C), y;
    C = parseFloat(h) * Fe, y = Math.cos(C), a = ui(b, a, k * y * -v), o = ui(b, o, -Math.sin(C) * -v), c = ui(b, c, $ * y * -v + v);
  }
  _ !== en && (m += "perspective(" + _ + fe), (i || s) && (m += "translate(" + i + "%, " + s + "%) "), (w || a !== en || o !== en || c !== en) && (m += c !== en || w ? "translate3d(" + a + ", " + o + ", " + c + ") " : "translate(" + a + ", " + o + fe), l !== he && (m += "rotate(" + l + fe), u !== he && (m += "rotateY(" + u + fe), h !== he && (m += "rotateX(" + h + fe), (f !== he || d !== he) && (m += "skew(" + f + ", " + d + fe), (g !== 1 || p !== 1) && (m += "scale(" + g + ", " + p + fe), b.style[W] = m || "translate(0, 0)";
}, km = function(t, e) {
  var r = e || this, i = r.xPercent, s = r.yPercent, a = r.x, o = r.y, c = r.rotation, l = r.skewX, u = r.skewY, h = r.scaleX, f = r.scaleY, d = r.target, g = r.xOrigin, p = r.yOrigin, _ = r.xOffset, x = r.yOffset, b = r.forceCSS, v = parseFloat(a), m = parseFloat(o), w, C, k, $, y;
  c = parseFloat(c), l = parseFloat(l), u = parseFloat(u), u && (u = parseFloat(u), l += u, c += u), c || l ? (c *= Fe, l *= Fe, w = Math.cos(c) * h, C = Math.sin(c) * h, k = Math.sin(c - l) * -f, $ = Math.cos(c - l) * f, l && (u *= Fe, y = Math.tan(l - u), y = Math.sqrt(1 + y * y), k *= y, $ *= y, u && (y = Math.tan(u), y = Math.sqrt(1 + y * y), w *= y, C *= y)), w = Z(w), C = Z(C), k = Z(k), $ = Z($)) : (w = h, $ = f, C = k = 0), (v && !~(a + "").indexOf("px") || m && !~(o + "").indexOf("px")) && (v = ae(d, "x", a, "px"), m = ae(d, "y", o, "px")), (g || p || _ || x) && (v = Z(v + g - (g * w + p * k) + _), m = Z(m + p - (g * C + p * $) + x)), (i || s) && (y = d.getBBox(), v = Z(v + i / 100 * y.width), m = Z(m + s / 100 * y.height)), y = "matrix(" + w + "," + C + "," + k + "," + $ + "," + v + "," + m + ")", d.setAttribute("transform", y), b && (d.style[W] = y);
}, Am = function(t, e, r, i, s) {
  var a = 360, o = et(s), c = parseFloat(s) * (o && ~s.indexOf("rad") ? ge : 1), l = c - i, u = i + l + "deg", h, f;
  return o && (h = s.split("_")[1], h === "short" && (l %= a, l !== l % (a / 2) && (l += l < 0 ? a : -a)), h === "cw" && l < 0 ? l = (l + a * Ra) % a - ~~(l / a) * a : h === "ccw" && l > 0 && (l = (l - a * Ra) % a - ~~(l / a) * a)), t._pt = f = new pt(t._pt, e, r, i, l, am), f.e = u, f.u = "deg", t._props.push(r), f;
}, Ha = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, $m = function(t, e, r) {
  var i = Ha({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", a = r.style, o, c, l, u, h, f, d, g;
  i.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), a[W] = e, o = Tn(r, 1), se(r, W), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[W], a[W] = e, o = Tn(r, 1), a[W] = l);
  for (c in Kt)
    l = i[c], u = o[c], l !== u && s.indexOf(c) < 0 && (d = it(l), g = it(u), h = d !== g ? ae(r, c, l, g) : parseFloat(l), f = parseFloat(u), t._pt = new pt(t._pt, o, c, h, f - h, qi), t._pt.u = g || 0, t._props.push(c));
  Ha(o, i);
};
dt("padding,margin,Width,Radius", function(n, t) {
  var e = "Top", r = "Right", i = "Bottom", s = "Left", a = (t < 3 ? [e, r, i, s] : [e + s, e + r, i + r, i + s]).map(function(o) {
    return t < 2 ? n + o : "border" + o + n;
  });
  Sr[t > 1 ? "border" + n : n] = function(o, c, l, u, h) {
    var f, d;
    if (arguments.length < 4)
      return f = a.map(function(g) {
        return Gt(o, g, l);
      }), d = f.join(" "), d.split(f[0]).length === 5 ? f[0] : d;
    f = (u + "").split(" "), d = {}, a.forEach(function(g, p) {
      return d[g] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), o.init(c, d, h);
  };
});
var Rl = {
  name: "css",
  register: Bi,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, i, s) {
    var a = this._props, o = t.style, c = r.vars.startAt, l, u, h, f, d, g, p, _, x, b, v, m, w, C, k, $, y;
    bs || Bi(), this.styles = this.styles || Sl(t), $ = this.styles.props, this.tween = r;
    for (p in e)
      if (p !== "autoRound" && (u = e[p], !(vt[p] && ml(p, e, r, i, t, s)))) {
        if (d = typeof u, g = Sr[p], d === "function" && (u = u.call(r, i, t, s), d = typeof u), d === "string" && ~u.indexOf("random(") && (u = An(u)), g)
          g(this, t, p, u, r) && (k = 1);
        else if (p.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(p) + "").trim(), u += "", re.lastIndex = 0, re.test(l) || (_ = it(l), x = it(u), x ? _ !== x && (l = ae(t, p, l, x) + x) : _ && (u += _)), this.add(o, "setProperty", l, u, i, s, 0, 0, p), a.push(p), $.push(p, 0, o[p]);
        else if (d !== "undefined") {
          if (c && p in c ? (l = typeof c[p] == "function" ? c[p].call(r, i, t, s) : c[p], et(l) && ~l.indexOf("random(") && (l = An(l)), it(l + "") || l === "auto" || (l += wt.units[p] || it(Gt(t, p)) || ""), (l + "").charAt(1) === "=" && (l = Gt(t, p))) : l = Gt(t, p), f = parseFloat(l), b = d === "string" && u.charAt(1) === "=" && u.substr(0, 2), b && (u = u.substr(2)), h = parseFloat(u), p in Dt && (p === "autoAlpha" && (f === 1 && Gt(t, "visibility") === "hidden" && h && (f = 0), $.push("visibility", 0, o.visibility), ee(this, o, "visibility", f ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), p !== "scale" && p !== "transform" && (p = Dt[p], ~p.indexOf(",") && (p = p.split(",")[0]))), v = p in Kt, v) {
            if (this.styles.save(p), y = u, d === "string" && u.substring(0, 6) === "var(--") {
              if (u = bt(t, u.substring(4, u.indexOf(")"))), u.substring(0, 5) === "calc(") {
                var S = t.style.perspective;
                t.style.perspective = u, u = bt(t, "perspective"), S ? t.style.perspective = S : se(t, "perspective");
              }
              h = parseFloat(u);
            }
            if (m || (w = t._gsap, w.renderTransform && !e.parseTransform || Tn(t, e.parseTransform), C = e.smoothOrigin !== !1 && w.smooth, m = this._pt = new pt(this._pt, o, W, 0, 1, w.renderTransform, w, 0, -1), m.dep = 1), p === "scale")
              this._pt = new pt(this._pt, w, "scaleY", w.scaleY, (b ? Ne(w.scaleY, b + h) : h) - w.scaleY || 0, qi), this._pt.u = 0, a.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              $.push(gt, 0, o[gt]), u = ym(u), w.svg ? Vi(t, u, 0, C, 0, this) : (x = parseFloat(u.split(" ")[2]) || 0, x !== w.zOrigin && ee(this, w, "zOrigin", w.zOrigin, x), ee(this, o, p, Tr(l), Tr(u)));
              continue;
            } else if (p === "svgOrigin") {
              Vi(t, u, 1, C, 0, this);
              continue;
            } else if (p in Ll) {
              Am(this, w, p, f, b ? Ne(f, b + u) : u);
              continue;
            } else if (p === "smoothOrigin") {
              ee(this, w, "smooth", w.smooth, u);
              continue;
            } else if (p === "force3D") {
              w[p] = u;
              continue;
            } else if (p === "transform") {
              $m(this, u, t);
              continue;
            }
          } else p in o || (p = Ue(p) || p);
          if (v || (h || h === 0) && (f || f === 0) && !sm.test(u) && p in o)
            _ = (l + "").substr((f + "").length), h || (h = 0), x = it(u) || (p in wt.units ? wt.units[p] : _), _ !== x && (f = ae(t, p, l, x)), this._pt = new pt(this._pt, v ? w : o, p, f, (b ? Ne(f, b + h) : h) - f, !v && (x === "px" || p === "zIndex") && e.autoRound !== !1 ? cm : qi), this._pt.u = x || 0, v && y !== u ? (this._pt.b = l, this._pt.e = y, this._pt.r = lm) : _ !== x && x !== "%" && (this._pt.b = l, this._pt.r = om);
          else if (p in o)
            xm.call(this, t, p, l, b ? b + u : u);
          else if (p in t)
            this.add(t, p, l || t[p], b ? b + u : u, i, s);
          else if (p !== "parseTransform") {
            hs(p, u);
            continue;
          }
          v || (p in o ? $.push(p, 0, o[p]) : typeof t[p] == "function" ? $.push(p, 2, t[p]()) : $.push(p, 1, l || t[p])), a.push(p);
        }
      }
    k && wl(this);
  },
  render: function(t, e) {
    if (e.tween._time || !ws())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Gt,
  aliases: Dt,
  getSetter: function(t, e, r) {
    var i = Dt[e];
    return i && i.indexOf(",") < 0 && (e = i), e in Kt && e !== gt && (t._gsap.x || Gt(t, "x")) ? r && za === r ? e === "scale" ? dm : fm : (za = r || {}) && (e === "scale" ? pm : gm) : t.style && !ls(t.style[e]) ? um : ~e.indexOf("-") ? hm : xs(t, e);
  },
  core: {
    _removeProperty: se,
    _getMatrix: As
  }
};
mt.utils.checkPrefix = Ue;
mt.core.getStyleSaver = Sl;
(function(n, t, e, r) {
  var i = dt(n + "," + t + "," + e, function(s) {
    Kt[s] = 1;
  });
  dt(t, function(s) {
    wt.units[s] = "deg", Ll[s] = 1;
  }), Dt[i[13]] = n + "," + t, dt(r, function(s) {
    var a = s.split(":");
    Dt[a[1]] = i[a[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  wt.units[n] = "px";
});
mt.registerPlugin(Rl);
var hn = mt.registerPlugin(Rl) || mt;
hn.core.Tween;
const Ee = {
  input: "#ff2d75",
  hidden: "#7b68ee",
  output: "#00d4ff"
}, nn = 36, Gn = 100, hi = 200, Ba = 50, fi = 60, Cm = `
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
class Sm extends I {
  constructor() {
    super(...arguments);
    D(this, "_svg", null);
    D(this, "_container", null);
    D(this, "_hasAnimated", !1);
    D(this, "_isAnimating", !1);
    D(this, "_resizeObserver", null);
    D(this, "_timeline", null);
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
    super.connectedCallback(), this.adoptStyles(Cm), this._container = document.createElement("div"), this.root.appendChild(this._container), this._initSvg(), this._render(), this._resizeObserver = new ResizeObserver(() => {
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
    this._container.appendChild(e), this._svg = tt(e);
    const r = this._svg.append("defs"), i = {
      input: Ee.input,
      hidden: Ee.hidden,
      output: Ee.output
    };
    for (const [s, a] of Object.entries(i))
      r.append("filter").attr("id", `glow-${s}`).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%").append("feDropShadow").attr("dx", 0).attr("dy", 0).attr("stdDeviation", 6).attr("flood-color", a).attr("flood-opacity", 0.7);
    this._svg.append("g").attr("class", "connections-group"), this._svg.append("g").attr("class", "nodes-group"), this._svg.append("g").attr("class", "labels-group");
  }
  // ---------------------------------------------------------------------------
  // Layout computation
  // ---------------------------------------------------------------------------
  _computeLayout() {
    const e = this._layers, r = this.isRtl, i = e.length, s = Math.max(...e.map((u) => u.length), 1), a = (i - 1) * hi + fi * 2, o = (s - 1) * Gn + Ba + nn + 40, c = [], l = [];
    for (let u = 0; u < i; u++) {
      const h = e[u], f = r ? a - fi - u * hi : fi + u * hi, d = (h.length - 1) * Gn, g = Ba + ((s - 1) * Gn - d) / 2, p = [];
      for (let _ = 0; _ < h.length; _++)
        p.push({
          layer: u,
          index: _,
          x: f,
          y: g + _ * Gn,
          label: h[_]
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
    const i = getComputedStyle(this).getPropertyValue("--lv-net-input").trim() || Ee.input, s = getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim() || Ee.hidden, a = getComputedStyle(this).getPropertyValue("--lv-net-output").trim() || Ee.output;
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
        const p = this._layerColor(g.layer, a), _ = this._layerType(g.layer, a), x = u.append("g").attr("class", "node").attr("data-layer", g.layer).attr("data-index", g.index).attr("transform", `translate(${g.x},${g.y})`).attr("opacity", c ? 0.15 : 1);
        x.append("circle").attr("class", "node-circle").attr("data-layer", g.layer).attr("r", nn).attr("fill", p).attr("stroke", p).attr("stroke-width", 2).attr("fill-opacity", o ? 0.2 : c ? 0.05 : 0.2), o && x.attr("filter", `url(#glow-${_})`), x.append("text").attr("class", "node-label").text(g.label);
      }
    const h = this._svg.select(".labels-group");
    h.selectAll("*").remove();
    const f = this._names;
    for (let d = 0; d < e.length; d++) {
      if (!f[d]) continue;
      const g = e[d][0];
      h.append("text").attr("class", "label").attr("x", g.x).attr("y", g.y - nn - 16).text(f[d]);
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
    const { nodes: e } = this._computeLayout(), r = e.length, i = this._animateMode, s = this._speed, a = i === "backprop", o = a ? "#ff2d75" : "#00d4ff", c = s / 600, l = a ? Array.from({ length: r }, (f, d) => r - 1 - d) : Array.from({ length: r }, (f, d) => d), u = this._getLayerNodeGroups(), h = hn.timeline({
      onComplete: () => {
        this._isAnimating = !1, this._hasAnimated = !0, this.root.querySelectorAll(".node").forEach((g) => {
          const p = parseInt(g.getAttribute("data-layer") || "0", 10), _ = this._layerType(p, r);
          hn.set(g, { opacity: 1 }), g.setAttribute("filter", `url(#glow-${_})`);
          const x = g.querySelector("circle");
          x && hn.set(x, { attr: { "fill-opacity": 0.2 } });
        }), this.root.querySelectorAll(".connection").forEach((g) => {
          hn.set(g, { attr: { "stroke-opacity": 0.5 } }), g.setAttribute("stroke", "var(--lv-border, #2a2a4a)");
        });
      }
    });
    this._timeline = h, h.addLabel("start", 0.15), l.forEach((f, d) => {
      const g = this._layerType(f, r), p = u[f];
      if (!p || p.length === 0) return;
      const _ = p.map((v) => v.querySelector(".node-circle")).filter(Boolean), x = `layer-${d}`, b = 0.15 + d * (0.4 * c);
      if (h.addLabel(x, b), h.to(p, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, x), h.call(() => {
        p.forEach((v) => {
          v.setAttribute("filter", `url(#glow-${g})`);
        });
      }, [], x), h.to(_, {
        attr: { r: nn * 1.15 },
        duration: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, x), h.to(_, {
        attr: { r: nn },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.inOut"
      }, `${x}+=0.2`), h.to(_, {
        attr: { "fill-opacity": 0.35 },
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out"
      }, x), h.to(_, {
        attr: { "fill-opacity": 0.2 },
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      }, `${x}+=0.3`), d < l.length - 1) {
        const v = l[d + 1], m = Math.min(f, v), w = Math.max(f, v), C = this._getConnectionElements(m, w);
        C.length > 0 && (h.to(C, {
          attr: { "stroke-opacity": 0.5 },
          stroke: o,
          duration: 0.25,
          stagger: 0.02,
          ease: "power2.out"
        }, `${x}+=0.15`), h.to(C, {
          stroke: "var(--lv-border, #2a2a4a)",
          attr: { "stroke-opacity": 0.35 },
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.inOut"
        }, `${x}+=0.35`));
      }
    });
  }
}
customElements.define("lv-network", Sm);
const Va = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
], Tm = `
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
`, Zt = 120, rn = 32, jn = 40;
class Mm extends I {
  constructor() {
    super(...arguments);
    D(this, "_data", null);
    D(this, "_hasAnimated", !1);
    D(this, "_svg", null);
    D(this, "_container", null);
    D(this, "_root", null);
  }
  static get observedAttributes() {
    return ["data", "orientation"];
  }
  get _orientation() {
    return this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical";
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Tm), this._container = document.createElement("div"), this.root.appendChild(this._container), this._data = this.jsonAttr("data", { label: "root" }), this._initSvg(), this._buildHierarchy(), this._render(!1);
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
    this._container.appendChild(e), this._svg = tt(e), this._svg.append("g").attr("class", "links-group"), this._svg.append("g").attr("class", "nodes-group");
  }
  _buildHierarchy() {
    this._data && (this._root = vr(this._data));
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
    const r = this._orientation === "horizontal", i = /* @__PURE__ */ new Map(), s = (S, M) => {
      if (i.set(M, { collapsed: !!S._collapsed, _children: S._children }), S._collapsed && S._children)
        for (let T = 0; T < S._children.length; T++)
          s(S._children[T], `${M}/${T}`);
      if (S.children)
        for (let T = 0; T < S.children.length; T++)
          s(S.children[T], `${M}/${T}`);
    };
    s(this._root, "0"), this._root = vr(this._data);
    const a = (S, M) => {
      const T = i.get(M);
      if (T != null && T.collapsed && (S._collapsed = !0, S._children = S.children, S.children = void 0), S.children)
        for (let E = 0; E < S.children.length; E++)
          a(S.children[E], `${M}/${E}`);
    };
    a(this._root, "0");
    const o = this._getVisibleNodes(), c = o.filter((S) => !S.children || S.children.length === 0).length, l = Ga(o, (S) => S.depth) || 0, u = rn + 20, h = Zt + 60;
    let f, d;
    r ? (f = l * h, d = Math.max((c - 1) * u, u)) : (f = Math.max((c - 1) * (Zt + 80), Zt + 80), d = l * h), kp().size(r ? [d, f] : [f, d]).separation((S, M) => S.parent === M.parent ? 1.5 : 2)(this._root);
    const p = this._root.descendants(), _ = this._root.links(), x = f + jn * 2 + Zt, b = d + jn * 2 + rn;
    this._svg.attr("viewBox", `0 0 ${x} ${b}`);
    const v = jn + Zt / 2, m = jn + rn / 2, w = (S) => r ? S.y + v : S.x + v, C = (S) => r ? S.x + m : S.y + m, k = this._svg.select(".links-group");
    k.selectAll("*").remove();
    const $ = r ? n0().x((S) => S.y + v).y((S) => S.x + m) : r0().x((S) => S.x + v).y((S) => S.y + m);
    for (let S = 0; S < _.length; S++) {
      const M = _[S], T = k.append("path").attr("class", "link").attr("d", $(M));
      if (e) {
        const E = T.node().getTotalLength();
        T.attr("stroke-dasharray", E).attr("stroke-dashoffset", E).transition().delay(S * 60 + 100).duration(500).ease(xn).attr("stroke-dashoffset", 0);
      }
    }
    const y = this._svg.select(".nodes-group");
    y.selectAll("*").remove();
    for (let S = 0; S < p.length; S++) {
      const M = p[S], T = w(M), E = C(M), z = M.data.children && M.data.children.length > 0, A = !!M._collapsed, P = M.depth % Va.length, O = getComputedStyle(this).getPropertyValue(`--lv-chart-${P}`).trim() || Va[P], R = y.append("g").attr("transform", `translate(${T},${E})`);
      e && R.attr("opacity", 0).transition().delay(S * 60).duration(400).ease(xn).attr("opacity", 1);
      const N = R.append("rect").attr("class", `node-rect ${z ? "has-children" : "leaf"}`).attr("x", -Zt / 2).attr("y", -rn / 2).attr("width", Zt).attr("height", rn).attr("stroke", O);
      R.append("text").attr("class", "node-label").text(M.data.label), z && R.append("text").attr("class", "collapse-indicator").attr("x", Zt / 2 - 12).attr("y", 0).text(A ? "+" : "−"), z && (N.on("click", () => {
        this._toggleCollapse(M);
      }), R.select(".collapse-indicator").on("click", () => {
        this._toggleCollapse(M);
      }));
    }
  }
}
customElements.define("lv-tree", Mm);
const Em = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js", Lm = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;
let di = null;
class Pm extends I {
  constructor() {
    super(...arguments);
    D(this, "_rendered", !1);
  }
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    super.connectedCallback(), this.adoptStyles(Lm), this._renderDiagram();
  }
  async _renderDiagram() {
    var i;
    const e = (i = this.textContent) == null ? void 0 : i.trim();
    if (!e) {
      this.render('<div class="mermaid-container"></div>');
      return;
    }
    this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');
    try {
      await ke(Em);
    } catch {
      this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');
      return;
    }
    const r = window.mermaid;
    if (r) {
      di || (di = new Promise((s) => {
        const a = getComputedStyle(this), o = a.getPropertyValue("--lv-bg-card").trim() || "#1a1a2e", c = a.getPropertyValue("--lv-text").trim() || "#e4e4ec", l = a.getPropertyValue("--lv-accent").trim() || "#00d4ff", u = a.getPropertyValue("--lv-accent2").trim() || "#7b68ee", h = a.getPropertyValue("--lv-border").trim() || "#2a2a4a";
        r.initialize({
          startOnLoad: !1,
          theme: "base",
          themeVariables: {
            primaryColor: l,
            primaryTextColor: c,
            primaryBorderColor: h,
            secondaryColor: u,
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
      })), await di;
      try {
        const s = "lv-mermaid-" + Math.random().toString(36).slice(2, 8), { svg: a } = await r.render(s, e), o = this.root.getElementById("output");
        o && (o.innerHTML = a);
      } catch (s) {
        const a = this.root.getElementById("output");
        a && (a.innerHTML = `<div class="mermaid-error">Diagram error: ${s.message || s}</div>`);
      }
    }
  }
}
customElements.define("lv-mermaid", Pm);
export {
  I as LvBaseElement,
  Fl as clamp,
  Il as colorScale,
  ql as formatNum,
  Dm as getToken,
  Ke as lerp,
  ke as loadScript,
  Nm as loadStylesheet,
  Ms as scrollAnimator,
  Fm as setTheme,
  Rm as simColorScale,
  Om as uid
};

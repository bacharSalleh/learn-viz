(function(N,V){typeof exports=="object"&&typeof module<"u"?V(exports):typeof define=="function"&&define.amd?define(["exports"],V):(N=typeof globalThis<"u"?globalThis:N||self,V(N.LearnViz={}))})(this,(function(N){"use strict";var zg=Object.defineProperty;var ml=N=>{throw TypeError(N)};var Og=(N,V,J)=>V in N?zg(N,V,{enumerable:!0,configurable:!0,writable:!0,value:J}):N[V]=J;var O=(N,V,J)=>Og(N,typeof V!="symbol"?V+"":V,J),vl=(N,V,J)=>V.has(N)||ml("Cannot "+J);var Sn=(N,V,J)=>(vl(N,V,"read from private field"),J?J.call(N):V.get(N)),hs=(N,V,J)=>V.has(N)?ml("Cannot add the same private member more than once"):V instanceof WeakSet?V.add(N):V.set(N,J),xl=(N,V,J,R)=>(vl(N,V,"write to private field"),R?R.call(N,J):V.set(N,J),J);var Ye,$n;class V{constructor(){hs(this,Ye);hs(this,$n,new WeakSet);xl(this,Ye,new IntersectionObserver(t=>{for(const e of t)if(e.isIntersecting&&!Sn(this,$n).has(e.target)){Sn(this,$n).add(e.target);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=e.target;typeof i.animateIn=="function"&&(r?i.animateIn(!0):i.animateIn(!1))}},{threshold:.15}))}observe(t){Sn(this,Ye).observe(t)}unobserve(t){Sn(this,Ye).unobserve(t)}}Ye=new WeakMap,$n=new WeakMap;const J=new V;class R extends HTMLElement{constructor(){super();O(this,"root");this.root=this.attachShadow({mode:"open"})}get dir(){var e;return((e=this.closest("[dir]"))==null?void 0:e.getAttribute("dir"))||document.documentElement.dir||"ltr"}get isRtl(){return this.dir==="rtl"}adoptStyles(e){const r=new CSSStyleSheet;r.replaceSync(e),this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,r]}jsonAttr(e,r){const i=this.getAttribute(e);if(!i)return r;const s=i.replace(/\u2212/g,"-");try{return JSON.parse(s)}catch{return r}}render(e){this.root.innerHTML=e}animateIn(e){}connectedCallback(){J.observe(this)}disconnectedCallback(){J.unobserve(this)}}function Ae(n,t,e){return n+(t-n)*e}function fs(n,t,e){return Math.min(Math.max(n,t),e)}function ds(n){n=fs(n,0,1);const t=n<.5?Math.round(Ae(0,255,n*2)):255,e=n<.5?Math.round(Ae(200,230,n*2)):Math.round(Ae(230,50,(n-.5)*2)),r=n<.5?Math.round(Ae(83,60,n*2)):Math.round(Ae(60,80,(n-.5)*2));return`rgb(${t},${e},${r})`}function bl(n){return ds((1-n)/2)}function ps(n){return Number.isInteger(n)?n.toString():Math.abs(n)>=100?n.toFixed(0):Math.abs(n)>=1?n.toFixed(1):n.toFixed(2)}let yl=0;function wl(n="lv"){return`${n}-${++yl}`}function kl(n,t){const e=t||document.documentElement;return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim()}function Al(n,t){n.setAttribute("data-theme",t)}const Cl=`
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
`;class $l extends R{static get observedAttributes(){return["theme","dir"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Cl),this._render()}attributeChangedCallback(){this._render()}_render(){const t=this.getAttribute("dir")||"ltr";this.setAttribute("dir",t),this.render("<slot></slot>")}}customElements.define("lv-page",$l);const Sl=`
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
`;class Tl extends R{static get observedAttributes(){return["number","title","subtitle","gradient"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Sl),this._render()}attributeChangedCallback(){this._render()}_render(){const t=this.getAttribute("number")||"",e=this.getAttribute("title")||"",r=this.getAttribute("subtitle")||"",i=this.getAttribute("gradient")||"",s=i?`background: ${i};`:"";this.render(`
      <div class="hero" style="${s}">
        ${t?`<div class="number">${t}</div>`:""}
        <div class="content">
          <h1>${e}</h1>
          ${r?`<p class="subtitle">${r}</p>`:""}
        </div>
      </div>
    `)}}customElements.define("lv-hero",Tl);const Ml=`
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
`;class El extends R{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ml),this._render()}attributeChangedCallback(){this._render()}_render(){const t=this.getAttribute("title")||"";this.render(`
      ${t?`<h2>${t}</h2>`:""}
      <slot></slot>
    `)}}customElements.define("lv-section",El);const Pl=`
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
`;class zl extends R{constructor(){super(...arguments);O(this,"_rendering",!1)}static get observedAttributes(){return["variant"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Pl),this._render()}attributeChangedCallback(){this._rendering||this._render()}_render(){this._rendering||(this._rendering=!0,this.root.querySelector(".card")||this.render('<div class="card"><slot></slot></div>'),this._rendering=!1)}}customElements.define("lv-card",zl);const Ol=`
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
`;class Ll extends R{static get observedAttributes(){return["cols","gap"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ol),this._render()}attributeChangedCallback(){this.root.querySelector(".grid")||this._render()}_render(){this.render('<div class="grid"><slot></slot></div>')}}customElements.define("lv-grid",Ll);const Nl=`
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
`;class Rl extends R{static get observedAttributes(){return["label","active"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Nl),this.render("<slot></slot>"),this.setAttribute("role","tabpanel")}attributeChangedCallback(){}}customElements.define("lv-tab",Rl);const Dl=`
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
`;class Il extends R{constructor(){super(...arguments);O(this,"_tabs",[]);O(this,"_buttons",[]);O(this,"_activeIndex",0)}connectedCallback(){super.connectedCallback(),this.adoptStyles(Dl),requestAnimationFrame(()=>this._setup())}_setup(){if(this._tabs=Array.from(this.querySelectorAll("lv-tab")),this._tabs.length===0)return;const e=this._tabs.findIndex(s=>s.hasAttribute("active"));this._activeIndex=e>=0?e:0;const r=this._tabs.map((s,a)=>{const o=s.getAttribute("label")||`Tab ${a+1}`,c=a===this._activeIndex;return`<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c?"0":"-1"}"
        data-index="${a}"
      >${o}</button>`}).join("");this.render(`
      <div class="tablist" role="tablist">${r}</div>
      <div class="panels"><slot></slot></div>
    `),this._buttons=Array.from(this.root.querySelectorAll(".tab-btn")),this._activate(this._activeIndex);const i=this.root.querySelector(".tablist");i.addEventListener("click",s=>{const a=s.target.closest(".tab-btn");a&&this._activate(Number(a.dataset.index))}),i.addEventListener("keydown",(s=>{const a=this._buttons.length;let o=this._activeIndex;switch(s.key){case"ArrowRight":case"ArrowDown":s.preventDefault(),o=(o+1)%a;break;case"ArrowLeft":case"ArrowUp":s.preventDefault(),o=(o-1+a)%a;break;case"Home":s.preventDefault(),o=0;break;case"End":s.preventDefault(),o=a-1;break;case"Enter":case" ":s.preventDefault(),this._activate(o);return;default:return}this._buttons[o].focus(),this._activate(o)}))}_activate(e){this._activeIndex=e,this._buttons.forEach((r,i)=>{const s=i===e;r.setAttribute("aria-selected",String(s)),r.setAttribute("tabindex",s?"0":"-1")}),this._tabs.forEach((r,i)=>{i===e?r.setAttribute("active",""):r.removeAttribute("active")})}}customElements.define("lv-tabs",Il);const Fl=`
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
`;class ql extends R{static get observedAttributes(){return["prev","prev-label","next","next-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Fl),this._render()}attributeChangedCallback(){this._render()}_render(){const t=this.getAttribute("prev")||"",e=this.getAttribute("prev-label")||"Previous",r=this.getAttribute("next")||"",i=this.getAttribute("next-label")||"Next",s=this.isRtl,a=s?"→":"←",o=s?"←":"→";this.render(`
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
    `)}}customElements.define("lv-nav",ql);const Hl=`
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
`;class Bl extends R{static get observedAttributes(){return["vs"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Hl),this._render()}attributeChangedCallback(){this._render()}_render(){const t=this.getAttribute("vs"),e=t!==null,r=t||"VS";e?this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${r}</div>
          <slot name="right"></slot>
        </div>
      `):this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `)}}customElements.define("lv-comparison",Bl);const Vl=`
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
`,Xl=`
  <div class="val"></div>
  <div class="label"></div>
`;class Yl extends R{constructor(){super(...arguments);O(this,"_observer",null)}static get observedAttributes(){return["value","label","prefix","suffix","color","animated"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(Vl),this.render(Xl),this._update(),this._setupObserver()}disconnectedCallback(){var e,r;(e=super.disconnectedCallback)==null||e.call(this),(r=this._observer)==null||r.disconnect(),this._observer=null}attributeChangedCallback(e,r,i){this.root.querySelector(".val")&&this._update()}_update(){const e=this.getAttribute("color");e&&(this.style.setProperty("--_color",e),this.style.setProperty("--_glow",e));const r=this.root.querySelector(".label");r&&(r.textContent=this.getAttribute("label")||"");const i=this.root.querySelector(".val");if(i){const s=this.getAttribute("prefix")||"",a=this.getAttribute("suffix")||"",o=this.getAttribute("value")||"";i.textContent=s+o+a}}_setupObserver(){this.hasAttribute("animated")&&(this._observer=new IntersectionObserver(e=>{var r;for(const i of e)i.isIntersecting&&(this.animateIn(!1),(r=this._observer)==null||r.unobserve(this))},{threshold:.1}),this._observer.observe(this))}animateIn(e){if(!this.hasAttribute("animated")||e)return;const r=parseFloat(this.getAttribute("value")||"0");if(isNaN(r))return;const i=1200,s=performance.now(),a=this.root.querySelector(".val"),o=c=>{const l=Math.min((c-s)/i,1),u=1-Math.pow(1-l,3),h=r*u;a.textContent=(this.getAttribute("prefix")||"")+ps(h)+(this.getAttribute("suffix")||""),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}customElements.define("lv-metric",Yl);const gs={info:{color:"var(--lv-info, #3b82f6)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 9v5M10 6.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`},tip:{color:"var(--lv-positive, #22c55e)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2a5 5 0 0 1 5 5c0 2-1.5 3.2-2 4-.4.6-.5 1-.5 1.5V13H7.5v-.5c0-.5-.1-.9-.5-1.5-.5-.8-2-2-2-4a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.5 15.5h5M8.5 18h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`},warning:{color:"var(--lv-warning, #eab308)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L1 18h18L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M10 8v4M10 14.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`},danger:{color:"var(--lv-negative, #ef4444)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}},Gl=`
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
`;class Wl extends R{static get observedAttributes(){return["type","title"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Gl),this._render()}attributeChangedCallback(t,e,r){this.root.querySelector(".callout")&&this._render()}_getType(){const t=this.getAttribute("type");return gs[t]?t:"info"}_render(){const t=this._getType(),e=gs[t],r=this.getAttribute("title")||"";this.style.setProperty("--_type-color",e.color),this.style.setProperty("--_type-bg",`color-mix(in srgb, ${e.color} 8%, transparent)`);const i=`
      <div class="callout" role="note">
        <div class="header">
          ${e.icon}
          ${r?`<span class="title">${r}</span>`:""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;this.render(i)}}customElements.define("lv-callout",Wl);const Ul=`
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
`,jl=`
  <span class="badge"><slot></slot></span>
`;class Kl extends R{static get observedAttributes(){return["color","variant"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Ul),this.render(jl),this._updateColor()}attributeChangedCallback(t,e,r){t==="color"&&this._updateColor()}_updateColor(){const t=this.getAttribute("color");t?this.style.setProperty("--_color",t):this.style.removeProperty("--_color")}}customElements.define("lv-badge",Kl);const Zl=`
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`,_s="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",Ql="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";let Tn=null;function Jl(){return window.katex?Promise.resolve():Tn||(Tn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=_s,document.head.appendChild(e);const r=document.createElement("script");r.src=Ql,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load KaTeX")),document.head.appendChild(r)}),Tn)}class tc extends R{constructor(){super(...arguments);O(this,"_source","")}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(Zl),this._render()}async _render(){try{await Jl();const e=this.hasAttribute("display"),r=window.katex.renderToString(this._source,{displayMode:e,throwOnError:!1});this.root.innerHTML=`<link rel="stylesheet" href="${_s}"><span class="katex-container">${r}</span>`}catch{this.root.innerHTML=`<span class="fallback">${this._escapeHtml(this._source)}</span>`}}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-math",tc);const ec=`
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
`,nc="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js",ms="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";let Mn=null;function rc(){return window.hljs?Promise.resolve():Mn||(Mn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=ms,document.head.appendChild(e);const r=document.createElement("script");r.src=nc,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load highlight.js")),document.head.appendChild(r)}),Mn)}class ic extends R{constructor(){super(...arguments);O(this,"_source","")}static get observedAttributes(){return["language","line-numbers"]}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(ec),this._render()}async _render(){const e=this.getAttribute("language")||"",r=this.hasAttribute("line-numbers");let i;try{await rc();const a=window.hljs;e&&a.getLanguage(e)?i=a.highlight(this._source,{language:e}).value:i=a.highlightAuto(this._source).value}catch{i=this._escapeHtml(this._source)}let s;r?s=i.split(`
`).map((o,c)=>`<span class="line-num">${c+1}</span>${o}`).join(`
`):s=i,this.root.innerHTML=`<link rel="stylesheet" href="${ms}"><div class="code-block"><pre><code>${s}</code></pre></div>`}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-code",ic);const sc=`
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
`;class ac extends R{static get observedAttributes(){return["data","labels","highlight"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(sc),this._render()}attributeChangedCallback(){this.root&&this._render()}_render(){var h;const t=this.jsonAttr("data",[]),e=this.jsonAttr("labels",{}),r=this.jsonAttr("highlight",[]);if(!t.length){this.root.innerHTML="";return}const i=t.length,s=((h=t[0])==null?void 0:h.length)||0,a=!!(e.rows&&e.rows.length),o=!!(e.cols&&e.cols.length),c=new Set(r.map(([f,d])=>`${f},${d}`)),l=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;let u='<div class="matrix-wrapper">';if(o){const f=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;u+=`<div class="col-labels" style="grid-template-columns: ${f}">`,a&&(u+="<span></span>");for(let d=0;d<s;d++)u+=`<span class="col-label">${this._escapeHtml(e.cols[d]||"")}</span>`;u+="</div>"}u+=`<div class="matrix" style="grid-template-columns: ${l}">`,u+='<div class="bracket-left"></div>',u+='<div class="bracket-right"></div>';for(let f=0;f<i;f++){a&&(u+=`<span class="row-label">${this._escapeHtml(e.rows[f]||"")}</span>`);for(let d=0;d<s;d++){const _=t[f][d],p=typeof _=="number"?this._formatNum(_):String(_),v=c.has(`${f},${d}`);u+=`<span class="cell${v?" highlight":""}">${p}</span>`}}u+="</div></div>",this.root.innerHTML=u}_formatNum(t){return t.toFixed(3).replace(/0$/,"")}_escapeHtml(t){const e=document.createElement("span");return e.textContent=t,e.innerHTML}}customElements.define("lv-matrix",ac);const oc=`
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
`;class lc extends R{constructor(){super(...arguments);O(this,"_answered",!1)}static get observedAttributes(){return["question","options","correct","explanation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(oc),this._render(),this._attachListeners()}attributeChangedCallback(){this._answered||(this._render(),this._attachListeners())}get _options(){return this.jsonAttr("options",[])}get _correctIndex(){return parseInt(this.getAttribute("correct")||"0",10)}_render(){const e=this.getAttribute("question")||"",r=this._options,i=this.getAttribute("explanation")||"",s=r.map((a,o)=>`
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");this.render(`
      <div class="question">${e}</div>
      <div class="options">${s}</div>
      ${i?`<div class="explanation"><div class="explanation-inner">${i}</div></div>`:""}
    `)}_attachListeners(){this.root.querySelectorAll(".option").forEach(r=>{r.addEventListener("click",()=>this._select(r)),r.addEventListener("keydown",i=>{const s=i.key;(s==="Enter"||s===" ")&&(i.preventDefault(),this._select(r))})})}_select(e){if(this._answered)return;this._answered=!0;const r=parseInt(e.dataset.index||"0",10),i=this._correctIndex,s=r===i;this.root.querySelectorAll(".option").forEach((c,l)=>{const u=c;u.removeAttribute("tabindex"),l===i?(u.classList.add("correct"),u.querySelector(".icon").textContent="✓"):l===r&&!s?(u.classList.add("wrong"),u.querySelector(".icon").textContent="✗"):u.classList.add("dimmed")});const o=this.root.querySelector(".explanation");o&&requestAnimationFrame(()=>o.classList.add("visible")),this.dispatchEvent(new CustomEvent("lv-quiz-answer",{bubbles:!0,composed:!0,detail:{correct:s,selected:r,answer:i}}))}}customElements.define("lv-quiz",lc);const cc=`
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
`;class uc extends R{constructor(){super(...arguments);O(this,"_revealed",!1)}static get observedAttributes(){return["label","revealed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(cc),this._render(),this._attachListeners(),this.hasAttribute("revealed")&&this._reveal(!1)}attributeChangedCallback(e){if(e==="revealed"&&this.hasAttribute("revealed")&&!this._revealed&&this._reveal(!0),e==="label"){const r=this.root.querySelector(".trigger-label");r&&(r.textContent=this._label)}}get _label(){return this.getAttribute("label")||"اضغط للإظهار"}_render(){this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `)}_attachListeners(){const e=this.root.querySelector(".trigger");e.addEventListener("click",()=>this._reveal(!0)),e.addEventListener("keydown",r=>{const i=r.key;(i==="Enter"||i===" ")&&(r.preventDefault(),this._reveal(!0))})}_reveal(e){if(this._revealed)return;this._revealed=!0;const r=this.root.querySelector(".trigger"),i=this.root.querySelector(".content");r.setAttribute("aria-expanded","true"),e?(r.classList.add("hidden"),setTimeout(()=>i.classList.add("visible"),150)):(r.classList.add("hidden"),i.classList.add("visible"))}}customElements.define("lv-reveal",uc);const hc=`
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
`;class fc extends R{constructor(){super(...arguments);O(this,"_input",null);O(this,"_valueEl",null);O(this,"_popTimeout",null)}static get observedAttributes(){return["min","max","step","value","label","name","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(hc),this._render(),this._bind(),this._updateTrack()}attributeChangedCallback(){this._input&&(this._render(),this._bind(),this._updateTrack())}get _min(){return parseFloat(this.getAttribute("min")||"0")}get _max(){return parseFloat(this.getAttribute("max")||"100")}get _step(){return this.getAttribute("step")||"1"}get _value(){return this.getAttribute("value")||"50"}get _label(){return this.getAttribute("label")||""}get _name(){return this.getAttribute("name")||""}get _color(){return this.getAttribute("color")||""}_render(){const e=this._color?`--fill-color: ${this._color};`:"";this.render(`
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
        ${this._name?`name="${this._name}"`:""}
        style="${e}"
        aria-label="${this._label}"
      />
    `),this._input=this.root.querySelector("input"),this._valueEl=this.root.querySelector(".value-display")}_bind(){this._input&&this._input.addEventListener("input",()=>{const e=this._input.value;this._valueEl&&(this._valueEl.textContent=e,this._valueEl.classList.add("pop"),this._popTimeout&&clearTimeout(this._popTimeout),this._popTimeout=window.setTimeout(()=>{var r;(r=this._valueEl)==null||r.classList.remove("pop")},150)),this._updateTrack(),this.dispatchEvent(new CustomEvent("lv-change",{bubbles:!0,composed:!0,detail:{name:this._name,value:parseFloat(e)}}))})}_updateTrack(){if(!this._input)return;const e=this._min,r=this._max,s=(parseFloat(this._input.value)-e)/(r-e)*100,o=`linear-gradient(to right, ${this._color||"var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;this._input.style.setProperty("--track-bg",o),this._input.style.background=o,this._input.style.borderRadius="9999px"}}customElements.define("lv-slider",fc);const dc=`
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
`;class pc extends R{static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(dc),this._render(),this._bind()}_render(){this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `)}_bind(){this.addEventListener("lv-change",()=>{const t=this._collectParams();this.dispatchEvent(new CustomEvent("lv-params-change",{bubbles:!0,composed:!0,detail:t}))})}_collectParams(){const t=this.querySelectorAll('lv-slider[slot="controls"]'),e={};return t.forEach(r=>{var s;const i=r.getAttribute("name");if(i){const a=(s=r.root)==null?void 0:s.querySelector("input"),o=parseFloat(a?a.value:r.getAttribute("value")||"0");e[i]=o}}),e}}customElements.define("lv-playground",pc);const gc=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];function vs(n){return String(n).split("").map(t=>gc[parseInt(t)]??t).join("")}const _c=`
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
`;class mc extends R{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(_c),this._render()}attributeChangedCallback(){this.root.querySelector(".title")&&this._render()}get _title(){return this.getAttribute("title")||""}_render(){this.render(`
      ${this._title?`<div class="title">${this._title}</div>`:""}
      <slot></slot>
    `)}}customElements.define("lv-step",mc);const vc=`
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
`;class xc extends R{constructor(){super(...arguments);O(this,"_current",0);O(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(vc),this._render(),requestAnimationFrame(()=>{this._steps=Array.from(this.querySelectorAll("lv-step")),this._showStep(0,null),this._bind()})}get _total(){return this._steps.length}_render(){this.render(`
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
    `)}_bind(){const e=this.root.querySelector(".prev"),r=this.root.querySelector(".next");e.addEventListener("click",()=>this._go(-1)),r.addEventListener("click",()=>this._go(1)),this.addEventListener("keydown",i=>{i.key==="ArrowRight"?(i.preventDefault(),this._go(this.isRtl?-1:1)):i.key==="ArrowLeft"&&(i.preventDefault(),this._go(this.isRtl?1:-1))}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_go(e){const r=this._current+e;r<0||r>=this._total||(this._current,this._current=r,this._showStep(r,e>0?"forward":"backward"))}_showStep(e,r){this._steps.forEach((o,c)=>{o.classList.remove("active","from-start","from-end"),c===e&&(o.classList.add("active"),r==="forward"?o.classList.add(this.isRtl?"from-start":"from-end"):r==="backward"&&o.classList.add(this.isRtl?"from-end":"from-start"))});const i=this.root.querySelector(".counter");i&&(i.textContent=`${vs(e+1)} / ${vs(this._total)}`);const s=this.root.querySelector(".prev"),a=this.root.querySelector(".next");s&&(s.disabled=e===0),a&&(a.disabled=e===this._total-1)}}customElements.define("lv-stepper",xc);function En(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function bc(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Tr(n){let t,e,r;n.length!==2?(t=En,e=(o,c)=>En(n(o),c),r=(o,c)=>n(o)-c):(t=n===En||n===bc?n:yc,e=n,r=n);function i(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<0?l=h+1:u=h}while(l<u)}return l}function s(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function a(o,c,l=0,u=o.length){const h=i(o,c,l,u-1);return h>l&&r(o[h-1],c)>-r(o[h],c)?h-1:h}return{left:i,center:a,right:s}}function yc(){return 0}function wc(n){return n===null?NaN:+n}const kc=Tr(En).right;Tr(wc).center;function Pn(n,t){let e,r;if(t===void 0)for(const i of n)i!=null&&(e===void 0?i>=i&&(e=r=i):(e>i&&(e=i),r<i&&(r=i)));else{let i=-1;for(let s of n)(s=t(s,++i,n))!=null&&(e===void 0?s>=s&&(e=r=s):(e>s&&(e=s),r<s&&(r=s)))}return[e,r]}class xs extends Map{constructor(t,e=$c){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),t!=null)for(const[r,i]of t)this.set(r,i)}get(t){return super.get(bs(this,t))}has(t){return super.has(bs(this,t))}set(t,e){return super.set(Ac(this,t),e)}delete(t){return super.delete(Cc(this,t))}}function bs({_intern:n,_key:t},e){const r=t(e);return n.has(r)?n.get(r):e}function Ac({_intern:n,_key:t},e){const r=t(e);return n.has(r)?n.get(r):(n.set(r,e),e)}function Cc({_intern:n,_key:t},e){const r=t(e);return n.has(r)&&(e=n.get(r),n.delete(r)),e}function $c(n){return n!==null&&typeof n=="object"?n.valueOf():n}const Sc=Math.sqrt(50),Tc=Math.sqrt(10),Mc=Math.sqrt(2);function zn(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),a=s>=Sc?10:s>=Tc?5:s>=Mc?2:1;let o,c,l;return i<0?(l=Math.pow(10,-i)/a,o=Math.round(n*l),c=Math.round(t*l),o/l<n&&++o,c/l>t&&--c,l=-l):(l=Math.pow(10,i)*a,o=Math.round(n/l),c=Math.round(t/l),o*l<n&&++o,c*l>t&&--c),c<o&&.5<=e&&e<2?zn(n,t,e*2):[o,c,l]}function Ec(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,s,a]=r?zn(t,n,e):zn(n,t,e);if(!(s>=i))return[];const o=s-i+1,c=new Array(o);if(r)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(i+l)/-a;else for(let l=0;l<o;++l)c[l]=(i+l)*a;return c}function Mr(n,t,e){return t=+t,n=+n,e=+e,zn(n,t,e)[2]}function Pc(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?Mr(t,n,e):Mr(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function On(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function zc(n,t){let e;for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);return e}function Oc(n,t,e){n=+n,t=+t,e=(i=arguments.length)<2?(t=n,n=0,1):i<3?1:+e;for(var r=-1,i=Math.max(0,Math.ceil((t-n)/e))|0,s=new Array(i);++r<i;)s[r]=n+r*e;return s}function Lc(n){return n}var Er=1,Pr=2,zr=3,We=4,ys=1e-6;function Nc(n){return"translate("+n+",0)"}function Rc(n){return"translate(0,"+n+")"}function Dc(n){return t=>+n(t)}function Ic(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function Fc(){return!this.__axis}function ws(n,t){var e=[],r=null,i=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===Er||n===We?-1:1,u=n===We||n===Pr?"x":"y",h=n===Er||n===zr?Nc:Rc;function f(d){var _=r??(t.ticks?t.ticks.apply(t,e):t.domain()),p=i??(t.tickFormat?t.tickFormat.apply(t,e):Lc),v=Math.max(s,0)+o,b=t.range(),y=+b[0]+c,x=+b[b.length-1]+c,g=(t.bandwidth?Ic:Dc)(t.copy(),c),m=d.selection?d.selection():d,w=m.selectAll(".domain").data([null]),$=m.selectAll(".tick").data(_,t).order(),A=$.exit(),k=$.enter().append("g").attr("class","tick"),C=$.select("line"),T=$.select("text");w=w.merge(w.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),$=$.merge(k),C=C.merge(k.append("line").attr("stroke","currentColor").attr(u+"2",l*s)),T=T.merge(k.append("text").attr("fill","currentColor").attr(u,l*v).attr("dy",n===Er?"0em":n===zr?"0.71em":"0.32em")),d!==m&&(w=w.transition(d),$=$.transition(d),C=C.transition(d),T=T.transition(d),A=A.transition(d).attr("opacity",ys).attr("transform",function(S){return isFinite(S=g(S))?h(S+c):this.getAttribute("transform")}),k.attr("opacity",ys).attr("transform",function(S){var M=this.parentNode.__axis;return h((M&&isFinite(M=M(S))?M:g(S))+c)})),A.remove(),w.attr("d",n===We||n===Pr?a?"M"+l*a+","+y+"H"+c+"V"+x+"H"+l*a:"M"+c+","+y+"V"+x:a?"M"+y+","+l*a+"V"+c+"H"+x+"V"+l*a:"M"+y+","+c+"H"+x),$.attr("opacity",1).attr("transform",function(S){return h(g(S)+c)}),C.attr(u+"2",l*s),T.attr(u,l*v).text(p),m.filter(Fc).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===Pr?"start":n===We?"end":"middle"),m.each(function(){this.__axis=g})}return f.scale=function(d){return arguments.length?(t=d,f):t},f.ticks=function(){return e=Array.from(arguments),f},f.tickArguments=function(d){return arguments.length?(e=d==null?[]:Array.from(d),f):e.slice()},f.tickValues=function(d){return arguments.length?(r=d==null?null:Array.from(d),f):r&&r.slice()},f.tickFormat=function(d){return arguments.length?(i=d,f):i},f.tickSize=function(d){return arguments.length?(s=a=+d,f):s},f.tickSizeInner=function(d){return arguments.length?(s=+d,f):s},f.tickSizeOuter=function(d){return arguments.length?(a=+d,f):a},f.tickPadding=function(d){return arguments.length?(o=+d,f):o},f.offset=function(d){return arguments.length?(c=+d,f):c},f}function Ln(n){return ws(zr,n)}function Nn(n){return ws(We,n)}var qc={value:()=>{}};function Or(){for(var n=0,t=arguments.length,e={},r;n<t;++n){if(!(r=arguments[n]+"")||r in e||/[\s.]/.test(r))throw new Error("illegal type: "+r);e[r]=[]}return new Rn(e)}function Rn(n){this._=n}function Hc(n,t){return n.trim().split(/^|\s+/).map(function(e){var r="",i=e.indexOf(".");if(i>=0&&(r=e.slice(i+1),e=e.slice(0,i)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:r}})}Rn.prototype=Or.prototype={constructor:Rn,on:function(n,t){var e=this._,r=Hc(n+"",e),i,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((i=(n=r[s]).type)&&(i=Bc(e[i],n.name)))return i;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(i=(n=r[s]).type)e[i]=ks(e[i],n.name,t);else if(t==null)for(i in e)e[i]=ks(e[i],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Rn(n)},call:function(n,t){if((i=arguments.length-2)>0)for(var e=new Array(i),r=0,i,s;r<i;++r)e[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)}};function Bc(n,t){for(var e=0,r=n.length,i;e<r;++e)if((i=n[e]).name===t)return i.value}function ks(n,t,e){for(var r=0,i=n.length;r<i;++r)if(n[r].name===t){n[r]=qc,n=n.slice(0,r).concat(n.slice(r+1));break}return e!=null&&n.push({name:t,value:e}),n}var Lr="http://www.w3.org/1999/xhtml";const As={svg:"http://www.w3.org/2000/svg",xhtml:Lr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Dn(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),As.hasOwnProperty(t)?{space:As[t],local:n}:n}function Vc(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Lr&&t.documentElement.namespaceURI===Lr?t.createElement(n):t.createElementNS(e,n)}}function Xc(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Cs(n){var t=Dn(n);return(t.local?Xc:Vc)(t)}function Yc(){}function Nr(n){return n==null?Yc:function(){return this.querySelector(n)}}function Gc(n){typeof n!="function"&&(n=Nr(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=new Array(a),c,l,u=0;u<a;++u)(c=s[u])&&(l=n.call(c,c.__data__,u,s))&&("__data__"in c&&(l.__data__=c.__data__),o[u]=l);return new mt(r,this._parents)}function Wc(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function Uc(){return[]}function $s(n){return n==null?Uc:function(){return this.querySelectorAll(n)}}function jc(n){return function(){return Wc(n.apply(this,arguments))}}function Kc(n){typeof n=="function"?n=jc(n):n=$s(n);for(var t=this._groups,e=t.length,r=[],i=[],s=0;s<e;++s)for(var a=t[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(r.push(n.call(c,c.__data__,l,a)),i.push(c));return new mt(r,i)}function Ss(n){return function(){return this.matches(n)}}function Ts(n){return function(t){return t.matches(n)}}var Zc=Array.prototype.find;function Qc(n){return function(){return Zc.call(this.children,n)}}function Jc(){return this.firstElementChild}function tu(n){return this.select(n==null?Jc:Qc(typeof n=="function"?n:Ts(n)))}var eu=Array.prototype.filter;function nu(){return Array.from(this.children)}function ru(n){return function(){return eu.call(this.children,n)}}function iu(n){return this.selectAll(n==null?nu:ru(typeof n=="function"?n:Ts(n)))}function su(n){typeof n!="function"&&(n=Ss(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new mt(r,this._parents)}function Ms(n){return new Array(n.length)}function au(){return new mt(this._enter||this._groups.map(Ms),this._parents)}function In(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}In.prototype={constructor:In,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function ou(n){return function(){return n}}function lu(n,t,e,r,i,s){for(var a=0,o,c=t.length,l=s.length;a<l;++a)(o=t[a])?(o.__data__=s[a],r[a]=o):e[a]=new In(n,s[a]);for(;a<c;++a)(o=t[a])&&(i[a]=o)}function cu(n,t,e,r,i,s,a){var o,c,l=new Map,u=t.length,h=s.length,f=new Array(u),d;for(o=0;o<u;++o)(c=t[o])&&(f[o]=d=a.call(c,c.__data__,o,t)+"",l.has(d)?i[o]=c:l.set(d,c));for(o=0;o<h;++o)d=a.call(n,s[o],o,s)+"",(c=l.get(d))?(r[o]=c,c.__data__=s[o],l.delete(d)):e[o]=new In(n,s[o]);for(o=0;o<u;++o)(c=t[o])&&l.get(f[o])===c&&(i[o]=c)}function uu(n){return n.__data__}function hu(n,t){if(!arguments.length)return Array.from(this,uu);var e=t?cu:lu,r=this._parents,i=this._groups;typeof n!="function"&&(n=ou(n));for(var s=i.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var u=r[l],h=i[l],f=h.length,d=fu(n.call(u,u&&u.__data__,l,r)),_=d.length,p=o[l]=new Array(_),v=a[l]=new Array(_),b=c[l]=new Array(f);e(u,h,p,v,b,d,t);for(var y=0,x=0,g,m;y<_;++y)if(g=p[y]){for(y>=x&&(x=y+1);!(m=v[x])&&++x<_;);g._next=m||null}}return a=new mt(a,r),a._enter=o,a._exit=c,a}function fu(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function du(){return new mt(this._exit||this._groups.map(Ms),this._parents)}function pu(n,t,e){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),t!=null&&(i=t(i),i&&(i=i.selection())),e==null?s.remove():e(s),r&&i?r.merge(i).order():i}function gu(n){for(var t=n.selection?n.selection():n,e=this._groups,r=t._groups,i=e.length,s=r.length,a=Math.min(i,s),o=new Array(i),c=0;c<a;++c)for(var l=e[c],u=r[c],h=l.length,f=o[c]=new Array(h),d,_=0;_<h;++_)(d=l[_]||u[_])&&(f[_]=d);for(;c<i;++c)o[c]=e[c];return new mt(o,this._parents)}function _u(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var r=n[t],i=r.length-1,s=r[i],a;--i>=0;)(a=r[i])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function mu(n){n||(n=vu);function t(h,f){return h&&f?n(h.__data__,f.__data__):!h-!f}for(var e=this._groups,r=e.length,i=new Array(r),s=0;s<r;++s){for(var a=e[s],o=a.length,c=i[s]=new Array(o),l,u=0;u<o;++u)(l=a[u])&&(c[u]=l);c.sort(t)}return new mt(i,this._parents).order()}function vu(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function xu(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function bu(){return Array.from(this)}function yu(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length;i<s;++i){var a=r[i];if(a)return a}return null}function wu(){let n=0;for(const t of this)++n;return n}function ku(){return!this.node()}function Au(n){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var i=t[e],s=0,a=i.length,o;s<a;++s)(o=i[s])&&n.call(o,o.__data__,s,i);return this}function Cu(n){return function(){this.removeAttribute(n)}}function $u(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Su(n,t){return function(){this.setAttribute(n,t)}}function Tu(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function Mu(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function Eu(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function Pu(n,t){var e=Dn(n);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((t==null?e.local?$u:Cu:typeof t=="function"?e.local?Eu:Mu:e.local?Tu:Su)(e,t))}function Es(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function zu(n){return function(){this.style.removeProperty(n)}}function Ou(n,t,e){return function(){this.style.setProperty(n,t,e)}}function Lu(n,t,e){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,e)}}function Nu(n,t,e){return arguments.length>1?this.each((t==null?zu:typeof t=="function"?Lu:Ou)(n,t,e??"")):Ce(this.node(),n)}function Ce(n,t){return n.style.getPropertyValue(t)||Es(n).getComputedStyle(n,null).getPropertyValue(t)}function Ru(n){return function(){delete this[n]}}function Du(n,t){return function(){this[n]=t}}function Iu(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function Fu(n,t){return arguments.length>1?this.each((t==null?Ru:typeof t=="function"?Iu:Du)(n,t)):this.node()[n]}function Ps(n){return n.trim().split(/^|\s+/)}function Rr(n){return n.classList||new zs(n)}function zs(n){this._node=n,this._names=Ps(n.getAttribute("class")||"")}zs.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Os(n,t){for(var e=Rr(n),r=-1,i=t.length;++r<i;)e.add(t[r])}function Ls(n,t){for(var e=Rr(n),r=-1,i=t.length;++r<i;)e.remove(t[r])}function qu(n){return function(){Os(this,n)}}function Hu(n){return function(){Ls(this,n)}}function Bu(n,t){return function(){(t.apply(this,arguments)?Os:Ls)(this,n)}}function Vu(n,t){var e=Ps(n+"");if(arguments.length<2){for(var r=Rr(this.node()),i=-1,s=e.length;++i<s;)if(!r.contains(e[i]))return!1;return!0}return this.each((typeof t=="function"?Bu:t?qu:Hu)(e,t))}function Xu(){this.textContent=""}function Yu(n){return function(){this.textContent=n}}function Gu(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function Wu(n){return arguments.length?this.each(n==null?Xu:(typeof n=="function"?Gu:Yu)(n)):this.node().textContent}function Uu(){this.innerHTML=""}function ju(n){return function(){this.innerHTML=n}}function Ku(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function Zu(n){return arguments.length?this.each(n==null?Uu:(typeof n=="function"?Ku:ju)(n)):this.node().innerHTML}function Qu(){this.nextSibling&&this.parentNode.appendChild(this)}function Ju(){return this.each(Qu)}function th(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function eh(){return this.each(th)}function nh(n){var t=typeof n=="function"?n:Cs(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function rh(){return null}function ih(n,t){var e=typeof n=="function"?n:Cs(n),r=t==null?rh:typeof t=="function"?t:Nr(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function sh(){var n=this.parentNode;n&&n.removeChild(this)}function ah(){return this.each(sh)}function oh(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function lh(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function ch(n){return this.select(n?lh:oh)}function uh(n){return arguments.length?this.property("__data__",n):this.node().__data__}function hh(n){return function(t){n.call(this,t,this.__data__)}}function fh(n){return n.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");return r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),{type:t,name:e}})}function dh(n){return function(){var t=this.__on;if(t){for(var e=0,r=-1,i=t.length,s;e<i;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++r]=s;++r?t.length=r:delete this.__on}}}function ph(n,t,e){return function(){var r=this.__on,i,s=hh(t);if(r){for(var a=0,o=r.length;a<o;++a)if((i=r[a]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=e),i.value=t;return}}this.addEventListener(n.type,s,e),i={type:n.type,name:n.name,value:t,listener:s,options:e},r?r.push(i):this.__on=[i]}}function gh(n,t,e){var r=fh(n+""),i,s=r.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,u;c<l;++c)for(i=0,u=o[c];i<s;++i)if((a=r[i]).type===u.type&&a.name===u.name)return u.value}return}for(o=t?ph:dh,i=0;i<s;++i)this.each(o(r[i],t,e));return this}function Ns(n,t,e){var r=Es(n),i=r.CustomEvent;typeof i=="function"?i=new i(t,e):(i=r.document.createEvent("Event"),e?(i.initEvent(t,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(t,!1,!1)),n.dispatchEvent(i)}function _h(n,t){return function(){return Ns(this,n,t)}}function mh(n,t){return function(){return Ns(this,n,t.apply(this,arguments))}}function vh(n,t){return this.each((typeof t=="function"?mh:_h)(n,t))}function*xh(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length,a;i<s;++i)(a=r[i])&&(yield a)}var Rs=[null];function mt(n,t){this._groups=n,this._parents=t}function Ue(){return new mt([[document.documentElement]],Rs)}function bh(){return this}mt.prototype=Ue.prototype={constructor:mt,select:Gc,selectAll:Kc,selectChild:tu,selectChildren:iu,filter:su,data:hu,enter:au,exit:du,join:pu,merge:gu,selection:bh,order:_u,sort:mu,call:xu,nodes:bu,node:yu,size:wu,empty:ku,each:Au,attr:Pu,style:Nu,property:Fu,classed:Vu,text:Wu,html:Zu,raise:Ju,lower:eh,append:nh,insert:ih,remove:ah,clone:ch,datum:uh,on:gh,dispatch:vh,[Symbol.iterator]:xh};function G(n){return typeof n=="string"?new mt([[document.querySelector(n)]],[document.documentElement]):new mt([[n]],Rs)}function yh(n){let t;for(;t=n.sourceEvent;)n=t;return n}function Dr(n,t){if(n=yh(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}}return[n.pageX,n.pageY]}const wh={passive:!1},je={capture:!0,passive:!1};function Ir(n){n.stopImmediatePropagation()}function $e(n){n.preventDefault(),n.stopImmediatePropagation()}function kh(n){var t=n.document.documentElement,e=G(n).on("dragstart.drag",$e,je);"onselectstart"in t?e.on("selectstart.drag",$e,je):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function Ah(n,t){var e=n.document.documentElement,r=G(n).on("dragstart.drag",null);t&&(r.on("click.drag",$e,je),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}const Fn=n=>()=>n;function Fr(n,{sourceEvent:t,subject:e,target:r,identifier:i,active:s,x:a,y:o,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:e,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}Fr.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};function Ch(n){return!n.ctrlKey&&!n.button}function $h(){return this.parentNode}function Sh(n,t){return t??{x:n.x,y:n.y}}function Th(){return navigator.maxTouchPoints||"ontouchstart"in this}function Mh(){var n=Ch,t=$h,e=Sh,r=Th,i={},s=Or("start","drag","end"),a=0,o,c,l,u,h=0;function f(g){g.on("mousedown.drag",d).filter(r).on("touchstart.drag",v).on("touchmove.drag",b,wh).on("touchend.drag touchcancel.drag",y).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(g,m){if(!(u||!n.call(this,g,m))){var w=x(this,t.call(this,g,m),g,m,"mouse");w&&(G(g.view).on("mousemove.drag",_,je).on("mouseup.drag",p,je),kh(g.view),Ir(g),l=!1,o=g.clientX,c=g.clientY,w("start",g))}}function _(g){if($e(g),!l){var m=g.clientX-o,w=g.clientY-c;l=m*m+w*w>h}i.mouse("drag",g)}function p(g){G(g.view).on("mousemove.drag mouseup.drag",null),Ah(g.view,l),$e(g),i.mouse("end",g)}function v(g,m){if(n.call(this,g,m)){var w=g.changedTouches,$=t.call(this,g,m),A=w.length,k,C;for(k=0;k<A;++k)(C=x(this,$,g,m,w[k].identifier,w[k]))&&(Ir(g),C("start",g,w[k]))}}function b(g){var m=g.changedTouches,w=m.length,$,A;for($=0;$<w;++$)(A=i[m[$].identifier])&&($e(g),A("drag",g,m[$]))}function y(g){var m=g.changedTouches,w=m.length,$,A;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),$=0;$<w;++$)(A=i[m[$].identifier])&&(Ir(g),A("end",g,m[$]))}function x(g,m,w,$,A,k){var C=s.copy(),T=Dr(k||w,m),S,M,E;if((E=e.call(g,new Fr("beforestart",{sourceEvent:w,target:f,identifier:A,active:a,x:T[0],y:T[1],dx:0,dy:0,dispatch:C}),$))!=null)return S=E.x-T[0]||0,M=E.y-T[1]||0,function P(z,L,F){var X=T,q;switch(z){case"start":i[A]=P,q=a++;break;case"end":delete i[A],--a;case"drag":T=Dr(F||L,m),q=a;break}C.call(z,g,new Fr(z,{sourceEvent:L,subject:E,target:f,identifier:A,active:q,x:T[0]+S,y:T[1]+M,dx:T[0]-X[0],dy:T[1]-X[1],dispatch:C}),$)}}return f.filter=function(g){return arguments.length?(n=typeof g=="function"?g:Fn(!!g),f):n},f.container=function(g){return arguments.length?(t=typeof g=="function"?g:Fn(g),f):t},f.subject=function(g){return arguments.length?(e=typeof g=="function"?g:Fn(g),f):e},f.touchable=function(g){return arguments.length?(r=typeof g=="function"?g:Fn(!!g),f):r},f.on=function(){var g=s.on.apply(s,arguments);return g===s?f:g},f.clickDistance=function(g){return arguments.length?(h=(g=+g)*g,f):Math.sqrt(h)},f}function qr(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function Ds(n,t){var e=Object.create(n.prototype);for(var r in t)e[r]=t[r];return e}function Ke(){}var Ze=.7,qn=1/Ze,Se="\\s*([+-]?\\d+)\\s*",Qe="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Nt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Eh=/^#([0-9a-f]{3,8})$/,Ph=new RegExp(`^rgb\\(${Se},${Se},${Se}\\)$`),zh=new RegExp(`^rgb\\(${Nt},${Nt},${Nt}\\)$`),Oh=new RegExp(`^rgba\\(${Se},${Se},${Se},${Qe}\\)$`),Lh=new RegExp(`^rgba\\(${Nt},${Nt},${Nt},${Qe}\\)$`),Nh=new RegExp(`^hsl\\(${Qe},${Nt},${Nt}\\)$`),Rh=new RegExp(`^hsla\\(${Qe},${Nt},${Nt},${Qe}\\)$`),Is={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};qr(Ke,Zt,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Fs,formatHex:Fs,formatHex8:Dh,formatHsl:Ih,formatRgb:qs,toString:qs});function Fs(){return this.rgb().formatHex()}function Dh(){return this.rgb().formatHex8()}function Ih(){return Ys(this).formatHsl()}function qs(){return this.rgb().formatRgb()}function Zt(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=Eh.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?Hs(t):e===3?new ut(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Hn(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Hn(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Ph.exec(n))?new ut(t[1],t[2],t[3],1):(t=zh.exec(n))?new ut(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Oh.exec(n))?Hn(t[1],t[2],t[3],t[4]):(t=Lh.exec(n))?Hn(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Nh.exec(n))?Xs(t[1],t[2]/100,t[3]/100,1):(t=Rh.exec(n))?Xs(t[1],t[2]/100,t[3]/100,t[4]):Is.hasOwnProperty(n)?Hs(Is[n]):n==="transparent"?new ut(NaN,NaN,NaN,0):null}function Hs(n){return new ut(n>>16&255,n>>8&255,n&255,1)}function Hn(n,t,e,r){return r<=0&&(n=t=e=NaN),new ut(n,t,e,r)}function Fh(n){return n instanceof Ke||(n=Zt(n)),n?(n=n.rgb(),new ut(n.r,n.g,n.b,n.opacity)):new ut}function Bn(n,t,e,r){return arguments.length===1?Fh(n):new ut(n,t,e,r??1)}function ut(n,t,e,r){this.r=+n,this.g=+t,this.b=+e,this.opacity=+r}qr(ut,Bn,Ds(Ke,{brighter(n){return n=n==null?qn:Math.pow(qn,n),new ut(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Ze:Math.pow(Ze,n),new ut(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new ut(le(this.r),le(this.g),le(this.b),Vn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Bs,formatHex:Bs,formatHex8:qh,formatRgb:Vs,toString:Vs}));function Bs(){return`#${ce(this.r)}${ce(this.g)}${ce(this.b)}`}function qh(){return`#${ce(this.r)}${ce(this.g)}${ce(this.b)}${ce((isNaN(this.opacity)?1:this.opacity)*255)}`}function Vs(){const n=Vn(this.opacity);return`${n===1?"rgb(":"rgba("}${le(this.r)}, ${le(this.g)}, ${le(this.b)}${n===1?")":`, ${n})`}`}function Vn(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function le(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function ce(n){return n=le(n),(n<16?"0":"")+n.toString(16)}function Xs(n,t,e,r){return r<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new Pt(n,t,e,r)}function Ys(n){if(n instanceof Pt)return new Pt(n.h,n.s,n.l,n.opacity);if(n instanceof Ke||(n=Zt(n)),!n)return new Pt;if(n instanceof Pt)return n;n=n.rgb();var t=n.r/255,e=n.g/255,r=n.b/255,i=Math.min(t,e,r),s=Math.max(t,e,r),a=NaN,o=s-i,c=(s+i)/2;return o?(t===s?a=(e-r)/o+(e<r)*6:e===s?a=(r-t)/o+2:a=(t-e)/o+4,o/=c<.5?s+i:2-s-i,a*=60):o=c>0&&c<1?0:a,new Pt(a,o,c,n.opacity)}function Hh(n,t,e,r){return arguments.length===1?Ys(n):new Pt(n,t,e,r??1)}function Pt(n,t,e,r){this.h=+n,this.s=+t,this.l=+e,this.opacity=+r}qr(Pt,Hh,Ds(Ke,{brighter(n){return n=n==null?qn:Math.pow(qn,n),new Pt(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Ze:Math.pow(Ze,n),new Pt(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*t,i=2*e-r;return new ut(Hr(n>=240?n-240:n+120,i,r),Hr(n,i,r),Hr(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new Pt(Gs(this.h),Xn(this.s),Xn(this.l),Vn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Vn(this.opacity);return`${n===1?"hsl(":"hsla("}${Gs(this.h)}, ${Xn(this.s)*100}%, ${Xn(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Gs(n){return n=(n||0)%360,n<0?n+360:n}function Xn(n){return Math.max(0,Math.min(1,n||0))}function Hr(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}function Bh(n,t,e,r,i){var s=n*n,a=s*n;return((1-3*n+3*s-a)*t+(4-6*s+3*a)*e+(1+3*n+3*s-3*a)*r+a*i)/6}function Vh(n){var t=n.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,t-1):Math.floor(e*t),i=n[r],s=n[r+1],a=r>0?n[r-1]:2*i-s,o=r<t-1?n[r+2]:2*s-i;return Bh((e-r/t)*t,a,i,s,o)}}const Br=n=>()=>n;function Xh(n,t){return function(e){return n+e*t}}function Yh(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(r){return Math.pow(n+r*t,e)}}function Gh(n){return(n=+n)==1?Ws:function(t,e){return e-t?Yh(t,e,n):Br(isNaN(t)?e:t)}}function Ws(n,t){var e=t-n;return e?Xh(n,e):Br(isNaN(n)?t:n)}const Yn=(function n(t){var e=Gh(t);function r(i,s){var a=e((i=Bn(i)).r,(s=Bn(s)).r),o=e(i.g,s.g),c=e(i.b,s.b),l=Ws(i.opacity,s.opacity);return function(u){return i.r=a(u),i.g=o(u),i.b=c(u),i.opacity=l(u),i+""}}return r.gamma=n,r})(1);function Wh(n){return function(t){var e=t.length,r=new Array(e),i=new Array(e),s=new Array(e),a,o;for(a=0;a<e;++a)o=Bn(t[a]),r[a]=o.r||0,i[a]=o.g||0,s[a]=o.b||0;return r=n(r),i=n(i),s=n(s),o.opacity=1,function(c){return o.r=r(c),o.g=i(c),o.b=s(c),o+""}}}var Uh=Wh(Vh);function jh(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(s){for(i=0;i<e;++i)r[i]=n[i]*(1-s)+t[i]*s;return r}}function Kh(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Zh(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),s=new Array(e),a;for(a=0;a<r;++a)i[a]=ue(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<r;++a)s[a]=i[a](o);return s}}function Qh(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function zt(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function Jh(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=ue(n[i],t[i]):r[i]=t[i];return function(s){for(i in e)r[i]=e[i](s);return r}}var Vr=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Xr=new RegExp(Vr.source,"g");function tf(n){return function(){return n}}function ef(n){return function(t){return n(t)+""}}function Us(n,t){var e=Vr.lastIndex=Xr.lastIndex=0,r,i,s,a=-1,o=[],c=[];for(n=n+"",t=t+"";(r=Vr.exec(n))&&(i=Xr.exec(t));)(s=i.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(r=r[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,c.push({i:a,x:zt(r,i)})),e=Xr.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?ef(c[0].x):tf(t):(t=c.length,function(l){for(var u=0,h;u<t;++u)o[(h=c[u]).i]=h.x(l);return o.join("")})}function ue(n,t){var e=typeof t,r;return t==null||e==="boolean"?Br(t):(e==="number"?zt:e==="string"?(r=Zt(t))?(t=r,Yn):Us:t instanceof Zt?Yn:t instanceof Date?Qh:Kh(t)?jh:Array.isArray(t)?Zh:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Jh:zt)(n,t)}function Yr(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var js=180/Math.PI,Gr={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ks(n,t,e,r,i,s){var a,o,c;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(c=n*e+t*r)&&(e-=n*c,r-=t*c),(o=Math.sqrt(e*e+r*r))&&(e/=o,r/=o,c/=o),n*r<t*e&&(n=-n,t=-t,c=-c,a=-a),{translateX:i,translateY:s,rotate:Math.atan2(t,n)*js,skewX:Math.atan(c)*js,scaleX:a,scaleY:o}}var Gn;function nf(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?Gr:Ks(t.a,t.b,t.c,t.d,t.e,t.f)}function rf(n){return n==null||(Gn||(Gn=document.createElementNS("http://www.w3.org/2000/svg","g")),Gn.setAttribute("transform",n),!(n=Gn.transform.baseVal.consolidate()))?Gr:(n=n.matrix,Ks(n.a,n.b,n.c,n.d,n.e,n.f))}function Zs(n,t,e,r){function i(l){return l.length?l.pop()+" ":""}function s(l,u,h,f,d,_){if(l!==h||u!==f){var p=d.push("translate(",null,t,null,e);_.push({i:p-4,x:zt(l,h)},{i:p-2,x:zt(u,f)})}else(h||f)&&d.push("translate("+h+t+f+e)}function a(l,u,h,f){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),f.push({i:h.push(i(h)+"rotate(",null,r)-2,x:zt(l,u)})):u&&h.push(i(h)+"rotate("+u+r)}function o(l,u,h,f){l!==u?f.push({i:h.push(i(h)+"skewX(",null,r)-2,x:zt(l,u)}):u&&h.push(i(h)+"skewX("+u+r)}function c(l,u,h,f,d,_){if(l!==h||u!==f){var p=d.push(i(d)+"scale(",null,",",null,")");_.push({i:p-4,x:zt(l,h)},{i:p-2,x:zt(u,f)})}else(h!==1||f!==1)&&d.push(i(d)+"scale("+h+","+f+")")}return function(l,u){var h=[],f=[];return l=n(l),u=n(u),s(l.translateX,l.translateY,u.translateX,u.translateY,h,f),a(l.rotate,u.rotate,h,f),o(l.skewX,u.skewX,h,f),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,h,f),l=u=null,function(d){for(var _=-1,p=f.length,v;++_<p;)h[(v=f[_]).i]=v.x(d);return h.join("")}}}var sf=Zs(nf,"px, ","px)","deg)"),af=Zs(rf,", ",")",")");function of(n,t){t===void 0&&(t=n,n=ue);for(var e=0,r=t.length-1,i=t[0],s=new Array(r<0?0:r);e<r;)s[e]=n(i,i=t[++e]);return function(a){var o=Math.max(0,Math.min(r-1,Math.floor(a*=r)));return s[o](a-o)}}var Te=0,Je=0,tn=0,Qs=1e3,Wn,en,Un=0,he=0,jn=0,nn=typeof performance=="object"&&performance.now?performance:Date,Js=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Wr(){return he||(Js(lf),he=nn.now()+jn)}function lf(){he=0}function Kn(){this._call=this._time=this._next=null}Kn.prototype=ta.prototype={constructor:Kn,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?Wr():+e)+(t==null?0:+t),!this._next&&en!==this&&(en?en._next=this:Wn=this,en=this),this._call=n,this._time=e,Ur()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ur())}};function ta(n,t,e){var r=new Kn;return r.restart(n,t,e),r}function cf(){Wr(),++Te;for(var n=Wn,t;n;)(t=he-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Te}function ea(){he=(Un=nn.now())+jn,Te=Je=0;try{cf()}finally{Te=0,hf(),he=0}}function uf(){var n=nn.now(),t=n-Un;t>Qs&&(jn-=t,Un=n)}function hf(){for(var n,t=Wn,e,r=1/0;t;)t._call?(r>t._time&&(r=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:Wn=e);en=n,Ur(r)}function Ur(n){if(!Te){Je&&(Je=clearTimeout(Je));var t=n-he;t>24?(n<1/0&&(Je=setTimeout(ea,n-nn.now()-jn)),tn&&(tn=clearInterval(tn))):(tn||(Un=nn.now(),tn=setInterval(uf,Qs)),Te=1,Js(ea))}}function na(n,t,e){var r=new Kn;return t=t==null?0:+t,r.restart(i=>{r.stop(),n(i+t)},t,e),r}var ff=Or("start","end","cancel","interrupt"),df=[],ra=0,ia=1,jr=2,Zn=3,sa=4,Kr=5,Qn=6;function Jn(n,t,e,r,i,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;pf(n,e,{name:t,index:r,group:i,on:ff,tween:df,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:ra})}function Zr(n,t){var e=Ot(n,t);if(e.state>ra)throw new Error("too late; already scheduled");return e}function Rt(n,t){var e=Ot(n,t);if(e.state>Zn)throw new Error("too late; already running");return e}function Ot(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function pf(n,t,e){var r=n.__transition,i;r[t]=e,e.timer=ta(s,0,e.time);function s(l){e.state=ia,e.timer.restart(a,e.delay,e.time),e.delay<=l&&a(l-e.delay)}function a(l){var u,h,f,d;if(e.state!==ia)return c();for(u in r)if(d=r[u],d.name===e.name){if(d.state===Zn)return na(a);d.state===sa?(d.state=Qn,d.timer.stop(),d.on.call("interrupt",n,n.__data__,d.index,d.group),delete r[u]):+u<t&&(d.state=Qn,d.timer.stop(),d.on.call("cancel",n,n.__data__,d.index,d.group),delete r[u])}if(na(function(){e.state===Zn&&(e.state=sa,e.timer.restart(o,e.delay,e.time),o(l))}),e.state=jr,e.on.call("start",n,n.__data__,e.index,e.group),e.state===jr){for(e.state=Zn,i=new Array(f=e.tween.length),u=0,h=-1;u<f;++u)(d=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(i[++h]=d);i.length=h+1}}function o(l){for(var u=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(c),e.state=Kr,1),h=-1,f=i.length;++h<f;)i[h].call(n,u);e.state===Kr&&(e.on.call("end",n,n.__data__,e.index,e.group),c())}function c(){e.state=Qn,e.timer.stop(),delete r[t];for(var l in r)return;delete n.__transition}}function gf(n,t){var e=n.__transition,r,i,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((r=e[a]).name!==t){s=!1;continue}i=r.state>jr&&r.state<Kr,r.state=Qn,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete e[a]}s&&delete n.__transition}}function _f(n){return this.each(function(){gf(this,n)})}function mf(n,t){var e,r;return function(){var i=Rt(this,n),s=i.tween;if(s!==e){r=e=s;for(var a=0,o=r.length;a<o;++a)if(r[a].name===t){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function vf(n,t,e){var r,i;if(typeof e!="function")throw new Error;return function(){var s=Rt(this,n),a=s.tween;if(a!==r){i=(r=a).slice();for(var o={name:t,value:e},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=o;break}c===l&&i.push(o)}s.tween=i}}function xf(n,t){var e=this._id;if(n+="",arguments.length<2){for(var r=Ot(this.node(),e).tween,i=0,s=r.length,a;i<s;++i)if((a=r[i]).name===n)return a.value;return null}return this.each((t==null?mf:vf)(e,n,t))}function Qr(n,t,e){var r=n._id;return n.each(function(){var i=Rt(this,r);(i.value||(i.value={}))[t]=e.apply(this,arguments)}),function(i){return Ot(i,r).value[t]}}function aa(n,t){var e;return(typeof t=="number"?zt:t instanceof Zt?Yn:(e=Zt(t))?(t=e,Yn):Us)(n,t)}function bf(n){return function(){this.removeAttribute(n)}}function yf(n){return function(){this.removeAttributeNS(n.space,n.local)}}function wf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttribute(n);return a===i?null:a===r?s:s=t(r=a,e)}}function kf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===i?null:a===r?s:s=t(r=a,e)}}function Af(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function Cf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function $f(n,t){var e=Dn(n),r=e==="transform"?af:aa;return this.attrTween(n,typeof t=="function"?(e.local?Cf:Af)(e,r,Qr(this,"attr."+n,t)):t==null?(e.local?yf:bf)(e):(e.local?kf:wf)(e,r,t))}function Sf(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function Tf(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function Mf(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&Tf(n,s)),e}return i._value=t,i}function Ef(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&Sf(n,s)),e}return i._value=t,i}function Pf(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var r=Dn(n);return this.tween(e,(r.local?Mf:Ef)(r,t))}function zf(n,t){return function(){Zr(this,n).delay=+t.apply(this,arguments)}}function Of(n,t){return t=+t,function(){Zr(this,n).delay=t}}function Lf(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?zf:Of)(t,n)):Ot(this.node(),t).delay}function Nf(n,t){return function(){Rt(this,n).duration=+t.apply(this,arguments)}}function Rf(n,t){return t=+t,function(){Rt(this,n).duration=t}}function Df(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?Nf:Rf)(t,n)):Ot(this.node(),t).duration}function If(n,t){if(typeof t!="function")throw new Error;return function(){Rt(this,n).ease=t}}function Ff(n){var t=this._id;return arguments.length?this.each(If(t,n)):Ot(this.node(),t).ease}function qf(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;Rt(this,n).ease=e}}function Hf(n){if(typeof n!="function")throw new Error;return this.each(qf(this._id,n))}function Bf(n){typeof n!="function"&&(n=Ss(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Vt(r,this._parents,this._name,this._id)}function Vf(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,r=t.length,i=e.length,s=Math.min(r,i),a=new Array(r),o=0;o<s;++o)for(var c=t[o],l=e[o],u=c.length,h=a[o]=new Array(u),f,d=0;d<u;++d)(f=c[d]||l[d])&&(h[d]=f);for(;o<r;++o)a[o]=t[o];return new Vt(a,this._parents,this._name,this._id)}function Xf(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function Yf(n,t,e){var r,i,s=Xf(t)?Zr:Rt;return function(){var a=s(this,n),o=a.on;o!==r&&(i=(r=o).copy()).on(t,e),a.on=i}}function Gf(n,t){var e=this._id;return arguments.length<2?Ot(this.node(),e).on.on(n):this.each(Yf(e,n,t))}function Wf(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function Uf(){return this.on("end.remove",Wf(this._id))}function jf(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Nr(n));for(var r=this._groups,i=r.length,s=new Array(i),a=0;a<i;++a)for(var o=r[a],c=o.length,l=s[a]=new Array(c),u,h,f=0;f<c;++f)(u=o[f])&&(h=n.call(u,u.__data__,f,o))&&("__data__"in u&&(h.__data__=u.__data__),l[f]=h,Jn(l[f],t,e,f,l,Ot(u,e)));return new Vt(s,this._parents,t,e)}function Kf(n){var t=this._name,e=this._id;typeof n!="function"&&(n=$s(n));for(var r=this._groups,i=r.length,s=[],a=[],o=0;o<i;++o)for(var c=r[o],l=c.length,u,h=0;h<l;++h)if(u=c[h]){for(var f=n.call(u,u.__data__,h,c),d,_=Ot(u,e),p=0,v=f.length;p<v;++p)(d=f[p])&&Jn(d,t,e,p,f,_);s.push(f),a.push(u)}return new Vt(s,a,t,e)}var Zf=Ue.prototype.constructor;function Qf(){return new Zf(this._groups,this._parents)}function Jf(n,t){var e,r,i;return function(){var s=Ce(this,n),a=(this.style.removeProperty(n),Ce(this,n));return s===a?null:s===e&&a===r?i:i=t(e=s,r=a)}}function oa(n){return function(){this.style.removeProperty(n)}}function td(n,t,e){var r,i=e+"",s;return function(){var a=Ce(this,n);return a===i?null:a===r?s:s=t(r=a,e)}}function ed(n,t,e){var r,i,s;return function(){var a=Ce(this,n),o=e(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(n),Ce(this,n))),a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o))}}function nd(n,t){var e,r,i,s="style."+t,a="end."+s,o;return function(){var c=Rt(this,n),l=c.on,u=c.value[s]==null?o||(o=oa(t)):void 0;(l!==e||i!==u)&&(r=(e=l).copy()).on(a,i=u),c.on=r}}function rd(n,t,e){var r=(n+="")=="transform"?sf:aa;return t==null?this.styleTween(n,Jf(n,r)).on("end.style."+n,oa(n)):typeof t=="function"?this.styleTween(n,ed(n,r,Qr(this,"style."+n,t))).each(nd(this._id,n)):this.styleTween(n,td(n,r,t),e).on("end.style."+n,null)}function id(n,t,e){return function(r){this.style.setProperty(n,t.call(this,r),e)}}function sd(n,t,e){var r,i;function s(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&id(n,a,e)),r}return s._value=t,s}function ad(n,t,e){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,sd(n,t,e??""))}function od(n){return function(){this.textContent=n}}function ld(n){return function(){var t=n(this);this.textContent=t??""}}function cd(n){return this.tween("text",typeof n=="function"?ld(Qr(this,"text",n)):od(n==null?"":n+""))}function ud(n){return function(t){this.textContent=n.call(this,t)}}function hd(n){var t,e;function r(){var i=n.apply(this,arguments);return i!==e&&(t=(e=i)&&ud(i)),t}return r._value=n,r}function fd(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,hd(n))}function dd(){for(var n=this._name,t=this._id,e=la(),r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var u=Ot(c,t);Jn(c,n,e,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Vt(r,this._parents,n,e)}function pd(){var n,t,e=this,r=e._id,i=e.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--i===0&&s()}};e.each(function(){var l=Rt(this,r),u=l.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(c)),l.on=t}),i===0&&s()})}var gd=0;function Vt(n,t,e,r){this._groups=n,this._parents=t,this._name=e,this._id=r}function la(){return++gd}var Xt=Ue.prototype;Vt.prototype={constructor:Vt,select:jf,selectAll:Kf,selectChild:Xt.selectChild,selectChildren:Xt.selectChildren,filter:Bf,merge:Vf,selection:Qf,transition:dd,call:Xt.call,nodes:Xt.nodes,node:Xt.node,size:Xt.size,empty:Xt.empty,each:Xt.each,on:Gf,attr:$f,attrTween:Pf,style:rd,styleTween:ad,text:cd,textTween:fd,remove:Uf,tween:xf,delay:Lf,duration:Df,ease:Ff,easeVarying:Hf,end:pd,[Symbol.iterator]:Xt[Symbol.iterator]};function vt(n){return n*(2-n)}function _d(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var Jr=1.70158;(function n(t){t=+t;function e(r){return(r=+r)*r*(t*(r-1)+r)}return e.overshoot=n,e})(Jr);var md=(function n(t){t=+t;function e(r){return--r*r*((r+1)*t+r)+1}return e.overshoot=n,e})(Jr);(function n(t){t=+t;function e(r){return((r*=2)<1?r*r*((t+1)*r-t):(r-=2)*r*((t+1)*r+t)+2)/2}return e.overshoot=n,e})(Jr);var vd={time:null,delay:0,duration:250,ease:_d};function xd(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function bd(n){var t,e;n instanceof Vt?(t=n._id,n=n._name):(t=la(),(e=vd).time=Wr(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&Jn(c,n,t,l,a,e||xd(c,t));return new Vt(r,this._parents,n,t)}Ue.prototype.interrupt=_f,Ue.prototype.transition=bd;const ti=Math.PI,ei=2*ti,fe=1e-6,yd=ei-fe;function ca(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function wd(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return ca;const e=10**t;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}class kd{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?ca:wd(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,s,a){this._append`C${+t},${+e},${+r},${+i},${this._x1=+s},${this._y1=+a}`}arcTo(t,e,r,i,s){if(t=+t,e=+e,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,c=r-t,l=i-e,u=a-t,h=o-e,f=u*u+h*h;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(f>fe)if(!(Math.abs(h*c-l*u)>fe)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let d=r-a,_=i-o,p=c*c+l*l,v=d*d+_*_,b=Math.sqrt(p),y=Math.sqrt(f),x=s*Math.tan((ti-Math.acos((p+f-v)/(2*b*y)))/2),g=x/y,m=x/b;Math.abs(g-1)>fe&&this._append`L${t+g*u},${e+g*h}`,this._append`A${s},${s},0,0,${+(h*d>u*_)},${this._x1=t+m*c},${this._y1=e+m*l}`}}arc(t,e,r,i,s,a){if(t=+t,e=+e,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let o=r*Math.cos(i),c=r*Math.sin(i),l=t+o,u=e+c,h=1^a,f=a?i-s:s-i;this._x1===null?this._append`M${l},${u}`:(Math.abs(this._x1-l)>fe||Math.abs(this._y1-u)>fe)&&this._append`L${l},${u}`,r&&(f<0&&(f=f%ei+ei),f>yd?this._append`A${r},${r},0,1,${h},${t-o},${e-c}A${r},${r},0,1,${h},${this._x1=l},${this._y1=u}`:f>fe&&this._append`A${r},${r},0,${+(f>=ti)},${h},${this._x1=t+r*Math.cos(s)},${this._y1=e+r*Math.sin(s)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function Ad(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function tr(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function Me(n){return n=tr(Math.abs(n)),n?n[1]:NaN}function Cd(n,t){return function(e,r){for(var i=e.length,s=[],a=0,o=n[0],c=0;i>0&&o>0&&(c+o+1>r&&(o=Math.max(1,r-c)),s.push(e.substring(i-=o,i+o)),!((c+=o+1)>r));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function $d(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var Sd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function er(n){if(!(t=Sd.exec(n)))throw new Error("invalid format: "+n);var t;return new ni({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}er.prototype=ni.prototype;function ni(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}ni.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Td(n){t:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break t;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var nr;function Md(n,t){var e=tr(n,t);if(!e)return nr=void 0,n.toPrecision(t);var r=e[0],i=e[1],s=i-(nr=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return s===a?r:s>a?r+new Array(s-a+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+tr(n,Math.max(0,t+s-1))[0]}function ua(n,t){var e=tr(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const ha={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:Ad,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>ua(n*100,t),r:ua,s:Md,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function fa(n){return n}var da=Array.prototype.map,pa=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Ed(n){var t=n.grouping===void 0||n.thousands===void 0?fa:Cd(da.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?fa:$d(da.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(h,f){h=er(h);var d=h.fill,_=h.align,p=h.sign,v=h.symbol,b=h.zero,y=h.width,x=h.comma,g=h.precision,m=h.trim,w=h.type;w==="n"?(x=!0,w="g"):ha[w]||(g===void 0&&(g=12),m=!0,w="g"),(b||d==="0"&&_==="=")&&(b=!0,d="0",_="=");var $=(f&&f.prefix!==void 0?f.prefix:"")+(v==="$"?e:v==="#"&&/[boxX]/.test(w)?"0"+w.toLowerCase():""),A=(v==="$"?r:/[%p]/.test(w)?a:"")+(f&&f.suffix!==void 0?f.suffix:""),k=ha[w],C=/[defgprs%]/.test(w);g=g===void 0?6:/[gprs]/.test(w)?Math.max(1,Math.min(21,g)):Math.max(0,Math.min(20,g));function T(S){var M=$,E=A,P,z,L;if(w==="c")E=k(S)+E,S="";else{S=+S;var F=S<0||1/S<0;if(S=isNaN(S)?c:k(Math.abs(S),g),m&&(S=Td(S)),F&&+S==0&&p!=="+"&&(F=!1),M=(F?p==="("?p:o:p==="-"||p==="("?"":p)+M,E=(w==="s"&&!isNaN(S)&&nr!==void 0?pa[8+nr/3]:"")+E+(F&&p==="("?")":""),C){for(P=-1,z=S.length;++P<z;)if(L=S.charCodeAt(P),48>L||L>57){E=(L===46?i+S.slice(P+1):S.slice(P))+E,S=S.slice(0,P);break}}}x&&!b&&(S=t(S,1/0));var X=M.length+S.length+E.length,q=X<y?new Array(y-X+1).join(d):"";switch(x&&b&&(S=t(q+S,q.length?y-E.length:1/0),q=""),_){case"<":S=M+S+E+q;break;case"=":S=M+q+S+E;break;case"^":S=q.slice(0,X=q.length>>1)+M+S+E+q.slice(X);break;default:S=q+M+S+E;break}return s(S)}return T.toString=function(){return h+""},T}function u(h,f){var d=Math.max(-8,Math.min(8,Math.floor(Me(f)/3)))*3,_=Math.pow(10,-d),p=l((h=er(h),h.type="f",h),{suffix:pa[8+d/3]});return function(v){return p(_*v)}}return{format:l,formatPrefix:u}}var rr,ga,_a;Pd({thousands:",",grouping:[3],currency:["$",""]});function Pd(n){return rr=Ed(n),ga=rr.format,_a=rr.formatPrefix,rr}function zd(n){return Math.max(0,-Me(Math.abs(n)))}function Od(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Me(t)/3)))*3-Me(Math.abs(n)))}function Ld(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Me(t)-Me(n))+1}function Nd(n){var t=0,e=n.children,r=e&&e.length;if(!r)t=1;else for(;--r>=0;)t+=e[r].value;n.value=t}function Rd(){return this.eachAfter(Nd)}function Dd(n,t){let e=-1;for(const r of this)n.call(t,r,++e,this);return this}function Id(n,t){for(var e=this,r=[e],i,s,a=-1;e=r.pop();)if(n.call(t,e,++a,this),i=e.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function Fd(n,t){for(var e=this,r=[e],i=[],s,a,o,c=-1;e=r.pop();)if(i.push(e),s=e.children)for(a=0,o=s.length;a<o;++a)r.push(s[a]);for(;e=i.pop();)n.call(t,e,++c,this);return this}function qd(n,t){let e=-1;for(const r of this)if(n.call(t,r,++e,this))return r}function Hd(n){return this.eachAfter(function(t){for(var e=+n(t.data)||0,r=t.children,i=r&&r.length;--i>=0;)e+=r[i].value;t.value=e})}function Bd(n){return this.eachBefore(function(t){t.children&&t.children.sort(n)})}function Vd(n){for(var t=this,e=Xd(t,n),r=[t];t!==e;)t=t.parent,r.push(t);for(var i=r.length;n!==e;)r.splice(i,0,n),n=n.parent;return r}function Xd(n,t){if(n===t)return n;var e=n.ancestors(),r=t.ancestors(),i=null;for(n=e.pop(),t=r.pop();n===t;)i=n,n=e.pop(),t=r.pop();return i}function Yd(){for(var n=this,t=[n];n=n.parent;)t.push(n);return t}function Gd(){return Array.from(this)}function Wd(){var n=[];return this.eachBefore(function(t){t.children||n.push(t)}),n}function Ud(){var n=this,t=[];return n.each(function(e){e!==n&&t.push({source:e.parent,target:e})}),t}function*jd(){var n=this,t,e=[n],r,i,s;do for(t=e.reverse(),e=[];n=t.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)e.push(r[i]);while(e.length)}function ir(n,t){n instanceof Map?(n=[void 0,n],t===void 0&&(t=Qd)):t===void 0&&(t=Zd);for(var e=new rn(n),r,i=[e],s,a,o,c;r=i.pop();)if((a=t(r.data))&&(c=(a=Array.from(a)).length))for(r.children=a,o=c-1;o>=0;--o)i.push(s=a[o]=new rn(a[o])),s.parent=r,s.depth=r.depth+1;return e.eachBefore(tp)}function Kd(){return ir(this).eachBefore(Jd)}function Zd(n){return n.children}function Qd(n){return Array.isArray(n)?n[1]:null}function Jd(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function tp(n){var t=0;do n.height=t;while((n=n.parent)&&n.height<++t)}function rn(n){this.data=n,this.depth=this.height=0,this.parent=null}rn.prototype=ir.prototype={constructor:rn,count:Rd,each:Dd,eachAfter:Fd,eachBefore:Id,find:qd,sum:Hd,sort:Bd,path:Vd,ancestors:Yd,descendants:Gd,leaves:Wd,links:Ud,copy:Kd,[Symbol.iterator]:jd};function ep(n,t){return n.parent===t.parent?1:2}function ri(n){var t=n.children;return t?t[0]:n.t}function ii(n){var t=n.children;return t?t[t.length-1]:n.t}function np(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function rp(n){for(var t=0,e=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=t,s.m+=t,t+=s.s+(e+=s.c)}function ip(n,t,e){return n.a.parent===t.parent?n.a:e}function sr(n,t){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}sr.prototype=Object.create(rn.prototype);function sp(n){for(var t=new sr(n,0),e,r=[t],i,s,a,o;e=r.pop();)if(s=e._.children)for(e.children=new Array(o=s.length),a=o-1;a>=0;--a)r.push(i=e.children[a]=new sr(s[a],a)),i.parent=e;return(t.parent=new sr(null,0)).children=[t],t}function ap(){var n=ep,t=1,e=1,r=null;function i(l){var u=sp(l);if(u.eachAfter(s),u.parent.m=-u.z,u.eachBefore(a),r)l.eachBefore(c);else{var h=l,f=l,d=l;l.eachBefore(function(y){y.x<h.x&&(h=y),y.x>f.x&&(f=y),y.depth>d.depth&&(d=y)});var _=h===f?1:n(h,f)/2,p=_-h.x,v=t/(f.x+_+p),b=e/(d.depth||1);l.eachBefore(function(y){y.x=(y.x+p)*v,y.y=y.depth*b})}return l}function s(l){var u=l.children,h=l.parent.children,f=l.i?h[l.i-1]:null;if(u){rp(l);var d=(u[0].z+u[u.length-1].z)/2;f?(l.z=f.z+n(l._,f._),l.m=l.z-d):l.z=d}else f&&(l.z=f.z+n(l._,f._));l.parent.A=o(l,f,l.parent.A||h[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,u,h){if(u){for(var f=l,d=l,_=u,p=f.parent.children[0],v=f.m,b=d.m,y=_.m,x=p.m,g;_=ii(_),f=ri(f),_&&f;)p=ri(p),d=ii(d),d.a=l,g=_.z+y-f.z-v+n(_._,f._),g>0&&(np(ip(_,l,h),l,g),v+=g,b+=g),y+=_.m,v+=f.m,x+=p.m,b+=d.m;_&&!ii(d)&&(d.t=_,d.m+=y-b),f&&!ri(p)&&(p.t=f,p.m+=v-x,h=l)}return h}function c(l){l.x*=t,l.y=l.depth*e}return i.separation=function(l){return arguments.length?(n=l,i):n},i.size=function(l){return arguments.length?(r=!1,t=+l[0],e=+l[1],i):r?null:[t,e]},i.nodeSize=function(l){return arguments.length?(r=!0,t=+l[0],e=+l[1],i):r?[t,e]:null},i}function si(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function ma(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}const va=Symbol("implicit");function xa(){var n=new xs,t=[],e=[],r=va;function i(s){let a=n.get(s);if(a===void 0){if(r!==va)return r;n.set(s,a=t.push(s)-1)}return e[a%e.length]}return i.domain=function(s){if(!arguments.length)return t.slice();t=[],n=new xs;for(const a of s)n.has(a)||n.set(a,t.push(a)-1);return i},i.range=function(s){return arguments.length?(e=Array.from(s),i):e.slice()},i.unknown=function(s){return arguments.length?(r=s,i):r},i.copy=function(){return xa(t,e).unknown(r)},si.apply(i,arguments),i}function ai(){var n=xa().unknown(void 0),t=n.domain,e=n.range,r=0,i=1,s,a,o=!1,c=0,l=0,u=.5;delete n.unknown;function h(){var f=t().length,d=i<r,_=d?i:r,p=d?r:i;s=(p-_)/Math.max(1,f-c+l*2),o&&(s=Math.floor(s)),_+=(p-_-s*(f-c))*u,a=s*(1-c),o&&(_=Math.round(_),a=Math.round(a));var v=Oc(f).map(function(b){return _+s*b});return e(d?v.reverse():v)}return n.domain=function(f){return arguments.length?(t(f),h()):t()},n.range=function(f){return arguments.length?([r,i]=f,r=+r,i=+i,h()):[r,i]},n.rangeRound=function(f){return[r,i]=f,r=+r,i=+i,o=!0,h()},n.bandwidth=function(){return a},n.step=function(){return s},n.round=function(f){return arguments.length?(o=!!f,h()):o},n.padding=function(f){return arguments.length?(c=Math.min(1,l=+f),h()):c},n.paddingInner=function(f){return arguments.length?(c=Math.min(1,f),h()):c},n.paddingOuter=function(f){return arguments.length?(l=+f,h()):l},n.align=function(f){return arguments.length?(u=Math.max(0,Math.min(1,f)),h()):u},n.copy=function(){return ai(t(),[r,i]).round(o).paddingInner(c).paddingOuter(l).align(u)},si.apply(h(),arguments)}function op(n){return function(){return n}}function lp(n){return+n}var ba=[0,1];function Dt(n){return n}function oi(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:op(isNaN(t)?NaN:.5)}function cp(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function up(n,t,e){var r=n[0],i=n[1],s=t[0],a=t[1];return i<r?(r=oi(i,r),s=e(a,s)):(r=oi(r,i),s=e(s,a)),function(o){return s(r(o))}}function hp(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),s=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)i[a]=oi(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var c=kc(n,o,1,r)-1;return s[c](i[c](o))}}function fp(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function dp(){var n=ba,t=ba,e=ue,r,i,s,a=Dt,o,c,l;function u(){var f=Math.min(n.length,t.length);return a!==Dt&&(a=cp(n[0],n[f-1])),o=f>2?hp:up,c=l=null,h}function h(f){return f==null||isNaN(f=+f)?s:(c||(c=o(n.map(r),t,e)))(r(a(f)))}return h.invert=function(f){return a(i((l||(l=o(t,n.map(r),zt)))(f)))},h.domain=function(f){return arguments.length?(n=Array.from(f,lp),u()):n.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),e=Yr,u()},h.clamp=function(f){return arguments.length?(a=f?!0:Dt,u()):a!==Dt},h.interpolate=function(f){return arguments.length?(e=f,u()):e},h.unknown=function(f){return arguments.length?(s=f,h):s},function(f,d){return r=f,i=d,u()}}function pp(){return dp()(Dt,Dt)}function gp(n,t,e,r){var i=Pc(n,t,e),s;switch(r=er(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(s=Od(i,a))&&(r.precision=s),_a(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=Ld(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=zd(i))&&(r.precision=s-(r.type==="%")*2);break}}return ga(r)}function li(n){var t=n.domain;return n.ticks=function(e){var r=t();return Ec(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return gp(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,s=r.length-1,a=r[i],o=r[s],c,l,u=10;for(o<a&&(l=a,a=o,o=l,l=i,i=s,s=l);u-- >0;){if(l=Mr(a,o,e),l===c)return r[i]=a,r[s]=o,t(r);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function Yt(){var n=pp();return n.copy=function(){return fp(n,Yt())},si.apply(n,arguments),li(n)}function _p(){var n=0,t=1,e,r,i,s,a=Dt,o=!1,c;function l(h){return h==null||isNaN(h=+h)?c:a(i===0?.5:(h=(s(h)-e)*i,o?Math.max(0,Math.min(1,h)):h))}l.domain=function(h){return arguments.length?([n,t]=h,e=s(n=+n),r=s(t=+t),i=e===r?0:1/(r-e),l):[n,t]},l.clamp=function(h){return arguments.length?(o=!!h,l):o},l.interpolator=function(h){return arguments.length?(a=h,l):a};function u(h){return function(f){var d,_;return arguments.length?([d,_]=f,a=h(d,_),l):[a(0),a(1)]}}return l.range=u(ue),l.rangeRound=u(Yr),l.unknown=function(h){return arguments.length?(c=h,l):c},function(h){return s=h,e=h(n),r=h(t),i=e===r?0:1/(r-e),l}}function ya(n,t){return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function wa(){var n=li(_p()(Dt));return n.copy=function(){return ya(n,wa())},ma.apply(n,arguments)}function mp(){var n=0,t=.5,e=1,r=1,i,s,a,o,c,l=Dt,u,h=!1,f;function d(p){return isNaN(p=+p)?f:(p=.5+((p=+u(p))-s)*(r*p<r*s?o:c),l(h?Math.max(0,Math.min(1,p)):p))}d.domain=function(p){return arguments.length?([n,t,e]=p,i=u(n=+n),s=u(t=+t),a=u(e=+e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d):[n,t,e]},d.clamp=function(p){return arguments.length?(h=!!p,d):h},d.interpolator=function(p){return arguments.length?(l=p,d):l};function _(p){return function(v){var b,y,x;return arguments.length?([b,y,x]=v,l=of(p,[b,y,x]),d):[l(0),l(.5),l(1)]}}return d.range=_(ue),d.rangeRound=_(Yr),d.unknown=function(p){return arguments.length?(f=p,d):f},function(p){return u=p,i=p(n),s=p(t),a=p(e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d}}function ka(){var n=li(mp()(Dt));return n.copy=function(){return ya(n,ka())},ma.apply(n,arguments)}function Aa(n){for(var t=n.length/6|0,e=new Array(t),r=0;r<t;)e[r]="#"+n.slice(r*6,++r*6);return e}const Ca=n=>Uh(n[n.length-1]);var vp=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Aa);const xp=Ca(vp);var bp=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Aa);const yp=Ca(bp);function D(n){return function(){return n}}const $a=Math.abs,rt=Math.atan2,de=Math.cos,wp=Math.max,ci=Math.min,It=Math.sin,Ee=Math.sqrt,ht=1e-12,sn=Math.PI,ar=sn/2,or=2*sn;function kp(n){return n>1?0:n<-1?sn:Math.acos(n)}function Sa(n){return n>=1?ar:n<=-1?-ar:Math.asin(n)}function lr(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new kd(t)}function Ap(n){return n.innerRadius}function Cp(n){return n.outerRadius}function $p(n){return n.startAngle}function Sp(n){return n.endAngle}function Tp(n){return n&&n.padAngle}function Mp(n,t,e,r,i,s,a,o){var c=e-n,l=r-t,u=a-i,h=o-s,f=h*c-u*l;if(!(f*f<ht))return f=(u*(t-s)-h*(n-i))/f,[n+f*c,t+f*l]}function cr(n,t,e,r,i,s,a){var o=n-e,c=t-r,l=(a?s:-s)/Ee(o*o+c*c),u=l*c,h=-l*o,f=n+u,d=t+h,_=e+u,p=r+h,v=(f+_)/2,b=(d+p)/2,y=_-f,x=p-d,g=y*y+x*x,m=i-s,w=f*p-_*d,$=(x<0?-1:1)*Ee(wp(0,m*m*g-w*w)),A=(w*x-y*$)/g,k=(-w*y-x*$)/g,C=(w*x+y*$)/g,T=(-w*y+x*$)/g,S=A-v,M=k-b,E=C-v,P=T-b;return S*S+M*M>E*E+P*P&&(A=C,k=T),{cx:A,cy:k,x01:-u,y01:-h,x11:A*(i/m-1),y11:k*(i/m-1)}}function Ta(){var n=Ap,t=Cp,e=D(0),r=null,i=$p,s=Sp,a=Tp,o=null,c=lr(l);function l(){var u,h,f=+n.apply(this,arguments),d=+t.apply(this,arguments),_=i.apply(this,arguments)-ar,p=s.apply(this,arguments)-ar,v=$a(p-_),b=p>_;if(o||(o=u=c()),d<f&&(h=d,d=f,f=h),!(d>ht))o.moveTo(0,0);else if(v>or-ht)o.moveTo(d*de(_),d*It(_)),o.arc(0,0,d,_,p,!b),f>ht&&(o.moveTo(f*de(p),f*It(p)),o.arc(0,0,f,p,_,b));else{var y=_,x=p,g=_,m=p,w=v,$=v,A=a.apply(this,arguments)/2,k=A>ht&&(r?+r.apply(this,arguments):Ee(f*f+d*d)),C=ci($a(d-f)/2,+e.apply(this,arguments)),T=C,S=C,M,E;if(k>ht){var P=Sa(k/f*It(A)),z=Sa(k/d*It(A));(w-=P*2)>ht?(P*=b?1:-1,g+=P,m-=P):(w=0,g=m=(_+p)/2),($-=z*2)>ht?(z*=b?1:-1,y+=z,x-=z):($=0,y=x=(_+p)/2)}var L=d*de(y),F=d*It(y),X=f*de(m),q=f*It(m);if(C>ht){var at=d*de(x),ct=d*It(x),Ge=f*de(g),St=f*It(g),nt;if(v<sn)if(nt=Mp(L,F,Ge,St,at,ct,X,q)){var os=L-nt[0],ls=F-nt[1],cs=at-nt[0],us=ct-nt[1],gl=1/It(kp((os*cs+ls*us)/(Ee(os*os+ls*ls)*Ee(cs*cs+us*us)))/2),_l=Ee(nt[0]*nt[0]+nt[1]*nt[1]);T=ci(C,(f-_l)/(gl-1)),S=ci(C,(d-_l)/(gl+1))}else T=S=0}$>ht?S>ht?(M=cr(Ge,St,L,F,d,S,b),E=cr(at,ct,X,q,d,S,b),o.moveTo(M.cx+M.x01,M.cy+M.y01),S<C?o.arc(M.cx,M.cy,S,rt(M.y01,M.x01),rt(E.y01,E.x01),!b):(o.arc(M.cx,M.cy,S,rt(M.y01,M.x01),rt(M.y11,M.x11),!b),o.arc(0,0,d,rt(M.cy+M.y11,M.cx+M.x11),rt(E.cy+E.y11,E.cx+E.x11),!b),o.arc(E.cx,E.cy,S,rt(E.y11,E.x11),rt(E.y01,E.x01),!b))):(o.moveTo(L,F),o.arc(0,0,d,y,x,!b)):o.moveTo(L,F),!(f>ht)||!(w>ht)?o.lineTo(X,q):T>ht?(M=cr(X,q,at,ct,f,-T,b),E=cr(L,F,Ge,St,f,-T,b),o.lineTo(M.cx+M.x01,M.cy+M.y01),T<C?o.arc(M.cx,M.cy,T,rt(M.y01,M.x01),rt(E.y01,E.x01),!b):(o.arc(M.cx,M.cy,T,rt(M.y01,M.x01),rt(M.y11,M.x11),!b),o.arc(0,0,f,rt(M.cy+M.y11,M.cx+M.x11),rt(E.cy+E.y11,E.cx+E.x11),b),o.arc(E.cx,E.cy,T,rt(E.y11,E.x11),rt(E.y01,E.x01),!b))):o.arc(0,0,f,m,g,b)}if(o.closePath(),u)return o=null,u+""||null}return l.centroid=function(){var u=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,h=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-sn/2;return[de(h)*u,It(h)*u]},l.innerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:D(+u),l):n},l.outerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:D(+u),l):t},l.cornerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:D(+u),l):e},l.padRadius=function(u){return arguments.length?(r=u==null?null:typeof u=="function"?u:D(+u),l):r},l.startAngle=function(u){return arguments.length?(i=typeof u=="function"?u:D(+u),l):i},l.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:D(+u),l):s},l.padAngle=function(u){return arguments.length?(a=typeof u=="function"?u:D(+u),l):a},l.context=function(u){return arguments.length?(o=u??null,l):o},l}var Ep=Array.prototype.slice;function ui(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Ma(n){this._context=n}Ma.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function Ea(n){return new Ma(n)}function hi(n){return n[0]}function fi(n){return n[1]}function di(n,t){var e=D(!0),r=null,i=Ea,s=null,a=lr(o);n=typeof n=="function"?n:n===void 0?hi:D(n),t=typeof t=="function"?t:t===void 0?fi:D(t);function o(c){var l,u=(c=ui(c)).length,h,f=!1,d;for(r==null&&(s=i(d=a())),l=0;l<=u;++l)!(l<u&&e(h=c[l],l,c))===f&&((f=!f)?s.lineStart():s.lineEnd()),f&&s.point(+n(h,l,c),+t(h,l,c));if(d)return s=null,d+""||null}return o.x=function(c){return arguments.length?(n=typeof c=="function"?c:D(+c),o):n},o.y=function(c){return arguments.length?(t=typeof c=="function"?c:D(+c),o):t},o.defined=function(c){return arguments.length?(e=typeof c=="function"?c:D(!!c),o):e},o.curve=function(c){return arguments.length?(i=c,r!=null&&(s=i(r)),o):i},o.context=function(c){return arguments.length?(c==null?r=s=null:s=i(r=c),o):r},o}function Pp(n,t,e){var r=null,i=D(!0),s=null,a=Ea,o=null,c=lr(l);n=typeof n=="function"?n:n===void 0?hi:D(+n),t=typeof t=="function"?t:D(t===void 0?0:+t),e=typeof e=="function"?e:e===void 0?fi:D(+e);function l(h){var f,d,_,p=(h=ui(h)).length,v,b=!1,y,x=new Array(p),g=new Array(p);for(s==null&&(o=a(y=c())),f=0;f<=p;++f){if(!(f<p&&i(v=h[f],f,h))===b)if(b=!b)d=f,o.areaStart(),o.lineStart();else{for(o.lineEnd(),o.lineStart(),_=f-1;_>=d;--_)o.point(x[_],g[_]);o.lineEnd(),o.areaEnd()}b&&(x[f]=+n(v,f,h),g[f]=+t(v,f,h),o.point(r?+r(v,f,h):x[f],e?+e(v,f,h):g[f]))}if(y)return o=null,y+""||null}function u(){return di().defined(i).curve(a).context(s)}return l.x=function(h){return arguments.length?(n=typeof h=="function"?h:D(+h),r=null,l):n},l.x0=function(h){return arguments.length?(n=typeof h=="function"?h:D(+h),l):n},l.x1=function(h){return arguments.length?(r=h==null?null:typeof h=="function"?h:D(+h),l):r},l.y=function(h){return arguments.length?(t=typeof h=="function"?h:D(+h),e=null,l):t},l.y0=function(h){return arguments.length?(t=typeof h=="function"?h:D(+h),l):t},l.y1=function(h){return arguments.length?(e=h==null?null:typeof h=="function"?h:D(+h),l):e},l.lineX0=l.lineY0=function(){return u().x(n).y(t)},l.lineY1=function(){return u().x(n).y(e)},l.lineX1=function(){return u().x(r).y(t)},l.defined=function(h){return arguments.length?(i=typeof h=="function"?h:D(!!h),l):i},l.curve=function(h){return arguments.length?(a=h,s!=null&&(o=a(s)),l):a},l.context=function(h){return arguments.length?(h==null?s=o=null:o=a(s=h),l):s},l}function zp(n,t){return t<n?-1:t>n?1:t>=n?0:NaN}function Op(n){return n}function Lp(){var n=Op,t=zp,e=null,r=D(0),i=D(or),s=D(0);function a(o){var c,l=(o=ui(o)).length,u,h,f=0,d=new Array(l),_=new Array(l),p=+r.apply(this,arguments),v=Math.min(or,Math.max(-or,i.apply(this,arguments)-p)),b,y=Math.min(Math.abs(v)/l,s.apply(this,arguments)),x=y*(v<0?-1:1),g;for(c=0;c<l;++c)(g=_[d[c]=c]=+n(o[c],c,o))>0&&(f+=g);for(t!=null?d.sort(function(m,w){return t(_[m],_[w])}):e!=null&&d.sort(function(m,w){return e(o[m],o[w])}),c=0,h=f?(v-l*x)/f:0;c<l;++c,p=b)u=d[c],g=_[u],b=p+(g>0?g*h:0)+x,_[u]={data:o[u],index:c,value:g,startAngle:p,endAngle:b,padAngle:y};return _}return a.value=function(o){return arguments.length?(n=typeof o=="function"?o:D(+o),a):n},a.sortValues=function(o){return arguments.length?(t=o,e=null,a):t},a.sort=function(o){return arguments.length?(e=o,t=null,a):e},a.startAngle=function(o){return arguments.length?(r=typeof o=="function"?o:D(+o),a):r},a.endAngle=function(o){return arguments.length?(i=typeof o=="function"?o:D(+o),a):i},a.padAngle=function(o){return arguments.length?(s=typeof o=="function"?o:D(+o),a):s},a}class Pa{constructor(t,e){this._context=t,this._x=e}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,e){switch(t=+t,e=+e,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,e,t,e):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+e)/2,t,this._y0,t,e);break}}this._x0=t,this._y0=e}}function Np(n){return new Pa(n,!0)}function Rp(n){return new Pa(n,!1)}function Dp(n){return n.source}function Ip(n){return n.target}function za(n){let t=Dp,e=Ip,r=hi,i=fi,s=null,a=null,o=lr(c);function c(){let l;const u=Ep.call(arguments),h=t.apply(this,u),f=e.apply(this,u);if(s==null&&(a=n(l=o())),a.lineStart(),u[0]=h,a.point(+r.apply(this,u),+i.apply(this,u)),u[0]=f,a.point(+r.apply(this,u),+i.apply(this,u)),a.lineEnd(),l)return a=null,l+""||null}return c.source=function(l){return arguments.length?(t=l,c):t},c.target=function(l){return arguments.length?(e=l,c):e},c.x=function(l){return arguments.length?(r=typeof l=="function"?l:D(+l),c):r},c.y=function(l){return arguments.length?(i=typeof l=="function"?l:D(+l),c):i},c.context=function(l){return arguments.length?(l==null?s=a=null:a=n(s=l),c):s},c}function Fp(){return za(Np)}function qp(){return za(Rp)}function Oa(n){return n<0?-1:1}function La(n,t,e){var r=n._x1-n._x0,i=t-n._x1,s=(n._y1-n._y0)/(r||i<0&&-0),a=(e-n._y1)/(i||r<0&&-0),o=(s*i+a*r)/(r+i);return(Oa(s)+Oa(a))*Math.min(Math.abs(s),Math.abs(a),.5*Math.abs(o))||0}function Na(n,t){var e=n._x1-n._x0;return e?(3*(n._y1-n._y0)/e-t)/2:t}function pi(n,t,e){var r=n._x0,i=n._y0,s=n._x1,a=n._y1,o=(s-r)/3;n._context.bezierCurveTo(r+o,i+o*t,s-o,a-o*e,s,a)}function ur(n){this._context=n}ur.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:pi(this,this._t0,Na(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){var e=NaN;if(n=+n,t=+t,!(n===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;break;case 2:this._point=3,pi(this,Na(this,e=La(this,n,t)),e);break;default:pi(this,this._t0,e=La(this,n,t));break}this._x0=this._x1,this._x1=n,this._y0=this._y1,this._y1=t,this._t0=e}}},Object.create(ur.prototype).point=function(n,t){ur.prototype.point.call(this,t,n)};function Hp(n){return new ur(n)}function an(n,t,e){this.k=n,this.x=t,this.y=e}an.prototype={constructor:an,scale:function(n){return n===1?this:new an(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new an(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},an.prototype;const Bp=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Vp=`
  :host { display: block; min-height: 60px; }
  svg { width: 100%; display: block; direction: ltr; }
  .bar { transition: opacity 0.3s; }
  .bar:hover { opacity: 0.8; }
  .label { fill: #fff; font-size: 0.85em; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
  .value-text { font-weight: 700; font-size: 0.8em; }
  .tag { font-size: 0.7em; }
  .axis line { stroke: var(--lv-border, #2a2a4a); }
`,Xp=28,Ra=8,Da=Xp+Ra;class Yp extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1);O(this,"_resizeObserver",null);O(this,"_svg",null);O(this,"_container",null)}static get observedAttributes(){return["data","direction","sorted","animated"]}get data(){return this._data}set data(e){if(typeof e=="string")try{this._data=JSON.parse(e)}catch{this._data=[]}else this._data=e;this._svg&&this._render(!0)}get _direction(){return this.getAttribute("direction")==="vertical"?"vertical":"horizontal"}get _sorted(){return this.hasAttribute("sorted")}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Bp[e%8]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Vp),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1);let e;this._resizeObserver=new ResizeObserver(()=>{clearTimeout(e),e=window.setTimeout(()=>this._render(!1),100)}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null}attributeChangedCallback(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(e==="data"))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0,!0))}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=G(e),this._svg.append("g").attr("class","chart-area"),this._svg.append("g").attr("class","axis-group")}_render(e,r=!1){if(!this._svg||!this._container)return;const i=this._sorted?[...this._data].sort((s,a)=>a.value-s.value):[...this._data];this._direction==="vertical"?this._renderVertical(i,e,r):this._renderHorizontal(i,e,r)}_renderHorizontal(e,r,i){const s=this.isRtl,a=this.clientWidth||400,o={top:10,right:120,bottom:10,left:10},c=Math.max(a-o.left-o.right,10),l=e.length*Da,u=l+o.top+o.bottom;this._svg.attr("viewBox",`0 0 ${a} ${u}`).attr("height",u);const h=On(e,m=>m.value)||1,f=Yt().domain([0,h]).range([0,c]),d=ai().domain(e.map(m=>m.label)).range([0,l]).paddingInner(Ra/Da).paddingOuter(0),_=this._svg.select(".chart-area").attr("transform",`translate(${o.left},${o.top})`);this._svg.select(".axis-group").attr("transform",`translate(${o.left},${o.top})`).selectAll(".axis-line").data([0]).join("line").attr("class","axis-line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",l).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1);const v=_.selectAll(".bar-group").data(e,m=>m.label),b=r?800:0,y=i&&!this._isInstant(),x=v.enter().append("g").attr("class","bar-group").attr("transform",(m,w)=>`translate(0,${d(e[w].label)})`);x.append("rect").attr("class","bar").attr("x",0).attr("y",0).attr("width",m=>y?0:f(m.value)).attr("height",d.bandwidth()).attr("rx",4).attr("ry",4).attr("fill",(m,w)=>this._getColor(w,m)),x.append("text").attr("class","label").attr("x",m=>{const w=f(m.value);return w>100?w-8:w+6}).attr("y",d.bandwidth()/2).attr("dy","0.35em").attr("text-anchor",m=>f(m.value)>100?"end":"start").attr("opacity",y?0:1).text(m=>m.label),x.append("text").attr("class","value-text").attr("x",m=>{const w=f(m.value);return y?0:w+6}).attr("y",d.bandwidth()/2).attr("dy","0.35em").attr("text-anchor","start").attr("fill",(m,w)=>this._getColor(w,m)).attr("opacity",y?0:1).text(m=>typeof m.value=="number"?m.value.toFixed(2):m.value),x.each((m,w,$)=>{if(!m.tag)return;const A=G($[w]),k=m.tagColor||this._getColor(w,m);A.append("rect").attr("class","tag-bg").attr("rx",8).attr("ry",8).attr("fill",k).attr("fill-opacity",.15).attr("opacity",y?0:1),A.append("text").attr("class","tag").attr("fill",k).attr("dy","0.35em").attr("y",d.bandwidth()/2).attr("opacity",y?0:1).text(m.tag)});const g=x.merge(v);g.transition().duration(b).ease(vt).attr("transform",m=>`translate(0,${d(m.label)})`),g.select(".bar").transition().duration(b).ease(vt).attr("x",0).attr("width",m=>f(m.value)).attr("height",d.bandwidth()).attr("fill",(m,w)=>this._getColor(w,m)),g.select(".label").transition().duration(b).ease(vt).attr("opacity",1).attr("x",m=>{const w=f(m.value);return w>100?w-8:w+6}).attr("text-anchor",m=>f(m.value)>100?"end":"start").attr("y",d.bandwidth()/2),g.select(".value-text").transition().duration(b).ease(vt).attr("x",m=>f(m.value)+6).attr("opacity",1).attr("fill",(m,w)=>this._getColor(w,m)).text(m=>typeof m.value=="number"?m.value.toFixed(2):m.value),g.each((m,w,$)=>{const A=G($[w]);A.select(".tag-bg").transition().duration(b).attr("opacity",1),A.select(".tag").transition().duration(b).attr("opacity",1)}),this._positionTags(g,d,s,f),v.exit().transition().duration(b/2).attr("opacity",0).remove()}_positionTags(e,r,i,s){requestAnimationFrame(()=>{e.each((a,o,c)=>{var b,y;if(!a.tag)return;const l=G(c[o]),u=l.select(".value-text").node();if(!u)return;const h=s(a.value),f=((b=u.getComputedTextLength)==null?void 0:b.call(u))||30,d=l.select(".tag").node(),_=((y=d==null?void 0:d.getComputedTextLength)==null?void 0:y.call(d))||20,p=h+6+f+10+_/2;l.select(".tag").attr("x",p).attr("text-anchor","middle");const v=6;l.select(".tag-bg").attr("x",p-_/2-v).attr("y",r.bandwidth()/2-8).attr("width",_+v*2).attr("height",16)})})}_renderVertical(e,r,i){const s=this.clientWidth||400,a={top:20,right:10,bottom:40,left:10},o=Math.max(s-a.left-a.right,10),c=200,l=c+a.top+a.bottom;this._svg.attr("viewBox",`0 0 ${s} ${l}`).attr("height",l);const u=On(e,g=>g.value)||1,h=ai().domain(e.map(g=>g.label)).range([0,o]).paddingInner(.2).paddingOuter(.1),f=Yt().domain([0,u]).range([c,0]),d=this._svg.select(".chart-area").attr("transform",`translate(${a.left},${a.top})`);this._svg.select(".axis-group").attr("transform",`translate(${a.left},${a.top})`).selectAll(".axis-line").data([0]).join("line").attr("class","axis-line").attr("x1",0).attr("x2",o).attr("y1",c).attr("y2",c).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1);const p=r?800:0,v=i&&!this._isInstant(),b=d.selectAll(".bar-group").data(e,g=>g.label),y=b.enter().append("g").attr("class","bar-group").attr("transform",g=>`translate(${h(g.label)},0)`);y.append("rect").attr("class","bar").attr("x",0).attr("y",v?c:(g=>f(g.value))).attr("width",h.bandwidth()).attr("height",g=>v?0:c-f(g.value)).attr("rx",4).attr("ry",4).attr("fill",(g,m)=>this._getColor(m,g)),y.append("text").attr("class","label").attr("x",h.bandwidth()/2).attr("y",c+16).attr("text-anchor","middle").attr("opacity",v?0:1).text(g=>g.label),y.append("text").attr("class","value-text").attr("x",h.bandwidth()/2).attr("y",g=>v?c-4:f(g.value)-6).attr("text-anchor","middle").attr("fill",(g,m)=>this._getColor(m,g)).attr("opacity",v?0:1).text(g=>g.value);const x=y.merge(b);x.transition().duration(p).ease(vt).attr("transform",g=>`translate(${h(g.label)},0)`),x.select(".bar").transition().duration(p).ease(vt).attr("y",g=>f(g.value)).attr("height",g=>c-f(g.value)).attr("width",h.bandwidth()).attr("fill",(g,m)=>this._getColor(m,g)),x.select(".label").transition().duration(p).ease(vt).attr("opacity",1),x.select(".value-text").transition().duration(p).ease(vt).attr("y",g=>f(g.value)-6).attr("opacity",1).attr("fill",(g,m)=>this._getColor(m,g)).text(g=>g.value),b.exit().transition().duration(p/2).attr("opacity",0).remove()}_isInstant(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}}customElements.define("lv-bar-chart",Yp);const Gp=`
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
`;class Wp extends R{constructor(){super(...arguments);O(this,"_svg",null);O(this,"_animated",!0);O(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","scale","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Gp),this._animated=this.getAttribute("animated")!=="false",this._buildChart()}attributeChangedCallback(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated)return;this._hasAnimated=!0;const r=this._svg;if(!r)return;const i=r.querySelectorAll(".cell");if(e||!this._animated){i.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"});return}i.forEach(s=>{const a=s,o=Number(a.dataset.delay||0);a.style.opacity="0",a.style.transform="scale(0.5)",a.style.transition="none",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`,a.style.opacity="1",a.style.transform="scale(1)"})})})}_buildChart(){var y;const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.getAttribute("scale")||"diverging";if(!e.length||!r.length){this.render("<svg></svg>");return}const s=e.length,a=3,o=60,c=110,l=56,u=s*l+(s-1)*a,h=u+c,f=u+o,d=i==="sequential"?wa(yp).domain([0,1]):ka(xp).domain([-1,0,1]),_=this.isRtl;let p="";for(let x=0;x<s;x++){const g=c+x*(l+a)+l/2,m=o/2;p+=`<text class="header-text" x="${_?h-g:g}" y="${m}">${this._escapeHtml(e[x])}</text>`}for(let x=0;x<s;x++){const g=o+x*(l+a)+l/2,m=_?h-c/2:c/2;p+=`<text class="header-text" x="${m}" y="${g}">${this._escapeHtml(e[x])}</text>`}for(let x=0;x<s;x++)for(let g=0;g<s;g++){const m=((y=r[x])==null?void 0:y[g])??0,w=d(m),$=this._contrastColor(w),A=(x+g)*40;let k=c+g*(l+a);_&&(k=h-k-l);const C=o+x*(l+a),T=k+l/2,S=C+l/2;p+=`<g class="cell" data-delay="${A}" data-value="${m.toFixed(2)}" style="transform-origin: ${T}px ${S}px; opacity: 0; transform: scale(0.5);">`,p+=`<rect x="${k}" y="${C}" width="${l}" height="${l}" rx="6" ry="6" fill="${w}"/>`,p+=`<text class="cell-text" x="${T}" y="${S}" fill="${$}">${m.toFixed(2)}</text>`,p+="</g>"}const v=`
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;this.render(v),this._svg=this.root.querySelector("svg");const b=this.root.querySelector(".tooltip");this._svg&&b&&this._svg.querySelectorAll(".cell").forEach(x=>{x.addEventListener("mouseenter",g=>{const w=g.currentTarget.dataset.value||"";b.textContent=w,b.style.opacity="1"}),x.addEventListener("mousemove",g=>{const m=g,w=this.root.querySelector("div").getBoundingClientRect();b.style.left=`${m.clientX-w.left+10}px`,b.style.top=`${m.clientY-w.top-28}px`}),x.addEventListener("mouseleave",()=>{b.style.opacity="0"})})}_contrastColor(e){const r=Zt(e);if(!r)return"#000";const i=r.rgb();return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"#000":"#fff"}_escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-heatmap",Wp);const Up=`
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
`,Pe={top:20,right:30,bottom:40,left:60},Ia=500,Fa=250,pe=Ia-Pe.left-Pe.right,Gt=Fa-Pe.top-Pe.bottom;class jp extends R{constructor(){super(...arguments);O(this,"_resizeObs",null);O(this,"_svg",null);O(this,"_built",!1)}static get observedAttributes(){return["data","area","points","tooltip","color","x-label","y-label","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Up),this.root.innerHTML="<svg></svg>",this._buildChart(),this._resizeObs=new ResizeObserver(()=>{}),this._resizeObs.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObs)==null||e.disconnect(),this._resizeObs=null}attributeChangedCallback(e,r,i){this._built&&this._buildChart()}_parseData(){const e=this.jsonAttr("data",[]);return!Array.isArray(e)||e.length===0?[]:typeof e[0]=="number"?e.map((r,i)=>({x:i,y:r})):e}_getColor(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}_buildChart(){const e=this._parseData();if(e.length===0)return;const r=this.root.querySelector("svg");if(!r)return;const i=this._getColor(),s=this.hasAttribute("area"),a=this.hasAttribute("points"),o=this.hasAttribute("tooltip"),c=this.getAttribute("x-label")||"",l=this.getAttribute("y-label")||"";G(r).selectAll("*").remove();const u=G(r).attr("viewBox",`0 0 ${Ia} ${Fa}`).attr("preserveAspectRatio","xMidYMid meet");this._svg=u;const h=u.append("defs"),f=`lv-area-grad-${Math.random().toString(36).slice(2,8)}`,d=h.append("linearGradient").attr("id",f).attr("x1","0").attr("y1","0").attr("x2","0").attr("y2","1");d.append("stop").attr("offset","0%").attr("stop-color",i).attr("stop-opacity",.25),d.append("stop").attr("offset","100%").attr("stop-color",i).attr("stop-opacity",0);const _=u.append("g").attr("transform",`translate(${Pe.left},${Pe.top})`),p=Pn(e,A=>A.x),v=Pn(e,A=>A.y),b=(v[1]-v[0])*.1||1,y=Yt().domain(p).range([0,pe]),x=Yt().domain([v[0]-b,v[1]+b]).range([Gt,0]);if(_.append("g").attr("class","grid").attr("transform",`translate(0,${Gt})`).call(Ln(y).tickSize(-Gt).tickFormat(()=>"")),_.append("g").attr("class","grid").call(Nn(x).tickSize(-pe).tickFormat(()=>"")),_.append("g").attr("class","axis x-axis").attr("transform",`translate(0,${Gt})`).call(Ln(y).ticks(6)),_.append("g").attr("class","axis y-axis").call(Nn(x).ticks(5)),c&&_.append("text").attr("class","axis-label").attr("x",pe/2).attr("y",Gt+35).attr("text-anchor","middle").text(c),l&&_.append("text").attr("class","axis-label").attr("x",-Gt/2).attr("y",-38).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),s){const A=Pp().x(k=>y(k.x)).y0(Gt).y1(k=>x(k.y));_.append("path").datum(e).attr("class","area").attr("d",A).attr("fill",`url(#${f})`)}const g=di().x(A=>y(A.x)).y(A=>x(A.y)),m=_.append("path").datum(e).attr("class","line").attr("d",g).attr("stroke",i).attr("stroke-width",2.5),$=m.node().getTotalLength();m.attr("stroke-dasharray",$).attr("stroke-dashoffset",$),a&&_.selectAll(".point").data(e).enter().append("circle").attr("class","point").attr("cx",A=>y(A.x)).attr("cy",A=>x(A.y)).attr("r",4).attr("fill",i).attr("stroke","white").attr("stroke-width",1.5),o&&this._setupTooltip(_,e,y,x,i),this._built=!0,this.getAttribute("animated")==="false"&&this._showInstant()}_setupTooltip(e,r,i,s,a){const o=e.append("g").attr("class","tooltip-group").style("display","none");o.append("line").attr("class","crosshair crosshair-x").attr("y1",0).attr("y2",Gt),o.append("line").attr("class","crosshair crosshair-y").attr("x1",0).attr("x2",pe),o.append("circle").attr("r",5).attr("fill",a).attr("stroke","white").attr("stroke-width",2),o.append("rect").attr("class","tooltip-bg").attr("width",60).attr("height",24).attr("rx",6),o.append("text").attr("class","tooltip-text").attr("text-anchor","middle").attr("dy","0.35em");const c=Tr(l=>l.x).left;e.append("rect").attr("width",pe).attr("height",Gt).attr("fill","transparent").on("mousemove",l=>{const[u]=Dr(l),h=i.invert(u);let f=c(r,h,1);if(f>=r.length&&(f=r.length-1),f>0){const g=r[f-1],m=r[f];f=h-g.x>m.x-h?f:f-1}const d=r[f],_=i(d.x),p=s(d.y);o.style("display",null),o.select(".crosshair-x").attr("x1",_).attr("x2",_),o.select(".crosshair-y").attr("y1",p).attr("y2",p),o.select("circle").attr("cx",_).attr("cy",p);const v=60,b=24;let y=_-v/2,x=p-b-10;y<0&&(y=0),y+v>pe&&(y=pe-v),x<0&&(x=p+10),o.select(".tooltip-bg").attr("x",y).attr("y",x),o.select(".tooltip-text").attr("x",y+v/2).attr("y",x+b/2).text(`${d.y.toFixed(1)}`)}).on("mouseleave",()=>{o.style("display","none")})}_showInstant(){if(!this._svg)return;const e=this._svg.select("g");e.select(".line").attr("stroke-dashoffset",0),e.select(".area").classed("visible",!0),e.selectAll(".point").classed("visible",!0)}animateIn(e){var a;if(!this._svg)return;if(e||this.getAttribute("animated")==="false"){this._showInstant();return}const r=this._svg.select("g"),i=r.select(".line"),s=((a=i.node())==null?void 0:a.getTotalLength())||0;i.attr("stroke-dasharray",s).attr("stroke-dashoffset",s).transition().duration(1200).ease(vt).attr("stroke-dashoffset",0),r.select(".area").transition().delay(1500).duration(0).on("start",function(){G(this).classed("visible",!0)}),r.selectAll(".point").each(function(o,c){G(this).transition().delay(1500+c*50).duration(0).on("start",function(){G(this).classed("visible",!0)})})}}customElements.define("lv-line-chart",jp);const hr={sigmoid:n=>1/(1+Math.exp(-n)),relu:n=>Math.max(0,n),tanh:n=>Math.tanh(n),linear:n=>n},Kp=`
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
`,qa=500,Ha=300;class Zp extends R{constructor(){super(...arguments);O(this,"_hasAnimated",!1);O(this,"_resizeObserver",null);O(this,"_svg",null);O(this,"_fn",hr.sigmoid);O(this,"_fnName","sigmoid")}static get observedAttributes(){return["fn","range","samples","color","interactive","animated"]}get _range(){return this.jsonAttr("range",[-6,6])}get _samples(){const e=this.getAttribute("samples");return e&&parseInt(e,10)||200}get _color(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}get _interactive(){return this.hasAttribute("interactive")}get _animated(){const e=this.getAttribute("animated");return e===null?!0:e!=="false"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Kp);const e=document.createElement("div");this.root.appendChild(e);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",`0 0 ${qa} ${Ha}`),r.setAttribute("preserveAspectRatio","xMidYMid meet"),e.appendChild(r),this._svg=G(r),this._parseFn(),this._render(!1),this._resizeObserver=new ResizeObserver(()=>{}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null}attributeChangedCallback(e,r,i){r!==i&&(e==="fn"&&this._parseFn(),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e||!this._animated?this._render(!1):this._render(!0))}_parseFn(){const e=this.getAttribute("fn")||"sigmoid";if(this._fnName=e,hr[e])this._fn=hr[e];else try{const r=e.replace(/^\s*x\s*=>\s*/,"");this._fn=new Function("x","return "+r),this._fnName="custom"}catch{this._fn=hr.sigmoid,this._fnName="sigmoid"}}_generateData(){const[e,r]=this._range,i=this._samples,s=(r-e)/(i-1),a=[];for(let o=0;o<i;o++){const c=e+o*s,l=this._fn(c);a.push({x:c,y:l})}return a}_render(e){if(!this._svg)return;const r=this._svg;r.selectAll("*").remove();const i=this._generateData(),[s,a]=this._range,o=i.map(m=>m.y),c=zc(o)??-1,l=On(o)??1,u=(l-c)*.15||.5,h=c-u,f=l+u,d={top:20,right:30,bottom:30,left:40},_=qa-d.left-d.right,p=Ha-d.top-d.bottom,v=Yt().domain([s,a]).range([0,_]),b=Yt().domain([h,f]).range([p,0]),y=r.append("g").attr("transform",`translate(${d.left},${d.top})`);this._drawGrid(y,v,b,_,p),this._drawAxes(y,v,b,_,p);const x=di().x(m=>v(m.x)).y(m=>b(m.y)).curve(Hp),g=y.append("path").datum(i).attr("class","fn-line").attr("d",x).attr("stroke",this._color).attr("stroke-width",3);if(e){const w=g.node().getTotalLength();g.attr("stroke-dasharray",w).attr("stroke-dashoffset",w).transition().duration(1e3).ease(vt).attr("stroke-dashoffset",0)}this._drawKeyPoints(y,v,b),this._interactive&&this._addInteractivePoint(y,v,b,i,_,p)}_drawGrid(e,r,i,s,a){const o=r.ticks(),c=i.ticks();e.selectAll(".grid-line-x").data(o).enter().append("line").attr("class","grid-line").attr("x1",l=>r(l)).attr("x2",l=>r(l)).attr("y1",0).attr("y2",a),e.selectAll(".grid-line-y").data(c).enter().append("line").attr("class","grid-line").attr("x1",0).attr("x2",s).attr("y1",l=>i(l)).attr("y2",l=>i(l))}_drawAxes(e,r,i,s,a){const[o,c]=r.domain(),[l,u]=i.domain(),h=l<=0&&u>=0?i(0):a;e.append("line").attr("class","axis-line").attr("x1",0).attr("x2",s).attr("y1",h).attr("y2",h);const f=o<=0&&c>=0?r(0):0;e.append("line").attr("class","axis-line").attr("x1",f).attr("x2",f).attr("y1",0).attr("y2",a),r.ticks().forEach(p=>{const v=r(p);e.append("line").attr("class","axis-line").attr("x1",v).attr("x2",v).attr("y1",h-3).attr("y2",h+3),e.append("text").attr("class","axis-text").attr("x",v).attr("y",h+14).attr("text-anchor","middle").text(p)}),i.ticks().forEach(p=>{const v=i(p);e.append("line").attr("class","axis-line").attr("x1",f-3).attr("x2",f+3).attr("y1",v).attr("y2",v),e.append("text").attr("class","axis-text").attr("x",f-12).attr("y",v).attr("dy","0.35em").attr("text-anchor","end").text(p)})}_drawKeyPoints(e,r,i){if(this._fnName==="sigmoid"){const s=r(0),a=i(.5);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("σ(0) = 0.5")}else if(this._fnName==="relu"){const s=r(0),a=i(0);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("kink point")}}_addInteractivePoint(e,r,i,s,a,o){const[c,l]=this._range,u=this._fn,h=(c+l)/2,f=u(h),d=e.append("line").attr("class","crosshair").attr("x1",r(h)).attr("x2",r(h)).attr("y1",i(f)).attr("y2",o),_=e.append("line").attr("class","crosshair").attr("x1",0).attr("x2",r(h)).attr("y1",i(f)).attr("y2",i(f)),p=e.append("g"),v=p.append("rect").attr("class","readout-bg").attr("width",160).attr("height",24).attr("rx",6),b=p.append("text").attr("class","readout-text").attr("text-anchor","middle"),y=e.append("circle").attr("class","drag-point").attr("cx",r(h)).attr("cy",i(f)).attr("r",8).attr("fill",this._color).attr("stroke","#fff").attr("stroke-width",2),x=(m,w,$,A)=>{const k=`x = ${$.toFixed(2)}, y = ${A.toFixed(2)}`;b.text(k);const C=160,T=24,S=12;let M=m-C/2,E=w-T-S;M<0&&(M=0),M+C>a&&(M=a-C),E<0&&(E=w+S),v.attr("x",M).attr("y",E).attr("width",C).attr("height",T),b.attr("x",M+C/2).attr("y",E+T/2).attr("text-anchor","middle")};x(r(h),i(f),h,f);const g=Mh().on("drag",m=>{const w=Math.max(0,Math.min(a,m.x)),$=r.invert(w),A=Math.max(c,Math.min(l,$)),k=u(A),C=r(A),T=i(k);y.attr("cx",C).attr("cy",T),d.attr("x1",C).attr("x2",C).attr("y1",T).attr("y2",o),_.attr("x1",0).attr("x2",C).attr("y1",T).attr("y2",T),x(C,T,A,k)});y.call(g)}}customElements.define("lv-function",Zp);const Ba=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Qp=`
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
`,xt={top:20,right:20,bottom:50,left:55},Va=500,gi=400;class Jp extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null)}static get observedAttributes(){return["data","x-label","y-label","clusters","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Qp),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}attributeChangedCallback(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Ba[e%8]}_clusterColor(e){const i=[...new Set(this._data.map(o=>o.cluster).filter(o=>o!=null))].indexOf(e),s=i>=0?i:0;return getComputedStyle(this).getPropertyValue(`--lv-chart-${s%8}`).trim()||Ba[s%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=G(e),this._svg.append("g").attr("class","grid-group"),this._svg.append("g").attr("class","axis-group"),this._svg.append("g").attr("class","points-group"),this._svg.append("g").attr("class","tooltip-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("clusters"),s=this.hasAttribute("tooltip"),a=this.getAttribute("x-label")||"",o=this.getAttribute("y-label")||"",c=i?[...new Set(r.map(P=>P.cluster).filter(P=>P!=null))]:[],l=c.length>0?30:0,u=gi+l,h=Va-xt.left-xt.right,f=gi-xt.top-xt.bottom;this._svg.attr("viewBox",`0 0 ${Va} ${u}`);const d=Pn(r,P=>P.x),_=Pn(r,P=>P.y),p=(d[1]-d[0])*.05||1,v=(_[1]-_[0])*.05||1,b=Yt().domain([d[0]-p,d[1]+p]).range([0,h]),y=Yt().domain([_[0]-v,_[1]+v]).range([f,0]),x=this._svg.select(".grid-group").attr("transform",`translate(${xt.left},${xt.top})`);x.selectAll("*").remove();const g=Ln(b).tickSize(-f).tickFormat(()=>"");x.append("g").attr("class","grid").attr("transform",`translate(0,${f})`).call(g);const m=Nn(y).tickSize(-h).tickFormat(()=>"");x.append("g").attr("class","grid").call(m);const w=this._svg.select(".axis-group").attr("transform",`translate(${xt.left},${xt.top})`);w.selectAll("*").remove(),w.append("g").attr("class","axis").attr("transform",`translate(0,${f})`).call(Ln(b).ticks(6)),w.append("g").attr("class","axis").call(Nn(y).ticks(6)),a&&w.append("text").attr("class","axis-label").attr("x",h/2).attr("y",f+38).attr("text-anchor","middle").text(a),o&&w.append("text").attr("class","axis-label").attr("x",-f/2).attr("y",-40).attr("text-anchor","middle").attr("transform","rotate(-90)").text(o);const $=this._svg.select(".points-group").attr("transform",`translate(${xt.left},${xt.top})`),A=this._svg.select(".tooltip-group").attr("transform",`translate(${xt.left},${xt.top})`);A.selectAll("*").remove();const k=A.append("g").attr("class","tooltip-box");k.append("rect").attr("class","tooltip-bg"),k.append("text").attr("class","tooltip-text");const C=$.selectAll(".point").data(r,(P,z)=>String(z));C.exit().remove();const T=C.enter().append("circle").attr("class","point").attr("cx",P=>b(P.x)).attr("cy",P=>y(P.y)).attr("r",5).attr("fill",(P,z)=>i&&P.cluster!=null?this._clusterColor(P.cluster):this._getColor(z,P)).attr("opacity",e?0:1).attr("transform",e?"scale(0)":"scale(1)").style("transform-origin",P=>`${b(P.x)}px ${y(P.y)}px`);s?T.on("mouseenter",(P,z)=>{var F;if(G(P.currentTarget).transition().duration(150).attr("r",6.5).attr("opacity",1),z.label){const X=b(z.x),q=y(z.y)-14;k.classed("visible",!0),k.select(".tooltip-text").attr("x",X).attr("y",q).text(z.label);const at=k.select(".tooltip-text").node(),ct=((F=at==null?void 0:at.getComputedTextLength)==null?void 0:F.call(at))||40;k.select(".tooltip-bg").attr("x",X-ct/2-6).attr("y",q-10).attr("width",ct+12).attr("height",20)}}).on("mouseleave",P=>{G(P.currentTarget).transition().duration(150).attr("r",5).attr("opacity",.85),k.classed("visible",!1)}):T.on("mouseenter",P=>{G(P.currentTarget).transition().duration(150).attr("r",6.5)}).on("mouseleave",P=>{G(P.currentTarget).transition().duration(150).attr("r",5)});const S=T.merge(C);if(e?S.each(function(P,z){G(this).transition().delay(z*30).duration(400).ease(md).attr("opacity",.85).attr("transform","scale(1)")}):S.attr("cx",P=>b(P.x)).attr("cy",P=>y(P.y)).attr("opacity",.85).attr("transform","scale(1)").attr("fill",(P,z)=>i&&P.cluster!=null?this._clusterColor(P.cluster):this._getColor(z,P)),this.hasAttribute("labels")||this.hasAttribute("tooltip")){const P=this._svg.select(".points-group");P.selectAll(".point-label").remove(),r.forEach((z,L)=>{if(!z.label)return;const F=P.append("text").attr("class","point-label").attr("x",b(z.x)+8).attr("y",y(z.y)+4).attr("fill","var(--lv-text, #e4e4ec)").attr("font-size","11px").attr("opacity",e?0:.9).text(z.label);e&&F.transition().delay(L*30+200).duration(300).attr("opacity",.9)})}const E=this._svg.select(".legend-group");if(E.selectAll("*").remove(),c.length>0){const P=gi+5;let z=xt.left;for(const L of c){const F=this._clusterColor(L);E.append("circle").attr("cx",z+5).attr("cy",P+8).attr("r",4).attr("fill",F),E.append("text").attr("class","legend-text").attr("x",z+14).attr("y",P+8).attr("dominant-baseline","central").text(String(L)),z+=14+String(L).length*7+20}}}}customElements.define("lv-scatter",Jp);const t0=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],e0=`
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
`,on=300,n0=130,Xa=26,Ya=16;class r0 extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null)}static get observedAttributes(){return["data","donut","legend"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(e0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}attributeChangedCallback(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||t0[e%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=G(e),this._svg.append("g").attr("class","arcs-group"),this._svg.append("g").attr("class","labels-group"),this._svg.append("g").attr("class","hover-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("donut"),s=this.hasAttribute("legend"),a=n0,o=i?a*.6:0,c=a+5,l=s?r.length:0,u=l>0?Ya+l*Xa:0,h=on+u;this._svg.attr("viewBox",`0 0 ${on} ${h}`);const f=on/2,d=on/2,p=Lp().value(A=>A.value).sort(null).padAngle(.015)(r),v=Ta().innerRadius(o).outerRadius(a),b=Ta().innerRadius(o).outerRadius(c),y=this._svg.select(".arcs-group").attr("transform",`translate(${f},${d})`);y.selectAll("*").remove();const x=this._svg.select(".hover-group").attr("transform",`translate(${f},${d})`);x.selectAll("*").remove();const g=x.append("text").attr("class","hover-label").attr("x",0).attr("y",0),m=x.append("text").attr("class","hover-label").attr("x",0).attr("y",18).style("font-size","11px").style("font-weight","400");for(let A=0;A<p.length;A++){const k=p[A],C=this._getColor(A,k.data),T=y.append("path").attr("class","arc").attr("fill",C).attr("stroke","var(--lv-bg, #0f0f23)").attr("stroke-width",1.5);if(e){const S={...k,endAngle:k.startAngle};T.attr("d",v(S)).transition().delay(A*120).duration(800).ease(vt).attrTween("d",()=>{const M=ue(S,k);return E=>v(M(E))})}else T.attr("d",v(k));T.on("mouseenter",()=>{if(T.transition().duration(150).attr("d",b(k)),i)g.text(k.data.label).classed("visible",!0),m.text(String(k.data.value)).classed("visible",!0);else{const[S,M]=v.centroid(k);g.attr("x",S*1.6).attr("y",M*1.6-8).text(k.data.label).classed("visible",!0),m.attr("x",S*1.6).attr("y",M*1.6+8).text(String(k.data.value)).classed("visible",!0)}}).on("mouseleave",()=>{T.transition().duration(150).attr("d",v(k)),g.classed("visible",!1),m.classed("visible",!1)})}const w=this._svg.select(".labels-group").attr("transform",`translate(${f},${d})`);if(w.selectAll("*").remove(),!s)for(let A=0;A<p.length;A++){const k=p[A];if(k.endAngle-k.startAngle>.35){const[T,S]=v.centroid(k),M=w.append("text").attr("class","arc-label").attr("x",T).attr("y",S).text(k.data.label);e&&M.attr("opacity",0).transition().delay(A*120+600).duration(300).attr("opacity",1)}}const $=this._svg.select(".legend-group");if($.selectAll("*").remove(),s&&r.length>0){const A=on+Ya;for(let k=0;k<r.length;k++){const T=A+k*Xa,S=this._getColor(k,r[k]);$.append("rect").attr("class","legend-swatch").attr("x",20).attr("y",T-5).attr("width",10).attr("height",10).attr("fill",S),$.append("text").attr("class","legend-text").attr("x",38).attr("y",T).attr("dominant-baseline","central").text(`${r[k].label} (${r[k].value})`)}}}}customElements.define("lv-pie",r0);const i0=`
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
`,ot=120,Lt=90,_i=60,mi=40,Ga=10,Wa=2,Ua=8,ln=60;function vi(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class s0 extends R{constructor(){super(...arguments);O(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(i0),this._readChildren(),this._renderSvg()}_readChildren(){this._steps=[],this.querySelectorAll("lv-flow-step").forEach(r=>{this._steps.push({icon:r.getAttribute("icon")||"",label:r.getAttribute("label")||"",sub:r.getAttribute("sub")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",active:r.hasAttribute("active")})})}_renderSvg(){const e=this._steps;if(e.length===0)return;const i=(this.getAttribute("direction")||"horizontal")==="horizontal",s=this.hasAttribute("cyclic"),a=this.isRtl,o=24,c=s?ln+40:0;let l,u;i?(l=o*2+e.length*ot+(e.length-1)*_i,u=o*2+Lt+c):(l=o*2+ot+c,u=o*2+e.length*Lt+(e.length-1)*mi);const h=[];for(let x=0;x<e.length;x++)if(i){let g=o+x*(ot+_i);a&&(g=l-o-ot-x*(ot+_i)),h.push({x:g,y:o})}else h.push({x:o,y:o+x*(Lt+mi)});const f="arrowhead",d=Ua,_=Ua,p=`
      <defs>
        <marker id="${f}" markerWidth="${d}" markerHeight="${_}"
                refX="${d}" refY="${_/2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${d},${_/2} L0,${_} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;let v="";for(let x=0;x<e.length;x++){const g=e[x],m=h[x],w=g.active?g.color:"var(--lv-border, #333)",$=g.active?' filter="url(#glow)"':"";v+=`
        <g class="step-group" style="transition-delay: ${x*150}ms">
          <rect x="${m.x}" y="${m.y}" width="${ot}" height="${Lt}"
                rx="${Ga}" ry="${Ga}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${w}" stroke-width="${g.active?2.5:1.5}"
                ${$} />
          <text x="${m.x+ot/2}" y="${m.y+30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${vi(g.icon)}
          </text>
          <text x="${m.x+ot/2}" y="${m.y+54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${vi(g.label)}
          </text>
          <text x="${m.x+ot/2}" y="${m.y+70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${vi(g.sub)}
          </text>
        </g>`}let b="";for(let x=0;x<e.length-1;x++){const g=h[x],m=h[x+1],w=e.length*150+x*120;let $;if(i){const k=a?g.x:g.x+ot,C=a?m.x+ot:m.x,T=g.y+Lt/2,M=Math.abs(C-k)*.35,E=C>k?1:-1;$=`M${k},${T} C${k+E*M},${T} ${C-E*M},${T} ${C},${T}`}else{const k=g.x+ot/2,C=g.y+Lt,T=m.y,S=(T-C)*.4;$=`M${k},${C} C${k},${C+S} ${k},${T-S} ${k},${T}`}const A=i?Math.abs(h[x+1].x-h[x].x)+20:mi+Lt;b+=`
        <path class="arrow-path" d="${$}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Wa}"
              marker-end="url(#${f})"
              stroke-dasharray="${A}"
              stroke-dashoffset="${A}"
              style="transition-delay: ${w}ms" />`}if(s&&e.length>1){const x=h[0],g=h[e.length-1],m=e.length*150+(e.length-1)*120;let w,$;if(i){const A=g.x+ot/2,k=x.x+ot/2,C=g.y+Lt,T=x.y+Lt,S=Math.max(C,T)+ln;w=`M${A},${C} C${A},${S} ${k},${S} ${k},${T}`,$=Math.abs(A-k)+ln*2}else{const A=g.x+ot,k=g.y+Lt/2,C=x.y+Lt/2,T=A+ln;w=`M${A},${k} C${T},${k} ${T},${C} ${A},${C}`,$=Math.abs(k-C)+ln*2}b+=`
        <path class="arrow-path" d="${w}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Wa}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${m}ms" />`}const y=`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${b}
        ${v}
      </svg>`;this.render(y)}animateIn(e){e&&(this.root.querySelectorAll(".step-group").forEach(r=>{r.style.transition="none",r.style.opacity="1",r.style.transform="translateY(0)"}),this.root.querySelectorAll(".arrow-path").forEach(r=>{r.style.transition="none",r.style.strokeDashoffset="0"})),this.classList.add("lv-entered")}}class a0 extends HTMLElement{}customElements.define("lv-flow",s0),customElements.define("lv-flow-step",a0);const o0=`
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
`;function ja(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class l0 extends R{constructor(){super(...arguments);O(this,"_items",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(o0),this._readChildren(),this._renderTimeline()}_readChildren(){this._items=[],this.querySelectorAll("lv-timeline-item").forEach(r=>{this._items.push({date:r.getAttribute("date")||"",title:r.getAttribute("title")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",body:r.innerHTML.trim()})})}_renderTimeline(){if(this._items.length===0)return;let e="";for(let r=0;r<this._items.length;r++){const i=this._items[r];e+=`
        <div class="tl-item" style="animation-delay: ${r*100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date?`<div class="tl-date">${ja(i.date)}</div>`:""}
            ${i.title?`<div class="tl-title">${ja(i.title)}</div>`:""}
            ${i.body?`<div class="tl-body">${i.body}</div>`:""}
          </div>
        </div>`}this.render(`<div class="timeline">${e}</div>`)}animateIn(e){e&&this.root.querySelectorAll(".tl-item").forEach(r=>{r.style.animation="none",r.style.opacity="1",r.style.transform="translateX(0)"}),this.classList.add("lv-entered")}}class c0 extends HTMLElement{}customElements.define("lv-timeline",l0),customElements.define("lv-timeline-item",c0);function Wt(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Ka(n,t){n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ze={duration:.5,overwrite:!1,delay:0},xi,et,Y,Tt=1e8,H=1/Tt,bi=Math.PI*2,u0=bi/4,h0=0,Za=Math.sqrt,f0=Math.cos,d0=Math.sin,tt=function(t){return typeof t=="string"},K=function(t){return typeof t=="function"},Ut=function(t){return typeof t=="number"},yi=function(t){return typeof t>"u"},Ft=function(t){return typeof t=="object"},ft=function(t){return t!==!1},wi=function(){return typeof window<"u"},fr=function(t){return K(t)||tt(t)},Qa=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},it=Array.isArray,p0=/random\([^)]+\)/g,g0=/,\s*/g,Ja=/(?:-?\.?\d|\.)+/gi,to=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Oe=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ki=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,eo=/[+-]=-?[.\d]+/,_0=/[^,'"\[\]\s]+/gi,m0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,W,qt,Ai,Ci,yt={},dr={},no,ro=function(t){return(dr=Ne(t,yt))&&gt},$i=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},cn=function(t,e){return!e&&console.warn(t)},io=function(t,e){return t&&(yt[t]=e)&&dr&&(dr[t]=e)||yt},un=function(){return 0},v0={suppressEvents:!0,isStart:!0,kill:!1},pr={suppressEvents:!0,kill:!1},x0={suppressEvents:!0},Si={},Qt=[],Ti={},so,wt={},Mi={},ao=30,gr=[],Ei="",Pi=function(t){var e=t[0],r,i;if(Ft(e)||K(e)||(t=[t]),!(r=(e._gsap||{}).harness)){for(i=gr.length;i--&&!gr[i].targetTest(e););r=gr[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Ro(t[i],r)))||t.splice(i,1);return t},ge=function(t){return t._gsap||Pi(Et(t))[0]._gsap},oo=function(t,e,r){return(r=t[e])&&K(r)?t[e]():yi(r)&&t.getAttribute&&t.getAttribute(e)||r},dt=function(t,e){return(t=t.split(",")).forEach(e)||t},Z=function(t){return Math.round(t*1e5)/1e5||0},U=function(t){return Math.round(t*1e7)/1e7||0},Le=function(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),r==="+"?t+i:r==="-"?t-i:r==="*"?t*i:t/i},b0=function(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r},_r=function(){var t=Qt.length,e=Qt.slice(0),r,i;for(Ti={},Qt.length=0,r=0;r<t;r++)i=e[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},zi=function(t){return!!(t._initted||t._startAt||t.add)},lo=function(t,e,r,i){Qt.length&&!et&&_r(),t.render(e,r,!!(et&&e<0&&zi(t))),Qt.length&&!et&&_r()},co=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(_0).length<2?e:tt(t)?t.trim():t},uo=function(t){return t},kt=function(t,e){for(var r in e)r in t||(t[r]=e[r]);return t},y0=function(t){return function(e,r){for(var i in r)i in e||i==="duration"&&t||i==="ease"||(e[i]=r[i])}},Ne=function(t,e){for(var r in e)t[r]=e[r];return t},ho=function n(t,e){for(var r in e)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(t[r]=Ft(e[r])?n(t[r]||(t[r]={}),e[r]):e[r]);return t},mr=function(t,e){var r={},i;for(i in t)i in e||(r[i]=t[i]);return r},hn=function(t){var e=t.parent||W,r=t.keyframes?y0(it(t.keyframes)):kt;if(ft(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t},w0=function(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0},fo=function(t,e,r,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},vr=function(t,e,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[r]===e&&(t[r]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Jt=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},_e=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t},k0=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Oi=function(t,e,r,i){return t._startAt&&(et?t._startAt.revert(pr):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},A0=function n(t){return!t||t._ts&&n(t.parent)},po=function(t){return t._repeat?Re(t._tTime,t=t.duration()+t._rDelay)*t:0},Re=function(t,e){var r=Math.floor(t=U(t/e));return t&&r===t?r-1:r},xr=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},br=function(t){return t._end=U(t._start+(t._tDur/Math.abs(t._ts||t._rts||H)||0))},yr=function(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=U(r._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),br(t),r._dirty||_e(r,t)),t},go=function(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=xr(t.rawTime(),e),(!e._dur||dn(0,e.totalDuration(),r)-e._tTime>H)&&e.render(r,!0)),_e(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;t._zTime=-H}},Ht=function(t,e,r,i){return e.parent&&Jt(e),e._start=U((Ut(r)?r:r||t!==W?Mt(t,r,e):t._time)+e._delay),e._end=U(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),fo(t,e,"_first","_last",t._sort?"_start":0),Li(e)||(t._recent=e),i||go(t,e),t._ts<0&&yr(t,t._tTime),t},_o=function(t,e){return(yt.ScrollTrigger||$i("scrollTrigger",e))&&yt.ScrollTrigger.create(e,t)},mo=function(t,e,r,i,s){if(Vi(t,e,s),!t._initted)return 1;if(!r&&t._pt&&!et&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&so!==Ct.frame)return Qt.push(t),t._lazy=[s,i],1},C0=function n(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||n(e))},Li=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},$0=function(t,e,r,i){var s=t.ratio,a=e<0||!e&&(!t._start&&C0(t)&&!(!t._initted&&Li(t))||(t._ts<0||t._dp._ts<0)&&!Li(t))?0:1,o=t._rDelay,c=0,l,u,h;if(o&&t._repeat&&(c=dn(0,t._tDur,e),u=Re(c,o),t._yoyo&&u&1&&(a=1-a),u!==Re(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||et||i||t._zTime===H||!e&&t._zTime){if(!t._initted&&mo(t,e,i,r,c))return;for(h=t._zTime,t._zTime=e||(r?H:0),r||(r=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&Oi(t,e,r,!0),t._onUpdate&&!r&&At(t,"onUpdate"),c&&t._repeat&&!r&&t.parent&&At(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Jt(t,1),!r&&!et&&(At(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},S0=function(t,e,r){var i;if(r>e)for(i=t._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},De=function(t,e,r,i){var s=t._repeat,a=U(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:U(a*(s+1)+t._rDelay*s):a,o>0&&!i&&yr(t,t._tTime=t._tDur*o),t.parent&&br(t),r||_e(t.parent,t),t},vo=function(t){return t instanceof lt?_e(t):De(t,t._dur)},T0={_start:0,endTime:un,totalDuration:un},Mt=function n(t,e,r){var i=t.labels,s=t._recent||T0,a=t.duration()>=Tt?s.endTime(!1):t._dur,o,c,l;return tt(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:r).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&r&&(c=c/100*(it(r)?r[0]:r).totalDuration()),o>1?n(t,e.substr(0,o-1),r)+c:a+c)):e==null?a:+e},fn=function(t,e,r){var i=Ut(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=r,t){for(o=a,c=r;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=ft(c.vars.inherit)&&c.parent;a.immediateRender=ft(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Q(e[0],a,e[s+1])},te=function(t,e){return t||t===0?e(t):e},dn=function(t,e,r){return r<t?t:r>e?e:r},st=function(t,e){return!tt(t)||!(e=m0.exec(t))?"":e[1]},M0=function(t,e,r){return te(r,function(i){return dn(t,e,i)})},Ni=[].slice,xo=function(t,e){return t&&Ft(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ft(t[0]))&&!t.nodeType&&t!==qt},E0=function(t,e,r){return r===void 0&&(r=[]),t.forEach(function(i){var s;return tt(i)&&!e||xo(i,1)?(s=r).push.apply(s,Et(i)):r.push(i)})||r},Et=function(t,e,r){return Y&&!e&&Y.selector?Y.selector(t):tt(t)&&!r&&(Ai||!Fe())?Ni.call((e||Ci).querySelectorAll(t),0):it(t)?E0(t,r):xo(t)?Ni.call(t,0):t?[t]:[]},Ri=function(t){return t=Et(t)[0]||cn("Invalid scope")||{},function(e){var r=t.current||t.nativeElement||t;return Et(e,r.querySelectorAll?r:r===t?cn("Invalid scope")||Ci.createElement("div"):t)}},bo=function(t){return t.sort(function(){return .5-Math.random()})},yo=function(t){if(K(t))return t;var e=Ft(t)?t:{each:t},r=me(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,u=i,h=i;return tt(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(u=i[0],h=i[1]),function(f,d,_){var p=(_||e).length,v=a[p],b,y,x,g,m,w,$,A,k;if(!v){if(k=e.grid==="auto"?0:(e.grid||[1,Tt])[1],!k){for($=-Tt;$<($=_[k++].getBoundingClientRect().left)&&k<p;);k<p&&k--}for(v=a[p]=[],b=c?Math.min(k,p)*u-.5:i%k,y=k===Tt?0:c?p*h/k-.5:i/k|0,$=0,A=Tt,w=0;w<p;w++)x=w%k-b,g=y-(w/k|0),v[w]=m=l?Math.abs(l==="y"?g:x):Za(x*x+g*g),m>$&&($=m),m<A&&(A=m);i==="random"&&bo(v),v.max=$-A,v.min=A,v.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(k>p?p-1:l?l==="y"?p/k:k:Math.max(k,p/k))||0)*(i==="edges"?-1:1),v.b=p<0?s-p:s,v.u=st(e.amount||e.each)||0,r=r&&p<0?Oo(r):r}return p=(v[f]-v.min)/v.max||0,U(v.b+(r?r(p):p)*v.v)+v.u}},Di=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(r){var i=U(Math.round(parseFloat(r)/t)*t*e);return(i-i%1)/e+(Ut(r)?0:st(r))}},wo=function(t,e){var r=it(t),i,s;return!r&&Ft(t)&&(i=r=t.radius||Tt,t.values?(t=Et(t.values),(s=!Ut(t[0]))&&(i*=i)):t=Di(t.increment)),te(e,r?K(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=Tt,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-o,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-o),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:a,s||u===a||Ut(a)?u:u+st(a)}:Di(t))},ko=function(t,e,r,i){return te(it(t)?!e:r===!0?!!(r=0):!i,function(){return it(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+r*.99))/r)*r*i)/i})},P0=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(i){return e.reduce(function(s,a){return a(s)},i)}},z0=function(t,e){return function(r){return t(parseFloat(r))+(e||st(r))}},O0=function(t,e,r){return Co(t,e,0,1,r)},Ao=function(t,e,r){return te(r,function(i){return t[~~e(i)]})},L0=function n(t,e,r){var i=e-t;return it(t)?Ao(t,n(0,t.length),e):te(r,function(s){return(i+(s-t)%i)%i+t})},N0=function n(t,e,r){var i=e-t,s=i*2;return it(t)?Ao(t,n(0,t.length-1),e):te(r,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},pn=function(t){return t.replace(p0,function(e){var r=e.indexOf("[")+1,i=e.substring(r||7,r?e.indexOf("]"):e.length-1).split(g0);return ko(r?i:+i[0],r?0:+i[1],+i[2]||1e-5)})},Co=function(t,e,r,i,s){var a=e-t,o=i-r;return te(s,function(c){return r+((c-t)/a*o||0)})},R0=function n(t,e,r,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=tt(t),o={},c,l,u,h,f;if(r===!0&&(i=1)&&(r=null),a)t={p:t},e={p:e};else if(it(t)&&!it(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(n(t[l-1],t[l]));h--,s=function(_){_*=h;var p=Math.min(f,~~_);return u[p](_-p)},r=e}else i||(t=Ne(it(t)?[]:{},t));if(!u){for(c in e)Hi.call(o,t,c,"get",e[c]);s=function(_){return Gi(_,o)||(a?t.p:t)}}}return te(r,s)},$o=function(t,e,r){var i=t.labels,s=Tt,a,o,c;for(a in i)o=i[a]-e,o<0==!!r&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},At=function(t,e,r){var i=t.vars,s=i[e],a=Y,o=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,r&&Qt.length&&_r(),o&&(Y=o),u=c?s.apply(l,c):s.call(l),Y=a,u},gn=function(t){return Jt(t),t.scrollTrigger&&t.scrollTrigger.kill(!!et),t.progress()<1&&At(t,"onInterrupt"),t},Ie,So=[],To=function(t){if(t)if(t=!t.name&&t.default||t,wi()||t.headless){var e=t.name,r=K(t),i=e&&!r&&t.init?function(){this._props=[]}:t,s={init:un,render:Gi,add:Hi,kill:Q0,modifier:Z0,rawVars:0},a={targetTest:0,get:0,getSetter:Yi,aliases:{},register:0};if(Fe(),t!==i){if(wt[e])return;kt(i,kt(mr(t,s),a)),Ne(i.prototype,Ne(s,mr(t,a))),wt[i.prop=e]=i,t.targetTest&&(gr.push(i),Si[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}io(e,i),t.register&&t.register(gt,i,pt)}else So.push(t)},B=255,_n={aqua:[0,B,B],lime:[0,B,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,B],navy:[0,0,128],white:[B,B,B],olive:[128,128,0],yellow:[B,B,0],orange:[B,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[B,0,0],pink:[B,192,203],cyan:[0,B,B],transparent:[B,B,B,0]},Ii=function(t,e,r){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(r-e)*t*6:t<.5?r:t*3<2?e+(r-e)*(2/3-t)*6:e)*B+.5|0},Mo=function(t,e,r){var i=t?Ut(t)?[t>>16,t>>8&B,t&B]:0:_n.black,s,a,o,c,l,u,h,f,d,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),_n[t])i=_n[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&B,i&B,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&B,t&B]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(Ja),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(l+1):u+l-u*l,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Ii(c+1/3,s,a),i[1]=Ii(c,s,a),i[2]=Ii(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match(to),r&&i.length<4&&(i[3]=1),i}else i=t.match(Ja)||_n.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/B,a=i[1]/B,o=i[2]/B,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),r&&i.length<4&&(i[3]=1),i},Eo=function(t){var e=[],r=[],i=-1;return t.split(ee).forEach(function(s){var a=s.match(Oe)||[];e.push.apply(e,a),r.push(i+=a.length+1)}),e.c=r,e},Po=function(t,e,r){var i="",s=(t+i).match(ee),a=e?"hsla(":"rgba(",o=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Mo(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),r&&(u=Eo(t),c=r.c,c.join(i)!==u.c.join(i)))for(l=t.replace(ee,"1").split(Oe),h=l.length-1;o<h;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:r).shift());if(!l)for(l=t.split(ee),h=l.length-1;o<h;o++)i+=l[o]+s[o];return i+l[h]},ee=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in _n)n+="|"+t+"\\b";return new RegExp(n+")","gi")})(),D0=/hsl[a]?\(/,zo=function(t){var e=t.join(" "),r;if(ee.lastIndex=0,ee.test(e))return r=D0.test(e),t[1]=Po(t[1],r),t[0]=Po(t[0],r,Eo(t[1])),!0},mn,Ct=(function(){var n=Date.now,t=500,e=33,r=n(),i=r,s=1e3/240,a=s,o=[],c,l,u,h,f,d,_=function p(v){var b=n()-i,y=v===!0,x,g,m,w;if((b>t||b<0)&&(r+=b-e),i+=b,m=i-r,x=m-a,(x>0||y)&&(w=++h.frame,f=m-h.time*1e3,h.time=m=m/1e3,a+=x+(x>=s?4:s-x),g=1),y||(c=l(p)),g)for(d=0;d<o.length;d++)o[d](m,f,w,v)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(v){return f/(1e3/(v||60))},wake:function(){no&&(!Ai&&wi()&&(qt=Ai=window,Ci=qt.document||{},yt.gsap=gt,(qt.gsapVersions||(qt.gsapVersions=[])).push(gt.version),ro(dr||qt.GreenSockGlobals||!qt.gsap&&qt||{}),So.forEach(To)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(v){return setTimeout(v,a-h.time*1e3+1|0)},mn=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),mn=0,l=un},lagSmoothing:function(v,b){t=v||1/0,e=Math.min(b||33,t)},fps:function(v){s=1e3/(v||240),a=h.time*1e3+s},add:function(v,b,y){var x=b?function(g,m,w,$){v(g,m,w,$),h.remove(x)}:v;return h.remove(v),o[y?"unshift":"push"](x),Fe(),x},remove:function(v,b){~(b=o.indexOf(v))&&o.splice(b,1)&&d>=b&&d--},_listeners:o},h})(),Fe=function(){return!mn&&Ct.wake()},I={},I0=/^[\d.\-M][\d.\-,\s]/,F0=/["']/g,q0=function(t){for(var e={},r=t.substr(1,t.length-3).split(":"),i=r[0],s=1,a=r.length,o,c,l;s<a;s++)c=r[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(F0,"").trim():+l,i=c.substr(o+1).trim();return e},H0=function(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)},B0=function(t){var e=(t+"").split("("),r=I[e[0]];return r&&e.length>1&&r.config?r.config.apply(null,~t.indexOf("{")?[q0(e[1])]:H0(t).split(",").map(co)):I._CE&&I0.test(t)?I._CE("",t):r},Oo=function(t){return function(e){return 1-t(1-e)}},Lo=function n(t,e){for(var r=t._first,i;r;)r instanceof lt?n(r,e):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==e&&(r.timeline?n(r.timeline,e):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=e)),r=r._next},me=function(t,e){return t&&(K(t)?t:I[t]||B0(t))||e},ve=function(t,e,r,i){r===void 0&&(r=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:r,easeInOut:i},a;return dt(t,function(o){I[o]=yt[o]=s,I[a=o.toLowerCase()]=r;for(var c in s)I[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=I[o+"."+c]=s[c]}),s},No=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Fi=function n(t,e,r){var i=e>=1?e:1,s=(r||(t?.3:.45))/(e<1?e:1),a=s/bi*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*d0((u-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:No(o);return s=bi/s,c.config=function(l,u){return n(t,l,u)},c},qi=function n(t,e){e===void 0&&(e=1.70158);var r=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?r:t==="in"?function(s){return 1-r(1-s)}:No(r);return i.config=function(s){return n(t,s)},i};dt("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,t){var e=t<5?t+1:t;ve(n+",Power"+(e-1),t?function(r){return Math.pow(r,e)}:function(r){return r},function(r){return 1-Math.pow(1-r,e)},function(r){return r<.5?Math.pow(r*2,e)/2:1-Math.pow((1-r)*2,e)/2})}),I.Linear.easeNone=I.none=I.Linear.easeIn,ve("Elastic",Fi("in"),Fi("out"),Fi()),(function(n,t){var e=1/t,r=2*e,i=2.5*e,s=function(o){return o<e?n*o*o:o<r?n*Math.pow(o-1.5/t,2)+.75:o<i?n*(o-=2.25/t)*o+.9375:n*Math.pow(o-2.625/t,2)+.984375};ve("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75),ve("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)}),ve("Circ",function(n){return-(Za(1-n*n)-1)}),ve("Sine",function(n){return n===1?1:-f0(n*u0)+1}),ve("Back",qi("in"),qi("out"),qi()),I.SteppedEase=I.steps=yt.SteppedEase={config:function(t,e){t===void 0&&(t=1);var r=1/t,i=t+(e?0:1),s=e?1:0,a=1-H;return function(o){return((i*dn(0,a,o)|0)+s)*r}}},ze.ease=I["quad.out"],dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Ei+=n+","+n+"Params,"});var Ro=function(t,e){this.id=h0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:oo,this.set=e?e.getSetter:Yi},vn=(function(){function n(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,De(this,+e.duration,1,1),this.data=e.data,Y&&(this._ctx=Y,Y.data.push(this)),mn||Ct.wake()}var t=n.prototype;return t.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},t.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},t.totalDuration=function(r){return arguments.length?(this._dirty=0,De(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(r,i){if(Fe(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(yr(this,r),!s._dp||s.parent||go(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&Ht(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===H||!this._initted&&this._dur&&r||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),lo(this,r,i)),this},t.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+po(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},t.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+po(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(r,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*s,i):this._repeat?Re(this._tTime,s)+1:1},t.timeScale=function(r,i){if(!arguments.length)return this._rts===-H?0:this._rts;if(this._rts===r)return this;var s=this.parent&&this._ts?xr(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-H?0:this._rts,this.totalTime(dn(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),br(this),k0(this)},t.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Fe(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==H&&(this._tTime-=H)))),this):this._ps},t.startTime=function(r){if(arguments.length){this._start=U(r);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ht(i,this,this._start-this._delay),this}return this._start},t.endTime=function(r){return this._start+(ft(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?xr(i.rawTime(r),this):this._tTime:this._tTime},t.revert=function(r){r===void 0&&(r=x0);var i=et;return et=r,zi(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),et=i,this},t.globalTime=function(r){for(var i=this,s=arguments.length?r:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):s},t.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,vo(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,vo(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},t.seek=function(r,i){return this.totalTime(Mt(this,r),ft(i))},t.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,ft(i)),this._dur||(this._zTime=-H),this},t.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},t.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-H:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-H,this},t.isActive=function(){var r=this.parent||this._dp,i=this._start,s;return!!(!r||this._ts&&this._initted&&r.isActive()&&(s=r.rawTime(!0))>=i&&s<this.endTime(!0)-H)},t.eventCallback=function(r,i,s){var a=this.vars;return arguments.length>1?(i?(a[r]=i,s&&(a[r+"Params"]=s),r==="onUpdate"&&(this._onUpdate=i)):delete a[r],this):a[r]},t.then=function(r){var i=this,s=i._prom;return new Promise(function(a){var o=K(r)?r:uo,c=function(){var u=i.then;i.then=null,s&&s(),K(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){gn(this)},n})();kt(vn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-H,_prom:0,_ps:!1,_rts:1});var lt=(function(n){Ka(t,n);function t(r,i){var s;return r===void 0&&(r={}),s=n.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=ft(r.sortChildren),W&&Ht(r.parent||W,Wt(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&_o(Wt(s),r.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return fn(0,arguments,this),this},e.from=function(i,s,a){return fn(1,arguments,this),this},e.fromTo=function(i,s,a,o){return fn(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,hn(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Q(i,s,Mt(this,a),1),this},e.call=function(i,s,a){return Ht(this,Q.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new Q(i,a,Mt(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,u){return a.runBackwards=1,hn(a).immediateRender=ft(a.immediateRender),this.staggerTo(i,s,a,o,c,l,u)},e.staggerFromTo=function(i,s,a,o,c,l,u,h){return o.startAt=a,hn(o).immediateRender=ft(o.immediateRender),this.staggerTo(i,s,o,c,l,u,h)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:U(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,_,p,v,b,y,x,g,m,w,$;if(this!==W&&u>c&&i>=0&&(u=c),u!==this._tTime||a||h){if(o!==this._time&&l&&(u+=this._time-o,i+=this._time-o),f=u,g=this._start,x=this._ts,b=!x,h&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,v=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(v*100+i,s,a);if(f=U(u%v),u===c?(p=this._repeat,f=l):(m=U(u/v),p=~~m,p&&p===m&&(f=l,p--),f>l&&(f=l)),m=Re(this._tTime,v),!o&&this._tTime&&m!==p&&this._tTime-m*v-this._dur<=0&&(m=p),w&&p&1&&(f=l-f,$=1),p!==m&&!this._lock){var A=w&&m&1,k=A===(w&&p&1);if(p<m&&(A=!A),o=A?0:u%l?l:u,this._lock=1,this.render(o||($?0:U(p*v)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&At(this,"onRepeat"),this.vars.repeatRefresh&&!$&&(this.invalidate()._lock=1,m=p),o&&o!==this._time||b!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,k&&(this._lock=2,o=A?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!$&&this.invalidate()),this._lock=0,!this._ts&&!b)return this;Lo(this,$)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=S0(this,U(o),U(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&l&&!s&&!m&&(At(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(_=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!b){y=0,_&&(u+=this._zTime=-H);break}}d=_}else{d=this._last;for(var C=i<0?i:f;d;){if(_=d._prev,(d._act||C<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||et&&zi(d)),f!==this._time||!this._ts&&!b){y=0,_&&(u+=this._zTime=C?-H:H);break}}d=_}}if(y&&!s&&(this.pause(),y.render(f>=o?0:-H)._zTime=f>=o?1:-1,this._ts))return this._start=g,br(this),this.render(i,s,a);this._onUpdate&&!s&&At(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&o)&&(g===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Jt(this,1),!s&&!(i<0&&!o)&&(u||o||!c)&&(At(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Ut(s)||(s=Mt(this,s,i)),!(i instanceof vn)){if(it(i))return i.forEach(function(o){return a.add(o,s)}),this;if(tt(i))return this.addLabel(i,s);if(K(i))i=Q.delayedCall(0,i);else return this}return this!==i?Ht(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Tt);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof Q?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return tt(i)?this.removeLabel(i):K(i)?this.killTweensOf(i):(i.parent===this&&vr(this,i),i===this._recent&&(this._recent=this._last),_e(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=U(Ct.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),n.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Mt(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Q.delayedCall(0,s||un,a);return o.data="isPause",this._hasPause=1,Ht(this,o,Mt(this,i))},e.removePause=function(i){var s=this._first;for(i=Mt(this,i);s;)s._start===i&&s.data==="isPause"&&Jt(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)ne!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Et(i),c=this._first,l=Ut(s),u;c;)c instanceof Q?b0(c._targets,o)&&(l?(!ne||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(u=c.getTweensOf(o,s)).length&&a.push.apply(a,u),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Mt(a,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,_=Q.to(a,kt({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||H,onStart:function(){if(a.pause(),!d){var v=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());_._dur!==v&&De(_,v,0,1).render(_._time,!0,!0),d=1}u&&u.apply(_,h||[])}},s));return f?_.render(0):_},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,kt({startAt:{time:Mt(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),$o(this,Mt(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),$o(this,Mt(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+H)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=U(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return _e(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return n.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),_e(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=Tt,l,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Ht(a,o,u-o._delay,1)._lock=0):c=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=U(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;De(a,a===W&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(W._ts&&(lo(W,xr(i,W)),so=Ct.frame),Ct.frame>=ao){ao+=bt.autoSleep||120;var s=W._first;if((!s||!s._ts)&&bt.autoSleep&&Ct._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ct.sleep()}}},t})(vn);kt(lt.prototype,{_lock:0,_hasPause:0,_forcing:0});var V0=function(t,e,r,i,s,a,o){var c=new pt(this._pt,t,e,0,1,Bo,null,s),l=0,u=0,h,f,d,_,p,v,b,y;for(c.b=r,c.e=i,r+="",i+="",(b=~i.indexOf("random("))&&(i=pn(i)),a&&(y=[r,i],a(y,t,e),r=y[0],i=y[1]),f=r.match(ki)||[];h=ki.exec(i);)_=h[0],p=i.substring(l,h.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),_!==f[u++]&&(v=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:p||u===1?p:",",s:v,c:_.charAt(1)==="="?Le(v,_)-v:parseFloat(_)-v,m:d&&d<4?Math.round:0},l=ki.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(eo.test(i)||b)&&(c.e=0),this._pt=c,c},Hi=function(t,e,r,i,s,a,o,c,l,u){K(i)&&(i=i(s||0,t,a));var h=t[e],f=r!=="get"?r:K(h)?l?t[e.indexOf("set")||!K(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=K(h)?l?U0:qo:Xi,_;if(tt(i)&&(~i.indexOf("random(")&&(i=pn(i)),i.charAt(1)==="="&&(_=Le(f,i)+(st(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Bi)return!isNaN(f*i)&&i!==""?(_=new pt(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?K0:Ho,0,d),l&&(_.fp=l),o&&_.modifier(o,this,t),this._pt=_):(!h&&!(e in t)&&$i(e,i),V0.call(this,t,e,f,i,d,c||bt.stringFilter,l))},X0=function(t,e,r,i,s){if(K(t)&&(t=xn(t,s,e,r,i)),!Ft(t)||t.style&&t.nodeType||it(t)||Qa(t))return tt(t)?xn(t,s,e,r,i):t;var a={},o;for(o in t)a[o]=xn(t[o],s,e,r,i);return a},Do=function(t,e,r,i,s,a){var o,c,l,u;if(wt[t]&&(o=new wt[t]).init(s,o.rawVars?e[t]:X0(e[t],i,s,a,r),r,i,a)!==!1&&(r._pt=c=new pt(r._pt,s,t,0,1,o.render,o,0,o.priority),r!==Ie))for(l=r._ptLookup[r._targets.indexOf(s)],u=o._props.length;u--;)l[o._props[u]]=c;return o},ne,Bi,Vi=function n(t,e,r){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,_=t._dur,p=t._startAt,v=t._targets,b=t.parent,y=b&&b.data==="nested"?b.vars.targets:v,x=t._overwrite==="auto"&&!xi,g=t.timeline,m,w,$,A,k,C,T,S,M,E,P,z,L;if(g&&(!f||!s)&&(s="none"),t._ease=me(s,ze.ease),t._yEase=h?Oo(me(h===!0?s:h,ze.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!g&&!!i.runBackwards,!g||f&&!i.stagger){if(S=v[0]?ge(v[0]).harness:0,z=S&&i[S.prop],m=mr(i,Si),p&&(p._zTime<0&&p.progress(1),e<0&&u&&o&&!d?p.render(-1,!0):p.revert(u&&_?pr:v0),p._lazy=0),a){if(Jt(t._startAt=Q.set(v,kt({data:"isStart",overwrite:!1,parent:b,immediateRender:!0,lazy:!p&&ft(c),startAt:null,delay:0,onUpdate:l&&function(){return At(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(et||!o&&!d)&&t._startAt.revert(pr),o&&_&&e<=0&&r<=0){e&&(t._zTime=e);return}}else if(u&&_&&!p){if(e&&(o=!1),$=kt({overwrite:!1,data:"isFromStart",lazy:o&&!p&&ft(c),immediateRender:o,stagger:0,parent:b},m),z&&($[S.prop]=z),Jt(t._startAt=Q.set(v,$)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(et?t._startAt.revert(pr):t._startAt.render(-1,!0)),t._zTime=e,!o)n(t._startAt,H,H);else if(!e)return}for(t._pt=t._ptCache=0,c=_&&ft(c)||c&&!_,w=0;w<v.length;w++){if(k=v[w],T=k._gsap||Pi(v)[w]._gsap,t._ptLookup[w]=E={},Ti[T.id]&&Qt.length&&_r(),P=y===v?w:y.indexOf(k),S&&(M=new S).init(k,z||m,t,P,y)!==!1&&(t._pt=A=new pt(t._pt,k,M.name,0,1,M.render,M,0,M.priority),M._props.forEach(function(F){E[F]=A}),M.priority&&(C=1)),!S||z)for($ in m)wt[$]&&(M=Do($,m,t,P,k,y))?M.priority&&(C=1):E[$]=A=Hi.call(t,k,$,"get",m[$],P,y,0,i.stringFilter);t._op&&t._op[w]&&t.kill(k,t._op[w]),x&&t._pt&&(ne=t,W.killTweensOf(k,E,t.globalTime(e)),L=!t.parent,ne=0),t._pt&&c&&(Ti[T.id]=1)}C&&Vo(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!L,f&&e<=0&&g.render(Tt,!0,!0)},Y0=function(t,e,r,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Bi=1,t.vars[e]="+=0",Vi(t,o),Bi=0,c?cn(e+" not eligible for reset"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=r-u.s,h.e&&(h.e=Z(r)+st(h.e)),h.b&&(h.b=u.s+st(h.b))},G0=function(t,e){var r=t[0]?ge(t[0]).harness:0,i=r&&r.aliases,s,a,o,c;if(!i)return e;s=Ne({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},W0=function(t,e,r,i){var s=e.ease||i||"power1.inOut",a,o;if(it(e))o=r[t]||(r[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=r[a]||(r[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},xn=function(t,e,r,i,s){return K(t)?t.call(e,r,i,s):tt(t)&&~t.indexOf("random(")?pn(t):t},Io=Ei+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Fo={};dt(Io+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return Fo[n]=1});var Q=(function(n){Ka(t,n);function t(r,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=n.call(this,a?i:hn(i))||this;var c=o.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,_=c.keyframes,p=c.defaults,v=c.scrollTrigger,b=c.yoyoEase,y=i.parent||W,x=(it(r)||Qa(r)?Ut(r[0]):"length"in i)?[r]:Et(r),g,m,w,$,A,k,C,T;if(o._targets=x.length?Pi(x):cn("GSAP target "+r+" not found. https://gsap.com",!bt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,_||f||fr(l)||fr(u)){if(i=o.vars,g=o.timeline=new lt({data:"nested",defaults:p||{},targets:y&&y.data==="nested"?y.vars.targets:x}),g.kill(),g.parent=g._dp=Wt(o),g._start=0,f||fr(l)||fr(u)){if($=x.length,C=f&&yo(f),Ft(f))for(A in f)~Io.indexOf(A)&&(T||(T={}),T[A]=f[A]);for(m=0;m<$;m++)w=mr(i,Fo),w.stagger=0,b&&(w.yoyoEase=b),T&&Ne(w,T),k=x[m],w.duration=+xn(l,Wt(o),m,k,x),w.delay=(+xn(u,Wt(o),m,k,x)||0)-o._delay,!f&&$===1&&w.delay&&(o._delay=u=w.delay,o._start+=u,w.delay=0),g.to(k,w,C?C(m,k,x):0),g._ease=I.none;g.duration()?l=u=0:o.timeline=0}else if(_){hn(kt(g.vars.defaults,{ease:"none"})),g._ease=me(_.ease||i.ease||"none");var S=0,M,E,P;if(it(_))_.forEach(function(z){return g.to(x,z,">")}),g.duration();else{w={};for(A in _)A==="ease"||A==="easeEach"||W0(A,_[A],w,_.easeEach);for(A in w)for(M=w[A].sort(function(z,L){return z.t-L.t}),S=0,m=0;m<M.length;m++)E=M[m],P={ease:E.e,duration:(E.t-(m?M[m-1].t:0))/100*l},P[A]=E.v,g.to(x,P,S),S+=P.duration;g.duration()<l&&g.to({},{duration:l-g.duration()})}}l||o.duration(l=g.duration())}else o.timeline=0;return d===!0&&!xi&&(ne=Wt(o),W.killTweensOf(x),ne=0),Ht(y,Wt(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!l&&!_&&o._start===U(y._time)&&ft(h)&&A0(Wt(o))&&y.data!=="nested")&&(o._tTime=-H,o.render(Math.max(0,-u)||0)),v&&_o(Wt(o),v),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-H&&!u?c:i<H?0:i,f,d,_,p,v,b,y,x,g;if(!l)$0(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,x=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,a);if(f=U(h%p),h===c?(_=this._repeat,f=l):(v=U(h/p),_=~~v,_&&_===v?(f=l,_--):f>l&&(f=l)),b=this._yoyo&&_&1,b&&(g=this._yEase,f=l-f),v=Re(this._tTime,p),f===o&&!a&&this._initted&&_===v)return this._tTime=h,this;_!==v&&(x&&this._yEase&&Lo(x,b),this.vars.repeatRefresh&&!b&&!this._lock&&f!==p&&this._initted&&(this._lock=a=1,this.render(U(p*_),!0).invalidate()._lock=0))}if(!this._initted){if(mo(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==v))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(g||this._ease)(f/l),this._from&&(this.ratio=y=1-y),!o&&h&&!s&&!v&&(At(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Oi(this,i,s,a),At(this,"onUpdate")),this._repeat&&_!==v&&this.vars.onRepeat&&!s&&this.parent&&At(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Oi(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Jt(this,1),!s&&!(u&&!o)&&(h||o||b)&&(At(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),n.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){mn||Ct.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Vi(this,l),u=this._ease(l/this._dur),Y0(this,i,s,a,o,u,l,c)?this.resetTo(i,s,a,o,1):(yr(this,0),this.parent||fo(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?gn(this):this.scrollTrigger&&this.scrollTrigger.kill(!!et),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ne&&ne.vars.overwrite!==!0)._first||gn(this),this.parent&&a!==this.timeline.totalDuration()&&De(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?Et(i):o,l=this._ptLookup,u=this._pt,h,f,d,_,p,v,b;if((!s||s==="all")&&w0(o,c))return s==="all"&&(this._pt=0),gn(this);for(h=this._op=this._op||[],s!=="all"&&(tt(s)&&(p={},dt(s,function(y){return p[y]=1}),s=p),s=G0(o,s)),b=o.length;b--;)if(~c.indexOf(o[b])){f=l[b],s==="all"?(h[b]=s,_=f,d={}):(d=h[b]=h[b]||{},_=s);for(p in _)v=f&&f[p],v&&((!("kill"in v.d)||v.d.kill(p)===!0)&&vr(this,v,"_pt"),delete f[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&gn(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return fn(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return fn(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return W.killTweensOf(i,s,a)},t})(vn);kt(Q.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),dt("staggerTo,staggerFrom,staggerFromTo",function(n){Q[n]=function(){var t=new lt,e=Ni.call(arguments,0);return e.splice(n==="staggerFromTo"?5:4,0,0),t[n].apply(t,e)}});var Xi=function(t,e,r){return t[e]=r},qo=function(t,e,r){return t[e](r)},U0=function(t,e,r,i){return t[e](i.fp,r)},j0=function(t,e,r){return t.setAttribute(e,r)},Yi=function(t,e){return K(t[e])?qo:yi(t[e])&&t.setAttribute?j0:Xi},Ho=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},K0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Bo=function(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round((r.s+r.c*t)*1e4)/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},Gi=function(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},Z0=function(t,e,r,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,r),s=a},Q0=function(t){for(var e=this._pt,r,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?vr(this,e,"_pt"):e.dep||(r=1),e=i;return!r},J0=function(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)},Vo=function(t){for(var e=t._pt,r,i,s,a;e;){for(r=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=r}t._pt=s},pt=(function(){function n(e,r,i,s,a,o,c,l,u){this.t=r,this.s=s,this.c=a,this.p=i,this.r=o||Ho,this.d=c||this,this.set=l||Xi,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=n.prototype;return t.modifier=function(r,i,s){this.mSet=this.mSet||this.set,this.set=J0,this.m=r,this.mt=s,this.tween=i},n})();dt(Ei+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Si[n]=1}),yt.TweenMax=yt.TweenLite=Q,yt.TimelineLite=yt.TimelineMax=lt,W=new lt({sortChildren:!1,defaults:ze,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),bt.stringFilter=zo;var xe=[],wr={},tg=[],Xo=0,eg=0,Wi=function(t){return(wr[t]||tg).map(function(e){return e()})},Ui=function(){var t=Date.now(),e=[];t-Xo>2&&(Wi("matchMediaInit"),xe.forEach(function(r){var i=r.queries,s=r.conditions,a,o,c,l;for(o in i)a=qt.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(r.revert(),c&&e.push(r))}),Wi("matchMediaRevert"),e.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),Xo=t,Wi("matchMedia"))},Yo=(function(){function n(e,r){this.selector=r&&Ri(r),this.data=[],this._r=[],this.isReverted=!1,this.id=eg++,e&&this.add(e)}var t=n.prototype;return t.add=function(r,i,s){K(r)&&(s=i,i=r,r=K);var a=this,o=function(){var l=Y,u=a.selector,h;return l&&l!==a&&l.data.push(a),s&&(a.selector=Ri(s)),Y=a,h=i.apply(a,arguments),K(h)&&a._r.push(h),Y=l,a.selector=u,a.isReverted=!1,h};return a.last=o,r===K?o(a,function(c){return a.add(null,c)}):r?a[r]=o:o},t.ignore=function(r){var i=Y;Y=null,r(this),Y=i},t.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof n?r.push.apply(r,i.getTweens()):i instanceof Q&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(r,i){var s=this;if(r?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(r)}),c=s.data.length;c--;)l=s.data[c],l instanceof lt?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Q)&&l.revert&&l.revert(r);s._r.forEach(function(u){return u(r,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=xe.length;a--;)xe[a].id===this.id&&xe.splice(a,1)},t.revert=function(r){this.kill(r||{})},n})(),ng=(function(){function n(e){this.contexts=[],this.scope=e,Y&&Y.data.push(this)}var t=n.prototype;return t.add=function(r,i,s){Ft(r)||(r={matches:r});var a=new Yo(0,s||this.scope),o=a.conditions={},c,l,u;Y&&!a.selector&&(a.selector=Y.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=r;for(l in r)l==="all"?u=1:(c=qt.matchMedia(r[l]),c&&(xe.indexOf(a)<0&&xe.push(a),(o[l]=c.matches)&&(u=1),c.addListener?c.addListener(Ui):c.addEventListener("change",Ui)));return u&&i(a,function(h){return a.add(null,h)}),this},t.revert=function(r){this.kill(r||{})},t.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},n})(),kr={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(i){return To(i)})},timeline:function(t){return new lt(t)},getTweensOf:function(t,e){return W.getTweensOf(t,e)},getProperty:function(t,e,r,i){tt(t)&&(t=Et(t)[0]);var s=ge(t||{}).get,a=r?uo:co;return r==="native"&&(r=""),t&&(e?a((wt[e]&&wt[e].get||s)(t,e,r,i)):function(o,c,l){return a((wt[o]&&wt[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,r){if(t=Et(t),t.length>1){var i=t.map(function(u){return gt.quickSetter(u,e,r)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var a=wt[e],o=ge(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(u){var h=new a;Ie._pt=0,h.init(t,r?u+r:u,Ie,0,[t]),h.render(1,h),Ie._pt&&Gi(1,Ie)}:o.set(t,c);return a?l:function(u){return l(t,c,r?u+r:u,o,1)}},quickTo:function(t,e,r){var i,s=gt.to(t,kt((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),a=function(c,l,u){return s.resetTo(e,c,l,u)};return a.tween=s,a},isTweening:function(t){return W.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=me(t.ease,ze.ease)),ho(ze,t||{})},config:function(t){return ho(bt,t||{})},registerEffect:function(t){var e=t.name,r=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!wt[o]&&!yt[o]&&cn(e+" effect requires "+o+" plugin.")}),Mi[e]=function(o,c,l){return r(Et(o),kt(c||{},s),l)},a&&(lt.prototype[e]=function(o,c,l){return this.add(Mi[e](o,Ft(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){I[t]=me(e)},parseEase:function(t,e){return arguments.length?me(t,e):I},getById:function(t){return W.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var r=new lt(t),i,s;for(r.smoothChildTiming=ft(t.smoothChildTiming),W.remove(r),r._dp=0,r._time=r._tTime=W._time,i=W._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Q&&i.vars.onComplete===i._targets[0]))&&Ht(r,i,i._start-i._delay),i=s;return Ht(W,r,0),r},context:function(t,e){return t?new Yo(t,e):Y},matchMedia:function(t){return new ng(t)},matchMediaRefresh:function(){return xe.forEach(function(t){var e=t.conditions,r,i;for(i in e)e[i]&&(e[i]=!1,r=1);r&&t.revert()})||Ui()},addEventListener:function(t,e){var r=wr[t]||(wr[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function(t,e){var r=wr[t],i=r&&r.indexOf(e);i>=0&&r.splice(i,1)},utils:{wrap:L0,wrapYoyo:N0,distribute:yo,random:ko,snap:wo,normalize:O0,getUnit:st,clamp:M0,splitColor:Mo,toArray:Et,selector:Ri,mapRange:Co,pipe:P0,unitize:z0,interpolate:R0,shuffle:bo},install:ro,effects:Mi,ticker:Ct,updateRoot:lt.updateRoot,plugins:wt,globalTimeline:W,core:{PropTween:pt,globals:io,Tween:Q,Timeline:lt,Animation:vn,getCache:ge,_removeLinkedListItem:vr,reverting:function(){return et},context:function(t){return t&&Y&&(Y.data.push(t),t._ctx=Y),Y},suppressOverwrites:function(t){return xi=t}}};dt("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return kr[n]=Q[n]}),Ct.add(lt.updateRoot),Ie=kr.to({},{duration:0});var rg=function(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r},ig=function(t,e){var r=t._targets,i,s,a;for(i in e)for(s=r.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=rg(a,i)),a&&a.modifier&&a.modifier(e[i],t,r[s],i))},ji=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(tt(s)&&(c={},dt(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}ig(o,s)}}}},gt=kr.registerPlugin({name:"attr",init:function(t,e,r,i,s){var a,o,c;this.tween=r;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var r=e._pt;r;)et?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},ji("roundProps",Di),ji("modifiers"),ji("snap",wo))||kr;Q.version=lt.version=gt.version="3.14.2",no=1,wi()&&Fe(),I.Power0,I.Power1,I.Power2,I.Power3,I.Power4,I.Linear,I.Quad,I.Cubic,I.Quart,I.Quint,I.Strong,I.Elastic,I.Back,I.SteppedEase,I.Bounce,I.Sine,I.Expo,I.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Go,re,qe,Ki,be,Wo,Zi,sg=function(){return typeof window<"u"},jt={},ye=180/Math.PI,He=Math.PI/180,Be=Math.atan2,Uo=1e8,Qi=/([A-Z])/g,ag=/(left|right|width|margin|padding|x)/i,og=/[\s,\(]\S/,Bt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ji=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},lg=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},cg=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},ug=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},hg=function(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)},jo=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Ko=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},fg=function(t,e,r){return t.style[e]=r},dg=function(t,e,r){return t.style.setProperty(e,r)},pg=function(t,e,r){return t._gsap[e]=r},gg=function(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r},_g=function(t,e,r,i,s){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(s,a)},mg=function(t,e,r,i,s){var a=t._gsap;a[e]=r,a.renderTransform(s,a)},j="transform",_t=j+"Origin",vg=function n(t,e){var r=this,i=this.target,s=i.style,a=i._gsap;if(t in jt&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Bt[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return r.tfm[o]=Kt(i,o)}):this.tfm[t]=a.x?a[t]:Kt(i,t),t===_t&&(this.tfm.zOrigin=a.zOrigin);else return Bt.transform.split(",").forEach(function(o){return n.call(r,o,e)});if(this.props.indexOf(j)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(_t,e,"")),t=j}(s||e)&&this.props.push(t,e,s[t])},Zo=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},xg=function(){var t=this.props,e=this.target,r=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?r[t[s]]=t[s+2]:r.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Qi,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Zi(),(!s||!s.isStart)&&!r[j]&&(Zo(r),i.zOrigin&&r[_t]&&(r[_t]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Qo=function(t,e){var r={target:t,props:[],revert:xg,save:vg};return t._gsap||gt.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return r.save(i)}),r},Jo,ts=function(t,e){var r=re.createElementNS?re.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):re.createElement(t);return r&&r.style?r:re.createElement(t)},$t=function n(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Qi,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&n(t,Ve(e)||e,1)||""},tl="O,Moz,ms,Ms,Webkit".split(","),Ve=function(t,e,r){var i=e||be,s=i.style,a=5;if(t in s&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(tl[a]+t in s););return a<0?null:(a===3?"ms":a>=0?tl[a]:"")+t},es=function(){sg()&&window.document&&(Go=window,re=Go.document,qe=re.documentElement,be=ts("div")||{style:{}},ts("div"),j=Ve(j),_t=j+"Origin",be.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Jo=!!Ve("perspective"),Zi=gt.core.reverting,Ki=1)},el=function(t){var e=t.ownerSVGElement,r=ts("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",r.appendChild(i),qe.appendChild(r);try{s=i.getBBox()}catch{}return r.removeChild(i),qe.removeChild(r),s},nl=function(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])},rl=function(t){var e,r;try{e=t.getBBox()}catch{e=el(t),r=1}return e&&(e.width||e.height)||r||(e=el(t)),e&&!e.width&&!e.x&&!e.y?{x:+nl(t,["x","cx","x1"])||0,y:+nl(t,["y","cy","y1"])||0,width:0,height:0}:e},il=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&rl(t))},ie=function(t,e){if(e){var r=t.style,i;e in jt&&e!==_t&&(e=j),r.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),r.removeProperty(i==="--"?e:e.replace(Qi,"-$1").toLowerCase())):r.removeAttribute(e)}},se=function(t,e,r,i,s,a){var o=new pt(t._pt,e,r,0,1,a?Ko:jo);return t._pt=o,o.b=i,o.e=s,t._props.push(r),o},sl={deg:1,rad:1,turn:1},bg={grid:1,flex:1},ae=function n(t,e,r,i){var s=parseFloat(r)||0,a=(r+"").trim().substr((s+"").length)||"px",o=be.style,c=ag.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",_,p,v,b;if(i===a||!s||sl[i]||sl[a])return s;if(a!=="px"&&!f&&(s=n(t,e,r,"px")),b=t.getCTM&&il(t),(d||a==="%")&&(jt[e]||~e.indexOf("adius")))return _=b?t.getBBox()[c?"width":"height"]:t[u],Z(d?s/_*h:s/100*_);if(o[c?"width":"height"]=h+(f?a:i),p=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,b&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===re||!p.appendChild)&&(p=re.body),v=p._gsap,v&&d&&v.width&&c&&v.time===Ct.time&&!v.uncache)return Z(s/v.width*h);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+i,_=t[u],y?t.style[e]=y:ie(t,e)}else(d||a==="%")&&!bg[$t(p,"display")]&&(o.position=$t(t,"position")),p===t&&(o.position="static"),p.appendChild(be),_=be[u],p.removeChild(be),o.position="absolute";return c&&d&&(v=ge(p),v.time=Ct.time,v.width=p[u]),Z(f?_*s/h:_&&s?h/_*s:0)},Kt=function(t,e,r,i){var s;return Ki||es(),e in Bt&&e!=="transform"&&(e=Bt[e],~e.indexOf(",")&&(e=e.split(",")[0])),jt[e]&&e!=="transform"?(s=yn(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Cr($t(t,_t))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ar[e]&&Ar[e](t,e,r)||$t(t,e)||oo(t,e)||(e==="opacity"?1:0))),r&&!~(s+"").trim().indexOf(" ")?ae(t,e,s,r)+r:s},yg=function(t,e,r,i){if(!r||r==="none"){var s=Ve(e,t,1),a=s&&$t(t,s,1);a&&a!==r?(e=s,r=a):e==="borderColor"&&(r=$t(t,"borderTopColor"))}var o=new pt(this._pt,t.style,e,0,1,Bo),c=0,l=0,u,h,f,d,_,p,v,b,y,x,g,m;if(o.b=r,o.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=$t(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(p=t.style[e],t.style[e]=i,i=$t(t,e)||i,p?t.style[e]=p:ie(t,e)),u=[r,i],zo(u),r=u[0],i=u[1],f=r.match(Oe)||[],m=i.match(Oe)||[],m.length){for(;h=Oe.exec(i);)v=h[0],y=i.substring(c,h.index),_?_=(_+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(_=1),v!==(p=f[l++]||"")&&(d=parseFloat(p)||0,g=p.substr((d+"").length),v.charAt(1)==="="&&(v=Le(d,v)+g),b=parseFloat(v),x=v.substr((b+"").length),c=Oe.lastIndex-x.length,x||(x=x||bt.units[e]||g,c===i.length&&(i+=x,o.e+=x)),g!==x&&(d=ae(t,e,p,x)||0),o._pt={_next:o._pt,p:y||l===1?y:",",s:d,c:b-d,m:_&&_<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?Ko:jo;return eo.test(i)&&(o.e=0),this._pt=o,o},al={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wg=function(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(t=r,r=i,i=t),e[0]=al[r]||r,e[1]=al[i]||i,e.join(" ")},kg=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r=e.t,i=r.style,s=e.u,a=r._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],jt[o]&&(c=1,o=o==="transformOrigin"?_t:j),ie(r,o);c&&(ie(r,j),a&&(a.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",yn(r,1),a.uncache=1,Zo(i)))}},Ar={clearProps:function(t,e,r,i,s){if(s.data!=="isFromStart"){var a=t._pt=new pt(t._pt,e,r,0,0,kg);return a.u=i,a.pr=-10,a.tween=s,t._props.push(r),1}}},bn=[1,0,0,1,0,0],ol={},ll=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},cl=function(t){var e=$t(t,j);return ll(e)?bn:e.substr(7).match(to).map(Z)},ns=function(t,e){var r=t._gsap||ge(t),i=t.style,s=cl(t),a,o,c,l;return r.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?bn:s):(s===bn&&!t.offsetParent&&t!==qe&&!r.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,qe.appendChild(t)),s=cl(t),c?i.display=c:ie(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):qe.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},rs=function(t,e,r,i,s,a){var o=t._gsap,c=s||ns(t,!0),l=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=c[0],_=c[1],p=c[2],v=c[3],b=c[4],y=c[5],x=e.split(" "),g=parseFloat(x[0])||0,m=parseFloat(x[1])||0,w,$,A,k;r?c!==bn&&($=d*v-_*p)&&(A=g*(v/$)+m*(-p/$)+(p*y-v*b)/$,k=g*(-_/$)+m*(d/$)-(d*y-_*b)/$,g=A,m=k):(w=rl(t),g=w.x+(~x[0].indexOf("%")?g/100*w.width:g),m=w.y+(~(x[1]||x[0]).indexOf("%")?m/100*w.height:m)),i||i!==!1&&o.smooth?(b=g-l,y=m-u,o.xOffset=h+(b*d+y*p)-b,o.yOffset=f+(b*_+y*v)-y):o.xOffset=o.yOffset=0,o.xOrigin=g,o.yOrigin=m,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!r,t.style[_t]="0px 0px",a&&(se(a,o,"xOrigin",l,g),se(a,o,"yOrigin",u,m),se(a,o,"xOffset",h,o.xOffset),se(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",g+" "+m)},yn=function(t,e){var r=t._gsap||new Ro(t);if("x"in r&&!e&&!r.uncache)return r;var i=t.style,s=r.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=$t(t,_t)||"0",u,h,f,d,_,p,v,b,y,x,g,m,w,$,A,k,C,T,S,M,E,P,z,L,F,X,q,at,ct,Ge,St,nt;return u=h=f=p=v=b=y=x=g=0,d=_=1,r.svg=!!(t.getCTM&&il(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[j]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[j]!=="none"?c[j]:"")),i.scale=i.rotate=i.translate="none"),$=ns(t,r.svg),r.svg&&(r.uncache?(F=t.getBBox(),l=r.xOrigin-F.x+"px "+(r.yOrigin-F.y)+"px",L=""):L=!e&&t.getAttribute("data-svg-origin"),rs(t,L||l,!!L||r.originIsAbsolute,r.smooth!==!1,$)),m=r.xOrigin||0,w=r.yOrigin||0,$!==bn&&(T=$[0],S=$[1],M=$[2],E=$[3],u=P=$[4],h=z=$[5],$.length===6?(d=Math.sqrt(T*T+S*S),_=Math.sqrt(E*E+M*M),p=T||S?Be(S,T)*ye:0,y=M||E?Be(M,E)*ye+p:0,y&&(_*=Math.abs(Math.cos(y*He))),r.svg&&(u-=m-(m*T+w*M),h-=w-(m*S+w*E))):(nt=$[6],Ge=$[7],q=$[8],at=$[9],ct=$[10],St=$[11],u=$[12],h=$[13],f=$[14],A=Be(nt,ct),v=A*ye,A&&(k=Math.cos(-A),C=Math.sin(-A),L=P*k+q*C,F=z*k+at*C,X=nt*k+ct*C,q=P*-C+q*k,at=z*-C+at*k,ct=nt*-C+ct*k,St=Ge*-C+St*k,P=L,z=F,nt=X),A=Be(-M,ct),b=A*ye,A&&(k=Math.cos(-A),C=Math.sin(-A),L=T*k-q*C,F=S*k-at*C,X=M*k-ct*C,St=E*C+St*k,T=L,S=F,M=X),A=Be(S,T),p=A*ye,A&&(k=Math.cos(A),C=Math.sin(A),L=T*k+S*C,F=P*k+z*C,S=S*k-T*C,z=z*k-P*C,T=L,P=F),v&&Math.abs(v)+Math.abs(p)>359.9&&(v=p=0,b=180-b),d=Z(Math.sqrt(T*T+S*S+M*M)),_=Z(Math.sqrt(z*z+nt*nt)),A=Be(P,z),y=Math.abs(A)>2e-4?A*ye:0,g=St?1/(St<0?-St:St):0),r.svg&&(L=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!ll($t(t,j)),L&&t.setAttribute("transform",L))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=p<=0?180:-180,p+=p<=0?180:-180):(_*=-1,y+=y<=0?180:-180)),e=e||r.uncache,r.x=u-((r.xPercent=u&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+a,r.y=h-((r.yPercent=h&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+a,r.z=f+a,r.scaleX=Z(d),r.scaleY=Z(_),r.rotation=Z(p)+o,r.rotationX=Z(v)+o,r.rotationY=Z(b)+o,r.skewX=y+o,r.skewY=x+o,r.transformPerspective=g+a,(r.zOrigin=parseFloat(l.split(" ")[2])||!e&&r.zOrigin||0)&&(i[_t]=Cr(l)),r.xOffset=r.yOffset=0,r.force3D=bt.force3D,r.renderTransform=r.svg?Cg:Jo?ul:Ag,r.uncache=0,r},Cr=function(t){return(t=t.split(" "))[0]+" "+t[1]},is=function(t,e,r){var i=st(e);return Z(parseFloat(e)+parseFloat(ae(t,"x",r+"px",i)))+i},Ag=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ul(t,e)},we="0deg",wn="0px",ke=") ",ul=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.z,l=r.rotation,u=r.rotationY,h=r.rotationX,f=r.skewX,d=r.skewY,_=r.scaleX,p=r.scaleY,v=r.transformPerspective,b=r.force3D,y=r.target,x=r.zOrigin,g="",m=b==="auto"&&t&&t!==1||b===!0;if(x&&(h!==we||u!==we)){var w=parseFloat(u)*He,$=Math.sin(w),A=Math.cos(w),k;w=parseFloat(h)*He,k=Math.cos(w),a=is(y,a,$*k*-x),o=is(y,o,-Math.sin(w)*-x),c=is(y,c,A*k*-x+x)}v!==wn&&(g+="perspective("+v+ke),(i||s)&&(g+="translate("+i+"%, "+s+"%) "),(m||a!==wn||o!==wn||c!==wn)&&(g+=c!==wn||m?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+ke),l!==we&&(g+="rotate("+l+ke),u!==we&&(g+="rotateY("+u+ke),h!==we&&(g+="rotateX("+h+ke),(f!==we||d!==we)&&(g+="skew("+f+", "+d+ke),(_!==1||p!==1)&&(g+="scale("+_+", "+p+ke),y.style[j]=g||"translate(0, 0)"},Cg=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.rotation,l=r.skewX,u=r.skewY,h=r.scaleX,f=r.scaleY,d=r.target,_=r.xOrigin,p=r.yOrigin,v=r.xOffset,b=r.yOffset,y=r.forceCSS,x=parseFloat(a),g=parseFloat(o),m,w,$,A,k;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=He,l*=He,m=Math.cos(c)*h,w=Math.sin(c)*h,$=Math.sin(c-l)*-f,A=Math.cos(c-l)*f,l&&(u*=He,k=Math.tan(l-u),k=Math.sqrt(1+k*k),$*=k,A*=k,u&&(k=Math.tan(u),k=Math.sqrt(1+k*k),m*=k,w*=k)),m=Z(m),w=Z(w),$=Z($),A=Z(A)):(m=h,A=f,w=$=0),(x&&!~(a+"").indexOf("px")||g&&!~(o+"").indexOf("px"))&&(x=ae(d,"x",a,"px"),g=ae(d,"y",o,"px")),(_||p||v||b)&&(x=Z(x+_-(_*m+p*$)+v),g=Z(g+p-(_*w+p*A)+b)),(i||s)&&(k=d.getBBox(),x=Z(x+i/100*k.width),g=Z(g+s/100*k.height)),k="matrix("+m+","+w+","+$+","+A+","+x+","+g+")",d.setAttribute("transform",k),y&&(d.style[j]=k)},$g=function(t,e,r,i,s){var a=360,o=tt(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?ye:1),l=c-i,u=i+l+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),h==="cw"&&l<0?l=(l+a*Uo)%a-~~(l/a)*a:h==="ccw"&&l>0&&(l=(l-a*Uo)%a-~~(l/a)*a)),t._pt=f=new pt(t._pt,e,r,i,l,lg),f.e=u,f.u="deg",t._props.push(r),f},hl=function(t,e){for(var r in e)t[r]=e[r];return t},Sg=function(t,e,r){var i=hl({},r._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=r.style,o,c,l,u,h,f,d,_;i.svg?(l=r.getAttribute("transform"),r.setAttribute("transform",""),a[j]=e,o=yn(r,1),ie(r,j),r.setAttribute("transform",l)):(l=getComputedStyle(r)[j],a[j]=e,o=yn(r,1),a[j]=l);for(c in jt)l=i[c],u=o[c],l!==u&&s.indexOf(c)<0&&(d=st(l),_=st(u),h=d!==_?ae(r,c,l,_):parseFloat(l),f=parseFloat(u),t._pt=new pt(t._pt,o,c,h,f-h,Ji),t._pt.u=_||0,t._props.push(c));hl(o,i)};dt("padding,margin,Width,Radius",function(n,t){var e="Top",r="Right",i="Bottom",s="Left",a=(t<3?[e,r,i,s]:[e+s,e+r,i+r,i+s]).map(function(o){return t<2?n+o:"border"+o+n});Ar[t>1?"border"+n:n]=function(o,c,l,u,h){var f,d;if(arguments.length<4)return f=a.map(function(_){return Kt(o,_,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(_,p){return d[_]=f[p]=f[p]||f[(p-1)/2|0]}),o.init(c,d,h)}});var fl={name:"css",register:es,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,r,i,s){var a=this._props,o=t.style,c=r.vars.startAt,l,u,h,f,d,_,p,v,b,y,x,g,m,w,$,A,k;Ki||es(),this.styles=this.styles||Qo(t),A=this.styles.props,this.tween=r;for(p in e)if(p!=="autoRound"&&(u=e[p],!(wt[p]&&Do(p,e,r,i,t,s)))){if(d=typeof u,_=Ar[p],d==="function"&&(u=u.call(r,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=pn(u)),_)_(this,t,p,u,r)&&($=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(p)+"").trim(),u+="",ee.lastIndex=0,ee.test(l)||(v=st(l),b=st(u),b?v!==b&&(l=ae(t,p,l,b)+b):v&&(u+=v)),this.add(o,"setProperty",l,u,i,s,0,0,p),a.push(p),A.push(p,0,o[p]);else if(d!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(r,i,t,s):c[p],tt(l)&&~l.indexOf("random(")&&(l=pn(l)),st(l+"")||l==="auto"||(l+=bt.units[p]||st(Kt(t,p))||""),(l+"").charAt(1)==="="&&(l=Kt(t,p))):l=Kt(t,p),f=parseFloat(l),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),p in Bt&&(p==="autoAlpha"&&(f===1&&Kt(t,"visibility")==="hidden"&&h&&(f=0),A.push("visibility",0,o.visibility),se(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=Bt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),x=p in jt,x){if(this.styles.save(p),k=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=$t(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=t.style.perspective;t.style.perspective=u,u=$t(t,"perspective"),C?t.style.perspective=C:ie(t,"perspective")}h=parseFloat(u)}if(g||(m=t._gsap,m.renderTransform&&!e.parseTransform||yn(t,e.parseTransform),w=e.smoothOrigin!==!1&&m.smooth,g=this._pt=new pt(this._pt,o,j,0,1,m.renderTransform,m,0,-1),g.dep=1),p==="scale")this._pt=new pt(this._pt,m,"scaleY",m.scaleY,(y?Le(m.scaleY,y+h):h)-m.scaleY||0,Ji),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){A.push(_t,0,o[_t]),u=wg(u),m.svg?rs(t,u,0,w,0,this):(b=parseFloat(u.split(" ")[2])||0,b!==m.zOrigin&&se(this,m,"zOrigin",m.zOrigin,b),se(this,o,p,Cr(l),Cr(u)));continue}else if(p==="svgOrigin"){rs(t,u,1,w,0,this);continue}else if(p in ol){$g(this,m,p,f,y?Le(f,y+u):u);continue}else if(p==="smoothOrigin"){se(this,m,"smooth",m.smooth,u);continue}else if(p==="force3D"){m[p]=u;continue}else if(p==="transform"){Sg(this,u,t);continue}}else p in o||(p=Ve(p)||p);if(x||(h||h===0)&&(f||f===0)&&!og.test(u)&&p in o)v=(l+"").substr((f+"").length),h||(h=0),b=st(u)||(p in bt.units?bt.units[p]:v),v!==b&&(f=ae(t,p,l,b)),this._pt=new pt(this._pt,x?m:o,p,f,(y?Le(f,y+h):h)-f,!x&&(b==="px"||p==="zIndex")&&e.autoRound!==!1?hg:Ji),this._pt.u=b||0,x&&k!==u?(this._pt.b=l,this._pt.e=k,this._pt.r=ug):v!==b&&b!=="%"&&(this._pt.b=l,this._pt.r=cg);else if(p in o)yg.call(this,t,p,l,y?y+u:u);else if(p in t)this.add(t,p,l||t[p],y?y+u:u,i,s);else if(p!=="parseTransform"){$i(p,u);continue}x||(p in o?A.push(p,0,o[p]):typeof t[p]=="function"?A.push(p,2,t[p]()):A.push(p,1,l||t[p])),a.push(p)}}$&&Vo(this)},render:function(t,e){if(e.tween._time||!Zi())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:Kt,aliases:Bt,getSetter:function(t,e,r){var i=Bt[e];return i&&i.indexOf(",")<0&&(e=i),e in jt&&e!==_t&&(t._gsap.x||Kt(t,"x"))?r&&Wo===r?e==="scale"?gg:pg:(Wo=r||{})&&(e==="scale"?_g:mg):t.style&&!yi(t.style[e])?fg:~e.indexOf("-")?dg:Yi(t,e)},core:{_removeProperty:ie,_getMatrix:ns}};gt.utils.checkPrefix=Ve,gt.core.getStyleSaver=Qo,(function(n,t,e,r){var i=dt(n+","+t+","+e,function(s){jt[s]=1});dt(t,function(s){bt.units[s]="deg",ol[s]=1}),Bt[i[13]]=n+","+t,dt(r,function(s){var a=s.split(":");Bt[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){bt.units[n]="px"}),gt.registerPlugin(fl);var kn=gt.registerPlugin(fl)||gt;kn.core.Tween;const Xe={input:"#ff2d75",hidden:"#7b68ee",output:"#00d4ff"},An=36,$r=100,ss=200,dl=50,as=60,Tg=`
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;class Mg extends R{constructor(){super(...arguments);O(this,"_svg",null);O(this,"_container",null);O(this,"_hasAnimated",!1);O(this,"_isAnimating",!1);O(this,"_resizeObserver",null);O(this,"_timeline",null)}static get observedAttributes(){return["layers","names","animate","speed"]}get _layers(){return this.jsonAttr("layers",[["x₁","x₂"],["h₁","h₂","h₃"],["ŷ"]])}get _names(){return this.jsonAttr("names",[])}get _animateMode(){return this.getAttribute("animate")||"none"}get _speed(){const e=parseInt(this.getAttribute("speed")||"",10);return isNaN(e)?600:e}connectedCallback(){super.connectedCallback(),this.adoptStyles(Tg),this._container=document.createElement("div"),this.root.appendChild(this._container),this._initSvg(),this._render(),this._resizeObserver=new ResizeObserver(()=>{this._isAnimating||this._render()}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null,this._cancelAnimation()}attributeChangedCallback(e,r,i){r!==i&&this._svg&&(this._cancelAnimation(),this._hasAnimated=!1,this._render())}animateIn(e){if(!this._hasAnimated){if(e||this._animateMode==="none"){this._hasAnimated=!0,this._render();return}this._runAnimation()}}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=G(e);const r=this._svg.append("defs"),i={input:Xe.input,hidden:Xe.hidden,output:Xe.output};for(const[s,a]of Object.entries(i))r.append("filter").attr("id",`glow-${s}`).attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",6).attr("flood-color",a).attr("flood-opacity",.7);this._svg.append("g").attr("class","connections-group"),this._svg.append("g").attr("class","nodes-group"),this._svg.append("g").attr("class","labels-group")}_computeLayout(){const e=this._layers,r=this.isRtl,i=e.length,s=Math.max(...e.map(u=>u.length),1),a=(i-1)*ss+as*2,o=(s-1)*$r+dl+An+40,c=[],l=[];for(let u=0;u<i;u++){const h=e[u],f=r?a-as-u*ss:as+u*ss,d=(h.length-1)*$r,_=dl+((s-1)*$r-d)/2,p=[];for(let v=0;v<h.length;v++)p.push({layer:u,index:v,x:f,y:_+v*$r,label:h[v]});c.push(p)}for(let u=0;u<i-1;u++)for(const h of c[u])for(const f of c[u+1])l.push({source:h,target:f});return{nodes:c,connections:l,width:a,height:o}}_layerColor(e,r){const i=getComputedStyle(this).getPropertyValue("--lv-net-input").trim()||Xe.input,s=getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim()||Xe.hidden,a=getComputedStyle(this).getPropertyValue("--lv-net-output").trim()||Xe.output;return e===0?i:e===r-1?a:s}_layerType(e,r){return e===0?"input":e===r-1?"output":"hidden"}_render(){if(!this._svg)return;const{nodes:e,connections:r,width:i,height:s}=this._computeLayout(),a=e.length,o=this._animateMode==="none"||this._hasAnimated,c=this._animateMode!=="none"&&!this._hasAnimated;this._svg.attr("viewBox",`0 0 ${i} ${s}`);const l=this._svg.select(".connections-group");l.selectAll("*").remove();for(const d of r)l.append("line").attr("class","connection").attr("x1",d.source.x).attr("y1",d.source.y).attr("x2",d.target.x).attr("y2",d.target.y).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1.5).attr("stroke-opacity",c?.08:.5).attr("data-source-layer",d.source.layer).attr("data-target-layer",d.target.layer);const u=this._svg.select(".nodes-group");u.selectAll("*").remove();for(const d of e)for(const _ of d){const p=this._layerColor(_.layer,a),v=this._layerType(_.layer,a),b=u.append("g").attr("class","node").attr("data-layer",_.layer).attr("data-index",_.index).attr("transform",`translate(${_.x},${_.y})`).attr("opacity",c?.15:1);b.append("circle").attr("class","node-circle").attr("data-layer",_.layer).attr("r",An).attr("fill",p).attr("stroke",p).attr("stroke-width",2).attr("fill-opacity",o?.2:c?.05:.2),o&&b.attr("filter",`url(#glow-${v})`),b.append("text").attr("class","node-label").text(_.label)}const h=this._svg.select(".labels-group");h.selectAll("*").remove();const f=this._names;for(let d=0;d<e.length;d++){if(!f[d])continue;const _=e[d][0];h.append("text").attr("class","label").attr("x",_.x).attr("y",_.y-An-16).text(f[d])}}_getLayerNodeGroups(){const e=this._layers.length,r=[];for(let i=0;i<e;i++){const s=Array.from(this.root.querySelectorAll(`.node[data-layer="${i}"]`));r.push(s)}return r}_getConnectionElements(e,r){return Array.from(this.root.querySelectorAll(`.connection[data-source-layer="${e}"][data-target-layer="${r}"]`))}_cancelAnimation(){var e;(e=this._timeline)==null||e.kill(),this._timeline=null,this._isAnimating=!1}_runAnimation(){if(!this._svg)return;this._cancelAnimation(),this._isAnimating=!0,this._render();const{nodes:e}=this._computeLayout(),r=e.length,i=this._animateMode,s=this._speed,a=i==="backprop",o=a?"#ff2d75":"#00d4ff",c=s/600,l=a?Array.from({length:r},(f,d)=>r-1-d):Array.from({length:r},(f,d)=>d),u=this._getLayerNodeGroups(),h=kn.timeline({onComplete:()=>{this._isAnimating=!1,this._hasAnimated=!0,this.root.querySelectorAll(".node").forEach(_=>{const p=parseInt(_.getAttribute("data-layer")||"0",10),v=this._layerType(p,r);kn.set(_,{opacity:1}),_.setAttribute("filter",`url(#glow-${v})`);const b=_.querySelector("circle");b&&kn.set(b,{attr:{"fill-opacity":.2}})}),this.root.querySelectorAll(".connection").forEach(_=>{kn.set(_,{attr:{"stroke-opacity":.5}}),_.setAttribute("stroke","var(--lv-border, #2a2a4a)")})}});this._timeline=h,h.addLabel("start",.15),l.forEach((f,d)=>{const _=this._layerType(f,r),p=u[f];if(!p||p.length===0)return;const v=p.map(x=>x.querySelector(".node-circle")).filter(Boolean),b=`layer-${d}`,y=.15+d*(.4*c);if(h.addLabel(b,y),h.to(p,{opacity:1,duration:.2,stagger:.05,ease:"power2.out"},b),h.call(()=>{p.forEach(x=>{x.setAttribute("filter",`url(#glow-${_})`)})},[],b),h.to(v,{attr:{r:An*1.15},duration:.15,stagger:.05,ease:"back.out(1.7)"},b),h.to(v,{attr:{r:An},duration:.2,stagger:.05,ease:"power2.inOut"},`${b}+=0.2`),h.to(v,{attr:{"fill-opacity":.35},duration:.2,stagger:.05,ease:"power2.out"},b),h.to(v,{attr:{"fill-opacity":.2},duration:.3,stagger:.05,ease:"power2.in"},`${b}+=0.3`),d<l.length-1){const x=l[d+1],g=Math.min(f,x),m=Math.max(f,x),w=this._getConnectionElements(g,m);w.length>0&&(h.to(w,{attr:{"stroke-opacity":.5},stroke:o,duration:.25,stagger:.02,ease:"power2.out"},`${b}+=0.15`),h.to(w,{stroke:"var(--lv-border, #2a2a4a)",attr:{"stroke-opacity":.35},duration:.3,stagger:.02,ease:"power2.inOut"},`${b}+=0.35`))}})}}customElements.define("lv-network",Mg);const pl=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Eg=`
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
`,oe=120,Cn=32,Sr=40;class Pg extends R{constructor(){super(...arguments);O(this,"_data",null);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null);O(this,"_root",null)}static get observedAttributes(){return["data","orientation"]}get _orientation(){return this.getAttribute("orientation")==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Eg),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",{label:"root"}),this._initSvg(),this._buildHierarchy(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}attributeChangedCallback(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",{label:"root"}),this._buildHierarchy()),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=G(e),this._svg.append("g").attr("class","links-group"),this._svg.append("g").attr("class","nodes-group")}_buildHierarchy(){this._data&&(this._root=ir(this._data))}_getVisibleNodes(){if(!this._root)return[];const e=[],r=i=>{if(e.push(i),!i._collapsed&&i.children)for(const s of i.children)r(s)};return r(this._root),e}_toggleCollapse(e){!e.data.children||e.data.children.length===0||(e._collapsed?(e._collapsed=!1,e.children=e._children||[]):(e._collapsed=!0,e._children=e.children,e.children=void 0),this._render(!0))}_render(e){if(!this._svg||!this._root)return;const r=this._orientation==="horizontal",i=new Map,s=(C,T)=>{if(i.set(T,{collapsed:!!C._collapsed,_children:C._children}),C._collapsed&&C._children)for(let S=0;S<C._children.length;S++)s(C._children[S],`${T}/${S}`);if(C.children)for(let S=0;S<C.children.length;S++)s(C.children[S],`${T}/${S}`)};s(this._root,"0"),this._root=ir(this._data);const a=(C,T)=>{const S=i.get(T);if(S!=null&&S.collapsed&&(C._collapsed=!0,C._children=C.children,C.children=void 0),C.children)for(let M=0;M<C.children.length;M++)a(C.children[M],`${T}/${M}`)};a(this._root,"0");const o=this._getVisibleNodes(),c=o.filter(C=>!C.children||C.children.length===0).length,l=On(o,C=>C.depth)||0,u=Cn+20,h=oe+60;let f,d;r?(f=l*h,d=Math.max((c-1)*u,u)):(f=Math.max((c-1)*(oe+80),oe+80),d=l*h),ap().size(r?[d,f]:[f,d]).separation((C,T)=>C.parent===T.parent?1.5:2)(this._root);const p=this._root.descendants(),v=this._root.links(),b=f+Sr*2+oe,y=d+Sr*2+Cn;this._svg.attr("viewBox",`0 0 ${b} ${y}`);const x=Sr+oe/2,g=Sr+Cn/2,m=C=>r?C.y+x:C.x+x,w=C=>r?C.x+g:C.y+g,$=this._svg.select(".links-group");$.selectAll("*").remove();const A=r?Fp().x(C=>C.y+x).y(C=>C.x+g):qp().x(C=>C.x+x).y(C=>C.y+g);for(let C=0;C<v.length;C++){const T=v[C],S=$.append("path").attr("class","link").attr("d",A(T));if(e){const M=S.node().getTotalLength();S.attr("stroke-dasharray",M).attr("stroke-dashoffset",M).transition().delay(C*60+100).duration(500).ease(vt).attr("stroke-dashoffset",0)}}const k=this._svg.select(".nodes-group");k.selectAll("*").remove();for(let C=0;C<p.length;C++){const T=p[C],S=m(T),M=w(T),E=T.data.children&&T.data.children.length>0,P=!!T._collapsed,L=T.depth%pl.length,F=getComputedStyle(this).getPropertyValue(`--lv-chart-${L}`).trim()||pl[L],X=k.append("g").attr("transform",`translate(${S},${M})`);e&&X.attr("opacity",0).transition().delay(C*60).duration(400).ease(vt).attr("opacity",1);const q=X.append("rect").attr("class",`node-rect ${E?"has-children":"leaf"}`).attr("x",-oe/2).attr("y",-Cn/2).attr("width",oe).attr("height",Cn).attr("stroke",F);X.append("text").attr("class","node-label").text(T.data.label),E&&X.append("text").attr("class","collapse-indicator").attr("x",oe/2-12).attr("y",0).text(P?"+":"−"),E&&(q.on("click",()=>{this._toggleCollapse(T)}),X.select(".collapse-indicator").on("click",()=>{this._toggleCollapse(T)}))}}}customElements.define("lv-tree",Pg),N.LvBaseElement=R,N.clamp=fs,N.colorScale=ds,N.formatNum=ps,N.getToken=kl,N.lerp=Ae,N.scrollAnimator=J,N.setTheme=Al,N.simColorScale=bl,N.uid=wl,Object.defineProperty(N,Symbol.toStringTag,{value:"Module"})}));

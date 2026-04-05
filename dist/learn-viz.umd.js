(function(N,V){typeof exports=="object"&&typeof module<"u"?V(exports):typeof define=="function"&&define.amd?define(["exports"],V):(N=typeof globalThis<"u"?globalThis:N||self,V(N.LearnViz={}))})(this,(function(N){"use strict";var yg=Object.defineProperty;var hl=N=>{throw TypeError(N)};var wg=(N,V,Q)=>V in N?yg(N,V,{enumerable:!0,configurable:!0,writable:!0,value:Q}):N[V]=Q;var O=(N,V,Q)=>wg(N,typeof V!="symbol"?V+"":V,Q),fl=(N,V,Q)=>V.has(N)||hl("Cannot "+Q);var Ue=(N,V,Q)=>(fl(N,V,"read from private field"),Q?Q.call(N):V.get(N)),Mr=(N,V,Q)=>V.has(N)?hl("Cannot add the same private member more than once"):V instanceof WeakSet?V.add(N):V.set(N,Q),We=(N,V,Q,R)=>(fl(N,V,"write to private field"),R?R.call(N,Q):V.set(N,Q),Q);var Ye,Mn,ae;class V{constructor(){Mr(this,Ye);Mr(this,Mn,new WeakSet);We(this,Ye,new IntersectionObserver(t=>{for(const e of t)if(e.isIntersecting&&!Ue(this,Mn).has(e.target)){Ue(this,Mn).add(e.target);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=e.target;typeof i.animateIn=="function"&&(r?i.animateIn(!0):i.animateIn(!1))}},{threshold:.15}))}observe(t){Ue(this,Ye).observe(t)}unobserve(t){Ue(this,Ye).unobserve(t)}}Ye=new WeakMap,Mn=new WeakMap;const Q=new V;class R extends HTMLElement{constructor(){super();O(this,"root");Mr(this,ae,!1);this.root=this.attachShadow({mode:"open"})}get dir(){var e;return((e=this.closest("[dir]"))==null?void 0:e.getAttribute("dir"))||document.documentElement.dir||"ltr"}get isRtl(){return this.dir==="rtl"}adoptStyles(e){const r=new CSSStyleSheet;r.replaceSync(e),this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,r]}jsonAttr(e,r){const i=this.getAttribute(e);if(!i)return r;const s=i.replace(/\u2212/g,"-");try{return JSON.parse(s)}catch{return r}}render(e){We(this,ae,!0),this.root.innerHTML=e,We(this,ae,!1)}attributeChangedCallback(e,r,i){Ue(this,ae)||(We(this,ae,!0),this.handleAttributeChange(e,r,i),We(this,ae,!1))}handleAttributeChange(e,r,i){}animateIn(e){}connectedCallback(){Q.observe(this)}disconnectedCallback(){Q.unobserve(this)}}ae=new WeakMap;function Ae(n,t,e){return n+(t-n)*e}function hs(n,t,e){return Math.min(Math.max(n,t),e)}function fs(n){n=hs(n,0,1);const t=n<.5?Math.round(Ae(0,255,n*2)):255,e=n<.5?Math.round(Ae(200,230,n*2)):Math.round(Ae(230,50,(n-.5)*2)),r=n<.5?Math.round(Ae(83,60,n*2)):Math.round(Ae(60,80,(n-.5)*2));return`rgb(${t},${e},${r})`}function dl(n){return fs((1-n)/2)}function ds(n){return Number.isInteger(n)?n.toString():Math.abs(n)>=100?n.toFixed(0):Math.abs(n)>=1?n.toFixed(1):n.toFixed(2)}let pl=0;function gl(n="lv"){return`${n}-${++pl}`}function _l(n,t){const e=t||document.documentElement;return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim()}function ml(n,t){n.setAttribute("data-theme",t)}const vl=`
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
`;class xl extends R{static get observedAttributes(){return["theme","dir"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(vl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("dir")||"ltr";this.setAttribute("dir",t),this.render("<slot></slot>")}}customElements.define("lv-page",xl);const bl=`
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
`;class yl extends R{static get observedAttributes(){return["number","title","subtitle","gradient"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(bl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("number")||"",e=this.getAttribute("title")||"",r=this.getAttribute("subtitle")||"",i=this.getAttribute("gradient")||"",s=i?`background: ${i};`:"";this.render(`
      <div class="hero" style="${s}">
        ${t?`<div class="number">${t}</div>`:""}
        <div class="content">
          <h1>${e}</h1>
          ${r?`<p class="subtitle">${r}</p>`:""}
        </div>
      </div>
    `)}}customElements.define("lv-hero",yl);const wl=`
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
`;class kl extends R{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(wl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("title")||"";this.render(`
      ${t?`<h2>${t}</h2>`:""}
      <slot></slot>
    `)}}customElements.define("lv-section",kl);const Al=`
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
`;class Cl extends R{static get observedAttributes(){return["variant"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Al),this._render()}handleAttributeChange(){this._render()}_render(){this.root.querySelector(".card")||this.render('<div class="card"><slot></slot></div>')}}customElements.define("lv-card",Cl);const $l=`
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
`;class Sl extends R{static get observedAttributes(){return["cols","gap"]}connectedCallback(){super.connectedCallback(),this.adoptStyles($l),this._render()}handleAttributeChange(){this.root.querySelector(".grid")||this._render()}_render(){this.render('<div class="grid"><slot></slot></div>')}}customElements.define("lv-grid",Sl);const Tl=`
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
`;class Ml extends R{static get observedAttributes(){return["label","active"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Tl),this.render("<slot></slot>"),this.setAttribute("role","tabpanel")}handleAttributeChange(){}}customElements.define("lv-tab",Ml);const El=`
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
`;class Pl extends R{constructor(){super(...arguments);O(this,"_tabs",[]);O(this,"_buttons",[]);O(this,"_activeIndex",0)}connectedCallback(){super.connectedCallback(),this.adoptStyles(El),requestAnimationFrame(()=>this._setup())}_setup(){if(this._tabs=Array.from(this.querySelectorAll("lv-tab")),this._tabs.length===0)return;const e=this._tabs.findIndex(s=>s.hasAttribute("active"));this._activeIndex=e>=0?e:0;const r=this._tabs.map((s,a)=>{const o=s.getAttribute("label")||`Tab ${a+1}`,c=a===this._activeIndex;return`<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c?"0":"-1"}"
        data-index="${a}"
      >${o}</button>`}).join("");this.render(`
      <div class="tablist" role="tablist">${r}</div>
      <div class="panels"><slot></slot></div>
    `),this._buttons=Array.from(this.root.querySelectorAll(".tab-btn")),this._activate(this._activeIndex);const i=this.root.querySelector(".tablist");i.addEventListener("click",s=>{const a=s.target.closest(".tab-btn");a&&this._activate(Number(a.dataset.index))}),i.addEventListener("keydown",(s=>{const a=this._buttons.length;let o=this._activeIndex;switch(s.key){case"ArrowRight":case"ArrowDown":s.preventDefault(),o=(o+1)%a;break;case"ArrowLeft":case"ArrowUp":s.preventDefault(),o=(o-1+a)%a;break;case"Home":s.preventDefault(),o=0;break;case"End":s.preventDefault(),o=a-1;break;case"Enter":case" ":s.preventDefault(),this._activate(o);return;default:return}this._buttons[o].focus(),this._activate(o)}))}_activate(e){this._activeIndex=e,this._buttons.forEach((r,i)=>{const s=i===e;r.setAttribute("aria-selected",String(s)),r.setAttribute("tabindex",s?"0":"-1")}),this._tabs.forEach((r,i)=>{i===e?r.setAttribute("active",""):r.removeAttribute("active")})}}customElements.define("lv-tabs",Pl);const zl=`
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
`;class Ol extends R{static get observedAttributes(){return["prev","prev-label","next","next-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(zl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("prev")||"",e=this.getAttribute("prev-label")||"Previous",r=this.getAttribute("next")||"",i=this.getAttribute("next-label")||"Next",s=this.isRtl,a=s?"→":"←",o=s?"←":"→";this.render(`
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
    `)}}customElements.define("lv-nav",Ol);const Ll=`
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
`;class Nl extends R{static get observedAttributes(){return["vs"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ll),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("vs"),e=t!==null,r=t||"VS";e?this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${r}</div>
          <slot name="right"></slot>
        </div>
      `):this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `)}}customElements.define("lv-comparison",Nl);const Rl=`
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
`,Dl=`
  <div class="val"></div>
  <div class="label"></div>
`;class Fl extends R{constructor(){super(...arguments);O(this,"_observer",null)}static get observedAttributes(){return["value","label","prefix","suffix","color","animated"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(Rl),this.render(Dl),this._update(),this._setupObserver()}disconnectedCallback(){var e,r;(e=super.disconnectedCallback)==null||e.call(this),(r=this._observer)==null||r.disconnect(),this._observer=null}handleAttributeChange(e,r,i){this.root.querySelector(".val")&&this._update()}_update(){const e=this.getAttribute("color");e&&(this.style.setProperty("--_color",e),this.style.setProperty("--_glow",e));const r=this.root.querySelector(".label");r&&(r.textContent=this.getAttribute("label")||"");const i=this.root.querySelector(".val");if(i){const s=this.getAttribute("prefix")||"",a=this.getAttribute("suffix")||"",o=this.getAttribute("value")||"";i.textContent=s+o+a}}_setupObserver(){this.hasAttribute("animated")&&(this._observer=new IntersectionObserver(e=>{var r;for(const i of e)i.isIntersecting&&(this.animateIn(!1),(r=this._observer)==null||r.unobserve(this))},{threshold:.1}),this._observer.observe(this))}animateIn(e){if(!this.hasAttribute("animated")||e)return;const r=parseFloat(this.getAttribute("value")||"0");if(isNaN(r))return;const i=1200,s=performance.now(),a=this.root.querySelector(".val"),o=c=>{const l=Math.min((c-s)/i,1),u=1-Math.pow(1-l,3),h=r*u;a.textContent=(this.getAttribute("prefix")||"")+ds(h)+(this.getAttribute("suffix")||""),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}customElements.define("lv-metric",Fl);const ps={info:{color:"var(--lv-info, #3b82f6)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
    </svg>`}},Il=`
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
`;class ql extends R{static get observedAttributes(){return["type","title"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Il),this._render()}handleAttributeChange(t,e,r){this.root.querySelector(".callout")&&this._render()}_getType(){const t=this.getAttribute("type");return ps[t]?t:"info"}_render(){const t=this._getType(),e=ps[t],r=this.getAttribute("title")||"";this.style.setProperty("--_type-color",e.color),this.style.setProperty("--_type-bg",`color-mix(in srgb, ${e.color} 8%, transparent)`);const i=`
      <div class="callout" role="note">
        <div class="header">
          ${e.icon}
          ${r?`<span class="title">${r}</span>`:""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;this.render(i)}}customElements.define("lv-callout",ql);const Bl=`
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
`,Hl=`
  <span class="badge"><slot></slot></span>
`;class Vl extends R{static get observedAttributes(){return["color","variant"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Bl),this.render(Hl),this._updateColor()}handleAttributeChange(t,e,r){t==="color"&&this._updateColor()}_updateColor(){const t=this.getAttribute("color");t?this.style.setProperty("--_color",t):this.style.removeProperty("--_color")}}customElements.define("lv-badge",Vl);const Xl=`
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`,gs="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",Yl="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";let En=null;function Gl(){return window.katex?Promise.resolve():En||(En=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=gs,document.head.appendChild(e);const r=document.createElement("script");r.src=Yl,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load KaTeX")),document.head.appendChild(r)}),En)}class Ul extends R{constructor(){super(...arguments);O(this,"_source","")}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(Xl),this._render()}async _render(){try{await Gl();const e=this.hasAttribute("display"),r=window.katex.renderToString(this._source,{displayMode:e,throwOnError:!1});this.root.innerHTML=`<link rel="stylesheet" href="${gs}"><span class="katex-container">${r}</span>`}catch{this.root.innerHTML=`<span class="fallback">${this._escapeHtml(this._source)}</span>`}}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-math",Ul);const Wl=`
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
`,jl="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js",_s="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";let Pn=null;function Kl(){return window.hljs?Promise.resolve():Pn||(Pn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=_s,document.head.appendChild(e);const r=document.createElement("script");r.src=jl,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load highlight.js")),document.head.appendChild(r)}),Pn)}class Zl extends R{constructor(){super(...arguments);O(this,"_source","")}static get observedAttributes(){return["language","line-numbers"]}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(Wl),this._render()}async _render(){const e=this.getAttribute("language")||"",r=this.hasAttribute("line-numbers");let i;try{await Kl();const a=window.hljs;e&&a.getLanguage(e)?i=a.highlight(this._source,{language:e}).value:i=a.highlightAuto(this._source).value}catch{i=this._escapeHtml(this._source)}let s;r?s=i.split(`
`).map((o,c)=>`<span class="line-num">${c+1}</span>${o}`).join(`
`):s=i,this.root.innerHTML=`<link rel="stylesheet" href="${_s}"><div class="code-block"><pre><code>${s}</code></pre></div>`}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-code",Zl);const Ql=`
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
`;class Jl extends R{static get observedAttributes(){return["data","labels","highlight"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Ql),this._render()}handleAttributeChange(){this.root&&this._render()}_render(){var h;const t=this.jsonAttr("data",[]),e=this.jsonAttr("labels",{}),r=this.jsonAttr("highlight",[]);if(!t.length){this.root.innerHTML="";return}const i=t.length,s=((h=t[0])==null?void 0:h.length)||0,a=!!(e.rows&&e.rows.length),o=!!(e.cols&&e.cols.length),c=new Set(r.map(([f,d])=>`${f},${d}`)),l=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;let u='<div class="matrix-wrapper">';if(o){const f=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;u+=`<div class="col-labels" style="grid-template-columns: ${f}">`,a&&(u+="<span></span>");for(let d=0;d<s;d++)u+=`<span class="col-label">${this._escapeHtml(e.cols[d]||"")}</span>`;u+="</div>"}u+=`<div class="matrix" style="grid-template-columns: ${l}">`,u+='<div class="bracket-left"></div>',u+='<div class="bracket-right"></div>';for(let f=0;f<i;f++){a&&(u+=`<span class="row-label">${this._escapeHtml(e.rows[f]||"")}</span>`);for(let d=0;d<s;d++){const g=t[f][d],p=typeof g=="number"?this._formatNum(g):String(g),m=c.has(`${f},${d}`);u+=`<span class="cell${m?" highlight":""}">${p}</span>`}}u+="</div></div>",this.root.innerHTML=u}_formatNum(t){return t.toFixed(3).replace(/0$/,"")}_escapeHtml(t){const e=document.createElement("span");return e.textContent=t,e.innerHTML}}customElements.define("lv-matrix",Jl);const tc=`
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
`;class ec extends R{constructor(){super(...arguments);O(this,"_answered",!1)}static get observedAttributes(){return["question","options","correct","explanation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(tc),this._render(),this._attachListeners()}handleAttributeChange(){this._answered||(this._render(),this._attachListeners())}get _options(){return this.jsonAttr("options",[])}get _correctIndex(){return parseInt(this.getAttribute("correct")||"0",10)}_render(){const e=this.getAttribute("question")||"",r=this._options,i=this.getAttribute("explanation")||"",s=r.map((a,o)=>`
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");this.render(`
      <div class="question">${e}</div>
      <div class="options">${s}</div>
      ${i?`<div class="explanation"><div class="explanation-inner">${i}</div></div>`:""}
    `)}_attachListeners(){this.root.querySelectorAll(".option").forEach(r=>{r.addEventListener("click",()=>this._select(r)),r.addEventListener("keydown",i=>{const s=i.key;(s==="Enter"||s===" ")&&(i.preventDefault(),this._select(r))})})}_select(e){if(this._answered)return;this._answered=!0;const r=parseInt(e.dataset.index||"0",10),i=this._correctIndex,s=r===i;this.root.querySelectorAll(".option").forEach((c,l)=>{const u=c;u.removeAttribute("tabindex"),l===i?(u.classList.add("correct"),u.querySelector(".icon").textContent="✓"):l===r&&!s?(u.classList.add("wrong"),u.querySelector(".icon").textContent="✗"):u.classList.add("dimmed")});const o=this.root.querySelector(".explanation");o&&requestAnimationFrame(()=>o.classList.add("visible")),this.dispatchEvent(new CustomEvent("lv-quiz-answer",{bubbles:!0,composed:!0,detail:{correct:s,selected:r,answer:i}}))}}customElements.define("lv-quiz",ec);const nc=`
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
`;class rc extends R{constructor(){super(...arguments);O(this,"_revealed",!1)}static get observedAttributes(){return["label","revealed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(nc),this._render(),this._attachListeners(),this.hasAttribute("revealed")&&this._reveal(!1)}handleAttributeChange(e){if(e==="revealed"&&this.hasAttribute("revealed")&&!this._revealed&&this._reveal(!0),e==="label"){const r=this.root.querySelector(".trigger-label");r&&(r.textContent=this._label)}}get _label(){return this.getAttribute("label")||"اضغط للإظهار"}_render(){this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `)}_attachListeners(){const e=this.root.querySelector(".trigger");e.addEventListener("click",()=>this._reveal(!0)),e.addEventListener("keydown",r=>{const i=r.key;(i==="Enter"||i===" ")&&(r.preventDefault(),this._reveal(!0))})}_reveal(e){if(this._revealed)return;this._revealed=!0;const r=this.root.querySelector(".trigger"),i=this.root.querySelector(".content");r.setAttribute("aria-expanded","true"),e?(r.classList.add("hidden"),setTimeout(()=>i.classList.add("visible"),150)):(r.classList.add("hidden"),i.classList.add("visible"))}}customElements.define("lv-reveal",rc);const ic=`
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
`;class sc extends R{constructor(){super(...arguments);O(this,"_input",null);O(this,"_valueEl",null);O(this,"_popTimeout",null)}static get observedAttributes(){return["min","max","step","value","label","name","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ic),this._render(),this._bind(),this._updateTrack()}handleAttributeChange(){this._input&&(this._render(),this._bind(),this._updateTrack())}get _min(){return parseFloat(this.getAttribute("min")||"0")}get _max(){return parseFloat(this.getAttribute("max")||"100")}get _step(){return this.getAttribute("step")||"1"}get _value(){return this.getAttribute("value")||"50"}get _label(){return this.getAttribute("label")||""}get _name(){return this.getAttribute("name")||""}get _color(){return this.getAttribute("color")||""}_render(){const e=this._color?`--fill-color: ${this._color};`:"";this.render(`
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
    `),this._input=this.root.querySelector("input"),this._valueEl=this.root.querySelector(".value-display")}_bind(){this._input&&this._input.addEventListener("input",()=>{const e=this._input.value;this._valueEl&&(this._valueEl.textContent=e,this._valueEl.classList.add("pop"),this._popTimeout&&clearTimeout(this._popTimeout),this._popTimeout=window.setTimeout(()=>{var r;(r=this._valueEl)==null||r.classList.remove("pop")},150)),this._updateTrack(),this.dispatchEvent(new CustomEvent("lv-change",{bubbles:!0,composed:!0,detail:{name:this._name,value:parseFloat(e)}}))})}_updateTrack(){if(!this._input)return;const e=this._min,r=this._max,s=(parseFloat(this._input.value)-e)/(r-e)*100,o=`linear-gradient(to right, ${this._color||"var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;this._input.style.setProperty("--track-bg",o),this._input.style.background=o,this._input.style.borderRadius="9999px"}}customElements.define("lv-slider",sc);const ac=`
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
`;class oc extends R{static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ac),this._render(),this._bind()}_render(){this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `)}_bind(){this.addEventListener("lv-change",()=>{const t=this._collectParams();this.dispatchEvent(new CustomEvent("lv-params-change",{bubbles:!0,composed:!0,detail:t}))})}_collectParams(){const t=this.querySelectorAll('lv-slider[slot="controls"]'),e={};return t.forEach(r=>{var s;const i=r.getAttribute("name");if(i){const a=(s=r.root)==null?void 0:s.querySelector("input"),o=parseFloat(a?a.value:r.getAttribute("value")||"0");e[i]=o}}),e}}customElements.define("lv-playground",oc);const lc=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];function ms(n){return String(n).split("").map(t=>lc[parseInt(t)]??t).join("")}const cc=`
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
`;class uc extends R{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(cc),this._render()}handleAttributeChange(){this.root.querySelector(".title")&&this._render()}get _title(){return this.getAttribute("title")||""}_render(){this.render(`
      ${this._title?`<div class="title">${this._title}</div>`:""}
      <slot></slot>
    `)}}customElements.define("lv-step",uc);const hc=`
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
`;class fc extends R{constructor(){super(...arguments);O(this,"_current",0);O(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(hc),this._render(),requestAnimationFrame(()=>{this._steps=Array.from(this.querySelectorAll("lv-step")),this._showStep(0,null),this._bind()})}get _total(){return this._steps.length}_render(){this.render(`
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
    `)}_bind(){const e=this.root.querySelector(".prev"),r=this.root.querySelector(".next");e.addEventListener("click",()=>this._go(-1)),r.addEventListener("click",()=>this._go(1)),this.addEventListener("keydown",i=>{i.key==="ArrowRight"?(i.preventDefault(),this._go(this.isRtl?-1:1)):i.key==="ArrowLeft"&&(i.preventDefault(),this._go(this.isRtl?1:-1))}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_go(e){const r=this._current+e;r<0||r>=this._total||(this._current,this._current=r,this._showStep(r,e>0?"forward":"backward"))}_showStep(e,r){this._steps.forEach((o,c)=>{o.classList.remove("active","from-start","from-end"),c===e&&(o.classList.add("active"),r==="forward"?o.classList.add(this.isRtl?"from-start":"from-end"):r==="backward"&&o.classList.add(this.isRtl?"from-end":"from-start"))});const i=this.root.querySelector(".counter");i&&(i.textContent=`${ms(e+1)} / ${ms(this._total)}`);const s=this.root.querySelector(".prev"),a=this.root.querySelector(".next");s&&(s.disabled=e===0),a&&(a.disabled=e===this._total-1)}}customElements.define("lv-stepper",fc);const dc=["#00d4ff","#7b68ee","#00c853","#ff9800","#ff2d75","#ffd93d","#69f0ae","#ff6b9d"],pc=`
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
`;class gc extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","direction","sorted"]}get data(){return this._data}set data(e){if(typeof e=="string")try{this._data=JSON.parse(e)}catch{this._data=[]}else this._data=e;this._buildChart()}connectedCallback(){super.connectedCallback(),this.adoptStyles(pc),this._data=this.jsonAttr("data",[]),this._buildChart()}handleAttributeChange(e){e==="data"&&(this._data=this.jsonAttr("data",[])),this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;this.root.querySelectorAll(".bar-fill").forEach((i,s)=>{const a=i,o=a.dataset.width||"0%";a.classList.add("animate"),setTimeout(()=>{a.classList.remove("animate"),a.style.width=o},s*80+50)})}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||dc[e%8]}_buildChart(){const e=this.hasAttribute("sorted")?[...this._data].sort((s,a)=>a.value-s.value):[...this._data];if(!e.length){this.render('<div class="bar-list"></div>');return}const r=Math.max(...e.map(s=>s.value),.001),i=e.map((s,a)=>{const o=s.value/r*100,c=this._getColor(a,s),l=s.tagColor||c,u=typeof s.value=="number"?s.value%1?s.value.toFixed(2):s.value.toString():s.value;return`
        <div class="bar-item">
          <div class="bar-header">
            <span class="bar-label">${this._esc(s.label)}</span>
            <span class="bar-meta">
              <span class="bar-value" style="color:${c}">${u}</span>
              ${s.tag?`<span class="bar-tag" style="background:${l}22;color:${l}">${this._esc(s.tag)}</span>`:""}
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${this._hasAnimated?o:0}%;background:${c}" data-width="${o}%"></div>
          </div>
        </div>
      `}).join("");this.render(`<div class="bar-list">${i}</div>`),this._hasAnimated&&this.root.querySelectorAll(".bar-fill").forEach(s=>{const a=s;a.style.width=a.dataset.width||"0%"})}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-bar-chart",gc);function zn(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function _c(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Er(n){let t,e,r;n.length!==2?(t=zn,e=(o,c)=>zn(n(o),c),r=(o,c)=>n(o)-c):(t=n===zn||n===_c?n:mc,e=n,r=n);function i(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<0?l=h+1:u=h}while(l<u)}return l}function s(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function a(o,c,l=0,u=o.length){const h=i(o,c,l,u-1);return h>l&&r(o[h-1],c)>-r(o[h],c)?h-1:h}return{left:i,center:a,right:s}}function mc(){return 0}function vc(n){return n===null?NaN:+n}const xc=Er(zn).right;Er(vc).center;function On(n,t){let e,r;if(t===void 0)for(const i of n)i!=null&&(e===void 0?i>=i&&(e=r=i):(e>i&&(e=i),r<i&&(r=i)));else{let i=-1;for(let s of n)(s=t(s,++i,n))!=null&&(e===void 0?s>=s&&(e=r=s):(e>s&&(e=s),r<s&&(r=s)))}return[e,r]}const bc=Math.sqrt(50),yc=Math.sqrt(10),wc=Math.sqrt(2);function Ln(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),a=s>=bc?10:s>=yc?5:s>=wc?2:1;let o,c,l;return i<0?(l=Math.pow(10,-i)/a,o=Math.round(n*l),c=Math.round(t*l),o/l<n&&++o,c/l>t&&--c,l=-l):(l=Math.pow(10,i)*a,o=Math.round(n/l),c=Math.round(t/l),o*l<n&&++o,c*l>t&&--c),c<o&&.5<=e&&e<2?Ln(n,t,e*2):[o,c,l]}function kc(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,s,a]=r?Ln(t,n,e):Ln(n,t,e);if(!(s>=i))return[];const o=s-i+1,c=new Array(o);if(r)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(i+l)/-a;else for(let l=0;l<o;++l)c[l]=(i+l)*a;return c}function Pr(n,t,e){return t=+t,n=+n,e=+e,Ln(n,t,e)[2]}function Ac(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?Pr(t,n,e):Pr(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function vs(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function Cc(n,t){let e;for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);return e}function $c(n){return n}var zr=1,Or=2,Lr=3,je=4,xs=1e-6;function Sc(n){return"translate("+n+",0)"}function Tc(n){return"translate(0,"+n+")"}function Mc(n){return t=>+n(t)}function Ec(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function Pc(){return!this.__axis}function bs(n,t){var e=[],r=null,i=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===zr||n===je?-1:1,u=n===je||n===Or?"x":"y",h=n===zr||n===Lr?Sc:Tc;function f(d){var g=r??(t.ticks?t.ticks.apply(t,e):t.domain()),p=i??(t.tickFormat?t.tickFormat.apply(t,e):$c),m=Math.max(s,0)+o,b=t.range(),y=+b[0]+c,v=+b[b.length-1]+c,_=(t.bandwidth?Ec:Mc)(t.copy(),c),x=d.selection?d.selection():d,k=x.selectAll(".domain").data([null]),$=x.selectAll(".tick").data(g,t).order(),A=$.exit(),w=$.enter().append("g").attr("class","tick"),C=$.select("line"),T=$.select("text");k=k.merge(k.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),$=$.merge(w),C=C.merge(w.append("line").attr("stroke","currentColor").attr(u+"2",l*s)),T=T.merge(w.append("text").attr("fill","currentColor").attr(u,l*m).attr("dy",n===zr?"0em":n===Lr?"0.71em":"0.32em")),d!==x&&(k=k.transition(d),$=$.transition(d),C=C.transition(d),T=T.transition(d),A=A.transition(d).attr("opacity",xs).attr("transform",function(S){return isFinite(S=_(S))?h(S+c):this.getAttribute("transform")}),w.attr("opacity",xs).attr("transform",function(S){var M=this.parentNode.__axis;return h((M&&isFinite(M=M(S))?M:_(S))+c)})),A.remove(),k.attr("d",n===je||n===Or?a?"M"+l*a+","+y+"H"+c+"V"+v+"H"+l*a:"M"+c+","+y+"V"+v:a?"M"+y+","+l*a+"V"+c+"H"+v+"V"+l*a:"M"+y+","+c+"H"+v),$.attr("opacity",1).attr("transform",function(S){return h(_(S)+c)}),C.attr(u+"2",l*s),T.attr(u,l*m).text(p),x.filter(Pc).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===Or?"start":n===je?"end":"middle"),x.each(function(){this.__axis=_})}return f.scale=function(d){return arguments.length?(t=d,f):t},f.ticks=function(){return e=Array.from(arguments),f},f.tickArguments=function(d){return arguments.length?(e=d==null?[]:Array.from(d),f):e.slice()},f.tickValues=function(d){return arguments.length?(r=d==null?null:Array.from(d),f):r&&r.slice()},f.tickFormat=function(d){return arguments.length?(i=d,f):i},f.tickSize=function(d){return arguments.length?(s=a=+d,f):s},f.tickSizeInner=function(d){return arguments.length?(s=+d,f):s},f.tickSizeOuter=function(d){return arguments.length?(a=+d,f):a},f.tickPadding=function(d){return arguments.length?(o=+d,f):o},f.offset=function(d){return arguments.length?(c=+d,f):c},f}function Nn(n){return bs(Lr,n)}function Rn(n){return bs(je,n)}var zc={value:()=>{}};function Nr(){for(var n=0,t=arguments.length,e={},r;n<t;++n){if(!(r=arguments[n]+"")||r in e||/[\s.]/.test(r))throw new Error("illegal type: "+r);e[r]=[]}return new Dn(e)}function Dn(n){this._=n}function Oc(n,t){return n.trim().split(/^|\s+/).map(function(e){var r="",i=e.indexOf(".");if(i>=0&&(r=e.slice(i+1),e=e.slice(0,i)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:r}})}Dn.prototype=Nr.prototype={constructor:Dn,on:function(n,t){var e=this._,r=Oc(n+"",e),i,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((i=(n=r[s]).type)&&(i=Lc(e[i],n.name)))return i;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(i=(n=r[s]).type)e[i]=ys(e[i],n.name,t);else if(t==null)for(i in e)e[i]=ys(e[i],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Dn(n)},call:function(n,t){if((i=arguments.length-2)>0)for(var e=new Array(i),r=0,i,s;r<i;++r)e[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)}};function Lc(n,t){for(var e=0,r=n.length,i;e<r;++e)if((i=n[e]).name===t)return i.value}function ys(n,t,e){for(var r=0,i=n.length;r<i;++r)if(n[r].name===t){n[r]=zc,n=n.slice(0,r).concat(n.slice(r+1));break}return e!=null&&n.push({name:t,value:e}),n}var Rr="http://www.w3.org/1999/xhtml";const ws={svg:"http://www.w3.org/2000/svg",xhtml:Rr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Fn(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),ws.hasOwnProperty(t)?{space:ws[t],local:n}:n}function Nc(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Rr&&t.documentElement.namespaceURI===Rr?t.createElement(n):t.createElementNS(e,n)}}function Rc(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function ks(n){var t=Fn(n);return(t.local?Rc:Nc)(t)}function Dc(){}function Dr(n){return n==null?Dc:function(){return this.querySelector(n)}}function Fc(n){typeof n!="function"&&(n=Dr(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=new Array(a),c,l,u=0;u<a;++u)(c=s[u])&&(l=n.call(c,c.__data__,u,s))&&("__data__"in c&&(l.__data__=c.__data__),o[u]=l);return new mt(r,this._parents)}function Ic(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function qc(){return[]}function As(n){return n==null?qc:function(){return this.querySelectorAll(n)}}function Bc(n){return function(){return Ic(n.apply(this,arguments))}}function Hc(n){typeof n=="function"?n=Bc(n):n=As(n);for(var t=this._groups,e=t.length,r=[],i=[],s=0;s<e;++s)for(var a=t[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(r.push(n.call(c,c.__data__,l,a)),i.push(c));return new mt(r,i)}function Cs(n){return function(){return this.matches(n)}}function $s(n){return function(t){return t.matches(n)}}var Vc=Array.prototype.find;function Xc(n){return function(){return Vc.call(this.children,n)}}function Yc(){return this.firstElementChild}function Gc(n){return this.select(n==null?Yc:Xc(typeof n=="function"?n:$s(n)))}var Uc=Array.prototype.filter;function Wc(){return Array.from(this.children)}function jc(n){return function(){return Uc.call(this.children,n)}}function Kc(n){return this.selectAll(n==null?Wc:jc(typeof n=="function"?n:$s(n)))}function Zc(n){typeof n!="function"&&(n=Cs(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new mt(r,this._parents)}function Ss(n){return new Array(n.length)}function Qc(){return new mt(this._enter||this._groups.map(Ss),this._parents)}function In(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}In.prototype={constructor:In,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Jc(n){return function(){return n}}function tu(n,t,e,r,i,s){for(var a=0,o,c=t.length,l=s.length;a<l;++a)(o=t[a])?(o.__data__=s[a],r[a]=o):e[a]=new In(n,s[a]);for(;a<c;++a)(o=t[a])&&(i[a]=o)}function eu(n,t,e,r,i,s,a){var o,c,l=new Map,u=t.length,h=s.length,f=new Array(u),d;for(o=0;o<u;++o)(c=t[o])&&(f[o]=d=a.call(c,c.__data__,o,t)+"",l.has(d)?i[o]=c:l.set(d,c));for(o=0;o<h;++o)d=a.call(n,s[o],o,s)+"",(c=l.get(d))?(r[o]=c,c.__data__=s[o],l.delete(d)):e[o]=new In(n,s[o]);for(o=0;o<u;++o)(c=t[o])&&l.get(f[o])===c&&(i[o]=c)}function nu(n){return n.__data__}function ru(n,t){if(!arguments.length)return Array.from(this,nu);var e=t?eu:tu,r=this._parents,i=this._groups;typeof n!="function"&&(n=Jc(n));for(var s=i.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var u=r[l],h=i[l],f=h.length,d=iu(n.call(u,u&&u.__data__,l,r)),g=d.length,p=o[l]=new Array(g),m=a[l]=new Array(g),b=c[l]=new Array(f);e(u,h,p,m,b,d,t);for(var y=0,v=0,_,x;y<g;++y)if(_=p[y]){for(y>=v&&(v=y+1);!(x=m[v])&&++v<g;);_._next=x||null}}return a=new mt(a,r),a._enter=o,a._exit=c,a}function iu(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function su(){return new mt(this._exit||this._groups.map(Ss),this._parents)}function au(n,t,e){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),t!=null&&(i=t(i),i&&(i=i.selection())),e==null?s.remove():e(s),r&&i?r.merge(i).order():i}function ou(n){for(var t=n.selection?n.selection():n,e=this._groups,r=t._groups,i=e.length,s=r.length,a=Math.min(i,s),o=new Array(i),c=0;c<a;++c)for(var l=e[c],u=r[c],h=l.length,f=o[c]=new Array(h),d,g=0;g<h;++g)(d=l[g]||u[g])&&(f[g]=d);for(;c<i;++c)o[c]=e[c];return new mt(o,this._parents)}function lu(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var r=n[t],i=r.length-1,s=r[i],a;--i>=0;)(a=r[i])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function cu(n){n||(n=uu);function t(h,f){return h&&f?n(h.__data__,f.__data__):!h-!f}for(var e=this._groups,r=e.length,i=new Array(r),s=0;s<r;++s){for(var a=e[s],o=a.length,c=i[s]=new Array(o),l,u=0;u<o;++u)(l=a[u])&&(c[u]=l);c.sort(t)}return new mt(i,this._parents).order()}function uu(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function hu(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function fu(){return Array.from(this)}function du(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length;i<s;++i){var a=r[i];if(a)return a}return null}function pu(){let n=0;for(const t of this)++n;return n}function gu(){return!this.node()}function _u(n){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var i=t[e],s=0,a=i.length,o;s<a;++s)(o=i[s])&&n.call(o,o.__data__,s,i);return this}function mu(n){return function(){this.removeAttribute(n)}}function vu(n){return function(){this.removeAttributeNS(n.space,n.local)}}function xu(n,t){return function(){this.setAttribute(n,t)}}function bu(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function yu(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function wu(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function ku(n,t){var e=Fn(n);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((t==null?e.local?vu:mu:typeof t=="function"?e.local?wu:yu:e.local?bu:xu)(e,t))}function Ts(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function Au(n){return function(){this.style.removeProperty(n)}}function Cu(n,t,e){return function(){this.style.setProperty(n,t,e)}}function $u(n,t,e){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,e)}}function Su(n,t,e){return arguments.length>1?this.each((t==null?Au:typeof t=="function"?$u:Cu)(n,t,e??"")):Ce(this.node(),n)}function Ce(n,t){return n.style.getPropertyValue(t)||Ts(n).getComputedStyle(n,null).getPropertyValue(t)}function Tu(n){return function(){delete this[n]}}function Mu(n,t){return function(){this[n]=t}}function Eu(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function Pu(n,t){return arguments.length>1?this.each((t==null?Tu:typeof t=="function"?Eu:Mu)(n,t)):this.node()[n]}function Ms(n){return n.trim().split(/^|\s+/)}function Fr(n){return n.classList||new Es(n)}function Es(n){this._node=n,this._names=Ms(n.getAttribute("class")||"")}Es.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Ps(n,t){for(var e=Fr(n),r=-1,i=t.length;++r<i;)e.add(t[r])}function zs(n,t){for(var e=Fr(n),r=-1,i=t.length;++r<i;)e.remove(t[r])}function zu(n){return function(){Ps(this,n)}}function Ou(n){return function(){zs(this,n)}}function Lu(n,t){return function(){(t.apply(this,arguments)?Ps:zs)(this,n)}}function Nu(n,t){var e=Ms(n+"");if(arguments.length<2){for(var r=Fr(this.node()),i=-1,s=e.length;++i<s;)if(!r.contains(e[i]))return!1;return!0}return this.each((typeof t=="function"?Lu:t?zu:Ou)(e,t))}function Ru(){this.textContent=""}function Du(n){return function(){this.textContent=n}}function Fu(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function Iu(n){return arguments.length?this.each(n==null?Ru:(typeof n=="function"?Fu:Du)(n)):this.node().textContent}function qu(){this.innerHTML=""}function Bu(n){return function(){this.innerHTML=n}}function Hu(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function Vu(n){return arguments.length?this.each(n==null?qu:(typeof n=="function"?Hu:Bu)(n)):this.node().innerHTML}function Xu(){this.nextSibling&&this.parentNode.appendChild(this)}function Yu(){return this.each(Xu)}function Gu(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Uu(){return this.each(Gu)}function Wu(n){var t=typeof n=="function"?n:ks(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function ju(){return null}function Ku(n,t){var e=typeof n=="function"?n:ks(n),r=t==null?ju:typeof t=="function"?t:Dr(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function Zu(){var n=this.parentNode;n&&n.removeChild(this)}function Qu(){return this.each(Zu)}function Ju(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function th(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function eh(n){return this.select(n?th:Ju)}function nh(n){return arguments.length?this.property("__data__",n):this.node().__data__}function rh(n){return function(t){n.call(this,t,this.__data__)}}function ih(n){return n.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");return r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),{type:t,name:e}})}function sh(n){return function(){var t=this.__on;if(t){for(var e=0,r=-1,i=t.length,s;e<i;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++r]=s;++r?t.length=r:delete this.__on}}}function ah(n,t,e){return function(){var r=this.__on,i,s=rh(t);if(r){for(var a=0,o=r.length;a<o;++a)if((i=r[a]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=e),i.value=t;return}}this.addEventListener(n.type,s,e),i={type:n.type,name:n.name,value:t,listener:s,options:e},r?r.push(i):this.__on=[i]}}function oh(n,t,e){var r=ih(n+""),i,s=r.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,u;c<l;++c)for(i=0,u=o[c];i<s;++i)if((a=r[i]).type===u.type&&a.name===u.name)return u.value}return}for(o=t?ah:sh,i=0;i<s;++i)this.each(o(r[i],t,e));return this}function Os(n,t,e){var r=Ts(n),i=r.CustomEvent;typeof i=="function"?i=new i(t,e):(i=r.document.createEvent("Event"),e?(i.initEvent(t,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(t,!1,!1)),n.dispatchEvent(i)}function lh(n,t){return function(){return Os(this,n,t)}}function ch(n,t){return function(){return Os(this,n,t.apply(this,arguments))}}function uh(n,t){return this.each((typeof t=="function"?ch:lh)(n,t))}function*hh(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length,a;i<s;++i)(a=r[i])&&(yield a)}var Ls=[null];function mt(n,t){this._groups=n,this._parents=t}function Ke(){return new mt([[document.documentElement]],Ls)}function fh(){return this}mt.prototype=Ke.prototype={constructor:mt,select:Fc,selectAll:Hc,selectChild:Gc,selectChildren:Kc,filter:Zc,data:ru,enter:Qc,exit:su,join:au,merge:ou,selection:fh,order:lu,sort:cu,call:hu,nodes:fu,node:du,size:pu,empty:gu,each:_u,attr:ku,style:Su,property:Pu,classed:Nu,text:Iu,html:Vu,raise:Yu,lower:Uu,append:Wu,insert:Ku,remove:Qu,clone:eh,datum:nh,on:oh,dispatch:uh,[Symbol.iterator]:hh};function J(n){return typeof n=="string"?new mt([[document.querySelector(n)]],[document.documentElement]):new mt([[n]],Ls)}function dh(n){let t;for(;t=n.sourceEvent;)n=t;return n}function Ir(n,t){if(n=dh(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}}return[n.pageX,n.pageY]}const ph={passive:!1},Ze={capture:!0,passive:!1};function qr(n){n.stopImmediatePropagation()}function $e(n){n.preventDefault(),n.stopImmediatePropagation()}function gh(n){var t=n.document.documentElement,e=J(n).on("dragstart.drag",$e,Ze);"onselectstart"in t?e.on("selectstart.drag",$e,Ze):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function _h(n,t){var e=n.document.documentElement,r=J(n).on("dragstart.drag",null);t&&(r.on("click.drag",$e,Ze),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}const qn=n=>()=>n;function Br(n,{sourceEvent:t,subject:e,target:r,identifier:i,active:s,x:a,y:o,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:e,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}Br.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};function mh(n){return!n.ctrlKey&&!n.button}function vh(){return this.parentNode}function xh(n,t){return t??{x:n.x,y:n.y}}function bh(){return navigator.maxTouchPoints||"ontouchstart"in this}function yh(){var n=mh,t=vh,e=xh,r=bh,i={},s=Nr("start","drag","end"),a=0,o,c,l,u,h=0;function f(_){_.on("mousedown.drag",d).filter(r).on("touchstart.drag",m).on("touchmove.drag",b,ph).on("touchend.drag touchcancel.drag",y).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(_,x){if(!(u||!n.call(this,_,x))){var k=v(this,t.call(this,_,x),_,x,"mouse");k&&(J(_.view).on("mousemove.drag",g,Ze).on("mouseup.drag",p,Ze),gh(_.view),qr(_),l=!1,o=_.clientX,c=_.clientY,k("start",_))}}function g(_){if($e(_),!l){var x=_.clientX-o,k=_.clientY-c;l=x*x+k*k>h}i.mouse("drag",_)}function p(_){J(_.view).on("mousemove.drag mouseup.drag",null),_h(_.view,l),$e(_),i.mouse("end",_)}function m(_,x){if(n.call(this,_,x)){var k=_.changedTouches,$=t.call(this,_,x),A=k.length,w,C;for(w=0;w<A;++w)(C=v(this,$,_,x,k[w].identifier,k[w]))&&(qr(_),C("start",_,k[w]))}}function b(_){var x=_.changedTouches,k=x.length,$,A;for($=0;$<k;++$)(A=i[x[$].identifier])&&($e(_),A("drag",_,x[$]))}function y(_){var x=_.changedTouches,k=x.length,$,A;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),$=0;$<k;++$)(A=i[x[$].identifier])&&(qr(_),A("end",_,x[$]))}function v(_,x,k,$,A,w){var C=s.copy(),T=Ir(w||k,x),S,M,E;if((E=e.call(_,new Br("beforestart",{sourceEvent:k,target:f,identifier:A,active:a,x:T[0],y:T[1],dx:0,dy:0,dispatch:C}),$))!=null)return S=E.x-T[0]||0,M=E.y-T[1]||0,function P(z,L,I){var X=T,q;switch(z){case"start":i[A]=P,q=a++;break;case"end":delete i[A],--a;case"drag":T=Ir(I||L,x),q=a;break}C.call(z,_,new Br(z,{sourceEvent:L,subject:E,target:f,identifier:A,active:q,x:T[0]+S,y:T[1]+M,dx:T[0]-X[0],dy:T[1]-X[1],dispatch:C}),$)}}return f.filter=function(_){return arguments.length?(n=typeof _=="function"?_:qn(!!_),f):n},f.container=function(_){return arguments.length?(t=typeof _=="function"?_:qn(_),f):t},f.subject=function(_){return arguments.length?(e=typeof _=="function"?_:qn(_),f):e},f.touchable=function(_){return arguments.length?(r=typeof _=="function"?_:qn(!!_),f):r},f.on=function(){var _=s.on.apply(s,arguments);return _===s?f:_},f.clickDistance=function(_){return arguments.length?(h=(_=+_)*_,f):Math.sqrt(h)},f}function Hr(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function Ns(n,t){var e=Object.create(n.prototype);for(var r in t)e[r]=t[r];return e}function Qe(){}var Je=.7,Bn=1/Je,Se="\\s*([+-]?\\d+)\\s*",tn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",wh=/^#([0-9a-f]{3,8})$/,kh=new RegExp(`^rgb\\(${Se},${Se},${Se}\\)$`),Ah=new RegExp(`^rgb\\(${Lt},${Lt},${Lt}\\)$`),Ch=new RegExp(`^rgba\\(${Se},${Se},${Se},${tn}\\)$`),$h=new RegExp(`^rgba\\(${Lt},${Lt},${Lt},${tn}\\)$`),Sh=new RegExp(`^hsl\\(${tn},${Lt},${Lt}\\)$`),Th=new RegExp(`^hsla\\(${tn},${Lt},${Lt},${tn}\\)$`),Rs={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Hr(Qe,jt,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Ds,formatHex:Ds,formatHex8:Mh,formatHsl:Eh,formatRgb:Fs,toString:Fs});function Ds(){return this.rgb().formatHex()}function Mh(){return this.rgb().formatHex8()}function Eh(){return Vs(this).formatHsl()}function Fs(){return this.rgb().formatRgb()}function jt(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=wh.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?Is(t):e===3?new ut(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Hn(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Hn(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=kh.exec(n))?new ut(t[1],t[2],t[3],1):(t=Ah.exec(n))?new ut(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Ch.exec(n))?Hn(t[1],t[2],t[3],t[4]):(t=$h.exec(n))?Hn(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Sh.exec(n))?Hs(t[1],t[2]/100,t[3]/100,1):(t=Th.exec(n))?Hs(t[1],t[2]/100,t[3]/100,t[4]):Rs.hasOwnProperty(n)?Is(Rs[n]):n==="transparent"?new ut(NaN,NaN,NaN,0):null}function Is(n){return new ut(n>>16&255,n>>8&255,n&255,1)}function Hn(n,t,e,r){return r<=0&&(n=t=e=NaN),new ut(n,t,e,r)}function Ph(n){return n instanceof Qe||(n=jt(n)),n?(n=n.rgb(),new ut(n.r,n.g,n.b,n.opacity)):new ut}function Vn(n,t,e,r){return arguments.length===1?Ph(n):new ut(n,t,e,r??1)}function ut(n,t,e,r){this.r=+n,this.g=+t,this.b=+e,this.opacity=+r}Hr(ut,Vn,Ns(Qe,{brighter(n){return n=n==null?Bn:Math.pow(Bn,n),new ut(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Je:Math.pow(Je,n),new ut(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new ut(oe(this.r),oe(this.g),oe(this.b),Xn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:qs,formatHex:qs,formatHex8:zh,formatRgb:Bs,toString:Bs}));function qs(){return`#${le(this.r)}${le(this.g)}${le(this.b)}`}function zh(){return`#${le(this.r)}${le(this.g)}${le(this.b)}${le((isNaN(this.opacity)?1:this.opacity)*255)}`}function Bs(){const n=Xn(this.opacity);return`${n===1?"rgb(":"rgba("}${oe(this.r)}, ${oe(this.g)}, ${oe(this.b)}${n===1?")":`, ${n})`}`}function Xn(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function oe(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function le(n){return n=oe(n),(n<16?"0":"")+n.toString(16)}function Hs(n,t,e,r){return r<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new Et(n,t,e,r)}function Vs(n){if(n instanceof Et)return new Et(n.h,n.s,n.l,n.opacity);if(n instanceof Qe||(n=jt(n)),!n)return new Et;if(n instanceof Et)return n;n=n.rgb();var t=n.r/255,e=n.g/255,r=n.b/255,i=Math.min(t,e,r),s=Math.max(t,e,r),a=NaN,o=s-i,c=(s+i)/2;return o?(t===s?a=(e-r)/o+(e<r)*6:e===s?a=(r-t)/o+2:a=(t-e)/o+4,o/=c<.5?s+i:2-s-i,a*=60):o=c>0&&c<1?0:a,new Et(a,o,c,n.opacity)}function Oh(n,t,e,r){return arguments.length===1?Vs(n):new Et(n,t,e,r??1)}function Et(n,t,e,r){this.h=+n,this.s=+t,this.l=+e,this.opacity=+r}Hr(Et,Oh,Ns(Qe,{brighter(n){return n=n==null?Bn:Math.pow(Bn,n),new Et(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Je:Math.pow(Je,n),new Et(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*t,i=2*e-r;return new ut(Vr(n>=240?n-240:n+120,i,r),Vr(n,i,r),Vr(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new Et(Xs(this.h),Yn(this.s),Yn(this.l),Xn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Xn(this.opacity);return`${n===1?"hsl(":"hsla("}${Xs(this.h)}, ${Yn(this.s)*100}%, ${Yn(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Xs(n){return n=(n||0)%360,n<0?n+360:n}function Yn(n){return Math.max(0,Math.min(1,n||0))}function Vr(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}function Lh(n,t,e,r,i){var s=n*n,a=s*n;return((1-3*n+3*s-a)*t+(4-6*s+3*a)*e+(1+3*n+3*s-3*a)*r+a*i)/6}function Nh(n){var t=n.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,t-1):Math.floor(e*t),i=n[r],s=n[r+1],a=r>0?n[r-1]:2*i-s,o=r<t-1?n[r+2]:2*s-i;return Lh((e-r/t)*t,a,i,s,o)}}const Xr=n=>()=>n;function Rh(n,t){return function(e){return n+e*t}}function Dh(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(r){return Math.pow(n+r*t,e)}}function Fh(n){return(n=+n)==1?Ys:function(t,e){return e-t?Dh(t,e,n):Xr(isNaN(t)?e:t)}}function Ys(n,t){var e=t-n;return e?Rh(n,e):Xr(isNaN(n)?t:n)}const Gn=(function n(t){var e=Fh(t);function r(i,s){var a=e((i=Vn(i)).r,(s=Vn(s)).r),o=e(i.g,s.g),c=e(i.b,s.b),l=Ys(i.opacity,s.opacity);return function(u){return i.r=a(u),i.g=o(u),i.b=c(u),i.opacity=l(u),i+""}}return r.gamma=n,r})(1);function Ih(n){return function(t){var e=t.length,r=new Array(e),i=new Array(e),s=new Array(e),a,o;for(a=0;a<e;++a)o=Vn(t[a]),r[a]=o.r||0,i[a]=o.g||0,s[a]=o.b||0;return r=n(r),i=n(i),s=n(s),o.opacity=1,function(c){return o.r=r(c),o.g=i(c),o.b=s(c),o+""}}}var qh=Ih(Nh);function Bh(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(s){for(i=0;i<e;++i)r[i]=n[i]*(1-s)+t[i]*s;return r}}function Hh(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Vh(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),s=new Array(e),a;for(a=0;a<r;++a)i[a]=ce(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<r;++a)s[a]=i[a](o);return s}}function Xh(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function Pt(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function Yh(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=ce(n[i],t[i]):r[i]=t[i];return function(s){for(i in e)r[i]=e[i](s);return r}}var Yr=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Gr=new RegExp(Yr.source,"g");function Gh(n){return function(){return n}}function Uh(n){return function(t){return n(t)+""}}function Gs(n,t){var e=Yr.lastIndex=Gr.lastIndex=0,r,i,s,a=-1,o=[],c=[];for(n=n+"",t=t+"";(r=Yr.exec(n))&&(i=Gr.exec(t));)(s=i.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(r=r[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,c.push({i:a,x:Pt(r,i)})),e=Gr.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?Uh(c[0].x):Gh(t):(t=c.length,function(l){for(var u=0,h;u<t;++u)o[(h=c[u]).i]=h.x(l);return o.join("")})}function ce(n,t){var e=typeof t,r;return t==null||e==="boolean"?Xr(t):(e==="number"?Pt:e==="string"?(r=jt(t))?(t=r,Gn):Gs:t instanceof jt?Gn:t instanceof Date?Xh:Hh(t)?Bh:Array.isArray(t)?Vh:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Yh:Pt)(n,t)}function Ur(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var Us=180/Math.PI,Wr={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ws(n,t,e,r,i,s){var a,o,c;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(c=n*e+t*r)&&(e-=n*c,r-=t*c),(o=Math.sqrt(e*e+r*r))&&(e/=o,r/=o,c/=o),n*r<t*e&&(n=-n,t=-t,c=-c,a=-a),{translateX:i,translateY:s,rotate:Math.atan2(t,n)*Us,skewX:Math.atan(c)*Us,scaleX:a,scaleY:o}}var Un;function Wh(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?Wr:Ws(t.a,t.b,t.c,t.d,t.e,t.f)}function jh(n){return n==null||(Un||(Un=document.createElementNS("http://www.w3.org/2000/svg","g")),Un.setAttribute("transform",n),!(n=Un.transform.baseVal.consolidate()))?Wr:(n=n.matrix,Ws(n.a,n.b,n.c,n.d,n.e,n.f))}function js(n,t,e,r){function i(l){return l.length?l.pop()+" ":""}function s(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push("translate(",null,t,null,e);g.push({i:p-4,x:Pt(l,h)},{i:p-2,x:Pt(u,f)})}else(h||f)&&d.push("translate("+h+t+f+e)}function a(l,u,h,f){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),f.push({i:h.push(i(h)+"rotate(",null,r)-2,x:Pt(l,u)})):u&&h.push(i(h)+"rotate("+u+r)}function o(l,u,h,f){l!==u?f.push({i:h.push(i(h)+"skewX(",null,r)-2,x:Pt(l,u)}):u&&h.push(i(h)+"skewX("+u+r)}function c(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push(i(d)+"scale(",null,",",null,")");g.push({i:p-4,x:Pt(l,h)},{i:p-2,x:Pt(u,f)})}else(h!==1||f!==1)&&d.push(i(d)+"scale("+h+","+f+")")}return function(l,u){var h=[],f=[];return l=n(l),u=n(u),s(l.translateX,l.translateY,u.translateX,u.translateY,h,f),a(l.rotate,u.rotate,h,f),o(l.skewX,u.skewX,h,f),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,h,f),l=u=null,function(d){for(var g=-1,p=f.length,m;++g<p;)h[(m=f[g]).i]=m.x(d);return h.join("")}}}var Kh=js(Wh,"px, ","px)","deg)"),Zh=js(jh,", ",")",")");function Qh(n,t){t===void 0&&(t=n,n=ce);for(var e=0,r=t.length-1,i=t[0],s=new Array(r<0?0:r);e<r;)s[e]=n(i,i=t[++e]);return function(a){var o=Math.max(0,Math.min(r-1,Math.floor(a*=r)));return s[o](a-o)}}var Te=0,en=0,nn=0,Ks=1e3,Wn,rn,jn=0,ue=0,Kn=0,sn=typeof performance=="object"&&performance.now?performance:Date,Zs=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function jr(){return ue||(Zs(Jh),ue=sn.now()+Kn)}function Jh(){ue=0}function Zn(){this._call=this._time=this._next=null}Zn.prototype=Qs.prototype={constructor:Zn,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?jr():+e)+(t==null?0:+t),!this._next&&rn!==this&&(rn?rn._next=this:Wn=this,rn=this),this._call=n,this._time=e,Kr()},stop:function(){this._call&&(this._call=null,this._time=1/0,Kr())}};function Qs(n,t,e){var r=new Zn;return r.restart(n,t,e),r}function tf(){jr(),++Te;for(var n=Wn,t;n;)(t=ue-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Te}function Js(){ue=(jn=sn.now())+Kn,Te=en=0;try{tf()}finally{Te=0,nf(),ue=0}}function ef(){var n=sn.now(),t=n-jn;t>Ks&&(Kn-=t,jn=n)}function nf(){for(var n,t=Wn,e,r=1/0;t;)t._call?(r>t._time&&(r=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:Wn=e);rn=n,Kr(r)}function Kr(n){if(!Te){en&&(en=clearTimeout(en));var t=n-ue;t>24?(n<1/0&&(en=setTimeout(Js,n-sn.now()-Kn)),nn&&(nn=clearInterval(nn))):(nn||(jn=sn.now(),nn=setInterval(ef,Ks)),Te=1,Zs(Js))}}function ta(n,t,e){var r=new Zn;return t=t==null?0:+t,r.restart(i=>{r.stop(),n(i+t)},t,e),r}var rf=Nr("start","end","cancel","interrupt"),sf=[],ea=0,na=1,Zr=2,Qn=3,ra=4,Qr=5,Jn=6;function tr(n,t,e,r,i,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;af(n,e,{name:t,index:r,group:i,on:rf,tween:sf,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:ea})}function Jr(n,t){var e=zt(n,t);if(e.state>ea)throw new Error("too late; already scheduled");return e}function Nt(n,t){var e=zt(n,t);if(e.state>Qn)throw new Error("too late; already running");return e}function zt(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function af(n,t,e){var r=n.__transition,i;r[t]=e,e.timer=Qs(s,0,e.time);function s(l){e.state=na,e.timer.restart(a,e.delay,e.time),e.delay<=l&&a(l-e.delay)}function a(l){var u,h,f,d;if(e.state!==na)return c();for(u in r)if(d=r[u],d.name===e.name){if(d.state===Qn)return ta(a);d.state===ra?(d.state=Jn,d.timer.stop(),d.on.call("interrupt",n,n.__data__,d.index,d.group),delete r[u]):+u<t&&(d.state=Jn,d.timer.stop(),d.on.call("cancel",n,n.__data__,d.index,d.group),delete r[u])}if(ta(function(){e.state===Qn&&(e.state=ra,e.timer.restart(o,e.delay,e.time),o(l))}),e.state=Zr,e.on.call("start",n,n.__data__,e.index,e.group),e.state===Zr){for(e.state=Qn,i=new Array(f=e.tween.length),u=0,h=-1;u<f;++u)(d=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(i[++h]=d);i.length=h+1}}function o(l){for(var u=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(c),e.state=Qr,1),h=-1,f=i.length;++h<f;)i[h].call(n,u);e.state===Qr&&(e.on.call("end",n,n.__data__,e.index,e.group),c())}function c(){e.state=Jn,e.timer.stop(),delete r[t];for(var l in r)return;delete n.__transition}}function of(n,t){var e=n.__transition,r,i,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((r=e[a]).name!==t){s=!1;continue}i=r.state>Zr&&r.state<Qr,r.state=Jn,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete e[a]}s&&delete n.__transition}}function lf(n){return this.each(function(){of(this,n)})}function cf(n,t){var e,r;return function(){var i=Nt(this,n),s=i.tween;if(s!==e){r=e=s;for(var a=0,o=r.length;a<o;++a)if(r[a].name===t){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function uf(n,t,e){var r,i;if(typeof e!="function")throw new Error;return function(){var s=Nt(this,n),a=s.tween;if(a!==r){i=(r=a).slice();for(var o={name:t,value:e},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=o;break}c===l&&i.push(o)}s.tween=i}}function hf(n,t){var e=this._id;if(n+="",arguments.length<2){for(var r=zt(this.node(),e).tween,i=0,s=r.length,a;i<s;++i)if((a=r[i]).name===n)return a.value;return null}return this.each((t==null?cf:uf)(e,n,t))}function ti(n,t,e){var r=n._id;return n.each(function(){var i=Nt(this,r);(i.value||(i.value={}))[t]=e.apply(this,arguments)}),function(i){return zt(i,r).value[t]}}function ia(n,t){var e;return(typeof t=="number"?Pt:t instanceof jt?Gn:(e=jt(t))?(t=e,Gn):Gs)(n,t)}function ff(n){return function(){this.removeAttribute(n)}}function df(n){return function(){this.removeAttributeNS(n.space,n.local)}}function pf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttribute(n);return a===i?null:a===r?s:s=t(r=a,e)}}function gf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===i?null:a===r?s:s=t(r=a,e)}}function _f(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function mf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function vf(n,t){var e=Fn(n),r=e==="transform"?Zh:ia;return this.attrTween(n,typeof t=="function"?(e.local?mf:_f)(e,r,ti(this,"attr."+n,t)):t==null?(e.local?df:ff)(e):(e.local?gf:pf)(e,r,t))}function xf(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function bf(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function yf(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&bf(n,s)),e}return i._value=t,i}function wf(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&xf(n,s)),e}return i._value=t,i}function kf(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var r=Fn(n);return this.tween(e,(r.local?yf:wf)(r,t))}function Af(n,t){return function(){Jr(this,n).delay=+t.apply(this,arguments)}}function Cf(n,t){return t=+t,function(){Jr(this,n).delay=t}}function $f(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?Af:Cf)(t,n)):zt(this.node(),t).delay}function Sf(n,t){return function(){Nt(this,n).duration=+t.apply(this,arguments)}}function Tf(n,t){return t=+t,function(){Nt(this,n).duration=t}}function Mf(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?Sf:Tf)(t,n)):zt(this.node(),t).duration}function Ef(n,t){if(typeof t!="function")throw new Error;return function(){Nt(this,n).ease=t}}function Pf(n){var t=this._id;return arguments.length?this.each(Ef(t,n)):zt(this.node(),t).ease}function zf(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;Nt(this,n).ease=e}}function Of(n){if(typeof n!="function")throw new Error;return this.each(zf(this._id,n))}function Lf(n){typeof n!="function"&&(n=Cs(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Ht(r,this._parents,this._name,this._id)}function Nf(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,r=t.length,i=e.length,s=Math.min(r,i),a=new Array(r),o=0;o<s;++o)for(var c=t[o],l=e[o],u=c.length,h=a[o]=new Array(u),f,d=0;d<u;++d)(f=c[d]||l[d])&&(h[d]=f);for(;o<r;++o)a[o]=t[o];return new Ht(a,this._parents,this._name,this._id)}function Rf(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function Df(n,t,e){var r,i,s=Rf(t)?Jr:Nt;return function(){var a=s(this,n),o=a.on;o!==r&&(i=(r=o).copy()).on(t,e),a.on=i}}function Ff(n,t){var e=this._id;return arguments.length<2?zt(this.node(),e).on.on(n):this.each(Df(e,n,t))}function If(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function qf(){return this.on("end.remove",If(this._id))}function Bf(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Dr(n));for(var r=this._groups,i=r.length,s=new Array(i),a=0;a<i;++a)for(var o=r[a],c=o.length,l=s[a]=new Array(c),u,h,f=0;f<c;++f)(u=o[f])&&(h=n.call(u,u.__data__,f,o))&&("__data__"in u&&(h.__data__=u.__data__),l[f]=h,tr(l[f],t,e,f,l,zt(u,e)));return new Ht(s,this._parents,t,e)}function Hf(n){var t=this._name,e=this._id;typeof n!="function"&&(n=As(n));for(var r=this._groups,i=r.length,s=[],a=[],o=0;o<i;++o)for(var c=r[o],l=c.length,u,h=0;h<l;++h)if(u=c[h]){for(var f=n.call(u,u.__data__,h,c),d,g=zt(u,e),p=0,m=f.length;p<m;++p)(d=f[p])&&tr(d,t,e,p,f,g);s.push(f),a.push(u)}return new Ht(s,a,t,e)}var Vf=Ke.prototype.constructor;function Xf(){return new Vf(this._groups,this._parents)}function Yf(n,t){var e,r,i;return function(){var s=Ce(this,n),a=(this.style.removeProperty(n),Ce(this,n));return s===a?null:s===e&&a===r?i:i=t(e=s,r=a)}}function sa(n){return function(){this.style.removeProperty(n)}}function Gf(n,t,e){var r,i=e+"",s;return function(){var a=Ce(this,n);return a===i?null:a===r?s:s=t(r=a,e)}}function Uf(n,t,e){var r,i,s;return function(){var a=Ce(this,n),o=e(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(n),Ce(this,n))),a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o))}}function Wf(n,t){var e,r,i,s="style."+t,a="end."+s,o;return function(){var c=Nt(this,n),l=c.on,u=c.value[s]==null?o||(o=sa(t)):void 0;(l!==e||i!==u)&&(r=(e=l).copy()).on(a,i=u),c.on=r}}function jf(n,t,e){var r=(n+="")=="transform"?Kh:ia;return t==null?this.styleTween(n,Yf(n,r)).on("end.style."+n,sa(n)):typeof t=="function"?this.styleTween(n,Uf(n,r,ti(this,"style."+n,t))).each(Wf(this._id,n)):this.styleTween(n,Gf(n,r,t),e).on("end.style."+n,null)}function Kf(n,t,e){return function(r){this.style.setProperty(n,t.call(this,r),e)}}function Zf(n,t,e){var r,i;function s(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Kf(n,a,e)),r}return s._value=t,s}function Qf(n,t,e){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,Zf(n,t,e??""))}function Jf(n){return function(){this.textContent=n}}function td(n){return function(){var t=n(this);this.textContent=t??""}}function ed(n){return this.tween("text",typeof n=="function"?td(ti(this,"text",n)):Jf(n==null?"":n+""))}function nd(n){return function(t){this.textContent=n.call(this,t)}}function rd(n){var t,e;function r(){var i=n.apply(this,arguments);return i!==e&&(t=(e=i)&&nd(i)),t}return r._value=n,r}function id(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,rd(n))}function sd(){for(var n=this._name,t=this._id,e=aa(),r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var u=zt(c,t);tr(c,n,e,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Ht(r,this._parents,n,e)}function ad(){var n,t,e=this,r=e._id,i=e.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--i===0&&s()}};e.each(function(){var l=Nt(this,r),u=l.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(c)),l.on=t}),i===0&&s()})}var od=0;function Ht(n,t,e,r){this._groups=n,this._parents=t,this._name=e,this._id=r}function aa(){return++od}var Vt=Ke.prototype;Ht.prototype={constructor:Ht,select:Bf,selectAll:Hf,selectChild:Vt.selectChild,selectChildren:Vt.selectChildren,filter:Lf,merge:Nf,selection:Xf,transition:sd,call:Vt.call,nodes:Vt.nodes,node:Vt.node,size:Vt.size,empty:Vt.empty,each:Vt.each,on:Ff,attr:vf,attrTween:kf,style:jf,styleTween:Qf,text:ed,textTween:id,remove:qf,tween:hf,delay:$f,duration:Mf,ease:Pf,easeVarying:Of,end:ad,[Symbol.iterator]:Vt[Symbol.iterator]};function an(n){return n*(2-n)}function ld(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var ei=1.70158;(function n(t){t=+t;function e(r){return(r=+r)*r*(t*(r-1)+r)}return e.overshoot=n,e})(ei);var cd=(function n(t){t=+t;function e(r){return--r*r*((r+1)*t+r)+1}return e.overshoot=n,e})(ei);(function n(t){t=+t;function e(r){return((r*=2)<1?r*r*((t+1)*r-t):(r-=2)*r*((t+1)*r+t)+2)/2}return e.overshoot=n,e})(ei);var ud={time:null,delay:0,duration:250,ease:ld};function hd(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function fd(n){var t,e;n instanceof Ht?(t=n._id,n=n._name):(t=aa(),(e=ud).time=jr(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&tr(c,n,t,l,a,e||hd(c,t));return new Ht(r,this._parents,n,t)}Ke.prototype.interrupt=lf,Ke.prototype.transition=fd;const ni=Math.PI,ri=2*ni,he=1e-6,dd=ri-he;function oa(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function pd(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return oa;const e=10**t;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}class gd{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?oa:pd(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,s,a){this._append`C${+t},${+e},${+r},${+i},${this._x1=+s},${this._y1=+a}`}arcTo(t,e,r,i,s){if(t=+t,e=+e,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,c=r-t,l=i-e,u=a-t,h=o-e,f=u*u+h*h;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(f>he)if(!(Math.abs(h*c-l*u)>he)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let d=r-a,g=i-o,p=c*c+l*l,m=d*d+g*g,b=Math.sqrt(p),y=Math.sqrt(f),v=s*Math.tan((ni-Math.acos((p+f-m)/(2*b*y)))/2),_=v/y,x=v/b;Math.abs(_-1)>he&&this._append`L${t+_*u},${e+_*h}`,this._append`A${s},${s},0,0,${+(h*d>u*g)},${this._x1=t+x*c},${this._y1=e+x*l}`}}arc(t,e,r,i,s,a){if(t=+t,e=+e,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let o=r*Math.cos(i),c=r*Math.sin(i),l=t+o,u=e+c,h=1^a,f=a?i-s:s-i;this._x1===null?this._append`M${l},${u}`:(Math.abs(this._x1-l)>he||Math.abs(this._y1-u)>he)&&this._append`L${l},${u}`,r&&(f<0&&(f=f%ri+ri),f>dd?this._append`A${r},${r},0,1,${h},${t-o},${e-c}A${r},${r},0,1,${h},${this._x1=l},${this._y1=u}`:f>he&&this._append`A${r},${r},0,${+(f>=ni)},${h},${this._x1=t+r*Math.cos(s)},${this._y1=e+r*Math.sin(s)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function _d(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function er(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function Me(n){return n=er(Math.abs(n)),n?n[1]:NaN}function md(n,t){return function(e,r){for(var i=e.length,s=[],a=0,o=n[0],c=0;i>0&&o>0&&(c+o+1>r&&(o=Math.max(1,r-c)),s.push(e.substring(i-=o,i+o)),!((c+=o+1)>r));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function vd(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var xd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function nr(n){if(!(t=xd.exec(n)))throw new Error("invalid format: "+n);var t;return new ii({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}nr.prototype=ii.prototype;function ii(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}ii.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function bd(n){t:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break t;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var rr;function yd(n,t){var e=er(n,t);if(!e)return rr=void 0,n.toPrecision(t);var r=e[0],i=e[1],s=i-(rr=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return s===a?r:s>a?r+new Array(s-a+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+er(n,Math.max(0,t+s-1))[0]}function la(n,t){var e=er(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const ca={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:_d,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>la(n*100,t),r:la,s:yd,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function ua(n){return n}var ha=Array.prototype.map,fa=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function wd(n){var t=n.grouping===void 0||n.thousands===void 0?ua:md(ha.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?ua:vd(ha.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(h,f){h=nr(h);var d=h.fill,g=h.align,p=h.sign,m=h.symbol,b=h.zero,y=h.width,v=h.comma,_=h.precision,x=h.trim,k=h.type;k==="n"?(v=!0,k="g"):ca[k]||(_===void 0&&(_=12),x=!0,k="g"),(b||d==="0"&&g==="=")&&(b=!0,d="0",g="=");var $=(f&&f.prefix!==void 0?f.prefix:"")+(m==="$"?e:m==="#"&&/[boxX]/.test(k)?"0"+k.toLowerCase():""),A=(m==="$"?r:/[%p]/.test(k)?a:"")+(f&&f.suffix!==void 0?f.suffix:""),w=ca[k],C=/[defgprs%]/.test(k);_=_===void 0?6:/[gprs]/.test(k)?Math.max(1,Math.min(21,_)):Math.max(0,Math.min(20,_));function T(S){var M=$,E=A,P,z,L;if(k==="c")E=w(S)+E,S="";else{S=+S;var I=S<0||1/S<0;if(S=isNaN(S)?c:w(Math.abs(S),_),x&&(S=bd(S)),I&&+S==0&&p!=="+"&&(I=!1),M=(I?p==="("?p:o:p==="-"||p==="("?"":p)+M,E=(k==="s"&&!isNaN(S)&&rr!==void 0?fa[8+rr/3]:"")+E+(I&&p==="("?")":""),C){for(P=-1,z=S.length;++P<z;)if(L=S.charCodeAt(P),48>L||L>57){E=(L===46?i+S.slice(P+1):S.slice(P))+E,S=S.slice(0,P);break}}}v&&!b&&(S=t(S,1/0));var X=M.length+S.length+E.length,q=X<y?new Array(y-X+1).join(d):"";switch(v&&b&&(S=t(q+S,q.length?y-E.length:1/0),q=""),g){case"<":S=M+S+E+q;break;case"=":S=M+q+S+E;break;case"^":S=q.slice(0,X=q.length>>1)+M+S+E+q.slice(X);break;default:S=q+M+S+E;break}return s(S)}return T.toString=function(){return h+""},T}function u(h,f){var d=Math.max(-8,Math.min(8,Math.floor(Me(f)/3)))*3,g=Math.pow(10,-d),p=l((h=nr(h),h.type="f",h),{suffix:fa[8+d/3]});return function(m){return p(g*m)}}return{format:l,formatPrefix:u}}var ir,da,pa;kd({thousands:",",grouping:[3],currency:["$",""]});function kd(n){return ir=wd(n),da=ir.format,pa=ir.formatPrefix,ir}function Ad(n){return Math.max(0,-Me(Math.abs(n)))}function Cd(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Me(t)/3)))*3-Me(Math.abs(n)))}function $d(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Me(t)-Me(n))+1}function Sd(n){var t=0,e=n.children,r=e&&e.length;if(!r)t=1;else for(;--r>=0;)t+=e[r].value;n.value=t}function Td(){return this.eachAfter(Sd)}function Md(n,t){let e=-1;for(const r of this)n.call(t,r,++e,this);return this}function Ed(n,t){for(var e=this,r=[e],i,s,a=-1;e=r.pop();)if(n.call(t,e,++a,this),i=e.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function Pd(n,t){for(var e=this,r=[e],i=[],s,a,o,c=-1;e=r.pop();)if(i.push(e),s=e.children)for(a=0,o=s.length;a<o;++a)r.push(s[a]);for(;e=i.pop();)n.call(t,e,++c,this);return this}function zd(n,t){let e=-1;for(const r of this)if(n.call(t,r,++e,this))return r}function Od(n){return this.eachAfter(function(t){for(var e=+n(t.data)||0,r=t.children,i=r&&r.length;--i>=0;)e+=r[i].value;t.value=e})}function Ld(n){return this.eachBefore(function(t){t.children&&t.children.sort(n)})}function Nd(n){for(var t=this,e=Rd(t,n),r=[t];t!==e;)t=t.parent,r.push(t);for(var i=r.length;n!==e;)r.splice(i,0,n),n=n.parent;return r}function Rd(n,t){if(n===t)return n;var e=n.ancestors(),r=t.ancestors(),i=null;for(n=e.pop(),t=r.pop();n===t;)i=n,n=e.pop(),t=r.pop();return i}function Dd(){for(var n=this,t=[n];n=n.parent;)t.push(n);return t}function Fd(){return Array.from(this)}function Id(){var n=[];return this.eachBefore(function(t){t.children||n.push(t)}),n}function qd(){var n=this,t=[];return n.each(function(e){e!==n&&t.push({source:e.parent,target:e})}),t}function*Bd(){var n=this,t,e=[n],r,i,s;do for(t=e.reverse(),e=[];n=t.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)e.push(r[i]);while(e.length)}function sr(n,t){n instanceof Map?(n=[void 0,n],t===void 0&&(t=Xd)):t===void 0&&(t=Vd);for(var e=new on(n),r,i=[e],s,a,o,c;r=i.pop();)if((a=t(r.data))&&(c=(a=Array.from(a)).length))for(r.children=a,o=c-1;o>=0;--o)i.push(s=a[o]=new on(a[o])),s.parent=r,s.depth=r.depth+1;return e.eachBefore(Gd)}function Hd(){return sr(this).eachBefore(Yd)}function Vd(n){return n.children}function Xd(n){return Array.isArray(n)?n[1]:null}function Yd(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function Gd(n){var t=0;do n.height=t;while((n=n.parent)&&n.height<++t)}function on(n){this.data=n,this.depth=this.height=0,this.parent=null}on.prototype=sr.prototype={constructor:on,count:Td,each:Md,eachAfter:Pd,eachBefore:Ed,find:zd,sum:Od,sort:Ld,path:Nd,ancestors:Dd,descendants:Fd,leaves:Id,links:qd,copy:Hd,[Symbol.iterator]:Bd};function Ud(n,t){return n.parent===t.parent?1:2}function si(n){var t=n.children;return t?t[0]:n.t}function ai(n){var t=n.children;return t?t[t.length-1]:n.t}function Wd(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function jd(n){for(var t=0,e=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=t,s.m+=t,t+=s.s+(e+=s.c)}function Kd(n,t,e){return n.a.parent===t.parent?n.a:e}function ar(n,t){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}ar.prototype=Object.create(on.prototype);function Zd(n){for(var t=new ar(n,0),e,r=[t],i,s,a,o;e=r.pop();)if(s=e._.children)for(e.children=new Array(o=s.length),a=o-1;a>=0;--a)r.push(i=e.children[a]=new ar(s[a],a)),i.parent=e;return(t.parent=new ar(null,0)).children=[t],t}function Qd(){var n=Ud,t=1,e=1,r=null;function i(l){var u=Zd(l);if(u.eachAfter(s),u.parent.m=-u.z,u.eachBefore(a),r)l.eachBefore(c);else{var h=l,f=l,d=l;l.eachBefore(function(y){y.x<h.x&&(h=y),y.x>f.x&&(f=y),y.depth>d.depth&&(d=y)});var g=h===f?1:n(h,f)/2,p=g-h.x,m=t/(f.x+g+p),b=e/(d.depth||1);l.eachBefore(function(y){y.x=(y.x+p)*m,y.y=y.depth*b})}return l}function s(l){var u=l.children,h=l.parent.children,f=l.i?h[l.i-1]:null;if(u){jd(l);var d=(u[0].z+u[u.length-1].z)/2;f?(l.z=f.z+n(l._,f._),l.m=l.z-d):l.z=d}else f&&(l.z=f.z+n(l._,f._));l.parent.A=o(l,f,l.parent.A||h[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,u,h){if(u){for(var f=l,d=l,g=u,p=f.parent.children[0],m=f.m,b=d.m,y=g.m,v=p.m,_;g=ai(g),f=si(f),g&&f;)p=si(p),d=ai(d),d.a=l,_=g.z+y-f.z-m+n(g._,f._),_>0&&(Wd(Kd(g,l,h),l,_),m+=_,b+=_),y+=g.m,m+=f.m,v+=p.m,b+=d.m;g&&!ai(d)&&(d.t=g,d.m+=y-b),f&&!si(p)&&(p.t=f,p.m+=m-v,h=l)}return h}function c(l){l.x*=t,l.y=l.depth*e}return i.separation=function(l){return arguments.length?(n=l,i):n},i.size=function(l){return arguments.length?(r=!1,t=+l[0],e=+l[1],i):r?null:[t,e]},i.nodeSize=function(l){return arguments.length?(r=!0,t=+l[0],e=+l[1],i):r?[t,e]:null},i}function Jd(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function ga(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}function tp(n){return function(){return n}}function ep(n){return+n}var _a=[0,1];function Rt(n){return n}function oi(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:tp(isNaN(t)?NaN:.5)}function np(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function rp(n,t,e){var r=n[0],i=n[1],s=t[0],a=t[1];return i<r?(r=oi(i,r),s=e(a,s)):(r=oi(r,i),s=e(s,a)),function(o){return s(r(o))}}function ip(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),s=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)i[a]=oi(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var c=xc(n,o,1,r)-1;return s[c](i[c](o))}}function sp(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function ap(){var n=_a,t=_a,e=ce,r,i,s,a=Rt,o,c,l;function u(){var f=Math.min(n.length,t.length);return a!==Rt&&(a=np(n[0],n[f-1])),o=f>2?ip:rp,c=l=null,h}function h(f){return f==null||isNaN(f=+f)?s:(c||(c=o(n.map(r),t,e)))(r(a(f)))}return h.invert=function(f){return a(i((l||(l=o(t,n.map(r),Pt)))(f)))},h.domain=function(f){return arguments.length?(n=Array.from(f,ep),u()):n.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),e=Ur,u()},h.clamp=function(f){return arguments.length?(a=f?!0:Rt,u()):a!==Rt},h.interpolate=function(f){return arguments.length?(e=f,u()):e},h.unknown=function(f){return arguments.length?(s=f,h):s},function(f,d){return r=f,i=d,u()}}function op(){return ap()(Rt,Rt)}function lp(n,t,e,r){var i=Ac(n,t,e),s;switch(r=nr(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(s=Cd(i,a))&&(r.precision=s),pa(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=$d(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=Ad(i))&&(r.precision=s-(r.type==="%")*2);break}}return da(r)}function li(n){var t=n.domain;return n.ticks=function(e){var r=t();return kc(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return lp(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,s=r.length-1,a=r[i],o=r[s],c,l,u=10;for(o<a&&(l=a,a=o,o=l,l=i,i=s,s=l);u-- >0;){if(l=Pr(a,o,e),l===c)return r[i]=a,r[s]=o,t(r);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function fe(){var n=op();return n.copy=function(){return sp(n,fe())},Jd.apply(n,arguments),li(n)}function cp(){var n=0,t=1,e,r,i,s,a=Rt,o=!1,c;function l(h){return h==null||isNaN(h=+h)?c:a(i===0?.5:(h=(s(h)-e)*i,o?Math.max(0,Math.min(1,h)):h))}l.domain=function(h){return arguments.length?([n,t]=h,e=s(n=+n),r=s(t=+t),i=e===r?0:1/(r-e),l):[n,t]},l.clamp=function(h){return arguments.length?(o=!!h,l):o},l.interpolator=function(h){return arguments.length?(a=h,l):a};function u(h){return function(f){var d,g;return arguments.length?([d,g]=f,a=h(d,g),l):[a(0),a(1)]}}return l.range=u(ce),l.rangeRound=u(Ur),l.unknown=function(h){return arguments.length?(c=h,l):c},function(h){return s=h,e=h(n),r=h(t),i=e===r?0:1/(r-e),l}}function ma(n,t){return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function va(){var n=li(cp()(Rt));return n.copy=function(){return ma(n,va())},ga.apply(n,arguments)}function up(){var n=0,t=.5,e=1,r=1,i,s,a,o,c,l=Rt,u,h=!1,f;function d(p){return isNaN(p=+p)?f:(p=.5+((p=+u(p))-s)*(r*p<r*s?o:c),l(h?Math.max(0,Math.min(1,p)):p))}d.domain=function(p){return arguments.length?([n,t,e]=p,i=u(n=+n),s=u(t=+t),a=u(e=+e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d):[n,t,e]},d.clamp=function(p){return arguments.length?(h=!!p,d):h},d.interpolator=function(p){return arguments.length?(l=p,d):l};function g(p){return function(m){var b,y,v;return arguments.length?([b,y,v]=m,l=Qh(p,[b,y,v]),d):[l(0),l(.5),l(1)]}}return d.range=g(ce),d.rangeRound=g(Ur),d.unknown=function(p){return arguments.length?(f=p,d):f},function(p){return u=p,i=p(n),s=p(t),a=p(e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d}}function xa(){var n=li(up()(Rt));return n.copy=function(){return ma(n,xa())},ga.apply(n,arguments)}function ba(n){for(var t=n.length/6|0,e=new Array(t),r=0;r<t;)e[r]="#"+n.slice(r*6,++r*6);return e}const ya=n=>qh(n[n.length-1]);var hp=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(ba);const fp=ya(hp);var dp=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(ba);const pp=ya(dp);function D(n){return function(){return n}}const wa=Math.abs,rt=Math.atan2,de=Math.cos,gp=Math.max,ci=Math.min,Dt=Math.sin,Ee=Math.sqrt,ht=1e-12,ln=Math.PI,or=ln/2,lr=2*ln;function _p(n){return n>1?0:n<-1?ln:Math.acos(n)}function ka(n){return n>=1?or:n<=-1?-or:Math.asin(n)}function cr(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new gd(t)}function mp(n){return n.innerRadius}function vp(n){return n.outerRadius}function xp(n){return n.startAngle}function bp(n){return n.endAngle}function yp(n){return n&&n.padAngle}function wp(n,t,e,r,i,s,a,o){var c=e-n,l=r-t,u=a-i,h=o-s,f=h*c-u*l;if(!(f*f<ht))return f=(u*(t-s)-h*(n-i))/f,[n+f*c,t+f*l]}function ur(n,t,e,r,i,s,a){var o=n-e,c=t-r,l=(a?s:-s)/Ee(o*o+c*c),u=l*c,h=-l*o,f=n+u,d=t+h,g=e+u,p=r+h,m=(f+g)/2,b=(d+p)/2,y=g-f,v=p-d,_=y*y+v*v,x=i-s,k=f*p-g*d,$=(v<0?-1:1)*Ee(gp(0,x*x*_-k*k)),A=(k*v-y*$)/_,w=(-k*y-v*$)/_,C=(k*v+y*$)/_,T=(-k*y+v*$)/_,S=A-m,M=w-b,E=C-m,P=T-b;return S*S+M*M>E*E+P*P&&(A=C,w=T),{cx:A,cy:w,x01:-u,y01:-h,x11:A*(i/x-1),y11:w*(i/x-1)}}function Aa(){var n=mp,t=vp,e=D(0),r=null,i=xp,s=bp,a=yp,o=null,c=cr(l);function l(){var u,h,f=+n.apply(this,arguments),d=+t.apply(this,arguments),g=i.apply(this,arguments)-or,p=s.apply(this,arguments)-or,m=wa(p-g),b=p>g;if(o||(o=u=c()),d<f&&(h=d,d=f,f=h),!(d>ht))o.moveTo(0,0);else if(m>lr-ht)o.moveTo(d*de(g),d*Dt(g)),o.arc(0,0,d,g,p,!b),f>ht&&(o.moveTo(f*de(p),f*Dt(p)),o.arc(0,0,f,p,g,b));else{var y=g,v=p,_=g,x=p,k=m,$=m,A=a.apply(this,arguments)/2,w=A>ht&&(r?+r.apply(this,arguments):Ee(f*f+d*d)),C=ci(wa(d-f)/2,+e.apply(this,arguments)),T=C,S=C,M,E;if(w>ht){var P=ka(w/f*Dt(A)),z=ka(w/d*Dt(A));(k-=P*2)>ht?(P*=b?1:-1,_+=P,x-=P):(k=0,_=x=(g+p)/2),($-=z*2)>ht?(z*=b?1:-1,y+=z,v-=z):($=0,y=v=(g+p)/2)}var L=d*de(y),I=d*Dt(y),X=f*de(x),q=f*Dt(x);if(C>ht){var at=d*de(v),ct=d*Dt(v),Ge=f*de(_),$t=f*Dt(_),nt;if(m<ln)if(nt=wp(L,I,Ge,$t,at,ct,X,q)){var os=L-nt[0],ls=I-nt[1],cs=at-nt[0],us=ct-nt[1],cl=1/Dt(_p((os*cs+ls*us)/(Ee(os*os+ls*ls)*Ee(cs*cs+us*us)))/2),ul=Ee(nt[0]*nt[0]+nt[1]*nt[1]);T=ci(C,(f-ul)/(cl-1)),S=ci(C,(d-ul)/(cl+1))}else T=S=0}$>ht?S>ht?(M=ur(Ge,$t,L,I,d,S,b),E=ur(at,ct,X,q,d,S,b),o.moveTo(M.cx+M.x01,M.cy+M.y01),S<C?o.arc(M.cx,M.cy,S,rt(M.y01,M.x01),rt(E.y01,E.x01),!b):(o.arc(M.cx,M.cy,S,rt(M.y01,M.x01),rt(M.y11,M.x11),!b),o.arc(0,0,d,rt(M.cy+M.y11,M.cx+M.x11),rt(E.cy+E.y11,E.cx+E.x11),!b),o.arc(E.cx,E.cy,S,rt(E.y11,E.x11),rt(E.y01,E.x01),!b))):(o.moveTo(L,I),o.arc(0,0,d,y,v,!b)):o.moveTo(L,I),!(f>ht)||!(k>ht)?o.lineTo(X,q):T>ht?(M=ur(X,q,at,ct,f,-T,b),E=ur(L,I,Ge,$t,f,-T,b),o.lineTo(M.cx+M.x01,M.cy+M.y01),T<C?o.arc(M.cx,M.cy,T,rt(M.y01,M.x01),rt(E.y01,E.x01),!b):(o.arc(M.cx,M.cy,T,rt(M.y01,M.x01),rt(M.y11,M.x11),!b),o.arc(0,0,f,rt(M.cy+M.y11,M.cx+M.x11),rt(E.cy+E.y11,E.cx+E.x11),b),o.arc(E.cx,E.cy,T,rt(E.y11,E.x11),rt(E.y01,E.x01),!b))):o.arc(0,0,f,x,_,b)}if(o.closePath(),u)return o=null,u+""||null}return l.centroid=function(){var u=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,h=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-ln/2;return[de(h)*u,Dt(h)*u]},l.innerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:D(+u),l):n},l.outerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:D(+u),l):t},l.cornerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:D(+u),l):e},l.padRadius=function(u){return arguments.length?(r=u==null?null:typeof u=="function"?u:D(+u),l):r},l.startAngle=function(u){return arguments.length?(i=typeof u=="function"?u:D(+u),l):i},l.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:D(+u),l):s},l.padAngle=function(u){return arguments.length?(a=typeof u=="function"?u:D(+u),l):a},l.context=function(u){return arguments.length?(o=u??null,l):o},l}var kp=Array.prototype.slice;function ui(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Ca(n){this._context=n}Ca.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function $a(n){return new Ca(n)}function hi(n){return n[0]}function fi(n){return n[1]}function di(n,t){var e=D(!0),r=null,i=$a,s=null,a=cr(o);n=typeof n=="function"?n:n===void 0?hi:D(n),t=typeof t=="function"?t:t===void 0?fi:D(t);function o(c){var l,u=(c=ui(c)).length,h,f=!1,d;for(r==null&&(s=i(d=a())),l=0;l<=u;++l)!(l<u&&e(h=c[l],l,c))===f&&((f=!f)?s.lineStart():s.lineEnd()),f&&s.point(+n(h,l,c),+t(h,l,c));if(d)return s=null,d+""||null}return o.x=function(c){return arguments.length?(n=typeof c=="function"?c:D(+c),o):n},o.y=function(c){return arguments.length?(t=typeof c=="function"?c:D(+c),o):t},o.defined=function(c){return arguments.length?(e=typeof c=="function"?c:D(!!c),o):e},o.curve=function(c){return arguments.length?(i=c,r!=null&&(s=i(r)),o):i},o.context=function(c){return arguments.length?(c==null?r=s=null:s=i(r=c),o):r},o}function Ap(n,t,e){var r=null,i=D(!0),s=null,a=$a,o=null,c=cr(l);n=typeof n=="function"?n:n===void 0?hi:D(+n),t=typeof t=="function"?t:D(t===void 0?0:+t),e=typeof e=="function"?e:e===void 0?fi:D(+e);function l(h){var f,d,g,p=(h=ui(h)).length,m,b=!1,y,v=new Array(p),_=new Array(p);for(s==null&&(o=a(y=c())),f=0;f<=p;++f){if(!(f<p&&i(m=h[f],f,h))===b)if(b=!b)d=f,o.areaStart(),o.lineStart();else{for(o.lineEnd(),o.lineStart(),g=f-1;g>=d;--g)o.point(v[g],_[g]);o.lineEnd(),o.areaEnd()}b&&(v[f]=+n(m,f,h),_[f]=+t(m,f,h),o.point(r?+r(m,f,h):v[f],e?+e(m,f,h):_[f]))}if(y)return o=null,y+""||null}function u(){return di().defined(i).curve(a).context(s)}return l.x=function(h){return arguments.length?(n=typeof h=="function"?h:D(+h),r=null,l):n},l.x0=function(h){return arguments.length?(n=typeof h=="function"?h:D(+h),l):n},l.x1=function(h){return arguments.length?(r=h==null?null:typeof h=="function"?h:D(+h),l):r},l.y=function(h){return arguments.length?(t=typeof h=="function"?h:D(+h),e=null,l):t},l.y0=function(h){return arguments.length?(t=typeof h=="function"?h:D(+h),l):t},l.y1=function(h){return arguments.length?(e=h==null?null:typeof h=="function"?h:D(+h),l):e},l.lineX0=l.lineY0=function(){return u().x(n).y(t)},l.lineY1=function(){return u().x(n).y(e)},l.lineX1=function(){return u().x(r).y(t)},l.defined=function(h){return arguments.length?(i=typeof h=="function"?h:D(!!h),l):i},l.curve=function(h){return arguments.length?(a=h,s!=null&&(o=a(s)),l):a},l.context=function(h){return arguments.length?(h==null?s=o=null:o=a(s=h),l):s},l}function Cp(n,t){return t<n?-1:t>n?1:t>=n?0:NaN}function $p(n){return n}function Sp(){var n=$p,t=Cp,e=null,r=D(0),i=D(lr),s=D(0);function a(o){var c,l=(o=ui(o)).length,u,h,f=0,d=new Array(l),g=new Array(l),p=+r.apply(this,arguments),m=Math.min(lr,Math.max(-lr,i.apply(this,arguments)-p)),b,y=Math.min(Math.abs(m)/l,s.apply(this,arguments)),v=y*(m<0?-1:1),_;for(c=0;c<l;++c)(_=g[d[c]=c]=+n(o[c],c,o))>0&&(f+=_);for(t!=null?d.sort(function(x,k){return t(g[x],g[k])}):e!=null&&d.sort(function(x,k){return e(o[x],o[k])}),c=0,h=f?(m-l*v)/f:0;c<l;++c,p=b)u=d[c],_=g[u],b=p+(_>0?_*h:0)+v,g[u]={data:o[u],index:c,value:_,startAngle:p,endAngle:b,padAngle:y};return g}return a.value=function(o){return arguments.length?(n=typeof o=="function"?o:D(+o),a):n},a.sortValues=function(o){return arguments.length?(t=o,e=null,a):t},a.sort=function(o){return arguments.length?(e=o,t=null,a):e},a.startAngle=function(o){return arguments.length?(r=typeof o=="function"?o:D(+o),a):r},a.endAngle=function(o){return arguments.length?(i=typeof o=="function"?o:D(+o),a):i},a.padAngle=function(o){return arguments.length?(s=typeof o=="function"?o:D(+o),a):s},a}class Sa{constructor(t,e){this._context=t,this._x=e}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,e){switch(t=+t,e=+e,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,e,t,e):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+e)/2,t,this._y0,t,e);break}}this._x0=t,this._y0=e}}function Tp(n){return new Sa(n,!0)}function Mp(n){return new Sa(n,!1)}function Ep(n){return n.source}function Pp(n){return n.target}function Ta(n){let t=Ep,e=Pp,r=hi,i=fi,s=null,a=null,o=cr(c);function c(){let l;const u=kp.call(arguments),h=t.apply(this,u),f=e.apply(this,u);if(s==null&&(a=n(l=o())),a.lineStart(),u[0]=h,a.point(+r.apply(this,u),+i.apply(this,u)),u[0]=f,a.point(+r.apply(this,u),+i.apply(this,u)),a.lineEnd(),l)return a=null,l+""||null}return c.source=function(l){return arguments.length?(t=l,c):t},c.target=function(l){return arguments.length?(e=l,c):e},c.x=function(l){return arguments.length?(r=typeof l=="function"?l:D(+l),c):r},c.y=function(l){return arguments.length?(i=typeof l=="function"?l:D(+l),c):i},c.context=function(l){return arguments.length?(l==null?s=a=null:a=n(s=l),c):s},c}function zp(){return Ta(Tp)}function Op(){return Ta(Mp)}function Ma(n){return n<0?-1:1}function Ea(n,t,e){var r=n._x1-n._x0,i=t-n._x1,s=(n._y1-n._y0)/(r||i<0&&-0),a=(e-n._y1)/(i||r<0&&-0),o=(s*i+a*r)/(r+i);return(Ma(s)+Ma(a))*Math.min(Math.abs(s),Math.abs(a),.5*Math.abs(o))||0}function Pa(n,t){var e=n._x1-n._x0;return e?(3*(n._y1-n._y0)/e-t)/2:t}function pi(n,t,e){var r=n._x0,i=n._y0,s=n._x1,a=n._y1,o=(s-r)/3;n._context.bezierCurveTo(r+o,i+o*t,s-o,a-o*e,s,a)}function hr(n){this._context=n}hr.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:pi(this,this._t0,Pa(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){var e=NaN;if(n=+n,t=+t,!(n===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;break;case 2:this._point=3,pi(this,Pa(this,e=Ea(this,n,t)),e);break;default:pi(this,this._t0,e=Ea(this,n,t));break}this._x0=this._x1,this._x1=n,this._y0=this._y1,this._y1=t,this._t0=e}}},Object.create(hr.prototype).point=function(n,t){hr.prototype.point.call(this,t,n)};function Lp(n){return new hr(n)}function cn(n,t,e){this.k=n,this.x=t,this.y=e}cn.prototype={constructor:cn,scale:function(n){return n===1?this:new cn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new cn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},cn.prototype;const Np=`
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
`;class Rp extends R{constructor(){super(...arguments);O(this,"_svg",null);O(this,"_animated",!0);O(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","scale","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Np),this._animated=this.getAttribute("animated")!=="false",this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated)return;this._hasAnimated=!0;const r=this._svg;if(!r)return;const i=r.querySelectorAll(".cell");if(e||!this._animated){i.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"});return}i.forEach(s=>{const a=s,o=Number(a.dataset.delay||0);a.style.opacity="0",a.style.transform="scale(0.5)",a.style.transition="none",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`,a.style.opacity="1",a.style.transform="scale(1)"})})})}_buildChart(){var y;const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.getAttribute("scale")||"diverging";if(!e.length||!r.length){this.render("<svg></svg>");return}const s=e.length,a=3,o=60,c=110,l=56,u=s*l+(s-1)*a,h=u+c,f=u+o,d=i==="sequential"?va(pp).domain([0,1]):xa(fp).domain([-1,0,1]),g=this.isRtl;let p="";for(let v=0;v<s;v++){const _=c+v*(l+a)+l/2,x=o/2;p+=`<text class="header-text" x="${g?h-_:_}" y="${x}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++){const _=o+v*(l+a)+l/2,x=g?h-c/2:c/2;p+=`<text class="header-text" x="${x}" y="${_}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++)for(let _=0;_<s;_++){const x=((y=r[v])==null?void 0:y[_])??0,k=d(x),$=this._contrastColor(k),A=(v+_)*40;let w=c+_*(l+a);g&&(w=h-w-l);const C=o+v*(l+a),T=w+l/2,S=C+l/2;p+=`<g class="cell" data-delay="${A}" data-value="${x.toFixed(2)}" style="transform-origin: ${T}px ${S}px; opacity: 0; transform: scale(0.5);">`,p+=`<rect x="${w}" y="${C}" width="${l}" height="${l}" rx="6" ry="6" fill="${k}"/>`,p+=`<text class="cell-text" x="${T}" y="${S}" fill="${$}">${x.toFixed(2)}</text>`,p+="</g>"}const m=`
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;this.render(m),this._svg=this.root.querySelector("svg");const b=this.root.querySelector(".tooltip");this._svg&&b&&this._svg.querySelectorAll(".cell").forEach(v=>{v.addEventListener("mouseenter",_=>{const k=_.currentTarget.dataset.value||"";b.textContent=k,b.style.opacity="1"}),v.addEventListener("mousemove",_=>{const x=_,k=this.root.querySelector("div").getBoundingClientRect();b.style.left=`${x.clientX-k.left+10}px`,b.style.top=`${x.clientY-k.top-28}px`}),v.addEventListener("mouseleave",()=>{b.style.opacity="0"})})}_contrastColor(e){const r=jt(e);if(!r)return"#000";const i=r.rgb();return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"#000":"#fff"}_escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-heatmap",Rp);const Dp=`
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
`,Pe={top:20,right:30,bottom:40,left:60},za=500,Oa=250,pe=za-Pe.left-Pe.right,Xt=Oa-Pe.top-Pe.bottom;class Fp extends R{constructor(){super(...arguments);O(this,"_resizeObs",null);O(this,"_svg",null);O(this,"_built",!1)}static get observedAttributes(){return["data","area","points","tooltip","color","x-label","y-label","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Dp),this.root.innerHTML="<svg></svg>",this._buildChart(),this._resizeObs=new ResizeObserver(()=>{}),this._resizeObs.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObs)==null||e.disconnect(),this._resizeObs=null}handleAttributeChange(e,r,i){this._built&&this._buildChart()}_parseData(){const e=this.jsonAttr("data",[]);return!Array.isArray(e)||e.length===0?[]:typeof e[0]=="number"?e.map((r,i)=>({x:i,y:r})):e}_getColor(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}_buildChart(){const e=this._parseData();if(e.length===0)return;const r=this.root.querySelector("svg");if(!r)return;const i=this._getColor(),s=this.hasAttribute("area"),a=this.hasAttribute("points"),o=this.hasAttribute("tooltip"),c=this.getAttribute("x-label")||"",l=this.getAttribute("y-label")||"";J(r).selectAll("*").remove();const u=J(r).attr("viewBox",`0 0 ${za} ${Oa}`).attr("preserveAspectRatio","xMidYMid meet");this._svg=u;const h=u.append("defs"),f=`lv-area-grad-${Math.random().toString(36).slice(2,8)}`,d=h.append("linearGradient").attr("id",f).attr("x1","0").attr("y1","0").attr("x2","0").attr("y2","1");d.append("stop").attr("offset","0%").attr("stop-color",i).attr("stop-opacity",.25),d.append("stop").attr("offset","100%").attr("stop-color",i).attr("stop-opacity",0);const g=u.append("g").attr("transform",`translate(${Pe.left},${Pe.top})`),p=On(e,A=>A.x),m=On(e,A=>A.y),b=(m[1]-m[0])*.1||1,y=fe().domain(p).range([0,pe]),v=fe().domain([m[0]-b,m[1]+b]).range([Xt,0]);if(g.append("g").attr("class","grid").attr("transform",`translate(0,${Xt})`).call(Nn(y).tickSize(-Xt).tickFormat(()=>"")),g.append("g").attr("class","grid").call(Rn(v).tickSize(-pe).tickFormat(()=>"")),g.append("g").attr("class","axis x-axis").attr("transform",`translate(0,${Xt})`).call(Nn(y).ticks(6)),g.append("g").attr("class","axis y-axis").call(Rn(v).ticks(5)),c&&g.append("text").attr("class","axis-label").attr("x",pe/2).attr("y",Xt+35).attr("text-anchor","middle").text(c),l&&g.append("text").attr("class","axis-label").attr("x",-Xt/2).attr("y",-38).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),s){const A=Ap().x(w=>y(w.x)).y0(Xt).y1(w=>v(w.y));g.append("path").datum(e).attr("class","area").attr("d",A).attr("fill",`url(#${f})`)}const _=di().x(A=>y(A.x)).y(A=>v(A.y)),x=g.append("path").datum(e).attr("class","line").attr("d",_).attr("stroke",i).attr("stroke-width",2.5),$=x.node().getTotalLength();x.attr("stroke-dasharray",$).attr("stroke-dashoffset",$),a&&g.selectAll(".point").data(e).enter().append("circle").attr("class","point").attr("cx",A=>y(A.x)).attr("cy",A=>v(A.y)).attr("r",4).attr("fill",i).attr("stroke","white").attr("stroke-width",1.5),o&&this._setupTooltip(g,e,y,v,i),this._built=!0,this.getAttribute("animated")==="false"&&this._showInstant()}_setupTooltip(e,r,i,s,a){const o=e.append("g").attr("class","tooltip-group").style("display","none");o.append("line").attr("class","crosshair crosshair-x").attr("y1",0).attr("y2",Xt),o.append("line").attr("class","crosshair crosshair-y").attr("x1",0).attr("x2",pe),o.append("circle").attr("r",5).attr("fill",a).attr("stroke","white").attr("stroke-width",2),o.append("rect").attr("class","tooltip-bg").attr("width",60).attr("height",24).attr("rx",6),o.append("text").attr("class","tooltip-text").attr("text-anchor","middle").attr("dy","0.35em");const c=Er(l=>l.x).left;e.append("rect").attr("width",pe).attr("height",Xt).attr("fill","transparent").on("mousemove",l=>{const[u]=Ir(l),h=i.invert(u);let f=c(r,h,1);if(f>=r.length&&(f=r.length-1),f>0){const _=r[f-1],x=r[f];f=h-_.x>x.x-h?f:f-1}const d=r[f],g=i(d.x),p=s(d.y);o.style("display",null),o.select(".crosshair-x").attr("x1",g).attr("x2",g),o.select(".crosshair-y").attr("y1",p).attr("y2",p),o.select("circle").attr("cx",g).attr("cy",p);const m=60,b=24;let y=g-m/2,v=p-b-10;y<0&&(y=0),y+m>pe&&(y=pe-m),v<0&&(v=p+10),o.select(".tooltip-bg").attr("x",y).attr("y",v),o.select(".tooltip-text").attr("x",y+m/2).attr("y",v+b/2).text(`${d.y.toFixed(1)}`)}).on("mouseleave",()=>{o.style("display","none")})}_showInstant(){if(!this._svg)return;const e=this._svg.select("g");e.select(".line").attr("stroke-dashoffset",0),e.select(".area").classed("visible",!0),e.selectAll(".point").classed("visible",!0)}animateIn(e){var a;if(!this._svg)return;if(e||this.getAttribute("animated")==="false"){this._showInstant();return}const r=this._svg.select("g"),i=r.select(".line"),s=((a=i.node())==null?void 0:a.getTotalLength())||0;i.attr("stroke-dasharray",s).attr("stroke-dashoffset",s).transition().duration(1200).ease(an).attr("stroke-dashoffset",0),r.select(".area").transition().delay(1500).duration(0).on("start",function(){J(this).classed("visible",!0)}),r.selectAll(".point").each(function(o,c){J(this).transition().delay(1500+c*50).duration(0).on("start",function(){J(this).classed("visible",!0)})})}}customElements.define("lv-line-chart",Fp);const fr={sigmoid:n=>1/(1+Math.exp(-n)),relu:n=>Math.max(0,n),tanh:n=>Math.tanh(n),linear:n=>n},Ip=`
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
`,La=500,Na=300;class qp extends R{constructor(){super(...arguments);O(this,"_hasAnimated",!1);O(this,"_resizeObserver",null);O(this,"_svg",null);O(this,"_fn",fr.sigmoid);O(this,"_fnName","sigmoid")}static get observedAttributes(){return["fn","range","samples","color","interactive","animated"]}get _range(){return this.jsonAttr("range",[-6,6])}get _samples(){const e=this.getAttribute("samples");return e&&parseInt(e,10)||200}get _color(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}get _interactive(){return this.hasAttribute("interactive")}get _animated(){const e=this.getAttribute("animated");return e===null?!0:e!=="false"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ip);const e=document.createElement("div");this.root.appendChild(e);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",`0 0 ${La} ${Na}`),r.setAttribute("preserveAspectRatio","xMidYMid meet"),e.appendChild(r),this._svg=J(r),this._parseFn(),this._render(!1),this._resizeObserver=new ResizeObserver(()=>{}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null}handleAttributeChange(e,r,i){r!==i&&(e==="fn"&&this._parseFn(),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e||!this._animated?this._render(!1):this._render(!0))}_parseFn(){const e=this.getAttribute("fn")||"sigmoid";if(this._fnName=e,fr[e])this._fn=fr[e];else try{const r=e.replace(/^\s*x\s*=>\s*/,"");this._fn=new Function("x","return "+r),this._fnName="custom"}catch{this._fn=fr.sigmoid,this._fnName="sigmoid"}}_generateData(){const[e,r]=this._range,i=this._samples,s=(r-e)/(i-1),a=[];for(let o=0;o<i;o++){const c=e+o*s,l=this._fn(c);a.push({x:c,y:l})}return a}_render(e){if(!this._svg)return;const r=this._svg;r.selectAll("*").remove();const i=this._generateData(),[s,a]=this._range,o=i.map(x=>x.y),c=Cc(o)??-1,l=vs(o)??1,u=(l-c)*.15||.5,h=c-u,f=l+u,d={top:20,right:30,bottom:30,left:40},g=La-d.left-d.right,p=Na-d.top-d.bottom,m=fe().domain([s,a]).range([0,g]),b=fe().domain([h,f]).range([p,0]),y=r.append("g").attr("transform",`translate(${d.left},${d.top})`);this._drawGrid(y,m,b,g,p),this._drawAxes(y,m,b,g,p);const v=di().x(x=>m(x.x)).y(x=>b(x.y)).curve(Lp),_=y.append("path").datum(i).attr("class","fn-line").attr("d",v).attr("stroke",this._color).attr("stroke-width",3);if(e){const k=_.node().getTotalLength();_.attr("stroke-dasharray",k).attr("stroke-dashoffset",k).transition().duration(1e3).ease(an).attr("stroke-dashoffset",0)}this._drawKeyPoints(y,m,b),this._interactive&&this._addInteractivePoint(y,m,b,i,g,p)}_drawGrid(e,r,i,s,a){const o=r.ticks(),c=i.ticks();e.selectAll(".grid-line-x").data(o).enter().append("line").attr("class","grid-line").attr("x1",l=>r(l)).attr("x2",l=>r(l)).attr("y1",0).attr("y2",a),e.selectAll(".grid-line-y").data(c).enter().append("line").attr("class","grid-line").attr("x1",0).attr("x2",s).attr("y1",l=>i(l)).attr("y2",l=>i(l))}_drawAxes(e,r,i,s,a){const[o,c]=r.domain(),[l,u]=i.domain(),h=l<=0&&u>=0?i(0):a;e.append("line").attr("class","axis-line").attr("x1",0).attr("x2",s).attr("y1",h).attr("y2",h);const f=o<=0&&c>=0?r(0):0;e.append("line").attr("class","axis-line").attr("x1",f).attr("x2",f).attr("y1",0).attr("y2",a),r.ticks().forEach(p=>{const m=r(p);e.append("line").attr("class","axis-line").attr("x1",m).attr("x2",m).attr("y1",h-3).attr("y2",h+3),e.append("text").attr("class","axis-text").attr("x",m).attr("y",h+14).attr("text-anchor","middle").text(p)}),i.ticks().forEach(p=>{const m=i(p);e.append("line").attr("class","axis-line").attr("x1",f-3).attr("x2",f+3).attr("y1",m).attr("y2",m),e.append("text").attr("class","axis-text").attr("x",f-12).attr("y",m).attr("dy","0.35em").attr("text-anchor","end").text(p)})}_drawKeyPoints(e,r,i){if(this._fnName==="sigmoid"){const s=r(0),a=i(.5);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("σ(0) = 0.5")}else if(this._fnName==="relu"){const s=r(0),a=i(0);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("kink point")}}_addInteractivePoint(e,r,i,s,a,o){const[c,l]=this._range,u=this._fn,h=(c+l)/2,f=u(h),d=e.append("line").attr("class","crosshair").attr("x1",r(h)).attr("x2",r(h)).attr("y1",i(f)).attr("y2",o),g=e.append("line").attr("class","crosshair").attr("x1",0).attr("x2",r(h)).attr("y1",i(f)).attr("y2",i(f)),p=e.append("g"),m=p.append("rect").attr("class","readout-bg").attr("width",160).attr("height",24).attr("rx",6),b=p.append("text").attr("class","readout-text").attr("text-anchor","middle"),y=e.append("circle").attr("class","drag-point").attr("cx",r(h)).attr("cy",i(f)).attr("r",8).attr("fill",this._color).attr("stroke","#fff").attr("stroke-width",2),v=(x,k,$,A)=>{const w=`x = ${$.toFixed(2)}, y = ${A.toFixed(2)}`;b.text(w);const C=160,T=24,S=12;let M=x-C/2,E=k-T-S;M<0&&(M=0),M+C>a&&(M=a-C),E<0&&(E=k+S),m.attr("x",M).attr("y",E).attr("width",C).attr("height",T),b.attr("x",M+C/2).attr("y",E+T/2).attr("text-anchor","middle")};v(r(h),i(f),h,f);const _=yh().on("drag",x=>{const k=Math.max(0,Math.min(a,x.x)),$=r.invert(k),A=Math.max(c,Math.min(l,$)),w=u(A),C=r(A),T=i(w);y.attr("cx",C).attr("cy",T),d.attr("x1",C).attr("x2",C).attr("y1",T).attr("y2",o),g.attr("x1",0).attr("x2",C).attr("y1",T).attr("y2",T),v(C,T,A,w)});y.call(_)}}customElements.define("lv-function",qp);const Ra=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Bp=`
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
`,vt={top:20,right:20,bottom:50,left:55},Da=500,gi=400;class Hp extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null)}static get observedAttributes(){return["data","x-label","y-label","clusters","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Bp),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Ra[e%8]}_clusterColor(e){const i=[...new Set(this._data.map(o=>o.cluster).filter(o=>o!=null))].indexOf(e),s=i>=0?i:0;return getComputedStyle(this).getPropertyValue(`--lv-chart-${s%8}`).trim()||Ra[s%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=J(e),this._svg.append("g").attr("class","grid-group"),this._svg.append("g").attr("class","axis-group"),this._svg.append("g").attr("class","points-group"),this._svg.append("g").attr("class","tooltip-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("clusters"),s=this.hasAttribute("tooltip"),a=this.getAttribute("x-label")||"",o=this.getAttribute("y-label")||"",c=i?[...new Set(r.map(P=>P.cluster).filter(P=>P!=null))]:[],l=c.length>0?30:0,u=gi+l,h=Da-vt.left-vt.right,f=gi-vt.top-vt.bottom;this._svg.attr("viewBox",`0 0 ${Da} ${u}`);const d=On(r,P=>P.x),g=On(r,P=>P.y),p=(d[1]-d[0])*.05||1,m=(g[1]-g[0])*.05||1,b=fe().domain([d[0]-p,d[1]+p]).range([0,h]),y=fe().domain([g[0]-m,g[1]+m]).range([f,0]),v=this._svg.select(".grid-group").attr("transform",`translate(${vt.left},${vt.top})`);v.selectAll("*").remove();const _=Nn(b).tickSize(-f).tickFormat(()=>"");v.append("g").attr("class","grid").attr("transform",`translate(0,${f})`).call(_);const x=Rn(y).tickSize(-h).tickFormat(()=>"");v.append("g").attr("class","grid").call(x);const k=this._svg.select(".axis-group").attr("transform",`translate(${vt.left},${vt.top})`);k.selectAll("*").remove(),k.append("g").attr("class","axis").attr("transform",`translate(0,${f})`).call(Nn(b).ticks(6)),k.append("g").attr("class","axis").call(Rn(y).ticks(6)),a&&k.append("text").attr("class","axis-label").attr("x",h/2).attr("y",f+38).attr("text-anchor","middle").text(a),o&&k.append("text").attr("class","axis-label").attr("x",-f/2).attr("y",-40).attr("text-anchor","middle").attr("transform","rotate(-90)").text(o);const $=this._svg.select(".points-group").attr("transform",`translate(${vt.left},${vt.top})`),A=this._svg.select(".tooltip-group").attr("transform",`translate(${vt.left},${vt.top})`);A.selectAll("*").remove();const w=A.append("g").attr("class","tooltip-box");w.append("rect").attr("class","tooltip-bg"),w.append("text").attr("class","tooltip-text");const C=$.selectAll(".point").data(r,(P,z)=>String(z));C.exit().remove();const T=C.enter().append("circle").attr("class","point").attr("cx",P=>b(P.x)).attr("cy",P=>y(P.y)).attr("r",5).attr("fill",(P,z)=>i&&P.cluster!=null?this._clusterColor(P.cluster):this._getColor(z,P)).attr("opacity",e?0:1).attr("transform",e?"scale(0)":"scale(1)").style("transform-origin",P=>`${b(P.x)}px ${y(P.y)}px`);s?T.on("mouseenter",(P,z)=>{var I;if(J(P.currentTarget).transition().duration(150).attr("r",6.5).attr("opacity",1),z.label){const X=b(z.x),q=y(z.y)-14;w.classed("visible",!0),w.select(".tooltip-text").attr("x",X).attr("y",q).text(z.label);const at=w.select(".tooltip-text").node(),ct=((I=at==null?void 0:at.getComputedTextLength)==null?void 0:I.call(at))||40;w.select(".tooltip-bg").attr("x",X-ct/2-6).attr("y",q-10).attr("width",ct+12).attr("height",20)}}).on("mouseleave",P=>{J(P.currentTarget).transition().duration(150).attr("r",5).attr("opacity",.85),w.classed("visible",!1)}):T.on("mouseenter",P=>{J(P.currentTarget).transition().duration(150).attr("r",6.5)}).on("mouseleave",P=>{J(P.currentTarget).transition().duration(150).attr("r",5)});const S=T.merge(C);if(e?S.each(function(P,z){J(this).transition().delay(z*30).duration(400).ease(cd).attr("opacity",.85).attr("transform","scale(1)")}):S.attr("cx",P=>b(P.x)).attr("cy",P=>y(P.y)).attr("opacity",.85).attr("transform","scale(1)").attr("fill",(P,z)=>i&&P.cluster!=null?this._clusterColor(P.cluster):this._getColor(z,P)),this.hasAttribute("labels")||this.hasAttribute("tooltip")){const P=this._svg.select(".points-group");P.selectAll(".point-label").remove(),r.forEach((z,L)=>{if(!z.label)return;const I=P.append("text").attr("class","point-label").attr("x",b(z.x)+8).attr("y",y(z.y)+4).attr("fill","var(--lv-text, #e4e4ec)").attr("font-size","11px").attr("opacity",e?0:.9).text(z.label);e&&I.transition().delay(L*30+200).duration(300).attr("opacity",.9)})}const E=this._svg.select(".legend-group");if(E.selectAll("*").remove(),c.length>0){const P=gi+5;let z=vt.left;for(const L of c){const I=this._clusterColor(L);E.append("circle").attr("cx",z+5).attr("cy",P+8).attr("r",4).attr("fill",I),E.append("text").attr("class","legend-text").attr("x",z+14).attr("y",P+8).attr("dominant-baseline","central").text(String(L)),z+=14+String(L).length*7+20}}}}customElements.define("lv-scatter",Hp);const Vp=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Xp=`
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
`,un=300,Yp=130,Fa=26,Ia=16;class Gp extends R{constructor(){super(...arguments);O(this,"_data",[]);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null)}static get observedAttributes(){return["data","donut","legend"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Xp),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Vp[e%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=J(e),this._svg.append("g").attr("class","arcs-group"),this._svg.append("g").attr("class","labels-group"),this._svg.append("g").attr("class","hover-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("donut"),s=this.hasAttribute("legend"),a=Yp,o=i?a*.6:0,c=a+5,l=s?r.length:0,u=l>0?Ia+l*Fa:0,h=un+u;this._svg.attr("viewBox",`0 0 ${un} ${h}`);const f=un/2,d=un/2,p=Sp().value(A=>A.value).sort(null).padAngle(.015)(r),m=Aa().innerRadius(o).outerRadius(a),b=Aa().innerRadius(o).outerRadius(c),y=this._svg.select(".arcs-group").attr("transform",`translate(${f},${d})`);y.selectAll("*").remove();const v=this._svg.select(".hover-group").attr("transform",`translate(${f},${d})`);v.selectAll("*").remove();const _=v.append("text").attr("class","hover-label").attr("x",0).attr("y",0),x=v.append("text").attr("class","hover-label").attr("x",0).attr("y",18).style("font-size","11px").style("font-weight","400");for(let A=0;A<p.length;A++){const w=p[A],C=this._getColor(A,w.data),T=y.append("path").attr("class","arc").attr("fill",C).attr("stroke","var(--lv-bg, #0f0f23)").attr("stroke-width",1.5);if(e){const S={...w,endAngle:w.startAngle};T.attr("d",m(S)).transition().delay(A*120).duration(800).ease(an).attrTween("d",()=>{const M=ce(S,w);return E=>m(M(E))})}else T.attr("d",m(w));T.on("mouseenter",()=>{if(T.transition().duration(150).attr("d",b(w)),i)_.text(w.data.label).classed("visible",!0),x.text(String(w.data.value)).classed("visible",!0);else{const[S,M]=m.centroid(w);_.attr("x",S*1.6).attr("y",M*1.6-8).text(w.data.label).classed("visible",!0),x.attr("x",S*1.6).attr("y",M*1.6+8).text(String(w.data.value)).classed("visible",!0)}}).on("mouseleave",()=>{T.transition().duration(150).attr("d",m(w)),_.classed("visible",!1),x.classed("visible",!1)})}const k=this._svg.select(".labels-group").attr("transform",`translate(${f},${d})`);if(k.selectAll("*").remove(),!s)for(let A=0;A<p.length;A++){const w=p[A];if(w.endAngle-w.startAngle>.35){const[T,S]=m.centroid(w),M=k.append("text").attr("class","arc-label").attr("x",T).attr("y",S).text(w.data.label);e&&M.attr("opacity",0).transition().delay(A*120+600).duration(300).attr("opacity",1)}}const $=this._svg.select(".legend-group");if($.selectAll("*").remove(),s&&r.length>0){const A=un+Ia;for(let w=0;w<r.length;w++){const T=A+w*Fa,S=this._getColor(w,r[w]);$.append("rect").attr("class","legend-swatch").attr("x",20).attr("y",T-5).attr("width",10).attr("height",10).attr("fill",S),$.append("text").attr("class","legend-text").attr("x",38).attr("y",T).attr("dominant-baseline","central").text(`${r[w].label} (${r[w].value})`)}}}}customElements.define("lv-pie",Gp);const Up=`
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
`,ot=120,Ot=90,_i=60,mi=40,qa=10,Ba=2,Ha=8,hn=60;function vi(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class Wp extends R{constructor(){super(...arguments);O(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(Up),this._readChildren(),this._renderSvg()}_readChildren(){this._steps=[],this.querySelectorAll("lv-flow-step").forEach(r=>{this._steps.push({icon:r.getAttribute("icon")||"",label:r.getAttribute("label")||"",sub:r.getAttribute("sub")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",active:r.hasAttribute("active")})})}_renderSvg(){const e=this._steps;if(e.length===0)return;const i=(this.getAttribute("direction")||"horizontal")==="horizontal",s=this.hasAttribute("cyclic"),a=this.isRtl,o=24,c=s?hn+40:0;let l,u;i?(l=o*2+e.length*ot+(e.length-1)*_i,u=o*2+Ot+c):(l=o*2+ot+c,u=o*2+e.length*Ot+(e.length-1)*mi);const h=[];for(let v=0;v<e.length;v++)if(i){let _=o+v*(ot+_i);a&&(_=l-o-ot-v*(ot+_i)),h.push({x:_,y:o})}else h.push({x:o,y:o+v*(Ot+mi)});const f="arrowhead",d=Ha,g=Ha,p=`
      <defs>
        <marker id="${f}" markerWidth="${d}" markerHeight="${g}"
                refX="${d}" refY="${g/2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${d},${g/2} L0,${g} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;let m="";for(let v=0;v<e.length;v++){const _=e[v],x=h[v],k=_.active?_.color:"var(--lv-border, #333)",$=_.active?' filter="url(#glow)"':"";m+=`
        <g class="step-group" style="transition-delay: ${v*150}ms">
          <rect x="${x.x}" y="${x.y}" width="${ot}" height="${Ot}"
                rx="${qa}" ry="${qa}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${k}" stroke-width="${_.active?2.5:1.5}"
                ${$} />
          <text x="${x.x+ot/2}" y="${x.y+30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${vi(_.icon)}
          </text>
          <text x="${x.x+ot/2}" y="${x.y+54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${vi(_.label)}
          </text>
          <text x="${x.x+ot/2}" y="${x.y+70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${vi(_.sub)}
          </text>
        </g>`}let b="";for(let v=0;v<e.length-1;v++){const _=h[v],x=h[v+1],k=e.length*150+v*120;let $;if(i){const w=a?_.x:_.x+ot,C=a?x.x+ot:x.x,T=_.y+Ot/2,M=Math.abs(C-w)*.35,E=C>w?1:-1;$=`M${w},${T} C${w+E*M},${T} ${C-E*M},${T} ${C},${T}`}else{const w=_.x+ot/2,C=_.y+Ot,T=x.y,S=(T-C)*.4;$=`M${w},${C} C${w},${C+S} ${w},${T-S} ${w},${T}`}const A=i?Math.abs(h[v+1].x-h[v].x)+20:mi+Ot;b+=`
        <path class="arrow-path" d="${$}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Ba}"
              marker-end="url(#${f})"
              stroke-dasharray="${A}"
              stroke-dashoffset="${A}"
              style="transition-delay: ${k}ms" />`}if(s&&e.length>1){const v=h[0],_=h[e.length-1],x=e.length*150+(e.length-1)*120;let k,$;if(i){const A=_.x+ot/2,w=v.x+ot/2,C=_.y+Ot,T=v.y+Ot,S=Math.max(C,T)+hn;k=`M${A},${C} C${A},${S} ${w},${S} ${w},${T}`,$=Math.abs(A-w)+hn*2}else{const A=_.x+ot,w=_.y+Ot/2,C=v.y+Ot/2,T=A+hn;k=`M${A},${w} C${T},${w} ${T},${C} ${A},${C}`,$=Math.abs(w-C)+hn*2}b+=`
        <path class="arrow-path" d="${k}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Ba}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${x}ms" />`}const y=`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${b}
        ${m}
      </svg>`;this.render(y)}animateIn(e){e&&(this.root.querySelectorAll(".step-group").forEach(r=>{r.style.transition="none",r.style.opacity="1",r.style.transform="translateY(0)"}),this.root.querySelectorAll(".arrow-path").forEach(r=>{r.style.transition="none",r.style.strokeDashoffset="0"})),this.classList.add("lv-entered")}}class jp extends HTMLElement{}customElements.define("lv-flow",Wp),customElements.define("lv-flow-step",jp);const Kp=`
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
`;function Va(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class Zp extends R{constructor(){super(...arguments);O(this,"_items",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(Kp),this._readChildren(),this._renderTimeline()}_readChildren(){this._items=[],this.querySelectorAll("lv-timeline-item").forEach(r=>{this._items.push({date:r.getAttribute("date")||"",title:r.getAttribute("title")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",body:r.innerHTML.trim()})})}_renderTimeline(){if(this._items.length===0)return;let e="";for(let r=0;r<this._items.length;r++){const i=this._items[r];e+=`
        <div class="tl-item" style="animation-delay: ${r*100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date?`<div class="tl-date">${Va(i.date)}</div>`:""}
            ${i.title?`<div class="tl-title">${Va(i.title)}</div>`:""}
            ${i.body?`<div class="tl-body">${i.body}</div>`:""}
          </div>
        </div>`}this.render(`<div class="timeline">${e}</div>`)}animateIn(e){e&&this.root.querySelectorAll(".tl-item").forEach(r=>{r.style.animation="none",r.style.opacity="1",r.style.transform="translateX(0)"}),this.classList.add("lv-entered")}}class Qp extends HTMLElement{}customElements.define("lv-timeline",Zp),customElements.define("lv-timeline-item",Qp);function Yt(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Xa(n,t){n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ze={duration:.5,overwrite:!1,delay:0},xi,et,Y,St=1e8,B=1/St,bi=Math.PI*2,Jp=bi/4,t0=0,Ya=Math.sqrt,e0=Math.cos,n0=Math.sin,tt=function(t){return typeof t=="string"},j=function(t){return typeof t=="function"},Gt=function(t){return typeof t=="number"},yi=function(t){return typeof t>"u"},Ft=function(t){return typeof t=="object"},ft=function(t){return t!==!1},wi=function(){return typeof window<"u"},dr=function(t){return j(t)||tt(t)},Ga=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},it=Array.isArray,r0=/random\([^)]+\)/g,i0=/,\s*/g,Ua=/(?:-?\.?\d|\.)+/gi,Wa=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Oe=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ki=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ja=/[+-]=-?[.\d]+/,s0=/[^,'"\[\]\s]+/gi,a0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,G,It,Ai,Ci,bt={},pr={},Ka,Za=function(t){return(pr=Ne(t,bt))&&gt},$i=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},fn=function(t,e){return!e&&console.warn(t)},Qa=function(t,e){return t&&(bt[t]=e)&&pr&&(pr[t]=e)||bt},dn=function(){return 0},o0={suppressEvents:!0,isStart:!0,kill:!1},gr={suppressEvents:!0,kill:!1},l0={suppressEvents:!0},Si={},Kt=[],Ti={},Ja,yt={},Mi={},to=30,_r=[],Ei="",Pi=function(t){var e=t[0],r,i;if(Ft(e)||j(e)||(t=[t]),!(r=(e._gsap||{}).harness)){for(i=_r.length;i--&&!_r[i].targetTest(e););r=_r[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Eo(t[i],r)))||t.splice(i,1);return t},ge=function(t){return t._gsap||Pi(Mt(t))[0]._gsap},eo=function(t,e,r){return(r=t[e])&&j(r)?t[e]():yi(r)&&t.getAttribute&&t.getAttribute(e)||r},dt=function(t,e){return(t=t.split(",")).forEach(e)||t},K=function(t){return Math.round(t*1e5)/1e5||0},U=function(t){return Math.round(t*1e7)/1e7||0},Le=function(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),r==="+"?t+i:r==="-"?t-i:r==="*"?t*i:t/i},c0=function(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r},mr=function(){var t=Kt.length,e=Kt.slice(0),r,i;for(Ti={},Kt.length=0,r=0;r<t;r++)i=e[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},zi=function(t){return!!(t._initted||t._startAt||t.add)},no=function(t,e,r,i){Kt.length&&!et&&mr(),t.render(e,r,!!(et&&e<0&&zi(t))),Kt.length&&!et&&mr()},ro=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(s0).length<2?e:tt(t)?t.trim():t},io=function(t){return t},wt=function(t,e){for(var r in e)r in t||(t[r]=e[r]);return t},u0=function(t){return function(e,r){for(var i in r)i in e||i==="duration"&&t||i==="ease"||(e[i]=r[i])}},Ne=function(t,e){for(var r in e)t[r]=e[r];return t},so=function n(t,e){for(var r in e)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(t[r]=Ft(e[r])?n(t[r]||(t[r]={}),e[r]):e[r]);return t},vr=function(t,e){var r={},i;for(i in t)i in e||(r[i]=t[i]);return r},pn=function(t){var e=t.parent||G,r=t.keyframes?u0(it(t.keyframes)):wt;if(ft(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t},h0=function(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0},ao=function(t,e,r,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},xr=function(t,e,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[r]===e&&(t[r]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Zt=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},_e=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t},f0=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Oi=function(t,e,r,i){return t._startAt&&(et?t._startAt.revert(gr):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},d0=function n(t){return!t||t._ts&&n(t.parent)},oo=function(t){return t._repeat?Re(t._tTime,t=t.duration()+t._rDelay)*t:0},Re=function(t,e){var r=Math.floor(t=U(t/e));return t&&r===t?r-1:r},br=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},yr=function(t){return t._end=U(t._start+(t._tDur/Math.abs(t._ts||t._rts||B)||0))},wr=function(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=U(r._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),yr(t),r._dirty||_e(r,t)),t},lo=function(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=br(t.rawTime(),e),(!e._dur||_n(0,e.totalDuration(),r)-e._tTime>B)&&e.render(r,!0)),_e(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;t._zTime=-B}},qt=function(t,e,r,i){return e.parent&&Zt(e),e._start=U((Gt(r)?r:r||t!==G?Tt(t,r,e):t._time)+e._delay),e._end=U(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),ao(t,e,"_first","_last",t._sort?"_start":0),Li(e)||(t._recent=e),i||lo(t,e),t._ts<0&&wr(t,t._tTime),t},co=function(t,e){return(bt.ScrollTrigger||$i("scrollTrigger",e))&&bt.ScrollTrigger.create(e,t)},uo=function(t,e,r,i,s){if(Vi(t,e,s),!t._initted)return 1;if(!r&&t._pt&&!et&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Ja!==At.frame)return Kt.push(t),t._lazy=[s,i],1},p0=function n(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||n(e))},Li=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},g0=function(t,e,r,i){var s=t.ratio,a=e<0||!e&&(!t._start&&p0(t)&&!(!t._initted&&Li(t))||(t._ts<0||t._dp._ts<0)&&!Li(t))?0:1,o=t._rDelay,c=0,l,u,h;if(o&&t._repeat&&(c=_n(0,t._tDur,e),u=Re(c,o),t._yoyo&&u&1&&(a=1-a),u!==Re(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||et||i||t._zTime===B||!e&&t._zTime){if(!t._initted&&uo(t,e,i,r,c))return;for(h=t._zTime,t._zTime=e||(r?B:0),r||(r=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&Oi(t,e,r,!0),t._onUpdate&&!r&&kt(t,"onUpdate"),c&&t._repeat&&!r&&t.parent&&kt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Zt(t,1),!r&&!et&&(kt(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},_0=function(t,e,r){var i;if(r>e)for(i=t._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},De=function(t,e,r,i){var s=t._repeat,a=U(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:U(a*(s+1)+t._rDelay*s):a,o>0&&!i&&wr(t,t._tTime=t._tDur*o),t.parent&&yr(t),r||_e(t.parent,t),t},ho=function(t){return t instanceof lt?_e(t):De(t,t._dur)},m0={_start:0,endTime:dn,totalDuration:dn},Tt=function n(t,e,r){var i=t.labels,s=t._recent||m0,a=t.duration()>=St?s.endTime(!1):t._dur,o,c,l;return tt(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:r).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&r&&(c=c/100*(it(r)?r[0]:r).totalDuration()),o>1?n(t,e.substr(0,o-1),r)+c:a+c)):e==null?a:+e},gn=function(t,e,r){var i=Gt(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=r,t){for(o=a,c=r;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=ft(c.vars.inherit)&&c.parent;a.immediateRender=ft(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Z(e[0],a,e[s+1])},Qt=function(t,e){return t||t===0?e(t):e},_n=function(t,e,r){return r<t?t:r>e?e:r},st=function(t,e){return!tt(t)||!(e=a0.exec(t))?"":e[1]},v0=function(t,e,r){return Qt(r,function(i){return _n(t,e,i)})},Ni=[].slice,fo=function(t,e){return t&&Ft(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ft(t[0]))&&!t.nodeType&&t!==It},x0=function(t,e,r){return r===void 0&&(r=[]),t.forEach(function(i){var s;return tt(i)&&!e||fo(i,1)?(s=r).push.apply(s,Mt(i)):r.push(i)})||r},Mt=function(t,e,r){return Y&&!e&&Y.selector?Y.selector(t):tt(t)&&!r&&(Ai||!Ie())?Ni.call((e||Ci).querySelectorAll(t),0):it(t)?x0(t,r):fo(t)?Ni.call(t,0):t?[t]:[]},Ri=function(t){return t=Mt(t)[0]||fn("Invalid scope")||{},function(e){var r=t.current||t.nativeElement||t;return Mt(e,r.querySelectorAll?r:r===t?fn("Invalid scope")||Ci.createElement("div"):t)}},po=function(t){return t.sort(function(){return .5-Math.random()})},go=function(t){if(j(t))return t;var e=Ft(t)?t:{each:t},r=me(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,u=i,h=i;return tt(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(u=i[0],h=i[1]),function(f,d,g){var p=(g||e).length,m=a[p],b,y,v,_,x,k,$,A,w;if(!m){if(w=e.grid==="auto"?0:(e.grid||[1,St])[1],!w){for($=-St;$<($=g[w++].getBoundingClientRect().left)&&w<p;);w<p&&w--}for(m=a[p]=[],b=c?Math.min(w,p)*u-.5:i%w,y=w===St?0:c?p*h/w-.5:i/w|0,$=0,A=St,k=0;k<p;k++)v=k%w-b,_=y-(k/w|0),m[k]=x=l?Math.abs(l==="y"?_:v):Ya(v*v+_*_),x>$&&($=x),x<A&&(A=x);i==="random"&&po(m),m.max=$-A,m.min=A,m.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(w>p?p-1:l?l==="y"?p/w:w:Math.max(w,p/w))||0)*(i==="edges"?-1:1),m.b=p<0?s-p:s,m.u=st(e.amount||e.each)||0,r=r&&p<0?So(r):r}return p=(m[f]-m.min)/m.max||0,U(m.b+(r?r(p):p)*m.v)+m.u}},Di=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(r){var i=U(Math.round(parseFloat(r)/t)*t*e);return(i-i%1)/e+(Gt(r)?0:st(r))}},_o=function(t,e){var r=it(t),i,s;return!r&&Ft(t)&&(i=r=t.radius||St,t.values?(t=Mt(t.values),(s=!Gt(t[0]))&&(i*=i)):t=Di(t.increment)),Qt(e,r?j(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=St,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-o,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-o),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:a,s||u===a||Gt(a)?u:u+st(a)}:Di(t))},mo=function(t,e,r,i){return Qt(it(t)?!e:r===!0?!!(r=0):!i,function(){return it(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+r*.99))/r)*r*i)/i})},b0=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(i){return e.reduce(function(s,a){return a(s)},i)}},y0=function(t,e){return function(r){return t(parseFloat(r))+(e||st(r))}},w0=function(t,e,r){return xo(t,e,0,1,r)},vo=function(t,e,r){return Qt(r,function(i){return t[~~e(i)]})},k0=function n(t,e,r){var i=e-t;return it(t)?vo(t,n(0,t.length),e):Qt(r,function(s){return(i+(s-t)%i)%i+t})},A0=function n(t,e,r){var i=e-t,s=i*2;return it(t)?vo(t,n(0,t.length-1),e):Qt(r,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},mn=function(t){return t.replace(r0,function(e){var r=e.indexOf("[")+1,i=e.substring(r||7,r?e.indexOf("]"):e.length-1).split(i0);return mo(r?i:+i[0],r?0:+i[1],+i[2]||1e-5)})},xo=function(t,e,r,i,s){var a=e-t,o=i-r;return Qt(s,function(c){return r+((c-t)/a*o||0)})},C0=function n(t,e,r,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=tt(t),o={},c,l,u,h,f;if(r===!0&&(i=1)&&(r=null),a)t={p:t},e={p:e};else if(it(t)&&!it(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(n(t[l-1],t[l]));h--,s=function(g){g*=h;var p=Math.min(f,~~g);return u[p](g-p)},r=e}else i||(t=Ne(it(t)?[]:{},t));if(!u){for(c in e)Bi.call(o,t,c,"get",e[c]);s=function(g){return Gi(g,o)||(a?t.p:t)}}}return Qt(r,s)},bo=function(t,e,r){var i=t.labels,s=St,a,o,c;for(a in i)o=i[a]-e,o<0==!!r&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},kt=function(t,e,r){var i=t.vars,s=i[e],a=Y,o=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,r&&Kt.length&&mr(),o&&(Y=o),u=c?s.apply(l,c):s.call(l),Y=a,u},vn=function(t){return Zt(t),t.scrollTrigger&&t.scrollTrigger.kill(!!et),t.progress()<1&&kt(t,"onInterrupt"),t},Fe,yo=[],wo=function(t){if(t)if(t=!t.name&&t.default||t,wi()||t.headless){var e=t.name,r=j(t),i=e&&!r&&t.init?function(){this._props=[]}:t,s={init:dn,render:Gi,add:Bi,kill:B0,modifier:q0,rawVars:0},a={targetTest:0,get:0,getSetter:Yi,aliases:{},register:0};if(Ie(),t!==i){if(yt[e])return;wt(i,wt(vr(t,s),a)),Ne(i.prototype,Ne(s,vr(t,a))),yt[i.prop=e]=i,t.targetTest&&(_r.push(i),Si[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Qa(e,i),t.register&&t.register(gt,i,pt)}else yo.push(t)},H=255,xn={aqua:[0,H,H],lime:[0,H,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,H],navy:[0,0,128],white:[H,H,H],olive:[128,128,0],yellow:[H,H,0],orange:[H,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[H,0,0],pink:[H,192,203],cyan:[0,H,H],transparent:[H,H,H,0]},Fi=function(t,e,r){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(r-e)*t*6:t<.5?r:t*3<2?e+(r-e)*(2/3-t)*6:e)*H+.5|0},ko=function(t,e,r){var i=t?Gt(t)?[t>>16,t>>8&H,t&H]:0:xn.black,s,a,o,c,l,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),xn[t])i=xn[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&H,i&H,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&H,t&H]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(Ua),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(l+1):u+l-u*l,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Fi(c+1/3,s,a),i[1]=Fi(c,s,a),i[2]=Fi(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match(Wa),r&&i.length<4&&(i[3]=1),i}else i=t.match(Ua)||xn.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/H,a=i[1]/H,o=i[2]/H,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),r&&i.length<4&&(i[3]=1),i},Ao=function(t){var e=[],r=[],i=-1;return t.split(Jt).forEach(function(s){var a=s.match(Oe)||[];e.push.apply(e,a),r.push(i+=a.length+1)}),e.c=r,e},Co=function(t,e,r){var i="",s=(t+i).match(Jt),a=e?"hsla(":"rgba(",o=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=ko(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),r&&(u=Ao(t),c=r.c,c.join(i)!==u.c.join(i)))for(l=t.replace(Jt,"1").split(Oe),h=l.length-1;o<h;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:r).shift());if(!l)for(l=t.split(Jt),h=l.length-1;o<h;o++)i+=l[o]+s[o];return i+l[h]},Jt=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in xn)n+="|"+t+"\\b";return new RegExp(n+")","gi")})(),$0=/hsl[a]?\(/,$o=function(t){var e=t.join(" "),r;if(Jt.lastIndex=0,Jt.test(e))return r=$0.test(e),t[1]=Co(t[1],r),t[0]=Co(t[0],r,Ao(t[1])),!0},bn,At=(function(){var n=Date.now,t=500,e=33,r=n(),i=r,s=1e3/240,a=s,o=[],c,l,u,h,f,d,g=function p(m){var b=n()-i,y=m===!0,v,_,x,k;if((b>t||b<0)&&(r+=b-e),i+=b,x=i-r,v=x-a,(v>0||y)&&(k=++h.frame,f=x-h.time*1e3,h.time=x=x/1e3,a+=v+(v>=s?4:s-v),_=1),y||(c=l(p)),_)for(d=0;d<o.length;d++)o[d](x,f,k,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Ka&&(!Ai&&wi()&&(It=Ai=window,Ci=It.document||{},bt.gsap=gt,(It.gsapVersions||(It.gsapVersions=[])).push(gt.version),Za(pr||It.GreenSockGlobals||!It.gsap&&It||{}),yo.forEach(wo)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(m){return setTimeout(m,a-h.time*1e3+1|0)},bn=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),bn=0,l=dn},lagSmoothing:function(m,b){t=m||1/0,e=Math.min(b||33,t)},fps:function(m){s=1e3/(m||240),a=h.time*1e3+s},add:function(m,b,y){var v=b?function(_,x,k,$){m(_,x,k,$),h.remove(v)}:m;return h.remove(m),o[y?"unshift":"push"](v),Ie(),v},remove:function(m,b){~(b=o.indexOf(m))&&o.splice(b,1)&&d>=b&&d--},_listeners:o},h})(),Ie=function(){return!bn&&At.wake()},F={},S0=/^[\d.\-M][\d.\-,\s]/,T0=/["']/g,M0=function(t){for(var e={},r=t.substr(1,t.length-3).split(":"),i=r[0],s=1,a=r.length,o,c,l;s<a;s++)c=r[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(T0,"").trim():+l,i=c.substr(o+1).trim();return e},E0=function(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)},P0=function(t){var e=(t+"").split("("),r=F[e[0]];return r&&e.length>1&&r.config?r.config.apply(null,~t.indexOf("{")?[M0(e[1])]:E0(t).split(",").map(ro)):F._CE&&S0.test(t)?F._CE("",t):r},So=function(t){return function(e){return 1-t(1-e)}},To=function n(t,e){for(var r=t._first,i;r;)r instanceof lt?n(r,e):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==e&&(r.timeline?n(r.timeline,e):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=e)),r=r._next},me=function(t,e){return t&&(j(t)?t:F[t]||P0(t))||e},ve=function(t,e,r,i){r===void 0&&(r=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:r,easeInOut:i},a;return dt(t,function(o){F[o]=bt[o]=s,F[a=o.toLowerCase()]=r;for(var c in s)F[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=F[o+"."+c]=s[c]}),s},Mo=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Ii=function n(t,e,r){var i=e>=1?e:1,s=(r||(t?.3:.45))/(e<1?e:1),a=s/bi*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*n0((u-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:Mo(o);return s=bi/s,c.config=function(l,u){return n(t,l,u)},c},qi=function n(t,e){e===void 0&&(e=1.70158);var r=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?r:t==="in"?function(s){return 1-r(1-s)}:Mo(r);return i.config=function(s){return n(t,s)},i};dt("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,t){var e=t<5?t+1:t;ve(n+",Power"+(e-1),t?function(r){return Math.pow(r,e)}:function(r){return r},function(r){return 1-Math.pow(1-r,e)},function(r){return r<.5?Math.pow(r*2,e)/2:1-Math.pow((1-r)*2,e)/2})}),F.Linear.easeNone=F.none=F.Linear.easeIn,ve("Elastic",Ii("in"),Ii("out"),Ii()),(function(n,t){var e=1/t,r=2*e,i=2.5*e,s=function(o){return o<e?n*o*o:o<r?n*Math.pow(o-1.5/t,2)+.75:o<i?n*(o-=2.25/t)*o+.9375:n*Math.pow(o-2.625/t,2)+.984375};ve("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75),ve("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)}),ve("Circ",function(n){return-(Ya(1-n*n)-1)}),ve("Sine",function(n){return n===1?1:-e0(n*Jp)+1}),ve("Back",qi("in"),qi("out"),qi()),F.SteppedEase=F.steps=bt.SteppedEase={config:function(t,e){t===void 0&&(t=1);var r=1/t,i=t+(e?0:1),s=e?1:0,a=1-B;return function(o){return((i*_n(0,a,o)|0)+s)*r}}},ze.ease=F["quad.out"],dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Ei+=n+","+n+"Params,"});var Eo=function(t,e){this.id=t0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:eo,this.set=e?e.getSetter:Yi},yn=(function(){function n(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,De(this,+e.duration,1,1),this.data=e.data,Y&&(this._ctx=Y,Y.data.push(this)),bn||At.wake()}var t=n.prototype;return t.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},t.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},t.totalDuration=function(r){return arguments.length?(this._dirty=0,De(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(r,i){if(Ie(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(wr(this,r),!s._dp||s.parent||lo(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&qt(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===B||!this._initted&&this._dur&&r||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),no(this,r,i)),this},t.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+oo(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},t.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+oo(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(r,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*s,i):this._repeat?Re(this._tTime,s)+1:1},t.timeScale=function(r,i){if(!arguments.length)return this._rts===-B?0:this._rts;if(this._rts===r)return this;var s=this.parent&&this._ts?br(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-B?0:this._rts,this.totalTime(_n(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),yr(this),f0(this)},t.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ie(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==B&&(this._tTime-=B)))),this):this._ps},t.startTime=function(r){if(arguments.length){this._start=U(r);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&qt(i,this,this._start-this._delay),this}return this._start},t.endTime=function(r){return this._start+(ft(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?br(i.rawTime(r),this):this._tTime:this._tTime},t.revert=function(r){r===void 0&&(r=l0);var i=et;return et=r,zi(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),et=i,this},t.globalTime=function(r){for(var i=this,s=arguments.length?r:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):s},t.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,ho(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,ho(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},t.seek=function(r,i){return this.totalTime(Tt(this,r),ft(i))},t.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,ft(i)),this._dur||(this._zTime=-B),this},t.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},t.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-B:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-B,this},t.isActive=function(){var r=this.parent||this._dp,i=this._start,s;return!!(!r||this._ts&&this._initted&&r.isActive()&&(s=r.rawTime(!0))>=i&&s<this.endTime(!0)-B)},t.eventCallback=function(r,i,s){var a=this.vars;return arguments.length>1?(i?(a[r]=i,s&&(a[r+"Params"]=s),r==="onUpdate"&&(this._onUpdate=i)):delete a[r],this):a[r]},t.then=function(r){var i=this,s=i._prom;return new Promise(function(a){var o=j(r)?r:io,c=function(){var u=i.then;i.then=null,s&&s(),j(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){vn(this)},n})();wt(yn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-B,_prom:0,_ps:!1,_rts:1});var lt=(function(n){Xa(t,n);function t(r,i){var s;return r===void 0&&(r={}),s=n.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=ft(r.sortChildren),G&&qt(r.parent||G,Yt(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&co(Yt(s),r.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return gn(0,arguments,this),this},e.from=function(i,s,a){return gn(1,arguments,this),this},e.fromTo=function(i,s,a,o){return gn(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,pn(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Z(i,s,Tt(this,a),1),this},e.call=function(i,s,a){return qt(this,Z.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new Z(i,a,Tt(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,u){return a.runBackwards=1,pn(a).immediateRender=ft(a.immediateRender),this.staggerTo(i,s,a,o,c,l,u)},e.staggerFromTo=function(i,s,a,o,c,l,u,h){return o.startAt=a,pn(o).immediateRender=ft(o.immediateRender),this.staggerTo(i,s,o,c,l,u,h)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:U(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,p,m,b,y,v,_,x,k,$;if(this!==G&&u>c&&i>=0&&(u=c),u!==this._tTime||a||h){if(o!==this._time&&l&&(u+=this._time-o,i+=this._time-o),f=u,_=this._start,v=this._ts,b=!v,h&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(k=this._yoyo,m=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(f=U(u%m),u===c?(p=this._repeat,f=l):(x=U(u/m),p=~~x,p&&p===x&&(f=l,p--),f>l&&(f=l)),x=Re(this._tTime,m),!o&&this._tTime&&x!==p&&this._tTime-x*m-this._dur<=0&&(x=p),k&&p&1&&(f=l-f,$=1),p!==x&&!this._lock){var A=k&&x&1,w=A===(k&&p&1);if(p<x&&(A=!A),o=A?0:u%l?l:u,this._lock=1,this.render(o||($?0:U(p*m)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&kt(this,"onRepeat"),this.vars.repeatRefresh&&!$&&(this.invalidate()._lock=1,x=p),o&&o!==this._time||b!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,w&&(this._lock=2,o=A?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!$&&this.invalidate()),this._lock=0,!this._ts&&!b)return this;To(this,$)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=_0(this,U(o),U(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&l&&!s&&!x&&(kt(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!b){y=0,g&&(u+=this._zTime=-B);break}}d=g}else{d=this._last;for(var C=i<0?i:f;d;){if(g=d._prev,(d._act||C<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||et&&zi(d)),f!==this._time||!this._ts&&!b){y=0,g&&(u+=this._zTime=C?-B:B);break}}d=g}}if(y&&!s&&(this.pause(),y.render(f>=o?0:-B)._zTime=f>=o?1:-1,this._ts))return this._start=_,yr(this),this.render(i,s,a);this._onUpdate&&!s&&kt(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&o)&&(_===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Zt(this,1),!s&&!(i<0&&!o)&&(u||o||!c)&&(kt(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Gt(s)||(s=Tt(this,s,i)),!(i instanceof yn)){if(it(i))return i.forEach(function(o){return a.add(o,s)}),this;if(tt(i))return this.addLabel(i,s);if(j(i))i=Z.delayedCall(0,i);else return this}return this!==i?qt(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-St);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof Z?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return tt(i)?this.removeLabel(i):j(i)?this.killTweensOf(i):(i.parent===this&&xr(this,i),i===this._recent&&(this._recent=this._last),_e(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=U(At.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),n.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Tt(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Z.delayedCall(0,s||dn,a);return o.data="isPause",this._hasPause=1,qt(this,o,Tt(this,i))},e.removePause=function(i){var s=this._first;for(i=Tt(this,i);s;)s._start===i&&s.data==="isPause"&&Zt(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)te!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Mt(i),c=this._first,l=Gt(s),u;c;)c instanceof Z?c0(c._targets,o)&&(l?(!te||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(u=c.getTweensOf(o,s)).length&&a.push.apply(a,u),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Tt(a,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=Z.to(a,wt({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||B,onStart:function(){if(a.pause(),!d){var m=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());g._dur!==m&&De(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,wt({startAt:{time:Tt(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),bo(this,Tt(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),bo(this,Tt(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+B)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=U(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return _e(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return n.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),_e(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=St,l,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,qt(a,o,u-o._delay,1)._lock=0):c=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=U(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;De(a,a===G&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(G._ts&&(no(G,br(i,G)),Ja=At.frame),At.frame>=to){to+=xt.autoSleep||120;var s=G._first;if((!s||!s._ts)&&xt.autoSleep&&At._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||At.sleep()}}},t})(yn);wt(lt.prototype,{_lock:0,_hasPause:0,_forcing:0});var z0=function(t,e,r,i,s,a,o){var c=new pt(this._pt,t,e,0,1,Ro,null,s),l=0,u=0,h,f,d,g,p,m,b,y;for(c.b=r,c.e=i,r+="",i+="",(b=~i.indexOf("random("))&&(i=mn(i)),a&&(y=[r,i],a(y,t,e),r=y[0],i=y[1]),f=r.match(ki)||[];h=ki.exec(i);)g=h[0],p=i.substring(l,h.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:p||u===1?p:",",s:m,c:g.charAt(1)==="="?Le(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},l=ki.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(ja.test(i)||b)&&(c.e=0),this._pt=c,c},Bi=function(t,e,r,i,s,a,o,c,l,u){j(i)&&(i=i(s||0,t,a));var h=t[e],f=r!=="get"?r:j(h)?l?t[e.indexOf("set")||!j(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=j(h)?l?D0:Lo:Xi,g;if(tt(i)&&(~i.indexOf("random(")&&(i=mn(i)),i.charAt(1)==="="&&(g=Le(f,i)+(st(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Hi)return!isNaN(f*i)&&i!==""?(g=new pt(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?I0:No,0,d),l&&(g.fp=l),o&&g.modifier(o,this,t),this._pt=g):(!h&&!(e in t)&&$i(e,i),z0.call(this,t,e,f,i,d,c||xt.stringFilter,l))},O0=function(t,e,r,i,s){if(j(t)&&(t=wn(t,s,e,r,i)),!Ft(t)||t.style&&t.nodeType||it(t)||Ga(t))return tt(t)?wn(t,s,e,r,i):t;var a={},o;for(o in t)a[o]=wn(t[o],s,e,r,i);return a},Po=function(t,e,r,i,s,a){var o,c,l,u;if(yt[t]&&(o=new yt[t]).init(s,o.rawVars?e[t]:O0(e[t],i,s,a,r),r,i,a)!==!1&&(r._pt=c=new pt(r._pt,s,t,0,1,o.render,o,0,o.priority),r!==Fe))for(l=r._ptLookup[r._targets.indexOf(s)],u=o._props.length;u--;)l[o._props[u]]=c;return o},te,Hi,Vi=function n(t,e,r){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,p=t._startAt,m=t._targets,b=t.parent,y=b&&b.data==="nested"?b.vars.targets:m,v=t._overwrite==="auto"&&!xi,_=t.timeline,x,k,$,A,w,C,T,S,M,E,P,z,L;if(_&&(!f||!s)&&(s="none"),t._ease=me(s,ze.ease),t._yEase=h?So(me(h===!0?s:h,ze.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!_&&!!i.runBackwards,!_||f&&!i.stagger){if(S=m[0]?ge(m[0]).harness:0,z=S&&i[S.prop],x=vr(i,Si),p&&(p._zTime<0&&p.progress(1),e<0&&u&&o&&!d?p.render(-1,!0):p.revert(u&&g?gr:o0),p._lazy=0),a){if(Zt(t._startAt=Z.set(m,wt({data:"isStart",overwrite:!1,parent:b,immediateRender:!0,lazy:!p&&ft(c),startAt:null,delay:0,onUpdate:l&&function(){return kt(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(et||!o&&!d)&&t._startAt.revert(gr),o&&g&&e<=0&&r<=0){e&&(t._zTime=e);return}}else if(u&&g&&!p){if(e&&(o=!1),$=wt({overwrite:!1,data:"isFromStart",lazy:o&&!p&&ft(c),immediateRender:o,stagger:0,parent:b},x),z&&($[S.prop]=z),Zt(t._startAt=Z.set(m,$)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(et?t._startAt.revert(gr):t._startAt.render(-1,!0)),t._zTime=e,!o)n(t._startAt,B,B);else if(!e)return}for(t._pt=t._ptCache=0,c=g&&ft(c)||c&&!g,k=0;k<m.length;k++){if(w=m[k],T=w._gsap||Pi(m)[k]._gsap,t._ptLookup[k]=E={},Ti[T.id]&&Kt.length&&mr(),P=y===m?k:y.indexOf(w),S&&(M=new S).init(w,z||x,t,P,y)!==!1&&(t._pt=A=new pt(t._pt,w,M.name,0,1,M.render,M,0,M.priority),M._props.forEach(function(I){E[I]=A}),M.priority&&(C=1)),!S||z)for($ in x)yt[$]&&(M=Po($,x,t,P,w,y))?M.priority&&(C=1):E[$]=A=Bi.call(t,w,$,"get",x[$],P,y,0,i.stringFilter);t._op&&t._op[k]&&t.kill(w,t._op[k]),v&&t._pt&&(te=t,G.killTweensOf(w,E,t.globalTime(e)),L=!t.parent,te=0),t._pt&&c&&(Ti[T.id]=1)}C&&Do(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!L,f&&e<=0&&_.render(St,!0,!0)},L0=function(t,e,r,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Hi=1,t.vars[e]="+=0",Vi(t,o),Hi=0,c?fn(e+" not eligible for reset"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=r-u.s,h.e&&(h.e=K(r)+st(h.e)),h.b&&(h.b=u.s+st(h.b))},N0=function(t,e){var r=t[0]?ge(t[0]).harness:0,i=r&&r.aliases,s,a,o,c;if(!i)return e;s=Ne({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},R0=function(t,e,r,i){var s=e.ease||i||"power1.inOut",a,o;if(it(e))o=r[t]||(r[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=r[a]||(r[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},wn=function(t,e,r,i,s){return j(t)?t.call(e,r,i,s):tt(t)&&~t.indexOf("random(")?mn(t):t},zo=Ei+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Oo={};dt(zo+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return Oo[n]=1});var Z=(function(n){Xa(t,n);function t(r,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=n.call(this,a?i:pn(i))||this;var c=o.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,p=c.defaults,m=c.scrollTrigger,b=c.yoyoEase,y=i.parent||G,v=(it(r)||Ga(r)?Gt(r[0]):"length"in i)?[r]:Mt(r),_,x,k,$,A,w,C,T;if(o._targets=v.length?Pi(v):fn("GSAP target "+r+" not found. https://gsap.com",!xt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||f||dr(l)||dr(u)){if(i=o.vars,_=o.timeline=new lt({data:"nested",defaults:p||{},targets:y&&y.data==="nested"?y.vars.targets:v}),_.kill(),_.parent=_._dp=Yt(o),_._start=0,f||dr(l)||dr(u)){if($=v.length,C=f&&go(f),Ft(f))for(A in f)~zo.indexOf(A)&&(T||(T={}),T[A]=f[A]);for(x=0;x<$;x++)k=vr(i,Oo),k.stagger=0,b&&(k.yoyoEase=b),T&&Ne(k,T),w=v[x],k.duration=+wn(l,Yt(o),x,w,v),k.delay=(+wn(u,Yt(o),x,w,v)||0)-o._delay,!f&&$===1&&k.delay&&(o._delay=u=k.delay,o._start+=u,k.delay=0),_.to(w,k,C?C(x,w,v):0),_._ease=F.none;_.duration()?l=u=0:o.timeline=0}else if(g){pn(wt(_.vars.defaults,{ease:"none"})),_._ease=me(g.ease||i.ease||"none");var S=0,M,E,P;if(it(g))g.forEach(function(z){return _.to(v,z,">")}),_.duration();else{k={};for(A in g)A==="ease"||A==="easeEach"||R0(A,g[A],k,g.easeEach);for(A in k)for(M=k[A].sort(function(z,L){return z.t-L.t}),S=0,x=0;x<M.length;x++)E=M[x],P={ease:E.e,duration:(E.t-(x?M[x-1].t:0))/100*l},P[A]=E.v,_.to(v,P,S),S+=P.duration;_.duration()<l&&_.to({},{duration:l-_.duration()})}}l||o.duration(l=_.duration())}else o.timeline=0;return d===!0&&!xi&&(te=Yt(o),G.killTweensOf(v),te=0),qt(y,Yt(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!l&&!g&&o._start===U(y._time)&&ft(h)&&d0(Yt(o))&&y.data!=="nested")&&(o._tTime=-B,o.render(Math.max(0,-u)||0)),m&&co(Yt(o),m),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-B&&!u?c:i<B?0:i,f,d,g,p,m,b,y,v,_;if(!l)g0(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,a);if(f=U(h%p),h===c?(g=this._repeat,f=l):(m=U(h/p),g=~~m,g&&g===m?(f=l,g--):f>l&&(f=l)),b=this._yoyo&&g&1,b&&(_=this._yEase,f=l-f),m=Re(this._tTime,p),f===o&&!a&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(v&&this._yEase&&To(v,b),this.vars.repeatRefresh&&!b&&!this._lock&&f!==p&&this._initted&&(this._lock=a=1,this.render(U(p*g),!0).invalidate()._lock=0))}if(!this._initted){if(uo(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(_||this._ease)(f/l),this._from&&(this.ratio=y=1-y),!o&&h&&!s&&!m&&(kt(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Oi(this,i,s,a),kt(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&kt(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Oi(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Zt(this,1),!s&&!(u&&!o)&&(h||o||b)&&(kt(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),n.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){bn||At.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Vi(this,l),u=this._ease(l/this._dur),L0(this,i,s,a,o,u,l,c)?this.resetTo(i,s,a,o,1):(wr(this,0),this.parent||ao(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?vn(this):this.scrollTrigger&&this.scrollTrigger.kill(!!et),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,te&&te.vars.overwrite!==!0)._first||vn(this),this.parent&&a!==this.timeline.totalDuration()&&De(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?Mt(i):o,l=this._ptLookup,u=this._pt,h,f,d,g,p,m,b;if((!s||s==="all")&&h0(o,c))return s==="all"&&(this._pt=0),vn(this);for(h=this._op=this._op||[],s!=="all"&&(tt(s)&&(p={},dt(s,function(y){return p[y]=1}),s=p),s=N0(o,s)),b=o.length;b--;)if(~c.indexOf(o[b])){f=l[b],s==="all"?(h[b]=s,g=f,d={}):(d=h[b]=h[b]||{},g=s);for(p in g)m=f&&f[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&xr(this,m,"_pt"),delete f[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&vn(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return gn(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return gn(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return G.killTweensOf(i,s,a)},t})(yn);wt(Z.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),dt("staggerTo,staggerFrom,staggerFromTo",function(n){Z[n]=function(){var t=new lt,e=Ni.call(arguments,0);return e.splice(n==="staggerFromTo"?5:4,0,0),t[n].apply(t,e)}});var Xi=function(t,e,r){return t[e]=r},Lo=function(t,e,r){return t[e](r)},D0=function(t,e,r,i){return t[e](i.fp,r)},F0=function(t,e,r){return t.setAttribute(e,r)},Yi=function(t,e){return j(t[e])?Lo:yi(t[e])&&t.setAttribute?F0:Xi},No=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},I0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Ro=function(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round((r.s+r.c*t)*1e4)/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},Gi=function(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},q0=function(t,e,r,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,r),s=a},B0=function(t){for(var e=this._pt,r,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?xr(this,e,"_pt"):e.dep||(r=1),e=i;return!r},H0=function(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)},Do=function(t){for(var e=t._pt,r,i,s,a;e;){for(r=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=r}t._pt=s},pt=(function(){function n(e,r,i,s,a,o,c,l,u){this.t=r,this.s=s,this.c=a,this.p=i,this.r=o||No,this.d=c||this,this.set=l||Xi,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=n.prototype;return t.modifier=function(r,i,s){this.mSet=this.mSet||this.set,this.set=H0,this.m=r,this.mt=s,this.tween=i},n})();dt(Ei+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Si[n]=1}),bt.TweenMax=bt.TweenLite=Z,bt.TimelineLite=bt.TimelineMax=lt,G=new lt({sortChildren:!1,defaults:ze,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),xt.stringFilter=$o;var xe=[],kr={},V0=[],Fo=0,X0=0,Ui=function(t){return(kr[t]||V0).map(function(e){return e()})},Wi=function(){var t=Date.now(),e=[];t-Fo>2&&(Ui("matchMediaInit"),xe.forEach(function(r){var i=r.queries,s=r.conditions,a,o,c,l;for(o in i)a=It.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(r.revert(),c&&e.push(r))}),Ui("matchMediaRevert"),e.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),Fo=t,Ui("matchMedia"))},Io=(function(){function n(e,r){this.selector=r&&Ri(r),this.data=[],this._r=[],this.isReverted=!1,this.id=X0++,e&&this.add(e)}var t=n.prototype;return t.add=function(r,i,s){j(r)&&(s=i,i=r,r=j);var a=this,o=function(){var l=Y,u=a.selector,h;return l&&l!==a&&l.data.push(a),s&&(a.selector=Ri(s)),Y=a,h=i.apply(a,arguments),j(h)&&a._r.push(h),Y=l,a.selector=u,a.isReverted=!1,h};return a.last=o,r===j?o(a,function(c){return a.add(null,c)}):r?a[r]=o:o},t.ignore=function(r){var i=Y;Y=null,r(this),Y=i},t.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof n?r.push.apply(r,i.getTweens()):i instanceof Z&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(r,i){var s=this;if(r?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(r)}),c=s.data.length;c--;)l=s.data[c],l instanceof lt?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Z)&&l.revert&&l.revert(r);s._r.forEach(function(u){return u(r,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=xe.length;a--;)xe[a].id===this.id&&xe.splice(a,1)},t.revert=function(r){this.kill(r||{})},n})(),Y0=(function(){function n(e){this.contexts=[],this.scope=e,Y&&Y.data.push(this)}var t=n.prototype;return t.add=function(r,i,s){Ft(r)||(r={matches:r});var a=new Io(0,s||this.scope),o=a.conditions={},c,l,u;Y&&!a.selector&&(a.selector=Y.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=r;for(l in r)l==="all"?u=1:(c=It.matchMedia(r[l]),c&&(xe.indexOf(a)<0&&xe.push(a),(o[l]=c.matches)&&(u=1),c.addListener?c.addListener(Wi):c.addEventListener("change",Wi)));return u&&i(a,function(h){return a.add(null,h)}),this},t.revert=function(r){this.kill(r||{})},t.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},n})(),Ar={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(i){return wo(i)})},timeline:function(t){return new lt(t)},getTweensOf:function(t,e){return G.getTweensOf(t,e)},getProperty:function(t,e,r,i){tt(t)&&(t=Mt(t)[0]);var s=ge(t||{}).get,a=r?io:ro;return r==="native"&&(r=""),t&&(e?a((yt[e]&&yt[e].get||s)(t,e,r,i)):function(o,c,l){return a((yt[o]&&yt[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,r){if(t=Mt(t),t.length>1){var i=t.map(function(u){return gt.quickSetter(u,e,r)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var a=yt[e],o=ge(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(u){var h=new a;Fe._pt=0,h.init(t,r?u+r:u,Fe,0,[t]),h.render(1,h),Fe._pt&&Gi(1,Fe)}:o.set(t,c);return a?l:function(u){return l(t,c,r?u+r:u,o,1)}},quickTo:function(t,e,r){var i,s=gt.to(t,wt((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),a=function(c,l,u){return s.resetTo(e,c,l,u)};return a.tween=s,a},isTweening:function(t){return G.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=me(t.ease,ze.ease)),so(ze,t||{})},config:function(t){return so(xt,t||{})},registerEffect:function(t){var e=t.name,r=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!yt[o]&&!bt[o]&&fn(e+" effect requires "+o+" plugin.")}),Mi[e]=function(o,c,l){return r(Mt(o),wt(c||{},s),l)},a&&(lt.prototype[e]=function(o,c,l){return this.add(Mi[e](o,Ft(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){F[t]=me(e)},parseEase:function(t,e){return arguments.length?me(t,e):F},getById:function(t){return G.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var r=new lt(t),i,s;for(r.smoothChildTiming=ft(t.smoothChildTiming),G.remove(r),r._dp=0,r._time=r._tTime=G._time,i=G._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Z&&i.vars.onComplete===i._targets[0]))&&qt(r,i,i._start-i._delay),i=s;return qt(G,r,0),r},context:function(t,e){return t?new Io(t,e):Y},matchMedia:function(t){return new Y0(t)},matchMediaRefresh:function(){return xe.forEach(function(t){var e=t.conditions,r,i;for(i in e)e[i]&&(e[i]=!1,r=1);r&&t.revert()})||Wi()},addEventListener:function(t,e){var r=kr[t]||(kr[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function(t,e){var r=kr[t],i=r&&r.indexOf(e);i>=0&&r.splice(i,1)},utils:{wrap:k0,wrapYoyo:A0,distribute:go,random:mo,snap:_o,normalize:w0,getUnit:st,clamp:v0,splitColor:ko,toArray:Mt,selector:Ri,mapRange:xo,pipe:b0,unitize:y0,interpolate:C0,shuffle:po},install:Za,effects:Mi,ticker:At,updateRoot:lt.updateRoot,plugins:yt,globalTimeline:G,core:{PropTween:pt,globals:Qa,Tween:Z,Timeline:lt,Animation:yn,getCache:ge,_removeLinkedListItem:xr,reverting:function(){return et},context:function(t){return t&&Y&&(Y.data.push(t),t._ctx=Y),Y},suppressOverwrites:function(t){return xi=t}}};dt("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Ar[n]=Z[n]}),At.add(lt.updateRoot),Fe=Ar.to({},{duration:0});var G0=function(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r},U0=function(t,e){var r=t._targets,i,s,a;for(i in e)for(s=r.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=G0(a,i)),a&&a.modifier&&a.modifier(e[i],t,r[s],i))},ji=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(tt(s)&&(c={},dt(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}U0(o,s)}}}},gt=Ar.registerPlugin({name:"attr",init:function(t,e,r,i,s){var a,o,c;this.tween=r;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var r=e._pt;r;)et?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},ji("roundProps",Di),ji("modifiers"),ji("snap",_o))||Ar;Z.version=lt.version=gt.version="3.14.2",Ka=1,wi()&&Ie(),F.Power0,F.Power1,F.Power2,F.Power3,F.Power4,F.Linear,F.Quad,F.Cubic,F.Quart,F.Quint,F.Strong,F.Elastic,F.Back,F.SteppedEase,F.Bounce,F.Sine,F.Expo,F.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var qo,ee,qe,Ki,be,Bo,Zi,W0=function(){return typeof window<"u"},Ut={},ye=180/Math.PI,Be=Math.PI/180,He=Math.atan2,Ho=1e8,Qi=/([A-Z])/g,j0=/(left|right|width|margin|padding|x)/i,K0=/[\s,\(]\S/,Bt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ji=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Z0=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Q0=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},J0=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},tg=function(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)},Vo=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Xo=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},eg=function(t,e,r){return t.style[e]=r},ng=function(t,e,r){return t.style.setProperty(e,r)},rg=function(t,e,r){return t._gsap[e]=r},ig=function(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r},sg=function(t,e,r,i,s){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(s,a)},ag=function(t,e,r,i,s){var a=t._gsap;a[e]=r,a.renderTransform(s,a)},W="transform",_t=W+"Origin",og=function n(t,e){var r=this,i=this.target,s=i.style,a=i._gsap;if(t in Ut&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Bt[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return r.tfm[o]=Wt(i,o)}):this.tfm[t]=a.x?a[t]:Wt(i,t),t===_t&&(this.tfm.zOrigin=a.zOrigin);else return Bt.transform.split(",").forEach(function(o){return n.call(r,o,e)});if(this.props.indexOf(W)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(_t,e,"")),t=W}(s||e)&&this.props.push(t,e,s[t])},Yo=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},lg=function(){var t=this.props,e=this.target,r=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?r[t[s]]=t[s+2]:r.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Qi,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Zi(),(!s||!s.isStart)&&!r[W]&&(Yo(r),i.zOrigin&&r[_t]&&(r[_t]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Go=function(t,e){var r={target:t,props:[],revert:lg,save:og};return t._gsap||gt.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return r.save(i)}),r},Uo,ts=function(t,e){var r=ee.createElementNS?ee.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ee.createElement(t);return r&&r.style?r:ee.createElement(t)},Ct=function n(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Qi,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&n(t,Ve(e)||e,1)||""},Wo="O,Moz,ms,Ms,Webkit".split(","),Ve=function(t,e,r){var i=e||be,s=i.style,a=5;if(t in s&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Wo[a]+t in s););return a<0?null:(a===3?"ms":a>=0?Wo[a]:"")+t},es=function(){W0()&&window.document&&(qo=window,ee=qo.document,qe=ee.documentElement,be=ts("div")||{style:{}},ts("div"),W=Ve(W),_t=W+"Origin",be.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Uo=!!Ve("perspective"),Zi=gt.core.reverting,Ki=1)},jo=function(t){var e=t.ownerSVGElement,r=ts("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",r.appendChild(i),qe.appendChild(r);try{s=i.getBBox()}catch{}return r.removeChild(i),qe.removeChild(r),s},Ko=function(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])},Zo=function(t){var e,r;try{e=t.getBBox()}catch{e=jo(t),r=1}return e&&(e.width||e.height)||r||(e=jo(t)),e&&!e.width&&!e.x&&!e.y?{x:+Ko(t,["x","cx","x1"])||0,y:+Ko(t,["y","cy","y1"])||0,width:0,height:0}:e},Qo=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Zo(t))},ne=function(t,e){if(e){var r=t.style,i;e in Ut&&e!==_t&&(e=W),r.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),r.removeProperty(i==="--"?e:e.replace(Qi,"-$1").toLowerCase())):r.removeAttribute(e)}},re=function(t,e,r,i,s,a){var o=new pt(t._pt,e,r,0,1,a?Xo:Vo);return t._pt=o,o.b=i,o.e=s,t._props.push(r),o},Jo={deg:1,rad:1,turn:1},cg={grid:1,flex:1},ie=function n(t,e,r,i){var s=parseFloat(r)||0,a=(r+"").trim().substr((s+"").length)||"px",o=be.style,c=j0.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,p,m,b;if(i===a||!s||Jo[i]||Jo[a])return s;if(a!=="px"&&!f&&(s=n(t,e,r,"px")),b=t.getCTM&&Qo(t),(d||a==="%")&&(Ut[e]||~e.indexOf("adius")))return g=b?t.getBBox()[c?"width":"height"]:t[u],K(d?s/g*h:s/100*g);if(o[c?"width":"height"]=h+(f?a:i),p=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,b&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===ee||!p.appendChild)&&(p=ee.body),m=p._gsap,m&&d&&m.width&&c&&m.time===At.time&&!m.uncache)return K(s/m.width*h);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+i,g=t[u],y?t.style[e]=y:ne(t,e)}else(d||a==="%")&&!cg[Ct(p,"display")]&&(o.position=Ct(t,"position")),p===t&&(o.position="static"),p.appendChild(be),g=be[u],p.removeChild(be),o.position="absolute";return c&&d&&(m=ge(p),m.time=At.time,m.width=p[u]),K(f?g*s/h:g&&s?h/g*s:0)},Wt=function(t,e,r,i){var s;return Ki||es(),e in Bt&&e!=="transform"&&(e=Bt[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ut[e]&&e!=="transform"?(s=An(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:$r(Ct(t,_t))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Cr[e]&&Cr[e](t,e,r)||Ct(t,e)||eo(t,e)||(e==="opacity"?1:0))),r&&!~(s+"").trim().indexOf(" ")?ie(t,e,s,r)+r:s},ug=function(t,e,r,i){if(!r||r==="none"){var s=Ve(e,t,1),a=s&&Ct(t,s,1);a&&a!==r?(e=s,r=a):e==="borderColor"&&(r=Ct(t,"borderTopColor"))}var o=new pt(this._pt,t.style,e,0,1,Ro),c=0,l=0,u,h,f,d,g,p,m,b,y,v,_,x;if(o.b=r,o.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=Ct(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(p=t.style[e],t.style[e]=i,i=Ct(t,e)||i,p?t.style[e]=p:ne(t,e)),u=[r,i],$o(u),r=u[0],i=u[1],f=r.match(Oe)||[],x=i.match(Oe)||[],x.length){for(;h=Oe.exec(i);)m=h[0],y=i.substring(c,h.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),m!==(p=f[l++]||"")&&(d=parseFloat(p)||0,_=p.substr((d+"").length),m.charAt(1)==="="&&(m=Le(d,m)+_),b=parseFloat(m),v=m.substr((b+"").length),c=Oe.lastIndex-v.length,v||(v=v||xt.units[e]||_,c===i.length&&(i+=v,o.e+=v)),_!==v&&(d=ie(t,e,p,v)||0),o._pt={_next:o._pt,p:y||l===1?y:",",s:d,c:b-d,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?Xo:Vo;return ja.test(i)&&(o.e=0),this._pt=o,o},tl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},hg=function(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(t=r,r=i,i=t),e[0]=tl[r]||r,e[1]=tl[i]||i,e.join(" ")},fg=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r=e.t,i=r.style,s=e.u,a=r._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],Ut[o]&&(c=1,o=o==="transformOrigin"?_t:W),ne(r,o);c&&(ne(r,W),a&&(a.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",An(r,1),a.uncache=1,Yo(i)))}},Cr={clearProps:function(t,e,r,i,s){if(s.data!=="isFromStart"){var a=t._pt=new pt(t._pt,e,r,0,0,fg);return a.u=i,a.pr=-10,a.tween=s,t._props.push(r),1}}},kn=[1,0,0,1,0,0],el={},nl=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},rl=function(t){var e=Ct(t,W);return nl(e)?kn:e.substr(7).match(Wa).map(K)},ns=function(t,e){var r=t._gsap||ge(t),i=t.style,s=rl(t),a,o,c,l;return r.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?kn:s):(s===kn&&!t.offsetParent&&t!==qe&&!r.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,qe.appendChild(t)),s=rl(t),c?i.display=c:ne(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):qe.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},rs=function(t,e,r,i,s,a){var o=t._gsap,c=s||ns(t,!0),l=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=c[0],g=c[1],p=c[2],m=c[3],b=c[4],y=c[5],v=e.split(" "),_=parseFloat(v[0])||0,x=parseFloat(v[1])||0,k,$,A,w;r?c!==kn&&($=d*m-g*p)&&(A=_*(m/$)+x*(-p/$)+(p*y-m*b)/$,w=_*(-g/$)+x*(d/$)-(d*y-g*b)/$,_=A,x=w):(k=Zo(t),_=k.x+(~v[0].indexOf("%")?_/100*k.width:_),x=k.y+(~(v[1]||v[0]).indexOf("%")?x/100*k.height:x)),i||i!==!1&&o.smooth?(b=_-l,y=x-u,o.xOffset=h+(b*d+y*p)-b,o.yOffset=f+(b*g+y*m)-y):o.xOffset=o.yOffset=0,o.xOrigin=_,o.yOrigin=x,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!r,t.style[_t]="0px 0px",a&&(re(a,o,"xOrigin",l,_),re(a,o,"yOrigin",u,x),re(a,o,"xOffset",h,o.xOffset),re(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",_+" "+x)},An=function(t,e){var r=t._gsap||new Eo(t);if("x"in r&&!e&&!r.uncache)return r;var i=t.style,s=r.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=Ct(t,_t)||"0",u,h,f,d,g,p,m,b,y,v,_,x,k,$,A,w,C,T,S,M,E,P,z,L,I,X,q,at,ct,Ge,$t,nt;return u=h=f=p=m=b=y=v=_=0,d=g=1,r.svg=!!(t.getCTM&&Qo(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[W]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[W]!=="none"?c[W]:"")),i.scale=i.rotate=i.translate="none"),$=ns(t,r.svg),r.svg&&(r.uncache?(I=t.getBBox(),l=r.xOrigin-I.x+"px "+(r.yOrigin-I.y)+"px",L=""):L=!e&&t.getAttribute("data-svg-origin"),rs(t,L||l,!!L||r.originIsAbsolute,r.smooth!==!1,$)),x=r.xOrigin||0,k=r.yOrigin||0,$!==kn&&(T=$[0],S=$[1],M=$[2],E=$[3],u=P=$[4],h=z=$[5],$.length===6?(d=Math.sqrt(T*T+S*S),g=Math.sqrt(E*E+M*M),p=T||S?He(S,T)*ye:0,y=M||E?He(M,E)*ye+p:0,y&&(g*=Math.abs(Math.cos(y*Be))),r.svg&&(u-=x-(x*T+k*M),h-=k-(x*S+k*E))):(nt=$[6],Ge=$[7],q=$[8],at=$[9],ct=$[10],$t=$[11],u=$[12],h=$[13],f=$[14],A=He(nt,ct),m=A*ye,A&&(w=Math.cos(-A),C=Math.sin(-A),L=P*w+q*C,I=z*w+at*C,X=nt*w+ct*C,q=P*-C+q*w,at=z*-C+at*w,ct=nt*-C+ct*w,$t=Ge*-C+$t*w,P=L,z=I,nt=X),A=He(-M,ct),b=A*ye,A&&(w=Math.cos(-A),C=Math.sin(-A),L=T*w-q*C,I=S*w-at*C,X=M*w-ct*C,$t=E*C+$t*w,T=L,S=I,M=X),A=He(S,T),p=A*ye,A&&(w=Math.cos(A),C=Math.sin(A),L=T*w+S*C,I=P*w+z*C,S=S*w-T*C,z=z*w-P*C,T=L,P=I),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,b=180-b),d=K(Math.sqrt(T*T+S*S+M*M)),g=K(Math.sqrt(z*z+nt*nt)),A=He(P,z),y=Math.abs(A)>2e-4?A*ye:0,_=$t?1/($t<0?-$t:$t):0),r.svg&&(L=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!nl(Ct(t,W)),L&&t.setAttribute("transform",L))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),e=e||r.uncache,r.x=u-((r.xPercent=u&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+a,r.y=h-((r.yPercent=h&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+a,r.z=f+a,r.scaleX=K(d),r.scaleY=K(g),r.rotation=K(p)+o,r.rotationX=K(m)+o,r.rotationY=K(b)+o,r.skewX=y+o,r.skewY=v+o,r.transformPerspective=_+a,(r.zOrigin=parseFloat(l.split(" ")[2])||!e&&r.zOrigin||0)&&(i[_t]=$r(l)),r.xOffset=r.yOffset=0,r.force3D=xt.force3D,r.renderTransform=r.svg?pg:Uo?il:dg,r.uncache=0,r},$r=function(t){return(t=t.split(" "))[0]+" "+t[1]},is=function(t,e,r){var i=st(e);return K(parseFloat(e)+parseFloat(ie(t,"x",r+"px",i)))+i},dg=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,il(t,e)},we="0deg",Cn="0px",ke=") ",il=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.z,l=r.rotation,u=r.rotationY,h=r.rotationX,f=r.skewX,d=r.skewY,g=r.scaleX,p=r.scaleY,m=r.transformPerspective,b=r.force3D,y=r.target,v=r.zOrigin,_="",x=b==="auto"&&t&&t!==1||b===!0;if(v&&(h!==we||u!==we)){var k=parseFloat(u)*Be,$=Math.sin(k),A=Math.cos(k),w;k=parseFloat(h)*Be,w=Math.cos(k),a=is(y,a,$*w*-v),o=is(y,o,-Math.sin(k)*-v),c=is(y,c,A*w*-v+v)}m!==Cn&&(_+="perspective("+m+ke),(i||s)&&(_+="translate("+i+"%, "+s+"%) "),(x||a!==Cn||o!==Cn||c!==Cn)&&(_+=c!==Cn||x?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+ke),l!==we&&(_+="rotate("+l+ke),u!==we&&(_+="rotateY("+u+ke),h!==we&&(_+="rotateX("+h+ke),(f!==we||d!==we)&&(_+="skew("+f+", "+d+ke),(g!==1||p!==1)&&(_+="scale("+g+", "+p+ke),y.style[W]=_||"translate(0, 0)"},pg=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.rotation,l=r.skewX,u=r.skewY,h=r.scaleX,f=r.scaleY,d=r.target,g=r.xOrigin,p=r.yOrigin,m=r.xOffset,b=r.yOffset,y=r.forceCSS,v=parseFloat(a),_=parseFloat(o),x,k,$,A,w;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=Be,l*=Be,x=Math.cos(c)*h,k=Math.sin(c)*h,$=Math.sin(c-l)*-f,A=Math.cos(c-l)*f,l&&(u*=Be,w=Math.tan(l-u),w=Math.sqrt(1+w*w),$*=w,A*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),x*=w,k*=w)),x=K(x),k=K(k),$=K($),A=K(A)):(x=h,A=f,k=$=0),(v&&!~(a+"").indexOf("px")||_&&!~(o+"").indexOf("px"))&&(v=ie(d,"x",a,"px"),_=ie(d,"y",o,"px")),(g||p||m||b)&&(v=K(v+g-(g*x+p*$)+m),_=K(_+p-(g*k+p*A)+b)),(i||s)&&(w=d.getBBox(),v=K(v+i/100*w.width),_=K(_+s/100*w.height)),w="matrix("+x+","+k+","+$+","+A+","+v+","+_+")",d.setAttribute("transform",w),y&&(d.style[W]=w)},gg=function(t,e,r,i,s){var a=360,o=tt(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?ye:1),l=c-i,u=i+l+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),h==="cw"&&l<0?l=(l+a*Ho)%a-~~(l/a)*a:h==="ccw"&&l>0&&(l=(l-a*Ho)%a-~~(l/a)*a)),t._pt=f=new pt(t._pt,e,r,i,l,Z0),f.e=u,f.u="deg",t._props.push(r),f},sl=function(t,e){for(var r in e)t[r]=e[r];return t},_g=function(t,e,r){var i=sl({},r._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=r.style,o,c,l,u,h,f,d,g;i.svg?(l=r.getAttribute("transform"),r.setAttribute("transform",""),a[W]=e,o=An(r,1),ne(r,W),r.setAttribute("transform",l)):(l=getComputedStyle(r)[W],a[W]=e,o=An(r,1),a[W]=l);for(c in Ut)l=i[c],u=o[c],l!==u&&s.indexOf(c)<0&&(d=st(l),g=st(u),h=d!==g?ie(r,c,l,g):parseFloat(l),f=parseFloat(u),t._pt=new pt(t._pt,o,c,h,f-h,Ji),t._pt.u=g||0,t._props.push(c));sl(o,i)};dt("padding,margin,Width,Radius",function(n,t){var e="Top",r="Right",i="Bottom",s="Left",a=(t<3?[e,r,i,s]:[e+s,e+r,i+r,i+s]).map(function(o){return t<2?n+o:"border"+o+n});Cr[t>1?"border"+n:n]=function(o,c,l,u,h){var f,d;if(arguments.length<4)return f=a.map(function(g){return Wt(o,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(g,p){return d[g]=f[p]=f[p]||f[(p-1)/2|0]}),o.init(c,d,h)}});var al={name:"css",register:es,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,r,i,s){var a=this._props,o=t.style,c=r.vars.startAt,l,u,h,f,d,g,p,m,b,y,v,_,x,k,$,A,w;Ki||es(),this.styles=this.styles||Go(t),A=this.styles.props,this.tween=r;for(p in e)if(p!=="autoRound"&&(u=e[p],!(yt[p]&&Po(p,e,r,i,t,s)))){if(d=typeof u,g=Cr[p],d==="function"&&(u=u.call(r,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=mn(u)),g)g(this,t,p,u,r)&&($=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(p)+"").trim(),u+="",Jt.lastIndex=0,Jt.test(l)||(m=st(l),b=st(u),b?m!==b&&(l=ie(t,p,l,b)+b):m&&(u+=m)),this.add(o,"setProperty",l,u,i,s,0,0,p),a.push(p),A.push(p,0,o[p]);else if(d!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(r,i,t,s):c[p],tt(l)&&~l.indexOf("random(")&&(l=mn(l)),st(l+"")||l==="auto"||(l+=xt.units[p]||st(Wt(t,p))||""),(l+"").charAt(1)==="="&&(l=Wt(t,p))):l=Wt(t,p),f=parseFloat(l),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),p in Bt&&(p==="autoAlpha"&&(f===1&&Wt(t,"visibility")==="hidden"&&h&&(f=0),A.push("visibility",0,o.visibility),re(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=Bt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),v=p in Ut,v){if(this.styles.save(p),w=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Ct(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=t.style.perspective;t.style.perspective=u,u=Ct(t,"perspective"),C?t.style.perspective=C:ne(t,"perspective")}h=parseFloat(u)}if(_||(x=t._gsap,x.renderTransform&&!e.parseTransform||An(t,e.parseTransform),k=e.smoothOrigin!==!1&&x.smooth,_=this._pt=new pt(this._pt,o,W,0,1,x.renderTransform,x,0,-1),_.dep=1),p==="scale")this._pt=new pt(this._pt,x,"scaleY",x.scaleY,(y?Le(x.scaleY,y+h):h)-x.scaleY||0,Ji),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){A.push(_t,0,o[_t]),u=hg(u),x.svg?rs(t,u,0,k,0,this):(b=parseFloat(u.split(" ")[2])||0,b!==x.zOrigin&&re(this,x,"zOrigin",x.zOrigin,b),re(this,o,p,$r(l),$r(u)));continue}else if(p==="svgOrigin"){rs(t,u,1,k,0,this);continue}else if(p in el){gg(this,x,p,f,y?Le(f,y+u):u);continue}else if(p==="smoothOrigin"){re(this,x,"smooth",x.smooth,u);continue}else if(p==="force3D"){x[p]=u;continue}else if(p==="transform"){_g(this,u,t);continue}}else p in o||(p=Ve(p)||p);if(v||(h||h===0)&&(f||f===0)&&!K0.test(u)&&p in o)m=(l+"").substr((f+"").length),h||(h=0),b=st(u)||(p in xt.units?xt.units[p]:m),m!==b&&(f=ie(t,p,l,b)),this._pt=new pt(this._pt,v?x:o,p,f,(y?Le(f,y+h):h)-f,!v&&(b==="px"||p==="zIndex")&&e.autoRound!==!1?tg:Ji),this._pt.u=b||0,v&&w!==u?(this._pt.b=l,this._pt.e=w,this._pt.r=J0):m!==b&&b!=="%"&&(this._pt.b=l,this._pt.r=Q0);else if(p in o)ug.call(this,t,p,l,y?y+u:u);else if(p in t)this.add(t,p,l||t[p],y?y+u:u,i,s);else if(p!=="parseTransform"){$i(p,u);continue}v||(p in o?A.push(p,0,o[p]):typeof t[p]=="function"?A.push(p,2,t[p]()):A.push(p,1,l||t[p])),a.push(p)}}$&&Do(this)},render:function(t,e){if(e.tween._time||!Zi())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:Wt,aliases:Bt,getSetter:function(t,e,r){var i=Bt[e];return i&&i.indexOf(",")<0&&(e=i),e in Ut&&e!==_t&&(t._gsap.x||Wt(t,"x"))?r&&Bo===r?e==="scale"?ig:rg:(Bo=r||{})&&(e==="scale"?sg:ag):t.style&&!yi(t.style[e])?eg:~e.indexOf("-")?ng:Yi(t,e)},core:{_removeProperty:ne,_getMatrix:ns}};gt.utils.checkPrefix=Ve,gt.core.getStyleSaver=Go,(function(n,t,e,r){var i=dt(n+","+t+","+e,function(s){Ut[s]=1});dt(t,function(s){xt.units[s]="deg",el[s]=1}),Bt[i[13]]=n+","+t,dt(r,function(s){var a=s.split(":");Bt[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){xt.units[n]="px"}),gt.registerPlugin(al);var $n=gt.registerPlugin(al)||gt;$n.core.Tween;const Xe={input:"#ff2d75",hidden:"#7b68ee",output:"#00d4ff"},Sn=36,Sr=100,ss=200,ol=50,as=60,mg=`
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;class vg extends R{constructor(){super(...arguments);O(this,"_svg",null);O(this,"_container",null);O(this,"_hasAnimated",!1);O(this,"_isAnimating",!1);O(this,"_resizeObserver",null);O(this,"_timeline",null)}static get observedAttributes(){return["layers","names","animate","speed"]}get _layers(){return this.jsonAttr("layers",[["x₁","x₂"],["h₁","h₂","h₃"],["ŷ"]])}get _names(){return this.jsonAttr("names",[])}get _animateMode(){return this.getAttribute("animate")||"none"}get _speed(){const e=parseInt(this.getAttribute("speed")||"",10);return isNaN(e)?600:e}connectedCallback(){super.connectedCallback(),this.adoptStyles(mg),this._container=document.createElement("div"),this.root.appendChild(this._container),this._initSvg(),this._render(),this._resizeObserver=new ResizeObserver(()=>{this._isAnimating||this._render()}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null,this._cancelAnimation()}handleAttributeChange(e,r,i){r!==i&&this._svg&&(this._cancelAnimation(),this._hasAnimated=!1,this._render())}animateIn(e){if(!this._hasAnimated){if(e||this._animateMode==="none"){this._hasAnimated=!0,this._render();return}this._runAnimation()}}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=J(e);const r=this._svg.append("defs"),i={input:Xe.input,hidden:Xe.hidden,output:Xe.output};for(const[s,a]of Object.entries(i))r.append("filter").attr("id",`glow-${s}`).attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",6).attr("flood-color",a).attr("flood-opacity",.7);this._svg.append("g").attr("class","connections-group"),this._svg.append("g").attr("class","nodes-group"),this._svg.append("g").attr("class","labels-group")}_computeLayout(){const e=this._layers,r=this.isRtl,i=e.length,s=Math.max(...e.map(u=>u.length),1),a=(i-1)*ss+as*2,o=(s-1)*Sr+ol+Sn+40,c=[],l=[];for(let u=0;u<i;u++){const h=e[u],f=r?a-as-u*ss:as+u*ss,d=(h.length-1)*Sr,g=ol+((s-1)*Sr-d)/2,p=[];for(let m=0;m<h.length;m++)p.push({layer:u,index:m,x:f,y:g+m*Sr,label:h[m]});c.push(p)}for(let u=0;u<i-1;u++)for(const h of c[u])for(const f of c[u+1])l.push({source:h,target:f});return{nodes:c,connections:l,width:a,height:o}}_layerColor(e,r){const i=getComputedStyle(this).getPropertyValue("--lv-net-input").trim()||Xe.input,s=getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim()||Xe.hidden,a=getComputedStyle(this).getPropertyValue("--lv-net-output").trim()||Xe.output;return e===0?i:e===r-1?a:s}_layerType(e,r){return e===0?"input":e===r-1?"output":"hidden"}_render(){if(!this._svg)return;const{nodes:e,connections:r,width:i,height:s}=this._computeLayout(),a=e.length,o=this._animateMode==="none"||this._hasAnimated,c=this._animateMode!=="none"&&!this._hasAnimated;this._svg.attr("viewBox",`0 0 ${i} ${s}`);const l=this._svg.select(".connections-group");l.selectAll("*").remove();for(const d of r)l.append("line").attr("class","connection").attr("x1",d.source.x).attr("y1",d.source.y).attr("x2",d.target.x).attr("y2",d.target.y).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1.5).attr("stroke-opacity",c?.08:.5).attr("data-source-layer",d.source.layer).attr("data-target-layer",d.target.layer);const u=this._svg.select(".nodes-group");u.selectAll("*").remove();for(const d of e)for(const g of d){const p=this._layerColor(g.layer,a),m=this._layerType(g.layer,a),b=u.append("g").attr("class","node").attr("data-layer",g.layer).attr("data-index",g.index).attr("transform",`translate(${g.x},${g.y})`).attr("opacity",c?.15:1);b.append("circle").attr("class","node-circle").attr("data-layer",g.layer).attr("r",Sn).attr("fill",p).attr("stroke",p).attr("stroke-width",2).attr("fill-opacity",o?.2:c?.05:.2),o&&b.attr("filter",`url(#glow-${m})`),b.append("text").attr("class","node-label").text(g.label)}const h=this._svg.select(".labels-group");h.selectAll("*").remove();const f=this._names;for(let d=0;d<e.length;d++){if(!f[d])continue;const g=e[d][0];h.append("text").attr("class","label").attr("x",g.x).attr("y",g.y-Sn-16).text(f[d])}}_getLayerNodeGroups(){const e=this._layers.length,r=[];for(let i=0;i<e;i++){const s=Array.from(this.root.querySelectorAll(`.node[data-layer="${i}"]`));r.push(s)}return r}_getConnectionElements(e,r){return Array.from(this.root.querySelectorAll(`.connection[data-source-layer="${e}"][data-target-layer="${r}"]`))}_cancelAnimation(){var e;(e=this._timeline)==null||e.kill(),this._timeline=null,this._isAnimating=!1}_runAnimation(){if(!this._svg)return;this._cancelAnimation(),this._isAnimating=!0,this._render();const{nodes:e}=this._computeLayout(),r=e.length,i=this._animateMode,s=this._speed,a=i==="backprop",o=a?"#ff2d75":"#00d4ff",c=s/600,l=a?Array.from({length:r},(f,d)=>r-1-d):Array.from({length:r},(f,d)=>d),u=this._getLayerNodeGroups(),h=$n.timeline({onComplete:()=>{this._isAnimating=!1,this._hasAnimated=!0,this.root.querySelectorAll(".node").forEach(g=>{const p=parseInt(g.getAttribute("data-layer")||"0",10),m=this._layerType(p,r);$n.set(g,{opacity:1}),g.setAttribute("filter",`url(#glow-${m})`);const b=g.querySelector("circle");b&&$n.set(b,{attr:{"fill-opacity":.2}})}),this.root.querySelectorAll(".connection").forEach(g=>{$n.set(g,{attr:{"stroke-opacity":.5}}),g.setAttribute("stroke","var(--lv-border, #2a2a4a)")})}});this._timeline=h,h.addLabel("start",.15),l.forEach((f,d)=>{const g=this._layerType(f,r),p=u[f];if(!p||p.length===0)return;const m=p.map(v=>v.querySelector(".node-circle")).filter(Boolean),b=`layer-${d}`,y=.15+d*(.4*c);if(h.addLabel(b,y),h.to(p,{opacity:1,duration:.2,stagger:.05,ease:"power2.out"},b),h.call(()=>{p.forEach(v=>{v.setAttribute("filter",`url(#glow-${g})`)})},[],b),h.to(m,{attr:{r:Sn*1.15},duration:.15,stagger:.05,ease:"back.out(1.7)"},b),h.to(m,{attr:{r:Sn},duration:.2,stagger:.05,ease:"power2.inOut"},`${b}+=0.2`),h.to(m,{attr:{"fill-opacity":.35},duration:.2,stagger:.05,ease:"power2.out"},b),h.to(m,{attr:{"fill-opacity":.2},duration:.3,stagger:.05,ease:"power2.in"},`${b}+=0.3`),d<l.length-1){const v=l[d+1],_=Math.min(f,v),x=Math.max(f,v),k=this._getConnectionElements(_,x);k.length>0&&(h.to(k,{attr:{"stroke-opacity":.5},stroke:o,duration:.25,stagger:.02,ease:"power2.out"},`${b}+=0.15`),h.to(k,{stroke:"var(--lv-border, #2a2a4a)",attr:{"stroke-opacity":.35},duration:.3,stagger:.02,ease:"power2.inOut"},`${b}+=0.35`))}})}}customElements.define("lv-network",vg);const ll=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],xg=`
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
`,se=120,Tn=32,Tr=40;class bg extends R{constructor(){super(...arguments);O(this,"_data",null);O(this,"_hasAnimated",!1);O(this,"_svg",null);O(this,"_container",null);O(this,"_root",null)}static get observedAttributes(){return["data","orientation"]}get _orientation(){return this.getAttribute("orientation")==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.adoptStyles(xg),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",{label:"root"}),this._initSvg(),this._buildHierarchy(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",{label:"root"}),this._buildHierarchy()),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=J(e),this._svg.append("g").attr("class","links-group"),this._svg.append("g").attr("class","nodes-group")}_buildHierarchy(){this._data&&(this._root=sr(this._data))}_getVisibleNodes(){if(!this._root)return[];const e=[],r=i=>{if(e.push(i),!i._collapsed&&i.children)for(const s of i.children)r(s)};return r(this._root),e}_toggleCollapse(e){!e.data.children||e.data.children.length===0||(e._collapsed?(e._collapsed=!1,e.children=e._children||[]):(e._collapsed=!0,e._children=e.children,e.children=void 0),this._render(!0))}_render(e){if(!this._svg||!this._root)return;const r=this._orientation==="horizontal",i=new Map,s=(C,T)=>{if(i.set(T,{collapsed:!!C._collapsed,_children:C._children}),C._collapsed&&C._children)for(let S=0;S<C._children.length;S++)s(C._children[S],`${T}/${S}`);if(C.children)for(let S=0;S<C.children.length;S++)s(C.children[S],`${T}/${S}`)};s(this._root,"0"),this._root=sr(this._data);const a=(C,T)=>{const S=i.get(T);if(S!=null&&S.collapsed&&(C._collapsed=!0,C._children=C.children,C.children=void 0),C.children)for(let M=0;M<C.children.length;M++)a(C.children[M],`${T}/${M}`)};a(this._root,"0");const o=this._getVisibleNodes(),c=o.filter(C=>!C.children||C.children.length===0).length,l=vs(o,C=>C.depth)||0,u=Tn+20,h=se+60;let f,d;r?(f=l*h,d=Math.max((c-1)*u,u)):(f=Math.max((c-1)*(se+80),se+80),d=l*h),Qd().size(r?[d,f]:[f,d]).separation((C,T)=>C.parent===T.parent?1.5:2)(this._root);const p=this._root.descendants(),m=this._root.links(),b=f+Tr*2+se,y=d+Tr*2+Tn;this._svg.attr("viewBox",`0 0 ${b} ${y}`);const v=Tr+se/2,_=Tr+Tn/2,x=C=>r?C.y+v:C.x+v,k=C=>r?C.x+_:C.y+_,$=this._svg.select(".links-group");$.selectAll("*").remove();const A=r?zp().x(C=>C.y+v).y(C=>C.x+_):Op().x(C=>C.x+v).y(C=>C.y+_);for(let C=0;C<m.length;C++){const T=m[C],S=$.append("path").attr("class","link").attr("d",A(T));if(e){const M=S.node().getTotalLength();S.attr("stroke-dasharray",M).attr("stroke-dashoffset",M).transition().delay(C*60+100).duration(500).ease(an).attr("stroke-dashoffset",0)}}const w=this._svg.select(".nodes-group");w.selectAll("*").remove();for(let C=0;C<p.length;C++){const T=p[C],S=x(T),M=k(T),E=T.data.children&&T.data.children.length>0,P=!!T._collapsed,L=T.depth%ll.length,I=getComputedStyle(this).getPropertyValue(`--lv-chart-${L}`).trim()||ll[L],X=w.append("g").attr("transform",`translate(${S},${M})`);e&&X.attr("opacity",0).transition().delay(C*60).duration(400).ease(an).attr("opacity",1);const q=X.append("rect").attr("class",`node-rect ${E?"has-children":"leaf"}`).attr("x",-se/2).attr("y",-Tn/2).attr("width",se).attr("height",Tn).attr("stroke",I);X.append("text").attr("class","node-label").text(T.data.label),E&&X.append("text").attr("class","collapse-indicator").attr("x",se/2-12).attr("y",0).text(P?"+":"−"),E&&(q.on("click",()=>{this._toggleCollapse(T)}),X.select(".collapse-indicator").on("click",()=>{this._toggleCollapse(T)}))}}}customElements.define("lv-tree",bg),N.LvBaseElement=R,N.clamp=hs,N.colorScale=fs,N.formatNum=ds,N.getToken=_l,N.lerp=Ae,N.scrollAnimator=Q,N.setTheme=ml,N.simColorScale=dl,N.uid=gl,Object.defineProperty(N,Symbol.toStringTag,{value:"Module"})}));

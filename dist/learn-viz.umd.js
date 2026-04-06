(function(R,V){typeof exports=="object"&&typeof module<"u"?V(exports,require("roughjs"),require("three"),require("three/examples/jsm/controls/OrbitControls.js")):typeof define=="function"&&define.amd?define(["exports","roughjs","three","three/examples/jsm/controls/OrbitControls.js"],V):(R=typeof globalThis<"u"?globalThis:R||self,V(R.LearnViz={},R.rough,R.THREE,R.THREE))})(this,(function(R,V,at,sn){"use strict";var O_=Object.defineProperty;var Zl=R=>{throw TypeError(R)};var R_=(R,V,at)=>V in R?O_(R,V,{enumerable:!0,configurable:!0,writable:!0,value:at}):R[V]=at;var P=(R,V,at)=>R_(R,typeof V!="symbol"?V+"":V,at),Jl=(R,V,at)=>V.has(R)||Zl("Cannot "+at);var nn=(R,V,at)=>(Jl(R,V,"read from private field"),at?at.call(R):V.get(R)),Yr=(R,V,at)=>V.has(R)?Zl("Cannot add the same private member more than once"):V instanceof WeakSet?V.add(R):V.set(R,at),rn=(R,V,at,sn)=>(Jl(R,V,"write to private field"),sn?sn.call(R,at):V.set(R,at),at);var en,Bn,pe;function Ql(r){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(r){for(const t in r)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>r[t]})}}return e.default=r,Object.freeze(e)}const j=Ql(at);class tc{constructor(){Yr(this,en);Yr(this,Bn,new WeakSet);rn(this,en,new IntersectionObserver(e=>{for(const t of e)if(t.isIntersecting&&!nn(this,Bn).has(t.target)){nn(this,Bn).add(t.target);const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=t.target;typeof i.animateIn=="function"&&(n?i.animateIn(!0):i.animateIn(!1))}},{threshold:.15}))}observe(e){nn(this,en).observe(e)}unobserve(e){nn(this,en).unobserve(e)}}en=new WeakMap,Bn=new WeakMap;const Gr=new tc;class D extends HTMLElement{constructor(){super();P(this,"root");Yr(this,pe,!1);this.root=this.attachShadow({mode:"open"})}get dir(){var t;return((t=this.closest("[dir]"))==null?void 0:t.getAttribute("dir"))||document.documentElement.dir||"ltr"}get isRtl(){return this.dir==="rtl"}adoptStyles(t){const n=new CSSStyleSheet;n.replaceSync(t),this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,n]}jsonAttr(t,n){const i=this.getAttribute(t);if(!i)return n;const s=i.replace(/\u2212/g,"-");try{return JSON.parse(s)}catch{return n}}render(t){rn(this,pe,!0),this.root.innerHTML=t,rn(this,pe,!1)}attributeChangedCallback(t,n,i){nn(this,pe)||(rn(this,pe,!0),this.handleAttributeChange(t,n,i),rn(this,pe,!1))}handleAttributeChange(t,n,i){}animateIn(t){}connectedCallback(){Gr.observe(this)}disconnectedCallback(){Gr.unobserve(this)}}pe=new WeakMap;function ze(r,e,t){return r+(e-r)*t}function Fs(r,e,t){return Math.min(Math.max(r,e),t)}function Ns(r){r=Fs(r,0,1);const e=r<.5?Math.round(ze(0,255,r*2)):255,t=r<.5?Math.round(ze(200,230,r*2)):Math.round(ze(230,50,(r-.5)*2)),n=r<.5?Math.round(ze(83,60,r*2)):Math.round(ze(60,80,(r-.5)*2));return`rgb(${e},${t},${n})`}function ec(r){return Ns((1-r)/2)}function Ds(r){return Number.isInteger(r)?r.toString():Math.abs(r)>=100?r.toFixed(0):Math.abs(r)>=1?r.toFixed(1):r.toFixed(2)}let nc=0;function rc(r="lv"){return`${r}-${++nc}`}const Wr=new Map,Ur=new Map;function Os(r){let e=Wr.get(r);return e||(e=new Promise((t,n)=>{const i=document.createElement("script");i.src=r,i.onload=()=>t(),i.onerror=()=>{Wr.delete(r),n(new Error(`Failed to load ${r}`))},document.head.appendChild(i)}),Wr.set(r,e),e)}function ic(r){let e=Ur.get(r);return e||(e=new Promise((t,n)=>{const i=document.createElement("link");i.rel="stylesheet",i.href=r,i.onload=()=>t(),i.onerror=()=>{Ur.delete(r),n(new Error(`Failed to load ${r}`))},document.head.appendChild(i)}),Ur.set(r,e),e)}function sc(r,e){const t=e||document.documentElement;return getComputedStyle(t).getPropertyValue(`--lv-${r}`).trim()}function ac(r,e){r.setAttribute("data-theme",e)}const oc=`
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
`;class lc extends D{static get observedAttributes(){return["theme","dir"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(oc),this._render()}handleAttributeChange(){this._render()}_render(){const e=this.getAttribute("dir")||"ltr";this.setAttribute("dir",e);const t=this.getAttribute("theme")||"dark";this.setAttribute("data-theme",t),this.render("<slot></slot>")}}customElements.define("lv-page",lc);const cc=`
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
`;class dc extends D{static get observedAttributes(){return["number","title","subtitle","gradient"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(cc),this._render()}handleAttributeChange(){this._render()}_render(){const e=this.getAttribute("number")||"",t=this.getAttribute("title")||"",n=this.getAttribute("subtitle")||"",i=this.getAttribute("gradient")||"",s=i?`background: ${i};`:"";this.render(`
      <div class="hero" style="${s}">
        ${e?`<div class="number">${e}</div>`:""}
        <div class="content">
          <h1>${t}</h1>
          ${n?`<p class="subtitle">${n}</p>`:""}
        </div>
      </div>
    `)}}customElements.define("lv-hero",dc);const uc=`
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
`;class hc extends D{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(uc),this._render()}handleAttributeChange(){this._render()}_render(){const e=this.getAttribute("title")||"";this.render(`
      ${e?`<h2>${e}</h2>`:""}
      <slot></slot>
    `)}}customElements.define("lv-section",hc);const fc=`
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
`;class pc extends D{static get observedAttributes(){return["variant"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(fc),this._render()}handleAttributeChange(){this._render()}_render(){this.root.querySelector(".card")||this.render('<div class="card"><slot></slot></div>')}}customElements.define("lv-card",pc);const gc=`
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
`;class mc extends D{static get observedAttributes(){return["cols","gap"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(gc),this._render()}handleAttributeChange(){this.root.querySelector(".grid")||this._render()}_render(){this.render('<div class="grid"><slot></slot></div>')}}customElements.define("lv-grid",mc);const _c=`
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
`;class vc extends D{static get observedAttributes(){return["label","active"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(_c),this.render("<slot></slot>"),this.setAttribute("role","tabpanel")}handleAttributeChange(){}}customElements.define("lv-tab",vc);const bc=`
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
`;class xc extends D{constructor(){super(...arguments);P(this,"_tabs",[]);P(this,"_buttons",[]);P(this,"_activeIndex",0)}connectedCallback(){super.connectedCallback(),this.adoptStyles(bc),requestAnimationFrame(()=>this._setup())}_setup(){if(this._tabs=Array.from(this.querySelectorAll("lv-tab")),this._tabs.length===0)return;const t=this._tabs.findIndex(s=>s.hasAttribute("active"));this._activeIndex=t>=0?t:0;const n=this._tabs.map((s,a)=>{const o=s.getAttribute("label")||`Tab ${a+1}`,c=a===this._activeIndex;return`<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c?"0":"-1"}"
        data-index="${a}"
      >${o}</button>`}).join("");this.render(`
      <div class="tablist" role="tablist">${n}</div>
      <div class="panels"><slot></slot></div>
    `),this._buttons=Array.from(this.root.querySelectorAll(".tab-btn")),this._activate(this._activeIndex);const i=this.root.querySelector(".tablist");i.addEventListener("click",s=>{const a=s.target.closest(".tab-btn");a&&this._activate(Number(a.dataset.index))}),i.addEventListener("keydown",(s=>{const a=this._buttons.length;let o=this._activeIndex;switch(s.key){case"ArrowRight":case"ArrowDown":s.preventDefault(),o=(o+1)%a;break;case"ArrowLeft":case"ArrowUp":s.preventDefault(),o=(o-1+a)%a;break;case"Home":s.preventDefault(),o=0;break;case"End":s.preventDefault(),o=a-1;break;case"Enter":case" ":s.preventDefault(),this._activate(o);return;default:return}this._buttons[o].focus(),this._activate(o)}))}_activate(t){this._activeIndex=t,this._buttons.forEach((n,i)=>{const s=i===t;n.setAttribute("aria-selected",String(s)),n.setAttribute("tabindex",s?"0":"-1")}),this._tabs.forEach((n,i)=>{i===t?n.setAttribute("active",""):n.removeAttribute("active")})}}customElements.define("lv-tabs",xc);const yc=`
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
`;class wc extends D{static get observedAttributes(){return["prev","prev-label","next","next-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(yc),this._render()}handleAttributeChange(){this._render()}_render(){const e=this.getAttribute("prev")||"",t=this.getAttribute("prev-label")||"Previous",n=this.getAttribute("next")||"",i=this.getAttribute("next-label")||"Next",s=this.isRtl,a=s?"→":"←",o=s?"←":"→";this.render(`
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
    `)}}customElements.define("lv-nav",wc);const kc=`
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
`;class $c extends D{static get observedAttributes(){return["vs"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(kc),this._render()}handleAttributeChange(){this._render()}_render(){const e=this.getAttribute("vs"),t=e!==null,n=e||"VS";t?this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${n}</div>
          <slot name="right"></slot>
        </div>
      `):this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `)}}customElements.define("lv-comparison",$c);const Ac=`
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
`,Sc=`
  <div class="val"></div>
  <div class="label"></div>
`;class Cc extends D{constructor(){super(...arguments);P(this,"_observer",null)}static get observedAttributes(){return["value","label","prefix","suffix","color","animated"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Ac),this.render(Sc),this._update(),this._setupObserver()}disconnectedCallback(){var t,n;(t=super.disconnectedCallback)==null||t.call(this),(n=this._observer)==null||n.disconnect(),this._observer=null}handleAttributeChange(t,n,i){this.root.querySelector(".val")&&this._update()}_update(){const t=this.getAttribute("color");t&&(this.style.setProperty("--_color",t),this.style.setProperty("--_glow",t));const n=this.root.querySelector(".label");n&&(n.textContent=this.getAttribute("label")||"");const i=this.root.querySelector(".val");if(i){const s=this.getAttribute("prefix")||"",a=this.getAttribute("suffix")||"",o=this.getAttribute("value")||"";i.textContent=s+o+a}}_setupObserver(){this.hasAttribute("animated")&&(this._observer=new IntersectionObserver(t=>{var n;for(const i of t)i.isIntersecting&&(this.animateIn(!1),(n=this._observer)==null||n.unobserve(this))},{threshold:.1}),this._observer.observe(this))}animateIn(t){if(!this.hasAttribute("animated")||t)return;const n=parseFloat(this.getAttribute("value")||"0");if(isNaN(n))return;const i=1200,s=performance.now(),a=this.root.querySelector(".val"),o=c=>{const l=Math.min((c-s)/i,1),d=1-Math.pow(1-l,3),u=n*d;a.textContent=(this.getAttribute("prefix")||"")+Ds(u)+(this.getAttribute("suffix")||""),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}customElements.define("lv-metric",Cc);const Rs={info:{color:"var(--lv-info, #3b82f6)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
    </svg>`}},Mc=`
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
`;class Ec extends D{static get observedAttributes(){return["type","title"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(Mc),this._render()}handleAttributeChange(e,t,n){this.root.querySelector(".callout")&&this._render()}_getType(){const e=this.getAttribute("type");return Rs[e]?e:"info"}_render(){const e=this._getType(),t=Rs[e],n=this.getAttribute("title")||"";this.style.setProperty("--_type-color",t.color),this.style.setProperty("--_type-bg",`color-mix(in srgb, ${t.color} 8%, transparent)`);const i=`
      <div class="callout" role="note">
        <div class="header">
          ${t.icon}
          ${n?`<span class="title">${n}</span>`:""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;this.render(i)}}customElements.define("lv-callout",Ec);const Tc=`
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
`,Lc=`
  <span class="badge"><slot></slot></span>
`;class Pc extends D{static get observedAttributes(){return["color","variant"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(Tc),this.render(Lc),this._updateColor()}handleAttributeChange(e,t,n){e==="color"&&this._updateColor()}_updateColor(){const e=this.getAttribute("color");e?this.style.setProperty("--_color",e):this.style.removeProperty("--_color")}}customElements.define("lv-badge",Pc);const zc=`
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`,Bs="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",Ic="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";let Hn=null;function qc(){return window.katex?Promise.resolve():Hn||(Hn=new Promise((r,e)=>{const t=document.createElement("link");t.rel="stylesheet",t.href=Bs,document.head.appendChild(t);const n=document.createElement("script");n.src=Ic,n.onload=()=>r(),n.onerror=()=>e(new Error("Failed to load KaTeX")),document.head.appendChild(n)}),Hn)}class Fc extends D{constructor(){super(...arguments);P(this,"_source","")}connectedCallback(){var t,n;(t=super.connectedCallback)==null||t.call(this),this._source=((n=this.textContent)==null?void 0:n.trim())||"",this.adoptStyles(zc),this._render()}async _render(){try{await qc();const t=this.hasAttribute("display"),n=window.katex.renderToString(this._source,{displayMode:t,throwOnError:!1});this.root.innerHTML=`<link rel="stylesheet" href="${Bs}"><span class="katex-container">${n}</span>`}catch{this.root.innerHTML=`<span class="fallback">${this._escapeHtml(this._source)}</span>`}}_escapeHtml(t){const n=document.createElement("span");return n.textContent=t,n.innerHTML}}customElements.define("lv-math",Fc);const Nc=`
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
`,Dc="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js",Hs="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";let jn=null;function Oc(){return window.hljs?Promise.resolve():jn||(jn=new Promise((r,e)=>{const t=document.createElement("link");t.rel="stylesheet",t.href=Hs,document.head.appendChild(t);const n=document.createElement("script");n.src=Dc,n.onload=()=>r(),n.onerror=()=>e(new Error("Failed to load highlight.js")),document.head.appendChild(n)}),jn)}class Rc extends D{constructor(){super(...arguments);P(this,"_source","")}static get observedAttributes(){return["language","line-numbers"]}connectedCallback(){var t,n;(t=super.connectedCallback)==null||t.call(this),this._source=((n=this.textContent)==null?void 0:n.trim())||"",this.adoptStyles(Nc),this._render()}async _render(){const t=this.getAttribute("language")||"",n=this.hasAttribute("line-numbers");let i;try{await Oc();const a=window.hljs;t&&a.getLanguage(t)?i=a.highlight(this._source,{language:t}).value:i=a.highlightAuto(this._source).value}catch{i=this._escapeHtml(this._source)}let s;n?s=i.split(`
`).map((o,c)=>`<span class="line-num">${c+1}</span>${o}`).join(`
`):s=i,this.root.innerHTML=`<link rel="stylesheet" href="${Hs}"><div class="code-block"><pre><code>${s}</code></pre></div>`}_escapeHtml(t){const n=document.createElement("span");return n.textContent=t,n.innerHTML}}customElements.define("lv-code",Rc);const Bc=`
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
`;class Hc extends D{static get observedAttributes(){return["data","labels","highlight"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(Bc),this._render()}handleAttributeChange(){this.root&&this._render()}_render(){var u;const e=this.jsonAttr("data",[]),t=this.jsonAttr("labels",{}),n=this.jsonAttr("highlight",[]);if(!e.length){this.root.innerHTML="";return}const i=e.length,s=((u=e[0])==null?void 0:u.length)||0,a=!!(t.rows&&t.rows.length),o=!!(t.cols&&t.cols.length),c=new Set(n.map(([h,f])=>`${h},${f}`)),l=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;let d='<div class="matrix-wrapper">';if(o){const h=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;d+=`<div class="col-labels" style="grid-template-columns: ${h}">`,a&&(d+="<span></span>");for(let f=0;f<s;f++)d+=`<span class="col-label">${this._escapeHtml(t.cols[f]||"")}</span>`;d+="</div>"}d+=`<div class="matrix" style="grid-template-columns: ${l}">`,d+='<div class="bracket-left"></div>',d+='<div class="bracket-right"></div>';for(let h=0;h<i;h++){a&&(d+=`<span class="row-label">${this._escapeHtml(t.rows[h]||"")}</span>`);for(let f=0;f<s;f++){const g=e[h][f],p=typeof g=="number"?this._formatNum(g):String(g),m=c.has(`${h},${f}`);d+=`<span class="cell${m?" highlight":""}">${p}</span>`}}d+="</div></div>",this.root.innerHTML=d}_formatNum(e){return e.toFixed(3).replace(/0$/,"")}_escapeHtml(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}}customElements.define("lv-matrix",Hc);const jc=`
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
`;class Vc extends D{constructor(){super(...arguments);P(this,"_sortState",{column:"",direction:"none"});P(this,"_currentPage",0);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","columns","sortable","show-stats","page-size","striped"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(jc),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".table-container");n&&(n.style.opacity="0",n.style.transform="translateY(10px)",n.style.transition="opacity 0.5s ease-out, transform 0.5s ease-out",requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateY(0)"}))}_build(){const t=this.jsonAttr("data",[]),n=this.hasAttribute("sortable"),i=this.hasAttribute("show-stats"),s=parseInt(this.getAttribute("page-size")||"0",10),a=this.hasAttribute("striped");if(!t.length){this.render('<div class="table-container"><table><tbody><tr><td style="padding:20px;text-align:center;color:var(--lv-text-dim)">No data</td></tr></tbody></table></div>');return}let o=this.jsonAttr("columns",[]);o.length||(o=Object.keys(t[0]));const c=new Set;for(const x of o)t.every(_=>{const y=_[x];return y==null||typeof y=="number"||typeof y=="string"&&y!==""&&!isNaN(Number(y))})&&c.add(x);let l=[...t];if(n&&this._sortState.direction!=="none"&&this._sortState.column){const x=this._sortState.column,v=this._sortState.direction==="asc"?1:-1,_=c.has(x);l.sort((y,w)=>{const S=y[x],$=w[x];return S==null&&$==null?0:S==null?1:$==null?-1:_?(Number(S)-Number($))*v:String(S).localeCompare(String($))*v})}const d=l.length,u=s>0?Math.ceil(d/s):1;this._currentPage>=u&&(this._currentPage=Math.max(0,u-1));const h=s>0?l.slice(this._currentPage*s,(this._currentPage+1)*s):l;let f="<tr>";for(const x of o){const v=this._getSortArrow(x);f+=`<th${n?' class="sortable"':""} data-col="${this._esc(x)}">${this._esc(x)}${v}</th>`}f+="</tr>";let g="";for(const x of h){g+="<tr>";for(const v of o){const _=x[v],y=c.has(v),w=y?' class="num-cell"':"",S=this._formatValue(_,y);g+=`<td${w}>${S}</td>`}g+="</tr>"}let p="";if(i){p="<tfoot><tr>";for(const x of o)if(c.has(x)){const v=t.map(S=>Number(S[x])).filter(S=>!isNaN(S)),_=v.reduce((S,$)=>S+$,0)/v.length,y=Math.min(...v),w=Math.max(...v);p+=`<td class="num-cell">${this._fmtSig(_)} (${this._fmtSig(y)}..${this._fmtSig(w)})</td>`}else{const v=new Set(t.map(_=>_[x])).size;p+=`<td>${v} unique</td>`}p+="</tr></tfoot>"}let m="";s>0&&u>1&&(m=`<div class="page-controls">
        <button class="page-btn" data-action="prev" ${this._currentPage===0?"disabled":""}>Prev</button>
        <span>Page ${this._currentPage+1} of ${u}</span>
        <button class="page-btn" data-action="next" ${this._currentPage>=u-1?"disabled":""}>Next</button>
      </div>`);const b=a?" striped":"";this.render(`<div class="table-container${b}">
      <table>
        <thead>${f}</thead>
        <tbody>${g}</tbody>
        ${p}
      </table>
      ${m}
    </div>`),n&&this.root.querySelectorAll("th.sortable").forEach(x=>{x.addEventListener("click",()=>{const v=x.dataset.col||"";this._toggleSort(v)})}),s>0&&this.root.querySelectorAll(".page-btn").forEach(x=>{x.addEventListener("click",()=>{const v=x.dataset.action;v==="prev"&&this._currentPage>0?(this._currentPage--,this._build()):v==="next"&&this._currentPage<u-1&&(this._currentPage++,this._build())})})}_toggleSort(t){this._sortState.column===t?this._sortState.direction==="asc"?this._sortState.direction="desc":this._sortState.direction==="desc"?this._sortState={column:"",direction:"none"}:this._sortState={column:t,direction:"asc"}:this._sortState={column:t,direction:"asc"},this._currentPage=0,this._build()}_getSortArrow(t){return this._sortState.column!==t||this._sortState.direction==="none"?'<span class="sort-arrow">▲</span>':`<span class="sort-arrow active">${this._sortState.direction==="asc"?"▲":"▼"}</span>`}_formatValue(t,n){return t==null?'<span style="color:var(--lv-text-dim)">-</span>':n?this._fmtSig(Number(t)):this._esc(String(t))}_fmtSig(t){return isNaN(t)?"-":Number.isInteger(t)&&Math.abs(t)<1e6?String(t):parseFloat(t.toPrecision(4)).toString()}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-data-table",Vc);const Xc=`
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
`;class Yc extends D{constructor(){super(...arguments);P(this,"_answered",!1)}static get observedAttributes(){return["question","options","correct","explanation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Xc),this._render(),this._attachListeners()}handleAttributeChange(){this._answered||(this._render(),this._attachListeners())}get _options(){return this.jsonAttr("options",[])}get _correctIndex(){return parseInt(this.getAttribute("correct")||"0",10)}_render(){const t=this.getAttribute("question")||"",n=this._options,i=this.getAttribute("explanation")||"",s=n.map((a,o)=>`
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");this.render(`
      <div class="question">${t}</div>
      <div class="options">${s}</div>
      ${i?`<div class="explanation"><div class="explanation-inner">${i}</div></div>`:""}
    `)}_attachListeners(){this.root.querySelectorAll(".option").forEach(n=>{n.addEventListener("click",()=>this._select(n)),n.addEventListener("keydown",i=>{const s=i.key;(s==="Enter"||s===" ")&&(i.preventDefault(),this._select(n))})})}_select(t){if(this._answered)return;this._answered=!0;const n=parseInt(t.dataset.index||"0",10),i=this._correctIndex,s=n===i;this.root.querySelectorAll(".option").forEach((c,l)=>{const d=c;d.removeAttribute("tabindex"),l===i?(d.classList.add("correct"),d.querySelector(".icon").textContent="✓"):l===n&&!s?(d.classList.add("wrong"),d.querySelector(".icon").textContent="✗"):d.classList.add("dimmed")});const o=this.root.querySelector(".explanation");o&&requestAnimationFrame(()=>o.classList.add("visible")),this.dispatchEvent(new CustomEvent("lv-quiz-answer",{bubbles:!0,composed:!0,detail:{correct:s,selected:n,answer:i}}))}}customElements.define("lv-quiz",Yc);const Gc=`
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
`;class Wc extends D{constructor(){super(...arguments);P(this,"_revealed",!1)}static get observedAttributes(){return["label","revealed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Gc),this._render(),this._attachListeners(),this.hasAttribute("revealed")&&this._reveal(!1)}handleAttributeChange(t){if(t==="revealed"&&this.hasAttribute("revealed")&&!this._revealed&&this._reveal(!0),t==="label"){const n=this.root.querySelector(".trigger-label");n&&(n.textContent=this._label)}}get _label(){return this.getAttribute("label")||"اضغط للإظهار"}_render(){this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `)}_attachListeners(){const t=this.root.querySelector(".trigger");t.addEventListener("click",()=>this._reveal(!0)),t.addEventListener("keydown",n=>{const i=n.key;(i==="Enter"||i===" ")&&(n.preventDefault(),this._reveal(!0))})}_reveal(t){if(this._revealed)return;this._revealed=!0;const n=this.root.querySelector(".trigger"),i=this.root.querySelector(".content");n.setAttribute("aria-expanded","true"),t?(n.classList.add("hidden"),setTimeout(()=>i.classList.add("visible"),150)):(n.classList.add("hidden"),i.classList.add("visible"))}}customElements.define("lv-reveal",Wc);const Uc=`
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
`;class Kc extends D{constructor(){super(...arguments);P(this,"_input",null);P(this,"_valueEl",null);P(this,"_popTimeout",null)}static get observedAttributes(){return["min","max","step","value","label","name","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Uc),this._render(),this._bind(),this._updateTrack()}handleAttributeChange(){this._input&&(this._render(),this._bind(),this._updateTrack())}get _min(){return parseFloat(this.getAttribute("min")||"0")}get _max(){return parseFloat(this.getAttribute("max")||"100")}get _step(){return this.getAttribute("step")||"1"}get _value(){return this.getAttribute("value")||"50"}get _label(){return this.getAttribute("label")||""}get _name(){return this.getAttribute("name")||""}get _color(){return this.getAttribute("color")||""}_render(){const t=this._color?`--fill-color: ${this._color};`:"";this.render(`
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
        style="${t}"
        aria-label="${this._label}"
      />
    `),this._input=this.root.querySelector("input"),this._valueEl=this.root.querySelector(".value-display")}_bind(){this._input&&this._input.addEventListener("input",()=>{const t=this._input.value;this._valueEl&&(this._valueEl.textContent=t,this._valueEl.classList.add("pop"),this._popTimeout&&clearTimeout(this._popTimeout),this._popTimeout=window.setTimeout(()=>{var n;(n=this._valueEl)==null||n.classList.remove("pop")},150)),this._updateTrack(),this.dispatchEvent(new CustomEvent("lv-change",{bubbles:!0,composed:!0,detail:{name:this._name,value:parseFloat(t)}}))})}_updateTrack(){if(!this._input)return;const t=this._min,n=this._max,s=(parseFloat(this._input.value)-t)/(n-t)*100,o=`linear-gradient(to right, ${this._color||"var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;this._input.style.setProperty("--track-bg",o),this._input.style.background=o,this._input.style.borderRadius="9999px"}}customElements.define("lv-slider",Kc);const Zc=`
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
`;class Jc extends D{static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Zc),this._render(),this._bind()}_render(){this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `)}_bind(){this.addEventListener("lv-change",()=>{const e=this._collectParams();this.dispatchEvent(new CustomEvent("lv-params-change",{bubbles:!0,composed:!0,detail:e}))})}_collectParams(){const e=this.querySelectorAll('lv-slider[slot="controls"]'),t={};return e.forEach(n=>{var s;const i=n.getAttribute("name");if(i){const a=(s=n.root)==null?void 0:s.querySelector("input"),o=parseFloat(a?a.value:n.getAttribute("value")||"0");t[i]=o}}),t}}customElements.define("lv-playground",Jc);const Qc=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];function js(r){return String(r).split("").map(e=>Qc[parseInt(e)]??e).join("")}const td=`
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
`;class ed extends D{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(td),this._render()}handleAttributeChange(){this.root.querySelector(".title")&&this._render()}get _title(){return this.getAttribute("title")||""}_render(){this.render(`
      ${this._title?`<div class="title">${this._title}</div>`:""}
      <slot></slot>
    `)}}customElements.define("lv-step",ed);const nd=`
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
`;class rd extends D{constructor(){super(...arguments);P(this,"_current",0);P(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(nd),this._render(),requestAnimationFrame(()=>{this._steps=Array.from(this.querySelectorAll("lv-step")),this._showStep(0,null),this._bind()})}get _total(){return this._steps.length}_render(){this.render(`
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
    `)}_bind(){const t=this.root.querySelector(".prev"),n=this.root.querySelector(".next");t.addEventListener("click",()=>this._go(-1)),n.addEventListener("click",()=>this._go(1)),this.addEventListener("keydown",i=>{i.key==="ArrowRight"?(i.preventDefault(),this._go(this.isRtl?-1:1)):i.key==="ArrowLeft"&&(i.preventDefault(),this._go(this.isRtl?1:-1))}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_go(t){const n=this._current+t;n<0||n>=this._total||(this._current,this._current=n,this._showStep(n,t>0?"forward":"backward"))}_showStep(t,n){this._steps.forEach((o,c)=>{o.classList.remove("active","from-start","from-end"),c===t&&(o.classList.add("active"),n==="forward"?o.classList.add(this.isRtl?"from-start":"from-end"):n==="backward"&&o.classList.add(this.isRtl?"from-end":"from-start"))});const i=this.root.querySelector(".counter");i&&(i.textContent=`${js(t+1)} / ${js(this._total)}`);const s=this.root.querySelector(".prev"),a=this.root.querySelector(".next");s&&(s.disabled=t===0),a&&(a.disabled=t===this._total-1)}}customElements.define("lv-stepper",rd);const id=`
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
`;class sd extends D{connectedCallback(){super.connectedCallback(),this.adoptStyles(id),this.render("<slot></slot>")}}customElements.define("lv-scrolly-step",sd);const ad=`
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
`;class od extends D{constructor(){super(...arguments);P(this,"_observer",null);P(this,"_steps",[])}static get observedAttributes(){return["sticky-side"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ad),this._build(),requestAnimationFrame(()=>this._setupObserver())}disconnectedCallback(){super.disconnectedCallback(),this._observer&&(this._observer.disconnect(),this._observer=null)}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){}_build(){this.render(`
      <div class="scrolly-grid">
        <div class="viz-col"><slot name="viz"></slot></div>
        <div class="steps-col"><slot></slot></div>
      </div>
    `)}_setupObserver(){this._steps=Array.from(this.querySelectorAll("lv-scrolly-step")),this._steps.length&&(this._steps[0].classList.add("active"),this.setAttribute("data-active-step","0"),this._observer=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const i=this._steps.indexOf(n.target);if(i===-1)return;this._steps.forEach(s=>s.classList.remove("active")),n.target.classList.add("active"),this.setAttribute("data-active-step",String(i)),this.dispatchEvent(new CustomEvent("lv-scrolly-change",{detail:{step:i},bubbles:!0,composed:!0}))}})},{threshold:.5}),this._steps.forEach(t=>this._observer.observe(t)))}}customElements.define("lv-scrolly",od);const ld=`
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
`;class cd extends D{constructor(){super(...arguments);P(this,"_order",[]);P(this,"_dragIndex",-1);P(this,"_clone",null);P(this,"_checked",!1);P(this,"_onPointerMove",null);P(this,"_onPointerUp",null)}static get observedAttributes(){return["items","correct","label","submit-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ld),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDrag()}handleAttributeChange(){this.isConnected&&!this._checked&&this._build()}animateIn(t){}_build(){const t=this.jsonAttr("items",[]),n=this.getAttribute("label")||"Drag to reorder:",i=this.getAttribute("submit-label")||"Check";(!this._order.length||this._order.length!==t.length)&&(this._order=[...t]),this._checked=!1;const s=this._order.map((a,o)=>`
      <div class="item" draggable="false" tabindex="0" data-index="${o}">
        <span class="handle" aria-hidden="true">≡</span>
        <span class="item-text">${this._esc(a)}</span>
        <span class="status-icon"></span>
      </div>
    `).join("");this.render(`
      <div class="label">${this._esc(n)}</div>
      <div class="item-list">${s}</div>
      <button class="btn submit-btn">${this._esc(i)}</button>
    `),this._attachListeners()}_attachListeners(){this.root.querySelectorAll(".item").forEach(i=>{i.addEventListener("pointerdown",s=>{this._startDrag(i,s)}),i.addEventListener("keydown",s=>{const a=s,o=parseInt(i.dataset.index||"0",10);a.key==="ArrowUp"&&o>0?(a.preventDefault(),this._swap(o,o-1),this._buildItems(),requestAnimationFrame(()=>{const c=this.root.querySelector(`[data-index="${o-1}"]`);c==null||c.focus()})):a.key==="ArrowDown"&&o<this._order.length-1&&(a.preventDefault(),this._swap(o,o+1),this._buildItems(),requestAnimationFrame(()=>{const c=this.root.querySelector(`[data-index="${o+1}"]`);c==null||c.focus()}))})});const n=this.root.querySelector(".submit-btn");n==null||n.addEventListener("click",()=>this._check())}_startDrag(t,n){if(this._checked)return;n.preventDefault();const i=parseInt(t.dataset.index||"0",10);this._dragIndex=i,t.classList.add("dragging");const s=document.createElement("div");s.className="clone",s.textContent=this._order[i],s.style.left=`${n.clientX-50}px`,s.style.top=`${n.clientY-20}px`,this.root.appendChild(s),this._clone=s,this._onPointerMove=a=>{if(!this._clone)return;this._clone.style.left=`${a.clientX-50}px`,this._clone.style.top=`${a.clientY-20}px`;const o=Array.from(this.root.querySelectorAll(".item"));let c=-1;for(let l=0;l<o.length;l++){const d=o[l].getBoundingClientRect();if(a.clientY>=d.top&&a.clientY<=d.bottom){c=l;break}}if(c!==-1&&c!==this._dragIndex){this._swap(this._dragIndex,c),this._dragIndex=c,this._buildItems();const l=this.root.querySelector(`[data-index="${c}"]`);l==null||l.classList.add("dragging")}},this._onPointerUp=a=>{this._cleanupDrag(),this._buildItems()},document.addEventListener("pointermove",this._onPointerMove),document.addEventListener("pointerup",this._onPointerUp)}_cleanupDrag(){this._clone&&(this._clone.remove(),this._clone=null),this._onPointerMove&&(document.removeEventListener("pointermove",this._onPointerMove),this._onPointerMove=null),this._onPointerUp&&(document.removeEventListener("pointerup",this._onPointerUp),this._onPointerUp=null),this._dragIndex=-1;const t=this.root.querySelector(".dragging");t==null||t.classList.remove("dragging")}_swap(t,n){const i=this._order[t];this._order[t]=this._order[n],this._order[n]=i}_buildItems(){const t=this.root.querySelector(".item-list");if(!t)return;t.innerHTML=this._order.map((i,s)=>`
      <div class="item" draggable="false" tabindex="0" data-index="${s}">
        <span class="handle" aria-hidden="true">≡</span>
        <span class="item-text">${this._esc(i)}</span>
        <span class="status-icon"></span>
      </div>
    `).join(""),t.querySelectorAll(".item").forEach(i=>{i.addEventListener("pointerdown",s=>{this._startDrag(i,s)}),i.addEventListener("keydown",s=>{const a=s,o=parseInt(i.dataset.index||"0",10);a.key==="ArrowUp"&&o>0?(a.preventDefault(),this._swap(o,o-1),this._buildItems(),requestAnimationFrame(()=>{const c=this.root.querySelector(`[data-index="${o-1}"]`);c==null||c.focus()})):a.key==="ArrowDown"&&o<this._order.length-1&&(a.preventDefault(),this._swap(o,o+1),this._buildItems(),requestAnimationFrame(()=>{const c=this.root.querySelector(`[data-index="${o+1}"]`);c==null||c.focus()}))})})}_check(){const t=this.jsonAttr("correct",[]);this._checked=!0;const n=this.root.querySelectorAll(".item");let i=!0;n.forEach((s,a)=>{const o=s.querySelector(".status-icon");this._order[a]===t[a]?(s.classList.add("correct"),o&&(o.textContent="✓")):(s.classList.add("incorrect"),o&&(o.textContent="✗"),i=!1)}),this.dispatchEvent(new CustomEvent("lv-sort-check",{detail:{correct:i,order:[...this._order]},bubbles:!0,composed:!0}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-drag-sort",cd);const Vs=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"],dd=`
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
`;class ud extends D{constructor(){super(...arguments);P(this,"_placements",[]);P(this,"_categories",[]);P(this,"_dragIdx",-1);P(this,"_clone",null);P(this,"_checked",!1);P(this,"_onPointerMove",null);P(this,"_onPointerUp",null)}static get observedAttributes(){return["items","categories","submit-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(dd),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDrag()}handleAttributeChange(){this.isConnected&&!this._checked&&this._build()}animateIn(t){}_build(){const t=this.jsonAttr("items",[]);this._categories=this.jsonAttr("categories",[]);const n=this.getAttribute("submit-label")||"Check";(!this._placements.length||this._placements.length!==t.length)&&(this._placements=t.map(i=>({text:i.text,category:i.category,bucket:null}))),this._renderInner(n)}_renderInner(t){const n=this._placements.filter(o=>o.bucket===null),i=n.length===0?" empty-hint":"",s=n.map(o=>`<div class="chip" data-idx="${this._placements.indexOf(o)}">${this._esc(o.text)}<span class="tooltip"></span></div>`).join(""),a=this._categories.map((o,c)=>{const l=Vs[c%Vs.length],u=this._placements.filter(h=>h.bucket===o).map(h=>`<div class="chip" data-idx="${this._placements.indexOf(h)}">${this._esc(h.text)}<span class="tooltip"></span></div>`).join("");return`
        <div class="bucket" data-bucket="${this._esc(o)}">
          <div class="bucket-header" style="border-color: ${l}">${this._esc(o)}</div>
          <div class="bucket-items">${u}</div>
        </div>`}).join("");this.render(`
      <div class="pool-label">Items</div>
      <div class="pool${i}">${s}</div>
      <div class="buckets">${a}</div>
      <button class="btn submit-btn">${this._esc(t)}</button>
    `),this._attachListeners()}_attachListeners(){this.root.querySelectorAll(".chip").forEach(i=>{i.addEventListener("pointerdown",s=>{this._startDrag(i,s)})});const n=this.root.querySelector(".submit-btn");n==null||n.addEventListener("click",()=>this._check())}_startDrag(t,n){if(this._checked)return;n.preventDefault();const i=parseInt(t.dataset.idx||"0",10);this._dragIdx=i,t.classList.add("dragging");const s=document.createElement("div");s.className="clone",s.textContent=this._placements[i].text,s.style.left=`${n.clientX-40}px`,s.style.top=`${n.clientY-16}px`,this.root.appendChild(s),this._clone=s,this._onPointerMove=a=>{if(!this._clone)return;this._clone.style.left=`${a.clientX-40}px`,this._clone.style.top=`${a.clientY-16}px`,this.root.querySelectorAll(".bucket").forEach(c=>{const l=c.getBoundingClientRect();a.clientX>=l.left&&a.clientX<=l.right&&a.clientY>=l.top&&a.clientY<=l.bottom?c.classList.add("drag-over"):c.classList.remove("drag-over")})},this._onPointerUp=a=>{let o=null;this.root.querySelectorAll(".bucket").forEach(u=>{const h=u.getBoundingClientRect();a.clientX>=h.left&&a.clientX<=h.right&&a.clientY>=h.top&&a.clientY<=h.bottom&&(o=u.dataset.bucket||null),u.classList.remove("drag-over")});const l=this.root.querySelector(".pool");if(l){const u=l.getBoundingClientRect();a.clientX>=u.left&&a.clientX<=u.right&&a.clientY>=u.top&&a.clientY<=u.bottom&&(o=null)}o===null&&!this._isOverPool(a)?this._placements[this._dragIdx].bucket=null:this._placements[this._dragIdx].bucket=o,this._cleanupDrag();const d=this.getAttribute("submit-label")||"Check";this._renderInner(d)},document.addEventListener("pointermove",this._onPointerMove),document.addEventListener("pointerup",this._onPointerUp)}_isOverPool(t){const n=this.root.querySelector(".pool");if(!n)return!1;const i=n.getBoundingClientRect();return t.clientX>=i.left&&t.clientX<=i.right&&t.clientY>=i.top&&t.clientY<=i.bottom}_cleanupDrag(){this._clone&&(this._clone.remove(),this._clone=null),this._onPointerMove&&(document.removeEventListener("pointermove",this._onPointerMove),this._onPointerMove=null),this._onPointerUp&&(document.removeEventListener("pointerup",this._onPointerUp),this._onPointerUp=null),this._dragIdx=-1}_check(){this._checked=!0;let t=!0;const n=[];this.root.querySelectorAll(".chip").forEach(s=>{const a=parseInt(s.dataset.idx||"0",10),o=this._placements[a],c=o.bucket===o.category;if(n.push({text:o.text,placed:o.bucket,expected:o.category}),c)s.classList.add("correct");else{s.classList.add("incorrect"),t=!1;const l=s.querySelector(".tooltip");l&&(l.textContent=`→ ${o.category}`,l.classList.add("has-text"))}}),this.dispatchEvent(new CustomEvent("lv-classify-check",{detail:{correct:t,results:n},bubbles:!0,composed:!0}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-drag-classify",ud);const hd=`
  :host {
    display: inline;
  }
`;let Xs=!1;function fd(){if(Xs)return;Xs=!0;const r=document.createElement("style");r.textContent=`
    .lv-link-active {
      background-color: color-mix(in srgb, var(--lv-accent, #3b82f6) 20%, transparent);
      border-bottom: 2px solid var(--lv-accent, #3b82f6);
      border-radius: 2px;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }
  `,document.head.appendChild(r)}const Ie=new Map;class pd extends D{constructor(){super(...arguments);P(this,"_group","default");P(this,"_onMouseOver",t=>{var s,a;const n=(a=(s=t.target).closest)==null?void 0:a.call(s,"[data-link]");if(!n)return;const i=n.getAttribute("data-link");i&&this._highlightAll(i,!0)});P(this,"_onMouseOut",t=>{var s,a;const n=(a=(s=t.target).closest)==null?void 0:a.call(s,"[data-link]");if(!n)return;const i=n.getAttribute("data-link");i&&this._highlightAll(i,!1)})}static get observedAttributes(){return["group"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(hd),fd(),this.render("<slot></slot>"),this._group=this.getAttribute("group")||"default",this._register(),this._attachSlotListeners()}disconnectedCallback(){super.disconnectedCallback(),this._unregister()}handleAttributeChange(t,n,i){t==="group"&&(this._unregister(),this._group=i||"default",this._register())}animateIn(t){}_register(){Ie.has(this._group)||Ie.set(this._group,new Set),Ie.get(this._group).add(this)}_unregister(){const t=Ie.get(this._group);t&&(t.delete(this),t.size===0&&Ie.delete(this._group))}_attachSlotListeners(){const t=this.root.querySelector("slot");if(!t)return;const n=()=>{this.addEventListener("mouseover",this._onMouseOver),this.addEventListener("mouseout",this._onMouseOut)};n(),t.addEventListener("slotchange",n)}_highlightAll(t,n){const i=Ie.get(this._group);i&&i.forEach(s=>{s.querySelectorAll(`[data-link="${CSS.escape(t)}"]`).forEach(o=>{n?o.classList.add("lv-link-active"):o.classList.remove("lv-link-active")})})}}customElements.define("lv-linked-highlight",pd);function Vn(r,e){return r==null||e==null?NaN:r<e?-1:r>e?1:r>=e?0:NaN}function gd(r,e){return r==null||e==null?NaN:e<r?-1:e>r?1:e>=r?0:NaN}function Kr(r){let e,t,n;r.length!==2?(e=Vn,t=(o,c)=>Vn(r(o),c),n=(o,c)=>r(o)-c):(e=r===Vn||r===gd?r:md,t=r,n=r);function i(o,c,l=0,d=o.length){if(l<d){if(e(c,c)!==0)return d;do{const u=l+d>>>1;t(o[u],c)<0?l=u+1:d=u}while(l<d)}return l}function s(o,c,l=0,d=o.length){if(l<d){if(e(c,c)!==0)return d;do{const u=l+d>>>1;t(o[u],c)<=0?l=u+1:d=u}while(l<d)}return l}function a(o,c,l=0,d=o.length){const u=i(o,c,l,d-1);return u>l&&n(o[u-1],c)>-n(o[u],c)?u-1:u}return{left:i,center:a,right:s}}function md(){return 0}function _d(r){return r===null?NaN:+r}const vd=Kr(Vn).right;Kr(_d).center;function bd(r,e){let t=0,n,i=0,s=0;if(e===void 0)for(let a of r)a!=null&&(a=+a)>=a&&(n=a-i,i+=n/++t,s+=n*(a-i));else{let a=-1;for(let o of r)(o=e(o,++a,r))!=null&&(o=+o)>=o&&(n=o-i,i+=n/++t,s+=n*(o-i))}if(t>1)return s/(t-1)}function Ys(r,e){const t=bd(r,e);return t&&Math.sqrt(t)}function ne(r,e){let t,n;if(e===void 0)for(const i of r)i!=null&&(t===void 0?i>=i&&(t=n=i):(t>i&&(t=i),n<i&&(n=i)));else{let i=-1;for(let s of r)(s=e(s,++i,r))!=null&&(t===void 0?s>=s&&(t=n=s):(t>s&&(t=s),n<s&&(n=s)))}return[t,n]}const xd=Math.sqrt(50),yd=Math.sqrt(10),wd=Math.sqrt(2);function Xn(r,e,t){const n=(e-r)/Math.max(0,t),i=Math.floor(Math.log10(n)),s=n/Math.pow(10,i),a=s>=xd?10:s>=yd?5:s>=wd?2:1;let o,c,l;return i<0?(l=Math.pow(10,-i)/a,o=Math.round(r*l),c=Math.round(e*l),o/l<r&&++o,c/l>e&&--c,l=-l):(l=Math.pow(10,i)*a,o=Math.round(r/l),c=Math.round(e/l),o*l<r&&++o,c*l>e&&--c),c<o&&.5<=t&&t<2?Xn(r,e,t*2):[o,c,l]}function kd(r,e,t){if(e=+e,r=+r,t=+t,!(t>0))return[];if(r===e)return[r];const n=e<r,[i,s,a]=n?Xn(e,r,t):Xn(r,e,t);if(!(s>=i))return[];const o=s-i+1,c=new Array(o);if(n)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(i+l)/-a;else for(let l=0;l<o;++l)c[l]=(i+l)*a;return c}function Zr(r,e,t){return e=+e,r=+r,t=+t,Xn(r,e,t)[2]}function $d(r,e,t){e=+e,r=+r,t=+t;const n=e<r,i=n?Zr(e,r,t):Zr(r,e,t);return(n?-1:1)*(i<0?1/-i:i)}function Gs(r,e){let t;if(e===void 0)for(const n of r)n!=null&&(t<n||t===void 0&&n>=n)&&(t=n);else{let n=-1;for(let i of r)(i=e(i,++n,r))!=null&&(t<i||t===void 0&&i>=i)&&(t=i)}return t}function Ad(r,e){let t;for(const n of r)n!=null&&(t>n||t===void 0&&n>=n)&&(t=n);return t}function Ws(r,e){let t=0,n=0;if(e===void 0)for(let i of r)i!=null&&(i=+i)>=i&&(++t,n+=i);else{let i=-1;for(let s of r)(s=e(s,++i,r))!=null&&(s=+s)>=s&&(++t,n+=s)}if(t)return n/t}function Sd(r){return r}var Jr=1,Qr=2,ti=3,an=4,Us=1e-6;function Cd(r){return"translate("+r+",0)"}function Md(r){return"translate(0,"+r+")"}function Ed(r){return e=>+r(e)}function Td(r,e){return e=Math.max(0,r.bandwidth()-e*2)/2,r.round()&&(e=Math.round(e)),t=>+r(t)+e}function Ld(){return!this.__axis}function Ks(r,e){var t=[],n=null,i=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=r===Jr||r===an?-1:1,d=r===an||r===Qr?"x":"y",u=r===Jr||r===ti?Cd:Md;function h(f){var g=n??(e.ticks?e.ticks.apply(e,t):e.domain()),p=i??(e.tickFormat?e.tickFormat.apply(e,t):Sd),m=Math.max(s,0)+o,b=e.range(),x=+b[0]+c,v=+b[b.length-1]+c,_=(e.bandwidth?Td:Ed)(e.copy(),c),y=f.selection?f.selection():f,w=y.selectAll(".domain").data([null]),S=y.selectAll(".tick").data(g,e).order(),$=S.exit(),k=S.enter().append("g").attr("class","tick"),A=S.select("line"),T=S.select("text");w=w.merge(w.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),S=S.merge(k),A=A.merge(k.append("line").attr("stroke","currentColor").attr(d+"2",l*s)),T=T.merge(k.append("text").attr("fill","currentColor").attr(d,l*m).attr("dy",r===Jr?"0em":r===ti?"0.71em":"0.32em")),f!==y&&(w=w.transition(f),S=S.transition(f),A=A.transition(f),T=T.transition(f),$=$.transition(f).attr("opacity",Us).attr("transform",function(M){return isFinite(M=_(M))?u(M+c):this.getAttribute("transform")}),k.attr("opacity",Us).attr("transform",function(M){var E=this.parentNode.__axis;return u((E&&isFinite(E=E(M))?E:_(M))+c)})),$.remove(),w.attr("d",r===an||r===Qr?a?"M"+l*a+","+x+"H"+c+"V"+v+"H"+l*a:"M"+c+","+x+"V"+v:a?"M"+x+","+l*a+"V"+c+"H"+v+"V"+l*a:"M"+x+","+c+"H"+v),S.attr("opacity",1).attr("transform",function(M){return u(_(M)+c)}),A.attr(d+"2",l*s),T.attr(d,l*m).text(p),y.filter(Ld).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",r===Qr?"start":r===an?"end":"middle"),y.each(function(){this.__axis=_})}return h.scale=function(f){return arguments.length?(e=f,h):e},h.ticks=function(){return t=Array.from(arguments),h},h.tickArguments=function(f){return arguments.length?(t=f==null?[]:Array.from(f),h):t.slice()},h.tickValues=function(f){return arguments.length?(n=f==null?null:Array.from(f),h):n&&n.slice()},h.tickFormat=function(f){return arguments.length?(i=f,h):i},h.tickSize=function(f){return arguments.length?(s=a=+f,h):s},h.tickSizeInner=function(f){return arguments.length?(s=+f,h):s},h.tickSizeOuter=function(f){return arguments.length?(a=+f,h):a},h.tickPadding=function(f){return arguments.length?(o=+f,h):o},h.offset=function(f){return arguments.length?(c=+f,h):c},h}function Yn(r){return Ks(ti,r)}function Gn(r){return Ks(an,r)}var Pd={value:()=>{}};function ei(){for(var r=0,e=arguments.length,t={},n;r<e;++r){if(!(n=arguments[r]+"")||n in t||/[\s.]/.test(n))throw new Error("illegal type: "+n);t[n]=[]}return new Wn(t)}function Wn(r){this._=r}function zd(r,e){return r.trim().split(/^|\s+/).map(function(t){var n="",i=t.indexOf(".");if(i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}})}Wn.prototype=ei.prototype={constructor:Wn,on:function(r,e){var t=this._,n=zd(r+"",t),i,s=-1,a=n.length;if(arguments.length<2){for(;++s<a;)if((i=(r=n[s]).type)&&(i=Id(t[i],r.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<a;)if(i=(r=n[s]).type)t[i]=Zs(t[i],r.name,e);else if(e==null)for(i in t)t[i]=Zs(t[i],r.name,null);return this},copy:function(){var r={},e=this._;for(var t in e)r[t]=e[t].slice();return new Wn(r)},call:function(r,e){if((i=arguments.length-2)>0)for(var t=new Array(i),n=0,i,s;n<i;++n)t[n]=arguments[n+2];if(!this._.hasOwnProperty(r))throw new Error("unknown type: "+r);for(s=this._[r],n=0,i=s.length;n<i;++n)s[n].value.apply(e,t)},apply:function(r,e,t){if(!this._.hasOwnProperty(r))throw new Error("unknown type: "+r);for(var n=this._[r],i=0,s=n.length;i<s;++i)n[i].value.apply(e,t)}};function Id(r,e){for(var t=0,n=r.length,i;t<n;++t)if((i=r[t]).name===e)return i.value}function Zs(r,e,t){for(var n=0,i=r.length;n<i;++n)if(r[n].name===e){r[n]=Pd,r=r.slice(0,n).concat(r.slice(n+1));break}return t!=null&&r.push({name:e,value:t}),r}var ni="http://www.w3.org/1999/xhtml";const Js={svg:"http://www.w3.org/2000/svg",xhtml:ni,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Un(r){var e=r+="",t=e.indexOf(":");return t>=0&&(e=r.slice(0,t))!=="xmlns"&&(r=r.slice(t+1)),Js.hasOwnProperty(e)?{space:Js[e],local:r}:r}function qd(r){return function(){var e=this.ownerDocument,t=this.namespaceURI;return t===ni&&e.documentElement.namespaceURI===ni?e.createElement(r):e.createElementNS(t,r)}}function Fd(r){return function(){return this.ownerDocument.createElementNS(r.space,r.local)}}function Qs(r){var e=Un(r);return(e.local?Fd:qd)(e)}function Nd(){}function ri(r){return r==null?Nd:function(){return this.querySelector(r)}}function Dd(r){typeof r!="function"&&(r=ri(r));for(var e=this._groups,t=e.length,n=new Array(t),i=0;i<t;++i)for(var s=e[i],a=s.length,o=n[i]=new Array(a),c,l,d=0;d<a;++d)(c=s[d])&&(l=r.call(c,c.__data__,d,s))&&("__data__"in c&&(l.__data__=c.__data__),o[d]=l);return new wt(n,this._parents)}function Od(r){return r==null?[]:Array.isArray(r)?r:Array.from(r)}function Rd(){return[]}function ta(r){return r==null?Rd:function(){return this.querySelectorAll(r)}}function Bd(r){return function(){return Od(r.apply(this,arguments))}}function Hd(r){typeof r=="function"?r=Bd(r):r=ta(r);for(var e=this._groups,t=e.length,n=[],i=[],s=0;s<t;++s)for(var a=e[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(n.push(r.call(c,c.__data__,l,a)),i.push(c));return new wt(n,i)}function ea(r){return function(){return this.matches(r)}}function na(r){return function(e){return e.matches(r)}}var jd=Array.prototype.find;function Vd(r){return function(){return jd.call(this.children,r)}}function Xd(){return this.firstElementChild}function Yd(r){return this.select(r==null?Xd:Vd(typeof r=="function"?r:na(r)))}var Gd=Array.prototype.filter;function Wd(){return Array.from(this.children)}function Ud(r){return function(){return Gd.call(this.children,r)}}function Kd(r){return this.selectAll(r==null?Wd:Ud(typeof r=="function"?r:na(r)))}function Zd(r){typeof r!="function"&&(r=ea(r));for(var e=this._groups,t=e.length,n=new Array(t),i=0;i<t;++i)for(var s=e[i],a=s.length,o=n[i]=[],c,l=0;l<a;++l)(c=s[l])&&r.call(c,c.__data__,l,s)&&o.push(c);return new wt(n,this._parents)}function ra(r){return new Array(r.length)}function Jd(){return new wt(this._enter||this._groups.map(ra),this._parents)}function Kn(r,e){this.ownerDocument=r.ownerDocument,this.namespaceURI=r.namespaceURI,this._next=null,this._parent=r,this.__data__=e}Kn.prototype={constructor:Kn,appendChild:function(r){return this._parent.insertBefore(r,this._next)},insertBefore:function(r,e){return this._parent.insertBefore(r,e)},querySelector:function(r){return this._parent.querySelector(r)},querySelectorAll:function(r){return this._parent.querySelectorAll(r)}};function Qd(r){return function(){return r}}function tu(r,e,t,n,i,s){for(var a=0,o,c=e.length,l=s.length;a<l;++a)(o=e[a])?(o.__data__=s[a],n[a]=o):t[a]=new Kn(r,s[a]);for(;a<c;++a)(o=e[a])&&(i[a]=o)}function eu(r,e,t,n,i,s,a){var o,c,l=new Map,d=e.length,u=s.length,h=new Array(d),f;for(o=0;o<d;++o)(c=e[o])&&(h[o]=f=a.call(c,c.__data__,o,e)+"",l.has(f)?i[o]=c:l.set(f,c));for(o=0;o<u;++o)f=a.call(r,s[o],o,s)+"",(c=l.get(f))?(n[o]=c,c.__data__=s[o],l.delete(f)):t[o]=new Kn(r,s[o]);for(o=0;o<d;++o)(c=e[o])&&l.get(h[o])===c&&(i[o]=c)}function nu(r){return r.__data__}function ru(r,e){if(!arguments.length)return Array.from(this,nu);var t=e?eu:tu,n=this._parents,i=this._groups;typeof r!="function"&&(r=Qd(r));for(var s=i.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var d=n[l],u=i[l],h=u.length,f=iu(r.call(d,d&&d.__data__,l,n)),g=f.length,p=o[l]=new Array(g),m=a[l]=new Array(g),b=c[l]=new Array(h);t(d,u,p,m,b,f,e);for(var x=0,v=0,_,y;x<g;++x)if(_=p[x]){for(x>=v&&(v=x+1);!(y=m[v])&&++v<g;);_._next=y||null}}return a=new wt(a,n),a._enter=o,a._exit=c,a}function iu(r){return typeof r=="object"&&"length"in r?r:Array.from(r)}function su(){return new wt(this._exit||this._groups.map(ra),this._parents)}function au(r,e,t){var n=this.enter(),i=this,s=this.exit();return typeof r=="function"?(n=r(n),n&&(n=n.selection())):n=n.append(r+""),e!=null&&(i=e(i),i&&(i=i.selection())),t==null?s.remove():t(s),n&&i?n.merge(i).order():i}function ou(r){for(var e=r.selection?r.selection():r,t=this._groups,n=e._groups,i=t.length,s=n.length,a=Math.min(i,s),o=new Array(i),c=0;c<a;++c)for(var l=t[c],d=n[c],u=l.length,h=o[c]=new Array(u),f,g=0;g<u;++g)(f=l[g]||d[g])&&(h[g]=f);for(;c<i;++c)o[c]=t[c];return new wt(o,this._parents)}function lu(){for(var r=this._groups,e=-1,t=r.length;++e<t;)for(var n=r[e],i=n.length-1,s=n[i],a;--i>=0;)(a=n[i])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function cu(r){r||(r=du);function e(u,h){return u&&h?r(u.__data__,h.__data__):!u-!h}for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s){for(var a=t[s],o=a.length,c=i[s]=new Array(o),l,d=0;d<o;++d)(l=a[d])&&(c[d]=l);c.sort(e)}return new wt(i,this._parents).order()}function du(r,e){return r<e?-1:r>e?1:r>=e?0:NaN}function uu(){var r=arguments[0];return arguments[0]=this,r.apply(null,arguments),this}function hu(){return Array.from(this)}function fu(){for(var r=this._groups,e=0,t=r.length;e<t;++e)for(var n=r[e],i=0,s=n.length;i<s;++i){var a=n[i];if(a)return a}return null}function pu(){let r=0;for(const e of this)++r;return r}function gu(){return!this.node()}function mu(r){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],s=0,a=i.length,o;s<a;++s)(o=i[s])&&r.call(o,o.__data__,s,i);return this}function _u(r){return function(){this.removeAttribute(r)}}function vu(r){return function(){this.removeAttributeNS(r.space,r.local)}}function bu(r,e){return function(){this.setAttribute(r,e)}}function xu(r,e){return function(){this.setAttributeNS(r.space,r.local,e)}}function yu(r,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttribute(r):this.setAttribute(r,t)}}function wu(r,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttributeNS(r.space,r.local):this.setAttributeNS(r.space,r.local,t)}}function ku(r,e){var t=Un(r);if(arguments.length<2){var n=this.node();return t.local?n.getAttributeNS(t.space,t.local):n.getAttribute(t)}return this.each((e==null?t.local?vu:_u:typeof e=="function"?t.local?wu:yu:t.local?xu:bu)(t,e))}function ia(r){return r.ownerDocument&&r.ownerDocument.defaultView||r.document&&r||r.defaultView}function $u(r){return function(){this.style.removeProperty(r)}}function Au(r,e,t){return function(){this.style.setProperty(r,e,t)}}function Su(r,e,t){return function(){var n=e.apply(this,arguments);n==null?this.style.removeProperty(r):this.style.setProperty(r,n,t)}}function Cu(r,e,t){return arguments.length>1?this.each((e==null?$u:typeof e=="function"?Su:Au)(r,e,t??"")):qe(this.node(),r)}function qe(r,e){return r.style.getPropertyValue(e)||ia(r).getComputedStyle(r,null).getPropertyValue(e)}function Mu(r){return function(){delete this[r]}}function Eu(r,e){return function(){this[r]=e}}function Tu(r,e){return function(){var t=e.apply(this,arguments);t==null?delete this[r]:this[r]=t}}function Lu(r,e){return arguments.length>1?this.each((e==null?Mu:typeof e=="function"?Tu:Eu)(r,e)):this.node()[r]}function sa(r){return r.trim().split(/^|\s+/)}function ii(r){return r.classList||new aa(r)}function aa(r){this._node=r,this._names=sa(r.getAttribute("class")||"")}aa.prototype={add:function(r){var e=this._names.indexOf(r);e<0&&(this._names.push(r),this._node.setAttribute("class",this._names.join(" ")))},remove:function(r){var e=this._names.indexOf(r);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(r){return this._names.indexOf(r)>=0}};function oa(r,e){for(var t=ii(r),n=-1,i=e.length;++n<i;)t.add(e[n])}function la(r,e){for(var t=ii(r),n=-1,i=e.length;++n<i;)t.remove(e[n])}function Pu(r){return function(){oa(this,r)}}function zu(r){return function(){la(this,r)}}function Iu(r,e){return function(){(e.apply(this,arguments)?oa:la)(this,r)}}function qu(r,e){var t=sa(r+"");if(arguments.length<2){for(var n=ii(this.node()),i=-1,s=t.length;++i<s;)if(!n.contains(t[i]))return!1;return!0}return this.each((typeof e=="function"?Iu:e?Pu:zu)(t,e))}function Fu(){this.textContent=""}function Nu(r){return function(){this.textContent=r}}function Du(r){return function(){var e=r.apply(this,arguments);this.textContent=e??""}}function Ou(r){return arguments.length?this.each(r==null?Fu:(typeof r=="function"?Du:Nu)(r)):this.node().textContent}function Ru(){this.innerHTML=""}function Bu(r){return function(){this.innerHTML=r}}function Hu(r){return function(){var e=r.apply(this,arguments);this.innerHTML=e??""}}function ju(r){return arguments.length?this.each(r==null?Ru:(typeof r=="function"?Hu:Bu)(r)):this.node().innerHTML}function Vu(){this.nextSibling&&this.parentNode.appendChild(this)}function Xu(){return this.each(Vu)}function Yu(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Gu(){return this.each(Yu)}function Wu(r){var e=typeof r=="function"?r:Qs(r);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function Uu(){return null}function Ku(r,e){var t=typeof r=="function"?r:Qs(r),n=e==null?Uu:typeof e=="function"?e:ri(e);return this.select(function(){return this.insertBefore(t.apply(this,arguments),n.apply(this,arguments)||null)})}function Zu(){var r=this.parentNode;r&&r.removeChild(this)}function Ju(){return this.each(Zu)}function Qu(){var r=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(r,this.nextSibling):r}function th(){var r=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(r,this.nextSibling):r}function eh(r){return this.select(r?th:Qu)}function nh(r){return arguments.length?this.property("__data__",r):this.node().__data__}function rh(r){return function(e){r.call(this,e,this.__data__)}}function ih(r){return r.trim().split(/^|\s+/).map(function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function sh(r){return function(){var e=this.__on;if(e){for(var t=0,n=-1,i=e.length,s;t<i;++t)s=e[t],(!r.type||s.type===r.type)&&s.name===r.name?this.removeEventListener(s.type,s.listener,s.options):e[++n]=s;++n?e.length=n:delete this.__on}}}function ah(r,e,t){return function(){var n=this.__on,i,s=rh(e);if(n){for(var a=0,o=n.length;a<o;++a)if((i=n[a]).type===r.type&&i.name===r.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=t),i.value=e;return}}this.addEventListener(r.type,s,t),i={type:r.type,name:r.name,value:e,listener:s,options:t},n?n.push(i):this.__on=[i]}}function oh(r,e,t){var n=ih(r+""),i,s=n.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,d;c<l;++c)for(i=0,d=o[c];i<s;++i)if((a=n[i]).type===d.type&&a.name===d.name)return d.value}return}for(o=e?ah:sh,i=0;i<s;++i)this.each(o(n[i],e,t));return this}function ca(r,e,t){var n=ia(r),i=n.CustomEvent;typeof i=="function"?i=new i(e,t):(i=n.document.createEvent("Event"),t?(i.initEvent(e,t.bubbles,t.cancelable),i.detail=t.detail):i.initEvent(e,!1,!1)),r.dispatchEvent(i)}function lh(r,e){return function(){return ca(this,r,e)}}function ch(r,e){return function(){return ca(this,r,e.apply(this,arguments))}}function dh(r,e){return this.each((typeof e=="function"?ch:lh)(r,e))}function*uh(){for(var r=this._groups,e=0,t=r.length;e<t;++e)for(var n=r[e],i=0,s=n.length,a;i<s;++i)(a=n[i])&&(yield a)}var da=[null];function wt(r,e){this._groups=r,this._parents=e}function on(){return new wt([[document.documentElement]],da)}function hh(){return this}wt.prototype=on.prototype={constructor:wt,select:Dd,selectAll:Hd,selectChild:Yd,selectChildren:Kd,filter:Zd,data:ru,enter:Jd,exit:su,join:au,merge:ou,selection:hh,order:lu,sort:cu,call:uu,nodes:hu,node:fu,size:pu,empty:gu,each:mu,attr:ku,style:Cu,property:Lu,classed:qu,text:Ou,html:ju,raise:Xu,lower:Gu,append:Wu,insert:Ku,remove:Ju,clone:eh,datum:nh,on:oh,dispatch:dh,[Symbol.iterator]:uh};function G(r){return typeof r=="string"?new wt([[document.querySelector(r)]],[document.documentElement]):new wt([[r]],da)}function fh(r){let e;for(;e=r.sourceEvent;)r=e;return r}function si(r,e){if(r=fh(r),e===void 0&&(e=r.currentTarget),e){var t=e.ownerSVGElement||e;if(t.createSVGPoint){var n=t.createSVGPoint();return n.x=r.clientX,n.y=r.clientY,n=n.matrixTransform(e.getScreenCTM().inverse()),[n.x,n.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[r.clientX-i.left-e.clientLeft,r.clientY-i.top-e.clientTop]}}return[r.pageX,r.pageY]}const ph={passive:!1},ln={capture:!0,passive:!1};function ai(r){r.stopImmediatePropagation()}function Fe(r){r.preventDefault(),r.stopImmediatePropagation()}function gh(r){var e=r.document.documentElement,t=G(r).on("dragstart.drag",Fe,ln);"onselectstart"in e?t.on("selectstart.drag",Fe,ln):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function mh(r,e){var t=r.document.documentElement,n=G(r).on("dragstart.drag",null);e&&(n.on("click.drag",Fe,ln),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in t?n.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}const Zn=r=>()=>r;function oi(r,{sourceEvent:e,subject:t,target:n,identifier:i,active:s,x:a,y:o,dx:c,dy:l,dispatch:d}){Object.defineProperties(this,{type:{value:r,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:d}})}oi.prototype.on=function(){var r=this._.on.apply(this._,arguments);return r===this._?this:r};function _h(r){return!r.ctrlKey&&!r.button}function vh(){return this.parentNode}function bh(r,e){return e??{x:r.x,y:r.y}}function xh(){return navigator.maxTouchPoints||"ontouchstart"in this}function yh(){var r=_h,e=vh,t=bh,n=xh,i={},s=ei("start","drag","end"),a=0,o,c,l,d,u=0;function h(_){_.on("mousedown.drag",f).filter(n).on("touchstart.drag",m).on("touchmove.drag",b,ph).on("touchend.drag touchcancel.drag",x).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function f(_,y){if(!(d||!r.call(this,_,y))){var w=v(this,e.call(this,_,y),_,y,"mouse");w&&(G(_.view).on("mousemove.drag",g,ln).on("mouseup.drag",p,ln),gh(_.view),ai(_),l=!1,o=_.clientX,c=_.clientY,w("start",_))}}function g(_){if(Fe(_),!l){var y=_.clientX-o,w=_.clientY-c;l=y*y+w*w>u}i.mouse("drag",_)}function p(_){G(_.view).on("mousemove.drag mouseup.drag",null),mh(_.view,l),Fe(_),i.mouse("end",_)}function m(_,y){if(r.call(this,_,y)){var w=_.changedTouches,S=e.call(this,_,y),$=w.length,k,A;for(k=0;k<$;++k)(A=v(this,S,_,y,w[k].identifier,w[k]))&&(ai(_),A("start",_,w[k]))}}function b(_){var y=_.changedTouches,w=y.length,S,$;for(S=0;S<w;++S)($=i[y[S].identifier])&&(Fe(_),$("drag",_,y[S]))}function x(_){var y=_.changedTouches,w=y.length,S,$;for(d&&clearTimeout(d),d=setTimeout(function(){d=null},500),S=0;S<w;++S)($=i[y[S].identifier])&&(ai(_),$("end",_,y[S]))}function v(_,y,w,S,$,k){var A=s.copy(),T=si(k||w,y),M,E,L;if((L=t.call(_,new oi("beforestart",{sourceEvent:w,target:h,identifier:$,active:a,x:T[0],y:T[1],dx:0,dy:0,dispatch:A}),S))!=null)return M=L.x-T[0]||0,E=L.y-T[1]||0,function C(z,I,F){var q=T,N;switch(z){case"start":i[$]=C,N=a++;break;case"end":delete i[$],--a;case"drag":T=si(F||I,y),N=a;break}A.call(z,_,new oi(z,{sourceEvent:I,subject:L,target:h,identifier:$,active:N,x:T[0]+M,y:T[1]+E,dx:T[0]-q[0],dy:T[1]-q[1],dispatch:A}),S)}}return h.filter=function(_){return arguments.length?(r=typeof _=="function"?_:Zn(!!_),h):r},h.container=function(_){return arguments.length?(e=typeof _=="function"?_:Zn(_),h):e},h.subject=function(_){return arguments.length?(t=typeof _=="function"?_:Zn(_),h):t},h.touchable=function(_){return arguments.length?(n=typeof _=="function"?_:Zn(!!_),h):n},h.on=function(){var _=s.on.apply(s,arguments);return _===s?h:_},h.clickDistance=function(_){return arguments.length?(u=(_=+_)*_,h):Math.sqrt(u)},h}function li(r,e,t){r.prototype=e.prototype=t,t.constructor=r}function ua(r,e){var t=Object.create(r.prototype);for(var n in e)t[n]=e[n];return t}function cn(){}var dn=.7,Jn=1/dn,Ne="\\s*([+-]?\\d+)\\s*",un="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Ot="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",wh=/^#([0-9a-f]{3,8})$/,kh=new RegExp(`^rgb\\(${Ne},${Ne},${Ne}\\)$`),$h=new RegExp(`^rgb\\(${Ot},${Ot},${Ot}\\)$`),Ah=new RegExp(`^rgba\\(${Ne},${Ne},${Ne},${un}\\)$`),Sh=new RegExp(`^rgba\\(${Ot},${Ot},${Ot},${un}\\)$`),Ch=new RegExp(`^hsl\\(${un},${Ot},${Ot}\\)$`),Mh=new RegExp(`^hsla\\(${un},${Ot},${Ot},${un}\\)$`),ha={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};li(cn,Gt,{copy(r){return Object.assign(new this.constructor,this,r)},displayable(){return this.rgb().displayable()},hex:fa,formatHex:fa,formatHex8:Eh,formatHsl:Th,formatRgb:pa,toString:pa});function fa(){return this.rgb().formatHex()}function Eh(){return this.rgb().formatHex8()}function Th(){return ba(this).formatHsl()}function pa(){return this.rgb().formatRgb()}function Gt(r){var e,t;return r=(r+"").trim().toLowerCase(),(e=wh.exec(r))?(t=e[1].length,e=parseInt(e[1],16),t===6?ga(e):t===3?new pt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):t===8?Qn(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):t===4?Qn(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=kh.exec(r))?new pt(e[1],e[2],e[3],1):(e=$h.exec(r))?new pt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Ah.exec(r))?Qn(e[1],e[2],e[3],e[4]):(e=Sh.exec(r))?Qn(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Ch.exec(r))?va(e[1],e[2]/100,e[3]/100,1):(e=Mh.exec(r))?va(e[1],e[2]/100,e[3]/100,e[4]):ha.hasOwnProperty(r)?ga(ha[r]):r==="transparent"?new pt(NaN,NaN,NaN,0):null}function ga(r){return new pt(r>>16&255,r>>8&255,r&255,1)}function Qn(r,e,t,n){return n<=0&&(r=e=t=NaN),new pt(r,e,t,n)}function Lh(r){return r instanceof cn||(r=Gt(r)),r?(r=r.rgb(),new pt(r.r,r.g,r.b,r.opacity)):new pt}function tr(r,e,t,n){return arguments.length===1?Lh(r):new pt(r,e,t,n??1)}function pt(r,e,t,n){this.r=+r,this.g=+e,this.b=+t,this.opacity=+n}li(pt,tr,ua(cn,{brighter(r){return r=r==null?Jn:Math.pow(Jn,r),new pt(this.r*r,this.g*r,this.b*r,this.opacity)},darker(r){return r=r==null?dn:Math.pow(dn,r),new pt(this.r*r,this.g*r,this.b*r,this.opacity)},rgb(){return this},clamp(){return new pt(ge(this.r),ge(this.g),ge(this.b),er(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ma,formatHex:ma,formatHex8:Ph,formatRgb:_a,toString:_a}));function ma(){return`#${me(this.r)}${me(this.g)}${me(this.b)}`}function Ph(){return`#${me(this.r)}${me(this.g)}${me(this.b)}${me((isNaN(this.opacity)?1:this.opacity)*255)}`}function _a(){const r=er(this.opacity);return`${r===1?"rgb(":"rgba("}${ge(this.r)}, ${ge(this.g)}, ${ge(this.b)}${r===1?")":`, ${r})`}`}function er(r){return isNaN(r)?1:Math.max(0,Math.min(1,r))}function ge(r){return Math.max(0,Math.min(255,Math.round(r)||0))}function me(r){return r=ge(r),(r<16?"0":"")+r.toString(16)}function va(r,e,t,n){return n<=0?r=e=t=NaN:t<=0||t>=1?r=e=NaN:e<=0&&(r=NaN),new qt(r,e,t,n)}function ba(r){if(r instanceof qt)return new qt(r.h,r.s,r.l,r.opacity);if(r instanceof cn||(r=Gt(r)),!r)return new qt;if(r instanceof qt)return r;r=r.rgb();var e=r.r/255,t=r.g/255,n=r.b/255,i=Math.min(e,t,n),s=Math.max(e,t,n),a=NaN,o=s-i,c=(s+i)/2;return o?(e===s?a=(t-n)/o+(t<n)*6:t===s?a=(n-e)/o+2:a=(e-t)/o+4,o/=c<.5?s+i:2-s-i,a*=60):o=c>0&&c<1?0:a,new qt(a,o,c,r.opacity)}function zh(r,e,t,n){return arguments.length===1?ba(r):new qt(r,e,t,n??1)}function qt(r,e,t,n){this.h=+r,this.s=+e,this.l=+t,this.opacity=+n}li(qt,zh,ua(cn,{brighter(r){return r=r==null?Jn:Math.pow(Jn,r),new qt(this.h,this.s,this.l*r,this.opacity)},darker(r){return r=r==null?dn:Math.pow(dn,r),new qt(this.h,this.s,this.l*r,this.opacity)},rgb(){var r=this.h%360+(this.h<0)*360,e=isNaN(r)||isNaN(this.s)?0:this.s,t=this.l,n=t+(t<.5?t:1-t)*e,i=2*t-n;return new pt(ci(r>=240?r-240:r+120,i,n),ci(r,i,n),ci(r<120?r+240:r-120,i,n),this.opacity)},clamp(){return new qt(xa(this.h),nr(this.s),nr(this.l),er(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const r=er(this.opacity);return`${r===1?"hsl(":"hsla("}${xa(this.h)}, ${nr(this.s)*100}%, ${nr(this.l)*100}%${r===1?")":`, ${r})`}`}}));function xa(r){return r=(r||0)%360,r<0?r+360:r}function nr(r){return Math.max(0,Math.min(1,r||0))}function ci(r,e,t){return(r<60?e+(t-e)*r/60:r<180?t:r<240?e+(t-e)*(240-r)/60:e)*255}function Ih(r,e,t,n,i){var s=r*r,a=s*r;return((1-3*r+3*s-a)*e+(4-6*s+3*a)*t+(1+3*r+3*s-3*a)*n+a*i)/6}function qh(r){var e=r.length-1;return function(t){var n=t<=0?t=0:t>=1?(t=1,e-1):Math.floor(t*e),i=r[n],s=r[n+1],a=n>0?r[n-1]:2*i-s,o=n<e-1?r[n+2]:2*s-i;return Ih((t-n/e)*e,a,i,s,o)}}const di=r=>()=>r;function Fh(r,e){return function(t){return r+t*e}}function Nh(r,e,t){return r=Math.pow(r,t),e=Math.pow(e,t)-r,t=1/t,function(n){return Math.pow(r+n*e,t)}}function Dh(r){return(r=+r)==1?ya:function(e,t){return t-e?Nh(e,t,r):di(isNaN(e)?t:e)}}function ya(r,e){var t=e-r;return t?Fh(r,t):di(isNaN(r)?e:r)}const rr=(function r(e){var t=Dh(e);function n(i,s){var a=t((i=tr(i)).r,(s=tr(s)).r),o=t(i.g,s.g),c=t(i.b,s.b),l=ya(i.opacity,s.opacity);return function(d){return i.r=a(d),i.g=o(d),i.b=c(d),i.opacity=l(d),i+""}}return n.gamma=r,n})(1);function Oh(r){return function(e){var t=e.length,n=new Array(t),i=new Array(t),s=new Array(t),a,o;for(a=0;a<t;++a)o=tr(e[a]),n[a]=o.r||0,i[a]=o.g||0,s[a]=o.b||0;return n=r(n),i=r(i),s=r(s),o.opacity=1,function(c){return o.r=n(c),o.g=i(c),o.b=s(c),o+""}}}var Rh=Oh(qh);function Bh(r,e){e||(e=[]);var t=r?Math.min(e.length,r.length):0,n=e.slice(),i;return function(s){for(i=0;i<t;++i)n[i]=r[i]*(1-s)+e[i]*s;return n}}function Hh(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function jh(r,e){var t=e?e.length:0,n=r?Math.min(t,r.length):0,i=new Array(n),s=new Array(t),a;for(a=0;a<n;++a)i[a]=_e(r[a],e[a]);for(;a<t;++a)s[a]=e[a];return function(o){for(a=0;a<n;++a)s[a]=i[a](o);return s}}function Vh(r,e){var t=new Date;return r=+r,e=+e,function(n){return t.setTime(r*(1-n)+e*n),t}}function Ft(r,e){return r=+r,e=+e,function(t){return r*(1-t)+e*t}}function Xh(r,e){var t={},n={},i;(r===null||typeof r!="object")&&(r={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in r?t[i]=_e(r[i],e[i]):n[i]=e[i];return function(s){for(i in t)n[i]=t[i](s);return n}}var ui=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,hi=new RegExp(ui.source,"g");function Yh(r){return function(){return r}}function Gh(r){return function(e){return r(e)+""}}function wa(r,e){var t=ui.lastIndex=hi.lastIndex=0,n,i,s,a=-1,o=[],c=[];for(r=r+"",e=e+"";(n=ui.exec(r))&&(i=hi.exec(e));)(s=i.index)>t&&(s=e.slice(t,s),o[a]?o[a]+=s:o[++a]=s),(n=n[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,c.push({i:a,x:Ft(n,i)})),t=hi.lastIndex;return t<e.length&&(s=e.slice(t),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?Gh(c[0].x):Yh(e):(e=c.length,function(l){for(var d=0,u;d<e;++d)o[(u=c[d]).i]=u.x(l);return o.join("")})}function _e(r,e){var t=typeof e,n;return e==null||t==="boolean"?di(e):(t==="number"?Ft:t==="string"?(n=Gt(e))?(e=n,rr):wa:e instanceof Gt?rr:e instanceof Date?Vh:Hh(e)?Bh:Array.isArray(e)?jh:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Xh:Ft)(r,e)}function fi(r,e){return r=+r,e=+e,function(t){return Math.round(r*(1-t)+e*t)}}var ka=180/Math.PI,pi={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function $a(r,e,t,n,i,s){var a,o,c;return(a=Math.sqrt(r*r+e*e))&&(r/=a,e/=a),(c=r*t+e*n)&&(t-=r*c,n-=e*c),(o=Math.sqrt(t*t+n*n))&&(t/=o,n/=o,c/=o),r*n<e*t&&(r=-r,e=-e,c=-c,a=-a),{translateX:i,translateY:s,rotate:Math.atan2(e,r)*ka,skewX:Math.atan(c)*ka,scaleX:a,scaleY:o}}var ir;function Wh(r){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(r+"");return e.isIdentity?pi:$a(e.a,e.b,e.c,e.d,e.e,e.f)}function Uh(r){return r==null||(ir||(ir=document.createElementNS("http://www.w3.org/2000/svg","g")),ir.setAttribute("transform",r),!(r=ir.transform.baseVal.consolidate()))?pi:(r=r.matrix,$a(r.a,r.b,r.c,r.d,r.e,r.f))}function Aa(r,e,t,n){function i(l){return l.length?l.pop()+" ":""}function s(l,d,u,h,f,g){if(l!==u||d!==h){var p=f.push("translate(",null,e,null,t);g.push({i:p-4,x:Ft(l,u)},{i:p-2,x:Ft(d,h)})}else(u||h)&&f.push("translate("+u+e+h+t)}function a(l,d,u,h){l!==d?(l-d>180?d+=360:d-l>180&&(l+=360),h.push({i:u.push(i(u)+"rotate(",null,n)-2,x:Ft(l,d)})):d&&u.push(i(u)+"rotate("+d+n)}function o(l,d,u,h){l!==d?h.push({i:u.push(i(u)+"skewX(",null,n)-2,x:Ft(l,d)}):d&&u.push(i(u)+"skewX("+d+n)}function c(l,d,u,h,f,g){if(l!==u||d!==h){var p=f.push(i(f)+"scale(",null,",",null,")");g.push({i:p-4,x:Ft(l,u)},{i:p-2,x:Ft(d,h)})}else(u!==1||h!==1)&&f.push(i(f)+"scale("+u+","+h+")")}return function(l,d){var u=[],h=[];return l=r(l),d=r(d),s(l.translateX,l.translateY,d.translateX,d.translateY,u,h),a(l.rotate,d.rotate,u,h),o(l.skewX,d.skewX,u,h),c(l.scaleX,l.scaleY,d.scaleX,d.scaleY,u,h),l=d=null,function(f){for(var g=-1,p=h.length,m;++g<p;)u[(m=h[g]).i]=m.x(f);return u.join("")}}}var Kh=Aa(Wh,"px, ","px)","deg)"),Zh=Aa(Uh,", ",")",")");function Jh(r,e){e===void 0&&(e=r,r=_e);for(var t=0,n=e.length-1,i=e[0],s=new Array(n<0?0:n);t<n;)s[t]=r(i,i=e[++t]);return function(a){var o=Math.max(0,Math.min(n-1,Math.floor(a*=n)));return s[o](a-o)}}var De=0,hn=0,fn=0,Sa=1e3,sr,pn,ar=0,ve=0,or=0,gn=typeof performance=="object"&&performance.now?performance:Date,Ca=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(r){setTimeout(r,17)};function gi(){return ve||(Ca(Qh),ve=gn.now()+or)}function Qh(){ve=0}function lr(){this._call=this._time=this._next=null}lr.prototype=Ma.prototype={constructor:lr,restart:function(r,e,t){if(typeof r!="function")throw new TypeError("callback is not a function");t=(t==null?gi():+t)+(e==null?0:+e),!this._next&&pn!==this&&(pn?pn._next=this:sr=this,pn=this),this._call=r,this._time=t,mi()},stop:function(){this._call&&(this._call=null,this._time=1/0,mi())}};function Ma(r,e,t){var n=new lr;return n.restart(r,e,t),n}function tf(){gi(),++De;for(var r=sr,e;r;)(e=ve-r._time)>=0&&r._call.call(void 0,e),r=r._next;--De}function Ea(){ve=(ar=gn.now())+or,De=hn=0;try{tf()}finally{De=0,nf(),ve=0}}function ef(){var r=gn.now(),e=r-ar;e>Sa&&(or-=e,ar=r)}function nf(){for(var r,e=sr,t,n=1/0;e;)e._call?(n>e._time&&(n=e._time),r=e,e=e._next):(t=e._next,e._next=null,e=r?r._next=t:sr=t);pn=r,mi(n)}function mi(r){if(!De){hn&&(hn=clearTimeout(hn));var e=r-ve;e>24?(r<1/0&&(hn=setTimeout(Ea,r-gn.now()-or)),fn&&(fn=clearInterval(fn))):(fn||(ar=gn.now(),fn=setInterval(ef,Sa)),De=1,Ca(Ea))}}function Ta(r,e,t){var n=new lr;return e=e==null?0:+e,n.restart(i=>{n.stop(),r(i+e)},e,t),n}var rf=ei("start","end","cancel","interrupt"),sf=[],La=0,Pa=1,_i=2,cr=3,za=4,vi=5,dr=6;function ur(r,e,t,n,i,s){var a=r.__transition;if(!a)r.__transition={};else if(t in a)return;af(r,t,{name:e,index:n,group:i,on:rf,tween:sf,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:La})}function bi(r,e){var t=Nt(r,e);if(t.state>La)throw new Error("too late; already scheduled");return t}function Rt(r,e){var t=Nt(r,e);if(t.state>cr)throw new Error("too late; already running");return t}function Nt(r,e){var t=r.__transition;if(!t||!(t=t[e]))throw new Error("transition not found");return t}function af(r,e,t){var n=r.__transition,i;n[e]=t,t.timer=Ma(s,0,t.time);function s(l){t.state=Pa,t.timer.restart(a,t.delay,t.time),t.delay<=l&&a(l-t.delay)}function a(l){var d,u,h,f;if(t.state!==Pa)return c();for(d in n)if(f=n[d],f.name===t.name){if(f.state===cr)return Ta(a);f.state===za?(f.state=dr,f.timer.stop(),f.on.call("interrupt",r,r.__data__,f.index,f.group),delete n[d]):+d<e&&(f.state=dr,f.timer.stop(),f.on.call("cancel",r,r.__data__,f.index,f.group),delete n[d])}if(Ta(function(){t.state===cr&&(t.state=za,t.timer.restart(o,t.delay,t.time),o(l))}),t.state=_i,t.on.call("start",r,r.__data__,t.index,t.group),t.state===_i){for(t.state=cr,i=new Array(h=t.tween.length),d=0,u=-1;d<h;++d)(f=t.tween[d].value.call(r,r.__data__,t.index,t.group))&&(i[++u]=f);i.length=u+1}}function o(l){for(var d=l<t.duration?t.ease.call(null,l/t.duration):(t.timer.restart(c),t.state=vi,1),u=-1,h=i.length;++u<h;)i[u].call(r,d);t.state===vi&&(t.on.call("end",r,r.__data__,t.index,t.group),c())}function c(){t.state=dr,t.timer.stop(),delete n[e];for(var l in n)return;delete r.__transition}}function of(r,e){var t=r.__transition,n,i,s=!0,a;if(t){e=e==null?null:e+"";for(a in t){if((n=t[a]).name!==e){s=!1;continue}i=n.state>_i&&n.state<vi,n.state=dr,n.timer.stop(),n.on.call(i?"interrupt":"cancel",r,r.__data__,n.index,n.group),delete t[a]}s&&delete r.__transition}}function lf(r){return this.each(function(){of(this,r)})}function cf(r,e){var t,n;return function(){var i=Rt(this,r),s=i.tween;if(s!==t){n=t=s;for(var a=0,o=n.length;a<o;++a)if(n[a].name===e){n=n.slice(),n.splice(a,1);break}}i.tween=n}}function df(r,e,t){var n,i;if(typeof t!="function")throw new Error;return function(){var s=Rt(this,r),a=s.tween;if(a!==n){i=(n=a).slice();for(var o={name:e,value:t},c=0,l=i.length;c<l;++c)if(i[c].name===e){i[c]=o;break}c===l&&i.push(o)}s.tween=i}}function uf(r,e){var t=this._id;if(r+="",arguments.length<2){for(var n=Nt(this.node(),t).tween,i=0,s=n.length,a;i<s;++i)if((a=n[i]).name===r)return a.value;return null}return this.each((e==null?cf:df)(t,r,e))}function xi(r,e,t){var n=r._id;return r.each(function(){var i=Rt(this,n);(i.value||(i.value={}))[e]=t.apply(this,arguments)}),function(i){return Nt(i,n).value[e]}}function Ia(r,e){var t;return(typeof e=="number"?Ft:e instanceof Gt?rr:(t=Gt(e))?(e=t,rr):wa)(r,e)}function hf(r){return function(){this.removeAttribute(r)}}function ff(r){return function(){this.removeAttributeNS(r.space,r.local)}}function pf(r,e,t){var n,i=t+"",s;return function(){var a=this.getAttribute(r);return a===i?null:a===n?s:s=e(n=a,t)}}function gf(r,e,t){var n,i=t+"",s;return function(){var a=this.getAttributeNS(r.space,r.local);return a===i?null:a===n?s:s=e(n=a,t)}}function mf(r,e,t){var n,i,s;return function(){var a,o=t(this),c;return o==null?void this.removeAttribute(r):(a=this.getAttribute(r),c=o+"",a===c?null:a===n&&c===i?s:(i=c,s=e(n=a,o)))}}function _f(r,e,t){var n,i,s;return function(){var a,o=t(this),c;return o==null?void this.removeAttributeNS(r.space,r.local):(a=this.getAttributeNS(r.space,r.local),c=o+"",a===c?null:a===n&&c===i?s:(i=c,s=e(n=a,o)))}}function vf(r,e){var t=Un(r),n=t==="transform"?Zh:Ia;return this.attrTween(r,typeof e=="function"?(t.local?_f:mf)(t,n,xi(this,"attr."+r,e)):e==null?(t.local?ff:hf)(t):(t.local?gf:pf)(t,n,e))}function bf(r,e){return function(t){this.setAttribute(r,e.call(this,t))}}function xf(r,e){return function(t){this.setAttributeNS(r.space,r.local,e.call(this,t))}}function yf(r,e){var t,n;function i(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&xf(r,s)),t}return i._value=e,i}function wf(r,e){var t,n;function i(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&bf(r,s)),t}return i._value=e,i}function kf(r,e){var t="attr."+r;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;var n=Un(r);return this.tween(t,(n.local?yf:wf)(n,e))}function $f(r,e){return function(){bi(this,r).delay=+e.apply(this,arguments)}}function Af(r,e){return e=+e,function(){bi(this,r).delay=e}}function Sf(r){var e=this._id;return arguments.length?this.each((typeof r=="function"?$f:Af)(e,r)):Nt(this.node(),e).delay}function Cf(r,e){return function(){Rt(this,r).duration=+e.apply(this,arguments)}}function Mf(r,e){return e=+e,function(){Rt(this,r).duration=e}}function Ef(r){var e=this._id;return arguments.length?this.each((typeof r=="function"?Cf:Mf)(e,r)):Nt(this.node(),e).duration}function Tf(r,e){if(typeof e!="function")throw new Error;return function(){Rt(this,r).ease=e}}function Lf(r){var e=this._id;return arguments.length?this.each(Tf(e,r)):Nt(this.node(),e).ease}function Pf(r,e){return function(){var t=e.apply(this,arguments);if(typeof t!="function")throw new Error;Rt(this,r).ease=t}}function zf(r){if(typeof r!="function")throw new Error;return this.each(Pf(this._id,r))}function If(r){typeof r!="function"&&(r=ea(r));for(var e=this._groups,t=e.length,n=new Array(t),i=0;i<t;++i)for(var s=e[i],a=s.length,o=n[i]=[],c,l=0;l<a;++l)(c=s[l])&&r.call(c,c.__data__,l,s)&&o.push(c);return new Wt(n,this._parents,this._name,this._id)}function qf(r){if(r._id!==this._id)throw new Error;for(var e=this._groups,t=r._groups,n=e.length,i=t.length,s=Math.min(n,i),a=new Array(n),o=0;o<s;++o)for(var c=e[o],l=t[o],d=c.length,u=a[o]=new Array(d),h,f=0;f<d;++f)(h=c[f]||l[f])&&(u[f]=h);for(;o<n;++o)a[o]=e[o];return new Wt(a,this._parents,this._name,this._id)}function Ff(r){return(r+"").trim().split(/^|\s+/).every(function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||e==="start"})}function Nf(r,e,t){var n,i,s=Ff(e)?bi:Rt;return function(){var a=s(this,r),o=a.on;o!==n&&(i=(n=o).copy()).on(e,t),a.on=i}}function Df(r,e){var t=this._id;return arguments.length<2?Nt(this.node(),t).on.on(r):this.each(Nf(t,r,e))}function Of(r){return function(){var e=this.parentNode;for(var t in this.__transition)if(+t!==r)return;e&&e.removeChild(this)}}function Rf(){return this.on("end.remove",Of(this._id))}function Bf(r){var e=this._name,t=this._id;typeof r!="function"&&(r=ri(r));for(var n=this._groups,i=n.length,s=new Array(i),a=0;a<i;++a)for(var o=n[a],c=o.length,l=s[a]=new Array(c),d,u,h=0;h<c;++h)(d=o[h])&&(u=r.call(d,d.__data__,h,o))&&("__data__"in d&&(u.__data__=d.__data__),l[h]=u,ur(l[h],e,t,h,l,Nt(d,t)));return new Wt(s,this._parents,e,t)}function Hf(r){var e=this._name,t=this._id;typeof r!="function"&&(r=ta(r));for(var n=this._groups,i=n.length,s=[],a=[],o=0;o<i;++o)for(var c=n[o],l=c.length,d,u=0;u<l;++u)if(d=c[u]){for(var h=r.call(d,d.__data__,u,c),f,g=Nt(d,t),p=0,m=h.length;p<m;++p)(f=h[p])&&ur(f,e,t,p,h,g);s.push(h),a.push(d)}return new Wt(s,a,e,t)}var jf=on.prototype.constructor;function Vf(){return new jf(this._groups,this._parents)}function Xf(r,e){var t,n,i;return function(){var s=qe(this,r),a=(this.style.removeProperty(r),qe(this,r));return s===a?null:s===t&&a===n?i:i=e(t=s,n=a)}}function qa(r){return function(){this.style.removeProperty(r)}}function Yf(r,e,t){var n,i=t+"",s;return function(){var a=qe(this,r);return a===i?null:a===n?s:s=e(n=a,t)}}function Gf(r,e,t){var n,i,s;return function(){var a=qe(this,r),o=t(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(r),qe(this,r))),a===c?null:a===n&&c===i?s:(i=c,s=e(n=a,o))}}function Wf(r,e){var t,n,i,s="style."+e,a="end."+s,o;return function(){var c=Rt(this,r),l=c.on,d=c.value[s]==null?o||(o=qa(e)):void 0;(l!==t||i!==d)&&(n=(t=l).copy()).on(a,i=d),c.on=n}}function Uf(r,e,t){var n=(r+="")=="transform"?Kh:Ia;return e==null?this.styleTween(r,Xf(r,n)).on("end.style."+r,qa(r)):typeof e=="function"?this.styleTween(r,Gf(r,n,xi(this,"style."+r,e))).each(Wf(this._id,r)):this.styleTween(r,Yf(r,n,e),t).on("end.style."+r,null)}function Kf(r,e,t){return function(n){this.style.setProperty(r,e.call(this,n),t)}}function Zf(r,e,t){var n,i;function s(){var a=e.apply(this,arguments);return a!==i&&(n=(i=a)&&Kf(r,a,t)),n}return s._value=e,s}function Jf(r,e,t){var n="style."+(r+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;return this.tween(n,Zf(r,e,t??""))}function Qf(r){return function(){this.textContent=r}}function tp(r){return function(){var e=r(this);this.textContent=e??""}}function ep(r){return this.tween("text",typeof r=="function"?tp(xi(this,"text",r)):Qf(r==null?"":r+""))}function np(r){return function(e){this.textContent=r.call(this,e)}}function rp(r){var e,t;function n(){var i=r.apply(this,arguments);return i!==t&&(e=(t=i)&&np(i)),e}return n._value=r,n}function ip(r){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(r==null)return this.tween(e,null);if(typeof r!="function")throw new Error;return this.tween(e,rp(r))}function sp(){for(var r=this._name,e=this._id,t=Fa(),n=this._groups,i=n.length,s=0;s<i;++s)for(var a=n[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var d=Nt(c,e);ur(c,r,t,l,a,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new Wt(n,this._parents,r,t)}function ap(){var r,e,t=this,n=t._id,i=t.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--i===0&&s()}};t.each(function(){var l=Rt(this,n),d=l.on;d!==r&&(e=(r=d).copy(),e._.cancel.push(o),e._.interrupt.push(o),e._.end.push(c)),l.on=e}),i===0&&s()})}var op=0;function Wt(r,e,t,n){this._groups=r,this._parents=e,this._name=t,this._id=n}function Fa(){return++op}var Ut=on.prototype;Wt.prototype={constructor:Wt,select:Bf,selectAll:Hf,selectChild:Ut.selectChild,selectChildren:Ut.selectChildren,filter:If,merge:qf,selection:Vf,transition:sp,call:Ut.call,nodes:Ut.nodes,node:Ut.node,size:Ut.size,empty:Ut.empty,each:Ut.each,on:Df,attr:vf,attrTween:kf,style:Uf,styleTween:Jf,text:ep,textTween:ip,remove:Rf,tween:uf,delay:Sf,duration:Ef,ease:Lf,easeVarying:zf,end:ap,[Symbol.iterator]:Ut[Symbol.iterator]};function mn(r){return r*(2-r)}function lp(r){return((r*=2)<=1?r*r*r:(r-=2)*r*r+2)/2}var yi=1.70158;(function r(e){e=+e;function t(n){return(n=+n)*n*(e*(n-1)+n)}return t.overshoot=r,t})(yi);var cp=(function r(e){e=+e;function t(n){return--n*n*((n+1)*e+n)+1}return t.overshoot=r,t})(yi);(function r(e){e=+e;function t(n){return((n*=2)<1?n*n*((e+1)*n-e):(n-=2)*n*((e+1)*n+e)+2)/2}return t.overshoot=r,t})(yi);var dp={time:null,delay:0,duration:250,ease:lp};function up(r,e){for(var t;!(t=r.__transition)||!(t=t[e]);)if(!(r=r.parentNode))throw new Error(`transition ${e} not found`);return t}function hp(r){var e,t;r instanceof Wt?(e=r._id,r=r._name):(e=Fa(),(t=dp).time=gi(),r=r==null?null:r+"");for(var n=this._groups,i=n.length,s=0;s<i;++s)for(var a=n[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&ur(c,r,e,l,a,t||up(c,e));return new Wt(n,this._parents,r,e)}on.prototype.interrupt=lf,on.prototype.transition=hp;const wi=Math.PI,ki=2*wi,be=1e-6,fp=ki-be;function Na(r){this._+=r[0];for(let e=1,t=r.length;e<t;++e)this._+=arguments[e]+r[e]}function pp(r){let e=Math.floor(r);if(!(e>=0))throw new Error(`invalid digits: ${r}`);if(e>15)return Na;const t=10**e;return function(n){this._+=n[0];for(let i=1,s=n.length;i<s;++i)this._+=Math.round(arguments[i]*t)/t+n[i]}}let gp=class{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?Na:pp(e)}moveTo(e,t){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,t){this._append`L${this._x1=+e},${this._y1=+t}`}quadraticCurveTo(e,t,n,i){this._append`Q${+e},${+t},${this._x1=+n},${this._y1=+i}`}bezierCurveTo(e,t,n,i,s,a){this._append`C${+e},${+t},${+n},${+i},${this._x1=+s},${this._y1=+a}`}arcTo(e,t,n,i,s){if(e=+e,t=+t,n=+n,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,c=n-e,l=i-t,d=a-e,u=o-t,h=d*d+u*u;if(this._x1===null)this._append`M${this._x1=e},${this._y1=t}`;else if(h>be)if(!(Math.abs(u*c-l*d)>be)||!s)this._append`L${this._x1=e},${this._y1=t}`;else{let f=n-a,g=i-o,p=c*c+l*l,m=f*f+g*g,b=Math.sqrt(p),x=Math.sqrt(h),v=s*Math.tan((wi-Math.acos((p+h-m)/(2*b*x)))/2),_=v/x,y=v/b;Math.abs(_-1)>be&&this._append`L${e+_*d},${t+_*u}`,this._append`A${s},${s},0,0,${+(u*f>d*g)},${this._x1=e+y*c},${this._y1=t+y*l}`}}arc(e,t,n,i,s,a){if(e=+e,t=+t,n=+n,a=!!a,n<0)throw new Error(`negative radius: ${n}`);let o=n*Math.cos(i),c=n*Math.sin(i),l=e+o,d=t+c,u=1^a,h=a?i-s:s-i;this._x1===null?this._append`M${l},${d}`:(Math.abs(this._x1-l)>be||Math.abs(this._y1-d)>be)&&this._append`L${l},${d}`,n&&(h<0&&(h=h%ki+ki),h>fp?this._append`A${n},${n},0,1,${u},${e-o},${t-c}A${n},${n},0,1,${u},${this._x1=l},${this._y1=d}`:h>be&&this._append`A${n},${n},0,${+(h>=wi)},${u},${this._x1=e+n*Math.cos(s)},${this._y1=t+n*Math.sin(s)}`)}rect(e,t,n,i){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}h${n=+n}v${+i}h${-n}Z`}toString(){return this._}};function mp(r){return Math.abs(r=Math.round(r))>=1e21?r.toLocaleString("en").replace(/,/g,""):r.toString(10)}function hr(r,e){if(!isFinite(r)||r===0)return null;var t=(r=e?r.toExponential(e-1):r.toExponential()).indexOf("e"),n=r.slice(0,t);return[n.length>1?n[0]+n.slice(2):n,+r.slice(t+1)]}function Oe(r){return r=hr(Math.abs(r)),r?r[1]:NaN}function _p(r,e){return function(t,n){for(var i=t.length,s=[],a=0,o=r[0],c=0;i>0&&o>0&&(c+o+1>n&&(o=Math.max(1,n-c)),s.push(t.substring(i-=o,i+o)),!((c+=o+1)>n));)o=r[a=(a+1)%r.length];return s.reverse().join(e)}}function vp(r){return function(e){return e.replace(/[0-9]/g,function(t){return r[+t]})}}var bp=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function fr(r){if(!(e=bp.exec(r)))throw new Error("invalid format: "+r);var e;return new $i({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}fr.prototype=$i.prototype;function $i(r){this.fill=r.fill===void 0?" ":r.fill+"",this.align=r.align===void 0?">":r.align+"",this.sign=r.sign===void 0?"-":r.sign+"",this.symbol=r.symbol===void 0?"":r.symbol+"",this.zero=!!r.zero,this.width=r.width===void 0?void 0:+r.width,this.comma=!!r.comma,this.precision=r.precision===void 0?void 0:+r.precision,this.trim=!!r.trim,this.type=r.type===void 0?"":r.type+""}$i.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function xp(r){t:for(var e=r.length,t=1,n=-1,i;t<e;++t)switch(r[t]){case".":n=i=t;break;case"0":n===0&&(n=t),i=t;break;default:if(!+r[t])break t;n>0&&(n=0);break}return n>0?r.slice(0,n)+r.slice(i+1):r}var pr;function yp(r,e){var t=hr(r,e);if(!t)return pr=void 0,r.toPrecision(e);var n=t[0],i=t[1],s=i-(pr=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=n.length;return s===a?n:s>a?n+new Array(s-a+1).join("0"):s>0?n.slice(0,s)+"."+n.slice(s):"0."+new Array(1-s).join("0")+hr(r,Math.max(0,e+s-1))[0]}function Da(r,e){var t=hr(r,e);if(!t)return r+"";var n=t[0],i=t[1];return i<0?"0."+new Array(-i).join("0")+n:n.length>i+1?n.slice(0,i+1)+"."+n.slice(i+1):n+new Array(i-n.length+2).join("0")}const Oa={"%":(r,e)=>(r*100).toFixed(e),b:r=>Math.round(r).toString(2),c:r=>r+"",d:mp,e:(r,e)=>r.toExponential(e),f:(r,e)=>r.toFixed(e),g:(r,e)=>r.toPrecision(e),o:r=>Math.round(r).toString(8),p:(r,e)=>Da(r*100,e),r:Da,s:yp,X:r=>Math.round(r).toString(16).toUpperCase(),x:r=>Math.round(r).toString(16)};function Ra(r){return r}var Ba=Array.prototype.map,Ha=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function wp(r){var e=r.grouping===void 0||r.thousands===void 0?Ra:_p(Ba.call(r.grouping,Number),r.thousands+""),t=r.currency===void 0?"":r.currency[0]+"",n=r.currency===void 0?"":r.currency[1]+"",i=r.decimal===void 0?".":r.decimal+"",s=r.numerals===void 0?Ra:vp(Ba.call(r.numerals,String)),a=r.percent===void 0?"%":r.percent+"",o=r.minus===void 0?"−":r.minus+"",c=r.nan===void 0?"NaN":r.nan+"";function l(u,h){u=fr(u);var f=u.fill,g=u.align,p=u.sign,m=u.symbol,b=u.zero,x=u.width,v=u.comma,_=u.precision,y=u.trim,w=u.type;w==="n"?(v=!0,w="g"):Oa[w]||(_===void 0&&(_=12),y=!0,w="g"),(b||f==="0"&&g==="=")&&(b=!0,f="0",g="=");var S=(h&&h.prefix!==void 0?h.prefix:"")+(m==="$"?t:m==="#"&&/[boxX]/.test(w)?"0"+w.toLowerCase():""),$=(m==="$"?n:/[%p]/.test(w)?a:"")+(h&&h.suffix!==void 0?h.suffix:""),k=Oa[w],A=/[defgprs%]/.test(w);_=_===void 0?6:/[gprs]/.test(w)?Math.max(1,Math.min(21,_)):Math.max(0,Math.min(20,_));function T(M){var E=S,L=$,C,z,I;if(w==="c")L=k(M)+L,M="";else{M=+M;var F=M<0||1/M<0;if(M=isNaN(M)?c:k(Math.abs(M),_),y&&(M=xp(M)),F&&+M==0&&p!=="+"&&(F=!1),E=(F?p==="("?p:o:p==="-"||p==="("?"":p)+E,L=(w==="s"&&!isNaN(M)&&pr!==void 0?Ha[8+pr/3]:"")+L+(F&&p==="("?")":""),A){for(C=-1,z=M.length;++C<z;)if(I=M.charCodeAt(C),48>I||I>57){L=(I===46?i+M.slice(C+1):M.slice(C))+L,M=M.slice(0,C);break}}}v&&!b&&(M=e(M,1/0));var q=E.length+M.length+L.length,N=q<x?new Array(x-q+1).join(f):"";switch(v&&b&&(M=e(N+M,N.length?x-L.length:1/0),N=""),g){case"<":M=E+M+L+N;break;case"=":M=E+N+M+L;break;case"^":M=N.slice(0,q=N.length>>1)+E+M+L+N.slice(q);break;default:M=N+E+M+L;break}return s(M)}return T.toString=function(){return u+""},T}function d(u,h){var f=Math.max(-8,Math.min(8,Math.floor(Oe(h)/3)))*3,g=Math.pow(10,-f),p=l((u=fr(u),u.type="f",u),{suffix:Ha[8+f/3]});return function(m){return p(g*m)}}return{format:l,formatPrefix:d}}var gr,ja,Va;kp({thousands:",",grouping:[3],currency:["$",""]});function kp(r){return gr=wp(r),ja=gr.format,Va=gr.formatPrefix,gr}function $p(r){return Math.max(0,-Oe(Math.abs(r)))}function Ap(r,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Oe(e)/3)))*3-Oe(Math.abs(r)))}function Sp(r,e){return r=Math.abs(r),e=Math.abs(e)-r,Math.max(0,Oe(e)-Oe(r))+1}function Cp(r){var e=0,t=r.children,n=t&&t.length;if(!n)e=1;else for(;--n>=0;)e+=t[n].value;r.value=e}function Mp(){return this.eachAfter(Cp)}function Ep(r,e){let t=-1;for(const n of this)r.call(e,n,++t,this);return this}function Tp(r,e){for(var t=this,n=[t],i,s,a=-1;t=n.pop();)if(r.call(e,t,++a,this),i=t.children)for(s=i.length-1;s>=0;--s)n.push(i[s]);return this}function Lp(r,e){for(var t=this,n=[t],i=[],s,a,o,c=-1;t=n.pop();)if(i.push(t),s=t.children)for(a=0,o=s.length;a<o;++a)n.push(s[a]);for(;t=i.pop();)r.call(e,t,++c,this);return this}function Pp(r,e){let t=-1;for(const n of this)if(r.call(e,n,++t,this))return n}function zp(r){return this.eachAfter(function(e){for(var t=+r(e.data)||0,n=e.children,i=n&&n.length;--i>=0;)t+=n[i].value;e.value=t})}function Ip(r){return this.eachBefore(function(e){e.children&&e.children.sort(r)})}function qp(r){for(var e=this,t=Fp(e,r),n=[e];e!==t;)e=e.parent,n.push(e);for(var i=n.length;r!==t;)n.splice(i,0,r),r=r.parent;return n}function Fp(r,e){if(r===e)return r;var t=r.ancestors(),n=e.ancestors(),i=null;for(r=t.pop(),e=n.pop();r===e;)i=r,r=t.pop(),e=n.pop();return i}function Np(){for(var r=this,e=[r];r=r.parent;)e.push(r);return e}function Dp(){return Array.from(this)}function Op(){var r=[];return this.eachBefore(function(e){e.children||r.push(e)}),r}function Rp(){var r=this,e=[];return r.each(function(t){t!==r&&e.push({source:t.parent,target:t})}),e}function*Bp(){var r=this,e,t=[r],n,i,s;do for(e=t.reverse(),t=[];r=e.pop();)if(yield r,n=r.children)for(i=0,s=n.length;i<s;++i)t.push(n[i]);while(t.length)}function mr(r,e){r instanceof Map?(r=[void 0,r],e===void 0&&(e=Vp)):e===void 0&&(e=jp);for(var t=new _n(r),n,i=[t],s,a,o,c;n=i.pop();)if((a=e(n.data))&&(c=(a=Array.from(a)).length))for(n.children=a,o=c-1;o>=0;--o)i.push(s=a[o]=new _n(a[o])),s.parent=n,s.depth=n.depth+1;return t.eachBefore(Yp)}function Hp(){return mr(this).eachBefore(Xp)}function jp(r){return r.children}function Vp(r){return Array.isArray(r)?r[1]:null}function Xp(r){r.data.value!==void 0&&(r.value=r.data.value),r.data=r.data.data}function Yp(r){var e=0;do r.height=e;while((r=r.parent)&&r.height<++e)}function _n(r){this.data=r,this.depth=this.height=0,this.parent=null}_n.prototype=mr.prototype={constructor:_n,count:Mp,each:Ep,eachAfter:Lp,eachBefore:Tp,find:Pp,sum:zp,sort:Ip,path:qp,ancestors:Np,descendants:Dp,leaves:Op,links:Rp,copy:Hp,[Symbol.iterator]:Bp};function Gp(r,e){return r.parent===e.parent?1:2}function Ai(r){var e=r.children;return e?e[0]:r.t}function Si(r){var e=r.children;return e?e[e.length-1]:r.t}function Wp(r,e,t){var n=t/(e.i-r.i);e.c-=n,e.s+=t,r.c+=n,e.z+=t,e.m+=t}function Up(r){for(var e=0,t=0,n=r.children,i=n.length,s;--i>=0;)s=n[i],s.z+=e,s.m+=e,e+=s.s+(t+=s.c)}function Kp(r,e,t){return r.a.parent===e.parent?r.a:t}function _r(r,e){this._=r,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}_r.prototype=Object.create(_n.prototype);function Zp(r){for(var e=new _r(r,0),t,n=[e],i,s,a,o;t=n.pop();)if(s=t._.children)for(t.children=new Array(o=s.length),a=o-1;a>=0;--a)n.push(i=t.children[a]=new _r(s[a],a)),i.parent=t;return(e.parent=new _r(null,0)).children=[e],e}function Jp(){var r=Gp,e=1,t=1,n=null;function i(l){var d=Zp(l);if(d.eachAfter(s),d.parent.m=-d.z,d.eachBefore(a),n)l.eachBefore(c);else{var u=l,h=l,f=l;l.eachBefore(function(x){x.x<u.x&&(u=x),x.x>h.x&&(h=x),x.depth>f.depth&&(f=x)});var g=u===h?1:r(u,h)/2,p=g-u.x,m=e/(h.x+g+p),b=t/(f.depth||1);l.eachBefore(function(x){x.x=(x.x+p)*m,x.y=x.depth*b})}return l}function s(l){var d=l.children,u=l.parent.children,h=l.i?u[l.i-1]:null;if(d){Up(l);var f=(d[0].z+d[d.length-1].z)/2;h?(l.z=h.z+r(l._,h._),l.m=l.z-f):l.z=f}else h&&(l.z=h.z+r(l._,h._));l.parent.A=o(l,h,l.parent.A||u[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,d,u){if(d){for(var h=l,f=l,g=d,p=h.parent.children[0],m=h.m,b=f.m,x=g.m,v=p.m,_;g=Si(g),h=Ai(h),g&&h;)p=Ai(p),f=Si(f),f.a=l,_=g.z+x-h.z-m+r(g._,h._),_>0&&(Wp(Kp(g,l,u),l,_),m+=_,b+=_),x+=g.m,m+=h.m,v+=p.m,b+=f.m;g&&!Si(f)&&(f.t=g,f.m+=x-b),h&&!Ai(p)&&(p.t=h,p.m+=m-v,u=l)}return u}function c(l){l.x*=e,l.y=l.depth*t}return i.separation=function(l){return arguments.length?(r=l,i):r},i.size=function(l){return arguments.length?(n=!1,e=+l[0],t=+l[1],i):n?null:[e,t]},i.nodeSize=function(l){return arguments.length?(n=!0,e=+l[0],t=+l[1],i):n?[e,t]:null},i}function Qp(r,e){switch(arguments.length){case 0:break;case 1:this.range(r);break;default:this.range(e).domain(r);break}return this}function Xa(r,e){switch(arguments.length){case 0:break;case 1:{typeof r=="function"?this.interpolator(r):this.range(r);break}default:{this.domain(r),typeof e=="function"?this.interpolator(e):this.range(e);break}}return this}function tg(r){return function(){return r}}function eg(r){return+r}var Ya=[0,1];function Bt(r){return r}function Ci(r,e){return(e-=r=+r)?function(t){return(t-r)/e}:tg(isNaN(e)?NaN:.5)}function ng(r,e){var t;return r>e&&(t=r,r=e,e=t),function(n){return Math.max(r,Math.min(e,n))}}function rg(r,e,t){var n=r[0],i=r[1],s=e[0],a=e[1];return i<n?(n=Ci(i,n),s=t(a,s)):(n=Ci(n,i),s=t(s,a)),function(o){return s(n(o))}}function ig(r,e,t){var n=Math.min(r.length,e.length)-1,i=new Array(n),s=new Array(n),a=-1;for(r[n]<r[0]&&(r=r.slice().reverse(),e=e.slice().reverse());++a<n;)i[a]=Ci(r[a],r[a+1]),s[a]=t(e[a],e[a+1]);return function(o){var c=vd(r,o,1,n)-1;return s[c](i[c](o))}}function sg(r,e){return e.domain(r.domain()).range(r.range()).interpolate(r.interpolate()).clamp(r.clamp()).unknown(r.unknown())}function ag(){var r=Ya,e=Ya,t=_e,n,i,s,a=Bt,o,c,l;function d(){var h=Math.min(r.length,e.length);return a!==Bt&&(a=ng(r[0],r[h-1])),o=h>2?ig:rg,c=l=null,u}function u(h){return h==null||isNaN(h=+h)?s:(c||(c=o(r.map(n),e,t)))(n(a(h)))}return u.invert=function(h){return a(i((l||(l=o(e,r.map(n),Ft)))(h)))},u.domain=function(h){return arguments.length?(r=Array.from(h,eg),d()):r.slice()},u.range=function(h){return arguments.length?(e=Array.from(h),d()):e.slice()},u.rangeRound=function(h){return e=Array.from(h),t=fi,d()},u.clamp=function(h){return arguments.length?(a=h?!0:Bt,d()):a!==Bt},u.interpolate=function(h){return arguments.length?(t=h,d()):t},u.unknown=function(h){return arguments.length?(s=h,u):s},function(h,f){return n=h,i=f,d()}}function og(){return ag()(Bt,Bt)}function lg(r,e,t,n){var i=$d(r,e,t),s;switch(n=fr(n??",f"),n.type){case"s":{var a=Math.max(Math.abs(r),Math.abs(e));return n.precision==null&&!isNaN(s=Ap(i,a))&&(n.precision=s),Va(n,a)}case"":case"e":case"g":case"p":case"r":{n.precision==null&&!isNaN(s=Sp(i,Math.max(Math.abs(r),Math.abs(e))))&&(n.precision=s-(n.type==="e"));break}case"f":case"%":{n.precision==null&&!isNaN(s=$p(i))&&(n.precision=s-(n.type==="%")*2);break}}return ja(n)}function Mi(r){var e=r.domain;return r.ticks=function(t){var n=e();return kd(n[0],n[n.length-1],t??10)},r.tickFormat=function(t,n){var i=e();return lg(i[0],i[i.length-1],t??10,n)},r.nice=function(t){t==null&&(t=10);var n=e(),i=0,s=n.length-1,a=n[i],o=n[s],c,l,d=10;for(o<a&&(l=a,a=o,o=l,l=i,i=s,s=l);d-- >0;){if(l=Zr(a,o,t),l===c)return n[i]=a,n[s]=o,e(n);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return r},r}function nt(){var r=og();return r.copy=function(){return sg(r,nt())},Qp.apply(r,arguments),Mi(r)}function cg(){var r=0,e=1,t,n,i,s,a=Bt,o=!1,c;function l(u){return u==null||isNaN(u=+u)?c:a(i===0?.5:(u=(s(u)-t)*i,o?Math.max(0,Math.min(1,u)):u))}l.domain=function(u){return arguments.length?([r,e]=u,t=s(r=+r),n=s(e=+e),i=t===n?0:1/(n-t),l):[r,e]},l.clamp=function(u){return arguments.length?(o=!!u,l):o},l.interpolator=function(u){return arguments.length?(a=u,l):a};function d(u){return function(h){var f,g;return arguments.length?([f,g]=h,a=u(f,g),l):[a(0),a(1)]}}return l.range=d(_e),l.rangeRound=d(fi),l.unknown=function(u){return arguments.length?(c=u,l):c},function(u){return s=u,t=u(r),n=u(e),i=t===n?0:1/(n-t),l}}function Ga(r,e){return e.domain(r.domain()).interpolator(r.interpolator()).clamp(r.clamp()).unknown(r.unknown())}function Ei(){var r=Mi(cg()(Bt));return r.copy=function(){return Ga(r,Ei())},Xa.apply(r,arguments)}function dg(){var r=0,e=.5,t=1,n=1,i,s,a,o,c,l=Bt,d,u=!1,h;function f(p){return isNaN(p=+p)?h:(p=.5+((p=+d(p))-s)*(n*p<n*s?o:c),l(u?Math.max(0,Math.min(1,p)):p))}f.domain=function(p){return arguments.length?([r,e,t]=p,i=d(r=+r),s=d(e=+e),a=d(t=+t),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),n=s<i?-1:1,f):[r,e,t]},f.clamp=function(p){return arguments.length?(u=!!p,f):u},f.interpolator=function(p){return arguments.length?(l=p,f):l};function g(p){return function(m){var b,x,v;return arguments.length?([b,x,v]=m,l=Jh(p,[b,x,v]),f):[l(0),l(.5),l(1)]}}return f.range=g(_e),f.rangeRound=g(fi),f.unknown=function(p){return arguments.length?(h=p,f):h},function(p){return d=p,i=p(r),s=p(e),a=p(t),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),n=s<i?-1:1,f}}function Wa(){var r=Mi(dg()(Bt));return r.copy=function(){return Ga(r,Wa())},Xa.apply(r,arguments)}function Ua(r){for(var e=r.length/6|0,t=new Array(e),n=0;n<e;)t[n]="#"+r.slice(n*6,++n*6);return t}const Ka=r=>Rh(r[r.length-1]);var ug=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Ua);const hg=Ka(ug);var fg=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Ua);const Za=Ka(fg);function B(r){return function(){return r}}const Ja=Math.abs,lt=Math.atan2,xe=Math.cos,pg=Math.max,Ti=Math.min,Ht=Math.sin,Re=Math.sqrt,gt=1e-12,vn=Math.PI,vr=vn/2,br=2*vn;function gg(r){return r>1?0:r<-1?vn:Math.acos(r)}function Qa(r){return r>=1?vr:r<=-1?-vr:Math.asin(r)}function xr(r){let e=3;return r.digits=function(t){if(!arguments.length)return e;if(t==null)e=null;else{const n=Math.floor(t);if(!(n>=0))throw new RangeError(`invalid digits: ${t}`);e=n}return r},()=>new gp(e)}function mg(r){return r.innerRadius}function _g(r){return r.outerRadius}function vg(r){return r.startAngle}function bg(r){return r.endAngle}function xg(r){return r&&r.padAngle}function yg(r,e,t,n,i,s,a,o){var c=t-r,l=n-e,d=a-i,u=o-s,h=u*c-d*l;if(!(h*h<gt))return h=(d*(e-s)-u*(r-i))/h,[r+h*c,e+h*l]}function yr(r,e,t,n,i,s,a){var o=r-t,c=e-n,l=(a?s:-s)/Re(o*o+c*c),d=l*c,u=-l*o,h=r+d,f=e+u,g=t+d,p=n+u,m=(h+g)/2,b=(f+p)/2,x=g-h,v=p-f,_=x*x+v*v,y=i-s,w=h*p-g*f,S=(v<0?-1:1)*Re(pg(0,y*y*_-w*w)),$=(w*v-x*S)/_,k=(-w*x-v*S)/_,A=(w*v+x*S)/_,T=(-w*x+v*S)/_,M=$-m,E=k-b,L=A-m,C=T-b;return M*M+E*E>L*L+C*C&&($=A,k=T),{cx:$,cy:k,x01:-d,y01:-u,x11:$*(i/y-1),y11:k*(i/y-1)}}function to(){var r=mg,e=_g,t=B(0),n=null,i=vg,s=bg,a=xg,o=null,c=xr(l);function l(){var d,u,h=+r.apply(this,arguments),f=+e.apply(this,arguments),g=i.apply(this,arguments)-vr,p=s.apply(this,arguments)-vr,m=Ja(p-g),b=p>g;if(o||(o=d=c()),f<h&&(u=f,f=h,h=u),!(f>gt))o.moveTo(0,0);else if(m>br-gt)o.moveTo(f*xe(g),f*Ht(g)),o.arc(0,0,f,g,p,!b),h>gt&&(o.moveTo(h*xe(p),h*Ht(p)),o.arc(0,0,h,p,g,b));else{var x=g,v=p,_=g,y=p,w=m,S=m,$=a.apply(this,arguments)/2,k=$>gt&&(n?+n.apply(this,arguments):Re(h*h+f*f)),A=Ti(Ja(f-h)/2,+t.apply(this,arguments)),T=A,M=A,E,L;if(k>gt){var C=Qa(k/h*Ht($)),z=Qa(k/f*Ht($));(w-=C*2)>gt?(C*=b?1:-1,_+=C,y-=C):(w=0,_=y=(g+p)/2),(S-=z*2)>gt?(z*=b?1:-1,x+=z,v-=z):(S=0,x=v=(g+p)/2)}var I=f*xe(x),F=f*Ht(x),q=h*xe(y),N=h*Ht(y);if(A>gt){var O=f*xe(v),et=f*Ht(v),yt=h*xe(_),it=h*Ht(_),J;if(m<vn)if(J=yg(I,F,yt,it,O,et,q,N)){var Pe=I-J[0],ee=F-J[1],Is=O-J[0],qs=et-J[1],Ul=1/Ht(gg((Pe*Is+ee*qs)/(Re(Pe*Pe+ee*ee)*Re(Is*Is+qs*qs)))/2),Kl=Re(J[0]*J[0]+J[1]*J[1]);T=Ti(A,(h-Kl)/(Ul-1)),M=Ti(A,(f-Kl)/(Ul+1))}else T=M=0}S>gt?M>gt?(E=yr(yt,it,I,F,f,M,b),L=yr(O,et,q,N,f,M,b),o.moveTo(E.cx+E.x01,E.cy+E.y01),M<A?o.arc(E.cx,E.cy,M,lt(E.y01,E.x01),lt(L.y01,L.x01),!b):(o.arc(E.cx,E.cy,M,lt(E.y01,E.x01),lt(E.y11,E.x11),!b),o.arc(0,0,f,lt(E.cy+E.y11,E.cx+E.x11),lt(L.cy+L.y11,L.cx+L.x11),!b),o.arc(L.cx,L.cy,M,lt(L.y11,L.x11),lt(L.y01,L.x01),!b))):(o.moveTo(I,F),o.arc(0,0,f,x,v,!b)):o.moveTo(I,F),!(h>gt)||!(w>gt)?o.lineTo(q,N):T>gt?(E=yr(q,N,O,et,h,-T,b),L=yr(I,F,yt,it,h,-T,b),o.lineTo(E.cx+E.x01,E.cy+E.y01),T<A?o.arc(E.cx,E.cy,T,lt(E.y01,E.x01),lt(L.y01,L.x01),!b):(o.arc(E.cx,E.cy,T,lt(E.y01,E.x01),lt(E.y11,E.x11),!b),o.arc(0,0,h,lt(E.cy+E.y11,E.cx+E.x11),lt(L.cy+L.y11,L.cx+L.x11),b),o.arc(L.cx,L.cy,T,lt(L.y11,L.x11),lt(L.y01,L.x01),!b))):o.arc(0,0,h,y,_,b)}if(o.closePath(),d)return o=null,d+""||null}return l.centroid=function(){var d=(+r.apply(this,arguments)+ +e.apply(this,arguments))/2,u=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-vn/2;return[xe(u)*d,Ht(u)*d]},l.innerRadius=function(d){return arguments.length?(r=typeof d=="function"?d:B(+d),l):r},l.outerRadius=function(d){return arguments.length?(e=typeof d=="function"?d:B(+d),l):e},l.cornerRadius=function(d){return arguments.length?(t=typeof d=="function"?d:B(+d),l):t},l.padRadius=function(d){return arguments.length?(n=d==null?null:typeof d=="function"?d:B(+d),l):n},l.startAngle=function(d){return arguments.length?(i=typeof d=="function"?d:B(+d),l):i},l.endAngle=function(d){return arguments.length?(s=typeof d=="function"?d:B(+d),l):s},l.padAngle=function(d){return arguments.length?(a=typeof d=="function"?d:B(+d),l):a},l.context=function(d){return arguments.length?(o=d??null,l):o},l}var wg=Array.prototype.slice;function Li(r){return typeof r=="object"&&"length"in r?r:Array.from(r)}function eo(r){this._context=r}eo.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,e){switch(r=+r,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(r,e):this._context.moveTo(r,e);break;case 1:this._point=2;default:this._context.lineTo(r,e);break}}};function no(r){return new eo(r)}function Pi(r){return r[0]}function zi(r){return r[1]}function re(r,e){var t=B(!0),n=null,i=no,s=null,a=xr(o);r=typeof r=="function"?r:r===void 0?Pi:B(r),e=typeof e=="function"?e:e===void 0?zi:B(e);function o(c){var l,d=(c=Li(c)).length,u,h=!1,f;for(n==null&&(s=i(f=a())),l=0;l<=d;++l)!(l<d&&t(u=c[l],l,c))===h&&((h=!h)?s.lineStart():s.lineEnd()),h&&s.point(+r(u,l,c),+e(u,l,c));if(f)return s=null,f+""||null}return o.x=function(c){return arguments.length?(r=typeof c=="function"?c:B(+c),o):r},o.y=function(c){return arguments.length?(e=typeof c=="function"?c:B(+c),o):e},o.defined=function(c){return arguments.length?(t=typeof c=="function"?c:B(!!c),o):t},o.curve=function(c){return arguments.length?(i=c,n!=null&&(s=i(n)),o):i},o.context=function(c){return arguments.length?(c==null?n=s=null:s=i(n=c),o):n},o}function kg(r,e,t){var n=null,i=B(!0),s=null,a=no,o=null,c=xr(l);r=typeof r=="function"?r:r===void 0?Pi:B(+r),e=typeof e=="function"?e:B(e===void 0?0:+e),t=typeof t=="function"?t:t===void 0?zi:B(+t);function l(u){var h,f,g,p=(u=Li(u)).length,m,b=!1,x,v=new Array(p),_=new Array(p);for(s==null&&(o=a(x=c())),h=0;h<=p;++h){if(!(h<p&&i(m=u[h],h,u))===b)if(b=!b)f=h,o.areaStart(),o.lineStart();else{for(o.lineEnd(),o.lineStart(),g=h-1;g>=f;--g)o.point(v[g],_[g]);o.lineEnd(),o.areaEnd()}b&&(v[h]=+r(m,h,u),_[h]=+e(m,h,u),o.point(n?+n(m,h,u):v[h],t?+t(m,h,u):_[h]))}if(x)return o=null,x+""||null}function d(){return re().defined(i).curve(a).context(s)}return l.x=function(u){return arguments.length?(r=typeof u=="function"?u:B(+u),n=null,l):r},l.x0=function(u){return arguments.length?(r=typeof u=="function"?u:B(+u),l):r},l.x1=function(u){return arguments.length?(n=u==null?null:typeof u=="function"?u:B(+u),l):n},l.y=function(u){return arguments.length?(e=typeof u=="function"?u:B(+u),t=null,l):e},l.y0=function(u){return arguments.length?(e=typeof u=="function"?u:B(+u),l):e},l.y1=function(u){return arguments.length?(t=u==null?null:typeof u=="function"?u:B(+u),l):t},l.lineX0=l.lineY0=function(){return d().x(r).y(e)},l.lineY1=function(){return d().x(r).y(t)},l.lineX1=function(){return d().x(n).y(e)},l.defined=function(u){return arguments.length?(i=typeof u=="function"?u:B(!!u),l):i},l.curve=function(u){return arguments.length?(a=u,s!=null&&(o=a(s)),l):a},l.context=function(u){return arguments.length?(u==null?s=o=null:o=a(s=u),l):s},l}function $g(r,e){return e<r?-1:e>r?1:e>=r?0:NaN}function Ag(r){return r}function Sg(){var r=Ag,e=$g,t=null,n=B(0),i=B(br),s=B(0);function a(o){var c,l=(o=Li(o)).length,d,u,h=0,f=new Array(l),g=new Array(l),p=+n.apply(this,arguments),m=Math.min(br,Math.max(-br,i.apply(this,arguments)-p)),b,x=Math.min(Math.abs(m)/l,s.apply(this,arguments)),v=x*(m<0?-1:1),_;for(c=0;c<l;++c)(_=g[f[c]=c]=+r(o[c],c,o))>0&&(h+=_);for(e!=null?f.sort(function(y,w){return e(g[y],g[w])}):t!=null&&f.sort(function(y,w){return t(o[y],o[w])}),c=0,u=h?(m-l*v)/h:0;c<l;++c,p=b)d=f[c],_=g[d],b=p+(_>0?_*u:0)+v,g[d]={data:o[d],index:c,value:_,startAngle:p,endAngle:b,padAngle:x};return g}return a.value=function(o){return arguments.length?(r=typeof o=="function"?o:B(+o),a):r},a.sortValues=function(o){return arguments.length?(e=o,t=null,a):e},a.sort=function(o){return arguments.length?(t=o,e=null,a):t},a.startAngle=function(o){return arguments.length?(n=typeof o=="function"?o:B(+o),a):n},a.endAngle=function(o){return arguments.length?(i=typeof o=="function"?o:B(+o),a):i},a.padAngle=function(o){return arguments.length?(s=typeof o=="function"?o:B(+o),a):s},a}class ro{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function Cg(r){return new ro(r,!0)}function Mg(r){return new ro(r,!1)}function Eg(r){return r.source}function Tg(r){return r.target}function io(r){let e=Eg,t=Tg,n=Pi,i=zi,s=null,a=null,o=xr(c);function c(){let l;const d=wg.call(arguments),u=e.apply(this,d),h=t.apply(this,d);if(s==null&&(a=r(l=o())),a.lineStart(),d[0]=u,a.point(+n.apply(this,d),+i.apply(this,d)),d[0]=h,a.point(+n.apply(this,d),+i.apply(this,d)),a.lineEnd(),l)return a=null,l+""||null}return c.source=function(l){return arguments.length?(e=l,c):e},c.target=function(l){return arguments.length?(t=l,c):t},c.x=function(l){return arguments.length?(n=typeof l=="function"?l:B(+l),c):n},c.y=function(l){return arguments.length?(i=typeof l=="function"?l:B(+l),c):i},c.context=function(l){return arguments.length?(l==null?s=a=null:a=r(s=l),c):s},c}function Lg(){return io(Cg)}function Pg(){return io(Mg)}function so(r){return r<0?-1:1}function ao(r,e,t){var n=r._x1-r._x0,i=e-r._x1,s=(r._y1-r._y0)/(n||i<0&&-0),a=(t-r._y1)/(i||n<0&&-0),o=(s*i+a*n)/(n+i);return(so(s)+so(a))*Math.min(Math.abs(s),Math.abs(a),.5*Math.abs(o))||0}function oo(r,e){var t=r._x1-r._x0;return t?(3*(r._y1-r._y0)/t-e)/2:e}function Ii(r,e,t){var n=r._x0,i=r._y0,s=r._x1,a=r._y1,o=(s-n)/3;r._context.bezierCurveTo(n+o,i+o*e,s-o,a-o*t,s,a)}function wr(r){this._context=r}wr.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Ii(this,this._t0,oo(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,e){var t=NaN;if(r=+r,e=+e,!(r===this._x1&&e===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(r,e):this._context.moveTo(r,e);break;case 1:this._point=2;break;case 2:this._point=3,Ii(this,oo(this,t=ao(this,r,e)),t);break;default:Ii(this,this._t0,t=ao(this,r,e));break}this._x0=this._x1,this._x1=r,this._y0=this._y1,this._y1=e,this._t0=t}}},Object.create(wr.prototype).point=function(r,e){wr.prototype.point.call(this,e,r)};function bn(r){return new wr(r)}function xn(r,e,t){this.k=r,this.x=e,this.y=t}xn.prototype={constructor:xn,scale:function(r){return r===1?this:new xn(this.k*r,this.x,this.y)},translate:function(r,e){return r===0&e===0?this:new xn(this.k,this.x+this.k*r,this.y+this.k*e)},apply:function(r){return[r[0]*this.k+this.x,r[1]*this.k+this.y]},applyX:function(r){return r*this.k+this.x},applyY:function(r){return r*this.k+this.y},invert:function(r){return[(r[0]-this.x)/this.k,(r[1]-this.y)/this.k]},invertX:function(r){return(r-this.x)/this.k},invertY:function(r){return(r-this.y)/this.k},rescaleX:function(r){return r.copy().domain(r.range().map(this.invertX,this).map(r.invert,r))},rescaleY:function(r){return r.copy().domain(r.range().map(this.invertY,this).map(r.invert,r))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},xn.prototype;const zg=`
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
`,kr=500,$r=300,Lt={top:20,right:30,bottom:40,left:50};class Ig extends D{constructor(){super(...arguments);P(this,"_userPoints",[]);P(this,"_revealed",!1);P(this,"_drawing",!1);P(this,"_hasAnimated",!1);P(this,"_xScale",null);P(this,"_yScale",null)}static get observedAttributes(){return["data","reveal-at","x-label","y-label","reveal-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(zg),this._build()}handleAttributeChange(){this.isConnected&&!this._revealed&&(this._userPoints=[],this._build())}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".actual-line");if(n){const i=n.getTotalLength();n.style.strokeDasharray=String(i),n.style.strokeDashoffset=String(i),n.style.transition="stroke-dashoffset 0.8s ease-out",requestAnimationFrame(()=>{n.style.strokeDashoffset="0"})}}_build(){const t=this.jsonAttr("data",[]),n=parseInt(this.getAttribute("reveal-at")||"0",10),i=this.getAttribute("x-label")||"",s=this.getAttribute("y-label")||"",a=this.getAttribute("reveal-label")||"Reveal";if(!t.length||n<=0){this.render('<div class="container"><em>No data</em></div>');return}const o=kr-Lt.left-Lt.right,c=$r-Lt.top-Lt.bottom,l=nt().domain([0,t.length-1]).range([0,o]),d=Math.min(...t),u=Math.max(...t),h=(u-d)*.1||1,f=nt().domain([d-h,u+h]).range([c,0]);this._xScale=l,this._yScale=f;const g=t.slice(0,n),p=re().x((A,T)=>l(T)).y(A=>f(A)).curve(bn)(g)||"",m=l.ticks(8),b=f.ticks(6);let x="";m.forEach(A=>{x+=`<line class="grid-line" x1="${l(A)}" y1="0" x2="${l(A)}" y2="${c}" />`}),b.forEach(A=>{x+=`<line class="grid-line" x1="0" y1="${f(A)}" x2="${o}" y2="${f(A)}" />`});let v="";m.forEach(A=>{v+=`<text class="axis-text" x="${l(A)}" y="${c+20}" text-anchor="middle">${Math.round(A)}</text>`});let _="";b.forEach(A=>{_+=`<text class="axis-text" x="-10" y="${f(A)+4}" text-anchor="end">${A.toFixed(1)}</text>`});const y=l(n-1),w=o-y,S=l(n-1),$=y+w/2,k=c/2;this.render(`
      <div class="container">
        <svg viewBox="0 0 ${kr} ${$r}" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(${Lt.left},${Lt.top})">
            ${x}
            <rect class="draw-zone" x="${y}" y="0" width="${w}" height="${c}" rx="4" />
            <line class="cutoff-line" x1="${S}" y1="0" x2="${S}" y2="${c}" />
            <path class="actual-line" d="${p}" />
            <g class="user-path-group"></g>
            <g class="revealed-path-group"></g>
            <text class="draw-prompt" x="${$}" y="${k}">Draw your prediction here</text>
            ${v}
            ${_}
            ${i?`<text class="axis-label" x="${o/2}" y="${c+36}" text-anchor="middle">${this._esc(i)}</text>`:""}
            ${s?`<text class="axis-label" x="-36" y="${c/2}" text-anchor="middle" transform="rotate(-90,-36,${c/2})">${this._esc(s)}</text>`:""}
            <rect class="draw-area" x="${y}" y="0" width="${w}" height="${c}" fill="transparent" />
          </g>
        </svg>
        <div class="controls">
          <button class="btn reveal-btn">${this._esc(a)}</button>
          <span class="error-text"></span>
        </div>
      </div>
    `),this._attachDrawListeners(),this._attachRevealListener()}_attachDrawListeners(){const t=this.root.querySelector(".draw-area");if(!t)return;const n=this.root.querySelector("svg");if(!n)return;const i=c=>{const l=n.getBoundingClientRect(),d=kr/l.width,u=$r/l.height,h=(c.clientX-l.left)*d-Lt.left,f=(c.clientY-l.top)*u-Lt.top;return{svgX:h,svgY:f}},s=c=>{if(this._revealed)return;c.preventDefault(),this._drawing=!0,t.setPointerCapture(c.pointerId);const l=this.root.querySelector(".draw-prompt");l&&l.remove();const{svgX:d,svgY:u}=i(c);this._addPoint(d,u)},a=c=>{if(!this._drawing||this._revealed)return;c.preventDefault();const{svgX:l,svgY:d}=i(c);this._addPoint(l,d)},o=()=>{this._drawing=!1};t.addEventListener("pointerdown",s),t.addEventListener("pointermove",a),t.addEventListener("pointerup",o),t.addEventListener("pointerleave",o)}_addPoint(t,n){if(!this._xScale||!this._yScale)return;this.jsonAttr("data",[]);const i=parseInt(this.getAttribute("reveal-at")||"0",10),s=kr-Lt.left-Lt.right,a=$r-Lt.top-Lt.bottom,o=this._xScale(i-1),l=Math.max(o,Math.min(s,t)),d=Math.max(0,Math.min(a,n));if(this._userPoints.length>0){const u=this._userPoints[this._userPoints.length-1].x;if(l<=u)return}this._userPoints.push({x:l,y:d}),this._renderUserLine()}_renderUserLine(){const t=this.root.querySelector(".user-path-group");if(!t||this._userPoints.length<2)return;const n=re().x(i=>i.x).y(i=>i.y).curve(bn)(this._userPoints)||"";t.innerHTML=`<path class="user-line" d="${n}" />`}_attachRevealListener(){const t=this.root.querySelector(".reveal-btn");t&&t.addEventListener("click",()=>{this._revealed||(this._revealed=!0,t.disabled=!0,this._reveal())})}_reveal(){const t=this.jsonAttr("data",[]),n=parseInt(this.getAttribute("reveal-at")||"0",10);if(!this._xScale||!this._yScale)return;const i=t.slice(n-1),s=this._xScale,a=this._yScale,o=re().x((f,g)=>s(n-1+g)).y(f=>a(f)).curve(bn)(i)||"",c=this.root.querySelector(".revealed-path-group");if(!c)return;c.innerHTML=`<path class="revealed-line" d="${o}" />`;const l=c.querySelector(".revealed-line");if(l){const f=l.getTotalLength();l.style.strokeDasharray=String(f),l.style.strokeDashoffset=String(f),l.style.transition="stroke-dashoffset 1s ease-out",requestAnimationFrame(()=>{l.style.strokeDashoffset="0"})}const d=this._calculateError(t,n),u=this.root.querySelector(".error-text");u&&d!==null&&(u.textContent=`Your average error: ${d.toFixed(2)}`);const h=this._getUserValues(t,n);this.dispatchEvent(new CustomEvent("lv-draw-reveal",{detail:{error:d??0,userLine:h,actual:t.slice(n)},bubbles:!0,composed:!0}))}_calculateError(t,n){if(!this._xScale||!this._yScale||this._userPoints.length<2)return null;const i=this._xScale,s=this._yScale,a=t.slice(n);let o=0,c=0;for(let l=0;l<a.length;l++){const d=i(n+l),u=this._interpolateUserY(d);if(u!==null){const h=s.invert(u);o+=Math.abs(h-a[l]),c++}}return c>0?o/c:null}_interpolateUserY(t){if(this._userPoints.length===0)return null;if(t<=this._userPoints[0].x)return this._userPoints[0].y;if(t>=this._userPoints[this._userPoints.length-1].x)return this._userPoints[this._userPoints.length-1].y;for(let n=0;n<this._userPoints.length-1;n++){const i=this._userPoints[n],s=this._userPoints[n+1];if(t>=i.x&&t<=s.x){const a=(t-i.x)/(s.x-i.x);return i.y+a*(s.y-i.y)}}return null}_getUserValues(t,n){if(!this._xScale||!this._yScale)return[];const i=this._xScale,s=this._yScale,a=[];for(let o=n;o<t.length;o++){const c=i(o),l=this._interpolateUserY(c);a.push(l!==null?s.invert(l):0)}return a}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-you-draw",Ig);const qg=`
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
`;class Fg extends D{static get observedAttributes(){return["answer","accept"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(qg),this._build()}handleAttributeChange(){}_build(){this.render(`
      <span class="blank-wrapper">
        <input class="blank-input" type="text" autocomplete="off" spellcheck="false"/>
        <span class="result-icon"></span>
        <span class="correct-answer"></span>
      </span>
    `);const e=this.root.querySelector(".blank-input");e&&e.addEventListener("input",()=>{const t=Math.max(e.value.length,4);e.style.width=t+1+"ch"})}getValue(){const e=this.root.querySelector(".blank-input");return e?e.value.trim():""}getAnswer(){return this.getAttribute("answer")||""}getAcceptAlternatives(){const e=this.getAttribute("accept")||"";return e?e.split("|").map(t=>t.trim()):[]}check(){const e=this.getValue().toLowerCase(),t=this.getAnswer().toLowerCase(),n=this.getAcceptAlternatives().map(l=>l.toLowerCase()),s=[t,...n].some(l=>l===e),a=this.root.querySelector(".blank-input"),o=this.root.querySelector(".result-icon"),c=this.root.querySelector(".correct-answer");return a&&(a.classList.add(s?"correct":"wrong"),a.readOnly=!0),o&&(o.classList.add("show",s?"correct":"wrong"),o.textContent=s?"✓":"✗"),c&&!s&&(c.classList.add("show"),c.textContent=this.getAnswer()),s}reset(){const e=this.root.querySelector(".blank-input"),t=this.root.querySelector(".result-icon"),n=this.root.querySelector(".correct-answer");e&&(e.value="",e.readOnly=!1,e.classList.remove("correct","wrong"),e.style.width=""),t&&(t.classList.remove("show","correct","wrong"),t.textContent=""),n&&(n.classList.remove("show"),n.textContent="")}}customElements.define("lv-blank",Fg);const Ng=`
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
`;class Dg extends D{constructor(){super(...arguments);P(this,"_checked",!1)}static get observedAttributes(){return["submit-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ng),this._build()}handleAttributeChange(){this.isConnected&&!this._checked&&this._build()}_build(){const t=this.getAttribute("submit-label")||"Check";this.render(`
      <div class="content"><slot></slot></div>
      <div class="btn-row">
        <button class="check-btn">${this._esc(t)}</button>
        <span class="score-text"></span>
      </div>
    `);const n=this.root.querySelector(".check-btn");n&&n.addEventListener("click",()=>this._check())}_check(){if(this._checked)return;this._checked=!0;const t=this.querySelectorAll("lv-blank"),n=[];let i=0;t.forEach(l=>{const d=l.check();d&&i++,n.push({value:l.getValue(),answer:l.getAnswer(),correct:d})});const s=t.length,a=`${i}/${s}`,o=this.root.querySelector(".score-text");o&&(o.classList.add("show"),o.textContent=a,i===s?o.classList.add("perfect"):i>0?o.classList.add("partial"):o.classList.add("fail"));const c=this.root.querySelector(".check-btn");c&&(c.disabled=!0),this.dispatchEvent(new CustomEvent("lv-fill-check",{bubbles:!0,composed:!0,detail:{correct:i===s,score:a,results:n}}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-fill-blank",Dg);const Og=`
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
`;class Rg extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_cards",[]);P(this,"_deck",[]);P(this,"_current",0);P(this,"_flipped",!1);P(this,"_ratings",[]);P(this,"_done",!1);P(this,"_storageKey","lv-flashcard");P(this,"_keyHandler",t=>{t.code==="Space"&&(t.preventDefault(),this._flip())})}static get observedAttributes(){return["cards","shuffle","persist"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Og),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".fc-container");n&&(n.style.opacity="0",n.style.transition="opacity 0.4s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_build(){if(this._cards=this.jsonAttr("cards",[]),this._ratings=[],this._done=!1,this._flipped=!1,this._current=0,!this._cards.length){this.render('<div class="fc-container"><p style="color:var(--lv-text-dim);text-align:center;">No cards provided.</p></div>');return}if(this._deck=this._cards.map((t,n)=>n),this.hasAttribute("shuffle"))for(let t=this._deck.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[this._deck[t],this._deck[n]]=[this._deck[n],this._deck[t]]}if(this.hasAttribute("persist"))try{const t=localStorage.getItem(this._storageKey);t&&(this._ratings=JSON.parse(t))}catch{}this._renderView(),this._attachKeyListener()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._keyHandler)}_attachKeyListener(){document.removeEventListener("keydown",this._keyHandler),document.addEventListener("keydown",this._keyHandler)}_flip(){if(this._done)return;this._flipped=!this._flipped;const t=this.root.querySelector(".card");t&&t.classList.toggle("flipped",this._flipped)}_rate(t){const n=this._deck[this._current];if(this._ratings.push({index:n,rating:t}),this.dispatchEvent(new CustomEvent("lv-flashcard-rate",{detail:{index:n,rating:t,front:this._cards[n].front},bubbles:!0,composed:!0})),t==="hard"){const i=Math.min(this._current+4,this._deck.length);this._deck.splice(i,0,n)}if(this.hasAttribute("persist"))try{localStorage.setItem(this._storageKey,JSON.stringify(this._ratings))}catch{}this._current++,this._flipped=!1,this._current>=this._deck.length&&(this._done=!0),this._renderView()}_reset(){if(this._ratings=[],this.hasAttribute("persist"))try{localStorage.removeItem(this._storageKey)}catch{}this._build()}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}_renderView(){var a,o,c,l,d;if(this._done){const u=this._ratings.filter(g=>g.rating==="easy").length,h=this._ratings.filter(g=>g.rating==="ok").length,f=this._ratings.filter(g=>g.rating==="hard").length;this.render(`<div class="fc-container">
        <div class="done">
          <h3>Session Complete</h3>
          <div class="stats">
            <span style="color:#22c55e;">${u} Easy</span> &middot;
            <span style="color:#eab308;">${h} OK</span> &middot;
            <span style="color:#ef4444;">${f} Hard</span>
          </div>
          <button id="btn-reset">Restart</button>
        </div>
      </div>`),(a=this.root.getElementById("btn-reset"))==null||a.addEventListener("click",()=>this._reset());return}const t=this._deck[this._current],n=this._cards[t],i=this._deck.length,s=Math.round(this._current/i*100);this.render(`<div class="fc-container">
      <div class="progress">
        <div class="progress-text">Card ${this._current+1} of ${i}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${s}%"></div></div>
      </div>
      <div class="card-wrapper" id="card-wrapper">
        <div class="card${this._flipped?" flipped":""}">
          <div class="card-face card-front">${this._esc(n.front)}</div>
          <div class="card-face card-back">${this._esc(n.back)}</div>
        </div>
      </div>
      <div class="ratings">
        <button class="btn-hard" id="btn-hard">Hard</button>
        <button class="btn-ok" id="btn-ok">OK</button>
        <button class="btn-easy" id="btn-easy">Easy</button>
      </div>
      <div class="hint">Click card or press Space to flip</div>
    </div>`),(o=this.root.getElementById("card-wrapper"))==null||o.addEventListener("click",()=>this._flip()),(c=this.root.getElementById("btn-hard"))==null||c.addEventListener("click",()=>this._rate("hard")),(l=this.root.getElementById("btn-ok"))==null||l.addEventListener("click",()=>this._rate("ok")),(d=this.root.getElementById("btn-easy"))==null||d.addEventListener("click",()=>this._rate("easy"))}}customElements.define("lv-flashcard",Rg);const Bg=`
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
`;class Hg extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_sections",[]);P(this,"_completed",new Set);P(this,"_storageKey","lv-progress");P(this,"_boundHandler",null)}static get observedAttributes(){return["sections","persist","key"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Bg),this._build(),this._boundHandler=this._handleExternalComplete.bind(this),document.addEventListener("lv-section-complete",this._boundHandler)}disconnectedCallback(){super.disconnectedCallback(),this._boundHandler&&document.removeEventListener("lv-section-complete",this._boundHandler)}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".pt-container");n&&(n.style.opacity="0",n.style.transition="opacity 0.4s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}complete(t){this._markComplete(t)}_build(){if(this._sections=this.jsonAttr("sections",[]),this._storageKey=this.getAttribute("key")||"lv-progress",this._completed=new Set,this.hasAttribute("persist"))try{const t=localStorage.getItem(this._storageKey);t&&JSON.parse(t).forEach(i=>this._completed.add(i))}catch{}this._renderView()}_handleExternalComplete(t){var i;const n=t;(i=n.detail)!=null&&i.id&&this._markComplete(n.detail.id)}_markComplete(t){if(!this._completed.has(t)){if(this._completed.add(t),this.hasAttribute("persist"))try{localStorage.setItem(this._storageKey,JSON.stringify([...this._completed]))}catch{}this._dispatchUpdate(),this._renderView()}}_toggle(t){if(this._completed.has(t)?this._completed.delete(t):this._completed.add(t),this.hasAttribute("persist"))try{localStorage.setItem(this._storageKey,JSON.stringify([...this._completed]))}catch{}this._dispatchUpdate(),this._renderView()}_dispatchUpdate(){const t=this._sections.length,n=[...this._completed],i=t>0?Math.round(n.length/t*100):0;this.dispatchEvent(new CustomEvent("lv-progress-update",{detail:{completed:n,total:t,percent:i},bubbles:!0,composed:!0}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}_renderView(){const t=this._sections.length,n=this._sections.filter(a=>this._completed.has(a.id)).length,i=t>0?Math.round(n/t*100):0,s=this._sections.map(a=>{const o=this._completed.has(a.id);return`<li class="${o?"done":""}" data-id="${this._esc(a.id)}">
        <span class="check-icon">${o?"✓":""}</span>
        <span class="label">${this._esc(a.label)}</span>
      </li>`}).join("");this.render(`<div class="pt-container">
      <div class="header">
        <div class="pct-text">${i}% Complete (${n}/${t})</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${i}%"></div></div>
      </div>
      <ul class="checklist">${s}</ul>
    </div>`),this.root.querySelectorAll(".checklist li").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id;o&&this._toggle(o)})})}}customElements.define("lv-progress-tracker",Hg);const jg=`
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
`;class Vg extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["code","language","run-label","editable","auto-run"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(jg),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".sb-container");n&&(n.style.opacity="0",n.style.transition="opacity 0.4s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_build(){var d;const t=this.getAttribute("code")||"",n=this.getAttribute("language")||"javascript",i=this.getAttribute("run-label")||"Run",s=!this.hasAttribute("editable")||this.getAttribute("editable")!=="false";this.render(`<div class="sb-container">
      <div class="editor-wrap">
        <div class="line-numbers" id="line-nums"></div>
        <textarea id="editor" spellcheck="false" ${s?"":"readonly"}>${this._esc(t)}</textarea>
      </div>
      <div class="toolbar">
        <span class="lang">${this._esc(n)}</span>
        <button id="btn-run">${this._esc(i)}</button>
      </div>
      <div class="output" id="output"><span class="placeholder">Output will appear here...</span></div>
    </div>`);const a=this.root.getElementById("editor"),o=this.root.getElementById("output"),c=this.root.getElementById("line-nums"),l=()=>{const u=(a.value||"").split(`
`).length;c.innerHTML=Array.from({length:u},(h,f)=>`<span>${f+1}</span>`).join("")};l(),a.addEventListener("input",l),a.addEventListener("scroll",()=>{c.style.transform=`translateY(-${a.scrollTop}px)`}),a.addEventListener("keydown",u=>{if(u.key==="Tab"){u.preventDefault();const h=a.selectionStart,f=a.selectionEnd;a.value=a.value.substring(0,h)+"  "+a.value.substring(f),a.selectionStart=a.selectionEnd=h+2,l()}u.key==="Enter"&&(u.ctrlKey||u.metaKey)&&(u.preventDefault(),this._run(a,o))}),(d=this.root.getElementById("btn-run"))==null||d.addEventListener("click",()=>{this._run(a,o)}),this.hasAttribute("auto-run")&&requestAnimationFrame(()=>this._run(a,o))}_run(t,n){const i=t.value;n.innerHTML="";const s=[],a=console.log,o=console.warn,c=console.error,l=u=>(...h)=>{const f=h.map(g=>{if(typeof g=="object")try{return JSON.stringify(g,null,2)}catch{return String(g)}return String(g)}).join(" ");s.push({text:f,type:u})};console.log=l("log"),console.warn=l("warn"),console.error=l("error");let d;try{new Function(i)()}catch(u){d=(u==null?void 0:u.message)||String(u),s.push({text:`Error: ${d}`,type:"error"})}console.log=a,console.warn=o,console.error=c,s.length===0?n.innerHTML='<span class="placeholder">(no output)</span>':n.innerHTML=s.map(u=>`<div class="${u.type}">${this._esc(u.text)}</div>`).join(""),this.dispatchEvent(new CustomEvent("lv-sandbox-run",{detail:{code:i,output:s.map(u=>u.text),error:d},bubbles:!0,composed:!0}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sandbox",Vg);const Xg=["#00d4ff","#7b68ee","#00c853","#ff9800","#ff2d75","#ffd93d","#69f0ae","#ff6b9d"],Yg=`
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
`;class Gg extends D{constructor(){super(...arguments);P(this,"_data",[]);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","direction","sorted"]}get data(){return this._data}set data(t){if(typeof t=="string")try{this._data=JSON.parse(t)}catch{this._data=[]}else this._data=t;this._buildChart()}connectedCallback(){super.connectedCallback(),this.adoptStyles(Yg),this._data=this.jsonAttr("data",[]),this._buildChart()}handleAttributeChange(t){t==="data"&&(this._data=this.jsonAttr("data",[])),this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;this.root.querySelectorAll(".bar-fill").forEach((i,s)=>{const a=i,o=a.dataset.width||"0%";a.classList.add("animate"),setTimeout(()=>{a.classList.remove("animate"),a.style.width=o},s*80+50)})}_getColor(t,n){return n.color?n.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${t%8}`).trim()||Xg[t%8]}_buildChart(){const t=this.hasAttribute("sorted")?[...this._data].sort((s,a)=>a.value-s.value):[...this._data];if(!t.length){this.render('<div class="bar-list"></div>');return}const n=Math.max(...t.map(s=>s.value),.001),i=t.map((s,a)=>{const o=s.value/n*100,c=this._getColor(a,s),l=s.tagColor||c,d=typeof s.value=="number"?s.value%1?s.value.toFixed(2):s.value.toString():s.value;return`
        <div class="bar-item">
          <div class="bar-header">
            <span class="bar-label">${this._esc(s.label)}</span>
            <span class="bar-meta">
              <span class="bar-value" style="color:${c}">${d}</span>
              ${s.tag?`<span class="bar-tag" style="background:${l}22;color:${l}">${this._esc(s.tag)}</span>`:""}
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${this._hasAnimated?o:0}%;background:${c}" data-width="${o}%"></div>
          </div>
        </div>
      `}).join("");this.render(`<div class="bar-list">${i}</div>`),this._hasAnimated&&this.root.querySelectorAll(".bar-fill").forEach(s=>{const a=s;a.style.width=a.dataset.width||"0%"})}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-bar-chart",Gg);const Wg=`
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
`;class Ug extends D{constructor(){super(...arguments);P(this,"_svg",null);P(this,"_animated",!0);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","scale","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Wg),this._animated=this.getAttribute("animated")!=="false",this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated)return;this._hasAnimated=!0;const n=this._svg;if(!n)return;const i=n.querySelectorAll(".cell");if(t||!this._animated){i.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"});return}i.forEach(s=>{const a=s,o=Number(a.dataset.delay||0);a.style.opacity="0",a.style.transform="scale(0.5)",a.style.transition="none",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`,a.style.opacity="1",a.style.transform="scale(1)"})})})}_buildChart(){var x;const t=this.jsonAttr("labels",[]),n=this.jsonAttr("values",[]),i=this.getAttribute("scale")||"diverging";if(!t.length||!n.length){this.render("<svg></svg>");return}const s=t.length,a=3,o=60,c=110,l=56,d=s*l+(s-1)*a,u=d+c,h=d+o,f=i==="sequential"?Ei(Za).domain([0,1]):Wa(hg).domain([-1,0,1]),g=this.isRtl;let p="";for(let v=0;v<s;v++){const _=c+v*(l+a)+l/2,y=o/2;p+=`<text class="header-text" x="${g?u-_:_}" y="${y}">${this._escapeHtml(t[v])}</text>`}for(let v=0;v<s;v++){const _=o+v*(l+a)+l/2,y=g?u-c/2:c/2;p+=`<text class="header-text" x="${y}" y="${_}">${this._escapeHtml(t[v])}</text>`}for(let v=0;v<s;v++)for(let _=0;_<s;_++){const y=((x=n[v])==null?void 0:x[_])??0,w=f(y),S=this._contrastColor(w),$=(v+_)*40;let k=c+_*(l+a);g&&(k=u-k-l);const A=o+v*(l+a),T=k+l/2,M=A+l/2;p+=`<g class="cell" data-delay="${$}" data-value="${y.toFixed(2)}" style="transform-origin: ${T}px ${M}px; opacity: 0; transform: scale(0.5);">`,p+=`<rect x="${k}" y="${A}" width="${l}" height="${l}" rx="6" ry="6" fill="${w}"/>`,p+=`<text class="cell-text" x="${T}" y="${M}" fill="${S}">${y.toFixed(2)}</text>`,p+="</g>"}const m=`
      <div style="position: relative;">
        <svg viewBox="0 0 ${u} ${h}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;this.render(m),this._svg=this.root.querySelector("svg");const b=this.root.querySelector(".tooltip");this._svg&&b&&this._svg.querySelectorAll(".cell").forEach(v=>{v.addEventListener("mouseenter",_=>{const w=_.currentTarget.dataset.value||"";b.textContent=w,b.style.opacity="1"}),v.addEventListener("mousemove",_=>{const y=_,w=this.root.querySelector("div").getBoundingClientRect();b.style.left=`${y.clientX-w.left+10}px`,b.style.top=`${y.clientY-w.top-28}px`}),v.addEventListener("mouseleave",()=>{b.style.opacity="0"})})}_contrastColor(t){const n=Gt(t);if(!n)return"#000";const i=n.rgb();return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"#000":"#fff"}_escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-heatmap",Ug);const Kg=`
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
`,Be={top:20,right:30,bottom:40,left:60},lo=500,co=250,ye=lo-Be.left-Be.right,Kt=co-Be.top-Be.bottom;class Zg extends D{constructor(){super(...arguments);P(this,"_resizeObs",null);P(this,"_svg",null);P(this,"_built",!1)}static get observedAttributes(){return["data","area","points","tooltip","color","x-label","y-label","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Kg),this.root.innerHTML="<svg></svg>",this._buildChart(),this._resizeObs=new ResizeObserver(()=>{}),this._resizeObs.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._resizeObs)==null||t.disconnect(),this._resizeObs=null}handleAttributeChange(t,n,i){this._built&&this._buildChart()}_parseData(){const t=this.jsonAttr("data",[]);return!Array.isArray(t)||t.length===0?[]:typeof t[0]=="number"?t.map((n,i)=>({x:i,y:n})):t}_getColor(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}_buildChart(){const t=this._parseData();if(t.length===0)return;const n=this.root.querySelector("svg");if(!n)return;const i=this._getColor(),s=this.hasAttribute("area"),a=this.hasAttribute("points"),o=this.hasAttribute("tooltip"),c=this.getAttribute("x-label")||"",l=this.getAttribute("y-label")||"";G(n).selectAll("*").remove();const d=G(n).attr("viewBox",`0 0 ${lo} ${co}`).attr("preserveAspectRatio","xMidYMid meet");this._svg=d;const u=d.append("defs"),h=`lv-area-grad-${Math.random().toString(36).slice(2,8)}`,f=u.append("linearGradient").attr("id",h).attr("x1","0").attr("y1","0").attr("x2","0").attr("y2","1");f.append("stop").attr("offset","0%").attr("stop-color",i).attr("stop-opacity",.25),f.append("stop").attr("offset","100%").attr("stop-color",i).attr("stop-opacity",0);const g=d.append("g").attr("transform",`translate(${Be.left},${Be.top})`),p=ne(t,$=>$.x),m=ne(t,$=>$.y),b=(m[1]-m[0])*.1||1,x=nt().domain(p).range([0,ye]),v=nt().domain([m[0]-b,m[1]+b]).range([Kt,0]);if(g.append("g").attr("class","grid").attr("transform",`translate(0,${Kt})`).call(Yn(x).tickSize(-Kt).tickFormat(()=>"")),g.append("g").attr("class","grid").call(Gn(v).tickSize(-ye).tickFormat(()=>"")),g.append("g").attr("class","axis x-axis").attr("transform",`translate(0,${Kt})`).call(Yn(x).ticks(6)),g.append("g").attr("class","axis y-axis").call(Gn(v).ticks(5)),c&&g.append("text").attr("class","axis-label").attr("x",ye/2).attr("y",Kt+35).attr("text-anchor","middle").text(c),l&&g.append("text").attr("class","axis-label").attr("x",-Kt/2).attr("y",-38).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),s){const $=kg().x(k=>x(k.x)).y0(Kt).y1(k=>v(k.y));g.append("path").datum(t).attr("class","area").attr("d",$).attr("fill",`url(#${h})`)}const _=re().x($=>x($.x)).y($=>v($.y)),y=g.append("path").datum(t).attr("class","line").attr("d",_).attr("stroke",i).attr("stroke-width",2.5),S=y.node().getTotalLength();y.attr("stroke-dasharray",S).attr("stroke-dashoffset",S),a&&g.selectAll(".point").data(t).enter().append("circle").attr("class","point").attr("cx",$=>x($.x)).attr("cy",$=>v($.y)).attr("r",4).attr("fill",i).attr("stroke","white").attr("stroke-width",1.5),o&&this._setupTooltip(g,t,x,v,i),this._built=!0,this.getAttribute("animated")==="false"&&this._showInstant()}_setupTooltip(t,n,i,s,a){const o=t.append("g").attr("class","tooltip-group").style("display","none");o.append("line").attr("class","crosshair crosshair-x").attr("y1",0).attr("y2",Kt),o.append("line").attr("class","crosshair crosshair-y").attr("x1",0).attr("x2",ye),o.append("circle").attr("r",5).attr("fill",a).attr("stroke","white").attr("stroke-width",2),o.append("rect").attr("class","tooltip-bg").attr("width",60).attr("height",24).attr("rx",6),o.append("text").attr("class","tooltip-text").attr("text-anchor","middle").attr("dy","0.35em");const c=Kr(l=>l.x).left;t.append("rect").attr("width",ye).attr("height",Kt).attr("fill","transparent").on("mousemove",l=>{const[d]=si(l),u=i.invert(d);let h=c(n,u,1);if(h>=n.length&&(h=n.length-1),h>0){const _=n[h-1],y=n[h];h=u-_.x>y.x-u?h:h-1}const f=n[h],g=i(f.x),p=s(f.y);o.style("display",null),o.select(".crosshair-x").attr("x1",g).attr("x2",g),o.select(".crosshair-y").attr("y1",p).attr("y2",p),o.select("circle").attr("cx",g).attr("cy",p);const m=60,b=24;let x=g-m/2,v=p-b-10;x<0&&(x=0),x+m>ye&&(x=ye-m),v<0&&(v=p+10),o.select(".tooltip-bg").attr("x",x).attr("y",v),o.select(".tooltip-text").attr("x",x+m/2).attr("y",v+b/2).text(`${f.y.toFixed(1)}`)}).on("mouseleave",()=>{o.style("display","none")})}_showInstant(){if(!this._svg)return;const t=this._svg.select("g");t.select(".line").attr("stroke-dashoffset",0),t.select(".area").classed("visible",!0),t.selectAll(".point").classed("visible",!0)}animateIn(t){var a;if(!this._svg)return;if(t||this.getAttribute("animated")==="false"){this._showInstant();return}const n=this._svg.select("g"),i=n.select(".line"),s=((a=i.node())==null?void 0:a.getTotalLength())||0;i.attr("stroke-dasharray",s).attr("stroke-dashoffset",s).transition().duration(1200).ease(mn).attr("stroke-dashoffset",0),n.select(".area").transition().delay(1500).duration(0).on("start",function(){G(this).classed("visible",!0)}),n.selectAll(".point").each(function(o,c){G(this).transition().delay(1500+c*50).duration(0).on("start",function(){G(this).classed("visible",!0)})})}}customElements.define("lv-line-chart",Zg);const Ar={sigmoid:r=>1/(1+Math.exp(-r)),relu:r=>Math.max(0,r),tanh:r=>Math.tanh(r),linear:r=>r},Jg=`
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
`,uo=500,ho=300;class Qg extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_resizeObserver",null);P(this,"_svg",null);P(this,"_fn",Ar.sigmoid);P(this,"_fnName","sigmoid")}static get observedAttributes(){return["fn","range","samples","color","interactive","animated"]}get _range(){return this.jsonAttr("range",[-6,6])}get _samples(){const t=this.getAttribute("samples");return t&&parseInt(t,10)||200}get _color(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}get _interactive(){return this.hasAttribute("interactive")}get _animated(){const t=this.getAttribute("animated");return t===null?!0:t!=="false"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Jg);const t=document.createElement("div");this.root.appendChild(t);const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox",`0 0 ${uo} ${ho}`),n.setAttribute("preserveAspectRatio","xMidYMid meet"),t.appendChild(n),this._svg=G(n),this._parseFn(),this._render(!1),this._resizeObserver=new ResizeObserver(()=>{}),this._resizeObserver.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._resizeObserver)==null||t.disconnect(),this._resizeObserver=null}handleAttributeChange(t,n,i){n!==i&&(t==="fn"&&this._parseFn(),this._svg&&this._render(!1))}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,t||!this._animated?this._render(!1):this._render(!0))}_parseFn(){const t=this.getAttribute("fn")||"sigmoid";if(this._fnName=t,Ar[t])this._fn=Ar[t];else try{const n=t.replace(/^\s*x\s*=>\s*/,"");this._fn=new Function("x","return "+n),this._fnName="custom"}catch{this._fn=Ar.sigmoid,this._fnName="sigmoid"}}_generateData(){const[t,n]=this._range,i=this._samples,s=(n-t)/(i-1),a=[];for(let o=0;o<i;o++){const c=t+o*s,l=this._fn(c);a.push({x:c,y:l})}return a}_render(t){if(!this._svg)return;const n=this._svg;n.selectAll("*").remove();const i=this._generateData(),[s,a]=this._range,o=i.map(y=>y.y),c=Ad(o)??-1,l=Gs(o)??1,d=(l-c)*.15||.5,u=c-d,h=l+d,f={top:20,right:30,bottom:30,left:40},g=uo-f.left-f.right,p=ho-f.top-f.bottom,m=nt().domain([s,a]).range([0,g]),b=nt().domain([u,h]).range([p,0]),x=n.append("g").attr("transform",`translate(${f.left},${f.top})`);this._drawGrid(x,m,b,g,p),this._drawAxes(x,m,b,g,p);const v=re().x(y=>m(y.x)).y(y=>b(y.y)).curve(bn),_=x.append("path").datum(i).attr("class","fn-line").attr("d",v).attr("stroke",this._color).attr("stroke-width",3);if(t){const w=_.node().getTotalLength();_.attr("stroke-dasharray",w).attr("stroke-dashoffset",w).transition().duration(1e3).ease(mn).attr("stroke-dashoffset",0)}this._drawKeyPoints(x,m,b),this._interactive&&this._addInteractivePoint(x,m,b,i,g,p)}_drawGrid(t,n,i,s,a){const o=n.ticks(),c=i.ticks();t.selectAll(".grid-line-x").data(o).enter().append("line").attr("class","grid-line").attr("x1",l=>n(l)).attr("x2",l=>n(l)).attr("y1",0).attr("y2",a),t.selectAll(".grid-line-y").data(c).enter().append("line").attr("class","grid-line").attr("x1",0).attr("x2",s).attr("y1",l=>i(l)).attr("y2",l=>i(l))}_drawAxes(t,n,i,s,a){const[o,c]=n.domain(),[l,d]=i.domain(),u=l<=0&&d>=0?i(0):a;t.append("line").attr("class","axis-line").attr("x1",0).attr("x2",s).attr("y1",u).attr("y2",u);const h=o<=0&&c>=0?n(0):0;t.append("line").attr("class","axis-line").attr("x1",h).attr("x2",h).attr("y1",0).attr("y2",a),n.ticks().forEach(p=>{const m=n(p);t.append("line").attr("class","axis-line").attr("x1",m).attr("x2",m).attr("y1",u-3).attr("y2",u+3),t.append("text").attr("class","axis-text").attr("x",m).attr("y",u+14).attr("text-anchor","middle").text(p)}),i.ticks().forEach(p=>{const m=i(p);t.append("line").attr("class","axis-line").attr("x1",h-3).attr("x2",h+3).attr("y1",m).attr("y2",m),t.append("text").attr("class","axis-text").attr("x",h-12).attr("y",m).attr("dy","0.35em").attr("text-anchor","end").text(p)})}_drawKeyPoints(t,n,i){if(this._fnName==="sigmoid"){const s=n(0),a=i(.5);t.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),t.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("σ(0) = 0.5")}else if(this._fnName==="relu"){const s=n(0),a=i(0);t.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),t.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("kink point")}}_addInteractivePoint(t,n,i,s,a,o){const[c,l]=this._range,d=this._fn,u=(c+l)/2,h=d(u),f=t.append("line").attr("class","crosshair").attr("x1",n(u)).attr("x2",n(u)).attr("y1",i(h)).attr("y2",o),g=t.append("line").attr("class","crosshair").attr("x1",0).attr("x2",n(u)).attr("y1",i(h)).attr("y2",i(h)),p=t.append("g"),m=p.append("rect").attr("class","readout-bg").attr("width",160).attr("height",24).attr("rx",6),b=p.append("text").attr("class","readout-text").attr("text-anchor","middle"),x=t.append("circle").attr("class","drag-point").attr("cx",n(u)).attr("cy",i(h)).attr("r",8).attr("fill",this._color).attr("stroke","#fff").attr("stroke-width",2),v=(y,w,S,$)=>{const k=`x = ${S.toFixed(2)}, y = ${$.toFixed(2)}`;b.text(k);const A=160,T=24,M=12;let E=y-A/2,L=w-T-M;E<0&&(E=0),E+A>a&&(E=a-A),L<0&&(L=w+M),m.attr("x",E).attr("y",L).attr("width",A).attr("height",T),b.attr("x",E+A/2).attr("y",L+T/2).attr("text-anchor","middle")};v(n(u),i(h),u,h);const _=yh().on("drag",y=>{const w=Math.max(0,Math.min(a,y.x)),S=n.invert(w),$=Math.max(c,Math.min(l,S)),k=d($),A=n($),T=i(k);x.attr("cx",A).attr("cy",T),f.attr("x1",A).attr("x2",A).attr("y1",T).attr("y2",o),g.attr("x1",0).attr("x2",A).attr("y1",T).attr("y2",T),v(A,T,$,k)});x.call(_)}}customElements.define("lv-function",Qg);const fo=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],t0=`
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
`,kt={top:20,right:20,bottom:50,left:55},po=500,qi=400;class e0 extends D{constructor(){super(...arguments);P(this,"_data",[]);P(this,"_hasAnimated",!1);P(this,"_svg",null);P(this,"_container",null)}static get observedAttributes(){return["data","x-label","y-label","clusters","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(t0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(t,n,i){n!==i&&(t==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,t?this._render(!1):this._render(!0))}_getColor(t,n){return n.color?n.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${t%8}`).trim()||fo[t%8]}_clusterColor(t){const i=[...new Set(this._data.map(o=>o.cluster).filter(o=>o!=null))].indexOf(t),s=i>=0?i:0;return getComputedStyle(this).getPropertyValue(`--lv-chart-${s%8}`).trim()||fo[s%8]}_initSvg(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(t),this._svg=G(t),this._svg.append("g").attr("class","grid-group"),this._svg.append("g").attr("class","axis-group"),this._svg.append("g").attr("class","points-group"),this._svg.append("g").attr("class","tooltip-group"),this._svg.append("g").attr("class","legend-group")}_render(t){if(!this._svg)return;const n=this._data,i=this.hasAttribute("clusters"),s=this.hasAttribute("tooltip"),a=this.getAttribute("x-label")||"",o=this.getAttribute("y-label")||"",c=i?[...new Set(n.map(C=>C.cluster).filter(C=>C!=null))]:[],l=c.length>0?30:0,d=qi+l,u=po-kt.left-kt.right,h=qi-kt.top-kt.bottom;this._svg.attr("viewBox",`0 0 ${po} ${d}`);const f=ne(n,C=>C.x),g=ne(n,C=>C.y),p=(f[1]-f[0])*.05||1,m=(g[1]-g[0])*.05||1,b=nt().domain([f[0]-p,f[1]+p]).range([0,u]),x=nt().domain([g[0]-m,g[1]+m]).range([h,0]),v=this._svg.select(".grid-group").attr("transform",`translate(${kt.left},${kt.top})`);v.selectAll("*").remove();const _=Yn(b).tickSize(-h).tickFormat(()=>"");v.append("g").attr("class","grid").attr("transform",`translate(0,${h})`).call(_);const y=Gn(x).tickSize(-u).tickFormat(()=>"");v.append("g").attr("class","grid").call(y);const w=this._svg.select(".axis-group").attr("transform",`translate(${kt.left},${kt.top})`);w.selectAll("*").remove(),w.append("g").attr("class","axis").attr("transform",`translate(0,${h})`).call(Yn(b).ticks(6)),w.append("g").attr("class","axis").call(Gn(x).ticks(6)),a&&w.append("text").attr("class","axis-label").attr("x",u/2).attr("y",h+38).attr("text-anchor","middle").text(a),o&&w.append("text").attr("class","axis-label").attr("x",-h/2).attr("y",-40).attr("text-anchor","middle").attr("transform","rotate(-90)").text(o);const S=this._svg.select(".points-group").attr("transform",`translate(${kt.left},${kt.top})`),$=this._svg.select(".tooltip-group").attr("transform",`translate(${kt.left},${kt.top})`);$.selectAll("*").remove();const k=$.append("g").attr("class","tooltip-box");k.append("rect").attr("class","tooltip-bg"),k.append("text").attr("class","tooltip-text");const A=S.selectAll(".point").data(n,(C,z)=>String(z));A.exit().remove();const T=A.enter().append("circle").attr("class","point").attr("cx",C=>b(C.x)).attr("cy",C=>x(C.y)).attr("r",5).attr("fill",(C,z)=>i&&C.cluster!=null?this._clusterColor(C.cluster):this._getColor(z,C)).attr("opacity",t?0:1).attr("transform",t?"scale(0)":"scale(1)").style("transform-origin",C=>`${b(C.x)}px ${x(C.y)}px`);s?T.on("mouseenter",(C,z)=>{var F;if(G(C.currentTarget).transition().duration(150).attr("r",6.5).attr("opacity",1),z.label){const q=b(z.x),N=x(z.y)-14;k.classed("visible",!0),k.select(".tooltip-text").attr("x",q).attr("y",N).text(z.label);const O=k.select(".tooltip-text").node(),et=((F=O==null?void 0:O.getComputedTextLength)==null?void 0:F.call(O))||40;k.select(".tooltip-bg").attr("x",q-et/2-6).attr("y",N-10).attr("width",et+12).attr("height",20)}}).on("mouseleave",C=>{G(C.currentTarget).transition().duration(150).attr("r",5).attr("opacity",.85),k.classed("visible",!1)}):T.on("mouseenter",C=>{G(C.currentTarget).transition().duration(150).attr("r",6.5)}).on("mouseleave",C=>{G(C.currentTarget).transition().duration(150).attr("r",5)});const M=T.merge(A);if(t?M.each(function(C,z){G(this).transition().delay(z*30).duration(400).ease(cp).attr("opacity",.85).attr("transform","scale(1)")}):M.attr("cx",C=>b(C.x)).attr("cy",C=>x(C.y)).attr("opacity",.85).attr("transform","scale(1)").attr("fill",(C,z)=>i&&C.cluster!=null?this._clusterColor(C.cluster):this._getColor(z,C)),this.hasAttribute("labels")||this.hasAttribute("tooltip")){const C=this._svg.select(".points-group");C.selectAll(".point-label").remove(),n.forEach((z,I)=>{if(!z.label)return;const F=C.append("text").attr("class","point-label").attr("x",b(z.x)+8).attr("y",x(z.y)+4).attr("fill","var(--lv-text, #e4e4ec)").attr("font-size","11px").attr("opacity",t?0:.9).text(z.label);t&&F.transition().delay(I*30+200).duration(300).attr("opacity",.9)})}const L=this._svg.select(".legend-group");if(L.selectAll("*").remove(),c.length>0){const C=qi+5;let z=kt.left;for(const I of c){const F=this._clusterColor(I);L.append("circle").attr("cx",z+5).attr("cy",C+8).attr("r",4).attr("fill",F),L.append("text").attr("class","legend-text").attr("x",z+14).attr("y",C+8).attr("dominant-baseline","central").text(String(I)),z+=14+String(I).length*7+20}}}}customElements.define("lv-scatter",e0);const n0=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],r0=`
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
`,yn=300,i0=130,go=26,mo=16;class s0 extends D{constructor(){super(...arguments);P(this,"_data",[]);P(this,"_hasAnimated",!1);P(this,"_svg",null);P(this,"_container",null)}static get observedAttributes(){return["data","donut","legend"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(r0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(t,n,i){n!==i&&(t==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,t?this._render(!1):this._render(!0))}_getColor(t,n){return n.color?n.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${t%8}`).trim()||n0[t%8]}_initSvg(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(t),this._svg=G(t),this._svg.append("g").attr("class","arcs-group"),this._svg.append("g").attr("class","labels-group"),this._svg.append("g").attr("class","hover-group"),this._svg.append("g").attr("class","legend-group")}_render(t){if(!this._svg)return;const n=this._data,i=this.hasAttribute("donut"),s=this.hasAttribute("legend"),a=i0,o=i?a*.6:0,c=a+5,l=s?n.length:0,d=l>0?mo+l*go:0,u=yn+d;this._svg.attr("viewBox",`0 0 ${yn} ${u}`);const h=yn/2,f=yn/2,p=Sg().value($=>$.value).sort(null).padAngle(.015)(n),m=to().innerRadius(o).outerRadius(a),b=to().innerRadius(o).outerRadius(c),x=this._svg.select(".arcs-group").attr("transform",`translate(${h},${f})`);x.selectAll("*").remove();const v=this._svg.select(".hover-group").attr("transform",`translate(${h},${f})`);v.selectAll("*").remove();const _=v.append("text").attr("class","hover-label").attr("x",0).attr("y",0),y=v.append("text").attr("class","hover-label").attr("x",0).attr("y",18).style("font-size","11px").style("font-weight","400");for(let $=0;$<p.length;$++){const k=p[$],A=this._getColor($,k.data),T=x.append("path").attr("class","arc").attr("fill",A).attr("stroke","var(--lv-bg, #0f0f23)").attr("stroke-width",1.5);if(t){const M={...k,endAngle:k.startAngle};T.attr("d",m(M)).transition().delay($*120).duration(800).ease(mn).attrTween("d",()=>{const E=_e(M,k);return L=>m(E(L))})}else T.attr("d",m(k));T.on("mouseenter",()=>{if(T.transition().duration(150).attr("d",b(k)),i)_.text(k.data.label).classed("visible",!0),y.text(String(k.data.value)).classed("visible",!0);else{const[M,E]=m.centroid(k);_.attr("x",M*1.6).attr("y",E*1.6-8).text(k.data.label).classed("visible",!0),y.attr("x",M*1.6).attr("y",E*1.6+8).text(String(k.data.value)).classed("visible",!0)}}).on("mouseleave",()=>{T.transition().duration(150).attr("d",m(k)),_.classed("visible",!1),y.classed("visible",!1)})}const w=this._svg.select(".labels-group").attr("transform",`translate(${h},${f})`);if(w.selectAll("*").remove(),!s)for(let $=0;$<p.length;$++){const k=p[$];if(k.endAngle-k.startAngle>.35){const[T,M]=m.centroid(k),E=w.append("text").attr("class","arc-label").attr("x",T).attr("y",M).text(k.data.label);t&&E.attr("opacity",0).transition().delay($*120+600).duration(300).attr("opacity",1)}}const S=this._svg.select(".legend-group");if(S.selectAll("*").remove(),s&&n.length>0){const $=yn+mo;for(let k=0;k<n.length;k++){const T=$+k*go,M=this._getColor(k,n[k]);S.append("rect").attr("class","legend-swatch").attr("x",20).attr("y",T-5).attr("width",10).attr("height",10).attr("fill",M),S.append("text").attr("class","legend-text").attr("x",38).attr("y",T).attr("dominant-baseline","central").text(`${n[k].label} (${n[k].value})`)}}}}customElements.define("lv-pie",s0);const a0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;class o0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","normalize","show-metrics"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(a0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelectorAll(".cell");n.forEach((i,s)=>{const a=i,o=Math.floor(s/Math.sqrt(n.length)),c=s%Math.sqrt(n.length),l=(o+c)*40;a.style.transition="none",a.style.opacity="0",a.style.transform="scale(0.5)",requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${l}ms, transform 400ms ease-out ${l}ms`,a.style.opacity="1",a.style.transform="scale(1)"}))})}_buildChart(){const t=this.jsonAttr("labels",[]),n=this.jsonAttr("values",[]),i=this.hasAttribute("normalize"),s=this.hasAttribute("show-metrics");if(!t.length||!n.length){this.render('<div class="cm-container"></div>');return}const a=t.length,o=i?n.map(k=>{const A=k.reduce((T,M)=>T+M,0);return A>0?k.map(T=>T/A):k}):n,c=Math.max(...o.flat()),l=56,d=3,u=70,h=80,f=s?60:0,g=s?40:0,p=a*l+(a-1)*d,m=p,b=h+p+f,x=u+m+g,v=this.isRtl,_=Ei(Za).domain([0,c||1]),y=k=>{const A=Gt(_(k));if(!A)return"#fff";const{r:T,g:M,b:E}=A.rgb();return T*.299+M*.587+E*.114>150?"#111":"#fff"};let w="";for(let k=0;k<a;k++){const A=h+k*(l+d)+l/2;w+=`<text class="header-text" x="${v?b-A:A}" y="${u-8}"
        text-anchor="middle">${this._esc(t[k])}</text>`}for(let k=0;k<a;k++){const A=u+k*(l+d)+l/2,T=v?b-h/2:h/2;w+=`<text class="header-text" x="${T}" y="${A}"
        text-anchor="middle" dominant-baseline="central">${this._esc(t[k])}</text>`}for(let k=0;k<a;k++)for(let A=0;A<a;A++){const T=o[k][A],M=n[k][A],E=h+A*(l+d),L=u+k*(l+d),C=v?b-E-l:E,z=_(T),I=y(T),F=i?(T*100).toFixed(0)+"%":String(M);w+=`<g class="cell">
          <rect x="${C}" y="${L}" width="${l}" height="${l}"
            rx="4" fill="${z}" ${k===A?'stroke="var(--lv-accent)" stroke-width="2"':""}/>
          <text class="cell-text" x="${C+l/2}" y="${L+l/2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${I}">${F}</text>
        </g>`}if(s){for(let k=0;k<a;k++){const A=n[k][k],T=n.reduce((C,z)=>C+z[k],0),M=T>0?(A/T*100).toFixed(0)+"%":"-",E=h+k*(l+d)+l/2,L=v?b-E:E;w+=`<text class="metric-text" x="${L}" y="${u+m+25}"
          text-anchor="middle" fill="var(--lv-positive)">${M}</text>`}for(let k=0;k<a;k++){const A=n[k][k],T=n[k].reduce((C,z)=>C+z,0),M=T>0?(A/T*100).toFixed(0)+"%":"-",E=u+k*(l+d)+l/2,L=v?h/2-20:h+p+10;w+=`<text class="metric-text" x="${L}" y="${E}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${M}</text>`}}const S=v?b-12:12,$=u+m/2;w+=`<text class="axis-label" x="${S}" y="${$}"
      text-anchor="middle" dominant-baseline="central"
      transform="rotate(-90, ${S}, ${$})">Actual</text>`,w+=`<text class="axis-label" x="${h+p/2}" y="${x-2}"
      text-anchor="middle">Predicted</text>`,this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${b} ${x}" role="img" aria-label="Confusion Matrix">
        ${w}
      </svg>
    </div>`)}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-confusion-matrix",o0);const l0=`
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
`,wn=560,Sr=280,ut={top:30,right:60,bottom:40,left:55};class c0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["loss","accuracy","lr","x-label","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(l0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;this.root.querySelectorAll(".metric-line").forEach(i=>{const s=i,a=s.getTotalLength();s.style.strokeDasharray=String(a),s.style.strokeDashoffset=String(a),s.style.transition=`stroke-dashoffset 1.2s ${s.dataset.idx||"0"}s ease-out`,requestAnimationFrame(()=>{s.style.strokeDashoffset="0"})})}_buildChart(){const t=this.jsonAttr("loss",[]),n=this.jsonAttr("accuracy",[]),i=this.jsonAttr("lr",[]),s=this.getAttribute("x-label")||"Epoch";this.hasAttribute("tooltip");const a=Math.max(t.length,n.length,i.length);if(a===0){this.render('<div class="td-container"></div>');return}const o=wn-ut.left-ut.right,c=Sr-ut.top-ut.bottom,l=nt().domain([0,a-1]).range([0,o]),d=Math.max(t.length?Math.max(...t):0,n.length?Math.max(...n):1)*1.1,u=nt().domain([0,d]).range([c,0]),h=i.length>0,f=h?Math.max(...i)*1.2:1,g=nt().domain([0,f]).range([c,0]),p=(S,$)=>re().x((k,A)=>ut.left+l(A)).y(k=>ut.top+$(k)).curve(bn)(S)||"",m=[];t.length&&m.push({name:"Loss",color:"var(--lv-negative)",data:t,axis:"left"}),n.length&&m.push({name:"Accuracy",color:"var(--lv-positive)",data:n,axis:"left"}),h&&m.push({name:"Learning Rate",color:"var(--lv-accent2)",data:i,axis:"right"});const b=m.map(S=>`<div class="legend-item"><div class="legend-dot" style="background:${S.color}"></div>${S.name}</div>`).join("");let x="";const v=u.ticks(5);v.forEach(S=>{const $=ut.top+u(S);x+=`<line class="grid-line" x1="${ut.left}" x2="${wn-ut.right}" y1="${$}" y2="${$}"/>`});let _="";v.forEach(S=>{const $=ut.top+u(S);_+=`<text class="axis-text" x="${ut.left-8}" y="${$}" text-anchor="end" dominant-baseline="central">${S.toFixed(2)}</text>`}),h&&g.ticks(4).forEach(S=>{const $=ut.top+g(S);_+=`<text class="axis-text" x="${wn-ut.right+8}" y="${$}" text-anchor="start" dominant-baseline="central">${S.toFixed(4)}</text>`}),l.ticks(Math.min(a,10)).forEach(S=>{const $=ut.left+l(S);_+=`<text class="axis-text" x="${$}" y="${Sr-ut.bottom+20}" text-anchor="middle">${Math.round(S)}</text>`}),_+=`<text class="axis-text" x="${wn/2}" y="${Sr-4}" text-anchor="middle">${s}</text>`;let w="";m.forEach((S,$)=>{const k=S.axis==="left"?u:g,A=p(S.data,k);w+=`<path class="metric-line" d="${A}" stroke="${S.color}" data-idx="${$*.3}"/>`}),this.render(`
      <div class="td-container">
        <div class="legend">${b}</div>
        <svg viewBox="0 0 ${wn} ${Sr}" role="img" aria-label="Training Dashboard">
          ${x}${_}${w}
        </svg>
      </div>
    `)}}customElements.define("lv-train-dashboard",c0);function _o(r,e){let t;if(e===void 0)for(const n of r)n!=null&&(t<n||t===void 0&&n>=n)&&(t=n);else{let n=-1;for(let i of r)(i=e(i,++n,r))!=null&&(t<i||t===void 0&&i>=i)&&(t=i)}return t}function d0(r,e){let t;if(e===void 0)for(const n of r)n!=null&&(t>n||t===void 0&&n>=n)&&(t=n);else{let n=-1;for(let i of r)(i=e(i,++n,r))!=null&&(t>i||t===void 0&&i>=i)&&(t=i)}return t}function Fi(r,e){let t=0;if(e===void 0)for(let n of r)(n=+n)&&(t+=n);else{let n=-1;for(let i of r)(i=+e(i,++n,r))&&(t+=i)}return t}function u0(r){return r.depth}function h0(r,e){return r.sourceLinks.length?r.depth:e-1}function Cr(r){return function(){return r}}function vo(r,e){return Mr(r.source,e.source)||r.index-e.index}function bo(r,e){return Mr(r.target,e.target)||r.index-e.index}function Mr(r,e){return r.y0-e.y0}function Ni(r){return r.value}function f0(r){return r.index}function p0(r){return r.nodes}function g0(r){return r.links}function xo(r,e){const t=r.get(e);if(!t)throw new Error("missing: "+e);return t}function yo({nodes:r}){for(const e of r){let t=e.y0,n=t;for(const i of e.sourceLinks)i.y0=t+i.width/2,t+=i.width;for(const i of e.targetLinks)i.y1=n+i.width/2,n+=i.width}}function m0(){let r=0,e=0,t=1,n=1,i=24,s=8,a,o=f0,c=h0,l,d,u=p0,h=g0,f=6;function g(){const C={nodes:u.apply(null,arguments),links:h.apply(null,arguments)};return p(C),m(C),b(C),x(C),y(C),yo(C),C}g.update=function(C){return yo(C),C},g.nodeId=function(C){return arguments.length?(o=typeof C=="function"?C:Cr(C),g):o},g.nodeAlign=function(C){return arguments.length?(c=typeof C=="function"?C:Cr(C),g):c},g.nodeSort=function(C){return arguments.length?(l=C,g):l},g.nodeWidth=function(C){return arguments.length?(i=+C,g):i},g.nodePadding=function(C){return arguments.length?(s=a=+C,g):s},g.nodes=function(C){return arguments.length?(u=typeof C=="function"?C:Cr(C),g):u},g.links=function(C){return arguments.length?(h=typeof C=="function"?C:Cr(C),g):h},g.linkSort=function(C){return arguments.length?(d=C,g):d},g.size=function(C){return arguments.length?(r=e=0,t=+C[0],n=+C[1],g):[t-r,n-e]},g.extent=function(C){return arguments.length?(r=+C[0][0],t=+C[1][0],e=+C[0][1],n=+C[1][1],g):[[r,e],[t,n]]},g.iterations=function(C){return arguments.length?(f=+C,g):f};function p({nodes:C,links:z}){for(const[F,q]of C.entries())q.index=F,q.sourceLinks=[],q.targetLinks=[];const I=new Map(C.map((F,q)=>[o(F,q,C),F]));for(const[F,q]of z.entries()){q.index=F;let{source:N,target:O}=q;typeof N!="object"&&(N=q.source=xo(I,N)),typeof O!="object"&&(O=q.target=xo(I,O)),N.sourceLinks.push(q),O.targetLinks.push(q)}if(d!=null)for(const{sourceLinks:F,targetLinks:q}of C)F.sort(d),q.sort(d)}function m({nodes:C}){for(const z of C)z.value=z.fixedValue===void 0?Math.max(Fi(z.sourceLinks,Ni),Fi(z.targetLinks,Ni)):z.fixedValue}function b({nodes:C}){const z=C.length;let I=new Set(C),F=new Set,q=0;for(;I.size;){for(const N of I){N.depth=q;for(const{target:O}of N.sourceLinks)F.add(O)}if(++q>z)throw new Error("circular link");I=F,F=new Set}}function x({nodes:C}){const z=C.length;let I=new Set(C),F=new Set,q=0;for(;I.size;){for(const N of I){N.height=q;for(const{source:O}of N.targetLinks)F.add(O)}if(++q>z)throw new Error("circular link");I=F,F=new Set}}function v({nodes:C}){const z=_o(C,q=>q.depth)+1,I=(t-r-i)/(z-1),F=new Array(z);for(const q of C){const N=Math.max(0,Math.min(z-1,Math.floor(c.call(null,q,z))));q.layer=N,q.x0=r+N*I,q.x1=q.x0+i,F[N]?F[N].push(q):F[N]=[q]}if(l)for(const q of F)q.sort(l);return F}function _(C){const z=d0(C,I=>(n-e-(I.length-1)*a)/Fi(I,Ni));for(const I of C){let F=e;for(const q of I){q.y0=F,q.y1=F+q.value*z,F=q.y1+a;for(const N of q.sourceLinks)N.width=N.value*z}F=(n-F+a)/(I.length+1);for(let q=0;q<I.length;++q){const N=I[q];N.y0+=F*(q+1),N.y1+=F*(q+1)}M(I)}}function y(C){const z=v(C);a=Math.min(s,(n-e)/(_o(z,I=>I.length)-1)),_(z);for(let I=0;I<f;++I){const F=Math.pow(.99,I),q=Math.max(1-F,(I+1)/f);S(z,F,q),w(z,F,q)}}function w(C,z,I){for(let F=1,q=C.length;F<q;++F){const N=C[F];for(const O of N){let et=0,yt=0;for(const{source:J,value:Pe}of O.targetLinks){let ee=Pe*(O.layer-J.layer);et+=E(J,O)*ee,yt+=ee}if(!(yt>0))continue;let it=(et/yt-O.y0)*z;O.y0+=it,O.y1+=it,T(O)}l===void 0&&N.sort(Mr),$(N,I)}}function S(C,z,I){for(let F=C.length,q=F-2;q>=0;--q){const N=C[q];for(const O of N){let et=0,yt=0;for(const{target:J,value:Pe}of O.sourceLinks){let ee=Pe*(J.layer-O.layer);et+=L(O,J)*ee,yt+=ee}if(!(yt>0))continue;let it=(et/yt-O.y0)*z;O.y0+=it,O.y1+=it,T(O)}l===void 0&&N.sort(Mr),$(N,I)}}function $(C,z){const I=C.length>>1,F=C[I];A(C,F.y0-a,I-1,z),k(C,F.y1+a,I+1,z),A(C,n,C.length-1,z),k(C,e,0,z)}function k(C,z,I,F){for(;I<C.length;++I){const q=C[I],N=(z-q.y0)*F;N>1e-6&&(q.y0+=N,q.y1+=N),z=q.y1+a}}function A(C,z,I,F){for(;I>=0;--I){const q=C[I],N=(q.y1-z)*F;N>1e-6&&(q.y0-=N,q.y1-=N),z=q.y0-a}}function T({sourceLinks:C,targetLinks:z}){if(d===void 0){for(const{source:{sourceLinks:I}}of z)I.sort(bo);for(const{target:{targetLinks:I}}of C)I.sort(vo)}}function M(C){if(d===void 0)for(const{sourceLinks:z,targetLinks:I}of C)z.sort(bo),I.sort(vo)}function E(C,z){let I=C.y0-(C.sourceLinks.length-1)*a/2;for(const{target:F,width:q}of C.sourceLinks){if(F===z)break;I+=q+a}for(const{source:F,width:q}of z.targetLinks){if(F===C)break;I-=q}return I}function L(C,z){let I=z.y0-(z.targetLinks.length-1)*a/2;for(const{source:F,width:q}of z.targetLinks){if(F===C)break;I+=q+a}for(const{target:F,width:q}of C.sourceLinks){if(F===z)break;I-=q}return I}return g}var Di=Math.PI,Oi=2*Di,we=1e-6,_0=Oi-we;function Ri(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function wo(){return new Ri}Ri.prototype=wo.prototype={constructor:Ri,moveTo:function(r,e){this._+="M"+(this._x0=this._x1=+r)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(r,e){this._+="L"+(this._x1=+r)+","+(this._y1=+e)},quadraticCurveTo:function(r,e,t,n){this._+="Q"+ +r+","+ +e+","+(this._x1=+t)+","+(this._y1=+n)},bezierCurveTo:function(r,e,t,n,i,s){this._+="C"+ +r+","+ +e+","+ +t+","+ +n+","+(this._x1=+i)+","+(this._y1=+s)},arcTo:function(r,e,t,n,i){r=+r,e=+e,t=+t,n=+n,i=+i;var s=this._x1,a=this._y1,o=t-r,c=n-e,l=s-r,d=a-e,u=l*l+d*d;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=r)+","+(this._y1=e);else if(u>we)if(!(Math.abs(d*o-c*l)>we)||!i)this._+="L"+(this._x1=r)+","+(this._y1=e);else{var h=t-s,f=n-a,g=o*o+c*c,p=h*h+f*f,m=Math.sqrt(g),b=Math.sqrt(u),x=i*Math.tan((Di-Math.acos((g+u-p)/(2*m*b)))/2),v=x/b,_=x/m;Math.abs(v-1)>we&&(this._+="L"+(r+v*l)+","+(e+v*d)),this._+="A"+i+","+i+",0,0,"+ +(d*h>l*f)+","+(this._x1=r+_*o)+","+(this._y1=e+_*c)}},arc:function(r,e,t,n,i,s){r=+r,e=+e,t=+t,s=!!s;var a=t*Math.cos(n),o=t*Math.sin(n),c=r+a,l=e+o,d=1^s,u=s?n-i:i-n;if(t<0)throw new Error("negative radius: "+t);this._x1===null?this._+="M"+c+","+l:(Math.abs(this._x1-c)>we||Math.abs(this._y1-l)>we)&&(this._+="L"+c+","+l),t&&(u<0&&(u=u%Oi+Oi),u>_0?this._+="A"+t+","+t+",0,1,"+d+","+(r-a)+","+(e-o)+"A"+t+","+t+",0,1,"+d+","+(this._x1=c)+","+(this._y1=l):u>we&&(this._+="A"+t+","+t+",0,"+ +(u>=Di)+","+d+","+(this._x1=r+t*Math.cos(i))+","+(this._y1=e+t*Math.sin(i))))},rect:function(r,e,t,n){this._+="M"+(this._x0=this._x1=+r)+","+(this._y0=this._y1=+e)+"h"+ +t+"v"+ +n+"h"+-t+"Z"},toString:function(){return this._}};function ko(r){return function(){return r}}function v0(r){return r[0]}function b0(r){return r[1]}var x0=Array.prototype.slice;function y0(r){return r.source}function w0(r){return r.target}function k0(r){var e=y0,t=w0,n=v0,i=b0,s=null;function a(){var o,c=x0.call(arguments),l=e.apply(this,c),d=t.apply(this,c);if(s||(s=o=wo()),r(s,+n.apply(this,(c[0]=l,c)),+i.apply(this,c),+n.apply(this,(c[0]=d,c)),+i.apply(this,c)),o)return s=null,o+""||null}return a.source=function(o){return arguments.length?(e=o,a):e},a.target=function(o){return arguments.length?(t=o,a):t},a.x=function(o){return arguments.length?(n=typeof o=="function"?o:ko(+o),a):n},a.y=function(o){return arguments.length?(i=typeof o=="function"?o:ko(+o),a):i},a.context=function(o){return arguments.length?(s=o??null,a):s},a}function $0(r,e,t,n,i){r.moveTo(e,t),r.bezierCurveTo(e=(e+n)/2,t,e,i,n,i)}function A0(){return k0($0)}function S0(r){return[r.source.x1,r.y0]}function C0(r){return[r.target.x0,r.y1]}function M0(){return A0().source(S0).target(C0)}const E0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`,$o=["var(--lv-chart-0)","var(--lv-chart-1)","var(--lv-chart-2)","var(--lv-chart-3)","var(--lv-chart-4)","var(--lv-chart-5)","var(--lv-chart-6)","var(--lv-chart-7)"];class T0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["nodes","links","node-colors"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(E0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelectorAll(".node");n.forEach((a,o)=>{const c=a;c.style.transition="none",c.style.opacity="0",c.style.transform="translateX(-20px)",requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.transition=`opacity 400ms ease-out ${o*80}ms, transform 400ms ease-out ${o*80}ms`,c.style.opacity="1",c.style.transform="translateX(0)"}))});const i=this.root.querySelectorAll(".link"),s=n.length*80;i.forEach((a,o)=>{const c=a,l=c.getTotalLength();c.style.strokeDasharray=String(l),c.style.strokeDashoffset=String(l),c.style.transition=`stroke-dashoffset 600ms ease-out ${s+o*50}ms`,requestAnimationFrame(()=>{c.style.strokeDashoffset="0"})})}_buildChart(){const t=this.jsonAttr("nodes",[]),n=this.jsonAttr("links",[]),i=this.jsonAttr("node-colors",[]);if(!t.length||!n.length){this.render("<svg></svg>");return}const s=600,a=Math.max(300,t.length*40),o=20,c=this.isRtl,l=m0().nodeId((u,h)=>h).nodeWidth(20).nodePadding(16).nodeAlign(u0).extent([[o,o],[s-o,a-o]])({nodes:t.map(u=>({name:u})),links:n.map(u=>({...u}))});let d="";l.links.forEach((u,h)=>{const f=M0()(u),g=i[u.source.index]||$o[u.source.index%8];d+=`<path class="link" d="${f}" stroke="${g}" stroke-width="${Math.max(1,u.width)}"/>`}),l.nodes.forEach((u,h)=>{const f=i[h]||$o[h%8],g=c?s-u.x1:u.x0,p=u.x1-u.x0,m=u.y0,b=u.y1-u.y0,x=c?g-6:g+p+6,v=c?"end":"start";d+=`<g class="node">
        <rect x="${g}" y="${m}" width="${p}" height="${b}" rx="3" fill="${f}"/>
        <text class="node-label" x="${x}" y="${m+b/2}"
          text-anchor="${v}" dominant-baseline="central">${this._esc(u.name)}</text>
      </g>`}),this.render(`<svg viewBox="0 0 ${s} ${a}" role="img" aria-label="Sankey Diagram">${d}</svg>`)}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sankey",T0);const L0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`,P0=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class z0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(L0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("canvas");n&&(n.style.opacity="0",n.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_buildChart(){const t=this.jsonAttr("data",[]),n=parseFloat(this.getAttribute("roughness")||"2");if(!t.length){this.render('<div class="sketch-container"></div>');return}const i=500,s=300,a={top:20,right:20,bottom:40,left:50};this.render(`<div class="sketch-container">
      <canvas width="${i*2}" height="${s*2}" style="width:${i}px;height:${s}px;"></canvas>
      <div class="bar-labels">${t.map(m=>`<span>${this._esc(m.label)}</span>`).join("")}</div>
    </div>`);const o=this.root.querySelector("canvas");if(!o)return;const c=V.canvas(o),l=o.getContext("2d");if(!l)return;l.scale(2,2);const d=Math.max(...t.map(m=>m.value)),u=i-a.left-a.right,h=s-a.top-a.bottom,f=u/t.length*.7,g=u/t.length*.3;c.line(a.left,s-a.bottom,i-a.right,s-a.bottom,{roughness:n*.5,stroke:"#888"}),c.line(a.left,a.top,a.left,s-a.bottom,{roughness:n*.5,stroke:"#888"});const p=this.isRtl;t.forEach((m,b)=>{const x=m.value/d*h,v=p?t.length-1-b:b,_=a.left+v*(f+g)+g/2,y=s-a.bottom-x,w=m.color||`var(--lv-chart-${b%8})`,S=w.startsWith("var(")?P0[b%8]:w;c.rectangle(_,y,f,x,{roughness:n,fill:S,fillStyle:"hachure",hachureGap:6,stroke:S,strokeWidth:1.5})}),l.font="11px sans-serif",l.fillStyle="#888",l.textAlign="right";for(let m=0;m<=4;m++){const b=d*m/4,x=s-a.bottom-m/4*h;l.fillText(b.toFixed(1),a.left-8,x+4)}}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sketch-bar",z0);const I0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`,Ao=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class q0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","x-label","y-label","color","area","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(I0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("canvas");n&&(n.style.opacity="0",n.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_buildChart(){const t=this.jsonAttr("data",[]),n=this.getAttribute("x-label")||"",i=this.getAttribute("y-label")||"",s=this.getAttribute("color")||"",a=this.hasAttribute("area"),o=parseFloat(this.getAttribute("roughness")||"2");if(!t.length){this.render("<canvas></canvas>");return}const c=typeof t[0]=="number"?t.map((M,E)=>({x:E,y:M})):t,l=500,d=260,u={top:20,right:20,bottom:40,left:55};this.render(`<canvas width="${l*2}" height="${d*2}" style="width:${l}px;height:${d}px;"></canvas>`);const h=this.root.querySelector("canvas");if(!h)return;const f=V.canvas(h),g=h.getContext("2d");if(!g)return;g.scale(2,2);const p=c.map(M=>M.x),m=c.map(M=>M.y),b=Math.min(...p),x=Math.max(...p),v=Math.min(0,Math.min(...m)),_=Math.max(...m)*1.1,y=l-u.left-u.right,w=d-u.top-u.bottom,S=M=>u.left+(M-b)/(x-b||1)*y,$=M=>u.top+(1-(M-v)/(_-v||1))*w,k=s.startsWith("var(")?Ao[0]:s||Ao[0];if(f.line(u.left,d-u.bottom,l-u.right,d-u.bottom,{roughness:o*.5,stroke:"#888"}),f.line(u.left,u.top,u.left,d-u.bottom,{roughness:o*.5,stroke:"#888"}),a){const M=[[S(c[0].x),$(v)],...c.map(E=>[S(E.x),$(E.y)]),[S(c[c.length-1].x),$(v)]];f.polygon(M,{roughness:o*.3,fill:k,fillStyle:"hachure",hachureGap:8,hachureAngle:60,stroke:"none",fillWeight:.5})}const A=c.map(M=>[S(M.x),$(M.y)]);f.curve(A,{roughness:o,stroke:k,strokeWidth:2.5}),c.forEach(M=>{f.circle(S(M.x),$(M.y),6,{roughness:o*.5,fill:k,fillStyle:"solid",stroke:k})}),g.font="11px sans-serif",g.fillStyle="#888",g.textAlign="center",n&&g.fillText(n,l/2,d-4),i&&(g.save(),g.translate(12,d/2),g.rotate(-Math.PI/2),g.fillText(i,0,0),g.restore()),g.textAlign="right";for(let M=0;M<=4;M++){const E=v+(_-v)*M/4;g.fillText(E.toFixed(2),u.left-8,$(E)+4)}g.textAlign="center";const T=Math.ceil(c.length/8);for(let M=0;M<c.length;M+=T)g.fillText(String(c[M].x),S(c[M].x),d-u.bottom+16)}}customElements.define("lv-sketch-line",q0);const F0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`,Bi=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class N0 extends D{constructor(){super(...arguments);P(this,"_raf",null);P(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","clusters","auto-rotate","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(F0),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}_buildScene(){const t=this.jsonAttr("data",[]);this.getAttribute("x-label"),this.getAttribute("y-label"),this.getAttribute("z-label");const n=this.hasAttribute("clusters"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!t.length)return;const s=this.root.getElementById("scene");if(!s)return;const a=s.clientWidth||500,o=s.clientHeight||375,c=new j.Scene;c.background=new j.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const l=new j.PerspectiveCamera(50,a/o,.1,100);l.position.set(2.5,2,2.5),l.lookAt(0,0,0);const d=new j.WebGLRenderer({antialias:!0});d.setSize(a,o),d.setPixelRatio(window.devicePixelRatio),s.appendChild(d.domElement),this._renderer=d;const u=new sn.OrbitControls(l,d.domElement);u.enableDamping=!0,u.dampingFactor=.05,u.autoRotate=i,u.autoRotateSpeed=1;const h=t.map(E=>E.x),f=t.map(E=>E.y),g=t.map(E=>E.z),p=E=>{const L=Math.min(...E),z=Math.max(...E)-L||1;return E.map(I=>(I-L)/z*2-1)},m=p(h),b=p(f),x=p(g),v=[...new Set(t.map(E=>E.cluster||""))],_=E=>{const L=v.indexOf(E);return new j.Color(Bi[L%Bi.length])},y=new j.BufferGeometry,w=new Float32Array(t.length*3),S=new Float32Array(t.length*3);t.forEach((E,L)=>{w[L*3]=m[L],w[L*3+1]=b[L],w[L*3+2]=x[L];const C=n?_(E.cluster||""):new j.Color(Bi[0]);S[L*3]=C.r,S[L*3+1]=C.g,S[L*3+2]=C.b}),y.setAttribute("position",new j.BufferAttribute(w,3)),y.setAttribute("color",new j.BufferAttribute(S,3));const $=new j.PointsMaterial({size:.06,vertexColors:!0,sizeAttenuation:!0});c.add(new j.Points(y,$));const k=1.2,A=[16729156,4521796,4474111];[[k,0,0],[0,k,0],[0,0,k]].forEach(([E,L,C],z)=>{const I=[new j.Vector3(0,0,0),new j.Vector3(E,L,C)],F=new j.BufferGeometry().setFromPoints(I),q=new j.LineBasicMaterial({color:A[z],opacity:.4,transparent:!0});c.add(new j.Line(F,q))});const T=new j.GridHelper(2,10,3355477,2236996);T.position.y=-1,c.add(T);const M=()=>{this._raf=requestAnimationFrame(M),u.update(),d.render(c,l)};M()}}customElements.define("lv-scatter-3d",N0);const D0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;class O0 extends D{constructor(){super(...arguments);P(this,"_raf",null);P(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","color-scale","wireframe","auto-rotate"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(D0),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}_buildScene(){const t=this.jsonAttr("data",[]),n=this.hasAttribute("wireframe"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!t.length||!t[0].length)return;const s=this.root.getElementById("scene");if(!s)return;const a=s.clientWidth||500,o=s.clientHeight||375,c=t.length,l=t[0].length,d=t.flat(),u=Math.min(...d),f=Math.max(...d)-u||1,g=new j.Scene;g.background=new j.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const p=new j.PerspectiveCamera(50,a/o,.1,100);p.position.set(2.5,2.5,2.5),p.lookAt(0,0,0);const m=new j.WebGLRenderer({antialias:!0});m.setSize(a,o),m.setPixelRatio(window.devicePixelRatio),s.appendChild(m.domElement),this._renderer=m;const b=new sn.OrbitControls(p,m.domElement);b.enableDamping=!0,b.autoRotate=i,b.autoRotateSpeed=.8;const x=new j.PlaneGeometry(2,2,l-1,c-1),v=x.attributes.position,_=new Float32Array(v.count*3);for(let $=0;$<c;$++)for(let k=0;k<l;k++){const A=$*l+k,T=(t[$][k]-u)/f;v.setZ(A,T-.5);const M=T;let E,L,C;M<.25?(E=0,L=M*4,C=1):M<.5?(E=0,L=1,C=1-(M-.25)*4):M<.75?(E=(M-.5)*4,L=1,C=0):(E=1,L=1-(M-.75)*4,C=0),_[A*3]=E,_[A*3+1]=L,_[A*3+2]=C}x.setAttribute("color",new j.BufferAttribute(_,3)),x.computeVertexNormals(),x.rotateX(-Math.PI/2);const y=n?new j.MeshBasicMaterial({vertexColors:!0,wireframe:!0}):new j.MeshPhongMaterial({vertexColors:!0,side:j.DoubleSide,flatShading:!0});if(g.add(new j.Mesh(x,y)),!n){g.add(new j.AmbientLight(16777215,.4));const $=new j.DirectionalLight(16777215,.8);$.position.set(3,5,3),g.add($)}const w=new j.GridHelper(2,10,3355477,2236996);w.position.y=-.5,g.add(w);const S=()=>{this._raf=requestAnimationFrame(S),b.update(),m.render(g,p)};S()}}customElements.define("lv-surface-3d",O0);const R0=`
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
`;class B0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_steps",[]);P(this,"_currentStep",0);P(this,"_arr",[]);P(this,"_playing",!1);P(this,"_timer",null)}static get observedAttributes(){return["data","algorithm","speed","auto-play"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(R0),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._stopTimer()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,!t&&this.hasAttribute("auto-play")&&this._play())}_stopTimer(){this._timer!==null&&(clearInterval(this._timer),this._timer=null),this._playing=!1}_getSpeed(){return parseInt(this.getAttribute("speed")||"100",10)}_getAlgorithm(){return this.getAttribute("algorithm")||"bubble"}_getData(){const t=this.jsonAttr("data",[]);if(t.length>0)return t.slice();const n=[];for(let i=0;i<20;i++)n.push(Math.floor(Math.random()*100)+5);return n}_generateSteps(t){const n=t.slice(),i=[],s=this._getAlgorithm();if(s==="bubble")for(let a=0;a<n.length;a++){for(let o=0;o<n.length-a-1;o++)i.push({type:"compare",indices:[o,o+1]}),n[o]>n[o+1]&&([n[o],n[o+1]]=[n[o+1],n[o]],i.push({type:"swap",indices:[o,o+1]}));i.push({type:"sorted",indices:[n.length-a-1]})}else if(s==="selection"){for(let a=0;a<n.length-1;a++){let o=a;for(let c=a+1;c<n.length;c++)i.push({type:"compare",indices:[o,c]}),n[c]<n[o]&&(o=c);o!==a&&([n[a],n[o]]=[n[o],n[a]],i.push({type:"swap",indices:[a,o]})),i.push({type:"sorted",indices:[a]})}i.push({type:"sorted",indices:[n.length-1]})}else if(s==="insertion"){i.push({type:"sorted",indices:[0]});for(let a=1;a<n.length;a++){let o=a;for(;o>0&&(i.push({type:"compare",indices:[o-1,o]}),n[o-1]>n[o]);)[n[o-1],n[o]]=[n[o],n[o-1]],i.push({type:"swap",indices:[o-1,o]}),o--}for(let a=0;a<n.length;a++)i.push({type:"sorted",indices:[a]})}else if(s==="merge"){this._mergeSortSteps(n,0,n.length-1,i);for(let a=0;a<n.length;a++)i.push({type:"sorted",indices:[a]})}else if(s==="quick"){this._quickSortSteps(n,0,n.length-1,i);for(let a=0;a<n.length;a++)i.push({type:"sorted",indices:[a]})}return i}_mergeSortSteps(t,n,i,s){if(n>=i)return;const a=Math.floor((n+i)/2);this._mergeSortSteps(t,n,a,s),this._mergeSortSteps(t,a+1,i,s);const o=t.slice(n,i+1);let c=0,l=a-n+1,d=n;for(;c<=a-n&&l<=i-n;)s.push({type:"compare",indices:[n+c,n+l]}),o[c]<=o[l]?t[d++]=o[c++]:t[d++]=o[l++];for(;c<=a-n;)t[d++]=o[c++];for(;l<=i-n;)t[d++]=o[l++];for(let u=n;u<=i;u++)s.push({type:"swap",indices:[u,u]})}_quickSortSteps(t,n,i,s){if(n>=i)return;const a=t[i];let o=n;for(let c=n;c<i;c++)s.push({type:"compare",indices:[c,i]}),t[c]<a&&(o!==c&&([t[o],t[c]]=[t[c],t[o]],s.push({type:"swap",indices:[o,c]})),o++);[t[o],t[i]]=[t[i],t[o]],s.push({type:"swap",indices:[o,i]}),s.push({type:"sorted",indices:[o]}),this._quickSortSteps(t,n,o-1,s),this._quickSortSteps(t,o+1,i,s)}_play(){this._playing||(this._playing=!0,this._updateButtons(),this._timer=window.setInterval(()=>{if(this._currentStep>=this._steps.length){this._stopTimer(),this._updateButtons();return}this._stepForward()},this._getSpeed()))}_pause(){this._stopTimer(),this._updateButtons()}_reset(){this._stopTimer(),this._currentStep=0,this._arr=this._getData(),this._steps=this._generateSteps(this._arr.slice()),this._drawBars(this._arr,null),this._updateInfo(),this._updateButtons()}_stepForward(){if(this._currentStep>=this._steps.length)return;const t=this._steps[this._currentStep];this._applyStep(t),this._currentStep++,this._updateInfo(),this._currentStep>=this._steps.length&&(this._stopTimer(),this._updateButtons())}_applyStep(t){const n=G(this.root.querySelector("svg"));if(this._arr.length,Math.max(...this._arr),t.type==="compare")n.selectAll(".bar-rect").attr("fill",(i,s)=>t.indices.includes(s)?"#ffd93d":n.selectAll(".bar-rect").nodes()[s].dataset.sorted==="true"?"#22c55e":"#00d4ff");else if(t.type==="swap"){const[i,s]=t.indices;i!==s&&([this._arr[i],this._arr[s]]=[this._arr[s],this._arr[i]]),this._drawBars(this._arr,t.indices)}else t.type==="sorted"&&t.indices.forEach(i=>{const s=n.selectAll(".bar-rect").nodes()[i];s&&(s.setAttribute("fill","#22c55e"),s.dataset.sorted="true")})}_drawBars(t,n){const s=G(this.root.querySelector("svg")).select(".bars-group");if(s.empty())return;const a=500,o=260,c=t.length,l=(a-20)/c,d=Math.max(...t);s.selectAll(".bar-rect").data(t).join(h=>h.append("rect").attr("class","bar-rect").attr("x",(f,g)=>10+g*l+1).attr("width",Math.max(l-2,1)).attr("y",f=>o-f/d*(o-20)).attr("height",f=>f/d*(o-20)).attr("rx",2).attr("fill","#00d4ff"),h=>h.attr("x",(f,g)=>10+g*l+1).attr("width",Math.max(l-2,1)).attr("y",f=>o-f/d*(o-20)).attr("height",f=>f/d*(o-20)).attr("fill",(f,g)=>h.nodes()[g].dataset.sorted==="true"?"#22c55e":n&&n.includes(g)?"#ffd93d":"#00d4ff"))}_updateInfo(){const t=this.root.querySelector(".info");t&&(t.textContent=`${this._getAlgorithm().toUpperCase()} — Step ${this._currentStep} / ${this._steps.length}`)}_updateButtons(){const t=this.root.querySelector(".btn-play"),n=this.root.querySelector(".btn-step");t&&(t.textContent=this._playing?"Pause":"Play"),n&&(n.disabled=this._playing||this._currentStep>=this._steps.length)}_build(){this._stopTimer(),this._arr=this._getData(),this._steps=this._generateSteps(this._arr.slice()),this._currentStep=0;const t=500,n=300;this.render(`<div class="sort-container">
      <svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}">
        <g class="bars-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`),this._drawBars(this._arr,null),this._updateInfo(),this.root.querySelector(".btn-play").addEventListener("click",()=>{this._playing?this._pause():this._play()}),this.root.querySelector(".btn-step").addEventListener("click",()=>{this._playing||this._stepForward()}),this.root.querySelector(".btn-reset").addEventListener("click",()=>this._reset())}}customElements.define("lv-sorting-viz",B0);const H0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mt-container { width: 100%; }
  svg { display: block; margin: 0 auto; }
  .matrix-label, .eigen-label {
    font-family: monospace;
  }
`;class j0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_animFrame",null)}static get observedAttributes(){return["matrix","show-grid","show-eigen","animate"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(H0),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._animFrame!==null&&cancelAnimationFrame(this._animFrame)}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,!t&&this.hasAttribute("animate")&&this._animateTransform())}_getMatrix(){return this.jsonAttr("matrix",[[1,0],[0,1]])}_showGrid(){return!this.hasAttribute("show-grid")||this.getAttribute("show-grid")!=="false"}_build(){this.render(`<div class="mt-container">
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
    </div>`),!this.hasAttribute("animate")||this._hasAnimated?this._drawScene(this._getMatrix()):this._drawScene([[1,0],[0,1]]),this._drawMatrixLabel(this._getMatrix())}_animateTransform(){const t=this._getMatrix(),n=1500,i=performance.now(),s=a=>{const o=Math.min((a-i)/n,1),c=o<.5?2*o*o:1-Math.pow(-2*o+2,2)/2,l=[[1+(t[0][0]-1)*c,t[0][1]*c],[t[1][0]*c,1+(t[1][1]-1)*c]];this._drawScene(l),o<1&&(this._animFrame=requestAnimationFrame(s))};this._animFrame=requestAnimationFrame(s)}_drawScene(t){const i=G(this.root.querySelector("svg")).select(".scene");i.selectAll("*").remove();const s=3,a=.02;for(let p=-s;p<=s;p++)i.append("line").attr("x1",-s).attr("y1",p).attr("x2",s).attr("y2",p).attr("stroke","#333").attr("stroke-width",p===0?a*2:a),i.append("line").attr("x1",p).attr("y1",-s).attr("x2",p).attr("y2",s).attr("stroke","#333").attr("stroke-width",p===0?a*2:a);if(this._showGrid())for(let p=-s;p<=s;p++){const m=t[0][0]*-s+t[0][1]*p,b=t[1][0]*-s+t[1][1]*p,x=t[0][0]*s+t[0][1]*p,v=t[1][0]*s+t[1][1]*p;i.append("line").attr("x1",m).attr("y1",b).attr("x2",x).attr("y2",v).attr("stroke","#00d4ff").attr("stroke-width",a).attr("opacity",.35);const _=t[0][0]*p+t[0][1]*-s,y=t[1][0]*p+t[1][1]*-s,w=t[0][0]*p+t[0][1]*s,S=t[1][0]*p+t[1][1]*s;i.append("line").attr("x1",_).attr("y1",y).attr("x2",w).attr("y2",S).attr("stroke","#00d4ff").attr("stroke-width",a).attr("opacity",.35)}const o=64,c=[];for(let p=0;p<=o;p++){const m=2*Math.PI*p/o,b=Math.cos(m),x=Math.sin(m);c.push([t[0][0]*b+t[0][1]*x,t[1][0]*b+t[1][1]*x])}const l=re().x(p=>p[0]).y(p=>p[1]);i.append("path").attr("d",l(c)).attr("fill","none").attr("stroke","#7b68ee").attr("stroke-width",a*1.5).attr("opacity",.6),i.append("circle").attr("cx",0).attr("cy",0).attr("r",1).attr("fill","none").attr("stroke","#555").attr("stroke-width",a).attr("stroke-dasharray","0.05,0.05");const d=.85,u=t[0][0],h=t[1][0];i.append("line").attr("x1",0).attr("y1",0).attr("x2",u*d).attr("y2",h*d).attr("stroke","#ef4444").attr("stroke-width",a*3).attr("marker-end","url(#ah-red)");const f=t[0][1],g=t[1][1];i.append("line").attr("x1",0).attr("y1",0).attr("x2",f*d).attr("y2",g*d).attr("stroke","#22c55e").attr("stroke-width",a*3).attr("marker-end","url(#ah-green)"),this.hasAttribute("show-eigen")&&this._computeEigen(t).forEach(m=>{if(m.real){const x=m.vec[0]*2.5,v=m.vec[1]*2.5;i.append("line").attr("x1",-x).attr("y1",-v).attr("x2",x).attr("y2",v).attr("stroke","#ffd93d").attr("stroke-width",a*2).attr("stroke-dasharray","0.1,0.06").attr("marker-end","url(#ah-yellow)")}}),i.append("circle").attr("cx",0).attr("cy",0).attr("r",a*2.5).attr("fill","#fff")}_drawMatrixLabel(t){const n=G(this.root.querySelector("svg")).select(".labels");n.selectAll("*").remove();const i=-3+.15,s=-3+.35,a=.24;n.append("rect").attr("x",i-.08).attr("y",s-a-.05).attr("width",2.2).attr("height",this.hasAttribute("show-eigen")?1.8:.8).attr("rx",.06).attr("fill","rgba(0,0,0,0.6)"),n.append("text").attr("class","matrix-label").attr("x",i).attr("y",s).attr("font-size",a).attr("fill","#aaa").text(`[${t[0][0].toFixed(1)}, ${t[0][1].toFixed(1)}]`),n.append("text").attr("class","matrix-label").attr("x",i).attr("y",s+a*1.3).attr("font-size",a).attr("fill","#aaa").text(`[${t[1][0].toFixed(1)}, ${t[1][1].toFixed(1)}]`),this.hasAttribute("show-eigen")&&this._computeEigen(t).forEach((c,l)=>{c.real&&n.append("text").attr("class","eigen-label").attr("x",i).attr("y",s+a*2.8+l*a*1.3).attr("font-size",a*.85).attr("fill","#ffd93d").text(`λ${l+1} = ${c.value.toFixed(2)}`)})}_computeEigen(t){const n=t[0][0],i=t[0][1],s=t[1][0],a=t[1][1],o=n+a,c=n*a-i*s,l=o*o-4*c;if(l<0)return[];const d=Math.sqrt(l),u=(o+d)/2,h=(o-d)/2,f=g=>{const p=n-g,m=i;if(Math.abs(m)>1e-10){const b=[1,-p/m],x=Math.sqrt(b[0]*b[0]+b[1]*b[1]);return[b[0]/x,b[1]/x]}else if(Math.abs(p)>1e-10)return[0,1];return[1,0]};return[{value:u,vec:f(u),real:!0},{value:h,vec:f(h),real:!0}]}}customElements.define("lv-matrix-transform",j0);const V0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .vf-container { width: 100%; }
  canvas { display: block; margin: 0 auto; }
`;class X0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_animFrame",null);P(this,"_particles",[]);P(this,"_fnEval",null)}static get observedAttributes(){return["fn","range","density","particles","particle-count"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(V0),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._animFrame!==null&&cancelAnimationFrame(this._animFrame)}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,!t&&this.hasAttribute("particles")&&this._startParticles())}_getRange(){return this.jsonAttr("range",[-3,3])}_getDensity(){return parseInt(this.getAttribute("density")||"15",10)}_getParticleCount(){return parseInt(this.getAttribute("particle-count")||"50",10)}_parseFn(){const t=this.getAttribute("fn")||"rotation",n={rotation:(i,s)=>[-s,i],source:(i,s)=>[i,s],saddle:(i,s)=>[i,-s],curl:(i,s)=>[-(s*s),i*i]};if(n[t])return n[t];try{const i=t.replace(/\^/g,"**"),s=new Function("x","y",`'use strict'; return ${i};`);return s(0,0),s}catch{return n.rotation}}_build(){this._animFrame!==null&&cancelAnimationFrame(this._animFrame),this._animFrame=null,this._fnEval=this._parseFn();const t=500,n=2;this.render(`<div class="vf-container">
      <canvas width="${t*n}" height="${t*n}" style="width:${t}px;height:${t}px;"></canvas>
    </div>`),this._drawField(),this._hasAnimated&&this.hasAttribute("particles")&&this._startParticles()}_drawField(){const t=this.root.querySelector("canvas");if(!t)return;const n=t.getContext("2d");if(!n)return;const i=2,s=500,[a,o]=this._getRange(),c=this._getDensity(),l=this._fnEval;n.save(),n.scale(i,i),n.clearRect(0,0,s,s);const d=(m,b)=>{const x=(m-a)/(o-a)*s,v=(o-b)/(o-a)*s;return[x,v]};n.strokeStyle="#444",n.lineWidth=1;const[u,h]=d(0,0);n.beginPath(),n.moveTo(0,h),n.lineTo(s,h),n.stroke(),n.beginPath(),n.moveTo(u,0),n.lineTo(u,s),n.stroke(),n.fillStyle="#666",n.font="11px sans-serif",n.textAlign="center",n.fillText("x",s-10,h+14),n.fillText("y",u+14,14);for(let m=Math.ceil(a);m<=Math.floor(o);m++){if(m===0)continue;const[b]=d(m,0);n.fillText(String(m),b,h+14);const[x,v]=d(0,m);n.textAlign="right",n.fillText(String(m),u-6,v+4),n.textAlign="center"}const f=(o-a)/c;let g=0;for(let m=0;m<c;m++)for(let b=0;b<c;b++){const x=a+(m+.5)*f,v=a+(b+.5)*f,[_,y]=l(x,v),w=Math.sqrt(_*_+y*y);w>g&&(g=w)}g===0&&(g=1);const p=f*.8*s/(o-a);for(let m=0;m<c;m++)for(let b=0;b<c;b++){const x=a+(m+.5)*f,v=a+(b+.5)*f,[_,y]=l(x,v),w=Math.sqrt(_*_+y*y);if(w<1e-10)continue;const S=w/g,$=p*Math.min(S,1)*.9,k=Math.atan2(-y,_),[A,T]=d(x,v),M=Math.floor(S*255),E=Math.floor((1-S)*255),L=Math.floor((1-Math.abs(S-.5)*2)*120);n.strokeStyle=`rgb(${M},${L},${E})`,n.fillStyle=`rgb(${M},${L},${E})`,n.lineWidth=1.2;const C=A+$*Math.cos(k),z=T+$*Math.sin(k);n.beginPath(),n.moveTo(A,T),n.lineTo(C,z),n.stroke();const I=Math.max($*.3,3),F=k+Math.PI*.8,q=k-Math.PI*.8;n.beginPath(),n.moveTo(C,z),n.lineTo(C+I*Math.cos(F),z+I*Math.sin(F)),n.lineTo(C+I*Math.cos(q),z+I*Math.sin(q)),n.closePath(),n.fill()}n.restore()}_startParticles(){const[t,n]=this._getRange(),i=this._getParticleCount();this._particles=[];for(let s=0;s<i;s++)this._particles.push({x:t+Math.random()*(n-t),y:t+Math.random()*(n-t),trail:[]});this._animateParticles()}_animateParticles(){const t=this.root.querySelector("canvas");if(!t)return;const n=t.getContext("2d");if(!n)return;const i=2,s=500,[a,o]=this._getRange(),c=this._fnEval,l=.015,d=10,u=(f,g)=>{const p=(f-a)/(o-a)*s,m=(o-g)/(o-a)*s;return[p,m]},h=()=>{this._drawField(),n.save(),n.scale(i,i);for(const f of this._particles){const[g,p]=c(f.x,f.y);f.trail.push([f.x,f.y]),f.trail.length>d&&f.trail.shift(),f.x+=g*l,f.y+=p*l,(f.x<a||f.x>o||f.y<a||f.y>o)&&(f.x=a+Math.random()*(o-a),f.y=a+Math.random()*(o-a),f.trail=[]);for(let x=0;x<f.trail.length;x++){const v=(x+1)/f.trail.length*.6,[_,y]=u(f.trail[x][0],f.trail[x][1]);n.beginPath(),n.arc(_,y,1.5,0,Math.PI*2),n.fillStyle=`rgba(0, 212, 255, ${v})`,n.fill()}const[m,b]=u(f.x,f.y);n.beginPath(),n.arc(m,b,2.5,0,Math.PI*2),n.fillStyle="#00d4ff",n.fill()}n.restore(),this._animFrame=requestAnimationFrame(h)};this._animFrame=requestAnimationFrame(h)}}customElements.define("lv-vector-field",X0);const Y0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .dist-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .axis text { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-text-dim); }
  .axis line, .axis path { stroke: var(--lv-border); }
  .stats-row { display: flex; gap: 24px; justify-content: center; margin-top: 8px; font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); }
  .stats-row span { display: inline-flex; gap: 4px; }
  .stats-label { color: var(--lv-text); font-weight: 600; }
  .shade-label { font-family: var(--lv-font-mono); font-size: 11px; fill: var(--lv-accent); font-weight: 600; }
`;class G0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1)}static get observedAttributes(){return["type","params","shade-from","shade-to","show-stats"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Y0),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".dist-area"),i=this.root.querySelector(".dist-line");n&&(n.style.opacity="0",n.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"})),i&&(i.style.opacity="0",i.style.transition="opacity 0.6s ease-out 0.1s",requestAnimationFrame(()=>{i.style.opacity="1"}))}_build(){const t=this.getAttribute("type")||"normal",n=this.hasAttribute("shade-from")?parseFloat(this.getAttribute("shade-from")):null,i=this.hasAttribute("shade-to")?parseFloat(this.getAttribute("shade-to")):null,s=this.hasAttribute("show-stats"),a=500,o=300,c={top:20,right:30,bottom:40,left:50},l=a-c.left-c.right,d=o-c.top-c.bottom,u=t==="poisson"||t==="binomial",{points:h,range:f,mean:g,std:p,mode:m}=this._computeDistribution(t);if(!h.length){this.render('<div class="dist-container"></div>');return}const b=nt().domain(f).range([0,l]),x=Math.max(...h.map($=>$.y))*1.15,v=nt().domain([0,x]).range([d,0]);let _="";const y=v.ticks(5);for(const $ of y)_+=`<line x1="0" y1="${v($)}" x2="${l}" y2="${v($)}" stroke="var(--lv-border)" stroke-opacity="0.3" stroke-dasharray="3,3"/>`;if(u){const $=Math.max(2,Math.min(20,l/h.length*.7));if(n!==null||i!==null){let k=0;for(const A of h)(n!==null&&i!==null?A.x>=n&&A.x<=i:n!==null?A.x>=n:i!==null?A.x<=i:!1)&&(_+=`<rect x="${b(A.x)-$/2}" y="${v(A.y)}" width="${$}" height="${d-v(A.y)}" fill="var(--lv-accent)" opacity="0.3"/>`,k+=A.y);_+=`<text class="shade-label" x="${l/2}" y="-4" text-anchor="middle">P = ${k.toFixed(4)}</text>`}for(const k of h)_+=`<rect x="${b(k.x)-$/2}" y="${v(k.y)}" width="${$}" height="${d-v(k.y)}" fill="var(--lv-accent)" opacity="0.6" stroke="var(--lv-accent)" stroke-width="1"/>`}else{const $=this._areaPath(h,b,v,d),k=this._linePath(h,b,v);if(n!==null||i!==null){const A=n??f[0],T=i??f[1],M=h.filter(E=>E.x>=A&&E.x<=T);if(M.length>1){const E=this._areaPath(M,b,v,d);_+=`<path d="${E}" fill="var(--lv-accent)" opacity="0.3"/>`;let L=0;for(let I=1;I<M.length;I++)L+=(M[I].x-M[I-1].x)*(M[I].y+M[I-1].y)/2;const C=b((A+T)/2),z=v(Math.max(...M.map(I=>I.y))/2);_+=`<text class="shade-label" x="${C}" y="${Math.min(z,d-10)}" text-anchor="middle">P = ${L.toFixed(4)}</text>`}}_+=`<path class="dist-area" d="${$}" fill="var(--lv-accent)" opacity="0.15"/>`,_+=`<path class="dist-line" d="${k}" fill="none" stroke="var(--lv-accent)" stroke-width="2"/>`}const w=b.ticks(8);for(const $ of w)_+=`<g class="axis" transform="translate(${b($)},${d})">
        <line y2="5" stroke="var(--lv-border)"/>
        <text y="18" text-anchor="middle">${this._fmtNum($)}</text>
      </g>`;_+=`<line x1="0" y1="${d}" x2="${l}" y2="${d}" stroke="var(--lv-border)"/>`;for(const $ of y)_+=`<g class="axis" transform="translate(0,${v($)})">
        <line x2="-5" stroke="var(--lv-border)"/>
        <text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum($)}</text>
      </g>`;_+=`<line x1="0" y1="0" x2="0" y2="${d}" stroke="var(--lv-border)"/>`;let S="";s&&(S=`<div class="stats-row">
        <span><span class="stats-label">Mean:</span> ${this._fmtNum(g)}</span>
        <span><span class="stats-label">Std:</span> ${this._fmtNum(p)}</span>
        <span><span class="stats-label">Mode:</span> ${this._fmtNum(m)}</span>
      </div>`),this.render(`<div class="dist-container">
      <svg viewBox="0 0 ${a} ${o}" role="img" aria-label="${t} distribution">
        <g transform="translate(${c.left},${c.top})">${_}</g>
      </svg>
      ${S}
    </div>`)}_computeDistribution(t){switch(t){case"uniform":{const n=this.jsonAttr("params",{a:0,b:1}),i=n.a??0,s=n.b??1;if(s<=i)return{points:[{x:i,y:1}],range:[i-1,i+1],mean:i,std:0,mode:i};const a=1/(s-i),o=[i-1,s+1],c=[],l=200;for(let d=0;d<=l;d++){const u=o[0]+(o[1]-o[0])*d/l;c.push({x:u,y:u>=i&&u<=s?a:0})}return{points:c,range:o,mean:(i+s)/2,std:Math.sqrt((s-i)**2/12),mode:(i+s)/2}}case"poisson":{const i=this.jsonAttr("params",{lambda:5}).lambda??5,s=Math.ceil(i+4*Math.sqrt(i)),a=[];let o=0,c=0;for(let l=0;l<=s;l++){const d=Math.exp(-i+l*Math.log(i)-this._logFactorial(l));d>o&&(o=d,c=l),a.push({x:l,y:d})}return{points:a,range:[0,s],mean:i,std:Math.sqrt(i),mode:c}}case"binomial":{const n=this.jsonAttr("params",{n:20,p:.5}),i=n.n??20,s=Math.max(1e-15,Math.min(1-1e-15,n.p??.5)),a=[];let o=0,c=0;for(let l=0;l<=i;l++){const d=this._logComb(i,l)+l*Math.log(s)+(i-l)*Math.log(1-s),u=Math.exp(d);u>o&&(o=u,c=l),a.push({x:l,y:u})}return{points:a,range:[0,i],mean:i*s,std:Math.sqrt(i*s*(1-s)),mode:c}}case"exponential":{const i=this.jsonAttr("params",{lambda:1}).lambda??1,s=5/i,a=[],o=200;for(let c=0;c<=o;c++){const l=s*c/o;a.push({x:l,y:i*Math.exp(-i*l)})}return{points:a,range:[0,s],mean:1/i,std:1/i,mode:0}}default:{const n=this.jsonAttr("params",{mean:0,std:1}),i=n.mean??0,s=n.std??1,a=[i-4*s,i+4*s],o=[],c=200,l=1/(s*Math.sqrt(2*Math.PI));for(let d=0;d<=c;d++){const u=a[0]+(a[1]-a[0])*d/c,h=l*Math.exp(-.5*((u-i)/s)**2);o.push({x:u,y:h})}return{points:o,range:a,mean:i,std:s,mode:i}}}}_logFactorial(t){let n=0;for(let i=2;i<=t;i++)n+=Math.log(i);return n}_logComb(t,n){return this._logFactorial(t)-this._logFactorial(n)-this._logFactorial(t-n)}_linePath(t,n,i){return t.map((s,a)=>`${a===0?"M":"L"}${n(s.x)},${i(s.y)}`).join("")}_areaPath(t,n,i,s){if(!t.length)return"";let a=`M${n(t[0].x)},${s}`;for(const o of t)a+=`L${n(o.x)},${i(o.y)}`;return a+=`L${n(t[t.length-1].x)},${s}Z`,a}_fmtNum(t){return Number.isInteger(t)?String(t):parseFloat(t.toPrecision(4)).toString()}}customElements.define("lv-distribution",G0);const W0=`
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
`;class U0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_points",[]);P(this,"_dragging",null);P(this,"_svgEl",null);P(this,"_xScale");P(this,"_yScale");P(this,"_margin",{top:20,right:30,bottom:40,left:50})}static get observedAttributes(){return["data","degree","interactive","show-r2","show-equation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(W0),this._points=this.jsonAttr("data",[]),this._build()}handleAttributeChange(t){t==="data"&&(this._points=this.jsonAttr("data",[])),this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("svg");n&&(n.style.opacity="0",n.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_build(){const t=Math.max(1,Math.min(5,parseInt(this.getAttribute("degree")||"1",10))),n=this.hasAttribute("interactive"),i=this.hasAttribute("show-r2"),s=this.hasAttribute("show-equation"),a=this._points,o=500,c=350,l=this._margin,d=o-l.left-l.right,u=c-l.top-l.bottom;if(!a.length){this._xScale=nt().domain([0,10]).range([0,d]),this._yScale=nt().domain([0,10]).range([u,0]),this.render(`<div class="reg-container">
        <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="Regression chart">
          <g transform="translate(${l.left},${l.top})">
            <text x="${d/2}" y="${u/2}" text-anchor="middle" fill="var(--lv-text-dim)" font-family="var(--lv-font)" font-size="13">Click to add points</text>
          </g>
        </svg>
      </div>`),n&&this._attachInteraction();return}const h=ne(a,w=>w.x),f=ne(a,w=>w.y),g=(h[1]-h[0])*.15||1,p=(f[1]-f[0])*.15||1,m=nt().domain([h[0]-g,h[1]+g]).range([0,d]),b=nt().domain([f[0]-p,f[1]+p]).range([u,0]);this._xScale=m,this._yScale=b;let x="";for(const w of m.ticks(8))x+=`<line class="gridline" x1="${m(w)}" y1="0" x2="${m(w)}" y2="${u}"/>`;for(const w of b.ticks(6))x+=`<line class="gridline" x1="0" y1="${b(w)}" x2="${d}" y2="${b(w)}"/>`;const v=Math.min(t,a.length-1),_=this._fitPolynomial(a,v);if(_.length){const w=[];for(let $=0;$<=200;$++){const k=m.domain()[0]+(m.domain()[1]-m.domain()[0])*$/200,A=this._evalPoly(_,k);w.push(`${$===0?"M":"L"}${m(k)},${b(A)}`)}x+=`<path d="${w.join("")}" fill="none" stroke="var(--lv-accent2)" stroke-width="2.5" stroke-linecap="round"/>`}for(let w=0;w<a.length;w++){const S=a[w];x+=`<circle class="point" data-idx="${w}" cx="${m(S.x)}" cy="${b(S.y)}" r="6" fill="var(--lv-accent)" stroke="#fff" stroke-width="2"/>`}for(const w of m.ticks(8))x+=`<g class="axis" transform="translate(${m(w)},${u})">
        <line y2="5"/><text y="18" text-anchor="middle">${this._fmtNum(w)}</text>
      </g>`;x+=`<line x1="0" y1="${u}" x2="${d}" y2="${u}" stroke="var(--lv-border)"/>`;for(const w of b.ticks(6))x+=`<g class="axis" transform="translate(0,${b(w)})">
        <line x2="-5"/><text x="-8" text-anchor="end" dominant-baseline="central">${this._fmtNum(w)}</text>
      </g>`;x+=`<line x1="0" y1="0" x2="0" y2="${u}" stroke="var(--lv-border)"/>`;let y="";if(i||s){if(y='<div class="info-row">',i&&_.length){const w=this._computeR2(a,_),S=w>.8?"var(--lv-positive)":w>.5?"var(--lv-warning)":"var(--lv-negative)";y+=`<span class="r2-text" style="color:${S}">R² = ${w.toFixed(4)}</span>`}s&&_.length&&(y+=`<span class="eq-text">${this._formatEquation(_)}</span>`),y+="</div>"}this.render(`<div class="reg-container">
      <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="Regression fit">
        <g transform="translate(${l.left},${l.top})">${x}</g>
      </svg>
      ${y}
    </div>`),n&&this._attachInteraction()}_attachInteraction(){const t=this.root.querySelector("svg");if(!t)return;this._svgEl=t,t.addEventListener("click",i=>{if(this._dragging!==null)return;const s=i;if(s.target.classList.contains("point"))return;const o=this._svgCoords(s);o&&(this._points.push(o),this._build())}),t.addEventListener("contextmenu",i=>{const s=i,a=s.target;if(a.classList.contains("point")){s.preventDefault();const o=parseInt(a.dataset.idx||"-1",10);o>=0&&(this._points.splice(o,1),this._build())}}),this.root.querySelectorAll(".point").forEach(i=>{i.addEventListener("mousedown",s=>{s.preventDefault(),s.stopPropagation(),this._dragging=parseInt(i.dataset.idx||"-1",10);const a=c=>{if(this._dragging===null)return;const l=this._svgCoords(c);l&&this._dragging>=0&&this._dragging<this._points.length&&(this._points[this._dragging]=l,this._build())},o=()=>{this._dragging=null,document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",o)})})}_svgCoords(t){const n=this._svgEl;if(!n||!this._xScale||!this._yScale)return null;const i=n.getBoundingClientRect(),s=this._margin,a=500,o=350,c=i.width/a,l=i.height/o,d=(t.clientX-i.left)/c-s.left,u=(t.clientY-i.top)/l-s.top,h=this._xScale.invert(d),f=this._yScale.invert(u);return{x:h,y:f}}_fitPolynomial(t,n){const i=t.length;if(i===0||n<0)return[];const s=Math.min(n,i-1),a=[],o=[];for(const u of t){const h=[];for(let f=0;f<=s;f++)h.push(Math.pow(u.x,f));a.push(h),o.push(u.y)}const c=s+1,l=Array.from({length:c},()=>Array(c).fill(0)),d=Array(c).fill(0);for(let u=0;u<c;u++){for(let h=0;h<c;h++)for(let f=0;f<i;f++)l[u][h]+=a[f][u]*a[f][h];for(let h=0;h<i;h++)d[u]+=a[h][u]*o[h]}return this._solveLinear(l,d)}_solveLinear(t,n){const i=t.length,s=t.map((a,o)=>[...a,n[o]]);for(let a=0;a<i;a++){let o=a;for(let l=a+1;l<i;l++)Math.abs(s[l][a])>Math.abs(s[o][a])&&(o=l);if([s[a],s[o]]=[s[o],s[a]],Math.abs(s[a][a])<1e-12)continue;const c=s[a][a];for(let l=a;l<=i;l++)s[a][l]/=c;for(let l=0;l<i;l++){if(l===a)continue;const d=s[l][a];for(let u=a;u<=i;u++)s[l][u]-=d*s[a][u]}}return s.map(a=>a[i])}_evalPoly(t,n){let i=0;for(let s=0;s<t.length;s++)i+=t[s]*Math.pow(n,s);return i}_computeR2(t,n){const i=t.reduce((o,c)=>o+c.y,0)/t.length;let s=0,a=0;for(const o of t)s+=(o.y-i)**2,a+=(o.y-this._evalPoly(n,o.x))**2;return s===0?1:1-a/s}_formatEquation(t){if(!t.length)return"";const n=[];for(let i=t.length-1;i>=0;i--){const s=t[i];if(Math.abs(s)<1e-10)continue;const a=s>=0?n.length?" + ":"":n.length?" − ":"-",o=Math.abs(s),c=parseFloat(o.toPrecision(3)).toString();i===0?n.push(`${a}${c}`):i===1?n.push(`${a}${c==="1"?"":c}x`):n.push(`${a}${c==="1"?"":c}x${this._superscript(i)}`)}return`y = ${n.join("")||"0"}`}_superscript(t){const n={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹"};return String(t).split("").map(i=>n[i]||i).join("")}_fmtNum(t){return Number.isInteger(t)?String(t):parseFloat(t.toPrecision(4)).toString()}}customElements.define("lv-regression-fit",U0);const K0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .gd-container { width: 100%; overflow-x: auto; }
  canvas { display: block; margin: 0 auto; border-radius: var(--lv-r-md); }
  .info { font-family: var(--lv-font-mono); font-size: 12px; color: var(--lv-text-dim); text-align: center; margin-top: 6px; min-height: 1.4em; }
  .axis-label { font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); text-align: center; margin-top: 2px; }
`,So={quadratic:{fn:(r,e)=>r*r+e*e,range:[-3,3]},rosenbrock:{fn:(r,e)=>(1-r)**2+100*(e-r*r)**2,range:[-2,2]},himmelblau:{fn:(r,e)=>(r*r+e-11)**2+(r+e*e-7)**2,range:[-5,5]},saddle:{fn:(r,e)=>r*r-e*e,range:[-3,3]}};class Z0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_animFrame",null);P(this,"_timer",null)}static get observedAttributes(){return["fn","optimizer","lr","start","show-path","speed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(K0),this._build()}handleAttributeChange(){this.isConnected&&this._build()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,t||this._runOptimization())}_stopAnimation(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null),this._timer&&(clearTimeout(this._timer),this._timer=null)}_build(){this._stopAnimation(),this._hasAnimated=!1;const t=400,n=400;this.render(`<div class="gd-container">
      <canvas id="gd-canvas" width="${t*2}" height="${n*2}" style="width:${t}px;height:${n}px;"></canvas>
      <div class="info" id="gd-info">&nbsp;</div>
      <div class="axis-label">Click or scroll into view to start optimization</div>
    </div>`),this._drawContour()}_getFnConfig(){const t=this.getAttribute("fn")||"quadratic",n=So[t]||So.quadratic;return{fnName:t,...n}}_drawContour(){const t=this.root.getElementById("gd-canvas");if(!t)return;const n=t.getContext("2d");if(!n)return;const i=400,s=400;n.clearRect(0,0,i*2,s*2),n.save(),n.scale(2,2);const{fn:a,range:o}=this._getFnConfig(),[c,l]=o,d=200,u=[];let h=1/0,f=-1/0;for(let _=0;_<d;_++){u[_]=[];for(let y=0;y<d;y++){const w=c+(l-c)*y/(d-1),S=c+(l-c)*_/(d-1),$=a(w,S);u[_][y]=$,$<h&&(h=$),$>f&&(f=$)}}const g=Math.log(1+h-h),m=Math.log(1+f-h)-g||1,b=i/d,x=s/d;for(let _=0;_<d;_++)for(let y=0;y<d;y++){const w=Math.log(1+u[_][y]-h)/m;n.fillStyle=this._contourColor(w),n.fillRect(y*b,_*x,b+.5,x+.5)}const v=15;n.strokeStyle="rgba(255,255,255,0.15)",n.lineWidth=.5;for(let _=0;_<v;_++){const y=h+(f-h)*(_/v);this._drawContourLine(n,u,y,d,i,s)}n.fillStyle="rgba(255,255,255,0.6)",n.font="11px sans-serif",n.textAlign="center",n.fillText(String(c),20,s-5),n.fillText(String(l),i-20,s-5),n.fillText("x",i/2,s-5),n.save(),n.translate(12,s/2),n.rotate(-Math.PI/2),n.fillText("y",0,0),n.restore(),n.restore()}_drawContourLine(t,n,i,s,a,o){const c=a/s,l=o/s;t.beginPath();for(let d=0;d<s-1;d++)for(let u=0;u<s-1;u++){const h=n[d][u],f=n[d][u+1],g=n[d+1][u];if((h-i)*(f-i)<0){const p=(i-h)/(f-h),m=(u+p)*c,b=d*l;t.moveTo(m-.5,b),t.lineTo(m+.5,b)}if((h-i)*(g-i)<0){const p=(i-h)/(g-h),m=u*c,b=(d+p)*l;t.moveTo(m,b-.5),t.lineTo(m,b+.5)}}t.stroke()}_contourColor(t){const n=Math.max(0,Math.min(1,t));let i,s,a;if(n<.33){const o=n/.33;i=Math.round(10+o*0),s=Math.round(20+o*180),a=Math.round(80+o*140)}else if(n<.66){const o=(n-.33)/.33;i=Math.round(10+o*230),s=Math.round(200-o*10),a=Math.round(220-o*180)}else{const o=(n-.66)/.34;i=Math.round(240),s=Math.round(190-o*140),a=Math.round(40-o*30)}return`rgb(${i},${s},${a})`}_runOptimization(){const t=this.root.getElementById("gd-canvas"),n=this.root.getElementById("gd-info");if(!t)return;const i=t.getContext("2d");if(!i)return;const s=400,a=400,{fn:o,range:c}=this._getFnConfig(),[l,d]=c,u=parseFloat(this.getAttribute("lr")||"0.05"),h=parseInt(this.getAttribute("speed")||"50",10),f=this.hasAttribute("show-path"),g=this.getAttribute("optimizer")||"sgd",p=this.jsonAttr("start",[l+Math.random()*(d-l)*.6+(d-l)*.2,l+Math.random()*(d-l)*.6+(d-l)*.2]);let m=p[0],b=p[1];const x=[[m,b]],v={vx:0,vy:0,mx:0,my:0,sx:0,sy:0,t:0},_=(A,T)=>[(A-l)/(d-l)*s,(T-l)/(d-l)*a],y=1e-5,w=(A,T)=>{const M=(o(A+y,T)-o(A-y,T))/(2*y),E=(o(A,T+y)-o(A,T-y))/(2*y);return[M,E]};let S=0;const $=200,k=()=>{if(S>=$)return;const[A,T]=w(m,b);if(Math.sqrt(A*A+T*T)<1e-6)return;switch(g){case"momentum":v.vx=.9*v.vx+u*A,v.vy=.9*v.vy+u*T,m-=v.vx,b-=v.vy;break;case"adam":v.t++,v.mx=.9*v.mx+.1*A,v.my=.9*v.my+.1*T,v.sx=.999*v.sx+.001*A*A,v.sy=.999*v.sy+.001*T*T;const z=v.mx/(1-Math.pow(.9,v.t)),I=v.my/(1-Math.pow(.9,v.t)),F=v.sx/(1-Math.pow(.999,v.t)),q=v.sy/(1-Math.pow(.999,v.t));m-=u*z/(Math.sqrt(F)+1e-8),b-=u*I/(Math.sqrt(q)+1e-8);break;default:m-=u*A,b-=u*T;break}if(m=Math.max(l,Math.min(d,m)),b=Math.max(l,Math.min(d,b)),x.push([m,b]),this._drawContour(),i.save(),i.scale(2,2),f&&x.length>1)for(let z=1;z<x.length;z++){const I=.1+.9*(z/x.length);i.strokeStyle=`rgba(0,212,255,${I})`,i.lineWidth=1.5,i.beginPath();const[F,q]=_(x[z-1][0],x[z-1][1]),[N,O]=_(x[z][0],x[z][1]);i.moveTo(F,q),i.lineTo(N,O),i.stroke()}const[E,L]=_(m,b);i.beginPath(),i.arc(E,L,6,0,Math.PI*2),i.fillStyle="#00d4ff",i.shadowColor="#00d4ff",i.shadowBlur=12,i.fill(),i.shadowBlur=0,i.strokeStyle="#fff",i.lineWidth=1.5,i.stroke(),i.restore();const C=o(m,b);n&&(n.textContent=`Step ${S+1} | Loss: ${C.toFixed(4)} | x: ${m.toFixed(3)}, y: ${b.toFixed(3)}`),S++,this._timer=setTimeout(()=>{this._animFrame=requestAnimationFrame(k)},h)};this._animFrame=requestAnimationFrame(k)}}customElements.define("lv-gradient-descent",Z0);const J0=`
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
`,Er=["#3b82f6","#ef4444"];class Q0 extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_nextClass",0)}static get observedAttributes(){return["data","model","resolution","interactive","c"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(J0),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("svg");n&&(n.style.opacity="0",n.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_build(){const t=this.jsonAttr("data",[{x:1,y:2,class:0},{x:2,y:3,class:0},{x:3,y:3,class:0},{x:1.5,y:1,class:0},{x:2.5,y:2,class:0},{x:5,y:5,class:1},{x:6,y:5,class:1},{x:5,y:6,class:1},{x:6,y:6,class:1},{x:5.5,y:4.5,class:1}]),n=this.getAttribute("model")||"linear",i=parseInt(this.getAttribute("resolution")||"50",10),s=this.hasAttribute("interactive"),a=parseFloat(this.getAttribute("c")||"1.0"),o=500,c=400,l={top:20,right:20,bottom:40,left:45},d=o-l.left-l.right,u=c-l.top-l.bottom;if(!t.length){this.render('<div class="db-container"></div>');return}const h=ne(t,L=>L.x),f=ne(t,L=>L.y),g=(h[1]-h[0])*.2||1,p=(f[1]-f[0])*.2||1,m=h[0]-g,b=h[1]+g,x=f[0]-p,v=f[1]+p,_=nt().domain([m,b]).range([0,d]),y=nt().domain([v,x]).range([0,u]),w=this._fitModel(t,n,a);let S="";const $=d/i,k=u/i;for(let L=0;L<i;L++)for(let C=0;C<i;C++){const z=m+(b-m)*(C+.5)/i,I=v-(v-x)*(L+.5)/i,F=w(z,I),q=Er[F>=.5?1:0];S+=`<rect x="${l.left+C*$}" y="${l.top+L*k}" width="${$+.5}" height="${k+.5}" fill="${q}" opacity="0.15"/>`}let A="";t.forEach(L=>{const C=l.left+_(L.x),z=l.top+y(L.y),I=Er[L.class];A+=`<circle class="point" cx="${C}" cy="${z}" r="5" fill="${I}"/>`});const T=_.ticks(6),M=y.ticks(6);let E="";if(T.forEach(L=>{const C=l.left+_(L);E+=`<g class="tick"><line x1="${C}" y1="${l.top+u}" x2="${C}" y2="${l.top+u+5}"/><text x="${C}" y="${l.top+u+18}" text-anchor="middle">${L}</text></g>`}),M.forEach(L=>{const C=l.top+y(L);E+=`<g class="tick"><line x1="${l.left-5}" y1="${C}" x2="${l.left}" y2="${C}"/><text x="${l.left-8}" y="${C+4}" text-anchor="end">${L}</text></g>`}),E+=`<line class="domain" x1="${l.left}" y1="${l.top}" x2="${l.left}" y2="${l.top+u}"/>`,E+=`<line class="domain" x1="${l.left}" y1="${l.top+u}" x2="${l.left+d}" y2="${l.top+u}"/>`,this.render(`<div class="db-container">
      <svg id="db-svg" width="${o}" height="${c}" viewBox="0 0 ${o} ${c}">
        ${S}
        ${E}
        ${A}
      </svg>
      <div class="legend">
        <div class="legend-item"><div class="legend-dot" style="background:${Er[0]}"></div>Class 0</div>
        <div class="legend-item"><div class="legend-dot" style="background:${Er[1]}"></div>Class 1</div>
        ${s?'<div class="legend-item" style="opacity:0.7">(Click to add points)</div>':""}
      </div>
    </div>`),s){const L=this.root.getElementById("db-svg");L&&L.addEventListener("click",C=>{const z=C,I=L.getBoundingClientRect(),F=(z.clientX-I.left)*(o/I.width)-l.left,q=(z.clientY-I.top)*(c/I.height)-l.top,N=_.invert(F),O=y.invert(q);F<0||F>d||q<0||q>u||(t.push({x:N,y:O,class:this._nextClass}),this._nextClass=1-this._nextClass,this.setAttribute("data",JSON.stringify(t)))})}}_fitModel(t,n,i){if(n==="rbf")return this._fitRbf(t,i);const s=n==="quadratic"?(g,p)=>[1,g,p,g*g,p*p,g*p]:(g,p)=>[1,g,p],a=s(0,0).length,o=new Float64Array(a),c=Ws(t,g=>g.x)||0,l=Ws(t,g=>g.y)||0,d=Math.max(Ys(t,g=>g.x)||1,.01),u=Math.max(Ys(t,g=>g.y)||1,.01),h=.1,f=500;for(let g=0;g<f;g++){const p=new Float64Array(a);for(const m of t){const b=(m.x-c)/d,x=(m.y-l)/u,v=s(b,x);let _=0;for(let S=0;S<a;S++)_+=o[S]*v[S];const w=1/(1+Math.exp(-_))-m.class;for(let S=0;S<a;S++)p[S]+=w*v[S]}for(let m=0;m<a;m++)o[m]-=h*p[m]/t.length}return(g,p)=>{const m=(g-c)/d,b=(p-l)/u,x=s(m,b);let v=0;for(let _=0;_<a;_++)v+=o[_]*x[_];return 1/(1+Math.exp(-v))}}_fitRbf(t,n){const i=n;return(s,a)=>{let o=0,c=0;for(const d of t){const u=(s-d.x)**2+(a-d.y)**2,h=Math.exp(-i*u);d.class===0?o+=h:c+=h}const l=o+c;return l<1e-10?.5:c/l}}}customElements.define("lv-decision-boundary",Q0);const tm=`
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
`;class em extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_activeHead",0)}static get observedAttributes(){return["tokens","target-tokens","weights","heads","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(tm),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("svg");n&&(n.style.opacity="0",n.style.transition="opacity 0.5s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_getWeights(){const t=this.jsonAttr("heads",null);if(t&&t.length>0){const n=Math.min(this._activeHead,t.length-1);return t[n]}return this.jsonAttr("weights",null)}_build(){var M;const t=this.jsonAttr("tokens",[]),n=this.jsonAttr("target-tokens",t),i=this._getWeights(),s=this.jsonAttr("heads",null),a=this.getAttribute("color")||"#00d4ff";if(!t.length||!i){this.render('<div class="attn-container"><em style="color:var(--lv-text-dim)">No attention data</em></div>');return}const o=t.length,c=n.length,l=24,d=10,u=120,h=200,f=u*2+h,g=Math.max(o,c)*l+d*2,p=u,m=u+h,b=this.isRtl,x=b?f-(p-8):p-8,v=b?f-(m+8):m+8,_=b?"start":"end",y=b?"end":"start",w=b?f-p:p,S=b?f-m:m;let $="";s&&s.length>1&&($=`<div class="head-bar">${s.map((L,C)=>`<button class="head-btn${C===this._activeHead?" active":""}" data-head="${C}">Head ${C+1}</button>`).join("")}</div>`);let k="";for(let E=0;E<o;E++)for(let L=0;L<c;L++){const C=((M=i[E])==null?void 0:M[L])??0;if(C<.01)continue;const z=d+E*l+l/2,I=d+L*l+l/2,F=w+(S-w)*.35,q=w+(S-w)*.65;k+=`<path class="attn-line" data-src="${E}" data-tgt="${L}" d="M${w},${z} C${F},${z} ${q},${I} ${S},${I}" fill="none" stroke="${a}" stroke-width="${Math.max(.5,C*4)}" stroke-opacity="${C}"/>`}let A="";t.forEach((E,L)=>{const C=d+L*l+l/2+4;A+=`<text class="token-text src-token" data-idx="${L}" x="${x}" y="${C}" text-anchor="${_}">${this._esc(E)}</text>`});let T="";n.forEach((E,L)=>{const C=d+L*l+l/2+4;T+=`<text class="token-text tgt-token" data-idx="${L}" x="${v}" y="${C}" text-anchor="${y}">${this._esc(E)}</text>`}),this.render(`<div class="attn-container">
      ${$}
      <svg id="attn-svg" width="${f}" height="${g}" viewBox="0 0 ${f} ${g}">
        <g id="lines-group">${k}</g>
        ${A}
        ${T}
      </svg>
    </div>`),this._bindEvents()}_bindEvents(){const t=this.root.getElementById("attn-svg");t&&(t.querySelectorAll(".src-token").forEach(n=>{n.addEventListener("mouseenter",()=>{const i=n.getAttribute("data-idx");t.querySelectorAll(".attn-line").forEach(s=>{const a=s;a.dataset.src===i?a.style.strokeOpacity="":a.style.strokeOpacity="0.05"})}),n.addEventListener("mouseleave",()=>{t.querySelectorAll(".attn-line").forEach(i=>{i.style.strokeOpacity=""})})}),t.querySelectorAll(".tgt-token").forEach(n=>{n.addEventListener("mouseenter",()=>{const i=n.getAttribute("data-idx");t.querySelectorAll(".attn-line").forEach(s=>{const a=s;a.dataset.tgt===i?a.style.strokeOpacity="":a.style.strokeOpacity="0.05"})}),n.addEventListener("mouseleave",()=>{t.querySelectorAll(".attn-line").forEach(i=>{i.style.strokeOpacity=""})})}),this.root.querySelectorAll(".head-btn").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.head||"0",10);this._activeHead=i,this._build()})}))}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-attention-map",em);const nm=`
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
`,ht=120,Dt=90,Hi=60,ji=40,Co=10,Mo=2,Eo=8,kn=60;function Vi(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class rm extends D{constructor(){super(...arguments);P(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(nm),this._readChildren(),this._renderSvg()}_readChildren(){this._steps=[],this.querySelectorAll("lv-flow-step").forEach(n=>{this._steps.push({icon:n.getAttribute("icon")||"",label:n.getAttribute("label")||"",sub:n.getAttribute("sub")||"",color:n.getAttribute("color")||"var(--lv-accent, #6366f1)",active:n.hasAttribute("active")})})}_renderSvg(){const t=this._steps;if(t.length===0)return;const i=(this.getAttribute("direction")||"horizontal")==="horizontal",s=this.hasAttribute("cyclic"),a=this.isRtl,o=24,c=s?kn+40:0;let l,d;i?(l=o*2+t.length*ht+(t.length-1)*Hi,d=o*2+Dt+c):(l=o*2+ht+c,d=o*2+t.length*Dt+(t.length-1)*ji);const u=[];for(let v=0;v<t.length;v++)if(i){let _=o+v*(ht+Hi);a&&(_=l-o-ht-v*(ht+Hi)),u.push({x:_,y:o})}else u.push({x:o,y:o+v*(Dt+ji)});const h="arrowhead",f=Eo,g=Eo,p=`
      <defs>
        <marker id="${h}" markerWidth="${f}" markerHeight="${g}"
                refX="${f}" refY="${g/2}"
                orient="auto-start-reverse" markerUnits="strokeWidth">
          <path d="M0,0 L${f},${g/2} L0,${g} Z"
                fill="var(--lv-accent2, #a78bfa)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;let m="";for(let v=0;v<t.length;v++){const _=t[v],y=u[v],w=_.active?_.color:"var(--lv-border, #333)",S=_.active?' filter="url(#glow)"':"";m+=`
        <g class="step-group" style="transition-delay: ${v*150}ms">
          <rect x="${y.x}" y="${y.y}" width="${ht}" height="${Dt}"
                rx="${Co}" ry="${Co}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${w}" stroke-width="${_.active?2.5:1.5}"
                ${S} />
          <text x="${y.x+ht/2}" y="${y.y+30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${Vi(_.icon)}
          </text>
          <text x="${y.x+ht/2}" y="${y.y+54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${Vi(_.label)}
          </text>
          <text x="${y.x+ht/2}" y="${y.y+70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${Vi(_.sub)}
          </text>
        </g>`}let b="";for(let v=0;v<t.length-1;v++){const _=u[v],y=u[v+1],w=t.length*150+v*120;let S;if(i){const k=a?_.x:_.x+ht,A=a?y.x+ht:y.x,T=_.y+Dt/2,E=Math.abs(A-k)*.35,L=A>k?1:-1;S=`M${k},${T} C${k+L*E},${T} ${A-L*E},${T} ${A},${T}`}else{const k=_.x+ht/2,A=_.y+Dt,T=y.y,M=(T-A)*.4;S=`M${k},${A} C${k},${A+M} ${k},${T-M} ${k},${T}`}const $=i?Math.abs(u[v+1].x-u[v].x)+20:ji+Dt;b+=`
        <path class="arrow-path" d="${S}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Mo}"
              marker-end="url(#${h})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${w}ms" />`}if(s&&t.length>1){const v=u[0],_=u[t.length-1],y=t.length*150+(t.length-1)*120;let w,S;if(i){const $=_.x+ht/2,k=v.x+ht/2,A=_.y+Dt,T=v.y+Dt,M=Math.max(A,T)+kn;w=`M${$},${A} C${$},${M} ${k},${M} ${k},${T}`,S=Math.abs($-k)+kn*2}else{const $=_.x+ht,k=_.y+Dt/2,A=v.y+Dt/2,T=$+kn;w=`M${$},${k} C${T},${k} ${T},${A} ${$},${A}`,S=Math.abs(k-A)+kn*2}b+=`
        <path class="arrow-path" d="${w}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${Mo}"
              marker-end="url(#${h})"
              stroke-dasharray="${S}"
              stroke-dashoffset="${S}"
              style="transition-delay: ${y}ms" />`}const x=`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${d}"
           viewBox="0 0 ${l} ${d}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${b}
        ${m}
      </svg>`;this.render(x)}animateIn(t){t&&(this.root.querySelectorAll(".step-group").forEach(n=>{n.style.transition="none",n.style.opacity="1",n.style.transform="translateY(0)"}),this.root.querySelectorAll(".arrow-path").forEach(n=>{n.style.transition="none",n.style.strokeDashoffset="0"})),this.classList.add("lv-entered")}}class im extends HTMLElement{}customElements.define("lv-flow",rm),customElements.define("lv-flow-step",im);const sm=`
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
`;function To(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class am extends D{constructor(){super(...arguments);P(this,"_items",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(sm),this._readChildren(),this._renderTimeline()}_readChildren(){this._items=[],this.querySelectorAll("lv-timeline-item").forEach(n=>{this._items.push({date:n.getAttribute("date")||"",title:n.getAttribute("title")||"",color:n.getAttribute("color")||"var(--lv-accent, #6366f1)",body:n.innerHTML.trim()})})}_renderTimeline(){if(this._items.length===0)return;let t="";for(let n=0;n<this._items.length;n++){const i=this._items[n];t+=`
        <div class="tl-item" style="animation-delay: ${n*100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date?`<div class="tl-date">${To(i.date)}</div>`:""}
            ${i.title?`<div class="tl-title">${To(i.title)}</div>`:""}
            ${i.body?`<div class="tl-body">${i.body}</div>`:""}
          </div>
        </div>`}this.render(`<div class="timeline">${t}</div>`)}animateIn(t){t&&this.root.querySelectorAll(".tl-item").forEach(n=>{n.style.animation="none",n.style.opacity="1",n.style.transform="translateX(0)"}),this.classList.add("lv-entered")}}class om extends HTMLElement{}customElements.define("lv-timeline",am),customElements.define("lv-timeline-item",om);function Zt(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Lo(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $t={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},He={duration:.5,overwrite:!1,delay:0},Xi,ot,W,Pt=1e8,X=1/Pt,Yi=Math.PI*2,lm=Yi/4,cm=0,Po=Math.sqrt,dm=Math.cos,um=Math.sin,st=function(e){return typeof e=="string"},Q=function(e){return typeof e=="function"},Jt=function(e){return typeof e=="number"},Gi=function(e){return typeof e>"u"},jt=function(e){return typeof e=="object"},mt=function(e){return e!==!1},Wi=function(){return typeof window<"u"},Tr=function(e){return Q(e)||st(e)},zo=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ct=Array.isArray,hm=/random\([^)]+\)/g,fm=/,\s*/g,Io=/(?:-?\.?\d|\.)+/gi,qo=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,je=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ui=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Fo=/[+-]=-?[.\d]+/,pm=/[^,'"\[\]\s]+/gi,gm=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,U,Vt,Ki,Zi,At={},Lr={},No,Do=function(e){return(Lr=Xe(e,At))&&bt},Ji=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},$n=function(e,t){return!t&&console.warn(e)},Oo=function(e,t){return e&&(At[e]=t)&&Lr&&(Lr[e]=t)||At},An=function(){return 0},mm={suppressEvents:!0,isStart:!0,kill:!1},Pr={suppressEvents:!0,kill:!1},_m={suppressEvents:!0},Qi={},ie=[],ts={},Ro,St={},es={},Bo=30,zr=[],ns="",rs=function(e){var t=e[0],n,i;if(jt(t)||Q(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=zr.length;i--&&!zr[i].targetTest(t););n=zr[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new ml(e[i],n)))||e.splice(i,1);return e},ke=function(e){return e._gsap||rs(It(e))[0]._gsap},Ho=function(e,t,n){return(n=e[t])&&Q(n)?e[t]():Gi(n)&&e.getAttribute&&e.getAttribute(t)||n},_t=function(e,t){return(e=e.split(",")).forEach(t)||e},tt=function(e){return Math.round(e*1e5)/1e5||0},K=function(e){return Math.round(e*1e7)/1e7||0},Ve=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},vm=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Ir=function(){var e=ie.length,t=ie.slice(0),n,i;for(ts={},ie.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},is=function(e){return!!(e._initted||e._startAt||e.add)},jo=function(e,t,n,i){ie.length&&!ot&&Ir(),e.render(t,n,!!(ot&&t<0&&is(e))),ie.length&&!ot&&Ir()},Vo=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(pm).length<2?t:st(e)?e.trim():e},Xo=function(e){return e},Ct=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},bm=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Xe=function(e,t){for(var n in t)e[n]=t[n];return e},Yo=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=jt(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},qr=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Sn=function(e){var t=e.parent||U,n=e.keyframes?bm(ct(e.keyframes)):Ct;if(mt(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},xm=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Go=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Fr=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},se=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},$e=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},ym=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ss=function(e,t,n,i){return e._startAt&&(ot?e._startAt.revert(Pr):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},wm=function r(e){return!e||e._ts&&r(e.parent)},Wo=function(e){return e._repeat?Ye(e._tTime,e=e.duration()+e._rDelay)*e:0},Ye=function(e,t){var n=Math.floor(e=K(e/t));return e&&n===e?n-1:n},Nr=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Dr=function(e){return e._end=K(e._start+(e._tDur/Math.abs(e._ts||e._rts||X)||0))},Or=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=K(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Dr(e),n._dirty||$e(n,e)),e},Uo=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Nr(e.rawTime(),t),(!t._dur||Mn(0,t.totalDuration(),n)-t._tTime>X)&&t.render(n,!0)),$e(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-X}},Xt=function(e,t,n,i){return t.parent&&se(t),t._start=K((Jt(n)?n:n||e!==U?zt(e,n,t):e._time)+t._delay),t._end=K(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Go(e,t,"_first","_last",e._sort?"_start":0),as(t)||(e._recent=t),i||Uo(e,t),e._ts<0&&Or(e,e._tTime),e},Ko=function(e,t){return(At.ScrollTrigger||Ji("scrollTrigger",t))&&At.ScrollTrigger.create(t,e)},Zo=function(e,t,n,i,s){if(gs(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!ot&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Ro!==Et.frame)return ie.push(e),e._lazy=[s,i],1},km=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},as=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},$m=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&km(e)&&!(!e._initted&&as(e))||(e._ts<0||e._dp._ts<0)&&!as(e))?0:1,o=e._rDelay,c=0,l,d,u;if(o&&e._repeat&&(c=Mn(0,e._tDur,t),d=Ye(c,o),e._yoyo&&d&1&&(a=1-a),d!==Ye(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||ot||i||e._zTime===X||!t&&e._zTime){if(!e._initted&&Zo(e,t,i,n,c))return;for(u=e._zTime,e._zTime=t||(n?X:0),n||(n=t&&!u),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=c,l=e._pt;l;)l.r(a,l.d),l=l._next;t<0&&ss(e,t,n,!0),e._onUpdate&&!n&&Mt(e,"onUpdate"),c&&e._repeat&&!n&&e.parent&&Mt(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&se(e,1),!n&&!ot&&(Mt(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Am=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ge=function(e,t,n,i){var s=e._repeat,a=K(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:K(a*(s+1)+e._rDelay*s):a,o>0&&!i&&Or(e,e._tTime=e._tDur*o),e.parent&&Dr(e),n||$e(e.parent,e),e},Jo=function(e){return e instanceof ft?$e(e):Ge(e,e._dur)},Sm={_start:0,endTime:An,totalDuration:An},zt=function r(e,t,n){var i=e.labels,s=e._recent||Sm,a=e.duration()>=Pt?s.endTime(!1):e._dur,o,c,l;return st(t)&&(isNaN(t)||t in i)?(c=t.charAt(0),l=t.substr(-1)==="%",o=t.indexOf("="),c==="<"||c===">"?(o>=0&&(t=t.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(l?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(c=parseFloat(t.charAt(o-1)+t.substr(o+1)),l&&n&&(c=c/100*(ct(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+c:a+c)):t==null?a:+t},Cn=function(e,t,n){var i=Jt(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,c;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,c=n;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=mt(c.vars.inherit)&&c.parent;a.immediateRender=mt(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new rt(t[0],a,t[s+1])},ae=function(e,t){return e||e===0?t(e):t},Mn=function(e,t,n){return n<e?e:n>t?t:n},dt=function(e,t){return!st(e)||!(t=gm.exec(e))?"":t[1]},Cm=function(e,t,n){return ae(n,function(i){return Mn(e,t,i)})},os=[].slice,Qo=function(e,t){return e&&jt(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&jt(e[0]))&&!e.nodeType&&e!==Vt},Mm=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return st(i)&&!t||Qo(i,1)?(s=n).push.apply(s,It(i)):n.push(i)})||n},It=function(e,t,n){return W&&!t&&W.selector?W.selector(e):st(e)&&!n&&(Ki||!Ue())?os.call((t||Zi).querySelectorAll(e),0):ct(e)?Mm(e,n):Qo(e)?os.call(e,0):e?[e]:[]},ls=function(e){return e=It(e)[0]||$n("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return It(t,n.querySelectorAll?n:n===e?$n("Invalid scope")||Zi.createElement("div"):e)}},tl=function(e){return e.sort(function(){return .5-Math.random()})},el=function(e){if(Q(e))return e;var t=jt(e)?e:{each:e},n=Ae(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=t.axis,d=i,u=i;return st(i)?d=u={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(d=i[0],u=i[1]),function(h,f,g){var p=(g||t).length,m=a[p],b,x,v,_,y,w,S,$,k;if(!m){if(k=t.grid==="auto"?0:(t.grid||[1,Pt])[1],!k){for(S=-Pt;S<(S=g[k++].getBoundingClientRect().left)&&k<p;);k<p&&k--}for(m=a[p]=[],b=c?Math.min(k,p)*d-.5:i%k,x=k===Pt?0:c?p*u/k-.5:i/k|0,S=0,$=Pt,w=0;w<p;w++)v=w%k-b,_=x-(w/k|0),m[w]=y=l?Math.abs(l==="y"?_:v):Po(v*v+_*_),y>S&&(S=y),y<$&&($=y);i==="random"&&tl(m),m.max=S-$,m.min=$,m.v=p=(parseFloat(t.amount)||parseFloat(t.each)*(k>p?p-1:l?l==="y"?p/k:k:Math.max(k,p/k))||0)*(i==="edges"?-1:1),m.b=p<0?s-p:s,m.u=dt(t.amount||t.each)||0,n=n&&p<0?fl(n):n}return p=(m[h]-m.min)/m.max||0,K(m.b+(n?n(p):p)*m.v)+m.u}},cs=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=K(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Jt(n)?0:dt(n))}},nl=function(e,t){var n=ct(e),i,s;return!n&&jt(e)&&(i=n=e.radius||Pt,e.values?(e=It(e.values),(s=!Jt(e[0]))&&(i*=i)):e=cs(e.increment)),ae(t,n?Q(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=Pt,d=0,u=e.length,h,f;u--;)s?(h=e[u].x-o,f=e[u].y-c,h=h*h+f*f):h=Math.abs(e[u]-o),h<l&&(l=h,d=u);return d=!i||l<=i?e[d]:a,s||d===a||Jt(a)?d:d+dt(a)}:cs(e))},rl=function(e,t,n,i){return ae(ct(e)?!t:n===!0?!!(n=0):!i,function(){return ct(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},Em=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},Tm=function(e,t){return function(n){return e(parseFloat(n))+(t||dt(n))}},Lm=function(e,t,n){return sl(e,t,0,1,n)},il=function(e,t,n){return ae(n,function(i){return e[~~t(i)]})},Pm=function r(e,t,n){var i=t-e;return ct(e)?il(e,r(0,e.length),t):ae(n,function(s){return(i+(s-e)%i)%i+e})},zm=function r(e,t,n){var i=t-e,s=i*2;return ct(e)?il(e,r(0,e.length-1),t):ae(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},En=function(e){return e.replace(hm,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(fm);return rl(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},sl=function(e,t,n,i,s){var a=t-e,o=i-n;return ae(s,function(c){return n+((c-e)/a*o||0)})},Im=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var a=st(e),o={},c,l,d,u,h;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(ct(e)&&!ct(t)){for(d=[],u=e.length,h=u-2,l=1;l<u;l++)d.push(r(e[l-1],e[l]));u--,s=function(g){g*=u;var p=Math.min(h,~~g);return d[p](g-p)},n=t}else i||(e=Xe(ct(e)?[]:{},e));if(!d){for(c in t)fs.call(o,e,c,"get",t[c]);s=function(g){return vs(g,o)||(a?e.p:e)}}}return ae(n,s)},al=function(e,t,n){var i=e.labels,s=Pt,a,o,c;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},Mt=function(e,t,n){var i=e.vars,s=i[t],a=W,o=e._ctx,c,l,d;if(s)return c=i[t+"Params"],l=i.callbackScope||e,n&&ie.length&&Ir(),o&&(W=o),d=c?s.apply(l,c):s.call(l),W=a,d},Tn=function(e){return se(e),e.scrollTrigger&&e.scrollTrigger.kill(!!ot),e.progress()<1&&Mt(e,"onInterrupt"),e},We,ol=[],ll=function(e){if(e)if(e=!e.name&&e.default||e,Wi()||e.headless){var t=e.name,n=Q(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:An,render:vs,add:fs,kill:Km,modifier:Um,rawVars:0},a={targetTest:0,get:0,getSetter:_s,aliases:{},register:0};if(Ue(),e!==i){if(St[t])return;Ct(i,Ct(qr(e,s),a)),Xe(i.prototype,Xe(s,qr(e,a))),St[i.prop=t]=i,e.targetTest&&(zr.push(i),Qi[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Oo(t,i),e.register&&e.register(bt,i,vt)}else ol.push(e)},Y=255,Ln={aqua:[0,Y,Y],lime:[0,Y,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y],navy:[0,0,128],white:[Y,Y,Y],olive:[128,128,0],yellow:[Y,Y,0],orange:[Y,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y,0,0],pink:[Y,192,203],cyan:[0,Y,Y],transparent:[Y,Y,Y,0]},ds=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Y+.5|0},cl=function(e,t,n){var i=e?Jt(e)?[e>>16,e>>8&Y,e&Y]:0:Ln.black,s,a,o,c,l,d,u,h,f,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ln[e])i=Ln[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Y,i&Y,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Y,e&Y]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Io),!t)c=+i[0]%360/360,l=+i[1]/100,d=+i[2]/100,a=d<=.5?d*(l+1):d+l-d*l,s=d*2-a,i.length>3&&(i[3]*=1),i[0]=ds(c+1/3,s,a),i[1]=ds(c,s,a),i[2]=ds(c-1/3,s,a);else if(~e.indexOf("="))return i=e.match(qo),n&&i.length<4&&(i[3]=1),i}else i=e.match(Io)||Ln.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Y,a=i[1]/Y,o=i[2]/Y,u=Math.max(s,a,o),h=Math.min(s,a,o),d=(u+h)/2,u===h?c=l=0:(f=u-h,l=d>.5?f/(2-u-h):f/(u+h),c=u===s?(a-o)/f+(a<o?6:0):u===a?(o-s)/f+2:(s-a)/f+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(d*100+.5)),n&&i.length<4&&(i[3]=1),i},dl=function(e){var t=[],n=[],i=-1;return e.split(oe).forEach(function(s){var a=s.match(je)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},ul=function(e,t,n){var i="",s=(e+i).match(oe),a=t?"hsla(":"rgba(",o=0,c,l,d,u;if(!s)return e;if(s=s.map(function(h){return(h=cl(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(d=dl(e),c=n.c,c.join(i)!==d.c.join(i)))for(l=e.replace(oe,"1").split(je),u=l.length-1;o<u;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(d.length?d:s.length?s:n).shift());if(!l)for(l=e.split(oe),u=l.length-1;o<u;o++)i+=l[o]+s[o];return i+l[u]},oe=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ln)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),qm=/hsl[a]?\(/,hl=function(e){var t=e.join(" "),n;if(oe.lastIndex=0,oe.test(t))return n=qm.test(t),e[1]=ul(e[1],n),e[0]=ul(e[0],n,dl(e[1])),!0},Pn,Et=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],c,l,d,u,h,f,g=function p(m){var b=r()-i,x=m===!0,v,_,y,w;if((b>e||b<0)&&(n+=b-t),i+=b,y=i-n,v=y-a,(v>0||x)&&(w=++u.frame,h=y-u.time*1e3,u.time=y=y/1e3,a+=v+(v>=s?4:s-v),_=1),x||(c=l(p)),_)for(f=0;f<o.length;f++)o[f](y,h,w,m)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){No&&(!Ki&&Wi()&&(Vt=Ki=window,Zi=Vt.document||{},At.gsap=bt,(Vt.gsapVersions||(Vt.gsapVersions=[])).push(bt.version),Do(Lr||Vt.GreenSockGlobals||!Vt.gsap&&Vt||{}),ol.forEach(ll)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&u.sleep(),l=d||function(m){return setTimeout(m,a-u.time*1e3+1|0)},Pn=1,g(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(c),Pn=0,l=An},lagSmoothing:function(m,b){e=m||1/0,t=Math.min(b||33,e)},fps:function(m){s=1e3/(m||240),a=u.time*1e3+s},add:function(m,b,x){var v=b?function(_,y,w,S){m(_,y,w,S),u.remove(v)}:m;return u.remove(m),o[x?"unshift":"push"](v),Ue(),v},remove:function(m,b){~(b=o.indexOf(m))&&o.splice(b,1)&&f>=b&&f--},_listeners:o},u})(),Ue=function(){return!Pn&&Et.wake()},H={},Fm=/^[\d.\-M][\d.\-,\s]/,Nm=/["']/g,Dm=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,c,l;s<a;s++)c=n[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),t[i]=isNaN(l)?l.replace(Nm,"").trim():+l,i=c.substr(o+1).trim();return t},Om=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},Rm=function(e){var t=(e+"").split("("),n=H[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Dm(t[1])]:Om(e).split(",").map(Vo)):H._CE&&Fm.test(e)?H._CE("",e):n},fl=function(e){return function(t){return 1-e(1-t)}},pl=function r(e,t){for(var n=e._first,i;n;)n instanceof ft?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Ae=function(e,t){return e&&(Q(e)?e:H[e]||Rm(e))||t},Se=function(e,t,n,i){n===void 0&&(n=function(c){return 1-t(1-c)}),i===void 0&&(i=function(c){return c<.5?t(c*2)/2:1-t((1-c)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return _t(e,function(o){H[o]=At[o]=s,H[a=o.toLowerCase()]=n;for(var c in s)H[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=H[o+"."+c]=s[c]}),s},gl=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},us=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Yi*(Math.asin(1/i)||0),o=function(d){return d===1?1:i*Math.pow(2,-10*d)*um((d-a)*s)+1},c=e==="out"?o:e==="in"?function(l){return 1-o(1-l)}:gl(o);return s=Yi/s,c.config=function(l,d){return r(e,l,d)},c},hs=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:gl(n);return i.config=function(s){return r(e,s)},i};_t("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Se(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})}),H.Linear.easeNone=H.none=H.Linear.easeIn,Se("Elastic",us("in"),us("out"),us()),(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};Se("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75),Se("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)}),Se("Circ",function(r){return-(Po(1-r*r)-1)}),Se("Sine",function(r){return r===1?1:-dm(r*lm)+1}),Se("Back",hs("in"),hs("out"),hs()),H.SteppedEase=H.steps=At.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-X;return function(o){return((i*Mn(0,a,o)|0)+s)*n}}},He.ease=H["quad.out"],_t("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ns+=r+","+r+"Params,"});var ml=function(e,t){this.id=cm++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ho,this.set=t?t.getSetter:_s},zn=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ge(this,+t.duration,1,1),this.data=t.data,W&&(this._ctx=W,W.data.push(this)),Pn||Et.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ge(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ue(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Or(this,n),!s._dp||s.parent||Uo(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Xt(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===X||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),jo(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Wo(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Wo(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ye(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-X?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Nr(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-X?0:this._rts,this.totalTime(Mn(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Dr(this),ym(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ue(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==X&&(this._tTime-=X)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=K(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Xt(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(mt(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Nr(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=_m);var i=ot;return ot=n,is(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),ot=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Jo(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Jo(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(zt(this,n),mt(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,mt(i)),this._dur||(this._zTime=-X),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-X:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-X,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-X)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Q(n)?n:Xo,c=function(){var d=i.then;i.then=null,s&&s(),Q(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=d),a(o),i.then=d};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},e.kill=function(){Tn(this)},r})();Ct(zn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X,_prom:0,_ps:!1,_rts:1});var ft=(function(r){Lo(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=mt(n.sortChildren),U&&Xt(n.parent||U,Zt(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ko(Zt(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Cn(0,arguments,this),this},t.from=function(i,s,a){return Cn(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Cn(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,Sn(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new rt(i,s,zt(this,a),1),this},t.call=function(i,s,a){return Xt(this,rt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,c,l,d){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=d,a.parent=this,new rt(i,a,zt(this,c)),this},t.staggerFrom=function(i,s,a,o,c,l,d){return a.runBackwards=1,Sn(a).immediateRender=mt(a.immediateRender),this.staggerTo(i,s,a,o,c,l,d)},t.staggerFromTo=function(i,s,a,o,c,l,d,u){return o.startAt=a,Sn(o).immediateRender=mt(o.immediateRender),this.staggerTo(i,s,o,c,l,d,u)},t.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,d=i<=0?0:K(i),u=this._zTime<0!=i<0&&(this._initted||!l),h,f,g,p,m,b,x,v,_,y,w,S;if(this!==U&&d>c&&i>=0&&(d=c),d!==this._tTime||a||u){if(o!==this._time&&l&&(d+=this._time-o,i+=this._time-o),h=d,_=this._start,v=this._ts,b=!v,u&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,m=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(h=K(d%m),d===c?(p=this._repeat,h=l):(y=K(d/m),p=~~y,p&&p===y&&(h=l,p--),h>l&&(h=l)),y=Ye(this._tTime,m),!o&&this._tTime&&y!==p&&this._tTime-y*m-this._dur<=0&&(y=p),w&&p&1&&(h=l-h,S=1),p!==y&&!this._lock){var $=w&&y&1,k=$===(w&&p&1);if(p<y&&($=!$),o=$?0:d%l?l:d,this._lock=1,this.render(o||(S?0:K(p*m)),s,!l)._lock=0,this._tTime=d,!s&&this.parent&&Mt(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,y=p),o&&o!==this._time||b!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,k&&(this._lock=2,o=$?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!b)return this;pl(this,S)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=Am(this,K(o),K(h)),x&&(d-=h-(h=x._start))),this._tTime=d,this._time=h,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&d&&l&&!s&&!y&&(Mt(this,"onStart"),this._tTime!==d))return this;if(h>=o&&i>=0)for(f=this._first;f;){if(g=f._next,(f._act||h>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,a),h!==this._time||!this._ts&&!b){x=0,g&&(d+=this._zTime=-X);break}}f=g}else{f=this._last;for(var A=i<0?i:h;f;){if(g=f._prev,(f._act||A<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(A-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(A-f._start)*f._ts,s,a||ot&&is(f)),h!==this._time||!this._ts&&!b){x=0,g&&(d+=this._zTime=A?-X:X);break}}f=g}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-X)._zTime=h>=o?1:-1,this._ts))return this._start=_,Dr(this),this.render(i,s,a);this._onUpdate&&!s&&Mt(this,"onUpdate",!0),(d===c&&this._tTime>=this.totalDuration()||!d&&o)&&(_===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(d===c&&this._ts>0||!d&&this._ts<0)&&se(this,1),!s&&!(i<0&&!o)&&(d||o||!c)&&(Mt(this,d===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(d<c&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Jt(s)||(s=zt(this,s,i)),!(i instanceof zn)){if(ct(i))return i.forEach(function(o){return a.add(o,s)}),this;if(st(i))return this.addLabel(i,s);if(Q(i))i=rt.delayedCall(0,i);else return this}return this!==i?Xt(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Pt);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof rt?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return st(i)?this.removeLabel(i):Q(i)?this.killTweensOf(i):(i.parent===this&&Fr(this,i),i===this._recent&&(this._recent=this._last),$e(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=K(Et.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=zt(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=rt.delayedCall(0,s||An,a);return o.data="isPause",this._hasPause=1,Xt(this,o,zt(this,i))},t.removePause=function(i){var s=this._first;for(i=zt(this,i);s;)s._start===i&&s.data==="isPause"&&se(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)le!==o[c]&&o[c].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=It(i),c=this._first,l=Jt(s),d;c;)c instanceof rt?vm(c._targets,o)&&(l?(!le||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(d=c.getTweensOf(o,s)).length&&a.push.apply(a,d),c=c._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=zt(a,i),c=s,l=c.startAt,d=c.onStart,u=c.onStartParams,h=c.immediateRender,f,g=rt.to(a,Ct({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||X,onStart:function(){if(a.pause(),!f){var m=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());g._dur!==m&&Ge(g,m,0,1).render(g._time,!0,!0),f=1}d&&d.apply(g,u||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Ct({startAt:{time:zt(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),al(this,zt(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),al(this,zt(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+X)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=K(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return $e(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),$e(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,c=Pt,l,d,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),d=o._start,d>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Xt(a,o,d-o._delay,1)._lock=0):c=d,d<0&&o._ts&&(s-=d,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=K(d/a._ts),a._time-=d,a._tTime-=d),a.shiftChildren(-d,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;Ge(a,a===U&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(U._ts&&(jo(U,Nr(i,U)),Ro=Et.frame),Et.frame>=Bo){Bo+=$t.autoSleep||120;var s=U._first;if((!s||!s._ts)&&$t.autoSleep&&Et._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Et.sleep()}}},e})(zn);Ct(ft.prototype,{_lock:0,_hasPause:0,_forcing:0});var Bm=function(e,t,n,i,s,a,o){var c=new vt(this._pt,e,t,0,1,wl,null,s),l=0,d=0,u,h,f,g,p,m,b,x;for(c.b=n,c.e=i,n+="",i+="",(b=~i.indexOf("random("))&&(i=En(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),h=n.match(Ui)||[];u=Ui.exec(i);)g=u[0],p=i.substring(l,u.index),f?f=(f+1)%5:p.substr(-5)==="rgba("&&(f=1),g!==h[d++]&&(m=parseFloat(h[d-1])||0,c._pt={_next:c._pt,p:p||d===1?p:",",s:m,c:g.charAt(1)==="="?Ve(m,g)-m:parseFloat(g)-m,m:f&&f<4?Math.round:0},l=Ui.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(Fo.test(i)||b)&&(c.e=0),this._pt=c,c},fs=function(e,t,n,i,s,a,o,c,l,d){Q(i)&&(i=i(s||0,e,a));var u=e[t],h=n!=="get"?n:Q(u)?l?e[t.indexOf("set")||!Q(e["get"+t.substr(3)])?t:"get"+t.substr(3)](l):e[t]():u,f=Q(u)?l?Ym:xl:ms,g;if(st(i)&&(~i.indexOf("random(")&&(i=En(i)),i.charAt(1)==="="&&(g=Ve(h,i)+(dt(h)||0),(g||g===0)&&(i=g))),!d||h!==i||ps)return!isNaN(h*i)&&i!==""?(g=new vt(this._pt,e,t,+h||0,i-(h||0),typeof u=="boolean"?Wm:yl,0,f),l&&(g.fp=l),o&&g.modifier(o,this,e),this._pt=g):(!u&&!(t in e)&&Ji(t,i),Bm.call(this,e,t,h,i,f,c||$t.stringFilter,l))},Hm=function(e,t,n,i,s){if(Q(e)&&(e=In(e,s,t,n,i)),!jt(e)||e.style&&e.nodeType||ct(e)||zo(e))return st(e)?In(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=In(e[o],s,t,n,i);return a},_l=function(e,t,n,i,s,a){var o,c,l,d;if(St[e]&&(o=new St[e]).init(s,o.rawVars?t[e]:Hm(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=c=new vt(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==We))for(l=n._ptLookup[n._targets.indexOf(s)],d=o._props.length;d--;)l[o._props[d]]=c;return o},le,ps,gs=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,d=i.runBackwards,u=i.yoyoEase,h=i.keyframes,f=i.autoRevert,g=e._dur,p=e._startAt,m=e._targets,b=e.parent,x=b&&b.data==="nested"?b.vars.targets:m,v=e._overwrite==="auto"&&!Xi,_=e.timeline,y,w,S,$,k,A,T,M,E,L,C,z,I;if(_&&(!h||!s)&&(s="none"),e._ease=Ae(s,He.ease),e._yEase=u?fl(Ae(u===!0?s:u,He.ease)):0,u&&e._yoyo&&!e._repeat&&(u=e._yEase,e._yEase=e._ease,e._ease=u),e._from=!_&&!!i.runBackwards,!_||h&&!i.stagger){if(M=m[0]?ke(m[0]).harness:0,z=M&&i[M.prop],y=qr(i,Qi),p&&(p._zTime<0&&p.progress(1),t<0&&d&&o&&!f?p.render(-1,!0):p.revert(d&&g?Pr:mm),p._lazy=0),a){if(se(e._startAt=rt.set(m,Ct({data:"isStart",overwrite:!1,parent:b,immediateRender:!0,lazy:!p&&mt(c),startAt:null,delay:0,onUpdate:l&&function(){return Mt(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ot||!o&&!f)&&e._startAt.revert(Pr),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(d&&g&&!p){if(t&&(o=!1),S=Ct({overwrite:!1,data:"isFromStart",lazy:o&&!p&&mt(c),immediateRender:o,stagger:0,parent:b},y),z&&(S[M.prop]=z),se(e._startAt=rt.set(m,S)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ot?e._startAt.revert(Pr):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,X,X);else if(!t)return}for(e._pt=e._ptCache=0,c=g&&mt(c)||c&&!g,w=0;w<m.length;w++){if(k=m[w],T=k._gsap||rs(m)[w]._gsap,e._ptLookup[w]=L={},ts[T.id]&&ie.length&&Ir(),C=x===m?w:x.indexOf(k),M&&(E=new M).init(k,z||y,e,C,x)!==!1&&(e._pt=$=new vt(e._pt,k,E.name,0,1,E.render,E,0,E.priority),E._props.forEach(function(F){L[F]=$}),E.priority&&(A=1)),!M||z)for(S in y)St[S]&&(E=_l(S,y,e,C,k,x))?E.priority&&(A=1):L[S]=$=fs.call(e,k,S,"get",y[S],C,x,0,i.stringFilter);e._op&&e._op[w]&&e.kill(k,e._op[w]),v&&e._pt&&(le=e,U.killTweensOf(k,L,e.globalTime(t)),I=!e.parent,le=0),e._pt&&c&&(ts[T.id]=1)}A&&kl(e),e._onInit&&e._onInit(e)}e._onUpdate=l,e._initted=(!e._op||e._pt)&&!I,h&&t<=0&&_.render(Pt,!0,!0)},jm=function(e,t,n,i,s,a,o,c){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],d,u,h,f;if(!l)for(l=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(d=h[f][t],d&&d.d&&d.d._pt)for(d=d.d._pt;d&&d.p!==t&&d.fp!==t;)d=d._next;if(!d)return ps=1,e.vars[t]="+=0",gs(e,o),ps=0,c?$n(t+" not eligible for reset"):1;l.push(d)}for(f=l.length;f--;)u=l[f],d=u._pt||u,d.s=(i||i===0)&&!s?i:d.s+(i||0)+a*d.c,d.c=n-d.s,u.e&&(u.e=tt(n)+dt(u.e)),u.b&&(u.b=d.s+dt(u.b))},Vm=function(e,t){var n=e[0]?ke(e[0]).harness:0,i=n&&n.aliases,s,a,o,c;if(!i)return t;s=Xe({},t);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},Xm=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(ct(t))o=n[e]||(n[e]=[]),t.forEach(function(c,l){return o.push({t:l/(t.length-1)*100,v:c,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},In=function(e,t,n,i,s){return Q(e)?e.call(t,n,i,s):st(e)&&~e.indexOf("random(")?En(e):e},vl=ns+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",bl={};_t(vl+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return bl[r]=1});var rt=(function(r){Lo(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Sn(i))||this;var c=o.vars,l=c.duration,d=c.delay,u=c.immediateRender,h=c.stagger,f=c.overwrite,g=c.keyframes,p=c.defaults,m=c.scrollTrigger,b=c.yoyoEase,x=i.parent||U,v=(ct(n)||zo(n)?Jt(n[0]):"length"in i)?[n]:It(n),_,y,w,S,$,k,A,T;if(o._targets=v.length?rs(v):$n("GSAP target "+n+" not found. https://gsap.com",!$t.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,g||h||Tr(l)||Tr(d)){if(i=o.vars,_=o.timeline=new ft({data:"nested",defaults:p||{},targets:x&&x.data==="nested"?x.vars.targets:v}),_.kill(),_.parent=_._dp=Zt(o),_._start=0,h||Tr(l)||Tr(d)){if(S=v.length,A=h&&el(h),jt(h))for($ in h)~vl.indexOf($)&&(T||(T={}),T[$]=h[$]);for(y=0;y<S;y++)w=qr(i,bl),w.stagger=0,b&&(w.yoyoEase=b),T&&Xe(w,T),k=v[y],w.duration=+In(l,Zt(o),y,k,v),w.delay=(+In(d,Zt(o),y,k,v)||0)-o._delay,!h&&S===1&&w.delay&&(o._delay=d=w.delay,o._start+=d,w.delay=0),_.to(k,w,A?A(y,k,v):0),_._ease=H.none;_.duration()?l=d=0:o.timeline=0}else if(g){Sn(Ct(_.vars.defaults,{ease:"none"})),_._ease=Ae(g.ease||i.ease||"none");var M=0,E,L,C;if(ct(g))g.forEach(function(z){return _.to(v,z,">")}),_.duration();else{w={};for($ in g)$==="ease"||$==="easeEach"||Xm($,g[$],w,g.easeEach);for($ in w)for(E=w[$].sort(function(z,I){return z.t-I.t}),M=0,y=0;y<E.length;y++)L=E[y],C={ease:L.e,duration:(L.t-(y?E[y-1].t:0))/100*l},C[$]=L.v,_.to(v,C,M),M+=C.duration;_.duration()<l&&_.to({},{duration:l-_.duration()})}}l||o.duration(l=_.duration())}else o.timeline=0;return f===!0&&!Xi&&(le=Zt(o),U.killTweensOf(v),le=0),Xt(x,Zt(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!l&&!g&&o._start===K(x._time)&&mt(u)&&wm(Zt(o))&&x.data!=="nested")&&(o._tTime=-X,o.render(Math.max(0,-d)||0)),m&&Ko(Zt(o),m),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,d=i<0,u=i>c-X&&!d?c:i<X?0:i,h,f,g,p,m,b,x,v,_;if(!l)$m(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==d||this._lazy){if(h=u,v=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&d)return this.totalTime(p*100+i,s,a);if(h=K(u%p),u===c?(g=this._repeat,h=l):(m=K(u/p),g=~~m,g&&g===m?(h=l,g--):h>l&&(h=l)),b=this._yoyo&&g&1,b&&(_=this._yEase,h=l-h),m=Ye(this._tTime,p),h===o&&!a&&this._initted&&g===m)return this._tTime=u,this;g!==m&&(v&&this._yEase&&pl(v,b),this.vars.repeatRefresh&&!b&&!this._lock&&h!==p&&this._initted&&(this._lock=a=1,this.render(K(p*g),!0).invalidate()._lock=0))}if(!this._initted){if(Zo(this,d?i:h,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=u,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(_||this._ease)(h/l),this._from&&(this.ratio=x=1-x),!o&&u&&!s&&!m&&(Mt(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;v&&v.render(i<0?i:v._dur*v._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(d&&ss(this,i,s,a),Mt(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Mt(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(d&&!this._onUpdate&&ss(this,i,!0,!0),(i||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&se(this,1),!s&&!(d&&!o)&&(u||o||b)&&(Mt(this,u===c?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,c){Pn||Et.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),d;return this._initted||gs(this,l),d=this._ease(l/this._dur),jm(this,i,s,a,o,d,l,c)?this.resetTo(i,s,a,o,1):(Or(this,0),this.parent||Go(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Tn(this):this.scrollTrigger&&this.scrollTrigger.kill(!!ot),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,le&&le.vars.overwrite!==!0)._first||Tn(this),this.parent&&a!==this.timeline.totalDuration()&&Ge(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?It(i):o,l=this._ptLookup,d=this._pt,u,h,f,g,p,m,b;if((!s||s==="all")&&xm(o,c))return s==="all"&&(this._pt=0),Tn(this);for(u=this._op=this._op||[],s!=="all"&&(st(s)&&(p={},_t(s,function(x){return p[x]=1}),s=p),s=Vm(o,s)),b=o.length;b--;)if(~c.indexOf(o[b])){h=l[b],s==="all"?(u[b]=s,g=h,f={}):(f=u[b]=u[b]||{},g=s);for(p in g)m=h&&h[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&Fr(this,m,"_pt"),delete h[p]),f!=="all"&&(f[p]=1)}return this._initted&&!this._pt&&d&&Tn(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Cn(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Cn(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return U.killTweensOf(i,s,a)},e})(zn);Ct(rt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),_t("staggerTo,staggerFrom,staggerFromTo",function(r){rt[r]=function(){var e=new ft,t=os.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var ms=function(e,t,n){return e[t]=n},xl=function(e,t,n){return e[t](n)},Ym=function(e,t,n,i){return e[t](i.fp,n)},Gm=function(e,t,n){return e.setAttribute(t,n)},_s=function(e,t){return Q(e[t])?xl:Gi(e[t])&&e.setAttribute?Gm:ms},yl=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Wm=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},wl=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},vs=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Um=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},Km=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Fr(this,t,"_pt"):t.dep||(n=1),t=i;return!n},Zm=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},kl=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},vt=(function(){function r(t,n,i,s,a,o,c,l,d){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||yl,this.d=c||this,this.set=l||ms,this.pr=d||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Zm,this.m=n,this.mt=s,this.tween=i},r})();_t(ns+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Qi[r]=1}),At.TweenMax=At.TweenLite=rt,At.TimelineLite=At.TimelineMax=ft,U=new ft({sortChildren:!1,defaults:He,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),$t.stringFilter=hl;var Ce=[],Rr={},Jm=[],$l=0,Qm=0,bs=function(e){return(Rr[e]||Jm).map(function(t){return t()})},xs=function(){var e=Date.now(),t=[];e-$l>2&&(bs("matchMediaInit"),Ce.forEach(function(n){var i=n.queries,s=n.conditions,a,o,c,l;for(o in i)a=Vt.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(n.revert(),c&&t.push(n))}),bs("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),$l=e,bs("matchMedia"))},Al=(function(){function r(t,n){this.selector=n&&ls(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Qm++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Q(n)&&(s=i,i=n,n=Q);var a=this,o=function(){var l=W,d=a.selector,u;return l&&l!==a&&l.data.push(a),s&&(a.selector=ls(s)),W=a,u=i.apply(a,arguments),Q(u)&&a._r.push(u),W=l,a.selector=d,a.isReverted=!1,u};return a.last=o,n===Q?o(a,function(c){return a.add(null,c)}):n?a[n]=o:o},e.ignore=function(n){var i=W;W=null,n(this),W=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof rt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(d){return o.splice(o.indexOf(d),1)}));for(o.map(function(d){return{g:d._dur||d._delay||d._sat&&!d._sat.vars.immediateRender?d.globalTime(0):-1/0,t:d}}).sort(function(d,u){return u.g-d.g||-1/0}).forEach(function(d){return d.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof ft?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof rt)&&l.revert&&l.revert(n);s._r.forEach(function(d){return d(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Ce.length;a--;)Ce[a].id===this.id&&Ce.splice(a,1)},e.revert=function(n){this.kill(n||{})},r})(),t_=(function(){function r(t){this.contexts=[],this.scope=t,W&&W.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){jt(n)||(n={matches:n});var a=new Al(0,s||this.scope),o=a.conditions={},c,l,d;W&&!a.selector&&(a.selector=W.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(l in n)l==="all"?d=1:(c=Vt.matchMedia(n[l]),c&&(Ce.indexOf(a)<0&&Ce.push(a),(o[l]=c.matches)&&(d=1),c.addListener?c.addListener(xs):c.addEventListener("change",xs)));return d&&i(a,function(u){return a.add(null,u)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Br={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return ll(i)})},timeline:function(e){return new ft(e)},getTweensOf:function(e,t){return U.getTweensOf(e,t)},getProperty:function(e,t,n,i){st(e)&&(e=It(e)[0]);var s=ke(e||{}).get,a=n?Xo:Vo;return n==="native"&&(n=""),e&&(t?a((St[t]&&St[t].get||s)(e,t,n,i)):function(o,c,l){return a((St[o]&&St[o].get||s)(e,o,c,l))})},quickSetter:function(e,t,n){if(e=It(e),e.length>1){var i=e.map(function(d){return bt.quickSetter(d,t,n)}),s=i.length;return function(d){for(var u=s;u--;)i[u](d)}}e=e[0]||{};var a=St[t],o=ke(e),c=o.harness&&(o.harness.aliases||{})[t]||t,l=a?function(d){var u=new a;We._pt=0,u.init(e,n?d+n:d,We,0,[e]),u.render(1,u),We._pt&&vs(1,We)}:o.set(e,c);return a?l:function(d){return l(e,c,n?d+n:d,o,1)}},quickTo:function(e,t,n){var i,s=bt.to(e,Ct((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(c,l,d){return s.resetTo(t,c,l,d)};return a.tween=s,a},isTweening:function(e){return U.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ae(e.ease,He.ease)),Yo(He,e||{})},config:function(e){return Yo($t,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!St[o]&&!At[o]&&$n(t+" effect requires "+o+" plugin.")}),es[t]=function(o,c,l){return n(It(o),Ct(c||{},s),l)},a&&(ft.prototype[t]=function(o,c,l){return this.add(es[t](o,jt(c)?c:(l=c)&&{},this),l)})},registerEase:function(e,t){H[e]=Ae(t)},parseEase:function(e,t){return arguments.length?Ae(e,t):H},getById:function(e){return U.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ft(e),i,s;for(n.smoothChildTiming=mt(e.smoothChildTiming),U.remove(n),n._dp=0,n._time=n._tTime=U._time,i=U._first;i;)s=i._next,(t||!(!i._dur&&i instanceof rt&&i.vars.onComplete===i._targets[0]))&&Xt(n,i,i._start-i._delay),i=s;return Xt(U,n,0),n},context:function(e,t){return e?new Al(e,t):W},matchMedia:function(e){return new t_(e)},matchMediaRefresh:function(){return Ce.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||xs()},addEventListener:function(e,t){var n=Rr[e]||(Rr[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Rr[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:Pm,wrapYoyo:zm,distribute:el,random:rl,snap:nl,normalize:Lm,getUnit:dt,clamp:Cm,splitColor:cl,toArray:It,selector:ls,mapRange:sl,pipe:Em,unitize:Tm,interpolate:Im,shuffle:tl},install:Do,effects:es,ticker:Et,updateRoot:ft.updateRoot,plugins:St,globalTimeline:U,core:{PropTween:vt,globals:Oo,Tween:rt,Timeline:ft,Animation:zn,getCache:ke,_removeLinkedListItem:Fr,reverting:function(){return ot},context:function(e){return e&&W&&(W.data.push(e),e._ctx=W),W},suppressOverwrites:function(e){return Xi=e}}};_t("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Br[r]=rt[r]}),Et.add(ft.updateRoot),We=Br.to({},{duration:0});var e_=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},n_=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=e_(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},ys=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(st(s)&&(c={},_t(s,function(d){return c[d]=1}),s=c),t){c={};for(l in s)c[l]=t(s[l]);s=c}n_(o,s)}}}},bt=Br.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,c;this.tween=n;for(a in t)c=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(c||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)ot?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},ys("roundProps",cs),ys("modifiers"),ys("snap",nl))||Br;rt.version=ft.version=bt.version="3.14.2",No=1,Wi()&&Ue(),H.Power0,H.Power1,H.Power2,H.Power3,H.Power4,H.Linear,H.Quad,H.Cubic,H.Quart,H.Quint,H.Strong,H.Elastic,H.Back,H.SteppedEase,H.Bounce,H.Sine,H.Expo,H.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Sl,ce,Ke,ws,Me,Cl,ks,r_=function(){return typeof window<"u"},Qt={},Ee=180/Math.PI,Ze=Math.PI/180,Je=Math.atan2,Ml=1e8,$s=/([A-Z])/g,i_=/(left|right|width|margin|padding|x)/i,s_=/[\s,\(]\S/,Yt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},As=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},a_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},o_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},l_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},c_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},El=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Tl=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},d_=function(e,t,n){return e.style[t]=n},u_=function(e,t,n){return e.style.setProperty(t,n)},h_=function(e,t,n){return e._gsap[t]=n},f_=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},p_=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},g_=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Z="transform",xt=Z+"Origin",m_=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Qt&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Yt[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=te(i,o)}):this.tfm[e]=a.x?a[e]:te(i,e),e===xt&&(this.tfm.zOrigin=a.zOrigin);else return Yt.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Z)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(xt,t,"")),e=Z}(s||t)&&this.props.push(e,t,s[e])},Ll=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},__=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace($s,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=ks(),(!s||!s.isStart)&&!n[Z]&&(Ll(n),i.zOrigin&&n[xt]&&(n[xt]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Pl=function(e,t){var n={target:e,props:[],revert:__,save:m_};return e._gsap||bt.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},zl,Ss=function(e,t){var n=ce.createElementNS?ce.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ce.createElement(e);return n&&n.style?n:ce.createElement(e)},Tt=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace($s,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Qe(t)||t,1)||""},Il="O,Moz,ms,Ms,Webkit".split(","),Qe=function(e,t,n){var i=t||Me,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Il[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Il[a]:"")+e},Cs=function(){r_()&&window.document&&(Sl=window,ce=Sl.document,Ke=ce.documentElement,Me=Ss("div")||{style:{}},Ss("div"),Z=Qe(Z),xt=Z+"Origin",Me.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",zl=!!Qe("perspective"),ks=bt.core.reverting,ws=1)},ql=function(e){var t=e.ownerSVGElement,n=Ss("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Ke.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Ke.removeChild(n),s},Fl=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Nl=function(e){var t,n;try{t=e.getBBox()}catch{t=ql(e),n=1}return t&&(t.width||t.height)||n||(t=ql(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fl(e,["x","cx","x1"])||0,y:+Fl(e,["y","cy","y1"])||0,width:0,height:0}:t},Dl=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Nl(e))},de=function(e,t){if(t){var n=e.style,i;t in Qt&&t!==xt&&(t=Z),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace($s,"-$1").toLowerCase())):n.removeAttribute(t)}},ue=function(e,t,n,i,s,a){var o=new vt(e._pt,t,n,0,1,a?Tl:El);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Ol={deg:1,rad:1,turn:1},v_={grid:1,flex:1},he=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Me.style,c=i_.test(t),l=e.tagName.toLowerCase()==="svg",d=(l?"client":"offset")+(c?"Width":"Height"),u=100,h=i==="px",f=i==="%",g,p,m,b;if(i===a||!s||Ol[i]||Ol[a])return s;if(a!=="px"&&!h&&(s=r(e,t,n,"px")),b=e.getCTM&&Dl(e),(f||a==="%")&&(Qt[t]||~t.indexOf("adius")))return g=b?e.getBBox()[c?"width":"height"]:e[d],tt(f?s/g*u:s/100*g);if(o[c?"width":"height"]=u+(h?a:i),p=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!l?e:e.parentNode,b&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===ce||!p.appendChild)&&(p=ce.body),m=p._gsap,m&&f&&m.width&&c&&m.time===Et.time&&!m.uncache)return tt(s/m.width*u);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=u+i,g=e[d],x?e.style[t]=x:de(e,t)}else(f||a==="%")&&!v_[Tt(p,"display")]&&(o.position=Tt(e,"position")),p===e&&(o.position="static"),p.appendChild(Me),g=Me[d],p.removeChild(Me),o.position="absolute";return c&&f&&(m=ke(p),m.time=Et.time,m.width=p[d]),tt(h?g*s/u:g&&s?u/g*s:0)},te=function(e,t,n,i){var s;return ws||Cs(),t in Yt&&t!=="transform"&&(t=Yt[t],~t.indexOf(",")&&(t=t.split(",")[0])),Qt[t]&&t!=="transform"?(s=Fn(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:jr(Tt(e,xt))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Hr[t]&&Hr[t](e,t,n)||Tt(e,t)||Ho(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?he(e,t,s,n)+n:s},b_=function(e,t,n,i){if(!n||n==="none"){var s=Qe(t,e,1),a=s&&Tt(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Tt(e,"borderTopColor"))}var o=new vt(this._pt,e.style,t,0,1,wl),c=0,l=0,d,u,h,f,g,p,m,b,x,v,_,y;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Tt(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(p=e.style[t],e.style[t]=i,i=Tt(e,t)||i,p?e.style[t]=p:de(e,t)),d=[n,i],hl(d),n=d[0],i=d[1],h=n.match(je)||[],y=i.match(je)||[],y.length){for(;u=je.exec(i);)m=u[0],x=i.substring(c,u.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),m!==(p=h[l++]||"")&&(f=parseFloat(p)||0,_=p.substr((f+"").length),m.charAt(1)==="="&&(m=Ve(f,m)+_),b=parseFloat(m),v=m.substr((b+"").length),c=je.lastIndex-v.length,v||(v=v||$t.units[t]||_,c===i.length&&(i+=v,o.e+=v)),_!==v&&(f=he(e,t,p,v)||0),o._pt={_next:o._pt,p:x||l===1?x:",",s:f,c:b-f,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=t==="display"&&i==="none"?Tl:El;return Fo.test(i)&&(o.e=0),this._pt=o,o},Rl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},x_=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Rl[n]||n,t[1]=Rl[i]||i,t.join(" ")},y_=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],Qt[o]&&(c=1,o=o==="transformOrigin"?xt:Z),de(n,o);c&&(de(n,Z),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Fn(n,1),a.uncache=1,Ll(i)))}},Hr={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new vt(e._pt,t,n,0,0,y_);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},qn=[1,0,0,1,0,0],Bl={},Hl=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},jl=function(e){var t=Tt(e,Z);return Hl(t)?qn:t.substr(7).match(qo).map(tt)},Ms=function(e,t){var n=e._gsap||ke(e),i=e.style,s=jl(e),a,o,c,l;return n.svg&&e.getAttribute("transform")?(c=e.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?qn:s):(s===qn&&!e.offsetParent&&e!==Ke&&!n.svg&&(c=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(l=1,o=e.nextElementSibling,Ke.appendChild(e)),s=jl(e),c?i.display=c:de(e,"display"),l&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ke.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Es=function(e,t,n,i,s,a){var o=e._gsap,c=s||Ms(e,!0),l=o.xOrigin||0,d=o.yOrigin||0,u=o.xOffset||0,h=o.yOffset||0,f=c[0],g=c[1],p=c[2],m=c[3],b=c[4],x=c[5],v=t.split(" "),_=parseFloat(v[0])||0,y=parseFloat(v[1])||0,w,S,$,k;n?c!==qn&&(S=f*m-g*p)&&($=_*(m/S)+y*(-p/S)+(p*x-m*b)/S,k=_*(-g/S)+y*(f/S)-(f*x-g*b)/S,_=$,y=k):(w=Nl(e),_=w.x+(~v[0].indexOf("%")?_/100*w.width:_),y=w.y+(~(v[1]||v[0]).indexOf("%")?y/100*w.height:y)),i||i!==!1&&o.smooth?(b=_-l,x=y-d,o.xOffset=u+(b*f+x*p)-b,o.yOffset=h+(b*g+x*m)-x):o.xOffset=o.yOffset=0,o.xOrigin=_,o.yOrigin=y,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[xt]="0px 0px",a&&(ue(a,o,"xOrigin",l,_),ue(a,o,"yOrigin",d,y),ue(a,o,"xOffset",u,o.xOffset),ue(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",_+" "+y)},Fn=function(e,t){var n=e._gsap||new ml(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",c=getComputedStyle(e),l=Tt(e,xt)||"0",d,u,h,f,g,p,m,b,x,v,_,y,w,S,$,k,A,T,M,E,L,C,z,I,F,q,N,O,et,yt,it,J;return d=u=h=p=m=b=x=v=_=0,f=g=1,n.svg=!!(e.getCTM&&Dl(e)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[Z]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[Z]!=="none"?c[Z]:"")),i.scale=i.rotate=i.translate="none"),S=Ms(e,n.svg),n.svg&&(n.uncache?(F=e.getBBox(),l=n.xOrigin-F.x+"px "+(n.yOrigin-F.y)+"px",I=""):I=!t&&e.getAttribute("data-svg-origin"),Es(e,I||l,!!I||n.originIsAbsolute,n.smooth!==!1,S)),y=n.xOrigin||0,w=n.yOrigin||0,S!==qn&&(T=S[0],M=S[1],E=S[2],L=S[3],d=C=S[4],u=z=S[5],S.length===6?(f=Math.sqrt(T*T+M*M),g=Math.sqrt(L*L+E*E),p=T||M?Je(M,T)*Ee:0,x=E||L?Je(E,L)*Ee+p:0,x&&(g*=Math.abs(Math.cos(x*Ze))),n.svg&&(d-=y-(y*T+w*E),u-=w-(y*M+w*L))):(J=S[6],yt=S[7],N=S[8],O=S[9],et=S[10],it=S[11],d=S[12],u=S[13],h=S[14],$=Je(J,et),m=$*Ee,$&&(k=Math.cos(-$),A=Math.sin(-$),I=C*k+N*A,F=z*k+O*A,q=J*k+et*A,N=C*-A+N*k,O=z*-A+O*k,et=J*-A+et*k,it=yt*-A+it*k,C=I,z=F,J=q),$=Je(-E,et),b=$*Ee,$&&(k=Math.cos(-$),A=Math.sin(-$),I=T*k-N*A,F=M*k-O*A,q=E*k-et*A,it=L*A+it*k,T=I,M=F,E=q),$=Je(M,T),p=$*Ee,$&&(k=Math.cos($),A=Math.sin($),I=T*k+M*A,F=C*k+z*A,M=M*k-T*A,z=z*k-C*A,T=I,C=F),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,b=180-b),f=tt(Math.sqrt(T*T+M*M+E*E)),g=tt(Math.sqrt(z*z+J*J)),$=Je(C,z),x=Math.abs($)>2e-4?$*Ee:0,_=it?1/(it<0?-it:it):0),n.svg&&(I=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Hl(Tt(e,Z)),I&&e.setAttribute("transform",I))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=d-((n.xPercent=d&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-d)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=tt(f),n.scaleY=tt(g),n.rotation=tt(p)+o,n.rotationX=tt(m)+o,n.rotationY=tt(b)+o,n.skewX=x+o,n.skewY=v+o,n.transformPerspective=_+a,(n.zOrigin=parseFloat(l.split(" ")[2])||!t&&n.zOrigin||0)&&(i[xt]=jr(l)),n.xOffset=n.yOffset=0,n.force3D=$t.force3D,n.renderTransform=n.svg?k_:zl?Vl:w_,n.uncache=0,n},jr=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ts=function(e,t,n){var i=dt(t);return tt(parseFloat(t)+parseFloat(he(e,"x",n+"px",i)))+i},w_=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Vl(e,t)},Te="0deg",Nn="0px",Le=") ",Vl=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.z,l=n.rotation,d=n.rotationY,u=n.rotationX,h=n.skewX,f=n.skewY,g=n.scaleX,p=n.scaleY,m=n.transformPerspective,b=n.force3D,x=n.target,v=n.zOrigin,_="",y=b==="auto"&&e&&e!==1||b===!0;if(v&&(u!==Te||d!==Te)){var w=parseFloat(d)*Ze,S=Math.sin(w),$=Math.cos(w),k;w=parseFloat(u)*Ze,k=Math.cos(w),a=Ts(x,a,S*k*-v),o=Ts(x,o,-Math.sin(w)*-v),c=Ts(x,c,$*k*-v+v)}m!==Nn&&(_+="perspective("+m+Le),(i||s)&&(_+="translate("+i+"%, "+s+"%) "),(y||a!==Nn||o!==Nn||c!==Nn)&&(_+=c!==Nn||y?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Le),l!==Te&&(_+="rotate("+l+Le),d!==Te&&(_+="rotateY("+d+Le),u!==Te&&(_+="rotateX("+u+Le),(h!==Te||f!==Te)&&(_+="skew("+h+", "+f+Le),(g!==1||p!==1)&&(_+="scale("+g+", "+p+Le),x.style[Z]=_||"translate(0, 0)"},k_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.rotation,l=n.skewX,d=n.skewY,u=n.scaleX,h=n.scaleY,f=n.target,g=n.xOrigin,p=n.yOrigin,m=n.xOffset,b=n.yOffset,x=n.forceCSS,v=parseFloat(a),_=parseFloat(o),y,w,S,$,k;c=parseFloat(c),l=parseFloat(l),d=parseFloat(d),d&&(d=parseFloat(d),l+=d,c+=d),c||l?(c*=Ze,l*=Ze,y=Math.cos(c)*u,w=Math.sin(c)*u,S=Math.sin(c-l)*-h,$=Math.cos(c-l)*h,l&&(d*=Ze,k=Math.tan(l-d),k=Math.sqrt(1+k*k),S*=k,$*=k,d&&(k=Math.tan(d),k=Math.sqrt(1+k*k),y*=k,w*=k)),y=tt(y),w=tt(w),S=tt(S),$=tt($)):(y=u,$=h,w=S=0),(v&&!~(a+"").indexOf("px")||_&&!~(o+"").indexOf("px"))&&(v=he(f,"x",a,"px"),_=he(f,"y",o,"px")),(g||p||m||b)&&(v=tt(v+g-(g*y+p*S)+m),_=tt(_+p-(g*w+p*$)+b)),(i||s)&&(k=f.getBBox(),v=tt(v+i/100*k.width),_=tt(_+s/100*k.height)),k="matrix("+y+","+w+","+S+","+$+","+v+","+_+")",f.setAttribute("transform",k),x&&(f.style[Z]=k)},$_=function(e,t,n,i,s){var a=360,o=st(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?Ee:1),l=c-i,d=i+l+"deg",u,h;return o&&(u=s.split("_")[1],u==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),u==="cw"&&l<0?l=(l+a*Ml)%a-~~(l/a)*a:u==="ccw"&&l>0&&(l=(l-a*Ml)%a-~~(l/a)*a)),e._pt=h=new vt(e._pt,t,n,i,l,a_),h.e=d,h.u="deg",e._props.push(n),h},Xl=function(e,t){for(var n in t)e[n]=t[n];return e},A_=function(e,t,n){var i=Xl({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,c,l,d,u,h,f,g;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),a[Z]=t,o=Fn(n,1),de(n,Z),n.setAttribute("transform",l)):(l=getComputedStyle(n)[Z],a[Z]=t,o=Fn(n,1),a[Z]=l);for(c in Qt)l=i[c],d=o[c],l!==d&&s.indexOf(c)<0&&(f=dt(l),g=dt(d),u=f!==g?he(n,c,l,g):parseFloat(l),h=parseFloat(d),e._pt=new vt(e._pt,o,c,u,h-u,As),e._pt.u=g||0,e._props.push(c));Xl(o,i)};_t("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Hr[e>1?"border"+r:r]=function(o,c,l,d,u){var h,f;if(arguments.length<4)return h=a.map(function(g){return te(o,g,l)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(d+"").split(" "),f={},a.forEach(function(g,p){return f[g]=h[p]=h[p]||h[(p-1)/2|0]}),o.init(c,f,u)}});var Yl={name:"css",register:Cs,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,c=n.vars.startAt,l,d,u,h,f,g,p,m,b,x,v,_,y,w,S,$,k;ws||Cs(),this.styles=this.styles||Pl(e),$=this.styles.props,this.tween=n;for(p in t)if(p!=="autoRound"&&(d=t[p],!(St[p]&&_l(p,t,n,i,e,s)))){if(f=typeof d,g=Hr[p],f==="function"&&(d=d.call(n,i,e,s),f=typeof d),f==="string"&&~d.indexOf("random(")&&(d=En(d)),g)g(this,e,p,d,n)&&(S=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(e).getPropertyValue(p)+"").trim(),d+="",oe.lastIndex=0,oe.test(l)||(m=dt(l),b=dt(d),b?m!==b&&(l=he(e,p,l,b)+b):m&&(d+=m)),this.add(o,"setProperty",l,d,i,s,0,0,p),a.push(p),$.push(p,0,o[p]);else if(f!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(n,i,e,s):c[p],st(l)&&~l.indexOf("random(")&&(l=En(l)),dt(l+"")||l==="auto"||(l+=$t.units[p]||dt(te(e,p))||""),(l+"").charAt(1)==="="&&(l=te(e,p))):l=te(e,p),h=parseFloat(l),x=f==="string"&&d.charAt(1)==="="&&d.substr(0,2),x&&(d=d.substr(2)),u=parseFloat(d),p in Yt&&(p==="autoAlpha"&&(h===1&&te(e,"visibility")==="hidden"&&u&&(h=0),$.push("visibility",0,o.visibility),ue(this,o,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),p!=="scale"&&p!=="transform"&&(p=Yt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),v=p in Qt,v){if(this.styles.save(p),k=d,f==="string"&&d.substring(0,6)==="var(--"){if(d=Tt(e,d.substring(4,d.indexOf(")"))),d.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=d,d=Tt(e,"perspective"),A?e.style.perspective=A:de(e,"perspective")}u=parseFloat(d)}if(_||(y=e._gsap,y.renderTransform&&!t.parseTransform||Fn(e,t.parseTransform),w=t.smoothOrigin!==!1&&y.smooth,_=this._pt=new vt(this._pt,o,Z,0,1,y.renderTransform,y,0,-1),_.dep=1),p==="scale")this._pt=new vt(this._pt,y,"scaleY",y.scaleY,(x?Ve(y.scaleY,x+u):u)-y.scaleY||0,As),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){$.push(xt,0,o[xt]),d=x_(d),y.svg?Es(e,d,0,w,0,this):(b=parseFloat(d.split(" ")[2])||0,b!==y.zOrigin&&ue(this,y,"zOrigin",y.zOrigin,b),ue(this,o,p,jr(l),jr(d)));continue}else if(p==="svgOrigin"){Es(e,d,1,w,0,this);continue}else if(p in Bl){$_(this,y,p,h,x?Ve(h,x+d):d);continue}else if(p==="smoothOrigin"){ue(this,y,"smooth",y.smooth,d);continue}else if(p==="force3D"){y[p]=d;continue}else if(p==="transform"){A_(this,d,e);continue}}else p in o||(p=Qe(p)||p);if(v||(u||u===0)&&(h||h===0)&&!s_.test(d)&&p in o)m=(l+"").substr((h+"").length),u||(u=0),b=dt(d)||(p in $t.units?$t.units[p]:m),m!==b&&(h=he(e,p,l,b)),this._pt=new vt(this._pt,v?y:o,p,h,(x?Ve(h,x+u):u)-h,!v&&(b==="px"||p==="zIndex")&&t.autoRound!==!1?c_:As),this._pt.u=b||0,v&&k!==d?(this._pt.b=l,this._pt.e=k,this._pt.r=l_):m!==b&&b!=="%"&&(this._pt.b=l,this._pt.r=o_);else if(p in o)b_.call(this,e,p,l,x?x+d:d);else if(p in e)this.add(e,p,l||e[p],x?x+d:d,i,s);else if(p!=="parseTransform"){Ji(p,d);continue}v||(p in o?$.push(p,0,o[p]):typeof e[p]=="function"?$.push(p,2,e[p]()):$.push(p,1,l||e[p])),a.push(p)}}S&&kl(this)},render:function(e,t){if(t.tween._time||!ks())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:te,aliases:Yt,getSetter:function(e,t,n){var i=Yt[t];return i&&i.indexOf(",")<0&&(t=i),t in Qt&&t!==xt&&(e._gsap.x||te(e,"x"))?n&&Cl===n?t==="scale"?f_:h_:(Cl=n||{})&&(t==="scale"?p_:g_):e.style&&!Gi(e.style[t])?d_:~t.indexOf("-")?u_:_s(e,t)},core:{_removeProperty:de,_getMatrix:Ms}};bt.utils.checkPrefix=Qe,bt.core.getStyleSaver=Pl,(function(r,e,t,n){var i=_t(r+","+e+","+t,function(s){Qt[s]=1});_t(e,function(s){$t.units[s]="deg",Bl[s]=1}),Yt[i[13]]=r+","+e,_t(n,function(s){var a=s.split(":");Yt[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),_t("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){$t.units[r]="px"}),bt.registerPlugin(Yl);var Dn=bt.registerPlugin(Yl)||bt;Dn.core.Tween;const tn={input:"#ff2d75",hidden:"#7b68ee",output:"#00d4ff"},On=36,Vr=100,Ls=200,Gl=50,Ps=60,S_=`
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;class C_ extends D{constructor(){super(...arguments);P(this,"_svg",null);P(this,"_container",null);P(this,"_hasAnimated",!1);P(this,"_isAnimating",!1);P(this,"_resizeObserver",null);P(this,"_timeline",null)}static get observedAttributes(){return["layers","names","animate","speed"]}get _layers(){return this.jsonAttr("layers",[["x₁","x₂"],["h₁","h₂","h₃"],["ŷ"]])}get _names(){return this.jsonAttr("names",[])}get _animateMode(){return this.getAttribute("animate")||"none"}get _speed(){const t=parseInt(this.getAttribute("speed")||"",10);return isNaN(t)?600:t}connectedCallback(){super.connectedCallback(),this.adoptStyles(S_),this._container=document.createElement("div"),this.root.appendChild(this._container),this._initSvg(),this._render(),this._resizeObserver=new ResizeObserver(()=>{this._isAnimating||this._render()}),this._resizeObserver.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._resizeObserver)==null||t.disconnect(),this._resizeObserver=null,this._cancelAnimation()}handleAttributeChange(t,n,i){n!==i&&this._svg&&(this._cancelAnimation(),this._hasAnimated=!1,this._render())}animateIn(t){if(!this._hasAnimated){if(t||this._animateMode==="none"){this._hasAnimated=!0,this._render();return}this._runAnimation()}}_initSvg(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(t),this._svg=G(t);const n=this._svg.append("defs"),i={input:tn.input,hidden:tn.hidden,output:tn.output};for(const[s,a]of Object.entries(i))n.append("filter").attr("id",`glow-${s}`).attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",6).attr("flood-color",a).attr("flood-opacity",.7);this._svg.append("g").attr("class","connections-group"),this._svg.append("g").attr("class","nodes-group"),this._svg.append("g").attr("class","labels-group")}_computeLayout(){const t=this._layers,n=this.isRtl,i=t.length,s=Math.max(...t.map(d=>d.length),1),a=(i-1)*Ls+Ps*2,o=(s-1)*Vr+Gl+On+40,c=[],l=[];for(let d=0;d<i;d++){const u=t[d],h=n?a-Ps-d*Ls:Ps+d*Ls,f=(u.length-1)*Vr,g=Gl+((s-1)*Vr-f)/2,p=[];for(let m=0;m<u.length;m++)p.push({layer:d,index:m,x:h,y:g+m*Vr,label:u[m]});c.push(p)}for(let d=0;d<i-1;d++)for(const u of c[d])for(const h of c[d+1])l.push({source:u,target:h});return{nodes:c,connections:l,width:a,height:o}}_layerColor(t,n){const i=getComputedStyle(this).getPropertyValue("--lv-net-input").trim()||tn.input,s=getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim()||tn.hidden,a=getComputedStyle(this).getPropertyValue("--lv-net-output").trim()||tn.output;return t===0?i:t===n-1?a:s}_layerType(t,n){return t===0?"input":t===n-1?"output":"hidden"}_render(){if(!this._svg)return;const{nodes:t,connections:n,width:i,height:s}=this._computeLayout(),a=t.length,o=this._animateMode==="none"||this._hasAnimated,c=this._animateMode!=="none"&&!this._hasAnimated;this._svg.attr("viewBox",`0 0 ${i} ${s}`);const l=this._svg.select(".connections-group");l.selectAll("*").remove();for(const f of n)l.append("line").attr("class","connection").attr("x1",f.source.x).attr("y1",f.source.y).attr("x2",f.target.x).attr("y2",f.target.y).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1.5).attr("stroke-opacity",c?.08:.5).attr("data-source-layer",f.source.layer).attr("data-target-layer",f.target.layer);const d=this._svg.select(".nodes-group");d.selectAll("*").remove();for(const f of t)for(const g of f){const p=this._layerColor(g.layer,a),m=this._layerType(g.layer,a),b=d.append("g").attr("class","node").attr("data-layer",g.layer).attr("data-index",g.index).attr("transform",`translate(${g.x},${g.y})`).attr("opacity",c?.15:1);b.append("circle").attr("class","node-circle").attr("data-layer",g.layer).attr("r",On).attr("fill",p).attr("stroke",p).attr("stroke-width",2).attr("fill-opacity",o?.2:c?.05:.2),o&&b.attr("filter",`url(#glow-${m})`),b.append("text").attr("class","node-label").text(g.label)}const u=this._svg.select(".labels-group");u.selectAll("*").remove();const h=this._names;for(let f=0;f<t.length;f++){if(!h[f])continue;const g=t[f][0];u.append("text").attr("class","label").attr("x",g.x).attr("y",g.y-On-16).text(h[f])}}_getLayerNodeGroups(){const t=this._layers.length,n=[];for(let i=0;i<t;i++){const s=Array.from(this.root.querySelectorAll(`.node[data-layer="${i}"]`));n.push(s)}return n}_getConnectionElements(t,n){return Array.from(this.root.querySelectorAll(`.connection[data-source-layer="${t}"][data-target-layer="${n}"]`))}_cancelAnimation(){var t;(t=this._timeline)==null||t.kill(),this._timeline=null,this._isAnimating=!1}_runAnimation(){if(!this._svg)return;this._cancelAnimation(),this._isAnimating=!0,this._render();const{nodes:t}=this._computeLayout(),n=t.length,i=this._animateMode,s=this._speed,a=i==="backprop",o=a?"#ff2d75":"#00d4ff",c=s/600,l=a?Array.from({length:n},(h,f)=>n-1-f):Array.from({length:n},(h,f)=>f),d=this._getLayerNodeGroups(),u=Dn.timeline({onComplete:()=>{this._isAnimating=!1,this._hasAnimated=!0,this.root.querySelectorAll(".node").forEach(g=>{const p=parseInt(g.getAttribute("data-layer")||"0",10),m=this._layerType(p,n);Dn.set(g,{opacity:1}),g.setAttribute("filter",`url(#glow-${m})`);const b=g.querySelector("circle");b&&Dn.set(b,{attr:{"fill-opacity":.2}})}),this.root.querySelectorAll(".connection").forEach(g=>{Dn.set(g,{attr:{"stroke-opacity":.5}}),g.setAttribute("stroke","var(--lv-border, #2a2a4a)")})}});this._timeline=u,u.addLabel("start",.15),l.forEach((h,f)=>{const g=this._layerType(h,n),p=d[h];if(!p||p.length===0)return;const m=p.map(v=>v.querySelector(".node-circle")).filter(Boolean),b=`layer-${f}`,x=.15+f*(.4*c);if(u.addLabel(b,x),u.to(p,{opacity:1,duration:.2,stagger:.05,ease:"power2.out"},b),u.call(()=>{p.forEach(v=>{v.setAttribute("filter",`url(#glow-${g})`)})},[],b),u.to(m,{attr:{r:On*1.15},duration:.15,stagger:.05,ease:"back.out(1.7)"},b),u.to(m,{attr:{r:On},duration:.2,stagger:.05,ease:"power2.inOut"},`${b}+=0.2`),u.to(m,{attr:{"fill-opacity":.35},duration:.2,stagger:.05,ease:"power2.out"},b),u.to(m,{attr:{"fill-opacity":.2},duration:.3,stagger:.05,ease:"power2.in"},`${b}+=0.3`),f<l.length-1){const v=l[f+1],_=Math.min(h,v),y=Math.max(h,v),w=this._getConnectionElements(_,y);w.length>0&&(u.to(w,{attr:{"stroke-opacity":.5},stroke:o,duration:.25,stagger:.02,ease:"power2.out"},`${b}+=0.15`),u.to(w,{stroke:"var(--lv-border, #2a2a4a)",attr:{"stroke-opacity":.35},duration:.3,stagger:.02,ease:"power2.inOut"},`${b}+=0.35`))}})}}customElements.define("lv-network",C_);const Wl=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],M_=`
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
`,fe=120,Rn=32,Xr=40;class E_ extends D{constructor(){super(...arguments);P(this,"_data",null);P(this,"_hasAnimated",!1);P(this,"_svg",null);P(this,"_container",null);P(this,"_root",null)}static get observedAttributes(){return["data","orientation"]}get _orientation(){return this.getAttribute("orientation")==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.adoptStyles(M_),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",{label:"root"}),this._initSvg(),this._buildHierarchy(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(t,n,i){n!==i&&(t==="data"&&(this._data=this.jsonAttr("data",{label:"root"}),this._buildHierarchy()),this._svg&&this._render(!1))}animateIn(t){this._hasAnimated||(this._hasAnimated=!0,t?this._render(!1):this._render(!0))}_initSvg(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(t),this._svg=G(t),this._svg.append("g").attr("class","links-group"),this._svg.append("g").attr("class","nodes-group")}_buildHierarchy(){this._data&&(this._root=mr(this._data))}_getVisibleNodes(){if(!this._root)return[];const t=[],n=i=>{if(t.push(i),!i._collapsed&&i.children)for(const s of i.children)n(s)};return n(this._root),t}_toggleCollapse(t){!t.data.children||t.data.children.length===0||(t._collapsed?(t._collapsed=!1,t.children=t._children||[]):(t._collapsed=!0,t._children=t.children,t.children=void 0),this._render(!0))}_render(t){if(!this._svg||!this._root)return;const n=this._orientation==="horizontal",i=new Map,s=(A,T)=>{if(i.set(T,{collapsed:!!A._collapsed,_children:A._children}),A._collapsed&&A._children)for(let M=0;M<A._children.length;M++)s(A._children[M],`${T}/${M}`);if(A.children)for(let M=0;M<A.children.length;M++)s(A.children[M],`${T}/${M}`)};s(this._root,"0"),this._root=mr(this._data);const a=(A,T)=>{const M=i.get(T);if(M!=null&&M.collapsed&&(A._collapsed=!0,A._children=A.children,A.children=void 0),A.children)for(let E=0;E<A.children.length;E++)a(A.children[E],`${T}/${E}`)};a(this._root,"0");const o=this._getVisibleNodes(),c=o.filter(A=>!A.children||A.children.length===0).length,l=Gs(o,A=>A.depth)||0,d=Rn+20,u=fe+60;let h,f;n?(h=l*u,f=Math.max((c-1)*d,d)):(h=Math.max((c-1)*(fe+80),fe+80),f=l*u),Jp().size(n?[f,h]:[h,f]).separation((A,T)=>A.parent===T.parent?1.5:2)(this._root);const p=this._root.descendants(),m=this._root.links(),b=h+Xr*2+fe,x=f+Xr*2+Rn;this._svg.attr("viewBox",`0 0 ${b} ${x}`);const v=Xr+fe/2,_=Xr+Rn/2,y=A=>n?A.y+v:A.x+v,w=A=>n?A.x+_:A.y+_,S=this._svg.select(".links-group");S.selectAll("*").remove();const $=n?Lg().x(A=>A.y+v).y(A=>A.x+_):Pg().x(A=>A.x+v).y(A=>A.y+_);for(let A=0;A<m.length;A++){const T=m[A],M=S.append("path").attr("class","link").attr("d",$(T));if(t){const E=M.node().getTotalLength();M.attr("stroke-dasharray",E).attr("stroke-dashoffset",E).transition().delay(A*60+100).duration(500).ease(mn).attr("stroke-dashoffset",0)}}const k=this._svg.select(".nodes-group");k.selectAll("*").remove();for(let A=0;A<p.length;A++){const T=p[A],M=y(T),E=w(T),L=T.data.children&&T.data.children.length>0,C=!!T._collapsed,I=T.depth%Wl.length,F=getComputedStyle(this).getPropertyValue(`--lv-chart-${I}`).trim()||Wl[I],q=k.append("g").attr("transform",`translate(${M},${E})`);t&&q.attr("opacity",0).transition().delay(A*60).duration(400).ease(mn).attr("opacity",1);const N=q.append("rect").attr("class",`node-rect ${L?"has-children":"leaf"}`).attr("x",-fe/2).attr("y",-Rn/2).attr("width",fe).attr("height",Rn).attr("stroke",F);q.append("text").attr("class","node-label").text(T.data.label),L&&q.append("text").attr("class","collapse-indicator").attr("x",fe/2-12).attr("y",0).text(C?"+":"−"),L&&(N.on("click",()=>{this._toggleCollapse(T)}),q.select(".collapse-indicator").on("click",()=>{this._toggleCollapse(T)}))}}}customElements.define("lv-tree",E_);const T_="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js",L_=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;let zs=null;class P_ extends D{constructor(){super(...arguments);P(this,"_rendered",!1)}static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(L_),this._renderDiagram()}async _renderDiagram(){var i;const t=(i=this.textContent)==null?void 0:i.trim();if(!t){this.render('<div class="mermaid-container"></div>');return}this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');try{await Os(T_)}catch{this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');return}const n=window.mermaid;if(n){zs||(zs=new Promise(s=>{const a=getComputedStyle(this),o=a.getPropertyValue("--lv-bg-card").trim()||"#1a1a2e",c=a.getPropertyValue("--lv-text").trim()||"#e4e4ec",l=a.getPropertyValue("--lv-accent").trim()||"#00d4ff",d=a.getPropertyValue("--lv-accent2").trim()||"#7b68ee",u=a.getPropertyValue("--lv-border").trim()||"#2a2a4a";n.initialize({startOnLoad:!1,theme:"base",themeVariables:{primaryColor:l,primaryTextColor:c,primaryBorderColor:u,secondaryColor:d,secondaryTextColor:c,tertiaryColor:o,lineColor:l,textColor:c,mainBkg:o,nodeBorder:u,clusterBkg:o,edgeLabelBackground:o,fontFamily:"Inter, Segoe UI, sans-serif"},flowchart:{htmlLabels:!0,curve:"basis"},securityLevel:"strict"}),s()})),await zs;try{const s="lv-mermaid-"+Math.random().toString(36).slice(2,8),{svg:a}=await n.render(s,t),o=this.root.getElementById("output");o&&(o.innerHTML=a)}catch(s){const a=this.root.getElementById("output");a&&(a.innerHTML=`<div class="mermaid-error">Diagram error: ${s.message||s}</div>`)}}}}customElements.define("lv-mermaid",P_);const z_=`
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
`;class I_ extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_steps",[]);P(this,"_currentStep",0);P(this,"_playing",!1);P(this,"_timer",null);P(this,"_nodeStates",new Map);P(this,"_edgeStates",new Map);P(this,"_distances",new Map);P(this,"_queueState",[])}static get observedAttributes(){return["nodes","edges","algorithm","start","directed","speed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(z_),this._build()}disconnectedCallback(){super.disconnectedCallback(),this._stopTimer()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){this._hasAnimated||(this._hasAnimated=!0)}_stopTimer(){this._timer!==null&&(clearInterval(this._timer),this._timer=null),this._playing=!1}_getSpeed(){return parseInt(this.getAttribute("speed")||"500",10)}_getAlgorithm(){return this.getAttribute("algorithm")||"bfs"}_isDirected(){return this.hasAttribute("directed")}_getNodes(){return this.jsonAttr("nodes",[])}_getEdges(){return this.jsonAttr("edges",[])}_layoutNodes(t){return t.map((a,o)=>{if(a.x!=null&&a.y!=null)return a;const c=2*Math.PI*o/t.length-Math.PI/2;return{...a,x:250+140*Math.cos(c),y:180+140*Math.sin(c)}})}_buildAdj(t,n){const i=new Map;return t.forEach(s=>i.set(s.id,[])),n.forEach(s=>{var a,o;(a=i.get(s.source))==null||a.push({id:s.target,weight:s.weight??1}),this._isDirected()||(o=i.get(s.target))==null||o.push({id:s.source,weight:s.weight??1})}),i}_generateSteps(t,n){const i=this._buildAdj(t,n),s=this.getAttribute("start")||(t.length>0?t[0].id:""),a=this._getAlgorithm(),o=[],c=new Set;if(a==="bfs"){const l=[s];for(o.push({type:"enqueue",node:s}),c.add(s);l.length>0;){const d=l.shift();o.push({type:"dequeue",node:d}),o.push({type:"visit",node:d});for(const u of i.get(d)||[])c.has(u.id)||(c.add(u.id),o.push({type:"enqueue",node:u.id,from:d}),l.push(u.id))}}else if(a==="dfs"){const l=[s];for(o.push({type:"enqueue",node:s});l.length>0;){const d=l.pop();if(c.has(d))continue;c.add(d),o.push({type:"dequeue",node:d}),o.push({type:"visit",node:d});const u=i.get(d)||[];for(let h=u.length-1;h>=0;h--){const f=u[h];c.has(f.id)||(o.push({type:"enqueue",node:f.id,from:d}),l.push(f.id))}}}else if(a==="dijkstra"){const l=new Map;t.forEach(u=>l.set(u.id,1/0)),l.set(s,0);const d=[{id:s,dist:0}];for(o.push({type:"update",node:s,distance:0});d.length>0;){d.sort((h,f)=>h.dist-f.dist);const u=d.shift();if(!c.has(u.id)){c.add(u.id),o.push({type:"visit",node:u.id,distance:u.dist});for(const h of i.get(u.id)||[]){const f=u.dist+h.weight;f<(l.get(h.id)??1/0)&&(l.set(h.id,f),o.push({type:"relax",node:h.id,from:u.id,distance:f}),d.push({id:h.id,dist:f}))}}}}return o}_play(){this._playing||(this._playing=!0,this._updateButtons(),this._timer=window.setInterval(()=>{if(this._currentStep>=this._steps.length){this._stopTimer(),this._updateButtons();return}this._stepForward()},this._getSpeed()))}_pause(){this._stopTimer(),this._updateButtons()}_resetState(){this._stopTimer(),this._currentStep=0,this._nodeStates.clear(),this._edgeStates.clear(),this._distances.clear(),this._queueState=[],this._renderGraph(),this._updateInfo(),this._updateButtons()}_stepForward(){if(this._currentStep>=this._steps.length)return;const t=this._steps[this._currentStep];this._applyStep(t),this._currentStep++,this._renderGraph(),this._updateInfo(),this._currentStep>=this._steps.length&&(this._stopTimer(),this._updateButtons())}_applyStep(t){if(this._getAlgorithm(),t.type==="visit"){this._nodeStates.set(t.node,"visited");const n=this._queueState.indexOf(t.node);n>=0&&this._queueState.splice(n,1)}else if(t.type==="enqueue"){if((!this._nodeStates.has(t.node)||this._nodeStates.get(t.node)==="unvisited")&&this._nodeStates.set(t.node,"queued"),this._queueState.push(t.node),t.from){const n=this._edgeKey(t.from,t.node);this._edgeStates.set(n,"active")}}else if(t.type==="dequeue"){this._nodeStates.set(t.node,"visiting");const n=this._queueState.indexOf(t.node);n>=0&&this._queueState.splice(n,1)}else if(t.type==="relax"){if(t.distance!=null&&this._distances.set(t.node,t.distance),(!this._nodeStates.has(t.node)||this._nodeStates.get(t.node)!=="visited")&&this._nodeStates.set(t.node,"queued"),t.from){const n=this._edgeKey(t.from,t.node);this._edgeStates.set(n,"active")}}else t.type==="update"&&t.distance!=null&&this._distances.set(t.node,t.distance)}_edgeKey(t,n){return this._isDirected()?`${t}->${n}`:t<n?`${t}->${n}`:`${n}->${t}`}_nodeColor(t){switch(t){case"queued":return"#ffd93d";case"visiting":return"#00d4ff";case"visited":return"#22c55e";default:return"#666"}}_renderGraph(){const t=G(this.root.querySelector("svg")),n=this._layoutNodes(this._getNodes()),i=this._getEdges(),s=this._isDirected(),a=this._getAlgorithm()==="dijkstra",o=t.select(".graph-group");if(o.empty())return;o.selectAll("*").remove(),s&&(t.select("defs").remove(),t.append("defs").append("marker").attr("id","arrow").attr("viewBox","0 0 10 10").attr("refX",28).attr("refY",5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("fill","#666"));const c=new Map(n.map(l=>[l.id,l]));i.forEach(l=>{const d=c.get(l.source),u=c.get(l.target);if(!d||!u)return;const h=this._edgeKey(l.source,l.target),f=this._edgeStates.get(h)==="active",g=o.append("line").attr("x1",d.x).attr("y1",d.y).attr("x2",u.x).attr("y2",u.y).attr("stroke",f?"#f59e0b":"#444").attr("stroke-width",f?2.5:1.5);s&&g.attr("marker-end","url(#arrow)"),l.weight!=null&&o.append("text").attr("x",(d.x+u.x)/2).attr("y",(d.y+u.y)/2-8).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#888").text(String(l.weight))}),n.forEach(l=>{const d=this._nodeStates.get(l.id),u=this._nodeColor(d);if(o.append("circle").attr("cx",l.x).attr("cy",l.y).attr("r",20).attr("fill",u).attr("stroke","#222").attr("stroke-width",2),o.append("text").attr("class","node-label").attr("x",l.x).attr("y",l.y).text(l.id),a&&this._distances.has(l.id)){const h=this._distances.get(l.id);o.append("text").attr("class","dist-label").attr("x",l.x).attr("y",l.y-28).text(h===1/0?"∞":String(h))}})}_updateInfo(){const t=this.root.querySelector(".info");if(!t)return;const n=this._getAlgorithm(),i=n==="dfs"?"Stack":"Queue";t.textContent=`${n.toUpperCase()} — Step ${this._currentStep}/${this._steps.length} | ${i}: [${this._queueState.join(", ")}]`}_updateButtons(){const t=this.root.querySelector(".btn-play"),n=this.root.querySelector(".btn-step");t&&(t.textContent=this._playing?"Pause":"Play"),n&&(n.disabled=this._playing||this._currentStep>=this._steps.length)}_build(){this._stopTimer();const t=this._layoutNodes(this._getNodes()),n=this._getEdges();if(t.length===0){this.render('<div class="graph-container"></div>');return}this._steps=this._generateSteps(t,n),this._currentStep=0,this._nodeStates.clear(),this._edgeStates.clear(),this._distances.clear(),this._queueState=[];const i=500,s=400;this.render(`<div class="graph-container">
      <svg viewBox="0 0 ${i} ${s}" width="${i}" height="${s}">
        <g class="graph-group"></g>
      </svg>
      <div class="controls">
        <button class="btn-play">Play</button>
        <button class="btn-step">Step</button>
        <button class="btn-reset">Reset</button>
      </div>
      <div class="info"></div>
    </div>`),this._renderGraph(),this._updateInfo(),this.root.querySelector(".btn-play").addEventListener("click",()=>{this._playing?this._pause():this._play()}),this.root.querySelector(".btn-step").addEventListener("click",()=>{this._playing||this._stepForward()}),this.root.querySelector(".btn-reset").addEventListener("click",()=>this._resetState())}}customElements.define("lv-graph-algo",I_);const q_=`
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
`;class F_ extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_step",0);P(this,"_nodes",[]);P(this,"_totalForward",0);P(this,"_phase","idle")}static get observedAttributes(){return["expression","values","speed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(q_),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector("svg");n&&(n.style.opacity="0",n.style.transition="opacity 0.5s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}_build(){const t=this.getAttribute("expression")||"linear",n=this.jsonAttr("values",{x:2,w:.5,b:.1,y:1});this._nodes=this._buildGraph(t,n),this._totalForward=this._nodes.length,this._step=0,this._phase="idle",this._renderView()}_buildGraph(t,n){const i=n.x??2,s=n.w??.5,a=n.b??.1,o=n.y??1;switch(t){case"sigmoid":return[{id:"x",op:"x",value:null,grad:null,inputs:[],compute:()=>i,localGrad:(c,l)=>[l]},{id:"w",op:"w",value:null,grad:null,inputs:[],compute:()=>s,localGrad:(c,l)=>[l]},{id:"mul",op:"×",value:null,grad:null,inputs:[0,1],compute:c=>c[0]*c[1],localGrad:(c,l)=>[l*c[1],l*c[0]]},{id:"b",op:"b",value:null,grad:null,inputs:[],compute:()=>a,localGrad:(c,l)=>[l]},{id:"add",op:"+",value:null,grad:null,inputs:[2,3],compute:c=>c[0]+c[1],localGrad:(c,l)=>[l,l]},{id:"neg",op:"neg",value:null,grad:null,inputs:[4],compute:c=>-c[0],localGrad:(c,l)=>[-l]},{id:"exp",op:"exp",value:null,grad:null,inputs:[5],compute:c=>Math.exp(c[0]),localGrad:(c,l)=>[l*Math.exp(c[0])]},{id:"plus1",op:"+1",value:null,grad:null,inputs:[6],compute:c=>c[0]+1,localGrad:(c,l)=>[l]},{id:"inv",op:"1/x",value:null,grad:null,inputs:[7],compute:c=>1/c[0],localGrad:(c,l)=>[-l/(c[0]*c[0])]}];case"mse":{const c=s*i+a;return[{id:"y",op:"y",value:null,grad:null,inputs:[],compute:()=>o,localGrad:(l,d)=>[d]},{id:"yhat",op:"ŷ",value:null,grad:null,inputs:[],compute:()=>c,localGrad:(l,d)=>[d]},{id:"sub",op:"−",value:null,grad:null,inputs:[0,1],compute:l=>l[0]-l[1],localGrad:(l,d)=>[d,-d]},{id:"sq",op:"x²",value:null,grad:null,inputs:[2],compute:l=>l[0]*l[0],localGrad:(l,d)=>[2*l[0]*d]},{id:"half",op:"/2",value:null,grad:null,inputs:[3],compute:l=>l[0]/2,localGrad:(l,d)=>[d/2]}]}case"chain":return[{id:"x",op:"x",value:null,grad:null,inputs:[],compute:()=>i,localGrad:(c,l)=>[l]},{id:"sq",op:"x²",value:null,grad:null,inputs:[0],compute:c=>c[0]*c[0],localGrad:(c,l)=>[2*c[0]*l]},{id:"sin",op:"sin",value:null,grad:null,inputs:[1],compute:c=>Math.sin(c[0]),localGrad:(c,l)=>[Math.cos(c[0])*l]}];default:return[{id:"x",op:"x",value:null,grad:null,inputs:[],compute:()=>i,localGrad:(c,l)=>[l]},{id:"w",op:"w",value:null,grad:null,inputs:[],compute:()=>s,localGrad:(c,l)=>[l]},{id:"mul",op:"×",value:null,grad:null,inputs:[0,1],compute:c=>c[0]*c[1],localGrad:(c,l)=>[l*c[1],l*c[0]]},{id:"b",op:"b",value:null,grad:null,inputs:[],compute:()=>a,localGrad:(c,l)=>[l]},{id:"add",op:"+",value:null,grad:null,inputs:[2,3],compute:c=>c[0]+c[1],localGrad:(c,l)=>[l,l]}]}}_fmt(t){return Math.abs(t)<.001?t.toExponential(2):parseFloat(t.toFixed(4)).toString()}_stepForward(){if(this._phase==="idle"&&(this._phase="forward"),this._phase!=="forward")return;if(this._step>=this._nodes.length){this._phase="backward",this._nodes[this._nodes.length-1].grad=1,this._step=this._nodes.length-1,this._renderView();return}const t=this._nodes[this._step],n=t.inputs.map(i=>this._nodes[i].value);t.value=t.compute(n),this._step++,this._renderView()}_stepBackward(){if(this._phase!=="backward"||this._step<0)return;const t=this._nodes[this._step];if(t.inputs.length>0){const n=t.inputs.map(s=>this._nodes[s].value),i=t.localGrad(n,t.grad);t.inputs.forEach((s,a)=>{this._nodes[s].grad=(this._nodes[s].grad??0)+i[a]})}this._step--,this._renderView()}_reset(){this._nodes.forEach(t=>{t.value=null,t.grad=null}),this._step=0,this._phase="idle",this._renderView()}_renderView(){var v,_,y;const t=this._nodes,n=t.length,i=650,s=260,a=64,o=58,c=30,l=(i-60-a)/Math.max(n-1,1),d=100;let u="";for(let w=0;w<n;w++){const S=c+w*l+a/2;for(const $ of t[w].inputs){const k=c+$*l+a/2,A=this._phase==="forward"&&this._step===w,T=this._phase==="backward"&&this._step===w;u+=`<line x1="${k}" y1="${d}" x2="${S}" y2="${d}" stroke="${A?"#3b82f6":T?"#ef4444":"var(--lv-border)"}" stroke-width="${A||T?2.5:1.5}" marker-end="url(#arrow)"/>`}}let h="";for(let w=0;w<n;w++){const S=c+w*l,$=this._phase==="forward"&&this._step===w,k=this._phase==="forward"&&w<this._step,A=this._phase==="backward"&&this._step===w,T=t[w].grad!==null;let M="var(--lv-border)",E="var(--lv-bg-card)";$?(M="#3b82f6",E="rgba(59,130,246,0.15)"):A?(M="#ef4444",E="rgba(239,68,68,0.15)"):k&&(M="var(--lv-accent)"),h+=`<g>
        <rect x="${S}" y="${d-o/2}" width="${a}" height="${o}" rx="8" ry="8"
          fill="${E}" stroke="${M}" stroke-width="${$||A?2.5:1.5}"/>
        <text x="${S+a/2}" y="${d-8}" text-anchor="middle" font-size="13" font-weight="600"
          fill="var(--lv-text)">${this._esc(t[w].op)}</text>
        <text x="${S+a/2}" y="${d+14}" text-anchor="middle" font-size="11"
          fill="var(--lv-text-dim)">${t[w].value!==null?this._fmt(t[w].value):""}</text>`,T&&(h+=`<text x="${S+a/2}" y="${d+o/2+18}" text-anchor="middle" font-size="10"
          fill="#ef4444">∂=${this._fmt(t[w].grad)}</text>`),h+="</g>"}let f="";if(this._phase==="forward"&&this._step>0&&this._step<=n){const w=t[this._step-1];if(w.inputs.length>0){const S=w.inputs.map($=>t[$].op).join(", ");f=`Forward: ${w.op}(${S}) = ${this._fmt(w.value)}`}else f=`Forward: ${w.op} = ${this._fmt(w.value)}`}else if(this._phase==="backward")if(this._step>=0&&this._step<n){const w=t[this._step];f=`Backward: propagating gradient at ${w.op}, ∂=${this._fmt(w.grad)}`}else f="Backward pass complete.";else this._phase==="idle"&&(f="Press Step Forward to begin the forward pass.");const g=this._phase==="idle"||this._phase==="forward"&&this._step<=n,p=this._phase==="backward"&&this._step>=0,m=this._phase==="forward"?"phase-forward":this._phase==="backward"?"phase-backward":"",b=this._phase==="forward"?"Forward Pass":this._phase==="backward"?"Backward Pass":"",x=`<div class="bp-container">
      <svg viewBox="0 0 ${i} ${s}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="var(--lv-text-dim)"/>
          </marker>
        </defs>
        ${u}
        ${h}
      </svg>
      ${b?`<div class="phase-label ${m}">${b} (step ${this._phase==="forward"?this._step:n-this._step} / ${n})</div>`:""}
      <div class="explanation">${f}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-step-fwd" ${g?"":"disabled"}>Step Forward ▶</button>
        <button id="btn-step-bwd" ${p?"":"disabled"}>Step Backward ◀</button>
      </div>
    </div>`;this.render(x),(v=this.root.getElementById("btn-step-fwd"))==null||v.addEventListener("click",()=>this._stepForward()),(_=this.root.getElementById("btn-step-bwd"))==null||_.addEventListener("click",()=>this._stepBackward()),(y=this.root.getElementById("btn-reset"))==null||y.addEventListener("click",()=>this._reset())}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-backprop-flow",F_);const N_=`
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
`;class D_ extends D{constructor(){super(...arguments);P(this,"_hasAnimated",!1);P(this,"_allNodes",[]);P(this,"_root",null);P(this,"_steps",[]);P(this,"_stepIdx",-1);P(this,"_playing",!1);P(this,"_timer",null)}static get observedAttributes(){return["fn","n","speed","show-memo"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(N_),this._build()}handleAttributeChange(){this.isConnected&&this._build()}animateIn(t){if(this._hasAnimated||(this._hasAnimated=!0,t))return;const n=this.root.querySelector(".rt-container");n&&(n.style.opacity="0",n.style.transition="opacity 0.5s ease-out",requestAnimationFrame(()=>{n.style.opacity="1"}))}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearTimeout(this._timer)}_build(){const t=this.getAttribute("fn")||"fibonacci",n=parseInt(this.getAttribute("n")||"5",10),i=this.hasAttribute("show-memo");this._allNodes=[],this._root=this._buildTree(t,n),this._layoutTree(this._root),this._steps=[],this._stepIdx=-1,this._playing=!1;const s=new Map;this._generateSteps(this._root,s,i),this._allNodes.forEach(a=>a.state="hidden"),this._renderView()}_buildTree(t,n){const i=new Map,s=(c,l)=>{const d=`${c}(${l.join(",")})`,u={call:d,args:l,children:[],result:null,x:0,y:0,state:"hidden"};switch(this._allNodes.push(u),c){case"fibonacci":case"fib":{const h=l[0];if(h<=1)u.result=h;else{const f=s("fib",[h-1]),g=s("fib",[h-2]);u.children=[f,g],u.result=f.result+g.result}break}case"factorial":case"fact":{const h=l[0];if(h<=1)u.result=1;else{const f=s("fact",[h-1]);u.children=[f],u.result=h*f.result}break}case"power":case"pow":{const[h,f]=l.length>=2?l:[2,l[0]];if(f===0)u.result=1,u.call=`pow(${h},0)`;else if(f===1)u.result=h,u.call=`pow(${h},1)`;else{const g=Math.floor(f/2);u.call=`pow(${h},${f})`;const p=s("pow",[h,g]);if(f%2===0)u.children=[p],u.result=p.result*p.result;else{const m=s("pow",[h,f-1]);u.children=[m],u.result=h*m.result}}break}case"mergesort":case"ms":{const h=l[0];if(h<=1)u.result=h,u.call=`ms(${h})`;else{u.call=`ms(${h})`;const f=Math.floor(h/2),g=s("ms",[f]),p=s("ms",[h-f]);u.children=[g,p],u.result=h}break}default:u.result=n}return i.set(d,u.result),u};return s(t==="fibonacci"?"fib":t==="factorial"?"fact":t==="mergesort"?"ms":t==="power"?"pow":t,t==="power"?[2,n]:[n])}_layoutTree(t){let n=0;const i=(s,a)=>{if(s.y=a,s.children.length===0)s.x=n++;else{for(const o of s.children)i(o,a+1);s.x=s.children.reduce((o,c)=>o+c.x,0)/s.children.length}};i(t,0)}_generateSteps(t,n,i,s){const a=this._allNodes.indexOf(t);if(i&&n.has(t.call)){this._steps.push({nodeIdx:a,action:"show",edgeFrom:s}),this._steps.push({nodeIdx:a,action:"memo"});return}this._steps.push({nodeIdx:a,action:"show",edgeFrom:s}),this._steps.push({nodeIdx:a,action:"activate"});for(const o of t.children)this._generateSteps(o,n,i,a);this._steps.push({nodeIdx:a,action:"compute"}),i&&n.set(t.call,!0)}_doStep(){if(this._stepIdx>=this._steps.length-1){this._playing=!1,this._renderView();return}this._stepIdx++;const t=this._steps[this._stepIdx],n=this._allNodes[t.nodeIdx];switch(t.action){case"show":n.state="pending";break;case"activate":n.state="active";break;case"compute":n.state="computed";break;case"memo":n.state="memo";break}this._renderView()}_play(){if(this._playing){this._playing=!1,this._timer&&clearTimeout(this._timer),this._renderView();return}this._playing=!0;const t=parseInt(this.getAttribute("speed")||"400",10),n=()=>{if(!this._playing||this._stepIdx>=this._steps.length-1){this._playing=!1,this._renderView();return}this._doStep(),this._timer=setTimeout(n,t)};n()}_reset(){this._playing=!1,this._timer&&clearTimeout(this._timer),this._stepIdx=-1,this._allNodes.forEach(t=>t.state="hidden"),this._renderView()}_renderView(){var y,w,S;if(!this._root)return;const t=this._allNodes;let n=0,i=0;for(const $ of t)$.x>n&&(n=$.x),$.y>i&&(i=$.y);const s=60,a=40,o=Math.max(70,Math.min(110,600/(n+1))),c=70,l=(n+1)*o+s*2,d=(i+1)*c+a*2,u=56,h=32,f=$=>s+$.x*o+o/2,g=$=>a+$.y*c+c/2;let p="";for(const $ of t)if($.state!=="hidden")for(const k of $.children){if(k.state==="hidden")continue;const A=k.state==="active",T=A?"var(--lv-accent)":"var(--lv-border)";p+=`<line x1="${f($)}" y1="${g($)+h/2}" x2="${f(k)}" y2="${g(k)-h/2}" stroke="${T}" stroke-width="${A?2:1.5}"/>`}let m="";const b={hidden:{fill:"transparent",stroke:"transparent"},pending:{fill:"var(--lv-bg-card)",stroke:"var(--lv-border)"},active:{fill:"rgba(59,130,246,0.15)",stroke:"#3b82f6"},computed:{fill:"rgba(34,197,94,0.15)",stroke:"#22c55e"},memo:{fill:"rgba(234,179,8,0.2)",stroke:"#eab308"}};for(const $ of t){if($.state==="hidden")continue;const k=f($),A=g($),T=b[$.state];m+=`<g>
        <rect x="${k-u/2}" y="${A-h/2}" width="${u}" height="${h}" rx="6" ry="6"
          fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.5"/>
        <text x="${k}" y="${A-2}" text-anchor="middle" font-size="10" fill="var(--lv-text)">${this._esc($.call)}</text>`,($.state==="computed"||$.state==="memo")&&(m+=`<text x="${k}" y="${A+12}" text-anchor="middle" font-size="10" font-weight="600"
          fill="${$.state==="memo"?"#eab308":"#22c55e"}">${$.state==="memo"?"memo: ":"= "}${$.result}</text>`),m+="</g>"}let x="";if(this._stepIdx>=0&&this._stepIdx<this._steps.length){const $=this._steps[this._stepIdx],k=t[$.nodeIdx];$.action==="activate"?x=`Calling ${k.call}...`:$.action==="compute"?x=`${k.call} returns ${k.result}`:$.action==="memo"&&(x=`Memo hit! ${k.call} = ${k.result}`)}this._stepIdx>=this._steps.length-1&&this._stepIdx>=0&&(x="Recursion complete.");const v=this._stepIdx>=this._steps.length-1,_=`<div class="rt-container">
      <svg viewBox="0 0 ${l} ${d}" xmlns="http://www.w3.org/2000/svg" style="max-width:${Math.min(l,800)}px;">
        ${p}
        ${m}
      </svg>
      <div class="info">${x}</div>
      <div class="controls">
        <button id="btn-reset">Reset</button>
        <button id="btn-play">${this._playing?"Pause":"Play"}</button>
        <button id="btn-step" ${v?"disabled":""}>Step</button>
      </div>
      <div class="legend">
        <span><span class="dot" style="background:#888"></span> Pending</span>
        <span><span class="dot" style="background:#3b82f6"></span> Active</span>
        <span><span class="dot" style="background:#22c55e"></span> Computed</span>
        ${this.hasAttribute("show-memo")?'<span><span class="dot" style="background:#eab308"></span> Memo</span>':""}
      </div>
    </div>`;this.render(_),(y=this.root.getElementById("btn-play"))==null||y.addEventListener("click",()=>this._play()),(w=this.root.getElementById("btn-step"))==null||w.addEventListener("click",()=>this._doStep()),(S=this.root.getElementById("btn-reset"))==null||S.addEventListener("click",()=>this._reset())}_esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-recursion-tree",D_),R.LvBaseElement=D,R.clamp=Fs,R.colorScale=Ns,R.formatNum=Ds,R.getToken=sc,R.lerp=ze,R.loadScript=Os,R.loadStylesheet=ic,R.scrollAnimator=Gr,R.setTheme=ac,R.simColorScale=ec,R.uid=rc,Object.defineProperty(R,Symbol.toStringTag,{value:"Module"})}));

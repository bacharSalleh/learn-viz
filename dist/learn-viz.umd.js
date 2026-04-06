(function(F,X){typeof exports=="object"&&typeof module<"u"?X(exports,require("roughjs"),require("three"),require("three/examples/jsm/controls/OrbitControls.js")):typeof define=="function"&&define.amd?define(["exports","roughjs","three","three/examples/jsm/controls/OrbitControls.js"],X):(F=typeof globalThis<"u"?globalThis:F||self,X(F.LearnViz={},F.rough,F.THREE,F.THREE))})(this,(function(F,X,st,tn){"use strict";var Rm=Object.defineProperty;var Bl=F=>{throw TypeError(F)};var Nm=(F,X,st)=>X in F?Rm(F,X,{enumerable:!0,configurable:!0,writable:!0,value:st}):F[X]=st;var D=(F,X,st)=>Nm(F,typeof X!="symbol"?X+"":X,st),Hl=(F,X,st)=>X.has(F)||Bl("Cannot "+st);var Qe=(F,X,st)=>(Hl(F,X,"read from private field"),st?st.call(F):X.get(F)),qr=(F,X,st)=>X.has(F)?Bl("Cannot add the same private member more than once"):X instanceof WeakSet?X.add(F):X.set(F,st),Je=(F,X,st,tn)=>(Hl(F,X,"write to private field"),tn?tn.call(F,st):X.set(F,st),st);var Ze,Nn,he;function Vl(n){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(n){for(const e in n)if(e!=="default"){const r=Object.getOwnPropertyDescriptor(n,e);Object.defineProperty(t,e,r.get?r:{enumerable:!0,get:()=>n[e]})}}return t.default=n,Object.freeze(t)}const V=Vl(st);class Xl{constructor(){qr(this,Ze);qr(this,Nn,new WeakSet);Je(this,Ze,new IntersectionObserver(t=>{for(const e of t)if(e.isIntersecting&&!Qe(this,Nn).has(e.target)){Qe(this,Nn).add(e.target);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=e.target;typeof i.animateIn=="function"&&(r?i.animateIn(!0):i.animateIn(!1))}},{threshold:.15}))}observe(t){Qe(this,Ze).observe(t)}unobserve(t){Qe(this,Ze).unobserve(t)}}Ze=new WeakMap,Nn=new WeakMap;const Br=new Xl;class q extends HTMLElement{constructor(){super();D(this,"root");qr(this,he,!1);this.root=this.attachShadow({mode:"open"})}get dir(){var e;return((e=this.closest("[dir]"))==null?void 0:e.getAttribute("dir"))||document.documentElement.dir||"ltr"}get isRtl(){return this.dir==="rtl"}adoptStyles(e){const r=new CSSStyleSheet;r.replaceSync(e),this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,r]}jsonAttr(e,r){const i=this.getAttribute(e);if(!i)return r;const s=i.replace(/\u2212/g,"-");try{return JSON.parse(s)}catch{return r}}render(e){Je(this,he,!0),this.root.innerHTML=e,Je(this,he,!1)}attributeChangedCallback(e,r,i){Qe(this,he)||(Je(this,he,!0),this.handleAttributeChange(e,r,i),Je(this,he,!1))}handleAttributeChange(e,r,i){}animateIn(e){}connectedCallback(){Br.observe(this)}disconnectedCallback(){Br.unobserve(this)}}he=new WeakMap;function Ee(n,t,e){return n+(t-n)*e}function Es(n,t,e){return Math.min(Math.max(n,t),e)}function Ls(n){n=Es(n,0,1);const t=n<.5?Math.round(Ee(0,255,n*2)):255,e=n<.5?Math.round(Ee(200,230,n*2)):Math.round(Ee(230,50,(n-.5)*2)),r=n<.5?Math.round(Ee(83,60,n*2)):Math.round(Ee(60,80,(n-.5)*2));return`rgb(${t},${e},${r})`}function Yl(n){return Ls((1-n)/2)}function Ps(n){return Number.isInteger(n)?n.toString():Math.abs(n)>=100?n.toFixed(0):Math.abs(n)>=1?n.toFixed(1):n.toFixed(2)}let Gl=0;function Wl(n="lv"){return`${n}-${++Gl}`}const Hr=new Map,Vr=new Map;function zs(n){let t=Hr.get(n);return t||(t=new Promise((e,r)=>{const i=document.createElement("script");i.src=n,i.onload=()=>e(),i.onerror=()=>{Hr.delete(n),r(new Error(`Failed to load ${n}`))},document.head.appendChild(i)}),Hr.set(n,t),t)}function jl(n){let t=Vr.get(n);return t||(t=new Promise((e,r)=>{const i=document.createElement("link");i.rel="stylesheet",i.href=n,i.onload=()=>e(),i.onerror=()=>{Vr.delete(n),r(new Error(`Failed to load ${n}`))},document.head.appendChild(i)}),Vr.set(n,t),t)}function Ul(n,t){const e=t||document.documentElement;return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim()}function Kl(n,t){n.setAttribute("data-theme",t)}const Zl=`
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
`;class Ql extends q{static get observedAttributes(){return["theme","dir"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Zl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("dir")||"ltr";this.setAttribute("dir",t);const e=this.getAttribute("theme")||"dark";this.setAttribute("data-theme",e),this.render("<slot></slot>")}}customElements.define("lv-page",Ql);const Jl=`
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
`;class tc extends q{static get observedAttributes(){return["number","title","subtitle","gradient"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Jl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("number")||"",e=this.getAttribute("title")||"",r=this.getAttribute("subtitle")||"",i=this.getAttribute("gradient")||"",s=i?`background: ${i};`:"";this.render(`
      <div class="hero" style="${s}">
        ${t?`<div class="number">${t}</div>`:""}
        <div class="content">
          <h1>${e}</h1>
          ${r?`<p class="subtitle">${r}</p>`:""}
        </div>
      </div>
    `)}}customElements.define("lv-hero",tc);const ec=`
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
`;class nc extends q{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ec),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("title")||"";this.render(`
      ${t?`<h2>${t}</h2>`:""}
      <slot></slot>
    `)}}customElements.define("lv-section",nc);const rc=`
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
`;class ic extends q{static get observedAttributes(){return["variant"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(rc),this._render()}handleAttributeChange(){this._render()}_render(){this.root.querySelector(".card")||this.render('<div class="card"><slot></slot></div>')}}customElements.define("lv-card",ic);const sc=`
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
`;class ac extends q{static get observedAttributes(){return["cols","gap"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(sc),this._render()}handleAttributeChange(){this.root.querySelector(".grid")||this._render()}_render(){this.render('<div class="grid"><slot></slot></div>')}}customElements.define("lv-grid",ac);const oc=`
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
`;class lc extends q{static get observedAttributes(){return["label","active"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(oc),this.render("<slot></slot>"),this.setAttribute("role","tabpanel")}handleAttributeChange(){}}customElements.define("lv-tab",lc);const cc=`
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
`;class uc extends q{constructor(){super(...arguments);D(this,"_tabs",[]);D(this,"_buttons",[]);D(this,"_activeIndex",0)}connectedCallback(){super.connectedCallback(),this.adoptStyles(cc),requestAnimationFrame(()=>this._setup())}_setup(){if(this._tabs=Array.from(this.querySelectorAll("lv-tab")),this._tabs.length===0)return;const e=this._tabs.findIndex(s=>s.hasAttribute("active"));this._activeIndex=e>=0?e:0;const r=this._tabs.map((s,a)=>{const o=s.getAttribute("label")||`Tab ${a+1}`,c=a===this._activeIndex;return`<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c?"0":"-1"}"
        data-index="${a}"
      >${o}</button>`}).join("");this.render(`
      <div class="tablist" role="tablist">${r}</div>
      <div class="panels"><slot></slot></div>
    `),this._buttons=Array.from(this.root.querySelectorAll(".tab-btn")),this._activate(this._activeIndex);const i=this.root.querySelector(".tablist");i.addEventListener("click",s=>{const a=s.target.closest(".tab-btn");a&&this._activate(Number(a.dataset.index))}),i.addEventListener("keydown",(s=>{const a=this._buttons.length;let o=this._activeIndex;switch(s.key){case"ArrowRight":case"ArrowDown":s.preventDefault(),o=(o+1)%a;break;case"ArrowLeft":case"ArrowUp":s.preventDefault(),o=(o-1+a)%a;break;case"Home":s.preventDefault(),o=0;break;case"End":s.preventDefault(),o=a-1;break;case"Enter":case" ":s.preventDefault(),this._activate(o);return;default:return}this._buttons[o].focus(),this._activate(o)}))}_activate(e){this._activeIndex=e,this._buttons.forEach((r,i)=>{const s=i===e;r.setAttribute("aria-selected",String(s)),r.setAttribute("tabindex",s?"0":"-1")}),this._tabs.forEach((r,i)=>{i===e?r.setAttribute("active",""):r.removeAttribute("active")})}}customElements.define("lv-tabs",uc);const hc=`
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
`;class fc extends q{static get observedAttributes(){return["prev","prev-label","next","next-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(hc),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("prev")||"",e=this.getAttribute("prev-label")||"Previous",r=this.getAttribute("next")||"",i=this.getAttribute("next-label")||"Next",s=this.isRtl,a=s?"→":"←",o=s?"←":"→";this.render(`
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
    `)}}customElements.define("lv-nav",fc);const dc=`
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
`;class pc extends q{static get observedAttributes(){return["vs"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(dc),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("vs"),e=t!==null,r=t||"VS";e?this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${r}</div>
          <slot name="right"></slot>
        </div>
      `):this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `)}}customElements.define("lv-comparison",pc);const gc=`
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
`,mc=`
  <div class="val"></div>
  <div class="label"></div>
`;class _c extends q{constructor(){super(...arguments);D(this,"_observer",null)}static get observedAttributes(){return["value","label","prefix","suffix","color","animated"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(gc),this.render(mc),this._update(),this._setupObserver()}disconnectedCallback(){var e,r;(e=super.disconnectedCallback)==null||e.call(this),(r=this._observer)==null||r.disconnect(),this._observer=null}handleAttributeChange(e,r,i){this.root.querySelector(".val")&&this._update()}_update(){const e=this.getAttribute("color");e&&(this.style.setProperty("--_color",e),this.style.setProperty("--_glow",e));const r=this.root.querySelector(".label");r&&(r.textContent=this.getAttribute("label")||"");const i=this.root.querySelector(".val");if(i){const s=this.getAttribute("prefix")||"",a=this.getAttribute("suffix")||"",o=this.getAttribute("value")||"";i.textContent=s+o+a}}_setupObserver(){this.hasAttribute("animated")&&(this._observer=new IntersectionObserver(e=>{var r;for(const i of e)i.isIntersecting&&(this.animateIn(!1),(r=this._observer)==null||r.unobserve(this))},{threshold:.1}),this._observer.observe(this))}animateIn(e){if(!this.hasAttribute("animated")||e)return;const r=parseFloat(this.getAttribute("value")||"0");if(isNaN(r))return;const i=1200,s=performance.now(),a=this.root.querySelector(".val"),o=c=>{const l=Math.min((c-s)/i,1),u=1-Math.pow(1-l,3),h=r*u;a.textContent=(this.getAttribute("prefix")||"")+Ps(h)+(this.getAttribute("suffix")||""),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}customElements.define("lv-metric",_c);const Os={info:{color:"var(--lv-info, #3b82f6)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
    </svg>`}},vc=`
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
`;class yc extends q{static get observedAttributes(){return["type","title"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(vc),this._render()}handleAttributeChange(t,e,r){this.root.querySelector(".callout")&&this._render()}_getType(){const t=this.getAttribute("type");return Os[t]?t:"info"}_render(){const t=this._getType(),e=Os[t],r=this.getAttribute("title")||"";this.style.setProperty("--_type-color",e.color),this.style.setProperty("--_type-bg",`color-mix(in srgb, ${e.color} 8%, transparent)`);const i=`
      <div class="callout" role="note">
        <div class="header">
          ${e.icon}
          ${r?`<span class="title">${r}</span>`:""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;this.render(i)}}customElements.define("lv-callout",yc);const xc=`
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
`,bc=`
  <span class="badge"><slot></slot></span>
`;class wc extends q{static get observedAttributes(){return["color","variant"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(xc),this.render(bc),this._updateColor()}handleAttributeChange(t,e,r){t==="color"&&this._updateColor()}_updateColor(){const t=this.getAttribute("color");t?this.style.setProperty("--_color",t):this.style.removeProperty("--_color")}}customElements.define("lv-badge",wc);const kc=`
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`,Rs="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",Ac="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";let Dn=null;function $c(){return window.katex?Promise.resolve():Dn||(Dn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=Rs,document.head.appendChild(e);const r=document.createElement("script");r.src=Ac,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load KaTeX")),document.head.appendChild(r)}),Dn)}class Cc extends q{constructor(){super(...arguments);D(this,"_source","")}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(kc),this._render()}async _render(){try{await $c();const e=this.hasAttribute("display"),r=window.katex.renderToString(this._source,{displayMode:e,throwOnError:!1});this.root.innerHTML=`<link rel="stylesheet" href="${Rs}"><span class="katex-container">${r}</span>`}catch{this.root.innerHTML=`<span class="fallback">${this._escapeHtml(this._source)}</span>`}}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-math",Cc);const Sc=`
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
`,Tc="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js",Ns="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";let Fn=null;function Mc(){return window.hljs?Promise.resolve():Fn||(Fn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=Ns,document.head.appendChild(e);const r=document.createElement("script");r.src=Tc,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load highlight.js")),document.head.appendChild(r)}),Fn)}class Ec extends q{constructor(){super(...arguments);D(this,"_source","")}static get observedAttributes(){return["language","line-numbers"]}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(Sc),this._render()}async _render(){const e=this.getAttribute("language")||"",r=this.hasAttribute("line-numbers");let i;try{await Mc();const a=window.hljs;e&&a.getLanguage(e)?i=a.highlight(this._source,{language:e}).value:i=a.highlightAuto(this._source).value}catch{i=this._escapeHtml(this._source)}let s;r?s=i.split(`
`).map((o,c)=>`<span class="line-num">${c+1}</span>${o}`).join(`
`):s=i,this.root.innerHTML=`<link rel="stylesheet" href="${Ns}"><div class="code-block"><pre><code>${s}</code></pre></div>`}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-code",Ec);const Lc=`
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
`;class Pc extends q{static get observedAttributes(){return["data","labels","highlight"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Lc),this._render()}handleAttributeChange(){this.root&&this._render()}_render(){var h;const t=this.jsonAttr("data",[]),e=this.jsonAttr("labels",{}),r=this.jsonAttr("highlight",[]);if(!t.length){this.root.innerHTML="";return}const i=t.length,s=((h=t[0])==null?void 0:h.length)||0,a=!!(e.rows&&e.rows.length),o=!!(e.cols&&e.cols.length),c=new Set(r.map(([f,d])=>`${f},${d}`)),l=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;let u='<div class="matrix-wrapper">';if(o){const f=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;u+=`<div class="col-labels" style="grid-template-columns: ${f}">`,a&&(u+="<span></span>");for(let d=0;d<s;d++)u+=`<span class="col-label">${this._escapeHtml(e.cols[d]||"")}</span>`;u+="</div>"}u+=`<div class="matrix" style="grid-template-columns: ${l}">`,u+='<div class="bracket-left"></div>',u+='<div class="bracket-right"></div>';for(let f=0;f<i;f++){a&&(u+=`<span class="row-label">${this._escapeHtml(e.rows[f]||"")}</span>`);for(let d=0;d<s;d++){const g=t[f][d],p=typeof g=="number"?this._formatNum(g):String(g),_=c.has(`${f},${d}`);u+=`<span class="cell${_?" highlight":""}">${p}</span>`}}u+="</div></div>",this.root.innerHTML=u}_formatNum(t){return t.toFixed(3).replace(/0$/,"")}_escapeHtml(t){const e=document.createElement("span");return e.textContent=t,e.innerHTML}}customElements.define("lv-matrix",Pc);const zc=`
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
`;class Oc extends q{constructor(){super(...arguments);D(this,"_answered",!1)}static get observedAttributes(){return["question","options","correct","explanation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(zc),this._render(),this._attachListeners()}handleAttributeChange(){this._answered||(this._render(),this._attachListeners())}get _options(){return this.jsonAttr("options",[])}get _correctIndex(){return parseInt(this.getAttribute("correct")||"0",10)}_render(){const e=this.getAttribute("question")||"",r=this._options,i=this.getAttribute("explanation")||"",s=r.map((a,o)=>`
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");this.render(`
      <div class="question">${e}</div>
      <div class="options">${s}</div>
      ${i?`<div class="explanation"><div class="explanation-inner">${i}</div></div>`:""}
    `)}_attachListeners(){this.root.querySelectorAll(".option").forEach(r=>{r.addEventListener("click",()=>this._select(r)),r.addEventListener("keydown",i=>{const s=i.key;(s==="Enter"||s===" ")&&(i.preventDefault(),this._select(r))})})}_select(e){if(this._answered)return;this._answered=!0;const r=parseInt(e.dataset.index||"0",10),i=this._correctIndex,s=r===i;this.root.querySelectorAll(".option").forEach((c,l)=>{const u=c;u.removeAttribute("tabindex"),l===i?(u.classList.add("correct"),u.querySelector(".icon").textContent="✓"):l===r&&!s?(u.classList.add("wrong"),u.querySelector(".icon").textContent="✗"):u.classList.add("dimmed")});const o=this.root.querySelector(".explanation");o&&requestAnimationFrame(()=>o.classList.add("visible")),this.dispatchEvent(new CustomEvent("lv-quiz-answer",{bubbles:!0,composed:!0,detail:{correct:s,selected:r,answer:i}}))}}customElements.define("lv-quiz",Oc);const Rc=`
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
`;class Nc extends q{constructor(){super(...arguments);D(this,"_revealed",!1)}static get observedAttributes(){return["label","revealed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Rc),this._render(),this._attachListeners(),this.hasAttribute("revealed")&&this._reveal(!1)}handleAttributeChange(e){if(e==="revealed"&&this.hasAttribute("revealed")&&!this._revealed&&this._reveal(!0),e==="label"){const r=this.root.querySelector(".trigger-label");r&&(r.textContent=this._label)}}get _label(){return this.getAttribute("label")||"اضغط للإظهار"}_render(){this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `)}_attachListeners(){const e=this.root.querySelector(".trigger");e.addEventListener("click",()=>this._reveal(!0)),e.addEventListener("keydown",r=>{const i=r.key;(i==="Enter"||i===" ")&&(r.preventDefault(),this._reveal(!0))})}_reveal(e){if(this._revealed)return;this._revealed=!0;const r=this.root.querySelector(".trigger"),i=this.root.querySelector(".content");r.setAttribute("aria-expanded","true"),e?(r.classList.add("hidden"),setTimeout(()=>i.classList.add("visible"),150)):(r.classList.add("hidden"),i.classList.add("visible"))}}customElements.define("lv-reveal",Nc);const Dc=`
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
`;class Fc extends q{constructor(){super(...arguments);D(this,"_input",null);D(this,"_valueEl",null);D(this,"_popTimeout",null)}static get observedAttributes(){return["min","max","step","value","label","name","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Dc),this._render(),this._bind(),this._updateTrack()}handleAttributeChange(){this._input&&(this._render(),this._bind(),this._updateTrack())}get _min(){return parseFloat(this.getAttribute("min")||"0")}get _max(){return parseFloat(this.getAttribute("max")||"100")}get _step(){return this.getAttribute("step")||"1"}get _value(){return this.getAttribute("value")||"50"}get _label(){return this.getAttribute("label")||""}get _name(){return this.getAttribute("name")||""}get _color(){return this.getAttribute("color")||""}_render(){const e=this._color?`--fill-color: ${this._color};`:"";this.render(`
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
    `),this._input=this.root.querySelector("input"),this._valueEl=this.root.querySelector(".value-display")}_bind(){this._input&&this._input.addEventListener("input",()=>{const e=this._input.value;this._valueEl&&(this._valueEl.textContent=e,this._valueEl.classList.add("pop"),this._popTimeout&&clearTimeout(this._popTimeout),this._popTimeout=window.setTimeout(()=>{var r;(r=this._valueEl)==null||r.classList.remove("pop")},150)),this._updateTrack(),this.dispatchEvent(new CustomEvent("lv-change",{bubbles:!0,composed:!0,detail:{name:this._name,value:parseFloat(e)}}))})}_updateTrack(){if(!this._input)return;const e=this._min,r=this._max,s=(parseFloat(this._input.value)-e)/(r-e)*100,o=`linear-gradient(to right, ${this._color||"var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;this._input.style.setProperty("--track-bg",o),this._input.style.background=o,this._input.style.borderRadius="9999px"}}customElements.define("lv-slider",Fc);const Ic=`
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
`;class qc extends q{static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ic),this._render(),this._bind()}_render(){this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `)}_bind(){this.addEventListener("lv-change",()=>{const t=this._collectParams();this.dispatchEvent(new CustomEvent("lv-params-change",{bubbles:!0,composed:!0,detail:t}))})}_collectParams(){const t=this.querySelectorAll('lv-slider[slot="controls"]'),e={};return t.forEach(r=>{var s;const i=r.getAttribute("name");if(i){const a=(s=r.root)==null?void 0:s.querySelector("input"),o=parseFloat(a?a.value:r.getAttribute("value")||"0");e[i]=o}}),e}}customElements.define("lv-playground",qc);const Bc=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];function Ds(n){return String(n).split("").map(t=>Bc[parseInt(t)]??t).join("")}const Hc=`
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
`;class Vc extends q{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Hc),this._render()}handleAttributeChange(){this.root.querySelector(".title")&&this._render()}get _title(){return this.getAttribute("title")||""}_render(){this.render(`
      ${this._title?`<div class="title">${this._title}</div>`:""}
      <slot></slot>
    `)}}customElements.define("lv-step",Vc);const Xc=`
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
`;class Yc extends q{constructor(){super(...arguments);D(this,"_current",0);D(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(Xc),this._render(),requestAnimationFrame(()=>{this._steps=Array.from(this.querySelectorAll("lv-step")),this._showStep(0,null),this._bind()})}get _total(){return this._steps.length}_render(){this.render(`
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
    `)}_bind(){const e=this.root.querySelector(".prev"),r=this.root.querySelector(".next");e.addEventListener("click",()=>this._go(-1)),r.addEventListener("click",()=>this._go(1)),this.addEventListener("keydown",i=>{i.key==="ArrowRight"?(i.preventDefault(),this._go(this.isRtl?-1:1)):i.key==="ArrowLeft"&&(i.preventDefault(),this._go(this.isRtl?1:-1))}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_go(e){const r=this._current+e;r<0||r>=this._total||(this._current,this._current=r,this._showStep(r,e>0?"forward":"backward"))}_showStep(e,r){this._steps.forEach((o,c)=>{o.classList.remove("active","from-start","from-end"),c===e&&(o.classList.add("active"),r==="forward"?o.classList.add(this.isRtl?"from-start":"from-end"):r==="backward"&&o.classList.add(this.isRtl?"from-end":"from-start"))});const i=this.root.querySelector(".counter");i&&(i.textContent=`${Ds(e+1)} / ${Ds(this._total)}`);const s=this.root.querySelector(".prev"),a=this.root.querySelector(".next");s&&(s.disabled=e===0),a&&(a.disabled=e===this._total-1)}}customElements.define("lv-stepper",Yc);const Gc=["#00d4ff","#7b68ee","#00c853","#ff9800","#ff2d75","#ffd93d","#69f0ae","#ff6b9d"],Wc=`
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
`;class jc extends q{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","direction","sorted"]}get data(){return this._data}set data(e){if(typeof e=="string")try{this._data=JSON.parse(e)}catch{this._data=[]}else this._data=e;this._buildChart()}connectedCallback(){super.connectedCallback(),this.adoptStyles(Wc),this._data=this.jsonAttr("data",[]),this._buildChart()}handleAttributeChange(e){e==="data"&&(this._data=this.jsonAttr("data",[])),this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;this.root.querySelectorAll(".bar-fill").forEach((i,s)=>{const a=i,o=a.dataset.width||"0%";a.classList.add("animate"),setTimeout(()=>{a.classList.remove("animate"),a.style.width=o},s*80+50)})}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Gc[e%8]}_buildChart(){const e=this.hasAttribute("sorted")?[...this._data].sort((s,a)=>a.value-s.value):[...this._data];if(!e.length){this.render('<div class="bar-list"></div>');return}const r=Math.max(...e.map(s=>s.value),.001),i=e.map((s,a)=>{const o=s.value/r*100,c=this._getColor(a,s),l=s.tagColor||c,u=typeof s.value=="number"?s.value%1?s.value.toFixed(2):s.value.toString():s.value;return`
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
      `}).join("");this.render(`<div class="bar-list">${i}</div>`),this._hasAnimated&&this.root.querySelectorAll(".bar-fill").forEach(s=>{const a=s;a.style.width=a.dataset.width||"0%"})}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-bar-chart",jc);function In(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Uc(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Xr(n){let t,e,r;n.length!==2?(t=In,e=(o,c)=>In(n(o),c),r=(o,c)=>n(o)-c):(t=n===In||n===Uc?n:Kc,e=n,r=n);function i(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<0?l=h+1:u=h}while(l<u)}return l}function s(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function a(o,c,l=0,u=o.length){const h=i(o,c,l,u-1);return h>l&&r(o[h-1],c)>-r(o[h],c)?h-1:h}return{left:i,center:a,right:s}}function Kc(){return 0}function Zc(n){return n===null?NaN:+n}const Qc=Xr(In).right;Xr(Zc).center;function qn(n,t){let e,r;if(t===void 0)for(const i of n)i!=null&&(e===void 0?i>=i&&(e=r=i):(e>i&&(e=i),r<i&&(r=i)));else{let i=-1;for(let s of n)(s=t(s,++i,n))!=null&&(e===void 0?s>=s&&(e=r=s):(e>s&&(e=s),r<s&&(r=s)))}return[e,r]}const Jc=Math.sqrt(50),tu=Math.sqrt(10),eu=Math.sqrt(2);function Bn(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),a=s>=Jc?10:s>=tu?5:s>=eu?2:1;let o,c,l;return i<0?(l=Math.pow(10,-i)/a,o=Math.round(n*l),c=Math.round(t*l),o/l<n&&++o,c/l>t&&--c,l=-l):(l=Math.pow(10,i)*a,o=Math.round(n/l),c=Math.round(t/l),o*l<n&&++o,c*l>t&&--c),c<o&&.5<=e&&e<2?Bn(n,t,e*2):[o,c,l]}function nu(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,s,a]=r?Bn(t,n,e):Bn(n,t,e);if(!(s>=i))return[];const o=s-i+1,c=new Array(o);if(r)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(i+l)/-a;else for(let l=0;l<o;++l)c[l]=(i+l)*a;return c}function Yr(n,t,e){return t=+t,n=+n,e=+e,Bn(n,t,e)[2]}function ru(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?Yr(t,n,e):Yr(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function Fs(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function iu(n,t){let e;for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);return e}function su(n){return n}var Gr=1,Wr=2,jr=3,en=4,Is=1e-6;function au(n){return"translate("+n+",0)"}function ou(n){return"translate(0,"+n+")"}function lu(n){return t=>+n(t)}function cu(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function uu(){return!this.__axis}function qs(n,t){var e=[],r=null,i=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===Gr||n===en?-1:1,u=n===en||n===Wr?"x":"y",h=n===Gr||n===jr?au:ou;function f(d){var g=r??(t.ticks?t.ticks.apply(t,e):t.domain()),p=i??(t.tickFormat?t.tickFormat.apply(t,e):su),_=Math.max(s,0)+o,x=t.range(),b=+x[0]+c,v=+x[x.length-1]+c,m=(t.bandwidth?cu:lu)(t.copy(),c),w=d.selection?d.selection():d,A=w.selectAll(".domain").data([null]),S=w.selectAll(".tick").data(g,t).order(),C=S.exit(),y=S.enter().append("g").attr("class","tick"),$=S.select("line"),E=S.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),S=S.merge(y),$=$.merge(y.append("line").attr("stroke","currentColor").attr(u+"2",l*s)),E=E.merge(y.append("text").attr("fill","currentColor").attr(u,l*_).attr("dy",n===Gr?"0em":n===jr?"0.71em":"0.32em")),d!==w&&(A=A.transition(d),S=S.transition(d),$=$.transition(d),E=E.transition(d),C=C.transition(d).attr("opacity",Is).attr("transform",function(T){return isFinite(T=m(T))?h(T+c):this.getAttribute("transform")}),y.attr("opacity",Is).attr("transform",function(T){var M=this.parentNode.__axis;return h((M&&isFinite(M=M(T))?M:m(T))+c)})),C.remove(),A.attr("d",n===en||n===Wr?a?"M"+l*a+","+b+"H"+c+"V"+v+"H"+l*a:"M"+c+","+b+"V"+v:a?"M"+b+","+l*a+"V"+c+"H"+v+"V"+l*a:"M"+b+","+c+"H"+v),S.attr("opacity",1).attr("transform",function(T){return h(m(T)+c)}),$.attr(u+"2",l*s),E.attr(u,l*_).text(p),w.filter(uu).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===Wr?"start":n===en?"end":"middle"),w.each(function(){this.__axis=m})}return f.scale=function(d){return arguments.length?(t=d,f):t},f.ticks=function(){return e=Array.from(arguments),f},f.tickArguments=function(d){return arguments.length?(e=d==null?[]:Array.from(d),f):e.slice()},f.tickValues=function(d){return arguments.length?(r=d==null?null:Array.from(d),f):r&&r.slice()},f.tickFormat=function(d){return arguments.length?(i=d,f):i},f.tickSize=function(d){return arguments.length?(s=a=+d,f):s},f.tickSizeInner=function(d){return arguments.length?(s=+d,f):s},f.tickSizeOuter=function(d){return arguments.length?(a=+d,f):a},f.tickPadding=function(d){return arguments.length?(o=+d,f):o},f.offset=function(d){return arguments.length?(c=+d,f):c},f}function Hn(n){return qs(jr,n)}function Vn(n){return qs(en,n)}var hu={value:()=>{}};function Ur(){for(var n=0,t=arguments.length,e={},r;n<t;++n){if(!(r=arguments[n]+"")||r in e||/[\s.]/.test(r))throw new Error("illegal type: "+r);e[r]=[]}return new Xn(e)}function Xn(n){this._=n}function fu(n,t){return n.trim().split(/^|\s+/).map(function(e){var r="",i=e.indexOf(".");if(i>=0&&(r=e.slice(i+1),e=e.slice(0,i)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:r}})}Xn.prototype=Ur.prototype={constructor:Xn,on:function(n,t){var e=this._,r=fu(n+"",e),i,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((i=(n=r[s]).type)&&(i=du(e[i],n.name)))return i;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(i=(n=r[s]).type)e[i]=Bs(e[i],n.name,t);else if(t==null)for(i in e)e[i]=Bs(e[i],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Xn(n)},call:function(n,t){if((i=arguments.length-2)>0)for(var e=new Array(i),r=0,i,s;r<i;++r)e[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)}};function du(n,t){for(var e=0,r=n.length,i;e<r;++e)if((i=n[e]).name===t)return i.value}function Bs(n,t,e){for(var r=0,i=n.length;r<i;++r)if(n[r].name===t){n[r]=hu,n=n.slice(0,r).concat(n.slice(r+1));break}return e!=null&&n.push({name:t,value:e}),n}var Kr="http://www.w3.org/1999/xhtml";const Hs={svg:"http://www.w3.org/2000/svg",xhtml:Kr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Yn(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),Hs.hasOwnProperty(t)?{space:Hs[t],local:n}:n}function pu(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Kr&&t.documentElement.namespaceURI===Kr?t.createElement(n):t.createElementNS(e,n)}}function gu(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Vs(n){var t=Yn(n);return(t.local?gu:pu)(t)}function mu(){}function Zr(n){return n==null?mu:function(){return this.querySelector(n)}}function _u(n){typeof n!="function"&&(n=Zr(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=new Array(a),c,l,u=0;u<a;++u)(c=s[u])&&(l=n.call(c,c.__data__,u,s))&&("__data__"in c&&(l.__data__=c.__data__),o[u]=l);return new bt(r,this._parents)}function vu(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function yu(){return[]}function Xs(n){return n==null?yu:function(){return this.querySelectorAll(n)}}function xu(n){return function(){return vu(n.apply(this,arguments))}}function bu(n){typeof n=="function"?n=xu(n):n=Xs(n);for(var t=this._groups,e=t.length,r=[],i=[],s=0;s<e;++s)for(var a=t[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(r.push(n.call(c,c.__data__,l,a)),i.push(c));return new bt(r,i)}function Ys(n){return function(){return this.matches(n)}}function Gs(n){return function(t){return t.matches(n)}}var wu=Array.prototype.find;function ku(n){return function(){return wu.call(this.children,n)}}function Au(){return this.firstElementChild}function $u(n){return this.select(n==null?Au:ku(typeof n=="function"?n:Gs(n)))}var Cu=Array.prototype.filter;function Su(){return Array.from(this.children)}function Tu(n){return function(){return Cu.call(this.children,n)}}function Mu(n){return this.selectAll(n==null?Su:Tu(typeof n=="function"?n:Gs(n)))}function Eu(n){typeof n!="function"&&(n=Ys(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new bt(r,this._parents)}function Ws(n){return new Array(n.length)}function Lu(){return new bt(this._enter||this._groups.map(Ws),this._parents)}function Gn(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}Gn.prototype={constructor:Gn,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Pu(n){return function(){return n}}function zu(n,t,e,r,i,s){for(var a=0,o,c=t.length,l=s.length;a<l;++a)(o=t[a])?(o.__data__=s[a],r[a]=o):e[a]=new Gn(n,s[a]);for(;a<c;++a)(o=t[a])&&(i[a]=o)}function Ou(n,t,e,r,i,s,a){var o,c,l=new Map,u=t.length,h=s.length,f=new Array(u),d;for(o=0;o<u;++o)(c=t[o])&&(f[o]=d=a.call(c,c.__data__,o,t)+"",l.has(d)?i[o]=c:l.set(d,c));for(o=0;o<h;++o)d=a.call(n,s[o],o,s)+"",(c=l.get(d))?(r[o]=c,c.__data__=s[o],l.delete(d)):e[o]=new Gn(n,s[o]);for(o=0;o<u;++o)(c=t[o])&&l.get(f[o])===c&&(i[o]=c)}function Ru(n){return n.__data__}function Nu(n,t){if(!arguments.length)return Array.from(this,Ru);var e=t?Ou:zu,r=this._parents,i=this._groups;typeof n!="function"&&(n=Pu(n));for(var s=i.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var u=r[l],h=i[l],f=h.length,d=Du(n.call(u,u&&u.__data__,l,r)),g=d.length,p=o[l]=new Array(g),_=a[l]=new Array(g),x=c[l]=new Array(f);e(u,h,p,_,x,d,t);for(var b=0,v=0,m,w;b<g;++b)if(m=p[b]){for(b>=v&&(v=b+1);!(w=_[v])&&++v<g;);m._next=w||null}}return a=new bt(a,r),a._enter=o,a._exit=c,a}function Du(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Fu(){return new bt(this._exit||this._groups.map(Ws),this._parents)}function Iu(n,t,e){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),t!=null&&(i=t(i),i&&(i=i.selection())),e==null?s.remove():e(s),r&&i?r.merge(i).order():i}function qu(n){for(var t=n.selection?n.selection():n,e=this._groups,r=t._groups,i=e.length,s=r.length,a=Math.min(i,s),o=new Array(i),c=0;c<a;++c)for(var l=e[c],u=r[c],h=l.length,f=o[c]=new Array(h),d,g=0;g<h;++g)(d=l[g]||u[g])&&(f[g]=d);for(;c<i;++c)o[c]=e[c];return new bt(o,this._parents)}function Bu(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var r=n[t],i=r.length-1,s=r[i],a;--i>=0;)(a=r[i])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function Hu(n){n||(n=Vu);function t(h,f){return h&&f?n(h.__data__,f.__data__):!h-!f}for(var e=this._groups,r=e.length,i=new Array(r),s=0;s<r;++s){for(var a=e[s],o=a.length,c=i[s]=new Array(o),l,u=0;u<o;++u)(l=a[u])&&(c[u]=l);c.sort(t)}return new bt(i,this._parents).order()}function Vu(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function Xu(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function Yu(){return Array.from(this)}function Gu(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length;i<s;++i){var a=r[i];if(a)return a}return null}function Wu(){let n=0;for(const t of this)++n;return n}function ju(){return!this.node()}function Uu(n){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var i=t[e],s=0,a=i.length,o;s<a;++s)(o=i[s])&&n.call(o,o.__data__,s,i);return this}function Ku(n){return function(){this.removeAttribute(n)}}function Zu(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Qu(n,t){return function(){this.setAttribute(n,t)}}function Ju(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function th(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function eh(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function nh(n,t){var e=Yn(n);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((t==null?e.local?Zu:Ku:typeof t=="function"?e.local?eh:th:e.local?Ju:Qu)(e,t))}function js(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function rh(n){return function(){this.style.removeProperty(n)}}function ih(n,t,e){return function(){this.style.setProperty(n,t,e)}}function sh(n,t,e){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,e)}}function ah(n,t,e){return arguments.length>1?this.each((t==null?rh:typeof t=="function"?sh:ih)(n,t,e??"")):Le(this.node(),n)}function Le(n,t){return n.style.getPropertyValue(t)||js(n).getComputedStyle(n,null).getPropertyValue(t)}function oh(n){return function(){delete this[n]}}function lh(n,t){return function(){this[n]=t}}function ch(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function uh(n,t){return arguments.length>1?this.each((t==null?oh:typeof t=="function"?ch:lh)(n,t)):this.node()[n]}function Us(n){return n.trim().split(/^|\s+/)}function Qr(n){return n.classList||new Ks(n)}function Ks(n){this._node=n,this._names=Us(n.getAttribute("class")||"")}Ks.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Zs(n,t){for(var e=Qr(n),r=-1,i=t.length;++r<i;)e.add(t[r])}function Qs(n,t){for(var e=Qr(n),r=-1,i=t.length;++r<i;)e.remove(t[r])}function hh(n){return function(){Zs(this,n)}}function fh(n){return function(){Qs(this,n)}}function dh(n,t){return function(){(t.apply(this,arguments)?Zs:Qs)(this,n)}}function ph(n,t){var e=Us(n+"");if(arguments.length<2){for(var r=Qr(this.node()),i=-1,s=e.length;++i<s;)if(!r.contains(e[i]))return!1;return!0}return this.each((typeof t=="function"?dh:t?hh:fh)(e,t))}function gh(){this.textContent=""}function mh(n){return function(){this.textContent=n}}function _h(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function vh(n){return arguments.length?this.each(n==null?gh:(typeof n=="function"?_h:mh)(n)):this.node().textContent}function yh(){this.innerHTML=""}function xh(n){return function(){this.innerHTML=n}}function bh(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function wh(n){return arguments.length?this.each(n==null?yh:(typeof n=="function"?bh:xh)(n)):this.node().innerHTML}function kh(){this.nextSibling&&this.parentNode.appendChild(this)}function Ah(){return this.each(kh)}function $h(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ch(){return this.each($h)}function Sh(n){var t=typeof n=="function"?n:Vs(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Th(){return null}function Mh(n,t){var e=typeof n=="function"?n:Vs(n),r=t==null?Th:typeof t=="function"?t:Zr(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function Eh(){var n=this.parentNode;n&&n.removeChild(this)}function Lh(){return this.each(Eh)}function Ph(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function zh(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Oh(n){return this.select(n?zh:Ph)}function Rh(n){return arguments.length?this.property("__data__",n):this.node().__data__}function Nh(n){return function(t){n.call(this,t,this.__data__)}}function Dh(n){return n.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");return r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),{type:t,name:e}})}function Fh(n){return function(){var t=this.__on;if(t){for(var e=0,r=-1,i=t.length,s;e<i;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++r]=s;++r?t.length=r:delete this.__on}}}function Ih(n,t,e){return function(){var r=this.__on,i,s=Nh(t);if(r){for(var a=0,o=r.length;a<o;++a)if((i=r[a]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=e),i.value=t;return}}this.addEventListener(n.type,s,e),i={type:n.type,name:n.name,value:t,listener:s,options:e},r?r.push(i):this.__on=[i]}}function qh(n,t,e){var r=Dh(n+""),i,s=r.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,u;c<l;++c)for(i=0,u=o[c];i<s;++i)if((a=r[i]).type===u.type&&a.name===u.name)return u.value}return}for(o=t?Ih:Fh,i=0;i<s;++i)this.each(o(r[i],t,e));return this}function Js(n,t,e){var r=js(n),i=r.CustomEvent;typeof i=="function"?i=new i(t,e):(i=r.document.createEvent("Event"),e?(i.initEvent(t,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(t,!1,!1)),n.dispatchEvent(i)}function Bh(n,t){return function(){return Js(this,n,t)}}function Hh(n,t){return function(){return Js(this,n,t.apply(this,arguments))}}function Vh(n,t){return this.each((typeof t=="function"?Hh:Bh)(n,t))}function*Xh(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length,a;i<s;++i)(a=r[i])&&(yield a)}var ta=[null];function bt(n,t){this._groups=n,this._parents=t}function nn(){return new bt([[document.documentElement]],ta)}function Yh(){return this}bt.prototype=nn.prototype={constructor:bt,select:_u,selectAll:bu,selectChild:$u,selectChildren:Mu,filter:Eu,data:Nu,enter:Lu,exit:Fu,join:Iu,merge:qu,selection:Yh,order:Bu,sort:Hu,call:Xu,nodes:Yu,node:Gu,size:Wu,empty:ju,each:Uu,attr:nh,style:ah,property:uh,classed:ph,text:vh,html:wh,raise:Ah,lower:Ch,append:Sh,insert:Mh,remove:Lh,clone:Oh,datum:Rh,on:qh,dispatch:Vh,[Symbol.iterator]:Xh};function nt(n){return typeof n=="string"?new bt([[document.querySelector(n)]],[document.documentElement]):new bt([[n]],ta)}function Gh(n){let t;for(;t=n.sourceEvent;)n=t;return n}function Jr(n,t){if(n=Gh(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}}return[n.pageX,n.pageY]}const Wh={passive:!1},rn={capture:!0,passive:!1};function ti(n){n.stopImmediatePropagation()}function Pe(n){n.preventDefault(),n.stopImmediatePropagation()}function jh(n){var t=n.document.documentElement,e=nt(n).on("dragstart.drag",Pe,rn);"onselectstart"in t?e.on("selectstart.drag",Pe,rn):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function Uh(n,t){var e=n.document.documentElement,r=nt(n).on("dragstart.drag",null);t&&(r.on("click.drag",Pe,rn),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}const Wn=n=>()=>n;function ei(n,{sourceEvent:t,subject:e,target:r,identifier:i,active:s,x:a,y:o,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:e,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}ei.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};function Kh(n){return!n.ctrlKey&&!n.button}function Zh(){return this.parentNode}function Qh(n,t){return t??{x:n.x,y:n.y}}function Jh(){return navigator.maxTouchPoints||"ontouchstart"in this}function tf(){var n=Kh,t=Zh,e=Qh,r=Jh,i={},s=Ur("start","drag","end"),a=0,o,c,l,u,h=0;function f(m){m.on("mousedown.drag",d).filter(r).on("touchstart.drag",_).on("touchmove.drag",x,Wh).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(m,w){if(!(u||!n.call(this,m,w))){var A=v(this,t.call(this,m,w),m,w,"mouse");A&&(nt(m.view).on("mousemove.drag",g,rn).on("mouseup.drag",p,rn),jh(m.view),ti(m),l=!1,o=m.clientX,c=m.clientY,A("start",m))}}function g(m){if(Pe(m),!l){var w=m.clientX-o,A=m.clientY-c;l=w*w+A*A>h}i.mouse("drag",m)}function p(m){nt(m.view).on("mousemove.drag mouseup.drag",null),Uh(m.view,l),Pe(m),i.mouse("end",m)}function _(m,w){if(n.call(this,m,w)){var A=m.changedTouches,S=t.call(this,m,w),C=A.length,y,$;for(y=0;y<C;++y)($=v(this,S,m,w,A[y].identifier,A[y]))&&(ti(m),$("start",m,A[y]))}}function x(m){var w=m.changedTouches,A=w.length,S,C;for(S=0;S<A;++S)(C=i[w[S].identifier])&&(Pe(m),C("drag",m,w[S]))}function b(m){var w=m.changedTouches,A=w.length,S,C;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),S=0;S<A;++S)(C=i[w[S].identifier])&&(ti(m),C("end",m,w[S]))}function v(m,w,A,S,C,y){var $=s.copy(),E=Jr(y||A,w),T,M,P;if((P=e.call(m,new ei("beforestart",{sourceEvent:A,target:f,identifier:C,active:a,x:E[0],y:E[1],dx:0,dy:0,dispatch:$}),S))!=null)return T=P.x-E[0]||0,M=P.y-E[1]||0,function k(L,z,R){var O=E,N;switch(L){case"start":i[C]=k,N=a++;break;case"end":delete i[C],--a;case"drag":E=Jr(R||z,w),N=a;break}$.call(L,m,new ei(L,{sourceEvent:z,subject:P,target:f,identifier:C,active:N,x:E[0]+T,y:E[1]+M,dx:E[0]-O[0],dy:E[1]-O[1],dispatch:$}),S)}}return f.filter=function(m){return arguments.length?(n=typeof m=="function"?m:Wn(!!m),f):n},f.container=function(m){return arguments.length?(t=typeof m=="function"?m:Wn(m),f):t},f.subject=function(m){return arguments.length?(e=typeof m=="function"?m:Wn(m),f):e},f.touchable=function(m){return arguments.length?(r=typeof m=="function"?m:Wn(!!m),f):r},f.on=function(){var m=s.on.apply(s,arguments);return m===s?f:m},f.clickDistance=function(m){return arguments.length?(h=(m=+m)*m,f):Math.sqrt(h)},f}function ni(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function ea(n,t){var e=Object.create(n.prototype);for(var r in t)e[r]=t[r];return e}function sn(){}var an=.7,jn=1/an,ze="\\s*([+-]?\\d+)\\s*",on="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Dt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ef=/^#([0-9a-f]{3,8})$/,nf=new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`),rf=new RegExp(`^rgb\\(${Dt},${Dt},${Dt}\\)$`),sf=new RegExp(`^rgba\\(${ze},${ze},${ze},${on}\\)$`),af=new RegExp(`^rgba\\(${Dt},${Dt},${Dt},${on}\\)$`),of=new RegExp(`^hsl\\(${on},${Dt},${Dt}\\)$`),lf=new RegExp(`^hsla\\(${on},${Dt},${Dt},${on}\\)$`),na={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ni(sn,Gt,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:ra,formatHex:ra,formatHex8:cf,formatHsl:uf,formatRgb:ia,toString:ia});function ra(){return this.rgb().formatHex()}function cf(){return this.rgb().formatHex8()}function uf(){return ca(this).formatHsl()}function ia(){return this.rgb().formatRgb()}function Gt(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=ef.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?sa(t):e===3?new dt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Un(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Un(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=nf.exec(n))?new dt(t[1],t[2],t[3],1):(t=rf.exec(n))?new dt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=sf.exec(n))?Un(t[1],t[2],t[3],t[4]):(t=af.exec(n))?Un(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=of.exec(n))?la(t[1],t[2]/100,t[3]/100,1):(t=lf.exec(n))?la(t[1],t[2]/100,t[3]/100,t[4]):na.hasOwnProperty(n)?sa(na[n]):n==="transparent"?new dt(NaN,NaN,NaN,0):null}function sa(n){return new dt(n>>16&255,n>>8&255,n&255,1)}function Un(n,t,e,r){return r<=0&&(n=t=e=NaN),new dt(n,t,e,r)}function hf(n){return n instanceof sn||(n=Gt(n)),n?(n=n.rgb(),new dt(n.r,n.g,n.b,n.opacity)):new dt}function Kn(n,t,e,r){return arguments.length===1?hf(n):new dt(n,t,e,r??1)}function dt(n,t,e,r){this.r=+n,this.g=+t,this.b=+e,this.opacity=+r}ni(dt,Kn,ea(sn,{brighter(n){return n=n==null?jn:Math.pow(jn,n),new dt(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?an:Math.pow(an,n),new dt(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new dt(fe(this.r),fe(this.g),fe(this.b),Zn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:aa,formatHex:aa,formatHex8:ff,formatRgb:oa,toString:oa}));function aa(){return`#${de(this.r)}${de(this.g)}${de(this.b)}`}function ff(){return`#${de(this.r)}${de(this.g)}${de(this.b)}${de((isNaN(this.opacity)?1:this.opacity)*255)}`}function oa(){const n=Zn(this.opacity);return`${n===1?"rgb(":"rgba("}${fe(this.r)}, ${fe(this.g)}, ${fe(this.b)}${n===1?")":`, ${n})`}`}function Zn(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function fe(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function de(n){return n=fe(n),(n<16?"0":"")+n.toString(16)}function la(n,t,e,r){return r<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new zt(n,t,e,r)}function ca(n){if(n instanceof zt)return new zt(n.h,n.s,n.l,n.opacity);if(n instanceof sn||(n=Gt(n)),!n)return new zt;if(n instanceof zt)return n;n=n.rgb();var t=n.r/255,e=n.g/255,r=n.b/255,i=Math.min(t,e,r),s=Math.max(t,e,r),a=NaN,o=s-i,c=(s+i)/2;return o?(t===s?a=(e-r)/o+(e<r)*6:e===s?a=(r-t)/o+2:a=(t-e)/o+4,o/=c<.5?s+i:2-s-i,a*=60):o=c>0&&c<1?0:a,new zt(a,o,c,n.opacity)}function df(n,t,e,r){return arguments.length===1?ca(n):new zt(n,t,e,r??1)}function zt(n,t,e,r){this.h=+n,this.s=+t,this.l=+e,this.opacity=+r}ni(zt,df,ea(sn,{brighter(n){return n=n==null?jn:Math.pow(jn,n),new zt(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?an:Math.pow(an,n),new zt(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*t,i=2*e-r;return new dt(ri(n>=240?n-240:n+120,i,r),ri(n,i,r),ri(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new zt(ua(this.h),Qn(this.s),Qn(this.l),Zn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Zn(this.opacity);return`${n===1?"hsl(":"hsla("}${ua(this.h)}, ${Qn(this.s)*100}%, ${Qn(this.l)*100}%${n===1?")":`, ${n})`}`}}));function ua(n){return n=(n||0)%360,n<0?n+360:n}function Qn(n){return Math.max(0,Math.min(1,n||0))}function ri(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}function pf(n,t,e,r,i){var s=n*n,a=s*n;return((1-3*n+3*s-a)*t+(4-6*s+3*a)*e+(1+3*n+3*s-3*a)*r+a*i)/6}function gf(n){var t=n.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,t-1):Math.floor(e*t),i=n[r],s=n[r+1],a=r>0?n[r-1]:2*i-s,o=r<t-1?n[r+2]:2*s-i;return pf((e-r/t)*t,a,i,s,o)}}const ii=n=>()=>n;function mf(n,t){return function(e){return n+e*t}}function _f(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(r){return Math.pow(n+r*t,e)}}function vf(n){return(n=+n)==1?ha:function(t,e){return e-t?_f(t,e,n):ii(isNaN(t)?e:t)}}function ha(n,t){var e=t-n;return e?mf(n,e):ii(isNaN(n)?t:n)}const Jn=(function n(t){var e=vf(t);function r(i,s){var a=e((i=Kn(i)).r,(s=Kn(s)).r),o=e(i.g,s.g),c=e(i.b,s.b),l=ha(i.opacity,s.opacity);return function(u){return i.r=a(u),i.g=o(u),i.b=c(u),i.opacity=l(u),i+""}}return r.gamma=n,r})(1);function yf(n){return function(t){var e=t.length,r=new Array(e),i=new Array(e),s=new Array(e),a,o;for(a=0;a<e;++a)o=Kn(t[a]),r[a]=o.r||0,i[a]=o.g||0,s[a]=o.b||0;return r=n(r),i=n(i),s=n(s),o.opacity=1,function(c){return o.r=r(c),o.g=i(c),o.b=s(c),o+""}}}var xf=yf(gf);function bf(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(s){for(i=0;i<e;++i)r[i]=n[i]*(1-s)+t[i]*s;return r}}function wf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function kf(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),s=new Array(e),a;for(a=0;a<r;++a)i[a]=pe(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<r;++a)s[a]=i[a](o);return s}}function Af(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function Ot(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function $f(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=pe(n[i],t[i]):r[i]=t[i];return function(s){for(i in e)r[i]=e[i](s);return r}}var si=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ai=new RegExp(si.source,"g");function Cf(n){return function(){return n}}function Sf(n){return function(t){return n(t)+""}}function fa(n,t){var e=si.lastIndex=ai.lastIndex=0,r,i,s,a=-1,o=[],c=[];for(n=n+"",t=t+"";(r=si.exec(n))&&(i=ai.exec(t));)(s=i.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(r=r[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,c.push({i:a,x:Ot(r,i)})),e=ai.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?Sf(c[0].x):Cf(t):(t=c.length,function(l){for(var u=0,h;u<t;++u)o[(h=c[u]).i]=h.x(l);return o.join("")})}function pe(n,t){var e=typeof t,r;return t==null||e==="boolean"?ii(t):(e==="number"?Ot:e==="string"?(r=Gt(t))?(t=r,Jn):fa:t instanceof Gt?Jn:t instanceof Date?Af:wf(t)?bf:Array.isArray(t)?kf:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?$f:Ot)(n,t)}function oi(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var da=180/Math.PI,li={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function pa(n,t,e,r,i,s){var a,o,c;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(c=n*e+t*r)&&(e-=n*c,r-=t*c),(o=Math.sqrt(e*e+r*r))&&(e/=o,r/=o,c/=o),n*r<t*e&&(n=-n,t=-t,c=-c,a=-a),{translateX:i,translateY:s,rotate:Math.atan2(t,n)*da,skewX:Math.atan(c)*da,scaleX:a,scaleY:o}}var tr;function Tf(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?li:pa(t.a,t.b,t.c,t.d,t.e,t.f)}function Mf(n){return n==null||(tr||(tr=document.createElementNS("http://www.w3.org/2000/svg","g")),tr.setAttribute("transform",n),!(n=tr.transform.baseVal.consolidate()))?li:(n=n.matrix,pa(n.a,n.b,n.c,n.d,n.e,n.f))}function ga(n,t,e,r){function i(l){return l.length?l.pop()+" ":""}function s(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push("translate(",null,t,null,e);g.push({i:p-4,x:Ot(l,h)},{i:p-2,x:Ot(u,f)})}else(h||f)&&d.push("translate("+h+t+f+e)}function a(l,u,h,f){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),f.push({i:h.push(i(h)+"rotate(",null,r)-2,x:Ot(l,u)})):u&&h.push(i(h)+"rotate("+u+r)}function o(l,u,h,f){l!==u?f.push({i:h.push(i(h)+"skewX(",null,r)-2,x:Ot(l,u)}):u&&h.push(i(h)+"skewX("+u+r)}function c(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push(i(d)+"scale(",null,",",null,")");g.push({i:p-4,x:Ot(l,h)},{i:p-2,x:Ot(u,f)})}else(h!==1||f!==1)&&d.push(i(d)+"scale("+h+","+f+")")}return function(l,u){var h=[],f=[];return l=n(l),u=n(u),s(l.translateX,l.translateY,u.translateX,u.translateY,h,f),a(l.rotate,u.rotate,h,f),o(l.skewX,u.skewX,h,f),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,h,f),l=u=null,function(d){for(var g=-1,p=f.length,_;++g<p;)h[(_=f[g]).i]=_.x(d);return h.join("")}}}var Ef=ga(Tf,"px, ","px)","deg)"),Lf=ga(Mf,", ",")",")");function Pf(n,t){t===void 0&&(t=n,n=pe);for(var e=0,r=t.length-1,i=t[0],s=new Array(r<0?0:r);e<r;)s[e]=n(i,i=t[++e]);return function(a){var o=Math.max(0,Math.min(r-1,Math.floor(a*=r)));return s[o](a-o)}}var Oe=0,ln=0,cn=0,ma=1e3,er,un,nr=0,ge=0,rr=0,hn=typeof performance=="object"&&performance.now?performance:Date,_a=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function ci(){return ge||(_a(zf),ge=hn.now()+rr)}function zf(){ge=0}function ir(){this._call=this._time=this._next=null}ir.prototype=va.prototype={constructor:ir,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?ci():+e)+(t==null?0:+t),!this._next&&un!==this&&(un?un._next=this:er=this,un=this),this._call=n,this._time=e,ui()},stop:function(){this._call&&(this._call=null,this._time=1/0,ui())}};function va(n,t,e){var r=new ir;return r.restart(n,t,e),r}function Of(){ci(),++Oe;for(var n=er,t;n;)(t=ge-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Oe}function ya(){ge=(nr=hn.now())+rr,Oe=ln=0;try{Of()}finally{Oe=0,Nf(),ge=0}}function Rf(){var n=hn.now(),t=n-nr;t>ma&&(rr-=t,nr=n)}function Nf(){for(var n,t=er,e,r=1/0;t;)t._call?(r>t._time&&(r=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:er=e);un=n,ui(r)}function ui(n){if(!Oe){ln&&(ln=clearTimeout(ln));var t=n-ge;t>24?(n<1/0&&(ln=setTimeout(ya,n-hn.now()-rr)),cn&&(cn=clearInterval(cn))):(cn||(nr=hn.now(),cn=setInterval(Rf,ma)),Oe=1,_a(ya))}}function xa(n,t,e){var r=new ir;return t=t==null?0:+t,r.restart(i=>{r.stop(),n(i+t)},t,e),r}var Df=Ur("start","end","cancel","interrupt"),Ff=[],ba=0,wa=1,hi=2,sr=3,ka=4,fi=5,ar=6;function or(n,t,e,r,i,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;If(n,e,{name:t,index:r,group:i,on:Df,tween:Ff,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:ba})}function di(n,t){var e=Rt(n,t);if(e.state>ba)throw new Error("too late; already scheduled");return e}function Ft(n,t){var e=Rt(n,t);if(e.state>sr)throw new Error("too late; already running");return e}function Rt(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function If(n,t,e){var r=n.__transition,i;r[t]=e,e.timer=va(s,0,e.time);function s(l){e.state=wa,e.timer.restart(a,e.delay,e.time),e.delay<=l&&a(l-e.delay)}function a(l){var u,h,f,d;if(e.state!==wa)return c();for(u in r)if(d=r[u],d.name===e.name){if(d.state===sr)return xa(a);d.state===ka?(d.state=ar,d.timer.stop(),d.on.call("interrupt",n,n.__data__,d.index,d.group),delete r[u]):+u<t&&(d.state=ar,d.timer.stop(),d.on.call("cancel",n,n.__data__,d.index,d.group),delete r[u])}if(xa(function(){e.state===sr&&(e.state=ka,e.timer.restart(o,e.delay,e.time),o(l))}),e.state=hi,e.on.call("start",n,n.__data__,e.index,e.group),e.state===hi){for(e.state=sr,i=new Array(f=e.tween.length),u=0,h=-1;u<f;++u)(d=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(i[++h]=d);i.length=h+1}}function o(l){for(var u=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(c),e.state=fi,1),h=-1,f=i.length;++h<f;)i[h].call(n,u);e.state===fi&&(e.on.call("end",n,n.__data__,e.index,e.group),c())}function c(){e.state=ar,e.timer.stop(),delete r[t];for(var l in r)return;delete n.__transition}}function qf(n,t){var e=n.__transition,r,i,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((r=e[a]).name!==t){s=!1;continue}i=r.state>hi&&r.state<fi,r.state=ar,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete e[a]}s&&delete n.__transition}}function Bf(n){return this.each(function(){qf(this,n)})}function Hf(n,t){var e,r;return function(){var i=Ft(this,n),s=i.tween;if(s!==e){r=e=s;for(var a=0,o=r.length;a<o;++a)if(r[a].name===t){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function Vf(n,t,e){var r,i;if(typeof e!="function")throw new Error;return function(){var s=Ft(this,n),a=s.tween;if(a!==r){i=(r=a).slice();for(var o={name:t,value:e},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=o;break}c===l&&i.push(o)}s.tween=i}}function Xf(n,t){var e=this._id;if(n+="",arguments.length<2){for(var r=Rt(this.node(),e).tween,i=0,s=r.length,a;i<s;++i)if((a=r[i]).name===n)return a.value;return null}return this.each((t==null?Hf:Vf)(e,n,t))}function pi(n,t,e){var r=n._id;return n.each(function(){var i=Ft(this,r);(i.value||(i.value={}))[t]=e.apply(this,arguments)}),function(i){return Rt(i,r).value[t]}}function Aa(n,t){var e;return(typeof t=="number"?Ot:t instanceof Gt?Jn:(e=Gt(t))?(t=e,Jn):fa)(n,t)}function Yf(n){return function(){this.removeAttribute(n)}}function Gf(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Wf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttribute(n);return a===i?null:a===r?s:s=t(r=a,e)}}function jf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===i?null:a===r?s:s=t(r=a,e)}}function Uf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function Kf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function Zf(n,t){var e=Yn(n),r=e==="transform"?Lf:Aa;return this.attrTween(n,typeof t=="function"?(e.local?Kf:Uf)(e,r,pi(this,"attr."+n,t)):t==null?(e.local?Gf:Yf)(e):(e.local?jf:Wf)(e,r,t))}function Qf(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function Jf(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function td(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&Jf(n,s)),e}return i._value=t,i}function ed(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&Qf(n,s)),e}return i._value=t,i}function nd(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var r=Yn(n);return this.tween(e,(r.local?td:ed)(r,t))}function rd(n,t){return function(){di(this,n).delay=+t.apply(this,arguments)}}function id(n,t){return t=+t,function(){di(this,n).delay=t}}function sd(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?rd:id)(t,n)):Rt(this.node(),t).delay}function ad(n,t){return function(){Ft(this,n).duration=+t.apply(this,arguments)}}function od(n,t){return t=+t,function(){Ft(this,n).duration=t}}function ld(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?ad:od)(t,n)):Rt(this.node(),t).duration}function cd(n,t){if(typeof t!="function")throw new Error;return function(){Ft(this,n).ease=t}}function ud(n){var t=this._id;return arguments.length?this.each(cd(t,n)):Rt(this.node(),t).ease}function hd(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;Ft(this,n).ease=e}}function fd(n){if(typeof n!="function")throw new Error;return this.each(hd(this._id,n))}function dd(n){typeof n!="function"&&(n=Ys(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Wt(r,this._parents,this._name,this._id)}function pd(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,r=t.length,i=e.length,s=Math.min(r,i),a=new Array(r),o=0;o<s;++o)for(var c=t[o],l=e[o],u=c.length,h=a[o]=new Array(u),f,d=0;d<u;++d)(f=c[d]||l[d])&&(h[d]=f);for(;o<r;++o)a[o]=t[o];return new Wt(a,this._parents,this._name,this._id)}function gd(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function md(n,t,e){var r,i,s=gd(t)?di:Ft;return function(){var a=s(this,n),o=a.on;o!==r&&(i=(r=o).copy()).on(t,e),a.on=i}}function _d(n,t){var e=this._id;return arguments.length<2?Rt(this.node(),e).on.on(n):this.each(md(e,n,t))}function vd(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function yd(){return this.on("end.remove",vd(this._id))}function xd(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Zr(n));for(var r=this._groups,i=r.length,s=new Array(i),a=0;a<i;++a)for(var o=r[a],c=o.length,l=s[a]=new Array(c),u,h,f=0;f<c;++f)(u=o[f])&&(h=n.call(u,u.__data__,f,o))&&("__data__"in u&&(h.__data__=u.__data__),l[f]=h,or(l[f],t,e,f,l,Rt(u,e)));return new Wt(s,this._parents,t,e)}function bd(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Xs(n));for(var r=this._groups,i=r.length,s=[],a=[],o=0;o<i;++o)for(var c=r[o],l=c.length,u,h=0;h<l;++h)if(u=c[h]){for(var f=n.call(u,u.__data__,h,c),d,g=Rt(u,e),p=0,_=f.length;p<_;++p)(d=f[p])&&or(d,t,e,p,f,g);s.push(f),a.push(u)}return new Wt(s,a,t,e)}var wd=nn.prototype.constructor;function kd(){return new wd(this._groups,this._parents)}function Ad(n,t){var e,r,i;return function(){var s=Le(this,n),a=(this.style.removeProperty(n),Le(this,n));return s===a?null:s===e&&a===r?i:i=t(e=s,r=a)}}function $a(n){return function(){this.style.removeProperty(n)}}function $d(n,t,e){var r,i=e+"",s;return function(){var a=Le(this,n);return a===i?null:a===r?s:s=t(r=a,e)}}function Cd(n,t,e){var r,i,s;return function(){var a=Le(this,n),o=e(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(n),Le(this,n))),a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o))}}function Sd(n,t){var e,r,i,s="style."+t,a="end."+s,o;return function(){var c=Ft(this,n),l=c.on,u=c.value[s]==null?o||(o=$a(t)):void 0;(l!==e||i!==u)&&(r=(e=l).copy()).on(a,i=u),c.on=r}}function Td(n,t,e){var r=(n+="")=="transform"?Ef:Aa;return t==null?this.styleTween(n,Ad(n,r)).on("end.style."+n,$a(n)):typeof t=="function"?this.styleTween(n,Cd(n,r,pi(this,"style."+n,t))).each(Sd(this._id,n)):this.styleTween(n,$d(n,r,t),e).on("end.style."+n,null)}function Md(n,t,e){return function(r){this.style.setProperty(n,t.call(this,r),e)}}function Ed(n,t,e){var r,i;function s(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Md(n,a,e)),r}return s._value=t,s}function Ld(n,t,e){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,Ed(n,t,e??""))}function Pd(n){return function(){this.textContent=n}}function zd(n){return function(){var t=n(this);this.textContent=t??""}}function Od(n){return this.tween("text",typeof n=="function"?zd(pi(this,"text",n)):Pd(n==null?"":n+""))}function Rd(n){return function(t){this.textContent=n.call(this,t)}}function Nd(n){var t,e;function r(){var i=n.apply(this,arguments);return i!==e&&(t=(e=i)&&Rd(i)),t}return r._value=n,r}function Dd(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,Nd(n))}function Fd(){for(var n=this._name,t=this._id,e=Ca(),r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var u=Rt(c,t);or(c,n,e,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Wt(r,this._parents,n,e)}function Id(){var n,t,e=this,r=e._id,i=e.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--i===0&&s()}};e.each(function(){var l=Ft(this,r),u=l.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(c)),l.on=t}),i===0&&s()})}var qd=0;function Wt(n,t,e,r){this._groups=n,this._parents=t,this._name=e,this._id=r}function Ca(){return++qd}var jt=nn.prototype;Wt.prototype={constructor:Wt,select:xd,selectAll:bd,selectChild:jt.selectChild,selectChildren:jt.selectChildren,filter:dd,merge:pd,selection:kd,transition:Fd,call:jt.call,nodes:jt.nodes,node:jt.node,size:jt.size,empty:jt.empty,each:jt.each,on:_d,attr:Zf,attrTween:nd,style:Td,styleTween:Ld,text:Od,textTween:Dd,remove:yd,tween:Xf,delay:sd,duration:ld,ease:ud,easeVarying:fd,end:Id,[Symbol.iterator]:jt[Symbol.iterator]};function fn(n){return n*(2-n)}function Bd(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var gi=1.70158;(function n(t){t=+t;function e(r){return(r=+r)*r*(t*(r-1)+r)}return e.overshoot=n,e})(gi);var Hd=(function n(t){t=+t;function e(r){return--r*r*((r+1)*t+r)+1}return e.overshoot=n,e})(gi);(function n(t){t=+t;function e(r){return((r*=2)<1?r*r*((t+1)*r-t):(r-=2)*r*((t+1)*r+t)+2)/2}return e.overshoot=n,e})(gi);var Vd={time:null,delay:0,duration:250,ease:Bd};function Xd(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function Yd(n){var t,e;n instanceof Wt?(t=n._id,n=n._name):(t=Ca(),(e=Vd).time=ci(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&or(c,n,t,l,a,e||Xd(c,t));return new Wt(r,this._parents,n,t)}nn.prototype.interrupt=Bf,nn.prototype.transition=Yd;const mi=Math.PI,_i=2*mi,me=1e-6,Gd=_i-me;function Sa(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function Wd(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return Sa;const e=10**t;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}let jd=class{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Sa:Wd(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,s,a){this._append`C${+t},${+e},${+r},${+i},${this._x1=+s},${this._y1=+a}`}arcTo(t,e,r,i,s){if(t=+t,e=+e,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,c=r-t,l=i-e,u=a-t,h=o-e,f=u*u+h*h;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(f>me)if(!(Math.abs(h*c-l*u)>me)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let d=r-a,g=i-o,p=c*c+l*l,_=d*d+g*g,x=Math.sqrt(p),b=Math.sqrt(f),v=s*Math.tan((mi-Math.acos((p+f-_)/(2*x*b)))/2),m=v/b,w=v/x;Math.abs(m-1)>me&&this._append`L${t+m*u},${e+m*h}`,this._append`A${s},${s},0,0,${+(h*d>u*g)},${this._x1=t+w*c},${this._y1=e+w*l}`}}arc(t,e,r,i,s,a){if(t=+t,e=+e,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let o=r*Math.cos(i),c=r*Math.sin(i),l=t+o,u=e+c,h=1^a,f=a?i-s:s-i;this._x1===null?this._append`M${l},${u}`:(Math.abs(this._x1-l)>me||Math.abs(this._y1-u)>me)&&this._append`L${l},${u}`,r&&(f<0&&(f=f%_i+_i),f>Gd?this._append`A${r},${r},0,1,${h},${t-o},${e-c}A${r},${r},0,1,${h},${this._x1=l},${this._y1=u}`:f>me&&this._append`A${r},${r},0,${+(f>=mi)},${h},${this._x1=t+r*Math.cos(s)},${this._y1=e+r*Math.sin(s)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}};function Ud(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function lr(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function Re(n){return n=lr(Math.abs(n)),n?n[1]:NaN}function Kd(n,t){return function(e,r){for(var i=e.length,s=[],a=0,o=n[0],c=0;i>0&&o>0&&(c+o+1>r&&(o=Math.max(1,r-c)),s.push(e.substring(i-=o,i+o)),!((c+=o+1)>r));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function Zd(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var Qd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function cr(n){if(!(t=Qd.exec(n)))throw new Error("invalid format: "+n);var t;return new vi({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}cr.prototype=vi.prototype;function vi(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}vi.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Jd(n){t:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break t;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var ur;function tp(n,t){var e=lr(n,t);if(!e)return ur=void 0,n.toPrecision(t);var r=e[0],i=e[1],s=i-(ur=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return s===a?r:s>a?r+new Array(s-a+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+lr(n,Math.max(0,t+s-1))[0]}function Ta(n,t){var e=lr(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const Ma={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:Ud,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>Ta(n*100,t),r:Ta,s:tp,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Ea(n){return n}var La=Array.prototype.map,Pa=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function ep(n){var t=n.grouping===void 0||n.thousands===void 0?Ea:Kd(La.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Ea:Zd(La.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(h,f){h=cr(h);var d=h.fill,g=h.align,p=h.sign,_=h.symbol,x=h.zero,b=h.width,v=h.comma,m=h.precision,w=h.trim,A=h.type;A==="n"?(v=!0,A="g"):Ma[A]||(m===void 0&&(m=12),w=!0,A="g"),(x||d==="0"&&g==="=")&&(x=!0,d="0",g="=");var S=(f&&f.prefix!==void 0?f.prefix:"")+(_==="$"?e:_==="#"&&/[boxX]/.test(A)?"0"+A.toLowerCase():""),C=(_==="$"?r:/[%p]/.test(A)?a:"")+(f&&f.suffix!==void 0?f.suffix:""),y=Ma[A],$=/[defgprs%]/.test(A);m=m===void 0?6:/[gprs]/.test(A)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m));function E(T){var M=S,P=C,k,L,z;if(A==="c")P=y(T)+P,T="";else{T=+T;var R=T<0||1/T<0;if(T=isNaN(T)?c:y(Math.abs(T),m),w&&(T=Jd(T)),R&&+T==0&&p!=="+"&&(R=!1),M=(R?p==="("?p:o:p==="-"||p==="("?"":p)+M,P=(A==="s"&&!isNaN(T)&&ur!==void 0?Pa[8+ur/3]:"")+P+(R&&p==="("?")":""),$){for(k=-1,L=T.length;++k<L;)if(z=T.charCodeAt(k),48>z||z>57){P=(z===46?i+T.slice(k+1):T.slice(k))+P,T=T.slice(0,k);break}}}v&&!x&&(T=t(T,1/0));var O=M.length+T.length+P.length,N=O<b?new Array(b-O+1).join(d):"";switch(v&&x&&(T=t(N+T,N.length?b-P.length:1/0),N=""),g){case"<":T=M+T+P+N;break;case"=":T=M+N+T+P;break;case"^":T=N.slice(0,O=N.length>>1)+M+T+P+N.slice(O);break;default:T=N+M+T+P;break}return s(T)}return E.toString=function(){return h+""},E}function u(h,f){var d=Math.max(-8,Math.min(8,Math.floor(Re(f)/3)))*3,g=Math.pow(10,-d),p=l((h=cr(h),h.type="f",h),{suffix:Pa[8+d/3]});return function(_){return p(g*_)}}return{format:l,formatPrefix:u}}var hr,za,Oa;np({thousands:",",grouping:[3],currency:["$",""]});function np(n){return hr=ep(n),za=hr.format,Oa=hr.formatPrefix,hr}function rp(n){return Math.max(0,-Re(Math.abs(n)))}function ip(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Re(t)/3)))*3-Re(Math.abs(n)))}function sp(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Re(t)-Re(n))+1}function ap(n){var t=0,e=n.children,r=e&&e.length;if(!r)t=1;else for(;--r>=0;)t+=e[r].value;n.value=t}function op(){return this.eachAfter(ap)}function lp(n,t){let e=-1;for(const r of this)n.call(t,r,++e,this);return this}function cp(n,t){for(var e=this,r=[e],i,s,a=-1;e=r.pop();)if(n.call(t,e,++a,this),i=e.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function up(n,t){for(var e=this,r=[e],i=[],s,a,o,c=-1;e=r.pop();)if(i.push(e),s=e.children)for(a=0,o=s.length;a<o;++a)r.push(s[a]);for(;e=i.pop();)n.call(t,e,++c,this);return this}function hp(n,t){let e=-1;for(const r of this)if(n.call(t,r,++e,this))return r}function fp(n){return this.eachAfter(function(t){for(var e=+n(t.data)||0,r=t.children,i=r&&r.length;--i>=0;)e+=r[i].value;t.value=e})}function dp(n){return this.eachBefore(function(t){t.children&&t.children.sort(n)})}function pp(n){for(var t=this,e=gp(t,n),r=[t];t!==e;)t=t.parent,r.push(t);for(var i=r.length;n!==e;)r.splice(i,0,n),n=n.parent;return r}function gp(n,t){if(n===t)return n;var e=n.ancestors(),r=t.ancestors(),i=null;for(n=e.pop(),t=r.pop();n===t;)i=n,n=e.pop(),t=r.pop();return i}function mp(){for(var n=this,t=[n];n=n.parent;)t.push(n);return t}function _p(){return Array.from(this)}function vp(){var n=[];return this.eachBefore(function(t){t.children||n.push(t)}),n}function yp(){var n=this,t=[];return n.each(function(e){e!==n&&t.push({source:e.parent,target:e})}),t}function*xp(){var n=this,t,e=[n],r,i,s;do for(t=e.reverse(),e=[];n=t.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)e.push(r[i]);while(e.length)}function fr(n,t){n instanceof Map?(n=[void 0,n],t===void 0&&(t=kp)):t===void 0&&(t=wp);for(var e=new dn(n),r,i=[e],s,a,o,c;r=i.pop();)if((a=t(r.data))&&(c=(a=Array.from(a)).length))for(r.children=a,o=c-1;o>=0;--o)i.push(s=a[o]=new dn(a[o])),s.parent=r,s.depth=r.depth+1;return e.eachBefore($p)}function bp(){return fr(this).eachBefore(Ap)}function wp(n){return n.children}function kp(n){return Array.isArray(n)?n[1]:null}function Ap(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function $p(n){var t=0;do n.height=t;while((n=n.parent)&&n.height<++t)}function dn(n){this.data=n,this.depth=this.height=0,this.parent=null}dn.prototype=fr.prototype={constructor:dn,count:op,each:lp,eachAfter:up,eachBefore:cp,find:hp,sum:fp,sort:dp,path:pp,ancestors:mp,descendants:_p,leaves:vp,links:yp,copy:bp,[Symbol.iterator]:xp};function Cp(n,t){return n.parent===t.parent?1:2}function yi(n){var t=n.children;return t?t[0]:n.t}function xi(n){var t=n.children;return t?t[t.length-1]:n.t}function Sp(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function Tp(n){for(var t=0,e=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=t,s.m+=t,t+=s.s+(e+=s.c)}function Mp(n,t,e){return n.a.parent===t.parent?n.a:e}function dr(n,t){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}dr.prototype=Object.create(dn.prototype);function Ep(n){for(var t=new dr(n,0),e,r=[t],i,s,a,o;e=r.pop();)if(s=e._.children)for(e.children=new Array(o=s.length),a=o-1;a>=0;--a)r.push(i=e.children[a]=new dr(s[a],a)),i.parent=e;return(t.parent=new dr(null,0)).children=[t],t}function Lp(){var n=Cp,t=1,e=1,r=null;function i(l){var u=Ep(l);if(u.eachAfter(s),u.parent.m=-u.z,u.eachBefore(a),r)l.eachBefore(c);else{var h=l,f=l,d=l;l.eachBefore(function(b){b.x<h.x&&(h=b),b.x>f.x&&(f=b),b.depth>d.depth&&(d=b)});var g=h===f?1:n(h,f)/2,p=g-h.x,_=t/(f.x+g+p),x=e/(d.depth||1);l.eachBefore(function(b){b.x=(b.x+p)*_,b.y=b.depth*x})}return l}function s(l){var u=l.children,h=l.parent.children,f=l.i?h[l.i-1]:null;if(u){Tp(l);var d=(u[0].z+u[u.length-1].z)/2;f?(l.z=f.z+n(l._,f._),l.m=l.z-d):l.z=d}else f&&(l.z=f.z+n(l._,f._));l.parent.A=o(l,f,l.parent.A||h[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,u,h){if(u){for(var f=l,d=l,g=u,p=f.parent.children[0],_=f.m,x=d.m,b=g.m,v=p.m,m;g=xi(g),f=yi(f),g&&f;)p=yi(p),d=xi(d),d.a=l,m=g.z+b-f.z-_+n(g._,f._),m>0&&(Sp(Mp(g,l,h),l,m),_+=m,x+=m),b+=g.m,_+=f.m,v+=p.m,x+=d.m;g&&!xi(d)&&(d.t=g,d.m+=b-x),f&&!yi(p)&&(p.t=f,p.m+=_-v,h=l)}return h}function c(l){l.x*=t,l.y=l.depth*e}return i.separation=function(l){return arguments.length?(n=l,i):n},i.size=function(l){return arguments.length?(r=!1,t=+l[0],e=+l[1],i):r?null:[t,e]},i.nodeSize=function(l){return arguments.length?(r=!0,t=+l[0],e=+l[1],i):r?[t,e]:null},i}function Pp(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function Ra(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}function zp(n){return function(){return n}}function Op(n){return+n}var Na=[0,1];function It(n){return n}function bi(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:zp(isNaN(t)?NaN:.5)}function Rp(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function Np(n,t,e){var r=n[0],i=n[1],s=t[0],a=t[1];return i<r?(r=bi(i,r),s=e(a,s)):(r=bi(r,i),s=e(s,a)),function(o){return s(r(o))}}function Dp(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),s=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)i[a]=bi(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var c=Qc(n,o,1,r)-1;return s[c](i[c](o))}}function Fp(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Ip(){var n=Na,t=Na,e=pe,r,i,s,a=It,o,c,l;function u(){var f=Math.min(n.length,t.length);return a!==It&&(a=Rp(n[0],n[f-1])),o=f>2?Dp:Np,c=l=null,h}function h(f){return f==null||isNaN(f=+f)?s:(c||(c=o(n.map(r),t,e)))(r(a(f)))}return h.invert=function(f){return a(i((l||(l=o(t,n.map(r),Ot)))(f)))},h.domain=function(f){return arguments.length?(n=Array.from(f,Op),u()):n.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),e=oi,u()},h.clamp=function(f){return arguments.length?(a=f?!0:It,u()):a!==It},h.interpolate=function(f){return arguments.length?(e=f,u()):e},h.unknown=function(f){return arguments.length?(s=f,h):s},function(f,d){return r=f,i=d,u()}}function qp(){return Ip()(It,It)}function Bp(n,t,e,r){var i=ru(n,t,e),s;switch(r=cr(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(s=ip(i,a))&&(r.precision=s),Oa(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=sp(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=rp(i))&&(r.precision=s-(r.type==="%")*2);break}}return za(r)}function wi(n){var t=n.domain;return n.ticks=function(e){var r=t();return nu(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return Bp(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,s=r.length-1,a=r[i],o=r[s],c,l,u=10;for(o<a&&(l=a,a=o,o=l,l=i,i=s,s=l);u-- >0;){if(l=Yr(a,o,e),l===c)return r[i]=a,r[s]=o,t(r);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function qt(){var n=qp();return n.copy=function(){return Fp(n,qt())},Pp.apply(n,arguments),wi(n)}function Hp(){var n=0,t=1,e,r,i,s,a=It,o=!1,c;function l(h){return h==null||isNaN(h=+h)?c:a(i===0?.5:(h=(s(h)-e)*i,o?Math.max(0,Math.min(1,h)):h))}l.domain=function(h){return arguments.length?([n,t]=h,e=s(n=+n),r=s(t=+t),i=e===r?0:1/(r-e),l):[n,t]},l.clamp=function(h){return arguments.length?(o=!!h,l):o},l.interpolator=function(h){return arguments.length?(a=h,l):a};function u(h){return function(f){var d,g;return arguments.length?([d,g]=f,a=h(d,g),l):[a(0),a(1)]}}return l.range=u(pe),l.rangeRound=u(oi),l.unknown=function(h){return arguments.length?(c=h,l):c},function(h){return s=h,e=h(n),r=h(t),i=e===r?0:1/(r-e),l}}function Da(n,t){return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function ki(){var n=wi(Hp()(It));return n.copy=function(){return Da(n,ki())},Ra.apply(n,arguments)}function Vp(){var n=0,t=.5,e=1,r=1,i,s,a,o,c,l=It,u,h=!1,f;function d(p){return isNaN(p=+p)?f:(p=.5+((p=+u(p))-s)*(r*p<r*s?o:c),l(h?Math.max(0,Math.min(1,p)):p))}d.domain=function(p){return arguments.length?([n,t,e]=p,i=u(n=+n),s=u(t=+t),a=u(e=+e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d):[n,t,e]},d.clamp=function(p){return arguments.length?(h=!!p,d):h},d.interpolator=function(p){return arguments.length?(l=p,d):l};function g(p){return function(_){var x,b,v;return arguments.length?([x,b,v]=_,l=Pf(p,[x,b,v]),d):[l(0),l(.5),l(1)]}}return d.range=g(pe),d.rangeRound=g(oi),d.unknown=function(p){return arguments.length?(f=p,d):f},function(p){return u=p,i=p(n),s=p(t),a=p(e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d}}function Fa(){var n=wi(Vp()(It));return n.copy=function(){return Da(n,Fa())},Ra.apply(n,arguments)}function Ia(n){for(var t=n.length/6|0,e=new Array(t),r=0;r<t;)e[r]="#"+n.slice(r*6,++r*6);return e}const qa=n=>xf(n[n.length-1]);var Xp=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Ia);const Yp=qa(Xp);var Gp=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Ia);const Ba=qa(Gp);function B(n){return function(){return n}}const Ha=Math.abs,ot=Math.atan2,_e=Math.cos,Wp=Math.max,Ai=Math.min,Bt=Math.sin,Ne=Math.sqrt,pt=1e-12,pn=Math.PI,pr=pn/2,gr=2*pn;function jp(n){return n>1?0:n<-1?pn:Math.acos(n)}function Va(n){return n>=1?pr:n<=-1?-pr:Math.asin(n)}function mr(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new jd(t)}function Up(n){return n.innerRadius}function Kp(n){return n.outerRadius}function Zp(n){return n.startAngle}function Qp(n){return n.endAngle}function Jp(n){return n&&n.padAngle}function t0(n,t,e,r,i,s,a,o){var c=e-n,l=r-t,u=a-i,h=o-s,f=h*c-u*l;if(!(f*f<pt))return f=(u*(t-s)-h*(n-i))/f,[n+f*c,t+f*l]}function _r(n,t,e,r,i,s,a){var o=n-e,c=t-r,l=(a?s:-s)/Ne(o*o+c*c),u=l*c,h=-l*o,f=n+u,d=t+h,g=e+u,p=r+h,_=(f+g)/2,x=(d+p)/2,b=g-f,v=p-d,m=b*b+v*v,w=i-s,A=f*p-g*d,S=(v<0?-1:1)*Ne(Wp(0,w*w*m-A*A)),C=(A*v-b*S)/m,y=(-A*b-v*S)/m,$=(A*v+b*S)/m,E=(-A*b+v*S)/m,T=C-_,M=y-x,P=$-_,k=E-x;return T*T+M*M>P*P+k*k&&(C=$,y=E),{cx:C,cy:y,x01:-u,y01:-h,x11:C*(i/w-1),y11:y*(i/w-1)}}function Xa(){var n=Up,t=Kp,e=B(0),r=null,i=Zp,s=Qp,a=Jp,o=null,c=mr(l);function l(){var u,h,f=+n.apply(this,arguments),d=+t.apply(this,arguments),g=i.apply(this,arguments)-pr,p=s.apply(this,arguments)-pr,_=Ha(p-g),x=p>g;if(o||(o=u=c()),d<f&&(h=d,d=f,f=h),!(d>pt))o.moveTo(0,0);else if(_>gr-pt)o.moveTo(d*_e(g),d*Bt(g)),o.arc(0,0,d,g,p,!x),f>pt&&(o.moveTo(f*_e(p),f*Bt(p)),o.arc(0,0,f,p,g,x));else{var b=g,v=p,m=g,w=p,A=_,S=_,C=a.apply(this,arguments)/2,y=C>pt&&(r?+r.apply(this,arguments):Ne(f*f+d*d)),$=Ai(Ha(d-f)/2,+e.apply(this,arguments)),E=$,T=$,M,P;if(y>pt){var k=Va(y/f*Bt(C)),L=Va(y/d*Bt(C));(A-=k*2)>pt?(k*=x?1:-1,m+=k,w-=k):(A=0,m=w=(g+p)/2),(S-=L*2)>pt?(L*=x?1:-1,b+=L,v-=L):(S=0,b=v=(g+p)/2)}var z=d*_e(b),R=d*Bt(b),O=f*_e(w),N=f*Bt(w);if($>pt){var I=d*_e(v),tt=d*Bt(v),xt=f*_e(m),rt=f*Bt(m),Z;if(_<pn)if(Z=t0(z,R,xt,rt,I,tt,O,N)){var Me=z-Z[0],te=R-Z[1],Ts=I-Z[0],Ms=tt-Z[1],Il=1/Bt(jp((Me*Ts+te*Ms)/(Ne(Me*Me+te*te)*Ne(Ts*Ts+Ms*Ms)))/2),ql=Ne(Z[0]*Z[0]+Z[1]*Z[1]);E=Ai($,(f-ql)/(Il-1)),T=Ai($,(d-ql)/(Il+1))}else E=T=0}S>pt?T>pt?(M=_r(xt,rt,z,R,d,T,x),P=_r(I,tt,O,N,d,T,x),o.moveTo(M.cx+M.x01,M.cy+M.y01),T<$?o.arc(M.cx,M.cy,T,ot(M.y01,M.x01),ot(P.y01,P.x01),!x):(o.arc(M.cx,M.cy,T,ot(M.y01,M.x01),ot(M.y11,M.x11),!x),o.arc(0,0,d,ot(M.cy+M.y11,M.cx+M.x11),ot(P.cy+P.y11,P.cx+P.x11),!x),o.arc(P.cx,P.cy,T,ot(P.y11,P.x11),ot(P.y01,P.x01),!x))):(o.moveTo(z,R),o.arc(0,0,d,b,v,!x)):o.moveTo(z,R),!(f>pt)||!(A>pt)?o.lineTo(O,N):E>pt?(M=_r(O,N,I,tt,f,-E,x),P=_r(z,R,xt,rt,f,-E,x),o.lineTo(M.cx+M.x01,M.cy+M.y01),E<$?o.arc(M.cx,M.cy,E,ot(M.y01,M.x01),ot(P.y01,P.x01),!x):(o.arc(M.cx,M.cy,E,ot(M.y01,M.x01),ot(M.y11,M.x11),!x),o.arc(0,0,f,ot(M.cy+M.y11,M.cx+M.x11),ot(P.cy+P.y11,P.cx+P.x11),x),o.arc(P.cx,P.cy,E,ot(P.y11,P.x11),ot(P.y01,P.x01),!x))):o.arc(0,0,f,w,m,x)}if(o.closePath(),u)return o=null,u+""||null}return l.centroid=function(){var u=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,h=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-pn/2;return[_e(h)*u,Bt(h)*u]},l.innerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:B(+u),l):n},l.outerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:B(+u),l):t},l.cornerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:B(+u),l):e},l.padRadius=function(u){return arguments.length?(r=u==null?null:typeof u=="function"?u:B(+u),l):r},l.startAngle=function(u){return arguments.length?(i=typeof u=="function"?u:B(+u),l):i},l.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:B(+u),l):s},l.padAngle=function(u){return arguments.length?(a=typeof u=="function"?u:B(+u),l):a},l.context=function(u){return arguments.length?(o=u??null,l):o},l}var e0=Array.prototype.slice;function $i(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Ya(n){this._context=n}Ya.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function Ga(n){return new Ya(n)}function Ci(n){return n[0]}function Si(n){return n[1]}function vr(n,t){var e=B(!0),r=null,i=Ga,s=null,a=mr(o);n=typeof n=="function"?n:n===void 0?Ci:B(n),t=typeof t=="function"?t:t===void 0?Si:B(t);function o(c){var l,u=(c=$i(c)).length,h,f=!1,d;for(r==null&&(s=i(d=a())),l=0;l<=u;++l)!(l<u&&e(h=c[l],l,c))===f&&((f=!f)?s.lineStart():s.lineEnd()),f&&s.point(+n(h,l,c),+t(h,l,c));if(d)return s=null,d+""||null}return o.x=function(c){return arguments.length?(n=typeof c=="function"?c:B(+c),o):n},o.y=function(c){return arguments.length?(t=typeof c=="function"?c:B(+c),o):t},o.defined=function(c){return arguments.length?(e=typeof c=="function"?c:B(!!c),o):e},o.curve=function(c){return arguments.length?(i=c,r!=null&&(s=i(r)),o):i},o.context=function(c){return arguments.length?(c==null?r=s=null:s=i(r=c),o):r},o}function n0(n,t,e){var r=null,i=B(!0),s=null,a=Ga,o=null,c=mr(l);n=typeof n=="function"?n:n===void 0?Ci:B(+n),t=typeof t=="function"?t:B(t===void 0?0:+t),e=typeof e=="function"?e:e===void 0?Si:B(+e);function l(h){var f,d,g,p=(h=$i(h)).length,_,x=!1,b,v=new Array(p),m=new Array(p);for(s==null&&(o=a(b=c())),f=0;f<=p;++f){if(!(f<p&&i(_=h[f],f,h))===x)if(x=!x)d=f,o.areaStart(),o.lineStart();else{for(o.lineEnd(),o.lineStart(),g=f-1;g>=d;--g)o.point(v[g],m[g]);o.lineEnd(),o.areaEnd()}x&&(v[f]=+n(_,f,h),m[f]=+t(_,f,h),o.point(r?+r(_,f,h):v[f],e?+e(_,f,h):m[f]))}if(b)return o=null,b+""||null}function u(){return vr().defined(i).curve(a).context(s)}return l.x=function(h){return arguments.length?(n=typeof h=="function"?h:B(+h),r=null,l):n},l.x0=function(h){return arguments.length?(n=typeof h=="function"?h:B(+h),l):n},l.x1=function(h){return arguments.length?(r=h==null?null:typeof h=="function"?h:B(+h),l):r},l.y=function(h){return arguments.length?(t=typeof h=="function"?h:B(+h),e=null,l):t},l.y0=function(h){return arguments.length?(t=typeof h=="function"?h:B(+h),l):t},l.y1=function(h){return arguments.length?(e=h==null?null:typeof h=="function"?h:B(+h),l):e},l.lineX0=l.lineY0=function(){return u().x(n).y(t)},l.lineY1=function(){return u().x(n).y(e)},l.lineX1=function(){return u().x(r).y(t)},l.defined=function(h){return arguments.length?(i=typeof h=="function"?h:B(!!h),l):i},l.curve=function(h){return arguments.length?(a=h,s!=null&&(o=a(s)),l):a},l.context=function(h){return arguments.length?(h==null?s=o=null:o=a(s=h),l):s},l}function r0(n,t){return t<n?-1:t>n?1:t>=n?0:NaN}function i0(n){return n}function s0(){var n=i0,t=r0,e=null,r=B(0),i=B(gr),s=B(0);function a(o){var c,l=(o=$i(o)).length,u,h,f=0,d=new Array(l),g=new Array(l),p=+r.apply(this,arguments),_=Math.min(gr,Math.max(-gr,i.apply(this,arguments)-p)),x,b=Math.min(Math.abs(_)/l,s.apply(this,arguments)),v=b*(_<0?-1:1),m;for(c=0;c<l;++c)(m=g[d[c]=c]=+n(o[c],c,o))>0&&(f+=m);for(t!=null?d.sort(function(w,A){return t(g[w],g[A])}):e!=null&&d.sort(function(w,A){return e(o[w],o[A])}),c=0,h=f?(_-l*v)/f:0;c<l;++c,p=x)u=d[c],m=g[u],x=p+(m>0?m*h:0)+v,g[u]={data:o[u],index:c,value:m,startAngle:p,endAngle:x,padAngle:b};return g}return a.value=function(o){return arguments.length?(n=typeof o=="function"?o:B(+o),a):n},a.sortValues=function(o){return arguments.length?(t=o,e=null,a):t},a.sort=function(o){return arguments.length?(e=o,t=null,a):e},a.startAngle=function(o){return arguments.length?(r=typeof o=="function"?o:B(+o),a):r},a.endAngle=function(o){return arguments.length?(i=typeof o=="function"?o:B(+o),a):i},a.padAngle=function(o){return arguments.length?(s=typeof o=="function"?o:B(+o),a):s},a}class Wa{constructor(t,e){this._context=t,this._x=e}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,e){switch(t=+t,e=+e,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,e,t,e):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+e)/2,t,this._y0,t,e);break}}this._x0=t,this._y0=e}}function a0(n){return new Wa(n,!0)}function o0(n){return new Wa(n,!1)}function l0(n){return n.source}function c0(n){return n.target}function ja(n){let t=l0,e=c0,r=Ci,i=Si,s=null,a=null,o=mr(c);function c(){let l;const u=e0.call(arguments),h=t.apply(this,u),f=e.apply(this,u);if(s==null&&(a=n(l=o())),a.lineStart(),u[0]=h,a.point(+r.apply(this,u),+i.apply(this,u)),u[0]=f,a.point(+r.apply(this,u),+i.apply(this,u)),a.lineEnd(),l)return a=null,l+""||null}return c.source=function(l){return arguments.length?(t=l,c):t},c.target=function(l){return arguments.length?(e=l,c):e},c.x=function(l){return arguments.length?(r=typeof l=="function"?l:B(+l),c):r},c.y=function(l){return arguments.length?(i=typeof l=="function"?l:B(+l),c):i},c.context=function(l){return arguments.length?(l==null?s=a=null:a=n(s=l),c):s},c}function u0(){return ja(a0)}function h0(){return ja(o0)}function Ua(n){return n<0?-1:1}function Ka(n,t,e){var r=n._x1-n._x0,i=t-n._x1,s=(n._y1-n._y0)/(r||i<0&&-0),a=(e-n._y1)/(i||r<0&&-0),o=(s*i+a*r)/(r+i);return(Ua(s)+Ua(a))*Math.min(Math.abs(s),Math.abs(a),.5*Math.abs(o))||0}function Za(n,t){var e=n._x1-n._x0;return e?(3*(n._y1-n._y0)/e-t)/2:t}function Ti(n,t,e){var r=n._x0,i=n._y0,s=n._x1,a=n._y1,o=(s-r)/3;n._context.bezierCurveTo(r+o,i+o*t,s-o,a-o*e,s,a)}function yr(n){this._context=n}yr.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Ti(this,this._t0,Za(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){var e=NaN;if(n=+n,t=+t,!(n===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;break;case 2:this._point=3,Ti(this,Za(this,e=Ka(this,n,t)),e);break;default:Ti(this,this._t0,e=Ka(this,n,t));break}this._x0=this._x1,this._x1=n,this._y0=this._y1,this._y1=t,this._t0=e}}},Object.create(yr.prototype).point=function(n,t){yr.prototype.point.call(this,t,n)};function Qa(n){return new yr(n)}function gn(n,t,e){this.k=n,this.x=t,this.y=e}gn.prototype={constructor:gn,scale:function(n){return n===1?this:new gn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new gn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},gn.prototype;const f0=`
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
`;class d0 extends q{constructor(){super(...arguments);D(this,"_svg",null);D(this,"_animated",!0);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","scale","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(f0),this._animated=this.getAttribute("animated")!=="false",this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated)return;this._hasAnimated=!0;const r=this._svg;if(!r)return;const i=r.querySelectorAll(".cell");if(e||!this._animated){i.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"});return}i.forEach(s=>{const a=s,o=Number(a.dataset.delay||0);a.style.opacity="0",a.style.transform="scale(0.5)",a.style.transition="none",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`,a.style.opacity="1",a.style.transform="scale(1)"})})})}_buildChart(){var b;const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.getAttribute("scale")||"diverging";if(!e.length||!r.length){this.render("<svg></svg>");return}const s=e.length,a=3,o=60,c=110,l=56,u=s*l+(s-1)*a,h=u+c,f=u+o,d=i==="sequential"?ki(Ba).domain([0,1]):Fa(Yp).domain([-1,0,1]),g=this.isRtl;let p="";for(let v=0;v<s;v++){const m=c+v*(l+a)+l/2,w=o/2;p+=`<text class="header-text" x="${g?h-m:m}" y="${w}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++){const m=o+v*(l+a)+l/2,w=g?h-c/2:c/2;p+=`<text class="header-text" x="${w}" y="${m}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++)for(let m=0;m<s;m++){const w=((b=r[v])==null?void 0:b[m])??0,A=d(w),S=this._contrastColor(A),C=(v+m)*40;let y=c+m*(l+a);g&&(y=h-y-l);const $=o+v*(l+a),E=y+l/2,T=$+l/2;p+=`<g class="cell" data-delay="${C}" data-value="${w.toFixed(2)}" style="transform-origin: ${E}px ${T}px; opacity: 0; transform: scale(0.5);">`,p+=`<rect x="${y}" y="${$}" width="${l}" height="${l}" rx="6" ry="6" fill="${A}"/>`,p+=`<text class="cell-text" x="${E}" y="${T}" fill="${S}">${w.toFixed(2)}</text>`,p+="</g>"}const _=`
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;this.render(_),this._svg=this.root.querySelector("svg");const x=this.root.querySelector(".tooltip");this._svg&&x&&this._svg.querySelectorAll(".cell").forEach(v=>{v.addEventListener("mouseenter",m=>{const A=m.currentTarget.dataset.value||"";x.textContent=A,x.style.opacity="1"}),v.addEventListener("mousemove",m=>{const w=m,A=this.root.querySelector("div").getBoundingClientRect();x.style.left=`${w.clientX-A.left+10}px`,x.style.top=`${w.clientY-A.top-28}px`}),v.addEventListener("mouseleave",()=>{x.style.opacity="0"})})}_contrastColor(e){const r=Gt(e);if(!r)return"#000";const i=r.rgb();return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"#000":"#fff"}_escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-heatmap",d0);const p0=`
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
`,De={top:20,right:30,bottom:40,left:60},Ja=500,to=250,ve=Ja-De.left-De.right,Ut=to-De.top-De.bottom;class g0 extends q{constructor(){super(...arguments);D(this,"_resizeObs",null);D(this,"_svg",null);D(this,"_built",!1)}static get observedAttributes(){return["data","area","points","tooltip","color","x-label","y-label","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(p0),this.root.innerHTML="<svg></svg>",this._buildChart(),this._resizeObs=new ResizeObserver(()=>{}),this._resizeObs.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObs)==null||e.disconnect(),this._resizeObs=null}handleAttributeChange(e,r,i){this._built&&this._buildChart()}_parseData(){const e=this.jsonAttr("data",[]);return!Array.isArray(e)||e.length===0?[]:typeof e[0]=="number"?e.map((r,i)=>({x:i,y:r})):e}_getColor(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}_buildChart(){const e=this._parseData();if(e.length===0)return;const r=this.root.querySelector("svg");if(!r)return;const i=this._getColor(),s=this.hasAttribute("area"),a=this.hasAttribute("points"),o=this.hasAttribute("tooltip"),c=this.getAttribute("x-label")||"",l=this.getAttribute("y-label")||"";nt(r).selectAll("*").remove();const u=nt(r).attr("viewBox",`0 0 ${Ja} ${to}`).attr("preserveAspectRatio","xMidYMid meet");this._svg=u;const h=u.append("defs"),f=`lv-area-grad-${Math.random().toString(36).slice(2,8)}`,d=h.append("linearGradient").attr("id",f).attr("x1","0").attr("y1","0").attr("x2","0").attr("y2","1");d.append("stop").attr("offset","0%").attr("stop-color",i).attr("stop-opacity",.25),d.append("stop").attr("offset","100%").attr("stop-color",i).attr("stop-opacity",0);const g=u.append("g").attr("transform",`translate(${De.left},${De.top})`),p=qn(e,C=>C.x),_=qn(e,C=>C.y),x=(_[1]-_[0])*.1||1,b=qt().domain(p).range([0,ve]),v=qt().domain([_[0]-x,_[1]+x]).range([Ut,0]);if(g.append("g").attr("class","grid").attr("transform",`translate(0,${Ut})`).call(Hn(b).tickSize(-Ut).tickFormat(()=>"")),g.append("g").attr("class","grid").call(Vn(v).tickSize(-ve).tickFormat(()=>"")),g.append("g").attr("class","axis x-axis").attr("transform",`translate(0,${Ut})`).call(Hn(b).ticks(6)),g.append("g").attr("class","axis y-axis").call(Vn(v).ticks(5)),c&&g.append("text").attr("class","axis-label").attr("x",ve/2).attr("y",Ut+35).attr("text-anchor","middle").text(c),l&&g.append("text").attr("class","axis-label").attr("x",-Ut/2).attr("y",-38).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),s){const C=n0().x(y=>b(y.x)).y0(Ut).y1(y=>v(y.y));g.append("path").datum(e).attr("class","area").attr("d",C).attr("fill",`url(#${f})`)}const m=vr().x(C=>b(C.x)).y(C=>v(C.y)),w=g.append("path").datum(e).attr("class","line").attr("d",m).attr("stroke",i).attr("stroke-width",2.5),S=w.node().getTotalLength();w.attr("stroke-dasharray",S).attr("stroke-dashoffset",S),a&&g.selectAll(".point").data(e).enter().append("circle").attr("class","point").attr("cx",C=>b(C.x)).attr("cy",C=>v(C.y)).attr("r",4).attr("fill",i).attr("stroke","white").attr("stroke-width",1.5),o&&this._setupTooltip(g,e,b,v,i),this._built=!0,this.getAttribute("animated")==="false"&&this._showInstant()}_setupTooltip(e,r,i,s,a){const o=e.append("g").attr("class","tooltip-group").style("display","none");o.append("line").attr("class","crosshair crosshair-x").attr("y1",0).attr("y2",Ut),o.append("line").attr("class","crosshair crosshair-y").attr("x1",0).attr("x2",ve),o.append("circle").attr("r",5).attr("fill",a).attr("stroke","white").attr("stroke-width",2),o.append("rect").attr("class","tooltip-bg").attr("width",60).attr("height",24).attr("rx",6),o.append("text").attr("class","tooltip-text").attr("text-anchor","middle").attr("dy","0.35em");const c=Xr(l=>l.x).left;e.append("rect").attr("width",ve).attr("height",Ut).attr("fill","transparent").on("mousemove",l=>{const[u]=Jr(l),h=i.invert(u);let f=c(r,h,1);if(f>=r.length&&(f=r.length-1),f>0){const m=r[f-1],w=r[f];f=h-m.x>w.x-h?f:f-1}const d=r[f],g=i(d.x),p=s(d.y);o.style("display",null),o.select(".crosshair-x").attr("x1",g).attr("x2",g),o.select(".crosshair-y").attr("y1",p).attr("y2",p),o.select("circle").attr("cx",g).attr("cy",p);const _=60,x=24;let b=g-_/2,v=p-x-10;b<0&&(b=0),b+_>ve&&(b=ve-_),v<0&&(v=p+10),o.select(".tooltip-bg").attr("x",b).attr("y",v),o.select(".tooltip-text").attr("x",b+_/2).attr("y",v+x/2).text(`${d.y.toFixed(1)}`)}).on("mouseleave",()=>{o.style("display","none")})}_showInstant(){if(!this._svg)return;const e=this._svg.select("g");e.select(".line").attr("stroke-dashoffset",0),e.select(".area").classed("visible",!0),e.selectAll(".point").classed("visible",!0)}animateIn(e){var a;if(!this._svg)return;if(e||this.getAttribute("animated")==="false"){this._showInstant();return}const r=this._svg.select("g"),i=r.select(".line"),s=((a=i.node())==null?void 0:a.getTotalLength())||0;i.attr("stroke-dasharray",s).attr("stroke-dashoffset",s).transition().duration(1200).ease(fn).attr("stroke-dashoffset",0),r.select(".area").transition().delay(1500).duration(0).on("start",function(){nt(this).classed("visible",!0)}),r.selectAll(".point").each(function(o,c){nt(this).transition().delay(1500+c*50).duration(0).on("start",function(){nt(this).classed("visible",!0)})})}}customElements.define("lv-line-chart",g0);const xr={sigmoid:n=>1/(1+Math.exp(-n)),relu:n=>Math.max(0,n),tanh:n=>Math.tanh(n),linear:n=>n},m0=`
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
`,eo=500,no=300;class _0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1);D(this,"_resizeObserver",null);D(this,"_svg",null);D(this,"_fn",xr.sigmoid);D(this,"_fnName","sigmoid")}static get observedAttributes(){return["fn","range","samples","color","interactive","animated"]}get _range(){return this.jsonAttr("range",[-6,6])}get _samples(){const e=this.getAttribute("samples");return e&&parseInt(e,10)||200}get _color(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}get _interactive(){return this.hasAttribute("interactive")}get _animated(){const e=this.getAttribute("animated");return e===null?!0:e!=="false"}connectedCallback(){super.connectedCallback(),this.adoptStyles(m0);const e=document.createElement("div");this.root.appendChild(e);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",`0 0 ${eo} ${no}`),r.setAttribute("preserveAspectRatio","xMidYMid meet"),e.appendChild(r),this._svg=nt(r),this._parseFn(),this._render(!1),this._resizeObserver=new ResizeObserver(()=>{}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null}handleAttributeChange(e,r,i){r!==i&&(e==="fn"&&this._parseFn(),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e||!this._animated?this._render(!1):this._render(!0))}_parseFn(){const e=this.getAttribute("fn")||"sigmoid";if(this._fnName=e,xr[e])this._fn=xr[e];else try{const r=e.replace(/^\s*x\s*=>\s*/,"");this._fn=new Function("x","return "+r),this._fnName="custom"}catch{this._fn=xr.sigmoid,this._fnName="sigmoid"}}_generateData(){const[e,r]=this._range,i=this._samples,s=(r-e)/(i-1),a=[];for(let o=0;o<i;o++){const c=e+o*s,l=this._fn(c);a.push({x:c,y:l})}return a}_render(e){if(!this._svg)return;const r=this._svg;r.selectAll("*").remove();const i=this._generateData(),[s,a]=this._range,o=i.map(w=>w.y),c=iu(o)??-1,l=Fs(o)??1,u=(l-c)*.15||.5,h=c-u,f=l+u,d={top:20,right:30,bottom:30,left:40},g=eo-d.left-d.right,p=no-d.top-d.bottom,_=qt().domain([s,a]).range([0,g]),x=qt().domain([h,f]).range([p,0]),b=r.append("g").attr("transform",`translate(${d.left},${d.top})`);this._drawGrid(b,_,x,g,p),this._drawAxes(b,_,x,g,p);const v=vr().x(w=>_(w.x)).y(w=>x(w.y)).curve(Qa),m=b.append("path").datum(i).attr("class","fn-line").attr("d",v).attr("stroke",this._color).attr("stroke-width",3);if(e){const A=m.node().getTotalLength();m.attr("stroke-dasharray",A).attr("stroke-dashoffset",A).transition().duration(1e3).ease(fn).attr("stroke-dashoffset",0)}this._drawKeyPoints(b,_,x),this._interactive&&this._addInteractivePoint(b,_,x,i,g,p)}_drawGrid(e,r,i,s,a){const o=r.ticks(),c=i.ticks();e.selectAll(".grid-line-x").data(o).enter().append("line").attr("class","grid-line").attr("x1",l=>r(l)).attr("x2",l=>r(l)).attr("y1",0).attr("y2",a),e.selectAll(".grid-line-y").data(c).enter().append("line").attr("class","grid-line").attr("x1",0).attr("x2",s).attr("y1",l=>i(l)).attr("y2",l=>i(l))}_drawAxes(e,r,i,s,a){const[o,c]=r.domain(),[l,u]=i.domain(),h=l<=0&&u>=0?i(0):a;e.append("line").attr("class","axis-line").attr("x1",0).attr("x2",s).attr("y1",h).attr("y2",h);const f=o<=0&&c>=0?r(0):0;e.append("line").attr("class","axis-line").attr("x1",f).attr("x2",f).attr("y1",0).attr("y2",a),r.ticks().forEach(p=>{const _=r(p);e.append("line").attr("class","axis-line").attr("x1",_).attr("x2",_).attr("y1",h-3).attr("y2",h+3),e.append("text").attr("class","axis-text").attr("x",_).attr("y",h+14).attr("text-anchor","middle").text(p)}),i.ticks().forEach(p=>{const _=i(p);e.append("line").attr("class","axis-line").attr("x1",f-3).attr("x2",f+3).attr("y1",_).attr("y2",_),e.append("text").attr("class","axis-text").attr("x",f-12).attr("y",_).attr("dy","0.35em").attr("text-anchor","end").text(p)})}_drawKeyPoints(e,r,i){if(this._fnName==="sigmoid"){const s=r(0),a=i(.5);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("σ(0) = 0.5")}else if(this._fnName==="relu"){const s=r(0),a=i(0);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("kink point")}}_addInteractivePoint(e,r,i,s,a,o){const[c,l]=this._range,u=this._fn,h=(c+l)/2,f=u(h),d=e.append("line").attr("class","crosshair").attr("x1",r(h)).attr("x2",r(h)).attr("y1",i(f)).attr("y2",o),g=e.append("line").attr("class","crosshair").attr("x1",0).attr("x2",r(h)).attr("y1",i(f)).attr("y2",i(f)),p=e.append("g"),_=p.append("rect").attr("class","readout-bg").attr("width",160).attr("height",24).attr("rx",6),x=p.append("text").attr("class","readout-text").attr("text-anchor","middle"),b=e.append("circle").attr("class","drag-point").attr("cx",r(h)).attr("cy",i(f)).attr("r",8).attr("fill",this._color).attr("stroke","#fff").attr("stroke-width",2),v=(w,A,S,C)=>{const y=`x = ${S.toFixed(2)}, y = ${C.toFixed(2)}`;x.text(y);const $=160,E=24,T=12;let M=w-$/2,P=A-E-T;M<0&&(M=0),M+$>a&&(M=a-$),P<0&&(P=A+T),_.attr("x",M).attr("y",P).attr("width",$).attr("height",E),x.attr("x",M+$/2).attr("y",P+E/2).attr("text-anchor","middle")};v(r(h),i(f),h,f);const m=tf().on("drag",w=>{const A=Math.max(0,Math.min(a,w.x)),S=r.invert(A),C=Math.max(c,Math.min(l,S)),y=u(C),$=r(C),E=i(y);b.attr("cx",$).attr("cy",E),d.attr("x1",$).attr("x2",$).attr("y1",E).attr("y2",o),g.attr("x1",0).attr("x2",$).attr("y1",E).attr("y2",E),v($,E,C,y)});b.call(m)}}customElements.define("lv-function",_0);const ro=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],v0=`
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
`,wt={top:20,right:20,bottom:50,left:55},io=500,Mi=400;class y0 extends q{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null)}static get observedAttributes(){return["data","x-label","y-label","clusters","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(v0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||ro[e%8]}_clusterColor(e){const i=[...new Set(this._data.map(o=>o.cluster).filter(o=>o!=null))].indexOf(e),s=i>=0?i:0;return getComputedStyle(this).getPropertyValue(`--lv-chart-${s%8}`).trim()||ro[s%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","grid-group"),this._svg.append("g").attr("class","axis-group"),this._svg.append("g").attr("class","points-group"),this._svg.append("g").attr("class","tooltip-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("clusters"),s=this.hasAttribute("tooltip"),a=this.getAttribute("x-label")||"",o=this.getAttribute("y-label")||"",c=i?[...new Set(r.map(k=>k.cluster).filter(k=>k!=null))]:[],l=c.length>0?30:0,u=Mi+l,h=io-wt.left-wt.right,f=Mi-wt.top-wt.bottom;this._svg.attr("viewBox",`0 0 ${io} ${u}`);const d=qn(r,k=>k.x),g=qn(r,k=>k.y),p=(d[1]-d[0])*.05||1,_=(g[1]-g[0])*.05||1,x=qt().domain([d[0]-p,d[1]+p]).range([0,h]),b=qt().domain([g[0]-_,g[1]+_]).range([f,0]),v=this._svg.select(".grid-group").attr("transform",`translate(${wt.left},${wt.top})`);v.selectAll("*").remove();const m=Hn(x).tickSize(-f).tickFormat(()=>"");v.append("g").attr("class","grid").attr("transform",`translate(0,${f})`).call(m);const w=Vn(b).tickSize(-h).tickFormat(()=>"");v.append("g").attr("class","grid").call(w);const A=this._svg.select(".axis-group").attr("transform",`translate(${wt.left},${wt.top})`);A.selectAll("*").remove(),A.append("g").attr("class","axis").attr("transform",`translate(0,${f})`).call(Hn(x).ticks(6)),A.append("g").attr("class","axis").call(Vn(b).ticks(6)),a&&A.append("text").attr("class","axis-label").attr("x",h/2).attr("y",f+38).attr("text-anchor","middle").text(a),o&&A.append("text").attr("class","axis-label").attr("x",-f/2).attr("y",-40).attr("text-anchor","middle").attr("transform","rotate(-90)").text(o);const S=this._svg.select(".points-group").attr("transform",`translate(${wt.left},${wt.top})`),C=this._svg.select(".tooltip-group").attr("transform",`translate(${wt.left},${wt.top})`);C.selectAll("*").remove();const y=C.append("g").attr("class","tooltip-box");y.append("rect").attr("class","tooltip-bg"),y.append("text").attr("class","tooltip-text");const $=S.selectAll(".point").data(r,(k,L)=>String(L));$.exit().remove();const E=$.enter().append("circle").attr("class","point").attr("cx",k=>x(k.x)).attr("cy",k=>b(k.y)).attr("r",5).attr("fill",(k,L)=>i&&k.cluster!=null?this._clusterColor(k.cluster):this._getColor(L,k)).attr("opacity",e?0:1).attr("transform",e?"scale(0)":"scale(1)").style("transform-origin",k=>`${x(k.x)}px ${b(k.y)}px`);s?E.on("mouseenter",(k,L)=>{var R;if(nt(k.currentTarget).transition().duration(150).attr("r",6.5).attr("opacity",1),L.label){const O=x(L.x),N=b(L.y)-14;y.classed("visible",!0),y.select(".tooltip-text").attr("x",O).attr("y",N).text(L.label);const I=y.select(".tooltip-text").node(),tt=((R=I==null?void 0:I.getComputedTextLength)==null?void 0:R.call(I))||40;y.select(".tooltip-bg").attr("x",O-tt/2-6).attr("y",N-10).attr("width",tt+12).attr("height",20)}}).on("mouseleave",k=>{nt(k.currentTarget).transition().duration(150).attr("r",5).attr("opacity",.85),y.classed("visible",!1)}):E.on("mouseenter",k=>{nt(k.currentTarget).transition().duration(150).attr("r",6.5)}).on("mouseleave",k=>{nt(k.currentTarget).transition().duration(150).attr("r",5)});const T=E.merge($);if(e?T.each(function(k,L){nt(this).transition().delay(L*30).duration(400).ease(Hd).attr("opacity",.85).attr("transform","scale(1)")}):T.attr("cx",k=>x(k.x)).attr("cy",k=>b(k.y)).attr("opacity",.85).attr("transform","scale(1)").attr("fill",(k,L)=>i&&k.cluster!=null?this._clusterColor(k.cluster):this._getColor(L,k)),this.hasAttribute("labels")||this.hasAttribute("tooltip")){const k=this._svg.select(".points-group");k.selectAll(".point-label").remove(),r.forEach((L,z)=>{if(!L.label)return;const R=k.append("text").attr("class","point-label").attr("x",x(L.x)+8).attr("y",b(L.y)+4).attr("fill","var(--lv-text, #e4e4ec)").attr("font-size","11px").attr("opacity",e?0:.9).text(L.label);e&&R.transition().delay(z*30+200).duration(300).attr("opacity",.9)})}const P=this._svg.select(".legend-group");if(P.selectAll("*").remove(),c.length>0){const k=Mi+5;let L=wt.left;for(const z of c){const R=this._clusterColor(z);P.append("circle").attr("cx",L+5).attr("cy",k+8).attr("r",4).attr("fill",R),P.append("text").attr("class","legend-text").attr("x",L+14).attr("y",k+8).attr("dominant-baseline","central").text(String(z)),L+=14+String(z).length*7+20}}}}customElements.define("lv-scatter",y0);const x0=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],b0=`
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
`,mn=300,w0=130,so=26,ao=16;class k0 extends q{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null)}static get observedAttributes(){return["data","donut","legend"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(b0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||x0[e%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","arcs-group"),this._svg.append("g").attr("class","labels-group"),this._svg.append("g").attr("class","hover-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("donut"),s=this.hasAttribute("legend"),a=w0,o=i?a*.6:0,c=a+5,l=s?r.length:0,u=l>0?ao+l*so:0,h=mn+u;this._svg.attr("viewBox",`0 0 ${mn} ${h}`);const f=mn/2,d=mn/2,p=s0().value(C=>C.value).sort(null).padAngle(.015)(r),_=Xa().innerRadius(o).outerRadius(a),x=Xa().innerRadius(o).outerRadius(c),b=this._svg.select(".arcs-group").attr("transform",`translate(${f},${d})`);b.selectAll("*").remove();const v=this._svg.select(".hover-group").attr("transform",`translate(${f},${d})`);v.selectAll("*").remove();const m=v.append("text").attr("class","hover-label").attr("x",0).attr("y",0),w=v.append("text").attr("class","hover-label").attr("x",0).attr("y",18).style("font-size","11px").style("font-weight","400");for(let C=0;C<p.length;C++){const y=p[C],$=this._getColor(C,y.data),E=b.append("path").attr("class","arc").attr("fill",$).attr("stroke","var(--lv-bg, #0f0f23)").attr("stroke-width",1.5);if(e){const T={...y,endAngle:y.startAngle};E.attr("d",_(T)).transition().delay(C*120).duration(800).ease(fn).attrTween("d",()=>{const M=pe(T,y);return P=>_(M(P))})}else E.attr("d",_(y));E.on("mouseenter",()=>{if(E.transition().duration(150).attr("d",x(y)),i)m.text(y.data.label).classed("visible",!0),w.text(String(y.data.value)).classed("visible",!0);else{const[T,M]=_.centroid(y);m.attr("x",T*1.6).attr("y",M*1.6-8).text(y.data.label).classed("visible",!0),w.attr("x",T*1.6).attr("y",M*1.6+8).text(String(y.data.value)).classed("visible",!0)}}).on("mouseleave",()=>{E.transition().duration(150).attr("d",_(y)),m.classed("visible",!1),w.classed("visible",!1)})}const A=this._svg.select(".labels-group").attr("transform",`translate(${f},${d})`);if(A.selectAll("*").remove(),!s)for(let C=0;C<p.length;C++){const y=p[C];if(y.endAngle-y.startAngle>.35){const[E,T]=_.centroid(y),M=A.append("text").attr("class","arc-label").attr("x",E).attr("y",T).text(y.data.label);e&&M.attr("opacity",0).transition().delay(C*120+600).duration(300).attr("opacity",1)}}const S=this._svg.select(".legend-group");if(S.selectAll("*").remove(),s&&r.length>0){const C=mn+ao;for(let y=0;y<r.length;y++){const E=C+y*so,T=this._getColor(y,r[y]);S.append("rect").attr("class","legend-swatch").attr("x",20).attr("y",E-5).attr("width",10).attr("height",10).attr("fill",T),S.append("text").attr("class","legend-text").attr("x",38).attr("y",E).attr("dominant-baseline","central").text(`${r[y].label} (${r[y].value})`)}}}}customElements.define("lv-pie",k0);const A0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;class $0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","normalize","show-metrics"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(A0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelectorAll(".cell");r.forEach((i,s)=>{const a=i,o=Math.floor(s/Math.sqrt(r.length)),c=s%Math.sqrt(r.length),l=(o+c)*40;a.style.transition="none",a.style.opacity="0",a.style.transform="scale(0.5)",requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${l}ms, transform 400ms ease-out ${l}ms`,a.style.opacity="1",a.style.transform="scale(1)"}))})}_buildChart(){const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.hasAttribute("normalize"),s=this.hasAttribute("show-metrics");if(!e.length||!r.length){this.render('<div class="cm-container"></div>');return}const a=e.length,o=i?r.map(y=>{const $=y.reduce((E,T)=>E+T,0);return $>0?y.map(E=>E/$):y}):r,c=Math.max(...o.flat()),l=56,u=3,h=70,f=80,d=s?60:0,g=s?40:0,p=a*l+(a-1)*u,_=p,x=f+p+d,b=h+_+g,v=this.isRtl,m=ki(Ba).domain([0,c||1]),w=y=>{const $=Gt(m(y));if(!$)return"#fff";const{r:E,g:T,b:M}=$.rgb();return E*.299+T*.587+M*.114>150?"#111":"#fff"};let A="";for(let y=0;y<a;y++){const $=f+y*(l+u)+l/2;A+=`<text class="header-text" x="${v?x-$:$}" y="${h-8}"
        text-anchor="middle">${this._esc(e[y])}</text>`}for(let y=0;y<a;y++){const $=h+y*(l+u)+l/2,E=v?x-f/2:f/2;A+=`<text class="header-text" x="${E}" y="${$}"
        text-anchor="middle" dominant-baseline="central">${this._esc(e[y])}</text>`}for(let y=0;y<a;y++)for(let $=0;$<a;$++){const E=o[y][$],T=r[y][$],M=f+$*(l+u),P=h+y*(l+u),k=v?x-M-l:M,L=m(E),z=w(E),R=i?(E*100).toFixed(0)+"%":String(T);A+=`<g class="cell">
          <rect x="${k}" y="${P}" width="${l}" height="${l}"
            rx="4" fill="${L}" ${y===$?'stroke="var(--lv-accent)" stroke-width="2"':""}/>
          <text class="cell-text" x="${k+l/2}" y="${P+l/2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${z}">${R}</text>
        </g>`}if(s){for(let y=0;y<a;y++){const $=r[y][y],E=r.reduce((k,L)=>k+L[y],0),T=E>0?($/E*100).toFixed(0)+"%":"-",M=f+y*(l+u)+l/2,P=v?x-M:M;A+=`<text class="metric-text" x="${P}" y="${h+_+25}"
          text-anchor="middle" fill="var(--lv-positive)">${T}</text>`}for(let y=0;y<a;y++){const $=r[y][y],E=r[y].reduce((k,L)=>k+L,0),T=E>0?($/E*100).toFixed(0)+"%":"-",M=h+y*(l+u)+l/2,P=v?f/2-20:f+p+10;A+=`<text class="metric-text" x="${P}" y="${M}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${T}</text>`}}const S=v?x-12:12,C=h+_/2;A+=`<text class="axis-label" x="${S}" y="${C}"
      text-anchor="middle" dominant-baseline="central"
      transform="rotate(-90, ${S}, ${C})">Actual</text>`,A+=`<text class="axis-label" x="${f+p/2}" y="${b-2}"
      text-anchor="middle">Predicted</text>`,this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${x} ${b}" role="img" aria-label="Confusion Matrix">
        ${A}
      </svg>
    </div>`)}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-confusion-matrix",$0);const C0=`
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
`,_n=560,br=280,ut={top:30,right:60,bottom:40,left:55};class S0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["loss","accuracy","lr","x-label","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(C0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;this.root.querySelectorAll(".metric-line").forEach(i=>{const s=i,a=s.getTotalLength();s.style.strokeDasharray=String(a),s.style.strokeDashoffset=String(a),s.style.transition=`stroke-dashoffset 1.2s ${s.dataset.idx||"0"}s ease-out`,requestAnimationFrame(()=>{s.style.strokeDashoffset="0"})})}_buildChart(){const e=this.jsonAttr("loss",[]),r=this.jsonAttr("accuracy",[]),i=this.jsonAttr("lr",[]),s=this.getAttribute("x-label")||"Epoch";this.hasAttribute("tooltip");const a=Math.max(e.length,r.length,i.length);if(a===0){this.render('<div class="td-container"></div>');return}const o=_n-ut.left-ut.right,c=br-ut.top-ut.bottom,l=qt().domain([0,a-1]).range([0,o]),u=Math.max(e.length?Math.max(...e):0,r.length?Math.max(...r):1)*1.1,h=qt().domain([0,u]).range([c,0]),f=i.length>0,d=f?Math.max(...i)*1.2:1,g=qt().domain([0,d]).range([c,0]),p=(S,C)=>vr().x((y,$)=>ut.left+l($)).y(y=>ut.top+C(y)).curve(Qa)(S)||"",_=[];e.length&&_.push({name:"Loss",color:"var(--lv-negative)",data:e,axis:"left"}),r.length&&_.push({name:"Accuracy",color:"var(--lv-positive)",data:r,axis:"left"}),f&&_.push({name:"Learning Rate",color:"var(--lv-accent2)",data:i,axis:"right"});const x=_.map(S=>`<div class="legend-item"><div class="legend-dot" style="background:${S.color}"></div>${S.name}</div>`).join("");let b="";const v=h.ticks(5);v.forEach(S=>{const C=ut.top+h(S);b+=`<line class="grid-line" x1="${ut.left}" x2="${_n-ut.right}" y1="${C}" y2="${C}"/>`});let m="";v.forEach(S=>{const C=ut.top+h(S);m+=`<text class="axis-text" x="${ut.left-8}" y="${C}" text-anchor="end" dominant-baseline="central">${S.toFixed(2)}</text>`}),f&&g.ticks(4).forEach(S=>{const C=ut.top+g(S);m+=`<text class="axis-text" x="${_n-ut.right+8}" y="${C}" text-anchor="start" dominant-baseline="central">${S.toFixed(4)}</text>`}),l.ticks(Math.min(a,10)).forEach(S=>{const C=ut.left+l(S);m+=`<text class="axis-text" x="${C}" y="${br-ut.bottom+20}" text-anchor="middle">${Math.round(S)}</text>`}),m+=`<text class="axis-text" x="${_n/2}" y="${br-4}" text-anchor="middle">${s}</text>`;let A="";_.forEach((S,C)=>{const y=S.axis==="left"?h:g,$=p(S.data,y);A+=`<path class="metric-line" d="${$}" stroke="${S.color}" data-idx="${C*.3}"/>`}),this.render(`
      <div class="td-container">
        <div class="legend">${x}</div>
        <svg viewBox="0 0 ${_n} ${br}" role="img" aria-label="Training Dashboard">
          ${b}${m}${A}
        </svg>
      </div>
    `)}}customElements.define("lv-train-dashboard",S0);function oo(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function T0(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e>i||e===void 0&&i>=i)&&(e=i)}return e}function Ei(n,t){let e=0;if(t===void 0)for(let r of n)(r=+r)&&(e+=r);else{let r=-1;for(let i of n)(i=+t(i,++r,n))&&(e+=i)}return e}function M0(n){return n.depth}function E0(n,t){return n.sourceLinks.length?n.depth:t-1}function wr(n){return function(){return n}}function lo(n,t){return kr(n.source,t.source)||n.index-t.index}function co(n,t){return kr(n.target,t.target)||n.index-t.index}function kr(n,t){return n.y0-t.y0}function Li(n){return n.value}function L0(n){return n.index}function P0(n){return n.nodes}function z0(n){return n.links}function uo(n,t){const e=n.get(t);if(!e)throw new Error("missing: "+t);return e}function ho({nodes:n}){for(const t of n){let e=t.y0,r=e;for(const i of t.sourceLinks)i.y0=e+i.width/2,e+=i.width;for(const i of t.targetLinks)i.y1=r+i.width/2,r+=i.width}}function O0(){let n=0,t=0,e=1,r=1,i=24,s=8,a,o=L0,c=E0,l,u,h=P0,f=z0,d=6;function g(){const k={nodes:h.apply(null,arguments),links:f.apply(null,arguments)};return p(k),_(k),x(k),b(k),w(k),ho(k),k}g.update=function(k){return ho(k),k},g.nodeId=function(k){return arguments.length?(o=typeof k=="function"?k:wr(k),g):o},g.nodeAlign=function(k){return arguments.length?(c=typeof k=="function"?k:wr(k),g):c},g.nodeSort=function(k){return arguments.length?(l=k,g):l},g.nodeWidth=function(k){return arguments.length?(i=+k,g):i},g.nodePadding=function(k){return arguments.length?(s=a=+k,g):s},g.nodes=function(k){return arguments.length?(h=typeof k=="function"?k:wr(k),g):h},g.links=function(k){return arguments.length?(f=typeof k=="function"?k:wr(k),g):f},g.linkSort=function(k){return arguments.length?(u=k,g):u},g.size=function(k){return arguments.length?(n=t=0,e=+k[0],r=+k[1],g):[e-n,r-t]},g.extent=function(k){return arguments.length?(n=+k[0][0],e=+k[1][0],t=+k[0][1],r=+k[1][1],g):[[n,t],[e,r]]},g.iterations=function(k){return arguments.length?(d=+k,g):d};function p({nodes:k,links:L}){for(const[R,O]of k.entries())O.index=R,O.sourceLinks=[],O.targetLinks=[];const z=new Map(k.map((R,O)=>[o(R,O,k),R]));for(const[R,O]of L.entries()){O.index=R;let{source:N,target:I}=O;typeof N!="object"&&(N=O.source=uo(z,N)),typeof I!="object"&&(I=O.target=uo(z,I)),N.sourceLinks.push(O),I.targetLinks.push(O)}if(u!=null)for(const{sourceLinks:R,targetLinks:O}of k)R.sort(u),O.sort(u)}function _({nodes:k}){for(const L of k)L.value=L.fixedValue===void 0?Math.max(Ei(L.sourceLinks,Li),Ei(L.targetLinks,Li)):L.fixedValue}function x({nodes:k}){const L=k.length;let z=new Set(k),R=new Set,O=0;for(;z.size;){for(const N of z){N.depth=O;for(const{target:I}of N.sourceLinks)R.add(I)}if(++O>L)throw new Error("circular link");z=R,R=new Set}}function b({nodes:k}){const L=k.length;let z=new Set(k),R=new Set,O=0;for(;z.size;){for(const N of z){N.height=O;for(const{source:I}of N.targetLinks)R.add(I)}if(++O>L)throw new Error("circular link");z=R,R=new Set}}function v({nodes:k}){const L=oo(k,O=>O.depth)+1,z=(e-n-i)/(L-1),R=new Array(L);for(const O of k){const N=Math.max(0,Math.min(L-1,Math.floor(c.call(null,O,L))));O.layer=N,O.x0=n+N*z,O.x1=O.x0+i,R[N]?R[N].push(O):R[N]=[O]}if(l)for(const O of R)O.sort(l);return R}function m(k){const L=T0(k,z=>(r-t-(z.length-1)*a)/Ei(z,Li));for(const z of k){let R=t;for(const O of z){O.y0=R,O.y1=R+O.value*L,R=O.y1+a;for(const N of O.sourceLinks)N.width=N.value*L}R=(r-R+a)/(z.length+1);for(let O=0;O<z.length;++O){const N=z[O];N.y0+=R*(O+1),N.y1+=R*(O+1)}T(z)}}function w(k){const L=v(k);a=Math.min(s,(r-t)/(oo(L,z=>z.length)-1)),m(L);for(let z=0;z<d;++z){const R=Math.pow(.99,z),O=Math.max(1-R,(z+1)/d);S(L,R,O),A(L,R,O)}}function A(k,L,z){for(let R=1,O=k.length;R<O;++R){const N=k[R];for(const I of N){let tt=0,xt=0;for(const{source:Z,value:Me}of I.targetLinks){let te=Me*(I.layer-Z.layer);tt+=M(Z,I)*te,xt+=te}if(!(xt>0))continue;let rt=(tt/xt-I.y0)*L;I.y0+=rt,I.y1+=rt,E(I)}l===void 0&&N.sort(kr),C(N,z)}}function S(k,L,z){for(let R=k.length,O=R-2;O>=0;--O){const N=k[O];for(const I of N){let tt=0,xt=0;for(const{target:Z,value:Me}of I.sourceLinks){let te=Me*(Z.layer-I.layer);tt+=P(I,Z)*te,xt+=te}if(!(xt>0))continue;let rt=(tt/xt-I.y0)*L;I.y0+=rt,I.y1+=rt,E(I)}l===void 0&&N.sort(kr),C(N,z)}}function C(k,L){const z=k.length>>1,R=k[z];$(k,R.y0-a,z-1,L),y(k,R.y1+a,z+1,L),$(k,r,k.length-1,L),y(k,t,0,L)}function y(k,L,z,R){for(;z<k.length;++z){const O=k[z],N=(L-O.y0)*R;N>1e-6&&(O.y0+=N,O.y1+=N),L=O.y1+a}}function $(k,L,z,R){for(;z>=0;--z){const O=k[z],N=(O.y1-L)*R;N>1e-6&&(O.y0-=N,O.y1-=N),L=O.y0-a}}function E({sourceLinks:k,targetLinks:L}){if(u===void 0){for(const{source:{sourceLinks:z}}of L)z.sort(co);for(const{target:{targetLinks:z}}of k)z.sort(lo)}}function T(k){if(u===void 0)for(const{sourceLinks:L,targetLinks:z}of k)L.sort(co),z.sort(lo)}function M(k,L){let z=k.y0-(k.sourceLinks.length-1)*a/2;for(const{target:R,width:O}of k.sourceLinks){if(R===L)break;z+=O+a}for(const{source:R,width:O}of L.targetLinks){if(R===k)break;z-=O}return z}function P(k,L){let z=L.y0-(L.targetLinks.length-1)*a/2;for(const{source:R,width:O}of L.targetLinks){if(R===k)break;z+=O+a}for(const{target:R,width:O}of k.sourceLinks){if(R===L)break;z-=O}return z}return g}var Pi=Math.PI,zi=2*Pi,ye=1e-6,R0=zi-ye;function Oi(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function fo(){return new Oi}Oi.prototype=fo.prototype={constructor:Oi,moveTo:function(n,t){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+t)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(n,t){this._+="L"+(this._x1=+n)+","+(this._y1=+t)},quadraticCurveTo:function(n,t,e,r){this._+="Q"+ +n+","+ +t+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(n,t,e,r,i,s){this._+="C"+ +n+","+ +t+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+s)},arcTo:function(n,t,e,r,i){n=+n,t=+t,e=+e,r=+r,i=+i;var s=this._x1,a=this._y1,o=e-n,c=r-t,l=s-n,u=a-t,h=l*l+u*u;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=n)+","+(this._y1=t);else if(h>ye)if(!(Math.abs(u*o-c*l)>ye)||!i)this._+="L"+(this._x1=n)+","+(this._y1=t);else{var f=e-s,d=r-a,g=o*o+c*c,p=f*f+d*d,_=Math.sqrt(g),x=Math.sqrt(h),b=i*Math.tan((Pi-Math.acos((g+h-p)/(2*_*x)))/2),v=b/x,m=b/_;Math.abs(v-1)>ye&&(this._+="L"+(n+v*l)+","+(t+v*u)),this._+="A"+i+","+i+",0,0,"+ +(u*f>l*d)+","+(this._x1=n+m*o)+","+(this._y1=t+m*c)}},arc:function(n,t,e,r,i,s){n=+n,t=+t,e=+e,s=!!s;var a=e*Math.cos(r),o=e*Math.sin(r),c=n+a,l=t+o,u=1^s,h=s?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);this._x1===null?this._+="M"+c+","+l:(Math.abs(this._x1-c)>ye||Math.abs(this._y1-l)>ye)&&(this._+="L"+c+","+l),e&&(h<0&&(h=h%zi+zi),h>R0?this._+="A"+e+","+e+",0,1,"+u+","+(n-a)+","+(t-o)+"A"+e+","+e+",0,1,"+u+","+(this._x1=c)+","+(this._y1=l):h>ye&&(this._+="A"+e+","+e+",0,"+ +(h>=Pi)+","+u+","+(this._x1=n+e*Math.cos(i))+","+(this._y1=t+e*Math.sin(i))))},rect:function(n,t,e,r){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+t)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};function po(n){return function(){return n}}function N0(n){return n[0]}function D0(n){return n[1]}var F0=Array.prototype.slice;function I0(n){return n.source}function q0(n){return n.target}function B0(n){var t=I0,e=q0,r=N0,i=D0,s=null;function a(){var o,c=F0.call(arguments),l=t.apply(this,c),u=e.apply(this,c);if(s||(s=o=fo()),n(s,+r.apply(this,(c[0]=l,c)),+i.apply(this,c),+r.apply(this,(c[0]=u,c)),+i.apply(this,c)),o)return s=null,o+""||null}return a.source=function(o){return arguments.length?(t=o,a):t},a.target=function(o){return arguments.length?(e=o,a):e},a.x=function(o){return arguments.length?(r=typeof o=="function"?o:po(+o),a):r},a.y=function(o){return arguments.length?(i=typeof o=="function"?o:po(+o),a):i},a.context=function(o){return arguments.length?(s=o??null,a):s},a}function H0(n,t,e,r,i){n.moveTo(t,e),n.bezierCurveTo(t=(t+r)/2,e,t,i,r,i)}function V0(){return B0(H0)}function X0(n){return[n.source.x1,n.y0]}function Y0(n){return[n.target.x0,n.y1]}function G0(){return V0().source(X0).target(Y0)}const W0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`,go=["var(--lv-chart-0)","var(--lv-chart-1)","var(--lv-chart-2)","var(--lv-chart-3)","var(--lv-chart-4)","var(--lv-chart-5)","var(--lv-chart-6)","var(--lv-chart-7)"];class j0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["nodes","links","node-colors"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(W0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelectorAll(".node");r.forEach((a,o)=>{const c=a;c.style.transition="none",c.style.opacity="0",c.style.transform="translateX(-20px)",requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.transition=`opacity 400ms ease-out ${o*80}ms, transform 400ms ease-out ${o*80}ms`,c.style.opacity="1",c.style.transform="translateX(0)"}))});const i=this.root.querySelectorAll(".link"),s=r.length*80;i.forEach((a,o)=>{const c=a,l=c.getTotalLength();c.style.strokeDasharray=String(l),c.style.strokeDashoffset=String(l),c.style.transition=`stroke-dashoffset 600ms ease-out ${s+o*50}ms`,requestAnimationFrame(()=>{c.style.strokeDashoffset="0"})})}_buildChart(){const e=this.jsonAttr("nodes",[]),r=this.jsonAttr("links",[]),i=this.jsonAttr("node-colors",[]);if(!e.length||!r.length){this.render("<svg></svg>");return}const s=600,a=Math.max(300,e.length*40),o=20,c=this.isRtl,l=O0().nodeId((h,f)=>f).nodeWidth(20).nodePadding(16).nodeAlign(M0).extent([[o,o],[s-o,a-o]])({nodes:e.map(h=>({name:h})),links:r.map(h=>({...h}))});let u="";l.links.forEach((h,f)=>{const d=G0()(h),g=i[h.source.index]||go[h.source.index%8];u+=`<path class="link" d="${d}" stroke="${g}" stroke-width="${Math.max(1,h.width)}"/>`}),l.nodes.forEach((h,f)=>{const d=i[f]||go[f%8],g=c?s-h.x1:h.x0,p=h.x1-h.x0,_=h.y0,x=h.y1-h.y0,b=c?g-6:g+p+6,v=c?"end":"start";u+=`<g class="node">
        <rect x="${g}" y="${_}" width="${p}" height="${x}" rx="3" fill="${d}"/>
        <text class="node-label" x="${b}" y="${_+x/2}"
          text-anchor="${v}" dominant-baseline="central">${this._esc(h.name)}</text>
      </g>`}),this.render(`<svg viewBox="0 0 ${s} ${a}" role="img" aria-label="Sankey Diagram">${u}</svg>`)}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sankey",j0);const U0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`,K0=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class Z0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(U0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelector("canvas");r&&(r.style.opacity="0",r.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{r.style.opacity="1"}))}_buildChart(){const e=this.jsonAttr("data",[]),r=parseFloat(this.getAttribute("roughness")||"2");if(!e.length){this.render('<div class="sketch-container"></div>');return}const i=500,s=300,a={top:20,right:20,bottom:40,left:50};this.render(`<div class="sketch-container">
      <canvas width="${i*2}" height="${s*2}" style="width:${i}px;height:${s}px;"></canvas>
      <div class="bar-labels">${e.map(_=>`<span>${this._esc(_.label)}</span>`).join("")}</div>
    </div>`);const o=this.root.querySelector("canvas");if(!o)return;const c=X.canvas(o),l=o.getContext("2d");if(!l)return;l.scale(2,2);const u=Math.max(...e.map(_=>_.value)),h=i-a.left-a.right,f=s-a.top-a.bottom,d=h/e.length*.7,g=h/e.length*.3;c.line(a.left,s-a.bottom,i-a.right,s-a.bottom,{roughness:r*.5,stroke:"#888"}),c.line(a.left,a.top,a.left,s-a.bottom,{roughness:r*.5,stroke:"#888"});const p=this.isRtl;e.forEach((_,x)=>{const b=_.value/u*f,v=p?e.length-1-x:x,m=a.left+v*(d+g)+g/2,w=s-a.bottom-b,A=_.color||`var(--lv-chart-${x%8})`,S=A.startsWith("var(")?K0[x%8]:A;c.rectangle(m,w,d,b,{roughness:r,fill:S,fillStyle:"hachure",hachureGap:6,stroke:S,strokeWidth:1.5})}),l.font="11px sans-serif",l.fillStyle="#888",l.textAlign="right";for(let _=0;_<=4;_++){const x=u*_/4,b=s-a.bottom-_/4*f;l.fillText(x.toFixed(1),a.left-8,b+4)}}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sketch-bar",Z0);const Q0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`,mo=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class J0 extends q{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","x-label","y-label","color","area","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Q0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelector("canvas");r&&(r.style.opacity="0",r.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{r.style.opacity="1"}))}_buildChart(){const e=this.jsonAttr("data",[]),r=this.getAttribute("x-label")||"",i=this.getAttribute("y-label")||"",s=this.getAttribute("color")||"",a=this.hasAttribute("area"),o=parseFloat(this.getAttribute("roughness")||"2");if(!e.length){this.render("<canvas></canvas>");return}const c=typeof e[0]=="number"?e.map((T,M)=>({x:M,y:T})):e,l=500,u=260,h={top:20,right:20,bottom:40,left:55};this.render(`<canvas width="${l*2}" height="${u*2}" style="width:${l}px;height:${u}px;"></canvas>`);const f=this.root.querySelector("canvas");if(!f)return;const d=X.canvas(f),g=f.getContext("2d");if(!g)return;g.scale(2,2);const p=c.map(T=>T.x),_=c.map(T=>T.y),x=Math.min(...p),b=Math.max(...p),v=Math.min(0,Math.min(..._)),m=Math.max(..._)*1.1,w=l-h.left-h.right,A=u-h.top-h.bottom,S=T=>h.left+(T-x)/(b-x||1)*w,C=T=>h.top+(1-(T-v)/(m-v||1))*A,y=s.startsWith("var(")?mo[0]:s||mo[0];if(d.line(h.left,u-h.bottom,l-h.right,u-h.bottom,{roughness:o*.5,stroke:"#888"}),d.line(h.left,h.top,h.left,u-h.bottom,{roughness:o*.5,stroke:"#888"}),a){const T=[[S(c[0].x),C(v)],...c.map(M=>[S(M.x),C(M.y)]),[S(c[c.length-1].x),C(v)]];d.polygon(T,{roughness:o*.3,fill:y,fillStyle:"hachure",hachureGap:8,hachureAngle:60,stroke:"none",fillWeight:.5})}const $=c.map(T=>[S(T.x),C(T.y)]);d.curve($,{roughness:o,stroke:y,strokeWidth:2.5}),c.forEach(T=>{d.circle(S(T.x),C(T.y),6,{roughness:o*.5,fill:y,fillStyle:"solid",stroke:y})}),g.font="11px sans-serif",g.fillStyle="#888",g.textAlign="center",r&&g.fillText(r,l/2,u-4),i&&(g.save(),g.translate(12,u/2),g.rotate(-Math.PI/2),g.fillText(i,0,0),g.restore()),g.textAlign="right";for(let T=0;T<=4;T++){const M=v+(m-v)*T/4;g.fillText(M.toFixed(2),h.left-8,C(M)+4)}g.textAlign="center";const E=Math.ceil(c.length/8);for(let T=0;T<c.length;T+=E)g.fillText(String(c[T].x),S(c[T].x),u-h.bottom+16)}}customElements.define("lv-sketch-line",J0);const tg=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`,Ri=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class eg extends q{constructor(){super(...arguments);D(this,"_raf",null);D(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","clusters","auto-rotate","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(tg),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}_buildScene(){const e=this.jsonAttr("data",[]);this.getAttribute("x-label"),this.getAttribute("y-label"),this.getAttribute("z-label");const r=this.hasAttribute("clusters"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!e.length)return;const s=this.root.getElementById("scene");if(!s)return;const a=s.clientWidth||500,o=s.clientHeight||375,c=new V.Scene;c.background=new V.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const l=new V.PerspectiveCamera(50,a/o,.1,100);l.position.set(2.5,2,2.5),l.lookAt(0,0,0);const u=new V.WebGLRenderer({antialias:!0});u.setSize(a,o),u.setPixelRatio(window.devicePixelRatio),s.appendChild(u.domElement),this._renderer=u;const h=new tn.OrbitControls(l,u.domElement);h.enableDamping=!0,h.dampingFactor=.05,h.autoRotate=i,h.autoRotateSpeed=1;const f=e.map(M=>M.x),d=e.map(M=>M.y),g=e.map(M=>M.z),p=M=>{const P=Math.min(...M),L=Math.max(...M)-P||1;return M.map(z=>(z-P)/L*2-1)},_=p(f),x=p(d),b=p(g),v=[...new Set(e.map(M=>M.cluster||""))],m=M=>{const P=v.indexOf(M);return new V.Color(Ri[P%Ri.length])},w=new V.BufferGeometry,A=new Float32Array(e.length*3),S=new Float32Array(e.length*3);e.forEach((M,P)=>{A[P*3]=_[P],A[P*3+1]=x[P],A[P*3+2]=b[P];const k=r?m(M.cluster||""):new V.Color(Ri[0]);S[P*3]=k.r,S[P*3+1]=k.g,S[P*3+2]=k.b}),w.setAttribute("position",new V.BufferAttribute(A,3)),w.setAttribute("color",new V.BufferAttribute(S,3));const C=new V.PointsMaterial({size:.06,vertexColors:!0,sizeAttenuation:!0});c.add(new V.Points(w,C));const y=1.2,$=[16729156,4521796,4474111];[[y,0,0],[0,y,0],[0,0,y]].forEach(([M,P,k],L)=>{const z=[new V.Vector3(0,0,0),new V.Vector3(M,P,k)],R=new V.BufferGeometry().setFromPoints(z),O=new V.LineBasicMaterial({color:$[L],opacity:.4,transparent:!0});c.add(new V.Line(R,O))});const E=new V.GridHelper(2,10,3355477,2236996);E.position.y=-1,c.add(E);const T=()=>{this._raf=requestAnimationFrame(T),h.update(),u.render(c,l)};T()}}customElements.define("lv-scatter-3d",eg);const ng=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;class rg extends q{constructor(){super(...arguments);D(this,"_raf",null);D(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","color-scale","wireframe","auto-rotate"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ng),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}_buildScene(){const e=this.jsonAttr("data",[]),r=this.hasAttribute("wireframe"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!e.length||!e[0].length)return;const s=this.root.getElementById("scene");if(!s)return;const a=s.clientWidth||500,o=s.clientHeight||375,c=e.length,l=e[0].length,u=e.flat(),h=Math.min(...u),d=Math.max(...u)-h||1,g=new V.Scene;g.background=new V.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const p=new V.PerspectiveCamera(50,a/o,.1,100);p.position.set(2.5,2.5,2.5),p.lookAt(0,0,0);const _=new V.WebGLRenderer({antialias:!0});_.setSize(a,o),_.setPixelRatio(window.devicePixelRatio),s.appendChild(_.domElement),this._renderer=_;const x=new tn.OrbitControls(p,_.domElement);x.enableDamping=!0,x.autoRotate=i,x.autoRotateSpeed=.8;const b=new V.PlaneGeometry(2,2,l-1,c-1),v=b.attributes.position,m=new Float32Array(v.count*3);for(let C=0;C<c;C++)for(let y=0;y<l;y++){const $=C*l+y,E=(e[C][y]-h)/d;v.setZ($,E-.5);const T=E;let M,P,k;T<.25?(M=0,P=T*4,k=1):T<.5?(M=0,P=1,k=1-(T-.25)*4):T<.75?(M=(T-.5)*4,P=1,k=0):(M=1,P=1-(T-.75)*4,k=0),m[$*3]=M,m[$*3+1]=P,m[$*3+2]=k}b.setAttribute("color",new V.BufferAttribute(m,3)),b.computeVertexNormals(),b.rotateX(-Math.PI/2);const w=r?new V.MeshBasicMaterial({vertexColors:!0,wireframe:!0}):new V.MeshPhongMaterial({vertexColors:!0,side:V.DoubleSide,flatShading:!0});if(g.add(new V.Mesh(b,w)),!r){g.add(new V.AmbientLight(16777215,.4));const C=new V.DirectionalLight(16777215,.8);C.position.set(3,5,3),g.add(C)}const A=new V.GridHelper(2,10,3355477,2236996);A.position.y=-.5,g.add(A);const S=()=>{this._raf=requestAnimationFrame(S),x.update(),_.render(g,p)};S()}}customElements.define("lv-surface-3d",rg);const ig=`
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
`,ht=120,Nt=90,Ni=60,Di=40,_o=10,vo=2,yo=8,vn=60;function Fi(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class sg extends q{constructor(){super(...arguments);D(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(ig),this._readChildren(),this._renderSvg()}_readChildren(){this._steps=[],this.querySelectorAll("lv-flow-step").forEach(r=>{this._steps.push({icon:r.getAttribute("icon")||"",label:r.getAttribute("label")||"",sub:r.getAttribute("sub")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",active:r.hasAttribute("active")})})}_renderSvg(){const e=this._steps;if(e.length===0)return;const i=(this.getAttribute("direction")||"horizontal")==="horizontal",s=this.hasAttribute("cyclic"),a=this.isRtl,o=24,c=s?vn+40:0;let l,u;i?(l=o*2+e.length*ht+(e.length-1)*Ni,u=o*2+Nt+c):(l=o*2+ht+c,u=o*2+e.length*Nt+(e.length-1)*Di);const h=[];for(let v=0;v<e.length;v++)if(i){let m=o+v*(ht+Ni);a&&(m=l-o-ht-v*(ht+Ni)),h.push({x:m,y:o})}else h.push({x:o,y:o+v*(Nt+Di)});const f="arrowhead",d=yo,g=yo,p=`
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
      </defs>`;let _="";for(let v=0;v<e.length;v++){const m=e[v],w=h[v],A=m.active?m.color:"var(--lv-border, #333)",S=m.active?' filter="url(#glow)"':"";_+=`
        <g class="step-group" style="transition-delay: ${v*150}ms">
          <rect x="${w.x}" y="${w.y}" width="${ht}" height="${Nt}"
                rx="${_o}" ry="${_o}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${A}" stroke-width="${m.active?2.5:1.5}"
                ${S} />
          <text x="${w.x+ht/2}" y="${w.y+30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${Fi(m.icon)}
          </text>
          <text x="${w.x+ht/2}" y="${w.y+54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${Fi(m.label)}
          </text>
          <text x="${w.x+ht/2}" y="${w.y+70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${Fi(m.sub)}
          </text>
        </g>`}let x="";for(let v=0;v<e.length-1;v++){const m=h[v],w=h[v+1],A=e.length*150+v*120;let S;if(i){const y=a?m.x:m.x+ht,$=a?w.x+ht:w.x,E=m.y+Nt/2,M=Math.abs($-y)*.35,P=$>y?1:-1;S=`M${y},${E} C${y+P*M},${E} ${$-P*M},${E} ${$},${E}`}else{const y=m.x+ht/2,$=m.y+Nt,E=w.y,T=(E-$)*.4;S=`M${y},${$} C${y},${$+T} ${y},${E-T} ${y},${E}`}const C=i?Math.abs(h[v+1].x-h[v].x)+20:Di+Nt;x+=`
        <path class="arrow-path" d="${S}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${vo}"
              marker-end="url(#${f})"
              stroke-dasharray="${C}"
              stroke-dashoffset="${C}"
              style="transition-delay: ${A}ms" />`}if(s&&e.length>1){const v=h[0],m=h[e.length-1],w=e.length*150+(e.length-1)*120;let A,S;if(i){const C=m.x+ht/2,y=v.x+ht/2,$=m.y+Nt,E=v.y+Nt,T=Math.max($,E)+vn;A=`M${C},${$} C${C},${T} ${y},${T} ${y},${E}`,S=Math.abs(C-y)+vn*2}else{const C=m.x+ht,y=m.y+Nt/2,$=v.y+Nt/2,E=C+vn;A=`M${C},${y} C${E},${y} ${E},${$} ${C},${$}`,S=Math.abs(y-$)+vn*2}x+=`
        <path class="arrow-path" d="${A}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${vo}"
              marker-end="url(#${f})"
              stroke-dasharray="${S}"
              stroke-dashoffset="${S}"
              style="transition-delay: ${w}ms" />`}const b=`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${x}
        ${_}
      </svg>`;this.render(b)}animateIn(e){e&&(this.root.querySelectorAll(".step-group").forEach(r=>{r.style.transition="none",r.style.opacity="1",r.style.transform="translateY(0)"}),this.root.querySelectorAll(".arrow-path").forEach(r=>{r.style.transition="none",r.style.strokeDashoffset="0"})),this.classList.add("lv-entered")}}class ag extends HTMLElement{}customElements.define("lv-flow",sg),customElements.define("lv-flow-step",ag);const og=`
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
`;function xo(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class lg extends q{constructor(){super(...arguments);D(this,"_items",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(og),this._readChildren(),this._renderTimeline()}_readChildren(){this._items=[],this.querySelectorAll("lv-timeline-item").forEach(r=>{this._items.push({date:r.getAttribute("date")||"",title:r.getAttribute("title")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",body:r.innerHTML.trim()})})}_renderTimeline(){if(this._items.length===0)return;let e="";for(let r=0;r<this._items.length;r++){const i=this._items[r];e+=`
        <div class="tl-item" style="animation-delay: ${r*100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date?`<div class="tl-date">${xo(i.date)}</div>`:""}
            ${i.title?`<div class="tl-title">${xo(i.title)}</div>`:""}
            ${i.body?`<div class="tl-body">${i.body}</div>`:""}
          </div>
        </div>`}this.render(`<div class="timeline">${e}</div>`)}animateIn(e){e&&this.root.querySelectorAll(".tl-item").forEach(r=>{r.style.animation="none",r.style.opacity="1",r.style.transform="translateX(0)"}),this.classList.add("lv-entered")}}class cg extends HTMLElement{}customElements.define("lv-timeline",lg),customElements.define("lv-timeline-item",cg);function Kt(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function bo(n,t){n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var kt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Fe={duration:.5,overwrite:!1,delay:0},Ii,at,W,Et=1e8,Y=1/Et,qi=Math.PI*2,ug=qi/4,hg=0,wo=Math.sqrt,fg=Math.cos,dg=Math.sin,it=function(t){return typeof t=="string"},Q=function(t){return typeof t=="function"},Zt=function(t){return typeof t=="number"},Bi=function(t){return typeof t>"u"},Ht=function(t){return typeof t=="object"},gt=function(t){return t!==!1},Hi=function(){return typeof window<"u"},Ar=function(t){return Q(t)||it(t)},ko=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},lt=Array.isArray,pg=/random\([^)]+\)/g,gg=/,\s*/g,Ao=/(?:-?\.?\d|\.)+/gi,$o=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ie=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Vi=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Co=/[+-]=-?[.\d]+/,mg=/[^,'"\[\]\s]+/gi,_g=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,j,Vt,Xi,Yi,At={},$r={},So,To=function(t){return($r=Be(t,At))&&vt},Gi=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},yn=function(t,e){return!e&&console.warn(t)},Mo=function(t,e){return t&&(At[t]=e)&&$r&&($r[t]=e)||At},xn=function(){return 0},vg={suppressEvents:!0,isStart:!0,kill:!1},Cr={suppressEvents:!0,kill:!1},yg={suppressEvents:!0},Wi={},ee=[],ji={},Eo,$t={},Ui={},Lo=30,Sr=[],Ki="",Zi=function(t){var e=t[0],r,i;if(Ht(e)||Q(e)||(t=[t]),!(r=(e._gsap||{}).harness)){for(i=Sr.length;i--&&!Sr[i].targetTest(e););r=Sr[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new al(t[i],r)))||t.splice(i,1);return t},xe=function(t){return t._gsap||Zi(Pt(t))[0]._gsap},Po=function(t,e,r){return(r=t[e])&&Q(r)?t[e]():Bi(r)&&t.getAttribute&&t.getAttribute(e)||r},mt=function(t,e){return(t=t.split(",")).forEach(e)||t},J=function(t){return Math.round(t*1e5)/1e5||0},U=function(t){return Math.round(t*1e7)/1e7||0},qe=function(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),r==="+"?t+i:r==="-"?t-i:r==="*"?t*i:t/i},xg=function(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r},Tr=function(){var t=ee.length,e=ee.slice(0),r,i;for(ji={},ee.length=0,r=0;r<t;r++)i=e[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Qi=function(t){return!!(t._initted||t._startAt||t.add)},zo=function(t,e,r,i){ee.length&&!at&&Tr(),t.render(e,r,!!(at&&e<0&&Qi(t))),ee.length&&!at&&Tr()},Oo=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(mg).length<2?e:it(t)?t.trim():t},Ro=function(t){return t},Ct=function(t,e){for(var r in e)r in t||(t[r]=e[r]);return t},bg=function(t){return function(e,r){for(var i in r)i in e||i==="duration"&&t||i==="ease"||(e[i]=r[i])}},Be=function(t,e){for(var r in e)t[r]=e[r];return t},No=function n(t,e){for(var r in e)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(t[r]=Ht(e[r])?n(t[r]||(t[r]={}),e[r]):e[r]);return t},Mr=function(t,e){var r={},i;for(i in t)i in e||(r[i]=t[i]);return r},bn=function(t){var e=t.parent||j,r=t.keyframes?bg(lt(t.keyframes)):Ct;if(gt(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t},wg=function(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0},Do=function(t,e,r,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Er=function(t,e,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[r]===e&&(t[r]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},ne=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},be=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t},kg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Ji=function(t,e,r,i){return t._startAt&&(at?t._startAt.revert(Cr):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Ag=function n(t){return!t||t._ts&&n(t.parent)},Fo=function(t){return t._repeat?He(t._tTime,t=t.duration()+t._rDelay)*t:0},He=function(t,e){var r=Math.floor(t=U(t/e));return t&&r===t?r-1:r},Lr=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Pr=function(t){return t._end=U(t._start+(t._tDur/Math.abs(t._ts||t._rts||Y)||0))},zr=function(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=U(r._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Pr(t),r._dirty||be(r,t)),t},Io=function(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Lr(t.rawTime(),e),(!e._dur||kn(0,e.totalDuration(),r)-e._tTime>Y)&&e.render(r,!0)),be(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;t._zTime=-Y}},Xt=function(t,e,r,i){return e.parent&&ne(e),e._start=U((Zt(r)?r:r||t!==j?Lt(t,r,e):t._time)+e._delay),e._end=U(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Do(t,e,"_first","_last",t._sort?"_start":0),ts(e)||(t._recent=e),i||Io(t,e),t._ts<0&&zr(t,t._tTime),t},qo=function(t,e){return(At.ScrollTrigger||Gi("scrollTrigger",e))&&At.ScrollTrigger.create(e,t)},Bo=function(t,e,r,i,s){if(cs(t,e,s),!t._initted)return 1;if(!r&&t._pt&&!at&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Eo!==Tt.frame)return ee.push(t),t._lazy=[s,i],1},$g=function n(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||n(e))},ts=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Cg=function(t,e,r,i){var s=t.ratio,a=e<0||!e&&(!t._start&&$g(t)&&!(!t._initted&&ts(t))||(t._ts<0||t._dp._ts<0)&&!ts(t))?0:1,o=t._rDelay,c=0,l,u,h;if(o&&t._repeat&&(c=kn(0,t._tDur,e),u=He(c,o),t._yoyo&&u&1&&(a=1-a),u!==He(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||at||i||t._zTime===Y||!e&&t._zTime){if(!t._initted&&Bo(t,e,i,r,c))return;for(h=t._zTime,t._zTime=e||(r?Y:0),r||(r=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&Ji(t,e,r,!0),t._onUpdate&&!r&&St(t,"onUpdate"),c&&t._repeat&&!r&&t.parent&&St(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ne(t,1),!r&&!at&&(St(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Sg=function(t,e,r){var i;if(r>e)for(i=t._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ve=function(t,e,r,i){var s=t._repeat,a=U(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:U(a*(s+1)+t._rDelay*s):a,o>0&&!i&&zr(t,t._tTime=t._tDur*o),t.parent&&Pr(t),r||be(t.parent,t),t},Ho=function(t){return t instanceof ft?be(t):Ve(t,t._dur)},Tg={_start:0,endTime:xn,totalDuration:xn},Lt=function n(t,e,r){var i=t.labels,s=t._recent||Tg,a=t.duration()>=Et?s.endTime(!1):t._dur,o,c,l;return it(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:r).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&r&&(c=c/100*(lt(r)?r[0]:r).totalDuration()),o>1?n(t,e.substr(0,o-1),r)+c:a+c)):e==null?a:+e},wn=function(t,e,r){var i=Zt(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=r,t){for(o=a,c=r;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=gt(c.vars.inherit)&&c.parent;a.immediateRender=gt(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new et(e[0],a,e[s+1])},re=function(t,e){return t||t===0?e(t):e},kn=function(t,e,r){return r<t?t:r>e?e:r},ct=function(t,e){return!it(t)||!(e=_g.exec(t))?"":e[1]},Mg=function(t,e,r){return re(r,function(i){return kn(t,e,i)})},es=[].slice,Vo=function(t,e){return t&&Ht(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ht(t[0]))&&!t.nodeType&&t!==Vt},Eg=function(t,e,r){return r===void 0&&(r=[]),t.forEach(function(i){var s;return it(i)&&!e||Vo(i,1)?(s=r).push.apply(s,Pt(i)):r.push(i)})||r},Pt=function(t,e,r){return W&&!e&&W.selector?W.selector(t):it(t)&&!r&&(Xi||!Ye())?es.call((e||Yi).querySelectorAll(t),0):lt(t)?Eg(t,r):Vo(t)?es.call(t,0):t?[t]:[]},ns=function(t){return t=Pt(t)[0]||yn("Invalid scope")||{},function(e){var r=t.current||t.nativeElement||t;return Pt(e,r.querySelectorAll?r:r===t?yn("Invalid scope")||Yi.createElement("div"):t)}},Xo=function(t){return t.sort(function(){return .5-Math.random()})},Yo=function(t){if(Q(t))return t;var e=Ht(t)?t:{each:t},r=we(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,u=i,h=i;return it(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(u=i[0],h=i[1]),function(f,d,g){var p=(g||e).length,_=a[p],x,b,v,m,w,A,S,C,y;if(!_){if(y=e.grid==="auto"?0:(e.grid||[1,Et])[1],!y){for(S=-Et;S<(S=g[y++].getBoundingClientRect().left)&&y<p;);y<p&&y--}for(_=a[p]=[],x=c?Math.min(y,p)*u-.5:i%y,b=y===Et?0:c?p*h/y-.5:i/y|0,S=0,C=Et,A=0;A<p;A++)v=A%y-x,m=b-(A/y|0),_[A]=w=l?Math.abs(l==="y"?m:v):wo(v*v+m*m),w>S&&(S=w),w<C&&(C=w);i==="random"&&Xo(_),_.max=S-C,_.min=C,_.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(y>p?p-1:l?l==="y"?p/y:y:Math.max(y,p/y))||0)*(i==="edges"?-1:1),_.b=p<0?s-p:s,_.u=ct(e.amount||e.each)||0,r=r&&p<0?rl(r):r}return p=(_[f]-_.min)/_.max||0,U(_.b+(r?r(p):p)*_.v)+_.u}},rs=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(r){var i=U(Math.round(parseFloat(r)/t)*t*e);return(i-i%1)/e+(Zt(r)?0:ct(r))}},Go=function(t,e){var r=lt(t),i,s;return!r&&Ht(t)&&(i=r=t.radius||Et,t.values?(t=Pt(t.values),(s=!Zt(t[0]))&&(i*=i)):t=rs(t.increment)),re(e,r?Q(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=Et,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-o,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-o),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:a,s||u===a||Zt(a)?u:u+ct(a)}:rs(t))},Wo=function(t,e,r,i){return re(lt(t)?!e:r===!0?!!(r=0):!i,function(){return lt(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+r*.99))/r)*r*i)/i})},Lg=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(i){return e.reduce(function(s,a){return a(s)},i)}},Pg=function(t,e){return function(r){return t(parseFloat(r))+(e||ct(r))}},zg=function(t,e,r){return Uo(t,e,0,1,r)},jo=function(t,e,r){return re(r,function(i){return t[~~e(i)]})},Og=function n(t,e,r){var i=e-t;return lt(t)?jo(t,n(0,t.length),e):re(r,function(s){return(i+(s-t)%i)%i+t})},Rg=function n(t,e,r){var i=e-t,s=i*2;return lt(t)?jo(t,n(0,t.length-1),e):re(r,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},An=function(t){return t.replace(pg,function(e){var r=e.indexOf("[")+1,i=e.substring(r||7,r?e.indexOf("]"):e.length-1).split(gg);return Wo(r?i:+i[0],r?0:+i[1],+i[2]||1e-5)})},Uo=function(t,e,r,i,s){var a=e-t,o=i-r;return re(s,function(c){return r+((c-t)/a*o||0)})},Ng=function n(t,e,r,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=it(t),o={},c,l,u,h,f;if(r===!0&&(i=1)&&(r=null),a)t={p:t},e={p:e};else if(lt(t)&&!lt(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(n(t[l-1],t[l]));h--,s=function(g){g*=h;var p=Math.min(f,~~g);return u[p](g-p)},r=e}else i||(t=Be(lt(t)?[]:{},t));if(!u){for(c in e)os.call(o,t,c,"get",e[c]);s=function(g){return fs(g,o)||(a?t.p:t)}}}return re(r,s)},Ko=function(t,e,r){var i=t.labels,s=Et,a,o,c;for(a in i)o=i[a]-e,o<0==!!r&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},St=function(t,e,r){var i=t.vars,s=i[e],a=W,o=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,r&&ee.length&&Tr(),o&&(W=o),u=c?s.apply(l,c):s.call(l),W=a,u},$n=function(t){return ne(t),t.scrollTrigger&&t.scrollTrigger.kill(!!at),t.progress()<1&&St(t,"onInterrupt"),t},Xe,Zo=[],Qo=function(t){if(t)if(t=!t.name&&t.default||t,Hi()||t.headless){var e=t.name,r=Q(t),i=e&&!r&&t.init?function(){this._props=[]}:t,s={init:xn,render:fs,add:os,kill:Qg,modifier:Zg,rawVars:0},a={targetTest:0,get:0,getSetter:hs,aliases:{},register:0};if(Ye(),t!==i){if($t[e])return;Ct(i,Ct(Mr(t,s),a)),Be(i.prototype,Be(s,Mr(t,a))),$t[i.prop=e]=i,t.targetTest&&(Sr.push(i),Wi[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Mo(e,i),t.register&&t.register(vt,i,_t)}else Zo.push(t)},G=255,Cn={aqua:[0,G,G],lime:[0,G,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,G],navy:[0,0,128],white:[G,G,G],olive:[128,128,0],yellow:[G,G,0],orange:[G,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[G,0,0],pink:[G,192,203],cyan:[0,G,G],transparent:[G,G,G,0]},is=function(t,e,r){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(r-e)*t*6:t<.5?r:t*3<2?e+(r-e)*(2/3-t)*6:e)*G+.5|0},Jo=function(t,e,r){var i=t?Zt(t)?[t>>16,t>>8&G,t&G]:0:Cn.black,s,a,o,c,l,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Cn[t])i=Cn[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&G,i&G,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&G,t&G]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(Ao),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(l+1):u+l-u*l,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=is(c+1/3,s,a),i[1]=is(c,s,a),i[2]=is(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match($o),r&&i.length<4&&(i[3]=1),i}else i=t.match(Ao)||Cn.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/G,a=i[1]/G,o=i[2]/G,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),r&&i.length<4&&(i[3]=1),i},tl=function(t){var e=[],r=[],i=-1;return t.split(ie).forEach(function(s){var a=s.match(Ie)||[];e.push.apply(e,a),r.push(i+=a.length+1)}),e.c=r,e},el=function(t,e,r){var i="",s=(t+i).match(ie),a=e?"hsla(":"rgba(",o=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Jo(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),r&&(u=tl(t),c=r.c,c.join(i)!==u.c.join(i)))for(l=t.replace(ie,"1").split(Ie),h=l.length-1;o<h;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:r).shift());if(!l)for(l=t.split(ie),h=l.length-1;o<h;o++)i+=l[o]+s[o];return i+l[h]},ie=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Cn)n+="|"+t+"\\b";return new RegExp(n+")","gi")})(),Dg=/hsl[a]?\(/,nl=function(t){var e=t.join(" "),r;if(ie.lastIndex=0,ie.test(e))return r=Dg.test(e),t[1]=el(t[1],r),t[0]=el(t[0],r,tl(t[1])),!0},Sn,Tt=(function(){var n=Date.now,t=500,e=33,r=n(),i=r,s=1e3/240,a=s,o=[],c,l,u,h,f,d,g=function p(_){var x=n()-i,b=_===!0,v,m,w,A;if((x>t||x<0)&&(r+=x-e),i+=x,w=i-r,v=w-a,(v>0||b)&&(A=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,a+=v+(v>=s?4:s-v),m=1),b||(c=l(p)),m)for(d=0;d<o.length;d++)o[d](w,f,A,_)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(_){return f/(1e3/(_||60))},wake:function(){So&&(!Xi&&Hi()&&(Vt=Xi=window,Yi=Vt.document||{},At.gsap=vt,(Vt.gsapVersions||(Vt.gsapVersions=[])).push(vt.version),To($r||Vt.GreenSockGlobals||!Vt.gsap&&Vt||{}),Zo.forEach(Qo)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(_){return setTimeout(_,a-h.time*1e3+1|0)},Sn=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Sn=0,l=xn},lagSmoothing:function(_,x){t=_||1/0,e=Math.min(x||33,t)},fps:function(_){s=1e3/(_||240),a=h.time*1e3+s},add:function(_,x,b){var v=x?function(m,w,A,S){_(m,w,A,S),h.remove(v)}:_;return h.remove(_),o[b?"unshift":"push"](v),Ye(),v},remove:function(_,x){~(x=o.indexOf(_))&&o.splice(x,1)&&d>=x&&d--},_listeners:o},h})(),Ye=function(){return!Sn&&Tt.wake()},H={},Fg=/^[\d.\-M][\d.\-,\s]/,Ig=/["']/g,qg=function(t){for(var e={},r=t.substr(1,t.length-3).split(":"),i=r[0],s=1,a=r.length,o,c,l;s<a;s++)c=r[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(Ig,"").trim():+l,i=c.substr(o+1).trim();return e},Bg=function(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)},Hg=function(t){var e=(t+"").split("("),r=H[e[0]];return r&&e.length>1&&r.config?r.config.apply(null,~t.indexOf("{")?[qg(e[1])]:Bg(t).split(",").map(Oo)):H._CE&&Fg.test(t)?H._CE("",t):r},rl=function(t){return function(e){return 1-t(1-e)}},il=function n(t,e){for(var r=t._first,i;r;)r instanceof ft?n(r,e):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==e&&(r.timeline?n(r.timeline,e):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=e)),r=r._next},we=function(t,e){return t&&(Q(t)?t:H[t]||Hg(t))||e},ke=function(t,e,r,i){r===void 0&&(r=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:r,easeInOut:i},a;return mt(t,function(o){H[o]=At[o]=s,H[a=o.toLowerCase()]=r;for(var c in s)H[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=H[o+"."+c]=s[c]}),s},sl=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ss=function n(t,e,r){var i=e>=1?e:1,s=(r||(t?.3:.45))/(e<1?e:1),a=s/qi*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*dg((u-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:sl(o);return s=qi/s,c.config=function(l,u){return n(t,l,u)},c},as=function n(t,e){e===void 0&&(e=1.70158);var r=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?r:t==="in"?function(s){return 1-r(1-s)}:sl(r);return i.config=function(s){return n(t,s)},i};mt("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,t){var e=t<5?t+1:t;ke(n+",Power"+(e-1),t?function(r){return Math.pow(r,e)}:function(r){return r},function(r){return 1-Math.pow(1-r,e)},function(r){return r<.5?Math.pow(r*2,e)/2:1-Math.pow((1-r)*2,e)/2})}),H.Linear.easeNone=H.none=H.Linear.easeIn,ke("Elastic",ss("in"),ss("out"),ss()),(function(n,t){var e=1/t,r=2*e,i=2.5*e,s=function(o){return o<e?n*o*o:o<r?n*Math.pow(o-1.5/t,2)+.75:o<i?n*(o-=2.25/t)*o+.9375:n*Math.pow(o-2.625/t,2)+.984375};ke("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75),ke("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)}),ke("Circ",function(n){return-(wo(1-n*n)-1)}),ke("Sine",function(n){return n===1?1:-fg(n*ug)+1}),ke("Back",as("in"),as("out"),as()),H.SteppedEase=H.steps=At.SteppedEase={config:function(t,e){t===void 0&&(t=1);var r=1/t,i=t+(e?0:1),s=e?1:0,a=1-Y;return function(o){return((i*kn(0,a,o)|0)+s)*r}}},Fe.ease=H["quad.out"],mt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Ki+=n+","+n+"Params,"});var al=function(t,e){this.id=hg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Po,this.set=e?e.getSetter:hs},Tn=(function(){function n(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ve(this,+e.duration,1,1),this.data=e.data,W&&(this._ctx=W,W.data.push(this)),Sn||Tt.wake()}var t=n.prototype;return t.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},t.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},t.totalDuration=function(r){return arguments.length?(this._dirty=0,Ve(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(r,i){if(Ye(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(zr(this,r),!s._dp||s.parent||Io(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&Xt(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Y||!this._initted&&this._dur&&r||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),zo(this,r,i)),this},t.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+Fo(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},t.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+Fo(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(r,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*s,i):this._repeat?He(this._tTime,s)+1:1},t.timeScale=function(r,i){if(!arguments.length)return this._rts===-Y?0:this._rts;if(this._rts===r)return this;var s=this.parent&&this._ts?Lr(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-Y?0:this._rts,this.totalTime(kn(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Pr(this),kg(this)},t.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ye(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Y&&(this._tTime-=Y)))),this):this._ps},t.startTime=function(r){if(arguments.length){this._start=U(r);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Xt(i,this,this._start-this._delay),this}return this._start},t.endTime=function(r){return this._start+(gt(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Lr(i.rawTime(r),this):this._tTime:this._tTime},t.revert=function(r){r===void 0&&(r=yg);var i=at;return at=r,Qi(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),at=i,this},t.globalTime=function(r){for(var i=this,s=arguments.length?r:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):s},t.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,Ho(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,Ho(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},t.seek=function(r,i){return this.totalTime(Lt(this,r),gt(i))},t.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,gt(i)),this._dur||(this._zTime=-Y),this},t.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},t.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-Y:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Y,this},t.isActive=function(){var r=this.parent||this._dp,i=this._start,s;return!!(!r||this._ts&&this._initted&&r.isActive()&&(s=r.rawTime(!0))>=i&&s<this.endTime(!0)-Y)},t.eventCallback=function(r,i,s){var a=this.vars;return arguments.length>1?(i?(a[r]=i,s&&(a[r+"Params"]=s),r==="onUpdate"&&(this._onUpdate=i)):delete a[r],this):a[r]},t.then=function(r){var i=this,s=i._prom;return new Promise(function(a){var o=Q(r)?r:Ro,c=function(){var u=i.then;i.then=null,s&&s(),Q(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){$n(this)},n})();Ct(Tn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Y,_prom:0,_ps:!1,_rts:1});var ft=(function(n){bo(t,n);function t(r,i){var s;return r===void 0&&(r={}),s=n.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=gt(r.sortChildren),j&&Xt(r.parent||j,Kt(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&qo(Kt(s),r.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return wn(0,arguments,this),this},e.from=function(i,s,a){return wn(1,arguments,this),this},e.fromTo=function(i,s,a,o){return wn(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,bn(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new et(i,s,Lt(this,a),1),this},e.call=function(i,s,a){return Xt(this,et.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new et(i,a,Lt(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,u){return a.runBackwards=1,bn(a).immediateRender=gt(a.immediateRender),this.staggerTo(i,s,a,o,c,l,u)},e.staggerFromTo=function(i,s,a,o,c,l,u,h){return o.startAt=a,bn(o).immediateRender=gt(o.immediateRender),this.staggerTo(i,s,o,c,l,u,h)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:U(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,p,_,x,b,v,m,w,A,S;if(this!==j&&u>c&&i>=0&&(u=c),u!==this._tTime||a||h){if(o!==this._time&&l&&(u+=this._time-o,i+=this._time-o),f=u,m=this._start,v=this._ts,x=!v,h&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,_=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(_*100+i,s,a);if(f=U(u%_),u===c?(p=this._repeat,f=l):(w=U(u/_),p=~~w,p&&p===w&&(f=l,p--),f>l&&(f=l)),w=He(this._tTime,_),!o&&this._tTime&&w!==p&&this._tTime-w*_-this._dur<=0&&(w=p),A&&p&1&&(f=l-f,S=1),p!==w&&!this._lock){var C=A&&w&1,y=C===(A&&p&1);if(p<w&&(C=!C),o=C?0:u%l?l:u,this._lock=1,this.render(o||(S?0:U(p*_)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&St(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,w=p),o&&o!==this._time||x!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,y&&(this._lock=2,o=C?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!x)return this;il(this,S)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Sg(this,U(o),U(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&l&&!s&&!w&&(St(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!x){b=0,g&&(u+=this._zTime=-Y);break}}d=g}else{d=this._last;for(var $=i<0?i:f;d;){if(g=d._prev,(d._act||$<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?($-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+($-d._start)*d._ts,s,a||at&&Qi(d)),f!==this._time||!this._ts&&!x){b=0,g&&(u+=this._zTime=$?-Y:Y);break}}d=g}}if(b&&!s&&(this.pause(),b.render(f>=o?0:-Y)._zTime=f>=o?1:-1,this._ts))return this._start=m,Pr(this),this.render(i,s,a);this._onUpdate&&!s&&St(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&o)&&(m===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&ne(this,1),!s&&!(i<0&&!o)&&(u||o||!c)&&(St(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Zt(s)||(s=Lt(this,s,i)),!(i instanceof Tn)){if(lt(i))return i.forEach(function(o){return a.add(o,s)}),this;if(it(i))return this.addLabel(i,s);if(Q(i))i=et.delayedCall(0,i);else return this}return this!==i?Xt(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Et);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof et?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return it(i)?this.removeLabel(i):Q(i)?this.killTweensOf(i):(i.parent===this&&Er(this,i),i===this._recent&&(this._recent=this._last),be(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=U(Tt.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),n.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Lt(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=et.delayedCall(0,s||xn,a);return o.data="isPause",this._hasPause=1,Xt(this,o,Lt(this,i))},e.removePause=function(i){var s=this._first;for(i=Lt(this,i);s;)s._start===i&&s.data==="isPause"&&ne(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)se!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Pt(i),c=this._first,l=Zt(s),u;c;)c instanceof et?xg(c._targets,o)&&(l?(!se||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(u=c.getTweensOf(o,s)).length&&a.push.apply(a,u),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Lt(a,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=et.to(a,Ct({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||Y,onStart:function(){if(a.pause(),!d){var _=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());g._dur!==_&&Ve(g,_,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,Ct({startAt:{time:Lt(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Ko(this,Lt(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Ko(this,Lt(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Y)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=U(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return be(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return n.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),be(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=Et,l,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Xt(a,o,u-o._delay,1)._lock=0):c=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=U(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;Ve(a,a===j&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(j._ts&&(zo(j,Lr(i,j)),Eo=Tt.frame),Tt.frame>=Lo){Lo+=kt.autoSleep||120;var s=j._first;if((!s||!s._ts)&&kt.autoSleep&&Tt._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Tt.sleep()}}},t})(Tn);Ct(ft.prototype,{_lock:0,_hasPause:0,_forcing:0});var Vg=function(t,e,r,i,s,a,o){var c=new _t(this._pt,t,e,0,1,fl,null,s),l=0,u=0,h,f,d,g,p,_,x,b;for(c.b=r,c.e=i,r+="",i+="",(x=~i.indexOf("random("))&&(i=An(i)),a&&(b=[r,i],a(b,t,e),r=b[0],i=b[1]),f=r.match(Vi)||[];h=Vi.exec(i);)g=h[0],p=i.substring(l,h.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(_=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:p||u===1?p:",",s:_,c:g.charAt(1)==="="?qe(_,g)-_:parseFloat(g)-_,m:d&&d<4?Math.round:0},l=Vi.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(Co.test(i)||x)&&(c.e=0),this._pt=c,c},os=function(t,e,r,i,s,a,o,c,l,u){Q(i)&&(i=i(s||0,t,a));var h=t[e],f=r!=="get"?r:Q(h)?l?t[e.indexOf("set")||!Q(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=Q(h)?l?jg:ul:us,g;if(it(i)&&(~i.indexOf("random(")&&(i=An(i)),i.charAt(1)==="="&&(g=qe(f,i)+(ct(f)||0),(g||g===0)&&(i=g))),!u||f!==i||ls)return!isNaN(f*i)&&i!==""?(g=new _t(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?Kg:hl,0,d),l&&(g.fp=l),o&&g.modifier(o,this,t),this._pt=g):(!h&&!(e in t)&&Gi(e,i),Vg.call(this,t,e,f,i,d,c||kt.stringFilter,l))},Xg=function(t,e,r,i,s){if(Q(t)&&(t=Mn(t,s,e,r,i)),!Ht(t)||t.style&&t.nodeType||lt(t)||ko(t))return it(t)?Mn(t,s,e,r,i):t;var a={},o;for(o in t)a[o]=Mn(t[o],s,e,r,i);return a},ol=function(t,e,r,i,s,a){var o,c,l,u;if($t[t]&&(o=new $t[t]).init(s,o.rawVars?e[t]:Xg(e[t],i,s,a,r),r,i,a)!==!1&&(r._pt=c=new _t(r._pt,s,t,0,1,o.render,o,0,o.priority),r!==Xe))for(l=r._ptLookup[r._targets.indexOf(s)],u=o._props.length;u--;)l[o._props[u]]=c;return o},se,ls,cs=function n(t,e,r){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,p=t._startAt,_=t._targets,x=t.parent,b=x&&x.data==="nested"?x.vars.targets:_,v=t._overwrite==="auto"&&!Ii,m=t.timeline,w,A,S,C,y,$,E,T,M,P,k,L,z;if(m&&(!f||!s)&&(s="none"),t._ease=we(s,Fe.ease),t._yEase=h?rl(we(h===!0?s:h,Fe.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!m&&!!i.runBackwards,!m||f&&!i.stagger){if(T=_[0]?xe(_[0]).harness:0,L=T&&i[T.prop],w=Mr(i,Wi),p&&(p._zTime<0&&p.progress(1),e<0&&u&&o&&!d?p.render(-1,!0):p.revert(u&&g?Cr:vg),p._lazy=0),a){if(ne(t._startAt=et.set(_,Ct({data:"isStart",overwrite:!1,parent:x,immediateRender:!0,lazy:!p&&gt(c),startAt:null,delay:0,onUpdate:l&&function(){return St(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(at||!o&&!d)&&t._startAt.revert(Cr),o&&g&&e<=0&&r<=0){e&&(t._zTime=e);return}}else if(u&&g&&!p){if(e&&(o=!1),S=Ct({overwrite:!1,data:"isFromStart",lazy:o&&!p&&gt(c),immediateRender:o,stagger:0,parent:x},w),L&&(S[T.prop]=L),ne(t._startAt=et.set(_,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(at?t._startAt.revert(Cr):t._startAt.render(-1,!0)),t._zTime=e,!o)n(t._startAt,Y,Y);else if(!e)return}for(t._pt=t._ptCache=0,c=g&&gt(c)||c&&!g,A=0;A<_.length;A++){if(y=_[A],E=y._gsap||Zi(_)[A]._gsap,t._ptLookup[A]=P={},ji[E.id]&&ee.length&&Tr(),k=b===_?A:b.indexOf(y),T&&(M=new T).init(y,L||w,t,k,b)!==!1&&(t._pt=C=new _t(t._pt,y,M.name,0,1,M.render,M,0,M.priority),M._props.forEach(function(R){P[R]=C}),M.priority&&($=1)),!T||L)for(S in w)$t[S]&&(M=ol(S,w,t,k,y,b))?M.priority&&($=1):P[S]=C=os.call(t,y,S,"get",w[S],k,b,0,i.stringFilter);t._op&&t._op[A]&&t.kill(y,t._op[A]),v&&t._pt&&(se=t,j.killTweensOf(y,P,t.globalTime(e)),z=!t.parent,se=0),t._pt&&c&&(ji[E.id]=1)}$&&dl(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!z,f&&e<=0&&m.render(Et,!0,!0)},Yg=function(t,e,r,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return ls=1,t.vars[e]="+=0",cs(t,o),ls=0,c?yn(e+" not eligible for reset"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=r-u.s,h.e&&(h.e=J(r)+ct(h.e)),h.b&&(h.b=u.s+ct(h.b))},Gg=function(t,e){var r=t[0]?xe(t[0]).harness:0,i=r&&r.aliases,s,a,o,c;if(!i)return e;s=Be({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},Wg=function(t,e,r,i){var s=e.ease||i||"power1.inOut",a,o;if(lt(e))o=r[t]||(r[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=r[a]||(r[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},Mn=function(t,e,r,i,s){return Q(t)?t.call(e,r,i,s):it(t)&&~t.indexOf("random(")?An(t):t},ll=Ki+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",cl={};mt(ll+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return cl[n]=1});var et=(function(n){bo(t,n);function t(r,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=n.call(this,a?i:bn(i))||this;var c=o.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,p=c.defaults,_=c.scrollTrigger,x=c.yoyoEase,b=i.parent||j,v=(lt(r)||ko(r)?Zt(r[0]):"length"in i)?[r]:Pt(r),m,w,A,S,C,y,$,E;if(o._targets=v.length?Zi(v):yn("GSAP target "+r+" not found. https://gsap.com",!kt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||f||Ar(l)||Ar(u)){if(i=o.vars,m=o.timeline=new ft({data:"nested",defaults:p||{},targets:b&&b.data==="nested"?b.vars.targets:v}),m.kill(),m.parent=m._dp=Kt(o),m._start=0,f||Ar(l)||Ar(u)){if(S=v.length,$=f&&Yo(f),Ht(f))for(C in f)~ll.indexOf(C)&&(E||(E={}),E[C]=f[C]);for(w=0;w<S;w++)A=Mr(i,cl),A.stagger=0,x&&(A.yoyoEase=x),E&&Be(A,E),y=v[w],A.duration=+Mn(l,Kt(o),w,y,v),A.delay=(+Mn(u,Kt(o),w,y,v)||0)-o._delay,!f&&S===1&&A.delay&&(o._delay=u=A.delay,o._start+=u,A.delay=0),m.to(y,A,$?$(w,y,v):0),m._ease=H.none;m.duration()?l=u=0:o.timeline=0}else if(g){bn(Ct(m.vars.defaults,{ease:"none"})),m._ease=we(g.ease||i.ease||"none");var T=0,M,P,k;if(lt(g))g.forEach(function(L){return m.to(v,L,">")}),m.duration();else{A={};for(C in g)C==="ease"||C==="easeEach"||Wg(C,g[C],A,g.easeEach);for(C in A)for(M=A[C].sort(function(L,z){return L.t-z.t}),T=0,w=0;w<M.length;w++)P=M[w],k={ease:P.e,duration:(P.t-(w?M[w-1].t:0))/100*l},k[C]=P.v,m.to(v,k,T),T+=k.duration;m.duration()<l&&m.to({},{duration:l-m.duration()})}}l||o.duration(l=m.duration())}else o.timeline=0;return d===!0&&!Ii&&(se=Kt(o),j.killTweensOf(v),se=0),Xt(b,Kt(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!l&&!g&&o._start===U(b._time)&&gt(h)&&Ag(Kt(o))&&b.data!=="nested")&&(o._tTime=-Y,o.render(Math.max(0,-u)||0)),_&&qo(Kt(o),_),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-Y&&!u?c:i<Y?0:i,f,d,g,p,_,x,b,v,m;if(!l)Cg(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,a);if(f=U(h%p),h===c?(g=this._repeat,f=l):(_=U(h/p),g=~~_,g&&g===_?(f=l,g--):f>l&&(f=l)),x=this._yoyo&&g&1,x&&(m=this._yEase,f=l-f),_=He(this._tTime,p),f===o&&!a&&this._initted&&g===_)return this._tTime=h,this;g!==_&&(v&&this._yEase&&il(v,x),this.vars.repeatRefresh&&!x&&!this._lock&&f!==p&&this._initted&&(this._lock=a=1,this.render(U(p*g),!0).invalidate()._lock=0))}if(!this._initted){if(Bo(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==_))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(m||this._ease)(f/l),this._from&&(this.ratio=b=1-b),!o&&h&&!s&&!_&&(St(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Ji(this,i,s,a),St(this,"onUpdate")),this._repeat&&g!==_&&this.vars.onRepeat&&!s&&this.parent&&St(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Ji(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&ne(this,1),!s&&!(u&&!o)&&(h||o||x)&&(St(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),n.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){Sn||Tt.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||cs(this,l),u=this._ease(l/this._dur),Yg(this,i,s,a,o,u,l,c)?this.resetTo(i,s,a,o,1):(zr(this,0),this.parent||Do(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?$n(this):this.scrollTrigger&&this.scrollTrigger.kill(!!at),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,se&&se.vars.overwrite!==!0)._first||$n(this),this.parent&&a!==this.timeline.totalDuration()&&Ve(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?Pt(i):o,l=this._ptLookup,u=this._pt,h,f,d,g,p,_,x;if((!s||s==="all")&&wg(o,c))return s==="all"&&(this._pt=0),$n(this);for(h=this._op=this._op||[],s!=="all"&&(it(s)&&(p={},mt(s,function(b){return p[b]=1}),s=p),s=Gg(o,s)),x=o.length;x--;)if(~c.indexOf(o[x])){f=l[x],s==="all"?(h[x]=s,g=f,d={}):(d=h[x]=h[x]||{},g=s);for(p in g)_=f&&f[p],_&&((!("kill"in _.d)||_.d.kill(p)===!0)&&Er(this,_,"_pt"),delete f[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&$n(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return wn(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return wn(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return j.killTweensOf(i,s,a)},t})(Tn);Ct(et.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),mt("staggerTo,staggerFrom,staggerFromTo",function(n){et[n]=function(){var t=new ft,e=es.call(arguments,0);return e.splice(n==="staggerFromTo"?5:4,0,0),t[n].apply(t,e)}});var us=function(t,e,r){return t[e]=r},ul=function(t,e,r){return t[e](r)},jg=function(t,e,r,i){return t[e](i.fp,r)},Ug=function(t,e,r){return t.setAttribute(e,r)},hs=function(t,e){return Q(t[e])?ul:Bi(t[e])&&t.setAttribute?Ug:us},hl=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Kg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},fl=function(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round((r.s+r.c*t)*1e4)/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},fs=function(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},Zg=function(t,e,r,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,r),s=a},Qg=function(t){for(var e=this._pt,r,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Er(this,e,"_pt"):e.dep||(r=1),e=i;return!r},Jg=function(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)},dl=function(t){for(var e=t._pt,r,i,s,a;e;){for(r=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=r}t._pt=s},_t=(function(){function n(e,r,i,s,a,o,c,l,u){this.t=r,this.s=s,this.c=a,this.p=i,this.r=o||hl,this.d=c||this,this.set=l||us,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=n.prototype;return t.modifier=function(r,i,s){this.mSet=this.mSet||this.set,this.set=Jg,this.m=r,this.mt=s,this.tween=i},n})();mt(Ki+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Wi[n]=1}),At.TweenMax=At.TweenLite=et,At.TimelineLite=At.TimelineMax=ft,j=new ft({sortChildren:!1,defaults:Fe,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),kt.stringFilter=nl;var Ae=[],Or={},tm=[],pl=0,em=0,ds=function(t){return(Or[t]||tm).map(function(e){return e()})},ps=function(){var t=Date.now(),e=[];t-pl>2&&(ds("matchMediaInit"),Ae.forEach(function(r){var i=r.queries,s=r.conditions,a,o,c,l;for(o in i)a=Vt.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(r.revert(),c&&e.push(r))}),ds("matchMediaRevert"),e.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),pl=t,ds("matchMedia"))},gl=(function(){function n(e,r){this.selector=r&&ns(r),this.data=[],this._r=[],this.isReverted=!1,this.id=em++,e&&this.add(e)}var t=n.prototype;return t.add=function(r,i,s){Q(r)&&(s=i,i=r,r=Q);var a=this,o=function(){var l=W,u=a.selector,h;return l&&l!==a&&l.data.push(a),s&&(a.selector=ns(s)),W=a,h=i.apply(a,arguments),Q(h)&&a._r.push(h),W=l,a.selector=u,a.isReverted=!1,h};return a.last=o,r===Q?o(a,function(c){return a.add(null,c)}):r?a[r]=o:o},t.ignore=function(r){var i=W;W=null,r(this),W=i},t.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof n?r.push.apply(r,i.getTweens()):i instanceof et&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(r,i){var s=this;if(r?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(r)}),c=s.data.length;c--;)l=s.data[c],l instanceof ft?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof et)&&l.revert&&l.revert(r);s._r.forEach(function(u){return u(r,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Ae.length;a--;)Ae[a].id===this.id&&Ae.splice(a,1)},t.revert=function(r){this.kill(r||{})},n})(),nm=(function(){function n(e){this.contexts=[],this.scope=e,W&&W.data.push(this)}var t=n.prototype;return t.add=function(r,i,s){Ht(r)||(r={matches:r});var a=new gl(0,s||this.scope),o=a.conditions={},c,l,u;W&&!a.selector&&(a.selector=W.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=r;for(l in r)l==="all"?u=1:(c=Vt.matchMedia(r[l]),c&&(Ae.indexOf(a)<0&&Ae.push(a),(o[l]=c.matches)&&(u=1),c.addListener?c.addListener(ps):c.addEventListener("change",ps)));return u&&i(a,function(h){return a.add(null,h)}),this},t.revert=function(r){this.kill(r||{})},t.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},n})(),Rr={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(i){return Qo(i)})},timeline:function(t){return new ft(t)},getTweensOf:function(t,e){return j.getTweensOf(t,e)},getProperty:function(t,e,r,i){it(t)&&(t=Pt(t)[0]);var s=xe(t||{}).get,a=r?Ro:Oo;return r==="native"&&(r=""),t&&(e?a(($t[e]&&$t[e].get||s)(t,e,r,i)):function(o,c,l){return a(($t[o]&&$t[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,r){if(t=Pt(t),t.length>1){var i=t.map(function(u){return vt.quickSetter(u,e,r)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var a=$t[e],o=xe(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(u){var h=new a;Xe._pt=0,h.init(t,r?u+r:u,Xe,0,[t]),h.render(1,h),Xe._pt&&fs(1,Xe)}:o.set(t,c);return a?l:function(u){return l(t,c,r?u+r:u,o,1)}},quickTo:function(t,e,r){var i,s=vt.to(t,Ct((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),a=function(c,l,u){return s.resetTo(e,c,l,u)};return a.tween=s,a},isTweening:function(t){return j.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=we(t.ease,Fe.ease)),No(Fe,t||{})},config:function(t){return No(kt,t||{})},registerEffect:function(t){var e=t.name,r=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!$t[o]&&!At[o]&&yn(e+" effect requires "+o+" plugin.")}),Ui[e]=function(o,c,l){return r(Pt(o),Ct(c||{},s),l)},a&&(ft.prototype[e]=function(o,c,l){return this.add(Ui[e](o,Ht(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){H[t]=we(e)},parseEase:function(t,e){return arguments.length?we(t,e):H},getById:function(t){return j.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var r=new ft(t),i,s;for(r.smoothChildTiming=gt(t.smoothChildTiming),j.remove(r),r._dp=0,r._time=r._tTime=j._time,i=j._first;i;)s=i._next,(e||!(!i._dur&&i instanceof et&&i.vars.onComplete===i._targets[0]))&&Xt(r,i,i._start-i._delay),i=s;return Xt(j,r,0),r},context:function(t,e){return t?new gl(t,e):W},matchMedia:function(t){return new nm(t)},matchMediaRefresh:function(){return Ae.forEach(function(t){var e=t.conditions,r,i;for(i in e)e[i]&&(e[i]=!1,r=1);r&&t.revert()})||ps()},addEventListener:function(t,e){var r=Or[t]||(Or[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function(t,e){var r=Or[t],i=r&&r.indexOf(e);i>=0&&r.splice(i,1)},utils:{wrap:Og,wrapYoyo:Rg,distribute:Yo,random:Wo,snap:Go,normalize:zg,getUnit:ct,clamp:Mg,splitColor:Jo,toArray:Pt,selector:ns,mapRange:Uo,pipe:Lg,unitize:Pg,interpolate:Ng,shuffle:Xo},install:To,effects:Ui,ticker:Tt,updateRoot:ft.updateRoot,plugins:$t,globalTimeline:j,core:{PropTween:_t,globals:Mo,Tween:et,Timeline:ft,Animation:Tn,getCache:xe,_removeLinkedListItem:Er,reverting:function(){return at},context:function(t){return t&&W&&(W.data.push(t),t._ctx=W),W},suppressOverwrites:function(t){return Ii=t}}};mt("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Rr[n]=et[n]}),Tt.add(ft.updateRoot),Xe=Rr.to({},{duration:0});var rm=function(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r},im=function(t,e){var r=t._targets,i,s,a;for(i in e)for(s=r.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=rm(a,i)),a&&a.modifier&&a.modifier(e[i],t,r[s],i))},gs=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(it(s)&&(c={},mt(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}im(o,s)}}}},vt=Rr.registerPlugin({name:"attr",init:function(t,e,r,i,s){var a,o,c;this.tween=r;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var r=e._pt;r;)at?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},gs("roundProps",rs),gs("modifiers"),gs("snap",Go))||Rr;et.version=ft.version=vt.version="3.14.2",So=1,Hi()&&Ye(),H.Power0,H.Power1,H.Power2,H.Power3,H.Power4,H.Linear,H.Quad,H.Cubic,H.Quart,H.Quint,H.Strong,H.Elastic,H.Back,H.SteppedEase,H.Bounce,H.Sine,H.Expo,H.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ml,ae,Ge,ms,$e,_l,_s,sm=function(){return typeof window<"u"},Qt={},Ce=180/Math.PI,We=Math.PI/180,je=Math.atan2,vl=1e8,vs=/([A-Z])/g,am=/(left|right|width|margin|padding|x)/i,om=/[\s,\(]\S/,Yt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ys=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},lm=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},cm=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},um=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},hm=function(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)},yl=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},xl=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},fm=function(t,e,r){return t.style[e]=r},dm=function(t,e,r){return t.style.setProperty(e,r)},pm=function(t,e,r){return t._gsap[e]=r},gm=function(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r},mm=function(t,e,r,i,s){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(s,a)},_m=function(t,e,r,i,s){var a=t._gsap;a[e]=r,a.renderTransform(s,a)},K="transform",yt=K+"Origin",vm=function n(t,e){var r=this,i=this.target,s=i.style,a=i._gsap;if(t in Qt&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Yt[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return r.tfm[o]=Jt(i,o)}):this.tfm[t]=a.x?a[t]:Jt(i,t),t===yt&&(this.tfm.zOrigin=a.zOrigin);else return Yt.transform.split(",").forEach(function(o){return n.call(r,o,e)});if(this.props.indexOf(K)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(yt,e,"")),t=K}(s||e)&&this.props.push(t,e,s[t])},bl=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},ym=function(){var t=this.props,e=this.target,r=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?r[t[s]]=t[s+2]:r.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(vs,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=_s(),(!s||!s.isStart)&&!r[K]&&(bl(r),i.zOrigin&&r[yt]&&(r[yt]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},wl=function(t,e){var r={target:t,props:[],revert:ym,save:vm};return t._gsap||vt.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return r.save(i)}),r},kl,xs=function(t,e){var r=ae.createElementNS?ae.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ae.createElement(t);return r&&r.style?r:ae.createElement(t)},Mt=function n(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(vs,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&n(t,Ue(e)||e,1)||""},Al="O,Moz,ms,Ms,Webkit".split(","),Ue=function(t,e,r){var i=e||$e,s=i.style,a=5;if(t in s&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Al[a]+t in s););return a<0?null:(a===3?"ms":a>=0?Al[a]:"")+t},bs=function(){sm()&&window.document&&(ml=window,ae=ml.document,Ge=ae.documentElement,$e=xs("div")||{style:{}},xs("div"),K=Ue(K),yt=K+"Origin",$e.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",kl=!!Ue("perspective"),_s=vt.core.reverting,ms=1)},$l=function(t){var e=t.ownerSVGElement,r=xs("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",r.appendChild(i),Ge.appendChild(r);try{s=i.getBBox()}catch{}return r.removeChild(i),Ge.removeChild(r),s},Cl=function(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])},Sl=function(t){var e,r;try{e=t.getBBox()}catch{e=$l(t),r=1}return e&&(e.width||e.height)||r||(e=$l(t)),e&&!e.width&&!e.x&&!e.y?{x:+Cl(t,["x","cx","x1"])||0,y:+Cl(t,["y","cy","y1"])||0,width:0,height:0}:e},Tl=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Sl(t))},oe=function(t,e){if(e){var r=t.style,i;e in Qt&&e!==yt&&(e=K),r.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),r.removeProperty(i==="--"?e:e.replace(vs,"-$1").toLowerCase())):r.removeAttribute(e)}},le=function(t,e,r,i,s,a){var o=new _t(t._pt,e,r,0,1,a?xl:yl);return t._pt=o,o.b=i,o.e=s,t._props.push(r),o},Ml={deg:1,rad:1,turn:1},xm={grid:1,flex:1},ce=function n(t,e,r,i){var s=parseFloat(r)||0,a=(r+"").trim().substr((s+"").length)||"px",o=$e.style,c=am.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,p,_,x;if(i===a||!s||Ml[i]||Ml[a])return s;if(a!=="px"&&!f&&(s=n(t,e,r,"px")),x=t.getCTM&&Tl(t),(d||a==="%")&&(Qt[e]||~e.indexOf("adius")))return g=x?t.getBBox()[c?"width":"height"]:t[u],J(d?s/g*h:s/100*g);if(o[c?"width":"height"]=h+(f?a:i),p=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,x&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===ae||!p.appendChild)&&(p=ae.body),_=p._gsap,_&&d&&_.width&&c&&_.time===Tt.time&&!_.uncache)return J(s/_.width*h);if(d&&(e==="height"||e==="width")){var b=t.style[e];t.style[e]=h+i,g=t[u],b?t.style[e]=b:oe(t,e)}else(d||a==="%")&&!xm[Mt(p,"display")]&&(o.position=Mt(t,"position")),p===t&&(o.position="static"),p.appendChild($e),g=$e[u],p.removeChild($e),o.position="absolute";return c&&d&&(_=xe(p),_.time=Tt.time,_.width=p[u]),J(f?g*s/h:g&&s?h/g*s:0)},Jt=function(t,e,r,i){var s;return ms||bs(),e in Yt&&e!=="transform"&&(e=Yt[e],~e.indexOf(",")&&(e=e.split(",")[0])),Qt[e]&&e!=="transform"?(s=Ln(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Dr(Mt(t,yt))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Nr[e]&&Nr[e](t,e,r)||Mt(t,e)||Po(t,e)||(e==="opacity"?1:0))),r&&!~(s+"").trim().indexOf(" ")?ce(t,e,s,r)+r:s},bm=function(t,e,r,i){if(!r||r==="none"){var s=Ue(e,t,1),a=s&&Mt(t,s,1);a&&a!==r?(e=s,r=a):e==="borderColor"&&(r=Mt(t,"borderTopColor"))}var o=new _t(this._pt,t.style,e,0,1,fl),c=0,l=0,u,h,f,d,g,p,_,x,b,v,m,w;if(o.b=r,o.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=Mt(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(p=t.style[e],t.style[e]=i,i=Mt(t,e)||i,p?t.style[e]=p:oe(t,e)),u=[r,i],nl(u),r=u[0],i=u[1],f=r.match(Ie)||[],w=i.match(Ie)||[],w.length){for(;h=Ie.exec(i);)_=h[0],b=i.substring(c,h.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),_!==(p=f[l++]||"")&&(d=parseFloat(p)||0,m=p.substr((d+"").length),_.charAt(1)==="="&&(_=qe(d,_)+m),x=parseFloat(_),v=_.substr((x+"").length),c=Ie.lastIndex-v.length,v||(v=v||kt.units[e]||m,c===i.length&&(i+=v,o.e+=v)),m!==v&&(d=ce(t,e,p,v)||0),o._pt={_next:o._pt,p:b||l===1?b:",",s:d,c:x-d,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?xl:yl;return Co.test(i)&&(o.e=0),this._pt=o,o},El={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wm=function(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(t=r,r=i,i=t),e[0]=El[r]||r,e[1]=El[i]||i,e.join(" ")},km=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r=e.t,i=r.style,s=e.u,a=r._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],Qt[o]&&(c=1,o=o==="transformOrigin"?yt:K),oe(r,o);c&&(oe(r,K),a&&(a.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ln(r,1),a.uncache=1,bl(i)))}},Nr={clearProps:function(t,e,r,i,s){if(s.data!=="isFromStart"){var a=t._pt=new _t(t._pt,e,r,0,0,km);return a.u=i,a.pr=-10,a.tween=s,t._props.push(r),1}}},En=[1,0,0,1,0,0],Ll={},Pl=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},zl=function(t){var e=Mt(t,K);return Pl(e)?En:e.substr(7).match($o).map(J)},ws=function(t,e){var r=t._gsap||xe(t),i=t.style,s=zl(t),a,o,c,l;return r.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?En:s):(s===En&&!t.offsetParent&&t!==Ge&&!r.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,Ge.appendChild(t)),s=zl(t),c?i.display=c:oe(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):Ge.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ks=function(t,e,r,i,s,a){var o=t._gsap,c=s||ws(t,!0),l=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=c[0],g=c[1],p=c[2],_=c[3],x=c[4],b=c[5],v=e.split(" "),m=parseFloat(v[0])||0,w=parseFloat(v[1])||0,A,S,C,y;r?c!==En&&(S=d*_-g*p)&&(C=m*(_/S)+w*(-p/S)+(p*b-_*x)/S,y=m*(-g/S)+w*(d/S)-(d*b-g*x)/S,m=C,w=y):(A=Sl(t),m=A.x+(~v[0].indexOf("%")?m/100*A.width:m),w=A.y+(~(v[1]||v[0]).indexOf("%")?w/100*A.height:w)),i||i!==!1&&o.smooth?(x=m-l,b=w-u,o.xOffset=h+(x*d+b*p)-x,o.yOffset=f+(x*g+b*_)-b):o.xOffset=o.yOffset=0,o.xOrigin=m,o.yOrigin=w,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!r,t.style[yt]="0px 0px",a&&(le(a,o,"xOrigin",l,m),le(a,o,"yOrigin",u,w),le(a,o,"xOffset",h,o.xOffset),le(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",m+" "+w)},Ln=function(t,e){var r=t._gsap||new al(t);if("x"in r&&!e&&!r.uncache)return r;var i=t.style,s=r.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=Mt(t,yt)||"0",u,h,f,d,g,p,_,x,b,v,m,w,A,S,C,y,$,E,T,M,P,k,L,z,R,O,N,I,tt,xt,rt,Z;return u=h=f=p=_=x=b=v=m=0,d=g=1,r.svg=!!(t.getCTM&&Tl(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[K]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[K]!=="none"?c[K]:"")),i.scale=i.rotate=i.translate="none"),S=ws(t,r.svg),r.svg&&(r.uncache?(R=t.getBBox(),l=r.xOrigin-R.x+"px "+(r.yOrigin-R.y)+"px",z=""):z=!e&&t.getAttribute("data-svg-origin"),ks(t,z||l,!!z||r.originIsAbsolute,r.smooth!==!1,S)),w=r.xOrigin||0,A=r.yOrigin||0,S!==En&&(E=S[0],T=S[1],M=S[2],P=S[3],u=k=S[4],h=L=S[5],S.length===6?(d=Math.sqrt(E*E+T*T),g=Math.sqrt(P*P+M*M),p=E||T?je(T,E)*Ce:0,b=M||P?je(M,P)*Ce+p:0,b&&(g*=Math.abs(Math.cos(b*We))),r.svg&&(u-=w-(w*E+A*M),h-=A-(w*T+A*P))):(Z=S[6],xt=S[7],N=S[8],I=S[9],tt=S[10],rt=S[11],u=S[12],h=S[13],f=S[14],C=je(Z,tt),_=C*Ce,C&&(y=Math.cos(-C),$=Math.sin(-C),z=k*y+N*$,R=L*y+I*$,O=Z*y+tt*$,N=k*-$+N*y,I=L*-$+I*y,tt=Z*-$+tt*y,rt=xt*-$+rt*y,k=z,L=R,Z=O),C=je(-M,tt),x=C*Ce,C&&(y=Math.cos(-C),$=Math.sin(-C),z=E*y-N*$,R=T*y-I*$,O=M*y-tt*$,rt=P*$+rt*y,E=z,T=R,M=O),C=je(T,E),p=C*Ce,C&&(y=Math.cos(C),$=Math.sin(C),z=E*y+T*$,R=k*y+L*$,T=T*y-E*$,L=L*y-k*$,E=z,k=R),_&&Math.abs(_)+Math.abs(p)>359.9&&(_=p=0,x=180-x),d=J(Math.sqrt(E*E+T*T+M*M)),g=J(Math.sqrt(L*L+Z*Z)),C=je(k,L),b=Math.abs(C)>2e-4?C*Ce:0,m=rt?1/(rt<0?-rt:rt):0),r.svg&&(z=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!Pl(Mt(t,K)),z&&t.setAttribute("transform",z))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(d*=-1,b+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),e=e||r.uncache,r.x=u-((r.xPercent=u&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+a,r.y=h-((r.yPercent=h&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+a,r.z=f+a,r.scaleX=J(d),r.scaleY=J(g),r.rotation=J(p)+o,r.rotationX=J(_)+o,r.rotationY=J(x)+o,r.skewX=b+o,r.skewY=v+o,r.transformPerspective=m+a,(r.zOrigin=parseFloat(l.split(" ")[2])||!e&&r.zOrigin||0)&&(i[yt]=Dr(l)),r.xOffset=r.yOffset=0,r.force3D=kt.force3D,r.renderTransform=r.svg?$m:kl?Ol:Am,r.uncache=0,r},Dr=function(t){return(t=t.split(" "))[0]+" "+t[1]},As=function(t,e,r){var i=ct(e);return J(parseFloat(e)+parseFloat(ce(t,"x",r+"px",i)))+i},Am=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Ol(t,e)},Se="0deg",Pn="0px",Te=") ",Ol=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.z,l=r.rotation,u=r.rotationY,h=r.rotationX,f=r.skewX,d=r.skewY,g=r.scaleX,p=r.scaleY,_=r.transformPerspective,x=r.force3D,b=r.target,v=r.zOrigin,m="",w=x==="auto"&&t&&t!==1||x===!0;if(v&&(h!==Se||u!==Se)){var A=parseFloat(u)*We,S=Math.sin(A),C=Math.cos(A),y;A=parseFloat(h)*We,y=Math.cos(A),a=As(b,a,S*y*-v),o=As(b,o,-Math.sin(A)*-v),c=As(b,c,C*y*-v+v)}_!==Pn&&(m+="perspective("+_+Te),(i||s)&&(m+="translate("+i+"%, "+s+"%) "),(w||a!==Pn||o!==Pn||c!==Pn)&&(m+=c!==Pn||w?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Te),l!==Se&&(m+="rotate("+l+Te),u!==Se&&(m+="rotateY("+u+Te),h!==Se&&(m+="rotateX("+h+Te),(f!==Se||d!==Se)&&(m+="skew("+f+", "+d+Te),(g!==1||p!==1)&&(m+="scale("+g+", "+p+Te),b.style[K]=m||"translate(0, 0)"},$m=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.rotation,l=r.skewX,u=r.skewY,h=r.scaleX,f=r.scaleY,d=r.target,g=r.xOrigin,p=r.yOrigin,_=r.xOffset,x=r.yOffset,b=r.forceCSS,v=parseFloat(a),m=parseFloat(o),w,A,S,C,y;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=We,l*=We,w=Math.cos(c)*h,A=Math.sin(c)*h,S=Math.sin(c-l)*-f,C=Math.cos(c-l)*f,l&&(u*=We,y=Math.tan(l-u),y=Math.sqrt(1+y*y),S*=y,C*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),w*=y,A*=y)),w=J(w),A=J(A),S=J(S),C=J(C)):(w=h,C=f,A=S=0),(v&&!~(a+"").indexOf("px")||m&&!~(o+"").indexOf("px"))&&(v=ce(d,"x",a,"px"),m=ce(d,"y",o,"px")),(g||p||_||x)&&(v=J(v+g-(g*w+p*S)+_),m=J(m+p-(g*A+p*C)+x)),(i||s)&&(y=d.getBBox(),v=J(v+i/100*y.width),m=J(m+s/100*y.height)),y="matrix("+w+","+A+","+S+","+C+","+v+","+m+")",d.setAttribute("transform",y),b&&(d.style[K]=y)},Cm=function(t,e,r,i,s){var a=360,o=it(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?Ce:1),l=c-i,u=i+l+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),h==="cw"&&l<0?l=(l+a*vl)%a-~~(l/a)*a:h==="ccw"&&l>0&&(l=(l-a*vl)%a-~~(l/a)*a)),t._pt=f=new _t(t._pt,e,r,i,l,lm),f.e=u,f.u="deg",t._props.push(r),f},Rl=function(t,e){for(var r in e)t[r]=e[r];return t},Sm=function(t,e,r){var i=Rl({},r._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=r.style,o,c,l,u,h,f,d,g;i.svg?(l=r.getAttribute("transform"),r.setAttribute("transform",""),a[K]=e,o=Ln(r,1),oe(r,K),r.setAttribute("transform",l)):(l=getComputedStyle(r)[K],a[K]=e,o=Ln(r,1),a[K]=l);for(c in Qt)l=i[c],u=o[c],l!==u&&s.indexOf(c)<0&&(d=ct(l),g=ct(u),h=d!==g?ce(r,c,l,g):parseFloat(l),f=parseFloat(u),t._pt=new _t(t._pt,o,c,h,f-h,ys),t._pt.u=g||0,t._props.push(c));Rl(o,i)};mt("padding,margin,Width,Radius",function(n,t){var e="Top",r="Right",i="Bottom",s="Left",a=(t<3?[e,r,i,s]:[e+s,e+r,i+r,i+s]).map(function(o){return t<2?n+o:"border"+o+n});Nr[t>1?"border"+n:n]=function(o,c,l,u,h){var f,d;if(arguments.length<4)return f=a.map(function(g){return Jt(o,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(g,p){return d[g]=f[p]=f[p]||f[(p-1)/2|0]}),o.init(c,d,h)}});var Nl={name:"css",register:bs,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,r,i,s){var a=this._props,o=t.style,c=r.vars.startAt,l,u,h,f,d,g,p,_,x,b,v,m,w,A,S,C,y;ms||bs(),this.styles=this.styles||wl(t),C=this.styles.props,this.tween=r;for(p in e)if(p!=="autoRound"&&(u=e[p],!($t[p]&&ol(p,e,r,i,t,s)))){if(d=typeof u,g=Nr[p],d==="function"&&(u=u.call(r,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=An(u)),g)g(this,t,p,u,r)&&(S=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(p)+"").trim(),u+="",ie.lastIndex=0,ie.test(l)||(_=ct(l),x=ct(u),x?_!==x&&(l=ce(t,p,l,x)+x):_&&(u+=_)),this.add(o,"setProperty",l,u,i,s,0,0,p),a.push(p),C.push(p,0,o[p]);else if(d!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(r,i,t,s):c[p],it(l)&&~l.indexOf("random(")&&(l=An(l)),ct(l+"")||l==="auto"||(l+=kt.units[p]||ct(Jt(t,p))||""),(l+"").charAt(1)==="="&&(l=Jt(t,p))):l=Jt(t,p),f=parseFloat(l),b=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),h=parseFloat(u),p in Yt&&(p==="autoAlpha"&&(f===1&&Jt(t,"visibility")==="hidden"&&h&&(f=0),C.push("visibility",0,o.visibility),le(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=Yt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),v=p in Qt,v){if(this.styles.save(p),y=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Mt(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var $=t.style.perspective;t.style.perspective=u,u=Mt(t,"perspective"),$?t.style.perspective=$:oe(t,"perspective")}h=parseFloat(u)}if(m||(w=t._gsap,w.renderTransform&&!e.parseTransform||Ln(t,e.parseTransform),A=e.smoothOrigin!==!1&&w.smooth,m=this._pt=new _t(this._pt,o,K,0,1,w.renderTransform,w,0,-1),m.dep=1),p==="scale")this._pt=new _t(this._pt,w,"scaleY",w.scaleY,(b?qe(w.scaleY,b+h):h)-w.scaleY||0,ys),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){C.push(yt,0,o[yt]),u=wm(u),w.svg?ks(t,u,0,A,0,this):(x=parseFloat(u.split(" ")[2])||0,x!==w.zOrigin&&le(this,w,"zOrigin",w.zOrigin,x),le(this,o,p,Dr(l),Dr(u)));continue}else if(p==="svgOrigin"){ks(t,u,1,A,0,this);continue}else if(p in Ll){Cm(this,w,p,f,b?qe(f,b+u):u);continue}else if(p==="smoothOrigin"){le(this,w,"smooth",w.smooth,u);continue}else if(p==="force3D"){w[p]=u;continue}else if(p==="transform"){Sm(this,u,t);continue}}else p in o||(p=Ue(p)||p);if(v||(h||h===0)&&(f||f===0)&&!om.test(u)&&p in o)_=(l+"").substr((f+"").length),h||(h=0),x=ct(u)||(p in kt.units?kt.units[p]:_),_!==x&&(f=ce(t,p,l,x)),this._pt=new _t(this._pt,v?w:o,p,f,(b?qe(f,b+h):h)-f,!v&&(x==="px"||p==="zIndex")&&e.autoRound!==!1?hm:ys),this._pt.u=x||0,v&&y!==u?(this._pt.b=l,this._pt.e=y,this._pt.r=um):_!==x&&x!=="%"&&(this._pt.b=l,this._pt.r=cm);else if(p in o)bm.call(this,t,p,l,b?b+u:u);else if(p in t)this.add(t,p,l||t[p],b?b+u:u,i,s);else if(p!=="parseTransform"){Gi(p,u);continue}v||(p in o?C.push(p,0,o[p]):typeof t[p]=="function"?C.push(p,2,t[p]()):C.push(p,1,l||t[p])),a.push(p)}}S&&dl(this)},render:function(t,e){if(e.tween._time||!_s())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:Jt,aliases:Yt,getSetter:function(t,e,r){var i=Yt[e];return i&&i.indexOf(",")<0&&(e=i),e in Qt&&e!==yt&&(t._gsap.x||Jt(t,"x"))?r&&_l===r?e==="scale"?gm:pm:(_l=r||{})&&(e==="scale"?mm:_m):t.style&&!Bi(t.style[e])?fm:~e.indexOf("-")?dm:hs(t,e)},core:{_removeProperty:oe,_getMatrix:ws}};vt.utils.checkPrefix=Ue,vt.core.getStyleSaver=wl,(function(n,t,e,r){var i=mt(n+","+t+","+e,function(s){Qt[s]=1});mt(t,function(s){kt.units[s]="deg",Ll[s]=1}),Yt[i[13]]=n+","+t,mt(r,function(s){var a=s.split(":");Yt[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),mt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){kt.units[n]="px"}),vt.registerPlugin(Nl);var zn=vt.registerPlugin(Nl)||vt;zn.core.Tween;const Ke={input:"#ff2d75",hidden:"#7b68ee",output:"#00d4ff"},On=36,Fr=100,$s=200,Dl=50,Cs=60,Tm=`
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;class Mm extends q{constructor(){super(...arguments);D(this,"_svg",null);D(this,"_container",null);D(this,"_hasAnimated",!1);D(this,"_isAnimating",!1);D(this,"_resizeObserver",null);D(this,"_timeline",null)}static get observedAttributes(){return["layers","names","animate","speed"]}get _layers(){return this.jsonAttr("layers",[["x₁","x₂"],["h₁","h₂","h₃"],["ŷ"]])}get _names(){return this.jsonAttr("names",[])}get _animateMode(){return this.getAttribute("animate")||"none"}get _speed(){const e=parseInt(this.getAttribute("speed")||"",10);return isNaN(e)?600:e}connectedCallback(){super.connectedCallback(),this.adoptStyles(Tm),this._container=document.createElement("div"),this.root.appendChild(this._container),this._initSvg(),this._render(),this._resizeObserver=new ResizeObserver(()=>{this._isAnimating||this._render()}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null,this._cancelAnimation()}handleAttributeChange(e,r,i){r!==i&&this._svg&&(this._cancelAnimation(),this._hasAnimated=!1,this._render())}animateIn(e){if(!this._hasAnimated){if(e||this._animateMode==="none"){this._hasAnimated=!0,this._render();return}this._runAnimation()}}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e);const r=this._svg.append("defs"),i={input:Ke.input,hidden:Ke.hidden,output:Ke.output};for(const[s,a]of Object.entries(i))r.append("filter").attr("id",`glow-${s}`).attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",6).attr("flood-color",a).attr("flood-opacity",.7);this._svg.append("g").attr("class","connections-group"),this._svg.append("g").attr("class","nodes-group"),this._svg.append("g").attr("class","labels-group")}_computeLayout(){const e=this._layers,r=this.isRtl,i=e.length,s=Math.max(...e.map(u=>u.length),1),a=(i-1)*$s+Cs*2,o=(s-1)*Fr+Dl+On+40,c=[],l=[];for(let u=0;u<i;u++){const h=e[u],f=r?a-Cs-u*$s:Cs+u*$s,d=(h.length-1)*Fr,g=Dl+((s-1)*Fr-d)/2,p=[];for(let _=0;_<h.length;_++)p.push({layer:u,index:_,x:f,y:g+_*Fr,label:h[_]});c.push(p)}for(let u=0;u<i-1;u++)for(const h of c[u])for(const f of c[u+1])l.push({source:h,target:f});return{nodes:c,connections:l,width:a,height:o}}_layerColor(e,r){const i=getComputedStyle(this).getPropertyValue("--lv-net-input").trim()||Ke.input,s=getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim()||Ke.hidden,a=getComputedStyle(this).getPropertyValue("--lv-net-output").trim()||Ke.output;return e===0?i:e===r-1?a:s}_layerType(e,r){return e===0?"input":e===r-1?"output":"hidden"}_render(){if(!this._svg)return;const{nodes:e,connections:r,width:i,height:s}=this._computeLayout(),a=e.length,o=this._animateMode==="none"||this._hasAnimated,c=this._animateMode!=="none"&&!this._hasAnimated;this._svg.attr("viewBox",`0 0 ${i} ${s}`);const l=this._svg.select(".connections-group");l.selectAll("*").remove();for(const d of r)l.append("line").attr("class","connection").attr("x1",d.source.x).attr("y1",d.source.y).attr("x2",d.target.x).attr("y2",d.target.y).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1.5).attr("stroke-opacity",c?.08:.5).attr("data-source-layer",d.source.layer).attr("data-target-layer",d.target.layer);const u=this._svg.select(".nodes-group");u.selectAll("*").remove();for(const d of e)for(const g of d){const p=this._layerColor(g.layer,a),_=this._layerType(g.layer,a),x=u.append("g").attr("class","node").attr("data-layer",g.layer).attr("data-index",g.index).attr("transform",`translate(${g.x},${g.y})`).attr("opacity",c?.15:1);x.append("circle").attr("class","node-circle").attr("data-layer",g.layer).attr("r",On).attr("fill",p).attr("stroke",p).attr("stroke-width",2).attr("fill-opacity",o?.2:c?.05:.2),o&&x.attr("filter",`url(#glow-${_})`),x.append("text").attr("class","node-label").text(g.label)}const h=this._svg.select(".labels-group");h.selectAll("*").remove();const f=this._names;for(let d=0;d<e.length;d++){if(!f[d])continue;const g=e[d][0];h.append("text").attr("class","label").attr("x",g.x).attr("y",g.y-On-16).text(f[d])}}_getLayerNodeGroups(){const e=this._layers.length,r=[];for(let i=0;i<e;i++){const s=Array.from(this.root.querySelectorAll(`.node[data-layer="${i}"]`));r.push(s)}return r}_getConnectionElements(e,r){return Array.from(this.root.querySelectorAll(`.connection[data-source-layer="${e}"][data-target-layer="${r}"]`))}_cancelAnimation(){var e;(e=this._timeline)==null||e.kill(),this._timeline=null,this._isAnimating=!1}_runAnimation(){if(!this._svg)return;this._cancelAnimation(),this._isAnimating=!0,this._render();const{nodes:e}=this._computeLayout(),r=e.length,i=this._animateMode,s=this._speed,a=i==="backprop",o=a?"#ff2d75":"#00d4ff",c=s/600,l=a?Array.from({length:r},(f,d)=>r-1-d):Array.from({length:r},(f,d)=>d),u=this._getLayerNodeGroups(),h=zn.timeline({onComplete:()=>{this._isAnimating=!1,this._hasAnimated=!0,this.root.querySelectorAll(".node").forEach(g=>{const p=parseInt(g.getAttribute("data-layer")||"0",10),_=this._layerType(p,r);zn.set(g,{opacity:1}),g.setAttribute("filter",`url(#glow-${_})`);const x=g.querySelector("circle");x&&zn.set(x,{attr:{"fill-opacity":.2}})}),this.root.querySelectorAll(".connection").forEach(g=>{zn.set(g,{attr:{"stroke-opacity":.5}}),g.setAttribute("stroke","var(--lv-border, #2a2a4a)")})}});this._timeline=h,h.addLabel("start",.15),l.forEach((f,d)=>{const g=this._layerType(f,r),p=u[f];if(!p||p.length===0)return;const _=p.map(v=>v.querySelector(".node-circle")).filter(Boolean),x=`layer-${d}`,b=.15+d*(.4*c);if(h.addLabel(x,b),h.to(p,{opacity:1,duration:.2,stagger:.05,ease:"power2.out"},x),h.call(()=>{p.forEach(v=>{v.setAttribute("filter",`url(#glow-${g})`)})},[],x),h.to(_,{attr:{r:On*1.15},duration:.15,stagger:.05,ease:"back.out(1.7)"},x),h.to(_,{attr:{r:On},duration:.2,stagger:.05,ease:"power2.inOut"},`${x}+=0.2`),h.to(_,{attr:{"fill-opacity":.35},duration:.2,stagger:.05,ease:"power2.out"},x),h.to(_,{attr:{"fill-opacity":.2},duration:.3,stagger:.05,ease:"power2.in"},`${x}+=0.3`),d<l.length-1){const v=l[d+1],m=Math.min(f,v),w=Math.max(f,v),A=this._getConnectionElements(m,w);A.length>0&&(h.to(A,{attr:{"stroke-opacity":.5},stroke:o,duration:.25,stagger:.02,ease:"power2.out"},`${x}+=0.15`),h.to(A,{stroke:"var(--lv-border, #2a2a4a)",attr:{"stroke-opacity":.35},duration:.3,stagger:.02,ease:"power2.inOut"},`${x}+=0.35`))}})}}customElements.define("lv-network",Mm);const Fl=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Em=`
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
`,ue=120,Rn=32,Ir=40;class Lm extends q{constructor(){super(...arguments);D(this,"_data",null);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null);D(this,"_root",null)}static get observedAttributes(){return["data","orientation"]}get _orientation(){return this.getAttribute("orientation")==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Em),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",{label:"root"}),this._initSvg(),this._buildHierarchy(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",{label:"root"}),this._buildHierarchy()),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","links-group"),this._svg.append("g").attr("class","nodes-group")}_buildHierarchy(){this._data&&(this._root=fr(this._data))}_getVisibleNodes(){if(!this._root)return[];const e=[],r=i=>{if(e.push(i),!i._collapsed&&i.children)for(const s of i.children)r(s)};return r(this._root),e}_toggleCollapse(e){!e.data.children||e.data.children.length===0||(e._collapsed?(e._collapsed=!1,e.children=e._children||[]):(e._collapsed=!0,e._children=e.children,e.children=void 0),this._render(!0))}_render(e){if(!this._svg||!this._root)return;const r=this._orientation==="horizontal",i=new Map,s=($,E)=>{if(i.set(E,{collapsed:!!$._collapsed,_children:$._children}),$._collapsed&&$._children)for(let T=0;T<$._children.length;T++)s($._children[T],`${E}/${T}`);if($.children)for(let T=0;T<$.children.length;T++)s($.children[T],`${E}/${T}`)};s(this._root,"0"),this._root=fr(this._data);const a=($,E)=>{const T=i.get(E);if(T!=null&&T.collapsed&&($._collapsed=!0,$._children=$.children,$.children=void 0),$.children)for(let M=0;M<$.children.length;M++)a($.children[M],`${E}/${M}`)};a(this._root,"0");const o=this._getVisibleNodes(),c=o.filter($=>!$.children||$.children.length===0).length,l=Fs(o,$=>$.depth)||0,u=Rn+20,h=ue+60;let f,d;r?(f=l*h,d=Math.max((c-1)*u,u)):(f=Math.max((c-1)*(ue+80),ue+80),d=l*h),Lp().size(r?[d,f]:[f,d]).separation(($,E)=>$.parent===E.parent?1.5:2)(this._root);const p=this._root.descendants(),_=this._root.links(),x=f+Ir*2+ue,b=d+Ir*2+Rn;this._svg.attr("viewBox",`0 0 ${x} ${b}`);const v=Ir+ue/2,m=Ir+Rn/2,w=$=>r?$.y+v:$.x+v,A=$=>r?$.x+m:$.y+m,S=this._svg.select(".links-group");S.selectAll("*").remove();const C=r?u0().x($=>$.y+v).y($=>$.x+m):h0().x($=>$.x+v).y($=>$.y+m);for(let $=0;$<_.length;$++){const E=_[$],T=S.append("path").attr("class","link").attr("d",C(E));if(e){const M=T.node().getTotalLength();T.attr("stroke-dasharray",M).attr("stroke-dashoffset",M).transition().delay($*60+100).duration(500).ease(fn).attr("stroke-dashoffset",0)}}const y=this._svg.select(".nodes-group");y.selectAll("*").remove();for(let $=0;$<p.length;$++){const E=p[$],T=w(E),M=A(E),P=E.data.children&&E.data.children.length>0,k=!!E._collapsed,z=E.depth%Fl.length,R=getComputedStyle(this).getPropertyValue(`--lv-chart-${z}`).trim()||Fl[z],O=y.append("g").attr("transform",`translate(${T},${M})`);e&&O.attr("opacity",0).transition().delay($*60).duration(400).ease(fn).attr("opacity",1);const N=O.append("rect").attr("class",`node-rect ${P?"has-children":"leaf"}`).attr("x",-ue/2).attr("y",-Rn/2).attr("width",ue).attr("height",Rn).attr("stroke",R);O.append("text").attr("class","node-label").text(E.data.label),P&&O.append("text").attr("class","collapse-indicator").attr("x",ue/2-12).attr("y",0).text(k?"+":"−"),P&&(N.on("click",()=>{this._toggleCollapse(E)}),O.select(".collapse-indicator").on("click",()=>{this._toggleCollapse(E)}))}}}customElements.define("lv-tree",Lm);const Pm="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js",zm=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;let Ss=null;class Om extends q{constructor(){super(...arguments);D(this,"_rendered",!1)}static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(zm),this._renderDiagram()}async _renderDiagram(){var i;const e=(i=this.textContent)==null?void 0:i.trim();if(!e){this.render('<div class="mermaid-container"></div>');return}this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');try{await zs(Pm)}catch{this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');return}const r=window.mermaid;if(r){Ss||(Ss=new Promise(s=>{const a=getComputedStyle(this),o=a.getPropertyValue("--lv-bg-card").trim()||"#1a1a2e",c=a.getPropertyValue("--lv-text").trim()||"#e4e4ec",l=a.getPropertyValue("--lv-accent").trim()||"#00d4ff",u=a.getPropertyValue("--lv-accent2").trim()||"#7b68ee",h=a.getPropertyValue("--lv-border").trim()||"#2a2a4a";r.initialize({startOnLoad:!1,theme:"base",themeVariables:{primaryColor:l,primaryTextColor:c,primaryBorderColor:h,secondaryColor:u,secondaryTextColor:c,tertiaryColor:o,lineColor:l,textColor:c,mainBkg:o,nodeBorder:h,clusterBkg:o,edgeLabelBackground:o,fontFamily:"Inter, Segoe UI, sans-serif"},flowchart:{htmlLabels:!0,curve:"basis"},securityLevel:"strict"}),s()})),await Ss;try{const s="lv-mermaid-"+Math.random().toString(36).slice(2,8),{svg:a}=await r.render(s,e),o=this.root.getElementById("output");o&&(o.innerHTML=a)}catch(s){const a=this.root.getElementById("output");a&&(a.innerHTML=`<div class="mermaid-error">Diagram error: ${s.message||s}</div>`)}}}}customElements.define("lv-mermaid",Om),F.LvBaseElement=q,F.clamp=Es,F.colorScale=Ls,F.formatNum=Ps,F.getToken=Ul,F.lerp=Ee,F.loadScript=zs,F.loadStylesheet=jl,F.scrollAnimator=Br,F.setTheme=Kl,F.simColorScale=Yl,F.uid=Wl,Object.defineProperty(F,Symbol.toStringTag,{value:"Module"})}));

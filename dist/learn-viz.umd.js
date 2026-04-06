(function(q,Y){typeof exports=="object"&&typeof module<"u"?Y(exports):typeof define=="function"&&define.amd?define(["exports"],Y):(q=typeof globalThis<"u"?globalThis:q||self,Y(q.LearnViz={}))})(this,(function(q){"use strict";var Nm=Object.defineProperty;var Fl=q=>{throw TypeError(q)};var Dm=(q,Y,et)=>Y in q?Nm(q,Y,{enumerable:!0,configurable:!0,writable:!0,value:et}):q[Y]=et;var D=(q,Y,et)=>Dm(q,typeof Y!="symbol"?Y+"":Y,et),Il=(q,Y,et)=>Y.has(q)||Fl("Cannot "+et);var Qe=(q,Y,et)=>(Il(q,Y,"read from private field"),et?et.call(q):Y.get(q)),Ir=(q,Y,et)=>Y.has(q)?Fl("Cannot add the same private member more than once"):Y instanceof WeakSet?Y.add(q):Y.set(q,et),Je=(q,Y,et,F)=>(Il(q,Y,"write to private field"),F?F.call(q,et):Y.set(q,et),et);var Ze,On,he;class Y{constructor(){Ir(this,Ze);Ir(this,On,new WeakSet);Je(this,Ze,new IntersectionObserver(t=>{for(const e of t)if(e.isIntersecting&&!Qe(this,On).has(e.target)){Qe(this,On).add(e.target);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=e.target;typeof i.animateIn=="function"&&(r?i.animateIn(!0):i.animateIn(!1))}},{threshold:.15}))}observe(t){Qe(this,Ze).observe(t)}unobserve(t){Qe(this,Ze).unobserve(t)}}Ze=new WeakMap,On=new WeakMap;const et=new Y;class F extends HTMLElement{constructor(){super();D(this,"root");Ir(this,he,!1);this.root=this.attachShadow({mode:"open"})}get dir(){var e;return((e=this.closest("[dir]"))==null?void 0:e.getAttribute("dir"))||document.documentElement.dir||"ltr"}get isRtl(){return this.dir==="rtl"}adoptStyles(e){const r=new CSSStyleSheet;r.replaceSync(e),this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,r]}jsonAttr(e,r){const i=this.getAttribute(e);if(!i)return r;const s=i.replace(/\u2212/g,"-");try{return JSON.parse(s)}catch{return r}}render(e){Je(this,he,!0),this.root.innerHTML=e,Je(this,he,!1)}attributeChangedCallback(e,r,i){Qe(this,he)||(Je(this,he,!0),this.handleAttributeChange(e,r,i),Je(this,he,!1))}handleAttributeChange(e,r,i){}animateIn(e){}connectedCallback(){et.observe(this)}disconnectedCallback(){et.unobserve(this)}}he=new WeakMap;function Ee(n,t,e){return n+(t-n)*e}function Ts(n,t,e){return Math.min(Math.max(n,t),e)}function Ms(n){n=Ts(n,0,1);const t=n<.5?Math.round(Ee(0,255,n*2)):255,e=n<.5?Math.round(Ee(200,230,n*2)):Math.round(Ee(230,50,(n-.5)*2)),r=n<.5?Math.round(Ee(83,60,n*2)):Math.round(Ee(60,80,(n-.5)*2));return`rgb(${t},${e},${r})`}function ql(n){return Ms((1-n)/2)}function Es(n){return Number.isInteger(n)?n.toString():Math.abs(n)>=100?n.toFixed(0):Math.abs(n)>=1?n.toFixed(1):n.toFixed(2)}let Bl=0;function Hl(n="lv"){return`${n}-${++Bl}`}const qr=new Map,Br=new Map;function te(n){let t=qr.get(n);return t||(t=new Promise((e,r)=>{const i=document.createElement("script");i.src=n,i.onload=()=>e(),i.onerror=()=>{qr.delete(n),r(new Error(`Failed to load ${n}`))},document.head.appendChild(i)}),qr.set(n,t),t)}function Vl(n){let t=Br.get(n);return t||(t=new Promise((e,r)=>{const i=document.createElement("link");i.rel="stylesheet",i.href=n,i.onload=()=>e(),i.onerror=()=>{Br.delete(n),r(new Error(`Failed to load ${n}`))},document.head.appendChild(i)}),Br.set(n,t),t)}function Xl(n,t){const e=t||document.documentElement;return getComputedStyle(e).getPropertyValue(`--lv-${n}`).trim()}function Yl(n,t){n.setAttribute("data-theme",t)}const Gl=`
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
`;class jl extends F{static get observedAttributes(){return["theme","dir"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Gl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("dir")||"ltr";this.setAttribute("dir",t);const e=this.getAttribute("theme")||"dark";this.setAttribute("data-theme",e),this.render("<slot></slot>")}}customElements.define("lv-page",jl);const Wl=`
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
`;class Ul extends F{static get observedAttributes(){return["number","title","subtitle","gradient"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Wl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("number")||"",e=this.getAttribute("title")||"",r=this.getAttribute("subtitle")||"",i=this.getAttribute("gradient")||"",s=i?`background: ${i};`:"";this.render(`
      <div class="hero" style="${s}">
        ${t?`<div class="number">${t}</div>`:""}
        <div class="content">
          <h1>${e}</h1>
          ${r?`<p class="subtitle">${r}</p>`:""}
        </div>
      </div>
    `)}}customElements.define("lv-hero",Ul);const Kl=`
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
`;class Zl extends F{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Kl),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("title")||"";this.render(`
      ${t?`<h2>${t}</h2>`:""}
      <slot></slot>
    `)}}customElements.define("lv-section",Zl);const Ql=`
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
`;class Jl extends F{static get observedAttributes(){return["variant"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ql),this._render()}handleAttributeChange(){this._render()}_render(){this.root.querySelector(".card")||this.render('<div class="card"><slot></slot></div>')}}customElements.define("lv-card",Jl);const tc=`
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
`;class ec extends F{static get observedAttributes(){return["cols","gap"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(tc),this._render()}handleAttributeChange(){this.root.querySelector(".grid")||this._render()}_render(){this.render('<div class="grid"><slot></slot></div>')}}customElements.define("lv-grid",ec);const nc=`
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
`;class rc extends F{static get observedAttributes(){return["label","active"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(nc),this.render("<slot></slot>"),this.setAttribute("role","tabpanel")}handleAttributeChange(){}}customElements.define("lv-tab",rc);const ic=`
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
`;class sc extends F{constructor(){super(...arguments);D(this,"_tabs",[]);D(this,"_buttons",[]);D(this,"_activeIndex",0)}connectedCallback(){super.connectedCallback(),this.adoptStyles(ic),requestAnimationFrame(()=>this._setup())}_setup(){if(this._tabs=Array.from(this.querySelectorAll("lv-tab")),this._tabs.length===0)return;const e=this._tabs.findIndex(s=>s.hasAttribute("active"));this._activeIndex=e>=0?e:0;const r=this._tabs.map((s,a)=>{const o=s.getAttribute("label")||`Tab ${a+1}`,c=a===this._activeIndex;return`<button
        class="tab-btn"
        role="tab"
        aria-selected="${c}"
        tabindex="${c?"0":"-1"}"
        data-index="${a}"
      >${o}</button>`}).join("");this.render(`
      <div class="tablist" role="tablist">${r}</div>
      <div class="panels"><slot></slot></div>
    `),this._buttons=Array.from(this.root.querySelectorAll(".tab-btn")),this._activate(this._activeIndex);const i=this.root.querySelector(".tablist");i.addEventListener("click",s=>{const a=s.target.closest(".tab-btn");a&&this._activate(Number(a.dataset.index))}),i.addEventListener("keydown",(s=>{const a=this._buttons.length;let o=this._activeIndex;switch(s.key){case"ArrowRight":case"ArrowDown":s.preventDefault(),o=(o+1)%a;break;case"ArrowLeft":case"ArrowUp":s.preventDefault(),o=(o-1+a)%a;break;case"Home":s.preventDefault(),o=0;break;case"End":s.preventDefault(),o=a-1;break;case"Enter":case" ":s.preventDefault(),this._activate(o);return;default:return}this._buttons[o].focus(),this._activate(o)}))}_activate(e){this._activeIndex=e,this._buttons.forEach((r,i)=>{const s=i===e;r.setAttribute("aria-selected",String(s)),r.setAttribute("tabindex",s?"0":"-1")}),this._tabs.forEach((r,i)=>{i===e?r.setAttribute("active",""):r.removeAttribute("active")})}}customElements.define("lv-tabs",sc);const ac=`
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
`;class oc extends F{static get observedAttributes(){return["prev","prev-label","next","next-label"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(ac),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("prev")||"",e=this.getAttribute("prev-label")||"Previous",r=this.getAttribute("next")||"",i=this.getAttribute("next-label")||"Next",s=this.isRtl,a=s?"→":"←",o=s?"←":"→";this.render(`
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
    `)}}customElements.define("lv-nav",oc);const lc=`
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
`;class cc extends F{static get observedAttributes(){return["vs"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(lc),this._render()}handleAttributeChange(){this._render()}_render(){const t=this.getAttribute("vs"),e=t!==null,r=t||"VS";e?this.render(`
        <div class="comparison">
          <slot name="left"></slot>
          <div class="vs-badge">${r}</div>
          <slot name="right"></slot>
        </div>
      `):this.render(`
        <div class="comparison">
          <slot></slot>
        </div>
      `)}}customElements.define("lv-comparison",cc);const uc=`
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
`,hc=`
  <div class="val"></div>
  <div class="label"></div>
`;class fc extends F{constructor(){super(...arguments);D(this,"_observer",null)}static get observedAttributes(){return["value","label","prefix","suffix","color","animated"]}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.adoptStyles(uc),this.render(hc),this._update(),this._setupObserver()}disconnectedCallback(){var e,r;(e=super.disconnectedCallback)==null||e.call(this),(r=this._observer)==null||r.disconnect(),this._observer=null}handleAttributeChange(e,r,i){this.root.querySelector(".val")&&this._update()}_update(){const e=this.getAttribute("color");e&&(this.style.setProperty("--_color",e),this.style.setProperty("--_glow",e));const r=this.root.querySelector(".label");r&&(r.textContent=this.getAttribute("label")||"");const i=this.root.querySelector(".val");if(i){const s=this.getAttribute("prefix")||"",a=this.getAttribute("suffix")||"",o=this.getAttribute("value")||"";i.textContent=s+o+a}}_setupObserver(){this.hasAttribute("animated")&&(this._observer=new IntersectionObserver(e=>{var r;for(const i of e)i.isIntersecting&&(this.animateIn(!1),(r=this._observer)==null||r.unobserve(this))},{threshold:.1}),this._observer.observe(this))}animateIn(e){if(!this.hasAttribute("animated")||e)return;const r=parseFloat(this.getAttribute("value")||"0");if(isNaN(r))return;const i=1200,s=performance.now(),a=this.root.querySelector(".val"),o=c=>{const l=Math.min((c-s)/i,1),u=1-Math.pow(1-l,3),h=r*u;a.textContent=(this.getAttribute("prefix")||"")+Es(h)+(this.getAttribute("suffix")||""),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}customElements.define("lv-metric",fc);const Ls={info:{color:"var(--lv-info, #3b82f6)",icon:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
    </svg>`}},dc=`
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
`;class pc extends F{static get observedAttributes(){return["type","title"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(dc),this._render()}handleAttributeChange(t,e,r){this.root.querySelector(".callout")&&this._render()}_getType(){const t=this.getAttribute("type");return Ls[t]?t:"info"}_render(){const t=this._getType(),e=Ls[t],r=this.getAttribute("title")||"";this.style.setProperty("--_type-color",e.color),this.style.setProperty("--_type-bg",`color-mix(in srgb, ${e.color} 8%, transparent)`);const i=`
      <div class="callout" role="note">
        <div class="header">
          ${e.icon}
          ${r?`<span class="title">${r}</span>`:""}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;this.render(i)}}customElements.define("lv-callout",pc);const gc=`
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
`,mc=`
  <span class="badge"><slot></slot></span>
`;class _c extends F{static get observedAttributes(){return["color","variant"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(gc),this.render(mc),this._updateColor()}handleAttributeChange(t,e,r){t==="color"&&this._updateColor()}_updateColor(){const t=this.getAttribute("color");t?this.style.setProperty("--_color",t):this.style.removeProperty("--_color")}}customElements.define("lv-badge",_c);const vc=`
  :host { display: inline; direction: ltr; unicode-bidi: isolate; }
  :host([display]) { display: block; text-align: center; margin: 16px 0; direction: ltr; unicode-bidi: isolate; }
  .katex-container { direction: ltr; text-align: center; unicode-bidi: isolate; }
  .fallback { font-family: var(--lv-font-mono); color: var(--lv-text-dim); }
`,Ps="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",yc="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";let Nn=null;function xc(){return window.katex?Promise.resolve():Nn||(Nn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=Ps,document.head.appendChild(e);const r=document.createElement("script");r.src=yc,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load KaTeX")),document.head.appendChild(r)}),Nn)}class bc extends F{constructor(){super(...arguments);D(this,"_source","")}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(vc),this._render()}async _render(){try{await xc();const e=this.hasAttribute("display"),r=window.katex.renderToString(this._source,{displayMode:e,throwOnError:!1});this.root.innerHTML=`<link rel="stylesheet" href="${Ps}"><span class="katex-container">${r}</span>`}catch{this.root.innerHTML=`<span class="fallback">${this._escapeHtml(this._source)}</span>`}}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-math",bc);const wc=`
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
`,kc="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js",zs="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css";let Dn=null;function Ac(){return window.hljs?Promise.resolve():Dn||(Dn=new Promise((n,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=zs,document.head.appendChild(e);const r=document.createElement("script");r.src=kc,r.onload=()=>n(),r.onerror=()=>t(new Error("Failed to load highlight.js")),document.head.appendChild(r)}),Dn)}class $c extends F{constructor(){super(...arguments);D(this,"_source","")}static get observedAttributes(){return["language","line-numbers"]}connectedCallback(){var e,r;(e=super.connectedCallback)==null||e.call(this),this._source=((r=this.textContent)==null?void 0:r.trim())||"",this.adoptStyles(wc),this._render()}async _render(){const e=this.getAttribute("language")||"",r=this.hasAttribute("line-numbers");let i;try{await Ac();const a=window.hljs;e&&a.getLanguage(e)?i=a.highlight(this._source,{language:e}).value:i=a.highlightAuto(this._source).value}catch{i=this._escapeHtml(this._source)}let s;r?s=i.split(`
`).map((o,c)=>`<span class="line-num">${c+1}</span>${o}`).join(`
`):s=i,this.root.innerHTML=`<link rel="stylesheet" href="${zs}"><div class="code-block"><pre><code>${s}</code></pre></div>`}_escapeHtml(e){const r=document.createElement("span");return r.textContent=e,r.innerHTML}}customElements.define("lv-code",$c);const Cc=`
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
`;class Sc extends F{static get observedAttributes(){return["data","labels","highlight"]}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.adoptStyles(Cc),this._render()}handleAttributeChange(){this.root&&this._render()}_render(){var h;const t=this.jsonAttr("data",[]),e=this.jsonAttr("labels",{}),r=this.jsonAttr("highlight",[]);if(!t.length){this.root.innerHTML="";return}const i=t.length,s=((h=t[0])==null?void 0:h.length)||0,a=!!(e.rows&&e.rows.length),o=!!(e.cols&&e.cols.length),c=new Set(r.map(([f,d])=>`${f},${d}`)),l=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;let u='<div class="matrix-wrapper">';if(o){const f=a?`auto repeat(${s}, auto)`:`repeat(${s}, auto)`;u+=`<div class="col-labels" style="grid-template-columns: ${f}">`,a&&(u+="<span></span>");for(let d=0;d<s;d++)u+=`<span class="col-label">${this._escapeHtml(e.cols[d]||"")}</span>`;u+="</div>"}u+=`<div class="matrix" style="grid-template-columns: ${l}">`,u+='<div class="bracket-left"></div>',u+='<div class="bracket-right"></div>';for(let f=0;f<i;f++){a&&(u+=`<span class="row-label">${this._escapeHtml(e.rows[f]||"")}</span>`);for(let d=0;d<s;d++){const g=t[f][d],p=typeof g=="number"?this._formatNum(g):String(g),_=c.has(`${f},${d}`);u+=`<span class="cell${_?" highlight":""}">${p}</span>`}}u+="</div></div>",this.root.innerHTML=u}_formatNum(t){return t.toFixed(3).replace(/0$/,"")}_escapeHtml(t){const e=document.createElement("span");return e.textContent=t,e.innerHTML}}customElements.define("lv-matrix",Sc);const Tc=`
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
`;class Mc extends F{constructor(){super(...arguments);D(this,"_answered",!1)}static get observedAttributes(){return["question","options","correct","explanation"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Tc),this._render(),this._attachListeners()}handleAttributeChange(){this._answered||(this._render(),this._attachListeners())}get _options(){return this.jsonAttr("options",[])}get _correctIndex(){return parseInt(this.getAttribute("correct")||"0",10)}_render(){const e=this.getAttribute("question")||"",r=this._options,i=this.getAttribute("explanation")||"",s=r.map((a,o)=>`
      <div class="option" role="button" tabindex="0" data-index="${o}">
        <span class="icon" aria-hidden="true"></span>
        <span class="label">${a}</span>
      </div>
    `).join("");this.render(`
      <div class="question">${e}</div>
      <div class="options">${s}</div>
      ${i?`<div class="explanation"><div class="explanation-inner">${i}</div></div>`:""}
    `)}_attachListeners(){this.root.querySelectorAll(".option").forEach(r=>{r.addEventListener("click",()=>this._select(r)),r.addEventListener("keydown",i=>{const s=i.key;(s==="Enter"||s===" ")&&(i.preventDefault(),this._select(r))})})}_select(e){if(this._answered)return;this._answered=!0;const r=parseInt(e.dataset.index||"0",10),i=this._correctIndex,s=r===i;this.root.querySelectorAll(".option").forEach((c,l)=>{const u=c;u.removeAttribute("tabindex"),l===i?(u.classList.add("correct"),u.querySelector(".icon").textContent="✓"):l===r&&!s?(u.classList.add("wrong"),u.querySelector(".icon").textContent="✗"):u.classList.add("dimmed")});const o=this.root.querySelector(".explanation");o&&requestAnimationFrame(()=>o.classList.add("visible")),this.dispatchEvent(new CustomEvent("lv-quiz-answer",{bubbles:!0,composed:!0,detail:{correct:s,selected:r,answer:i}}))}}customElements.define("lv-quiz",Mc);const Ec=`
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
`;class Lc extends F{constructor(){super(...arguments);D(this,"_revealed",!1)}static get observedAttributes(){return["label","revealed"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ec),this._render(),this._attachListeners(),this.hasAttribute("revealed")&&this._reveal(!1)}handleAttributeChange(e){if(e==="revealed"&&this.hasAttribute("revealed")&&!this._revealed&&this._reveal(!0),e==="label"){const r=this.root.querySelector(".trigger-label");r&&(r.textContent=this._label)}}get _label(){return this.getAttribute("label")||"اضغط للإظهار"}_render(){this.render(`
      <div class="trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="trigger-label">${this._label}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `)}_attachListeners(){const e=this.root.querySelector(".trigger");e.addEventListener("click",()=>this._reveal(!0)),e.addEventListener("keydown",r=>{const i=r.key;(i==="Enter"||i===" ")&&(r.preventDefault(),this._reveal(!0))})}_reveal(e){if(this._revealed)return;this._revealed=!0;const r=this.root.querySelector(".trigger"),i=this.root.querySelector(".content");r.setAttribute("aria-expanded","true"),e?(r.classList.add("hidden"),setTimeout(()=>i.classList.add("visible"),150)):(r.classList.add("hidden"),i.classList.add("visible"))}}customElements.define("lv-reveal",Lc);const Pc=`
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
`;class zc extends F{constructor(){super(...arguments);D(this,"_input",null);D(this,"_valueEl",null);D(this,"_popTimeout",null)}static get observedAttributes(){return["min","max","step","value","label","name","color"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Pc),this._render(),this._bind(),this._updateTrack()}handleAttributeChange(){this._input&&(this._render(),this._bind(),this._updateTrack())}get _min(){return parseFloat(this.getAttribute("min")||"0")}get _max(){return parseFloat(this.getAttribute("max")||"100")}get _step(){return this.getAttribute("step")||"1"}get _value(){return this.getAttribute("value")||"50"}get _label(){return this.getAttribute("label")||""}get _name(){return this.getAttribute("name")||""}get _color(){return this.getAttribute("color")||""}_render(){const e=this._color?`--fill-color: ${this._color};`:"";this.render(`
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
    `),this._input=this.root.querySelector("input"),this._valueEl=this.root.querySelector(".value-display")}_bind(){this._input&&this._input.addEventListener("input",()=>{const e=this._input.value;this._valueEl&&(this._valueEl.textContent=e,this._valueEl.classList.add("pop"),this._popTimeout&&clearTimeout(this._popTimeout),this._popTimeout=window.setTimeout(()=>{var r;(r=this._valueEl)==null||r.classList.remove("pop")},150)),this._updateTrack(),this.dispatchEvent(new CustomEvent("lv-change",{bubbles:!0,composed:!0,detail:{name:this._name,value:parseFloat(e)}}))})}_updateTrack(){if(!this._input)return;const e=this._min,r=this._max,s=(parseFloat(this._input.value)-e)/(r-e)*100,o=`linear-gradient(to right, ${this._color||"var(--lv-accent)"} ${s}%, var(--lv-border) ${s}%)`;this._input.style.setProperty("--track-bg",o),this._input.style.background=o,this._input.style.borderRadius="9999px"}}customElements.define("lv-slider",zc);const Rc=`
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
`;class Oc extends F{static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Rc),this._render(),this._bind()}_render(){this.render(`
      <div class="layout">
        <div class="output">
          <slot name="output"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
    `)}_bind(){this.addEventListener("lv-change",()=>{const t=this._collectParams();this.dispatchEvent(new CustomEvent("lv-params-change",{bubbles:!0,composed:!0,detail:t}))})}_collectParams(){const t=this.querySelectorAll('lv-slider[slot="controls"]'),e={};return t.forEach(r=>{var s;const i=r.getAttribute("name");if(i){const a=(s=r.root)==null?void 0:s.querySelector("input"),o=parseFloat(a?a.value:r.getAttribute("value")||"0");e[i]=o}}),e}}customElements.define("lv-playground",Oc);const Nc=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];function Rs(n){return String(n).split("").map(t=>Nc[parseInt(t)]??t).join("")}const Dc=`
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
`;class Fc extends F{static get observedAttributes(){return["title"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Dc),this._render()}handleAttributeChange(){this.root.querySelector(".title")&&this._render()}get _title(){return this.getAttribute("title")||""}_render(){this.render(`
      ${this._title?`<div class="title">${this._title}</div>`:""}
      <slot></slot>
    `)}}customElements.define("lv-step",Fc);const Ic=`
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
`;class qc extends F{constructor(){super(...arguments);D(this,"_current",0);D(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(Ic),this._render(),requestAnimationFrame(()=>{this._steps=Array.from(this.querySelectorAll("lv-step")),this._showStep(0,null),this._bind()})}get _total(){return this._steps.length}_render(){this.render(`
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
    `)}_bind(){const e=this.root.querySelector(".prev"),r=this.root.querySelector(".next");e.addEventListener("click",()=>this._go(-1)),r.addEventListener("click",()=>this._go(1)),this.addEventListener("keydown",i=>{i.key==="ArrowRight"?(i.preventDefault(),this._go(this.isRtl?-1:1)):i.key==="ArrowLeft"&&(i.preventDefault(),this._go(this.isRtl?1:-1))}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_go(e){const r=this._current+e;r<0||r>=this._total||(this._current,this._current=r,this._showStep(r,e>0?"forward":"backward"))}_showStep(e,r){this._steps.forEach((o,c)=>{o.classList.remove("active","from-start","from-end"),c===e&&(o.classList.add("active"),r==="forward"?o.classList.add(this.isRtl?"from-start":"from-end"):r==="backward"&&o.classList.add(this.isRtl?"from-end":"from-start"))});const i=this.root.querySelector(".counter");i&&(i.textContent=`${Rs(e+1)} / ${Rs(this._total)}`);const s=this.root.querySelector(".prev"),a=this.root.querySelector(".next");s&&(s.disabled=e===0),a&&(a.disabled=e===this._total-1)}}customElements.define("lv-stepper",qc);const Bc=["#00d4ff","#7b68ee","#00c853","#ff9800","#ff2d75","#ffd93d","#69f0ae","#ff6b9d"],Hc=`
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
`;class Vc extends F{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","direction","sorted"]}get data(){return this._data}set data(e){if(typeof e=="string")try{this._data=JSON.parse(e)}catch{this._data=[]}else this._data=e;this._buildChart()}connectedCallback(){super.connectedCallback(),this.adoptStyles(Hc),this._data=this.jsonAttr("data",[]),this._buildChart()}handleAttributeChange(e){e==="data"&&(this._data=this.jsonAttr("data",[])),this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;this.root.querySelectorAll(".bar-fill").forEach((i,s)=>{const a=i,o=a.dataset.width||"0%";a.classList.add("animate"),setTimeout(()=>{a.classList.remove("animate"),a.style.width=o},s*80+50)})}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||Bc[e%8]}_buildChart(){const e=this.hasAttribute("sorted")?[...this._data].sort((s,a)=>a.value-s.value):[...this._data];if(!e.length){this.render('<div class="bar-list"></div>');return}const r=Math.max(...e.map(s=>s.value),.001),i=e.map((s,a)=>{const o=s.value/r*100,c=this._getColor(a,s),l=s.tagColor||c,u=typeof s.value=="number"?s.value%1?s.value.toFixed(2):s.value.toString():s.value;return`
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
      `}).join("");this.render(`<div class="bar-list">${i}</div>`),this._hasAnimated&&this.root.querySelectorAll(".bar-fill").forEach(s=>{const a=s;a.style.width=a.dataset.width||"0%"})}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-bar-chart",Vc);function Fn(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Xc(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Hr(n){let t,e,r;n.length!==2?(t=Fn,e=(o,c)=>Fn(n(o),c),r=(o,c)=>n(o)-c):(t=n===Fn||n===Xc?n:Yc,e=n,r=n);function i(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<0?l=h+1:u=h}while(l<u)}return l}function s(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function a(o,c,l=0,u=o.length){const h=i(o,c,l,u-1);return h>l&&r(o[h-1],c)>-r(o[h],c)?h-1:h}return{left:i,center:a,right:s}}function Yc(){return 0}function Gc(n){return n===null?NaN:+n}const jc=Hr(Fn).right;Hr(Gc).center;function In(n,t){let e,r;if(t===void 0)for(const i of n)i!=null&&(e===void 0?i>=i&&(e=r=i):(e>i&&(e=i),r<i&&(r=i)));else{let i=-1;for(let s of n)(s=t(s,++i,n))!=null&&(e===void 0?s>=s&&(e=r=s):(e>s&&(e=s),r<s&&(r=s)))}return[e,r]}const Wc=Math.sqrt(50),Uc=Math.sqrt(10),Kc=Math.sqrt(2);function qn(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),a=s>=Wc?10:s>=Uc?5:s>=Kc?2:1;let o,c,l;return i<0?(l=Math.pow(10,-i)/a,o=Math.round(n*l),c=Math.round(t*l),o/l<n&&++o,c/l>t&&--c,l=-l):(l=Math.pow(10,i)*a,o=Math.round(n/l),c=Math.round(t/l),o*l<n&&++o,c*l>t&&--c),c<o&&.5<=e&&e<2?qn(n,t,e*2):[o,c,l]}function Zc(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,s,a]=r?qn(t,n,e):qn(n,t,e);if(!(s>=i))return[];const o=s-i+1,c=new Array(o);if(r)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(i+l)/-a;else for(let l=0;l<o;++l)c[l]=(i+l)*a;return c}function Vr(n,t,e){return t=+t,n=+n,e=+e,qn(n,t,e)[2]}function Qc(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?Vr(t,n,e):Vr(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function Os(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function Jc(n,t){let e;for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);return e}function tu(n){return n}var Xr=1,Yr=2,Gr=3,tn=4,Ns=1e-6;function eu(n){return"translate("+n+",0)"}function nu(n){return"translate(0,"+n+")"}function ru(n){return t=>+n(t)}function iu(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function su(){return!this.__axis}function Ds(n,t){var e=[],r=null,i=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===Xr||n===tn?-1:1,u=n===tn||n===Yr?"x":"y",h=n===Xr||n===Gr?eu:nu;function f(d){var g=r??(t.ticks?t.ticks.apply(t,e):t.domain()),p=i??(t.tickFormat?t.tickFormat.apply(t,e):tu),_=Math.max(s,0)+o,y=t.range(),b=+y[0]+c,v=+y[y.length-1]+c,m=(t.bandwidth?iu:ru)(t.copy(),c),w=d.selection?d.selection():d,C=w.selectAll(".domain").data([null]),k=w.selectAll(".tick").data(g,t).order(),$=k.exit(),x=k.enter().append("g").attr("class","tick"),S=k.select("line"),M=k.select("text");C=C.merge(C.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),k=k.merge(x),S=S.merge(x.append("line").attr("stroke","currentColor").attr(u+"2",l*s)),M=M.merge(x.append("text").attr("fill","currentColor").attr(u,l*_).attr("dy",n===Xr?"0em":n===Gr?"0.71em":"0.32em")),d!==w&&(C=C.transition(d),k=k.transition(d),S=S.transition(d),M=M.transition(d),$=$.transition(d).attr("opacity",Ns).attr("transform",function(T){return isFinite(T=m(T))?h(T+c):this.getAttribute("transform")}),x.attr("opacity",Ns).attr("transform",function(T){var E=this.parentNode.__axis;return h((E&&isFinite(E=E(T))?E:m(T))+c)})),$.remove(),C.attr("d",n===tn||n===Yr?a?"M"+l*a+","+b+"H"+c+"V"+v+"H"+l*a:"M"+c+","+b+"V"+v:a?"M"+b+","+l*a+"V"+c+"H"+v+"V"+l*a:"M"+b+","+c+"H"+v),k.attr("opacity",1).attr("transform",function(T){return h(m(T)+c)}),S.attr(u+"2",l*s),M.attr(u,l*_).text(p),w.filter(su).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===Yr?"start":n===tn?"end":"middle"),w.each(function(){this.__axis=m})}return f.scale=function(d){return arguments.length?(t=d,f):t},f.ticks=function(){return e=Array.from(arguments),f},f.tickArguments=function(d){return arguments.length?(e=d==null?[]:Array.from(d),f):e.slice()},f.tickValues=function(d){return arguments.length?(r=d==null?null:Array.from(d),f):r&&r.slice()},f.tickFormat=function(d){return arguments.length?(i=d,f):i},f.tickSize=function(d){return arguments.length?(s=a=+d,f):s},f.tickSizeInner=function(d){return arguments.length?(s=+d,f):s},f.tickSizeOuter=function(d){return arguments.length?(a=+d,f):a},f.tickPadding=function(d){return arguments.length?(o=+d,f):o},f.offset=function(d){return arguments.length?(c=+d,f):c},f}function Bn(n){return Ds(Gr,n)}function Hn(n){return Ds(tn,n)}var au={value:()=>{}};function jr(){for(var n=0,t=arguments.length,e={},r;n<t;++n){if(!(r=arguments[n]+"")||r in e||/[\s.]/.test(r))throw new Error("illegal type: "+r);e[r]=[]}return new Vn(e)}function Vn(n){this._=n}function ou(n,t){return n.trim().split(/^|\s+/).map(function(e){var r="",i=e.indexOf(".");if(i>=0&&(r=e.slice(i+1),e=e.slice(0,i)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:r}})}Vn.prototype=jr.prototype={constructor:Vn,on:function(n,t){var e=this._,r=ou(n+"",e),i,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((i=(n=r[s]).type)&&(i=lu(e[i],n.name)))return i;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(i=(n=r[s]).type)e[i]=Fs(e[i],n.name,t);else if(t==null)for(i in e)e[i]=Fs(e[i],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Vn(n)},call:function(n,t){if((i=arguments.length-2)>0)for(var e=new Array(i),r=0,i,s;r<i;++r)e[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)}};function lu(n,t){for(var e=0,r=n.length,i;e<r;++e)if((i=n[e]).name===t)return i.value}function Fs(n,t,e){for(var r=0,i=n.length;r<i;++r)if(n[r].name===t){n[r]=au,n=n.slice(0,r).concat(n.slice(r+1));break}return e!=null&&n.push({name:t,value:e}),n}var Wr="http://www.w3.org/1999/xhtml";const Is={svg:"http://www.w3.org/2000/svg",xhtml:Wr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Xn(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),Is.hasOwnProperty(t)?{space:Is[t],local:n}:n}function cu(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Wr&&t.documentElement.namespaceURI===Wr?t.createElement(n):t.createElementNS(e,n)}}function uu(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function qs(n){var t=Xn(n);return(t.local?uu:cu)(t)}function hu(){}function Ur(n){return n==null?hu:function(){return this.querySelector(n)}}function fu(n){typeof n!="function"&&(n=Ur(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=new Array(a),c,l,u=0;u<a;++u)(c=s[u])&&(l=n.call(c,c.__data__,u,s))&&("__data__"in c&&(l.__data__=c.__data__),o[u]=l);return new xt(r,this._parents)}function du(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function pu(){return[]}function Bs(n){return n==null?pu:function(){return this.querySelectorAll(n)}}function gu(n){return function(){return du(n.apply(this,arguments))}}function mu(n){typeof n=="function"?n=gu(n):n=Bs(n);for(var t=this._groups,e=t.length,r=[],i=[],s=0;s<e;++s)for(var a=t[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(r.push(n.call(c,c.__data__,l,a)),i.push(c));return new xt(r,i)}function Hs(n){return function(){return this.matches(n)}}function Vs(n){return function(t){return t.matches(n)}}var _u=Array.prototype.find;function vu(n){return function(){return _u.call(this.children,n)}}function yu(){return this.firstElementChild}function xu(n){return this.select(n==null?yu:vu(typeof n=="function"?n:Vs(n)))}var bu=Array.prototype.filter;function wu(){return Array.from(this.children)}function ku(n){return function(){return bu.call(this.children,n)}}function Au(n){return this.selectAll(n==null?wu:ku(typeof n=="function"?n:Vs(n)))}function $u(n){typeof n!="function"&&(n=Hs(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new xt(r,this._parents)}function Xs(n){return new Array(n.length)}function Cu(){return new xt(this._enter||this._groups.map(Xs),this._parents)}function Yn(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}Yn.prototype={constructor:Yn,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Su(n){return function(){return n}}function Tu(n,t,e,r,i,s){for(var a=0,o,c=t.length,l=s.length;a<l;++a)(o=t[a])?(o.__data__=s[a],r[a]=o):e[a]=new Yn(n,s[a]);for(;a<c;++a)(o=t[a])&&(i[a]=o)}function Mu(n,t,e,r,i,s,a){var o,c,l=new Map,u=t.length,h=s.length,f=new Array(u),d;for(o=0;o<u;++o)(c=t[o])&&(f[o]=d=a.call(c,c.__data__,o,t)+"",l.has(d)?i[o]=c:l.set(d,c));for(o=0;o<h;++o)d=a.call(n,s[o],o,s)+"",(c=l.get(d))?(r[o]=c,c.__data__=s[o],l.delete(d)):e[o]=new Yn(n,s[o]);for(o=0;o<u;++o)(c=t[o])&&l.get(f[o])===c&&(i[o]=c)}function Eu(n){return n.__data__}function Lu(n,t){if(!arguments.length)return Array.from(this,Eu);var e=t?Mu:Tu,r=this._parents,i=this._groups;typeof n!="function"&&(n=Su(n));for(var s=i.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var u=r[l],h=i[l],f=h.length,d=Pu(n.call(u,u&&u.__data__,l,r)),g=d.length,p=o[l]=new Array(g),_=a[l]=new Array(g),y=c[l]=new Array(f);e(u,h,p,_,y,d,t);for(var b=0,v=0,m,w;b<g;++b)if(m=p[b]){for(b>=v&&(v=b+1);!(w=_[v])&&++v<g;);m._next=w||null}}return a=new xt(a,r),a._enter=o,a._exit=c,a}function Pu(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function zu(){return new xt(this._exit||this._groups.map(Xs),this._parents)}function Ru(n,t,e){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),t!=null&&(i=t(i),i&&(i=i.selection())),e==null?s.remove():e(s),r&&i?r.merge(i).order():i}function Ou(n){for(var t=n.selection?n.selection():n,e=this._groups,r=t._groups,i=e.length,s=r.length,a=Math.min(i,s),o=new Array(i),c=0;c<a;++c)for(var l=e[c],u=r[c],h=l.length,f=o[c]=new Array(h),d,g=0;g<h;++g)(d=l[g]||u[g])&&(f[g]=d);for(;c<i;++c)o[c]=e[c];return new xt(o,this._parents)}function Nu(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var r=n[t],i=r.length-1,s=r[i],a;--i>=0;)(a=r[i])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function Du(n){n||(n=Fu);function t(h,f){return h&&f?n(h.__data__,f.__data__):!h-!f}for(var e=this._groups,r=e.length,i=new Array(r),s=0;s<r;++s){for(var a=e[s],o=a.length,c=i[s]=new Array(o),l,u=0;u<o;++u)(l=a[u])&&(c[u]=l);c.sort(t)}return new xt(i,this._parents).order()}function Fu(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function Iu(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function qu(){return Array.from(this)}function Bu(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length;i<s;++i){var a=r[i];if(a)return a}return null}function Hu(){let n=0;for(const t of this)++n;return n}function Vu(){return!this.node()}function Xu(n){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var i=t[e],s=0,a=i.length,o;s<a;++s)(o=i[s])&&n.call(o,o.__data__,s,i);return this}function Yu(n){return function(){this.removeAttribute(n)}}function Gu(n){return function(){this.removeAttributeNS(n.space,n.local)}}function ju(n,t){return function(){this.setAttribute(n,t)}}function Wu(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function Uu(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function Ku(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function Zu(n,t){var e=Xn(n);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((t==null?e.local?Gu:Yu:typeof t=="function"?e.local?Ku:Uu:e.local?Wu:ju)(e,t))}function Ys(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function Qu(n){return function(){this.style.removeProperty(n)}}function Ju(n,t,e){return function(){this.style.setProperty(n,t,e)}}function th(n,t,e){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,e)}}function eh(n,t,e){return arguments.length>1?this.each((t==null?Qu:typeof t=="function"?th:Ju)(n,t,e??"")):Le(this.node(),n)}function Le(n,t){return n.style.getPropertyValue(t)||Ys(n).getComputedStyle(n,null).getPropertyValue(t)}function nh(n){return function(){delete this[n]}}function rh(n,t){return function(){this[n]=t}}function ih(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function sh(n,t){return arguments.length>1?this.each((t==null?nh:typeof t=="function"?ih:rh)(n,t)):this.node()[n]}function Gs(n){return n.trim().split(/^|\s+/)}function Kr(n){return n.classList||new js(n)}function js(n){this._node=n,this._names=Gs(n.getAttribute("class")||"")}js.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Ws(n,t){for(var e=Kr(n),r=-1,i=t.length;++r<i;)e.add(t[r])}function Us(n,t){for(var e=Kr(n),r=-1,i=t.length;++r<i;)e.remove(t[r])}function ah(n){return function(){Ws(this,n)}}function oh(n){return function(){Us(this,n)}}function lh(n,t){return function(){(t.apply(this,arguments)?Ws:Us)(this,n)}}function ch(n,t){var e=Gs(n+"");if(arguments.length<2){for(var r=Kr(this.node()),i=-1,s=e.length;++i<s;)if(!r.contains(e[i]))return!1;return!0}return this.each((typeof t=="function"?lh:t?ah:oh)(e,t))}function uh(){this.textContent=""}function hh(n){return function(){this.textContent=n}}function fh(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function dh(n){return arguments.length?this.each(n==null?uh:(typeof n=="function"?fh:hh)(n)):this.node().textContent}function ph(){this.innerHTML=""}function gh(n){return function(){this.innerHTML=n}}function mh(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function _h(n){return arguments.length?this.each(n==null?ph:(typeof n=="function"?mh:gh)(n)):this.node().innerHTML}function vh(){this.nextSibling&&this.parentNode.appendChild(this)}function yh(){return this.each(vh)}function xh(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function bh(){return this.each(xh)}function wh(n){var t=typeof n=="function"?n:qs(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function kh(){return null}function Ah(n,t){var e=typeof n=="function"?n:qs(n),r=t==null?kh:typeof t=="function"?t:Ur(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function $h(){var n=this.parentNode;n&&n.removeChild(this)}function Ch(){return this.each($h)}function Sh(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Th(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Mh(n){return this.select(n?Th:Sh)}function Eh(n){return arguments.length?this.property("__data__",n):this.node().__data__}function Lh(n){return function(t){n.call(this,t,this.__data__)}}function Ph(n){return n.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");return r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),{type:t,name:e}})}function zh(n){return function(){var t=this.__on;if(t){for(var e=0,r=-1,i=t.length,s;e<i;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++r]=s;++r?t.length=r:delete this.__on}}}function Rh(n,t,e){return function(){var r=this.__on,i,s=Lh(t);if(r){for(var a=0,o=r.length;a<o;++a)if((i=r[a]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=e),i.value=t;return}}this.addEventListener(n.type,s,e),i={type:n.type,name:n.name,value:t,listener:s,options:e},r?r.push(i):this.__on=[i]}}function Oh(n,t,e){var r=Ph(n+""),i,s=r.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,u;c<l;++c)for(i=0,u=o[c];i<s;++i)if((a=r[i]).type===u.type&&a.name===u.name)return u.value}return}for(o=t?Rh:zh,i=0;i<s;++i)this.each(o(r[i],t,e));return this}function Ks(n,t,e){var r=Ys(n),i=r.CustomEvent;typeof i=="function"?i=new i(t,e):(i=r.document.createEvent("Event"),e?(i.initEvent(t,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(t,!1,!1)),n.dispatchEvent(i)}function Nh(n,t){return function(){return Ks(this,n,t)}}function Dh(n,t){return function(){return Ks(this,n,t.apply(this,arguments))}}function Fh(n,t){return this.each((typeof t=="function"?Dh:Nh)(n,t))}function*Ih(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var r=n[t],i=0,s=r.length,a;i<s;++i)(a=r[i])&&(yield a)}var Zs=[null];function xt(n,t){this._groups=n,this._parents=t}function en(){return new xt([[document.documentElement]],Zs)}function qh(){return this}xt.prototype=en.prototype={constructor:xt,select:fu,selectAll:mu,selectChild:xu,selectChildren:Au,filter:$u,data:Lu,enter:Cu,exit:zu,join:Ru,merge:Ou,selection:qh,order:Nu,sort:Du,call:Iu,nodes:qu,node:Bu,size:Hu,empty:Vu,each:Xu,attr:Zu,style:eh,property:sh,classed:ch,text:dh,html:_h,raise:yh,lower:bh,append:wh,insert:Ah,remove:Ch,clone:Mh,datum:Eh,on:Oh,dispatch:Fh,[Symbol.iterator]:Ih};function nt(n){return typeof n=="string"?new xt([[document.querySelector(n)]],[document.documentElement]):new xt([[n]],Zs)}function Bh(n){let t;for(;t=n.sourceEvent;)n=t;return n}function Zr(n,t){if(n=Bh(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}}return[n.pageX,n.pageY]}const Hh={passive:!1},nn={capture:!0,passive:!1};function Qr(n){n.stopImmediatePropagation()}function Pe(n){n.preventDefault(),n.stopImmediatePropagation()}function Vh(n){var t=n.document.documentElement,e=nt(n).on("dragstart.drag",Pe,nn);"onselectstart"in t?e.on("selectstart.drag",Pe,nn):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function Xh(n,t){var e=n.document.documentElement,r=nt(n).on("dragstart.drag",null);t&&(r.on("click.drag",Pe,nn),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}const Gn=n=>()=>n;function Jr(n,{sourceEvent:t,subject:e,target:r,identifier:i,active:s,x:a,y:o,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:e,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}Jr.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};function Yh(n){return!n.ctrlKey&&!n.button}function Gh(){return this.parentNode}function jh(n,t){return t??{x:n.x,y:n.y}}function Wh(){return navigator.maxTouchPoints||"ontouchstart"in this}function Uh(){var n=Yh,t=Gh,e=jh,r=Wh,i={},s=jr("start","drag","end"),a=0,o,c,l,u,h=0;function f(m){m.on("mousedown.drag",d).filter(r).on("touchstart.drag",_).on("touchmove.drag",y,Hh).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(m,w){if(!(u||!n.call(this,m,w))){var C=v(this,t.call(this,m,w),m,w,"mouse");C&&(nt(m.view).on("mousemove.drag",g,nn).on("mouseup.drag",p,nn),Vh(m.view),Qr(m),l=!1,o=m.clientX,c=m.clientY,C("start",m))}}function g(m){if(Pe(m),!l){var w=m.clientX-o,C=m.clientY-c;l=w*w+C*C>h}i.mouse("drag",m)}function p(m){nt(m.view).on("mousemove.drag mouseup.drag",null),Xh(m.view,l),Pe(m),i.mouse("end",m)}function _(m,w){if(n.call(this,m,w)){var C=m.changedTouches,k=t.call(this,m,w),$=C.length,x,S;for(x=0;x<$;++x)(S=v(this,k,m,w,C[x].identifier,C[x]))&&(Qr(m),S("start",m,C[x]))}}function y(m){var w=m.changedTouches,C=w.length,k,$;for(k=0;k<C;++k)($=i[w[k].identifier])&&(Pe(m),$("drag",m,w[k]))}function b(m){var w=m.changedTouches,C=w.length,k,$;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),k=0;k<C;++k)($=i[w[k].identifier])&&(Qr(m),$("end",m,w[k]))}function v(m,w,C,k,$,x){var S=s.copy(),M=Zr(x||C,w),T,E,z;if((z=e.call(m,new Jr("beforestart",{sourceEvent:C,target:f,identifier:$,active:a,x:M[0],y:M[1],dx:0,dy:0,dispatch:S}),k))!=null)return T=z.x-M[0]||0,E=z.y-M[1]||0,function A(L,P,O){var R=M,N;switch(L){case"start":i[$]=A,N=a++;break;case"end":delete i[$],--a;case"drag":M=Zr(O||P,w),N=a;break}S.call(L,m,new Jr(L,{sourceEvent:P,subject:z,target:f,identifier:$,active:N,x:M[0]+T,y:M[1]+E,dx:M[0]-R[0],dy:M[1]-R[1],dispatch:S}),k)}}return f.filter=function(m){return arguments.length?(n=typeof m=="function"?m:Gn(!!m),f):n},f.container=function(m){return arguments.length?(t=typeof m=="function"?m:Gn(m),f):t},f.subject=function(m){return arguments.length?(e=typeof m=="function"?m:Gn(m),f):e},f.touchable=function(m){return arguments.length?(r=typeof m=="function"?m:Gn(!!m),f):r},f.on=function(){var m=s.on.apply(s,arguments);return m===s?f:m},f.clickDistance=function(m){return arguments.length?(h=(m=+m)*m,f):Math.sqrt(h)},f}function ti(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function Qs(n,t){var e=Object.create(n.prototype);for(var r in t)e[r]=t[r];return e}function rn(){}var sn=.7,jn=1/sn,ze="\\s*([+-]?\\d+)\\s*",an="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Nt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Kh=/^#([0-9a-f]{3,8})$/,Zh=new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`),Qh=new RegExp(`^rgb\\(${Nt},${Nt},${Nt}\\)$`),Jh=new RegExp(`^rgba\\(${ze},${ze},${ze},${an}\\)$`),tf=new RegExp(`^rgba\\(${Nt},${Nt},${Nt},${an}\\)$`),ef=new RegExp(`^hsl\\(${an},${Nt},${Nt}\\)$`),nf=new RegExp(`^hsla\\(${an},${Nt},${Nt},${an}\\)$`),Js={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ti(rn,Yt,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:ta,formatHex:ta,formatHex8:rf,formatHsl:sf,formatRgb:ea,toString:ea});function ta(){return this.rgb().formatHex()}function rf(){return this.rgb().formatHex8()}function sf(){return aa(this).formatHsl()}function ea(){return this.rgb().formatRgb()}function Yt(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=Kh.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?na(t):e===3?new ft(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Wn(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Wn(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Zh.exec(n))?new ft(t[1],t[2],t[3],1):(t=Qh.exec(n))?new ft(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Jh.exec(n))?Wn(t[1],t[2],t[3],t[4]):(t=tf.exec(n))?Wn(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=ef.exec(n))?sa(t[1],t[2]/100,t[3]/100,1):(t=nf.exec(n))?sa(t[1],t[2]/100,t[3]/100,t[4]):Js.hasOwnProperty(n)?na(Js[n]):n==="transparent"?new ft(NaN,NaN,NaN,0):null}function na(n){return new ft(n>>16&255,n>>8&255,n&255,1)}function Wn(n,t,e,r){return r<=0&&(n=t=e=NaN),new ft(n,t,e,r)}function af(n){return n instanceof rn||(n=Yt(n)),n?(n=n.rgb(),new ft(n.r,n.g,n.b,n.opacity)):new ft}function Un(n,t,e,r){return arguments.length===1?af(n):new ft(n,t,e,r??1)}function ft(n,t,e,r){this.r=+n,this.g=+t,this.b=+e,this.opacity=+r}ti(ft,Un,Qs(rn,{brighter(n){return n=n==null?jn:Math.pow(jn,n),new ft(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?sn:Math.pow(sn,n),new ft(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new ft(fe(this.r),fe(this.g),fe(this.b),Kn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ra,formatHex:ra,formatHex8:of,formatRgb:ia,toString:ia}));function ra(){return`#${de(this.r)}${de(this.g)}${de(this.b)}`}function of(){return`#${de(this.r)}${de(this.g)}${de(this.b)}${de((isNaN(this.opacity)?1:this.opacity)*255)}`}function ia(){const n=Kn(this.opacity);return`${n===1?"rgb(":"rgba("}${fe(this.r)}, ${fe(this.g)}, ${fe(this.b)}${n===1?")":`, ${n})`}`}function Kn(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function fe(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function de(n){return n=fe(n),(n<16?"0":"")+n.toString(16)}function sa(n,t,e,r){return r<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new Pt(n,t,e,r)}function aa(n){if(n instanceof Pt)return new Pt(n.h,n.s,n.l,n.opacity);if(n instanceof rn||(n=Yt(n)),!n)return new Pt;if(n instanceof Pt)return n;n=n.rgb();var t=n.r/255,e=n.g/255,r=n.b/255,i=Math.min(t,e,r),s=Math.max(t,e,r),a=NaN,o=s-i,c=(s+i)/2;return o?(t===s?a=(e-r)/o+(e<r)*6:e===s?a=(r-t)/o+2:a=(t-e)/o+4,o/=c<.5?s+i:2-s-i,a*=60):o=c>0&&c<1?0:a,new Pt(a,o,c,n.opacity)}function lf(n,t,e,r){return arguments.length===1?aa(n):new Pt(n,t,e,r??1)}function Pt(n,t,e,r){this.h=+n,this.s=+t,this.l=+e,this.opacity=+r}ti(Pt,lf,Qs(rn,{brighter(n){return n=n==null?jn:Math.pow(jn,n),new Pt(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?sn:Math.pow(sn,n),new Pt(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*t,i=2*e-r;return new ft(ei(n>=240?n-240:n+120,i,r),ei(n,i,r),ei(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new Pt(oa(this.h),Zn(this.s),Zn(this.l),Kn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Kn(this.opacity);return`${n===1?"hsl(":"hsla("}${oa(this.h)}, ${Zn(this.s)*100}%, ${Zn(this.l)*100}%${n===1?")":`, ${n})`}`}}));function oa(n){return n=(n||0)%360,n<0?n+360:n}function Zn(n){return Math.max(0,Math.min(1,n||0))}function ei(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}function cf(n,t,e,r,i){var s=n*n,a=s*n;return((1-3*n+3*s-a)*t+(4-6*s+3*a)*e+(1+3*n+3*s-3*a)*r+a*i)/6}function uf(n){var t=n.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,t-1):Math.floor(e*t),i=n[r],s=n[r+1],a=r>0?n[r-1]:2*i-s,o=r<t-1?n[r+2]:2*s-i;return cf((e-r/t)*t,a,i,s,o)}}const ni=n=>()=>n;function hf(n,t){return function(e){return n+e*t}}function ff(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(r){return Math.pow(n+r*t,e)}}function df(n){return(n=+n)==1?la:function(t,e){return e-t?ff(t,e,n):ni(isNaN(t)?e:t)}}function la(n,t){var e=t-n;return e?hf(n,e):ni(isNaN(n)?t:n)}const Qn=(function n(t){var e=df(t);function r(i,s){var a=e((i=Un(i)).r,(s=Un(s)).r),o=e(i.g,s.g),c=e(i.b,s.b),l=la(i.opacity,s.opacity);return function(u){return i.r=a(u),i.g=o(u),i.b=c(u),i.opacity=l(u),i+""}}return r.gamma=n,r})(1);function pf(n){return function(t){var e=t.length,r=new Array(e),i=new Array(e),s=new Array(e),a,o;for(a=0;a<e;++a)o=Un(t[a]),r[a]=o.r||0,i[a]=o.g||0,s[a]=o.b||0;return r=n(r),i=n(i),s=n(s),o.opacity=1,function(c){return o.r=r(c),o.g=i(c),o.b=s(c),o+""}}}var gf=pf(uf);function mf(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(s){for(i=0;i<e;++i)r[i]=n[i]*(1-s)+t[i]*s;return r}}function _f(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function vf(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),s=new Array(e),a;for(a=0;a<r;++a)i[a]=pe(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<r;++a)s[a]=i[a](o);return s}}function yf(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function zt(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function xf(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=pe(n[i],t[i]):r[i]=t[i];return function(s){for(i in e)r[i]=e[i](s);return r}}var ri=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ii=new RegExp(ri.source,"g");function bf(n){return function(){return n}}function wf(n){return function(t){return n(t)+""}}function ca(n,t){var e=ri.lastIndex=ii.lastIndex=0,r,i,s,a=-1,o=[],c=[];for(n=n+"",t=t+"";(r=ri.exec(n))&&(i=ii.exec(t));)(s=i.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(r=r[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,c.push({i:a,x:zt(r,i)})),e=ii.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?wf(c[0].x):bf(t):(t=c.length,function(l){for(var u=0,h;u<t;++u)o[(h=c[u]).i]=h.x(l);return o.join("")})}function pe(n,t){var e=typeof t,r;return t==null||e==="boolean"?ni(t):(e==="number"?zt:e==="string"?(r=Yt(t))?(t=r,Qn):ca:t instanceof Yt?Qn:t instanceof Date?yf:_f(t)?mf:Array.isArray(t)?vf:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?xf:zt)(n,t)}function si(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var ua=180/Math.PI,ai={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function ha(n,t,e,r,i,s){var a,o,c;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(c=n*e+t*r)&&(e-=n*c,r-=t*c),(o=Math.sqrt(e*e+r*r))&&(e/=o,r/=o,c/=o),n*r<t*e&&(n=-n,t=-t,c=-c,a=-a),{translateX:i,translateY:s,rotate:Math.atan2(t,n)*ua,skewX:Math.atan(c)*ua,scaleX:a,scaleY:o}}var Jn;function kf(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?ai:ha(t.a,t.b,t.c,t.d,t.e,t.f)}function Af(n){return n==null||(Jn||(Jn=document.createElementNS("http://www.w3.org/2000/svg","g")),Jn.setAttribute("transform",n),!(n=Jn.transform.baseVal.consolidate()))?ai:(n=n.matrix,ha(n.a,n.b,n.c,n.d,n.e,n.f))}function fa(n,t,e,r){function i(l){return l.length?l.pop()+" ":""}function s(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push("translate(",null,t,null,e);g.push({i:p-4,x:zt(l,h)},{i:p-2,x:zt(u,f)})}else(h||f)&&d.push("translate("+h+t+f+e)}function a(l,u,h,f){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),f.push({i:h.push(i(h)+"rotate(",null,r)-2,x:zt(l,u)})):u&&h.push(i(h)+"rotate("+u+r)}function o(l,u,h,f){l!==u?f.push({i:h.push(i(h)+"skewX(",null,r)-2,x:zt(l,u)}):u&&h.push(i(h)+"skewX("+u+r)}function c(l,u,h,f,d,g){if(l!==h||u!==f){var p=d.push(i(d)+"scale(",null,",",null,")");g.push({i:p-4,x:zt(l,h)},{i:p-2,x:zt(u,f)})}else(h!==1||f!==1)&&d.push(i(d)+"scale("+h+","+f+")")}return function(l,u){var h=[],f=[];return l=n(l),u=n(u),s(l.translateX,l.translateY,u.translateX,u.translateY,h,f),a(l.rotate,u.rotate,h,f),o(l.skewX,u.skewX,h,f),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,h,f),l=u=null,function(d){for(var g=-1,p=f.length,_;++g<p;)h[(_=f[g]).i]=_.x(d);return h.join("")}}}var $f=fa(kf,"px, ","px)","deg)"),Cf=fa(Af,", ",")",")");function Sf(n,t){t===void 0&&(t=n,n=pe);for(var e=0,r=t.length-1,i=t[0],s=new Array(r<0?0:r);e<r;)s[e]=n(i,i=t[++e]);return function(a){var o=Math.max(0,Math.min(r-1,Math.floor(a*=r)));return s[o](a-o)}}var Re=0,on=0,ln=0,da=1e3,tr,cn,er=0,ge=0,nr=0,un=typeof performance=="object"&&performance.now?performance:Date,pa=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function oi(){return ge||(pa(Tf),ge=un.now()+nr)}function Tf(){ge=0}function rr(){this._call=this._time=this._next=null}rr.prototype=ga.prototype={constructor:rr,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?oi():+e)+(t==null?0:+t),!this._next&&cn!==this&&(cn?cn._next=this:tr=this,cn=this),this._call=n,this._time=e,li()},stop:function(){this._call&&(this._call=null,this._time=1/0,li())}};function ga(n,t,e){var r=new rr;return r.restart(n,t,e),r}function Mf(){oi(),++Re;for(var n=tr,t;n;)(t=ge-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Re}function ma(){ge=(er=un.now())+nr,Re=on=0;try{Mf()}finally{Re=0,Lf(),ge=0}}function Ef(){var n=un.now(),t=n-er;t>da&&(nr-=t,er=n)}function Lf(){for(var n,t=tr,e,r=1/0;t;)t._call?(r>t._time&&(r=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:tr=e);cn=n,li(r)}function li(n){if(!Re){on&&(on=clearTimeout(on));var t=n-ge;t>24?(n<1/0&&(on=setTimeout(ma,n-un.now()-nr)),ln&&(ln=clearInterval(ln))):(ln||(er=un.now(),ln=setInterval(Ef,da)),Re=1,pa(ma))}}function _a(n,t,e){var r=new rr;return t=t==null?0:+t,r.restart(i=>{r.stop(),n(i+t)},t,e),r}var Pf=jr("start","end","cancel","interrupt"),zf=[],va=0,ya=1,ci=2,ir=3,xa=4,ui=5,sr=6;function ar(n,t,e,r,i,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;Rf(n,e,{name:t,index:r,group:i,on:Pf,tween:zf,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:va})}function hi(n,t){var e=Rt(n,t);if(e.state>va)throw new Error("too late; already scheduled");return e}function Dt(n,t){var e=Rt(n,t);if(e.state>ir)throw new Error("too late; already running");return e}function Rt(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function Rf(n,t,e){var r=n.__transition,i;r[t]=e,e.timer=ga(s,0,e.time);function s(l){e.state=ya,e.timer.restart(a,e.delay,e.time),e.delay<=l&&a(l-e.delay)}function a(l){var u,h,f,d;if(e.state!==ya)return c();for(u in r)if(d=r[u],d.name===e.name){if(d.state===ir)return _a(a);d.state===xa?(d.state=sr,d.timer.stop(),d.on.call("interrupt",n,n.__data__,d.index,d.group),delete r[u]):+u<t&&(d.state=sr,d.timer.stop(),d.on.call("cancel",n,n.__data__,d.index,d.group),delete r[u])}if(_a(function(){e.state===ir&&(e.state=xa,e.timer.restart(o,e.delay,e.time),o(l))}),e.state=ci,e.on.call("start",n,n.__data__,e.index,e.group),e.state===ci){for(e.state=ir,i=new Array(f=e.tween.length),u=0,h=-1;u<f;++u)(d=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(i[++h]=d);i.length=h+1}}function o(l){for(var u=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(c),e.state=ui,1),h=-1,f=i.length;++h<f;)i[h].call(n,u);e.state===ui&&(e.on.call("end",n,n.__data__,e.index,e.group),c())}function c(){e.state=sr,e.timer.stop(),delete r[t];for(var l in r)return;delete n.__transition}}function Of(n,t){var e=n.__transition,r,i,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((r=e[a]).name!==t){s=!1;continue}i=r.state>ci&&r.state<ui,r.state=sr,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete e[a]}s&&delete n.__transition}}function Nf(n){return this.each(function(){Of(this,n)})}function Df(n,t){var e,r;return function(){var i=Dt(this,n),s=i.tween;if(s!==e){r=e=s;for(var a=0,o=r.length;a<o;++a)if(r[a].name===t){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function Ff(n,t,e){var r,i;if(typeof e!="function")throw new Error;return function(){var s=Dt(this,n),a=s.tween;if(a!==r){i=(r=a).slice();for(var o={name:t,value:e},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=o;break}c===l&&i.push(o)}s.tween=i}}function If(n,t){var e=this._id;if(n+="",arguments.length<2){for(var r=Rt(this.node(),e).tween,i=0,s=r.length,a;i<s;++i)if((a=r[i]).name===n)return a.value;return null}return this.each((t==null?Df:Ff)(e,n,t))}function fi(n,t,e){var r=n._id;return n.each(function(){var i=Dt(this,r);(i.value||(i.value={}))[t]=e.apply(this,arguments)}),function(i){return Rt(i,r).value[t]}}function ba(n,t){var e;return(typeof t=="number"?zt:t instanceof Yt?Qn:(e=Yt(t))?(t=e,Qn):ca)(n,t)}function qf(n){return function(){this.removeAttribute(n)}}function Bf(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Hf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttribute(n);return a===i?null:a===r?s:s=t(r=a,e)}}function Vf(n,t,e){var r,i=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===i?null:a===r?s:s=t(r=a,e)}}function Xf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function Yf(n,t,e){var r,i,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),c=o+"",a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o)))}}function Gf(n,t){var e=Xn(n),r=e==="transform"?Cf:ba;return this.attrTween(n,typeof t=="function"?(e.local?Yf:Xf)(e,r,fi(this,"attr."+n,t)):t==null?(e.local?Bf:qf)(e):(e.local?Vf:Hf)(e,r,t))}function jf(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function Wf(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function Uf(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&Wf(n,s)),e}return i._value=t,i}function Kf(n,t){var e,r;function i(){var s=t.apply(this,arguments);return s!==r&&(e=(r=s)&&jf(n,s)),e}return i._value=t,i}function Zf(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var r=Xn(n);return this.tween(e,(r.local?Uf:Kf)(r,t))}function Qf(n,t){return function(){hi(this,n).delay=+t.apply(this,arguments)}}function Jf(n,t){return t=+t,function(){hi(this,n).delay=t}}function td(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?Qf:Jf)(t,n)):Rt(this.node(),t).delay}function ed(n,t){return function(){Dt(this,n).duration=+t.apply(this,arguments)}}function nd(n,t){return t=+t,function(){Dt(this,n).duration=t}}function rd(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?ed:nd)(t,n)):Rt(this.node(),t).duration}function id(n,t){if(typeof t!="function")throw new Error;return function(){Dt(this,n).ease=t}}function sd(n){var t=this._id;return arguments.length?this.each(id(t,n)):Rt(this.node(),t).ease}function ad(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;Dt(this,n).ease=e}}function od(n){if(typeof n!="function")throw new Error;return this.each(ad(this._id,n))}function ld(n){typeof n!="function"&&(n=Hs(n));for(var t=this._groups,e=t.length,r=new Array(e),i=0;i<e;++i)for(var s=t[i],a=s.length,o=r[i]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Gt(r,this._parents,this._name,this._id)}function cd(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,r=t.length,i=e.length,s=Math.min(r,i),a=new Array(r),o=0;o<s;++o)for(var c=t[o],l=e[o],u=c.length,h=a[o]=new Array(u),f,d=0;d<u;++d)(f=c[d]||l[d])&&(h[d]=f);for(;o<r;++o)a[o]=t[o];return new Gt(a,this._parents,this._name,this._id)}function ud(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function hd(n,t,e){var r,i,s=ud(t)?hi:Dt;return function(){var a=s(this,n),o=a.on;o!==r&&(i=(r=o).copy()).on(t,e),a.on=i}}function fd(n,t){var e=this._id;return arguments.length<2?Rt(this.node(),e).on.on(n):this.each(hd(e,n,t))}function dd(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function pd(){return this.on("end.remove",dd(this._id))}function gd(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Ur(n));for(var r=this._groups,i=r.length,s=new Array(i),a=0;a<i;++a)for(var o=r[a],c=o.length,l=s[a]=new Array(c),u,h,f=0;f<c;++f)(u=o[f])&&(h=n.call(u,u.__data__,f,o))&&("__data__"in u&&(h.__data__=u.__data__),l[f]=h,ar(l[f],t,e,f,l,Rt(u,e)));return new Gt(s,this._parents,t,e)}function md(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Bs(n));for(var r=this._groups,i=r.length,s=[],a=[],o=0;o<i;++o)for(var c=r[o],l=c.length,u,h=0;h<l;++h)if(u=c[h]){for(var f=n.call(u,u.__data__,h,c),d,g=Rt(u,e),p=0,_=f.length;p<_;++p)(d=f[p])&&ar(d,t,e,p,f,g);s.push(f),a.push(u)}return new Gt(s,a,t,e)}var _d=en.prototype.constructor;function vd(){return new _d(this._groups,this._parents)}function yd(n,t){var e,r,i;return function(){var s=Le(this,n),a=(this.style.removeProperty(n),Le(this,n));return s===a?null:s===e&&a===r?i:i=t(e=s,r=a)}}function wa(n){return function(){this.style.removeProperty(n)}}function xd(n,t,e){var r,i=e+"",s;return function(){var a=Le(this,n);return a===i?null:a===r?s:s=t(r=a,e)}}function bd(n,t,e){var r,i,s;return function(){var a=Le(this,n),o=e(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(n),Le(this,n))),a===c?null:a===r&&c===i?s:(i=c,s=t(r=a,o))}}function wd(n,t){var e,r,i,s="style."+t,a="end."+s,o;return function(){var c=Dt(this,n),l=c.on,u=c.value[s]==null?o||(o=wa(t)):void 0;(l!==e||i!==u)&&(r=(e=l).copy()).on(a,i=u),c.on=r}}function kd(n,t,e){var r=(n+="")=="transform"?$f:ba;return t==null?this.styleTween(n,yd(n,r)).on("end.style."+n,wa(n)):typeof t=="function"?this.styleTween(n,bd(n,r,fi(this,"style."+n,t))).each(wd(this._id,n)):this.styleTween(n,xd(n,r,t),e).on("end.style."+n,null)}function Ad(n,t,e){return function(r){this.style.setProperty(n,t.call(this,r),e)}}function $d(n,t,e){var r,i;function s(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Ad(n,a,e)),r}return s._value=t,s}function Cd(n,t,e){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,$d(n,t,e??""))}function Sd(n){return function(){this.textContent=n}}function Td(n){return function(){var t=n(this);this.textContent=t??""}}function Md(n){return this.tween("text",typeof n=="function"?Td(fi(this,"text",n)):Sd(n==null?"":n+""))}function Ed(n){return function(t){this.textContent=n.call(this,t)}}function Ld(n){var t,e;function r(){var i=n.apply(this,arguments);return i!==e&&(t=(e=i)&&Ed(i)),t}return r._value=n,r}function Pd(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,Ld(n))}function zd(){for(var n=this._name,t=this._id,e=ka(),r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var u=Rt(c,t);ar(c,n,e,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Gt(r,this._parents,n,e)}function Rd(){var n,t,e=this,r=e._id,i=e.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--i===0&&s()}};e.each(function(){var l=Dt(this,r),u=l.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(c)),l.on=t}),i===0&&s()})}var Od=0;function Gt(n,t,e,r){this._groups=n,this._parents=t,this._name=e,this._id=r}function ka(){return++Od}var jt=en.prototype;Gt.prototype={constructor:Gt,select:gd,selectAll:md,selectChild:jt.selectChild,selectChildren:jt.selectChildren,filter:ld,merge:cd,selection:vd,transition:zd,call:jt.call,nodes:jt.nodes,node:jt.node,size:jt.size,empty:jt.empty,each:jt.each,on:fd,attr:Gf,attrTween:Zf,style:kd,styleTween:Cd,text:Md,textTween:Pd,remove:pd,tween:If,delay:td,duration:rd,ease:sd,easeVarying:od,end:Rd,[Symbol.iterator]:jt[Symbol.iterator]};function hn(n){return n*(2-n)}function Nd(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var di=1.70158;(function n(t){t=+t;function e(r){return(r=+r)*r*(t*(r-1)+r)}return e.overshoot=n,e})(di);var Dd=(function n(t){t=+t;function e(r){return--r*r*((r+1)*t+r)+1}return e.overshoot=n,e})(di);(function n(t){t=+t;function e(r){return((r*=2)<1?r*r*((t+1)*r-t):(r-=2)*r*((t+1)*r+t)+2)/2}return e.overshoot=n,e})(di);var Fd={time:null,delay:0,duration:250,ease:Nd};function Id(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function qd(n){var t,e;n instanceof Gt?(t=n._id,n=n._name):(t=ka(),(e=Fd).time=oi(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var a=r[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&ar(c,n,t,l,a,e||Id(c,t));return new Gt(r,this._parents,n,t)}en.prototype.interrupt=Nf,en.prototype.transition=qd;const pi=Math.PI,gi=2*pi,me=1e-6,Bd=gi-me;function Aa(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function Hd(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return Aa;const e=10**t;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}let Vd=class{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Aa:Hd(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,s,a){this._append`C${+t},${+e},${+r},${+i},${this._x1=+s},${this._y1=+a}`}arcTo(t,e,r,i,s){if(t=+t,e=+e,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,c=r-t,l=i-e,u=a-t,h=o-e,f=u*u+h*h;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(f>me)if(!(Math.abs(h*c-l*u)>me)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let d=r-a,g=i-o,p=c*c+l*l,_=d*d+g*g,y=Math.sqrt(p),b=Math.sqrt(f),v=s*Math.tan((pi-Math.acos((p+f-_)/(2*y*b)))/2),m=v/b,w=v/y;Math.abs(m-1)>me&&this._append`L${t+m*u},${e+m*h}`,this._append`A${s},${s},0,0,${+(h*d>u*g)},${this._x1=t+w*c},${this._y1=e+w*l}`}}arc(t,e,r,i,s,a){if(t=+t,e=+e,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let o=r*Math.cos(i),c=r*Math.sin(i),l=t+o,u=e+c,h=1^a,f=a?i-s:s-i;this._x1===null?this._append`M${l},${u}`:(Math.abs(this._x1-l)>me||Math.abs(this._y1-u)>me)&&this._append`L${l},${u}`,r&&(f<0&&(f=f%gi+gi),f>Bd?this._append`A${r},${r},0,1,${h},${t-o},${e-c}A${r},${r},0,1,${h},${this._x1=l},${this._y1=u}`:f>me&&this._append`A${r},${r},0,${+(f>=pi)},${h},${this._x1=t+r*Math.cos(s)},${this._y1=e+r*Math.sin(s)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}};function Xd(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function or(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function Oe(n){return n=or(Math.abs(n)),n?n[1]:NaN}function Yd(n,t){return function(e,r){for(var i=e.length,s=[],a=0,o=n[0],c=0;i>0&&o>0&&(c+o+1>r&&(o=Math.max(1,r-c)),s.push(e.substring(i-=o,i+o)),!((c+=o+1)>r));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function Gd(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var jd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function lr(n){if(!(t=jd.exec(n)))throw new Error("invalid format: "+n);var t;return new mi({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}lr.prototype=mi.prototype;function mi(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}mi.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Wd(n){t:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break t;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var cr;function Ud(n,t){var e=or(n,t);if(!e)return cr=void 0,n.toPrecision(t);var r=e[0],i=e[1],s=i-(cr=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return s===a?r:s>a?r+new Array(s-a+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+or(n,Math.max(0,t+s-1))[0]}function $a(n,t){var e=or(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const Ca={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:Xd,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>$a(n*100,t),r:$a,s:Ud,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Sa(n){return n}var Ta=Array.prototype.map,Ma=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Kd(n){var t=n.grouping===void 0||n.thousands===void 0?Sa:Yd(Ta.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Sa:Gd(Ta.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(h,f){h=lr(h);var d=h.fill,g=h.align,p=h.sign,_=h.symbol,y=h.zero,b=h.width,v=h.comma,m=h.precision,w=h.trim,C=h.type;C==="n"?(v=!0,C="g"):Ca[C]||(m===void 0&&(m=12),w=!0,C="g"),(y||d==="0"&&g==="=")&&(y=!0,d="0",g="=");var k=(f&&f.prefix!==void 0?f.prefix:"")+(_==="$"?e:_==="#"&&/[boxX]/.test(C)?"0"+C.toLowerCase():""),$=(_==="$"?r:/[%p]/.test(C)?a:"")+(f&&f.suffix!==void 0?f.suffix:""),x=Ca[C],S=/[defgprs%]/.test(C);m=m===void 0?6:/[gprs]/.test(C)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m));function M(T){var E=k,z=$,A,L,P;if(C==="c")z=x(T)+z,T="";else{T=+T;var O=T<0||1/T<0;if(T=isNaN(T)?c:x(Math.abs(T),m),w&&(T=Wd(T)),O&&+T==0&&p!=="+"&&(O=!1),E=(O?p==="("?p:o:p==="-"||p==="("?"":p)+E,z=(C==="s"&&!isNaN(T)&&cr!==void 0?Ma[8+cr/3]:"")+z+(O&&p==="("?")":""),S){for(A=-1,L=T.length;++A<L;)if(P=T.charCodeAt(A),48>P||P>57){z=(P===46?i+T.slice(A+1):T.slice(A))+z,T=T.slice(0,A);break}}}v&&!y&&(T=t(T,1/0));var R=E.length+T.length+z.length,N=R<b?new Array(b-R+1).join(d):"";switch(v&&y&&(T=t(N+T,N.length?b-z.length:1/0),N=""),g){case"<":T=E+T+z+N;break;case"=":T=E+N+T+z;break;case"^":T=N.slice(0,R=N.length>>1)+E+T+z+N.slice(R);break;default:T=N+E+T+z;break}return s(T)}return M.toString=function(){return h+""},M}function u(h,f){var d=Math.max(-8,Math.min(8,Math.floor(Oe(f)/3)))*3,g=Math.pow(10,-d),p=l((h=lr(h),h.type="f",h),{suffix:Ma[8+d/3]});return function(_){return p(g*_)}}return{format:l,formatPrefix:u}}var ur,Ea,La;Zd({thousands:",",grouping:[3],currency:["$",""]});function Zd(n){return ur=Kd(n),Ea=ur.format,La=ur.formatPrefix,ur}function Qd(n){return Math.max(0,-Oe(Math.abs(n)))}function Jd(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Oe(t)/3)))*3-Oe(Math.abs(n)))}function tp(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Oe(t)-Oe(n))+1}function ep(n){var t=0,e=n.children,r=e&&e.length;if(!r)t=1;else for(;--r>=0;)t+=e[r].value;n.value=t}function np(){return this.eachAfter(ep)}function rp(n,t){let e=-1;for(const r of this)n.call(t,r,++e,this);return this}function ip(n,t){for(var e=this,r=[e],i,s,a=-1;e=r.pop();)if(n.call(t,e,++a,this),i=e.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function sp(n,t){for(var e=this,r=[e],i=[],s,a,o,c=-1;e=r.pop();)if(i.push(e),s=e.children)for(a=0,o=s.length;a<o;++a)r.push(s[a]);for(;e=i.pop();)n.call(t,e,++c,this);return this}function ap(n,t){let e=-1;for(const r of this)if(n.call(t,r,++e,this))return r}function op(n){return this.eachAfter(function(t){for(var e=+n(t.data)||0,r=t.children,i=r&&r.length;--i>=0;)e+=r[i].value;t.value=e})}function lp(n){return this.eachBefore(function(t){t.children&&t.children.sort(n)})}function cp(n){for(var t=this,e=up(t,n),r=[t];t!==e;)t=t.parent,r.push(t);for(var i=r.length;n!==e;)r.splice(i,0,n),n=n.parent;return r}function up(n,t){if(n===t)return n;var e=n.ancestors(),r=t.ancestors(),i=null;for(n=e.pop(),t=r.pop();n===t;)i=n,n=e.pop(),t=r.pop();return i}function hp(){for(var n=this,t=[n];n=n.parent;)t.push(n);return t}function fp(){return Array.from(this)}function dp(){var n=[];return this.eachBefore(function(t){t.children||n.push(t)}),n}function pp(){var n=this,t=[];return n.each(function(e){e!==n&&t.push({source:e.parent,target:e})}),t}function*gp(){var n=this,t,e=[n],r,i,s;do for(t=e.reverse(),e=[];n=t.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)e.push(r[i]);while(e.length)}function hr(n,t){n instanceof Map?(n=[void 0,n],t===void 0&&(t=vp)):t===void 0&&(t=_p);for(var e=new fn(n),r,i=[e],s,a,o,c;r=i.pop();)if((a=t(r.data))&&(c=(a=Array.from(a)).length))for(r.children=a,o=c-1;o>=0;--o)i.push(s=a[o]=new fn(a[o])),s.parent=r,s.depth=r.depth+1;return e.eachBefore(xp)}function mp(){return hr(this).eachBefore(yp)}function _p(n){return n.children}function vp(n){return Array.isArray(n)?n[1]:null}function yp(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function xp(n){var t=0;do n.height=t;while((n=n.parent)&&n.height<++t)}function fn(n){this.data=n,this.depth=this.height=0,this.parent=null}fn.prototype=hr.prototype={constructor:fn,count:np,each:rp,eachAfter:sp,eachBefore:ip,find:ap,sum:op,sort:lp,path:cp,ancestors:hp,descendants:fp,leaves:dp,links:pp,copy:mp,[Symbol.iterator]:gp};function bp(n,t){return n.parent===t.parent?1:2}function _i(n){var t=n.children;return t?t[0]:n.t}function vi(n){var t=n.children;return t?t[t.length-1]:n.t}function wp(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function kp(n){for(var t=0,e=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=t,s.m+=t,t+=s.s+(e+=s.c)}function Ap(n,t,e){return n.a.parent===t.parent?n.a:e}function fr(n,t){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}fr.prototype=Object.create(fn.prototype);function $p(n){for(var t=new fr(n,0),e,r=[t],i,s,a,o;e=r.pop();)if(s=e._.children)for(e.children=new Array(o=s.length),a=o-1;a>=0;--a)r.push(i=e.children[a]=new fr(s[a],a)),i.parent=e;return(t.parent=new fr(null,0)).children=[t],t}function Cp(){var n=bp,t=1,e=1,r=null;function i(l){var u=$p(l);if(u.eachAfter(s),u.parent.m=-u.z,u.eachBefore(a),r)l.eachBefore(c);else{var h=l,f=l,d=l;l.eachBefore(function(b){b.x<h.x&&(h=b),b.x>f.x&&(f=b),b.depth>d.depth&&(d=b)});var g=h===f?1:n(h,f)/2,p=g-h.x,_=t/(f.x+g+p),y=e/(d.depth||1);l.eachBefore(function(b){b.x=(b.x+p)*_,b.y=b.depth*y})}return l}function s(l){var u=l.children,h=l.parent.children,f=l.i?h[l.i-1]:null;if(u){kp(l);var d=(u[0].z+u[u.length-1].z)/2;f?(l.z=f.z+n(l._,f._),l.m=l.z-d):l.z=d}else f&&(l.z=f.z+n(l._,f._));l.parent.A=o(l,f,l.parent.A||h[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,u,h){if(u){for(var f=l,d=l,g=u,p=f.parent.children[0],_=f.m,y=d.m,b=g.m,v=p.m,m;g=vi(g),f=_i(f),g&&f;)p=_i(p),d=vi(d),d.a=l,m=g.z+b-f.z-_+n(g._,f._),m>0&&(wp(Ap(g,l,h),l,m),_+=m,y+=m),b+=g.m,_+=f.m,v+=p.m,y+=d.m;g&&!vi(d)&&(d.t=g,d.m+=b-y),f&&!_i(p)&&(p.t=f,p.m+=_-v,h=l)}return h}function c(l){l.x*=t,l.y=l.depth*e}return i.separation=function(l){return arguments.length?(n=l,i):n},i.size=function(l){return arguments.length?(r=!1,t=+l[0],e=+l[1],i):r?null:[t,e]},i.nodeSize=function(l){return arguments.length?(r=!0,t=+l[0],e=+l[1],i):r?[t,e]:null},i}function Sp(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function Pa(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}function Tp(n){return function(){return n}}function Mp(n){return+n}var za=[0,1];function Ft(n){return n}function yi(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:Tp(isNaN(t)?NaN:.5)}function Ep(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function Lp(n,t,e){var r=n[0],i=n[1],s=t[0],a=t[1];return i<r?(r=yi(i,r),s=e(a,s)):(r=yi(r,i),s=e(s,a)),function(o){return s(r(o))}}function Pp(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),s=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)i[a]=yi(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var c=jc(n,o,1,r)-1;return s[c](i[c](o))}}function zp(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Rp(){var n=za,t=za,e=pe,r,i,s,a=Ft,o,c,l;function u(){var f=Math.min(n.length,t.length);return a!==Ft&&(a=Ep(n[0],n[f-1])),o=f>2?Pp:Lp,c=l=null,h}function h(f){return f==null||isNaN(f=+f)?s:(c||(c=o(n.map(r),t,e)))(r(a(f)))}return h.invert=function(f){return a(i((l||(l=o(t,n.map(r),zt)))(f)))},h.domain=function(f){return arguments.length?(n=Array.from(f,Mp),u()):n.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),e=si,u()},h.clamp=function(f){return arguments.length?(a=f?!0:Ft,u()):a!==Ft},h.interpolate=function(f){return arguments.length?(e=f,u()):e},h.unknown=function(f){return arguments.length?(s=f,h):s},function(f,d){return r=f,i=d,u()}}function Op(){return Rp()(Ft,Ft)}function Np(n,t,e,r){var i=Qc(n,t,e),s;switch(r=lr(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(s=Jd(i,a))&&(r.precision=s),La(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=tp(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=Qd(i))&&(r.precision=s-(r.type==="%")*2);break}}return Ea(r)}function xi(n){var t=n.domain;return n.ticks=function(e){var r=t();return Zc(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return Np(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,s=r.length-1,a=r[i],o=r[s],c,l,u=10;for(o<a&&(l=a,a=o,o=l,l=i,i=s,s=l);u-- >0;){if(l=Vr(a,o,e),l===c)return r[i]=a,r[s]=o,t(r);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function It(){var n=Op();return n.copy=function(){return zp(n,It())},Sp.apply(n,arguments),xi(n)}function Dp(){var n=0,t=1,e,r,i,s,a=Ft,o=!1,c;function l(h){return h==null||isNaN(h=+h)?c:a(i===0?.5:(h=(s(h)-e)*i,o?Math.max(0,Math.min(1,h)):h))}l.domain=function(h){return arguments.length?([n,t]=h,e=s(n=+n),r=s(t=+t),i=e===r?0:1/(r-e),l):[n,t]},l.clamp=function(h){return arguments.length?(o=!!h,l):o},l.interpolator=function(h){return arguments.length?(a=h,l):a};function u(h){return function(f){var d,g;return arguments.length?([d,g]=f,a=h(d,g),l):[a(0),a(1)]}}return l.range=u(pe),l.rangeRound=u(si),l.unknown=function(h){return arguments.length?(c=h,l):c},function(h){return s=h,e=h(n),r=h(t),i=e===r?0:1/(r-e),l}}function Ra(n,t){return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function bi(){var n=xi(Dp()(Ft));return n.copy=function(){return Ra(n,bi())},Pa.apply(n,arguments)}function Fp(){var n=0,t=.5,e=1,r=1,i,s,a,o,c,l=Ft,u,h=!1,f;function d(p){return isNaN(p=+p)?f:(p=.5+((p=+u(p))-s)*(r*p<r*s?o:c),l(h?Math.max(0,Math.min(1,p)):p))}d.domain=function(p){return arguments.length?([n,t,e]=p,i=u(n=+n),s=u(t=+t),a=u(e=+e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d):[n,t,e]},d.clamp=function(p){return arguments.length?(h=!!p,d):h},d.interpolator=function(p){return arguments.length?(l=p,d):l};function g(p){return function(_){var y,b,v;return arguments.length?([y,b,v]=_,l=Sf(p,[y,b,v]),d):[l(0),l(.5),l(1)]}}return d.range=g(pe),d.rangeRound=g(si),d.unknown=function(p){return arguments.length?(f=p,d):f},function(p){return u=p,i=p(n),s=p(t),a=p(e),o=i===s?0:.5/(s-i),c=s===a?0:.5/(a-s),r=s<i?-1:1,d}}function Oa(){var n=xi(Fp()(Ft));return n.copy=function(){return Ra(n,Oa())},Pa.apply(n,arguments)}function Na(n){for(var t=n.length/6|0,e=new Array(t),r=0;r<t;)e[r]="#"+n.slice(r*6,++r*6);return e}const Da=n=>gf(n[n.length-1]);var Ip=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Na);const qp=Da(Ip);var Bp=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Na);const Fa=Da(Bp);function B(n){return function(){return n}}const Ia=Math.abs,at=Math.atan2,_e=Math.cos,Hp=Math.max,wi=Math.min,qt=Math.sin,Ne=Math.sqrt,dt=1e-12,dn=Math.PI,dr=dn/2,pr=2*dn;function Vp(n){return n>1?0:n<-1?dn:Math.acos(n)}function qa(n){return n>=1?dr:n<=-1?-dr:Math.asin(n)}function gr(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new Vd(t)}function Xp(n){return n.innerRadius}function Yp(n){return n.outerRadius}function Gp(n){return n.startAngle}function jp(n){return n.endAngle}function Wp(n){return n&&n.padAngle}function Up(n,t,e,r,i,s,a,o){var c=e-n,l=r-t,u=a-i,h=o-s,f=h*c-u*l;if(!(f*f<dt))return f=(u*(t-s)-h*(n-i))/f,[n+f*c,t+f*l]}function mr(n,t,e,r,i,s,a){var o=n-e,c=t-r,l=(a?s:-s)/Ne(o*o+c*c),u=l*c,h=-l*o,f=n+u,d=t+h,g=e+u,p=r+h,_=(f+g)/2,y=(d+p)/2,b=g-f,v=p-d,m=b*b+v*v,w=i-s,C=f*p-g*d,k=(v<0?-1:1)*Ne(Hp(0,w*w*m-C*C)),$=(C*v-b*k)/m,x=(-C*b-v*k)/m,S=(C*v+b*k)/m,M=(-C*b+v*k)/m,T=$-_,E=x-y,z=S-_,A=M-y;return T*T+E*E>z*z+A*A&&($=S,x=M),{cx:$,cy:x,x01:-u,y01:-h,x11:$*(i/w-1),y11:x*(i/w-1)}}function Ba(){var n=Xp,t=Yp,e=B(0),r=null,i=Gp,s=jp,a=Wp,o=null,c=gr(l);function l(){var u,h,f=+n.apply(this,arguments),d=+t.apply(this,arguments),g=i.apply(this,arguments)-dr,p=s.apply(this,arguments)-dr,_=Ia(p-g),y=p>g;if(o||(o=u=c()),d<f&&(h=d,d=f,f=h),!(d>dt))o.moveTo(0,0);else if(_>pr-dt)o.moveTo(d*_e(g),d*qt(g)),o.arc(0,0,d,g,p,!y),f>dt&&(o.moveTo(f*_e(p),f*qt(p)),o.arc(0,0,f,p,g,y));else{var b=g,v=p,m=g,w=p,C=_,k=_,$=a.apply(this,arguments)/2,x=$>dt&&(r?+r.apply(this,arguments):Ne(f*f+d*d)),S=wi(Ia(d-f)/2,+e.apply(this,arguments)),M=S,T=S,E,z;if(x>dt){var A=qa(x/f*qt($)),L=qa(x/d*qt($));(C-=A*2)>dt?(A*=y?1:-1,m+=A,w-=A):(C=0,m=w=(g+p)/2),(k-=L*2)>dt?(L*=y?1:-1,b+=L,v-=L):(k=0,b=v=(g+p)/2)}var P=d*_e(b),O=d*qt(b),R=f*_e(w),N=f*qt(w);if(S>dt){var I=d*_e(v),J=d*qt(v),yt=f*_e(m),rt=f*qt(m),K;if(_<dn)if(K=Up(P,O,yt,rt,I,J,R,N)){var Me=P-K[0],Jt=O-K[1],Cs=I-K[0],Ss=J-K[1],Nl=1/qt(Vp((Me*Cs+Jt*Ss)/(Ne(Me*Me+Jt*Jt)*Ne(Cs*Cs+Ss*Ss)))/2),Dl=Ne(K[0]*K[0]+K[1]*K[1]);M=wi(S,(f-Dl)/(Nl-1)),T=wi(S,(d-Dl)/(Nl+1))}else M=T=0}k>dt?T>dt?(E=mr(yt,rt,P,O,d,T,y),z=mr(I,J,R,N,d,T,y),o.moveTo(E.cx+E.x01,E.cy+E.y01),T<S?o.arc(E.cx,E.cy,T,at(E.y01,E.x01),at(z.y01,z.x01),!y):(o.arc(E.cx,E.cy,T,at(E.y01,E.x01),at(E.y11,E.x11),!y),o.arc(0,0,d,at(E.cy+E.y11,E.cx+E.x11),at(z.cy+z.y11,z.cx+z.x11),!y),o.arc(z.cx,z.cy,T,at(z.y11,z.x11),at(z.y01,z.x01),!y))):(o.moveTo(P,O),o.arc(0,0,d,b,v,!y)):o.moveTo(P,O),!(f>dt)||!(C>dt)?o.lineTo(R,N):M>dt?(E=mr(R,N,I,J,f,-M,y),z=mr(P,O,yt,rt,f,-M,y),o.lineTo(E.cx+E.x01,E.cy+E.y01),M<S?o.arc(E.cx,E.cy,M,at(E.y01,E.x01),at(z.y01,z.x01),!y):(o.arc(E.cx,E.cy,M,at(E.y01,E.x01),at(E.y11,E.x11),!y),o.arc(0,0,f,at(E.cy+E.y11,E.cx+E.x11),at(z.cy+z.y11,z.cx+z.x11),y),o.arc(z.cx,z.cy,M,at(z.y11,z.x11),at(z.y01,z.x01),!y))):o.arc(0,0,f,w,m,y)}if(o.closePath(),u)return o=null,u+""||null}return l.centroid=function(){var u=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,h=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-dn/2;return[_e(h)*u,qt(h)*u]},l.innerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:B(+u),l):n},l.outerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:B(+u),l):t},l.cornerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:B(+u),l):e},l.padRadius=function(u){return arguments.length?(r=u==null?null:typeof u=="function"?u:B(+u),l):r},l.startAngle=function(u){return arguments.length?(i=typeof u=="function"?u:B(+u),l):i},l.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:B(+u),l):s},l.padAngle=function(u){return arguments.length?(a=typeof u=="function"?u:B(+u),l):a},l.context=function(u){return arguments.length?(o=u??null,l):o},l}var Kp=Array.prototype.slice;function ki(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Ha(n){this._context=n}Ha.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function Va(n){return new Ha(n)}function Ai(n){return n[0]}function $i(n){return n[1]}function _r(n,t){var e=B(!0),r=null,i=Va,s=null,a=gr(o);n=typeof n=="function"?n:n===void 0?Ai:B(n),t=typeof t=="function"?t:t===void 0?$i:B(t);function o(c){var l,u=(c=ki(c)).length,h,f=!1,d;for(r==null&&(s=i(d=a())),l=0;l<=u;++l)!(l<u&&e(h=c[l],l,c))===f&&((f=!f)?s.lineStart():s.lineEnd()),f&&s.point(+n(h,l,c),+t(h,l,c));if(d)return s=null,d+""||null}return o.x=function(c){return arguments.length?(n=typeof c=="function"?c:B(+c),o):n},o.y=function(c){return arguments.length?(t=typeof c=="function"?c:B(+c),o):t},o.defined=function(c){return arguments.length?(e=typeof c=="function"?c:B(!!c),o):e},o.curve=function(c){return arguments.length?(i=c,r!=null&&(s=i(r)),o):i},o.context=function(c){return arguments.length?(c==null?r=s=null:s=i(r=c),o):r},o}function Zp(n,t,e){var r=null,i=B(!0),s=null,a=Va,o=null,c=gr(l);n=typeof n=="function"?n:n===void 0?Ai:B(+n),t=typeof t=="function"?t:B(t===void 0?0:+t),e=typeof e=="function"?e:e===void 0?$i:B(+e);function l(h){var f,d,g,p=(h=ki(h)).length,_,y=!1,b,v=new Array(p),m=new Array(p);for(s==null&&(o=a(b=c())),f=0;f<=p;++f){if(!(f<p&&i(_=h[f],f,h))===y)if(y=!y)d=f,o.areaStart(),o.lineStart();else{for(o.lineEnd(),o.lineStart(),g=f-1;g>=d;--g)o.point(v[g],m[g]);o.lineEnd(),o.areaEnd()}y&&(v[f]=+n(_,f,h),m[f]=+t(_,f,h),o.point(r?+r(_,f,h):v[f],e?+e(_,f,h):m[f]))}if(b)return o=null,b+""||null}function u(){return _r().defined(i).curve(a).context(s)}return l.x=function(h){return arguments.length?(n=typeof h=="function"?h:B(+h),r=null,l):n},l.x0=function(h){return arguments.length?(n=typeof h=="function"?h:B(+h),l):n},l.x1=function(h){return arguments.length?(r=h==null?null:typeof h=="function"?h:B(+h),l):r},l.y=function(h){return arguments.length?(t=typeof h=="function"?h:B(+h),e=null,l):t},l.y0=function(h){return arguments.length?(t=typeof h=="function"?h:B(+h),l):t},l.y1=function(h){return arguments.length?(e=h==null?null:typeof h=="function"?h:B(+h),l):e},l.lineX0=l.lineY0=function(){return u().x(n).y(t)},l.lineY1=function(){return u().x(n).y(e)},l.lineX1=function(){return u().x(r).y(t)},l.defined=function(h){return arguments.length?(i=typeof h=="function"?h:B(!!h),l):i},l.curve=function(h){return arguments.length?(a=h,s!=null&&(o=a(s)),l):a},l.context=function(h){return arguments.length?(h==null?s=o=null:o=a(s=h),l):s},l}function Qp(n,t){return t<n?-1:t>n?1:t>=n?0:NaN}function Jp(n){return n}function t0(){var n=Jp,t=Qp,e=null,r=B(0),i=B(pr),s=B(0);function a(o){var c,l=(o=ki(o)).length,u,h,f=0,d=new Array(l),g=new Array(l),p=+r.apply(this,arguments),_=Math.min(pr,Math.max(-pr,i.apply(this,arguments)-p)),y,b=Math.min(Math.abs(_)/l,s.apply(this,arguments)),v=b*(_<0?-1:1),m;for(c=0;c<l;++c)(m=g[d[c]=c]=+n(o[c],c,o))>0&&(f+=m);for(t!=null?d.sort(function(w,C){return t(g[w],g[C])}):e!=null&&d.sort(function(w,C){return e(o[w],o[C])}),c=0,h=f?(_-l*v)/f:0;c<l;++c,p=y)u=d[c],m=g[u],y=p+(m>0?m*h:0)+v,g[u]={data:o[u],index:c,value:m,startAngle:p,endAngle:y,padAngle:b};return g}return a.value=function(o){return arguments.length?(n=typeof o=="function"?o:B(+o),a):n},a.sortValues=function(o){return arguments.length?(t=o,e=null,a):t},a.sort=function(o){return arguments.length?(e=o,t=null,a):e},a.startAngle=function(o){return arguments.length?(r=typeof o=="function"?o:B(+o),a):r},a.endAngle=function(o){return arguments.length?(i=typeof o=="function"?o:B(+o),a):i},a.padAngle=function(o){return arguments.length?(s=typeof o=="function"?o:B(+o),a):s},a}class Xa{constructor(t,e){this._context=t,this._x=e}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,e){switch(t=+t,e=+e,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,e,t,e):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+e)/2,t,this._y0,t,e);break}}this._x0=t,this._y0=e}}function e0(n){return new Xa(n,!0)}function n0(n){return new Xa(n,!1)}function r0(n){return n.source}function i0(n){return n.target}function Ya(n){let t=r0,e=i0,r=Ai,i=$i,s=null,a=null,o=gr(c);function c(){let l;const u=Kp.call(arguments),h=t.apply(this,u),f=e.apply(this,u);if(s==null&&(a=n(l=o())),a.lineStart(),u[0]=h,a.point(+r.apply(this,u),+i.apply(this,u)),u[0]=f,a.point(+r.apply(this,u),+i.apply(this,u)),a.lineEnd(),l)return a=null,l+""||null}return c.source=function(l){return arguments.length?(t=l,c):t},c.target=function(l){return arguments.length?(e=l,c):e},c.x=function(l){return arguments.length?(r=typeof l=="function"?l:B(+l),c):r},c.y=function(l){return arguments.length?(i=typeof l=="function"?l:B(+l),c):i},c.context=function(l){return arguments.length?(l==null?s=a=null:a=n(s=l),c):s},c}function s0(){return Ya(e0)}function a0(){return Ya(n0)}function Ga(n){return n<0?-1:1}function ja(n,t,e){var r=n._x1-n._x0,i=t-n._x1,s=(n._y1-n._y0)/(r||i<0&&-0),a=(e-n._y1)/(i||r<0&&-0),o=(s*i+a*r)/(r+i);return(Ga(s)+Ga(a))*Math.min(Math.abs(s),Math.abs(a),.5*Math.abs(o))||0}function Wa(n,t){var e=n._x1-n._x0;return e?(3*(n._y1-n._y0)/e-t)/2:t}function Ci(n,t,e){var r=n._x0,i=n._y0,s=n._x1,a=n._y1,o=(s-r)/3;n._context.bezierCurveTo(r+o,i+o*t,s-o,a-o*e,s,a)}function vr(n){this._context=n}vr.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Ci(this,this._t0,Wa(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){var e=NaN;if(n=+n,t=+t,!(n===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;break;case 2:this._point=3,Ci(this,Wa(this,e=ja(this,n,t)),e);break;default:Ci(this,this._t0,e=ja(this,n,t));break}this._x0=this._x1,this._x1=n,this._y0=this._y1,this._y1=t,this._t0=e}}},Object.create(vr.prototype).point=function(n,t){vr.prototype.point.call(this,t,n)};function Ua(n){return new vr(n)}function pn(n,t,e){this.k=n,this.x=t,this.y=e}pn.prototype={constructor:pn,scale:function(n){return n===1?this:new pn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new pn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},pn.prototype;const o0=`
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
`;class l0 extends F{constructor(){super(...arguments);D(this,"_svg",null);D(this,"_animated",!0);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","scale","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(o0),this._animated=this.getAttribute("animated")!=="false",this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated)return;this._hasAnimated=!0;const r=this._svg;if(!r)return;const i=r.querySelectorAll(".cell");if(e||!this._animated){i.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"});return}i.forEach(s=>{const a=s,o=Number(a.dataset.delay||0);a.style.opacity="0",a.style.transform="scale(0.5)",a.style.transition="none",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${o}ms, transform 400ms ease-out ${o}ms`,a.style.opacity="1",a.style.transform="scale(1)"})})})}_buildChart(){var b;const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.getAttribute("scale")||"diverging";if(!e.length||!r.length){this.render("<svg></svg>");return}const s=e.length,a=3,o=60,c=110,l=56,u=s*l+(s-1)*a,h=u+c,f=u+o,d=i==="sequential"?bi(Fa).domain([0,1]):Oa(qp).domain([-1,0,1]),g=this.isRtl;let p="";for(let v=0;v<s;v++){const m=c+v*(l+a)+l/2,w=o/2;p+=`<text class="header-text" x="${g?h-m:m}" y="${w}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++){const m=o+v*(l+a)+l/2,w=g?h-c/2:c/2;p+=`<text class="header-text" x="${w}" y="${m}">${this._escapeHtml(e[v])}</text>`}for(let v=0;v<s;v++)for(let m=0;m<s;m++){const w=((b=r[v])==null?void 0:b[m])??0,C=d(w),k=this._contrastColor(C),$=(v+m)*40;let x=c+m*(l+a);g&&(x=h-x-l);const S=o+v*(l+a),M=x+l/2,T=S+l/2;p+=`<g class="cell" data-delay="${$}" data-value="${w.toFixed(2)}" style="transform-origin: ${M}px ${T}px; opacity: 0; transform: scale(0.5);">`,p+=`<rect x="${x}" y="${S}" width="${l}" height="${l}" rx="6" ry="6" fill="${C}"/>`,p+=`<text class="cell-text" x="${M}" y="${T}" fill="${k}">${w.toFixed(2)}</text>`,p+="</g>"}const _=`
      <div style="position: relative;">
        <svg viewBox="0 0 ${h} ${f}">${p}</svg>
        <div class="tooltip"></div>
      </div>
    `;this.render(_),this._svg=this.root.querySelector("svg");const y=this.root.querySelector(".tooltip");this._svg&&y&&this._svg.querySelectorAll(".cell").forEach(v=>{v.addEventListener("mouseenter",m=>{const C=m.currentTarget.dataset.value||"";y.textContent=C,y.style.opacity="1"}),v.addEventListener("mousemove",m=>{const w=m,C=this.root.querySelector("div").getBoundingClientRect();y.style.left=`${w.clientX-C.left+10}px`,y.style.top=`${w.clientY-C.top-28}px`}),v.addEventListener("mouseleave",()=>{y.style.opacity="0"})})}_contrastColor(e){const r=Yt(e);if(!r)return"#000";const i=r.rgb();return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"#000":"#fff"}_escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-heatmap",l0);const c0=`
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
`,De={top:20,right:30,bottom:40,left:60},Ka=500,Za=250,ve=Ka-De.left-De.right,Wt=Za-De.top-De.bottom;class u0 extends F{constructor(){super(...arguments);D(this,"_resizeObs",null);D(this,"_svg",null);D(this,"_built",!1)}static get observedAttributes(){return["data","area","points","tooltip","color","x-label","y-label","animated"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(c0),this.root.innerHTML="<svg></svg>",this._buildChart(),this._resizeObs=new ResizeObserver(()=>{}),this._resizeObs.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObs)==null||e.disconnect(),this._resizeObs=null}handleAttributeChange(e,r,i){this._built&&this._buildChart()}_parseData(){const e=this.jsonAttr("data",[]);return!Array.isArray(e)||e.length===0?[]:typeof e[0]=="number"?e.map((r,i)=>({x:i,y:r})):e}_getColor(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}_buildChart(){const e=this._parseData();if(e.length===0)return;const r=this.root.querySelector("svg");if(!r)return;const i=this._getColor(),s=this.hasAttribute("area"),a=this.hasAttribute("points"),o=this.hasAttribute("tooltip"),c=this.getAttribute("x-label")||"",l=this.getAttribute("y-label")||"";nt(r).selectAll("*").remove();const u=nt(r).attr("viewBox",`0 0 ${Ka} ${Za}`).attr("preserveAspectRatio","xMidYMid meet");this._svg=u;const h=u.append("defs"),f=`lv-area-grad-${Math.random().toString(36).slice(2,8)}`,d=h.append("linearGradient").attr("id",f).attr("x1","0").attr("y1","0").attr("x2","0").attr("y2","1");d.append("stop").attr("offset","0%").attr("stop-color",i).attr("stop-opacity",.25),d.append("stop").attr("offset","100%").attr("stop-color",i).attr("stop-opacity",0);const g=u.append("g").attr("transform",`translate(${De.left},${De.top})`),p=In(e,$=>$.x),_=In(e,$=>$.y),y=(_[1]-_[0])*.1||1,b=It().domain(p).range([0,ve]),v=It().domain([_[0]-y,_[1]+y]).range([Wt,0]);if(g.append("g").attr("class","grid").attr("transform",`translate(0,${Wt})`).call(Bn(b).tickSize(-Wt).tickFormat(()=>"")),g.append("g").attr("class","grid").call(Hn(v).tickSize(-ve).tickFormat(()=>"")),g.append("g").attr("class","axis x-axis").attr("transform",`translate(0,${Wt})`).call(Bn(b).ticks(6)),g.append("g").attr("class","axis y-axis").call(Hn(v).ticks(5)),c&&g.append("text").attr("class","axis-label").attr("x",ve/2).attr("y",Wt+35).attr("text-anchor","middle").text(c),l&&g.append("text").attr("class","axis-label").attr("x",-Wt/2).attr("y",-38).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),s){const $=Zp().x(x=>b(x.x)).y0(Wt).y1(x=>v(x.y));g.append("path").datum(e).attr("class","area").attr("d",$).attr("fill",`url(#${f})`)}const m=_r().x($=>b($.x)).y($=>v($.y)),w=g.append("path").datum(e).attr("class","line").attr("d",m).attr("stroke",i).attr("stroke-width",2.5),k=w.node().getTotalLength();w.attr("stroke-dasharray",k).attr("stroke-dashoffset",k),a&&g.selectAll(".point").data(e).enter().append("circle").attr("class","point").attr("cx",$=>b($.x)).attr("cy",$=>v($.y)).attr("r",4).attr("fill",i).attr("stroke","white").attr("stroke-width",1.5),o&&this._setupTooltip(g,e,b,v,i),this._built=!0,this.getAttribute("animated")==="false"&&this._showInstant()}_setupTooltip(e,r,i,s,a){const o=e.append("g").attr("class","tooltip-group").style("display","none");o.append("line").attr("class","crosshair crosshair-x").attr("y1",0).attr("y2",Wt),o.append("line").attr("class","crosshair crosshair-y").attr("x1",0).attr("x2",ve),o.append("circle").attr("r",5).attr("fill",a).attr("stroke","white").attr("stroke-width",2),o.append("rect").attr("class","tooltip-bg").attr("width",60).attr("height",24).attr("rx",6),o.append("text").attr("class","tooltip-text").attr("text-anchor","middle").attr("dy","0.35em");const c=Hr(l=>l.x).left;e.append("rect").attr("width",ve).attr("height",Wt).attr("fill","transparent").on("mousemove",l=>{const[u]=Zr(l),h=i.invert(u);let f=c(r,h,1);if(f>=r.length&&(f=r.length-1),f>0){const m=r[f-1],w=r[f];f=h-m.x>w.x-h?f:f-1}const d=r[f],g=i(d.x),p=s(d.y);o.style("display",null),o.select(".crosshair-x").attr("x1",g).attr("x2",g),o.select(".crosshair-y").attr("y1",p).attr("y2",p),o.select("circle").attr("cx",g).attr("cy",p);const _=60,y=24;let b=g-_/2,v=p-y-10;b<0&&(b=0),b+_>ve&&(b=ve-_),v<0&&(v=p+10),o.select(".tooltip-bg").attr("x",b).attr("y",v),o.select(".tooltip-text").attr("x",b+_/2).attr("y",v+y/2).text(`${d.y.toFixed(1)}`)}).on("mouseleave",()=>{o.style("display","none")})}_showInstant(){if(!this._svg)return;const e=this._svg.select("g");e.select(".line").attr("stroke-dashoffset",0),e.select(".area").classed("visible",!0),e.selectAll(".point").classed("visible",!0)}animateIn(e){var a;if(!this._svg)return;if(e||this.getAttribute("animated")==="false"){this._showInstant();return}const r=this._svg.select("g"),i=r.select(".line"),s=((a=i.node())==null?void 0:a.getTotalLength())||0;i.attr("stroke-dasharray",s).attr("stroke-dashoffset",s).transition().duration(1200).ease(hn).attr("stroke-dashoffset",0),r.select(".area").transition().delay(1500).duration(0).on("start",function(){nt(this).classed("visible",!0)}),r.selectAll(".point").each(function(o,c){nt(this).transition().delay(1500+c*50).duration(0).on("start",function(){nt(this).classed("visible",!0)})})}}customElements.define("lv-line-chart",u0);const yr={sigmoid:n=>1/(1+Math.exp(-n)),relu:n=>Math.max(0,n),tanh:n=>Math.tanh(n),linear:n=>n},h0=`
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
`,Qa=500,Ja=300;class f0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1);D(this,"_resizeObserver",null);D(this,"_svg",null);D(this,"_fn",yr.sigmoid);D(this,"_fnName","sigmoid")}static get observedAttributes(){return["fn","range","samples","color","interactive","animated"]}get _range(){return this.jsonAttr("range",[-6,6])}get _samples(){const e=this.getAttribute("samples");return e&&parseInt(e,10)||200}get _color(){return this.getAttribute("color")||"var(--lv-accent, #3b82f6)"}get _interactive(){return this.hasAttribute("interactive")}get _animated(){const e=this.getAttribute("animated");return e===null?!0:e!=="false"}connectedCallback(){super.connectedCallback(),this.adoptStyles(h0);const e=document.createElement("div");this.root.appendChild(e);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",`0 0 ${Qa} ${Ja}`),r.setAttribute("preserveAspectRatio","xMidYMid meet"),e.appendChild(r),this._svg=nt(r),this._parseFn(),this._render(!1),this._resizeObserver=new ResizeObserver(()=>{}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null}handleAttributeChange(e,r,i){r!==i&&(e==="fn"&&this._parseFn(),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e||!this._animated?this._render(!1):this._render(!0))}_parseFn(){const e=this.getAttribute("fn")||"sigmoid";if(this._fnName=e,yr[e])this._fn=yr[e];else try{const r=e.replace(/^\s*x\s*=>\s*/,"");this._fn=new Function("x","return "+r),this._fnName="custom"}catch{this._fn=yr.sigmoid,this._fnName="sigmoid"}}_generateData(){const[e,r]=this._range,i=this._samples,s=(r-e)/(i-1),a=[];for(let o=0;o<i;o++){const c=e+o*s,l=this._fn(c);a.push({x:c,y:l})}return a}_render(e){if(!this._svg)return;const r=this._svg;r.selectAll("*").remove();const i=this._generateData(),[s,a]=this._range,o=i.map(w=>w.y),c=Jc(o)??-1,l=Os(o)??1,u=(l-c)*.15||.5,h=c-u,f=l+u,d={top:20,right:30,bottom:30,left:40},g=Qa-d.left-d.right,p=Ja-d.top-d.bottom,_=It().domain([s,a]).range([0,g]),y=It().domain([h,f]).range([p,0]),b=r.append("g").attr("transform",`translate(${d.left},${d.top})`);this._drawGrid(b,_,y,g,p),this._drawAxes(b,_,y,g,p);const v=_r().x(w=>_(w.x)).y(w=>y(w.y)).curve(Ua),m=b.append("path").datum(i).attr("class","fn-line").attr("d",v).attr("stroke",this._color).attr("stroke-width",3);if(e){const C=m.node().getTotalLength();m.attr("stroke-dasharray",C).attr("stroke-dashoffset",C).transition().duration(1e3).ease(hn).attr("stroke-dashoffset",0)}this._drawKeyPoints(b,_,y),this._interactive&&this._addInteractivePoint(b,_,y,i,g,p)}_drawGrid(e,r,i,s,a){const o=r.ticks(),c=i.ticks();e.selectAll(".grid-line-x").data(o).enter().append("line").attr("class","grid-line").attr("x1",l=>r(l)).attr("x2",l=>r(l)).attr("y1",0).attr("y2",a),e.selectAll(".grid-line-y").data(c).enter().append("line").attr("class","grid-line").attr("x1",0).attr("x2",s).attr("y1",l=>i(l)).attr("y2",l=>i(l))}_drawAxes(e,r,i,s,a){const[o,c]=r.domain(),[l,u]=i.domain(),h=l<=0&&u>=0?i(0):a;e.append("line").attr("class","axis-line").attr("x1",0).attr("x2",s).attr("y1",h).attr("y2",h);const f=o<=0&&c>=0?r(0):0;e.append("line").attr("class","axis-line").attr("x1",f).attr("x2",f).attr("y1",0).attr("y2",a),r.ticks().forEach(p=>{const _=r(p);e.append("line").attr("class","axis-line").attr("x1",_).attr("x2",_).attr("y1",h-3).attr("y2",h+3),e.append("text").attr("class","axis-text").attr("x",_).attr("y",h+14).attr("text-anchor","middle").text(p)}),i.ticks().forEach(p=>{const _=i(p);e.append("line").attr("class","axis-line").attr("x1",f-3).attr("x2",f+3).attr("y1",_).attr("y2",_),e.append("text").attr("class","axis-text").attr("x",f-12).attr("y",_).attr("dy","0.35em").attr("text-anchor","end").text(p)})}_drawKeyPoints(e,r,i){if(this._fnName==="sigmoid"){const s=r(0),a=i(.5);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("σ(0) = 0.5")}else if(this._fnName==="relu"){const s=r(0),a=i(0);e.append("circle").attr("class","key-point").attr("cx",s).attr("cy",a).attr("r",4),e.append("text").attr("class","key-label").attr("x",s+8).attr("y",a-8).text("kink point")}}_addInteractivePoint(e,r,i,s,a,o){const[c,l]=this._range,u=this._fn,h=(c+l)/2,f=u(h),d=e.append("line").attr("class","crosshair").attr("x1",r(h)).attr("x2",r(h)).attr("y1",i(f)).attr("y2",o),g=e.append("line").attr("class","crosshair").attr("x1",0).attr("x2",r(h)).attr("y1",i(f)).attr("y2",i(f)),p=e.append("g"),_=p.append("rect").attr("class","readout-bg").attr("width",160).attr("height",24).attr("rx",6),y=p.append("text").attr("class","readout-text").attr("text-anchor","middle"),b=e.append("circle").attr("class","drag-point").attr("cx",r(h)).attr("cy",i(f)).attr("r",8).attr("fill",this._color).attr("stroke","#fff").attr("stroke-width",2),v=(w,C,k,$)=>{const x=`x = ${k.toFixed(2)}, y = ${$.toFixed(2)}`;y.text(x);const S=160,M=24,T=12;let E=w-S/2,z=C-M-T;E<0&&(E=0),E+S>a&&(E=a-S),z<0&&(z=C+T),_.attr("x",E).attr("y",z).attr("width",S).attr("height",M),y.attr("x",E+S/2).attr("y",z+M/2).attr("text-anchor","middle")};v(r(h),i(f),h,f);const m=Uh().on("drag",w=>{const C=Math.max(0,Math.min(a,w.x)),k=r.invert(C),$=Math.max(c,Math.min(l,k)),x=u($),S=r($),M=i(x);b.attr("cx",S).attr("cy",M),d.attr("x1",S).attr("x2",S).attr("y1",M).attr("y2",o),g.attr("x1",0).attr("x2",S).attr("y1",M).attr("y2",M),v(S,M,$,x)});b.call(m)}}customElements.define("lv-function",f0);const to=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],d0=`
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
`,bt={top:20,right:20,bottom:50,left:55},eo=500,Si=400;class p0 extends F{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null)}static get observedAttributes(){return["data","x-label","y-label","clusters","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(d0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||to[e%8]}_clusterColor(e){const i=[...new Set(this._data.map(o=>o.cluster).filter(o=>o!=null))].indexOf(e),s=i>=0?i:0;return getComputedStyle(this).getPropertyValue(`--lv-chart-${s%8}`).trim()||to[s%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","grid-group"),this._svg.append("g").attr("class","axis-group"),this._svg.append("g").attr("class","points-group"),this._svg.append("g").attr("class","tooltip-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("clusters"),s=this.hasAttribute("tooltip"),a=this.getAttribute("x-label")||"",o=this.getAttribute("y-label")||"",c=i?[...new Set(r.map(A=>A.cluster).filter(A=>A!=null))]:[],l=c.length>0?30:0,u=Si+l,h=eo-bt.left-bt.right,f=Si-bt.top-bt.bottom;this._svg.attr("viewBox",`0 0 ${eo} ${u}`);const d=In(r,A=>A.x),g=In(r,A=>A.y),p=(d[1]-d[0])*.05||1,_=(g[1]-g[0])*.05||1,y=It().domain([d[0]-p,d[1]+p]).range([0,h]),b=It().domain([g[0]-_,g[1]+_]).range([f,0]),v=this._svg.select(".grid-group").attr("transform",`translate(${bt.left},${bt.top})`);v.selectAll("*").remove();const m=Bn(y).tickSize(-f).tickFormat(()=>"");v.append("g").attr("class","grid").attr("transform",`translate(0,${f})`).call(m);const w=Hn(b).tickSize(-h).tickFormat(()=>"");v.append("g").attr("class","grid").call(w);const C=this._svg.select(".axis-group").attr("transform",`translate(${bt.left},${bt.top})`);C.selectAll("*").remove(),C.append("g").attr("class","axis").attr("transform",`translate(0,${f})`).call(Bn(y).ticks(6)),C.append("g").attr("class","axis").call(Hn(b).ticks(6)),a&&C.append("text").attr("class","axis-label").attr("x",h/2).attr("y",f+38).attr("text-anchor","middle").text(a),o&&C.append("text").attr("class","axis-label").attr("x",-f/2).attr("y",-40).attr("text-anchor","middle").attr("transform","rotate(-90)").text(o);const k=this._svg.select(".points-group").attr("transform",`translate(${bt.left},${bt.top})`),$=this._svg.select(".tooltip-group").attr("transform",`translate(${bt.left},${bt.top})`);$.selectAll("*").remove();const x=$.append("g").attr("class","tooltip-box");x.append("rect").attr("class","tooltip-bg"),x.append("text").attr("class","tooltip-text");const S=k.selectAll(".point").data(r,(A,L)=>String(L));S.exit().remove();const M=S.enter().append("circle").attr("class","point").attr("cx",A=>y(A.x)).attr("cy",A=>b(A.y)).attr("r",5).attr("fill",(A,L)=>i&&A.cluster!=null?this._clusterColor(A.cluster):this._getColor(L,A)).attr("opacity",e?0:1).attr("transform",e?"scale(0)":"scale(1)").style("transform-origin",A=>`${y(A.x)}px ${b(A.y)}px`);s?M.on("mouseenter",(A,L)=>{var O;if(nt(A.currentTarget).transition().duration(150).attr("r",6.5).attr("opacity",1),L.label){const R=y(L.x),N=b(L.y)-14;x.classed("visible",!0),x.select(".tooltip-text").attr("x",R).attr("y",N).text(L.label);const I=x.select(".tooltip-text").node(),J=((O=I==null?void 0:I.getComputedTextLength)==null?void 0:O.call(I))||40;x.select(".tooltip-bg").attr("x",R-J/2-6).attr("y",N-10).attr("width",J+12).attr("height",20)}}).on("mouseleave",A=>{nt(A.currentTarget).transition().duration(150).attr("r",5).attr("opacity",.85),x.classed("visible",!1)}):M.on("mouseenter",A=>{nt(A.currentTarget).transition().duration(150).attr("r",6.5)}).on("mouseleave",A=>{nt(A.currentTarget).transition().duration(150).attr("r",5)});const T=M.merge(S);if(e?T.each(function(A,L){nt(this).transition().delay(L*30).duration(400).ease(Dd).attr("opacity",.85).attr("transform","scale(1)")}):T.attr("cx",A=>y(A.x)).attr("cy",A=>b(A.y)).attr("opacity",.85).attr("transform","scale(1)").attr("fill",(A,L)=>i&&A.cluster!=null?this._clusterColor(A.cluster):this._getColor(L,A)),this.hasAttribute("labels")||this.hasAttribute("tooltip")){const A=this._svg.select(".points-group");A.selectAll(".point-label").remove(),r.forEach((L,P)=>{if(!L.label)return;const O=A.append("text").attr("class","point-label").attr("x",y(L.x)+8).attr("y",b(L.y)+4).attr("fill","var(--lv-text, #e4e4ec)").attr("font-size","11px").attr("opacity",e?0:.9).text(L.label);e&&O.transition().delay(P*30+200).duration(300).attr("opacity",.9)})}const z=this._svg.select(".legend-group");if(z.selectAll("*").remove(),c.length>0){const A=Si+5;let L=bt.left;for(const P of c){const O=this._clusterColor(P);z.append("circle").attr("cx",L+5).attr("cy",A+8).attr("r",4).attr("fill",O),z.append("text").attr("class","legend-text").attr("x",L+14).attr("y",A+8).attr("dominant-baseline","central").text(String(P)),L+=14+String(P).length*7+20}}}}customElements.define("lv-scatter",p0);const g0=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],m0=`
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
`,gn=300,_0=130,no=26,ro=16;class v0 extends F{constructor(){super(...arguments);D(this,"_data",[]);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null)}static get observedAttributes(){return["data","donut","legend"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(m0),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",[]),this._initSvg(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",[])),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_getColor(e,r){return r.color?r.color:getComputedStyle(this).getPropertyValue(`--lv-chart-${e%8}`).trim()||g0[e%8]}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","arcs-group"),this._svg.append("g").attr("class","labels-group"),this._svg.append("g").attr("class","hover-group"),this._svg.append("g").attr("class","legend-group")}_render(e){if(!this._svg)return;const r=this._data,i=this.hasAttribute("donut"),s=this.hasAttribute("legend"),a=_0,o=i?a*.6:0,c=a+5,l=s?r.length:0,u=l>0?ro+l*no:0,h=gn+u;this._svg.attr("viewBox",`0 0 ${gn} ${h}`);const f=gn/2,d=gn/2,p=t0().value($=>$.value).sort(null).padAngle(.015)(r),_=Ba().innerRadius(o).outerRadius(a),y=Ba().innerRadius(o).outerRadius(c),b=this._svg.select(".arcs-group").attr("transform",`translate(${f},${d})`);b.selectAll("*").remove();const v=this._svg.select(".hover-group").attr("transform",`translate(${f},${d})`);v.selectAll("*").remove();const m=v.append("text").attr("class","hover-label").attr("x",0).attr("y",0),w=v.append("text").attr("class","hover-label").attr("x",0).attr("y",18).style("font-size","11px").style("font-weight","400");for(let $=0;$<p.length;$++){const x=p[$],S=this._getColor($,x.data),M=b.append("path").attr("class","arc").attr("fill",S).attr("stroke","var(--lv-bg, #0f0f23)").attr("stroke-width",1.5);if(e){const T={...x,endAngle:x.startAngle};M.attr("d",_(T)).transition().delay($*120).duration(800).ease(hn).attrTween("d",()=>{const E=pe(T,x);return z=>_(E(z))})}else M.attr("d",_(x));M.on("mouseenter",()=>{if(M.transition().duration(150).attr("d",y(x)),i)m.text(x.data.label).classed("visible",!0),w.text(String(x.data.value)).classed("visible",!0);else{const[T,E]=_.centroid(x);m.attr("x",T*1.6).attr("y",E*1.6-8).text(x.data.label).classed("visible",!0),w.attr("x",T*1.6).attr("y",E*1.6+8).text(String(x.data.value)).classed("visible",!0)}}).on("mouseleave",()=>{M.transition().duration(150).attr("d",_(x)),m.classed("visible",!1),w.classed("visible",!1)})}const C=this._svg.select(".labels-group").attr("transform",`translate(${f},${d})`);if(C.selectAll("*").remove(),!s)for(let $=0;$<p.length;$++){const x=p[$];if(x.endAngle-x.startAngle>.35){const[M,T]=_.centroid(x),E=C.append("text").attr("class","arc-label").attr("x",M).attr("y",T).text(x.data.label);e&&E.attr("opacity",0).transition().delay($*120+600).duration(300).attr("opacity",1)}}const k=this._svg.select(".legend-group");if(k.selectAll("*").remove(),s&&r.length>0){const $=gn+ro;for(let x=0;x<r.length;x++){const M=$+x*no,T=this._getColor(x,r[x]);k.append("rect").attr("class","legend-swatch").attr("x",20).attr("y",M-5).attr("width",10).attr("height",10).attr("fill",T),k.append("text").attr("class","legend-text").attr("x",38).attr("y",M).attr("dominant-baseline","central").text(`${r[x].label} (${r[x].value})`)}}}}customElements.define("lv-pie",v0);const y0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .cm-container { width: 100%; overflow-x: auto; }
  svg { display: block; margin: 0 auto; }
  .cell-text { font-family: var(--lv-font-mono); font-size: 12px; pointer-events: none; }
  .header-text { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text-dim); }
  .metric-text { font-family: var(--lv-font-mono); font-size: 10px; fill: var(--lv-text-dim); }
  .cell rect { transition: opacity 0.2s; cursor: default; }
  .cell:hover rect { opacity: 0.85; }
  .axis-label { font-family: var(--lv-font); font-size: 12px; font-weight: 600; fill: var(--lv-text-dim); }
`;class x0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["labels","values","normalize","show-metrics"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(y0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelectorAll(".cell");r.forEach((i,s)=>{const a=i,o=Math.floor(s/Math.sqrt(r.length)),c=s%Math.sqrt(r.length),l=(o+c)*40;a.style.transition="none",a.style.opacity="0",a.style.transform="scale(0.5)",requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=`opacity 400ms ease-out ${l}ms, transform 400ms ease-out ${l}ms`,a.style.opacity="1",a.style.transform="scale(1)"}))})}_buildChart(){const e=this.jsonAttr("labels",[]),r=this.jsonAttr("values",[]),i=this.hasAttribute("normalize"),s=this.hasAttribute("show-metrics");if(!e.length||!r.length){this.render('<div class="cm-container"></div>');return}const a=e.length,o=i?r.map(k=>{const $=k.reduce((x,S)=>x+S,0);return $>0?k.map(x=>x/$):k}):r,c=Math.max(...o.flat()),l=56,u=3,h=70,f=80,d=s?60:0,g=s?40:0,p=a*l+(a-1)*u,_=p,y=f+p+d,b=h+_+g,v=this.isRtl,m=bi(Fa).domain([0,c||1]),w=k=>{const $=Yt(m(k));if(!$)return"#fff";const{r:x,g:S,b:M}=$.rgb();return x*.299+S*.587+M*.114>150?"#111":"#fff"};let C="";for(let k=0;k<a;k++){const $=f+k*(l+u)+l/2;C+=`<text class="header-text" x="${v?y-$:$}" y="${h-8}"
        text-anchor="middle">${this._esc(e[k])}</text>`}for(let k=0;k<a;k++){const $=h+k*(l+u)+l/2,x=v?y-f/2:f/2;C+=`<text class="header-text" x="${x}" y="${$}"
        text-anchor="middle" dominant-baseline="central">${this._esc(e[k])}</text>`}for(let k=0;k<a;k++)for(let $=0;$<a;$++){const x=o[k][$],S=r[k][$],M=f+$*(l+u),T=h+k*(l+u),E=v?y-M-l:M,z=m(x),A=w(x),L=i?(x*100).toFixed(0)+"%":String(S);C+=`<g class="cell">
          <rect x="${E}" y="${T}" width="${l}" height="${l}"
            rx="4" fill="${z}" ${k===$?'stroke="var(--lv-accent)" stroke-width="2"':""}/>
          <text class="cell-text" x="${E+l/2}" y="${T+l/2}"
            text-anchor="middle" dominant-baseline="central"
            fill="${A}">${L}</text>
        </g>`}if(s){for(let k=0;k<a;k++){const $=r[k][k],x=r.reduce((E,z)=>E+z[k],0),S=x>0?($/x*100).toFixed(0)+"%":"-",M=f+k*(l+u)+l/2,T=v?y-M:M;C+=`<text class="metric-text" x="${T}" y="${h+_+25}"
          text-anchor="middle" fill="var(--lv-positive)">${S}</text>`}for(let k=0;k<a;k++){const $=r[k][k],x=r[k].reduce((E,z)=>E+z,0),S=x>0?($/x*100).toFixed(0)+"%":"-",M=h+k*(l+u)+l/2,T=v?f/2-20:f+p+10;C+=`<text class="metric-text" x="${T}" y="${M}"
          text-anchor="start" dominant-baseline="central" fill="var(--lv-accent)">${S}</text>`}}C+=`<text class="axis-label" x="${v?y-f/2:f/2}" y="14"
      text-anchor="middle">Actual</text>`,C+=`<text class="axis-label" x="${y/2}" y="${b-2}"
      text-anchor="middle">Predicted</text>`,this.render(`<div class="cm-container">
      <svg viewBox="0 0 ${y} ${b}" role="img" aria-label="Confusion Matrix">
        ${C}
      </svg>
    </div>`)}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}customElements.define("lv-confusion-matrix",x0);const b0=`
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
`,mn=560,xr=280,ct={top:30,right:60,bottom:40,left:55};class w0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["loss","accuracy","lr","x-label","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(b0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;this.root.querySelectorAll(".metric-line").forEach(i=>{const s=i,a=s.getTotalLength();s.style.strokeDasharray=String(a),s.style.strokeDashoffset=String(a),s.style.transition=`stroke-dashoffset 1.2s ${s.dataset.idx||"0"}s ease-out`,requestAnimationFrame(()=>{s.style.strokeDashoffset="0"})})}_buildChart(){const e=this.jsonAttr("loss",[]),r=this.jsonAttr("accuracy",[]),i=this.jsonAttr("lr",[]),s=this.getAttribute("x-label")||"Epoch";this.hasAttribute("tooltip");const a=Math.max(e.length,r.length,i.length);if(a===0){this.render('<div class="td-container"></div>');return}const o=mn-ct.left-ct.right,c=xr-ct.top-ct.bottom,l=It().domain([0,a-1]).range([0,o]),u=Math.max(e.length?Math.max(...e):0,r.length?Math.max(...r):1)*1.1,h=It().domain([0,u]).range([c,0]),f=i.length>0,d=f?Math.max(...i)*1.2:1,g=It().domain([0,d]).range([c,0]),p=(k,$)=>_r().x((x,S)=>ct.left+l(S)).y(x=>ct.top+$(x)).curve(Ua)(k)||"",_=[];e.length&&_.push({name:"Loss",color:"var(--lv-negative)",data:e,axis:"left"}),r.length&&_.push({name:"Accuracy",color:"var(--lv-positive)",data:r,axis:"left"}),f&&_.push({name:"Learning Rate",color:"var(--lv-accent2)",data:i,axis:"right"});const y=_.map(k=>`<div class="legend-item"><div class="legend-dot" style="background:${k.color}"></div>${k.name}</div>`).join("");let b="";const v=h.ticks(5);v.forEach(k=>{const $=ct.top+h(k);b+=`<line class="grid-line" x1="${ct.left}" x2="${mn-ct.right}" y1="${$}" y2="${$}"/>`});let m="";v.forEach(k=>{const $=ct.top+h(k);m+=`<text class="axis-text" x="${ct.left-8}" y="${$}" text-anchor="end" dominant-baseline="central">${k.toFixed(2)}</text>`}),f&&g.ticks(4).forEach(k=>{const $=ct.top+g(k);m+=`<text class="axis-text" x="${mn-ct.right+8}" y="${$}" text-anchor="start" dominant-baseline="central">${k.toFixed(4)}</text>`}),l.ticks(Math.min(a,10)).forEach(k=>{const $=ct.left+l(k);m+=`<text class="axis-text" x="${$}" y="${xr-ct.bottom+20}" text-anchor="middle">${Math.round(k)}</text>`}),m+=`<text class="axis-text" x="${mn/2}" y="${xr-4}" text-anchor="middle">${s}</text>`;let C="";_.forEach((k,$)=>{const x=k.axis==="left"?h:g,S=p(k.data,x);C+=`<path class="metric-line" d="${S}" stroke="${k.color}" data-idx="${$*.3}"/>`}),this.render(`
      <div class="td-container">
        <div class="legend">${y}</div>
        <svg viewBox="0 0 ${mn} ${xr}" role="img" aria-label="Training Dashboard">
          ${b}${m}${C}
        </svg>
      </div>
    `)}}customElements.define("lv-train-dashboard",w0);function io(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e<r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e<i||e===void 0&&i>=i)&&(e=i)}return e}function k0(n,t){let e;if(t===void 0)for(const r of n)r!=null&&(e>r||e===void 0&&r>=r)&&(e=r);else{let r=-1;for(let i of n)(i=t(i,++r,n))!=null&&(e>i||e===void 0&&i>=i)&&(e=i)}return e}function Ti(n,t){let e=0;if(t===void 0)for(let r of n)(r=+r)&&(e+=r);else{let r=-1;for(let i of n)(i=+t(i,++r,n))&&(e+=i)}return e}function A0(n){return n.depth}function $0(n,t){return n.sourceLinks.length?n.depth:t-1}function br(n){return function(){return n}}function so(n,t){return wr(n.source,t.source)||n.index-t.index}function ao(n,t){return wr(n.target,t.target)||n.index-t.index}function wr(n,t){return n.y0-t.y0}function Mi(n){return n.value}function C0(n){return n.index}function S0(n){return n.nodes}function T0(n){return n.links}function oo(n,t){const e=n.get(t);if(!e)throw new Error("missing: "+t);return e}function lo({nodes:n}){for(const t of n){let e=t.y0,r=e;for(const i of t.sourceLinks)i.y0=e+i.width/2,e+=i.width;for(const i of t.targetLinks)i.y1=r+i.width/2,r+=i.width}}function M0(){let n=0,t=0,e=1,r=1,i=24,s=8,a,o=C0,c=$0,l,u,h=S0,f=T0,d=6;function g(){const A={nodes:h.apply(null,arguments),links:f.apply(null,arguments)};return p(A),_(A),y(A),b(A),w(A),lo(A),A}g.update=function(A){return lo(A),A},g.nodeId=function(A){return arguments.length?(o=typeof A=="function"?A:br(A),g):o},g.nodeAlign=function(A){return arguments.length?(c=typeof A=="function"?A:br(A),g):c},g.nodeSort=function(A){return arguments.length?(l=A,g):l},g.nodeWidth=function(A){return arguments.length?(i=+A,g):i},g.nodePadding=function(A){return arguments.length?(s=a=+A,g):s},g.nodes=function(A){return arguments.length?(h=typeof A=="function"?A:br(A),g):h},g.links=function(A){return arguments.length?(f=typeof A=="function"?A:br(A),g):f},g.linkSort=function(A){return arguments.length?(u=A,g):u},g.size=function(A){return arguments.length?(n=t=0,e=+A[0],r=+A[1],g):[e-n,r-t]},g.extent=function(A){return arguments.length?(n=+A[0][0],e=+A[1][0],t=+A[0][1],r=+A[1][1],g):[[n,t],[e,r]]},g.iterations=function(A){return arguments.length?(d=+A,g):d};function p({nodes:A,links:L}){for(const[O,R]of A.entries())R.index=O,R.sourceLinks=[],R.targetLinks=[];const P=new Map(A.map((O,R)=>[o(O,R,A),O]));for(const[O,R]of L.entries()){R.index=O;let{source:N,target:I}=R;typeof N!="object"&&(N=R.source=oo(P,N)),typeof I!="object"&&(I=R.target=oo(P,I)),N.sourceLinks.push(R),I.targetLinks.push(R)}if(u!=null)for(const{sourceLinks:O,targetLinks:R}of A)O.sort(u),R.sort(u)}function _({nodes:A}){for(const L of A)L.value=L.fixedValue===void 0?Math.max(Ti(L.sourceLinks,Mi),Ti(L.targetLinks,Mi)):L.fixedValue}function y({nodes:A}){const L=A.length;let P=new Set(A),O=new Set,R=0;for(;P.size;){for(const N of P){N.depth=R;for(const{target:I}of N.sourceLinks)O.add(I)}if(++R>L)throw new Error("circular link");P=O,O=new Set}}function b({nodes:A}){const L=A.length;let P=new Set(A),O=new Set,R=0;for(;P.size;){for(const N of P){N.height=R;for(const{source:I}of N.targetLinks)O.add(I)}if(++R>L)throw new Error("circular link");P=O,O=new Set}}function v({nodes:A}){const L=io(A,R=>R.depth)+1,P=(e-n-i)/(L-1),O=new Array(L);for(const R of A){const N=Math.max(0,Math.min(L-1,Math.floor(c.call(null,R,L))));R.layer=N,R.x0=n+N*P,R.x1=R.x0+i,O[N]?O[N].push(R):O[N]=[R]}if(l)for(const R of O)R.sort(l);return O}function m(A){const L=k0(A,P=>(r-t-(P.length-1)*a)/Ti(P,Mi));for(const P of A){let O=t;for(const R of P){R.y0=O,R.y1=O+R.value*L,O=R.y1+a;for(const N of R.sourceLinks)N.width=N.value*L}O=(r-O+a)/(P.length+1);for(let R=0;R<P.length;++R){const N=P[R];N.y0+=O*(R+1),N.y1+=O*(R+1)}T(P)}}function w(A){const L=v(A);a=Math.min(s,(r-t)/(io(L,P=>P.length)-1)),m(L);for(let P=0;P<d;++P){const O=Math.pow(.99,P),R=Math.max(1-O,(P+1)/d);k(L,O,R),C(L,O,R)}}function C(A,L,P){for(let O=1,R=A.length;O<R;++O){const N=A[O];for(const I of N){let J=0,yt=0;for(const{source:K,value:Me}of I.targetLinks){let Jt=Me*(I.layer-K.layer);J+=E(K,I)*Jt,yt+=Jt}if(!(yt>0))continue;let rt=(J/yt-I.y0)*L;I.y0+=rt,I.y1+=rt,M(I)}l===void 0&&N.sort(wr),$(N,P)}}function k(A,L,P){for(let O=A.length,R=O-2;R>=0;--R){const N=A[R];for(const I of N){let J=0,yt=0;for(const{target:K,value:Me}of I.sourceLinks){let Jt=Me*(K.layer-I.layer);J+=z(I,K)*Jt,yt+=Jt}if(!(yt>0))continue;let rt=(J/yt-I.y0)*L;I.y0+=rt,I.y1+=rt,M(I)}l===void 0&&N.sort(wr),$(N,P)}}function $(A,L){const P=A.length>>1,O=A[P];S(A,O.y0-a,P-1,L),x(A,O.y1+a,P+1,L),S(A,r,A.length-1,L),x(A,t,0,L)}function x(A,L,P,O){for(;P<A.length;++P){const R=A[P],N=(L-R.y0)*O;N>1e-6&&(R.y0+=N,R.y1+=N),L=R.y1+a}}function S(A,L,P,O){for(;P>=0;--P){const R=A[P],N=(R.y1-L)*O;N>1e-6&&(R.y0-=N,R.y1-=N),L=R.y0-a}}function M({sourceLinks:A,targetLinks:L}){if(u===void 0){for(const{source:{sourceLinks:P}}of L)P.sort(ao);for(const{target:{targetLinks:P}}of A)P.sort(so)}}function T(A){if(u===void 0)for(const{sourceLinks:L,targetLinks:P}of A)L.sort(ao),P.sort(so)}function E(A,L){let P=A.y0-(A.sourceLinks.length-1)*a/2;for(const{target:O,width:R}of A.sourceLinks){if(O===L)break;P+=R+a}for(const{source:O,width:R}of L.targetLinks){if(O===A)break;P-=R}return P}function z(A,L){let P=L.y0-(L.targetLinks.length-1)*a/2;for(const{source:O,width:R}of L.targetLinks){if(O===A)break;P+=R+a}for(const{target:O,width:R}of A.sourceLinks){if(O===L)break;P-=R}return P}return g}var Ei=Math.PI,Li=2*Ei,ye=1e-6,E0=Li-ye;function Pi(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function co(){return new Pi}Pi.prototype=co.prototype={constructor:Pi,moveTo:function(n,t){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+t)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(n,t){this._+="L"+(this._x1=+n)+","+(this._y1=+t)},quadraticCurveTo:function(n,t,e,r){this._+="Q"+ +n+","+ +t+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(n,t,e,r,i,s){this._+="C"+ +n+","+ +t+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+s)},arcTo:function(n,t,e,r,i){n=+n,t=+t,e=+e,r=+r,i=+i;var s=this._x1,a=this._y1,o=e-n,c=r-t,l=s-n,u=a-t,h=l*l+u*u;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=n)+","+(this._y1=t);else if(h>ye)if(!(Math.abs(u*o-c*l)>ye)||!i)this._+="L"+(this._x1=n)+","+(this._y1=t);else{var f=e-s,d=r-a,g=o*o+c*c,p=f*f+d*d,_=Math.sqrt(g),y=Math.sqrt(h),b=i*Math.tan((Ei-Math.acos((g+h-p)/(2*_*y)))/2),v=b/y,m=b/_;Math.abs(v-1)>ye&&(this._+="L"+(n+v*l)+","+(t+v*u)),this._+="A"+i+","+i+",0,0,"+ +(u*f>l*d)+","+(this._x1=n+m*o)+","+(this._y1=t+m*c)}},arc:function(n,t,e,r,i,s){n=+n,t=+t,e=+e,s=!!s;var a=e*Math.cos(r),o=e*Math.sin(r),c=n+a,l=t+o,u=1^s,h=s?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);this._x1===null?this._+="M"+c+","+l:(Math.abs(this._x1-c)>ye||Math.abs(this._y1-l)>ye)&&(this._+="L"+c+","+l),e&&(h<0&&(h=h%Li+Li),h>E0?this._+="A"+e+","+e+",0,1,"+u+","+(n-a)+","+(t-o)+"A"+e+","+e+",0,1,"+u+","+(this._x1=c)+","+(this._y1=l):h>ye&&(this._+="A"+e+","+e+",0,"+ +(h>=Ei)+","+u+","+(this._x1=n+e*Math.cos(i))+","+(this._y1=t+e*Math.sin(i))))},rect:function(n,t,e,r){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+t)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};function uo(n){return function(){return n}}function L0(n){return n[0]}function P0(n){return n[1]}var z0=Array.prototype.slice;function R0(n){return n.source}function O0(n){return n.target}function N0(n){var t=R0,e=O0,r=L0,i=P0,s=null;function a(){var o,c=z0.call(arguments),l=t.apply(this,c),u=e.apply(this,c);if(s||(s=o=co()),n(s,+r.apply(this,(c[0]=l,c)),+i.apply(this,c),+r.apply(this,(c[0]=u,c)),+i.apply(this,c)),o)return s=null,o+""||null}return a.source=function(o){return arguments.length?(t=o,a):t},a.target=function(o){return arguments.length?(e=o,a):e},a.x=function(o){return arguments.length?(r=typeof o=="function"?o:uo(+o),a):r},a.y=function(o){return arguments.length?(i=typeof o=="function"?o:uo(+o),a):i},a.context=function(o){return arguments.length?(s=o??null,a):s},a}function D0(n,t,e,r,i){n.moveTo(t,e),n.bezierCurveTo(t=(t+r)/2,e,t,i,r,i)}function F0(){return N0(D0)}function I0(n){return[n.source.x1,n.y0]}function q0(n){return[n.target.x0,n.y1]}function B0(){return F0().source(I0).target(q0)}const H0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  svg { display: block; width: 100%; }
  .node rect { transition: opacity 0.2s; }
  .node:hover rect { opacity: 0.85; }
  .node-label { font-family: var(--lv-font); font-size: 11px; fill: var(--lv-text); pointer-events: none; }
  .link { fill: none; stroke-opacity: 0.3; transition: stroke-opacity 0.2s; }
  .link:hover { stroke-opacity: 0.6; }
`,ho=["var(--lv-chart-0)","var(--lv-chart-1)","var(--lv-chart-2)","var(--lv-chart-3)","var(--lv-chart-4)","var(--lv-chart-5)","var(--lv-chart-6)","var(--lv-chart-7)"];class V0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["nodes","links","node-colors"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(H0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelectorAll(".node");r.forEach((a,o)=>{const c=a;c.style.transition="none",c.style.opacity="0",c.style.transform="translateX(-20px)",requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.transition=`opacity 400ms ease-out ${o*80}ms, transform 400ms ease-out ${o*80}ms`,c.style.opacity="1",c.style.transform="translateX(0)"}))});const i=this.root.querySelectorAll(".link"),s=r.length*80;i.forEach((a,o)=>{const c=a,l=c.getTotalLength();c.style.strokeDasharray=String(l),c.style.strokeDashoffset=String(l),c.style.transition=`stroke-dashoffset 600ms ease-out ${s+o*50}ms`,requestAnimationFrame(()=>{c.style.strokeDashoffset="0"})})}_buildChart(){const e=this.jsonAttr("nodes",[]),r=this.jsonAttr("links",[]),i=this.jsonAttr("node-colors",[]);if(!e.length||!r.length){this.render("<svg></svg>");return}const s=600,a=Math.max(300,e.length*40),o=20,c=this.isRtl,l=M0().nodeId((h,f)=>f).nodeWidth(20).nodePadding(16).nodeAlign(A0).extent([[o,o],[s-o,a-o]])({nodes:e.map(h=>({name:h})),links:r.map(h=>({...h}))});let u="";l.links.forEach((h,f)=>{const d=B0()(h),g=i[h.source.index]||ho[h.source.index%8];u+=`<path class="link" d="${d}" stroke="${g}" stroke-width="${Math.max(1,h.width)}"/>`}),l.nodes.forEach((h,f)=>{const d=i[f]||ho[f%8],g=c?s-h.x1:h.x0,p=h.x1-h.x0,_=h.y0,y=h.y1-h.y0,b=c?g-6:g+p+6,v=c?"end":"start";u+=`<g class="node">
        <rect x="${g}" y="${_}" width="${p}" height="${y}" rx="3" fill="${d}"/>
        <text class="node-label" x="${b}" y="${_+y/2}"
          text-anchor="${v}" dominant-baseline="central">${this._esc(h.name)}</text>
      </g>`}),this.render(`<svg viewBox="0 0 ${s} ${a}" role="img" aria-label="Sankey Diagram">${u}</svg>`)}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sankey",V0);const X0="https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js",Y0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .sketch-container { width: 100%; }
  canvas { display: block; width: 100%; }
  .bar-labels { display: flex; justify-content: space-around; margin-top: 8px; font-family: var(--lv-font); font-size: 12px; color: var(--lv-text-dim); }
`,G0=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class j0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Y0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelector("canvas");r&&(r.style.opacity="0",r.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{r.style.opacity="1"}))}async _buildChart(){const e=this.jsonAttr("data",[]),r=parseFloat(this.getAttribute("roughness")||"2");if(!e.length){this.render('<div class="sketch-container"></div>');return}const i=500,s=300,a={top:20,right:20,bottom:40,left:50};this.render(`<div class="sketch-container">
      <canvas width="${i*2}" height="${s*2}" style="width:${i}px;height:${s}px;"></canvas>
      <div class="bar-labels">${e.map(_=>`<span>${this._esc(_.label)}</span>`).join("")}</div>
    </div>`);try{await te(X0)}catch{return}const o=this.root.querySelector("canvas");if(!o)return;const c=window.rough.canvas(o),l=o.getContext("2d");if(!l)return;l.scale(2,2);const u=Math.max(...e.map(_=>_.value)),h=i-a.left-a.right,f=s-a.top-a.bottom,d=h/e.length*.7,g=h/e.length*.3;c.line(a.left,s-a.bottom,i-a.right,s-a.bottom,{roughness:r*.5,stroke:"#888"}),c.line(a.left,a.top,a.left,s-a.bottom,{roughness:r*.5,stroke:"#888"});const p=this.isRtl;e.forEach((_,y)=>{const b=_.value/u*f,v=p?e.length-1-y:y,m=a.left+v*(d+g)+g/2,w=s-a.bottom-b,C=_.color||`var(--lv-chart-${y%8})`,k=C.startsWith("var(")?G0[y%8]:C;c.rectangle(m,w,d,b,{roughness:r,fill:k,fillStyle:"hachure",hachureGap:6,stroke:k,strokeWidth:1.5})}),l.font="11px sans-serif",l.fillStyle="#888",l.textAlign="right";for(let _=0;_<=4;_++){const y=u*_/4,b=s-a.bottom-_/4*f;l.fillText(y.toFixed(1),a.left-8,b+4)}}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}customElements.define("lv-sketch-bar",j0);const W0="https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.min.js",U0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  canvas { display: block; width: 100%; }
`,fo=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class K0 extends F{constructor(){super(...arguments);D(this,"_hasAnimated",!1)}static get observedAttributes(){return["data","x-label","y-label","color","area","roughness"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(U0),this._buildChart()}handleAttributeChange(){this.isConnected&&this._buildChart()}animateIn(e){if(this._hasAnimated||(this._hasAnimated=!0,e))return;const r=this.root.querySelector("canvas");r&&(r.style.opacity="0",r.style.transition="opacity 0.6s ease-out",requestAnimationFrame(()=>{r.style.opacity="1"}))}async _buildChart(){const e=this.jsonAttr("data",[]),r=this.getAttribute("x-label")||"",i=this.getAttribute("y-label")||"",s=this.getAttribute("color")||"",a=this.hasAttribute("area"),o=parseFloat(this.getAttribute("roughness")||"2");if(!e.length){this.render("<canvas></canvas>");return}const c=typeof e[0]=="number"?e.map((T,E)=>({x:E,y:T})):e,l=500,u=260,h={top:20,right:20,bottom:40,left:55};this.render(`<canvas width="${l*2}" height="${u*2}" style="width:${l}px;height:${u}px;"></canvas>`);try{await te(W0)}catch{return}const f=this.root.querySelector("canvas");if(!f)return;const d=window.rough.canvas(f),g=f.getContext("2d");if(!g)return;g.scale(2,2);const p=c.map(T=>T.x),_=c.map(T=>T.y),y=Math.min(...p),b=Math.max(...p),v=Math.min(0,Math.min(..._)),m=Math.max(..._)*1.1,w=l-h.left-h.right,C=u-h.top-h.bottom,k=T=>h.left+(T-y)/(b-y||1)*w,$=T=>h.top+(1-(T-v)/(m-v||1))*C,x=s.startsWith("var(")?fo[0]:s||fo[0];if(d.line(h.left,u-h.bottom,l-h.right,u-h.bottom,{roughness:o*.5,stroke:"#888"}),d.line(h.left,h.top,h.left,u-h.bottom,{roughness:o*.5,stroke:"#888"}),a){const T=[[k(c[0].x),$(v)],...c.map(E=>[k(E.x),$(E.y)]),[k(c[c.length-1].x),$(v)]];d.polygon(T,{roughness:o*.3,fill:x,fillStyle:"hachure",hachureGap:8,hachureAngle:60,stroke:"none",fillWeight:.5})}const S=c.map(T=>[k(T.x),$(T.y)]);d.curve(S,{roughness:o,stroke:x,strokeWidth:2.5}),c.forEach(T=>{d.circle(k(T.x),$(T.y),6,{roughness:o*.5,fill:x,fillStyle:"solid",stroke:x})}),g.font="11px sans-serif",g.fillStyle="#888",g.textAlign="center",r&&g.fillText(r,l/2,u-4),i&&(g.save(),g.translate(12,u/2),g.rotate(-Math.PI/2),g.fillText(i,0,0),g.restore()),g.textAlign="right";for(let T=0;T<=4;T++){const E=v+(m-v)*T/4;g.fillText(E.toFixed(2),h.left-8,$(E)+4)}g.textAlign="center";const M=Math.ceil(c.length/8);for(let T=0;T<c.length;T+=M)g.fillText(String(c[T].x),k(c[T].x),u-h.bottom+16)}}customElements.define("lv-sketch-line",K0);const Z0="https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js",Q0="https://cdn.jsdelivr.net/npm/three@0.164.1/examples/js/controls/OrbitControls.js",J0=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`,zi=["#3b82f6","#8b5cf6","#06b6d4","#22c55e","#f59e0b","#ef4444","#ec4899","#6366f1"];class tg extends F{constructor(){super(...arguments);D(this,"_raf",null);D(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","clusters","auto-rotate","tooltip"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(J0),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}async _buildScene(){const e=this.jsonAttr("data",[]);this.getAttribute("x-label"),this.getAttribute("y-label"),this.getAttribute("z-label");const r=this.hasAttribute("clusters"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!e.length)return;try{await te(Z0),await te(Q0)}catch{return}const s=window.THREE;if(!s)return;const a=this.root.getElementById("scene");if(!a)return;const o=a.clientWidth||500,c=a.clientHeight||375,l=new s.Scene;l.background=new s.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const u=new s.PerspectiveCamera(50,o/c,.1,100);u.position.set(2.5,2,2.5),u.lookAt(0,0,0);const h=new s.WebGLRenderer({antialias:!0});h.setSize(o,c),h.setPixelRatio(window.devicePixelRatio),a.appendChild(h.domElement),this._renderer=h;const f=s.OrbitControls||window.THREE.OrbitControls,d=new f(u,h.domElement);d.enableDamping=!0,d.dampingFactor=.05,d.autoRotate=i,d.autoRotateSpeed=1;const g=e.map(A=>A.x),p=e.map(A=>A.y),_=e.map(A=>A.z),y=A=>{const L=Math.min(...A),O=Math.max(...A)-L||1;return A.map(R=>(R-L)/O*2-1)},b=y(g),v=y(p),m=y(_),w=[...new Set(e.map(A=>A.cluster||""))],C=A=>{const L=w.indexOf(A);return new s.Color(zi[L%zi.length])},k=new s.BufferGeometry,$=new Float32Array(e.length*3),x=new Float32Array(e.length*3);e.forEach((A,L)=>{$[L*3]=b[L],$[L*3+1]=v[L],$[L*3+2]=m[L];const P=r?C(A.cluster||""):new s.Color(zi[0]);x[L*3]=P.r,x[L*3+1]=P.g,x[L*3+2]=P.b}),k.setAttribute("position",new s.BufferAttribute($,3)),k.setAttribute("color",new s.BufferAttribute(x,3));const S=new s.PointsMaterial({size:.06,vertexColors:!0,sizeAttenuation:!0});l.add(new s.Points(k,S));const M=1.2,T=[16729156,4521796,4474111];[[M,0,0],[0,M,0],[0,0,M]].forEach(([A,L,P],O)=>{const R=[new s.Vector3(0,0,0),new s.Vector3(A,L,P)],N=new s.BufferGeometry().setFromPoints(R),I=new s.LineBasicMaterial({color:T[O],opacity:.4,transparent:!0});l.add(new s.Line(N,I))});const E=new s.GridHelper(2,10,3355477,2236996);E.position.y=-1,l.add(E);const z=()=>{this._raf=requestAnimationFrame(z),d.update(),h.render(l,u)};z()}}customElements.define("lv-scatter-3d",tg);const eg="https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js",ng="https://cdn.jsdelivr.net/npm/three@0.164.1/examples/js/controls/OrbitControls.js",rg=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;class ig extends F{constructor(){super(...arguments);D(this,"_raf",null);D(this,"_renderer",null)}static get observedAttributes(){return["data","x-label","y-label","z-label","color-scale","wireframe","auto-rotate"]}connectedCallback(){super.connectedCallback(),this.adoptStyles(rg),this._buildScene()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf),this._renderer&&(this._renderer.dispose(),this._renderer=null)}handleAttributeChange(){this.isConnected&&this._buildScene()}async _buildScene(){const e=this.jsonAttr("data",[]),r=this.hasAttribute("wireframe"),i=this.hasAttribute("auto-rotate");if(this.render('<div class="scene-container" id="scene"></div>'),!e.length||!e[0].length)return;try{await te(eg),await te(ng)}catch{return}const s=window.THREE;if(!s)return;const a=this.root.getElementById("scene");if(!a)return;const o=a.clientWidth||500,c=a.clientHeight||375,l=e.length,u=e[0].length,h=e.flat(),f=Math.min(...h),g=Math.max(...h)-f||1,p=new s.Scene;p.background=new s.Color(getComputedStyle(this).getPropertyValue("--lv-bg-raised").trim()||"#12122a");const _=new s.PerspectiveCamera(50,o/c,.1,100);_.position.set(2.5,2.5,2.5),_.lookAt(0,0,0);const y=new s.WebGLRenderer({antialias:!0});y.setSize(o,c),y.setPixelRatio(window.devicePixelRatio),a.appendChild(y.domElement),this._renderer=y;const b=s.OrbitControls||window.THREE.OrbitControls,v=new b(_,y.domElement);v.enableDamping=!0,v.autoRotate=i,v.autoRotateSpeed=.8;const m=new s.PlaneGeometry(2,2,u-1,l-1),w=m.attributes.position,C=new Float32Array(w.count*3);for(let S=0;S<l;S++)for(let M=0;M<u;M++){const T=S*u+M,E=(e[S][M]-f)/g;w.setZ(T,E-.5);const z=E;let A,L,P;z<.25?(A=0,L=z*4,P=1):z<.5?(A=0,L=1,P=1-(z-.25)*4):z<.75?(A=(z-.5)*4,L=1,P=0):(A=1,L=1-(z-.75)*4,P=0),C[T*3]=A,C[T*3+1]=L,C[T*3+2]=P}m.setAttribute("color",new s.BufferAttribute(C,3)),m.computeVertexNormals(),m.rotateX(-Math.PI/2);const k=r?new s.MeshBasicMaterial({vertexColors:!0,wireframe:!0}):new s.MeshPhongMaterial({vertexColors:!0,side:s.DoubleSide,flatShading:!0});if(p.add(new s.Mesh(m,k)),!r){p.add(new s.AmbientLight(16777215,.4));const S=new s.DirectionalLight(16777215,.8);S.position.set(3,5,3),p.add(S)}const $=new s.GridHelper(2,10,3355477,2236996);$.position.y=-.5,p.add($);const x=()=>{this._raf=requestAnimationFrame(x),v.update(),y.render(p,_)};x()}}customElements.define("lv-surface-3d",ig);const sg=`
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
`,ut=120,Ot=90,Ri=60,Oi=40,po=10,go=2,mo=8,_n=60;function Ni(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class ag extends F{constructor(){super(...arguments);D(this,"_steps",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(sg),this._readChildren(),this._renderSvg()}_readChildren(){this._steps=[],this.querySelectorAll("lv-flow-step").forEach(r=>{this._steps.push({icon:r.getAttribute("icon")||"",label:r.getAttribute("label")||"",sub:r.getAttribute("sub")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",active:r.hasAttribute("active")})})}_renderSvg(){const e=this._steps;if(e.length===0)return;const i=(this.getAttribute("direction")||"horizontal")==="horizontal",s=this.hasAttribute("cyclic"),a=this.isRtl,o=24,c=s?_n+40:0;let l,u;i?(l=o*2+e.length*ut+(e.length-1)*Ri,u=o*2+Ot+c):(l=o*2+ut+c,u=o*2+e.length*Ot+(e.length-1)*Oi);const h=[];for(let v=0;v<e.length;v++)if(i){let m=o+v*(ut+Ri);a&&(m=l-o-ut-v*(ut+Ri)),h.push({x:m,y:o})}else h.push({x:o,y:o+v*(Ot+Oi)});const f="arrowhead",d=mo,g=mo,p=`
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
      </defs>`;let _="";for(let v=0;v<e.length;v++){const m=e[v],w=h[v],C=m.active?m.color:"var(--lv-border, #333)",k=m.active?' filter="url(#glow)"':"";_+=`
        <g class="step-group" style="transition-delay: ${v*150}ms">
          <rect x="${w.x}" y="${w.y}" width="${ut}" height="${Ot}"
                rx="${po}" ry="${po}"
                fill="var(--lv-bg-card, #1e1e2e)"
                stroke="${C}" stroke-width="${m.active?2.5:1.5}"
                ${k} />
          <text x="${w.x+ut/2}" y="${w.y+30}"
                text-anchor="middle" font-size="24" dominant-baseline="central"
                fill="var(--lv-text, #e0e0e0)">
            ${Ni(m.icon)}
          </text>
          <text x="${w.x+ut/2}" y="${w.y+54}"
                text-anchor="middle" font-size="12" font-weight="700"
                fill="var(--lv-text, #e0e0e0)">
            ${Ni(m.label)}
          </text>
          <text x="${w.x+ut/2}" y="${w.y+70}"
                text-anchor="middle" font-size="10"
                fill="var(--lv-text-dim, #888)">
            ${Ni(m.sub)}
          </text>
        </g>`}let y="";for(let v=0;v<e.length-1;v++){const m=h[v],w=h[v+1],C=e.length*150+v*120;let k;if(i){const x=a?m.x:m.x+ut,S=a?w.x+ut:w.x,M=m.y+Ot/2,E=Math.abs(S-x)*.35,z=S>x?1:-1;k=`M${x},${M} C${x+z*E},${M} ${S-z*E},${M} ${S},${M}`}else{const x=m.x+ut/2,S=m.y+Ot,M=w.y,T=(M-S)*.4;k=`M${x},${S} C${x},${S+T} ${x},${M-T} ${x},${M}`}const $=i?Math.abs(h[v+1].x-h[v].x)+20:Oi+Ot;y+=`
        <path class="arrow-path" d="${k}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${go}"
              marker-end="url(#${f})"
              stroke-dasharray="${$}"
              stroke-dashoffset="${$}"
              style="transition-delay: ${C}ms" />`}if(s&&e.length>1){const v=h[0],m=h[e.length-1],w=e.length*150+(e.length-1)*120;let C,k;if(i){const $=m.x+ut/2,x=v.x+ut/2,S=m.y+Ot,M=v.y+Ot,T=Math.max(S,M)+_n;C=`M${$},${S} C${$},${T} ${x},${T} ${x},${M}`,k=Math.abs($-x)+_n*2}else{const $=m.x+ut,x=m.y+Ot/2,S=v.y+Ot/2,M=$+_n;C=`M${$},${x} C${M},${x} ${M},${S} ${$},${S}`,k=Math.abs(x-S)+_n*2}y+=`
        <path class="arrow-path" d="${C}"
              fill="none" stroke="var(--lv-accent2, #a78bfa)"
              stroke-width="${go}"
              marker-end="url(#${f})"
              stroke-dasharray="${k}"
              stroke-dashoffset="${k}"
              style="transition-delay: ${w}ms" />`}const b=`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${l}" height="${u}"
           viewBox="0 0 ${l} ${u}"
           role="img" aria-label="Flow diagram">
        ${p}
        ${y}
        ${_}
      </svg>`;this.render(b)}animateIn(e){e&&(this.root.querySelectorAll(".step-group").forEach(r=>{r.style.transition="none",r.style.opacity="1",r.style.transform="translateY(0)"}),this.root.querySelectorAll(".arrow-path").forEach(r=>{r.style.transition="none",r.style.strokeDashoffset="0"})),this.classList.add("lv-entered")}}class og extends HTMLElement{}customElements.define("lv-flow",ag),customElements.define("lv-flow-step",og);const lg=`
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
`;function _o(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class cg extends F{constructor(){super(...arguments);D(this,"_items",[])}connectedCallback(){super.connectedCallback(),this.adoptStyles(lg),this._readChildren(),this._renderTimeline()}_readChildren(){this._items=[],this.querySelectorAll("lv-timeline-item").forEach(r=>{this._items.push({date:r.getAttribute("date")||"",title:r.getAttribute("title")||"",color:r.getAttribute("color")||"var(--lv-accent, #6366f1)",body:r.innerHTML.trim()})})}_renderTimeline(){if(this._items.length===0)return;let e="";for(let r=0;r<this._items.length;r++){const i=this._items[r];e+=`
        <div class="tl-item" style="animation-delay: ${r*100}ms; --_dot-color: ${i.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${i.date?`<div class="tl-date">${_o(i.date)}</div>`:""}
            ${i.title?`<div class="tl-title">${_o(i.title)}</div>`:""}
            ${i.body?`<div class="tl-body">${i.body}</div>`:""}
          </div>
        </div>`}this.render(`<div class="timeline">${e}</div>`)}animateIn(e){e&&this.root.querySelectorAll(".tl-item").forEach(r=>{r.style.animation="none",r.style.opacity="1",r.style.transform="translateX(0)"}),this.classList.add("lv-entered")}}class ug extends HTMLElement{}customElements.define("lv-timeline",cg),customElements.define("lv-timeline-item",ug);function Ut(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function vo(n,t){n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var wt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Fe={duration:.5,overwrite:!1,delay:0},Di,st,G,Mt=1e8,V=1/Mt,Fi=Math.PI*2,hg=Fi/4,fg=0,yo=Math.sqrt,dg=Math.cos,pg=Math.sin,it=function(t){return typeof t=="string"},Z=function(t){return typeof t=="function"},Kt=function(t){return typeof t=="number"},Ii=function(t){return typeof t>"u"},Bt=function(t){return typeof t=="object"},pt=function(t){return t!==!1},qi=function(){return typeof window<"u"},kr=function(t){return Z(t)||it(t)},xo=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ot=Array.isArray,gg=/random\([^)]+\)/g,mg=/,\s*/g,bo=/(?:-?\.?\d|\.)+/gi,wo=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ie=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Bi=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ko=/[+-]=-?[.\d]+/,_g=/[^,'"\[\]\s]+/gi,vg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,j,Ht,Hi,Vi,kt={},Ar={},Ao,$o=function(t){return(Ar=Be(t,kt))&&_t},Xi=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},vn=function(t,e){return!e&&console.warn(t)},Co=function(t,e){return t&&(kt[t]=e)&&Ar&&(Ar[t]=e)||kt},yn=function(){return 0},yg={suppressEvents:!0,isStart:!0,kill:!1},$r={suppressEvents:!0,kill:!1},xg={suppressEvents:!0},Yi={},ee=[],Gi={},So,At={},ji={},To=30,Cr=[],Wi="",Ui=function(t){var e=t[0],r,i;if(Bt(e)||Z(e)||(t=[t]),!(r=(e._gsap||{}).harness)){for(i=Cr.length;i--&&!Cr[i].targetTest(e););r=Cr[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new rl(t[i],r)))||t.splice(i,1);return t},xe=function(t){return t._gsap||Ui(Lt(t))[0]._gsap},Mo=function(t,e,r){return(r=t[e])&&Z(r)?t[e]():Ii(r)&&t.getAttribute&&t.getAttribute(e)||r},gt=function(t,e){return(t=t.split(",")).forEach(e)||t},Q=function(t){return Math.round(t*1e5)/1e5||0},W=function(t){return Math.round(t*1e7)/1e7||0},qe=function(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),r==="+"?t+i:r==="-"?t-i:r==="*"?t*i:t/i},bg=function(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r},Sr=function(){var t=ee.length,e=ee.slice(0),r,i;for(Gi={},ee.length=0,r=0;r<t;r++)i=e[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ki=function(t){return!!(t._initted||t._startAt||t.add)},Eo=function(t,e,r,i){ee.length&&!st&&Sr(),t.render(e,r,!!(st&&e<0&&Ki(t))),ee.length&&!st&&Sr()},Lo=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(_g).length<2?e:it(t)?t.trim():t},Po=function(t){return t},$t=function(t,e){for(var r in e)r in t||(t[r]=e[r]);return t},wg=function(t){return function(e,r){for(var i in r)i in e||i==="duration"&&t||i==="ease"||(e[i]=r[i])}},Be=function(t,e){for(var r in e)t[r]=e[r];return t},zo=function n(t,e){for(var r in e)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(t[r]=Bt(e[r])?n(t[r]||(t[r]={}),e[r]):e[r]);return t},Tr=function(t,e){var r={},i;for(i in t)i in e||(r[i]=t[i]);return r},xn=function(t){var e=t.parent||j,r=t.keyframes?wg(ot(t.keyframes)):$t;if(pt(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t},kg=function(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0},Ro=function(t,e,r,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Mr=function(t,e,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[r]===e&&(t[r]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},ne=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},be=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t},Ag=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Zi=function(t,e,r,i){return t._startAt&&(st?t._startAt.revert($r):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},$g=function n(t){return!t||t._ts&&n(t.parent)},Oo=function(t){return t._repeat?He(t._tTime,t=t.duration()+t._rDelay)*t:0},He=function(t,e){var r=Math.floor(t=W(t/e));return t&&r===t?r-1:r},Er=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Lr=function(t){return t._end=W(t._start+(t._tDur/Math.abs(t._ts||t._rts||V)||0))},Pr=function(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=W(r._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Lr(t),r._dirty||be(r,t)),t},No=function(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Er(t.rawTime(),e),(!e._dur||wn(0,e.totalDuration(),r)-e._tTime>V)&&e.render(r,!0)),be(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;t._zTime=-V}},Vt=function(t,e,r,i){return e.parent&&ne(e),e._start=W((Kt(r)?r:r||t!==j?Et(t,r,e):t._time)+e._delay),e._end=W(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Ro(t,e,"_first","_last",t._sort?"_start":0),Qi(e)||(t._recent=e),i||No(t,e),t._ts<0&&Pr(t,t._tTime),t},Do=function(t,e){return(kt.ScrollTrigger||Xi("scrollTrigger",e))&&kt.ScrollTrigger.create(e,t)},Fo=function(t,e,r,i,s){if(os(t,e,s),!t._initted)return 1;if(!r&&t._pt&&!st&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&So!==St.frame)return ee.push(t),t._lazy=[s,i],1},Cg=function n(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||n(e))},Qi=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Sg=function(t,e,r,i){var s=t.ratio,a=e<0||!e&&(!t._start&&Cg(t)&&!(!t._initted&&Qi(t))||(t._ts<0||t._dp._ts<0)&&!Qi(t))?0:1,o=t._rDelay,c=0,l,u,h;if(o&&t._repeat&&(c=wn(0,t._tDur,e),u=He(c,o),t._yoyo&&u&1&&(a=1-a),u!==He(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||st||i||t._zTime===V||!e&&t._zTime){if(!t._initted&&Fo(t,e,i,r,c))return;for(h=t._zTime,t._zTime=e||(r?V:0),r||(r=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&Zi(t,e,r,!0),t._onUpdate&&!r&&Ct(t,"onUpdate"),c&&t._repeat&&!r&&t.parent&&Ct(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ne(t,1),!r&&!st&&(Ct(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Tg=function(t,e,r){var i;if(r>e)for(i=t._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ve=function(t,e,r,i){var s=t._repeat,a=W(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:W(a*(s+1)+t._rDelay*s):a,o>0&&!i&&Pr(t,t._tTime=t._tDur*o),t.parent&&Lr(t),r||be(t.parent,t),t},Io=function(t){return t instanceof ht?be(t):Ve(t,t._dur)},Mg={_start:0,endTime:yn,totalDuration:yn},Et=function n(t,e,r){var i=t.labels,s=t._recent||Mg,a=t.duration()>=Mt?s.endTime(!1):t._dur,o,c,l;return it(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:r).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&r&&(c=c/100*(ot(r)?r[0]:r).totalDuration()),o>1?n(t,e.substr(0,o-1),r)+c:a+c)):e==null?a:+e},bn=function(t,e,r){var i=Kt(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=r,t){for(o=a,c=r;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=pt(c.vars.inherit)&&c.parent;a.immediateRender=pt(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new tt(e[0],a,e[s+1])},re=function(t,e){return t||t===0?e(t):e},wn=function(t,e,r){return r<t?t:r>e?e:r},lt=function(t,e){return!it(t)||!(e=vg.exec(t))?"":e[1]},Eg=function(t,e,r){return re(r,function(i){return wn(t,e,i)})},Ji=[].slice,qo=function(t,e){return t&&Bt(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Bt(t[0]))&&!t.nodeType&&t!==Ht},Lg=function(t,e,r){return r===void 0&&(r=[]),t.forEach(function(i){var s;return it(i)&&!e||qo(i,1)?(s=r).push.apply(s,Lt(i)):r.push(i)})||r},Lt=function(t,e,r){return G&&!e&&G.selector?G.selector(t):it(t)&&!r&&(Hi||!Ye())?Ji.call((e||Vi).querySelectorAll(t),0):ot(t)?Lg(t,r):qo(t)?Ji.call(t,0):t?[t]:[]},ts=function(t){return t=Lt(t)[0]||vn("Invalid scope")||{},function(e){var r=t.current||t.nativeElement||t;return Lt(e,r.querySelectorAll?r:r===t?vn("Invalid scope")||Vi.createElement("div"):t)}},Bo=function(t){return t.sort(function(){return .5-Math.random()})},Ho=function(t){if(Z(t))return t;var e=Bt(t)?t:{each:t},r=we(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,u=i,h=i;return it(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(u=i[0],h=i[1]),function(f,d,g){var p=(g||e).length,_=a[p],y,b,v,m,w,C,k,$,x;if(!_){if(x=e.grid==="auto"?0:(e.grid||[1,Mt])[1],!x){for(k=-Mt;k<(k=g[x++].getBoundingClientRect().left)&&x<p;);x<p&&x--}for(_=a[p]=[],y=c?Math.min(x,p)*u-.5:i%x,b=x===Mt?0:c?p*h/x-.5:i/x|0,k=0,$=Mt,C=0;C<p;C++)v=C%x-y,m=b-(C/x|0),_[C]=w=l?Math.abs(l==="y"?m:v):yo(v*v+m*m),w>k&&(k=w),w<$&&($=w);i==="random"&&Bo(_),_.max=k-$,_.min=$,_.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(x>p?p-1:l?l==="y"?p/x:x:Math.max(x,p/x))||0)*(i==="edges"?-1:1),_.b=p<0?s-p:s,_.u=lt(e.amount||e.each)||0,r=r&&p<0?tl(r):r}return p=(_[f]-_.min)/_.max||0,W(_.b+(r?r(p):p)*_.v)+_.u}},es=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(r){var i=W(Math.round(parseFloat(r)/t)*t*e);return(i-i%1)/e+(Kt(r)?0:lt(r))}},Vo=function(t,e){var r=ot(t),i,s;return!r&&Bt(t)&&(i=r=t.radius||Mt,t.values?(t=Lt(t.values),(s=!Kt(t[0]))&&(i*=i)):t=es(t.increment)),re(e,r?Z(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=Mt,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-o,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-o),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:a,s||u===a||Kt(a)?u:u+lt(a)}:es(t))},Xo=function(t,e,r,i){return re(ot(t)?!e:r===!0?!!(r=0):!i,function(){return ot(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+r*.99))/r)*r*i)/i})},Pg=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(i){return e.reduce(function(s,a){return a(s)},i)}},zg=function(t,e){return function(r){return t(parseFloat(r))+(e||lt(r))}},Rg=function(t,e,r){return Go(t,e,0,1,r)},Yo=function(t,e,r){return re(r,function(i){return t[~~e(i)]})},Og=function n(t,e,r){var i=e-t;return ot(t)?Yo(t,n(0,t.length),e):re(r,function(s){return(i+(s-t)%i)%i+t})},Ng=function n(t,e,r){var i=e-t,s=i*2;return ot(t)?Yo(t,n(0,t.length-1),e):re(r,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},kn=function(t){return t.replace(gg,function(e){var r=e.indexOf("[")+1,i=e.substring(r||7,r?e.indexOf("]"):e.length-1).split(mg);return Xo(r?i:+i[0],r?0:+i[1],+i[2]||1e-5)})},Go=function(t,e,r,i,s){var a=e-t,o=i-r;return re(s,function(c){return r+((c-t)/a*o||0)})},Dg=function n(t,e,r,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=it(t),o={},c,l,u,h,f;if(r===!0&&(i=1)&&(r=null),a)t={p:t},e={p:e};else if(ot(t)&&!ot(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(n(t[l-1],t[l]));h--,s=function(g){g*=h;var p=Math.min(f,~~g);return u[p](g-p)},r=e}else i||(t=Be(ot(t)?[]:{},t));if(!u){for(c in e)ss.call(o,t,c,"get",e[c]);s=function(g){return us(g,o)||(a?t.p:t)}}}return re(r,s)},jo=function(t,e,r){var i=t.labels,s=Mt,a,o,c;for(a in i)o=i[a]-e,o<0==!!r&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},Ct=function(t,e,r){var i=t.vars,s=i[e],a=G,o=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,r&&ee.length&&Sr(),o&&(G=o),u=c?s.apply(l,c):s.call(l),G=a,u},An=function(t){return ne(t),t.scrollTrigger&&t.scrollTrigger.kill(!!st),t.progress()<1&&Ct(t,"onInterrupt"),t},Xe,Wo=[],Uo=function(t){if(t)if(t=!t.name&&t.default||t,qi()||t.headless){var e=t.name,r=Z(t),i=e&&!r&&t.init?function(){this._props=[]}:t,s={init:yn,render:us,add:ss,kill:Jg,modifier:Qg,rawVars:0},a={targetTest:0,get:0,getSetter:cs,aliases:{},register:0};if(Ye(),t!==i){if(At[e])return;$t(i,$t(Tr(t,s),a)),Be(i.prototype,Be(s,Tr(t,a))),At[i.prop=e]=i,t.targetTest&&(Cr.push(i),Yi[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Co(e,i),t.register&&t.register(_t,i,mt)}else Wo.push(t)},X=255,$n={aqua:[0,X,X],lime:[0,X,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,X],navy:[0,0,128],white:[X,X,X],olive:[128,128,0],yellow:[X,X,0],orange:[X,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[X,0,0],pink:[X,192,203],cyan:[0,X,X],transparent:[X,X,X,0]},ns=function(t,e,r){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(r-e)*t*6:t<.5?r:t*3<2?e+(r-e)*(2/3-t)*6:e)*X+.5|0},Ko=function(t,e,r){var i=t?Kt(t)?[t>>16,t>>8&X,t&X]:0:$n.black,s,a,o,c,l,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),$n[t])i=$n[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&X,i&X,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&X,t&X]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(bo),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(l+1):u+l-u*l,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=ns(c+1/3,s,a),i[1]=ns(c,s,a),i[2]=ns(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match(wo),r&&i.length<4&&(i[3]=1),i}else i=t.match(bo)||$n.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/X,a=i[1]/X,o=i[2]/X,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),r&&i.length<4&&(i[3]=1),i},Zo=function(t){var e=[],r=[],i=-1;return t.split(ie).forEach(function(s){var a=s.match(Ie)||[];e.push.apply(e,a),r.push(i+=a.length+1)}),e.c=r,e},Qo=function(t,e,r){var i="",s=(t+i).match(ie),a=e?"hsla(":"rgba(",o=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Ko(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),r&&(u=Zo(t),c=r.c,c.join(i)!==u.c.join(i)))for(l=t.replace(ie,"1").split(Ie),h=l.length-1;o<h;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:r).shift());if(!l)for(l=t.split(ie),h=l.length-1;o<h;o++)i+=l[o]+s[o];return i+l[h]},ie=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in $n)n+="|"+t+"\\b";return new RegExp(n+")","gi")})(),Fg=/hsl[a]?\(/,Jo=function(t){var e=t.join(" "),r;if(ie.lastIndex=0,ie.test(e))return r=Fg.test(e),t[1]=Qo(t[1],r),t[0]=Qo(t[0],r,Zo(t[1])),!0},Cn,St=(function(){var n=Date.now,t=500,e=33,r=n(),i=r,s=1e3/240,a=s,o=[],c,l,u,h,f,d,g=function p(_){var y=n()-i,b=_===!0,v,m,w,C;if((y>t||y<0)&&(r+=y-e),i+=y,w=i-r,v=w-a,(v>0||b)&&(C=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,a+=v+(v>=s?4:s-v),m=1),b||(c=l(p)),m)for(d=0;d<o.length;d++)o[d](w,f,C,_)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(_){return f/(1e3/(_||60))},wake:function(){Ao&&(!Hi&&qi()&&(Ht=Hi=window,Vi=Ht.document||{},kt.gsap=_t,(Ht.gsapVersions||(Ht.gsapVersions=[])).push(_t.version),$o(Ar||Ht.GreenSockGlobals||!Ht.gsap&&Ht||{}),Wo.forEach(Uo)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(_){return setTimeout(_,a-h.time*1e3+1|0)},Cn=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Cn=0,l=yn},lagSmoothing:function(_,y){t=_||1/0,e=Math.min(y||33,t)},fps:function(_){s=1e3/(_||240),a=h.time*1e3+s},add:function(_,y,b){var v=y?function(m,w,C,k){_(m,w,C,k),h.remove(v)}:_;return h.remove(_),o[b?"unshift":"push"](v),Ye(),v},remove:function(_,y){~(y=o.indexOf(_))&&o.splice(y,1)&&d>=y&&d--},_listeners:o},h})(),Ye=function(){return!Cn&&St.wake()},H={},Ig=/^[\d.\-M][\d.\-,\s]/,qg=/["']/g,Bg=function(t){for(var e={},r=t.substr(1,t.length-3).split(":"),i=r[0],s=1,a=r.length,o,c,l;s<a;s++)c=r[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(qg,"").trim():+l,i=c.substr(o+1).trim();return e},Hg=function(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)},Vg=function(t){var e=(t+"").split("("),r=H[e[0]];return r&&e.length>1&&r.config?r.config.apply(null,~t.indexOf("{")?[Bg(e[1])]:Hg(t).split(",").map(Lo)):H._CE&&Ig.test(t)?H._CE("",t):r},tl=function(t){return function(e){return 1-t(1-e)}},el=function n(t,e){for(var r=t._first,i;r;)r instanceof ht?n(r,e):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==e&&(r.timeline?n(r.timeline,e):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=e)),r=r._next},we=function(t,e){return t&&(Z(t)?t:H[t]||Vg(t))||e},ke=function(t,e,r,i){r===void 0&&(r=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:r,easeInOut:i},a;return gt(t,function(o){H[o]=kt[o]=s,H[a=o.toLowerCase()]=r;for(var c in s)H[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=H[o+"."+c]=s[c]}),s},nl=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},rs=function n(t,e,r){var i=e>=1?e:1,s=(r||(t?.3:.45))/(e<1?e:1),a=s/Fi*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*pg((u-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:nl(o);return s=Fi/s,c.config=function(l,u){return n(t,l,u)},c},is=function n(t,e){e===void 0&&(e=1.70158);var r=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?r:t==="in"?function(s){return 1-r(1-s)}:nl(r);return i.config=function(s){return n(t,s)},i};gt("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,t){var e=t<5?t+1:t;ke(n+",Power"+(e-1),t?function(r){return Math.pow(r,e)}:function(r){return r},function(r){return 1-Math.pow(1-r,e)},function(r){return r<.5?Math.pow(r*2,e)/2:1-Math.pow((1-r)*2,e)/2})}),H.Linear.easeNone=H.none=H.Linear.easeIn,ke("Elastic",rs("in"),rs("out"),rs()),(function(n,t){var e=1/t,r=2*e,i=2.5*e,s=function(o){return o<e?n*o*o:o<r?n*Math.pow(o-1.5/t,2)+.75:o<i?n*(o-=2.25/t)*o+.9375:n*Math.pow(o-2.625/t,2)+.984375};ke("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75),ke("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)}),ke("Circ",function(n){return-(yo(1-n*n)-1)}),ke("Sine",function(n){return n===1?1:-dg(n*hg)+1}),ke("Back",is("in"),is("out"),is()),H.SteppedEase=H.steps=kt.SteppedEase={config:function(t,e){t===void 0&&(t=1);var r=1/t,i=t+(e?0:1),s=e?1:0,a=1-V;return function(o){return((i*wn(0,a,o)|0)+s)*r}}},Fe.ease=H["quad.out"],gt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Wi+=n+","+n+"Params,"});var rl=function(t,e){this.id=fg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Mo,this.set=e?e.getSetter:cs},Sn=(function(){function n(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ve(this,+e.duration,1,1),this.data=e.data,G&&(this._ctx=G,G.data.push(this)),Cn||St.wake()}var t=n.prototype;return t.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},t.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},t.totalDuration=function(r){return arguments.length?(this._dirty=0,Ve(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(r,i){if(Ye(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Pr(this,r),!s._dp||s.parent||No(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&Vt(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===V||!this._initted&&this._dur&&r||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),Eo(this,r,i)),this},t.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+Oo(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},t.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+Oo(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(r,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*s,i):this._repeat?He(this._tTime,s)+1:1},t.timeScale=function(r,i){if(!arguments.length)return this._rts===-V?0:this._rts;if(this._rts===r)return this;var s=this.parent&&this._ts?Er(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-V?0:this._rts,this.totalTime(wn(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Lr(this),Ag(this)},t.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ye(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==V&&(this._tTime-=V)))),this):this._ps},t.startTime=function(r){if(arguments.length){this._start=W(r);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Vt(i,this,this._start-this._delay),this}return this._start},t.endTime=function(r){return this._start+(pt(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Er(i.rawTime(r),this):this._tTime:this._tTime},t.revert=function(r){r===void 0&&(r=xg);var i=st;return st=r,Ki(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),st=i,this},t.globalTime=function(r){for(var i=this,s=arguments.length?r:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):s},t.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,Io(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,Io(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},t.seek=function(r,i){return this.totalTime(Et(this,r),pt(i))},t.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,pt(i)),this._dur||(this._zTime=-V),this},t.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},t.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-V:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-V,this},t.isActive=function(){var r=this.parent||this._dp,i=this._start,s;return!!(!r||this._ts&&this._initted&&r.isActive()&&(s=r.rawTime(!0))>=i&&s<this.endTime(!0)-V)},t.eventCallback=function(r,i,s){var a=this.vars;return arguments.length>1?(i?(a[r]=i,s&&(a[r+"Params"]=s),r==="onUpdate"&&(this._onUpdate=i)):delete a[r],this):a[r]},t.then=function(r){var i=this,s=i._prom;return new Promise(function(a){var o=Z(r)?r:Po,c=function(){var u=i.then;i.then=null,s&&s(),Z(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){An(this)},n})();$t(Sn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-V,_prom:0,_ps:!1,_rts:1});var ht=(function(n){vo(t,n);function t(r,i){var s;return r===void 0&&(r={}),s=n.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=pt(r.sortChildren),j&&Vt(r.parent||j,Ut(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&Do(Ut(s),r.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return bn(0,arguments,this),this},e.from=function(i,s,a){return bn(1,arguments,this),this},e.fromTo=function(i,s,a,o){return bn(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,xn(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new tt(i,s,Et(this,a),1),this},e.call=function(i,s,a){return Vt(this,tt.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new tt(i,a,Et(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,u){return a.runBackwards=1,xn(a).immediateRender=pt(a.immediateRender),this.staggerTo(i,s,a,o,c,l,u)},e.staggerFromTo=function(i,s,a,o,c,l,u,h){return o.startAt=a,xn(o).immediateRender=pt(o.immediateRender),this.staggerTo(i,s,o,c,l,u,h)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:W(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,p,_,y,b,v,m,w,C,k;if(this!==j&&u>c&&i>=0&&(u=c),u!==this._tTime||a||h){if(o!==this._time&&l&&(u+=this._time-o,i+=this._time-o),f=u,m=this._start,v=this._ts,y=!v,h&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,_=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(_*100+i,s,a);if(f=W(u%_),u===c?(p=this._repeat,f=l):(w=W(u/_),p=~~w,p&&p===w&&(f=l,p--),f>l&&(f=l)),w=He(this._tTime,_),!o&&this._tTime&&w!==p&&this._tTime-w*_-this._dur<=0&&(w=p),C&&p&1&&(f=l-f,k=1),p!==w&&!this._lock){var $=C&&w&1,x=$===(C&&p&1);if(p<w&&($=!$),o=$?0:u%l?l:u,this._lock=1,this.render(o||(k?0:W(p*_)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&Ct(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,w=p),o&&o!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,x&&(this._lock=2,o=$?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!y)return this;el(this,k)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Tg(this,W(o),W(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&l&&!s&&!w&&(Ct(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!y){b=0,g&&(u+=this._zTime=-V);break}}d=g}else{d=this._last;for(var S=i<0?i:f;d;){if(g=d._prev,(d._act||S<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(S-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(S-d._start)*d._ts,s,a||st&&Ki(d)),f!==this._time||!this._ts&&!y){b=0,g&&(u+=this._zTime=S?-V:V);break}}d=g}}if(b&&!s&&(this.pause(),b.render(f>=o?0:-V)._zTime=f>=o?1:-1,this._ts))return this._start=m,Lr(this),this.render(i,s,a);this._onUpdate&&!s&&Ct(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&o)&&(m===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&ne(this,1),!s&&!(i<0&&!o)&&(u||o||!c)&&(Ct(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Kt(s)||(s=Et(this,s,i)),!(i instanceof Sn)){if(ot(i))return i.forEach(function(o){return a.add(o,s)}),this;if(it(i))return this.addLabel(i,s);if(Z(i))i=tt.delayedCall(0,i);else return this}return this!==i?Vt(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Mt);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof tt?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return it(i)?this.removeLabel(i):Z(i)?this.killTweensOf(i):(i.parent===this&&Mr(this,i),i===this._recent&&(this._recent=this._last),be(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=W(St.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),n.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Et(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=tt.delayedCall(0,s||yn,a);return o.data="isPause",this._hasPause=1,Vt(this,o,Et(this,i))},e.removePause=function(i){var s=this._first;for(i=Et(this,i);s;)s._start===i&&s.data==="isPause"&&ne(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)se!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Lt(i),c=this._first,l=Kt(s),u;c;)c instanceof tt?bg(c._targets,o)&&(l?(!se||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(u=c.getTweensOf(o,s)).length&&a.push.apply(a,u),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Et(a,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=tt.to(a,$t({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||V,onStart:function(){if(a.pause(),!d){var _=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());g._dur!==_&&Ve(g,_,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,$t({startAt:{time:Et(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),jo(this,Et(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),jo(this,Et(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+V)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=W(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return be(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return n.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),be(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=Mt,l,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Vt(a,o,u-o._delay,1)._lock=0):c=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=W(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;Ve(a,a===j&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(j._ts&&(Eo(j,Er(i,j)),So=St.frame),St.frame>=To){To+=wt.autoSleep||120;var s=j._first;if((!s||!s._ts)&&wt.autoSleep&&St._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||St.sleep()}}},t})(Sn);$t(ht.prototype,{_lock:0,_hasPause:0,_forcing:0});var Xg=function(t,e,r,i,s,a,o){var c=new mt(this._pt,t,e,0,1,cl,null,s),l=0,u=0,h,f,d,g,p,_,y,b;for(c.b=r,c.e=i,r+="",i+="",(y=~i.indexOf("random("))&&(i=kn(i)),a&&(b=[r,i],a(b,t,e),r=b[0],i=b[1]),f=r.match(Bi)||[];h=Bi.exec(i);)g=h[0],p=i.substring(l,h.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(_=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:p||u===1?p:",",s:_,c:g.charAt(1)==="="?qe(_,g)-_:parseFloat(g)-_,m:d&&d<4?Math.round:0},l=Bi.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(ko.test(i)||y)&&(c.e=0),this._pt=c,c},ss=function(t,e,r,i,s,a,o,c,l,u){Z(i)&&(i=i(s||0,t,a));var h=t[e],f=r!=="get"?r:Z(h)?l?t[e.indexOf("set")||!Z(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=Z(h)?l?Ug:ol:ls,g;if(it(i)&&(~i.indexOf("random(")&&(i=kn(i)),i.charAt(1)==="="&&(g=qe(f,i)+(lt(f)||0),(g||g===0)&&(i=g))),!u||f!==i||as)return!isNaN(f*i)&&i!==""?(g=new mt(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?Zg:ll,0,d),l&&(g.fp=l),o&&g.modifier(o,this,t),this._pt=g):(!h&&!(e in t)&&Xi(e,i),Xg.call(this,t,e,f,i,d,c||wt.stringFilter,l))},Yg=function(t,e,r,i,s){if(Z(t)&&(t=Tn(t,s,e,r,i)),!Bt(t)||t.style&&t.nodeType||ot(t)||xo(t))return it(t)?Tn(t,s,e,r,i):t;var a={},o;for(o in t)a[o]=Tn(t[o],s,e,r,i);return a},il=function(t,e,r,i,s,a){var o,c,l,u;if(At[t]&&(o=new At[t]).init(s,o.rawVars?e[t]:Yg(e[t],i,s,a,r),r,i,a)!==!1&&(r._pt=c=new mt(r._pt,s,t,0,1,o.render,o,0,o.priority),r!==Xe))for(l=r._ptLookup[r._targets.indexOf(s)],u=o._props.length;u--;)l[o._props[u]]=c;return o},se,as,os=function n(t,e,r){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,p=t._startAt,_=t._targets,y=t.parent,b=y&&y.data==="nested"?y.vars.targets:_,v=t._overwrite==="auto"&&!Di,m=t.timeline,w,C,k,$,x,S,M,T,E,z,A,L,P;if(m&&(!f||!s)&&(s="none"),t._ease=we(s,Fe.ease),t._yEase=h?tl(we(h===!0?s:h,Fe.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!m&&!!i.runBackwards,!m||f&&!i.stagger){if(T=_[0]?xe(_[0]).harness:0,L=T&&i[T.prop],w=Tr(i,Yi),p&&(p._zTime<0&&p.progress(1),e<0&&u&&o&&!d?p.render(-1,!0):p.revert(u&&g?$r:yg),p._lazy=0),a){if(ne(t._startAt=tt.set(_,$t({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!p&&pt(c),startAt:null,delay:0,onUpdate:l&&function(){return Ct(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(st||!o&&!d)&&t._startAt.revert($r),o&&g&&e<=0&&r<=0){e&&(t._zTime=e);return}}else if(u&&g&&!p){if(e&&(o=!1),k=$t({overwrite:!1,data:"isFromStart",lazy:o&&!p&&pt(c),immediateRender:o,stagger:0,parent:y},w),L&&(k[T.prop]=L),ne(t._startAt=tt.set(_,k)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(st?t._startAt.revert($r):t._startAt.render(-1,!0)),t._zTime=e,!o)n(t._startAt,V,V);else if(!e)return}for(t._pt=t._ptCache=0,c=g&&pt(c)||c&&!g,C=0;C<_.length;C++){if(x=_[C],M=x._gsap||Ui(_)[C]._gsap,t._ptLookup[C]=z={},Gi[M.id]&&ee.length&&Sr(),A=b===_?C:b.indexOf(x),T&&(E=new T).init(x,L||w,t,A,b)!==!1&&(t._pt=$=new mt(t._pt,x,E.name,0,1,E.render,E,0,E.priority),E._props.forEach(function(O){z[O]=$}),E.priority&&(S=1)),!T||L)for(k in w)At[k]&&(E=il(k,w,t,A,x,b))?E.priority&&(S=1):z[k]=$=ss.call(t,x,k,"get",w[k],A,b,0,i.stringFilter);t._op&&t._op[C]&&t.kill(x,t._op[C]),v&&t._pt&&(se=t,j.killTweensOf(x,z,t.globalTime(e)),P=!t.parent,se=0),t._pt&&c&&(Gi[M.id]=1)}S&&ul(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!P,f&&e<=0&&m.render(Mt,!0,!0)},Gg=function(t,e,r,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return as=1,t.vars[e]="+=0",os(t,o),as=0,c?vn(e+" not eligible for reset"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=r-u.s,h.e&&(h.e=Q(r)+lt(h.e)),h.b&&(h.b=u.s+lt(h.b))},jg=function(t,e){var r=t[0]?xe(t[0]).harness:0,i=r&&r.aliases,s,a,o,c;if(!i)return e;s=Be({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},Wg=function(t,e,r,i){var s=e.ease||i||"power1.inOut",a,o;if(ot(e))o=r[t]||(r[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=r[a]||(r[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},Tn=function(t,e,r,i,s){return Z(t)?t.call(e,r,i,s):it(t)&&~t.indexOf("random(")?kn(t):t},sl=Wi+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",al={};gt(sl+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return al[n]=1});var tt=(function(n){vo(t,n);function t(r,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=n.call(this,a?i:xn(i))||this;var c=o.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,p=c.defaults,_=c.scrollTrigger,y=c.yoyoEase,b=i.parent||j,v=(ot(r)||xo(r)?Kt(r[0]):"length"in i)?[r]:Lt(r),m,w,C,k,$,x,S,M;if(o._targets=v.length?Ui(v):vn("GSAP target "+r+" not found. https://gsap.com",!wt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||f||kr(l)||kr(u)){if(i=o.vars,m=o.timeline=new ht({data:"nested",defaults:p||{},targets:b&&b.data==="nested"?b.vars.targets:v}),m.kill(),m.parent=m._dp=Ut(o),m._start=0,f||kr(l)||kr(u)){if(k=v.length,S=f&&Ho(f),Bt(f))for($ in f)~sl.indexOf($)&&(M||(M={}),M[$]=f[$]);for(w=0;w<k;w++)C=Tr(i,al),C.stagger=0,y&&(C.yoyoEase=y),M&&Be(C,M),x=v[w],C.duration=+Tn(l,Ut(o),w,x,v),C.delay=(+Tn(u,Ut(o),w,x,v)||0)-o._delay,!f&&k===1&&C.delay&&(o._delay=u=C.delay,o._start+=u,C.delay=0),m.to(x,C,S?S(w,x,v):0),m._ease=H.none;m.duration()?l=u=0:o.timeline=0}else if(g){xn($t(m.vars.defaults,{ease:"none"})),m._ease=we(g.ease||i.ease||"none");var T=0,E,z,A;if(ot(g))g.forEach(function(L){return m.to(v,L,">")}),m.duration();else{C={};for($ in g)$==="ease"||$==="easeEach"||Wg($,g[$],C,g.easeEach);for($ in C)for(E=C[$].sort(function(L,P){return L.t-P.t}),T=0,w=0;w<E.length;w++)z=E[w],A={ease:z.e,duration:(z.t-(w?E[w-1].t:0))/100*l},A[$]=z.v,m.to(v,A,T),T+=A.duration;m.duration()<l&&m.to({},{duration:l-m.duration()})}}l||o.duration(l=m.duration())}else o.timeline=0;return d===!0&&!Di&&(se=Ut(o),j.killTweensOf(v),se=0),Vt(b,Ut(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!l&&!g&&o._start===W(b._time)&&pt(h)&&$g(Ut(o))&&b.data!=="nested")&&(o._tTime=-V,o.render(Math.max(0,-u)||0)),_&&Do(Ut(o),_),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-V&&!u?c:i<V?0:i,f,d,g,p,_,y,b,v,m;if(!l)Sg(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,a);if(f=W(h%p),h===c?(g=this._repeat,f=l):(_=W(h/p),g=~~_,g&&g===_?(f=l,g--):f>l&&(f=l)),y=this._yoyo&&g&1,y&&(m=this._yEase,f=l-f),_=He(this._tTime,p),f===o&&!a&&this._initted&&g===_)return this._tTime=h,this;g!==_&&(v&&this._yEase&&el(v,y),this.vars.repeatRefresh&&!y&&!this._lock&&f!==p&&this._initted&&(this._lock=a=1,this.render(W(p*g),!0).invalidate()._lock=0))}if(!this._initted){if(Fo(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==_))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(m||this._ease)(f/l),this._from&&(this.ratio=b=1-b),!o&&h&&!s&&!_&&(Ct(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Zi(this,i,s,a),Ct(this,"onUpdate")),this._repeat&&g!==_&&this.vars.onRepeat&&!s&&this.parent&&Ct(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Zi(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&ne(this,1),!s&&!(u&&!o)&&(h||o||y)&&(Ct(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),n.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){Cn||St.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||os(this,l),u=this._ease(l/this._dur),Gg(this,i,s,a,o,u,l,c)?this.resetTo(i,s,a,o,1):(Pr(this,0),this.parent||Ro(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?An(this):this.scrollTrigger&&this.scrollTrigger.kill(!!st),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,se&&se.vars.overwrite!==!0)._first||An(this),this.parent&&a!==this.timeline.totalDuration()&&Ve(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?Lt(i):o,l=this._ptLookup,u=this._pt,h,f,d,g,p,_,y;if((!s||s==="all")&&kg(o,c))return s==="all"&&(this._pt=0),An(this);for(h=this._op=this._op||[],s!=="all"&&(it(s)&&(p={},gt(s,function(b){return p[b]=1}),s=p),s=jg(o,s)),y=o.length;y--;)if(~c.indexOf(o[y])){f=l[y],s==="all"?(h[y]=s,g=f,d={}):(d=h[y]=h[y]||{},g=s);for(p in g)_=f&&f[p],_&&((!("kill"in _.d)||_.d.kill(p)===!0)&&Mr(this,_,"_pt"),delete f[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&An(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return bn(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return bn(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return j.killTweensOf(i,s,a)},t})(Sn);$t(tt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),gt("staggerTo,staggerFrom,staggerFromTo",function(n){tt[n]=function(){var t=new ht,e=Ji.call(arguments,0);return e.splice(n==="staggerFromTo"?5:4,0,0),t[n].apply(t,e)}});var ls=function(t,e,r){return t[e]=r},ol=function(t,e,r){return t[e](r)},Ug=function(t,e,r,i){return t[e](i.fp,r)},Kg=function(t,e,r){return t.setAttribute(e,r)},cs=function(t,e){return Z(t[e])?ol:Ii(t[e])&&t.setAttribute?Kg:ls},ll=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Zg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},cl=function(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round((r.s+r.c*t)*1e4)/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},us=function(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},Qg=function(t,e,r,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,r),s=a},Jg=function(t){for(var e=this._pt,r,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Mr(this,e,"_pt"):e.dep||(r=1),e=i;return!r},tm=function(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)},ul=function(t){for(var e=t._pt,r,i,s,a;e;){for(r=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=r}t._pt=s},mt=(function(){function n(e,r,i,s,a,o,c,l,u){this.t=r,this.s=s,this.c=a,this.p=i,this.r=o||ll,this.d=c||this,this.set=l||ls,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=n.prototype;return t.modifier=function(r,i,s){this.mSet=this.mSet||this.set,this.set=tm,this.m=r,this.mt=s,this.tween=i},n})();gt(Wi+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Yi[n]=1}),kt.TweenMax=kt.TweenLite=tt,kt.TimelineLite=kt.TimelineMax=ht,j=new ht({sortChildren:!1,defaults:Fe,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),wt.stringFilter=Jo;var Ae=[],zr={},em=[],hl=0,nm=0,hs=function(t){return(zr[t]||em).map(function(e){return e()})},fs=function(){var t=Date.now(),e=[];t-hl>2&&(hs("matchMediaInit"),Ae.forEach(function(r){var i=r.queries,s=r.conditions,a,o,c,l;for(o in i)a=Ht.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(r.revert(),c&&e.push(r))}),hs("matchMediaRevert"),e.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),hl=t,hs("matchMedia"))},fl=(function(){function n(e,r){this.selector=r&&ts(r),this.data=[],this._r=[],this.isReverted=!1,this.id=nm++,e&&this.add(e)}var t=n.prototype;return t.add=function(r,i,s){Z(r)&&(s=i,i=r,r=Z);var a=this,o=function(){var l=G,u=a.selector,h;return l&&l!==a&&l.data.push(a),s&&(a.selector=ts(s)),G=a,h=i.apply(a,arguments),Z(h)&&a._r.push(h),G=l,a.selector=u,a.isReverted=!1,h};return a.last=o,r===Z?o(a,function(c){return a.add(null,c)}):r?a[r]=o:o},t.ignore=function(r){var i=G;G=null,r(this),G=i},t.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof n?r.push.apply(r,i.getTweens()):i instanceof tt&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(r,i){var s=this;if(r?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(r)}),c=s.data.length;c--;)l=s.data[c],l instanceof ht?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof tt)&&l.revert&&l.revert(r);s._r.forEach(function(u){return u(r,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Ae.length;a--;)Ae[a].id===this.id&&Ae.splice(a,1)},t.revert=function(r){this.kill(r||{})},n})(),rm=(function(){function n(e){this.contexts=[],this.scope=e,G&&G.data.push(this)}var t=n.prototype;return t.add=function(r,i,s){Bt(r)||(r={matches:r});var a=new fl(0,s||this.scope),o=a.conditions={},c,l,u;G&&!a.selector&&(a.selector=G.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=r;for(l in r)l==="all"?u=1:(c=Ht.matchMedia(r[l]),c&&(Ae.indexOf(a)<0&&Ae.push(a),(o[l]=c.matches)&&(u=1),c.addListener?c.addListener(fs):c.addEventListener("change",fs)));return u&&i(a,function(h){return a.add(null,h)}),this},t.revert=function(r){this.kill(r||{})},t.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},n})(),Rr={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(i){return Uo(i)})},timeline:function(t){return new ht(t)},getTweensOf:function(t,e){return j.getTweensOf(t,e)},getProperty:function(t,e,r,i){it(t)&&(t=Lt(t)[0]);var s=xe(t||{}).get,a=r?Po:Lo;return r==="native"&&(r=""),t&&(e?a((At[e]&&At[e].get||s)(t,e,r,i)):function(o,c,l){return a((At[o]&&At[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,r){if(t=Lt(t),t.length>1){var i=t.map(function(u){return _t.quickSetter(u,e,r)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var a=At[e],o=xe(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(u){var h=new a;Xe._pt=0,h.init(t,r?u+r:u,Xe,0,[t]),h.render(1,h),Xe._pt&&us(1,Xe)}:o.set(t,c);return a?l:function(u){return l(t,c,r?u+r:u,o,1)}},quickTo:function(t,e,r){var i,s=_t.to(t,$t((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),a=function(c,l,u){return s.resetTo(e,c,l,u)};return a.tween=s,a},isTweening:function(t){return j.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=we(t.ease,Fe.ease)),zo(Fe,t||{})},config:function(t){return zo(wt,t||{})},registerEffect:function(t){var e=t.name,r=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!At[o]&&!kt[o]&&vn(e+" effect requires "+o+" plugin.")}),ji[e]=function(o,c,l){return r(Lt(o),$t(c||{},s),l)},a&&(ht.prototype[e]=function(o,c,l){return this.add(ji[e](o,Bt(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){H[t]=we(e)},parseEase:function(t,e){return arguments.length?we(t,e):H},getById:function(t){return j.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var r=new ht(t),i,s;for(r.smoothChildTiming=pt(t.smoothChildTiming),j.remove(r),r._dp=0,r._time=r._tTime=j._time,i=j._first;i;)s=i._next,(e||!(!i._dur&&i instanceof tt&&i.vars.onComplete===i._targets[0]))&&Vt(r,i,i._start-i._delay),i=s;return Vt(j,r,0),r},context:function(t,e){return t?new fl(t,e):G},matchMedia:function(t){return new rm(t)},matchMediaRefresh:function(){return Ae.forEach(function(t){var e=t.conditions,r,i;for(i in e)e[i]&&(e[i]=!1,r=1);r&&t.revert()})||fs()},addEventListener:function(t,e){var r=zr[t]||(zr[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function(t,e){var r=zr[t],i=r&&r.indexOf(e);i>=0&&r.splice(i,1)},utils:{wrap:Og,wrapYoyo:Ng,distribute:Ho,random:Xo,snap:Vo,normalize:Rg,getUnit:lt,clamp:Eg,splitColor:Ko,toArray:Lt,selector:ts,mapRange:Go,pipe:Pg,unitize:zg,interpolate:Dg,shuffle:Bo},install:$o,effects:ji,ticker:St,updateRoot:ht.updateRoot,plugins:At,globalTimeline:j,core:{PropTween:mt,globals:Co,Tween:tt,Timeline:ht,Animation:Sn,getCache:xe,_removeLinkedListItem:Mr,reverting:function(){return st},context:function(t){return t&&G&&(G.data.push(t),t._ctx=G),G},suppressOverwrites:function(t){return Di=t}}};gt("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Rr[n]=tt[n]}),St.add(ht.updateRoot),Xe=Rr.to({},{duration:0});var im=function(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r},sm=function(t,e){var r=t._targets,i,s,a;for(i in e)for(s=r.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=im(a,i)),a&&a.modifier&&a.modifier(e[i],t,r[s],i))},ds=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(it(s)&&(c={},gt(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}sm(o,s)}}}},_t=Rr.registerPlugin({name:"attr",init:function(t,e,r,i,s){var a,o,c;this.tween=r;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var r=e._pt;r;)st?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},ds("roundProps",es),ds("modifiers"),ds("snap",Vo))||Rr;tt.version=ht.version=_t.version="3.14.2",Ao=1,qi()&&Ye(),H.Power0,H.Power1,H.Power2,H.Power3,H.Power4,H.Linear,H.Quad,H.Cubic,H.Quart,H.Quint,H.Strong,H.Elastic,H.Back,H.SteppedEase,H.Bounce,H.Sine,H.Expo,H.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dl,ae,Ge,ps,$e,pl,gs,am=function(){return typeof window<"u"},Zt={},Ce=180/Math.PI,je=Math.PI/180,We=Math.atan2,gl=1e8,ms=/([A-Z])/g,om=/(left|right|width|margin|padding|x)/i,lm=/[\s,\(]\S/,Xt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},_s=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},cm=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},um=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},hm=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},fm=function(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)},ml=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},_l=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},dm=function(t,e,r){return t.style[e]=r},pm=function(t,e,r){return t.style.setProperty(e,r)},gm=function(t,e,r){return t._gsap[e]=r},mm=function(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r},_m=function(t,e,r,i,s){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(s,a)},vm=function(t,e,r,i,s){var a=t._gsap;a[e]=r,a.renderTransform(s,a)},U="transform",vt=U+"Origin",ym=function n(t,e){var r=this,i=this.target,s=i.style,a=i._gsap;if(t in Zt&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Xt[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return r.tfm[o]=Qt(i,o)}):this.tfm[t]=a.x?a[t]:Qt(i,t),t===vt&&(this.tfm.zOrigin=a.zOrigin);else return Xt.transform.split(",").forEach(function(o){return n.call(r,o,e)});if(this.props.indexOf(U)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(vt,e,"")),t=U}(s||e)&&this.props.push(t,e,s[t])},vl=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},xm=function(){var t=this.props,e=this.target,r=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?r[t[s]]=t[s+2]:r.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(ms,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=gs(),(!s||!s.isStart)&&!r[U]&&(vl(r),i.zOrigin&&r[vt]&&(r[vt]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},yl=function(t,e){var r={target:t,props:[],revert:xm,save:ym};return t._gsap||_t.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return r.save(i)}),r},xl,vs=function(t,e){var r=ae.createElementNS?ae.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ae.createElement(t);return r&&r.style?r:ae.createElement(t)},Tt=function n(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(ms,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&n(t,Ue(e)||e,1)||""},bl="O,Moz,ms,Ms,Webkit".split(","),Ue=function(t,e,r){var i=e||$e,s=i.style,a=5;if(t in s&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(bl[a]+t in s););return a<0?null:(a===3?"ms":a>=0?bl[a]:"")+t},ys=function(){am()&&window.document&&(dl=window,ae=dl.document,Ge=ae.documentElement,$e=vs("div")||{style:{}},vs("div"),U=Ue(U),vt=U+"Origin",$e.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",xl=!!Ue("perspective"),gs=_t.core.reverting,ps=1)},wl=function(t){var e=t.ownerSVGElement,r=vs("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",r.appendChild(i),Ge.appendChild(r);try{s=i.getBBox()}catch{}return r.removeChild(i),Ge.removeChild(r),s},kl=function(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])},Al=function(t){var e,r;try{e=t.getBBox()}catch{e=wl(t),r=1}return e&&(e.width||e.height)||r||(e=wl(t)),e&&!e.width&&!e.x&&!e.y?{x:+kl(t,["x","cx","x1"])||0,y:+kl(t,["y","cy","y1"])||0,width:0,height:0}:e},$l=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Al(t))},oe=function(t,e){if(e){var r=t.style,i;e in Zt&&e!==vt&&(e=U),r.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),r.removeProperty(i==="--"?e:e.replace(ms,"-$1").toLowerCase())):r.removeAttribute(e)}},le=function(t,e,r,i,s,a){var o=new mt(t._pt,e,r,0,1,a?_l:ml);return t._pt=o,o.b=i,o.e=s,t._props.push(r),o},Cl={deg:1,rad:1,turn:1},bm={grid:1,flex:1},ce=function n(t,e,r,i){var s=parseFloat(r)||0,a=(r+"").trim().substr((s+"").length)||"px",o=$e.style,c=om.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,p,_,y;if(i===a||!s||Cl[i]||Cl[a])return s;if(a!=="px"&&!f&&(s=n(t,e,r,"px")),y=t.getCTM&&$l(t),(d||a==="%")&&(Zt[e]||~e.indexOf("adius")))return g=y?t.getBBox()[c?"width":"height"]:t[u],Q(d?s/g*h:s/100*g);if(o[c?"width":"height"]=h+(f?a:i),p=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,y&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===ae||!p.appendChild)&&(p=ae.body),_=p._gsap,_&&d&&_.width&&c&&_.time===St.time&&!_.uncache)return Q(s/_.width*h);if(d&&(e==="height"||e==="width")){var b=t.style[e];t.style[e]=h+i,g=t[u],b?t.style[e]=b:oe(t,e)}else(d||a==="%")&&!bm[Tt(p,"display")]&&(o.position=Tt(t,"position")),p===t&&(o.position="static"),p.appendChild($e),g=$e[u],p.removeChild($e),o.position="absolute";return c&&d&&(_=xe(p),_.time=St.time,_.width=p[u]),Q(f?g*s/h:g&&s?h/g*s:0)},Qt=function(t,e,r,i){var s;return ps||ys(),e in Xt&&e!=="transform"&&(e=Xt[e],~e.indexOf(",")&&(e=e.split(",")[0])),Zt[e]&&e!=="transform"?(s=En(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Nr(Tt(t,vt))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Or[e]&&Or[e](t,e,r)||Tt(t,e)||Mo(t,e)||(e==="opacity"?1:0))),r&&!~(s+"").trim().indexOf(" ")?ce(t,e,s,r)+r:s},wm=function(t,e,r,i){if(!r||r==="none"){var s=Ue(e,t,1),a=s&&Tt(t,s,1);a&&a!==r?(e=s,r=a):e==="borderColor"&&(r=Tt(t,"borderTopColor"))}var o=new mt(this._pt,t.style,e,0,1,cl),c=0,l=0,u,h,f,d,g,p,_,y,b,v,m,w;if(o.b=r,o.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=Tt(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(p=t.style[e],t.style[e]=i,i=Tt(t,e)||i,p?t.style[e]=p:oe(t,e)),u=[r,i],Jo(u),r=u[0],i=u[1],f=r.match(Ie)||[],w=i.match(Ie)||[],w.length){for(;h=Ie.exec(i);)_=h[0],b=i.substring(c,h.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),_!==(p=f[l++]||"")&&(d=parseFloat(p)||0,m=p.substr((d+"").length),_.charAt(1)==="="&&(_=qe(d,_)+m),y=parseFloat(_),v=_.substr((y+"").length),c=Ie.lastIndex-v.length,v||(v=v||wt.units[e]||m,c===i.length&&(i+=v,o.e+=v)),m!==v&&(d=ce(t,e,p,v)||0),o._pt={_next:o._pt,p:b||l===1?b:",",s:d,c:y-d,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?_l:ml;return ko.test(i)&&(o.e=0),this._pt=o,o},Sl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},km=function(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(t=r,r=i,i=t),e[0]=Sl[r]||r,e[1]=Sl[i]||i,e.join(" ")},Am=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r=e.t,i=r.style,s=e.u,a=r._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],Zt[o]&&(c=1,o=o==="transformOrigin"?vt:U),oe(r,o);c&&(oe(r,U),a&&(a.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",En(r,1),a.uncache=1,vl(i)))}},Or={clearProps:function(t,e,r,i,s){if(s.data!=="isFromStart"){var a=t._pt=new mt(t._pt,e,r,0,0,Am);return a.u=i,a.pr=-10,a.tween=s,t._props.push(r),1}}},Mn=[1,0,0,1,0,0],Tl={},Ml=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},El=function(t){var e=Tt(t,U);return Ml(e)?Mn:e.substr(7).match(wo).map(Q)},xs=function(t,e){var r=t._gsap||xe(t),i=t.style,s=El(t),a,o,c,l;return r.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?Mn:s):(s===Mn&&!t.offsetParent&&t!==Ge&&!r.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,Ge.appendChild(t)),s=El(t),c?i.display=c:oe(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):Ge.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},bs=function(t,e,r,i,s,a){var o=t._gsap,c=s||xs(t,!0),l=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=c[0],g=c[1],p=c[2],_=c[3],y=c[4],b=c[5],v=e.split(" "),m=parseFloat(v[0])||0,w=parseFloat(v[1])||0,C,k,$,x;r?c!==Mn&&(k=d*_-g*p)&&($=m*(_/k)+w*(-p/k)+(p*b-_*y)/k,x=m*(-g/k)+w*(d/k)-(d*b-g*y)/k,m=$,w=x):(C=Al(t),m=C.x+(~v[0].indexOf("%")?m/100*C.width:m),w=C.y+(~(v[1]||v[0]).indexOf("%")?w/100*C.height:w)),i||i!==!1&&o.smooth?(y=m-l,b=w-u,o.xOffset=h+(y*d+b*p)-y,o.yOffset=f+(y*g+b*_)-b):o.xOffset=o.yOffset=0,o.xOrigin=m,o.yOrigin=w,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!r,t.style[vt]="0px 0px",a&&(le(a,o,"xOrigin",l,m),le(a,o,"yOrigin",u,w),le(a,o,"xOffset",h,o.xOffset),le(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",m+" "+w)},En=function(t,e){var r=t._gsap||new rl(t);if("x"in r&&!e&&!r.uncache)return r;var i=t.style,s=r.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=Tt(t,vt)||"0",u,h,f,d,g,p,_,y,b,v,m,w,C,k,$,x,S,M,T,E,z,A,L,P,O,R,N,I,J,yt,rt,K;return u=h=f=p=_=y=b=v=m=0,d=g=1,r.svg=!!(t.getCTM&&$l(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[U]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[U]!=="none"?c[U]:"")),i.scale=i.rotate=i.translate="none"),k=xs(t,r.svg),r.svg&&(r.uncache?(O=t.getBBox(),l=r.xOrigin-O.x+"px "+(r.yOrigin-O.y)+"px",P=""):P=!e&&t.getAttribute("data-svg-origin"),bs(t,P||l,!!P||r.originIsAbsolute,r.smooth!==!1,k)),w=r.xOrigin||0,C=r.yOrigin||0,k!==Mn&&(M=k[0],T=k[1],E=k[2],z=k[3],u=A=k[4],h=L=k[5],k.length===6?(d=Math.sqrt(M*M+T*T),g=Math.sqrt(z*z+E*E),p=M||T?We(T,M)*Ce:0,b=E||z?We(E,z)*Ce+p:0,b&&(g*=Math.abs(Math.cos(b*je))),r.svg&&(u-=w-(w*M+C*E),h-=C-(w*T+C*z))):(K=k[6],yt=k[7],N=k[8],I=k[9],J=k[10],rt=k[11],u=k[12],h=k[13],f=k[14],$=We(K,J),_=$*Ce,$&&(x=Math.cos(-$),S=Math.sin(-$),P=A*x+N*S,O=L*x+I*S,R=K*x+J*S,N=A*-S+N*x,I=L*-S+I*x,J=K*-S+J*x,rt=yt*-S+rt*x,A=P,L=O,K=R),$=We(-E,J),y=$*Ce,$&&(x=Math.cos(-$),S=Math.sin(-$),P=M*x-N*S,O=T*x-I*S,R=E*x-J*S,rt=z*S+rt*x,M=P,T=O,E=R),$=We(T,M),p=$*Ce,$&&(x=Math.cos($),S=Math.sin($),P=M*x+T*S,O=A*x+L*S,T=T*x-M*S,L=L*x-A*S,M=P,A=O),_&&Math.abs(_)+Math.abs(p)>359.9&&(_=p=0,y=180-y),d=Q(Math.sqrt(M*M+T*T+E*E)),g=Q(Math.sqrt(L*L+K*K)),$=We(A,L),b=Math.abs($)>2e-4?$*Ce:0,m=rt?1/(rt<0?-rt:rt):0),r.svg&&(P=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!Ml(Tt(t,U)),P&&t.setAttribute("transform",P))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(d*=-1,b+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),e=e||r.uncache,r.x=u-((r.xPercent=u&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+a,r.y=h-((r.yPercent=h&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+a,r.z=f+a,r.scaleX=Q(d),r.scaleY=Q(g),r.rotation=Q(p)+o,r.rotationX=Q(_)+o,r.rotationY=Q(y)+o,r.skewX=b+o,r.skewY=v+o,r.transformPerspective=m+a,(r.zOrigin=parseFloat(l.split(" ")[2])||!e&&r.zOrigin||0)&&(i[vt]=Nr(l)),r.xOffset=r.yOffset=0,r.force3D=wt.force3D,r.renderTransform=r.svg?Cm:xl?Ll:$m,r.uncache=0,r},Nr=function(t){return(t=t.split(" "))[0]+" "+t[1]},ws=function(t,e,r){var i=lt(e);return Q(parseFloat(e)+parseFloat(ce(t,"x",r+"px",i)))+i},$m=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Ll(t,e)},Se="0deg",Ln="0px",Te=") ",Ll=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.z,l=r.rotation,u=r.rotationY,h=r.rotationX,f=r.skewX,d=r.skewY,g=r.scaleX,p=r.scaleY,_=r.transformPerspective,y=r.force3D,b=r.target,v=r.zOrigin,m="",w=y==="auto"&&t&&t!==1||y===!0;if(v&&(h!==Se||u!==Se)){var C=parseFloat(u)*je,k=Math.sin(C),$=Math.cos(C),x;C=parseFloat(h)*je,x=Math.cos(C),a=ws(b,a,k*x*-v),o=ws(b,o,-Math.sin(C)*-v),c=ws(b,c,$*x*-v+v)}_!==Ln&&(m+="perspective("+_+Te),(i||s)&&(m+="translate("+i+"%, "+s+"%) "),(w||a!==Ln||o!==Ln||c!==Ln)&&(m+=c!==Ln||w?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Te),l!==Se&&(m+="rotate("+l+Te),u!==Se&&(m+="rotateY("+u+Te),h!==Se&&(m+="rotateX("+h+Te),(f!==Se||d!==Se)&&(m+="skew("+f+", "+d+Te),(g!==1||p!==1)&&(m+="scale("+g+", "+p+Te),b.style[U]=m||"translate(0, 0)"},Cm=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,a=r.x,o=r.y,c=r.rotation,l=r.skewX,u=r.skewY,h=r.scaleX,f=r.scaleY,d=r.target,g=r.xOrigin,p=r.yOrigin,_=r.xOffset,y=r.yOffset,b=r.forceCSS,v=parseFloat(a),m=parseFloat(o),w,C,k,$,x;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=je,l*=je,w=Math.cos(c)*h,C=Math.sin(c)*h,k=Math.sin(c-l)*-f,$=Math.cos(c-l)*f,l&&(u*=je,x=Math.tan(l-u),x=Math.sqrt(1+x*x),k*=x,$*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),w*=x,C*=x)),w=Q(w),C=Q(C),k=Q(k),$=Q($)):(w=h,$=f,C=k=0),(v&&!~(a+"").indexOf("px")||m&&!~(o+"").indexOf("px"))&&(v=ce(d,"x",a,"px"),m=ce(d,"y",o,"px")),(g||p||_||y)&&(v=Q(v+g-(g*w+p*k)+_),m=Q(m+p-(g*C+p*$)+y)),(i||s)&&(x=d.getBBox(),v=Q(v+i/100*x.width),m=Q(m+s/100*x.height)),x="matrix("+w+","+C+","+k+","+$+","+v+","+m+")",d.setAttribute("transform",x),b&&(d.style[U]=x)},Sm=function(t,e,r,i,s){var a=360,o=it(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?Ce:1),l=c-i,u=i+l+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),h==="cw"&&l<0?l=(l+a*gl)%a-~~(l/a)*a:h==="ccw"&&l>0&&(l=(l-a*gl)%a-~~(l/a)*a)),t._pt=f=new mt(t._pt,e,r,i,l,cm),f.e=u,f.u="deg",t._props.push(r),f},Pl=function(t,e){for(var r in e)t[r]=e[r];return t},Tm=function(t,e,r){var i=Pl({},r._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=r.style,o,c,l,u,h,f,d,g;i.svg?(l=r.getAttribute("transform"),r.setAttribute("transform",""),a[U]=e,o=En(r,1),oe(r,U),r.setAttribute("transform",l)):(l=getComputedStyle(r)[U],a[U]=e,o=En(r,1),a[U]=l);for(c in Zt)l=i[c],u=o[c],l!==u&&s.indexOf(c)<0&&(d=lt(l),g=lt(u),h=d!==g?ce(r,c,l,g):parseFloat(l),f=parseFloat(u),t._pt=new mt(t._pt,o,c,h,f-h,_s),t._pt.u=g||0,t._props.push(c));Pl(o,i)};gt("padding,margin,Width,Radius",function(n,t){var e="Top",r="Right",i="Bottom",s="Left",a=(t<3?[e,r,i,s]:[e+s,e+r,i+r,i+s]).map(function(o){return t<2?n+o:"border"+o+n});Or[t>1?"border"+n:n]=function(o,c,l,u,h){var f,d;if(arguments.length<4)return f=a.map(function(g){return Qt(o,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(g,p){return d[g]=f[p]=f[p]||f[(p-1)/2|0]}),o.init(c,d,h)}});var zl={name:"css",register:ys,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,r,i,s){var a=this._props,o=t.style,c=r.vars.startAt,l,u,h,f,d,g,p,_,y,b,v,m,w,C,k,$,x;ps||ys(),this.styles=this.styles||yl(t),$=this.styles.props,this.tween=r;for(p in e)if(p!=="autoRound"&&(u=e[p],!(At[p]&&il(p,e,r,i,t,s)))){if(d=typeof u,g=Or[p],d==="function"&&(u=u.call(r,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=kn(u)),g)g(this,t,p,u,r)&&(k=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(p)+"").trim(),u+="",ie.lastIndex=0,ie.test(l)||(_=lt(l),y=lt(u),y?_!==y&&(l=ce(t,p,l,y)+y):_&&(u+=_)),this.add(o,"setProperty",l,u,i,s,0,0,p),a.push(p),$.push(p,0,o[p]);else if(d!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(r,i,t,s):c[p],it(l)&&~l.indexOf("random(")&&(l=kn(l)),lt(l+"")||l==="auto"||(l+=wt.units[p]||lt(Qt(t,p))||""),(l+"").charAt(1)==="="&&(l=Qt(t,p))):l=Qt(t,p),f=parseFloat(l),b=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),h=parseFloat(u),p in Xt&&(p==="autoAlpha"&&(f===1&&Qt(t,"visibility")==="hidden"&&h&&(f=0),$.push("visibility",0,o.visibility),le(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=Xt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),v=p in Zt,v){if(this.styles.save(p),x=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Tt(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var S=t.style.perspective;t.style.perspective=u,u=Tt(t,"perspective"),S?t.style.perspective=S:oe(t,"perspective")}h=parseFloat(u)}if(m||(w=t._gsap,w.renderTransform&&!e.parseTransform||En(t,e.parseTransform),C=e.smoothOrigin!==!1&&w.smooth,m=this._pt=new mt(this._pt,o,U,0,1,w.renderTransform,w,0,-1),m.dep=1),p==="scale")this._pt=new mt(this._pt,w,"scaleY",w.scaleY,(b?qe(w.scaleY,b+h):h)-w.scaleY||0,_s),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){$.push(vt,0,o[vt]),u=km(u),w.svg?bs(t,u,0,C,0,this):(y=parseFloat(u.split(" ")[2])||0,y!==w.zOrigin&&le(this,w,"zOrigin",w.zOrigin,y),le(this,o,p,Nr(l),Nr(u)));continue}else if(p==="svgOrigin"){bs(t,u,1,C,0,this);continue}else if(p in Tl){Sm(this,w,p,f,b?qe(f,b+u):u);continue}else if(p==="smoothOrigin"){le(this,w,"smooth",w.smooth,u);continue}else if(p==="force3D"){w[p]=u;continue}else if(p==="transform"){Tm(this,u,t);continue}}else p in o||(p=Ue(p)||p);if(v||(h||h===0)&&(f||f===0)&&!lm.test(u)&&p in o)_=(l+"").substr((f+"").length),h||(h=0),y=lt(u)||(p in wt.units?wt.units[p]:_),_!==y&&(f=ce(t,p,l,y)),this._pt=new mt(this._pt,v?w:o,p,f,(b?qe(f,b+h):h)-f,!v&&(y==="px"||p==="zIndex")&&e.autoRound!==!1?fm:_s),this._pt.u=y||0,v&&x!==u?(this._pt.b=l,this._pt.e=x,this._pt.r=hm):_!==y&&y!=="%"&&(this._pt.b=l,this._pt.r=um);else if(p in o)wm.call(this,t,p,l,b?b+u:u);else if(p in t)this.add(t,p,l||t[p],b?b+u:u,i,s);else if(p!=="parseTransform"){Xi(p,u);continue}v||(p in o?$.push(p,0,o[p]):typeof t[p]=="function"?$.push(p,2,t[p]()):$.push(p,1,l||t[p])),a.push(p)}}k&&ul(this)},render:function(t,e){if(e.tween._time||!gs())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:Qt,aliases:Xt,getSetter:function(t,e,r){var i=Xt[e];return i&&i.indexOf(",")<0&&(e=i),e in Zt&&e!==vt&&(t._gsap.x||Qt(t,"x"))?r&&pl===r?e==="scale"?mm:gm:(pl=r||{})&&(e==="scale"?_m:vm):t.style&&!Ii(t.style[e])?dm:~e.indexOf("-")?pm:cs(t,e)},core:{_removeProperty:oe,_getMatrix:xs}};_t.utils.checkPrefix=Ue,_t.core.getStyleSaver=yl,(function(n,t,e,r){var i=gt(n+","+t+","+e,function(s){Zt[s]=1});gt(t,function(s){wt.units[s]="deg",Tl[s]=1}),Xt[i[13]]=n+","+t,gt(r,function(s){var a=s.split(":");Xt[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),gt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){wt.units[n]="px"}),_t.registerPlugin(zl);var Pn=_t.registerPlugin(zl)||_t;Pn.core.Tween;const Ke={input:"#ff2d75",hidden:"#7b68ee",output:"#00d4ff"},zn=36,Dr=100,ks=200,Rl=50,As=60,Mm=`
  :host { display: block; }
  svg { width: 100%; display: block; }
  .node { transform-origin: center; }
  .connection {}
  .label { fill: var(--lv-text-dim, #888); font-size: 12px; text-anchor: middle; }
  .node-label {
    fill: white; font-size: 11px; font-weight: 600;
    text-anchor: middle; dominant-baseline: central; pointer-events: none;
  }
`;class Em extends F{constructor(){super(...arguments);D(this,"_svg",null);D(this,"_container",null);D(this,"_hasAnimated",!1);D(this,"_isAnimating",!1);D(this,"_resizeObserver",null);D(this,"_timeline",null)}static get observedAttributes(){return["layers","names","animate","speed"]}get _layers(){return this.jsonAttr("layers",[["x₁","x₂"],["h₁","h₂","h₃"],["ŷ"]])}get _names(){return this.jsonAttr("names",[])}get _animateMode(){return this.getAttribute("animate")||"none"}get _speed(){const e=parseInt(this.getAttribute("speed")||"",10);return isNaN(e)?600:e}connectedCallback(){super.connectedCallback(),this.adoptStyles(Mm),this._container=document.createElement("div"),this.root.appendChild(this._container),this._initSvg(),this._render(),this._resizeObserver=new ResizeObserver(()=>{this._isAnimating||this._render()}),this._resizeObserver.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this._resizeObserver=null,this._cancelAnimation()}handleAttributeChange(e,r,i){r!==i&&this._svg&&(this._cancelAnimation(),this._hasAnimated=!1,this._render())}animateIn(e){if(!this._hasAnimated){if(e||this._animateMode==="none"){this._hasAnimated=!0,this._render();return}this._runAnimation()}}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e);const r=this._svg.append("defs"),i={input:Ke.input,hidden:Ke.hidden,output:Ke.output};for(const[s,a]of Object.entries(i))r.append("filter").attr("id",`glow-${s}`).attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",6).attr("flood-color",a).attr("flood-opacity",.7);this._svg.append("g").attr("class","connections-group"),this._svg.append("g").attr("class","nodes-group"),this._svg.append("g").attr("class","labels-group")}_computeLayout(){const e=this._layers,r=this.isRtl,i=e.length,s=Math.max(...e.map(u=>u.length),1),a=(i-1)*ks+As*2,o=(s-1)*Dr+Rl+zn+40,c=[],l=[];for(let u=0;u<i;u++){const h=e[u],f=r?a-As-u*ks:As+u*ks,d=(h.length-1)*Dr,g=Rl+((s-1)*Dr-d)/2,p=[];for(let _=0;_<h.length;_++)p.push({layer:u,index:_,x:f,y:g+_*Dr,label:h[_]});c.push(p)}for(let u=0;u<i-1;u++)for(const h of c[u])for(const f of c[u+1])l.push({source:h,target:f});return{nodes:c,connections:l,width:a,height:o}}_layerColor(e,r){const i=getComputedStyle(this).getPropertyValue("--lv-net-input").trim()||Ke.input,s=getComputedStyle(this).getPropertyValue("--lv-net-hidden").trim()||Ke.hidden,a=getComputedStyle(this).getPropertyValue("--lv-net-output").trim()||Ke.output;return e===0?i:e===r-1?a:s}_layerType(e,r){return e===0?"input":e===r-1?"output":"hidden"}_render(){if(!this._svg)return;const{nodes:e,connections:r,width:i,height:s}=this._computeLayout(),a=e.length,o=this._animateMode==="none"||this._hasAnimated,c=this._animateMode!=="none"&&!this._hasAnimated;this._svg.attr("viewBox",`0 0 ${i} ${s}`);const l=this._svg.select(".connections-group");l.selectAll("*").remove();for(const d of r)l.append("line").attr("class","connection").attr("x1",d.source.x).attr("y1",d.source.y).attr("x2",d.target.x).attr("y2",d.target.y).attr("stroke","var(--lv-border, #2a2a4a)").attr("stroke-width",1.5).attr("stroke-opacity",c?.08:.5).attr("data-source-layer",d.source.layer).attr("data-target-layer",d.target.layer);const u=this._svg.select(".nodes-group");u.selectAll("*").remove();for(const d of e)for(const g of d){const p=this._layerColor(g.layer,a),_=this._layerType(g.layer,a),y=u.append("g").attr("class","node").attr("data-layer",g.layer).attr("data-index",g.index).attr("transform",`translate(${g.x},${g.y})`).attr("opacity",c?.15:1);y.append("circle").attr("class","node-circle").attr("data-layer",g.layer).attr("r",zn).attr("fill",p).attr("stroke",p).attr("stroke-width",2).attr("fill-opacity",o?.2:c?.05:.2),o&&y.attr("filter",`url(#glow-${_})`),y.append("text").attr("class","node-label").text(g.label)}const h=this._svg.select(".labels-group");h.selectAll("*").remove();const f=this._names;for(let d=0;d<e.length;d++){if(!f[d])continue;const g=e[d][0];h.append("text").attr("class","label").attr("x",g.x).attr("y",g.y-zn-16).text(f[d])}}_getLayerNodeGroups(){const e=this._layers.length,r=[];for(let i=0;i<e;i++){const s=Array.from(this.root.querySelectorAll(`.node[data-layer="${i}"]`));r.push(s)}return r}_getConnectionElements(e,r){return Array.from(this.root.querySelectorAll(`.connection[data-source-layer="${e}"][data-target-layer="${r}"]`))}_cancelAnimation(){var e;(e=this._timeline)==null||e.kill(),this._timeline=null,this._isAnimating=!1}_runAnimation(){if(!this._svg)return;this._cancelAnimation(),this._isAnimating=!0,this._render();const{nodes:e}=this._computeLayout(),r=e.length,i=this._animateMode,s=this._speed,a=i==="backprop",o=a?"#ff2d75":"#00d4ff",c=s/600,l=a?Array.from({length:r},(f,d)=>r-1-d):Array.from({length:r},(f,d)=>d),u=this._getLayerNodeGroups(),h=Pn.timeline({onComplete:()=>{this._isAnimating=!1,this._hasAnimated=!0,this.root.querySelectorAll(".node").forEach(g=>{const p=parseInt(g.getAttribute("data-layer")||"0",10),_=this._layerType(p,r);Pn.set(g,{opacity:1}),g.setAttribute("filter",`url(#glow-${_})`);const y=g.querySelector("circle");y&&Pn.set(y,{attr:{"fill-opacity":.2}})}),this.root.querySelectorAll(".connection").forEach(g=>{Pn.set(g,{attr:{"stroke-opacity":.5}}),g.setAttribute("stroke","var(--lv-border, #2a2a4a)")})}});this._timeline=h,h.addLabel("start",.15),l.forEach((f,d)=>{const g=this._layerType(f,r),p=u[f];if(!p||p.length===0)return;const _=p.map(v=>v.querySelector(".node-circle")).filter(Boolean),y=`layer-${d}`,b=.15+d*(.4*c);if(h.addLabel(y,b),h.to(p,{opacity:1,duration:.2,stagger:.05,ease:"power2.out"},y),h.call(()=>{p.forEach(v=>{v.setAttribute("filter",`url(#glow-${g})`)})},[],y),h.to(_,{attr:{r:zn*1.15},duration:.15,stagger:.05,ease:"back.out(1.7)"},y),h.to(_,{attr:{r:zn},duration:.2,stagger:.05,ease:"power2.inOut"},`${y}+=0.2`),h.to(_,{attr:{"fill-opacity":.35},duration:.2,stagger:.05,ease:"power2.out"},y),h.to(_,{attr:{"fill-opacity":.2},duration:.3,stagger:.05,ease:"power2.in"},`${y}+=0.3`),d<l.length-1){const v=l[d+1],m=Math.min(f,v),w=Math.max(f,v),C=this._getConnectionElements(m,w);C.length>0&&(h.to(C,{attr:{"stroke-opacity":.5},stroke:o,duration:.25,stagger:.02,ease:"power2.out"},`${y}+=0.15`),h.to(C,{stroke:"var(--lv-border, #2a2a4a)",attr:{"stroke-opacity":.35},duration:.3,stagger:.02,ease:"power2.inOut"},`${y}+=0.35`))}})}}customElements.define("lv-network",Em);const Ol=["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1"],Lm=`
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
`,ue=120,Rn=32,Fr=40;class Pm extends F{constructor(){super(...arguments);D(this,"_data",null);D(this,"_hasAnimated",!1);D(this,"_svg",null);D(this,"_container",null);D(this,"_root",null)}static get observedAttributes(){return["data","orientation"]}get _orientation(){return this.getAttribute("orientation")==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.adoptStyles(Lm),this._container=document.createElement("div"),this.root.appendChild(this._container),this._data=this.jsonAttr("data",{label:"root"}),this._initSvg(),this._buildHierarchy(),this._render(!1)}disconnectedCallback(){super.disconnectedCallback()}handleAttributeChange(e,r,i){r!==i&&(e==="data"&&(this._data=this.jsonAttr("data",{label:"root"}),this._buildHierarchy()),this._svg&&this._render(!1))}animateIn(e){this._hasAnimated||(this._hasAnimated=!0,e?this._render(!1):this._render(!0))}_initSvg(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");this._container.appendChild(e),this._svg=nt(e),this._svg.append("g").attr("class","links-group"),this._svg.append("g").attr("class","nodes-group")}_buildHierarchy(){this._data&&(this._root=hr(this._data))}_getVisibleNodes(){if(!this._root)return[];const e=[],r=i=>{if(e.push(i),!i._collapsed&&i.children)for(const s of i.children)r(s)};return r(this._root),e}_toggleCollapse(e){!e.data.children||e.data.children.length===0||(e._collapsed?(e._collapsed=!1,e.children=e._children||[]):(e._collapsed=!0,e._children=e.children,e.children=void 0),this._render(!0))}_render(e){if(!this._svg||!this._root)return;const r=this._orientation==="horizontal",i=new Map,s=(S,M)=>{if(i.set(M,{collapsed:!!S._collapsed,_children:S._children}),S._collapsed&&S._children)for(let T=0;T<S._children.length;T++)s(S._children[T],`${M}/${T}`);if(S.children)for(let T=0;T<S.children.length;T++)s(S.children[T],`${M}/${T}`)};s(this._root,"0"),this._root=hr(this._data);const a=(S,M)=>{const T=i.get(M);if(T!=null&&T.collapsed&&(S._collapsed=!0,S._children=S.children,S.children=void 0),S.children)for(let E=0;E<S.children.length;E++)a(S.children[E],`${M}/${E}`)};a(this._root,"0");const o=this._getVisibleNodes(),c=o.filter(S=>!S.children||S.children.length===0).length,l=Os(o,S=>S.depth)||0,u=Rn+20,h=ue+60;let f,d;r?(f=l*h,d=Math.max((c-1)*u,u)):(f=Math.max((c-1)*(ue+80),ue+80),d=l*h),Cp().size(r?[d,f]:[f,d]).separation((S,M)=>S.parent===M.parent?1.5:2)(this._root);const p=this._root.descendants(),_=this._root.links(),y=f+Fr*2+ue,b=d+Fr*2+Rn;this._svg.attr("viewBox",`0 0 ${y} ${b}`);const v=Fr+ue/2,m=Fr+Rn/2,w=S=>r?S.y+v:S.x+v,C=S=>r?S.x+m:S.y+m,k=this._svg.select(".links-group");k.selectAll("*").remove();const $=r?s0().x(S=>S.y+v).y(S=>S.x+m):a0().x(S=>S.x+v).y(S=>S.y+m);for(let S=0;S<_.length;S++){const M=_[S],T=k.append("path").attr("class","link").attr("d",$(M));if(e){const E=T.node().getTotalLength();T.attr("stroke-dasharray",E).attr("stroke-dashoffset",E).transition().delay(S*60+100).duration(500).ease(hn).attr("stroke-dashoffset",0)}}const x=this._svg.select(".nodes-group");x.selectAll("*").remove();for(let S=0;S<p.length;S++){const M=p[S],T=w(M),E=C(M),z=M.data.children&&M.data.children.length>0,A=!!M._collapsed,P=M.depth%Ol.length,O=getComputedStyle(this).getPropertyValue(`--lv-chart-${P}`).trim()||Ol[P],R=x.append("g").attr("transform",`translate(${T},${E})`);e&&R.attr("opacity",0).transition().delay(S*60).duration(400).ease(hn).attr("opacity",1);const N=R.append("rect").attr("class",`node-rect ${z?"has-children":"leaf"}`).attr("x",-ue/2).attr("y",-Rn/2).attr("width",ue).attr("height",Rn).attr("stroke",O);R.append("text").attr("class","node-label").text(M.data.label),z&&R.append("text").attr("class","collapse-indicator").attr("x",ue/2-12).attr("y",0).text(A?"+":"−"),z&&(N.on("click",()=>{this._toggleCollapse(M)}),R.select(".collapse-indicator").on("click",()=>{this._toggleCollapse(M)}))}}}customElements.define("lv-tree",Pm);const zm="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js",Rm=`
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .mermaid-container { width: 100%; overflow-x: auto; }
  .mermaid-container svg { display: block; margin: 0 auto; max-width: 100%; }
  .mermaid-error { color: var(--lv-negative); font-family: var(--lv-font-mono); font-size: var(--lv-fs-sm); padding: var(--lv-sp-3); }
`;let $s=null;class Om extends F{constructor(){super(...arguments);D(this,"_rendered",!1)}static get observedAttributes(){return[]}connectedCallback(){super.connectedCallback(),this.adoptStyles(Rm),this._renderDiagram()}async _renderDiagram(){var i;const e=(i=this.textContent)==null?void 0:i.trim();if(!e){this.render('<div class="mermaid-container"></div>');return}this.render('<div class="mermaid-container" id="output">Loading diagram...</div>');try{await te(zm)}catch{this.render('<div class="mermaid-error">Failed to load Mermaid library</div>');return}const r=window.mermaid;if(r){$s||($s=new Promise(s=>{const a=getComputedStyle(this),o=a.getPropertyValue("--lv-bg-card").trim()||"#1a1a2e",c=a.getPropertyValue("--lv-text").trim()||"#e4e4ec",l=a.getPropertyValue("--lv-accent").trim()||"#00d4ff",u=a.getPropertyValue("--lv-accent2").trim()||"#7b68ee",h=a.getPropertyValue("--lv-border").trim()||"#2a2a4a";r.initialize({startOnLoad:!1,theme:"base",themeVariables:{primaryColor:l,primaryTextColor:c,primaryBorderColor:h,secondaryColor:u,secondaryTextColor:c,tertiaryColor:o,lineColor:l,textColor:c,mainBkg:o,nodeBorder:h,clusterBkg:o,edgeLabelBackground:o,fontFamily:"Inter, Segoe UI, sans-serif"},flowchart:{htmlLabels:!0,curve:"basis"},securityLevel:"strict"}),s()})),await $s;try{const s="lv-mermaid-"+Math.random().toString(36).slice(2,8),{svg:a}=await r.render(s,e),o=this.root.getElementById("output");o&&(o.innerHTML=a)}catch(s){const a=this.root.getElementById("output");a&&(a.innerHTML=`<div class="mermaid-error">Diagram error: ${s.message||s}</div>`)}}}}customElements.define("lv-mermaid",Om),q.LvBaseElement=F,q.clamp=Ts,q.colorScale=Ms,q.formatNum=Es,q.getToken=Xl,q.lerp=Ee,q.loadScript=te,q.loadStylesheet=Vl,q.scrollAnimator=et,q.setTheme=Yl,q.simColorScale=ql,q.uid=Hl,Object.defineProperty(q,Symbol.toStringTag,{value:"Module"})}));

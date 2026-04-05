import { scrollAnimator } from './animate.js';

export class LvBaseElement extends HTMLElement {
  // Shadow root setup
  protected root: ShadowRoot;

  // Re-entrance guard — prevents attributeChangedCallback → _render → attributeChangedCallback loops
  #attrChangeGuard = false;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  // Auto-detect direction from DOM ancestors
  get dir(): 'rtl' | 'ltr' {
    return this.closest('[dir]')?.getAttribute('dir') as 'rtl' | 'ltr'
      || document.documentElement.dir as 'rtl' | 'ltr'
      || 'ltr';
  }

  get isRtl(): boolean { return this.dir === 'rtl'; }

  // Adopt stylesheets helper
  protected adoptStyles(css: string): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    this.root.adoptedStyleSheets = [...this.root.adoptedStyleSheets, sheet];
  }

  // Parse JSON attribute safely
  protected jsonAttr<T>(name: string, fallback: T): T {
    const raw = this.getAttribute(name);
    if (!raw) return fallback;
    const sanitized = raw.replace(/\u2212/g, '-');
    try { return JSON.parse(sanitized); } catch { return fallback; }
  }

  // Render helper using innerHTML
  protected render(html: string): void {
    this.#attrChangeGuard = true;
    this.root.innerHTML = html;
    this.#attrChangeGuard = false;
  }

  // Base attributeChangedCallback with re-entrance protection
  // Subclasses override handleAttributeChange() instead
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (this.#attrChangeGuard) return;
    this.#attrChangeGuard = true;
    this.handleAttributeChange(name, oldValue, newValue);
    this.#attrChangeGuard = false;
  }

  // Override this in subclasses instead of attributeChangedCallback
  protected handleAttributeChange(_name: string, _oldValue: string | null, _newValue: string | null): void {
    // Override in subclasses
  }

  // Called by ScrollAnimator when element enters viewport
  animateIn(_instant?: boolean): void {
    // Override in subclasses
  }

  connectedCallback(): void {
    scrollAnimator.observe(this);
  }

  disconnectedCallback(): void {
    scrollAnimator.unobserve(this);
  }
}

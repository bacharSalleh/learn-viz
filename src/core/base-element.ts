import { scrollAnimator } from './animate.js';

export class LvBaseElement extends HTMLElement {
  // Shadow root setup
  protected root: ShadowRoot;

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
    // Sanitize Unicode minus (U+2212) to ASCII hyphen-minus for valid JSON numbers
    const sanitized = raw.replace(/\u2212/g, '-');
    try { return JSON.parse(sanitized); } catch { return fallback; }
  }

  // Render helper using innerHTML
  protected render(html: string): void {
    this.root.innerHTML = html;
  }

  // Called by ScrollAnimator when element enters viewport
  // instant=true when prefers-reduced-motion is set
  animateIn(_instant?: boolean): void {
    // Override in subclasses
  }

  // Lifecycle
  connectedCallback(): void {
    scrollAnimator.observe(this);
  }

  disconnectedCallback(): void {
    scrollAnimator.unobserve(this);
  }
}

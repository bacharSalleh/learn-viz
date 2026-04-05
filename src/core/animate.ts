class ScrollAnimator {
  #observer: IntersectionObserver;
  #animated = new WeakSet<Element>();

  constructor() {
    this.#observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !this.#animated.has(entry.target)) {
          this.#animated.add(entry.target);
          // Check prefers-reduced-motion
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const el = entry.target as any;
          if (typeof el.animateIn === 'function') {
            if (prefersReduced) {
              el.animateIn(true); // instant=true
            } else {
              el.animateIn(false);
            }
          }
        }
      }
    }, { threshold: 0.15 });
  }

  observe(el: Element): void { this.#observer.observe(el); }
  unobserve(el: Element): void { this.#observer.unobserve(el); }
}

export const scrollAnimator = new ScrollAnimator();

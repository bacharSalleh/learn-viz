import { LvBaseElement } from '../core/base-element.js';

type CalloutType = 'info' | 'tip' | 'warning' | 'danger';

const TYPE_CONFIG: Record<CalloutType, { color: string; icon: string }> = {
  info: {
    color: 'var(--lv-info, #3b82f6)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 9v5M10 6.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
  tip: {
    color: 'var(--lv-positive, #22c55e)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2a5 5 0 0 1 5 5c0 2-1.5 3.2-2 4-.4.6-.5 1-.5 1.5V13H7.5v-.5c0-.5-.1-.9-.5-1.5-.5-.8-2-2-2-4a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.5 15.5h5M8.5 18h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  warning: {
    color: 'var(--lv-warning, #eab308)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L1 18h18L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M10 8v4M10 14.5v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
  danger: {
    color: 'var(--lv-negative, #ef4444)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
};

const css = `
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

class LvCallout extends LvBaseElement {
  static get observedAttributes() {
    return ['type', 'title'];
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.adoptStyles(css);
    this._render();
  }

  attributeChangedCallback(_name: string, _old: string | null, _new: string | null) {
    if (this.root.querySelector('.callout')) {
      this._render();
    }
  }

  private _getType(): CalloutType {
    const t = this.getAttribute('type') as CalloutType;
    return TYPE_CONFIG[t] ? t : 'info';
  }

  private _render() {
    const type = this._getType();
    const config = TYPE_CONFIG[type];
    const title = this.getAttribute('title') || '';

    this.style.setProperty('--_type-color', config.color);
    this.style.setProperty('--_type-bg', `color-mix(in srgb, ${config.color} 8%, transparent)`);

    const html = `
      <div class="callout" role="note">
        <div class="header">
          ${config.icon}
          ${title ? `<span class="title">${title}</span>` : ''}
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;

    this.render(html);
  }
}

customElements.define('lv-callout', LvCallout);

export { LvCallout };

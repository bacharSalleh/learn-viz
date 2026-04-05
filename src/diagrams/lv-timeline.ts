import { LvBaseElement } from '../core/base-element.js';

// ── Styles ──────────────────────────────────────────────────────────────────

const css = `
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

// ── Types ───────────────────────────────────────────────────────────────────

interface TimelineItemData {
  date: string;
  title: string;
  color: string;
  body: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Element ─────────────────────────────────────────────────────────────────

class LvTimeline extends LvBaseElement {
  private _items: TimelineItemData[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._readChildren();
    this._renderTimeline();
  }

  private _readChildren() {
    this._items = [];
    const children = this.querySelectorAll('lv-timeline-item');
    children.forEach((child) => {
      this._items.push({
        date: child.getAttribute('date') || '',
        title: child.getAttribute('title') || '',
        color: child.getAttribute('color') || 'var(--lv-accent, #6366f1)',
        body: child.innerHTML.trim(),
      });
    });
  }

  private _renderTimeline() {
    if (this._items.length === 0) return;

    let itemsHtml = '';
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      itemsHtml += `
        <div class="tl-item" style="animation-delay: ${i * 100}ms; --_dot-color: ${item.color};">
          <div class="tl-dot"></div>
          <div class="tl-card">
            ${item.date ? `<div class="tl-date">${escapeHtml(item.date)}</div>` : ''}
            ${item.title ? `<div class="tl-title">${escapeHtml(item.title)}</div>` : ''}
            ${item.body ? `<div class="tl-body">${item.body}</div>` : ''}
          </div>
        </div>`;
    }

    this.render(`<div class="timeline">${itemsHtml}</div>`);
  }

  animateIn(instant?: boolean) {
    if (instant) {
      this.root.querySelectorAll('.tl-item').forEach((el) => {
        (el as HTMLElement).style.animation = 'none';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateX(0)';
      });
    }
    this.classList.add('lv-entered');
  }
}

// Dummy element for the parser
class LvTimelineItem extends HTMLElement {}

customElements.define('lv-timeline', LvTimeline);
customElements.define('lv-timeline-item', LvTimelineItem);

export { LvTimeline, LvTimelineItem };

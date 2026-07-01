import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';

export type DsTooltipAlign =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

let _uid = 0;

/** @tagname ds-tooltip */
@customElement('ds-tooltip')
export class DsTooltip extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      /* ── Tooltip bubble ─────────────────────────────────────────────────── */
      .bubble {
        position: absolute;
        z-index: 9999;
        /* token gap: 240px has no --ds-* mapping — Figma max-width */
        width: max-content;
        max-width: 240px;
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-02);
        padding: var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-03);
        background: var(--ds-color-default-gray-130);
        border: 1px solid var(--ds-border-border-default);
        border-radius: var(--ds-radius-semantic-radius-sm);
        overflow: clip;
        pointer-events: none;
        /* Hidden by default; exit fades over 120ms then snaps hidden */
        visibility: hidden;
        opacity: 0;
        transition: opacity 120ms ease, visibility 0s linear 120ms;
      }

      /* Entry: animation overrides the transition. Exit uses the transition above. */
      .bubble--open {
        visibility: visible;
        transition: none;
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
        margin: 0;
        color: var(--ds-text-text-subtle);
        font-feature-settings: 'cv06' 1;
        overflow-wrap: break-word;
        text-align: left;
      }

      /* ── Keyboard shortcut badge ─────────────────────────────────────────── */
      .shortcut {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        padding: 1px var(--ds-spacing-spacing-01);
        border-radius: var(--ds-radius-semantic-radius-xs);
        /* token gap: no --ds-* for kbd border/bg on dark surface */
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.06);
        font-size: 10px;
        font-weight: 500;
        color: var(--ds-text-text-subtle);
        letter-spacing: 0.02em;
        line-height: 1.4;
        white-space: nowrap;
        font-style: normal;
      }

      /* ── Entry animations ──────────────────────────────────────────────────
         Resting gap is 8px. Animation starts 4px closer to trigger so the
         bubble appears to slide out from the trigger edge.
         Centered variants use the individual "translate" CSS property so
         centering is independent of the animation "transform".          ── */

      @keyframes ds-tooltip-in-top {
        from { opacity: 0; transform: translateY(4px);  }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes ds-tooltip-in-bottom {
        from { opacity: 0; transform: translateY(-4px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes ds-tooltip-in-left {
        from { opacity: 0; transform: translateX(4px);  }
        to   { opacity: 1; transform: translateX(0);    }
      }
      @keyframes ds-tooltip-in-right {
        from { opacity: 0; transform: translateX(-4px); }
        to   { opacity: 1; transform: translateX(0);    }
      }

      :host([align='top']) .bubble--open,
      :host([align='top-start']) .bubble--open,
      :host([align='top-end']) .bubble--open,
      :host(:not([align])) .bubble--open {
        animation: ds-tooltip-in-top 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
      }
      :host([align='bottom']) .bubble--open,
      :host([align='bottom-start']) .bubble--open,
      :host([align='bottom-end']) .bubble--open {
        animation: ds-tooltip-in-bottom 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
      }
      :host([align='left']) .bubble--open,
      :host([align='left-start']) .bubble--open,
      :host([align='left-end']) .bubble--open {
        animation: ds-tooltip-in-left 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
      }
      :host([align='right']) .bubble--open,
      :host([align='right-start']) .bubble--open,
      :host([align='right-end']) .bubble--open {
        animation: ds-tooltip-in-right 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
      }

      @media (prefers-reduced-motion: reduce) {
        .bubble--open { animation: none; opacity: 1; }
      }

      /* ── Positioning — 8px resting gap ─────────────────────────────────────
         Centered variants use the individual "translate" CSS property so it
         is independent of the animation "transform".                    ── */

      /* top (default) */
      :host([align='top']) .bubble,
      :host(:not([align])) .bubble {
        bottom: calc(100% + var(--ds-spacing-spacing-04));
        left: 50%;
        translate: -50% 0;
      }
      :host([align='top-start']) .bubble {
        bottom: calc(100% + var(--ds-spacing-spacing-04));
        left: 0;
      }
      :host([align='top-end']) .bubble {
        bottom: calc(100% + var(--ds-spacing-spacing-04));
        right: 0;
      }

      /* bottom */
      :host([align='bottom']) .bubble {
        top: calc(100% + var(--ds-spacing-spacing-04));
        left: 50%;
        translate: -50% 0;
      }
      :host([align='bottom-start']) .bubble {
        top: calc(100% + var(--ds-spacing-spacing-04));
        left: 0;
      }
      :host([align='bottom-end']) .bubble {
        top: calc(100% + var(--ds-spacing-spacing-04));
        right: 0;
      }

      /* left */
      :host([align='left']) .bubble {
        right: calc(100% + var(--ds-spacing-spacing-04));
        top: 50%;
        translate: 0 -50%;
      }
      :host([align='left-start']) .bubble {
        right: calc(100% + var(--ds-spacing-spacing-04));
        top: 0;
      }
      :host([align='left-end']) .bubble {
        right: calc(100% + var(--ds-spacing-spacing-04));
        bottom: 0;
      }

      /* right */
      :host([align='right']) .bubble {
        left: calc(100% + var(--ds-spacing-spacing-04));
        top: 50%;
        translate: 0 -50%;
      }
      :host([align='right-start']) .bubble {
        left: calc(100% + var(--ds-spacing-spacing-04));
        top: 0;
      }
      :host([align='right-end']) .bubble {
        left: calc(100% + var(--ds-spacing-spacing-04));
        bottom: 0;
      }

      /* ── Mouse-pointer mode ─────────────────────────────────────────────────
         Bubble uses fixed positioning and follows the cursor via CSS custom
         properties updated on every mousemove. Placed after align rules so
         it takes precedence at equal specificity.                       ── */
      :host([mouse-pointer]) .bubble {
        position: fixed;
        top: var(--_tip-y, 0px);
        left: var(--_tip-x, 0px);
        /* Offset so the tooltip doesn't sit under the pointer */
        translate: 10px 6px;
        bottom: auto;
        right: auto;
      }
      /* Bubble appears below the cursor so use the bottom entry animation */
      :host([mouse-pointer]) .bubble--open {
        animation: ds-tooltip-in-bottom 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
      }
    `,
  ];

  /** Where the bubble appears relative to the trigger. Default: 'top'. */
  @property({ type: String, reflect: true })
  align: DsTooltipAlign = 'top';

  /** Close the tooltip when the trigger is activated (click, Enter, Space). */
  @property({ type: Boolean, attribute: 'close-on-activation' })
  closeOnActivation = false;

  /** Milliseconds to wait before showing the tooltip. Default: 100. */
  @property({ type: Number, attribute: 'enter-delay-ms' })
  enterDelayMs = 100;

  /** Milliseconds to wait before hiding the tooltip. Default: 300. */
  @property({ type: Number, attribute: 'leave-delay-ms' })
  leaveDelayMs = 300;

  /**
   * When true, the bubble follows the mouse cursor using fixed positioning
   * instead of being anchored to the trigger's bounding box.
   */
  @property({ type: Boolean, reflect: true, attribute: 'mouse-pointer' })
  mousePointer = false;

  /**
   * When true, the tooltip only opens if the slotted trigger element is
   * currently overflowing (i.e. its text is visually truncated). Useful
   * for text cells that only need a tooltip when their content is clipped.
   */
  @property({ type: Boolean, attribute: 'only-when-truncated' })
  onlyWhenTruncated = false;

  /**
   * Optional keyboard shortcut displayed inside the tooltip bubble as a
   * <kbd> badge. Example values: "⌘K", "Ctrl+C", "⌥⇧F".
   */
  @property({ type: String })
  shortcut = '';

  @state() private _open = false;

  private readonly _id = `ds-tooltip-${++_uid}`;
  private _enterTimer = 0;
  private _leaveTimer = 0;

  private _clearTimers() {
    window.clearTimeout(this._enterTimer);
    window.clearTimeout(this._leaveTimer);
  }

  private _isTruncated(): boolean {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    if (!slot) return false;
    const elements = slot.assignedElements({ flatten: true });
    if (!elements.length) return false;
    const el = elements[0] as HTMLElement;
    return el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight;
  }

  private _show() {
    this._clearTimers();
    this._enterTimer = window.setTimeout(() => {
      if (this.onlyWhenTruncated && !this._isTruncated()) return;
      this._open = true;
    }, this.enterDelayMs);
  }

  private _hide() {
    this._clearTimers();
    this._leaveTimer = window.setTimeout(() => {
      this._open = false;
    }, this.leaveDelayMs);
  }

  private _onEnter = () => this._show();
  private _onLeave = () => this._hide();

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._clearTimers();
      this._open = false;
      return;
    }
    if (this.closeOnActivation && (e.key === 'Enter' || e.key === ' ')) {
      this._clearTimers();
      this._open = false;
    }
  };

  private _onClick = () => {
    if (this.closeOnActivation) {
      this._clearTimers();
      this._open = false;
    }
  };

  // Updates CSS custom properties on the host for mouse-pointer positioning.
  // Bypasses Lit's reactive system intentionally — no re-render needed.
  private _onMouseMove = (e: MouseEvent) => {
    this.style.setProperty('--_tip-x', `${e.clientX}px`);
    this.style.setProperty('--_tip-y', `${e.clientY}px`);
  };

  private _onTriggerSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    slot.assignedElements({ flatten: true }).forEach(el => {
      const htmlEl = el as HTMLElement;
      // Connect trigger to tooltip for screen readers.
      htmlEl.setAttribute('aria-describedby', this._id);
      // Remove native title attrs — they create a conflicting browser tooltip
      // and are redundant with our accessible tooltip implementation.
      htmlEl.removeAttribute('title');
      htmlEl.querySelectorAll('[title]').forEach(child => {
        child.removeAttribute('title');
      });
    });
  };

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._onEnter);
    this.addEventListener('mouseleave', this._onLeave);
    this.addEventListener('mousemove', this._onMouseMove);
    this.addEventListener('focusin', this._onEnter);
    this.addEventListener('focusout', this._onLeave);
    this.addEventListener('keydown', this._onKeydown);
    this.addEventListener('click', this._onClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._onEnter);
    this.removeEventListener('mouseleave', this._onLeave);
    this.removeEventListener('mousemove', this._onMouseMove);
    this.removeEventListener('focusin', this._onEnter);
    this.removeEventListener('focusout', this._onLeave);
    this.removeEventListener('keydown', this._onKeydown);
    this.removeEventListener('click', this._onClick);
    this._clearTimers();
  }

  render() {
    return html`
      <slot name="trigger" @slotchange=${this._onTriggerSlotChange}></slot>
      <div
        id=${this._id}
        class="bubble${this._open ? ' bubble--open' : ''}"
        part="tooltip"
        role="tooltip"
      >
        <p class="content text-helper-helper-regular"><slot></slot></p>
        ${this.shortcut ? html`<kbd class="shortcut text-helper-helper-regular">${this.shortcut}</kbd>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-tooltip': DsTooltip;
  }
}

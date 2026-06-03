var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
let _uid = 0;
let DsTooltip = class DsTooltip extends LitElement {
    constructor() {
        super(...arguments);
        /** Single-line ellipsis truncation (max 420px) when true; wrapping (max 240px) when false. */
        this.truncate = false;
        /** Where the bubble appears relative to the trigger. Default: 'top'. */
        this.align = 'top';
        /** Close the tooltip when the trigger is activated (click, Enter, Space). */
        this.closeOnActivation = false;
        /** Milliseconds to wait before showing the tooltip. Default: 100. */
        this.enterDelayMs = 100;
        /** Milliseconds to wait before hiding the tooltip. Default: 300. */
        this.leaveDelayMs = 300;
        /**
         * When true, the bubble follows the mouse cursor using fixed positioning
         * instead of being anchored to the trigger's bounding box.
         */
        this.mousePointer = false;
        /**
         * When true, the tooltip only opens if the slotted trigger element is
         * currently overflowing (i.e. its text is visually truncated). Useful
         * for text cells that only need a tooltip when their content is clipped.
         */
        this.onlyWhenTruncated = false;
        /**
         * Optional keyboard shortcut displayed inside the tooltip bubble as a
         * <kbd> badge. Example values: "⌘K", "Ctrl+C", "⌥⇧F".
         */
        this.shortcut = '';
        this._open = false;
        this._id = `ds-tooltip-${++_uid}`;
        this._enterTimer = 0;
        this._leaveTimer = 0;
        this._onEnter = () => this._show();
        this._onLeave = () => this._hide();
        this._onKeydown = (e) => {
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
        this._onClick = () => {
            if (this.closeOnActivation) {
                this._clearTimers();
                this._open = false;
            }
        };
        // Updates CSS custom properties on the host for mouse-pointer positioning.
        // Bypasses Lit's reactive system intentionally — no re-render needed.
        this._onMouseMove = (e) => {
            this.style.setProperty('--_tip-x', `${e.clientX}px`);
            this.style.setProperty('--_tip-y', `${e.clientY}px`);
        };
        this._onTriggerSlotChange = (e) => {
            const slot = e.target;
            slot.assignedElements({ flatten: true }).forEach(el => {
                const htmlEl = el;
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
    }
    _clearTimers() {
        window.clearTimeout(this._enterTimer);
        window.clearTimeout(this._leaveTimer);
    }
    _isTruncated() {
        const slot = this.shadowRoot?.querySelector('slot[name="trigger"]');
        if (!slot)
            return false;
        const elements = slot.assignedElements({ flatten: true });
        if (!elements.length)
            return false;
        const el = elements[0];
        return el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight;
    }
    _show() {
        this._clearTimers();
        this._enterTimer = window.setTimeout(() => {
            if (this.onlyWhenTruncated && !this._isTruncated())
                return;
            this._open = true;
        }, this.enterDelayMs);
    }
    _hide() {
        this._clearTimers();
        this._leaveTimer = window.setTimeout(() => {
            this._open = false;
        }, this.leaveDelayMs);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this._onEnter);
        this.addEventListener('mouseleave', this._onLeave);
        this.addEventListener('mousemove', this._onMouseMove);
        this.addEventListener('focusin', this._onEnter);
        this.addEventListener('focusout', this._onLeave);
        this.addEventListener('keydown', this._onKeydown);
        this.addEventListener('click', this._onClick);
    }
    disconnectedCallback() {
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
        return html `
      <slot name="trigger" @slotchange=${this._onTriggerSlotChange}></slot>
      <div
        id=${this._id}
        class="bubble${this._open ? ' bubble--open' : ''}"
        part="tooltip"
        role="tooltip"
      >
        <p class="content"><slot></slot></p>
        ${this.shortcut ? html `<kbd class="shortcut">${this.shortcut}</kbd>` : nothing}
      </div>
    `;
    }
};
DsTooltip.styles = [
    resetStyles,
    typographyBaseStyles,
    css `
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
        align-items: baseline;
        gap: var(--ds-spacing-spacing-02);
        padding: var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-03);
        background: var(--ds-color-default-neutral-white);
        border-radius: var(--ds-radius-semantic-radius-sm);
        overflow: clip;
        pointer-events: none;
        /* Hidden by default; exit fades over 120ms then snaps hidden */
        visibility: hidden;
        opacity: 0;
        transition: opacity 120ms ease, visibility 0s linear 120ms;
      }

      :host([truncate]) .bubble {
        /* token gap: 420px has no --ds-* mapping — Figma max-width */
        max-width: 420px;
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
        color: var(--ds-text-text-inverse);
        font-family: var(--ds-typography-cozy-helper-font-family);
        font-size: var(--ds-typography-cozy-helper-font-size);
        font-weight: var(--ds-typography-cozy-helper-font-weight);
        line-height: var(--ds-typography-cozy-helper-line-height);
        letter-spacing: var(--ds-typography-cozy-helper-letter-spacing);
        font-feature-settings: 'cv08' 1;
        overflow-wrap: break-word;
        text-align: left;
      }

      :host([truncate]) .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* ── Keyboard shortcut badge ─────────────────────────────────────────── */
      .shortcut {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        padding: 1px var(--ds-spacing-spacing-01);
        border-radius: var(--ds-radius-semantic-radius-xs);
        /* token gap: no --ds-* for kbd border/bg on inverse surface */
        border: 1px solid rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.05);
        font-family: var(--ds-typography-cozy-mono-body-sm-font-family);
        font-size: 10px;
        font-weight: 500;
        color: var(--ds-text-text-inverse);
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
__decorate([
    property({ type: Boolean, reflect: true })
], DsTooltip.prototype, "truncate", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTooltip.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, attribute: 'close-on-activation' })
], DsTooltip.prototype, "closeOnActivation", void 0);
__decorate([
    property({ type: Number, attribute: 'enter-delay-ms' })
], DsTooltip.prototype, "enterDelayMs", void 0);
__decorate([
    property({ type: Number, attribute: 'leave-delay-ms' })
], DsTooltip.prototype, "leaveDelayMs", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'mouse-pointer' })
], DsTooltip.prototype, "mousePointer", void 0);
__decorate([
    property({ type: Boolean, attribute: 'only-when-truncated' })
], DsTooltip.prototype, "onlyWhenTruncated", void 0);
__decorate([
    property({ type: String })
], DsTooltip.prototype, "shortcut", void 0);
__decorate([
    state()
], DsTooltip.prototype, "_open", void 0);
DsTooltip = __decorate([
    customElement('ds-tooltip')
], DsTooltip);
export { DsTooltip };
//# sourceMappingURL=ds-tooltip.js.map
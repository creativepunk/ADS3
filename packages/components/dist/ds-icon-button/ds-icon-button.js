var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, innerFocusRingStyles, srOnlyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-tooltip/ds-tooltip.js';
let DsIconButton = class DsIconButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'primary';
        this.size = 'md';
        this.shape = 'default';
        this.isDisabled = false;
        this.isSelected = false;
        this.ariaLabel = null;
        /** Label text for the built-in tooltip. The tooltip only renders when this is set AND isTooltipDisabled is false. */
        this.tooltip = '';
        /** Hides the built-in tooltip. Defaults to true — opt in by setting this to false. */
        this.isTooltipDisabled = true;
        /** Alignment of the built-in tooltip relative to the button. Defaults to 'bottom'. */
        this.tooltipAlign = 'bottom';
        this._handleClick = (e) => {
            if (this.isDisabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            dispatch(this, 'ds-click', { originalEvent: e });
        };
    }
    // The button template is shared between the tooltip and non-tooltip render paths.
    // When rendered inside <ds-tooltip>, the button carries slot="trigger".
    // aria-label falls back to the tooltip text so icon-only buttons always have
    // an accessible name even without an explicit ariaLabel prop.
    _button(inTooltip) {
        const label = this.ariaLabel ?? (this.tooltip || null);
        return html `
      <button
        part="button"
        type="button"
        slot=${inTooltip ? 'trigger' : nothing}
        ?disabled=${this.isDisabled}
        aria-pressed=${this.isSelected ? 'true' : nothing}
        aria-label=${label ?? nothing}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
    }
    render() {
        if (!this.isTooltipDisabled && this.tooltip) {
            return html `
        <ds-tooltip align=${this.tooltipAlign}>
          ${this._button(true)}
          ${this.tooltip}
        </ds-tooltip>
      `;
        }
        return this._button(false);
    }
};
DsIconButton.styles = [
    resetStyles,
    innerFocusRingStyles,
    srOnlyStyles,
    css `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([is-disabled]) {
        pointer-events: none;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--ds-radius-semantic-radius-sm);
        color: var(--ds-icon-icon-default);
        cursor: pointer;
        user-select: none;
        position: relative;
        transition:
          background-color 120ms ease,
          box-shadow 120ms ease;
      }

      /* ── Shape: circle ────────────────────────────────────────────────── */
      :host([shape='circle']) button {
        border-radius: var(--ds-radius-semantic-radius-pill);
      }

      /* ── Sizes (square: width = height) ───────────────────────────────── */
      :host([size='xs']) button {
        width: var(--ds-type-scale-y3); /* 20px */
        height: var(--ds-type-scale-y3);
      }
      :host([size='sm']) button {
        width: var(--ds-type-scale-y4); /* 24px */
        height: var(--ds-type-scale-y4);
      }
      :host([size='md']) button,
      :host(:not([size])) button {
        width: var(--ds-type-scale-y6); /* 32px */
        height: var(--ds-type-scale-y6);
      }
      :host([size='lg']) button {
        width: var(--ds-type-scale-y7); /* 40px */
        height: var(--ds-type-scale-y7);
      }

      /* Constrain slotted icons to 16px — matches Figma inner icon size across all sizes */
      ::slotted(svg),
      ::slotted(img) {
        width: var(--ds-spacing-spacing-06);
        height: var(--ds-spacing-spacing-06);
        display: block;
        flex-shrink: 0;
      }

      /* ── Variant: primary ─────────────────────────────────────────────── */
      :host([variant='primary']) button,
      :host(:not([variant])) button {
        background: var(--ds-background-brand-default);
      }
      :host([variant='primary']:not([is-disabled]):not([is-selected])) button:hover,
      :host(:not([variant]):not([is-disabled]):not([is-selected])) button:hover {
        background: var(--ds-background-brand-hovered);
      }
      :host([variant='primary']:not([is-disabled]):not([is-selected])) button:active,
      :host(:not([variant]):not([is-disabled]):not([is-selected])) button:active {
        background: var(--ds-background-brand-pressed);
      }

      /* ── Variant: tertiary ────────────────────────────────────────────── */
      :host([variant='tertiary']) button {
        background: var(--ds-background-neutral-subtle-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bold);
      }
      :host([variant='tertiary']:not([is-disabled]):not([is-selected])) button:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }
      :host([variant='tertiary']:not([is-disabled]):not([is-selected])) button:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }

      /* ── Variant: ghost ───────────────────────────────────────────────── */
      :host([variant='ghost']) button {
        background: var(--ds-background-neutral-subtle-default);
      }
      :host([variant='ghost']:not([is-disabled]):not([is-selected])) button:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }
      :host([variant='ghost']:not([is-disabled]):not([is-selected])) button:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }

      /* ── Selected (unified across variants) ───────────────────────────── */
      :host([is-selected]) button {
        background: var(--ds-background-selected-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-selected);
      }
      :host([is-selected]:not([is-disabled])) button:hover {
        background: var(--ds-background-selected-hovered);
      }
      :host([is-selected]:not([is-disabled])) button:active {
        background: var(--ds-background-selected-pressed);
      }

      /* ── Disabled ─────────────────────────────────────────────────────── */
      :host([is-disabled]) button {
        background: var(--ds-background-disabled);
        color: var(--ds-icon-icon-disabled);
        cursor: not-allowed;
        box-shadow: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsIconButton.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsIconButton.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsIconButton.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsIconButton.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-selected' })
], DsIconButton.prototype, "isSelected", void 0);
__decorate([
    property({ type: String, attribute: 'aria-label' })
], DsIconButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: String })
], DsIconButton.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean, attribute: 'is-tooltip-disabled' })
], DsIconButton.prototype, "isTooltipDisabled", void 0);
__decorate([
    property({ type: String, attribute: 'tooltip-align' })
], DsIconButton.prototype, "tooltipAlign", void 0);
DsIconButton = __decorate([
    customElement('ds-icon-button')
], DsIconButton);
export { DsIconButton };
//# sourceMappingURL=ds-icon-button.js.map
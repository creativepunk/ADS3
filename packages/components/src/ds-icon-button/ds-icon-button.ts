import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, innerFocusRingStyles, srOnlyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-tooltip/ds-tooltip.js';
import type { DsTooltipAlign } from '../ds-tooltip/ds-tooltip.js';

export type DsIconButtonVariant = 'primary' | 'tertiary' | 'ghost';
export type DsIconButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type DsIconButtonShape = 'default' | 'circle';
export type { DsTooltipAlign };

@customElement('ds-icon-button')
export class DsIconButton extends LitElement {
  static styles = [
    resetStyles,
    innerFocusRingStyles,
    srOnlyStyles,
    css`
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

  @property({ type: String, reflect: true })
  variant: DsIconButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  size: DsIconButtonSize = 'md';

  @property({ type: String, reflect: true })
  shape: DsIconButtonShape = 'default';

  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-selected' })
  isSelected = false;

  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel: string | null = null;

  /** Label text for the built-in tooltip. The tooltip only renders when this is set AND isTooltipDisabled is false. */
  @property({ type: String })
  tooltip = '';

  /** Hides the built-in tooltip. Defaults to true — opt in by setting this to false. */
  @property({ type: Boolean, attribute: 'is-tooltip-disabled' })
  isTooltipDisabled = true;

  /** Alignment of the built-in tooltip relative to the button. Defaults to 'bottom'. */
  @property({ type: String, attribute: 'tooltip-align' })
  tooltipAlign: DsTooltipAlign = 'bottom';

  private _handleClick = (e: MouseEvent) => {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch(this, 'ds-click', { originalEvent: e });
  };

  // The button template is shared between the tooltip and non-tooltip render paths.
  // When rendered inside <ds-tooltip>, the button carries slot="trigger".
  // aria-label falls back to the tooltip text so icon-only buttons always have
  // an accessible name even without an explicit ariaLabel prop.
  private _button(inTooltip: boolean) {
    const label = this.ariaLabel ?? (this.tooltip || null);
    return html`
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
      return html`
        <ds-tooltip align=${this.tooltipAlign}>
          ${this._button(true)}
          ${this.tooltip}
        </ds-tooltip>
      `;
    }
    return this._button(false);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-icon-button': DsIconButton;
  }
}

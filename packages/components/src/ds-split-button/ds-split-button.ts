import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
  innerFocusRingStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-icon/ds-icon.js';

export type DsSplitButtonSize = 'sm' | 'md' | 'lg';
export type DsSplitButtonVariant = 'primary' | 'tertiary';
export type DsSplitButtonType = 'text' | 'icon';

/**
 * A split button composing a text/icon action and a menu-trigger icon button
 * side-by-side. The left half fires `ds-button-click`; the right chevron
 * fires `ds-menu-click`.
 *
 * Variants:
 *   primary  — solid brand fill (default)
 *   tertiary — transparent with 1px border
 *
 * Types:
 *   text — left half shows a text label (default slot)
 *   icon — left half shows an icon (icon slot, square, no label)
 */
/** @tagname ds-split-button */
@customElement('ds-split-button')
export class DsSplitButton extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    innerFocusRingStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([is-disabled]) {
        pointer-events: none;
      }

      /* ── Outer wrapper ───────────────────────────────────────────────── */
      /* primary: 1px gap acts as the visual divider between halves        */
      /* tertiary: no gap — border is applied per-half                     */
      .root {
        display: inline-flex;
      }

      :host([variant='primary']) .root,
      :host(:not([variant])) .root {
        gap: 1px;
      }

      :host([variant='tertiary']) .root {
        gap: 0;
      }

      /* ── Shared button base ───────────────────────────────────────────── */
      .action-btn,
      .menu-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        position: relative;
        transition:
          background-color 120ms ease,
          box-shadow 120ms ease,
          color 120ms ease;
      }

      /* ── Action button (left half) ────────────────────────────────────── */
      .action-btn {
        border-radius: var(--ds-radius-semantic-radius-sm) 0 0
          var(--ds-radius-semantic-radius-sm);
        font-feature-settings: 'cv06' 1;
        color: var(--ds-text-text-default);
      }

      /* ── Menu button (right half — always square) ─────────────────────── */
      .menu-btn {
        border-radius: 0 var(--ds-radius-semantic-radius-sm)
          var(--ds-radius-semantic-radius-sm) 0;
        color: var(--ds-icon-icon-default);
        flex-shrink: 0;
      }

      /* ── Variant: primary ─────────────────────────────────────────────── */
      :host([variant='primary']) .action-btn,
      :host(:not([variant])) .action-btn,
      :host([variant='primary']) .menu-btn,
      :host(:not([variant])) .menu-btn {
        background: var(--ds-background-brand-default);
      }

      :host([variant='primary']:not([is-disabled])) .action-btn:hover,
      :host(:not([variant]):not([is-disabled])) .action-btn:hover,
      :host([variant='primary']:not([is-disabled])) .menu-btn:hover,
      :host(:not([variant]):not([is-disabled])) .menu-btn:hover {
        background: var(--ds-background-brand-hovered);
      }

      :host([variant='primary']:not([is-disabled])) .action-btn:active,
      :host(:not([variant]):not([is-disabled])) .action-btn:active,
      :host([variant='primary']:not([is-disabled])) .menu-btn:active,
      :host(:not([variant]):not([is-disabled])) .menu-btn:active {
        background: var(--ds-background-brand-pressed);
      }

      /* ── Variant: tertiary ────────────────────────────────────────────── */
      /* Left half: left + top + bottom border; right half: all sides        */
      :host([variant='tertiary']) .action-btn {
        background: var(--ds-background-neutral-subtle-default);
        box-shadow: inset 1px 0 0 0 var(--ds-border-border-bold),
          inset 0 1px 0 0 var(--ds-border-border-bold),
          inset 0 -1px 0 0 var(--ds-border-border-bold);
      }

      :host([variant='tertiary']) .menu-btn {
        background: var(--ds-background-neutral-subtle-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bold);
      }

      :host([variant='tertiary']:not([is-disabled])) .action-btn:hover,
      :host([variant='tertiary']:not([is-disabled])) .menu-btn:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }

      :host([variant='tertiary']:not([is-disabled])) .action-btn:active,
      :host([variant='tertiary']:not([is-disabled])) .menu-btn:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }

      /* ── Sizes — text type (action-btn has padding) ───────────────────── */
      :host([size='sm']) .action-btn:not(.action-btn--icon) {
        height: var(--ds-type-scale-y4); /* 24px */
        padding: 0 var(--ds-spacing-spacing-04); /* 8px */
      }
      :host([size='md']) .action-btn:not(.action-btn--icon),
      :host(:not([size])) .action-btn:not(.action-btn--icon) {
        height: var(--ds-type-scale-y6); /* 32px */
        padding: 0 var(--ds-spacing-spacing-05); /* 12px */
      }
      :host([size='lg']) .action-btn:not(.action-btn--icon) {
        height: var(--ds-type-scale-y7); /* 40px */
        padding: 0 var(--ds-spacing-spacing-06); /* 16px */
      }

      /* ── Sizes — icon type (action-btn is square) ─────────────────────── */
      :host([size='sm']) .action-btn--icon {
        width: var(--ds-type-scale-y4);
        height: var(--ds-type-scale-y4);
      }
      :host([size='md']) .action-btn--icon,
      :host(:not([size])) .action-btn--icon {
        width: var(--ds-type-scale-y6);
        height: var(--ds-type-scale-y6);
      }
      :host([size='lg']) .action-btn--icon {
        width: var(--ds-type-scale-y7);
        height: var(--ds-type-scale-y7);
      }

      /* ── Menu button sizes (always square) ───────────────────────────── */
      :host([size='sm']) .menu-btn {
        width: var(--ds-type-scale-y4);
        height: var(--ds-type-scale-y4);
      }
      :host([size='md']) .menu-btn,
      :host(:not([size])) .menu-btn {
        width: var(--ds-type-scale-y6);
        height: var(--ds-type-scale-y6);
      }
      :host([size='lg']) .menu-btn {
        width: var(--ds-type-scale-y7);
        height: var(--ds-type-scale-y7);
      }

      /* ── Disabled ─────────────────────────────────────────────────────── */
      :host([is-disabled]) .action-btn,
      :host([is-disabled]) .menu-btn {
        background: var(--ds-background-disabled);
        box-shadow: none;
        color: var(--ds-text-text-disabled);
        cursor: not-allowed;
      }

      /* ── Focus ring ───────────────────────────────────────────────────── */
      .action-btn:focus-visible,
      .menu-btn:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 2px;
        z-index: 1;
      }

      .action-btn:focus:not(:focus-visible),
      .menu-btn:focus:not(:focus-visible) {
        outline: none;
      }

      /* ── Icon slot ────────────────────────────────────────────────────── */
      .menu-icon,
      .action-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ds-spacing-spacing-06); /* 16px */
        height: var(--ds-spacing-spacing-06);
        flex-shrink: 0;
      }

      ::slotted(svg),
      ::slotted(img) {
        width: var(--ds-spacing-spacing-06);
        height: var(--ds-spacing-spacing-06);
        display: block;
        flex-shrink: 0;
      }

      ::slotted(ds-icon) {
        flex-shrink: 0;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  variant: DsSplitButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  type: DsSplitButtonType = 'text';

  @property({ type: String, reflect: true })
  size: DsSplitButtonSize = 'md';

  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Accessible label for the menu (chevron) button. */
  @property({ type: String, attribute: 'menu-aria-label' })
  menuAriaLabel = 'Open menu';

  /**
   * When true, sets aria-expanded="true" on the menu button.
   * The consuming component controls this based on whether the menu is open.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-menu-open' })
  isMenuOpen = false;

  private _handleActionClick = (e: MouseEvent) => {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch(this, 'ds-button-click', { originalEvent: e });
  };

  private _handleMenuClick = (e: MouseEvent) => {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch(this, 'ds-menu-click', { originalEvent: e });
  };

  render() {
    const isIcon = this.type === 'icon';

    return html`
      <div class="root">
        <button
          part="action-btn"
          type="button"
          class=${`action-btn text-medium-body-sm${isIcon ? ' action-btn--icon' : ''}`}
          ?disabled=${this.isDisabled}
          @click=${this._handleActionClick}
        >
          ${isIcon
            ? html`<span class="action-icon" aria-hidden="true">
                <slot name="actionIcon">
                  <ds-icon name="play_arrow" size="sm"></ds-icon>
                </slot>
              </span>`
            : html`<slot></slot>`}
        </button>
        <button
          part="menu-btn"
          type="button"
          class="menu-btn"
          ?disabled=${this.isDisabled}
          aria-label=${this.menuAriaLabel}
          aria-haspopup="true"
          aria-expanded=${this.isMenuOpen ? 'true' : nothing}
          @click=${this._handleMenuClick}
        >
          <span class="menu-icon" aria-hidden="true">
            <slot name="menuIcon">
              <ds-icon name="keyboard_arrow_down" size="sm"></ds-icon>
            </slot>
          </span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-split-button': DsSplitButton;
  }
}

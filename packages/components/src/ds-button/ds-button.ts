import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  innerFocusRingStyles,
  srOnlyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

export type DsButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger';
export type DsButtonSize = 'sm' | 'md' | 'lg';
export type DsButtonType = 'button' | 'submit' | 'reset';

@customElement('ds-button')
export class DsButton extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    innerFocusRingStyles,
    srOnlyStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([is-disabled]),
      :host([is-loading]) {
        pointer-events: none;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-spacing-spacing-04);
        padding: 0 var(--ds-spacing-spacing-05);
        border-radius: var(--ds-radius-semantic-radius-sm);
        /* Figma text style: Body/sm */
        font-family: var(--ds-typography-cozy-body-sm-font-family);
        font-size: var(--ds-typography-cozy-body-sm-font-size);
        font-weight: var(--ds-typography-cozy-body-sm-font-weight);
        line-height: var(--ds-typography-cozy-body-sm-line-height);
        letter-spacing: var(--ds-typography-cozy-body-sm-letter-spacing);
        font-feature-settings: 'cv08' 1;
        color: var(--ds-text-text-default);
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        position: relative;
        transition:
          background-color 120ms ease,
          box-shadow 120ms ease,
          color 120ms ease;
      }

      /* ── Size ─────────────────────────────────────────────────────────── */
      :host([size='sm']) button {
        height: var(--ds-type-scale-y4); /* 24px */
      }
      :host([size='md']) button,
      :host(:not([size])) button {
        height: var(--ds-type-scale-y6); /* 32px */
      }
      :host([size='lg']) button {
        height: var(--ds-type-scale-y7); /* 40px */
      }

      /* Interactive states only apply when the button is enabled. Chaining
         :not([is-disabled]) into the selectors makes the rules immune to the
         specificity quirk where a variant+:hover would outrank disabled. */

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

      /* ── Variant: secondary ───────────────────────────────────────────── */
      :host([variant='secondary']) button {
        background: var(--ds-background-neutral-default);
      }
      :host([variant='secondary']:not([is-disabled]):not([is-selected])) button:hover {
        background: var(--ds-background-neutral-hovered);
      }
      :host([variant='secondary']:not([is-disabled]):not([is-selected])) button:active {
        background: var(--ds-background-neutral-pressed);
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

      /* ── Variant: danger ──────────────────────────────────────────────── */
      :host([variant='danger']) button {
        background: var(--ds-background-danger-default);
      }
      :host([variant='danger']:not([is-disabled]):not([is-selected])) button:hover {
        background: var(--ds-background-danger-hovered);
      }
      :host([variant='danger']:not([is-disabled]):not([is-selected])) button:active {
        background: var(--ds-background-danger-pressed);
      }

      /* ── Selected (unified across variants) ───────────────────────────── */
      /* When selected, the variant's own background and border are replaced
         with the selected-bold token + border-selected stroke. Variant hover
         and active are suppressed via :not([is-selected]) on those rules. */
      :host([is-selected]) button {
        background: var(--ds-background-selected-bold-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-selected);
      }
      :host([is-selected]:not([is-disabled])) button:hover {
        background: var(--ds-background-selected-bold-hovered);
      }
      :host([is-selected]:not([is-disabled])) button:active {
        background: var(--ds-background-selected-bold-pressed);
      }

      /* ── Disabled (overrides variant; loading keeps variant color) ────── */
      :host([is-disabled]) button {
        background: var(--ds-background-disabled);
        color: var(--ds-text-text-disabled);
        cursor: not-allowed;
        box-shadow: none;
      }
      :host([is-loading]) button {
        cursor: progress;
      }

      /* ── Slots ────────────────────────────────────────────────────────── */
      .icon-slot {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ds-spacing-spacing-06);
        height: var(--ds-spacing-spacing-06);
        flex: 0 0 auto;
      }
      .icon-slot.empty {
        display: none;
      }
      ::slotted(svg),
      ::slotted(img) {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* ── Loading state ────────────────────────────────────────────────── */
      /* When loading, the label and icons collapse out of the flex layout
         so the button shrinks to fit just the spinner — matching the Figma
         loading width (40px regardless of label length). */
      :host([is-loading]) .label,
      :host([is-loading]) .icon-slot {
        display: none;
      }
      .spinner {
        display: none;
        align-items: center;
        justify-content: center;
        width: var(--ds-spacing-spacing-06);
        height: var(--ds-spacing-spacing-06);
        flex: 0 0 auto;
      }
      :host([is-loading]) .spinner {
        display: inline-flex;
      }
      .spinner-ring {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-top-color: transparent;
        animation: ds-button-spin 720ms linear infinite;
      }
      @keyframes ds-button-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spinner-ring {
          animation-duration: 2400ms;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  variant: DsButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  size: DsButtonSize = 'md';

  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-loading' })
  isLoading = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-selected' })
  isSelected = false;

  @property({ type: String, reflect: true })
  type: DsButtonType = 'button';

  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel: string | null = null;

  static formAssociated = true;
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  private _hasIconBefore = false;
  private _hasIconAfter = false;

  private _onBeforeSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasIconBefore = slot.assignedNodes({ flatten: true }).length > 0;
    this.requestUpdate();
  };

  private _onAfterSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasIconAfter = slot.assignedNodes({ flatten: true }).length > 0;
    this.requestUpdate();
  };

  private _handleClick = (e: MouseEvent) => {
    if (this.isDisabled || this.isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (this.type === 'submit') {
      this._internals.form?.requestSubmit();
    } else if (this.type === 'reset') {
      this._internals.form?.reset();
    }
    dispatch(this, 'ds-click', { originalEvent: e });
  };

  render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.isDisabled}
        aria-busy=${this.isLoading ? 'true' : nothing}
        aria-pressed=${this.isSelected ? 'true' : nothing}
        aria-label=${this.ariaLabel ?? nothing}
        @click=${this._handleClick}
      >
        <span
          class="icon-slot ${this._hasIconBefore ? '' : 'empty'}"
          aria-hidden="true"
        >
          <slot name="icon-before" @slotchange=${this._onBeforeSlotChange}></slot>
        </span>
        <span class="label"><slot></slot></span>
        <span
          class="icon-slot ${this._hasIconAfter ? '' : 'empty'}"
          aria-hidden="true"
        >
          <slot name="icon-after" @slotchange=${this._onAfterSlotChange}></slot>
        </span>
        <span class="spinner" aria-hidden="true">
          <span class="spinner-ring"></span>
        </span>
        ${this.isLoading ? html`<span class="sr-only">Loading</span>` : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': DsButton;
  }
}

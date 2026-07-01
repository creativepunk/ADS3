import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

export type DsSegmentedButtonSize = 'sm' | 'md' | 'lg';

/** @tagname ds-segmented-button-item */
@customElement('ds-segmented-button-item')
export class DsSegmentedButtonItem extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: contents;
      }

      button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-spacing-spacing-03, 6px);
        flex-shrink: 0;
        background: var(--ds-background-neutral-subtle-default, rgba(255, 255, 255, 0));
        border: none;
        border-radius: 0;
        cursor: pointer;
        color: var(--ds-text-text-default, #f0f0f0);
        font-family: var(--ds-font-family-normal, 'Inter', sans-serif);
        font-size: var(--ds-typography-cozy-medium-body-sm-font-size, 14px);
        font-weight: var(--ds-typography-cozy-medium-body-sm-font-weight, 500);
        line-height: var(--ds-typography-cozy-medium-body-sm-line-height, 16px);
        letter-spacing: var(--ds-typography-cozy-medium-body-sm-letter-spacing, 0.5px);
        font-feature-settings: 'cv08' 1, 'cv05' 1, 'zero' 1;
        white-space: nowrap;
        box-shadow: none;
        transition: background 100ms ease;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* Default (md) */
        height: 32px;
        padding: var(--ds-spacing-spacing-04, 8px) var(--ds-spacing-spacing-05, 12px);
      }

      /* ── Sizes (text variant) ─────────────────────────────────────────────── */
      :host([size='sm']) button {
        height: 24px;
        padding: var(--ds-spacing-spacing-02, 4px) var(--ds-spacing-spacing-04, 8px);
      }

      :host([size='lg']) button {
        height: 40px;
        padding: var(--ds-spacing-spacing-04, 8px) var(--ds-spacing-spacing-06, 16px);
      }

      /* ── Fill-parent: button expands to fill equal share of group width ─────── */
      :host([fill-parent]) button {
        flex: 1 1 0;
        width: 100%;
      }

      /* ── Icon-only: 2px padding + square dimensions ───────────────────────── */
      :host([icon-only]) button {
        padding: var(--ds-spacing-spacing-01, 2px);
        width: 32px;
        height: 32px;
      }

      :host([icon-only][size='sm']) button {
        width: 24px;
        height: 24px;
      }

      :host([icon-only][size='lg']) button {
        width: 40px;
        height: 40px;
      }

      /* ── Position — corner radius ─────────────────────────────────────────── */
      :host([position='left']) button {
        border-radius: var(--ds-radius-sm, 4px) 0 0 var(--ds-radius-sm, 4px);
      }

      :host([position='right']) button {
        border-radius: 0 var(--ds-radius-sm, 4px) var(--ds-radius-sm, 4px) 0;
      }

      /* ── Hover ────────────────────────────────────────────────────────────── */
      button:hover:not(:disabled) {
        background: var(--ds-background-neutral-subtle-hovered, rgba(255, 255, 255, 0.2));
      }

      /* ── Pressed ──────────────────────────────────────────────────────────── */
      button:active:not(:disabled) {
        background: var(--ds-background-neutral-subtle-pressed, rgba(255, 255, 255, 0.08));
      }

      /* ── Selected ─────────────────────────────────────────────────────────── */
      :host([is-selected]) button {
        background: var(--ds-background-selected-default, rgba(255, 255, 255, 0.08));
        box-shadow: inset 0 0 0 1px var(--ds-border-border-selected, #0055bd);
      }

      :host([is-selected]) button:hover:not(:disabled) {
        background: var(--ds-background-selected-hovered, rgba(255, 255, 255, 0.12));
      }

      :host([is-selected]) button:active:not(:disabled) {
        background: var(--ds-background-selected-pressed, rgba(255, 255, 255, 0.05));
      }

      /* ── Disabled ─────────────────────────────────────────────────────────── */
      button:disabled {
        cursor: not-allowed;
        background: var(--ds-background-neutral-subtle-default, rgba(255, 255, 255, 0));
        box-shadow: none;
        color: var(--ds-text-text-disabled, rgba(255, 255, 255, 0.25));
      }

      /* ── Focus ring ───────────────────────────────────────────────────────── */
      button:focus-visible {
        outline: 2px solid var(--ds-focus-focus, #ffffff);
        outline-offset: -3px;
        border-radius: var(--ds-radius-focus-sm, 6px);
        z-index: 1;
      }

      button:focus:not(:focus-visible) {
        outline: none;
      }
    `,
  ];

  /** Position within the group — set automatically by ds-segmented-button. */
  @property({ type: String, reflect: true })
  position: 'left' | 'middle' | 'right' = 'middle';

  /** Size — inherited from parent ds-segmented-button. */
  @property({ type: String, reflect: true })
  size: DsSegmentedButtonSize = 'md';

  /** Whether this item is currently the active selection. */
  @property({ type: Boolean, reflect: true, attribute: 'is-selected' })
  isSelected = false;

  /** Disables this specific item. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /**
   * Set by the parent group when it has is-disabled. Kept separate from
   * isDisabled so per-item disabled state is preserved when the group
   * re-enables.
   */
  @property({ type: Boolean })
  groupDisabled = false;

  /** Value emitted in ds-segmented-change when selected. */
  @property({ type: String, reflect: true })
  value = '';

  /** Set by parent group when width-fill is on. Makes the button flex-grow to fill its share. */
  @property({ type: Boolean, reflect: true, attribute: 'fill-parent' })
  fillParent = false;

  /** Renders icon-only layout (square, 2px padding). Requires `label` for accessibility. */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  iconOnly = false;

  /** Accessible label — used as aria-label when icon-only. */
  @property({ type: String, reflect: true })
  label = '';

  private get _disabled() {
    return this.isDisabled || this.groupDisabled;
  }

  private _handleClick(e: MouseEvent) {
    if (this._disabled || this.isSelected) return;
    dispatch(this, 'ds-segmented-change', {
      value: this.value,
      selected: true,
      originalEvent: e,
    });
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this._disabled || this.isSelected) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dispatch(this, 'ds-segmented-change', {
        value: this.value,
        selected: true,
        originalEvent: e,
      });
    }
  }

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this._disabled}
        aria-pressed=${this.isSelected ? 'true' : 'false'}
        aria-label=${this.label || nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-segmented-button-item': DsSegmentedButtonItem;
  }
}

// ─── Group ────────────────────────────────────────────────────────────────────

/** @tagname ds-segmented-button */
@customElement('ds-segmented-button')
export class DsSegmentedButton extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: inline-flex;
      }

      :host([width-fill]) {
        display: flex;
        width: 100%;
      }

      .group {
        display: inline-flex;
        align-items: stretch;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default, rgba(255, 255, 255, 0.08));
        border-radius: var(--ds-radius-sm, 4px);
        overflow: hidden;
      }

      :host([width-fill]) .group {
        display: flex;
        width: 100%;
      }
    `,
  ];

  /** Visual size propagated to all items. */
  @property({ type: String, reflect: true })
  size: DsSegmentedButtonSize = 'md';

  /** Disables all items in the group. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Makes all buttons fill the group width equally instead of hugging content. */
  @property({ type: Boolean, reflect: true, attribute: 'width-fill' })
  widthFill = false;

  private _getItems(): DsSegmentedButtonItem[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === 'ds-segmented-button-item') as DsSegmentedButtonItem[];
  }

  private _syncChildren() {
    const items = this._getItems();
    items.forEach((item, i) => {
      item.size = this.size;
      // Always set both ways so toggling group disabled correctly re-enables items
      // without disturbing per-item isDisabled.
      item.groupDisabled = this.isDisabled;
      item.fillParent = this.widthFill;
      if (items.length === 1) {
        item.position = 'left';
      } else if (i === 0) {
        item.position = 'left';
      } else if (i === items.length - 1) {
        item.position = 'right';
      } else {
        item.position = 'middle';
      }
    });
  }

  override updated() {
    this._syncChildren();
  }

  private _onSlotChange = () => {
    this._syncChildren();
  };

  private _onSegmentedChange = (e: Event) => {
    const item = e.target as DsSegmentedButtonItem;
    if (item.tagName.toLowerCase() !== 'ds-segmented-button-item') return;
    // Exactly one item must always be selected — deselect all then select the target.
    this._getItems().forEach((el) => {
      el.isSelected = el === item;
    });
  };

  render() {
    return html`
      <div
        class="group"
        role="group"
        aria-disabled=${this.isDisabled ? 'true' : 'false'}
        @ds-segmented-change=${this._onSegmentedChange}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-segmented-button': DsSegmentedButton;
  }
}

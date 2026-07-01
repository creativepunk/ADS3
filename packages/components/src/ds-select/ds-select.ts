import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import type { DsSelectMenuChangeEvent } from '../shared/events.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';

export type DsSelectSelection = 'single' | 'multi';
export type DsSelectType = 'default' | 'inline';

const CHEVRON_DOWN = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M4 6L8 10L12 6"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

const CHEVRON_UP = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M4 10L8 6L12 10"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

const CHIP_CLOSE_SVG = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M2 2L10 10M10 2L2 10"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>`;

/** @tagname ds-select */
@customElement('ds-select')
export class DsSelect extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
      }

      /* ── Trigger wrapper — anchor for the dropdown ────────────── */
      .trigger-wrap {
        position: relative;
      }

      /* ── Trigger ──────────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-03); /* 6px */
        height: 32px;
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-04); /* 4px 8px */
        background: var(--ds-background-input-default);
        border: none;
        border-bottom: 1px solid var(--ds-border-border-bold);
        color: var(--ds-text-text-default);
        cursor: pointer;
        width: 100%;
        outline: none;
        transition: background 80ms ease;
        box-sizing: border-box;
      }

      .trigger:hover {
        background: var(--ds-background-input-hovered);
      }

      .trigger:active {
        background: var(--ds-background-input-pressed);
      }

      .trigger:focus {
        outline: none;
        border-bottom-color: var(--ds-focus-focus);
      }

      /* ── Trigger states ───────────────────────────────────────── */
      :host([invalid]) .trigger {
        border-bottom-color: var(--ds-border-border-danger);
      }

      :host([valid]) .trigger {
        border-bottom-color: var(--ds-border-border-success);
      }

      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
        cursor: default;
        pointer-events: none;
      }

      :host([disabled]) .trigger {
        background: var(--ds-background-input-disabled);
        border-bottom-color: var(--ds-border-border-disabled);
        pointer-events: none;
        cursor: not-allowed;
      }

      /* ── Trigger content ──────────────────────────────────────── */
      .trigger-content {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-02);
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .placeholder {
        color: var(--ds-text-text-subtlest);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([disabled]) .placeholder {
        color: var(--ds-text-text-disabled);
      }

      .selected-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--ds-text-text-default);
      }

      :host([disabled]) .selected-label {
        color: var(--ds-text-text-disabled);
      }

      /* ── Multi selection chip ─────────────────────────────────── */
      .selection-chip {
        display: inline-flex;
        align-items: center;
        gap: 1px;
        flex-shrink: 0;
      }

      .selection-chip-label {
        display: inline-flex;
        align-items: center;
        height: 20px;
        padding: 0 var(--ds-spacing-spacing-04); /* 8px */
        background: var(--ds-color-default-gray-90, #404040);
        border-radius: var(--ds-radius-semantic-radius-xs, 2px) 0 0 var(--ds-radius-semantic-radius-xs, 2px);
        color: var(--ds-text-text-default);
        white-space: nowrap;
      }

      .selection-chip-clear {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 0;
        background: var(--ds-color-default-gray-90, #404040);
        border: none;
        border-radius: 0 var(--ds-radius-semantic-radius-xs, 2px) var(--ds-radius-semantic-radius-xs, 2px) 0;
        cursor: pointer;
        color: var(--ds-icon-icon-default);
        flex-shrink: 0;
        outline: none;
        transition: background 80ms ease;
      }

      .selection-chip-clear:hover {
        background: var(--ds-color-hover-gray-90, #525252);
      }

      :host([disabled]) .selection-chip-label {
        background: var(--ds-background-neutral-subtle-default);
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .selection-chip-clear {
        background: var(--ds-background-neutral-subtle-default);
        color: var(--ds-icon-icon-disabled);
      }

      /* ── Chevron icon ─────────────────────────────────────────── */
      .chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--ds-icon-icon-subtle);
        margin-left: auto;
      }

      :host([disabled]) .chevron {
        color: var(--ds-icon-icon-disabled);
      }

      /* ── Dropdown ─────────────────────────────────────────────── */
      .dropdown {
        position: absolute;
        top: calc(100% + var(--ds-spacing-spacing-02, 4px));
        left: 0;
        right: 0;
        z-index: 100;
      }

      .dropdown[hidden] {
        display: none !important;
      }

      ::slotted(ds-single-select-menu),
      ::slotted(ds-multi-select-menu) {
        display: block;
        width: 100%;
      }

      [hidden] {
        display: none !important;
      }
    `,
  ];

  /** Determines whether the trigger renders single-value or chip-based multi-value display. */
  @property({ type: String, reflect: true })
  selection: DsSelectSelection = 'single';

  /** `default` = stacked label above trigger; `inline` = 180px label to the left. */
  @property({ type: String, reflect: true })
  type: DsSelectType = 'default';

  /** Label text above / beside the trigger. */
  @property({ type: String, reflect: true })
  label = '';

  /** Placeholder shown when no value is selected. */
  @property({ type: String, reflect: true })
  placeholder = 'Select';

  /** Helper text shown below the trigger. */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = '';

  /** Error message shown when invalid=true. */
  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage = 'Error message';

  /** Success message shown when valid=true. */
  @property({ type: String, reflect: true, attribute: 'success-message' })
  successMessage = 'Success message';

  /** Marks the field as required — adds asterisk to label. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** Shows a clear (×) button when a single value is selected. */
  @property({ type: Boolean, reflect: true, attribute: 'is-clearable' })
  isClearable = false;

  /** Disables the entire control. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Makes the field read-only (trigger not interactive, dropdown never opens). */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Shows error state — red bottom border + error message. */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Shows success state — green bottom border + success message. */
  @property({ type: Boolean, reflect: true })
  valid = false;

  /** Currently selected values — synced from the slotted menu. */
  @property({ type: Array })
  values: string[] = [];

  @state() private _open = false;
  @state() private _focusedIndex = -1;

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('ds-select-menu-change', this._onMenuChange as EventListener);
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onDocKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ds-select-menu-change', this._onMenuChange as EventListener);
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onDocKeydown);
  }

  // ─── Event handlers ─────────────────────────────────────────────────────────

  private _onMenuChange = (e: DsSelectMenuChangeEvent) => {
    this.values = e.detail.values;
    dispatch(this, 'ds-select-change', {
      values: e.detail.values,
      originalEvent: e.detail.originalEvent,
    });
    if (this.selection === 'single') {
      this._open = false;
    }
  };

  private _closeDropdown() {
    this._open = false;
    this._focusedIndex = -1;
  }

  private _onTriggerClick(e: MouseEvent) {
    if (this.disabled || this.readonly) return;
    e.stopPropagation();
    if (this._open) {
      this._closeDropdown();
    } else {
      this._open = true;
      this._focusedIndex = -1;
    }
  }

  private _onTriggerKeydown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;
    if (!this._open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._open = true;
        this._focusedIndex = -1;
      }
      return;
    }

    const enabled = this._slottedItems().filter((i) => !i.disabled);
    const max = enabled.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, max);
        this._scrollFocusedIntoView();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        this._scrollFocusedIntoView();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this._focusedIndex >= 0) {
          this._activateFocusedItem();
        } else {
          this._closeDropdown();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._closeDropdown();
        break;
      case 'Tab':
        this._closeDropdown();
        break;
    }
  }

  private _onDropdownMousedown(e: MouseEvent) {
    // Prevent items from stealing DOM focus from the trigger div
    e.preventDefault();
  }

  private _onDropdownMouseover(e: MouseEvent) {
    if (!this._open) return;
    const tag =
      this.selection === 'multi' ? 'ds-multi-select-menu-item' : 'ds-single-select-menu-item';
    const item = (e.target as Element).closest(tag) as
      | (HTMLElement & { value: string; disabled: boolean })
      | null;
    if (!item || item.disabled) return;
    const enabled = this._slottedItems().filter((i) => !i.disabled);
    const idx = enabled.findIndex((i) => i === item);
    if (idx !== -1) this._focusedIndex = idx;
  }

  private _onClearClick(e: MouseEvent) {
    e.stopPropagation();
    this.values = [];
    this._slottedItems().forEach((item) => { item.selected = false; });
    this._closeDropdown();
    dispatch(this, 'ds-select-change', { values: [], originalEvent: e });
  }

  private _onDocClick = (e: MouseEvent) => {
    if (!this._open) return;
    if (!this.contains(e.target as Node)) {
      this._closeDropdown();
    }
  };

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._open) {
      this._closeDropdown();
    }
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private _slottedItems(): (HTMLElement & { value: string; selected: boolean; disabled: boolean })[] {
    const tag =
      this.selection === 'multi' ? 'ds-multi-select-menu-item' : 'ds-single-select-menu-item';
    return Array.from(
      this.querySelectorAll<HTMLElement & { value: string; selected: boolean; disabled: boolean }>(tag),
    );
  }

  private _activateFocusedItem() {
    const enabled = this._slottedItems().filter((i) => !i.disabled);
    const item = enabled[this._focusedIndex];
    if (!item) return;
    dispatch(item, 'ds-menu-select', {
      value: item.value,
      selected: !item.selected,
      originalEvent: new KeyboardEvent('keydown'),
    });
  }

  private _scrollFocusedIntoView() {
    this.updateComplete.then(() => {
      const focused = this.querySelector('[data-focused]') as HTMLElement | null;
      focused?.scrollIntoView({ block: 'nearest' });
    });
  }

  private _syncFocusedAttr() {
    const tag =
      this.selection === 'multi' ? 'ds-multi-select-menu-item' : 'ds-single-select-menu-item';
    const items = Array.from(
      this.querySelectorAll<HTMLElement & { value: string; disabled: boolean }>(tag),
    );
    const enabled = items.filter((i) => !i.disabled);
    items.forEach((el) => el.removeAttribute('data-focused'));
    const target = enabled[this._focusedIndex];
    target?.setAttribute('data-focused', '');
  }

  private _labelForValue(value: string): string {
    const item = this.querySelector(
      `ds-single-select-menu-item[value="${CSS.escape(value)}"], ds-multi-select-menu-item[value="${CSS.escape(value)}"]`,
    );
    return item?.textContent?.trim() ?? value;
  }

  private _renderTriggerContent() {
    if (this.values.length === 0) {
      return html`<span class="placeholder text-regular-body-md">${this.placeholder}</span>`;
    }

    if (this.selection === 'multi') {
      return html`
        <span class="selection-chip">
          <span class="selection-chip-label text-medium-body-sm">
            ${this.values.length} selected
          </span>
          <button
            class="selection-chip-clear"
            type="button"
            aria-label="Clear selection"
            @click=${this._onClearClick}
          >
            ${CHIP_CLOSE_SVG}
          </button>
        </span>
      `;
    }

    return html`<span class="selected-label text-regular-body-md">${this._labelForValue(this.values[0])}</span>`;
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  render() {
    const listboxId = 'ds-select-listbox';
    const showClear =
      this.isClearable &&
      this.selection === 'single' &&
      this.values.length > 0 &&
      !this.disabled &&
      !this.readonly;

    return html`
      <ds-field-input
        label=${this.label || nothing}
        ?is-required=${this.isRequired}
        type=${this.type}
        helper-text=${this.helperText || nothing}
        error-message=${this.errorMessage}
        success-message=${this.successMessage}
        ?invalid=${this.invalid}
        ?valid=${this.valid}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
      >
        <div class="trigger-wrap">
          <div
            class="trigger text-regular-body-md"
            tabindex=${this.disabled ? '-1' : '0'}
            role="button"
            aria-haspopup="listbox"
            aria-expanded=${this._open ? 'true' : 'false'}
            aria-controls=${listboxId}
            aria-label=${this.label || this.placeholder}
            aria-disabled=${this.disabled ? 'true' : nothing}
            @click=${this._onTriggerClick}
            @keydown=${this._onTriggerKeydown}
          >
            <span class="trigger-content">
              ${this._renderTriggerContent()}
            </span>
            ${showClear
              ? html`
                  <ds-icon-button
                    variant="ghost"
                    size="xs"
                    shape="circle"
                    aria-label="Clear selection"
                    @click=${this._onClearClick}
                  >
                    <ds-icon name="close" size="sm"></ds-icon>
                  </ds-icon-button>
                `
              : nothing}
            <span class="chevron">
              ${this._open ? CHEVRON_UP : CHEVRON_DOWN}
            </span>
          </div>
          <div
            class="dropdown"
            id=${listboxId}
            ?hidden=${!this._open}
            role="presentation"
            @mousedown=${this._onDropdownMousedown}
            @mouseover=${this._onDropdownMouseover}
          >
            <slot @slotchange=${this._onSlotChange}></slot>
          </div>
        </div>
      </ds-field-input>
    `;
  }

  // ─── After render: sync data-focused onto menu items ─────────────────────────

  protected updated() {
    this._syncFocusedAttr();
  }

  // ─── Slot change ─────────────────────────────────────────────────────────────

  private _onSlotChange() {
    const menu = this.querySelector('ds-single-select-menu, ds-multi-select-menu');
    if (!menu) return;
    const tag = menu.tagName.toLowerCase();
    const itemTag =
      tag === 'ds-single-select-menu' ? 'ds-single-select-menu-item' : 'ds-multi-select-menu-item';
    const items = Array.from(menu.querySelectorAll(itemTag)) as (Element & {
      selected: boolean;
      value: string;
    })[];
    const selected = items.filter((i) => i.selected).map((i) => i.value);
    if (selected.length > 0 && this.values.length === 0) {
      this.values = selected;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-select': DsSelect;
  }
}

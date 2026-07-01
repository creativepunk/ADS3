import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import type { DsMenuSelectEvent } from '../shared/events.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
import '../ds-single-select-menu/ds-single-select-menu.js';
import '../ds-multi-select-menu/ds-multi-select-menu.js';

export type DsComboboxType = 'default' | 'inline';

export interface DsComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

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

const CHEVRON_DOWN = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const CHEVRON_UP = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** @tagname ds-combobox */
@customElement('ds-combobox')
export class DsCombobox extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
      }

      /* ── Trigger wrapper — anchor for the dropdown ─────────────── */
      .trigger-wrap {
        position: relative;
      }

      /* ── Trigger ───────────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-03);
        height: 32px;
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-04);
        background: var(--ds-background-input-default);
        border: none;
        border-bottom: 1px solid var(--ds-border-border-bold);
        color: var(--ds-text-text-default);
        width: 100%;
        outline: none;
        transition: background 80ms ease;
        cursor: text;
        box-sizing: border-box;
      }

      .trigger:hover {
        background: var(--ds-background-input-hovered);
      }

      .trigger:focus-within {
        border-bottom-color: var(--ds-focus-focus);
      }

      /* ── Trigger states ────────────────────────────────────────── */
      :host([invalid]) .trigger {
        border-bottom-color: var(--ds-border-border-danger);
      }

      :host([valid]) .trigger {
        border-bottom-color: var(--ds-border-border-success);
      }

      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
        cursor: default;
      }

      :host([readonly]) .search-input {
        pointer-events: none;
      }

      :host([disabled]) .trigger {
        background: var(--ds-background-input-disabled);
        border-bottom-color: var(--ds-border-border-disabled);
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .search-input {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .search-input::placeholder {
        color: var(--ds-text-text-disabled);
      }

      /* ── Search input ──────────────────────────────────────────── */
      .search-input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        color: var(--ds-text-text-default);
        caret-color: var(--ds-text-text-default);
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
      }

      .search-input::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      .search-input.ghost-mode::placeholder {
        color: var(--ds-text-text-subtle);
      }

      /* ── Chevron ───────────────────────────────────────────────── */
      .chevron {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--ds-icon-icon-subtle);
        cursor: pointer;
      }

      :host([disabled]) .chevron {
        color: var(--ds-icon-icon-disabled);
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
        padding: 0 var(--ds-spacing-spacing-04);
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

      /* ── Dropdown panel ────────────────────────────────────────── */
      .dropdown {
        position: absolute;
        top: calc(100% + var(--ds-spacing-spacing-02, 4px));
        left: 0;
        right: 0;
        z-index: 200;
      }

      .dropdown[hidden] {
        display: none !important;
      }

      /* constrain menu body to ~6.5 items (40px × 6.5 = 260px) */
      ds-single-select-menu,
      ds-multi-select-menu {
        --ds-menu-body-max-height: 260px;
        display: block;
        width: 100%;
      }

      [hidden] {
        display: none !important;
      }
    `,
  ];

  // ─── Public API ────────────────────────────────────────────────────────────

  @property({ type: String, reflect: true })
  selection: 'single' | 'multi' = 'single';

  @property({ type: String, reflect: true })
  type: DsComboboxType = 'default';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  placeholder = 'Select';

  @property({ type: Array })
  options: DsComboboxOption[] = [];

  @property({ type: Array })
  values: string[] = [];

  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage = 'Error message';

  @property({ type: String, reflect: true, attribute: 'success-message' })
  successMessage = 'Success message';

  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-clearable' })
  isClearable = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ type: Boolean, reflect: true })
  valid = false;

  // ─── Internal state ────────────────────────────────────────────────────────

  @state() private _open = false;
  @state() private _query = '';
  @state() private _focusedIndex = -1;

  @query('.search-input') private _input!: HTMLInputElement;

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    // Capture ds-menu-select before the menu processes it so we own selection state
    this.addEventListener('ds-menu-select', this._onItemSelect as EventListener, true);
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onDocKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ds-menu-select', this._onItemSelect as EventListener, true);
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onDocKeydown);
  }

  // ─── Computed ──────────────────────────────────────────────────────────────

  private get _filtered(): DsComboboxOption[] {
    const q = this._query.trim().toLowerCase();
    if (!q) return this.options;
    return this.options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.description?.toLowerCase().includes(q) ?? false),
    );
  }

  // ─── Handlers ──────────────────────────────────────────────────────────────

  private _openDropdown() {
    if (this.disabled || this.readonly) return;
    this._open = true;
    this._query = '';
    this._focusedIndex = -1;
  }

  private _closeDropdown() {
    this._open = false;
    this._query = '';
    this._focusedIndex = -1;
  }

  private _onTriggerClick(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    const isInputClick = this._input && (e.target === this._input || this._input.contains(e.target as Node));
    if (this._open && isInputClick) return;
    if (this._open) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
    this.updateComplete.then(() => this._input?.focus());
  }

  private _onInputInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._query = input.value;
    this._focusedIndex = -1;
    if (!this._open) this._open = true;
  }

  private _onInputKeydown(e: KeyboardEvent) {
    if (!this._open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this._openDropdown();
        this.updateComplete.then(() => this._input?.focus());
      }
      return;
    }

    const enabled = this._filtered.filter((o) => !o.disabled);
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
        e.preventDefault();
        if (this._focusedIndex >= 0 && this._focusedIndex <= max) {
          this._activateFocusedItem();
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

  // Intercepts ds-menu-select at capture before the menu processes it.
  // This is the single source of truth for selection so filtering never loses prior selections.
  private _onItemSelect = (e: DsMenuSelectEvent) => {
    e.stopImmediatePropagation(); // prevent menu from re-computing its own values list
    const { value, originalEvent } = e.detail;

    let next: string[];
    if (this.selection === 'multi') {
      const set = new Set(this.values);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      next = [...set];
    } else {
      next = [value];
    }

    this.values = next;
    dispatch(this, 'ds-combobox-change', { values: next, originalEvent });

    if (this.selection === 'single') {
      this._closeDropdown();
    } else {
      this.updateComplete.then(() => this._input?.focus());
    }
  };

  private _activateFocusedItem() {
    const enabled = this._filtered.filter((o) => !o.disabled);
    if (this._focusedIndex < 0 || this._focusedIndex >= enabled.length) return;
    const option = enabled[this._focusedIndex];
    // Synthesise the same event the menu item would fire on click
    dispatch(this, 'ds-menu-select', {
      value: option.value,
      selected: !this.values.includes(option.value),
      originalEvent: new KeyboardEvent('keydown'),
    });
  }

  private _focusedItemEl(): Element | null {
    return this.shadowRoot?.querySelector('[data-focused]') ?? null;
  }

  private _onClearClick(e: MouseEvent) {
    e.stopPropagation();
    this.values = [];
    this._closeDropdown();
    dispatch(this, 'ds-combobox-change', { values: [], originalEvent: e });
    this.updateComplete.then(() => this._input?.focus());
  }

  private _onDocClick = (e: MouseEvent) => {
    if (!this._open) return;
    if (!this.contains(e.target as Node) && !this.shadowRoot?.contains(e.target as Node)) {
      this._closeDropdown();
    }
  };

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._open) {
      this._closeDropdown();
    }
  };

  private _onDropdownMouseover(e: MouseEvent) {
    const tag = this.selection === 'multi' ? 'ds-multi-select-menu-item' : 'ds-single-select-menu-item';
    const item = (e.target as Element).closest(tag);
    if (!item) return;
    const enabled = this._filtered.filter((o) => !o.disabled);
    const value = (item as HTMLElement & { value?: string }).value;
    const idx = enabled.findIndex((o) => o.value === value);
    if (idx !== -1) this._focusedIndex = idx;
  }

  private _scrollFocusedIntoView() {
    this.updateComplete.then(() => {
      const el = this._focusedItemEl() as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private _syncFocusedAttr(items: NodeListOf<Element>, enabled: DsComboboxOption[]) {
    items.forEach((el) => el.removeAttribute('data-focused'));
    if (this._focusedIndex >= 0 && this._focusedIndex < enabled.length) {
      const target = Array.from(items).find(
        (el) => (el as HTMLElement & { value?: string }).value === enabled[this._focusedIndex].value,
      );
      target?.setAttribute('data-focused', '');
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const filtered = this._filtered;

    const selectionChip =
      this.selection === 'multi' && this.values.length > 0
        ? html`
            <span class="selection-chip">
              <span class="selection-chip-label text-medium-body-sm">
                ${this.values.length} selected
              </span>
              <button
                class="selection-chip-clear"
                type="button"
                aria-label="Clear selection"
                @click=${this._onClearClick}
              >${CHIP_CLOSE_SVG}</button>
            </span>
          `
        : nothing;

    const showClear =
      this.isClearable &&
      this.selection === 'single' &&
      this.values.length > 0 &&
      !this._open &&
      !this.disabled &&
      !this.readonly;

    const menu = this.selection === 'multi'
      ? html`
          <ds-multi-select-menu
            empty-text="No results"
            ?loading=${this.loading}
          >
            ${filtered.map((o) => html`
              <ds-multi-select-menu-item
                value=${o.value}
                ?selected=${this.values.includes(o.value)}
                ?disabled=${o.disabled ?? false}
              >${o.label}${o.description
                ? html`<span slot="description">${o.description}</span>`
                : nothing}</ds-multi-select-menu-item>
            `)}
          </ds-multi-select-menu>
        `
      : html`
          <ds-single-select-menu
            empty-text="No results"
            ?loading=${this.loading}
          >
            ${filtered.map((o) => html`
              <ds-single-select-menu-item
                value=${o.value}
                ?selected=${this.values.includes(o.value)}
                ?disabled=${o.disabled ?? false}
              >${o.label}${o.description
                ? html`<span slot="description">${o.description}</span>`
                : nothing}</ds-single-select-menu-item>
            `)}
          </ds-single-select-menu>
        `;

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
            class="trigger"
            @click=${this._onTriggerClick}
          >
            ${selectionChip}
            <input
              class="search-input text-regular-body-md${this._open && this.selection === 'single' && this.values.length > 0 && !this._query ? ' ghost-mode' : ''}"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded=${this._open ? 'true' : 'false'}
              aria-controls="ds-combobox-listbox"
              aria-label=${this.label || this.placeholder}
              autocomplete="off"
              spellcheck="false"
              placeholder=${
                this._open && this.selection === 'single' && this.values.length > 0
                  ? (this.options.find((o) => o.value === this.values[0])?.label ?? this.values[0])
                  : this.selection === 'multi' && this.values.length > 0
                    ? ''
                    : this.placeholder
              }
              .value=${!this._open && this.selection === 'single' && this.values.length > 0
                ? (this.options.find((o) => o.value === this.values[0])?.label ?? this.values[0])
                : this._query}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @input=${this._onInputInput}
              @keydown=${this._onInputKeydown}
            />
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
            <span class="chevron" aria-hidden="true">
              ${this._open ? CHEVRON_UP : CHEVRON_DOWN}
            </span>
          </div>
          <div
            class="dropdown"
            id="ds-combobox-listbox"
            ?hidden=${!this._open}
            @mouseover=${this._onDropdownMouseover}
          >
            ${menu}
          </div>
        </div>
      </ds-field-input>
    `;
  }

  // ─── After render: sync data-focused onto menu items ───────────────────────

  protected updated() {
    const tag = this.selection === 'multi' ? 'ds-multi-select-menu-item' : 'ds-single-select-menu-item';
    const items = this.shadowRoot?.querySelectorAll(tag);
    if (items) {
      const enabled = this._filtered.filter((o) => !o.disabled);
      this._syncFocusedAttr(items, enabled);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-combobox': DsCombobox;
  }
}

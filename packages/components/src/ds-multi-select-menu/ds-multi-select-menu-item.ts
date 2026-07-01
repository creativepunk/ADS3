import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
  innerFocusRingStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-checkbox/ds-checkbox.js';

export type DsMultiSelectMenuItemSize = 'sm' | 'md';

/** @tagname ds-multi-select-menu-item */
@customElement('ds-multi-select-menu-item')
export class DsMultiSelectMenuItem extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    innerFocusRingStyles,
    css`
      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      /* ── Base item ───────────────────────────────────────────── */
      .item {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-06);
        width: 100%;
        padding: var(--ds-spacing-spacing-04) var(--ds-spacing-spacing-06);
        min-height: 40px;
        box-sizing: border-box;
        background: transparent;
        color: var(--ds-text-text-default);
        font-feature-settings: 'cv08' 1;
        cursor: pointer;
        user-select: none;
        transition: background 80ms ease;
        outline: none;
      }

      :host([size='sm']) .item {
        padding: var(--ds-spacing-spacing-03) var(--ds-spacing-spacing-06);
        min-height: 32px;
      }

      .item:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }

      .item:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }

      .item:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: -2px;
      }

      /* ── Selected ─────────────────────────────────────────────── */
      :host([selected]) .item:hover {
        background: var(--ds-background-selected-hovered);
      }

      :host([selected]) .item:active {
        background: var(--ds-background-selected-pressed);
      }

      /* ── Keyboard-focused state (set by parent combobox) ─────── */
      :host([data-focused]) .item {
        background: var(--ds-background-neutral-subtle-hovered);
      }

      /* ── Disabled ─────────────────────────────────────────────── */
      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .label,
      :host([disabled]) ::slotted([slot='description']) {
        color: var(--ds-text-text-disabled);
      }

      /* ── Left group: checkbox + text ─────────────────────────── */
      .left-group {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-02);
        flex: 1 0 0;
        min-width: 0;
      }

      .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: 1px;
      }

      /* ── Text group ───────────────────────────────────────────── */
      .text-group {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-01);
        flex: 1 0 0;
        min-width: 0;
        overflow: hidden;
      }

      .label {
        display: block;
        box-sizing: border-box;
        min-height: 24px;
        padding-top: var(--ds-spacing-spacing-01);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .desc-wrap {
        display: block;
      }

      ::slotted([slot='description']) {
        display: block;
        font-family: var(--ds-typography-cozy-helper-helper-regular-font-family);
        font-size: var(--ds-typography-cozy-helper-helper-regular-font-size);
        font-weight: var(--ds-typography-cozy-helper-helper-regular-font-weight);
        line-height: var(--ds-typography-cozy-helper-helper-regular-line-height);
        letter-spacing: var(--ds-typography-cozy-helper-helper-regular-letter-spacing);
        color: var(--ds-text-text-subtle);
        font-feature-settings: 'cv08' 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: DsMultiSelectMenuItemSize = 'md';

  @state() private _hasDescription = false;

  render() {
    return html`
      <div
        class="item text-regular-body-md"
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        <span class="left-group">
          <span class="checkbox" aria-hidden="true" style="pointer-events:none">
            <ds-checkbox .isChecked=${this.selected} ?is-disabled=${this.disabled}></ds-checkbox>
          </span>
          <span class="text-group">
            <span class="label"><slot></slot></span>
            <span class="desc-wrap" ?hidden=${!this._hasDescription}>
              <slot
                name="description"
                @slotchange=${this._onDescSlotChange}
              ></slot>
            </span>
          </span>
        </span>
      </div>
    `;
  }

  private _onDescSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasDescription = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;
    dispatch(this, 'ds-menu-select', {
      value: this.value,
      selected: !this.selected,
      originalEvent: e,
    });
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    dispatch(this, 'ds-menu-select', {
      value: this.value,
      selected: !this.selected,
      originalEvent: e,
    });
  }
}


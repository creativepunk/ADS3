import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

export type DsCheckboxState = 'unchecked' | 'checked' | 'indeterminate';

/** @tagname ds-checkbox */
@customElement('ds-checkbox')
export class DsCheckbox extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals;

  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        position: relative;
      }

      :host([is-disabled]) {
        pointer-events: none;
      }

      :host([is-read-only]) {
        pointer-events: none;
      }

      /* ── Clickable row (box + label) ─────────────────────────────────────── */
      label {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-02); /* 4px between box and label text */
        cursor: pointer;
      }

      :host([is-disabled]) label {
        cursor: not-allowed;
      }

      :host([is-read-only]) label {
        cursor: default;
      }

      /* ── Touch target wrapper ────────────────────────────────────────────── */
      .checkbox-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        padding: 1px;
      }

      /* ── Native input (visually hidden, used for form association) ────────── */
      input[type='checkbox'] {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        cursor: pointer;
        z-index: 1;
      }

      :host([is-disabled]) input[type='checkbox'] {
        cursor: not-allowed;
      }

      /* ── Visual box ──────────────────────────────────────────────────────── */
      .box {
        position: relative;
        width: 14px;
        height: 14px;
        border-radius: var(--ds-radius-semantic-radius-xs); /* 2px */
        flex-shrink: 0;
        transition:
          background-color 100ms ease,
          border-color 100ms ease,
          box-shadow 100ms ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Default / unchecked */
      .box {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Hover */
      :host(:not([is-disabled]):not([is-read-only])) input:hover ~ .box,
      :host(:not([is-disabled]):not([is-read-only])):hover .box {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Active / pressed */
      :host(:not([is-disabled]):not([is-read-only])) input:active ~ .box {
        background: var(--ds-background-input-pressed);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Checked */
      :host([is-checked]) .box {
        background: var(--ds-color-default-neutral-white);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:hover ~ .box,
      :host([is-checked]:not([is-disabled]):not([is-read-only])):hover .box {
        background: var(--ds-color-default-gray-10);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:active ~ .box {
        background: var(--ds-color-default-gray-20);
        box-shadow: none;
      }

      /* Indeterminate */
      :host([is-indeterminate]) .box {
        background: var(--ds-color-default-neutral-white);
        box-shadow: none;
      }

      :host([is-indeterminate]:not([is-disabled]):not([is-read-only])) input:hover ~ .box,
      :host([is-indeterminate]:not([is-disabled]):not([is-read-only])):hover .box {
        background: var(--ds-color-default-gray-10);
        box-shadow: none;
      }

      :host([is-indeterminate]:not([is-disabled]):not([is-read-only])) input:active ~ .box {
        background: var(--ds-color-default-gray-20);
        box-shadow: none;
      }

      /* Error */
      :host([has-error]) .box {
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error]:not([is-disabled])) input:hover ~ .box,
      :host([has-error]:not([is-disabled])):hover .box {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]) .box,
      :host([has-error][is-indeterminate]) .box {
        background: var(--ds-color-default-neutral-white);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]:not([is-disabled])) input:hover ~ .box,
      :host([has-error][is-checked]:not([is-disabled])):hover .box,
      :host([has-error][is-indeterminate]:not([is-disabled])) input:hover ~ .box,
      :host([has-error][is-indeterminate]:not([is-disabled])):hover .box {
        background: var(--ds-color-default-gray-10);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      /* Disabled — unchecked */
      :host([is-disabled]) .box {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Disabled — checked / indeterminate */
      :host([is-disabled][is-checked]) .box,
      :host([is-disabled][is-indeterminate]) .box {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Read-only */
      :host([is-read-only]) .box {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      :host([is-read-only][is-checked]) .box,
      :host([is-read-only][is-indeterminate]) .box {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      /* ── Checkmark / dash icons ───────────────────────────────────────────── */
      .icon {
        display: none;
        width: 10px;
        height: 10px;
        color: var(--ds-icon-icon-inverse);
        pointer-events: none;
        position: absolute;
        inset: 0;
        margin: auto;
      }

      .icon svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      :host([is-checked]) .icon-check {
        display: block;
      }

      :host([is-indeterminate]) .icon-dash {
        display: block;
      }

      :host([is-disabled][is-checked]) .icon,
      :host([is-disabled][is-indeterminate]) .icon {
        color: var(--ds-icon-icon-disabled);
      }

      :host([is-read-only][is-checked]) .icon,
      :host([is-read-only][is-indeterminate]) .icon {
        color: var(--ds-icon-icon-subtlest);
      }

      /* ── Focus ring ──────────────────────────────────────────────────────── */
      input:focus-visible ~ .focus-ring {
        display: block;
      }

      .focus-ring {
        display: none;
        position: absolute;
        inset: -1px;
        border-radius: var(--ds-radius-semantic-radius-sm); /* 4px */
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 0;
        pointer-events: none;
      }

      /* ── Label text area ─────────────────────────────────────────────────── */
      .label-area {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-02); /* 4px */
        padding-top: 2px;
        min-height: 24px;
      }

      .value-row {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-01); /* 2px */
      }

      .label-text {
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-default);
        white-space: nowrap;
        max-width: 180px;
        word-break: break-word;
      }

      :host([is-disabled]) .label-text {
        color: var(--ds-text-text-disabled);
      }

      :host([is-read-only]) .label-text {
        color: var(--ds-text-text-subtle);
      }

      .required-mark {
        color: var(--ds-text-text-danger);
      }

      .description {
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-subtlest);
        max-width: 320px;
        white-space: nowrap;
        word-break: break-word;
      }

      :host([is-disabled]) .description {
        color: var(--ds-text-text-disabled);
      }

      /* ── Child options slot ──────────────────────────────────────────────── */
      .children-slot {
        padding-left: 28px; /* 24px box + 4px gap */
      }
    `,
  ];

  /** Controlled checked state. */
  @property({ type: Boolean, reflect: true, attribute: 'is-checked' })
  isChecked = false;

  /** Shows a dash instead of a checkmark; used by parent group for partial selection. */
  @property({ type: Boolean, reflect: true, attribute: 'is-indeterminate' })
  isIndeterminate = false;

  /** Prevents interaction and dims the control. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Prevents interaction; retains opacity but shows a read-only appearance. */
  @property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
  isReadOnly = false;

  /** Renders the border in danger color. */
  @property({ type: Boolean, reflect: true, attribute: 'has-error' })
  hasError = false;

  /** Appends a red asterisk after the label. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** Label text. Alternatively, use the default slot. */
  @property({ type: String, reflect: true })
  label = '';

  /** Optional helper/description text rendered beneath the label. */
  @property({ type: String, reflect: true })
  description = '';

  /** Form field name. */
  @property({ type: String, reflect: true })
  name = '';

  /** Form field value. */
  @property({ type: String, reflect: true })
  value = 'on';

  /** ID forwarded to the native input; useful for external <label for="..."> or aria-describedby. */
  @property({ type: String, reflect: true })
  inputId = '';

  /** Tooltip set on the <label> element. */
  @property({ type: String, reflect: true })
  title = '';

  @state() private _hasDefaultSlot = false;
  @state() private _hasChildrenSlot = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  private _onDefaultSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasDefaultSlot = slot.assignedNodes({ flatten: true }).length > 0;
    this.requestUpdate();
  };

  private _onChildrenSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasChildrenSlot = slot.assignedNodes({ flatten: true }).length > 0;
    this.requestUpdate();
  };

  private _handleChange = (e: Event) => {
    if (this.isDisabled || this.isReadOnly) return;
    const input = e.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.isIndeterminate = false;
    this._internals.setFormValue(this.isChecked ? this.value : null);
    dispatch(this, 'ds-checkbox-change', { value: this.isChecked, originalEvent: e });
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.isDisabled || this.isReadOnly) return;
    if (e.key === ' ') {
      e.preventDefault();
      this.isChecked = !this.isChecked;
      this.isIndeterminate = false;
      this._internals.setFormValue(this.isChecked ? this.value : null);
      dispatch(this, 'ds-checkbox-change', { value: this.isChecked, originalEvent: e });
    }
  };

  private _checkIcon = svg`
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  private _dashIcon = svg`
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 5H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  render() {
    const showLabelArea = this.label || this._hasDefaultSlot || this.description;

    return html`
      <label title=${this.title || nothing}>
        <span class="checkbox-wrap">
          <input
            type="checkbox"
            id=${this.inputId || nothing}
            .checked=${this.isChecked}
            .indeterminate=${this.isIndeterminate}
            ?disabled=${this.isDisabled}
            ?readonly=${this.isReadOnly}
            name=${this.name || nothing}
            value=${this.value}
            aria-checked=${this.isIndeterminate ? 'mixed' : this.isChecked ? 'true' : 'false'}
            aria-disabled=${this.isDisabled ? 'true' : nothing}
            aria-readonly=${this.isReadOnly ? 'true' : nothing}
            @change=${this._handleChange}
            @keydown=${this._handleKeyDown}
          />
          <span class="box">
            <span class="icon icon-check">${this._checkIcon}</span>
            <span class="icon icon-dash">${this._dashIcon}</span>
          </span>
          <span class="focus-ring"></span>
        </span>

        ${showLabelArea
          ? html`
              <span class="label-area">
                <span class="value-row">
                  <span class="label-text text-regular-body-md">
                    ${this.label
                      ? this.label
                      : html`<slot @slotchange=${this._onDefaultSlotChange}></slot>`}
                  </span>
                  ${this.isRequired
                    ? html`<span class="required-mark text-medium-body-md" aria-hidden="true">*</span>`
                    : nothing}
                </span>
                ${this.description
                  ? html`<span class="description text-helper-helper-regular">${this.description}</span>`
                  : nothing}
              </span>
            `
          : nothing}
      </label>

      ${this._hasChildrenSlot
        ? html`<div class="children-slot">
            <slot name="children" @slotchange=${this._onChildrenSlotChange}></slot>
          </div>`
        : html`<slot name="children" @slotchange=${this._onChildrenSlotChange} style="display:none"></slot>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-checkbox': DsCheckbox;
  }
}

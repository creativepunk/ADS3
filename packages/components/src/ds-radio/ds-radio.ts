import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

/** @tagname ds-radio */
@customElement('ds-radio')
export class DsRadio extends LitElement {
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

      /* ── Clickable row (circle + label) ─────────────────────────────────────── */
      label {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-02); /* 4px between circle and label text */
        cursor: pointer;
      }

      :host([is-disabled]) label {
        cursor: not-allowed;
      }

      :host([is-read-only]) label {
        cursor: default;
      }

      /* ── Touch target wrapper ────────────────────────────────────────────────── */
      .radio-wrap {
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
      input[type='radio'] {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        cursor: pointer;
        z-index: 1;
      }

      :host([is-disabled]) input[type='radio'] {
        cursor: not-allowed;
      }

      /* ── Visual circle ──────────────────────────────────────────────────────── */
      .circle {
        position: relative;
        width: 14px;
        height: 14px;
        border-radius: var(--ds-radius-semantic-radius-pill); /* pill = full circle */
        flex-shrink: 0;
        transition:
          background-color 100ms ease,
          box-shadow 100ms ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Default / unselected */
      .circle {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Hover */
      :host(:not([is-disabled]):not([is-read-only])) input:hover ~ .circle,
      :host(:not([is-disabled]):not([is-read-only])):hover .circle {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Active / pressed */
      :host(:not([is-disabled]):not([is-read-only])) input:active ~ .circle {
        background: var(--ds-background-input-pressed);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Selected */
      :host([is-checked]) .circle {
        background: var(--ds-color-default-neutral-white);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:hover ~ .circle,
      :host([is-checked]:not([is-disabled]):not([is-read-only])):hover .circle {
        background: var(--ds-color-default-gray-10);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:active ~ .circle {
        background: var(--ds-color-default-gray-20);
        box-shadow: none;
      }

      /* Error */
      :host([has-error]) .circle {
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error]:not([is-disabled])) input:hover ~ .circle,
      :host([has-error]:not([is-disabled])):hover .circle {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]) .circle {
        background: var(--ds-color-default-neutral-white);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]:not([is-disabled])) input:hover ~ .circle,
      :host([has-error][is-checked]:not([is-disabled])):hover .circle {
        background: var(--ds-color-default-gray-10);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      /* Disabled — unselected */
      :host([is-disabled]) .circle {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Disabled — selected */
      :host([is-disabled][is-checked]) .circle {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Read-only */
      :host([is-read-only]) .circle {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      :host([is-read-only][is-checked]) .circle {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      /* ── Inner dot (selected indicator) ─────────────────────────────────────── */
      .dot {
        display: none;
        width: 6px;
        height: 6px;
        border-radius: var(--ds-radius-semantic-radius-pill);
        background: var(--ds-icon-icon-inverse);
        pointer-events: none;
        flex-shrink: 0;
      }

      :host([is-checked]) .dot {
        display: block;
      }

      :host([is-disabled][is-checked]) .dot {
        background: var(--ds-icon-icon-disabled);
      }

      :host([is-read-only][is-checked]) .dot {
        background: var(--ds-icon-icon-subtlest);
      }

      /* ── Focus ring ──────────────────────────────────────────────────────── */
      input:focus-visible ~ .focus-ring {
        display: block;
      }

      .focus-ring {
        display: none;
        position: absolute;
        inset: -1px;
        border-radius: var(--ds-radius-semantic-radius-pill);
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
        font-feature-settings: 'cv06' 1, 'zero' 1, 'cv05' 1;
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
        font-feature-settings: 'cv06' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-subtlest);
        max-width: 320px;
        white-space: nowrap;
        word-break: break-word;
      }

      :host([is-disabled]) .description {
        color: var(--ds-text-text-disabled);
      }
    `,
  ];

  /** Controlled selected state. */
  @property({ type: Boolean, reflect: true, attribute: 'is-checked' })
  isChecked = false;

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

  /** Form field name — should match across all radios in a group. */
  @property({ type: String, reflect: true })
  name = '';

  /** Form field value submitted when selected. */
  @property({ type: String, reflect: true })
  value = '';

  /** ID forwarded to the native input; useful for external <label for="..."> or aria-describedby. */
  @property({ type: String, reflect: true })
  inputId = '';

  /** Tooltip set on the <label> element. */
  @property({ type: String, reflect: true })
  title = '';

  @state() private _hasDefaultSlot = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  private _onDefaultSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasDefaultSlot = slot.assignedNodes({ flatten: true }).length > 0;
    this.requestUpdate();
  };

  private _handleChange = (e: Event) => {
    if (this.isDisabled || this.isReadOnly) return;
    const input = e.target as HTMLInputElement;
    this.isChecked = input.checked;
    this._internals.setFormValue(this.isChecked ? this.value : null);
    dispatch(this, 'ds-radio-change', { value: this.value, originalEvent: e });
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.isDisabled || this.isReadOnly) return;
    if (e.key === ' ' && !this.isChecked) {
      e.preventDefault();
      this.isChecked = true;
      this._internals.setFormValue(this.value);
      dispatch(this, 'ds-radio-change', { value: this.value, originalEvent: e });
    }
  };

  render() {
    const showLabelArea = this.label || this._hasDefaultSlot || this.description;

    return html`
      <label title=${this.title || nothing}>
        <span class="radio-wrap">
          <input
            type="radio"
            id=${this.inputId || nothing}
            .checked=${this.isChecked}
            ?disabled=${this.isDisabled}
            ?readonly=${this.isReadOnly}
            name=${this.name || nothing}
            value=${this.value || nothing}
            aria-checked=${this.isChecked ? 'true' : 'false'}
            aria-disabled=${this.isDisabled ? 'true' : nothing}
            aria-readonly=${this.isReadOnly ? 'true' : nothing}
            @change=${this._handleChange}
            @keydown=${this._handleKeyDown}
          />
          <span class="circle">
            <span class="dot"></span>
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-radio': DsRadio;
  }
}

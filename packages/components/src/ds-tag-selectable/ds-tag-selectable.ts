import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

export type DsTagSelectableSize = 'sm' | 'md' | 'lg';

/** @tagname ds-tag-selectable */
@customElement('ds-tag-selectable')
export class DsTagSelectable extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        cursor: pointer;
      }

      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      /* ── Inner pill ──────────────────────────────────────────────────────── */
      .inner {
        display: inline-flex;
        align-items: center;
        border-radius: var(--ds-radius-semantic-radius-pill);
        background: var(--ds-tag-selectable-tag-background-enabled);
        border: 1px solid var(--ds-tag-selectable-tag-border);
        overflow: hidden;
        transition: background 80ms, border-color 80ms;
      }

      /* ── Selected state ──────────────────────────────────────────────────── */
      :host([selected]) .inner {
        background: var(--ds-tag-selectable-tag-background-selected);
        border-color: var(--ds-tag-selectable-tag-border-selected);
      }

      /* ── Hover state (not disabled, not selected) ────────────────────────── */
      :host(:not([disabled]):not([selected])) .inner:hover {
        background: var(--ds-tag-selectable-tag-hover);
      }

      /* ── Disabled state ──────────────────────────────────────────────────── */
      :host([disabled]) .inner {
        background: var(--ds-tag-selectable-tag-background-disabled);
        border-color: var(--ds-tag-selectable-tag-border-disabled);
      }

      /* ── Focus ring — outset, pill-shaped ───────────────────────────────── */
      :host(:focus-visible) .inner {
        outline: 2px solid var(--ds-tag-selectable-tag-focus, var(--ds-focus-focus));
        outline-offset: 2px;
      }

      /* ── Icon wrapper ────────────────────────────────────────────────────── */
      .icon-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        height: 32px;
        flex-shrink: 0;
        color: var(--ds-tag-selectable-tag-icon);
        margin-right: -6px;
        padding-left: var(--ds-spacing-spacing-04); /* md default: 8px */
      }

      ::slotted([slot='icon']) {
        display: block;
        width: 16px;
        height: 16px;
        color: inherit;
        flex-shrink: 0;
      }

      /* ── Label ───────────────────────────────────────────────────────────── */
      .label {
        font-weight: 500;
        color: var(--ds-tag-selectable-tag-color-enabled);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
        flex-shrink: 1;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.5px;
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      :host([selected]) .label {
        color: var(--ds-tag-selectable-tag-color-selected);
      }

      :host([selected]) .icon-wrap {
        color: var(--ds-tag-selectable-tag-color-selected);
      }

      :host([disabled]) .label {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .icon-wrap {
        color: var(--ds-icon-icon-disabled);
      }

      /* ── Sizes ───────────────────────────────────────────────────────────── */
      :host([size='md']) .inner,
      :host(:not([size])) .inner {
        height: 32px;
      }
      :host([size='md']) .label,
      :host(:not([size])) .label {
        padding: 0 var(--ds-spacing-spacing-05);
      }

      :host([size='sm']) .inner {
        height: 24px;
      }
      :host([size='sm']) .label {
        padding: 0 var(--ds-spacing-spacing-04);
      }
      :host([size='sm']) .icon-wrap {
        height: 24px;
        padding-left: var(--ds-spacing-spacing-02); /* 4px */
      }

      :host([size='lg']) .inner {
        height: 40px;
      }
      :host([size='lg']) .label {
        padding: 0 var(--ds-spacing-spacing-05);
      }
      :host([size='lg']) .icon-wrap {
        height: 40px;
        padding-left: var(--ds-spacing-spacing-05); /* 12px */
      }
    `,
  ];

  @property({ type: String, reflect: true }) size: DsTagSelectableSize = 'md';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'has-icon' }) hasIcon = false;
  @property({ type: String }) label = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;
    this.selected = !this.selected;
    dispatch(this, 'ds-change', { value: this.selected, originalEvent: e });
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.selected = !this.selected;
      dispatch(this, 'ds-change', { value: this.selected, originalEvent: e });
    }
  }

  render() {
    return html`
      <span
        class="inner"
        part="inner"
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        aria-pressed=${this.selected ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.hasIcon
          ? html`<span class="icon-wrap" aria-hidden="true" part="icon-wrap">
              <slot name="icon"></slot>
            </span>`
          : nothing}
        <span class="label" part="label">${this.label}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-tag-selectable': DsTagSelectable;
  }
}

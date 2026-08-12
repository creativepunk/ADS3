import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, innerFocusRingStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';

export type DsTagColor =
  | 'gray'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'high-contrast';

export type DsTagSize = 'xs' | 'sm' | 'md';

/** @tagname ds-tag */
@customElement('ds-tag')
export class DsTag extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    innerFocusRingStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }

      /* ── Color custom properties — set per :host([color]) ──────────────── */
      :host([color='gray']),
      :host(:not([color])) {
        --ds-tag-bg: var(--ds-tag-gray-tag-background);
        --ds-tag-text: var(--ds-tag-gray-tag-color);
        --ds-tag-icon: var(--ds-tag-gray-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-gray-tag-background-disabled);
      }
      :host([color='blue']) {
        --ds-tag-bg: var(--ds-tag-blue-tag-background);
        --ds-tag-text: var(--ds-tag-blue-tag-color);
        --ds-tag-icon: var(--ds-tag-blue-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-blue-tag-background-disabled);
      }
      :host([color='cyan']) {
        --ds-tag-bg: var(--ds-tag-cyan-tag-background);
        --ds-tag-text: var(--ds-tag-cyan-tag-color);
        --ds-tag-icon: var(--ds-tag-cyan-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-cyan-tag-background-disabled);
      }
      :host([color='teal']) {
        --ds-tag-bg: var(--ds-tag-teal-tag-background);
        --ds-tag-text: var(--ds-tag-teal-tag-color);
        --ds-tag-icon: var(--ds-tag-teal-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-teal-tag-background-disabled);
      }
      :host([color='green']) {
        --ds-tag-bg: var(--ds-tag-green-tag-background);
        --ds-tag-text: var(--ds-tag-green-tag-color);
        --ds-tag-icon: var(--ds-tag-green-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-green-tag-background-disabled);
      }
      :host([color='purple']) {
        --ds-tag-bg: var(--ds-tag-purple-tag-background);
        --ds-tag-text: var(--ds-tag-purple-tag-color);
        --ds-tag-icon: var(--ds-tag-purple-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-purple-tag-background-disabled);
      }
      :host([color='magenta']) {
        --ds-tag-bg: var(--ds-tag-magenta-tag-background);
        --ds-tag-text: var(--ds-tag-magenta-tag-color);
        --ds-tag-icon: var(--ds-tag-magenta-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-magenta-tag-background-disabled);
      }
      :host([color='red']) {
        --ds-tag-bg: var(--ds-tag-red-tag-background);
        --ds-tag-text: var(--ds-tag-red-tag-color);
        --ds-tag-icon: var(--ds-tag-red-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-red-tag-background-disabled);
      }
      :host([color='orange']) {
        --ds-tag-bg: var(--ds-tag-orange-tag-background);
        --ds-tag-text: var(--ds-tag-orange-tag-color);
        --ds-tag-icon: var(--ds-tag-orange-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-orange-tag-background-disabled);
      }
      :host([color='yellow']) {
        --ds-tag-bg: var(--ds-tag-yellow-tag-background);
        --ds-tag-text: var(--ds-tag-yellow-tag-color);
        --ds-tag-icon: var(--ds-tag-yellow-tag-icon);
        --ds-tag-bg-disabled: var(--ds-tag-yellow-tag-background-disabled);
      }
      /* ⚠ Token gap: no --ds-tag-high-contrast-* tokens in token package.
         Using raw Figma values as fallback (#f0f0f0 bg, #161616 text/icon). */
      :host([color='high-contrast']) {
        --ds-tag-bg: #f0f0f0;
        --ds-tag-text: #161616;
        --ds-tag-icon: #161616;
        --ds-tag-bg-disabled: var(--ds-tag-gray-tag-background-disabled);
      }

      /* ── Inner wrapper ─────────────────────────────────────────────────── */
      .inner {
        display: inline-flex;
        align-items: center;
        border-radius: var(--ds-radius-semantic-radius-sm);
        background: var(--ds-tag-bg);
        overflow: hidden;
      }

      /* ── Tag content: label + dismiss button, zero gap ─────────────────── */
      .tag-content {
        display: inline-flex;
        align-items: center;
        height: 100%;
      }

      /* ── Icon slot ─────────────────────────────────────────────────────── */
      .icon-wrap {
        display: inline-flex;
        align-items: center;
        color: var(--ds-tag-icon);
        flex-shrink: 0;
        margin-right: -6px;
      }

      ::slotted([slot='icon']) {
        display: block;
        width: 16px;
        height: 16px;
        color: inherit;
        flex-shrink: 0;
      }

      /* ── Label ─────────────────────────────────────────────────────────── */
      .label {
        font-family: var(--ds-font-family-normal, 'Inter', sans-serif);
        font-weight: 500;
        color: var(--ds-tag-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
        flex-shrink: 1;
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      /* ── Dismiss button (ds-icon-button ghost, size matches tag) ──────── */
      .dismiss-btn {
        margin-left: -8px;
        flex-shrink: 0;
        --ds-icon-icon-default: var(--ds-tag-icon);
      }

      :host([size='sm']) .dismiss-btn,
      :host([size='xs']) .dismiss-btn {
        margin-left: -4px;
      }

      /* ── Sizes ─────────────────────────────────────────────────────────── */
      :host([size='md']) .inner,
      :host(:not([size])) .inner {
        height: 32px;
      }
      :host([size='md']) .label,
      :host(:not([size])) .label {
        padding: 0 var(--ds-spacing-spacing-05);
        font-size: var(--ds-type-scale-y1, 14px);
        line-height: 16px;
        letter-spacing: 0.5px;
      }
      :host([size='md']) .icon-wrap,
      :host(:not([size])) .icon-wrap {
        padding: var(--ds-spacing-spacing-04);
        padding-right: 0;
      }

      :host([size='sm']) .inner {
        height: 24px;
      }
      :host([size='sm']) .label {
        padding: 0 var(--ds-spacing-spacing-05);
        font-size: var(--ds-type-scale-y1, 14px);
        line-height: 16px;
        letter-spacing: 0.5px;
      }
      :host([size='sm']) .icon-wrap {
        padding: var(--ds-spacing-spacing-03);
        padding-right: 0;
      }

      :host([size='xs']) .inner {
        height: 20px;
      }
      :host([size='xs']) .label {
        padding: 0 var(--ds-spacing-spacing-04);
        font-size: var(--ds-type-scale-y0, 12px);
        line-height: 16px;
        letter-spacing: 0.5px;
      }
      :host([size='xs']) .icon-wrap {
        padding: var(--ds-spacing-spacing-02);
        padding-right: 0;
      }

      /* ── Disabled state ────────────────────────────────────────────────── */
      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .inner {
        background: var(--ds-tag-bg-disabled);
      }

      :host([disabled]) .label {
        color: var(--ds-icon-icon-disabled);
      }

      :host([disabled]) .icon-wrap {
        color: var(--ds-icon-icon-disabled);
      }

      :host([disabled]) .dismiss-btn {
        --ds-icon-icon-default: var(--ds-icon-icon-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true }) color: DsTagColor = 'gray';
  @property({ type: String, reflect: true }) size: DsTagSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'is-dismissable' }) isDismissable = false;
  @property({ type: Boolean, reflect: true, attribute: 'has-icon' }) hasIcon = false;
  @property({ type: String }) label = '';

  private _handleDismiss(e: CustomEvent) {
    dispatch(this, 'ds-tag-dismiss', { originalEvent: e.detail.originalEvent });
  }

  render() {
    return html`
      <span class="inner" part="inner">
        ${this.hasIcon
          ? html`<span class="icon-wrap" aria-hidden="true" part="icon-wrap">
              <slot name="icon"></slot>
            </span>`
          : nothing}
        <span class="tag-content">
          <span class="label" part="label">${this.label}</span>
          ${this.isDismissable
            ? html`<ds-icon-button
                class="dismiss-btn"
                part="dismiss-btn"
                variant="ghost"
                size=${this.size}
                shape="default"
                aria-label="Remove ${this.label} tag"
                @ds-click=${this._handleDismiss}
              >
                <ds-icon name="close" size="sm"></ds-icon>
              </ds-icon-button>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-tag': DsTag;
  }
}

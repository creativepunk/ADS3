import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';

export type DsBadgeColor =
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
  | 'inverted';

/** @tagname ds-badge */
@customElement('ds-badge')
export class DsBadge extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }

      .inner {
        display: inline-flex;
        align-items: center;
        border-radius: var(--ds-radius-semantic-radius-xs);
        background: var(--ds-badge-color-background);
      }

      /* ── Color variants via CSS custom properties ──────────────────────── */
      :host([color='gray']) {
        --ds-badge-color-background: var(--ds-badge-gray-badge-background);
        --ds-badge-color-text: var(--ds-badge-gray-badge-color);
        --ds-badge-color-icon: var(--ds-badge-gray-badge-icon);
      }
      :host([color='blue']),
      :host(:not([color])) {
        --ds-badge-color-background: var(--ds-badge-blue-badge-background);
        --ds-badge-color-text: var(--ds-badge-blue-badge-color);
        --ds-badge-color-icon: var(--ds-badge-blue-badge-icon);
      }
      :host([color='cyan']) {
        --ds-badge-color-background: var(--ds-badge-cyan-badge-background);
        --ds-badge-color-text: var(--ds-badge-cyan-badge-color);
        --ds-badge-color-icon: var(--ds-badge-cyan-badge-icon);
      }
      :host([color='teal']) {
        --ds-badge-color-background: var(--ds-badge-teal-badge-background);
        --ds-badge-color-text: var(--ds-badge-teal-badge-color);
        --ds-badge-color-icon: var(--ds-badge-teal-badge-icon);
      }
      :host([color='green']) {
        --ds-badge-color-background: var(--ds-badge-green-badge-background);
        --ds-badge-color-text: var(--ds-badge-green-badge-color);
        --ds-badge-color-icon: var(--ds-badge-green-badge-icon);
      }
      :host([color='purple']) {
        --ds-badge-color-background: var(--ds-badge-purple-badge-background);
        --ds-badge-color-text: var(--ds-badge-purple-badge-color);
        --ds-badge-color-icon: var(--ds-badge-purple-badge-icon);
      }
      :host([color='magenta']) {
        --ds-badge-color-background: var(--ds-badge-magenta-badge-background);
        --ds-badge-color-text: var(--ds-badge-magenta-badge-color);
        --ds-badge-color-icon: var(--ds-badge-magenta-badge-icon);
      }
      :host([color='red']) {
        --ds-badge-color-background: var(--ds-badge-red-badge-background);
        --ds-badge-color-text: var(--ds-badge-red-badge-color);
        --ds-badge-color-icon: var(--ds-badge-red-badge-icon);
      }
      :host([color='orange']) {
        --ds-badge-color-background: var(--ds-badge-orange-badge-background);
        --ds-badge-color-text: var(--ds-badge-orange-badge-color);
        --ds-badge-color-icon: var(--ds-badge-orange-badge-icon);
      }
      :host([color='yellow']) {
        --ds-badge-color-background: var(--ds-badge-yellow-badge-background);
        --ds-badge-color-text: var(--ds-badge-yellow-badge-color);
        --ds-badge-color-icon: var(--ds-badge-yellow-badge-icon);
      }
      :host([color='inverted']) {
        --ds-badge-color-background: var(--ds-badge-inverted-badge-background);
        --ds-badge-color-text: var(--ds-badge-inverted-badge-color);
        --ds-badge-color-icon: var(--ds-badge-inverted-badge-icon);
      }

      /* ── Icon wrapper: 4px left, 0px right, 2px top+bottom ───────────── */
      .icon-wrap {
        display: inline-flex;
        align-items: center;
        padding: var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-00) var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-02);
        margin-right: -2px;
        color: var(--ds-badge-color-icon);
        flex-shrink: 0;
      }

      ::slotted([slot='icon']) {
        display: block;
        width: 16px;
        height: 16px;
        color: inherit;
      }

      /* ── Label: 6px left+right, 2px top+bottom ─────────────────────────── */
      .label {
        display: inline-flex;
        align-items: center;
        padding: var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-03);
        font-family: var(--ds-font-family-normal, 'Inter', sans-serif);
        font-size: var(--ds-type-scale-y0, 12px);
        font-weight: var(--ds-type-weight-700, 700);
        line-height: 16px;
        letter-spacing: 0.5px;
        color: var(--ds-badge-color-text);
        white-space: nowrap;
      }
    `,
  ];

  @property({ type: String, reflect: true }) color: DsBadgeColor = 'gray';
  @property({ type: Boolean, reflect: true, attribute: 'has-icon' }) hasIcon = false;
  @property({ type: String }) count = '';

  render() {
    return html`
      <span class="inner" role="status">
        ${this.hasIcon
          ? html`<span class="icon-wrap" aria-hidden="true">
              <slot name="icon"></slot>
            </span>`
          : null}
        <span class="label">${this.count}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-badge': DsBadge;
  }
}

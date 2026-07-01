import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';

export type DsStatusMarkerStatus =
  | 'failed'
  | 'in-progress'
  | 'success'
  | 'undefined'
  | 'warning'
  | 'in-active'
  | 'live';

export type DsStatusMarkerType = 'subtle' | 'bold' | 'bolder' | 'boldest';

const STATUS_ICONS: Record<DsStatusMarkerStatus, { name: string; fill?: boolean }> = {
  warning: { name: 'warning' },
  success: { name: 'check_circle' },
  live: { name: 'circle', fill: true },
  failed: { name: 'block' },
  undefined: { name: 'indeterminate_check_box' },
  'in-progress': { name: 'progress_activity' },
  'in-active': { name: 'close' },
};

/** @tagname ds-status-marker */
@customElement('ds-status-marker')
export class DsStatusMarker extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      /* ── Default status accent tokens (overridden per status below) ── */
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        --_text-bold: var(--ds-text-text-default);
        --_icon-bold: var(--ds-icon-icon-default);
        --_border-bolder: var(--ds-border-border-bold);
        --_bg-boldest: var(--ds-background-neutral-default);
        --_text-boldest: var(--ds-text-text-subtle);
        --_icon-boldest: var(--ds-icon-icon-subtle);
      }

      /* ── Status accent token sets ── */
      :host([status='warning']) {
        --_text-bold: var(--ds-text-text-warning);
        --_icon-bold: var(--ds-icon-icon-warning);
        --_border-bolder: var(--ds-border-border-warning);
        --_bg-boldest: var(--ds-background-warning-default);
        --_text-boldest: var(--ds-text-text-inverse);
        --_icon-boldest: var(--ds-icon-icon-inverse);
      }
      :host([status='success']),
      :host([status='live']) {
        --_text-bold: var(--ds-text-text-success);
        --_icon-bold: var(--ds-icon-icon-success);
        --_border-bolder: var(--ds-border-border-success);
        --_bg-boldest: var(--ds-background-success-default);
        --_text-boldest: var(--ds-text-text-inverse);
        --_icon-boldest: var(--ds-icon-icon-inverse);
      }
      :host([status='failed']) {
        --_text-bold: var(--ds-text-text-danger);
        --_icon-bold: var(--ds-icon-icon-danger);
        --_border-bolder: var(--ds-border-border-danger);
        --_bg-boldest: var(--ds-background-danger-default);
        --_text-boldest: var(--ds-text-text-default);
        --_icon-boldest: var(--ds-icon-icon-default);
      }
      :host([status='undefined']),
      :host([status='in-active']) {
        --_text-bold: var(--ds-text-text-default);
        --_icon-bold: var(--ds-icon-icon-default);
        --_border-bolder: var(--ds-border-border-bold);
        --_bg-boldest: var(--ds-background-neutral-default);
        --_text-boldest: var(--ds-text-text-subtle);
        --_icon-boldest: var(--ds-icon-icon-subtle);
      }
      :host([status='in-progress']) {
        --_text-bold: var(--ds-text-text-info);
        --_icon-bold: var(--ds-icon-icon-info);
        --_border-bolder: var(--ds-border-border-brand);
        --_bg-boldest: var(--ds-background-brand-default);
        --_text-boldest: var(--ds-text-text-default);
        --_icon-boldest: var(--ds-icon-icon-default);
      }

      /* ── Inner layout ── */
      .inner {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-03);
        padding: var(--ds-spacing-spacing-01) 0;
      }

      /* ── Type: bolder — bordered pill ── */
      :host([type='bolder']) .inner {
        padding: var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-03)
          var(--ds-spacing-spacing-01) var(--ds-spacing-spacing-02);
        border: 1px solid var(--_border-bolder);
        border-radius: var(--ds-radius-semantic-radius-xs);
      }

      /* ── Type: boldest — filled pill ── */
      :host([type='boldest']) .inner {
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-03)
          var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-02);
        background: var(--_bg-boldest);
        border-radius: var(--ds-radius-semantic-radius-xs);
      }

      /* ── Icon ── */
      .icon-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--_icon-bold);
      }

      :host([type='boldest']) .icon-wrap {
        color: var(--_icon-boldest);
      }

      ::slotted([slot='icon']) {
        display: block;
        color: inherit;
      }

      /* ── Label — Regular/Body-md for subtle|bold|bolder ── */
      .label {
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size, 16px);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight, 400);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        white-space: nowrap;
        color: var(--ds-text-text-subtle);
      }

      :host([type='bold']) .label,
      :host([type='bolder']) .label {
        color: var(--_text-bold);
      }

      /* ── Label — Medium/Body-sm for boldest ── */
      :host([type='boldest']) .label {
        font-family: var(--ds-typography-cozy-medium-body-sm-font-family);
        font-size: var(--ds-typography-cozy-medium-body-sm-font-size, 14px);
        font-weight: var(--ds-typography-cozy-medium-body-sm-font-weight, 500);
        line-height: var(--ds-typography-cozy-medium-body-sm-line-height, 16px);
        letter-spacing: var(--ds-typography-cozy-medium-body-sm-letter-spacing, 0.5px);
        color: var(--_text-boldest);
      }
    `,
  ];

  @property({ type: String, reflect: true }) status: DsStatusMarkerStatus = 'failed';
  @property({ type: String, reflect: true }) type: DsStatusMarkerType = 'subtle';

  render() {
    const icon = STATUS_ICONS[this.status] ?? { name: 'info' };
    return html`
      <span class="inner">
        <span class="icon-wrap" aria-hidden="true">
          <slot name="icon">
            <ds-icon name="${icon.name}" size="sm" ?fill=${icon.fill ?? false}></ds-icon>
          </slot>
        </span>
        <span class="label"><slot></slot></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-status-marker': DsStatusMarker;
  }
}

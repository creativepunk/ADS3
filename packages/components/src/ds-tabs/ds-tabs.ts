import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import type { DsTabChangeEvent } from '../shared/events.js';

export type { DsTabChangeEvent };

// ─── Tab item (building block) ────────────────────────────────────────────────

/** @tagname ds-tab */
@customElement('ds-tab')
export class DsTab extends LitElement {
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
        gap: var(--ds-spacing-spacing-03, 6px);
        padding: var(--ds-spacing-spacing-03, 6px) var(--ds-spacing-spacing-05, 12px)
          var(--ds-spacing-spacing-05, 12px) var(--ds-spacing-spacing-05, 12px);
        background: transparent;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        color: var(--ds-text-text-subtle, #acacac);
        font-family: var(--ds-font-family-normal, 'Inter Variable', 'Inter', sans-serif);
        font-size: var(--ds-typography-cozy-medium-body-md-font-size, 16px);
        font-weight: var(--ds-typography-cozy-medium-body-md-font-weight, 500);
        line-height: var(--ds-typography-cozy-medium-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-medium-body-md-letter-spacing, 0.5px);
        font-feature-settings: 'cv08' 1, 'cv05' 1, 'zero' 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: color 100ms ease;
      }

      /* Selected state */
      :host([is-selected]) button {
        color: var(--ds-text-text-default, #f0f0f0);
      }

      /* Selection indicator */
      .indicator {
        position: absolute;
        bottom: 0;
        left: var(--ds-spacing-spacing-05, 12px);
        right: var(--ds-spacing-spacing-05, 12px);
        height: 3px;
        background: var(--ds-border-border-selected, #0055bd);
        display: none;
      }

      :host([is-selected]) .indicator {
        display: block;
      }

      /* Hover */
      button:not(:disabled):hover {
        color: var(--ds-text-text-default, #f0f0f0);
      }

      /* Disabled */
      :host([is-disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([is-disabled]) button {
        color: var(--ds-text-text-disabled, rgba(255, 255, 255, 0.25));
        cursor: not-allowed;
      }

      :host([is-disabled]) .count {
        opacity: 0.4;
      }

      /* Focus ring */
      button:focus-visible {
        outline: 2px solid var(--ds-focus-focus, #ffffff);
        outline-offset: -2px;
        border-radius: var(--ds-radius-semantic-radius-sm, 4px);
        z-index: 1;
      }

      button:focus:not(:focus-visible) {
        outline: none;
      }

      /* Badge/count */
      .count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 20px;
        padding: 2px var(--ds-spacing-spacing-03, 6px);
        background: rgba(255, 255, 255, 0.2); /* ⚠ no --ds-badge-gray-badge-background token */
        border-radius: var(--ds-radius-semantic-radius-xs, 2px);
        font-family: var(--ds-font-family-normal, 'Inter Variable', 'Inter', sans-serif);
        font-size: var(--ds-typography-cozy-helper-helper-bold-font-size, 12px);
        font-weight: var(--ds-typography-cozy-helper-helper-bold-font-weight, 700);
        line-height: var(--ds-typography-cozy-helper-helper-bold-line-height, 16px);
        letter-spacing: var(--ds-typography-cozy-helper-helper-bold-letter-spacing, 0.5px);
        color: var(--ds-text-text-subtle, #acacac);
        white-space: nowrap;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true, attribute: 'is-selected' })
  isSelected = false;

  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** When true, renders the count badge alongside the label. */
  @property({ type: Number })
  count: number | undefined = undefined;

  @property({ type: Boolean })
  groupDisabled = false;

  private get _effectivelyDisabled() {
    return this.isDisabled || this.groupDisabled;
  }

  private _handleClick(e: MouseEvent) {
    if (this._effectivelyDisabled || this.isSelected) return;
    dispatch(this, 'ds-tab-change', { value: this.value, originalEvent: e });
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this._effectivelyDisabled || this.isSelected) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dispatch(this, 'ds-tab-change', { value: this.value, originalEvent: e });
    }
  }

  render() {
    return html`
      <button
        type="button"
        role="tab"
        ?disabled=${this._effectivelyDisabled}
        aria-selected=${this.isSelected ? 'true' : 'false'}
        aria-disabled=${this._effectivelyDisabled ? 'true' : 'false'}
        tabindex=${this.isSelected ? '0' : '-1'}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
        ${this.count !== undefined
          ? html`<span class="count">${this.count}</span>`
          : nothing}
        <span class="indicator" aria-hidden="true"></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-tab': DsTab;
  }
}

// ─── Tabs group ───────────────────────────────────────────────────────────────

/** @tagname ds-tabs */
@customElement('ds-tabs')
export class DsTabs extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: block;
        position: relative;
      }

      .tab-list {
        display: flex;
        align-items: flex-end;
        position: relative;
      }

      .bottom-border {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--ds-border-border-bold, rgba(255, 255, 255, 0.12));
        pointer-events: none;
      }
    `,
  ];

  /** The currently selected tab value. */
  @property({ type: String, reflect: true })
  value = '';

  /** Disables all tabs in the group. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  private _getTabItems(): DsTab[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === 'ds-tab') as DsTab[];
  }

  private _syncChildren() {
    const items = this._getTabItems();
    items.forEach((item) => {
      item.isSelected = item.value === this.value;
      item.groupDisabled = this.isDisabled;
    });
  }

  private _handleTabChange(e: CustomEvent<{ value: string }>) {
    e.stopPropagation();
    if (this.value === e.detail.value) return;
    this.value = e.detail.value;
    this._syncChildren();
    dispatch(this, 'ds-tab-change', { value: this.value, originalEvent: (e.detail as any).originalEvent });
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const items = this._getTabItems().filter((t) => !t.isDisabled && !t.groupDisabled);
    if (!items.length) return;
    const currentIndex = items.findIndex((t) => t.isSelected);
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % items.length;
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + items.length) % items.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = items.length - 1;
    if (nextIndex === currentIndex) return;
    e.preventDefault();
    const next = items[nextIndex];
    dispatch(this, 'ds-tab-change', { value: next.value, originalEvent: e });
    this.value = next.value;
    this._syncChildren();
    (next.shadowRoot?.querySelector('button') as HTMLElement)?.focus();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('value') || changedProps.has('isDisabled')) {
      this._syncChildren();
    }
  }

  render() {
    return html`
      <div
        class="tab-list"
        role="tablist"
        @ds-tab-change=${this._handleTabChange}
        @keydown=${this._handleKeyDown}
      >
        <slot @slotchange=${() => this._syncChildren()}></slot>
        <div class="bottom-border" aria-hidden="true"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-tabs': DsTabs;
  }
}

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import type { DsActionMenuItem, DsActionMenuItemSize } from './ds-action-menu-item.js';
import './ds-action-menu-item.js';
import '../ds-menu-category/ds-menu-category.js';
import '../ds-menu-category/ds-menu-separator.js';

export { DsActionMenuItem } from './ds-action-menu-item.js';
export type { DsActionMenuItemVariant, DsActionMenuItemSize } from './ds-action-menu-item.js';

// ─── ds-action-menu-separator ────────────────────────────────────────────────

/** Horizontal divider for grouping items inside an <ds-action-menu>. */
/** @tagname ds-action-menu-separator */
@customElement('ds-action-menu-separator')
export class DsActionMenuSeparator extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        padding: var(--ds-spacing-spacing-02) 0;
      }

      .line {
        width: 100%;
        height: 1px;
        background: var(--ds-border-border-default);
      }
    `,
  ];

  render() {
    return html`<div class="line" role="separator"></div>`;
  }
}

// ─── ds-action-menu-group ────────────────────────────────────────────────────

/**
 * Logical grouping of items inside a <ds-action-menu>.
 *
 * - Provides role="group" for assistive technology.
 * - title — renders a section label above the items (aria-label on the group).
 * - selection-type="checkbox" — items toggle independently.
 * - selection-type="radio" — selecting one item unchecks all others in the group.
 * - selection-type="none" (default) — purely action group; no check state.
 *
 * The separator and title visibility are managed automatically by the parent
 * <ds-action-menu> once it knows how many groups exist.
 */
/** @tagname ds-action-menu-group */
@customElement('ds-action-menu-group')
export class DsActionMenuGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

    `,
  ];

  @property({ type: String, attribute: 'selection-type' })
  selectionType: 'none' | 'checkbox' | 'radio' = 'none';

  @property({ type: String })
  title = '';

  /** Automatically set by <ds-action-menu>. True for every group except the first. */
  @property({ type: Boolean, attribute: 'has-separator' })
  hasSeparator = false;

  items: DsActionMenuItem[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('ds-menu-action', this._onMenuAction);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ds-menu-action', this._onMenuAction);
  }

  private _onMenuAction = (e: Event) => {
    const item = e.target as DsActionMenuItem;
    if (!this.items.includes(item)) return;

    if (this.selectionType === 'radio') {
      this.items.forEach((i) => { i.isChecked = i === item; });
    } else if (this.selectionType === 'checkbox') {
      item.isChecked = !item.isChecked;
    }
    // 'none' groups: no check-state management; event bubbles up to ds-action-menu.
  };

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.items = slot.assignedElements({ flatten: true }).filter(
      (el) => el.tagName.toLowerCase() === 'ds-action-menu-item',
    ) as DsActionMenuItem[];

    this.items.forEach((item) => { item.selectionType = this.selectionType; });
  }

  render() {
    return html`
      ${this.hasSeparator ? html`<ds-menu-separator></ds-menu-separator>` : nothing}
      ${this.title ? html`<ds-menu-category>${this.title}</ds-menu-category>` : nothing}
      <div role="group" aria-label=${this.title || nothing}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

// ─── ds-action-menu ──────────────────────────────────────────────────────────

/** @tagname ds-action-menu */
@customElement('ds-action-menu')
export class DsActionMenu extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
        min-width: 144px;
      }

      .container {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--ds-elevation-surface-overlay-default);
        border-radius: var(--ds-radius-semantic-radius-sm);
        /* ⚠ no shadow token — raw fallback */
        box-shadow:
          0px 0px 1px 0px rgba(1, 4, 4, 0.5),
          0px 8px 12px 0px rgba(1, 4, 4, 0.36),
          inset 0px 0px 0px 1px rgba(189, 189, 189, 0.12);
      }

      [hidden] {
        display: none !important;
      }

      .header {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-05);
        padding: var(--ds-spacing-spacing-05) var(--ds-spacing-spacing-06);
        flex-shrink: 0;
        overflow: hidden;
      }

      .body {
        padding: var(--ds-spacing-spacing-04) 0;
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ds-spacing-spacing-04);
        padding: var(--ds-spacing-spacing-05) var(--ds-spacing-spacing-06);
        border-top: 1px solid var(--ds-border-border-default);
        flex-shrink: 0;
        overflow: hidden;
      }
    `,
  ];

  /** Item height: md = 40 px (cozy), sm = 32 px (compact). */
  @property({ type: String, reflect: true }) size: DsActionMenuItemSize = 'md';

  @state() private _hasHeader = false;
  @state() private _hasFooter = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('ds-menu-action', this._onMenuAction);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ds-menu-action', this._onMenuAction);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('size')) {
      this._getOwnItems().forEach((item) => { item.size = this.size; });
    }
  }

  /**
   * Returns all ds-action-menu-item elements that belong to this menu —
   * both direct children and those inside ds-action-menu-group elements —
   * while excluding items that belong to nested sub-menus.
   */
  private _getOwnItems(): DsActionMenuItem[] {
    return Array.from(this.querySelectorAll('ds-action-menu-item')).filter(
      (item) => item.closest('ds-action-menu') === this,
    ) as DsActionMenuItem[];
  }

  private _getOwnGroups(): DsActionMenuGroup[] {
    return Array.from(this.querySelectorAll('ds-action-menu-group')).filter(
      (g) => g.closest('ds-action-menu') === this,
    ) as DsActionMenuGroup[];
  }

  /**
   * Auto-assigns hasSeparator to groups: first group never gets one,
   * every subsequent group does.
   */
  private _configureGroups(groups: DsActionMenuGroup[]) {
    const isSingle = groups.length === 1;
    groups.forEach((g, i) => {
      g.hasSeparator = !isSingle && i > 0;
    });
  }

  // Selection state is fully managed by ds-action-menu-group. After the group
  // has updated isChecked on its items, this handler recalculates menu-wide
  // indentation and icon-wrap visibility.
  private _onMenuAction = (_e: Event) => {
    const items = this._getOwnItems();
    this._updateIndentation(items);
    this._updateIconWrap(items);
  };

  private _onDefaultSlotChange(_e: Event) {
    const groups = this._getOwnGroups();
    const items = this._getOwnItems();
    this._configureGroups(groups);
    items.forEach((item) => { item.size = this.size; });
    this._updateIndentation(items);
    this._updateIconWrap(items);
  }

  /**
   * If any group in the menu has a selection-type (checkbox/radio), all items
   * across the entire menu get the indent column for visual alignment.
   * Within each group, only checked items show the checkmark.
   */
  private _updateIndentation(items: DsActionMenuItem[]) {
    const groups = this._getOwnGroups();
    const anySelectionGroup = groups.some((g) => g.selectionType !== 'none');

    if (anySelectionGroup) {
      // Menu-wide indent: every item gets the column; checkmark only on checked items.
      items.forEach((i) => { i.isIndented = true; });
    } else {
      // No selection groups: no indentation at all.
      items.forEach((i) => { i.isIndented = false; });
    }
  }

  private _updateIconWrap(items: DsActionMenuItem[]) {
    const anyHasIcon = items.some(
      (item) => item.querySelector('[slot="leadingIcon"]') !== null,
    );
    items.forEach((item) => { item.showIconWrap = anyHasIcon; });
  }

  private _onHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <div class="container" role="menu">
        <div class="header" ?hidden=${!this._hasHeader}>
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
        </div>
        <div class="body">
          <slot @slotchange=${this._onDefaultSlotChange}></slot>
        </div>
        <div class="footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-action-menu': DsActionMenu;
    'ds-action-menu-item': DsActionMenuItem;
    'ds-action-menu-separator': DsActionMenuSeparator;
    'ds-action-menu-group': DsActionMenuGroup;
  }
}

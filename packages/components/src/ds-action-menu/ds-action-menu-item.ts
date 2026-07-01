import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
  innerFocusRingStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

export type DsActionMenuItemVariant = 'default' | 'danger';
export type DsActionMenuItemSize = 'sm' | 'md';

const CHECK = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M3 8.5L6.5 12L13 4"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

const CHEVRON = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M6 4L10 8L6 12"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

/** @tagname ds-action-menu-item */
@customElement('ds-action-menu-item')
export class DsActionMenuItem extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    innerFocusRingStyles,
    css`
      :host {
        display: block;
        /* Set color on the host so slotted ds-icon elements inherit it
           via the light DOM cascade (color: inherit on ds-icon's :host). */
        color: var(--ds-icon-icon-default);
      }

      /* ── Indent/check column ──────────────────────────────────── */
      .indent-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: var(--ds-spacing-spacing-02);
        color: var(--ds-icon-icon-default);
      }

      /* ── Base item ───────────────────────────────────────────── */
      .item {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-06);
        width: 100%;
        padding: var(--ds-spacing-spacing-04) var(--ds-spacing-spacing-06);
        min-height: 40px;
        background: transparent;
        color: var(--ds-text-text-default);
        font-feature-settings: 'cv06' 1;
        cursor: pointer;
        user-select: none;
        transition: background 80ms ease;
      }

      :host([size='sm']) .item {
        padding: var(--ds-spacing-spacing-03) var(--ds-spacing-spacing-06);
        min-height: 32px;
      }

      /* ── Default interactive states ──────────────────────────── */
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

      /* ── Danger variant ──────────────────────────────────────── */

      /* Default state: neutral colors — same as default variant */

      /* Full red background on hover/active; text/icons reset to default */
      :host([variant='danger']) .item:hover {
        background: var(--ds-background-danger-default);
        color: var(--ds-text-text-default);
      }

      :host([variant='danger']) .item:hover .icon-wrap,
      :host([variant='danger']) .item:hover .trailing-caret {
        color: var(--ds-icon-icon-default);
      }

      :host([variant='danger']) .item:hover .shortcut {
        color: var(--ds-text-text-default);
      }

      :host([variant='danger']) .item:active {
        background: var(--ds-background-danger-pressed);
        color: var(--ds-text-text-default);
      }

      :host([variant='danger']) .item:active .icon-wrap,
      :host([variant='danger']) .item:active .trailing-caret {
        color: var(--ds-icon-icon-default);
      }

      :host([variant='danger']) .item:active .shortcut {
        color: var(--ds-text-text-default);
      }

      /* ── Disabled ─────────────────────────────────────────────── */
      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .label {
        color: var(--ds-text-text-disabled);
      }

      /* ── Left group ───────────────────────────────────────────── */
      .left-group {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-02);
        flex: 1 0 0;
        min-width: 0;
      }

      .icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: var(--ds-spacing-spacing-02);
        color: var(--ds-icon-icon-default);
      }

      .label {
        display: block;
        flex: 1 0 0;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* ── Slotted icon color for interactive states ────────────── */

      /* On hover/active reset both text and slotted icon to default */
      .item:hover ::slotted(ds-icon),
      .item:active ::slotted(ds-icon) {
        color: var(--ds-icon-icon-default);
      }

      /* Danger hover/active: icon resets to default alongside text */
      :host([variant='danger']) .item:hover ::slotted(ds-icon),
      :host([variant='danger']) .item:active ::slotted(ds-icon) {
        color: var(--ds-icon-icon-default);
      }

      /* ── Trailing: sub-menu chevron ───────────────────────────── */
      .trailing-caret {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: var(--ds-spacing-spacing-02);
        color: var(--ds-icon-icon-default);
      }

      /* ── Trailing: keyboard shortcut ──────────────────────────── */
      .shortcut {
        flex-shrink: 0;
        color: var(--ds-text-text-subtle);
        font-feature-settings: 'cv06' 1;
        white-space: nowrap;
      }

      /* ── Sub-menu flyout holder ────────────────────────────────
         Always fixed-position; hidden by default. JS sets left/top
         and display: block when opening. Using fixed breaks out of
         any parent overflow:hidden that would clip the sub-menu. */
      .sub-menu-holder {
        display: none;
        overflow: visible;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  variant: DsActionMenuItemVariant = 'default';

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: DsActionMenuItemSize = 'md';

  /**
   * Show a chevron without slotting an actual sub-menu (visual-only hint).
   * If a <ds-action-menu slot="sub-menu"> is slotted, the chevron appears
   * automatically regardless of this prop.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-sub-menu' })
  hasSubMenu = false;

  /**
   * Keyboard shortcut hint shown in the trailing area (e.g. "⌘K").
   * Ignored when a sub-menu caret is visible.
   */
  @property({ type: String }) shortcut = '';

  /**
   * Reserves a 24 px indent column on the left for alignment in
   * selection-group menus (radio / checkbox style). When combined
   * with `isChecked`, a checkmark is shown in that column.
   * Auto-set by `<ds-action-menu>` when any sibling item is checked.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-indented' })
  isIndented = false;

  /** Renders a checkmark in the indent column. Requires `isIndented`. */
  @property({ type: Boolean, reflect: true, attribute: 'is-checked' })
  isChecked = false;

  /**
   * Controls whether the 24 px leading-icon column is rendered.
   * Auto-set by `<ds-action-menu>`: true if any sibling has a leading icon,
   * false when the whole menu is icon-less (avoids phantom left indent).
   */
  @property({ type: Boolean, attribute: 'show-icon-wrap' })
  showIconWrap = true;

  /**
   * How selection behaves — set automatically by the parent
   * `<ds-action-menu-group>` based on its own selection-type.
   * Drives the ARIA role: menuitemcheckbox vs menuitemradio vs menuitem.
   */
  @property({ type: String, attribute: 'selection-type' })
  selectionType: 'none' | 'checkbox' | 'radio' = 'none';

  @state() private _hasSubMenuSlot = false;
  @state() private _subMenuOpen = false;

  private _closeTimer: ReturnType<typeof setTimeout> | null = null;

  private get _showCaret() {
    return this.hasSubMenu || this._hasSubMenuSlot;
  }

  // ─── Lifecycle ───────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._onHostEnter);
    this.addEventListener('mouseleave', this._onHostLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._onHostEnter);
    this.removeEventListener('mouseleave', this._onHostLeave);
    if (this._closeTimer) clearTimeout(this._closeTimer);
  }

  // ─── Sub-menu open / close ───────────────────────────────────

  private _onHostEnter = () => {
    this._cancelClose();
    if (this._hasSubMenuSlot) this._openSubMenu();
  };

  private _onHostLeave = () => {
    if (this._hasSubMenuSlot) this._scheduleClose();
  };

  private _cancelClose = () => {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
  };

  private _scheduleClose = () => {
    this._closeTimer = setTimeout(() => this._closeSubMenu(), 150);
  };

  private _openSubMenu() {
    const holder = this.shadowRoot?.querySelector<HTMLElement>('.sub-menu-holder');
    if (!holder) return;
    const rect = this.getBoundingClientRect();
    holder.style.cssText = [
      'display: block',
      'position: fixed',
      'overflow: visible',
      `left: ${rect.right}px`,
      `top: ${rect.top}px`,
      'z-index: 9999',
    ].join(';');
    this._subMenuOpen = true;
  }

  private _closeSubMenu() {
    const holder = this.shadowRoot?.querySelector<HTMLElement>('.sub-menu-holder');
    if (holder) holder.style.cssText = 'display: none';
    this._subMenuOpen = false;
  }

  // ─── Slot change ────────────────────────────────────────────

  private _onSubMenuSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasSubMenuSlot = slot.assignedElements({ flatten: true }).length > 0;
    // Close initially if sub-menu was just slotted
    if (!this._subMenuOpen) this._closeSubMenu();
  }

  // ─── Keyboard ────────────────────────────────────────────────

  private _handleKeydown(e: KeyboardEvent) {
    if (!this._hasSubMenuSlot) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this._openSubMenu();
      const subMenu = this.querySelector('[slot="subMenu"]');
      const firstItem = subMenu?.querySelector<HTMLElement>(
        'ds-action-menu-item:not([disabled])',
      );
      firstItem?.focus();
    }
  }

  // ─── Render ──────────────────────────────────────────────────

  render() {
    return html`
      <button
        class="item text-regular-body-md"
        role=${this.selectionType === 'radio'
          ? 'menuitemradio'
          : this.selectionType === 'checkbox'
            ? 'menuitemcheckbox'
            : 'menuitem'}
        aria-checked=${this.selectionType !== 'none' ? String(this.isChecked) : nothing}
        aria-haspopup=${this._showCaret ? 'menu' : nothing}
        aria-expanded=${this._hasSubMenuSlot ? String(this._subMenuOpen) : nothing}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this.isIndented
          ? html`<span class="indent-wrap" aria-hidden="true">${this.isChecked ? CHECK : nothing}</span>`
          : nothing}
        <span class="left-group">
          ${this.showIconWrap ? html`<span class="icon-wrap" aria-hidden="true">
            <slot name="leadingIcon"></slot>
          </span>` : nothing}
          <span class="label"><slot></slot></span>
        </span>
        ${this._showCaret
          ? html`<span class="trailing-caret" aria-hidden="true">${CHEVRON}</span>`
          : this.shortcut
            ? html`<span class="shortcut text-helper-helper-regular" aria-hidden="true">${this.shortcut}</span>`
            : nothing}
      </button>
      <!-- Sub-menu flyout — slotted ds-action-menu goes here -->
      <div
        class="sub-menu-holder"
        @mouseenter=${this._cancelClose}
        @mouseleave=${this._scheduleClose}
      >
        <slot
          name="subMenu"
          @slotchange=${this._onSubMenuSlotChange}
        ></slot>
      </div>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;
    // If item has a sub-menu, toggle it on click (touch / keyboard fallback)
    if (this._hasSubMenuSlot) {
      this._subMenuOpen ? this._closeSubMenu() : this._openSubMenu();
      return;
    }
    dispatch(this, 'ds-menu-action', { value: this.value, originalEvent: e });
  }
}

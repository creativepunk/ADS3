import { LitElement } from 'lit';
export type DsTooltipAlign = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export declare class DsTooltip extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Single-line ellipsis truncation (max 420px) when true; wrapping (max 240px) when false. */
    truncate: boolean;
    /** Where the bubble appears relative to the trigger. Default: 'top'. */
    align: DsTooltipAlign;
    /** Close the tooltip when the trigger is activated (click, Enter, Space). */
    closeOnActivation: boolean;
    /** Milliseconds to wait before showing the tooltip. Default: 100. */
    enterDelayMs: number;
    /** Milliseconds to wait before hiding the tooltip. Default: 300. */
    leaveDelayMs: number;
    /**
     * When true, the bubble follows the mouse cursor using fixed positioning
     * instead of being anchored to the trigger's bounding box.
     */
    mousePointer: boolean;
    /**
     * When true, the tooltip only opens if the slotted trigger element is
     * currently overflowing (i.e. its text is visually truncated). Useful
     * for text cells that only need a tooltip when their content is clipped.
     */
    onlyWhenTruncated: boolean;
    /**
     * Optional keyboard shortcut displayed inside the tooltip bubble as a
     * <kbd> badge. Example values: "⌘K", "Ctrl+C", "⌥⇧F".
     */
    shortcut: string;
    private _open;
    private readonly _id;
    private _enterTimer;
    private _leaveTimer;
    private _clearTimers;
    private _isTruncated;
    private _show;
    private _hide;
    private _onEnter;
    private _onLeave;
    private _onKeydown;
    private _onClick;
    private _onMouseMove;
    private _onTriggerSlotChange;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-tooltip': DsTooltip;
    }
}
//# sourceMappingURL=ds-tooltip.d.ts.map
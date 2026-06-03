import { LitElement, type PropertyValues } from 'lit';
import '../ds-button/ds-button.js';
export type DsCalendarMarkerColor = 'red' | 'yellow' | 'blue' | 'white';
/** Map of ISO date (`YYYY-MM-DD`) → marker color shown under the day. */
export type DsCalendarMarkers = Record<string, DsCalendarMarkerColor>;
/** Array of ISO dates (`YYYY-MM-DD`) that are individually disabled. */
export type DsCalendarDisabledDates = string[];
export declare class DsCalendar extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Displayed/focused year. Defaults to the current year. */
    year: number;
    /** Displayed month, 1-based (1 = January). Defaults to the current month. */
    month: number;
    /** Focused day of the month (used for keyboard navigation). */
    day: number;
    /** Selected date as an ISO string `YYYY-MM-DD`. Empty when nothing is selected. */
    value: string;
    /** Earliest selectable date (`YYYY-MM-DD`). */
    min: string;
    /** Latest selectable date (`YYYY-MM-DD`). Defaults to today. */
    max: string;
    /** Explicit list of disabled dates (`YYYY-MM-DD`). */
    disabledDates: string[];
    /** Predicate that returns true for any date (`YYYY-MM-DD`) that should be disabled. */
    disabledDateFilter?: (iso: string) => boolean;
    /** Map of ISO date → marker color, drawn under the day number. */
    markers: DsCalendarMarkers;
    /** First day of the week: 0 = Sunday … 6 = Saturday. */
    weekStartDay: number;
    /** BCP-47 locale used to format weekday/month names. */
    locale: string;
    /** ISO date treated as "today". Defaults to the real current date. */
    today: string;
    /** Disable the whole calendar. */
    isDisabled: boolean;
    /** Show the "Today" shortcut button in the footer. */
    showTodayButton: boolean;
    previousMonthLabel: string;
    nextMonthLabel: string;
    previousYearLabel: string;
    nextYearLabel: string;
    todayLabel: string;
    private _pickerOpen;
    private _pickerYearMin;
    private _pickerYearMax;
    private _pendingFocus;
    private _pendingPickerScroll;
    private _prepScrollTop;
    private _prepScrollHeight;
    private _extendingYears;
    private _todayDate;
    private _isOutOfRange;
    private _isDisabledDate;
    /** Localized weekday short names, ordered by `weekStartDay`. */
    private _weekdayLabels;
    private _monthLabel;
    private _monthNames;
    /** The 42 cells (6 weeks × 7 days) covering the displayed month. */
    private _gridDates;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(): void;
    private _shiftMonth;
    private _shiftYear;
    private _goToToday;
    private _setFocusedDate;
    private _dispatchNavigate;
    private _selectDate;
    private _onGridKeydown;
    private _renderHeader;
    private _renderGrid;
    private _renderPicker;
    private _onLabelClick;
    private _onTodayClick;
    private _togglePicker;
    private _onYearListScroll;
    private _selectPickerYear;
    private _selectPickerMonth;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-calendar': DsCalendar;
    }
}
//# sourceMappingURL=ds-calendar.d.ts.map
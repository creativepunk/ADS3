import { type EventName } from '@lit/react';
import { DsCalendar as LitDsCalendar, type DsCalendarMarkerColor, type DsCalendarMarkers } from '@my-ds/components/src/ds-calendar/ds-calendar.js';
import type { DsSelectEvent, DsNavigateEvent } from '@my-ds/components/src/shared/events.js';
export type { DsCalendarMarkerColor, DsCalendarMarkers };
export type DsCalendarElement = LitDsCalendar;
export interface DsCalendarProps {
    /** Displayed/focused year. */
    year?: number;
    /** Displayed month, 1-based (1 = January). */
    month?: number;
    /** Focused day of the month. */
    day?: number;
    /** Selected date as an ISO string `YYYY-MM-DD`. */
    value?: string;
    /** Earliest selectable date (`YYYY-MM-DD`). */
    min?: string;
    /** Latest selectable date (`YYYY-MM-DD`). */
    max?: string;
    /** Explicit list of disabled dates (`YYYY-MM-DD`). */
    disabledDates?: string[];
    /** Predicate returning true for any date (`YYYY-MM-DD`) to disable. */
    disabledDateFilter?: (iso: string) => boolean;
    /** Map of ISO date → marker color drawn under the day. */
    markers?: DsCalendarMarkers;
    /** First day of the week: 0 = Sunday … 6 = Saturday. */
    weekStartDay?: number;
    /** BCP-47 locale for weekday/month names. */
    locale?: string;
    /** ISO date treated as "today". */
    today?: string;
    /** Disable the whole calendar. */
    isDisabled?: boolean;
    /** Show the "Today" footer button. */
    showTodayButton?: boolean;
    previousMonthLabel?: string;
    nextMonthLabel?: string;
    previousYearLabel?: string;
    nextYearLabel?: string;
    todayLabel?: string;
    className?: string;
    /** Fired when a date is selected. */
    onDsSelect?: (event: DsSelectEvent) => void;
    /** Fired when the displayed month/year changes. */
    onDsNavigate?: (event: DsNavigateEvent) => void;
}
export declare const DsCalendar: import("@lit/react").ReactWebComponent<LitDsCalendar, {
    onDsSelect: EventName<DsSelectEvent>;
    onDsNavigate: EventName<DsNavigateEvent>;
}>;
//# sourceMappingURL=ds-calendar.d.ts.map
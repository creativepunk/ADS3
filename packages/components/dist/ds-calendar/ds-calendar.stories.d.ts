import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-calendar.js';
interface CalendarArgs {
    year: number;
    month: number;
    day: number;
    value: string;
    min?: string;
    max?: string;
    disabledDates: string[];
    weekStartDay: number;
    locale: string;
    today?: string;
    isDisabled: boolean;
    showTodayButton: boolean;
}
declare const meta: Meta<CalendarArgs>;
export default meta;
type Story = StoryObj<CalendarArgs>;
export declare const Default: Story;
export declare const MondayStart: Story;
export declare const WithoutTodayButton: Story;
export declare const Disabled: Story;
export declare const Localized: Story;
export declare const WithDisabledDates: Story;
export declare const WithMinMax: Story;
export declare const ShowcaseMarkers: Story;
export declare const ShowcaseDisabledDates: Story;
//# sourceMappingURL=ds-calendar.stories.d.ts.map
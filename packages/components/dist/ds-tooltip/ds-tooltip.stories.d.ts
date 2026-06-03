import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-tooltip.js';
import '../ds-button/ds-button.js';
import type { DsTooltipAlign } from './ds-tooltip.js';
interface TooltipArgs {
    align: DsTooltipAlign;
    truncate: boolean;
    closeOnActivation: boolean;
    enterDelayMs: number;
    leaveDelayMs: number;
    mousePointer: boolean;
    onlyWhenTruncated: boolean;
    shortcut: string;
    content: string;
}
declare const meta: Meta<TooltipArgs>;
export default meta;
type Story = StoryObj<TooltipArgs>;
export declare const Default: Story;
export declare const MousePointer: Story;
export declare const UpdatingPosition: Story;
export declare const ConditionalTruncation: Story;
export declare const IgnoringPointerEvents: Story;
export declare const WithKeyboardShortcut: Story;
export declare const LongContent: Story;
export declare const Truncated: Story;
export declare const CloseOnActivation: Story;
export declare const NoDelay: Story;
export declare const AlignBottom: Story;
export declare const AlignLeft: Story;
export declare const AlignRight: Story;
export declare const ShowcaseAlignments: Story;
export declare const ShowcaseModes: Story;
export declare const ShowcaseShortcuts: Story;
//# sourceMappingURL=ds-tooltip.stories.d.ts.map
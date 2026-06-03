import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsTooltip as LitDsTooltip, } from '@my-ds/components/src/ds-tooltip/ds-tooltip.js';
export const DsTooltip = createComponent({
    tagName: 'ds-tooltip',
    elementClass: LitDsTooltip,
    react: React,
    events: {},
});
DsTooltip.displayName = 'DsTooltip';
//# sourceMappingURL=ds-tooltip.js.map
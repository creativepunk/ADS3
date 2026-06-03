import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsCalendar as LitDsCalendar, } from '@my-ds/components/src/ds-calendar/ds-calendar.js';
export const DsCalendar = createComponent({
    tagName: 'ds-calendar',
    elementClass: LitDsCalendar,
    react: React,
    events: {
        onDsSelect: 'ds-select',
        onDsNavigate: 'ds-navigate',
    },
});
DsCalendar.displayName = 'DsCalendar';
//# sourceMappingURL=ds-calendar.js.map
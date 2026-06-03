import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsButton as LitDsButton, } from '@my-ds/components/src/ds-button/ds-button.js';
export const DsButton = createComponent({
    tagName: 'ds-button',
    elementClass: LitDsButton,
    react: React,
    events: {
        onDsClick: 'ds-click',
    },
});
DsButton.displayName = 'DsButton';
//# sourceMappingURL=ds-button.js.map
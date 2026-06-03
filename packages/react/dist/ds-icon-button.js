import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsIconButton as LitDsIconButton, } from '@my-ds/components/src/ds-icon-button/ds-icon-button.js';
export const DsIconButton = createComponent({
    tagName: 'ds-icon-button',
    elementClass: LitDsIconButton,
    react: React,
    events: {
        onDsClick: 'ds-click',
    },
});
DsIconButton.displayName = 'DsIconButton';
//# sourceMappingURL=ds-icon-button.js.map
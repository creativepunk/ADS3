import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  DsFormMessage as LitDsFormMessage,
  type DsFormMessageType,
} from '@my-ds/components/src/ds-form-message/ds-form-message.js';

export type { DsFormMessageType };
export type DsFormMessageElement = LitDsFormMessage;

export interface DsFormMessageProps {
  type?: DsFormMessageType;
  helperText?: string;
  errorText?: string;
  successText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DsFormMessage = createComponent({
  tagName: 'ds-form-message',
  elementClass: LitDsFormMessage,
  react: React,
  events: {},
});

DsFormMessage.displayName = 'DsFormMessage';

import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsTextArea as LitTextArea } from '@my-ds/components/src/ds-text-area/ds-text-area.js';
import type { DsTextAreaType, DsTextAreaResize } from '@my-ds/components/src/ds-text-area/ds-text-area.js';
import type {
  DsChangeEvent,
  DsInputEvent,
  DsFocusEvent,
  DsBlurEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsTextAreaType, DsTextAreaResize };
export type DsTextAreaElement = LitTextArea;

export interface DsTextAreaProps {
  type?: DsTextAreaType;
  label?: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  invalid?: boolean;
  valid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number | null;
  hasCount?: boolean;
  resize?: DsTextAreaResize;
  className?: string;
  onDsChange?: (event: DsChangeEvent) => void;
  onDsInput?: (event: DsInputEvent) => void;
  onDsFocus?: (event: DsFocusEvent) => void;
  onDsBlur?: (event: DsBlurEvent) => void;
}

export const DsTextArea = createComponent({
  tagName: 'ds-text-area',
  elementClass: LitTextArea,
  react: React,
  events: {
    onDsChange: 'ds-change' as EventName<DsChangeEvent>,
    onDsInput: 'ds-input' as EventName<DsInputEvent>,
    onDsFocus: 'ds-focus' as EventName<DsFocusEvent>,
    onDsBlur: 'ds-blur' as EventName<DsBlurEvent>,
  },
});

DsTextArea.displayName = 'DsTextArea';

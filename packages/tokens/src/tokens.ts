import { baseColors } from './base-colors.js';
import {
  spacing,
  radius,
  typeScale,
  fontFamily,
  fontWeight,
  typography,
} from './dimension.js';
import { semanticColorsDark } from './semantic-colors.js';

const tokens = {
  base: {
    colors: baseColors,
    spacing,
    radius,
    typeScale,
    fontFamily,
    fontWeight,
    typography,
  },
  semantic: {
    dark: semanticColorsDark,
  },
} as const;

export default tokens;
export type Tokens = typeof tokens;

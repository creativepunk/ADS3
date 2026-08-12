export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function isoToFriendly(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
  const [y, m, d] = iso.split('-');
  return `${MONTHS_SHORT[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

export interface MaskState {
  month: string;
  day: string;
  year: string;
  segment: 'month' | 'day' | 'year';
}

export const EMPTY_MASK: MaskState = { month: '', day: '', year: '', segment: 'month' };

export function buildMaskDisplay(state: MaskState): string {
  const m = state.month + 'm'.repeat(Math.max(0, 2 - state.month.length));
  const d = state.day + 'd'.repeat(Math.max(0, 2 - state.day.length));
  const y = state.year + 'y'.repeat(Math.max(0, 4 - state.year.length));
  return `${m}/${d}/${y}`;
}

export function getMaskCursorPos(state: MaskState): number {
  // Always place cursor at the right edge of the active segment (RTL fill)
  if (state.segment === 'month') return 2;
  if (state.segment === 'day') return 5;
  return 10;
}

export function isMaskComplete(state: MaskState): boolean {
  return state.month.length === 2 && state.day.length === 2 && state.year.length === 4;
}

export function maskToIso(state: MaskState): string {
  if (!isMaskComplete(state)) return '';
  return `${state.year}-${state.month}-${state.day}`;
}

export function isoToMask(iso: string): MaskState {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return EMPTY_MASK;
  const [y, m, d] = iso.split('-');
  return { month: m, day: d, year: y, segment: 'year' };
}

export function applyMaskDigit(state: MaskState, digit: string): MaskState {
  const d = parseInt(digit, 10);

  if (state.segment === 'month') {
    // RTL fill: if segment is full, replace it fresh
    const current = state.month.length === 2 ? '' : state.month;
    if (current.length === 0) {
      // First digit — if >1 it can only be a single-digit month, pad left
      if (d > 1) return { ...state, month: '0' + digit, segment: 'day' };
      return { ...state, month: digit };
    }
    const combined = current + digit;
    const val = parseInt(combined, 10);
    if (val >= 1 && val <= 12) return { ...state, month: combined, segment: 'day' };
    return state;
  }

  if (state.segment === 'day') {
    const current = state.day.length === 2 ? '' : state.day;
    if (current.length === 0) {
      if (d > 3) return { ...state, day: '0' + digit, segment: 'year' };
      return { ...state, day: digit };
    }
    const combined = current + digit;
    const val = parseInt(combined, 10);
    if (val >= 1 && val <= 31) return { ...state, day: combined, segment: 'year' };
    return state;
  }

  if (state.segment === 'year') {
    // RTL fill: if year is full (4 digits), restart from first digit
    const current = state.year.length === 4 ? '' : state.year;
    if (current.length < 4) return { ...state, year: current + digit };
  }

  return state;
}

export function applyMaskBackspace(state: MaskState): MaskState {
  if (state.segment === 'year') {
    if (state.year.length > 0) return { ...state, year: state.year.slice(0, -1) };
    return { ...state, day: state.day.slice(0, -1), segment: 'day' };
  }
  if (state.segment === 'day') {
    if (state.day.length > 0) return { ...state, day: state.day.slice(0, -1) };
    return { ...state, month: state.month.slice(0, -1), segment: 'month' };
  }
  if (state.segment === 'month' && state.month.length > 0) {
    return { ...state, month: state.month.slice(0, -1) };
  }
  return state;
}

export function getMaskSegmentFromCursorPos(pos: number): 'month' | 'day' | 'year' {
  if (pos <= 2) return 'month';
  if (pos <= 5) return 'day';
  return 'year';
}

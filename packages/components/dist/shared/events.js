/**
 * Shared event utilities for Lit components.
 *
 * All custom events in this design system:
 * - Are prefixed with `ds-`
 * - Bubble and compose by default
 * - Carry typed detail payloads
 */
/**
 * Dispatch a typed custom event from a Lit element.
 *
 * @example
 * dispatch(this, 'ds-click', { originalEvent: e });
 */
export function dispatch(element, eventName, detail, options) {
    const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true, // crosses shadow DOM boundary
        cancelable: true,
        detail,
        ...options,
    });
    return element.dispatchEvent(event);
}
//# sourceMappingURL=events.js.map
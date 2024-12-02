import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is a boolean
 *
 * @export
 * @param {(boolean | unknown)} item
 * @returns {item is boolean}
 */
export function isBool(item: boolean | unknown): item is boolean {
    return !isNullOrUndefined(item) && typeof item === 'boolean';
}

/**
 * Checks if the given item is a boolean
 *
 * @export
 * @param {(boolean | unknown)} item
 * @returns {item is boolean}
 */
export const isBoolean = isBool;

export default isBool;

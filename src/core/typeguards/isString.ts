import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is a string
 *
 * @export
 * @param {(string | unknown)} item
 * @returns {item is string}
 */
export function isString(item: string | unknown): item is string {
    return !isNullOrUndefined(item) && typeof item === 'string';
}

export default isString;

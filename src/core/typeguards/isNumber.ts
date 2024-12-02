import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is a number
 *
 * @export
 * @param {(number | unknown)} item
 * @returns {item is number}
 */
export function isNumber(item: number | unknown): item is number {
    return !isNullOrUndefined(item) && typeof item === 'number';
}

export default isNumber;

import isNull from './isNull';
import isUndefined from './isUndefined';

/**
 * Checks if the given item is null or undefined
 *
 * @export
 * @param {(null | undefined | unknown)} item
 * @returns {boolean}
 */
export function isNullOrUndefined(item: null | undefined | unknown): item is null | undefined {
    return isNull(item) || isUndefined(item);
}

export default isNullOrUndefined;

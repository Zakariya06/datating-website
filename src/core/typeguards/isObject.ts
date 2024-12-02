import isArray from './isArray';
import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is an object
 *
 * @export
 * @param {({}[] | {})} [item]
 * @returns {item is object}
 */
export function isObject(item?: Array<{}> | {}): item is object {
    return (!isNullOrUndefined(item) && typeof item === 'object' && !isArray(item)) || false;
}

export default isObject;

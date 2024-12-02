import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is an Array
 *
 * @export
 * @template T
 * @param {(T[] | unknown)} item
 * @returns {item is T[]}
 */
export function isArray<T = unknown>(item: T[] | unknown): item is T[] {
  return !isNullOrUndefined(item) && Array.isArray(item);
}

export default isArray;

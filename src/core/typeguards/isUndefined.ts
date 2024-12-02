/**
 * Checks if the given item is undefined
 *
 * @export
 * @param {(undefined | unknown)} item
 * @returns {item is undefined}
 */
export function isUndefined(item: undefined | unknown): item is undefined {
    return item === undefined;
}

export default isUndefined;

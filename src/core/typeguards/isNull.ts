/**
 * Checks if the given item is null
 *
 * @export
 * @param {(null | unknown)} item
 * @returns {item is null}
 */
export function isNull(item: null | unknown): item is null {
    return item === null;
}

export default isNull;

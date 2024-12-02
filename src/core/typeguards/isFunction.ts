import isNullOrUndefined from './isNullOrUndefined';

/**
 * Checks if the given item is a function
 *
 * @export
 * @param {(Function | unknown)} item
 * @returns {func is Function}
 */
export function isFunction(item: Function | unknown): item is Function {
    return (
        !isNullOrUndefined(item) &&
        (typeof item === 'function' || Object.prototype.toString.call(item) === '[object Function]')
    );
}

export default isFunction;

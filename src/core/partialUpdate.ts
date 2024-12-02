import isNullOrUndefined from './typeguards/isNullOrUndefined';

export function partialUpdate<T extends {}>(a: T, b: T): T {
    const res = { ...a };

    for (const [k, v] of Object.entries(b)) {
        if (!isNullOrUndefined(v)) {
            res[k] = v;
        }
    }

    return res;
}

export default partialUpdate;

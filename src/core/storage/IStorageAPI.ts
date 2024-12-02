/**
 * Describes a Storage based on the Storage API of Session- and Local-Storage
 *
 * @export
 * @class StorageAPI
 */
export interface IStorageAPI extends Storage {
    /**
     * Returns the number of key/value pairs currently present in the list associated with the object.
     *
     * @type {number}
     * @memberof IStorageAPI
     */
    readonly length: number;
    /**
     * When passed a number n, this method will return the name of the nth key in the storage
     *
     * @abstract
     * @memberof StorageAPI
     */
    clear(): void;
    /**
     * When passed a key name, will return that key's value
     *
     * @abstract
     * @param {string} key
     * @returns {(string | null)}
     * @memberof StorageAPI
     */
    getItem(key: string): string | null;
    /**
     * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists
     *
     * @abstract
     * @param {string} key
     * @param {string} data
     * @memberof StorageAPI
     */
    setItem(key: string, data: string): void;
    /**
     * When passed a number n, this method will return the name of the nth key in the storage
     *
     * @abstract
     * @param {number} index
     * @returns {(string | null)}
     * @memberof StorageAPI
     */
    key(index: number): string | null;
    /**
     * When passed a key name, will remove that key from the storage
     *
     * @abstract
     * @param {string} key
     * @memberof StorageAPI
     */
    removeItem(key: string): void;
}

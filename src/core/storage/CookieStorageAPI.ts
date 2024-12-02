import { get, remove, set } from 'js-cookie';

import { IStorageAPI } from './IStorageAPI';

export type ICookieAttributes = import('js-cookie').CookieAttributes;

export class CookieStorageAPI implements IStorageAPI {
    private static _instance: CookieStorageAPI;

    public static getInstance(): CookieStorageAPI {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        //
    }

    public clear(): void {
        this._cookie = '';
    }

    // eslint-disable-next-line class-methods-use-this
    public getItem(key: string): string | null {
        return get(key) || null;
    }

    // eslint-disable-next-line class-methods-use-this
    public setItem(key: string, data: string, cookieOptions?: ICookieAttributes): void {
        set(key, data, cookieOptions);
    }

    // eslint-disable-next-line class-methods-use-this
    public removeItem(key: string, cookieOptions?: ICookieAttributes): void {
        remove(key, cookieOptions);
    }

    public key(index: number): string | null {
        const cookies: string[] = this._cookie.split(';');

        if (cookies.length < index) {
            return null;
        }

        const keys: string[] = cookies[index].split('=');

        if (keys.length === 0) {
            return null;
        }

        return cookies[index];
    }

    public get length(): number {
        return this._cookie.split(';').length;
    }

    // eslint-disable-next-line class-methods-use-this
    private get _cookie(): string {
        return document.cookie;
    }

    // eslint-disable-next-line class-methods-use-this
    private set _cookie(cookieString: string) {
        document.cookie = cookieString;
    }
}

export default CookieStorageAPI.getInstance();

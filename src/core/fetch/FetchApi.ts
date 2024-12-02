import { Fetchmode, Fetchmodes } from './Fetchmode';
import { HttpMethod, HttpMethods } from './HttpMethod';

import { IUser } from '../../models/user/IUser';

//#region define Headers
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_TYPE_HEADER_VALUE = 'application/json';
const ACCEPT_HEADER = 'Accept';
const ACCEPT_LANGUAGE = 'Accept-Language';
const AUTHORIZATION_HEADER = 'Authorization';
const CORS_ACCESS_HEADER = 'Access-Control-Request-Method';
const ORIGIN_HEADER = 'Origin';

function isHeaderObject(a: Headers | string[][] | object): a is Headers {
    return 'append' in a;
}

// set up default headers:
const baseHeaders = new Headers([
    [ACCEPT_HEADER, CONTENT_TYPE_HEADER_VALUE],
    [ACCEPT_LANGUAGE, '*'],
]);

const corsHeaders = new Headers([
    [CORS_ACCESS_HEADER, '*'],
    [ACCEPT_HEADER, '*'],
]);


//#endregion

export class FetchApi {
    /**
     * Starts an Ajax Call using the Js Fetch-Api
     *
     * @static
     * @param {(URL | string)} url
     * @param {(unknown | null)} [data=null]
     * @param {HttpMethod} [method=HttpMethods.GET]
     * @param {Fetchmode} [mode=undefined]
     * @returns {Promise<Response>}
     * @memberof FetchApi
     */
    public static async fetch(
        url: URL | string,
        data: unknown | null = null,
        method: HttpMethod = HttpMethods.GET,
        secret?: string,
        user?: IUser,
        mode?: Fetchmode,
        signal?: AbortController | null
    ): Promise<Response> {
        let fetchUrl = url;

        // if the given URL is not already an URL, create one:
        if (!(fetchUrl instanceof URL)) {
            fetchUrl = new URL(encodeURI(fetchUrl));
        }

        // since not every backend is ok with trailing slashes we need to remove it!
        const urlToFetch = fetchUrl.href.replace(/\/$/, '');
        const options = this._generateRequestOptions(fetchUrl, secret, user, data, method.toUpperCase(), mode, signal);

        return fetch(urlToFetch, options);
    }

    private static _generateRequestOptions(
        url: URL,
        secret?: string,
        user?: IUser,
        data: unknown | null = null,
        method: HttpMethod = HttpMethods.GET,
        mode?: Fetchmode,
        signal?: AbortController | null
    ) {
        const headers = new Headers(baseHeaders);

        // as soon the Ajax call is a Post then let the data POST in the Request's body
        const hasBodyData = data && method !== 'GET' && method !== HttpMethods.HEAD;

        // initalize the options
        const requestOptions: RequestInit = {
            method: method,
            headers: mode === Fetchmodes.NO_CORS ? new Headers(corsHeaders) : headers,
            mode: mode,
            body: hasBodyData ? JSON.stringify(data) : undefined,
            credentials: 'omit',
            signal: signal?.signal,
        };

        if (requestOptions.headers && isHeaderObject(requestOptions.headers)) {
            // delete the content type header

            if (requestOptions.headers.has(CONTENT_TYPE_HEADER)) {
                requestOptions.headers.delete(CONTENT_TYPE_HEADER);
            }

            // if neccessary set up content type header

            if (hasBodyData) {
                requestOptions.headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_HEADER_VALUE);
            }

            // add Origin Header to fix safari bug
            if (requestOptions.headers.has(ORIGIN_HEADER)) {
                requestOptions.headers.delete(ORIGIN_HEADER);
            }

            // Doesnt work on react native
            requestOptions.headers.set(ORIGIN_HEADER, window.location.origin);

            if (secret && user) {
                // set up authorization
                this._setUpAuthorization(secret, user, requestOptions.headers, url, data, method);
            }
        }

        return requestOptions;
    }

    private static _setUpAuthorization(
        secret: string = '',
        user: IUser | undefined,
        headers: Headers,
        _url: URL,
        _data: unknown | null,
        _verb: string
    ): void {
        // if the request already has an authorization header, delete it!
        if (headers.has(AUTHORIZATION_HEADER)) {
            headers.delete(AUTHORIZATION_HEADER);
        }
        try {
            // generate the JWT bearer token
            //const bearerToken = BearerToken.generateSignature(secret, user);
            // add the bearer token to the authorization header

            // const bearerToken = BearerToken.generateSignature(secret, user);
            // headers.set(AUTHORIZATION_HEADER, bearerToken);
            // Basic Auth
            headers.set(AUTHORIZATION_HEADER, `Basic ${btoa(`${user?.Username}:${secret}`)}`);
        } catch {
            // extend the error object
            // const error: Error = e;
            // error.message = `Couldn't set Authorization-Header due to ${error.message}`;
            // re-throw the error
            // throw error;
        }
    }
}

export default FetchApi;

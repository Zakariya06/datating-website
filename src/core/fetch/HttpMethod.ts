export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | string;

export enum HttpMethods {
    // GET = 'GET',
    // TODO: SET BACK TO GET!
    // GET = 'POST',
    // HEAD = 'HEAD',
    // POST = 'POST',
    // PUT = 'PUT',
    // DELETE = 'DELETE',
    // CONNECT = 'CONNECT',
    // OPTIONS = 'OPTIONS',
    // TRACE = 'TRACE',
    // PATCH = 'PATCH',

    GET = 'POST',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'POST',
    CONNECT = 'CONNECT',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE',
    PATCH = 'POST',
}

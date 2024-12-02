// import HMACSHA256 from 'crypto-js/hmac-sha256';

import { IUser } from '../models/user/IUser';

// import HMACSHA256 from 'crypto-js/sha256';

// function HMACSHA256(value: string, salt: string) {
//       // Even though we are specifying "RSA" here, this works with ECDSA
//     // keys as well.
//     var signer = createSign('RSA-SHA256');
//     var sig = (signer.update(value), signer.sign(salt, 'base64'));
//     return atob(sig);
// }

export class BearerToken {
    // // the basic JWT bearer header declaring which algorithm is used
    // private static _header = {
    //     alg: 'HS256',
    //     typ: 'JWT',
    // };

    /**
     * creates a RFC 7519 conform JWT Bearer Authentication string
     * see: https://jwt.io/
     *
     * @static
     * @param {*} [payload]
     * @returns {string}
     * @memberof BearerToken
     */
    public static generateSignature(secret: string, payload: IUser): string {
        return `Bearer ${secret}`;
    }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  static _getJWTTokenString(secret: string, payload?: any) {
    //     // create a base64 string of the stringified header
    //     const headerHash = btoa(JSON.stringify(this._header));
    //     // create a base64 string of the stringified payload
    //     const payloadHash = btoa(payload ? JSON.stringify(payload) : '');
    //     // return the JWT formatted string
    //     return `${headerHash}.${payloadHash}.${this._createSignature(secret, headerHash, payloadHash)}`;
    // }

    // private static _createSignature(secret: string, headerHash: string, payloadHash: string) {
    //     // create a HMAC hashed version of the header and payload concatenation
    //     return HMACSHA256(`${headerHash}.${payloadHash}`, secret);
    // }
}

export default BearerToken;

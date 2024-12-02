export enum AppleAuthCredentialState {
    AUTHORIZED = 'authorized',
    REVOKED = 'revoked',
}
export interface IAppleSigninResult {
    authorization: {
        state: string;
        code: string;
        id_token: string;
    };
    user: {
        email: string;
        name: {
            firstName: string;
            lastName: string;
        };
    };
}

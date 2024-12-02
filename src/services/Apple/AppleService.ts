import { Config } from './../../config/config';
import { IAppleSigninResult } from './models/IAppleSigninResult';

export class AppleService {
    private static _isInitialized: boolean = false;

    public static init() {
        if (this._isInitialized) {
            return;
        }
        const appleId = Config.APPLE_APP_ID;
        const scope = 'email name';
        const redirectUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        const state = 'initial';
        const nonce = '';

        // <meta name="appleid-signin-client-id" content="[CLIENT_ID]">
        // <meta name="appleid-signin-scope" content="[SCOPES]">
        // <meta name="appleid-signin-redirect-uri" content="[REDIRECT_URI]">
        // <meta name="appleid-signin-state" content="[STATE]">
        // <meta name="appleid-signin-nonce" content="[NONCE]">
        // <meta name="appleid-signin-use-popup" content="true"> <!-- or false defaults to false -->

        // // add the meta tags
        // const clientIdTag = document.createElement('meta');
        // clientIdTag.name = 'appleid-signin-client-id';
        // clientIdTag.content = appleId;
        // document.head.appendChild(clientIdTag);

        // const scopeTag = document.createElement('meta');
        // scopeTag.name = 'appleid-signin-scope';
        // scopeTag.content = 'email name';
        // document.head.appendChild(scopeTag);

        // const redirectUriTag = document.createElement('meta');
        // redirectUriTag.name = 'appleid-signin-redirect-uri';
        // redirectUriTag.content = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        // document.head.appendChild(redirectUriTag);

        // const stateTag = document.createElement('meta');
        // stateTag.name = 'appleid-signin-state';
        // stateTag.content = 'login';
        // document.head.appendChild(stateTag);

        // const nonceTag = document.createElement('meta');
        // nonceTag.name = 'appleid-signin-nonce';
        // nonceTag.content = '';
        // document.head.appendChild(nonceTag);

        // const usePopupTag = document.createElement('meta');
        // usePopupTag.name = 'appleid-signin-use-popup';
        // usePopupTag.content = 'true';
        // document.head.appendChild(usePopupTag);

        // inject the facebook script tag
        const scriptTag = document.createElement('script');

        scriptTag.setAttribute('src', `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/de_DE/appleid.auth.js`);

        scriptTag.addEventListener('load', () => {
            try {
                AppleID.auth.init({
                    clientId: appleId,
                    scope: scope,
                    redirectURI: redirectUrl,
                    state: state,
                    nonce: nonce,
                    usePopup: true, //or false defaults to false
                });
            } catch (e) {
                // pizdec
            }
        });

        document.body.appendChild(scriptTag);
        this._isInitialized = true;
    }

    public static async login(onLoginFinished: (response: IAppleSigninResult) => Promise<void>) {
        try {
            const data: IAppleSigninResult = await AppleID.auth.signIn();
            void onLoginFinished(data);
        } catch (e) {
            // pizdec again
        }
    }
}

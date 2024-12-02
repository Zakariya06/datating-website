import Config from './../../config/config';
import { IFacebookGraphResponse } from './models/IFacebookResponse';
import { RegisterPermissions } from './models/RegisterPermissions';

const fbDataRequestString = 'email,name,first_name,middle_name,last_name,address,gender,picture,birthday,age_range,hometown,location';

declare const window: Window & { fbAsyncInit: Function };

export class FacebookService {
    private static _isInitialized: boolean = false;

    public static init() {
        if (this._isInitialized) {
            return;
        }

        // inject the facebook script tag
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('async', '');
        scriptTag.setAttribute('defer', '');
        scriptTag.setAttribute('crossorigin', 'anonymous');
        scriptTag.setAttribute('src', 'https://connect.facebook.net/de_DE/sdk.js');

        window.fbAsyncInit = function () {
            FB.init({
                appId: Config.FACEBOOK_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v9.0',
            });
        };

        document.body.appendChild(scriptTag);
        this._isInitialized = true;
    }

    /**
     * checks the current login state of the user
     *
     * @static
     * @param {(response: fb.StatusResponse) => void} onResponse
     * @memberof FacebookService
     */
    public static getLoginState(onResponse: (response: fb.StatusResponse) => void) {
        FB.getLoginStatus((response: fb.StatusResponse) => {
            onResponse(response);
        });
    }

    /**
     * triggers the FB login
     *
     * @static
     * @param {(response: fb.StatusResponse) => void} onLogin
     * @param {string[]} [permissions=RegisterPermissions]
     * @memberof FacebookService
     */
    public static login(onLogin: (response: fb.StatusResponse) => Promise<void>, permissions: string[] = RegisterPermissions) {
        FB.login(
            (response: fb.StatusResponse) => {
                void onLogin(response);
            },
            { scope: permissions.join(','), return_scopes: true }
        );
    }

    public static logout() {
        FB.logout();
    }

    public static getUserData(fbAccessToken: string, onResponse: (error: object, result: IFacebookGraphResponse) => void) {
        // fetch facebook user data
        return FB.api('/' + fbAccessToken + '?fields=' + fbDataRequestString, (response: IFacebookGraphResponse) => {
            onResponse({}, response);
        });
        // return FB.api(
        //     '/me',
        //     {
        //         accessToken: fbAccessToken,
        //         parameters: {
        //             fields: {
        //                 string: 'user_birthday,user_gender,user_age_range',
        //             },
        //         },
        //     },
        //     (response: IFacebookGraphResponse) => {
        //         Logger.log(response);
        //         onResponse({}, response);
        //     }
        // );
        // // create a new Graph request, issueing the retrieved access token, to receive the users information
        // const infoRequest = new GraphRequest(
        //     '/me',
        //     {
        //         accessToken: fbAccessToken.accessToken,
        //         parameters: {
        //             fields: {
        //                 string: fbDataRequestString,
        //             },
        //         },
        //     },
        //     onResponse
        // );
        // // create a single instance of a request manager if not done yet
        // if (!this._graphRequestManager) {
        //     this._graphRequestManager = new GraphRequestManager();
        // }
        // // add the request and start it
        // return this._graphRequestManager.addRequest(infoRequest).start();
    }
}

export default FacebookService;

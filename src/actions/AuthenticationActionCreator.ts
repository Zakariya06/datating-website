import Config from '../config';
import FetchApi from '../core/fetch/FetchApi';
import generateValidUrl from '../core/fetch/generateValidUrl';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { GeoLocation } from '../core/GeolocationProvider';
import { IAppleLoginCredentials } from '../models/authentication/login/IAppleLoginCredentials';
import { IFacebookLoginCredentials } from '../models/authentication/login/IFacebookLoginCredentials';
import { ILoginCredentials } from '../models/authentication/login/ILoginCredentials';
import { IAppleRegistrationCredentials } from '../models/authentication/registration/IAppleRegistrationCredentials';
import { IFacebookRegistrationCredentials } from '../models/authentication/registration/IFacebookRegistrationCredentials';
import { IRegistrationCredentials } from '../models/authentication/registration/IRegistrationCredentials';
import { ActionCreator, IAsyncAction, IBaseAction, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../models/state';
import { IUser } from '../models/user/IUser';
import { IOptInResponse } from '../models/user/OptIn';
import { getUserAndToken } from '../selectors/AuthenticationSelectors';
import BerndMapper from '../temp/BerndMapper';
import formatRequestBody from '../temp/formatRequestBody';

export enum AuthenticationActions {
    DISMISS_AUTHENTICATION = 'DISMISS_AUTHENTICATION',
    LOGOUT = 'LOGOUT',
    TRANSIENT_LOGIN = 'TRANSIENT_LOGIN',

    REGISTER_USER = 'REGISTER_USER',
    REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
    REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE',
    REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE',

    LOGIN_USER = 'LOGIN_USER',
    LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
    LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE',
    LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',

    FACEBOOK_REGISTER_USER = 'FACEBOOK_REGISTER_USER',
    FACEBOOK_REGISTER_USER_REQUEST = 'FACEBOOK_REGISTER_USER_REQUEST',
    FACEBOOK_REGISTER_USER_RESPONSE = 'FACEBOOK_REGISTER_USER_RESPONSE',
    FACEBOOK_REGISTER_USER_FAILURE = 'FACEBOOK_REGISTER_USER_FAILURE',
    FACEBOOK_LOGIN_USER = 'FACEBOOK_LOGIN_USER',
    FACEBOOK_LOGIN_USER_REQUEST = 'FACEBOOK_LOGIN_USER_REQUEST',
    FACEBOOK_LOGIN_USER_RESPONSE = 'FACEBOOK_LOGIN_USER_RESPONSE',
    FACEBOOK_LOGIN_USER_FAILURE = 'FACEBOOK_LOGIN_USER_FAILURE',

    APPLE_REGISTER_USER = 'APPLE_REGISTER_USER',
    APPLE_REGISTER_USER_REQUEST = 'APPLE_REGISTER_USER_REQUEST',
    APPLE_REGISTER_USER_RESPONSE = 'APPLE_REGISTER_USER_RESPONSE',
    APPLE_REGISTER_USER_FAILURE = 'APPLE_REGISTER_USER_FAILURE',
    APPLE_LOGIN_USER = 'APPLE_LOGIN_USER',
    APPLE_LOGIN_USER_REQUEST = 'APPLE_LOGIN_USER_REQUEST',
    APPLE_LOGIN_USER_RESPONSE = 'APPLE_LOGIN_USER_RESPONSE',
    APPLE_LOGIN_USER_FAILURE = 'APPLE_LOGIN_USER_FAILURE',

    RECEIVE_GEOLOCATION = 'RECEIVE_GEOLOCATION',

    OPT_IN = 'OPT_IN',
    OPT_IN_REQUEST = 'OPT_IN_REQUEST',
    OPT_IN_RESPONSE = 'OPT_IN_RESPONSE',
    OPT_IN_FAILURE = 'OPT_IN_FAILURE',
}

type ICancelAuthenticationAction = IBaseAction<AuthenticationActions.DISMISS_AUTHENTICATION>;
type ILogoutAction = IBaseAction<AuthenticationActions.LOGOUT>;
type ITransientLoginAction = IBaseAction<AuthenticationActions.TRANSIENT_LOGIN, [IUser]>;

type IRegisterUserRequest = IRequestDataAction<AuthenticationActions.REGISTER_USER>;
type IRegisterUserResponse = IReceiveDataAction<AuthenticationActions.REGISTER_USER_RESPONSE, [IUser]>;
type IRegisterUserFailure = IRequestDataFailedAction<AuthenticationActions.REGISTER_USER_FAILURE>;
type RegisterUserAction = IRegisterUserRequest | IRegisterUserResponse | IRegisterUserFailure;

type ILoginUserRequest = IRequestDataAction<AuthenticationActions.LOGIN_USER_REQUEST>;
type ILoginUserResponse = IReceiveDataAction<AuthenticationActions.LOGIN_USER_RESPONSE, [IUser]>;
type ILoginUserFailed = IRequestDataFailedAction<AuthenticationActions.LOGIN_USER_FAILURE>;
type LoginUserAction = ILoginUserRequest | ILoginUserResponse | ILoginUserFailed;

type IFacebookRegisterUserRequest = IRequestDataAction<AuthenticationActions.FACEBOOK_REGISTER_USER>;
export type IFacebookRegisterUserResponse = IReceiveDataAction<AuthenticationActions.FACEBOOK_REGISTER_USER_RESPONSE, [IUser]>;
export type IFacebookRegisterUserFailure = IRequestDataFailedAction<AuthenticationActions.FACEBOOK_REGISTER_USER_FAILURE>;
type FacebookRegisterUserAction = IFacebookRegisterUserRequest | IFacebookRegisterUserResponse | IFacebookRegisterUserFailure;

type IFacebookLoginUserRequest = IRequestDataAction<AuthenticationActions.FACEBOOK_LOGIN_USER_REQUEST>;
type IFacebookLoginUserResponse = IReceiveDataAction<AuthenticationActions.FACEBOOK_LOGIN_USER_RESPONSE, [IUser]>;
type IFacebookLoginUserFailed = IRequestDataFailedAction<AuthenticationActions.FACEBOOK_LOGIN_USER_FAILURE>;
type FacebookLoginUserAction = IFacebookLoginUserRequest | IFacebookLoginUserResponse | IFacebookLoginUserFailed;

type IAppleRegisterUserRequest = IRequestDataAction<AuthenticationActions.APPLE_REGISTER_USER_REQUEST>;
type IAppleRegisterUserResponse = IReceiveDataAction<AuthenticationActions.APPLE_REGISTER_USER_RESPONSE, [IUser]>;
type IAppleRegisterUserFailure = IRequestDataFailedAction<AuthenticationActions.APPLE_REGISTER_USER_FAILURE>;
type AppleRegisterUserAction = IAppleRegisterUserRequest | IAppleRegisterUserResponse | IAppleRegisterUserFailure;

type IAppleLoginUserRequest = IRequestDataAction<AuthenticationActions.APPLE_LOGIN_USER_REQUEST>;
type IAppleLoginUserResponse = IReceiveDataAction<AuthenticationActions.APPLE_LOGIN_USER_RESPONSE, [IUser]>;
type IAppleLoginUserFailure = IRequestDataFailedAction<AuthenticationActions.APPLE_LOGIN_USER_FAILURE>;
type AppleLoginUserAction = IAppleLoginUserRequest | IAppleLoginUserResponse | IAppleLoginUserFailure;

type IReceiveGeolocationAction = IBaseAction<AuthenticationActions.RECEIVE_GEOLOCATION, GeoLocation | null>;

type OptInRequest = IRequestDataAction<AuthenticationActions.OPT_IN_REQUEST>;
type OptInResponse = IReceiveDataAction<AuthenticationActions.OPT_IN_RESPONSE, IOptInResponse>;
type OptInFailure = IRequestDataFailedAction<AuthenticationActions.OPT_IN_FAILURE>;
type OptIn = OptInRequest | OptInResponse | OptInFailure;

export type AuthenticationAction =
    | RegisterUserAction
    | LoginUserAction
    | FacebookRegisterUserAction
    | FacebookLoginUserAction
    | ICancelAuthenticationAction
    | ILogoutAction
    | AppleRegisterUserAction
    | AppleLoginUserAction
    | ITransientLoginAction
    | IReceiveGeolocationAction
    | OptIn;

export class AuthenticationActionCreator {
    public static transientLogin(credentials: [IUser]): ITransientLoginAction {
        return ActionCreator.createAction<AuthenticationActions.TRANSIENT_LOGIN, [IUser]>(AuthenticationActions.TRANSIENT_LOGIN, credentials);
    }

    public static cancelAuthentication(): ICancelAuthenticationAction {
        return ActionCreator.createAction<AuthenticationActions.DISMISS_AUTHENTICATION>(AuthenticationActions.DISMISS_AUTHENTICATION);
    }

    public static registerUser(registerData: IRegistrationCredentials): IAsyncAction {
        const href = generateValidUrl(Config.REGISTER_USER_URL);

        return ActionCreator.createAsyncAction(
            AuthenticationActions.REGISTER_USER,
            [AuthenticationActions.REGISTER_USER_REQUEST, AuthenticationActions.REGISTER_USER_RESPONSE, AuthenticationActions.REGISTER_USER_FAILURE],
            () =>
                FetchApi.fetch(
                    href,
                    formatRequestBody(Config.REGISTER_USER_URL, undefined, BerndMapper.mapRegisterCredentials(registerData)),
                    HttpMethods.POST
                )
        );
    }

    public static loginUser(credentials: ILoginCredentials): IAsyncAction {
        const href = generateValidUrl(Config.BASE_URL);

        return ActionCreator.createAsyncAction(
            AuthenticationActions.LOGIN_USER,
            [AuthenticationActions.LOGIN_USER_REQUEST, AuthenticationActions.LOGIN_USER_RESPONSE, AuthenticationActions.LOGIN_USER_FAILURE],
            () => {
                return FetchApi.fetch(
                    href,
                    formatRequestBody(Config.LOGIN_USER_URL, undefined, BerndMapper.mapLoginCredentials(credentials)),
                    HttpMethods.POST
                );
            }
        );
    }

    public static registerFacebookUser(registerData: IFacebookRegistrationCredentials): IAsyncAction {
        const href = generateValidUrl(Config.FACEBOOK_REGISTER_USER_URL);
        return ActionCreator.createAsyncAction(
            AuthenticationActions.FACEBOOK_REGISTER_USER,
            [
                AuthenticationActions.FACEBOOK_REGISTER_USER_REQUEST,
                AuthenticationActions.FACEBOOK_REGISTER_USER_RESPONSE,
                AuthenticationActions.FACEBOOK_REGISTER_USER_FAILURE,
            ],
            async (state: IState) => {
                return FetchApi.fetch(
                    href,
                    formatRequestBody(Config.REGISTER_USER_URL, undefined, BerndMapper.mapFacebookRegisterCredentials(registerData)),
                    HttpMethods.POST
                );
            }
        );
    }

    public static loginFacebookUser(credentials: IFacebookLoginCredentials): IAsyncAction {
        const href = generateValidUrl(Config.FACEBOOK_LOGIN_USER_URL);
        return ActionCreator.createAsyncAction(
            AuthenticationActions.FACEBOOK_LOGIN_USER,
            [
                AuthenticationActions.FACEBOOK_LOGIN_USER_REQUEST,
                AuthenticationActions.FACEBOOK_LOGIN_USER_RESPONSE,
                AuthenticationActions.FACEBOOK_LOGIN_USER_FAILURE,
            ],
            () => {
                return FetchApi.fetch(
                    href,
                    formatRequestBody(Config.LOGIN_USER_URL, undefined, BerndMapper.mapFacebookLoginCredentials(credentials)),
                    HttpMethods.POST
                );
            }
        );
    }

    public static registerAppleUser(credentials: IAppleRegistrationCredentials): IAsyncAction {
        const href = generateValidUrl(Config.APPLE_REGISTER_USER_URL);
        return ActionCreator.createAsyncAction(
            AuthenticationActions.APPLE_REGISTER_USER,
            [
                AuthenticationActions.APPLE_REGISTER_USER_REQUEST,
                AuthenticationActions.APPLE_REGISTER_USER_RESPONSE,
                AuthenticationActions.APPLE_REGISTER_USER_FAILURE,
            ],
            () =>
                FetchApi.fetch(
                    href,
                    formatRequestBody(Config.REGISTER_USER_URL, undefined, BerndMapper.mapAppleRegisterCredentials(credentials)),
                    HttpMethods.POST
                )
        );
    }

    public static loginAppleUser(credentials: IAppleLoginCredentials): IAsyncAction {
        const href = generateValidUrl(Config.APPLE_LOGIN_USER_URL);
        return ActionCreator.createAsyncAction(
            AuthenticationActions.APPLE_LOGIN_USER,
            [
                AuthenticationActions.APPLE_LOGIN_USER_REQUEST,
                AuthenticationActions.APPLE_LOGIN_USER_RESPONSE,
                AuthenticationActions.APPLE_LOGIN_USER_FAILURE,
            ],
            () =>
                FetchApi.fetch(
                    href,
                    formatRequestBody(Config.LOGIN_USER_URL, undefined, BerndMapper.mapAppleLoginCredentials(credentials)),
                    HttpMethods.POST
                )
        );
    }

    public static logout() {
        return ActionCreator.createAction(AuthenticationActions.LOGOUT);
    }

    public static receiveGeolocation(geolocation: GeoLocation | null) {
        return ActionCreator.createAction(AuthenticationActions.RECEIVE_GEOLOCATION, geolocation);
    }

    public static getOptInState(): IAsyncAction {
        const href = new URL(Config.OPT_IN_SELF_STATE_URL, Config.BASE_URL);

        return ActionCreator.createAsyncAction(
            Config.BLACKLIST_ACTION_PREFIX + AuthenticationActions.OPT_IN,
            [AuthenticationActions.OPT_IN_REQUEST, AuthenticationActions.OPT_IN_RESPONSE, AuthenticationActions.OPT_IN_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(href, undefined, HttpMethods.GET, token, user);
            }
        );
    }
}

export default AuthenticationActionCreator;

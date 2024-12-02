import Config from '../config';
import FetchApi from '../core/fetch/FetchApi';
import generateValidUrl from '../core/fetch/generateValidUrl';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { IUploadImage } from '../models/core/image/IUploadImage';
import { IDevice } from '../models/device/IDevice';
import { IUpdateLocationCredentials } from '../models/location/IUpdateLocationCredentials';
import { IReceiptAndroid } from '../models/receipt/IReceiptAndroid';
import { IReceiptIOS } from '../models/receipt/IReceiptIOS';
import { ActionCreator, IAsyncAction, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../models/state';
import { IUserAttributesCollection } from '../models/user/attributes/IUserAttributes';
import { IUpdateUser } from '../models/user/IUpdateUser';
import { IUser } from '../models/user/IUser';
import { getUserAndToken } from '../selectors/AuthenticationSelectors';
import BerndMapper from '../temp/BerndMapper';
import formatRequestBody from '../temp/formatRequestBody';

export enum UserActions {
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST',
    UPDATE_PROFILE_RESPONSE = 'UPDATE_PROFILE_RESPONSE',
    UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE',

    UPDATE_LOCATION = 'UPDATE_LOCATION',
    UPDATE_LOCATION_REQUEST = 'UPDATE_LOCATION_REQUEST',
    UPDATE_LOCATION_RESPONSE = 'UPDATE_LOCATION_RESPONSE',
    UPDATE_LOCATION_FAILURE = 'UPDATE_LOCATION_FAILURE',

    GET_PROFILE = 'GET_PROFILE',
    GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
    GET_PROFILE_RESPONSE = 'GET_PROFILE_RESPONSE',
    GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE',

    UPDATE_SEARCH_SETTINGS = 'UPDATE_SEARCH_SETTINGS',
    UPDATE_SEARCH_SETTINGS_REQUEST = 'UPDATE_SEARCH_SETTINGS_REQUEST',
    UPDATE_SEARCH_SETTINGS_RESPONSE = 'UPDATE_SEARCH_SETTINGS_RESPONSE',
    UPDATE_SEARCH_SETTINGS_FAILURE = 'UPDATE_SEARCH_SETTINGS_FAILURE',

    UPLOAD_PICTURE = 'UPLOAD_PICTURE',
    UPLOAD_PICTURE_REQUEST = 'UPLOAD_PICTURE_REQUEST',
    UPLOAD_PICTURE_RESPONSE = 'UPLOAD_PICTURE_RESPONSE',
    UPLOAD_PICTURE_FAILURE = 'UPLOAD_PICTURE_FAILURE',

    DELETE_PICTURE = 'DELETE_PICTURE',
    DELETE_PICTURE_REQUEST = 'DELETE_PICTURE_REQUEST',
    DELETE_PICTURE_RESPONSE = 'DELETE_PICTURE_RESPONSE',
    DELETE_PICTURE_FAILURE = 'DELETE_PICTURE_FAILURE',

    PURCHASE_COINS = 'PURCHASE_COINS',
    PURCHASE_COINS_REQUEST = 'PURCHASE_COINS_REQUEST',
    PURCHASE_COINS_RESPONSE = 'PURCHASE_COINS_RESPONSE',
    PURCHASE_COINS_FAILURE = 'PURCHASE_COINS_FAILURE',

    VERIFY_PURCHASE_IOS = 'VERIFY_PURCHASE_IOS',
    VERIFY_PURCHASE_IOS_REQUEST = 'VERIFY_PURCHASE_IOS_REQUEST',
    VERIFY_PURCHASE_IOS_RESPONSE = 'VERIFY_PURCHASE_IOS_RESPONSE',
    VERIFY_PURCHASE_IOS_FAILURE = 'VERIFY_PURCHASE_IOS_FAILURE',

    VERIFY_PURCHASE_ANDROID = 'VERIFY_PURCHASE_ANDROID',
    VERIFY_PURCHASE_ANDROID_REQUEST = 'VERIFY_PURCHASE_ANDROID_REQUEST',
    VERIFY_PURCHASE_ANDROID_RESPONSE = 'VERIFY_PURCHASE_ANDROID_RESPONSE',
    VERIFY_PURCHASE_ANDROID_FAILURE = 'VERIFY_PURCHASE_ANDROID_FAILURE',

    ADD_DEVICE = 'ADD_DEVICE',
    ADD_DEVICE_REQUEST = 'ADD_DEVICE_REQUEST',
    ADD_DEVICE_RESPONSE = 'ADD_DEVICE_RESPONSE',
    ADD_DEVICE_FAILURE = 'ADD_DEVICE_FAILURE',

    PATCH_DEVICE = 'PATCH_DEVICE',
    PATCH_DEVICE_REQUEST = 'PATCH_DEVICE_REQUEST',
    PATCH_DEVICE_RESPONSE = 'PATCH_DEVICE_RESPONSE',
    PATCH_DEVICE_FAILURE = 'PATCH_DEVICE_FAILURE',

    DELETE_ACCOUNT = 'DELETE_ACCOUNT',
    DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST',
    DELETE_ACCOUNT_RESPONSE = 'DELETE_ACCOUNT_RESPONSE',
    DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE',

    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST',
    FORGOT_PASSWORD_RESPONSE = 'FORGOT_PASSWORD_RESPONSE',
    FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE',

    USER_ATTRIBUTES = 'USER_ATTRIBUTES',
    USER_ATTRIBUTES_REQUEST = 'USER_ATTRIBUTES_REQUEST',
    USER_ATTRIBUTES_RESPONSE = 'USER_ATTRUBUTES_RESPONSE',
    USER_ATTRIBUTES_FAILURE = 'USER_ATTRIBUTES_FAILURE',

    UPLOAD_COIN_PICTURE = 'UPLOAD_COIN_PICTURE',
    UPLOAD_COIN_PICTURE_REQUEST = 'UPLOAD_COIN_PICTURE_REQUEST',
    UPLOAD_COIN_PICTURE_RESPONSE = 'UPLOAD_COIN_PICTURE_RESPONSE',
    UPLOAD_COIN_PICTURE_FAILURE = 'UPLOAD_COIN_PICTURE_FAILURE',

    UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE',
    UPDATE_PROFILE_PICTURE_REQUEST = 'UPDATE_PROFILE_PICTURE_REQUEST',
    UPDATE_PROFILE_PICTURE_RESPONSE = 'UPDATE_PROFILE_PICTURE_RESPONSE',
    UPDATE_PROFILE_PICTURE_FAILURE = 'UPDATE_RPOFILE_PICTURE_FAILURE',

    PURCHASE_COIN_IMAGE = 'PURCHASE_COIN_IMAGE',
    PURCHASE_COIN_IMAGE_REQUEST = 'PURCHASE_COIN_IMAGE_REQUEST',
    PURCHASE_COIN_IMAGE_RESPONSE = 'PURCHASE_COIN_IMAGE_RESPONSE',
    PURCHASE_COIN_IMAGE_FAILURE = 'PURCHASE_COIN_IMAGE_FAILURE',

    UPDATE_SOCIAL_USER = 'UPDATE_SOCIAL_USER',
    UPDATE_SOCIAL_USER_REQUEST = 'UPDATE_SOCIAL_USER_REQUEST',
    UPDATE_SOCIAL_USER_RESPONSE = 'UPDATE_SOCIAL_USER_RESPONSE',
    UPDATE_SOCIAL_USER_FAILURE = 'UPDATE_SOCIAL_USER_FAILURE',

    REDEEM_BONUS_CODE = 'REDEEM_BONUS_CODE',
    REDEEM_BONUS_CODE_REQUEST = 'REDEEM_BONUS_CODE_REQUEST',
    REDEEM_BONUS_CODE_RESPONSE = 'REDEEM_BONUS_CODE_RESPONE',
    REDEEM_BONUS_CODE_FAILURE = 'REDEEM_BONUS_CODE_FAILURE',
}

type IUpdateProfileRequest = IRequestDataAction<UserActions.UPDATE_PROFILE_REQUEST>;
type IUpdateProfileResponse = IReceiveDataAction<UserActions.UPDATE_PROFILE_RESPONSE, [IUser]>;
type IUpdateProfileFailure = IRequestDataFailedAction<UserActions.UPDATE_PROFILE_FAILURE>;
type UpdateProfileAction = IUpdateProfileRequest | IUpdateProfileResponse | IUpdateProfileFailure;

type IUpdateLocationRequest = IRequestDataAction<UserActions.UPDATE_LOCATION_REQUEST>;
type IUpdateLocationResponse = IReceiveDataAction<UserActions.UPDATE_LOCATION_RESPONSE, [IUser]>;
type IUpdateLocationFailure = IRequestDataFailedAction<UserActions.UPDATE_LOCATION_FAILURE>;
type UpdateLocationAction = IUpdateLocationRequest | IUpdateLocationResponse | IUpdateLocationFailure;

type IGetProfileRequest = IRequestDataAction<UserActions.GET_PROFILE_REQUEST>;
type IGetProfileResponse = IReceiveDataAction<UserActions.GET_PROFILE_RESPONSE, [IUser]>;
type IGetProfileFailure = IRequestDataFailedAction<UserActions.GET_PROFILE_FAILURE>;
type GetProfileAction = IGetProfileRequest | IGetProfileResponse | IGetProfileFailure;

type IUpdateSearchSettingsRequest = IRequestDataAction<UserActions.UPDATE_SEARCH_SETTINGS_REQUEST>;
type IUpdateSearchSettingsResponse = IReceiveDataAction<UserActions.UPDATE_SEARCH_SETTINGS_RESPONSE, [IUser]>;
type IUpdateSearchSettingsFailure = IRequestDataFailedAction<UserActions.UPDATE_SEARCH_SETTINGS_FAILURE>;
type UpdateSearchSettingsAction = IUpdateSearchSettingsRequest | IUpdateSearchSettingsResponse | IUpdateSearchSettingsFailure;

type IUploadPictureRequest = IRequestDataAction<UserActions.UPLOAD_PICTURE_REQUEST>;
type IUploadPictureResponse = IReceiveDataAction<UserActions.UPLOAD_PICTURE_RESPONSE, [IUser]>;
type IUploadPictureFailure = IRequestDataFailedAction<UserActions.UPLOAD_PICTURE_FAILURE>;
type UploadPictureAction = IUploadPictureRequest | IUploadPictureResponse | IUploadPictureFailure;

type IDeletePictureRequest = IRequestDataAction<UserActions.DELETE_PICTURE_REQUEST>;
type IDeletePictureResponse = IReceiveDataAction<UserActions.DELETE_PICTURE_RESPONSE, {}, { imageId: string }>;
type IDeletePictureFailure = IRequestDataFailedAction<UserActions.DELETE_PICTURE_FAILURE>;
type DeletePictureAction = IDeletePictureRequest | IDeletePictureResponse | IDeletePictureFailure;

type IPurchaseCoinsRequest = IRequestDataAction<UserActions.PURCHASE_COINS_REQUEST>;
type IPurchaseCoinsResponse = IReceiveDataAction<UserActions.PURCHASE_COINS_RESPONSE, [IUser]>;
type IPurchaseCoinsFailure = IRequestDataFailedAction<UserActions.PURCHASE_COINS_FAILURE>;
type PurchaseCoinsAction = IPurchaseCoinsRequest | IPurchaseCoinsResponse | IPurchaseCoinsFailure;

type IVerifyPurchaseIosRequest = IRequestDataAction<UserActions.VERIFY_PURCHASE_IOS_REQUEST>;
type IVerifyPurchaseIosResponse = IReceiveDataAction<UserActions.VERIFY_PURCHASE_IOS_RESPONSE, [IUser]>;
type IVerifyPurchaseIosFailure = IRequestDataFailedAction<UserActions.VERIFY_PURCHASE_IOS_FAILURE>;
type VerifyPurchaseIos = IVerifyPurchaseIosRequest | IVerifyPurchaseIosResponse | IVerifyPurchaseIosFailure;

type IVerifyPurchaseAndroidRequest = IRequestDataAction<UserActions.VERIFY_PURCHASE_ANDROID_REQUEST>;
type IVerifyPurchaseAndroidResponse = IReceiveDataAction<UserActions.VERIFY_PURCHASE_ANDROID_RESPONSE, [IUser]>;
type IVerifyPurchaseAndroidFailure = IRequestDataFailedAction<UserActions.VERIFY_PURCHASE_ANDROID_FAILURE>;
type VerifyPurchaseAndroid = IVerifyPurchaseAndroidRequest | IVerifyPurchaseAndroidResponse | IVerifyPurchaseAndroidFailure;

type IAddDeviceRequest = IRequestDataAction<UserActions.ADD_DEVICE_REQUEST>;
type IAddDeviceResponse = IReceiveDataAction<UserActions.ADD_DEVICE_RESPONSE, {}>;
type IAddDeviceFailure = IRequestDataFailedAction<UserActions.ADD_DEVICE_FAILURE>;
type AddDevice = IAddDeviceRequest | IAddDeviceResponse | IAddDeviceFailure;

type IUpdateDeviceRequest = IRequestDataAction<UserActions.PATCH_DEVICE_REQUEST>;
type IUpdateDeviceResponse = IReceiveDataAction<UserActions.PATCH_DEVICE_RESPONSE>;
type IUpdateDeviceFailure = IRequestDataFailedAction<UserActions.PATCH_DEVICE_FAILURE>;
type UpdateDevice = IUpdateDeviceRequest | IUpdateDeviceResponse | IUpdateDeviceFailure;

type IDeleteAccountRequest = IRequestDataAction<UserActions.DELETE_ACCOUNT_REQUEST>;
type IDeleteAccountResponse = IReceiveDataAction<UserActions.DELETE_ACCOUNT_RESPONSE>;
type IDeleteAccountFailure = IRequestDataFailedAction<UserActions.DELETE_ACCOUNT_FAILURE>;
type DeleteAccount = IDeleteAccountRequest | IDeleteAccountResponse | IDeleteAccountFailure;

type IForgotPasswordRequest = IRequestDataAction<UserActions.FORGOT_PASSWORD_REQUEST>;
type IForgotPasswordResponse = IReceiveDataAction<UserActions.FORGOT_PASSWORD_RESPONSE, {}>;
type IForgotPasswordFailure = IRequestDataFailedAction<UserActions.FORGOT_PASSWORD_FAILURE>;
type ForgotPassword = IForgotPasswordRequest | IForgotPasswordResponse | IForgotPasswordFailure;

type IUserAttributesRequest = IRequestDataAction<UserActions.USER_ATTRIBUTES_REQUEST>;
type IUserAttributesResponse = IReceiveDataAction<UserActions.USER_ATTRIBUTES_RESPONSE, IUserAttributesCollection>;
type IUserAttributesFailure = IRequestDataFailedAction<UserActions.USER_ATTRIBUTES_FAILURE>;
type UserAttributes = IUserAttributesRequest | IUserAttributesResponse | IUserAttributesFailure;

type IUploadCoinPictureRequest = IRequestDataAction<UserActions.UPLOAD_COIN_PICTURE_REQUEST>;
type IUploadCoinPictureResponse = IReceiveDataAction<UserActions.UPLOAD_COIN_PICTURE_RESPONSE, [IUser]>;
type IUploadCoinPictureFailure = IRequestDataFailedAction<UserActions.UPLOAD_COIN_PICTURE_FAILURE>;
type UploadCoinPicture = IUploadCoinPictureRequest | IUploadCoinPictureResponse | IUploadCoinPictureFailure;

type IUpdateProfilePictureRequest = IRequestDataAction<UserActions.UPDATE_PROFILE_PICTURE_REQUEST>;
type IUpdateProfilePictureResponse = IReceiveDataAction<UserActions.UPDATE_PROFILE_PICTURE_RESPONSE, [IUser]>;
type IUpdateProfilePictureFailure = IRequestDataFailedAction<UserActions.UPDATE_PROFILE_PICTURE_FAILURE>;
type IUpdateProfilePicture = IUpdateProfilePictureRequest | IUpdateProfilePictureResponse | IUpdateProfilePictureFailure;

type IPurchaseCoinImageRequest = IRequestDataAction<UserActions.PURCHASE_COIN_IMAGE_REQUEST>;
type IPurchaseCoinImageResponse = IReceiveDataAction<UserActions.PURCHASE_COIN_IMAGE_RESPONSE, [IUser]>;
type IPurchaseCoinImageFailure = IRequestDataFailedAction<UserActions.PURCHASE_COIN_IMAGE_FAILURE>;
type IPurchaseCoinImage = IPurchaseCoinImageRequest | IPurchaseCoinImageResponse | IPurchaseCoinImageFailure;

type IUpdateSocialUserRequest = IRequestDataAction<UserActions.UPDATE_SOCIAL_USER_REQUEST>;
type IUpdateSocialUserResponse = IReceiveDataAction<UserActions.UPDATE_SOCIAL_USER_RESPONSE>;
type IUpdateSocialUserFailure = IRequestDataFailedAction<UserActions.UPDATE_SOCIAL_USER_FAILURE>;
type IUpdateSocialUser = IUpdateSocialUserRequest | IUpdateSocialUserResponse | IUpdateSocialUserFailure;

type IRedeemBonuscodeRequest = IRequestDataAction<UserActions.REDEEM_BONUS_CODE_REQUEST>;
type IRedeemBonuscodeResponse = IReceiveDataAction<UserActions.REDEEM_BONUS_CODE_RESPONSE>;
type IRedeemBonuscodeFailure = IRequestDataFailedAction<UserActions.REDEEM_BONUS_CODE_FAILURE>;
type RedeemBonuscode = IRedeemBonuscodeRequest | IRedeemBonuscodeResponse | IRedeemBonuscodeFailure;

export type UserAction =
    | UpdateProfileAction
    | UpdateLocationAction
    | UpdateSearchSettingsAction
    | UploadPictureAction
    | DeletePictureAction
    | PurchaseCoinsAction
    | VerifyPurchaseIos
    | VerifyPurchaseAndroid
    | AddDevice
    | DeleteAccount
    | ForgotPassword
    | GetProfileAction
    | UserAttributes
    | UploadCoinPicture
    | IUpdateProfilePicture
    | IPurchaseCoinImage
    | UpdateDevice
    | IUpdateSocialUser
    | RedeemBonuscode;

export class UserActionCreator {
    public static updateSocialUser(updatedUser: IUpdateUser) {
        const url = generateValidUrl(Config.BASE_URL);
        return ActionCreator.createAsyncAction(
            UserActions.UPDATE_PROFILE,
            [UserActions.UPDATE_PROFILE_REQUEST, UserActions.UPDATE_PROFILE_RESPONSE, UserActions.UPDATE_PROFILE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UPDATE_SOCIAL_USER_PROFILE_URL, user?.Userid, BerndMapper.mapUpdateSocialUser(updatedUser)),
                    HttpMethods.PATCH,
                    token,
                    user
                );
            }
        );
    }

    public static deleteAccount() {
        const url = generateValidUrl(Config.BASE_URL);

        return ActionCreator.createAsyncAction(
            UserActions.DELETE_ACCOUNT,
            [UserActions.DELETE_ACCOUNT_REQUEST, UserActions.DELETE_ACCOUNT_RESPONSE, UserActions.DELETE_ACCOUNT_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.DELETE_USER_URL, user?.Userid, {}), HttpMethods.DELETE, token, user);
            }
        );
    }

    public static updateProfile(updatedUser: IUpdateUser): IAsyncAction {
        const url = generateValidUrl(Config.BASE_URL);
        const track = document.querySelector('.user-card-grid-root');
        if (track) {
            track.innerHTML = '';
        }
        return ActionCreator.createAsyncAction(
            UserActions.UPDATE_PROFILE,
            [UserActions.UPDATE_PROFILE_REQUEST, UserActions.UPDATE_PROFILE_RESPONSE, UserActions.UPDATE_PROFILE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UPDATE_USER_PROFILE_URL, user?.Userid, BerndMapper.mapUpdateUser(updatedUser)),
                    HttpMethods.PATCH,
                    token,
                    user
                );
            }
        );
    }

    public static updateLocation(newLocation: IUpdateLocationCredentials) {
        const url = generateValidUrl(Config.UPDATE_LOCATION_URL);
        return ActionCreator.createAsyncAction(
            UserActions.UPDATE_LOCATION,
            [UserActions.UPDATE_LOCATION_REQUEST, UserActions.UPDATE_LOCATION_RESPONSE, UserActions.UPDATE_LOCATION_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UPDATE_LOCATION_URL, user?.Userid, BerndMapper.mapUpdateLocationCredentials(newLocation)),
                    HttpMethods.PATCH,
                    token,
                    user
                );
            }
        );
    }

    public static refreshUser(): IAsyncAction {
        const url = generateValidUrl(Config.REFRESH_USER_PROFILE_URL);
        return ActionCreator.createAsyncAction(
            UserActions.GET_PROFILE,
            [UserActions.GET_PROFILE_REQUEST, UserActions.GET_PROFILE_RESPONSE, UserActions.GET_PROFILE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.REFRESH_USER_PROFILE_URL, user?.Userid, {}), HttpMethods.POST, token, user);
            }
        );
    }

    public static getUserAttributes(): IAsyncAction {
        const url = generateValidUrl(Config.USER_ATTRIBUTES_URL);

        return ActionCreator.createAsyncAction(
            Config.BLACKLIST_ACTION_PREFIX + UserActions.USER_ATTRIBUTES,
            [UserActions.USER_ATTRIBUTES_REQUEST, UserActions.USER_ATTRIBUTES_RESPONSE, UserActions.USER_ATTRIBUTES_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.USER_ATTRIBUTES_URL, user?.Userid, {}), HttpMethods.GET, token, user);
            }
        );
    }

    public static updateSearchSettings(settings: {
        preferredGender: number;
        preferredMinAge: number;
        preferredMaxAge: number;
        preferredMaxDistance?: number;
    }): IAsyncAction {
        const url = generateValidUrl(Config.UPDATE_SEARCH_SETTINGS_URL);

        return ActionCreator.createAsyncAction(
            UserActions.UPDATE_SEARCH_SETTINGS,
            [UserActions.UPDATE_SEARCH_SETTINGS_REQUEST, UserActions.UPDATE_SEARCH_SETTINGS_RESPONSE, UserActions.UPDATE_SEARCH_SETTINGS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(
                        Config.UPDATE_SEARCH_SETTINGS_URL,
                        user?.Userid,
                        user ? BerndMapper.mapUpdateUser({ ...BerndMapper.mapUpdateUserForUser(user), ...settings }) : settings
                    ),
                    HttpMethods.GET,
                    token,
                    user
                );

            }
        );

    }

    public static uploadPicture(data: IUploadImage): IAsyncAction {
        const url = generateValidUrl(Config.UPLOAD_PICTURE_URL);
        return ActionCreator.createAsyncAction(
            UserActions.UPLOAD_PICTURE,
            [UserActions.UPLOAD_PICTURE_REQUEST, UserActions.UPLOAD_PICTURE_RESPONSE, UserActions.UPLOAD_PICTURE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UPLOAD_PICTURE_URL, user?.Userid, BerndMapper.mapUploadImage(data)),
                    HttpMethods.POST,
                    token,
                    user
                );
            },
            undefined,
            data
        );
    }

    public static deletePicture(imageId: string): IAsyncAction {
        const url = generateValidUrl(Config.DELETE_PICTURE_URL);
        return ActionCreator.createAsyncAction(
            UserActions.DELETE_PICTURE,
            [UserActions.DELETE_PICTURE_REQUEST, UserActions.DELETE_PICTURE_RESPONSE, UserActions.DELETE_PICTURE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.DELETE_PICTURE_URL, user?.Userid, { foto: imageId }),
                    HttpMethods.DELETE,
                    token,
                    user
                );
            },
            undefined,
            { imageId: imageId }
        );
    }

    public static uploadCoinImage(data: IUploadImage): IAsyncAction {
        const url = generateValidUrl(Config.UPLOAD_COIN_PICTURE_URL);

        return ActionCreator.createAsyncAction(
            UserActions.UPLOAD_COIN_PICTURE,
            [UserActions.UPLOAD_COIN_PICTURE_REQUEST, UserActions.UPLOAD_COIN_PICTURE_RESPONSE, UserActions.UPLOAD_COIN_PICTURE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UPLOAD_COIN_PICTURE_URL, user?.Userid, BerndMapper.mapUploadImage(data)),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }

    public static updateProfilePicture(id: string): IAsyncAction {
        const url = generateValidUrl(Config.SET_AS_PROFILE_PICTURE_URL);

        return ActionCreator.createAsyncAction(
            UserActions.UPDATE_PROFILE_PICTURE,
            [UserActions.UPDATE_PROFILE_PICTURE_REQUEST, UserActions.UPDATE_PROFILE_PICTURE_RESPONSE, UserActions.UPDATE_PROFILE_PICTURE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.SET_AS_PROFILE_PICTURE_URL, user?.Userid, {
                        foto: id,
                        profilpicture: true,
                        coins: 0,
                    }),
                    HttpMethods.PATCH,
                    token,
                    user
                );
            }
        );

    }

    public static purchaseCoinImage(id: string) {
        const url = generateValidUrl(Config.PURCHASE_COIN_IMAGE_URL);
        return ActionCreator.createAsyncAction(
            UserActions.PURCHASE_COIN_IMAGE,
            [UserActions.PURCHASE_COIN_IMAGE_REQUEST, UserActions.PURCHASE_COIN_IMAGE_RESPONSE, UserActions.PURCHASE_COIN_IMAGE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.PURCHASE_COIN_IMAGE_URL, user?.Userid, {
                        foto: id,
                    }),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }

    public static purchaseCoins(productData: { product: string }): IAsyncAction {
        const url = generateValidUrl(Config.PURCHASE_COINS_URL);
        return ActionCreator.createAsyncAction(
            UserActions.PURCHASE_COINS,
            [UserActions.PURCHASE_COINS_REQUEST, UserActions.PURCHASE_COINS_RESPONSE, UserActions.PURCHASE_COINS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.PURCHASE_COINS_URL, user?.Userid, productData), HttpMethods.POST, token, user);
            }
        );
    }

    public static verifyPurchaseIos(receipt: IReceiptIOS): IAsyncAction {
        const url = generateValidUrl(Config.VERIFY_PURCHASE_IOS);

        return ActionCreator.createAsyncAction(
            UserActions.VERIFY_PURCHASE_IOS,
            [UserActions.VERIFY_PURCHASE_IOS_REQUEST, UserActions.VERIFY_PURCHASE_IOS_RESPONSE, UserActions.VERIFY_PURCHASE_IOS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                // return FetchApi.fetch(url, receipt, HttpMethods.POST, token, user);

                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.VERIFY_PURCHASE_IOS, user?.Userid, BerndMapper.mapBerndPaymentIos(receipt)),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }

    public static verifyPurchaseAndroid(receipt: IReceiptAndroid): IAsyncAction {
        const url = generateValidUrl(Config.VERIFY_PURCHASE_ANDROID);

        return ActionCreator.createAsyncAction(
            UserActions.VERIFY_PURCHASE_ANDROID,
            [UserActions.VERIFY_PURCHASE_ANDROID_REQUEST, UserActions.VERIFY_PURCHASE_ANDROID_RESPONSE, UserActions.VERIFY_PURCHASE_ANDROID_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.VERIFY_PURCHASE_ANDROID, user?.Userid, BerndMapper.mapBerndPaymentAndroid(receipt)),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }

    public static addDevice(device: IDevice): IAsyncAction {
        const url = generateValidUrl(Config.CREATE_DEVICE);

        return ActionCreator.createAsyncAction(
            UserActions.ADD_DEVICE,
            [UserActions.ADD_DEVICE_REQUEST, UserActions.ADD_DEVICE_RESPONSE, UserActions.ADD_DEVICE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.CREATE_DEVICE, user?.Userid, BerndMapper.mapDevice(device)),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }

    public static updateDevice(device: IDevice): IAsyncAction {
        const url = generateValidUrl(Config.CREATE_DEVICE);

        return ActionCreator.createAsyncAction(
            UserActions.PATCH_DEVICE,
            [UserActions.PATCH_DEVICE_REQUEST, UserActions.PATCH_DEVICE_RESPONSE, UserActions.PATCH_DEVICE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.CREATE_DEVICE, user?.Userid, BerndMapper.mapDevice(device)),
                    HttpMethods.PUT,
                    token,
                    user
                );
            }
        );
    }

    public static forgotPassword(email: string, newPassword: string): IAsyncAction {
        const url = generateValidUrl(Config.FORGOT_PASSWORD_URL);

        return ActionCreator.createAsyncAction(
            UserActions.FORGOT_PASSWORD,
            [UserActions.FORGOT_PASSWORD_REQUEST, UserActions.FORGOT_PASSWORD_RESPONSE, UserActions.FORGOT_PASSWORD_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.FORGOT_PASSWORD_URL, user?.Userid, { email: email, newpassword: newPassword }),
                    HttpMethods.PUT,
                    token,
                    user
                );
            }
        );
    }
    public static setPassword(newPassword: string,a: string ,b: string ,c: string): IAsyncAction {
        const url = generateValidUrl(Config.FORGOT_PASSWORD_URLL);

        return ActionCreator.createAsyncAction(
            UserActions.FORGOT_PASSWORD,
            [UserActions.FORGOT_PASSWORD_REQUEST, UserActions.FORGOT_PASSWORD_RESPONSE, UserActions.FORGOT_PASSWORD_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.FORGOT_PASSWORD_URLL, user?.Userid, { a: a,b: b,c: c, newpassword: newPassword }),
                    HttpMethods.PUT,
                    token,
                    user
                );
            }
        );
    }

    public static redeemBonuscode(bonusCode: string): IAsyncAction {
        const url = generateValidUrl(Config.REDEEM_BONUS_CODE_URL);

        return ActionCreator.createAsyncAction(
            UserActions.REDEEM_BONUS_CODE,
            [UserActions.REDEEM_BONUS_CODE_REQUEST, UserActions.REDEEM_BONUS_CODE_RESPONSE, UserActions.REDEEM_BONUS_CODE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.REDEEM_BONUS_CODE_URL, user?.Userid, { code: bonusCode }),
                    HttpMethods.POST,
                    token,
                    user
                );
            }
        );
    }
}
export default UserActionCreator;

import { AuthenticationAction, AuthenticationActions } from '../actions/AuthenticationActionCreator';
import { UserAction, UserActions } from '../actions/UserActionCreator';
import { GeoLocation } from '../core/GeolocationProvider';
import partialUpdate from '../core/partialUpdate';
import { IError, isError } from '../models/core/error/IError';
import { IUserAttributesCollection } from '../models/user/attributes/getUserAttributeIcon';
import { IUser } from '../models/user/IUser';
import { IOptInResponse } from '../models/user/OptIn';
import { ChatAction, ChatActions } from '../services/Chat/actions/ChatActionCreator';
import BerndMapper from '../temp/BerndMapper';

export interface IAuthenticationState {
    token: string | undefined;
    tokenExpiresAt: string | undefined;
    tokenIssuedAt: string | undefined;
    user: IUser | undefined;
    error: IError | undefined;
    geolocation: GeoLocation | null;
    userAttributes: IUserAttributesCollection | undefined;
    optInResponse: IOptInResponse | undefined;
}

const AuthenticationDefault: IAuthenticationState = {
    token: undefined,
    tokenExpiresAt: undefined,
    tokenIssuedAt: undefined,
    user: undefined,
    error: undefined,
    geolocation: null,
    userAttributes: undefined,
    optInResponse: undefined,
};

export function AuthenticationReducer(
    state: IAuthenticationState = AuthenticationDefault,
    action: AuthenticationAction | UserAction | ChatAction
): IAuthenticationState {
    switch (action.type) {
        case UserActions.USER_ATTRIBUTES_RESPONSE:
            return {
                ...state,
                userAttributes: action.payload.result,
            };
        case AuthenticationActions.TRANSIENT_LOGIN:{
            if (isError(action.payload)) {
                return state;
            }

            // const {
            //     token,
            //     expiresAt,
            //     issuedAt,
            //     _embedded: { user },
            // } = action.payload.result;

            const [user] = action.payload;
            const token = user.Userid;
            const expiresAt = new Date(9999, 1, 1).toISOString();
            const issuedAt = new Date().toISOString();

            return {
                ...state,
                token: token,
                tokenExpiresAt: expiresAt,
                tokenIssuedAt: issuedAt,
                user: user,
            };
        }

        case AuthenticationActions.APPLE_LOGIN_USER_RESPONSE:
        case AuthenticationActions.FACEBOOK_LOGIN_USER_RESPONSE:
        case AuthenticationActions.REGISTER_USER_RESPONSE:
        case AuthenticationActions.FACEBOOK_REGISTER_USER_RESPONSE:
        case AuthenticationActions.APPLE_REGISTER_USER_RESPONSE:
        case AuthenticationActions.LOGIN_USER_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            // const {
            //     token,
            //     expiresAt,
            //     issuedAt,
            //     _embedded: { user },
            // } = action.payload.result;

            const [user] = action.payload.result;
            const token = user.Userid;
            const expiresAt = new Date(9999, 1, 1).toISOString();
            const issuedAt = new Date().toISOString();

            return {
                ...state,
                token: token,
                tokenExpiresAt: expiresAt,
                tokenIssuedAt: issuedAt,
                user: user,
            };
        }
        case AuthenticationActions.APPLE_LOGIN_USER_FAILURE:
        case AuthenticationActions.FACEBOOK_LOGIN_USER_FAILURE:
        case AuthenticationActions.LOGIN_USER_FAILURE: {
            return {
                ...AuthenticationDefault,
                error: action.payload.result ? action.payload.result[0] : undefined,
            };
        }
        case UserActions.PURCHASE_COINS_RESPONSE:
        case UserActions.UPLOAD_PICTURE_RESPONSE:
        case UserActions.UPDATE_PROFILE_PICTURE_RESPONSE:
        case UserActions.UPLOAD_COIN_PICTURE_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            const Pictures = action.payload.result[0].Pictures;
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        Pictures: Pictures?.map((picture: any) =>
                            BerndMapper.mapBerndImageUploadResponse(picture.Picture, picture.IsProfile, picture.Coins)
                        ),
                    },
                };
            }
            return state;
        }
        case UserActions.GET_PROFILE_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            const [result] = action.payload.result;

            return {
                ...state,
                user: result,
            };
        }
        // case UserActions.PURCHASE_COINS_RESPONSE:
        // case UserActions.UPLOAD_PICTURE_RESPONSE: {
        //     if (isError(action.payload.result)) {
        //         return state;
        //     }

        //     const Pictures = action.payload.result[0].Pictures;

        //     if (state.user) {
        //         return {
        //             ...state,
        //             user: {
        //                 ...state.user,
        //                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //                 Pictures: Pictures?.map((picture: any) =>
        //                     BerndMapper.mapBerndImageUploadResponse(picture.Picture, picture.IsProfile, picture.Coins)
        //                 ),
        //             },
        //         };
        //     }
        //     return state;
        // }
        case UserActions.UPDATE_SEARCH_SETTINGS_RESPONSE:
        case UserActions.UPDATE_PROFILE_RESPONSE:
        case UserActions.VERIFY_PURCHASE_IOS_RESPONSE:
        case UserActions.VERIFY_PURCHASE_ANDROID_RESPONSE: {
            const [fetchedUser] = action.payload.result;

            return { ...state, user: state.user ? partialUpdate(state.user, fetchedUser) : state.user };

            // const { images, pushPreference, preferredMaxAge, preferredMinAge } = fetchedUser;

            // return {
            //     ...state,
            //     user: {
            //         ...fetchedUser,
            //         MaxAge: preferredMaxAge ?? state.user?.MaxAge,
            //         MinAge: preferredMinAge ?? state.user?.MinAge,
            //         Picture:
            //             images.length > 0
            //                 ? images
            //                 : state.user && state.user.Picture.length > 0
            //                 ? state.user.Picture
            //                 : [],
            //         pushPreference: pushPreference ??
            //             state.user?.pushPreference ?? {
            //                 receivesChatMessagePush: false,
            //                 receivesLikePush: false,
            //                 receivesMatchPush: false,
            //                 receivesPresentPush: false,
            //                 receivesProfileViewPush: false,
            //             },
            //     },
            // };
        }
        case AuthenticationActions.DISMISS_AUTHENTICATION: {
            return {
                ...state,
                error: undefined,
            };
        }
        case AuthenticationActions.LOGOUT: {
            return {
                ...AuthenticationDefault,
            };
        }
        case AuthenticationActions.RECEIVE_GEOLOCATION: {
            return {
                ...state,
                geolocation: action.payload,
            };
        }
        case ChatActions.UPDATE_COINS: {
            const { payload } = action.payload;

            return {
                ...state,
                user: state.user
                    ? {
                          ...state.user,
                          Coins: payload?.coins ?? 0,
                          CoinsFree: 0,
                      }
                    : undefined,
            };
        }
        case ChatActions.SEND_MESSAGE_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            const res = action.payload.result[0];

            return {
                ...state,
                user: state.user
                    ? {
                          ...state.user,
                          Coins: res.Coins,
                          CoinsFree: res.CoinsFree,
                      }
                    : undefined,
            };
        }
        case UserActions.DELETE_PICTURE_RESPONSE: {
            const { imageId } = action.payload.params;

            return {
                ...state,
                user: state.user
                    ? {
                          ...state.user,
                          Pictures: state.user.Pictures?.filter((x) => x.Picture !== imageId),
                      }
                    : undefined,
            };
        }
        case AuthenticationActions.OPT_IN_RESPONSE: {
            // if (action.payload.result.state === 'SOI') {
            //     Adjust.trackEvent(new AdjustEvent(Config.ADJUST_EVENT_SOI));
            // } else if (action.payload.result.state === 'DOI') {
            //     Adjust.trackEvent(new AdjustEvent(Config.ADJUST_EVENT_DOI));
            // }
            return {
                ...state,
                optInResponse: action.payload.result,
            };
        }
        default:
            return state;
    }
}

export default AuthenticationReducer;

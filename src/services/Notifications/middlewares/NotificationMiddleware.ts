import { OptionsObject } from 'notistack';
import { Dispatch, MiddlewareAPI } from 'redux';
import { RehydrateAction } from 'redux-persist';

import { AuthenticationAction, AuthenticationActions } from './../../../actions/AuthenticationActionCreator';
import { LikeAction, LikeActions } from './../../../actions/LikesActionCreator';
import UserActionCreator, { UserAction, UserActions } from './../../../actions/UserActionCreator';
import { ChatActions } from './../../Chat/actions/ChatActionCreator';
import { ResourceService } from './../../i18n/ResourcesService';
import { ChatAction } from '../../Chat/actions/ChatActionCreator';
import NotificationActionCreator from '../actions/NotificationActionCreator';

type Actions = AuthenticationAction | RehydrateAction | UserAction | ChatAction | LikeAction;

export function NotificationMiddleware(middlewareAPI: MiddlewareAPI) {
    const { dispatch } = middlewareAPI;
    const enqueueSnackbar = (message: string, options?: OptionsObject) =>
        dispatch(
            NotificationActionCreator.enqueueSnackbar({
                key: String(new Date().getTime() + Math.random()),
                message: message,
                options,
            })
        );

    return (next: Dispatch) => async (action: Actions) => {
        await next(action);

        switch (action.type) {
            case AuthenticationActions.LOGIN_USER_FAILURE: {
                const [error] = action.payload.result ?? [];

                if (error?.Note === 'Error Password') {
                } else {
                    enqueueSnackbar(ResourceService.getCurrentResources().ALERT_LOGIN_FAILURE, { variant: 'error' });
                }
                break;
            }
            case UserActions.UPDATE_SEARCH_SETTINGS_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_SEARCH_SETTINGS, { variant: 'success' });
                break;
            }
            case UserActions.UPDATE_SEARCH_SETTINGS_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_SEARCH_SETTINGS_FAILURE, { variant: 'error' });
                break;
            }
            case UserActions.UPDATE_PROFILE_PICTURE_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_PROFILE_PICTURE, { variant: 'success' });
                break;
            }
            case UserActions.UPDATE_PROFILE_PICTURE_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_PROFILE_PICTURE_FAILURE, { variant: 'error' });
                break;
            }
            case UserActions.UPLOAD_PICTURE_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPLOAD_PICTURE, { variant: 'success' });
                break;
            }
            case UserActions.UPLOAD_PICTURE_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPLOAD_PICTURE_FAILURE, { variant: 'error' });
                break;
            }
            case UserActions.DELETE_PICTURE_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_DELETE_PICTURE, { variant: 'success' });
                break;
            }
            case UserActions.DELETE_PICTURE_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_DELETE_PICTURE_FAILURE, { variant: 'error' });
                break;
            }
            case UserActions.UPDATE_LOCATION_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_LOCATION, { variant: 'success' });
                break;
            }
            case UserActions.UPDATE_LOCATION_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_LOCATION_FAILURE, { variant: 'error' });
                break;
            }
            case UserActions.UPDATE_PROFILE_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_PROFILE, { variant: 'success' });
                break;
            }
            case UserActions.UPDATE_PROFILE_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_UPDATE_PROFILE_FAILURE, { variant: 'error' });
                break;
            }
            case ChatActions.SET_FAVORIT_RESPONSE: {
                const partner = action.payload.params;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_SET_FAVORIT, { name: partner.name }), {
                    variant: 'success',
                });
                break;
            }
            case ChatActions.SET_FAVORIT_FAILURE: {
                const partner = action.payload.params;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_SET_FAVORIT_FAILURE, { name: partner.name }), {
                    variant: 'error',
                });
                break;
            }

            case ChatActions.UNSET_FAVORIT_RESPONSE: {
                const partner = action.payload.params;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_UNSET_FAVORIT, { name: partner.name }), {
                    variant: 'success',
                });
                break;
            }
            case ChatActions.BUY_FAVORIT_PAKET_RESPONSE: {
                const stars = action.payload.params.stars;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().FAVORITE_STARS_RECEIVED, { stars: stars.toString() }), {
                    variant: 'success',
                });
                break;
            }
            // case ChatActions.UNSET_FAVORIT_FAILURE: {
            //     const partner = action.payload.params;
            //     enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_SET_FAVORIT_FAILURE, { name: partner.name }), {
            //         variant: 'info',
            //     });
            //     break;
            // }
            case ChatActions.PREMIUM_DIALOG_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().PREMIUM_SUCCESS, {
                    variant: 'success',
                });
                await dispatch(UserActionCreator.refreshUser());
                break;
            }
            case ChatActions.PREMIUM_DIALOG_FAILURE: {
                enqueueSnackbar(ResourceService.getCurrentResources().UNLOCK_INSUFFICIENT_COINS, {
                    variant: 'error',
                });
                break;
            }
            case LikeActions.BLOCK_USER_RESPONSE: {
                const partner = action.payload.params;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_BLOCK_USER, { name: partner.userName }), {
                    variant: 'success',
                });
                break;
            }

            case UserActions.DELETE_ACCOUNT_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_DELETE_ACCOUNT, { variant: 'success' });
                break;
            }
            case AuthenticationActions.REGISTER_USER_RESPONSE: {
                enqueueSnackbar(ResourceService.getCurrentResources().ALERT_REGISTER, {
                    variant: 'success',
                });
                break;
            }
            case AuthenticationActions.REGISTER_USER_FAILURE: {
                const result = action.payload.result;
                let alertType = ResourceService.getCurrentResources().ALERT_REGISTER_FAILURE;

                if (result && result.length > 0) {
                    const reason = result[0].Note;

                    if (reason === 'EmailInvalid') {
                        alertType = ResourceService.getCurrentResources().ALERT_REGISTER_FAILURE_INVALIDMAIL;
                    } else if (reason === 'UserIpInUse') {
                        alertType = ResourceService.getCurrentResources().ALERT_REGISTER_FAILURE_DOUBLEIP;
                    }
                }

                enqueueSnackbar(alertType, { variant: 'error' });
                break;
            }
            case UserActions.REDEEM_BONUS_CODE_RESPONSE: {
                const result = action.payload.result;
                const coins = result[0].Coins;
                enqueueSnackbar(ResourceService.replace(ResourceService.getCurrentResources().ALERT_REDEEM_BONUS_CODE, { coins: coins.toString() }), {
                    variant: 'success',
                });
                break;
            }

            default:
                break;
        }
    };
}

export default NotificationMiddleware;

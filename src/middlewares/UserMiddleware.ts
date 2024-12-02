import { Dispatch, MiddlewareAPI } from 'redux';

import { LikeAction, LikeActions } from './../actions/LikesActionCreator';
import { UserAction, UserActionCreator, UserActions } from './../actions/UserActionCreator';
import { ChatAction, ChatActions } from './../services/Chat/actions/ChatActionCreator';
import NearbyActionCreator from '../actions/NearbyActionCreator';

type Action = UserAction | LikeAction | ChatAction;

export function UserMiddleware(middlewareAPI: MiddlewareAPI) {
    const { dispatch } = middlewareAPI;
    return (next: Dispatch) => async (action: Action) => {
        switch (action.type) {
            case UserActions.UPDATE_SEARCH_SETTINGS_RESPONSE:
            case UserActions.UPDATE_LOCATION_RESPONSE: {
                await next(action);
                await dispatch(NearbyActionCreator.fetchGameUsers(false));
                return dispatch(UserActionCreator.refreshUser());
            }
            case ChatActions.BUY_FAVORIT_PAKET_RESPONSE:
            case LikeActions.UNLOCK_USER_RESPONSE:
            case UserActions.REDEEM_BONUS_CODE_RESPONSE: {
                await next(action);
                return dispatch(UserActionCreator.refreshUser());
            }

            default:
                return next(action);
        }
    };
}

export default UserMiddleware;

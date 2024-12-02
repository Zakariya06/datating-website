import { IStrangerUserPreview } from './../models/user/IStrangerUser/IStrangerUserPreview';
import Config from '../config';
import getUsersUrl, { IGetUsersUrlParams, getOldUsersUrl } from '../config/getUsersUrl';
import FetchApi from '../core/fetch/FetchApi';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { IPaginatedCollection } from '../models/collections/IPaginatedCollection';
import { ILink } from '../models/core/links/ILink';
import { ActionCreator, IBaseAction, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../models/state';
import { IUser } from '../models/user/IUser';
import { getUserAndToken } from '../selectors/AuthenticationSelectors';
import formatRequestBody from '../temp/formatRequestBody';

export enum NearbyActions {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
    FETCH_USERS_RESPONSE = 'FETCH_USERS_RESPONSE',
    FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',

    LIKE_STRANGER_USER = 'LIKE_STRANGER_USER',

    SEARCH_USERS = 'SEARCH_USERS',
    SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST',
    SEARCH_USERS_RESPONSE = 'SEARCH_USERS_RESPONSE',
    SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE',
}

type ILikeStrangerUserAction = IBaseAction<NearbyActions.LIKE_STRANGER_USER, { userId: string }>;

type IFetchUsersRequest = IRequestDataAction<NearbyActions.FETCH_USERS_REQUEST>;
type IFetchUsersResponse = IReceiveDataAction<NearbyActions.FETCH_USERS_RESPONSE, IStrangerUserPreview[], { isNext: boolean }>;
type IFetchUsersFailure = IRequestDataFailedAction<NearbyActions.FETCH_USERS_FAILURE>;
type FetchUsers = IFetchUsersRequest | IFetchUsersResponse | IFetchUsersFailure;

type ISearchUsersRequest = IRequestDataAction<NearbyActions.SEARCH_USERS_REQUEST>;
type ISearchUsersResponse = IReceiveDataAction<NearbyActions.SEARCH_USERS_RESPONSE, IPaginatedCollection<IUser>, { isNext: boolean }>;
type ISearchUsersFailure = IRequestDataFailedAction<NearbyActions.SEARCH_USERS_FAILURE>;
type SearchUsers = ISearchUsersRequest | ISearchUsersResponse | ISearchUsersFailure;

export type NearbyAction = FetchUsers | SearchUsers | ILikeStrangerUserAction;

export class NearbyActionCreator {
    public static fetchGameUsers(isNext: boolean, count: number = 36, signal?: AbortController | null) {
        return ActionCreator.createAsyncAction(
            NearbyActions.FETCH_USERS,
            [NearbyActions.FETCH_USERS_REQUEST, NearbyActions.FETCH_USERS_RESPONSE, NearbyActions.FETCH_USERS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    Config.BASE_URL,
                    formatRequestBody(Config.GET_USERS_URL, token, {
                        anzahl: count,
                    }),
                    HttpMethods.POST,
                    token,
                    user,
                    undefined,
                    signal
                );
            },
            undefined,
            { isNext: isNext }
        );
    }

    public static likeStrangerUser(userId: string): ILikeStrangerUserAction {
        return ActionCreator.createAction(NearbyActions.LIKE_STRANGER_USER, { userId });
    }

    public static fetchUsers(params: IGetUsersUrlParams, nextLink?: ILink) {
        const url = getUsersUrl(params);

        return ActionCreator.createAsyncAction(
            NearbyActions.FETCH_USERS,
            [NearbyActions.FETCH_USERS_REQUEST, NearbyActions.FETCH_USERS_RESPONSE, NearbyActions.FETCH_USERS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, undefined, HttpMethods.GET, token, user);
            },
            undefined,
            { isNext: Boolean(nextLink) }
        );
    }
    public static searchUsers(params: IGetUsersUrlParams, nextLink?: ILink) {
        const url = getOldUsersUrl(params);

        return ActionCreator.createAsyncAction(
            NearbyActions.SEARCH_USERS,
            [NearbyActions.SEARCH_USERS_REQUEST, NearbyActions.SEARCH_USERS_RESPONSE, NearbyActions.SEARCH_USERS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, undefined, HttpMethods.GET, token, user);
            },
            undefined,
            { isNext: Boolean(nextLink) }
        );
    }
}
export default NearbyActionCreator;

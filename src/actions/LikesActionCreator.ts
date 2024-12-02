import { Config } from '../config/config';
import FetchApi from '../core/fetch/FetchApi';
import generateValidUrl from '../core/fetch/generateValidUrl';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { ILink } from '../models/core/links/ILink';
import { ActionCreator, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../models/state';
import { IBlockedUser } from '../models/user/blocked_user/IBlockedUser';
import { IStrangerUserPreview } from '../models/user/IStrangerUser/IStrangerUserPreview';
import { getUserAndToken } from '../selectors/AuthenticationSelectors';
import formatRequestBody from '../temp/formatRequestBody';

// import { IPaginatedCollection } from '../models/collections/IPaginatedCollection';

type IPaginatedCollection<T> = T[];

export enum LikeActions {
    FETCH_LIKES = 'FETCH_LIKES',
    FETCH_LIKES_REQUEST = 'FETCH_LIKES_REQUEST',
    FETCH_LIKES_RESPONSE = 'FETCH_LIKES_RESPONSE',
    FETCH_LIKES_FAILURE = 'FETCH_LIKES_FAILURE',

    FETCH_VISITORS = 'FETCH_VISITORS',
    FETCH_VISITORS_REQUEST = 'FETCH_VISITORS_REQUEST',
    FETCH_VISITORS_RESPONSE = 'FETCH_VISITORS_RESPONSE',
    FETCH_VISITORS_FAILURE = 'FETCH_VISITORS_FAILURE',

    FETCH_MATCHES = 'FETCH_MATCHES',
    FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST',
    FETCH_MATCHES_RESPONSE = 'FETCH_MATCHES_RESPONSE',
    FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE',

    UNLOCK_USER = 'UNLOCK_USER',
    UNLOCK_USER_REQUEST = 'UNLOCK_USER_REQUEST',
    UNLOCK_USER_RESPONSE = 'UNLOCK_USER_RESPONSE',
    UNLOCK_USER_FAILURE = 'UNLOCK_USER_FAILURE',

    FETCH_BLOCKED_USERS = 'FETCH_BLOCKED_USERS',
    FETCH_BLOCKED_USERS_REQUEST = 'FETCH_BLOCKED_USERS_REQUEST',
    FETCH_BLOCKED_USERS_RESPONSE = 'FETCH_BLOCKED_USERS_RESPONSE',
    FETCH_BLOCKED_USERS_FAILURE = 'FETCH_BLOCKED_USERS_FAILURE',

    BLOCK_USER = 'BLOCK_USER',
    BLOCK_USER_REQUEST = 'BLOCK_USER_REQUEST',
    BLOCK_USER_RESPONSE = 'BLOCK_USER_RESPONSE',
    BLOCK_USER_FAILURE = 'BLOCK_USER_FAILURE',

    UNBLOCK_USER = 'UNBLOCK_USER',
    UNBLOCK_USER_REQUEST = 'UNBLOCK_USER_REQUEST',
    UNBLOCK_USER_RESPONSE = 'UNBLOCK_USER_RESPONSE',
    UNBLOCK_USER_FAILURE = 'UNBLOCK_USER_FAILURE',
}

type IFetchLikesRequest = IRequestDataAction<LikeActions.FETCH_LIKES_REQUEST>;
type IFetchLikesResponse = IReceiveDataAction<
    LikeActions.FETCH_LIKES_RESPONSE,
    { Users: IPaginatedCollection<IStrangerUserPreview>; NewLikes: number },
    { isNext: boolean }
>;
type IFetchLikesFailure = IRequestDataFailedAction<LikeActions.FETCH_LIKES_FAILURE>;
type FetchLikes = IFetchLikesRequest | IFetchLikesResponse | IFetchLikesFailure;

type IFetchVisitorsRequest = IRequestDataAction<LikeActions.FETCH_VISITORS_REQUEST>;
type IFetchVisitorsResponse = IReceiveDataAction<
    LikeActions.FETCH_VISITORS_RESPONSE,
    { Users: IPaginatedCollection<IStrangerUserPreview>; NewVisits: number },
    { isNext: boolean }
>;
type IFetchVisitorsFailure = IRequestDataFailedAction<LikeActions.FETCH_VISITORS_FAILURE>;
type FetchVisitors = IFetchVisitorsRequest | IFetchVisitorsResponse | IFetchVisitorsFailure;

type IFetchMatchesRequest = IRequestDataAction<LikeActions.FETCH_MATCHES_REQUEST>;
type IFetchMatchesResponse = IReceiveDataAction<LikeActions.FETCH_MATCHES_RESPONSE, IPaginatedCollection<IStrangerUserPreview>, { isNext: boolean }>;
type IFetchMatchesFailure = IRequestDataFailedAction<LikeActions.FETCH_MATCHES_FAILURE>;
type FetchMatches = IFetchMatchesRequest | IFetchMatchesResponse | IFetchMatchesFailure;

type IUnlockUserRequest = IRequestDataAction<LikeActions.UNLOCK_USER_REQUEST>;
type IUnlockUserResponse = IReceiveDataAction<LikeActions.UNLOCK_USER_RESPONSE, [IStrangerUserPreview], { amount: number; art: 1 | 2 }>;
type IUnlockUserFailure = IRequestDataFailedAction<LikeActions.UNLOCK_USER_FAILURE>;
type UnlockUser = IUnlockUserRequest | IUnlockUserResponse | IUnlockUserFailure;

type IFetchBlockedUsersRequest = IRequestDataAction<LikeActions.FETCH_BLOCKED_USERS_REQUEST>;
type IFetchBlockedUsersResponse = IReceiveDataAction<
    LikeActions.FETCH_BLOCKED_USERS_RESPONSE,
    IPaginatedCollection<IBlockedUser>,
    { isNext: boolean }
>;
type IFetchBlockedUsersFailure = IRequestDataFailedAction<LikeActions.FETCH_BLOCKED_USERS_FAILURE>;
type FetchBlockedUsers = IFetchBlockedUsersRequest | IFetchBlockedUsersResponse | IFetchBlockedUsersFailure;

type IUnblockUserRequest = IRequestDataAction<LikeActions.UNBLOCK_USER_REQUEST>;
type IUnblockUserResponse = IReceiveDataAction<LikeActions.UNBLOCK_USER_RESPONSE, [], { profilId: string }>;
type IUnblockUserFailure = IRequestDataFailedAction<LikeActions.UNBLOCK_USER_FAILURE>;
type UnblockUser = IUnblockUserRequest | IUnblockUserResponse | IUnblockUserFailure;

type IBlockUserRequest = IRequestDataAction<LikeActions.BLOCK_USER_REQUEST>;
type IBlockUserResponse = IReceiveDataAction<LikeActions.BLOCK_USER_RESPONSE, [], { profilId: string; userName: string; profilePicture?: string }>;
type IBlockUserFailure = IRequestDataFailedAction<LikeActions.BLOCK_USER_FAILURE>;
type BlockUser = IBlockUserRequest | IBlockUserResponse | IBlockUserFailure;

export type LikeAction = FetchLikes | FetchVisitors | FetchMatches | UnlockUser | FetchBlockedUsers | UnblockUser | BlockUser;

export class LikesActionCreator {
    public static fetchLikes(nextLink?: ILink) {
        // const url = Config.GET_RELATIONSHIP_USERS_URL({
        //     page: 1,
        //     count: Config.GRID_FETCH_USERS_COUNT,
        //     relationshipType: 'like',
        //     link: nextLink,
        //     isRelatedUser: true,
        // });

        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.FETCH_LIKES,
            [LikeActions.FETCH_LIKES_REQUEST, LikeActions.FETCH_LIKES_RESPONSE, LikeActions.FETCH_LIKES_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('get_all_likes', user?.Userid, {}), HttpMethods.GET, token, user);
            },
            undefined,
            { isNext: Boolean(nextLink) }
        );
    }

    public static fetchVisitors(nextLink?: ILink) {
        // const url = Config.GET_RELATIONSHIP_USERS_URL({
        //     page: 1,
        //     count: Config.GRID_FETCH_USERS_COUNT,
        //     relationshipType: 'profileVisit',
        //     link: nextLink,
        // });

        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.FETCH_VISITORS,
            [LikeActions.FETCH_VISITORS_REQUEST, LikeActions.FETCH_VISITORS_RESPONSE, LikeActions.FETCH_VISITORS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('get_visits', user?.Userid, {}), HttpMethods.GET, token, user);
            },
            undefined,
            { isNext: Boolean(nextLink) }
        );
    }

    public static fetchMatches(nextLink?: ILink) {
        // const url = Config.GET_RELATIONSHIP_USERS_URL({
        //     page: 1,
        //     count: Config.GRID_FETCH_USERS_COUNT,
        //     relationshipType: 'match',
        //     link: nextLink,
        // });

        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.FETCH_MATCHES,
            [LikeActions.FETCH_MATCHES_REQUEST, LikeActions.FETCH_MATCHES_RESPONSE, LikeActions.FETCH_MATCHES_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('get_all_matches', user?.Userid, {}), HttpMethods.GET, token, user);
            },
            undefined,
            { isNext: Boolean(nextLink) }
        );
    }

    // 1 = likes, 2 = visitors
    public static unlockUser(art: 1 | 2, profileId: string, amount: number) {
        const url = generateValidUrl(Config.UNLOCK_USER_URL);

        return ActionCreator.createAsyncAction(
            LikeActions.UNLOCK_USER,
            [LikeActions.UNLOCK_USER_REQUEST, LikeActions.UNLOCK_USER_RESPONSE, LikeActions.UNLOCK_USER_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);

                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UNLOCK_USER_URL, user?.Userid, {
                        profilid: profileId,
                        art: art,
                    }),
                    HttpMethods.POST,
                    token,
                    user
                );
            },
            undefined,
            { amount: amount, art: art }
        );
    }

    public static fetchBlockedUsers() {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.FETCH_BLOCKED_USERS,
            [LikeActions.FETCH_BLOCKED_USERS_REQUEST, LikeActions.FETCH_BLOCKED_USERS_RESPONSE, LikeActions.FETCH_BLOCKED_USERS_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('get_blockeduser', user?.Userid, {}), HttpMethods.GET, token, user);
            }
        );
    }

    public static blockUser(profilId: string, userName: string, profilePicture?: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.BLOCK_USER,
            [LikeActions.BLOCK_USER_REQUEST, LikeActions.BLOCK_USER_RESPONSE, LikeActions.BLOCK_USER_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('set_blockeduser', user?.Userid, { profilid: profilId }), HttpMethods.GET, token, user);
            },
            undefined,
            { profilId: profilId, userName: userName, profilePicture: profilePicture }
        );
    }

    public static unblockUser(profilId: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            LikeActions.UNBLOCK_USER,
            [LikeActions.UNBLOCK_USER_REQUEST, LikeActions.UNBLOCK_USER_RESPONSE, LikeActions.UNBLOCK_USER_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody('unset_blockeduser', user?.Userid, { profilid: profilId }),
                    HttpMethods.GET,
                    token,
                    user
                );
            },
            undefined,
            { profilId: profilId }
        );
    }
}

export default LikesActionCreator;

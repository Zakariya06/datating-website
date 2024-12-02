import FetchApi from '../../../../core/fetch/FetchApi';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import { HttpMethods } from '../../../../core/fetch/HttpMethod';
import { IFeed } from '../../../../models/news/IFeed';
import { ActionCreator, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../../../../models/state';
import { getUserAndToken } from '../../../../selectors/AuthenticationSelectors';
import formatRequestBody from '../../../../temp/formatRequestBody';

export enum NewsFeedActions {
    GET_NEWS_FEED = 'GET_NEWS_FEED',
    GET_NEWS_FEED_REQUEST = 'GET_NEWS_FEED_REQUEST',
    GET_NEWS_FEED_RESPONSE = 'GET_NEWS_FEED_RESPONSE',
    GET_NEWS_FEED_FAILURE = 'GET_NEWS_FEED_FAILURE',

    READ_NEWS_FEED = 'READ_NEWS_FEED',
    READ_NEWS_FEED_REQUEST = 'READ_NEWS_FEED_REQUEST',
    READ_NEWS_FEED_RESPONSE = 'READ_NEWS_FEED_RESPONSE',
    READ_NEWS_FEED_FAILURE = 'READ_NEWS_FEED_FAILURE',
}

type IGetNewsFeedRequest = IRequestDataAction<NewsFeedActions.GET_NEWS_FEED_REQUEST>;
type IGetNewsFeedResponse = IReceiveDataAction<NewsFeedActions.GET_NEWS_FEED_RESPONSE, IFeed[]>;
type IGetNewsFeedFailure = IRequestDataFailedAction<NewsFeedActions.GET_NEWS_FEED_FAILURE>;
type GetNewsFeed = IGetNewsFeedRequest | IGetNewsFeedResponse | IGetNewsFeedFailure;

type IReadNewsFeedRequest = IRequestDataAction<NewsFeedActions.READ_NEWS_FEED_REQUEST>;
type IReadNewsFeedResponse = IReceiveDataAction<NewsFeedActions.READ_NEWS_FEED_RESPONSE, IFeed[], IFeed>;
type IReadNewsFeedFailure = IRequestDataFailedAction<NewsFeedActions.READ_NEWS_FEED_FAILURE>;
type ReadNewsFeed = IReadNewsFeedRequest | IReadNewsFeedResponse | IReadNewsFeedFailure;

export type NewsFeedAction = GetNewsFeed | ReadNewsFeed;

export class NewsFeedActionCreator {
    public static getNewsFeed() {
        const url = generateValidUrl(undefined);
        
        return ActionCreator.createAsyncAction(
            NewsFeedActions.GET_NEWS_FEED,
            [NewsFeedActions.GET_NEWS_FEED_REQUEST, NewsFeedActions.GET_NEWS_FEED_RESPONSE, NewsFeedActions.GET_NEWS_FEED_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('get_push', user?.Userid, { value: 50 }), HttpMethods.GET, token, user);
            }
        );
    }

    public static readNewsFeed(feed: IFeed) {
        const url = generateValidUrl(undefined);
        
        return ActionCreator.createAsyncAction(
            NewsFeedActions.READ_NEWS_FEED,
            [NewsFeedActions.READ_NEWS_FEED_REQUEST, NewsFeedActions.READ_NEWS_FEED_RESPONSE, NewsFeedActions.READ_NEWS_FEED_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody('set_push', user?.Userid, { value: feed.PushId }), HttpMethods.GET, token, user);
            },
            undefined,
            feed
        );
    }
}

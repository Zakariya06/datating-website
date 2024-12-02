import { IFeed } from './../../../../models/news/IFeed';
import { isError } from '../../../../models/core/error/IError';
import { NewsFeedAction, NewsFeedActions } from '../actions/NewsFeedActionCreator';

export interface INewsFeedState {
    feed: IFeed[];
}

const NewsFeedDefault: INewsFeedState = {
    feed: [],
};

export function NewsFeedReducer(state: INewsFeedState = NewsFeedDefault, action: NewsFeedAction): INewsFeedState {
    switch (action.type) {
        case NewsFeedActions.GET_NEWS_FEED_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }
            return { ...state, feed: action.payload.result };
        }
        case NewsFeedActions.READ_NEWS_FEED_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            return { ...state, feed: state.feed.filter((x) => x.PushId !== action.payload.params.PushId) };
        }
        default:
            return state;
    }
}

export default NewsFeedReducer;

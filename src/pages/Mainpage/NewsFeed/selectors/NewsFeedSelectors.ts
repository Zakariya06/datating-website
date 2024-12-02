import { IFeed } from './../../../../models/news/IFeed';
import { IState } from './../../../../models/state/IState';

export const getNewsFeedState = (state: IState) => state.newsfeed;

export const getNewsFeed = (state: IState): IFeed[] => getNewsFeedState(state).feed;

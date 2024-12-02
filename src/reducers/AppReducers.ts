import { ReducersMapObject } from 'redux';

import { IState } from '../models/state';
import NewsFeedReducer from '../pages/Mainpage/NewsFeed/reducer/NewsFeedReducer';
import ChatReducer from '../services/Chat/reducers/ChatReducer';
import { NotificationReducer } from '../services/Notifications/reducer/NotificationReducer';
import AuthenticationReducer from './AuthenticationReducer';
import LikesReducer from './LikesReducer';
import NearbyReducer from './NearbyReducer';
import ShopReducer from './ShopReducer';

export const AppReducers: ReducersMapObject<IState> = {
    authentication: AuthenticationReducer,
    shop: ShopReducer,
    chat: ChatReducer,
    likes: LikesReducer,
    nearby: NearbyReducer,
    newsfeed: NewsFeedReducer,
    notifications: NotificationReducer,
};

export default AppReducers;

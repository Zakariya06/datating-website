import { INewsFeedState } from './../../pages/Mainpage/NewsFeed/reducer/NewsFeedReducer';
import { IAuthenticationState } from '../../reducers/AuthenticationReducer';
import { ILikesState } from '../../reducers/LikesReducer';
import { INearbyState } from '../../reducers/NearbyReducer';
import { IShopState } from '../../reducers/ShopReducer';
import { IChatState } from '../../services/Chat/reducers/ChatReducer';
import { INotificationState } from '../../services/Notifications/reducer/NotificationReducer';

export interface IState {
    authentication: IAuthenticationState;
    shop: IShopState;
    chat: IChatState;
    likes: ILikesState;
    nearby: INearbyState;
    newsfeed: INewsFeedState;
    notifications: INotificationState;
}

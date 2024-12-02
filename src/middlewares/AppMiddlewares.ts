import NotificationMiddleware from '../services/Notifications/middlewares/NotificationMiddleware';
import AuthenticationMiddleware from './AuthenticationMiddleware';
import callApiMiddleware from './callApiMiddleware';
import UserMiddleware from './UserMiddleware';

export const AppMiddlewares = [callApiMiddleware, AuthenticationMiddleware, UserMiddleware, NotificationMiddleware];

export default AppMiddlewares;

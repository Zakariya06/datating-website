import { NotificationAction, NotificationActions } from '../actions/NotificationActionCreator';
import { INotification } from '../models/INotification';

export interface INotificationState {
    notifications: INotification[];
}

const NotificationDefault: INotificationState = {
    notifications: [],
};

export function NotificationReducer(
    state: INotificationState = NotificationDefault,
    action: NotificationAction
): INotificationState {
    switch (action.type) {
        case NotificationActions.ENQUEUE_SNACKBAR: {
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        }
        case NotificationActions.CLOSE_SNACKBAR: {
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    action.payload.dismissAll || notification.key === action.payload.key
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                ),
            };
        }
        case NotificationActions.REMOVE_SNACKBAR: {
            return {
                ...state,
                notifications: state.notifications.filter((notification) => notification.key !== action.payload),
            };
        }
        default:
            return state;
    }
}

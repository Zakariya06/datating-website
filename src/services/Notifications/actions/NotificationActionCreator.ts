import { ActionCreator, IBaseAction } from '../../../models/state';
import { INotification } from './../models/INotification';

export enum NotificationActions {
    ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR',
    CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
    REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
}

type IEnqueueSnackbarAction = IBaseAction<NotificationActions.ENQUEUE_SNACKBAR, INotification>;
type ICloseSnackbarAction = IBaseAction<NotificationActions.CLOSE_SNACKBAR, { key: string | undefined; dismissAll: boolean }>;
type IRemoveSnackbarAction = IBaseAction<NotificationActions.REMOVE_SNACKBAR, string>;

export type NotificationAction = IEnqueueSnackbarAction | ICloseSnackbarAction | IRemoveSnackbarAction;

export class NotificationActionCreator {
    public static enqueueSnackbar(notification: INotification): IEnqueueSnackbarAction {
        return ActionCreator.createAction(NotificationActions.ENQUEUE_SNACKBAR, notification);
    }

    public static closeSnackbar(key?: string): ICloseSnackbarAction {
        return ActionCreator.createAction(NotificationActions.CLOSE_SNACKBAR, { key: key, dismissAll: !key });
    }

    public static removeSnackbar(key: string): IRemoveSnackbarAction {
        return ActionCreator.createAction(NotificationActions.REMOVE_SNACKBAR, key);
    }
}

export default NotificationActionCreator;

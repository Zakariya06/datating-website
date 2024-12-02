import { IState } from './../../../models/state/IState';

export const getNotifications = (state: IState) => state.notifications.notifications;

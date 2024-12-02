import { Dispatch } from 'redux';
import ChatActionCreator from '../actions/ChatActionCreator';
import { IWebsocketListener } from '../models/IWebsocketListener';
import { ChatListenerEvents } from './ChatListenerEvents';
import { IChatRefreshData } from './IChatRefreshData';
import { ICoinsData } from './ICoinsData';
import { IDialogReadData } from './IDialogReadData';
import { IErrorData } from './IErrorData';
import { INewMessageData } from './INewMessageData';

export const ChatListeners: (dispatch: Dispatch) => IWebsocketListener[] = (dispatch: Dispatch) => {
  return [
    {
      method: ChatListenerEvents.REFRESH,
      handler: (url: string, data: IChatRefreshData) => {
        dispatch(ChatActionCreator.dialogRefresh(data));
      },
    },
    {
      method: ChatListenerEvents.NEW_MESSAGE,
      handler: (url: string, data: INewMessageData) => {
        dispatch(ChatActionCreator.newMessage(data));
      },
    },
    {
      method: ChatListenerEvents.COINS,
      handler: (url: string, data: ICoinsData) => {
        dispatch(ChatActionCreator.updateCoins(data));
      },
    },
    {
      method: ChatListenerEvents.DIALOG_READ,
      handler: (url: string, data: IDialogReadData) => {
        dispatch(ChatActionCreator.dialogRead(data));
      },
    },
    {
      method: ChatListenerEvents.ERROR,
      handler: (url: string, data: IErrorData) => {
        // TODO:
      },
    },
  ];
};

import { IWebSocketMessage } from '../models/IWebSocketMessage';
import { ChatListenerEvents } from './ChatListenerEvents';

export interface IDialogReadDataPayload {
  timestamp: number;
  readBy: string;
}

export type IDialogReadData = IWebSocketMessage<ChatListenerEvents.DIALOG_READ, IDialogReadDataPayload>;

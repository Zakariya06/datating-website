import { IWebSocketMessage } from '../models/IWebSocketMessage';
import { ChatListenerEvents } from './ChatListenerEvents';

export interface ICoinsDataPayload {
  coins: number;
}

export type ICoinsData = IWebSocketMessage<ChatListenerEvents.COINS, ICoinsDataPayload>;

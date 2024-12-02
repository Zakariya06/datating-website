import { IChatMessage } from '../../../models/chat/IChatMessage';
import { IWebSocketMessage } from '../models/IWebSocketMessage';
import { ChatListenerEvents } from './ChatListenerEvents';

export type INewMessageData = IWebSocketMessage<ChatListenerEvents.NEW_MESSAGE, IChatMessage>;

import { IChatMessages } from '../../../models/chat/IChatMessages';
import { IChats } from '../../../models/chat/IChats';
import { IWebSocketMessage } from '../models/IWebSocketMessage';
import { ChatListenerEvents } from './ChatListenerEvents';

export type ChatRefreshDataPayload = IChatMessages | IChats;

export type IChatRefreshData = IWebSocketMessage<ChatListenerEvents.REFRESH, ChatRefreshDataPayload>;

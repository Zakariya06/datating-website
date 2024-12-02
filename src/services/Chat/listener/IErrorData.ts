import { IError } from '../../../models/core/error/IError';
import { IWebSocketMessage } from '../models/IWebSocketMessage';
import { ChatListenerEvents } from './ChatListenerEvents';

export type IErrorData = IWebSocketMessage<ChatListenerEvents.ERROR, IError>;

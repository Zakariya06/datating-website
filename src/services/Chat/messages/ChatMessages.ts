import { Logger } from '../../../core/Logger';
import { ChatMessageType, ChatMessageTypes } from '../../../models/chat/ChatMessageType';
import { IWebSocketMessage } from '../models/IWebSocketMessage';

export class ChatMessages {
    public static handShake(token: string): IWebSocketMessage {
        return {
            event: 'handshake',
            dialog: null,
            payload: {
                token: token,
            },
        };
    }

    public static refresh(dialog?: string): IWebSocketMessage {
        return {
            event: 'refresh',
            dialog: dialog ?? null,
            payload: {},
        };
    }

    public static sendMessage(dialog: string, message: string | null, type: ChatMessageType = ChatMessageTypes.MESSAGE): IWebSocketMessage {
        return {
            event: 'new-message',
            dialog: dialog,
            payload: {
                message: message,
                type: type,
            },
        };
    }

    public static dialogRead(dialog: string): IWebSocketMessage {
        return {
            event: 'dialog-read',
            dialog: dialog,
            payload: {},
        };
    }

    public static ping() {
        Logger.log('ping');
        return {
            event: 'ping',
        };
    }
}

export default ChatMessages;

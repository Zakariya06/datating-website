import { Logger } from '../../core/Logger';
import ChatSocket from './ChatSocket';
import { IWebsocketListener } from './models/IWebsocketListener';
import { IWebSocketMessage } from './models/IWebSocketMessage';
import { ReadyStates } from './models/ReadyState';

export class ChatService {
    private static _instance: ChatService | undefined = undefined;
    private _socket: ChatSocket;

    public static getInstance() {
        if (!this._instance) {
            Logger.warn('ChatService not instantiated!');
        }
        return this._instance;
    }

    public static destroyInstance() {
        if (this.getInstance()?.socket.state !== ReadyStates.CLOSED) {
            this.getInstance()?.socket.stop(true);
        }
        this._instance = undefined;
    }

    public static createInstance(url: string, listeners: IWebsocketListener[]) {
        this._instance = new ChatService(url, listeners);
    }

    public static start(
        onConnected?: (url: string) => void,
        onClosed?: (url: string) => void,
        onReconnect?: (url: string) => void,
        onError?: (url: string) => void
    ) {
        try {
            this.getInstance()?.socket.start(onConnected, onClosed, onReconnect, onError);
        } catch (e) {
            ChatService.start(onConnected, onClosed, onReconnect, onError);
        }
    }

    public static send(message: IWebSocketMessage) {
        try {
            this.getInstance()?.socket.send(message);
        } catch (e) {
            // TODO:
        }
    }

    public static stop(force?: boolean) {
        this.getInstance()?.socket.stop(force);
    }

    private constructor(url: string, listeners: IWebsocketListener[]) {
        this._socket = new ChatSocket(url, listeners);
    }

    public get socket() {
        return this._socket;
    }
}

export default ChatService;

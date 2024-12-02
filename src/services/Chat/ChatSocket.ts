import { ReadyState, ReadyStates } from './models/ReadyState';

import Config from '../../config';
import { IDictionary } from '../../models/core/IDictionary';
import { IWebSocketMessage } from './models/IWebSocketMessage';
import { IWebsocketListener } from './models/IWebsocketListener';
import Logger from '../../core/Logger';
import isNullOrUndefined from '../../core/typeguards/isNullOrUndefined';

export class ChatSocket {
    private _url: string;
    private _connection: WebSocket;
    private _state: ReadyState;
    private _listeners: IDictionary<IWebsocketListener> = {};
    private _isForced: boolean = false;
    private _connectionTimeout: NodeJS.Timeout;

    constructor(url: string, listeners: IWebsocketListener[]) {
        this._url = url;
        this._state = ReadyStates.CLOSED;

        for (const listener of listeners) {
            this._listeners[listener.method] = listener;
        }
    }

    public start(
        onConnected?: (url: string) => void,
        onClosed?: (url: string) => void,
        onReconnect?: (url: string) => void,
        onError?: (url: string) => void
    ) {
        this._isForced = false;
        this._state = ReadyStates.CONNECTING;
        Logger.log('is starting');
        try {
            this.connection = new WebSocket(this._url);

            this.connection.onopen = () => {
                this._state = this.connection.readyState as ReadyState;

                if (this.connection.readyState === ReadyStates.OPEN && onConnected) {
                    try {
                        onConnected(this._url);
                    } catch (e) {
                        // Logger.log('CHAT WARNING', e.message);
                    }
                }
            };

            this.connection.onerror = (event: Event) => {
                Logger.log('error', event);

                if (onError) {
                    onError(this._url);
                }

                if (this._connectionTimeout) {
                    clearTimeout(this._connectionTimeout);
                }
                // try to reconnect
                this._connectionTimeout = setTimeout(() => {
                    if (onReconnect) {
                        onReconnect(this._url);
                    }
                    this.start(onConnected, onClosed, onReconnect);
                }, Config.WS_RECONNECT_INTERVAL);
            };

            this.connection.onclose = (event: CloseEvent) => {
                Logger.log('close', event);

                if (this._isForced) {
                    if (onClosed) {
                        onClosed(this._url);
                    }

                    return;
                } else {
                    if (this._connectionTimeout) {
                        clearTimeout(this._connectionTimeout);
                    }

                    this._connectionTimeout = setTimeout(() => {
                        if (onReconnect) {
                            onReconnect(this._url);
                        }
                        try {
                            this.start(onConnected, onClosed, onReconnect);
                        } catch (e) {}
                    }, Config.WS_RECONNECT_INTERVAL);
                }
            };

            this.connection.onmessage = (event: MessageEvent) => {
                // check if the event data is existant
                if (event.data) {
                    const message = JSON.parse(event.data) as IWebSocketMessage;
                    if (message.event in this._listeners) {
                        this._listeners[message.event].handler(this._url, message);
                    }
                }
            };
        } catch (e) {
            if (this._connectionTimeout) {
                clearTimeout(this._connectionTimeout);
            }

            this._connectionTimeout = setTimeout(() => {
                if (onReconnect) {
                    onReconnect(this._url);
                }
                this.start(onConnected, onClosed, onReconnect);
            }, Config.WS_RECONNECT_INTERVAL);
        }
    }

    public stop(force?: boolean) {
        this._state = ReadyStates.CLOSING;

        if (!isNullOrUndefined(force)) {
            this._isForced = force;
        }

        this._state = ReadyStates.CLOSED;
    }

    public send(message: IWebSocketMessage) {
        if (this.connection.readyState !== ReadyStates.OPEN) {
            // TODO:
            // throw new Error('connection not ready!');
        }

        const payload = JSON.stringify(message);

        // send message!
        this.connection.send(payload);
    }

    public get state(): ReadyState {
        return this._state;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private get connection() {
        return this._connection;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private set connection(value: WebSocket) {
        this._connection = value;
    }
}

export default ChatSocket;

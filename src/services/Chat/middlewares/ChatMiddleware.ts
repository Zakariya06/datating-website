// import { AppState, AppStateStatus } from 'core/models/IViewComponentProps/node_modules/react-native';

import { Dispatch, MiddlewareAPI } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';

import { AuthenticationAction, AuthenticationActions } from '../../../actions/AuthenticationActionCreator';
import Config from '../../../config';
import Logger from '../../../core/Logger';
import { getToken } from '../../../selectors/AuthenticationSelectors';
import { ResourceService } from '../../i18n/ResourcesService';
import { ChatAction, ChatActions } from '../actions/ChatActionCreator';
import ChatService from '../ChatService';
import { ChatListeners } from '../listener/ChatListeners';
import ChatMessages from '../messages/ChatMessages';
import { IWebsocketListener } from '../models/IWebsocketListener';

export function ChatMiddleware(middlewareAPI: MiddlewareAPI) {
    const { dispatch, getState } = middlewareAPI;
    const wsListener: IWebsocketListener[] = ChatListeners(dispatch);

    let pingInterval: number;

    // let appState = AppState.currentState;

    // const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    //     Logger.log(nextAppState);

    //     if (/inactive|background/.exec(appState) && nextAppState === 'active') {
    //         const token = getToken(getState());

    //         if (token) {
    //             ChatService.createInstance(Config.CHAT_WS_URL, wsListener);
    //             appState = nextAppState;
    //             // send the initial handshake
    //             return ChatService.start(
    //                 () => {
    //                     ChatService.send(ChatMessages.handShake(token));
    //                     if (pingInterval) {
    //                         window.clearInterval(pingInterval);
    //                     }
    //                     pingInterval = window.setInterval(() => ChatService.send(ChatMessages.ping()), Config.PING_INTERVAL);
    //                 },
    //                 () => window.clearInterval(pingInterval),
    //                 () => Logger.log(ResourceService.getCurrentResources().DIALOG_WS_CONNECTION_LOST_TEXT),
    //                 () => window.clearInterval(pingInterval)
    //             );
    //         }
    //     }

    //     if (appState === 'active' && /inactive|background/.exec(nextAppState)) {
    //         // app has been triggered to background
    //         try {
    //             window.clearInterval(pingInterval);
    //             ChatService.destroyInstance();
    //         } catch (e) {
    //             // instance already dead
    //         }
    //     }

    //     appState = nextAppState;
    // };

    // AppState.addEventListener('change', _handleAppStateChange);

    return (next: Dispatch) => async (action: AuthenticationAction | ChatAction | RehydrateAction) => {
        // TODO: create websocket after rehydration

        switch (action.type) {
            case REHYDRATE: {
                await next(action);
                const token = getToken(getState());

                if (token) {
                    Logger.log('starting ws');
                    ChatService.createInstance(Config.CHAT_WS_URL, wsListener);
                    // send the initial handshake
                    return ChatService.start(
                        () => {
                            ChatService.send(ChatMessages.handShake(token));
                            if (pingInterval) {
                                window.clearInterval(pingInterval);
                            }
                            pingInterval = window.setInterval(() => ChatService.send(ChatMessages.ping()), Config.PING_INTERVAL);
                        },
                        () => window.clearInterval(pingInterval),
                        () => Logger.log(ResourceService.getCurrentResources().DIALOG_WS_CONNECTION_LOST_TEXT),
                        () => window.clearInterval(pingInterval)
                    );
                }

                break;
            }
            case AuthenticationActions.FACEBOOK_REGISTER_USER_RESPONSE:
            case AuthenticationActions.REGISTER_USER_RESPONSE:
            case AuthenticationActions.APPLE_REGISTER_USER_RESPONSE:
            case AuthenticationActions.APPLE_LOGIN_USER_RESPONSE:
            case AuthenticationActions.FACEBOOK_LOGIN_USER_RESPONSE:
            case AuthenticationActions.LOGIN_USER_RESPONSE: {
                // const { token } = action.payload.result;
                const token = '';
                await next(action);

                Logger.log('starting ws');
                // creating user
                ChatService.createInstance(Config.CHAT_WS_URL, wsListener);
                // send the initial handshake
                return ChatService.start(
                    // give them some time
                    () => {
                        ChatService.send(ChatMessages.handShake(token));
                        if (pingInterval) {
                            window.clearInterval(pingInterval);
                        }
                        pingInterval = window.setInterval(() => ChatService.send(ChatMessages.ping()), Config.PING_INTERVAL);
                    },
                    () => window.clearInterval(pingInterval),
                    () => Logger.log(ResourceService.getCurrentResources().DIALOG_WS_CONNECTION_LOST_TEXT),
                    () => window.clearInterval(pingInterval)
                );
            }
            case AuthenticationActions.LOGOUT: {
                try {
                    window.clearInterval(pingInterval);
                    await ChatService.destroyInstance();
                } catch (e) {
                    // instance already dead
                }
                return next(action);
            }
            // handle messages
            case ChatActions.SEND_MESSAGE: {
                const { dialog, message, type } = action.payload;
                await next(action);
                ChatService.send(ChatMessages.sendMessage(dialog, message, type));
                break;
            }
            case ChatActions.READ_DIALOG: {
                const { dialog } = action.payload;
                await next(action);
                ChatService.send(ChatMessages.dialogRead(dialog));
                break;
            }
            case ChatActions.REFRESH_DIALOG: {
                const { dialog } = action.payload;
                ChatService.send(ChatMessages.refresh(dialog));
                break;
            }
            // case ChatActions.CREATE_DIALOG_RESPONSE: {
            //   // const { uuid } = action.payload.result;
            //   // await ChatService.send(ChatMessages.refresh());
            //   // await ChatService.send(ChatMessages.refresh(uuid));
            //   return next(action);
            // }
            default:
                return next(action);
        }
    };
}

export default ChatMiddleware;

// TODO: When the connection gets closed, but there yet some pending messages, we have to retry sending it!

// function handleChatReconnect() {}

import { AuthenticationAction, AuthenticationActions } from '../../../actions/AuthenticationActionCreator';
import isNumber from '../../../core/typeguards/isNumber';
import { isChatMessagesObject } from '../../../models/chat/IChatMessages';
import { isChatsObject } from '../../../models/chat/IChats';
import { IDialog } from '../../../models/chat/IDialog';
import { DateType } from '../../../models/core/date/DateType';
import { isError } from '../../../models/core/error/IError';
import { IDictionary } from '../../../models/core/IDictionary';
import { getProfileImage } from '../../../models/user/IUser';
import { BerndMapper } from '../../../temp/BerndMapper';
import { ChatAction, ChatActions } from '../actions/ChatActionCreator';

export interface IPendingMessage {
    message: string;
    timestamp: number;
    datetime: DateType;
}

export interface IChatState {
    dialogs: IDialog[];
    stars: number;
    pendingMessages: IDictionary<IPendingMessage[]>;
    restoreChat: string;
}

const ChatDefault: IChatState = {
    dialogs: [],
    stars: 0,
    pendingMessages: {},
    restoreChat: '',
};

export function ChatReducer(state: IChatState = ChatDefault, action: ChatAction | AuthenticationAction): IChatState {
    switch (action.type) {
        case ChatActions.DIALOG_REFRESH: {
            const { payload, dialog } = action.payload;

            if (isChatMessagesObject(payload) && dialog) {
                return {
                    ...state,
                    dialogs: state.dialogs.map((d) =>
                        d.uuid === dialog
                            ? {
                                  ...d,
                                  chatMessages: payload.messages,
                                  lastMessage: payload.messages[payload.messages.length - 1],
                              }
                            : d
                    ),
                };
            }
            if (isChatsObject(payload)) {
                const dialogDic: IDictionary<IDialog> = {};

                for (const prevDialog of state.dialogs) {
                    dialogDic[prevDialog.uuid] = prevDialog;
                }

                return {
                    ...state,
                    dialogs: payload.dialogs.map<IDialog>((x) =>
                        x.uuid in dialogDic && (!x.chatMessages || x.chatMessages.length === 0)
                            ? { ...x, chatMessages: dialogDic[x.uuid].chatMessages }
                            : x
                    ),
                };
            }
            return state;
        }
        case ChatActions.NEW_MESSAGE: {
            const { payload, dialog } = action.payload;

            let newState = dialog ? { ...state, pendingMessages: { ...state.pendingMessages } } : state;

            if (!payload) {
                return newState;
            }

            if (dialog && state.pendingMessages && state.pendingMessages[dialog]) {
                state.pendingMessages[dialog] = state.pendingMessages[dialog].filter((x) => x.message !== payload.message);
                newState = dialog ? { ...state, pendingMessages: { ...state.pendingMessages } } : state;
            }

            return {
                ...newState,
                dialogs: newState.dialogs.map((d) =>
                    d.uuid === dialog
                        ? {
                              ...d,
                              chatMessages: (d.chatMessages || []).concat(payload),
                              lastMessage: payload,
                              partner: {
                                  ...d.partner,
                                  unread: payload.sender === d.partner.username && !payload.isSeen ? (d.partner.unread || 0) + 1 : d.partner.unread,
                              },
                          }
                        : d
                ),
            };
        }
        case ChatActions.UPDATE_COINS: {
            return state;
        }
        case ChatActions.SEND_MESSAGE: {
            const { dialog, message } = action.payload;

            if (!message) {
                return state;
            }

            return {
                ...state,
                pendingMessages: {
                    ...state.pendingMessages,
                    [dialog]: [
                        ...(state.pendingMessages[dialog] || []),
                        {
                            message,
                            timestamp: new Date(Date.now()).getTime() / 1000,
                            datetime: new Date().toISOString(),
                        },
                    ],
                },
            };
        }
        case ChatActions.READ_DIALOG:
        case ChatActions.DIALOG_READ: {
            const { dialog } = action.payload;
            return {
                ...state,
                dialogs: state.dialogs.map((d) =>
                    d.uuid === dialog
                        ? {
                              ...d,
                              chatMessages: (d.chatMessages || []).map((x) => (x.isSeen ? x : { ...x, isSeen: true })),
                              partner: { ...d.partner, unread: 0 },
                          }
                        : d
                ),
            };
        }
        case ChatActions.GET_FAVORIT_NUMBER_RESPONSE: {
            const [res] = action.payload.result;
            return {
                ...state,
                stars: res.Favoritleft,
            };
        }
        // case ChatActions.CREATE_DIALOG_RESPONSE: {
        //     const { uuid, automatedUser } = action.payload.result;

        //     // check if the created dialog is already existant!
        //     if (state.dialogs.find((x) => x.uuid === uuid)) {
        //         return state;
        //     }

        //     const dialog: IDialog = {
        //         uuid: uuid,
        //         partner: {
        //             id: automatedUser.id,
        //             name: automatedUser.Username,
        //             photo: automatedUser.Pictures.find((x) => x.isProfileImage === true)?.path || '',
        //             username: automatedUser.Userid,
        //             isOnline: false,
        //             unread: 0,
        //         },
        //         chatMessages: [],
        //     };

        //     return {
        //         ...state,
        //         dialogs: [...state.dialogs, dialog],
        //     };
        // }
        case ChatActions.DELETE_DIALOG_RESPONSE: {
            const { uuid } = action.payload.params;
            return {
                ...state,
                dialogs: state.dialogs.filter((x) => x.uuid !== uuid),
                pendingMessages: {
                    ...state.pendingMessages,
                    [uuid]: [],
                },
            };
        }
        case ChatActions.RESTORE_DIALOG_FAILURE: {
            const { uuid } = action.payload.params;
            return {
                ...state,
                restoreChat: 'Error',
            };
        }
        case ChatActions.RESTORE_DIALOG_RESET: {
            return {
                ...state,
                restoreChat: '',
            };
        }
        case ChatActions.RESTORE_DIALOG_RESPONSE: {
            const { uuid } = action.payload.params;
            return {
                ...state,
                restoreChat: 'Success',
                dialogs: state.dialogs.filter((x) => x.uuid !== uuid),
                pendingMessages: {
                    ...state.pendingMessages,
                    [uuid]: [],
                },
            };
        }
        case AuthenticationActions.LOGIN_USER_REQUEST:
        case AuthenticationActions.LOGOUT: {
            return ChatDefault;
        }
        // BERND
        case ChatActions.REFRESH_DIALOG_RESPONSE: {
            const { dialog } = action.payload.params;
            if (isError(action.payload.result)) {
                return state;
            }

            if (dialog) {
                return {
                    ...state,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dialogs: state.dialogs.map<IDialog>((x) =>
                        x.uuid === dialog
                            ? {
                                  ...x,
                                  partner: {
                                      ...x.partner,
                                      unread: isNumber(action.payload.result[0].Unread) ? action.payload.result[0].Unread : 0,
                                  },
                                  chatMessages: [...(action.payload.result[0].Messages?.map(BerndMapper.mapBerndChatMessageToChatMessage) ?? [])],
                              }
                            : x
                    ),
                };
            } else {
                const res = action.payload.result.map((x) => BerndMapper.mapBerndDialogToDialog(x, ''));

                const dic: IDictionary<string> = {};
                for (const el of res) {
                    dic[el.uuid] = el.uuid;
                }

                const messagesDic: IDictionary<IDialog> = {};

                for (const el of state.dialogs) {
                    messagesDic[el.uuid] = el;
                }

                return {
                    ...state,
                    dialogs: [...res, ...state.dialogs.filter((x) => x.temp && !(x.uuid in dic))].map<IDialog>((x) =>
                        x.uuid in messagesDic ? { ...x, chatMessages: messagesDic[x.uuid].chatMessages } : x
                    ),
                };
            }
        }

        case ChatActions.GET_NEW_MESSAGES_RESPONSE: {
            const { dialog } = action.payload.params;

            if (isError(action.payload.result)) {
                return state;
            }

            if (dialog) {
                return {
                    ...state,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dialogs: state.dialogs.map<IDialog>((x) =>
                        x.uuid === dialog
                            ? {
                                  ...x,
                                  partner: {
                                      ...x.partner,
                                      unread: isNumber(action.payload.result[0].Unread) ? action.payload.result[0].Unread : 0,
                                  },
                                  chatMessages: [
                                      ...x.chatMessages,
                                      ...(action.payload.result[0].Messages?.map(BerndMapper.mapBerndChatMessageToChatMessage) ?? []),
                                  ],
                              }
                            : x
                    ),
                };
            } else {
                const res = action.payload.result.map((x) => BerndMapper.mapBerndDialogToDialog(x, ''));

                // create a dictionary of all new dialogs
                const dic: IDictionary<IDialog> = res.reduce<IDictionary<IDialog>>((genDic, el) => {
                    genDic[el.uuid] = el;
                    return genDic;
                }, {});

                // create a dictionary of all current messages
                const messagesDic: IDictionary<IDialog> = state.dialogs.reduce<IDictionary<IDialog>>((genDic, el) => {
                    genDic[el.uuid] = el;
                    return genDic;
                }, {});

                const updatedDialogs = state.dialogs.map<IDialog>((x) => {
                    const dialogUpdate = dic[x.uuid];

                    if (!dialogUpdate) {
                        return x;
                    }

                    return {
                        ...x,
                        partner: {
                            ...x.partner,
                            unread: dialogUpdate.partner.unread,
                        },
                        lastMessage: {
                            recipient: '',
                            timestamp: 0,
                            message: dialogUpdate.lastMessage?.message,
                            sender: dialogUpdate.lastMessage?.sender,
                            type: dialogUpdate.lastMessage?.type,
                            datetime: dialogUpdate.lastMessage?.datetime,
                            isSeen: dialogUpdate.partner.unread === 0,
                        },
                    } as IDialog;
                });

                const newDialogs: IDialog[] = [];

                for (const key in dic) {
                    if (!(key in messagesDic)) {
                        newDialogs.push(dic[key]);
                    }
                }

                return {
                    ...state,
                    dialogs: [...updatedDialogs, ...newDialogs],
                };
            }
        }
        case ChatActions.SEND_MESSAGE_RESPONSE: {
            const { dialog, message, type, userId } = action.payload.params;

            if (isError(action.payload.result)) {
                return state;
            }

            return {
                ...state,
                dialogs: state.dialogs.map<IDialog>((x) =>
                    x.uuid === dialog
                        ? {
                              ...x,
                              chatMessages: [
                                  ...x.chatMessages,
                                  {
                                      datetime: new Date().toISOString(),
                                      isSeen: false,
                                      recipient: dialog,
                                      sender: userId,
                                      message: message,
                                      timestamp: 0,
                                      type: type,
                                  },
                              ],
                          }
                        : x
                ),
            };
        }

        case ChatActions.CREATE_DIALOG: {
            const automatedUser = action.payload;
            const uuid = automatedUser.Profilid;

            // check if the created dialog is already existant!
            if (state.dialogs.find((x) => x.uuid === uuid)) {
                return state;
            }

            const dialog: IDialog = {
                uuid: uuid,
                partner: {
                    id: automatedUser.Profilid,
                    name: automatedUser.Username,
                    photo: getProfileImage(automatedUser),
                    username: automatedUser.Profilid,
                    isOnline: false,
                    unread: 0,
                },
                chatMessages: [],
                temp: true,
            };

            return {
                ...state,
                dialogs: [...state.dialogs, dialog],
            };
        }

        case ChatActions.READ_DIALOG_RESPONSE: {
            const uuid = action.payload.params.dialog;

            return {
                ...state,
                dialogs: state.dialogs.map<IDialog>((x) => (x.uuid === uuid ? { ...x, partner: { ...x.partner, unread: 0 } } : x)),
            };
        }

        // case ChatActions.BUY_FAVORIT_PAKET_RESPONSE: {
        //     return {
        //         ...state,

        //     }
        // }

        case ChatActions.SET_FAVORIT_RESPONSE: {
            const { id } = action.payload.params;
            return {
                ...state,
                stars: state.stars - 1,
                dialogs: state.dialogs.map<IDialog>((x) => (x.uuid === id ? { ...x, isFavorite: true } : x)),
            };
        }
        case ChatActions.UNSET_FAVORIT_RESPONSE: {
            const { id } = action.payload.params;

            return {
                ...state,
                dialogs: state.dialogs.map<IDialog>((x) => (x.uuid === id ? { ...x, isFavorite: false } : x)),
            };
        }
        case ChatActions.REMOVE_TEMP_DIALOG: {
            const uuid = action.payload.uuid;

            return {
                ...state,
                dialogs: state.dialogs.filter((x) => !(x.uuid === uuid && !!x.temp)),
            };
        }

        default:
            return state;
    }
}

export default ChatReducer;

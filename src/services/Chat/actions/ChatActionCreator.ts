import config from '../../../config';
import Config from '../../../config';
import FetchApi from '../../../core/fetch/FetchApi';
import generateValidUrl from '../../../core/fetch/generateValidUrl';
import { HttpMethods } from '../../../core/fetch/HttpMethod';
import { ChatMessageType, ChatMessageTypes } from '../../../models/chat/ChatMessageType';
import { IChatPartner } from '../../../models/chat/IChatPartner';
import { ActionCreator, IBaseAction, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../../../models/state';
import { IStrangerUser } from '../../../models/user/IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from '../../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser } from '../../../models/user/IUser';
import { getUserAndToken } from '../../../selectors/AuthenticationSelectors';
import formatRequestBody from '../../../temp/formatRequestBody';
import { IBerndDialog } from '../../../temp/models/IBerndDialog';
import { IChatRefreshData } from '../listener/IChatRefreshData';
import { ICoinsData } from '../listener/ICoinsData';
import { IDialogReadData } from '../listener/IDialogReadData';
import { INewMessageData } from '../listener/INewMessageData';

export enum ChatActions {
    // OUTGOING
    SEND_MESSAGE = 'SEND_MESSAGE',
    READ_DIALOG = 'READ_DIALOG',
    REFRESH_DIALOG = 'REFRESH_DIALOG',

    // INCOMING
    NEW_MESSAGE = 'NEW_MESSAGE',
    DIALOG_READ = 'DIALOG_READ',
    DIALOG_REFRESH = 'DIALOG_REFRESH',
    DIALOGS_REFRESH = 'REFRESH_DIALOGS',
    UPDATE_COINS = 'UPDATE_COINS',
    // REST
    CREATE_DIALOG = 'CREATE_DIALOG',
    CREATE_DIALOG_REQUEST = 'CREATE_DIALOG_REQUEST',
    CREATE_DIALOG_RESPONSE = 'CREATE_DIALOG_RESPONSE',
    CREATE_DIALOG_FAILURE = 'CREATE_DIALOG_FAILURE',

    DELETE_DIALOG_REQUEST = 'DELETE_DIALOG_REQUEST',
    DELETE_DIALOG_RESPONSE = 'DELETE_DIALOG_RESPONSE',
    DELETE_DIALOG_FAILURE = 'DELETE_DIALOG_FAILURE',

    RESTORE_DIALOG_REQUEST = 'RESTORE_DIALOG_REQUEST',
    RESTORE_DIALOG_RESPONSE = 'RESTORE_DIALOG_RESPONSE',
    RESTORE_DIALOG_FAILURE = 'RESTORE_DIALOG_FAILURE',
    RESTORE_DIALOG_RESET = 'RESTORE_DIALOG_RESET',

    //PREMIUM
    PREMIUM_DIALOG_REQUEST = 'PREMIUM_DIALOG_REQUEST',
    PREMIUM_DIALOG_RESPONSE = 'PREMIUM_DIALOG_RESPONSE',
    PREMIUM_DIALOG_FAILURE = 'PREMIUM_DIALOG_FAILURE',

    // REST
    REFRESH_DIALOG_REQUEST = 'REFRESH_DIALOG_REQUEST',
    REFRESH_DIALOG_RESPONSE = 'REFRESH_DIALOG_RESPONSE',
    REFRESH_DIALOG_FAILURE = 'REFRESH_DIALOG_FAILURE',

    GET_NEW_MESSAGES_REQUEST = 'GET_NEW_MESSAGES_REQUEST',
    GET_NEW_MESSAGES_RESPONSE = 'GET_NEW_MESSAGES_RESPONSE',
    GET_NEW_MESSAGES_FAILURE = 'GET_NEW_MESSAGES_FAILURE',

    SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST',
    SEND_MESSAGE_RESPONSE = 'SEND_MESSAGE_RESPONSE',
    SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE',

    READ_DIALOG_REQUEST = 'READ_DIALOG_REQUEST',
    READ_DIALOG_RESPONSE = 'READ_DIALOG_RESPONSE',
    READ_DIALOG_FAILURE = 'READ_DIALOG_FAILURE',

    // FAVORITE
    GET_FAVORIT_NUMBER_REQUEST = 'GET_FAVORITE_NUMBER_REQUEST',
    GET_FAVORIT_NUMBER_RESPONSE = 'GET_FAVORITE_NUMBER_RESPONSE',
    GET_FAVORIT_NUMBER_FAILURE = 'GET_FAVORITE_NUMBER_FAILURE',

    SET_FAVORIT_REQUEST = 'SET_FAVORIT_REQUEST',
    SET_FAVORIT_RESPONSE = 'SET_FAVORIT_RESPONSE',
    SET_FAVORIT_FAILURE = 'SET_FAVORIT_FAILURE',

    UNSET_FAVORIT_REQUEST = 'UNSET_FAVORIT_REQUEST',
    UNSET_FAVORIT_RESPONSE = 'UNSET_FAVORIT_RESPONSE',
    UNSET_FAVORIT_FAILURE = 'UNSET_FAVORIT_FAILURE',

    BUY_FAVORIT_PAKET_REQUEST = 'BUY_FAVORIT_PAKET_REQUEST',
    BUY_FAVORIT_PAKET_RESPONSE = 'BUY_FAVORIT_PAKET_RESPONSE',
    BUY_FAVORIT_PAKET_FAILURE = 'BUY_FAVORIT_PAKET_FAILURE',

    REMOVE_TEMP_DIALOG = 'REMOVE_TEMP_DIALOG',
}

// OUTGOING
interface ISendMessageActionPayload {
    dialog: string;
    type: ChatMessageType;
    message: string | null;
    userId: string;
}
type ISendMessageAction = IBaseAction<ChatActions.SEND_MESSAGE, ISendMessageActionPayload>;
type IReadDialogAction = IBaseAction<ChatActions.READ_DIALOG, { dialog: string }>;
type IRefreshDialogAction = IBaseAction<ChatActions.REFRESH_DIALOG, { dialog?: string }>;

// INCOMING
type IDialogRefreshAction = IBaseAction<ChatActions.DIALOG_REFRESH, IChatRefreshData>;
type INewMessageAction = IBaseAction<ChatActions.NEW_MESSAGE, INewMessageData>;
type IUpdateCoinsAction = IBaseAction<ChatActions.UPDATE_COINS, ICoinsData>;
type IDialogReadAction = IBaseAction<ChatActions.DIALOG_READ, IDialogReadData>;

type ICreateDialogAction = IBaseAction<ChatActions.CREATE_DIALOG, IStrangerUser | IStrangerUserPreview>;
type ICreateDialogRequest = IRequestDataAction<ChatActions.CREATE_DIALOG_REQUEST>;
type ICreateDialogResponse = IReceiveDataAction<
    ChatActions.CREATE_DIALOG_RESPONSE,
    { id: string; uuid: string; type: string; appUser: IUser; automatedUser: IUser }
>;
type ICreateDialogFailure = IRequestDataFailedAction<ChatActions.CREATE_DIALOG_FAILURE>;
type CreateDialogAction = ICreateDialogRequest | ICreateDialogResponse | ICreateDialogFailure;

type IDeleteDialogRequest = IRequestDataAction<ChatActions.DELETE_DIALOG_REQUEST>;
type IDeleteDialogResponse = IReceiveDataAction<ChatActions.DELETE_DIALOG_RESPONSE, {}, { uuid: string }>;
type IDeleteDialogFailure = IRequestDataFailedAction<ChatActions.DELETE_DIALOG_FAILURE>;
type DeleteDialogAction = IDeleteDialogRequest | IDeleteDialogResponse | IDeleteDialogFailure;

type IPremiumDialogRequest = IRequestDataAction<ChatActions.PREMIUM_DIALOG_REQUEST>;
type IPremiumDialogResponse = IReceiveDataAction<ChatActions.PREMIUM_DIALOG_RESPONSE, {}, { uuid: string }>;
type IPremiumDialogFailure = IRequestDataFailedAction<ChatActions.PREMIUM_DIALOG_FAILURE>;
type PremiumDialogAction = IPremiumDialogRequest | IPremiumDialogResponse | IPremiumDialogFailure;

type IRestoreDialogRequest = IRequestDataAction<ChatActions.RESTORE_DIALOG_REQUEST>;
type IRestoreDialogResponse = IReceiveDataAction<ChatActions.RESTORE_DIALOG_RESPONSE, {}, { uuid: string }>;
type IRestoreDialogFailure = IRequestDataFailedAction<ChatActions.RESTORE_DIALOG_FAILURE>;
type IRestoreDialogReset = IRequestDataFailedAction<ChatActions.RESTORE_DIALOG_RESET>;
type RestoreDialogAction = IRestoreDialogRequest | IRestoreDialogResponse | IRestoreDialogFailure | IRestoreDialogReset;

type IRefreshDialogRequest = IRequestDataAction<ChatActions.REFRESH_DIALOG_REQUEST>;
type IRefreshDialogResponse = IReceiveDataAction<ChatActions.REFRESH_DIALOG_RESPONSE, IBerndDialog[], { dialog?: string }>;
type IRefreshDialogFailure = IRequestDataFailedAction<ChatActions.REFRESH_DIALOG_FAILURE>;
type RefreshDialogAction = IRefreshDialogRequest | IRefreshDialogResponse | IRefreshDialogFailure;

type IGetNewMessagesRequest = IRequestDataAction<ChatActions.GET_NEW_MESSAGES_REQUEST>;
type IGetNewMessagesResponse = IReceiveDataAction<ChatActions.GET_NEW_MESSAGES_RESPONSE, IBerndDialog[], { dialog?: string }>;
type IGetNewMessagesFailure = IRequestDataFailedAction<ChatActions.GET_NEW_MESSAGES_FAILURE>;
type GetNewMessagesAction = IGetNewMessagesRequest | IGetNewMessagesResponse | IGetNewMessagesFailure;

type ISendMessageRequest = IRequestDataAction<ChatActions.SEND_MESSAGE_REQUEST>;
type ISendMessageResponse = IReceiveDataAction<ChatActions.SEND_MESSAGE_RESPONSE, {}, ISendMessageActionPayload>;
type ISendMessageFailure = IRequestDataFailedAction<ChatActions.SEND_MESSAGE_FAILURE>;
type SendMessageAction = ISendMessageRequest | ISendMessageResponse | ISendMessageFailure;

type IReadDialogRequest = IRequestDataAction<ChatActions.READ_DIALOG_REQUEST>;
type IReadDialogResponse = IReceiveDataAction<ChatActions.READ_DIALOG_RESPONSE, {}, { dialog: string }>;
type IReadDialogFailure = IRequestDataFailedAction<ChatActions.READ_DIALOG_FAILURE>;
type ReadDialogAction = IReadDialogRequest | IReadDialogResponse | IReadDialogFailure;

type IGetFavoritNumberRequest = IRequestDataAction<ChatActions.GET_FAVORIT_NUMBER_REQUEST>;
type IGetFavoritNumberResponse = IReceiveDataAction<ChatActions.GET_FAVORIT_NUMBER_RESPONSE, [{ Favoritleft: number }]>;
type IGetFavoritNumberFailure = IRequestDataFailedAction<ChatActions.GET_FAVORIT_NUMBER_FAILURE>;
type GetFavoritNumberAction = IGetFavoritNumberRequest | IGetFavoritNumberResponse | IGetFavoritNumberFailure;

type ISetFavoritRequest = IRequestDataAction<ChatActions.SET_FAVORIT_REQUEST>;
type ISetFavoritResponse = IReceiveDataAction<ChatActions.SET_FAVORIT_RESPONSE, {}, IChatPartner>;
type ISetFavoritFailure = IRequestDataFailedAction<ChatActions.SET_FAVORIT_FAILURE, IChatPartner>;
type SetFavoritAction = ISetFavoritRequest | ISetFavoritResponse | ISetFavoritFailure;

type IUnsetFavoritRequest = IRequestDataAction<ChatActions.UNSET_FAVORIT_REQUEST>;
type IUnsetFavoritResponse = IReceiveDataAction<ChatActions.UNSET_FAVORIT_RESPONSE, {}, IChatPartner>;
type IUnsetFavoritFailure = IRequestDataFailedAction<ChatActions.UNSET_FAVORIT_FAILURE, IChatPartner>;
type UnsetFavoritAction = IUnsetFavoritRequest | IUnsetFavoritResponse | IUnsetFavoritFailure;

type IBuyFavoritPaketRequest = IRequestDataAction<ChatActions.BUY_FAVORIT_PAKET_REQUEST>;
type IBuyFavoritPaketResponse = IReceiveDataAction<ChatActions.BUY_FAVORIT_PAKET_RESPONSE, {}, { stars: number }>;
type IBuyFavoritPaketFailure = IRequestDataFailedAction<ChatActions.BUY_FAVORIT_PAKET_FAILURE>;
type BuyFavoritPaketAction = IBuyFavoritPaketRequest | IBuyFavoritPaketResponse | IBuyFavoritPaketFailure;

type IRemoveTempDialogAction = IBaseAction<ChatActions.REMOVE_TEMP_DIALOG, { uuid: string }>;

export type ChatAction =
    | ISendMessageAction
    | IReadDialogAction
    | IRefreshDialogAction
    | IDialogRefreshAction
    | INewMessageAction
    | IUpdateCoinsAction
    | IDialogReadAction
    | CreateDialogAction
    | DeleteDialogAction
    | RefreshDialogAction
    | GetNewMessagesAction
    | SendMessageAction
    | ICreateDialogAction
    | ReadDialogAction
    | GetFavoritNumberAction
    | SetFavoritAction
    | BuyFavoritPaketAction
    | IRemoveTempDialogAction
    | UnsetFavoritAction
    | RestoreDialogAction
    | PremiumDialogAction;

export class ChatActionCreator {
    // OUTGOING
    public static sendMessage(dialog: string, message: string | null, type: ChatMessageType = ChatMessageTypes.MESSAGE, userId: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            ChatActions.SEND_MESSAGE,
            [ChatActions.SEND_MESSAGE_REQUEST, ChatActions.SEND_MESSAGE_RESPONSE, ChatActions.SEND_MESSAGE_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.SEND_MESSAGE_TO, user?.Userid, {
                        profilid: dialog,
                        text: message,
                        type:
                            type === ChatMessageTypes.MESSAGE ? 1 : type === ChatMessageTypes.PRESENT ? 2 : type === ChatMessageTypes.ZWINKER ? 4 : 3,
                    }),
                    HttpMethods.GET,
                    token,
                    user
                );
            },

            undefined,
            { dialog: dialog, message: message, type: type, userId: userId }
        );

        // return ActionCreator.createAction(ChatActions.SEND_MESSAGE, {
        //     dialog: dialog,
        //     type: type,
        //     message: message ?? null,
        // });
    }

    public static readDialog(dialog: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            ChatActions.READ_DIALOG,
            [ChatActions.READ_DIALOG_REQUEST, ChatActions.READ_DIALOG_RESPONSE, ChatActions.READ_DIALOG_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.READ_DIALOG_URL, user?.Userid, {
                        profilid: dialog,
                    }),
                    HttpMethods.GET,
                    token,
                    user
                );
            },

            undefined,
            { dialog: dialog }
        );

        // return ActionCreator.createAction(ChatActions.READ_DIALOG, {
        //     dialog,
        // });
    }

    /**
     * loads all dialogs or all messages of one specific dialog
     *
     * @static
     * @param {string} [dialog]
     * @returns
     * @memberof ChatActionCreator
     */
    public static refresh(dialog?: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            ChatActions.REFRESH_DIALOG,
            [ChatActions.REFRESH_DIALOG_REQUEST, ChatActions.REFRESH_DIALOG_RESPONSE, ChatActions.REFRESH_DIALOG_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(dialog ? Config.GET_DIALOG_URL : Config.GET_DIALOGS_URL, user?.Userid, dialog ? { profilid: dialog } : {}),
                    HttpMethods.GET,
                    token,
                    user
                );
            },

            undefined,
            { dialog: dialog }
        );

        // return ActionCreator.createAction<ChatActions.REFRESH_DIALOG, { dialog?: string }>(ChatActions.REFRESH_DIALOG, {
        //     dialog: dialog,
        // });
    }

    /**
     * retrieves new messages each x seconds
     *
     * @static
     * @param {string} [dialog]
     * @returns
     * @memberof ChatActionCreator
     */
    public static getNewMessages(dialog?: string) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            'GET_NEW_MESSAGES',
            [ChatActions.GET_NEW_MESSAGES_REQUEST, ChatActions.GET_NEW_MESSAGES_RESPONSE, ChatActions.GET_NEW_MESSAGES_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(
                        dialog ? Config.REFRESH_DIALOG_URL : Config.REFRESH_DIALOGS_URL,
                        user?.Userid,
                        dialog ? { profilid: dialog } : {}
                    ),
                    HttpMethods.GET,
                    token,
                    user
                );
            },

            undefined,
            { dialog: dialog }
        );
    }

    public static createDialog(chatWithUsername: string, strangerUser?: IStrangerUser | IStrangerUserPreview) {
        // const url = generateValidUrl(Config.DIALOG_URL);

        return ActionCreator.createAction(ChatActions.CREATE_DIALOG, strangerUser);

        // return ActionCreator.createAsyncAction(
        //     Config.BLACKLIST_ACTION_PREFIX + 'CREATE_DIALOG',
        //     [ChatActions.CREATE_DIALOG_REQUEST, ChatActions.CREATE_DIALOG_RESPONSE, ChatActions.CREATE_DIALOG_FAILURE],
        //     (state: IState) => {
        //         const { user, token } = getUserAndToken(state);
        //         return FetchApi.fetch(url, { username: chatWithUsername }, HttpMethods.POST, token, user);
        //     },
        //     undefined,
        //     strangerUser
        // );
    }

    public static deleteDialog(uuid: string) {
        const url = generateValidUrl(Config.DELETE_DIALOG_URL(uuid));

        return ActionCreator.createAsyncAction(
            'DELETE_DIALOG',
            [ChatActions.DELETE_DIALOG_REQUEST, ChatActions.DELETE_DIALOG_RESPONSE, ChatActions.DELETE_DIALOG_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.DELETE_DIALOG_URL(uuid), user?.Userid, { profilid: uuid }),
                    HttpMethods.DELETE,
                    token,
                    user
                );
            },

            undefined,
            { uuid: uuid }
        );
    }

    public static restoreChat(uuid: string) {
        const url = generateValidUrl(Config.RESTORE_CHAT_URL(uuid));

        return ActionCreator.createAsyncAction(
            'RESTORE_DIALOG',
            [ChatActions.RESTORE_DIALOG_REQUEST, ChatActions.RESTORE_DIALOG_RESPONSE, ChatActions.RESTORE_DIALOG_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.RESTORE_CHAT_URL(uuid), user?.Userid, { profilid: uuid }),
                    HttpMethods.DELETE,
                    token,
                    user
                );
            },

            undefined,
            { uuid: uuid }
        );
    }
    public static buyPremium(month: number) {
        //@ts-ignore
        const url = generateValidUrl(config.BUY_PREMIUM);

        return ActionCreator.createAsyncAction(
            'BUY_PREMIUM',
            [ChatActions.PREMIUM_DIALOG_REQUEST, ChatActions.PREMIUM_DIALOG_RESPONSE, ChatActions.PREMIUM_DIALOG_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                //@ts-ignore
                return FetchApi.fetch(url, formatRequestBody(Config.BUY_PREMIUM, user?.Userid, { month: month }), HttpMethods.POST, token, user);
            },
            undefined,
            {
                month: month,
            }
        );
    }

    // INCOMING
    public static dialogRefresh(data: IChatRefreshData): IDialogRefreshAction {
        return ActionCreator.createAction(ChatActions.DIALOG_REFRESH, data);
    }

    public static newMessage(data: INewMessageData): INewMessageAction {
        return ActionCreator.createAction(ChatActions.NEW_MESSAGE, data);
    }

    public static updateCoins(data: ICoinsData): IUpdateCoinsAction {
        return ActionCreator.createAction(ChatActions.UPDATE_COINS, data);
    }

    public static dialogRead(data: IDialogReadData): IDialogReadAction {
        return ActionCreator.createAction(ChatActions.DIALOG_READ, data);
    }
    public static restoreChatStatus(): IRestoreDialogRequest {
        return ActionCreator.createAction(ChatActions.RESTORE_DIALOG_RESET);
    }

    public static getStarsAmount() {
        //return FetchApi.fetch(Config.BASE_URL, formatRequestBody(Config.GET_FAVORIT_NUMBER, userId, {}), HttpMethods.GET, token, user);
        // TODO: build actions!
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            'GET_FAVORIT_NUMBER',
            [ChatActions.GET_FAVORIT_NUMBER_REQUEST, ChatActions.GET_FAVORIT_NUMBER_RESPONSE, ChatActions.GET_FAVORIT_NUMBER_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.GET_FAVORIT_NUMBER, user?.Userid, {}), HttpMethods.GET, token, user);
            },

            undefined
        );
    }

    public static setFavorite(stranger: IChatPartner) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            'SET_FAVORIT',
            [ChatActions.SET_FAVORIT_REQUEST, ChatActions.SET_FAVORIT_RESPONSE, ChatActions.SET_FAVORIT_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.SET_FAVORIT, user?.Userid, { profilid: stranger.id }),
                    HttpMethods.POST,
                    token,
                    user
                );
            },
            undefined,
            stranger
        );
    }

    public static unsetFavorite(stranger: IChatPartner) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            'UNSET_FAVORIT',
            [ChatActions.UNSET_FAVORIT_REQUEST, ChatActions.UNSET_FAVORIT_RESPONSE, ChatActions.UNSET_FAVORIT_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.UNSET_FAVORIT, user?.Userid, { profilid: stranger.id }),
                    HttpMethods.POST,
                    token,
                    user
                );
            },
            undefined,
            stranger
        );
    }

    public static buyFavoritePackage(value: number) {
        const url = generateValidUrl(undefined);

        return ActionCreator.createAsyncAction(
            'BUY_FAVORIT_PAKET',
            [ChatActions.BUY_FAVORIT_PAKET_REQUEST, ChatActions.BUY_FAVORIT_PAKET_RESPONSE, ChatActions.BUY_FAVORIT_PAKET_FAILURE],
            (state: IState) => {
                const { user, token } = getUserAndToken(state);
                return FetchApi.fetch(
                    url,
                    formatRequestBody(Config.BUY_FAVORIT_PAKET, user?.Userid, { value: value }),
                    HttpMethods.POST,
                    token,
                    user
                );
            },
            undefined,
            { stars: value }
        );
    }

    public static removeTempDialog(uuid: string): IRemoveTempDialogAction {
        return ActionCreator.createAction(ChatActions.REMOVE_TEMP_DIALOG, { uuid: uuid });
    }
}

export default ChatActionCreator;


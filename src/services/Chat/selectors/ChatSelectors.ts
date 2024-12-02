import { IState } from '../../../models/state';

export const getChats = (state: IState) => state.chat.dialogs ?? [];
export const getRestoreChatStatus = (state: IState) => state.chat.restoreChat;
export const getChat = (state: IState, chatId: string) => getChats(state).find((x) => x.uuid === chatId);
export const getStars = (state: IState) => state.chat.stars;

export const getUnreadChats = (state: IState) => getChats(state)?.filter((x) => x.partner.unread > 0 && x.lastMessage !== null) ?? [];

export const getPendingMessages = (state: IState, chatId: string) =>
    chatId in state.chat.pendingMessages ? state.chat.pendingMessages[chatId] : undefined;

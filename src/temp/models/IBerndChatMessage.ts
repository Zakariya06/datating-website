import { ChatMessageType, ChatMessageTypes } from '../../models/chat/ChatMessageType';

export interface IBerndChatMessage {
    Sender: string;
    Typ?: number;
    Art: number;
    Message: string;
    Date: string;
}

const map = {
    1: ChatMessageTypes.MESSAGE,
    2: ChatMessageTypes.PRESENT,
    3: ChatMessageTypes.ZWINKER,
    4: ChatMessageTypes.FILE,
};

const map2 = {
    [ChatMessageTypes.MESSAGE]: 1,
    [ChatMessageTypes.PRESENT]: 2,
    [ChatMessageTypes.ZWINKER]: 3,
    [ChatMessageTypes.FILE]: 4,
};

export const chatMessageTypeToBerndMessageArt = (type: ChatMessageType): number => map2[type];

export const berndChatMessageArtToMessageTyp = (art: number): ChatMessageType => map[art] || ChatMessageTypes.MESSAGE;

import { IChatMessage } from './IChatMessage';
import { IChatPartner } from './IChatPartner';

export interface IDialog {
    uuid: string; // uuid: string;
    partner: IChatPartner;
    lastMessage?: IChatMessage;
    chatMessages: IChatMessage[];
    isFavorite?: boolean;
    temp?: boolean;
    offen?: any
}

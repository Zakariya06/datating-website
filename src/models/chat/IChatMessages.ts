import isArray from '../../core/typeguards/isArray';
import { IChatMessage } from './IChatMessage';
export interface IChatMessages {
    messages: IChatMessage[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChatMessagesObject = (x: any): x is IChatMessages => x && 'messages' in x && isArray(x.messages);

import { DateType } from '../core/date/DateType';
import { ChatMessageType } from './ChatMessageType';

export interface IChatMessage {
    sender: string;
    recipient: string;
    message: string | null;
    type: ChatMessageType;
    timestamp: number;
    datetime: DateType;
    isSeen: boolean;
    isPeding?: boolean;
}

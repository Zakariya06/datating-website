import { isToday, isYesterday } from 'date-fns';

import { ResourceService } from './../../services/i18n/ResourcesService';
import formatDate from '../../core/formatDate';
import { IChatMessage } from './IChatMessage';

export type IChatMessageList = IChatMessageFragment[];
export interface IChatMessageFragment {
    date: string;
    messages: IChatMessage[];
}

export function groupChatMessages(chatMessages: IChatMessage[]): IChatMessageList {
    const groups = chatMessages.reduce((groups, message) => {
        const [date] = new Date(message.datetime).toISOString().split('T');

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(message);

        return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => ({
        date,
        messages: groups[date],
    }));
    return groupArrays;
}

export function formatCaptionDateString(date: string): string {
    const dateInstance = new Date(date);

    if (isToday(dateInstance)) {
        return ResourceService.getCurrentResources().CHAT_INTERFACE_TODAY;
    } else if (isYesterday(dateInstance)) {
        return ResourceService.getCurrentResources().CHAT_INTERFACE_YESTERDAY;
    }

    try {
        return formatDate(date);
    } catch {
        return date;
    }
}

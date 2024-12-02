import { useTheme } from '@material-ui/core';
import React, { Fragment, useLayoutEffect, useRef } from 'react';

import IMG from '../../../assets/images/emptyStates/noChats.png';
import ActivityIndicator from '../../../components/ActivityIndicator/ActivityIndicator';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { IChatMessage } from '../../../models/chat/IChatMessage';
import { formatCaptionDateString, groupChatMessages } from '../../../models/chat/IChatMessageList';
import { IChatPartner } from '../../../models/chat/IChatPartner';
import { IUser } from '../../../models/user/IUser';
import ResourceService from '../../../services/i18n';
import useTranslation from '../../../services/i18n/core/useTranslation';
import ChatDateTag from './ChatDateTag';
import ChatMessage from './ChatMessage';

export interface IChatListProps {
    isLoading: boolean;
    chatMessages: IChatMessage[];
    user: IUser | undefined;
    chatPartner: IChatPartner;
}

export function ChatList({ chatMessages, user, chatPartner, isLoading }: IChatListProps) {
    const chatListRef = useRef<HTMLDivElement | null>(null);
    const groupedMessages = groupChatMessages(chatMessages);
    const { CHAT_INTERFACE_EMPTYSTATE } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.type === 'dark';

    useLayoutEffect(() => {
        chatListRef.current?.scrollTo({ behavior: 'auto', top: chatListRef.current?.scrollHeight });
    });

    return (
        <article className="flex column" style={{ overflow: 'auto', flex: '1 1 0', height: 0, contain: 'strict' }} ref={chatListRef}>
            <div className="flex column" />

            {isLoading && (
                <div className="flex no-grow centered spacing padding all">
                    <ActivityIndicator />
                </div>
            )}

            {chatMessages.length === 0 && !isLoading && (
                <EmptyState
                    image={IMG}
                    title={ResourceService.replace(CHAT_INTERFACE_EMPTYSTATE, {
                        name: chatPartner.name,
                    })}
                    imageStyles={{ width: 281, height: 211 }}
                />
            )}
            {groupedMessages.map(({ date, messages }) => (
                <Fragment key={date}>
                    <ChatDateTag date={formatCaptionDateString(date)} />
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.datetime}
                            {...message}
                            isSender={message.sender === user?.Userid}
                            chatPartnerName={chatPartner.name}
                            isDark={isDark}
                        />
                    ))}
                </Fragment>
            ))}
        </article>
    );
}

export default ChatList;

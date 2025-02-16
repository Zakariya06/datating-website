import { Avatar } from '@material-ui/core';
import Config from 'config';
import React from 'react';

export interface IChatUnreadDotProps {
    unread: number;
}

export function ChatUnreadDot({ unread }: IChatUnreadDotProps) {
    return (
        <Avatar
            variant="circular"
            style={{
                width: 20,
                height: 20,
                fontSize: '0.7rem',
                backgroundColor: Config.GLOBAL_PRIMARY_COLOR,
                color: '#fff',

                left: 40,
                position: 'absolute',
            }}
            color="error"
        >
            {unread}
        </Avatar>
    );
}

export default ChatUnreadDot;


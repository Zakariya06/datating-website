import React, { memo, useMemo } from 'react';
import { Avatar, Box, Divider, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import { Circle } from '@mui/icons-material';
import generateValidUrl from '../../../../../core/fetch/generateValidUrl';
import limitString from '../../../../../core/limitString';
import { ChatMessageTypes } from '../../../../../models/chat/ChatMessageType';
import { IDialog } from '../../../../../models/chat/IDialog';
import ResourceService from '../../../../../services/i18n';
import useTranslation from '../../../../../services/i18n/core/useTranslation';
import { ChatUnreadDot } from '../../ChatUnreadDot';
import { getDateString } from './getDateString';
import { Button } from '@mui/material';

export interface IChatListItemComponentProps {
    style?: React.CSSProperties;
    dialog: IDialog;
    selected: boolean;
    onChatClick(dialog: IDialog): void;
}

const avatarStyle = { height: 60, width: 60, overflow: 'visible' };

const calculateDaysSince = (date: any) => {
    const currentDate: any = new Date();
    const pastDate: any = new Date(date);
    const differenceInTime = currentDate - pastDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};

export const ChatListItemComponent = memo((props: IChatListItemComponentProps) => {
    const { dialog, onChatClick, selected, style } = props;
    const { uuid, partner, lastMessage } = dialog;
    const { name, photo, id, unread, isOnline } = partner;
    const { CHAT_GOT_A_BLINK, CHAT_SENT_A_BLINK, CHAT_YOU, CHAT_GOT_A_PRESENT, CHAT_SENT_A_PRESENT } = useTranslation();

    const handleChatClick = () => onChatClick(dialog);

    const isSender = lastMessage?.sender !== id;

    const textToRender = useMemo(() => {
        switch (lastMessage?.type) {
            case ChatMessageTypes.ZWINKER: {
                return ResourceService.replace(isSender ? CHAT_SENT_A_BLINK : CHAT_GOT_A_BLINK, { name });
            }
            case ChatMessageTypes.PRESENT: {
                return ResourceService.replace(isSender ? CHAT_SENT_A_PRESENT : CHAT_GOT_A_PRESENT, { name });
            }
            case ChatMessageTypes.FILE: {
                return ResourceService.replace(isSender ? CHAT_SENT_A_PRESENT : CHAT_GOT_A_PRESENT, { name });
            }
            default: {
                return `${isSender ? CHAT_YOU + ' ' : ''}${limitString(lastMessage?.message ?? '', 40) || ''}`;
            }
        }
    }, [
        CHAT_GOT_A_BLINK,
        CHAT_GOT_A_PRESENT,
        CHAT_SENT_A_BLINK,
        CHAT_SENT_A_PRESENT,
        CHAT_YOU,
        isSender,
        lastMessage?.message,
        lastMessage?.type,
        name,
        
    ]);

    const imgsrc = useMemo(() => generateValidUrl(photo), [photo]);

    const daysSinceLastMessage = useMemo(() => calculateDaysSince(lastMessage?.datetime), [lastMessage?.datetime]);

    return (
        <>
            <ListItem alignItems="center" button onClick={handleChatClick} selected={selected} component="li"  style={{...style,height:style?.maxHeight ?? 112}}>
                <ListItemAvatar>
                    <ChatListItemImage imgsrc={imgsrc} />
                </ListItemAvatar>

                <div className="flex column spacing margin left">
                    <div className="flex row justify-content-space-between align-items-center spacing margin bottom">
                        <Typography style={{ fontWeight: 800, display: 'flex' }} variant="overline">
                            {name.slice(0, 7)}
                            <span>
                                {' '}
                                {isOnline ? (
                                    <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                ) : (
                                    <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                                )}
                            </span>
                        </Typography>
                        {(!isSender && id != 'support') &&
                            <Box flexGrow={1} textAlign={'right'}>
                                <Button
                                    style={{
                                        backgroundColor: '#19cea4',
                                        color:'black',
                                        padding:'.4em .6em',
                                        fontSize:'.8em',
                                        fontWeight:600,
                                        borderRadius:'50px'
                                    }}
                                    disableRipple
                                >
                                    {ResourceService.getCurrentResources().CHAT_YOURTURN}
                                </Button>
                            </Box>
                        }
                    </div>
                    <div className="flex row justify-content-space-between align-items-center">
                        <Typography
                            variant="body2"
                            style={{
                                width: 0,
                                flex: 1,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                wordBreak: 'break-word',
                                fontWeight: 600,
                                maxHeight: 40,
                            }}
                        >
                            {textToRender}
                        </Typography>
                        {unread > 0 && <ChatUnreadDot unread={unread} />}
                    </div>
                    <div className="flex row">
                        {id != 'support' &&
                            <Typography variant="caption" style={{ color: 'red' }}>
                                {(7 - daysSinceLastMessage) >= 0
                                    ? ResourceService.replace(
                                        ResourceService.getCurrentResources().CHAT_EXPIRE, 
                                        { days: (7 - daysSinceLastMessage).toString() }
                                    )
                                    : ResourceService.getCurrentResources().CHAT_EXPIRED}
                            </Typography>
                        }
                        <Typography variant="caption">{lastMessage?.datetime ? getDateString(lastMessage.datetime) : ''}</Typography>
                    </div>
                </div>
            </ListItem>
            <Divider
                variant="inset"
                component="li"
                key={`${uuid}-divider`}
                style={{ ...style, top: Number(style?.top ?? 0) + Number(style?.height ?? 0), height: 1, width: 'calc(100% - 72px)' }}
            />
        </>
    );
});

export default ChatListItemComponent;

const ChatListItemImage = memo(({ imgsrc }: { imgsrc: string }) => {
    return <Avatar src={imgsrc} style={avatarStyle} />;
});

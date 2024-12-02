import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Badge, Drawer, Tab, Tabs, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useMemo, useState } from 'react';

import Icon from '../../../../components/Icon';
import { IDialog } from '../../../../models/chat/IDialog';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import ChatOverviewList from '../ChatOverview/ChatOverviewList';

export interface IResponsiveChatDrawerProps {
    chats: IDialog[];
    selectedDialog: IDialog | undefined;
    open: boolean;
    stars: number;
    onClose(): void;

    onChatClick(chat: IDialog): void;
    openPurchaseStarDialog(): void;
}

export const ResponsiveChatDrawer = memo((props: IResponsiveChatDrawerProps) => {
    const { stars, chats, selectedDialog, onChatClick, open, onClose, openPurchaseStarDialog } = props;
    const { FAVORITE_CHATS, FAVORITE_FAVORITES, FAVORITE_STARS } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 350px)');

    const sortedChats = useMemo(
        () =>
            chats.sort((a, b) => {
                if (!a.lastMessage?.datetime) {
                    return -1;
                } else if (!b.lastMessage?.datetime) {
                    return 1;
                }

                return new Date(a.lastMessage?.datetime).getTime() > new Date(b.lastMessage.datetime).getTime() ? -1 : 1;
            }),
        [chats]
    );

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const filteredChats = useMemo(() => sortedChats.filter((x) => !x.isFavorite), [sortedChats]);
    const favoriteChats = useMemo(() => sortedChats.filter((x) => x.isFavorite), [sortedChats]);
    const unreadCount = useMemo(() => filteredChats.reduce<number>((prevVal, dialog) => (dialog.partner.unread ?? 0) + prevVal, 0), [filteredChats]);
    const favoriteUnreadCount = useMemo(() => favoriteChats.reduce<number>((prevVal, dialog) => (dialog.partner.unread ?? 0) + prevVal, 0), [
        favoriteChats,
    ]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="left"
            PaperProps={{ style: { minWidth: 250, maxWidth: isMobile ? 280 : 300, width: '100%' } }}
            keepMounted
        >
            <Tabs
                scrollButtons="off"
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                className="flex no-grow"
            >
                <Tab
                    value={0}
                    label={
                        <Badge badgeContent={unreadCount} color="error">
                            <Typography color="inherit">{FAVORITE_CHATS}</Typography>
                        </Badge>
                    }
                />

                <Tab
                    value={1}
                    label={
                        <Badge badgeContent={favoriteUnreadCount} color="error">
                            <Typography color="inherit">{FAVORITE_FAVORITES}</Typography>
                        </Badge>
                    }
                />
            </Tabs>
            {/* <List style={{ overflow: 'auto' }}>
                {sortedChats.map((x) => (
                    <ChatListItemComponent dialog={x} key={x.uuid} onChatClick={onChatClick} selected={x.uuid === selectedDialog?.uuid} />
                ))}
            </List> */}
            <div className="flex column">
                <ChatOverviewList
                    chats={value === 0 ? filteredChats : favoriteChats}
                    selectedDialogId={selectedDialog?.uuid}
                    onChatClick={onChatClick}
                />
            </div>

            <div onClick={openPurchaseStarDialog} className="flex justify-content-space-between align-items-center full-width sternenkonto pointer">
                <Typography color="inherit">
                    <b>{FAVORITE_STARS}</b>
                </Typography>

                <div className="flex no-grow align-items-center">
                    <Typography color="inherit">{stars}</Typography>
                    <Icon iconColor="#fdd932" icon={faStar} className="spacing margin left" />
                </div>
            </div>
        </Drawer>
    );
});

export default ResponsiveChatDrawer;

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Badge, Box, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import Icon from '../../../../components/Icon';
import { IDialog } from '../../../../models/chat/IDialog';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import ChatOverviewList from './ChatOverviewList';
import { Restore } from '@mui/icons-material';
import Config from 'config/config';
import ThemeContext from 'theme/ThemeContext';

export interface IChatOverviewProps {
    chats: IDialog[];
    selectedDialog: IDialog | undefined;
    stars: number;
    onChatClick(chat: IDialog): void;
    openPurchaseStarsDialog(): void;
}

export const ChatOverview = memo((props: IChatOverviewProps) => {
    const { stars, chats, onChatClick, selectedDialog, openPurchaseStarsDialog } = props;
    const { FAVORITE_CHATS, FAVORITE_FAVORITES, FAVORITE_STARS } = useTranslation();
    const [value, setValue] = useState<number>(0);
    const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue), []);
    const isMobile = useMediaQuery('(max-width:430px)', { defaultMatches: true });
    

    useEffect(() => {
        if (selectedDialog?.isFavorite) {
            setValue(1);
        }
    }, [selectedDialog?.isFavorite]);

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
    const { type } = useContext(ThemeContext);
    const filteredChats = useMemo(() => sortedChats.filter((x) => !x.isFavorite), [sortedChats]);
    const favoriteChats = useMemo(() => sortedChats.filter((x) => x.isFavorite), [sortedChats]);
    const unreadCount = useMemo(() => filteredChats.reduce<number>((prevVal, dialog) => (dialog.partner.unread ?? 0) + prevVal, 0), [filteredChats]);
    const favoriteUnreadCount = useMemo(
        () => favoriteChats.reduce<number>((prevVal, dialog) => (dialog.partner.unread ?? 0) + prevVal, 0),
        [favoriteChats]
    );

    return (
        <div className="flex column no-grow" style={{ minWidth:isMobile ? '100%' : 315 }}>
            {
                isMobile ?null :<div
                className="flex no-grow align-items-center"
                style={{ paddingTop: 16, minHeight: 64, background: type === 'light' ? 'white' : 'black' }}
            >
                <Tabs
                    scrollButtons="off"
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    className="flex"
                >
                    <Tab
                        value={0}
                        disableRipple
                        label={
                            <Badge badgeContent={unreadCount} color="error">
                                <Typography color="inherit">{FAVORITE_CHATS}</Typography>
                            </Badge>
                        }
                    />

                    <Tab
                        value={1}
                        disableRipple
                        label={
                            <Badge badgeContent={favoriteUnreadCount} color="error">
                                <Typography color="inherit">{FAVORITE_FAVORITES}</Typography>
                            </Badge>
                        }
                    />
                </Tabs>
            </div>
            }
            

            <div className="flex column" style={{ width: '100%', position: 'relative', marginTop: 4 }}>
                <ChatOverviewList
                    chats={value === 0 ? filteredChats : favoriteChats}
                    selectedDialogId={selectedDialog?.uuid}
                    onChatClick={onChatClick}
                    offen={selectedDialog?.offen}
                />
            </div>
            {
                isMobile ? null :   <div
                style={{ backgroundColor: Config.GLOBAL_PRIMARY_COLOR }}
                onClick={openPurchaseStarsDialog}
                className="flex justify-content-space-between align-items-center full-width sternenkonto pointer"
            >
                <Typography variant="overline" color="inherit">
                    {FAVORITE_STARS}
                </Typography>

                <div className="flex no-grow align-items-center">
                    <Typography color="inherit">{stars}</Typography>
                    <Icon iconColor="#fdd932" icon={faStar} className="spacing margin left" />
                </div>
            </div>
            }
          
        </div>
    );
});

export default ChatOverview;


import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Avatar, IconButton, Box, Typography, Paper } from '@mui/material';
import React, { useContext } from 'react';

import Icon from '../../../../components/Icon';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import formatRelativeTimeToNow from '../../../../core/formatRelativeTimeToNow';
import { IFeed } from '../../../../models/news/IFeed';
import ThemeContext from 'theme/ThemeContext';

export interface INotificationComponentProps extends IFeed {
    style?: React.CSSProperties;
    onClick(feed: IFeed): void;
    onDismiss(feed: IFeed): void;
}

export const NotificationComponent = React.memo((props: INotificationComponentProps) => {
    const { Date: date, Pushtyp, ProfilPicture, ProfilUsername, Text, Title, onClick, onDismiss, Unlocked = true, style } = props;
    const { type } = useContext(ThemeContext);

    const handleDismiss = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDismiss(props);
    };

    const handleClick = () => {
        if (Unlocked) {
            onClick(props);
        }
    };

    return (
        <Paper
            elevation={2}
            onClick={handleClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: type === 'light' ? 'background.paper' : 'rgb(42, 42, 42)',
                cursor: Unlocked ? 'pointer' : 'default',
                transition: 'background 0.3s',
                '&:hover': { bgcolor: type === 'light' ? '#FFF8E1' : 'rgb(50, 50, 50)' },
                ...style,
            }}
        >
            {/* Avatar */}
            <Avatar sx={{ width: 50, height: 50 }} src={generateValidUrl(ProfilPicture)}>
                {ProfilUsername?.charAt(0)}
            </Avatar>

            {/* Notification Content */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                    {ProfilUsername}
                </Typography>
                <Typography
                    variant="body2"
                    color={type === 'light' ? 'text.secondary' : 'white'}
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {Pushtyp !== 'visit' ? Text : `${ProfilUsername} | `}
                </Typography>

                {/* Date & Time */}
                <Typography variant="caption" color={type === 'light' ? 'text.disabled' : 'white'}>
                    {formatRelativeTimeToNow(date)}
                </Typography>
            </Box>

            {/* Dismiss Button */}
            <IconButton size="small" onClick={handleDismiss}>
                <Icon icon={faTimes} iconColor={type === 'light' ? 'black' : 'white'} />
            </IconButton>
        </Paper>
    );
});

export default NotificationComponent;


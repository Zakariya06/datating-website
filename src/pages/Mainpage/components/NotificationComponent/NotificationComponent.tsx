import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Avatar, IconButton } from '@material-ui/core';
import React, { useContext } from 'react';

import Icon from '../../../../components/Icon';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import formatRelativeTimeToNow from '../../../../core/formatRelativeTimeToNow';
import { IFeed } from '../../../../models/news/IFeed';
import { Typography } from '@mui/material';
import ThemeContext from 'theme/ThemeContext';

export interface INotificationComponentProps extends IFeed {
    style?: React.CSSProperties;
    onClick(feed: IFeed): void;
    onDismiss(feed: IFeed): void;
}

export const NotificationComponent = React.memo((props: INotificationComponentProps) => {
    const { Date: date, Pushtyp,ProfilPicture, ProfilUsername, Text, Title, onClick, onDismiss, Unlocked = true, style } = props;
    const { type } = useContext(ThemeContext);

    const handleDismiss = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDismiss(props);
    };

    const handleClick = () => {
        if (Unlocked) {
            onClick(props);
        } else {
            // TODO
        }
    };

    return (
        <div className="flex spacing margin bottom pointer feedItem" onClick={handleClick} style={{ backgroundColor: type === 'light' ? 'rgb(238 245 244)' : 'rgb(42, 42, 42)', borderRadius: 20, padding: 4, minHeight: 'fit-content', ...style }}>
            <div style={{ alignSelf: 'center', marginRight: 8, marginLeft: 2 }}>
                {/* <Tooltip title={ProfilUsername}> */}
                <Avatar style={{ width: 60, height: 60, borderRadius: 0 }} src={generateValidUrl(ProfilPicture)}>
                    {ProfilUsername}
                </Avatar>
                {/* </Tooltip> */}
            </div>

            <div style={{ textAlign: 'left' }} className="flex column">
                <div className="flex justify-content-space-between align-items-center">
                {
                    Pushtyp!=='visit' ? (
                        <Typography variant="body2" style={{display: 'flex', alignItems: 'center', paddingTop: 22}}>{Text}</Typography>
                    ):(
                        <Typography variant="body2">{ProfilUsername} | </Typography>

                    )
                   }

                    <IconButton size="small" onClick={handleDismiss}>
                        <Icon icon={faTimes} />
                    </IconButton>
                </div>

                <div className="flex justify-content-space-between" style={{ position: 'relative' }}>
                {
                    /* Pushtyp!=='visit' && (
                        <Typography variant="body2">{Text}</Typography>
                    )*/
                   }

                    {/* <Tooltip title={formatDate(date, DateFormats.DATE_TIME)}> */}
                    <Typography variant="caption" className="align-self-end item no-grow" sx={{ position:Pushtyp !== 'visit' ? 'absolute' : null, right: 0, bottom: 0 }}>
                        {formatRelativeTimeToNow(date)}
                    </Typography>
                    {/* </Tooltip> */}
                </div>
            </div>
        </div>
    );
});

export default NotificationComponent;

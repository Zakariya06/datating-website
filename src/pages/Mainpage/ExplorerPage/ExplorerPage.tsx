import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NearbyActionCreator from '../../../actions/NearbyActionCreator';
import ActivityIndicator from '../../../components/ActivityIndicator';
import UserCardGrid from '../../../components/UserCardGrid';
import useUserAndToken from '../../../core/useUserAndToken';
import { getNearbyUsers } from '../../../selectors/NearbySelectors';
import { ListItem, ListItemText, Link as MuiLink } from '@material-ui/core';
import SearchPopover from 'pages/Mainpage/Header/SearchPopover';
import useTranslation from 'services/i18n/core/useTranslation';
import { Card, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IExplorerPageProps {}

export const ExplorerPage = memo((props: IExplorerPageProps) => {
    const { user, token } = useUserAndToken();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const users = useSelector(getNearbyUsers);
    const dispatch = useDispatch();
    const { MENU_SEARCHSETTINGS } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        void (async () => {
            await dispatch(NearbyActionCreator.fetchGameUsers(true));
            setIsLoading(false);
        })();
    }, [token, user?.SearchGender, user?.MinAge, user?.MaxAge, user?.Distance]);

    const handleScrolledToBottom = useCallback(async () => {
        setIsLoading(true);
        await dispatch(NearbyActionCreator.fetchGameUsers(true));

        window.setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dispatch]);

    if (!token || !user) {
        return null;
    }

    return (
        <>
            <div className="user-card-grid-root">
                <ListItem button onClick={handleOpen} selected={Boolean(open)} style={{ textAlign: 'center' }} disableRipple>
                    {/* <ListItemText primary={MENU_SEARCHSETTINGS} /> */}
                </ListItem>
                <SearchPopover anchorEl={anchorEl} open={open} closePopper={handleClose} />
                <UserCardGrid items={users._embedded.items} viewType="explorer" onScrolledToBottom={handleScrolledToBottom} isLoading={isLoading} />
                {isLoading && users._embedded.items.length > 0 && (
                    <div className="flex column no-grow centered" style={{ marginTop: -80 }}>
                        <ActivityIndicator />
                    </div>
                )}
            </div>
        </>
    );
});

export default ExplorerPage;


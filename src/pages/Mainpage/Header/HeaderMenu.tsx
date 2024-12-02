import './HeaderMenu.scss';

import { faCog, faEllipsisV, faMoon, faSignOut, faUser } from '@fortawesome/pro-light-svg-icons';
import { Avatar, IconButton, ListItemIcon, MenuItem, Popover, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../components/Icon';
import generateValidUrl from '../../../core/fetch/generateValidUrl';
import isNullOrUndefined from '../../../core/typeguards/isNullOrUndefined';
import { PROFILE_PATH, SETTINGS_PATH } from '../../../models/Paths';
import { IUser, getProfileImage } from '../../../models/user/IUser';
import useTranslation from '../../../services/i18n/core/useTranslation';
import { ThemeContext } from '../../../theme/ThemeContext';

export function HeaderMenu({ user, openSignOutDialog }: { user: IUser | undefined; openSignOutDialog: () => void }) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const { setTheme, type } = useContext(ThemeContext);
    const { MENU_SETTINGS, SETTINGS_LOGOUT, MENU_DARK_MODE, MENU_OWN_PROFILE } = useTranslation();

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), []);

    const handleMenuClose = useCallback(
        (ev: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(undefined);
            ev.preventDefault();
            ev.stopPropagation();
        },
        [setAnchorEl]
    );

    const toggleTheme = () => {
        setTheme(type === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <div className="dropdown">
                <div className="flex align-items-center">
                    {/* <div className="dropdown-greater flex column spacing double margin right">
                    <Typography variant="body2" style={{ fontSize: 16, fontWeight: 300 }}>
                        Hallo,
                    </Typography>
                    <Typography style={{ fontSize: 18 }}>{user?.Username}</Typography>
                </div> */}

                    <Avatar src={user ? generateValidUrl(getProfileImage(user) ?? '') : undefined} component={Link} to={PROFILE_PATH} />

                    <IconButton onClick={handleClick} className="spacing double margin left">
                        <Icon icon={faEllipsisV} />
                    </IconButton>
                </div>
            </div>

            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                anchorEl={anchorEl}
                open={!isNullOrUndefined(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{ className: 'spacing double padding top bottom' }}
            >
                <MenuItem component={Link} to={PROFILE_PATH}>
                    <ListItemIcon>
                        <Icon icon={faUser} />
                    </ListItemIcon>
                    {MENU_OWN_PROFILE}
                </MenuItem>

                <MenuItem component={Link} to={SETTINGS_PATH}>
                    <ListItemIcon>
                        <Icon icon={faCog} />
                    </ListItemIcon>
                    {MENU_SETTINGS}
                </MenuItem>

                <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                        <Icon icon={faMoon} />
                    </ListItemIcon>
                    {MENU_DARK_MODE}
                </MenuItem>
                <MenuItem onClick={openSignOutDialog}>
                    <ListItemIcon>
                        <Icon color="error" icon={faSignOut} />
                    </ListItemIcon>
                    <Typography color="error">{SETTINGS_LOGOUT}</Typography>
                </MenuItem>
            </Popover>
        </>
    );
}

export default HeaderMenu;

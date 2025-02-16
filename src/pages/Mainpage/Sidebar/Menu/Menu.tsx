import './Menu.scss';

import { faEllipsisV, faEnvelope, faGlobeEurope, faMoon, faSignOut, faUser } from '@fortawesome/pro-light-svg-icons';
// import { faEnvelope, faEye, faGlobeEurope, faHeart, faNewspaper } from '@fortawesome/pro-light-svg-icons';
import { List, ListItem, ListItemIcon, Popover, ListItemText, MenuItem, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useContext, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import Icon from '../../../../components/Icon';
//import { HOME_PATH, LIKES_PATH, MESSAGES_PATH, VISITORS_PATH, NEWS_PATH, EXPLORER_PATH } from '../../../../models/Paths';
import { HOME_PATH, MESSAGES_PATH, EXPLORER_PATH, MATCH_PATH, SETTINGS_PATH } from '../../../../models/Paths';
import { IState } from '../../../../models/state';
import { getLikes, getVisitors } from '../../../../selectors/LikesSelectors';
import { getUnreadChats } from '../../../../services/Chat/selectors/ChatSelectors';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import ChatUnreadDot from '../../MessagesPage/ChatUnreadDot';
import isNullOrUndefined from 'core/typeguards/isNullOrUndefined';
import ThemeContext from 'theme/ThemeContext';
import SignOutComponent from 'components/SignOutComponent';
import LogoOnly from 'assets/images/logos/logoonly.svg';
import SkippedLogoAlt from 'assets/images/logos/logo-with-writing-white.svg';
import SkippedLogo from 'assets/images/logos/logo-with-writing.svg';


export interface IMenuProps {}

const homeOptions = { path: HOME_PATH, exact: true };
export const Menu = memo((props: IMenuProps) => {
    const isHomeSelected = useRouteMatch(homeOptions);
    const isExplorerSelected = useRouteMatch(EXPLORER_PATH);
    //const isLikesSelected = useRouteMatch(LIKES_PATH);
    const isMessagesSelected = useRouteMatch(MESSAGES_PATH);
    //const isVisitorsSelected = useRouteMatch(VISITORS_PATH);
    //const isNewsSelected = useRouteMatch(NEWS_PATH);
    const isMatchgameSelected = useRouteMatch(MATCH_PATH);
    const isSettingsSelected = useRouteMatch(SETTINGS_PATH);

    const { MENU_HOME, MENU_NEARBY, MENU_MESSAGES, MENU_SETTINGS, MENU_MATCHGAME, MENU_DARK_MODE, SETTINGS_LOGOUT } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const { setTheme, type } = useContext(ThemeContext);

    const [signOutDialogOpen, setSignOutDialogOpen] = useState<boolean>(false);
    const openSignOutDialog = useCallback(() => setSignOutDialogOpen(true), []);
    const closeSignOutDialog = useCallback(() => setSignOutDialogOpen(false), []);

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    const { unreadMessages } = useSelector(
        (state: IState) => ({
            unreadMessages: getUnreadChats(state).length,
            newLikes: getLikes(state).new ?? 0,
            newVisitors: getVisitors(state).new ?? 0,
        }),
        shallowEqual
    );

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

    const history = useHistory();

    return (
        <>
            <List className="topMenu" style={{ gap: '1em' }}>
                <a href="/">
                    <img
                        draggable={false}
                        src={!isDesktop ? LogoOnly : type === 'dark' ? SkippedLogoAlt : SkippedLogo}
                        style={{ height: 38, userSelect: 'none' }}
                    />
                </a>

                <ListItem button component={Link} to={HOME_PATH} selected={Boolean(isHomeSelected)} disableRipple>
                    <ListItemText primary={MENU_HOME} style={{ textAlign: 'center' }} />
                </ListItem>

                <ListItem
                    button
                    component={Link}
                    onClick={() => {
                        history.push(MATCH_PATH);
                        window.location.reload();
                    }}
                    to={MATCH_PATH}
                    selected={Boolean(isMatchgameSelected)}
                    disableRipple
                >
                    <ListItemText primary={MENU_MATCHGAME} style={{ textAlign: 'center' }} />
                </ListItem>

                <ListItem button component={Link} to={EXPLORER_PATH} selected={Boolean(isExplorerSelected)} disableRipple replace={false}>
                    <ListItemText primary={MENU_NEARBY} style={{ textAlign: 'center' }} />
                </ListItem>

                <ListItem
                    button
                    component={Link}
                    to={MESSAGES_PATH.replace('/:id?', '')}
                    selected={Boolean(isMessagesSelected)}
                    disableRipple
                    replace
                >
                    <ListItemText primary={MENU_MESSAGES} style={{ textAlign: 'center' }} />

                    {unreadMessages > 0 && <ChatUnreadDot unread={unreadMessages} />}
                </ListItem>
                {/*<ListItem button component={Link} to={VISITORS_PATH} selected={Boolean(isVisitorsSelected)} disableRipple>
                <ListItemIcon>
                    <Icon icon={faEye} />
                </ListItemIcon>
                <ListItemText primary={MENU_VISITORS} />
                {newVisitors > 0 && (
                    <ListItemSecondaryAction>
                        <ChatUnreadDot unread={newVisitors} />
                    </ListItemSecondaryAction>
                )}
            </ListItem>
            <ListItem button component={Link} to={LIKES_PATH} selected={Boolean(isLikesSelected)} disableRipple>
                <ListItemIcon>
                    <Icon icon={faHeart} />
                </ListItemIcon>
                <ListItemText primary={MENU_LIKES} />
                {newLikes > 0 && (
                    <ListItemSecondaryAction>
                        <ChatUnreadDot unread={newLikes} />
                    </ListItemSecondaryAction>
                )}
            </ListItem>
            <ListItem button component={Link} to={NEWS_PATH} selected={Boolean(isNewsSelected)} disableRipple>
                <ListItemIcon>
                    <Icon icon={faNewspaper} />
                </ListItemIcon>
                <ListItemText primary={MENU_NEWS} />
            </ListItem>*/}

                <ListItem button component={Link} to={SETTINGS_PATH} selected={Boolean(isSettingsSelected)} disableRipple>
                    <ListItemText primary={MENU_SETTINGS} style={{ textAlign: 'center' }} />
                </ListItem>

                <div className="dropdown">
                    <div className="flex align-items-center">
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
            </List>
            <SignOutComponent onClose={closeSignOutDialog} open={signOutDialogOpen} />
        </>
    );
});

export default Menu;


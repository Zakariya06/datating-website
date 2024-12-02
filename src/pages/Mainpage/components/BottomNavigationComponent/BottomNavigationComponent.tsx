import { faEnvelope, faEye, faGameBoard, faGlobeEurope, faHeart, faGameBoardAlt, faHome, faCog, faShoppingBag } from '@fortawesome/pro-light-svg-icons';
import { Badge, BottomNavigationAction, Paper } from '@material-ui/core';
import React, { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import Icon from '../../../../components/Icon';
import { EXPLORER_PATH, LIKES_PATH, MESSAGES_PATH, VISITORS_PATH, MATCH_PATH, HOME_PATH, SETTINGS_PATH, SHOP_PATH } from '../../../../models/Paths';
import { IState } from '../../../../models/state';
import { getLikes, getVisitors } from '../../../../selectors/LikesSelectors';
import { getUnreadChats } from '../../../../services/Chat/selectors/ChatSelectors';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IBottomNavigationComponentProps {}

export const BottomNavigationComponent = memo((props: IBottomNavigationComponentProps) => {
    // const isHomeSelected = useRouteMatch({ path: HOME_PATH, exact: true });
    const isExplorerSelected = useRouteMatch(EXPLORER_PATH);
    const isLikesSelected = useRouteMatch(LIKES_PATH);
    const isMessagesSelected = useRouteMatch(MESSAGES_PATH);
    const isVisitorsSelected = useRouteMatch(VISITORS_PATH);
    const isMatchgameSelected = useRouteMatch(MATCH_PATH);
    const isHomeSelected = useRouteMatch(HOME_PATH);
    const isSettingsSelected = useRouteMatch(SETTINGS_PATH);
    const isShopSelected = useRouteMatch(SHOP_PATH);

    const { MENU_NEARBY, MENU_MESSAGES, MENU_VISITORS, MENU_LIKES, MENU_MATCHGAME, MENU_HOME, MENU_SETTINGS } = useTranslation();

    const { unreadMessages, newLikes, newVisitors } = useSelector(
        (state: IState) => ({
            unreadMessages: getUnreadChats(state).length,
            newLikes: getLikes(state).new ?? 0,
            newVisitors: getVisitors(state).new ?? 0,
        }),
        shallowEqual
    );

    const position = isMessagesSelected ? 'static' : 'sticky';
    const bottom = isMessagesSelected ? 'unset' : 0;

    return (
        <Paper style={{ position: position, zIndex:99, bottom: 12, width: '80%', display: 'flex', justifyContent: 'center',margin:'auto',alignItems:'center',height:62,opacity:0.7,borderRadius:50 }}>
            {/* <BottomNavigationAction
                component={Link}
                to={HOME_PATH}
                label={MENU_NEARBY}
                icon={<Icon icon={faGlobeEurope} />}
                selected={Boolean(isHomeSelected)}
            />
            <BottomNavigationAction
                component={Link}
                to={EXPLORER_PATH}
                label={MENU_NEARBY}
                icon={<Icon icon={faGlobeEurope} />}
                selected={Boolean(isExplorerSelected)}
            />*/}
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0,marginTop:12 }}
                to={HOME_PATH}
                label={MENU_HOME}
                icon={<Icon icon={faHome} />}
            />
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0 }}
                // label={MENU_MESSAGES}
                to={MESSAGES_PATH.replace('/:id?', '')}
                icon={
                    <Badge color="error" badgeContent={unreadMessages}>
                        <Icon icon={faEnvelope} />
                    </Badge>
                }
                selected={Boolean(isMessagesSelected)}
            />
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0 }}
                to={MATCH_PATH}
                // label={MENU_MATCHGAME}
                value="Matchgame"
                icon={
                    <Badge color="error">
                        <Icon icon={faGameBoardAlt} />
                    </Badge>
                }
                selected={Boolean(isMatchgameSelected)}
            />
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0 }}
                to={EXPLORER_PATH}
                // label={MENU_NEARBY}
                icon={<Icon icon={faGlobeEurope} />}
                selected={Boolean(isExplorerSelected)}
            />
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0 }}
                to={SHOP_PATH}
                // label={"Shop"}
                icon={<Icon icon={faShoppingBag} />}
                selected={Boolean(isShopSelected)}
            />
            {/*<BottomNavigationAction
                component={Link}
                to={LIKES_PATH}
                label={MENU_VISITORS}
                value="Likes"
                icon={
                    <Badge color="error" badgeContent={newLikes}>
                        <Icon icon={faHeart} />
                    </Badge>
                }
                selected={Boolean(isLikesSelected)}
            />
            <BottomNavigationAction
                component={Link}
                to={VISITORS_PATH}
                label={MENU_LIKES}
                icon={
                    <Badge color="error" badgeContent={newVisitors}>
                        <Icon icon={faEye} />
                    </Badge>
                }
                selected={Boolean(isVisitorsSelected)}
            />*/}
            <BottomNavigationAction
                component={Link}
                style={{ paddingTop: 0 , paddingLeft: 0 ,paddingRight: 0 , paddingBottom: 0 , minWidth: 0 }}
                to={SETTINGS_PATH}
                // label={MENU_SETTINGS}
                icon={<Icon icon={faCog} />}
                selected={Boolean(isSettingsSelected)}
            />
        </Paper>
    );
});

export default BottomNavigationComponent;

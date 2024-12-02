import { Paper, useMediaQuery } from '@material-ui/core';
import addMinutes from 'date-fns/addMinutes';
import React, { Suspense, lazy, memo, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import UserActionCreator from '../../actions/UserActionCreator';
import ConfirmEmailModal from '../../components/ConfirmEmailModal';
import DailyLoginDialog from '../../components/DailyLoginDialog';
import CoinConsumerContextProvider from '../../components/InsufficientCoinsDialog/CoinConsumerContextProvider';
import CookieStorageAPI from '../../core/storage/CookieStorageAPI';
import useUserAndToken from '../../core/useUserAndToken';
import LoadingOverlay from '../../LoadingOverlay';
import {
    APP_SHOP_PATH,
    HOME_PATH,
    EXPLORER_PATH,
    LIKES_PATH,
    MESSAGES_PATH,
    PROFILE_PATH,
    SETTINGS_PATH,
    SHOP_PATH,
    STRANGER_PROFILE_PATH,
    USER_SEARCH_PATH,
    VISITORS_PATH,
    NEWS_PATH,
    MATCH_PATH,
} from '../../models/Paths';
import BottomNavigationComponent from './components/BottomNavigationComponent';
import CompleteProfilePictureDialog from './components/CompleteProfilePictureDialog';
import ExplorerPage from './ExplorerPage';
import Header from './Header';
import LikesPage from './LikesPage';
import SearchUserPage from './SearchUserPage';
import SettingsPage from './SettingsPage';
import ShopPage from './ShopPage';
import AppShopPage from './ShopPage/AppShopPage';
import { Menu } from './Sidebar/Menu/Menu';
// import SearchFilter from './Sidebar/SearchFilter';
// import UserSearch from './Sidebar/UserSearch';
import StrangerProfilePage from './StrangerProfilePage';
import VisitorsPage from './VisitorsPage';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import ThemeContext from 'theme/ThemeContext';
import { Box } from '@mui/material';
import MatchGame from './MatchGamePage/MatchGame';

// import YourNewsPaper from './components/YourNewsPaper';
// import MessagesPage from './MessagesPage';
// import ProfilePage from './ProfilePage';

const MessagesPage = lazy(() => import(/* webpackChunkName: "MessagesPage" */ './MessagesPage'));
// const ShopPage = lazy(() => import(/* webpackChunkName: "ShopPage" */ './ShopPage'));
const ProfilePage = lazy(() => import(/* webpackChunkName: "ProfilePage" */ './ProfilePage'));
const YourNewsPaper = lazy(() => import(/* webpackChunkName: "YourNewsPaper" */ './NewsFeed'));

export interface IMainpageProps {}

const MainPage = memo((props: IMainpageProps) => {
    const [isEmailModalOpen, setEmailModalOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const { user } = useUserAndToken();
    const history = useHistory();
    const dispatch = useDispatch();
    const { type } = useContext(ThemeContext);

    useEffect(() => {
        if (user?.Verifiy === 1) {
            if (CookieStorageAPI.getItem('last-verified-check')) {
                CookieStorageAPI.removeItem('last-verified-check');
            }
        }
    }, [user?.Verifiy]);

    useEffect(() => {
        if (history.location.search) {
            const searchParams = new URLSearchParams(history.location.search);
            const redirect = searchParams.get('redirect');
            const tfConvId = searchParams.get('click');
            const tfPlacementId = searchParams.get('source');
            if (redirect) {
                history.replace(redirect);
            } else if (tfConvId && tfPlacementId) {
                // This is traffic which comes from TrafficFabric.
                CookieStorageAPI.setItem('traffic-fabric', 'true', { click: tfConvId, source: tfPlacementId });
            }
        }

        CookieStorageAPI.setItem('last-verified-check', 'true', { expires: addMinutes(new Date(), 5) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        void (async () => {
            if (!CookieStorageAPI.getItem('last-verified-check')) {
                if (user?.Verifiy === 0) {
                    setEmailModalOpen(true);
                    CookieStorageAPI.setItem('last-verified-check', 'true', { expires: addMinutes(new Date(), 5) });
                    // refresh the user to check if he did confirm yet
                    await dispatch(UserActionCreator.refreshUser());
                }
            }
        })();
    }, [dispatch, history.location.pathname, user?.Verifiy]);

    return (
        <div id="main" className="flex column">
            {/* {!isDesktop && isMessagesPage ? null : <Header />} 
            <Header />*/}
            <main
                className="flex row container contentsContainer"
                style={{
                    padding: '20px ',
                    paddingTop: '8em',
                    width: '100%',
                }}
            >
                {/* {isDesktop && (
                    <aside className="flex no-grow" style={{ minWidth: 220, position: 'relative' }}>
                        <div style={{ position: 'fixed', width: 220 }}>
                            <Paper className="spacing triple padding all">
                                <UserSearch />
                                <Divider />
                                <SearchFilter />
                            </Paper>
                        </div>
                    </aside>
                )} */}
                {isDesktop ? <ProfilePreview /> : null}

                <Box
                    className=" column"
                    sx={{
                        position: 'relative',
                        borderRadius: '20px',
                        padding: '1.5em .5em .5em .5em',
                        width: '100%',
                        backgroundColor: type === 'light' ? 'white' : 'rgb(42, 42, 42)',
                    }}
                >
                    <div className="menuParent">
                        <Paper
                            style={{
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px',
                                position: 'absolute',
                                top: '-4em',
                                //width: { md: '70%', sm: '85%' },
                            }}
                            elevation={0}
                            className="spacing margin triple bottom menuContainer"
                        >
                            <Menu />
                        </Paper>
                    </div>
                    <Suspense fallback={LoadingOverlay}>
                        <Switch>
                            <Route path={HOME_PATH} component={YourNewsPaper} exact />
                            <Route path={MATCH_PATH} component={MatchGame} exact />
                            <Route path={EXPLORER_PATH} component={ExplorerPage} exact />
                            <Route path={MESSAGES_PATH} component={MessagesPage} exact />
                            <Route path={VISITORS_PATH} component={VisitorsPage} exact />
                            <Route path={LIKES_PATH} component={LikesPage} exact />
                            <Route path={PROFILE_PATH} component={ProfilePage} exact />
                            <Route path={STRANGER_PROFILE_PATH} component={StrangerProfilePage} exact />
                            <Route path={SHOP_PATH} component={ShopPage} exact />
                            <Route path={APP_SHOP_PATH} component={AppShopPage} exact />
                            <Route path={USER_SEARCH_PATH} component={SearchUserPage} exact />
                            <Route path={SETTINGS_PATH} component={SettingsPage} exact />
                            <Route path={NEWS_PATH} component={YourNewsPaper} exact />

                            <Route path="/*" component={() => <Redirect to={HOME_PATH} />} />
                        </Switch>
                    </Suspense>
                </Box>

                {/*<Route path={[HOME_PATH, VISITORS_PATH, LIKES_PATH, PROFILE_PATH, STRANGER_PROFILE_PATH, USER_SEARCH_PATH, SETTINGS_PATH]} exact>
                    {isDesktop && (
                        <aside style={{ minWidth: 280 }}>
                            <div style={{ width: 280, position: 'fixed' }}>
                                <YourNewsPaper />
                            </div>
                        </aside>
                    )}
                </Route>
                <CompleteProfilePictureDialog />*/}
                <ConfirmEmailModal isOpen={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} />
                <DailyLoginDialog />
            </main>
            {!isDesktop && <BottomNavigationComponent />}
        </div>
    );
});

const MainPageContainer = () => (
    <CoinConsumerContextProvider>
        <MainPage />
    </CoinConsumerContextProvider>
);

export default MainPageContainer;

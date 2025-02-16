import { Divider, Paper, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DirectInteractionActionCreator from '../../../actions/DirectInteractionActionCreator';
import LikesActionCreator from '../../../actions/LikesActionCreator';
import img from '../../../assets/images/emptyStates/Notifications_Monochromatic.svg';
import EmptyState from '../../../components/EmptyState/EmptyState';
import UnlockProfileDialog from '../../../components/UnlockProfileDialog';
import Config from '../../../config';
import generateValidUrl from '../../../core/fetch/generateValidUrl';
import useUserAndToken from '../../../core/useUserAndToken';
import LoadingOverlay from '../../../LoadingOverlay';
import { IFeed, PushTypMap } from '../../../models/news/IFeed';
import { EXPLORER_PATH, LIKES_PATH, MESSAGES_PATH, SHOP_PATH, STRANGER_PROFILE_PATH, VISITORS_PATH } from '../../../models/Paths';
import { IStrangerUser } from '../../../models/user/IStrangerUser/IStrangerUser';
import { getBalance, getProfileImage } from '../../../models/user/IUser';
import useTranslation from '../../../services/i18n/core/useTranslation';
import MatchDialog from '../components/MatchDialog';
import { NewsFeedActionCreator } from './actions/NewsFeedActionCreator';
import { NewsFeedList } from './NewsFeedList';
import { getNewsFeed } from './selectors/NewsFeedSelectors';
import { Box, Typography } from '@mui/material';
import ThemeContext from 'theme/ThemeContext';
import VisitorsPage from '../VisitorsPage';
import LikesPage from '../LikesPage';

export interface INewsFeedProps {
    displayedNotificationCount?: number;
}

export const NewsFeed = memo((props: INewsFeedProps) => {
    const { displayedNotificationCount = 6 } = props;
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [matchUser, setmatchUser] = useState<IStrangerUser | undefined>(undefined);
    const [unlockUser, setUnlockUser] = useState<IStrangerUser | undefined>(undefined);
    const dispatch = useDispatch();
    const feed = useSelector(getNewsFeed);
    const { user, token } = useUserAndToken();
    const history = useHistory();
    const { MENU_NEWS, MENU_VISITORS, MENU_LIKES, NO_EVENTS } = useTranslation();

    // get notifications on mount
    useEffect(() => {
        void (async () => {
            setisLoading(true);
            await dispatch(NewsFeedActionCreator.getNewsFeed());
            setisLoading(false);
        })();
    }, [dispatch]);

    // get notifications on reduce
    useEffect(() => {
        if (feed.length < displayedNotificationCount) {
            void (async () => {
                setisLoading(true);
                await dispatch(NewsFeedActionCreator.getNewsFeed());
                setisLoading(false);
            })();
        }
    }, [dispatch, displayedNotificationCount, feed.length]);
    // pull notifications in a specific interval
    useEffect(() => {
        const interval = window.setInterval(() => {
            dispatch(NewsFeedActionCreator.getNewsFeed());
        }, Config.REFRESH_NOTIFICATIONS_INTERVAL);

        return () => {
            if (interval) {
                window.clearInterval(interval);
            }
        };
    }, [dispatch]);

    const handleFeedDismiss = useCallback((feed: IFeed) => dispatch(NewsFeedActionCreator.readNewsFeed(feed)), [dispatch]);

    const handleFeedClick = useCallback(
        async (feed: IFeed) => {
            if (feed.Unlocked) {
                if (token && user) {
                    const [us] = await (await DirectInteractionActionCreator.fetchStrangerUser(feed.Profilid, token, user)).json();
                    setUnlockUser(us);
                }
            } else {
                switch (feed.Pushtyp) {
                    case PushTypMap.explorer: {
                        history.push(EXPLORER_PATH);
                        break;
                    }
                    case PushTypMap.like: {
                        history.push(LIKES_PATH);
                        break;
                    }
                    case PushTypMap.visit: {
                        history.push(STRANGER_PROFILE_PATH.replace(':id?', feed.Profilid));
                        break;
                    }
                    case PushTypMap.message: {
                        history.push(MESSAGES_PATH.replace(':id?', feed.Profilid));
                        break;
                    }
                    case PushTypMap.match: {
                        if (token && user) {
                            const [us] = await (await DirectInteractionActionCreator.fetchStrangerUser(feed.Profilid, token, user)).json();
                            setmatchUser(us);
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        },
        [history, token, user]
    );

    const handleUnlockProfile = useCallback(async () => {
        const cost = Config.UNLOCK_USER_AMOUNT;
        const imageId = unlockUser?.Profilid ?? '';
        if (user && getBalance(user) >= cost) {
            await dispatch(LikesActionCreator.unlockUser(1, imageId, cost));
            setUnlockUser(undefined);
        } else {
            setUnlockUser(undefined);
        }
    }, [dispatch, unlockUser?.Profilid, user]);

    const handleShopClick = useCallback(() => history.push(SHOP_PATH), [history]);

    const isDesktop = useMediaQuery('(min-width:768px)', { defaultMatches: true });
    const messageFeed = feed.filter((item) => item.Pushtyp === PushTypMap.support);
    const likesFeed = feed.filter((item) => item.Pushtyp === PushTypMap.like);
    const visitorsFeed = feed.filter((item) => item.Pushtyp === PushTypMap.visit);
    const { type } = useContext(ThemeContext);

    return (
        <>
            <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'block' }, justifyContent: 'space-between', padding: isDesktop ? 2 : 0 }}>
                <Paper
                    elevation={0}
                    className="spacing double  all flex user-card-grid"
                    style={{ minHeight: 739, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                >
                    <div className="newsfeed flex column spacing double margin top bottom">
                        <Typography
                            sx={{
                                p: !isDesktop ? 1 : 0,
                                my: !isDesktop ? 2 : 1,
                                mx: 'auto',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '10px ',
                                width: !isDesktop ? '150px' : 1,
                                bgcolor: !isDesktop && type === 'dark' ? 'rgb(80, 80, 80)' : null,
                            }}
                            variant="overline"
                        >
                            {MENU_NEWS}
                        </Typography>
                        {messageFeed.length === 0 && !isLoading && (
                            <div className="flex column centered spacing double margin left right text-align-center">
                                <EmptyState
                                    image={img}
                                    title={NO_EVENTS}
                                    imageStyles={{ maxWidth: '100%' }}
                                    titleStyle={{ fontWeight: 300, fontSize: '1.1rem' }}
                                />
                            </div>
                        )}

                        {isLoading && <LoadingOverlay />}

                        <div className="flex column">
                            <NewsFeedList feed={messageFeed} handleFeedDismiss={handleFeedDismiss} handleFeedClick={handleFeedClick} />
                        </div>
                    </div>
                </Paper>
                {!isDesktop && <Divider />}
                <Paper elevation={0} className="spacing double  all flex user-card-grid" style={{ minHeight: 739 }}>
                    <Box className="newsfeed flex column spacing double  top bottom" style={{ marginInline: '30px' }}>
                        <Typography
                            sx={{
                                p: !isDesktop ? 1 : 0,
                                my: !isDesktop ? 2 : 1,
                                mx: 'auto',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '10px ',
                                width: !isDesktop ? '150px' : 1,
                                bgcolor: !isDesktop && type === 'dark' ? 'rgb(80, 80, 80)' : null,
                            }}
                            variant="overline"
                        >
                            {MENU_VISITORS}
                        </Typography>
                        {visitorsFeed.length === 0 && !isLoading && (
                            <div className="flex column centered spacing double margin left right text-align-center">
                                <EmptyState
                                    image={img}
                                    title={NO_EVENTS}
                                    imageStyles={{ maxWidth: '100%' }}
                                    titleStyle={{ fontWeight: 300, fontSize: '1.1rem' }}
                                />
                            </div>
                        )}

                        {isLoading && <LoadingOverlay />}

                        <div
                            className="flex column"
                            style={{
                                minHeight: 739,
                            }}
                        >
                            {/* <VisitorsPage/> */}
                            <NewsFeedList feed={visitorsFeed} handleFeedDismiss={handleFeedDismiss} handleFeedClick={handleFeedClick} />
                        </div>
                    </Box>
                </Paper>
                {!isDesktop && <Divider />}
                <Paper elevation={0} className="spacing double  all flex user-card-grid">
                    <div className="newsfeed flex column spacing double margin top bottom">
                        <Typography
                            sx={{
                                p: !isDesktop ? 1 : 0,
                                my: !isDesktop ? 2 : 1,
                                mx: 'auto',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '10px ',
                                width: !isDesktop ? '100px' : 1,
                                bgcolor: !isDesktop && type === 'dark' ? 'rgb(80, 80, 80)' : null,
                            }}
                            variant="overline"
                        >
                            {MENU_LIKES}
                        </Typography>
                        {/*{likesFeed.length === 0 && !isLoading && (
                            <div className="flex column centered spacing double margin left right text-align-center">
                                <EmptyState
                                    image={img}
                                    title={NO_EVENTS}
                                    imageStyles={{ maxWidth: '100%' }}
                                    titleStyle={{ fontWeight: 300, fontSize: '1.1rem' }}
                                />
                            </div>
                        )}*/}

                        {isLoading && <LoadingOverlay />}

                        <div
                            className="flex column"
                            style={{
                                minHeight: 739,
                                maxHeight: 120,
                            }}
                        >
                            <LikesPage feed={likesFeed} />
                            {/*<NewsFeedList feed={likesFeed} handleFeedDismiss={handleFeedDismiss} handleFeedClick={handleFeedClick} />*/}
                        </div>
                    </div>
                </Paper>
            </Box>
            {matchUser && user && (
                <MatchDialog open={Boolean(matchUser)} onClose={() => setmatchUser(undefined)} user={user} strangerUser={matchUser} />
            )}

            {unlockUser && user && (
                <UnlockProfileDialog
                    strangerUser={unlockUser}
                    image={generateValidUrl(getProfileImage(unlockUser))}
                    insufficientCoins={getBalance(user) < Config.UNLOCK_USER_AMOUNT}
                    price={Config.UNLOCK_USER_AMOUNT}
                    onLoadCoins={handleShopClick}
                    onUnlockPress={handleUnlockProfile}
                    open={Boolean(unlockUser)}
                    onClose={() => setUnlockUser(undefined)}
                />
            )}
        </>
    );
});

export default NewsFeed;


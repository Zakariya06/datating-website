import './ChatInterface.scss';

import { faBars, faEllipsisV, faStar } from '@fortawesome/pro-light-svg-icons';
import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';
import { Avatar, Divider, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LikesActionCreator from '../../../actions/LikesActionCreator';
import Icon from '../../../components/Icon';
import Config from '../../../config';
import generateValidUrl from '../../../core/fetch/generateValidUrl';
import { IDialog } from '../../../models/chat/IDialog';
import { STRANGER_PROFILE_PATH } from '../../../models/Paths';
import { IState } from '../../../models/state';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import ChatActionCreator from '../../../services/Chat/actions/ChatActionCreator';
import { getStars } from '../../../services/Chat/selectors/ChatSelectors';
import NotificationActionCreator from '../../../services/Notifications/actions/NotificationActionCreator';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatOptionsMenu from './ChatOptionsMenu/ChatOptionsMenu';
import PurchaseStarsDialog from './PurchaseStarsDialog';
import { UnsetFavoritDialog } from './UnsetFavoritDialog/UnsetFavoritDialog';
import { Circle } from '@mui/icons-material';
import ThemeContext from 'theme/ThemeContext';

export interface IChatInterfaceProps {
    dialog: IDialog;
    openDrawer(): void;
}

export function ChatInterface(props: IChatInterfaceProps) {
    const { dialog, openDrawer } = props;
    const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [openPurchaseStarsDialog, setOpenPurchaseStarsDialog] = useState<boolean>(false);
    const [openUnsetFavoritDialog, setOpenUnsetFavoritDialog] = useState<boolean>(false);

    const { stars, user } = useSelector((state: IState) => ({ stars: getStars(state), user: getUser(state) }), shallowEqual);

    const didMount = useRef<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const { uuid, partner, chatMessages, isFavorite = false } = dialog;
    const { photo, age, name, id, unread, isOnline } = partner ?? {};

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    const handleOptionsOpen = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorElOptions(event.currentTarget), []);
    const handleOptionsClose = useCallback(() => setAnchorElOptions(null), []);

    const handleOpenUnsetFavoritDialog = () => {
        setOpenUnsetFavoritDialog(true);
    };

    const handleCloseUnsetFavoritDialog = () => {
        setOpenUnsetFavoritDialog(false);
    };

    const handleDelete = useCallback(() => dispatch(ChatActionCreator.deleteDialog(uuid)), [uuid, dispatch]);

    useEffect(() => {
        const chatId = uuid;
        void (async () => {
            setLoading(true);
            await dispatch(ChatActionCreator.refresh(uuid));
            setLoading(false);
            didMount.current = true;
        })();

        const interval = setInterval(() => dispatch(ChatActionCreator.getNewMessages(uuid)), Config.REFRESH_CHAT_INTERVAL);
        return () => {
            dispatch(ChatActionCreator.removeTempDialog(chatId));
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if ((unread || 0) > 0) {
            dispatch(ChatActionCreator.readDialog(uuid));
        }
    }, [dispatch, unread, uuid]);

    const handleUserClick = () => history.push(STRANGER_PROFILE_PATH.replace(':id?', id), { profileId: id });
    const { type } = useContext(ThemeContext);
    const handleRefreshDialog = useCallback(() => dispatch(ChatActionCreator.refresh(uuid)), [dispatch, uuid]);

    const setFavorite = useCallback(async () => {
        if (stars < 1) {
            setOpenPurchaseStarsDialog(true);
            dispatch(
                NotificationActionCreator.enqueueSnackbar({
                    key: String(new Date().getTime() + Math.random()),
                    message: 'Du hast nicht genügend Sterne auf deinem Konto!',
                    options: { variant: 'error' },
                })
            );
        } else {
            if (!isFavorite) {
                await dispatch(ChatActionCreator.setFavorite(dialog.partner));
                dispatch(ChatActionCreator.getStarsAmount());
            }
        }
    }, [dialog.partner, dispatch, isFavorite, stars]);

    const unsetFavorit = useCallback(async () => {
        await dispatch(ChatActionCreator.unsetFavorite(dialog.partner));
        handleCloseUnsetFavoritDialog();
    }, [dialog.partner, dispatch]);

    const handleBlockUser = useCallback(async () => {
        await dispatch(LikesActionCreator.blockUser(dialog.partner.id, dialog.partner.name));
        handleOptionsClose();
    }, [dialog.partner.id, dialog.partner.name, dispatch, handleOptionsClose]);

    return (
        <>
            <section
                className="chat-interface flex column"
                style={{
                    height: '80vh',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    background: type === 'light' ? 'white' : 'black',
                    overflow: 'hidden',
                }}
            >
                <section
                    className="flex no-grow justify-content-space-between align-items-center spacing padding all"
                    style={{
                        minHeight: 64,
                        background: type === 'light' ? 'white' : 'black',
                        borderBottom: '1px solid #e9ecef',
                        padding: '16px',
                    }}
                >
                    {!isDesktop && (
                        <div>
                            <IconButton onClick={openDrawer} style={{ color: '#495057' }}>
                                <Icon icon={faBars} />
                            </IconButton>
                        </div>
                    )}
                    <div className="flex chat-name" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
                        <Avatar src={generateValidUrl(photo)} style={{ overflow: 'visible', width: 40, height: 40 }} />
                        <div style={{ marginLeft: 12, color: '#495057', display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontWeight: 600, fontSize: '1.1rem' }} variant="h6">
                                {`${name}${age ? ` | ${age}` : ''}`}
                            </Typography>
                            <span style={{ marginLeft: 8 }}>
                                {isOnline ? (
                                    <Circle sx={{ color: '#19cea4', fontSize: '.8em' }} />
                                ) : (
                                    <Circle sx={{ color: '#ff6b6b', fontSize: '.8em' }} />
                                )}
                            </span>
                        </div>
                    </div>
                    {id !== 'support' && (
                        <>
                            <IconButton
                                style={{
                                    backgroundColor: isFavorite ? '#fdd932' : '#e9ecef',
                                    marginRight: 10,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={isFavorite ? handleOpenUnsetFavoritDialog : setFavorite}
                            >
                                <Icon iconColor={isFavorite ? '#ffffff' : '#495057'} icon={isFavorite ? faStarFilled : faStar} />
                            </IconButton>

                            <IconButton
                                style={{
                                    backgroundColor: '#e9ecef',
                                    marginRight: 10,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={handleOptionsOpen}
                            >
                                <Icon icon={faEllipsisV} />
                            </IconButton>
                        </>
                    )}
                </section>

                <Divider variant="fullWidth" style={{ margin: 0 }} />

                <section
                    className="flex column"
                    style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        background: type === 'light' ? 'white' : 'black',
                    }}
                >
                    <ChatList chatMessages={chatMessages} user={user} chatPartner={partner} isLoading={loading} />
                </section>

                <section
                    style={{
                        padding: '16px',
                        borderTop: '1px solid #e9ecef',
                        background: type === 'light' ? 'white' : 'black',
                    }}
                >
                    {user && dialog && (
                        <ChatInput
                            user={user}
                            dialogId={uuid}
                            partnerId={id}
                            userName={partner.name}
                            canSendIcebreaker={chatMessages.length === 0}
                            onSend={handleRefreshDialog}
                        />
                    )}
                </section>
            </section>

            <ChatOptionsMenu
                open={Boolean(anchorElOptions)}
                anchorEl={anchorElOptions}
                onBlockClick={handleBlockUser}
                onClose={handleOptionsClose}
                onDeleteClick={handleDelete}
            />

            <PurchaseStarsDialog stars={stars} open={openPurchaseStarsDialog} onClose={() => setOpenPurchaseStarsDialog(false)} />
            <UnsetFavoritDialog
                name={dialog.partner.name}
                open={openUnsetFavoritDialog}
                handleClose={handleCloseUnsetFavoritDialog}
                handleUnset={unsetFavorit}
            />
        </>
    );
}

export default ChatInterface;


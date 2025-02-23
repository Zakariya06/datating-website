import { Badge, Divider, Icon, IconButton, InputAdornment, Paper, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import emptyStateImage from '../../../assets/images/emptyStates/noChats.png';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { IDialog } from '../../../models/chat/IDialog';
import { MESSAGES_PATH } from '../../../models/Paths';
import { IState } from '../../../models/state';
import ChatActionCreator from '../../../services/Chat/actions/ChatActionCreator';
import { getChats, getStars } from '../../../services/Chat/selectors/ChatSelectors';
import useTranslation from '../../../services/i18n/core/useTranslation';
import ChatInterface from './ChatInterface';
import ChatOverview from './ChatOverview';
import PurchaseStarsDialog from './PurchaseStarsDialog';
import { ResponsiveChatDrawer } from './ResponsiveChatDrawer/ResponsiveChatDrawer';
import ThemeContext from 'theme/ThemeContext';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import generateValidUrl from 'core/fetch/generateValidUrl';
import Config from 'config';
import zIndex from '@material-ui/core/styles/zIndex';

export interface IMessagesPageProps extends RouteComponentProps<{ id?: string }> {}

export const MessagesPage = (props: IMessagesPageProps) => {
    const { history, match } = props;
    const { id } = match.params;
    const [selectedDialog, setselectedDialog] = useState<IDialog | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { stars, chats } = useSelector((state: IState) => ({ stars: getStars(state), chats: getChats(state) }), shallowEqual);

    const isUser: any[] = chats;
    const { CHAT_EMPTYSTATE } = useTranslation();
    const [value, setValue] = useState<number>(0);
    const [openPurchaseStarDialog, setOpenPurchaseStarDialog] = useState<boolean>(false);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    const handleOpenPurchaseStarDialog = useCallback(() => setOpenPurchaseStarDialog(true), [setOpenPurchaseStarDialog]);
    const handleClosePurchaseStarDialog = useCallback(() => setOpenPurchaseStarDialog(false), [setOpenPurchaseStarDialog]);

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const isMobile = useMediaQuery('(max-width:430px)', { defaultMatches: true });
    const { type } = useContext(ThemeContext);

    const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue), []);

    useEffect(() => {
        batch(() => {
            dispatch(ChatActionCreator.refresh());
            dispatch(ChatActionCreator.getStarsAmount());
        });
    }, [dispatch]);

    useEffect(() => {
        if (chats.length > 0 && !selectedDialog) {
            const chat = id ? chats.find((x) => x.uuid === id) : chats[0];
            setselectedDialog(chat);
            if (!id && chat) {
                history.push(MESSAGES_PATH.replace(':id?', chat.uuid));
            }
        } else if (chats.length > 0 && selectedDialog) {
            setselectedDialog(chats.find((x) => x.uuid === selectedDialog.uuid));
        } else if (chats.length === 0) {
            setselectedDialog(undefined);
        }
    }, [chats, history, id, selectedDialog]);

    const handleChatClick = useCallback(
        (newDialog: IDialog) => {
            setselectedDialog(newDialog);
            history.push(MESSAGES_PATH.replace(':id?', newDialog.uuid));
            if (!isDesktop) {
                setOpenDrawer(false);
            }
            setIsChatOpen(true);
        },
        [history, setOpenDrawer, isDesktop]
    );

    const photos = useMemo(() => isUser.map((e) => generateValidUrl(e.partner.photo)), [isUser]);

    return (
        <>
            {isMobile && (
                <>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', overflowX: 'scroll', width: '100%',position:'relative' }}>
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                objectFit: 'cover',
                            }}
                        />
                        <IconButton
                            style={{ position: 'absolute', bottom: 0, left: 40, backgroundColor: Config.GLOBAL_PRIMARY_COLOR, zIndex: 999, borderRadius: 50,padding:0 }}
                        >
                            <Add fontSize='small' sx={{color:'white'}}/>
                        </IconButton>
                        {isUser.map((e, index) => (
                            <Avatar src={photos[index]}
                             sx={{ width: 60, height: 60, borderRadius: 50, objectFit: 'cover' }}
                              />
                        ))}
                    </Box>

                    <Tabs scrollButtons="off" indicatorColor="primary" textColor="primary" value={value} onChange={handleChange} className="flex">
                        <Tab
                            value={0}
                            disableRipple
                            label={
                                <Badge color="error">
                                    <Typography color="inherit">ALLE</Typography>
                                </Badge>
                            }
                        />

                        <Tab
                            value={1}
                            disableRipple
                            label={
                                <Badge color="error">
                                    <Typography color="inherit">NICHT&nbsp;GELESEN</Typography>
                                </Badge>
                            }
                        />
                        <Tab
                            value={3}
                            disableRipple
                            label={
                                <Badge color="error">
                                    <Typography color="inherit">ONLINE</Typography>
                                </Badge>
                            }
                        />
                    </Tabs>
                    <TextField
                        placeholder="Suche"
                        variant="outlined"
                        fullWidth
                        sx={{
                            bgcolor: '#D4D4D4',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </>
            )}

            <div className="flex messageSection" style={{ padding: isDesktop ? 24 : 0 }}>
                {isDesktop ? (
                    <Paper className="flex row" style={{ maxHeight: '100vh', backgroundColor: type === 'light' ? 'white' : 'black' }}>
                        <ChatOverview
                            stars={stars}
                            openPurchaseStarsDialog={handleOpenPurchaseStarDialog}
                            chats={chats}
                            onChatClick={handleChatClick}
                            selectedDialog={selectedDialog}
                        />
                        <Divider flexItem orientation="vertical" />
                        {selectedDialog && <ChatInterface openDrawer={() => setOpenDrawer(true)} key={selectedDialog.uuid} dialog={selectedDialog} />}
                        {!selectedDialog && chats.length === 0 && (
                            <EmptyState image={emptyStateImage} imageStyles={{ height: 250 }} title={CHAT_EMPTYSTATE} />
                        )}
                    </Paper>
                ) : (
                    <>
                        {/* <ResponsiveChatDrawer
                            onClose={() => setOpenDrawer(false)}
                            stars={stars}
                            open={openDrawer}
                            chats={chats}
                            onChatClick={handleChatClick}
                            selectedDialog={selectedDialog}
                            openPurchaseStarDialog={handleOpenPurchaseStarDialog}
                        /> */}
                        {isMobile && (
                            <>
                                {isChatOpen === false && (
                                    <ChatOverview
                                        stars={stars}
                                        openPurchaseStarsDialog={handleOpenPurchaseStarDialog}
                                        chats={chats}
                                        onChatClick={handleChatClick}
                                        selectedDialog={selectedDialog}
                                    />
                                )}
                            </>
                        )}

                        {isMobile ? (
                            <>
                                {isChatOpen && (
                                    <Paper style={{ width: '100%' }} className="flex column">
                                        {selectedDialog && (
                                            <ChatInterface
                                                openDrawer={() => setOpenDrawer(true)}
                                                key={selectedDialog.uuid}
                                                dialog={selectedDialog}
                                                isChatOpen={() => setIsChatOpen(false)}
                                            />
                                        )}
                                        {!selectedDialog && chats.length === 0 && (
                                            <EmptyState image={emptyStateImage} imageStyles={{ height: 250 }} title={CHAT_EMPTYSTATE} />
                                        )}
                                    </Paper>
                                )}
                            </>
                        ) : (
                            <>
                                <Paper style={{ width: '100%' }} className="flex column">
                                    {selectedDialog && (
                                        <ChatInterface openDrawer={() => setOpenDrawer(true)} key={selectedDialog.uuid} dialog={selectedDialog} />
                                    )}
                                    {!selectedDialog && chats.length === 0 && (
                                        <EmptyState image={emptyStateImage} imageStyles={{ height: 250 }} title={CHAT_EMPTYSTATE} />
                                    )}
                                </Paper>
                            </>
                        )}
                    </>
                )}
                <PurchaseStarsDialog stars={stars} open={openPurchaseStarDialog} onClose={handleClosePurchaseStarDialog} />
            </div>
        </>
    );
};

export default MessagesPage;


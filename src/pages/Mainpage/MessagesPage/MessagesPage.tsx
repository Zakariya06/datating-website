import { Divider, Paper, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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

export interface IMessagesPageProps extends RouteComponentProps<{ id?: string }> {}

export const MessagesPage = (props: IMessagesPageProps) => {
    const { history, match } = props;
    const { id } = match.params;
    const [selectedDialog, setselectedDialog] = useState<IDialog | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { stars, chats } = useSelector((state: IState) => ({ stars: getStars(state), chats: getChats(state) }), shallowEqual);
    const { CHAT_EMPTYSTATE } = useTranslation();
    const [openPurchaseStarDialog, setOpenPurchaseStarDialog] = useState<boolean>(false);

    const handleOpenPurchaseStarDialog = useCallback(() => setOpenPurchaseStarDialog(true), [setOpenPurchaseStarDialog]);
    const handleClosePurchaseStarDialog = useCallback(() => setOpenPurchaseStarDialog(false), [setOpenPurchaseStarDialog]);

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const { type } = useContext(ThemeContext);

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
        },
        [history, setOpenDrawer, isDesktop]
    );

    return (
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
                    <ResponsiveChatDrawer
                        onClose={() => setOpenDrawer(false)}
                        stars={stars}
                        open={openDrawer}
                        chats={chats}
                        onChatClick={handleChatClick}
                        selectedDialog={selectedDialog}
                        openPurchaseStarDialog={handleOpenPurchaseStarDialog}
                    />
                    <Paper style={{ width: '100%' }} className="flex column">
                        {selectedDialog && <ChatInterface openDrawer={() => setOpenDrawer(true)} key={selectedDialog.uuid} dialog={selectedDialog} />}
                        {!selectedDialog && chats.length === 0 && (
                            <EmptyState image={emptyStateImage} imageStyles={{ height: 250 }} title={CHAT_EMPTYSTATE} />
                        )}
                    </Paper>
                </>
            )}
            <PurchaseStarsDialog stars={stars} open={openPurchaseStarDialog} onClose={handleClosePurchaseStarDialog} />
        </div>
    );
};

export default MessagesPage;


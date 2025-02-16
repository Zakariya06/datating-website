import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { FixedSizeList } from 'react-window';
import Box from '@material-ui/core/Box';
import { IDialog } from '../../../../models/chat/IDialog';
import ChatListItem from './ChatListItem';
import { RestoreOutlined } from '@mui/icons-material';
import ChatUnlockDialog from './ChatUnlockDialog/ChatUnlockDialog';
import { unescape } from 'lodash';
import InsufficientCoinsDialog from 'components/InsufficientCoinsDialog';
import { IState } from 'models/state';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getRestoreChatStatus } from 'services/Chat/selectors/ChatSelectors';
import ChatActionCreator from 'services/Chat/actions/ChatActionCreator';
import ThemeContext from 'theme/ThemeContext';

export interface IChatOverviewListProps {
    selectedDialogId?: string;
    chats: IDialog[];
    onChatClick(chat: IDialog): void;
    offen?: number | undefined;
}

export const ChatOverviewList = memo((props: IChatOverviewListProps) => {
    const { chats, onChatClick, selectedDialogId, offen } = props;
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
    const [currentChatUuid, setCurrentChatUuid] = useState<string | null>(null);
    const [currentChatpartner, setCurrentChatpartner] = useState<string>('');
    const [currentLastMessageTime, setCurrentLastMessageTime] = useState<string | undefined>(undefined);
    const [isCoinModalOpen, setisCoinModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { restoreChatStatus } = useSelector((state: IState) => ({ restoreChatStatus: getRestoreChatStatus(state) }), shallowEqual);
    const { type } = useContext(ThemeContext);
    const handleClose = useCallback(() => {
        setisCoinModalOpen(false);
        setCurrentChatUuid(null);
    }, []);
    const handleOpen = useCallback(() => {
        setCurrentChatUuid(null);
        setisCoinModalOpen(true);
    }, []);
    const handleRestoreClick = (chat: IDialog) => {
        setCurrentChatUuid(chat.uuid);
        setIsUnlocked(true);
        setCurrentChatpartner(chat.partner.name);
        setCurrentLastMessageTime(chat.lastMessage?.datetime);
    };

    useEffect(() => {
        if (restoreChatStatus === 'Success' && currentChatUuid) {
            setIsUnlocked(false);
            dispatch(ChatActionCreator.restoreChatStatus());
            window.location.reload();
        } else if (restoreChatStatus === 'Error' && currentChatUuid) {
            setIsUnlocked(false);
            handleOpen();
            dispatch(ChatActionCreator.restoreChatStatus());
        }
    }, [restoreChatStatus]);

    return (
        <AutoSizer>
            {({ width, height }) => (
                <FixedSizeList
                    itemData={chats}
                    itemCount={chats.length}
                    itemSize={112}
                    width={width ?? 320}
                    height={height}
                    style={{ listStyle: 'none' }}
                >
                    {({ index, data, style }) => {
                        const chat = data[index];
                        return (
                            <div style={{ ...style, background: type === 'light' ? 'white' : 'black' }} key={chat.uuid}>
                                <ChatListItem dialog={chat} onChatClick={onChatClick} selected={chat.uuid === selectedDialogId} />
                                {chat.offen == '-1' && chat.uuid != 'support' ? (
                                    <Box
                                        width={width}
                                        position={'absolute'}
                                        top={0}
                                        height={style.height ?? 112}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        bgcolor={'#00060a60'}
                                        color={'white'}
                                        borderRadius={'16px'}
                                    >
                                        <RestoreOutlined sx={{ cursor: 'pointer' }} onClick={() => handleRestoreClick(chat)} />
                                    </Box>
                                ) : null}
                                <ChatUnlockDialog
                                    open={isUnlocked}
                                    onClose={() => {
                                        setIsUnlocked(false);
                                        setCurrentChatUuid(null);
                                    }}
                                    uuid={currentChatUuid}
                                    setIsUnlocked={setIsUnlocked}
                                    chatPartner={currentChatpartner}
                                    lastMessageTime={currentLastMessageTime}
                                />
                                {isCoinModalOpen && <InsufficientCoinsDialog open={isCoinModalOpen} onClose={handleClose} />}
                            </div>
                        );
                    }}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
});

export default ChatOverviewList;


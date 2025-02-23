import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGift, faCamera, faFont, faFontCase, faGifts } from '@fortawesome/pro-light-svg-icons';
import { IconButton, InputAdornment, TextField, Typography, styled } from '@material-ui/core';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import IceBreakerIconButton from '../../../components/IceBreaker/IceBreakerIconButton';
import Icon from '../../../components/Icon';
import { useConsumeCoinsHandler } from '../../../components/InsufficientCoinsDialog/useConsumeCoinsHandler';
import Config from '../../../config';
import { IUser, getBalance } from '../../../models/user/IUser';
import ChatActionCreator from '../../../services/Chat/actions/ChatActionCreator';
import useTranslation from '../../../services/i18n/core/useTranslation';
import ChatGiftComponent from './ChatGiftComponent';
import { ChatMessageTypes } from 'models/chat/ChatMessageType';
import NotificationActionCreator from 'services/Notifications/actions/NotificationActionCreator';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gif, GifBoxOutlined } from '@mui/icons-material';

export interface IChatInputProps {
    dialogId: string;
    userName: string;
    user?: IUser;
    partnerId: string;
    canSendIcebreaker?: boolean;
    onSend?(): void;
}

export const ChatInput = memo((props: IChatInputProps) => {
    const { dialogId, user, partnerId, userName, onSend, canSendIcebreaker } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputReff = useRef<HTMLInputElement | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const [inputValue, setinputValue] = useState<string>('');
    const { CHAT_INTERFACE_SEND_A_MESSAGE } = useTranslation();

    const handleGiftsClick = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), []);
    const handleGiftsClose = useCallback(() => setAnchorEl(null), []);

    const handleSend = useCallback(async () => {
        const trimmedValue = inputRef.current?.value.trim() ?? '';
        // eslint-disable-next-line no-console
        console.log('trimmedValue', trimmedValue);
        if (getBalance(user!) >= Config.SEND_MESSAGE_AMOUNT && trimmedValue.length > 0) {
            await dispatch(ChatActionCreator.sendMessage(dialogId, trimmedValue, ChatMessageTypes.MESSAGE, user!.Userid));

            onSend && onSend();
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        } else {
            if (trimmedValue.length < 1) {
                // Keyboard will close when message is empty and clicking on enter
            } else {
                // setModalOpen(true);
            }
        }
    }, [dialogId, dispatch, user, onSend]);

    const handler = useConsumeCoinsHandler(handleSend, Config.SEND_MESSAGE_AMOUNT);

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            await handler();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue(e.currentTarget.value);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        const maxFileSize = 8 * 1024 * 1024; // 8 MB

        if (files && files.length > 0) {
            const file = files[0];

            if (file.size > maxFileSize) {
                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: 'Max file size is 8MB',
                        options: { variant: 'error' },
                    })
                );
                return;
            }

            const reader = new FileReader();

            reader.onloadend = async () => {
                // Dispatch the action to send the file
                await dispatch(ChatActionCreator.sendMessage(dialogId, reader.result as string, ChatMessageTypes.ZWINKER, user!.Userid));
                onSend && onSend();
            };

            reader.readAsDataURL(file);
        }
    };
    const handleFileClick = () => {
        inputReff.current?.click(); // Trigger the click on the hidden file input
    };
    const coinsMulti = Math.ceil(inputValue.length / Config.MAX_MESSAGE_CHARS);

    return (
        <>
            <article className="flex" style={{ alignItems: 'center' }}>
                    <Box sx={{display:'flex'}}>
                        {canSendIcebreaker && <IceBreakerIconButton Profilid={partnerId} Username={userName} onSend={onSend} />}
                        {partnerId !== 'support' && (
                            <IconButton onClick={handleFileClick}>
                                <Icon icon={faFontCase} />
                            </IconButton>
                        )}
                        {partnerId !== 'support' && (
                            <IconButton onClick={handleFileClick}>
                                <Icon icon={faCamera} />
                            </IconButton>
                        )}

                        {partnerId !== 'support' && (
                            <IconButton onClick={handleGiftsClick}>
                                <Icon icon={faGift}/>
                            </IconButton>
                        )}
                        {partnerId !== 'support' && (
                            <IconButton onClick={handleGiftsClick}>
                                <Gif fontSize='large'/>
                            </IconButton>
                        )}
                     {/* {/<Picker onEmojiClick={onEmojiClick} />/} */}
                </Box>
                <TextField
                    fullWidth
                    // placeholder={CHAT_INTERFACE_SEND_A_MESSAGE}
                    inputRef={inputRef}
                    type="text"
                    className="chatboxField"
                    variant='standard'
                    onKeyPress={handleEnter}
                    onChange={handleChange}
                    disabled={partnerId === 'support' ? true : false}
                />
                <input
                    accept="image/, video/"
                    type="file"
                    id="file-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={inputReff}
                />

                <IconButton
                    style={{
                        position: 'relative',
                        marginTop: 4,
                    }}
                    onClick={handler}
                >
                    <Typography variant="caption" style={{ fontWeight: 600 }}>
                        Senden
                    </Typography>
                </IconButton>
            </article>
            <ChatGiftComponent
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleGiftsClose}
                user={user}
                partnerId={partnerId}
                partnerUsername={userName}
                onSend={onSend}
            />
        </>
    );
});

export default ChatInput;
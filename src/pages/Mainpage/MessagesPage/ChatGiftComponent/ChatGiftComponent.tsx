import './ChatGiftComponent.scss';

import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { IconButton, Popover, Typography, useTheme } from '@material-ui/core';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../../../../components/Icon';
import { ChatMessageTypes } from '../../../../models/chat/ChatMessageType';
import { IUser, getBalance } from '../../../../models/user/IUser';
import { getPresents } from '../../../../selectors/ShopSelectors';
import ChatActionCreator from '../../../../services/Chat/actions/ChatActionCreator';
import ResourceService from '../../../../services/i18n';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import { IBerndPresent } from '../../../../temp/models/IBerndPresent';
import GiftShopItem from './GiftShopItem';

export interface IChatGiftComponentProps {
    user?: IUser;
    partnerId: string;
    partnerUsername: string;

    open: boolean;
    anchorEl: HTMLElement | null;
    onSend?(): void;
    onClose(): void;
}

export const ChatGiftComponent = memo((props: IChatGiftComponentProps) => {
    const { open, anchorEl, onClose, user, partnerId, partnerUsername, onSend } = props;
    // const arrowRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const theme = useTheme();
    const presents = useSelector(getPresents);
    const { PRESENTS_TITLE } = useTranslation();

    const handleSendPresent = useCallback(
        async (present: IBerndPresent) => {
            const id = present.Picture;
            if (user && getBalance(user) >= present.Coins && id.length > 0) {
                await dispatch(ChatActionCreator.sendMessage(partnerId, id, ChatMessageTypes.PRESENT, user.Userid));
                onClose();
                onSend && onSend();
            } else {
                if (id.length < 1) {
                    // Keyboard will close when message is empty and clicking on enter
                } else {
                    // setModalOpen(true);
                    // setNoCoins(true);
                }
            }
        },
        [partnerId, dispatch, user, onClose, onSend]
    );

    return (
        <Popover
            open={open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            onClose={onClose}
        >
            {/* <div id="arrow" data-popper-arrow className="arrow" ref={arrowRef} /> */}
            <div className={`flex column chat-gift-popper ${theme.palette.type}`}>
                <div className="flex justify-content-space-between align-items-center">
                    <Typography variant="body2">{ResourceService.replace(PRESENTS_TITLE, { name: partnerUsername })}</Typography>

                    <IconButton onClick={onClose} size="small">
                        <Icon icon={faTimes} fontSize="small" />
                    </IconButton>
                </div>

                <div className="chat-gift-popper-content flex wrap">
                    {presents?.map((present: IBerndPresent) => (
                        <GiftShopItem key={present.Picture} {...present} onSendGift={handleSendPresent} />
                    ))}
                </div>
            </div>
        </Popover>
    );
});

export default ChatGiftComponent;

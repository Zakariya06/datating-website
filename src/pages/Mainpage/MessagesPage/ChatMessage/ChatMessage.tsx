import { Link, Typography } from '@material-ui/core';
import { memo, useState } from 'react';

import Config from '../../../../config';
import formatDate, { DateFormats } from '../../../../core/formatDate';
import { ChatMessageTypes } from '../../../../models/chat/ChatMessageType';
import { IChatMessage } from '../../../../models/chat/IChatMessage';
import ResourceService from '../../../../services/i18n';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import WarnExternalLinkDialog from './WarnExternalLinkDialog';

export interface IChatMessageComponentProps extends IChatMessage {
    isSender: boolean;
    chatPartnerName: string;
    isDark: boolean;
}

export const ChatMessage = memo((props: IChatMessageComponentProps) => {
    const { type, message, datetime, chatPartnerName, isSender, isDark } = props;
    const { CHAT_GOT_A_BLINK, CHAT_SENT_A_BLINK } = useTranslation();

    const isLink = message ? isValidURL(message) : false;
    const isImage = message ? isImageCheck(message) : false;
    const isVideo = message ? isValidVideoURL(message) : false;
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    if (type === ChatMessageTypes.ZWINKER) {
        const text = ResourceService.replace(isSender ? CHAT_SENT_A_BLINK : CHAT_GOT_A_BLINK, { name: chatPartnerName });

        return (
            <div className="spacing padding all text-align-center">
                <Typography>{text}</Typography>
            </div>
        );
    } else if (type === ChatMessageTypes.PRESENT) {
        return (
            <div className={`chat-message ${isSender ? 'sender' : 'stranger'} ${isDark ? 'dark' : ''}`}>
                <img src={`${Config.BASE_URL_GIFT_IMAGE}${message}`} style={{ width: 100, height: 100 }} alt={`gift`} />
                <div className="text-align-right">
                    <Typography variant="caption" color="inherit" className="chat-message-date">
                        {formatDate(datetime, DateFormats.TIME)}
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={{ backgroundColor: isSender ? Config.GLOBAL_PRIMARY_COLOR : undefined }} className={`chat-message ${isSender ? 'sender' : 'stranger'} ${isDark ? 'dark' : ''}`}>
                {isLink && message ? (
                    <Link onClick={() => setOpenDialog(true)} color="inherit" className="pointer chat-message-text">
                        {message}
                    </Link>
                ) : isImage && message ? (
                    <img src={message} style={{ width: 100, height: 100 }} alt={`gift`} />
                ) : isVideo && message ? (
                        <video width={320} height={240} controls autoPlay loop muted poster="thumbnail.jpg">
                        <source src={message} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <Typography color="inherit" className="chat-message-text">
                        {message}
                    </Typography>
                )}

                <div className="text-align-right">
                    <Typography variant="caption" color="inherit" className="chat-message-date">
                        {formatDate(datetime, DateFormats.TIME)}
                    </Typography>
                </div>
            </div>
            {isLink && <WarnExternalLinkDialog onClose={() => setOpenDialog(false)} link={message} open={openDialog} />}
        </>
    );
});

export default ChatMessage;

const isImageCheck = (url: string) => /(data:image\/[^;]+;base64[^"]+)/.test(url);

const isValidURL = (url: string) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi.test(url);
};

const isValidVideoURL = (url: string) => {
    const dataUriRegex = /^data:video\/mp4;base64,[\w+/=]+$/;

    const isVideo = dataUriRegex.test(url);

    return isVideo;
};

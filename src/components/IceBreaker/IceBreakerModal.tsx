import './IceBreaker.scss';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import UserActionCreator from '../../actions/UserActionCreator';
import Config from '../../config';
import useUserAndToken from '../../core/useUserAndToken';
import { isError } from '../../models/core/error/IError';
import { MESSAGES_PATH } from '../../models/Paths';
import { IStrangerUser } from '../../models/user/IStrangerUser/IStrangerUser';
import ChatActionCreator from '../../services/Chat/actions/ChatActionCreator';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import { IBerndIcebreakerText } from '../../temp/models/IBerndIcebreakerText';
import Icon from '../Icon';
import { useConsumeCoinsHandler } from '../InsufficientCoinsDialog/useConsumeCoinsHandler';
import Modal from '../Modal';
import RoundButton from '../RoundButton';

export interface IIceBreakerModalProps {
    Username: string;
    Profilid: string;
    strangerUser?: IStrangerUser;
    open: boolean;
    onSend?(): void;
    onClose(): void;
}

export const IceBreakerModal = (props: IIceBreakerModalProps) => {
    const { strangerUser, open, onClose, Username, Profilid, onSend } = props;
    const [iceBreakerTexts, setIceBreakerTexts] = useState<IBerndIcebreakerText[]>([]);

    const { user, token } = useUserAndToken();
    const { ICEBREAKER_TITLE } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();

    useEffect(() => {
        if (user && token) {
            void (async () => {
                const res = await (await DirectInteractionActionCreator.getIcebreakerTexts(Profilid, token, user)).json();

                if (!isError(res)) {
                    setIceBreakerTexts(res);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendIcebreaker = async (textId: number) => {
        if (user && token) {
            await DirectInteractionActionCreator.sendIcebreakerText(Profilid, textId, token, user);
            if (strangerUser) {
                await dispatch(ChatActionCreator.createDialog(Username, strangerUser));
                history.push(MESSAGES_PATH.replace(':id?', Profilid));
            }
            onClose();
            await dispatch(UserActionCreator.refreshUser());
            onSend && onSend();
        }
    };

    const handler = useConsumeCoinsHandler(handleSendIcebreaker, Config.ICEBREAKER_AMOUNT);

    // eslint-disable-next-line max-len
    const icebreakerClassname = `ice-breaker-text ${theme.palette.type} flex row align-items-center justify-content-space-between spacing padding margin all`;

    return (
        <Modal open={open} onClose={onClose} title={ResourceService.replace(ICEBREAKER_TITLE, { name: Username })}>
            {iceBreakerTexts?.map(({ Text, Textid }) => (
                <div key={String(Textid)} className={icebreakerClassname}>
                    <Typography>{Text}</Typography>

                    <RoundButton
                        style={{ width: 36, height: 36 }}
                        onClick={() => handler(Textid)}
                        className="spacing margin right left"
                        icon={<Icon icon={faPaperPlane} fontSize="small" style={{ fontSize: '0.9rem' }} />}
                    />
                </div>
            ))}
        </Modal>
    );
};

export default IceBreakerModal;

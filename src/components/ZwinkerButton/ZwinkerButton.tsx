import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import UserActionCreator from '../../actions/UserActionCreator';
import WinkIcon from '../../assets/images/zwinkerIcon/wink.svg';
import Config from '../../config';
import { IUser } from '../../models/user/IUser';
import CardActionButton from '../../pages/Mainpage/components/CardActionButton';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import IconModal from '../IconModal';
import { useConsumeCoinsHandler } from '../InsufficientCoinsDialog/useConsumeCoinsHandler';
import { useHistory } from 'react-router-dom';
import { REGISTER_PATH } from 'models/Paths';

export interface IZwinkerButtonProps {
    profilId: string;
    username: string;

    token?: string;
    user?: IUser;
    variant?: 'icon' | 'fab';
}

export const ZwinkerButton = (props: IZwinkerButtonProps) => {
    const { profilId, username, token, user, variant } = props;

    const [zwinkerModalOpen, setZwinkerModalOpen] = useState<boolean>(false);
    const { CHAT_SENT_A_BLINK, STRANGER_BLINK_TITLE, STRANGER_BLINK_SUBTITLE, STRANGER_BLINK_BUTTON } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOpenZwinkerModal = useCallback(() => setZwinkerModalOpen(true), []);
    const handler = useConsumeCoinsHandler(handleOpenZwinkerModal, Config.SEND_ZWINKER_AMOUNT);

    const handleZwinkerClick = useCallback(async () => {
        await DirectInteractionActionCreator.sendZwinkerMessage(profilId, token, user);
        setZwinkerModalOpen(false);
        dispatch(
            NotificationActionCreator.enqueueSnackbar({
                key: String(new Date().getTime() + Math.random()),
                message: ResourceService.replace(CHAT_SENT_A_BLINK, { name: username }),
                options: { variant: 'success' },
            })
        );
        if(!user && !token){
            history.push(REGISTER_PATH);
        }
        await dispatch(UserActionCreator.refreshUser());

        //history.push(MESSAGES_PATH.replace(':id?', profilId));
    }, [profilId, token, user, dispatch, CHAT_SENT_A_BLINK, username]);

    return (
        <>
            <CardActionButton type="wink" onClick={handler} variant={variant} />
            {zwinkerModalOpen && (
                <IconModal
                    open={zwinkerModalOpen}
                    onClose={() => setZwinkerModalOpen(false)}
                    icon={WinkIcon}
                    title={STRANGER_BLINK_TITLE}
                    text={ResourceService.replace(STRANGER_BLINK_SUBTITLE, { name: username })}
                    button={{
                        title: `${ResourceService.replace(STRANGER_BLINK_BUTTON, { Coins: String(Config.SEND_ZWINKER_AMOUNT) })}`,
                        onClick: handleZwinkerClick,
                    }}
                />
            )}
        </>
    );
};

export default ZwinkerButton;

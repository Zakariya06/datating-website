import { faLock } from '@fortawesome/pro-light-svg-icons';
import { Avatar, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import Config from '../../config';
import { IStrangerUser } from '../../models/user/IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from '../../models/user/IStrangerUser/IStrangerUserPreview';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import Icon from '../Icon';
import IconModal from '../IconModal';

export interface IUnlockProfileDialogProps {
    strangerUser: IStrangerUserPreview | IStrangerUser;
    image?: string;
    open: boolean;
    insufficientCoins?: boolean;
    price?: number;
    onUnlockPress(strangerUser: IStrangerUserPreview | IStrangerUser): void;
    onLoadCoins(): void;
    onClose(): void;
}

export const UnlockProfileDialog = memo((props: IUnlockProfileDialogProps) => {
    const { open, onClose, strangerUser, image, insufficientCoins, price, onLoadCoins, onUnlockPress } = props;
    const { UNLOCK_TITLE, UNLOCK_TEXT, UNLOCK_INSUFFICIENT_COINS, UNLOCK, UNLOCK_INSUFFICIENT_COINS_BUTTON } = useTranslation();

    const handleUnlockPress = () => onUnlockPress(strangerUser);

    const button = insufficientCoins
        ? { title: UNLOCK_INSUFFICIENT_COINS_BUTTON, onClick: onLoadCoins }
        : { title: ResourceService.replace(UNLOCK, { Coins: (price ? price : Config.UNLOCK_USER_AMOUNT).toString() }), onClick: handleUnlockPress };

    return (
        <IconModal
            open={open}
            onClose={onClose}
            title={UNLOCK_TITLE}
            text={UNLOCK_TEXT}
            button={button}
            icon=""
            imageComponent={
                <div className="flex no-flex text-align-center justify-content-center">
                    <Icon icon={faLock} style={{ position: 'absolute', alignSelf: 'center', fontSize: 36, color: '#fff', zIndex: 999 }} />
                    <Avatar src={image} style={{ borderWidth: 0, alignSelf: 'center', width: 100, height: 100 }} />
                </div>
            }
        >
            {insufficientCoins && (
                <Typography style={{ textAlign: 'center', color: '#FF9100', fontWeight: 500 }}>{UNLOCK_INSUFFICIENT_COINS}</Typography>
            )}
        </IconModal>
    );
});

export default UnlockProfileDialog;

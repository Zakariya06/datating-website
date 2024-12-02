import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../assets/images/coins/new-lovecoin.svg';
import { SHOP_PATH } from '../../models/Paths';
import useTranslation from '../../services/i18n/core/useTranslation';
import IconModal from '../IconModal';

export interface IInsufficientCoinsDialogProps {
    open: boolean;
    onClose(): void;
}

export const InsufficientCoinsDialog = memo((props: IInsufficientCoinsDialogProps) => {
    const { open, onClose } = props;
    const history = useHistory();
    const { INSUFFICIENT_COINS_TITLE, INSUFFICIENT_COINS_TEXT, INSUFFICIENT_COINS_BUTTON } = useTranslation();

    const onShopCoinsPress = () => {
        history.push(SHOP_PATH);
        onClose();
    };

    return (
        <IconModal
            open={open}
            onClose={onClose}
            icon={image}
            text={INSUFFICIENT_COINS_TEXT}
            title={INSUFFICIENT_COINS_TITLE}
            button={{ onClick: onShopCoinsPress, title: INSUFFICIENT_COINS_BUTTON }}
        />
    );
});

export default InsufficientCoinsDialog;

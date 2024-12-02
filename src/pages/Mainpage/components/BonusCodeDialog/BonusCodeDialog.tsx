import { TextField } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import UserActionCreator from '../../../../actions/UserActionCreator';
import CoinStack from '../../../../assets/images/coins/new-lovecoin.svg';
import IconModal from '../../../../components/IconModal';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IBonusCodeDialogProps {
    open: boolean;
    onClose(): void;
}

export const BonusCodeDialog = memo((props: IBonusCodeDialogProps) => {
    const { open, onClose } = props;
    const [value, setValue] = useState<string>('');
    const dispatch = useDispatch();

    const { BONUS_CODE_DIALOG_TITLE, BONUS_CODE_DIALOG_INPUT, BONUS_CODE_DIALOG_BUTTON } = useTranslation();

    const handleClick = async () => {
        await dispatch(UserActionCreator.redeemBonuscode(value));
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return (
        <IconModal
            title={BONUS_CODE_DIALOG_TITLE}
            icon={CoinStack}
            open={open}
            onClose={onClose}
            button={{ title: BONUS_CODE_DIALOG_BUTTON, onClick: handleClick, disabled: value.trim().length === 0 }}
        >
            <TextField value={value} onChange={handleChange} placeholder={BONUS_CODE_DIALOG_INPUT} fullWidth />
        </IconModal>
    );
});

export default BonusCodeDialog;

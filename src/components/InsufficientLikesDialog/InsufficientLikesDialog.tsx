import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../assets/images/coins/new-lovecoin.svg';
import { MATCH_PATH } from '../../models/Paths';
import useTranslation from '../../services/i18n/core/useTranslation';
import IconModal from '../IconModal';

export interface IInsufficientLikesDialogProps {
    open: boolean;
    onClose(): void;
}

export const InsufficientLikesDialog = memo((props: IInsufficientLikesDialogProps) => {
    const { open, onClose } = props;
    const history = useHistory();
    const { INSUFFICIENT_LIKES_TITLE, INSUFFICIENT_LIKES_TEXT, CONFIRM } = useTranslation();

    return (
        <IconModal
            open={open}
            onClose={onClose}
            icon={image}
            text={INSUFFICIENT_LIKES_TEXT}
            title={INSUFFICIENT_LIKES_TITLE}
            button={{ onClick: onClose, title: CONFIRM }}
        />
    );
});

export default InsufficientLikesDialog;

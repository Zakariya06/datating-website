import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../../../actions/AuthenticationActionCreator';
import UserActionCreator from '../../../../actions/UserActionCreator';
import Sad from '../../../../assets/images/modals/sad.svg';
import IconModal from '../../../../components/IconModal';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IDeleteAccountDialogProps {
    open: boolean;
    handleClose(): void;
}

export const DeleteAccountDialog = memo((props: IDeleteAccountDialogProps) => {
    const { open, handleClose } = props;
    const dispatch = useDispatch();

    const { DELETE_ACCOUNT_TEXT, DELETE_ACCOUNT_TITLE } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteAccount = async () => {
        await dispatch(UserActionCreator.deleteAccount());
        dispatch(AuthenticationActionCreator.logout());
    };

    return (
        <IconModal
            open={open}
            onClose={handleClose}
            icon={Sad}
            title={DELETE_ACCOUNT_TITLE}
            text={DELETE_ACCOUNT_TEXT}
            button={{ title: DELETE_ACCOUNT_TITLE, onClick: handleDeleteAccount }}
        />
    );
});
export default DeleteAccountDialog;

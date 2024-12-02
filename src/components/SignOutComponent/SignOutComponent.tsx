import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import Logout from '../../assets/images/modals/arrow.svg';
import useTranslation from '../../services/i18n/core/useTranslation';
import IconModal from '../IconModal';
import { useHistory } from 'react-router-dom';
import { LOGIN_PATH } from 'models/Paths';

export interface ISignOutComponentProps {
    open: boolean;
    onClose(): void;
}

export const SignOutComponent = memo((props: ISignOutComponentProps) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const { LOGOUT_MODAL_TITLE, LOGOUT_MODAL_BUTTON, LOGOUT_MODAL_TEXT } = useTranslation();
    const history = useHistory();

    const handleLogoutPress = useCallback(() => {
        dispatch(AuthenticationActionCreator.logout());
        history.push(LOGIN_PATH);
    }, [dispatch, history]);

    return (
        <IconModal
            icon={Logout}
            title={LOGOUT_MODAL_TITLE}
            text={LOGOUT_MODAL_TEXT}
            onClose={onClose}
            open={open}
            button={{
                onClick: handleLogoutPress,
                title: LOGOUT_MODAL_BUTTON,
            }}
        />
    );
});

export default SignOutComponent;

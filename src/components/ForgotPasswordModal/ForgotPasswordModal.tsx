import { faAt } from '@fortawesome/pro-light-svg-icons';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UserActionCreator from '../../actions/UserActionCreator';
import isValidEmail from '../../core/typeguards/isValidEmail';
import { MAIN_PATH } from '../../models/Paths';
import ResourceService from '../../services/i18n';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import ActivityIndicator from '../ActivityIndicator';
import Icon from '../Icon';
import Modal from '../Modal';

export interface IForgotPasswordModalProps {
    open: boolean;
}

export const ForgotPasswordModal = (props: IForgotPasswordModalProps) => {
    const [email, setEmail] = useState<string>('');

    const [isLoading, setLoading] = useState<boolean>(false);

    // const { NOT_VALID_EMAIL, EMPTY_EMAIL_INPUT, EMPTY_PASSWORD_INPUT } = useTranslation(
    //     'EMPTY_EMAIL_INPUT',
    //     'EMPTY_PASSWORD_INPUT',
    //     'NOT_VALID_EMAIL'
    // );

    const { open } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleForgotPassword = useCallback(async () => {
        if (email === '') {
            const { EMPTY_EMAIL_INPUT } = ResourceService.getCurrentResources('EMPTY_EMAIL_INPUT');
            //Alert.alert('Zurücksetzen fehlgeschlagen!', EMPTY_EMAIL_INPUT);
            dispatch(
                NotificationActionCreator.enqueueSnackbar({
                    key: String(new Date().getTime() + Math.random()),
                    message: EMPTY_EMAIL_INPUT,
                    options: { variant: 'error' },
                })
            );
            setEmail('');
        } else {
            if (isValidEmail(email)) {
                // TODO: send the password change request
                setLoading(true);
                await dispatch(UserActionCreator.forgotPassword(email, 'a8O2cGVrbGVyZGVuIGthw6dhcmtlbiBkw7zF'));
                setLoading(false);
                setEmail('');
                // setPassword('');
                const { DIALOG_PASSWORD_CHANGEREQUEST } = ResourceService.getCurrentResources('DIALOG_PASSWORD_CHANGEREQUEST');
                //Alert.alert('Zurücksetzen erfolgreich!', DIALOG_PASSWORD_CHANGEREQUEST);
                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: DIALOG_PASSWORD_CHANGEREQUEST,
                        options: { variant: 'success' },
                    })
                );
            } else {
                const { WRONG_EMAIL } = ResourceService.getCurrentResources('WRONG_EMAIL');
                //Alert.alert('Zurücksetzen fehlgeschlagen!', WRONG_EMAIL);
                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: WRONG_EMAIL,
                        options: { variant: 'error' },
                    })
                );
                // setPassword('');
                setEmail('');
            }
        }
    }, [email, dispatch]);

    const handleClose = () => history.push(MAIN_PATH);

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            await handleForgotPassword();
        }
    };

    return (
        <Modal open={open} onClose={handleClose} title="Passwort vergessen" contentClassname="text-align-center spacing triple padding bottom">
            <form id="forgot-password-form" autoComplete="forgotPassword" onSubmit={(e) => e.preventDefault()} className="flex column no-grow">
                <TextField
                    id="email"
                    style={{ marginBottom: 16 }}
                    fullWidth
                    label="Deine E-Mail Adresse"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    onKeyPress={handleEnter}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon icon={faAt} />
                            </InputAdornment>
                        ),
                    }}
                />


                <Button fullWidth color="secondary" onClick={handleForgotPassword} className="spacing double margin top bottom" type="submit">
                    Passwort zurücksetzen
                </Button>
            </form>

            {isLoading && <ActivityIndicator />}
        </Modal>
    );
};

export default ForgotPasswordModal;

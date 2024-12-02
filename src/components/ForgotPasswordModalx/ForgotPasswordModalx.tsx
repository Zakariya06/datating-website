import { faLock } from '@fortawesome/pro-light-svg-icons';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UserActionCreator from '../../actions/UserActionCreator';
import { MAIN_PATH } from '../../models/Paths';
import ResourceService from '../../services/i18n';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import ActivityIndicator from '../ActivityIndicator';
import Icon from '../Icon';
import Modal from '../Modal';

export interface IForgotPasswordModalxProps {}

export const ForgotPasswordModalx = (props: IForgotPasswordModalxProps) => {
    // const [email, setEmail] = useState<string>('');
    const [password,  setPassword] = useState<string>('');
    const [password2,  setPassword2] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

      const search = window.location.search;
      const params = new URLSearchParams(search);


       const a = params.get('a');
      const b = params.get('b');
      const c = params.get('c');

    // const { NOT_VALID_EMAIL, EMPTY_EMAIL_INPUT, EMPTY_PASSWORD_INPUT } = useTranslation(
    //     'EMPTY_EMAIL_INPUT',
    //     'EMPTY_PASSWORD_INPUT',
    //     'NOT_VALID_EMAIL'
    // );

    const dispatch = useDispatch();
    const history = useHistory();

    const handleForgotPassword = useCallback(async () => {

        if (password === '') {
            const { DIALOG_PASSWORD_CHANGEREQUEST } = ResourceService.getCurrentResources('DIALOG_PASSWORD_CHANGEREQUEST');
            //Alert.alert('Zurücksetzen fehlgeschlagen!', EMPTY_EMAIL_INPUT);
            dispatch(
                NotificationActionCreator.enqueueSnackbar({
                    key: String(new Date().getTime() + Math.random()),
                    message: DIALOG_PASSWORD_CHANGEREQUEST,
                    options: { variant: 'error' },
                })
            );
            setPassword('');
            setPassword2('');
           // setEmail('');
        } else {
            if (password===password2 && password.length > 6 && password2.length > 6 && a && b && c) {
                // TODO: send the password change request
                setLoading(true);
                await dispatch(UserActionCreator.setPassword(password,a,b,c));
                setLoading(false);
                // setEmail('');
                setPassword('');
                setPassword2('');

                const { DIALOG_PASSWORD_CHANGEREQUEST } = ResourceService.getCurrentResources('DIALOG_PASSWORD_CHANGEREQUEST');
                //Alert.alert('Zurücksetzen erfolgreich!', DIALOG_PASSWORD_CHANGEREQUEST);

                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: DIALOG_PASSWORD_CHANGEREQUEST,
                        options: { variant: 'success' },
                    })
                );
                window.location.href='/login';
            } else {
                const { DIALOG_PASSWORD_CHANGEREQUEST } = ResourceService.getCurrentResources('DIALOG_PASSWORD_CHANGEREQUEST');
                //Alert.alert('Zurücksetzen fehlgeschlagen!', WRONG_EMAIL);
                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: DIALOG_PASSWORD_CHANGEREQUEST,
                        options: { variant: 'error' },
                    })
                );
                setPassword('');
                setPassword2('');
                // setEmail('');
            }
        }
    }, [a,b,c,password,password2, dispatch]);

    const handleClose = () => history.push(MAIN_PATH);

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            await handleForgotPassword();
        }
    };

    return (
        <Modal onClose={handleClose} open title="Passwort vergessen" contentClassname="text-align-center spacing triple padding bottom">
            <form id="forgot-password-form" autoComplete="forgotPassword" onSubmit={(e) => e.preventDefault()} className="flex column no-grow">
                <TextField
                    style={{ marginBottom: 16 }}
                    fullWidth
                    id="password"
                    type="password"
                    label="Dein neues Passwort"
                    autoComplete="new-password"
                    onKeyPress={handleEnter}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon icon={faLock} />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    style={{ marginBottom: 16 }}
                    fullWidth
                    id="password2"
                    type="password"
                    label="Dein neues Passwort"
                    autoComplete="new-password"
                    onKeyPress={handleEnter}
                    value={password2}
                    onChange={(e) => setPassword2(e.currentTarget.value)}
                     InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon icon={faLock} />
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

export default ForgotPasswordModalx;

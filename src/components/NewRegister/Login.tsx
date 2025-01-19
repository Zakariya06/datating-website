import { Box, Modal, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { faAt, faLock } from '@fortawesome/pro-light-svg-icons';
import { Button, Divider, InputAdornment, TextField } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import isValidEmail from '../../core/typeguards/isValidEmail';
import { FORGOT_PASSWORD_PATH, REGISTER_USER } from '../../models/Paths';
import { IRequestDataFailedAction } from '../../models/state';
import { IUser } from '../../models/user/IUser';
import { getAuthenticationError } from '../../selectors/AuthenticationSelectors';
import useTranslation from '../../services/i18n/core/useTranslation';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import ActivityIndicator from '../ActivityIndicator';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
// import Modal from '../Modal';
import addMinutes from 'date-fns/addMinutes';
import CookieStorageAPI from '../../core/storage/CookieStorageAPI';
import FBLoginButton from 'services/Facebook/FBLoginButton';
import useLoginHandler from '../../services/Facebook/useLoginHandler';
import { Typography } from '@mui/material';
const usnLsKey = btoa('usn');
const passwdLsKey = btoa('pswd');

export interface ISignInComponentProps {}
const LoginModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { email: lsem, password: lspasswd } = retrieveFromLS();
    const [email, setEmail] = useState<string>(lsem);
    const [password, setPassword] = useState<string>(lspasswd);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [savePassword, setsavePassword] = useState<boolean>(true);
    const [errorHelperText, setErrorHelperText] = useState('');

    const error = useSelector(getAuthenticationError);

    const { EMPTY_EMAIL_INPUT, EMPTY_PASSWORD_INPUT, LOGIN_BUTTON } = useTranslation();

    const dispatch = useDispatch();
    // const handleFBLogin = useLoginHandler();
    // const handleAppleLogin = useAppleLoginHandler();
    const history = useHistory();

    useEffect(() => {
        void (async () => {
            const searchParams = new URLSearchParams(history.location.search);
            try {
                const ext = searchParams.get('ext');
                if (ext) {
                    const json = JSON.parse(atob(ext)) as [IUser];
                    await dispatch(AuthenticationActionCreator.transientLogin(json));
                }

                const redirect = searchParams.get('redirect');
                if (redirect) {
                    history.replace(redirect);
                }
            } catch {
                //
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error?.Note === 'Error Password') {
            setErrorHelperText('Email oder Passwort falsch!');
        }
    }, [error]);

    async function handleLogin() {
        if (email.trim() === '' || password.trim() === '') {
            // check if the email is faulty
            //Alert.alert('Anmeldung fehlgeschlagen!', email === '' ? EMPTY_EMAIL_INPUT : EMPTY_PASSWORD_INPUT);
            dispatch(
                NotificationActionCreator.enqueueSnackbar({
                    key: String(new Date().getTime() + Math.random()),
                    message: email === '' ? EMPTY_EMAIL_INPUT : EMPTY_PASSWORD_INPUT,
                    options: { variant: 'error' },
                })
            );
        } else if (isValidEmail(email)) {
            // if everything is ok we can proceed by submitting the credentials
            // check if login was successful if not, display error message
            setLoading(true);
            CookieStorageAPI.setItem('loggedIN', 'true', { expires: addMinutes(new Date(), 5) });
            (await dispatch(AuthenticationActionCreator.loginUser({ email, password }))) as IRequestDataFailedAction;
            setLoading(false);
            const profileId = history.location.pathname.includes('profile') ? history.location.pathname.replace('profile', 'stranger-profile') : '/';
            history.push(profileId);
            if (savePassword) {
                // WARN: This beavior does counter the dsgvo law, since we do save user specific data, without his consense.
                // Furthermore we do create an additional attack layer to retrieve the users information via localstorage exposure
                persistToLS(email, password);
            } else {
                removeFromLs();
            }
        } else {
            //Alert.alert('Anmeldung fehlgeschlagen!', NOT_VALID_EMAIL);
            // dispatch(
            //     NotificationActionCreator.enqueueSnackbar({
            //         key: String(new Date().getTime() + Math.random()),
            //         message: NOT_VALID_EMAIL,
            //         options: { variant: 'error' },
            //     })
            // );
            setPassword('');
        }
    }

    const handleChangeSavePassword = useCallback((e: React.ChangeEvent<HTMLElement>, value: boolean) => setsavePassword(value), []);

    const handleForgotPassword = useCallback(() => {
        history.push(FORGOT_PASSWORD_PATH);
    }, [history]);

    const handleOpenRegister = () => {
        history.push(REGISTER_USER);
    };

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (errorHelperText) {
            setErrorHelperText('');
            dispatch(AuthenticationActionCreator.cancelAuthentication());
        }
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            await handleLogin();
        }
    };

    // eslint-disable-next-line
    const handleFBLogin = useLoginHandler();

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '400px', // Increased width
                    boxShadow: 24,
                }}
            >
                <div title="Jetzt einloggen" className="text-align-center spacing triple padding bottom">
                    <Typography sx={{ p: '1em', fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>{LOGIN_BUTTON}</Typography>
                    <form id="login-form" autoComplete="login" onSubmit={(e) => e.preventDefault()} className="flex column no-grow">
                        <TextField
                            id="email"
                            style={{ marginBottom: 20 }}
                            fullWidth
                            label="Deine E-Mail Adresse"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            onKeyPress={handleEnter}
                            error={Boolean(errorHelperText)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon icon={faAt} />
                                    </InputAdornment>
                                ),
                                style: {
                                    borderRadius: '30px',
                                },
                            }}
                        />
                        <TextField
                            style={{ marginBottom: 16 }}
                            fullWidth
                            id="password"
                            type="password"
                            label="Dein Passwort"
                            autoComplete="current-password"
                            onKeyPress={handleEnter}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            error={Boolean(errorHelperText)}
                            helperText={errorHelperText}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon icon={faLock} />
                                    </InputAdornment>
                                ),
                                style: {
                                    borderRadius: '30px',
                                },
                            }}
                        />

                        <Checkbox
                            color="primary"
                            label="Passwort merken?"
                            labelPlacement="end"
                            onChange={handleChangeSavePassword}
                            checked={savePassword}
                            className="spacing margin left"
                        />

                        <Button variant="text" color="primary" onClick={handleForgotPassword}>
                            Passwort vergessen ?
                        </Button>

                        <Button
                            fullWidth
                            color="secondary"
                            style={{
                                borderRadius: '30px',
                            }}
                            onClick={handleLogin}
                            className="spacing double margin top bottom"
                            type="submit"
                        >
                            Einloggen
                        </Button>
                        <div style={{ marginBottom: 24 }}>
                            <FBLoginButton setLoading={setLoading} onLoginFinished={handleFBLogin} />
                        </div>
                    </form>

                    {isLoading && <ActivityIndicator />}

                    <Divider />
                    {/* <div style={{ marginTop: 24, marginBottom: 24 }}>
                <FBLoginButton setLoading={setLoading} onLoginFinished={handleFBLogin} />
            </div>
            {process.env.NODE_ENV === 'development' && (
                <div style={{ marginTop: 24, marginBottom: 24 }}>
                    <AppleLoginButton setLoading={setLoading} onLoginFinished={handleAppleLogin} />
                </div>
            )} */}
                    <Typography sx={{ mb: 1 }}>Noch nicht dabei ?</Typography>
                    <Button onClick={handleOpenRegister} variant="text" color="primary">
                        Jetzt registrieren!
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default LoginModal;

function persistToLS(email: string, password: string) {
    localStorage.setItem(usnLsKey, btoa(email));
    localStorage.setItem(passwdLsKey, btoa(password));
}

function removeFromLs() {
    localStorage.removeItem(usnLsKey);
    localStorage.removeItem(passwdLsKey);
}

function retrieveFromLS() {
    const email = localStorage.getItem(usnLsKey) ?? '';
    const password = localStorage.getItem(passwdLsKey) ?? '';

    return {
        email: atob(email),
        password: atob(password),
    };
}


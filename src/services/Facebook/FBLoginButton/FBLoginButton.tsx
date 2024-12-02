// import { Alert } from 'core/models/IViewComponentProps/node_modules/react-native';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@material-ui/core';
import { useCallback, useEffect } from 'react';

import Icon from '../../../components/Icon';
import Alert from '../../../core/Alert';
import FacebookService from '../FacebookService';

// import { LoginManager, LoginResult, Permissions } from 'react-native-fbsdk';

// import ApplicationStyles from '../../../styles/Application.styles';

interface IFBLoginButtonProps {
    style?: React.CSSProperties;
    text?: string;
    permissions?: Permissions[];
    setLoading(isLoading: boolean): void;
    onLoginFinished(result: fb.StatusResponse): Promise<void>;
}

export const FBLoginButton = (props: IFBLoginButtonProps) => {
    const { text = 'Mit Facebook anmelden', onLoginFinished, setLoading, style } = props;

    useEffect(() => {
        FacebookService.init();
    }, []);

    const loginWithFB = useCallback(() => {
        setLoading(true);

        FacebookService.login(async (response) => {
            if (response.status === 'connected') {
                await onLoginFinished(response);
                setLoading(false);
            } else {
                // this error appears f.e. when a user is already "logged" in and never logs out
                // and we try to login a new user so we call the LoginManager.logOut()
                FacebookService.logout();
                Alert.alert('Login fehlgeschlagen!', 'Bitte versuchen Sie erneut.');
            }
        });

        // const result = await LoginManager.logInWithPermissions(permissions).catch((error) => {
        //     // this error appears f.e. when a user is already "logged" in and never logs out
        //     // and we try to login a new user so we call the LoginManager.logOut()
        //     LoginManager.logOut();
        //     Alert.alert('Login fehlgeschlagen!', 'Bitte versuchen Sie erneut.');
        // });

        // if (result) {
        //     setLoading(true);
        //     await onLoginFinished(result);
        //     setLoading(false);
        // }
    }, [onLoginFinished, setLoading]);

    return (
        <Button
            variant="contained"
            onClick={loginWithFB}
            startIcon={<Icon icon={faFacebook} />}
            style={{ backgroundColor: 'rgb(24, 119, 242)', backgroundImage: 'unset', ...style,borderRadius:'30px',margin:'.5em 0' }}
            fullWidth
        >
            {text}
        </Button>
    );
};

export default FBLoginButton;

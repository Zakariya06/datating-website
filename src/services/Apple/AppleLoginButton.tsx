// // import appleAuth, {
// //     AppleAuthRequestOperation,
// //     AppleAuthRequestOptions,
// //     AppleAuthRequestResponse,
// //     AppleAuthRequestScope,
// //     AppleButton,
// // } from '@invertase/react-native-apple-authentication';
// import  { useCallback } from 'react';

import { faApple } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@material-ui/core';
import { useCallback, useEffect } from 'react';

import Icon from '../../components/Icon';
import { AppleService } from './AppleService';
import { IAppleSigninResult } from './models/IAppleSigninResult';

// const style = {
//     width: '100%',
//     height: getRelativeHorizontalSpacing(11.5),
//     marginTop: 8,
// };

// const appleAuthRequestOptions: AppleAuthRequestOptions = {

//     requestedOperation: AppleAuthRequestOperation.LOGIN,
//     requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
// };

// export interface IAppleLoginButtonProps {
//     setLoading(isLoading: boolean): void;
//     onLoginFinished(response: AppleAuthRequestResponse): Promise<void>;
// }

// export const AppleLoginButton = (props: IAppleLoginButtonProps) => {
//     const { setLoading, onLoginFinished } = props;

//     const loginWithApple = useCallback(async () => {
//         const appleAuthRequestResponse = await appleAuth.performRequest(appleAuthRequestOptions);

//         if (appleAuthRequestResponse) {
//             setLoading(true);
//             await onLoginFinished(appleAuthRequestResponse);
//             setLoading(false);
//         }
//     }, [onLoginFinished, setLoading]);

//     return (
//         <AppleButton
//             buttonStyle={AppleButton.Style.WHITE}
//             buttonType={AppleButton.Type.SIGN_IN}
//             style={style}
//             cornerRadius={100}
//             onPress={loginWithApple}
//         />
//     );
// };

// export default AppleLoginButton;

export interface IAppleLoginButtonProps {
    setLoading(isLoading: boolean): void;
    onLoginFinished(response: IAppleSigninResult): Promise<void>;
}

export const AppleLoginButton = (props: IAppleLoginButtonProps) => {
    const { setLoading, onLoginFinished } = props;

    useEffect(() => {
        AppleService.init();
    }, []);

    const loginWithApple = useCallback(async () => {
        setLoading(true);
        await AppleService.login(onLoginFinished);
        setLoading(false);
    }, [onLoginFinished, setLoading]);

    /* <div id="appleid-signin" className="signin-button" data-color="black" data-border="true" data-type="sign in"></div> */

    return (
        <Button startIcon={<Icon icon={faApple} />} style={{ backgroundColor: '#000', backgroundImage: 'unset' }} onClick={loginWithApple} fullWidth>
            Mit Apple anmelden
        </Button>
    );
};

export default AppleLoginButton;

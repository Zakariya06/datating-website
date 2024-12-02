import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import { getRegistrationMessage } from '../../config/errorMessages';
import Alert from '../../core/Alert';
import { Logger } from '../../core/Logger';
import { useUniqueId } from '../../core/useUniqueId';
import { isError } from '../../models/core/error/IError';
import { AppleAuthCredentialState, IAppleSigninResult } from './models/IAppleSigninResult';

export function useAppleLoginHandler() {
    const dispatch = useDispatch();
    const deviceId = useUniqueId();

    const onLoginFinished = useCallback(
        async (appleAuthRequestResponse: IAppleSigninResult) => {
            Logger.log('THE RESULT: ' + JSON.stringify(appleAuthRequestResponse));

            // get current authentication state for user
            // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            const credentialState = appleAuthRequestResponse.authorization.state;

            // use credentialState response to ensure the user is authenticated
            if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
                // user is authenticated

                // if the email inside the result returns null, the user is already registered with apple
                // and needs to get signed in.

                if (appleAuthRequestResponse.user.email === null) {
                    // login

                    if (appleAuthRequestResponse.authorization.code) {
                        const response = await dispatch(
                            AuthenticationActionCreator.loginAppleUser({
                                authorizationCode: appleAuthRequestResponse.authorization.id_token || '',
                                email: '',
                            })
                        );

                        if (isError(response.payload.result)) {
                            Alert.alert('Anmelden fehlgeschlagen!', 'Bitte versuche es erneut.');
                        }
                    }
                } else {
                    // register

                    if (appleAuthRequestResponse.authorization.code) {
                        // we need to register the user
                        // after a successful registration we will need to alert the user that the registration
                        // was successful and he now just needs to login
                        // then navigate the user to the welcome screen where he will need to login
                        // to fullfill his information we will need to navigate him after login to screens
                        // where he cann fullfill his login information
                        // const notificationPremission = await requestIOSPermissions();
                        // await registerDevice();
                        // const firebaseId = await messaging().getToken();
                        const firebaseId = '';
                        const response = await dispatch(
                            AuthenticationActionCreator.registerAppleUser({
                                deviceId: deviceId,
                                platform: 'ios',
                                pushPreference: true,
                                firebaseId: firebaseId,
                                ...appleAuthRequestResponse,
                            })
                        );

                        if (response.payload && isError(response.payload.result)) {
                            Alert.alert(
                                'Registrierung Fehlgeschlagen!',
                                getRegistrationMessage(
                                    response.payload.result._embedded.errors.length > 0
                                        ? response.payload.result._embedded.errors[0].message
                                        : response.payload.result.message
                                )
                            );
                            return;
                        }
                    }
                }
            }

            if (credentialState === AppleAuthCredentialState.REVOKED) {
                Alert.alert('Anmelden fehlgeschlagen!', 'Ihre Anmeldung über Apple ist fehlgeschlagen.');
                return;
            }
        },
        [dispatch, deviceId]
    );

    return onLoginFinished;
}

export default useAppleLoginHandler;

// export const useAppleLoginHandler = () => {
//     return async (result: IAppleSigninResult) => {
//         //
//     };
// };

// export default useAppleLoginHandler;

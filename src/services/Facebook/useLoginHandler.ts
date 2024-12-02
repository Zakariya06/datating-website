// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import messaging from '@react-native-firebase/messaging';

import { Dispatch, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AuthenticationActionCreator } from './../../actions/AuthenticationActionCreator';
import { DirectInteractionActionCreator } from './../../actions/DirectInteractionActionCreator';
import { IFacebookRegistrationCredentials } from './../../models/authentication/registration/IFacebookRegistrationCredentials';
import { getRegistrationMessage } from '../../config/errorMessages';
import Alert from '../../core/Alert';
import useUniqueId from '../../core/useUniqueId';
import { isError } from '../../models/core/error/IError';
import { FacebookService } from './FacebookService';
import { IFacebookGraphResponse } from './models/IFacebookResponse';
import { LoginResult } from './models/LoginResult';
import RegisterPermissions from './models/RegisterPermissions';
import CookieStorageAPI from 'core/storage/CookieStorageAPI';
import { addMinutes } from 'date-fns';
import { IRequestDataFailedAction } from 'models/state';

export function useLoginHandler() {
    const dispatch = useDispatch();
    const deviceId = useUniqueId();

    const onLoginFinished = useCallback(
        async (result: LoginResult) => {
            // // if the request is cancelled we have to abort
            // if (result.status === 'unknown') {
            //     return;
            // }
            if (!(result.authResponse.grantedScopes && result.authResponse.grantedScopes.length === RegisterPermissions.join(',').length)) {
                Alert.alert(
                    'Registrierung fehlgeschlagen!',
                    'Du musst Matchluu den Zugriff auf deine Facebook Informationen erlauben um dich registrieren zu können.'
                );
                FacebookService.logout();
                return;
            }

            // check if Login was successful
            // retrieve the Access Token
            const token = result.authResponse.userID;

            if (!token) {
                // provide error message
                Alert.alert('Anmelden fehlgeschlagen!', 'Bitte versuche es erneut.');
                FacebookService.logout();
                return;
            }

            const response = (await dispatch(AuthenticationActionCreator.loginFacebookUser({ fbToken: token }))) as IRequestDataFailedAction;

            // the client doen't know if there's already an account with that.
            // So actually we should try our luck and login. if it failed, we know there's no user and we then have to
            // access the user data and register him.
            // Logger.log('HELLO', await response);

            // if (isError(response.payload.result)) {
            if (isError(response)) {
                // User is not registered yet, get userdata and register user.
                return registerFacebookUser(token, deviceId, dispatch);
            } else {
                CookieStorageAPI.setItem('loggedIN', 'true', { expires: addMinutes(new Date(), 5) });
            }
        },
        [dispatch, deviceId]
    );

    return onLoginFinished;
}

export default useLoginHandler;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerFacebookUser(token: string, deviceId: string, dispatch: Dispatch<any>) {
    const responseInfoCallback = async (error: object, result: IFacebookGraphResponse) => {
        if (error && Object.keys(error).length > 0) {
            // TODO: error handling
            return;
        }

        if (result.age_range.min < 18) {
            Alert.alert('Registrierung fehlgeschlagen', 'Du musst mindestens 18 Jahre alt sein um dich bei Matchluu registrieren zu können.');
            FacebookService.logout();
            return;
        }

        // build register object
        // const notificationPremission = await requestIOSPermissions();
        // await registerDevice();
        // const firebaseId = await messaging().getToken();

        const registerData: IFacebookRegistrationCredentials = {
            city: 'Berlin',
            postalCode: '10115',
            fbToken: token,
            dateOfBirth: new Date(result.birthday).toISOString(),
            deviceId: deviceId,
            pushPreference: false,
            firebaseId: '',
            email: result.email,
            platform: 'ios',
            name: result.name.split(' ')[0],
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const response = (await dispatch(AuthenticationActionCreator.registerFacebookUser(registerData))) as any;
        const r = await DirectInteractionActionCreator.triggerFacebookRegister(registerData);
        const response = await r.json();
        // TODO: use this in middleware?
        if (response.payload && isError(response.payload.result)) {
            Alert.alert(
                'Registrierung Fehlgeschlagen!',
                getRegistrationMessage(
                    response.payload.result._embedded.errors.length > 0
                        ? response.payload.result._embedded.errors[0].message
                        : response.payload.result.message
                )
            );
            FacebookService.logout();
            return;
        } else {
            Alert.alert('Geschafft!', 'Du bist jetzt Startklar und kannst beginnen, dich mit Leuten aus deiner Umgebung zu verbinden.');
        }
    };

    try {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return FacebookService.getUserData(token, responseInfoCallback);
    } catch {
        Alert.alert('Registrierung fehlgeschlagen', 'Bitte versuche es erneut.');
        FacebookService.logout();
    }
}

// async function requestIOSPermissions() {
//     if (Platform.OS === 'ios') {
//         const result = await PushNotificationIOS.requestPermissions();
//         if (!result.alert && !result.badge && !result.sound) {
//             return false;
//         }
//     }
//     return true;
// }

// async function registerDevice() {
//     if (!messaging().isDeviceRegisteredForRemoteMessages) {
//         await messaging().registerDeviceForRemoteMessages();
//     }
//     await messaging().requestPermission();
// }

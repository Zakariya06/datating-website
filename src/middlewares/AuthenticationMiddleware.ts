import { batch } from 'react-redux';
import { Dispatch, MiddlewareAPI } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';

import { ShopActionCreator } from './../actions/ShopActionCreator';
import { FacebookService } from './../services/Facebook/FacebookService';
import { Languages } from './../services/i18n/models/ILanguageDictionary';
import AuthenticationActionCreator, { AuthenticationAction, AuthenticationActions } from '../actions/AuthenticationActionCreator';
import LikesActionCreator from '../actions/LikesActionCreator';
import { UserAction, UserActionCreator, UserActions } from '../actions/UserActionCreator';
import Config from '../config';
import Alert from '../core/Alert';
import isNullOrUndefined from '../core/typeguards/isNullOrUndefined';
import { isError } from '../models/core/error/IError';
import { IState } from '../models/state';
import { getToken, isTokenExpired } from '../selectors/AuthenticationSelectors';
import ChatActionCreator from '../services/Chat/actions/ChatActionCreator';
import { ResourceService } from '../services/i18n/ResourcesService';
import NotificationActionCreator from '../services/Notifications/actions/NotificationActionCreator';

// import GeolocationProvider, { GeoLocation } from '../core/GeolocationProvider';

// const MAX_AGE = 0.5 * 60 * 1000;

export function AuthenticationMiddleware(middlewareAPI: MiddlewareAPI) {
    const { dispatch, getState } = middlewareAPI;

    let currentPositionHandle: number | undefined;

    return (next: Dispatch) => async (action: AuthenticationAction | UserAction | RehydrateAction) => {
        switch (action.type) {
            case REHYDRATE: {
                await next(action);
                const state = getState();
                const token = getToken(state);
                const tokenExpired = isTokenExpired(state);

                if (!isNullOrUndefined(tokenExpired) && tokenExpired) {
                    dispatch(AuthenticationActionCreator.logout());
                    const { ALERT_SESSION_EXPIRED_TITLE, ALERT_SESSION_EXPIRED_TEXT } = ResourceService.getCurrentResources(
                        'ALERT_SESSION_EXPIRED_TITLE',
                        'ALERT_SESSION_EXPIRED_TEXT'
                    );

                    Alert.alert(ALERT_SESSION_EXPIRED_TITLE, ALERT_SESSION_EXPIRED_TEXT);
                } else {
                    if (token) {
                        currentPositionHandle = handleLoginOrRehydrate(state, currentPositionHandle, dispatch);
                    }
                }
                break;
            }
            case AuthenticationActions.TRANSIENT_LOGIN:
            case AuthenticationActions.FACEBOOK_REGISTER_USER_RESPONSE:
            case AuthenticationActions.REGISTER_USER_RESPONSE:
            case AuthenticationActions.APPLE_REGISTER_USER_RESPONSE:
            case AuthenticationActions.APPLE_LOGIN_USER_RESPONSE:
            case AuthenticationActions.FACEBOOK_LOGIN_USER_RESPONSE:
            case AuthenticationActions.LOGIN_USER_RESPONSE: {
                await next(action);
                const state = getState();

                currentPositionHandle = handleLoginOrRehydrate(state, currentPositionHandle, dispatch);
                break;
            }
            case UserActions.GET_PROFILE_RESPONSE: {
                const res = action.payload.result;
                if (isError(res) && res.Note && res.Note === 'Error User not exist') {
                    const { ALERT_SESSION_EXPIRED_TITLE, ALERT_SESSION_EXPIRED_TEXT } = ResourceService.getCurrentResources();
                    batch(() => {
                        dispatch(
                            NotificationActionCreator.enqueueSnackbar({
                                key: String(new Date().getTime() + Math.random()),
                                message: ALERT_SESSION_EXPIRED_TITLE + ' ' + ALERT_SESSION_EXPIRED_TEXT,
                                options: { variant: 'error' },
                            })
                        );
                        dispatch(AuthenticationActionCreator.logout());
                    });
                }

                return next(action);
            }
            case AuthenticationActions.LOGOUT: {
                window.clearInterval(currentPositionHandle ?? 0);
                ResourceService.changeCurrentLanguage(Languages.DE);
                try {
                    dispatch(AuthenticationActionCreator.receiveGeolocation(null));
                    FacebookService.logout();

                    // if (currentPositionHandle) {
                    //     GeolocationProvider.clearWatch(currentPositionHandle);
                    // }
                } catch {
                    // pizdec
                }
                return next(action);
            }

            default:
                const state = getState();
                const tokenExpired = isTokenExpired(state);

                if (!isNullOrUndefined(tokenExpired) && tokenExpired) {
                    dispatch(AuthenticationActionCreator.logout());
                    const { ALERT_SESSION_EXPIRED_TITLE, ALERT_SESSION_EXPIRED_TEXT } = ResourceService.getCurrentResources();

                    Alert.alert(ALERT_SESSION_EXPIRED_TITLE, ALERT_SESSION_EXPIRED_TEXT);
                }

                return next(action);
        }
    };
}

// function getCurrentPosition(setGeolocation: (loc: GeoLocation) => void, onError?: () => void): number {
//     GeolocationProvider.getCurrentPosition(
//         setGeolocation,
//         // TODO: display snackbar!
//         (error) => {
//             if (onError) {
//                 onError();
//             }
//         },
//         { enableHighAccuracy: false, maximumAge: MAX_AGE, useSignificantChanges: true }
//     );

//     // return setTimeout(() => getCurrentPosition(setGeolocation, onError), MAX_AGE);
// }

function handleLoginOrRehydrate(state: IState, currentPositionHandle: number | undefined, dispatch: Dispatch) {
    // if (currentPositionHandle) {
    //     GeolocationProvider.clearWatch(currentPositionHandle);
    //     currentPositionHandle = undefined;
    // }

    dispatch(UserActionCreator.refreshUser());

    batch(() => {
        // currentPositionHandle = getCurrentPosition((loc) => dispatch(AuthenticationActionCreator.receiveGeolocation(loc)));

        // Check OptInState
        dispatch(AuthenticationActionCreator.getOptInState());

        // load most information per default
        dispatch(LikesActionCreator.fetchLikes());
        dispatch(LikesActionCreator.fetchVisitors());
        dispatch(ChatActionCreator.refresh());
        dispatch(ShopActionCreator.getPresents());
        dispatch(ChatActionCreator.getStarsAmount());
    });

    if (currentPositionHandle) {
        clearInterval(currentPositionHandle);
    }

    currentPositionHandle = window.setInterval(() => dispatch(ChatActionCreator.getNewMessages()), Config.REFRESH_CHATS_INTERVAL);

    // const { user, token } = getUserAndToken(state);

    // if (user && token) {
    //     registerFireBase(dispatch, user, token);
    // }

    return currentPositionHandle;
}

// async function registerFireBase(dispatch: Dispatch, user: IUser, token: string) {
//     const deviceId = getUniqueId();
//     const messageingInstance = messaging();

//     // Firebase Update
//     // check if the user is registered with a new device
//     async function patchDevice() {
//         if (user && user.lastUpdatedDevice) {
//             const firebaseId = await messaging().getToken();

//             if (user.lastUpdatedDevice.firebaseId !== firebaseToken) {
//                 await dispatch(
//                     UserActionCreator.updateDevice({
//                         deviceId: deviceId,
//                         firebaseId: firebaseId,
//                         platform: Platform.OS === 'ios' ? 'ios' : 'android',
//                     })
//                 );
//                 await dispatch(UserActionCreator.refreshUser());
//             }
//         }
//     }
//     async function setNewDevice() {
//         Adjust.setPushToken(token);
//         if (user) {
//             if (user?.lastUpdatedDevice?.deviceId === undefined || user.lastUpdatedDevice === undefined) {
//                 // POST set user
//                 if (!messaging().isDeviceRegisteredForRemoteMessages) {
//                     await messaging().registerDeviceForRemoteMessages();
//                 }
//                 await messaging().requestPermission();

//                 const firebaseId = await messaging().getToken();
//                 await dispatch(
//                     UserActionCreator.addDevice({
//                         deviceId: deviceId,
//                         firebaseId: firebaseId,
//                         platform: Platform.OS === 'ios' ? 'ios' : 'android',
//                     })
//                 );
//             }
//         }
//     }
//     // console.warn('Response:', user?.lastUpdatedDevice?.deviceId);
//     // console.warn('Real:', deviceId);
//     if (user?.lastUpdatedDevice?.deviceId !== deviceId || user?.lastUpdatedDevice === undefined) {
//         // its not the same device. the user may be using a new device we need to register
//         // in future we can check the notification status too at this point and update the user
//         setNewDevice();
//         patchDevice();
//     } else {
//         if (user.lastUpdatedDevice?.deviceId === deviceId) {
//             // get current FirebaseToken
//             patchDevice();
//             // PUT update user (other device)
//         }
//     }

//     // check if client has network connection

//     // firebase device change

//     // this will be called when the firebase token for this device changes.
//     // we update the firebaseId on the database to ensure that push notifications
//     // will be delivered successful.
//     messageingInstance.onTokenRefresh(async (_token: string) => {
//         // re-check if token really changed
//         // console.log('Users firebaseID: ', user?.lastUpdatedDevice?.firebaseId);
//         // console.log('Real firebaseID: ', token);

//         const firebaseId = await messaging().getToken();
//         if (user && firebaseId) {
//             if (user.lastUpdatedDevice === undefined || firebaseId !== user.lastUpdatedDevice.firebaseId) {
//                 await dispatch(
//                     UserActionCreator.updateDevice({
//                         deviceId: deviceId,
//                         firebaseId: firebaseId,
//                         platform: Platform.OS === 'ios' ? 'ios' : 'android',
//                     })
//                 );
//                 await dispatch(UserActionCreator.refreshUser());
//             }
//         }
//     });

//     // useEffect to handle incoming notifications:
//     // onNotificationOpenedApp is called when the application is running, but in background
//     messageingInstance.onNotificationOpenedApp((remoteMessage) => {
//         Logger.log('Notification caused app to open from background state:', remoteMessage);
//         handleNotification(remoteMessage);
//     });

//     // getInitialNotification is called when the application is opened from a quit state
//     const remoteMessage = await messageingInstance.getInitialNotification();

//     if (remoteMessage) {
//         Logger.log('Notification caused app to open from quit state:', remoteMessage.notification);
//         handleNotification(remoteMessage);
//     }
// }

export default AuthenticationMiddleware;

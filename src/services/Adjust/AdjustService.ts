// import  All from '@adjustcom/adjust-web-sdk';

// const { AdjustConfig } = All;
// Logger.log(Object.keys(All));

export class AdjustService {
    // public static environment = AdjustConfig.EnvironmentProduction;

    public static init() {
        // All.initSdk({
        //     appToken: Config.ADJUST_ID,
        //     environment: 'production',
        // })
        // const adjustConfig = new AdjustConfig(Config.ADJUST_ID, AdjustConfig.EnvironmentProduction);
        // // AppSecret is used for FraudDetection
        // adjustConfig.setAppSecret(2, 1552166247, 740613340, 1528153893, 2023911887);
        // adjustConfig.setSendInBackground(true);
        // adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
        // if (process.env.NODE_ENV !== 'production') {
        //     adjustConfig.setEventTrackingFailedCallbackListener(function (eventFailure) {
        //         // Printing all event failure properties.
        //         Logger.log('Event tracking failed!');
        //         Logger.log(eventFailure.message);
        //         Logger.log(eventFailure.timestamp);
        //         Logger.log(eventFailure.eventToken);
        //         Logger.log(eventFailure.callbackId);
        //         Logger.log(eventFailure.adid);
        //         Logger.log(eventFailure.willRetry);
        //         Logger.log(eventFailure.jsonResponse);
        //     });
        //     adjustConfig.setSessionTrackingSucceededCallbackListener(function (sessionSuccess) {
        //         // Printing all session success properties.
        //         Logger.log('Session tracking succeeded!');
        //         Logger.log(sessionSuccess.message);
        //         Logger.log(sessionSuccess.timestamp);
        //         Logger.log(sessionSuccess.adid);
        //         Logger.log(sessionSuccess.jsonResponse);
        //     });
        // }
        // Adjust.create(adjustConfig);
    }

    public static stop() {
        // TODO:
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
}

// export * from '@adjustcom/adjust-web-sdk';

export default AdjustService;

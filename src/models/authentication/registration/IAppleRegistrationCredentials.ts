// import { AppleAuthRequestResponse } from '@invertase/react-native-apple-authentication';

import { IAppleSigninResult } from '../../../services/Apple/models/IAppleSigninResult';

// eslint-disable-next-line @typescript-eslint/naming-convention
type AppleAuthRequestResponse = IAppleSigninResult;

export interface IAppleRegistrationCredentials extends AppleAuthRequestResponse {
    deviceId: string;
    pushPreference: boolean;
    firebaseId: string;
    platform: 'ios' | 'android';
}

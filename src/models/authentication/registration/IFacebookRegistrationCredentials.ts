import { DateType } from '../../core/date/DateType';

export interface IFacebookRegistrationCredentials {
    fbToken: string;
    dateOfBirth: DateType;
    city: string;
    postalCode: string;
    deviceId: string;
    email: string;
    pushPreference: boolean;
    firebaseId: string;
    platform: 'ios' | 'android';
    name: string;
}

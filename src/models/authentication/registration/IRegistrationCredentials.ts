import { GenderSearchTraits } from '../../../temp/models/BerndUserTraits';
import { DateType } from '../../core/date/DateType';

export interface IRegistrationCredentials {
    name: string;
    email: string;
    password: string;
    dateOfBirth: DateType;
    gender: string;
    country: string; // 'de' | 'at' | 'ch' | 'us'
    city: string;
    postalCode: string;
    deviceId: string;
    pushPreference: boolean;
    profileImageEncoded: string;
    firebaseId: string;
    platform: 'ios' | 'android';
    preferredGender?: GenderSearchTraits;
    ip?: string;
}

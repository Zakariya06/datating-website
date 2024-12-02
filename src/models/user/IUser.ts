import { addYears } from 'date-fns';

import Config from '../../config';
import isNullOrUndefined from '../../core/typeguards/isNullOrUndefined';
import isString from '../../core/typeguards/isString';
import { IImage } from '../core/image/IImage';
import { IStrangerUser } from './IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from './IStrangerUser/IStrangerUserPreview';

export interface IUserBase {
    Username: string;
    Zip: string;
    City: string;
    Birthday: string;
    Gender: number;
    SearchGender: number;
    Starsign: number;
    Eyes: number;
    Size: number;
    Bodyjewelry: number;
    Relationship: number;
    Smoker: number;
    Living: number;
    Hair: number;
    Pictures?: IImage[];
    CreateDate: string;
    IsOnline: boolean;
    UeberMich: string;
    Verified: number;
}

export interface IUser extends IUserBase {
    Userid: string;
    Email?: string;
    Verifiy: number;
    Country: string;
    MinAge: number;
    MaxAge: number;
    Distance: number;
    FirebaseId?: string;
    Coins: number;
    CoinsFree: number;
    LastLogin: string;
    PartnerDoi: number;
    Premium: string;
}

export const USER_MIN_DATE = new Date('1900-01-01');
export const USER_MAX_DATE = addYears(new Date(), -Config.MIN_AGE);
export const USER_DEFAULT_DATE = new Date();
USER_DEFAULT_DATE.setFullYear(USER_DEFAULT_DATE.getFullYear() + -Config.MIN_AGE);

export const hasUserInsufficientInformation = (user?: IUser) => {
    // TODO: get correct informations
    // return user?.LastLogin === null;

    if (!user) {
        return false;
    }

    const { Pictures, Birthday, Gender, Zip } = user;

    return (
        // LastLogin === null ||
        !Pictures || Pictures.length === 0 || !Birthday || isNullOrUndefined(Gender) || !Zip // || Birthday.startsWith('1970-01-01') ||
    );

    // return (user?.LastLogin === null && !user.Pictures) || user?.Pictures?.length === 0;
};

export const isUserNew = (user: IUser | IStrangerUser | IStrangerUserPreview) => new Date(user.CreateDate).getTime() > Date.now() - 12096e5;
export const getAge = (dateOfBirth: string) => {
    const current = new Date();
    const userDate = new Date(dateOfBirth);
    return current.getFullYear() - userDate.getFullYear();
};

export const getBalance = (user: IUser) => user.CoinsFree + user.Coins;

export function checkImageURL(image: IImage) {
    // fetch(generateValidUrl(image.Picture))
    //     .then((res) => (res.status === 404 ? Config.FALLBACK_IMAGE : image.Picture))
    //     .catch(() => Config.FALLBACK_IMAGE);
    return image.Picture;
}

export const getProfileImage = (user: IStrangerUserPreview | IStrangerUser | IUser): string => {
    if ('Picture' in user && isString(user.Picture)) {
        return user.Picture;
    } else if ('ProfilPicture' in user && isString(user.ProfilPicture)) {
        return user.ProfilPicture;
    }

    const { Pictures = [] } = user as IUser | IStrangerUser;
    if (Pictures === null || Pictures === undefined) {
        return Config.FALLBACK_IMAGE;
    } else {
        const img = Pictures.find((image) => image.ProfileImage === true);

        if (img) {
            if (img.Picture === '' || img.Picture === null || img.Picture === undefined) {
                return Config.FALLBACK_IMAGE;
            } else {
                return img.Picture;
            }
        } else {
            if (Pictures) {
                if (Pictures.length > 0) {
                    return checkImageURL(Pictures[0]);
                } else {
                    return Config.FALLBACK_IMAGE;
                }
            } else {
                return Config.FALLBACK_IMAGE;
            }
        }
    }
};

export const formatHeight = (height?: number) => (height ? `${(height / 100).toFixed(2)} m` : '-');

export const getUserMinAgeDate = () => {
    const today = new Date(Date.now());
    const maximumYear = today.getFullYear() - Config.MIN_AGE;
    let month: string;

    if (today.getMonth() + 1 < 10) {
        month = `0${today.getMonth() + 1}`;
    } else {
        month = (today.getMonth() + 1).toString();
    }

    return new Date(`${maximumYear}-${month}-01`);
};

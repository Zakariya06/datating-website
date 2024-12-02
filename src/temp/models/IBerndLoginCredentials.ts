export enum BerndLoginArts {
    BASIC = 1,
    FACEBOOK = 2,
    APPLE = 3,
    GOOGLE = 4,
}

export interface IBerndLoginCredentials {
    art: BerndLoginArts;
    email: string;
    kennwort: string;
    facebook_id: string;
    apple_id: string;
    google_id: string;
    ip: string;
}

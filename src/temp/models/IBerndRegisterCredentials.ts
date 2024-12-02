export enum BerndRegisterArts {
    BASIC = 1,
    FACEBOOK = 2,
    APPLE = 3,
    GOOGLE = 4,
}

export interface IBerndRegisterCredentials {
    art: BerndRegisterArts;
    facebook_id: string;
    apple_id: string;
    google_id: string;
    ip: string;
    username: string;
    kennwort: string;
    email: string;
    zip: string;
    city: string;
    country: string;
    born: string;
    min_age: number | null;
    max_age: number | null;
    distance: number | null;
    geschl: number | null;
    searchfor: number | null;
    relationship: number | null;
    hair: number | null;
    eyes: number | null;
    bodysize: number | null;
    living: number | null;
    bodyjewelry: number | null;
    smoker: number | null;
    bonuscode: string;
    pid: number | null;
}

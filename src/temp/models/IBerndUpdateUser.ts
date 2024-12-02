export interface IBerndUpdateUser {
    userid: string;
    kennwort: string | null;
    email: string | null;
    min_age: number | null;
    max_age: number | null;
    searchgender: number | null;
    distance: number | null;
    relationship: number | null;
    hair: number | null;
    eyes: number | null;
    bodysize: number | null;
    living: number | null;
    bodyjewelry: number | null;
    smoker: number | null;
}

export interface IBerndSocialUpdateUser {
    userid: string;
    born: string;
    zip: string;
    city: string;
    country: string;
    geschl: number;
    searchfor: number;
    min_age: number;
    max_age: number;
    distance: number;
}

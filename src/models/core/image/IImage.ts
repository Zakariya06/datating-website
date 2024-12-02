export interface IImage {
    // TODO: definition says it's a number, which shouldn't
    // id: string;
    // path: string;
    // isApproved?: boolean;
    // isProfileImage?: boolean;
    // isCoinImage?: boolean;
    // cost?: number;
    // purchaseStatus?: boolean | null;

    id?: string;
    Picture: string;
    ProfileImage?: boolean;
    Coins?: number;
    // isApproved?: boolean;
    // isCoinImage?: boolean;
    // purchaseStatus?: boolean | null;
}

export interface IPicture {
    Picture: string;
    ProfileImage: boolean;
    Coins: number;
}

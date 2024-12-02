// TODO:
export enum BerndUploadImageArts {
    PROFILE = 1,
    NORMAL = 0,
    COIN = 0, // Coin is 0 with coin amount!
    VERIFY = 2,
}

export interface IBerndUploadImage {
    foto: string;
    coins: number;
    art: number;
}

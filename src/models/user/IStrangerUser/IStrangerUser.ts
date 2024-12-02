import { IUserBase } from '../IUser';

export interface IStrangerUser extends IUserBase {
    Profilid: string;
    AllreadyChattet: boolean;
    IsLiked: boolean;
}

export interface ISPublicUser extends IUserBase {
    Profilid: string;
    AllreadyChattet: boolean;
    IsLiked: boolean;
}

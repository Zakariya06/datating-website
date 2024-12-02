import { IUser } from '../../user/IUser';

export interface ILoginResult {
    token: string;
    issuedAt: string;
    expiresAt: string;
    _embedded: {
        user: IUser;
    };
}

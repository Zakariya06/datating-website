import { IUser } from '../../user/IUser';

export interface IRegistrationResult {
  token: string;
  issuedAt: string;
  expiresAt: string;
  _embedded: {
    user: IUser;
  };
}

import { DirectInteractionActionCreator } from '../../actions/DirectInteractionActionCreator';
import { IStrangerUser } from './IStrangerUser/IStrangerUser';
import { IUser } from './IUser';

export async function fetchUser(userId: string, profilid: string, token: string, user: IUser) {
    const response: IStrangerUser = await (await DirectInteractionActionCreator.fetchStrangerUser(profilid, token, user)).json();

    return response;
}

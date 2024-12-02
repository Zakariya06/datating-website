import { DirectInteractionActionCreator } from '../../actions/DirectInteractionActionCreator';
import { ISPublicUser } from './IStrangerUser/IStrangerUser';


export async function fetchPublicUser(profilid: string) {
    const response: ISPublicUser = await (await DirectInteractionActionCreator.fetchPublicUser(profilid)).json();

    return response;
}
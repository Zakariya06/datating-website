import { BerndLoginArts } from './../temp/models/IBerndLoginCredentials';
import Config from '../config';
import FetchApi from '../core/fetch/FetchApi';
import generateValidUrl from '../core/fetch/generateValidUrl';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { ChatMessageTypes } from '../models/chat/ChatMessageType';
import { IUser } from '../models/user/IUser';
import formatRequestBody from '../temp/formatRequestBody';
import { chatMessageTypeToBerndMessageArt } from '../temp/models/IBerndChatMessage';
import { IFacebookRegistrationCredentials } from 'models/authentication/registration/IFacebookRegistrationCredentials';
import { BerndMapper } from 'temp/BerndMapper';
// import {getUserAndToken} from '../selectors/AuthenticationSelectors';

export class DirectInteractionActionCreator {
    public static async getClientIp(): Promise<string> {
        const json = await (await FetchApi.fetch(Config.IP_CHECK_URL, undefined, 'GET')).json();

        return json.ip;
    }

    public static async buyFavoritePackage(userId: string, value: number, user: IUser, token: string) {
        return FetchApi.fetch(Config.BASE_URL, formatRequestBody(Config.BUY_FAVORIT_PAKET, userId, { value: value }), HttpMethods.POST, token, user);
    }

    public static async triggerFacebookLogin(facebookId: string) {
        return FetchApi.fetch(
            generateValidUrl(Config.FACEBOOK_LOGIN_USER_URL),
            formatRequestBody(Config.LOGIN_USER_URL, undefined, {
                facebook_id: facebookId,
                art: BerndLoginArts.FACEBOOK,
                email: '',
                kennwort: '',
                apple_id: '',
                google_id: '',
                ip: '23.32.161.205',
            }),
            HttpMethods.POST,
            '',
            undefined
        );
    }

    public static async triggerFacebookRegister(registerData: IFacebookRegistrationCredentials) {
        return FetchApi.fetch(
            generateValidUrl(Config.FACEBOOK_REGISTER_USER_URL),
            formatRequestBody(Config.REGISTER_USER_URL, undefined, BerndMapper.mapFacebookRegisterCredentials(registerData)),
            HttpMethods.POST
        );
    }

    public static async getMatchingLocation(zip?: string, city?: string, country: string = 'de') {
        const formattedZip = zip;
        return FetchApi.fetch(
            generateValidUrl(undefined),
            formatRequestBody(Config.GET_LOCATIONS_URL, undefined, { country: country, zip: formattedZip, city: city }),
            HttpMethods.GET
        );
    }

    public static async purchaseCoinImage(profilId: string, imageId: string, token: string, user: IUser) {
        const url = generateValidUrl(Config.PURCHASE_COIN_IMAGE_URL);

        return FetchApi.fetch(
            url,
            formatRequestBody(Config.PURCHASE_COIN_IMAGE_URL, user.Userid, {
                profilid: profilId,
                picture: imageId,
            }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async fetchStrangerUser(userId: string, token: string, user: IUser) {
        return FetchApi.fetch(
            Config.BASE_URL,
            formatRequestBody(Config.GET_USER_URL, user.Userid, { profilid: userId }),
            HttpMethods.GET,
            token,
            user
        );
    }

    public static async fetchPublicUser($profilid: string) {
        const url = generateValidUrl(Config.GET_PUBLIC_USER_URL);
        return FetchApi.fetch(
            url,
            formatRequestBody(Config.GET_PUBLIC_USER_URL,'', { profilid: $profilid }),
            HttpMethods.GET,
        );
    }





    // public static async fetchGameUsers(token: string, user: IUser, count: number = 21, signal?: AbortController | null) {
    //     return FetchApi.fetch(
    //         Config.BASE_URL,
    //         formatRequestBody(Config.GET_USERS_URL, token, {
    //             anzahl: count,
    //         }),
    //         HttpMethods.POST,
    //         token,
    //         user,
    //         undefined,
    //         signal
    //     );
    // }

    public static async searchUsers(token: string, user: IUser, searchText: string) {
        return FetchApi.fetch(
            Config.BASE_URL,
            formatRequestBody(Config.SEARCH_USERS_URL, token, {
                search: searchText,
                anzahl: 50,
            }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async triggerStrangerUserRelation(userId: string, action: 'like' | 'dislike', token?: string, user?: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.USER_INTERACTION_URL, token, {
                profilid: userId,
                wert: action === 'like' ? 1 : 0,
            }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async triggerMatchStrangerUserRelation(userId: string, action: 'like' | 'dislike', token?: string, user?: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.USER_MATCHGAME_URL, token, {
                profilid: userId,
                wert: action === 'like' ? 1 : 0,
            }),
            HttpMethods.POST,
            token,
            user
        );
    }    

    public static async triggerVisitUser(userId: string, token?: string, user?: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.SEND_VISIT_URL, user?.Userid, { profilid: userId }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async sendZwinkerMessage(userId: string, token?: string, user?: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.SEND_MESSAGE_TO, token, {
                profilid: userId,
                type: chatMessageTypeToBerndMessageArt(ChatMessageTypes.ZWINKER),
                text: 'wink',
            }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async triggerTurboRakete(token: string, user: IUser) {
        return FetchApi.fetch(generateValidUrl(undefined), formatRequestBody('set_turborakete', user.Userid, {}), HttpMethods.POST, token, user);
    }

    public static async getTurboRakete(token: string, user: IUser) {
        return FetchApi.fetch(generateValidUrl(undefined), formatRequestBody('get_turborakete', user.Userid, {}), HttpMethods.GET, token, user);
    }

    public static async getIcebreakerTexts(userId: string, token: string, user: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.GET_ICEBREAKER_TEXTS_URL, user.Userid, {
                profilid: userId,
            }),
            HttpMethods.GET,
            token,
            user
        );
    }

    public static async sendIcebreakerText(userId: string, textId: number, token: string, user: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.SEND_ICEBREAKER_URL, user.Userid, {
                profilid: userId,
                textid: textId,
            }),
            HttpMethods.POST,
            token,
            user
        );
    }

    public static async getDailyCoins(token: string, user: IUser) {
        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody(Config.GET_DAILY_COINS_URL, user.Userid, {}),
            HttpMethods.GET,
            token,
            user
        );
    }

    public static async triggerVerficationEmail( user: IUser) {

        return FetchApi.fetch(
            generateValidUrl(Config.BASE_URL),
            formatRequestBody('send_verify', user.Userid, {}),
            HttpMethods.POST,
            '',
            user
        );
    }
}

export default DirectInteractionActionCreator;
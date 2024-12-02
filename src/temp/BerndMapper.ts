import CookieStorageAPI from './../core/storage/CookieStorageAPI';
import ResourceService from './../services/i18n/ResourcesService';
import Config from '../config/config';
import isNullOrUndefined from '../core/typeguards/isNullOrUndefined';
import isNumber from '../core/typeguards/isNumber';
import { IAppleLoginCredentials } from '../models/authentication/login/IAppleLoginCredentials';
import { IFacebookLoginCredentials } from '../models/authentication/login/IFacebookLoginCredentials';
import { ILoginCredentials } from '../models/authentication/login/ILoginCredentials';
import { IAppleRegistrationCredentials } from '../models/authentication/registration/IAppleRegistrationCredentials';
import { IFacebookRegistrationCredentials } from '../models/authentication/registration/IFacebookRegistrationCredentials';
import { IRegistrationCredentials } from '../models/authentication/registration/IRegistrationCredentials';
import { IChatMessage } from '../models/chat/IChatMessage';
import { IDialog } from '../models/chat/IDialog';
import { IPaginatedCollection } from '../models/collections/IPaginatedCollection';
import { IImage } from '../models/core/image/IImage';
import { IUploadImage } from '../models/core/image/IUploadImage';
import { IUpdateLocationCredentials } from '../models/location/IUpdateLocationCredentials';
import { IProduct } from '../models/product/IProduct';
import { ProductTypes } from '../models/product/ProductType';
import { IReceiptAndroid } from '../models/receipt/IReceiptAndroid';
import { IReceiptIOS } from '../models/receipt/IReceiptIOS';
import { Genders } from '../models/user/Gender';
import { IDevice } from '../models/user/IDevice';
import { IUpdateUser } from '../models/user/IUpdateUser';
import { IUser, getAge } from '../models/user/IUser';
import IPService from '../services/IPService';
import { GenderSearchTraits, GenderTraits } from './models/BerndUserTraits';
import { IBerndChangeImage } from './models/IBerndChangeImage';
import { IBerndChatMessage, berndChatMessageArtToMessageTyp } from './models/IBerndChatMessage';
import { IBerndDialog } from './models/IBerndDialog';
import { IBerndFirebaseDevice } from './models/IBerndFirebaseDevice';
import { BerndLoginArts, IBerndLoginCredentials } from './models/IBerndLoginCredentials';
import { IBerndProduct } from './models/IBerndProduct';
import { BerndRegisterArts, IBerndRegisterCredentials } from './models/IBerndRegisterCredentials';
import { IBerndSocialUpdateUser, IBerndUpdateUser } from './models/IBerndUpdateUser';
import { BerndUploadImageArts, IBerndUploadImage } from './models/IBerndUploadImage';

export class BerndMapper {
    public static mapToPaginatedCollection<T extends {}>(items: T[]): IPaginatedCollection<T> {
        return {
            total: items.length,
            pages: 1,
            page: 1,
            limit: 0,
            _embedded: {
                items: items,
            },
            _links: {
                self: {
                    href: '',
                },
            },
        };
    }

    public static mapLoginCredentials(credentials: ILoginCredentials): IBerndLoginCredentials {
        return {
            art: BerndLoginArts.BASIC,
            email: credentials.email,
            kennwort: credentials.password,
            facebook_id: '',
            apple_id: '',
            google_id: '',
            ip: IPService.currentIP,
        };
    }

    public static mapAppleLoginCredentials(credentials: IAppleLoginCredentials): IBerndLoginCredentials {
        return {
            art: BerndLoginArts.APPLE,
            email: credentials.email,
            kennwort: '',
            facebook_id: '',
            apple_id: credentials.authorizationCode,
            google_id: '',
            ip: IPService.currentIP,
        };
    }

    public static mapFacebookLoginCredentials(credentials: IFacebookLoginCredentials): IBerndLoginCredentials {
        return {
            art: BerndLoginArts.FACEBOOK,
            email: '',
            kennwort: '',
            facebook_id: credentials.fbToken,
            apple_id: '',
            google_id: '',
            ip: IPService.currentIP,
        };
    }

    public static mapRegisterCredentials(credentials: IRegistrationCredentials): IBerndRegisterCredentials {
        const { city, dateOfBirth, email, gender, name, password, postalCode, preferredGender, country } = credentials;

        // deviceId,
        // profileImageEncoded,
        // pushPreference,
        const pid = CookieStorageAPI.getItem('pid');

        return {
            art: BerndRegisterArts.BASIC,
            facebook_id: '',
            apple_id: '',
            google_id: '',
            ip: IPService.currentIP,
            username: name,
            kennwort: password,
            email: email,
            zip: postalCode,
            city: city,
            country: country,
            born: dateOfBirth,
            min_age: Math.min(Math.max(getAge(dateOfBirth) - 5, Config.MIN_AGE) ?? Config.MIN_AGE, 30),
            max_age: Math.min(getAge(dateOfBirth) + 3, Config.MAX_AGE) ?? Config.MAX_AGE,
            distance: 100,
            geschl: gender === Genders.MALE ? GenderTraits.MALE : GenderTraits.FEMALE,
            searchfor: isNullOrUndefined(preferredGender) ? GenderSearchTraits.FEMALE : preferredGender,
            relationship: null,
            hair: null,
            eyes: null,
            bodysize: 0,
            living: null,
            bodyjewelry: null,
            smoker: null,
            bonuscode: '',
            pid: pid ? parseInt(pid, 10) : null,
        };
    }

    public static mapFacebookRegisterCredentials(credentials: IFacebookRegistrationCredentials): IBerndRegisterCredentials {
        const { city, dateOfBirth, email, postalCode, fbToken, name } = credentials;

        // deviceId,
        // profileImageEncoded,
        // pushPreference,

        const pid = CookieStorageAPI.getItem('pid');

        return {
            art: BerndRegisterArts.FACEBOOK,
            facebook_id: fbToken,
            apple_id: '',
            google_id: '',
            ip: IPService.currentIP,
            username: name,
            kennwort: '',
            email: email,
            zip: postalCode,
            city: city,
            country: ResourceService.getCurrentLanguage(),
            born: dateOfBirth,
            min_age: Config.MIN_AGE,
            max_age: Config.MAX_AGE,
            distance: 100,
            geschl: null,
            searchfor: GenderSearchTraits.FEMALE,
            relationship: null,
            hair: null,
            eyes: null,
            bodysize: null,
            living: null,
            bodyjewelry: null,
            smoker: null,
            bonuscode: '',
            pid: pid ? parseInt(pid, 10) : null,
        };
    }

    public static mapAppleRegisterCredentials(credentials: IAppleRegistrationCredentials) {
        const { user, authorization } = credentials;

        const pid = CookieStorageAPI.getItem('pid');

        return {
            art: BerndRegisterArts.APPLE,
            facebook_id: '',
            apple_id: authorization.id_token,
            google_id: '',
            ip: IPService.currentIP,
            username: user.name.firstName,
            kennwort: '',
            email: user.email,
            zip: '20095',
            city: '',
            country: ResourceService.getCurrentLanguage(),
            born: '',
            min_age: Config.MIN_AGE,
            max_age: Config.MAX_AGE,
            distance: 100,
            geschl: 1,
            searchfor: GenderSearchTraits.FEMALE,
            relationship: null,
            hair: null,
            eyes: null,
            bodysize: null,
            living: null,
            bodyjewelry: null,
            smoker: null,
            bonuscode: '',
            pid: pid ? parseInt(pid, 10) : null,
        };
    }

    public static mapUploadImage(image: IUploadImage): IBerndUploadImage {
        const { image: src, cost = 0, isCoinImage = false, isProfileImage = false, isVerifyImage = false } = image;
        const art = isProfileImage ? BerndUploadImageArts.PROFILE : isVerifyImage ? BerndUploadImageArts.VERIFY : isCoinImage ? BerndUploadImageArts.COIN : BerndUploadImageArts.NORMAL;

        return {
            foto: src,
            art: art,
            coins: cost ?? 0,
        };
    }

    public static mapChangeImage(id: string): IBerndChangeImage {
        return {
            profilpicture: true,
            coins: 0,
            foto: id,
        };
    }

    public static mapDevice(device: IDevice): IBerndFirebaseDevice {
        return {
            firebaseid: device.firebaseId,
        };
    }

    public static mapUpdateUser(user: IUpdateUser): IBerndUpdateUser {
        return {
            userid: user.id,
            kennwort: user.password ?? '',
            email: user.email ?? '',
            min_age: user.preferredMinAge ?? Config.MIN_AGE,
            max_age: user.preferredMaxAge ?? Config.MAX_AGE,
            searchgender: user.preferredGender ?? GenderSearchTraits.FEMALE,
            distance: user.preferredMaxDistance ?? 100,
            relationship: user.relationship || null,
            hair: user.hair || null,
            eyes: user.eyes || null,
            bodysize: user.height ?? null,
            living: user.living || null,
            bodyjewelry: user.bodyjewelry || null,
            smoker: user.smoker || null,
        };
    }
    public static mapUpdateSocialUser(user: IUpdateUser): IBerndSocialUpdateUser {
        return {
            userid: user.id,
            born: user.dateOfBirth ?? '1970-01-01',
            zip: user.postalCode,
            city: user.city,
            country: ResourceService.getCurrentLanguage(),
            geschl: user.gender ?? 0,
            searchfor: user.preferredGender ?? 0,
            min_age: user.preferredMinAge ?? 18,
            max_age: user.preferredMaxAge ?? 30,
            distance: user.preferredMaxDistance ?? 80,
        };
    }

    public static mapUpdateUserForUser(user: IUser): IUpdateUser {
        return {
            id: user.Userid,
            email: '',
            password: '',
            city: user.City,
            postalCode: user.Zip,
            userName: user.Username,
            preferredMinAge: user.MinAge,
            preferredMaxAge: user.MaxAge,
            preferredMaxDistance: user.Distance,
            relationship: user.Relationship || null,
            hair: user.Hair || null,
            eyes: user.Eyes || null,
            height: user.Size ?? null,
            living: user.Living || null,
            bodyjewelry: user.Bodyjewelry || null,
            smoker: user.Smoker || null,
            dateOfBirth: user.Birthday,
            preferredGender: user.SearchGender,
        };
    }

    public static mapBerndDialogToDialog(dialog: IBerndDialog, userId: string): IDialog {
        const {
            Profilid,
            Date: msgDate,
            LastMessage,
            LastTyp,
            Unread,
            Username,
            LastMessageFrom,
            Picture,
            Messages,
            IsFavorit = false,
            Profilage,
            Offen,
            IsOnline,
        } = dialog;

        return {
            uuid: Profilid,
            isFavorite: IsFavorit,
            offen: Offen,
            partner: {
                id: Profilid,
                isOnline: IsOnline,
                name: Username,
                photo: Picture,
                unread: isNumber(Unread) ? Unread : 0,
                username: Profilid,
                age: Profilage,
            },
            chatMessages: Messages ? Messages.map(this.mapBerndChatMessageToChatMessage) : [],
            lastMessage: LastMessage
                ? {
                      datetime: msgDate,
                      isSeen: isNumber(Unread) ? Unread === 0 : true,
                      timestamp: 0,
                      type: berndChatMessageArtToMessageTyp(LastTyp),
                      sender: LastMessageFrom,
                      message: LastMessage,
                      recipient: LastTyp === 1 ? '' : Profilid,
                  }
                : undefined,
        };
    }

    public static mapBerndImageUploadResponse(Picture: string, IsProfile: boolean, Coins: number): IImage {
        return {
            Picture: Picture,
            ProfileImage: IsProfile,
            Coins: Coins,
        };
    }

    public static mapBerndChatMessageToChatMessage(message: IBerndChatMessage): IChatMessage {
        return {
            datetime: message.Date,
            isSeen: true,
            timestamp: 0,
            type: berndChatMessageArtToMessageTyp(message.Typ ?? message.Art),
            sender: message.Sender,
            message: message.Message,
            recipient: '',
        };
    }

    public static mapBerndProductToProduct(product: IBerndProduct): IProduct {
        return {
            id: String(product.PaketId),
            name: product.Name,
            description: '',
            coins: product.Coins,
            isActive: true,
            amount: product.Amount,
            market: product.Store,
            type: ProductTypes.NORMAL,
            promoAmount: product.Bonus,
            uuid: product.StoreId,
            createdAt: '',
            updatedAt: '',
        };
    }

    public static filterBerndProducts(products: IBerndProduct[]) {
        const osCheck = 'Standard';
        return products.filter((x) => x.Store === osCheck || x.Store === 'PaySafe Card');
    }

    public static mapBerndPaymentIos(receipt: IReceiptIOS) {
        return {
            paketid: receipt.productId,
            transid: receipt.transactionId,
            transcode: receipt.transactionId,
            transresult: 'success',
            datum: receipt.transactionDate,
            amount: receipt.amount,
        };
    }

    public static mapBerndPaymentAndroid(receipt: IReceiptAndroid) {
        return {
            paketid: receipt.productId,
            transid: receipt.transactionId,
            transcode: receipt.transactionId,
            transresult: 'success',
            datum: receipt.transactionDate,
            amount: receipt.amount,
        };
    }

    public static mapUpdateLocationCredentials(location: IUpdateLocationCredentials) {
        return {
            country: location.country,
            zip: location.postalCode,
            city: location.city,
        };
    }
}

export default BerndMapper;

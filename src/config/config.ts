import generateValidUrl from '../core/fetch/generateValidUrl';
import getLocationsUrl from './getLocationsUrl';
import getRelationshipsUrl from './getRelationshipsUrl';
import getUsersUrl from './getUsersUrl';

export const Config = {
    // DEVELOPMENT
    // BASE_URL: 'https://dev-api-verpaar.uhp.dev',
    // CHAT_WS_URL: 'wss://dev-chat-verpaar.uhp.dev',
    // ADJUST_ENVIRONMENT: AdjustConfig.EnvironmentSandbox,
    // MICROPAYMENT_PROJECT_ID: '12s6-dkppe-c4bae406',
    // MICROPAYMENT_ACCESS_KEY: '2c1c80ca17d008a02e10e8b8361da2b5',
    // BASE_URL: 'https://dev1.bb9ff.de/single.php',
    // BASE_URL_IMAGE: 'https://dev1.bb9ff.de/singlefoto.php',

    BLACKLIST_ACTION_PREFIX: '__NOT_IMPLEMENTED_YET__',

    BASE_URL: process.env.REACT_APP_BASE_URL || 'https://dev.yuulio.de/single.php',
    BASE_URL_IMAGE: process.env.REACT_APP_BASE_URL_IMAGE || 'https://dev.yuulio.de/singlefoto.php',
    BASE_URL_GIFT_IMAGE: process.env.REACT_APP_BASE_URL_GIFT_IMAGE || 'https://dev.yuulio.de/images/gifts/',

    GLOBAL_PRIMARY_COLOR: '#FF8B50',
    GLOBAL_SITE_COINS: 'Voluus',
    GLOBAL_SITE_NAME: 'Voluu',
    GLOBAL_SITE_DOMAIN: 'voluu.de',
    GLOBAL_IMPRESSUM_NAME: 'Lea Laetisha',
    GLOBAL_IMPRESSUM_STEUERNR: '202341983N',
    GLOBAL_AGB_ADDR: 'Skycom Pte. Ltd., 68 CIRCULAR ROAD #02-01, 049422 Singapore',
    GLOBAL_INTERN_PAYPAL: true,
    GLOBAL_MICROPAYMENT_TLD: 'ch',

    ADMIN_URL: 'https://mein-adminpanel.de/api.php',
    ADMIN_APIKEY: '',

    IP_CHECK_URL: 'https://api64.ipify.org?format=json',

    CHAT_WS_URL: 'wss://dev.yuulio.de',
    // TODO:
    ADJUST_ENVIRONMENT: '',
    MICROPAYMENT_PROJECT_ID: '',
    MICROPAYMENT_ACCESS_KEY: '',

    PING_INTERVAL: 6000, // 60s
    WS_RECONNECT_INTERVAL: 6000,
    REFRESH_CHAT_INTERVAL: process.env.NODE_ENV === 'development' ? 10000 : 20000,
    REFRESH_CHATS_INTERVAL: process.env.NODE_ENV === 'development' ? 10000 : 20000,
    REFRESH_NOTIFICATIONS_INTERVAL: 60000,

    // APP CONFIG
    GOOGLE_PACKAGE_NAME: 'com.appmeeted',
    APPLE_APP_ID: '',
    ADJUST_ID: '',
    FACEBOOK_APP_ID: '',
    PAYPAL_TOKEN: '',

    // ADJUST
    ADJUST_EVENT_SOI: '',
    ADJUST_EVENT_DOI: '',

    TERMS_WEB_URL: 'https://voluu.de/agb',
    LEGAL_WEB_URL: 'https://voluu.de/datenschutz',
    IMPRINT_WEB_URL: 'https://voluu.de/impressum',

    // coin amounts
    SEND_MESSAGE_AMOUNT: 10,
    UNLOCK_USER_AMOUNT: 5,
    CHANGE_LOCATION_AMOUNT: 50,
    SEND_ZWINKER_AMOUNT: 6,
    TURBO_ROCKET_AMOUNT: 50,
    ICEBREAKER_AMOUNT: 7,
    FREE_DAILY_COINS_AMOUNT: 3,
    MAX_MESSAGE_CHARS: 160,

    // default list size:
    SKIPPED_FETCH_USERS_COUNT: 10,
    GRID_FETCH_USERS_COUNT: 30,
    // min and max age
    MIN_AGE: 18,
    MAX_AGE: 80,

    MIN_DISTANCE: 5,
    MAX_DISTANCE: 200,

    // image fallback
    FALLBACK_IMAGE: 'https://vimcare.com/assets/empty_user-e28be29d09f6ea715f3916ebebb525103ea068eea8842da42b414206c2523d01.png',
    // account urls
    LOGIN_USER_URL: 'set_login' || '/v1/account/tokens',
    GET_TOKEN_URL: '/v1/account/tokens',
    REGISTER_USER_URL: 'set_newuser' || '/v1/account/users',
    FACEBOOK_LOGIN_USER_URL: 'set_login' || '/v1/account/facebook/tokens',
    FACEBOOK_REGISTER_USER_URL: 'set_newuser' || '/v1/account/facebook/users',
    UPDATE_SEARCH_SETTINGS_URL: 'set_userdata' || '/v1/account/users/self/dating-preferences',
    UPDATE_USER_PROFILE_URL: 'set_userdata' || '/v1/account/users/self',
    UPDATE_SOCIAL_USER_PROFILE_URL: 'set_socialuser',
    REFRESH_USER_PROFILE_URL: 'get_my_data',
    CREATE_DEVICE: 'set_firebase' || '/v1/account/users/self/devices',
    DELETE_USER_URL: 'delete_user' || '/v1/account/users/self',
    APPLE_LOGIN_USER_URL: '/v1/account/apple/tokens',
    APPLE_REGISTER_USER_URL: '/v1/account/apple/users',

    // images
    UPLOAD_PICTURE_URL: 'set_userpicture' || '/v1/images',
    DELETE_PICTURE_URL: /*(id: string) =>*/ 'delete_picture' /*`/v1/images/${id}`,*/,
    PURCHASE_COIN_IMAGE_URL: 'buy_picture' || '/v1/images/purchases',

    SET_AS_PROFILE_PICTURE_URL: 'change_picture', //(id: string) => `/v1/account/users/self/images/profile/${id}`,
    UPLOAD_COIN_PICTURE_URL: 'set_userpicture' || '/v1/account/users/self/images/coin',

    UNLOCK_USER_URL: 'set_coinobject',

    // users
    GET_USERS_URL: 'get_matchfinder' || getUsersUrl,
    SEARCH_USERS_URL: 'get_searchprofiles',
    // GET_USER_URL: (id: string) => generateValidUrl(`/v1/dating/users/${id}`),
    GET_USER_URL: 'get_profile' || ((id: string) => generateValidUrl(`/v1/dating/person-users/${id}`)),
    GET_PUBLIC_USER_URL: 'get_publicProfile' || ((id: string) => generateValidUrl(`/v1/dating/person-users/${id}`)),
    // TODO:
    TRIGGER_VERIFICATION_MAIL: 'set_verificationmail',

    GET_DAILY_COINS_URL: 'get_tagescoins',
    //TODO:
    REDEEM_BONUS_CODE_URL: 'get_bonuscode',

    // dialog
    DIALOG_URL: '/v1/dialogs',
    DELETE_DIALOG_URL: (id: string) => 'delete_chat_from' || `/v1/dialogs/${id}`,
    SEND_MESSAGE_TO: 'set_message_to',
    GET_DIALOGS_URL: 'get_all_messages',
    GET_DIALOG_URL: 'get_message_from',
    REFRESH_DIALOG_URL: 'get_new_message_from',
    REFRESH_DIALOGS_URL: 'get_new_message_from_all',
    GET_PRESENTS_URL: 'get_gifts',
    READ_DIALOG_URL: 'set_read_dialog',
    UPDATE_LOCATION_URL: 'set_newplz',
    GET_DEAL_URL: 'get_deal',
    RESTORE_CHAT_URL: (id: string) => 'restore_chat',

    // relationships
    USER_INTERACTION_URL: 'set_matchfinder' || '/v1/relationships',
    USER_MATCHGAME_URL: 'set_matchgame' || '/v1/relationships',
    GET_RELATIONSHIP_USERS_URL: getRelationshipsUrl,
    SEND_VISIT_URL: 'set_visit',

    // products
    // TODO: we need all products to display the active products
    // on AppStore and PlayStore
    GET_PRODUCT_URL: 'get_products' || '/v1/products?page[size]=100',

    // coins
    VERIFY_PURCHASE_IOS: 'set_payment' || '/v1/coins/purchase/verify/ios',
    VERIFY_PURCHASE_ANDROID: 'set_payment' || '/v1/coins/purchase/verify/google',
    PURCHASE_COINS_URL: '/v1/coins/purchase',
    SET_PAYPAL_URL: 'set_paypal',

    // forgot password
    FORGOT_PASSWORD_URL: 'set_newpassword' || '/v1/account/password-reset',
    FORGOT_PASSWORD_URLL: 'set_password' || '/v1/account/password-reset',
    // locations
    GET_LOCATIONS_URL: 'get_city' || getLocationsUrl,

    // user attributes
    USER_ATTRIBUTES_URL: '/v1/user-attributes',

    //OptInState
    OPT_IN_SELF_STATE_URL: '/v1/account/users/self/opt-in',
    OPT_IN_STATE_URL: (id: number) => `/v1/account/users/${id}/opt-in`,

    // Icebreaker
    GET_ICEBREAKER_TEXTS_URL: 'get_eisbrecher_text',
    SEND_ICEBREAKER_URL: 'set_eisbrecher',

    //Favorites
    GET_FAVORIT_NUMBER: 'get_favorit_number',
    SET_FAVORIT: 'set_favorit',
    UNSET_FAVORIT: 'delete_favorit',
    BUY_FAVORIT_PAKET: 'buy_favorit_paket',
};

export default Config;

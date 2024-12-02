import { IResourceDictionary } from './../models/IResourceDicitionary';
import Config from './../../../config';

export const en: IResourceDictionary = {
    EMPTY_INPUT: 'you need to fill in this field.',
    EMPTY_EMAIL_INPUT: 'type in your E-Mail to log in.',
    EMPTY_PASSWORD_INPUT: 'type in your password to log in.',
    EMPTY_NAME_INPUT: 'typ in your name to register.',
    EMPTY_LOCATION_INPUT: 'type in your place of residence to register.',
    EMPTY_ZIP_INPUT: 'Please choose an location from the proposals to carry on.',
    EMPTY_IMAGE_INPUT: 'you need a Profilce Picture to register.',
    WRONG_EMAIL_OR_PASSWORD: 'E-Mail or password incorrect!',
    WRONG_EMAIL: 'wrong E-Mail!',
    WRONG_PASSWORD: 'wrong password!',
    NOT_VALID_EMAIL: 'please choose an valid E-Mail!',
    DIALOG_PASSWORD_CHANGEREQUEST: "We've send you an description to reset your password.",
    DIALOG_ALLOW_GALERIE_ACCESS: 'you need to give ' + Config.GLOBAL_SITE_NAME + ' access to your gallery. Please carry on to your settings.',
    DIALOG_ALLOW_CAMERA_ACCESS: '^you need to give ' + Config.GLOBAL_SITE_NAME + ' access to your camera. Please carry on to your settings.',
    DIALOG_INVALID_FILE: 'Videos are not allowed!',

    DIALOG_WS_CONNECTION_LOST_TEXT: 'The connection to our Chatservice was interrupted, reconnect is in the process.',

    ALERT_SESSION_EXPIRED_TITLE: 'session timed out.',
    ALERT_SESSION_EXPIRED_TEXT: 'Please sign in again.',

    ALERT_OFFLINE_TITLE: 'no internernet connection!',
    ALERT_OFFLINE_TEXT: 'please check your internet connection.',

    ALERT_DELETE_CHAT_TITLE: 'delete chat',
    ALERT_DELETE_CHAT_TEXT: 'are you sure to delete this chat?',

    SKIPPED_START_JOURNEY: 'Start the Journey of your Life',

    LOGIN_EMAIL: 'login with E-Mail',
    LOGIN_FACEBOOK: 'login with facebook',
    LOGIN_APPLE: 'login with apple',

    LOGIN_SAFETY: 'with your registration, you accept our',
    LOGIN_TERMS: 'terms of use',
    LOGIN_PRIVACY: 'privacy policy',

    LOGIN_EMAIL_INPUT: 'E-Mail',
    LOGIN_PASSWORD: 'Password',
    LOGIN_FORGOT_PASSWORD: 'forgot password?',
    LOGIN_BUTTON: 'sign in',
    LOGIN_NOT_YET: 'not yet registred?',

    REGISTER_EMAIL: 'register with E-Mail',
    REGISTER_EMAIL_DESCRIPTION: 'You\'ll need your E-Mail to register and log in yourself at ' + Config.GLOBAL_SITE_NAME + '. Only you can see your own E-Mail.',
    REGISTER_NAME_FORENAME: 'first name',
    REGISTER_NAME_ZIP: 'city or zip code',
    REGISTER_NAME_DESCRIPTION: 'We want to get to know you better. Whats your name and where do you come from?',
    REGISTER_IMAGE_DESCRIPTION:
        'To get started at ' + Config.GLOBAL_SITE_NAME + ' you need an profilce picture. This way its going to be easier to cennoct yourself with others.',
    REGISTER_PERSONAL_DATA_DESCRIPTION: 'We want to get to know you better. Are you male or female?',
    REGISTER_PERSONAL_DATA_BIRTHDATE: 'date of birth',

    DAY: 'Day',
    MONTH: 'Month',
    YEAR: 'Year',

    REGISTER_PERSONAL_DATA_GENDER: 'Gender',
    REGISTER_PERSONAL_DATA_MAN: 'Male',
    REGISTER_PERSONAL_DATA_WOMAN: 'Female',

    REGISTER_PASSWORD_DESCRIPTION: 'Set an safe password to protect your Account.',
    REGISTER_PASSWORD_REQUIREMENT: 'your password needs at least 6 letters, numbers or symbols',

    REGISTER_NOTIFICATION_TITLE: 'you are done!',
    REGISTER_NOTIFICATION_DESCRIPTION: 'Turn your notifications on so you dont miss anything!',
    REGISTER_NOTIFICATION_BUTTON: 'Register',

    REGISTER_PERSONAL_DATA_AGE: 'you have to be at least 18 years old to use ' + Config.GLOBAL_SITE_NAME + '!',
    REGISTER_PASSWORD_REQUIREMENTS: "the password doesn't match the requirements",
    REGISTER_PASSWORD_EMPTY: 'please type in a password',

    REGISTER_FAILED_TITLE: 'registration failed',
    REGISTER_FAILED_UNKNOWN: 'unknown error',
    REGISTER_FAILED_SPACE: 'your name cannot contain a space',
    REGISTER_FAILED_NUMBERS: 'your name cannot contain a number',
    REGISTER_FAILED_CAPITALS: 'your name cannot contain more than one capital letter',
    REGISTER_FAILED_LENGTH: 'your name is too long',

    PASSWORD_TEXT: "After you put in you E-Mail, we'll send you an Link to change your password.",
    PASSWORD_BUTTON: 'reset password',

    OWN_PROFILE_COINAMOUNT: 'credits: {coins}',

    OWN_PROFILE_CHANGE_PROFILE_PICTURE: 'change profile picture',
    OWN_PROFILE_UPLOAD_PHOTO: 'upload picture',

    OWN_PROFILE_EDIT: 'edit profile',
    OWN_PROFILE_NO_IMAGES: 'for better experience upload more pictures of yourself!',
    OWN_PROFILE_NO_IMAGES_BUTTON: 'upload picture',
    OWN_PROFILE_IMAGES_PROFILE_PICTURE: 'set as profile picture',
    OWN_PROFILE_IMAGES_DELETE: 'delete picture',
    OWN_PROFILE_YOUR_PICTURES: 'Your pictures',
    OWN_PROFILE_UPLOAD_IMAGE_TITLE: 'Upload a picture of you',
    DROPZONE_TEXT: 'Press or drag',
    DROPZONE_DRAG_TEXT: 'Drop file here!',

    OWN_PROFILE_NORMAL_IMAGE: 'Public',
    OWN_PROFILE_PRIVATE_IMAGE: 'Private',
    OWN_PROFILE_PRIVATE_IMAGE_COINS: 'Amount of coins: {coins}',
    OWN_VERIFY_UPLOAD_IMAGE_TITLE: 'Imitate this gesture',
    OWN_VERIFY_UPLOAD_IMAGE_DESC: 'You must imitate this gesture in the verification photo.',

    // Profiledetails
    TRAITS_GENDER_TITLE: 'Gender',
    TRAITS_GENDER_WOMAN: 'Female',
    TRAITS_GENDER_MAN: 'Male',

    TRAITS_SMOKER_TITLE: 'Smoker',
    TRAITS_SMOKER_YES: 'Yes',
    TRAITS_SMOKER_NO: 'Not smoking',
    TRAITS_SMOKER_OCCASIONALLY: 'Smoke sometimes',
    TRAITS_SMOKER_VAPE: 'Vaper',

    TRAITS_RELATIONSHIP_TITLE: 'Relationship status',
    TRAITS_RELATIONSHIP_GIVEN: 'Taken',
    TRAITS_RELATIONSHIP_SINGLE: 'Single',
    TRAITS_RELATIONSHIP_COMPLICATED: 'Its complicated',
    TRAITS_RELATIONSHIP_OPEN: 'Open relationship',
    TRAITS_RELATIONSHIP_MARRIED: 'Married',
    TRAITS_RELATIONSHIP_DIVORCED: 'Divorced',
    TRAITS_RELATIONSHIP_WIDOW: 'Widowed',

    TRAITS_EYECOLOR_TITLE: 'Eye Color',
    TRAITS_EYECOLOR_BLUE: 'Blue',
    TRAITS_EYECOLOR_GREEN: 'Green',
    TRAITS_EYECOLOR_BROWN: 'Brown',
    TRAITS_EYECOLOR_BLACK: 'Black',
    TRAITS_EYECOLOR_GREY: 'Grey',

    TRAITS_BODYJEWELRY_TITLE: 'Body jewelry',
    TRAITS_BODYJEWELRY_TATTOO: 'Tattoo',
    TRAITS_BODYJEWELRY_PIERCED: 'Piercing',
    TRAITS_BODYJEWELRY_BRANDING: 'Branding',
    TRAITS_BODYJEWELRY_TATTOO_AND_PIERCED: 'Tattoo and Piercing',
    TRAITS_BODYJEWELRY_NOTHING: 'Nothing',

    TRAITS_HAIRCOLOR_TITLE: 'Hair Color',
    TRAITS_HAIRCOLOR_BLONDE: 'Blonde',
    TRAITS_HAIRCOLOR_BROWN: 'Brown',
    TRAITS_HAIRCOLOR_BLACK: 'Black',
    TRAITS_HAIRCOLOR_RED: 'Red',
    TRAITS_HAIRCOLOR_GREY: 'Grey',

    TRAITS_LIVING_TITLE: 'Living situaiton',
    TRAITS_LIVING_ALONE: 'Alone',
    TRAITS_LIVING_PARENTS: 'With my Parents',
    TRAITS_LIVING_UNIVERSITY: 'At the University',
    TRAITS_LIVING_SHARED: 'Shared Aparment',
    TRAITS_LIVING_PARTNER: 'With Partner',

    // Sternzeichen
    TRAITS_STARSIGN_TITLE: 'Starsign',
    TRAITS_STARSIGN_ARIES: 'Aries',
    TRAITS_STARSIGN_TAURUS: 'Taurus',
    TRAITS_STARSIGN_GEMINI: 'Gemini',
    TRAITS_STARSIGN_CANCER: 'Cancer',
    TRAITS_STARSIGN_LEO: 'Leo',
    TRAITS_STARSIGN_VIGRO: 'Vigro',
    TRAITS_STARSIGN_LIBRA: 'Libra',
    TRAITS_STARSIGN_SCORPIO: 'Scorpio',
    TRAITS_STARSIGN_SAGITTARIUS: 'Sagittarius',
    TRAITS_STARSIGN_CAPRICORN: 'Capricorn',
    TRAITS_STARSIGN_AQUARIUS: 'Aquarius',
    TRAITS_STARSIGN_PISCES: 'Pisces',

    TRAITS_SIZE_TITLE: 'Size',
    TRAITS_ASKME: 'Just ask...',

    STRANGER_BLINK: 'Wink {name}!',
    STRANGER_BLINK_TITLE: 'Send a wink!',
    STRANGER_BLINK_SUBTITLE: 'Show now that you are interested in {name}.',
    STRANGER_BLINK_BUTTON: 'Wink ({Coins}C)',
    STRANGER_BLOCK: 'block User',
    STRANGER_REPORT: 'report User',
    STRANGER_ABOUT: 'Pictures of {name}',

    STRANGER_WHO_IS_BEHIND_THAT_PHOTO: 'Who is on this picture?',
    STRANGER_WHO_IS_BEHIND_THAT_PROFILE_SUBTITLE: 'Do you want to unlock this profile?',
    STRANGER_WHO_IS_BEHIND_THAT_PHOTO_SUBTITLE: 'Do you want to unlock this picture?',

    STRANGER_ASK_FOR_IMAGES: 'Ask {name}, if he or she wants to upload more pictures.',
    STRANGER_ASK_FOR_IMAGES_BUTTON: 'write {name}',

    SEARCH_SETTINGS_INTERESTED_IN: 'Interested in',
    SEARCH_SETTINGS_AGE: 'Age',
    SEARCH_SETTINGS_BETWEEN: 'between',
    SEARCH_SETTINGS_DISTANCE: 'Distance',

    BONUS_CODE_DIALOG_TITLE: 'Redeem bonus code',
    BONUS_CODE_DIALOG_INPUT: 'Type in bonus code',
    BONUS_CODE_DIALOG_BUTTON: 'redeem now',

    CHAT_MATCHES: 'Your Matches',
    CHAT_EMPTYSTATE: 'Try to match with other Users in our ' + Config.GLOBAL_SITE_NAME + ' Game!',

    CHAT_YOU: 'You:',

    CHAT_DELETE_TITLE: 'Delete chat?',
    CHAT_DELETE_TEXT: 'are you sure to delete this chat?',

    CHAT_GOT_A_BLINK: '{name} winked at you 😉',
    CHAT_SENT_A_BLINK: "You've sent {name} a wink 😉",

    CHAT_GOT_A_PRESENT: '{name} send you a present 🎁',
    CHAT_SENT_A_PRESENT: "You've sent a present 🎁",

    CHAT_GOT_A_IMAGE: '{name} send you an image 📷',
    CHAT_SENT_A_IMAGE: "You've sent an image 📷",

    CHAT_INTERFACE_EMPTYSTATE: 'Do the first step and write {name}!',
    CHAT_INTERFACE_TODAY: 'Today',
    CHAT_INTERFACE_YESTERDAY: 'Yesterday',
    CHAT_INTERFACE_SEND_A_MESSAGE: 'Send a Message...',

    PRESENTS_TITLE: 'Choose your gift for {name}',

    MENU_SETTINGS: 'Settings',
    MENU_SEARCHSETTINGS: 'Searchsettings',

    SETTINGS_BUY_COINS: 'Buy coins',
    SETTINGS_SEARCHSETTINGS: 'My searchsettings',
    SETTINGS_IMPRINT: 'Imprint',
    SETTINGS_DATASAFETY: 'Privacy',
    SETTINGS_AGB: 'Conditions',

    SETTINGS_ACCOUNT_SETTINGS: 'Account settings',
    SETTINGS_APP_SETTINGS: 'App-settings',
    SETTINGS_HELP_SUPPORT_TITLE: 'Help & Support',
    SETTINGS_HELP_SUPPORT_BUSINESS_REQUEST: 'Business requests',
    SETTINGS_HELP_SUPPORT_CONTACT: 'Contact & Support',
    SETTINGS_LAW: 'Legal',
    SETTINGS_BONUS_CODE_TEXT: 'Redeem Bonuscode now',
    SETTINGS_SHOP_TITLE: 'Shop coins now...',
    SETTINGS_SHOP_TEXT: '...and chat with whomever you want to!',
    SETTINGS_CONTACT_FORM: 'Contact support',

    SETTINGS_LOGOUT: 'Logout',

    SHOP_POPULAR: 'Popular',
    SHOP_RECOMMENDED: 'Recommended',

    SHOP_TITLE_STEP_1: '1. Choose your payment method',
    SHOP_TITLE_STEP_2: '2. Choose your package',

    SHOP_PAYPAL_TEXT: "You'll be redirected to PayPal and then you can easily pay with your Account.",
    SHOP_KLARNA_TEXT: 'With Klarna you can pay directly with your online banking and use the coins instantly.',
    SHOP_CREDIT_CARD_TEXT: 'Schnell und einfach mit deiner Kreditkarte und dem Sicherheitscode bezahlen.',
    SHOP_VORKASSE_TEXT: 'Nach eingang deiner Zahlung (1-2 Banktage) werden dir deine Coins gutgeschrieben.',
    SHOP_PAYSAFECARD_TEXT: "You'll be redirected to Paysafecard and then you can easily pay with your Account",

    COMPLETE_PROFILE_IMAGE_TITLE: 'Welcome!',
    SELECT_NEW_PROFILE_IMAGE_TITLE: 'Choose a new profile picture',
    SELECT_NEW_PROFILE_IMAGE_TEXT:
        'Hello {name}, glad to have you at ' + Config.GLOBAL_SITE_NAME + '! Please upload a picture of you, so that we can get to know you even better.',
    SELECT_NEW_PROFILE_IMAGE_BUTTON: 'upload profile picture',

    EMAIL_NOT_APPROVED_TITLE: 'E-Mail not verrified',
    EMAIL_NOT_APPROVED_TEXT: "To avoid spam, we'll give you free coins after verifying your E-Mail",
    EMAIL_NOT_APPROVED_BUTTON: 'close',

    LOGOUT_MODAL_TITLE: 'Logout',
    LOGOUT_MODAL_TEXT: 'Are you sure to logout at this device?',
    LOGOUT_MODAL_BUTTON: 'Logout',

    //COMPLETION SCREENS

    SEARCH_SETTINGS_MALE: 'Men',
    SEARCH_SETTINGS_FEMALE: 'Women',
    SEARCH_SETTINGS_LOCATION: 'Location',
    SEARCH_SETTINGS_BUTTON: 'Search now',

    USER_SEARCH_SIDEBAR_TITLE: 'Usersearch',
    USER_SEARCH_PLACEHOLDER: 'Username',
    USER_SEARCH_TITLE: 'Profilesearch',
    USER_SEARCH_EMPTY_STATE: "We couldn't find any user with the name {name}.",

    CHANGE_LOCATION_TITLE: 'Change Location',

    STRANGER_BLINK_SMALL: 'wink',
    STRANGER_ICEBREAKER_BUTTON: 'break ice',

    // ICEBREAKER
    ICEBREAKER_TITLE: 'your icebreaker to {name}',

    //TURBOROCKET
    TURBOROCKET_TITLE: 'Increase your visibility now!',
    TURBOROCKET_SUBTITLE: 'Get to know more new people in one hour',
    TURBOROCKET_COINS: 'for just {amount} Coins...',
    TURBOROCKET_RESTOFTIME: 'for the remaining time...',
    TURBOROCKET_POINT1: 'you gonna get more likes',
    TURBOROCKET_POINT2: 'more people gonna visit your profile.',
    TURBOROCKET_POINT3: 'you gonna appear more often to other users',
    TURBOROCKET_POINT4: 'increase your chance for a match.',
    TURBOROCKET_STARTNOW: 'start now ({amount}C)',
    TURBOROCKET_ALREADY_ACTIVE: 'your bonus is still active!',
    TURBOROCKET_INSUFFICIENT_COINS: 'you got not enough coins to start a turborocket.',

    //PREMIUM
    PREMIUM_TITLE: 'The Premium Membership',
    PREMIUM_SUBTITLE: 'Enjoy more benefits with a Premium Membership',
    PREMIUM_POINT1: '10 more profiles in the match every day',
    PREMIUM_POINT2: 'Unlimited likes',
    PREMIUM_POINT3: 'Undo swipes',
    PREMIUM_POINT4: 'View unlimited profiles',
    PREMIUM_POINT5: '20 additional stars',
    PREMIUM_ALREADY_ACTIVE: 'Your bonus is still active!',
    PREMIUM_INSUFFICIENT_COINS: 'You have too few coins to launch a turbo rocket.',
    PREMIUM_BUY: 'Buy now for {month}',
    PREMIUM_TODATE: 'Open days:',
    PREMIUM_SUCCESS: 'Your premium membership was activated.',
    
    // CHAT-FAVS

    FAVORITE_CHATS: 'chats',
    FAVORITE_FAVORITES: 'favorites',
    FAVORITE_STARS: 'your starbalance:',

    FAVORITE_MODAL_TITLE: 'buy new stars for your starwallet',
    FAVORITE_STARS_AMOUNT: '{stars} stars',
    FAVORITE_STARS_RECEIVED: 'you received {stars} stars!',
    FAVORITE_UNKNOWN_ERROR: 'an unknown error occured. please try again later or contact our support',

    // CountryPopper

    COUNTRY_TITLE: 'select a country',
    COUNTRY_GERMANY: '🇩🇪 Germany',
    COUNTRY_AUSTRIA: '🇦🇹 Austria',
    COUNTRY_SWITZERLAND: '🇨🇭 Switzerland',
    COUNTRY_USA: '🇺🇸 USA',

    //Unlock modal
    UNLOCK_INSUFFICIENT_COINS: "unfortunately, you don't have enough coins",
    UNLOCK_TITLE: 'who is behind that photo?',
    UNLOCK_TEXT: 'do you want to unlock it?',
    UNLOCK_INSUFFICIENT_COINS_BUTTON: 'Buy coins now',

    // Basics
    CANCEL: 'Cancel',
    NEXT: 'Next',
    SAVE: 'Save',
    NEW_ON_SKIPPED: 'New on ' + Config.GLOBAL_SITE_NAME + '',
    LOCATION_FROM: 'from',
    LIKE: 'Like',
    LIKED: 'Liked',
    MATCHED: 'matched',

    DISLIKE: 'Dislike',
    UNLOCK: 'Unlock ({Coins}C)',
    SEND: 'Send',
    DELETE: 'Delete',
    BUY: 'Buy',
    DISCOVER: 'Discover now!',
    VISITORS: 'Visitors',
    AND: 'and',
    CONFIRM: 'Confirm',
    MESSAGE: 'Message',
    NEW_TAG: 'NEW',
    EMPTY_STATE_TITLE: 'Pretty empty here!',
    EMPTY_STATE_DESCRIPTION: 'Come back later',
    SETTINGS_CHANGE_LANGUAGE_TITLE: 'Change Langauge',

    MENU_HOME: 'Home', 
    MENU_MATCHGAME: 'Matchgame',      
    MENU_NEARBY: 'Nearby',
    MENU_MESSAGES: 'Messages',
    MENU_VISITORS: 'Visitors',
    MENU_LIKES: 'Likes',
    MENU_OWN_PROFILE: 'My profile',
    MENU_DARK_MODE: 'Darkmode',
    MENU_NEWS: 'News',

    LIKE_SUCCESS: 'You have liked {name}!',

    BLOCKED_USERS_TITLE: 'Blocked Users',
    BLOCKED_USERS_UNLOCK_TITLE: 'Unblock {name}',
    BLOCKED_USERS_UNLOCK_TEXT: 'Willst du {name} freigeben? {pronoun} kann dir dann wieder Nachrichten senden und mit dir interagieren.',
    BLOCKED_USERS_UNBLOCK_ITEM_TEXT: 'Unblock',
    BLOCKED_USERS_EMPTY: "You haven't blocked any users.",

    DELETE_ACCOUNT_TITLE: 'Delete Account',
    DELETE_ACCOUNT_TEXT:
        // eslint-disable-next-line max-len
        'Are your sure, that you want to delete your account, containing all coins? (This can not be undone)',

    UNLOCK_IMAGE_TITLE: 'What is behind that photo?',
    UNLOCK_IMAGE_TEXT: 'Do you want to unlock that image of {name}?',
    UNLOCK_IMAGE_BUTTON: 'Unlock ({coins}C)',

    DAILY_LOGIN_DIALOG_TITLE: 'You received bonus coins!',
    DAILY_LOGIN_DIALOG_TEXT: `For your daily login you receive {coins} Coins.`,

    LANG_DE: 'German',
    LANG_EN: 'English',

    INSUFFICIENT_COINS_TITLE: 'Oh no!',
    INSUFFICIENT_COINS_TEXT: "You don't have enough coins left. You can charge your coins in the shop.",
    INSUFFICIENT_LIKES_TITLE: 'Warning!',
    INSUFFICIENT_LIKES_TEXT: "You don't have enough freelikes left. Now you will pay for every like two coins. You can charge your coins in the shop.",
    INSUFFICIENT_COINS_BUTTON: 'To the shop',

    HEADER_GREETER: 'Welcome {name}!',

    NEWSFEED_TITLE: 'Your Newsfeed',
    NEWSFEED_VERIFY: 'Verify now!',  
    NEWSFEED_VERIFIED: 'You are now verified!',     
    NEWSFEED_PROFILE_PICUTRE: 'Profile picture',
    NEWSFEED_EMAIL_VERIFICATION: 'E-Mail verified',
    NEWSFEED_APP_DOWNLOADED: 'App downloaded',

    ALERT_LOGIN_FAILURE: 'Error while logging in!',
    ALERT_UPDATE_SEARCH_SETTINGS: 'Searchsettings successfully saved!',
    ALERT_UPDATE_SEARCH_SETTINGS_FAILURE: "Searchsettings couldn't be saved!",
    ALERT_UPDATE_PROFILE_PICTURE: 'Profilep picture successfully changed!',
    ALERT_UPDATE_PROFILE_PICTURE_FAILURE: "Profile picture couldn't be saved!",
    ALERT_UPLOAD_PICTURE: 'Picture successfully uploaded!',
    ALERT_UPLOAD_PICTURE_FAILURE: "Picture couldn't be uploaded!",
    ALERT_DELETE_PICTURE: 'Picture successfully deleted!',
    ALERT_DELETE_PICTURE_FAILURE: "Picture couldn't be deleted!",
    ALERT_UPDATE_LOCATION: 'Location successfully changed!',
    ALERT_UPDATE_LOCATION_FAILURE: "Location couldn't be changed!",
    ALERT_UPDATE_PROFILE: 'User attributes successfully changed!',
    ALERT_UPDATE_PROFILE_FAILURE: "User attributes couldn't be changed!",
    ALERT_SET_FAVORIT: '{name} was added to your favorites!',
    ALERT_SET_FAVORIT_FAILURE: "{name} couldn't be added to your favorites!",
    ALERT_DELETE_ACCOUNT: 'Your account was successfully deleted!',
    ALERT_UNSET_FAVORIT: 'You have removed {name} from your favorites.',
    ALERT_BLOCK_USER: 'You have blocked {name}!',

    ALERT_REGISTER: 'Geschafft! Du bist jetzt Startklar und kannst beginnen, dich mit Leuten aus deiner Umgebung zu verbinden.',
    ALERT_REGISTER_FAILURE: 'Bei der Registrierung ist ein Fehler aufgetreten! Bitte versuche es später nocheinmal.',
    ALERT_REDEEM_BONUS_CODE: 'You have been credited with {coins} coins!',
    ALERT_REGISTER_FAILURE_DOUBLEIP: 'Error - Duplicate login detected! Use your existing account.',
    ALERT_REGISTER_FAILURE_INVALIDMAIL: 'This email address is not valid - Use an existing email address.',
    ALERT_SUPPORT_MESSAGE: 'Your message to support has been sent.',
    NO_EVENTS: 'There is no new news.',

    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
    CONTACT_NICKNAME: 'Nickname',
    CONTACT_EMAIL: 'E-Mail',
    CONTACT_SUBJECT: 'Subject',
    CONTACT_MESSAGE: 'Message',
    CONTACT_SUBMIT: 'Submit',

    CHAT_EXPIRE: 'expire in {days} days',
    CHAT_EXPIRED: 'Expired',
    CHAT_YOURTURN: 'It\'s your turn!',
    CHAT_DIALOG_EXPIRED: 'Your dialog with {name} has expired.',
    CHAT_DIALOG_RESTORE: 'You have {hours} hours left to restore the dialog.',      
};

export default en;

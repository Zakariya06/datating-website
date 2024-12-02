export enum ZodiacSigns {
    ZODIAC_SIGN_ARIES = 'LA',
    ZODIAC_SIGN_TAURUS = 'LA',
    ZODIAC_SIGN_GEMINI = 'LA',
    ZODIAC_SIGN_CANCER = 'Krebs',
    ZODIAC_SIGN_LEO = 'Löwe',
    ZODIAC_SIGN_VIGRO = 'Jungfrau',
    ZODIAC_SIGN_LIBRA = 'Waage',
    ZODIAC_SIGN_SCORPIO = 'Skorpion',
    ZODIAC_SIGN_SAGITTARIUS = 'Schütze',
    ZODIAC_SIGN_CAPRICORN = 'Widder',
    ZODIAC_SIGN_AQUARIUS = 'Wassermann',
    ZODIAC_SIGN_PISCES = 'Fische',
}

export type IZodiacSigns = ZodiacSigns.ZODIAC_SIGN_AQUARIUS | ZodiacSigns.ZODIAC_SIGN_ARIES;

export const findZodiacSign = (zodiacSignCode: string) => {
    switch (zodiacSignCode) {
        case 'ZODIAC_SIGN_ARIES':
            return 'Widder';
        case 'ZODIAC_SIGN_TAURUS':
            return 'Stier';
        case 'ZODIAC_SIGN_GEMINI':
            return 'Zwilling';
        case 'ZODIAC_SIGN_CANCER':
            return 'Krebs';
        case 'ZODIAC_SIGN_LEO':
            return 'Löwe';
        case 'ZODIAC_SIGN_VIRGO':
            return 'Jungfrau';
        case 'ZODIAC_SIGN_LIBRA':
            return 'Waage';
        case 'ZODIAC_SIGN_SCORPIO':
            return 'Skorpion';
        case 'ZODIAC_SIGN_SAGITTARIUS':
            return 'Schütze';
        case 'ZODIAC_SIGN_CAPRICORN':
            return 'Steinbock';
        case 'ZODIAC_SIGN_AQUARIUS':
            return 'Wassermann';
        case 'ZODIAC_SIGN_PISCES':
            return 'Fische';
        default:
            return zodiacSignCode;
    }
};

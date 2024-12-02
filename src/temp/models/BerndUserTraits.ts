export const LandMap = {
    de: 'Deutschland',
    at: 'Österreich',
    ch: 'Schweiz',
    us: 'Amerika',
    it: 'Italien',
};

export enum ZodiacSignTraits {
    'Widder' = 1,
    'Stier' = 2,
    'Zwillinge' = 3,
    'Krebs' = 4,
    'Löwe' = 5,
    'Jungfrau' = 6,
    'Waage' = 7,
    'Skorpion' = 8,
    'Schütze' = 9,
    'Steinbock' = 10,
    'Wassermann' = 11,
    'Fische' = 12,
}

// export const getZodiacSign = (int: number) => {
//     switch (int){
//     case 1:
//     return ;
// }
// }

export const SternzeichenMap = {
    1: 'TRAITS_STARSIGN_ARIES',
    2: 'TRAITS_STARSIGN_TAURUS',
    3: 'TRAITS_STARSIGN_GEMINI',
    4: 'TRAITS_STARSIGN_CANCER',
    5: 'TRAITS_STARSIGN_LEO',
    6: 'TRAITS_STARSIGN_VIGRO',
    7: 'TRAITS_STARSIGN_LIBRA',
    8: 'TRAITS_STARSIGN_SCORPIO',
    9: 'TRAITS_STARSIGN_SAGITTARIUS',
    10: 'TRAITS_STARSIGN_CAPRICORN',
    11: 'TRAITS_STARSIGN_AQUARIUS',
    12: 'TRAITS_STARSIGN_PISCES',
};

export enum GenderTraits {
    MALE = 1,
    FEMALE = 2,
    OTHER = 3,
}

export const GeschlechtMap = {
    1: 'TRAITS_GENDER_MAN',
    2: 'TRAITS_GENDER_WOMAN',
    3: 'Diverse',
};

export enum GenderSearchTraits {
    MALE = 1,
    FEMALE = 2,
    OTHER = 3,
    ASK_ME = 4,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Sucht_geschlechtMap = {
    1: 'Männlich',
    2: 'Weiblich',
    3: 'Diverse',
    4: 'Frag mich...',
};

export enum RelationTraits {
    TAKEN = 1,
    SINGLE = 2,
    COMPLICATED = 3,
    OPEN_RELATIONSHIP = 4,
    MARRIED = 5,
    DIVORCED = 6,
    WIDOWED = 7,
    ASK_ME = 8,
}

export const BeziehungMap = {
    1: 'TRAITS_RELATIONSHIP_GIVEN',
    2: 'TRAITS_RELATIONSHIP_SINGLE',
    3: 'TRAITS_RELATIONSHIP_COMPLICATED',
    4: 'TRAITS_RELATIONSHIP_OPEN',
    5: 'TRAITS_RELATIONSHIP_MARRIED',
    6: 'TRAITS_RELATIONSHIP_DIVORCED',
    7: 'TRAITS_RELATIONSHIP_WIDOW',
    8: 'TRAITS_ASKME',
};

export enum HairTraits {
    BLOND = 1,
    BROWN = 2,
    BLACK = 3,
    RED = 4,
    GREY = 5,
    ASK_ME = 6,
}

export const HaareMap = {
    1: 'TRAITS_HAIRCOLOR_BLONDE',
    2: 'TRAITS_HAIRCOLOR_BROWN',
    3: 'TRAITS_HAIRCOLOR_BLACK',
    4: 'TRAITS_HAIRCOLOR_RED',
    5: 'TRAITS_HAIRCOLOR_GREY',
    6: 'TRAITS_ASKME',
};

export enum AugenTraits {
    BLUE = 1,
    GREEN = 2,
    BROWN = 3,
    BLACK = 4,
    GREY = 5,
    ASK_ME = 6,
}

export const AugenMap = {
    1: 'TRAITS_EYECOLOR_BLUE',
    2: 'TRAITS_EYECOLOR_GREEN',
    3: 'TRAITS_EYECOLOR_BROWN',
    4: 'TRAITS_EYECOLOR_BLACK',
    5: 'TRAITS_EYECOLOR_GREY',
    6: 'TRAITS_ASKME',
};

export enum WohnenTraits {
    ALONE = 1,
    AT_PARENTS = 2,
    STUDENTS = 3,
    WG = 4,
    WITH_PARTNER = 5,
    ASK_ME = 6,
}

export const WohnenMap = {
    1: 'TRAITS_LIVING_ALONE',
    2: 'TRAITS_LIVING_PARENTS',
    3: 'TRAITS_LIVING_UNIVERSITY',
    4: 'TRAITS_LIVING_SHARED',
    5: 'TRAITS_LIVING_PARTNER',
    6: 'TRAITS_ASKME',
};

export enum KoerperschmuckTraits {
    TATTOOED = 1,
    PIERCED = 2,
    BRANDED = 3,
    TATTOED_AND_PIERCED = 4,
    NOTHING = 5,
    ASK_ME = 6,
}

export const KoerperschmuckMap = {
    1: 'TRAITS_BODYJEWELRY_TATTOO',
    2: 'TRAITS_BODYJEWELRY_PIERCED',
    3: 'TRAITS_BODYJEWELRY_BRANDING',
    4: 'TRAITS_BODYJEWELRY_TATTOO_AND_PIERCED',
    5: 'TRAITS_BODYJEWELRY_NOTHING',
    6: 'TRAITS_ASKME',
};

export enum SmokerTraits {
    YES = 1,
    NO = 2,
    SOMETIMES = 3,
    DAMPFER = 4,
    ASK_ME = 5,
}

export const SmokerTraitMap = {
    1: 'TRAITS_SMOKER_YES',
    2: 'TRAITS_SMOKER_NO',
    3: 'TRAITS_SMOKER_OCCASIONALLY',
    4: 'TRAITS_SMOKER_VAPE',
    5: 'TRAITS_ASKME',
};

export type possibleTraitMaps = Record<number, string>;

// typeof SmokerTraitMap | typeof KoerperschmuckMap || WohnenMap || AugenMap || HaareMap || BeziehungMap;

export enum Countries {
    GERMANY = 'de',
    AUSTRIA = 'ch',
    SWITZERLAND = 'at',
    USA = 'us',
}

export interface ICountries {
    country: string;
    countryIdentifier: Countries.GERMANY | Countries.AUSTRIA | Countries.SWITZERLAND | Countries.USA;
}

export const CountriesMap = [
    {
        country: 'Deutschland',
        countryIdentifier: Countries.GERMANY,
    },
    {
        country: 'Österreich',
        countryIdentifier: Countries.AUSTRIA,
    },
    {
        country: 'Schweiz',
        countryIdentifier: Countries.SWITZERLAND,
    },
    {
        country: 'USA',
        countryIdentifier: Countries.USA,
    },
];

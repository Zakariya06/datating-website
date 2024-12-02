import { ILink } from '../models/core/links/ILink';
import Config from './config';

export interface IGetLocationsUrlParams {
    link?: ILink;
    page: number;
    count?: number;
    countryCode?: 'de' | 'at' | 'ch';
    cityName?: string;
    postalCode?: string;
}

export function getLocationsUrl(params: IGetLocationsUrlParams) {
    const { page, count = 100, countryCode = 'de', cityName, postalCode, link } = params;

    const url = link ? new URL(decodeURIComponent(link.href), Config.BASE_URL) : new URL('/v1/locations', Config.BASE_URL);

    if (!link) {
        url.searchParams.append('page[number]', String(page));
        url.searchParams.append('page[size]', String(count));
    }

    url.searchParams.append('filter[countryCode]', String(countryCode).toUpperCase());

    if (cityName) {
        url.searchParams.append('filter[cityName]', String(cityName));
    }

    if (postalCode) {
        url.searchParams.append('filter[postalCode]', String(postalCode));
    }

    return url.href;
}

export default getLocationsUrl;

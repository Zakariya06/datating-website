import { ILink } from '../models/core/links/ILink';
import Config from './config';

export interface IGetUsersUrlParams {
    link?: ILink;
    page: number;
    count?: number;
    preferredMinAge?: string;
    preferredMaxAge?: string;
    preferredGender?: string;
    geolocationLat?: string;
    geolocationLon?: string;
    nameContains?: string;
}

export function getUsersUrl(params: IGetUsersUrlParams) {
    const { link, nameContains, preferredGender, preferredMaxAge, preferredMinAge, page, count, geolocationLat, geolocationLon } = params;

    const url = link
        ? new URL(decodeURIComponent(link.href), Config.BASE_URL)
        : // : new URL('/v1/dating/users', Config.BASE_URL);
          new URL('/v1/dating/person-users', Config.BASE_URL);

    if (!link) {
        url.searchParams.append('page[number]', String(page));
        url.searchParams.append('page[size]', String(count));
    }
    // url.searchParams.append('page[offset]', String(Math.max(page - 1, 0) * count));
    // info: required? => should be fine, in terms of performance!
    if (preferredMaxAge) {
        url.searchParams.append('preferredMaxAge', String(preferredMaxAge));
    }
    if (preferredMinAge) {
        url.searchParams.append('preferredMinAge', String(preferredMinAge));
    }
    if (preferredGender) {
        url.searchParams.append('preferredGender', String(preferredGender));
    }
    // retrieve the geolocation
    if (geolocationLat) {
        url.searchParams.append('filter[geolocationLat]', String(geolocationLat));
    }
    if (geolocationLon) {
        url.searchParams.append('filter[geolocationLon]', String(geolocationLon));
    }

    // User Search
    if (nameContains) {
        url.searchParams.append('filter[nameContains]', String(nameContains));
    }

    return url.href;
}

export function getOldUsersUrl(params: IGetUsersUrlParams) {
    const {
        page,
        count = Config.SKIPPED_FETCH_USERS_COUNT,
        link,
        nameContains,
        preferredMinAge,
        preferredMaxAge,
        preferredGender,
        geolocationLon,
        geolocationLat,
    } = params;

    const url = link ? new URL(decodeURIComponent(link.href), Config.BASE_URL) : new URL('/v1/dating/users', Config.BASE_URL);
    if (!link) {
        url.searchParams.append('page[number]', String(page));
        url.searchParams.append('page[size]', String(count));
    }

    // url.searchParams.append('page[offset]', String(Math.max(page - 1, 0) * count));
    // info: required? => should be fine, in terms of performance!
    if (preferredMaxAge) {
        url.searchParams.append('preferredMaxAge', String(preferredMaxAge));
    }
    if (preferredMinAge) {
        url.searchParams.append('preferredMinAge', String(preferredMinAge));
    }
    if (preferredGender) {
        url.searchParams.append('preferredGender', String(preferredGender));
    }
    // retrieve the geolocation
    if (geolocationLat) {
        url.searchParams.append('filter[geolocationLat]', String(geolocationLat));
    }
    if (geolocationLon) {
        url.searchParams.append('filter[geolocationLon]', String(geolocationLon));
    }

    // User Search
    if (nameContains) {
        url.searchParams.append('filter[nameContains]', String(nameContains));
    }

    return url.href;
}

export default getUsersUrl;

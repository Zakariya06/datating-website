import { ILink } from '../models/core/links/ILink';
import { RelationType } from '../models/user/IRelation';
import Config from './config';

interface IGetRelationshipsUrlParams {
    link?: ILink;
    page: number;
    count?: number;
    relationshipType: RelationType;
    userType?: 'normal' | 'automated' | 'all';

    /**
     * true = likes from other users
     * false = likes the logged in user started
     *
     * @type {boolean}
     * @memberof IGetRelationshipsUrlParams
     * @default true
     */
    isRelatedUser?: boolean;
}

export function getRelationshipsUrl(params: IGetRelationshipsUrlParams) {
    const { page, count = Config.GRID_FETCH_USERS_COUNT, relationshipType, userType = 'all', isRelatedUser = true, link } = params;

    // Logger.log(link, decodeURIComponent(link?.href || ''));

    const url = link
        ? new URL(decodeURIComponent(link.href), Config.BASE_URL)
        : new URL('/v1/account/users/self/user-relationships', Config.BASE_URL);

    if (!link) {
        url.searchParams.append('page[number]', String(page));
        url.searchParams.append('page[size]', String(count));
    }

    url.searchParams.append('filter[relationshipType]', String(relationshipType));
    url.searchParams.append('filter[userType]', String(userType));
    url.searchParams.append('filter[isRelatedUser]', String(isRelatedUser));

    return url.href;
}

export default getRelationshipsUrl;

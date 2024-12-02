import { IPaginatedLinks } from '../core/links/IPaginatedLinks';

export interface IPaginatedCollection<T> {
    page: number;
    limit: number;
    pages: number;
    total: number;
    new?: number;
    _links: IPaginatedLinks;
    _embedded: {
        items: T[];
    };
}

export const emptyPaginatedCollection: <T>() => IPaginatedCollection<T> = () => ({
    page: 0,
    limit: 10,
    pages: 1,
    total: 0,
    _links: {
        self: { href: '' },
        first: { href: '' },
        last: { href: '' },
        next: { href: '' },
    },
    _embedded: { items: [] },
});

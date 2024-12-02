import Config from '../../config';
import isNullOrUndefined from '../typeguards/isNullOrUndefined';
import isString from '../typeguards/isString';

const hasProtocolRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

const isRelative = (href: string) => !hasProtocolRegex.test(href);

export function generateValidUrl(href: string | undefined) {
    if (isNullOrUndefined(href)) {
        return Config.BASE_URL;
    }

    if (!isRelative(href)) {
        return href;
    }

    // TODO: remove!
    if (/\.png|\.jpg|\.jpeg$/g.test(href)) {
        return `${Config.BASE_URL_IMAGE}?foto=${href}`;
    }

    // TODO: remove!
    if (!isString(href)) {
        return '';
    }

    // TODO: remove!
    if (isRelative(href) && !href.startsWith('/')) {
        return Config.BASE_URL;
    }

    // const fixedHref = isRelative(href) ? (href.startsWith('/') ? href : `/${href}`) : href;
    const fixedHref = href;

    const fetchUrl = new URL(encodeURI(new URL(fixedHref, Config.BASE_URL).href));

    const urlToFetch = fetchUrl.href.replace(/\/$/, '');

    return urlToFetch;
}

export default generateValidUrl;

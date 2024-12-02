import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';

import { Languages } from './../services/i18n/models/ILanguageDictionary';
import { ResourceService } from './../services/i18n/ResourcesService';
import isString from './typeguards/isString';

export default function formatRelativeTimeToNow(date: Date | string) {
    const normalizedDate = isString(date) ? new Date(date) : date;

    const lang = ResourceService.getCurrentLanguage();

    const locale = lang === Languages.DE ? deLocale : enLocale;

    return formatDistanceToNowStrict(normalizedDate, { locale: locale, addSuffix: true });
}

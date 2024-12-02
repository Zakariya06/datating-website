import { format } from 'date-fns';
import deLocale from 'date-fns/locale/de';

import isString from './typeguards/isString';

export enum DateFormats {
    DATE,
    DATE_TIME,
    TIME,
}

export function formatDate(date: Date | string, dateFormat?: DateFormats) {
    const dateInstance = isString(date) ? new Date(date) : date;
    let formatToUse = '';

    switch (dateFormat) {
        case DateFormats.DATE_TIME: {
            formatToUse = 'Pp';
            break;
        }
        case DateFormats.TIME: {
            formatToUse = 'p';
            break;
        }
        case DateFormats.DATE:
        default: {
            formatToUse = 'P';
            break;
        }
    }

    return format(dateInstance, formatToUse, { locale: deLocale });
}

export default formatDate;

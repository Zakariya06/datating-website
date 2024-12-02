import { isFriday, isMonday, isSaturday, isSunday, isThisWeek, isThursday, isToday, isTuesday, isWednesday, isYesterday } from 'date-fns';

import { ResourceService } from './../../../../../services/i18n/ResourcesService';
import formatDate, { DateFormats } from '../../../../../core/formatDate';

export const getDateString = (date: string) => {
    const currentDate = new Date(date);
    const { CHAT_INTERFACE_YESTERDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } = ResourceService.getCurrentResources();

    if (isToday(currentDate)) {
        return formatDate(date, DateFormats.TIME);
    } else if (isYesterday(currentDate)) {
        return CHAT_INTERFACE_YESTERDAY;
    } else if (isThisWeek(currentDate, { weekStartsOn: 1 }) && !isToday(currentDate)) {
        if (isMonday(currentDate)) {
            return MONDAY;
        } else if (isTuesday(currentDate)) {
            return TUESDAY;
        } else if (isWednesday(currentDate)) {
            return WEDNESDAY;
        } else if (isThursday(currentDate)) {
            return THURSDAY;
        } else if (isFriday(currentDate)) {
            return FRIDAY;
        } else if (isSaturday(currentDate)) {
            return SATURDAY;
        } else if (isSunday(currentDate)) {
            return SUNDAY;
        }
    } else {
        return formatDate(date, DateFormats.DATE);
    }
};

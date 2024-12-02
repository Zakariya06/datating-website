import { Typography } from '@material-ui/core';
import React from 'react';

import useTranslation from '../../services/i18n/core/useTranslation';
import CountDown from './CountDown';
import { TurboRocketListItem } from './TurboRocketListItem';

export interface ITurboRocketActiveProps {
    endDate: Date;
}

export const TurboRocketActive = (props: ITurboRocketActiveProps) => {
    const { endDate } = props;
    const {
        TURBOROCKET_ALREADY_ACTIVE,
        TURBOROCKET_RESTOFTIME,
        TURBOROCKET_POINT1,
        TURBOROCKET_POINT2,
        TURBOROCKET_POINT3,
        TURBOROCKET_POINT4,
    } = useTranslation();

    return (
        <div className="flex column align-items-center">
            <CountDown endDate={endDate} />

            <Typography variant="h6" style={{ fontWeight: 700 }} className="spacing double margin top bottom">
                {TURBOROCKET_ALREADY_ACTIVE}
            </Typography>

            <Typography>{TURBOROCKET_RESTOFTIME}</Typography>

            <div className="spacing double margin top bottom ">
                <TurboRocketListItem>{TURBOROCKET_POINT1}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT2}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT3}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT4}</TurboRocketListItem>
            </div>
        </div>
    );
};

export default TurboRocketActive;

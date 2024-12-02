import { Typography } from '@material-ui/core';
import React from 'react';

import Config from '../../config';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import { TurboRocketListItem } from './TurboRocketListItem';

export interface ITurboRocketNotActiveProps {}

export const TurboRocketNotActive = (props: ITurboRocketNotActiveProps) => {
    const {
        TURBOROCKET_TITLE,
        TURBOROCKET_SUBTITLE,
        TURBOROCKET_COINS,
        TURBOROCKET_POINT1,
        TURBOROCKET_POINT2,
        TURBOROCKET_POINT3,
        TURBOROCKET_POINT4,
    } = useTranslation();

    return (
        <div className="flex column align-items-center">
            <Typography variant="h6" style={{ fontWeight: 900 }} className="spacing double margin top bottom">
                {TURBOROCKET_TITLE}
            </Typography>

            <Typography style={{ fontWeight: 500 }}>{TURBOROCKET_SUBTITLE}</Typography>

            <div className="spacing double margin top bottom ">
                {/*<Typography className="spacing double margin bottom">
                    {ResourceService.replace(TURBOROCKET_COINS, { amount: Config.TURBO_ROCKET_AMOUNT.toString() })}
                    </Typography>*/}
                    <br></br>
                <TurboRocketListItem>{TURBOROCKET_POINT1}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT2}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT3}</TurboRocketListItem>
                <TurboRocketListItem>{TURBOROCKET_POINT4}</TurboRocketListItem>
            </div>
        </div>
    );
};

export default TurboRocketNotActive;

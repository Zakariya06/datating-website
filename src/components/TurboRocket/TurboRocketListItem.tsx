import { faRocket } from '@fortawesome/pro-light-svg-icons';
import { Typography } from '@material-ui/core';
import React from 'react';

import Icon from '../Icon';

export const TurboRocketListItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex row align-items-center text-align-left" style={{ paddingBottom: 4 }}>
            <Icon icon={faRocket} color="primary" className="spacing margin right" fontSize="small" />

            <Typography>{children}</Typography>
        </div>
    );
};

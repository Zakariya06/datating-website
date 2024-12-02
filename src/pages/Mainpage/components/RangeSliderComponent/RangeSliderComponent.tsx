import { Slider, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import Config from '../../../../config';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IRangeSliderComponentProps {
    value: number;
    onChange(value: number): void;
}

export const RangeSliderComponent = memo((props: IRangeSliderComponentProps) => {
    const { onChange, value } = props;
    const { SEARCH_SETTINGS_DISTANCE } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any, newValue: number) => {
        onChange(newValue);
    };

    return (
        <div className="flex column fullWidth">
            <div className="flex fullWidth justify-content-space-between align-items-center">
                <Typography>{SEARCH_SETTINGS_DISTANCE}</Typography>

                <Typography style={{ textAlign: 'end', fontWeight: '900' }} className="fullWidth align-self-end">
                    {value} km
                </Typography>
            </div>

            <Slider min={Config.MIN_DISTANCE} max={Config.MAX_DISTANCE} value={value} onChange={handleChange} />
        </div>
    );
});

export default RangeSliderComponent;

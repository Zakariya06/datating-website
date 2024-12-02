import './SliderComponent.scss';

import { Slider, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import Config from '../../../../config';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IAgeSliderComponentProps {
    className?: string;
    minAge: number;
    maxAge: number;
    onMinAgeChange(value: number): void;
    onMaxAgeChange(value: number): void;
}

export const AgeSliderComponent = memo((props: IAgeSliderComponentProps) => {
    const { minAge, maxAge, onMaxAgeChange, onMinAgeChange, className = '' } = props;
    const { SEARCH_SETTINGS_AGE, SEARCH_SETTINGS_BETWEEN } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any, [newMinAge, newMaxAge]: [number, number]) => {
        onMinAgeChange(newMinAge);
        onMaxAgeChange(newMaxAge);
    };

    return (
        <div className={`flex column fullWidth ${className}`}>
            <div className="flex fullWidth justify-content-space-between align-items-center">
                <Typography>{SEARCH_SETTINGS_AGE}</Typography>

                <Typography style={{ textAlign: 'end', fontWeight: '900' }} className="fullWidth align-self-end">
                    {SEARCH_SETTINGS_BETWEEN} {minAge} - {maxAge}
                </Typography>
            </div>

            <Slider min={Config.MIN_AGE} max={Config.MAX_AGE} value={[minAge, maxAge]} onChange={handleChange} />
        </div>
    );
});

export default AgeSliderComponent;

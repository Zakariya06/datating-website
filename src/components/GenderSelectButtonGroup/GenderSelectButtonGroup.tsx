import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { memo, useCallback } from 'react';

import useTranslation from '../../services/i18n/core/useTranslation';
import { GenderSearchTraits } from '../../temp/models/BerndUserTraits';

export interface IGenderSelectButtonGroupProps {
    gender: number;
    options?: Array<{
        key: number;
        text: string;
    }>;
    onGenderChange(value: number): void;
}

export const GenderSelectButtonGroup = memo((props: IGenderSelectButtonGroupProps) => {
    const { SEARCH_SETTINGS_MALE, SEARCH_SETTINGS_FEMALE } = useTranslation();
    const defaultOptions = [
        { key: GenderSearchTraits.MALE, text: SEARCH_SETTINGS_MALE },
        { key: GenderSearchTraits.FEMALE, text: SEARCH_SETTINGS_FEMALE },
    ];

    const { gender, onGenderChange, options = defaultOptions } = props;

    const handleSearchGenderChange = useCallback(
        (e: React.MouseEvent<HTMLElement>, value: number) => {
            if (value !== null) {
                onGenderChange(value);
            }
        },
        [onGenderChange]
    );

    return (
        <ToggleButtonGroup exclusive value={gender} onChange={handleSearchGenderChange} className="flex justify-content-space-between">
            {options.map(({ key, text }, index) => (
                <ToggleButton
                    style={{ width: '100%',borderRadius:'30px' }}
                    key={key}
                    value={key}
                    className={index === options.length ? undefined : 'spacing margin right'}
                >
                    {text}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
});

export default GenderSelectButtonGroup;

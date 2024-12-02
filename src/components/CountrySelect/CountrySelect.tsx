import { FormLabel, ListItemIcon, MenuItem, Select } from '@material-ui/core';
import React, { useCallback } from 'react';

export interface ICountrySelectProps {
    selectedCountry: string;
    onCountryChange(newCountry: string): void;
}

export const CountrySelect = (props: ICountrySelectProps) => {
    const { onCountryChange, selectedCountry } = props;

    const setCountry = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            onCountryChange(event.target.value as string);
        },
        [onCountryChange]
    );

    return (
        <>
            <FormLabel component="legend" style={{ textAlign: 'left' }} className="spacing double margin bottom top">
                Dein Land
            </FormLabel>
            <Select
              style={{
                borderRadius:'30px'
              }}
                value={selectedCountry}
                onChange={setCountry}
            >
                {getCountries}
            </Select>
        </>
    );
};

const getCountries = [
    <MenuItem key={'DE'} value={'de'}>
        <ListItemIcon>🇩🇪</ListItemIcon>
        Deutschland
    </MenuItem>,
    <MenuItem key={'AT'} value={'at'}>
        <ListItemIcon>🇦🇹</ListItemIcon>
        Österreich
    </MenuItem>,
    <MenuItem key={'CH'} value={'ch'}>
        <ListItemIcon>🇨🇭</ListItemIcon>
        Schweiz
    </MenuItem>,
    // <MenuItem key={'US'} value={'us'}>
    //     <ListItemIcon>🇺🇸</ListItemIcon>
    //     USA
    // </MenuItem>,
];

export default CountrySelect;


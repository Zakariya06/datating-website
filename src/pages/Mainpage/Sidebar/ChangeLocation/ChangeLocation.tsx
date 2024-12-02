import { Button } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserActionCreator from '../../../../actions/UserActionCreator';
import { useConsumeCoinsHandler } from '../../../../components/InsufficientCoinsDialog/useConsumeCoinsHandler';
import LocationAutocomplete from '../../../../components/LocationAutocomplete';
import Config from '../../../../config';
import useHistoryPush from '../../../../core/useHistoryPush';
import { MAIN_PATH } from '../../../../models/Paths';
import { getUser } from '../../../../selectors/AuthenticationSelectors';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IChangeLocationProps {}

export const ChangeLocation = memo((props: IChangeLocationProps) => {
    const user = useSelector(getUser);
    const [selectedZip, setSelectedZip] = useState<string | undefined>(user?.Zip ? String(user.Zip) : undefined);
    const [selectedCity, setSelectedCity] = useState<string | undefined>(user?.City);
    const selectedCountry = user?.Country;
    const dispatch = useDispatch();
    const navigateToExplorer = useHistoryPush(MAIN_PATH);
    const isChanged = selectedCity !== user?.Zip && selectedCity !== user?.City;
    const { CHANGE_LOCATION_TITLE } = useTranslation();

    const handleUpdateLocation = useCallback(async () => {
        // TODO;
        if (selectedCity && selectedZip && selectedCountry) {
            await dispatch(
                UserActionCreator.updateLocation({
                    country: selectedCountry,
                    city: selectedCity,
                    postalCode: selectedZip,
                })
            );
            navigateToExplorer();
        }
    }, [dispatch, navigateToExplorer, selectedCity, selectedCountry, selectedZip]);

    const handler = useConsumeCoinsHandler(handleUpdateLocation, Config.CHANGE_LOCATION_AMOUNT);

    const handleLocationMatched = useCallback((city: string, zip: string) => {
        setSelectedZip(zip);
        setSelectedCity(city);
    }, []);

    return (
        <>
            <LocationAutocomplete
                countryCode={selectedCountry}
                value={selectedCity}
                preselectedZip={selectedZip}
                hideZip
                onLocationMatched={handleLocationMatched}
                placeholder=""
                showAdornment
            />
            {isChanged && (
                <Button size="small" fullWidth className="spacing triple margin top" onClick={handler}>
                    {CHANGE_LOCATION_TITLE} ({Config.CHANGE_LOCATION_AMOUNT}C)
                </Button>
            )}
        </>
    );
});

export default ChangeLocation;

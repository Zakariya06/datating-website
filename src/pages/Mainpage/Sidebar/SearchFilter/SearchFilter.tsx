import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserActionCreator from '../../../../actions/UserActionCreator';
import GenderSelectButtonGroup from '../../../../components/GenderSelectButtonGroup';
import Config from '../../../../config';
import { isEqual } from '../../../../core/typeguards/isEqual';
import useHistoryPush from '../../../../core/useHistoryPush';
import { MAIN_PATH } from '../../../../models/Paths';
import { getUser } from '../../../../selectors/AuthenticationSelectors';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import { GenderSearchTraits } from '../../../../temp/models/BerndUserTraits';
import AgeSliderComponent from '../../components/AgeSliderComponent';
import RangeSliderComponent from '../../components/RangeSliderComponent';
import ChangeLocation from '../ChangeLocation';

export interface ISearchFilterProps {}

export const SearchFilter = memo((props: ISearchFilterProps) => {
    const user = useSelector(getUser);

    const [searchGender, setSearchGender] = useState<number>(user?.SearchGender || GenderSearchTraits.FEMALE);
    const [minAge, setminAge] = useState<number>(user?.MinAge || Config.MIN_AGE);
    const [maxAge, setmaxAge] = useState<number>(user?.MaxAge || Config.MAX_AGE);
    const [loading, setLoading] = useState<boolean>(false);
    const [distance, setDistance] = useState<number>(user?.Distance || 100);
    const dispatch = useDispatch();
    const navigateToExplorer = useHistoryPush(MAIN_PATH);
    const { MENU_SEARCHSETTINGS, SEARCH_SETTINGS_INTERESTED_IN, SEARCH_SETTINGS_BUTTON } = useTranslation();

    const handleUpdate = async () => {

        setLoading(true);
        await dispatch(
            UserActionCreator.updateSearchSettings({
                preferredGender: searchGender === GenderSearchTraits.MALE ? GenderSearchTraits.MALE : GenderSearchTraits.FEMALE,
                preferredMinAge: minAge,
                preferredMaxAge: maxAge,
                preferredMaxDistance: distance,
            })
        );

        setLoading(false);

    };

    const canUpdate = !isEqual(
        { searchGender: user?.SearchGender, minAge: user?.MinAge, maxAge: user?.MaxAge, distance: user?.Distance },
        { searchGender, minAge, maxAge, distance }
    );

    return (
        <div className="flex column spacing triple margin bottom top">
            <Typography className="spacing margin double bottom text-align-center" variant="overline">
                {MENU_SEARCHSETTINGS}
            </Typography>

            <div className="flex column no-grow">
                <div className="flex column spacing double margin bottom">
                    <Typography className="spacing margin bottom">{SEARCH_SETTINGS_INTERESTED_IN}</Typography>

                    <GenderSelectButtonGroup gender={searchGender} onGenderChange={setSearchGender} />
                </div>

                <AgeSliderComponent
                    minAge={minAge}
                    maxAge={maxAge}
                    onMinAgeChange={setminAge}
                    onMaxAgeChange={setmaxAge}
                    className="spacing double margin bottom"
                />

                <RangeSliderComponent value={distance} onChange={setDistance} />

                <ChangeLocation />
            </div>

            {canUpdate && (
                <Button
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress color="primary" style={{ width: 24, height: 24 }} /> : undefined}
                    size="small"
                    onClick={handleUpdate}
                    className="spacing double margin top"
                >
                    {SEARCH_SETTINGS_BUTTON}
                </Button>
            )}
        </div>
    );
});

export default SearchFilter;

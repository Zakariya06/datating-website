import { faMapMarker } from '@fortawesome/pro-light-svg-icons';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import { IPaginatedCollection, emptyPaginatedCollection } from '../../models/collections/IPaginatedCollection';
import { IError, isError } from '../../models/core/error/IError';
import { ILocation } from '../../models/location/ILocation';
import BerndMapper from '../../temp/BerndMapper';
import Icon from '../Icon';

export interface ILocationAutocompleteProps {
    placeholder: string;
    placeholderTextColor?: string;
    countryCode?: string;
    style?: React.CSSProperties;
    value?: string;
    preselectedZip?: string;
    listStyle?: React.CSSProperties;
    hideZip?: boolean;
    inputStyle?: React.CSSProperties;
    adornmentStyle?: React.CSSProperties;
    showAdornment?: boolean;
    onChange?(text: string, zip: string): void;
    onLocationMatched(city: string, postalCode: string): void;
}

export const LocationAutocomplete = (props: ILocationAutocompleteProps) => {
    const { placeholder, value, onLocationMatched, preselectedZip, hideZip, inputStyle, adornmentStyle, showAdornment, countryCode = 'DE' } = props;
    const [locations, setLocations] = useState<IPaginatedCollection<ILocation>>(emptyPaginatedCollection());
    const [isLoading, setLoading] = useState(false);
    const debounceTimer = useRef<number | undefined>();

    useEffect(() => {
        if (value && preselectedZip) {
            const loc: ILocation = { City: value, Zip: preselectedZip, countryCode: countryCode, id: 0 };
            setLocations(BerndMapper.mapToPaginatedCollection([loc]));

            // const response: IError | ILocation[] = await (
            //     await DirectInteractionActionCreator.getMatchingLocation(preselectedZip, value, 'de')
            // ).json();

            // if (response && !isError(response)) {
            //     setLocations(BerndMapper.mapToPaginatedCollection(response));
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLocations(emptyPaginatedCollection());
    }, [countryCode]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const text = e.currentTarget.value;
            if (text === '') {
                // setLocations(emptyPaginatedCollection());
            }

            // if (/([0-9])+/g.test(text)) {
            //     return;
            // }

            if (text !== '') {
                setLoading(true);
            }

            if (text) {
                if (debounceTimer.current) {
                    window.clearTimeout(debounceTimer.current);
                }

                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                debounceTimer.current = window.setTimeout(async () => {
                    // const params: IGetLocationsUrlParams = { page: 1, count: 4 };
                    setLoading(true);

                    let city: string | undefined = undefined;
                    let postalCode: string | undefined = undefined;

                    if (/([0-9])+/g.test(text)) {
                        postalCode = text;
                    } else {
                        city = text;
                    }

                    const response: IError | ILocation[] = await (
                        await DirectInteractionActionCreator.getMatchingLocation(postalCode, city, countryCode)
                    ).json();

                    if (response && !isError(response)) {
                        setLocations(BerndMapper.mapToPaginatedCollection(response));
                    }

                    debounceTimer.current = undefined;
                    setLoading(false);
                }, 1000);
            }
        },
        [countryCode]
    );

    const handleSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, location: ILocation) => {
            if (location) {
                onLocationMatched(location.City, location.Zip);
            }
        },
        [onLocationMatched]
    );

    return (
        <AutoComplete
            key={countryCode}
            options={locations._embedded.items}
            placeholder={placeholder}
            getOptionLabel={(item) => (hideZip ? item.City : `${item.Zip}, ${item.City}`)}
            getOptionSelected={(item) => item.City === value}
            onChange={handleSelect}
            filterOptions={(x) => x}
            defaultValue={value && preselectedZip ? { City: value, Zip: preselectedZip, countryCode: countryCode, id: 1 } : undefined}
            loading={isLoading}
            disableClearable
            forcePopupIcon={false}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={placeholder}
                    onChange={handleChange}
                    InputProps={{
                        ...params.InputProps,
                        style: inputStyle,
                        startAdornment: showAdornment ? (
                            <InputAdornment position="start" style={adornmentStyle}>
                                <Icon icon={faMapMarker} />
                            </InputAdornment>
                        ) : undefined,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                     
                    }}
                />
            )}
        />
    );
};

export default LocationAutocomplete;

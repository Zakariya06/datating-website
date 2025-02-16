import { Button, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import { getRegistrationMessage } from '../../config/errorMessages';
import isValidEmail from '../../core/typeguards/isValidEmail';
import useHistoryPush from '../../core/useHistoryPush';
import useUniqueId from '../../core/useUniqueId';
import { IRegistrationCredentials } from '../../models/authentication/registration/IRegistrationCredentials';
import { isError } from '../../models/core/error/IError';
import { AGB_PATH, DATA_PROTECTION_POLICY_PATH, MAIN_PATH } from '../../models/Paths';
import { Genders } from '../../models/user/Gender';
import { USER_DEFAULT_DATE } from '../../models/user/IUser';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import { GenderSearchTraits, GenderTraits } from '../../temp/models/BerndUserTraits';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import Checkbox from '../Checkbox';
import CountrySelect from '../CountrySelect/CountrySelect';
import DateSelect from '../DateSelect/DateSelect';
import GenderSelectButtonGroup from '../GenderSelectButtonGroup';
import LocationAutocomplete from '../LocationAutocomplete';
import Config from '../../config/config';
import { useHistory } from 'react-router-dom';

export interface IRegisterComponentProps {}

const defaultOptions = [
    { key: GenderTraits.MALE, text: 'Männlich' },
    { key: GenderTraits.FEMALE, text: 'Weiblich' },
];

const genderSearchOptions = [
    { key: GenderSearchTraits.MALE, text: 'Männer' },
    { key: GenderSearchTraits.FEMALE, text: 'Frauen' },
];

export const RegisterComponent = memo((props: any) => {
    const { setActiveStepS, activeStepS } = props || {};

    const [selectedDate, handleDateChange] = useState<Date>(USER_DEFAULT_DATE);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repeatPW, setRepeatPW] = useState<string>();
    const [gender, setGender] = useState(GenderTraits.MALE);
    const [selectedZip, setSelectedZip] = useState<string | undefined>(undefined);
    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedCountry, setSelectedCountry] = useState<string>('de');
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchGender, setSearchGender] = useState(GenderSearchTraits.FEMALE);
    const [optIn, setOptIn] = useState<boolean>(false);

    const dispatch = useDispatch();
    const id = useUniqueId();

    const handleNext = useCallback(() => {
        setActiveStep(activeStepS);
        setActiveStepS(() => activeStepS + 1);
    }, []);
    const handleBack = useCallback(() => setActiveStep(0), []);

    const handleClose = useHistoryPush(MAIN_PATH);
    const history = useHistory();
    const profileId = history.location.pathname.includes('profile') ? history.location.pathname.replace('profile', 'stranger-profile') : '/';

    const handleRegister = async () => {
        if (
            name &&
            email &&
            isValidEmail(email) &&
            gender &&
            selectedCity &&
            selectedZip &&
            selectedDate &&
            password &&
            repeatPW &&
            repeatPW === password
        ) {
            const register: IRegistrationCredentials = {
                name: name,
                email: email,
                password: password,
                dateOfBirth: selectedDate.toISOString(),
                gender: gender === GenderTraits.MALE ? Genders.MALE : Genders.FEMALE,
                country: selectedCountry,
                city: selectedCity,
                postalCode: selectedZip,
                deviceId: id,
                pushPreference: true,
                profileImageEncoded: '',
                firebaseId: '',
                platform: 'ios',
                preferredGender: searchGender,
            };

            setLoading(true);
            const result = await dispatch(AuthenticationActionCreator.registerUser(register));
            // console.log('result',result);
            // history.push(`/stranger-profile/`)
            setLoading(false);

            try {
                if (isError(result.payload.result)) {
                    dispatch(
                        NotificationActionCreator.enqueueSnackbar({
                            key: String(new Date().getTime() + Math.random()),
                            message:
                                'Registrierung Fehlgeschlagen!' +
                                getRegistrationMessage(
                                    result.payload.result._embedded.errors.length > 0
                                        ? result.payload.result._embedded.errors[0].message
                                        : result.payload.result.message
                                ),
                            options: { variant: 'error' },
                        })
                    );
                } else {
                    /* dispatch(
                        NotificationActionCreator.enqueueSnackbar({
                            key: String(new Date().getTime() + Math.random()),
                            message: 'Geschafft! Du bist jetzt Startklar und kannst beginnen, dich mit Leuten aus deiner Umgebung zu verbinden.',
                            options: { variant: 'success' },
                        })
                    ); */
                }
            } catch (e) {
                // Pizdec
            }

            handleClose();
        } else {
            const errorArray: string[] = [];
            if (!name || name.trim() === '') {
                errorArray.push('Bitte gebe deinen Namen an.');
            }

            if (!selectedZip) {
                errorArray.push('Bitte gebe deinen Wohnort an.');
            }

            if (!email || email.trim() === '') {
                errorArray.push('Bitte gebe deine E-Mail Adresse an.');
            } else {
                if (!isValidEmail(email.trim())) {
                    errorArray.push('Bitte gebe eine gültige E-Mail Adresse an.');
                }
            }
            if (!optIn) {
                errorArray.push('Bitte bestätige die AGB');
            }

            if (!password || password.trim() === '') {
                errorArray.push('Bitte gebe ein Passwort ein.');
            } else {
                if (!repeatPW || repeatPW.trim() === '') {
                    errorArray.push('Bitte wiederhole dein Passwort.');
                } else {
                    if (password.trim() !== repeatPW.trim()) {
                        errorArray.push('Dein wiederholtes Passwort stimmt nicht mit deinem Passwort überein.');
                    }
                }
            }
            if (errorArray.length < 1) {
                errorArray.push('Ein unbekannter Fehler ist aufgetreten.');
            }

            for (const error of errorArray) {
                dispatch(
                    NotificationActionCreator.enqueueSnackbar({
                        key: String(new Date().getTime() + Math.random()),
                        message: error,
                        options: { variant: 'error' },
                    })
                );
            }
        }
        history.push(profileId);
    };

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/[^A-Za-z0-9]+/g.test(e.currentTarget.value)) {
            setName(e.currentTarget.value);
        }
    }, []);

    return (
        <div title="Jetzt registrieren" className="flex column spacing triple padding bottom">
            <Typography style={{ padding: ' 0 1em', fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>Jetzt registrieren</Typography>
            {activeStep === 0 && (
                <>
                    <FormControl component="fieldset" fullWidth className="spacing double margin top flex align-items-start">
                        <FormLabel component="legend" style={{ textAlign: 'left' }}>
                            Geschlecht
                        </FormLabel>

                        <div style={{ width: '100%' }} className="flex spacing padding top bottom">
                            <GenderSelectButtonGroup gender={gender} onGenderChange={setGender} options={defaultOptions} />
                        </div>
                    </FormControl>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend" style={{ textAlign: 'left' }} className="spacing margin bottom">
                            Dein Name
                        </FormLabel>

                        <TextField
                            InputProps={{
                                style: {
                                    borderRadius: '30px',
                                },
                            }}
                            fullWidth
                            // label="Dein Name"
                            autoComplete="name"
                            // margin="dense"

                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormControl>
                    <FormControl component="fieldset" fullWidth className="spacing double margin top">
                        <FormLabel component="legend" style={{ textAlign: 'left' }} className="spacing double margin bottom">
                            Dein Geburtsdatum
                        </FormLabel>
                        <DateSelect selectedDate={selectedDate} onChange={handleDateChange} />
                    </FormControl>
                    <FormControl component="fieldset" fullWidth className="spacing double margin top">
                        <FormLabel component="legend" style={{ textAlign: 'left' }} className="spacing margin bottom">
                            Dein Wohnort
                        </FormLabel>
                        <LocationAutocomplete
                            countryCode={selectedCountry}
                            inputStyle={inputStyle}
                            value={selectedCity}
                            onLocationMatched={(city, zip) => {
                                setSelectedZip(zip);
                                setSelectedCity(city);
                            }}
                            placeholder=""
                        />
                    </FormControl>
                    <FormControl className="spacing margin top" variant="outlined" fullWidth margin="dense">
                        <CountrySelect
                            selectedCountry={selectedCountry}
                            onCountryChange={(newCountry: string) => {
                                setSelectedCity(undefined);
                                setSelectedZip(undefined);
                                setSelectedCountry(newCountry);
                            }}
                        />
                    </FormControl>
                    <FormControl component="fieldset" fullWidth className="spacing double margin top flex align-items-start">
                        <FormLabel component="legend" style={{ textAlign: 'left' }}>
                            Ich suche nach...
                        </FormLabel>

                        <div style={{ width: '100%' }} className="flex spacing padding top bottom">
                            <GenderSelectButtonGroup gender={searchGender} onGenderChange={setSearchGender} options={genderSearchOptions} />
                        </div>
                    </FormControl>
                    <br></br>
                    <Button
                        color="secondary"
                        onClick={handleNext}
                        style={{
                            borderRadius: '30px',
                        }}
                        disabled={!selectedZip}
                    >
                        Weiter
                    </Button>
                </>
            )}
            {activeStep === 1 && (
                <>
                    <TextField
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            style: {
                                borderRadius: '30px',
                            },
                        }}
                        fullWidth
                        label="Deine E-Mail Adresse"
                        type="email"
                        id="email-input"
                        key="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <TextField
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            style: {
                                borderRadius: '30px',
                            },
                        }}
                        fullWidth
                        label="Dein Passwort"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <TextField
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            style: {
                                borderRadius: '30px',
                            },
                        }}
                        fullWidth
                        label="Passwort wiederholen"
                        autoComplete="new-password"
                        type="password"
                        value={repeatPW}
                        onChange={(e) => setRepeatPW(e.currentTarget.value)}
                    />

                    <FormControl component="fieldset" fullWidth className="spacing margin top flex row align-items-start">
                        <FormControlLabel
                            className="user-select-none"
                            style={{
                                marginBottom: 24,
                                textAlign: 'left',
                            }}
                            control={<Checkbox value={optIn} onChange={() => setOptIn(!optIn)} required />}
                            label={
                                <>
                                    Ich habe die{' '}
                                    <Link target="_blank" href={AGB_PATH}>
                                        AGB
                                    </Link>{' '}
                                    und{' '}
                                    <Link target="_blank" href={DATA_PROTECTION_POLICY_PATH}>
                                        Datenschutzrichtlinien
                                    </Link>{' '}
                                    gelesen und akzeptiere sie.
                                </>
                            }
                        />
                    </FormControl>
                    <Typography>
                        Deine E-Mail Adresse wird verwendet um dich bei {Config.GLOBAL_SITE_NAME} zu registrieren & einzuloggen. Nur du kannst deine
                        E-Mail später sehen.
                    </Typography>
                    {loading && <ActivityIndicator />}
                    <Button
                        color="secondary"
                        onClick={handleRegister}
                        style={{
                            borderRadius: '30px',
                        }}
                        disabled={!optIn || !password || !repeatPW || !email}
                    >
                        Jetzt registrieren!
                    </Button>
                    <Button variant="text" onClick={handleBack} className="spacing margin top">
                        Zurück
                    </Button>
                </>
            )}
        </div>
    );
});

export default RegisterComponent;

const inputStyle = {
    borderRadius: '30px',
};


import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Box, LinearProgress, Typography } from '@mui/material';
import { getUser } from 'selectors/AuthenticationSelectors';
import { useDispatch, useSelector } from 'react-redux';
import RangeSliderComponent from 'pages/Mainpage/components/RangeSliderComponent';
import DropzoneUpload from './Upload';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepSix from './StepSix';
import { stepDescription, stepTitles } from './data';
import useHistoryPush from 'core/useHistoryPush';
import { MAIN_PATH } from 'models/Paths';
import isValidEmail from 'core/typeguards/isValidEmail';
import { IRegistrationCredentials } from 'models/authentication/registration/IRegistrationCredentials';
import { GenderSearchTraits, GenderTraits } from 'temp/models/BerndUserTraits';
import { USER_DEFAULT_DATE } from 'models/user/IUser';
import { Genders } from 'models/user/Gender';
import useUniqueId from 'core/useUniqueId';
import AuthenticationActionCreator from 'actions/AuthenticationActionCreator';
import { isError } from 'models/core/error/IError';
import NotificationActionCreator from 'services/Notifications/actions/NotificationActionCreator';
import { getRegistrationMessage } from 'config/errorMessages';
import DateSelect from 'components/DateSelect/DateSelect';
import LocationAutocomplete from 'components/LocationAutocomplete';
import { FormControl, FormLabel } from '@material-ui/core';
import CountrySelect from 'components/CountrySelect/CountrySelect';
import Config from 'config/config';

const Register: React.FC<any> = () => {
    const [registerModalOpen, setRegisterModalOpen] = useState(true);

    const [step, setStep] = useState(1);
    const user = useSelector(getUser);

    const [interest, setInterest] = useState('Friendship');
    const [distance, setDistance] = useState<number>(user?.Distance || 100);

    const handleInterest = (value: string) => {
        setInterest(value);
    };

    const onClose = () => setRegisterModalOpen(false);

    const history = useHistory();
    const [formData, setFormData] = useState({
        wohnort: '',
        land: '',
        geburtsdatum: '',
        name: '',
        email: '',
        passwort: '',
        country: '',
        city: '',
        passwortWiederholen: '',
        termsAccepted: false,
    });

    const [selectedDate, handleDateChange] = useState<Date>(USER_DEFAULT_DATE);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repeatPW, setRepeatPW] = useState<string>();
    const [gender, setSelectedGender] = useState(GenderTraits.MALE);
    const [selectedZip, setSelectedZip] = useState<string | undefined>(undefined);
    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedCountry, setSelectedCountry] = useState<string>('de');
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchGender, setSearchGender] = useState(GenderSearchTraits.FEMALE);
    const [optIn, setOptIn] = useState<boolean>(false);

    const handleGenderSelect = (gender: any) => {
        setSelectedGender(gender);
    };
    const handleLookingFor = (value: number) => {
        setSearchGender(value);
    };
    const profileId = history.location.pathname.includes('profile') ? history.location.pathname.replace('profile', 'stranger-profile') : '/';
    useEffect(() => {
        if (!registerModalOpen) {
            history.push('/');
        }
    }, [registerModalOpen]);

    const totalSteps = 7;
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptIn(e.target.checked);
    };

    const handleNext = () => {
        if (isStepValid() && step < totalSteps) {
            setStep((prevStep) => prevStep + 1); // Ensure step increments correctly
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        // onClose();
        handleRegister();
    };
    const id = useUniqueId();
    const dispatch = useDispatch();

    const handleClose = useHistoryPush(MAIN_PATH);

    const isStepValid = () => {
        switch (step) {
            case 1:
                return name.trim() !== '';
            case 2:
                return selectedDate !== null;

            case 5:
                return selectedZip?.trim() !== undefined && selectedCity?.trim() !== undefined; // Example for terms acceptance
            case 6:
                return optIn && email?.trim() !== '' && password?.trim() !== '' && password === repeatPW; // Example for terms acceptance
            default:
                return true;
        }
    };
    console.log('isStepValid', isStepValid);

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
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                background: `
                    radial-gradient(circle at 30% 30%, ${Config.GLOBAL_PRIMARY_COLOR} 10%, rgba(255, 255, 255, 0.7) 50%),
                    radial-gradient(circle at 70% 70%, ${Config.GLOBAL_PRIMARY_COLOR} 10%, rgba(255, 255, 255, 0.9) 50%)
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Dialog
                open={registerModalOpen}
                onClose={onClose}
                fullWidth
                BackdropProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '16px', // Adjust the border radius as needed
                    },
                }}
            >
                <Box
                    sx={{
                        height: '30px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2.5rem',
                        paddingBottom: '0px',
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: '10px',
                            width: '90%',
                            borderRadius: '5px',
                            background: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(to right, ${Config.GLOBAL_PRIMARY_COLOR}, rgb(0, 0, 0))`,
                            },
                        }}
                    />

                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',

                            width: '30px',
                        }}
                    >
                        {step} / {totalSteps}
                    </Typography>
                </Box>
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        color: '#22172a',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        marginTop: '1em',
                    }}
                >
                    {stepTitles[step - 1]}
                </DialogTitle>

                <Typography sx={{ textAlign: 'center', paddingInline: '2rem' }}>{stepDescription[step - 1]}</Typography>

                <DialogContent
                    sx={{
                        paddingInline: '3rem', // Padding for dialog content
                    }}
                >
                    <form>
                        <Grid container spacing={2} mt={2}>
                            {step === 1 && <StepOne name={name} setName={setName} />}
                            {step === 2 && <DateSelect selectedDate={selectedDate} onChange={handleDateChange} />}
                            {step === 3 && <StepThree selectedGender={gender} handleGenderSelect={handleGenderSelect} />}
                            {step === 4 && (
                                <Box>
                                    <StepFour
                                        lookingFor={searchGender}
                                        interest={interest}
                                        handleLookingFor={handleLookingFor}
                                        handleInterest={handleInterest}
                                    />
                                </Box>
                            )}

                            {step === 5 && (
                                <>
                                    {/* <StepFive /> */}
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
                                    <Grid item xs={12}>
                                        <RangeSliderComponent value={distance} onChange={setDistance} />
                                    </Grid>
                                </>
                            )}
                            {step === 6 && (
                                <StepSix
                                    email={email}
                                    optIn={optIn}
                                    password={password}
                                    setPassword={setPassword}
                                    setEmail={setEmail}
                                    handleTermsChange={handleTermsChange}
                                    repeatPW={repeatPW}
                                    setRepeatPW={setRepeatPW}
                                />
                            )}
                            {step === 7 && <DropzoneUpload onUpload={(base64: any) => console.log('Uploaded Image:', base64)} />}
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'space-between',
                        paddingBottom: 2,

                        paddingInline: '3rem', // Padding for dialog content
                    }}
                >
                    {step > 1 && (
                        <Button
                            variant="contained"
                            onClick={handleBack}
                            sx={{
                                borderRadius: '50px',
                                color: 'black',
                                width: 'auto',
                                backgroundColor: 'rgb(229, 229, 229)',
                                '&:hover': {
                                    backgroundColor: 'rgb(229, 229, 229)',
                                },
                            }}
                        >
                            Zurück
                        </Button>
                    )}
                    {step === 1 ? (
                        <Grid container justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepValid() || name?.trim() === ''}
                                sx={{
                                    borderRadius: '50px',
                                    backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                                    '&:hover': {
                                        backgroundColor: 'black', // Change to black on hover
                                    },
                                    padding: '6px 24px',
                                    width: 'auto',
                                }}
                            >
                                Weiter
                            </Button>
                        </Grid>
                    ) : (
                        <Button
                            variant="contained"
                            disabled={!isStepValid()}
                            onClick={step === 6 ? handleSubmit : handleNext}
                            sx={{
                                borderRadius: '50px',
                                backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                                '&:hover': {
                                    backgroundColor: 'black', // Change to black on hover
                                },
                                width: 'auto',
                                padding: '6px 24px',
                            }}
                        >
                            {step === 6 ? 'Jetzt registrieren' : 'Weiter'}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Register;

const inputStyle = {
    borderRadius: '30px',
};


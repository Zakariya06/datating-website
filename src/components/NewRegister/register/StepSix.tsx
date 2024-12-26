import React from 'react';
import { Grid, TextField, FormControlLabel, Checkbox, Link } from '@mui/material';
import Config from 'config/config';
import { AGB_PATH, DATA_PROTECTION_POLICY_PATH } from 'models/Paths';

const StepSix = ({ repeatPW, setRepeatPW, optIn, password, email, setEmail, setPassword, handleTermsChange }: any) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'black', // Default label color
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'black', // Label color on focus
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'black', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Border color on focus
                            },
                        },
                    }}
                />
            </Grid>

            <Grid item xs={12} mt={2}>
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'black', // Default label color
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'black', // Label color on focus
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'black', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Border color on focus
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    label="Passwort wiederholen"
                    variant="outlined"
                    fullWidth
                    name="Repeat-Password"
                    type="password"
                    value={repeatPW}
                    onChange={(e) => {
                        setRepeatPW(e.target.value);
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'black', // Default label color
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'black', // Label color on focus
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'black', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Border color on focus
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox checked={optIn} onChange={handleTermsChange} />}
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
            </Grid>
        </>
    );
};

export default StepSix;

//   <>
//       Ich habe die{' '}
//       <Link target="_blank" href={AGB_PATH}>
//           AGB
//       </Link>{' '}
//       und{' '}
//       <Link target="_blank" href={DATA_PROTECTION_POLICY_PATH}>
//           Datenschutzrichtlinien
//       </Link>{' '}
//       gelesen und akzeptiere sie.
//   </>;

{
    /* <Typography>
    Deine E-Mail Adresse wird verwendet um dich bei {Config.GLOBAL_SITE_NAME} zu registrieren & einzuloggen. Nur du kannst deine E-Mail später sehen.








</Typography>; */
}


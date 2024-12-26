import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Config from 'config/config';
import useTranslation from 'services/i18n/core/useTranslation';

const StepThree = ({ selectedGender, handleGenderSelect }: any) => {
    const { TRAITS_GENDER_MAN, TRAITS_GENDER_WOMAN } = useTranslation();

    const genders = [
        { value: 1, icon: <MaleIcon fontSize="large" />, label: TRAITS_GENDER_MAN },
        { value: 2, icon: <FemaleIcon fontSize="large" />, label: TRAITS_GENDER_WOMAN },
        // { value: 'Neutral', icon: <TransgenderIcon fontSize="large" />, label: 'Neutral' },
    ];


    return (
        <Grid container spacing={2} justifyContent="center" sx={{ width: '80%', margin: '0 auto' }}>
            {genders.map((gender) => (
                <Grid item key={gender.value} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        onClick={() => handleGenderSelect(gender.value)}
                        sx={{
                            width: 130,
                            height: 130,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: selectedGender === gender.value ? `3px solid ${Config.GLOBAL_PRIMARY_COLOR}` : '2px solid #ccc',
                            backgroundColor: selectedGender === gender.value ? `${Config.GLOBAL_PRIMARY_COLOR}` : '#fff',
                            color: selectedGender === gender.value ? '#fff' : '#000',
                            '&:hover': {
                                border: `3px solid ${Config.GLOBAL_PRIMARY_COLOR}`,
                            },
                        }}
                    >
                        {gender.icon}
                        <Typography
                            variant="caption"
                            sx={{
                                mt: 1,
                                color: selectedGender === gender.value ? '#fff' : '#000',
                            }}
                        >
                            {gender.label}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default StepThree;


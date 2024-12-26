import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Config from 'config/config';
import useTranslation from 'services/i18n/core/useTranslation';

interface StepFourProps {
    lookingFor: number;
    interest: string;
    handleLookingFor: (value: number) => void;
    handleInterest: (value: string) => void;
}

const StepFour: React.FC<StepFourProps> = ({ lookingFor, interest, handleLookingFor, handleInterest }) => {
    const { TRAITS_GENDER_MAN, TRAITS_GENDER_WOMAN, SEARCH_SETTINGS_INTERESTED_IN } = useTranslation();

    return (
        <Box>
            <Typography sx={{ color: '#22172a', fontWeight: '700', fontSize: '1rem', mb: 2 }}>{SEARCH_SETTINGS_INTERESTED_IN}</Typography>
            <Box display="flex" gap={1} sx={{ flexWrap: 'wrap' }}>
                {[
                    { value: 1, label: TRAITS_GENDER_MAN },
                    { value: 2, label: TRAITS_GENDER_WOMAN },
                ].map((option) => (
                    <Chip
                        key={option.value}
                        label={option.label}
                        onClick={() => handleLookingFor(option.value)}
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: lookingFor === option.value ? `${Config.GLOBAL_PRIMARY_COLOR}` : 'rgb(229, 229, 229)',
                            color: lookingFor === option.value ? '#fff' : '#000',
                            fontWeight: lookingFor === option.value ? 'bold' : 'normal',
                            borderRadius: '50px',
                            px: 1,
                            py: 2.5,
                            fontSize: '0.875rem',
                        }}
                    />
                ))}
            </Box>

            {/*<Typography sx={{ color: '#22172a', fontWeight: '700', fontSize: '1rem', mb: 2, mt: 2 }}>I am looking for:</Typography>
            <Box display="flex" gap={1} sx={{ flexWrap: 'wrap' }}>
                {[
                    { value: 'Friendship', label: 'Friendship' },
                    { value: 'Fun', label: 'Fun' },
                    { value: 'Relationship', label: 'Relationship' },
                    { value: 'Whatever comes up', label: 'Whatever comes up' },
                ].map((option) => (
                    <Chip
                        key={option.value}
                        label={option.label}
                        onClick={() => handleInterest(option.value)}
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: interest === option.value ? `${Config.GLOBAL_PRIMARY_COLOR}` : 'rgb(229, 229, 229)',
                            color: interest === option.value ? '#fff' : '#000',
                            fontWeight: interest === option.value ? 'bold' : 'normal',
                            borderRadius: '50px',
                            px: 1,
                            py: 2.5,
                            fontSize: '0.875rem',
                        }}
                    />
                ))}
            </Box>*/}
        </Box>
    );
};

export default StepFour;


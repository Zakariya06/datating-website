import React from 'react';
import { TextField, Grid } from '@mui/material';

const StepOne = ({ name, setName }: any) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="Dein Name"
                variant="outlined"
                fullWidth
                name="name"
                value={name}
                onChange={(e: any) => {
                    setName(e.target.value);
                }}
                required={true}
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
    );
};

export default StepOne;


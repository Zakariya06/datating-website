import React from 'react';
import { TextField, Grid } from '@mui/material';

const StepTwo = ({ selectedDate, handleDateChange }: any) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="Dein Geburtsdatum"
                variant="outlined"
                fullWidth
                name="geburtsdatum"
                type="date"
                value={selectedDate}
                onChange={(e: any) => {
                    handleDateChange(e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
    );
};

export default StepTwo;


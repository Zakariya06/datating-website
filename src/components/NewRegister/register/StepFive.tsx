import { TextField } from '@mui/material';

const StepFive = ({ formData, handleChange }: any) => {
    return (
        <>
            <TextField label="Select a country" variant="outlined" fullWidth name="country" value={formData?.country} onChange={handleChange} />
            <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={formData?.city}
                onChange={handleChange}
                sx={{ marginTop: '2rem' }}
            />
        </>
    );
};

export default StepFive;


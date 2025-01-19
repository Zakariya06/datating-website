import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple'; // Import Apple icon from MUI
import { useTranslation } from 'services/i18n/core/useTranslation';
import LoginModal from './Login';
import { useHistory } from 'react-router-dom';
import Config from 'config/config';


const Form = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const history = useHistory();
    const handleLoginOpen = () => {
        setLoginModalOpen(true);
    };
    const handleLoginClose = () => setLoginModalOpen(false);

    const { REGISTER_EMAIL, LOGIN_NOT_YET, LOGIN_BUTTON, LOGIN_APPLE, SKIPPED_START_JOURNEY } = useTranslation();

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '430px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#fff', // White background
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                color: 'black',
                marginTop: '3rem',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Added shadow
            }}
        >
            {/* Logo Text */}
            <Typography
                variant="h4"
                component="div"
                mt={2}
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                {LOGIN_NOT_YET}
            </Typography>
            <Typography
                variant="body2"
                component="div"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                {SKIPPED_START_JOURNEY}
            </Typography>

            {/* Button */}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                    color: 'white',
                    borderRadius: '40px',
                    padding: '10px 20px',
                    fontWeight: 700,
                    width: '80%',
                    '&:hover': {
                        backgroundColor: `black`,
                    },
                }}
                onClick={() => {
                    history.push('/register-user');
                }}
            >
                {REGISTER_EMAIL}
            </Button>

            {/* OR Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                    gap: '10px',
                }}
            >
                {/* Left Line */}
                <Box
                    sx={{
                        flexGrow: 1,
                        height: '1px',
                        backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                    }}
                />
                {/* OR Text */}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        color: `${Config.GLOBAL_PRIMARY_COLOR}`,
                        whiteSpace: 'nowrap',
                    }}
                >
                    OR
                </Typography>
                {/* Right Line */}
                <Box
                    sx={{
                        flexGrow: 1,
                        height: '1px',
                        backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                    }}
                />
            </Box>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: `black`, // New background color
                    color: 'white',
                    borderRadius: '40px',
                    padding: '10px 20px',
                    fontWeight: 700,
                    textTransform: 'none', // Prevents uppercase transformation
                    width: '80%',
                    display: 'flex', // Ensures proper alignment
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px', // Space between icon and label
                    '&:hover': {
                        backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`, // Slightly lighter shade on hover
                    },
                }}
                onClick={handleLoginOpen}
            >
                {LOGIN_BUTTON}
            </Button>
            {/*<Button
                variant="contained"
                startIcon={<AppleIcon sx={{ fontSize: 24 }} />} // Apple logo as the start icon
                sx={{
                    backgroundColor: `black`, // New background color
                    color: 'white',
                    borderRadius: '40px',
                    padding: '10px 20px',
                    fontWeight: 700,
                    textTransform: 'none', // Prevents uppercase transformation
                    width: '80%',
                    display: 'flex', // Ensures proper alignment
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px', // Space between icon and label
                    '&:hover': {
                        backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`, // Slightly lighter shade on hover
                    },
                }}
                onClick={() => {}}
            >
                {LOGIN_APPLE}
            </Button> */}

            {/* Register and Login Modals */}
            <LoginModal open={loginModalOpen} onClose={handleLoginClose} />
        </Box>
    );
};

export default Form;


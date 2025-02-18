import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MobileStepper, Typography } from '@mui/material';
import { ArrowBackIosRounded, Circle, Close } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UndoIcon from '@mui/icons-material/Undo'; // Import the UndoIcon
import useUserAndToken from 'core/useUserAndToken';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyUsers } from 'selectors/NearbySelectors';
import generateValidUrl from 'core/fetch/generateValidUrl';
import { getAge, getProfileImage } from 'models/user/IUser';
import NearbyActionCreator from 'actions/NearbyActionCreator';
import DirectInteractionActionCreator from 'actions/DirectInteractionActionCreator';
import InsufficientCoinsDialog from 'components/InsufficientCoinsDialog';
import { Link } from 'react-router-dom';
import { STRANGER_PROFILE_PATH } from 'models/Paths';
import InsufficientLikesDialog from 'components/InsufficientLikesDialog';
import PremiumDialog from '../components/PremiumDialog';
import Config from 'config';

const MatchGame = () => {
    const { user, token } = useUserAndToken();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const users = useSelector(getNearbyUsers);
    const items = users._embedded.items;
    const dispatch = useDispatch();
    const [insufficientCoinsDialogOpen, setInsufficientCoinsDialogOpen] = useState(false);
    const [insufficientLikesDialogOpen, setInsufficientLikesDialogOpen] = useState(false);
    const [openPremiumDialog, setOpenPremiumDialog] = useState<boolean>(false);

    useEffect(() => {
        void (async () => {
            await dispatch(NearbyActionCreator.fetchGameUsers(true));
            setIsLoading(false);
        })();
    }, [token, user?.SearchGender, user?.MinAge, user?.MaxAge, user?.Distance]);

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = items.length;

    const handleInteraction = (action: 'like' | 'dislike') => {
        DirectInteractionActionCreator.triggerMatchStrangerUserRelation(items[activeStep].Profilid, action, token, user)
            .then((response) => response.json())
            .then((data) => {
                if (data[0].Note === 'NOLIKES') {
                    setInsufficientCoinsDialogOpen(true);
                } else if (data[0].Note === 'NO_FREELIKES') {
                    setOpenPremiumDialog(true);
                    setInsufficientLikesDialogOpen(true);
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            })
            .catch((error) => { });
    };

    const handleNext = () => {
        handleInteraction('like');
    };

    const handleBack = () => {
        handleInteraction('dislike');
    };

    const handleRecover = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box
            p={{ md: 4, sm: 3, xs: 2 }}
            mt={{ xs: 5, sm: 0, md: 0 }}
            height={{ md: 'auto', sm: 'auto', }}
            sx={{ backgroundColor: '#f5f5f5', borderRadius: 3 }}
        >
            {items?.length > 0 &&
                items?.map((item, i) => (
                    <Grid container spacing={{ md: 4, sm: 3, xs: 2 }} alignItems="center" key={i} position={"relative"}>
                        {activeStep === i && (
                            <Grid item md={6} sm={7} xs={12} >
                                <Box
                                    height={{ md: '550px', sm: '450px', xs: '450px' }}
                                    position={'relative'}
                                    sx={{
                                        borderRadius: 3, overflow: 'hidden', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            '& > div': {
                                                width: '100%',
                                            },
                                        },
                                    }}
                                >
                                    <Link to={STRANGER_PROFILE_PATH.replace(':id?', item?.Profilid)}>
                                        <img
                                            width={'100%'}
                                            height={'100%'}
                                            style={{ objectFit: 'cover' }}
                                            src={generateValidUrl(getProfileImage(item))}
                                        />
                                    </Link>

                                    {user?.Premium && activeStep > 0 && (
                                        <Button
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                backgroundColor: Config.GLOBAL_PRIMARY_COLOR,
                                                borderRadius: '50%',
                                                p: 1.5,
                                                boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
                                                '&:hover': {
                                                    backgroundColor: Config.GLOBAL_PRIMARY_COLOR,
                                                    filter: 'brightness(1.2)',
                                                },
                                            }}
                                            onClick={handleRecover}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            <UndoIcon sx={{ color: 'white' }} />
                                        </Button>
                                    )}
                                    <Box

                                        sx={{
                                            position: 'absolute',
                                            zIndex: 444,
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 2,
                                            width: '150%',
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: '50%',
                                                p: 2,
                                                backgroundColor: '#fff',
                                                '&:hover': { backgroundColor: '#000000b0' },
                                            }}
                                            onClick={handleBack}
                                        >
                                            <Close sx={{ color: 'gray', fontSize: 30 }} />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: '50%',
                                                p: 2,
                                                backgroundColor: '#fff',
                                                '&:hover': { backgroundColor: '#000000b0' },
                                            }}
                                            onClick={handleNext}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            <FavoriteBorderIcon sx={{ color: 'red', fontSize: 30 }} />
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        )}
                        <Grid
                            item
                            md={6}
                            sm={5}
                            xs={12} 
                            sx={{
                                position: { sm: "static", xs: "absolute", md: "static" }, // Absolute for small, static for large
                                top: { sm: "unset", xs: "90%", md: "unset" }, // Reset bottom for larger screens
                                left: { sm: "unset", xs: "50%", md: "unset" }, // Reset left for larger screens
                                transform: { sm: "unset", xs: "translate(-50%, -20%)", md: "unset" }, // Reset transform
                                width: { xs: "96%", sm: "100%", md: "auto" }, // Reset width
                                height: { xs: "100%", sm: "100%", md: "auto" }, // Reset height
                                 
                            }}
                        >
                            {activeStep === i && (
                                <Box
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        boxShadow: 4,
                                        bgcolor: 'white',
                                    }}
                                >
                                    <Link to={STRANGER_PROFILE_PATH.replace(':id?', item?.Profilid)} style={{ textDecoration: 'none' }}>
                                        <Typography
                                            pb={{ md: 2, sm: 2, xs: 1 }}
                                            fontSize={{ md: '1.6em', sm: '1.4em', xs: '1.2em' }}
                                            fontWeight={'bold'}
                                            sx={{ color: '#333' }}
                                        >
                                            {item?.Username}, {getAge(item.Birthday)}
                                            <Circle
                                                sx={{
                                                    color: item?.IsOnline ? '#19cea4' : 'red',
                                                    fontSize: '0.8em',
                                                    ml: 0.5,
                                                }}
                                            />
                                        </Typography>
                                    </Link>
                                    <Box sx={{ color: '#555', fontSize: '1em' }}>
                                        <Typography>{item.City}</Typography>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                ))}

            <InsufficientCoinsDialog open={insufficientCoinsDialogOpen} onClose={() => setInsufficientCoinsDialogOpen(false)} />
            <InsufficientLikesDialog open={insufficientLikesDialogOpen} onClose={() => setInsufficientLikesDialogOpen(false)} />
            <PremiumDialog open={openPremiumDialog} handleClose={() => setOpenPremiumDialog(false)} />
        </Box>
    );
}

export default MatchGame;

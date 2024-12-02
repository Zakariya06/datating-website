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
            .catch((error) => {});
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
        <Box p={{ md: 3, sm: 2, xs: 1 }} mt={{ xs: 5, sm: 0, md: 0 }} height={{ md: 'auto', sm: 'auto', xs: '100vh' }}>
            {items?.length > 0 &&
                items?.map((item, i) => (
                    <Grid container spacing={{ md: 4, sm: 3, xs: 1 }}>
                        {activeStep === i && (
                            <Grid item md={6} sm={7} xs={12}>
                                <Box height={{ md: '550px', sm: '450px', xs: '500px' }} position={'relative'}>
                                    <Link to={STRANGER_PROFILE_PATH.replace(':id?', item?.Profilid)}>
                                        <img
                                            width={'100%'}
                                            height={'100%'}
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            src={generateValidUrl(getProfileImage(item))}
                                        />
                                    </Link>

                                    {/* Add the UndoIcon Button */}
                                    {user?.Premium && activeStep > 0 && (
                                        <Button
                                            sx={{
                                                position: 'absolute',
                                                top: 18,
                                                left: 18,
                                                backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}`,
                                                borderRadius: '50%',
                                                p: 1,
                                                minWidth: 'auto',
                                                '&:hover': {
                                                    backgroundColor: `linear-gradient(180deg, ${Config.GLOBAL_PRIMARY_COLOR} 80%, #fffff 2%)`,
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
                                            bottom: { md: 100, sm: 90, xs: -100 },
                                            color: 'white',
                                            left: { md: '30%', sm: '20%', xs: '25%' },
                                            right: '50%',
                                            transform: 'translate(-50% -50%)',
                                        }}
                                    >
                                        <MobileStepper
                                            variant="text"
                                            steps={maxSteps}
                                            position="static"
                                            activeStep={activeStep}
                                            sx={{
                                                bgcolor: 'transparent',
                                                color: 'transparent',
                                                position: 'absolute',
                                                top: 0,
                                                display: 'flex',
                                                gap: 1,
                                            }}
                                            nextButton={
                                                <Button
                                                    variant="outlined"
                                                    sx={{ outline: '2px solid white', borderRadius: '50%', p: 2, backgroundColor: '#00000075' }}
                                                    size="small"
                                                    onClick={handleNext}
                                                    disabled={activeStep === maxSteps - 1}
                                                >
                                                    <FavoriteBorderIcon fontSize="large" sx={{ height: '30px', width: '30px', color: 'red' }} />
                                                </Button>
                                            }
                                            backButton={
                                                <Button
                                                    variant="outlined"
                                                    sx={{ outline: '2px solid white', borderRadius: '50%', p: 2, backgroundColor: '#00000075' }}
                                                    size="small"
                                                    onClick={handleBack}
                                                >
                                                    <Close fontSize="large" sx={{ height: '30px', width: '30px', color: 'white' }} />
                                                </Button>
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        )}
                        <Grid item md={6} sm={5} xs={12}>
                            {activeStep === i && (
                                <Box>
                                    <Link to={STRANGER_PROFILE_PATH.replace(':id?', item?.Profilid)} style={{ textDecoration: 'none' }}>
                                        <Typography pb={{ md: 2, sm: 2, xs: 1 }} fontSize={'1.4em '} fontWeight={'bold'} className="profileCardTitle">
                                            {item?.Username}, {getAge(item.Birthday)}
                                            {item?.IsOnline ? (
                                                <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                            ) : (
                                                <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                                            )}
                                        </Typography>
                                    </Link>
                                    <Box className="profileCardText">
                                        <Typography>{item.City}</Typography>
                                        <Typography>{item.Zip}</Typography>
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
};

export default MatchGame;


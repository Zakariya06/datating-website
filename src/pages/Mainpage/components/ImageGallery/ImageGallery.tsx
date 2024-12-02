import { faChevronLeft, faChevronRight, faLock, faTimes } from '@fortawesome/pro-light-svg-icons';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import { Dialog, DialogContent, DialogTitle, IconButton, MobileStepper, Paper, Slide, Typography, useMediaQuery } from '@material-ui/core';
import React, { CSSProperties, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import UserActionCreator from '../../../../actions/UserActionCreator';
import Icon from '../../../../components/Icon';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import isNullOrUndefined from '../../../../core/typeguards/isNullOrUndefined';
import { IImage } from '../../../../models/core/image/IImage';
import { fallbackPicture } from '../../../../temp/fallbackPicture';
import { ImageOptionsMenu } from './components/ImageOptionsMenu/ImageOptionsMenu';

export interface IImageGalleryProps {
    open: boolean;
    currentIndex: number;
    pictures: IImage[] | undefined;
    onClose(): void;
}

export const ImageGallery = memo((props: IImageGalleryProps) => {
    const { open, onClose, currentIndex, pictures } = props;
    const [activeStep, setActiveStep] = useState<number>(currentIndex);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [slideIn, setSlideIn] = useState<boolean>(true);
    const [direction, setDirection] = useState<'left' | 'right'>();

    const dispatch = useDispatch();

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    useEffect(() => {
        setActiveStep(currentIndex);
    }, [currentIndex]);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );

    const handleCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const maxSteps = pictures ? pictures.length : 0;

    const activePicture = pictures ? pictures[activeStep] : undefined;

    const imageDivStyle: CSSProperties = {
        width: isDesktop ? '680px' : '70vw',
        height: isDesktop ? '500px' : '80vh',
        backgroundImage:
            // pictures && activePicture ? 'url("' + generateValidUrl(activePicture.Picture) + '")' : 'url("' + fallbackPicture.Picture + '")',
            pictures && activePicture ? `url('${generateValidUrl(activePicture.Picture)}')` : `url('${fallbackPicture.Picture}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    /* useEffect(() => {
        const unmount = () => setDirection(undefined);
    }, []); */

    const handleNextStep = () => {
        setSlideIn(false);

        setDirection('right');
        setTimeout(() => {
            setDirection('left');
            if (activeStep === maxSteps - 1) {
                setActiveStep(0);
            } else {
                setActiveStep(activeStep + 1);
            }

            setSlideIn(true);
        }, 300);
    };

    const handleBackStep = () => {
        setSlideIn(false);
        setDirection('left');

        setTimeout(() => {
            setDirection('right');
            if (activeStep === 0) {
                setActiveStep(maxSteps - 1);
            } else {
                setActiveStep(activeStep - 1);
            }
            setSlideIn(true);
        }, 300);
    };

    const handleDeleteImage = async () => {
        if (pictures && activePicture) {
            await dispatch(UserActionCreator.deletePicture(activePicture.Picture));
        }
    };

    const handleUpdateProfilePicture = async () => {
        if (pictures && activePicture) {
            await dispatch(UserActionCreator.updateProfilePicture(activePicture.Picture));
        }
    };

    return (
        <>
            <Dialog
                open={open}
                fullScreen={!isDesktop}
                onClose={onClose}
                BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
                PaperProps={{
                    style: {
                        padding: 0,
                        margin: 0,
                        width: 'fit-content',
                        maxWidth: 'unset',
                        backgroundColor: 'transparent',

                        alignItems: 'center',
                        boxShadow: 'unset',
                    },
                }}
            >
                <DialogTitle disableTypography style={{ padding: 0, width: '100%' }}>
                    {pictures && activePicture && !isNullOrUndefined(activePicture.Coins) && activePicture.Coins > 0 && (
                        <div className="flex row align-items-center justify-content-center">
                            <Icon iconColor="#42A5F5" icon={faLock} className="spacing margin right" />
                            <Typography color="primary" variant="body1">
                                {activePicture.Coins}
                            </Typography>
                        </div>
                    )}

                    <MobileStepper
                        steps={maxSteps}
                        backButton={
                            <IconButton style={{ backgroundColor: 'rgb(67, 67, 67)' }} onClick={onClose}>
                                <Icon iconColor="#FFFFFF" icon={faTimes} />
                            </IconButton>
                        }
                        nextButton={
                            <IconButton onClick={handleClick} style={{ backgroundColor: 'rgb(67, 67, 67)' }}>
                                <Icon iconColor="#FFFFFF" icon={faEllipsisH} />
                            </IconButton>
                        }
                        variant="dots"
                        position={isDesktop ? 'static' : 'top'}
                        activeStep={activeStep}
                    />
                </DialogTitle>
                <DialogContent>
                    <div className="flex" style={{ width: '100%', height: '100%' }}>
                        <Paper elevation={0} style={{ backgroundColor: 'transparent', alignSelf: 'center' }} square>
                            <div onClick={handleBackStep} className="spacing double padding all" style={{ cursor: 'pointer' }}>
                                <Icon iconColor="#FFFFFF" fontSize="large" icon={faChevronLeft} />
                            </div>
                        </Paper>
                        <div className="flex" style={{ flexDirection: 'column-reverse' }}>
                            <Slide in={slideIn} direction={direction}>
                                <div style={imageDivStyle}></div>
                            </Slide>
                        </div>
                        <Paper elevation={0} style={{ backgroundColor: 'transparent', alignSelf: 'center' }} square>
                            <div onClick={handleNextStep} className="spacing double padding all" style={{ cursor: 'pointer' }}>
                                <Icon iconColor="#FFFFFF" fontSize="large" icon={faChevronRight} />
                            </div>
                        </Paper>
                    </div>
                </DialogContent>
            </Dialog>
            <ImageOptionsMenu
                handleUpdateProfilePicture={handleUpdateProfilePicture}
                handleDeleteImage={handleDeleteImage}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                closeMenu={handleCloseMenu}
            />
        </>
    );
});

export default ImageGallery;

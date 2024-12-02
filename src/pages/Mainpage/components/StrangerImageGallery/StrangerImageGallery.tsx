import { faChevronLeft, faChevronRight, faLock, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Dialog, DialogContent, IconButton, MobileStepper, Slide, Typography, useMediaQuery } from '@material-ui/core';
import React, { CSSProperties, memo, useCallback, useEffect, useState } from 'react';

import Icon from '../../../../components/Icon';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import isNullOrUndefined from '../../../../core/typeguards/isNullOrUndefined';
import { IImage } from '../../../../models/core/image/IImage';
import { IStrangerUser } from '../../../../models/user/IStrangerUser/IStrangerUser';
import { IUser } from '../../../../models/user/IUser';
import { fallbackPicture } from '../../../../temp/fallbackPicture';
import PurchaseCoinImageDialog from './PurchaseCoinImageDialog';

export interface IStrangerImageGalleryProps {
    strangerUser: IStrangerUser;
    currentKey: number;
    open: boolean;
    pictures: IImage[] | undefined;
    token?: string;
    user?: IUser;
    onPurchaseFinished(): void;
    onClose(): void;
}

export const StrangerImageGallery = memo((props: IStrangerImageGalleryProps) => {
    const { open, onClose, pictures, currentKey, token, user, onPurchaseFinished, strangerUser } = props;

    const [activeStep, setActiveStep] = useState<number>(currentKey);
    const [direction, setDirection] = useState<'left' | 'right'>();
    const [slideIn, setSlideIn] = useState<boolean>(true);

    useEffect(() => {
        // eslint-disable-next-line no-console
        setActiveStep(currentKey);
    }, [currentKey]);

    const [openCoinDialog, setOpenCoinDialog] = useState<boolean>(false);

    const maxSteps = pictures ? pictures.length : 0;

    const activeImage = pictures ? pictures[activeStep] : undefined;

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    const imageDivStyle: CSSProperties = {
        width: isDesktop ? '680px' : '70vw',
        height: isDesktop ? '500px' : '80vh',
        // backgroundImage: activeImage ? 'url("' + generateValidUrl(activeImage.Picture) + '")' : 'url("' + fallbackPicture.Picture + '")',
        backgroundImage: activeImage ? `url('${generateValidUrl(activeImage.Picture)}')` : `url('${fallbackPicture.Picture}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginTop: 8,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    };

    const handleNextStep = () => {
        setSlideIn(false);
        setDirection('right');
        setTimeout(() => {
            setDirection('left');
            setActiveStep(activeStep === maxSteps - 1 ? 0 : activeStep + 1);

            setSlideIn(true);
        }, 300);
    };

    const handleBackStep = () => {
        setSlideIn(false);
        setDirection('left');
        setTimeout(() => {
            setDirection('right');
            setActiveStep(activeStep === 0 ? maxSteps - 1 : activeStep - 1);

            setSlideIn(true);
        }, 300);
    };

    const handleClick = useCallback(() => setOpenCoinDialog(true), [setOpenCoinDialog]);

    const isCoinImage = activeImage && !isNullOrUndefined(activeImage.Coins) && activeImage.Coins > 0;

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
                <DialogContent>
                    <div className="flex" style={{ width: '100%', height: '100%' }}>
                        <div className="flex align-items-center">
                            <div onClick={handleBackStep} className="spacing double padding all" style={{ cursor: 'pointer' }}>
                                <Icon iconColor="#FFFFFF" fontSize="large" icon={faChevronLeft} style={{ fontSize: 36 }} />
                            </div>
                        </div>
                        <div className="flex" style={{ flexDirection: 'column-reverse' }}>
                            <Slide in={slideIn} direction={direction}>
                                <div onClick={isCoinImage ? handleClick : undefined} style={imageDivStyle}>
                                    {isCoinImage && (
                                        <div className="flex column justify-content-center align-items-center">
                                            <Icon icon={faLock} iconColor="#fff" style={{ fontSize: 72 }} />
                                            <Typography
                                                className="spacing margin top"
                                                style={{ color: '#fff', textShadow: '0 0 5px black' }}
                                            >{`${activeImage?.Coins} Coins`}</Typography>
                                        </div>
                                    )}
                                </div>
                            </Slide>

                            <MobileStepper
                                steps={maxSteps}
                                backButton={
                                    <IconButton style={{ backgroundColor: 'rgb(67, 67, 67)' }} onClick={onClose}>
                                        <Icon iconColor="#FFFFFF" icon={faTimes} />
                                    </IconButton>
                                }
                                nextButton={<div style={{ width: 44 }} />}
                                variant="dots"
                                position={isDesktop ? 'static' : 'top'}
                                activeStep={activeStep}
                            />
                        </div>

                        <div className="flex align-items-center">
                            <div onClick={handleNextStep} className="spacing double padding all" style={{ cursor: 'pointer' }}>
                                <Icon iconColor="#FFFFFF" fontSize="large" icon={faChevronRight} style={{ fontSize: 36 }} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {isCoinImage && openCoinDialog && activeImage && (
                <PurchaseCoinImageDialog
                    open={openCoinDialog}
                    onClose={() => setOpenCoinDialog(false)}
                    token={token}
                    user={user}
                    image={activeImage}
                    strangerUser={strangerUser}
                    onPurchaseFinished={onPurchaseFinished}
                />
            )}
        </>
    );
});

export default StrangerImageGallery;

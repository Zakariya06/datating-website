import { MobileStepper } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import CarouselContentFour from './CarouselContents/CarouselContentFour';
import CarouselContentOne from './CarouselContents/CarouselContentOne';
import CarouselContentThree from './CarouselContents/CarouselContentThree';
import CarouselContentTwo from './CarouselContents/CarouselContentTwo';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface ICarouselComponentProps {
    onClick(): void;
}

const maxSteps = 4;

export const CarouselComponent = memo((props: ICarouselComponentProps) => {
    const { onClick } = props;
    const [activeStep, setActiveStep] = useState<number>(1);

    const handleStepChange = useCallback((step: number) => setActiveStep(step), [setActiveStep]);

    return (
        <div className="flex column align-items-center" style={{ width: '100%' }}>
            <AutoPlaySwipeableViews interval={6000} onChangeIndex={handleStepChange} enableMouseEvents index={activeStep} style={{ width: '100%' }}>
                <CarouselContentOne onClick={onClick} />
                <CarouselContentTwo onClick={onClick} />
                <CarouselContentThree onClick={onClick} />
                <CarouselContentFour onClick={onClick} />
            </AutoPlaySwipeableViews>
            <MobileStepper steps={maxSteps} position="static" variant="dots" nextButton={null} backButton={null} activeStep={activeStep} />
        </div>
    );
});

export default CarouselComponent;

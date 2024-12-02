import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import React, { memo } from 'react';

// import { GenderSearchTraits, GenderTraits } from '../../temp/models/BerndUserTraits';

import { Button, Box, Typography } from '@mui/material';
import SignInComponent from 'components/SignInComponent';
import RegisterComponent from 'components/RegisterComponent';
import { ArrowBack } from '@mui/icons-material';

const steps = ['', '', ''];
export interface IRegisterComponentProps {}

// const defaultOptions = [
//     { key: GenderTraits.MALE, text: 'Männlich' },
//     { key: GenderTraits.FEMALE, text: 'Weiblich' },
// ];

// const genderSearchOptions = [
//     { key: GenderSearchTraits.MALE, text: 'Männer' },
//     { key: GenderSearchTraits.FEMALE, text: 'Frauen' },
// ];

export const RegisterationStepper = memo((props: IRegisterComponentProps) => {
    const [activeStep, setActiveStepS] = React.useState(1);
    // const [selectedZip, setSelectedZip] = useState<string | undefined>(undefined);

    // const [optIn, setOptIn] = useState<boolean>(false);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStepS(newActiveStep);
        console.log(activeStep);
    };

    const handleBack = () => {
        setActiveStepS((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStepS(step);
    };

    // const handleComplete = () => {
    //     const newCompleted = completed;
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    //     handleNext();
    // };

    const handleReset = () => {
        setActiveStepS(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'white', p: 3, borderRadius: 4, boxShadow: '1px 3px  6px gray', position: 'relative', zIndex: 99 }}>
            <Typography color={'black'} pb={1} textAlign={'center'} fontWeight={'bold'}>
                Willkommen im Game!
            </Typography>
            <Stepper
                nonLinear
                activeStep={activeStep}
                alternativeLabel
                sx={{
                    mb: 1.5,
                }}
            >
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton onClick={handleStep(index)}>{label}</StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {activeStep === 0 ? (
                            <SignInComponent handleNextStep={handleNext} />
                        ) : (
                            <RegisterComponent activeStepS={activeStep} setActiveStepS={setActiveStepS} />
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, color: 'black' }}>
                                <ArrowBack
                                    fontSize="large"
                                    sx={{
                                        color: 'black',
                                    }}
                                />
                                Schon Mitglied? Hier einloggen!
                            </Button>

                            {activeStep !== steps.length && completed[activeStep] && (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                    Step {activeStep + 1} already completed
                                </Typography>
                            )}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
});
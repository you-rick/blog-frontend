import React from "react";

import AccountForm from "./AccountForm/AccountForm";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";
import CategoriesForm from "./CategoriesForm/CategoriesForm";
import {Box, Container, Stepper, Step, StepLabel, Button, Card, CardContent} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Create Account', 'Personal Information', 'Topics'];

const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <AccountForm/>;
        case 1:
            return <PersonalInfoForm/>;
        case 2:
            return <CategoriesForm/>;
        default:
            throw new Error('Step does not exist');
    }
};

const Register = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Box m="6rem 0">
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>Back</Button>)}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </React.Fragment>
                    </CardContent>
                </Card>

            </Container>
        </Box>
    )
};


export default Register;

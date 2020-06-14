import React, {useState} from "react";
import {register} from "../../../store/profileReducer";
import {connect} from "react-redux";
import {reduxForm, change} from "redux-form";

import AccountForm from "./AccountForm/AccountForm";
import CategoriesForm from "./CategoriesForm/CategoriesForm";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";
import {Box, Container, Stepper, Step, StepLabel, Card, CardContent} from "@material-ui/core";
import {objectToFormData} from "../../../utils/helpers/object-helpers";


const steps = ['Create Account', 'Personal Information', 'Topics'];


const RegisterForm = (props) => {
    const {onSubmit} = props;
    const [activeStep, setActiveStep] = useState(0);
    const [imagePreview, setImagePreview] = useState('');

    const fileChange = ((file, preview) => {
        //props.dispatch(change('register', 'photo', file));
        setImagePreview(preview);
    });

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
                        <Stepper alternativeLabel activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {activeStep === 0 && <AccountForm onSubmit={handleNext}/>}
                        {activeStep === 1 &&
                        <PersonalInfoForm
                            previousPage={handleBack}
                            onSubmit={handleNext}
                            onFileChange={fileChange}
                            preview={imagePreview}
                        />}
                        {activeStep === 2 && <CategoriesForm previousPage={handleBack} onSubmit={onSubmit}/>}
                    </CardContent>
                </Card>

            </Container>
        </Box>
    )
};

const Register = (props) => {
    const onSubmit = (data) => {
        const formData = objectToFormData(data);
        console.log(data);
        //props.register(formData);
    };

    return <RegisterForm onSubmit={onSubmit}/>;
};


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {register})(Register);

import React, {useState, useEffect} from "react";
import {register} from "../../../store/profileReducer";
import {connect} from "react-redux";
import {reduxForm, change} from "redux-form";
import Preloader from "../../shared/Preloader/Preloader";

import AccountForm from "./AccountForm/AccountForm";
import CategoriesForm from "./CategoriesForm/CategoriesForm";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";
import RegisterSuccess from "./RegisterSuccess/RegisterSuccess";
import {Box, Container, Stepper, Step, StepLabel, Card, CardContent} from "@material-ui/core";
import {objectToFormData} from "../../../utils/helpers/object-helpers";


const steps = ['Create Account', 'Personal Information', 'Topics'];


const RegisterForm = (props) => {
    const {onSubmit, categories} = props;
    const [activeStep, setActiveStep] = useState(0);
    const [imagePreview, setImagePreview] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        if (props.isSuccessNote && activeStep !== 0) {
            setActiveStep(3);
        }
    }, [props]);

    useEffect(() => {
        setCategoriesList(categories);
    }, [categories]);

    const fileChange = ((file, preview) => {
        setImagePreview(preview);
        console.log(preview);
    });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Box m="6rem 0">
            {props.isFetching && <Preloader/>}
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

                        {activeStep === 0 &&
                        <AccountForm
                            onSubmit={handleNext}/>}
                        {activeStep === 1 &&
                        <PersonalInfoForm
                            previousPage={handleBack}
                            onSubmit={handleNext}
                            onFileChange={fileChange}
                            preview={imagePreview}
                        />}
                        {activeStep === 2 &&
                        <CategoriesForm
                            categories={categoriesList}
                            previousPage={handleBack}
                            onSubmit={onSubmit}/>}
                        {activeStep === 3 &&
                        <RegisterSuccess/>
                        }
                    </CardContent>
                </Card>

            </Container>
        </Box>
    )
};

const Register = (props) => {
    const onSubmit = (data) => {
        props.register(objectToFormData(data));
    };

    return <RegisterForm onSubmit={onSubmit} categories={props.categories} isFetching={props.isFetching} isSuccessNote={props.isSuccessNote}/>;
};


const mapStateToProps = (state) => ({
    isFetching: state.profile.isFetching,
    isErrorNote: state.notification.error,
    isSuccessNote: state.notification.success,
    categories: state.categories.list
});

export default connect(mapStateToProps, {register})(Register);

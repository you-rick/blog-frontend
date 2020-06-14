import React from "react";
import {Box, Button, Grid, TextField} from "@material-ui/core";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import validate from "../validate";
import {renderTextField} from "../../../shared/FormControls/FormControls";

const AccountForm = (props) => {
    console.log(props);
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Field name="fullName" label="Full Name" fullWidth={true}
                           component={renderTextField}/>
                </Grid>
                <Grid item xs={12}>
                    <Field name="email" label="Email Address" fullWidth={true}
                           component={renderTextField}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field name="password" label="Password" type="password" fullWidth={true}
                           component={renderTextField}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field name="repeatPassword" label="Repeat password" type="password" fullWidth={true}
                           component={renderTextField}/>
                </Grid>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type="submit">Next</Button>
                </Grid>
            </Grid>
        </form>
    )
};

export default reduxForm({
    form: 'register', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    initialValues: {
        photo: {}
    },
    validate
})(AccountForm);



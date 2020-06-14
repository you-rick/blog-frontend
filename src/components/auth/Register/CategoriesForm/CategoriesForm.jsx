import React from "react";
import {Button, Grid} from "@material-ui/core";
import {checkboxGroup} from "../../../shared/FormControls/FormControls";
import {Field, reduxForm} from "redux-form";
import validate from "../validate";


const CategoriesForm = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;

    const [categories, setCategories] = React.useState([
        {id: 0, name: 'Coronavirus Updates'},
        {id: 1, name: 'Photography'},
        {id: 2, name: 'Design'},
        {id: 3, name: 'Remote Work'},
        {id: 4, name: 'Business'},
        {id: 5, name: 'Beauty'},
        {id: 6, name: 'Books'},
        {id: 7, name: 'Travelling'},
        {id: 8, name: 'IT Industry'},
        {id: 9, name: 'Health'},
        {id: 10, name: 'Food'},
        {id: 11, name: 'Gaming'},
        {id: 12, name: 'Fashion'},
        {id: 13, name: 'Music'},
        {id: 15, name: 'Family'}
    ]);


    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center">
                <Field name="categories" component={checkboxGroup} options={categories}/>
            </Grid>
            <Grid container justify="flex-end">
                <Button type="button" onClick={previousPage}>Back</Button>
                <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting}>Next</Button>
            </Grid>
        </form>
    )
};

export default reduxForm({
    form: 'register', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(CategoriesForm);

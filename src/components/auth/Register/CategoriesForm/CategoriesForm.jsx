import React, {useState, useEffect} from "react";
import {Button, Grid} from "@material-ui/core";
import {checkboxGroup} from "../../../shared/FormControls/FormControls";
import {Field, reduxForm} from "redux-form";
import validate from "../validate";


const CategoriesForm = (props) => {
    const { handleSubmit, pristine, previousPage, submitting, categories } = props;

    const [categoriesList, setCategoriesList] = useState(categories);

    useEffect(() => {
        setCategoriesList(categories);
    }, [categories]);


    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center">
                <Field name="categories" component={checkboxGroup} options={categoriesList}/>
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

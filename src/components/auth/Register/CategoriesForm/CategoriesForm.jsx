import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { checkboxGroup } from '../../../shared/FormControls/FormControls';
import validate from '../validate';

const CategoriesForm = ({ handleSubmit, pristine, previousPage, submitting, categories }) => {
  const [categoriesList, setCategoriesList] = useState(categories);

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center">
        <Field name="categories" component={checkboxGroup} options={categoriesList} />
      </Grid>
      <Grid container justify="flex-end">
        <Button type="button" onClick={previousPage}>Back</Button>
        <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting}>Next</Button>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CategoriesForm);

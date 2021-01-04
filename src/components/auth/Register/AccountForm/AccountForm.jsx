import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

import validate from '../validate';
import { renderTextField } from '../../../shared/FormControls/FormControls';

const AccountForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Field name="fullName" label="Full Name" fullWidth component={renderTextField} />
      </Grid>
      <Grid item xs={12}>
        <Field name="email" label="Email Address" fullWidth component={renderTextField} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field name="password" label="Password" type="password" fullWidth component={renderTextField} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field name="repeatPassword" label="Repeat password" type="password" fullWidth component={renderTextField} />
      </Grid>

      <Grid container justify="flex-end">
        <Box m="2rem 0.5rem 0.5rem">
          <Button variant="contained" color="primary" type="submit">Next</Button>
        </Box>
      </Grid>

    </Grid>
  </form>
);

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    photo: {},
  },
  validate,
})(AccountForm);

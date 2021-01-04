import React from 'react';
import ImageUploading from 'react-images-uploading';
import './PersonalInfoForm.scss';
import { Button, Grid, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { change, Field, reduxForm } from 'redux-form';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Alert } from '@material-ui/lab';
import { renderTextField } from '../../../shared/FormControls/FormControls';
import validate from '../validate';

const maxNumber = 1;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

const PersonalInfoForm = ({ handleSubmit, previousPage, dispatch, onFileChange, preview }) => {
  const onDrop = (image) => {
    if (image.length) {
      dispatch(change('register', 'photo', image[0].file));
      onFileChange(image[0].file, image[0].dataURL);
    } else {
      dispatch(change('register', 'photo', {}));
      onFileChange({}, '');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <ImageUploading
            onChange={onDrop}
            maxNumber={maxNumber}
            maxFileSize={maxMbFileSize}
            defaultValue={preview && [{ dataURL: preview }]}
            acceptType={['jpg', 'jpeg', 'JPG', 'JPEG', 'gif', 'png']}
          >
            {({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
              <div>
                <Grid container alignItems="center" justify="center">
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={onImageUpload}
                  >
                    Add photo
                  </Button>
                </Grid>
                {imageList.map((image) => (
                  <div key={image.key} className="imagePreviewWrap">
                    <div
                      className="imagePreview"
                      style={{ backgroundImage: `url(${image.dataURL})` }}
                    />
                    <IconButton
                      color="secondary"
                      className="removePreview"
                      type="button"
                      onClick={onImageRemoveAll}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                <div style={{ marginTop: 10 }}>
                  {errors.acceptType
                  && (
                  <Alert severity="error" variant="outlined">
                    Selected file type is not allowed
                  </Alert>
                  )}
                  {errors.maxFileSize
                  && (
                  <Alert severity="error" variant="outlined">
                    File is too big. Maximum file size 5mb
                  </Alert>
                  )}
                </div>
              </div>
            )}
          </ImageUploading>
        </Grid>
        <Grid item xs={12}>
          <Box m="3rem 0 0">
            <Field
              name="about"
              label="A few words about you"
              type="password"
              rows={4}
              rowsMax={8}
              multiline
              fullWidth
              component={renderTextField}
            />

          </Box>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Box m="2rem 0 0">
          <Grid container justify="flex-end">
            <Button type="button" onClick={previousPage}>Back</Button>
            <Button variant="contained" color="primary" type="submit">Next</Button>
          </Grid>
        </Box>

      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(PersonalInfoForm);

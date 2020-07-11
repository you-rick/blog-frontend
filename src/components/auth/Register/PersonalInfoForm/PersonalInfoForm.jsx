import React from "react";
import ImageUploading from "react-images-uploading";
import "./PersonalInfoForm.scss";
import {Button, Grid, IconButton} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {change, Field, reduxForm} from "redux-form";
import validate from "../validate";
import {renderTextField} from "../../../shared/FormControls/FormControls";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const maxNumber = 1;
const maxMbFileSize = 4 * 1024 * 1024; // 5Mb

const PersonalInfoForm = (props) => {

    const { handleSubmit, previousPage } = props;

    const onDrop = (image) => {
        console.log(image);
        image.length && props.dispatch(change('register', 'photo', image[0].file));
        image.length && props.onFileChange(image[0].file, image[0].dataURL);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <ImageUploading
                        onChange={onDrop}
                        maxNumber={maxNumber}
                        maxFileSize={maxMbFileSize}
                        defaultValue={props.preview && [{dataURL: props.preview}]}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {({imageList, onImageUpload, onImageRemoveAll}) => (
                            // write your building UI
                            <div>
                                <Grid container alignItems="center" justify="center">
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<CloudUploadIcon/>}
                                        onClick={onImageUpload}
                                    >
                                        Add photo
                                    </Button>
                                </Grid>
                                {imageList.map((image) => (
                                    <div key={image.key} className="imagePreviewWrap">
                                        <div
                                            className="imagePreview"
                                            style={{backgroundImage: `url(${image.dataURL})`}}>

                                        </div>
                                        <IconButton
                                            color="secondary"
                                            className="removePreview"
                                            type="button"
                                            onClick={onImageRemoveAll
                                            }>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </Grid>
                <Grid item xs={12}>
                    <Box m="3rem 0 0">
                        <Field name="about"
                               label="A few words about you"
                               type="password"
                               rows={4}
                               rowsMax={8}
                               multiline={true}
                               fullWidth={true}
                               component={renderTextField}
                        />

                    </Box>
                </Grid>
            </Grid>
            <Grid container justify="flex-end">
                <Button type="button" onClick={previousPage}>Back</Button>
                <Button variant="contained" color="primary" type="submit">Next</Button>
            </Grid>
        </form>
    );
};

export default reduxForm({
    form: 'register', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(PersonalInfoForm);


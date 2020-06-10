import React from "react";
import ImageUploader from "react-images-upload";
import "./PersonalInfoForm.scss";
import {TextField, Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const PersonalInfoForm = (props) => {
    const [pictures, setPictures] = React.useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <ImageUploader
                    {...props}
                    className="customFileUploader"
                    name="photo"
                    withIcon={true}
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage={true}
                    withPreview={true}
                    buttonClassName="fileUploadButton"
                />
            </Grid>
            <Grid item xs={12}>
                <Box m="3rem 0 0">
                    <TextField
                        label="A few words about you"
                        name="about"
                        multiline
                        rows={4}
                        rowsMax={8}
                        fullWidth
                    />
                </Box>
            </Grid>
        </Grid>

    );
};


export default PersonalInfoForm;

import React, {useState} from "react";
import TextEditor from "mui-rte";
import "./ArticleForm.scss";
import {EditorState, convertToRaw} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import ImageUploading from "react-images-uploading";
import {connect} from "react-redux";
import validate from "./validate";
import {change, reduxForm, Field} from "redux-form";
import {renderTextField, renderSelectField} from "../../../shared/FormControls/FormControls";
import {Box, Container, Card, CardContent, TextField, MenuItem, Grid, Button} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'


const bodyField = ({input, label, type, meta: {touched, error}}) => (
    <input {...input} placeholder={label} type="hidden" className={touched && error ? 'bodyFieldError' : ''}/>
);

const maxNumber = 1;
const maxMbFileSize = 4 * 1024 * 1024; // 5Mb

const ArticleForm = (props) => {
    const defaultTheme = createMuiTheme();
    const {handleSubmit} = props;

    const [imagePreview, setImagePreview] = useState('');
    const [category, setCategory] = useState('');
    const [postBody, setPostBody] = useState('');

    const onDrop = (image) => {
        console.log(image);
        image.length && props.dispatch(change('articleForm', 'image', image[0].file));
        image.length && setImagePreview(image[0].dataURL);
    };

    const editorChange = (state) => {
        let content = state.getCurrentContent();

        // Get current content
        if (content.getPlainText().length) {
            setPostBody(JSON.stringify(stateToHTML(content)));
        } else {
            setPostBody('');
        }
    };

    const editorBlur = () => {
        props.dispatch(change('articleForm', 'body', postBody));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    Object.assign(defaultTheme, {
        overrides: {
            MUIRichTextEditor: {
                root: {},
                editorContainer: {
                    padding: '1rem 1rem 0'
                },
                editor: {
                    minHeight: '500px'
                }
            }
        }
    });

    return (
        <Container maxWidth="md">
            <h1>Create new post</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="category"
                    label="Select Category"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={category}
                    onChange={handleCategoryChange}
                    component={renderSelectField}
                >
                    {props.categories.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </Field>

                <Field
                    name="title"
                    label="Post title"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    component={renderTextField}
                />

                <Field
                    name="description"
                    label="Short Description"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    component={renderTextField}
                />

                <Box m="1.5rem 0 0">
                    <ImageUploading
                        onChange={onDrop}
                        maxNumber={maxNumber}
                        maxFileSize={maxMbFileSize}
                        defaultValue={imagePreview && [{dataURL: imagePreview}]}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {({imageList, onImageUpload, onImageRemoveAll}) => (
                            // write your building UI
                            <div>
                                <button type="button" onClick={onImageUpload}>Upload images</button>
                                <button type="button" onClick={onImageRemoveAll}>Remove all images</button>

                                {imageList.map((image) => (
                                    <div key={image.key}>
                                        <img src={image.dataURL} className="imagePreview" alt="Preview"/>
                                        <button type="button" onClick={image.onUpdate}>Update</button>
                                        <button type="button" onClick={image.onRemove}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </Box>
                <Box m="1.5rem 0">
                    <Card>
                        <CardContent>
                            <Field name="body" component={bodyField} value={postBody}/>
                            <Box className="articleBodyEditor">
                                <MuiThemeProvider theme={defaultTheme}>
                                    <TextEditor
                                        label="Post content..."
                                        onChange={editorChange}
                                        onBlur={editorBlur}
                                        controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote"]}
                                    />
                                </MuiThemeProvider>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Grid container justify="flex-end">
                    <Button variant="contained" type="submit" size="large" color="primary">
                        Post!
                    </Button>
                </Grid>
            </form>
        </Container>
    )
};


const ArticleReduxForm = reduxForm({
    form: 'articleForm',
    validate,
    initialValues: {
        image: {},
        body: ''
    }
})(ArticleForm);


const ArticleFormContainer = (props) => {
    const [bodyError, setBodyError] = useState(null);
    const onSubmit = (data) => {
        if (!data.body.length) {
            setBodyError('Required Field');
        } else {
            setBodyError(null);
            console.log(data);
        }
    };

    return <ArticleReduxForm onSubmit={onSubmit} bodyError={bodyError} categories={props.categories}/>
};


const mapStateToProps = (state) => ({
    categories: state.categories.list
});


export default connect(mapStateToProps, {})(ArticleFormContainer);

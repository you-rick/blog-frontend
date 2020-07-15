import React, {useEffect, useState} from "react";
import TextEditor from "mui-rte";
import "./ArticleForm.scss";
import {objectToFormData} from "../../../../utils/helpers/object-helpers";
import {stateToHTML} from "draft-js-export-html";
import {convertFromHTML, ContentState, convertToRaw} from "draft-js";
import ImageUploading from "react-images-uploading";
import {connect} from "react-redux";
import {postArticle, updateArticle, requestArticleBySlug} from "../../../../store/articlesReducer";
import validate from "./validate";
import {change, reduxForm, touch, Field} from "redux-form";
import {renderTextField, renderSelectField} from "../../../shared/FormControls/FormControls";
import {Box, Container, Card, CardContent, MenuItem, Grid, Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import {Alert} from "@material-ui/lab";


const bodyField = ({input, label, type, meta: {touched, error}}) => (
    <div className={touched && error ? 'bodyFieldError' : ''}>
        <div className="bodyFieldErrorMsg">{touched && error && <span>{error}</span>}</div>
        <input {...input} placeholder={label} type="hidden"/>

    </div>

);

const maxNumber = 1;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
const baseUrl = process.env.REACT_APP_SERVER_URL;


const ArticleForm = (props) => {
    const defaultTheme = createMuiTheme();
    const {handleSubmit, article, editMode} = props;

    const [imagePreview, setImagePreview] = useState('');
    const [category, setCategory] = useState('');
    const [postBody, setPostBody] = useState('');
    const [defaultPostBody, setDefaultPostBody] = useState(null);

    useEffect(() => {
        if (article && editMode) {
            props.initialize(
                {
                    _id: article._id,
                    category: article.category,
                    title: article.title,
                    description: article.description,
                    content: article.content,
                    previewImage: article.image
                }
            );
            article.image && setImagePreview(baseUrl + '' + article.image);

            const contentHTML = convertFromHTML(article.content || "");
            const editorState = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
            setDefaultPostBody(JSON.stringify(convertToRaw(editorState)));
        } else {
            props.reset();
        }
    }, [article]);


    const onDrop = (image) => {
        props.dispatch(change('articleForm', 'image', image.length ? image[0].file : null));
        props.dispatch(change('articleForm', 'previewImage', image.length ? image[0].dataURL.length : ''));
        setImagePreview(image.length ? image[0].dataURL : '');
        setTimeout(() => {
            props.dispatch(touch('articleForm', 'previewImage'));
        }, 100);
    };

    const editorChange = (state) => {
        let content = state.getCurrentContent();
        setPostBody(content.getPlainText().length ? stateToHTML(content) : '');
    };

    const editorBlur = () => {
        props.dispatch(change('articleForm', 'content', postBody));
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
            <h1>{editMode ? 'Update' : 'Create new'} post</h1>
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

                <Box m="1.5rem 0 0" className="imageUploadWrap">
                    <Field name="previewImage" component={bodyField} value={imagePreview.length}/>
                    <ImageUploading
                        key={imagePreview}
                        onChange={onDrop}
                        maxNumber={maxNumber}
                        maxFileSize={maxMbFileSize}
                        defaultValue={imagePreview && [{dataURL: imagePreview}]}
                        acceptType={["jpg", "jpeg", "gif", "png"]}
                    >
                        {({imageList, onImageUpload, onImageRemoveAll, errors}) => (
                            <div>
                                <Grid container alignItems="center" justify="center">
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<CloudUploadIcon/>}
                                        onClick={onImageUpload}
                                    >
                                        Add image
                                    </Button>
                                </Grid>

                                {imageList.map((image) => (
                                    <Grid container alignItems="center" justify="center" key={image.key}
                                          style={{marginTop: 12}}>
                                        <img src={image.dataURL} className="postImagePreview" alt="Preview"/>
                                        <IconButton color="secondary" className="removePreview" type="button"
                                                    onClick={onImageRemoveAll}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Grid>
                                ))}
                                <div style={{marginTop: 10}}>
                                    {errors.acceptType &&
                                    <Alert severity="error" variant="outlined">
                                        Selected file type is not allowed
                                    </Alert>
                                    }
                                    {errors.maxFileSize &&
                                    <Alert severity="error" variant="outlined">
                                        File is too big. Maximum file size 5mb
                                    </Alert>
                                    }
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                </Box>
                <Box m="1.5rem 0">
                    <Card>
                        <CardContent>
                            <Field name="content" component={bodyField} value={postBody}/>
                            <Box className="articleBodyEditor">
                                <MuiThemeProvider theme={defaultTheme}>
                                    <TextEditor
                                        value={defaultPostBody}
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
                        {editMode ? 'Update!' : 'Post!'}
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
        content: '',
        previewImage: ''
    }
})(ArticleForm);


const ArticleFormContainer = (props) => {
    const {slug} = useParams();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (slug) {
            props.requestArticleBySlug(slug);
            setEditMode(true);
        }
    }, []);


    const onSubmit = (data) => {
        if (slug) {
            props.updateArticle(objectToFormData(data));
        } else {
            props.postArticle(objectToFormData(data));
        }

    };

    return <ArticleReduxForm
        onSubmit={onSubmit}
        article={props.article}
        editMode={editMode}
        categories={props.categories}
    />
};


const mapStateToProps = (state) => ({
    article: state.articles.currentArticle,
    categories: state.categories.list
});


export default connect(
    mapStateToProps, {
        postArticle,
        updateArticle,
        requestArticleBySlug
    }
)(ArticleFormContainer);

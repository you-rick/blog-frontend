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
import {change, reduxForm, Field, reset} from "redux-form";
import {renderTextField, renderSelectField} from "../../../shared/FormControls/FormControls";
import {Box, Container, Card, CardContent, MenuItem, Grid, Button} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';


const bodyField = ({input, label, type, meta: {touched, error}}) => (
    <input {...input} placeholder={label} type="hidden" className={touched && error ? 'bodyFieldError' : ''}/>
);

const maxNumber = 1;
const maxMbFileSize = 4 * 1024 * 1024; // 5Mb
const baseUrl = process.env.REACT_APP_SERVER_URL;

const ArticleForm = (props) => {
    const defaultTheme = createMuiTheme();
    const {handleSubmit, article, editMode} = props;

    const [imagePreview, setImagePreview] = useState('');
    const [category, setCategory] = useState('');
    const [postBody, setPostBody] = useState('');
    const [defaultPostBody, setDefaultPostBody] = useState(null);

    useEffect(() => {
        console.log(article, editMode);
        if (article && editMode) {
            console.log(article);
            props.initialize(
                {
                    _id: article._id,
                    category: article.category,
                    title: article.title,
                    description: article.description,
                    content: article.content
                }
            );
            article.image && setImagePreview(baseUrl + '' +article.image);

            const contentHTML = convertFromHTML(article.content || "");
            const editorState = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
            setDefaultPostBody(JSON.stringify(convertToRaw(editorState)));
        } else {
            props.reset();
        }
    }, [article]);

    const onDrop = (image) => {
        console.log(image);
        image.length && props.dispatch(change('articleForm', 'image', image[0].file));
        image.length && setImagePreview(image[0].dataURL);
    };

    const editorChange = (state) => {
        let content = state.getCurrentContent();

        // Get current content
        if (content.getPlainText().length) {
            setPostBody(stateToHTML(content));
        } else {
            setPostBody('');
        }
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
                        key={imagePreview}
                        onChange={onDrop}
                        maxNumber={maxNumber}
                        maxFileSize={maxMbFileSize}
                        defaultValue={imagePreview && [{dataURL: imagePreview}]}
                        acceptType={["jpg", "jpeg", "gif", "png"]}
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
        content: ''
    }
})(ArticleForm);


const ArticleFormContainer = (props) => {
    const {slug} = useParams();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (slug) {
            props.requestArticleBySlug(slug);
            setEditMode(true);
            console.log(props.article);
        }
    }, []);


    const onSubmit = (data) => {
        console.log(data);

        if (slug) {
            props.updateArticle(objectToFormData(data));
        } else {
             props.postArticle(objectToFormData(data));
        }

    };

    return <ArticleReduxForm onSubmit={onSubmit} article={props.article} editMode={editMode} categories={props.categories}/>
};


const mapStateToProps = (state) => ({
    article: state.articles.currentArticle,
    categories: state.categories.list
});


export default connect(mapStateToProps, {postArticle, updateArticle, requestArticleBySlug})(ArticleFormContainer);

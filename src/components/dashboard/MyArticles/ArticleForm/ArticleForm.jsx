import React from "react";
import TextEditor from "mui-rte";
import "./ArticleForm.scss";
import classNames from "classnames";
import ImageUploader from "react-images-upload";
import {Box, Container, Card, CardContent, TextField, MenuItem} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'


const categories = [
    {value: 0, label: 'Coronavirus Updates'},
    {value: 1, label: 'Photography'},
    {value: 2, label: 'Design'},
    {value: 3, label: 'Remote Work'},
    {value: 4, label: 'Business'},
    {value: 5, label: 'Beauty'},
    {value: 6, label: 'Books'},
    {value: 7, label: 'Travelling'},
    {value: 8, label: 'IT Industry'},
    {value: 9, label: 'Health'},
    {value: 10, label: 'Food'},
    {value: 11, label: 'Gaming'},
    {value: 12, label: 'Fashion'},
    {value: 13, label: 'Music'},
    {value: 14, label: 'Design'},
    {value: 15, label: 'Family'}
];

const ArticleForm = () => {

    const defaultTheme = createMuiTheme();

    const [pictures, setPictures] = React.useState([]);
    const [category, setCategory] = React.useState('');

    const onDrop = picture => {
        setPictures([...pictures, picture]);
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

            <TextField
                select
                label="Select Category"
                value={category}
                onChange={handleCategoryChange}
                variant="outlined"
                fullWidth
                margin="normal"
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField label="Post title" variant="outlined" margin="normal" fullWidth/>
            <Box m="1.5rem 0 0">
                <ImageUploader
                    className={classNames('customFileUploader', 'postPhoto')}
                    name="photo"
                    withIcon={true}
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage={true}
                    withPreview={true}
                    buttonClassName="fileUploadButton"
                />
            </Box>
            <Box m="1.5rem 0 0">
                <Card>
                    <CardContent>
                        <MuiThemeProvider theme={defaultTheme}>
                            <TextEditor
                                label="Post content goes here..."
                                controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote"]}
                            />
                        </MuiThemeProvider>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
};


export default ArticleForm;

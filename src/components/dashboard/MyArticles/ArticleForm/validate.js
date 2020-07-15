const validate = values => {
    const errors = {};
    if (!values.category) {
        errors.category = 'Required field'
    }

    if (!values.title) {
        errors.title = 'Required field'
    } else if (values.title.length > 200) {
        errors.title = 'Must be 200 characters or less';
    }

    if (!values.description) {
        errors.description = 'Required field'

    } else if (values.description.length > 200) {
        errors.description = 'Must be 200 characters or less';
    }
    if (!values.content) {
        errors.content = 'Required field'
    }
    if (!values.previewImage) {
        errors.previewImage = 'Image is required';
    }
    
    return errors
};

export default validate;

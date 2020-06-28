const validate = values => {
    const errors = {};
    if (!values.category) {
        errors.category = 'Required field'
    }

    if (!values.title) {
        errors.title = 'Required field'
    }

    if (!values.description) {
        errors.description = 'Required field'
    }
    if (!values.body) {
        errors.body = 'Required field'
    }



    return errors
};

export default validate;

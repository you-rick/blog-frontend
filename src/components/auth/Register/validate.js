const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Required field';
  }
  if (!values.email) {
    errors.email = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password || values.password.length < 5) {
    errors.password = 'Password should be at least 4 digits';
  }
  if (!values.repeatPassword || values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Passwords should match';
  }

  if (!values.about) {
    errors.about = 'Required field';
  }

  if (!values.categories || values.categories?.length === 0) {
    errors.categories = 'At least 1 category should be selected';
  }

  return errors;
};

export default validate;

import React, {useEffect} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Box, Container, Button, Grid, Link} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import validate from "./validate";
import {renderTextField} from "../../shared/FormControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../../store/profileReducer";

const LoginForm = (props) => {
    const {handleSubmit} = props;

    return (
        <Box m="6rem 0">
            <Container maxWidth="xs">
                <form onSubmit={handleSubmit}>
                    <Field
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Box m="1rem 0 0">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Sign In
                        </Button>
                    </Box>
                    <Box m="2rem 0 0">
                        <Grid container justify="center">
                            <Grid item>
                                <Link component={NavLink} to="/register"
                                      variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </Box>
    )
};

const LoginReduxForm = reduxForm({form: 'login', validate})(LoginForm);


const Login = (props) => {
    const onSubmit = (data) => {
        props.login(data);
    };

    useEffect(() => {
        console.log(props);
    }, [props]);

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <LoginReduxForm onSubmit={onSubmit}/>;
};

const mapStateToProps = (state) => ({
    isFetching: state.profile.isFetching,
    isAuth: state.profile.isAuth
});

export default connect(mapStateToProps, {login})(Login);



import React from "react";
import AuthorCard from "../../shared/AuthorCard/AuthorCard";
import {Box, Container} from "@material-ui/core";
import {connect} from "react-redux";


const Profile = (props) => {
    console.log(props);

    return (
        <Container maxWidth="md">
            <h1>hello!</h1>
            <Box m="1.5rem 0 0">
                <AuthorCard/>
            </Box>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    user: state.profile
})


export default connect(mapStateToProps,{})(Profile);

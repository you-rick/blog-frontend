import React, {useEffect} from "react";
import AuthorCard from "../../shared/AuthorCard/AuthorCard";
import {Box, Container} from "@material-ui/core";
import {connect} from "react-redux";
import {getProfile} from "../../../store/profileReducer";


const Profile = (props) => {
    useEffect(() => console.log('mounted'), []);

    return (
        <Container maxWidth="md">
            <h1>My Profile</h1>
            <Box m="1.5rem 0 0">
                <AuthorCard {...props.user}/>
            </Box>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    user: state.profile
});


export default connect(mapStateToProps,{getProfile})(Profile);

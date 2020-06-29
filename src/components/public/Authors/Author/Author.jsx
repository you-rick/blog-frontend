import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestUserById} from "../../../../store/usersReducer";
import {Container} from "@material-ui/core";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";

const Author = (props) => {
    let {id} = useParams();

    useEffect(() => {
        props.requestUserById(id);
    }, []);


    return (
        <Container maxWidth="md">
           <AuthorCard {...props.author} />
        </Container>
    );
};

const mapStateToProps = (state) => ({
    author: state.users.currentUser
});

export default connect(mapStateToProps, {requestUserById})(Author);

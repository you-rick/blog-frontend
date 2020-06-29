import React, {useEffect} from "react";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import {Container, List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {requestUsers} from "../../../../store/usersReducer";


const Authors = (props) => {
    console.log(props);

    useEffect(() => {
        props.requestUsers();
    }, []);


    return (
        <Container maxWidth="md">
            <List>
                {props.authors.map((author) => (
                    <ListItem key={author._id} disableGutters>
                        <AuthorCard key={author._id}  {...author} />
                    </ListItem>
                ))}
            </List>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    authors: state.users.list
});

export default connect(mapStateToProps, {requestUsers})(Authors);

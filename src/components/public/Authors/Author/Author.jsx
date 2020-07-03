import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestUserById} from "../../../../store/usersReducer";
import {requestArticles} from "../../../../store/articlesReducer";
import {Container, Box, List, ListItem, Typography} from "@material-ui/core";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";


const Author = (props) => {
    let {id} = useParams();

    useEffect(() => {
        if (id) {
            props.requestUserById(id);
            props.requestArticles(1, 10, id, '');
        }
    }, []);

    useEffect(() => {
        console.log(props.author);
    }, []);

    return (
        <Container maxWidth="md">
            {props.author._id && <AuthorCard {...props.author} />}

            <Box m="3rem 0 0">
                <h1>{props.author.fullName + "'s articles"}</h1>
                <List>
                    {props.articles.map((article) => (
                        <ListItem key={article._id} disableGutters>
                            <ArticleCard key={article._id} {...article}/>
                        </ListItem>
                    ))}

                    {!props.articles.length &&
                    <Typography variant="body2" color="textSecondary" component="p">
                        No articles yet
                    </Typography>
                    }
                </List>

            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    author: state.users.currentUser,
    articles: state.articles.list
});

export default connect(mapStateToProps, {requestUserById, requestArticles})(Author);

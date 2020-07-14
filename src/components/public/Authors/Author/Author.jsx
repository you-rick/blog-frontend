import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {NavLink, useParams} from 'react-router-dom';
import {requestUserById} from "../../../../store/usersReducer";
import {requestArticles} from "../../../../store/articlesReducer";
import {Container, Box, List, ListItem, Typography, Button, Grid} from "@material-ui/core";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import ArticleCardSkeleton from "../../../shared/ArticleCardSkeleton/ArticleCardSkeleton";
import AuthorCardSkeleton from "../../../shared/AuthorCardSkeleton/AuthorCardSkeleton";


const Author = (props) => {
    let {id} = useParams();
    const {profile} = props;
    const [showArticles, setShowArticles] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);

    useEffect(() => {
        if (id) {
            props.requestUserById(id);
            props.requestArticles(1, 10, id, '');
        }
        if (profile) {
            props.requestUserById(profile._id);
            props.requestArticles(1, 10, profile._id, '');
        }
    }, []);

    useEffect(() => {
        setShowArticles(true);
    }, [props.articles]);

    useEffect(() => {
        props.author._id && setShowAuthor(true);
    }, [props.author]);

    return (
        <Container maxWidth="md">
            {showAuthor && <AuthorCard {...props.author} detailed={!!profile}/>}
            {!showAuthor && <AuthorCardSkeleton/>}

            <Box m="3rem 0 0">
                {!profile && <h1>{props.author.fullName + "'s articles"}</h1>}
                {profile &&
                <Grid container justify="space-between" alignItems="center">
                    <h1>Your Articles</h1>
                    <Button
                        component={NavLink}
                        to="/profile/articles/add"
                        variant="contained"
                        color="primary">
                        Add Article
                    </Button>
                </Grid>

                }
                <List>
                    {showArticles && props.articles.map((article) => (
                        <ListItem key={article._id} disableGutters>
                            <ArticleCard key={article._id} {...article}/>
                        </ListItem>
                    ))}

                    {!showArticles && Array(3).fill().map((item, index) => (
                        <ListItem key={index} disableGutters>
                            <ArticleCardSkeleton/>
                        </ListItem>
                    ))}

                    {(!props.articles.length && !props.isDataFetching) &&
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
    articles: state.articles.list,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestUserById, requestArticles})(Author);

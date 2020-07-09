import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestUserById} from "../../../../store/usersReducer";
import {requestArticles} from "../../../../store/articlesReducer";
import {Container, Box, List, ListItem, Typography} from "@material-ui/core";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import ArticleCardSkeleton from "../../../shared/ArticleCardSkeleton/ArticleCardSkeleton";


const Author = (props) => {
    let {id} = useParams();
    const [showArticles, setShowArticles] = useState(false);

    useEffect(() => {
        if (id) {
            props.requestUserById(id);
            props.requestArticles(1, 10, id, '');
        }
    }, []);

    useEffect(() => {
        setShowArticles(true);
    }, [props.articles]);

    return (
        <Container maxWidth="md">
            {props.author._id && <AuthorCard {...props.author} />}

            <Box m="3rem 0 0">
                <h1>{props.author.fullName + "'s articles"}</h1>
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

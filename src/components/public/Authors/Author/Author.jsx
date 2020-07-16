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
import InfiniteScroll from "react-infinite-scroll-component";


const Author = (props) => {
    let {id} = useParams();
    const {profile, articles, author, totalArticles, isDataFetching} = props;
    const [showArticles, setShowArticles] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [step, setStep] = useState(10);

    useEffect(() => {
        if (id) {
            props.requestUserById(id);
            props.requestArticles(page, step, id, '', 0, '', '', 'Infinite');
            setPage(page + 1);
        }
        if (profile) {
            props.requestUserById(profile._id);
            props.requestArticles(page, step, profile._id, '', 0, '', '', 'Infinite');
            setPage(page + 1);
        }
    }, []);

    useEffect(() => {
        console.log(articles.length, totalArticles);
        setHasMore(articles.length < totalArticles);
    }, [articles, totalArticles]);

    useEffect(() => {
        (articles.length && !isDataFetching) && setShowArticles(true);
    }, [articles, isDataFetching]);

    useEffect(() => {
        author._id && setShowAuthor(true);
    }, [author]);


    const loadMore = () => {
        let userId = '';
        if (id) {
            userId = id;
        } else if (profile._id) {
            userId = profile._id;
        }

        props.requestArticles(page, step, userId, '', 0, '', '', 'Infinite');
        setPage(page + 1);
    };


    const articlesList = props.articles.map((article) => (
        <ListItem key={article._id} disableGutters>
            <ArticleCard key={article._id} {...article}/>
        </ListItem>
    ));


    const skeletonList = Array(3).fill().map((item, index) => (
        <ListItem key={index} disableGutters>
            <ArticleCardSkeleton/>
        </ListItem>
    ));

    return (
        <Container maxWidth="md">
            {showAuthor && <AuthorCard {...props.author} detailed={!!profile}/>}
            {!showAuthor && <AuthorCardSkeleton/>}

            <Box m="3rem 0 0">
                {!profile && <h1>{props.author.fullName + "'s articles"}</h1>}
                {profile &&
                <Grid container justify="space-between" alignItems="center">
                    <h1>Your Latest Articles</h1>
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
                    <InfiniteScroll
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<h4>Loading..</h4>}
                        dataLength={page * step}
                        endMessage={
                            totalArticles > 10 &&
                            <p style={{textAlign: 'center'}}>
                                <b>All articles loaded</b>
                            </p>
                        }
                    >
                        {showArticles ? articlesList : skeletonList}
                    </InfiniteScroll>
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
    totalArticles: state.articles.totalArticles,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestUserById, requestArticles})(Author);

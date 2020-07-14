import React, {useEffect, useState} from "react";
import {Box, Container, List, ListItem, Typography} from "@material-ui/core";
import ArticleCard from "../../shared/ArticleCard/ArticleCard";
import ArticleCardSkeleton from "../../shared/ArticleCardSkeleton/ArticleCardSkeleton";
import {connect} from "react-redux";
import {requestArticles} from "../../../store/articlesReducer";


const LikedArticles = (props) => {
    const {profile, articles} = props;
    const [showArticles, setShowArticles] = useState(false);

    useEffect(() => {
        profile._id && props.requestArticles(1, 10, '', '', 0, profile._id, '');
    }, [profile]);

    useEffect(() => {
        setShowArticles(true);
    }, [articles]);

    return (
        <Container maxWidth="md">
            <h1>Liked Articles</h1>

            <Box m="1.5rem 0 0">
                <List>
                    {showArticles && articles.map((article) => (
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
                        No liked articles yet
                    </Typography>
                    }
                </List>
            </Box>
        </Container>
    )
};


const mapStateToProps = (state) => ({
    articles: state.articles.list,
    profile: state.profile,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestArticles})(LikedArticles);

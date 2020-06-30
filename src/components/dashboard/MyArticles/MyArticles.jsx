import React, {useEffect} from "react";
import {Box, Container, List, ListItem, Grid, Button} from "@material-ui/core";
import ArticleCard from "../../shared/ArticleCard/ArticleCard";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {requestArticles} from "../../../store/articlesReducer";


const MyArticles = (props) => {
    useEffect(() => {
        props.requestArticles(1, 10, props.profileId, '');
        console.log(props.articles);
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container justify="space-between" alignItems="center">
                <h1>My Articles</h1>
                <Button
                    component={NavLink}
                    to="/profile/articles/add"
                    variant="contained"
                    color="primary">
                    Add Article
                </Button>
            </Grid>

            <Box m="1.5rem 0 0">
                <List>
                    {props.articles.map((article) => (
                        <ListItem key={article._id} disableGutters>
                            <ArticleCard key={article._id} {...article}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    )
};


const mapStateToProps = (state) => ({
    articles: state.articles.list,
    profileId: state.profile._id
});


export default connect(mapStateToProps, {requestArticles})(MyArticles);

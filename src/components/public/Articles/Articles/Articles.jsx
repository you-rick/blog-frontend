import React, {useEffect} from "react";
import {Container, Grid, Box, List, ListItem} from "@material-ui/core";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import {connect} from "react-redux";
import {requestArticles} from "../../../../store/articlesReducer";


const Articles = (props) => {
    console.log(props);

    useEffect(() => {
        props.requestArticles();
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="space-between">
                <Grid item xs={12} sm={9}>
                    <h1>{props.category ? props.category : 'Articles'}</h1>

                    <Box m="1.5rem 0 0" p="0 2rem 0 0">
                        <List>
                            {props.articles.map((article) => (
                                <ListItem key={article._id} disableGutters>
                                    <ArticleCard key={article._id} {...article}/>
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                </Grid>
                <Grid item xs={false} sm={3}>
                    <Sidebar/>
                </Grid>
            </Grid>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    articles: state.articles.list,
    category: state.categories.currentCategory
});

export default connect(mapStateToProps, {requestArticles})(Articles);

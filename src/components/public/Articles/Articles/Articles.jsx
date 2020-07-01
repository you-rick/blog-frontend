import React, {useEffect, useState} from "react";
import {Container, Grid, Box, List, ListItem, Typography} from "@material-ui/core";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import {connect} from "react-redux";
import {requestArticles} from "../../../../store/articlesReducer";
import {useParams} from 'react-router-dom';


const Articles = (props) => {
    const {slug} = useParams();
    const [category, setCategory] = useState('Articles');

    useEffect(() => {
        if (slug) {
            let ctg = props.categories.filter(el => el.slug === slug)[0];
            setCategory(ctg.title);
            props.requestArticles(1, 10, '', ctg._id);
        } else {
            props.requestArticles();
        }

    }, [slug]);


    useEffect(() => {
    }, [props.articles]);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="space-between">
                <Grid item xs={12} sm={9}>
                    <h1>{category}</h1>

                    <Box m="1.5rem 0 0" p="0 2rem 0 0">
                        <List>
                            {props.articles.map((article) => (
                                <ListItem key={article._id} disableGutters>
                                    <ArticleCard key={article._id} {...article}/>
                                </ListItem>
                            ))}

                            {!props.articles.length &&
                            <Typography variant="body2" color="textSecondary" component="p">
                                Sorry, no articles with this topic
                            </Typography>
                            }
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
    categories: state.categories.list
});

export default connect(mapStateToProps, {requestArticles})(Articles);

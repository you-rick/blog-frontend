import React, {useEffect} from "react";
import {Container, Box, Grid, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestArticleBySlug} from "../../../../store/articlesReducer";
import ReactHtmlParser from 'react-html-parser';


const Article = (props) => {
    let {slug} = useParams();

    useEffect(() => {
        props.requestArticleBySlug(slug);
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Typography component="h1" variant="h4" align="center" className="headline">
                    {props.article.title}
                </Typography>
                <Box m="3rem 0" alignItems="center">
                    <Grid container justify="center">
                        <img src={process.env.REACT_APP_SERVER_URL + props.article.image} alt={props.article.title} />
                    </Grid>
                </Box>
                <Typography variant="body1" component="div">
                    {ReactHtmlParser(props.article.content)}
                </Typography>
            </Container>
        </>
    )
};

const mapStateToProps = (state) => ({
    article: state.articles.currentArticle
});

export default connect(mapStateToProps, {requestArticleBySlug})(Article);

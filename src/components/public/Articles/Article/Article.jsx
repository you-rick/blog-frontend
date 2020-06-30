import React, {useEffect} from "react";
import {Container, Box, Grid, Typography, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestArticleBySlug} from "../../../../store/articlesReducer";
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import s from './Article.module.scss';
import {NavLink} from "react-router-dom";


const Article = (props) => {
    let {slug} = useParams();

    useEffect(() => {
        props.requestArticleBySlug(slug);
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography component="h1" variant="h4" align="center" className="headline">
                    {props.article.title}
                </Typography>
                {props.profileId === props.article.author &&
                  (
                    <IconButton
                        color="primary"
                        className={s.iconButton}
                        component={NavLink}
                        to={`/profile/articles/edit/${props.article.slug}`}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                  )
                }
            </Grid>

            <Box m="2rem 0 0 ">
                <Typography component="h6" variant="body1" align="center">
                    {props.article.description}
                </Typography>
            </Box>
            <Box m="3rem 0" alignItems="center">
                <Grid container justify="center">
                    <img src={process.env.REACT_APP_SERVER_URL + props.article.image} alt={props.article.title}/>
                </Grid>
            </Box>
            <Typography variant="body1" component="div">
                {ReactHtmlParser(props.article.content)}
            </Typography>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    article: state.articles.currentArticle,
    profileId: state.profile._id
});

export default connect(mapStateToProps, {requestArticleBySlug})(Article);

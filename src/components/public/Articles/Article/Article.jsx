import React, {useEffect, useState} from "react";
import {Container, Box, Grid, Typography, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestArticleBySlug} from "../../../../store/articlesReducer";
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import s from './Article.module.scss';
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import AuthorInfo from "./AuthorInfo/AuthorInfo";
import ArticleSkeleton from "./ArticleSkeleton/ArticleSkeleton";


const Article = (props) => {
    let {slug} = useParams();
    const {authorInfo, isDataFetching} = props;
    const [showArticle, setShowArticle] = useState(false);
    const [authorData, setAuthorData] = useState(authorInfo);

    useEffect(() => {
        props.requestArticleBySlug(slug);
    }, []);

    useEffect(() => {
        setAuthorData(authorInfo);
    }, [authorInfo]);

    useEffect(() => {
        props.article.title && setShowArticle(true);
    }, [props.article.title]);

    if (!showArticle || isDataFetching) return <ArticleSkeleton/>;

    return (
        <Container maxWidth="md">
            <Box className={s.articleHeader}>
                <Grid container>
                    <Typography component="h1" variant="h4" className="headline">
                        {props.article.title}
                    </Typography>
                    {props.profile._id === props.article.author &&
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
                    <Typography component="h6" variant="body1">
                        {props.article.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{marginTop: 6}}>
                        <Moment format="DD MMMM YYYY">
                            {props.date}
                        </Moment>
                    </Typography>

                </Box>

                {authorData && <Box m="2rem 0"><AuthorInfo {...authorData}/></Box>}
            </Box>

            <Box alignItems="center">
                <Grid container justify="center">
                    {props.article.image.length &&
                    <img src={process.env.REACT_APP_SERVER_URL + props.article.image} alt={props.article.title}/>
                    }
                </Grid>
            </Box>
            <Typography variant="body1" component="div" className={s.articleBody}>
                {ReactHtmlParser(props.article.content)}
            </Typography>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    article: state.articles.currentArticle,
    profile: state.profile,
    authorInfo: state.users.currentUser,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestArticleBySlug})(Article);

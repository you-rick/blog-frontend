import React, {useEffect, useState} from "react";
import {Container, Box, Grid, Typography, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {requestArticleBySlug} from "../../../../store/articlesReducer";
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import s from './Article.module.scss';
import {NavLink} from "react-router-dom";
import AuthorInfo from "./AuthorInfo/AuthorInfo";


const Article = (props) => {
    let {slug} = useParams();
    const {authorInfo} = props;
    const [authorData, setAuthorData] = useState(authorInfo);

    useEffect(() => {
        props.requestArticleBySlug(slug);
    }, []);

    useEffect(() => {
        setAuthorData(authorInfo);
    }, [props.authorInfo]);


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
    authorInfo: state.users.currentUser
});

export default connect(mapStateToProps, {requestArticleBySlug})(Article);

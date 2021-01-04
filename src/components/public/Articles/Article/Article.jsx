import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'react-moment';
import s from './Article.module.scss';
import { requestArticleBySlug } from '../../../../store/articlesReducer';

import AuthorInfo from './AuthorInfo/AuthorInfo';
import ArticleSkeleton from './ArticleSkeleton/ArticleSkeleton';

const Article = ({ authorInfo, isDataFetching, article, requestArticleBySlug, profile, date }) => {
  const { slug } = useParams();
  const [showArticle, setShowArticle] = useState(false);
  const [authorData, setAuthorData] = useState(authorInfo);

  useEffect(() => {
    requestArticleBySlug(slug);
  }, []);

  useEffect(() => {
    setAuthorData(authorInfo);
  }, [authorInfo]);

  useEffect(() => {
    article.title && setShowArticle(true);
  }, [article.title]);

  if (!showArticle && isDataFetching) return <ArticleSkeleton />;

  return (
    <Container maxWidth="md">
      <Box className={s.articleHeader}>
        <Grid container>
          <Typography component="h1" variant="h4" className="headline">
            {article.title}
          </Typography>
          {profile._id === article.author
          && (
            <IconButton
              color="primary"
              className={s.iconButton}
              component={NavLink}
              to={`/profile/articles/edit/${article.slug}`}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
        <Box m="2rem 0 0 ">
          <Typography component="h6" variant="body1">
            {article.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 6 }}>
            <Moment format="DD MMMM YYYY">
              {date}
            </Moment>
          </Typography>
        </Box>

        {authorData && <Box m="2rem 0"><AuthorInfo {...authorData} /></Box>}
      </Box>

      <Box alignItems="center">
        <Grid container justify="center">
          {article.image.length
          && <img src={process.env.REACT_APP_SERVER_URL + article.image} alt={article.title} />}
        </Grid>
      </Box>
      <Typography variant="body1" component="div" className={s.articleBody}>
        {ReactHtmlParser(article.content)}
      </Typography>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  article: state.articles.currentArticle,
  profile: state.profile,
  authorInfo: state.users.currentUser,
  isDataFetching: state.app.isDataFetching,
});

export default connect(mapStateToProps, { requestArticleBySlug })(Article);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Container, Box, List, ListItem, Typography, Button, Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { requestUserById } from '../../../../store/usersReducer';
import { requestArticles } from '../../../../store/articlesReducer';
import AuthorCard from '../../../shared/AuthorCard/AuthorCard';
import ArticleCard from '../../../shared/ArticleCard/ArticleCard';
import ArticleCardSkeleton from '../../../shared/ArticleCardSkeleton/ArticleCardSkeleton';
import AuthorCardSkeleton from '../../../shared/AuthorCardSkeleton/AuthorCardSkeleton';

const pageStep = 10;

const Author = ({ profile, articles, author, totalArticles, isDataFetching, requestUserById, requestArticles }) => {
  const { id } = useParams();
  const [showArticles, setShowArticles] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (id) {
      requestUserById(id);
      requestArticles(page, pageStep, id, '', 0, '', '', 'Infinite');
      setPage(page + 1);
    }
    if (profile) {
      requestUserById(profile._id);
      requestArticles(page, pageStep, profile._id, '', 0, '', '', 'Infinite');
      setPage(page + 1);
    }
  }, []);

  useEffect(() => {
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

    requestArticles(page, pageStep, userId, '', 0, '', '', 'Infinite');
    setPage(page + 1);
  };

  const articlesList = articles.map((article) => (
    <ListItem key={article._id} disableGutters>
      <ArticleCard key={article._id} {...article} />
    </ListItem>
  ));

  const skeletonList = Array(3).fill().map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={index} disableGutters>
      <ArticleCardSkeleton />
    </ListItem>
  ));

  return (
    <Container maxWidth="md">
      {showAuthor && <AuthorCard {...author} detailed={!!profile} />}
      {!showAuthor && <AuthorCardSkeleton />}

      <Box m="3rem 0 0">
        {showArticles && <h1>{`${author.fullName}'s articles`}</h1>}
        {profile
        && (
        <Grid container justify="space-between" alignItems="center">
          <h1>Your Latest Articles</h1>
          <Button
            component={NavLink}
            to="/profile/articles/add"
            variant="contained"
            color="primary"
          >
            Add Article
          </Button>
        </Grid>
        )}
        <List>
          <InfiniteScroll
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading..</h4>}
            dataLength={page * pageStep}
            endMessage={
              totalArticles > 10
              && (
              <p style={{ textAlign: 'center' }}>
                <b>All articles loaded</b>
              </p>
              )
            }
          >
            {showArticles ? articlesList : skeletonList}
          </InfiniteScroll>
          {(!articles.length && !isDataFetching)
          && (
          <Typography variant="body2" color="textSecondary" component="p">
            No articles yet
          </Typography>
          )}
        </List>

      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  author: state.users.currentUser,
  articles: state.articles.list,
  totalArticles: state.articles.totalArticles,
  isDataFetching: state.app.isDataFetching,
});

export default connect(mapStateToProps, { requestUserById, requestArticles })(Author);

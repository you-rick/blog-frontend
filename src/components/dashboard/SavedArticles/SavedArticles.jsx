import React, { useEffect, useState } from 'react';
import { Box, Container, List, ListItem, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ArticleCard from '../../shared/ArticleCard/ArticleCard';
import ArticleCardSkeleton from '../../shared/ArticleCardSkeleton/ArticleCardSkeleton';
import { requestArticles } from '../../../store/articlesReducer';

const SavedArticles = ({ profile, articles, isDataFetching, requestArticles }) => {
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    profile._id && requestArticles(1, 10, '', '', 0, '', profile._id);
  }, [profile]);

  useEffect(() => {
    setShowArticles(true);
  }, [articles]);

  return (
    <Container maxWidth="md">
      <h1>Saved Articles</h1>

      <Box m="1.5rem 0 0">
        <List>
          {showArticles && articles.map((article) => (
            <ListItem key={article._id} disableGutters>
              <ArticleCard key={article._id} {...article} />
            </ListItem>
          ))}
          {!showArticles && Array(3).fill().map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index} disableGutters>
              <ArticleCardSkeleton />
            </ListItem>
          ))}
          {(!articles.length && !isDataFetching)
          && (
          <Typography variant="body2" color="textSecondary" component="p">
            No saved articles yet
          </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.list,
  profile: state.profile,
  isDataFetching: state.app.isDataFetching,
});

export default connect(mapStateToProps, { requestArticles })(SavedArticles);

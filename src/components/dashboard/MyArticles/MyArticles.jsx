import React, { useEffect } from 'react';
import { Box, Container, List, ListItem, Grid, Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleCard from '../../shared/ArticleCard/ArticleCard';
import { requestArticles } from '../../../store/articlesReducer';

const MyArticles = ({ requestArticles, articles, profileId }) => {
  useEffect(() => {
    requestArticles(1, 10, profileId, '');
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container justify="space-between" alignItems="center">
        <h1>My Articles</h1>
        <Button
          component={NavLink}
          to="/profile/articles/add"
          variant="contained"
          color="primary"
        >
          Add Article
        </Button>
      </Grid>

      <Box m="1.5rem 0 0">
        <List>
          {articles.map((article) => (
            <ListItem key={article._id} disableGutters>
              <ArticleCard key={article._id} {...article} />
            </ListItem>
          ))}
          {!articles.length
          && (
            <Typography variant="body2" color="textSecondary" component="p">
              You don&apos;t have articles yet
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.list,
  profileId: state.profile._id,
});

export default connect(mapStateToProps, { requestArticles })(MyArticles);

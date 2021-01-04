import React, { useEffect, useState } from 'react';
import { Container, Grid, Hidden, withWidth } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { requestArticles } from '../../../store/articlesReducer';
import s from './Home.module.scss';
import Sidebar from '../../shared/Sidebar/Sidebar';
import ArticleCardHome from './ArticleCardHome/ArticleCardHome';
import ArticleCardHomeSkeleton from './ArticleCardHomeSkeleton/ArticleCardHomeSkeleton';

const breakpointColumns = {
  default: 3,
  1025: 2,
  500: 1,
};

const pageStep = 12;

const Home = ({ articles, totalArticles, isDataFetching, requestArticles }) => {
  const [showArticles, setShowArticles] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setShowArticles(false);
    requestArticles(page, pageStep, '', '', 0, '', '', 'Infinite');
    setPage(page + 1);
  }, []);

  useEffect(() => {
    setHasMore(articles.length < totalArticles);
  }, [articles, totalArticles]);

  useEffect(() => {
    (articles.length && !isDataFetching) && setShowArticles(true);
  }, [articles, isDataFetching]);

  const loadMore = () => {
    requestArticles(page, pageStep, '', '', 0, '', '', 'Infinite');
    setPage(page + 1);
  };

  const cards = articles.map((article, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ArticleCardHome key={index} {...article} />
  ));
  const cardsSkeleton = Array(9)
    .fill()
    .map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ArticleCardHomeSkeleton key={index} />
    ));

  return (
    <div style={{ padding: '0 20px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={12} md={9}>
            <InfiniteScroll
              next={loadMore}
              hasMore={hasMore}
              loader={<h4>Showing..</h4>}
              dataLength={page * pageStep}
              endMessage={(
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )}
            >
              <Masonry
                breakpointCols={breakpointColumns}
                className={s.masonryGrid}
                columnClassName={s.masonryGridColumn}
              >
                {showArticles ? cards : cardsSkeleton}
              </Masonry>
            </InfiniteScroll>

          </Grid>
          <Grid item md={3}>
            <Hidden smDown>
              <Sidebar />
            </Hidden>
          </Grid>
        </Grid>

      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  articles: state.articles.list,
  totalArticles: state.articles.totalArticles,
  isDataFetching: state.app.isDataFetching,
});

export default compose(
  withWidth(),
  connect(mapStateToProps, { requestArticles }),
)(Home);

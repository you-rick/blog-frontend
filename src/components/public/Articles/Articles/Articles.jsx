import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, List, ListItem, Typography, Hidden, withWidth } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { push } from 'connected-react-router';
import Sidebar from '../../../shared/Sidebar/Sidebar';
import ArticleCard from '../../../shared/ArticleCard/ArticleCard';
import ArticleCardSkeleton from '../../../shared/ArticleCardSkeleton/ArticleCardSkeleton';
import { requestArticles } from '../../../../store/articlesReducer';
import { setNote } from '../../../../store/notificationReducer';
import s from './Articles.module.scss';

const Articles = ({ categories, articles, requestArticles, setNote, pagesNumber, push, isDataFetching }) => {
  const { slug, page } = useParams();
  const [category, setCategory] = useState('Articles');
  const [totalPages, setTotalPages] = useState(1);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    setShowArticles(false);
    if (slug && categories.length) {
      const ctg = categories.filter((el) => el.slug === slug)[0];
      if (ctg) {
        setCategory(ctg.title);
        requestArticles(page || 1, 10, '', ctg._id);
      } else {
        setNote({ msg: `No category - ${slug}`, type: 'error' });
      }
    } else if (page) {
      requestArticles(page, 10, '', '');
    } else {
      setCategory('Articles');
      requestArticles();
    }
  }, [slug, page, categories]);

  useEffect(() => {
    setTotalPages(pagesNumber);
  }, [pagesNumber]);

  useEffect(() => {
    setTimeout(() => {
      articles.length && setShowArticles(true);
    }, 100);
  }, [articles]);

  const handlePageChange = (page) => {
    const pageNumber = page.selected === 0 ? '' : page.selected + 1;
    const slugParam = slug ? `${slug}/` : '';
    if (slug) {
      push(`/category/${slugParam}${pageNumber}`);
    } else {
      push(`/articles/${pageNumber}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} lg={9}>
          <h1>{category}</h1>

          <Box className={s.listWrap}>
            <List>
              {showArticles && articles.map((article) => (
                <ListItem key={article._id} disableGutters>
                  <ArticleCard {...article} />
                </ListItem>
              ))}

              {!showArticles && Array(3).fill().map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={index} disableGutters>
                  <ArticleCardSkeleton />
                </ListItem>
              ))}

              {(showArticles && !articles.length && !isDataFetching)
              && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Sorry, no articles with this topic
                </Typography>
              )}
            </List>

          </Box>
          {totalPages > 1
          && (
            <ReactPaginate
              pageCount={totalPages}
              initialPage={page - 1 || 0}
              pageRangeDisplayed={15}
              marginPagesDisplayed={3}
              onPageChange={handlePageChange}
              disableInitialCallback
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              breakClassName="pageItem"
              containerClassName="pagination"
              pageClassName="pageItem"
              previousClassName="pageItem"
              nextClassName="pageItem"
              activeClassName="activePage"
            />
          )}

        </Grid>
        <Grid item lg={3}>
          <Hidden mdDown>
            <Sidebar />
          </Hidden>

        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.list,
  categories: state.categories.list,
  pagesNumber: state.articles.totalPages,
  isDataFetching: state.app.isDataFetching,
});

export default compose(
  withWidth(),
  connect(mapStateToProps, { requestArticles, setNote, push }),
)(Articles);

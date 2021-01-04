import React, { useEffect, useState } from 'react';
import { Container, List, ListItem } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { requestUsers } from '../../../../store/usersReducer';
import AuthorCardSkeleton from '../../../shared/AuthorCardSkeleton/AuthorCardSkeleton';
import AuthorCard from '../../../shared/AuthorCard/AuthorCard';

const Authors = ({ authors, pagesNumber, requestUsers, push }) => {
  const { page } = useParams();
  const [totalPages, setTotalPages] = useState(pagesNumber);
  const [showAuthors, setShowAuthors] = useState(false);

  useEffect(() => {
    setShowAuthors(false);
    requestUsers(page || 1, 10);
  }, [page, requestUsers]);

  useEffect(() => {
    authors.length && setShowAuthors(true);
  }, [authors]);

  useEffect(() => {
    setTotalPages(pagesNumber);
  }, [pagesNumber]);

  const handlePageChange = (page) => {
    const pageNumber = page.selected === 0 ? '' : page.selected + 1;
    push(`/authors/${pageNumber}`);
  };

  return (
    <Container maxWidth="md">
      <List>
        {showAuthors && authors.map((author) => (
          <ListItem key={author._id} disableGutters>
            <AuthorCard key={author._id} {...author} />
          </ListItem>
        ))}
        {!showAuthors && Array(5).fill().map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index} disableGutters>
            <AuthorCardSkeleton />
          </ListItem>
        ))}
      </List>
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
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authors: state.users.list,
  pagesNumber: state.users.totalPages,
});

export default connect(mapStateToProps, { requestUsers, push })(Authors);

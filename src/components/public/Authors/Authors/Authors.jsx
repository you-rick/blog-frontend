import React, {useEffect, useState} from "react";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import AuthorCardSkeleton from "../../../shared/AuthorCardSkeleton/AuthorCardSkeleton";
import {Container, List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {requestUsers} from "../../../../store/usersReducer";
import ReactPaginate from "react-paginate";
import {useParams} from 'react-router-dom';
import {push} from "connected-react-router";


const Authors = (props) => {
    const {authors} = props;
    const {page} = useParams();
    const [totalPages, setTotalPages] = useState(props.pagesNumber);
    const [currentPage, setCurrentPage] = useState(page);
    const [showAuthors, setShowAuthors] = useState(false);

    useEffect(() => {
        setShowAuthors(false);
        props.requestUsers(page ? page : 1, 10);
    }, [page]);

    useEffect(() => {
        console.log("something here!");
        authors.length && setShowAuthors(true);
    }, [authors]);

    useEffect(() => {
        setTotalPages(props.pagesNumber);
    }, [props.pagesNumber]);

    const handlePageChange = (page) => {
        let pageNumber = page.selected === 0 ? '' : page.selected + 1;
        props.push(`/authors/${pageNumber}`);
    };


    return (
        <Container maxWidth="md">
            <List>
                {showAuthors && authors.map((author) => (
                    <ListItem key={author._id} disableGutters>
                        <AuthorCard key={author._id}  {...author} />
                    </ListItem>
                ))}
                {!showAuthors && Array(5).fill().map((item, index) => (
                    <ListItem key={index} disableGutters>
                        <AuthorCardSkeleton/>
                    </ListItem>
                ))}
            </List>
            {totalPages > 1 &&
            <ReactPaginate
                pageCount={totalPages}
                initialPage={currentPage - 1 || 0}
                pageRangeDisplayed={15}
                marginPagesDisplayed={3}
                onPageChange={handlePageChange}
                disableInitialCallback={true}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName="pageItem"
                containerClassName="pagination"
                pageClassName="pageItem"
                previousClassName="pageItem"
                nextClassName="pageItem"
                activeClassName="activePage"
            />
            }
        </Container>
    )
};

const mapStateToProps = (state) => ({
    authors: state.users.list,
    pagesNumber: state.users.totalPages,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestUsers, push})(Authors);

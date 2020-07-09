import React, {useEffect, useState} from "react";
import {Container, Grid, Box, List, ListItem, Typography} from "@material-ui/core";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import ArticleCardSkeleton from "../../../shared/ArticleCardSkeleton/ArticleCardSkeleton";
import {connect} from "react-redux";
import {requestArticles} from "../../../../store/articlesReducer";
import {useParams} from 'react-router-dom';
import {setNote} from "../../../../store/notificationReducer";
import ReactPaginate from "react-paginate";
import {push} from "connected-react-router";


const Articles = (props) => {
    const {slug, page} = useParams();
    const {categories} = props;
    const [category, setCategory] = useState('Articles');
    const [totalPages, setTotalPages] = useState(props.pagesNumber);
    const [currentPage, setCurrentPage] = useState(page);
    const [showArticles, setShowArticles] = useState(false);

    useEffect(() => {
        setShowArticles(false);
        console.log("here!");
        if (slug && categories.length) {
            let ctg = categories.filter(el => el.slug === slug)[0];
            if (ctg) {
                setCategory(ctg.title);
                props.requestArticles(page ? page : 1, 10, '', ctg._id);
            } else {
                props.setNote({msg: "No category - " + slug, type: "error"});
            }
        } else if (page) {
            props.requestArticles(page, 10, '', '');
        } else {
            setCategory('Articles');
            props.requestArticles();
        }
    }, [slug, page, categories]);


    useEffect(() => {
        setTotalPages(props.pagesNumber);
    }, [props.pagesNumber]);

    useEffect(() => {
       setTimeout(() => {
           setShowArticles(true);
       }, 200);
    }, [props.articles]);


    const handlePageChange = (page) => {
        let pageNumber = page.selected === 0 ? '' : page.selected + 1;
        let slugParam = slug ? slug + '/' : '';
        if (slug) {
            props.push(`/category/${slugParam}${pageNumber}`);
        } else {
            props.push(`/articles/${pageNumber}`);
        }
    };


    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="space-between">
                <Grid item xs={12} sm={9}>
                    <h1>{category}</h1>

                    <Box m="1.5rem 0 0" p="0 2rem 0 0">
                        <List>
                            {showArticles && props.articles.map((article) => (
                                <ListItem key={article._id} disableGutters>
                                    <ArticleCard {...article}/>
                                </ListItem>
                            ))}

                            {!showArticles && Array(3).fill().map((item, index) => (
                                <ListItem key={index} disableGutters>
                                    <ArticleCardSkeleton/>
                                </ListItem>
                            ))}

                            {(showArticles && !props.articles.length && !props.isDataFetching) &&
                            <Typography variant="body2" color="textSecondary" component="p">
                                Sorry, no articles with this topic
                            </Typography>
                            }
                        </List>

                    </Box>
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

                </Grid>
                <Grid item xs={false} sm={3}>
                    <Sidebar/>
                </Grid>
            </Grid>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    articles: state.articles.list,
    categories: state.categories.list,
    pagesNumber: state.articles.totalPages,
    isDataFetching: state.app.isDataFetching
});

export default connect(mapStateToProps, {requestArticles, setNote, push})(Articles);

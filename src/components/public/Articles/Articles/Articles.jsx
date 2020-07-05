import React, {useEffect, useState} from "react";
import {Container, Grid, Box, List, ListItem, Typography} from "@material-ui/core";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import ArticleCard from "../../../shared/ArticleCard/ArticleCard";
import {connect} from "react-redux";
import {requestArticles} from "../../../../store/articlesReducer";
import {useParams} from 'react-router-dom';
import {setNote} from "../../../../store/notificationReducer";
import ReactPaginate from "react-paginate";
import s from "./Articles.module.scss";


const Articles = (props) => {
    const {slug} = useParams();
    const [category, setCategory] = useState('Articles');
    const [slugId, setSlugId] = useState('');
    const [page, setPage] = useState(props.pagesNumber);

    useEffect(() => {
        if (slug) {
            let ctg = props.categories.filter(el => el.slug === slug)[0];
            if (ctg) {
                setCategory(ctg.title);
                setSlugId(ctg._id);
                props.requestArticles(1, 10, '', ctg._id);
            } else {
                props.setNote({
                    msg: "No category - " + slug,
                    type: "error"
                });
            }

        } else {
            props.requestArticles();
        }

    }, [slug]);


    useEffect(() => {
        setPage(props.pagesNumber);
    }, [props.pagesNumber]);


    const handlePageChange = (page) => {
        props.requestArticles(page.selected + 1, 10, '', slugId ? slugId : '');
    };


    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="space-between">
                <Grid item xs={12} sm={9}>
                    <h1>{category}</h1>

                    <Box m="1.5rem 0 0" p="0 2rem 0 0">
                        <List>
                            {props.articles.map((article) => (
                                <ListItem key={article._id} disableGutters>
                                    <ArticleCard key={article._id} {...article}/>
                                </ListItem>
                            ))}

                            {!props.articles.length &&
                            <Typography variant="body2" color="textSecondary" component="p">
                                Sorry, no articles with this topic
                            </Typography>
                            }
                        </List>

                    </Box>
                    <ReactPaginate
                        pageCount={page}
                        pageRangeDisplayed={15}
                        marginPagesDisplayed={3}
                        onPageChange={handlePageChange}
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={s.pageItem}
                        containerClassName={s.pagination}
                        pageClassName={s.pageItem}
                        previousClassName={s.pageItem}
                        nextClassName={s.pageItem}
                        activeClassName={s.activePage}
                    />
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
    pagesNumber: state.articles.totalPages
});

export default connect(mapStateToProps, {requestArticles, setNote})(Articles);

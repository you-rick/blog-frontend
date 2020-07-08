import React, {useEffect, useState} from "react";
import ArticleCardHome from "./ArticleCardHome/ArticleCardHome";
import Sidebar from "../../shared/Sidebar/Sidebar";
import {Container, Grid, Box} from "@material-ui/core";
import {connect} from "react-redux"
import {requestArticles} from "../../../store/articlesReducer";
import Masonry from 'react-masonry-css';
import s from './Home.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";


const breakpointColumns = {
    default: 3,
    980: 2,
    500: 1
};

const Home = (props) => {
    const {articles, totalArticles} = props;
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [step, setStep] = useState(12);

    useEffect(() => {
        props.requestArticles(page, step, '', '', 'Home');
        setPage(page + 1);
    }, []);

    useEffect(() => {
        setHasMore(articles.length < totalArticles);
    }, [articles, totalArticles]);

    const loadMore = () => {
        props.requestArticles(page, step, '', '', 'Home');
        setPage(page + 1);
    };

    const cards = articles.map((article, index) => (
        <ArticleCardHome key={index} {...article}/>
    ));

    return (
        <div style={{padding: 20}}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item sm={12} md={9}>
                        <InfiniteScroll
                            next={loadMore}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            dataLength={page * step}
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            <Masonry
                                breakpointCols={breakpointColumns}
                                className={s.masonryGrid}
                                columnClassName={s.masonryGridColumn}
                            >
                                {cards}
                            </Masonry>
                        </InfiniteScroll>

                    </Grid>
                    <Grid item sm={false} md={3}>
                        <Sidebar/>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
};

const mapStateToProps = (state) => ({
    articles: state.articles.list,
    totalArticles: state.articles.totalArticles
});

export default connect(mapStateToProps, {requestArticles})(Home);

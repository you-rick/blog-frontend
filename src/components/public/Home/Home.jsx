import React, {useEffect} from "react";
import ArticleCardHome from "./ArticleCardHome/ArticleCardHome";
import Sidebar from "../../shared/Sidebar/Sidebar";
import {Container, Grid, Box} from "@material-ui/core";
import {connect} from "react-redux"
import {requestArticles} from "../../../store/articlesReducer";
import Masonry from 'react-masonry-css';
import s from './Home.module.scss';


const breakpointColumns = {
    default: 3,
    980: 2,
    500: 1
};


const Home = (props) => {
    useEffect(() => {
        props.requestArticles();
        console.log(props.articles);
    }, []);


    const cards = props.articles.map((article) => (
        <ArticleCardHome key={article._id} {...article}/>
    ));

    return (
        <div style={{padding: 20}}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <Masonry
                            breakpointCols={breakpointColumns}
                            className={s.masonryGrid}
                            columnClassName={s.masonryGridColumn}
                        >
                            {cards}
                        </Masonry>
                    </Grid>
                    <Grid item xs={false} sm={3}>
                        <Sidebar/>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
};

const mapStateToProps = (state) => ({
    articles: state.articles.list
});

export default connect(mapStateToProps, {requestArticles})(Home);

import React from "react";
import ArticleCardHome from "./ArticleCardHome/ArticleCardHome";
import Sidebar from "../../shared/Sidebar/Sidebar";
import {Container, Grid, Box, Paper} from "@material-ui/core";

const Home = () => {
    return (
        <div style={{padding: 20}}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <ArticleCardHome/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={false} sm={3}>
                        <Sidebar/>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
};


export default Home;

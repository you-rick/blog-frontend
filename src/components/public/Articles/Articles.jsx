import React from "react";
import {Container, Grid, Box, List, ListItem} from "@material-ui/core";
import Sidebar from "../../shared/Sidebar/Sidebar";
import ArticleCard from "../../shared/ArticleCard/ArticleCard";
  

const Articles = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3} justify="space-between">
                    <Grid item xs={12} sm={9}>
                        <h1>Photography</h1>

                        <Box m="1.5rem 0 0" p="0 2rem 0 0">
                            <List>
                                <ListItem disableGutters>
                                    <ArticleCard/>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ArticleCard/>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ArticleCard/>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ArticleCard/>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ArticleCard/>
                                </ListItem>
                            </List>

                        </Box>
                    </Grid>
                    <Grid item xs={false} sm={3}>
                        <Sidebar/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};


export default Articles;

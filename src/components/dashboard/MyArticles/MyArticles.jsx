import React from "react";
import {Box, Container, List, ListItem, Grid, Button} from "@material-ui/core";
import ArticleCard from "../../shared/ArticleCard/ArticleCard";
import {NavLink} from "react-router-dom";


const MyArticles = () => {
    return (
        <Container maxWidth="md">
            <Grid container justify="space-between" alignItems="center">
                 <h1>My Articles</h1>
                <Button
                    component={NavLink}
                    to="/profile/articles/add"
                    variant="contained"
                    color="primary">
                    Add Article
                </Button>
            </Grid>

            <Box m="1.5rem 0 0">
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
        </Container>
    )
};


export default MyArticles;

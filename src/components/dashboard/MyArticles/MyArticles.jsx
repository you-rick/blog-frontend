import React from "react";
import {Box, Container, List, ListItem} from "@material-ui/core";
import ArticleCard from "../../shared/ArticleCard/ArticleCard";


const MyArticles = () => {
    return (
        <Container maxWidth="md">
            <h1>My Articles</h1>

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
        </Container>
    )
};


export default MyArticles;

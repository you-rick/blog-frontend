import React from "react";
import AuthorCard from "../../../shared/AuthorCard/AuthorCard";
import {Container, List, ListItem} from "@material-ui/core";

const Authors = () => {

    return (
        <Container maxWidth="md">
             <List>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
                 <ListItem disableGutters>
                     <AuthorCard />
                 </ListItem>
             </List>
        </Container>
    )
};


export default Authors;

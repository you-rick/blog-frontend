import React from 'react';
import { Box, Container, List, ListItem } from '@material-ui/core';
import AuthorCard from '../../shared/AuthorCard/AuthorCard';

const FollowedAuthors = () => (
  <Container maxWidth="md">
    <h1>Followed Authors</h1>

    <Box m="1.5rem 0 0">
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
      </List>
    </Box>
  </Container>
);

export default FollowedAuthors;

import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import s from '../Article.module.scss';

const Article = () => (
  <Container maxWidth="md">
    <Box className={s.articleHeader}>
      <Grid container>
        <Skeleton width="50%" height={50} />
      </Grid>
      <Box m="1rem 0 0 ">
        <Skeleton width="100%" />
      </Box>

      <Box m="1rem 0">
        <Grid container justify="flex-start" alignItems="center">
          <Skeleton variant="circle" width={40} height={40} />
          <Box style={{ flexGrow: '1', marginLeft: '1rem' }}>
            <Skeleton height={12} width={160} style={{ marginBottom: 6 }} />
            <Skeleton height={12} width={160} />
          </Box>
        </Grid>
      </Box>
    </Box>

    <Box alignItems="center" m="0 0 2rem">
      <Grid container justify="center">
        <Skeleton variant="rect" width="100%" height={400} />
      </Grid>
    </Box>
    <Skeleton width="100%" />
    <Skeleton width="100%" />
    <Skeleton width="100%" />
    <Skeleton width="100%" />
  </Container>
);

export default Article;

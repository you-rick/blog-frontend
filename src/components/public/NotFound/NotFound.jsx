import React from "react";
import {Container, Grid, Typography, Box} from "@material-ui/core";


const NotFound = () => {
    return (
        <Container maxWidth="md">
            <Box m="4rem 0 0">
                <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Page not found :(
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    Maybe the page you are looking for has been removed, or you typed in the wrong URL
                </Typography>
            </Grid>
            </Box>

        </Container>
    )
};


export default NotFound;

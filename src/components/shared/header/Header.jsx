import React from "react";
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import "./Header.scss";

import {AppBar, InputBase, Toolbar, Typography, Container, IconButton, Grid, Box, Button} from "@material-ui/core";
import {AccountCircle, Bookmarks, Search} from "@material-ui/icons";
import themeStyles from "./Header.styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => themeStyles(theme));

const Header = () => {
    const classes = useStyles();

    const carouselSettings = {
        className: "slider variable-width",
        dots: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 6,
        variableWidth: true
    };

    return (
        <>
            <AppBar position="static" color="inherit">
                <Container maxWidth="lg" disableGutters>
                    <Toolbar>
                        <Grid container justify="space-between" alignItems="center">
                            <Typography variant="h4" className={classes.brand} component={NavLink} to="/">
                                Small
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Search/>
                                    </Grid>
                                    <Grid item>
                                        <InputBase
                                            placeholder="Search…"
                                            inputProps={{'aria-label': 'search'}}
                                            classes={{input: classes.searchInput}}
                                        />
                                    </Grid>
                                </Grid>

                                <IconButton aria-label="saved articles" aria-controls="menu-appbar" color="inherit">
                                    <Bookmarks/>
                                </IconButton>
                                <IconButton aria-label="user account" aria-controls="menu-appbar" color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box m={4}>
                <Container maxWidth="lg">
                    <div>
                        <Slider {...carouselSettings}>
                            <Button component={NavLink} to="/category/:id">Beauty</Button>
                            <Button component={NavLink} to="/category/:id">Books</Button>
                            <Button component={NavLink} to="/category/:id">Coronavirus Updates</Button>
                            <Button component={NavLink} to="/category/:id">Travelling</Button>
                            <Button component={NavLink} to="/category/:id">IT Industry</Button>
                            <Button component={NavLink} to="/category/:id">Health</Button>
                            <Button component={NavLink} to="/category/:id">Food</Button>
                            <Button component={NavLink} to="/category/:id">Gaming</Button>
                            <Button component={NavLink} to="/category/:id">Fashion</Button>
                        </Slider>
                    </div>
                </Container>
            </Box>
        </>
    );
};

export default Header;

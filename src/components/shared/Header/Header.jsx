import React from "react";
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import "./Header.scss";

import {AppBar, InputBase, Toolbar, Typography, Container, IconButton, Grid, Box, Button, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, BookmarksOutlined, Search} from "@material-ui/icons";
import themeStyles from "./Header.styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => themeStyles(theme));

const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const carouselSettings = {
        className: "slider variable-width",
        dots: false,
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 2,
        variableWidth: true
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                                    <BookmarksOutlined/>
                                </IconButton>
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem component={NavLink} to="/login">Login</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </Box>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box m={4}>
                <Container maxWidth="lg">
                    <Box p="0 2rem">
                        <Slider {...carouselSettings}>
                            <Button className={classes.sliderButton} component={NavLink} to="/category/:id">Coronavirus
                                Updates</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Photography</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Design</Button>
                            <Button className={classes.sliderButton} component={NavLink} to="/category/:id">Remote
                                Work</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Business</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Beauty</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Books</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Travelling</Button>
                            <Button className={classes.sliderButton} component={NavLink} to="/category/:id">IT
                                Industry</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Health</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Food</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Gaming</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Fashion</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Music</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Photography</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Design</Button>
                            <Button className={classes.sliderButton} component={NavLink}
                                    to="/category/:id">Business</Button>
                        </Slider>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Header;

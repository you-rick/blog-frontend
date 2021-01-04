import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Slider from 'react-slick';
import './Header.scss';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Hidden,
  withWidth,
} from '@material-ui/core';
import { AccountCircle, BookmarksOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import themeStyles from './Header.styles';
import { logout } from '../../../store/profileReducer';

const useStyles = makeStyles((theme) => themeStyles(theme));

const Header = ({ categories, logout, isAuth, profile }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const open = Boolean(anchorEl);
  const carouselSettings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
  };

  useEffect(() => {
    setShowCategories(true);
  }, [categories]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout();
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
              <Box className="headerLinks">
                <Grid item container alignItems="center">
                  <Button color="inherit" component={NavLink} to="/articles">Articles</Button>
                  <Divider orientation="vertical" flexItem className={classes.divider} />
                  <Button color="inherit" component={NavLink} to="/authors">Authors</Button>
                </Grid>
              </Box>
              <Box display="flex" alignItems="center">
                <Hidden smDown>
                  <IconButton component={NavLink} to="/profile/liked" color="inherit">
                    <FavoriteBorderOutlined />
                  </IconButton>
                  <IconButton component={NavLink} to="/profile/saved" color="inherit">
                    <BookmarksOutlined />
                  </IconButton>
                </Hidden>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {isAuth
                      ? (
                        <Avatar alt={profile.fullName} src={process.env.REACT_APP_SERVER_URL + profile.photo} />
                      )
                      : <AccountCircle />}

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
                    className="headerMenu"
                  >
                    {!isAuth
                    && <MenuItem component={NavLink} to="/login">Login</MenuItem>}
                    {!isAuth
                    && <MenuItem component={NavLink} to="/register">Sign Up</MenuItem>}
                    {isAuth
                    && <MenuItem component={NavLink} to="/profile" divider>Profile</MenuItem>}
                    {isAuth
                    && <MenuItem component={NavLink} to="/profile/liked" className="hide-desktop">Liked</MenuItem>}
                    {isAuth
                    && <MenuItem component={NavLink} to="/profile/saved" className="hide-desktop">Saved</MenuItem>}
                    {isAuth
                    && <MenuItem onClick={logoutHandler}>Logout</MenuItem>}
                  </Menu>
                </div>
              </Box>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Box className="categorySliderBox">
        <Container maxWidth="lg">
          <Box className="categorySliderWrap">
            {showCategories
            && (
            <Slider {...carouselSettings}>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  className={classes.sliderButton}
                  component={NavLink}
                  to={`/category/${category.slug}`}
                >
                  {category.title}
                </Button>
              ))}
            </Slider>
            )}

          </Box>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories.list,
  profile: state.profile,
  isAuth: state.profile.isAuth,
});

export default compose(
  withWidth(),
  connect(mapStateToProps, { logout }),
)(Header);

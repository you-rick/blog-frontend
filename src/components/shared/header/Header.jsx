import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import Container from "@material-ui/core/Container";
import {AccountCircle, Bookmarks} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "./Header.styles"

const useStyles = makeStyles((theme) => (styles(theme)));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolBar}>
                        <Typography variant="h6" noWrap className={classes.brand}>
                            Small
                        </Typography>
                        <aside className={classes.aside}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div>
                            <IconButton aria-label="saved articles" aria-controls="menu-appbar" color="inherit">
                                <Bookmarks/>
                            </IconButton>
                            <IconButton aria-label="user account" aria-controls="menu-appbar" color="inherit">
                                <AccountCircle/>
                            </IconButton>

                        </aside>

                    </Toolbar>
                </Container>

            </AppBar>
        </div>
    );
};


export default Header;

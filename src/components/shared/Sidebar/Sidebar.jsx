import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Divider, Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '20rem',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2)
    },
    inline: {
        display: 'inline',
    },
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h6" component="h2">Popular on Small</Typography>
            <Box boxShadow={1} m="0 0 2rem">
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>01</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>02</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>03</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Box>

            <Typography variant="h6" component="h2">Best Authors</Typography>
            <Box boxShadow={1}>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>J</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="John Doe" secondary="10 posts, 78 likes"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Avatar>M</Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Marlon Brando" secondary="6 posts, 14 likes"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Avatar>R</Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Robert De Niro" secondary="11 posts, 55 likes"/>
                    </ListItem>
                </List>
            </Box>

        </>
    )
};


export default Sidebar;

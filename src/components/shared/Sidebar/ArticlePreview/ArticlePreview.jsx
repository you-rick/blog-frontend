import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {Avatar, Divider, ListItem, ListItemAvatar, Box, Typography} from "@material-ui/core";
import Moment from "react-moment";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#222",
        textDecoration: "none",
        lineHeight: "1.5",
        marginBottom: "0.5rem",
        display: "block"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

const ArticlePreview = (props) => {
    const classes = useStyles();

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar className={classes.orange}>0{props.index + 1}</Avatar>
                </ListItemAvatar>
                <Box>
                    <Typography variant="subtitle1"
                                className={classes.link}
                                component={NavLink}
                                to={`/article/${props.slug}`}
                    >
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Moment format="DD MMMM YYYY">
                            {props.date}
                        </Moment>
                        <span>, {props.likesNumber} likes</span>
                    </Typography>
                </Box>

            </ListItem>
            {props.index < 2 && <Divider variant="inset" component="li"/>}
        </>
    )
};


export default ArticlePreview;

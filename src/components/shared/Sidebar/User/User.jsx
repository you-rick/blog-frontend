import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#222",
        textDecoration: "none",
        lineHeight: "1.5",
        marginBottom: "0.5rem",
        display: "block"
    },
    listItem: {
        paddingTop: "4px",
        paddingBottom: "4px"
    }
}));

const User = (props) => {
    const classes = useStyles();

    return (
        <ListItem component={NavLink} to={`/author/${props._id}`} className={classes.listItem}>
            <ListItemAvatar>
                <Avatar alt={props.fullName} size="big" src={process.env.REACT_APP_SERVER_URL + props.photo} />
            </ListItemAvatar>
            <ListItemText className={classes.link} primary={props.fullName} secondary={`${props.followersNumber} followers`}/>
        </ListItem>
    )
};


export default User;

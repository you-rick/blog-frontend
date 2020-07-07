import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

const User = (props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={props.fullName} size="big" src={process.env.REACT_APP_SERVER_URL + props.photo} />
            </ListItemAvatar>
            <ListItemText primary={props.fullName} secondary={`${props.followersNumber} followers`}/>
        </ListItem>
    )
};


export default User;

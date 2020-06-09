import React from "react";
import s from "./Sidebar.module.scss";
import {List, ListItem, ListItemAvatar, ListItemText, Avatar} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


const Siderbar = () => {
    return (
        <>
            <h3>Most Popular Authors</h3>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                </ListItem>
            </List>
        </>
    )
};


export default Siderbar;

import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    color: '#222',
    textDecoration: 'none',
    lineHeight: '1.5',
    marginBottom: '0.5rem',
    display: 'block',
  },
  listItem: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
}));

const User = ({ _id, fullName, photo, followersNumber }) => {
  const classes = useStyles();

  return (
    <ListItem component={NavLink} to={`/author/${_id}`} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar alt={fullName} size="big" src={process.env.REACT_APP_SERVER_URL + photo} />
      </ListItemAvatar>
      <ListItemText
        className={classes.link}
        primary={fullName}
        secondary={`${followersNumber} followers`}
      />
    </ListItem>
  );
};

export default User;

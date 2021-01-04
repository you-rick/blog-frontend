import React, { useEffect, useState } from 'react';
import { List, Typography, Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { requestSidebarUsers, requestSidebarArticles } from '../../../store/sidebarReducer';
import User from './User/User';
import ArticlePreview from './ArticlePreview/ArticlePreview';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
}));

const Sidebar = ({ users, articles, requestSidebarArticles, requestSidebarUsers }) => {
  const classes = useStyles();
  const [showUsers, setShowUsers] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    requestSidebarArticles(1, 3, '', '', 1);
    requestSidebarUsers(1, 5);
  }, []);

  useEffect(() => {
    users.length && setShowUsers(true);
    articles.length && setShowArticles(true);
  }, [users, articles]);

  return (
    <>
      <Typography variant="h6" component="h2">Best on Small</Typography>
      <Box boxShadow={1} m="0 0 2rem">
        <List className={classes.root}>
          {showArticles && articles.map((article, index) => (
            <ArticlePreview key={article._id} index={index} {...article} />
          ))}
          {!showArticles && Array(3).fill().map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton variant="circle" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton width="40%" />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      <Typography variant="h6" component="h2">Popular Authors</Typography>
      <Box boxShadow={1}>
        <List className={classes.root}>
          {showUsers && users.map((user) => (
            <User key={user._id} {...user} />
          ))}
          {!showUsers && Array(5).fill().map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index}>
              <ListItemAvatar>
                <Skeleton variant="circle" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText>
                <Skeleton />
                <Skeleton width="40%" />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.sidebar.users,
  articles: state.sidebar.articles,
});

export default connect(mapStateToProps, { requestSidebarUsers, requestSidebarArticles })(Sidebar);

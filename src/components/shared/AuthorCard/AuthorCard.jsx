import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { NavLink, useParams } from 'react-router-dom';
import { Grid, Box, Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { follow, unfollow } from '../../../store/usersReducer';
import { setNote } from '../../../store/notificationReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: '1',
  },
  media: {
    flexBasis: '10%',
    flexShrink: '0',
    paddingBottom: '10%',
    height: '0',
    borderRadius: '50%',
    backgroundColor: '#eee',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '5rem',
      height: '5rem',
      margin: theme.spacing(2, 1),
    },
  },
  contentGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  header: {
    color: '#222',
    textDecoration: 'none',
  },
  btnWrap: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
}));

const AuthorCard = ({ followers, following, detailed, photo, fullName, date, about, profile, setNote, follow, unfollow, _id: authorId }) => {
  const { id } = useParams();
  const classes = useStyles();
  const noAuthMsg = 'User should be logged in';
  const [avatar, setAvatar] = useState('/images/placeholder/default-avatar.png');
  const followCondition = followers.some((id) => id === profile._id);
  const [isFollowed, setIsFollowed] = useState(followCondition);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    photo && setAvatar(process.env.REACT_APP_SERVER_URL + photo);
  }, [photo]);

  useEffect(() => {
    setIsFollowed(followCondition);
  }, [followers, followCondition]);

  useEffect(() => {
    (id || detailed) && setShowAbout(true);
  }, [id, detailed]);

  const handleFollow = () => {
    if (!profile.isAuth) {
      setNote({ msg: noAuthMsg });
    } else {
      !isFollowed && follow(authorId);
      isFollowed && unfollow(authorId);
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={avatar}
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Grid container justify="space-between" alignItems="flex-start" wrap="nowrap" className={classes.contentGrid}>
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              className={classes.header}
              component={NavLink}
              to={`/author/${authorId}`}
            >
              {fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Member since -
              <Moment format="MMMM YYYY">{date}</Moment>
            </Typography>
            <Box m="1rem 0 0" />
            {showAbout
            && (
              <Box m="1rem 0">
                <Typography variant="body2" color="textSecondary" component="p">
                  {about}
                </Typography>
              </Box>
            )}
            <Typography variant="subtitle2" color="textSecondary">
              {`${followers.length} followers, ${following.length} following`}
            </Typography>
          </Grid>
          <Grid item className={classes.btnWrap}>
            {(profile._id !== authorId)
            && (
              <Button variant="outlined" color="primary" onClick={handleFollow}>
                {!isFollowed ? 'Follow' : 'Unfollow'}
              </Button>
            )}
            {(profile._id === authorId)
            && (
            <Button variant="outlined" color="primary" component={NavLink} to="/profile/edit">
              Edit
            </Button>
            )}
          </Grid>
        </Grid>

      </CardContent>

    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { follow, unfollow, setNote })(AuthorCard);

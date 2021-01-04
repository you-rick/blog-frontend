import React, { useEffect, useState } from 'react';
import { Grid, Avatar, Typography, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { follow, unfollow } from '../../../../../store/usersReducer';
import { setNote } from '../../../../../store/notificationReducer';

const AuthorInfo = ({ followers, following, photo, profile, fullName, setNote, follow, unfollow, _id: authorId }) => {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const noAuthMsg = 'User should be logged in';
  const [avatar, setAvatar] = useState('/images/placeholder/default-avatar.png');
  const followCondition = followers.some((id) => id === profile._id);
  const [isFollowed, setIsFollowed] = useState(followCondition);

  useEffect(() => {
    photo && setAvatar(serverURL + photo);
  }, [photo]);

  useEffect(() => {
    setIsFollowed(followCondition);
  }, [followers]);

  const handleFollow = () => {
    if (!profile.isAuth) {
      setNote({ msg: noAuthMsg });
    } else {
      !isFollowed && follow(authorId);
      isFollowed && unfollow(authorId);
    }
  };

  return (
    <>
      <Grid container justify="flex-start" alignItems="center">
        <Avatar alt="Remy Sharp" src={avatar} />
        <Grid item>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item>
              <Box m="0 1.5rem 0 1rem">
                <Typography
                  variant="body1"
                  color="textPrimary"
                  component={profile._id !== authorId ? NavLink : 'span'}
                  to={`/author/${authorId}`}
                >
                  {fullName}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {`${followers.length} followers, ${following.length} following`}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              {(profile._id !== authorId)
              && (
              <Button variant="outlined" size="small" color="primary" onClick={handleFollow}>
                {!isFollowed ? 'Follow' : 'Unfollow'}
              </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { follow, unfollow, setNote })(AuthorInfo);

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { like, unlike, save, unsave } from '../../../store/articlesReducer';
import { setNote } from '../../../store/notificationReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    flexGrow: '1',
    [theme.breakpoints.down('sm')]: {
      order: '2',
    },
  },
  media: {
    flexBasis: '22%',
    flexShrink: '0',
    minHeight: '160px',
    backgroundColor: '#eee',
    [theme.breakpoints.down('sm')]: {
      order: '1',
      flexBasis: '100%',
      width: '100%',
      minHeight: '200px',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#222',
  },
  iconButton: {
    border: '1px solid',
    borderRadius: '50%',
  },
}
));

const ArticleCard = (props) => {
  const { saved, liked, profile, _id, slug, title, description, date, image, author } = props;
  const classes = useStyles();
  const noAuthMsg = 'User should be logged in';
  const likedCondition = liked.some((id) => id === profile._id);
  const savedCondition = saved.some((id) => id === profile._id);
  const [isSaved, setIsSaved] = useState(savedCondition);
  const [isLiked, setIsLiked] = useState(likedCondition);

  useEffect(() => {
    setIsLiked(likedCondition);
    setIsSaved(savedCondition);
  }, [saved, liked, likedCondition, savedCondition]);

  const handleLike = () => {
    if (!profile.isAuth) {
      props.setNote({ msg: noAuthMsg });
    } else {
      !isLiked && props.like(props._id);
      isLiked && props.unlike(props._id);
    }
  };

  const handleSave = () => {
    if (!profile.isAuth) {
      props.setNote({ msg: noAuthMsg });
    } else {
      !isSaved && props.save(props._id);
      isSaved && props.unsave(props._id);
    }
  };

  return (
    <Card key={_id} className={classes.root}>
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h6"
          component={NavLink}
          to={`/article/${slug}`}
          className={classes.link}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Box m="1rem 0">
          <Typography variant="subtitle2" color="textSecondary">
            <Moment format="DD MMMM YYYY">
              {date}
            </Moment>
          </Typography>
        </Box>
        {profile._id !== author
        && (
        <Grid container>
          <Box m="0 1rem 0 0">
            <IconButton className={classes.iconButton} onClick={handleSave}>
              {isSaved
                ? <BookmarkIcon fontSize="small" />
                : <BookmarkBorderIcon fontSize="small" />}
            </IconButton>
          </Box>
          <IconButton className={classes.iconButton} onClick={handleLike}>
            {isLiked
              ? <FavoriteIcon fontSize="small" />
              : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Grid>
        )}

      </CardContent>
      <CardMedia
        className={classes.media}
        image={process.env.REACT_APP_SERVER_URL + image}
        title={title}
      />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { like, unlike, save, unsave, setNote })(ArticleCard);

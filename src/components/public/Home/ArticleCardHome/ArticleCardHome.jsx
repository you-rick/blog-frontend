import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton, Box } from '@material-ui/core';
import { FavoriteBorder, BookmarkBorder, Bookmark, Favorite } from '@material-ui/icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import s from './Article.module.scss';
import { like, unlike, save, unsave } from '../../../../store/articlesReducer';
import { setNote } from '../../../../store/notificationReducer';

const ArticleCardHome = ({ saved, liked, profile, setNote, like, unlike, _id: authorId, image, title, slug, description, date, author }) => {
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
      setNote({ msg: noAuthMsg });
    } else {
      !isLiked && like(authorId);
      isLiked && unlike(authorId);
    }
  };

  const handleSave = () => {
    if (!profile.isAuth) {
      setNote({ msg: noAuthMsg });
    } else {
      !isSaved && save(authorId);
      isSaved && unsave(authorId);
    }
  };

  return (
    <Card>
      <CardMedia
        image={process.env.REACT_APP_SERVER_URL + image}
        title={title}
        className={s.cardMedia}
      />
      <CardHeader
        classes={{ title: s.cardHeader, subheader: s.cardSubheader }}
        title={<NavLink to={`/article/${slug}`} className={s.title}>{title}</NavLink>}
        subheader={<Moment format="DD MMMM YYYY">{date}</Moment>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      {profile._id !== author
      && (
        <CardActions disableSpacing>
          <Box m="0 1rem 0 0">
            <IconButton onClick={handleSave}>
              {isSaved
                ? <Bookmark fontSize="small" />
                : <BookmarkBorder fontSize="small" />}
            </IconButton>
          </Box>
          <IconButton onClick={handleLike}>
            {isLiked
              ? <Favorite fontSize="small" />
              : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { like, unlike, save, unsave, setNote })(ArticleCardHome);

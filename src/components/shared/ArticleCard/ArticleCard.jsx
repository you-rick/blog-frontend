import React, {useEffect, useState} from "react";
import {Card, CardContent, Typography, CardMedia, Box, Grid, IconButton} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {connect} from "react-redux";
import {like, unlike, save, unsave} from "../../../store/articlesReducer";
import {setNote} from "../../../store/notificationReducer";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flexGrow: '1'
    },
    media: {
        flexBasis: '22%',
        flexShrink: '0',
        minHeight: '160px'
    },
    link: {
        textDecoration: 'none',
        color: '#222'
    },
    iconButton: {
        border: '1px solid',
        borderRadius: '50%'
    }
});

const ArticleCard = (props) => {
    const {saved, liked} = props;
    const classes = useStyles();
    const noAuthMsg = "User should be logged in";
    const likedCondition = liked.some(id => id === props.profile._id);
    const savedCondition = saved.some(id => id === props.profile._id);
    const [isSaved, setIsSaved] = useState(savedCondition);
    const [isLiked, setIsLiked] = useState(likedCondition);

    useEffect(() => {
        setIsLiked(likedCondition);
        setIsSaved(savedCondition);
    }, [saved, liked]);

    const handleLike = () => {
        if (!props.profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isLiked && props.like(props._id);
            isLiked && props.unlike(props._id);
        }
    };

    const handleSave = () => {
        if (!props.profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isSaved && props.save(props._id);
            isSaved && props.unsave(props._id);
        }
    };

    return (
        <Card key={props._id} className={classes.root}>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" component={NavLink} to={`/articles/${props.slug}`}
                            className={classes.link}>
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
                <Box m="1rem 0">
                    <Typography variant="subtitle2" color="textSecondary">
                        <Moment format="DD MMMM YYYY">
                            {props.date}
                        </Moment>
                    </Typography>
                </Box>
                <Grid container>
                    <Box m="0 1rem 0 0">
                        <IconButton className={classes.iconButton} onClick={handleSave}>
                            {isSaved
                                ? <BookmarkIcon fontSize="small"/>
                                : <BookmarkBorderIcon fontSize="small"/>
                            }
                        </IconButton>
                    </Box>
                    <IconButton className={classes.iconButton} onClick={handleLike}>
                        {isLiked
                            ? <FavoriteIcon fontSize="small"/>
                            : <FavoriteBorderIcon fontSize="small"/>
                        }
                    </IconButton>
                </Grid>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={process.env.REACT_APP_SERVER_URL + props.image}
                title={props.title}
            />
        </Card>
    )
};


const mapStateToProps = (state) => ({
    profile: state.profile
});


export default connect(mapStateToProps, {like, unlike, save, unsave, setNote})(ArticleCard);

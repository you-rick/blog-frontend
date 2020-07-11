import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./Article.module.scss";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    Grid
} from "@material-ui/core";
import {FavoriteBorder, BookmarkBorder, Bookmark, Favorite} from "@material-ui/icons";
import Moment from "react-moment";
import {connect} from "react-redux";
import {like, unlike, save, unsave} from "../../../../store/articlesReducer";
import {setNote} from "../../../../store/notificationReducer";


const ArticleCardHome = (props) => {
    const {saved, liked, profile} = props;
    const noAuthMsg = "User should be logged in";
    const likedCondition = liked.some(id => id === profile._id);
    const savedCondition = saved.some(id => id === profile._id);
    const [isSaved, setIsSaved] = useState(savedCondition);
    const [isLiked, setIsLiked] = useState(likedCondition);

    useEffect(() => {
        setIsLiked(likedCondition);
        setIsSaved(savedCondition);
    }, [saved, liked]);

    const handleLike = () => {
        if (!profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isLiked && props.like(props._id);
            isLiked && props.unlike(props._id);
        }
    };

    const handleSave = () => {
        if (!profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isSaved && props.save(props._id);
            isSaved && props.unsave(props._id);
        }
    };


    return (
        <Card>
            <CardMedia
                image={process.env.REACT_APP_SERVER_URL + props.image}
                title={props.title}
                className={s.cardMedia}
            />
            <CardHeader
                classes={{title: s.cardHeader, subheader: s.cardSubheader}}
                title={<NavLink to={`/article/${props.slug}`} className={s.title}>{props.title}</NavLink>}
                subheader={<Moment format="DD MMMM YYYY">{props.date}</Moment>}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>

            {profile._id !== props.author &&
            <CardActions disableSpacing>
                <Box m="0 1rem 0 0">
                    <IconButton onClick={handleSave}>
                        {isSaved
                            ? <Bookmark fontSize="small"/>
                            : <BookmarkBorder fontSize="small"/>
                        }
                    </IconButton>
                </Box>
                <IconButton onClick={handleLike}>
                    {isLiked
                        ? <Favorite fontSize="small"/>
                        : <FavoriteBorder fontSize="small"/>
                    }
                </IconButton>
            </CardActions>
            }
        </Card>
    )
};

const mapStateToProps = (state) => ({
    profile: state.profile
});


export default connect(mapStateToProps, {like, unlike, save, unsave, setNote})(ArticleCardHome);

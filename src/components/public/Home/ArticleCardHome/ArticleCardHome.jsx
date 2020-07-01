import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Article.module.scss";
import {Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import {FavoriteBorder, BookmarkBorder} from "@material-ui/icons";
import Moment from "react-moment";


const ArticleCardHome = (props) => {
    return (
        <Card>
            <CardMedia
                image={process.env.REACT_APP_SERVER_URL + props.image}
                title={props.title}
                className={s.cardMedia}
            />
            <CardHeader
                classes={{title: s.cardHeader, subheader: s.cardSubheader}}
                title={<NavLink to={`/articles/${props.slug}`} className={s.title}>{props.title}</NavLink>}
                subheader={<Moment format="DD MMMM YYYY">{props.date}</Moment>}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorder/>
                </IconButton>
                <IconButton aria-label="share">
                    <BookmarkBorder/>
                </IconButton>
            </CardActions>
        </Card>
    )
};


export default ArticleCardHome;

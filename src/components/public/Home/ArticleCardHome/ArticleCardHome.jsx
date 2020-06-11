import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Article.module.scss";
import {Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Avatar, IconButton} from "@material-ui/core";
import {FavoriteBorder, BookmarkBorder} from "@material-ui/icons";


const ArticleCardHome = () => {
    return (
        <>
            <Card>
                <CardMedia
                    image="/images/placeholder/img1.jpg"
                    title="Paella dish"
                    className={s.cardMedia}
                />
                <CardHeader
                    classes={{title: s.cardHeader, subheader: s.cardSubheader}}
                    component="h6"
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
        </>
    )
};


export default ArticleCardHome;

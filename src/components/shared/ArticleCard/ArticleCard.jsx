import React from "react";
import {Card, CardContent, Typography, CardMedia, Box, Grid, IconButton} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flexGrow: '1'
    },
    media: {
        flexBasis: '20%',
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
    const classes = useStyles();

    return (
        <Card className={classes.root}>
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
                        <IconButton className={classes.iconButton}>
                            <BookmarkBorderIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                    <IconButton className={classes.iconButton}>
                        <FavoriteBorderIcon fontSize="small"/>
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


export default ArticleCard;

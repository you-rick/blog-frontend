import React from "react";
import {Card, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';


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
    }
});

const ArticleCardSkeleton = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Skeleton width="80%" height={40}/>
                <Skeleton width="100%"/>
                <Skeleton width="100%"/>
                <Skeleton width={100}/>
            </CardContent>
            <CardMedia className={classes.media} variant="rect" width="100%" height={160} component={Skeleton}/>
        </Card>
    )
};


export default ArticleCardSkeleton;

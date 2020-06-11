import React from "react";
import {Card, CardContent, Typography, CardMedia, Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


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
    },
});

const ArticleCard = () => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h6" component="h6">
                        How Lockdown Has Changed My Perception of Buying Clothes
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    <Box m="1rem 0 0">
                       <Typography variant="subtitle2" color="textSecondary">06 May 2020</Typography>
                    </Box>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image="/images/placeholder/img3.jpg"
                    title="Contemplative Reptile"
                />
            </Card>
        </>
    )
};


export default ArticleCard;

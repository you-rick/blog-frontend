import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box, Button, Card, CardContent, CardMedia, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flexGrow: '1'
    },
    media: {
        flexBasis: '16%',
        paddingBottom: '16%',
        height: '0',
        borderRadius: '50%',
        margin: theme.spacing(2)
    },
}));

const AuthorCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image="/images/placeholder/author.jpg"
                title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
                <Grid container justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="h6">
                            Mariana Lenharo
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Member since - Apr 2019
                        </Typography>
                        <Box m="1rem 0 0">
                            <Typography variant="subtitle2" color="textSecondary">19 followers, 26 articles</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                          Follow
                        </Button>
                    </Grid>
                </Grid>


            </CardContent>

        </Card>
    )
};


export default AuthorCard;

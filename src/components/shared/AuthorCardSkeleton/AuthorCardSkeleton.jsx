import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box, Card, CardContent, CardMedia} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flexGrow: '1'
    },
    media: {
        flexBasis: '10%',
        flexShrink: '0',
        paddingBottom: '10%',
        height: '0',
        borderRadius: '50%',
        transform: 'none',
        margin: theme.spacing(2.5),
        [theme.breakpoints.down('sm')]: {
            flexBasis: '5rem',
            height: '5rem',
            margin: theme.spacing(2, 1)
        }
    },
    contentGrid: {
         [theme.breakpoints.down('sm')]: {
             flexDirection: 'column'
         }
    },
    skeleton: {
        [theme.breakpoints.down('sm')]: {
            width: '100% !important'
        }
    },
    header: {
        color: '#222',
        textDecoration: 'none'
    },
    lines: {
        flexGrow: "1",
        [theme.breakpoints.down('sm')]: {
            width: '100% !important'
        }
    }
}));

const AuthorCardSkeleton = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                component={Skeleton}
                width={60}
                height={60}
            />
            <CardContent className={classes.content}>
                <Grid container justify="space-between" alignItems="flex-start" wrap="nowrap" className={classes.contentGrid}>
                    <Grid item className={classes.lines}>
                        <Box>
                            <Skeleton width="40%" height={40} className={classes.skeleton}/>
                            <Skeleton width="40%" className={classes.skeleton}/>
                            <Box m="1rem 0 0">
                                <Skeleton width="40%" className={classes.skeleton}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Skeleton width={100} height={50}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};


export default AuthorCardSkeleton;

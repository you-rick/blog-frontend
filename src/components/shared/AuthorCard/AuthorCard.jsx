import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import {Grid, Box, Button, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {follow, unfollow} from "../../../store/usersReducer";
import {setNote} from "../../../store/notificationReducer";
import {useParams} from 'react-router-dom';

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
        margin: theme.spacing(2)
    },
    header: {
        color: "#222",
        textDecoration: 'none'
    }
}));

const AuthorCard = (props) => {
    const {id} = useParams();
    const classes = useStyles();
    const {followers} = props;
    const noAuthMsg = "User should be logged in";
    const [avatar, setAvatar] = useState("/images/placeholder/default-avatar.png");
    const followCondition = followers.some(id => id === props.profile._id);
    const [isFollowed, setIsFollowed] = useState(followCondition);
    const [showAbout, setShowAbout] = useState(false);


    useEffect(() => {
        props.photo && setAvatar(process.env.REACT_APP_SERVER_URL + props.photo);
    }, [props.photo]);

    useEffect(() => {
        setIsFollowed(followCondition);
    }, [followers]);

    useEffect(() => {
       id && setShowAbout(true);
    }, []);


    const handleFollow = () => {
        if (!props.profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isFollowed && props.follow(props._id);
            isFollowed && props.unfollow(props._id);
        }
    };

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={avatar}
                title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
                <Grid container justify="space-between" alignItems="flex-start" wrap="nowrap">
                    <Grid item>
                        <Typography
                            gutterBottom
                            variant="h6"
                            className={classes.header}
                            component={props.profile._id !== props._id ? NavLink : "h4"}
                            to={`/authors/${props._id}`}>
                            {props.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Member since -
                            <Moment format="MMMM YYYY">
                                {props.date}
                            </Moment>
                        </Typography>
                        <Box m="1rem 0 0">

                        </Box>
                        {showAbout &&
                        <Box m="1rem 0">
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.about}
                            </Typography>
                        </Box>
                        }
                        <Typography variant="subtitle2" color="textSecondary">
                            {props.followers.length} followers, {props.following.length} following
                        </Typography>
                    </Grid>
                    <Grid item>
                        {(props.profile._id !== props._id) &&
                        <Button variant="outlined" color="primary" onClick={handleFollow}>
                            {!isFollowed ? 'Follow' : 'Unfollow'}
                        </Button>
                        }
                    </Grid>
                </Grid>


            </CardContent>

        </Card>
    )
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, {follow, unfollow, setNote})(AuthorCard);

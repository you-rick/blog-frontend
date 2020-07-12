import React, {useEffect, useState} from "react";
import {Grid, Avatar, Typography, Box, Button} from "@material-ui/core";
import {connect} from "react-redux";
import {follow, unfollow} from "../../../../../store/usersReducer";
import {setNote} from "../../../../../store/notificationReducer";
import {NavLink} from "react-router-dom";


const AuthorInfo = (props) => {
    const noAuthMsg = "User should be logged in";
    const [avatar, setAvatar] = useState("/images/placeholder/default-avatar.png");
    const {followers} = props;
    const followCondition = followers.some(id => id === props.profile._id);
    const [isFollowed, setIsFollowed] = useState(followCondition);

    useEffect(() => {
        props.photo && setAvatar(process.env.REACT_APP_SERVER_URL + props.photo);
    }, [props.photo]);

    useEffect(() => {
        setIsFollowed(followCondition);
    }, [followers]);


    const handleFollow = () => {
        if (!props.profile.isAuth) {
            props.setNote({msg: noAuthMsg});
        } else {
            !isFollowed && props.follow(props._id);
            isFollowed && props.unfollow(props._id);
        }
    };

    return (
        <>
            <Grid container justify="flex-start" alignItems="center">
                <Avatar alt="Remy Sharp" src={avatar}/>
                <Grid item>
                    <Grid container justify="flex-start" alignItems="center">
                        <Grid item>
                            <Box m="0 1.5rem 0 1rem">
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    component={props.profile._id !== props._id ? NavLink : "span"}
                                    to={`/author/${props._id}`}>
                                    {props.fullName}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {props.followers.length} followers, {props.following.length} following
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            {(props.profile._id !== props._id) &&
                            <Button variant="outlined" size="small" color="primary" onClick={handleFollow}>
                                {!isFollowed ? 'Follow' : 'Unfollow'}
                            </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};


const mapStateToProps = (state) => ({
    profile: state.profile
});


export default connect(mapStateToProps, {follow, unfollow, setNote})(AuthorInfo);

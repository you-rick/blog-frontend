import React from "react";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import SavedArticles from "./SavedArticles/SavedArticles";
import LikedArticles from "./LikedArticles/LikedArticles";
import FollowedAuthors from "./FollowedAuthors/FollowedAuthors";
import MyArticles from "./MyArticles/MyArticles";
import ArticleForm from "./MyArticles/ArticleForm/ArticleForm";
import Profile from "./Profile/Profile";
import ProfileForm from "./Profile/ProfileForm/ProfileForm";

const Dashboard = (props) => {
    let url = props.match.url;

    if (!props.isAuth) {
        return <Redirect to='/login'/>
    }

    return (
        <Switch>
            <Route exact path={`${url}/`} render={() => <Profile/>}/>
            <Route path={`${url}/edit`} render={() => <ProfileForm/>}/>
            <Route path={`${url}/saved`} render={() => <SavedArticles/>}/>
            <Route path={`${url}/liked`} render={() => <LikedArticles/>}/>
            <Route path={`${url}/followed`} render={() => <FollowedAuthors/>}/>
            <Route exact path={`${url}/articles`} render={() => <MyArticles/>}/>
            <Route path={`${url}/articles/add`} render={() => <ArticleForm/>}/>
            <Route path={`${url}/articles/edit/:slug`} render={() => <ArticleForm/>}/>
        </Switch>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.profile.isAuth
});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(Dashboard);

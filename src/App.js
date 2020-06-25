import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {hideNote} from "./store/notificationReducer";

import Header from "./components/shared/Header/Header";
import Home from "./components/public/Home/Home";
import Articles from "./components/public/Articles/Articles";
import Article from "./components/public/Articles/Article/Article";
import Authors from "./components/public/Authors/Authors"
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import SavedArticles from "./components/dashboard/SavedArticles/SavedArticles";
import FollowedAuthors from "./components/dashboard/FollowedAuthors/FollowedAuthors";
import MyArticles from "./components/dashboard/MyArticles/MyArticles";
import ArticleForm from "./components/dashboard/MyArticles/ArticleForm/ArticleForm";
import Notification from "./components/shared/Notification/Notification";
import Profile from "./components/dashboard/Profile/Profile";

const AppContainer = (props) => {
    return (
        <BrowserRouter>
            <div className="appWrapper">
                <Header/>
                
                <div className="mainContainer">
                    <Switch>
                        <Route exact path="/" render={() => <Home/>}/>
                        <Route exact path="/articles" render={() => <Articles/>}/>
                        <Route path="/articles/:id?" render={() => <Article/>}/>
                        <Route exact path="/authors" render={() => <Authors/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="/register" render={() => <Register/>}/>

                        <Route exact path="/profile" render={() => <Profile/>}/>
                        <Route path="/profile/saved" render={() => <SavedArticles/>}/>
                        <Route path="/profile/followed" render={() => <FollowedAuthors/>}/>
                        <Route exact path="/profile/articles" render={() => <MyArticles/>}/>
                        <Route path="/profile/articles/add" render={() => <ArticleForm/>}/>
                    </Switch>
                </div>

                <Notification type={props.notification.type} msg={props.notification.msg} hideNote={props.hideNote} />
            </div>
        </BrowserRouter>
    );
};


const mapStateToProps = (state) => ({
    notification: state.notification
});




let AppWrapper = compose(withRouter, connect(mapStateToProps, {hideNote}))(AppContainer);

const App = () => {
    return (
        <BrowserRouter>
            <AppWrapper/>
        </BrowserRouter>
    );
};


export default App;

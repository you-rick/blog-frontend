import React, {useEffect} from 'react';
import {Router, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store/store";
import {compose} from "redux";
import {connect} from "react-redux";
import {hideNote} from "./store/notificationReducer";
import {initializeApp} from "./store/appReducer";

import Header from "./components/shared/Header/Header";
import Home from "./components/public/Home/Home";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Notification from "./components/shared/Notification/Notification";
import Dashboard from "./components/dashboard/Dashboard";
import Preloader from "./components/shared/Preloader/Preloader";
import AuthorsContainer from "./components/public/Authors/AuthorsContainer";
import Articles from "./components/public/Articles/Articles/Articles";
import Article from "./components/public/Articles/Article/Article";
import NotFound from "./components/public/NotFound/NotFound";

const AppContainer = (props) => {
    useEffect(() => {
        props.initializeApp();
    }, []);


    if (!props.initialized) {
        return <Preloader/>
    }

    return (

        <div className="appWrapper">
            <Header/>

            <div className="mainContainer">
                <Switch>
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route path="/category/:slug/:page?" render={() => <Articles/>}/>
                    <Route path="/articles/:page?" render={() => <Articles/>}/>
                    <Route path="/article/:slug" render={() => <Article/>}/>
                    <Route path="/authors" render={() => <AuthorsContainer/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                    <Route path="/register" render={() => <Register/>}/>
                    <Route path="/profile" render={() => <Dashboard/>}/>
                    <Route path="/404" render={() => <NotFound/>}/>
                    <Redirect to="/404"/>
                </Switch>
            </div>

            <Notification type={props.notification.type}
                          msg={props.notification.msg}
                          hideNote={props.hideNote}
            />
        </div>

    );
};


const mapStateToProps = (state) => ({
    notification: state.notification,
    initialized: state.app.initialized
});


const App = compose(withRouter, connect(mapStateToProps, {hideNote, initializeApp}))(AppContainer);

export default App;

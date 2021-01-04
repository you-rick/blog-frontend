import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hideNote } from './store/notificationReducer';
import { initializeApp } from './store/appReducer';

import Header from './components/shared/Header/Header';
import Home from './components/public/Home/Home';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Notification from './components/shared/Notification/Notification';
import Dashboard from './components/dashboard/Dashboard';
import Preloader from './components/shared/Preloader/Preloader';
import Articles from './components/public/Articles/Articles/Articles';
import Article from './components/public/Articles/Article/Article';
import NotFound from './components/public/NotFound/NotFound';
import Footer from './components/shared/Footer/Footer';
import Authors from './components/public/Authors/Authors/Authors';
import Author from './components/public/Authors/Author/Author';

const AppContainer = ({ initializeApp, initialized, notification, hideNote }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className="appWrapper">
      <Header />

      <div className="mainContainer">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/category/:slug/:page?" render={() => <Articles />} />
          <Route path="/articles/:page?" render={() => <Articles />} />
          <Route path="/article/:slug" render={() => <Article />} />
          <Route path="/authors/:page?" render={() => <Authors />} />
          <Route path="/author/:id" render={() => <Author />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/profile" render={() => <Dashboard />} />
          <Route path="/404" render={() => <NotFound />} />
          <Redirect to="/404" />
        </Switch>
      </div>

      <Footer />
      <Notification type={notification.type} msg={notification.msg} hideNote={hideNote} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  initialized: state.app.initialized,
  isDataFetching: state.app.isDataFetching,
});

const App = compose(withRouter, connect(mapStateToProps, { hideNote, initializeApp }))(AppContainer);

export default App;

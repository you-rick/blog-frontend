import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Header from "./components/shared/Header/Header";
import Home from "./components/public/Home/Home";
import Articles from "./components/public/Articles/Articles";
import Article from "./components/public/Articles/Article/Article";
import Authors from "./components/public/Authors/Authors"

function AppContainer() {
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
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

let AppWrapper = withRouter(AppContainer);

const App = () => {
    return (
        <BrowserRouter>
            <AppWrapper/>
        </BrowserRouter>
    );
};


export default App;

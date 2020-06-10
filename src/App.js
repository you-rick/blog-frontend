import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Header from "./components/shared/Header/Header";
import Home from "./components/public/Home/Home";
import Articles from "./components/public/Articles/Articles";

function AppContainer() {
    return (
        <BrowserRouter>
            <div className="appWrapper">
                <Header/>
                
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Home/>}/>
                        <Route path="/articles" render={() => <Articles/>}/>
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

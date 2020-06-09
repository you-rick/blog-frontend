import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Header from "./components/shared/header/Header";
import Home from "./components/public/home/Home";

function AppContainer() {
    return (
        <BrowserRouter>
            <div className="appWrapper">
                <Header/>
                
                <div>
                    <Switch>
                        <Route path="/" render={() => <Home/>}/>
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

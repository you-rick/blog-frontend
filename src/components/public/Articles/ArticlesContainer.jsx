import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import Article from "./Article/Article";
import Articles from "./Articles/Articles";

const ArticlesContainer = (props) => {
    const url = props.match.url;
    return (
        <Switch>
            <Route path={`${url}/:page?`} render={() => <Articles/>}/>
            <Route path={`${url}/:slug`} render={() => <Article/>}/>
        </Switch>
    );
};


export default withRouter(ArticlesContainer);

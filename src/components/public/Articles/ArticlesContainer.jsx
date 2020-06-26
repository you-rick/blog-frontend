import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import Article from "./Article/Article";
import Articles from "./Articles/Articles";

const ArticlesContainer = (props) => {
    let url = props.match.url;
    return (
        <>
            <Switch>
                <Route path={`${url}`} render={() => <Articles/>}/>
                <Route path={`${url}/:id?`} render={() => <Article/>}/>
            </Switch>
        </>
    );
};


export default withRouter(ArticlesContainer);

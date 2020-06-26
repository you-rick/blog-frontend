import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import Authors from "./Authors/Authors";
import Author from "./Author/Author";

const ArticlesContainer = (props) => {
    let url = props.match.url;
    return (
        <>
            <Switch>
                <Route path={`${url}`} render={() => <Authors/>}/>
                <Route path=path={`${url}/:id?`} render={() => <Author/>}/>
            </Switch>
        </>
    );
};


export default withRouter(ArticlesContainer);

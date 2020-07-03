import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import Authors from "./Authors/Authors";
import Author from "./Author/Author";

const AuthorsContainer = (props) => {
    let url = props.match.url;
    return (
        <>
            <Switch>
                <Route exact path={`${url}/`} render={() => <Authors/>}/>
                <Route path={`${url}/:id`} render={() => <Author/>}/>
            </Switch>
        </>
    );
};


export default withRouter(AuthorsContainer);

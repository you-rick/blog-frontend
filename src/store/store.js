import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";

import thunkMiddleware from "redux-thunk";
import reducersGroup from "./reducers";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

// For Redux Browser Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducersGroup(history),
    composeEnhancers(applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
    ))
);
window.__store__ = store;

export default store;

import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import thunkMiddleware from "redux-thunk";
import usersReducer from "./usersReducer";
import categoriesReducer from "./categoriesReducer";
import articlesReducer from "./articlesReducer";
import profileReducer from "./profileReducer";
import {reducer as formReducer} from "redux-form";

const redusersGroup = combineReducers({
    users: usersReducer,
    profile: profileReducer,
    //articles: articlesReducer,
    //categories: categoriesReducer,
    form: formReducer
});


// For Redux Browser Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusersGroup, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;

import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import usersReducer from "./usersReducer";
import categoriesReducer from "./categoriesReducer";
import articlesReducer from "./articlesReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";


const reducersGroup = (history) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    users: usersReducer,
    profile: profileReducer,
    articles: articlesReducer,
    categories: categoriesReducer,
    notification: notificationReducer,
    form: formReducer
});


export default reducersGroup;

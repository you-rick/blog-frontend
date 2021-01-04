import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import categoriesReducer from './categoriesReducer';
import articlesReducer from './articlesReducer';
import profileReducer from './profileReducer';
import notificationReducer from './notificationReducer';
import appReducer from './appReducer';
import sidebarReducer from './sidebarReducer';

const reducersGroup = (history) => combineReducers({
  router: connectRouter(history),
  sidebar: sidebarReducer,
  app: appReducer,
  users: usersReducer,
  profile: profileReducer,
  articles: articlesReducer,
  categories: categoriesReducer,
  notification: notificationReducer,
  form: formReducer,
});

export default reducersGroup;

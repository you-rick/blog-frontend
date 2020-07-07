import {articlesAPI, usersAPI} from "../api/api";
import {toggleIsFetching} from "./appReducer";


// Actions
const SET_USERS = 'SIDEBAR_SET_USERS';
const SET_ARTICLES = 'SIDEBAR_SET_ARTICLES';

let initialState = {
    users: [],
    articles: []
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {...state, articles: [...action.articles]};
        case SET_USERS:
            return {...state, users: [...action.users]};
        default:
            return state;
    }
};


// Action Creators
export const setArticles = (articles) => ({type: SET_ARTICLES, articles: articles});
export const setUsers = (users) => ({type: SET_USERS, users: users});


// Thunks
export const requestSidebarArticles = (page, pageSize, author, category) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        articlesAPI.getArticles(page, pageSize, author, category)
            .then(response => {
                dispatch(toggleIsFetching(false));
                let res = response.data;
                if (res.status) {
                    dispatch(setArticles(res.articles));
                }
            });
    }
};

export const requestSidebarUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(page, pageSize)
            .then(response => {
                dispatch(toggleIsFetching(false));
                let res = response.data;
                if (res.status) {
                    dispatch(setUsers(res.users));
                }
            });
    }
};

export default sidebarReducer;

import {articlesAPI} from "../api/api";
import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";
import {reset} from "redux-form";


// Actions
const SET_ARTICLES = 'SET_ARTICLES';
const SET_CURRENT_PAGE = 'articles/SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'articles/SET_TOTAL_PAGES';
const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';

let initialState = {
    articles: [],
    currentArticle: {},
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {...state, articles: action.articles};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_PAGES:
            return {...state, totalPages: action.totalPages};
        case SET_CURRENT_ARTICLE:
            return {...state, currentArticle: {...action.article}};
        default:
            return state;
    }
};


// Action Creators
export const setArticles = (articles) => ({type: SET_ARTICLES, articles: articles});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalPages = (totalPages) => ({type: SET_TOTAL_PAGES, totalPages: totalPages});
export const setCurrentArticle = (article) => ({type: SET_CURRENT_ARTICLE, articles: article});



// Thunk Creators
export const requestArticles = (page, pageSize) => {
    return (dispatch) => {
        articlesAPI.getArticles(page, pageSize)
            .then(response => {
                if (response.status) {
                    dispatch(setArticles(response.articles));
                    dispatch(setCurrentPage(response.currentPage));
                    dispatch(setTotalPages(response.totalPages));
                }
            });
    }
};

export const requestArticleById = (articleId) => {
    return (dispatch) => {
        articlesAPI.getArticleById(articleId)
            .then(response => {
                if (response.status) {
                    dispatch(setCurrentArticle(response.article));
                }
            });
    }
};

export const postArticle = (data) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(hideNote());
        articlesAPI.postArticle(data)
            .then(response => {
                let res = response.data;
                console.log(res);
                dispatch(toggleIsFetching(false));
                if (res.status) {
                    dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
                    dispatch(reset('register'));
                } else {
                    dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
                }
            }).catch(error => {
            dispatch(toggleIsFetching(false));
            error.response && dispatch(setNote({msg: error.response.data.message, type: "error", error: true, success: false}));
        });
    }
};

export default articlesReducer;

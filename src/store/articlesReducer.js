import {articlesAPI} from "../api/api";
import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";


// Actions
const SET_ARTICLES = 'SET_ARTICLES';
const SET_CURRENT_PAGE = 'articles/SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'articles/SET_TOTAL_PAGES';
const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';

let initialState = {
    list: [],
    currentArticle: {
        _id: null,
        title: null,
        slug: null,
        description: null,
        content: '',
        image: '',
        date: null,
        category: null,
        author: null,
        saved: [],
        liked: []

    },
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {...state, list: [...action.articles]};
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
export const setCurrentArticle = (article) => ({type: SET_CURRENT_ARTICLE, article: article});


// Thunk Creators
export const requestArticles = (page, pageSize, author, category) => {
    return (dispatch) => {
        articlesAPI.getArticles(page, pageSize, author, category)
            .then(response => {
                let res = response.data;
                if (res.status) {

                    dispatch(setArticles(res.articles));
                    dispatch(setCurrentPage(res.currentPage));
                    dispatch(setTotalPages(res.totalPages));
                }
            });
    }
};

export const requestArticleBySlug = (slug) => {
    return (dispatch) => {
        articlesAPI.getArticleBySlug(slug)
            .then(response => {
                let res = response.data;
                if (res.status) {
                    dispatch(setCurrentArticle(res.article[0]));
                }
            });
    }
};


const handleArticle = (dispatch, data, apiMethod) => {
    dispatch(toggleIsFetching(true));
    dispatch(hideNote());
    apiMethod(data)
        .then(response => {
            let res = response.data;
            dispatch(toggleIsFetching(false));
            if (res.status) {
                dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
            } else {
                dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
            }
        }).catch(error => {
        dispatch(toggleIsFetching(false));
        error.response && dispatch(setNote({
            msg: error.response.data.message,
            type: "error",
            error: true,
            success: false
        }));
    });
};

export const postArticle = (data) => {
    return (dispatch) => {
        handleArticle(dispatch, data, articlesAPI.postArticle.bind(articlesAPI));
    }
};

export const updateArticle = (data) => {
    return (dispatch) => {
        handleArticle(dispatch, data, articlesAPI.updateArticle.bind(articlesAPI));
    }
};

export default articlesReducer;

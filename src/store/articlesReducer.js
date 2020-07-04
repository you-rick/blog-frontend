import {articlesAPI, usersAPI} from "../api/api";
import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";
import {setCurrentUser} from "./usersReducer";
import {toggleArrayEl} from "../utils/helpers/object-helpers";
import {push} from "connected-react-router";


// Actions
const LIKE_TOGGLE = 'ARTICLE_LIKE_TOGGLE';
const SAVE_TOGGLE = 'ARTICLE_SAVE_TOGGLE';
const SET_ARTICLES = 'SET_ARTICLES';
const SET_CURRENT_PAGE = 'ARTICLE_SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'ARTICLE_SET_TOTAL_PAGES';
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
            return {
                ...state,
                currentArticle: {...action.article}
            };
        case LIKE_TOGGLE:
        case SAVE_TOGGLE:
            let currentArticleProp = {};
            currentArticleProp[action.property] = state.currentArticle._id === action.articleId
                ? [...toggleArrayEl(state.currentArticle[action.property], action.userId)]
                : state.currentArticle[action.property];

            return {
                ...state,
                list: [...state.list.map(el => {
                    if (el._id === action.articleId) {
                        el[action.property] = [...toggleArrayEl(el[action.property], action.userId)];
                    }
                    return el
                })],
                currentArticle: {
                    ...state.currentArticle,
                    ...currentArticleProp
                }
            };
        default:
            return state;
    }
};


// Action Creators
export const setArticles = (articles) => ({type: SET_ARTICLES, articles: articles});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalPages = (totalPages) => ({type: SET_TOTAL_PAGES, totalPages: totalPages});
export const setCurrentArticle = (article) => ({type: SET_CURRENT_ARTICLE, article: article});
export const likeToggle = (articleId, userId) => ({
    type: LIKE_TOGGLE,
    articleId: articleId,
    userId: userId,
    property: 'liked'
});
export const saveToggle = (articleId, userId) => ({
    type: SAVE_TOGGLE,
    articleId: articleId,
    userId: userId,
    property: 'saved'
});


// Thunks
export const requestArticles = (page, pageSize, author, category) => {
    return (dispatch) => {
        articlesAPI.getArticles(page, pageSize, author, category)
            .then(response => {
                let res = response.data;
                if (res.status) {
                    console.log(res);
                    dispatch(setArticles(res.articles));
                    dispatch(setCurrentPage(res.currentPage));
                    dispatch(setTotalPages(res.totalPages));
                }
            });
    }
};

export const requestArticleBySlug = (slug) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        articlesAPI.getArticleBySlug(slug)
            .then(articleData => {
                let res = articleData.data;
                if (res.status) {
                    dispatch(setCurrentArticle(res.article[0]));

                    let userId = res.article[0].author;
                    console.log(userId);
                    usersAPI.getUserById(userId).then(userData => {
                        let res = userData.data;
                        console.log(res.user);
                        if (res.status) {
                            dispatch(setCurrentUser(res.user));
                            dispatch(toggleIsFetching(false));

                        }
                    })
                }
            })
            .catch(error => {
                dispatch(toggleIsFetching(false));
                dispatch(push('/articles'));
                error.response && dispatch(setNote({
                    msg: error.response.data.message,
                    type: "error",
                    error: true,
                    success: false
                }));
            });
        ;
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

const handleLikeSave = (dispatch, articleId, apiMethod, actionCreator) => {
    dispatch(toggleIsFetching(true));
    dispatch(hideNote());

    apiMethod(articleId)
        .then(response => {
            let res = response.data;
            dispatch(toggleIsFetching(false));
            if (res.status) {
                dispatch(actionCreator(articleId, res.user));
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


export const like = (articleId) => {
    return (dispatch) => {
        handleLikeSave(dispatch, articleId, articlesAPI.like.bind(articlesAPI), likeToggle);
    }
};
export const unlike = (articleId) => {
    return (dispatch) => {
        handleLikeSave(dispatch, articleId, articlesAPI.unlike.bind(articlesAPI), likeToggle);
    }
};
export const save = (articleId) => {
    return (dispatch) => {
        handleLikeSave(dispatch, articleId, articlesAPI.save.bind(articlesAPI), saveToggle);
    }
};
export const unsave = (articleId) => {
    return (dispatch) => {
        handleLikeSave(dispatch, articleId, articlesAPI.unsave.bind(articlesAPI), saveToggle);
    }
};

export default articlesReducer;

import { push } from 'connected-react-router';
import { articlesAPI, usersAPI } from '../api';
import { toggleIsFetching } from './appReducer';
import { hideNote, setNote } from './notificationReducer';
import { setCurrentUser } from './usersReducer';
import { toggleArrayEl } from '../utils/helpers/object-helpers';

// Actions
const LIKE_TOGGLE = 'ARTICLE_LIKE_TOGGLE';
const SAVE_TOGGLE = 'ARTICLE_SAVE_TOGGLE';
const SET_ARTICLES = 'SET_ARTICLES';
const SET_INFINITE_ARTICLES = 'SET_INFINITE_ARTICLES';
const SET_CURRENT_PAGE = 'ARTICLE_SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'ARTICLE_SET_TOTAL_PAGES';
const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
const SET_TOTAL_ARTICLES = 'SET_TOTAL_ARTICLES';

const initialState = {
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
    liked: [],

  },
  pageSize: 10,
  totalPages: 1,
  currentPage: 1,
  totalArticles: 0,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, list: [...action.articles] };
    case SET_INFINITE_ARTICLES:
      if (parseInt(action.page, 10) === 1) {
        return { ...state, list: [...action.articles] };
      }
      return { ...state, list: [...state.list, ...action.articles] };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.totalPages };
    case SET_TOTAL_ARTICLES:
      return { ...state, totalArticles: action.totalArticles };
    case SET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: { ...action.article },
      };
    case LIKE_TOGGLE:
    case SAVE_TOGGLE: {
      const currentArticleProp = {};
      currentArticleProp[action.property] = state.currentArticle._id === action.articleId
        ? [...toggleArrayEl(state.currentArticle[action.property], action.userId)]
        : state.currentArticle[action.property];

      return {
        ...state,
        list: [...state.list.map((el) => {
          if (el._id === action.articleId) {
            el[action.property] = [...toggleArrayEl(el[action.property], action.userId)];
          }
          return el;
        })],
        currentArticle: {
          ...state.currentArticle,
          ...currentArticleProp,
        },
      };
    }
    default:
      return state;
  }
};

// Action Creators
export const setArticles = (articles) => ({ type: SET_ARTICLES, articles });
export const setInfiniteArticles = (articles, page) => ({
  type: SET_INFINITE_ARTICLES,
  articles,
  page,
});
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalArticles = (totalArticles) => ({ type: SET_TOTAL_ARTICLES, totalArticles });
export const setTotalPages = (totalPages) => ({ type: SET_TOTAL_PAGES, totalPages });
export const setCurrentArticle = (article) => ({ type: SET_CURRENT_ARTICLE, article });
export const likeToggle = (articleId, userId) => ({
  type: LIKE_TOGGLE,
  articleId,
  userId,
  property: 'liked',
});
export const saveToggle = (articleId, userId) => ({
  type: SAVE_TOGGLE,
  articleId,
  userId,
  property: 'saved',
});

// Thunks
export const requestArticles = (page = 1, pageSize = 10, author, category, best, likedBy, savedBy, component) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  (page * 1) === 1 && dispatch(setArticles([]));

  articlesAPI.getArticles(page, pageSize, author, category, best, likedBy, savedBy)
    .then((response) => {
      const res = response.data;
      if (res.status) {
        dispatch(toggleIsFetching(false));
        if (component === 'Infinite') {
          dispatch(setInfiniteArticles(res.articles, page));
        } else {
          dispatch(setArticles(res.articles));
        }

        dispatch(setTotalArticles(res.totalArticles));
        dispatch(setCurrentPage(res.currentPage));
        dispatch(setTotalPages(res.totalPages));
      }
    });
};

export const requestArticleBySlug = (slug) => (dispatch) => {
  dispatch(setCurrentArticle(initialState.currentArticle));
  dispatch(toggleIsFetching(true));
  articlesAPI.getArticleBySlug(slug)
    .then((articleData) => {
      const res = articleData.data;
      if (res.status) {
        dispatch(setCurrentArticle(res.article[0]));

        const userId = res.article[0].author;
        usersAPI.getUserById(userId).then((userData) => {
          const res = userData.data;
          if (res.status) {
            dispatch(setCurrentUser(res.user));
            dispatch(toggleIsFetching(false));
          }
        });
      }
    })
    .catch(({ response }) => {
      dispatch(toggleIsFetching(false));
      dispatch(push('/articles'));
      response && dispatch(setNote({
        msg: response.data.message,
        type: 'error',
        error: true,
        success: false,
      }));
    });
};

const handleArticle = (dispatch, data, apiMethod) => {
  dispatch(toggleIsFetching(true));
  dispatch(hideNote());
  apiMethod(data)
    .then((response) => {
      const res = response.data;
      dispatch(toggleIsFetching(false));
      if (res.status) {
        dispatch(setNote({ msg: res.message, type: 'success', error: false, success: true }));
        dispatch(push('/profile'));
      } else {
        dispatch(setNote({ msg: res.message, type: 'error', error: true, success: false }));
      }
    }).catch((error) => {
      dispatch(toggleIsFetching(false));
      error.response && dispatch(setNote({
        msg: error.response.data.message,
        type: 'error',
        error: true,
        success: false,
      }));
    });
};

export const postArticle = (data) => (dispatch) => {
  handleArticle(dispatch, data, articlesAPI.postArticle.bind(articlesAPI));
};

export const updateArticle = (data) => (dispatch) => {
  handleArticle(dispatch, data, articlesAPI.updateArticle.bind(articlesAPI));
};

const handleLikeSave = (dispatch, articleId, apiMethod, actionCreator) => {
  dispatch(toggleIsFetching(true));
  dispatch(hideNote());

  apiMethod(articleId)
    .then((response) => {
      const res = response.data;
      dispatch(toggleIsFetching(false));
      if (res.status) {
        dispatch(actionCreator(articleId, res.user));
        dispatch(setNote({ msg: res.message, type: 'success', error: false, success: true }));
      } else {
        dispatch(setNote({ msg: res.message, type: 'error', error: true, success: false }));
      }
    }).catch((error) => {
      dispatch(toggleIsFetching(false));
      error.response && dispatch(setNote({
        msg: error.response.data.message,
        type: 'error',
        error: true,
        success: false,
      }));
    });
};

export const like = (articleId) => (dispatch) => {
  handleLikeSave(dispatch, articleId, articlesAPI.like.bind(articlesAPI), likeToggle);
};
export const unlike = (articleId) => (dispatch) => {
  handleLikeSave(dispatch, articleId, articlesAPI.unlike.bind(articlesAPI), likeToggle);
};
export const save = (articleId) => (dispatch) => {
  handleLikeSave(dispatch, articleId, articlesAPI.save.bind(articlesAPI), saveToggle);
};
export const unsave = (articleId) => (dispatch) => {
  handleLikeSave(dispatch, articleId, articlesAPI.unsave.bind(articlesAPI), saveToggle);
};

export default articlesReducer;

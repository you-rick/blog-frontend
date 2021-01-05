import { push } from 'connected-react-router';
import { usersAPI } from '../api';
import { toggleIsFetching } from './appReducer';
import { hideNote, setNote } from './notificationReducer';
import { toggleArrayEl } from '../utils/helpers/object-helpers';

// Actions
const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'USERS_SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'USERS_SET_TOTAL_PAGES';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

const initialState = {
  list: [],
  currentUser: {
    fullName: null,
    photo: null,
    about: null,
    linkedin: null,
    facebook: null,
    categories: [],
    following: [],
    followers: [],
    saved: [],
    liked: [],
  },
  pageSize: 10,
  totalPages: 1,
  currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, list: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.totalPages };
    case SET_CURRENT_USER:
      return { ...state, currentUser: { ...action.user } };
    case FOLLOW_TOGGLE:
      return {
        ...state,
        list: [...state.list.map((el) => {
          if (el._id === action.authorId) {
            el.followers = [...toggleArrayEl(el.followers, action.userId)];
          }
          return el;
        })],
        currentUser: {
          ...state.currentUser,
          followers: state.currentUser._id === action.authorId
            ? [...toggleArrayEl(state.currentUser.followers, action.userId)]
            : state.currentUser.followers,
        },
      };
    default:
      return state;
  }
};

// Action Creators
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalPages = (totalPages) => ({ type: SET_TOTAL_PAGES, totalPages });
export const setCurrentUser = (user) => ({ type: SET_CURRENT_USER, user });
export const followToggle = (authorId, userId) => ({ type: FOLLOW_TOGGLE, authorId, userId });

// Thunks
export const requestUsers = (page, pageSize) => (dispatch) => {
  dispatch(setUsers(initialState.list));
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(page, pageSize)
    .then((response) => {
      const res = response.data;
      dispatch(toggleIsFetching(false));
      if (res.status) {
        dispatch(setUsers(res.users));
        dispatch(setCurrentPage(res.currentPage));
        dispatch(setTotalPages(res.totalPages));
      }
    });
};

export const requestUserById = (userId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  // dispatch(hideNote());
  usersAPI.getUserById(userId)
    .then((response) => {
      dispatch(toggleIsFetching(false));
      const res = response.data;
      if (res.status) {
        dispatch(setCurrentUser(res.user));
      }
    }).catch((error) => {
      dispatch(toggleIsFetching(false));
      dispatch(push('/authors'));
      error.response && dispatch(setNote({
        msg: error.response.data.message,
        type: 'error',
        error: true,
        success: false,
      }));
    });
};

// Follow Helper
const handleFollowUnfollow = (dispatch, authorId, apiMethod, actionCreator) => {
  dispatch(toggleIsFetching(true));
  dispatch(hideNote());

  apiMethod(authorId).then((response) => {
    const res = response.data;
    dispatch(toggleIsFetching(false));
    if (res.status) {
      dispatch(actionCreator(authorId, res.user));
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

// Follow Thunk Creators
export const follow = (authorId) => (dispatch) => {
  handleFollowUnfollow(dispatch, authorId, usersAPI.follow.bind(usersAPI), followToggle);
};

export const unfollow = (authorId) => (dispatch) => {
  handleFollowUnfollow(dispatch, authorId, usersAPI.unfollow.bind(usersAPI), followToggle);
};

export default usersReducer;

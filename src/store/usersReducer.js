import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";


// Actions
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_CURRENT_USER = 'SET_CURRENT_USER';


let initialState = {
    users: [],
    currentUser: {},
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_PAGES:
            return {...state, totalPages: action.totalPages};
        case SET_CURRENT_USER:
            return {...state, currentUser: {...action.user}};
        default:
            return state;
    }
};


// Action Creators
export const setUsers = (users) => ({type: SET_USERS, users: users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalPages = (totalPages) => ({type: SET_TOTAL_PAGES, totalPages: totalPages});
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user: user});
export const followSuccess = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId: userId});



// Thunk Creators
export const requestUsers = (page, pageSize) => {
    return (dispatch) => {
        usersAPI.getUsers(page, pageSize)
            .then(response => {
                if (response.status) {
                    dispatch(setUsers(response.users));
                    dispatch(setCurrentPage(response.currentPage));
                    dispatch(setTotalPages(response.totalPages));
                }
            });
    }
};


export const requestUserById = (userId) => {
    return (dispatch) => {
        usersAPI.getUserById(userId)
            .then(response => {
                if (response.status) {
                    dispatch(setCurrentUser(response.user));
                }
            });
    }
};

// Follow Helper
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    let response = await apiMethod(userId);
    if (response.status) {
        dispatch(actionCreator(userId));
    }
};

//Follow Thunk Creators
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
};


export const unfollow = (userId) => {
    return async (dispatch) => {
       followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
};

export default usersReducer;

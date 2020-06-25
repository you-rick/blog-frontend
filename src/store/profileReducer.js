import {profileAPI} from "../api/api";
import {setNote, hideNote} from "./notificationReducer";
import {reset} from "redux-form";


// Actions
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

let initialState = {
    fullName: null,
    email: null,
    photo: null,
    about: null,
    linkedin: null,
    facebook: null,
    categories: [],
    following: [],
    followers: [],
    saved: [],
    liked: [],
    isAuth: false,
    isFetching: false
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {...state, ...action.data};
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_AUTH_STATUS:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

// Action Creators
export const setProfileData = (data) => ({type: SET_PROFILE_DATA, data: data});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setAuthStatus = (isAuth) => ({type: SET_AUTH_STATUS, isAuth});


// Thunk Creators
export const getProfile = () => {
    return (dispatch) => {
        profileAPI.me()
            .then(response => {
                let res = response.data;
                if (res.status) {
                    dispatch(setProfileData(res.user));
                    dispatch(setAuthStatus(true));
                }
            });
    }
};

export const register = (data) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(hideNote());
        profileAPI.register(data)
            .then(response => {
                let res = response.data;
                dispatch(toggleIsFetching(false));
                if (res.status) {
                    dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
                    dispatch(reset('register'));
                } else {
                    dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
                }
            }).catch(error => {
            dispatch(toggleIsFetching(false));
            dispatch(setNote({msg: error.response.data.message, type: "error", error: true, success: false}));
        });
    }
};

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(hideNote());

        profileAPI.login(email, password)
            .then(response => {
                dispatch(toggleIsFetching(false));
                let res = response.data;
                if (res.status) {
                    localStorage.setItem('token', res.token)
                    setTimeout(() => {
                        dispatch(getProfile());
                    }, 100);
                }
            }).catch(error => {
            console.log(error.response);
            dispatch(toggleIsFetching(false));
            dispatch(setNote({msg: error.response.data.message, type: "error", error: true, success: false}));

        });
    }
};


export const logout = () => {
    return (dispatch) => {
        dispatch(setAuthStatus(true));
        localStorage.removeItem('token');
    }
};

export default profileReducer;

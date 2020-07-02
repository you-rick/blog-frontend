import {profileAPI} from "../api/api";
import {setNote, hideNote} from "./notificationReducer";
import {reset} from "redux-form";
import {toggleIsFetching} from "./appReducer";


// Actions
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS';


let initialState = {
    _id: null,
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
    articles: []
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {...state, ...action.data};
        case SET_AUTH_STATUS:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

// Action Creators
export const setProfileData = (data) => ({type: SET_PROFILE_DATA, data: data});
export const setAuthStatus = (isAuth) => ({type: SET_AUTH_STATUS, isAuth});


// Thunks
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
        dispatch(setAuthStatus(false));
        dispatch(setProfileData(initialState));
        localStorage.removeItem('token');
    }
};

export default profileReducer;

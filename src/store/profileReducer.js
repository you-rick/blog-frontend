import {profileAPI} from "../api/api";
import {setNote, hideNote} from "./notificationReducer";
import {reset} from "redux-form";


// Actions
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

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
        default:
            return state;
    }
};

// Action Creators
export const setProfileData = (data) => ({type: SET_PROFILE_DATA, data: data});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


// Thunk Creators
export const getProfile = () => {
    return (dispatch) => {
        profileAPI.me()
            .then(response => {
                if (response.status) {
                    dispatch(setProfileData(response.user));
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
        profileAPI.login(email, password)
            .then(response => {
                console.log(response);
            });
    }
};

export default profileReducer;

import {profileAPI} from "../api/api";

// Actions
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

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
    isAuth: false
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {...state, ...action.data};
        default:
            return state;
    }
};

// Action Creators
export const setProfileData = (data) => ({type: SET_PROFILE_DATA, data: data});


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
        profileAPI.register(data)
            .then(response => {
                console.log(response);
                //dispatch(setProfileData(response.user));
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

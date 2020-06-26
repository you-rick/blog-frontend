import {categoriesAPI} from "../api/api";

// Action
const SET_CATEGORIES = 'SET_CATEGORIES';

let initialState = {
    currentCategory: {},
    list: []
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {state, list: action.data};
        default:
            return state;
    }
};

// Action Creators
export const setCategories = (data) => ({type: SET_CATEGORIES, data: data});

// Thunk Creators
export const getCategories = () => {
    return (dispatch) => {
        categoriesAPI.getCategories()
            .then(response => {
                console.log(response);
                if (response.status) {
                    dispatch(setCategories(response.data));
                }

            });
    }
};

export default categoriesReducer;

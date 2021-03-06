import { categoriesAPI } from '../api';

// Action
const SET_CATEGORIES = 'SET_CATEGORIES';

const initialState = {
  currentCategory: {},
  list: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { state, list: action.data };
    default:
      return state;
  }
};

// Action Creators
export const setCategories = (data) => ({ type: SET_CATEGORIES, data });

// Thunks
export const getCategories = () => (dispatch) => {
  categoriesAPI.getCategories()
    .then((response) => {
      if (response.status) {
        dispatch(setCategories(response.data));
      }
    });
};

export default categoriesReducer;

import {getProfile} from "./profileReducer";
import {getCategories} from "./categoriesReducer";

// Actions
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false,
    isDataFetching: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case TOGGLE_IS_FETCHING: {
            return {...state, isDataFetching: action.isDataFetching}
        }
        default:
            return state;
    }
};

// Action Creators
export const toggleIsFetching = (isDataFetching) => ({type: TOGGLE_IS_FETCHING, isDataFetching});
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});


// Thunks
export const initializeApp = () => {
    return (dispatch) => {
        let promiseArray = [dispatch(getCategories())];
        localStorage.getItem('token') && promiseArray.push(dispatch(getProfile()));
        dispatch(toggleIsFetching(true));

        Promise.all(promiseArray).then(() => {
            setTimeout(() => {
                dispatch(toggleIsFetching(false));
                dispatch(initializedSuccess());
            }, 500);
        });
    }
};


export default appReducer;

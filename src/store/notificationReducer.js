export const SET_NOTE = "SET_NOTE";
export const HIDE_NOTE = "HIDE_NOTE";


const initState = {
    msg: "",
    type: "info",
    error: false,
    success: false
};

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_NOTE:
            return {...state, ...action.body};
        case HIDE_NOTE:
            return {...state, msg: null, type: "info", error: false, success: false};
        default:
            return state;
    }
};

// Action Creators
export const setNote = (body) => ({type: SET_NOTE, body: body});
export const hideNote = () => ({type: HIDE_NOTE});


export default notificationReducer;

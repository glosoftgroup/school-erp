import { SET_COURSES } from '../actions';

const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_COURSES:
        return action.payload;

    default:
        return state;
    }
};

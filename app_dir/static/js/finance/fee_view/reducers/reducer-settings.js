import { SET_SETTINGS } from '../actions';

const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_SETTINGS:
        return action.payload;

    default:
        return state;
    }
};

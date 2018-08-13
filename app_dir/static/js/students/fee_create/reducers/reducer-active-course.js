/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
import { COURSE_SELECTED } from '../actions/course.js';

const initialState = {
    id: null
};
export default function (state = initialState, action) {
    switch (action.type) {
    case COURSE_SELECTED:
        return action.payload;
    }
    return state;
}

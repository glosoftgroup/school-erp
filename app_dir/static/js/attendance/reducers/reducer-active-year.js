/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
import { ACADEMIC_YEAR_SELECTED} from '../actions/academic-year.js';

export default function (state = null, action) {
    switch (action.type) {
        case ACADEMIC_YEAR_SELECTED:
            return action.payload;
            break;
    }
    return state;
}
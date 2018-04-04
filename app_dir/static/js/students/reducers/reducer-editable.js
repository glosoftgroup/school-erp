/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
import {EDITABLE_SELECTED } from '../actions/editable';

const initial = {'editable':false}

export default function (state = initial, action) {
    switch (action.type) {
        case EDITABLE_SELECTED:
            return action.payload;
            break;
    }
    return state;
}


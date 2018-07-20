import { PARENT_SELECTED } from '../actions/parents';

export default function (state = [], action) {
    switch (action.type) {
        case PARENT_SELECTED:
            return action.payload;
            break;
    }
    return state;
}
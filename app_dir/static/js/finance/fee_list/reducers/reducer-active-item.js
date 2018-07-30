import { ITEM_SELECTED } from '../actions/action-items';

export default function (state = {}, action) {
    switch (action.type) {
    case ITEM_SELECTED:
        return action.payload;
        break;
    }
    return state;
}

import { SET_ITEMS, ADD_ITEM, ITEM_DELETED } from '../actions/action-items.js';

export default function students(state = [], action = {}) {
  switch(action.type) { 
    case ITEM_DELETED:
      return state.filter(item => item.id !== action.parentId);

    case ADD_ITEM:
      return [
        ...state,
        action.payload
      ];  
    case SET_ITEMS:
      return action.payload;
    default: return state;
  }
}
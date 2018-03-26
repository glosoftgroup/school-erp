import { PARENT_DELETED, SET_PARENTS, ADD_PARENT } from '../actions/parents.js';

export default function students(state = [], action = {}) {
  switch(action.type) { 
    case PARENT_DELETED:
      return state.filter(item => item.id !== action.parentId);

    case ADD_PARENT:
      return [
        ...state,
        action.payload
      ];  
    case SET_PARENTS:
      return action.payload;
    default: return state;
  }
}
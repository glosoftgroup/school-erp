import { SET_PARENTS, ADD_PARENT } from '../actions/parents.js';

export default function students(state = [], action = {}) {
  switch(action.type) { 
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
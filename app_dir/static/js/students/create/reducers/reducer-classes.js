import { SET_CLASSES } from '../actions/classes';

export default function clases(state = [], action = {}) {
  switch(action.type) {   
    case SET_CLASSES:
      return action.payload;
    default: return state;
  }
}
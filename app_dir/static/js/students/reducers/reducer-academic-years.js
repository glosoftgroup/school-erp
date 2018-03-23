import { SET_ACADEMICS } from '../actions/academics';

export default function clases(state = [], action = {}) {
  switch(action.type) {   
    case SET_ACADEMICS:
      return action.payload;
    default: return state;
  }
}
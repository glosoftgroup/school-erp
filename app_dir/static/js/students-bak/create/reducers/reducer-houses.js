import { SET_HOUSES } from '../actions/houses';

export default function clases(state = [], action = {}) {
  switch(action.type) {   
    case SET_HOUSES:
      return action.payload;
    default: return state;
  }
}
import { STUDENT_DELETED, STUDENT_UPDATED, SET_STUDENTS, ADD_STUDENT } from '../actions/students.js';

export default function students(state = [], action = {}) {
  switch(action.type) { 
    case STUDENT_DELETED:
      return state.filter(item => item.id !== action.parentId);

    case ADD_STUDENT:
      return [
        ...state,
        action.payload
      ];
    case STUDENT_UPDATED:
    return state.map(item => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });

    case SET_STUDENTS:
      return action.payload;
    default: return state;
  }
}
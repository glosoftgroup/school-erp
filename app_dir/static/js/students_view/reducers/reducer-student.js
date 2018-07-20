import { SET_GAMES, ADD_STUDENT, STUDENT_FETCHED, STUDENT_UPDATED, STUDENT_DELETED } from '../actions';

export default function students(state = [], action = {}) {
  switch(action.type) {
    case ADD_STUDENT:
      return [
        ...state,
        action.game
      ];

    case STUDENT_DELETED:
      return state.filter(item => item._id !== action.gameId);

    case STUDENT_UPDATED:
      return state.map(item => {
        if (item._id === action.game._id) return action.game;
        return item;
      });

    case STUDENT_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.game._id) return action.game;
          return item;
        });
      } else {
        return [
          ...state,
          action.game
        ];
      }

    case SET_GAMES:
      return action.games;
    default: return state;
  }
}
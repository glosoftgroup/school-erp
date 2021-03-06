import {
  TEST, CHANGE_STATUS, FETCH_YEARS, SET_TERM_YEAR,
  SET_CLASS, ERROR, FETCH_SUBJECTS, SET_SUBJECT,
  FETCH_EXAMS, SET_EXAM, FETCH_STUDENTS, CHANGE_COMMIT_STATUS,
  LOAD_COMMIT_STATUS, CHANGE_LOADING_STATUS } from '../actions/types';

const initialState = {
  status: {
    year: true,
    class: false,
    subject: false,
    exam: false,
    student: false
  },
  yearDetails: [],
  subjects: [],
  subject: null,
  exams: [],
  exam: null,
  students: [],
  teacher: null,
  class: null,
  term: null,
  year: null,
  error: null,
  is_committed: false,
  loading: true

};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_STATUS:
      let test = Object.assign({}, state.status);
      for (let [key, value] of Object.entries(test)) {
        key == action.payload ? test[key] = true : test[key] = false;
      }
      let year = action.payload == 'year' ? null : state.year;
      return {...state, status: test, year: year};

    case FETCH_YEARS:
      return {
        ...state,
        yearDetails: action.payload,
        error: null
      };

    case SET_TERM_YEAR:
      return {
        ...state,
        year: action.payload.year,
        term: action.payload.term,
        teacher: action.payload.year.teacher
      };

    case FETCH_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        error: null
      };

    case SET_SUBJECT:
      return {
        ...state,
        subject: action.payload
      };

    case FETCH_EXAMS:
      return {
        ...state,
        exams: action.payload,
        error: null
      };

    case SET_EXAM:
      return {
        ...state,
        exam: action.payload
      };

    case SET_CLASS:
      return {
        ...state,
        class: action.payload
      };

    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload,
        error: null
      };

    case LOAD_COMMIT_STATUS:
      return {
        ...state,
        is_committed: action.payload
      };

    case CHANGE_LOADING_STATUS:
      return {
        ...state,
        loading: false
      };
    case CHANGE_COMMIT_STATUS:
      return {
        ...state,
        is_committed: true
      };

    case ERROR:
      return {...state, error: 'Something went wrong'};
    default:
      return state;
  }
}

import api from '../api/Api'

export const SET_STUDENTS = 'SET_STUDENTS'
export const STUDENT_SELECTED = 'STUDENT_SELECTED'
export const ADD_STUDENT = 'ADD_STUDENT'
export const STUDENT_DELETED = 'STUDENT_DELETED'

export const selectStudents = (payload) => {
  return {
      type: SET_STUDENTS,
      payload
  }
};

export const selectStudent = (payload) => {
  return {
      type: STUDENT_SELECTED,
      payload
  }
};

export function studenctDeleted(parentId) {
  return {
    type: STUDENT_DELETED,
    parentId
  }
}

export const addStudenct = (payload) => {
  return {
    type: ADD_STUDENT,
    payload
  }
}

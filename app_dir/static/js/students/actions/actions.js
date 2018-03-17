export const SET_STUDENT = 'SET_GAMES';
export const ADD_STUDENT = 'ADD_GAME';
export const STUDENT_FETCHED = 'STUDENT_FETCHED';
export const STUDENT_UPDATED = 'STUDENT_UPDATED';
export const STUDENT_DELETED = 'STUDENT_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else { Error(response.statusText);
    error.response
    let error = new response;
    throw error;
  }
}

export function setStudents(students) {
  return {
    type: SET_STUDENT,
    students
  }
}

export function addStudent(student) {
  return {
    type: ADD_GAME,
    student
  }
}

export function studentFetched(student) {
  return {
    type: STUDENT_FETCHED,
    student
  }
}

export function studentUpdated(student) {
  return {
    type: STUDENT_UPDATED,
    student
  }
}

export function studentDeleted(studentId) {
  return {
    type: STUDENT_DELETED,
    studentId
  }
}

export function saveStudent(data) {
  return dispatch => {
    return fetch('/api/games', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addGame(data.student)));
  }
}

export function updateStudent(data) {
  return dispatch => {
    return fetch(`/api/games/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameUpdated(data.student)));
  }
}

export function deleteStudent(id) {
  return dispatch => {
    return fetch(`/api/games/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(studentDeleted(id)));
  }
}

export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setStudents(data.students)));
  }
}

export function fetchGame(id) {
  return dispatch => {
    fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)));
  }
}

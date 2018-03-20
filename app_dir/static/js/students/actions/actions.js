export const SET_STUDENT = 'SET_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const STUDENT_FETCHED = 'STUDENT_FETCHED';
export const STUDENT_UPDATED = 'STUDENT_UPDATED';
export const STUDENT_DELETED = 'STUDENT_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    console.log(error)
    error.response = response;
    
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
    type: ADD_STUDENT,
    student
  }
}

export const selectStudent = (student) => {
  console.log("You clicked on user: ", student.first_name);
  return {
      type: 'STUDENT_SELECTED',
      payload: student
  }
};

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
    dispatch(selectStudent(data.data))
  }
}

export function updateStudent(data) {
  return dispatch => {
    // return fetch(`/api/games/${data._id}`, {
    //   method: 'put',
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(handleResponse)
    // .then(data => dispatch(gameUpdated(data.student)));
    axios.put(updateUrl,data)
    .then(function (response) {
        alertUser('Data sent successfully');        
    })
    .then(data=> dispatch(studentUpdated(data)))
    .catch(function (error) {
        handleResponse(error);
    });

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
    // fetch('/api/games')
    //   .then(res => res.json())
    //   .then(data => dispatch(setStudents(data.students)));
    axios.get(updateUrl)
    .then(function (response) {
        response = response.data;        
    })
    .then(data=> dispatch(setStudents(data)))
    .catch(function (error) {
        console.log(error);
    });
  }
}

export function fetchStudent(id) {
  return dispatch => {
    
    axios.get(updateUrl)
    .then(function (response) {
        response = response.data;        
    })
    .then(data=> dispatch(studentFetched(data)))
    .catch(function (error) {
        handleResponse(error);
    });
  }
}

export function apiFetchStudent(id,callback){
  return dispatch => {
    axios.get(updateUrl)
    .then(function (response) {
        response = response; 
        callback()       
    })
    .then(data=> dispatch(selectStudent(data)))
    .catch(function (error) {
        // handleResponse(error);
        console.log('sdfsd sdfe')
        console.log(error)
    });
  }
}

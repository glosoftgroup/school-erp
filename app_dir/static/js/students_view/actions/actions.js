export const STUDENT_SELECTED = 'STUDENT_SELECTED'

export const selectStudent = (student) => {
  return {
      type: STUDENT_SELECTED,
      payload: student
  }
};

export function saveStudent(data) {
  return dispatch => {    
    dispatch(selectStudent(data.data))
  }
}


export function apiFetchStudent(id){
  return dispatch => {
    axios.get(updateUrl)
    .then(response=>response.data)
    .then(data=> dispatch(selectStudent(data)))
    .catch(function (error) {
        throw error
    });
  }
}

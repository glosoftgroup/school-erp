export const ADMISSION_SELECTED = 'ADMISSION_SELECTED'

export const selectAdmission = (payload) => {
  return {
      type: ADMISSION_SELECTED,
      payload
  }
};

export function saveAdmission(data) {
    return dispatch => {    
      dispatch(selectAdmission(data.data))
    }
}

export function updateAdmission(data) {
    return dispatch => {    
      dispatch(selectAdmission(data.data))
    }
}

export function setAdmission(data) {
    return dispatch => {    
      dispatch(selectAdmission(data.data))
    }
}

export function apiFetchAdmission(data){
    return dispatch => {
      dispatch(selectAdmission(data))
    }
} 
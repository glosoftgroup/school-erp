export const SET_STATUS = 'SET_STATUS';

export const toggleStatus = (payload) => {
    console.log(payload)
    return {
        type: SET_STATUS,
        payload
    }
  };
import api from '../api/Api'

export const SET_PARENTS = 'SET_PARENTS'
export const PARENT_SELECTED = 'PARENT_SELECTED'
export const ADD_PARENT = 'ADD_PARENT'
export const PARENT_DELETED = 'PARENT_DELETED'

export const selectParents = (payload) => {
  return {
      type: SET_PARENTS,
      payload
  }
};

export const selectParent = (payload) => {
  return {
      type: PARENT_SELECTED,
      payload
  }
};

export function parentDeleted(parentId) {
  return {
    type: PARENT_DELETED,
    parentId
  }
}

export const addParent = (payload) => {
  return {
    type: ADD_PARENT,
    payload
  }
}

/* 
 * get a list of parents id 
 * fetch their details from server
 * dispatch them to parents reducer
 * */
export const fetchParents = (parents) => {
  return dispatch => {
    parents.data.parents.map(item => {
      //fetch 
      api.retrieve('/parent/api/update/'+item)             
      .then(data=> dispatch(addParent(data.data)))
      .then(data=> {return data.data})
      .catch(function (error) {
        throw error
      });
    })
  }
}
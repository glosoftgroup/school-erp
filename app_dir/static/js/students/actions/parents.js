export const SET_PARENTS = 'SET_PARENTS'
export const PARENT_SELECTED = 'PARENT_SELECTED'
export const ADD_PARENT = 'ADD_PARENT'

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

export const addParent = (payload) => {
  return {
    type: ADD_PARENT,
    payload
  }
}
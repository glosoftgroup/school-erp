import { ADD_FEE_ITEM } from '../actions/action-fee-item'
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {

  case ADD_FEE_ITEM:
    return [ ...state, action.payload ]

  default:
    return state
  }
}

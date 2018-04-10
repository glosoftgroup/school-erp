import { ADD_FEE_ITEM, FEE_ITEM_UPDATED } from '../actions/action-fee-item'
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case FEE_ITEM_UPDATED:
      return state.map(item => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    case ADD_FEE_ITEM:
      // var checker = false
      // // state.map((item, index)=>{
      //   if(item._id === action.payload._id)
      //     // action.payload._id +=1000;
      //     // state.push(action.payload) 
      //     checker = true;
      // })
     
      // function changeId(arr){
          
      //     if(checker){
      //       console.log('mutate')
      //       // arr._id = 1212
      //     }else{
      //       console.log('dont mutate')
      //     }
      //     return arr
      // }
      // return [
      //   ...state.slice(0, action.index),
      //   action.payload,
      //   ...state.slice(action.index)
      // ]

      return [ ...state, action.payload ]
      

  default:
    return state
  }
}

import {TEST, CHANGE_STATUS } from '../actions/types';

const initialState ={
    status:{
        year:true,
        class:false,
        subject:false,
        exam:false
    }

}

export default function (state = initialState, action){
    switch(action.type){
        case CHANGE_STATUS:
            let test = Object.assign({}, state.status)
            for (let [key, value] of Object.entries(test)) {
                key == action.payload ? test[key] = true : test[key] = false
            }
            return {...state, status:test}
        case TEST:
            return action.payload
        default:
            return state;

    }
}
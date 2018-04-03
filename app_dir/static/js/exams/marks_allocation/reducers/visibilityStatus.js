import {TEST, CHANGE_STATUS, FETCH_YEARS, SET_TERM_YEAR, ERROR  } from '../actions/types';

const initialState ={
    status:{
        year:true,
        class:false,
        subject:false,
        exam:false
    },
    yearDetails:[],
    term:null,
    year:null,
    error:null

}

export default function (state=initialState, action={}){
    switch(action.type){
        case CHANGE_STATUS:
            let test = Object.assign({}, state.status)
            for (let [key, value] of Object.entries(test)) {
                key == action.payload ? test[key] = true : test[key] = false
            }
            return {...state, status:test}

        case FETCH_YEARS:
            return {
                ...state,
                yearDetails:action.payload
                }

        case SET_TERM_YEAR:
            return {
                ...state,
                year:action.payload.year,
                term:action.payload.term
                }
        case ERROR:
            return {...state, error:"Something went wrong"}
        case TEST:
            return {...state, teacherId:action.payload}
        case 'TEST2':
            return state
        default:
            return state;
    }
}
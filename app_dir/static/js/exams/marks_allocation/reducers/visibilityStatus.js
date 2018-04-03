import {
        TEST, CHANGE_STATUS, FETCH_YEARS, SET_TERM_YEAR,
        SET_CLASS, ERROR, FETCH_SUBJECTS, SET_SUBJECT,
        FETCH_EXAMS, SET_EXAM  } from '../actions/types';

const initialState ={
    status:{
        year:true,
        class:false,
        subject:false,
        exam:false
    },
    yearDetails:[],
    subjects:[],
    subject:null,
    exams:[],
    exam:null,
    teacher:null,
    class:null,
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
            let year = action.payload == 'year'? null : state.year
            return {...state, status:test, year:year}

        case FETCH_YEARS:
            return {
                ...state,
                yearDetails:action.payload
                }

        case SET_TERM_YEAR:
            return {
                ...state,
                year:action.payload.year,
                term:action.payload.term,
                teacher:action.payload.year.teacher
                }

        case FETCH_SUBJECTS:
            return {
                ...state,
                subjects:action.payload
                }

        case SET_SUBJECT:
            return {
                ...state,
                subject:action.payload
                }

        case FETCH_EXAMS:
            return {
                ...state,
                exams:action.payload
                }

        case SET_EXAM:
            return {
                ...state,
                exam:action.payload
                }

        case SET_CLASS:
            return {
                ...state,
                class:action.payload
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
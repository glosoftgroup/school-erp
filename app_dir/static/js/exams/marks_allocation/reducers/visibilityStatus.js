import {TEST, CHANGE_STATUS, FETCH_YEARS, FETCH_TERMS, ERROR  } from '../actions/types';

const initialState ={
    teacherId:null,
    teacherDetails:null,
    status:{
        year:true,
        class:false,
        subject:false,
        exam:false
    },
    academicYears:[],
    terms:[],
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
//        case FETCH_YEARS:
//            let years = []
//            action.payload.years.map((year, index)=>{
//                years.push(Object.assign({}, {id:year.yearId, name:year.yearName}))
//            })
//            return {
//                ...state,
//                teacherDetails:action.payload.years,
//                teacherId:action.payload.teacherId,
//                academicYears:years
//                }
        case FETCH_YEARS:
            let terms = []
            let years = action.payload.years
            years.map((year, index)=>{
                let y = Object.assign({}, {
                            id:year.yearId,
                            name:year.yearName,
                            terms:[
                                {id:year.termId, name:year.termName}
                              ]
                            })
                let found = terms.some(r=>years.indexOf(r)>=0)
                console.log(found)

                terms.push(Object.assign({}, y))
            })
            return {
                ...state,
                teacherDetails:action.payload.years,
//                teacherId:action.payload.yearId,
                academicYears:terms,
                terms:terms
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
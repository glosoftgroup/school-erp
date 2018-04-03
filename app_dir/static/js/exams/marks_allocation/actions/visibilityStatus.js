import {CHANGE_STATUS, TEST, FETCH_YEARS, ERROR, FETCH_TERMS } from './types';
import Api from '../api/Api';

const fetchYears = (years, teacherId) =>{
    return { type: FETCH_YEARS, payload: {years:years, teacherId:teacherId} }
}
const fetchTerms = (terms, yearId) =>{
    return { type: FETCH_TERMS, payload: {terms:terms, yearId:yearId} }
}
const handleError = (error) =>{
    return { type: ERROR, payload: error }
}

export const fetchAcademicYears = (teacherId) => dispatch => {
        Api.retrieve('/exams/marks/allocation/api/teacher/?tr='+teacherId)
            .then(response => dispatch(fetchYears(response.data.results, teacherId)))
            .catch(error => dispatch(handleError(error)))
}

export const fetchAcademicTerms = (teacherId, yearId) => dispatch => {
        Api.retrieve('/exams/marks/allocation/api/teacher/?tr='+teacherId+'&year='+yearId)
            .then(response => dispatch(fetchTerms(response.data.results, yearId)))
            .catch(error => dispatch(handleError(error)))
}

export const changeStatus = (status) => dispatch => {
        dispatch({type:CHANGE_STATUS, payload:status})
}

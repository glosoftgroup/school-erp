import {CHANGE_STATUS, TEST, FETCH_YEARS, SET_TERM_YEAR, ERROR } from './types';
import Api from '../api/Api';

const fetchYears = (years) =>{
    return { type: FETCH_YEARS, payload: years }
}

const handleError = (error) =>{
    return { type: ERROR, payload: error }
}

export const fetchAcademicYears = (teacherId) => dispatch => {
        Api.retrieve('/exams/marks/allocation/api/teacher/?tr='+teacherId)
            .then(response => dispatch(fetchYears(response.data.results)))
            .catch(error => dispatch(handleError(error)))
}

export const changeStatus = (status) => dispatch => {
        dispatch({type:CHANGE_STATUS, payload:status})
}

export const setTermAndYear = (term, year) => dispatch => {
        dispatch({type:SET_TERM_YEAR, payload:{term:term, year:year}})
}

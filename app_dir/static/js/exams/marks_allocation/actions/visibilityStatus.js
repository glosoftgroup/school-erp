import  {
        CHANGE_STATUS, TEST, FETCH_YEARS, SET_TERM_YEAR,
        SET_CLASS, FETCH_SUBJECTS, ERROR, SET_SUBJECT,
        FETCH_EXAMS, SET_EXAM, FETCH_STUDENTS, CHANGE_COMMIT_STATUS,
        LOAD_COMMIT_STATUS } from './types';
import Api from '../api/Api';

/** action handlers */
const handleError = (error) =>{
    return { type: ERROR, payload: error }
}

const fetchYears = (years) =>{
    return { type: FETCH_YEARS, payload: years }
}

const fetchSubject = (subjects) =>{
    return { type: FETCH_SUBJECTS, payload: subjects }
}

const fetchExam = (exams) =>{
    return { type: FETCH_EXAMS, payload: exams }
}

const fetchStudent = (students) =>{
    return { type: FETCH_STUDENTS, payload: students }
}

/** change components display status */
export const changeStatus = (status) => dispatch => {
        dispatch({type:CHANGE_STATUS, payload:status})
}

/** fetch academic years and set term and Year when selected */
export const fetchAcademicYears = (teacherId) => dispatch => {
        Api.retrieve('/exams/marks/allocation/api/teacher/?tr='+teacherId)
            .then(response => dispatch(fetchYears(response.data.results)))
            .catch(error => dispatch(handleError(error)))
}


export const setTermAndYear = (term, year) => dispatch => {
        dispatch({type:SET_TERM_YEAR, payload:{term:term, year:year}})
}
/** ..end  */

export const setClass = (cls) => dispatch => {
        dispatch({type:SET_CLASS, payload:cls})
}


/** fetch subjects */
export const fetchSubjects = (trId, yrId, clsId, trmId) => dispatch => {
        /**
           trId = Teacher Id, yrId = AcademicYear id, clsId = ClassTaughtId
           trmId = Term Id
        **/
        let params = 'tr='+trId+'&yr='+yrId+'&cls='+clsId+'&trm='+trmId
        Api.retrieve('/exams/marks/allocation/api/subjects/list/?'+params)
            .then(response => dispatch(fetchSubject(response.data.results)))
            .catch(error => dispatch(handleError(error)))
}

export const setSubject = (subject) => dispatch => {
        dispatch({type:SET_SUBJECT, payload:subject})
}
/** ..end */

/** fetch exams */
export const fetchExams = (yrId, sbjId, trmId) => dispatch => {
        /**
           yrId = AcademicYear id, sbjId = SubjectId
           trmId = Term Id
        **/
        let params = 'yr='+yrId+'&sbj='+sbjId+'&trm='+trmId
        Api.retrieve('/exams/marks/allocation/api/exams/list/?'+params)
            .then(response => dispatch(fetchExam(response.data.results[0].exams)))
            .catch(error => dispatch(handleError(error)))
}

export const setExam = (exam) => dispatch => {
        dispatch({type:SET_EXAM, payload:exam})
}
/** ..end */

/** fetch students */
export const fetchStudents = (yrId, clsId, termId, exam) => dispatch => {
        /**
           yrId = AcademicYear id, clsId = ClassTaughtId
        **/
        let params = 'yr='+yrId+'&cls='+clsId+'&exam='+exam+'&trmId='+termId
        Api.retrieve('/exams/marks/allocation/api/students/list/?'+params)
            .then(response => {
                    dispatch(fetchStudent(response.data.results))
                    dispatch({type:LOAD_COMMIT_STATUS, payload:response.data.is_committed})
                })
            .catch(error => dispatch(handleError(error)))
}

/** ..end */

/** changeFinalCommitStatus */
export const changeFinalCommitStatus = (status) => dispatch => {
        dispatch({type:CHANGE_COMMIT_STATUS, payload:status})
}
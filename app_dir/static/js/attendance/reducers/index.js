import {combineReducers} from 'redux';

import StudentsReducer from './reducer-students'
import DateReducer from './reducer-active-date'
import CourseReducer from './reducer-active-course'
import AcademicYearReducer from './reducer-active-year'

const allReducers = combineReducers({    
    students: StudentsReducer,
    academic_year: AcademicYearReducer,
    date: DateReducer,
    course: CourseReducer
});

export default allReducers
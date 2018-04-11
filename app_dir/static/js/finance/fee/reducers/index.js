import {combineReducers} from 'redux';

import StudentsReducer from './reducer-students'
import DateReducer from './reducer-active-date'
import CourseReducer from './reducer-active-course'
import AcademicYearReducer from './reducer-active-year'
import ActiveTermReducer from './reducer-active-term'
import ItemReducer from './reducer-items'
import FeeStructureReducer from './reducer-fee-structure'
import FeeItemsReducer from './reducer-fee-items'

const allReducers = combineReducers({    
    students: StudentsReducer,
    academic_year: AcademicYearReducer,
    date: DateReducer,
    fees: FeeStructureReducer,
    fee_items: FeeItemsReducer,
    course: CourseReducer,
    items: ItemReducer,
    term: ActiveTermReducer,
    // total: getTotal
});

export default allReducers



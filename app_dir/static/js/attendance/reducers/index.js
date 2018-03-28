import {combineReducers} from 'redux';

import StudentsReducer from './reducer-students'


const allReducers = combineReducers({    
    students: StudentsReducer
});

export default allReducers
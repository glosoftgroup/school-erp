import {combineReducers} from 'redux';

import course from './reducer-active-course';
import courses from './reducer-course';
import feeStructure from './reducer-fee-structure';

const allReducers = combineReducers({
    course,
    courses,
    feeStructure
});

export default allReducers;

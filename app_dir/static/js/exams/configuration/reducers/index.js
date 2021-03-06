import {combineReducers} from 'redux';

import SelectChangeReducer from './reducer-select';
import ExamConfig from './reducer-add-config';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent)
 * to store.
 * Your entire applications state (store) is just whatever gets returned from all your
 * reducers
 * */

const allReducers = combineReducers({
    selectData: SelectChangeReducer,
    ExamConfig
});

export default allReducers;

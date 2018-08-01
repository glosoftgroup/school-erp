import {combineReducers} from 'redux';

import items from './reducer-items';

const allReducers = combineReducers({
    items
});

export default allReducers;

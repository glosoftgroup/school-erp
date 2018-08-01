import {combineReducers} from 'redux';

import items from './reducer-items';
import settings from './reducer-settings';

const allReducers = combineReducers({
    items,
    settings
});

export default allReducers;

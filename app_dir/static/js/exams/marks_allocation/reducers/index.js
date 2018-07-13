import {combineReducers} from 'redux';
import visibilityStatus from './visibilityStatus';

export default combineReducers({
  see: visibilityStatus
});

import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import CountriesReducer from './reducer-countries';
import ActiveCountryReducer from './reducer-active-country';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    countries:CountriesReducer,
    activeCountry:ActiveCountryReducer
});

export default allReducers


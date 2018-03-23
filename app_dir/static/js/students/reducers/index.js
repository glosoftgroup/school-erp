import {combineReducers} from 'redux';

import ActiveUserReducer from './reducer-active-user';
import AcademicReducer from './reducer-academic-years'
import AdmissionReducers from './reducer-admission'
import ActiveCountryReducer from './reducer-active-country';
import ActiveStudentReducer from './reducer-active-student'
import CountriesReducer from './reducer-countries';
import ClassesReducer from './reducer-classes'
import GenderReducer from './reducer-genders'
import ImagePreviewReducer from './reducer-image'
import ReligionReducer from './reducer-religions'
import UserReducer from './reducer-users';
import HousesReducers from './reducer-houses'


/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({     
    academics: AcademicReducer, 
    activeCountry: ActiveCountryReducer,     
    activeStudent: ActiveStudentReducer,
    activeUser: ActiveUserReducer,
    admission: AdmissionReducers, 
    avatar: ImagePreviewReducer,  
    classes: ClassesReducer, 
    countries: CountriesReducer,    
    genders: GenderReducer,    
    houses: HousesReducers,
    religions: ReligionReducer,
    users: UserReducer
});

export default allReducers


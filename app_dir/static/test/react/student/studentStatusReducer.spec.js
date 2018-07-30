import expect from 'expect';

import activeStudentReducer from '../../../js/students/create/reducers/reducer-active-student';
import countriesReducer from '../../../js/students/create/reducers/reducer-countries';
import religionsReducer from '../../../js/students/create/reducers/reducer-religions';
import imageReducer from '../../../js/students/create/reducers/reducer-image';
import admissionReducer from '../../../js/students/create/reducers/reducer-admission';
import parentReducer from '../../../js/students/create/reducers/reducer-parents';

describe('[STUDENT] StudentReducers', () => {
  it('should set selected student obj ', () => {
    const action = { type: 'STUDENT_SELECTED', payload: { action: {} } }
    const newState = activeStudentReducer([], action)
    expect(newState.action).toEqual({})
  });

  it('should set selected image obj ', () => {
    const action = { type: 'IMAGE_SELECTED', payload: { action: {} } }
    const newState = imageReducer([], action)
    expect(newState.action).toEqual({})
  });

  it('should set selected academic admission obj ', () => {
    const action = { type: 'ADMISSION_SELECTED', payload: { action: {} } }
    const newState = admissionReducer([], action)
    expect(newState.action).toEqual({})
  });

});

describe('[STUDENT] ReligionsReducer', () => {
  it('Should return a an object with text and id keys', () => {
    const newState = religionsReducer()
    expect(Object.keys(newState[0])).toEqual(['text','id'])
  });
});

describe('[STUDENT] CountriesReducer', () => {
  it('Should return a list of countries ', () => {
    const newState = countriesReducer()
    expect(newState[0].text).toEqual('Afghanistan')
  });
});

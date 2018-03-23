import expect from 'expect'

import activeStudentReducer from '../../../js/students/reducers/reducer-active-student';
import countriesReducer from '../../../js/students/reducers/reducer-countries';
import religionsReducer from '../../../js/students/reducers/reducer-religions';
import imageReducer from '../../../js/students/reducers/reducer-image';


describe('religionsReducer', () => {
  it('Should return a an object with text and id keys', () => {
    const newState = religionsReducer()
    expect(Object.keys(newState[0])).toEqual(['text','id'])
  });
});

describe('countriesReducer', () => {
  it('Should return a list of countries ', () => {
    const newState = countriesReducer()
    expect(newState[0].text).toEqual('Afghanistan')
  });
});

describe('StudentReducers', () => {
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
});

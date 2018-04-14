import React from 'react'
import { shallow, mount } from 'enzyme';
// import renderer from 'react-test-renderer'

import courseReducer from '../reducers/reducer-active-course'
import termReducer from '../reducers/reducer-active-term'

describe('[Finance][fee]>>>R E D U C E R --- Test calculatorReducers',()=>{
    it('+++ reducer for COURSE_SELECTED', () => {
        let state = {output:100}
        state = courseReducer(state,{type:"ADD_INPUTS",output:100})
        expect(state).toEqual({output:100})
    });
    it('+++ reducer for TERM_SELECTED', () => {
        let state = {output:100}
        state = termReducer(state,{type:"SUBTRACT_INPUTS",output:100})
        expect(state).toEqual({output:100})
    });

});
//*******************************************************************************************************
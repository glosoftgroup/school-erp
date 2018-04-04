import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'

import App from '../../../js/exams/marks_allocation/components/App';
import BreadCrumb from '../../../js/exams/marks_allocation/components/BreadCrumb';
import AcademicYears from '../../../js/exams/marks_allocation/components/AcademicYears';
import Classes from '../../../js/exams/marks_allocation/components/Classes';
import Subjects from '../../../js/exams/marks_allocation/components/Subjects';
import Exams from '../../../js/exams/marks_allocation/components/Exams';

import visibilityStatus from '../../../js/exams/marks_allocation/reducers/visibilityStatus';
import changeStatus from '../../../js/exams/marks_allocation/actions/visibilityStatus';


describe('[EXAMS] Marks Allocation', () => {
    const initialState = {
       see:{ status:{
            year:true,
            class:false,
            subject:false,
            exam:false
        } }
    }

    const mockStore = configureStore([thunk])
    let store, container, wrapper

    beforeEach(() => {
        store = mockStore(initialState)
    });

    it('render the connected(SMART) App component', () => {
       wrapper = shallow(<App store={store}/>)
       expect(wrapper.length).toEqual(1)
    });

    it("render same props", () => {
        wrapper = shallow(<App store={store} />)
        let c = visibilityStatus(initialState.see, {type:"CHANGE_STATUS", payload:'class'})
        expect(wrapper.prop('status')).toEqual(initialState.see.status)
    });

    it('render only AcademicYears & BreadCrumb components if status.year is true', () => {
       wrapper = mount(<App store={store} />)
       expect(wrapper.find(AcademicYears).length).toEqual(1)
       expect(wrapper.find(BreadCrumb).length).toEqual(1)
       expect(wrapper.find(Classes).length).toEqual(0)
    });


});



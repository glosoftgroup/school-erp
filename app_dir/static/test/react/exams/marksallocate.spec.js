import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../../../js/exams/marks_allocation/components/App';
import BreadCrumb from '../../../js/exams/marks_allocation/components/BreadCrumb';
import AcademicYears from '../../../js/exams/marks_allocation/components/AcademicYears';
import Classes from '../../../js/exams/marks_allocation/components/Classes';
import Subjects from '../../../js/exams/marks_allocation/components/Subjects';
import Exams from '../../../js/exams/marks_allocation/components/Exams';

import visibilityStatus from '../../../js/exams/marks_allocation/actions/visibilityStatus';
import changeStatus from '../../../js/exams/marks_allocation/actions/changeStatus';


describe('<AcademicYears/>', () => {

  it('should be mounted on year status true', () => {
    const wrapper = shallow(<AcademicYears/>)

    const newState = visibilityStatus()

//    let mountedLockScreen;
//    if (!mountedLockScreen) {
//      mountedLockScreen = mount(<AcademicYears />);
//    }
//    return mountedLockScreen;

    expect(newState).to.have.length(3)
  });
});



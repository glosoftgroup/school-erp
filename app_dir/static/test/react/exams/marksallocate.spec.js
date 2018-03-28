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

import visibilityStatus from '../../../js/exams/marks_allocation/reducers/visibilityStatus';
import changeStatus from '../../../js/exams/marks_allocation/actions/visibilityStatus';


describe('<AcademicYears/>', () => {
    let props;
    let mountedComponentAcademic;
    const newState = visibilityStatus()

    const component = (co, st) => {
    if (newState.status[st]) {
      mountedComponentAcademic = shallow(
        co
      );
    }
    return mountedComponentAcademic;
    }

    beforeEach(() => {
        mountedComponentAcademic = undefined;
    });

    it("always renders academicYears Component on year status == true", () => {
      const divs = component(<AcademicYears />, 'year').find("div");
      expect(divs.length).to.be.greaterThan(0);
    });

    it("always renders academicYears Component on year status == true", () => {
      const divs = component(<Classes />, 'year').find("div");
      expect(divs.length).to.be.greaterThan(0);
    });

});



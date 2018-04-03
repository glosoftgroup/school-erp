import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CrudForm from '../../../js/term/components/CrudForm';

describe('[TERM]', () => {
  it('CrudForm Component should have 3 inputs', () => {
    const wrapper = shallow(<CrudForm/>);
    expect(wrapper.find('input')).to.have.length(3);
  });
});



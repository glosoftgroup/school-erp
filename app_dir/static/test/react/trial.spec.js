import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CrudForm from '../../js/term/components/CrudForm';

describe('<CrudForm/>', () => {
  it('should have 3 inputs', () => {
    const pk = 0;
    const wrapper = shallow(<CrudForm/>);
    expect(wrapper.find('input')).to.have.length(3);
  });
});



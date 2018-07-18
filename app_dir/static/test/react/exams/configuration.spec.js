/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Topic from '../../../js/exams/configuration/components/Topic';

describe('[EXAMS] Exam Configuration', () => {
    it('component should have 1 button', () => {
        const wrapper = shallow(<Topic/>);
        expect(wrapper.find('button')).to.have.length(1);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../js/exams/exam_type/components/Form';

describe('ExamType', () => {
    const wrapper = shallow(<Form/>);
    it('Topic should have 1 button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });
});
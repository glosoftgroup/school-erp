/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Topic from '../../../js/exams/configuration/components/Topic';
import ExamType from '../../../js/exams/configuration/components/ExamType';

describe('[EXAMS] Exam Configuration', () => {
    describe('Topic', () => {
        const wrapper = shallow(<Topic/>);
        it('Topic should have 1 button', () => {
            expect(wrapper.find('button').length).toEqual(1);
        });

        it('Topic should have 6 inputs (3 checkboxes and 3 input fields)', () => {
            expect(wrapper.find('input').length).toEqual(6);
            expect(wrapper.find('input[type="text"]').length).toEqual(3);
            expect(wrapper.find('input[type="checkbox"]').length).toEqual(3);
        });

        const simulateInputOnchange = (wrapper) => {
            const event = {target: {name: 'exam', value: '1234'}};
            wrapper.find('input[type="text"]').last().simulate('change', event);
        };

        it('should enable the Button when input is changed', () => {
            expect(wrapper.find('button').prop('disabled')).toEqual(true);
            simulateInputOnchange(wrapper);
            expect(wrapper.find('button').prop('disabled')).toEqual(false);
        });
    });

    describe('ExamType', () => {
        const wrapper = shallow(<ExamType/>);
        it('Topic should have 1 button', () => {
            expect(wrapper.find('button').length).toEqual(1);
        });
    });
});

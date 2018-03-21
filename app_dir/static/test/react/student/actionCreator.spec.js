import expect from 'expect'
import {STUDENT_SELECTED, selectStudent} from '../../../js/students/actions/actions';

describe('actionSelectStudent', () => {
    const action = selectStudent({})
    it('has type STUDENT_SELECTED', () => {
        expect(action.type).toEqual(STUDENT_SELECTED)
    })

    it('puts in payload', () => {
        expect(action.payload).toEqual({})
    })
});
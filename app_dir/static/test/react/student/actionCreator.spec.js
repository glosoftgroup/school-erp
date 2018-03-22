import expect from 'expect'
import {STUDENT_SELECTED, selectStudent} from '../../../js/students/actions/actions';
import {SET_ACADEMICS, setAcademics } from '../../../js/students/actions/academics'
import {SET_CLASSES, setClasses } from '../../../js/students/actions/classes'

describe('action Creators', () => {
    const action = selectStudent({})
    it('has type STUDENT_SELECTED', () => {
        expect(action.type).toEqual(STUDENT_SELECTED)
    })

    it('puts in student payload', () => {
        expect(action.payload).toEqual({})
    })

    const action2 = setAcademics({})
    it('has type SET_ACADEMICS', () => {
        expect(action2.type).toEqual(SET_ACADEMICS)
    })


    it('puts in academic year payload', () => {
        expect(action2.payload).toEqual({})
    })

    const action3 = setClasses({})
    it('has type SET_CLASSES', () => {
        expect(action3.type).toEqual(SET_CLASSES)
    })


    it('puts in classes payload', () => {
        expect(action3.payload).toEqual({})
    })

});
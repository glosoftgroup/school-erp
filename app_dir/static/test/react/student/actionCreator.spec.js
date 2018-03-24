import expect from 'expect'
import {STUDENT_SELECTED, selectStudent} from '../../../js/students/actions/actions';
import {SET_ACADEMICS, setAcademics } from '../../../js/students/actions/academics'
import {SET_CLASSES, setClasses } from '../../../js/students/actions/classes'
import {ADMISSION_SELECTED, selectAdmission } from '../../../js/students/actions/admissions'

describe('Action Creators', () => {
    const student = selectStudent({})
    it('has type STUDENT_SELECTED', () => {
        expect(student.type).toEqual(STUDENT_SELECTED)
    })

    it('puts in student payload', () => {
        expect(student.payload).toEqual({})
    })

    const academic = setAcademics({})
    it('has type SET_ACADEMICS', () => {
        expect(academic.type).toEqual(SET_ACADEMICS)
    })


    it('puts in academic year payload', () => {
        expect(academic.payload).toEqual({})
    })

    const classes = setClasses({})
    it('has type SET_CLASSES', () => {
        expect(classes.type).toEqual(SET_CLASSES)
    })


    it('puts in classes payload', () => {
        expect(classes.payload).toEqual({})
    })

    const admission = selectAdmission({})
    it('has type ADMISSION_SELECTED', () => {
        expect(admission.type).toEqual(ADMISSION_SELECTED)
    })


    it('puts in academic admission payload', () => {
        expect(admission.payload).toEqual({})
    })

});
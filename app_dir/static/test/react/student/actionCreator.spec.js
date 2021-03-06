/* eslint-env jest */

import expect from 'expect';
import {STUDENT_SELECTED, selectStudent} from '../../../js/students/create/actions/actions';
import { SET_ACADEMICS, setAcademics } from '../../../js/students/create/actions/academics'
import { SET_CLASSES, setClasses } from '../../../js/students/create/actions/classes'
import { ADMISSION_SELECTED, selectAdmission } from '../../../js/students/create/actions/admissions'
import {
    PARENT_DELETED, ADD_PARENT,
    SET_PARENTS, PARENT_SELECTED, 
    selectParents,
    selectParent, parentDeleted,
    addParent 
} from '../../../js/students/create/actions/parents';

describe('[STUDENT] Action Creators', () => {
    // add parent
    var funParent = addParent({});
    it('has type ADD_PARENT', () => {
        expect(funParent.type).toEqual(ADD_PARENT);
    });

    it('puts in parents payload', () => {
        expect(funParent.payload).toEqual({});
    });

    // delete parent
    const parent = parentDeleted(1);
    it('returns Parent id ', () => {
        expect(parent.type).toEqual(PARENT_DELETED);
    });

    it('puts in parent payload', () => {
        expect(parent.parentId).toEqual(1);
    });

    const student = selectStudent({});
    it('has type STUDENT_SELECTED', () => {
        expect(student.type).toEqual(STUDENT_SELECTED);
    });

    it('puts in student payload', () => {
        expect(student.payload).toEqual({});
    });

    const academic = setAcademics({});
    it('has type SET_ACADEMICS', () => {
        expect(academic.type).toEqual(SET_ACADEMICS);
    });

    it('puts in academic year payload', () => {
        expect(academic.payload).toEqual({});
    });

    const classes = setClasses({});
    it('has type SET_CLASSES', () => {
        expect(classes.type).toEqual(SET_CLASSES);
    });

    it('puts in classes payload', () => {
        expect(classes.payload).toEqual({});
    });

    const admission = selectAdmission({});
    it('has type ADMISSION_SELECTED', () => {
        expect(admission.type).toEqual(ADMISSION_SELECTED);
    });

    it('puts in academic admission payload', () => {
        expect(admission.payload).toEqual({});
    });
});

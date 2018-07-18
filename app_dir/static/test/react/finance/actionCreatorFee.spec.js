/* eslint-env jest */

import expect from 'expect';
import {
    addFeeItem, deleteFeeItem, updateFeeItem,
    selectAcademicYear,
    ACADEMIC_YEAR_SELECTED,
    ADD_FEE_ITEM, FEE_ITEM_DELETED, FEE_ITEM_UPDATED
} from '../../../js/finance/fee/actions';

describe('[FINANCE >> Fee structure] Action Creators', () => {
    // add action
    var func = selectAcademicYear({});
    it('has type ACADEMIC_YEAR_SELECTED', () => {
        expect(func.type).toEqual(ACADEMIC_YEAR_SELECTED);
    });

    it('puts in ACADEMIC_YEAR_SELECTED payload', () => {
        expect(func.payload).toEqual({});
    });
    // add action
    var funParent = addFeeItem({});
    it('has type ADD_FEE_ITEM', () => {
        expect(funParent.type).toEqual(ADD_FEE_ITEM);
    });

    it('puts in fee item payload', () => {
        expect(funParent.payload).toEqual({});
    });

    // delete action
    const parent = deleteFeeItem(1);
    it('has type  FEE_ITEM_DELETED ', () => {
        expect(parent.type).toEqual(FEE_ITEM_DELETED);
    });

    it('check item delete id passed', () => {
        expect(parent.Id).toEqual(1);
    });

    // update action
    const update = updateFeeItem({});
    it('has type  FEE_ITEM_UPDATED ', () => {
        expect(update.type).toEqual(FEE_ITEM_UPDATED);
    });
    it('check item update passed', () => {
        expect(update.Id).toEqual(undefined);
    });
});

/* eslint-env jest */
import expect from 'expect';
import {
    ADD_FEE_ITEM, FEE_ITEM_DELETED, FEE_ITEM_UPDATED
} from '../../../js/finance/fee/actions';
import feeItem from '../../../js/finance/fee/reducers/reducer-fee-items';

describe('[Finance Reducer] Fee Structure Active Course', () => {
    it('should set selected fee item ', () => {
        const action = { type: ADD_FEE_ITEM, payload: { action: {} } };
        const newState = feeItem([], action);
        expect(newState[0].action).toEqual({});
    });
    it('should delete selected fee item ', () => {
        const action = { type: FEE_ITEM_DELETED, payload: { action: {} } };
        const newState = feeItem([], action);
        expect(newState).toEqual([]);
    });
});

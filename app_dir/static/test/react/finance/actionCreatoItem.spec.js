/* eslint-env jest */

import expect from 'expect';
import {
    selectItems, selectItem, deleteItem, fetchItems,
    SET_ITEMS, ITEM_DELETED, ITEM_SELECTED
} from '../../../js/finance/item/actions';
require("babel-core/register");
require("babel-polyfill");

describe('[FINANCE >> Fee Item] Action Creators', () => {
    // add action
    var funParent = selectItems({});
    it('has type SET_ITEMS', () => {
        expect(funParent.type).toEqual(SET_ITEMS);
    });

    it('puts in fee items payload', () => {
        expect(funParent.payload).toEqual({});
    });

    // select item
    const item = selectItem({id: 12});
    it('has type ITEM_SELECTED', () => {
        expect(item.type).toEqual(ITEM_SELECTED);
    });
    it('selects item from state', () => {
        expect(item.payload).toEqual({id: 12});
    });

    // delete action
    const parent = deleteItem(1);
    it('has type  ITEM_DELETED ', () => {
        expect(parent.type).toEqual(ITEM_DELETED);
    });

    it('check item delete id passed', () => {
        expect(parent.Id).toEqual(undefined);
    });

    // fetch action
    const update = fetchItems({});
    it('check fetch items function passed', () => {
        expect(typeof update).toBe('function');
    });
});

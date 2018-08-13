/* eslint-env jest */

import {
    SET_ITEMS, SET_SETTINGS,
    setItems, setSettings
} from '../../../../js/finance/fee_view/actions';

describe('[FINANCE >> Fee view] Action Creators', () => {
    /** TEST TYPE AND PAYLOAD */
    it('has type SET_ITEMS', () => {
        expect(setItems({}).type).toEqual(SET_ITEMS);
    });

    it('puts in items payload', () => {
        expect(setItems({}).payload).toEqual({});
    });
    /** END  */

    /** TEST TYPE AND PAYLOAD */
    it('has type SET_SETTINGS', () => {
        expect(setSettings({}).type).toEqual(SET_SETTINGS);
    });

    it('puts in settings payload', () => {
        expect(setSettings({}).payload).toEqual({});
    });
    /** END  */
});

/* eslint-env jest */

import {
    SET_ITEMS, SET_SETTINGS
} from '../../../../js/finance/fee_view/actions';

import itemReducer from '../../../../js/finance/fee_view/reducers/reducer-items';
import settingsReducer from '../../../../js/finance/fee_view/reducers/reducer-settings';

describe('[Finance] Fee Structure view ', () => {
    it('should set selected fee item ', () => {
        const action = { type: SET_ITEMS, payload: { action: {} } };
        const newState = itemReducer([], action);
        expect(newState).toEqual({'action': {}});
    });
    it('should set selected system settings ', () => {
        const action = { type: SET_SETTINGS, payload: { action: {} } };
        const newState = settingsReducer([], action);
        expect(newState).toEqual({'action': {}});
    });
});

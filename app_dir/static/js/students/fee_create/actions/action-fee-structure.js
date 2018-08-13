import Api from '../api/Api';

export const SET_STRUCTURE = 'SET_STRUCTURE';
export const ADD_STRUCTURE = 'ADD_STRUCTURE';
export const STRUCTURE_DELETED = 'STRUCTURE_DELETED';

export const SET_ITEMS = 'SET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const selectStructure = (payload) => {
    return {
        type: SET_STRUCTURE,
        payload
    };
};

export const addStructure = (payload) => {
    return {
        type: ADD_STRUCTURE,
        payload
    };
};

export function deleteStructure(item) {
    return {
        type: STRUCTURE_DELETED,
        item
    };
}

export const setItems = (payload) => ({
    type: SET_ITEMS,
    payload
});

export const fetchFeeItems = (params = {}) => {
    return dispatch => {
        // extract url parameters
        var url = '';
        if (typeof params === 'object') {
            if (Object.keys(params).length >= 1) {
                Object.keys(params).forEach(function(key) {
                    url += key + '=' + params[key] + '&';
                });
                // remove last &
                url = url.slice(0, -1);
            }
        }
        Api.retrieve('/finance/fee/api/list/view/?' + url)
            .then(data => {
                data.loading = false;
                dispatch(selectStructure(data.data));
            });
    };
};

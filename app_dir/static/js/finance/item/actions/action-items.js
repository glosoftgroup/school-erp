
export const SET_ITEMS = "SET_ITEMS"
export const ADD_ITEM = "ADD_ITEM"
export const ITEM_DELETED = "ITEM_DELETED"

export const selectItems = (payload) => {    
    return {
        type: SET_ITEMS,
        payload
    }
};

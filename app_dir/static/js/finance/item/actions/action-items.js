import api from '../api/Api'

export const SET_ITEMS = "SET_ITEMS"
export const ADD_ITEM = "ADD_ITEM"
export const ITEM_DELETED = "ITEM_DELETED"
export const ITEM_SELECTED = "ITEM_SELECTED"

export const selectItems = (payload) => {    
    return {
        type: SET_ITEMS,
        payload
    }
};

export const selectItem = (payload) => { 
    console.log(payload)   
    return {
        type: ITEM_SELECTED,
        payload
    }
};

export function deleteItem(item) {
    return {
      type: ITEM_DELETED,
      item
    }
}

export const fetchItems = (params={}) =>{
    return dispatch => {
        // extract url parameters
        var url='';
        
        if(typeof params === 'object'){            
            if(Object.keys(params).length >= 1){
                Object.keys(params).forEach(function(key) {
                    url += key+'='+params[key]+'&';       
                });
                // remove last &
                url = url.slice(0, -1)
            }            
        }

        api.retrieve('/finance/item/api/list/?'+url)
        .then(data => dispatch(selectItems(data.data)))
    }
}

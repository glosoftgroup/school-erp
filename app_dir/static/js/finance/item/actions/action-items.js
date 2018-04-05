import api from '../api/Api'

export const SET_ITEMS = "SET_ITEMS"
export const ADD_ITEM = "ADD_ITEM"
export const ITEM_DELETED = "ITEM_DELETED"

export const selectItems = (payload) => {    
    return {
        type: SET_ITEMS,
        payload
    }
};

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

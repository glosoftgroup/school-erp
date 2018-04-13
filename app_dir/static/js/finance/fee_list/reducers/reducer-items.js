import { SET_ITEMS, ADD_ITEM, ITEM_DELETED } from '../actions/action-items.js';

const initial = {    
        "links": {
            "next": null,
            "previous": null
        },
        "count": 7,
        "total_pages": 1,
        "results": []
}
export default function items(state = initial, action = {}) {
  switch(action.type) { 
    case ITEM_DELETED:
      return state.results.filter(item => item !== action.item);

    case ADD_ITEM:
      return [
        ...state,
        action.payload
      ];  
    case SET_ITEMS:
      return action.payload;
    default: return state;
  }
}
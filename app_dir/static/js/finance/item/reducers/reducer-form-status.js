import SET_STATUS from '../actions/action-form-status'

const initial = {'id':false}

export default function (state = initial, action) {
    switch (action.type) {
        case 'SET_STATUS':
            return action.payload;
            break;
    }
    return state;
}
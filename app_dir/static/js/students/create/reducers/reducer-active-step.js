import SET_STEP from '../actions/tab-step'

const initial = {'id':1}

export default function (state = initial, action) {
    switch (action.type) {
        case 'SET_STEP':
            return action.payload;
            break;
    }
    return state;
}
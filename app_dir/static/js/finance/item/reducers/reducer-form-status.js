import SET_STEP from '../actions/action-form-status'

const initial = {'id':false}

export default function (state = initial, action) {
    switch (action.type) {
        case SET_STEP:
            return {'id':!state.id};
            break;
    }
    return state;
}
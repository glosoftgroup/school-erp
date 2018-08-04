import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { SELECT_INPUT_CHANGE, CHECK_INPUT_ERRORS } from '../actions/action-select';

const initial = {
    subject: '',
    academicyear: '',
    academicclass: '',
    term: '',
    errors: {}
};

let validateInput = (state) => {
    let errs = {};
    if (Validator.isEmpty(state.subject)) {
        errs.subject = 'This field is required';
    }
    if (Validator.isEmpty(state.term)) {
        errs.term = 'This field is required';
    }
    if (Validator.isEmpty(state.academicyear)) {
        errs.academicyear = 'This field is required';
    }
    if (Validator.isEmpty(state.academicclass)) {
        errs.academicclass = 'This field is required';
    }

    return {
        errs,
        isValid: isEmpty(errs)
    };
};

export default function items(state = initial, action = {}) {
    switch (action.type) {
    case SELECT_INPUT_CHANGE:
        return { ...state, ...action.payload };
    case CHECK_INPUT_ERRORS:
        const { errs, isValid } = validateInput(state);
        if (!isValid) {
            var newState = Object.assign({}, state, { errors: errs });
            return { ...state, ...newState };
        }
        return state;
    default: return state;
    }
}

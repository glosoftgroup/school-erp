import { ADD_EXAM_AND_VALUE, SET_EXAM_MARKS, REMOVE_EXAM } from '../actions/action-add-config';

const initial = {
    exams: {},
    examList: []
};

export default function items(state = initial, action = {}) {
    switch (action.type) {
    case ADD_EXAM_AND_VALUE:
        let exms = action.payload.exams;
        let exmsArray = [];
        for (var key in exms) {
            if (exms.hasOwnProperty(key)) {
                for (var i = 1; i <= exms[key]; i++) {
                    exmsArray.push(key + ' ' + i);
                }
            }
        }
        return { ...state, examList: exmsArray };
    case SET_EXAM_MARKS:
        let setExams = Object.assign(state.exams, action.payload);
        Object.keys(setExams)
            .forEach(function eachKey(key) {
                console.log(key); // alerts key 
                console.log(setExams[key]); // alerts value
                console.log({ name: key, value: setExams[key], type: key.split()[0] });
            });
        return { ...state, exams: setExams };

    case REMOVE_EXAM:
        // let setExams = Object.assign(state.exams, action.payload);
        return { ...state };

    default: return state;
    }
}

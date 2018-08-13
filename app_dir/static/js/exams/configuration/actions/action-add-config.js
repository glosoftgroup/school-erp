export const ADD_EXAM_AND_VALUE = 'ADD_EXAM_AND_VALUE';
export const SET_EXAM_MARKS = 'SET_EXAM_MARKS';
export const REMOVE_EXAM = 'REMOVE_EXAM';

export const addExamAndValue = (payload) => {
    return {
        type: ADD_EXAM_AND_VALUE,
        payload
    };
};

export const setExamMarks = (payload) => {
    return {
        type: SET_EXAM_MARKS,
        payload
    };
};

export const removeExam = (payload) => {
    return {
        type: REMOVE_EXAM,
        payload
    };
};

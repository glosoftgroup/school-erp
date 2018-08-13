export const SELECT_INPUT_CHANGE = 'SELECT_INPUT_CHANGE';
export const CHECK_INPUT_ERRORS = 'CHECK_INPUT_ERRORS';

export const handleSelectInputChange = (payload) => {
    return {
        type: SELECT_INPUT_CHANGE,
        payload
    };
};

export const checkInputErrors = () => {
    return {
        type: CHECK_INPUT_ERRORS
    };
};

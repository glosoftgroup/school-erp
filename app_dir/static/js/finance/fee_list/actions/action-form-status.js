export const SET_STATUS = 'SET_STATUS';

export const toggleStatus = (payload) => {
    return {
        type: SET_STATUS,
        payload
    };
};

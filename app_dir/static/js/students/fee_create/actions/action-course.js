import api from '../api/Api';

export const SET_COURSES = 'SET_COURSES';

export const setCourses = (payload) => ({
    type: SET_COURSES,
    payload
});

export const fetchItems = (params = {}) => {
    return dispatch => {
        // extract url parameters
        var url = '';

        if (typeof params === 'object') {
            if (Object.keys(params).length >= 1) {
                Object.keys(params).forEach(function(key) {
                    url += key + '=' + params[key] + '&';
                });
                // remove last &
                url = url.slice(0, -1);
            }
        }

        api.retrieve('/class/api/list/groups/?' + url)
            .then(data => dispatch(setCourses(data.data)));
    };
};

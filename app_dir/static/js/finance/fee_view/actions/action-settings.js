import Api from '../utils/Api';
export const SET_SETTINGS = 'SET_SETTINGS';

export const setSettings = (payload) => ({
    type: SET_SETTINGS,
    payload
});

export const fetchSettings = () => {
    return dispatch => {
        Api.retrieve('/site/api/list/?')
            .then(data => {
                data.loading = false;
                dispatch(setSettings(data.data[0]));
            });
    };
};

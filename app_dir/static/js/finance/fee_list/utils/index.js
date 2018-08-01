import Api from '../api/Api';

export const getUsers = (input, url) => {
    if (!input) {
        return Promise.resolve({ options: [] });
    }

    return Api.retrieve(`${url}?q=${input}`)
        .then((response) => response.data.results)
        .then((json) => {
            return { options: json };
        });
}
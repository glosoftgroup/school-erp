class AdmissionsApi {

    static retrieve(url){
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        return axios.get(url)
        .then(response => {
            return response;
        }).catch(error => {
            return error;
        }); 
    }

    static update(url,data) {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        return axios.put(url,data)
        .then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static create(url,data) {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        return axios.post(url,data)
        .then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default AdmissionsApi
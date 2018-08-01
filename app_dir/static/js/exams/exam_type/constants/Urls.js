class Urls {
    static createUrl() {
        return '/exam/type/api/create/';
    }
    static updateUrl() {
        let url = '/exam/type/api/update/';
        let updateStatus = (window.location.href).includes('update');
        let updateUrl = null;
        if (updateStatus) {
            /* split the href to get an array without the '/' */
            let locationArray = (window.location.href).split(/[/]/);
            /* remove the blank elements in the array */
            let StrippedLocationArray = locationArray.filter(function(string) {
                return string !== '';
            });
            /* get the last item which is the id */
            let updateId = StrippedLocationArray[StrippedLocationArray.length - 1];
            updateUrl = url + updateId + '/';
        }
        return updateUrl;
    }
    static redirectUrl() {
        return '/exam/type/';
    }
}

export default Urls;

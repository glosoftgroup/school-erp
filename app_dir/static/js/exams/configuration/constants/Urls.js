/* eslint one-var: 0 */
class Urls {
    static createUrl() {
        return '/exams/configuration/api/create/';
    }
    static updateUrl() {
        let url = '/exams/configuration/api/update/',
            updateStatus = (window.location.href).includes('update'),
            updateUrl = null;
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
        return '/exams/configuration/';
    }
    static subjectUrl() {
        return '/subject/api/list/';
    }
    static academicYearUrl() {
        return '/academic_year/api/list/';
    }
    static academicClassUrl() {
        return '/class/api/list/groups/';
    }
    static termUrl() {
        return '/term/api/list/';
    }
    static examTypeUrl() {
        return '/exam/type/api/list/';
    }
}

export default Urls;

class Urls {
    static createUrl(){
        return "/exams/configuration/api/create/";
    }
    static updateUrl() {
        let url = "/exams/configuration/api/update/",
            updateStatus = (window.location.href).includes("update"),
            update_url = null;
        if(updateStatus){
            /* split the href to get an array without the '/' */
            let location_array = (window.location.href).split(/[/]/);
            /* remove the blank elements in the array */
            let Stripped_location_array = location_array.filter(function(string) {
                    return string != ""
                });
            /* get the last item which is the id */
            let updateId = Stripped_location_array[Stripped_location_array.length-1]
            update_url = url+updateId+"/";
        }
        return update_url;
    }
    static redirectUrl() {
        return "/exams/configuration/";
    }
    static subjectUrl() {
        return "/subject/api/list/";
    }
    static academicYearUrl() {
        return "/academic_year/api/list/";
    }
    static academicClassUrl() {
        return "/class/api/list/groups/";
    }
    static termUrl() {
        return "/term/api/list/";
    }
}

export default Urls
// fetch and set academic years actions
export const SET_ACADEMICS = 'SET_ACADEMICS';

export function setAcademics(payload) {
    return {
      type: SET_ACADEMICS,
      payload
    }
  }

export function fetchAcademics() {
    return dispatch => {
        axios.get('/academic_year/api/list')
        .then(response=>response.data.results)
        .then(function(data){
            // create an new array from result
            // with text/id keys as required by select2
            const arr = new Array();
            data.map(item => {
                const obj = {id:item.id, text:item.name}
                arr.push(obj)             
            })
            dispatch(setAcademics(arr))
        })
        .catch(function (error) {
            console.log(error)
        });
    }
}
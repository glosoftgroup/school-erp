export const SET_CLASSES = 'SET_CLASSES';

export function setClasses(classes) {
    return {
      type: SET_CLASSES,
      payload:classes
    }
  }

  export function fetchClasses() {
    return dispatch => {
        axios.get('/class/api/list')
        .then(response=>response.data.results)
        .then(function(data){
           // create an new array with text/id keys
           const arr = new Array();
           data.map(item => {
             const obj = {id:item.id, text:item.name}
             arr.push(obj)             
           })
           dispatch(setClasses(arr))
        })
        .catch(function (error) {
            // handleResponse(error);
            console.log('sdfsd sdfe')
            console.log(error)
        });
    }
  }
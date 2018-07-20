export const SET_HOUSES = 'SET_HOUSES';

export function setHouses(payload) {
    return {
      type: SET_HOUSES,
      payload
    }
  }

  export function fetchHouses() {
    return dispatch => {
        axios.get('/house/api/list')
        .then(response=>response.data.results)
        .then(function(data){
           // create an new array with text/id keys
           const arr = new Array();
           data.map(item => {
             const obj = {id:item.id, text:item.name}
             arr.push(obj)             
           })
           dispatch(setHouses(arr))
        })
        .catch(function (error) {            
            console.log(error)
        });
    }
  }
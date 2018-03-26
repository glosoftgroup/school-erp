
import api from '../../../js/students/api/Api'

describe('Api http methods class', () => {
    it('Should return an array', () => {
      var data = Object.assign({});
      const promise = api.create()
      const results = promise.then(function(data){
        data = data
      }).catch(function(error){
        data = error;
      })
      expect(Object.keys(data)).toEqual([])

      
    });
});
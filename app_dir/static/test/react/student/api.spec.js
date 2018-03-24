
import api from '../../../js/students/api/Api'

describe('Api http methods class', () => {
    it('Should return a an array', () => {
      const promise = api.retrieve('/student/api/list')
      const results = promise.then(data=>{return data})
      expect(Object.keys(results)).toEqual([])
    });
});

import { shallow } from '@vue/test-utils'
import Counter from '../js/student/components/Counter.vue'
import Select from '../js/student/components/Select.vue'


//describe('Select.vue', () => {
//  it('Expects to populate a select field', () => {
//    const options = [{
//        "text": "Afghanistan",
//        "id": "AF"
//    }]
//    const value = 1
//    const wrapper = shallow(Select, {
//      context: { props: { options:options, value:value } }
//    })
//    console.log(wrapper.vm)
//    wrapper.find('option').trigger('click')
//    expect(wrapper.options.length).toMatch('1')
//  })
//})

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallow(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).toMatch('1')
  })
})
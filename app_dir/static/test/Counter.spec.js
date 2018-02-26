
import { shallow, mount } from '@vue/test-utils'

import Counter from '../js/student/components/Counter.vue'
import Select from '../js/student/components/Select.vue'


describe('Select.vue', () => {
  it('Expects to populate a select field', () => {
    const options = [{
        "text": "Afghanistan",
        "id": "AF"
    }]

    const value = "Afghanistan"
    const wrapper = shallow(Select)
    wrapper.setProps({options:options, value:value })
    expect(wrapper.element.options[0].value).toMatch("AF")
  })
})

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallow(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).toMatch('1')
  })
})
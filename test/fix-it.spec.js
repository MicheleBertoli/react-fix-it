import React, { Component } from 'react'
import { shallow } from 'enzyme'
import fixIt from '../src'

test('it works', () => {
  console.log = jest.fn()
  const error = new Error('💩')

  class Dummy extends Component {
    componentWillReceiveProps(nextProps) {
      if (nextProps.shouldThrow) {
        throw error
      }
    }

    render() {
      return null
    }
  }

  const SuperDummy = fixIt(Dummy)
  const wrapper = shallow(<SuperDummy />)

  expect(() => wrapper.setProps({ shouldThrow: true })).toThrowError(error)
  expect(console.log).toBeCalledWith(`
test('Dummy should not throw "💩" on componentWillReceiveProps', () => {
  const props = {}
  const wrapper = shallow(<Dummy {...props} />)
  const instance = wrapper.instance()
  const args = [{"shouldThrow":true},{}]

  expect(() => instance['componentWillReceiveProps'](...args)).not.toThrowError('💩')
})`)
})

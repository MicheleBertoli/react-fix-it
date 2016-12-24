import React, { Component } from 'react'
import { shallow } from 'enzyme'
import fixIt, { options } from '../src'

const error = new Error('💩')

beforeAll(() => {
  options.log = jest.fn()
})

beforeEach(() => {
  options.log.mockReset()
})

test('with arguments', () => {
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
  expect(options.log).toBeCalledWith(`test('Dummy should not throw "💩" on componentWillReceiveProps', () => {
  const props = {}
  const wrapper = shallow(<Dummy {...props} />)
  const instance = wrapper.instance()
  const args = [{"shouldThrow":true},{}]

  expect(() => instance.componentWillReceiveProps(...args)).not.toThrowError('💩')
})`)
})

test('without arguments', () => {
  class Dummy extends Component {
    componentWillMount() {
      throw error
    }

    render() {
      return null
    }
  }

  const SuperDummy = fixIt(Dummy)

  expect(() => shallow(<SuperDummy />)).toThrowError(error)
  expect(options.log).toBeCalledWith(`test('Dummy should not throw "💩" on componentWillMount', () => {
  const props = {}
  const wrapper = shallow(<Dummy {...props} />)
  const instance = wrapper.instance()
  const args = []

  expect(() => instance.componentWillMount(...args)).not.toThrowError('💩')
})`)
})

import wrap, { config } from 'react-component-errors'

config.errorHandler = (errorReport) => {
  const message = errorReport.error.message.replace(/'/g, '\\\'')

  const test = `
test('${errorReport.component} should not throw "${message}" on ${errorReport.method}', () => {
  const props = ${JSON.stringify(errorReport.props)}
  const wrapper = shallow(<${errorReport.component} {...props} />)
  const instance = wrapper.instance()
  const args = ${errorReport.arguments ? JSON.stringify([...errorReport.arguments]) : []}

  expect(() => instance['${errorReport.method}'](...args)).not.toThrowError('${message}')
})`

  console.log(test)

  throw errorReport.error
}

export default (Component) => {
  wrap(Component)

  return Component
}

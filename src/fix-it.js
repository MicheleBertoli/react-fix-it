import wrap, { config } from 'react-component-errors'
import options from './options'

config.errorHandler = (errorReport) => {
  const message = errorReport.error.message.replace(/'/g, '\\\'')

  const test = `
test('${errorReport.component} should not throw "${message}" on ${errorReport.method}', () => {
  const props = ${JSON.stringify(errorReport.props)}
  const wrapper = shallow(<${errorReport.component} {...props} />)
  const instance = wrapper.instance()
  const args = ${JSON.stringify(errorReport.arguments ? [...errorReport.arguments] : [])}

  expect(() => instance.${errorReport.method}(...args)).not.toThrowError('${message}')
})`

  options.log(test)

  throw errorReport.error
}

const fixIt = (Component) => {
  wrap(Component)

  return Component
}

export default fixIt

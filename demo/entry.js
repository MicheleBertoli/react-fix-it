import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fixIt, { options } from '../src'

class Evil extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldThrow) {
      throw new Error('💩')
    }
  }

  render() {
    return <div>Hello ⚛</div>
  }

}

const SuperEvil = fixIt(Evil)

class CustomLogger extends Component {

  constructor(props) {
    super(props)

    this.state = { test: null }

    options.log = test => this.setState({ test })
  }

  render() {
    return this.state.test && <pre>{this.state.test}</pre>
  }

}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { shouldThrow: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ shouldThrow: true })
  }

  render() {
    return (
      <div>
        <SuperEvil shouldThrow={this.state.shouldThrow} />
        <button onClick={this.handleClick}>💥</button>
        <CustomLogger />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.body)

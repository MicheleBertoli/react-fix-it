# React Fix It
Automagically generate tests from errors.

How to use it:

- Enhance your components with `fixIt`
- Write some bugs
- Check the console

## Installation

```
yarn add --dev react-fix-it
```

## Usage

```jsx
import fixIt from 'react-fix-it'

class BoringComponent extends Component {
  render() {
    return <div>Hello ⚛</div>
  }
}

const SuperComponent = fixIt(BoringComponent)
```

## Test

```
yarn test
```

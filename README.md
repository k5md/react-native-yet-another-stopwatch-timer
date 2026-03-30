# react-native-yet-another-stopwatch-timer

A highly extensible stopwatch, timer component for React Native.
* Uses react-native-reanimated to allow for zero component rerenders
* Allows for custom timing, precision, digit rendering, states and transitions, whatever

The module exports Counter, Stopwatch and Timer components.
Counter serves as base component.
Stopwatch features are achieved by providing:
  - initialState for the state machine
  - timingHandler to increment the counter at least every timingInterval
  - timingRemove to clean the timeout when the component is removed
  - transitionHandler that returns an object with nextState based on transition and current state
  - render function that returns a React component provided counter and style arguments
Timer features are achieved by providing other timing function to Stopwatch that decrements the counter and issues a transition to stop state when it reaches zero.

<p align="center">
  <img src="https://s7.gifyu.com/images/">
</p>

## Getting Started
### Installation
```
npm install react-native-yet-another-stopwatch-timer --save
```
### Usage
Check out [example project](https://github.com/k5md/react-native-yet-another-stopwatch-timer/tree/master/example).
 
```javascript

```

### Props
| parameter  | type   | description |
| :--------  | :----  | :---------- |
| initialState | any | placeholder |
| onBeforeTransition | function | placeholder |
| onAfterTransition | function | placeholder |
| render | function | placeholder |
| timerRef | React ref | placeholder |
| timingHandler | function | placeholder |
| timingInterval | any | placeholder |
| timingRemove | function | placeholder |
| transitionHandler | function | placeholder |
| style | Stylesheet object | placeholder |

### How to show less or more places?
Provide your own render property and declare needed reanimated derived values for counter, that updates in timingHandler each timingInterval, by default counter gets incremented every decisecond.
```javascript

```

## Development
In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Install package dependencies with `npm install`
3. Navigate to example folder: `cd example`
3. Install example project dependencies `npm install`
3. Run Metro bundler with `react-native start`
4. Connect an emulator or physical device via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
5. Build and watch with `react-native run-android`, changes from src directory are picked automatically because of example's metro and babel configurations.

## Contributions
PR are always welcome!

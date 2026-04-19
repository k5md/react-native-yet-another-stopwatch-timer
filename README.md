# react-native-yet-another-stopwatch-timer

A highly extensible stopwatch, timer component for React Native.
* Uses react-native-reanimated to allow for zero component rerenders
* Allows for custom timing, precision, digit rendering, states and transitions, whatever

The module exports Counter, Stopwatch and Timer components.
Counter serves as base component.
Stopwatch features are achieved by providing:
  - initialState for the state machine
  - timingHandler to increment the counter at least every timingInterval
  - removeTiming to clean the timeout when the component is removed
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
import React, { useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Stopwatch, StopwatchTransitions, StopwatchStates } from 'react-native-yet-another-stopwatch-timer';

const Component = () => {
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states
  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
  // use onBeforeTransition, onAfterTransition callback to access counter on state change
  const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
  return (
    <View>
      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
      <TouchableOpacity onPress={pause}><Text>Pause</Text></TouchableOpacity>
      <Stopwatch timerRef={timerRef} />
    </View>
  );
};
```

```javascript
import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';

const Component = ({ initialCounterValue }) => {
  const [ laps, setLaps ] = useState(0);
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states, set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
  const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialCounterValue }), [ timerRef ]);
  const onAfterTransition = useCallback(({ state }) => {
    if (state.value === TimerStates.Stopped) setLaps((laps) => laps + 1);
  }, [ laps, setLaps ]);
  return (
    <View>
      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
      <Timer timerRef={timerRef} onAfterTransition={onAfterTransition} initialCounterValue={initialCounterValue} />
      <Text>Laps: {laps}</Text>
    </View>
  );
};
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
| removeTiming | function | placeholder |
| transitionHandler | function | placeholder |
| style | Stylesheet object | placeholder |

## Q&A
### How to show less or more places?
Provide your own render property and declare needed reanimated derived values for counter, that updates in timingHandler each timingInterval, by default counter gets incremented every decisecond.
[Текст ссылки](./example/Derived.jsx)
```javascript

```

### How to get better precision?
setTimeout and setInterval guarantee that callback will be called *not sooner* than timeout ms.
 A self-adjusting timer compensates for this "drift" by calculating how much late (or early) a tick was and adjusting the next delay accordingly.
For precise timing you can either implement a self adjusting timer using Date.now(), or if you just need to accurately capture when play, pause or stop events occur, capture precise time in global onBeforeTransition/onAfterTransition handlers, or for individual transitions in transitionHandler.

```javascript

```

## Development
In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Navigate to example folder: `cd example`
3. Install example project dependencies `npm install`
4. Run Metro bundler with `react-native start`
5. Connect an emulator or physical device via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
6. Build and watch with `react-native run-android`, changes from src directory are picked automatically because of example's metro and babel configurations.

## Contributions
PR are always welcome!

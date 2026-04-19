# react-native-yet-another-stopwatch-timer

A highly extensible stopwatch, timer component for React Native.
* Uses react-native-reanimated to allow for zero component rerenders
* Custom timing functions, precision, group / digit rendering, states and transitions

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
Check out [example project](./example) for most of use cases.

####Minimal Stopwatch example
```jsx
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
####Minimal Timer usage example
```jsx
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

## Interface
### Stopwatch & Timer & Counter
| parameter  | type   | description |
| :--------  | :----  | :---------- |
| [initialState](#initialState) | any | initial value for state |
| [initialCounterValue](#initialCounterValue) | any | initial value for counter |
| [onBeforeTransition](#onBeforeTransition) | function | will be called before state changes, can cancel transition |
| [onAfterTransition](#onAfterTransition) | function | will be called after state change |
| [render](#render) | function | custom render function for counter value |
| [timerRef](#timerRef) | React ref object | the intended handle to perform state transitions |
| [timingHandler](#timingHandler) | function | worker that updates counter value |
| [timingInterval](#timingInterval) | any | intended time interval for timing handler to perform counter updates |
| [removeTiming](#removeTiming) | function | clean up function |
| [transitionHandler](#transitionHandler) | function | creates transition object based on provided transition name |
| [transitionRouter](#transitionRouter) | any | calls transition handler and manages state value |
| [style](#style) | Stylesheet object | style overrides that get passed to render |

#### onBeforeTransition
Called before state change, use for managing side-effects

Return truthy value to cancel state change and onBeforeTransition handlers calls of lower priority, order described in [TransitionRouter][18].

##### Parameters

*   `transitionContext` **[TransitionContext][22]**&#x20;
*   `transitionExtraContext` **TransitionExtraContext**&#x20;
*   `transition` **[Transition][10]**&#x20;

#### onAfterTransition

Called after state change, use for managing side-effects.

Type: [Function][62]

##### Parameters

*   `transitionContext` **[TransitionContext][22]**&#x20;
*   `transitionExtraContext` **TransitionExtraContext**&#x20;
*   `transition` **any**&#x20;

#### render

Counter render function presents counter value as [ReactNode][3] and is passed to base component [Counter][40]

One can provide their custom function or use already implemented ones in [Renderers](#Renderers).

Type: [Function][62]

##### Parameters

*   `counter` **[SharedValue][1]**&#x20;
*   `timingInterval` **any**&#x20;
*   `initialCounterValue` **any**&#x20;
*   `style` **Styles**&#x20;

Returns **[ReactNode][3]**&#x20;

#### Renderers

Type: [Object][60]

##### Properties

*   `Individual` **[Render][34]** Renders each digit of counter value as individual Place component with Text separators
*   `Group` **[Render][34]** Renders counter value as one animated TextInput
*   `Static` **[Render][34]** Renders counter value as a regular Text (use for fake sharedValue objects)

#### timerRef
Handle to control timer

Used to provide transitionTo function to switch state, this function is intended to be the only way parent component interacts with timer.
```jsx
  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
```

The ref is also passed to [TimingHandler][27] to switch state when counter reaches certain values.

Type: [RefObject][4]<[TimerRefProps][24]>
*   `state` **[SharedValue][1]**&#x20;
*   `counter` **[SharedValue][1]**&#x20;
*   `timeout` **[SharedValue][1]**&#x20;
*   `transitionTo` **[TransitionTo][20]**&#x20;

#### timingHandler
Timing worklet that runs on UI-thread for updating counter and schedules a recursive call to itself

It should change counter value based on current state every timingInterval and update timeout shared variable so that whenever component gets rerendered, removeTiming could perform a clean up.
```jsx
    const timingHandler = function defaultTimingHandler({ timingInterval, counter, state, timeout, timerRef }) {
     'worklet';
     const decrementCounter = () => {
         if (state.value === StopwatchStates.Running) {
             if (counter.value > 0) counter.value -= 1;
             if (counter.value < 1) runOnJS(timerRef.current.transitionTo)({ name: StopwatchTransitions.Stop });
         }
         timeout.value = setTimeout(decrementCounter, timingInterval);
     }
    timeout.value = setTimeout(decrementCounter, timingInterval);
    };
```
Type: [Function][62]

##### Parameters

*   `context` **[Object][60]**&#x20;

    *   `context.timingInterval` **any**&#x20;
    *   `context.state` **[SharedValue][1]**&#x20;
    *   `context.counter` **[SharedValue][1]**&#x20;
    *   `context.timeout` **[SharedValue][1]**&#x20;
    *   `context.timerRef` **[TimerRef][26]**&#x20;

#### removeTiming
Callback called on base component rerender

It must perform cleanup for whatever repeating timeout logic one uses in timingHandler
(e.g. if setTimeout is used, then it has to call clearTimeout), use timeout shared variable in timingHandler to
pass current timeout identifier.

Type: [Function][62]

##### Parameters

*   `timeout` **[SharedValue][1]** Identifier set by timingHandler

#### transitionHandler

Produces object describing changes based on `transitionExtraContext.name`: next state, what to do before and after state change

If this function returns falsy, then state value won't get changed, no `onBeforeTransition` and no `onAfterTransition` handlers will get called.

Type: [Function][62]

##### Parameters

*   `transitionContext` **[TransitionContext][22]**&#x20;
*   `transitionExtraContext` **TransitionExtraContext**&#x20;

Returns **([Transition][10] | void)**&#x20;

#### Style
##### Properties

*   `container` **[Object][60]?** style for wrappers
*   `place` **[Object][60]?** style for [Place][58] component
*   `digit` **[Object][60]?** style for [Digit][54] component

Style overrides for component, this get passed to `render` function [Render][34]

#### TransitionRouter

Manages state value after routing

This function calls `transitionContext.transitionHandler` to get [Transition][10] object to change from current state to next,
calls `onBeforeTransition` callbacks in the following order:

1.  property of `transitionTo` argument, passed when calling `transitionTo` from `timerRef.current` [TransitionTo][20]
2.  property of `transition` object returned from `transitionHandler` [TransitionHandler][16]
3.  property passed to component [Counter][40]

If any of these callbacks return truthy then transition gets cancelled and subsequent callbacks (other `onBeforeTransition` and every `onAfterTransition`) don't get called.
Else it updates state to new value from transition and calls `onAfterTransition` callbacks in the same order.

Type: [Function][62]

##### Parameters

*   `transitionContext` **[TransitionContext][22]**&#x20;
*   `transitionExtraContext` **TransitionExtraContext**&#x20;

Returns **void**&#x20;

#### transitionContext

Context provided and captured from [Counter][40], containing handlers passed as props to component, state and
counter

Type: [Object][60]

##### Properties

*   `onBeforeTransition` **[OnBeforeTransition][12]**&#x20;
*   `onAfterTransition` **[OnAfterTransition][14]**&#x20;
*   `state` **[SharedValue][1]**&#x20;
*   `counter` **[SharedValue][1]**&#x20;
*   `transitionHandler` **[TransitionHandler][16]**&#x20;

#### transitionExtraContext

Additional context provided by transitionTo function, it is used to switch states depending on name property

##### Properties

*   `onBeforeTransition` **[OnBeforeTransition][12]**&#x20;
*   `onAfterTransition` **[OnAfterTransition][14]**&#x20;
*   `name` transition name, used to route and create correct transition object in transitionHandler
*   `counter` **[SharedValue][1]**&#x20;
*   `transitionHandler` **[TransitionHandler][16]**&#x20;

#### transitionTo
This function is used to switch timer state

Partially applied version of [TransitionRouter][18] with `transitionContext` argument pre-bound,
this function is intended to be the only way parent component interacts with counter,
one does this by switching states.

    const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);

##### Parameters

*   `transitionExtraContext`

## Q&A
### How to show less or more places? How to render differently, use other digit changing animations?
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

### How to react to timer countdown reaching zero? How to keep track of pause events?
[Текст ссылки](./example/Intervals.jsx)

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

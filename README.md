# react-native-yet-another-stopwatch-timer
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fk5md%2Freact-native-yet-another-stopwatch-timer%2Fraw%2Fmaster%2Fpackage.json&query=%24.peerDependencies.react&label=react) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fk5md%2Freact-native-yet-another-stopwatch-timer%2Fraw%2Fmaster%2Fpackage.json&query=%24.peerDependencies.react-native&label=react-native) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fk5md%2Freact-native-yet-another-stopwatch-timer%2Fraw%2Fmaster%2Fpackage.json&query=%24.peerDependencies.react-native-reanimated&label=react-native-reanimated) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fk5md%2Freact-native-yet-another-stopwatch-timer%2Fraw%2Fmaster%2Fpackage.json&query=%24.peerDependencies.react-native-worklets&label=react-native-worklets)

## Features
A fully extensible stopwatch, timer component for React Native.
* Uses [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated) and [react-native-worklets](https://www.npmjs.com/package/react-native-worklets) to make performant component updates
* Allows for custom timing functions, precision, group / digit rendering, states and transitions

<p align="center">
  <img src="assets/stopwatch-timer-illustration.gif" alt="Demo" width="320">
</p>

## Installation
```
npm install --save react-native-yet-another-stopwatch-timer
```
This library uses [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated) and [react-native-worklets](https://www.npmjs.com/package/react-native-worklets) listed as peer dependencies so you have to provide them:
```
npm install --save react-native-reanimated react-native-worklets
```
Minimal supported versions of peer dependencies are defined by [react-native-reanimated compatibility table](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/) and [react-native-worklets compatibility table](https://docs.swmansion.com/react-native-worklets/docs/guides/compatibility/).

## Usage
Check out [example project](./example) for most of use cases:

| File | Example description |
| :----  | :----------- |
| [Stopwatch](./example/Stopwatch.jsx) | controlling the stopwatch, providing style for digits, callback after every transition |
| [Timer](./example/Timer.jsx) | controlling the timer, setting initial value for countdown, providing style for digits, callback after every transition |
| [Derived](./example/Derived.jsx) | controlling the timer, setting initial value for countdown, providing style for digits, custom render function |
| [Intervals](./example/Intervals.jsx) | controlling the stopwatch, providing style for digits, using counter value in handler, using callback after transition success, using Static renderer for other component to preserve same style |

Or check minimal examples to copy-paste:

### Minimal Stopwatch example
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

### Minimal Timer usage example
```jsx
import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';

const Component = ({ initialCounterValue }) => {
  const [ laps, setLaps ] = useState(0);
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states, set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
  const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialCounterValue }), [ timerRef, initialCounterValue ]);
  const onAfterTransition = useCallback(({ state }) => {
    if (state.value === TimerStates.Stopped) setLaps((prevLaps) => prevLaps + 1);
  }, [ setLaps ]);
  return (
    <View>
      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
      <Timer timerRef={timerRef} onAfterTransition={onAfterTransition} initialCounterValue={initialCounterValue} />
      <Text>Laps: {laps}</Text>
    </View>
  );
};
```

## Q&A

### How to show less or more places? How to render differently, use other digit changing animations?
Provide your own render property and declare needed reanimated derived values for counter, that gets updated by timingHandler each timingInterval by timingInterval, by default counter gets incremented by 100 every 100 ms. Check example [Derived](./example/Derived.jsx).

### How to get better timing precision?
`setTimeout` and `setInterval` guarantee that callback will be called *not sooner* than `timeout` ms. For precise timing you can either implement a self adjusting timer, that compensates for varying timeout call times, or use `Date.now()`, or if you just need to accurately capture when run, pause or stop events occur, capture precise time in global onBeforeTransition/onAfterTransition handlers, or for individual transitions in transitionHandler.

## Getting started with customisation
The module exports [Counter](./src/Counter.jsx), [Stopwatch](./src/Stopwatch.jsx) and [Timer](./src/Timer.jsx) components, state and transition names.

Counter serves as base component that only provides means of calling transition function and registers timing handler.

Stopwatch is implemented by providing default values for Counter:
  - `initialState` for the state machine
  - `timingHandler` to increment the counter at least every timingInterval by timingInterval
  - `removeTiming` to clean the timeout when the component is removed
  - `transitionHandler` that returns an object with `nextState` property based on transition and current state
  - `render` function that returns a React component provided counter and style arguments

Timer features are achieved by providing other timing function to Stopwatch that decrements the counter and issues a transition to stopped state when it reaches zero.

## Development
In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Navigate to parent directory and install dev dependencies with `npm ci` for linting `npm run lint` and typescript typechecking `npm run typecheck`.
3. Navigate to example folder: `cd example`
4. Install example project dependencies `npm ci`, since library has only peer dependencies
5. Run Metro bundler with `npm run start`
6. Connect physical device or an emulator via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
7. Build and watch with `npm run-android`, changes from src directory are picked automatically because of example metro and babel configurations.

**Note:** example project is configured in [a way](./example/metro.config.js), that may cause issues if you save anything as a regular dependency in parent library

## Contributions
PR are always welcome!

<!-- API_DOCS_START -->

## Type Aliases

<a id="onaftertransition"></a>

### OnAfterTransition

```ts
type OnAfterTransition = (transitionContext, transitionExtraContext, transition) => void;
```

Called after state change, use for managing side-effects.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transitionContext` | [`TransitionContext`](#transitioncontext) |
| `transitionExtraContext` | [`TransitionExtraContext`](#transitionextracontext) |
| `transition` | [`Transition`](#transition) |

#### Returns

`void`

***

<a id="onbeforetransition"></a>

### OnBeforeTransition

```ts
type OnBeforeTransition = (transitionContext, transitionExtraContext, transition) => boolean | void;
```

Called before state change, use for managing side-effects

Return truthy value to cancel state change and onBeforeTransition handlers calls of lower priority, order described in [TransitionRouter](#transitionrouter).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transitionContext` | [`TransitionContext`](#transitioncontext) |
| `transitionExtraContext` | [`TransitionExtraContext`](#transitionextracontext) |
| `transition` | [`Transition`](#transition) |

#### Returns

`boolean` \| `void`

shouldInterrupt flag, if true transition won't happen

***

<a id="removetiming"></a>

### RemoveTiming

```ts
type RemoveTiming = (timeout) => void;
```

Callback called on base component rerender

It must perform cleanup for whatever repeating timeout logic one uses in timingHandler
(e.g. if setTimeout is used, then it has to call clearTimeout), use timeout shared variable in timingHandler to
pass current timeout identifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `timeout` | `SharedValue` | Identifier set by timingHandler |

#### Returns

`void`

***

<a id="render"></a>

### Render

```ts
type Render = (props) => ReactNode;
```

Counter render function presents counter value as [ReactNode](#) and is passed to base component [Counter](#counter)

One can provide their custom function or use already implemented ones in [Renderers](#renderers).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | \{ `counter`: \| `SharedValue`\<`any`\> \| \{ \[`key`: `string`\]: `any`; `value`: `any`; \}; `initialCounterValue?`: `any`; `style?`: [`Styles`](#styles); `timingInterval?`: `any`; \} |
| `props.counter` | \| `SharedValue`\<`any`\> \| \{ \[`key`: `string`\]: `any`; `value`: `any`; \} |
| `props.initialCounterValue?` | `any` |
| `props.style?` | [`Styles`](#styles) |
| `props.timingInterval?` | `any` |

#### Returns

[`ReactNode`](#)

***

<a id="styles"></a>

### Styles

```ts
type Styles = object;
```

Style overrides for component, this gets passed to [render](#render) function

#### Properties

<a id="container"></a>

##### container?

```ts
optional container?: AnyStyle;
```

style for wrappers

<a id="digit"></a>

##### digit?

```ts
optional digit?: AnyStyle;
```

style for [Digit](#digit-1) component

<a id="place"></a>

##### place?

```ts
optional place?: AnyStyle;
```

style for [Place](#place-1) component

***

<a id="timerref"></a>

### TimerRef

```ts
type TimerRef = RefObject<TimerRefProps>;
```

Handle to control timer

Used to provide transitionTo function to switch state, this function is intended to be the only way parent component
interacts with timer.
```
const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
```

The ref is also passed to [TimingHandler](#timinghandler) to switch state when counter reaches certain values.

***

<a id="timinghandler"></a>

### TimingHandler

```ts
type TimingHandler = (context) => void;
```

Timing worklet that runs on UI-thread for updating counter and schedules a recursive call to itself

It should change counter value based on current state every timingInterval and update timeout shared variable
so that whenever component gets rerendered, removeTiming could perform a clean up.
```
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

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | \{ `counter`: `SharedValue`\<`any`\>; `state`: `SharedValue`\<`any`\>; `timeout`: `SharedValue`\<`any`\>; `timerRef`: [`TimerRef`](#timerref); `timingInterval`: `any`; \} |
| `context.counter` | `SharedValue`\<`any`\> |
| `context.state` | `SharedValue`\<`any`\> |
| `context.timeout` | `SharedValue`\<`any`\> |
| `context.timerRef` | [`TimerRef`](#timerref) |
| `context.timingInterval` | `any` |

#### Returns

`void`

***

<a id="transition"></a>

### Transition

```ts
type Transition = object;
```

Description of next state, what to do before and after state change

***

<a id="transitioncontext"></a>

### TransitionContext

```ts
type TransitionContext = object;
```

Context provided and captured from [Counter](#counter), containing handlers passed as props to component, state and
counter

***

<a id="transitionextracontext"></a>

### TransitionExtraContext

```ts
type TransitionExtraContext = object;
```

Additional context provided by transitionTo function, it is used to switch states depending on name property

#### Properties

<a id="name"></a>

##### name

```ts
name: string;
```

transition name, used to route and create correct transition object in transitionHandler

***

<a id="transitionhandler"></a>

### TransitionHandler

```ts
type TransitionHandler = (transitionContext, transitionExtraContext) => Transition | void;
```

Produces object describing changes based on `transitionExtraContext.name`: next state, what to do before and after state change

If this function returns falsy, then state value won't get changed, no `onBeforeTransition` and no `onAfterTransition` handlers will get called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transitionContext` | [`TransitionContext`](#transitioncontext) |
| `transitionExtraContext` | [`TransitionExtraContext`](#transitionextracontext) |

#### Returns

[`Transition`](#transition) \| `void`

Object corresponding to [Transition](#transition) or nothing

***

<a id="transitionrouter"></a>

### TransitionRouter

```ts
type TransitionRouter = (transitionContext, transitionExtraContext) => void;
```

Manages state value after routing

This function calls `transitionContext.transitionHandler` to get [Transition](#transition) object to change from current state to next,
calls `onBeforeTransition` handlers in the following order:
1. property of `transitionTo` argument, passed when calling [transitionTo](#transitionto) from `timerRef.current`
2. property of `transition` object returned from [transitionHandler](#transitionhandler)
3. property passed to component [Counter](#counter)

If any of these callbacks return truthy then transition gets cancelled and subsequent callbacks (other `onBeforeTransition` and every `onAfterTransition`) don't get called.
Else it updates state to new value from transition and calls `onAfterTransition` callbacks in the same order.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transitionContext` | [`TransitionContext`](#transitioncontext) |
| `transitionExtraContext` | [`TransitionExtraContext`](#transitionextracontext) |

#### Returns

`void`

***

<a id="transitionto"></a>

### TransitionTo

```ts
type TransitionTo = (transitionExtraContext) => void;
```

This function is used to switch timer state

Partially applied version of [TransitionRouter](#transitionrouter) with `transitionContext` argument pre-bound,
this function is intended to be the only way parent component interacts with counter,
one does this by switching states.
```
const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transitionExtraContext` | [`TransitionExtraContext`](#transitionextracontext) |

#### Returns

`void`

## Variables

<a id="renderers"></a>

### Renderers

```ts
const Renderers: object;
```

Predefined renderers

#### Type Declaration

<a id="group"></a>

##### Group

```ts
Group: Render;
```

Renders counter value as one animated TextInput

<a id="individual"></a>

##### Individual

```ts
Individual: Render;
```

Renders each digit of counter value as individual Place component with Text separators

<a id="static"></a>

##### Static

```ts
Static: Render;
```

Renders counter value as a regular Text (use for fake sharedValue objects)

## Functions

<a id="counter"></a>

### Counter()

```ts
function Counter(props): ReactNode;
```

Base component, binds state, counter and timeout properties to `transitionRouter` to provide means for changing state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `initialCounterValue`: `any`; `initialState`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming`: [`RemoveTiming`](#removetiming); `render`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler`: [`TimingHandler`](#timinghandler); `timingInterval`: `any`; `transitionHandler`: [`TransitionHandler`](#transitionhandler); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
| `props.initialCounterValue` | `any` | initial value for counter SharedValue |
| `props.initialState` | `any` | initial value for state SharedValue |
| `props.onAfterTransition?` | [`OnAfterTransition`](#onaftertransition) | will be called after state change, details: [OnAfterTransition](#onaftertransition) |
| `props.onBeforeTransition?` | [`OnBeforeTransition`](#onbeforetransition) | will be called before state changes, can cancel transition, details: [OnBeforeTransition](#onbeforetransition) |
| `props.removeTiming` | [`RemoveTiming`](#removetiming) | clean up function, details: [RemoveTiming](#removetiming) |
| `props.render` | [`Render`](#render) | custom render function for counter value, details: [Render](#render) |
| `props.style?` | [`Styles`](#styles) | style overrides that get passed to render, details: [Styles](#styles) |
| `props.timerRef` | [`TimerRef`](#timerref) | the intended handle to perform state transitions, details: [TimerRef](#timerref) |
| `props.timingHandler` | [`TimingHandler`](#timinghandler) | worker that updates counter value, details: [TimingHandler](#timinghandler) |
| `props.timingInterval` | `any` | intended time interval for timing handler to perform counter updates, by default counter gets increased by timingInterval |
| `props.transitionHandler` | [`TransitionHandler`](#transitionhandler) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)

***

<a id="digit-1"></a>

### Digit()

```ts
function Digit(props): ReactNode;
```

Per-digit component that runs animation when assigned digit matches actual digit value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `DigitProps` |

#### Returns

[`ReactNode`](#)

***

<a id="place-1"></a>

### Place()

```ts
function Place(props): ReactNode;
```

Represents one place of a number, groups digits (0-9) for animation purposes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `PlaceProps` |

#### Returns

[`ReactNode`](#)

***

<a id="stopwatch"></a>

### Stopwatch()

```ts
function Stopwatch(props): ReactNode;
```

Stopwatch implementation
[Counter](#counter) provided with defaults to act as a stopwatch. Use [timerRef](#timerref) and call `timerRef.current?.transitionTo` to change `state`.
By default `counter` increments by 100 every 100 ms, time is rendered in mm:ss.d format. Provide custom [render](#render) property defining animated values derived
from counter to get hours, days etc, or use one of predefined [Renderers](#renderers). For higher granularity, change `timingInterval` in ms,
it defines how often [timingHandler](#timinghandler) is called that changes counter value.
For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.

```
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

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `initialCounterValue?`: `any`; `initialState?`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming?`: [`RemoveTiming`](#removetiming); `render?`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler?`: [`TimingHandler`](#timinghandler); `timingInterval?`: `any`; `transitionHandler?`: [`TransitionHandler`](#transitionhandler); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
| `props.initialCounterValue?` | `any` | initial value for counter SharedValue |
| `props.initialState?` | `any` | initial value for state SharedValue |
| `props.onAfterTransition?` | [`OnAfterTransition`](#onaftertransition) | will be called after state change, details: [OnAfterTransition](#onaftertransition) |
| `props.onBeforeTransition?` | [`OnBeforeTransition`](#onbeforetransition) | will be called before state changes, can cancel transition, details: [OnBeforeTransition](#onbeforetransition) |
| `props.removeTiming?` | [`RemoveTiming`](#removetiming) | clean up function, details: [RemoveTiming](#removetiming) |
| `props.render?` | [`Render`](#render) | custom render function for counter value, details: [Render](#render) |
| `props.style?` | [`Styles`](#styles) | style overrides that get passed to render, details: [Styles](#styles) |
| `props.timerRef` | [`TimerRef`](#timerref) | the intended handle to perform state transitions, details: [TimerRef](#timerref) |
| `props.timingHandler?` | [`TimingHandler`](#timinghandler) | worker that updates counter value, details: [TimingHandler](#timinghandler) |
| `props.timingInterval?` | `any` | intended time interval for timing handler to perform counter updates, by default counter gets increased by timingInterval |
| `props.transitionHandler?` | [`TransitionHandler`](#transitionhandler) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)

***

<a id="timer"></a>

### Timer()

```ts
function Timer(props): ReactNode;
```

Timer implementation

[Stopwatch](#stopwatch) provided with custom `timingHandler` to act as a timer. Use [timerRef](#timerref) and call `timerRef.current?.transitionTo` to change `state`.
By default `counter` decrements by 100 every 100 ms, time is rendered in mm:ss.d format. Provide custom [render](#render) property defining animated values derived
from counter to get hours, days etc, or use one of predefined [Renderers](#renderers). For higher granularity, change `timingInterval` in ms,
it defines how often [timingHandler](#timinghandler) is called that changes counter value.
For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.

```
import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';
const Component = ({ initialCounterValue }) => {
 const [ laps, setLaps ] = useState(0);
 const timerRef = useRef(null);
 // use timerRef to call transitionTo property to switch states:
 // set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
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

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `initialCounterValue?`: `any`; `initialState?`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming?`: [`RemoveTiming`](#removetiming); `render?`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler?`: [`TimingHandler`](#timinghandler); `timingInterval?`: `any`; `transitionHandler?`: [`TransitionHandler`](#transitionhandler); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
| `props.initialCounterValue?` | `any` | initial value for counter SharedValue |
| `props.initialState?` | `any` | initial value for state SharedValue |
| `props.onAfterTransition?` | [`OnAfterTransition`](#onaftertransition) | will be called after state change, details: [OnAfterTransition](#onaftertransition) |
| `props.onBeforeTransition?` | [`OnBeforeTransition`](#onbeforetransition) | will be called before state changes, can cancel transition, details: [OnBeforeTransition](#onbeforetransition) |
| `props.removeTiming?` | [`RemoveTiming`](#removetiming) | clean up function, details: [RemoveTiming](#removetiming) |
| `props.render?` | [`Render`](#render) | custom render function for counter value, details: [Render](#render) |
| `props.style?` | [`Styles`](#styles) | style overrides that get passed to render, details: [Styles](#styles) |
| `props.timerRef` | [`TimerRef`](#timerref) | the intended handle to perform state transitions, details: [TimerRef](#timerref) |
| `props.timingHandler?` | [`TimingHandler`](#timinghandler) | worker that updates counter value, details: [TimingHandler](#timinghandler) |
| `props.timingInterval?` | `any` | intended time interval for timing handler to perform counter updates, by default counter gets increased by timingInterval |
| `props.transitionHandler?` | [`TransitionHandler`](#transitionhandler) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)


<!-- API_DOCS_END -->
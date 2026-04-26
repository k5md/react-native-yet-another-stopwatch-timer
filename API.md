<!-- API_DOCS_START -->

## Type Aliases

<a id="anystyle"></a>

### AnyStyle

```ts
type AnyStyle = StyleProp<ViewStyle | TextStyle | ImageStyle>;
```

***

<a id="counterprops"></a>

### CounterProps

```ts
type CounterProps = SetOptional<CounterBaseProps, CounterDefaultedPropKeys>;
```

***

<a id="digitprops"></a>

### DigitProps

```ts
type DigitProps = object;
```

#### Properties

<a id="actualdigit"></a>

##### actualDigit

```ts
actualDigit: SharedValue<any>;
```

<a id="assigneddigit"></a>

##### assignedDigit

```ts
assignedDigit: number;
```

<a id="style"></a>

##### style?

```ts
optional style?: AnyStyle;
```

***

<a id="onaftertransition"></a>

### OnAfterTransition

```ts
type OnAfterTransition = (transitionContext: TransitionContext, transitionExtraContext: TransitionExtraContext, transition: Transition) => void;
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
type OnBeforeTransition = (transitionContext: TransitionContext, transitionExtraContext: TransitionExtraContext, transition: Transition) => boolean | void;
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

<a id="placeprops"></a>

### PlaceProps

```ts
type PlaceProps = object;
```

#### Properties

<a id="digit"></a>

##### digit

```ts
digit: SharedValue<any>;
```

<a id="style-1"></a>

##### style?

```ts
optional style?: Styles;
```

***

<a id="removetiming"></a>

### RemoveTiming

```ts
type RemoveTiming = (timeout: SharedValue) => void;
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
type Render = (props: object) => ReactNode;
```

Counter render function presents counter value as [ReactNode](#) and is passed to base component [Counter](#counter-2)

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

<a id="stopwatchprops"></a>

### StopwatchProps

```ts
type StopwatchProps = SetOptional<CounterProps, StopwatchDefaultedPropKeys>;
```

***

<a id="stopwatchstate"></a>

### StopwatchState

```ts
type StopwatchState = typeof StopwatchStates[keyof typeof StopwatchStates];
```

***

<a id="stopwatchtransition"></a>

### StopwatchTransition

```ts
type StopwatchTransition = typeof StopwatchTransitions[keyof typeof StopwatchTransitions];
```

***

<a id="styles"></a>

### Styles

```ts
type Styles = object;
```

Style overrides for component, this gets passed to [render](#render) function

#### Indexable

```ts
[key: string]: AnyStyle
```

#### Properties

<a id="container"></a>

##### container?

```ts
optional container?: AnyStyle;
```

style for wrappers

<a id="digit-1"></a>

##### digit?

```ts
optional digit?: AnyStyle;
```

style for [Digit](#digit-2) component

<a id="place"></a>

##### place?

```ts
optional place?: AnyStyle;
```

style for [Place](#place-1) component

***

<a id="timerprops"></a>

### TimerProps

```ts
type TimerProps = SetOptional<StopwatchProps, TimerDefaultedPropKeys>;
```

***

<a id="timerref"></a>

### TimerRef

```ts
type TimerRef = RefObject<TimerRefProps | null>;
```

Handle to control timer

Used to provide transitionTo function to switch state, this function is intended to be the only way parent component
interacts with timer.
```
const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
```

The ref is also passed to [TimingHandler](#timinghandler) to switch state when counter reaches certain values.

***

<a id="timerrefprops"></a>

### TimerRefProps

```ts
type TimerRefProps = object;
```

#### Properties

<a id="counter"></a>

##### counter

```ts
counter: SharedValue<any>;
```

<a id="state"></a>

##### state

```ts
state: SharedValue<any>;
```

<a id="timeout"></a>

##### timeout

```ts
timeout: SharedValue<any>;
```

<a id="transitionto"></a>

##### transitionTo

```ts
transitionTo: TransitionTo;
```

***

<a id="timinghandler"></a>

### TimingHandler

```ts
type TimingHandler = (context: object) => void;
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

#### Properties

<a id="nextstate"></a>

##### nextState

```ts
nextState: any;
```

<a id="onaftertransition-1"></a>

##### onAfterTransition?

```ts
optional onAfterTransition?: OnAfterTransition;
```

<a id="onbeforetransition-1"></a>

##### onBeforeTransition?

```ts
optional onBeforeTransition?: OnBeforeTransition;
```

***

<a id="transitioncontext"></a>

### TransitionContext

```ts
type TransitionContext = object;
```

Context provided and captured from [Counter](#counter-2), containing handlers passed as props to component, state and
counter

#### Properties

<a id="counter-1"></a>

##### counter

```ts
counter: SharedValue<any>;
```

<a id="onaftertransition-2"></a>

##### onAfterTransition

```ts
onAfterTransition: OnAfterTransition;
```

<a id="onbeforetransition-2"></a>

##### onBeforeTransition

```ts
onBeforeTransition: OnBeforeTransition;
```

<a id="state-1"></a>

##### state

```ts
state: SharedValue<any>;
```

<a id="transitionhandler"></a>

##### transitionHandler

```ts
transitionHandler: TransitionHandler;
```

***

<a id="transitionextracontext"></a>

### TransitionExtraContext

```ts
type TransitionExtraContext = object;
```

Additional context provided by transitionTo function, it is used to switch states depending on name property

#### Indexable

```ts
[key: string]: any
```

#### Properties

<a id="name"></a>

##### name

```ts
name: string;
```

transition name, used to route and create correct transition object in transitionHandler

<a id="onaftertransition-3"></a>

##### onAfterTransition?

```ts
optional onAfterTransition?: OnAfterTransition;
```

<a id="onbeforetransition-3"></a>

##### onBeforeTransition?

```ts
optional onBeforeTransition?: OnBeforeTransition;
```

***

<a id="transitionhandler-1"></a>

### TransitionHandler

```ts
type TransitionHandler = (transitionContext: TransitionContext, transitionExtraContext: TransitionExtraContext) => Transition | void;
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
type TransitionRouter = (transitionContext: TransitionContext, transitionExtraContext: TransitionExtraContext) => void;
```

Manages state value after routing

This function calls `transitionContext.transitionHandler` to get [Transition](#transition) object to change from current state to next,
calls `onBeforeTransition` handlers in the following order:
1. property of `transitionTo` argument, passed when calling [transitionTo](#transitionto-1) from `timerRef.current`
2. property of `transition` object returned from [transitionHandler](#transitionhandler-1)
3. property passed to component [Counter](#counter-2)

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

<a id="transitionto-1"></a>

### TransitionTo

```ts
type TransitionTo = (transitionExtraContext: TransitionExtraContext) => void;
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

***

<a id="timerstate"></a>

### TimerState

Renames and re-exports [StopwatchState](#stopwatchstate)

***

<a id="timertransition"></a>

### TimerTransition

Renames and re-exports [StopwatchTransition](#stopwatchtransition)

## Variables

<a id="counterdefaults"></a>

### CounterDefaults

```ts
const CounterDefaults: { readonly [K in CounterDefaultedPropKeys]: CounterBaseProps[K] };
```

***

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

***

<a id="stopwatchdefaults"></a>

### StopwatchDefaults

```ts
const StopwatchDefaults: { readonly [K in StopwatchDefaultedPropKeys]: StopwatchProps[K] };
```

***

<a id="stopwatchstates"></a>

### StopwatchStates

```ts
const StopwatchStates: object;
```

#### Type Declaration

<a id="paused"></a>

##### Paused

```ts
readonly Paused: "Paused";
```

<a id="running"></a>

##### Running

```ts
readonly Running: "Running";
```

<a id="stopped"></a>

##### Stopped

```ts
readonly Stopped: "Stopped";
```

<a id="unset"></a>

##### Unset

```ts
readonly Unset: "Unset";
```

***

<a id="stopwatchtransitions"></a>

### StopwatchTransitions

```ts
const StopwatchTransitions: object;
```

#### Type Declaration

<a id="pause"></a>

##### Pause

```ts
readonly Pause: "Pause";
```

<a id="reset"></a>

##### Reset

```ts
readonly Reset: "Reset";
```

<a id="run"></a>

##### Run

```ts
readonly Run: "Run";
```

<a id="stop"></a>

##### Stop

```ts
readonly Stop: "Stop";
```

***

<a id="timerdefaults"></a>

### TimerDefaults

```ts
const TimerDefaults: { readonly [K in TimerDefaultedPropKeys]: StopwatchProps[K] };
```

***

<a id="timerstates"></a>

### TimerStates

Renames and re-exports [StopwatchStates](#stopwatchstates)

***

<a id="timertransitions"></a>

### TimerTransitions

Renames and re-exports [StopwatchTransitions](#stopwatchtransitions)

## Functions

<a id="counter-2"></a>

### Counter()

```ts
function Counter(props: object): ReactNode;
```

Base component, binds state, counter and timeout properties to `transitionRouter` to provide means for changing state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `initialCounterValue`: `any`; `initialState`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming`: [`RemoveTiming`](#removetiming); `render`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler`: [`TimingHandler`](#timinghandler); `timingInterval`: `any`; `transitionHandler`: [`TransitionHandler`](#transitionhandler-1); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
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
| `props.transitionHandler` | [`TransitionHandler`](#transitionhandler-1) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler-1) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)

***

<a id="digit-2"></a>

### Digit()

```ts
function Digit(props: DigitProps): ReactNode;
```

Per-digit component that runs animation when assigned digit matches actual digit value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`DigitProps`](#digitprops) |

#### Returns

[`ReactNode`](#)

***

<a id="place-1"></a>

### Place()

```ts
function Place(props: PlaceProps): ReactNode;
```

Represents one place of a number, groups digits (0-9) for animation purposes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`PlaceProps`](#placeprops) |

#### Returns

[`ReactNode`](#)

***

<a id="stopwatch"></a>

### Stopwatch()

```ts
function Stopwatch(props: object): ReactNode;
```

Stopwatch implementation
[Counter](#counter-2) provided with defaults to act as a stopwatch. Use [timerRef](#timerref) and call `timerRef.current?.transitionTo` to change `state`.
By default `counter` increments by 100 every 100 ms, time is rendered in mm:ss.d format. Provide custom [render](#render) property defining animated values derived
from counter to get hours, days etc, or use one of predefined [Renderers](#renderers). For higher granularity, change `timingInterval` in ms,
it defines how often [timingHandler](#timinghandler) is called that changes counter value.
For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.

```
import React, { useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Stopwatch, StopwatchTransitions } from 'react-native-yet-another-stopwatch-timer';
const Component = () => {
 const timerRef = useRef(null);
 // use timerRef to call transitionTo property to switch states
 const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 // use onBeforeTransition, onAfterTransition callback to access counter on state change
 const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
 return (
   <View style={{ flex: 1 }}>
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
| `props` | \{ `initialCounterValue?`: `any`; `initialState?`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming?`: [`RemoveTiming`](#removetiming); `render?`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler?`: [`TimingHandler`](#timinghandler); `timingInterval?`: `any`; `transitionHandler?`: [`TransitionHandler`](#transitionhandler-1); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
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
| `props.transitionHandler?` | [`TransitionHandler`](#transitionhandler-1) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler-1) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)

***

<a id="timer"></a>

### Timer()

```ts
function Timer(props: object): ReactNode;
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
const Component = ({ initialCounterValue = 5000 }) => {
 const [ laps, setLaps ] = useState(0);
 const timerRef = useRef(null);
 // use timerRef to call transitionTo property to switch states:
 // set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
 const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialCounterValue }), [ timerRef ]);
 const onAfterTransition = useCallback((_, { name }, { nextState }) => {
   if (name === TimerTransitions.Stop && nextState === TimerStates.Stopped) setLaps((prevLaps) => prevLaps + 1);
 }, [ setLaps ]);
 return (
   <View style={{ flex: 1 }}>
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
| `props` | \{ `initialCounterValue?`: `any`; `initialState?`: `any`; `onAfterTransition?`: [`OnAfterTransition`](#onaftertransition); `onBeforeTransition?`: [`OnBeforeTransition`](#onbeforetransition); `removeTiming?`: [`RemoveTiming`](#removetiming); `render?`: [`Render`](#render); `style?`: [`Styles`](#styles); `timerRef`: [`TimerRef`](#timerref); `timingHandler?`: [`TimingHandler`](#timinghandler); `timingInterval?`: `any`; `transitionHandler?`: [`TransitionHandler`](#transitionhandler-1); `transitionRouter?`: [`TransitionRouter`](#transitionrouter); \} | - |
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
| `props.transitionHandler?` | [`TransitionHandler`](#transitionhandler-1) | creates transition object based on provided transition name, details: [TransitionHandler](#transitionhandler-1) |
| `props.transitionRouter?` | [`TransitionRouter`](#transitionrouter) | calls transition handler and manages state value, details: [TransitionRouter](#transitionrouter) |

#### Returns

[`ReactNode`](#)


<!-- API_DOCS_END -->
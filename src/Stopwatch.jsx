import React from 'react';
import Counter from './Counter';
import Renderers from './Renderers';
/** @typedef {import('./types').TimingHandler} Types.TimingHandler */
/** @typedef {import('./types').RemoveTiming} Types.RemoveTiming */
/** @typedef {import('./types').TransitionHandler} Types.TransitionHandler */
/** @typedef {import('./types').Stopwatch} Types.Stopwatch */
/** @typedef {import('./types').Render} Types.Render */
/** @typedef {import('./types').Renderers} Types.Renderers */

export const StopwatchStates = {
  Unset: 'Unset',
  Paused: 'Paused',
  Running: 'Running',
  Stopped: 'Stopped',
};

export const StopwatchTransitions = {
  Reset: 'Reset',
  Pause: 'Pause',
  Run: 'Run',
  Stop: 'Stop',
};

export const StopwatchDefaults = (() => {
  const initialState = StopwatchStates.Unset;
  const initialCounterValue = 0;
  /** @type {Types.TimingHandler} */
  const timingHandler = function defaultTimingHandler({ timingInterval, counter, state, timeout }) {
    'worklet';
    const incrementCounter = () => {
      if (state.value === StopwatchStates.Running) counter.value = (counter.value + timingInterval) >>> 0; // NOTE: limit to uint32
      timeout.value = setTimeout(incrementCounter, timingInterval);
    };
    timeout.value = setTimeout(incrementCounter, timingInterval);
  };
  const timingInterval = 100;
  /** @type {Types.RemoveTiming} */
  const removeTiming = (timeout) => clearTimeout(timeout.value);
  const setCounter = ({ counter }, { counterValue }) => {
    counter.value = counterValue || 0;
  };
  /** @type {Types.TransitionHandler} */
  const transitionHandler = ({ state }, { name }) => {
    if (name === StopwatchTransitions.Reset) return { nextState: state.value, onBeforeTransition: setCounter };
    if (name === StopwatchTransitions.Pause && state.value === StopwatchStates.Running) return { nextState: StopwatchStates.Paused };
    if (name === StopwatchTransitions.Run) return { nextState: StopwatchStates.Running, onBeforeTransition: state.value === StopwatchStates.Stopped && setCounter };
    if (name === StopwatchTransitions.Stop && (state.value === StopwatchStates.Paused || state.value === StopwatchStates.Running)) return { nextState: StopwatchStates.Stopped };
  };
  return {
    initialState,
    initialCounterValue,
    timingHandler,
    timingInterval,
    removeTiming,
    transitionHandler,
  };
})();

/**
 * Stopwatch implementation
 *
 * {@link Counter} provided with defaults to act as a stopwatch. Use {@link Types.TimerRef|timerRef} and call `timerRef.current?.transitionTo` to change `state`.
 * By default `counter` increments every 100 ms, time is rendered in mm:ss.d format. Provide custom {@link Types.Render|render} property defining animated values derived
 * from counter to get hours, days etc, or use one of predefined {@link Types.Renderers|Renderers}. For higher granularity, change `timingInterval` in ms,
 * it defines how often {@link Types.TimingHandler|timingHandler} is called that changes counter value.
 * For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.
 *
 * ```
 * import React, { useRef, useCallback } from 'react';
 * import { View, TouchableOpacity, Text } from 'react-native';
 * import { Stopwatch, StopwatchTransitions, StopwatchStates } from 'react-native-yet-another-stopwatch-timer';
 * const Component = () => {
 *  const timerRef = useRef(null);
 *  // use timerRef to call transitionTo property to switch states
 *  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 *  // use onBeforeTransition, onAfterTransition callback to access counter on state change
 *  const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
 *  return (
 *    <View>
 *      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
 *      <TouchableOpacity onPress={pause}><Text>Pause</Text></TouchableOpacity>
 *      <Stopwatch timerRef={timerRef} />
 *    </View>
 *  );
 * };
 * ```
 * @type {Types.Stopwatch}
 */
const Stopwatch = ({
  initialState = StopwatchDefaults.initialState,
  initialCounterValue = StopwatchDefaults.initialCounterValue,
  render = Renderers.Group,
  timingHandler = StopwatchDefaults.timingHandler,
  timingInterval = StopwatchDefaults.timingInterval,
  removeTiming = StopwatchDefaults.removeTiming,
  transitionHandler = StopwatchDefaults.transitionHandler,
  ...rest
}) => (
  <Counter
    initialState={initialState}
    initialCounterValue={initialCounterValue}
    render={render}
    timingHandler={timingHandler}
    timingInterval={timingInterval}
    removeTiming={removeTiming}
    transitionHandler={transitionHandler}
    {...rest}
  />
);

export { Stopwatch };
export default Stopwatch;

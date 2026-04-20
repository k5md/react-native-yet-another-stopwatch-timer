import React from 'react';
import { Stopwatch, StopwatchStates, StopwatchTransitions } from './Stopwatch';
import { runOnJS } from 'react-native-worklets';

/** @typedef {import('./types').TimingHandler} Types.TimingHandler */
/** @typedef {import('./types').Timer} Types.Timer */
/** @typedef {import('./types').Render} Types.Render */
/** @typedef {import('./types').Renderers} Types.Renderers */

export { StopwatchStates as TimerStates };
export { StopwatchTransitions as TimerTransitions };

export const TimerDefaults = (() => {
  /** @type {Types.TimingHandler} */
  const timingHandler = function defaultTimingHandler({ timingInterval, counter, state, timeout, timerRef }) {
    'worklet';
    const decrementCounter = () => {
      if (state.value === StopwatchStates.Running) {
        if (counter.value > 0) counter.value = counter.value < timingInterval ? 0 : counter.value - timingInterval;
        if (counter.value < 1) runOnJS(timerRef.current.transitionTo)({ name: StopwatchTransitions.Stop });
      }
      timeout.value = setTimeout(decrementCounter, timingInterval);
    };
    timeout.value = setTimeout(decrementCounter, timingInterval);
  };
  return { timingHandler };
})();

/**
 * Timer implementation
 *
 * {@link Stopwatch} provided with custom `timingHandler` to act as a timer. Use {@link Types.TimerRef|timerRef} and call `timerRef.current?.transitionTo` to change `state`.
 * By default `counter` decrements every 100 ms, time is rendered in mm:ss.d format. Provide custom {@link Types.Render|render} property defining animated values derived
 * from counter to get hours, days etc, or use one of predefined {@link Types.Renderers|Renderers}. For higher granularity, change `timingInterval` in ms,
 * it defines how often {@link Types.TimingHandler|timingHandler} is called that changes counter value.
 * For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.
 *
 * ```
 * import React, { useState, useRef, useCallback } from 'react';
 * import { View, TouchableOpacity, Text } from 'react-native';
 * import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';
 * const Component = ({ initialCounterValue }) => {
 *  const [ laps, setLaps ] = useState(0);
 *  const timerRef = useRef(null);
 *  // use timerRef to call transitionTo property to switch states:
 *  // set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
 *  const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialCounterValue }), [ timerRef ]);
 *  const onAfterTransition = useCallback(({ state }) => {
 *    if (state.value === TimerStates.Stopped) setLaps((laps) => laps + 1);
 *  }, [ laps, setLaps ]);
 *  return (
 *    <View>
 *      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
 *      <Timer timerRef={timerRef} onAfterTransition={onAfterTransition} initialCounterValue={initialCounterValue} />
 *      <Text>Laps: {laps}</Text>
 *    </View>
 *  );
 * };
 * ```
 * @type {Types.Timer}
 */
const Timer = ({
  timingHandler = TimerDefaults.timingHandler,
  ...rest
}) => (<Stopwatch timingHandler={timingHandler} {...rest} />);

export { Timer };
export default Timer;

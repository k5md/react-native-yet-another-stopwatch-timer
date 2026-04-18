import React from 'react';
import { Stopwatch, StopwatchStates, StopwatchTransitions } from './Stopwatch';
import { runOnJS } from 'react-native-worklets';

/** @typedef {import('./types').TimingHandler} Types.TimingHandler */
/** @typedef {import('./types').Timer} Types.Timer */

export { StopwatchStates as TimerStates };
export { StopwatchTransitions as TimerTransitions };

export const TimerDefaults = (() => {
  /** @type {Types.TimingHandler} */
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
  return { timingHandler };
})();

/** @type {Types.Timer} */
export const Timer = ({
  timingHandler = TimerDefaults.timingHandler,
  ...rest
}) => (<Stopwatch timingHandler={timingHandler} {...rest} />);

/**@type {typeof Timer} */
export default Timer;

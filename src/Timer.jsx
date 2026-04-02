import React from 'react';
import Stopwatch, { StopwatchStates, StopwatchTransitions } from './Stopwatch';
import { runOnJS } from 'react-native-worklets';

export { StopwatchStates as TimerStates };
export { StopwatchTransitions as TimerTransitions };

export const TimerDefaults = (() => {
  const timingHandler = function defaultTimingHandler(timingInterval, counter, state, timeout, timerRef) {
    'worklet';
    const decrementCounter = () => {
      if (state.get() === StopwatchStates.Running) {
        if (counter.get() > 0) counter.value -= 1;
        if (counter.get() < 1) runOnJS(timerRef.current.transition)(StopwatchTransitions.Stop);
      }
      timeout.set(setTimeout(decrementCounter, timingInterval));
    }
    timeout.set(setTimeout(decrementCounter, timingInterval));
  };
  return { timingHandler };
})();

export const Timer = ({
  timingHandler = TimerDefaults.timingHandler,
  ...props
}) => (<Stopwatch timingHandler={timingHandler} {...props} />);

export default Timer;

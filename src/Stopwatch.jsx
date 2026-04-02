import React from 'react';
import Counter from './Counter';
import Renderers from './Renderers';

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
  const timingHandler = function defaultTimingHandler(timingInterval, counter, state, timeout) {
    'worklet';
    const incrementCounter = () => {
      if (state.get() === StopwatchStates.Running) counter.value = (counter.value + 1) % 36000;
      timeout.set(setTimeout(incrementCounter, timingInterval));
    }
    timeout.set(setTimeout(incrementCounter, timingInterval));
  };
  const timingInterval = 100;
  const timingRemove = (timeout) => clearTimeout(timeout.get());
  const setCounter = (counter, { counterValue } = { counterValue: 0 }) => counter.set(counterValue);
  const transitionHandler = (transition, state) => {
    if (transition === StopwatchTransitions.Reset) return { nextState: state, onBeforeTransition: setCounter };
    if (transition === StopwatchTransitions.Pause && state === StopwatchStates.Running) return { nextState: StopwatchStates.Paused };
    if (transition === StopwatchTransitions.Run) return { nextState: StopwatchStates.Running, onBeforeTransition: state === StopwatchStates.Stopped && setCounter };
    if (transition === StopwatchTransitions.Stop && (state === StopwatchStates.Paused || state === StopwatchStates.Running)) return { nextState: StopwatchStates.Stopped };
  };
  return {
    initialState,
    initialCounterValue,
    timingHandler,
    timingInterval,
    timingRemove,
    transitionHandler,
  };
})();

export const Stopwatch = ({
  initialState = StopwatchDefaults.initialState,
  initialCounterValue = StopwatchDefaults.initialCounterValue,
  onBeforeTransition,
  onAfterTransition,
  render = Renderers.Group,
  timerRef,
  timingHandler = StopwatchDefaults.timingHandler,
  timingInterval = StopwatchDefaults.timingInterval,
  timingRemove = StopwatchDefaults.timingRemove,
  transitionHandler = StopwatchDefaults.transitionHandler,
  style,
}) => (
  <Counter
    initialState={initialState}
    initialCounterValue={initialCounterValue}
    onBeforeTransition={onBeforeTransition}
    onAfterTransition={onAfterTransition}
    render={render}
    timerRef={timerRef}
    timingHandler={timingHandler}
    timingInterval={timingInterval}
    timingRemove={timingRemove}
    transitionHandler={transitionHandler}
    style={style}
  />
);

export default Stopwatch;

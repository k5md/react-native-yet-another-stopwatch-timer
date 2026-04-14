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
  const timingHandler = function defaultTimingHandler({ timingInterval, counter, state, timeout }) {
    'worklet';
    const incrementCounter = () => {
      if (state.value === StopwatchStates.Running) counter.value = (counter.value + 1) % 36000;
      timeout.value = setTimeout(incrementCounter, timingInterval);
    }
    timeout.value = setTimeout(incrementCounter, timingInterval);
  };
  const timingInterval = 100;
  const removeTiming = (timeout) => clearTimeout(timeout.value);
  const setCounter = ({ counter }, { counterValue }) => counter.set(counterValue || 0);
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

export const Stopwatch = ({
  initialState = StopwatchDefaults.initialState,
  initialCounterValue = StopwatchDefaults.initialCounterValue,
  onBeforeTransition,
  onAfterTransition,
  render = Renderers.Group,
  timerRef,
  timingHandler = StopwatchDefaults.timingHandler,
  timingInterval = StopwatchDefaults.timingInterval,
  removeTiming = StopwatchDefaults.removeTiming,
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
    removeTiming={removeTiming}
    transitionHandler={transitionHandler}
    style={style}
  />
);

export default Stopwatch;

import React from 'react';
import Counter from './Counter';
import Renderers from './Renderers';

/** @typedef {import('./types').TimingHandler} Types.TimingHandler */
/** @typedef {import('./types').RemoveTiming} Types.RemoveTiming */
/** @typedef {import('./types').TransitionHandler} Types.TransitionHandler */
/** @typedef {import('./types').Stopwatch} Types.Stopwatch */

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
      if (state.value === StopwatchStates.Running) counter.value = (counter.value + 1) % 36000;
      timeout.value = setTimeout(incrementCounter, timingInterval);
    }
    timeout.value = setTimeout(incrementCounter, timingInterval);
  };
  const timingInterval = 100;
  /** @type {Types.RemoveTiming} */
  const removeTiming = (timeout) => clearTimeout(timeout.value);
  const setCounter = ({ counter }, { counterValue }) => counter.set(counterValue || 0);
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

/** @type {Types.Stopwatch} */
export const Stopwatch = ({
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

/** @type {typeof Stopwatch} */
export default Stopwatch;

import React from 'react';
import { Text } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import Counter from './Counter';
import Place from './Place';

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

const setCounter = (counter, { counterValue } = { counterValue: 0 }) => counter.set(counterValue);

const defaults = {
  initialState: StopwatchStates.Unset,
  timingHandler: function defaultTimingHandler(timingInterval, counter, state, timeout) {
    'worklet';
    const incrementCounter = () => {
      if (state.get() === StopwatchStates.Running) counter.value += 1;
      timeout.set(setTimeout(incrementCounter, timingInterval));
    }
    timeout.set(setTimeout(incrementCounter, timingInterval));
  },
  timingInterval: 100,
  timingRemove: (timeout) => clearTimeout(timeout.get()),
  transitionHandler: (transition, state) => {
    if (transition === StopwatchTransitions.Reset) return { nextState: state, onBeforeTransition: setCounter };
    if (transition === StopwatchTransitions.Pause && state === StopwatchStates.Running) return { nextState: StopwatchStates.Paused };
    if (transition === StopwatchTransitions.Run) return { nextState: StopwatchStates.Running, onBeforeTransition: state === StopwatchStates.Stopped && setCounter };
    if (transition === StopwatchTransitions.Stop && (state === StopwatchStates.Paused || state === StopwatchStates.Running)) return { nextState: StopwatchStates.Stopped };
  },
  render: ({ counter, style }) => {
    const minutes = useDerivedValue(() => Math.floor(counter.get() / 6000) % 60);
    const minutesTenths = useDerivedValue(() => Math.floor(minutes.get() / 10));
    const minutesOnes = useDerivedValue(() => minutes.get() % 10);
    const seconds = useDerivedValue(() => Math.floor(counter.get() / 10) % 60);
    const secondsTenths = useDerivedValue(() => Math.floor(seconds.get() / 10));
    const secondsOnes = useDerivedValue(() => seconds.get() % 10);
    const deciseconds = useDerivedValue(() => counter.get() % 10);

    return (
      <>
        <Place value={minutesTenths} style={style} />
        <Place value={minutesOnes} style={style} />
        <Text style={[ style?.digit, style?.place ]}>:</Text>
        <Place style={style} value={secondsTenths} />
        <Place style={style} value={secondsOnes} />
        <Text style={[ style?.digit, style?.place ]}>.</Text>
        <Place value={deciseconds} style={style} />
      </>
    )
  },
}

export const Stopwatch = ({
  initialState = defaults.initialState,
  onBeforeTransition,
  onAfterTransition,
  render = defaults.render,
  timerRef,
  timingHandler = defaults.timingHandler,
  timingInterval = defaults.timingInterval,
  transitionHandler = defaults.transitionHandler,
  style,
}) => (
  <Counter
    initialState={initialState}
    onBeforeTransition={onBeforeTransition}
    onAfterTransition={onAfterTransition}
    render={render}
    timerRef={timerRef}
    timingHandler={timingHandler}
    timingInterval={timingInterval}
    transitionHandler={transitionHandler}
    style={style}
  />
);

export default Stopwatch;

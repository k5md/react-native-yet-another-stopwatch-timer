import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
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

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('decrements counter by default timerInterval', async () => {
  render(<Component initialCounterValue={1000}/>);

  expect(screen.getByText('Laps: 0')).toBeTruthy();
  act(() => {
    fireEvent.press(screen.getByText('Run'));
    jest.advanceTimersByTime(500);
  });
  expect(screen.getByText('Laps: 0')).toBeTruthy();
  act(() => {
    jest.advanceTimersByTime(500);
  });
  await waitFor(() => {
    expect(screen.getByText('Laps: 1')).toBeTruthy();
  });
});

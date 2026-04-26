import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import React, { useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Stopwatch, StopwatchTransitions, StopwatchStates } from 'react-native-yet-another-stopwatch-timer';

const Component = () => {
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states
  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
  // use onBeforeTransition, onAfterTransition callback to access counter on state change
  const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
      <TouchableOpacity onPress={pause}><Text>Pause</Text></TouchableOpacity>
      <Stopwatch timerRef={timerRef} />
    </View>
  );
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(async () => {
  jest.restoreAllMocks();
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

test('renders, increments counter, calls callbacks', async () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<Component />);

  fireEvent.press(screen.getByText('Run'));
  jest.advanceTimersByTime(4200);
  await waitFor(() => {
    expect(logSpy).not.toHaveBeenCalled();
  });

  act(() => {
    fireEvent.press(screen.getByText('Pause'));
  });
  await waitFor(() => {
    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({ counter: expect.objectContaining({ value: 4200 }), state: expect.objectContaining({ value: StopwatchStates.Paused }) }),
      expect.objectContaining({ name: StopwatchTransitions.Pause }),
      expect.objectContaining({ nextState: StopwatchStates.Paused }),
    );
  });
});
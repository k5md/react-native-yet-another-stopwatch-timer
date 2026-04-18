import React, { useState, useRef, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';
const Container = () => {
  const [ laps, setLaps ] = useState(0);
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states, set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
  const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialTimerValue }), [ timerRef ]);
  const onAfterTransition = useCallback(({ state }) => {
    if (state.value === TimerStates.Stopped) setLaps((laps) => laps + 1);
  }, [ logs, setLogs ]);
  return [
    <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>,
    <Timer timerRef={timerRef} onAfterTransition={onAfterTransition} />,
    <Text>{laps}</Text>
  ];
};
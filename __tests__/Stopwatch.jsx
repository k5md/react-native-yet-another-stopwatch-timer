import React, { useRef, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Stopwatch, StopwatchTransitions } from 'react-native-yet-another-stopwatch-timer';
const Container = () => {
  const timerRef = useRef(null);
  // use timerRef to call transitionTo property to switch states
  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
  // use onBeforeTransition, onAfterTransition callback to access counter on state change
  const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
  return [
    <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>,
    <TouchableOpacity onPress={pause}><Text>Pause</Text></TouchableOpacity>,
    <Stopwatch timerRef={timerRef} />,
  ];
};

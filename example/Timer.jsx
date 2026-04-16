import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { Timer, TimerStates, TimerTransitions } from 'react-native-yet-another-stopwatch-timer';
import { styles, Button } from './Common';

const timerStyles = StyleSheet.create({
  digit: {
    fontSize: 40,
  },
});

export default () => {
  const timerRef = useRef(null);

  const initialTimerValue = 50;

  const runPause = useCallback(() => {
    if (!timerRef.current) return;
    if (timerRef.current.state.value === TimerStates.Running) {
      timerRef.current.transitionTo({ name: TimerTransitions.Pause });
    } else {
      timerRef.current.transitionTo({ name: TimerTransitions.Run, counterValue: initialTimerValue });
    }
  }, [ timerRef ]);
  const reset = useCallback(() => timerRef.current?.transitionTo({
    name: TimerTransitions.Reset, 
    counterValue: initialTimerValue,
  }), [ timerRef ]);

  const onAfterTransition = useCallback(({ counter, state }, { name }) => {
    console.log([ `Transition: ${name}`, `Counter: ${counter.value}`, `State: ${state.value}` ].join('\t'));
  }, []);

  useEffect(reset, [reset]);
  
  return (
    <>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <View style={styles.container}>
        <Text>Timer</Text>
        <View style={[ styles.container, styles.text ]}>
          <Button label="Run/Pause" onPress={runPause} />
          <Button label="Reset" onPress={reset} />
        </View>
        <Timer
          onAfterTransition={onAfterTransition}
          timerRef={timerRef}
          style={timerStyles}
        />
      </View>
    </>
  );
};

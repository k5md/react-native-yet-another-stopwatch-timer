import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { Stopwatch, StopwatchStates, StopwatchTransitions } from 'react-native-yet-another-stopwatch-timer';
import { styles, Button } from './Common';

const timerStyles = StyleSheet.create({
  digit: {
    fontSize: 40,
  },
});

export default () => {
  const timerRef = useRef(null);

  const runPause = useCallback(() => { 
    if (!timerRef.current) return;
    timerRef.current.transitionTo({
      name: timerRef.current.state.value === StopwatchStates.Running ? StopwatchTransitions.Pause : StopwatchTransitions.Run,
    });
  }, [ timerRef ]);
  const stop = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Stop }), [ timerRef ]);
  const reset = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Reset }), [ timerRef ]);

  const onAfterTransition = useCallback(({ counter, state }, { name }) => {
    console.log([ `Transition: ${name}`, `Counter: ${counter.value}`, `State: ${state.value}` ].join('\t'));
  }, []);
  
  return (
    <>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <View style={styles.container}>
        <Text>Stopwatch</Text>
        <View style={[ styles.container, styles.text ]}>
          <Button label="Run/Pause" onPress={runPause} />
          <Button label="Stop" onPress={stop} />
          <Button label="Reset" onPress={reset} />
        </View>
        <Stopwatch
          onAfterTransition={onAfterTransition}
          timerRef={timerRef}
          style={timerStyles}
        />
      </View>
    </>
  );
};

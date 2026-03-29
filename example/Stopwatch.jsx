import React, { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { Stopwatch, StopwatchStates, StopwatchTransitions } from 'react-native-yet-another-stopwatch-timer';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: '5%',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export const Button = ({ label, onPress }) => (
  <TouchableOpacity style={[ styles.container, styles.button ]} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity> 
);

const timerStyles = StyleSheet.create({
  digit: {
    fontSize: 40,
  },
});

export default () => {
  const timerRef = useRef(null);

  const playPause = useCallback(() => { 
    if (!timerRef.current) return;
    if (timerRef.current.state.value === StopwatchStates.Running) timerRef.current.transition(StopwatchTransitions.Pause);
    else timerRef.current.transition(StopwatchTransitions.Run);
  }, [ timerRef ]);
  const stop = useCallback(() => timerRef.current?.transition(StopwatchTransitions.Stop), [ timerRef ]);
  const reset = useCallback(() => timerRef.current?.transition(StopwatchTransitions.Reset), [ timerRef ]);

  const onAfterTransition = useCallback((counter, transitionName, state) => {
    console.log([ `Transition name: ${transitionName}`, `State: ${state.get()}`, `Counter: ${counter.get()}` ].join('\t'));
  }, []);
  
  return (
    <>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <View style={styles.container}>
        <Text>Stopwatch</Text>
        <View style={[ styles.container, styles.text ]}>
          <Button label="Play/Pause" onPress={playPause} />
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

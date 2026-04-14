import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { Stopwatch, StopwatchTransitions, StopwatchStates, StopwatchDefaults, Renderers } from 'react-native-yet-another-stopwatch-timer';
import { styles, Button } from './Common';

const timerStyles = StyleSheet.create({
  digit: {
    fontSize: 40,
  },
});

const Lap = ({ value }) => {
  return (
    <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
      {Renderers.State({ counter: value, timingInterval: StopwatchDefaults.timingInterval })}
    </Animated.View>
  );
}

export default () => {
  const timerRef = useRef(null);

  const [ start, setStart ] = useState(0);
  const [ laps, setLaps ] = useState([]);

  const run = useCallback(() => {
    if (!timerRef.current) return;
    setStart(timerRef.current.counter.value);
    timerRef.current.transition({ name: StopwatchTransitions.Run });
  }, [ timerRef, setStart ]);
  const lap = useCallback(() => {
    if (timerRef.current?.state.value !== StopwatchStates.Running) return;
    setLaps((laps) => laps.concat({ id: laps.length, lap: timerRef.current.counter.value - start }));
  }, [ timerRef ]);
  const stop = useCallback(() => timerRef.current?.transition({ name: StopwatchTransitions.Stop }), [ timerRef ]);
  const reset = useCallback(() => {
    if (!timerRef.current) return;
    timerRef.current.transition({ name: StopwatchTransitions.Reset });
    setLaps([]);
  }, [ timerRef, setLaps ]);
  
  return (
    <>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <View style={styles.container}>
        <Text>Intervals</Text>
        <View style={[ styles.container, styles.text ]}>
          <Button label="Run" onPress={run} />
          <Button label="Lap" onPress={lap} />
          <Button label="Stop" onPress={stop} />
          <Button label="Reset" onPress={reset} />
        </View>
        <Stopwatch
          timerRef={timerRef}
          style={timerStyles}
        />
        <View>
          {laps.map(({ id, lap }) => <Lap key={id} value={lap} />)}
        </View>
      </View>
    </>
  );
};

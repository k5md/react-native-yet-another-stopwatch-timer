import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReducedMotionConfig, ReduceMotion, useDerivedValue } from 'react-native-reanimated';
import { Timer, TimerStates, TimerTransitions, Place } from 'react-native-yet-another-stopwatch-timer';
import { styles, Button } from './Common';

const timerStyles = StyleSheet.create({
  digit: {
    fontSize: 40,
  },
});

export default () => {
  const timerRef = useRef(null);

  const initialTimerValue = 10 * 60 * 60 * 99;

  const runPause = useCallback(() => timerRef.current?.transitionTo({
    name: timerRef.current.state.value === TimerStates.Running ? TimerTransitions.Pause : TimerTransitions.Run,
  }), [ timerRef ]);
  const reset = useCallback(() => timerRef.current?.transitionTo({
    name: TimerTransitions.Reset,
    counterValue: initialTimerValue,
  }), [ timerRef ]);

  useEffect(reset, [reset]);

  return (
    <>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <View style={styles.container}>
        <Text>Derived</Text>
        <View style={[ styles.container, styles.text ]}>
          <Button label="Run/Pause" onPress={runPause} />
          <Button label="Reset" onPress={reset} />
        </View>
        <Timer
          timerRef={timerRef}
          style={timerStyles}
          render={({ counter, style }) => {
            const hours = useDerivedValue(() => Math.floor(counter.value / 10 / 60 / 60));
            const hoursTenths = useDerivedValue(() => Math.floor(hours.value / 10));
            const hoursOnes = useDerivedValue(() => hours.value % 10);
            const minutes = useDerivedValue(() => Math.floor(counter.value / 10 / 60) % 60);
            const minutesTenths = useDerivedValue(() => Math.floor(minutes.value / 10));
            const minutesOnes = useDerivedValue(() => minutes.value % 10);
            const seconds = useDerivedValue(() => Math.floor(counter.value / 10) % 60);
            const secondsTenths = useDerivedValue(() => Math.floor(seconds.value / 10));
            const secondsOnes = useDerivedValue(() => seconds.value % 10);

            return (
              <>
                <Place value={hoursTenths} style={style} />
                <Place value={hoursOnes} style={style} />
                <Text style={[ style?.digit, style?.place ]}>:</Text>
                <Place value={minutesTenths} style={style} />
                <Place value={minutesOnes} style={style} />
                <Text style={[ style?.digit, style?.place ]}>:</Text>
                <Place value={secondsTenths} style={style} />
                <Place value={secondsOnes} style={style} />
              </>
            )
          }}
        />
      </View>
    </>
  );
};

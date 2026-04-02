import React from "react";
import { Text, TextInput } from 'react-native';
import Animated, { useDerivedValue, useAnimatedProps } from 'react-native-reanimated';
import Place from './Place';
import { getMinutes, getSeconds, getDeciseconds } from './utils';

export const Individual = ({ counter, timingInterval, style }) => {
  const minutesTenths = useDerivedValue(() => Math.floor(getMinutes(timingInterval, counter.value) / 10) % 10, [ counter, timingInterval ]);
  const minutesOnes = useDerivedValue(() => getMinutes(timingInterval, counter.value) % 10, [ counter, timingInterval ]);
  const secondsTenths = useDerivedValue(() => Math.floor(getSeconds(timingInterval, counter.value) / 10) % 10, [ counter, timingInterval ]);
  const secondsOnes = useDerivedValue(() => getSeconds(timingInterval, counter.value) % 10, [ counter, timingInterval ]);
  const deciseconds = useDerivedValue(() => getDeciseconds(timingInterval, counter.value), [ counter, timingInterval ]);

  return (
    <>
      <Place value={minutesTenths} style={style} />
      <Place value={minutesOnes} style={style} />
      <Text style={[ style?.digit, style?.place ]}>:</Text>
      <Place value={secondsTenths} style={style} />
      <Place value={secondsOnes} style={style} />
      <Text style={[ style?.digit, style?.place ]}>.</Text>
      <Place value={deciseconds} style={style} />
    </>
  );
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Group = ({ counter, timingInterval, style }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const minutes = getMinutes(timingInterval, counter.value);
    const seconds = getSeconds(timingInterval, counter.value);
    const deciseconds = getDeciseconds(timingInterval, counter.value);
    const text = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${deciseconds}`;
    return ({ text });
  }, [ counter, timingInterval ]);
  return (
    <AnimatedTextInput editable={false} animatedProps={animatedProps} style={style?.digit} defaultValue="00:00.0" />
  );
};

export default { Individual, Group };

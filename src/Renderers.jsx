import React from "react";
import { Text, TextInput } from 'react-native';
import Animated, { useDerivedValue, useAnimatedProps } from 'react-native-reanimated';
import Place from './Place';
import { getMinutes, getSeconds, getDeciseconds } from './utils';

/** @typedef {import('./types').Render} Types.Render */
/** @typedef {import('./types').Renderers} Types.Renderers */

/** @type {Types.Render} */
export const Individual = ({ counter, timingInterval, style }) => {
  const minutesTenths = useDerivedValue(() => Math.floor(getMinutes(timingInterval, counter.value) / 10) % 10);
  const minutesOnes = useDerivedValue(() => getMinutes(timingInterval, counter.value) % 10);
  const secondsTenths = useDerivedValue(() => Math.floor(getSeconds(timingInterval, counter.value) / 10) % 10);
  const secondsOnes = useDerivedValue(() => getSeconds(timingInterval, counter.value) % 10);
  const deciseconds = useDerivedValue(() => getDeciseconds(timingInterval, counter.value));

  return (
    <>
      <Place digit={minutesTenths} style={style} />
      <Place digit={minutesOnes} style={style} />
      <Text style={[ style?.digit, style?.place ]}>:</Text>
      <Place digit={secondsTenths} style={style} />
      <Place digit={secondsOnes} style={style} />
      <Text style={[ style?.digit, style?.place ]}>.</Text>
      <Place digit={deciseconds} style={style} />
    </>
  );
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/** @type {Types.Render} */
export const Group = ({ counter, timingInterval, style }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const minutes = getMinutes(timingInterval, counter.value);
    const seconds = getSeconds(timingInterval, counter.value);
    const deciseconds = getDeciseconds(timingInterval, counter.value);
    const text = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${deciseconds}`;
    return ({ text });
  });
  return (
    <AnimatedTextInput editable={false} animatedProps={animatedProps} style={style?.digit} defaultValue="00:00.0" />
  );
};

/** @type {Types.Render} */
export const Static = ({ counter, timingInterval, style }) => {
  const minutes = getMinutes(timingInterval, counter);
  const seconds = getSeconds(timingInterval, counter);
  const deciseconds = getDeciseconds(timingInterval, counter);
  const text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;

  return (
    <Text style={style?.digit}>{text}</Text>
  );
};

/** @type {Types.Renderers} */
const Renderers = { Individual, Group, Static };

export default Renderers;

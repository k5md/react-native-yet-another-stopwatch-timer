import React from 'react';
import { Text, TextInput } from 'react-native';
import Animated, { useDerivedValue, useAnimatedProps } from 'react-native-reanimated';
import Place from './Place';

const getDeciseconds = function(counter, modulo = 10) {
  'worklet';
  return Math.floor(counter.value / 100) % modulo;
};

const getSeconds = function(counter, modulo = 60) {
  'worklet';
  return Math.floor(counter.value / 1000) % modulo;
};

const getMinutes = function(counter, modulo = 60) {
  'worklet';
  return Math.floor(counter.value / 60000) % modulo;
};

export const Individual = ({ counter, style }) => {
  const minutesTenths = useDerivedValue(() => Math.floor(getMinutes(counter) / 10) % 10);
  const minutesOnes = useDerivedValue(() => getMinutes(counter) % 10);
  const secondsTenths = useDerivedValue(() => Math.floor(getSeconds(counter) / 10) % 10);
  const secondsOnes = useDerivedValue(() => getSeconds(counter) % 10);
  const deciseconds = useDerivedValue(() => getDeciseconds(counter));
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

export const Group = ({ counter, style }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const minutes = getMinutes(counter);
    const seconds = getSeconds(counter);
    const deciseconds = getDeciseconds(counter);
    const text = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${deciseconds}`;
    return ({ text });
  });
  return (
    <AnimatedTextInput editable={false} animatedProps={animatedProps} style={style?.digit} defaultValue="00:00.0" />
  );
};

export const Static = ({ counter, style }) => {
  const minutes = getMinutes(counter);
  const seconds = getSeconds(counter);
  const deciseconds = getDeciseconds(counter);
  const text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;
  return (
    <Text style={style?.digit}>{text}</Text>
  );
};

const Renderers = { Individual, Group, Static };

export default Renderers;

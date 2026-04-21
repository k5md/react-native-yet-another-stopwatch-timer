import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

export const Digit = ({ assignedDigit, actualDigit, style }) => {
  /** @type {any} */
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    return {
      opacity: actualDigit.value === assignedDigit ? 1 : 0,
    };
  });

  return (
    <Animated.Text style={style} animatedProps={animatedProps}>
      {assignedDigit}
    </Animated.Text>
  );
};

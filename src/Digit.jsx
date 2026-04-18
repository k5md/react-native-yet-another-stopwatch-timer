import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

/** @typedef {import('./types').Digit} Types.Digit */

/** @type {Types.Digit} */
export const Digit = ({ assignedDigit, actualDigit, style }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    return {
      opacity: actualDigit.get() === assignedDigit ? 1 : 0,
    };
  });

  return (
    <Animated.Text style={style} animatedProps={animatedProps}>
      {assignedDigit}
    </Animated.Text>
  );
};

/** @type {Types.Digit} */
export default Digit;

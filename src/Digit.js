import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

export const Digit = ({ numeral, value, style }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    return {
      opacity: value.get() === numeral ? 1 : 0,
    };
  });

  return (
    <Animated.Text style={style} animatedProps={animatedProps}>
      {numeral}
    </Animated.Text>
  );
};

export default Digit;

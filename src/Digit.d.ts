import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { AnyStyle } from './shared';

export type DigitProps = {
  assignedDigit: number,
  actualDigit: SharedValue<any>,
  style?: AnyStyle,
};

export declare function Digit(
  props: DigitProps,
): (ReactNode);

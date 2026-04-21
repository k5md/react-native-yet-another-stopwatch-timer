import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { Styles } from './shared';

export type DigitProps = {
  assignedDigit: number,
  actualDigit: SharedValue<any>,
  style?: Styles,
};

export declare function Digit(
  props: DigitProps,
): (ReactNode);

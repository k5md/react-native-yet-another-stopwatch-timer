import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { AnyStyle } from './shared';

export type DigitProps = {
  assignedDigit: number, // the digit (0-9) that this component corresponds to
  actualDigit: SharedValue<any>,
  style?: AnyStyle,
};

/**
 * Per-digit component that runs animation when assigned digit matches actual digit value
 */
export declare function Digit(
  props: DigitProps,
): (ReactNode);

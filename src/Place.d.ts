import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { Styles } from './shared';

export type PlaceProps = {
  digit: SharedValue<any>,
  style?: Styles,
};

/**
 * Represents one place of a number, groups digits (0-9) for animation purposes
 */
export declare function Place(
  props: PlaceProps,
): (ReactNode);

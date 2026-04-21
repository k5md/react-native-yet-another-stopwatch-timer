import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { Styles } from './shared';

export type PlaceProps = {
  digit: SharedValue<any>,
  style?: Styles,
};

export declare function Place(
  props: PlaceProps,
): (ReactNode);

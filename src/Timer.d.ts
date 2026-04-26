
import type { ReactNode } from 'react';
import type { TimerRef, Render, TimingHandler, SetOptional } from './shared';
import type { StopwatchProps, Stopwatch } from './Stopwatch';
import type { Renderers } from './Renderers';

export { 
  StopwatchStates as TimerStates,
  StopwatchState as TimerState,
  StopwatchTransitions as TimerTransitions,
  StopwatchTransition as TimerTransition,
} from './Stopwatch';

export type TimerDefaultedPropKeys = 'timingHandler';

export declare const TimerDefaults: {
  readonly [K in TimerDefaultedPropKeys]: StopwatchProps[K];
};

export type TimerProps = SetOptional<StopwatchProps, TimerDefaultedPropKeys>;

/**
 * Timer implementation
 *
 * {@link Stopwatch} provided with custom `timingHandler` to act as a timer. Use {@link TimerRef|timerRef} and call `timerRef.current?.transitionTo` to change `state`.
 * By default `counter` decrements by 100 every 100 ms, time is rendered in mm:ss.d format. Provide custom {@link Render|render} property defining animated values derived
 * from counter to get hours, days etc, or use one of predefined {@link Renderers|Renderers}. For higher granularity, change `timingInterval` in ms,
 * it defines how often {@link TimingHandler|timingHandler} is called that changes counter value.
 * For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.
 *
 * ```
 * import React, { useState, useRef, useCallback } from 'react';
 * import { View, TouchableOpacity, Text } from 'react-native';
 * import { Timer, TimerTransitions, TimerStates } from 'react-native-yet-another-stopwatch-timer';
 * const Component = ({ initialCounterValue = 5000 }) => {
 *  const [ laps, setLaps ] = useState(0);
 *  const timerRef = useRef(null);
 *  // use timerRef to call transitionTo property to switch states:
 *  // set transition name to one of StopwatchTransitions, counterValue if you want to change it outside of timingHandler
 *  const run = useCallback(() => timerRef.current?.transitionTo({ name: TimerTransitions.Run, counterValue: initialCounterValue }), [ timerRef ]);
 *  const onAfterTransition = useCallback((_, { name }, { nextState }) => {
 *    if (name === TimerTransitions.Stop && nextState === TimerStates.Stopped) setLaps((prevLaps) => prevLaps + 1);
 *  }, [ setLaps ]);
 *  return (
 *    <View style={{ flex: 1 }}>
 *      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
 *      <Timer timerRef={timerRef} onAfterTransition={onAfterTransition} initialCounterValue={initialCounterValue} />
 *      <Text>Laps: {laps}</Text>
 *    </View>
 *  );
 * };
 * ```
 */
export declare function Timer(
  props: TimerProps,
): (ReactNode);

import type { ReactNode } from 'react';
import type { TimerRef, Render, TimingHandler, SetOptional } from './shared';
import type { CounterProps, Counter } from './Counter';
import type { Renderers } from './Renderers';

export declare const StopwatchStates: {
  readonly Unset: 'Unset',
  readonly Paused: 'Paused',
  readonly Running: 'Running',
  readonly Stopped: 'Stopped',
};

export type StopwatchState = (typeof StopwatchStates)[keyof typeof StopwatchStates];

export declare const StopwatchTransitions: {
  readonly Reset: 'Reset',
  readonly Pause: 'Pause',
  readonly Run: 'Run',
  readonly Stop: 'Stop',
};

export type StopwatchTransition = (typeof StopwatchTransitions)[keyof typeof StopwatchTransitions];

export type StopwatchDefaultedPropKeys = 'initialState' | 'initialCounterValue' | 'render' | 'timingHandler' | 'timingInterval' | 'removeTiming' | 'transitionHandler' | 'transitionRouter';

export declare const StopwatchDefaults: {
  readonly [K in StopwatchDefaultedPropKeys]: StopwatchProps[K];
};

export type StopwatchProps = SetOptional<CounterProps, StopwatchDefaultedPropKeys>;

/**
 * Stopwatch implementation
 * {@link Counter} provided with defaults to act as a stopwatch. Use {@link TimerRef|timerRef} and call `timerRef.current?.transitionTo` to change `state`.
 * By default `counter` increments by 100 every 100 ms, time is rendered in mm:ss.d format. Provide custom {@link Render|render} property defining animated values derived
 * from counter to get hours, days etc, or use one of predefined {@link Renderers|Renderers}. For higher granularity, change `timingInterval` in ms,
 * it defines how often {@link TimingHandler|timingHandler} is called that changes counter value.
 * For better precision use `onBeforeTransition` and `onAfterTransition` properties, or provide custom self-adjusting `timingHandler`.
 *
 * ```
 * import React, { useRef, useCallback } from 'react';
 * import { View, TouchableOpacity, Text } from 'react-native';
 * import { Stopwatch, StopwatchTransitions, StopwatchStates } from 'react-native-yet-another-stopwatch-timer';
 * const Component = () => {
 *  const timerRef = useRef(null);
 *  // use timerRef to call transitionTo property to switch states
 *  const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 *  // use onBeforeTransition, onAfterTransition callback to access counter on state change
 *  const pause = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Pause, onAfterTransition: console.log }), [ timerRef ]);
 *  return (
 *    <View>
 *      <TouchableOpacity onPress={run}><Text>Run</Text></TouchableOpacity>
 *      <TouchableOpacity onPress={pause}><Text>Pause</Text></TouchableOpacity>
 *      <Stopwatch timerRef={timerRef} />
 *    </View>
 *  );
 * };
 * ```
 */
export function Stopwatch(props: StopwatchProps): ReactNode;

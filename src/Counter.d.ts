import type { ReactNode } from 'react';
import type {
  OnBeforeTransition,
  OnAfterTransition,
  Render,
  TimerRef,
  TimingHandler,
  RemoveTiming,
  TransitionHandler,
  TransitionRouter,
  Styles,
  SetOptional,
} from './shared';

export type CounterBaseProps = {
  /** initial value for state SharedValue */
  initialState: any,
  /** initial value for counter SharedValue */
  initialCounterValue: any,
  /** will be called before state changes, can cancel transition, details: {@link OnBeforeTransition} */
  onBeforeTransition?: OnBeforeTransition,
  /** will be called after state change, details: {@link OnAfterTransition} */
  onAfterTransition?: OnAfterTransition,
  /** custom render function for counter value, details: {@link Render} */
  render: Render,
  /** the intended handle to perform state transitions, details: {@link TimerRef} */
  timerRef: TimerRef,
  /** worker that updates counter value, details: {@link TimingHandler} */
  timingHandler: TimingHandler,
  /** intended time interval for timing handler to perform counter updates, by default counter gets increased by timingInterval */
  timingInterval: any,
  /** clean up function, details: {@link RemoveTiming} */
  removeTiming: RemoveTiming,
  /** creates transition object based on provided transition name, details: {@link TransitionHandler} */
  transitionHandler: TransitionHandler,
  /** calls transition handler and manages state value, details: {@link TransitionRouter} */
  transitionRouter: TransitionRouter,
  /** style overrides that get passed to render, details: {@link Styles} */
  style?: Styles,
};

export type CounterDefaultedPropKeys = 'transitionRouter';
export declare const CounterDefaults: {
  readonly [K in CounterDefaultedPropKeys]: CounterBaseProps[K];
};

export type CounterProps = SetOptional<CounterBaseProps, CounterDefaultedPropKeys>;

/**
 * Base component, binds state, counter and timeout properties to `transitionRouter` to provide means for changing state
 */
export declare function Counter(
  props: CounterProps,
): ReactNode;





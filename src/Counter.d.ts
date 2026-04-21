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
  /** initial value for state */
  initialState: any,
  /** initial value for counter */
  initialCounterValue: any,
  /** will be called before state changes, can cancel transition */
  onBeforeTransition?: OnBeforeTransition,
  /** will be called after state change */
  onAfterTransition?: OnAfterTransition,
  /** custom render function for counter value */
  render: Render,
  /** the intended handle to perform state transitions */
  timerRef: TimerRef,
  /** worker that updates counter value */
  timingHandler: TimingHandler,
  /** intended time interval for timing handler to perform counter updates */
  timingInterval: any,
  /** clean up function */
  removeTiming: RemoveTiming,
  /** creates transition object based on provided transition name */
  transitionHandler: TransitionHandler,
  /** calls transition handler and manages state value */
  transitionRouter: TransitionRouter,
  /** style overrides that get passed to render */
  style?: Styles,
};

export type CounterDefaultedPropKeys = 'transitionRouter';
export declare const CounterDefaults: {
  readonly [K in CounterDefaultedPropKeys]: CounterBaseProps[K];
};

export type CounterUserProps = SetOptional<CounterBaseProps, CounterDefaultedPropKeys>;

/**
 * Base component, binds state, counter and timeout properties to `transitionRouter` to provide means for changing state
 */
export declare function Counter(
  props: CounterUserProps,
): ReactNode;





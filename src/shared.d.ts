import { ReactNode, RefObject } from 'react';
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { Counter } from './Counter';
import { Place } from './Place';
import { Digit } from './Digit';
import { Renderers } from './Renderers';

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type SetOptional<T, K extends keyof T> = Prettify<{
  [P in keyof T as P extends K ? P : never]?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
}>;

export type AnyStyle = StyleProp<ViewStyle | TextStyle | ImageStyle>;

/**
 * Additional context provided by transitionTo function, it is used to switch states depending on name property
 *
 */
export type TransitionExtraContext = {
  /** transition name, used to route and create correct transition object in transitionHandler */
  name: string,
  onBeforeTransition?: OnBeforeTransition,
  onAfterTransition?: OnAfterTransition,
  [key: string]: any,
};

/**
 * Description of next state, what to do before and after state change
 */
export type Transition = {
  onBeforeTransition?: OnBeforeTransition,
  onAfterTransition?: OnAfterTransition,
  nextState: any,
};

/**
 * Called before state change, use for managing side-effects
 *
 * Return truthy value to cancel state change and onBeforeTransition handlers calls of lower priority, order described in {@link TransitionRouter}.
 *
 * @returns shouldInterrupt flag, if true transition won't happen
 */
export type OnBeforeTransition = (
  transitionContext: TransitionContext,
  transitionExtraContext: TransitionExtraContext,
  transition: Transition,
) => (boolean | void);

/**
 * Called after state change, use for managing side-effects.
 */
export type OnAfterTransition = (
  transitionContext: TransitionContext,
  transitionExtraContext: TransitionExtraContext,
  transition: Transition,
) => (void);

/**
 * Produces object describing changes based on `transitionExtraContext.name`: next state, what to do before and after state change
 *
 * If this function returns falsy, then state value won't get changed, no `onBeforeTransition` and no `onAfterTransition` handlers will get called.
 *
 * @returns Object corresponding to {@link Transition} or nothing
 */
export type TransitionHandler = (
  transitionContext: TransitionContext,
  transitionExtraContext: TransitionExtraContext,
) => (Transition | void);

/**
 * Manages state value after routing
 *
 * This function calls `transitionContext.transitionHandler` to get {@link Transition} object to change from current state to next,
 * calls `onBeforeTransition` handlers in the following order:
 * 1. property of `transitionTo` argument, passed when calling {@link TransitionTo|transitionTo} from `timerRef.current`
 * 2. property of `transition` object returned from {@link TransitionHandler|transitionHandler}
 * 3. property passed to component {@link Counter}
 *
 * If any of these callbacks return truthy then transition gets cancelled and subsequent callbacks (other `onBeforeTransition` and every `onAfterTransition`) don't get called.
 * Else it updates state to new value from transition and calls `onAfterTransition` callbacks in the same order.
 *
 */
export type TransitionRouter = (
  transitionContext: TransitionContext,
  transitionExtraContext: TransitionExtraContext,
) => (void);

/**
 * This function is used to switch timer state
 *
 * Partially applied version of {@link TransitionRouter} with `transitionContext` argument pre-bound,
 * this function is intended to be the only way parent component interacts with counter,
 * one does this by switching states.
 * ```
 * const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 * ```
 */
export type TransitionTo = (
  transitionExtraContext: TransitionExtraContext,
) => (void);

/**
 * Context provided and captured from {@link Counter}, containing handlers passed as props to component, state and
 * counter
 */
export type TransitionContext = {
  onBeforeTransition: OnBeforeTransition,
  onAfterTransition: OnAfterTransition,
  state: SharedValue<any>,
  counter: SharedValue<any>,
  transitionHandler: TransitionHandler,
};

export type TimerRefProps = {
  state: SharedValue<any>,
  counter: SharedValue<any>,
  timeout: SharedValue<any>,
  transitionTo: TransitionTo,
};

/**
 * Handle to control timer
 *
 * Used to provide transitionTo function to switch state, this function is intended to be the only way parent component
 * interacts with timer.
 * ```
 * const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 * ```
 *
 * The ref is also passed to {@link TimingHandler} to switch state when counter reaches certain values.
 */
export type TimerRef = RefObject<TimerRefProps>;

/**
 * Timing worklet that runs on UI-thread for updating counter and schedules a recursive call to itself
 *
 * It should change counter value based on current state every timingInterval and update timeout shared variable
 * so that whenever component gets rerendered, removeTiming could perform a clean up.
 * ```
 * const timingHandler = function defaultTimingHandler({ timingInterval, counter, state, timeout, timerRef }) {
 *  'worklet';
 *  const decrementCounter = () => {
 *      if (state.value === StopwatchStates.Running) {
 *          if (counter.value > 0) counter.value -= 1;
 *          if (counter.value < 1) runOnJS(timerRef.current.transitionTo)({ name: StopwatchTransitions.Stop });
 *      }
 *      timeout.value = setTimeout(decrementCounter, timingInterval);
 *  }
    timeout.value = setTimeout(decrementCounter, timingInterval);
  };
* ```
*/
export type TimingHandler = (
  context: {
    timingInterval: any,
    state: SharedValue<any>,
    counter: SharedValue<any>,
    timeout: SharedValue<any>,
    timerRef: TimerRef,
  },
) => (void);

/**
 * Callback called on base component rerender
 *
 * It must perform cleanup for whatever repeating timeout logic one uses in timingHandler
 * (e.g. if setTimeout is used, then it has to call clearTimeout), use timeout shared variable in timingHandler to
 * pass current timeout identifier.
 *
 * @param timeout Identifier set by timingHandler
 */
export type RemoveTiming = (timeout: SharedValue) => (void);

/**
 * Style overrides for component, this gets passed to {@link Render|render} function
 */
export type Styles = {
  /** style for wrappers */
  container?: AnyStyle,
  /** style for {@link Place} component */
  place?: AnyStyle,
  /** style for {@link Digit} component */
  digit?: AnyStyle,
  [key: string]: AnyStyle,
};

/**
 * Counter render function presents counter value as {@link ReactNode} and is passed to base component {@link Counter}
 *
 * One can provide their custom function or use already implemented ones in {@link Renderers}.
 */
export type Render = (props: {
  counter: SharedValue<any> | { value: any; [key: string]: any },
  timingInterval?: any,
  initialCounterValue?: any,
  style?: Styles,
}) => ReactNode;

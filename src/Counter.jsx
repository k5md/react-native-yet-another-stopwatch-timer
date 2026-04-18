import React, { useEffect, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnUI } from 'react-native-worklets';

/** @typedef {import('./types').TransitionRouter} Types.TransitionRouter */
/** @typedef {import('./types').Counter} Types.Counter */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export const CounterDefaults = (() => {
  /** @type {Types.TransitionRouter} */
  const transitionRouter = (transitionContext, transitionExtraContext) => {
    const transition = transitionContext.transitionHandler(transitionContext, transitionExtraContext);
    if (!transition) return;
    const beforeTransitionHandlers = [
      transition.onBeforeTransition,
      transitionExtraContext.onBeforeTransition,
      transitionContext.onBeforeTransition,
    ];
    for (const handler of beforeTransitionHandlers) {
      if (!handler) continue;
      const shouldInterrupt = handler(transitionContext, transitionExtraContext, transition);
      if (shouldInterrupt) return;
    }
    transitionContext.state.value = transition.nextState;
    const afterTransitionHandlers = [
      transition.onAfterTransition,
      transitionExtraContext.onAfterTransition,
      transitionContext.onAfterTransition,
    ];
    for (const handler of afterTransitionHandlers) {
      if (!handler) continue;
      handler(transitionContext, transitionExtraContext, transition);
    }
  };
  return { transitionRouter };
})();

/** @type {Types.Counter} */
export const Counter = ({
  initialState,
  initialCounterValue,
  onBeforeTransition,
  onAfterTransition,
  render,
  removeTiming,
  timerRef,
  timingHandler,
  timingInterval,
  transitionHandler,
  transitionRouter = CounterDefaults.transitionRouter,
  style,
}) => {
  const counter = useSharedValue(initialCounterValue);
  const state = useSharedValue(initialState);
  const timeout = useSharedValue(null);

  useEffect(() => {
    runOnUI(timingHandler)({ timingInterval, counter, state, timeout, timerRef });
    return () => removeTiming(timeout);
  }, [ timingHandler, timingInterval, counter, state, timeout, timerRef, removeTiming ]);

  useImperativeHandle(timerRef, () => {
    const transitionContext = { onBeforeTransition, onAfterTransition, state, counter, transitionHandler };
    const transitionTo = transitionRouter.bind(null, transitionContext);
    return { state, counter, timeout, transitionTo };
  }, [ onBeforeTransition, onAfterTransition, state, counter, timeout, transitionHandler, transitionRouter ]);
  
  return (
    <Animated.View style={[ styles.container, style?.container ]}>
      {render({ counter, timingInterval, initialCounterValue, style })}
    </Animated.View>
  );
};

/** @type {Types.Counter} */
export default Counter;

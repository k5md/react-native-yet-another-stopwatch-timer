import React, { useEffect, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnUI } from 'react-native-worklets';
import './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export const CounterDefaults = (() => {
  const transitionRouter = (transitionContext, transitionExtraContext) => {
    const transition = transitionContext.transitionHandler(transitionContext, transitionExtraContext);
    if (!transition) return;
    let shouldInterrupt = false;
    if (transitionContext?.onBeforeTransition) shouldInterrupt = transitionContext.onBeforeTransition(transitionContext, transitionExtraContext, transition);
    if (shouldInterrupt) return;
    if (transition.onBeforeTransition) shouldInterrupt = transition.onBeforeTransition(transitionContext, transitionExtraContext, transition);
    if (shouldInterrupt) return;
    transitionContext.state.value = transition.nextState;
    if (transition.onAfterTransition) transition.onAfterTransition(transitionContext, transitionExtraContext, transition);
    transitionContext.onAfterTransition?.(transitionContext, transitionExtraContext, transition);
  };
  return { transitionRouter };
})();

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
    const transition = transitionRouter.bind(null, transitionContext);
    return { state, counter, timeout, transition };
  }, [ onBeforeTransition, onAfterTransition, state, counter, timeout, transitionHandler, transitionRouter ]);
  
  return (
    <Animated.View style={[ styles.container, style?.container ]}>
      {render({ counter, timingInterval, initialCounterValue, style })}
    </Animated.View>
  );
};

export default Counter;

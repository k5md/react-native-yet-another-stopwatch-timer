import React, { useEffect, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnUI } from 'react-native-worklets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export const transitionRouter = (onBeforeTransition, onAfterTransition, state, counter, transitionHandler, transitionName, transitionContext) => {
  const transition = transitionHandler(transitionName, state.get(), transitionContext);
  if (!transition) return;
  let shouldInterrupt = false;
  if (onBeforeTransition) shouldInterrupt = onBeforeTransition(counter, transitionName, state, transition?.nextState, transitionContext);
  if (shouldInterrupt) return;
  if (transition?.onBeforeTransition) shouldInterrupt = transition.onBeforeTransition(counter, transitionContext);
  if (shouldInterrupt) return;
  state.set(transition.nextState);
  if (transition.onAfterTransition) transition.onAfterTransition(counter, transitionContext);
  onAfterTransition?.(counter, transitionName, state, transitionContext);
};

export const Counter = ({
  initialState,
  initialCounterValue,
  onBeforeTransition,
  onAfterTransition,
  render,
  timerRef,
  timingHandler,
  timingInterval,
  timingRemove,
  transitionHandler,
  style,
}) => {
  const counter = useSharedValue(initialCounterValue);
  const state = useSharedValue(initialState);
  const timeout = useSharedValue(null);

  useEffect(() => {
    runOnUI(timingHandler)(timingInterval, counter, state, timeout, timerRef);
    return () => timingRemove(timeout);
  }, [ timingHandler, timingInterval, counter, state, timeout, timerRef, timingRemove ]);

  useImperativeHandle(timerRef, () => {
    const transition = transitionRouter.bind(null, onBeforeTransition, onAfterTransition, state, counter, transitionHandler);
    return { counter, state, transition };
  }, [ onBeforeTransition, onAfterTransition, state, counter, transitionHandler ]);
  
  return (
    <Animated.View style={[ styles.container, style?.container ]}>
      {render({ counter, timingInterval, initialCounterValue, style })}
    </Animated.View>
  );
};

export default Counter;

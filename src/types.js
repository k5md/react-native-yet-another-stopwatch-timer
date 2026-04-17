/** @typedef {import('../example/node_modules/react-native-reanimated').SharedValue<any>} SharedValue */

/** @typedef {import('react').ReactNode} ReactNode */

/** @typedef {import('../example/node_modules/react-native').ViewStyle | import('../example/node_modules/react-native').TextStyle | import('../example/node_modules/react-native').ImageStyle} AnyStyle */

/**
 * @template T
 * @typedef {import('../example/node_modules/react-native').StyleSheet.NamedStyles<T>} NamedStyles
 */

/**
 * @typedef {{
 *   name: string,
 *   onBeforeTransition?: OnBeforeTransition,
 *   onAfterTransition?: OnAfterTransition,
 * } & Record<string, any>} TransitionExtraContext
 */

/**
 * @typedef {Object & Record<string, any>} TransitionExtraContext
 * @property {string} name
 * @property {OnBeforeTransition} onBeforeTransition 
 * @property {OnAfterTransition} onAfterTransition
 */

/**
 * @typedef {Object} Transition
 * @property {OnBeforeTransition} [onBeforeTransition]
 * @property {OnAfterTransition} [onAfterTransition]
 * @property {any} nextState
*/

/**
 * @callback OnBeforeTransition
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @param {Transition} transition
 * @returns {boolean | void} shouldInterrupt flag, if true transition won't happen
 */

/**
 * @callback OnAfterTransition
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @param {any} transition
 * @returns {boolean | void} shouldInterrupt flag, if true transition won't happen
 */

/**
 * Produces object describing changes based on `transitionExtraContext.name`: next state, what to do before and after state change.
 * 
 * If this function returns falsy, then state value won't get changed, no `onBeforeTransition` and no `onAfterTransition` handlers will get called.
 * 
 * See example in [Stopwatch.StopwatchDefaults.transitionHandler](./Stopwatch.jsx)
 * 
 * @callback TransitionHandler
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @returns {Transition | void }
 */

/**
 * Manages state value after routing.
 * This function calls `transitionContext.transitionHandler` to get {@link Transition} object to change from current state to next,
 * calls `onBeforeTransition` callbacks in the following order:
 * 1. property of `transitionTo` argument, passed when calling `transitionTo` from `timerRef.current` {@link TransitionTo}
 * 2. property of `transition` object returned from `transitionHandler` {@link TransitionHandler}
 * 3. property passed to component {@link Counter}
 * 
 * If any of these callbacks return truthy then transition gets cancelled and subsequent callbacks (other `onBeforeTransition` and every `onAfterTransition`) don't get called.
 * Else it updates state to new value from transition and calls `onAfterTransition` callbacks in the same order.
 * 
 * @callback TransitionRouter
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @returns {void}
 */

/**
 * This function is used to switch timer state
 * 
 * Partially applied version of {@link TransitionRouter} with `transitionContext` argument pre-bound
 * 
 * @callback TransitionTo
 * @param {TransitionExtraContext} transitionExtraContext
 * @returns {void}
 */

/**
 * @typedef {Object} TransitionContext
 * @property {OnBeforeTransition} onBeforeTransition 
 * @property {OnAfterTransition} onAfterTransition
 * @property {SharedValue} state
 * @property {SharedValue} counter
 * @property {TransitionHandler} transitionHandler
 */

/**
 * @typedef {Object} TimerRefProps
 * @property {SharedValue} state
 * @property {SharedValue} counter
 * @property {SharedValue} timeout
 * @property {TransitionTo} transitionTo
 */

/**
 * Handle to control timer
 * 
 * Used to provide transitionTo function to switch state, this function is intended to be the only way parent component
 * interacts with timer
 * 
 * ```
 * const run = useCallback(() => timerRef.current?.transitionTo({ name: StopwatchTransitions.Run }), [ timerRef ]);
 * ```
 * 
 * The ref is also passed to {@link TimingHandler} to switch state when counter reaches certain values,
 * see example in [Timer.TimerDefaults.timingHandler](./Timer.jsx)
 * 
 * @typedef {import('react').RefObject<TimerRefProps>} TimerRef
 */

/**
 * Timing worklet that runs on UI-thread for updating counter and schedules a recursive call to itself
 * 
 * It should change counter value based on current state every timingInterval and update timeout shared variable
 * so that whenever component gets rerendered, removeTiming could perform a clean up,
 * see example in [Stopwatch.StopwatchDefaults.timingHandler](./Stopwatch.jsx)
 * 
 * @callback TimingHandler
 * @param {Object} context
 * @param {any} context.timingInterval
 * @param {SharedValue} context.state
 * @param {SharedValue} context.counter
 * @param {SharedValue} context.timeout
 * @param {TimerRef} context.timerRef
 */

/**
 * Callback called on base component rerender
 * 
 * It must perform cleanup for whatever repeating timeout logic one uses in timingHandler
 * (e.g. if setTimeout is used, then it has to call clearTimeout), use timeout shared variable in timingHandler to
 * pass current timeout identifier, see example in [Stopwatch.StopwatchDefaults.removeTiming](./Stopwatch.jsx)
 * 
 * @callback RemoveTiming
 * @param {SharedValue} timeout Identifier set by timingHandler
 * @returns {void}
 */

/**
 * @typedef {Object} StylesProps
 * @property {AnyStyle} [container]
 * @property {AnyStyle} [place]
 * @property {AnyStyle} [digit]
*/

/**
 * @typedef {NamedStyles<StylesProps> & Record<string, AnyStyle>} Styles
 */

/**
 * Counter render function presents counter value as {@link ReactNode} and is passed to base component {@link Counter}
 * 
 * One can provide their custom function or use already implemented ones in [Renderers.jsx](./Renderers.jsx)
 * 
 * @callback Render
 * @param {SharedValue} counter 
 * @param {any} timingInterval
 * @param {any} initialCounterValue
 * @param {Styles} style
 * @returns {ReactNode}
 */

/**
 * @typedef {Object} CounterProps
 * @property {any} initialState initial value for state
 * @property {any} initialCounterValue initial value for counter
 * @property {OnBeforeTransition} onBeforeTransition will be called before state changes, can cancel transition
 * @property {OnAfterTransition} onAfterTransition will be called after state change
 * @property {Render} render custom render function for counter value
 * @property {TimerRef} timerRef the intended handle to perform state transitions
 * @property {TimingHandler} timingHandler worker that updates counter value
 * @property {any} timingInterval intended time interval for timing handler to perform counter updates
 * @property {RemoveTiming} removeTiming clean up function
 * @property {TransitionHandler} transitionHandler 
 * @property {TransitionRouter} transitionRouter
 * @property {Styles} style
 */

/**
 * @callback Counter
 * @param {CounterProps} props
 * @returns {ReactNode}
 */

/**
 * @typedef {Object} DigitProps
 * @property {SharedValue} assignedDigit
 * @property {number} actualDigit
 * @property {Styles} style
 */

/**
 * @callback Digit
 * @param {DigitProps} props
 * @returns {ReactNode}
 */

/**
 * @typedef {Object} PlaceProps
 * @property {SharedValue} digit
 * @property {Styles} style
 */

/**
 * @callback Place
 * @param {PlaceProps} props
 * @returns {ReactNode}
 */

export {};

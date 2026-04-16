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
 * @typedef {{
 *  onBeforeTransition?: OnBeforeTransition,
 *  onAfterTransition?: OnAfterTransition,
 *  nextState?: any,
 * }} Transition
*/

/**
 * @callback OnBeforeTransition
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @param {Transition} transition
 * @returns {bool | void} shouldInterrupt flag, if true transition won't happen
 */

/**
 * @callback OnAfterTransition
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @param {any} transition
 * @returns {bool | void} shouldInterrupt flag, if true transition won't happen
 */

/**
 * @callback TransitionHandler
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @returns {Transition | void }
 */

/**
 * @callback TransitionRouter
 * @param {TransitionContext} transitionContext
 * @param {TransitionExtraContext} transitionExtraContext
 * @returns {void}
 */

/**
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
 * @typedef {import('react').RefObject<{
 *  state: SharedValue,
 *  counter: SharedValue,
 *  timeout: SharedValue,
 *  transitionTo: TransitionTo,
 * }>} TimerRef
 */

/**
 * @callback TimingHandler
 * @param {{
 *  timingInterval: any,
 *  state: SharedValue,
 *  counter: SharedValue,
 *  timeout: SharedValue,
 *  timerRef: TimerRef,
 * }}
 */

/**
 * @callback RemoveTiming
 * @param {SharedValue} timeout
 * @returns {void}
 */

/**
 * @typedef {NamedStyles<{
 *  container?: AnyStyle,
 *  place?: AnyStyle,
 *  digit?: AnyStyle,
 * }> & Record<string, AnyStyle>} Styles
 */

/**
 * @callback Render
 * @param {SharedValue} counter 
 * @param {any} timingInterval
 * @param {any} initialCounterValue
 * @param {Styles} style
 * @returns {ReactNode}
 */

/**
 * @typedef {Object} CounterProps
 * @property {any} initialState
 * @property {any} initialCounterValue
 * @property {OnBeforeTransition} onBeforeTransition
 * @property {OnAfterTransition} onAfterTransition
 * @property {Render} render
 * @property {TimerRef} timerRef
 * @property {TimingHandler} timingHandler
 * @property {any} timingInterval
 * @property {RemoveTiming} removeTiming
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

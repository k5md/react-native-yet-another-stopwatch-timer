import Stopwatch, { StopwatchStates, StopwatchTransitions, StopwatchDefaults } from './src/Stopwatch';
import Timer, { TimerStates, TimerTransitions, TimerDefaults } from './src/Timer';
import Counter, { CounterDefaults } from './src/Counter';
import Place from './src/Place';
import Digit from './src/Digit';
import Renderers from './src/Renderers';

/** @type {{
 * Stopwatch: typeof Stopwatch,
 * StopwatchStates: typeof StopwatchStates,
 * StopwatchTransitions: typeof StopwatchTransitions,
 * StopwatchDefaults: typeof StopwatchDefaults,
 * Timer: typeof Timer,
 * TimerStates: typeof TimerStates,
 * TimerTransitions: typeof TimerTransitions,
 * TimerDefaults: typeof TimerDefaults,
 * Counter: typeof Counter,
 * CounterDefaults: typeof CounterDefaults,
 * Place: typeof Place,
 * Digit: typeof Digit,
 * Renderers: typeof Renderers,
 * }} */
export {
  Stopwatch,
  StopwatchStates,
  StopwatchTransitions,
  StopwatchDefaults,
  Timer,
  TimerStates,
  TimerTransitions,
  TimerDefaults,
  Counter,
  CounterDefaults,
  Place,
  Digit,
  Renderers,
};

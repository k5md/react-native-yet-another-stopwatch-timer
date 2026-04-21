import type { Render } from './shared';

export type RenderersShape = {
  /** Renders each digit of counter value as individual Place component with Text separators */
  Individual: Render,
  /** Renders counter value as one animated TextInput */
  Group: Render,
  /** Renders counter value as a regular Text (use for fake sharedValue objects) */
  Static: Render,
};

export declare const Renderers: RenderersShape;

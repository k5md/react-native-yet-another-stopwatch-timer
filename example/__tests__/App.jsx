import { render, act } from '@testing-library/react-native';
import React from 'react';
import App from '../App';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(async () => {
  jest.restoreAllMocks();
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

test('renders', async () => {
  render(<App />);
  jest.advanceTimersByTime(1000);
});

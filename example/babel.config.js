module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver', { alias: { 'react-native-yet-another-stopwatch-timer': '../' } },
    ],
    'react-native-worklets/plugin',
  ],
};

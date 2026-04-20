const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest.setup.js'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './babel.config.js' },
    ],
  },
  moduleDirectories: [
    'node_modules',
    path.resolve(__dirname, 'node_modules'),
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-worklets)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resolver: 'react-native-worklets/jest/resolver',
};
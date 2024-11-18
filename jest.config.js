module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-redux|react-native|@react-navigation|@invertase)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest-setup.ts'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/tests/svg.tsx',
  },
};

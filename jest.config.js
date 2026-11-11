module.exports = {
  preset: "@react-native/jest-preset",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-redux|react-native|@react-navigation|@invertase|immer|react-native-notifications)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest-setup.ts"],
  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/tests/svg.tsx",
  },
};

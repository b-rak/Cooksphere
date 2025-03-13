export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coveragePathIgnorePatterns: [
    "src/tests/mocks/",
    "src/config/",
    "src/services/",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};

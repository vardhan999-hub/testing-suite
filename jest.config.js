/** @type {import('jest').Config} */
const config = {
  // Use jsdom to simulate a real browser environment in Node
  testEnvironment: "jest-environment-jsdom",

  // Run setup file before every test suite (imports jest-dom matchers)
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

  // Transform JSX/modern JS with Babel
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  // Extensions Jest will resolve
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Where to find tests
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],

  // Coverage — enforces the ≥70% threshold from the brief
  collectCoverageFrom: [
    "src/components/**/*.{js,jsx}",
    "!src/components/**/index.js",
    "!src/**/*.test.{js,jsx}"
  ],
  coverageReporters: ["text", "lcov", "html", "text-summary"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 70,
      branches:   70,
      functions:  70,
      lines:      70
    }
  },

  verbose: true
};

module.exports = config;

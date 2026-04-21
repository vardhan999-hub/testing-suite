/** @type {import('jest').Config} */
const config = {
  
  testEnvironment: "jest-environment-jsdom",

  
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

 
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],

  
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

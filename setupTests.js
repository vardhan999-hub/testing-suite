// ─────────────────────────────────────────────────────────────
//  setupTests.js
//  Runs once before every test file.
// ─────────────────────────────────────────────────────────────

// Extends Jest's expect() with DOM-specific matchers such as:
//   toBeInTheDocument(), toHaveTextContent(), toBeDisabled(), etc.
import "@testing-library/jest-dom";

// ─── Suppress React 18 + userEvent v14 act() noise ───────────
// userEvent v14 wraps events in its own scheduler that React 18's
// test renderer doesn't always detect — this produces console.error
// warnings that are cosmetic, not real failures.
const originalError = console.error.bind(console);
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("not wrapped in act")
    ) {
      return;
    }
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

// ─── Global fetch mock ────────────────────────────────────────
// jsdom does not ship with a real fetch implementation.
// We provide a controllable mock so Posts.test.js can intercept
// any fetch() call without hitting the network.
global.fetch = jest.fn();

// Reset the mock between tests so one test's setup doesn't bleed
// into the next.
beforeEach(() => {
  fetch.mockClear();
});
